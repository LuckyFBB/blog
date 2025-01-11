---
title: 如何做国际化文本提取
group:
  title: 国际化
  order: 5
order: 1
---

### 前言

在之前的文章 [babel 与 SWC](/engineering/base-babel) 中，主要是介绍了一些 babel 的基础配置，babel 的架构图如下:

![image.png](https://github.com/LuckyFBB/blog/assets/38368040/0142bd87-57c9-46ee-bbe0-3bbc062e2a54)

### 确定中文范围

先需要明确项目中可能存在中文的情况有哪些?

```text
const a = '霜序';
const b = `霜序`;
const c = `${isBoolean} ? "霜序" : "FBB"`;
const obj = { a: '霜序' };
// enum Status {
//     Todo = "未完成",
//     Complete = "完成"
// }
// enum Status {
//     "未完成",
//     "完成"
// }
const dom = <div>霜序</div>;
const dom1 = <Customer name="霜序" />;
```

虽然有很多情况下会出现中文，在代码中存在的时候大部分是`string`或者模版字符串，在`react`中的时候一个是`dom`的子节点还是一种是`props`上的属性包含中文。

```text
// const a = '霜序';
{
    "type": "StringLiteral",
    "start": 10,
    "end": 14,
    "extra": {
        "rawValue": "霜序",
        "raw": "'霜序'"
    },
    "value": "霜序"
}
```

**StringLiteral**

对应的`AST`节点为`StringLiteral`，需要去遍历所有的`StringLiteral`节点，将当前的节点替换为我们需要的`I18N.key`这种节点。

```text
// const b = `${finalRoles}(质量项目：${projects})`
{
    "type": "TemplateLiteral",
    "start": 10,
    "end": 43,
    "expressions": [
        {
            "type": "Identifier",
            "start": 13,
            "end": 23,
            "name": "finalRoles"
        },
        {
            "type": "Identifier",
            "start": 32,
            "end": 40,
            "name": "projects"
        }
    ],
    "quasis": [
        {
            "type": "TemplateElement",
            "start": 11,
            "end": 11,
            "value": {
                "raw": "",
                "cooked": ""
            }
        },
        {
            "type": "TemplateElement",
            "start": 24,
            "end": 30,
            "value": {
                "raw": "(质量项目：",
                "cooked": "(质量项目："
            }
        },
        {
            "type": "TemplateElement",
            "start": 41,
            "end": 42,
            "value": {
                "raw": ")",
                "cooked": ")"
            }
        }
    ]
}
```

**TemplateLiteral**

相对于字符串情况会复杂一些，`TemplateLiteral`中会出现变量的情况，能够看到在`TemplateLiteral`节点中存在`expressions`和`quasis`两个字段分别表示变量和字符串

其实可以发现对于字符串来说全部都在`TemplateElement`节点上，那么是否可以直接遍历所有的`TemplateElement`节点，和`StringLiteral`一样。

直接遍历`TemplateElement`的时候，处理之后的效果如下:

```text
const b = `${finalRoles}(质量项目：${projects})`

const b = `${finalRoles}${I18N.K}${projects})`

// I18N.K = "(质量项目："
```

那么这种只提取中文不管变量的情况，会导致翻译不到的问题，上下文很缺失。

最后我们会处理成`{val1}(质量项目：{val2})`的情况，将对应`val1`和`val2`传入

```text
I18N.get(I18N.K, {
    val1: finalRoles,
    val2: projects,
})
```

**JSXText**

对应的`AST`节点为`JSXText`，去遍历`JSXElement`节点，在遍历对应的`children`中的`JSXText`处理中文文本

```text
{
    "type": "JSXElement",
    "start": 12,
    "end": 25,
    "children": [
        {
            "type": "JSXText",
            "start": 17,
            "end": 19,
            "extra": {
                "rawValue": "霜序",
                "raw": "霜序"
            },
            "value": "霜序"
        }
    ]
}
```

**JSXAttribute**

对应的`AST`节点为`JSXAttribute`，中文存在的节点还是`StringLiteral`，但是在处理的时候还是特殊处理`JSXAttribute`中的`StringLiteral`，因为对于这种`JSX`中的数据来说我们需要包裹`{}`，不是直接做文本替换的

```text
{
    "type": "JSXOpeningElement",
    "start": 13,
    "end": 35,
    "name": {
        "type": "JSXIdentifier",
        "start": 14,
        "end": 22,
        "name": "Customer"
    },
    "attributes": [
        {
            "type": "JSXAttribute",
            "start": 23,
            "end": 32,
            "name": {
                "type": "JSXIdentifier",
                "start": 23,
                "end": 27,
                "name": "name"
            },
            "value": {
                "type": "StringLiteral",
                "start": 28,
                "end": 32,
                "extra": {
                    "rawValue": "霜序",
                    "raw": "\"霜序\""
                },
                "value": "霜序"
            }
        }
    ],
    "selfClosing": true
}
```

### 使用 Babel 处理

![image.png](https://user-images.githubusercontent.com/38368040/167138103-b604db7f-63d5-4943-bde2-0785153d54b2.png)

- 使用 @babel/parser 将源代码转译为 AST
  ```text
  const plugins: ParserOptions['plugins'] = [
      'decorators-legacy',
      'typescript',
  ];
  if (fileName.endsWith('text') || fileName.endsWith('text')) {
      plugins.push('text');
  }
  const ast = parse(sourceCode, {
      sourceType: 'module',
      plugins,
  });
  ```
- @babel/traverse 特殊处理上述的节点，转化 AST
  ```text
  babelTraverse(ast, {
      StringLiteral(path) {
          const { node } = path;
          const { value } = node;
          if (
              !value.match(DOUBLE_BYTE_REGEX) ||
              (path.parentPath.node.type === 'CallExpression' &&
                  path.parentPath.toString().includes('console'))
          ) {
              return;
          }
          path.replaceWithMultiple(template.ast(`I18N.${key}`));
      },
      TemplateLiteral(path) {
          const { node } = path;
          const { start, end } = node;
          if (!start || !end) return;
          let templateContent = sourceCode.slice(start + 1, end - 1);
          if (
              !templateContent.match(DOUBLE_BYTE_REGEX) ||
              (path.parentPath.node.type === 'CallExpression' &&
                  path.parentPath.toString().includes('console')) ||
              path.parentPath.node.type === 'TaggedTemplateExpression'
          ) {
              return;
          }
          if (!node.expressions.length) {
              path.replaceWithMultiple(template.ast(`I18N.${key}`));
              path.skip();
              return;
          }
          const expressions = node.expressions.map((expression) => {
              const { start, end } = expression;
              if (!start || !end) return;
              return sourceCode.slice(start, end);
          });
          const kvPair = expressions.map((expression, index) => {
              templateContent = templateContent.replace(
                  `\${${expression}}`,
                  `{val${index + 1}}`,
              );
              return `val${index + 1}: ${expression}`;
          });
          path.replaceWithMultiple(
              template.ast(
                  `I18N.get(I18N.${key},{${kvPair.join(',\n')}})`,
              ),
          );
      },
      JSXElement(path) {
          const children = path.node.children;
          const newChild = children.map((child) => {
              if (babelTypes.isJSXText(child)) {
                  const { value } = child;
                  if (value.match(DOUBLE_BYTE_REGEX)) {
                      const newExpression = babelTypes.jsxExpressionContainer(
                          babelTypes.identifier(`I18N.${key}`),
                      );
                      return newExpression;
                  }
              }
              return child;
          });
          path.node.children = newChild;
      },
      JSXAttribute(path) {
          const { node } = path;
          if (
              babelTypes.isStringLiteral(node.value) &&
              node.value.value.match(DOUBLE_BYTE_REGEX)
          ) {
              const expression = babelTypes.jsxExpressionContainer(
                  babelTypes.memberExpression(
                      babelTypes.identifier('I18N'),
                      babelTypes.identifier(`${key}`),
                  ),
              );
              node.value = expression;
          }
      },
  });
  ```
  对于`TemplateLiteral`来说需要处理`expression`，通过截取的方式获取到对应的模版字符串 `templateContent`，如果不存在`expressions`，直接类似`StringLiteral`处理；存在`expressions`的情况下，遍历`expressions`通过`${val(index)}`替换掉`templateContent`中的`expression`，最后使用`I18N.get`的方式获取对应的值
  ```text
  const name = `${a}霜序`;
  // const name = I18N.get(I18N.test.A, { val1: a });

  const name1 = `${a ? "霜" : "序"}霜序`;
  // const name1 = I18N.get(I18N.test.B, { val1: a ? I18N.test.C : I18N.test.D });
  ```
  对于`TemplateLiteral`节点来说，如果是嵌套的情况，会出现问题。
  ```text
  const name1 = `${a ? `霜` : `序`}霜序`;
  // const name1 = I18N.get(I18N.test.B, { val1: a ? `霜` : `序` });
  ```
  > 🤔  为何对于`TemplateLiteral`中嵌套的`StringLiteral`会处理，而`TemplateLiteral`就不处理呢？
  > 💡  导致原因为`babel`不会自动递归处理`TemplateLiteral`的子级嵌套模板。
  上述的代码中通过遍历一些`AST`处理完了之后，我们需要统一引入当前`I18N`这个变量。那么没我们需要在当前文件的`AST`顶部的`import`语句后插入当前的`importStatement`
  ```text
  Program: {
      exit(path) {
          const importStatement = projectConfig.importStatement;
          const result = importStatement
              .replace(/^import\s+|\s+from\s+/g, ',')
              .split(',')
              .filter(Boolean);
          // 判断当前的文件中是否存在 importStatement 语句
          const existingImport = path.node.body.find((node) => {
              return (
                  babelTypes.isImportDeclaration(node) &&
                  node.source.value === result[1]
              );
          });
          if (!existingImport) {
              const importDeclaration = babelTypes.importDeclaration(
                  [
                      babelTypes.importDefaultSpecifier(
                          babelTypes.identifier(result[0]),
                      ),
                  ],
                  babelTypes.stringLiteral(result[1]),
              );
              path.node.body.unshift(importDeclaration);
          }
      },
  }
  ```
- 转为代码
  ```text
  const { code } = generate(ast, {
      retainLines: true,
      comments: true,
  });
  ```

因为我们的场景不适合将该功能封装成`plugin`，但是整体和写`plugin`的思路差不多。在`.babelrc`中配置对应的`plugin`即可

```text
const i18nPlugin = () => {
    return {
        visitor: {
            StringLiteral(path) {},
            TemplateLiteral(path) {},
            JSXElement(path) {},
            JSXAttribute(path) {},
            Program: {},
        },
    };
};
```

### 其他处理

**动态生成 key**

每一个中文生成`key`的方式都是固定的，类似`excel`列名

```text
export const getSortKey = (n: number, extractMap = {}): string => {
    let label = '';
    let num = n;
    while (num > 0) {
        num--;
        label = String.fromCharCode((num % 26) + 65) + label;
        num = Math.floor(num / 26);
    }
    const key = `${label}`;
    if (_.get(extractMap, key)) {
        return getSortKey(n + 1, extractMap);
    }
    return key;
};
```

每一个文件的前缀都是一定的，按着路径生成的，不会包含`extractDir`之前的内容

```text
export const getFileKey = (filePath: string) => {
    const extractDir = getProjectConfig().extractDir;

    const basePath = path.resolve(process.cwd(), extractDir);

    const relativePath = path.relative(basePath, filePath);

    const names = slash(relativePath).split('/');
    const fileName = _.last(names) as any;
    let fileKey = fileName.split('.').slice(0, -1).join('.');
    const dir = names.slice(0, -1).join('.');
    if (dir) fileKey = names.slice(0, -1).concat(fileKey).join('.');
    return fileKey.replace(/-/g, '_');
};
```

### 脚手架命令

[i18n-extract-cli](https://github.com/LuckyFBB/i18n-extract)

目前支持两个命令`init`/`extract`

```bash
npx i18n-extract-cli init
```

会初始化一份`i18n.config.json`

```json
{
  "localeDir": "locales",
  "extractDir": "./",
  "importStatement": "import I18N from @/utils/i18n",
  "excludeFile": [],
  "excludeDir": []
}
```

执行如下命令，开始提取`extractDir`目录下的中文文本到`localeDir/zh-CN`

```bash
npx i18n-extract-cli extract
```

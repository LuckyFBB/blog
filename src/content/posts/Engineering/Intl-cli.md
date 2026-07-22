---
title: 国际化工具
group:
  title: 国际化
  order: 5
order: 2
---

在做国际化相关内容的时候，需要提供一些工具类，目前基于现状一共做了三个工具类，分别涉及提取文案/获取文案/提示文案等，会依次介绍。

## i18n-extract

[npm i18n-extract-cli](https://www.npmjs.com/package/i18n-extract-cli)

主要做配置文件初始化/提取中文文本/检测中文文本/清除中文文本，暴露 i18n 作为命令行。

提供如下命令行

### init

用于初始化配置化文件，会根据配置创建对应的 `i18n.config.json`

![1.gif](/blog/imgs/intl/1.gif)

需要配置当前提取中文的目标文件夹，提取出来的中文存放的 locales 文件夹，默认文本文件类型(仅仅支持 ts/js/json 三种文件类型)

```json
{
  "localeDir": "./locales",
  "extractDir": "./",
  "importStatement": "import I18N from @/utils/i18n",
  "excludeFile": [],
  "excludeDir": ["node_modules", "locales"],
  "type": "ts",
  "sourceLocale": "zh-CN"
}
```

生成的 config.json 中，除了上述可以在 prompt 中的配置项之外，还有其他的几个配置

- importStatement: 引入 I18N 语句，用于提取到中文的文件中引入
- excludeFile: 排除的文件，不做提取的文件
- excludeDir: 排除的文件夹，不做提取的文件夹

### extract

根据配置文件提取 extractDir 的中文写入到对应的 `{localeDir}/{sourceLocale/index.{type}` 中

在[这篇文章](https://luckyfbb.github.io/blog/engineering/extract-chinese)中详细的介绍了如何做国际化文本的提取，主要是使用 babel 获取 AST 来获取中文，`extract` 命令是可以多次执行的。

> 每一个文件中的中文，都会对应一个 key，该 key 是由当前的文件路径+ sortKey 组成。
> 再次执行命令时，需要将当然文件中的中文写入到当前的文件路径的对象中。

再次执行 `extract` 命令时，需要将读取 `{sourceLocale/index.{type}` 中的内容。

对于 json 文件来说，相当好处理，fs.readFile 读取到对应的内容之后，即可获取到对象

```jsx | pure
exportData = JSON.parse(content);
```

> 如果 type 对应的为 ts/js 文件，需要当前文件中的对象为默认导出(export default xxx)。

虽然为 export default，但也有两种方式

```jsx | pure
// 直接导出
export default {};

// 变量导出
const obj = {};
export default obj;
```

这时对于 `{sourceLocale/index.{type}` 文件来说，也需要来判断是什么导出方式，这里采取的手段依旧是使用 babel，在 [parseLocaleModule](https://github.com/LuckyFBB/i18n-extract/blob/main/src/utils.ts#L286) 方法中

```jsx | pure
traverse(ast, {
  ExportDefaultDeclaration(path) {
    const declaration = path.node.declaration;
    if (babelTypes.isIdentifier(declaration)) {
      exportIdentifier = declaration.name;
    }
    if (babelTypes.isObjectExpression(declaration)) {
      exportData = eval(
        `(${code.slice(declaration.start ?? 0, declaration.end ?? 0)})`,
      );
    }
  },
});
```

如果是直接导出，`eval` 获取到对应导出的对象；否则记录下导出变量的名字 `exportIdentifier`

```jsx | pure
traverse(ast, {
  VariableDeclarator(path) {
    if (
      path.node.id.type === 'Identifier' &&
      path.node.id.name === exportIdentifier
    ) {
      if (path.node.init && path.node.init.type === 'ObjectExpression') {
        exportData = eval(
          `(${code.slice(path.node.init.start ?? 0, path.node.init.end ?? 0)})`,
        );
      }
    }
  },
});
```

再次遍历 ast 通过 `exportIdentifier` 获取到对应的对象

拿到对象之后，`extract` 时还存在的中文，写入到对应当前的文件路径的对象中

```jsx | pure
// 文件路径
const fileKey = generateLocaleKey(fileName);
const obj: {} = _.get(extractMap, fileKey) ?? {};

// 文在文件中的唯一 key
const key = getSortKey(count, obj);
setLocaleValue(obj, key, value);

_.set(extractMap, fileKey, obj);
```

写入到 `{sourceLocale/index.{type}` 中也需要注意 `index.{type}` 的导出方式，和上述获取的方式大同小异，只是变为更改 ast 之后再 `generate`

### extract:check

检查 extractDir 文件夹中的中文是否提取完全

结合目前的业务，在提取完文案之后，需要检测是否完全提取完中文

由于上述采用的 babel 的手段来提取中文，那么这里需要用不一样的手段，使用正则匹配来检测，需要去除掉注释

```jsx | pure
const zhRegex = /[\u4e00-\u9fa5]/g;
// 匹配单行注释、块注释
const commentAndStringRegex = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g;
```

### extract:clear

清理 extractDir 尚未使用的国际化文案

> 值得注意，是按着每个文件路径作为 key 来判断当前文件中的 sortKey 是否使用，因此必须保证每个文件中使用的 key 为 fileKey + sortKey，否则会导致当前脚本失效

通过 [parseLocaleModule](https://github.com/LuckyFBB/i18n-extract/blob/main/src/utils.ts#L286) 获取到对应的对象，我们最后代码中使用的都是 I18N.xxx.xxx.A 等对象，对应的 AST 如下

```json
{
  "type": "MemberExpression",
  "object": {
    "type": "MemberExpression",
    "object": {
      "type": "MemberExpression",
      "object": {
        "type": "Identifier",
        "name": "I18N"
      },
      "property": {
        "name": "xxx"
      }
    },
    "property": {
      "type": "Identifier",
      "name": "xxx"
    }
  },
  "property": {
    "type": "Identifier",
    "name": "A"
  }
}
```

我们需要确定 `MemberExpression` 是由 I18N 开头，并且不是 I18N.get(特殊处理模版字符串)，获取到最外层的 `MemberExpression` 的 `property.name`

```js
MemberExpression(path) {
    let node = path.node;
    const identifiers = [];
    while (babelTypes.isMemberExpression(node)) {
        identifiers.unshift(
            (node.property as babelTypes.Identifier).name,
        );
        node = node.object as babelTypes.MemberExpression;
    }
    if (babelTypes.isIdentifier(node)) {
        identifiers.unshift((node as babelTypes.Identifier).name);
    }
    if (
        identifiers.at(0) === importVariable &&
        !(
            identifiers.at(1) === 'get' &&
            babelTypes.isCallExpression(path.parentPath.node)
        )
    ) {
        keySet.add(identifiers[identifiers.length - 1]);
        path.skip();
    }
}
```

获取到当前文件所有的数据存储的 obj，如果 keySet 不存在的话，即删除 obj 中的值

```jsx | pure
Object.keys(currObj).forEach((key) => {
  if (!keySet.has(key)) {
    delete currObj[key];
  }
});
```

如果 currObj 为空的时候，需要从文件中删除，保证最后的 locales 文件中不存在空对象

```jsx | pure
if (_.isEmpty(currObj)) {
  let currKey = fileKey;
  do {
    _.unset(extractMap, currKey);
    currKey = currKey.split('.').slice(0, -1).join('.');
  } while (currKey && _.isEmpty(_.get(extractMap, currKey)));
} else {
  _.set(extractMap, fileKey, currObj);
}
```

以上就是 i18n-extract-cli 包做的事情，围绕文案提取/校验/删除为主，提供国际化基本功能

## i18n-intl

[npm dt-intl](https://www.npmjs.com/package/dt-intl)，fork 自 [kiwi-intl](https://github.com/alibaba/kiwi/tree/master/kiwi-intl)，更改对应的打包方式，以及 `intl-messageformat` 版本

`i18n-intl` 默认导出一个方法，仅支持 init 方法

```tsx | pure
import dtIntl from 'dt-intl';

const I18N = dtIntl.init<I18NType>(currentLang, langs, LangEnum.zhCN);
```

返回的 `I18N` 是一个响应式对象，通过 `Object.defineProperty/Proxy` 实现属性的响应式变化

```tsx | pure
const defineReactive = (obj, key, defaultKey) => {
  let childObj = observe(obj[key]);
  Object.defineProperty(obj, key, {
    get() {
      if (obj.__data__[key]) {
        return getProxyObj(obj.__data__[key]);
      } else if (obj.__metas__[defaultKey][key]) {
        return getProxyObj(obj.__metas__[defaultKey][key]);
      } else {
        return getDefaultProxyString();
      }
    },
    set(newVal) {
      if (obj[key] === newVal) {
        return;
      }
      // 如果值有变化的话，做一些操作
      obj[key] = newVal;
      // 执行回调
      const cb = obj.callback[key];
      cb.call(obj);
      // 如果set进来的值为复杂类型，再递归它，加上set/get
      childObj = observe(newVal);
    },
  });
};
```

可以直接通过 `I18N.xxx` 获取到对应的文本

还提供 template/get 的方式处理带有参数的文案，template 处理简单的模版字符串，get 支持 `IntlMessageFormat` 处理复杂的模版字符串

```tsx | pure
template(str, args) {
    if (!str) {
        return '';
    }
    return str.replace(/\{(.+?)\}/g, (match, p1) => {
        return this.getProp({ ...this.__data__, ...args }, p1);
    });
}

get(str, args?) {
    let msg = lodashGet(this.__data__, str);
    if (!msg) {
        msg = lodashGet(this.__metas__[this.__defaultKey__ || 'zh-CN'], str, str);
    }
    if (args) {
        msg = new IntlMessageFormat(msg, this.__lang__);
        msg = msg.format(args);
        return msg;
    } else {
        return msg;
    }
}
```

## i18n-helper

vscode 插件，集成在 dtsatck-devops 中。在该 vscode 插件中，目前主要完成 hover 展示对应的中文英文

![image.png](/blog/imgs/intl/image.png)

通过 [parseLocaleModule](https://github.com/LuckyFBB/i18n-extract/blob/main/src/utils.ts#L286) 类似的方法读取到对应的数据，通过 `vscode.languages.registerHoverProvider` 注册 hover 展示

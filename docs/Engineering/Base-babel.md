---
title: babel 基础介绍
group:
  title: Babel
  order: 1
order: 0
---

babel 的原名叫 6to5，简明扼要就是 es6 转 es5，但是没想到 es 标准推进的过快，短时间就有了 es7/8，所以它改名为 babel

<!-- more -->

## babel 的用途

- 转译 [esnext](https://developer.aliyun.com/article/115855)/typescript 等到目标环境支持的 js

  用来把代码中的 esnext 的新的语法、typescript 和 [flow](https://zhuanlan.zhihu.com/p/26204569) 的语法转成基于目标环境支持的语法的实现。并且还可以把目标环境不支持的 api 进行 polyfill。babel7 支持了 preset-env，可以指定 targets 来进行按需转换

- 一些特定用途的代码转换

  babel 是一个转译器，暴露了很多 api，用这些 api 可以完成代码到 AST 的 parse，AST 的转换，以及目标代码的生成

- 代码的静态分析

  对代码进行 parse 之后，能够进行转换，是因为通过 AST 的结构能够理解代码，也可以用于分析代码的信息，进行一些检查

## babel 的转译

![transform](https://user-images.githubusercontent.com/38368040/167138103-b604db7f-63d5-4943-bde2-0785153d54b2.png)

```js
// 源代码
const sourceCode = `
 const a = 1
`;
// 调用parse，生成ast
const ast = parser.parse(sourceCode, {});

// 调用traverse执行自定义的逻辑，处理ast节点
traverse(ast, {});

// 生成目标代码
const { code } = generate(ast, {});

console.log('result after deal with》〉》〉》', code);
```

## babel 的架构

<img width="1302" alt="image" src="https://github.com/LuckyFBB/blog/assets/38368040/0142bd87-57c9-46ee-bbe0-3bbc062e2a54">

1. 核心@babel/core
   - 加载处理配置/加载插件
   - 调用`Parser`进行语法解析，生成 AST
   - 调用`Traverser`遍历 AST，并使用`访问者模式`应用插件对 AST 进行转换
   - 调用`Generator`生成代码，包括 SourceMap 转换和源代码生成
2. 核心周边支撑
   - Parser: @babel/parser
   - Traverser: @babel/traverser
   - Generator: @babel/generator
3. 插件
   - 语法插件: 该类插件只允许 Babel 解析特定类型的语法
   - 转换插件: 用于对 AST 进行转换，实现转换为 ES5 代码、压缩、功能增强等目的
4. 插件开发辅助
   - @babel/template: 可以将字符串转为 AST 节点
   - @babel/types: 对 AST 节点的断言

## babel 的编译配置

创建一个 babel 项目，在 src/index.js 中，写入如下代码

```js
const fn = () => {
  console.log(111);
};
```

如果我们什么都不配置，直接执行编译，会发现前后的代码完全一致。因为 babel 是基于插件的，所以当我们什么插件都不配置的时候，babel 什么都不会做。

### 插件(plugins)

我们想将箭头函数转为 ES5 函数，只需要提供一个转换箭头函数的插件。

在项目目录下新建`.babelrc`文件，添加上如下配置

```json
{
  "plugins": ["@babel/plugin-transform-arrow-functions"]
}
```

再一次执行编译，会发现上述代码中的箭头函数已经成功被编译，代码如下:

```js
const fn = function () {
  console.log(111);
};

// ===== 编译后的结果 ===== //

var fn = function fn() {
  console.log(111);
};
```

如果我们还需要支持解构语法，那么我们需要给它配置`"@babel/plugin-transform-destructuring"`插件。

```json
{
  "plugins": [
    "@babel/plugin-transform-arrow-functions",
    "@babel/plugin-transform-destructuring"
  ]
}
```

插件是有一个执行顺序的，插件是从上往下执行的，所以 Babel 在遍历 AST 时会先调用`@babel/plugin-transform-arrow-functions`定义的转换方法，然后再调用`@babel/plugin-transform-destructuring`

🤔 发现问题所在，如果我们需要转换的语法很多，那岂不是需要手动配置很多插件，实在繁琐。

### 预设(preset)

preset 的出现就是为了解决上述问题。通过添加/创建一个 preset 就可以轻松的使用一组插件。官方也为我们提供了很多的 presets

#### preset 执行顺序

```json
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript"
  ]
}
```

前面提到 plugins 的执行顺序是从上往下，而 preset 的执行顺序恰恰相反，是从下往上执行的。并且 plugins 的执行先于 preset

#### 一些过时的 preset

1. @babel/preset-stage-xxx

   stage-xxx 是不同阶段语法提案的转码规则而产生的预设，随着被批准为 ES 新版本的组成部分而进行相应的改变

   - [stage-0](https://link.juejin.cn/?target=https%3A%2F%2Fwww.babeljs.cn%2Fdocs%2Fbabel-preset-stage-0) - 设想(Strawman): 只是一个想法，可能有 Babel 插件，stage-0 的功能范围最广大，包含 stage-1 , stage-2 以及 stage-3 的所有功能
   - [stage-1](https://link.juejin.cn/?target=https%3A%2F%2Fwww.babeljs.cn%2Fdocs%2Fbabel-preset-stage-1) - 建议(Proposal): 这是值得跟进的
   - [stage-2](https://link.juejin.cn/?target=https%3A%2F%2Fwww.babeljs.cn%2Fdocs%2Fbabel-preset-stage-2) - 草案(Draft): 初始规范
   - [stage-3](https://link.juejin.cn/?target=https%3A%2F%2Fwww.babeljs.cn%2Fdocs%2Fbabel-preset-stage-3) - 候选(Candidate): 完成规范并在浏览器上初步实现
   - stage-4 - 完成(Finished): 将添加到下一个年度版本发布中

2. @babel/preset-es2015

   ES 的标准一年一个版本，意味着 babel 插件需要去实时跟进，es6 语法采用`@babel/preset-es2015`，es7 语法就需要引入`@babel/preset-es2016`，如果是一些还未加入标准的语法就需要用上述讲的 stage0/stage1 等

上述讲的 preset-stage-xxx/preset-es20xx 都是 babel6 的产物，依旧会发现一些问题，preset 难以维护，ES 的标准变化比较快，意味着 stage-xxx 变得也很快。如果目标环境已经支持了 ES6+ 特性，那我们就不用做转换了。

#### @babel/preset-env

babel7 中，淘汰了上述的 preset-es20xx，开始推行 preset/env

preset-env 可以使用 es6+语法去写代码，并且只转换需要转换的代码。

默认情况下，preset-env 什么都不需要配置，它会默认转换所有的 es6+的代码。提供了 targets 配置项制定运行环境。

修改 .babelrc 文件，修改为如下配置

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": "ie >= 10" // 表明只有在ie10以上版本浏览器不支持的语法才会被转换
      }
    ]
  ]
}
```

修改 src/index.js

```js
const arr = [1, 2, 3, 4];
const arr1 = [...arr];
arr.includes(1);
const p = new Promise((resolve, reject) => {
  resolve('FBB');
});

// ===== 编译后的结果 ===== //

('use strict');

var arr = [1, 2, 3, 4];
var arr1 = [].concat(arr);
arr.includes(1);
var p = new Promise(function (resolve, reject) {
  resolve('FBB');
}); // includes/Promise竟然没有被转换？？？？
```

🤔 ES6 增加的内容可以分为语法和 api 两个部分。新语法比如箭头函数/解构/class 等，新的 api 比如 Set/Map/Promise/Array 原型链上等。

语法转换只是将高版本语法转为低版本的，但是新的内置函数/实例方法等无法转换。所以这时 polyfill 出现了。

### @babel/polyfill

polyfill 是垫片的意思，所谓垫片就是抹平不同浏览器或者不同环境下的差异，让新的内置函数、实例方法等在低版本浏览器中也可以使用

为我们的代码添加 @babel/polyfill，直接在 src/index.js 前引入该包

```js
import '@babel/polyfill';

const arr = [1, 2, 3, 4];
const arr1 = [...arr];
arr.includes(1);
const p = new Promise((resolve, reject) => {
  resolve('FBB');
});

// ===== 编译后的结果 ===== //

('use strict');

require('@babel/polyfill');

var arr = [1, 2, 3, 4];
var arr1 = [].concat(arr);
arr.includes(1);
var p = new Promise(function (resolve, reject) {
  resolve('FBB');
});
```

经过 babel 编译后的内容，其实也是引入了 @babel/polyfill 的包，这个时候采用的是全量引入，不管有无使用的 API 都会被引入

🤔 那其实我们代码只需要 Promise 和 includes 的 polyfill，那有没有一种按需加载的功能？当然有，babel 不会连这么蠢的问题都不解决。

#### useBuiltIns

在回到上一节所讲的 @babel/preset-env，我们刚刚提到了 target 配置项是用于标识目标环境。useBuiltIns 该配置是用于做 polyfill 的，我们在 .babelrc 中加入该配置项，babel 编译时就会自动进行 polyfill，不需要我们在手动引入

useBuiltIns 的参数:

- false: 不会对 polyfill 做操作，引入 @babel/polyfill 之后会全量引入
- usage: 会根据配置的目标环境的兼容性以及代码中使用的 API 来进行 polyfill，实现按需加载
- entry: 会根据配置的浏览器兼容，引入浏览器不兼容的  polyfill，需要在入口文件手动添加`import '@babel/polyfill'`。如果指定的`"corejs": "3"`，则需要引入`import 'core-js/stable'; import 'regenerator-runtime/runtime'`

:::info{title=" "}
💡 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fzloirock%2Fcore-js">core-js</a>是 JavaScript 的模块化标准库，包含  `Promise/Symbol/Iterator` 和许多其他的特性，它可以让你仅加载必需的功能。core-js@2.0的版本已经之冻结，所有的新特性只会添加到 3.0 的分支中
:::

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": "ie >= 10",
        "useBuiltIns": "usage",
        "corejs": "3" // 声明 corejs 版本
      }
    ]
  ]
}
```

源代码以及转换之后的代码

```js
const arr = [1, 2, 3, 4];
const arr1 = [...arr];
arr.includes(1);
const p = new Promise((resolve, reject) => {
  resolve('FBB');
});

// ===== 编译后的结果 ===== //

('use strict');

require('core-js/modules/es.array.concat.js');

require('core-js/modules/es.array.includes.js');

require('core-js/modules/es.object.to-string.js');

require('core-js/modules/es.promise.js');

var arr = [1, 2, 3, 4];
var arr1 = [].concat(arr);
arr.includes(1);
var p = new Promise(function (resolve, reject) {
  resolve('FBB');
});
```

🤔 @babel/preset-env 是如何实现按需加载的呢？

首先我们在 @babel/preset-env 的 target 配置项中，可以设置目标环境。在上面的示例中我们设置的环境是 ie10+，targets 是 [browserlist](https://github.com/browserslist/browserslist) 的查询字符串，能够获得项目中的目标浏览器环境信息

当我们拿到所有的浏览器信息之后，我们还需要知道每个特性在不同版本浏览器是否支持，[babel-compat-data](https://github.com/babel/babel/tree/master/packages/babel-compat-data) 中就存放了该内容。

有了浏览器版本，已经每个特性支持的浏览器版本，那我们就能够知道当前目标浏览器支持和不支持的特性。对于不支持的特性做转换和 polyfill。

### @babel/plugin-transform-runtime

上述讲完了按需引入，会有一个新的问题等待我们去解决，看如下代码

```js
class Person {
  constructor() {}
  say(word) {
    console.log(':::', word);
  }
}

// ===== 编译后的结果 ===== //

('use strict');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, 'prototype', { writable: false });
  return Constructor;
}

var Person = /*#__PURE__*/ (function () {
  function Person() {
    _classCallCheck(this, Person);
  }

  _createClass(Person, [
    {
      key: 'say',
      value: function say(word) {
        console.log(':::', word);
      },
    },
  ]);

  return Person;
})();
```

其中有`_createClass`/`_defineProperties`/`_classCallCheck`三个辅助函数，假设我们有 10 个文件中都使用了 class 语法，那么这三个辅助函数会在注入十次。这会使得我们打包的代码变大，并且我们不需要这样的辅助函数被注入多次

这时候`@babel/plugin-transform-runtime`就闪亮登场了。使用`@babel/plugin-transform-runtime`插件，所有帮助程序都将引用模块`@babel/runtime`，这样就可以避免编译后的代码中出现重复的帮助程序，有效减少包体积

首先安装依赖，`@babel/plugin-transform-runtime`通常仅在开发时使用，但是运行时最终代码需要依赖`@babel/runtime`，所以`@babel/runtime`必须要作为生产依赖被安装

修改 .babelrc 如下

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": "ie >= 10",
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ]
  ],
  "plugins": [["@babel/plugin-transform-runtime"]]
}
```

再次编译我们得到如下的代码，我们发`_createClass`/`_defineProperties`/`_classCallCheck`三个函数都是从 babel/runtime 中引入的了

```js
'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

var _classCallCheck2 = _interopRequireDefault(
  require('@babel/runtime/helpers/classCallCheck'),
);

var _createClass2 = _interopRequireDefault(
  require('@babel/runtime/helpers/createClass'),
);

var Person = /*#__PURE__*/ (function () {
  function Person() {
    (0, _classCallCheck2.default)(this, Person);
  }

  (0, _createClass2.default)(Person, [
    {
      key: 'say',
      value: function say(word) {
        console.log(':::', word);
      },
    },
  ]);
  return Person;
})();
```

这样的话就解决了代码冗余的问题，再回到我们刚刚使用 useBuiltIns 实现按需加载的例子中，经过编译我们发现会引入如下几个文件

```js
const arr = [1, 2, 3, 4];
const arr1 = [...arr];
arr.includes(1);
const p = new Promise((resolve, reject) => {
  resolve('FBB');
});

// ===== 编译后的结果 ===== //

('use strict');

require('core-js/modules/es.array.concat.js');

require('core-js/modules/es.array.includes.js');

require('core-js/modules/es.object.to-string.js');

require('core-js/modules/es.promise.js');

var arr = [1, 2, 3, 4];
var arr1 = [].concat(arr);
arr.includes(1);
var p = new Promise(function (resolve, reject) {
  resolve('FBB');
});
```

`Array.prototype`上新增了`includes`方法，并且新增了全局的`Promise`方法，污染了全局环境。对于一个应用程序来说，这并不会有什么问题。但是如果我们的代码会做为一个库发布并提供给别人使用就会出现问题

我们可以使用`@babel/plugin-transform-runtime`来帮我们解决这个问题

修改我们 .babelrc 文件

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": "ie >= 10"
      }
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": "3.0"
      }
    ]
  ]
}
```

重新编译之后会得到如下结果，发现最终转换后的文件不会再出现 polyfill 的 require 方法了。可以看出，没有直接去修改`Array.prototype`，或者是新增`Promise`方法，而是将方法重写成为\_promise/\_includes，避免了全局污染

```js
'use strict';

var _interopRequireDefault = require('@babel/runtime-corejs3/helpers/interopRequireDefault');

var _concat = _interopRequireDefault(
  require('@babel/runtime-corejs3/core-js-stable/instance/concat'),
);

var _includes = _interopRequireDefault(
  require('@babel/runtime-corejs3/core-js-stable/instance/includes'),
);

var _promise = _interopRequireDefault(
  require('@babel/runtime-corejs3/core-js-stable/promise'),
);

var _context;

var arr = [1, 2, 3, 4];
var arr1 = (0, _concat.default)((_context = [])).call(_context, arr);
(0, _includes.default)(arr).call(arr, 1);
var p = new _promise.default(function (resolve, reject) {
  resolve('FBB');
});
```

plugin-transform-runtime 插件借助 babel-runtime 实现了下面两个重要的功能

- 对辅助函数的复用，解决转译语法层时出现的代码冗余
- 解决转译 api 层出现的全局变量污染

## 总结

在本文中简单介绍了:

- Babel 的转译过程/基础架构，相关包的核心包的意义
- 重点放到了 .babelrc 的配置上，从 plugins 的使用，到为什么产生了 presets
- @babel/preset-env 出现的原因和解决问题，以及通过 browserList 和 babel-compat-data 实现的按需加载
- 使用 @babel/polyfill 解决 API 不能够被转译的，但是产生了全量引用的问题
- 为了解决 @babel/polyfill 解决转译语法层时出现的代码冗余 以及全局变量污染问题，@babel/plugin-transform-runtime 出现了

## 参考链接

- [不容错过的 Babel7 知识](https://juejin.cn/post/6844904008679686152#heading-7)
- [手把手带你走进 Babel 的编译世界](https://mp.weixin.qq.com/s/E153XvbK16Y2r5FPwPX-3A)
- [前端也要懂编译：Babel 最全上手指南](https://mp.weixin.qq.com/s/pnnjhfEIF3osRmgK_m-uxA)

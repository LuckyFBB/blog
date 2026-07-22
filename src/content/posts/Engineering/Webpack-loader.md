---
title: webpack loader
group:
  title: webpack
  order: 3
order: 1
---

## 前言

webpack 有两种扩展方式。一种是 Loader 主要是负责将其他的资源形态转译成 webpack 可以处理的标准 JavaScript 代码；另一种是 Plugin 主要伴随着 webpack 整个生命周期，做一些重塑逻辑。

本文主要介绍第一种扩展方式 Loader。

## Loader 是什么？

由于 webpack 只能处理标准的 JavaScript 代码，我们在使用 webpack 打包的过程中还需要处理图片/样式等等内容，那么这些内容都需要先转为 JS 代码才能够被 webpack 打包，因此需要 Loader 来帮我们实现。

### Loader 的本质

Loader 的本质是导出函数的 JavaScript 模块，其导出的函数可以实现内容的转换，简单的 Loader 框架如下，接受源代码做一些计算返回修改之后的代码

```js
module.exports = function (source, sourceMap?, data?) {
  // 执行计算
  return modifySource;
};
```

### Loader 的分类

对于 Loader 来说，一共分为四种类型

- pre: 前置 loader
- normal: 普通 loader
- inline: 行内 loader
- post: 后置 loader

可以通过 webpack enforce 属性来做配置 pre/post，如果不配置默认则为普通 loader

```js
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.css$/,
        use: 'css-loader',
        // enforce: 'pre' | 'post',
      },
    ],
  },
};
```

可以通过内联 import 语句添加前缀，可以覆盖配置中的所有 loader, preLoader 和 postLoader

- 使用 `!` 前缀，将禁用所有已配置的 normal loader(普通 loader)

  ```js
  import Styles from '!style-loader!css-loader?modules!./styles.css';
  ```

- 使用 `!!` 前缀，将禁用所有已配置的 loader（preLoader, loader, postLoader）

  ```js
  import Styles from '!!style-loader!css-loader?modules!./styles.css';
  ```

- 使用 `!` 前缀，将禁用所有已配置的 preLoader 和 loader，但是不禁用 postLoaders

  ```js
  import Styles from '-!style-loader!css-loader?modules!./styles.css';
  ```

### Normal Loader

<aside>
🤔 什么是  Normal Loader 呢？

上述我们讲到 Loader 的本质是导出函数的 JS 模块，而该模块导出的函数就被称为 Normal Loader。

</aside>

首先我们先分别定义三个简单的 Normal Loader

```js
// ==== LoaderC ====
function LoaderC(source) {
  console.log('LoaderC run=====', source);
  return source + '~loaderC';
}
module.exports = LoaderC;

// ==== LoaderB ====
function LoaderB(source) {
  console.log('LoaderB run=====', source);
  return source + '~loaderB';
}
module.exports = LoaderB;

// ==== LoaderA ====
function LoaderA(source) {
  console.log('LoaderA run=====', source);
  return `module.exports = '${source}~loaderA'`;
}

module.exports = LoaderA;
```

<br/>
<aside>
🤔 思考为什么 LoaderA 需要把 source 的内容赋值给 module.exports
</aside>

在 webpack.config.js 中如下使用这些 loaders

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  context: path.resolve(__dirname, '.'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
      },
      {
        test: /\.txt$/,
        use: [
          path.resolve(__dirname, 'src/loaders/loaderA.js'),
          path.resolve(__dirname, 'src/loaders/loaderB.js'),
          path.resolve(__dirname, 'src/loaders/loaderC.js'),
        ],
      },
    ],
  },
};
```

入口文件 index.js 添加一个 txt 的依赖模块

```js
import text from './name.txt';

console.log(text);
```

执行一次打包

![Untitled](/blog/imgs/webpackLoader/Untitled.png)

![Untitled](/blog/imgs/webpackLoader/Untitled%201.png)

能够发现 Normal Loader 是从 C⇒B⇒A 的执行顺序，也就是从下往上或者从右往左的顺序。并且上一个 loader 返回的结果作为下一个 loader 的 source

![Untitled](/blog/imgs/webpackLoader/Untitled%202.png)

### Pitch Loader

<aside>
💡 为什么需要 Pitch Loader？

1. Loader 一旦启动，链式调用会一直执行下去直到结束，无法中断除非显示抛出错误

2. 在某些情况下，并不需要关心资源的具体内容，到 Normal loader 需要在资源读取出来之后才会执行
   :::

上述我们讲到 Normal Loader 是 Loader 模块导出的函数，而对于导出的函数我们添加 pitch 属性，则导出的为 Pitch Loader

```js
/**
 * @remainingRequest 剩余请求，当前 loader 之后的资源请求字符串
 * @precedingRequest 前置请求，在执行当前 loader 之前经历过的 loader 列表
 * @data 数据对象，用于数据传递，即在 pitch 函数中往 data 对象上添加数据，之后在 normal 函数中通过 this.data 的方式读取已添加的数据
 */
function (remainingRequest, precedingRequest, data) {
 // some code
};
```

我们更改上述的三个 Loader

```js
LoaderA.pitch = function (remainingRequest, precedingRequest, data) {
  console.log('LoaderA.pitch====');
  console.log(
    'remainingRequest====',
    remainingRequest,
    '\n',
    'precedingRequest====',
    precedingRequest,
    '\n',
    'data====',
    data,
  );
};

LoaderB.pitch = function (remainingRequest, precedingRequest, data) {
  console.log('LoaderB.pitch====');
  console.log(
    'remainingRequest====',
    remainingRequest,
    '\n',
    'precedingRequest====',
    precedingRequest,
    '\n',
    'data====',
    data,
  );
};

LoaderC.pitch = function (remainingRequest, precedingRequest, data) {
  console.log('LoaderC.pitch====');
  console.log(
    'remainingRequest====',
    remainingRequest,
    '\n',
    'precedingRequest====',
    precedingRequest,
    '\n',
    'data====',
    data,
  );
};
```

执行打包得到如下结果

![Untitled](/blog/imgs/webpackLoader/Untitled%203.png)

能够发现 Pitch Loader 是从上到下/从左到右执行了，与 Normal Loader 相反，运行过程如下图

![Untitled](/blog/imgs/webpackLoader/Untitled%204.png)

当然 Pitch Loader 除了提前运行之外，并非一无是处，如果某一个 Pitch Loader 返回非 undefined 值，则会发生熔断

如果更改上述了 loaderB

```js
LoaderB.pitch = function (remainingRequest, precedingRequest, data) {
  console.log('LoaderB.pitch====');
  console.log(
    'remainingRequest====',
    remainingRequest,
    '\n',
    'precedingRequest====',
    precedingRequest,
    '\n',
    'data====',
    data,
  );
  return 1;
};
```

![Untitled](/blog/imgs/webpackLoader/Untitled%205.png)

![Untitled](/blog/imgs/webpackLoader/Untitled%206.png)

当某一个 Pitch Loader 返回非 undefined 值之后，会发生熔断，不再执行后续的 Loader

![Untitled](/blog/imgs/webpackLoader/Untitled%207.png)

## Loader 是如何运行的

![Untitled](/blog/imgs/webpackLoader/Untitled%208.png)

在 webpack 的核心流程中，我们有讲到在构建阶段会去调用 runLoaders 方法来讲资源处理成标准的 JS 代码。runLoaders 方法里面就是处理 loader 的核心逻辑。

- 创建 loader 对象
- 通过 iteratePitchLoaders 遍历 loader 做 pitch loader 处理
- 通过 localContext.loaderIndex 来判断当前处于哪一个 loader
  - 如果不是最后一个 laoder，通过 loadLoader 加载 loader 挂载相关属性
    - 如果有 pitch 方法，执行 pitch loader。如果 pitch loader 有返回值则开始执行 iterateNormalLoaders(也就是之前说的熔断操作)；否则继续执行 iteratePitchLoaders
  - 如果是最后一个 loader，开始执行 normal loader，开始从最后一个 loader 往前执行，直到所有的 loader 执行结束。

我们能够发现 loader 的加载顺序是按着从左到右加载的，该过程伴随着 pitch loader 的执行，当所有的 loader 加载完毕(pitch loader 执行完毕)。再从右往左执行 normal loader。符合我们上述讲得 loader 执行顺序

## 总结

本文讲了 loader 的作用/分类，重点讲解了 pitch loader 和 normal loader 他们的执行顺序以及 runLoaders 的执行过程

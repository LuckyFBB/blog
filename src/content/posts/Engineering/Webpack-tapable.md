---
title: webpack tapable
group:
  title: webpack
  order: 3
order: 2
---

## 前言

在上两篇文章中，我们了解了 webpack 的核心构建过程，在其编译的过程中存在两个核心对象

- compiler: 负责整体编译流程
- compilation：负责编译 Module

在扩展 webpack 时，我们需要用到 plugin/loader，loader 已经在前文做了分析，对于 plugin 来说，Tapable 是实现 plugin 的核心。

## Tapable

webpack 是一种事件流机制，它的工作过程是将各个插件串联起来，实现这一切的核心就是 Tapable

本质上 Tapable 实现了一套发布订阅模式，提供插件接口。通过 Tapable 注册事件，从而在 webpack 运行的不同时机去触发这些事件。

插件只需要监听对应的事件就能够加入到 webpack 的编译过程，从而影响到编译结果

### 内置钩子

```js
exports.SyncHook = require("./SyncHook");
exports.SyncBailHook = require("./SyncBailHook");
exports.SyncWaterfallHook = require("./SyncWaterfallHook");
exports.SyncLoopHook = require("./SyncLoopHook");
exports.AsyncParallelHook = require("./AsyncParallelHook");
exports.AsyncParallelBailHook = require("./AsyncParallelBailHook");
exports.AsyncSeriesHook = require("./AsyncSeriesHook");
exports.AsyncSeriesBailHook = require("./AsyncSeriesBailHook");
exports.AsyncSeriesLoopHook = require("./AsyncSeriesLoopHook");
exports.
 = require("./AsyncSeriesWaterfallHook");
```

举个 🌰

```js
const { SyncHook } = require('./lib/index');

const hook = new SyncHook(['arg1', 'arg2']);

hook.tap('tap1', function (args1, args2) {
  console.log('tap1', args1, args2);
});

hook.tap('tap2', function (args1, args2) {
  console.log('tap2', args1, args2);
});

hook.call('lucky', 'fbb');

// tap1 lucky fbb
// Ωtap2 lucky fbb
```

- 实例化不同类型的 hook，需要传入一个字符串数组作为参数，其中数组中对应的字符串个数就是对应的参数个数
- 通过 tap 函数注册对应的事件，需要接受两个参数
  - 第一个是意义不大的字符串标识位
  - 第二个是注册的函数，调用时会执行该函数
- 通过 call 方法传入对应的参数，调用在 hook 上注册函数

### hook 分类

- 同步 hook 表示注册的事件会同步执行
- 异步 hook 表示注册的事件会异步执行

![Untitled](/blog/imgs/webpackTapable/Untitled.png)

SyncHook 的 tap 方法是唯一的注册事件的方式，通过 call 方法来触发 syncHook

AsyncHook 可以通过 tap/tapAsync/tapPromise 三种方式来注册，对应的可以通过 call/callAsync/callPromise 来触发 asyncHook

### 执行机制分类

**BasicHook**

基本类型的钩子，它仅仅执行钩子注册事件，并不关心每一个调用的函数返回值是什么

![Untitled](/blog/imgs/webpackTapable/Untitled%201.png)

**WaterFallHook**

瀑布流型的钩子，瀑布类型的钩子和基本类型的钩子没有太多的区别，不同的是瀑布型的钩子在执行回调函数的时候可以将非 undefined 返回值传递给下一个事件函数作为参数

![Untitled](/blog/imgs/webpackTapable/Untitled%202.png)

```js
const hook = new SyncWaterfallHook(['arg1', 'arg2']);

hook.tap('tap1', function (args1, args2) {
  console.log('tap1', args1, args2);
  return 'shuangxu';
});

hook.tap('tap2', function (args1, args2) {
  console.log('tap2', args1, args2);
  return undefined;
});

hook.tap('tap3', function (args1, args2) {
  console.log('tap3', args1, args2);
});

hook.call('lucky', 'fbb');

// tap1 lucky fbb
// tap2 shuangxu fbb
// tap3 shuangxu fbb
```

**BailHook**

保险型钩子，在基础类型钩子上增加了保险机制，如果任何一个返回了非 undefined 的值，那么整个钩子执行过程就会结束，之后的函数事件不会再触发

![Untitled](/blog/imgs/webpackTapable/Untitled%203.png)

```js
const hook = new SyncBailHook(['arg1', 'arg2']);

hook.tap('tap1', function (args1, args2) {
  console.log('tap1', args1, args2);
  return undefined;
});

hook.tap('tap2', function (args1, args2) {
  console.log('tap2', args1, args2);
  return 'YES';
});

hook.tap('tap3', function (args1, args2) {
  console.log('tap3', args1, args2);
});

hook.call('lucky', 'fbb');
// tap1 lucky fbb
// tap2 lucky fbb
```

**LoopHook**

循环型钩子，通过 call 调用时，如果任何一个注册的事件函数返回值非 undefined，那么会从头执行所有的注册函数，直到所有的注册函数返回 undefined

![Untitled](/blog/imgs/webpackTapable/Untitled%204.png)

```js
const { SyncLoopHook } = require('./lib/index');

const hook = new SyncLoopHook(['arg1', 'arg2']);

let flag = 0;

hook.tap('tap1', function (args1, args2) {
  console.log('tap1', args1, args2);
  return undefined;
});

hook.tap('tap2', function (args1, args2) {
  console.log('tap2', args1, args2);
  return flag++ < 1 ? 'YES' : undefined;
});

hook.tap('tap3', function (args1, args2) {
  console.log('tap3', args1, args2);
});

hook.call('lucky', 'fbb');

// tap1 lucky fbb
// tap2 lucky fbb
// tap1 lucky fbb
// tap2 lucky fbb
// tap3 lucky fbb
```

## Tapable 实现原理

```js
const { SyncHook } = require('./lib/index');

const hook = new SyncHook(['arg1', 'arg2']);

hook.tap('tap1', function (args1, args2) {
  console.log('tap1', args1, args2);
});

hook.tap('tap2', function (args1, args2) {
  console.log('tap2', args1, args2);
});

hook.call('lucky', 'fbb');
```

对于上述 SyncHook 最后调用 hook.call 时，Tapable 会动态编译出来如下代码

```js
function fn(arg1, arg2) {
  'use strict';
  var _context;
  var _x = this._x;
  var _fn0 = _x[0]; //  _x[0] 是我们监听的第一个 tap1 对应的事件函数体。
  _fn0(arg1, arg2);
  var _fn1 = _x[1]; // _x[1] 是通过 tap 方法监听的 tap2 函数体内容
  _fn1(arg1, arg2);
}
```

同时会生成如下 hook 对象

```js
const hook = {
  _args: [ 'arg1', 'arg2' ],
  name: undefined,
  taps: [
    { type: 'sync', fn: [Function (anonymous)], name: 'flag1' },
    { type: 'sync', fn: [Function (anonymous)], name: 'flag2' }
  ],
  interceptors: [],
  _call: [Function: CALL_DELEGATE],
  call: [Function: anonymous],
  _callAsync: [Function: CALL_ASYNC_DELEGATE],
  callAsync: [Function: CALL_ASYNC_DELEGATE],
  _promise: [Function: PROMISE_DELEGATE],
  promise: [Function: PROMISE_DELEGATE],
  _x: [ [Function (anonymous)], [Function (anonymous)] ],
  compile: [Function: COMPILE],
  tap: [Function: tap],
  tapAsync: [Function: TAP_ASYNC],
  tapPromise: [Function: TAP_PROMISE],
  constructor: [Function: SyncHook]
}
```

Tapable 做的事情就是根据 hook 中的内容动态编译上述函数体以及创建 hook 实例对象，最后调用 hook.call 方法时，会执行如下代码

```js
// fn 为我们上述动态生成最终需要执行的fn函数
// hook 为我们上边 tapable 内部创建的hook实例对象
hook.call = fn;
hook.call(arg1, arg2);
```

![Untitled](/blog/imgs/webpackTapable/Untitled%205.png)

源码中分别存在两个类去管理这两块的内容：

- Hook 类，负责创建管理上边的 hook 实例对象
- HookCodeFactory 类，负责根据内容编译最终需要通过 hook 调用的 函数 fn

![Untitled](/blog/imgs/webpackTapable/Untitled%206.png)

## Tapable 和 webpack 的关系

在 webpack 编译时，存在 Compiler 和 Compilation 两个对象，webpack 在初始化的时候会给这两个对象创建一系列的 Hook 对象保存在各自实例对象中

![Untitled](/blog/imgs/webpackTapable/Untitled%207.png)

在进行 webpack plugin 开发的时候，会基于 Hook 在不同时机注册对应的事件，从而影响最后的编译结果

## 总结

简单介绍了 Tapable 相关 Hook 以及实现原理，Tapable 也是 webpack 实现的重要一环

---
title: Webpack 模块热替换
group:
  title: webpack
  order: 3
order: 4
---

## 何为 HMR?

模块热替换(HMR - Hot Module Replacement)功能会在应用程序运行过程中替换、添加或删除模块，而无需重新加载整个页面

当我们对代码进行修改并保存后，webpack 将对代码重新打包，并将改动的模块发送到浏览器，浏览器通过新的模块替换老的模块，从而实现局部更新且不需要刷新页面

## 为何需要 HMR?

在 HMR 出现之后，程序的加载都是页面级别的，即使是单个文件的发生改变，都需要刷新整个页面才能够获得最新的代码，且在此之前的数据都会丢失。

当我们遇到如下情况的时候

- 分步表单，意味着一次更改我们需要填写很多的数据
- 弹窗信息，意味着必须重新执行弹窗交互

再细小的操作，更新样式文件、备注信息等等操作都需要刷新页面重新加载执行，极大的影响了开发效率。引入 HMR 能够将这些细小的更改通过模块热替换的方式更新到页面上，从而提升开发的效率。

## 如何使用 HMR?

在 webpack 的配置中，针对于 devServer 配置`hot:true`

```j s
// webpack.config.js
module.exports = {
  // ...
  devServer: {
    // 必须设置 devServer.hot = true，启动 HMR 功能
    hot: true
  }
};
```

在代码里面需要配置`module.hot.accept`接口，声明如何将模块安全地替换为最新代码

```js
if (module.hot) {
  module.hot.accept(['./hello.js'], () => {
    render();
  });
}
// 注册后的效果
// hot._acceptedDependencies['./src/title.js'] = render
```

## webpack 编译构建流程

```js
// 项目目录
-hello.js - index.js - package.json - webpack.config.js;

const config = {
  entry: './index.js', // 入口文件
  output: {
    filename: 'bundle.js', // 输出文件名
    path: path.resolve('dist'), // 输出目录
  },
  plugins: [new HtmlWebpackPlugin()],
  mode: 'development', // 设置为开发模式
  stats: {
    modules: false, // 不输出模块信息
    hash: true, // 输出编译的 hash 值
  },
};
```

做好相关的配置之后，我们启动项目后，能够通过控制台发现生成了一个 hash 值，且通过浏览器打开网站之后，能够发现 websocket 中也传递了`{type: "hash", data: "d76e2c3053202b29bf20"}`对应的 hash 值

![image.png](/blog/imgs/webpackHmr/image.png)

![image.png](/blog/imgs/webpackHmr/image%201.png)

我们更新文件，触发新的编译，控制台中也会更新对应的数据

![image.png](/blog/imgs/webpackHmr/image%202.png)

能够发现生成了新的`hash`值，且生成了`[hash].hot-update.json`/`[hash].hot-update.js`新的文件，文件上的`hash`值是上一次生成的`hash`值。

根据新生成文件名可以发现，上次输出的`hash`值会作为本次编译新生成的文件标识。依次类推，本次输出的`hash`值会被作为下次热更新的标识。

![image.png](/blog/imgs/webpackHmr/image%203.png)

通过浏览器可以看到一次更新之后，会请求对应的`[hash].hot-update.json`/`[hash].hot-update.js`文件

![image.png](/blog/imgs/webpackHmr/image%204.png)

- `c`: 描述哪些 chunk 包含在此次更新中
- `r`: 指示是否需要重新加载 Webpack runtime 代码
- `m`: 列出本次更新中被修改的模块及其对应的新代码

![image.png](/blog/imgs/webpackHmr/image%205.png)

## 热更新实现的原理

### webpack-dev-server 启动本地服务

上述的 webpack 配置代码，我们通过`webpack-dev-server`启动代码

```json
// package.json
{
  "scripts": {
    "dev": "webpack-dev-server",
    "build": "webpack"
  }
}
```

所有的命令行可以在对应项目的`package.json`的`bin`命令中找到对应的入口文件

```json
{
  "name": "webpack-dev-server",
  "bin": "bin/webpack-dev-server.js"
}
```

执行 pnpm dev 之后大致的流程(简易版本)

![image.png](/blog/imgs/webpackHmr/image%206.png)

```js
setupApp() {
	// 依赖了express
  this.app = new (memoize(() => require("express")))();
}

createServer() {
	this.server = require((type)).createServer(options, this.app);
}

createWebSocketServer() {
	// 启动express服务后，启动websocket服务
	this.webSocketServer = new (require("./servers/WebsocketServer"))(this);
}
```

在整个启动本地服务时，涉及到的仓库很多，重点都在`new Server()`之后的操作

- 在`new Server`之前会先启动`webpack`，生成`compiler`实例。`compiler`上有很多方法，比如可以启动`webpack`所有**编译**工作，以及**监听**本地文件的变化
- 使用`express`启动本地服务，使得浏览器可以访问本地的静态资源
- 本地`server`启动成功之后再去创建`websocket`服务，建立本地服务和浏览器的双向通信

### 修改 entry 配置

在我们启动本地服务之前，代码中修改了`entry`入口，自动注入了`websocket`客户端代码和热更新替换的代码

在进入`start`阶段的时候会调用`initialize`方法

![image.png](/blog/imgs/webpackHmr/image%207.png)

`client/index.js`为`websocket`客户端的代码，因为`websocket`是双向通信，上一步通过`createServer`是创建的本地服务端的`websocket`代码，还需要客户端代码，因此需要把客户端`websocket`代码塞到代码中

`hot/dev-server.js`主要用于检查更新逻辑

### 监听 webpack 编译结束

当修改完`entry`入口之后，会执行`setupHooks`方法，注册监听事件，监听`webpack`编译完成

```js
setupHooks() {
	// 监听 webpack 的done hook，tapable 实现
  this.compiler.hooks.done.tap(
    "webpack-dev-server",
    (stats) => {
      if (this.webSocketServer) {
        this.sendStats(this.webSocketServer.clients, this.getStats(stats));
      }
      this.stats = stats;
    },
  );
}

sendStats(clients, stats, force) {
  this.currentHash = stats.hash;
  this.sendMessage(clients, "hash", stats.hash);

  if ((stats.errors).length > 0 ||(stats.warnings).length > 0) {
    const hasErrors = (stats.errors).length > 0;

    if ((stats.warnings).length > 0) {
      let params;
      if (hasErrors) {
        params = { preventReloading: true };
      }
      this.sendMessage(clients, "warnings", stats.warnings, params);
    }
    if ((stats.errors).length > 0) {
      this.sendMessage(clients, "errors", stats.errors);
    }
  } else {
    this.sendMessage(clients, "ok");
  }
}
```

每当`webpack`编译完成就会出发`done`hook，从而调用`sendStats`方法通过`websocket`给浏览器发送消息，`hash`/`ok`事件，浏览器能够拿到最新的`hash`值，检查更新逻辑

### 监听文件变化

每次文件发生变化之后，都需要触发文件编译，那么久还需要监听文件发生改变。该操作主要是通过`webpack-dev-middleware`库实现的。

在`start`函数中，会执行`setupDevMiddleware`方法，该方法主要是执行`webpack-dev-middleware`库的。

:::info{title=" "}

1. webpack-dev-middleware: 该库主要做文件相关的操作，本地文件输出以及监听

2. webpack-dev-server: 该库主要只负责启动服务和前置准备工作
   :::

在`webpack-dev-middleware`中主要实现

```js
compiler.watch(watchOptions, errorHandler);

compiler.outputFileSystem = memfs.createFsFromVolume(new memfs.Volume());
```

调用了`compiler.watch`方法开启对文件的编译，文件变化的时候重新编译文件。

更改`outputFileSystem`，使用`memory-fs`将所有的 output 存储在内存中，减少对文件系统的操作

### 浏览器接收热更新的通知

在上面讲到每一次`webpack`编译结束之后，都会通过`done`hook 调用`sendStats`方法通过`websocket`传递相关的数据。

客户端中会被注入`webpack-dev-server/client/index.js`代码，主要用于接收相关数据

```js
var onSocketMessage = {
  hash: function hash(_hash) {
    status.previousHash = status.currentHash;
    status.currentHash = _hash;
  },
  ok: function ok() {
    sendMessage("Ok");
    if (options.overlay) {
      overlay.send({
        type: "DISMISS"
      });
    }
    reloadApp(options, status);
  }
};

// 连接服务地址 socketUrl，?http://localhost:8080，本地服务地址
socket(socketURL, onSocketMessage, options.reconnect);

// import hotEmitter from "webpack/hot/emitter.js";
reloadApp(){
	if (hot && allowToHot) {
    log.info("App hot update...");
    hotEmitter.emit("webpackHotUpdate", status.currentHash);
    if (typeof self !== "undefined" && self.window) {
      self.postMessage("webpackHotUpdate".concat(status.currentHash), "*");
    }
  }
}
```

注入的客户端代码职责

- `socket`方法建立了`websocket`和服务端的连接，并注册了一系列的监听事件
  - `hash`事件，更新最新一次打包后的`hash`值
  - `ok`事件，进行热更新检查
- `ok`事件中执行`reloadApp`方法，通过`eventEmitter`发出`webpackHotUpdate`事件，通知`webpack`该干活了

那么，webpack 肯定是需要监听`webpackHotUpdate`事件的，没错，就在之前放入`webpack/hot/dev-server.js`代码中

```js
var check = function check() {
  module.hot
    .check(true)
    .then(function (updatedModules) {
      if (!updatedModules) {
        window.location.reload();
        return;
      }
      if (upToDate()) {
        log('info', '[HMR] App is up to date.');
      }
    })
    .catch(function (err) {});
};

var hotEmitter = require('./emitter');

hotEmitter.on('webpackHotUpdate', function (currentHash) {
  lastHash = currentHash;
  if (!upToDate() && module.hot.status() === 'idle') {
    log('info', '[HMR] Checking for updates on the server...');
    check();
  }
});
```

能够看到`hot/dev-server.js`监听了`webpackHotUpdate`事件，并且会去执行`module.hot.check`方法

### **HotModuleReplacementPlugin**

![image.png](/blog/imgs/webpackHmr/image%208.png)

我们能够浏览器的`Sources`的`bundle.js`中找到上述代码，创建对应`hot`对象，里面就能够对应的`check`方法。注入的代码可以在[HotModuleReplacement.runtime.js](https://github.com/webpack/webpack/blob/main/lib/hmr/HotModuleReplacement.runtime.js#L104)找到

当我们配置`hot`属性的时候`webpack-dev-server`会自动转成`HotModuleReplacementPlugin`

```js
if (this.options.hot) {
  const HMRPluginExists = compiler.options.plugins.find(
    (p) => p && p.constructor === webpack.HotModuleReplacementPlugin,
  );

  if (HMRPluginExists) {
    this.logger.warn(
      `"hot: true" automatically applies HMR plugin, you don't have to add it manually to your webpack configuration.`,
    );
  } else {
    // Apply the HMR plugin
    const plugin = new webpack.HotModuleReplacementPlugin();

    plugin.apply(compiler);
  }
}
```

`HotModuleReplacementPlugin`会悄悄的加一些代码到产物中

### module.hot.check

上述知道了 module.hot.check 的来源，现在看看该[`check`](https://github.com/webpack/webpack/blob/main/lib/hmr/HotModuleReplacement.runtime.js#L258)函数具体做了什么事情

- 调用`$hmrDownloadManifest$`获取当前的`hash.hot-update.json`

  ```js
  // $hmrDownloadManifest$ 都是动态注入的代码
  __webpack_require__.hmrM = () => {
    if (typeof fetch === 'undefined')
      throw new Error('No browser support: need fetch API');
    return fetch(__webpack_require__.p + __webpack_require__.hmrF()).then(
      (response) => {
        if (response.status === 404) return;

        if (!response.ok)
          throw new Error(
            'Failed to fetch update manifest ' + response.statusText,
          );

        return response.json();
      },
    );
  };
  __webpack_require__.hmrF = () =>
    'main.' + __webpack_require__.h() + '.hot-update.json';
  ```

- 再调用`$hmrDownloadUpdateHandlers$["jsonp"]`请求`js`文件

  ```js
  // 执行 loadUpdateChunk
  __webpack_require__.hu = (chunkId) => {
    return '' + chunkId + '.' + __webpack_require__.h() + '.hot-update.js';
  };

  // __webpack_require__.l 中创建 script 标签下载 hash.hot-update.js
  ```

### apply

终于到了最后一步热更新的操作，所有的代码逻辑都在[`internalApply`](https://github.com/webpack/webpack/blob/main/lib/hmr/HotModuleReplacement.runtime.js#L319)中

- 删除过期的模块
  ```js
  var queue = outdatedModules.slice();
  while (queue.length > 0) {
    moduleId = queue.pop();
    // 从缓存中删除过期的模块
    module = installedModules[moduleId];
    // 删除过期的依赖
    delete outdatedDependencies[moduleId];
  }
  ```
- 将新的模块添加到更新列表，**webpack_require**执行相关模块的代码

  ```js
  appliedUpdate[moduleId] = newModuleFactory;

  for (var updateModuleId in appliedUpdate) {
    if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
      __webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
    }
  }
  ```

- 执行`hot._acceptedDependencies`的`callback`
  ![image.png](/blog/imgs/webpackHmr/image%209.png)

## 总结

上述我们通过八个步骤大致讲解了`HMR`的实现原理

- 通过`webpack-dev-server`创建本地服务，修改`entry`入口，注入`websocket`客户端代码和热更新替换代码`hot-server`到`bundle`中
- 在`webpack`创建的时候会通过`HotModuleReplacementPlugin`向`bundle`中注入热更新代码
- 通过`compiler.watch`开启文件监听，每一次编译完成触发`compiler.hooks.done`；监听`compiler.hooks.done`每次完成编译之后给客户端发送`hash/ok`事件
- `webpack/client`接收到`ok`事件之后，通过`eventEmitter`佛那个送`webpackHotUpdate`事件
- 在`webpack/hot-server`中会监听`webpackHotUpdate`事件，从而执行`module.hot.check`(`HotModuleReplacementPlugin`注入的代码)完成热更新操作

![image.png](/blog/imgs/webpackHmr/image%2010.png)

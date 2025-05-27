"use strict";(self.webpackChunkblog_of_fbb=self.webpackChunkblog_of_fbb||[]).push([[6800],{26800:function(n,e,a){a.r(e),a.d(e,{texts:function(){return d}});const d=[{value:"\u6A21\u5757\u70ED\u66FF\u6362(HMR - Hot Module Replacement)\u529F\u80FD\u4F1A\u5728\u5E94\u7528\u7A0B\u5E8F\u8FD0\u884C\u8FC7\u7A0B\u4E2D\u66FF\u6362\u3001\u6DFB\u52A0\u6216\u5220\u9664\u6A21\u5757\uFF0C\u800C\u65E0\u9700\u91CD\u65B0\u52A0\u8F7D\u6574\u4E2A\u9875\u9762",paraId:0,tocIndex:0},{value:"\u5F53\u6211\u4EEC\u5BF9\u4EE3\u7801\u8FDB\u884C\u4FEE\u6539\u5E76\u4FDD\u5B58\u540E\uFF0Cwebpack \u5C06\u5BF9\u4EE3\u7801\u91CD\u65B0\u6253\u5305\uFF0C\u5E76\u5C06\u6539\u52A8\u7684\u6A21\u5757\u53D1\u9001\u5230\u6D4F\u89C8\u5668\uFF0C\u6D4F\u89C8\u5668\u901A\u8FC7\u65B0\u7684\u6A21\u5757\u66FF\u6362\u8001\u7684\u6A21\u5757\uFF0C\u4ECE\u800C\u5B9E\u73B0\u5C40\u90E8\u66F4\u65B0\u4E14\u4E0D\u9700\u8981\u5237\u65B0\u9875\u9762",paraId:1,tocIndex:0},{value:"\u5728 HMR \u51FA\u73B0\u4E4B\u540E\uFF0C\u7A0B\u5E8F\u7684\u52A0\u8F7D\u90FD\u662F\u9875\u9762\u7EA7\u522B\u7684\uFF0C\u5373\u4F7F\u662F\u5355\u4E2A\u6587\u4EF6\u7684\u53D1\u751F\u6539\u53D8\uFF0C\u90FD\u9700\u8981\u5237\u65B0\u6574\u4E2A\u9875\u9762\u624D\u80FD\u591F\u83B7\u5F97\u6700\u65B0\u7684\u4EE3\u7801\uFF0C\u4E14\u5728\u6B64\u4E4B\u524D\u7684\u6570\u636E\u90FD\u4F1A\u4E22\u5931\u3002",paraId:2,tocIndex:1},{value:"\u5F53\u6211\u4EEC\u9047\u5230\u5982\u4E0B\u60C5\u51B5\u7684\u65F6\u5019",paraId:3,tocIndex:1},{value:"\u5206\u6B65\u8868\u5355\uFF0C\u610F\u5473\u7740\u4E00\u6B21\u66F4\u6539\u6211\u4EEC\u9700\u8981\u586B\u5199\u5F88\u591A\u7684\u6570\u636E",paraId:4,tocIndex:1},{value:"\u5F39\u7A97\u4FE1\u606F\uFF0C\u610F\u5473\u7740\u5FC5\u987B\u91CD\u65B0\u6267\u884C\u5F39\u7A97\u4EA4\u4E92",paraId:4,tocIndex:1},{value:"\u518D\u7EC6\u5C0F\u7684\u64CD\u4F5C\uFF0C\u66F4\u65B0\u6837\u5F0F\u6587\u4EF6\u3001\u5907\u6CE8\u4FE1\u606F\u7B49\u7B49\u64CD\u4F5C\u90FD\u9700\u8981\u5237\u65B0\u9875\u9762\u91CD\u65B0\u52A0\u8F7D\u6267\u884C\uFF0C\u6781\u5927\u7684\u5F71\u54CD\u4E86\u5F00\u53D1\u6548\u7387\u3002\u5F15\u5165 HMR \u80FD\u591F\u5C06\u8FD9\u4E9B\u7EC6\u5C0F\u7684\u66F4\u6539\u901A\u8FC7\u6A21\u5757\u70ED\u66FF\u6362\u7684\u65B9\u5F0F\u66F4\u65B0\u5230\u9875\u9762\u4E0A\uFF0C\u4ECE\u800C\u63D0\u5347\u5F00\u53D1\u7684\u6548\u7387\u3002",paraId:5,tocIndex:1},{value:"\u5728 webpack \u7684\u914D\u7F6E\u4E2D\uFF0C\u9488\u5BF9\u4E8E devServer \u914D\u7F6E",paraId:6,tocIndex:2},{value:"hot:true",paraId:6,tocIndex:2},{value:`// webpack.config.js
module.exports = {
  // ...
  devServer: {
    // \u5FC5\u987B\u8BBE\u7F6E devServer.hot = true\uFF0C\u542F\u52A8 HMR \u529F\u80FD
    hot: true
  }
};
`,paraId:7,tocIndex:2},{value:"\u5728\u4EE3\u7801\u91CC\u9762\u9700\u8981\u914D\u7F6E",paraId:8,tocIndex:2},{value:"module.hot.accept",paraId:8,tocIndex:2},{value:"\u63A5\u53E3\uFF0C\u58F0\u660E\u5982\u4F55\u5C06\u6A21\u5757\u5B89\u5168\u5730\u66FF\u6362\u4E3A\u6700\u65B0\u4EE3\u7801",paraId:8,tocIndex:2},{value:`if (module.hot) {
  module.hot.accept(['./hello.js'], () => {
    render();
  });
}
// \u6CE8\u518C\u540E\u7684\u6548\u679C
// hot._acceptedDependencies['./src/title.js'] = render
`,paraId:9,tocIndex:2},{value:`// \u9879\u76EE\u76EE\u5F55
-hello.js - index.js - package.json - webpack.config.js;

const config = {
  entry: './index.js', // \u5165\u53E3\u6587\u4EF6
  output: {
    filename: 'bundle.js', // \u8F93\u51FA\u6587\u4EF6\u540D
    path: path.resolve('dist'), // \u8F93\u51FA\u76EE\u5F55
  },
  plugins: [new HtmlWebpackPlugin()],
  mode: 'development', // \u8BBE\u7F6E\u4E3A\u5F00\u53D1\u6A21\u5F0F
  stats: {
    modules: false, // \u4E0D\u8F93\u51FA\u6A21\u5757\u4FE1\u606F
    hash: true, // \u8F93\u51FA\u7F16\u8BD1\u7684 hash \u503C
  },
};
`,paraId:10,tocIndex:3},{value:"\u505A\u597D\u76F8\u5173\u7684\u914D\u7F6E\u4E4B\u540E\uFF0C\u6211\u4EEC\u542F\u52A8\u9879\u76EE\u540E\uFF0C\u80FD\u591F\u901A\u8FC7\u63A7\u5236\u53F0\u53D1\u73B0\u751F\u6210\u4E86\u4E00\u4E2A hash \u503C\uFF0C\u4E14\u901A\u8FC7\u6D4F\u89C8\u5668\u6253\u5F00\u7F51\u7AD9\u4E4B\u540E\uFF0C\u80FD\u591F\u53D1\u73B0 websocket \u4E2D\u4E5F\u4F20\u9012\u4E86",paraId:11,tocIndex:3},{value:'{type: "hash", data: "d76e2c3053202b29bf20"}',paraId:11,tocIndex:3},{value:"\u5BF9\u5E94\u7684 hash \u503C",paraId:11,tocIndex:3},{value:"\u6211\u4EEC\u66F4\u65B0\u6587\u4EF6\uFF0C\u89E6\u53D1\u65B0\u7684\u7F16\u8BD1\uFF0C\u63A7\u5236\u53F0\u4E2D\u4E5F\u4F1A\u66F4\u65B0\u5BF9\u5E94\u7684\u6570\u636E",paraId:12,tocIndex:3},{value:"\u80FD\u591F\u53D1\u73B0\u751F\u6210\u4E86\u65B0\u7684",paraId:13,tocIndex:3},{value:"hash",paraId:13,tocIndex:3},{value:"\u503C\uFF0C\u4E14\u751F\u6210\u4E86",paraId:13,tocIndex:3},{value:"[hash].hot-update.json",paraId:13,tocIndex:3},{value:"/",paraId:13,tocIndex:3},{value:"[hash].hot-update.js",paraId:13,tocIndex:3},{value:"\u65B0\u7684\u6587\u4EF6\uFF0C\u6587\u4EF6\u4E0A\u7684",paraId:13,tocIndex:3},{value:"hash",paraId:13,tocIndex:3},{value:"\u503C\u662F\u4E0A\u4E00\u6B21\u751F\u6210\u7684",paraId:13,tocIndex:3},{value:"hash",paraId:13,tocIndex:3},{value:"\u503C\u3002",paraId:13,tocIndex:3},{value:"\u6839\u636E\u65B0\u751F\u6210\u6587\u4EF6\u540D\u53EF\u4EE5\u53D1\u73B0\uFF0C\u4E0A\u6B21\u8F93\u51FA\u7684",paraId:14,tocIndex:3},{value:"hash",paraId:14,tocIndex:3},{value:"\u503C\u4F1A\u4F5C\u4E3A\u672C\u6B21\u7F16\u8BD1\u65B0\u751F\u6210\u7684\u6587\u4EF6\u6807\u8BC6\u3002\u4F9D\u6B21\u7C7B\u63A8\uFF0C\u672C\u6B21\u8F93\u51FA\u7684",paraId:14,tocIndex:3},{value:"hash",paraId:14,tocIndex:3},{value:"\u503C\u4F1A\u88AB\u4F5C\u4E3A\u4E0B\u6B21\u70ED\u66F4\u65B0\u7684\u6807\u8BC6\u3002",paraId:14,tocIndex:3},{value:"\u901A\u8FC7\u6D4F\u89C8\u5668\u53EF\u4EE5\u770B\u5230\u4E00\u6B21\u66F4\u65B0\u4E4B\u540E\uFF0C\u4F1A\u8BF7\u6C42\u5BF9\u5E94\u7684",paraId:15,tocIndex:3},{value:"[hash].hot-update.json",paraId:15,tocIndex:3},{value:"/",paraId:15,tocIndex:3},{value:"[hash].hot-update.js",paraId:15,tocIndex:3},{value:"\u6587\u4EF6",paraId:15,tocIndex:3},{value:"c",paraId:16,tocIndex:3},{value:": \u63CF\u8FF0\u54EA\u4E9B chunk \u5305\u542B\u5728\u6B64\u6B21\u66F4\u65B0\u4E2D",paraId:16,tocIndex:3},{value:"r",paraId:16,tocIndex:3},{value:": \u6307\u793A\u662F\u5426\u9700\u8981\u91CD\u65B0\u52A0\u8F7D Webpack runtime \u4EE3\u7801",paraId:16,tocIndex:3},{value:"m",paraId:16,tocIndex:3},{value:": \u5217\u51FA\u672C\u6B21\u66F4\u65B0\u4E2D\u88AB\u4FEE\u6539\u7684\u6A21\u5757\u53CA\u5176\u5BF9\u5E94\u7684\u65B0\u4EE3\u7801",paraId:16,tocIndex:3},{value:"\u4E0A\u8FF0\u7684 webpack \u914D\u7F6E\u4EE3\u7801\uFF0C\u6211\u4EEC\u901A\u8FC7",paraId:17,tocIndex:5},{value:"webpack-dev-server",paraId:17,tocIndex:5},{value:"\u542F\u52A8\u4EE3\u7801",paraId:17,tocIndex:5},{value:`// package.json
{
  "scripts": {
    "dev": "webpack-dev-server",
    "build": "webpack"
  }
}
`,paraId:18,tocIndex:5},{value:"\u6240\u6709\u7684\u547D\u4EE4\u884C\u53EF\u4EE5\u5728\u5BF9\u5E94\u9879\u76EE\u7684",paraId:19,tocIndex:5},{value:"package.json",paraId:19,tocIndex:5},{value:"\u7684",paraId:19,tocIndex:5},{value:"bin",paraId:19,tocIndex:5},{value:"\u547D\u4EE4\u4E2D\u627E\u5230\u5BF9\u5E94\u7684\u5165\u53E3\u6587\u4EF6",paraId:19,tocIndex:5},{value:`{
  "name": "webpack-dev-server",
  "bin": "bin/webpack-dev-server.js"
}
`,paraId:20,tocIndex:5},{value:"\u6267\u884C pnpm dev \u4E4B\u540E\u5927\u81F4\u7684\u6D41\u7A0B(\u7B80\u6613\u7248\u672C)",paraId:21,tocIndex:5},{value:`setupApp() {
	// \u4F9D\u8D56\u4E86express
  this.app = new (memoize(() => require("express")))();
}

createServer() {
	this.server = require((type)).createServer(options, this.app);
}

createWebSocketServer() {
	// \u542F\u52A8express\u670D\u52A1\u540E\uFF0C\u542F\u52A8websocket\u670D\u52A1
	this.webSocketServer = new (require("./servers/WebsocketServer"))(this);
}
`,paraId:22,tocIndex:5},{value:"\u5728\u6574\u4E2A\u542F\u52A8\u672C\u5730\u670D\u52A1\u65F6\uFF0C\u6D89\u53CA\u5230\u7684\u4ED3\u5E93\u5F88\u591A\uFF0C\u91CD\u70B9\u90FD\u5728",paraId:23,tocIndex:5},{value:"new Server()",paraId:23,tocIndex:5},{value:"\u4E4B\u540E\u7684\u64CD\u4F5C",paraId:23,tocIndex:5},{value:"\u5728",paraId:24,tocIndex:5},{value:"new Server",paraId:24,tocIndex:5},{value:"\u4E4B\u524D\u4F1A\u5148\u542F\u52A8",paraId:24,tocIndex:5},{value:"webpack",paraId:24,tocIndex:5},{value:"\uFF0C\u751F\u6210",paraId:24,tocIndex:5},{value:"compiler",paraId:24,tocIndex:5},{value:"\u5B9E\u4F8B\u3002",paraId:24,tocIndex:5},{value:"compiler",paraId:24,tocIndex:5},{value:"\u4E0A\u6709\u5F88\u591A\u65B9\u6CD5\uFF0C\u6BD4\u5982\u53EF\u4EE5\u542F\u52A8",paraId:24,tocIndex:5},{value:"webpack",paraId:24,tocIndex:5},{value:"\u6240\u6709",paraId:24,tocIndex:5},{value:"\u7F16\u8BD1",paraId:24,tocIndex:5},{value:"\u5DE5\u4F5C\uFF0C\u4EE5\u53CA",paraId:24,tocIndex:5},{value:"\u76D1\u542C",paraId:24,tocIndex:5},{value:"\u672C\u5730\u6587\u4EF6\u7684\u53D8\u5316",paraId:24,tocIndex:5},{value:"\u4F7F\u7528",paraId:24,tocIndex:5},{value:"express",paraId:24,tocIndex:5},{value:"\u542F\u52A8\u672C\u5730\u670D\u52A1\uFF0C\u4F7F\u5F97\u6D4F\u89C8\u5668\u53EF\u4EE5\u8BBF\u95EE\u672C\u5730\u7684\u9759\u6001\u8D44\u6E90",paraId:24,tocIndex:5},{value:"\u672C\u5730",paraId:24,tocIndex:5},{value:"server",paraId:24,tocIndex:5},{value:"\u542F\u52A8\u6210\u529F\u4E4B\u540E\u518D\u53BB\u521B\u5EFA",paraId:24,tocIndex:5},{value:"websocket",paraId:24,tocIndex:5},{value:"\u670D\u52A1\uFF0C\u5EFA\u7ACB\u672C\u5730\u670D\u52A1\u548C\u6D4F\u89C8\u5668\u7684\u53CC\u5411\u901A\u4FE1",paraId:24,tocIndex:5},{value:"\u5728\u6211\u4EEC\u542F\u52A8\u672C\u5730\u670D\u52A1\u4E4B\u524D\uFF0C\u4EE3\u7801\u4E2D\u4FEE\u6539\u4E86",paraId:25,tocIndex:6},{value:"entry",paraId:25,tocIndex:6},{value:"\u5165\u53E3\uFF0C\u81EA\u52A8\u6CE8\u5165\u4E86",paraId:25,tocIndex:6},{value:"websocket",paraId:25,tocIndex:6},{value:"\u5BA2\u6237\u7AEF\u4EE3\u7801\u548C\u70ED\u66F4\u65B0\u66FF\u6362\u7684\u4EE3\u7801",paraId:25,tocIndex:6},{value:"\u5728\u8FDB\u5165",paraId:26,tocIndex:6},{value:"start",paraId:26,tocIndex:6},{value:"\u9636\u6BB5\u7684\u65F6\u5019\u4F1A\u8C03\u7528",paraId:26,tocIndex:6},{value:"initialize",paraId:26,tocIndex:6},{value:"\u65B9\u6CD5",paraId:26,tocIndex:6},{value:"client/index.js",paraId:27,tocIndex:6},{value:"\u4E3A",paraId:27,tocIndex:6},{value:"websocket",paraId:27,tocIndex:6},{value:"\u5BA2\u6237\u7AEF\u7684\u4EE3\u7801\uFF0C\u56E0\u4E3A",paraId:27,tocIndex:6},{value:"websocket",paraId:27,tocIndex:6},{value:"\u662F\u53CC\u5411\u901A\u4FE1\uFF0C\u4E0A\u4E00\u6B65\u901A\u8FC7",paraId:27,tocIndex:6},{value:"createServer",paraId:27,tocIndex:6},{value:"\u662F\u521B\u5EFA\u7684\u672C\u5730\u670D\u52A1\u7AEF\u7684",paraId:27,tocIndex:6},{value:"websocket",paraId:27,tocIndex:6},{value:"\u4EE3\u7801\uFF0C\u8FD8\u9700\u8981\u5BA2\u6237\u7AEF\u4EE3\u7801\uFF0C\u56E0\u6B64\u9700\u8981\u628A\u5BA2\u6237\u7AEF",paraId:27,tocIndex:6},{value:"websocket",paraId:27,tocIndex:6},{value:"\u4EE3\u7801\u585E\u5230\u4EE3\u7801\u4E2D",paraId:27,tocIndex:6},{value:"hot/dev-server.js",paraId:28,tocIndex:6},{value:"\u4E3B\u8981\u7528\u4E8E\u68C0\u67E5\u66F4\u65B0\u903B\u8F91",paraId:28,tocIndex:6},{value:"\u5F53\u4FEE\u6539\u5B8C",paraId:29,tocIndex:7},{value:"entry",paraId:29,tocIndex:7},{value:"\u5165\u53E3\u4E4B\u540E\uFF0C\u4F1A\u6267\u884C",paraId:29,tocIndex:7},{value:"setupHooks",paraId:29,tocIndex:7},{value:"\u65B9\u6CD5\uFF0C\u6CE8\u518C\u76D1\u542C\u4E8B\u4EF6\uFF0C\u76D1\u542C",paraId:29,tocIndex:7},{value:"webpack",paraId:29,tocIndex:7},{value:"\u7F16\u8BD1\u5B8C\u6210",paraId:29,tocIndex:7},{value:`setupHooks() {
	// \u76D1\u542C webpack \u7684done hook\uFF0Ctapable \u5B9E\u73B0
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
`,paraId:30,tocIndex:7},{value:"\u6BCF\u5F53",paraId:31,tocIndex:7},{value:"webpack",paraId:31,tocIndex:7},{value:"\u7F16\u8BD1\u5B8C\u6210\u5C31\u4F1A\u51FA\u53D1",paraId:31,tocIndex:7},{value:"done",paraId:31,tocIndex:7},{value:"hook\uFF0C\u4ECE\u800C\u8C03\u7528",paraId:31,tocIndex:7},{value:"sendStats",paraId:31,tocIndex:7},{value:"\u65B9\u6CD5\u901A\u8FC7",paraId:31,tocIndex:7},{value:"websocket",paraId:31,tocIndex:7},{value:"\u7ED9\u6D4F\u89C8\u5668\u53D1\u9001\u6D88\u606F\uFF0C",paraId:31,tocIndex:7},{value:"hash",paraId:31,tocIndex:7},{value:"/",paraId:31,tocIndex:7},{value:"ok",paraId:31,tocIndex:7},{value:"\u4E8B\u4EF6\uFF0C\u6D4F\u89C8\u5668\u80FD\u591F\u62FF\u5230\u6700\u65B0\u7684",paraId:31,tocIndex:7},{value:"hash",paraId:31,tocIndex:7},{value:"\u503C\uFF0C\u68C0\u67E5\u66F4\u65B0\u903B\u8F91",paraId:31,tocIndex:7},{value:"\u6BCF\u6B21\u6587\u4EF6\u53D1\u751F\u53D8\u5316\u4E4B\u540E\uFF0C\u90FD\u9700\u8981\u89E6\u53D1\u6587\u4EF6\u7F16\u8BD1\uFF0C\u90A3\u4E48\u4E45\u8FD8\u9700\u8981\u76D1\u542C\u6587\u4EF6\u53D1\u751F\u6539\u53D8\u3002\u8BE5\u64CD\u4F5C\u4E3B\u8981\u662F\u901A\u8FC7",paraId:32,tocIndex:8},{value:"webpack-dev-middleware",paraId:32,tocIndex:8},{value:"\u5E93\u5B9E\u73B0\u7684\u3002",paraId:32,tocIndex:8},{value:"\u5728",paraId:33,tocIndex:8},{value:"start",paraId:33,tocIndex:8},{value:"\u51FD\u6570\u4E2D\uFF0C\u4F1A\u6267\u884C",paraId:33,tocIndex:8},{value:"setupDevMiddleware",paraId:33,tocIndex:8},{value:"\u65B9\u6CD5\uFF0C\u8BE5\u65B9\u6CD5\u4E3B\u8981\u662F\u6267\u884C",paraId:33,tocIndex:8},{value:"webpack-dev-middleware",paraId:33,tocIndex:8},{value:"\u5E93\u7684\u3002",paraId:33,tocIndex:8},{value:`
1. webpack-dev-middleware: \u8BE5\u5E93\u4E3B\u8981\u505A\u6587\u4EF6\u76F8\u5173\u7684\u64CD\u4F5C\uFF0C\u672C\u5730\u6587\u4EF6\u8F93\u51FA\u4EE5\u53CA\u76D1\u542C`,paraId:34},{value:`
2. webpack-dev-server: \u8BE5\u5E93\u4E3B\u8981\u53EA\u8D1F\u8D23\u542F\u52A8\u670D\u52A1\u548C\u524D\u7F6E\u51C6\u5907\u5DE5\u4F5C
`,paraId:34},{value:"\u5728",paraId:35,tocIndex:8},{value:"webpack-dev-middleware",paraId:35,tocIndex:8},{value:"\u4E2D\u4E3B\u8981\u5B9E\u73B0",paraId:35,tocIndex:8},{value:`compiler.watch(watchOptions, errorHandler);

compiler.outputFileSystem = memfs.createFsFromVolume(new memfs.Volume());
`,paraId:36,tocIndex:8},{value:"\u8C03\u7528\u4E86",paraId:37,tocIndex:8},{value:"compiler.watch",paraId:37,tocIndex:8},{value:"\u65B9\u6CD5\u5F00\u542F\u5BF9\u6587\u4EF6\u7684\u7F16\u8BD1\uFF0C\u6587\u4EF6\u53D8\u5316\u7684\u65F6\u5019\u91CD\u65B0\u7F16\u8BD1\u6587\u4EF6\u3002",paraId:37,tocIndex:8},{value:"\u66F4\u6539",paraId:38,tocIndex:8},{value:"outputFileSystem",paraId:38,tocIndex:8},{value:"\uFF0C\u4F7F\u7528",paraId:38,tocIndex:8},{value:"memory-fs",paraId:38,tocIndex:8},{value:"\u5C06\u6240\u6709\u7684 output \u5B58\u50A8\u5728\u5185\u5B58\u4E2D\uFF0C\u51CF\u5C11\u5BF9\u6587\u4EF6\u7CFB\u7EDF\u7684\u64CD\u4F5C",paraId:38,tocIndex:8},{value:"\u5728\u4E0A\u9762\u8BB2\u5230\u6BCF\u4E00\u6B21",paraId:39,tocIndex:9},{value:"webpack",paraId:39,tocIndex:9},{value:"\u7F16\u8BD1\u7ED3\u675F\u4E4B\u540E\uFF0C\u90FD\u4F1A\u901A\u8FC7",paraId:39,tocIndex:9},{value:"done",paraId:39,tocIndex:9},{value:"hook \u8C03\u7528",paraId:39,tocIndex:9},{value:"sendStats",paraId:39,tocIndex:9},{value:"\u65B9\u6CD5\u901A\u8FC7",paraId:39,tocIndex:9},{value:"websocket",paraId:39,tocIndex:9},{value:"\u4F20\u9012\u76F8\u5173\u7684\u6570\u636E\u3002",paraId:39,tocIndex:9},{value:"\u5BA2\u6237\u7AEF\u4E2D\u4F1A\u88AB\u6CE8\u5165",paraId:40,tocIndex:9},{value:"webpack-dev-server/client/index.js",paraId:40,tocIndex:9},{value:"\u4EE3\u7801\uFF0C\u4E3B\u8981\u7528\u4E8E\u63A5\u6536\u76F8\u5173\u6570\u636E",paraId:40,tocIndex:9},{value:`var onSocketMessage = {
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

// \u8FDE\u63A5\u670D\u52A1\u5730\u5740 socketUrl\uFF0C?http://localhost:8080\uFF0C\u672C\u5730\u670D\u52A1\u5730\u5740
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
`,paraId:41,tocIndex:9},{value:"\u6CE8\u5165\u7684\u5BA2\u6237\u7AEF\u4EE3\u7801\u804C\u8D23",paraId:42,tocIndex:9},{value:"socket",paraId:43,tocIndex:9},{value:"\u65B9\u6CD5\u5EFA\u7ACB\u4E86",paraId:43,tocIndex:9},{value:"websocket",paraId:43,tocIndex:9},{value:`\u548C\u670D\u52A1\u7AEF\u7684\u8FDE\u63A5\uFF0C\u5E76\u6CE8\u518C\u4E86\u4E00\u7CFB\u5217\u7684\u76D1\u542C\u4E8B\u4EF6
`,paraId:43,tocIndex:9},{value:"hash",paraId:44,tocIndex:9},{value:"\u4E8B\u4EF6\uFF0C\u66F4\u65B0\u6700\u65B0\u4E00\u6B21\u6253\u5305\u540E\u7684",paraId:44,tocIndex:9},{value:"hash",paraId:44,tocIndex:9},{value:"\u503C",paraId:44,tocIndex:9},{value:"ok",paraId:44,tocIndex:9},{value:"\u4E8B\u4EF6\uFF0C\u8FDB\u884C\u70ED\u66F4\u65B0\u68C0\u67E5",paraId:44,tocIndex:9},{value:"ok",paraId:43,tocIndex:9},{value:"\u4E8B\u4EF6\u4E2D\u6267\u884C",paraId:43,tocIndex:9},{value:"reloadApp",paraId:43,tocIndex:9},{value:"\u65B9\u6CD5\uFF0C\u901A\u8FC7",paraId:43,tocIndex:9},{value:"eventEmitter",paraId:43,tocIndex:9},{value:"\u53D1\u51FA",paraId:43,tocIndex:9},{value:"webpackHotUpdate",paraId:43,tocIndex:9},{value:"\u4E8B\u4EF6\uFF0C\u901A\u77E5",paraId:43,tocIndex:9},{value:"webpack",paraId:43,tocIndex:9},{value:"\u8BE5\u5E72\u6D3B\u4E86",paraId:43,tocIndex:9},{value:"\u90A3\u4E48\uFF0Cwebpack \u80AF\u5B9A\u662F\u9700\u8981\u76D1\u542C",paraId:45,tocIndex:9},{value:"webpackHotUpdate",paraId:45,tocIndex:9},{value:"\u4E8B\u4EF6\u7684\uFF0C\u6CA1\u9519\uFF0C\u5C31\u5728\u4E4B\u524D\u653E\u5165",paraId:45,tocIndex:9},{value:"webpack/hot/dev-server.js",paraId:45,tocIndex:9},{value:"\u4EE3\u7801\u4E2D",paraId:45,tocIndex:9},{value:`var check = function check() {
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
`,paraId:46,tocIndex:9},{value:"\u80FD\u591F\u770B\u5230",paraId:47,tocIndex:9},{value:"hot/dev-server.js",paraId:47,tocIndex:9},{value:"\u76D1\u542C\u4E86",paraId:47,tocIndex:9},{value:"webpackHotUpdate",paraId:47,tocIndex:9},{value:"\u4E8B\u4EF6\uFF0C\u5E76\u4E14\u4F1A\u53BB\u6267\u884C",paraId:47,tocIndex:9},{value:"module.hot.check",paraId:47,tocIndex:9},{value:"\u65B9\u6CD5",paraId:47,tocIndex:9},{value:"HotModuleReplacementPlugin",paraId:34},{value:"\u6211\u4EEC\u80FD\u591F\u6D4F\u89C8\u5668\u7684",paraId:48,tocIndex:10},{value:"Sources",paraId:48,tocIndex:10},{value:"\u7684",paraId:48,tocIndex:10},{value:"bundle.js",paraId:48,tocIndex:10},{value:"\u4E2D\u627E\u5230\u4E0A\u8FF0\u4EE3\u7801\uFF0C\u521B\u5EFA\u5BF9\u5E94",paraId:48,tocIndex:10},{value:"hot",paraId:48,tocIndex:10},{value:"\u5BF9\u8C61\uFF0C\u91CC\u9762\u5C31\u80FD\u591F\u5BF9\u5E94\u7684",paraId:48,tocIndex:10},{value:"check",paraId:48,tocIndex:10},{value:"\u65B9\u6CD5\u3002\u6CE8\u5165\u7684\u4EE3\u7801\u53EF\u4EE5\u5728",paraId:48,tocIndex:10},{value:"HotModuleReplacement.runtime.js",paraId:48,tocIndex:10},{value:"\u627E\u5230",paraId:48,tocIndex:10},{value:"\u5F53\u6211\u4EEC\u914D\u7F6E",paraId:49,tocIndex:10},{value:"hot",paraId:49,tocIndex:10},{value:"\u5C5E\u6027\u7684\u65F6\u5019",paraId:49,tocIndex:10},{value:"webpack-dev-server",paraId:49,tocIndex:10},{value:"\u4F1A\u81EA\u52A8\u8F6C\u6210",paraId:49,tocIndex:10},{value:"HotModuleReplacementPlugin",paraId:49,tocIndex:10},{value:`if (this.options.hot) {
  const HMRPluginExists = compiler.options.plugins.find(
    (p) => p && p.constructor === webpack.HotModuleReplacementPlugin,
  );

  if (HMRPluginExists) {
    this.logger.warn(
      \`"hot: true" automatically applies HMR plugin, you don't have to add it manually to your webpack configuration.\`,
    );
  } else {
    // Apply the HMR plugin
    const plugin = new webpack.HotModuleReplacementPlugin();

    plugin.apply(compiler);
  }
}
`,paraId:50,tocIndex:10},{value:"HotModuleReplacementPlugin",paraId:51,tocIndex:10},{value:"\u4F1A\u6084\u6084\u7684\u52A0\u4E00\u4E9B\u4EE3\u7801\u5230\u4EA7\u7269\u4E2D",paraId:51,tocIndex:10},{value:"\u4E0A\u8FF0\u77E5\u9053\u4E86 module.hot.check \u7684\u6765\u6E90\uFF0C\u73B0\u5728\u770B\u770B\u8BE5",paraId:52,tocIndex:11},{value:"check",paraId:52,tocIndex:11},{value:"\u51FD\u6570\u5177\u4F53\u505A\u4E86\u4EC0\u4E48\u4E8B\u60C5",paraId:52,tocIndex:11},{value:"$hmrDownloadManifest$",paraId:34},{value:"hash.hot-update.json",paraId:34},{value:`// $hmrDownloadManifest$ \u90FD\u662F\u52A8\u6001\u6CE8\u5165\u7684\u4EE3\u7801
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
`,paraId:53,tocIndex:12},{value:'$hmrDownloadUpdateHandlers$["jsonp"]',paraId:34},{value:"js",paraId:34},{value:`// \u6267\u884C loadUpdateChunk
__webpack_require__.hu = (chunkId) => {
  return '' + chunkId + '.' + __webpack_require__.h() + '.hot-update.js';
};

// __webpack_require__.l \u4E2D\u521B\u5EFA script \u6807\u7B7E\u4E0B\u8F7D hash.hot-update.js
`,paraId:54,tocIndex:13},{value:"\u7EC8\u4E8E\u5230\u4E86\u6700\u540E\u4E00\u6B65\u70ED\u66F4\u65B0\u7684\u64CD\u4F5C\uFF0C\u6240\u6709\u7684\u4EE3\u7801\u903B\u8F91\u90FD\u5728",paraId:55,tocIndex:14},{value:"internalApply",paraId:55,tocIndex:14},{value:"\u4E2D",paraId:55,tocIndex:14},{value:`var queue = outdatedModules.slice();
while (queue.length > 0) {
  moduleId = queue.pop();
  // \u4ECE\u7F13\u5B58\u4E2D\u5220\u9664\u8FC7\u671F\u7684\u6A21\u5757
  module = installedModules[moduleId];
  // \u5220\u9664\u8FC7\u671F\u7684\u4F9D\u8D56
  delete outdatedDependencies[moduleId];
}
`,paraId:56,tocIndex:15},{value:"webpack_require",paraId:34},{value:`appliedUpdate[moduleId] = newModuleFactory;

for (var updateModuleId in appliedUpdate) {
  if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
    __webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
  }
}
`,paraId:57,tocIndex:16},{value:"hot._acceptedDependencies",paraId:34},{value:"callback",paraId:34},{value:"\u4E0A\u8FF0\u6211\u4EEC\u901A\u8FC7\u516B\u4E2A\u6B65\u9AA4\u5927\u81F4\u8BB2\u89E3\u4E86",paraId:58,tocIndex:18},{value:"HMR",paraId:58,tocIndex:18},{value:"\u7684\u5B9E\u73B0\u539F\u7406",paraId:58,tocIndex:18},{value:"\u901A\u8FC7",paraId:59,tocIndex:18},{value:"webpack-dev-server",paraId:59,tocIndex:18},{value:"\u521B\u5EFA\u672C\u5730\u670D\u52A1\uFF0C\u4FEE\u6539",paraId:59,tocIndex:18},{value:"entry",paraId:59,tocIndex:18},{value:"\u5165\u53E3\uFF0C\u6CE8\u5165",paraId:59,tocIndex:18},{value:"websocket",paraId:59,tocIndex:18},{value:"\u5BA2\u6237\u7AEF\u4EE3\u7801\u548C\u70ED\u66F4\u65B0\u66FF\u6362\u4EE3\u7801",paraId:59,tocIndex:18},{value:"hot-server",paraId:59,tocIndex:18},{value:"\u5230",paraId:59,tocIndex:18},{value:"bundle",paraId:59,tocIndex:18},{value:"\u4E2D",paraId:59,tocIndex:18},{value:"\u5728",paraId:59,tocIndex:18},{value:"webpack",paraId:59,tocIndex:18},{value:"\u521B\u5EFA\u7684\u65F6\u5019\u4F1A\u901A\u8FC7",paraId:59,tocIndex:18},{value:"HotModuleReplacementPlugin",paraId:59,tocIndex:18},{value:"\u5411",paraId:59,tocIndex:18},{value:"bundle",paraId:59,tocIndex:18},{value:"\u4E2D\u6CE8\u5165\u70ED\u66F4\u65B0\u4EE3\u7801",paraId:59,tocIndex:18},{value:"\u901A\u8FC7",paraId:59,tocIndex:18},{value:"compiler.watch",paraId:59,tocIndex:18},{value:"\u5F00\u542F\u6587\u4EF6\u76D1\u542C\uFF0C\u6BCF\u4E00\u6B21\u7F16\u8BD1\u5B8C\u6210\u89E6\u53D1",paraId:59,tocIndex:18},{value:"compiler.hooks.done",paraId:59,tocIndex:18},{value:"\uFF1B\u76D1\u542C",paraId:59,tocIndex:18},{value:"compiler.hooks.done",paraId:59,tocIndex:18},{value:"\u6BCF\u6B21\u5B8C\u6210\u7F16\u8BD1\u4E4B\u540E\u7ED9\u5BA2\u6237\u7AEF\u53D1\u9001",paraId:59,tocIndex:18},{value:"hash/ok",paraId:59,tocIndex:18},{value:"\u4E8B\u4EF6",paraId:59,tocIndex:18},{value:"webpack/client",paraId:59,tocIndex:18},{value:"\u63A5\u6536\u5230",paraId:59,tocIndex:18},{value:"ok",paraId:59,tocIndex:18},{value:"\u4E8B\u4EF6\u4E4B\u540E\uFF0C\u901A\u8FC7",paraId:59,tocIndex:18},{value:"eventEmitter",paraId:59,tocIndex:18},{value:"\u4F5B\u90A3\u4E2A\u9001",paraId:59,tocIndex:18},{value:"webpackHotUpdate",paraId:59,tocIndex:18},{value:"\u4E8B\u4EF6",paraId:59,tocIndex:18},{value:"\u5728",paraId:59,tocIndex:18},{value:"webpack/hot-server",paraId:59,tocIndex:18},{value:"\u4E2D\u4F1A\u76D1\u542C",paraId:59,tocIndex:18},{value:"webpackHotUpdate",paraId:59,tocIndex:18},{value:"\u4E8B\u4EF6\uFF0C\u4ECE\u800C\u6267\u884C",paraId:59,tocIndex:18},{value:"module.hot.check",paraId:59,tocIndex:18},{value:"(",paraId:59,tocIndex:18},{value:"HotModuleReplacementPlugin",paraId:59,tocIndex:18},{value:"\u6CE8\u5165\u7684\u4EE3\u7801)\u5B8C\u6210\u70ED\u66F4\u65B0\u64CD\u4F5C",paraId:59,tocIndex:18}]}}]);

---
title: webpack plugin
group:
  title: webpack
  order: 3
order: 3
---

## 前言

Plugin 是 webpack 中最核心的机制，且是 webpack 生态中最关键的一部分，它让社区用户可以自定义 Plugin 来控制 webpack 的编译过程。

该篇文章将会讲解 Plugin 的相关机制。

## Plugin

webpack 在编译过程中，会初始化不同的 Hook，用户可以在 Plugin 通过这些 Hook 去注册相关的事件，在打包过程过会在不同阶段去触发这些事件从而实现自定义行为。

该逻辑是由 Tapable 机制实现的，具体可以查看[该文章](/engineering/webpack-tapable)

### Plugin 的主要构成

```js
class DonePlugin {
  apply(compiler) {
    // 调用 Compiler Hook 注册额外逻辑
    compiler.hooks.done.tap('Done Plugin', () => {
      console.log('compilation done');
    });
  }
}

module.exports = DonePlugin;
```

上述 Plugin 主要实现了在编译完成后输出”compilation done”

- Plugin 是一个 class，也可以是一个 Function
- Plugin 对象上要有一个 apply 方法，其接受 compiler 参数，在 webpack 创建 compiler 的时候会调用 Plugin 上的 apply 方法
- 在 apply 中调用 Hook 方法，通过 hook.tap 注册对应的事件函数
- 根据不同 Hook 类型在 webpack 不同阶段执行

### Plugin 主要对象

#### compiler

compiler 对象包含了当前运行 webpack 的配置，包括 entry、output、loaders 等配置，该个对象在启动 webpack 时被实例化，而且是全局唯一的。Plugin 可以通过该对象获取到 webpack 的配置信息进行处理。

常用的 hook 如下:

| 钩子         | 类型              | 什么时候调用                                                        |
| ------------ | ----------------- | ------------------------------------------------------------------- |
| run          | AsyncSeriesHook   | 在编译器开始读取记录前执行                                          |
| compile      | SyncHook          | 在一个新的 compilation 创建之前执行                                 |
| compilation  | SyncHook          | 在一次 compilation 创建后执行插件                                   |
| make         | AsyncParallelHook | 完成一次编译之前执行                                                |
| emit         | AsyncSeriesHook   | 在生成文件到 output 目录之前执行，回调参数：compilation             |
| afterEmit    | AsyncSeriesHook   | 在生成文件到 output 目录之后执行                                    |
| assetEmitted | AsyncSeriesHook   | 生成文件的时候执行，提供访问产出文件信息的入口，回调参数：file,info |
| done         | AsyncSeriesHook   | 一次编译完成后执行，回调参数：stats                                 |

更多钩子可以[点击查看](https://webpack.docschina.org/api/compiler-hooks/)

#### compilation

compilation 对象代表一次资源构建，其职责就是构建模块和 chunk，并利用插件优化构建过程

compiler 代表了整个 webpack 从启动到关闭的生命周期，而 compilation 只是代表了一次新的编译，只要文件有改动，compilation 就会被重新创建

常用的 hook 如下:

| 钩子                 | 类型            | 什么时候调用                                                                         |
| -------------------- | --------------- | ------------------------------------------------------------------------------------ |
| processAssets        | AsyncSeriesHook | asset 处理                                                                           |
| buildModule          | SyncHook        | 在模块开始缉译之前触发,可以用于修改模块                                              |
| succeedModule        | SyncHook        | 当一个模块被成功编译,会执行这个钩子                                                  |
| finishModules        | AsyncSeriesHook | 当所有模块都缉译成功后被调用                                                         |
| seal                 | SyncHook        | 当一次 compilation 停止接收新模块时发                                                |
| optimizeDependencies | SyncBailHook    | 在依赖优化的开始执行                                                                 |
| optimize             | SyncHook        | 在优化阶段的开始执行                                                                 |
| optimizeModules      | SyncBailHook    | 在模块优化阶段开始时执行，插件可以在这个钩子里执行对模块的优化，回调参数：modules    |
| optimizeChunks       | SyncBailHook    | 在代码块优化阶段开始时执行，插件可以在这个钩子里执行对代码块的优化，回调参数：chunks |
| optimizeAssets       | AsyncSeriesHook | 优化存储在 compilation.assets 中的所有 asset，回调参数：asset                        |

更多钩子可以[点击查看](https://webpack.docschina.org/api/compilation-hooks/)

## 手写 Plugin

### fileListPlugin

需求：每次打包完成之后，需要输出一个文件清单的 markdown 文件到 dist 目录

思路如下：

- 需要输出将 markdown 文件输出到 output 文件中，选择合适的钩子 compiler.hooks.compilation/compilation.hooks.processAssets 处理 assets
- 通过 asset 获取到文件数量，自定义 md 文件写入相关的 content
- 给 dist 文件夹里添加一个资源名称为 fileListName 的变量，写入资源的内容和文件大小
- 执行回调，让 webpack 继续执行

```js
class FileListPlugin {
  constructor(opts) {
    this.fileName = opts?.fileName || 'fileList.md';
  }
  apply(compiler) {
    compiler.hooks.compilation.tap('FileListPlugin', (compilation) => {
      compilation.hooks.processAssets.tapAsync(
        {
          name: 'FileListPlugin',
          stage: 'PROCESS_ASSETS_STAGE_ADDITIONAL',
        },
        (assets, callback) => {
          const length = Object.keys(assets).length;

          let content = `# ${length} file${
            length > 1 ? 's' : ''
          } emitted by webpack\n\n`;

          for (let filename in assets) {
            content += `- ${filename}\n`;
          }

          assets[this.fileName] = {
            source: () => content,
            size: () => content.length,
          };
          callback();
        },
      );
    });
  }
}
```

如果通过 compiler.hooks.emit 来获取 compilation.assets 会有警告，该 hook 会被遗弃掉，因此改为使用 compilation.hooks.processAssets

### autoPolyfillsWebpackPlugin

需求：根据 browserslistrc 和 coreJS 生成对应的 polyfill

思路如下：

- 获取 browserslistrc 通过 core-js-builder 在当前目录下生成 polyfill 文件
- 需要通过 html-webpack-plugin 的 beforeAssetTagGeneration 在生成 html 之前插入该 polyfill 文件

具体代码[请查看](https://github.com/DTStack/ko/blob/master/packages/auto-polyfills-webpack-plugin/index.ts)

![Untitled](/blog/imgs/webpackPlugin/Untitled.png)

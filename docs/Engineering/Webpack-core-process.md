---
title: webpack 核心流程
group:
  title: webpack
  order: 3
order: 0
---

## 三个阶段

### 初始化阶段

1. 初始化参数：从配置文件、配置对象、shell 参数中读取，与默认的配置参数结合得出最后的参数
2. 创建编译器对象：通过上一步得到的参数创建 Compiler 对象
3. 初始化编译器环境：注入内置插件、各种模块工厂、加载配置等
4. 开始编译：执行 compiler 对象的 run 方法
5. 确定入口：根据配置中的 entry 找到对应的入口文章，使用`compilation.addEntry`将入口文件转换为 dependence 对象

### 构建阶段

1. 编译模块(make)：根据 entry 对应 dependence 创建 module 对象，调用 loader 将模块转移成为辨准的 JS 内容，在将其转成 AST 对象，从中找出该模块依赖的模块，再递归至所有的入口文件都经历了该步骤
2. 完成模块编译：上一步处理完成之后，得到每一个模块被转译之后的内容以及对应的依赖关系图

### 生成阶段

1. 输出资源(seal)：根据入口文件和模块之间的依赖关系，组装成一个个包含多个模块的 chunk，再把每一个 chunk 转换成为单独的一个文件放到输出列表，最后一次可以修改输出内容的机会
2. 写入文件系统(emitAssets)：确定好了输出内容，根据输出路径和文件名，把文件写入到文件系统

## 初始化阶段

![Untitled](/blog/imgs/webpackCore/Untitled.png)

### new webpack(config, callback)

webpack 支持两个参数，config 是 webpack.config.js 的配置，callback 是回调函数

webpack 引用于 [webpack/lib/webpack.js](https://github.com/webpack/webpack/blob/main/lib/webpack.js)

![Untitled](/blog/imgs/webpackCore/Untitled%201.png)

上图是 webpack() 的流程图，定义了 create 函数

create 函数主要完成

1. 定义相关的参数
2. 通过 createCompiler 创建 compiler 对象
3. 返回 compiler 和其他参数

会根据 callback 回调执行不同的操作

- 如果传入了 callback 参数，会通过 create 方法拿到对应的 compiler 对象，并执行 compiler.run 方法，返回 compiler 对象
  - 在这其中会判断是否配置 watch 参数，如果有会监听文件改变，重新编译
- 如果没有传入 callback 参数，也会通过 create 方法拿到对应的 compiler 对象，直接返回

因此调用 webpack() 方法有两种方式

```js
// webpack 函数有传回调函数
const compiler = webpack(config, (err, stats) => {
  if (err) {
    console.log(err);
  }
});

// 执行 webpack 函数没有传回调函数，手动调用一下 compiler.run
const compiler = webpack(config);
compiler.run((err, stats) => {
  if (err) {
    console.log(err);
  }
});
```

### createCompiler

在上一步中，调用了 create 方法，compiler 对象实则是通过 [createCompiler](https://github.com/webpack/webpack/blob/main/lib/webpack.js#L62) 函数返回的

![Untitled](/blog/imgs/webpackCore/Untitled%202.png)

主要逻辑都是在 [WebpackOptionsApply.process](https://github.com/webpack/webpack/blob/main/lib/WebpackOptionsApply.js#L61) 中，该方法是将 config 中配置的属性转成 plugin 注入到 webpack 中

通过 [Compiler](https://github.com/webpack/webpack/blob/main/lib/Compiler.js#L133) 类创建了 compiler 对象，通过 constructor 初始化一些内容

- 使用 [tapable](https://webpack.docschina.org/api/plugins/#tapable) 初始化一系列的 hooks
- 初始化一些参数

### compiler.run

在第一步的时候调用 webpack 之后，最后都会调用 [compiler.run](https://github.com/webpack/webpack/blob/main/lib/Compiler.js#L453) 方法

从代码中可以看出来，compiler.run 方法主要做了：

1. 定义错误处理函数 finalCallback
2. 定义 onCompiled 作为 this.compile 的回调
3. 定义 run 方法，执行 run 方法

简单来说，compiler.run 其实最后调用的是 compiler.compile 方法

### compiler.compile

[compiler.compile](https://github.com/webpack/webpack/blob/main/lib/Compiler.js#L1293) 该方法中才开始做 make 处理

从代码中可以看出来，compiler.compile 方法主要做了：

1. 初始化 compilation 参数，调用`new Compilation`创建 compilation 对象
2. 执行 make hook，调用`compilation.addEntry`方法，进入构建阶段
3. compilation.seal，执行 seal，对 make 阶段处理过的 module 代码进行封装 chunk 输出最终产物
4. afterCompile hook，执行收尾逻辑

调用`compile`函数触发`make`钩子后，初始化阶段就算是结束了，流程逻辑开始进入「**构建阶段**」

## 构建阶段

构建阶段主要使用的 compilation 对象，它和 compiler 是有区别

<aside>
💡 compiler：webpack 刚构建时就会创建 compiler 对象，存在于 webpack 整个生命周期
compilation：在准备编译某一个模块的时候才会创建，主要存在于 compile 到 make 这一段生命周期里面
开启 wacth 对文件进行监听时，文件发生改变需要重新编译只需要重新创建一个 compilation 对象即可，不需要重新创建 compiler 对象做很多第一步初始化操作。如果改变了 config，则需要重新执行 dev/build 命令，创建新的 compiler 对象。

</aside>

![Untitled](/blog/imgs/webpackCore/Untitled%203.png)

1. 当执行初始化阶段的时候`WebpackOptionsApply.process`的时候会去初始化 EntryPlugin 调用`compiler.hooks.make.tapAsync`注册 compiler 的 make 钩子，用来开启编译
2. 当初始化完成之后调用`compiler.compile`方法时，会执行`this.hooks.make.callAsync`，从而开始执行`compilation.addEntry`添加入口文件
3. 调用`handleModuleCreation`方法，根据文件类型创建不同的 module
4. 调用`module.build`开始构建，通过 loader-runner 转译 module 内容，将各种资源转为 webpack 可以理解的 JavaScript 文本
5. 调用 acorn 的`parse`方法将 JS 代码解析成为 AST 结构
6. 通过 JavaScriptParser 类中遍历 AST，触发各种 hooks
   - 遇到 import 语句时，触发`hooks.exportImportSpecifier`
   - 该 hook 在 HarmonyExportDependencyParserPlugin 插件中被注册，会将依赖资源添加成为 Dependency 对象
   - 调用`module.addDependency`将依赖对象加入到 module 依赖列表中
7. AST 遍历完毕后，调用`module.handleParseResult`处理模块依赖
8. 对于 module 新增的依赖，调用`handleModuleCreate`，控制流回到第一步
9. 所有依赖都解析完毕后，构建阶段结束

在整个过程中数据流 module ⇒ AST ⇒ dependency ⇒ module 的转变，将源码转为 AST 主要是为了分析模块的 import 语句收集相关依赖数组，最后遍历 dependences 数组将 Dependency 转换为 Module 对象，之后递归处理这些新的 Module，直到所有项目文件处理完毕

总结来说就是，从入口文件开始收集其依赖模块，并对依赖模块再进行相同的模块处理

### 构建过程

![Untitled](/blog/imgs/webpackCore/Untitled%204.png)

例如上图，entry 文件为 index.js，分别依赖 a.js/b.js，其中 a.js 又依赖 c.js/d.js

**第一步**

根据 webpack 初始化之后，能够确定入口文件 index.js，并调用`compilation.addEntry`函数将之添加为 Module 对象

![Untitled](/blog/imgs/webpackCore/Untitled%205.png)

**第二步**

通过 acorn 解析 index 文件，分析 AST 得到 index 有两个依赖

![Untitled](/blog/imgs/webpackCore/Untitled%206.png)

**第三步**

得到了两个 dependence 之后，调用 module[index] 的 handleParserResult 方法处理 a/b 两个依赖对象

![Untitled](/blog/imgs/webpackCore/Untitled%207.png)

**第四步**

又触发 module[a/b] 的 handleModuleCreation 方法，从 a 模块中又解析到 c/d 两个新依赖，于是再继续调用 module[a] 的 handleParseResult，递归上述流程

![Untitled](/blog/imgs/webpackCore/Untitled%208.png)

**第五步**

最终得到 a/b/c/d 四个 Module 以及其对应的 dependence

![Untitled](/blog/imgs/webpackCore/Untitled%209.png)

所有的模块构建完毕，没有新的依赖可以继续，由此进入生成阶段

## 生成阶段

在构建阶段 make 结束之后，就会进入生成阶段，调用`compilation.seal`表明正式进入生成阶段

在 seal 阶段主要是是将构建阶段生成的 module 拆分组合到 chunk 对象中，再转译成为目标环境的产物，并写出为产物文件，解决的是资源输出问题

![Untitled](/blog/imgs/webpackCore/Untitled%2010.png)

1. 构建本次编译的`ChunkGraph`对象
2. 通过`hooks.optimizeDependencies`优化模块依赖关系
3. 循环`compilation.entries`入口文件创建 chunks，调用 addChunk 为每一个入口添加 chunk 对象，并且遍历当前入口的 dependency 对象找到对应 module 对象关联到该 chunk
4. 触发`optimizeModules/optimizeChunks`等钩子，对 chunk 和 module 进行一系列的优化操作，这些优化操作都是有插件去完成的，例如 SplitChunksPlugin
5. 调用`codeGeneration`方法生成 chunk 代码，会根据不同的 module 类型生成 template 代码
6. 调用`createChunkAssets`方法为每一个 chunk 生成资产文件
7. compilation.emitAsset 将产物提交到 **compilation.assets** 中，还尚未写入磁盘
8. 最后执行 callback 回调回到 compile 的控制流中，执行 onCompiled 方法中的 compiler.emitAsset 输出资产文件

## 流转过程

在 webpack 执行的三个阶段，对应着资源形态扭转，每一个阶段操作的对象都是不一样的

![Untitled](/blog/imgs/webpackCore/Untitled%2011.png)

- compication.make
  - 以 entry 文件为入口，作为 dependency 放入 compilcation 的依赖列表
  - 根据 dependences 创建 module 对象，之后读入 module 对应的文件内容，调用 loader-runner 对内容做转化，转化结果若有其它依赖则继续读入依赖资源，重复此过程直到所有依赖均被转化为 module
- compication.seal
  - 遍历所有的 module，根据 entry 的配置以及 module 的类型，分配到不同的 chunk
  - 将 chunk 构建成为 chunkGraph
  - 遍历 chunkGraph 调用 complication.emitAssets 方法标记 chunk 的输出规则，即转化为 assets 集合。
- compiler.emitAssets
  - 将 assets 输出到文件系统

## 总结

- 初始化阶段：负责构建环境，初始化工厂类，注入内置插件
- 构建阶段：读入并分析 entry 文件，查找其模块依赖，再一次处理模块依赖的依赖，直到所有的依赖都被处理完毕，该过程解决资源输入问题
- 生成阶段：根据 entry 的配置将模块封装称为不同的 chunk，经过一系列的优化再将模块代码编译成为最终的形态，按 chunk 合并成最后的产物，该过程解决资源输出问题

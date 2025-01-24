---
title: pnpm 是如何吊打 npm/yarn 的
group:
  title: 包管理
  order: 4
order: 4
---

[前文](/engineering/base-npm)剖析了 npm/yarn 这两种包管理工具，这篇文章要介绍吊打它们的 pnpm!

<!-- more -->

# pnpm

## 什么是 pnpm

其官网这样说：

> Fast, disk space efficient package manager 快速的，节省磁盘空间的包管理工具

pnpm 本质上就是一个包管理器，在这一点和 npm/yarn 没有区别，但是其两个优势在于：

1. 包安装数度极快  
   官方  [benchmarks](https://link.juejin.cn/?target=https%3A%2F%2Fpnpm.io%2Fzh%2Fbenchmarks) 对 npm、pnpm、yarn、yarnPnP 对多个情景下的性能基准测试，涵盖了很多使用场景

2. 磁盘空间利用非常高效  
   使用 yarn 安装依赖时的 node_modules

   ![20](https://user-images.githubusercontent.com/38368040/164898512-47ed7c1a-7f8c-4449-a8ca-154d73768576.png)

   使用 pnpm 安装依赖时的 node_modules

   ![21](https://user-images.githubusercontent.com/38368040/164898607-6e1dfa2d-c517-417b-9abe-a88a7984b2af.png)

   pnpm 内部使用**基于内容寻址**的文件系统来存储磁盘上所有的文件，该文件系统出色的地方在于

   - 不会重复安装同一个包。在 npm/yarn 中，我们所有的项目(10 个)有依赖了 dt-common，dt-common 会被安装 10 次，dt-common 这个包在磁盘中就会有 10 个地方写入该代码。但是在 pnpm 中只会被安装一次，磁盘中只有一个地方会写入，后面再次使用都直接使用**硬连接 hardlink**

3. 支持 monorepo
4. 相对安全

## 前置知识-软链接和硬链接

在 Linux 中有两种链接方式：

- 硬连接 hard link
- 软链接 soft link，又称为符号链接 symbolic link
  不论是硬链接或软链接都不会将原本的源文件复制一份，只会占用非常少量的磁盘空间

### inode

每个文件都有**唯一一个** inode，它包含了文件元信息，在访问文件时，对应的元信息会被 copy 到内存去实现文件的访问  
使用`stat xxx`能够查到对应的 inode

![22](https://user-images.githubusercontent.com/38368040/164908971-ba03c7f2-1db8-4ccb-bc2f-aa7e1753a46c.png)

### hard link

硬链接可以理解成为一个相互的指针，**创建的 hardlink 指向源文件的 inode**，系统并不为会其分配新的 inode  
硬链接不管有多少个，都会指向用一个 inode 节点，这等同于修改源文件或者链接文件时都会被同步修改(感觉和 JS 对象引用地址略微相似  
每新建一个 hardlink 会把节点连接数增加，只要节点的链接数非零，文件就一直存在，不管你删除的是源文件还是 hradlink。只要有一个存在，文件就存在

### soft link

软链接可以理解为单向指针，**一个独立的文件且拥有独立的 inode**，永远指向源文件  
修改源文件内容，软链接内容也会改变。当删除源文件时，访问软链接会报错`No such file or directory`

![23](https://user-images.githubusercontent.com/38368040/164908983-8be27c07-20a4-4cbc-8202-e26c656a864f.png)

### 软硬链接对 node 寻包的影响

可以使用`ln`命令对文件和目录在另一个位置建立一个同步的链接
语法： `ln [参数][源文件或目录][目标文件或目录]`

在某个项目中新建两个文件夹 one/two，目录结构如下：

![24](https://user-images.githubusercontent.com/38368040/164909006-6d388849-36f5-46e6-9873-188271c69b6f.png)

one/index.js 中内容如下：

```js
const base64 = require('base64-js');
console.log(base64);
```

现在运行当前 one/index.js 一定会报错，因为我们的 one 文件下不存在 base64-js 依赖  
分别在 two 文件下创建 one/index.js 的硬链接/软链接文件

![27](https://user-images.githubusercontent.com/38368040/164909017-d59640bf-4008-4a8f-a429-261d70d56d24.png)

hard.js 是一个硬链接，soft.js 是一个软链接  
我们分别执行 node hard.js/node soft.js

![28](https://user-images.githubusercontent.com/38368040/164909023-6ddef2cf-8be3-4bb9-8b7c-8608a0403867.png)

发现硬链接是可以正常运行的，但是软链接不行。这是因为**硬链接会从链接到的位置开始查找依赖，而软链接会从文件原始位置开始查找依赖。**

### 软链依赖目录

上述的例子讲清楚了 node 处理软硬链接的不同之处，那我们将 two/node_modules 软链接到 one 的目录下，one/index.js 和 two/soft.js 能否正常运行呢 🤔

```shell
ln -s  ../two/node_modules ./one
```

![25](https://user-images.githubusercontent.com/38368040/164909061-5432ba91-059a-4d57-835f-e8d7fd053244.png)

对应执行 one/index.js 和 two/soft.js。哇哦，work well

![26](https://user-images.githubusercontent.com/38368040/164909068-2271bac5-718b-44cd-8e79-e952143ad95b.png)

通过上面的示例，我们发现即使当前 node_modules 是一个软链接也能够作为依赖被查找到，说明**软链可以将其他地方的目录增加到依赖查找路径中。**

## 依赖管理

```json
{
  "name": "npm-test",
  "dependencies": {
    "buffer": "^5.4.3"
  }
}
```

在我们的 npm-test 项目中执行`pnpm i`控制台会有如下输出：

![30](https://user-images.githubusercontent.com/38368040/164909075-9bb71282-686f-4cfe-8874-19024fd2a3e5.png)

能够发现在 Progress 中，能够明确有多少包被复用和重新下载了多少包  
并且当我们运行`pnpm install`进行 node_modules 安装的时候，会使用**软链接 & 硬链接**的方式来节省磁盘空间 & 提升安装效率

### pnpm 的 node_modules 目录结构(软链接的使用)

上述安装得到如图的 node_modules：.pnpm 文件 & package.json 描述的其他文件

![29](https://user-images.githubusercontent.com/38368040/164909081-a7d48958-46b2-400f-9add-592b314d65bd.png)

- .pnpm 目录：存放了所有实际安装的包，它里面全部都是我们项目所需要的依赖，**唯一不同的它们是来自 store 目录的硬链接**
- 其他文件：package.json 中声明的包，**只是生成一个软链接，实际指向.pnpm 中安装的包**
  因为我们只依赖项中直定义了`buffer`，所以它是唯一一个你的应用必须拥有访问权限的包(想了解为什么要对依赖项做严格控制，[点击查看](https://medium.com/pnpm/pnpms-strictness-helps-to-avoid-silly-bugs-9a15fb306308))  
  pnpm 这种依赖管理的方式也很巧妙地规避了`非法访问依赖`的问题，也就是只要一个包未在 package.json 中声明依赖，那么在项目中是无法访问的  
  但是在 yarn/npm 中因为存在依赖提升问题，buffer 依赖 base64-js，因此 node_modules 中存在 base64-js 的包，我们在项目中可以直接引用。这就是为什么 pnpm 的包管理更为安全的原因

那 buffer 目录下都有些啥呢？发现 buffer 下根本没有 node_modules，它的依赖项都放在哪里了？目录结构第一个诀窍，**buffer 是一个软链接，在 node 解析依赖的时候，它使用这些依赖的真实位置，因此在 buffer 下不用保留依赖**。

![31](https://user-images.githubusercontent.com/38368040/164909086-2a38b0d5-20d4-4f53-9cf8-d3b429b375b8.png)

那你又会问 buffer 的真实地址在哪里?🧐  
嚯，真实地址在这里: `node_modules/.pnpm/buffer@ 5.7.1/node_modules/buffer`  
所以我们现在知道了`.pnpm/`文件夹的用途。`.pnpm/`以平铺的形式储存着所有的包，所以每个包都可以在这种命名模式的文件夹中被找到：`node_modules/.pnpm/<name>@ <version>/node_modules/<name>`

使用这种平铺的结构避免 npm2 嵌套结构引起的长路径问题，和 npm3/yarn 的扁平化结构不同的是它保留了包之间的相互隔离  
点开 buffer 的真实地址，再一次发现自己又被骗了，真实地址下面还是没有 node_modules

![32](https://user-images.githubusercontent.com/38368040/164909092-2d56c967-1be6-47dc-82ca-3488aad1255d.png)

目录结构第二个诀窍来了，**包的依赖项与依赖包的实际位置位于同一目录级别**，buffer 的依赖不在`.pnpm/buffer@ 5.7.1/node_modules/buffer/node_modules`，而是在`.pnpm/buffer@ 5.7.1/node_modules/`。buffer 的所有依赖都被软链接到了`node_modules/.pnpm`的对应目录  
到了这里你可能会问，为什么要把子依赖放在统一层级 🤔

假如我们有两个包，foo 和 bar 相互依赖，使用同一层级安装的目录如下，这时 foo 和 bar 的软链接不是一个循环

```
.pnpm
  bar@1.0.0
    node_modules
      bar
      foo --> ../../foo@1.0.0/node_modules/foo
  foo@1.0.0
    node_modules
      foo
      bar --> ../../bar@1.0.0/node_modules/bar
```

假设 bar/foo 的依赖放在它的子文件中，如下，这时 foo/bar 的软链接就是一个循环

```
.pnpm
  bar@1.0.0
    node_modules
      bar
        node_modules
          foo --> ../../foo@1.0.0/node_modules/foo
  foo@1.0.0
    node_modules
      foo
        node_modules
          bar --> ../../bar@1.0.0/node_modules/bar
```

#### pnpm 下 node_modules 存在的意义

![35](https://user-images.githubusercontent.com/38368040/164909100-c8ed6ecb-5e10-4597-a09b-369c3cae3c4e.png)

buffer 中有 base64/ieee754 两个包，假设在 base64 的 dependencies 没有声明 ieee754，那我们在 base64/index 使用`requie('ieee754')`时，他就是一个幽灵依赖。会先寻找 base64 上级的 node_modules，若找到直接使用；否则直接往上级寻找 node_modules，如果上级也没有的话，当前的使用就会有问题

所以 pnpm 会将所有的依赖都提升到.pnpm/node_modules 下，保证幽灵依赖可以被找到，作为兜底方案[discussions](https://github.com/pnpm/pnpm/discussions/4224)

### 硬链接使用

在使用 pnpm 安装时，pnpm 会将依赖存储在`~/.pnpm-store/v3`目录下。在同一台电脑下，下一次安装的时候 pnpm 会先检查 store 目录，如果有找到所需的依赖，则会通过硬链接放到我们的项目中去，而不是重新安装依赖  
因为 pnpm 安装依赖时会将依赖存储在 store 目录下，**该目录能够使不同的项目之间共享依赖**。例如 dt-data-api 项目中中安装了 dt-common/dt-react-component 等依赖，当我们在 dt-easy-index 项目中也用了该两个依赖时，会重复使用 store 下的依赖。而 yarn/npm 每次都会重新安装依赖

![33](https://user-images.githubusercontent.com/38368040/164909107-149bba74-e213-4321-88c0-1c4e5bb55b5e.png)

🤔 那么问题来了，为什么在这里要使用硬链接，而不是直接创建到全局存储的符号链接  
通过上文我们知道 node 对软硬链接查询位置的处理不同。假设我们有如下的两个项目：

foo

```json
"react": "16.8.0",
"dt-react-component": "1.0.0"
```

bar

```json
"react": "17.0.0",
"dt-react-component": "1.0.0"
```

在`dt-react-component`里面，会使用`import React from 'react'`，假设`foo/node_modules/dt-react-component`和`bar/node_modules/dt-react-component`都使用软链接到`./pnpm-store/v3`，那他们都会使用同一个版本的 react，这不是我们所期望的。所以使用硬链接，在`dt-react-component`中在使用`import React from 'react'`时，会根据当前的位置去寻找依赖，这样使得 foo 和 bar 可以依赖不同的 react 的版本

### pnpm 的依赖管理图

![34](https://user-images.githubusercontent.com/38368040/164909110-2ed224d5-91ae-4f9b-b753-b9873af42199.png)

<div class="link">参考链接</div>

- [npm 依赖管理中被忽略的那些细节](https://www.zoo.team/article/npm-details)
- [剖析 npm 的包管理机制](http://www.conardli.top/blog/article/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96-%E5%89%96%E6%9E%90npm%E7%9A%84%E5%8C%85%E7%AE%A1%E7%90%86%E6%9C%BA%E5%88%B6%EF%BC%88%E5%AE%8C%E6%95%B4%E7%89%88%EF%BC%89.html)
- [npm 工作机制](https://bramble-river.gitbooks.io/npm/content/%E4%BD%BF%E7%94%A8npm.html)
- [npm -- install 安装流程](https://www.kancloud.cn/cyyspring/webpack/2306952)
- [yarn install 工作流程解析](https://juejin.cn/post/6917105300084359182)
- [实践：pnpm 解决了我的哪些痛点？](https://juejin.cn/post/7036319707590295565)
- [关于现代包管理器的深度思考——为什么现在我更推荐 pnpm 而不是 npm/yarn?](https://juejin.cn/post/6932046455733485575)
- [软链接&硬链接在前端中的应用](https://mp.weixin.qq.com/s/o0eN8gBSqVMHykFXrTnikg)

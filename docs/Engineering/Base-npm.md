---
title: npm 如何实现依赖管理
group:
  title: 包管理
  order: 4
order: 1
---

在依赖包盛行的今天，安装包的方式也是多种多样的，从 npm->yarn->pnpm，每一次的升级都带来着不一样的便利，这篇文章将从 npm2 开始。

<!-- more -->

# npm

## 嵌套结构(npm2)

在 npm2 中，npm 的处理依赖的方式很粗暴，直接采用递归的方式，严格的按照 package.json 结构以及子依赖包中的 package.json 结构将依赖安装到各自的 node_modules 中

举个 🌰 来说，npm-test 项目依赖如下三个模块：

```json
{
  "name": "npm-test",
  "dependencies": {
    "buffer": "^5.4.3",
    "ignore": "^5.1.4"
  }
}
```

`buffer`模块依赖了`base64-js`和`ieee754`模块

```json
{
  "name": "buffer",
  "dependencies": {
    "base64-js": "^1.3.1",
    "ieee754": "^1.1.13"
  }
}
```

执行 npm install 之后，我们会得到如下图的目录结构:

![1](https://user-images.githubusercontent.com/38368040/164896618-0fa94dd3-06af-4cf3-9166-cc1f2c5b95d6.png)

将其内部的依赖全部画出来会成为如下图:

![2](https://user-images.githubusercontent.com/38368040/164896639-169f6607-caa1-471e-a9d1-424efcb2b4aa.png)

这种方式的优劣式都非常的明显。**优点**就是 node_modules 的结构和 package.json 的结构是一一对应的，结构层级很明显，并且能够保证每次 install 的目录都是相同的。

试想一下，依赖的模块非常多，项目的 node_modules 会非常的庞大，嵌套会很深

![3](https://user-images.githubusercontent.com/38368040/164896649-0028fc3e-2709-43c4-92b7-a9da99980612.png)

从上图中，我们可以看出来嵌套结构的劣势

- 在不同层级的依赖中，可能引用了同一个模块，导致大量的模块冗余
- 在 windows 系统中，文件路径最大长度为 260 字符，嵌套层级过深可能导致不可预知的问题

:::info{title=" "}
💡 在 npm2 中，按照递归的方式，严格将 package.json 中的依赖安装到对应模块下。并不会处理某几个模块中的相同版本依赖，直接无脑生成对应树结构
:::

## 扁平结构(npm3)

在此之后的 npm3 做了较大的更新，将 npm2 的嵌套结构改成了扁平结构

### 子依赖模块无关联

安装模块时，不管其是直接依赖模块还是子依赖的依赖模块，都优先安装在 node_modules 根目录下

执行 npm install 之后，会得到如下的目录结构

![4](https://user-images.githubusercontent.com/38368040/164896697-894caf63-7d64-44d9-a311-d20f01fcbef3.png)

将其内部的依赖全部画出来会成为如下图:

![5](https://user-images.githubusercontent.com/38368040/164896705-f9ef865f-f632-425a-beba-1e98b3ffe457.png)

:::info{title=" "}
💡 如果 package.json 中的依赖的子依赖无相同依赖，那么所有的依赖都会被扁平化到根目录的 node_modules 下
:::

### 子依赖项依赖相同/兼容版本

修改 npm-test 的 package.json 文件，添加`websocket-util`，websocket-util 也依赖了 `base64-js^1.3.0`

```json
{
  "name": "npm-test",
  "dependencies": {
    "buffer": "^5.4.3",
    "ignore": "^5.1.4",
    "websocket-util": "1.0.0"
  }
}
```

执行 npm install，会得到如下的目录结构：

![6](https://user-images.githubusercontent.com/38368040/164896723-bda841ba-8b37-4a1d-9d68-c77ab219c3b6.png)

将其内部的依赖全部画出来会成为如下图:

![7](https://user-images.githubusercontent.com/38368040/164896728-d37ab1c2-7d00-41ec-9dc6-1e192bc0e21f.png)

:::info{title=" "}
💡 如果 package.json 中的依赖的子依赖有相同或者兼容版本依赖，那么所有的依赖都会被扁平化到根目录的 node_modules 下
:::

### 子依赖项的依赖不兼容

1.  我们在项目 npm-test 中，又依赖了`base64-js@ 1.0.1`版本，修改 package.json:

    ```json
    {
      "name": "npm-test",
      "dependencies": {
        "buffer": "^5.4.3",
        "ignore": "^5.1.4",
        "base64-js": "1.0.1"
      }
    }
    ```

    执行 npm install 之后的目录结构如下:

    ![8](https://user-images.githubusercontent.com/38368040/164896756-ee0f6db1-00c9-467e-9378-21b9ae937a7b.png)

    将其内部的依赖全部画出来会成为如下图:

    ![9](https://user-images.githubusercontent.com/38368040/164896758-4fe82b46-72db-4abc-8710-bed6056f3b6f.png)

    npm-test 直接依赖的`base64-js@ 1.0.1`放在了根目录的 node_modules 下，buffer 所依赖的与其不兼容，就放在自身的 node_modules 下

2.  修改 package.json，在其中添加`bops@ 1.0.1`，它依赖`base64-js@ 1.0.2`；`websocket-util@ 1.0.0`依赖`base64-js^1.3.0`，buffer 依赖`base64-js^1.3.1`

    ```json
    {
      "name": "npm-test",
      "dependencies": {
        "bops": "1.0.1",
        "buffer": "^5.4.3",
        "ignore": "^5.1.4",
        "websocket-util": "1.0.0"
      }
    }
    ```

    执行 npm install，会得到如下的目录结构：

    ![17](https://user-images.githubusercontent.com/38368040/164896771-4adc071a-2ed9-4712-b90d-4055615042ed.png)

    将其内部的依赖全部画出来会成为如下图:

    ![18](https://user-images.githubusercontent.com/38368040/164896773-542df037-e4c3-4c46-b6ee-435e82e91e87.png)

    会发现`base64-js@ 1.0.2`被提取到了第一级的 node_modules 上，而 buffer/websocket-util 依赖的依旧挂在它自己的 node_modules 下  
    package.json 的安装顺序是按着**字母顺序**来的，首先 bops 的底层依赖都会被优先提出来，所以 node_modules 下会先有`base64-js@ 1.0.2`，到了处理 buffer/websocket-util 的底层依赖时，发现已经存在 base64-js 且不兼容就会放到它自身的 node_modules 下

3.  我们在往 package.json 中加入`ag-psd@ 14.3.6`它依赖`base64-js^1.5.1`的版本

    ```json
    {
      "name": "npm-test",
      "dependencies": {
        "ag-psd": "14.3.6",
        "bops": "1.0.1",
        "buffer": "^5.4.3",
        "ignore": "^5.1.4"
      }
    }
    ```

    执行 npm install 之后，得到目录结构如下：

    ![10](https://user-images.githubusercontent.com/38368040/164896835-6156765a-dd32-49e9-a456-df06a55aca60.png)

    将其内部的依赖全部画出来会成为如下图：

    ![11](https://user-images.githubusercontent.com/38368040/164896837-a7fc66b7-018a-4c92-b07c-9ad48f6127bf.png)

    能够发现，这次是`base64-js@ 1.5.1`被提取到了根目录下的 node_modules 下，buffer 的 base64-js 能够和它兼容，所以 buffer 的 node_modules 下不再存在依赖，然而 bops 依赖的 base64-js 不兼容，所以会挂在自身的 node_modules 下

:::info{title=" "}
💡 子依赖项的依赖不兼容的情况下，底层会通过 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare">localeCompare</a> 的方法对依赖进行一个排序，字典序靠前的 npm 包的**底层依赖**会优先被提取出来，放到根目录下的 node_modules 中，之后如果发现不兼容的依赖，则继续采用 npm 2 的处理方式，都会放在自身的 node_modules 下
:::

❓ 通过上面这几个例子，能够发现 npm3 在解决了一些问题的同时，也带来新的问题。

npm3 仿佛解决了 npm2 的冗余问题，但是也没有完全解决。例如上面的例子，`base64-js@ 1.0.2`先被提出来，如果后面的包依赖的 base64-js 和 1.0.2 版本不兼容，就会导致每个子依赖的 node_modules 都会存在 base64-js 包，又出现了 npm2 的冗余问题

## package-lock.json

在之前我们讲了 package.json 文件，在 npm5 中，推出了 package-lock 文件，它就是每个依赖项的列表，当前安装的版本，模块位置，验证模块完整性的哈希，以及对应的包列表/依赖项列表。其实也是和 node_modules 一一对应的，项目目录下存在  package-lock 可以让每次安装生成的依赖目录结构保持相同

```json
{
  "name": "npm-test",
  "dependencies": {
    "buffer": "^5.4.3",
    "ignore": "^5.1.4"
  }
}
```

上述 package.json 执行 npm install 之后得到的 lock 文件如下：

```json
{
  "name": "npm-test",
  "dependencies": {
    "base64-js": {
      "version": "1.5.1",
      "resolved": "https://registry.npmjs.org/base64-js/-/base64-js-1.5.1.tgz",
      "integrity": "sha512-AKpaYlHn8t4SVbOHCy+b5+KKgvR4vrsD8vbvrbiQJps7fKDTkjkDry6ji0rUJjC0kzbNePLwzxq8iypo41qeWA=="
    },
    "buffer": {
      "version": "5.7.1",
      "resolved": "https://registry.npmjs.org/buffer/-/buffer-5.7.1.tgz",
      "integrity": "sha512-EHcyIPBQ4BSGlvjB16k5KgAJ27CIsHY/2JBmCRReo48y9rQ3MaUzWX3KVlBa4U7MyX02HdVj0K7C3WaB3ju7FQ==",
      "requires": {
        "base64-js": "^1.3.1",
        "ieee754": "^1.1.13"
      }
    },
    "ieee754": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/ieee754/-/ieee754-1.2.1.tgz",
      "integrity": "sha512-dcyqhDvX1C46lXZcVqCpK+FtMRQVdIMN6/Df5js2zouUsqG7I6sFxitIC+7KYK29KdXOLHdu9zL4sFnoVQnqaA=="
    },
    "ignore": {
      "version": "5.2.0",
      "resolved": "https://registry.npmjs.org/ignore/-/ignore-5.2.0.tgz",
      "integrity": "sha512-CmxgYGiEPCLhfLnpPp1MoRmifwEIOgjcHXxOBjv7mY96c+eWScsOP9c112ZyLdWHi0FxHjI+4uVhKYp/gcdRmQ=="
    }
  }
}
```

**resolved**: 依赖包的位置 URI

**integrity**: 验证模块完整性的哈希

当我们的项目中已经存在 package-lock.json 之后，将以该文件为主进行解析安装指定版本依赖包，而不是使用  package.json 来解析和安装模块。因为 package-lock 为每个模块都指定了版本/位置/完整性哈希，所以每次创建的安装都是一样的。和使用的设备无关，每次都能给到相同的结果。

该图为第一次 install 和有了 package-lock 文件之后 install 时间的对比。在依赖少的情况下并不明显，依赖越多时间差会更加明显

![13.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/35392cb5037742b88002e2fc3b0fa432~tplv-k3u1fbpfcp-watermark.image?)

在 npm5.0.x 的版本中，不管  package.json 中依赖是否有更新，都会以 package-lock 文件为第一安装依赖

在 npm5.1.0 之后的版本中，如果 package.json 中的依赖项有更新，install 时会无视 package-lock 直接去下载新版本依赖，然后在更新 package-lock 文件

其实上面的两种方案都存在对应的问题，因此在 5.4.2 的版本之后，更改了规则

- 根据 package.json 文件，运行 install 会生成对应的 package-lock 文件，package-lock 文件指明了直接依赖版本和间接依赖版本
- 如果 package 和 lock 文件中依赖版本兼容，即使 package 中有新版本，执行 install 的时候也会根据 lock 文件下载
- 如果两个文件中的版本不兼容，那么执行 install 的时候会把 lock 文件更新到兼容 package.json 的版本

## 缓存

在我们执行 install/update 时，除了将依赖包安装在 node_modules 目录之外，还会在本地缓存目录缓存一份

执行`npm config get cache`命令可以查询到缓存目录，Mac 默认是在用户主目下`.npm/_cacache`

![12](https://user-images.githubusercontent.com/38368040/164896852-b0736252-e43f-4431-87ee-e45f750dfcdb.png)

content-v2 目录用于存储 tar 包的缓存，而 index-v5 目录用于存储 tar 的 hash 值

npm 执行安装的时候会根据 lock 文件中存储的`integrity、version、name`生成一个唯一的`key`对应到`index-v5`目录下的缓存记录，从而找到 tar 包的 hash，在根据 hash 去找缓存的 tar 包来使用

```shell
grep "https://registry.npmjs.org/base64-js/-/base64-js-1.0.2.tgz" -r index-v5
```

在 index-v5 中查找 base64-js-1.0.2 的缓存记录，会得到一个 json 串，其中`_shasum`属性就是 tar 包的 hash，其中前四位就是缓存的目录，在 content-v2 中进入该目录就能找到对应的压缩依赖包，执行`tar -xvf file`就能解压文件

## 文件完整性

上文提到过几次文件完整性，那具体什么是文件完整性？

在下载依赖包之前，能够拿到 npm 对该依赖包计算的 hash 值。执行 npm info 命令，`shasum`就是 hash

![15](https://user-images.githubusercontent.com/38368040/164896928-a9bf84d9-6d9c-467f-8df1-da2f54f8b02d.png)

用户下载依赖包到本地之后，要确定在下载的过程中没有出现错误，所以在下载完成之后在本地计算一次文件的 hash 值。如果两个 hash 值相同才能够确保下载的依赖是完整的；如果不同则需要重新下载

## npmrc 文件

.npmrc 文件可以理解成为 npm running configuration，即 npm 运行时配置文件。

npm 的作用就是帮助开发者安装需要的依赖包，但是要从哪里下载？这是可以在.npmrc 中进行配的。

在我们安装包的时候，npm 按照如下顺序读取这些配置文件：

- 项目配置文件：你可以在项目的根目录下创建一个.npmrc 文件，只用于管理这个项目的 npm 安装。
- 用户配置文件：在你使用一个账号登陆的电脑的时候，可以为当前用户创建一个.npmrc 文件，之后用该用户登录电脑，就可以使用该配置文件。可以通过 **npm config get userconfig** 来获取该文件的位置。
- 全局配置文件： 一台电脑可能有多个用户，在这些用户之上，你可以设置一个公共的.npmrc 文件，供所有用户使用。该文件的路径为： **\$PREFIX/etc/npmrc**，使用 **npm config get prefix** 获取$PREFIX。如果你不曾配置过全局文件，该文件不存在。
- npm 内嵌配置文件：最后还有 npm 内置配置文件，基本上用不到，不用过度关注。

## 整体流程

![16](https://user-images.githubusercontent.com/38368040/164896967-8191221c-230d-4990-93a1-9fe8b7cabc73.png)

- 检查 .npmrc 文件，优先级为：项目级 > 用户级 > 全局级 > npm 内置
- 检查有无 lock 文件
- 无 lock 文件
  - 从 npm 远程仓库获取包的信息
  - 根据 package.json 构建依赖树，构建过程如下
    - 首先确定首层依赖模块`dependencies/devDependencies/optionalDependencies`，工程本身是整棵依赖树的根节点，每个首层模块都是根节点下的一个子树，此时会开启多进程从每个首层依赖模块开始逐步寻找更深层级的节点
    - 这一步只是确定逻辑上的依赖树，**并非真正的安装**，之后根据这个依赖结构去下载或拿到缓存中的依赖包
  - 模块扁平化
    在上一个步骤的到的是一个完整的依赖树，包含了大量的重复模块，在 npm3 后就开启了扁平化操作，会遍历所有的节点(有**广度遍历**的感觉)将模块逐个放到根节点下，有重复模块时就丢弃；不兼容时则放到当前节点，不做改变。
  - 在缓存中依次查找依赖树中的依赖
    - 不存在缓存
      - 从 npm 远程仓库下载包
      - 校验包的完整性
      - 校验不通过重新下载
      - 校验通过，将下载的包复制到 npm 缓存目录；将下载的包按照依赖结构解压到  node_modules
    - 存在缓存
      - 将缓存按照依赖结构解压到  node_modules
  - 生成 lock 文件
- 有 lock 文件
  - 检查 package.json 中的依赖版本和 lock 文件是否兼容
  - 如果兼容，直接跳过获取包信息、构建依赖树过程，开始在缓存中查找包信息，后续过程相同
  - 如果不兼容，从远程获取包信息，后续过程相同

# Yarn

yarn 的发布时间是在 2016 年，那时候的 npm 还处于 v3 阶段，还没有 package-lock.json 文件，存在的问题上文也提到过。yarn 就在此时诞生了  
yarn 也是采用的 npm-v3 扁平化结构来管理包依赖，安装完成之后会生成一个 yarn.lock 文件  
执行与上述一样的 package.json，得到如下的 yarn.lock 文件

```json
# THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
# yarn lockfile v1

base64-js@^1.3.1:
  version "1.5.1"
  resolved "https://registry.yarnpkg.com/base64-js/-/base64-js-1.5.1.tgz#1b1b440160a5bf7ad40b650f095963481903930a"
  integrity sha512-AKpaYlHn8t4SVbOHCy+b5+KKgvR4vrsD8vbvrbiQJps7fKDTkjkDry6ji0rUJjC0kzbNePLwzxq8iypo41qeWA==

buffer@^5.4.3:
  version "5.7.1"
  resolved "https://registry.yarnpkg.com/buffer/-/buffer-5.7.1.tgz#ba62e7c13133053582197160851a8f648e99eed0"
  integrity sha512-EHcyIPBQ4BSGlvjB16k5KgAJ27CIsHY/2JBmCRReo48y9rQ3MaUzWX3KVlBa4U7MyX02HdVj0K7C3WaB3ju7FQ==
  dependencies:
    base64-js "^1.3.1"
    ieee754 "^1.1.13"

ieee754@^1.1.13:
  version "1.2.1"
  resolved "https://registry.yarnpkg.com/ieee754/-/ieee754-1.2.1.tgz#8eb7a10a63fff25d15a57b001586d177d1b0d352"
  integrity sha512-dcyqhDvX1C46lXZcVqCpK+FtMRQVdIMN6/Df5js2zouUsqG7I6sFxitIC+7KYK29KdXOLHdu9zL4sFnoVQnqaA==

ignore@^5.1.4:
  version "5.2.0"
  resolved "https://registry.yarnpkg.com/ignore/-/ignore-5.2.0.tgz#6d3bac8fa7fe0d45d9f9be7bac2fc279577e345a"
  integrity sha512-CmxgYGiEPCLhfLnpPp1MoRmifwEIOgjcHXxOBjv7mY96c+eWScsOP9c112ZyLdWHi0FxHjI+4uVhKYp/gcdRmQ==
```

和 npm 产生的 lock 文件还是比较相似的，也有一些区别

- package-lock.json 是 json 格式，yarn.lock 使用一种自定义格式
- 所有依赖，不管是项目声明的依赖，还是依赖的依赖，都是扁平化管理
- 依赖的版本是由所有依赖的版本声明范围确定的，具备相同版本声明范围的依赖归结为一类，确定一个该范围下的依赖版本。如果同一个依赖多个版本共存，那么会并列归类
- **相比 npm，Yarn 一个显著区别是 yarn.lock 中子依赖的版本号不是固定版本。**  也就是说单独一个 yarn.lock 确定不了 node_modules 目录结构，还需要和 package.json 文件进行配合  
  yarn.lock 是扁平化的，即使有相同的包也会带有版本号并列在一级；而 package-lock 是和 node_modules 一一对应的嵌套结构  
  所以 yarn.lock 即使有确定的版本号也没法得到对应 node_modules 的目录结构所以需要结合 package.json

![19](https://user-images.githubusercontent.com/38368040/164896979-852ed5c3-d031-46c6-84b8-0056186c9e9a.png)

yarn install 的过程，可以在终端看到由 emoji 图标装饰的四个步骤

1.  Resolving packages(解析包): 整合依赖信息
1.  Fetching packages(获取包): 获取依赖包到缓存中
1.  Linking dependencies(连接依赖): 复制依赖到 node_modules
1.  Building fresh packages(构建安装): 执行 install 阶段的 scripts

<div class="link">参考链接</div>

- [npm 依赖管理中被忽略的那些细节](https://www.zoo.team/article/npm-details)
- [剖析 npm 的包管理机制](http://www.conardli.top/blog/article/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96-%E5%89%96%E6%9E%90npm%E7%9A%84%E5%8C%85%E7%AE%A1%E7%90%86%E6%9C%BA%E5%88%B6%EF%BC%88%E5%AE%8C%E6%95%B4%E7%89%88%EF%BC%89.html)
- [npm 工作机制](https://bramble-river.gitbooks.io/npm/content/%E4%BD%BF%E7%94%A8npm.html)
- [npm -- install 安装流程](https://www.kancloud.cn/cyyspring/webpack/2306952)
- [yarn install 工作流程解析](https://juejin.cn/post/6917105300084359182)

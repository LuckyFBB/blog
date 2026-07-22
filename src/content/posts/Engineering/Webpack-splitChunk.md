---
title: Webpack SplitChunk 分包
group:
  title: webpack
  order: 3
order: 5
---

## 理解 chunk

`Webpack`可以看成一个模块打包机器，我们编写的文件对于`Webpack`来说都是模块(`module`)，我们可以在`Webpack`中配置对应模块的处理方式。

`chunk`是`Webpack`在打包过程中处理一些`module`的合集。配置`entry`入口文件，入口文件再依赖其他的`module`，`webpack`会根据这些引用关系逐个打包模块，将`module`打包在一起，也就形成了 `chunk`。

![Untitled](/blog/imgs/webpackSplitChunk/Untitled.png)

`chunk`是构建流程中的中间产物，会根据一些默认配置决定那些模块合并打包；也可以通过 `splitChunks`自定义打包策略。

### 默认三种分包处理

- Initial Chunk
  `entry` 模块及相应子模块打包成 Initial Chunk
- Async Chunk
  通过`import('./xx')`等语句导入的异步模块及相应子模块组成的 Async Chunk
- Runtime Chunk
  运行时代码抽离成 Runtime Chunk，可通过 [entry.runtime](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Fconfiguration%2Fentry-context%2F%23dependencies) 配置项实现

## **默认情况**

默认情况下，它只会影响到按需加载的`chunks`，因为修改 initial chunks 会影响到项目的 HTML 文件中的脚本标签。

Webpack 将根据以下条件自动拆分`chunks`：

- 新的`chunk`可以被共享，或者模块来自于  `node_modules`  文件夹
- 新的`chunk`体积大于 20kb（在进行 min+gz 之前的体积）
- 当加载`Async Chunk`时，并行请求的最大数量不得超过 30
- 当加载`Initial Chunk`时，并发请求的最大数量不得超过 30

当尝试满足最后两个条件时，最好使用较大的`chunks`。

Webpack spiltChunks 默认的`config`如下：

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'async',
      // 表示新分离出的chunk必须大于等于minSize，默认为20000，约20kb。
      minSize: 20000,
      // 用于确保在分割 chunk 之后，剩余部分的大小不小于某个阈值
      minRemainingSize: 0,
      // 表示一个模块至少应被minChunks个chunk所包含才能分割。默认为1。
      minChunks: 1,
      // 表示按需加载文件时，并行请求的最大数目。默认为5。
      maxAsyncRequests: 30,
      // 表示加载入口文件时，并行请求的最大数目。默认为3。
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\/]node_modules[\/]/,
          // 缓存组优先级，当一个模块可能属于多个 chunkGroup，这里是优先级
          priority: -10,
          // 如果该chunk包含的modules都已经另一个被分割的chunk中存在，那么直接引用已存在的chunk，不会再重新产生一个
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
```

### 模块均为同步导入

```js
import { Home } from './component/home';
import { sum } from 'lodash';

const App = () => {
  return (
    <div>
      <Home />
    </div>
  );
};

export default App;
```

![Untitled](/blog/imgs/webpackSplitChunk/Untitled%201.png)

打包出来只有一个`main`文件，也就是我们的入口文件

### lodash 动态导入

```js
import Home from './component/home';
import(/* webpackChunkName: "async_lodash" */ 'lodash');

const App = () => {
  return (
    <div>
      <Home />
    </div>
  );
};

export default App;
```

![Untitled](/blog/imgs/webpackSplitChunk/Untitled%202.png)

`lodash`被单独打包出来了，因为异步加载的模块会被单独打包

### React 组件按需加载

```js
// Home.jsx
import { merge } from 'lodash';

const Home = <div>home,{merge({ a: 1 }, { b: 1 })}</div>;

// App.jsx
const Home = React.lazy(() => import('./component/home'));

const App = () => {
  return (
    <div>
      <Home />
    </div>
  );
};

export default App;
```

![Untitled](/blog/imgs/webpackSplitChunk/Untitled%203.png)

被打包成了三个文件，由于`Home`组件时按需加载的因此单独打包。因为在`Home`中引入了 `lodash`，因此`lodash`是异步加载的，也会被单独打包。

### lodash 按需加载

```js
import sum from 'lodash/sum';

const Home = <div>home,{sum(1, 2)}</div>;

export default Home;
```

![Untitled](/blog/imgs/webpackSplitChunk/Untitled%204.png)

因为`lodash/sum`的文件大小小于 20kb，不会被单独打包，会和`Home`组件打包在一个文件中，因此只有两个文件

### 共享模块的打包

```js
// Home
export default function () {
    return (
        <div>
            <Button2>1111</Button2>
        </div>
    );
}

// Home2
export default function () {
    return (
        <div>
            <Button2>2222</Button2>
        </div>
    );
}

// Button
export default function (props) {
    return (
        <>
						 {/* 放一张超过 20kb 的图片，使 button 的大小超过 20kb */}
            <button>{props.children}</button>
        </>
    );
}
```

分析一下依赖视图如下：

![image.png](/blog/imgs/webpackSplitChunk/image.png)

打包出来结果如下：

![Untitled](/blog/imgs/webpackSplitChunk/Untitled%205.png)

看到一共有四个文件，分别是`mian`、`Home`、`Home2`、`button`，由于`button`满足上诉的默认分包情况，因此会被单独拎出来。

### 入口模块**和异步模块的公共库**

```js
// App
import { sum } from 'lodash';
const Home = React.lazy(() => import('./component/home'));

const App = () => {
  return (
    <div>
      {sum(1, 2)}
      <Home />
    </div>
  );
};

// Home
import { sum } from 'lodash';

export default function () {
  return <div>{sum(1, 2)}</div>;
}
```

![Untitled](/blog/imgs/webpackSplitChunk/Untitled%206.png)

这种情况下，lodash 会打包在入口文件中，Home 组件中不在打包 lodash 会和入口文件用一份

## 配置项

目前`SplitChunksPlugin`已经在`Webpack`内部支持了，我们引入的时候不需要在添加一来了，可以直接修改 [optimization.splitChunks](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Fconfiguration%2Foptimization%2F%23optimizationsplitchunks) 或者通过`plugins`的方式修改`optimize.SplitChunksPlugin({})`

### 分包范围

SplitChunks 在默认的情况下只会对 Async Chunk 生效，提供了`chunks`字段来调整范围

- 字符串`'all'` ：对 Initial Chunk 与 Async Chunk 都生效，建议优先使用该值；
- 字符串`'initial'` ：只对 Initial Chunk 生效；
- 字符串`'async'` ：只对 Async Chunk 生效；
- 函数`(chunk) => boolean` ：该函数返回`true`时生效；

### 使用频率

可以根据`module`被`chunk`引用的次数来决定是否分包。通过`minChuks`来配置最小引用次数，可以将频繁使用的模块打包成独立文件，减少重复代码。

⚠️ 注意：这里的引用次数不代表为`import`的次数，而是取决于上有引用者是否被作为了`Initial Chunk`或者`Async Chunk`。

`minChunks`默认值为 1

```js
// common.js
export default 'common chunk';

// async-module.js
import common from './common';

// entry-a.js
import common from './common';
import('./async-module');

// entry-b.js
import common from './common';
```

`entry-a/entry-b`是`Initial Chunk`处理；`async-module`作为`Async Chunk`处理，那么 `common`被 3 个不同的`chunk`依赖；被引用次数为 3 次

```js
module.exports = {
  entry: {
    entry1: './src/entry-a.js',
    entry2: './src/entry-b.js',
  },
  // ...
  optimization: {
    splitChunks: {
      minChunks: 2,
      //...
    },
  },
};
```

根据上述配置，最终可能被分成四个包，entry-a/entry-b/async-module/common

### 限制分包数量

如果我们分包的数量很多，会导致`http`网络请求比较多，反而降低性能。提供了`maxAsyncRequests`/`maxInitialRequests`

- maxAsyncRequests
  按需加载时候最大的并行请求数，默认为 30
- maxInitialRequests
  入口文件的最大并行请求数，默认为 30

<aside>
💡 何为请求数？

是指加载一个 chunk 的时候需要加载的所有分包数量。

例如对于一个 chunk A 来说，通过分包规则(如模块引用次数、第三方包)分离出来了若干的子 chunk[i]，那么加载 chunk A 的时候就回去加载 chunk[i]，那么等于浏览器需要同时加载 chunk A 和所有的分离 chunk[i]，此时的并行请求数量为主包 A 加上 i 个分包，即 i+1

</aside>

![image.png](/blog/imgs/webpackSplitChunk/image%201.png)

```js
module.exports = {
  mode: 'development',
  devtool: false,
  entry: {
    entry1: './src/entry-a.js',
    entry2: './src/entry-b.js',
    entry3: './src/entry-c.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    splitChunks: {
      minChunks: 2,
      chunks: 'all',
      minSize: 1,
    },
  },
};
```

针对于上述的配置，最后打包结果如下：

![Untitled](/blog/imgs/webpackSplitChunk/Untitled%207.png)

三个入口文件和对应两个`common`文件都满足打包条件

那在此时对于`entry-b`来说，请求`entry-b`的同时需要请求`common-1/common-2`，并行数量为 3，我们将`maxInitialRequests`设置为 2，打包结果如下

![Untitled](/blog/imgs/webpackSplitChunk/Untitled%208.png)

会发现`common-1`这个文件，打包进入了`entry-a/entry-b`文件中

### 限制分包体积

提供了一系列大小判断的条件来处理`chunk`，可以在`chunk`过小时取消打包；在`chunk`过大时，再次尝试拆解。

- minSize: 超过这个尺寸的`chunk`才会正式被分包；
- maxSize: 超过这个尺寸的`chunk`会尝试进一步拆分出更小的`chunk`；
- maxAsyncSize: 与`maxSize`功能类似，但只对异步引入的模块生效；
- maxInitialSize: 与`maxSize`类似，但只对`entry`配置的入口模块生效；

根据这几个规则，`SplitChunksPlugin`的流程如下：

- 将命中`minChunks`规则的`module`统一抽到一个额外的`chunk`对象；
- 判断该`chunk`是否满足`maxInitialRequests`阈值，若满足则进行下一步；
- 判断该`chunk`资源的体积是否大于上述配置项`minSize`声明的下限阈值；
  - 如果体积小于`minSize`则取消这次分包，对应的`module`依然会被合并入原来的`chunk`
  - 如果`chunk`体积大于`minSize`则判断是否超过`maxSize`、`maxAsyncSize`、`maxInitialSize`声明的上限阈值，如果超过则尝试将该`chunk`继续分割成更小的部分

![image.png](/blog/imgs/webpackSplitChunk/image%202.png)

对于上面这种依赖关系来说，假设配置`minChunks`大于 2，`minInitialRequests`大于 2，如果`common`包的体积大于`miniSize`分包成功，`common`作为独立的`chunk`，否则会分别合并进入 3 个`chunk`中

### 缓存组 cacheGroups

上面讲到的都是对哪些`module`做分包处理，可以使用`cacheGroups`为不同的文件组设置不同的规则。

如果匹配上`cacheGroups`的分组会优先使用改组下的`minChunks/minSize`等条件配置。

当`cacheGroups`也有独有的配置项：

- test: 接受正则表达式、函数、字符串，所有符合 test 判断的都会被分到改组
- name: 当前分组的名字
- priority: 数字型，用于设置改分组的优先级，若命中多个缓存组，优先被分到 priority 更大的组

```js
module.exports = {
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
        },
      },
    },
  },
};
```

上述配置的话，能够把所有的第三方库都帮我们打包到命名为 vendor 的分组中

![Untitled](/blog/imgs/webpackSplitChunk/Untitled%209.png)

对于默认配置中的`cacheGroups`来说，能帮助我们：

- 将所有`node_modules`中的资源单独打包到`vendors-xxx-xx.js`命名的产物
- 对引用次数大于等于 2 的模块，也就是被多个`chunk`引用的模块，单独打包

```js
cacheGroups: {
  defaultVendors: {
    test: /[\/]node_modules[\/]/,
    priority: -10,
    reuseExistingChunk: true,
  },
  default: {
    minChunks: 2,
    priority: -20,
    reuseExistingChunk: true,
  },
},
```

## 总结

该篇文章主要讲解了`splitChunk`的对应的分包策略，相关配置项的具体使用。

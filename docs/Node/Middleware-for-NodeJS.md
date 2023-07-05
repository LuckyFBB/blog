---
title: NodeJS 的中间件
group:
  title: 应用
  order: 3
order: 0
---

在很早之前我们讲过 [Redux 的中间件](/react/redux#redux-middleware)的概念以及实现，其实中间件都是大同小异的，那我们接下来讲讲 Node 中的中间件。

## 是什么

中间件(Middleware)是介于各个应用系统和系统软件之间的一类软件，它是使用系统软件所提供的基础功能，衔接应用的各个部分或者是不同的应用。

在 NodeJS 中，所谓的中间件是对封装 http 请求细节的方法。

- 请求体的解析
- Cookie 信息的处理
- 日志记录等

我们在开发 Web 应用的时候，不希望了解每一个中间的细节处理，而是集中在业务的开发中，所以引入 Node 中间件来简化和封装这些基础逻辑处理细节。

Node 中间件的本质是，进入具体的业务处理之前，先让特定过滤器处理，流程如下图：

![Untitled](/blog/imgs/middlewareForNodeJS/Untitled.png)

目前主流的 NodeJS 框架都是离不开中间件这个概念。

在 Koa 中，中间件的本质是作为一个回调函数，参数包含了请求对象、响应对象和执行下一个中间件的函数。

## 怎么做

### 中间件实现的原理

通过上述图片我们发现，当我们接受到一个请求的时候，会先执行中间件 1 → 中间件 2 → 主逻辑 → 中间件 2 → 中间件 1。每个中间件都有两次处理时机。

**简易的中间件实现**

```cpp
const middleware1 = (next) => {
    console.log("middleware1 start");
    next();
    console.log("middleware1 end");
};
const middleware2 = (next) => {
    console.log("middleware2 start");
    next();
    console.log("middleware2 end");
};
const middleware3 = (next) => {
    console.log("middleware3 start");
    next();
    console.log("middleware3 end");
};

const middlewares = [middleware1, middleware2, middleware3];

const runMiddlewares = () => {
    const next = () => {
        const middleware = middlewares.shift();
        middleware?.(next);
    };
    next();
};

runMiddlewares();
```

其实 next 方法就是不断去调用下一个中间件，是实现自动调用中间件的关键函数。

在我们的实际使用过程中可能更多的使用是异步的中间件，因此需要做出相关的改变。

```cpp
const middleware1 = async (next) => {
    console.log("middleware1 start");
    await next();
    console.log("middleware1 end");
};
const middleware2 = async (next) => {
    console.log("middleware2 start");
    await next();
    console.log("middleware2 end");
};
const middleware3 = async (next) => {
    console.log("middleware3 start");
    await next();
    console.log("middleware3 end");
};

const middlewares = [middleware1, middleware2, middleware3];

const runMiddlewares = () => {
    const next = () => {
        const middleware = middlewares.shift();
        if (middleware) {
            Promise.resolve(middleware?.(next));
        } else {
            Promise.reject("end");
        }
    };
    next();
};

runMiddlewares();
```

![Untitled](/blog/imgs/middlewareForNodeJS/Untitled%201.png)

### koa 中间件实现方式

先看一下上述代码如果使用 Koa 来实现，应该如何写？

```cpp
const middleware1 = async (ctx, next) => {
    console.log("middleware1 start");
    await next();
    console.log("middleware1 end");
};
const middleware2 = async (ctx, next) => {
    console.log("middleware2 start");
    await next();
    console.log("middleware2 end");
};
const middleware3 = async (ctx, next) => {
    console.log("middleware3 start");
    await next();
    console.log("middleware3 end");
};

const app = new Koa();
app.use(middleware1);
app.use(middleware2);
app.use(middleware3);
```

**use**

[use](https://github.com/koajs/koa/blob/master/lib/application.js#L140) 函数做的事情很简单，只是把对应的参数放到放到 middleware 数组里面

```cpp
use (fn) {
	if (typeof fn !== 'function') throw new TypeError('middleware must be a function!')
	this.middleware.push(fn)
	return this
}
```

**listen 和 callBack**

当我们使用 app.[listen](https://github.com/koajs/koa/blob/master/lib/application.js#L97) 方法的时候，其实采用的是 http 模块 createServer 创建一个 server 服务，其中会使用回调函数 [callback](https://github.com/koajs/koa/blob/master/lib/application.js#L155C4)，其中就有对中间件的相关处理

```cpp
listen (...args) {
  const server = http.createServer(this.callback())
  return server.listen(...args)
}

callback () {
  const fn = this.compose(this.middleware)

  if (!this.listenerCount('error')) this.on('error', this.onerror)

  const handleRequest = (req, res) => {
    const ctx = this.createContext(req, res)
    if (!this.ctxStorage) {
      return this.handleRequest(ctx, fn)
    }
    return this.ctxStorage.run(ctx, async () => {
      return await this.handleRequest(ctx, fn)
    })
  }

  return handleRequest
}
```

我们在 callback 中发现了 compose 函数的身影，它就是实现洋葱模型的关键了！

**koa-compose**

compose 函数的来源为 koa-compose

```cpp
function compose (middleware) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }
  return function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
```

`Promise.resolve(fn(context, dispatch.bind(null, i + 1)))`这行代码其实就能够解释，为什么我们在使用的时候调用 next 参数就能够执行下一个中间件了。

当开始执行`dispatch(0)`的时候，fn 其实就是上述代码中的 middleware1，执行 middleware1 时，调用的`next()`方法其实是为`dispatch.bind(null, i + 1)`，也就是 middleware2，以此类推执行完所有的中间件。

当全部中间件执行完毕之后，通过`if (!fn) return Promise.resolve()`，开始往回执行每个中间件中`next()`后面的代码。

![Untitled](/blog/imgs/middlewareForNodeJS/Untitled%202.png)

---
title: 关于 Redux 的更多
group:
  title: 数据流
  order: 1
order: 2
---

<style>
    .link {
        margin-top: 16px;
        padding: 4px 12px 4px 10px;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        border-left: 5px solid #F8CBA6;
        background-color: #FFFBEB;
    }
    .quote {
        background-color: #FFE7CC;
        padding: 10px;
        border-radius: 8px;
        font-weight: 500;
    }
</style>

## React-Redux

react-redux 是 Redux 提供的 react 绑定，辅助在 react 项目中使用 redux

它的 API 简单，包括一个组件`Provider`和一个高阶函数`connect`

### Provider

❓ 为什么`Provider`只传递一个`store`，被它包裹的组件都能够访问到`store`的数据呢？

Provider 做了些啥？

- 创建一个`contextValue`包含`redux`传入的`store`
- 通过`context`上下文把`contextValue`传递子组件

### Connect

❓connect 做了什么事情讷？

使用容器组件通过`context`提供的`store`，并将`mapStateToProps`和`mapDispatchToProps`返回的`state`和`dispatch`传递给 UI 组件

组件依赖 redux 的`state`，映射到容器组件的`props`中，`state`改变时触发容器组件的`props`的改变，触发容器组件组件更新视图

```js
const enhancer = connect(mapStateToProps, mapDispatchToProps);
enhancer(Component);
```

#### react-redux 丐版实现

[mini-react-redux](https://codesandbox.io/s/mini-react-redux-x8j5t0?file=/src/App.js:141-149)

**Provider**

```js
export const Provider = (props) => {
  const { store, children, context } = props;
  const contextValue = { store };
  const Context = context || ReactReduxContext;
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
```

**connect**

```ts
import { useContext, useReducer } from 'react';
import { ReactReduxContext } from './ReactReduxContext';

export const connect =
  (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => (props) => {
    const { ...wrapperProps } = props;
    const context = useContext(ReactReduxContext);
    const { store } = context; // 解构出 store
    const state = store.getState(); // 拿到 state
    //使用 useReducer 得到一个强制更新函数
    const [, forceComponentUpdateDispatch] = useReducer(
      (count) => count + 1,
      0,
    );
    // 订阅 state 的变化，当 state 变化的时候执行回调
    store.subscribe(() => {
      forceComponentUpdateDispatch();
    });
    // 执行 mapStateToProps 和 mapDispatchToProps
    const stateProps = mapStateToProps?.(state);
    const dispatchProps = mapDispatchToProps?.(store.dispatch);
    // 组装最终的 props
    const actualChildProps = Object.assign(
      {},
      stateProps,
      dispatchProps,
      wrapperProps,
    );
    return <WrappedComponent {...actualChildProps} />;
  };
```

## Redux Middleware

<div class="quote">“It provides a third-party extension point between dispatching an action, and the moment it reaches the reducer.” – Dan Abramov</div>

`middleware`提供分类处理`action`的机会，在`middleware`中可以检查每一个`action`，挑选出特定类型的`action`做对应操作

<img width="770" alt="image" src="https://user-images.githubusercontent.com/38368040/189882071-28d47ffd-0fdd-4dd8-bcbc-e5bf41e57129.png">

[middleware 示例](https://codesandbox.io/s/middleware-wn4pn?file=/src/App.js)

打印日志

```js
store.dispatch = (action) => {
  console.log('this state', store.getState());
  console.log(action);
  next(action);
  console.log('next state', store.getState());
};
```

监控错误

```js
store.dispatch = (action) => {
  try {
    next(action);
  } catch (err) {
    console.log('catch---', err);
  }
};
```

二者合二为一

```js
store.dispatch = (action) => {
  try {
    console.log('this state', store.getState());
    console.log(action);
    next(action);
    console.log('next state', store.getState());
  } catch (err) {
    console.log('catch---', err);
  }
};
```

提取 loggerMiddleware/catchMiddleware

```js
const loggerMiddleware = (action) => {
  console.log('this state', store.getState());
  console.log('action', action);
  next(action);
  console.log('next state', store.getState());
};
const catchMiddleware = (action) => {
  try {
    loggerMiddleware(action);
  } catch (err) {
    console.error('错误报告: ', err);
  }
};
store.dispatch = catchMiddleware;
```

catchMiddleware 中都写死了调用的 loggerMiddleware，loggerMiddleware 中写死了 next(store.dispatch)，需要灵活运用，让 middleware 接受 dispatch 参数

```js
const loggerMiddleware = (next) => (action) => {
  console.log('this state', store.getState());
  console.log('action', action);
  next(action);
  console.log('next state', store.getState());
};
const catchMiddleware = (next) => (action) => {
  try {
    /*loggerMiddleware(action);*/
    next(action);
  } catch (err) {
    console.error('错误报告: ', err);
  }
};
/*loggerMiddleware 变成参数传进去*/
store.dispatch = catchMiddleware(loggerMiddleware(next));
```

middleware 中接受一个 store，就能够把上面的方法提取到单独的函数文件中

```js
export const catchMiddleware = (store) => (next) => (action) => {
  try {
    next(action);
  } catch (err) {
    console.error('错误报告: ', err);
  }
};

export const loggerMiddleware = (store) => (next) => (action) => {
  console.log('this state', store.getState());
  console.log('action', action);
  next(action);
  console.log('next state', store.getState());
};

const logger = loggerMiddleware(store);
const exception = catchMiddleware(store);
store.dispatch = exception(logger(next));
```

每个 middleware 都需要接受 store 参数，继续优化这个调用函数

```js
export const applyMiddleware =
  (middlewares) => (oldCreateStore) => (reducer, initState) => {
    // 获得老的store
    const store = oldCreateStore(reducer, initState);
    // [catch, logger]
    const chain = middlewares.map((middleware) => middleware(store));
    let oldDispatch = store.dispatch;
    chain
      .reverse()
      .forEach((middleware) => (oldDispatch = middleware(oldDispatch)));
    store.dispatch = oldDispatch;
    return store;
  };

const newStore = applyMiddleware([catchMiddleware, loggerMiddleware])(
  createStore,
)(rootReducer);
```

Redux 提供了`applyMiddleware`来加载`middleware`,`applyMiddleware`接受三个参数，`middlewares`数组/`redux`的`createStore`/`reducer`

```js
export default const applyMiddleware = (...middlewares) => createStore => (reducer, ...args) => {
  //由createStore和reducer创建store
    const store = createStore(reducer, ...args)
    let dispatch = store.dispatch
    var middlewareAPI = {
        getState: store.getState,
        dispatch: (action, ...args) => dispatch(action, ...args)
    }
    // 把 getState/dispatch 传给 middleware，
    // map 让每个 middleware 获得了 middlewareAPI 参数
    // 形成一个 chain 匿名函数数组 [f1,f2,f3...fn]
    const chain = middlewares.map(middleware => middleware(middlewareAPI))
    // dispatch = f1(f2(f3(store.dispatch)))，把所有的 middleware 串联起来
    dispatch = compose(...chain)(store.dispatch)
    return {
        ...store,
        dispatch
    }
}
```

applyMiddleware 符合洋葱模型

<img width="770" alt="image" src="https://user-images.githubusercontent.com/38368040/156110747-48070fcb-e85a-4d2f-b97a-7aa57a2a523c.png">

<div class="link">参考链接</div>

- [手写 react-redux](http://dennisgo.cn/Articles/React/React-Redux.html)

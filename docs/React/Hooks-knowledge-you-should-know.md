---
title: 你应该知道的 Hooks 知识
group:
  title: 基础
  order: 0
order: 0
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
    .foreword{
        padding: 12px 12px 12px 16px;
        background-color: #ECF9FF;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        border-left: 5px solid #439dd3;
    }
    .quote {
        background-color: #FFE7CC;
        padding: 10px;
        border-radius: 8px;
        font-weight: 500;
    }
</style>

一篇关于 hooks 的内容分享，主要涉及函数组件、类组件的介绍，以及 useEffect 的生命周期替换方案和是否把函数作为 useEffect 的第二参数在实践中的解决方案。

<!-- more -->

## Hooks

Hook 是 React16.8 的新增特性，能够在不写 class 的情况下使用 state 以及其他特性。

### 动机

- 在组件之间复用状态逻辑很难
- 复杂组件变得难以理解
- 难以理解的 class

### hook 规则

- 只有在最顶层使用 hook，`不要再循环/条件/嵌套函数中使用`
- 只有在 React 函数中调用 Hook

## 函数组件和类组件的不同

函数组件能够捕获到当前渲染的所用的值。

[点击查看示例](https://codesandbox.io/s/function-vs-class-2lojw?file=/src/App.js)

对于类组件来说，虽然 props 是一个不可变的数据，但是 this 是一个可变的数据，在我们渲染组件的时候 this 发生了改变，所以 this.props 发生了改变，因此在 this.showMessage 中会拿到最新的 props 值。

对于函数组件来说捕获了渲染所使用的值，当我们使用 hooks 时，这种特性也同样的试用于 state 上。

[点击查看示例](https://codesandbox.io/s/state-example-7cpte?file=/src/App.js)

```js
const showMessage = () => {
  alert('写入：' + message);
};

const handleSendClick = () => {
  setTimeout(showMessage, 3000);
};

const handleMessageChange = (e) => {
  setMessage(e.target.value);
};
```

如果我们想跳出'函数组件捕获当前渲染的所用值‘这个特性，我们可以采用 ref 来追踪某些数据。通过 ref.current 可以获取到最新的值

```js
const showMessage = () => {
  alert('写入：' + ref.current);
};

const handleSendClick = () => {
  setTimeout(showMessage, 3000);
};

const handleMessageChange = (e) => {
  setMessage(e.target.value);
  ref.current = e.target.value;
};
```

## useEffect

useEffect 能够在函数组件中执行副作用操作(数据获取/涉及订阅)
其实可以把 useEffect 看作是 componentDidMount/componentDidUpdate/componentWillUnMount 的组合

第一个参数是一个 callback，返回 destory。destory 作为下一个 callback 执行前调用，用于清除上一次 callback 产生的副作用

第二个参数是依赖项，一个数组，可以有多个依赖项。依赖项改变，执行上一个 callback 返回的 destory，和执行新的 effect 第一个参数 callback

对于 useEffect 的执行，React 处理逻辑是`采用异步调用`的，对于每一个 effect 的 callback 会像 setTimeout 回调函数一样，放到任务队列里面，等到主线程执行完毕才会执行。所以 effect 的回调函数不会阻塞浏览器绘制视图

1. 相关的生命周期替换方案

   - componentDidMount 替代方案

   ```js
   React.useEffect(() => {
     //请求数据，事件监听，操纵DOM
   }, []); //dep=[]，只有在初始化执行
   /* 
       因为useEffect会捕获props和state，
       所以即使是在回调函数中我们拿到的还是最初的props和state
     */
   ```

   - componentDidUnmount 替代方案

   ```js
   React.useEffect(() => {
     /* 请求数据 ， 事件监听 ， 操纵dom ， 增加定时器，延时器 */
     return function componentWillUnmount() {
       /* 解除事件监听器 ，清除定时器，延时器 */
     };
   }, []); /* 切记 dep = [] */
   //useEffect第一个函数的返回值可以作为componentWillUnmount使用
   ```

   - componentWillReceiveProps 替代方案
     其实两者的执行时机是完全不同的，`一个在render阶段，一个在commit阶段`
     useEffect 会初始化执行一次，但是 componentWillReceiveProps 只会在 props 变化时执行更新

   ```js
   React.useEffect(() => {
     console.log('props变化：componentWillReceiveProps');
   }, [props]);
   ```

   - componentDidUpdate 替代方案
     useEffect 和 componentDidUpdate 在执行时期虽然有点差别，`useEffect是异步执行，componentDidUpdate是同步执行`，但都是在 commit 阶段

   ```js
   React.useEffect(() => {
     console.log('组件更新完成：componentDidUpdate ');
   }); //没有dep依赖项，没有第二个参数，那么每一次执行函数组件，都会执行该effect。
   ```

2. 在 useEffect 中[]需要处理什么

   [React 官网 FAQ](https://zh-hans.reactjs.org/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies)这样说

   只有当函数(以及它所调用的函数)不引用 props、state 以及由它们衍生而来的值时，你才能放心地把它们从依赖列表中省略，使用 eslint-plugin-react-hooks 帮助我们的代码做一个校验

   [点击查看详细示例](https://codesandbox.io/s/count-ilrrt?file=/src/App.js)

   ```js
   function Counter() {
     const [count, setCount] = useState(0);

     useEffect(() => {
       const id = setInterval(() => {
         setCount(count + 1);
       }, 1000);
       return () => clearInterval(id);
     }, []);

     return <h1>{count}</h1>;
   }
   //只会做一次更新，然后定时器不再转动
   ```

3. 是否应该把函数当做 effect 的依赖

   ```js
   const loadResourceCatalog = async () => {
     if (!templateType) return;
     const reqApi =
       templateType === TEMPLATE_TYPE.STANDARD
         ? 'listCatalog'
         : 'getCodeManageCatalog';
     const res: any = await API[reqApi]();
     if (!res.success) return;
     setCatalog(res.data);
   };

   useEffect(() => {
     loadResourceCatalog();
   }, []);
   //在函数loadResourceCatalog中使用了templateType这样的一个state
   //在开发的过程中可能会忘记函数loadResourceCatalog依赖templateType值
   ```

   第一个简单的解法，对于**某些只在 useEffect 中使用的函数**，直接定义在 effect 中，以至于能够直接依赖某些 state

   ```js
   useEffect(() => {
     const loadResourceCatalog = async () => {
       if (!templateType) return;
       const reqApi =
         templateType === TEMPLATE_TYPE.STANDARD
           ? 'listCatalog'
           : 'getCodeManageCatalog';
       const res: any = await API[reqApi]();
       if (!res.success) return;
       setCatalog(res.data);
     };
     loadResourceCatalog();
   }, [templateType]);
   ```

   假如我们需要在很多地方用到我们定义的函数，不能够把定义放到当前的 effect 中，并且将函数放到了第二个的依赖参数中，那这个代码将就进入死循环。因为函数在每一次渲染中都返回一个`新的引用`

   ```js
   const Template = () => {
     const getStandardTemplateList = async () => {
       const res: any = await API.getStandardTemplateList();
       if (!res.success) return;
       const { data } = res;
       setCascaderOptions(data);
       getDefaultOption(data[0]);
     };
     useEffect(() => {
       getStandardTemplateList();
     }, [getStandardTemplateList]);
   };
   ```

   针对这种情况，如果当前函数没有引用任何组件内的任何值，可以将该函数提取到组件外面去定义，这样就不会组件每次 render 时不会再次改变函数引用。

   ```js
   const getStandardTemplateList = async () => {
     const res: any = await API.getStandardTemplateList();
     if (!res.success) return;
     const { data } = res;
     setCascaderOptions(data);
     getDefaultOption(data[0]);
   };

   const Template = () => {
     useEffect(() => {
       getStandardTemplateList();
     }, []);
   };
   ```

   如果说当前函数中引用了组件内的一些状态值，可以采用 useCallBack 对当前函数进行包裹

   ```js
   const loadResourceCatalog = useCallback(async () => {
     if (!templateType) return;
     const reqApi =
       templateType === TEMPLATE_TYPE.STANDARD
         ? 'listCatalog'
         : 'getCodeManageCatalog';
     const res: any = await API[reqApi]();
     if (!res.success) return;
     setCatalog(res.data);
   }, [templateType]);

   useEffect(() => {
     loadResourceCatalog();
   }, [loadResourceCatalog]);
   //通过useCallback的包裹，如果templateType保持不变，那么loadResourceCatalog也会保持不变，所以useEffect也不会重新运行
   //如果templateType改变，那么loadResourceCatalog也会改变，所以useEffect也会重新运行
   ```

## useCallback

[React 官网定义](https://zh-hans.reactjs.org/docs/hooks-reference.html#usecallback)

返回一个 memoized 回调函数，该回调函数仅在某个依赖项改变时才会更新

```js
import React, { useCallback, useState } from 'react';

const CallBackTest = () => {
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const handleCount = () => setCount(count + 1);
  //const handleCount = useCallback(() => setCount(count + 1), [count]);
  const handleTotal = () => setTotal(total + 1);

  return (
    <div>
      <div>Count is {count}</div>
      <div>Total is {total}</div>
      <br />
      <div>
        <Child onClick={handleCount} label="Increment Count" />
        <Child onClick={handleTotal} label="Increment Total" />
      </div>
    </div>
  );
};

const Child = React.memo(({ onClick, label }) => {
  console.log(`${label} Child Render`);
  return <button onClick={onClick}>{label}</button>;
});

export default CallBackTest;
```

[点击查看详细示例](https://codesandbox.io/s/usecallback-example-gx2i7?file=/src/App.js)

React.memo 是通过记忆组件渲染结果的方式来提高性能，memo 是 react16.6 引入的新属性，通过`浅比较`(源码通过 Object.is 方法比较)当前依赖的 props 和下一个 props 是否相同来决定是否重新渲染；如果使用过类组件方式，就能知道 memo 其实就相当于 class 组件中的 React.PureComponent，区别就在于 memo 用于函数组件。useCallback 和 React.memo 一定要结合使用才能有效果。

**使用场景**

- 作为 props，传递给子组件，为避免子元素不必要的渲染，需要配合 React.Memo 使用，否则无意义
- 作为 useEffect 的依赖项，需要进行比较的时候才需要加上 useCallback

## useMemo

[React 官网定义](https://zh-hans.reactjs.org/docs/hooks-reference.html#usememo)

返回一个 memoized 值

仅会在某个依赖项改变时才重新计算 memoized 值，这种优化有助于避免在每次渲染时都进行`高开销的计算`

useCallback(fn,deps)相当于 useMemo(() => fn, deps)

对于实现上，基本上是和 useCallback 相似，只是略微有些不同

**使用场景**

- 避免在每次渲染时都进行高开销的计算

两个 hooks 内置于 React 都有特别的原因：

1. 引用相等

   当在 React 函数组件中定义一个对象时，它跟上次定义的相同对象，引用是不一样的（即使它具有所有相同值和相同属性）

   - 依赖列表
   - React.memo

   大多数时候，你不需要考虑去优化不必要的重新渲染，因为优化总会带来成本。

2. 昂贵的计算

   计算成本很高的同步计算值的函数

## 总结

本文介绍了 hooks 产生动机、函数组件和类组件的区别以及 useEffect/useCallback/useMemo 等内容。重点介绍了 useEffect 的生命周期替换方案以及是否把函数作为 useEffect 的第二参数。

<div class="link"> 参考链接 </div>

- [When to useMemo and useCallback](https://kentcdodds.com/blog/usememo-and-usecallback)
- [How to fetch data with React Hooks](https://www.robinwieruch.de/react-hooks-fetch-data)
- [A Complete Guide to useEffect](https://overreacted.io/a-complete-guide-to-useeffect/)
- [How Are Function Components Different from Classes?](https://overreacted.io/how-are-function-components-different-from-classes/)
- [useCallback、useMemo 分析 & 差别](https://github.com/monsterooo/blog/issues/37)

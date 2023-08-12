---
title: React 中的数据流管理
group:
  title: 数据流
  order: 1
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
    .quote {
        background-color: #FFE7CC;
        padding: 10px;
        border-radius: 8px;
        font-weight: 500;
    }
</style>

## 前言

<div class="quote">💡 为什么数据流管理重要？React 的核心思想为：UI=render(data)，data 就是所谓的数据，render 是 React 提供的纯函数，所以 UI 展示完全由数据层决定。</div>

在本文中，会简单介绍 react 中的数据流管理，从自身的 context 到三方库的 redux 的相关概念，以及 redux 附属内容丐版实现。

在正文之前，先简单介绍**数据**和**状态**的概念。React 是利用可复用的组件来构建界面，组件本质上有限状态机，能够记住当前组件的状态，根据不同的状态变化做出相关的操作。在 React 中，把这种状态定义为`state`。通过管理状态来实现对组件的管理，当`state`发生改变时，React 会自动去执行相应的操作。

而数据，它不仅指 server 层返回给前端的数据，React 中的状态也是一种数据。当数据改变时，我们需要改变状态去引发界面的变更。

## React 自身的数据流方案

### 基于 Props 的单向数据流

React 是自上而下的单向数据流，容器组件&展示组件是最常见的 React 组件设计方案。容器组件负责处理复杂的业务逻辑和数据，展示组件负责处理 UI 层。通常我们会把展示组件抽出来复用或者组件库的封装，容器组件自身通过 state 来管理状态，setState 更新状态，从而更新 UI，通过 props 将自身的 state 传递给展示组件实现通信

![111](https://user-images.githubusercontent.com/38368040/155837019-dc9ea4b9-0cac-4c97-be7f-b6e9cd3f9a23.png)

对于简单的通信，基于`props`串联父子和兄弟组件是很灵活的。

但是对于嵌套深数据流组件，A→B→C→D→E，A 的数据需要传递给 E 使用，那么我们需要在 B/C/D 的`props`都加上该数据，导致最为中间组件的 B/C/D 来说会引入一些不属于自己的属性

### 使用 Context API 维护全局状态

Context API 是 React 官方提供的一种组件树全局通信方式

`Context`基于生产者-消费者模式，对应 React 中的三个概念: **React.createContext**、**Provider**、**Consumer**。通过调用`createContext`创建出一组`Provider`。`Provider`作为数据的提供方，可以将数据下发给自身组件树中的任意层级的`Consumer`，而**Consumer 不仅能够读取到 Provider 下发的数据还能读取到这些数据后续的更新值**

```js
const defaultValue = {
  count: 0,
  increment: () => {}
};

const ValueContext = React.createContext(defaultValue);

<ValueContext.Provider value={this.state.contextState}>
  <div className="App">
    <div>Count: {count}</div>
    <ButtonContainer />
    <ValueContainer />
  </div>
</ValueContext.Provider>

<ValueContext.Consumer>
  {({ increment }) => (
    <button onClick={increment} className="button">increment</button>
  )}
</ValueContext.Consumer>
```

[16.3 之前的用法](https://codesandbox.io/s/context-use-before-16-3-318qr2?file=/src/App.js)，[16.3 之后的 createContext 用法](https://codesandbox.io/s/context-use-after-16-3-j566ro?file=/src/App.js:581-643)，[useContext 用法](https://codesandbox.io/s/context-use-hooks-2l55gw?file=/src/App.js)

Context 工作流的简单图解：

![Untitled](https://github.com/LuckyFBB/blog/assets/38368040/b3767f46-ec28-40f7-abdf-465a9441cb9d)

在 v16.3 之前由于各种局限性不被推荐使用

- 代码不够简单优雅：生产者需要定义`childContextTypes`和`getChildContext`，消费者需要定义`ChildTypes`才能够访问`this.context`访问到生产者提供的数据
- 数据无法及时同步：类组件中可以使用`shouldComponentUpdate`返回 false 或者是`PureComponent`，后代组件都不会被更新，这违背了 Context 模式的设置，导致生产者和消费者之间不能及时同步

在 v16.3 之后的版本中做了对应的调整，即使组件的`shouldComponentUpdate`返回 false，它仍然可以”穿透”组件继续向后代组件进行传播，更改了声明方式变得更加语义化，使得 Context 成为了一种可行的通信方案

但是 Context 的也是通过一个容器组件来管理状态的，但是`Consumer`和`Provider`是一一对应的，在项目复杂度高的时候，可能会出现多个`Provider`和`Consumer`，甚至一个`Consumer`需要对应多个`Provider`的情况

当某个组件的业务逻辑变得非常复杂时，代码会越写越多，因为我们只能够在组件内部去控制数据流，这样导致 Model 和 View 都在 View 层，业务逻辑和 UI 实现都在一块，难以维护

所以这个时候需要真正的数据流管理工具，从 UI 层完全抽离出来，只负责管理数据，让 React 只专注于 View 层的绘制

## Redux

Redux 是 **JS 应用**的状态容器，提供可预测的状态管理

Redux 的三大原则

- 单一数据源：整个应用的 state 都存储在一棵树上，并且这棵状态树只存在于唯一的 store 中
- state 是只读的：对 state 的修改只有触发 action
- 用纯函数执行修改：reducer 根据旧状态和传进来的 action 来生成一个新的 state(类似与 reduce 的思想，接受上一个 state 和当前项 action，计算出来一个新值)

Redux 工作流

![Untitled](https://github.com/LuckyFBB/blog/assets/38368040/1a7053b3-4880-4a12-9a3d-81a991c15119)

**不可变性(Immutability)**

mutable 意为可改变的，immutability 意为用不可改变的

在 JS 的对象(object)和数组(array)默认都是 mutable，创建一个对象/数组都是可以改变内容

```js
const obj = { name: 'FBB', age: 20 };
obj.name = 'shuangxu';

const arr = [1, 2, 3];
arr[1] = 6;
arr.push('change');
```

改变对象或者数组，内存中的引用地址尚未改变，但是内容已经改变

如果想用不可变的方式来更新，代码必须复制原来的对象/数组，更新它的复制体

```js
const obj = { info: { name: 'FBB', age: 20 }, phone: '177xxx' };
const cloneObj = { ...obj, info: { name: 'shuangxu' } };
```

**Redux 期望所有的状态都采用不可变的方式。**

[点击查看]("/react/redux")更多的 Redux 相关内容

## 总结

本文意在讲解 react 的数据流管理。从 react 本身的提供的数据流方式出发

1.  基于`props`的单向数据流，串联父子和兄弟组件非常灵活，但是对于嵌套过深的组件，会使得中间组件都加上不需要的`props`数据
1.  使用 Context 维护全局状态，介绍了 v16.3 之前/v16.3 之后/hooks，不同版本`context`的使用，以及 v16.3 之前版本的`context`的弊端。
1.  引入 redux，第三方的状态容器，以及 react-redux API(Provider/connect)分析与丐版实现

<div class="link">参考链接</div>

- [对 React 状态管理的理解及方案对比](https://github.com/sunyongjian/blog/issues/36)
- [聊一聊我对 React Context 的理解以及应用](https://juejin.cn/post/6844903566381940744)

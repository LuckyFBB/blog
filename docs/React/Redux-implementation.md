---
title: Redux 原理实现
group:
  title: 数据流
  order: 1
order: 1
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

在前文的文章中，我们讲到了 [React 数据流](/react/data-flow-management-in--react) 相关的知识。在本文中将介绍 redux 的实现原理。

在本文开始之前，有一些内容需要忘记：

- redux 和 react 是没有关系的，它可以被用在任何框架中
- connect 不属于 redux，它属于 react-redux，可以看[该片文章](/react/redux-more#react-redux)有过介绍
- redux 就是一个状态管理器

下面的图是 redux 的工作流

![Untitled](/blog/imgs/redux/Untitled.png)

## 简单的状态管理

所谓的状态其实就是数据，例如用户中的 name

```js
let state = {
  name: 'shuangxu',
};

// 使用状态
console.log(state.name);

// 更改状态
state.name = 'FBB';
```

上述代码中存在问题，当我们修改了状态之后无法通知到使用状态的函数，需要引入发布订阅模式来解决这个问题

```js
const state = {
  name: 'shuangxu',
};
const listeners = [];

const subscribe = (listener) => {
  listeners.push(listener);
};

const changeName = (name) => {
  state.name = name;
  listeners.forEach((listener) => {
    listener?.();
  });
};

subscribe(() => console.log(state.name));

changeName('FBB');
changeName('LuckyFBB');
```

在上述代码中，我们已经实现了更改变量能够通知到对应的监听函数。但是上述代码并不通用，需要将公共方法封装起来。

```js
const createStore = (initialState) => {
  let state = initialState;
  let listeners = [];

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((fn) => fn !== listener);
    };
  };

  const changeState = (newState) => {
    state = { ...state, ...newState };
    listeners.forEach((listener) => {
      listener?.();
    });
  };

  const getState = () => state;

  return {
    subscribe,
    changeState,
    getState,
  };
};

// example
const { getState, changeState, subscribe } = createStore({
  name: 'shuangxu',
  age: 19,
});

subscribe(() => console.log(getState().name, getState().age));

changeState({ name: 'FBB' }); // FBB 19
changeState({ age: 26 }); // FBB 26

changeState({ sex: 'female' });
```

## 约束状态管理器

上述的实现能够更改状态和监听状态的改变。但是上述改变 state 的方式过于随便了，我们可以任意修改 state 中的数据，`changeState({ sex: "female" })`，即使 sex 不存在于 initialState 中，所以我们需要约束只能够修改 name/age 属性

通过一个 plan 函数来规定`UPDATE_NAME`和`UPDATE_AGE`方式更新对应属性

```js
const plan = (state, action) => {
  switch (action.type) {
    case 'UPDATE_NAME':
      return {
        ...state,
        name: action.name,
      };
    case 'UPDATE_AGE':
      return {
        ...state,
        age: action.age,
      };
    default:
      return state;
  }
};
```

更改一下 createStore 函数

```js
const createStore = (plan, initialState) => {
  let state = initialState;
  let listeners = [];

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((fn) => fn !== listener);
    };
  };

  const changeState = (action) => {
    state = plan(state, action);
    listeners.forEach((listener) => {
      listener?.();
    });
  };

  const getState = () => state;

  return {
    subscribe,
    changeState,
    getState,
  };
};

const { getState, changeState, subscribe } = createStore(plan, {
  name: 'shuangxu',
  age: 19,
});

subscribe(() => console.log(getState().name, getState().age));

changeState({ type: 'UPDATE_NAME', name: 'FBB' }); // FBB 19
changeState({ type: 'UPDATE_AGE', name: '28' }); // FBB 28
changeState({ type: 'UPDATE_SEX', sex: 'female' }); // FBB 19
```

代码中的 plan 就是 redux 中的 reducer，changeState 就是 dispatch。

## 拆分 reducer

reducer 做的事情比较简单，接收 oldState，通过 action 更新 state。

但是实际项目中可能存在不同模块的 state，如果都把 state 的执行计划写在同一个 reducer 中庞大有复杂。

因此在常见的项目中会按模块拆分不同的 reducer，最后在一个函数中将 reducer 合并起来。

```js
const initialState = {
  user: { name: 'shuangxu', age: 19 },
  counter: { count: 1 },
};

// 对于上述 state 我们将其拆分为两个 reducer
const userReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_NAME':
      return {
        ...state,
        name: action.name,
      };
    case 'UPDATE_AGE':
      return {
        ...state,
        age: action.age,
      };
    default:
      return state;
  }
};

const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1,
      };
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
};

// 整合 reducer
const combineReducers = (reducers) => {
  // 返回新的 reducer 函数
  return (state = {}, action) => {
    const newState = {};
    for (const key in reducers) {
      const reducer = reducers[key];
      const preStateForKey = state[key];
      const nextStateForKey = reducer(preStateForKey, action);
      newState[key] = nextStateForKey;
    }
    return newState;
  };
};
```

代码跑起来！！

```js
const reducers = combineReducers({
  counter: counterReducer,
  user: userReducer,
});

const store = createStore(reducers, initialState);
store.subscribe(() => {
  const state = store.getState();
  console.log(state.counter.count, state.user.name, state.user.age);
});
store.dispatch({ type: 'UPDATE_NAME', name: 'FBB' }); // 1 FBB 19
store.dispatch({ type: 'UPDATE_AGE', age: '28' }); // 1 FBB 28
store.dispatch({ type: 'INCREMENT' }); // 2 FBB 28
store.dispatch({ type: 'DECREMENT' }); // 1 FBB 28
```

## 拆分 state

在上一节的代码中，我们 state 还是定义在一起的，会造成 state 树很庞大，在项目中使用的时候我们都在 reducer 中定义好 initialState 的。

在使用 createStore 的时候，我们可以不传入 initialState，直接使用`store = createStore(reducers)`。因此我们要对这种情况作处理。

拆分 state 和 reducer 写在一起。

```js
const initialUserState = { name: 'shuangxu', age: 19 };

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case 'UPDATE_NAME':
      return {
        ...state,
        name: action.name,
      };
    case 'UPDATE_AGE':
      return {
        ...state,
        age: action.age,
      };
    default:
      return state;
  }
};

const initialCounterState = { count: 1 };

const counterReducer = (state = initialCounterState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1,
      };
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
};
```

更改 createStore 函数，可以自动获取到每一个 reducer 的 initialState

```js
const createStore = (reducer, initialState = {}) => {
  let state = initialState;
  let listeners = [];

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((fn) => fn !== listener);
    };
  };

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => {
      listener?.();
    });
  };

  const getState = () => state;

  // 仅仅用于获取初始值
  dispatch({ type: Symbol() });

  return {
    subscribe,
    dispatch,
    getState,
  };
};
```

`dispatch({ type: Symbol() })`代码能够实现如下效果：

- createStore 的时候，一个不匹配任何 type 的 action，来触发`state = reducer(state, action)`
- 每个 reducer 都会进到 default 项，返回 initialState

## 总结

通过上述的几个步骤，我们已经实现了一个 redux，完全和 react 没有关系，只是提供了一个数据处理中心。

- createStore
  创建 store 对象，包含 getState/dispatch/subscribe 等方法，能够获取 state/更改数据/监听数据的改变

  ![Untitled](/blog/imgs/redux/Untitled%201.png)

- reducer
  一个计划函数，接收旧的 state 和 action 返回一个新的 state

  ![Untitled](/blog/imgs/redux/Untitled%202.png)

- combineReducers
  多 reducer 合并成一个 reducer

  ![Untitled](/blog/imgs/redux/Untitled%203.png)

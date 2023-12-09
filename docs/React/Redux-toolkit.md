---
title: Redux-Toolkit 使用及原理实现
group:
  title: 数据流
  order: 1
order: 5
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

## 背景

Redux-Toolkit 是 基于 Redux 的二次封装，开箱即用的 Redux 工具，比 Redux 更加简单方便。

<div class="quote">
🚧 Why to use Redux-toolkit?

1. Configuring a Redux store is too complicated
2. I have to add a lot of packages to get Redux to do anything useful
3. Redux requires too much boilerplate code
</div>

## Toolkit 使用

Redux 该有的概念的 Toolkit 其实都是有拥有的，只是他们使用的方式不同，例如 reducer/actions 等等在 Toolkit 中都是随处可见的。

### configureStore

创建 store，代码内部还是调用的 Redux 的 createStore 方法

```js
const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
});
```

### createAction + createReducer

- createAction -- 创建 Redux 中的 action 创建函数

  ```js
  function createAction(type, prepareAction?)
  ```

  redux 中 action 的创建以及使用

  ```js
  const updateName = (name: string) => ({ type: 'user/UPDATE_NAME', name });
  const updateAge = (age: number) => ({ type: 'user/UPDATE_AGE', age });
  ```

  Toolkit 中 action 的创建以及使用

  ```js
  // 第一种
  const updateName = createAction < { name: string } > 'user/UPDATE_NAME';
  const updateAge = createAction < { age: number } > 'user/UPDATE_AGE';

  updateName(); // { type: 'user/UPDATE_NAME', payload: undefined }
  updateName({ name: 'FBB' }); // { type: 'user/UPDATE_NAME', payload: { name: 'FBB' } }
  updateAge({ age: 18 });

  // 第二种
  const updateName = createAction('user/UPDATE_NAME', (name: string) => ({
    payload: {
      name,
    },
  }));
  const updateAge = createAction('user/UPDATE_AGE', (age: number) => ({
    payload: {
      age,
    },
  }));

  updateName('FBB');
  updateAge(18);
  ```

- createReducer -- 创建 Redux reducer 的函数

    <div class="quote">
    💡 createReducer 使用 Immer 库，可以在 reducer 中直接对状态进行修改，而不需要手动编写不可变性的逻辑
    </div>

  Redux 中 reducer 的创建

  ```js
  export const userReducer = (
    state = initialUserState,
    action: { type: string, [propName: string]: any },
  ) => {
    switch (action.type) {
      case 'user/UPDATE_NAME':
        return { ...state, name: action.name };
      case 'user/UPDATE_AGE':
        return { ...state, age: action.age };
      default:
        return state;
    }
  };
  ```

  Toolkit 中 reducer 的创建

  ```js
  export const userReducer = createReducer(initialUserState, (builder) => {
    builder.addCase(updateAge, (state, action) => {
      state.age = action.payload.age;
    });
    builder.addCase(updateName, (state, action) => {
      state.name = action.payload.name;
    });
  });
  ```

toolkit 提供的 createAction 和 createReducer 能够帮我们简化 Redux 中一些模版语法，但是整体的使用还是差不多的，我们依旧需要 action 文件和 reducer 文件，做了改善但是不多。

[redux demo](https://github.com/LuckyFBB/Front-End-Examples/blob/main/mini-redux/example/example.ts) [toolkit createReducer demo](https://github.com/LuckyFBB/Front-End-Examples/blob/main/mini-redux-toolkit/examples/example_reducer/example.ts)

### createSlice

接受初始状态、reducer 函数对象和 slice name 的函数，并自动生成与 reducer 和 state 对应的动作创建者和动作类型

```ts
const userSlice = createSlice({
  name: 'user',
  initialState: {
    age: 22,
    name: 'shuangxu',
  },
  reducers: {
    updateName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    updateAge: (state, action: PayloadAction<number>) => {
      state.age = action.payload;
    },
  },
});
```

使用 createSlice 创建一个分片，每一个分片代表某一个业务的数据状态处理。在其中可以完成 action 和 reducer 的创建。

```ts
export const userSliceName = userSlice.name;
export const { updateAge, updateName } = userSlice.actions;
export const userReducer = userSlice.reducer;

const store = configureStore({
  reducer: {
    [counterSliceName]: counterReducer,
    [userSliceName]: userReducer,
  },
});
```

[toolkit slice demo](https://github.com/LuckyFBB/Front-End-Examples/blob/main/mini-redux-toolkit/examples/example_slice/example.ts)

在 Toolkit 中直接使用 createSlice 更加方便，能够直接导出 reducer 和 action，直接在一个方法中能够获取到对应内容不在需要多处定义。

## 源码实现

### configureStore

接受一个含有 reducer 的对象作为参数，内部调用 redux 的 createStore 创建出 store

```ts
import { combineReducers, createStore } from 'redux';

export function configureStore({ reducer }: any) {
  const rootReducer = combineReducers(reducer);
  const store = createStore(rootReducer);
  return store;
}
```

### createAction

```ts
const updateName = createAction<string>('user/UPDATE_NAME');
const updateName = createAction('user/UPDATE_NAME', (name: string) => ({
  payload: {
    name,
  },
}));

updateName('FBB');
```

通过上面的示例，能够分析出来 createAction 返回的是一个函数，接受第一个参数 type 返回`{ type: 'user/UPDATE_NAME', payload: undefined }`；对于具体的 payload 值需要传入第二个参数来改变

```ts
export const createAction = (type: string, preAction?: Function) => {
  function actionCreator(...args: any[]) {
    if (!preAction)
      return {
        type,
        payload: args[0],
      };
    const prepared = preAction(...args);
    if (!prepared) {
      throw new Error('prepareAction did not return an object');
    }
    return {
      type,
      payload: prepared.payload,
    };
  }
  actionCreator.type = type;
  return actionCreator;
};
```

### createReducer

```ts
export const userReducer = createReducer(initialUserState, (builder) => {
  builder
    .addCase(updateAge, (state, action) => {
      state.age = action.payload.age;
    })
    .addCase(updateName, (state, action) => {
      state.name = action.payload.name;
    });
});
```

每一个 reducer 都是一个函数`(state = initialState, action) => {}`，因此 createReducer 返回值为函数

通过一个 createReducer 函数，内部还需要知道每一个 action 对应的操作

```ts
import { produce as createNextState } from 'immer';

export const createReducer = (
  initialState: any,
  builderCallback: (builder: any) => void,
) => {
  const actionsMap = executeReducerBuilderCallback(builderCallback);
  return function reducer(state = initialState, action: any) {
    const caseReducer = actionsMap[action.type];
    if (!caseReducer) return state;
    return createNextState(state, (draft: any) => caseReducer(draft, action));
  };
};

// 通过 createReducer 的第二个参数，构建出 action 对应的操作方法
export const executeReducerBuilderCallback = (
  builderCallback: (builder: any) => void,
) => {
  const actionsMap: any = {};
  const builder = {
    addCase(typeOrActionCreator: any, reducer: any) {
      const type =
        typeof typeOrActionCreator === 'string'
          ? typeOrActionCreator
          : typeOrActionCreator.type;
      actionsMap[type] = reducer;
      return builder;
    },
  };
  builderCallback(builder);
  return actionsMap;
};
```

### createSlice

```ts
const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 1,
  },
  reducers: {
    increment: (state: any) => {
      state.count += 1;
    },
    decrement: (state: any) => {
      state.count -= 1;
    },
  },
});

const counterSliceName = counterSlice.name;
const { increment, decrement } = counterSlice.actions;
const counterReducer = counterSlice.reducer;
```

createSlice 返回的是一个对象`{ name, actions, reducer }`，接受`{ name, initialState, reducers }`三个参数。通过 reducers 中相关参数得到对应的 actions 和 reducer。

在 createSlice 中主要还是靠 createAction 和 createReducer 方法。通过 name 和 reducers 的每一个属性拼接成为 action.type，调用 createReducer 遍历 reducers 的属性添加 case

```ts
import { createAction } from './createAction';
import { createReducer } from './createReducer';

export default function createSlice({ name, initialState, reducers }: any) {
  const reducerNames = Object.keys(reducers);

  const actionCreators: any = {};
  const sliceCaseReducersByType: any = {};

  reducerNames.forEach((reducerName) => {
    const type = `${name}/${reducerName}`;
    const reducerWithPrepare = reducers[reducerName];
    actionCreators[reducerName] = createAction(type);
    sliceCaseReducersByType[type] = reducerWithPrepare;
  });

  function buildReducer() {
    return createReducer(initialState, (builder) => {
      for (let key in sliceCaseReducersByType) {
        builder.addCase(key, sliceCaseReducersByType[key]);
      }
    });
  }

  return {
    name,
    actions: actionCreators,
    reducer: (state: any, action: any) => {
      const _reducer = buildReducer();
      return _reducer(state, action);
    },
  };
}
```

## 总结

本文讲了 toolkit 的使用和源码实现，toolkit 是基于 redux 实现的，相对于 redux 来说少了很多的模版语言更加的方便快捷。从 redux 升级到 redux-toolkit 也是没有破坏性变更的。

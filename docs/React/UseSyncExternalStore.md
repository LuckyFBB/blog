---
title: useSyncExternalStore
group:
  title: 基础
  order: 0
order: 2
---

:::info{title=" "}
💡useSyncExternalStore is a React Hook that lets you subscribe to an external store
:::

useSyncExternalStore 是一个可以订阅外部 Store 的 React Hook

```ts
const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)
```

### 单个监听

该 hook 可以基于外部的 store 创建一个 state。

```ts
let store = { x: window.innerWidth, y: window.innerHeight };

export const subscribe = (callback: () => void) => {
  window.addEventListener('resize', () => {
    store = { x: window.innerWidth, y: window.innerHeight };
    callback();
  });
  return () => {
    window.removeEventListener('resize', callback);
  };
};

export const getSnapshot = () => {
  return store;
};
```

getSnapshot 是用来获取当前的数据，需要注意这里返回的 store 需要是新对象的引用，把 store 当成不可变数据来使用

subscribe 接受一个 callback 方法，这个 callback 方法是由 react 内部传递而来，主要是做当 store 发生改变的时候，callback 方法需要被执行，其内部主要是执行 forceUpdate 方法

其核心逻辑为 store 改变 ⇒ 调用 callback ⇒ forceUpdate(fiber) 执行刷新

```ts
function App() {
  const size = useSyncExternalStore(subscribe, getSnapshot);
  return (
    <div>
      <div>X:{size.x}</div>
      <div>Y:{size.y}</div>
    </div>
  );
}
```

![chatgpt.gif](/blog/imgs/useSyncExternalStore/chatgpt.gif)

### 多个监听

官网的一个 todoList 的示例

```ts
class TodoStore {
  private _todoList: { id: string; name: string; status: TodoStatus }[] = [];
  private _listeners: (() => void)[] = [];

  addTodo = () => {
    const name = nanoid(5);
    this._todoList = [
      ...this._todoList,
      {
        id: name,
        name: `TODO_${name}`,
        status: TodoStatus.Todo,
      },
    ];
    this.emitChange();
  };

  completeTodo = (id: string) => {
    this._todoList = this._todoList.map((todo) => {
      if (todo.id === id) {
        todo.status = TodoStatus.Complete;
      }
      return todo;
    });
    this.emitChange();
  };

  emitChange = () => {
    this._listeners.forEach((l) => l?.());
  };

  subscribe = (listener: () => void) => {
    this._listeners.push(listener);
    return () => {
      this._listeners.filter((l) => l !== listener);
    };
  };

  getSnapShot = () => {
    return this._todoList;
  };
}

export default new TodoStore();
```

代码逻辑和单个示例的差不多，但是值得注意的是 subscribe 中不在直接调用 react 返回的 callback 方法，而是将其存储到一个数组中，当 store 发生改变的时候去掉用 emitChange 方法，让每一个 callback 方法执行。

```ts
export const UnToList = () => {
  const store = useSyncExternalStore(
    todoStore.subscribe,
    todoStore.getSnapShot,
  );
};

export const CompleteList = () => {
  const store = useSyncExternalStore(
    todoStore.subscribe,
    todoStore.getSnapShot,
  );
};
```

例如上述代码，我们会在两个组件中使用 useSyncExternalStore 方法，其中 todoStore.subscribe 的接受不同的 callback 方法，其中包含了组件组件的 fiber，那么在 store 发生改变的时候，两个 callback 都需要被执行，这样不同的组件才能够获取到正确的数据。

### useSyncExternalStore

```ts
export function useSyncExternalStore<T>(
    subscribe: (() => void) => () => void,
    getSnapshot: () => T,
    getServerSnapshot?: () => T
) {
    const value = getSnapshot();
    const [{ inst }, forceUpdate] = useState({ inst: { value, getSnapshot } });
    useLayoutEffect(() => {
        inst.value = value;
        inst.getSnapshot = getSnapshot;
        if (checkIfSnapshotChanged(inst)) {
            forceUpdate({ inst });
        }
    }, [subscribe, value, getSnapshot]);

    useEffect(() => {
        if (checkIfSnapshotChanged(inst)) {
            forceUpdate({ inst });
        }
        const handleStoreChange = () => {
            if (checkIfSnapshotChanged(inst)) {
                forceUpdate({ inst });
            }
        };
        return subscribe(handleStoreChange);
    }, [subscribe]);

    return value;
}

function checkIfSnapshotChanged<T>(inst: { value: T; getSnapshot: () => T }): boolean {
    const latestGetSnapshot = inst.getSnapshot;
    const prevValue = inst.value;
    try {
        const nextValue = latestGetSnapshot();
        return !is(prevValue, nextValue);
    } catch (error) {
        return true;
    }
}
```

- 初始化
  - 调用`getSnapshot`获取当前快照值
  - 使用`useState`创建一个状态对象，包含一个`inst`属性：
    - `inst.value`: 当前快照值
    - `inst.getSnapshot`: 当前快照的获取函数
- 同步逻辑
  - 在 DOM 更新前运行
  - 每次`value`或`getSnapshot`变化时更新`inst`
  - 如果快照值发生变化（通过`checkIfSnapshotChanged`检测），触发强制更新 `forceUpdate`
- 订阅变化
  - 在组件挂载时订阅外部存储
  - 每次存储变化时调用`handleStoreChange`检查快照值是否变化，如果变化则更新组件
    - 此时`subscribe`执行，将`handleStoreChange`作为`callback`传递给`subscribe`，然后在我们执行`callback`的时候就会检查数据是否发生变化，则触发组件重新渲染
  - 返回值是`subscribe`的清理函数，用于取消订阅
- checkIfSnapshotChanged
  - 调用`inst.getSnapshot`获取最新值。
  - 使用`is`方法比较旧值`prevValue`和新值`nextValue`

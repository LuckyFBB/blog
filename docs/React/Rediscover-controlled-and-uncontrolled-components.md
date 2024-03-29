---
title: 重新认识受控和非受控组件
group:
  title: 基础
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

## 前言

在 HTML 中，表单元素(`<input>`/`<textarea>`/`<select>`)，通常自己会维护 state，并根据用户的输入进行更新

```html
<form>
  <label>
    名字:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="提交" />
</form>
```

在这个 HTML 中，我们可以在 input 中随意的输入值，如果我们需要获取到当前 input 所输入的内容，应该怎么做呢？

<!-- more -->

## 受控与非受控组件

### 非受控组件(uncontrolled component)

使用非受控组件，不是为每个状态更新编写数据处理函数，而是将表单数据交给 DOM 节点来处理，可以使用 Ref 来获取数据

在非受控组件中，希望能够赋予表单一个初始值，但是不去控制后续的更新。可以采用`defaultValue`指定一个默认值

```js
class Form extends Component {
  handleSubmitClick = () => {
    const name = this._name.value;
    // do something with `name`
  };
  render() {
    return (
      <div>
        <input
          type="text"
          defaultValue="Bob"
          ref={(input) => (this._name = input)}
        />
        <button onClick={this.handleSubmitClick}>Sign up</button>
      </div>
    );
  }
}
```

### 受控组件(controlled component)

在 React 中，可变状态(mutable state)通常保存在组件的 state 属性中，并且只能够通过`setState` 来更新

```js
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 'shuangxu' };
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          名字:
          <input type="text" value={this.state.value} />
        </label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}
```

在上述的代码中，在 input 设置了 value 属性值，因此显示的值始终为`this.state.value`，这使得 state 成为了唯一的数据源。

```js
const handleChange = (event) => {
  this.setState({ value: event.target.value });
};

<input type="text" value={this.state.value} onChange={this.handleChange} />;
```

如果我们在上面的示例中写入`handleChange` 方法，那么每次按键都会执行该方法并且更新 React 的 state，因此表单的值将随着用户的输入而改变

React 组件控制着用户输入过程中表单发生的操作并且 state 还是唯一数据源，被 React 以这种方式控制取值的表单输入元素叫做受控组件

<div class="quote">📌 对于受控组件来说，输入的值始终由`React`的`state`驱动!!!</div>

## 受控和非受控组件边界

### 非受控组件

Input 组件只接收一个`defaultValue`默认值，调用 Input 组件的时候，只需要通过 props 传递一个`defaultValue` 即可

```js
//组件
function Input({ defaultValue }) {
  return <input defaultValue={defaultValue} />;
}

//调用
function Demo() {
  return <Input defaultValue="shuangxu" />;
}
```

### 受控组件

数值的展示和变更需要由`state`和`setState`，组件内部控制 state，并实现自己的 onChange 方法

```js
//组件
function Input() {
  const [value, setValue] = useState('shuangxu');
  return <input value={value} onChange={(e) => setValue(e.target.value)} />;
}

//调用
function Demo() {
  return <Input />;
}
```

请问这时 Input 组件是受控还是非受控？如果我们采用之前的写法更改这个组件以及其调用

```js
//组件
function Input({ defaultValue }) {
  const [value, setValue] = useState(defaultValue);
  return <input value={value} onChange={(e) => setValue(e.target.value)} />;
}

//调用
function Demo() {
  return <Input defaultValue="shuangxu" />;
}
```

此时的 Input 组件本身是一个受控组件，它是由唯一的 state 数据驱动的。但是对于 Demo 来说，我们并没有 Input 组件的一个数据变更权利，那么对于 Demo 组件来说，Input 组件就是一个非受控组件。(‼️ 以非受控组件的方式去调用受控组件是一种反模式)

如何修改当前的 Input 和 Demo 组件代码，才能够使得 Input 组件本身也是一个受控组件，并且对于 Demo 组件来说它也是受控的讷？

```js
function Input({ value, onChange }) {
  return <input value={value} onChange={onChange} />;
}

function Demo() {
  const [value, setValue] = useState('shuangxu');
  return <Input value={value} onChange={(e) => setValue(e.target.value)} />;
}
```

<div class="quote">📌 受控以及非受控组件的边界划分取决于`当前组件对于子组件值的变更是否拥有控制权`。如果拥有控制权利子组件对于当前组件来说是受控的；反之则是非受控。</div>

## 反模式-以非受控组件的方式去调用受控组件

虽然受控和非受控通常用来指向表单的 inputs，也能用来描述数据频繁更新的组件。

通过上一节受控与非受控组件的边界划分，我们可以简单的分类为：

- 如果使用 props 传入数据，有对应的数据处理方法，组件对于父级来说认为是可控的
- 数据只是保存在组件内部的 state 中，组件对于父级来说是非受控的

⁉️ 什么是派生 state
简单来说，如果一个组件的 state 中的某个数据来自外部，就将该数据称之为派生状态。
大部分使用派生 state 导致的问题，不外乎两个原因：

- 直接复制 props 到 state
- 如果 props 和 state 不一致就更新 state

### 直接复制 prop 到 state

⁉️`getDerivedStateFromProps`和`componentWillReceiveProps`的执行时期

- 在父级重新渲染时，不管 props 是否有变化，这两个生命周期都会执行
- 所以在两个方法里面直接复制 props 到 state 是不安全的，会导致 state 没有正确渲染

```js
class EmailInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email, //初始值为props中email
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ email: nextProps.email }); //更新时，重新给state赋值
  }
  handleChange = (e) => {
    his.setState({ email: e.target.value });
  };
  render() {
    const { email } = this.state;
    return <input value={email} onChange={this.handleChange} />;
  }
}
```

[点击查看示例](https://codesandbox.io/s/condescending-jasper-mdewk?file=/src/App.js)

给 input 设置 props 传来的初始值，在 input 输入时它会修改 state。但是如果父组件重新渲染时，输入框 input 的值就会丢失，变成 props 的默认值

即使我们在重置前比较`nextProps.email!==this.state.email`仍然会导致更新

针对于目前这个小 demo 来说，可以使用`shouldComponentUpdate`来比较 props 中的 email 是否修改再来决定是否需要重新渲染。但是对于实际应用来说，这种处理方式并不可行，一个组件会接收多个 prop，任何一个 prop 的改变都会导致重新渲染和不正确的状态重置。加上行内函数和对象 prop，创建一个完全可靠的`shouldComponentUpdate`会变得越来越难。`shouldComponentUpdate`这个生命周期更多是用于性能优化，而不是处理派生 state。

截止这里，讲清**为什么不能直接复制 prop 到 state**。思考另一个问题，如果只使用 props 中的 email 属性更新组件讷？

### 在 props 变化后修改 state

接着上述示例，只使用`props.email`来更新组件，这样可以防止修改 state 导致的 bug

```js
class EmailInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email, //初始值为props中email
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.email !== this.props.email) {
      this.setState({ email: nextProps.email }); //email改变时，重新给state赋值
    }
  }
  //...
}
```

通过这个改造，组件只有在 props.email 改变时才会重新给 state 赋值，那这样改造会有问题吗？

在下列场景中，对拥有两个相同 email 的账号进行切换的时，这个输入框不会重置，因为父组件传来的 prop 值没有任何变化

[点击查看示例](https://codesandbox.io/s/prop-change-lvh32?file=/src/App.js)

这个场景是构建出来的，可能设计奇怪，但是这样子的错误很常见。对于这种反模式来说，有两种方案可以解决这些问题。关键在于，**任何数据，都要保证只有一个数据来源，而且避免直接复制它。**

## 解决方案

### 完全可控的组件

从 EmailInput 组件中删除 state，直接使用 props 来获取值，将受控组件的控制权交给父组件。

```js
function EmailInput(props) {
  return <input onChange={props.onChange} value={props.email} />;
}
```

如果想要保存临时的值，需要父组件手动执行保存。

### 有 key 的非受控组件

让组件存储临时的 email state，email 的初始值仍然是通过 prop 来接受的，但是更改之后的值就和 prop 没有关系了

```js
function EmailInput(props) {
  const [email, setEmail] = useState(props.email);
  return <input value={email} onChange={(e) => setEmail(e.target.value)} />;
}
```

在之前的[切换账号的示例](https://www.notion.so/c5c2b0c6655c448aaf1686512c2f9328)中，为了在不同页面切换不同的值，可以使用`key`这个 React 特殊属性。当 key 变化时，React 会创建一个新的组件而不是简单的更新存在的组件([获取更多](https://zh-hans.reactjs.org/docs/reconciliation.html#keys))。我们经常使用在渲染动态列表时使用 key 值，这里也可以使用。

```js
<EmailInput email={account.email} key={account.id} />
```

[点击查看示例](https://codesandbox.io/s/use-key-9twve?file=/src/App.js)

每次 id 改变的时候，都会重新创建`EmailInput`，并将其状态重置为最近 email 值。

### 可选方案

1. 使用 key 属性来做，会使组件整个组件的 state 都重置。可以在`getDerivedStateFromProps`和`componentWillReceiveProps` 来观察 id 的变化，麻烦但是可行

   ```js
   class EmailInput extends Component {
     state = {
       email: this.props.email,
       prevId: this.props.id,
     };

     componentWillReceiveProps(nextProps) {
       const { prevId } = this.state;
       if (nextProps.id !== prevId) {
         this.setState({
           email: nextProps.email,
           prevId: nextProps.id,
         });
       }
     }
     // ...
   }
   ```

   [点击查看示例](https://codesandbox.io/s/use-componentwillreceiveprops-wovjf?file=/src/App.js)

2. 使用实例方法重置非受控组件

   刚刚两种方式，均是再有唯一标识值的情况下。如果在没有合适的`key`值时，也想要重新创建组件。第一种方案就是生成随机值或者递增的值当作`key`值，另一种就是使用示例方法强制重置内部状态

   ```js
   class EmailInput extends Component {
     state = {
       email: this.props.email,
     };
     resetEmailForNewUser(newEmail) {
       this.setState({ email: newEmail });
     }
     // ...
   }
   ```

   父组件使用[ref](https://zh-hans.reactjs.org/docs/glossary.html#refs)调用这个方法，[点击查看示例](https://codesandbox.io/s/use-ref-cmfw0?file=/src/App.js)

## 那我们如何选？

在我们的业务开发中，尽量选择受控组件，减少使用派生 state，过量的使用 componentWillReceiveProps 可能导致 props 判断不够完善，倒是重复渲染死循环问题。

在组件库开发中，例如 antd，将受控与非受控的调用方式都开放给用户，让用户自主选择对应的调用方式。比如 Form 组件，我们常使用 getFieldDecorator 和 initialValue 来定义表单项，但是我们根本不关心中间的输入过程，在最后提交的时候通过 getFieldsValue 或者 validateFields 拿到所有的表单值，这就是非受控的调用方式。或者是，我们在只有一个 Input 的时候，我们可以直接绑定 value 和 onChange 事件，这也就是受控的方式调用。

## 总结

在本文中，首先介绍了非受控组件和受控组件的概念。对于受控组件来说，组件控制用户输入的过程以及 state 是受控组件唯一的数据来源。

接着介绍了组件的调用问题，对于组件调用方而言，组件提供方是否为受控组件。对于调用方而言，组件受控以及非受控的边界划分取决于当前组件对于子组件值的变更是否拥有控制权。

接着介绍了以非受控组件的方式调用受控组件这种反模式用法，以及相关示例。不要直接复制 props 到 state，而是使用受控组件。对于不受控的组件，当你想在 prop 变化时重置 state 的话，可以选择以下几种方式：

- 建议: 使用`key`属性，重置内部所有的初始 state
- 选项一：仅更改某些字段，观察特殊属性的变化(具有唯一性的属性)
- 选项二：使用 ref 调用实例方法

最后总结了一下，应当如何选择受控组件还是非受控组件。

<div class="link"> 参考链接 </div>

- [React 官网——受控组件](https://zh-hans.reactjs.org/docs/forms.html#controlled-components)
- [React 官网——非受控组件](https://zh-hans.reactjs.org/docs/uncontrolled-components.html)
- [controlled vs. uncontrolled form inputs](https://goshacmd.com/controlled-vs-uncontrolled-inputs-react/)
- [Transitioning from uncontrolled inputs to controlled](https://goshacmd.com/turn-uncontrolled-into-controlled/)
- [重新认识受控非受控组件](http://muyunyun.cn/blog/56hn38ez/)
- [你可能不需要使用派生 state](https://zh-hans.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#when-to-use-derived-state)

"use strict";(self.webpackChunkblog_of_fbb=self.webpackChunkblog_of_fbb||[]).push([[7010],{97010:function(t,e,a){a.r(e),a.d(e,{texts:function(){return n}});const n=[{value:"\u5728\u4E4B\u524D\u7684\u6587\u7AE0\u4E2D\uFF0C\u6211\u4EEC\u8BB2\u8FF0\u4E86 React \u7684\u6570\u636E\u6D41\u7BA1\u7406\uFF0C\u4ECE props \u2192 context \u2192 Redux\uFF0C\u4EE5\u53CA Redux \u76F8\u5173\u7684\u4E09\u65B9\u5E93 React-Redux\u3002",paraId:0,tocIndex:0},{value:"\u90A3\u5176\u5B9E\u8BF4\u5230 React \u7684\u72B6\u6001\u7BA1\u7406\u5668\uFF0C\u9664\u4E86 Redux \u4E4B\u5916\uFF0CMobx \u4E5F\u662F\u5E94\u7528\u8F83\u591A\u7684\u7BA1\u7406\u65B9\u6848\u3002Mobx \u662F\u4E00\u4E2A\u54CD\u5E94\u5F0F\u5E93\uFF0C\u5728\u67D0\u79CD\u7A0B\u5EA6\u4E0A\u53EF\u4EE5\u770B\u4F5C\u6CA1\u6709\u6A21\u7248\u7684 Vue\uFF0C\u4E24\u8005\u7684\u539F\u7406\u5DEE\u4E0D\u591A",paraId:1,tocIndex:0},{value:"\u5148\u770B\u4E00\u4E0B Mobx \u7684\u7B80\u5355\u4F7F\u7528\uFF0C",paraId:2,tocIndex:0},{value:"\u7EBF\u4E0A\u793A\u4F8B",paraId:2,tocIndex:0},{value:`export class TodoList {
  @observable todos = [];

  @computed get getUndoCount() {
    return this.todos.filter((todo) => !todo.done).length;
  }
  @action add(task) {
    this.todos.push({ task, done: false });
  }
  @action delete(index) {
    this.todos.splice(index, 1);
  }
}
`,paraId:3,tocIndex:0},{value:"Mobx \u501F\u52A9\u4E8E\u88C5\u9970\u5668\u6765\u5B9E\u73B0\uFF0C\u662F\u7684\u4EE3\u7801\u66F4\u52A0\u7B80\u6D01\u3002\u4F7F\u7528\u4E86\u53EF\u89C2\u5BDF\u5BF9\u8C61\uFF0CMobx \u53EF\u4EE5\u76F4\u63A5\u4FEE\u6539\u72B6\u6001\uFF0C\u4E0D\u7528\u50CF Redux \u90A3\u6837\u5199 actions/reducers\u3002Redux \u662F\u9075\u5FAA setState \u7684\u6D41\u7A0B\uFF0CMobX \u5C31\u662F\u5E72\u6389\u4E86 setState \u7684\u673A\u5236",paraId:4,tocIndex:0},{value:"\u901A\u8FC7\u54CD\u5E94\u5F0F\u7F16\u7A0B\u4F7F\u5F97\u72B6\u6001\u7BA1\u7406\u53D8\u5F97\u7B80\u5355\u548C\u53EF\u6269\u5C55\u3002MobX v5 \u7248\u672C\u5229\u7528 ES6 \u7684",paraId:5,tocIndex:0},{value:"proxy",paraId:5,tocIndex:0},{value:"\u6765\u8FFD\u8E2A\u5C5E\u6027\uFF0C\u4EE5\u524D\u7684\u65E7\u7248\u672C\u901A\u8FC7",paraId:5,tocIndex:0},{value:"Object.defineProperty",paraId:5,tocIndex:0},{value:"\u5B9E\u73B0\u7684\u3002\u901A\u8FC7\u9690\u5F0F\u8BA2\u9605\uFF0C\u81EA\u52A8\u8FFD\u8E2A\u88AB\u76D1\u542C\u7684\u5BF9\u8C61\u53D8\u5316",paraId:5,tocIndex:0},{value:"Mobx \u7684\u6267\u884C\u6D41\u7A0B\uFF0C\u4E00\u5F20\u5B98\u7F51\u7ED3\u5408\u4E0A\u8FF0\u4F8B\u5B50\u7684\u56FE",paraId:6,tocIndex:0},{value:"MobX \u5C06\u5E94\u7528\u53D8\u4E3A\u54CD\u5E94\u5F0F\u53EF\u5F52\u7EB3\u4E3A\u4E0B\u9762\u4E09\u4E2A\u6B65\u9AA4",paraId:7,tocIndex:0},{value:"\u5B9A\u4E49\u72B6\u6001\u5E76\u4F7F\u5176\u53EF\u89C2\u5BDF",paraId:8,tocIndex:0},{value:"\u4F7F\u7528",paraId:9,tocIndex:0},{value:"observable",paraId:9,tocIndex:0},{value:"\u5BF9\u5B58\u50A8\u7684\u6570\u636E\u7ED3\u6784\u6210\u4E3A\u53EF\u89C2\u5BDF\u72B6\u6001",paraId:9,tocIndex:0},{value:"\u521B\u5EFA\u89C6\u56FE\u4EE5\u54CD\u5E94\u72B6\u6001\u7684\u53D8\u5316",paraId:10,tocIndex:0},{value:"\u4F7F\u7528",paraId:11,tocIndex:0},{value:"observer",paraId:11,tocIndex:0},{value:"\u6765\u76D1\u542C\u89C6\u56FE\uFF0C\u5982\u679C\u7528\u5230\u7684\u6570\u636E\u53D1\u751F\u6539\u53D8\u89C6\u56FE\u4F1A\u81EA\u52A8\u66F4\u65B0",paraId:11,tocIndex:0},{value:"\u66F4\u6539\u72B6\u6001",paraId:12,tocIndex:0},{value:"\u4F7F\u7528",paraId:13,tocIndex:0},{value:"action",paraId:13,tocIndex:0},{value:"\u6765\u5B9A\u4E49\u4FEE\u6539\u72B6\u6001\u7684\u65B9\u6CD5",paraId:13,tocIndex:0},{value:"\u7ED9\u6570\u636E\u5BF9\u8C61\u6DFB\u52A0\u53EF\u89C2\u5BDF\u7684\u529F\u80FD\uFF0C\u652F\u6301\u4EFB\u4F55\u7684\u6570\u636E\u7ED3\u6784",paraId:14,tocIndex:2},{value:`const todos = observable([
  {
    task: 'Learn Mobx',
    done: false,
  },
]);

// \u66F4\u591A\u7684\u91C7\u7528\u88C5\u9970\u5668\u7684\u5199\u6CD5
class Store {
  @observable todos = [
    {
      task: 'Learn Mobx',
      done: false,
    },
  ];
}
`,paraId:15,tocIndex:2},{value:"\u5728 Redux \u4E2D\uFF0C\u6211\u4EEC\u9700\u8981\u8BA1\u7B97\u5DF2\u7ECF completeTodo \u548C unCompleteTodo\uFF0C\u6211\u4EEC\u53EF\u4EE5\u91C7\u7528\uFF1A\u5728 mapStateToProps \u4E2D\uFF0C\u901A\u8FC7 allTodos \u8FC7\u6EE4\u51FA\u5BF9\u5E94\u7684\u503C\uFF0C",paraId:16,tocIndex:3},{value:"\u7EBF\u4E0A\u793A\u4F8B",paraId:16,tocIndex:3},{value:`const mapStateToProps = (state) => {
  const { visibilityFilter } = state;
  const todos = getTodosByVisibilityFilter(state, visibilityFilter);
  return { todos };
};
`,paraId:17,tocIndex:3},{value:"\u5728 Mobx \u4E2D\u53EF\u4EE5\u5B9A\u4E49\u76F8\u5173\u6570\u636E\u53D1\u751F\u53D8\u5316\u65F6\u81EA\u52A8\u66F4\u65B0\u7684\u503C\uFF0C\u901A\u8FC7",paraId:18,tocIndex:3},{value:"@computed",paraId:18,tocIndex:3},{value:"\u8C03\u7528",paraId:18,tocIndex:3},{value:"getter",paraId:18,tocIndex:3},{value:"/",paraId:18,tocIndex:3},{value:"setter",paraId:18,tocIndex:3},{value:"\u51FD\u6570\u8FDB\u884C\u53D8\u66F4",paraId:18,tocIndex:3},{value:"\u4E00\u65E6 todos \u7684\u53D1\u751F\u6539\u53D8\uFF0CgetUndoCount \u5C31\u4F1A\u81EA\u52A8\u8BA1\u7B97",paraId:19,tocIndex:3},{value:`export class TodoList {
  @observable todos = [];

  @computed get getUndo() {
    return this.todos.filter((todo) => !todo.done);
  }

  @computed get getCompleteTodo() {
    return this.todos.filter((todo) => todo.done);
  }
}
`,paraId:20,tocIndex:3},{value:"\u52A8\u4F5C\u662F\u4EFB\u4F55\u7528\u6765\u4FEE\u6539\u72B6\u6001\u7684\u4E1C\u897F\u3002MobX \u4E2D\u7684 action \u4E0D\u50CF redux \u4E2D\u662F\u5FC5\u9700\u7684\uFF0C\u628A\u4E00\u4E9B\u4FEE\u6539 state \u7684\u64CD\u4F5C\u90FD\u89C4\u8303\u4F7F\u7528 action \u505A\u6807\u6CE8\u3002",paraId:21,tocIndex:4},{value:"\u5728 MobX \u4E2D\u53EF\u4EE5\u968F\u610F\u66F4\u6539",paraId:22,tocIndex:4},{value:"todos.push({ title:'coding', done: false })",paraId:22,tocIndex:4},{value:"\uFF0Cstate \u4E5F\u662F\u53EF\u4EE5\u6709\u4F5C\u7528\u7684\uFF0C\u4F46\u662F\u8FD9\u6837\u6742\u4E71\u65E0\u7AE0\u4E0D\u597D\u5B9A\u4F4D\u662F\u54EA\u91CC\u89E6\u53D1\u4E86 state \u7684\u53D8\u5316\uFF0C\u5EFA\u8BAE\u5728\u4EFB\u4F55\u66F4\u65B0",paraId:22,tocIndex:4},{value:"observable",paraId:22,tocIndex:4},{value:"\u6216\u8005\u6709\u526F\u4F5C\u7528\u7684\u51FD\u6570\u4E0A\u4F7F\u7528 actions\u3002",paraId:22,tocIndex:4},{value:"\u5728\u4E25\u683C\u6A21\u5F0F",paraId:23,tocIndex:4},{value:"useStrict(true)",paraId:23,tocIndex:4},{value:"\u4E0B\uFF0C\u5F3A\u5236\u4F7F\u7528 action",paraId:23,tocIndex:4},{value:`// \u975Eaction\u4F7F\u7528
<button
    onClick={() => todoList.todos.push({ task: this.inputRef.value, done: false })}
>
    Add New Todo
</button>

// action\u4F7F\u7528
<button
    onClick={() => todoList.add(this.inputRef.value)}
>
    Add New Todo
</button>

class TodoList {
    @action add(task) {
        this.todos.push({ task, done: false });
    }
}
`,paraId:24,tocIndex:4},{value:"\u8BA1\u7B97\u503C computed \u662F\u81EA\u52A8\u54CD\u5E94\u72B6\u6001\u53D8\u5316\u7684\u503C\u3002\u53CD\u5E94\u662F\u81EA\u52A8\u54CD\u5E94\u72B6\u6001\u53D8\u5316\u662F\u7684\u526F\u4F5C\u7528\uFF0C\u53CD\u5E94\u53EF\u4EE5\u786E\u4FDD\u76F8\u5173\u72B6\u6001\u53D8\u5316\u65F6\u6307\u5B9A\u7684\u526F\u4F5C\u7528\u6267\u884C\u3002",paraId:25,tocIndex:5},{value:"autorun",paraId:26,tocIndex:5},{value:"autorun",paraId:27,tocIndex:5},{value:"\u8D1F\u8D23\u8FD0\u884C\u6240\u63D0\u4F9B\u7684",paraId:27,tocIndex:5},{value:"sideEffect",paraId:27,tocIndex:5},{value:"\u5E76\u8FFD\u8E2A\u5728",paraId:27,tocIndex:5},{value:"sideEffect",paraId:27,tocIndex:5},{value:"\u8FD0\u884C\u671F\u95F4\u8BBF\u95EE\u8FC7\u7684",paraId:27,tocIndex:5},{value:"observable",paraId:27,tocIndex:5},{value:"\u7684\u72B6\u6001",paraId:27,tocIndex:5},{value:"\u63A5\u53D7\u4E00\u4E2A\u51FD\u6570",paraId:28,tocIndex:5},{value:"sideEffect",paraId:28,tocIndex:5},{value:"\uFF0C\u5F53\u8FD9\u4E2A\u51FD\u6570\u4E2D\u4F9D\u8D56\u7684\u53EF\u89C2\u5BDF\u5C5E\u6027\u53D1\u751F\u53D8\u5316\u7684\u65F6\u5019\uFF0C",paraId:28,tocIndex:5},{value:"autorun",paraId:28,tocIndex:5},{value:"\u91CC\u9762\u7684\u51FD\u6570\u5C31\u4F1A\u88AB\u89E6\u53D1\u3002\u9664\u6B64\u4E4B\u5916\uFF0C",paraId:28,tocIndex:5},{value:"autorun",paraId:28,tocIndex:5},{value:"\u91CC\u9762\u7684\u51FD\u6570\u5728\u7B2C\u4E00\u6B21\u4F1A\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u3002",paraId:28,tocIndex:5},{value:`autorun(() => {
  console.log('Current name : ' + this.props.myName.name);
});

// \u8FFD\u8E2A\u51FD\u6570\u5916\u7684\u95F4\u63A5\u5F15\u7528\u4E0D\u4F1A\u751F\u6548
const name = this.props.myName.name;
autorun(() => {
  console.log('Current name : ' + name);
});
`,paraId:29,tocIndex:5},{value:"reaction",paraId:30,tocIndex:5},{value:"reaction",paraId:31,tocIndex:5},{value:"\u662F",paraId:31,tocIndex:5},{value:"autorun",paraId:31,tocIndex:5},{value:"\u7684\u53D8\u79CD\uFF0C\u5728\u5982\u4F55\u8FFD\u8E2A",paraId:31,tocIndex:5},{value:"observable",paraId:31,tocIndex:5},{value:"\u65B9\u9762\u7ED9\u4E88\u4E86\u66F4\u7EC6\u7C92\u5EA6\u7684\u63A7\u5236\u3002 \u5B83\u63A5\u6536\u4E24\u4E2A\u51FD\u6570\uFF0C\u7B2C\u4E00\u4E2A\u662F\u8FFD\u8E2A\u5E76\u8FD4\u56DE\u6570\u636E\uFF0C\u8BE5\u6570\u636E\u7528\u4F5C\u7B2C\u4E8C\u4E2A\u51FD\u6570\uFF0C\u4E5F\u5C31\u662F\u526F\u4F5C\u7528\u7684\u8F93\u5165\u3002",paraId:31,tocIndex:5},{value:"autorun \u4F1A\u7ACB\u5373\u6267\u884C\u4E00\u6B21\uFF0C\u4F46\u662F reaction \u4E0D\u4F1A",paraId:32,tocIndex:5},{value:`reaction(
  () => this.props.todoList.getUndoCount,
  (data) => {
    console.log('Current count : ', data);
  },
);
`,paraId:33,tocIndex:5},{value:"\u4F7F\u7528 Redux \u65F6\uFF0C\u6211\u4EEC\u4F1A\u5F15\u5165 React-Redux \u7684 connect \u51FD\u6570\uFF0C\u4F7F\u5F97\u6211\u4EEC\u7684\u7EC4\u4EF6\u80FD\u591F\u901A\u8FC7 props \u83B7\u53D6\u5230 store \u4E2D\u7684\u6570\u636E",paraId:34,tocIndex:6},{value:"\u5728 Mobx \u4E2D\u4E5F\u662F\u4E00\u6837\u7684\u9053\u7406\uFF0C\u6211\u4EEC\u9700\u8981\u5F15\u5165 observer \u5C06\u7EC4\u4EF6\u53D8\u4E3A\u54CD\u5E94\u5F0F\u7EC4\u4EF6",paraId:35,tocIndex:6},{value:"\u5305\u88F9 React \u7EC4\u4EF6\u7684\u9AD8\u9636\u7EC4\u4EF6\uFF0C\u5728\u7EC4\u4EF6\u7684 render \u51FD\u6570\u4E2D\u4EFB\u4F55\u4F7F\u7528\u7684",paraId:36,tocIndex:6},{value:"observable",paraId:36,tocIndex:6},{value:"\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u7EC4\u4EF6\u90FD\u4F1A\u8C03\u7528 render \u91CD\u65B0\u6E32\u67D3\uFF0C\u66F4\u65B0 UI",paraId:36,tocIndex:6},{value:"\u26A0\uFE0F \u4E0D\u8981\u653E\u5728\u9876\u5C42 Page\uFF0C\u5982\u679C\u4E00\u4E2A state \u6539\u53D8\uFF0C\u6574\u4E2A Page \u90FD\u4F1A render\uFF0C\u6240\u4EE5 observer \u5C3D\u91CF\u53D6\u5305\u88F9\u5C0F\u7EC4\u4EF6\uFF0C\u7EC4\u4EF6\u8D8A\u5C0F\u91CD\u65B0\u6E32\u67D3\u7684\u53D8\u5316\u5C31\u8D8A\u5C0F",paraId:37},{value:`@observer
export default class TodoListView extends Component {
  render() {
    const { todoList } = this.props;
    return (
      <div className="todoView">
        <div className="todoView__list">
          {todoList.todos.map((todo, index) => (
            <TodoItem
              key={index}
              todo={todo}
              onDelete={() => todoList.delete(index)}
            />
          ))}
        </div>
      </div>
    );
  }
}
`,paraId:38},{value:"\u524D\u6587\u4E2D\u63D0\u5230 Mobx \u5B9E\u73B0\u54CD\u5E94\u5F0F\u6570\u636E\uFF0C\u91C7\u7528\u4E86",paraId:39,tocIndex:7},{value:"Object.defineProperty",paraId:39,tocIndex:7},{value:"\u6216\u8005",paraId:39,tocIndex:7},{value:"Proxy",paraId:39,tocIndex:7},{value:"\u4E0A\u9762\u8BB2\u8FF0\u5230\u4F7F\u7528 autorun \u4F1A\u5728\u7B2C\u4E00\u6B21\u6267\u884C\u5E76\u4E14\u4F9D\u8D56\u7684\u5C5E\u6027\u53D8\u5316\u65F6\u4E5F\u4F1A\u6267\u884C\u3002",paraId:40,tocIndex:7},{value:`const user = observable({ name: 'FBB', age: 24 });
autorun(() => {
  console.log(user.name);
});
`,paraId:41,tocIndex:7},{value:"\u5F53\u6211\u4EEC\u4F7F\u7528 observable \u521B\u5EFA\u4E86\u4E00\u4E2A\u53EF\u89C2\u5BDF\u5BF9\u8C61",paraId:42,tocIndex:7},{value:"user",paraId:42,tocIndex:7},{value:"\uFF0Cautorun \u5C31\u4F1A\u53BB\u76D1\u542C",paraId:42,tocIndex:7},{value:"user.name",paraId:42,tocIndex:7},{value:"\u662F\u5426\u53D1\u751F\u4E86\u6539\u53D8\u3002\u7B49\u4E8E",paraId:42,tocIndex:7},{value:"user.name",paraId:42,tocIndex:7},{value:"\u88AB autorun \u76D1\u63A7\u4E86\uFF0C\u4E00\u65E6\u6709\u4EFB\u4F55\u53D8\u5316\u5C31\u8981\u53BB\u901A\u77E5\u5B83",paraId:42,tocIndex:7},{value:`user.name.watchers.push(watch);
// \u4E00\u65E6user\u7684\u6570\u636E\u53D1\u751F\u4E86\u6539\u53D8\u5C31\u8981\u53BB\u901A\u77E5\u89C2\u5BDF\u8005
user.name.watchers.forEach((watch) => watch());
`,paraId:43,tocIndex:7},{value:"\u88C5\u9970\u5668\u4E00\u822C\u63A5\u53D7\u4E09\u4E2A\u53C2\u6570: \u76EE\u6807\u5BF9\u8C61\u3001\u5C5E\u6027\u3001\u5C5E\u6027\u63CF\u8FF0\u7B26",paraId:44,tocIndex:8},{value:"\u901A\u8FC7\u4E0A\u9762\u7684\u5206\u6790\uFF0C\u901A\u8FC7 observable \u521B\u5EFA\u7684\u5BF9\u8C61\u90FD\u662F\u53EF\u89C2\u5BDF\u7684\uFF0C\u4E5F\u5C31\u662F\u521B\u5EFA\u5BF9\u8C61\u7684\u6BCF\u4E2A\u5C5E\u6027\u90FD\u9700\u8981\u88AB\u89C2\u5BDF",paraId:45,tocIndex:8},{value:"\u6BCF\u4E00\u4E2A\u88AB\u89C2\u5BDF\u5BF9\u8C61\u90FD\u9700\u8981\u6709\u81EA\u5DF1\u7684\u8BA2\u9605\u65B9\u6CD5\u6570\u7EC4",paraId:46,tocIndex:8},{value:`const counter = observable({ count: 0 });
const user = observable({ name: 'FBB', age: 20 });
autorun(function func1() {
  console.log(\`\${user.name} and \${counter.count}\`);
});
autorun(function func2() {
  console.log(user.name);
});
`,paraId:47,tocIndex:8},{value:"\u5BF9\u4E8E\u4E0A\u8FF0\u4EE3\u7801\u6765\u8BF4\uFF0Ccounter.count \u7684 watchers \u53EA\u6709 func1\uFF0Cuser.name \u7684 watchers \u5219\u6709 func1/func2",paraId:48,tocIndex:8},{value:"\u5B9E\u73B0\u4E00\u4E0B\u89C2\u5BDF\u8005\u7C7B Watcher\uFF0C\u501F\u52A9 shortid \u6765\u533A\u5206\u4E0D\u540C\u7684\u89C2\u5BDF\u8005\u5B9E\u4F8B",paraId:49,tocIndex:8},{value:`class Watcher {
  id: string;
  value: any;
  constructor(v: any, property: string) {
    this.id = \`ob_\${property}_\${shortid()}\`;
    this.value = v;
  }
  // \u8C03\u7528get\u65F6\uFF0C\u6536\u96C6\u6240\u6709\u89C2\u5BDF\u8005
  collect() {
    dependenceManager.collect(this.id);
    return this.value;
  }
  // \u8C03\u7528set\u65F6\uFF0C\u901A\u77E5\u6240\u6709\u89C2\u5BDF\u8005
  notify(v: any) {
    this.value = v;
    dependenceManager.notify(this.id);
  }
}
`,paraId:50,tocIndex:8},{value:"\u5B9E\u73B0\u4E00\u4E2A\u7B80\u5355\u7684\u88C5\u9970\u5668\uFF0C\u9700\u8981\u62E6\u622A\u6211\u4EEC\u5C5E\u6027\u7684 get/set \u65B9\u6CD5\uFF0C\u5E76\u4E14\u4F7F\u7528 Object.defineProperty \u8FDB\u884C\u6DF1\u5EA6\u62E6\u622A",paraId:51,tocIndex:8},{value:`export function observable(
  target: any,
  name: any,
  descriptor: { initializer: () => any },
) {
  const v = descriptor.initializer();
  createDeepWatcher(v);
  const watcher = new Watcher(v, name);
  return {
    enumerable: true,
    configurable: true,
    get: function () {
      return watcher.collect();
    },
    set: function (v: any) {
      return watcher.notify(v);
    },
  };
}

function createDeepWatcher(target: any) {
  if (typeof target === 'object') {
    for (let property in target) {
      if (target.hasOwnProperty(property)) {
        const watcher = new Watcher(target[property], property);
        Object.defineProperty(target, property, {
          get() {
            return watcher.collect();
          },
          set(value) {
            return watcher.notify(value);
          },
        });
        createDeepWatcher(target[property]);
      }
    }
  }
}
`,paraId:52,tocIndex:8},{value:"\u5728\u4E0A\u9762 Watcher \u7C7B\u4E2D\u7684",paraId:53,tocIndex:8},{value:"get/set",paraId:53,tocIndex:8},{value:"\u4E2D\u8C03\u7528\u4E86 dependenceManager \u7684\u65B9\u6CD5\u8FD8\u672A\u5199\u5B8C\u3002\u5728\u8C03\u7528\u5C5E\u6027\u7684",paraId:53,tocIndex:8},{value:"get",paraId:53,tocIndex:8},{value:"\u65B9\u6CD5\u65F6\uFF0C\u4F1A\u5C06\u51FD\u6570\u6536\u96C6\u5230\u5F53\u524D id \u7684 watchers \u4E2D\uFF0C\u8C03\u7528\u5C5E\u6027\u7684",paraId:53,tocIndex:8},{value:"set",paraId:53,tocIndex:8},{value:"\u65B9\u6CD5\u5219\u662F\u53BB\u901A\u77E5\u6240\u6709\u7684 watchers\uFF0C\u89E6\u53D1\u5BF9\u5E94\u6536\u96C6\u51FD\u6570",paraId:53,tocIndex:8},{value:"\u90A3\u8FD9\u8FD9\u91CC\u5176\u5B9E\u6211\u4EEC\u8FD8\u9700\u8981\u501F\u52A9\u4E00\u4E2A\u7C7B\uFF0C\u4E5F\u5C31\u662F\u4F9D\u8D56\u6536\u96C6\u7C7B",paraId:54,tocIndex:8},{value:"DependenceManager",paraId:54,tocIndex:8},{value:"\uFF0C\u9A6C\u4E0A\u5C31\u4F1A\u5B9E\u73B0",paraId:54,tocIndex:8},{value:"\u524D\u9762\u8BF4\u5230 autorun \u4F1A\u7ACB\u5373\u6267\u884C\u4E00\u6B21\uFF0C\u5E76\u4E14\u4F1A\u5C06\u51FD\u6570\u6536\u96C6\u8D77\u6765\uFF0C\u5B58\u50A8\u5230\u5BF9\u5E94\u7684",paraId:55,tocIndex:9},{value:"observable.id",paraId:55,tocIndex:9},{value:"\u7684 watchers \u4E2D\u3002autorun \u5B9E\u73B0\u4E86\u6536\u96C6\u4F9D\u8D56\uFF0C\u6267\u884C\u5BF9\u5E94\u51FD\u6570\u3002\u518D\u6267\u884C\u5BF9\u5E94\u51FD\u6570\u7684\u65F6\u5019\uFF0C\u4F1A\u8C03\u7528\u5230\u5BF9\u5E94",paraId:55,tocIndex:9},{value:"observable",paraId:55,tocIndex:9},{value:"\u5BF9\u8C61\u7684",paraId:55,tocIndex:9},{value:"get",paraId:55,tocIndex:9},{value:"\u65B9\u6CD5\uFF0C\u6765\u6536\u96C6\u4F9D\u8D56",paraId:55,tocIndex:9},{value:`export default function autorun(handler) {
  dependenceManager.beginCollect(handler);
  handler();
  dependenceManager.endCollect();
}
`,paraId:56,tocIndex:9},{value:"\u5B9E\u73B0",paraId:57,tocIndex:9},{value:"DependenceManager",paraId:57,tocIndex:9},{value:"\u7C7B:",paraId:57,tocIndex:9},{value:"beginCollect: \u6807\u8BC6\u5F00\u59CB\u6536\u96C6\u4F9D\u8D56\uFF0C\u5C06\u4F9D\u8D56\u51FD\u6570\u5B58\u5230\u4E00\u4E2A\u7C7B\u5168\u5C40\u53D8\u91CF\u4E2D",paraId:58,tocIndex:9},{value:"collect(id): \u8C03\u7528",paraId:58,tocIndex:9},{value:"get",paraId:58,tocIndex:9},{value:"\u65B9\u6CD5\u65F6\uFF0C\u5C06\u4F9D\u8D56\u51FD\u6570\u653E\u5230\u5B58\u5165\u5230\u5BF9\u5E94 id \u7684\u4F9D\u8D56\u6570\u7EC4\u4E2D",paraId:58,tocIndex:9},{value:"notify: \u5F53\u6267\u884C",paraId:58,tocIndex:9},{value:"set",paraId:58,tocIndex:9},{value:"\u7684\u65F6\u5019\uFF0C\u6839\u636E id \u6765\u6267\u884C\u6570\u7EC4\u4E2D\u7684\u51FD\u6570\u4F9D\u8D56",paraId:58,tocIndex:9},{value:"endCollect: \u6E05\u9664\u521A\u5F00\u59CB\u7684\u51FD\u6570\u4F9D\u8D56\uFF0C\u4EE5\u4FBF\u4E8E\u4E0B\u4E00\u6B21\u6536\u96C6",paraId:58,tocIndex:9},{value:`class DependenceManager {
  _store: any = {};
  static Dep: any;
  beginCollect(handler: () => void) {
    DependenceManager.Dep = handler;
  }
  collect(id: string) {
    if (DependenceManager.Dep) {
      this._store[id] = this._store[id] || {};
      this._store[id].watchers = this._store[id].watchers || [];
      if (!this._store[id].watchers.includes(DependenceManager.Dep))
        this._store[id].watchers.push(DependenceManager.Dep);
    }
  }
  notify(id: string) {
    const store = this._store[id];
    if (store && store.watchers) {
      store.watchers.forEach((watch: () => void) => {
        watch.call(this);
      });
    }
  }
  endCollect() {
    DependenceManager.Dep = null;
  }
}
`,paraId:59,tocIndex:9},{value:"\u4E00\u4E2A\u7B80\u5355\u7684 Mobx \u6846\u67B6\u90FD\u642D\u5EFA\u597D\u4E86~",paraId:60,tocIndex:9},{value:"computed \u7684\u4E09\u4E2A\u7279\u70B9:",paraId:61,tocIndex:10},{value:"computed \u65B9\u6CD5\u662F\u4E00\u4E2A get \u65B9\u6CD5",paraId:62,tocIndex:10},{value:"computed \u4F1A\u6839\u636E\u4F9D\u8D56\u7684\u5C5E\u6027\u91CD\u65B0\u8BA1\u7B97\u503C",paraId:62,tocIndex:10},{value:"\u4F9D\u8D56 computed \u7684\u51FD\u6570\u4E5F\u4F1A\u88AB\u91CD\u65B0\u6267\u884C",paraId:62,tocIndex:10},{value:"\u53D1\u73B0 computed \u7684\u5B9E\u73B0\u5927\u81F4\u548C observable \u76F8\u4F3C\uFF0C\u4ECE\u4EE5\u4E0A\u7279\u70B9\u53EF\u4EE5\u63A8\u65AD\u51FA computed \u9700\u8981\u4E24\u6B21\u6536\u96C6\u4F9D\u8D56\uFF0C\u4E00\u6B21\u662F\u6536\u96C6 computed \u6240\u4F9D\u8D56\u7684\u5C5E\u6027\uFF0C\u4E00\u6B21\u662F\u4F9D\u8D56 computed \u7684\u51FD\u6570",paraId:63,tocIndex:10},{value:"\u9996\u5148\u5B9A\u4E49\u4E00\u4E2A computed \u65B9\u6CD5\uFF0C\u662F\u4E00\u4E2A\u88C5\u9970\u5668",paraId:64,tocIndex:10},{value:`export function computed(target: any, name: any, descriptor: any) {
  const getter = descriptor.get; // get \u51FD\u6570
  const _computed = new ComputedWatcher(target, getter);

  return {
    enumerable: true,
    configurable: true,
    get: function () {
      _computed.target = this;
      return _computed.get();
    },
  };
}
`,paraId:65,tocIndex:10},{value:"\u5B9E\u73B0 ComputedWatcher \u7C7B\uFF0C\u548C Watcher \u7C7B\u5DEE\u4E0D\u591A\u3002\u5728\u6267\u884C get \u65B9\u6CD5\u7684\u65F6\u5019\uFF0C\u6211\u4EEC\u548C\u4E4B\u524D\u4E00\u6837\uFF0C\u53BB\u6536\u96C6\u4E00\u4E0B\u4F9D\u8D56 computed \u7684\u51FD\u6570\uFF0C\u4E30\u5BCC get \u65B9\u6CD5",paraId:66,tocIndex:10},{value:`class ComputedWatcher {
  // \u6807\u8BC6\u662F\u5426\u7ED1\u5B9A\u8FC7recomputed\u4F9D\u8D56\uFF0C\u53EA\u9700\u8981\u7ED1\u5B9A\u4E00\u6B21
  hasBindAutoReCompute: boolean | undefined;
  value: any;
  // \u7ED1\u5B9Arecompute \u548C \u5185\u90E8\u6D89\u53CA\u5230\u7684\u89C2\u5BDF\u503C\u7684\u5173\u7CFB
  _bindAutoReCompute() {
    if (!this.hasBindAutoReCompute) {
      this.hasBindAutoReCompute = true;
      dependenceManager.beginCollect(this._reComputed, this);
      this._reComputed();
      dependenceManager.endCollect();
    }
  }
  // \u4F9D\u8D56\u5C5E\u6027\u53D8\u5316\u65F6\u8C03\u7528\u7684\u51FD\u6570
  _reComputed() {
    this.value = this.getter.call(this.target);
    dependenceManager.notify(this.id);
  }
  // \u63D0\u4F9B\u7ED9\u5916\u90E8\u8C03\u7528\u65F6\u6536\u96C6\u4F9D\u8D56\u4F7F\u7528
  get() {
    this._bindAutoReCompute();
    dependenceManager.collect(this.id);
    return this.value;
  }
}
`,paraId:67,tocIndex:10},{value:"observer \u76F8\u5BF9\u5B9E\u73B0\u4F1A\u7B80\u5355\u4E00\u70B9\uFF0C\u5176\u5B9E\u662F\u5229\u7528 React \u7684 render \u51FD\u6570\u5BF9\u4F9D\u8D56\u8FDB\u884C\u6536\u96C6\uFF0C\u6211\u4EEC\u91C7\u7528\u5728 componnetDidMount \u4E2D\u8C03\u7528 autorun \u65B9\u6CD5",paraId:68,tocIndex:11},{value:`export function observer(target: any) {
  const componentDidMount = target.prototype.componentDidMount;
  target.prototype.componentDidMount = function () {
    componentDidMount && componentDidMount.call(this);
    autorun(() => {
      this.render();
      this.forceUpdate();
    });
  };
}
`,paraId:69,tocIndex:11},{value:"\u81F3\u6B64\u4E00\u4E2A\u7B80\u5355\u7684 Mobx \u5C31\u5B9E\u73B0\u4E86\uFF0C",paraId:70,tocIndex:11},{value:"\u7EBF\u4E0A\u4EE3\u7801\u5730\u5740",paraId:70,tocIndex:11},{value:"\u6587\u7AE0\u4E2D\u4F7F\u7528\u7684 Object.defineProperty \u5B9E\u73B0\uFF0CProxy \u5B9E\u73B0\u5DEE\u4E0D\u591A\uFF0C",paraId:71,tocIndex:11},{value:"\u7EBF\u4E0A\u4EE3\u7801\u5730\u5740",paraId:71,tocIndex:11},{value:"\u6570\u636E\u6D41",paraId:72,tocIndex:12},{value:"Mobx \u548C Redux \u90FD\u662F\u5355\u5411\u6570\u636E\u6D41\uFF0C\u90FD\u901A\u8FC7 action \u89E6\u53D1\u5168\u5C40 state \u66F4\u65B0\uFF0C\u518D\u901A\u77E5\u89C6\u56FE",paraId:73,tocIndex:12},{value:"Redux \u7684\u6570\u636E\u6D41",paraId:74,tocIndex:12},{value:"Mobx \u7684\u6570\u636E\u6D41",paraId:75,tocIndex:12},{value:"\u4FEE\u6539\u6570\u636E\u7684\u65B9\u5F0F",paraId:76,tocIndex:12},{value:"\u4ED6\u4EEC\u4FEE\u6539\u72B6\u6001\u7684\u65B9\u5F0F\u662F\u4E0D\u540C\u7684\uFF0CRedux \u6BCF\u4E00\u6B21\u90FD\u8FD4\u56DE\u4E86\u65B0\u7684 state\u3002Mobx \u6BCF\u6B21\u4FEE\u6539\u7684\u90FD\u662F\u540C\u4E00\u4E2A\u72B6\u6001\u5BF9\u8C61\uFF0C\u57FA\u4E8E\u54CD\u5E94\u5F0F\u539F\u7406\uFF0C",paraId:77,tocIndex:12},{value:"get",paraId:77,tocIndex:12},{value:"\u65F6\u6536\u96C6\u4F9D\u8D56\uFF0C",paraId:77,tocIndex:12},{value:"set",paraId:77,tocIndex:12},{value:"\u65F6\u901A\u77E5\u6240\u6709\u7684\u4F9D\u8D56",paraId:77,tocIndex:12},{value:"\u5F53 state \u53D1\u751F\u6539\u53D8\u65F6\uFF0CRedux \u4F1A\u901A\u77E5\u6240\u6709\u4F7F\u7528 connect \u5305\u88F9\u7684\u7EC4\u4EF6\uFF1BMobx \u7531\u4E8E\u6536\u96C6\u4E86\u6BCF\u4E2A\u5C5E\u6027\u7684\u4F9D\u8D56\uFF0C\u80FD\u591F\u7CBE\u51C6\u901A\u77E5",paraId:77,tocIndex:12},{value:"\u5F53\u6211\u4EEC\u4F7F\u7528 Redux \u6765\u4FEE\u6539\u6570\u636E\u65F6\u91C7\u7528\u7684\u662F reducer \u51FD\u6570\uFF0C\u51FD\u6570\u5F0F\u7F16\u7A0B\u601D\u60F3\uFF1BMobx \u4F7F\u7528\u7684\u5219\u662F\u9762\u5411\u5BF9\u8C61\u4EE3\u7406\u7684\u65B9\u5F0F",paraId:77,tocIndex:12},{value:"Store \u7684\u533A\u522B",paraId:78,tocIndex:12},{value:"Redux \u662F\u5355\u4E00\u6570\u636E\u6E90\uFF0C\u91C7\u7528\u96C6\u4E2D\u7BA1\u7406\u7684\u6A21\u5F0F\uFF0C\u5E76\u4E14\u6570\u636E\u5747\u662F\u666E\u901A\u7684 JavaScript \u5BF9\u8C61\u3002state \u6570\u636E\u53EF\u8BFB\u4E0D\u53EF\u5199\uFF0C\u53EA\u6709\u901A\u8FC7 reducer \u6765\u6539\u53D8",paraId:79,tocIndex:12},{value:"Mobx \u662F\u591A\u6570\u636E\u6E90\u6A21\u5F0F\uFF0C\u5E76\u4E14\u6570\u636E\u662F\u7ECF\u8FC7",paraId:79,tocIndex:12},{value:"observable",paraId:79,tocIndex:12},{value:"\u5305\u88F9\u7684 JavaScript \u5BF9\u8C61\u3002state \u65E2\u53EF\u8BFB\u53C8\u53EF\u5199\uFF0C\u5728\u975E\u4E25\u683C\u6A21\u5F0F\u4E0B\uFF0Caction \u4E0D\u662F\u5FC5\u987B\u7684\uFF0C\u53EF\u4EE5\u76F4\u63A5\u8D4B\u503C",paraId:79,tocIndex:12},{value:"\u672C\u6587\u4ECE Mobx \u7684\u7B80\u5355\u793A\u4F8B\u5F00\u59CB\uFF0C\u8BB2\u8FF0\u4E86\u4E00\u4E0B Mobx \u7684\u6267\u884C\u6D41\u7A0B\uFF0C\u5F15\u5165\u4E86\u5BF9\u5E94\u7684\u6838\u5FC3\u6982\u5FF5\uFF0C\u7136\u540E\u4ECE\u96F6\u5F00\u59CB\u5B9E\u73B0\u4E86\u4E00\u4E2A\u7B80\u7248\u7684 Mobx\uFF0C\u6700\u540E\u5C06 Mobx \u548C Redux \u505A\u4E86\u4E00\u4E2A\u7B80\u5355\u7684\u5BF9\u6BD4",paraId:80,tocIndex:13},{value:"\u4ECE\u96F6\u5B9E\u73B0 Mobx\uFF1A\u6DF1\u5165\u7406\u89E3 Mobx \u539F\u7406",paraId:81,tocIndex:14},{value:"MobX \u5B9E\u73B0\u539F\u7406\u63ED\u79D8",paraId:81,tocIndex:14},{value:"\u5F15\u5165 Mobx",paraId:81,tocIndex:14},{value:"\u5B9E\u73B0\u4E00\u4E2A\u7B80\u5355\u7684 MobX",paraId:81,tocIndex:14},{value:"\u7528\u6545\u4E8B\u89E3\u8BFB MobX \u6E90\u7801",paraId:81,tocIndex:14}]}}]);

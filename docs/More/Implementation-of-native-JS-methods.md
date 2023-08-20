---
title: 原生 JS 方法的实现
group:
  title: 基础
  order: 4
order: 0
---

总结一下一些操作符或者方法的原生实现。持续更新

## new-操作符

创建某个实例，必须使用 new 操作符。这种方式调用构造函数会经历以下 4 个步骤:

- 创造一个新的对象
- 将构造函数的作用域赋值给新对象(this 指向该对象)
- 执行构造函数中的代码(为新对象添加属性)
- 返回新对象

```js
function myNew(fun) {
  var obj = Object.create(fun.prototype);
  //var obj = {}
  //obj.__proto__ = fun.prototype  与上述方法实现效果相同
  var args = [...arguments].slice(1);
  var res = fun.call(obj, ...args);
  return typeof res === 'object' ? res : obj;
}
```

## instanceof 操作符

instanceof 可以正确的判断对象的类型，因为内部的机制是通过判断对象的原型链中是不是能够找到类型的 prototype。

```js
function myInstanceof(left, right) {
  if (typeof left !== 'object' || typeof left !== 'function') {
    return false;
  }
  let prototype = right.prototype;
  left = left.__proto__;
  while (true) {
    if (left === null) {
      return false;
    }
    if (prototype === left) {
      return true;
    }
    left = left.__proto__;
  }
}
```

## call / apply / bind 的实现

```js
call  func.call(obj, args1, args2); //传入的是参数列表
apply func.apply(obj, [args1, args2]); //传入的是数组参数    记法：apply是a开头为array
bind  func.bind(obj, args1, args2); //返回的是函数，前两者为立即执行
```

### 中心思想

```js
// 改变this的指向，让bar()函数的this指向foo对象
var foo = {
  value: 100
}
function bar() {
  console.log(this.value);
}
bar.apply(foo);

//等同与将bar函数作为foo对象属性进行调用，即为下列方式
var foo = {
  value: 100
  bar: function() {
    console.log(this.value);
  }
}

/*
 * 因此我们总结模拟思路如下：
 * 1.将执行的函数作为对象属性
 * 2.执行函数
 * 3.将函数从对象中删除
*/
```

### call

```js
Function.prototype.myCall = function (context) {
  //使用该方式在原型链上拓展方法，以便所有的函数都能够使用.方式调用
  if (typeof this !== 'function') {
    //判断调用是否为函数
    throw new TypeError('Error');
  }
  const ctx = context || window; //取到传入的对象(执行上下文)，如果不传参数默认指向window
  ctx.func = this; //给obj对象添加一个func方法，this也就是调用myCall的函数
  const args = [...arguments].slice(1); //取得传入除了obj的参数
  const result = ctx.func(...args); //执行函数
  delete ctx.func; //删除函数
  return result;
};
```

### apply

```js
Function.prototype.myApply = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error');
  }
  const ctx = context || window;
  ctx.func = this;
  let result;
  if (arguments[1]) {
    //判断是否传入数组参数,如果传入就要展开数组
    result = ctx.func(...arguments[1]);
  } else {
    result = ctx.func();
  }
  delete ctx.func;
  return result;
};
```

### bind

相对于前两个，这个函数返回的函数，并不是立即执行。

```js
Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error');
  }
  context = context || window;
  const _this = this;
  const args = [...arguments].slice(1);
  return function F() {
    return _this.apply(context, args.concat(...arguments));
  };
};
```

## flat 的实现

### 递归

```js
// 判断当前数据是否为数组，是则递归
function flatten(nums) {
  let result = [];
  nums.forEach((item) => {
    if (Array.isArray(item)) {
      result = result.concat(flatten(item));
    } else {
      result.push(item);
    }
  });
  return result;
}
```

### toString + map

```js
// 这种方式比较局限，只有数组中元素为数字或者数字字符时，如果有‘a’这类字符串就会出错
function flatten(nums) {
  return nums
    .toString()
    .split(',')
    .map((item) => +item);
}
```

### reduce

```js
// 思路与递归相似，判断当前是否为数组
function flatten(nums) {
  return nums.reduce((pre, curr) => {
    return pre.concat(Array.isArray(curr) ? flatten(curr) : curr);
  }, []);
}
```

### some + 扩展运算符

```js
// 扩展运算符可以平铺开一层数组，如果一直存在数组的话，一直采用...平铺数组，直至没有数组
function flatten(nums) {
  while (nums.some((item) => Array.isArray(item))) {
    nums = [].concat(...nums);
  }
  return nums;
}
```

### 层数控制

```js
function isArray(arr) {
  return Array.isArray(arr);
}
function flatten(arr) {
  var result = [];
  var deep = arguments[1] || 1; //判断是否传入展平  层级
  arr.forEach((element) => {
    if (isArray(element) && deep >= 1) {
      result = result.concat(flatten(element, deep - 1));
    } else {
      result.push(element);
    }
  });
  return result;
}
```

## 防抖节流

在 resize/scroll/keypress/mousemove 等事件触发时，会不断调用回调函数。

在我们实现搜索的时候，输入搜索内容进行模糊搜索的时候，也会不断调用回调函数，这样子性能就被降低了。

对于这类事件的处理方式就是使用事件节流和事件防抖。它们通过对事件对应的回调函数进行包裹，以自由变量的形式缓存时间信息。

### 防抖(debounce)

假设设置时间为 2000ms，如果触发事件的 2000ms 之内，你再次触发该事件，就会给新的事件添加新的计时器，之前的事件统统作废。只执行最后一次触发的事件。

在某段时间内，不管你触发了多少次事件，我都只认最后一次。

```js
function debounce(fn, delay) {
  let timer = null;
  return function () {
    let _this = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(_this, args);
    }, delay);
  };
}
```

### 节流(throttle)

在某段时间内，不管你触发了多少次事件，我都只认第一次，并在计时结束时给予响应。
假设设置的时间为 2000ms，再触发了事件的 2000ms 之内，你在多少触发该事件，都不会有任何作用，它只为第一个事件等待 2000ms。时间一到，它就会执行了。

#### 时间戳

设置触发事件时的时间戳，然后减去之前的时间戳，如果大于时间周期，则执行函数，更新时间戳。

```js
function throttle(fn, delay) {
  //点击第一下就会立即执行
  let pre = 0;
  return function () {
    let _this = this;
    let args = arguments;
    let now = new Date();
    if (now - pre > delay) {
      fn.apply(_this, args);
      pre = now;
    }
  };
}
```

#### 定时器

设置一个定时器，再次触发时，如果存在定时器就不会执行函数，知道定时器执行之后，清空定时器，才能够设置下一个定时器。

```js
function throttle(fn, delay) {
  let timer;
  return function () {
    const _this = this;
    const args = [...arguments];
    if (!timer) {
      timer = setTimeout(function () {
        timer = null;
        fn.apply(_this, args);
      }, delay);
    }
  };
}
```

#### 两者比较

- 时间戳方式，会立即执行第一个事件；定时器方式，会隔 n 秒后执行第一个事件。
- 时间戳方式，停止触发后不会再执行事件；定时器方式，停止触发后会再一次执行事件。

## jsonp 的实现

jsonp 的作用是解决跨域问题。
因为 script 标签不受同源策略限制，所以可以动态插入 script 实现跨域。

```js
function jsonp(url, data) {
  data = data || {};
  return new Promise((resovle, reject) => {
    const cbFn = `jsonp_${Date.now()}`;
    data.callback = cbFn;
    const head = document.querySelector('head');
    const script = document.createElement('script');
    const src = `${url}?${dataToUrl(data)}`;
    script.src = src;
    head.append(script);
    window[ncbFn] = (res) => {
      resovle(res);
      head.removeChild(script);
      window[cbFn] = null;
    };
  });
}

function dataToUrl(data) {
  return Object.keys(data)
    .reduce((pre, curr) => {
      pre.push(`${curr}=${data[curr]}`);
      return pre;
    }, [])
    .join('&');
}

jsonp('http://jsonplaceholder.typicode.com/comments', {
  postId: 1,
}).then((res) => {
  console.log(res);
});
```

## 函数柯里化

当某个函数一次需要接受多个参数时，可以使用柯里化来使得当前函数一次性接受少一点的参数。

百科：把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数，并且返回接受余下的参数且返回结果的新函数的技术。

```js
function carry(fn) {
  const args = [...arguments].slice(1);
  if (fn.length <= args.length) {
    //当传入参数的数量>=函数参数数量时，执行函数
    return fn(...args);
  }
  return function () {
    //返回一个函数，等待传入其他参数
    const args1 = [...arguments];
    return carry(fn, ...args, ...args1);
  };
}

function add(a, b, c) {
  return a + b + c;
}

const carryAdd = carry(add);

carryAdd(1, 2, 3);
carryAdd(1)(2, 3);
carryAdd(1)(2)(3);
carryAdd(1)()(2)()(3);
```

## LazyMan(链式调用)

```js
function LazyMan(name) {
  return new _LazyMan(name);
}

function _LazyMan(name) {
  this.name = name;
  this.queue = []; //初始化队列
  this.queue.push(() => {
    console.log('Hi, ' + name);
    this.next();
  });
  setTimeout(() => {
    this.next();
  }, 0);
}

_LazyMan.prototype.next = function () {
  const fn = this.queue.shift();
  fn && fn();
};

_LazyMan.prototype.eat = function (food) {
  this.queue.push(() => {
    console.log(this.name + ' eat ' + food);
    this.next();
  });
  return this;
};

_LazyMan.prototype.sleep = function (time) {
  this.queue.push(() => {
    setTimeout(() => {
      console.log(this.name + ' sleep ' + time + 's');
      this.next();
    }, time * 1000);
  });
  return this;
};
```

## 数组去重

### 双重循环(兼容性好)

```js
function unique(nums) {
  var result = [];
  for (var i = 0; i < nums.length; i++) {
    for (var j = 0; j < result.length; j++) {
      if (nums[i] === result[j]) {
        break;
      }
    }
    if (j === result.length) {
      result.push(nums[i]);
    }
  }
  return result;
}
```

### indexOf(简化上一个方法的内部操作)

```js
function unique(nums) {
  var result = [];
  for (var i = 0; i < nums.length; i++) {
    if (result.indexOf(nums[i]) === -1) {
      result.push(nums[i]);
    }
  }
  return result;
}
```

### reduce + sort 实现(先排序在去重)

```js
Array.prototype.unique = function () {
  const arr = this;
  return arr
    .sort((a, b) => a - b)
    .reduce((pre, curr) => {
      if (pre.length === 0 || pre[pre.length - 1] !== curr) {
        pre.push(curr);
      }
      return pre;
    }, []);
};
```

### 对象实现

可以使用普通对象，或者使用 ES6 Map

```js
Array.prototype.unique = function () {
  const map = new Map(); //只能存在一个key
  return this.filter((item) => {
    return !map.has(item) && map.set(item, 1);
  });
};

Array.prototype.unique = function () {
  const obj = {};
  return this.filter((item) => {
    return obj.hasOwnProperty(item) ? false : (obj[item] = true);
  });
};
```

## 类型判断

### typeof(能够判断基本类型)

基本类型：number / string / null / undefined / boolean / symbol(ES6)
无法区分是哪种类型的对象

```js
typeof null; //"object"
typeof {}; //"object"
typeof []; //"object"
typeof function foo() {}; //"function"
```

### Object.prototype.toString()

Object.prototype.toString 会返回一个由 “[object “ 和 class 和 “]” 组成的字符串

- 如果 this 值是 undefined，就返回 [object Undefined]
- 如果 this 的值是 null，就返回 [object Null]
- 让 O 成为 ToObject(this) 的结果
- 让 class 成为 O 的内部属性 [[Class]] 的值
- 最后返回由 “[object “ 和 class 和 “]” 三个部分组成的字符串

常规 11 种数据类型：Boolean / Number / String / Function / Array / Date / RegExp / Object / Error / Null / Undefined

### 类型判断函数

```js
function type(obj) {
  const classTypeMap = {};
  'Boolean Number String Function Array Date RegExp Object Error'
    .split(' ')
    .forEach((item) => {
      classTypeMap['[object ' + item + ']'] = item.toLowerCase();
    });
  if (obj === null) {
    return obj + '';
  }
  return typeof obj === 'object' || typeof obj === 'function'
    ? classTypeMap[Object.prototype.toString.call(obj)]
    : typeof obj;
}
```

## 深浅拷贝

JS 有两种数据类型

基本数据类型 string/number/boolean/undefined/null/symbol(ES6)
引用数据类型 object/array/function

### 浅拷贝

对于基本数据类型来说，拷贝一份互不影响；而对于数组和对象来说，只会拷贝数组或者对象的引用，对新旧数组进行修改，两个数组都会发生变化。

基础的数组方法能够实现浅拷贝，例如 concat()、slice()；对象能够使用 Object.assign()实现浅拷贝；两者同是都可以使用扩展运算符实现浅拷贝。

```js
// 如果是嵌套数组和对象，上述方法不可行
let arr = [1, 2, 3, 4],
  arr1 = [1, 2, 3, [4, 5, 6]];

let copyarr = arr.slice(),
  copyarr1 = arr1.slice();

arr[1] = 5; //arr[1, 5, 3, 4], copyarr[1, 2, 3, 4]

arr1[3][1] = 7; //arr1[1, 2, 3, [4, 7, 6]], copyarr1[1, 2, 3, [4, 7, 6]]

let obj = { a: 1, b: 2, c: 3 },
  obj1 = { a: 1, b: 2, c: { d: 3, e: 4 } };

let copyobj = Object.assign({}, obj),
  copyobj1 = Object.assign({}, obj1);

obj.b = 4; //obj{ a: 1, b: 4, c: 3 }, copyobj{ a: 1, b: 2, c: 3 }

obj1.c.d = 6; //obj1{ a: 1, b: 2, c: { d: 6, e: 4 } }, copyobj1{ a: 1, b: 2, c: { d: 6, e: 4 } }
```

### 深拷贝

指完全的拷贝一个对象，即使嵌套了对象，两者也相互分离，修改一个对象的属性，也不会影响另一个。

#### 可以使用 JSON 的两个函数方法实现深拷贝

```js
let arr = ['old', 1, true, ['old1', 'old2'], { old: 1 }];
let new_arr = JSON.parse(JSON.stringify(arr));
arr[3][1] = 'old4'; //new_arr['old', 1, true, ['old1',  'old2'], {old: 1}]
```

但是缺点就是不能拷贝函数和 undefined

#### 深拷贝函数

```js
function deepClone(obj) {
  function isObject(obj) {
    //判断是不是对象
    return (
      (typeof obj !== null && typeof obj === 'object') ||
      typeof obj === 'function'
    );
  }
  if (!isObject(obj)) {
    return;
  }
  let newObj = Array.isArray(obj) ? [] : {}; //判断对象类型
  Object.keys(obj).forEach((key) => {
    newObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]; //判断当前值是不是对象
  });
  return newObj;
}
```

#### 进阶版深拷贝函数

上面实现的 deepClone 有一个问题，当我们对这样一个对象进行深拷贝时，会报错。

```js
const target = {
  filed1: 1,
  filed2: 2,
  filed: [1, 2, 3],
};
target.target = target;
```

在对 target 对象进行深拷贝，报错调用栈溢出 Maximum call stack size exceeded。导致这个的原因是对象的属性间接或直接的引用了自身的情况。
为了解决这个问题，我们可以开辟一个新的空间来存储当前对象和拷贝对象的关系，当需要拷贝当前对象时，先去存储空间找是否拷贝过；如果有直接返回，如果没有就继续拷贝。

```js
function deepClone(obj, map = new Map()) {
  function isObject(obj) {
    //判断是不是对象
    return (
      (typeof obj !== null && typeof obj === 'object') ||
      typeof obj === 'function'
    );
  }
  if (isObject(obj)) {
    let newObj = Array.isArray(obj) ? [] : {}; //判断对象类型
    if (map.get(obj)) {
      //如果已经克隆过了，直接返回
      return map.get(obj);
    }
    map.set(obj, newObj); //否则将当前对象作为key，克隆对象作为value存储
    Object.keys(obj).forEach((key) => {
      newObj[key] = isObject(obj[key]) ? deepClone(obj[key], map) : obj[key]; //判断当前值是不是对象
    });
    return newObj;
  } else {
    return obj;
  }
}
```

可以把 map 改为 weakMap，采用弱引用。

## JSON.stringfy

JSON.stringfy 是常用到的 JSON 对象中的一个方法。
JSON 对象包含的两个方法:

- JSON.parse(): 解析成 JSON 对象
  将对象解析成为 JSON 字符串
- JSON.stringify 方法是将一个 JavaScript 对象或值转换为 JSON 字符串，默认该方法其实有三个参数：第一个参数是必选，后面两个是可选参数非必选。第一个参数传入的是要转换的对象；第二个是一个 replacer 函数，比如指定的 replacer 是数组，则可选择性地仅处理包含数组指定的属性；第三个参数用来控制结果字符串里面的间距，后面两个参数整体用得比较少。
  该方法的语法为：JSON.stringify(value[, replacer [, space]])

针对于 JSON.stringfy 来说，内部处理数据时有以下特点

- 转换值有 toJSON 方法直接调用
- 在基本数据类型中，undefined/symbol/function 处理为 undefined，null/Infinity 处理为 “null”
- 在 Array 中，undefined/symbol/function 处理为 “null”；在非数组对象中，undefined/symbol/function 会被忽略
- 所有以 symbol 为属性键的属性都会被完全忽略掉

```js
function jsonStringify(data) {
  let type = typeof data;
  //基础类型或者function
  if (type !== 'object') {
    let result = data;
    //处理NaN和Infinity
    if (Number.isNaN(data) || data === Infinity || data === -Infinity) {
      return 'null';
    }
    //处理function/undefined/symbol
    else if (type === 'function' || type === 'undefined' || type === 'symbol') {
      return undefined;
    }
    //处理string
    else if (type === 'string') {
      result = `"${data}"`;
    }
    return String(result);
  }
  //引用类型或者null
  else {
    //处理null
    if (data === null) {
      return 'null';
    }
    //如果自带toJSON()方法，直接调用
    else if (data.toJSON && typeof data.toJSON === 'function') {
      return jsonStringify(data.toJSON());
    }
    //处理Array
    else if (Array.isArray(data)) {
      let result = [];
      data.forEach((item, index) => {
        if (type === 'function' || type === 'undefined' || type === 'symbol') {
          result[index] = 'null';
        } else {
          result[index] = jsonStringify(item);
        }
      });
      result = `[${result}]`;
      return result.replace(/'/g, '"');
    }
    //处理普通对象
    else {
      let result = [];
      Object.keys(data).forEach((item) => {
        //key 如果是 symbol，忽略
        if (typeof item !== 'symbol') {
          //键值如果是 undefined、function、symbol 为属性值，忽略
          if (
            data[item] !== undefined &&
            typeof data[item] !== 'function' &&
            typeof data[item] !== 'symbol'
          ) {
            result.push(`"${item}":${jsonStringify(data[item])}`);
          }
        }
      });
      return `{${result}}`.replace(/'/g, '"');
    }
  }
}
```

## EventEmit 发布订阅模式

实现自定义事件的订阅与发布，主要包含 on、off、emit、once、alloff 方法

- on 指定事件添加的监听器可以持续不断地监听相应的事件
- once 添加的监听器，监听一次后，就会被消除
- off 删除指定事件的指定监听器
- allOff 删除指定事件的全部监听器
- emit 执行指定事件的全部监听器

```js
function EventEmit() {
  this.__event = {};
}

EventEmit.prototype.on = function (eventName, listener) {
  function isValidListener(listener) {
    if (typeof listener === 'function') return true;
    else if (typeof listener === 'object') {
      return isValidListener(listener.listener);
    } else {
      return false;
    }
  }
  if (!eventName || !listener) return;

  if (!isValidListener(listener)) {
    throw new TypeError('listener must be a function');
  }
  var events = this.__event;
  var listeners = (events[eventName] = events[eventName] || []);
  listeners.push(listener);
  return this;
};

EventEmit.prototype.once = function (eventName, listener) {
  return this.on(eventName, { listener, once: true });
};

EventEmit.prototype.emit = function (eventName, arg) {
  var that = this;
  var listeners = this.__event[eventName];
  if (!listeners) return;
  for (var i = 0; i < listeners.length; i++) {
    const listener = listeners[i];
    if (!listener) continue;
    if (typeof listener === 'function') {
      listener.apply(that, arg);
    } else {
      listener.listener.apply(that, arg);
      that.off(eventName, listener.listener);
    }
  }
  return this;
};

EventEmit.prototype.off = function (eventName, listener) {
  var listeners = this.__event[eventName];
  if (!listeners) return;
  for (var i = 0, len = listeners.length; i < len; i++) {
    if (
      listeners[i] &&
      (listeners[i] === listener || listeners[i].listener === listener)
    ) {
      listeners.splice(i, 1, null);
      break;
    }
  }
  return this;
};

EventEmit.prototype.allOff = function (eventName) {
  if (eventName && this.__event[eventName]) {
    this.__event[eventName] = [];
  }
  return this;
};
```

## Array.prototype.map

map() 方法创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值

```js
var new_array = arr.map(function callback(currentValue[, index[, array]]) {
 // Return element for new_array
}[, thisArg])
Array.prototype.map = function (callback, thisArg) {
  if (this === null) {
    throw new TypeError("Cannot read property 'map' of null");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }
  //获取当数据和当前this
  let O = Object(this);
  let T = thisArg;
  let len = O.length >>> 0;
  let A = new Array(len); //创建新的数据
  let k = 0;
  while (k < len) {
    if (k in O) {
      let kValue = O[k]; //当前数据
      A[k] = callback.call(T, kValue, k, O);
    }
    k++;
  }
  return A;
};
```

"use strict";(self.webpackChunkblog_of_fbb=self.webpackChunkblog_of_fbb||[]).push([[647],{40647:function(r,n,e){e.r(n),e.d(n,{texts:function(){return t}});const t=[{value:"\u603B\u7ED3\u4E00\u4E0B\u4E00\u4E9B\u64CD\u4F5C\u7B26\u6216\u8005\u65B9\u6CD5\u7684\u539F\u751F\u5B9E\u73B0\u3002\u6301\u7EED\u66F4\u65B0",paraId:0},{value:"\u521B\u5EFA\u67D0\u4E2A\u5B9E\u4F8B\uFF0C\u5FC5\u987B\u4F7F\u7528 new \u64CD\u4F5C\u7B26\u3002\u8FD9\u79CD\u65B9\u5F0F\u8C03\u7528\u6784\u9020\u51FD\u6570\u4F1A\u7ECF\u5386\u4EE5\u4E0B 4 \u4E2A\u6B65\u9AA4:",paraId:1,tocIndex:0},{value:"\u521B\u9020\u4E00\u4E2A\u65B0\u7684\u5BF9\u8C61",paraId:2,tocIndex:0},{value:"\u5C06\u6784\u9020\u51FD\u6570\u7684\u4F5C\u7528\u57DF\u8D4B\u503C\u7ED9\u65B0\u5BF9\u8C61(this \u6307\u5411\u8BE5\u5BF9\u8C61)",paraId:2,tocIndex:0},{value:"\u6267\u884C\u6784\u9020\u51FD\u6570\u4E2D\u7684\u4EE3\u7801(\u4E3A\u65B0\u5BF9\u8C61\u6DFB\u52A0\u5C5E\u6027)",paraId:2,tocIndex:0},{value:"\u8FD4\u56DE\u65B0\u5BF9\u8C61",paraId:2,tocIndex:0},{value:`function myNew(fun) {
  var obj = Object.create(fun.prototype);
  //var obj = {}
  //obj.__proto__ = fun.prototype  \u4E0E\u4E0A\u8FF0\u65B9\u6CD5\u5B9E\u73B0\u6548\u679C\u76F8\u540C
  var args = [...arguments].slice(1);
  var res = fun.call(obj, ...args);
  return typeof res === 'object' ? res : obj;
}
`,paraId:3,tocIndex:0},{value:"instanceof \u53EF\u4EE5\u6B63\u786E\u7684\u5224\u65AD\u5BF9\u8C61\u7684\u7C7B\u578B\uFF0C\u56E0\u4E3A\u5185\u90E8\u7684\u673A\u5236\u662F\u901A\u8FC7\u5224\u65AD\u5BF9\u8C61\u7684\u539F\u578B\u94FE\u4E2D\u662F\u4E0D\u662F\u80FD\u591F\u627E\u5230\u7C7B\u578B\u7684 prototype\u3002",paraId:4,tocIndex:1},{value:`function myInstanceof(left, right) {
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
`,paraId:5,tocIndex:1},{value:`call  func.call(obj, args1, args2); //\u4F20\u5165\u7684\u662F\u53C2\u6570\u5217\u8868
apply func.apply(obj, [args1, args2]); //\u4F20\u5165\u7684\u662F\u6570\u7EC4\u53C2\u6570    \u8BB0\u6CD5\uFF1Aapply\u662Fa\u5F00\u5934\u4E3Aarray
bind  func.bind(obj, args1, args2); //\u8FD4\u56DE\u7684\u662F\u51FD\u6570\uFF0C\u524D\u4E24\u8005\u4E3A\u7ACB\u5373\u6267\u884C
`,paraId:6,tocIndex:2},{value:`// \u6539\u53D8this\u7684\u6307\u5411\uFF0C\u8BA9bar()\u51FD\u6570\u7684this\u6307\u5411foo\u5BF9\u8C61
var foo = {
  value: 100
}
function bar() {
  console.log(this.value);
}
bar.apply(foo);

//\u7B49\u540C\u4E0E\u5C06bar\u51FD\u6570\u4F5C\u4E3Afoo\u5BF9\u8C61\u5C5E\u6027\u8FDB\u884C\u8C03\u7528\uFF0C\u5373\u4E3A\u4E0B\u5217\u65B9\u5F0F
var foo = {
  value: 100
  bar: function() {
    console.log(this.value);
  }
}

/*
 * \u56E0\u6B64\u6211\u4EEC\u603B\u7ED3\u6A21\u62DF\u601D\u8DEF\u5982\u4E0B\uFF1A
 * 1.\u5C06\u6267\u884C\u7684\u51FD\u6570\u4F5C\u4E3A\u5BF9\u8C61\u5C5E\u6027
 * 2.\u6267\u884C\u51FD\u6570
 * 3.\u5C06\u51FD\u6570\u4ECE\u5BF9\u8C61\u4E2D\u5220\u9664
*/
`,paraId:7,tocIndex:3},{value:`Function.prototype.myCall = function (context) {
  //\u4F7F\u7528\u8BE5\u65B9\u5F0F\u5728\u539F\u578B\u94FE\u4E0A\u62D3\u5C55\u65B9\u6CD5\uFF0C\u4EE5\u4FBF\u6240\u6709\u7684\u51FD\u6570\u90FD\u80FD\u591F\u4F7F\u7528.\u65B9\u5F0F\u8C03\u7528
  if (typeof this !== 'function') {
    //\u5224\u65AD\u8C03\u7528\u662F\u5426\u4E3A\u51FD\u6570
    throw new TypeError('Error');
  }
  const ctx = context || window; //\u53D6\u5230\u4F20\u5165\u7684\u5BF9\u8C61(\u6267\u884C\u4E0A\u4E0B\u6587)\uFF0C\u5982\u679C\u4E0D\u4F20\u53C2\u6570\u9ED8\u8BA4\u6307\u5411window
  ctx.func = this; //\u7ED9obj\u5BF9\u8C61\u6DFB\u52A0\u4E00\u4E2Afunc\u65B9\u6CD5\uFF0Cthis\u4E5F\u5C31\u662F\u8C03\u7528myCall\u7684\u51FD\u6570
  const args = [...arguments].slice(1); //\u53D6\u5F97\u4F20\u5165\u9664\u4E86obj\u7684\u53C2\u6570
  const result = ctx.func(...args); //\u6267\u884C\u51FD\u6570
  delete ctx.func; //\u5220\u9664\u51FD\u6570
  return result;
};
`,paraId:8,tocIndex:4},{value:`Function.prototype.myApply = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error');
  }
  const ctx = context || window;
  ctx.func = this;
  let result;
  if (arguments[1]) {
    //\u5224\u65AD\u662F\u5426\u4F20\u5165\u6570\u7EC4\u53C2\u6570,\u5982\u679C\u4F20\u5165\u5C31\u8981\u5C55\u5F00\u6570\u7EC4
    result = ctx.func(...arguments[1]);
  } else {
    result = ctx.func();
  }
  delete ctx.func;
  return result;
};
`,paraId:9,tocIndex:5},{value:"\u76F8\u5BF9\u4E8E\u524D\u4E24\u4E2A\uFF0C\u8FD9\u4E2A\u51FD\u6570\u8FD4\u56DE\u7684\u51FD\u6570\uFF0C\u5E76\u4E0D\u662F\u7ACB\u5373\u6267\u884C\u3002",paraId:10,tocIndex:6},{value:`Function.prototype.myBind = function (context) {
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
`,paraId:11,tocIndex:6},{value:`// \u5224\u65AD\u5F53\u524D\u6570\u636E\u662F\u5426\u4E3A\u6570\u7EC4\uFF0C\u662F\u5219\u9012\u5F52
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
`,paraId:12,tocIndex:8},{value:`// \u8FD9\u79CD\u65B9\u5F0F\u6BD4\u8F83\u5C40\u9650\uFF0C\u53EA\u6709\u6570\u7EC4\u4E2D\u5143\u7D20\u4E3A\u6570\u5B57\u6216\u8005\u6570\u5B57\u5B57\u7B26\u65F6\uFF0C\u5982\u679C\u6709\u2018a\u2019\u8FD9\u7C7B\u5B57\u7B26\u4E32\u5C31\u4F1A\u51FA\u9519
function flatten(nums) {
  return nums
    .toString()
    .split(',')
    .map((item) => +item);
}
`,paraId:13,tocIndex:9},{value:`// \u601D\u8DEF\u4E0E\u9012\u5F52\u76F8\u4F3C\uFF0C\u5224\u65AD\u5F53\u524D\u662F\u5426\u4E3A\u6570\u7EC4
function flatten(nums) {
  return nums.reduce((pre, curr) => {
    return pre.concat(Array.isArray(curr) ? flatten(curr) : curr);
  }, []);
}
`,paraId:14,tocIndex:10},{value:`// \u6269\u5C55\u8FD0\u7B97\u7B26\u53EF\u4EE5\u5E73\u94FA\u5F00\u4E00\u5C42\u6570\u7EC4\uFF0C\u5982\u679C\u4E00\u76F4\u5B58\u5728\u6570\u7EC4\u7684\u8BDD\uFF0C\u4E00\u76F4\u91C7\u7528...\u5E73\u94FA\u6570\u7EC4\uFF0C\u76F4\u81F3\u6CA1\u6709\u6570\u7EC4
function flatten(nums) {
  while (nums.some((item) => Array.isArray(item))) {
    nums = [].concat(...nums);
  }
  return nums;
}
`,paraId:15,tocIndex:11},{value:`function isArray(arr) {
  return Array.isArray(arr);
}
function flatten(arr) {
  var result = [];
  var deep = arguments[1] || 1; //\u5224\u65AD\u662F\u5426\u4F20\u5165\u5C55\u5E73  \u5C42\u7EA7
  arr.forEach((element) => {
    if (isArray(element) && deep >= 1) {
      result = result.concat(flatten(element, deep - 1));
    } else {
      result.push(element);
    }
  });
  return result;
}
`,paraId:16,tocIndex:12},{value:"\u5728 resize/scroll/keypress/mousemove \u7B49\u4E8B\u4EF6\u89E6\u53D1\u65F6\uFF0C\u4F1A\u4E0D\u65AD\u8C03\u7528\u56DE\u8C03\u51FD\u6570\u3002",paraId:17,tocIndex:13},{value:"\u5728\u6211\u4EEC\u5B9E\u73B0\u641C\u7D22\u7684\u65F6\u5019\uFF0C\u8F93\u5165\u641C\u7D22\u5185\u5BB9\u8FDB\u884C\u6A21\u7CCA\u641C\u7D22\u7684\u65F6\u5019\uFF0C\u4E5F\u4F1A\u4E0D\u65AD\u8C03\u7528\u56DE\u8C03\u51FD\u6570\uFF0C\u8FD9\u6837\u5B50\u6027\u80FD\u5C31\u88AB\u964D\u4F4E\u4E86\u3002",paraId:18,tocIndex:13},{value:"\u5BF9\u4E8E\u8FD9\u7C7B\u4E8B\u4EF6\u7684\u5904\u7406\u65B9\u5F0F\u5C31\u662F\u4F7F\u7528\u4E8B\u4EF6\u8282\u6D41\u548C\u4E8B\u4EF6\u9632\u6296\u3002\u5B83\u4EEC\u901A\u8FC7\u5BF9\u4E8B\u4EF6\u5BF9\u5E94\u7684\u56DE\u8C03\u51FD\u6570\u8FDB\u884C\u5305\u88F9\uFF0C\u4EE5\u81EA\u7531\u53D8\u91CF\u7684\u5F62\u5F0F\u7F13\u5B58\u65F6\u95F4\u4FE1\u606F\u3002",paraId:19,tocIndex:13},{value:"\u5047\u8BBE\u8BBE\u7F6E\u65F6\u95F4\u4E3A 2000ms\uFF0C\u5982\u679C\u89E6\u53D1\u4E8B\u4EF6\u7684 2000ms \u4E4B\u5185\uFF0C\u4F60\u518D\u6B21\u89E6\u53D1\u8BE5\u4E8B\u4EF6\uFF0C\u5C31\u4F1A\u7ED9\u65B0\u7684\u4E8B\u4EF6\u6DFB\u52A0\u65B0\u7684\u8BA1\u65F6\u5668\uFF0C\u4E4B\u524D\u7684\u4E8B\u4EF6\u7EDF\u7EDF\u4F5C\u5E9F\u3002\u53EA\u6267\u884C\u6700\u540E\u4E00\u6B21\u89E6\u53D1\u7684\u4E8B\u4EF6\u3002",paraId:20,tocIndex:14},{value:"\u5728\u67D0\u6BB5\u65F6\u95F4\u5185\uFF0C\u4E0D\u7BA1\u4F60\u89E6\u53D1\u4E86\u591A\u5C11\u6B21\u4E8B\u4EF6\uFF0C\u6211\u90FD\u53EA\u8BA4\u6700\u540E\u4E00\u6B21\u3002",paraId:21,tocIndex:14},{value:`function debounce(fn, delay) {
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
`,paraId:22,tocIndex:14},{value:`\u5728\u67D0\u6BB5\u65F6\u95F4\u5185\uFF0C\u4E0D\u7BA1\u4F60\u89E6\u53D1\u4E86\u591A\u5C11\u6B21\u4E8B\u4EF6\uFF0C\u6211\u90FD\u53EA\u8BA4\u7B2C\u4E00\u6B21\uFF0C\u5E76\u5728\u8BA1\u65F6\u7ED3\u675F\u65F6\u7ED9\u4E88\u54CD\u5E94\u3002
\u5047\u8BBE\u8BBE\u7F6E\u7684\u65F6\u95F4\u4E3A 2000ms\uFF0C\u518D\u89E6\u53D1\u4E86\u4E8B\u4EF6\u7684 2000ms \u4E4B\u5185\uFF0C\u4F60\u5728\u591A\u5C11\u89E6\u53D1\u8BE5\u4E8B\u4EF6\uFF0C\u90FD\u4E0D\u4F1A\u6709\u4EFB\u4F55\u4F5C\u7528\uFF0C\u5B83\u53EA\u4E3A\u7B2C\u4E00\u4E2A\u4E8B\u4EF6\u7B49\u5F85 2000ms\u3002\u65F6\u95F4\u4E00\u5230\uFF0C\u5B83\u5C31\u4F1A\u6267\u884C\u4E86\u3002`,paraId:23,tocIndex:15},{value:"\u8BBE\u7F6E\u89E6\u53D1\u4E8B\u4EF6\u65F6\u7684\u65F6\u95F4\u6233\uFF0C\u7136\u540E\u51CF\u53BB\u4E4B\u524D\u7684\u65F6\u95F4\u6233\uFF0C\u5982\u679C\u5927\u4E8E\u65F6\u95F4\u5468\u671F\uFF0C\u5219\u6267\u884C\u51FD\u6570\uFF0C\u66F4\u65B0\u65F6\u95F4\u6233\u3002",paraId:24,tocIndex:16},{value:`function throttle(fn, delay) {
  //\u70B9\u51FB\u7B2C\u4E00\u4E0B\u5C31\u4F1A\u7ACB\u5373\u6267\u884C
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
`,paraId:25,tocIndex:16},{value:"\u8BBE\u7F6E\u4E00\u4E2A\u5B9A\u65F6\u5668\uFF0C\u518D\u6B21\u89E6\u53D1\u65F6\uFF0C\u5982\u679C\u5B58\u5728\u5B9A\u65F6\u5668\u5C31\u4E0D\u4F1A\u6267\u884C\u51FD\u6570\uFF0C\u77E5\u9053\u5B9A\u65F6\u5668\u6267\u884C\u4E4B\u540E\uFF0C\u6E05\u7A7A\u5B9A\u65F6\u5668\uFF0C\u624D\u80FD\u591F\u8BBE\u7F6E\u4E0B\u4E00\u4E2A\u5B9A\u65F6\u5668\u3002",paraId:26,tocIndex:17},{value:`function throttle(fn, delay) {
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
`,paraId:27,tocIndex:17},{value:"\u65F6\u95F4\u6233\u65B9\u5F0F\uFF0C\u4F1A\u7ACB\u5373\u6267\u884C\u7B2C\u4E00\u4E2A\u4E8B\u4EF6\uFF1B\u5B9A\u65F6\u5668\u65B9\u5F0F\uFF0C\u4F1A\u9694 n \u79D2\u540E\u6267\u884C\u7B2C\u4E00\u4E2A\u4E8B\u4EF6\u3002",paraId:28,tocIndex:18},{value:"\u65F6\u95F4\u6233\u65B9\u5F0F\uFF0C\u505C\u6B62\u89E6\u53D1\u540E\u4E0D\u4F1A\u518D\u6267\u884C\u4E8B\u4EF6\uFF1B\u5B9A\u65F6\u5668\u65B9\u5F0F\uFF0C\u505C\u6B62\u89E6\u53D1\u540E\u4F1A\u518D\u4E00\u6B21\u6267\u884C\u4E8B\u4EF6\u3002",paraId:28,tocIndex:18},{value:`jsonp \u7684\u4F5C\u7528\u662F\u89E3\u51B3\u8DE8\u57DF\u95EE\u9898\u3002
\u56E0\u4E3A script \u6807\u7B7E\u4E0D\u53D7\u540C\u6E90\u7B56\u7565\u9650\u5236\uFF0C\u6240\u4EE5\u53EF\u4EE5\u52A8\u6001\u63D2\u5165 script \u5B9E\u73B0\u8DE8\u57DF\u3002`,paraId:29,tocIndex:19},{value:`function jsonp(url, data) {
  data = data || {};
  return new Promise((resovle, reject) => {
    const cbFn = \`jsonp_\${Date.now()}\`;
    data.callback = cbFn;
    const head = document.querySelector('head');
    const script = document.createElement('script');
    const src = \`\${url}?\${dataToUrl(data)}\`;
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
      pre.push(\`\${curr}=\${data[curr]}\`);
      return pre;
    }, [])
    .join('&');
}

jsonp('http://jsonplaceholder.typicode.com/comments', {
  postId: 1,
}).then((res) => {
  console.log(res);
});
`,paraId:30,tocIndex:19},{value:"\u5F53\u67D0\u4E2A\u51FD\u6570\u4E00\u6B21\u9700\u8981\u63A5\u53D7\u591A\u4E2A\u53C2\u6570\u65F6\uFF0C\u53EF\u4EE5\u4F7F\u7528\u67EF\u91CC\u5316\u6765\u4F7F\u5F97\u5F53\u524D\u51FD\u6570\u4E00\u6B21\u6027\u63A5\u53D7\u5C11\u4E00\u70B9\u7684\u53C2\u6570\u3002",paraId:31,tocIndex:20},{value:"\u767E\u79D1\uFF1A\u628A\u63A5\u53D7\u591A\u4E2A\u53C2\u6570\u7684\u51FD\u6570\u53D8\u6362\u6210\u63A5\u53D7\u4E00\u4E2A\u5355\u4E00\u53C2\u6570(\u6700\u521D\u51FD\u6570\u7684\u7B2C\u4E00\u4E2A\u53C2\u6570)\u7684\u51FD\u6570\uFF0C\u5E76\u4E14\u8FD4\u56DE\u63A5\u53D7\u4F59\u4E0B\u7684\u53C2\u6570\u4E14\u8FD4\u56DE\u7ED3\u679C\u7684\u65B0\u51FD\u6570\u7684\u6280\u672F\u3002",paraId:32,tocIndex:20},{value:`function carry(fn) {
  const args = [...arguments].slice(1);
  if (fn.length <= args.length) {
    //\u5F53\u4F20\u5165\u53C2\u6570\u7684\u6570\u91CF>=\u51FD\u6570\u53C2\u6570\u6570\u91CF\u65F6\uFF0C\u6267\u884C\u51FD\u6570
    return fn(...args);
  }
  return function () {
    //\u8FD4\u56DE\u4E00\u4E2A\u51FD\u6570\uFF0C\u7B49\u5F85\u4F20\u5165\u5176\u4ED6\u53C2\u6570
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
`,paraId:33,tocIndex:20},{value:`function LazyMan(name) {
  return new _LazyMan(name);
}

function _LazyMan(name) {
  this.name = name;
  this.queue = []; //\u521D\u59CB\u5316\u961F\u5217
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
`,paraId:34,tocIndex:21},{value:`function unique(nums) {
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
`,paraId:35,tocIndex:23},{value:`function unique(nums) {
  var result = [];
  for (var i = 0; i < nums.length; i++) {
    if (result.indexOf(nums[i]) === -1) {
      result.push(nums[i]);
    }
  }
  return result;
}
`,paraId:36,tocIndex:24},{value:`Array.prototype.unique = function () {
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
`,paraId:37,tocIndex:25},{value:"\u53EF\u4EE5\u4F7F\u7528\u666E\u901A\u5BF9\u8C61\uFF0C\u6216\u8005\u4F7F\u7528 ES6 Map",paraId:38,tocIndex:26},{value:`Array.prototype.unique = function () {
  const map = new Map(); //\u53EA\u80FD\u5B58\u5728\u4E00\u4E2Akey
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
`,paraId:39,tocIndex:26},{value:`\u57FA\u672C\u7C7B\u578B\uFF1Anumber / string / null / undefined / boolean / symbol(ES6)
\u65E0\u6CD5\u533A\u5206\u662F\u54EA\u79CD\u7C7B\u578B\u7684\u5BF9\u8C61`,paraId:40,tocIndex:28},{value:`typeof null; //"object"
typeof {}; //"object"
typeof []; //"object"
typeof function foo() {}; //"function"
`,paraId:41,tocIndex:28},{value:"Object.prototype.toString \u4F1A\u8FD4\u56DE\u4E00\u4E2A\u7531 \u201C[object \u201C \u548C class \u548C \u201C]\u201D \u7EC4\u6210\u7684\u5B57\u7B26\u4E32",paraId:42,tocIndex:29},{value:"\u5982\u679C this \u503C\u662F undefined\uFF0C\u5C31\u8FD4\u56DE [object Undefined]",paraId:43,tocIndex:29},{value:"\u5982\u679C this \u7684\u503C\u662F null\uFF0C\u5C31\u8FD4\u56DE [object Null]",paraId:43,tocIndex:29},{value:"\u8BA9 O \u6210\u4E3A ToObject(this) \u7684\u7ED3\u679C",paraId:43,tocIndex:29},{value:"\u8BA9 class \u6210\u4E3A O \u7684\u5185\u90E8\u5C5E\u6027 [[Class]] \u7684\u503C",paraId:43,tocIndex:29},{value:"\u6700\u540E\u8FD4\u56DE\u7531 \u201C[object \u201C \u548C class \u548C \u201C]\u201D \u4E09\u4E2A\u90E8\u5206\u7EC4\u6210\u7684\u5B57\u7B26\u4E32",paraId:43,tocIndex:29},{value:"\u5E38\u89C4 11 \u79CD\u6570\u636E\u7C7B\u578B\uFF1ABoolean / Number / String / Function / Array / Date / RegExp / Object / Error / Null / Undefined",paraId:44,tocIndex:29},{value:`function type(obj) {
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
`,paraId:45,tocIndex:30},{value:"JS \u6709\u4E24\u79CD\u6570\u636E\u7C7B\u578B",paraId:46,tocIndex:31},{value:`\u57FA\u672C\u6570\u636E\u7C7B\u578B string/number/boolean/undefined/null/symbol(ES6)
\u5F15\u7528\u6570\u636E\u7C7B\u578B object/array/function`,paraId:47,tocIndex:31},{value:"\u5BF9\u4E8E\u57FA\u672C\u6570\u636E\u7C7B\u578B\u6765\u8BF4\uFF0C\u62F7\u8D1D\u4E00\u4EFD\u4E92\u4E0D\u5F71\u54CD\uFF1B\u800C\u5BF9\u4E8E\u6570\u7EC4\u548C\u5BF9\u8C61\u6765\u8BF4\uFF0C\u53EA\u4F1A\u62F7\u8D1D\u6570\u7EC4\u6216\u8005\u5BF9\u8C61\u7684\u5F15\u7528\uFF0C\u5BF9\u65B0\u65E7\u6570\u7EC4\u8FDB\u884C\u4FEE\u6539\uFF0C\u4E24\u4E2A\u6570\u7EC4\u90FD\u4F1A\u53D1\u751F\u53D8\u5316\u3002",paraId:48,tocIndex:32},{value:"\u57FA\u7840\u7684\u6570\u7EC4\u65B9\u6CD5\u80FD\u591F\u5B9E\u73B0\u6D45\u62F7\u8D1D\uFF0C\u4F8B\u5982 concat()\u3001slice()\uFF1B\u5BF9\u8C61\u80FD\u591F\u4F7F\u7528 Object.assign()\u5B9E\u73B0\u6D45\u62F7\u8D1D\uFF1B\u4E24\u8005\u540C\u662F\u90FD\u53EF\u4EE5\u4F7F\u7528\u6269\u5C55\u8FD0\u7B97\u7B26\u5B9E\u73B0\u6D45\u62F7\u8D1D\u3002",paraId:49,tocIndex:32},{value:`// \u5982\u679C\u662F\u5D4C\u5957\u6570\u7EC4\u548C\u5BF9\u8C61\uFF0C\u4E0A\u8FF0\u65B9\u6CD5\u4E0D\u53EF\u884C
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
`,paraId:50,tocIndex:32},{value:"\u6307\u5B8C\u5168\u7684\u62F7\u8D1D\u4E00\u4E2A\u5BF9\u8C61\uFF0C\u5373\u4F7F\u5D4C\u5957\u4E86\u5BF9\u8C61\uFF0C\u4E24\u8005\u4E5F\u76F8\u4E92\u5206\u79BB\uFF0C\u4FEE\u6539\u4E00\u4E2A\u5BF9\u8C61\u7684\u5C5E\u6027\uFF0C\u4E5F\u4E0D\u4F1A\u5F71\u54CD\u53E6\u4E00\u4E2A\u3002",paraId:51,tocIndex:33},{value:`let arr = ['old', 1, true, ['old1', 'old2'], { old: 1 }];
let new_arr = JSON.parse(JSON.stringify(arr));
arr[3][1] = 'old4'; //new_arr['old', 1, true, ['old1',  'old2'], {old: 1}]
`,paraId:52,tocIndex:34},{value:"\u4F46\u662F\u7F3A\u70B9\u5C31\u662F\u4E0D\u80FD\u62F7\u8D1D\u51FD\u6570\u548C undefined",paraId:53,tocIndex:34},{value:`function deepClone(obj) {
  function isObject(obj) {
    //\u5224\u65AD\u662F\u4E0D\u662F\u5BF9\u8C61
    return (
      (typeof obj !== null && typeof obj === 'object') ||
      typeof obj === 'function'
    );
  }
  if (!isObject(obj)) {
    return;
  }
  let newObj = Array.isArray(obj) ? [] : {}; //\u5224\u65AD\u5BF9\u8C61\u7C7B\u578B
  Object.keys(obj).forEach((key) => {
    newObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]; //\u5224\u65AD\u5F53\u524D\u503C\u662F\u4E0D\u662F\u5BF9\u8C61
  });
  return newObj;
}
`,paraId:54,tocIndex:35},{value:"\u4E0A\u9762\u5B9E\u73B0\u7684 deepClone \u6709\u4E00\u4E2A\u95EE\u9898\uFF0C\u5F53\u6211\u4EEC\u5BF9\u8FD9\u6837\u4E00\u4E2A\u5BF9\u8C61\u8FDB\u884C\u6DF1\u62F7\u8D1D\u65F6\uFF0C\u4F1A\u62A5\u9519\u3002",paraId:55,tocIndex:36},{value:`const target = {
  filed1: 1,
  filed2: 2,
  filed: [1, 2, 3],
};
target.target = target;
`,paraId:56,tocIndex:36},{value:`\u5728\u5BF9 target \u5BF9\u8C61\u8FDB\u884C\u6DF1\u62F7\u8D1D\uFF0C\u62A5\u9519\u8C03\u7528\u6808\u6EA2\u51FA Maximum call stack size exceeded\u3002\u5BFC\u81F4\u8FD9\u4E2A\u7684\u539F\u56E0\u662F\u5BF9\u8C61\u7684\u5C5E\u6027\u95F4\u63A5\u6216\u76F4\u63A5\u7684\u5F15\u7528\u4E86\u81EA\u8EAB\u7684\u60C5\u51B5\u3002
\u4E3A\u4E86\u89E3\u51B3\u8FD9\u4E2A\u95EE\u9898\uFF0C\u6211\u4EEC\u53EF\u4EE5\u5F00\u8F9F\u4E00\u4E2A\u65B0\u7684\u7A7A\u95F4\u6765\u5B58\u50A8\u5F53\u524D\u5BF9\u8C61\u548C\u62F7\u8D1D\u5BF9\u8C61\u7684\u5173\u7CFB\uFF0C\u5F53\u9700\u8981\u62F7\u8D1D\u5F53\u524D\u5BF9\u8C61\u65F6\uFF0C\u5148\u53BB\u5B58\u50A8\u7A7A\u95F4\u627E\u662F\u5426\u62F7\u8D1D\u8FC7\uFF1B\u5982\u679C\u6709\u76F4\u63A5\u8FD4\u56DE\uFF0C\u5982\u679C\u6CA1\u6709\u5C31\u7EE7\u7EED\u62F7\u8D1D\u3002`,paraId:57,tocIndex:36},{value:`function deepClone(obj, map = new Map()) {
  function isObject(obj) {
    //\u5224\u65AD\u662F\u4E0D\u662F\u5BF9\u8C61
    return (
      (typeof obj !== null && typeof obj === 'object') ||
      typeof obj === 'function'
    );
  }
  if (isObject(obj)) {
    let newObj = Array.isArray(obj) ? [] : {}; //\u5224\u65AD\u5BF9\u8C61\u7C7B\u578B
    if (map.get(obj)) {
      //\u5982\u679C\u5DF2\u7ECF\u514B\u9686\u8FC7\u4E86\uFF0C\u76F4\u63A5\u8FD4\u56DE
      return map.get(obj);
    }
    map.set(obj, newObj); //\u5426\u5219\u5C06\u5F53\u524D\u5BF9\u8C61\u4F5C\u4E3Akey\uFF0C\u514B\u9686\u5BF9\u8C61\u4F5C\u4E3Avalue\u5B58\u50A8
    Object.keys(obj).forEach((key) => {
      newObj[key] = isObject(obj[key]) ? deepClone(obj[key], map) : obj[key]; //\u5224\u65AD\u5F53\u524D\u503C\u662F\u4E0D\u662F\u5BF9\u8C61
    });
    return newObj;
  } else {
    return obj;
  }
}
`,paraId:58,tocIndex:36},{value:"\u53EF\u4EE5\u628A map \u6539\u4E3A weakMap\uFF0C\u91C7\u7528\u5F31\u5F15\u7528\u3002",paraId:59,tocIndex:36},{value:`JSON.stringfy \u662F\u5E38\u7528\u5230\u7684 JSON \u5BF9\u8C61\u4E2D\u7684\u4E00\u4E2A\u65B9\u6CD5\u3002
JSON \u5BF9\u8C61\u5305\u542B\u7684\u4E24\u4E2A\u65B9\u6CD5:`,paraId:60,tocIndex:37},{value:`JSON.parse(): \u89E3\u6790\u6210 JSON \u5BF9\u8C61
\u5C06\u5BF9\u8C61\u89E3\u6790\u6210\u4E3A JSON \u5B57\u7B26\u4E32`,paraId:61,tocIndex:37},{value:`JSON.stringify \u65B9\u6CD5\u662F\u5C06\u4E00\u4E2A JavaScript \u5BF9\u8C61\u6216\u503C\u8F6C\u6362\u4E3A JSON \u5B57\u7B26\u4E32\uFF0C\u9ED8\u8BA4\u8BE5\u65B9\u6CD5\u5176\u5B9E\u6709\u4E09\u4E2A\u53C2\u6570\uFF1A\u7B2C\u4E00\u4E2A\u53C2\u6570\u662F\u5FC5\u9009\uFF0C\u540E\u9762\u4E24\u4E2A\u662F\u53EF\u9009\u53C2\u6570\u975E\u5FC5\u9009\u3002\u7B2C\u4E00\u4E2A\u53C2\u6570\u4F20\u5165\u7684\u662F\u8981\u8F6C\u6362\u7684\u5BF9\u8C61\uFF1B\u7B2C\u4E8C\u4E2A\u662F\u4E00\u4E2A replacer \u51FD\u6570\uFF0C\u6BD4\u5982\u6307\u5B9A\u7684 replacer \u662F\u6570\u7EC4\uFF0C\u5219\u53EF\u9009\u62E9\u6027\u5730\u4EC5\u5904\u7406\u5305\u542B\u6570\u7EC4\u6307\u5B9A\u7684\u5C5E\u6027\uFF1B\u7B2C\u4E09\u4E2A\u53C2\u6570\u7528\u6765\u63A7\u5236\u7ED3\u679C\u5B57\u7B26\u4E32\u91CC\u9762\u7684\u95F4\u8DDD\uFF0C\u540E\u9762\u4E24\u4E2A\u53C2\u6570\u6574\u4F53\u7528\u5F97\u6BD4\u8F83\u5C11\u3002
\u8BE5\u65B9\u6CD5\u7684\u8BED\u6CD5\u4E3A\uFF1AJSON.stringify(value[, replacer [, space]])`,paraId:61,tocIndex:37},{value:"\u9488\u5BF9\u4E8E JSON.stringfy \u6765\u8BF4\uFF0C\u5185\u90E8\u5904\u7406\u6570\u636E\u65F6\u6709\u4EE5\u4E0B\u7279\u70B9",paraId:62,tocIndex:37},{value:"\u8F6C\u6362\u503C\u6709 toJSON \u65B9\u6CD5\u76F4\u63A5\u8C03\u7528",paraId:63,tocIndex:37},{value:"\u5728\u57FA\u672C\u6570\u636E\u7C7B\u578B\u4E2D\uFF0Cundefined/symbol/function \u5904\u7406\u4E3A undefined\uFF0Cnull/Infinity \u5904\u7406\u4E3A \u201Cnull\u201D",paraId:63,tocIndex:37},{value:"\u5728 Array \u4E2D\uFF0Cundefined/symbol/function \u5904\u7406\u4E3A \u201Cnull\u201D\uFF1B\u5728\u975E\u6570\u7EC4\u5BF9\u8C61\u4E2D\uFF0Cundefined/symbol/function \u4F1A\u88AB\u5FFD\u7565",paraId:63,tocIndex:37},{value:"\u6240\u6709\u4EE5 symbol \u4E3A\u5C5E\u6027\u952E\u7684\u5C5E\u6027\u90FD\u4F1A\u88AB\u5B8C\u5168\u5FFD\u7565\u6389",paraId:63,tocIndex:37},{value:`function jsonStringify(data) {
  let type = typeof data;
  //\u57FA\u7840\u7C7B\u578B\u6216\u8005function
  if (type !== 'object') {
    let result = data;
    //\u5904\u7406NaN\u548CInfinity
    if (Number.isNaN(data) || data === Infinity || data === -Infinity) {
      return 'null';
    }
    //\u5904\u7406function/undefined/symbol
    else if (type === 'function' || type === 'undefined' || type === 'symbol') {
      return undefined;
    }
    //\u5904\u7406string
    else if (type === 'string') {
      result = \`"\${data}"\`;
    }
    return String(result);
  }
  //\u5F15\u7528\u7C7B\u578B\u6216\u8005null
  else {
    //\u5904\u7406null
    if (data === null) {
      return 'null';
    }
    //\u5982\u679C\u81EA\u5E26toJSON()\u65B9\u6CD5\uFF0C\u76F4\u63A5\u8C03\u7528
    else if (data.toJSON && typeof data.toJSON === 'function') {
      return jsonStringify(data.toJSON());
    }
    //\u5904\u7406Array
    else if (Array.isArray(data)) {
      let result = [];
      data.forEach((item, index) => {
        if (type === 'function' || type === 'undefined' || type === 'symbol') {
          result[index] = 'null';
        } else {
          result[index] = jsonStringify(item);
        }
      });
      result = \`[\${result}]\`;
      return result.replace(/'/g, '"');
    }
    //\u5904\u7406\u666E\u901A\u5BF9\u8C61
    else {
      let result = [];
      Object.keys(data).forEach((item) => {
        //key \u5982\u679C\u662F symbol\uFF0C\u5FFD\u7565
        if (typeof item !== 'symbol') {
          //\u952E\u503C\u5982\u679C\u662F undefined\u3001function\u3001symbol \u4E3A\u5C5E\u6027\u503C\uFF0C\u5FFD\u7565
          if (
            data[item] !== undefined &&
            typeof data[item] !== 'function' &&
            typeof data[item] !== 'symbol'
          ) {
            result.push(\`"\${item}":\${jsonStringify(data[item])}\`);
          }
        }
      });
      return \`{\${result}}\`.replace(/'/g, '"');
    }
  }
}
`,paraId:64,tocIndex:37},{value:"\u5B9E\u73B0\u81EA\u5B9A\u4E49\u4E8B\u4EF6\u7684\u8BA2\u9605\u4E0E\u53D1\u5E03\uFF0C\u4E3B\u8981\u5305\u542B on\u3001off\u3001emit\u3001once\u3001alloff \u65B9\u6CD5",paraId:65,tocIndex:38},{value:"on \u6307\u5B9A\u4E8B\u4EF6\u6DFB\u52A0\u7684\u76D1\u542C\u5668\u53EF\u4EE5\u6301\u7EED\u4E0D\u65AD\u5730\u76D1\u542C\u76F8\u5E94\u7684\u4E8B\u4EF6",paraId:66,tocIndex:38},{value:"once \u6DFB\u52A0\u7684\u76D1\u542C\u5668\uFF0C\u76D1\u542C\u4E00\u6B21\u540E\uFF0C\u5C31\u4F1A\u88AB\u6D88\u9664",paraId:66,tocIndex:38},{value:"off \u5220\u9664\u6307\u5B9A\u4E8B\u4EF6\u7684\u6307\u5B9A\u76D1\u542C\u5668",paraId:66,tocIndex:38},{value:"allOff \u5220\u9664\u6307\u5B9A\u4E8B\u4EF6\u7684\u5168\u90E8\u76D1\u542C\u5668",paraId:66,tocIndex:38},{value:"emit \u6267\u884C\u6307\u5B9A\u4E8B\u4EF6\u7684\u5168\u90E8\u76D1\u542C\u5668",paraId:66,tocIndex:38},{value:`function EventEmit() {
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
`,paraId:67,tocIndex:38},{value:"map() \u65B9\u6CD5\u521B\u5EFA\u4E00\u4E2A\u65B0\u6570\u7EC4\uFF0C\u5176\u7ED3\u679C\u662F\u8BE5\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E2A\u5143\u7D20\u662F\u8C03\u7528\u4E00\u6B21\u63D0\u4F9B\u7684\u51FD\u6570\u540E\u7684\u8FD4\u56DE\u503C",paraId:68,tocIndex:39},{value:`var new_array = arr.map(function callback(currentValue[, index[, array]]) {
 // Return element for new_array
}[, thisArg])
Array.prototype.map = function (callback, thisArg) {
  if (this === null) {
    throw new TypeError("Cannot read property 'map' of null");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }
  //\u83B7\u53D6\u5F53\u6570\u636E\u548C\u5F53\u524Dthis
  let O = Object(this);
  let T = thisArg;
  let len = O.length >>> 0;
  let A = new Array(len); //\u521B\u5EFA\u65B0\u7684\u6570\u636E
  let k = 0;
  while (k < len) {
    if (k in O) {
      let kValue = O[k]; //\u5F53\u524D\u6570\u636E
      A[k] = callback.call(T, kValue, k, O);
    }
    k++;
  }
  return A;
};
`,paraId:69,tocIndex:39}]}}]);

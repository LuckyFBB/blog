---
title: 简单聊聊 SWC
group:
  title: SWC
  order: 2
order: 0
---

> 随着在编译中越来越卷，SWC 由于速度极快也出现在大众的视野中，本文会简单介绍一下 SWC。[前文](/engineering/base-babel)中有对 Babel 做相关介绍，大家可以一起阅读。

## SWC 是什么？

<aside>
💡 SWC(Speedy Web Complier) is a super-fast TypeScript / JavaScript compiler written in Rust.
</aside>

SWC 出现的很大部分原因其实是替换掉工程中的 Babel，因此它的功能和 Babel 差不多。

最大的区别可能就是：SWC is father than Babel

<aside>
🏎️ SWC is 20x faster than Babel on a single thread and 70x faster on four cores.
</aside>

🤔️ 其实 SWC 快的原因是由于底层语言 Rust 带来的。

<aside>
🧤 JavaScript is single-threaded. The JS thread is not a good place to do heavy computation.
</aside>

## SWC 怎么用？

和 babel 一样，提供了命令行工具包 **`@swc/cli`** 和核心包 **`@swc/core`**

```json
pnpm swc ./src/code.js  // 将文件编译输出到控制台
```

一样的在 **`@swc/core`** 包中也导出相关的 Node API 供大家使用。

```js
const swc = require('@swc/core');
const path = require('path');
const fs = require('fs');

swc
  .transformFile(path.join(__dirname, './code.js'), {
    sourceMaps: true,
    isModule: false,
    jsc: {
      parser: {
        syntax: 'ecmascript',
      },
      transform: {},
    },
    env: {
      targets: {
        ie: '8',
      },
    },
  })
  .then((output) => {
    fs.writeFileSync(path.join(__dirname, './targetCode.js'), output.code, {
      encoding: 'utf-8',
    });
  });
```

通过`swc.parser`也能够拿到 AST 相关数据

### 关于配置

```js
const arr = [1, 2, 3, 4];
const arr1 = [...arr];
arr.includes(1);
const p = new Promise((resolve, reject) => {
  resolve('FBB');
});

class Person {
  constructor() {}
  say(word) {
    console.log(':::', word);
  }
}
```

#### target

当我们在配置中写入对应的`browserslist`，swc 能够将对应的语法转换到浏览器支持的语法

[https://github.com/swc-project/swc/issues/104](https://github.com/swc-project/swc/issues/104)

```js
{
    "jsc": {
        "parser": {
            "syntax": "ecmascript"
        },
    },
    "env": {
        "targets": {
            "ie": "8"
        },
    }
}
```

将会被编译为如下代码：

```js
function _array_like_to_array(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _array_without_holes(arr) {
  if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function _class_call_check(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _create_class(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _iterable_to_array(iter) {
  if (
    (typeof Symbol !== 'undefined' && iter[Symbol.iterator] != null) ||
    iter['@@iterator'] != null
  )
    return Array.from(iter);
}
function _non_iterable_spread() {
  throw new TypeError(
    'Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
  );
}
function _to_consumable_array(arr) {
  return (
    _array_without_holes(arr) ||
    _iterable_to_array(arr) ||
    _unsupported_iterable_to_array(arr) ||
    _non_iterable_spread()
  );
}
function _unsupported_iterable_to_array(o, minLen) {
  if (!o) return;
  if (typeof o === 'string') return _array_like_to_array(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === 'Object' && o.constructor) n = o.constructor.name;
  if (n === 'Map' || n === 'Set') return Array.from(n);
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _array_like_to_array(o, minLen);
}
var arr = [1, 2, 3, 4];
var arr1 = _to_consumable_array(arr);
arr.includes(1);
var p = new Promise(function (resolve, reject) {
  resolve('FBB');
});
var Person = /*#__PURE__*/ (function () {
  'use strict';
  function Person() {
    _class_call_check(this, Person);
  }
  _create_class(Person, [
    {
      key: 'say',
      value: function say(word) {
        console.log(':::', word);
      },
    },
  ]);
  return Person;
})();
```

#### mode

和 babel 的 useBuiltIns 配置一样，[swc/mode](https://swc.rs/docs/configuration/supported-browsers#mode)

[https://github.com/swc-project/swc/issues/397](https://github.com/swc-project/swc/issues/397)

```js
{
    "jsc": {
        "parser": {
            "syntax": "ecmascript"
                }
    },
    "env": {
        "targets": {
            "ie": "8"
        },
        "mode": "usage",
        "coreJs": "3.22"
    }
}
```

将会被编译为如下代码：

```js
function _array_like_to_array(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _array_without_holes(arr) {
  if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function _class_call_check(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _create_class(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _iterable_to_array(iter) {
  if (
    (typeof Symbol !== 'undefined' && iter[Symbol.iterator] != null) ||
    iter['@@iterator'] != null
  )
    return Array.from(iter);
}
function _non_iterable_spread() {
  throw new TypeError(
    'Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
  );
}
function _to_consumable_array(arr) {
  return (
    _array_without_holes(arr) ||
    _iterable_to_array(arr) ||
    _unsupported_iterable_to_array(arr) ||
    _non_iterable_spread()
  );
}
function _unsupported_iterable_to_array(o, minLen) {
  if (!o) return;
  if (typeof o === 'string') return _array_like_to_array(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === 'Object' && o.constructor) n = o.constructor.name;
  if (n === 'Map' || n === 'Set') return Array.from(n);
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _array_like_to_array(o, minLen);
}
import 'core-js/modules/es.array.includes.js';
import 'core-js/modules/es.string.includes.js';
import 'core-js/modules/es.promise.js';
import 'core-js/modules/es.object.to-string.js';
var arr = [1, 2, 3, 4];
var arr1 = _to_consumable_array(arr);
arr.includes(1);
var p = new Promise(function (resolve, reject) {
  resolve('FBB');
});
var Person = /*#__PURE__*/ (function () {
  'use strict';
  function Person() {
    _class_call_check(this, Person);
  }
  _create_class(Person, [
    {
      key: 'say',
      value: function say(word) {
        console.log(':::', word);
      },
    },
  ]);
  return Person;
})();
```

#### helper function

就如同我们在 babel 上说的一样，每一个都会引入这么多的辅助函数，明显不是我们所期望的，swc 也通过配置解决了这个问题

```js
{
    "jsc": {
        "parser": {
            "syntax": "ecmascript"
        },
        "externalHelpers": true
    },
    "env": {
        "targets": {
            "ie": "8"
        },
        "mode": "usage",
        "coreJs": "3.22"
    }
}
```

将会被编译为如下代码：

```js
import { _ as _class_call_check } from '@swc/helpers/_/_class_call_check';
import { _ as _create_class } from '@swc/helpers/_/_create_class';
import { _ as _to_consumable_array } from '@swc/helpers/_/_to_consumable_array';
import 'core-js/modules/es.array.includes.js';
import 'core-js/modules/es.string.includes.js';
import 'core-js/modules/es.promise.js';
import 'core-js/modules/es.object.to-string.js';
var arr = [1, 2, 3, 4];
var arr1 = _to_consumable_array(arr);
arr.includes(1);
var p = new Promise(function (resolve, reject) {
  resolve('FBB');
});
var Person = /*#__PURE__*/ (function () {
  'use strict';
  function Person() {
    _class_call_check(this, Person);
  }
  _create_class(Person, [
    {
      key: 'say',
      value: function say(word) {
        console.log(':::', word);
      },
    },
  ]);
  return Person;
})();
```

在 swc 中，将所有的辅助函数放在了`@swc/helpers`中，也不需要像 babel 那样去引入额外的 plugin 来解决这个问题。

### 关于 Plugin

在 SWC 中，也可以编写 JS plugin，但是提供的相关 API 是比较局限的。

[plugin-utils/src/visitor.ts at master · swc-project/plugin-utils](https://github.com/swc-project/plugin-utils/blob/master/src/visitor.ts)

编写 SWC 的 JS plugin 时，需要继承 Visitor，然后通过访问对应的 AST 节点，对对应的 AST 节点进行处理的到我们想要的节点内容，返回回来

```js
const Visitor = require('@swc/core/Visitor').default;

class ConsoleStripper extends Visitor {
  visitCallExpression(expression) {
    if (expression.callee.type !== 'MemberExpression') {
      return expression;
    }
    if (
      expression.callee.object.type === 'Identifier' &&
      expression.callee.object.value === 'console'
    ) {
      if (expression.callee.property.type === 'Identifier') {
        expression.arguments = [...expression.arguments];
        expression.arguments.unshift({
          spread: null,
          expression: {
            type: 'StringLiteral',
            span: expression.span,
            value: `filename: ${expression.span.start} and ${expression.span.end}`,
            raw: `filename: ${expression.span.start} and ${expression.span.end}`,
          },
        });
        return {
          ...expression,
        };
      }
    }

    return expression;
  }
}
```

当我们想要使用这个插件时，需要在 option 中声明该 plugin

```js
swc
  .transformFile(path.join(__dirname, './code.js'), {
    plugin: (m) => new ConsoleStripper().visitProgram(m),
  })
  .then((output) => {
    fs.writeFileSync(path.join(__dirname, './targetCode.js'), output.code, {
      encoding: 'utf-8',
    });
  });
```

[formatjs/packages/swc-plugin/tests/utils.ts at main · formatjs/formatjs](https://github.com/formatjs/formatjs/blob/main/packages/swc-plugin/tests/utils.ts)

## SWC 编译

<aside>
🎗️ 我们使用的上述 API，其实都是从二进制文件里面获取到的。
</aside>

例如上述我们调用 transformFile 时，其源码如下

```js
transformFile(path, options) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        //....
        const { plugin } = options, newOptions = __rest(options, ["plugin"]);
				//....
        if (plugin) {
            const m = yield this.parseFile(path, (_c = options === null || options === void 0 ? void 0 : options.jsc) === null || _c === void 0 ? void 0 : _c.parser);
            return this.transform(plugin(m), newOptions);
        }
        return bindings.transformFile(path, false, toBuffer(newOptions));
    });
}
```

在无 plugin 的情况下，调用的是`bindings.transformFile`，有 plugin 的情况下调用的是`this.transform`，在`this.transform`中也会调用`bindings.xxx`方法

那 bindings 是啥呢？

```js
const bindings = (() => {
  let binding;
  try {
    binding = !!bindingsOverride
      ? require((0, path_1.resolve)(bindingsOverride))
      : require('./binding');
    // If native binding loaded successfully, it should return proper target triple constant.
    const triple = binding.getTargetTriple();
    assert.ok(triple, 'Failed to read target triple from native binary.');
    return binding;
  } catch (_) {
    // postinstall supposed to install `@swc/wasm` already
    fallbackBindings = require('@swc/wasm');
  } finally {
    return binding;
  }
})();
```

binding 文件中是对 platform 和 arch 的判断，然后返回不同的 nativeBinding，最后我们使用的相关 Node API 就是从 nativeBinding 中获取到的

![Untitled](/blog/imgs/swc/Untitled.png)

![Untitled](/blog/imgs/swc/Untitled%201.png)

大体的流程图如下：

![Untitled](/blog/imgs/swc/Untitled%202.png)

## 总结

整体来说，SWC 和 Babel 是大同小异的，但是 SWC 在速度上完胜 Babel，一方面是 Rust 语言和 JS 的差距，另一方面是 SWC 相关的 API 均已经编译成为了二进制文件。

---
title: 国际化利器 Intl Messageformat
group:
  title: 国际化
  order: 5
order: 0
---

<style>
    .quote {
        background-color: #f9f1db;
        padding: 10px;
        border-radius: 8px;
        font-weight: 500;
    }
</style>

<div class="quote">Formats ICU Message strings with number, date, plural, and select placeholders to create localized messages.</div>

## ICU 信息语法

[ICU](https://github.com/unicode-org/icu) 是 International Components for Unicode 的简称。处理多语言和复杂文本模板提供了一种标准化的语法。它的主要用途是通过模板描述消息内容，并根据上下文（如语言、复数规则、性别等）动态生成格式化的字符串。

### 核心功能

**动态插值**

在模板中插入变量值，格式为`{key, type, format}`

```
Hello, {name}!
I have {workNum, number} things to do
Almost {pctBlack, number, percent} of them are black.
```

变量`{key}`会被实际值替换，例如：`Hello, FBB!`

**复数规则(Plurals)**

处理与数量相关的消息变化，格式为`{key, plural, matches}`

```
{count, plural, =0{no items} one {1 item} other {# items}}
```

会根据传入的 count 会动态处理成合适的文本

```
count = 0   ===>   no items
count = 1   ===>   1 item
count = 4   ===>   4 items
```

**条件选择(Select)**

基于条件选择消息内容，格式为`{key, select, matches}`

```
{gender, select, male {He} female {She} other {They}} liked your post.
```

会根据 gender 的传入动态输出

```
gender = male     ===>   He liked your post.
gender = female   ===>   She liked your post.
gender = other    ===>   They liked your post.
```

**日期与时间格式化**

格式化日期和时间值

```
The event is scheduled on {date, date, long}.
```

输出格式依赖于区域设置，如: `January 1, 2024`

### 总结

- 强大的模版支持，提供了多种模式供用户选择
- 跨平台支持，可以用于不同语言

## **Intl Messageformat**

Intl MessageFormat 是一个基于 JavaScript 实现的库，用于处理多语言国际化场景，主要功能是动态格式化文本消息。

```bash
pnpm add intl-messageformat
```

### 基础使用

```js
import { IntlMessageFormat } from 'intl-messageformat';

const formatter = new IntlMessageFormat('Hello, {name}!');
const message = formatter.format({ name: 'World' });
```

```js
const formatter = new IntlMessageFormat(
  '{count, plural, =0{no items} one {1 item} other {# items}}',
);
const message = formatter.format({ count: 0 });
const message1 = formatter.format({ count: 1 });
const message2 = formatter.format({ count: 10 });

console.log(message, message1, message2); // no items 1 items 10 items
```

发现了一个小小的问题，为什么在`{ count: 1 }`的时候，输出的是`1 items`？

`IntlMessageFormat`还接受其他的参数，第二个参数为`locales`用于指定当前的语言。
如果不特殊指定会通过`new Intl.NumberFormat().resolvedOptions().locale`获取默认值，此时的默认值为`zh-CN`，无法处理`one`这条规则，因此匹配到了`other`这条规则。
在`locale`为`en`的语言下能够成为我们的期望值。

那么我们只能更改传入的`message`

```js
const formatter = new IntlMessageFormat(
  '{count, plural, =0{no items} =1{1 item} other {# items}}',
);
const message = formatter.format({ count: 0 });
const message1 = formatter.format({ count: 1 });
const message2 = formatter.format({ count: 10 });

console.log(message, message1, message2); // no items 1 item 10 items
```

在我们的产品中会有这样的场景，每月 x 号，每周星期 x 的情况，当我们做国际化的时候就可以使用 ICU 信息来做。

```js
const message = `The {day, selectordinal,
    one {#st}
    two {#nd}
    few {#rd}
    other {#th}
} day of month`;
const formatter = new IntlMessageFormat(message, 'en');

console.log(formatter.format({ day: 22 })); // The 22nd day of month
console.log(formatter.format({ day: 26 })); // The 26th day of month
```

这里又出来一种新的类型`selectordinal`，主要用于处理序数词，适用于描述顺序或排名。

`one/two/few/other` 分别对应着不同的序数形式。`one`通常用于以 1 结尾的数字除了 11），`two` 用于以 2 结尾的数字除了 12），`few`用于以 3 结尾的数字(除了 13），而`other`则用于所有其他情况。

### 自定义 formatter

在`intl-messageformat`中，您可以为消息模板中的自定义类型定义自己的格式化逻辑。例如，默认支持`number`、`date`和`time`类型，但通过自定义`formatters`，您可以添加自己的格式化类型或扩展现有类型。

```js
const customFormatters = {
  getDateTimeFormat(locales, options) {
    const originalFormatter = new Intl.DateTimeFormat(locales, options);
    return {
      format: (value) => `📅 ${originalFormatter.format(value)}`,
    };
  },
};

const message = new IntlMessageFormat(
  'The event is on {eventDate, date}',
  'en',
  {},
  { formatters: customFormatters },
);

const msg = message.format({ eventDate: new Date('2024-01-01') });
console.log(msg); // The event is on 📅 1/1/2024
```

在[`formatters`](https://github.com/formatjs/formatjs/blob/main/packages/intl-messageformat/src/formatters.ts#L49)中只能定义`getNumberFormat/getDateTimeFormat/getPluralRules`三种类型方法

在前面的时候我们说到`{pctBlack, number, percent}/{date, date, long}`，最后一个称为`style`可以用于扩展内置的格式化功能

```ts
const customFormatters = {
  getDateTimeFormat(locales, style) {
    if (style === 'customDate') {
      const originalFormatter = new Intl.DateTimeFormat(locales, style);
      return {
        format: (value) => `📅 ${originalFormatter.format(value)} 📅`,
      };
    }
    return Intl.DateTimeFormat(locales, style);
  },
};

const message = new IntlMessageFormat(
  'The event is on {eventDate, date, customDate}',
  'en',
  { date: { customDate: 'customDate' } },
  { formatters: customFormatters },
);

const msg = message.format({ eventDate: new Date('2024-01-01') });
console.log(msg); // The event is on 📅 1/1/2024 📅
```

### 总结

在我们后续如果要去国际化的时候，遇到一些需要做单复数/数词的时候，应该去修改我们的英文 JSON，最后在子产品内部调用`I18N.get`方法即可。因为在`get`方法使用了`IntlMessageFormat`去做转换

## **Intl Messageformat 的实现原理**

Intl Messageformat 需要将传入的`message`做一个拆解，获取到对应`{}`中的数据，在 `format`的时候通过传入的数据做填充。

### icu-m**essageformat-parser**

针对于`icu message string`官方提供了对应的`parser`来解析，和我们生成`AST`一样，会生成固定类型的数据。

```js
import { parse } from '@formatjs/icu-messageformat-parser';

const ast = parse(
  'Hello, {name}! You have {count, plural, one {# message} other {# messages}}.',
);

// [
//   { type: 0, value: "Hello, " },
//   { type: 1, value: "name" },
//   { type: 0, value: "! You have " },
//   {
//     type: 6,
//     value: "count",
//     options: {
//       "=0": { value: [{ type: 0, value: "no items" }] },
//       one: { value: [{ type: 0, value: "1 item" }] },
//       other: { value: [{ type: 7 }, { type: 0, value: " items" }] },
//     },
//     offset: 0,
//     pluralType: "cardinal",
//   },
//   { type: 0, value: "." },
// ]
```

### format 方法

```js
const message =
  'Hello, {name}! You have {count, plural, =0{no items} one {1 item} other {# items}}.';
const formatter = new IntlMessageFormat(message, 'en');
formatter.format({ name: 'World', count: 0 });
```

当我们调用`format`的时候，其实就是遍历上述的`AST`，针对于不同的`type`使用不同的`formatter`

处理好数据。

```js
// 处理普通文本
if (isArgumentElement(el)) {
  if (!value || typeof value === 'string' || typeof value === 'number') {
    value =
      typeof value === 'string' || typeof value === 'number'
        ? String(value)
        : ''
  }
  result.push({
    type: typeof value === 'string' ? PART_TYPE.literal : PART_TYPE.object,
    value,
  } as ObjectPart<T>)
}

// 处理 Date
if (isDateElement(el)) {
  const style =
    typeof el.style === 'string'
      ? formats.date[el.style]
      : isDateTimeSkeleton(el.style)
        ? el.style.parsedOptions
        : undefined
  result.push({
    type: PART_TYPE.literal,
    value: formatters.getDateTimeFormat(locales, style).format(value as number),
  })
}
```

## 总结

`Intl MessageFormat`是一个功能强大且成熟的国际化工具。通过结合`ICU`信息语法和 JS 的`Intl API`，它能够为多语言应用提供高效、灵活的消息格式化解决方案

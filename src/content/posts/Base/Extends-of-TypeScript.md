---
title: TypeScript 之 extends
group:
  title: TS 基础
  order: 2
order: 0
---

extends 在 TS 中比较常用，但是也拥有不同的使用场景

- 表示继承/拓展的含义
- 表示约束的含义
- 表示分配的含义

## 基础使用

extends 是在 ES6 中引用的关键字，常常 class 用于继承

### 继承父类

和在 JS 中的使用一致

```ts | pure
class Animal {
  name = 'animal';
  constructor(name) {
    this.name = name;
  }
  sayHello() {
    console.log(`Hello, I am a ${this.name}!`);
  }
}

class Dog extends Animal {
  constructor(props) {
    super(props);
  }
  bark() {
    console.log('wang wang');
  }
}

const dog = new Dog('dog');
console.log(dog.name); // dog
dog.sayHello(); // Hello, I am a dog!
dog.bark(); // wang wang
```

### 继承类型

```ts | pure
interface Animal {
  sayHello: () => void;
}

interface Dog extends Animal {
  bark: () => void;
}

// Dog
// {
//     sayHello: () => void;
//     bark: () => void
// }
```

## 条件判断

如果是 `extends` 两侧类型相同的，此时的 `extends` 等同于 `===`

```ts | pure
type result1 = 'ab' extends 'abc' ? true : false; // false
type result2 = 123 extends 123 ? true : false; // true
```

如果位于 `extends` 右侧的类型包含位于 `extends` 左侧的类型，即狭窄类型 `extends` 宽泛类型

```ts | pure
type result1 = string extends string | number ? true : false; // true
type result2 = boolean extends string | number ? true : false; // false
```

如果左右侧是对象时，如果对象中的 `key` 越多说明该对象定义的范围更为狭窄

```ts | pure
type result1 = { name: string; age: number } extends { name: string }
  ? true
  : false; // true
type result2 = { name: string } extends { name: string; age: number }
  ? true
  : false; // false
```

能够发现为对象时，`A extends B` 表示的是 A 是否可以分配给 B，而不是 A 是否为 B 的子集

## 泛型类型

在使用泛型的时候，往往希望对某一个泛型做一个限制，例如我们在使用 Redux 的时候都会给 dispatch 传入一个 type

```ts | pure
interface Dispatch<T extends { type: string }> {
  (action: T): T;
}
```

当泛型用于条件判断时，例如下述例子:

```ts | pure
type Test<T, U> = T extends U ? never : T;

type A = Test<'a' | 'b' | 'c', 'a'>;
```

那么 A 会是什么类型呢？在第一个条件判断中我们讲到的方式解答该问题即为 `T("a" | "b" | "c")`。可正确答案却为 `"b" | "c"`

> When conditional types act on a generic type, they become distributive when given a union type.

在[官网](https://www.typescriptlang.org/zh/docs/handbook/2/conditional-types.html#%E5%88%86%E9%85%8D%E6%9D%A1%E4%BB%B6%E7%B1%BB%E5%9E%8B)中，当传入的类型参数为联合类型时，他们会被分配类型，即联合类型会被拆分。

```ts | pure
Test<"a" | "b" | "c", "a">
// 等价于
'a' extends 'a' ? never : 'a'
'b' extends 'a' ? never : 'b'
'c' extends 'a' ? never : 'c'
```

那么答案即为 `never | 'b' | 'c'`，never 可以分配给任何类型，但是没有类型可以分配给 never，因此答案为 `'b' | 'c'`

只有在满足两个条件的时候才能适用分配律

- 参数是泛型类型
- 代入参数的是联合类型

上述的实现则为 TS 中工具类型 `Exclude` 的实现

```ts | pure
type Exclude<T, U> = T extends U ? never : T;
```

另一个工具类型 Omit 则是借助 Exclude 实现的

```ts | pure
interface Person {
  name: string;
  age: number;
  description: string;
}

type Person1 = Omit<Person, 'description'>;
```

`Omit<T,U>` 需要过滤掉 T 中的 U

```ts | pure
type Omit<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P];
};
```

如何终止这种分配？

```ts | pure
type P<T> = [T] extends ['x'] ? string : number;
type A1 = P<'x' | 'y'>; // number
```

在条件判断类型的定义中，将泛型参数使用`[]`括起来，即可阻断条件判断类型的分配，此时，传入参数 T 的类型将被当做一个整体，不再分配。

## 类型推导

> `infer`  表示在  `extends`  条件语句中待推断的类型变量

在 TS 中，一般会结合 `extends` 来使用类型推导 `infer` 语法，实现自动推导类型。

例如工具类型 ReturnType

```ts | pure
type ReturnType<T> = T extends (...args: any) => infer R ? R : never;
```

其中 `infer R` 表示待推导的类型，表示 T 如果能赋值给 `(...args: any) => infer R`，则结果为 R 否则为 never

另一个例子，获取参数

```ts | pure
type ParamType<T> = T extends (...args: infer P) => P : never
```

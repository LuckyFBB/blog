---
title: 数组
group:
  title: 基础
  order: 1
order: 0
---

#### 数组的创建

```js
var array = new Array(); //声明并初始化一个数组
var array = new Array(7); //创建指定长度的数组
var array = new Array(1, 2, 3, 4); //直接将数组元素作为参数传递给它的构造器

var array = []; //方便快捷

array.length; //数组中有多少元素
```

#### 添加和删除元素

```js
var number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
number[number.length] = 5; //使用number.length属性添加元素

number.push(6); //使用push()方法，在末尾添加元素，返回数组长度

number.unshift(6); //使用shift()方法，在头部添加元素，返回数组长度

number.pop(); //使用pop()方法，在末尾删除元素，返回删除值

number.shift(); //使用shift()方法，在首部删除元素，返回删除值

number.splice(5, 0, 1, 2, 3); //使用splice方法，第一个参数表示想要删除或插入的元素的索引值。第二个参数是删除元素的个数。第三个参数往后，就是要添加到数组里的值。如果第二个参数是0，表示插入元素。
```

#### 数组方法参考

1. 数组合并

```js
var array = [1, 2, 3];
var number = array.concat(4);
var number = array.concat([4, 5, 6]); //concat方法可以向一个数组传递数组、对象或是元素
```

2. 迭代器函数
   [迭代器函数的使用方法](https://luckyfbb.github.io/blog.github.io/2019/03/07/JS%E8%BF%AD%E4%BB%A3%E5%87%BD%E6%95%B0/)

3. 搜索和排序

- 搜索

```js
//indexOf方法返回与参数匹配的第一个元素的索引，lastIndexOf返回与参数匹配的最后一个元素的索引
var number = [1, 2, 3, 4, 5, 2];
number.indexOf(2); //1
number.lastIndexOf(2); //1
number.indexOf(100); //-1
```

- 排序

```js
var num = number.reverse(); //reverse方法，数组内元素就会反序，改变原数组
var num = number.sort(); //sort方法，数组内元素排序，可接受函数作为参数自定义排序，改变原数组
```

4. 输出数组为字符串

```js
var number = [1, 2, 3, 4];
number.toString(); //"1,2,3,4"，把数组里所有元素输出为一个字符
number.join('-'); //"1-2-3-4"，用一个不同的分隔符（比如-）把元素隔开
```

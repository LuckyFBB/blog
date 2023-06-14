---
title: 集合
group:
  title: 基础
  order: 1
order: 3
---

集合是由一组无序且唯一（即不能重复）的项组成的。

可以把集合想象成一个既没有重复元素，也没有顺序概念的数组。

#### 创建集合

```js
function Set() {
  var items = {};

  this.has = function (value) {
    //判断该值是否在集合中，在则返回true，否则返回false
    return items.hasOwnProperty(value);
  };

  this.add = function (value) {
    //向集合中添加元素
    if (!this.has(value)) {
      //判断该值是否在集合中
      items[value] = value;
      return true;
    }
    return false;
  };

  this.remove = function (value) {
    //删除某个值
    if (this.has(value)) {
      //判断集合中是否有这个值
      delete items[value];
      return true;
    }
    return false;
  };

  this.clear = function () {
    //清空集合
    items = {};
  };

  this.size = function () {
    return Object.keys(items).length;
  };

  this.values = function () {
    //返回当前集合的元素
    return Object.keys(items);
  };

  this.union = function (otherSet) {
    //求两个集合的并集
    var unionSet = new Set(); //新建集合
    var values = this.values();
    values.forEach((item) => {
      unionSet.add(item);
    });
    values = otherSet.values();
    values.forEach((item) => {
      unionSet.add(item);
    });
    return unionSet;
  };

  this.intersection = function (otherSet) {
    //求两个集合的交集
    var intersectionSet = new Set();
    var values = this.values();
    values.forEach((item) => {
      if (otherSet.has(item)) {
        intersectionSet.add(item);
      }
    });
    return intersectionSet;
  };

  this.difference = function (otherSet) {
    //求两个集合的差集
    var differenceSet = new Set();
    var values = this.values();
    values.forEach((item) => {
      if (!otherSet.has(item)) {
        differenceSet.add(item);
      }
    });
    return differenceSet;
  };

  this.subSet = function (otherSet) {
    //求当前集合是否是另一个集合的子集
    if (this.size() > otherSet.size()) {
      return false;
    } else {
      var values = this.values;
      values.forEach((item) => {
        if (!otherSet.has(item)) {
          return false;
        }
        return true;
      });
    }
  };
}
```

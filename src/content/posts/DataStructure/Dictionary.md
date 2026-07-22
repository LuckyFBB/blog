---
title: 字典和散列表
group:
  title: 基础
  order: 1
order: 4
---

在集合、字典、散列表中可以存储不重复的值。集合中感兴趣的是值的本身，我们将每个值作为元素来储存。在字典中，采用[键，值]的方式来储存数据。散列表和字典存储数据的方式差不多。但是在实现上略微不同。

#### 字典

##### 创建一个字典

```js
function Dictionary() {
  var items = {};

  this.has = function (key) {
    //判断该字典中是否含有key，如果某个键值存在于这个字典中，则返回true，反之则返回false。
    return key in items;
  };

  this.set = function (key, value) {
    //向字典中添加新元素或者更新一个已有的值
    items[key] = value;
  };

  this.remove = function (key) {
    //通过使用键值来从字典中移除键值对应的数据值
    if (this.has(key)) {
      //判断是否存在当前键值
      delete items[key];
      return true;
    }
    return false;
  };

  this.get = function (key) {
    //通过键值查找特定的数值并返回
    return this.has(key) ? items[key] : undefined;
  };

  this.values = function () {
    //将字典所包含的所有数值以数组形式返回
    return Object.values(items);
  };

  this.size = function () {
    //返回字典所包含元素的数量。与数组的length属性类似
    return Object.keys(items).length;
  };

  this.keys = function () {
    //将字典所包含的所有键名以数组形式返回
    return Object.keys(items);
  };

  this.clear = function () {
    //将这个字典中的所有元素全部删除
    items = {};
  };

  this.getItems = function () {
    return items;
  };
}
```

#### 散列表

散列表的作用就是尽可能快的在数据结构中找到一个值。在之前的数据结构中，使用 get 方法获取一个值，需要遍历整个数据结构。但是使用散列表的话，就能够知道值得具体位置，从而快速获取到该值。

散列表的作用就是给一个值，然后返回该值在表中的地址。

##### 创建一个散列表

```js
function HashTable() {
  var table = [];
  var loseloseHashCode = function (key) {
    //散列函数
    var hash = 0; //储存hash值
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i); //获得每个字符的ascii码值
    }
    return hash % 39; //为了使储存的地址值小一点，会采用hash值和任意值取余数
  };

  this.put = function (key, value) {
    //向散列表增加一个新的项（也能更新散列表）。
    var position = loseloseHashCode(key); //计算出hash值，也就是存放新项的地址
    table[position] = value;
  };

  this.get = function (key) {
    //返回根据键值检索到的特定的值
    return table[loseloseHashCode(key)];
  };

  this.remove = function (key) {
    //根据键值从散列表中移除值
    table[loseloseHashCode(key)] = undefined;
  };
}
```

##### 散列表的冲突处理

有时候，一些键会有相同的散列值。不同的值在散列表中对应相同位置的时候，我们称其为冲突。

1. 分离连接

   分离链接法包括为散列表的每一个位置创建一个链表并将元素储存在里面。它是解决冲突最简单的方法，但是需要开辟新的空间。

   ![图片](https://github.com/LuckyFBB/Front-End-Examples/assets/38368040/6d9a22ca-d71d-4cde-aa81-d39ecc673d7b)

   ```js
   function HashTable() {
     var table = [];
     var loseloseHashCode = function (key) {
       //散列函数
       var hash = 0; //储存hash值
       for (let i = 0; i < key.length; i++) {
         hash += key.charCodeAt(i); //获得每个字符的ascii码值
       }
       return hash % 39; //为了使储存的地址值小一点，会采用hash值和任意值取余数
     };

     var ValuePair = function () {
       //创建一个新类来辅助表示要加入链表的值
       this.key = key;
       this.value = value;
       this.toString = function () {
         return '[ ' + this.key + '-' + this.value + ' ]';
       };
     };

     this.put = function (key, value) {
       //向散列表增加一个新的项（也能更新散列表）。
       var position = loseloseHashCode(key); //计算出hash值，也就是存放新项的地址
       if (table[position] === undefined) {
         //判断当前地址中是否被占据
         table[position] = new LinkedList(); //没有的话，创建一个链表
       }
       table[position].append(new ValuePair(key, value)); //向链表中添加一个值
     };

     this.get = function (key) {
       //返回根据键值检索到的特定的值
       var position = loseloseHashCode(key); //计算出hash值，也就是存放新项的地址
       if (table[position]) {
         //当前位置存在元素
         var current = table[position].getHead(); //获取到当前链表的头部
         while (current) {
           if (current.element.key === key) {
             //判断当前节点的key
             return current.element.value;
           }
           current = current.next;
         }
       }
       return undefined;
     };

     this.remove = function (key) {
       //根据键值从散列表中移除值
       var position = loseloseHashCode(key); //计算出hash值，也就是存放新项的地址
       if (table[position]) {
         var current = table[position].getHead(); //获取链表头部
         while (current) {
           if (current.element.key === key) {
             table[position].remove(current.element); //移除当前节点
             if (table[position].isEmpty()) {
               //移除节点之后，当前链表为空，则设置为undefined
               table[position] = undefined;
             }
             return true;
           }
           current = current.next;
         }
       }
       return false;
     };
   }
   ```

2. 线性探查

   当想向表中某个位置加入一个新元素的时候，如果索引为 index 的位置已经被占据了，就尝试 index+1 的位置。如果 index+1 的位置也被占据了，就尝试 index+2 的位置，以此类推。

   ```js
   function HashTable() {
     var table = [];
     var loseloseHashCode = function (key) {
       //散列函数
       var hash = 0; //储存hash值
       for (let i = 0; i < key.length; i++) {
         hash += key.charCodeAt(i); //获得每个字符的ascii码值
       }
       return hash % 39; //为了使储存的地址值小一点，会采用hash值和任意值取余数
     };
     var ValuePair = function () {
       //创建一个新类来辅助表示要加入链表的值
       this.key = key;
       this.value = value;
       this.toString = function () {
         return '[ ' + this.key + '-' + this.value + ' ]';
       };
     };

     this.put = function (key, value) {
       //向散列表增加一个新的项（也能更新散列表）
       var position = loseloseHashCode(key); //计算出hash值，也就是存放新项的地址
       if (table[position] === undefined) {
         //当前地址没有数据，直接赋值
         table[position] === new ValuePair(key, value);
       } else {
         var index = ++position; //下一个地支值
         while (table[index] != undefined) {
           //找到从当前position出发，第一个不为undefined的值
           index++;
         }
         table[position] === new ValuePair(key, value);
       }
     };

     this.get = function (key) {
       //返回根据键值检索到的特定的值
       var position = loseloseHashCode(key); //计算出hash值，也就是存放新项的地址
       if (table[position]) {
         if (table[position].key === key) {
           //找到相同key值，返回value
           return table[position].value;
         } else {
           var index = ++position; //否则继续往下寻找
           while (table[index] === undefined || table[index].key != key) {
             index++;
           }
           if (table[index].key === key) {
             return table[index].value;
           }
         }
       }
       return undefined;
     };

     this.remove = function (key) {
       //根据键值从散列表中移除值
       var position = loseloseHashCode(key); //计算出hash值，也就是存放新项的地址
       if (table[position]) {
         if (table[position].key === key) {
           //找到相同key值，返回value
           table[position] = undefined;
         } else {
           var index = ++position; //否则继续往下寻找
           while (table[index] === undefined || table[index].key != key) {
             index++;
           }
           if (table[index].key === key) {
             table[position] = undefined;
           }
         }
         return true;
       }
       return false;
     };
   }
   ```

##### 创建更好的散列函数

我们实现的“lose lose”散列函数并不是一个表现良好的散列函数，它会产生太多的冲突。如果我们使用这个函数的话，会产生各种各样的冲突。

比较常用的散列函数

```js
var djb2HashCode = function (key) {
  var hash = 5381; //初始化hash值
  for (var i = 0; i < key.length; i++) {
    //迭代key值
    hash = hash * 33 + key.charCodeAt(i);
  }
  return hash % 1013; //返回最后的hash值
};
```

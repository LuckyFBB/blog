---
title: 栈、队列
group:
  title: 基础
  order: 1
order: 1
---

栈是一种遵从后进先出（LIFO）原则的有序集合。新添加的或待删除的元素都保存在栈的末尾，称作栈顶，另一端就叫栈底。在栈里，新元素都靠近栈顶，旧元素都接近栈底。

队列是遵循 FIFO（First In First Out，先进先出，也称为先来先服务）原则的一组有序的项。队列在尾部添加新元素，并从顶部移除元素。最新添加的元素必须排在队列的末尾。

#### 栈的创建

```js
function Stack() {
  var items = [];
  this.push = function (elememt) {
    //负责往栈里添加新元素，该方法只添加元素到栈顶
    items.push(elememt);
  };
  this.pop = function () {
    //用来移除栈里的元素，栈遵从LIFO原则，移出的是最后添加进去的元素
    return items.pop();
  };
  this.peek = function () {
    //返回栈顶元素
    return items[items.length - 1];
  };
  this.isEmpty = function () {
    //判断栈是否为空
    return items.length === 0;
  };
  this.size = function () {
    //返回栈的大小
    return items.length;
  };
  this.clear = function () {
    //用来移除栈里所有的元素，把栈清空
    items = [];
  };
}
```

#### 队列的创建

```js
function Queue() {
  var items = [];
  this.enqueue = function (element) {
    //这个方法负责向队列添加新元素，新的项只能添加到队列末尾
    items.push(element);
  };
  this.dequeue = function () {
    //负责从队列移除项，由于队列遵循先进先出原则，先添加的项也是最先被移除的
    return items.shift();
  };
  this.front = function () {
    //会返回队列最前面的项
    return items[0];
  };
  this.isEmpty = function () {
    //判断队列是否为空
    return items.length == 0;
  };
  this.clear = function () {
    //清空队列
    items = [];
  };
  this.size = function () {
    //返回队列的大小
    return items.length;
  };
}
```

#### 优先队列

元素的添加和删除基于优先级的。

```js
function PriorityQueue() {
  var items = [];
  function QueueElement(element, priority) {
    //要添加的元素和元素的优先级
    this.element = element;
    this.priority = priority;
  }
  this.enqueue = function (element, priority) {
    var queueElement = new QueueElement(element, priority);
    if (this.isEmpty) {
      //当队列为空的时候，直接添加元素
      item.push(queueElement);
    } else {
      var added = false;
      for (var i = 0; i < items.length; i++) {
        if (queueElement.priority < items[i].priority) {
          //添加元素的优先级和已有元素的优先级的比较
          items.splice(i, 0, queueElement); //插入元素
          added = true;
          break;
        }
      }
      if (!added) {
        //判断是否添加，如果没有的话，说明优先级最高，放到最后
        items.push(queueElement);
      }
    }
  };

  //其他方法和普通队列实现是一样的
}
```

#### 循环队列

循环队列的一个例子就是击鼓传花游戏（HotPotato）。在这个游戏中，孩子们围成一个圆圈，把花尽快地传递给旁边的人。某一时刻传花停止，这个时候花在谁手里，谁就退出圆圈结束游戏。重复这个过程，直到只剩一个孩子（胜者）。

```js
function hotPotato(nameList, num) {
  var queue = new queue(); //基本队列
  nameList.forEach((item) => queue.enqueue(item)); //把数据放到队列里面
  var eliminated = ''; //初始化淘汰者的名字
  while (queue.size() > 1) {
    //当队列里还有两个及其以上的元素
    for (var i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue()); //从队列开头移除一项，再将其添加到队列末尾
    }
    eliminated = queue.dequeue(); //处于队列首位的就是淘汰者
    console.log('这次淘汰的人：' + eliminated);
  }
  return queue.dequeue(); //返回游戏的胜利者
}
```

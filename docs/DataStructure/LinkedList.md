---
title: 链表
group:
  title: 基础
  order: 1
order: 2
---

链表存储有序的元素集合，但不同于数组，链表中的元素在内存中并不是连续放置的。每个元素由一个存储元素本身的节点和一个指向下一个元素的引用（也称指针或链接）组成。

链表的一个好处在于，添加或移除元素的时候不需要移动其他元素。然而，链表需要使用指针，因此实现链表时需要额外注意。数组的另一个细节是可以直接访问任何位置的任何元素，而要想访问链表中间的一个元素，需要从起点开始迭代列表直到找到所需的元素。

#### 创建链表

```js
function LinkedList() {
  var Node = function (element) {
    this.element = element;
    this.next = null;
  };
  var length = 0;
  var head = null;

  this.append = function (element) {
    //向链表尾部添加元素
    var node = new Node(element);
    var current;
    if (head === null) {
      //当链表为空的时候，直接插入
      head = node;
    } else {
      current = head;
      while (current.next) {
        current = current.next; //找到当前链表的最后一项
      }
      current.next = node; //最后一项的next指针指向node
    }
    length++; //长度加一
  };

  this.removeAt = function (position) {
    //删除某一个位置的节点
    if (position > -1 && position < length) {
      //判断是否越界
      var current = head,
        previous,
        index = 0;
      if (position === 0) {
        //删除第一个节点
        head = current.next;
      } else {
        while (index < position) {
          //迭代链表
          previous = current;
          current = current.next;
          index++;
        }
        previous.next = current.next; //previous和current的后继节点连接，删除current
      }
      length--;
      return current.element;
    } else {
      return null;
    }
  };

  this.insert = function (position, element) {
    //可以在任意位置插入一个元素
    if (position > -1 && position < length) {
      var node = new Node(element),
        current = head,
        previous,
        index = 0;
      if (position === 0) {
        //判断插入位置是否为第一个
        node.next = current;
        head = node;
      } else {
        while (index < position) {
          //迭代链表
          previous = current;
          current = current.next;
          index++;
        }
        previous.next = node;
        node.next = current;
      }
      length++;
      return true;
    } else {
      return false;
    }
  };

  this.toString = function () {
    //链表按着字符串输出
    var current = head;
    var string = '';
    while (current) {
      //迭代链表
      string = current.element;
      current = current.next;
    }
    return string;
  };

  this.indexOf = function (element) {
    //查找该值是否在链表中存在
    var current = head;
    var index = -1;
    while (current) {
      //迭代链表
      if (current.element === element) {
        //找到，则返回当前索引
        return index;
      }
      index++;
      current = current.next;
    }
    return -1;
  };

  this.remove = function (element) {
    //删除某个值
    var index = this.indexOf(element); //查找到当前值的索引
    return this.removeAt(index); //按位置删除当前值
  };

  this.isEmpty = function () {
    //判断当前链表是否为空
    return length === 0;
  };

  this.size = function () {
    //判断当前链表的大小
    return length;
  };

  this.getHead = function () {
    //返回链表头部
    return head;
  };
}
```

#### 双向链表

双向链表和普通链表的区别在于，在链表中，一个节点只有链向下一个节点的链接，而在双向链表中，链接是双向的：一个链向下一个元素，另一个链向前一个元素。

双向链表提供了两种迭代列表的方法：从头到尾，或者反过来。我们也可以访问一个特定节点的下一个或前一个元素。

链表的实现：

```js
function DoublyLinkedList() {
  var Node = function (element) {
    this.element = element;
    this.prev = null; //前继节点
    this.next = null; //后继节点
  };
  var length = 0;
  var head = null;
  var tail = null; //用来保存对列表最后一项的引用的tail属性

  this.insert = function (position, element) {
    //插入节点
    if (position >= 0 && position <= length) {
      //检查是否越界
      var node = new Node(element);
      var current = head,
        previous,
        index = 0;
      if (position === 0) {
        //如果是在第一个位置插入
        if (!head) {
          //如果当前链表为空
          head = node;
          tail = node;
        } else {
          node.next = current;
          current.prev = node;
          head = node;
        }
      } else if (position === length) {
        //如果是最后一位
        current = tail;
        current.next = node;
        node.prev = current;
        tail = node;
      } else {
        while (index < position) {
          //链表迭代
          previous = current;
          current = current.next;
          index++;
        }
        previous.next = node;
        node.prev = previous;
        node.next = current;
        current.prev = node;
      }
      length++;
      return true;
    } else {
      return false;
    }
  };

  this.removeAt = function (position) {
    //删除任意位置的节点
    if (position >= 0 && position <= length) {
      //检查是否越界
      var current = head,
        previous,
        index = 0;
      if (position === 0) {
        //删除第一位
        head = current.next;
        if (length === 1) {
          tail = null;
        } else {
          head.prev = null;
        }
      } else if (position === length - 1) {
        //删除最后一位
        current = tail;
        tail = current.prev;
        tail.next = null;
      } else {
        while (index < position) {
          previous = current;
          current = current.next;
          index++;
        }
        previous.next = current.next;
        current.next.prev = previous;
      }
      length--;
      return true;
    } else {
      return false;
    }
  };

  //其他方法与单向链表相同
}
```

---
title: 二叉树
group:
  title: 基础
  order: 1
order: 6
---

最近跟着 30 days leetcode challenge 刷题，但是遇到树的相关问题都比较棘手。虽然大学时，修过数据结构这门课程，但是终究是错付，忘得差不多了。所以这一次准备收集相关的资料，对这种数据结构再一次学习。

<!-- more -->

## 树

是一种非线性数据结构。每个结点有零个或者多个子结点；没有父结点的结点称为根结点；每一个非根结点有且只有一个父结点；除了根结点外，每个子结点可以分为多个不相交的子树。

### 树的分类

- 无序树：树中任意节点的子结点之间没有顺序关系，这种树称为无序树,也称为自由树;
- 有序树：树中任意节点的子结点之间有顺序关系，这种树称为有序树；
- 二叉树：每个节点最多含有两个子树的树称为二叉树；
- 完全二叉树：对于深度为 K 的，有 n 个结点的二叉树，当且仅当其每一个结点都与深度为 K 的满二叉树中编号从 1 至 n 的结点一一对应时称之为完全二叉树。
- 满二叉树：如果所有分支结点都存在左子树和右子树，并且所有叶子都在同一层上，这样的二叉树称为满二叉树。
- 哈夫曼树：带权路径最短的二叉树称为哈夫曼树或最优二叉树；

### 树的三个相似概念

- 高度(height)：节点到叶子节点的最长路径
- 深度(depth)：根节点到这个节点所经历的边的个数
- 层(level)：节点的深度+1
<div style="margin: auto">![普通二叉树](/image/tree/tree_height.png)</div>

## 二叉树

在上面我们提到，二叉树就是每个节点最多含有两个子树。

<div style="margin: auto">![普通二叉树](/image/tree/binary_tree.png)</div>

### 关于递归

求解二叉树的题目，离不开递归，递归的算法框架，是很多常用算法框架的雏形；大部分算法技巧，本质上都是树的遍历问题。

#### 什么是递归

无限调用自身这个函数，每次调用总会改动一个关键变量，直到这个关键变量达到边界的时候，不再调用。

#### 什么情况下采用递归

- 一个问题能够被拆分成为子问题，子子问题，然后都是用同一个函数来解决这些问题。
- 经过层层的拆分，最后的一个子问题具有一个不能够再拆分的值(终止条件)。

#### 递归的解题模板

- 找到递归的终止条件：递归在什么时候终止
- 找返回值：返回上一层的值
- 在本次递归中应该做什么：在此递归中，应该做什么样的任务

### 解锁二叉树

虽然每棵树都有很多的节点，但是对于每一棵树，我们只能干三件事情

- 取当前节点值
- 拿到当前节点左树的引用
- 拿到当前节点右树的引用

```js
function NodeTree(val) {
  this.val = val;
  this.left = this.right = null;
}
```

对于大部分的树而言，都可以抽象成为下面的代码

```js
function traverse(root) {
  // 对于当前节点需要做什么

  //对于左右子树进行同样的处理
  traverse(root.left);
  traverse(root.right);
}
```

#### 二叉树的存储方式

##### 链式存储法

这是一种基于指针或者引用的二叉链式存储法。这是一种常用的方式。
每个节点有三个字段，其中一个存储数据，另外两个是指向左右子节点的指针。

<div style="margin: auto">![普通二叉树](/image/tree/tree_linked.png)</div>

##### 顺序存储法

这是一种基于数组的顺序存储法。
我们把根节点存储在下标 i = 1 的位置，那左子节点存储在下标 2 \* i = 2 的位置，右子节点存储在 2 \* i + 1 = 3 的位置，以此类推。

<div style="margin: auto">![普通二叉树](/image/tree/tree_array.png)</div>

所以某棵二叉树是一棵完全二叉树的时候，用数组存储是最节省内存的一种方式。

#### 二叉树的遍历

二叉树有三种遍历方式，分别为前序/中序/后序。
接下来，我们均采用递归算法实现遍历。

##### 前序遍历

前序遍历：根左右

```js
function preOrder(root) {
  let output = [];
  const visitLoop = (node) => {
    if (!node) return output;
    output.push(node.val);
    visitLoop(node.left);
    visitLoop(node.right);
  };
  visitLoop(root);
  return output;
}
```

##### 中序遍历

中序遍历：左根右

```js
function inOrder(root) {
  let output = [];
  const visitLoop = (node) => {
    if (!node) return output;
    visitLoop(node.left);
    output.push(node.val);
    visitLoop(node.right);
  };
  visitLoop(root);
  return output;
}
```

##### 后序遍历

后序遍历：左右根

```js
function postOrder(root) {
  let output = [];
  const visitLoop = (node) => {
    if (!node) return output;
    visitLoop(node.left);
    visitLoop(node.right);
    output.push(node.val);
  };
  visitLoop(root);
  return output;
}
```

##### 层序遍历

层次遍历，从上到下，按层级输出

```js
function levelOrder() {
  let result = [];
  const traverse = (node, depth) => {
    if (!node) return;
    result[depth] ? result[depth].push(node.key) : (result[depth] = [node.key]);
    node.left && traverse(node.left, depth + 1);
    node.right && traverse(node.right, depth + 1);
  };
  traverse(root, 0);
  return result;
}
```

### 二叉查找树

二叉查找树(BST:Binary Search Tree)是一种特殊的二叉树，对于任意一个节点 n，

- 其左子树(left subtree)下的每个后代节点（descendant node）的值都小于节点 n 的值；
- 其右子树(right subtree)下的每个后代节点的值都大于节点 n 的值。

<div style="margin: auto">![普通二叉树](/image/tree/binary_search_tree.png)</div>

#### 二叉查找树的构建

```js
class TreeNode {
  constructor(key) {
    this.key = key;
    this.right = null;
    this.left = null;
  }
}
class BST {
  constructor() {
    this.root = null;
  }
  //...一些类方法
}
```

#### 插入节点

```js
insertNode(key) {
  this.root
    ? this._insertNode(this.root, key)
    : (this.root = new TreeNode(key));
}
_insertNode(node, key) {
  if (node.key > key) {
    //插入左子树
    node.left
      ? this._insertNode(node.left, key)
      : (node.left = new TreeNode(key));
  } else {
    node.right
      ? this._insertNode(node.right, key)
      : (node.right = new TreeNode(key));
  }
}
```

#### 获取最大/最小节点

```js
getMinNode() {
  //寻找最小值，沿着左子树一直寻找
  return this._getMinNode(this.root);
}
_getMinNode(node) {
  let current = node;
  while (current !== null && current.left !== null) {
    current = current.left;
  }
  return current;
}
getMaxNode() {
  //寻找最大值，沿着右子树一直寻找
  return this._getMaxNode(this.root);
}
_getMaxNode(node) {
  let current = node;
  while (current !== null && current.right !== null) {
    current = current.right;
  }
  return current;
}
```

#### 查找节点

```js
searchNode(key) {
  //查找是否存在某个值
  return this._searchNode(this.root, key);
}
_searchNode(node, key) {
  if (node === null) return false;
  if (node.key > key) {
    return this._searchNode(node.left, key);
  } else if (node.key < key) {
    return this._searchNode(node.right, key);
  } else {
    return true;
  }
}
```

#### 删除节点

```js
remove(key) {
  //删除某个节点
  return this._remove(this.root, key);
}
_remove(node, key) {
  if (node === null) return null;
  if (node.key > key) {
    //如果 key 大于当前节点，沿着左子树寻找
    node.left = this._remove(node.left, key);
    return node;
  } else if (node.key < key) {
    node.right = this._remove(node.right, key);
    return node;
  } else {
    //找到当前删除的 key 值
    if (node.left === null && node.right === null) {
      //需要删除得节点为叶子节点
      node = null;
      return node;
    } else if (node.left === null) {
      //左节点为空
      node = node.right;
      return node;
    } else if (node.right === null) {
      //右节点为空
      node = node.left;
      return node;
    } else {
      //左右节点都存在
      const minNode = this._getMinNode(node.right); //找到右子树的最小节点，或者是左子树的最大节点
      node.key = minNode.key;
      node.right = this._remove(node.right, minNode.key); //把右子树的 minNode 删除
      return node;
    }
  }
}
```

参考链接：

1. [参考 1](https://juejin.im/post/5e6209b8e51d45270531933e#heading-4)

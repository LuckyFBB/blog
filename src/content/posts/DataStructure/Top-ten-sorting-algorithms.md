---
title: 十大排序算法
group:
  title: 算法思路
  order: 2
order: 3
---

<del>OMG 子，这里还有坑没有填。</del>
排序算法中，除了冒泡还会想到啥呢。没了没了，毕业之后甚至连冒泡都快写不出来了。简单记录一下每个算法概念和实现方式。

<!-- more -->

## 算法的概述

### 算法分类

- 比较类排序：通过比较来决定元素的相对次序，由于时间复杂度不能突破 O(nlogn)，因此称为非线性时间比较类排序。
- 非比较类排序：不通过比较来决定元素的相对次序，它可以突破基于比较排序的时间下界，以线性时间运行，因此也称为线性时间非比较类排序。

### 相关概念

- 稳定：如果 a 原本在 b 前面，而 a=b，排序之后 a 仍然在 b 的前面。
- 不稳定：如果 a 原本在 b 的前面，而 a=b，排序之后 a 可能会出现在 b 的后面。
- 时间复杂度：对排序数据的总的操作次数。反映当 n 变化时，操作次数呈现什么规律。
- 空间复杂度：是指算法在计算机

## 冒泡排序

### 算法描述

只会比较相邻的两个数据，看是否满足大小关系，如果不满足则交换。
一次冒泡至少会让一个元素到达他该到的位置。

冒泡算法是**稳定**的排序算法

最好情况时间复杂度为 O(n)，最坏情况时间复杂度为 O(n^2)，平均情况时间复杂度为 O(n^2)

### 算法实现

```js
function bubbleSort(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > a[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

function bubbleSort2(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    let flag = false; //标记是否有数据交换
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > a[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        flag = true; //有数据交换
      }
    }
    if (!flag) break; //如果不存在数据交换，提前退出
  }
  return arr;
}
```

## 选择排序

### 算法描述

每次都会在未排序的区间中找到最小的元素，将其放到已排序的区间末尾。

选择排序是**不稳定**的排序算法

最好情况时间复杂度 O(n)，最坏情况时间复杂度 O(n^2)，平均情况时间复杂度 O(n^2)

### 算法实现

```js
function selectionSort(arr, n) {
  for (var i = 0; i < n; i++) {
    //寻找[i,n)区间内最小值
    var minIndex = i;
    for (var j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (arr[i] > arr[minIndex]) {
      var temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
    }
  }
  return arr;
}
```

## 插入排序

### 算法描述

插入排序也需要元素比较和元素移动，我们需要将元素 a 插入到已排序的区间时，需要用 a 元素与已排序的元素依次比较

插入排序是**稳定**的排序算法。

最好情况时间复杂度 O(n)，最坏情况时间复杂度 O(n^2)，平均情况时间复杂度 O(n^2)

### 算法实现

```js
function insertSort(arr) {
  let len = arr.length;
  for (let i = 1; i < len; i++) {
    //寻找i最合适的插入位置
    for (let j = i; j > 0; j--) {
      if (arr[j] < arr[j - 1]) {
        let temp = arr[j];
        arr[j] = arr[j - 1];
        arr[j - 1] = temp;
      } else break;
    }
  }
  return arr;
}

function insertSort2(arr) {
  let len = arr.length;
  //寻找i最合适的插入位置
  for (let i = 1; i < len; i++) {
    //当前i的值
    let curr = arr[i];
    //要插入的位置
    let j;
    for (j = i; j > 0 && curr < arr[j - 1]; j--) {
      arr[j] = arr[j - 1];
    }
    arr[j] = curr;
  }
  return arr;
}
```

## 希尔排序

## 归并排序

### 算法描述

先把数组先从中间分为前后两个部分，然后对前后两个部分分别排序，再将已经排好序的两个部分合在一起。采用了分治思想。

归并排序是**稳定**排序算法

三种情况下的算法复杂度都是 O(nlogn)

### 算法实现

```js
function mergeSort(arr) {
  let len = arr.length;
  __mergeSort(arr, 0, len - 1);
  return arr;
}

function __mergeSort(arr, left, right) {
  if (left >= right) {
    return;
  }
  let mid = Math.floor((left + right) / 2);
  __mergeSort(arr, left, mid);
  __mergeSort(arr, mid + 1, right);
  if (arr[mid] > arr[mid + 1]) {
    __merge(arr, left, mid, right);
  }
}

function __merge(arr, left, mid, right) {
  let temp = [];
  for (let i = left; i <= right; i++) {
    temp[i - left] = arr[i];
  }
  let i = left,
    j = mid + 1;
  for (let k = left; k <= right; k++) {
    if (i > mid) {
      arr[k] = temp[j - left];
      j++;
    } else if (j > right) {
      arr[k] = temp[i - left];
      i++;
    } else if (temp[i - left] < temp[j - left]) {
      arr[k] = temp[i - left];
      i++;
    } else {
      arr[k] = temp[j - left];
      j++;
    }
  }
}

// 归并排序
function mergeSort2(arr) {
  const len = arr.length;
  if (len < 2) {
    return arr;
  }
  const mid = len / 2;
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  return __merge2(mergeSort2(left), mergeSort2(right));
}

function __merge2(left, right) {
  let result = [];
  while (left.length && right.length) {
    //两个数组都还有值的时候
    if (left[0] > right[0]) {
      //right的最小值更小
      result.push(right.shift());
    } else {
      result.push(left.shift());
    }
  }
  while (left.length) {
    //right没有数据了
    result.push(left.shift());
  }
  while (right.length) {
    //left没有数据了
    result.push(right.shift());
  }
  return result;
}
```

## 快速排序

### 算法描述

从数组中选择一个 pivot(分区点)，然后将小于 pivot 的放到左边，大于 pivot 的放到右边。

快速排序是**不稳定**算法

最坏情况算法复杂度为 O(n^2)，平均情况算法复杂度为 O(nlogn)

### 算法实现

```js
function quickSort(arr) {
  let len = arr.length;
  __quickSort(arr, 0, len - 1);
  return arr;
}

//对arr[left,right]部分进行快速排序
function __quickSort(arr, left, right) {
  if (left >= right) {
    return;
  }
  let index = __partition(arr, left, right);
  __quickSort(arr, left, index - 1);
  __quickSort(arr, index + 1, right);
}

//对arr[left,right]部分进行partition操作
//返回一个索引值，使得arr[left,index-1]>arr[index],arr[index+1,right]>arr[index]
function __partition(arr, left, right) {
  //随机生成标准值
  let randomIndex = parseInt(Math.random() * (right - left + 1)) + left;
  //将标准值交换到第一位
  swap(arr, left, randomIndex);
  let standard = arr[left];
  //存储大于standard和小于standard的分割线
  let index = left;
  for (let i = left + 1; i <= right; i++) {
    if (arr[i] < standard) {
      swap(arr, i, index + 1);
      index++;
    }
  }
  swap(arr, left, index);
  return index;
}

//双路快排
//从头开始找大于standard的元素，从尾开始找小于standard的元素，交换两者位置。
function __partition2(arr, left, right) {
  //随机生成标准值
  let randomIndex = parseInt(Math.random() * (right - left + 1)) + left;
  //将标准值交换到第一位
  swap(arr, left, randomIndex);
  let standard = arr[left];
  let i = left + 1,
    j = right;
  while (true) {
    while (i <= right && arr[i] < standard) i++;
    while (j >= left + 1 && arr[j] > standard) j--;
    if (i > j) break;
    swap(arr, i, j);
    i++;
    j--;
  }
  swap(arr, left, j);
  return j;
}

//交换值
function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
```

## 堆排序

### 算法描述

堆一定是一个完全二叉树，堆中每一个节点的值都必须大于等于（或小于等于）其子树中每个节点的值。

对于每个节点的值都大于等于子树中每个节点值的堆，我们叫作“大顶堆”；对于每个节点的值都小于等于子树中每个节点值的堆，我们叫作“小顶堆”。

将需要排序的数据构建成为大顶堆，那么堆顶元素就是最大值，在和末尾元素交换，在进行堆化。

### 算法实现

```js
class MaxHeap {
  constructor() {
    this.data = [0];
  }

  sort() {
    this.__buildHeap();
    let len = this.getSize();
    while (len > 1) {
      this.__swap(len, 1);
      len--;
      this.__shiftDown(len, 1);
    }
  }

  //返回当前大小
  getSize() {
    return this.data.length - 1;
  }

  __buildHeap() {
    for (let i = parseInt(this.getSize() / 2); i > 0; i--) {
      this.__shiftDown(this.getSize(), i);
    }
  }

  //向下堆重构:从堆顶开始,比较当前元素和两个子元素,将若当前元素小于子元素中的一个,则将当前元素与较大的子元素交换,直到当前元素大于其子元素
  __shiftDown(len, k) {
    while (true) {
      let maxPos = k;
      if (2 * k <= len && this.data[k] < this.data[2 * k]) maxPos = 2 * k;
      if (2 * k + 1 <= len && this.data[maxPos] < this.data[2 * k + 1])
        maxPos = 2 * k + 1;
      if (k === maxPos) break;
      this.__swap(maxPos, k);
      k = maxPos;
    }
  }

  __swap(i, j) {
    [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
  }
}
```

## 计数排序

## 桶排序

## 基数排序

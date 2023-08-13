---
title: 栈/队列的解题思路
group:
  title: 算法思路
  order: 2
order: 2
---

之前一直有断断续续在学习一些数据结构的知识，在前文中也有过一些总结，一直以来刷 leetcode 也是属于瞎刷，不能够很好的总结题型与解决方案。在此之后，准备按着数据结构类型和算法刷题。
在刷完链表之后，着手开始栈/队列的刷题，也会在此篇博文中进行记录。

<!-- more -->

在[前文](/data-structure/stack-and-queue)中介绍了栈和队列的相关知识，可以进行查看阅读。

## 解题技巧

### 单调栈

单调栈实际上就是栈，使得每次新元素入栈后，栈内的元素都保持有序(单调递增或单调递减)。

```js
//构建单调递增栈
let stack = [];
for (let i = 0; i < arr.length; i++) {
  while (stack.length && stack[stack.length - 1] > arr[i]) {
    //具体操作
    stack.pop();
  }
  stack.push(arr[i]);
}
```

## 栈

### 括号类问题

#### 有效的括号

```
给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

有效字符串需满足：

左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
注意空字符串可被认为是有效字符串。

示例 1:          示例 2:

输入: "()"       输入: "()[}{}"
输出: true       输出: false
```

[leetcode](https://leetcode-cn.com/problems/valid-parentheses)
分析 1：采用栈，将遇到的(,\[,{压入栈中，当遇到),],}时，把取出栈顶元素与其进行匹配。

```js
var isValid = function (s) {
  if (!s) return true;
  let stack = [];
  for (let i = 0; i < s.length; i++) {
    let curr = s.charAt(i);
    if (curr === '(' || curr === '{' || curr === '[') {
      stack.push(curr);
    } else if (stack.length === 0) {
      return false;
    } else {
      let pre = stack.pop();
      if (
        (pre === '(' && curr !== ')') ||
        (pre === '[' && curr !== ']') ||
        (pre === '{' && curr !== '}')
      ) {
        return false;
      }
    }
  }
  return stack.length === 0;
};
//Runtime: 84 ms, faster than 36.87% of JavaScript
```

分析 2：思路与分析 1 一样，引入对象的概念。

```js
var isValid = function (s) {
  if (!s) return true;
  let map = {
    '(': ')',
    '{': '}',
    '[': ']',
  };
  let stack = [];
  for (let i = 0; i < s.length; i++) {
    let char = s[i];
    if (map[char]) {
      stack.push(char);
    } else {
      if (map[stack.pop()] !== char) {
        return false;
      }
    }
  }
  return stack.length === 0;
};

//Runtime: 68 ms, faster than 97.79 % of JavaScript
```

#### 最长有效括号

```
给定一个只包含 '(' 和 ')' 的字符串，找出最长的包含有效括号的子串的长度。

示例 1:                                  示例 2:

输入: "(()"                              输入: ")()())"
输出: 2                                  输出: 4
解释: 最长有效括号子串为 "()"             解释: 最长有效括号子串为 "()()"
```

[leetcode](https://leetcode-cn.com/problems/longest-valid-parentheses)
分析 1：暴力解法。先明确有效括号肯定为偶数。第一步先判断当前字符串的长度是否为偶数。第二步通过截取判断当前长度的字符串是否是有效的，如果是有效括号就返回当前长度，否则遍历继续截取当长度的字符串继续判断。第三步当第二步没有找到合适的字符串，则把当前长度-2，循环第二步，直到 length 为 0。但是这个方法超时。

```js
var longestValidParentheses = function (s) {
  let length = s.length;
  length % 2 === 1 ? (length = length - 1) : '';
  while (length !== 0) {
    for (let i = 0; i <= s.length - length; i++) {
      let str = s.substr(i, length);
      const flag = isValid(str);
      if (flag) {
        return length;
      }
    }
    length -= 2;
  }
  return 0;
};
var isValid = function (s) {
  if (!s) return true;
  let map = {
    '(': ')',
  };
  let stack = [];
  for (let i = 0; i < s.length; i++) {
    let char = s[i];
    if (map[char]) {
      stack.push(char);
    } else {
      if (map[stack.pop()] !== char) {
        return false;
      }
    }
  }
  return stack.length === 0;
};
```

分析 2：栈方法。往栈中引用-1 作为“参照物”，当前最大长度为：当前索引-出栈后新的栈顶索引。当 stack.length 为 0 的时候，说明栈中已经没有左括号的存在了，就需要新的参照物了。两种索引会入栈：等待被匹配的左括号索引、充当「分隔符号」的右括号索引。后者入栈因为：当左括号匹配光时，栈需要留一个「垫底」的「参照物」，用于计算一段连续的有效长度。

```js
var longestValidParentheses = function (s) {
  let maxlen = 0;
  const stack = [];
  stack.push(-1);
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (char === '(') {
      stack.push(i);
    } else {
      stack.pop();
      if (stack.length) {
        const curMaxLen = i - stack[stack.length - 1];
        maxlen = Math.max(maxlen, curMaxLen);
      } else {
        stack.push(i);
      }
    }
  }
  return maxlen;
};
//Runtime: 92 ms, faster than 48.54% of JavaScript
```

### 设计类问题

#### 最小栈

```
设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。

push(x) —— 将元素 x 推入栈中。
pop() —— 删除栈顶的元素。
top() —— 获取栈顶元素。
getMin() —— 检索栈中的最小元素。
```

[leetcode](https://leetcode-cn.com/problems/min-stack)

分析 1：一个栈，使用常规的数组方法完成。

```js
/**
 * initialize your data structure here.
 */
var MinStack = function () {
  this.stack = [];
};
MinStack.prototype.push = function (x) {
  return this.stack.push(x);
};

MinStack.prototype.pop = function () {
  return this.stack.pop();
};

MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1];
};

MinStack.prototype.getMin = function () {
  return Math.min(...this.stack);
};
//Runtime: 236 ms, faster than 21.03% of JavaScript
```

分析 2：两个栈并行。min_stack 中栈顶始终保存最小元素。其他操作和上述一致。

```js
var MinStack = function () {
  this.stack = [];
  this.min_stack = [];
};

MinStack.prototype.push = function (x) {
  this.stack.push(x);
  if (!this.min_stack.length) {
    this.min_stack.push(x);
  } else {
    this.min_stack.push(
      x < this.min_stack[this.min_stack.length - 1]
        ? x
        : this.min_stack[this.min_stack.length - 1],
    );
  }
};

MinStack.prototype.pop = function () {
  this.stack.pop();
  this.min_stack.pop();
};

MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1];
};

MinStack.prototype.getMin = function () {
  return this.min_stack[this.min_stack.length - 1];
};
//Runtime: 116 ms, faster than 89.31% of JavaScript
```

#### 用队列实现栈

```
使用队列实现栈的下列操作：

push(x) -- 元素 x 入栈
pop() -- 移除栈顶元素
top() -- 获取栈顶元素
empty() -- 返回栈是否为空
```

[leetcode](https://leetcode-cn.com/problems/implement-stack-using-queues)
分析 1：对于 pop 方法出了要删除元素之外，还需要返回所删除的元素的值。

```js
var MyStack = function () {
  this.queue = [];
};

MyStack.prototype.push = function (x) {
  this.queue.push(x);
};

MyStack.prototype.pop = function () {
  let index = 0;
  while (index < this.queue.length - 1) {
    const element = this.queue.shift();
    this.queue.push(element);
    index++;
  }
  return this.queue.shift();
};

MyStack.prototype.top = function () {
  let index = 0;
  while (index < this.queue.length - 1) {
    const element = this.queue.shift();
    this.queue.push(element);
    index++;
  }
  const top = this.queue.shift();
  this.queue.push(top);
  return top;
};

MyStack.prototype.empty = function () {
  return !this.queue.length;
};
//Runtime: 76 ms, faster than 58.17% of JavaScript
```

### 单调栈问题

#### 下一个更大元素 I

```
给定两个 没有重复元素 的数组 nums1 和 nums2 ，其中nums1 是 nums2 的子集。找到 nums1 中每个元素在 nums2 中的下一个比其大的值。
nums1 中数字 x 的下一个更大元素是指 x 在 nums2 中对应位置的右边的第一个比 x 大的元素。如果不存在，对应位置输出 -1 。

示例 1:

输入: nums1 = [4,1,2], nums2 = [1,3,4,2].
输出: [-1,3,-1]
解释:
    对于num1中的数字4，你无法在第二个数组中找到下一个更大的数字，因此输出 -1。
    对于num1中的数字1，第二个数组中数字1右边的下一个较大数字是 3。
    对于num1中的数字2，第二个数组中没有下一个更大的数字，因此输出 -1。
```

[leetcode](https://leetcode-cn.com/problems/next-greater-element-i)

分析 1：暴力解法。对 nums1 进行遍历，查找到当前元素在 nums2 中的位置，截取数组 arr，遍历 arr 中的元素与当前元素比较，查找下一个更大元素。

```js
var nextGreaterElement = function (nums1, nums2) {
  const result = [];
  nums1.forEach((item) => {
    let index = nums2.indexOf(item);
    let arr = nums2.slice(index);
    for (let j = 0; j < arr.length; j++) {
      const element = arr[j];
      if (element > item) {
        result.push(element);
        break;
      }
      if (j === arr.length - 1) {
        result.push(-1);
      }
    }
  });
  return result;
};
//Runtime: 88 ms, faster than 42.88% of JavaScript
```

分析 2：单调栈解法。在 nums2 中分别找到元素的下一个更大元素，存储在 map 中。遍历 nums1，查找 nums1 的数据是否在 map 中存在。

```js
var nextGreaterElement = function (nums1, nums2) {
  const stack = [];
  const map = new Map();
  for (let i = 0; i < nums2.length; i++) {
    const curr = nums2[i];
    while (stack.length && curr > stack[stack.length - 1]) {
      const pop = stack.pop();
      map.set(pop, curr);
    }
    stack.push(curr);
  }
  const res = [];
  for (let i = 0; i < nums1.length; i++) {
    map.get(nums1[i]) ? res.push(map.get(nums1[i])) : res.push(-1);
  }
  return res;
};
//Runtime: 76 ms, faster than 92.24% of JavaScript
```

#### 股票价格跨度

```
编写一个 StockSpanner 类，它收集某些股票的每日报价，并返回该股票当日价格的跨度。

今天股票价格的跨度被定义为股票价格小于或等于今天价格的最大连续日数（从今天开始往回数，包括今天）。

例如，如果未来7天股票的价格是 [100, 80, 60, 70, 60, 75, 85]，那么股票跨度将是 [1, 1, 1, 2, 1, 4, 6]。
```

[leetcode](https://leetcode-cn.com/problems/online-stock-span)

分析 1：采用单调栈的方式。分别使用 prices 单调递减栈，weights 里面存储 prices 里面对应的跨度。遍历股票价格，当前元素与 prices 的栈顶比较，如果小于的话，将 prices 栈顶弹出，当前元素的 weight 加上栈顶 price 的 weight，一直循环。

```js
var StockSpanner = function () {
  this.prices = [];
  this.weights = [];
};

/**
 * @param {number} price
 * @return {number}
 */
StockSpanner.prototype.next = function (price) {
  let weight = 1;
  while (this.prices.length && this.prices[this.prices.length - 1] <= price) {
    this.prices.pop();
    weight += this.weights.pop();
  }
  this.prices.push(price);
  this.weights.push(weight);
  return weight;
};
//Runtime: 280 ms, faster than 95.65% of JavaScript
```

#### 每日温度

```
请根据每日 气温 列表，重新生成一个列表。对应位置的输出为：要想观测到更高的气温，至少需要等待的天数。如果气温在这之后都不会升高，请在该位置用 0 来代替。

例如，给定一个列表 temperatures = [73, 74, 75, 71, 69, 72, 76, 73]，你的输出应该是 [1, 1, 4, 2, 1, 1, 0, 0]。
```

[leetcode](https://leetcode-cn.com/problems/daily-temperatures)
分析 1：利用双层循环。判断后续值小于当前值，继续访问后续值。否则计算当前位置的结果值。

```js
var dailyTemperatures = function (T) {
  let len = T.length;
  for (let i = 0; i < len; i++) {
    let j = i + 1;
    while (j < len && T[i] >= T[j]) {
      j++;
    }
    T[i] = j >= len ? 0 : j - i;
  }
  return T;
};
//Runtime: 836 ms, faster than 31.90 % of JavaScript
```

分析 2：利用栈，构建单调递减栈，从栈底到栈顶递减，栈顶为最小。当前元素都和栈顶元素进行判断，如果大于栈顶元素，两者的下标相减就是结果值；否则压入栈底。

```js
var dailyTemperatures = function (T) {
  let stack = [];
  let result = new Array(T.length).fill(0);
  for (let i = 0; i < T.length; i++) {
    while (stack.length && T[i] > T[stack[stack.length - 1]]) {
      let temp = stack.pop();
      result[temp] = i - temp;
    }
    stack.push(i);
  }
  return result;
};
//Runtime: 160 ms, faster than 67.79% of JavaScript
```

#### 最大宽度坡

```
给定一个整数数组 A，坡是元组 (i, j)，其中  i < j 且 A[i] <= A[j]。这样的坡的宽度为 j - i。

找出 A 中的坡的最大宽度，如果不存在，返回 0 。

示例 1：

输入：[6,0,8,2,1,5]
输出：4
解释：
最大宽度的坡为 (i, j) = (1, 5): A[1] = 0 且 A[5] = 5.
示例 2：

输入：[9,8,1,0,1,9,4,0,4,1]
输出：7
解释：
最大宽度的坡为 (i, j) = (2, 9): A[2] = 1 且 A[9] = 1.
```

[leetcode](https://leetcode-cn.com/problems/maximum-width-ramp)
分析 1：单调栈方法。首先需要正向扫描数组记录单调递减 A[i]的下标。然后反向扫描数组比较 A[j]和栈顶元素的值，满足条件，则弹出栈顶元素，不断循环直至栈为空。

```js
var maxWidthRamp = function (A) {
  const stack = [];
  let res = 0;
  for (let i = 0; i < A.length; i++) {
    if (!stack.length || A[i] < A[stack[stack.length - 1]]) {
      stack.push(i);
    }
  }
  for (let j = A.length - 1; j > 0; j--) {
    while (stack.length && A[j] >= A[stack[stack.length - 1]]) {
      res = Math.max(res, j - stack[stack.length - 1]);
      stack.pop();
    }
  }
  return res;
};
//Runtime: 88 ms, faster than 95.24% of JavaScript
```

#### 柱状图中最大的矩形

```
给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。

求在该柱状图中，能够勾勒出来的矩形的最大面积。

以上是柱状图的示例，其中每个柱子的宽度为 1，给定的高度为 [2,1,5,6,2,3]。
```

[leetcode](https://leetcode-cn.com/problems/largest-rectangle-in-histogram)

分析 1：暴力解法。以当前柱子为中心，往左右寻找所有比它还高的柱子构造矩形得到面积。与之前的面积值进行比较得到最大值。

```js
var largestRectangleArea = function (heights) {
  let len = heights.length;
  if (len === 0) return 0;
  let res = 0;
  for (let i = 0; i < len; i++) {
    let left = i;
    let curHeight = heights[i];
    while (left > 0 && heights[left - 1] >= curHeight) {
      left--;
    }
    let right = i;
    while (right < len - 1 && heights[right + 1] >= curHeight) {
      right++;
    }
    let width = right - left + 1;
    res = Math.max(res, width * curHeight);
  }
  return res;
};
//Runtime: 680 ms, faster than 28.22% of JavaScript
```

分析 2：利用栈，构建单调递增栈，当遇到某个元素小于当前元素(i)时，对栈顶元素进行出栈(curr)，在获得当前栈的栈顶元素与 i 的差值-1 得到矩形的宽度，再获得 curr 的高度得到面积值；否则直接入栈。技巧：两端添加 0 巧妙处理下面遍历 while 的终止条件。

```js
var largestRectangleArea = function (heights) {
  if (!heights || !heights.length) return 0;
  heights.unshift(0);
  heights.push(0);
  let res = 0;
  let stack = [];
  for (let i = 0; i < heights.length; i++) {
    while (stack.length && heights[i] < heights[stack[stack.length - 1]]) {
      let curr = stack.pop();
      res = Math.max(res, (i - stack[stack.length - 1] - 1) * heights[curr]);
    }
    stack.push(i);
  }
  return res;
};
```

## 队列

### 设置类问题

#### 用栈实现队列

```
请你仅使用两个栈实现先入先出队列。队列应当支持一般队列的支持的所有操作（push、pop、peek、empty）：

实现 MyQueue 类：

void push(int x) 将元素 x 推到队列的末尾
int pop() 从队列的开头移除并返回元素
int peek() 返回队列开头的元素
boolean empty() 如果队列为空，返回 true ；否则，返回 false
```

[leetcode](https://leetcode-cn.com/problems/implement-queue-using-stacks)

```js
var MyQueue = function () {
  this.stack1 = [];
  this.stack2 = [];
};

/**
 * Push element x to the back of queue.
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function (x) {
  this.stack1.push(x);
};

/**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function () {
  while (this.stack1.length) {
    this.stack2.push(this.stack1.pop());
  }
  let pop = this.stack2.pop();
  while (this.stack2.length) {
    this.stack1.push(this.stack2.pop());
  }
  return pop;
};

/**
 * Get the front element.
 * @return {number}
 */
MyQueue.prototype.peek = function () {
  while (this.stack1.length) {
    this.stack2.push(this.stack1.pop());
  }
  let pop = this.stack2[this.stack2.length - 1];
  while (this.stack2.length) {
    this.stack1.push(this.stack2.pop());
  }
  return pop;
};

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function () {
  return !this.stack1.length;
};

//Runtime: 76 ms, faster than 65.98% of JavaScript
```

---
title: 链表的解题思路
group:
  title: 算法思路
  order: 2
order: 1
---

之前一直有断断续续在学习一些数据结构的知识，在前文中也有过一些总结，一直以来刷 leetcode 也是属于瞎刷，不能够很好的总结题型与解决方案。在此之后，准备按着数据结构类型和算法刷题。
在刷完二叉树之后，着手开始链表的刷题，也会在此篇博文中进行记录。

<!-- more -->

在[前文](/data-structure/linked-list)中介绍了链表的相关知识，可以进行查看阅读。

## 解题思路

### 删除节点

对于删除节点类的题型，无外乎是获得当前需要删除的节点 curr，然后改变前序节点 prev 的指向，**prev.next = curr.next**，从而达到删除 curr 的效果。

### 利用哨兵简化难度

引入一个哨兵节点 pivot，使得 pivot.next = head。哨兵结点是不存储数据的。因为哨兵结点一直存在，所以插入第一个结点和插入其他结点，删除最后一个结点和删除其他结点，都可以统一为相同的代码实现逻辑了。

### 快慢指针

快慢指针一般分为两种，一种是快指针速度为慢指针两倍，一种是快指针比慢指针快 N 步。使用快慢指针还能解决链表是否有环的问题。

### 边界问题

- 如果链表为空时，代码是否能正常工作？
- 如果链表只包含一个结点时，代码是否能正常工作？
- 如果链表只包含两个结点时，代码是否能正常工作？
- 代码逻辑在处理头结点和尾结点的时候，是否能正常工作？

## 删除节点

### 移除链表元素

```
删除链表中等于给定值 val 的所有节点。

示例:

输入: 1->2->6->3->4->5->6, val = 6
输出: 1->2->3->4->5
```

[leetcode](https://leetcode-cn.com/problems/remove-lvinked-list-elements/)

分析：遍历链表，找到当前的需要删除的节点 curr，并且使用 prev 记录为需删除节点的前序节点，然后使用 prev.next = curr.next，改变 prev 后续指针的指向，从而达到删除的目的。

```js
var removeElements = function (head, val) {
  if (head === null) {
    return head;
  }
  while (head !== null && head.val === val) {
    head = head.next;
  }
  var pre = head;
  while (pre !== null && pre.next !== null) {
    var cur = pre.next;
    if (cur.val !== val) {
      pre = cur;
      continue;
    }
    pre.next = cur.next;
  }
  return head;
};
//Runtime: 96 ms, faster than 65.34% of JavaScript
```

### 删除排序链表中的重复元素

```
给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。

示例 1:

输入: 1->1->2
输出: 1->2
示例 2:

输入: 1->1->2->3->3
输出: 1->2->3
```

[leetcode](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list)
分析：如果两个元素相同，则将 curr.next 指向 curr.next.next

```js
var deleteDuplicates = function (head) {
  let curr = head;
  while (curr && curr.next) {
    if (curr.val !== curr.next.val) {
      curr = curr.next;
      continue;
    }
    curr.next = curr.next.next;
  }
  return head;
};
//Runtime: 88 ms, faster than 74.09% of JavaScript
```

### 删除排序链表中的重复元素 II

```
给定一个排序链表，删除所有含有重复数字的节点，只保留原始链表中 没有重复出现 的数字。

示例 1:

输入: 1->2->3->3->4->4->5
输出: 1->2->5
示例 2:

输入: 1->1->1->2->3
输出: 2->3
```

[leetcode](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list-ii)

分析：此题为上一题的加强版，我们采用双指针的方式来解决这个问题。首先设置一个哨兵节点 pivot 指向整个 head。设置 prev 指向哨兵节点，设置 curr 指向 head 节点。然后遍历整个 head 节点，如果 curr 和 curr.next 的值相同，需要跳过所有相同节点的操作，所以有了第二个 while 循环，拿到最后一个相同节点后，prev.next 指向 curr；如果两者不相等，prev 和 curr 都分别指向自身下一个节点。

```js
var deleteDuplicates = function (head) {
  let pivot = new ListNode(-Infinity);
  pivot.next = head;
  let prev = pivot;
  let curr = head;
  while (curr && curr.next) {
    if (curr.val === curr.next.val) {
      let val = curr.val;
      while (curr && curr.val === val) {
        curr = curr.next;
      }
      prev.next = curr;
    } else {
      prev = prev.next;
      curr = curr.next;
    }
  }
  return pivot.next;
};
//Runtime: 80 ms, faster than 87.14% of JavaScript
```

### 删除链表的倒数第 n 个节点

```
给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。

示例：

给定一个链表: 1->2->3->4->5, 和 n = 2.

当删除了倒数第二个节点后，链表变为 1->2->3->5.
```

[leetcode](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list)

- 分析 1：转换为删除正数第(**length-n+1**)个节点。先获取到 length，然后转换 length 为正数节点。一直找到需删除节点的前序节点，然后采用固定公式。

```js
var removeNthFromEnd = function (head, n) {
  let pivot = new ListNode(-1);
  pivot.next = head;
  let length = 0;
  let temp = head;
  while (temp) {
    temp = temp.next;
    length++;
  }
  length -= n;
  temp = pivot;
  while (length != 0) {
    length--;
    temp = temp.next;
  }
  temp.next = temp.next.next;
  return pivot.next;
};
//Runtime: 92 ms, faster than 26.06% of JavaScript
```

- 分析 2：采用快慢指针。使得 fast 在 slow 前的 n 个位置，当 fast 到达链表尾节点时，slow.next 指向当前需删除的节点。

```js
var removeNthFromEnd = function (head, n) {
  let pivot = new ListNode(-1);
  pivot.next = head;
  let fast = pivot;
  let slow = pivot;
  while (n !== 0) {
    n--;
    fast = fast.next;
  }
  while (fast.next !== null) {
    fast = fast.next;
    slow = slow.next;
  }
  slow.next = slow.next.next;
  return pivot.next;
};
//Runtime: 88 ms, faster than 36.59% of JavaScript
```

## 翻转链表

### 反转链表

```
反转一个单链表。

示例:

输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL
```

[leetcode](https://leetcode-cn.com/problems/reverse-linked-list/)
分析：设置哨兵节点 null，将当前节点的指针指向上一个节点，然后更新当前节点和下一个节点的值即顺移，重复以上动作直到当前节点为尾节点的节点 null

```js
var reverseList = function (head) {
  let prev = null;
  let curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
};
```

### 反转链表 II

```
反转从位置 m 到 n 的链表。请使用一趟扫描完成反转。
说明:
1 ≤ m ≤ n ≤ 链表长度。

示例:
输入: 1->2->3->4->5->NULL, m = 2, n = 4
输出: 1->4->3->2->5->NULL
```

[leetcode](https://leetcode-cn.com/problems/reverse-linked-list-ii)
分析：只需要对 m 到 n 之间的元素进行翻转。翻转的思路和上一题一样，但是需要取到 m-n 之间的元素。所以调用了两次 while 循环，获取到 m-n 之间的元素

```js
var reverseBetween = function (head, m, n) {
  let pivot = new ListNode();
  pivot.next = head;
  let temp = pivot;
  let length = n - m;
  for (let i = 0; i < m - 1; i++) {
    temp = temp.next;
  }
  let prev = null;
  let curr = temp.next;
  while (length >= 0) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
    length--;
  }
  temp.next.next = curr;
  temp.next = prev;
  return pivot.next;
};
//Runtime: 72 ms, faster than 86.55% of JavaScript
```

### 两两交换链表中的节点

```
给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。

你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

示例:
给定 1->2->3->4, 你应该返回 2->1->4->3.
```

[leetcode](https://leetcode-cn.com/problems/swap-nodes-in-pairs)
分析：加入哨兵节点，惯用的思路。分别设置 start 和 end 两个节点为要交换的节点，start 为当前遍历节点的后续节点，end 为 start 的后续节点。当前节点的后续节点和后后续两者中有一个为空时则终止循环。

```js
var swapPairs = function (head) {
  let pivot = new ListNode();
  pivot.next = head;
  let temp = pivot;
  while (temp.next && temp.next.next) {
    const start = temp.next;
    const end = start.next;
    temp.next = end;
    start.next = end.next;
    end.next = start;
    temp = start;
  }
  return pivot.next;
};
//Runtime: 68 ms, faster than 94.77% of JavaScript
```

## 合并链表

### 合并两个有序链表

```
将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 

示例：

输入：1->2->4, 1->3->4
输出：1->1->2->3->4->4
```

[leetcode](https://leetcode-cn.com/problems/merge-two-sorted-lists)
分析 1：如果 l1 或者 l2 一开始就是空链表 ，那么没有任何操作需要合并，所以我们只需要返回非空链表。否则，我们要判断 l1 和 l2 哪一个链表的头节点的值更小，然后递归地决定下一个添加到结果里的节点。如果两个链表有一个为空，递归结束。

```js
var mergeTwoLists = function (l1, l2) {
  if (l1 == null) return l2;
  if (l2 == null) return l1;
  if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  }
};
//Runtime: 88 ms, faster than 72.02% of JavaScript
```

分析 2：
当 l1 和 l2 都不是空链表时，判断 l1 和 l2 哪一个链表的头节点的值更小，将较小值的节点添加到结果里，当一个节点被添加到结果里之后，将对应链表中的节点向后移一位。

```js
var mergeTwoLists = function (l1, l2) {
  let res = new ListNode(null);
  let prev = res;
  while (l1 && l2) {
    if (l1.val >= l2.val) {
      prev.next = l2;
      l2 = l2.next;
    } else {
      prev.next = l1;
      l1 = l1.next;
    }
    prev = prev.next;
  }
  prev.next = l1 ? l1 : l2;
  return res.next;
};
//Runtime: 84 ms, faster than 86.76% of JavaScript
```

### 合并 K 个升序链表

```
给你一个链表数组，每个链表都已经按升序排列。

请你将所有链表合并到一个升序链表中，返回合并后的链表。

示例 1：

输入：lists = [[1,4,5],[1,3,4],[2,6]]
输出：[1,1,2,3,4,4,5,6]
解释：链表数组如下：
[
  1->4->5,
  1->3->4,
  2->6
]
将它们合并到一个有序链表中得到。
1->1->2->3->4->4->5->6
示例 2：

输入：lists = []
输出：[]
示例 3：

输入：lists = [[]]
输出：[]
```

[leetcode](https://leetcode-cn.com/problems/merge-k-sorted-lists)

分析：作为上一题的衍生题，可以把多个链表都转换为两个链表的计算，当 lists 中只有一个链表时就返回结果，否则就把两个链表进行合并。

```js
var mergeKLists = function (lists) {
  if (lists.length === 0) {
    return null;
  }
  while (lists.length > 1) {
    let a = lists.shift();
    let b = lists.shift();
    lists.push(mergeTwoLists(a, b));
  }
  return lists[0];
};
var mergeTwoLists = function (l1, l2) {
  if (l1 == null) return l2;
  if (l2 == null) return l1;
  if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  }
};
//Runtime: 108 ms, faster than 79.26% of JavaScript
```

### 两数相加

```
给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。

如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。

您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

示例：

输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
输出：7 -> 0 -> 8
原因：342 + 465 = 807
```

[leetcode](https://leetcode-cn.com/problems/add-two-numbers)

分析：位于链表同一位置的两数相加，需要注意进位的情况。如果所有节点遍历遍历完毕，存在进位情况，需要新增节点。

```js
var addTwoNumbers = function (l1, l2) {
  let pivot = new ListNode();
  let curr = null;
  let carry = 0;
  while (l1 || l2) {
    const num1 = l1 ? l1.val : 0;
    const num2 = l2 ? l2.val : 0;
    const sum = num1 + num2 + carry;
    if (!pivot) {
      pivot = curr = new ListNode(sum % 10);
    } else {
      curr.next = new ListNode(sum % 10);
      curr = curr.next;
    }
    carry = Math.floor(sum / 10);
    l1 = l1 ? l1.next : '';
    l2 = l2 ? l2.next : '';
  }
  carry > 0 ? (curr.next = new ListNode(carry)) : '';
  return pivot;
};
//Runtime: 132 ms, faster than 73.04% of JavaScript
```

### 两数相加 II

```
给你两个 非空 链表来代表两个非负整数。数字最高位位于链表开始位置。它们的每个节点只存储一位数字。将这两数相加会返回一个新的链表。

你可以假设除了数字 0 之外，这两个数字都不会以零开头。

进阶：

如果输入链表不能修改该如何处理？换句话说，你不能对列表中的节点进行翻转。

示例：

输入：(7 -> 2 -> 4 -> 3) + (5 -> 6 -> 4)
输出：7 -> 8 -> 0 -> 7
```

[leetcode](https://leetcode-cn.com/problems/add-two-numbers-ii/)
分析：该题是上一题的衍生题型，是从尾部开始计算然后向前进位。先分别用栈把两个链表存储起来，然后对于链表的顶部数据进行计算，如果需要进位就 carry 加入下一位运算。循环截至，遍历 stack，输出链表。

```js
var addTwoNumbers = function (l1, l2) {
  const stack1 = [];
  const stack2 = [];
  const stack = [];
  let carry = 0;
  while (l1) {
    stack1.push(l1.val);
    l1 = l1.next;
  }
  while (l2) {
    stack2.push(l2.val);
    l2 = l2.next;
  }
  while (stack1.length || stack2.length) {
    let num1 = stack1.length ? stack1.pop() : 0;
    let num2 = stack2.length ? stack2.pop() : 0;
    let sum = num1 + num2 + carry;
    stack.push(sum % 10);
    carry = Math.floor(sum / 10);
  }
  carry ? stack.push(carry) : '';
  let pivot = new ListNode(null);
  let curr = pivot;
  while (stack.length) {
    curr.next = new ListNode(stack.pop());
    curr = curr.next;
  }
  return pivot.next;
};
//Runtime: 140 ms, faster than 53.90% of JavaScript
```

## 拆分链表

### 奇偶链表

```
给定一个单链表，把所有的奇数节点和偶数节点分别排在一起。请注意，这里的奇数节点和偶数节点指的是节点编号的奇偶性，而不是节点的值的奇偶性。

请尝试使用原地算法完成。你的算法的空间复杂度应为 O(1)，时间复杂度应为 O(nodes)，nodes 为节点总数。

示例 1:

输入: 1->2->3->4->5->NULL
输出: 1->3->5->2->4->NULL
示例 2:

输入: 2->1->3->5->6->4->7->NULL
输出: 2->3->6->7->1->5->4->NULL
```

[leetcode](https://leetcode-cn.com/problems/odd-even-linked-list)

分析：对于奇偶数来说都是指向下下一个节点，node.next = node.next.next，得到一条奇数节点和偶数节点，奇数节点.next = 偶数链头

```js
var oddEvenList = function (head) {
  if (!head) return head;
  let odd = head;
  let even = head.next;
  let headEven = even;
  while (even && even.next) {
    odd.next = odd.next.next;
    even.next = even.next.next;
    odd = odd.next;
    even = even.next;
  }
  odd.next = headEven;
  return head;
};
//Runtime: 84 ms, faster than 89.51% of JavaScript
```

### 分隔链表

```
给定一个链表和一个特定值 x，对链表进行分隔，使得所有小于 x 的节点都在大于或等于 x 的节点之前。

你应当保留两个分区中每个节点的初始相对位置。

示例:

输入: head = 1->4->3->2->5->2, x = 3
输出: 1->2->2->4->3->5
```

[leetcode](https://leetcode-cn.com/problems/partition-list)
分析: 思维与上一题大同小异，分别采用两条链表来存储小于 x 和大于等于 x 的值。

```js
var partition = function (head, x) {
  if (!head) return head;
  let smallerHead = new ListNode(null);
  let biggerHead = new ListNode(null);
  let smaller = smallerHead;
  let bigger = biggerHead;
  while (head) {
    if (head.val < x) {
      smaller.next = new ListNode(head.val);
      smaller = smaller.next;
      smaller.next = null;
    } else {
      bigger.next = new ListNode(head.val);
      bigger = bigger.next;
      bigger.next = null;
    }
    head = head.next;
  }
  smaller.next = biggerHead.next;
  return smallerHead.next;
};
//Runtime: 84 ms, faster than 72.32% of JavaScript
```

## 环

### 环形链表

```
如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。注意：pos 不作为参数进行传递，仅仅是为了标识链表的实际情况。

如果链表中存在环，则返回 true 。 否则，返回 false 。
```

[leetcode](https://leetcode-cn.com/problems/linked-list-cycle)
分析 1：快慢指针法。从链表头开始，快指针每次走两步，慢指针每次走一步，如果节点值相同，说明有环。如果不同，继续循环。

```js
var hasCycle = function (head) {
  let fast = head;
  let slow = head;
  while (fast && fast.next && fast.next.next) {
    fast = fast.next.next;
    slow = slow.next;
    if (fast === slow) {
      return true;
    }
  }
  return false;
};
//Runtime: 84 ms, faster than 74.06% of JavaScript
```

分析 2：借助哈希表。哈希表存储曾经遍历过的节点，遍历每一个节点，都查看哈希表是否存在当前节点，如果存在，则说明链表有环；如果不存在，则存入哈希表，并继续遍历下一节点。

```js
var hasCycle = function (head) {
  let map = new Map();
  while (head) {
    if (map.has(head)) return true;
    map.set(head, true);
    head = head.next;
  }
  return false;
};
//Runtime: 76 ms, faster than 96.70% of JavaScript
```

### 环形链表 II

```
给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。
```

[leetcode](https://leetcode-cn.com/problems/linked-list-cycle-ii/)

分析 1：快慢指针法。和上一题的方法一样，从链表头开始，快指针每次走两步，慢指针每次走一步。
![](/blog/imgs/algorithm/linked_list_sycle.png)
D：头节点到入环点的距离
S1：从入环点到首次相遇点的距离
S2：从首次相遇点到入环点的距离
相遇时，慢指针走的 D+S1，快指针走的距离 D+n(S1+S2)+S1。快指针是慢指针的两倍。并且假设 n 为 1 时，会得到 D=S2。
所以当在第一次相遇之后，从链表头部和相遇点继续以步速相同前进，两者相遇时就是入环点。

```js
var detectCycle = function (head) {
  let fast = head;
  let slow = head;
  while (fast && fast.next && fast.next.next) {
    fast = fast.next.next;
    slow = slow.next;
    if (slow === fast) {
      slow = head;
      while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
      }
      return slow;
    }
  }
  return null;
};
//Runtime: 84 ms, faster than 87.83% of JavaScript
```

分析 2：借助哈希表。思路同上一题。

```js
var detectCycle = function (head) {
  let map = new Map();
  while (head) {
    if (map.has(head)) return head;
    map.set(head, true);
    head = head.next;
  }
  return null;
};
//Runtime: 80 ms, faster than 95.47% of JavaScript
```

## 其他

### 回文链表

```
请判断一个链表是否为回文链表。

示例 1:                          示例 2:

输入: 1->2                       输入: 1->2->2->1
输出: false                      输出: true
```

[leetcode](https://leetcode-cn.com/problems/palindrome-linked-list/)
分析 1：先获得链表长度，然后把前面部分链表翻转，最后对前后两段链表进行比较。

```js
var isPalindrome = function (head) {
  if (!head) return true;
  const length = getLength(head);
  let [left, right] = reseveHalf(head, length);
  while (left && right) {
    if (left.val !== right.val) {
      return false;
    }
    left = left.next;
    right = right.next;
  }
  return !left && !right;
};

var reseveHalf = (head, length) => {
  let half = Math.floor(length / 2);
  let prev = null;
  let curr = head;
  while (half--) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return length % 2 === 0 ? [prev, curr] : [prev, curr.next];
};

var getLength = (head) => {
  let curr = head;
  let length = 0;
  while (curr) {
    length++;
    curr = curr.next;
  }
  return length;
};
//Runtime: 92 ms, faster than 35.24% of JavaScript
```

分析 2: 遍历链表放入数组，然后通过数组判断。

```js
var isPalindrome = function (head) {
  if (head === null) return true;
  let ll = head;
  const arr = [ll.val];

  while (ll.next !== null) {
    ll = ll.next;
    arr.push(ll.val);
  }

  let low = 0;
  let high = arr.length - 1;

  while (low < high) {
    if (arr[low] === arr[high]) {
      low++;
      high--;
    } else {
      return false;
    }
  }
  return true;
};
//Runtime: 76 ms, faster than 93.50% of JavaScript
```

### 相交链表

```
编写一个程序，找到两个单链表相交的起始节点。

输入：intersectVal = 8, listA = [4,1,8,4,5], listB = [5,0,1,8,4,5], skipA = 2, skipB = 3
输出：Reference of the node with value = 8
输入解释：相交节点的值为 8 （注意，如果两个链表相交则不能为 0）。从各自的表头开始算起，链表 A 为 [4,1,8,4,5]，链表 B 为 [5,0,1,8,4,5]。在 A 中，相交节点前有 2 个节点；在 B 中，相交节点前有 3 个节点。

输入：intersectVal = 2, listA = [0,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
输出：Reference of the node with value = 2
输入解释：相交节点的值为 2 （注意，如果两个链表相交则不能为 0）。从各自的表头开始算起，链表 A 为 [0,9,1,2,4]，链表 B 为 [3,2,4]。在 A 中，相交节点前有 3 个节点；在 B 中，相交节点前有 1 个节点。
```

[leetcode](https://leetcode-cn.com/problems/intersection-of-two-linked-lists)
分析 1：先遍历 headA 并打上标记，再遍历 headB 寻找标记。

```js
var getIntersectionNode = function (headA, headB) {
  while (headA) {
    headA.flag = true;
    headA = headA.next;
  }
  while (headB) {
    if (headB.flag) return headB;
    z;
    headB = headB.next;
  }
  return null;
};
//Runtime: 96 ms, faster than 94.80% of JavaScript
```

分析 2：双指针法。初始化两个指针 pA 和 pB 分别指向 headA 和 headB，每次 pA 和 pB 各走一步，当 pA 触底后变轨到 headB，同理，当 pB 触底后变轨到 headA。这样就只需遍历(A 的非公共部分+B 的非公共部分+AB 的公共部分)

```js
var getIntersectionNode = function (headA, headB) {
  var pA = headA;
  var pB = headB;
  while (pA !== pB) {
    pB = pB ? pB.next : headA;
    pA = pA ? pA.next : headB;
  }
  return pA;
};
```

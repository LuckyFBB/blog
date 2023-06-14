---
title: 常见算法合集
group:
  title: 算法思路
  order: 2
order: 4
---

前面的文章中，对于一些使用较多的数据结构进行了学习总结，接来下会针对一些常见算法进行总结。

<!-- more -->

## 滑动窗口类型

滑动窗口类型经常是用来执行数组或者链表上某个区间(窗口)上的操作。
可分为固定窗口大小和可变窗口大小。

识别滑动窗口的招数：

- 输入是一些线性结构：比如链表/数组/字符串啊之类的
- 让你去求最长/最短子字符串或是某些特定的长度要求

某博主总结的滑动窗口框架

```js
/* 滑动窗口算法框架 */
function slidingWindow(s, t) {
  const need = new Map();
  const window = new Map();
  for (let i = 0; i < t.length; i++) {
    const char = s[i];
    need.has(char) ? need.set(char, need.get(char) + 1) : need.set(char, 1);
  }
  let left = 0;
  let right = 0;
  let valid = 0;
  while (right < s.length) {
    // c 是将移入窗口的字符
    let c = s[right];
    // 右移窗口
    right++;
    // 进行窗口内数据的一系列更新

    // 判断左侧窗口是否要收缩
    while (window should shrink) {
      // d 是将移出窗口的字符
      let d = s[left];
      // 左移窗口
      left++;
      // 进行窗口内数据的一系列更新
    }
  }
}
```

只需关注这几个问题：

1. 当移动 right，扩大窗口时，哪些数据需要更新。
2. 什么条件下，我们需要缩小窗口，移动 left。
3. 当移动 left，缩小窗口时，哪些数据需要做处理。

### 3-无重复字符的最长子串

```
给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

示例 1:

输入: s = "abcabcbb"
输出: 3
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

示例 2:

输入: s = ""
输出: 0
```

[LeetCode](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters)

分析：按着上面提供的模板。往 window 滑窗中，加入当前 char 值，然后判断当前 window 中 char 值是否唯一，如果不唯一就改变 left 缩小窗口。比较当前 right-left 与 res 的值。

```js
var lengthOfLongestSubstring = function (s) {
  if (!s.length) return 0;
  let left = 0;
  let right = 0;
  const window = new Map();
  let res = -Infinity;
  while (right < s.length) {
    let char = s[right];
    right++;
    window.has(char)
      ? window.set(char, window.get(char) + 1)
      : window.set(char, 1);
    while (window.get(char) > 1) {
      const leftC = s[left];
      window.set(leftC, window.get(leftC) - 1);
      left++;
    }
    res = Math.max(res, right - left);
  }
  return res;
};
//Runtime: 116 ms, faster than 65.59% of JavaScript
```

### 438-找到字符串中所有字母异位词

```
给定一个字符串 s 和一个非空字符串 p，找到 s 中所有是 p 的字母异位词的子串，返回这些子串的起始索引。

字符串只包含小写英文字母，并且字符串 s 和 p 的长度都不超过 20100。

说明：

字母异位词指字母相同，但排列不同的字符串。
不考虑答案输出的顺序。
示例 1:
输入:
s: "cbaebabacd" p: "abc"
输出:
[0, 6]
解释:
起始索引等于 0 的子串是 "cba", 它是 "abc" 的字母异位词。
起始索引等于 6 的子串是 "bac", 它是 "abc" 的字母异位词。
```

[LeetCode](https://leetcode-cn.com/problems/find-all-anagrams-in-a-string)
分析：题目中的字母异位词，实际上就是字母的不同排列。首先先获取到 p 中所有的字符和个数。思考上述三个问题，当 right 扩大时，如果 p 字符串中有这个字符，在 window 中更新字符的值，p 和窗口中当前字符数量相同，valid++；当 right-left 即窗口的大小>p 的长度时，缩小窗口；在缩小窗口时，valid=need.size 即满足条件，把 left 作为结果之一，更新 valid 和 window 的数据。

```js
var findAnagrams = function (s, p) {
  const need = new Map();
  for (let i = 0; i < p.length; i++) {
    const char = p[i];
    need.has(char) ? need.set(char, need.get(char) + 1) : need.set(char, 1);
  }
  const window = new Map();
  const res = [];
  let left = 0;
  let right = 0;
  let valid = 0;
  while (right < s.length) {
    let char = s[right];
    if (need.has(char)) {
      window.has(char)
        ? window.set(char, window.get(char) + 1)
        : window.set(char, 1);
      if (need.get(char) === window.get(char)) {
        valid++;
      }
    }
    right++;
    while (right - left >= p.length) {
      if (valid === need.size) {
        res.push(left);
      }
      const leftC = s[left];
      if (need.has(leftC)) {
        if (need.get(leftC) === window.get(leftC)) {
          valid--;
        }
        window.set(leftC, window.get(leftC) - 1);
      }
      left++;
    }
  }
  return res;
};
//Runtime: 116 ms, faster than 66.80% of JavaScript
```

### 567-字符串的排列

```
给定两个字符串 s1 和 s2，写一个函数来判断 s2 是否包含 s1 的排列。
换句话说，第一个字符串的排列之一是第二个字符串的子串。

示例1:
输入: s1 = "ab" s2 = "eidbaooo"
输出: True
解释: s2 包含 s1 的排列之一 ("ba").

示例2:
输入: s1= "ab" s2 = "eidboaoo"
输出: False
```

[LeetCode](https://leetcode-cn.com/problems/permutation-in-string)

分析：和上一题一致。只是返回结果不一样。

```js
var checkInclusion = function (s1, s2) {
  const need = new Map();
  for (let i = 0; i < s1.length; i++) {
    const char = s1[i];
    need.has(char) ? need.set(char, need.get(char) + 1) : need.set(char, 1);
  }
  let left = 0;
  let right = 0;
  let valid = 0;
  const window = new Map();
  while (right < s2.length) {
    const char = s2[right];
    right++;
    if (need.has(char)) {
      window.has(char)
        ? window.set(char, window.get(char) + 1)
        : window.set(char, 1);
      if (need.get(char) === window.get(char)) {
        valid++;
      }
    }
    while (right - left >= s1.length) {
      if (valid === need.size) {
        return true;
      }
      const leftC = s2[left];
      if (need.has(leftC)) {
        if (need.get(leftC) === window.get(leftC)) {
          valid--;
        }
        window.set(leftC, window.get(leftC) - 1);
      }
      left++;
    }
  }
  return false;
};
//Runtime: 88 ms, faster than 96.46% of JavaScript
```

### 159-至多包含两个不同字符的最长子串

```
给定一个字符串 s ，找出 至多 包含两个不同字符的最长子串 t ，并返回该子串的长度。

示例 1:
输入: "eceba"
输出: 3
解释: t 是 "ece"，长度为 3。

示例 2:
输入: "ccaabbb"
输出: 5
解释: t 是 "aabbb"，长度为 5。
```

[LeetCode](https://leetcode-cn.com/problems/longest-substring-with-at-most-two-distinct-characters)
分析：首先在扩大窗口时，如果滑窗大小不大于 2，就更新 window 中的数据值；当滑窗大小大于 2 时，缩小窗口；在缩小窗口时，当前字符的值减 1 且为 0 时将它从滑窗删除。

```js
var lengthOfLongestSubstringTwoDistinct = function (s) {
  const window = new Map();
  let left = 0;
  let right = 0;
  let k = 2;
  let res = 0;
  while (right < s.length) {
    const char = s[right++];
    if (window.size <= k) {
      window.has(char)
        ? window.set(char, window.get(char) + 1)
        : window.set(char, 1);
    }
    while (window.size > k) {
      const leftC = s[left];
      window.set(leftC, window.get(leftC) - 1);
      if (window.get(leftC) === 0) {
        window.delete(leftC);
      }
      left++;
    }
    res = Math.max(res, right - left);
  }
  return res;
};
```

### 340-最多有 K 个不同字符的最长子串

```
给定一个字符串 s ，找出 至多 包含 k 个不同字符的最长子串 T。

示例1：
输入: s = "eceba", k = 2
输出: 3
解释: 则 T 为 “ece”，所以长度为 3。

示例2：
输入: s = “aa”, k = 1
输出: 2
解释: 则 T 为 “aa”，所以长度为 2。
```

[Leetcode](https://leetcode-cn.com/problems/longest-substring-with-at-most-k-distinct-characters/)

分析：和上一题一样，把上一题中的 2 变为 k。

```js
var lengthOfLongestSubstringKDistinct = function (s, k) {
  const window = new Map();
  let left = 0;
  let right = 0;
  let res = 0;
  while (right < s.length) {
    const char = s[right++];
    if (window.size <= k) {
      window.has(char)
        ? window.set(char, window.get(char) + 1)
        : window.set(char, 1);
    }
    while (window.size > k) {
      const leftC = s[left];
      window.set(leftC, window.get(leftC) - 1);
      if (window.get(leftC) === 0) {
        window.delete(leftC);
      }
      left++;
    }
    res = Math.max(res, right - left);
  }
  return res;
};
```

### 992-K-个不同整数的子数组

```
给定一个正整数数组 A，如果 A 的某个子数组中不同整数的个数恰好为 K，则称 A 的这个连续、不一定独立的子数组为好子数组。（例如，[1,2,3,1,2] 中有 3 个不同的整数：1，2，以及 3。）返回 A 中好子数组的数目。

示例 1：
输入：A = [1,2,1,2,3], K = 2
输出：7
解释：恰好由 2 个不同整数组成的子数组：[1,2], [2,1], [1,2], [2,3], [1,2,1], [2,1,2], [1,2,1,2].

示例 2：
输入：A = [1,2,1,3,4], K = 3
输出：3
解释：恰好由 3 个不同整数组成的子数组：[1,2,1,3], [2,1,3], [1,3,4].
```

[LeetCode](https://leetcode-cn.com/problems/subarrays-with-k-different-integers)

分析：按着上列问题，分别解答容易得到 subarraysLessKDistinct 函数，但是得到的结果是 K 含 K 以下的值，再减去 K-1 含 K-1 以下得到 K 的结果。

```js
var subarraysWithKDistinct = function (A, K) {
  function subarraysLessKDistinct(A, K) {
    let left = 0;
    let right = 0;
    const window = new Map();
    let res = 0;
    while (right < A.length) {
      const num = A[right];
      window.has(num)
        ? window.set(num, window.get(num) + 1)
        : window.set(num, 1);
      while (window.size > K) {
        const LeftN = A[left];
        window.set(LeftN, window.get(LeftN) - 1);
        if (window.get(LeftN) === 0) {
          window.delete(LeftN);
        }
        left++;
      }
      res += right - left + 1;
      right++;
    }
    return res;
  }
  return subarraysLessKDistinct(A, K) - subarraysLessKDistinct(A, K - 1);
};
//Runtime: 132 ms, faster than 36.84% of JavaScript
```

## 快慢指针

快慢指针：这种算法的两个指针在数组或链表上的移动速度不一样。大多情况下用于判断链表中是否有环的情况。

### 141-环形链表

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

### 142-环形链表 II

```
给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。
```

[leetcode](https://leetcode-cn.com/problems/linked-list-cycle-ii/)

分析 1：快慢指针法。和上一题的方法一样，从链表头开始，快指针每次走两步，慢指针每次走一步。
![](/image/linked_list_sycle.png)
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

### 876-链表的中间节点

```
给定一个头结点为 head 的非空单链表，返回链表的中间结点。
如果有两个中间结点，则返回第二个中间结点。

示例1:
输入：[1,2,3,4,5]
输出：此列表中的结点 3 (序列化形式：[3,4,5])
返回的结点值为 3 。 (测评系统对该结点序列化表述是 [3,4,5])。
注意，我们返回了一个 ListNode 类型的对象 ans，这样：
ans.val = 3, ans.next.val = 4, ans.next.next.val = 5, 以及 ans.next.next.next = NULL.

示例2：
输入：[1,2,3,4,5,6]
输出：此列表中的结点 4 (序列化形式：[4,5,6])
由于该列表有两个中间结点，值分别为 3 和 4，我们返回第二个结点。
```

[leetcode](https://leetcode.com/problems/middle-of-the-linked-list/)

分析：按着快慢指针的思路，我们设置 fast 指针的速度是 slow 指针的 2 倍，当 fast 或者 fast.next 为 null 的时候，fast 也已经到了链表末端，slow 速度是他的一半，所以指向中间节点。

```js
var middleNode = function (head) {
  let slow = head;
  let fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
};
```

### 19-删除链表的倒数第 n 个节点

```
给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。

示例：
给定一个链表: 1->2->3->4->5, 和 n = 2.
当删除了倒数第二个节点后，链表变为 1->2->3->5.
```

[leetcode](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list)

采用快慢指针。使得 fast 在 slow 前的 n 个位置，当 fast 到达链表尾节点时，slow.next 指向当前需删除的节点。

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

## 双指针

双指针一般是在数组中指两个索引值，初始化为 left=0,right=length-1。
两个指针朝着左右方向移动，直到有一个或者两个满足条件。
左右指针通常用在排好顺序的数组/链表中寻找对子。

识别使用双指针的招数：

- 一般来说，数组或是链表是排好序的，你得在里头找一些组合满足某种限制条件
- 这种组合可能是一对数，三个数，或是一个子数组

### 167-两数之和 II - 输入有序数组

```
给定一个已按照升序排列   的有序数组，找到两个数使得它们相加之和等于目标数。

函数应该返回这两个下标值 index1 和 index2，其中 index1  必须小于  index2。

说明:
1. 返回的下标值（index1 和 index2）不是从零开始的。
2. 你可以假设每个输入只对应唯一的答案，而且你不可以重复使用相同的元素。

示例:
输入: numbers = [2, 7, 11, 15], target = 9
输出: [1,2]
解释: 2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 。
```

[LeetCode](https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted)

分析：使用左右指针，让数组左右的数组相加和 target 对比，如果大于 target 移动右指针，小于 target 移动左指针，等于则返回当前 left/right。

```js
var twoSum = function (numbers, target) {
  let left = 0;
  let right = numbers.length - 1;
  while (right > left) {
    if (numbers[right] + numbers[left] === target) {
      return [left + 1, right + 1];
    } else if (numbers[right] + numbers[left] > target) {
      right--;
    } else {
      left++;
    }
  }
};
```

### 26-删除排序数组中的重复项

```
给定一个排序数组，你需要在 原地 删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。

不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。

示例  1:
给定数组 nums = [1,1,2],
函数应该返回新的长度 2, 并且原数组 nums 的前两个元素被修改为 1, 2。
你不需要考虑数组中超出新长度后面的元素。

示例  2:
给定 nums = [0,0,1,1,1,2,2,3,3,4],
函数应该返回新的长度 5, 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4。
你不需要考虑数组中超出新长度后面的元素。
```

[LeetCode](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-arra)

分析：使用双指针 slow 和 fast，只要 nums[slow]===nums[fast]我们就增加 fast 的值，跳过重复项，当 nums[slow]!=nums[fast]时，重复项已经结束。把当前 fast 对应的值复制到 slow，使得[0,slow]均为不重复数字。

```js
var removeDuplicates = function (nums) {
  let slow = 0;
  for (let fast = 0; fast < nums.length; fast++) {
    if (nums[slow] !== nums[fast]) {
      slow++;
      nums[slow] = nums[fast];
    }
  }
  return slow + 1;
};
//Runtime: 88 ms, faster than 90.39% of JavaScript
```

### 977-有序数组的平方

```
给定一个按非递减顺序排序的整数数组 A，返回每个数字的平方组成的新数组，要求也按非递减顺序排序。

示例 1：
输入：[-4,-1,0,3,10]
输出：[0,1,9,16,100]

示例 2：
输入：[-7,-3,2,3,11]
输出：[4,9,9,49,121]
```

[LeetCode](https://leetcode-cn.com/problems/squares-of-a-sorted-array)

分析：数组是有序的，数组平方最大值就在数组的两端，但是可能存在负数平方之后成为最大数。采取左右指针，从两边往中间比较，依次放入 res。

```js
var sortedSquares = function (nums) {
  let left = 0;
  let right = nums.length - 1;
  let index = nums.length - 1;
  const res = [];
  while (left <= right) {
    if (nums[left] * nums[left] < nums[right] * nums[right]) {
      res[index--] = nums[right] * nums[right];
      right--;
    } else {
      res[index--] = nums[left] * nums[left];
      left++;
    }
  }
  return res;
};
```

### 15-三数之和

```
给你一个包含 n 个整数的数组  nums，判断  nums  中是否存在三个元素 a，b，c ，使得  a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。

注意：答案中不可以包含重复的三元组。

示例：
给定数组 nums = [-1, 0, 1, 2, -1, -4]，
满足要求的三元组集合为：
[
  [-1, 0, 1],
  [-1, -1, 2]
]
```

[LeetCode](https://leetcode-cn.com/problems/3sum)

分析：三数之和为 0，可以转换为两数之和为 target 这解题思路。但是值得注意的是答案中不包含重复的三元组，因此需要对一些数据做处理。在 nums[i]找到第一个匹配之后，需要继续匹配剩下数字且不重复，所以需要和当前 start 和 end 值进行比较，做出对应的处理。

```js
var threeSum = function (nums) {
  const ans = [];
  const length = nums.length;
  if (nums === null || length < 3) return ans;
  nums = nums.sort((a, b) => a - b); //先对数组排序
  for (let i = 0; i < length; i++) {
    if (nums[i] > 0) break; //如果当前数据大于0，则后续均大于0，不会出现等于0现象
    if (i > 0 && nums[i] === nums[i - 1]) {
      //如果相邻两个数字一样，跳过
      continue;
    }
    let start = i + 1;
    let end = length - 1;
    //求解两数之和的思路
    while (start < end) {
      const sum = nums[i] + nums[start] + nums[end];
      if (sum === 0) {
        ans.push([nums[i], nums[start], nums[end]]);
        //跳过已经满足条件的start和end值，满足不重复条件
        while (start < end && nums[start] === nums[start + 1]) start++;
        while (start < end && nums[end] === nums[end + 1]) end--;
        start++;
        end--;
      } else if (sum > 0) {
        end--;
      } else {
        start++;
      }
    }
  }
  return ans;
};
//Runtime: 140 ms, faster than 91.49% of JavaScript
```

### 16-最接近的三数之和

```
给定一个包括 n 个整数的数组 nums 和 一个目标值 target。找出 nums 中的三个整数，使得它们的和与 target 最接近。返回这三个数的和。假定每组输入只存在唯一答案。

示例：
输入：nums = [-1,2,1,-4], target = 1
输出：2
解释：与 target 最接近的和是 2 (-1 + 2 + 1 = 2) 。
```

[Leetcode](https://leetcode-cn.com/problems/3sum-closest/)

分析：与上一题大致相同，尽在处理 target 的时候不同。

```js
var threeSumClosest = function (nums, target) {
  let ans = Infinity;
  const length = nums.length;
  if (nums === null || length < 3) return ans;
  nums = nums.sort((a, b) => a - b);
  for (let i = 0; i < length; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }
    let start = i + 1;
    let end = length - 1;
    while (start < end) {
      const sum = nums[i] + nums[start] + nums[end];
      if (sum === target) {
        return target;
      }
      if (Math.abs(sum - target) < Math.abs(ans - target)) {
        ans = sum;
      }
      if (sum < target) {
        while (start < end && nums[start] === nums[start + 1]) start++;
        start++;
      } else {
        while (start < end && nums[end] === nums[end - 1]) end--;
        end--;
      }
    }
  }
  return ans;
};
```

### 713 乘积小于 k 的子数组

```
给定一个正整数数组  nums。

找出该数组内乘积小于  k  的连续的子数组的个数。

示例 1:
输入: nums = [10,5,2,6], k = 100
输出: 8
解释: 8个乘积小于100的子数组分别为: [10], [5], [2], [6], [10,5], [5,2], [2,6], [5,2,6]。
需要注意的是 [10,5,2] 并不是乘积小于100的子数组。
```

[LeetCode](https://leetcode-cn.com/problems/subarray-product-less-than-k)

分析：连续的子数组，所以采取累积乘法，left 为子数组开头，right 为末尾，满足条件时，right-left+1 就为新增的满足条件的值，right 右移。如果不满足条件，则 left 左移。

```js
var numSubarrayProductLessThanK = function (nums, k) {
  let left = 0;
  let right = 0;
  let ans = 0;
  let temp = 1;
  if (k <= 1) return 0;
  while (right < nums.length) {
    temp *= nums[right];
    while (temp >= k) {
      temp /= nums[left++];
    }
    ans += right - left + 1;
    right++;
  }
  return ans;
};
```

## 区间问题

区间的很多问题中，通常需要判断是否有重叠，要么合并区间。
对于给定的两个区间 a，b 来说，可能存在三种情况--覆盖/交叉(可合并成一个大区间)/不相交。

<div >![](/image/algorithm/interval.png)</div>

技巧:

- 排序：按着区间起点升序排列，起点相同，则按着终点降序排列。
- 画图：将区间的相对位置罗列出来。

识别：

- 当你需要产生一堆相互之间没有交集的区间的时候
- 当你听到重叠区间的时候

还有一类区间问题是调度问题，设计算法求得区间内最多几个互不相交的区间。
技巧：

- 按区间终点升序排列。
- 前一项的 end<后一项的 start，则不存在相交。

<div >![](/image/algorithm/interval_b.png)</div>

### 1288-删除被覆盖区间

```
给你一个区间列表，请你删除列表中被其他区间所覆盖的区间。
只有当 c <= a 且 b <= d 时，我们才认为区间 [a,b) 被区间 [c,d) 覆盖。
在完成所有删除操作后，请你返回列表中剩余区间的数目。

示例：
输入：intervals = [[1,4],[3,6],[2,8]]
输出：2
解释：区间 [3,6] 被区间 [2,8] 覆盖，所以它被删除了。
```

[LeetCode](https://leetcode-cn.com/problems/remove-covered-intervals)

分析：

```js
var removeCoveredIntervals = function (intervals) {
  intervals = intervals.sort((a, b) => {
    if (a[0] === b[0]) return b[1] - a[1];
    return a[0] - b[0];
  });
  let right = intervals[0][1];
  let res = 0;
  for (let i = 1; i < intervals.length; i++) {
    const intv = intervals[i];
    if (right >= intv[1]) {
      res++;
    } else {
      right = intv[1];
    }
  }
  return intervals.length - res;
};
//Runtime: 88 ms, faster than 69.42% of JavaScript
```

### 56-合并区间

```
给出一个区间的集合，请合并所有重叠的区间。

示例 1:
输入: intervals = [[1,3],[2,6],[8,10],[15,18]]
输出: [[1,6],[8,10],[15,18]]
解释: 区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].

示例 2:
输入: intervals = [[1,4],[4,5]]
输出: [[1,5]]
解释: 区间 [1,4] 和 [4,5] 可被视为重叠区间。
```

[Leetcode](https://leetcode-cn.com/problems/merge-intervals/)

分析：先排序。分析得到后一项的左边界<=前一项的右边界且后一项的右边界>前一项的右边界，两者相交，需要把前一项的右边界更新。如果两者不相交，直接放入结果值。

```js
var merge = function (intervals) {
  if (intervals.length == 0) return [];
  intervals = intervals.sort((a, b) => {
    if (a[0] === b[0]) {
      return b[1] - a[1];
    }
    return a[0] - b[0];
  });
  const res = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] > res[res.length - 1][1]) {
      res.push(intervals[i]);
    } else if (res[res.length - 1][1] < intervals[i][1]) {
      res[res.length - 1][1] = intervals[i][1];
    }
  }
  return res;
};
//Runtime: 80 ms, faster than 98.84% of JavaScript
```

### 986-区间列表的交集

```
给定两个由一些 闭区间 组成的列表，每个区间列表都是成对不相交的，并且已经排序。
返回这两个区间列表的交集。
（形式上，闭区间 [a, b]（其中 a <= b）表示实数 x 的集合，而 a <= x <= b。两个闭区间的交集是一组实数，要么为空集，要么为闭区间。例如，[1, 3] 和 [2, 4] 的交集为 [2, 3]。）
示例：

输入：A = [[0,2],[5,10],[13,23],[24,25]], B = [[1,5],[8,12],[15,24],[25,26]]
输出：[[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

[LeetCode](https://leetcode-cn.com/problems/interval-list-intersections)

分析：对于一组数据，要找交集列表，交集的 start 是两个数组中较大的左边界(红线)，交集的 end 是两个数组中较小的右边界(绿线)。如果 start<=end，即有交集[start,end]。右边界较小的区间 point 向下一个区间移动。

<div >![](/image/algorithm/interval_a.png)</div>

```js
var intervalIntersection = function (A, B) {
  let pointA = 0;
  let pointB = 0;
  const res = [];
  while (pointA < A.length && pointB < B.length) {
    const start = Math.max(A[pointA][0], B[pointB][0]);
    const end = Math.min(A[pointA][1], B[pointB][1]);
    if (start <= end) {
      res.push([start, end]);
    }
    if (A[pointA][1] <= B[pointB][1]) {
      pointA++;
    } else {
      pointB++;
    }
  }
  return res;
};
//Runtime: 96 ms, faster than 97.35% of JavaScript
```

### 57-插入区间

```
给出一个无重叠的 ，按照区间起始端点排序的区间列表。
在列表中插入一个新的区间，你需要确保列表中的区间仍然有序且不重叠（如果有必要的话，可以合并区间）。

示例  1：
输入：intervals = [[1,3],[6,9]], newInterval = [2,5]
输出：[[1,5],[6,9]]

示例  2：
输入：intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
输出：[[1,2],[3,10],[12,16]]
解释：这是因为新的区间 [4,8] 与 [3,5],[6,7],[8,10]  重叠。
```

[LeetCode](https://leetcode-cn.com/problems/insert-interval)

分析 1：把 newIntervals 放入 intervals 中再次排序，然后合并区间。

```js
var insert = function (intervals, newInterval) {
  intervals = intervals.concat([newInterval]).sort((a, b) => {
    if (a[0] === b[0]) return b[1] - a[1];
    return a[0] - b[0];
  });
  const res = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    if (res[res.length - 1][1] < intervals[i][0]) {
      res.push(intervals[i]);
    } else if (res[res.length - 1][1] < intervals[i][1]) {
      res[res.length - 1][1] = intervals[i][1];
    }
  }
  return res;
};
//Runtime: 92 ms, faster than 66.14% of JavaScript
```

分析 2：先把小于 newIntervals[0]的区间放入结果值；然后合并相交区间，放入结果值；把大于 newIntervals[1]的区间放入结果值。

```js
var insert = function (intervals, newInterval) {
  const res = [];
  const length = intervals.length;
  let point = 0;
  while (point < length && intervals[point][1] < newInterval[0]) {
    res.push(intervals[point]);
    point++;
  }
  while (point < length && intervals[point][0] <= newInterval[1]) {
    newInterval[0] = Math.min(intervals[point][0], newInterval[0]);
    newInterval[1] = Math.max(intervals[point][1], newInterval[1]);
    point++;
  }
  res.push(newInterval);
  while (point < length) {
    res.push(intervals[point]);
    point++;
  }
  return res;
};
//Runtime: 72 ms, faster than 99.82% of JavaScript
```

### 435-无重叠区间

```
给定一个区间的集合，找到需要移除区间的最小数量，使剩余区间互不重叠。

注意:

可以认为区间的终点总是大于它的起点。
区间 [1,2] 和 [2,3] 的边界相互“接触”，但没有相互重叠。

示例 1:
输入: [ [1,2], [2,3], [3,4], [1,3] ]
输出: 1
解释: 移除 [1,3] 后，剩下的区间没有重叠。

示例 2:
输入: [ [1,2], [1,2], [1,2] ]
输出: 2
解释: 你需要移除两个 [1,2] 来使剩下的区间没有重叠。

示例 3:
输入: [ [1,2], [2,3] ]
输出: 0
解释: 你不需要移除任何区间，因为它们已经是无重叠的了。
```

[LeetCode](https://leetcode-cn.com/problems/non-overlapping-intervals)
分析：根据上述思路，先按着终点升序排列。依次比较前一项的 end 和后一项的 start，若 start>end 则不相交。求得不相交的区间 acount，再用数组长度 n-count 就得到需要移除的个数。

```js
var eraseOverlapIntervals = function (intervals) {
  let n = intervals.length;
  if (n === 0) {
    return 0;
  }
  intervals.sort((a, b) => {
    return a[1] - b[1];
  });
  let count = 1;
  let end = intervals[0][1];
  for (const inter of intervals) {
    let curStart = inter[0];
    if (curStart >= end) {
      count++;
      end = inter[1];
    }
  }
  return n - count;
};
//Runtime: 72 ms, faster than 98.91% of JavaScript
```

### 452-用最少数量的箭引爆气球

```
在二维空间中有许多球形的气球。对于每个气球，提供的输入是水平方向上，气球直径的开始和结束坐标。由于它是水平的，所以纵坐标并不重要，因此只要知道开始和结束的横坐标就足够了。开始坐标总是小于结束坐标。

一支弓箭可以沿着 x 轴从不同点完全垂直地射出。在坐标 x 处射出一支箭，若有一个气球的直径的开始和结束坐标为 xstart，xend， 且满足  xstart ≤ x ≤ xend，则该气球会被引爆。可以射出的弓箭的数量没有限制。 弓箭一旦被射出之后，可以无限地前进。我们想找到使得所有气球全部被引爆，所需的弓箭的最小数量。

给你一个数组 points ，其中 points [i] = [xstart,xend] ，返回引爆所有气球所必须射出的最小弓箭数。

 
示例 1：

输入：points = [[10,16],[2,8],[1,6],[7,12]]
输出：2
解释：对于该样例，x = 6 可以射爆 [2,8],[1,6] 两个气球，以及 x = 11 射爆另外两个气球
示例 2：

输入：points = [[1,2],[3,4],[5,6],[7,8]]
输出：4
```

[Leetcode](https://leetcode-cn.com/problems/minimum-number-of-arrows-to-burst-balloons)

分析：随机射出一支箭，调整箭的位置能够引爆更多数目的气球。也就能转换成求一共有多少个重叠区间。前文总结有前一项的 end>后一项的 start 就有重叠。当后一项与前一项不再重叠时，就需要射新的箭了。

```js
var findMinArrowShots = function (points) {
  if (!points.length) return 0;
  points = points.sort((a, b) => {
    if (a[1] === b[1]) return b[0] - a[0];
    return a[1] - b[1];
  });
  let end = points[0][1];
  let count = 1;
  for (let i = 1; i < points.length; i++) {
    const point = points[i];
    const curStart = point[0];
    if (curStart > end) {
      count++;
      end = points[i][1];
    }
  }
  return count;
};
//Runtime: 112 ms, faster than 85.19% of JavaScript
```

## 循环排序

用于处理数组中的数值限定在一定的区间的问题。遍历数组中的元素，如果当前数它不在其应该在的位置的话，就和应该在位置上的数字交换一下。

假设有一个数组为[2,3,4,1,0]，循环排序的方式为：

1. 第一个元素为 2，那么他应该在 index 为 2 的位置，所以把它和 index=2 的元素交换，变成[4,3,2,1,0]。
2. 第一个元素为 4，那么他应该在 index 为 4 的位置，所以把它和 index=4 的元素交换，变成[0,1,2,3,4]。
3. 第一个元素为 0，那么他应该在 index 为 0 的位置，它的位置是正确的，数组不变[0,1,2,3,4]，开始处理 index 为 1 的位置。
4. 第二个元素为 1，那么他应该在 index 为 1 的位置，它的位置是正确的，数组不变[0,1,2,3,4]，开始处理 index 为 2 的位置。
5. 第三个元素为 2，那么他应该在 index 为 2 的位置，它的位置是正确的，数组不变[0,1,2,3,4]，开始处理 index 为 3 的位置。
6. 第四个元素为 3，那么他应该在 index 为 3 的位置，它的位置是正确的，数组不变[0,1,2,3,4]，开始处理 index 为 4 的位置。
7. 第五个元素为 4，那么他应该在 index 为 4 的位置，它的位置是正确的，数组不变[0,1,2,3,4]，已经到达末尾，所有的元素都在正确的位置，循环排序结束。

代码实现：

```js
function cyclicSort(nums) {
  let index = 0; //目前指向的元素
  while (index < nums.length) {
    const targetIndex = nums[index]; //当前元素应该在的位置
    //判断当前元素是否在正确的位置
    if (nums[targetIndex] !== nums[index]) {
      //不正确，交换两者位置
      [nums[index], nums[targetIndex]] = [nums[targetIndex], nums[index]];
    } else {
      //正确，前往下一个元素
      index++;
    }
  }
  return nums;
}
```

识别：

- 涉及到排序好的数组，而且数值一般满足于一定的区间
- 在排好序/翻转过的数组中，寻找丢失/重复/最小的元素

### 287-寻找重复数

```
给定一个包含 n + 1 个整数的数组 nums，其数字都在 1 到 n 之间（包括 1 和 n），可知至少存在一个重复的整数。假设只有一个重复的整数，找出这个重复的数。

示例 1:
输入: [1,3,4,2,2]
输出: 2

示例 2:
输入: [3,1,3,4,2]
输出: 3
```

[Leetcode](https://leetcode-cn.com/problems/find-the-duplicate-number)

分析：使用一样的循环排序得到新的数组。然后再循环判断下标+1 和元素是否相同，如果不同元素就是重复元素。

```js
var findDuplicate = function (nums) {
  let index = 0;
  while (index < nums.length) {
    const targetIndex = nums[index] - 1;
    if (nums[targetIndex] !== nums[index]) {
      [nums[targetIndex], nums[index]] = [nums[index], nums[targetIndex]];
    } else {
      index++;
    }
  }
  for (let i = 0; i < nums.length; i++) {
    if (i + 1 !== nums[i]) return nums[i];
  }
};
//Runtime: 84 ms, faster than 59.24% of JavaScript
```

### 442-数组中重复的数据

```
给定一个整数数组 a，其中1 ≤ a[i] ≤ n （n为数组长度）, 其中有些元素出现两次而其他元素出现一次。
找到所有出现两次的元素。
你可以不用到任何额外空间并在O(n)时间复杂度内解决这个问题吗？

示例：
输入:
[4,3,2,7,8,2,3,1]
输出:
[2,3]
```

[Leetcode](https://leetcode-cn.com/problems/find-all-duplicates-in-an-array)

分析：数值满足一定的区间，可以先采用循环排序得到新的数组。再循环数组判断下标+1 是否和当前元素相同，如果不同说明是重复数字。因为数据从 1 开始，所以 targetIndex-1。

```js
var findDuplicates = function (nums) {
  let index = 0;
  const res = [];
  while (index < nums.length) {
    const targetIndex = nums[index] - 1;
    if (nums[targetIndex] !== nums[index]) {
      [nums[targetIndex], nums[index]] = [nums[index], nums[targetIndex]];
    } else {
      index++;
    }
  }
  for (let i = 0; i < nums.length; i++) {
    if (i + 1 !== nums[i]) res.push(nums[i]);
  }
  return res;
};
//Runtime: 112 ms, faster than 82.82% of JavaScript
```

### 268-丢失的数字

```
给定一个包含 [0, n] 中 n 个数的数组 nums ，找出 [0, n] 这个范围内没有出现在数组中的那个数。

进阶：
你能否实现线性时间复杂度、仅使用额外常数空间的算法解决此问题?
 
示例 1：
输入：nums = [3,0,1]
输出：2
解释：n = 3，因为有 3 个数字，所以所有的数字都在范围 [0,3] 内。2 是丢失的数字，因为它没有出现在 nums 中。

示例 2：
输入：nums = [9,6,4,2,3,5,7,0,1]
输出：8
解释：n = 9，因为有 9 个数字，所以所有的数字都在范围 [0,9] 内。8 是丢失的数字，因为它没有出现在 nums 中。
```

[Leetcode](https://leetcode-cn.com/problems/missing-number)

分析：使用一样的循环排序得到新的数组。然后再循环判断下标和元素是否相同，如果不同下标就是丢失元素。

```js
var missingNumber = function (nums) {
  let index = 0;
  while (index < nums.length) {
    let targerIndex = nums[index];
    if (nums[targerIndex] !== nums[index]) {
      [nums[targerIndex], nums[index]] = [nums[index], nums[targerIndex]];
    } else {
      index++;
    }
  }
  for (let i = 0; i <= nums.length; i++) {
    if (i !== nums[i]) return i;
  }
};
//Runtime: 88 ms, faster than 65.36% of JavaScript
```

### 448-找到所有数组中消失的数字

```
给定一个范围在  1 ≤ a[i] ≤ n ( n = 数组大小 ) 的 整型数组，数组中的元素一些出现了两次，另一些只出现一次。
找到所有在 [1, n] 范围之间没有出现在数组中的数字。
您能在不使用额外空间且时间复杂度为O(n)的情况下完成这个任务吗? 你可以假定返回的数组不算在额外空间内。

示例:
输入:
[4,3,2,7,8,2,3,1]
输出:
[5,6]
```

[Leetcode](https://leetcode-cn.com/problems/find-all-numbers-disappeared-in-an-array)
分析：上一题的改造题，从一个变成多个。使用一样的循环排序得到新的数组。然后再循环判断下标和元素是否相同，如果不同下标就是丢失元素。

```js
var findDisappearedNumbers = function (nums) {
  const res = [];
  let index = 0;
  while (index < nums.length) {
    let targetIndex = nums[index] - 1;
    if (nums[targetIndex] !== nums[index]) {
      [nums[targetIndex], nums[index]] = [nums[index], nums[targetIndex]];
    } else {
      index++;
    }
  }
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== i + 1) {
      res.push(i + 1);
    }
  }
  return res;
};
```

## 链表翻转

需要去翻转链表中某一段节点，通常要求原地翻转不使用额外的空间，这时需要采用原地翻转模式。

需要借助别的变量，一个变量指向头结点(current)，另一个指向处理完的节点(previous)。将 current 的指向 previous，然后移向下一个，同时 previous 更新到刚处理完的节点。

<div >![](/image/algorithm/reverseLink.png)</div>

```js
const next = current.next;
current.next = previous;
previous = current;
current = next;
```

### 206-反转链表

```
反转一个单链表。

示例:
输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL
```

[Leetcode](https://leetcode-cn.com/problems/reverse-linked-list/)
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

### 92-反转链表 II

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
```

### 24-两两交换链表中的节点

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
```

### 25-K 个一组翻转链表

```
给你一个链表，每 k 个节点一组进行翻转，请你返回翻转后的链表。
k 是一个正整数，它的值小于或等于链表的长度。
如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。

示例：
给你这个链表：1->2->3->4->5
当 k = 2 时，应当返回: 2->1->4->3->5
当 k = 3 时，应当返回: 3->2->1->4->5
```

[Leetcode](https://leetcode-cn.com/problems/reverse-nodes-in-k-group)
分析：链表分为已翻转部分+待反转部分+未反转部分。翻转的逻辑还是一样的，重点在于确定翻转的范围，必须通过 K 循环确认。记录翻转链表的前后指针，方便连接翻转部分。初始 pre 为翻转链表的前驱，end 为翻转链表的末尾，翻转链表的后继 next=end.next。翻转完成，将三个部分连接起来，重置 pre 和 end 指针进入下一次循环。特殊情况，当翻转部分长度不到 K，end===null 时，说明已经到达末尾，直接返回。

```js
var reverseKGroup = function (head, k) {
  const reverse = (head) => {
    let pre = null;
    let curr = head;
    while (curr !== null) {
      let next = curr.next;
      curr.next = pre;
      pre = curr;
      curr = next;
    }
    return pre;
  };
  const pivot = new ListNode(0);
  pivot.next = head;
  let prev = pivot;
  let end = pivot;
  while (end.next) {
    for (let i = 0; i < k && end !== null; i++) {
      end = end.next;
    }
    if (end === null) break;
    let start = prev.next;
    let next = end.next;
    end.next = null;
    prev.next = reverse(start);
    start.next = next;
    prev = start;
    end = prev;
  }
  return pivot.next;
};
```

## 树上的 BFS

Breadth First Search(BFS)，借助队列数据结构，从而保证树的节点按照他们的层数打印出来。打印完当前层所有元素，才能执行到下一层。所有这种需要遍历树且需要一层一层遍历的问题。

识别树上的 BFS 模式：

- 遍历树且需要按层操作的方式。

### 102-二叉树的层序遍历

```
给你一个二叉树，请你返回其按 层序遍历 得到的节点值。 （即逐层地，从左到右访问所有节点）。

示例：
二叉树：[3,9,20,null,null,15,7],
    3
   / \
  9  20
    /  \
   15   7
返回其层序遍历结果：
[[3],[9,20],[15,7]]
```

[Leetcode](https://leetcode-cn.com/problems/binary-tree-level-order-traversal)

```js
var levelOrder = function (root) {
  if (!root) return [];
  const queue = [root];
  const res = [];
  while (queue.length) {
    const length = queue.length;
    let level = [];
    for (let i = 0; i < length; i++) {
      const curr = queue.shift();
      level.push(curr.val);
      curr.left && queue.push(curr.left);
      curr.right && queue.push(curr.right);
    }
    res.push(level);
  }
  return res;
};
//Runtime: 80 ms, faster than 85.22% of JavaScript
```

### 103-二叉树的锯齿形层序遍历

```
给定一个二叉树，返回其节点值的锯齿形层序遍历。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。

例如：
给定二叉树 [3,9,20,null,null,15,7],
    3
   / \
  9  20
    /  \
   15   7
返回锯齿形层序遍历如下：
[[3],[20,9],[15,7]]
```

[Leetcode](https://leetcode-cn.com/problems/binary-tree-zigzag-level-order-traversal)

```js
var zigzagLevelOrder = function (root) {
  if (!root) return [];
  const queue = [[root, 0]];
  const res = [];
  while (queue.length) {
    let [node, depth] = queue.shift();
    res[depth]
      ? depth % 2 === 0
        ? res[depth].push(node.val)
        : res[depth].unshift(node.val)
      : (res[depth] = [node.val]);
    if (node.left) queue.push([node.left, depth + 1]);
    if (node.right) queue.push([node.right, depth + 1]);
  }
  return res;
};
//Runtime: 80 ms, faster than 76.41% of JavaScript
```

### 637-二叉树的层平均值

```
给定一个非空二叉树, 返回一个由每层节点平均值组成的数组。

示例 1：
输入：
    3
   / \
  9  20
    /  \
   15   7
输出：[3, 14.5, 11]
解释：
第 0 层的平均值是 3 ,  第1层是 14.5 , 第2层是 11 。因此返回 [3, 14.5, 11] 。
```

[Leetcode](https://leetcode-cn.com/problems/average-of-levels-in-binary-tree)

```js
var averageOfLevels = function (root) {
  const queue = [];
  const res = [];
  queue.push(root);
  while (queue.length) {
    let sum = 0;
    const levelLen = queue.length;
    for (let index = 0; index < levelLen; index++) {
      const curr = queue.shift();
      sum += curr.val;
      curr.left && queue.push(curr.left);
      curr.right && queue.push(curr.right);
    }
    res.push(sum / levelLen);
  }
  return res;
};
//Runtime: 84 ms, faster than 94.02 % of javascript
```

### 111-二叉树的最小深度

```
给定一个二叉树，找出其最小深度。
最小深度是从根节点到最近叶子节点的最短路径上的节点数量。
说明：叶子节点是指没有子节点的节点。

示例 1：
输入：root = [3,9,20,null,null,15,7]
输出：2

示例 2：
输入：root = [2,null,3,null,4,null,5,null,6]
输出：5
```

[Leetcode](https://leetcode-cn.com/problems/minimum-depth-of-binary-tree)

```js
var minDepth = function (root) {
  if (!root) return 0;
  const queue = [root];
  let depth = 0;
  while (queue.length) {
    const size = queue.length;
    depth++;
    for (let i = 0; i < size; i++) {
      const curr = queue.shift();
      if (!curr.left && !curr.right) {
        return depth;
      }
      curr.left && queue.push(curr.left);
      curr.right && queue.push(curr.right);
    }
  }
  return depth;
};
```

前面的博客中梳理了更多关于二叉树的题目，[点击查看](https://luckyfbb.github.io/2020/09/20/%E4%BA%8C%E5%8F%89%E6%A0%91%E7%9A%84%E8%A7%A3%E9%A2%98%E6%80%9D%E8%B7%AF/#more)

## 树上的 DFS

该模式是从根开始，如果该节点不是叶子节点，需要干三件事情：

1. 需要区别我们是先处理根节点(pre-order，前序)，处理孩子节点之间处理根节点(in-order，中序)，还是处理完所有孩子再处理根节点(post-order，后序)。
2. 递归处理当前节点的左右孩子

识别树形 DFS:

- 需要按前中后序的 DFS 方式遍历树
- 如果该问题的解一般离叶子节点比较近

### 257-二叉树的所有路径

```
给定一个二叉树，返回所有从根节点到叶子节点的路径。
说明: 叶子节点是指没有子节点的节点。

示例:
输入:
   1
 /   \
2     3
 \
  5

输出: ["1->2->5", "1->3"]
解释: 所有根节点到叶子节点的路径为: 1->2->5, 1->3
```

[Leetcode](https://leetcode-cn.com/problems/binary-tree-paths)
分析：利用前序遍历，当某个节点的左右子树都为 null 的时候，说明已经走完该路径

```js
var binaryTreePaths = function (root) {
  const res = [];
  const recur = (root, str) => {
    if (!root) return '';
    str += `${root.val}`;
    if (!root.left && !root.right) {
      res.push(str);
    } else {
      str += '->';
      recur(root.left, str);
      recur(root.right, str);
    }
  };
  recur(root, '');
  return res;
};
//Runtime: 76 ms,faster than 89.60 % of JavaScript
```

### 113-路径总和 II

```
给定一个二叉树和一个目标和，找到所有从根节点到叶子节点路径总和等于给定目标和的路径。
说明: 叶子节点是指没有子节点的节点。

示例:
给定如下二叉树，以及目标和 sum = 22，
              5
             / \
            4   8
           /   / \
          11  13  4
         /  \    / \
        7    2  5   1
返回:[[5,4,11,2],[5,8,4,5]]
```

[Leetcode](https://leetcode-cn.com/problems/path-sum-ii)

```js
var pathSum = function (root, sum) {
  let res = [];
  const dfs = (root, sum, arr) => {
    if (!root) return;
    arr.push(root.val);
    if (root.val === sum && !root.left && !root.right) {
      res.push([...arr]);
    }
    root.left && dfs(root.left, sum - root.val, arr);
    root.right && dfs(root.right, sum - root.val, arr);
    arr.pop();
  };
  dfs(root, sum, []);
  return res;
};
//Runtime: 84 ms, faster than 98.43% of JavaScript
```

### 129-求根到叶子节点数字之和

```
给定一个二叉树，它的每个结点都存放一个 0-9 的数字，每条从根到叶子节点的路径都代表一个数字。
例如，从根到叶子节点路径 1->2->3 代表数字 123。
计算从根到叶子节点生成的所有数字之和。
说明: 叶子节点是指没有子节点的节点。

示例 1:
输入: [1,2,3]
    1
   / \
  2   3
输出: 25
解释:
从根到叶子节点路径 1->2 代表数字 12.
从根到叶子节点路径 1->3 代表数字 13.
因此，数字总和 = 12 + 13 = 25.
```

[Leetcode](https://leetcode-cn.com/problems/sum-root-to-leaf-numbers)

```js
var sumNumbers = function (root) {
  const dfs = (root, prev) => {
    if (!root) return 0;
    let temp = prev * 10 + root.val;
    if (!root.left && !root.right) {
      return temp;
    }
    return dfs(root.left, temp) + dfs(root.right, temp);
  };
  return dfs(root, 0);
};
```

前面的博客中梳理了更多关于二叉树的题目，[点击查看](https://luckyfbb.github.io/2020/09/20/%E4%BA%8C%E5%8F%89%E6%A0%91%E7%9A%84%E8%A7%A3%E9%A2%98%E6%80%9D%E8%B7%AF/#more)

## 子集类型

子集问题模式一般用多重 DFS。

如果判断这种子集模式：

- 问题需要咱们去找数字的组合或是排列

回溯模板

```js
const res = [];
const bakctrack = (nums, start, track) => {
  res.push(track);
  for (let i = start; i < nums.length; i++) {
    track.push(nums[i]); //进行选择
    bakctrack(nums, i + 1, [...track]); //回溯
    track.pop(); //撤销选择
  }
};
bakctrack(nums, 0, []);
```

子集类型可以分为三种类型：

- 子集
  需要排除已选的数字，所以 i 初始化为 start
- 排列
  从头开始遍历数组，数组中已经有当前数据则跳过，若没有则加入数组，当排列长度等于传入参数长度时，放入答案。
- 组合
  需要排除已选的数字，所以 i 初始化为 start。当组合长度达到所需长度时，放入答案中。

### 78-子集

```
给你一个整数数组 nums ，返回该数组所有可能的子集（幂集）。解集不能包含重复的子集。

示例 1：
输入：nums = [1,2,3]
输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

示例 2：
输入：nums = [0]
输出：[[],[0]]
```

[Leetcode](https://leetcode-cn.com/problems/subsets)

分析：在递归之前加入解集；枚举出当前可选的数字，第一个数可选 1/2/3；假如第一个数选了 1，第二个数可选 2/3，以此类推；每次传入子递归的 index 是：当前选中数字的索引+1；然后每次递归的选项变少，一直递归到没有可选数字，进入不了循环，整个 DFS 结束；最后递归自然结束；

<div >![](/image/algorithm/subset.png)</div>

```js
var subsets = function (nums) {
  const res = [];
  const bakctrack = (nums, start, track) => {
    res.push(track);
    for (let i = start; i < nums.length; i++) {
      track.push(nums[i]);
      bakctrack(nums, i + 1, [...track]);
      track.pop();
    }
  };
  bakctrack(nums, 0, []);
  return res;
};
//Runtime: 72 ms, faster than 98.88% of JavaScript
```

### 90-子集 II

```
给定一个可能包含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。
说明：解集不能包含重复的子集。

示例:
输入: [1,2,2]
输出:
[[2],[1],[1,2,2],[2,2],[1,2],[]]
```

[Leetcode](https://leetcode-cn.com/problems/subsets-ii)
分析：和上题一致，但是在进入到递归时，需要判断当前数字和前一个数字是否相同，如果相同后续得到的解集均会重复，所以相同时跳过当前数字。

```js
var subsetsWithDup = function (nums) {
  nums = nums.sort((a, b) => a - b);
  const res = [];
  const hash = {};
  const bakctrack = (nums, start, track) => {
    res.push(track);
    for (let i = start; i < nums.length; i++) {
      if (i > start && nums[i - 1] === nums[i]) continue;
      track.push(nums[i]);
      bakctrack(nums, i + 1, [...track]);
      track.pop();
    }
  };
  bakctrack(nums, 0, []);
  return res;
};
//Runtime: 84 ms, faster than 80.34% of JavaScript
```

### 46-全排列

```
给定一个 没有重复 数字的序列，返回其所有可能的全排列。

示例:
输入: [1,2,3]
输出:
[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

[Leetcode](https://leetcode-cn.com/problems/permutations)

分析：采用回溯模板，选择-递归-撤销选择。数组中的每一个数据都应该存在于解集中，所以当 track 的长度等于 nums 的长度时，把当前解集放入答案。遍历数组，做选择，如果 track 中已经有当前数据了，则跳过。

<div >![](/image/algorithm/permute.png)</div>

```js
var permute = function (nums) {
  const res = [];
  const backtrack = (nums, track) => {
    if (track.length === nums.length) {
      res.push(track);
    }
    for (let i = 0; i < nums.length; i++) {
      if (track.includes(nums[i])) continue;
      track.push(nums[i]);
      backtrack(nums, [...track]);
      track.pop();
    }
  };
  backtrack(nums, []);
  return res;
};
//Runtime: 100 ms, faster than 42.39% of JavaScript
```

### 47-全排列 II

```
给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。

示例 1：
输入：nums = [1,1,2]
输出：
[[1,1,2],[1,2,1],[2,1,1]]
```

[Leetcode](https://leetcode-cn.com/problems/permutations-ii)

分析：上一题的加强版，有重复数字。思路一样，但是需要多一个判断。visit 数组记录当前数字是否被放入 track，循环中如果 visit[i]被访问过则跳过；nums[i]等于 nums[i-1]并且 i-1 被访问过则跳过。

```js
var permuteUnique = function (nums) {
  const res = [];
  const visit = new Array(nums.length).fill(false);
  nums = nums.sort((a, b) => a - b);
  const backtrack = (nums, track) => {
    if (track.length === nums.length) {
      res.push(track);
    }
    for (let i = 0; i < nums.length; i++) {
      if (visit[i] || (i > 0 && nums[i] === nums[i - 1] && !visit[i - 1]))
        continue;
      track.push(nums[i]);
      visit[i] = true;
      backtrack(nums, [...track]);
      visit[i] = false;
      track.pop();
    }
  };
  backtrack(nums, []);
  return res;
};
//Runtime: 120 ms, faster than 36.95% of JavaScript
```

### 77-组合

```
给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。

示例:
输入: n = 4, k = 2
输出:
[[2,4],[3,4],[2,3],[1,2],[1,3],[1,4],]
```

[Leetcode](https://leetcode-cn.com/problems/combinations)

分析：直接套用回溯算法。当 treck 长度等于 k 时，把 track 放入答案。

```js
var combine = function (n, k) {
  const res = [];
  const backtrack = (start, num, len, track) => {
    if (track.length === len) {
      res.push(track);
      return;
    }
    for (let i = start; i <= num; i++) {
      track.push(i);
      backtrack(i + 1, num, len, [...track]);
      track.pop();
    }
  };
  backtrack(1, n, k, []);
  return res;
};
```

### 39-组合总和

```
给定一个无重复元素的数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
candidates 中的数字可以无限制重复被选取。

说明：
所有数字（包括 target）都是正整数。
解集不能包含重复的组合。 

示例 1：
输入：candidates = [2,3,6,7], target = 7,
所求解集为：
[[7],[2,2,3]]

示例 2：
输入：candidates = [2,3,5], target = 8,
所求解集为：
[[2,2,2,2],[2,3,3],[3,5]]
```

[Leetcode](https://leetcode-cn.com/problems/combination-sum)
分析：套用回溯模板。当 target===0 时，把当前 track 放入答案。遍历数组时，只有当元素小于等于 target 时被放入 track。回溯时，可以重复选择当前元素，start 应该取当前索引 i。

```js
var combinationSum = function (candidates, target) {
  const res = [];
  candidates = candidates.sort((a, b) => a - b);
  const backtrack = (candidates, target, start, track) => {
    if (target === 0) {
      res.push(track);
      return;
    }
    for (let i = start; i < candidates.length; i++) {
      if (candidates[i] <= target) {
        track.push(candidates[i]);
      } else {
        return;
      }
      backtrack(candidates, target - candidates[i], i, [...track]);
      track.pop();
    }
  };
  backtrack(candidates, target, 0, []);
  return res;
};
//Runtime: 92 ms, faster than 86.38% of JavaScript
```

### 40-组合总和

```
给定一个数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
candidates 中的每个数字在每个组合中只能使用一次。

说明：
所有数字（包括目标数）都是正整数。
解集不能包含重复的组合。
 
示例 1:
输入: candidates = [10,1,2,7,6,1,5], target = 8,
所求解集为:[[1, 7],[1, 2, 5],[2, 6],[1, 1, 6]]

示例 2:
输入: candidates = [2,5,2,1,2], target = 5,
所求解集为:[[1,2,2],[5]]
```

[Leetcode](https://leetcode-cn.com/problems/combination-sum-ii)
分析：上题加强版。每个数字只能使用一次，需要注意两点。第一回溯时需要从当前索引 i 的下一位查起；第二若两个邻近两个数字相同时，需要做去重处理，跳过即可(与 47 题处理相同)。

```js
var combinationSum2 = function (candidates, target) {
  const res = [];
  const visit = new Array(candidates.length).fill(false);
  candidates = candidates.sort((a, b) => a - b);
  const backtrack = (candidates, target, start, track) => {
    if (target === 0) {
      res.push(track);
      return;
    }
    for (let i = start; i < candidates.length; i++) {
      if (
        visit[i] ||
        (i > 0 && candidates[i] === candidates[i - 1] && !visit[i - 1])
      )
        continue;
      if (candidates[i] <= target) {
        visit[i] = true;
        track.push(candidates[i]);
      } else {
        return;
      }
      backtrack(candidates, target - candidates[i], i + 1, [...track]);
      visit[i] = false;
      track.pop();
    }
  };
  backtrack(candidates, target, 0, []);
  return res;
};
//Runtime: 96 ms, faster than 57.91% of JavaScript
```

### 784-字母大小写全排列

```
给定一个字符串S，通过将字符串S中的每个字母转变大小写，我们可以获得一个新的字符串。返回所有可能得到的字符串集合。

示例：
输入：S = "a1b2"
输出：["a1b2", "a1B2", "A1b2", "A1B2"]

输入：S = "3z4"
输出：["3z4", "3Z4"]

输入：S = "12345"
输出：["12345"]
```

[Leetcode](https://leetcode-cn.com/problems/letter-case-permutation/)
分析：变形的全排列题目。改变字母大小写，获得新的字符串。套用回溯算法。

<div>![](/image/algorithm/letterCase.png)</div>

```js
var letterCasePermutation = function (S) {
  const res = [];
  const patternUpper = new RegExp('[A-Z]+');
  const patternLower = new RegExp('[a-z]+');
  const backtrack = (s, start) => {
    res.push(s);
    for (let i = start; i < s.length; i++) {
      if (patternUpper.test(s[i])) {
        const newS = s.slice(0, i) + s[i].toLowerCase() + s.slice(i + 1);
        backtrack(newS, i + 1);
      } else if (patternLower.test(s[i])) {
        const newS = s.slice(0, i) + s[i].toUpperCase() + s.slice(i + 1);
        backtrack(newS, i + 1);
      }
    }
  };
  backtrack(S, 0);
  return res;
};
```

## 二分查找

对于一组上升排列的数集来说，模式的步骤如下：

1. 计算出左右端点的中点。计算方式：middle=(start + end)/2，可能出现整数越界。修改计算方式：middle=start+(end-start)/2。
2. 如果需要找的值和中点所在的值相同，返回中点下标就好。
3. 如果不相等，有两种移动 middle 的方式。
4. 如果目标值比中点值小(target<arr[middle]>)，抛弃右边较大的数据搜索左边的数据，使得 end=middle-1。
5. 如果比中点值大，则继续搜索右边的值，是的 start=middle+1。

代码模板：

```js
const binarySearch = (arr, target) => {
  let start = 0;
  let end = arr.length - 1;
  while (start <= end) {
    let middle = start + (end - start) / 2;
    if (arr[middle] === target) {
      //...
    } else if (arr[middle] > target) {
      end = middle - 1;
    } else if (arr[middle] < target) {
      start = middle + 1;
    }
  }
  return -1;
};
```

变形 1：用于查找需要访问数组中当前索引及其直接右邻居索引的元素或条件。
关键属性：

- 查找条件需要访问元素的直接右邻居。
- 使用元素的右邻居来确定是否满足条件，并决定是向左还是向右。
- 保证查找空间在每一步中至少有 2 个元素。
- 需要进行后处理。 当你剩下 1 个元素时，循环 / 递归结束。 需要评估剩余元素是否符合条件。

区分语法：

- 初始条件：left = 0，right = length
- 终止：left === right
- 向左查找：right = mid
- 向右查找：left = mid + 1

变形 2：用于搜索需要访问当前索引及其在数组中的直接左右邻居索引的元素或者条件。

关键属性：

- 搜索条件需要访问元素的直接左右邻居。
- 使用元素的邻居来确定它是向右还是向左。
- 保证查找空间在每个步骤中至少有 3 个元素。
- 需要进行后处理。当剩下 2 个元素时，循环 / 递归结束。  需要评估其余元素是否符合条件。

区分语法：

- 初始条件：left = 0，right = length - 1
- 终止：left + 1 === right
- 向左查找：right = mid
- 向右查找：left = mid

### 704-二分搜索

```
给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。

示例 1:
输入: nums = [-1,0,3,5,9,12], target = 9
输出: 4
解释: 9 出现在 nums 中并且下标为 4

示例 2:
输入: nums = [-1,0,3,5,9,12], target = 2
输出: -1
解释: 2 不存在 nums 中因此返回 -1
```

[Leetcode](https://leetcode-cn.com/problems/binary-search)

```js
var search = function (nums, target) {
  let start = 0;
  let end = nums.length - 1;
  while (start <= end) {
    let mid = Math.floor(start + (end - start) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] > target) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return -1;
};
```

### 33-搜索旋转排序数组

```
升序排列的整数数组 nums 在预先未知的某个点上进行了旋转（例如， [0,1,2,4,5,6,7] 经旋转后可能变为 [4,5,6,7,0,1,2] ）。
请你在数组中搜索 target ，如果数组中存在这个目标值，则返回它的索引，否则返回 -1 。

示例 1：
输入：nums = [4,5,6,7,0,1,2], target = 0
输出：4

示例 2：
输入：nums = [4,5,6,7,0,1,2], target = 3
输出：-1

示例 3：
输入：nums = [1], target = 0
输出：-1
```

[Leetcode](https://leetcode-cn.com/problems/search-in-rotated-sorted-array/)
分析：采用二分查找，可套用模板。当被分为左右有两部分的时候，至少有一部分的数组是有序的，通过 nums[0]和 target 的比较可以得到有序的一部分。通过和有序部分来判断 mid 改如何调整。如果[0,mid-1]有序，判断 target 和 nums[0]/nums[mid-1]的大小，确定 target 是否在该区间，如果是就更新 end=mid-1 否则 start=mid+1；如果[mid+1，len]有序，同理判断 target 和 nums[mid+1]/nums[len]的大小，确定 target 是否在该区间，如果是就更新 start=mid+1 否则 end=mid-1。

```js
var search = function (nums, target) {
  const len = nums.length;
  if (len === 0) return -1;
  if (len === 1) return nums[0] === target ? 0 : -1;
  let start = 0;
  let end = len - 1;
  while (start <= end) {
    const mid = Math.floor(start + (end - start) / 2);
    if (nums[mid] === target) {
      return mid;
    }
    //[0,mid-1]是增区间
    if (nums[0] <= nums[mid]) {
      if (nums[mid] > target && nums[0] <= target) {
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    } else {
      if (nums[mid] < target && nums[len - 1] >= target) {
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    }
  }
  return -1;
};
```

### 162-寻找峰值

```
峰值元素是指其值大于左右相邻值的元素。
给你一个输入数组 nums，找到峰值元素并返回其索引。数组可能包含多个峰值，在这种情况下，返回 任何一个峰值 所在位置即可。
你可以假设 nums[-1] = nums[n] = -∞ 。

示例 1：
输入：nums = [1,2,3,1]
输出：2
解释：3 是峰值元素，你的函数应该返回其索引 2。

示例 2：
输入：nums = [1,2,1,3,5,6,4]
输出：1 或 5
解释：你的函数可以返回索引 1，其峰值元素为 2；或者返回索引 5， 其峰值元素为 6。
```

[Leetcode](https://leetcode-cn.com/problems/find-peak-element)
分析：这道题属于上述题型的变形 1。二分思想获得中间元素 mid，然后与 mid+1 比较，如果 mid+1>mid 的值，峰值可能在 mid 的右边，缩小搜索空间为 mid 的右边，left=mid+1；否则峰值可能在左边，缩小搜索区域为 mid 的做边，包括 mid，使得 right=mid；不断地缩小空间，直至空间只有一个元素，该元素为峰值元素。

```js
var findPeakElement = function (nums) {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    const mid = Math.floor(left + (right - left) / 2);
    if (nums[mid] > nums[mid + 1]) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return left;
};
```

### 153-寻找旋转排序数组中的最小值

```
假设按照升序排序的数组在预先未知的某个点上进行了旋转。例如，数组 [0,1,2,4,5,6,7] 可能变为 [4,5,6,7,0,1,2] 。
请找出其中最小的元素。

示例 1：
输入：nums = [3,4,5,1,2]
输出：1

示例 2：
输入：nums = [4,5,6,7,0,1,2]
输出：0

示例 3：
输入：nums = [1]
输出：1

来源：力扣（LeetCode）
链接：
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```

[Leetcode](https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array)
分析：在 33 题中分析过，旋转的数组当被分为左右有两部分的时候，至少有一部分的数组是有序的。将 mid 和左右两个元素判断大小，如果 mid 大于第一个元素，缩小范围到右边[mid+1,len]；如果 mid 小于第一个元素，缩小范围到左边[0，mid]。搜索停止的条件：mid>mid+1 时，返回 mid+1 的值；mid<mid-1 时，返回 mid。

```js
var findMin = function (nums) {
  if (nums.length === 1) return nums[0];
  let left = 0;
  let right = nums.length - 1;
  if (nums[left] < nums[right]) return nums[left]; //判断是否旋转
  while (left < right) {
    const mid = Math.floor(left + (right - left) / 2);
    if (nums[mid] > nums[mid + 1]) {
      return nums[mid + 1];
    }
    if (nums[mid] < nums[mid - 1]) {
      return nums[mid];
    }
    if (nums[0] < nums[mid]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return -1;
};
```

### 34-在排序数组中查找元素的第一个和最后一个位置

```
给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。
如果数组中不存在目标值 target，返回 [-1, -1]。

示例 1：
输入：nums = [5,7,7,8,8,10], target = 8
输出：[3,4]

示例 2：
输入：nums = [5,7,7,8,8,10], target = 6
输出：[-1,-1]

示例 3：
输入：nums = [], target = 0
输出：[-1,-1]
```

[Leetcode](https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/)

分析：找到 target 值在数组中的左右两个下标。左下标即第一个等于 target，右下标即第一个大于 target 的值-1。在二分查找中，左下标为第一个大于等于 target 的值，右下标为第一个大于 target 的值。注意，target 可能不存在于 nums 中，所以需要对返回的值做判断。

```js
var searchRange = function (nums, target) {
  let ans = [-1, -1];
  const left = binarySearch(nums, target, true);
  const right = binarySearch(nums, target, false) - 1;
  if (
    left <= right &&
    right <= nums.length - 1 &&
    target === nums[left] &&
    nums[right] === target
  ) {
    ans = [left, right];
  }
  return ans;
};

const binarySearch = (nums, target, flag) => {
  let left = 0;
  let right = nums.length - 1;
  let ans = nums.length;
  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);
    if (nums[mid] > target || (flag && nums[mid] >= target)) {
      right = mid - 1;
      ans = mid;
    } else {
      left = mid + 1;
    }
  }
  return ans;
};
```

## 前 K 个元素系列

任何让求解最大/最小/最频繁的 K 个元素的题，都遵循这种模式。
用来记录这种前 K 类型的最佳数据结构是堆。这种模式借助堆来解决很多这种前 K 个数值的问题。

该模式：

1. 将 K 个元素插入到最小堆或者是最大堆
2. 遍历剩下的还没有访问的元素，如果当前元素比这个堆顶元素大，那么把堆顶元素先删除，再加当前元素进去。

识别最大 K 个元素模式：

- 如果你需要求最大/最小/最频繁的前 K 个元素
- 如果你需要通过排序去找一个特定的数

### 剑指 Offer 40-最小的 k 个数

```
输入整数数组 arr ，找出其中最小的 k 个数。例如，输入4、5、1、6、2、7、3、8这8个数字，则最小的4个数字是1、2、3、4。

示例 1：
输入：arr = [3,2,1], k = 2
输出：[1,2] 或者 [2,1]

示例 2：
输入：arr = [0,1,2,1], k = 1
输出：[0]
```

[Leetcode](https://leetcode-cn.com/problems/zui-xiao-de-kge-shu-lcof)
分析：把数组堆化，构建只有 k 个数的大顶堆，遍历剩下数据，如果堆顶数据大于当前数据，当前数据放到堆顶，然后向下堆化，满足大顶堆特点，直到遍历完剩余数据。

```js
var getLeastNumbers = function (arr, k) {
  let heap = [,];
  let i = 0;
  while (i < k) {
    heap.push(arr[i++]);
  }
  buildHeap(heap, k);
  for (let i = k; i < arr.length; i++) {
    if (heap[1] > arr[i]) {
      heap[1] = arr[i];
      shiftDown(heap, k, 1);
    }
  }
  heap.shift();
  return heap;
};

const buildHeap = (arr, k) => {
  for (let i = Math.floor(k / 2); i > 0; i--) {
    shiftDown(arr, k, i);
  }
};

const shiftDown = (arr, len, i) => {
  while (true) {
    let maxPos = i;
    if (2 * i <= len && arr[i] < arr[2 * i]) maxPos = 2 * i;
    if (2 * i + 1 <= len && arr[i] < arr[2 * i + 1]) maxPos = 2 * i + 1;
    if (maxPos === i) break;
    swap(arr, i, maxPos);
    i = maxPos;
  }
};

const swap = (arr, i, j) => {
  [arr[i], arr[j]] = [arr[j], arr[i]];
};
```

### 215-数组中的第 K 个最大元素

```
在未排序的数组中找到第 k 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。

示例 1:
输入: [3,2,1,5,6,4] 和 k = 2
输出: 5

示例 2:
输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
输出: 4
```

[Leetcode](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/)
分析：找到数组中第 K 个最大元素，堆化成大顶堆，然后删除 k-1 次堆顶元素之后，堆顶元素就是第 K 个最大元素。

```js
var findKthLargest = function (nums, k) {
  const heap = [, ...nums];
  buildHeap(heap, heap.length - 1);
  while (k > 1) {
    deleteMax(heap, heap.length - 1);
    k--;
  }
  return heap[1];
};
const buildHeap = (arr, len) => {
  for (let i = parseInt(len / 2); i > 0; i--) {
    shiftDown(arr, len, i);
  }
};
const deleteMax = (arr, len) => {
  arr[1] = arr.pop();
  shiftDown(arr, len, 1);
};
const shiftDown = (arr, len, i) => {
  while (true) {
    let maxPos = i;
    if (2 * i <= len && arr[2 * i] > arr[maxPos]) maxPos = 2 * i;
    if (2 * i + 1 <= len && arr[2 * i + 1] > arr[maxPos]) maxPos = 2 * i + 1;
    if (maxPos === i) break;
    swap(arr, maxPos, i);
    i = maxPos;
  }
};
const swap = (arr, i, j) => {
  [arr[i], arr[j]] = [arr[j], arr[i]];
};
```

### 347-前 K 个高频元素

```
给定一个非空的整数数组，返回其中出现频率前 k 高的元素。

示例 1:
输入: nums = [1,1,1,2,2,3], k = 2
输出: [1,2]

示例 2:
输入: nums = [1], k = 1
输出: [1]
```

[Leetcode](https://leetcode-cn.com/problems/top-k-frequent-elements/)
分析：先得到每个数字出现的次数。然后构建 k 个数的小顶堆。再遍历数据，每个数据和堆顶比较，如果大于堆顶元素则交换然后再堆化；否则不处理。

```js
var topKFrequent = function (nums, k) {
  const map = new Map();
  nums.forEach((item) => map.set(item, map.get(item) ? map.get(item) + 1 : 1));
  if (map.size <= k) {
    return [...map.keys()];
  }
  let index = 1;
  const heap = [,];
  map.forEach((value, key) => {
    if (index <= k) {
      heap.push(key);
      if (index === k) buildHeap(heap, k, map);
    } else if (map.get(heap[1]) < value) {
      heap[1] = key;
      shiftDown(heap, k, 1, map);
    }
    index++;
  });
  heap.shift();
  return heap;
};
const buildHeap = (arr, len, map) => {
  for (let i = parseInt(len / 2); i > 0; i--) {
    shiftDown(arr, len, i, map);
  }
};
const shiftDown = (arr, len, i, map) => {
  while (true) {
    let minPos = i;
    if (2 * i <= len && map.get(arr[2 * i]) < map.get(arr[minPos]))
      minPos = 2 * i;
    if (2 * i + 1 <= len && map.get(arr[2 * i + 1]) < map.get(arr[minPos]))
      minPos = 2 * i + 1;
    if (minPos === i) break;
    swap(arr, minPos, i);
    i = minPos;
  }
};
const swap = (arr, i, j) => {
  [arr[i], arr[j]] = [arr[j], arr[i]];
};
```

### 973-最接近原点的 K 个点

```
我们有一个由平面上的点组成的列表 points。需要从中找出 K 个距离原点 (0, 0) 最近的点。（这里，平面上两点之间的距离是欧几里德距离。）
你可以按任何顺序返回答案。除了点坐标的顺序之外，答案确保是唯一的。

示例 1：
输入：points = [[1,3],[-2,2]], K = 1
输出：[[-2,2]]
解释：
(1, 3) 和原点之间的距离为 sqrt(10)，
(-2, 2) 和原点之间的距离为 sqrt(8)，
由于 sqrt(8) < sqrt(10)，(-2, 2) 离原点更近。
我们只需要距离原点最近的 K = 1 个点，所以答案就是 [[-2,2]]。

示例 2：
输入：points = [[3,3],[5,-1],[-2,4]], K = 2
输出：[[3,3],[-2,4]]（答案 [[-2,4],[3,3]] 也会被接受。）
```

[Leetcode](https://leetcode-cn.com/problems/k-closest-points-to-origin/)
分析：思路相同，判断是需要比较两数的平方和。

```js
var kClosest = function (points, K) {
  let index = 0;
  const heap = [,];
  while (index < K) {
    heap.push(points[index]);
    index++;
  }
  buildHeap(heap, K);
  for (let i = K; i < points.length; i++) {
    if (distance(heap[1]) > distance(points[i])) heap[1] = points[i];
    shiftDown(heap, K, 1);
  }
  heap.shift();
  return heap;
};

const buildHeap = (arr, len) => {
  for (let i = parseInt(len / 2); i > 0; i--) {
    shiftDown(arr, len, i);
  }
};

const shiftDown = (arr, len, i) => {
  while (true) {
    let maxPos = i;
    if (2 * i <= len && distance(arr[2 * i]) > distance(arr[maxPos]))
      maxPos = 2 * i;
    if (2 * i + 1 <= len && distance(arr[2 * i + 1]) > distance(arr[maxPos]))
      maxPos = 2 * i + 1;
    if (maxPos === i) break;
    swap(arr, i, maxPos);
    i = maxPos;
  }
};

const swap = (arr, i, j) => {
  [arr[i], arr[j]] = [arr[j], arr[i]];
};

function distance(point) {
  return point[0] * point[0] + point[1] * point[1];
}
```

## 多路归并

K 路归并能解决涉及多组排好序的数组问题。
每当输入 K 个排好序的数组，可以使用堆来高效顺序遍历其中所有数组的所有元素。将每个数组中最小的一个元素加入最小堆中，从而得到全局最小值。当我们拿到这个全局最小值之后，，再从该元素所在的数组中取其挨着的元素，加入堆。如此反复直到处理完所有元素。

该模式的思路：

1. 把每个数组中的最小值加入到最小堆中
2. 取出堆顶元素(全局最小值)，将这个元素放入排好序的集合里面
3. 将刚取出来的元素所在数组的下一个元素加入堆中
4. 重复步骤 2/3，直到处理完所有的数字

识别 K 路归并：

- 输入排好序的数组，链表或者是矩阵
- 让咱们合并多个排好序的集合，或是需要找这些集合中最小的元素

### 23-合并 K 个升序链表

```
给你一个链表数组，每个链表都已经按升序排列。
请你将所有链表合并到一个升序链表中，返回合并后的链表。

示例 1：
输入：lists = [[1,4,5],[1,3,4],[2,6]]
输出：[1,1,2,3,4,4,5,6]
解释：链表数组如下：[1->4->5,1->3->4,2->6]
将它们合并到一个有序链表中得到。
1->1->2->3->4->4->5->6
```

[Leetcode](https://leetcode-cn.com/problems/merge-k-sorted-lists/)

分析：按着模板思路，构建最小堆。通过链表第一个元素构建最小堆，然后获取堆顶链表，拿到第一个元素即是当前最小元素，放入结果值中，如果当前链表还有元素则继续放入最小堆中。直至堆中没有数据。

```js
var mergeKLists = function (lists) {
  const heap = new MinHeap();
  lists.forEach((list) => {
    if (list) heap.insert(list);
  });
  const res = new ListNode(0);
  let privot = res;
  while (heap.size) {
    let minNode = heap.pop();
    privot.next = new ListNode(minNode.val);
    privot = privot.next;
    if (minNode.next) {
      heap.insert(minNode.next);
    }
  }
  return res.next;
};

class MinHeap {
  constructor() {
    this.heap = [null];
    this.size = 0;
  }
  insert(list) {
    this.heap.push(list);
    this.size++;
    this.__shiftUp(this.size);
  }
  pop() {
    if (this.size === 0) return null;
    this.size--;
    this.__swap(1, this.heap.length - 1);
    let res = this.heap.pop();
    this.__shiftDown(this.size, 1);
    return res;
  }
  __shiftUp(k) {
    while (k > 1 && this.heap[k].val < this.heap[parseInt(k / 2)].val) {
      this.__swap(k, parseInt(k / 2));
      k = parseInt(k / 2);
    }
  }
  __shiftDown(len, k) {
    while (true) {
      let minPos = k;
      if (2 * k <= len && this.heap[minPos].val > this.heap[2 * k].val)
        minPos = 2 * k;
      if (2 * k + 1 <= len && this.heap[minPos].val > this.heap[2 * k + 1].val)
        minPos = 2 * k + 1;
      if (k === minPos) break;
      this.__swap(minPos, k);
      k = minPos;
    }
  }
  __swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
}
```

### 378. 有序矩阵中第 K 小的元素

```
给定一个 n x n 矩阵，其中每行和每列元素均按升序排序，找到矩阵中第 k 小的元素。
请注意，它是排序后的第 k 小元素，而不是第 k 个不同的元素。

示例：
matrix = [
   [ 1,  5,  9],
   [10, 11, 13],
   [12, 13, 15]
],
k = 8,
返回 13。
```

[Leetcode](https://leetcode-cn.com/problems/kth-smallest-element-in-a-sorted-matrix/)
分析：与上一题一致，只是数据处理不同

```js
var kthSmallest = function (matrix, k) {
  const heap = new MinHeap();
  matrix.forEach((item) => {
    if (item) heap.insert(item);
  });
  console.log(heap);
  const res = [];
  while (heap.size) {
    let minNode = heap.pop();
    res.push(minNode.shift());
    if (minNode.length) {
      heap.insert(minNode);
    }
  }
  console.log(res);
  return res[k - 1];
};

class MinHeap {
  constructor() {
    this.heap = [null];
    this.size = 0;
  }
  insert(item) {
    this.heap.push(item);
    this.size++;
    this.__shiftUp(this.size);
  }
  pop() {
    if (this.size === 0) return null;
    this.size--;
    this.__swap(1, this.heap.length - 1);
    let res = this.heap.pop();
    this.__shiftDown(this.size, 1);
    return res;
  }
  __shiftUp(k) {
    while (k > 1 && this.heap[k][0] < this.heap[parseInt(k / 2)][0]) {
      this.__swap(k, parseInt(k / 2));
      k = parseInt(k / 2);
    }
  }
  __shiftDown(len, k) {
    while (true) {
      let minPos = k;
      if (2 * k <= len && this.heap[minPos][0] > this.heap[2 * k][0])
        minPos = 2 * k;
      if (2 * k + 1 <= len && this.heap[minPos][0] > this.heap[2 * k + 1][0])
        minPos = 2 * k + 1;
      if (k === minPos) break;
      this.__swap(minPos, k);
      k = minPos;
    }
  }
  __swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
}
```

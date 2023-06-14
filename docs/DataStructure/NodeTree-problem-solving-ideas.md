---
title: 二叉树的解题思路
group:
  title: 算法思路
  order: 2
order: 0
---

在[前文](https://luckyfbb.github.io/2020/04/19/%E4%BA%8C%E5%8F%89%E6%A0%91/#more)中介绍了二叉树的相关知识，可以进行查看阅读。

## 解题技巧

### 前/中/后序

二叉树的遍历框架，非线性的递归遍历

```js
class TreeNode {
  constructor(val, left, right) {
    this.val = val || undefined;
    this.left = left || null;
    this.right = right || null;
  }
}

const recursion = (root) => {
  //前序
  recursion(root.left);
  //中序
  recursion(root.right);
  //后序
};
```

### 层级遍历(bfs)

广度遍历的思想就是先进先出，以层来做为入队和出队的判断条件

```js
const bfs = (root) => {
  const queue = [root];
  while (queue.length) {
    const levelLength = queue.length;
    for (let i = 0; i < levelLength; i++) {
      const curr = queue.shift();
      //对curr做处理
      curr.left && queue.push(curr.left);
      curr.right && queue.push(curr.right);
    }
  }
};
```

### dfs

dfs 其实是树的前序遍历，上面的代码中已经使用递归的思想实现了
如果用迭代的思想，需要借助栈结构，采用先进后出的思想

- 递归

```js
const dfs = (root) => {
  //对当前数据做点啥
  dfs(root.left);
  dfs(root.right);
};
```

- 非递归

```js
const bfs = (root) => {
  const stack = [root];
  while (stack.length) {
    const curr = stack.pop();
    //对curr做处理
    curr.right && stack.push(curr.right);
    curr.left && stack.push(curr.left);
  }
};
```

## 基本性质

### 树的最大高度

```
给定二叉树 [3,9,20,null,null,15,7]，

    3
   / \
  9  20
    /  \
   15   7
返回它的最大深度 3 。
```

[leetcode](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree)
分析：求树的高度需要找出左右子树的高度，两者中最大的那个+1 就是当前树高，对于子树也是这个逻辑。当遍历的节点为空时就递归结束，root===null。

```js
var maxDepth = function (root) {
  if (!root) return 0;
  let lefth = maxDepth(root.left);
  let righth = maxDepth(root.right);
  return Math.max(lefth, righth) + 1;
};
// Runtime: 52 ms, faster than 100% of JavaScript
```

### 二叉树的最小深度

```
说明: 叶子节点是指没有子节点的节点。

示例:

给定二叉树 [3,9,20,null,null,15,7],

    3
   / \
  9  20
    /  \
   15   7
返回它的最小深度  2.
```

[leetcode](https://leetcode-cn.com/problems/minimum-depth-of-binary-tree)

分析 1：采用 BFS，一层层遍历。发现当前层的某个节点没有子节点，意味着这是树的最小深度。

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

分析 2：采用 DFS

```js
var minDepth = function (root) {
  if (!root) return 0;
  const dfs = (root) => {
    if (!root) return;
    const left = dfs(root.left);
    const right = dfs(root.right);
    if (!left && !right) return 1;
    if (!left) return right + 1;
    if (!right) return left + 1;
    return Math.min(left, right) + 1;
  };
  return dfs(root);
};
```

### 平衡树

```
示例 1:                                          示例 2:

给定二叉树 [3,9,20,null,null,15,7]               给定二叉树 [1,2,2,3,3,null,null,4,4]

    3                                                  1
   / \                                                / \
  9  20                                              2   2
    /  \                                            / \
   15   7                                          3   3
                                                  / \
                                                 4  4
返回 true                                        返回 false
```

[leetcode](https://leetcode-cn.com/problems/balanced-binary-tree)
分析：平衡树就是结点的左右子树的高度<=1。递归找到左右子树的高度，如果左右子树高度差大于 1 返回 false，否则返回 true。所以当前节点的左右子树高度<=1&&当前节点的左子树的左右子树高度<=1&&当前节点的右子树的左右子树高度<=1，但这个条件成立的时候，返回 true

```js
var isBalanced = function (root) {
  const getDepth = (root) => {
    if (!root) return 0;
    const left = getDepth(root.left);
    const right = getDepth(root.right);
    return Math.max(left, right) + 1;
  };
  if (!root) return true;
  const curr = Math.abs(getDepth(root.left) - getDepth(root.right)) <= 1;
  return curr && isBalanced(root.left) && isBalanced(root.right);
};
//Runtime: 96 ms, faster than 46.01% of JavaScript
```

### 翻转二叉树

```
翻转一棵二叉树。

示例：

输入：

     4
   /   \
  2     7
 / \   / \
1   3 6   9
输出：

     4
   /   \
  7     2
 / \   / \
9   6 3   1
```

[leetcode](https://leetcode-cn.com/problems/invert-binary-tree)
分析：利用递归，交换左右子树翻转结果，直到最后一个节点的左右子树都是 null，返回结果

题解：

```js
var invertTree = function (root) {
  if (!root) {
    return null;
  }
  let left = root.left;
  let right = root.right;
  root.right = invertTree(left);
  root.left = invertTree(right);
  return root;
};

// Runtime: 72 ms, faster than 86.03% of JavaScript
```

### 归并两棵树

```
输入:
	Tree 1                     Tree 2
          1                         2
         / \                       / \
        3   2                     1   3
       /                           \   \
      5                             4   7
输出:
合并后的树:
	     3
	    / \
	   4   5
	  / \   \
	 5   4   7
```

[leetcode](https://leetcode-cn.com/problems/merge-two-binary-trees)
分析：二叉树的合并就是一棵树的节点值加上另一棵树的节点值。使用递归，当前节点相加，左右子树分别合并的结果就是最后需要放回的树。直到两棵树都遍历完结束。

```js
var mergeTrees = function (t1, t2) {
  if (!t1 || !t2) {
    return t1 || t2;
  }
  return new TreeNode(
    t1.val + t2.val,
    mergeTrees(t1.left, t2.left),
    mergeTrees(t1.right, t2.right),
  );
};
//Runtime: 112 ms, faster than 73.12% of JavaScript
```

## 二叉树遍历

### 从前序与中序遍历序列构造二叉树

```
你可以假设树中没有重复的元素。

例如，给出

前序遍历 preorder = [3,9,20,15,7]
中序遍历 inorder = [9,3,15,20,7]
返回如下的二叉树：

    3
   / \
  9  20
    /  \
   15   7
```

[leetcode](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal)
分析：对于前序遍历序列来说第一个数据就是当前树根节点，在中序遍历中根节点左右两侧的分别是左右子树序列。

```js
var buildTree = function (preorder, inorder) {
  const buildTreeFunc = (start, end) => {
    if (start > end) return null;
    const tree = new TreeNode();
    const val = preorder.shift();
    tree.val = val;
    tree.left = buildTreeFunc(start, inorder.indexOf(val) - 1);
    tree.right = buildTreeFunc(inorder.indexOf(val) + 1, end);
    return tree;
  };
  return buildTreeFunc(0, preorder.length - 1);
};
//Runtime: 132 ms, faster than 46.85 % of javascript   待优化
```

### 左叶子之和

```
    3
   / \
  9  20
    /  \
   15   7

在这个二叉树中，有两个左叶子，分别是 9 和 15，所以返回 24
```

[leetcode](https://leetcode-cn.com/problems/sum-of-left-leaves/)

分析：每次递归前，要先判断节点是不是空。如果左子树存在并且没有子节点，就累计结果；否则继续递归。

```js
var sumOfLeftLeaves = function (root) {
  let res = 0;
  const recur = (root) => {
    if (!root) return;
    if (root.left && !root.left.left && !root.left.right) {
      res += root.left.val;
    }
    root.left && recur(root.left);
    root.right && recur(root.right);
  };
  recur(root);
  return res;
};
```

### 二叉树的层平均值

```
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

[leetcode](https://leetcode-cn.com/problems/average-of-levels-in-binary-tree)

分析：采用层级遍历，套用上文的 bfs 模板。第一层循环表示层级，第二层循坏表示循环当前层级的所有节点。

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

### 二叉树的坡度

```输入：
         1
       /   \
      2     3
输出：1
解释：
结点 2 的坡度: 0
结点 3 的坡度: 0
结点 1 的坡度: |2-3| = 1
树的坡度 : 0 + 0 + 1 = 1

```

[leetcode](https://leetcode-cn.com/problems/binary-tree-tilt)
分析：节点坡度是**左子树的结点之和和右子树结点之和的差的绝对值**，所以要从最深开始遍历
递归开始，设置一个值获取每个节点下面，左节点总和，右节点总和。然后去相减取绝对值
注意每次递归前，要先判断节点是不是空

```js
var findTilt = function (root) {
  let res = 0;
  const recur = (root) => {
    if (!root) return 0;
    const left = recur(root.left);
    const right = recur(root.right);
    res += Math.abs(left - right);
    return root.val + left + right;
  };
  recur(root);
  return res;
};
//Runtime: 92 ms, faster than 61.49% of JavaScript
```

### 二叉树中第二小的节点

```
给出这样的一个二叉树，你需要输出所有节点中的第二小的值。如果第二小的值不存在的话，输出 -1 。

示例 1:                                         示例 2:

输入:                                           输入:
    2                                               2
   / \                                             / \
  2   5                                           2   2
     / \
    5   7

输出: 5                                         输出: -1
说明: 最小的值是 2 ，第二小的值是 5 。            说明: 最小的值是 2, 但是不存在第二小的值。
```

[leetcode](https://leetcode-cn.com/problems/second-minimum-node-in-a-binary-tree)
分析 1：采用 dfs 递归，借助数组存储数据。如果 res 中不存在当前节点值，就放入数组中，从而达到去重的效果。

```js
var findSecondMinimumValue = function (root) {
  const res = [];
  const recur = (root) => {
    if (!root) return;
    const curr = root.val;
    if (!res.includes(curr)) {
      res.push(curr);
    }
    recur(root.left);
    recur(root.right);
  };
  recur(root);
  res.sort((a, b) => a - b);
  return res[1] ? res[1] : -1;
};
//Runtime: 76 ms, faster than 61.46% of JavaScript
```

### 求根到叶子节点数字之和

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

[leetcode](https://leetcode-cn.com/problems/sum-root-to-leaf-numbers)
分析：每个节点都代表一个数字，等同于其父节点对应的数字\*10 再加上该节点的值。计算出每个叶子节点对应的数字，计算出所有的叶子节点对应的数字之和。
分析 1：dfs，从根节点开始，遍历每个节点，如果遇到叶子节点就将数字加到数字之和。如果不是叶子节点，就计算当前节点的数字，然后对子节点递归遍历。

```js
var sumNumbers = function (root) {
  const dfs = (root, i) => {
    if (!root) return 0;
    let temp = i * 10 + root.val;
    if (!root.left && !root.right) {
      return temp;
    }
    return dfs(root.left, temp) + dfs(root.right, temp);
  };
  return dfs(root, 0);
};
//Runtime: 84 ms, faster than 52.22% of JavaScript
```

分析 2：bfs，需要维护两个队列，节点队列和节点对应的数字。如果当前节点是叶子节点，将节点对应的数字加到数字之和；如果不是叶子节点，就把子节点和子节点计算出的对应数字分别加入两个队列中。

```js
var sumNumbers = function (root) {
  if (!root) return 0;
  const nodeQueue = [root];
  const numQueue = [root.val];
  let res = 0;
  while (nodeQueue.length) {
    const currNode = nodeQueue.shift();
    const currNum = numQueue.shift();
    if (!currNode.left && !currNode.right) {
      res += currNum;
    }
    if (currNode.left) {
      nodeQueue.push(currNode.left);
      numQueue.push(currNum * 10 + currNode.left.val);
    }
    if (currNode.right) {
      nodeQueue.push(currNode.right);
      numQueue.push(currNum * 10 + currNode.right.val);
    }
  }
  return res;
};
```

## 二叉树的路径

### 二叉树的所有路径

```
输入:

   1
 /   \
2     3
 \
  5

输出: ["1->2->5", "1->3"]

解释: 所有根节点到叶子节点的路径为: 1->2->5, 1->3
```

[leetcode](https://leetcode-cn.com/problems/binary-tree-paths)
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

### 路径总和

```
说明: 叶子节点是指没有子节点的节点。
示例：
给定如下二叉树，以及目标和 sum = 22，
              5
             / \
            4   8
           /   / \
          11  13  4
         /  \      \
        7    2      1
返回 true, 因为存在目标和为 22 的根节点到叶子节点的路径 5->4->11->2。
```

[leetcode](https://leetcode-cn.com/problems/path-sum)

分析:遍历树节点，当遍历完且遍历的所有结点和为 sum 返回 true，值得注意的一点**根节点到叶子节点**，所以条件中需要加入 root.left===null&&root.right===null

```js
var hasPathSum = function (root, sum) {
  let res = false;
  const dfs = (root, sum) => {
    if (!root) return;
    if (root.val === sum && !root.left && !root.right) {
      return (res = true);
    }
    root.left && dfs(root.left, sum - root.val);
    root.right && dfs(root.right, sum - root.val);
  };
  dfs(root, sum);
  return res;
};
//Runtime: 88 ms, faster than 65.75% of JavaScript
```

### 最长同值路径

```
给定一个二叉树，找到最长的路径，这个路径中的每个节点具有相同值。 这条路径可以经过也可以不经过根节点。

注意：两个节点之间的路径长度由它们之间的边数表示。

示例 1:                        示例 2:
输入:                          输入:
              5                              1
             / \                            / \
            4   5                          4   5
           / \   \                        / \   \
          1   1   5                      4   4   5
输出: 2                        输出: 2
```

[leetcode](https://leetcode-cn.com/problems/longest-univalue-path)

分析：采用 DFS。对于当前节点，左子树能提供的长度为 left，如果当前节点值等于左子节点的值，则左链的长度等于 left+1，否则为 0(右子树也是如此)。当前子树对父节点提供的最大长度为左右链中较大的一个。当前子树的左右链之和，去和全局最大值比较

```js
var longestUnivaluePath = function (root) {
  let level = 0;
  function helper(parent, current) {
    if (current === null) return 0;
    let left = helper(current.val, current.left);
    let right = helper(current.val, current.right);
    level = Math.max(level, left + right);
    return current.val === parent ? Math.max(left, right) + 1 : 0;
  }
  if (root !== null) helper(root.val, root);
  return level;
};
//Runtime: 252 ms, faster than 46.37% of JavaScript
```

## 二叉搜索树

### 将有序数组转换为二叉搜索树

```
给定有序数组: [-10,-3,0,5,9],

一个可能的答案是：[0,-3,9,-10,null,5]，它可以表示下面这个高度平衡二叉搜索树：

      0
     / \
   -3   9
   /   /
 -10  5
```

[leetcode](https://leetcode-cn.com/problems/convert-sorted-array-to-binary-search-tree)
分析：为了达到平衡，每次都把数组二分，中间的值作为根节点，然后左右分别为左右子树，依次递归，直至数组为空。

```js
var sortedArrayToBST = function (nums) {
  if (!nums.length) return null;
  const mid = Math.ceil((nums.length - 1) / 2);
  return new TreeNode(
    nums[mid],
    sortedArrayToBST(nums.slice(0, mid)),
    sortedArrayToBST(nums.slice(mid + 1)),
  );
};
//Runtime: 124 ms, faster than 17.83 % of javascript   待优化
```

### 两数之和 IV - 输入 BST

```
给定一个二叉搜索树和一个目标结果，如果 BST 中存在两个元素且它们的和等于给定的目标结果，则返回 true。

案例 1:                           案例 2:

输入:                             输入:
    5                                 5
   / \                               / \
  3   6                             3   6
 / \   \                           / \   \
2   4   7                         2   4   7

Target = 9                        Target = 28

输出: True                        输出: False
```

分析 1：先把树转化为数组，将题目转换成为在数组中是否存在两个元素相加为目标结果

```js
var findTarget = function (root, k) {
  let nums = [];
  const inOrder = (root) => {
    if (!root) return;
    inOrder(root.left);
    nums.push(root.val);
    inOrder(root.right);
  };
  inOrder(root);
  const arrMap = new Map();
  for (let i = 0; i < nums.length; i++) {
    const result = k - nums[i];
    if (arrMap.has(result)) {
      return true;
    }
    arrMap.set(nums[i], i);
  }
  return false;
};

//Runtime: 100 ms, faster than 96.68% of JavaScript
```

分析 2：直接在树中，一个个值拿出来进行比较，采用 dfs 但先遍历右子树

```js
var findTarget = function (root, k) {
  const stack = [root];
  const map = new Map();
  while (stack.length) {
    const curr = stack.pop();
    if (map.has(k - curr.val)) {
      return true;
    }
    map.set(curr.val, 1);
    curr.left && stack.push(curr.left);
    curr.right && stack.push(curr.right);
  }
  return false;
};
//Runtime: 132 ms, faster than 28.32% of JavaScript
```

### 二叉搜索树节点最小距离

```
输入: root = [4,2,6,1,3,null,null]
输出: 1
解释:
注意，root是树节点对象(TreeNode object)，而不是数组。

给定的树 [4,2,6,1,3,null,null] 可表示为下图:

          4
        /   \
      2      6
     / \
    1   3

最小的差值是 1, 它是节点1和节点2的差值, 也是节点3和节点2的差值。
```

[leetcode](https://leetcode-cn.com/problems/minimum-distance-between-bst-nodes)
分析：通过中序遍历，使用 last 存储上一个节点的 val 值，和当前节点的值做减法与 ans 做比较，获得最小的值

```js
var minDiffInBST = function (root) {
  let last = undefined;
  let ans = Infinity;
  const inOrder = (root) => {
    if (!root) return;
    inOrder(root.left);
    if (last !== undefined) {
      ans = Math.min(ans, Math.abs(root.val - last));
    }
    last = root.val;
    inOrder(root.right);
  };
  inOrder(root);
  return ans;
};
//Runtime: 68 ms, faster than 96.55% of JavaScript
```

### 二叉搜索树中的众数

```
给定一个有相同值的二叉搜索树（BST），找出 BST 中的所有众数（出现频率最高的元素）。

给定 BST [1,null,2,2]
   1
    \
     2
    /
   2
返回[2]
```

[leetcode](https://leetcode-cn.com/problems/find-mode-in-binary-search-tree/)
分析：采用 dfs 递归解法，当 maxCount 小于遍历结点值出现的次数，就更新 maxCount 并置空 res；相等就把节点值放入 res；小于不操作。

```js
var findMode = function (root) {
  const map = new Map(); //存储数字出现的次数
  const res = []; //存储出现次数最多的数
  let maxCount = 0; //当前最大出现次数
  const recur = (root) => {
    if (!root) return;
    const curr = root.val;
    map.has(curr) ? map.set(curr, map.get(curr) + 1) : map.set(curr, 1);
    if (map.get(curr) >= maxCount) {
      map.get(curr) > maxCount && (res.length = 0); //如果比当前maxCount大，则重置res
      maxCount = map.get(curr);
      res.push(curr);
    }
    recur(root.left);
    recur(root.right);
  };
  recur(root);
  return res;
};
//Runtime: 92 ms, faster than 76.30% of JavaScript
```

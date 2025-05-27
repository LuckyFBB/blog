"use strict";(self.webpackChunkblog_of_fbb=self.webpackChunkblog_of_fbb||[]).push([[5158],{75158:function(t,n,r){r.r(n),r.d(n,{texts:function(){return e}});const e=[{value:"\u5728",paraId:0},{value:"\u524D\u6587",paraId:1},{value:"\u4E2D\u4ECB\u7ECD\u4E86\u4E8C\u53C9\u6811\u7684\u76F8\u5173\u77E5\u8BC6\uFF0C\u53EF\u4EE5\u8FDB\u884C\u67E5\u770B\u9605\u8BFB\u3002",paraId:0},{value:"\u4E8C\u53C9\u6811\u7684\u904D\u5386\u6846\u67B6\uFF0C\u975E\u7EBF\u6027\u7684\u9012\u5F52\u904D\u5386",paraId:2,tocIndex:1},{value:`class TreeNode {
  constructor(val, left, right) {
    this.val = val || undefined;
    this.left = left || null;
    this.right = right || null;
  }
}

const recursion = (root) => {
  //\u524D\u5E8F
  recursion(root.left);
  //\u4E2D\u5E8F
  recursion(root.right);
  //\u540E\u5E8F
};
`,paraId:3,tocIndex:1},{value:"\u5E7F\u5EA6\u904D\u5386\u7684\u601D\u60F3\u5C31\u662F\u5148\u8FDB\u5148\u51FA\uFF0C\u4EE5\u5C42\u6765\u505A\u4E3A\u5165\u961F\u548C\u51FA\u961F\u7684\u5224\u65AD\u6761\u4EF6",paraId:4,tocIndex:2},{value:`const bfs = (root) => {
  const queue = [root];
  while (queue.length) {
    const levelLength = queue.length;
    for (let i = 0; i < levelLength; i++) {
      const curr = queue.shift();
      //\u5BF9curr\u505A\u5904\u7406
      curr.left && queue.push(curr.left);
      curr.right && queue.push(curr.right);
    }
  }
};
`,paraId:5,tocIndex:2},{value:`dfs \u5176\u5B9E\u662F\u6811\u7684\u524D\u5E8F\u904D\u5386\uFF0C\u4E0A\u9762\u7684\u4EE3\u7801\u4E2D\u5DF2\u7ECF\u4F7F\u7528\u9012\u5F52\u7684\u601D\u60F3\u5B9E\u73B0\u4E86
\u5982\u679C\u7528\u8FED\u4EE3\u7684\u601D\u60F3\uFF0C\u9700\u8981\u501F\u52A9\u6808\u7ED3\u6784\uFF0C\u91C7\u7528\u5148\u8FDB\u540E\u51FA\u7684\u601D\u60F3`,paraId:6,tocIndex:3},{value:"\u9012\u5F52",paraId:7,tocIndex:3},{value:`const dfs = (root) => {
  //\u5BF9\u5F53\u524D\u6570\u636E\u505A\u70B9\u5565
  dfs(root.left);
  dfs(root.right);
};
`,paraId:8,tocIndex:3},{value:"\u975E\u9012\u5F52",paraId:9,tocIndex:3},{value:`const bfs = (root) => {
  const stack = [root];
  while (stack.length) {
    const curr = stack.pop();
    //\u5BF9curr\u505A\u5904\u7406
    curr.right && stack.push(curr.right);
    curr.left && stack.push(curr.left);
  }
};
`,paraId:10,tocIndex:3},{value:`\u7ED9\u5B9A\u4E8C\u53C9\u6811 [3,9,20,null,null,15,7]\uFF0C

    3
   / \\
  9  20
    /  \\
   15   7
\u8FD4\u56DE\u5B83\u7684\u6700\u5927\u6DF1\u5EA6\xA03 \u3002
`,paraId:11,tocIndex:5},{value:"leetcode",paraId:12,tocIndex:5},{value:`
\u5206\u6790\uFF1A\u6C42\u6811\u7684\u9AD8\u5EA6\u9700\u8981\u627E\u51FA\u5DE6\u53F3\u5B50\u6811\u7684\u9AD8\u5EA6\uFF0C\u4E24\u8005\u4E2D\u6700\u5927\u7684\u90A3\u4E2A+1 \u5C31\u662F\u5F53\u524D\u6811\u9AD8\uFF0C\u5BF9\u4E8E\u5B50\u6811\u4E5F\u662F\u8FD9\u4E2A\u903B\u8F91\u3002\u5F53\u904D\u5386\u7684\u8282\u70B9\u4E3A\u7A7A\u65F6\u5C31\u9012\u5F52\u7ED3\u675F\uFF0Croot===null\u3002`,paraId:12,tocIndex:5},{value:`var maxDepth = function (root) {
  if (!root) return 0;
  let lefth = maxDepth(root.left);
  let righth = maxDepth(root.right);
  return Math.max(lefth, righth) + 1;
};
// Runtime: 52 ms, faster than 100% of JavaScript
`,paraId:13,tocIndex:5},{value:`\u8BF4\u660E:\xA0\u53F6\u5B50\u8282\u70B9\u662F\u6307\u6CA1\u6709\u5B50\u8282\u70B9\u7684\u8282\u70B9\u3002

\u793A\u4F8B:

\u7ED9\u5B9A\u4E8C\u53C9\u6811\xA0[3,9,20,null,null,15,7],

    3
   / \\
  9  20
    /  \\
   15   7
\u8FD4\u56DE\u5B83\u7684\u6700\u5C0F\u6DF1\u5EA6 \xA02.
`,paraId:14,tocIndex:6},{value:"leetcode",paraId:15,tocIndex:6},{value:"\u5206\u6790 1\uFF1A\u91C7\u7528 BFS\uFF0C\u4E00\u5C42\u5C42\u904D\u5386\u3002\u53D1\u73B0\u5F53\u524D\u5C42\u7684\u67D0\u4E2A\u8282\u70B9\u6CA1\u6709\u5B50\u8282\u70B9\uFF0C\u610F\u5473\u7740\u8FD9\u662F\u6811\u7684\u6700\u5C0F\u6DF1\u5EA6\u3002",paraId:16,tocIndex:6},{value:`var minDepth = function (root) {
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
`,paraId:17,tocIndex:6},{value:"\u5206\u6790 2\uFF1A\u91C7\u7528 DFS",paraId:18,tocIndex:6},{value:`var minDepth = function (root) {
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
`,paraId:19,tocIndex:6},{value:`\u793A\u4F8B 1:                                          \u793A\u4F8B 2:

\u7ED9\u5B9A\u4E8C\u53C9\u6811 [3,9,20,null,null,15,7]               \u7ED9\u5B9A\u4E8C\u53C9\u6811 [1,2,2,3,3,null,null,4,4]

    3                                                  1
   / \\                                                / \\
  9  20                                              2   2
    /  \\                                            / \\
   15   7                                          3   3
                                                  / \\
                                                 4  4
\u8FD4\u56DE true                                        \u8FD4\u56DE\xA0false
`,paraId:20,tocIndex:7},{value:"leetcode",paraId:21,tocIndex:7},{value:`
\u5206\u6790\uFF1A\u5E73\u8861\u6811\u5C31\u662F\u7ED3\u70B9\u7684\u5DE6\u53F3\u5B50\u6811\u7684\u9AD8\u5EA6<=1\u3002\u9012\u5F52\u627E\u5230\u5DE6\u53F3\u5B50\u6811\u7684\u9AD8\u5EA6\uFF0C\u5982\u679C\u5DE6\u53F3\u5B50\u6811\u9AD8\u5EA6\u5DEE\u5927\u4E8E 1 \u8FD4\u56DE false\uFF0C\u5426\u5219\u8FD4\u56DE true\u3002\u6240\u4EE5\u5F53\u524D\u8282\u70B9\u7684\u5DE6\u53F3\u5B50\u6811\u9AD8\u5EA6<=1&&\u5F53\u524D\u8282\u70B9\u7684\u5DE6\u5B50\u6811\u7684\u5DE6\u53F3\u5B50\u6811\u9AD8\u5EA6<=1&&\u5F53\u524D\u8282\u70B9\u7684\u53F3\u5B50\u6811\u7684\u5DE6\u53F3\u5B50\u6811\u9AD8\u5EA6<=1\uFF0C\u4F46\u8FD9\u4E2A\u6761\u4EF6\u6210\u7ACB\u7684\u65F6\u5019\uFF0C\u8FD4\u56DE true`,paraId:21,tocIndex:7},{value:`var isBalanced = function (root) {
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
`,paraId:22,tocIndex:7},{value:`\u7FFB\u8F6C\u4E00\u68F5\u4E8C\u53C9\u6811\u3002

\u793A\u4F8B\uFF1A

\u8F93\u5165\uFF1A

     4
   /   \\
  2     7
 / \\   / \\
1   3 6   9
\u8F93\u51FA\uFF1A

     4
   /   \\
  7     2
 / \\   / \\
9   6 3   1
`,paraId:23,tocIndex:8},{value:"leetcode",paraId:24,tocIndex:8},{value:`
\u5206\u6790\uFF1A\u5229\u7528\u9012\u5F52\uFF0C\u4EA4\u6362\u5DE6\u53F3\u5B50\u6811\u7FFB\u8F6C\u7ED3\u679C\uFF0C\u76F4\u5230\u6700\u540E\u4E00\u4E2A\u8282\u70B9\u7684\u5DE6\u53F3\u5B50\u6811\u90FD\u662F null\uFF0C\u8FD4\u56DE\u7ED3\u679C`,paraId:24,tocIndex:8},{value:"\u9898\u89E3\uFF1A",paraId:25,tocIndex:8},{value:`var invertTree = function (root) {
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
`,paraId:26,tocIndex:8},{value:`\u8F93\u5165:
	Tree 1                     Tree 2
          1                         2
         / \\                       / \\
        3   2                     1   3
       /                           \\   \\
      5                             4   7
\u8F93\u51FA:
\u5408\u5E76\u540E\u7684\u6811:
	     3
	    / \\
	   4   5
	  / \\   \\
	 5   4   7
`,paraId:27,tocIndex:9},{value:"leetcode",paraId:28,tocIndex:9},{value:`
\u5206\u6790\uFF1A\u4E8C\u53C9\u6811\u7684\u5408\u5E76\u5C31\u662F\u4E00\u68F5\u6811\u7684\u8282\u70B9\u503C\u52A0\u4E0A\u53E6\u4E00\u68F5\u6811\u7684\u8282\u70B9\u503C\u3002\u4F7F\u7528\u9012\u5F52\uFF0C\u5F53\u524D\u8282\u70B9\u76F8\u52A0\uFF0C\u5DE6\u53F3\u5B50\u6811\u5206\u522B\u5408\u5E76\u7684\u7ED3\u679C\u5C31\u662F\u6700\u540E\u9700\u8981\u653E\u56DE\u7684\u6811\u3002\u76F4\u5230\u4E24\u68F5\u6811\u90FD\u904D\u5386\u5B8C\u7ED3\u675F\u3002`,paraId:28,tocIndex:9},{value:`var mergeTrees = function (t1, t2) {
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
`,paraId:29,tocIndex:9},{value:`\u4F60\u53EF\u4EE5\u5047\u8BBE\u6811\u4E2D\u6CA1\u6709\u91CD\u590D\u7684\u5143\u7D20\u3002

\u4F8B\u5982\uFF0C\u7ED9\u51FA

\u524D\u5E8F\u904D\u5386 preorder =\xA0[3,9,20,15,7]
\u4E2D\u5E8F\u904D\u5386 inorder = [9,3,15,20,7]
\u8FD4\u56DE\u5982\u4E0B\u7684\u4E8C\u53C9\u6811\uFF1A

    3
   / \\
  9  20
    /  \\
   15   7
`,paraId:30,tocIndex:11},{value:"leetcode",paraId:31,tocIndex:11},{value:`
\u5206\u6790\uFF1A\u5BF9\u4E8E\u524D\u5E8F\u904D\u5386\u5E8F\u5217\u6765\u8BF4\u7B2C\u4E00\u4E2A\u6570\u636E\u5C31\u662F\u5F53\u524D\u6811\u6839\u8282\u70B9\uFF0C\u5728\u4E2D\u5E8F\u904D\u5386\u4E2D\u6839\u8282\u70B9\u5DE6\u53F3\u4E24\u4FA7\u7684\u5206\u522B\u662F\u5DE6\u53F3\u5B50\u6811\u5E8F\u5217\u3002`,paraId:31,tocIndex:11},{value:`var buildTree = function (preorder, inorder) {
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
//Runtime: 132 ms, faster than 46.85 % of javascript   \u5F85\u4F18\u5316
`,paraId:32,tocIndex:11},{value:`    3
   / \\
  9  20
    /  \\
   15   7

\u5728\u8FD9\u4E2A\u4E8C\u53C9\u6811\u4E2D\uFF0C\u6709\u4E24\u4E2A\u5DE6\u53F6\u5B50\uFF0C\u5206\u522B\u662F 9 \u548C 15\uFF0C\u6240\u4EE5\u8FD4\u56DE 24
`,paraId:33,tocIndex:12},{value:"leetcode",paraId:34,tocIndex:12},{value:"\u5206\u6790\uFF1A\u6BCF\u6B21\u9012\u5F52\u524D\uFF0C\u8981\u5148\u5224\u65AD\u8282\u70B9\u662F\u4E0D\u662F\u7A7A\u3002\u5982\u679C\u5DE6\u5B50\u6811\u5B58\u5728\u5E76\u4E14\u6CA1\u6709\u5B50\u8282\u70B9\uFF0C\u5C31\u7D2F\u8BA1\u7ED3\u679C\uFF1B\u5426\u5219\u7EE7\u7EED\u9012\u5F52\u3002",paraId:35,tocIndex:12},{value:`var sumOfLeftLeaves = function (root) {
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
`,paraId:36,tocIndex:12},{value:`\u8F93\u5165\uFF1A
    3
   / \\
  9  20
    /  \\
   15   7
\u8F93\u51FA\uFF1A[3, 14.5, 11]
\u89E3\u91CA\uFF1A
\u7B2C 0 \u5C42\u7684\u5E73\u5747\u503C\u662F 3 ,  \u7B2C1\u5C42\u662F 14.5 , \u7B2C2\u5C42\u662F 11 \u3002\u56E0\u6B64\u8FD4\u56DE [3, 14.5, 11] \u3002
`,paraId:37,tocIndex:13},{value:"leetcode",paraId:38,tocIndex:13},{value:"\u5206\u6790\uFF1A\u91C7\u7528\u5C42\u7EA7\u904D\u5386\uFF0C\u5957\u7528\u4E0A\u6587\u7684 bfs \u6A21\u677F\u3002\u7B2C\u4E00\u5C42\u5FAA\u73AF\u8868\u793A\u5C42\u7EA7\uFF0C\u7B2C\u4E8C\u5C42\u5FAA\u574F\u8868\u793A\u5FAA\u73AF\u5F53\u524D\u5C42\u7EA7\u7684\u6240\u6709\u8282\u70B9\u3002",paraId:39,tocIndex:13},{value:`var averageOfLevels = function (root) {
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
`,paraId:40,tocIndex:13},{value:`         1
       /   \\
      2     3
\u8F93\u51FA\uFF1A1
\u89E3\u91CA\uFF1A
\u7ED3\u70B9 2 \u7684\u5761\u5EA6: 0
\u7ED3\u70B9 3 \u7684\u5761\u5EA6: 0
\u7ED3\u70B9 1 \u7684\u5761\u5EA6: |2-3| = 1
\u6811\u7684\u5761\u5EA6 : 0 + 0 + 1 = 1

`,paraId:41,tocIndex:14},{value:"leetcode",paraId:42,tocIndex:14},{value:`
\u5206\u6790\uFF1A\u8282\u70B9\u5761\u5EA6\u662F`,paraId:42,tocIndex:14},{value:"\u5DE6\u5B50\u6811\u7684\u7ED3\u70B9\u4E4B\u548C\u548C\u53F3\u5B50\u6811\u7ED3\u70B9\u4E4B\u548C\u7684\u5DEE\u7684\u7EDD\u5BF9\u503C",paraId:42,tocIndex:14},{value:`\uFF0C\u6240\u4EE5\u8981\u4ECE\u6700\u6DF1\u5F00\u59CB\u904D\u5386
\u9012\u5F52\u5F00\u59CB\uFF0C\u8BBE\u7F6E\u4E00\u4E2A\u503C\u83B7\u53D6\u6BCF\u4E2A\u8282\u70B9\u4E0B\u9762\uFF0C\u5DE6\u8282\u70B9\u603B\u548C\uFF0C\u53F3\u8282\u70B9\u603B\u548C\u3002\u7136\u540E\u53BB\u76F8\u51CF\u53D6\u7EDD\u5BF9\u503C
\u6CE8\u610F\u6BCF\u6B21\u9012\u5F52\u524D\uFF0C\u8981\u5148\u5224\u65AD\u8282\u70B9\u662F\u4E0D\u662F\u7A7A`,paraId:42,tocIndex:14},{value:`var findTilt = function (root) {
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
`,paraId:43,tocIndex:14},{value:`\u7ED9\u51FA\u8FD9\u6837\u7684\u4E00\u4E2A\u4E8C\u53C9\u6811\uFF0C\u4F60\u9700\u8981\u8F93\u51FA\u6240\u6709\u8282\u70B9\u4E2D\u7684\u7B2C\u4E8C\u5C0F\u7684\u503C\u3002\u5982\u679C\u7B2C\u4E8C\u5C0F\u7684\u503C\u4E0D\u5B58\u5728\u7684\u8BDD\uFF0C\u8F93\u51FA -1 \u3002

\u793A\u4F8B 1:                                         \u793A\u4F8B 2:

\u8F93\u5165:                                           \u8F93\u5165:
    2                                               2
   / \\                                             / \\
  2   5                                           2   2
     / \\
    5   7

\u8F93\u51FA: 5                                         \u8F93\u51FA: -1
\u8BF4\u660E: \u6700\u5C0F\u7684\u503C\u662F 2 \uFF0C\u7B2C\u4E8C\u5C0F\u7684\u503C\u662F 5 \u3002            \u8BF4\u660E: \u6700\u5C0F\u7684\u503C\u662F 2, \u4F46\u662F\u4E0D\u5B58\u5728\u7B2C\u4E8C\u5C0F\u7684\u503C\u3002
`,paraId:44,tocIndex:15},{value:"leetcode",paraId:45,tocIndex:15},{value:`
\u5206\u6790 1\uFF1A\u91C7\u7528 dfs \u9012\u5F52\uFF0C\u501F\u52A9\u6570\u7EC4\u5B58\u50A8\u6570\u636E\u3002\u5982\u679C res \u4E2D\u4E0D\u5B58\u5728\u5F53\u524D\u8282\u70B9\u503C\uFF0C\u5C31\u653E\u5165\u6570\u7EC4\u4E2D\uFF0C\u4ECE\u800C\u8FBE\u5230\u53BB\u91CD\u7684\u6548\u679C\u3002`,paraId:45,tocIndex:15},{value:`var findSecondMinimumValue = function (root) {
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
`,paraId:46,tocIndex:15},{value:`\u7ED9\u5B9A\u4E00\u4E2A\u4E8C\u53C9\u6811\uFF0C\u5B83\u7684\u6BCF\u4E2A\u7ED3\u70B9\u90FD\u5B58\u653E\u4E00\u4E2A\xA00-9\xA0\u7684\u6570\u5B57\uFF0C\u6BCF\u6761\u4ECE\u6839\u5230\u53F6\u5B50\u8282\u70B9\u7684\u8DEF\u5F84\u90FD\u4EE3\u8868\u4E00\u4E2A\u6570\u5B57\u3002

\u4F8B\u5982\uFF0C\u4ECE\u6839\u5230\u53F6\u5B50\u8282\u70B9\u8DEF\u5F84 1->2->3 \u4EE3\u8868\u6570\u5B57 123\u3002

\u8BA1\u7B97\u4ECE\u6839\u5230\u53F6\u5B50\u8282\u70B9\u751F\u6210\u7684\u6240\u6709\u6570\u5B57\u4E4B\u548C\u3002

\u8BF4\u660E:\xA0\u53F6\u5B50\u8282\u70B9\u662F\u6307\u6CA1\u6709\u5B50\u8282\u70B9\u7684\u8282\u70B9\u3002

\u793A\u4F8B 1:

\u8F93\u5165: [1,2,3]
    1
   / \\
  2   3
\u8F93\u51FA: 25
\u89E3\u91CA:
\u4ECE\u6839\u5230\u53F6\u5B50\u8282\u70B9\u8DEF\u5F84 1->2 \u4EE3\u8868\u6570\u5B57 12.
\u4ECE\u6839\u5230\u53F6\u5B50\u8282\u70B9\u8DEF\u5F84 1->3 \u4EE3\u8868\u6570\u5B57 13.
\u56E0\u6B64\uFF0C\u6570\u5B57\u603B\u548C = 12 + 13 = 25.
`,paraId:47,tocIndex:16},{value:"leetcode",paraId:48,tocIndex:16},{value:`
\u5206\u6790\uFF1A\u6BCF\u4E2A\u8282\u70B9\u90FD\u4EE3\u8868\u4E00\u4E2A\u6570\u5B57\uFF0C\u7B49\u540C\u4E8E\u5176\u7236\u8282\u70B9\u5BF9\u5E94\u7684\u6570\u5B57*10 \u518D\u52A0\u4E0A\u8BE5\u8282\u70B9\u7684\u503C\u3002\u8BA1\u7B97\u51FA\u6BCF\u4E2A\u53F6\u5B50\u8282\u70B9\u5BF9\u5E94\u7684\u6570\u5B57\uFF0C\u8BA1\u7B97\u51FA\u6240\u6709\u7684\u53F6\u5B50\u8282\u70B9\u5BF9\u5E94\u7684\u6570\u5B57\u4E4B\u548C\u3002
\u5206\u6790 1\uFF1Adfs\uFF0C\u4ECE\u6839\u8282\u70B9\u5F00\u59CB\uFF0C\u904D\u5386\u6BCF\u4E2A\u8282\u70B9\uFF0C\u5982\u679C\u9047\u5230\u53F6\u5B50\u8282\u70B9\u5C31\u5C06\u6570\u5B57\u52A0\u5230\u6570\u5B57\u4E4B\u548C\u3002\u5982\u679C\u4E0D\u662F\u53F6\u5B50\u8282\u70B9\uFF0C\u5C31\u8BA1\u7B97\u5F53\u524D\u8282\u70B9\u7684\u6570\u5B57\uFF0C\u7136\u540E\u5BF9\u5B50\u8282\u70B9\u9012\u5F52\u904D\u5386\u3002`,paraId:48,tocIndex:16},{value:`var sumNumbers = function (root) {
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
`,paraId:49,tocIndex:16},{value:"\u5206\u6790 2\uFF1Abfs\uFF0C\u9700\u8981\u7EF4\u62A4\u4E24\u4E2A\u961F\u5217\uFF0C\u8282\u70B9\u961F\u5217\u548C\u8282\u70B9\u5BF9\u5E94\u7684\u6570\u5B57\u3002\u5982\u679C\u5F53\u524D\u8282\u70B9\u662F\u53F6\u5B50\u8282\u70B9\uFF0C\u5C06\u8282\u70B9\u5BF9\u5E94\u7684\u6570\u5B57\u52A0\u5230\u6570\u5B57\u4E4B\u548C\uFF1B\u5982\u679C\u4E0D\u662F\u53F6\u5B50\u8282\u70B9\uFF0C\u5C31\u628A\u5B50\u8282\u70B9\u548C\u5B50\u8282\u70B9\u8BA1\u7B97\u51FA\u7684\u5BF9\u5E94\u6570\u5B57\u5206\u522B\u52A0\u5165\u4E24\u4E2A\u961F\u5217\u4E2D\u3002",paraId:50,tocIndex:16},{value:`var sumNumbers = function (root) {
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
`,paraId:51,tocIndex:16},{value:`\u8F93\u5165:

   1
 /   \\
2     3
 \\
  5

\u8F93\u51FA: ["1->2->5", "1->3"]

\u89E3\u91CA: \u6240\u6709\u6839\u8282\u70B9\u5230\u53F6\u5B50\u8282\u70B9\u7684\u8DEF\u5F84\u4E3A: 1->2->5, 1->3
`,paraId:52,tocIndex:18},{value:"leetcode",paraId:53,tocIndex:18},{value:`
\u5206\u6790\uFF1A\u5229\u7528\u524D\u5E8F\u904D\u5386\uFF0C\u5F53\u67D0\u4E2A\u8282\u70B9\u7684\u5DE6\u53F3\u5B50\u6811\u90FD\u4E3A null \u7684\u65F6\u5019\uFF0C\u8BF4\u660E\u5DF2\u7ECF\u8D70\u5B8C\u8BE5\u8DEF\u5F84`,paraId:53,tocIndex:18},{value:`var binaryTreePaths = function (root) {
  const res = [];
  const recur = (root, str) => {
    if (!root) return '';
    str += \`\${root.val}\`;
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
`,paraId:54,tocIndex:18},{value:`\u8BF4\u660E: \u53F6\u5B50\u8282\u70B9\u662F\u6307\u6CA1\u6709\u5B50\u8282\u70B9\u7684\u8282\u70B9\u3002
\u793A\u4F8B\uFF1A
\u7ED9\u5B9A\u5982\u4E0B\u4E8C\u53C9\u6811\uFF0C\u4EE5\u53CA\u76EE\u6807\u548C sum = 22\uFF0C
              5
             / \\
            4   8
           /   / \\
          11  13  4
         /  \\      \\
        7    2      1
\u8FD4\u56DE true, \u56E0\u4E3A\u5B58\u5728\u76EE\u6807\u548C\u4E3A 22 \u7684\u6839\u8282\u70B9\u5230\u53F6\u5B50\u8282\u70B9\u7684\u8DEF\u5F84 5->4->11->2\u3002
`,paraId:55,tocIndex:19},{value:"leetcode",paraId:56,tocIndex:19},{value:"\u5206\u6790:\u904D\u5386\u6811\u8282\u70B9\uFF0C\u5F53\u904D\u5386\u5B8C\u4E14\u904D\u5386\u7684\u6240\u6709\u7ED3\u70B9\u548C\u4E3A sum \u8FD4\u56DE true\uFF0C\u503C\u5F97\u6CE8\u610F\u7684\u4E00\u70B9",paraId:57,tocIndex:19},{value:"\u6839\u8282\u70B9\u5230\u53F6\u5B50\u8282\u70B9",paraId:57,tocIndex:19},{value:"\uFF0C\u6240\u4EE5\u6761\u4EF6\u4E2D\u9700\u8981\u52A0\u5165 root.left===null&&root.right===null",paraId:57,tocIndex:19},{value:`var hasPathSum = function (root, sum) {
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
`,paraId:58,tocIndex:19},{value:`\u7ED9\u5B9A\u4E00\u4E2A\u4E8C\u53C9\u6811\uFF0C\u627E\u5230\u6700\u957F\u7684\u8DEF\u5F84\uFF0C\u8FD9\u4E2A\u8DEF\u5F84\u4E2D\u7684\u6BCF\u4E2A\u8282\u70B9\u5177\u6709\u76F8\u540C\u503C\u3002 \u8FD9\u6761\u8DEF\u5F84\u53EF\u4EE5\u7ECF\u8FC7\u4E5F\u53EF\u4EE5\u4E0D\u7ECF\u8FC7\u6839\u8282\u70B9\u3002

\u6CE8\u610F\uFF1A\u4E24\u4E2A\u8282\u70B9\u4E4B\u95F4\u7684\u8DEF\u5F84\u957F\u5EA6\u7531\u5B83\u4EEC\u4E4B\u95F4\u7684\u8FB9\u6570\u8868\u793A\u3002

\u793A\u4F8B 1:                        \u793A\u4F8B 2:
\u8F93\u5165:                          \u8F93\u5165:
              5                              1
             / \\                            / \\
            4   5                          4   5
           / \\   \\                        / \\   \\
          1   1   5                      4   4   5
\u8F93\u51FA: 2                        \u8F93\u51FA: 2
`,paraId:59,tocIndex:20},{value:"leetcode",paraId:60,tocIndex:20},{value:"\u5206\u6790\uFF1A\u91C7\u7528 DFS\u3002\u5BF9\u4E8E\u5F53\u524D\u8282\u70B9\uFF0C\u5DE6\u5B50\u6811\u80FD\u63D0\u4F9B\u7684\u957F\u5EA6\u4E3A left\uFF0C\u5982\u679C\u5F53\u524D\u8282\u70B9\u503C\u7B49\u4E8E\u5DE6\u5B50\u8282\u70B9\u7684\u503C\uFF0C\u5219\u5DE6\u94FE\u7684\u957F\u5EA6\u7B49\u4E8E left+1\uFF0C\u5426\u5219\u4E3A 0(\u53F3\u5B50\u6811\u4E5F\u662F\u5982\u6B64)\u3002\u5F53\u524D\u5B50\u6811\u5BF9\u7236\u8282\u70B9\u63D0\u4F9B\u7684\u6700\u5927\u957F\u5EA6\u4E3A\u5DE6\u53F3\u94FE\u4E2D\u8F83\u5927\u7684\u4E00\u4E2A\u3002\u5F53\u524D\u5B50\u6811\u7684\u5DE6\u53F3\u94FE\u4E4B\u548C\uFF0C\u53BB\u548C\u5168\u5C40\u6700\u5927\u503C\u6BD4\u8F83",paraId:61,tocIndex:20},{value:`var longestUnivaluePath = function (root) {
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
`,paraId:62,tocIndex:20},{value:`\u7ED9\u5B9A\u6709\u5E8F\u6570\u7EC4: [-10,-3,0,5,9],

\u4E00\u4E2A\u53EF\u80FD\u7684\u7B54\u6848\u662F\uFF1A[0,-3,9,-10,null,5]\uFF0C\u5B83\u53EF\u4EE5\u8868\u793A\u4E0B\u9762\u8FD9\u4E2A\u9AD8\u5EA6\u5E73\u8861\u4E8C\u53C9\u641C\u7D22\u6811\uFF1A

      0
     / \\
   -3   9
   /   /
 -10  5
`,paraId:63,tocIndex:22},{value:"leetcode",paraId:64,tocIndex:22},{value:`
\u5206\u6790\uFF1A\u4E3A\u4E86\u8FBE\u5230\u5E73\u8861\uFF0C\u6BCF\u6B21\u90FD\u628A\u6570\u7EC4\u4E8C\u5206\uFF0C\u4E2D\u95F4\u7684\u503C\u4F5C\u4E3A\u6839\u8282\u70B9\uFF0C\u7136\u540E\u5DE6\u53F3\u5206\u522B\u4E3A\u5DE6\u53F3\u5B50\u6811\uFF0C\u4F9D\u6B21\u9012\u5F52\uFF0C\u76F4\u81F3\u6570\u7EC4\u4E3A\u7A7A\u3002`,paraId:64,tocIndex:22},{value:`var sortedArrayToBST = function (nums) {
  if (!nums.length) return null;
  const mid = Math.ceil((nums.length - 1) / 2);
  return new TreeNode(
    nums[mid],
    sortedArrayToBST(nums.slice(0, mid)),
    sortedArrayToBST(nums.slice(mid + 1)),
  );
};
//Runtime: 124 ms, faster than 17.83 % of javascript   \u5F85\u4F18\u5316
`,paraId:65,tocIndex:22},{value:`\u7ED9\u5B9A\u4E00\u4E2A\u4E8C\u53C9\u641C\u7D22\u6811\u548C\u4E00\u4E2A\u76EE\u6807\u7ED3\u679C\uFF0C\u5982\u679C BST \u4E2D\u5B58\u5728\u4E24\u4E2A\u5143\u7D20\u4E14\u5B83\u4EEC\u7684\u548C\u7B49\u4E8E\u7ED9\u5B9A\u7684\u76EE\u6807\u7ED3\u679C\uFF0C\u5219\u8FD4\u56DE true\u3002

\u6848\u4F8B 1:                           \u6848\u4F8B 2:

\u8F93\u5165:                             \u8F93\u5165:
    5                                 5
   / \\                               / \\
  3   6                             3   6
 / \\   \\                           / \\   \\
2   4   7                         2   4   7

Target = 9                        Target = 28

\u8F93\u51FA: True                        \u8F93\u51FA: False
`,paraId:66,tocIndex:23},{value:"\u5206\u6790 1\uFF1A\u5148\u628A\u6811\u8F6C\u5316\u4E3A\u6570\u7EC4\uFF0C\u5C06\u9898\u76EE\u8F6C\u6362\u6210\u4E3A\u5728\u6570\u7EC4\u4E2D\u662F\u5426\u5B58\u5728\u4E24\u4E2A\u5143\u7D20\u76F8\u52A0\u4E3A\u76EE\u6807\u7ED3\u679C",paraId:67,tocIndex:23},{value:`var findTarget = function (root, k) {
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
`,paraId:68,tocIndex:23},{value:"\u5206\u6790 2\uFF1A\u76F4\u63A5\u5728\u6811\u4E2D\uFF0C\u4E00\u4E2A\u4E2A\u503C\u62FF\u51FA\u6765\u8FDB\u884C\u6BD4\u8F83\uFF0C\u91C7\u7528 dfs \u4F46\u5148\u904D\u5386\u53F3\u5B50\u6811",paraId:69,tocIndex:23},{value:`var findTarget = function (root, k) {
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
`,paraId:70,tocIndex:23},{value:`\u8F93\u5165: root = [4,2,6,1,3,null,null]
\u8F93\u51FA: 1
\u89E3\u91CA:
\u6CE8\u610F\uFF0Croot\u662F\u6811\u8282\u70B9\u5BF9\u8C61(TreeNode object)\uFF0C\u800C\u4E0D\u662F\u6570\u7EC4\u3002

\u7ED9\u5B9A\u7684\u6811 [4,2,6,1,3,null,null] \u53EF\u8868\u793A\u4E3A\u4E0B\u56FE:

          4
        /   \\
      2      6
     / \\
    1   3

\u6700\u5C0F\u7684\u5DEE\u503C\u662F 1, \u5B83\u662F\u8282\u70B91\u548C\u8282\u70B92\u7684\u5DEE\u503C, \u4E5F\u662F\u8282\u70B93\u548C\u8282\u70B92\u7684\u5DEE\u503C\u3002
`,paraId:71,tocIndex:24},{value:"leetcode",paraId:72,tocIndex:24},{value:`
\u5206\u6790\uFF1A\u901A\u8FC7\u4E2D\u5E8F\u904D\u5386\uFF0C\u4F7F\u7528 last \u5B58\u50A8\u4E0A\u4E00\u4E2A\u8282\u70B9\u7684 val \u503C\uFF0C\u548C\u5F53\u524D\u8282\u70B9\u7684\u503C\u505A\u51CF\u6CD5\u4E0E ans \u505A\u6BD4\u8F83\uFF0C\u83B7\u5F97\u6700\u5C0F\u7684\u503C`,paraId:72,tocIndex:24},{value:`var minDiffInBST = function (root) {
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
`,paraId:73,tocIndex:24},{value:`\u7ED9\u5B9A\u4E00\u4E2A\u6709\u76F8\u540C\u503C\u7684\u4E8C\u53C9\u641C\u7D22\u6811\uFF08BST\uFF09\uFF0C\u627E\u51FA BST \u4E2D\u7684\u6240\u6709\u4F17\u6570\uFF08\u51FA\u73B0\u9891\u7387\u6700\u9AD8\u7684\u5143\u7D20\uFF09\u3002

\u7ED9\u5B9A BST [1,null,2,2]
   1
    \\
     2
    /
   2
\u8FD4\u56DE[2]
`,paraId:74,tocIndex:25},{value:"leetcode",paraId:75,tocIndex:25},{value:`
\u5206\u6790\uFF1A\u91C7\u7528 dfs \u9012\u5F52\u89E3\u6CD5\uFF0C\u5F53 maxCount \u5C0F\u4E8E\u904D\u5386\u7ED3\u70B9\u503C\u51FA\u73B0\u7684\u6B21\u6570\uFF0C\u5C31\u66F4\u65B0 maxCount \u5E76\u7F6E\u7A7A res\uFF1B\u76F8\u7B49\u5C31\u628A\u8282\u70B9\u503C\u653E\u5165 res\uFF1B\u5C0F\u4E8E\u4E0D\u64CD\u4F5C\u3002`,paraId:75,tocIndex:25},{value:`var findMode = function (root) {
  const map = new Map(); //\u5B58\u50A8\u6570\u5B57\u51FA\u73B0\u7684\u6B21\u6570
  const res = []; //\u5B58\u50A8\u51FA\u73B0\u6B21\u6570\u6700\u591A\u7684\u6570
  let maxCount = 0; //\u5F53\u524D\u6700\u5927\u51FA\u73B0\u6B21\u6570
  const recur = (root) => {
    if (!root) return;
    const curr = root.val;
    map.has(curr) ? map.set(curr, map.get(curr) + 1) : map.set(curr, 1);
    if (map.get(curr) >= maxCount) {
      map.get(curr) > maxCount && (res.length = 0); //\u5982\u679C\u6BD4\u5F53\u524DmaxCount\u5927\uFF0C\u5219\u91CD\u7F6Eres
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
`,paraId:76,tocIndex:25}]}}]);

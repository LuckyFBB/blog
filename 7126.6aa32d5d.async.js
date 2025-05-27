"use strict";(self.webpackChunkblog_of_fbb=self.webpackChunkblog_of_fbb||[]).push([[7126],{17126:function(a,n,e){e.r(n),e.d(n,{texts:function(){return t}});const t=[{value:"\u524D\u9762\u7684\u6587\u7AE0\u4E2D\uFF0C\u5BF9\u4E8E\u4E00\u4E9B\u4F7F\u7528\u8F83\u591A\u7684\u6570\u636E\u7ED3\u6784\u8FDB\u884C\u4E86\u5B66\u4E60\u603B\u7ED3\uFF0C\u63A5\u6765\u4E0B\u4F1A\u9488\u5BF9\u4E00\u4E9B\u5E38\u89C1\u7B97\u6CD5\u8FDB\u884C\u603B\u7ED3\u3002",paraId:0},{value:`\u6ED1\u52A8\u7A97\u53E3\u7C7B\u578B\u7ECF\u5E38\u662F\u7528\u6765\u6267\u884C\u6570\u7EC4\u6216\u8005\u94FE\u8868\u4E0A\u67D0\u4E2A\u533A\u95F4(\u7A97\u53E3)\u4E0A\u7684\u64CD\u4F5C\u3002
\u53EF\u5206\u4E3A\u56FA\u5B9A\u7A97\u53E3\u5927\u5C0F\u548C\u53EF\u53D8\u7A97\u53E3\u5927\u5C0F\u3002`,paraId:1,tocIndex:0},{value:"\u8BC6\u522B\u6ED1\u52A8\u7A97\u53E3\u7684\u62DB\u6570\uFF1A",paraId:2,tocIndex:0},{value:"\u8F93\u5165\u662F\u4E00\u4E9B\u7EBF\u6027\u7ED3\u6784\uFF1A\u6BD4\u5982\u94FE\u8868/\u6570\u7EC4/\u5B57\u7B26\u4E32\u554A\u4E4B\u7C7B\u7684",paraId:3,tocIndex:0},{value:"\u8BA9\u4F60\u53BB\u6C42\u6700\u957F/\u6700\u77ED\u5B50\u5B57\u7B26\u4E32\u6216\u662F\u67D0\u4E9B\u7279\u5B9A\u7684\u957F\u5EA6\u8981\u6C42",paraId:3,tocIndex:0},{value:"\u67D0\u535A\u4E3B\u603B\u7ED3\u7684\u6ED1\u52A8\u7A97\u53E3\u6846\u67B6",paraId:4,tocIndex:0},{value:`/* \u6ED1\u52A8\u7A97\u53E3\u7B97\u6CD5\u6846\u67B6 */
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
    // c \u662F\u5C06\u79FB\u5165\u7A97\u53E3\u7684\u5B57\u7B26
    let c = s[right];
    // \u53F3\u79FB\u7A97\u53E3
    right++;
    // \u8FDB\u884C\u7A97\u53E3\u5185\u6570\u636E\u7684\u4E00\u7CFB\u5217\u66F4\u65B0

    // \u5224\u65AD\u5DE6\u4FA7\u7A97\u53E3\u662F\u5426\u8981\u6536\u7F29
    while (window should shrink) {
      // d \u662F\u5C06\u79FB\u51FA\u7A97\u53E3\u7684\u5B57\u7B26
      let d = s[left];
      // \u5DE6\u79FB\u7A97\u53E3
      left++;
      // \u8FDB\u884C\u7A97\u53E3\u5185\u6570\u636E\u7684\u4E00\u7CFB\u5217\u66F4\u65B0
    }
  }
}
`,paraId:5,tocIndex:0},{value:"\u53EA\u9700\u5173\u6CE8\u8FD9\u51E0\u4E2A\u95EE\u9898\uFF1A",paraId:6,tocIndex:0},{value:"\u5F53\u79FB\u52A8 right\uFF0C\u6269\u5927\u7A97\u53E3\u65F6\uFF0C\u54EA\u4E9B\u6570\u636E\u9700\u8981\u66F4\u65B0\u3002",paraId:7,tocIndex:0},{value:"\u4EC0\u4E48\u6761\u4EF6\u4E0B\uFF0C\u6211\u4EEC\u9700\u8981\u7F29\u5C0F\u7A97\u53E3\uFF0C\u79FB\u52A8 left\u3002",paraId:7,tocIndex:0},{value:"\u5F53\u79FB\u52A8 left\uFF0C\u7F29\u5C0F\u7A97\u53E3\u65F6\uFF0C\u54EA\u4E9B\u6570\u636E\u9700\u8981\u505A\u5904\u7406\u3002",paraId:7,tocIndex:0},{value:`\u7ED9\u5B9A\u4E00\u4E2A\u5B57\u7B26\u4E32\uFF0C\u8BF7\u4F60\u627E\u51FA\u5176\u4E2D\u4E0D\u542B\u6709\u91CD\u590D\u5B57\u7B26\u7684\xA0\u6700\u957F\u5B50\u4E32\xA0\u7684\u957F\u5EA6\u3002

\u793A\u4F8B\xA01:

\u8F93\u5165: s = "abcabcbb"
\u8F93\u51FA: 3
\u89E3\u91CA: \u56E0\u4E3A\u65E0\u91CD\u590D\u5B57\u7B26\u7684\u6700\u957F\u5B50\u4E32\u662F "abc"\uFF0C\u6240\u4EE5\u5176\u957F\u5EA6\u4E3A 3\u3002

\u793A\u4F8B 2:

\u8F93\u5165: s = ""
\u8F93\u51FA: 0
`,paraId:8,tocIndex:1},{value:"LeetCode",paraId:9,tocIndex:1},{value:"\u5206\u6790\uFF1A\u6309\u7740\u4E0A\u9762\u63D0\u4F9B\u7684\u6A21\u677F\u3002\u5F80 window \u6ED1\u7A97\u4E2D\uFF0C\u52A0\u5165\u5F53\u524D char \u503C\uFF0C\u7136\u540E\u5224\u65AD\u5F53\u524D window \u4E2D char \u503C\u662F\u5426\u552F\u4E00\uFF0C\u5982\u679C\u4E0D\u552F\u4E00\u5C31\u6539\u53D8 left \u7F29\u5C0F\u7A97\u53E3\u3002\u6BD4\u8F83\u5F53\u524D right-left \u4E0E res \u7684\u503C\u3002",paraId:10,tocIndex:1},{value:`var lengthOfLongestSubstring = function (s) {
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
`,paraId:11,tocIndex:1},{value:`\u7ED9\u5B9A\u4E00\u4E2A\u5B57\u7B26\u4E32\xA0s\xA0\u548C\u4E00\u4E2A\u975E\u7A7A\u5B57\u7B26\u4E32\xA0p\uFF0C\u627E\u5230\xA0s\xA0\u4E2D\u6240\u6709\u662F\xA0p\xA0\u7684\u5B57\u6BCD\u5F02\u4F4D\u8BCD\u7684\u5B50\u4E32\uFF0C\u8FD4\u56DE\u8FD9\u4E9B\u5B50\u4E32\u7684\u8D77\u59CB\u7D22\u5F15\u3002

\u5B57\u7B26\u4E32\u53EA\u5305\u542B\u5C0F\u5199\u82F1\u6587\u5B57\u6BCD\uFF0C\u5E76\u4E14\u5B57\u7B26\u4E32\xA0s\xA0\u548C p\xA0\u7684\u957F\u5EA6\u90FD\u4E0D\u8D85\u8FC7 20100\u3002

\u8BF4\u660E\uFF1A

\u5B57\u6BCD\u5F02\u4F4D\u8BCD\u6307\u5B57\u6BCD\u76F8\u540C\uFF0C\u4F46\u6392\u5217\u4E0D\u540C\u7684\u5B57\u7B26\u4E32\u3002
\u4E0D\u8003\u8651\u7B54\u6848\u8F93\u51FA\u7684\u987A\u5E8F\u3002
\u793A\u4F8B\xA01:
\u8F93\u5165:
s: "cbaebabacd" p: "abc"
\u8F93\u51FA:
[0, 6]
\u89E3\u91CA:
\u8D77\u59CB\u7D22\u5F15\u7B49\u4E8E 0 \u7684\u5B50\u4E32\u662F "cba", \u5B83\u662F "abc" \u7684\u5B57\u6BCD\u5F02\u4F4D\u8BCD\u3002
\u8D77\u59CB\u7D22\u5F15\u7B49\u4E8E 6 \u7684\u5B50\u4E32\u662F "bac", \u5B83\u662F "abc" \u7684\u5B57\u6BCD\u5F02\u4F4D\u8BCD\u3002
`,paraId:12,tocIndex:2},{value:"LeetCode",paraId:13,tocIndex:2},{value:`
\u5206\u6790\uFF1A\u9898\u76EE\u4E2D\u7684\u5B57\u6BCD\u5F02\u4F4D\u8BCD\uFF0C\u5B9E\u9645\u4E0A\u5C31\u662F\u5B57\u6BCD\u7684\u4E0D\u540C\u6392\u5217\u3002\u9996\u5148\u5148\u83B7\u53D6\u5230 p \u4E2D\u6240\u6709\u7684\u5B57\u7B26\u548C\u4E2A\u6570\u3002\u601D\u8003\u4E0A\u8FF0\u4E09\u4E2A\u95EE\u9898\uFF0C\u5F53 right \u6269\u5927\u65F6\uFF0C\u5982\u679C p \u5B57\u7B26\u4E32\u4E2D\u6709\u8FD9\u4E2A\u5B57\u7B26\uFF0C\u5728 window \u4E2D\u66F4\u65B0\u5B57\u7B26\u7684\u503C\uFF0Cp \u548C\u7A97\u53E3\u4E2D\u5F53\u524D\u5B57\u7B26\u6570\u91CF\u76F8\u540C\uFF0Cvalid++\uFF1B\u5F53 right-left \u5373\u7A97\u53E3\u7684\u5927\u5C0F>p \u7684\u957F\u5EA6\u65F6\uFF0C\u7F29\u5C0F\u7A97\u53E3\uFF1B\u5728\u7F29\u5C0F\u7A97\u53E3\u65F6\uFF0Cvalid=need.size \u5373\u6EE1\u8DB3\u6761\u4EF6\uFF0C\u628A left \u4F5C\u4E3A\u7ED3\u679C\u4E4B\u4E00\uFF0C\u66F4\u65B0 valid \u548C window \u7684\u6570\u636E\u3002`,paraId:13,tocIndex:2},{value:`var findAnagrams = function (s, p) {
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
`,paraId:14,tocIndex:2},{value:`\u7ED9\u5B9A\u4E24\u4E2A\u5B57\u7B26\u4E32\xA0s1\xA0\u548C\xA0s2\uFF0C\u5199\u4E00\u4E2A\u51FD\u6570\u6765\u5224\u65AD s2 \u662F\u5426\u5305\u542B s1\xA0\u7684\u6392\u5217\u3002
\u6362\u53E5\u8BDD\u8BF4\uFF0C\u7B2C\u4E00\u4E2A\u5B57\u7B26\u4E32\u7684\u6392\u5217\u4E4B\u4E00\u662F\u7B2C\u4E8C\u4E2A\u5B57\u7B26\u4E32\u7684\u5B50\u4E32\u3002

\u793A\u4F8B1:
\u8F93\u5165: s1 = "ab" s2 = "eidbaooo"
\u8F93\u51FA: True
\u89E3\u91CA: s2 \u5305\u542B s1 \u7684\u6392\u5217\u4E4B\u4E00 ("ba").

\u793A\u4F8B2:
\u8F93\u5165: s1= "ab" s2 = "eidboaoo"
\u8F93\u51FA: False
`,paraId:15,tocIndex:3},{value:"LeetCode",paraId:16,tocIndex:3},{value:"\u5206\u6790\uFF1A\u548C\u4E0A\u4E00\u9898\u4E00\u81F4\u3002\u53EA\u662F\u8FD4\u56DE\u7ED3\u679C\u4E0D\u4E00\u6837\u3002",paraId:17,tocIndex:3},{value:`var checkInclusion = function (s1, s2) {
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
`,paraId:18,tocIndex:3},{value:`\u7ED9\u5B9A\u4E00\u4E2A\u5B57\u7B26\u4E32 s \uFF0C\u627E\u51FA \u81F3\u591A \u5305\u542B\u4E24\u4E2A\u4E0D\u540C\u5B57\u7B26\u7684\u6700\u957F\u5B50\u4E32 t \uFF0C\u5E76\u8FD4\u56DE\u8BE5\u5B50\u4E32\u7684\u957F\u5EA6\u3002

\u793A\u4F8B 1:
\u8F93\u5165: "eceba"
\u8F93\u51FA: 3
\u89E3\u91CA: t \u662F "ece"\uFF0C\u957F\u5EA6\u4E3A 3\u3002

\u793A\u4F8B 2:
\u8F93\u5165: "ccaabbb"
\u8F93\u51FA: 5
\u89E3\u91CA: t \u662F "aabbb"\uFF0C\u957F\u5EA6\u4E3A 5\u3002
`,paraId:19,tocIndex:4},{value:"LeetCode",paraId:20,tocIndex:4},{value:`
\u5206\u6790\uFF1A\u9996\u5148\u5728\u6269\u5927\u7A97\u53E3\u65F6\uFF0C\u5982\u679C\u6ED1\u7A97\u5927\u5C0F\u4E0D\u5927\u4E8E 2\uFF0C\u5C31\u66F4\u65B0 window \u4E2D\u7684\u6570\u636E\u503C\uFF1B\u5F53\u6ED1\u7A97\u5927\u5C0F\u5927\u4E8E 2 \u65F6\uFF0C\u7F29\u5C0F\u7A97\u53E3\uFF1B\u5728\u7F29\u5C0F\u7A97\u53E3\u65F6\uFF0C\u5F53\u524D\u5B57\u7B26\u7684\u503C\u51CF 1 \u4E14\u4E3A 0 \u65F6\u5C06\u5B83\u4ECE\u6ED1\u7A97\u5220\u9664\u3002`,paraId:20,tocIndex:4},{value:`var lengthOfLongestSubstringTwoDistinct = function (s) {
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
`,paraId:21,tocIndex:4},{value:`\u7ED9\u5B9A\u4E00\u4E2A\u5B57\u7B26\u4E32 s \uFF0C\u627E\u51FA \u81F3\u591A \u5305\u542B k \u4E2A\u4E0D\u540C\u5B57\u7B26\u7684\u6700\u957F\u5B50\u4E32 T\u3002

\u793A\u4F8B1\uFF1A
\u8F93\u5165: s = "eceba", k = 2
\u8F93\u51FA: 3
\u89E3\u91CA: \u5219 T \u4E3A \u201Cece\u201D\uFF0C\u6240\u4EE5\u957F\u5EA6\u4E3A 3\u3002

\u793A\u4F8B2\uFF1A
\u8F93\u5165: s = \u201Caa\u201D, k = 1
\u8F93\u51FA: 2
\u89E3\u91CA: \u5219 T \u4E3A \u201Caa\u201D\uFF0C\u6240\u4EE5\u957F\u5EA6\u4E3A 2\u3002
`,paraId:22,tocIndex:5},{value:"Leetcode",paraId:23,tocIndex:5},{value:"\u5206\u6790\uFF1A\u548C\u4E0A\u4E00\u9898\u4E00\u6837\uFF0C\u628A\u4E0A\u4E00\u9898\u4E2D\u7684 2 \u53D8\u4E3A k\u3002",paraId:24,tocIndex:5},{value:`var lengthOfLongestSubstringKDistinct = function (s, k) {
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
`,paraId:25,tocIndex:5},{value:`\u7ED9\u5B9A\u4E00\u4E2A\u6B63\u6574\u6570\u6570\u7EC4 A\uFF0C\u5982\u679C A\xA0\u7684\u67D0\u4E2A\u5B50\u6570\u7EC4\u4E2D\u4E0D\u540C\u6574\u6570\u7684\u4E2A\u6570\u6070\u597D\u4E3A K\uFF0C\u5219\u79F0 A \u7684\u8FD9\u4E2A\u8FDE\u7EED\u3001\u4E0D\u4E00\u5B9A\u72EC\u7ACB\u7684\u5B50\u6570\u7EC4\u4E3A\u597D\u5B50\u6570\u7EC4\u3002\uFF08\u4F8B\u5982\uFF0C[1,2,3,1,2] \u4E2D\u6709\xA03\xA0\u4E2A\u4E0D\u540C\u7684\u6574\u6570\uFF1A1\uFF0C2\uFF0C\u4EE5\u53CA\xA03\u3002\uFF09\u8FD4\u56DE\xA0A\xA0\u4E2D\u597D\u5B50\u6570\u7EC4\u7684\u6570\u76EE\u3002

\u793A\u4F8B 1\uFF1A
\u8F93\u5165\uFF1AA = [1,2,1,2,3], K = 2
\u8F93\u51FA\uFF1A7
\u89E3\u91CA\uFF1A\u6070\u597D\u7531 2 \u4E2A\u4E0D\u540C\u6574\u6570\u7EC4\u6210\u7684\u5B50\u6570\u7EC4\uFF1A[1,2], [2,1], [1,2], [2,3], [1,2,1], [2,1,2], [1,2,1,2].

\u793A\u4F8B 2\uFF1A
\u8F93\u5165\uFF1AA = [1,2,1,3,4], K = 3
\u8F93\u51FA\uFF1A3
\u89E3\u91CA\uFF1A\u6070\u597D\u7531 3 \u4E2A\u4E0D\u540C\u6574\u6570\u7EC4\u6210\u7684\u5B50\u6570\u7EC4\uFF1A[1,2,1,3], [2,1,3], [1,3,4].
`,paraId:26,tocIndex:6},{value:"LeetCode",paraId:27,tocIndex:6},{value:"\u5206\u6790\uFF1A\u6309\u7740\u4E0A\u5217\u95EE\u9898\uFF0C\u5206\u522B\u89E3\u7B54\u5BB9\u6613\u5F97\u5230 subarraysLessKDistinct \u51FD\u6570\uFF0C\u4F46\u662F\u5F97\u5230\u7684\u7ED3\u679C\u662F K \u542B K \u4EE5\u4E0B\u7684\u503C\uFF0C\u518D\u51CF\u53BB K-1 \u542B K-1 \u4EE5\u4E0B\u5F97\u5230 K \u7684\u7ED3\u679C\u3002",paraId:28,tocIndex:6},{value:`var subarraysWithKDistinct = function (A, K) {
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
`,paraId:29,tocIndex:6},{value:"\u5FEB\u6162\u6307\u9488\uFF1A\u8FD9\u79CD\u7B97\u6CD5\u7684\u4E24\u4E2A\u6307\u9488\u5728\u6570\u7EC4\u6216\u94FE\u8868\u4E0A\u7684\u79FB\u52A8\u901F\u5EA6\u4E0D\u4E00\u6837\u3002\u5927\u591A\u60C5\u51B5\u4E0B\u7528\u4E8E\u5224\u65AD\u94FE\u8868\u4E2D\u662F\u5426\u6709\u73AF\u7684\u60C5\u51B5\u3002",paraId:30,tocIndex:7},{value:`\u5982\u679C\u94FE\u8868\u4E2D\u6709\u67D0\u4E2A\u8282\u70B9\uFF0C\u53EF\u4EE5\u901A\u8FC7\u8FDE\u7EED\u8DDF\u8E2A next \u6307\u9488\u518D\u6B21\u5230\u8FBE\uFF0C\u5219\u94FE\u8868\u4E2D\u5B58\u5728\u73AF\u3002 \u4E3A\u4E86\u8868\u793A\u7ED9\u5B9A\u94FE\u8868\u4E2D\u7684\u73AF\uFF0C\u6211\u4EEC\u4F7F\u7528\u6574\u6570 pos \u6765\u8868\u793A\u94FE\u8868\u5C3E\u8FDE\u63A5\u5230\u94FE\u8868\u4E2D\u7684\u4F4D\u7F6E\uFF08\u7D22\u5F15\u4ECE 0 \u5F00\u59CB\uFF09\u3002 \u5982\u679C pos \u662F -1\uFF0C\u5219\u5728\u8BE5\u94FE\u8868\u4E2D\u6CA1\u6709\u73AF\u3002\u6CE8\u610F\uFF1Apos \u4E0D\u4F5C\u4E3A\u53C2\u6570\u8FDB\u884C\u4F20\u9012\uFF0C\u4EC5\u4EC5\u662F\u4E3A\u4E86\u6807\u8BC6\u94FE\u8868\u7684\u5B9E\u9645\u60C5\u51B5\u3002

\u5982\u679C\u94FE\u8868\u4E2D\u5B58\u5728\u73AF\uFF0C\u5219\u8FD4\u56DE true \u3002 \u5426\u5219\uFF0C\u8FD4\u56DE false \u3002
`,paraId:31,tocIndex:8},{value:"leetcode",paraId:32,tocIndex:8},{value:`
\u5206\u6790 1\uFF1A\u5FEB\u6162\u6307\u9488\u6CD5\u3002\u4ECE\u94FE\u8868\u5934\u5F00\u59CB\uFF0C\u5FEB\u6307\u9488\u6BCF\u6B21\u8D70\u4E24\u6B65\uFF0C\u6162\u6307\u9488\u6BCF\u6B21\u8D70\u4E00\u6B65\uFF0C\u5982\u679C\u8282\u70B9\u503C\u76F8\u540C\uFF0C\u8BF4\u660E\u6709\u73AF\u3002\u5982\u679C\u4E0D\u540C\uFF0C\u7EE7\u7EED\u5FAA\u73AF\u3002`,paraId:32,tocIndex:8},{value:`var hasCycle = function (head) {
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
`,paraId:33,tocIndex:8},{value:`\u7ED9\u5B9A\u4E00\u4E2A\u94FE\u8868\uFF0C\u8FD4\u56DE\u94FE\u8868\u5F00\u59CB\u5165\u73AF\u7684\u7B2C\u4E00\u4E2A\u8282\u70B9\u3002 \u5982\u679C\u94FE\u8868\u65E0\u73AF\uFF0C\u5219\u8FD4\u56DE null\u3002
`,paraId:34,tocIndex:9},{value:"leetcode",paraId:35,tocIndex:9},{value:`\u5206\u6790 1\uFF1A\u5FEB\u6162\u6307\u9488\u6CD5\u3002\u548C\u4E0A\u4E00\u9898\u7684\u65B9\u6CD5\u4E00\u6837\uFF0C\u4ECE\u94FE\u8868\u5934\u5F00\u59CB\uFF0C\u5FEB\u6307\u9488\u6BCF\u6B21\u8D70\u4E24\u6B65\uFF0C\u6162\u6307\u9488\u6BCF\u6B21\u8D70\u4E00\u6B65\u3002
`,paraId:36,tocIndex:9},{value:`
D\uFF1A\u5934\u8282\u70B9\u5230\u5165\u73AF\u70B9\u7684\u8DDD\u79BB
S1\uFF1A\u4ECE\u5165\u73AF\u70B9\u5230\u9996\u6B21\u76F8\u9047\u70B9\u7684\u8DDD\u79BB
S2\uFF1A\u4ECE\u9996\u6B21\u76F8\u9047\u70B9\u5230\u5165\u73AF\u70B9\u7684\u8DDD\u79BB
\u76F8\u9047\u65F6\uFF0C\u6162\u6307\u9488\u8D70\u7684 D+S1\uFF0C\u5FEB\u6307\u9488\u8D70\u7684\u8DDD\u79BB D+n(S1+S2)+S1\u3002\u5FEB\u6307\u9488\u662F\u6162\u6307\u9488\u7684\u4E24\u500D\u3002\u5E76\u4E14\u5047\u8BBE n \u4E3A 1 \u65F6\uFF0C\u4F1A\u5F97\u5230 D=S2\u3002
\u6240\u4EE5\u5F53\u5728\u7B2C\u4E00\u6B21\u76F8\u9047\u4E4B\u540E\uFF0C\u4ECE\u94FE\u8868\u5934\u90E8\u548C\u76F8\u9047\u70B9\u7EE7\u7EED\u4EE5\u6B65\u901F\u76F8\u540C\u524D\u8FDB\uFF0C\u4E24\u8005\u76F8\u9047\u65F6\u5C31\u662F\u5165\u73AF\u70B9\u3002`,paraId:36,tocIndex:9},{value:`var detectCycle = function (head) {
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
`,paraId:37,tocIndex:9},{value:`\u7ED9\u5B9A\u4E00\u4E2A\u5934\u7ED3\u70B9\u4E3A head \u7684\u975E\u7A7A\u5355\u94FE\u8868\uFF0C\u8FD4\u56DE\u94FE\u8868\u7684\u4E2D\u95F4\u7ED3\u70B9\u3002
\u5982\u679C\u6709\u4E24\u4E2A\u4E2D\u95F4\u7ED3\u70B9\uFF0C\u5219\u8FD4\u56DE\u7B2C\u4E8C\u4E2A\u4E2D\u95F4\u7ED3\u70B9\u3002

\u793A\u4F8B1:
\u8F93\u5165\uFF1A[1,2,3,4,5]
\u8F93\u51FA\uFF1A\u6B64\u5217\u8868\u4E2D\u7684\u7ED3\u70B9 3 (\u5E8F\u5217\u5316\u5F62\u5F0F\uFF1A[3,4,5])
\u8FD4\u56DE\u7684\u7ED3\u70B9\u503C\u4E3A 3 \u3002 (\u6D4B\u8BC4\u7CFB\u7EDF\u5BF9\u8BE5\u7ED3\u70B9\u5E8F\u5217\u5316\u8868\u8FF0\u662F [3,4,5])\u3002
\u6CE8\u610F\uFF0C\u6211\u4EEC\u8FD4\u56DE\u4E86\u4E00\u4E2A ListNode \u7C7B\u578B\u7684\u5BF9\u8C61 ans\uFF0C\u8FD9\u6837\uFF1A
ans.val = 3, ans.next.val = 4, ans.next.next.val = 5, \u4EE5\u53CA ans.next.next.next = NULL.

\u793A\u4F8B2\uFF1A
\u8F93\u5165\uFF1A[1,2,3,4,5,6]
\u8F93\u51FA\uFF1A\u6B64\u5217\u8868\u4E2D\u7684\u7ED3\u70B9 4 (\u5E8F\u5217\u5316\u5F62\u5F0F\uFF1A[4,5,6])
\u7531\u4E8E\u8BE5\u5217\u8868\u6709\u4E24\u4E2A\u4E2D\u95F4\u7ED3\u70B9\uFF0C\u503C\u5206\u522B\u4E3A 3 \u548C 4\uFF0C\u6211\u4EEC\u8FD4\u56DE\u7B2C\u4E8C\u4E2A\u7ED3\u70B9\u3002
`,paraId:38,tocIndex:10},{value:"leetcode",paraId:39,tocIndex:10},{value:"\u5206\u6790\uFF1A\u6309\u7740\u5FEB\u6162\u6307\u9488\u7684\u601D\u8DEF\uFF0C\u6211\u4EEC\u8BBE\u7F6E fast \u6307\u9488\u7684\u901F\u5EA6\u662F slow \u6307\u9488\u7684 2 \u500D\uFF0C\u5F53 fast \u6216\u8005 fast.next \u4E3A null \u7684\u65F6\u5019\uFF0Cfast \u4E5F\u5DF2\u7ECF\u5230\u4E86\u94FE\u8868\u672B\u7AEF\uFF0Cslow \u901F\u5EA6\u662F\u4ED6\u7684\u4E00\u534A\uFF0C\u6240\u4EE5\u6307\u5411\u4E2D\u95F4\u8282\u70B9\u3002",paraId:40,tocIndex:10},{value:`var middleNode = function (head) {
  let slow = head;
  let fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
};
`,paraId:41,tocIndex:10},{value:`\u7ED9\u5B9A\u4E00\u4E2A\u94FE\u8868\uFF0C\u5220\u9664\u94FE\u8868\u7684\u5012\u6570\u7B2C\xA0n\xA0\u4E2A\u8282\u70B9\uFF0C\u5E76\u4E14\u8FD4\u56DE\u94FE\u8868\u7684\u5934\u7ED3\u70B9\u3002

\u793A\u4F8B\uFF1A
\u7ED9\u5B9A\u4E00\u4E2A\u94FE\u8868: 1->2->3->4->5, \u548C n = 2.
\u5F53\u5220\u9664\u4E86\u5012\u6570\u7B2C\u4E8C\u4E2A\u8282\u70B9\u540E\uFF0C\u94FE\u8868\u53D8\u4E3A 1->2->3->5.
`,paraId:42,tocIndex:11},{value:"leetcode",paraId:43,tocIndex:11},{value:"\u91C7\u7528\u5FEB\u6162\u6307\u9488\u3002\u4F7F\u5F97 fast \u5728 slow \u524D\u7684 n \u4E2A\u4F4D\u7F6E\uFF0C\u5F53 fast \u5230\u8FBE\u94FE\u8868\u5C3E\u8282\u70B9\u65F6\uFF0Cslow.next \u6307\u5411\u5F53\u524D\u9700\u5220\u9664\u7684\u8282\u70B9\u3002",paraId:44,tocIndex:11},{value:`var removeNthFromEnd = function (head, n) {
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
`,paraId:45,tocIndex:11},{value:`\u53CC\u6307\u9488\u4E00\u822C\u662F\u5728\u6570\u7EC4\u4E2D\u6307\u4E24\u4E2A\u7D22\u5F15\u503C\uFF0C\u521D\u59CB\u5316\u4E3A left=0,right=length-1\u3002
\u4E24\u4E2A\u6307\u9488\u671D\u7740\u5DE6\u53F3\u65B9\u5411\u79FB\u52A8\uFF0C\u76F4\u5230\u6709\u4E00\u4E2A\u6216\u8005\u4E24\u4E2A\u6EE1\u8DB3\u6761\u4EF6\u3002
\u5DE6\u53F3\u6307\u9488\u901A\u5E38\u7528\u5728\u6392\u597D\u987A\u5E8F\u7684\u6570\u7EC4/\u94FE\u8868\u4E2D\u5BFB\u627E\u5BF9\u5B50\u3002`,paraId:46,tocIndex:12},{value:"\u8BC6\u522B\u4F7F\u7528\u53CC\u6307\u9488\u7684\u62DB\u6570\uFF1A",paraId:47,tocIndex:12},{value:"\u4E00\u822C\u6765\u8BF4\uFF0C\u6570\u7EC4\u6216\u662F\u94FE\u8868\u662F\u6392\u597D\u5E8F\u7684\uFF0C\u4F60\u5F97\u5728\u91CC\u5934\u627E\u4E00\u4E9B\u7EC4\u5408\u6EE1\u8DB3\u67D0\u79CD\u9650\u5236\u6761\u4EF6",paraId:48,tocIndex:12},{value:"\u8FD9\u79CD\u7EC4\u5408\u53EF\u80FD\u662F\u4E00\u5BF9\u6570\uFF0C\u4E09\u4E2A\u6570\uFF0C\u6216\u662F\u4E00\u4E2A\u5B50\u6570\u7EC4",paraId:48,tocIndex:12},{value:`\u7ED9\u5B9A\u4E00\u4E2A\u5DF2\u6309\u7167\u5347\u5E8F\u6392\u5217 \xA0 \u7684\u6709\u5E8F\u6570\u7EC4\uFF0C\u627E\u5230\u4E24\u4E2A\u6570\u4F7F\u5F97\u5B83\u4EEC\u76F8\u52A0\u4E4B\u548C\u7B49\u4E8E\u76EE\u6807\u6570\u3002

\u51FD\u6570\u5E94\u8BE5\u8FD4\u56DE\u8FD9\u4E24\u4E2A\u4E0B\u6807\u503C index1 \u548C index2\uFF0C\u5176\u4E2D index1\xA0 \u5FC5\u987B\u5C0F\u4E8E \xA0index2\u3002

\u8BF4\u660E:
1. \u8FD4\u56DE\u7684\u4E0B\u6807\u503C\uFF08index1 \u548C index2\uFF09\u4E0D\u662F\u4ECE\u96F6\u5F00\u59CB\u7684\u3002
2. \u4F60\u53EF\u4EE5\u5047\u8BBE\u6BCF\u4E2A\u8F93\u5165\u53EA\u5BF9\u5E94\u552F\u4E00\u7684\u7B54\u6848\uFF0C\u800C\u4E14\u4F60\u4E0D\u53EF\u4EE5\u91CD\u590D\u4F7F\u7528\u76F8\u540C\u7684\u5143\u7D20\u3002

\u793A\u4F8B:
\u8F93\u5165: numbers = [2, 7, 11, 15], target = 9
\u8F93\u51FA: [1,2]
\u89E3\u91CA: 2 \u4E0E 7 \u4E4B\u548C\u7B49\u4E8E\u76EE\u6807\u6570 9 \u3002\u56E0\u6B64 index1 = 1, index2 = 2 \u3002
`,paraId:49,tocIndex:13},{value:"LeetCode",paraId:50,tocIndex:13},{value:"\u5206\u6790\uFF1A\u4F7F\u7528\u5DE6\u53F3\u6307\u9488\uFF0C\u8BA9\u6570\u7EC4\u5DE6\u53F3\u7684\u6570\u7EC4\u76F8\u52A0\u548C target \u5BF9\u6BD4\uFF0C\u5982\u679C\u5927\u4E8E target \u79FB\u52A8\u53F3\u6307\u9488\uFF0C\u5C0F\u4E8E target \u79FB\u52A8\u5DE6\u6307\u9488\uFF0C\u7B49\u4E8E\u5219\u8FD4\u56DE\u5F53\u524D left/right\u3002",paraId:51,tocIndex:13},{value:`var twoSum = function (numbers, target) {
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
`,paraId:52,tocIndex:13},{value:`\u7ED9\u5B9A\u4E00\u4E2A\u6392\u5E8F\u6570\u7EC4\uFF0C\u4F60\u9700\u8981\u5728 \u539F\u5730 \u5220\u9664\u91CD\u590D\u51FA\u73B0\u7684\u5143\u7D20\uFF0C\u4F7F\u5F97\u6BCF\u4E2A\u5143\u7D20\u53EA\u51FA\u73B0\u4E00\u6B21\uFF0C\u8FD4\u56DE\u79FB\u9664\u540E\u6570\u7EC4\u7684\u65B0\u957F\u5EA6\u3002

\u4E0D\u8981\u4F7F\u7528\u989D\u5916\u7684\u6570\u7EC4\u7A7A\u95F4\uFF0C\u4F60\u5FC5\u987B\u5728 \u539F\u5730 \u4FEE\u6539\u8F93\u5165\u6570\u7EC4 \u5E76\u5728\u4F7F\u7528 O(1) \u989D\u5916\u7A7A\u95F4\u7684\u6761\u4EF6\u4E0B\u5B8C\u6210\u3002

\u793A\u4F8B \xA01:
\u7ED9\u5B9A\u6570\u7EC4 nums = [1,1,2],
\u51FD\u6570\u5E94\u8BE5\u8FD4\u56DE\u65B0\u7684\u957F\u5EA6 2, \u5E76\u4E14\u539F\u6570\u7EC4 nums \u7684\u524D\u4E24\u4E2A\u5143\u7D20\u88AB\u4FEE\u6539\u4E3A 1, 2\u3002
\u4F60\u4E0D\u9700\u8981\u8003\u8651\u6570\u7EC4\u4E2D\u8D85\u51FA\u65B0\u957F\u5EA6\u540E\u9762\u7684\u5143\u7D20\u3002

\u793A\u4F8B \xA02:
\u7ED9\u5B9A nums = [0,0,1,1,1,2,2,3,3,4],
\u51FD\u6570\u5E94\u8BE5\u8FD4\u56DE\u65B0\u7684\u957F\u5EA6 5, \u5E76\u4E14\u539F\u6570\u7EC4 nums \u7684\u524D\u4E94\u4E2A\u5143\u7D20\u88AB\u4FEE\u6539\u4E3A 0, 1, 2, 3, 4\u3002
\u4F60\u4E0D\u9700\u8981\u8003\u8651\u6570\u7EC4\u4E2D\u8D85\u51FA\u65B0\u957F\u5EA6\u540E\u9762\u7684\u5143\u7D20\u3002
`,paraId:53,tocIndex:14},{value:"LeetCode",paraId:54,tocIndex:14},{value:"\u5206\u6790\uFF1A\u4F7F\u7528\u53CC\u6307\u9488 slow \u548C fast\uFF0C\u53EA\u8981 nums[slow]===nums[fast]\u6211\u4EEC\u5C31\u589E\u52A0 fast \u7684\u503C\uFF0C\u8DF3\u8FC7\u91CD\u590D\u9879\uFF0C\u5F53 nums[slow]!=nums[fast]\u65F6\uFF0C\u91CD\u590D\u9879\u5DF2\u7ECF\u7ED3\u675F\u3002\u628A\u5F53\u524D fast \u5BF9\u5E94\u7684\u503C\u590D\u5236\u5230 slow\uFF0C\u4F7F\u5F97[0,slow]\u5747\u4E3A\u4E0D\u91CD\u590D\u6570\u5B57\u3002",paraId:55,tocIndex:14},{value:`var removeDuplicates = function (nums) {
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
`,paraId:56,tocIndex:14},{value:`\u7ED9\u5B9A\u4E00\u4E2A\u6309\u975E\u9012\u51CF\u987A\u5E8F\u6392\u5E8F\u7684\u6574\u6570\u6570\u7EC4 A\uFF0C\u8FD4\u56DE\u6BCF\u4E2A\u6570\u5B57\u7684\u5E73\u65B9\u7EC4\u6210\u7684\u65B0\u6570\u7EC4\uFF0C\u8981\u6C42\u4E5F\u6309\u975E\u9012\u51CF\u987A\u5E8F\u6392\u5E8F\u3002

\u793A\u4F8B 1\uFF1A
\u8F93\u5165\uFF1A[-4,-1,0,3,10]
\u8F93\u51FA\uFF1A[0,1,9,16,100]

\u793A\u4F8B 2\uFF1A
\u8F93\u5165\uFF1A[-7,-3,2,3,11]
\u8F93\u51FA\uFF1A[4,9,9,49,121]
`,paraId:57,tocIndex:15},{value:"LeetCode",paraId:58,tocIndex:15},{value:"\u5206\u6790\uFF1A\u6570\u7EC4\u662F\u6709\u5E8F\u7684\uFF0C\u6570\u7EC4\u5E73\u65B9\u6700\u5927\u503C\u5C31\u5728\u6570\u7EC4\u7684\u4E24\u7AEF\uFF0C\u4F46\u662F\u53EF\u80FD\u5B58\u5728\u8D1F\u6570\u5E73\u65B9\u4E4B\u540E\u6210\u4E3A\u6700\u5927\u6570\u3002\u91C7\u53D6\u5DE6\u53F3\u6307\u9488\uFF0C\u4ECE\u4E24\u8FB9\u5F80\u4E2D\u95F4\u6BD4\u8F83\uFF0C\u4F9D\u6B21\u653E\u5165 res\u3002",paraId:59,tocIndex:15},{value:`var sortedSquares = function (nums) {
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
`,paraId:60,tocIndex:15},{value:`\u7ED9\u4F60\u4E00\u4E2A\u5305\u542B n \u4E2A\u6574\u6570\u7684\u6570\u7EC4 \xA0nums\uFF0C\u5224\u65AD \xA0nums\xA0 \u4E2D\u662F\u5426\u5B58\u5728\u4E09\u4E2A\u5143\u7D20 a\uFF0Cb\uFF0Cc \uFF0C\u4F7F\u5F97 \xA0a + b + c = 0 \uFF1F\u8BF7\u4F60\u627E\u51FA\u6240\u6709\u6EE1\u8DB3\u6761\u4EF6\u4E14\u4E0D\u91CD\u590D\u7684\u4E09\u5143\u7EC4\u3002

\u6CE8\u610F\uFF1A\u7B54\u6848\u4E2D\u4E0D\u53EF\u4EE5\u5305\u542B\u91CD\u590D\u7684\u4E09\u5143\u7EC4\u3002

\u793A\u4F8B\uFF1A
\u7ED9\u5B9A\u6570\u7EC4 nums = [-1, 0, 1, 2, -1, -4]\uFF0C
\u6EE1\u8DB3\u8981\u6C42\u7684\u4E09\u5143\u7EC4\u96C6\u5408\u4E3A\uFF1A
[
  [-1, 0, 1],
  [-1, -1, 2]
]
`,paraId:61,tocIndex:16},{value:"LeetCode",paraId:62,tocIndex:16},{value:"\u5206\u6790\uFF1A\u4E09\u6570\u4E4B\u548C\u4E3A 0\uFF0C\u53EF\u4EE5\u8F6C\u6362\u4E3A\u4E24\u6570\u4E4B\u548C\u4E3A target \u8FD9\u89E3\u9898\u601D\u8DEF\u3002\u4F46\u662F\u503C\u5F97\u6CE8\u610F\u7684\u662F\u7B54\u6848\u4E2D\u4E0D\u5305\u542B\u91CD\u590D\u7684\u4E09\u5143\u7EC4\uFF0C\u56E0\u6B64\u9700\u8981\u5BF9\u4E00\u4E9B\u6570\u636E\u505A\u5904\u7406\u3002\u5728 nums[i]\u627E\u5230\u7B2C\u4E00\u4E2A\u5339\u914D\u4E4B\u540E\uFF0C\u9700\u8981\u7EE7\u7EED\u5339\u914D\u5269\u4E0B\u6570\u5B57\u4E14\u4E0D\u91CD\u590D\uFF0C\u6240\u4EE5\u9700\u8981\u548C\u5F53\u524D start \u548C end \u503C\u8FDB\u884C\u6BD4\u8F83\uFF0C\u505A\u51FA\u5BF9\u5E94\u7684\u5904\u7406\u3002",paraId:63,tocIndex:16},{value:`var threeSum = function (nums) {
  const ans = [];
  const length = nums.length;
  if (nums === null || length < 3) return ans;
  nums = nums.sort((a, b) => a - b); //\u5148\u5BF9\u6570\u7EC4\u6392\u5E8F
  for (let i = 0; i < length; i++) {
    if (nums[i] > 0) break; //\u5982\u679C\u5F53\u524D\u6570\u636E\u5927\u4E8E0\uFF0C\u5219\u540E\u7EED\u5747\u5927\u4E8E0\uFF0C\u4E0D\u4F1A\u51FA\u73B0\u7B49\u4E8E0\u73B0\u8C61
    if (i > 0 && nums[i] === nums[i - 1]) {
      //\u5982\u679C\u76F8\u90BB\u4E24\u4E2A\u6570\u5B57\u4E00\u6837\uFF0C\u8DF3\u8FC7
      continue;
    }
    let start = i + 1;
    let end = length - 1;
    //\u6C42\u89E3\u4E24\u6570\u4E4B\u548C\u7684\u601D\u8DEF
    while (start < end) {
      const sum = nums[i] + nums[start] + nums[end];
      if (sum === 0) {
        ans.push([nums[i], nums[start], nums[end]]);
        //\u8DF3\u8FC7\u5DF2\u7ECF\u6EE1\u8DB3\u6761\u4EF6\u7684start\u548Cend\u503C\uFF0C\u6EE1\u8DB3\u4E0D\u91CD\u590D\u6761\u4EF6
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
`,paraId:64,tocIndex:16},{value:`\u7ED9\u5B9A\u4E00\u4E2A\u5305\u62EC n \u4E2A\u6574\u6570\u7684\u6570\u7EC4 nums \u548C \u4E00\u4E2A\u76EE\u6807\u503C target\u3002\u627E\u51FA nums \u4E2D\u7684\u4E09\u4E2A\u6574\u6570\uFF0C\u4F7F\u5F97\u5B83\u4EEC\u7684\u548C\u4E0E target \u6700\u63A5\u8FD1\u3002\u8FD4\u56DE\u8FD9\u4E09\u4E2A\u6570\u7684\u548C\u3002\u5047\u5B9A\u6BCF\u7EC4\u8F93\u5165\u53EA\u5B58\u5728\u552F\u4E00\u7B54\u6848\u3002

\u793A\u4F8B\uFF1A
\u8F93\u5165\uFF1Anums = [-1,2,1,-4], target = 1
\u8F93\u51FA\uFF1A2
\u89E3\u91CA\uFF1A\u4E0E target \u6700\u63A5\u8FD1\u7684\u548C\u662F 2 (-1 + 2 + 1 = 2) \u3002
`,paraId:65,tocIndex:17},{value:"Leetcode",paraId:66,tocIndex:17},{value:"\u5206\u6790\uFF1A\u4E0E\u4E0A\u4E00\u9898\u5927\u81F4\u76F8\u540C\uFF0C\u5C3D\u5728\u5904\u7406 target \u7684\u65F6\u5019\u4E0D\u540C\u3002",paraId:67,tocIndex:17},{value:`var threeSumClosest = function (nums, target) {
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
`,paraId:68,tocIndex:17},{value:`\u7ED9\u5B9A\u4E00\u4E2A\u6B63\u6574\u6570\u6570\u7EC4 \xA0nums\u3002

\u627E\u51FA\u8BE5\u6570\u7EC4\u5185\u4E58\u79EF\u5C0F\u4E8E \xA0k\xA0 \u7684\u8FDE\u7EED\u7684\u5B50\u6570\u7EC4\u7684\u4E2A\u6570\u3002

\u793A\u4F8B 1:
\u8F93\u5165: nums = [10,5,2,6], k = 100
\u8F93\u51FA: 8
\u89E3\u91CA: 8\u4E2A\u4E58\u79EF\u5C0F\u4E8E100\u7684\u5B50\u6570\u7EC4\u5206\u522B\u4E3A: [10], [5], [2], [6], [10,5], [5,2], [2,6], [5,2,6]\u3002
\u9700\u8981\u6CE8\u610F\u7684\u662F [10,5,2] \u5E76\u4E0D\u662F\u4E58\u79EF\u5C0F\u4E8E100\u7684\u5B50\u6570\u7EC4\u3002
`,paraId:69,tocIndex:18},{value:"LeetCode",paraId:70,tocIndex:18},{value:"\u5206\u6790\uFF1A\u8FDE\u7EED\u7684\u5B50\u6570\u7EC4\uFF0C\u6240\u4EE5\u91C7\u53D6\u7D2F\u79EF\u4E58\u6CD5\uFF0Cleft \u4E3A\u5B50\u6570\u7EC4\u5F00\u5934\uFF0Cright \u4E3A\u672B\u5C3E\uFF0C\u6EE1\u8DB3\u6761\u4EF6\u65F6\uFF0Cright-left+1 \u5C31\u4E3A\u65B0\u589E\u7684\u6EE1\u8DB3\u6761\u4EF6\u7684\u503C\uFF0Cright \u53F3\u79FB\u3002\u5982\u679C\u4E0D\u6EE1\u8DB3\u6761\u4EF6\uFF0C\u5219 left \u5DE6\u79FB\u3002",paraId:71,tocIndex:18},{value:`var numSubarrayProductLessThanK = function (nums, k) {
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
`,paraId:72,tocIndex:18},{value:`\u533A\u95F4\u7684\u5F88\u591A\u95EE\u9898\u4E2D\uFF0C\u901A\u5E38\u9700\u8981\u5224\u65AD\u662F\u5426\u6709\u91CD\u53E0\uFF0C\u8981\u4E48\u5408\u5E76\u533A\u95F4\u3002
\u5BF9\u4E8E\u7ED9\u5B9A\u7684\u4E24\u4E2A\u533A\u95F4 a\uFF0Cb \u6765\u8BF4\uFF0C\u53EF\u80FD\u5B58\u5728\u4E09\u79CD\u60C5\u51B5--\u8986\u76D6/\u4EA4\u53C9(\u53EF\u5408\u5E76\u6210\u4E00\u4E2A\u5927\u533A\u95F4)/\u4E0D\u76F8\u4EA4\u3002`,paraId:73,tocIndex:19},{value:"\u6280\u5DE7:",paraId:74,tocIndex:19},{value:"\u6392\u5E8F\uFF1A\u6309\u7740\u533A\u95F4\u8D77\u70B9\u5347\u5E8F\u6392\u5217\uFF0C\u8D77\u70B9\u76F8\u540C\uFF0C\u5219\u6309\u7740\u7EC8\u70B9\u964D\u5E8F\u6392\u5217\u3002",paraId:75,tocIndex:19},{value:"\u753B\u56FE\uFF1A\u5C06\u533A\u95F4\u7684\u76F8\u5BF9\u4F4D\u7F6E\u7F57\u5217\u51FA\u6765\u3002",paraId:75,tocIndex:19},{value:"\u8BC6\u522B\uFF1A",paraId:76,tocIndex:19},{value:"\u5F53\u4F60\u9700\u8981\u4EA7\u751F\u4E00\u5806\u76F8\u4E92\u4E4B\u95F4\u6CA1\u6709\u4EA4\u96C6\u7684\u533A\u95F4\u7684\u65F6\u5019",paraId:77,tocIndex:19},{value:"\u5F53\u4F60\u542C\u5230\u91CD\u53E0\u533A\u95F4\u7684\u65F6\u5019",paraId:77,tocIndex:19},{value:`\u8FD8\u6709\u4E00\u7C7B\u533A\u95F4\u95EE\u9898\u662F\u8C03\u5EA6\u95EE\u9898\uFF0C\u8BBE\u8BA1\u7B97\u6CD5\u6C42\u5F97\u533A\u95F4\u5185\u6700\u591A\u51E0\u4E2A\u4E92\u4E0D\u76F8\u4EA4\u7684\u533A\u95F4\u3002
\u6280\u5DE7\uFF1A`,paraId:78,tocIndex:19},{value:"\u6309\u533A\u95F4\u7EC8\u70B9\u5347\u5E8F\u6392\u5217\u3002",paraId:79,tocIndex:19},{value:"\u524D\u4E00\u9879\u7684 end<\u540E\u4E00\u9879\u7684 start\uFF0C\u5219\u4E0D\u5B58\u5728\u76F8\u4EA4\u3002",paraId:79,tocIndex:19},{value:`\u7ED9\u4F60\u4E00\u4E2A\u533A\u95F4\u5217\u8868\uFF0C\u8BF7\u4F60\u5220\u9664\u5217\u8868\u4E2D\u88AB\u5176\u4ED6\u533A\u95F4\u6240\u8986\u76D6\u7684\u533A\u95F4\u3002
\u53EA\u6709\u5F53\xA0c <= a\xA0\u4E14\xA0b <= d\xA0\u65F6\uFF0C\u6211\u4EEC\u624D\u8BA4\u4E3A\u533A\u95F4\xA0[a,b) \u88AB\u533A\u95F4\xA0[c,d) \u8986\u76D6\u3002
\u5728\u5B8C\u6210\u6240\u6709\u5220\u9664\u64CD\u4F5C\u540E\uFF0C\u8BF7\u4F60\u8FD4\u56DE\u5217\u8868\u4E2D\u5269\u4F59\u533A\u95F4\u7684\u6570\u76EE\u3002

\u793A\u4F8B\uFF1A
\u8F93\u5165\uFF1Aintervals = [[1,4],[3,6],[2,8]]
\u8F93\u51FA\uFF1A2
\u89E3\u91CA\uFF1A\u533A\u95F4 [3,6] \u88AB\u533A\u95F4 [2,8] \u8986\u76D6\uFF0C\u6240\u4EE5\u5B83\u88AB\u5220\u9664\u4E86\u3002
`,paraId:80,tocIndex:20},{value:"LeetCode",paraId:81,tocIndex:20},{value:"\u5206\u6790\uFF1A",paraId:82,tocIndex:20},{value:`var removeCoveredIntervals = function (intervals) {
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
`,paraId:83,tocIndex:20},{value:`\u7ED9\u51FA\u4E00\u4E2A\u533A\u95F4\u7684\u96C6\u5408\uFF0C\u8BF7\u5408\u5E76\u6240\u6709\u91CD\u53E0\u7684\u533A\u95F4\u3002

\u793A\u4F8B 1:
\u8F93\u5165: intervals = [[1,3],[2,6],[8,10],[15,18]]
\u8F93\u51FA: [[1,6],[8,10],[15,18]]
\u89E3\u91CA: \u533A\u95F4 [1,3] \u548C [2,6] \u91CD\u53E0, \u5C06\u5B83\u4EEC\u5408\u5E76\u4E3A [1,6].

\u793A\u4F8B 2:
\u8F93\u5165: intervals = [[1,4],[4,5]]
\u8F93\u51FA: [[1,5]]
\u89E3\u91CA: \u533A\u95F4 [1,4] \u548C [4,5] \u53EF\u88AB\u89C6\u4E3A\u91CD\u53E0\u533A\u95F4\u3002
`,paraId:84,tocIndex:21},{value:"Leetcode",paraId:85,tocIndex:21},{value:"\u5206\u6790\uFF1A\u5148\u6392\u5E8F\u3002\u5206\u6790\u5F97\u5230\u540E\u4E00\u9879\u7684\u5DE6\u8FB9\u754C<=\u524D\u4E00\u9879\u7684\u53F3\u8FB9\u754C\u4E14\u540E\u4E00\u9879\u7684\u53F3\u8FB9\u754C>\u524D\u4E00\u9879\u7684\u53F3\u8FB9\u754C\uFF0C\u4E24\u8005\u76F8\u4EA4\uFF0C\u9700\u8981\u628A\u524D\u4E00\u9879\u7684\u53F3\u8FB9\u754C\u66F4\u65B0\u3002\u5982\u679C\u4E24\u8005\u4E0D\u76F8\u4EA4\uFF0C\u76F4\u63A5\u653E\u5165\u7ED3\u679C\u503C\u3002",paraId:86,tocIndex:21},{value:`var merge = function (intervals) {
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
`,paraId:87,tocIndex:21},{value:`\u7ED9\u5B9A\u4E24\u4E2A\u7531\u4E00\u4E9B \u95ED\u533A\u95F4 \u7EC4\u6210\u7684\u5217\u8868\uFF0C\u6BCF\u4E2A\u533A\u95F4\u5217\u8868\u90FD\u662F\u6210\u5BF9\u4E0D\u76F8\u4EA4\u7684\uFF0C\u5E76\u4E14\u5DF2\u7ECF\u6392\u5E8F\u3002
\u8FD4\u56DE\u8FD9\u4E24\u4E2A\u533A\u95F4\u5217\u8868\u7684\u4EA4\u96C6\u3002
\uFF08\u5F62\u5F0F\u4E0A\uFF0C\u95ED\u533A\u95F4\xA0[a, b]\uFF08\u5176\u4E2D\xA0a <= b\uFF09\u8868\u793A\u5B9E\u6570\xA0x\xA0\u7684\u96C6\u5408\uFF0C\u800C\xA0a <= x <= b\u3002\u4E24\u4E2A\u95ED\u533A\u95F4\u7684\u4EA4\u96C6\u662F\u4E00\u7EC4\u5B9E\u6570\uFF0C\u8981\u4E48\u4E3A\u7A7A\u96C6\uFF0C\u8981\u4E48\u4E3A\u95ED\u533A\u95F4\u3002\u4F8B\u5982\uFF0C[1, 3] \u548C [2, 4] \u7684\u4EA4\u96C6\u4E3A [2, 3]\u3002\uFF09
\u793A\u4F8B\uFF1A

\u8F93\u5165\uFF1AA = [[0,2],[5,10],[13,23],[24,25]], B = [[1,5],[8,12],[15,24],[25,26]]
\u8F93\u51FA\uFF1A[[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]
\u8457\u4F5C\u6743\u5F52\u9886\u6263\u7F51\u7EDC\u6240\u6709\u3002\u5546\u4E1A\u8F6C\u8F7D\u8BF7\u8054\u7CFB\u5B98\u65B9\u6388\u6743\uFF0C\u975E\u5546\u4E1A\u8F6C\u8F7D\u8BF7\u6CE8\u660E\u51FA\u5904\u3002
`,paraId:88,tocIndex:22},{value:"LeetCode",paraId:89,tocIndex:22},{value:"\u5206\u6790\uFF1A\u5BF9\u4E8E\u4E00\u7EC4\u6570\u636E\uFF0C\u8981\u627E\u4EA4\u96C6\u5217\u8868\uFF0C\u4EA4\u96C6\u7684 start \u662F\u4E24\u4E2A\u6570\u7EC4\u4E2D\u8F83\u5927\u7684\u5DE6\u8FB9\u754C(\u7EA2\u7EBF)\uFF0C\u4EA4\u96C6\u7684 end \u662F\u4E24\u4E2A\u6570\u7EC4\u4E2D\u8F83\u5C0F\u7684\u53F3\u8FB9\u754C(\u7EFF\u7EBF)\u3002\u5982\u679C start<=end\uFF0C\u5373\u6709\u4EA4\u96C6[start,end]\u3002\u53F3\u8FB9\u754C\u8F83\u5C0F\u7684\u533A\u95F4 point \u5411\u4E0B\u4E00\u4E2A\u533A\u95F4\u79FB\u52A8\u3002",paraId:90,tocIndex:22},{value:`var intervalIntersection = function (A, B) {
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
`,paraId:91,tocIndex:22},{value:`\u7ED9\u51FA\u4E00\u4E2A\u65E0\u91CD\u53E0\u7684 \uFF0C\u6309\u7167\u533A\u95F4\u8D77\u59CB\u7AEF\u70B9\u6392\u5E8F\u7684\u533A\u95F4\u5217\u8868\u3002
\u5728\u5217\u8868\u4E2D\u63D2\u5165\u4E00\u4E2A\u65B0\u7684\u533A\u95F4\uFF0C\u4F60\u9700\u8981\u786E\u4FDD\u5217\u8868\u4E2D\u7684\u533A\u95F4\u4ECD\u7136\u6709\u5E8F\u4E14\u4E0D\u91CD\u53E0\uFF08\u5982\u679C\u6709\u5FC5\u8981\u7684\u8BDD\uFF0C\u53EF\u4EE5\u5408\u5E76\u533A\u95F4\uFF09\u3002

\u793A\u4F8B \xA01\uFF1A
\u8F93\u5165\uFF1Aintervals = [[1,3],[6,9]], newInterval = [2,5]
\u8F93\u51FA\uFF1A[[1,5],[6,9]]

\u793A\u4F8B \xA02\uFF1A
\u8F93\u5165\uFF1Aintervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
\u8F93\u51FA\uFF1A[[1,2],[3,10],[12,16]]
\u89E3\u91CA\uFF1A\u8FD9\u662F\u56E0\u4E3A\u65B0\u7684\u533A\u95F4 [4,8] \u4E0E [3,5],[6,7],[8,10]\xA0 \u91CD\u53E0\u3002
`,paraId:92,tocIndex:23},{value:"LeetCode",paraId:93,tocIndex:23},{value:"\u5206\u6790 1\uFF1A\u628A newIntervals \u653E\u5165 intervals \u4E2D\u518D\u6B21\u6392\u5E8F\uFF0C\u7136\u540E\u5408\u5E76\u533A\u95F4\u3002",paraId:94,tocIndex:23},{value:`var insert = function (intervals, newInterval) {
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
`,paraId:95,tocIndex:23},{value:"\u5206\u6790 2\uFF1A\u5148\u628A\u5C0F\u4E8E newIntervals[0]\u7684\u533A\u95F4\u653E\u5165\u7ED3\u679C\u503C\uFF1B\u7136\u540E\u5408\u5E76\u76F8\u4EA4\u533A\u95F4\uFF0C\u653E\u5165\u7ED3\u679C\u503C\uFF1B\u628A\u5927\u4E8E newIntervals[1]\u7684\u533A\u95F4\u653E\u5165\u7ED3\u679C\u503C\u3002",paraId:96,tocIndex:23},{value:`var insert = function (intervals, newInterval) {
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
`,paraId:97,tocIndex:23},{value:`\u7ED9\u5B9A\u4E00\u4E2A\u533A\u95F4\u7684\u96C6\u5408\uFF0C\u627E\u5230\u9700\u8981\u79FB\u9664\u533A\u95F4\u7684\u6700\u5C0F\u6570\u91CF\uFF0C\u4F7F\u5269\u4F59\u533A\u95F4\u4E92\u4E0D\u91CD\u53E0\u3002

\u6CE8\u610F:

\u53EF\u4EE5\u8BA4\u4E3A\u533A\u95F4\u7684\u7EC8\u70B9\u603B\u662F\u5927\u4E8E\u5B83\u7684\u8D77\u70B9\u3002
\u533A\u95F4 [1,2] \u548C [2,3] \u7684\u8FB9\u754C\u76F8\u4E92\u201C\u63A5\u89E6\u201D\uFF0C\u4F46\u6CA1\u6709\u76F8\u4E92\u91CD\u53E0\u3002

\u793A\u4F8B 1:
\u8F93\u5165: [ [1,2], [2,3], [3,4], [1,3] ]
\u8F93\u51FA: 1
\u89E3\u91CA: \u79FB\u9664 [1,3] \u540E\uFF0C\u5269\u4E0B\u7684\u533A\u95F4\u6CA1\u6709\u91CD\u53E0\u3002

\u793A\u4F8B 2:
\u8F93\u5165: [ [1,2], [1,2], [1,2] ]
\u8F93\u51FA: 2
\u89E3\u91CA: \u4F60\u9700\u8981\u79FB\u9664\u4E24\u4E2A [1,2] \u6765\u4F7F\u5269\u4E0B\u7684\u533A\u95F4\u6CA1\u6709\u91CD\u53E0\u3002

\u793A\u4F8B 3:
\u8F93\u5165: [ [1,2], [2,3] ]
\u8F93\u51FA: 0
\u89E3\u91CA: \u4F60\u4E0D\u9700\u8981\u79FB\u9664\u4EFB\u4F55\u533A\u95F4\uFF0C\u56E0\u4E3A\u5B83\u4EEC\u5DF2\u7ECF\u662F\u65E0\u91CD\u53E0\u7684\u4E86\u3002
`,paraId:98,tocIndex:24},{value:"LeetCode",paraId:99,tocIndex:24},{value:`
\u5206\u6790\uFF1A\u6839\u636E\u4E0A\u8FF0\u601D\u8DEF\uFF0C\u5148\u6309\u7740\u7EC8\u70B9\u5347\u5E8F\u6392\u5217\u3002\u4F9D\u6B21\u6BD4\u8F83\u524D\u4E00\u9879\u7684 end \u548C\u540E\u4E00\u9879\u7684 start\uFF0C\u82E5 start>end \u5219\u4E0D\u76F8\u4EA4\u3002\u6C42\u5F97\u4E0D\u76F8\u4EA4\u7684\u533A\u95F4 acount\uFF0C\u518D\u7528\u6570\u7EC4\u957F\u5EA6 n-count \u5C31\u5F97\u5230\u9700\u8981\u79FB\u9664\u7684\u4E2A\u6570\u3002`,paraId:99,tocIndex:24},{value:`var eraseOverlapIntervals = function (intervals) {
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
`,paraId:100,tocIndex:24},{value:`\u5728\u4E8C\u7EF4\u7A7A\u95F4\u4E2D\u6709\u8BB8\u591A\u7403\u5F62\u7684\u6C14\u7403\u3002\u5BF9\u4E8E\u6BCF\u4E2A\u6C14\u7403\uFF0C\u63D0\u4F9B\u7684\u8F93\u5165\u662F\u6C34\u5E73\u65B9\u5411\u4E0A\uFF0C\u6C14\u7403\u76F4\u5F84\u7684\u5F00\u59CB\u548C\u7ED3\u675F\u5750\u6807\u3002\u7531\u4E8E\u5B83\u662F\u6C34\u5E73\u7684\uFF0C\u6240\u4EE5\u7EB5\u5750\u6807\u5E76\u4E0D\u91CD\u8981\uFF0C\u56E0\u6B64\u53EA\u8981\u77E5\u9053\u5F00\u59CB\u548C\u7ED3\u675F\u7684\u6A2A\u5750\u6807\u5C31\u8DB3\u591F\u4E86\u3002\u5F00\u59CB\u5750\u6807\u603B\u662F\u5C0F\u4E8E\u7ED3\u675F\u5750\u6807\u3002

\u4E00\u652F\u5F13\u7BAD\u53EF\u4EE5\u6CBF\u7740 x \u8F74\u4ECE\u4E0D\u540C\u70B9\u5B8C\u5168\u5782\u76F4\u5730\u5C04\u51FA\u3002\u5728\u5750\u6807 x \u5904\u5C04\u51FA\u4E00\u652F\u7BAD\uFF0C\u82E5\u6709\u4E00\u4E2A\u6C14\u7403\u7684\u76F4\u5F84\u7684\u5F00\u59CB\u548C\u7ED3\u675F\u5750\u6807\u4E3A xstart\uFF0Cxend\uFF0C \u4E14\u6EE1\u8DB3 \xA0xstart\xA0\u2264 x \u2264 xend\uFF0C\u5219\u8BE5\u6C14\u7403\u4F1A\u88AB\u5F15\u7206\u3002\u53EF\u4EE5\u5C04\u51FA\u7684\u5F13\u7BAD\u7684\u6570\u91CF\u6CA1\u6709\u9650\u5236\u3002 \u5F13\u7BAD\u4E00\u65E6\u88AB\u5C04\u51FA\u4E4B\u540E\uFF0C\u53EF\u4EE5\u65E0\u9650\u5730\u524D\u8FDB\u3002\u6211\u4EEC\u60F3\u627E\u5230\u4F7F\u5F97\u6240\u6709\u6C14\u7403\u5168\u90E8\u88AB\u5F15\u7206\uFF0C\u6240\u9700\u7684\u5F13\u7BAD\u7684\u6700\u5C0F\u6570\u91CF\u3002

\u7ED9\u4F60\u4E00\u4E2A\u6570\u7EC4 points \uFF0C\u5176\u4E2D points [i] = [xstart,xend] \uFF0C\u8FD4\u56DE\u5F15\u7206\u6240\u6709\u6C14\u7403\u6240\u5FC5\u987B\u5C04\u51FA\u7684\u6700\u5C0F\u5F13\u7BAD\u6570\u3002

\xA0
\u793A\u4F8B 1\uFF1A

\u8F93\u5165\uFF1Apoints = [[10,16],[2,8],[1,6],[7,12]]
\u8F93\u51FA\uFF1A2
\u89E3\u91CA\uFF1A\u5BF9\u4E8E\u8BE5\u6837\u4F8B\uFF0Cx = 6 \u53EF\u4EE5\u5C04\u7206 [2,8],[1,6] \u4E24\u4E2A\u6C14\u7403\uFF0C\u4EE5\u53CA x = 11 \u5C04\u7206\u53E6\u5916\u4E24\u4E2A\u6C14\u7403
\u793A\u4F8B 2\uFF1A

\u8F93\u5165\uFF1Apoints = [[1,2],[3,4],[5,6],[7,8]]
\u8F93\u51FA\uFF1A4
`,paraId:101,tocIndex:25},{value:"Leetcode",paraId:102,tocIndex:25},{value:"\u5206\u6790\uFF1A\u968F\u673A\u5C04\u51FA\u4E00\u652F\u7BAD\uFF0C\u8C03\u6574\u7BAD\u7684\u4F4D\u7F6E\u80FD\u591F\u5F15\u7206\u66F4\u591A\u6570\u76EE\u7684\u6C14\u7403\u3002\u4E5F\u5C31\u80FD\u8F6C\u6362\u6210\u6C42\u4E00\u5171\u6709\u591A\u5C11\u4E2A\u91CD\u53E0\u533A\u95F4\u3002\u524D\u6587\u603B\u7ED3\u6709\u524D\u4E00\u9879\u7684 end>\u540E\u4E00\u9879\u7684 start \u5C31\u6709\u91CD\u53E0\u3002\u5F53\u540E\u4E00\u9879\u4E0E\u524D\u4E00\u9879\u4E0D\u518D\u91CD\u53E0\u65F6\uFF0C\u5C31\u9700\u8981\u5C04\u65B0\u7684\u7BAD\u4E86\u3002",paraId:103,tocIndex:25},{value:`var findMinArrowShots = function (points) {
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
`,paraId:104,tocIndex:25},{value:"\u7528\u4E8E\u5904\u7406\u6570\u7EC4\u4E2D\u7684\u6570\u503C\u9650\u5B9A\u5728\u4E00\u5B9A\u7684\u533A\u95F4\u7684\u95EE\u9898\u3002\u904D\u5386\u6570\u7EC4\u4E2D\u7684\u5143\u7D20\uFF0C\u5982\u679C\u5F53\u524D\u6570\u5B83\u4E0D\u5728\u5176\u5E94\u8BE5\u5728\u7684\u4F4D\u7F6E\u7684\u8BDD\uFF0C\u5C31\u548C\u5E94\u8BE5\u5728\u4F4D\u7F6E\u4E0A\u7684\u6570\u5B57\u4EA4\u6362\u4E00\u4E0B\u3002",paraId:105,tocIndex:26},{value:"\u5047\u8BBE\u6709\u4E00\u4E2A\u6570\u7EC4\u4E3A[2,3,4,1,0]\uFF0C\u5FAA\u73AF\u6392\u5E8F\u7684\u65B9\u5F0F\u4E3A\uFF1A",paraId:106,tocIndex:26},{value:"\u7B2C\u4E00\u4E2A\u5143\u7D20\u4E3A 2\uFF0C\u90A3\u4E48\u4ED6\u5E94\u8BE5\u5728 index \u4E3A 2 \u7684\u4F4D\u7F6E\uFF0C\u6240\u4EE5\u628A\u5B83\u548C index=2 \u7684\u5143\u7D20\u4EA4\u6362\uFF0C\u53D8\u6210[4,3,2,1,0]\u3002",paraId:107,tocIndex:26},{value:"\u7B2C\u4E00\u4E2A\u5143\u7D20\u4E3A 4\uFF0C\u90A3\u4E48\u4ED6\u5E94\u8BE5\u5728 index \u4E3A 4 \u7684\u4F4D\u7F6E\uFF0C\u6240\u4EE5\u628A\u5B83\u548C index=4 \u7684\u5143\u7D20\u4EA4\u6362\uFF0C\u53D8\u6210[0,1,2,3,4]\u3002",paraId:107,tocIndex:26},{value:"\u7B2C\u4E00\u4E2A\u5143\u7D20\u4E3A 0\uFF0C\u90A3\u4E48\u4ED6\u5E94\u8BE5\u5728 index \u4E3A 0 \u7684\u4F4D\u7F6E\uFF0C\u5B83\u7684\u4F4D\u7F6E\u662F\u6B63\u786E\u7684\uFF0C\u6570\u7EC4\u4E0D\u53D8[0,1,2,3,4]\uFF0C\u5F00\u59CB\u5904\u7406 index \u4E3A 1 \u7684\u4F4D\u7F6E\u3002",paraId:107,tocIndex:26},{value:"\u7B2C\u4E8C\u4E2A\u5143\u7D20\u4E3A 1\uFF0C\u90A3\u4E48\u4ED6\u5E94\u8BE5\u5728 index \u4E3A 1 \u7684\u4F4D\u7F6E\uFF0C\u5B83\u7684\u4F4D\u7F6E\u662F\u6B63\u786E\u7684\uFF0C\u6570\u7EC4\u4E0D\u53D8[0,1,2,3,4]\uFF0C\u5F00\u59CB\u5904\u7406 index \u4E3A 2 \u7684\u4F4D\u7F6E\u3002",paraId:107,tocIndex:26},{value:"\u7B2C\u4E09\u4E2A\u5143\u7D20\u4E3A 2\uFF0C\u90A3\u4E48\u4ED6\u5E94\u8BE5\u5728 index \u4E3A 2 \u7684\u4F4D\u7F6E\uFF0C\u5B83\u7684\u4F4D\u7F6E\u662F\u6B63\u786E\u7684\uFF0C\u6570\u7EC4\u4E0D\u53D8[0,1,2,3,4]\uFF0C\u5F00\u59CB\u5904\u7406 index \u4E3A 3 \u7684\u4F4D\u7F6E\u3002",paraId:107,tocIndex:26},{value:"\u7B2C\u56DB\u4E2A\u5143\u7D20\u4E3A 3\uFF0C\u90A3\u4E48\u4ED6\u5E94\u8BE5\u5728 index \u4E3A 3 \u7684\u4F4D\u7F6E\uFF0C\u5B83\u7684\u4F4D\u7F6E\u662F\u6B63\u786E\u7684\uFF0C\u6570\u7EC4\u4E0D\u53D8[0,1,2,3,4]\uFF0C\u5F00\u59CB\u5904\u7406 index \u4E3A 4 \u7684\u4F4D\u7F6E\u3002",paraId:107,tocIndex:26},{value:"\u7B2C\u4E94\u4E2A\u5143\u7D20\u4E3A 4\uFF0C\u90A3\u4E48\u4ED6\u5E94\u8BE5\u5728 index \u4E3A 4 \u7684\u4F4D\u7F6E\uFF0C\u5B83\u7684\u4F4D\u7F6E\u662F\u6B63\u786E\u7684\uFF0C\u6570\u7EC4\u4E0D\u53D8[0,1,2,3,4]\uFF0C\u5DF2\u7ECF\u5230\u8FBE\u672B\u5C3E\uFF0C\u6240\u6709\u7684\u5143\u7D20\u90FD\u5728\u6B63\u786E\u7684\u4F4D\u7F6E\uFF0C\u5FAA\u73AF\u6392\u5E8F\u7ED3\u675F\u3002",paraId:107,tocIndex:26},{value:"\u4EE3\u7801\u5B9E\u73B0\uFF1A",paraId:108,tocIndex:26},{value:`function cyclicSort(nums) {
  let index = 0; //\u76EE\u524D\u6307\u5411\u7684\u5143\u7D20
  while (index < nums.length) {
    const targetIndex = nums[index]; //\u5F53\u524D\u5143\u7D20\u5E94\u8BE5\u5728\u7684\u4F4D\u7F6E
    //\u5224\u65AD\u5F53\u524D\u5143\u7D20\u662F\u5426\u5728\u6B63\u786E\u7684\u4F4D\u7F6E
    if (nums[targetIndex] !== nums[index]) {
      //\u4E0D\u6B63\u786E\uFF0C\u4EA4\u6362\u4E24\u8005\u4F4D\u7F6E
      [nums[index], nums[targetIndex]] = [nums[targetIndex], nums[index]];
    } else {
      //\u6B63\u786E\uFF0C\u524D\u5F80\u4E0B\u4E00\u4E2A\u5143\u7D20
      index++;
    }
  }
  return nums;
}
`,paraId:109,tocIndex:26},{value:"\u8BC6\u522B\uFF1A",paraId:110,tocIndex:26},{value:"\u6D89\u53CA\u5230\u6392\u5E8F\u597D\u7684\u6570\u7EC4\uFF0C\u800C\u4E14\u6570\u503C\u4E00\u822C\u6EE1\u8DB3\u4E8E\u4E00\u5B9A\u7684\u533A\u95F4",paraId:111,tocIndex:26},{value:"\u5728\u6392\u597D\u5E8F/\u7FFB\u8F6C\u8FC7\u7684\u6570\u7EC4\u4E2D\uFF0C\u5BFB\u627E\u4E22\u5931/\u91CD\u590D/\u6700\u5C0F\u7684\u5143\u7D20",paraId:111,tocIndex:26},{value:`\u7ED9\u5B9A\u4E00\u4E2A\u5305\u542B\xA0n + 1 \u4E2A\u6574\u6570\u7684\u6570\u7EC4\xA0nums\uFF0C\u5176\u6570\u5B57\u90FD\u5728 1 \u5230 n\xA0\u4E4B\u95F4\uFF08\u5305\u62EC 1 \u548C n\uFF09\uFF0C\u53EF\u77E5\u81F3\u5C11\u5B58\u5728\u4E00\u4E2A\u91CD\u590D\u7684\u6574\u6570\u3002\u5047\u8BBE\u53EA\u6709\u4E00\u4E2A\u91CD\u590D\u7684\u6574\u6570\uFF0C\u627E\u51FA\u8FD9\u4E2A\u91CD\u590D\u7684\u6570\u3002

\u793A\u4F8B 1:
\u8F93\u5165: [1,3,4,2,2]
\u8F93\u51FA: 2

\u793A\u4F8B 2:
\u8F93\u5165: [3,1,3,4,2]
\u8F93\u51FA: 3
`,paraId:112,tocIndex:27},{value:"Leetcode",paraId:113,tocIndex:27},{value:"\u5206\u6790\uFF1A\u4F7F\u7528\u4E00\u6837\u7684\u5FAA\u73AF\u6392\u5E8F\u5F97\u5230\u65B0\u7684\u6570\u7EC4\u3002\u7136\u540E\u518D\u5FAA\u73AF\u5224\u65AD\u4E0B\u6807+1 \u548C\u5143\u7D20\u662F\u5426\u76F8\u540C\uFF0C\u5982\u679C\u4E0D\u540C\u5143\u7D20\u5C31\u662F\u91CD\u590D\u5143\u7D20\u3002",paraId:114,tocIndex:27},{value:`var findDuplicate = function (nums) {
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
`,paraId:115,tocIndex:27},{value:`\u7ED9\u5B9A\u4E00\u4E2A\u6574\u6570\u6570\u7EC4 a\uFF0C\u5176\u4E2D1 \u2264 a[i] \u2264 n \uFF08n\u4E3A\u6570\u7EC4\u957F\u5EA6\uFF09, \u5176\u4E2D\u6709\u4E9B\u5143\u7D20\u51FA\u73B0\u4E24\u6B21\u800C\u5176\u4ED6\u5143\u7D20\u51FA\u73B0\u4E00\u6B21\u3002
\u627E\u5230\u6240\u6709\u51FA\u73B0\u4E24\u6B21\u7684\u5143\u7D20\u3002
\u4F60\u53EF\u4EE5\u4E0D\u7528\u5230\u4EFB\u4F55\u989D\u5916\u7A7A\u95F4\u5E76\u5728O(n)\u65F6\u95F4\u590D\u6742\u5EA6\u5185\u89E3\u51B3\u8FD9\u4E2A\u95EE\u9898\u5417\uFF1F

\u793A\u4F8B\uFF1A
\u8F93\u5165:
[4,3,2,7,8,2,3,1]
\u8F93\u51FA:
[2,3]
`,paraId:116,tocIndex:28},{value:"Leetcode",paraId:117,tocIndex:28},{value:"\u5206\u6790\uFF1A\u6570\u503C\u6EE1\u8DB3\u4E00\u5B9A\u7684\u533A\u95F4\uFF0C\u53EF\u4EE5\u5148\u91C7\u7528\u5FAA\u73AF\u6392\u5E8F\u5F97\u5230\u65B0\u7684\u6570\u7EC4\u3002\u518D\u5FAA\u73AF\u6570\u7EC4\u5224\u65AD\u4E0B\u6807+1 \u662F\u5426\u548C\u5F53\u524D\u5143\u7D20\u76F8\u540C\uFF0C\u5982\u679C\u4E0D\u540C\u8BF4\u660E\u662F\u91CD\u590D\u6570\u5B57\u3002\u56E0\u4E3A\u6570\u636E\u4ECE 1 \u5F00\u59CB\uFF0C\u6240\u4EE5 targetIndex-1\u3002",paraId:118,tocIndex:28},{value:`var findDuplicates = function (nums) {
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
`,paraId:119,tocIndex:28},{value:`\u7ED9\u5B9A\u4E00\u4E2A\u5305\u542B [0, n]\xA0\u4E2D\xA0n\xA0\u4E2A\u6570\u7684\u6570\u7EC4 nums \uFF0C\u627E\u51FA [0, n] \u8FD9\u4E2A\u8303\u56F4\u5185\u6CA1\u6709\u51FA\u73B0\u5728\u6570\u7EC4\u4E2D\u7684\u90A3\u4E2A\u6570\u3002

\u8FDB\u9636\uFF1A
\u4F60\u80FD\u5426\u5B9E\u73B0\u7EBF\u6027\u65F6\u95F4\u590D\u6742\u5EA6\u3001\u4EC5\u4F7F\u7528\u989D\u5916\u5E38\u6570\u7A7A\u95F4\u7684\u7B97\u6CD5\u89E3\u51B3\u6B64\u95EE\u9898?
\xA0
\u793A\u4F8B 1\uFF1A
\u8F93\u5165\uFF1Anums = [3,0,1]
\u8F93\u51FA\uFF1A2
\u89E3\u91CA\uFF1An = 3\uFF0C\u56E0\u4E3A\u6709 3 \u4E2A\u6570\u5B57\uFF0C\u6240\u4EE5\u6240\u6709\u7684\u6570\u5B57\u90FD\u5728\u8303\u56F4 [0,3] \u5185\u30022 \u662F\u4E22\u5931\u7684\u6570\u5B57\uFF0C\u56E0\u4E3A\u5B83\u6CA1\u6709\u51FA\u73B0\u5728 nums \u4E2D\u3002

\u793A\u4F8B 2\uFF1A
\u8F93\u5165\uFF1Anums = [9,6,4,2,3,5,7,0,1]
\u8F93\u51FA\uFF1A8
\u89E3\u91CA\uFF1An = 9\uFF0C\u56E0\u4E3A\u6709 9 \u4E2A\u6570\u5B57\uFF0C\u6240\u4EE5\u6240\u6709\u7684\u6570\u5B57\u90FD\u5728\u8303\u56F4 [0,9] \u5185\u30028 \u662F\u4E22\u5931\u7684\u6570\u5B57\uFF0C\u56E0\u4E3A\u5B83\u6CA1\u6709\u51FA\u73B0\u5728 nums \u4E2D\u3002
`,paraId:120,tocIndex:29},{value:"Leetcode",paraId:121,tocIndex:29},{value:"\u5206\u6790\uFF1A\u4F7F\u7528\u4E00\u6837\u7684\u5FAA\u73AF\u6392\u5E8F\u5F97\u5230\u65B0\u7684\u6570\u7EC4\u3002\u7136\u540E\u518D\u5FAA\u73AF\u5224\u65AD\u4E0B\u6807\u548C\u5143\u7D20\u662F\u5426\u76F8\u540C\uFF0C\u5982\u679C\u4E0D\u540C\u4E0B\u6807\u5C31\u662F\u4E22\u5931\u5143\u7D20\u3002",paraId:122,tocIndex:29},{value:`var missingNumber = function (nums) {
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
`,paraId:123,tocIndex:29},{value:`\u7ED9\u5B9A\u4E00\u4E2A\u8303\u56F4\u5728\xA0 1 \u2264 a[i] \u2264 n (\xA0n = \u6570\u7EC4\u5927\u5C0F ) \u7684 \u6574\u578B\u6570\u7EC4\uFF0C\u6570\u7EC4\u4E2D\u7684\u5143\u7D20\u4E00\u4E9B\u51FA\u73B0\u4E86\u4E24\u6B21\uFF0C\u53E6\u4E00\u4E9B\u53EA\u51FA\u73B0\u4E00\u6B21\u3002
\u627E\u5230\u6240\u6709\u5728 [1, n] \u8303\u56F4\u4E4B\u95F4\u6CA1\u6709\u51FA\u73B0\u5728\u6570\u7EC4\u4E2D\u7684\u6570\u5B57\u3002
\u60A8\u80FD\u5728\u4E0D\u4F7F\u7528\u989D\u5916\u7A7A\u95F4\u4E14\u65F6\u95F4\u590D\u6742\u5EA6\u4E3AO(n)\u7684\u60C5\u51B5\u4E0B\u5B8C\u6210\u8FD9\u4E2A\u4EFB\u52A1\u5417? \u4F60\u53EF\u4EE5\u5047\u5B9A\u8FD4\u56DE\u7684\u6570\u7EC4\u4E0D\u7B97\u5728\u989D\u5916\u7A7A\u95F4\u5185\u3002

\u793A\u4F8B:
\u8F93\u5165:
[4,3,2,7,8,2,3,1]
\u8F93\u51FA:
[5,6]
`,paraId:124,tocIndex:30},{value:"Leetcode",paraId:125,tocIndex:30},{value:`
\u5206\u6790\uFF1A\u4E0A\u4E00\u9898\u7684\u6539\u9020\u9898\uFF0C\u4ECE\u4E00\u4E2A\u53D8\u6210\u591A\u4E2A\u3002\u4F7F\u7528\u4E00\u6837\u7684\u5FAA\u73AF\u6392\u5E8F\u5F97\u5230\u65B0\u7684\u6570\u7EC4\u3002\u7136\u540E\u518D\u5FAA\u73AF\u5224\u65AD\u4E0B\u6807\u548C\u5143\u7D20\u662F\u5426\u76F8\u540C\uFF0C\u5982\u679C\u4E0D\u540C\u4E0B\u6807\u5C31\u662F\u4E22\u5931\u5143\u7D20\u3002`,paraId:125,tocIndex:30},{value:`var findDisappearedNumbers = function (nums) {
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
`,paraId:126,tocIndex:30},{value:"\u9700\u8981\u53BB\u7FFB\u8F6C\u94FE\u8868\u4E2D\u67D0\u4E00\u6BB5\u8282\u70B9\uFF0C\u901A\u5E38\u8981\u6C42\u539F\u5730\u7FFB\u8F6C\u4E0D\u4F7F\u7528\u989D\u5916\u7684\u7A7A\u95F4\uFF0C\u8FD9\u65F6\u9700\u8981\u91C7\u7528\u539F\u5730\u7FFB\u8F6C\u6A21\u5F0F\u3002",paraId:127,tocIndex:31},{value:"\u9700\u8981\u501F\u52A9\u522B\u7684\u53D8\u91CF\uFF0C\u4E00\u4E2A\u53D8\u91CF\u6307\u5411\u5934\u7ED3\u70B9(current)\uFF0C\u53E6\u4E00\u4E2A\u6307\u5411\u5904\u7406\u5B8C\u7684\u8282\u70B9(previous)\u3002\u5C06 current \u7684\u6307\u5411 previous\uFF0C\u7136\u540E\u79FB\u5411\u4E0B\u4E00\u4E2A\uFF0C\u540C\u65F6 previous \u66F4\u65B0\u5230\u521A\u5904\u7406\u5B8C\u7684\u8282\u70B9\u3002",paraId:128,tocIndex:31},{value:`const next = current.next;
current.next = previous;
previous = current;
current = next;
`,paraId:129,tocIndex:31},{value:`\u53CD\u8F6C\u4E00\u4E2A\u5355\u94FE\u8868\u3002

\u793A\u4F8B:
\u8F93\u5165: 1->2->3->4->5->NULL
\u8F93\u51FA: 5->4->3->2->1->NULL
`,paraId:130,tocIndex:32},{value:"Leetcode",paraId:131,tocIndex:32},{value:`
\u5206\u6790\uFF1A\u8BBE\u7F6E\u54E8\u5175\u8282\u70B9 null\uFF0C\u5C06\u5F53\u524D\u8282\u70B9\u7684\u6307\u9488\u6307\u5411\u4E0A\u4E00\u4E2A\u8282\u70B9\uFF0C\u7136\u540E\u66F4\u65B0\u5F53\u524D\u8282\u70B9\u548C\u4E0B\u4E00\u4E2A\u8282\u70B9\u7684\u503C\u5373\u987A\u79FB\uFF0C\u91CD\u590D\u4EE5\u4E0A\u52A8\u4F5C\u76F4\u5230\u5F53\u524D\u8282\u70B9\u4E3A\u5C3E\u8282\u70B9\u7684\u8282\u70B9 null`,paraId:131,tocIndex:32},{value:`var reverseList = function (head) {
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
`,paraId:132,tocIndex:32},{value:`\u53CD\u8F6C\u4ECE\u4F4D\u7F6E m \u5230 n \u7684\u94FE\u8868\u3002\u8BF7\u4F7F\u7528\u4E00\u8D9F\u626B\u63CF\u5B8C\u6210\u53CD\u8F6C\u3002
\u8BF4\u660E:
1 \u2264\xA0m\xA0\u2264\xA0n\xA0\u2264 \u94FE\u8868\u957F\u5EA6\u3002

\u793A\u4F8B:
\u8F93\u5165: 1->2->3->4->5->NULL, m = 2, n = 4
\u8F93\u51FA: 1->4->3->2->5->NULL
`,paraId:133,tocIndex:33},{value:"leetcode",paraId:134,tocIndex:33},{value:`
\u5206\u6790\uFF1A\u53EA\u9700\u8981\u5BF9 m \u5230 n \u4E4B\u95F4\u7684\u5143\u7D20\u8FDB\u884C\u7FFB\u8F6C\u3002\u7FFB\u8F6C\u7684\u601D\u8DEF\u548C\u4E0A\u4E00\u9898\u4E00\u6837\uFF0C\u4F46\u662F\u9700\u8981\u53D6\u5230 m-n \u4E4B\u95F4\u7684\u5143\u7D20\u3002\u6240\u4EE5\u8C03\u7528\u4E86\u4E24\u6B21 while \u5FAA\u73AF\uFF0C\u83B7\u53D6\u5230 m-n \u4E4B\u95F4\u7684\u5143\u7D20`,paraId:134,tocIndex:33},{value:`var reverseBetween = function (head, m, n) {
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
`,paraId:135,tocIndex:33},{value:`\u7ED9\u5B9A\u4E00\u4E2A\u94FE\u8868\uFF0C\u4E24\u4E24\u4EA4\u6362\u5176\u4E2D\u76F8\u90BB\u7684\u8282\u70B9\uFF0C\u5E76\u8FD4\u56DE\u4EA4\u6362\u540E\u7684\u94FE\u8868\u3002

\u4F60\u4E0D\u80FD\u53EA\u662F\u5355\u7EAF\u7684\u6539\u53D8\u8282\u70B9\u5185\u90E8\u7684\u503C\uFF0C\u800C\u662F\u9700\u8981\u5B9E\u9645\u7684\u8FDB\u884C\u8282\u70B9\u4EA4\u6362\u3002

\u793A\u4F8B:
\u7ED9\u5B9A 1->2->3->4, \u4F60\u5E94\u8BE5\u8FD4\u56DE 2->1->4->3.
`,paraId:136,tocIndex:34},{value:"leetcode",paraId:137,tocIndex:34},{value:`
\u5206\u6790\uFF1A\u52A0\u5165\u54E8\u5175\u8282\u70B9\uFF0C\u60EF\u7528\u7684\u601D\u8DEF\u3002\u5206\u522B\u8BBE\u7F6E start \u548C end \u4E24\u4E2A\u8282\u70B9\u4E3A\u8981\u4EA4\u6362\u7684\u8282\u70B9\uFF0Cstart \u4E3A\u5F53\u524D\u904D\u5386\u8282\u70B9\u7684\u540E\u7EED\u8282\u70B9\uFF0Cend \u4E3A start \u7684\u540E\u7EED\u8282\u70B9\u3002\u5F53\u524D\u8282\u70B9\u7684\u540E\u7EED\u8282\u70B9\u548C\u540E\u540E\u7EED\u4E24\u8005\u4E2D\u6709\u4E00\u4E2A\u4E3A\u7A7A\u65F6\u5219\u7EC8\u6B62\u5FAA\u73AF\u3002`,paraId:137,tocIndex:34},{value:`var swapPairs = function (head) {
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
`,paraId:138,tocIndex:34},{value:`\u7ED9\u4F60\u4E00\u4E2A\u94FE\u8868\uFF0C\u6BCF\xA0k\xA0\u4E2A\u8282\u70B9\u4E00\u7EC4\u8FDB\u884C\u7FFB\u8F6C\uFF0C\u8BF7\u4F60\u8FD4\u56DE\u7FFB\u8F6C\u540E\u7684\u94FE\u8868\u3002
k\xA0\u662F\u4E00\u4E2A\u6B63\u6574\u6570\uFF0C\u5B83\u7684\u503C\u5C0F\u4E8E\u6216\u7B49\u4E8E\u94FE\u8868\u7684\u957F\u5EA6\u3002
\u5982\u679C\u8282\u70B9\u603B\u6570\u4E0D\u662F\xA0k\xA0\u7684\u6574\u6570\u500D\uFF0C\u90A3\u4E48\u8BF7\u5C06\u6700\u540E\u5269\u4F59\u7684\u8282\u70B9\u4FDD\u6301\u539F\u6709\u987A\u5E8F\u3002

\u793A\u4F8B\uFF1A
\u7ED9\u4F60\u8FD9\u4E2A\u94FE\u8868\uFF1A1->2->3->4->5
\u5F53\xA0k\xA0= 2 \u65F6\uFF0C\u5E94\u5F53\u8FD4\u56DE: 2->1->4->3->5
\u5F53\xA0k\xA0= 3 \u65F6\uFF0C\u5E94\u5F53\u8FD4\u56DE: 3->2->1->4->5
`,paraId:139,tocIndex:35},{value:"Leetcode",paraId:140,tocIndex:35},{value:`
\u5206\u6790\uFF1A\u94FE\u8868\u5206\u4E3A\u5DF2\u7FFB\u8F6C\u90E8\u5206+\u5F85\u53CD\u8F6C\u90E8\u5206+\u672A\u53CD\u8F6C\u90E8\u5206\u3002\u7FFB\u8F6C\u7684\u903B\u8F91\u8FD8\u662F\u4E00\u6837\u7684\uFF0C\u91CD\u70B9\u5728\u4E8E\u786E\u5B9A\u7FFB\u8F6C\u7684\u8303\u56F4\uFF0C\u5FC5\u987B\u901A\u8FC7 K \u5FAA\u73AF\u786E\u8BA4\u3002\u8BB0\u5F55\u7FFB\u8F6C\u94FE\u8868\u7684\u524D\u540E\u6307\u9488\uFF0C\u65B9\u4FBF\u8FDE\u63A5\u7FFB\u8F6C\u90E8\u5206\u3002\u521D\u59CB pre \u4E3A\u7FFB\u8F6C\u94FE\u8868\u7684\u524D\u9A71\uFF0Cend \u4E3A\u7FFB\u8F6C\u94FE\u8868\u7684\u672B\u5C3E\uFF0C\u7FFB\u8F6C\u94FE\u8868\u7684\u540E\u7EE7 next=end.next\u3002\u7FFB\u8F6C\u5B8C\u6210\uFF0C\u5C06\u4E09\u4E2A\u90E8\u5206\u8FDE\u63A5\u8D77\u6765\uFF0C\u91CD\u7F6E pre \u548C end \u6307\u9488\u8FDB\u5165\u4E0B\u4E00\u6B21\u5FAA\u73AF\u3002\u7279\u6B8A\u60C5\u51B5\uFF0C\u5F53\u7FFB\u8F6C\u90E8\u5206\u957F\u5EA6\u4E0D\u5230 K\uFF0Cend===null \u65F6\uFF0C\u8BF4\u660E\u5DF2\u7ECF\u5230\u8FBE\u672B\u5C3E\uFF0C\u76F4\u63A5\u8FD4\u56DE\u3002`,paraId:140,tocIndex:35},{value:`var reverseKGroup = function (head, k) {
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
`,paraId:141,tocIndex:35},{value:"Breadth First Search(BFS)\uFF0C\u501F\u52A9\u961F\u5217\u6570\u636E\u7ED3\u6784\uFF0C\u4ECE\u800C\u4FDD\u8BC1\u6811\u7684\u8282\u70B9\u6309\u7167\u4ED6\u4EEC\u7684\u5C42\u6570\u6253\u5370\u51FA\u6765\u3002\u6253\u5370\u5B8C\u5F53\u524D\u5C42\u6240\u6709\u5143\u7D20\uFF0C\u624D\u80FD\u6267\u884C\u5230\u4E0B\u4E00\u5C42\u3002\u6240\u6709\u8FD9\u79CD\u9700\u8981\u904D\u5386\u6811\u4E14\u9700\u8981\u4E00\u5C42\u4E00\u5C42\u904D\u5386\u7684\u95EE\u9898\u3002",paraId:142,tocIndex:36},{value:"\u8BC6\u522B\u6811\u4E0A\u7684 BFS \u6A21\u5F0F\uFF1A",paraId:143,tocIndex:36},{value:"\u904D\u5386\u6811\u4E14\u9700\u8981\u6309\u5C42\u64CD\u4F5C\u7684\u65B9\u5F0F\u3002",paraId:144,tocIndex:36},{value:`\u7ED9\u4F60\u4E00\u4E2A\u4E8C\u53C9\u6811\uFF0C\u8BF7\u4F60\u8FD4\u56DE\u5176\u6309 \u5C42\u5E8F\u904D\u5386 \u5F97\u5230\u7684\u8282\u70B9\u503C\u3002 \uFF08\u5373\u9010\u5C42\u5730\uFF0C\u4ECE\u5DE6\u5230\u53F3\u8BBF\u95EE\u6240\u6709\u8282\u70B9\uFF09\u3002

\u793A\u4F8B\uFF1A
\u4E8C\u53C9\u6811\uFF1A[3,9,20,null,null,15,7],
    3
   / \\
  9  20
    /  \\
   15   7
\u8FD4\u56DE\u5176\u5C42\u5E8F\u904D\u5386\u7ED3\u679C\uFF1A
[[3],[9,20],[15,7]]
`,paraId:145,tocIndex:37},{value:"Leetcode",paraId:146,tocIndex:37},{value:`var levelOrder = function (root) {
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
`,paraId:147,tocIndex:37},{value:`\u7ED9\u5B9A\u4E00\u4E2A\u4E8C\u53C9\u6811\uFF0C\u8FD4\u56DE\u5176\u8282\u70B9\u503C\u7684\u952F\u9F7F\u5F62\u5C42\u5E8F\u904D\u5386\u3002\uFF08\u5373\u5148\u4ECE\u5DE6\u5F80\u53F3\uFF0C\u518D\u4ECE\u53F3\u5F80\u5DE6\u8FDB\u884C\u4E0B\u4E00\u5C42\u904D\u5386\uFF0C\u4EE5\u6B64\u7C7B\u63A8\uFF0C\u5C42\u4E0E\u5C42\u4E4B\u95F4\u4EA4\u66FF\u8FDB\u884C\uFF09\u3002

\u4F8B\u5982\uFF1A
\u7ED9\u5B9A\u4E8C\u53C9\u6811\xA0[3,9,20,null,null,15,7],
    3
   / \\
  9  20
    /  \\
   15   7
\u8FD4\u56DE\u952F\u9F7F\u5F62\u5C42\u5E8F\u904D\u5386\u5982\u4E0B\uFF1A
[[3],[20,9],[15,7]]
`,paraId:148,tocIndex:38},{value:"Leetcode",paraId:149,tocIndex:38},{value:`var zigzagLevelOrder = function (root) {
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
`,paraId:150,tocIndex:38},{value:`\u7ED9\u5B9A\u4E00\u4E2A\u975E\u7A7A\u4E8C\u53C9\u6811, \u8FD4\u56DE\u4E00\u4E2A\u7531\u6BCF\u5C42\u8282\u70B9\u5E73\u5747\u503C\u7EC4\u6210\u7684\u6570\u7EC4\u3002

\u793A\u4F8B 1\uFF1A
\u8F93\u5165\uFF1A
    3
   / \\
  9  20
    /  \\
   15   7
\u8F93\u51FA\uFF1A[3, 14.5, 11]
\u89E3\u91CA\uFF1A
\u7B2C 0 \u5C42\u7684\u5E73\u5747\u503C\u662F 3 ,  \u7B2C1\u5C42\u662F 14.5 , \u7B2C2\u5C42\u662F 11 \u3002\u56E0\u6B64\u8FD4\u56DE [3, 14.5, 11] \u3002
`,paraId:151,tocIndex:39},{value:"Leetcode",paraId:152,tocIndex:39},{value:`var averageOfLevels = function (root) {
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
`,paraId:153,tocIndex:39},{value:`\u7ED9\u5B9A\u4E00\u4E2A\u4E8C\u53C9\u6811\uFF0C\u627E\u51FA\u5176\u6700\u5C0F\u6DF1\u5EA6\u3002
\u6700\u5C0F\u6DF1\u5EA6\u662F\u4ECE\u6839\u8282\u70B9\u5230\u6700\u8FD1\u53F6\u5B50\u8282\u70B9\u7684\u6700\u77ED\u8DEF\u5F84\u4E0A\u7684\u8282\u70B9\u6570\u91CF\u3002
\u8BF4\u660E\uFF1A\u53F6\u5B50\u8282\u70B9\u662F\u6307\u6CA1\u6709\u5B50\u8282\u70B9\u7684\u8282\u70B9\u3002

\u793A\u4F8B 1\uFF1A
\u8F93\u5165\uFF1Aroot = [3,9,20,null,null,15,7]
\u8F93\u51FA\uFF1A2

\u793A\u4F8B 2\uFF1A
\u8F93\u5165\uFF1Aroot = [2,null,3,null,4,null,5,null,6]
\u8F93\u51FA\uFF1A5
`,paraId:154,tocIndex:40},{value:"Leetcode",paraId:155,tocIndex:40},{value:`var minDepth = function (root) {
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
`,paraId:156,tocIndex:40},{value:"\u8BE5\u6A21\u5F0F\u662F\u4ECE\u6839\u5F00\u59CB\uFF0C\u5982\u679C\u8BE5\u8282\u70B9\u4E0D\u662F\u53F6\u5B50\u8282\u70B9\uFF0C\u9700\u8981\u5E72\u4E09\u4EF6\u4E8B\u60C5\uFF1A",paraId:157,tocIndex:41},{value:"\u9700\u8981\u533A\u522B\u6211\u4EEC\u662F\u5148\u5904\u7406\u6839\u8282\u70B9(pre-order\uFF0C\u524D\u5E8F)\uFF0C\u5904\u7406\u5B69\u5B50\u8282\u70B9\u4E4B\u95F4\u5904\u7406\u6839\u8282\u70B9(in-order\uFF0C\u4E2D\u5E8F)\uFF0C\u8FD8\u662F\u5904\u7406\u5B8C\u6240\u6709\u5B69\u5B50\u518D\u5904\u7406\u6839\u8282\u70B9(post-order\uFF0C\u540E\u5E8F)\u3002",paraId:158,tocIndex:41},{value:"\u9012\u5F52\u5904\u7406\u5F53\u524D\u8282\u70B9\u7684\u5DE6\u53F3\u5B69\u5B50",paraId:158,tocIndex:41},{value:"\u8BC6\u522B\u6811\u5F62 DFS:",paraId:159,tocIndex:41},{value:"\u9700\u8981\u6309\u524D\u4E2D\u540E\u5E8F\u7684 DFS \u65B9\u5F0F\u904D\u5386\u6811",paraId:160,tocIndex:41},{value:"\u5982\u679C\u8BE5\u95EE\u9898\u7684\u89E3\u4E00\u822C\u79BB\u53F6\u5B50\u8282\u70B9\u6BD4\u8F83\u8FD1",paraId:160,tocIndex:41},{value:`\u7ED9\u5B9A\u4E00\u4E2A\u4E8C\u53C9\u6811\uFF0C\u8FD4\u56DE\u6240\u6709\u4ECE\u6839\u8282\u70B9\u5230\u53F6\u5B50\u8282\u70B9\u7684\u8DEF\u5F84\u3002
\u8BF4\u660E: \u53F6\u5B50\u8282\u70B9\u662F\u6307\u6CA1\u6709\u5B50\u8282\u70B9\u7684\u8282\u70B9\u3002

\u793A\u4F8B:
\u8F93\u5165:
   1
 /   \\
2     3
 \\
  5

\u8F93\u51FA: ["1->2->5", "1->3"]
\u89E3\u91CA: \u6240\u6709\u6839\u8282\u70B9\u5230\u53F6\u5B50\u8282\u70B9\u7684\u8DEF\u5F84\u4E3A: 1->2->5, 1->3
`,paraId:161,tocIndex:42},{value:"Leetcode",paraId:162,tocIndex:42},{value:`
\u5206\u6790\uFF1A\u5229\u7528\u524D\u5E8F\u904D\u5386\uFF0C\u5F53\u67D0\u4E2A\u8282\u70B9\u7684\u5DE6\u53F3\u5B50\u6811\u90FD\u4E3A null \u7684\u65F6\u5019\uFF0C\u8BF4\u660E\u5DF2\u7ECF\u8D70\u5B8C\u8BE5\u8DEF\u5F84`,paraId:162,tocIndex:42},{value:`var binaryTreePaths = function (root) {
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
`,paraId:163,tocIndex:42},{value:`\u7ED9\u5B9A\u4E00\u4E2A\u4E8C\u53C9\u6811\u548C\u4E00\u4E2A\u76EE\u6807\u548C\uFF0C\u627E\u5230\u6240\u6709\u4ECE\u6839\u8282\u70B9\u5230\u53F6\u5B50\u8282\u70B9\u8DEF\u5F84\u603B\u548C\u7B49\u4E8E\u7ED9\u5B9A\u76EE\u6807\u548C\u7684\u8DEF\u5F84\u3002
\u8BF4\u660E:\xA0\u53F6\u5B50\u8282\u70B9\u662F\u6307\u6CA1\u6709\u5B50\u8282\u70B9\u7684\u8282\u70B9\u3002

\u793A\u4F8B:
\u7ED9\u5B9A\u5982\u4E0B\u4E8C\u53C9\u6811\uFF0C\u4EE5\u53CA\u76EE\u6807\u548C\xA0sum = 22\uFF0C
              5
             / \\
            4   8
           /   / \\
          11  13  4
         /  \\    / \\
        7    2  5   1
\u8FD4\u56DE:[[5,4,11,2],[5,8,4,5]]
`,paraId:164,tocIndex:43},{value:"Leetcode",paraId:165,tocIndex:43},{value:`var pathSum = function (root, sum) {
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
`,paraId:166,tocIndex:43},{value:`\u7ED9\u5B9A\u4E00\u4E2A\u4E8C\u53C9\u6811\uFF0C\u5B83\u7684\u6BCF\u4E2A\u7ED3\u70B9\u90FD\u5B58\u653E\u4E00\u4E2A\xA00-9\xA0\u7684\u6570\u5B57\uFF0C\u6BCF\u6761\u4ECE\u6839\u5230\u53F6\u5B50\u8282\u70B9\u7684\u8DEF\u5F84\u90FD\u4EE3\u8868\u4E00\u4E2A\u6570\u5B57\u3002
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
`,paraId:167,tocIndex:44},{value:"Leetcode",paraId:168,tocIndex:44},{value:`var sumNumbers = function (root) {
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
`,paraId:169,tocIndex:44},{value:"\u5B50\u96C6\u95EE\u9898\u6A21\u5F0F\u4E00\u822C\u7528\u591A\u91CD DFS\u3002",paraId:170,tocIndex:45},{value:"\u5982\u679C\u5224\u65AD\u8FD9\u79CD\u5B50\u96C6\u6A21\u5F0F\uFF1A",paraId:171,tocIndex:45},{value:"\u95EE\u9898\u9700\u8981\u54B1\u4EEC\u53BB\u627E\u6570\u5B57\u7684\u7EC4\u5408\u6216\u662F\u6392\u5217",paraId:172,tocIndex:45},{value:"\u56DE\u6EAF\u6A21\u677F",paraId:173,tocIndex:45},{value:`const res = [];
const bakctrack = (nums, start, track) => {
  res.push(track);
  for (let i = start; i < nums.length; i++) {
    track.push(nums[i]); //\u8FDB\u884C\u9009\u62E9
    bakctrack(nums, i + 1, [...track]); //\u56DE\u6EAF
    track.pop(); //\u64A4\u9500\u9009\u62E9
  }
};
bakctrack(nums, 0, []);
`,paraId:174,tocIndex:45},{value:"\u5B50\u96C6\u7C7B\u578B\u53EF\u4EE5\u5206\u4E3A\u4E09\u79CD\u7C7B\u578B\uFF1A",paraId:175,tocIndex:45},{value:`\u5B50\u96C6
\u9700\u8981\u6392\u9664\u5DF2\u9009\u7684\u6570\u5B57\uFF0C\u6240\u4EE5 i \u521D\u59CB\u5316\u4E3A start`,paraId:176,tocIndex:45},{value:`\u6392\u5217
\u4ECE\u5934\u5F00\u59CB\u904D\u5386\u6570\u7EC4\uFF0C\u6570\u7EC4\u4E2D\u5DF2\u7ECF\u6709\u5F53\u524D\u6570\u636E\u5219\u8DF3\u8FC7\uFF0C\u82E5\u6CA1\u6709\u5219\u52A0\u5165\u6570\u7EC4\uFF0C\u5F53\u6392\u5217\u957F\u5EA6\u7B49\u4E8E\u4F20\u5165\u53C2\u6570\u957F\u5EA6\u65F6\uFF0C\u653E\u5165\u7B54\u6848\u3002`,paraId:176,tocIndex:45},{value:`\u7EC4\u5408
\u9700\u8981\u6392\u9664\u5DF2\u9009\u7684\u6570\u5B57\uFF0C\u6240\u4EE5 i \u521D\u59CB\u5316\u4E3A start\u3002\u5F53\u7EC4\u5408\u957F\u5EA6\u8FBE\u5230\u6240\u9700\u957F\u5EA6\u65F6\uFF0C\u653E\u5165\u7B54\u6848\u4E2D\u3002`,paraId:176,tocIndex:45},{value:`\u7ED9\u4F60\u4E00\u4E2A\u6574\u6570\u6570\u7EC4\xA0nums \uFF0C\u8FD4\u56DE\u8BE5\u6570\u7EC4\u6240\u6709\u53EF\u80FD\u7684\u5B50\u96C6\uFF08\u5E42\u96C6\uFF09\u3002\u89E3\u96C6\u4E0D\u80FD\u5305\u542B\u91CD\u590D\u7684\u5B50\u96C6\u3002

\u793A\u4F8B 1\uFF1A
\u8F93\u5165\uFF1Anums = [1,2,3]
\u8F93\u51FA\uFF1A[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

\u793A\u4F8B 2\uFF1A
\u8F93\u5165\uFF1Anums = [0]
\u8F93\u51FA\uFF1A[[],[0]]
`,paraId:177,tocIndex:46},{value:"Leetcode",paraId:178,tocIndex:46},{value:"\u5206\u6790\uFF1A\u5728\u9012\u5F52\u4E4B\u524D\u52A0\u5165\u89E3\u96C6\uFF1B\u679A\u4E3E\u51FA\u5F53\u524D\u53EF\u9009\u7684\u6570\u5B57\uFF0C\u7B2C\u4E00\u4E2A\u6570\u53EF\u9009 1/2/3\uFF1B\u5047\u5982\u7B2C\u4E00\u4E2A\u6570\u9009\u4E86 1\uFF0C\u7B2C\u4E8C\u4E2A\u6570\u53EF\u9009 2/3\uFF0C\u4EE5\u6B64\u7C7B\u63A8\uFF1B\u6BCF\u6B21\u4F20\u5165\u5B50\u9012\u5F52\u7684 index \u662F\uFF1A\u5F53\u524D\u9009\u4E2D\u6570\u5B57\u7684\u7D22\u5F15+1\uFF1B\u7136\u540E\u6BCF\u6B21\u9012\u5F52\u7684\u9009\u9879\u53D8\u5C11\uFF0C\u4E00\u76F4\u9012\u5F52\u5230\u6CA1\u6709\u53EF\u9009\u6570\u5B57\uFF0C\u8FDB\u5165\u4E0D\u4E86\u5FAA\u73AF\uFF0C\u6574\u4E2A DFS \u7ED3\u675F\uFF1B\u6700\u540E\u9012\u5F52\u81EA\u7136\u7ED3\u675F\uFF1B",paraId:179,tocIndex:46},{value:`var subsets = function (nums) {
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
`,paraId:180,tocIndex:46},{value:`\u7ED9\u5B9A\u4E00\u4E2A\u53EF\u80FD\u5305\u542B\u91CD\u590D\u5143\u7D20\u7684\u6574\u6570\u6570\u7EC4 nums\uFF0C\u8FD4\u56DE\u8BE5\u6570\u7EC4\u6240\u6709\u53EF\u80FD\u7684\u5B50\u96C6\uFF08\u5E42\u96C6\uFF09\u3002
\u8BF4\u660E\uFF1A\u89E3\u96C6\u4E0D\u80FD\u5305\u542B\u91CD\u590D\u7684\u5B50\u96C6\u3002

\u793A\u4F8B:
\u8F93\u5165: [1,2,2]
\u8F93\u51FA:
[[2],[1],[1,2,2],[2,2],[1,2],[]]
`,paraId:181,tocIndex:47},{value:"Leetcode",paraId:182,tocIndex:47},{value:`
\u5206\u6790\uFF1A\u548C\u4E0A\u9898\u4E00\u81F4\uFF0C\u4F46\u662F\u5728\u8FDB\u5165\u5230\u9012\u5F52\u65F6\uFF0C\u9700\u8981\u5224\u65AD\u5F53\u524D\u6570\u5B57\u548C\u524D\u4E00\u4E2A\u6570\u5B57\u662F\u5426\u76F8\u540C\uFF0C\u5982\u679C\u76F8\u540C\u540E\u7EED\u5F97\u5230\u7684\u89E3\u96C6\u5747\u4F1A\u91CD\u590D\uFF0C\u6240\u4EE5\u76F8\u540C\u65F6\u8DF3\u8FC7\u5F53\u524D\u6570\u5B57\u3002`,paraId:182,tocIndex:47},{value:`var subsetsWithDup = function (nums) {
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
`,paraId:183,tocIndex:47},{value:`\u7ED9\u5B9A\u4E00\u4E2A \u6CA1\u6709\u91CD\u590D \u6570\u5B57\u7684\u5E8F\u5217\uFF0C\u8FD4\u56DE\u5176\u6240\u6709\u53EF\u80FD\u7684\u5168\u6392\u5217\u3002

\u793A\u4F8B:
\u8F93\u5165: [1,2,3]
\u8F93\u51FA:
[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
`,paraId:184,tocIndex:48},{value:"Leetcode",paraId:185,tocIndex:48},{value:"\u5206\u6790\uFF1A\u91C7\u7528\u56DE\u6EAF\u6A21\u677F\uFF0C\u9009\u62E9-\u9012\u5F52-\u64A4\u9500\u9009\u62E9\u3002\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E00\u4E2A\u6570\u636E\u90FD\u5E94\u8BE5\u5B58\u5728\u4E8E\u89E3\u96C6\u4E2D\uFF0C\u6240\u4EE5\u5F53 track \u7684\u957F\u5EA6\u7B49\u4E8E nums \u7684\u957F\u5EA6\u65F6\uFF0C\u628A\u5F53\u524D\u89E3\u96C6\u653E\u5165\u7B54\u6848\u3002\u904D\u5386\u6570\u7EC4\uFF0C\u505A\u9009\u62E9\uFF0C\u5982\u679C track \u4E2D\u5DF2\u7ECF\u6709\u5F53\u524D\u6570\u636E\u4E86\uFF0C\u5219\u8DF3\u8FC7\u3002",paraId:186,tocIndex:48},{value:`var permute = function (nums) {
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
`,paraId:187,tocIndex:48},{value:`\u7ED9\u5B9A\u4E00\u4E2A\u53EF\u5305\u542B\u91CD\u590D\u6570\u5B57\u7684\u5E8F\u5217 nums \uFF0C\u6309\u4EFB\u610F\u987A\u5E8F \u8FD4\u56DE\u6240\u6709\u4E0D\u91CD\u590D\u7684\u5168\u6392\u5217\u3002

\u793A\u4F8B 1\uFF1A
\u8F93\u5165\uFF1Anums = [1,1,2]
\u8F93\u51FA\uFF1A
[[1,1,2],[1,2,1],[2,1,1]]
`,paraId:188,tocIndex:49},{value:"Leetcode",paraId:189,tocIndex:49},{value:"\u5206\u6790\uFF1A\u4E0A\u4E00\u9898\u7684\u52A0\u5F3A\u7248\uFF0C\u6709\u91CD\u590D\u6570\u5B57\u3002\u601D\u8DEF\u4E00\u6837\uFF0C\u4F46\u662F\u9700\u8981\u591A\u4E00\u4E2A\u5224\u65AD\u3002visit \u6570\u7EC4\u8BB0\u5F55\u5F53\u524D\u6570\u5B57\u662F\u5426\u88AB\u653E\u5165 track\uFF0C\u5FAA\u73AF\u4E2D\u5982\u679C visit[i]\u88AB\u8BBF\u95EE\u8FC7\u5219\u8DF3\u8FC7\uFF1Bnums[i]\u7B49\u4E8E nums[i-1]\u5E76\u4E14 i-1 \u88AB\u8BBF\u95EE\u8FC7\u5219\u8DF3\u8FC7\u3002",paraId:190,tocIndex:49},{value:`var permuteUnique = function (nums) {
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
`,paraId:191,tocIndex:49},{value:`\u7ED9\u5B9A\u4E24\u4E2A\u6574\u6570 n \u548C k\uFF0C\u8FD4\u56DE 1 ... n \u4E2D\u6240\u6709\u53EF\u80FD\u7684 k \u4E2A\u6570\u7684\u7EC4\u5408\u3002

\u793A\u4F8B:
\u8F93\u5165:\xA0n = 4, k = 2
\u8F93\u51FA:
[[2,4],[3,4],[2,3],[1,2],[1,3],[1,4],]
`,paraId:192,tocIndex:50},{value:"Leetcode",paraId:193,tocIndex:50},{value:"\u5206\u6790\uFF1A\u76F4\u63A5\u5957\u7528\u56DE\u6EAF\u7B97\u6CD5\u3002\u5F53 treck \u957F\u5EA6\u7B49\u4E8E k \u65F6\uFF0C\u628A track \u653E\u5165\u7B54\u6848\u3002",paraId:194,tocIndex:50},{value:`var combine = function (n, k) {
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
`,paraId:195,tocIndex:50},{value:`\u7ED9\u5B9A\u4E00\u4E2A\u65E0\u91CD\u590D\u5143\u7D20\u7684\u6570\u7EC4\xA0candidates\xA0\u548C\u4E00\u4E2A\u76EE\u6807\u6570\xA0target\xA0\uFF0C\u627E\u51FA\xA0candidates\xA0\u4E2D\u6240\u6709\u53EF\u4EE5\u4F7F\u6570\u5B57\u548C\u4E3A\xA0target\xA0\u7684\u7EC4\u5408\u3002
candidates\xA0\u4E2D\u7684\u6570\u5B57\u53EF\u4EE5\u65E0\u9650\u5236\u91CD\u590D\u88AB\u9009\u53D6\u3002

\u8BF4\u660E\uFF1A
\u6240\u6709\u6570\u5B57\uFF08\u5305\u62EC\xA0target\uFF09\u90FD\u662F\u6B63\u6574\u6570\u3002
\u89E3\u96C6\u4E0D\u80FD\u5305\u542B\u91CD\u590D\u7684\u7EC4\u5408\u3002\xA0

\u793A\u4F8B\xA01\uFF1A
\u8F93\u5165\uFF1Acandidates = [2,3,6,7], target = 7,
\u6240\u6C42\u89E3\u96C6\u4E3A\uFF1A
[[7],[2,2,3]]

\u793A\u4F8B\xA02\uFF1A
\u8F93\u5165\uFF1Acandidates = [2,3,5], target = 8,
\u6240\u6C42\u89E3\u96C6\u4E3A\uFF1A
[[2,2,2,2],[2,3,3],[3,5]]
`,paraId:196,tocIndex:51},{value:"Leetcode",paraId:197,tocIndex:51},{value:`
\u5206\u6790\uFF1A\u5957\u7528\u56DE\u6EAF\u6A21\u677F\u3002\u5F53 target===0 \u65F6\uFF0C\u628A\u5F53\u524D track \u653E\u5165\u7B54\u6848\u3002\u904D\u5386\u6570\u7EC4\u65F6\uFF0C\u53EA\u6709\u5F53\u5143\u7D20\u5C0F\u4E8E\u7B49\u4E8E target \u65F6\u88AB\u653E\u5165 track\u3002\u56DE\u6EAF\u65F6\uFF0C\u53EF\u4EE5\u91CD\u590D\u9009\u62E9\u5F53\u524D\u5143\u7D20\uFF0Cstart \u5E94\u8BE5\u53D6\u5F53\u524D\u7D22\u5F15 i\u3002`,paraId:197,tocIndex:51},{value:`var combinationSum = function (candidates, target) {
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
`,paraId:198,tocIndex:51},{value:`\u7ED9\u5B9A\u4E00\u4E2A\u6570\u7EC4\xA0candidates\xA0\u548C\u4E00\u4E2A\u76EE\u6807\u6570\xA0target\xA0\uFF0C\u627E\u51FA\xA0candidates\xA0\u4E2D\u6240\u6709\u53EF\u4EE5\u4F7F\u6570\u5B57\u548C\u4E3A\xA0target\xA0\u7684\u7EC4\u5408\u3002
candidates\xA0\u4E2D\u7684\u6BCF\u4E2A\u6570\u5B57\u5728\u6BCF\u4E2A\u7EC4\u5408\u4E2D\u53EA\u80FD\u4F7F\u7528\u4E00\u6B21\u3002

\u8BF4\u660E\uFF1A
\u6240\u6709\u6570\u5B57\uFF08\u5305\u62EC\u76EE\u6807\u6570\uFF09\u90FD\u662F\u6B63\u6574\u6570\u3002
\u89E3\u96C6\u4E0D\u80FD\u5305\u542B\u91CD\u590D\u7684\u7EC4\u5408\u3002
\xA0
\u793A\u4F8B\xA01:
\u8F93\u5165: candidates =\xA0[10,1,2,7,6,1,5], target =\xA08,
\u6240\u6C42\u89E3\u96C6\u4E3A:[[1, 7],[1, 2, 5],[2, 6],[1, 1, 6]]

\u793A\u4F8B\xA02:
\u8F93\u5165: candidates =\xA0[2,5,2,1,2], target =\xA05,
\u6240\u6C42\u89E3\u96C6\u4E3A:[[1,2,2],[5]]
`,paraId:199,tocIndex:52},{value:"Leetcode",paraId:200,tocIndex:52},{value:`
\u5206\u6790\uFF1A\u4E0A\u9898\u52A0\u5F3A\u7248\u3002\u6BCF\u4E2A\u6570\u5B57\u53EA\u80FD\u4F7F\u7528\u4E00\u6B21\uFF0C\u9700\u8981\u6CE8\u610F\u4E24\u70B9\u3002\u7B2C\u4E00\u56DE\u6EAF\u65F6\u9700\u8981\u4ECE\u5F53\u524D\u7D22\u5F15 i \u7684\u4E0B\u4E00\u4F4D\u67E5\u8D77\uFF1B\u7B2C\u4E8C\u82E5\u4E24\u4E2A\u90BB\u8FD1\u4E24\u4E2A\u6570\u5B57\u76F8\u540C\u65F6\uFF0C\u9700\u8981\u505A\u53BB\u91CD\u5904\u7406\uFF0C\u8DF3\u8FC7\u5373\u53EF(\u4E0E 47 \u9898\u5904\u7406\u76F8\u540C)\u3002`,paraId:200,tocIndex:52},{value:`var combinationSum2 = function (candidates, target) {
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
`,paraId:201,tocIndex:52},{value:`\u7ED9\u5B9A\u4E00\u4E2A\u5B57\u7B26\u4E32S\uFF0C\u901A\u8FC7\u5C06\u5B57\u7B26\u4E32S\u4E2D\u7684\u6BCF\u4E2A\u5B57\u6BCD\u8F6C\u53D8\u5927\u5C0F\u5199\uFF0C\u6211\u4EEC\u53EF\u4EE5\u83B7\u5F97\u4E00\u4E2A\u65B0\u7684\u5B57\u7B26\u4E32\u3002\u8FD4\u56DE\u6240\u6709\u53EF\u80FD\u5F97\u5230\u7684\u5B57\u7B26\u4E32\u96C6\u5408\u3002

\u793A\u4F8B\uFF1A
\u8F93\u5165\uFF1AS = "a1b2"
\u8F93\u51FA\uFF1A["a1b2", "a1B2", "A1b2", "A1B2"]

\u8F93\u5165\uFF1AS = "3z4"
\u8F93\u51FA\uFF1A["3z4", "3Z4"]

\u8F93\u5165\uFF1AS = "12345"
\u8F93\u51FA\uFF1A["12345"]
`,paraId:202,tocIndex:53},{value:"Leetcode",paraId:203,tocIndex:53},{value:`
\u5206\u6790\uFF1A\u53D8\u5F62\u7684\u5168\u6392\u5217\u9898\u76EE\u3002\u6539\u53D8\u5B57\u6BCD\u5927\u5C0F\u5199\uFF0C\u83B7\u5F97\u65B0\u7684\u5B57\u7B26\u4E32\u3002\u5957\u7528\u56DE\u6EAF\u7B97\u6CD5\u3002`,paraId:203,tocIndex:53},{value:`var letterCasePermutation = function (S) {
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
`,paraId:204,tocIndex:53},{value:"\u5BF9\u4E8E\u4E00\u7EC4\u4E0A\u5347\u6392\u5217\u7684\u6570\u96C6\u6765\u8BF4\uFF0C\u6A21\u5F0F\u7684\u6B65\u9AA4\u5982\u4E0B\uFF1A",paraId:205,tocIndex:54},{value:"\u8BA1\u7B97\u51FA\u5DE6\u53F3\u7AEF\u70B9\u7684\u4E2D\u70B9\u3002\u8BA1\u7B97\u65B9\u5F0F\uFF1Amiddle=(start + end)/2\uFF0C\u53EF\u80FD\u51FA\u73B0\u6574\u6570\u8D8A\u754C\u3002\u4FEE\u6539\u8BA1\u7B97\u65B9\u5F0F\uFF1Amiddle=start+(end-start)/2\u3002",paraId:206,tocIndex:54},{value:"\u5982\u679C\u9700\u8981\u627E\u7684\u503C\u548C\u4E2D\u70B9\u6240\u5728\u7684\u503C\u76F8\u540C\uFF0C\u8FD4\u56DE\u4E2D\u70B9\u4E0B\u6807\u5C31\u597D\u3002",paraId:206,tocIndex:54},{value:"\u5982\u679C\u4E0D\u76F8\u7B49\uFF0C\u6709\u4E24\u79CD\u79FB\u52A8 middle \u7684\u65B9\u5F0F\u3002",paraId:206,tocIndex:54},{value:"\u5982\u679C\u76EE\u6807\u503C\u6BD4\u4E2D\u70B9\u503C\u5C0F(target<arr[middle]>)\uFF0C\u629B\u5F03\u53F3\u8FB9\u8F83\u5927\u7684\u6570\u636E\u641C\u7D22\u5DE6\u8FB9\u7684\u6570\u636E\uFF0C\u4F7F\u5F97 end=middle-1\u3002",paraId:206,tocIndex:54},{value:"\u5982\u679C\u6BD4\u4E2D\u70B9\u503C\u5927\uFF0C\u5219\u7EE7\u7EED\u641C\u7D22\u53F3\u8FB9\u7684\u503C\uFF0C\u662F\u7684 start=middle+1\u3002",paraId:206,tocIndex:54},{value:"\u4EE3\u7801\u6A21\u677F\uFF1A",paraId:207,tocIndex:54},{value:`const binarySearch = (arr, target) => {
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
`,paraId:208,tocIndex:54},{value:`\u53D8\u5F62 1\uFF1A\u7528\u4E8E\u67E5\u627E\u9700\u8981\u8BBF\u95EE\u6570\u7EC4\u4E2D\u5F53\u524D\u7D22\u5F15\u53CA\u5176\u76F4\u63A5\u53F3\u90BB\u5C45\u7D22\u5F15\u7684\u5143\u7D20\u6216\u6761\u4EF6\u3002
\u5173\u952E\u5C5E\u6027\uFF1A`,paraId:209,tocIndex:54},{value:"\u67E5\u627E\u6761\u4EF6\u9700\u8981\u8BBF\u95EE\u5143\u7D20\u7684\u76F4\u63A5\u53F3\u90BB\u5C45\u3002",paraId:210,tocIndex:54},{value:"\u4F7F\u7528\u5143\u7D20\u7684\u53F3\u90BB\u5C45\u6765\u786E\u5B9A\u662F\u5426\u6EE1\u8DB3\u6761\u4EF6\uFF0C\u5E76\u51B3\u5B9A\u662F\u5411\u5DE6\u8FD8\u662F\u5411\u53F3\u3002",paraId:210,tocIndex:54},{value:"\u4FDD\u8BC1\u67E5\u627E\u7A7A\u95F4\u5728\u6BCF\u4E00\u6B65\u4E2D\u81F3\u5C11\u6709 2 \u4E2A\u5143\u7D20\u3002",paraId:210,tocIndex:54},{value:"\u9700\u8981\u8FDB\u884C\u540E\u5904\u7406\u3002 \u5F53\u4F60\u5269\u4E0B 1 \u4E2A\u5143\u7D20\u65F6\uFF0C\u5FAA\u73AF / \u9012\u5F52\u7ED3\u675F\u3002 \u9700\u8981\u8BC4\u4F30\u5269\u4F59\u5143\u7D20\u662F\u5426\u7B26\u5408\u6761\u4EF6\u3002",paraId:210,tocIndex:54},{value:"\u533A\u5206\u8BED\u6CD5\uFF1A",paraId:211,tocIndex:54},{value:"\u521D\u59CB\u6761\u4EF6\uFF1Aleft = 0\uFF0Cright = length",paraId:212,tocIndex:54},{value:"\u7EC8\u6B62\uFF1Aleft === right",paraId:212,tocIndex:54},{value:"\u5411\u5DE6\u67E5\u627E\uFF1Aright = mid",paraId:212,tocIndex:54},{value:"\u5411\u53F3\u67E5\u627E\uFF1Aleft = mid + 1",paraId:212,tocIndex:54},{value:"\u53D8\u5F62 2\uFF1A\u7528\u4E8E\u641C\u7D22\u9700\u8981\u8BBF\u95EE\u5F53\u524D\u7D22\u5F15\u53CA\u5176\u5728\u6570\u7EC4\u4E2D\u7684\u76F4\u63A5\u5DE6\u53F3\u90BB\u5C45\u7D22\u5F15\u7684\u5143\u7D20\u6216\u8005\u6761\u4EF6\u3002",paraId:213,tocIndex:54},{value:"\u5173\u952E\u5C5E\u6027\uFF1A",paraId:214,tocIndex:54},{value:"\u641C\u7D22\u6761\u4EF6\u9700\u8981\u8BBF\u95EE\u5143\u7D20\u7684\u76F4\u63A5\u5DE6\u53F3\u90BB\u5C45\u3002",paraId:215,tocIndex:54},{value:"\u4F7F\u7528\u5143\u7D20\u7684\u90BB\u5C45\u6765\u786E\u5B9A\u5B83\u662F\u5411\u53F3\u8FD8\u662F\u5411\u5DE6\u3002",paraId:215,tocIndex:54},{value:"\u4FDD\u8BC1\u67E5\u627E\u7A7A\u95F4\u5728\u6BCF\u4E2A\u6B65\u9AA4\u4E2D\u81F3\u5C11\u6709 3 \u4E2A\u5143\u7D20\u3002",paraId:215,tocIndex:54},{value:"\u9700\u8981\u8FDB\u884C\u540E\u5904\u7406\u3002\u5F53\u5269\u4E0B 2 \u4E2A\u5143\u7D20\u65F6\uFF0C\u5FAA\u73AF / \u9012\u5F52\u7ED3\u675F\u3002\xA0 \u9700\u8981\u8BC4\u4F30\u5176\u4F59\u5143\u7D20\u662F\u5426\u7B26\u5408\u6761\u4EF6\u3002",paraId:215,tocIndex:54},{value:"\u533A\u5206\u8BED\u6CD5\uFF1A",paraId:216,tocIndex:54},{value:"\u521D\u59CB\u6761\u4EF6\uFF1Aleft = 0\uFF0Cright = length - 1",paraId:217,tocIndex:54},{value:"\u7EC8\u6B62\uFF1Aleft + 1 === right",paraId:217,tocIndex:54},{value:"\u5411\u5DE6\u67E5\u627E\uFF1Aright = mid",paraId:217,tocIndex:54},{value:"\u5411\u53F3\u67E5\u627E\uFF1Aleft = mid",paraId:217,tocIndex:54},{value:`\u7ED9\u5B9A\u4E00\u4E2A\xA0n\xA0\u4E2A\u5143\u7D20\u6709\u5E8F\u7684\uFF08\u5347\u5E8F\uFF09\u6574\u578B\u6570\u7EC4\xA0nums \u548C\u4E00\u4E2A\u76EE\u6807\u503C\xA0target \xA0\uFF0C\u5199\u4E00\u4E2A\u51FD\u6570\u641C\u7D22\xA0nums\xA0\u4E2D\u7684 target\uFF0C\u5982\u679C\u76EE\u6807\u503C\u5B58\u5728\u8FD4\u56DE\u4E0B\u6807\uFF0C\u5426\u5219\u8FD4\u56DE -1\u3002

\u793A\u4F8B 1:
\u8F93\u5165: nums = [-1,0,3,5,9,12], target = 9
\u8F93\u51FA: 4
\u89E3\u91CA: 9 \u51FA\u73B0\u5728 nums \u4E2D\u5E76\u4E14\u4E0B\u6807\u4E3A 4

\u793A\u4F8B\xA02:
\u8F93\u5165: nums = [-1,0,3,5,9,12], target = 2
\u8F93\u51FA: -1
\u89E3\u91CA: 2 \u4E0D\u5B58\u5728 nums \u4E2D\u56E0\u6B64\u8FD4\u56DE -1
`,paraId:218,tocIndex:55},{value:"Leetcode",paraId:219,tocIndex:55},{value:`var search = function (nums, target) {
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
`,paraId:220,tocIndex:55},{value:`\u5347\u5E8F\u6392\u5217\u7684\u6574\u6570\u6570\u7EC4 nums \u5728\u9884\u5148\u672A\u77E5\u7684\u67D0\u4E2A\u70B9\u4E0A\u8FDB\u884C\u4E86\u65CB\u8F6C\uFF08\u4F8B\u5982\uFF0C [0,1,2,4,5,6,7] \u7ECF\u65CB\u8F6C\u540E\u53EF\u80FD\u53D8\u4E3A [4,5,6,7,0,1,2] \uFF09\u3002
\u8BF7\u4F60\u5728\u6570\u7EC4\u4E2D\u641C\u7D22 target \uFF0C\u5982\u679C\u6570\u7EC4\u4E2D\u5B58\u5728\u8FD9\u4E2A\u76EE\u6807\u503C\uFF0C\u5219\u8FD4\u56DE\u5B83\u7684\u7D22\u5F15\uFF0C\u5426\u5219\u8FD4\u56DE -1 \u3002

\u793A\u4F8B 1\uFF1A
\u8F93\u5165\uFF1Anums = [4,5,6,7,0,1,2], target = 0
\u8F93\u51FA\uFF1A4

\u793A\u4F8B 2\uFF1A
\u8F93\u5165\uFF1Anums = [4,5,6,7,0,1,2], target = 3
\u8F93\u51FA\uFF1A-1

\u793A\u4F8B 3\uFF1A
\u8F93\u5165\uFF1Anums = [1], target = 0
\u8F93\u51FA\uFF1A-1
`,paraId:221,tocIndex:56},{value:"Leetcode",paraId:222,tocIndex:56},{value:`
\u5206\u6790\uFF1A\u91C7\u7528\u4E8C\u5206\u67E5\u627E\uFF0C\u53EF\u5957\u7528\u6A21\u677F\u3002\u5F53\u88AB\u5206\u4E3A\u5DE6\u53F3\u6709\u4E24\u90E8\u5206\u7684\u65F6\u5019\uFF0C\u81F3\u5C11\u6709\u4E00\u90E8\u5206\u7684\u6570\u7EC4\u662F\u6709\u5E8F\u7684\uFF0C\u901A\u8FC7 nums[0]\u548C target \u7684\u6BD4\u8F83\u53EF\u4EE5\u5F97\u5230\u6709\u5E8F\u7684\u4E00\u90E8\u5206\u3002\u901A\u8FC7\u548C\u6709\u5E8F\u90E8\u5206\u6765\u5224\u65AD mid \u6539\u5982\u4F55\u8C03\u6574\u3002\u5982\u679C[0,mid-1]\u6709\u5E8F\uFF0C\u5224\u65AD target \u548C nums[0]/nums[mid-1]\u7684\u5927\u5C0F\uFF0C\u786E\u5B9A target \u662F\u5426\u5728\u8BE5\u533A\u95F4\uFF0C\u5982\u679C\u662F\u5C31\u66F4\u65B0 end=mid-1 \u5426\u5219 start=mid+1\uFF1B\u5982\u679C[mid+1\uFF0Clen]\u6709\u5E8F\uFF0C\u540C\u7406\u5224\u65AD target \u548C nums[mid+1]/nums[len]\u7684\u5927\u5C0F\uFF0C\u786E\u5B9A target \u662F\u5426\u5728\u8BE5\u533A\u95F4\uFF0C\u5982\u679C\u662F\u5C31\u66F4\u65B0 start=mid+1 \u5426\u5219 end=mid-1\u3002`,paraId:222,tocIndex:56},{value:`var search = function (nums, target) {
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
    //[0,mid-1]\u662F\u589E\u533A\u95F4
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
`,paraId:223,tocIndex:56},{value:`\u5CF0\u503C\u5143\u7D20\u662F\u6307\u5176\u503C\u5927\u4E8E\u5DE6\u53F3\u76F8\u90BB\u503C\u7684\u5143\u7D20\u3002
\u7ED9\u4F60\u4E00\u4E2A\u8F93\u5165\u6570\u7EC4\xA0nums\uFF0C\u627E\u5230\u5CF0\u503C\u5143\u7D20\u5E76\u8FD4\u56DE\u5176\u7D22\u5F15\u3002\u6570\u7EC4\u53EF\u80FD\u5305\u542B\u591A\u4E2A\u5CF0\u503C\uFF0C\u5728\u8FD9\u79CD\u60C5\u51B5\u4E0B\uFF0C\u8FD4\u56DE \u4EFB\u4F55\u4E00\u4E2A\u5CF0\u503C \u6240\u5728\u4F4D\u7F6E\u5373\u53EF\u3002
\u4F60\u53EF\u4EE5\u5047\u8BBE\xA0nums[-1] = nums[n] = -\u221E \u3002

\u793A\u4F8B 1\uFF1A
\u8F93\u5165\uFF1Anums = [1,2,3,1]
\u8F93\u51FA\uFF1A2
\u89E3\u91CA\uFF1A3 \u662F\u5CF0\u503C\u5143\u7D20\uFF0C\u4F60\u7684\u51FD\u6570\u5E94\u8BE5\u8FD4\u56DE\u5176\u7D22\u5F15 2\u3002

\u793A\u4F8B\xA02\uFF1A
\u8F93\u5165\uFF1Anums = [1,2,1,3,5,6,4]
\u8F93\u51FA\uFF1A1 \u6216 5
\u89E3\u91CA\uFF1A\u4F60\u7684\u51FD\u6570\u53EF\u4EE5\u8FD4\u56DE\u7D22\u5F15 1\uFF0C\u5176\u5CF0\u503C\u5143\u7D20\u4E3A 2\uFF1B\u6216\u8005\u8FD4\u56DE\u7D22\u5F15 5\uFF0C \u5176\u5CF0\u503C\u5143\u7D20\u4E3A 6\u3002
`,paraId:224,tocIndex:57},{value:"Leetcode",paraId:225,tocIndex:57},{value:`
\u5206\u6790\uFF1A\u8FD9\u9053\u9898\u5C5E\u4E8E\u4E0A\u8FF0\u9898\u578B\u7684\u53D8\u5F62 1\u3002\u4E8C\u5206\u601D\u60F3\u83B7\u5F97\u4E2D\u95F4\u5143\u7D20 mid\uFF0C\u7136\u540E\u4E0E mid+1 \u6BD4\u8F83\uFF0C\u5982\u679C mid+1>mid \u7684\u503C\uFF0C\u5CF0\u503C\u53EF\u80FD\u5728 mid \u7684\u53F3\u8FB9\uFF0C\u7F29\u5C0F\u641C\u7D22\u7A7A\u95F4\u4E3A mid \u7684\u53F3\u8FB9\uFF0Cleft=mid+1\uFF1B\u5426\u5219\u5CF0\u503C\u53EF\u80FD\u5728\u5DE6\u8FB9\uFF0C\u7F29\u5C0F\u641C\u7D22\u533A\u57DF\u4E3A mid \u7684\u505A\u8FB9\uFF0C\u5305\u62EC mid\uFF0C\u4F7F\u5F97 right=mid\uFF1B\u4E0D\u65AD\u5730\u7F29\u5C0F\u7A7A\u95F4\uFF0C\u76F4\u81F3\u7A7A\u95F4\u53EA\u6709\u4E00\u4E2A\u5143\u7D20\uFF0C\u8BE5\u5143\u7D20\u4E3A\u5CF0\u503C\u5143\u7D20\u3002`,paraId:225,tocIndex:57},{value:`var findPeakElement = function (nums) {
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
`,paraId:226,tocIndex:57},{value:`\u5047\u8BBE\u6309\u7167\u5347\u5E8F\u6392\u5E8F\u7684\u6570\u7EC4\u5728\u9884\u5148\u672A\u77E5\u7684\u67D0\u4E2A\u70B9\u4E0A\u8FDB\u884C\u4E86\u65CB\u8F6C\u3002\u4F8B\u5982\uFF0C\u6570\u7EC4\xA0[0,1,2,4,5,6,7] \u53EF\u80FD\u53D8\u4E3A\xA0[4,5,6,7,0,1,2] \u3002
\u8BF7\u627E\u51FA\u5176\u4E2D\u6700\u5C0F\u7684\u5143\u7D20\u3002

\u793A\u4F8B 1\uFF1A
\u8F93\u5165\uFF1Anums = [3,4,5,1,2]
\u8F93\u51FA\uFF1A1

\u793A\u4F8B 2\uFF1A
\u8F93\u5165\uFF1Anums = [4,5,6,7,0,1,2]
\u8F93\u51FA\uFF1A0

\u793A\u4F8B 3\uFF1A
\u8F93\u5165\uFF1Anums = [1]
\u8F93\u51FA\uFF1A1

\u6765\u6E90\uFF1A\u529B\u6263\uFF08LeetCode\uFF09
\u94FE\u63A5\uFF1A
\u8457\u4F5C\u6743\u5F52\u9886\u6263\u7F51\u7EDC\u6240\u6709\u3002\u5546\u4E1A\u8F6C\u8F7D\u8BF7\u8054\u7CFB\u5B98\u65B9\u6388\u6743\uFF0C\u975E\u5546\u4E1A\u8F6C\u8F7D\u8BF7\u6CE8\u660E\u51FA\u5904\u3002
`,paraId:227,tocIndex:58},{value:"Leetcode",paraId:228,tocIndex:58},{value:`
\u5206\u6790\uFF1A\u5728 33 \u9898\u4E2D\u5206\u6790\u8FC7\uFF0C\u65CB\u8F6C\u7684\u6570\u7EC4\u5F53\u88AB\u5206\u4E3A\u5DE6\u53F3\u6709\u4E24\u90E8\u5206\u7684\u65F6\u5019\uFF0C\u81F3\u5C11\u6709\u4E00\u90E8\u5206\u7684\u6570\u7EC4\u662F\u6709\u5E8F\u7684\u3002\u5C06 mid \u548C\u5DE6\u53F3\u4E24\u4E2A\u5143\u7D20\u5224\u65AD\u5927\u5C0F\uFF0C\u5982\u679C mid \u5927\u4E8E\u7B2C\u4E00\u4E2A\u5143\u7D20\uFF0C\u7F29\u5C0F\u8303\u56F4\u5230\u53F3\u8FB9[mid+1,len]\uFF1B\u5982\u679C mid \u5C0F\u4E8E\u7B2C\u4E00\u4E2A\u5143\u7D20\uFF0C\u7F29\u5C0F\u8303\u56F4\u5230\u5DE6\u8FB9[0\uFF0Cmid]\u3002\u641C\u7D22\u505C\u6B62\u7684\u6761\u4EF6\uFF1Amid>mid+1 \u65F6\uFF0C\u8FD4\u56DE mid+1 \u7684\u503C\uFF1Bmid<mid-1 \u65F6\uFF0C\u8FD4\u56DE mid\u3002`,paraId:228,tocIndex:58},{value:`var findMin = function (nums) {
  if (nums.length === 1) return nums[0];
  let left = 0;
  let right = nums.length - 1;
  if (nums[left] < nums[right]) return nums[left]; //\u5224\u65AD\u662F\u5426\u65CB\u8F6C
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
`,paraId:229,tocIndex:58},{value:`\u7ED9\u5B9A\u4E00\u4E2A\u6309\u7167\u5347\u5E8F\u6392\u5217\u7684\u6574\u6570\u6570\u7EC4 nums\uFF0C\u548C\u4E00\u4E2A\u76EE\u6807\u503C target\u3002\u627E\u51FA\u7ED9\u5B9A\u76EE\u6807\u503C\u5728\u6570\u7EC4\u4E2D\u7684\u5F00\u59CB\u4F4D\u7F6E\u548C\u7ED3\u675F\u4F4D\u7F6E\u3002
\u5982\u679C\u6570\u7EC4\u4E2D\u4E0D\u5B58\u5728\u76EE\u6807\u503C target\uFF0C\u8FD4\u56DE [-1, -1]\u3002

\u793A\u4F8B 1\uFF1A
\u8F93\u5165\uFF1Anums = [5,7,7,8,8,10], target = 8
\u8F93\u51FA\uFF1A[3,4]

\u793A\u4F8B 2\uFF1A
\u8F93\u5165\uFF1Anums = [5,7,7,8,8,10], target = 6
\u8F93\u51FA\uFF1A[-1,-1]

\u793A\u4F8B 3\uFF1A
\u8F93\u5165\uFF1Anums = [], target = 0
\u8F93\u51FA\uFF1A[-1,-1]
`,paraId:230,tocIndex:59},{value:"Leetcode",paraId:231,tocIndex:59},{value:"\u5206\u6790\uFF1A\u627E\u5230 target \u503C\u5728\u6570\u7EC4\u4E2D\u7684\u5DE6\u53F3\u4E24\u4E2A\u4E0B\u6807\u3002\u5DE6\u4E0B\u6807\u5373\u7B2C\u4E00\u4E2A\u7B49\u4E8E target\uFF0C\u53F3\u4E0B\u6807\u5373\u7B2C\u4E00\u4E2A\u5927\u4E8E target \u7684\u503C-1\u3002\u5728\u4E8C\u5206\u67E5\u627E\u4E2D\uFF0C\u5DE6\u4E0B\u6807\u4E3A\u7B2C\u4E00\u4E2A\u5927\u4E8E\u7B49\u4E8E target \u7684\u503C\uFF0C\u53F3\u4E0B\u6807\u4E3A\u7B2C\u4E00\u4E2A\u5927\u4E8E target \u7684\u503C\u3002\u6CE8\u610F\uFF0Ctarget \u53EF\u80FD\u4E0D\u5B58\u5728\u4E8E nums \u4E2D\uFF0C\u6240\u4EE5\u9700\u8981\u5BF9\u8FD4\u56DE\u7684\u503C\u505A\u5224\u65AD\u3002",paraId:232,tocIndex:59},{value:`var searchRange = function (nums, target) {
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
`,paraId:233,tocIndex:59},{value:`\u4EFB\u4F55\u8BA9\u6C42\u89E3\u6700\u5927/\u6700\u5C0F/\u6700\u9891\u7E41\u7684 K \u4E2A\u5143\u7D20\u7684\u9898\uFF0C\u90FD\u9075\u5FAA\u8FD9\u79CD\u6A21\u5F0F\u3002
\u7528\u6765\u8BB0\u5F55\u8FD9\u79CD\u524D K \u7C7B\u578B\u7684\u6700\u4F73\u6570\u636E\u7ED3\u6784\u662F\u5806\u3002\u8FD9\u79CD\u6A21\u5F0F\u501F\u52A9\u5806\u6765\u89E3\u51B3\u5F88\u591A\u8FD9\u79CD\u524D K \u4E2A\u6570\u503C\u7684\u95EE\u9898\u3002`,paraId:234,tocIndex:60},{value:"\u8BE5\u6A21\u5F0F\uFF1A",paraId:235,tocIndex:60},{value:"\u5C06 K \u4E2A\u5143\u7D20\u63D2\u5165\u5230\u6700\u5C0F\u5806\u6216\u8005\u662F\u6700\u5927\u5806",paraId:236,tocIndex:60},{value:"\u904D\u5386\u5269\u4E0B\u7684\u8FD8\u6CA1\u6709\u8BBF\u95EE\u7684\u5143\u7D20\uFF0C\u5982\u679C\u5F53\u524D\u5143\u7D20\u6BD4\u8FD9\u4E2A\u5806\u9876\u5143\u7D20\u5927\uFF0C\u90A3\u4E48\u628A\u5806\u9876\u5143\u7D20\u5148\u5220\u9664\uFF0C\u518D\u52A0\u5F53\u524D\u5143\u7D20\u8FDB\u53BB\u3002",paraId:236,tocIndex:60},{value:"\u8BC6\u522B\u6700\u5927 K \u4E2A\u5143\u7D20\u6A21\u5F0F\uFF1A",paraId:237,tocIndex:60},{value:"\u5982\u679C\u4F60\u9700\u8981\u6C42\u6700\u5927/\u6700\u5C0F/\u6700\u9891\u7E41\u7684\u524D K \u4E2A\u5143\u7D20",paraId:238,tocIndex:60},{value:"\u5982\u679C\u4F60\u9700\u8981\u901A\u8FC7\u6392\u5E8F\u53BB\u627E\u4E00\u4E2A\u7279\u5B9A\u7684\u6570",paraId:238,tocIndex:60},{value:`\u8F93\u5165\u6574\u6570\u6570\u7EC4 arr \uFF0C\u627E\u51FA\u5176\u4E2D\u6700\u5C0F\u7684 k \u4E2A\u6570\u3002\u4F8B\u5982\uFF0C\u8F93\u51654\u30015\u30011\u30016\u30012\u30017\u30013\u30018\u8FD98\u4E2A\u6570\u5B57\uFF0C\u5219\u6700\u5C0F\u76844\u4E2A\u6570\u5B57\u662F1\u30012\u30013\u30014\u3002

\u793A\u4F8B 1\uFF1A
\u8F93\u5165\uFF1Aarr = [3,2,1], k = 2
\u8F93\u51FA\uFF1A[1,2] \u6216\u8005 [2,1]

\u793A\u4F8B 2\uFF1A
\u8F93\u5165\uFF1Aarr = [0,1,2,1], k = 1
\u8F93\u51FA\uFF1A[0]
`,paraId:239,tocIndex:61},{value:"Leetcode",paraId:240,tocIndex:61},{value:`
\u5206\u6790\uFF1A\u628A\u6570\u7EC4\u5806\u5316\uFF0C\u6784\u5EFA\u53EA\u6709 k \u4E2A\u6570\u7684\u5927\u9876\u5806\uFF0C\u904D\u5386\u5269\u4E0B\u6570\u636E\uFF0C\u5982\u679C\u5806\u9876\u6570\u636E\u5927\u4E8E\u5F53\u524D\u6570\u636E\uFF0C\u5F53\u524D\u6570\u636E\u653E\u5230\u5806\u9876\uFF0C\u7136\u540E\u5411\u4E0B\u5806\u5316\uFF0C\u6EE1\u8DB3\u5927\u9876\u5806\u7279\u70B9\uFF0C\u76F4\u5230\u904D\u5386\u5B8C\u5269\u4F59\u6570\u636E\u3002`,paraId:240,tocIndex:61},{value:`var getLeastNumbers = function (arr, k) {
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
`,paraId:241,tocIndex:61},{value:`\u5728\u672A\u6392\u5E8F\u7684\u6570\u7EC4\u4E2D\u627E\u5230\u7B2C k \u4E2A\u6700\u5927\u7684\u5143\u7D20\u3002\u8BF7\u6CE8\u610F\uFF0C\u4F60\u9700\u8981\u627E\u7684\u662F\u6570\u7EC4\u6392\u5E8F\u540E\u7684\u7B2C k \u4E2A\u6700\u5927\u7684\u5143\u7D20\uFF0C\u800C\u4E0D\u662F\u7B2C k \u4E2A\u4E0D\u540C\u7684\u5143\u7D20\u3002

\u793A\u4F8B 1:
\u8F93\u5165: [3,2,1,5,6,4] \u548C k = 2
\u8F93\u51FA: 5

\u793A\u4F8B 2:
\u8F93\u5165: [3,2,3,1,2,4,5,5,6] \u548C k = 4
\u8F93\u51FA: 4
`,paraId:242,tocIndex:62},{value:"Leetcode",paraId:243,tocIndex:62},{value:`
\u5206\u6790\uFF1A\u627E\u5230\u6570\u7EC4\u4E2D\u7B2C K \u4E2A\u6700\u5927\u5143\u7D20\uFF0C\u5806\u5316\u6210\u5927\u9876\u5806\uFF0C\u7136\u540E\u5220\u9664 k-1 \u6B21\u5806\u9876\u5143\u7D20\u4E4B\u540E\uFF0C\u5806\u9876\u5143\u7D20\u5C31\u662F\u7B2C K \u4E2A\u6700\u5927\u5143\u7D20\u3002`,paraId:243,tocIndex:62},{value:`var findKthLargest = function (nums, k) {
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
`,paraId:244,tocIndex:62},{value:`\u7ED9\u5B9A\u4E00\u4E2A\u975E\u7A7A\u7684\u6574\u6570\u6570\u7EC4\uFF0C\u8FD4\u56DE\u5176\u4E2D\u51FA\u73B0\u9891\u7387\u524D k \u9AD8\u7684\u5143\u7D20\u3002

\u793A\u4F8B 1:
\u8F93\u5165: nums = [1,1,1,2,2,3], k = 2
\u8F93\u51FA: [1,2]

\u793A\u4F8B 2:
\u8F93\u5165: nums = [1], k = 1
\u8F93\u51FA: [1]
`,paraId:245,tocIndex:63},{value:"Leetcode",paraId:246,tocIndex:63},{value:`
\u5206\u6790\uFF1A\u5148\u5F97\u5230\u6BCF\u4E2A\u6570\u5B57\u51FA\u73B0\u7684\u6B21\u6570\u3002\u7136\u540E\u6784\u5EFA k \u4E2A\u6570\u7684\u5C0F\u9876\u5806\u3002\u518D\u904D\u5386\u6570\u636E\uFF0C\u6BCF\u4E2A\u6570\u636E\u548C\u5806\u9876\u6BD4\u8F83\uFF0C\u5982\u679C\u5927\u4E8E\u5806\u9876\u5143\u7D20\u5219\u4EA4\u6362\u7136\u540E\u518D\u5806\u5316\uFF1B\u5426\u5219\u4E0D\u5904\u7406\u3002`,paraId:246,tocIndex:63},{value:`var topKFrequent = function (nums, k) {
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
`,paraId:247,tocIndex:63},{value:`\u6211\u4EEC\u6709\u4E00\u4E2A\u7531\u5E73\u9762\u4E0A\u7684\u70B9\u7EC4\u6210\u7684\u5217\u8868 points\u3002\u9700\u8981\u4ECE\u4E2D\u627E\u51FA K \u4E2A\u8DDD\u79BB\u539F\u70B9 (0, 0) \u6700\u8FD1\u7684\u70B9\u3002\uFF08\u8FD9\u91CC\uFF0C\u5E73\u9762\u4E0A\u4E24\u70B9\u4E4B\u95F4\u7684\u8DDD\u79BB\u662F\u6B27\u51E0\u91CC\u5FB7\u8DDD\u79BB\u3002\uFF09
\u4F60\u53EF\u4EE5\u6309\u4EFB\u4F55\u987A\u5E8F\u8FD4\u56DE\u7B54\u6848\u3002\u9664\u4E86\u70B9\u5750\u6807\u7684\u987A\u5E8F\u4E4B\u5916\uFF0C\u7B54\u6848\u786E\u4FDD\u662F\u552F\u4E00\u7684\u3002

\u793A\u4F8B 1\uFF1A
\u8F93\u5165\uFF1Apoints = [[1,3],[-2,2]], K = 1
\u8F93\u51FA\uFF1A[[-2,2]]
\u89E3\u91CA\uFF1A
(1, 3) \u548C\u539F\u70B9\u4E4B\u95F4\u7684\u8DDD\u79BB\u4E3A sqrt(10)\uFF0C
(-2, 2) \u548C\u539F\u70B9\u4E4B\u95F4\u7684\u8DDD\u79BB\u4E3A sqrt(8)\uFF0C
\u7531\u4E8E sqrt(8) < sqrt(10)\uFF0C(-2, 2) \u79BB\u539F\u70B9\u66F4\u8FD1\u3002
\u6211\u4EEC\u53EA\u9700\u8981\u8DDD\u79BB\u539F\u70B9\u6700\u8FD1\u7684 K = 1 \u4E2A\u70B9\uFF0C\u6240\u4EE5\u7B54\u6848\u5C31\u662F [[-2,2]]\u3002

\u793A\u4F8B 2\uFF1A
\u8F93\u5165\uFF1Apoints = [[3,3],[5,-1],[-2,4]], K = 2
\u8F93\u51FA\uFF1A[[3,3],[-2,4]]\uFF08\u7B54\u6848 [[-2,4],[3,3]] \u4E5F\u4F1A\u88AB\u63A5\u53D7\u3002\uFF09
`,paraId:248,tocIndex:64},{value:"Leetcode",paraId:249,tocIndex:64},{value:`
\u5206\u6790\uFF1A\u601D\u8DEF\u76F8\u540C\uFF0C\u5224\u65AD\u662F\u9700\u8981\u6BD4\u8F83\u4E24\u6570\u7684\u5E73\u65B9\u548C\u3002`,paraId:249,tocIndex:64},{value:`var kClosest = function (points, K) {
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
`,paraId:250,tocIndex:64},{value:`K \u8DEF\u5F52\u5E76\u80FD\u89E3\u51B3\u6D89\u53CA\u591A\u7EC4\u6392\u597D\u5E8F\u7684\u6570\u7EC4\u95EE\u9898\u3002
\u6BCF\u5F53\u8F93\u5165 K \u4E2A\u6392\u597D\u5E8F\u7684\u6570\u7EC4\uFF0C\u53EF\u4EE5\u4F7F\u7528\u5806\u6765\u9AD8\u6548\u987A\u5E8F\u904D\u5386\u5176\u4E2D\u6240\u6709\u6570\u7EC4\u7684\u6240\u6709\u5143\u7D20\u3002\u5C06\u6BCF\u4E2A\u6570\u7EC4\u4E2D\u6700\u5C0F\u7684\u4E00\u4E2A\u5143\u7D20\u52A0\u5165\u6700\u5C0F\u5806\u4E2D\uFF0C\u4ECE\u800C\u5F97\u5230\u5168\u5C40\u6700\u5C0F\u503C\u3002\u5F53\u6211\u4EEC\u62FF\u5230\u8FD9\u4E2A\u5168\u5C40\u6700\u5C0F\u503C\u4E4B\u540E\uFF0C\uFF0C\u518D\u4ECE\u8BE5\u5143\u7D20\u6240\u5728\u7684\u6570\u7EC4\u4E2D\u53D6\u5176\u6328\u7740\u7684\u5143\u7D20\uFF0C\u52A0\u5165\u5806\u3002\u5982\u6B64\u53CD\u590D\u76F4\u5230\u5904\u7406\u5B8C\u6240\u6709\u5143\u7D20\u3002`,paraId:251,tocIndex:65},{value:"\u8BE5\u6A21\u5F0F\u7684\u601D\u8DEF\uFF1A",paraId:252,tocIndex:65},{value:"\u628A\u6BCF\u4E2A\u6570\u7EC4\u4E2D\u7684\u6700\u5C0F\u503C\u52A0\u5165\u5230\u6700\u5C0F\u5806\u4E2D",paraId:253,tocIndex:65},{value:"\u53D6\u51FA\u5806\u9876\u5143\u7D20(\u5168\u5C40\u6700\u5C0F\u503C)\uFF0C\u5C06\u8FD9\u4E2A\u5143\u7D20\u653E\u5165\u6392\u597D\u5E8F\u7684\u96C6\u5408\u91CC\u9762",paraId:253,tocIndex:65},{value:"\u5C06\u521A\u53D6\u51FA\u6765\u7684\u5143\u7D20\u6240\u5728\u6570\u7EC4\u7684\u4E0B\u4E00\u4E2A\u5143\u7D20\u52A0\u5165\u5806\u4E2D",paraId:253,tocIndex:65},{value:"\u91CD\u590D\u6B65\u9AA4 2/3\uFF0C\u76F4\u5230\u5904\u7406\u5B8C\u6240\u6709\u7684\u6570\u5B57",paraId:253,tocIndex:65},{value:"\u8BC6\u522B K \u8DEF\u5F52\u5E76\uFF1A",paraId:254,tocIndex:65},{value:"\u8F93\u5165\u6392\u597D\u5E8F\u7684\u6570\u7EC4\uFF0C\u94FE\u8868\u6216\u8005\u662F\u77E9\u9635",paraId:255,tocIndex:65},{value:"\u8BA9\u54B1\u4EEC\u5408\u5E76\u591A\u4E2A\u6392\u597D\u5E8F\u7684\u96C6\u5408\uFF0C\u6216\u662F\u9700\u8981\u627E\u8FD9\u4E9B\u96C6\u5408\u4E2D\u6700\u5C0F\u7684\u5143\u7D20",paraId:255,tocIndex:65},{value:`\u7ED9\u4F60\u4E00\u4E2A\u94FE\u8868\u6570\u7EC4\uFF0C\u6BCF\u4E2A\u94FE\u8868\u90FD\u5DF2\u7ECF\u6309\u5347\u5E8F\u6392\u5217\u3002
\u8BF7\u4F60\u5C06\u6240\u6709\u94FE\u8868\u5408\u5E76\u5230\u4E00\u4E2A\u5347\u5E8F\u94FE\u8868\u4E2D\uFF0C\u8FD4\u56DE\u5408\u5E76\u540E\u7684\u94FE\u8868\u3002

\u793A\u4F8B 1\uFF1A
\u8F93\u5165\uFF1Alists = [[1,4,5],[1,3,4],[2,6]]
\u8F93\u51FA\uFF1A[1,1,2,3,4,4,5,6]
\u89E3\u91CA\uFF1A\u94FE\u8868\u6570\u7EC4\u5982\u4E0B\uFF1A[1->4->5,1->3->4,2->6]
\u5C06\u5B83\u4EEC\u5408\u5E76\u5230\u4E00\u4E2A\u6709\u5E8F\u94FE\u8868\u4E2D\u5F97\u5230\u3002
1->1->2->3->4->4->5->6
`,paraId:256,tocIndex:66},{value:"Leetcode",paraId:257,tocIndex:66},{value:"\u5206\u6790\uFF1A\u6309\u7740\u6A21\u677F\u601D\u8DEF\uFF0C\u6784\u5EFA\u6700\u5C0F\u5806\u3002\u901A\u8FC7\u94FE\u8868\u7B2C\u4E00\u4E2A\u5143\u7D20\u6784\u5EFA\u6700\u5C0F\u5806\uFF0C\u7136\u540E\u83B7\u53D6\u5806\u9876\u94FE\u8868\uFF0C\u62FF\u5230\u7B2C\u4E00\u4E2A\u5143\u7D20\u5373\u662F\u5F53\u524D\u6700\u5C0F\u5143\u7D20\uFF0C\u653E\u5165\u7ED3\u679C\u503C\u4E2D\uFF0C\u5982\u679C\u5F53\u524D\u94FE\u8868\u8FD8\u6709\u5143\u7D20\u5219\u7EE7\u7EED\u653E\u5165\u6700\u5C0F\u5806\u4E2D\u3002\u76F4\u81F3\u5806\u4E2D\u6CA1\u6709\u6570\u636E\u3002",paraId:258,tocIndex:66},{value:`var mergeKLists = function (lists) {
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
`,paraId:259,tocIndex:66},{value:`\u7ED9\u5B9A\u4E00\u4E2A n x n \u77E9\u9635\uFF0C\u5176\u4E2D\u6BCF\u884C\u548C\u6BCF\u5217\u5143\u7D20\u5747\u6309\u5347\u5E8F\u6392\u5E8F\uFF0C\u627E\u5230\u77E9\u9635\u4E2D\u7B2C k \u5C0F\u7684\u5143\u7D20\u3002
\u8BF7\u6CE8\u610F\uFF0C\u5B83\u662F\u6392\u5E8F\u540E\u7684\u7B2C k \u5C0F\u5143\u7D20\uFF0C\u800C\u4E0D\u662F\u7B2C k \u4E2A\u4E0D\u540C\u7684\u5143\u7D20\u3002

\u793A\u4F8B\uFF1A
matrix = [
   [ 1,  5,  9],
   [10, 11, 13],
   [12, 13, 15]
],
k = 8,
\u8FD4\u56DE 13\u3002
`,paraId:260,tocIndex:67},{value:"Leetcode",paraId:261,tocIndex:67},{value:`
\u5206\u6790\uFF1A\u4E0E\u4E0A\u4E00\u9898\u4E00\u81F4\uFF0C\u53EA\u662F\u6570\u636E\u5904\u7406\u4E0D\u540C`,paraId:261,tocIndex:67},{value:`var kthSmallest = function (matrix, k) {
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
`,paraId:262,tocIndex:67}]}}]);

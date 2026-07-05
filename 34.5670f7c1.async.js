"use strict";(self.webpackChunkblog_of_fbb=self.webpackChunkblog_of_fbb||[]).push([[34],{20034:function(r,e,a){a.r(e),a.d(e,{texts:function(){return n}});const n=[{value:"babel \u7684\u539F\u540D\u53EB 6to5\uFF0C\u7B80\u660E\u627C\u8981\u5C31\u662F es6 \u8F6C es5\uFF0C\u4F46\u662F\u6CA1\u60F3\u5230 es \u6807\u51C6\u63A8\u8FDB\u7684\u8FC7\u5FEB\uFF0C\u77ED\u65F6\u95F4\u5C31\u6709\u4E86 es7/8\uFF0C\u6240\u4EE5\u5B83\u6539\u540D\u4E3A babel",paraId:0},{value:"\u8F6C\u8BD1 ",paraId:1,tocIndex:0},{value:"esnext",paraId:1,tocIndex:0},{value:"/typescript \u7B49\u5230\u76EE\u6807\u73AF\u5883\u652F\u6301\u7684 js",paraId:1,tocIndex:0},{value:"\u7528\u6765\u628A\u4EE3\u7801\u4E2D\u7684 esnext \u7684\u65B0\u7684\u8BED\u6CD5\u3001typescript \u548C ",paraId:2,tocIndex:0},{value:"flow",paraId:2,tocIndex:0},{value:" \u7684\u8BED\u6CD5\u8F6C\u6210\u57FA\u4E8E\u76EE\u6807\u73AF\u5883\u652F\u6301\u7684\u8BED\u6CD5\u7684\u5B9E\u73B0\u3002\u5E76\u4E14\u8FD8\u53EF\u4EE5\u628A\u76EE\u6807\u73AF\u5883\u4E0D\u652F\u6301\u7684 api \u8FDB\u884C polyfill\u3002babel7 \u652F\u6301\u4E86 preset-env\uFF0C\u53EF\u4EE5\u6307\u5B9A targets \u6765\u8FDB\u884C\u6309\u9700\u8F6C\u6362",paraId:2,tocIndex:0},{value:"\u4E00\u4E9B\u7279\u5B9A\u7528\u9014\u7684\u4EE3\u7801\u8F6C\u6362",paraId:3,tocIndex:0},{value:"babel \u662F\u4E00\u4E2A\u8F6C\u8BD1\u5668\uFF0C\u66B4\u9732\u4E86\u5F88\u591A api\uFF0C\u7528\u8FD9\u4E9B api \u53EF\u4EE5\u5B8C\u6210\u4EE3\u7801\u5230 AST \u7684 parse\uFF0CAST \u7684\u8F6C\u6362\uFF0C\u4EE5\u53CA\u76EE\u6807\u4EE3\u7801\u7684\u751F\u6210",paraId:4,tocIndex:0},{value:"\u4EE3\u7801\u7684\u9759\u6001\u5206\u6790",paraId:5,tocIndex:0},{value:"\u5BF9\u4EE3\u7801\u8FDB\u884C parse \u4E4B\u540E\uFF0C\u80FD\u591F\u8FDB\u884C\u8F6C\u6362\uFF0C\u662F\u56E0\u4E3A\u901A\u8FC7 AST \u7684\u7ED3\u6784\u80FD\u591F\u7406\u89E3\u4EE3\u7801\uFF0C\u4E5F\u53EF\u4EE5\u7528\u4E8E\u5206\u6790\u4EE3\u7801\u7684\u4FE1\u606F\uFF0C\u8FDB\u884C\u4E00\u4E9B\u68C0\u67E5",paraId:6,tocIndex:0},{value:`// \u6E90\u4EE3\u7801
const sourceCode = \`
 const a = 1
\`;
// \u8C03\u7528parse\uFF0C\u751F\u6210ast
const ast = parser.parse(sourceCode, {});

// \u8C03\u7528traverse\u6267\u884C\u81EA\u5B9A\u4E49\u7684\u903B\u8F91\uFF0C\u5904\u7406ast\u8282\u70B9
traverse(ast, {});

// \u751F\u6210\u76EE\u6807\u4EE3\u7801
const { code } = generate(ast, {});

console.log('result after deal with\u300B\u3009\u300B\u3009\u300B', code);
`,paraId:7,tocIndex:1},{value:`\u6838\u5FC3@babel/core
`,paraId:8,tocIndex:2},{value:"\u52A0\u8F7D\u5904\u7406\u914D\u7F6E/\u52A0\u8F7D\u63D2\u4EF6",paraId:9,tocIndex:2},{value:"\u8C03\u7528",paraId:9,tocIndex:2},{value:"Parser",paraId:9,tocIndex:2},{value:"\u8FDB\u884C\u8BED\u6CD5\u89E3\u6790\uFF0C\u751F\u6210 AST",paraId:9,tocIndex:2},{value:"\u8C03\u7528",paraId:9,tocIndex:2},{value:"Traverser",paraId:9,tocIndex:2},{value:"\u904D\u5386 AST\uFF0C\u5E76\u4F7F\u7528",paraId:9,tocIndex:2},{value:"\u8BBF\u95EE\u8005\u6A21\u5F0F",paraId:9,tocIndex:2},{value:"\u5E94\u7528\u63D2\u4EF6\u5BF9 AST \u8FDB\u884C\u8F6C\u6362",paraId:9,tocIndex:2},{value:"\u8C03\u7528",paraId:9,tocIndex:2},{value:"Generator",paraId:9,tocIndex:2},{value:"\u751F\u6210\u4EE3\u7801\uFF0C\u5305\u62EC SourceMap \u8F6C\u6362\u548C\u6E90\u4EE3\u7801\u751F\u6210",paraId:9,tocIndex:2},{value:`\u6838\u5FC3\u5468\u8FB9\u652F\u6491
`,paraId:8,tocIndex:2},{value:"Parser: @babel/parser",paraId:10,tocIndex:2},{value:"Traverser: @babel/traverser",paraId:10,tocIndex:2},{value:"Generator: @babel/generator",paraId:10,tocIndex:2},{value:`\u63D2\u4EF6
`,paraId:8,tocIndex:2},{value:"\u8BED\u6CD5\u63D2\u4EF6: \u8BE5\u7C7B\u63D2\u4EF6\u53EA\u5141\u8BB8 Babel \u89E3\u6790\u7279\u5B9A\u7C7B\u578B\u7684\u8BED\u6CD5",paraId:11,tocIndex:2},{value:"\u8F6C\u6362\u63D2\u4EF6: \u7528\u4E8E\u5BF9 AST \u8FDB\u884C\u8F6C\u6362\uFF0C\u5B9E\u73B0\u8F6C\u6362\u4E3A ES5 \u4EE3\u7801\u3001\u538B\u7F29\u3001\u529F\u80FD\u589E\u5F3A\u7B49\u76EE\u7684",paraId:11,tocIndex:2},{value:`\u63D2\u4EF6\u5F00\u53D1\u8F85\u52A9
`,paraId:8,tocIndex:2},{value:"@babel/template: \u53EF\u4EE5\u5C06\u5B57\u7B26\u4E32\u8F6C\u4E3A AST \u8282\u70B9",paraId:12,tocIndex:2},{value:"@babel/types: \u5BF9 AST \u8282\u70B9\u7684\u65AD\u8A00",paraId:12,tocIndex:2},{value:"\u521B\u5EFA\u4E00\u4E2A babel \u9879\u76EE\uFF0C\u5728 src/index.js \u4E2D\uFF0C\u5199\u5165\u5982\u4E0B\u4EE3\u7801",paraId:13,tocIndex:3},{value:`const fn = () => {
  console.log(111);
};
`,paraId:14,tocIndex:3},{value:"\u5982\u679C\u6211\u4EEC\u4EC0\u4E48\u90FD\u4E0D\u914D\u7F6E\uFF0C\u76F4\u63A5\u6267\u884C\u7F16\u8BD1\uFF0C\u4F1A\u53D1\u73B0\u524D\u540E\u7684\u4EE3\u7801\u5B8C\u5168\u4E00\u81F4\u3002\u56E0\u4E3A babel \u662F\u57FA\u4E8E\u63D2\u4EF6\u7684\uFF0C\u6240\u4EE5\u5F53\u6211\u4EEC\u4EC0\u4E48\u63D2\u4EF6\u90FD\u4E0D\u914D\u7F6E\u7684\u65F6\u5019\uFF0Cbabel \u4EC0\u4E48\u90FD\u4E0D\u4F1A\u505A\u3002",paraId:15,tocIndex:3},{value:"\u6211\u4EEC\u60F3\u5C06\u7BAD\u5934\u51FD\u6570\u8F6C\u4E3A ES5 \u51FD\u6570\uFF0C\u53EA\u9700\u8981\u63D0\u4F9B\u4E00\u4E2A\u8F6C\u6362\u7BAD\u5934\u51FD\u6570\u7684\u63D2\u4EF6\u3002",paraId:16,tocIndex:4},{value:"\u5728\u9879\u76EE\u76EE\u5F55\u4E0B\u65B0\u5EFA",paraId:17,tocIndex:4},{value:".babelrc",paraId:17,tocIndex:4},{value:"\u6587\u4EF6\uFF0C\u6DFB\u52A0\u4E0A\u5982\u4E0B\u914D\u7F6E",paraId:17,tocIndex:4},{value:`{
  "plugins": ["@babel/plugin-transform-arrow-functions"]
}
`,paraId:18,tocIndex:4},{value:"\u518D\u4E00\u6B21\u6267\u884C\u7F16\u8BD1\uFF0C\u4F1A\u53D1\u73B0\u4E0A\u8FF0\u4EE3\u7801\u4E2D\u7684\u7BAD\u5934\u51FD\u6570\u5DF2\u7ECF\u6210\u529F\u88AB\u7F16\u8BD1\uFF0C\u4EE3\u7801\u5982\u4E0B:",paraId:19,tocIndex:4},{value:`const fn = function () {
  console.log(111);
};

// ===== \u7F16\u8BD1\u540E\u7684\u7ED3\u679C ===== //

var fn = function fn() {
  console.log(111);
};
`,paraId:20,tocIndex:4},{value:"\u5982\u679C\u6211\u4EEC\u8FD8\u9700\u8981\u652F\u6301\u89E3\u6784\u8BED\u6CD5\uFF0C\u90A3\u4E48\u6211\u4EEC\u9700\u8981\u7ED9\u5B83\u914D\u7F6E",paraId:21,tocIndex:4},{value:'"@babel/plugin-transform-destructuring"',paraId:21,tocIndex:4},{value:"\u63D2\u4EF6\u3002",paraId:21,tocIndex:4},{value:`{
  "plugins": [
    "@babel/plugin-transform-arrow-functions",
    "@babel/plugin-transform-destructuring"
  ]
}
`,paraId:22,tocIndex:4},{value:"\u63D2\u4EF6\u662F\u6709\u4E00\u4E2A\u6267\u884C\u987A\u5E8F\u7684\uFF0C\u63D2\u4EF6\u662F\u4ECE\u4E0A\u5F80\u4E0B\u6267\u884C\u7684\uFF0C\u6240\u4EE5 Babel \u5728\u904D\u5386 AST \u65F6\u4F1A\u5148\u8C03\u7528",paraId:23,tocIndex:4},{value:"@babel/plugin-transform-arrow-functions",paraId:23,tocIndex:4},{value:"\u5B9A\u4E49\u7684\u8F6C\u6362\u65B9\u6CD5\uFF0C\u7136\u540E\u518D\u8C03\u7528",paraId:23,tocIndex:4},{value:"@babel/plugin-transform-destructuring",paraId:23,tocIndex:4},{value:"\u{1F914} \u53D1\u73B0\u95EE\u9898\u6240\u5728\uFF0C\u5982\u679C\u6211\u4EEC\u9700\u8981\u8F6C\u6362\u7684\u8BED\u6CD5\u5F88\u591A\uFF0C\u90A3\u5C82\u4E0D\u662F\u9700\u8981\u624B\u52A8\u914D\u7F6E\u5F88\u591A\u63D2\u4EF6\uFF0C\u5B9E\u5728\u7E41\u7410\u3002",paraId:24,tocIndex:4},{value:"preset \u7684\u51FA\u73B0\u5C31\u662F\u4E3A\u4E86\u89E3\u51B3\u4E0A\u8FF0\u95EE\u9898\u3002\u901A\u8FC7\u6DFB\u52A0/\u521B\u5EFA\u4E00\u4E2A preset \u5C31\u53EF\u4EE5\u8F7B\u677E\u7684\u4F7F\u7528\u4E00\u7EC4\u63D2\u4EF6\u3002\u5B98\u65B9\u4E5F\u4E3A\u6211\u4EEC\u63D0\u4F9B\u4E86\u5F88\u591A\u7684 presets",paraId:25,tocIndex:5},{value:`{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript"
  ]
}
`,paraId:26,tocIndex:6},{value:"\u524D\u9762\u63D0\u5230 plugins \u7684\u6267\u884C\u987A\u5E8F\u662F\u4ECE\u4E0A\u5F80\u4E0B\uFF0C\u800C preset \u7684\u6267\u884C\u987A\u5E8F\u6070\u6070\u76F8\u53CD\uFF0C\u662F\u4ECE\u4E0B\u5F80\u4E0A\u6267\u884C\u7684\u3002\u5E76\u4E14 plugins \u7684\u6267\u884C\u5148\u4E8E preset",paraId:27,tocIndex:6},{value:"@babel/preset-stage-xxx",paraId:28,tocIndex:7},{value:"stage-xxx \u662F\u4E0D\u540C\u9636\u6BB5\u8BED\u6CD5\u63D0\u6848\u7684\u8F6C\u7801\u89C4\u5219\u800C\u4EA7\u751F\u7684\u9884\u8BBE\uFF0C\u968F\u7740\u88AB\u6279\u51C6\u4E3A ES \u65B0\u7248\u672C\u7684\u7EC4\u6210\u90E8\u5206\u800C\u8FDB\u884C\u76F8\u5E94\u7684\u6539\u53D8",paraId:29,tocIndex:7},{value:"stage-0",paraId:30,tocIndex:7},{value:" - \u8BBE\u60F3(Strawman): \u53EA\u662F\u4E00\u4E2A\u60F3\u6CD5\uFF0C\u53EF\u80FD\u6709 Babel \u63D2\u4EF6\uFF0Cstage-0 \u7684\u529F\u80FD\u8303\u56F4\u6700\u5E7F\u5927\uFF0C\u5305\u542B stage-1 , stage-2 \u4EE5\u53CA stage-3 \u7684\u6240\u6709\u529F\u80FD",paraId:30,tocIndex:7},{value:"stage-1",paraId:30,tocIndex:7},{value:" - \u5EFA\u8BAE(Proposal): \u8FD9\u662F\u503C\u5F97\u8DDF\u8FDB\u7684",paraId:30,tocIndex:7},{value:"stage-2",paraId:30,tocIndex:7},{value:" - \u8349\u6848(Draft): \u521D\u59CB\u89C4\u8303",paraId:30,tocIndex:7},{value:"stage-3",paraId:30,tocIndex:7},{value:" - \u5019\u9009(Candidate): \u5B8C\u6210\u89C4\u8303\u5E76\u5728\u6D4F\u89C8\u5668\u4E0A\u521D\u6B65\u5B9E\u73B0",paraId:30,tocIndex:7},{value:"stage-4 - \u5B8C\u6210(Finished): \u5C06\u6DFB\u52A0\u5230\u4E0B\u4E00\u4E2A\u5E74\u5EA6\u7248\u672C\u53D1\u5E03\u4E2D",paraId:30,tocIndex:7},{value:"@babel/preset-es2015",paraId:31,tocIndex:7},{value:"ES \u7684\u6807\u51C6\u4E00\u5E74\u4E00\u4E2A\u7248\u672C\uFF0C\u610F\u5473\u7740 babel \u63D2\u4EF6\u9700\u8981\u53BB\u5B9E\u65F6\u8DDF\u8FDB\uFF0Ces6 \u8BED\u6CD5\u91C7\u7528",paraId:32,tocIndex:7},{value:"@babel/preset-es2015",paraId:32,tocIndex:7},{value:"\uFF0Ces7 \u8BED\u6CD5\u5C31\u9700\u8981\u5F15\u5165",paraId:32,tocIndex:7},{value:"@babel/preset-es2016",paraId:32,tocIndex:7},{value:"\uFF0C\u5982\u679C\u662F\u4E00\u4E9B\u8FD8\u672A\u52A0\u5165\u6807\u51C6\u7684\u8BED\u6CD5\u5C31\u9700\u8981\u7528\u4E0A\u8FF0\u8BB2\u7684 stage0/stage1 \u7B49",paraId:32,tocIndex:7},{value:"\u4E0A\u8FF0\u8BB2\u7684 preset-stage-xxx/preset-es20xx \u90FD\u662F babel6 \u7684\u4EA7\u7269\uFF0C\u4F9D\u65E7\u4F1A\u53D1\u73B0\u4E00\u4E9B\u95EE\u9898\uFF0Cpreset \u96BE\u4EE5\u7EF4\u62A4\uFF0CES \u7684\u6807\u51C6\u53D8\u5316\u6BD4\u8F83\u5FEB\uFF0C\u610F\u5473\u7740 stage-xxx \u53D8\u5F97\u4E5F\u5F88\u5FEB\u3002\u5982\u679C\u76EE\u6807\u73AF\u5883\u5DF2\u7ECF\u652F\u6301\u4E86 ES6+ \u7279\u6027\uFF0C\u90A3\u6211\u4EEC\u5C31\u4E0D\u7528\u505A\u8F6C\u6362\u4E86\u3002",paraId:33,tocIndex:7},{value:"babel7 \u4E2D\uFF0C\u6DD8\u6C70\u4E86\u4E0A\u8FF0\u7684 preset-es20xx\uFF0C\u5F00\u59CB\u63A8\u884C preset/env",paraId:34,tocIndex:8},{value:"preset-env \u53EF\u4EE5\u4F7F\u7528 es6+\u8BED\u6CD5\u53BB\u5199\u4EE3\u7801\uFF0C\u5E76\u4E14\u53EA\u8F6C\u6362\u9700\u8981\u8F6C\u6362\u7684\u4EE3\u7801\u3002",paraId:35,tocIndex:8},{value:"\u9ED8\u8BA4\u60C5\u51B5\u4E0B\uFF0Cpreset-env \u4EC0\u4E48\u90FD\u4E0D\u9700\u8981\u914D\u7F6E\uFF0C\u5B83\u4F1A\u9ED8\u8BA4\u8F6C\u6362\u6240\u6709\u7684 es6+\u7684\u4EE3\u7801\u3002\u63D0\u4F9B\u4E86 targets \u914D\u7F6E\u9879\u5236\u5B9A\u8FD0\u884C\u73AF\u5883\u3002",paraId:36,tocIndex:8},{value:"\u4FEE\u6539 .babelrc \u6587\u4EF6\uFF0C\u4FEE\u6539\u4E3A\u5982\u4E0B\u914D\u7F6E",paraId:37,tocIndex:8},{value:`{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": "ie >= 10" // \u8868\u660E\u53EA\u6709\u5728ie10\u4EE5\u4E0A\u7248\u672C\u6D4F\u89C8\u5668\u4E0D\u652F\u6301\u7684\u8BED\u6CD5\u624D\u4F1A\u88AB\u8F6C\u6362
      }
    ]
  ]
}
`,paraId:38,tocIndex:8},{value:"\u4FEE\u6539 src/index.js",paraId:39,tocIndex:8},{value:`const arr = [1, 2, 3, 4];
const arr1 = [...arr];
arr.includes(1);
const p = new Promise((resolve, reject) => {
  resolve('FBB');
});

// ===== \u7F16\u8BD1\u540E\u7684\u7ED3\u679C ===== //

('use strict');

var arr = [1, 2, 3, 4];
var arr1 = [].concat(arr);
arr.includes(1);
var p = new Promise(function (resolve, reject) {
  resolve('FBB');
}); // includes/Promise\u7ADF\u7136\u6CA1\u6709\u88AB\u8F6C\u6362\uFF1F\uFF1F\uFF1F\uFF1F
`,paraId:40,tocIndex:8},{value:"\u{1F914} ES6 \u589E\u52A0\u7684\u5185\u5BB9\u53EF\u4EE5\u5206\u4E3A\u8BED\u6CD5\u548C api \u4E24\u4E2A\u90E8\u5206\u3002\u65B0\u8BED\u6CD5\u6BD4\u5982\u7BAD\u5934\u51FD\u6570/\u89E3\u6784/class \u7B49\uFF0C\u65B0\u7684 api \u6BD4\u5982 Set/Map/Promise/Array \u539F\u578B\u94FE\u4E0A\u7B49\u3002",paraId:41,tocIndex:8},{value:"\u8BED\u6CD5\u8F6C\u6362\u53EA\u662F\u5C06\u9AD8\u7248\u672C\u8BED\u6CD5\u8F6C\u4E3A\u4F4E\u7248\u672C\u7684\uFF0C\u4F46\u662F\u65B0\u7684\u5185\u7F6E\u51FD\u6570/\u5B9E\u4F8B\u65B9\u6CD5\u7B49\u65E0\u6CD5\u8F6C\u6362\u3002\u6240\u4EE5\u8FD9\u65F6 polyfill \u51FA\u73B0\u4E86\u3002",paraId:42,tocIndex:8},{value:"polyfill \u662F\u57AB\u7247\u7684\u610F\u601D\uFF0C\u6240\u8C13\u57AB\u7247\u5C31\u662F\u62B9\u5E73\u4E0D\u540C\u6D4F\u89C8\u5668\u6216\u8005\u4E0D\u540C\u73AF\u5883\u4E0B\u7684\u5DEE\u5F02\uFF0C\u8BA9\u65B0\u7684\u5185\u7F6E\u51FD\u6570\u3001\u5B9E\u4F8B\u65B9\u6CD5\u7B49\u5728\u4F4E\u7248\u672C\u6D4F\u89C8\u5668\u4E2D\u4E5F\u53EF\u4EE5\u4F7F\u7528",paraId:43,tocIndex:9},{value:"\u4E3A\u6211\u4EEC\u7684\u4EE3\u7801\u6DFB\u52A0 @babel/polyfill\uFF0C\u76F4\u63A5\u5728 src/index.js \u524D\u5F15\u5165\u8BE5\u5305",paraId:44,tocIndex:9},{value:`import '@babel/polyfill';

const arr = [1, 2, 3, 4];
const arr1 = [...arr];
arr.includes(1);
const p = new Promise((resolve, reject) => {
  resolve('FBB');
});

// ===== \u7F16\u8BD1\u540E\u7684\u7ED3\u679C ===== //

('use strict');

require('@babel/polyfill');

var arr = [1, 2, 3, 4];
var arr1 = [].concat(arr);
arr.includes(1);
var p = new Promise(function (resolve, reject) {
  resolve('FBB');
});
`,paraId:45,tocIndex:9},{value:"\u7ECF\u8FC7 babel \u7F16\u8BD1\u540E\u7684\u5185\u5BB9\uFF0C\u5176\u5B9E\u4E5F\u662F\u5F15\u5165\u4E86 @babel/polyfill \u7684\u5305\uFF0C\u8FD9\u4E2A\u65F6\u5019\u91C7\u7528\u7684\u662F\u5168\u91CF\u5F15\u5165\uFF0C\u4E0D\u7BA1\u6709\u65E0\u4F7F\u7528\u7684 API \u90FD\u4F1A\u88AB\u5F15\u5165",paraId:46,tocIndex:9},{value:"\u{1F914} \u90A3\u5176\u5B9E\u6211\u4EEC\u4EE3\u7801\u53EA\u9700\u8981 Promise \u548C includes \u7684 polyfill\uFF0C\u90A3\u6709\u6CA1\u6709\u4E00\u79CD\u6309\u9700\u52A0\u8F7D\u7684\u529F\u80FD\uFF1F\u5F53\u7136\u6709\uFF0Cbabel \u4E0D\u4F1A\u8FDE\u8FD9\u4E48\u8822\u7684\u95EE\u9898\u90FD\u4E0D\u89E3\u51B3\u3002",paraId:47,tocIndex:9},{value:"\u5728\u56DE\u5230\u4E0A\u4E00\u8282\u6240\u8BB2\u7684 @babel/preset-env\uFF0C\u6211\u4EEC\u521A\u521A\u63D0\u5230\u4E86 target \u914D\u7F6E\u9879\u662F\u7528\u4E8E\u6807\u8BC6\u76EE\u6807\u73AF\u5883\u3002useBuiltIns \u8BE5\u914D\u7F6E\u662F\u7528\u4E8E\u505A polyfill \u7684\uFF0C\u6211\u4EEC\u5728 .babelrc \u4E2D\u52A0\u5165\u8BE5\u914D\u7F6E\u9879\uFF0Cbabel \u7F16\u8BD1\u65F6\u5C31\u4F1A\u81EA\u52A8\u8FDB\u884C polyfill\uFF0C\u4E0D\u9700\u8981\u6211\u4EEC\u5728\u624B\u52A8\u5F15\u5165",paraId:48,tocIndex:10},{value:"useBuiltIns \u7684\u53C2\u6570:",paraId:49,tocIndex:10},{value:"false: \u4E0D\u4F1A\u5BF9 polyfill \u505A\u64CD\u4F5C\uFF0C\u5F15\u5165 @babel/polyfill \u4E4B\u540E\u4F1A\u5168\u91CF\u5F15\u5165",paraId:50,tocIndex:10},{value:"usage: \u4F1A\u6839\u636E\u914D\u7F6E\u7684\u76EE\u6807\u73AF\u5883\u7684\u517C\u5BB9\u6027\u4EE5\u53CA\u4EE3\u7801\u4E2D\u4F7F\u7528\u7684 API \u6765\u8FDB\u884C polyfill\uFF0C\u5B9E\u73B0\u6309\u9700\u52A0\u8F7D",paraId:50,tocIndex:10},{value:"entry: \u4F1A\u6839\u636E\u914D\u7F6E\u7684\u6D4F\u89C8\u5668\u517C\u5BB9\uFF0C\u5F15\u5165\u6D4F\u89C8\u5668\u4E0D\u517C\u5BB9\u7684 \xA0polyfill\uFF0C\u9700\u8981\u5728\u5165\u53E3\u6587\u4EF6\u624B\u52A8\u6DFB\u52A0",paraId:50,tocIndex:10},{value:"import '@babel/polyfill'",paraId:50,tocIndex:10},{value:"\u3002\u5982\u679C\u6307\u5B9A\u7684",paraId:50,tocIndex:10},{value:'"corejs": "3"',paraId:50,tocIndex:10},{value:"\uFF0C\u5219\u9700\u8981\u5F15\u5165",paraId:50,tocIndex:10},{value:"import 'core-js/stable'; import 'regenerator-runtime/runtime'",paraId:50,tocIndex:10},{value:"\u{1F4A1} ",paraId:51},{value:"core-js",paraId:51},{value:"\u662F JavaScript \u7684\u6A21\u5757\u5316\u6807\u51C6\u5E93\uFF0C\u5305\u542B \xA0",paraId:51},{value:"Promise/Symbol/Iterator",paraId:51},{value:" \u548C\u8BB8\u591A\u5176\u4ED6\u7684\u7279\u6027\uFF0C\u5B83\u53EF\u4EE5\u8BA9\u4F60\u4EC5\u52A0\u8F7D\u5FC5\u9700\u7684\u529F\u80FD\u3002core-js@2.0\u7684\u7248\u672C\u5DF2\u7ECF\u4E4B\u51BB\u7ED3\uFF0C\u6240\u6709\u7684\u65B0\u7279\u6027\u53EA\u4F1A\u6DFB\u52A0\u5230 3.0 \u7684\u5206\u652F\u4E2D",paraId:51},{value:`{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": "ie >= 10",
        "useBuiltIns": "usage",
        "corejs": "3" // \u58F0\u660E corejs \u7248\u672C
      }
    ]
  ]
}
`,paraId:52},{value:"\u6E90\u4EE3\u7801\u4EE5\u53CA\u8F6C\u6362\u4E4B\u540E\u7684\u4EE3\u7801",paraId:53},{value:`const arr = [1, 2, 3, 4];
const arr1 = [...arr];
arr.includes(1);
const p = new Promise((resolve, reject) => {
  resolve('FBB');
});

// ===== \u7F16\u8BD1\u540E\u7684\u7ED3\u679C ===== //

('use strict');

require('core-js/modules/es.array.concat.js');

require('core-js/modules/es.array.includes.js');

require('core-js/modules/es.object.to-string.js');

require('core-js/modules/es.promise.js');

var arr = [1, 2, 3, 4];
var arr1 = [].concat(arr);
arr.includes(1);
var p = new Promise(function (resolve, reject) {
  resolve('FBB');
});
`,paraId:54},{value:"\u{1F914}\xA0@babel/preset-env \u662F\u5982\u4F55\u5B9E\u73B0\u6309\u9700\u52A0\u8F7D\u7684\u5462\uFF1F",paraId:55},{value:"\u9996\u5148\u6211\u4EEC\u5728 @babel/preset-env \u7684 target \u914D\u7F6E\u9879\u4E2D\uFF0C\u53EF\u4EE5\u8BBE\u7F6E\u76EE\u6807\u73AF\u5883\u3002\u5728\u4E0A\u9762\u7684\u793A\u4F8B\u4E2D\u6211\u4EEC\u8BBE\u7F6E\u7684\u73AF\u5883\u662F ie10+\uFF0Ctargets \u662F ",paraId:56},{value:"browserlist",paraId:56},{value:" \u7684\u67E5\u8BE2\u5B57\u7B26\u4E32\uFF0C\u80FD\u591F\u83B7\u5F97\u9879\u76EE\u4E2D\u7684\u76EE\u6807\u6D4F\u89C8\u5668\u73AF\u5883\u4FE1\u606F",paraId:56},{value:"\u5F53\u6211\u4EEC\u62FF\u5230\u6240\u6709\u7684\u6D4F\u89C8\u5668\u4FE1\u606F\u4E4B\u540E\uFF0C\u6211\u4EEC\u8FD8\u9700\u8981\u77E5\u9053\u6BCF\u4E2A\u7279\u6027\u5728\u4E0D\u540C\u7248\u672C\u6D4F\u89C8\u5668\u662F\u5426\u652F\u6301\uFF0C",paraId:57},{value:"babel-compat-data",paraId:57},{value:" \u4E2D\u5C31\u5B58\u653E\u4E86\u8BE5\u5185\u5BB9\u3002",paraId:57},{value:"\u6709\u4E86\u6D4F\u89C8\u5668\u7248\u672C\uFF0C\u5DF2\u7ECF\u6BCF\u4E2A\u7279\u6027\u652F\u6301\u7684\u6D4F\u89C8\u5668\u7248\u672C\uFF0C\u90A3\u6211\u4EEC\u5C31\u80FD\u591F\u77E5\u9053\u5F53\u524D\u76EE\u6807\u6D4F\u89C8\u5668\u652F\u6301\u548C\u4E0D\u652F\u6301\u7684\u7279\u6027\u3002\u5BF9\u4E8E\u4E0D\u652F\u6301\u7684\u7279\u6027\u505A\u8F6C\u6362\u548C polyfill\u3002",paraId:58},{value:"\u4E0A\u8FF0\u8BB2\u5B8C\u4E86\u6309\u9700\u5F15\u5165\uFF0C\u4F1A\u6709\u4E00\u4E2A\u65B0\u7684\u95EE\u9898\u7B49\u5F85\u6211\u4EEC\u53BB\u89E3\u51B3\uFF0C\u770B\u5982\u4E0B\u4EE3\u7801",paraId:59,tocIndex:11},{value:`class Person {
  constructor() {}
  say(word) {
    console.log(':::', word);
  }
}

// ===== \u7F16\u8BD1\u540E\u7684\u7ED3\u679C ===== //

('use strict');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, 'prototype', { writable: false });
  return Constructor;
}

var Person = /*#__PURE__*/ (function () {
  function Person() {
    _classCallCheck(this, Person);
  }

  _createClass(Person, [
    {
      key: 'say',
      value: function say(word) {
        console.log(':::', word);
      },
    },
  ]);

  return Person;
})();
`,paraId:60,tocIndex:11},{value:"\u5176\u4E2D\u6709",paraId:61,tocIndex:11},{value:"_createClass",paraId:61,tocIndex:11},{value:"/",paraId:61,tocIndex:11},{value:"_defineProperties",paraId:61,tocIndex:11},{value:"/",paraId:61,tocIndex:11},{value:"_classCallCheck",paraId:61,tocIndex:11},{value:"\u4E09\u4E2A\u8F85\u52A9\u51FD\u6570\uFF0C\u5047\u8BBE\u6211\u4EEC\u6709 10 \u4E2A\u6587\u4EF6\u4E2D\u90FD\u4F7F\u7528\u4E86 class \u8BED\u6CD5\uFF0C\u90A3\u4E48\u8FD9\u4E09\u4E2A\u8F85\u52A9\u51FD\u6570\u4F1A\u5728\u6CE8\u5165\u5341\u6B21\u3002\u8FD9\u4F1A\u4F7F\u5F97\u6211\u4EEC\u6253\u5305\u7684\u4EE3\u7801\u53D8\u5927\uFF0C\u5E76\u4E14\u6211\u4EEC\u4E0D\u9700\u8981\u8FD9\u6837\u7684\u8F85\u52A9\u51FD\u6570\u88AB\u6CE8\u5165\u591A\u6B21",paraId:61,tocIndex:11},{value:"\u8FD9\u65F6\u5019",paraId:62,tocIndex:11},{value:"@babel/plugin-transform-runtime",paraId:62,tocIndex:11},{value:"\u5C31\u95EA\u4EAE\u767B\u573A\u4E86\u3002\u4F7F\u7528",paraId:62,tocIndex:11},{value:"@babel/plugin-transform-runtime",paraId:62,tocIndex:11},{value:"\u63D2\u4EF6\uFF0C\u6240\u6709\u5E2E\u52A9\u7A0B\u5E8F\u90FD\u5C06\u5F15\u7528\u6A21\u5757",paraId:62,tocIndex:11},{value:"@babel/runtime",paraId:62,tocIndex:11},{value:"\uFF0C\u8FD9\u6837\u5C31\u53EF\u4EE5\u907F\u514D\u7F16\u8BD1\u540E\u7684\u4EE3\u7801\u4E2D\u51FA\u73B0\u91CD\u590D\u7684\u5E2E\u52A9\u7A0B\u5E8F\uFF0C\u6709\u6548\u51CF\u5C11\u5305\u4F53\u79EF",paraId:62,tocIndex:11},{value:"\u9996\u5148\u5B89\u88C5\u4F9D\u8D56\uFF0C",paraId:63,tocIndex:11},{value:"@babel/plugin-transform-runtime",paraId:63,tocIndex:11},{value:"\u901A\u5E38\u4EC5\u5728\u5F00\u53D1\u65F6\u4F7F\u7528\uFF0C\u4F46\u662F\u8FD0\u884C\u65F6\u6700\u7EC8\u4EE3\u7801\u9700\u8981\u4F9D\u8D56",paraId:63,tocIndex:11},{value:"@babel/runtime",paraId:63,tocIndex:11},{value:"\uFF0C\u6240\u4EE5",paraId:63,tocIndex:11},{value:"@babel/runtime",paraId:63,tocIndex:11},{value:"\u5FC5\u987B\u8981\u4F5C\u4E3A\u751F\u4EA7\u4F9D\u8D56\u88AB\u5B89\u88C5",paraId:63,tocIndex:11},{value:"\u4FEE\u6539 .babelrc \u5982\u4E0B",paraId:64,tocIndex:11},{value:`{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": "ie >= 10",
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ]
  ],
  "plugins": [["@babel/plugin-transform-runtime"]]
}
`,paraId:65,tocIndex:11},{value:"\u518D\u6B21\u7F16\u8BD1\u6211\u4EEC\u5F97\u5230\u5982\u4E0B\u7684\u4EE3\u7801\uFF0C\u6211\u4EEC\u53D1",paraId:66,tocIndex:11},{value:"_createClass",paraId:66,tocIndex:11},{value:"/",paraId:66,tocIndex:11},{value:"_defineProperties",paraId:66,tocIndex:11},{value:"/",paraId:66,tocIndex:11},{value:"_classCallCheck",paraId:66,tocIndex:11},{value:"\u4E09\u4E2A\u51FD\u6570\u90FD\u662F\u4ECE babel/runtime \u4E2D\u5F15\u5165\u7684\u4E86",paraId:66,tocIndex:11},{value:`'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

var _classCallCheck2 = _interopRequireDefault(
  require('@babel/runtime/helpers/classCallCheck'),
);

var _createClass2 = _interopRequireDefault(
  require('@babel/runtime/helpers/createClass'),
);

var Person = /*#__PURE__*/ (function () {
  function Person() {
    (0, _classCallCheck2.default)(this, Person);
  }

  (0, _createClass2.default)(Person, [
    {
      key: 'say',
      value: function say(word) {
        console.log(':::', word);
      },
    },
  ]);
  return Person;
})();
`,paraId:67,tocIndex:11},{value:"\u8FD9\u6837\u7684\u8BDD\u5C31\u89E3\u51B3\u4E86\u4EE3\u7801\u5197\u4F59\u7684\u95EE\u9898\uFF0C\u518D\u56DE\u5230\u6211\u4EEC\u521A\u521A\u4F7F\u7528 useBuiltIns \u5B9E\u73B0\u6309\u9700\u52A0\u8F7D\u7684\u4F8B\u5B50\u4E2D\uFF0C\u7ECF\u8FC7\u7F16\u8BD1\u6211\u4EEC\u53D1\u73B0\u4F1A\u5F15\u5165\u5982\u4E0B\u51E0\u4E2A\u6587\u4EF6",paraId:68,tocIndex:11},{value:`const arr = [1, 2, 3, 4];
const arr1 = [...arr];
arr.includes(1);
const p = new Promise((resolve, reject) => {
  resolve('FBB');
});

// ===== \u7F16\u8BD1\u540E\u7684\u7ED3\u679C ===== //

('use strict');

require('core-js/modules/es.array.concat.js');

require('core-js/modules/es.array.includes.js');

require('core-js/modules/es.object.to-string.js');

require('core-js/modules/es.promise.js');

var arr = [1, 2, 3, 4];
var arr1 = [].concat(arr);
arr.includes(1);
var p = new Promise(function (resolve, reject) {
  resolve('FBB');
});
`,paraId:69,tocIndex:11},{value:"Array.prototype",paraId:70,tocIndex:11},{value:"\u4E0A\u65B0\u589E\u4E86",paraId:70,tocIndex:11},{value:"includes",paraId:70,tocIndex:11},{value:"\u65B9\u6CD5\uFF0C\u5E76\u4E14\u65B0\u589E\u4E86\u5168\u5C40\u7684",paraId:70,tocIndex:11},{value:"Promise",paraId:70,tocIndex:11},{value:"\u65B9\u6CD5\uFF0C\u6C61\u67D3\u4E86\u5168\u5C40\u73AF\u5883\u3002\u5BF9\u4E8E\u4E00\u4E2A\u5E94\u7528\u7A0B\u5E8F\u6765\u8BF4\uFF0C\u8FD9\u5E76\u4E0D\u4F1A\u6709\u4EC0\u4E48\u95EE\u9898\u3002\u4F46\u662F\u5982\u679C\u6211\u4EEC\u7684\u4EE3\u7801\u4F1A\u505A\u4E3A\u4E00\u4E2A\u5E93\u53D1\u5E03\u5E76\u63D0\u4F9B\u7ED9\u522B\u4EBA\u4F7F\u7528\u5C31\u4F1A\u51FA\u73B0\u95EE\u9898",paraId:70,tocIndex:11},{value:"\u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528",paraId:71,tocIndex:11},{value:"@babel/plugin-transform-runtime",paraId:71,tocIndex:11},{value:"\u6765\u5E2E\u6211\u4EEC\u89E3\u51B3\u8FD9\u4E2A\u95EE\u9898",paraId:71,tocIndex:11},{value:"\u4FEE\u6539\u6211\u4EEC .babelrc \u6587\u4EF6",paraId:72,tocIndex:11},{value:`{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": "ie >= 10"
      }
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": "3.0"
      }
    ]
  ]
}
`,paraId:73,tocIndex:11},{value:"\u91CD\u65B0\u7F16\u8BD1\u4E4B\u540E\u4F1A\u5F97\u5230\u5982\u4E0B\u7ED3\u679C\uFF0C\u53D1\u73B0\u6700\u7EC8\u8F6C\u6362\u540E\u7684\u6587\u4EF6\u4E0D\u4F1A\u518D\u51FA\u73B0 polyfill \u7684 require \u65B9\u6CD5\u4E86\u3002\u53EF\u4EE5\u770B\u51FA\uFF0C\u6CA1\u6709\u76F4\u63A5\u53BB\u4FEE\u6539",paraId:74,tocIndex:11},{value:"Array.prototype",paraId:74,tocIndex:11},{value:"\uFF0C\u6216\u8005\u662F\u65B0\u589E",paraId:74,tocIndex:11},{value:"Promise",paraId:74,tocIndex:11},{value:"\u65B9\u6CD5\uFF0C\u800C\u662F\u5C06\u65B9\u6CD5\u91CD\u5199\u6210\u4E3A_promise/_includes\uFF0C\u907F\u514D\u4E86\u5168\u5C40\u6C61\u67D3",paraId:74,tocIndex:11},{value:`'use strict';

var _interopRequireDefault = require('@babel/runtime-corejs3/helpers/interopRequireDefault');

var _concat = _interopRequireDefault(
  require('@babel/runtime-corejs3/core-js-stable/instance/concat'),
);

var _includes = _interopRequireDefault(
  require('@babel/runtime-corejs3/core-js-stable/instance/includes'),
);

var _promise = _interopRequireDefault(
  require('@babel/runtime-corejs3/core-js-stable/promise'),
);

var _context;

var arr = [1, 2, 3, 4];
var arr1 = (0, _concat.default)((_context = [])).call(_context, arr);
(0, _includes.default)(arr).call(arr, 1);
var p = new _promise.default(function (resolve, reject) {
  resolve('FBB');
});
`,paraId:75,tocIndex:11},{value:"plugin-transform-runtime \u63D2\u4EF6\u501F\u52A9 babel-runtime \u5B9E\u73B0\u4E86\u4E0B\u9762\u4E24\u4E2A\u91CD\u8981\u7684\u529F\u80FD",paraId:76,tocIndex:11},{value:"\u5BF9\u8F85\u52A9\u51FD\u6570\u7684\u590D\u7528\uFF0C\u89E3\u51B3\u8F6C\u8BD1\u8BED\u6CD5\u5C42\u65F6\u51FA\u73B0\u7684\u4EE3\u7801\u5197\u4F59",paraId:77,tocIndex:11},{value:"\u89E3\u51B3\u8F6C\u8BD1 api \u5C42\u51FA\u73B0\u7684\u5168\u5C40\u53D8\u91CF\u6C61\u67D3",paraId:77,tocIndex:11},{value:"\u5728\u672C\u6587\u4E2D\u7B80\u5355\u4ECB\u7ECD\u4E86:",paraId:78,tocIndex:12},{value:"Babel \u7684\u8F6C\u8BD1\u8FC7\u7A0B/\u57FA\u7840\u67B6\u6784\uFF0C\u76F8\u5173\u5305\u7684\u6838\u5FC3\u5305\u7684\u610F\u4E49",paraId:79,tocIndex:12},{value:"\u91CD\u70B9\u653E\u5230\u4E86 .babelrc \u7684\u914D\u7F6E\u4E0A\uFF0C\u4ECE plugins \u7684\u4F7F\u7528\uFF0C\u5230\u4E3A\u4EC0\u4E48\u4EA7\u751F\u4E86 presets",paraId:79,tocIndex:12},{value:"@babel/preset-env \u51FA\u73B0\u7684\u539F\u56E0\u548C\u89E3\u51B3\u95EE\u9898\uFF0C\u4EE5\u53CA\u901A\u8FC7 browserList \u548C babel-compat-data \u5B9E\u73B0\u7684\u6309\u9700\u52A0\u8F7D",paraId:79,tocIndex:12},{value:"\u4F7F\u7528 @babel/polyfill \u89E3\u51B3 API \u4E0D\u80FD\u591F\u88AB\u8F6C\u8BD1\u7684\uFF0C\u4F46\u662F\u4EA7\u751F\u4E86\u5168\u91CF\u5F15\u7528\u7684\u95EE\u9898",paraId:79,tocIndex:12},{value:"\u4E3A\u4E86\u89E3\u51B3 @babel/polyfill \u89E3\u51B3\u8F6C\u8BD1\u8BED\u6CD5\u5C42\u65F6\u51FA\u73B0\u7684\u4EE3\u7801\u5197\u4F59 \u4EE5\u53CA\u5168\u5C40\u53D8\u91CF\u6C61\u67D3\u95EE\u9898\uFF0C@babel/plugin-transform-runtime \u51FA\u73B0\u4E86",paraId:79,tocIndex:12},{value:"\u4E0D\u5BB9\u9519\u8FC7\u7684 Babel7 \u77E5\u8BC6",paraId:80,tocIndex:13},{value:"\u624B\u628A\u624B\u5E26\u4F60\u8D70\u8FDB Babel \u7684\u7F16\u8BD1\u4E16\u754C",paraId:80,tocIndex:13},{value:"\u524D\u7AEF\u4E5F\u8981\u61C2\u7F16\u8BD1\uFF1ABabel \u6700\u5168\u4E0A\u624B\u6307\u5357",paraId:80,tocIndex:13}]}}]);

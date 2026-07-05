"use strict";(self.webpackChunkblog_of_fbb=self.webpackChunkblog_of_fbb||[]).push([[9579],{39579:function(d,e,n){n.r(e),n.d(e,{texts:function(){return o}});const o=[{value:"\u8FDB\u7A0B\u662F\u7CFB\u7EDF\u8FDB\u884C",paraId:0,tocIndex:1},{value:"\u8D44\u6E90\u5206\u914D\u548C\u8C03\u5EA6\u7684\u57FA\u672C\u5355\u4F4D",paraId:0,tocIndex:1},{value:"\uFF0C\u662F\u64CD\u4F5C\u7CFB\u7EDF\u7684\u57FA\u7840\uFF0C\u8FDB\u7A0B\u662F",paraId:0,tocIndex:1},{value:"\u7EBF\u7A0B\u7684\u5BB9\u5668",paraId:0,tocIndex:1},{value:"\u6211\u4EEC\u542F\u52A8\u4E00\u4E2A\u670D\u52A1/\u8FD0\u884C\u4E00\u4E2A\u5B9E\u4F8B\uFF0C\u5C31\u662F\u5F00\u542F\u4E86\u4E00\u4E2A\u8FDB\u7A0B\u3002\u5728 Node.js \u4E2D\u6211\u4EEC\u4F7F\u7528",paraId:1,tocIndex:1},{value:"node server.js",paraId:1,tocIndex:1},{value:"\u5F00\u542F\u4E00\u4E2A\u670D\u52A1\u8FDB\u7A0B\uFF0C\u8FDB\u7A0B\u4E4B\u95F4\u7684\u6570\u636E\u662F\u4E0D\u5171\u4EAB\u7684",paraId:1,tocIndex:1},{value:"\u8FDB\u7A0B\u4E4B\u95F4\u90FD\u6709\u5C5E\u4E8E\u81EA\u5DF1\u7684\u72EC\u7ACB\u8FD0\u884C\u7A7A\u95F4\uFF0C\u8FDB\u7A0B\u4E4B\u95F4\u662F\u4E0D\u4F1A\u76F8\u4E92\u5F71\u54CD\u7684\u3002\u4F8B\u5982\u6211\u4EEC\u7684 Chrome \u6D4F\u89C8\u5668\uFF0C\u5C31\u662F\u4E00\u4E2A\u591A\u8FDB\u7A0B\u67B6\u6784\uFF0C\u5305\u542B\u6D4F\u89C8\u5668\u8FDB\u7A0B/GPU \u8FDB\u7A0B/\u7F51\u7EDC\u8FDB\u7A0B/\u6E32\u67D3\u8FDB\u7A0B/\u63D2\u4EF6\u8FDB\u7A0B\u7B49\uFF0C\u4E0D\u4F1A\u56E0\u4E3A\u4E00\u4E2A\u8FDB\u7A0B\u7684\u5D29\u6E83\u5BFC\u81F4\u7A0B\u5E8F\u5D29\u6E83",paraId:2,tocIndex:1},{value:`const http = require('http');

http.createServer().listen(8081, () => {
  process.title = 'FBB test';
  console.log('\u8FDB\u7A0BID: ----', process.pid);
});
`,paraId:3,tocIndex:1},{value:"\u8BE5\u793A\u4F8B\u4E2D\u5F00\u542F\u4E86\u4E00\u4E2A\u8FDB\u7A0B\uFF0C\u8FD8\u6709\u4E00\u4E2A\u6982\u5FF5\u53EB\u505A\u591A\u8FDB\u7A0B\uFF0C\u5B83\u5C31\u662F\u8FDB\u7A0B\u7684\u590D\u5236(fork)\uFF0Cfork \u51FA\u6765\u7684\u6BCF\u4E00\u4E2A\u8FDB\u7A0B\u90FD\u6709\u81EA\u5DF1\u72EC\u7ACB\u7684\u7A7A\u95F4\u5730\u5740\u3001\u6570\u636E\u6808\uFF0C\u53EA\u7528\u5EFA\u7ACB\u4E86\u901A\u4FE1\u8FDB\u7A0B\u4E4B\u95F4\u624D\u53EF\u4EE5\u6570\u636E\u5171\u4EAB",paraId:4,tocIndex:1},{value:"\u8FDB\u7A0B\u4E2D\u5305\u62EC\u8981\u6267\u884C\u7684\u4EE3\u7801\uFF0C\u4EE3\u7801\u64CD\u4F5C\u7684\u6570\u636E\uFF0C\u4EE5\u53CA\u8FDB\u7A0B\u63A7\u5236\u5757 PCB(Processing Control Block)\uFF0C\u7A0B\u5E8F\u662F\u4EE3\u7801\u5728\u6570\u636E\u96C6\u4E0A\u7684\u6267\u884C\u8FC7\u7A0B\uFF0C\u6267\u884C\u8FC7\u7A0B\u7684\u72B6\u6001\u548C\u7533\u8BF7\u7684\u8D44\u6E90\u9700\u8981\u8BB0\u5F55\u5728\u540C\u4E00\u4E2A\u6570\u636E\u7ED3\u6784\u4E2D(PCB)\uFF0C\u6240\u4EE5\u8FDB\u7A0B\u662F\u7531\u4EE3\u7801\u3001\u6570\u636E\u3001PCB \u7EC4\u6210\u7684",paraId:5,tocIndex:1},{value:"PCB \u4E2D\u8BB0\u5F55\u7740 pid\u3001\u6267\u884C\u5230\u7684\u4EE3\u7801\u5730\u5740\u3001\u8FDB\u7A0B\u7684\u72B6\u6001(\u963B\u585E\u3001\u8FD0\u884C\u3001\u5C31\u7EEA\u7B49)\u4EE5\u53CA\u7528\u4E8E\u901A\u4FE1\u7684\u4FE1\u53F7\u91CF\u3001\u7BA1\u9053\u3001\u6D88\u606F\u961F\u5217\u7B49\u6570\u636E\u7ED3\u6784",paraId:6,tocIndex:1},{value:"\u7EBF\u7A0B\u662F\u64CD\u4F5C\u7CFB\u7EDF\u80FD\u591F\u8FDB\u884C",paraId:7,tocIndex:2},{value:"\u8FD0\u7B97\u8C03\u5EA6\u7684\u6700\u5C0F\u5355\u4F4D",paraId:7,tocIndex:2},{value:"\u3002\u7EBF\u7A0B\u662F\u96B6\u5C5E\u4E8E\u8FDB\u7A0B\u7684\uFF0C\u4E00\u4E2A\u7EBF\u7A0B\u53EA\u5C5E\u4E8E\u4E00\u4E2A\u8FDB\u7A0B\uFF0C\u4F46\u662F\u4E00\u4E2A\u8FDB\u7A0B\u53EF\u5305\u542B\u4E00\u4E2A\u6216\u591A\u4E2A\u7EBF\u7A0B\u3002\u8FDB\u7A0B\u7EBF\u7A0B\u662F\u4E00\u4E2A\u4E00\u5BF9\u591A\u7684\u5173\u7CFB\u3002",paraId:7,tocIndex:2},{value:"\u4E0A\u8FF0\u8BB2\u5230\u8FDB\u7A0B\u4E4B\u95F4\u6709\u72EC\u7ACB\u8FD0\u884C\u7A7A\u95F4\u4E14\u76F8\u4E92\u4E0D\u5F71\u54CD\u3002\u7EBF\u7A0B\u81EA\u5DF1\u4E0D\u62E5\u6709\u7CFB\u7EDF\u8D44\u6E90\uFF0C\u5B83\u4E0E\u540C\u5C5E\u4E00\u4E2A\u8FDB\u7A0B\u7684\u5176\u4ED6\u7684\u7EBF\u7A0B\u5171\u4EAB\u8FDB\u7A0B\u6240\u62E5\u6709\u7684\u5168\u90E8\u8D44\u6E90\u3002",paraId:8,tocIndex:2},{value:"\u540C\u4E00\u8FDB\u7A0B\u7684\u7684\u591A\u4E2A\u7EBF\u7A0B\u6709\u5404\u81EA\u7684\u8C03\u7528\u6808(call-stack)\uFF0C\u5BC4\u5B58\u5668\u73AF\u5883(register context)\uFF0C\u7EBF\u7A0B\u7684\u672C\u5730\u5B58\u50A8(thread-local storage)",paraId:9,tocIndex:2},{value:"\u5355\u7EBF\u7A0B\u5C31\u662F\u4E00\u4E2A\u8FDB\u7A0B\u53EA\u5F00\u542F\u4E00\u4E2A\u7EBF\u7A0B\u3002JavaScript \u5C31\u662F\u4E00\u4E2A\u5355\u7EBF\u7A0B\uFF0C\u7A0B\u5E8F\u6309\u7740\u987A\u5E8F\u6267\u884C\uFF0C\u524D\u4E00\u4E2A\u6267\u884C\u5B8C\u6BD5\u540E\u4E00\u4E2A\u624D\u80FD\u5F00\u59CB\u3002\u5982\u679C\u6211\u4EEC\u7684\u4EE3\u7801\u4E2D\u6709\u4E00\u6BB5\u8017\u65F6\u7684\u540C\u6B65\u4EE3\u7801\uFF0C\u5C31\u4F1A\u5BFC\u81F4\u963B\u585E\u3002",paraId:10,tocIndex:3},{value:`const http = require('http');

const computed = () => {
  let sum = 0;
  console.log('computed start!');
  console.time('time');

  // \u8BA1\u7B970 \u7D2F\u52A0\u5230 10^10\u7684\u7ED3\u679C
  for (let i = 0; i < 1e10; i++) {
    sum += i;
  }

  console.log('computed end');
  console.timeEnd('time');
  return sum;
};

http
  .createServer((req, res) => {
    if (req.url === '/computed') {
      const sum = computed();
      res.end(\`Sum is \${sum}\`);
    }
    res.end('!!!');
  })
  .listen(8080, 'localhost', () => {
    console.log('server start');
  });
`,paraId:11,tocIndex:3},{value:"\u5F53\u8BF7\u6C42\u4E00\u6B21 computed \u9700\u8981\u82B1\u9500\u8FD1 10 \u79D2\uFF0C\u5728\u6B64\u4E4B\u540E\u7684\u8BF7\u6C42\u90FD\u4F1A\u9700\u8981\u7B49\u5F85\u8FD9\u4E00\u65F6\u95F4",paraId:12,tocIndex:3},{value:"\u591A\u7EBF\u7A0B\u5C31\u662F\u4E00\u4E2A\u8FDB\u7A0B\u62E5\u6709\u591A\u4E2A\u7EBF\u7A0B\uFF0C\u6BCF\u4E2A\u7EBF\u7A0B\u90FD\u62E5\u6709\u5404\u81EA\u7684\u5185\u5BB9",paraId:13,tocIndex:4},{value:"\u6211\u4EEC\u4E00\u76F4\u719F\u77E5\u7684\u662F JavaScript \u662F\u5355\u7EBF\u7A0B\u8BED\u8A00\uFF0C\u5728\u6D4F\u89C8\u5668\u7AEF\u4E3A\u4E86\u89E3\u51B3\u5355\u7EBF\u7A0B\u7684\u5F31\u70B9 HTML5 \u63D0\u4F9B\u4E86 Web Worker \u4E3A JavaScript \u521B\u5EFA\u591A\u7EBF\u7A0B\u73AF\u5883\uFF1B\u5728 Node v10.5 \u63D0\u51FA\u4E86",paraId:14,tocIndex:4},{value:"worker_threads",paraId:14,tocIndex:4},{value:"\uFF0C\u8BA9 Node \u62E5\u6709\u4E86",paraId:14,tocIndex:4},{value:"\u5DE5\u4F5C\u7EBF\u7A0B",paraId:14,tocIndex:4},{value:"\u4E0A\u4E00\u8282\u7684\u793A\u4F8B\uFF0C\u7531\u4E8E\u8BA1\u7B97\u91CF\u5F88\u591A\uFF0C\u4F1A\u963B\u585E\u7A0B\u5E8F\u540E\u9762\u7684\u6267\u884C\u3002\u6211\u4EEC\u4F7F\u7528 worker_threads \u4FEE\u6539\u4E0A\u8FF0\u4EE3\u7801\uFF0C\u4F7F\u7528\u5DE5\u4F5C\u7EBF\u7A0B\u6765\u505A\u5927\u91CF\u8BA1\u7B97",paraId:15,tocIndex:4},{value:"\u4E3B\u8FDB\u7A0B\u4EE3\u7801",paraId:16,tocIndex:4},{value:`const http = require('http');
const { Worker } = require('worker_threads');

const computed = (limit) => {
  let sum = 0;
  for (let i = 0; i < limit; i++) {
    sum += i;
  }
  return sum;
};

http
  .createServer((req, res) => {
    if (req.url === '/computed') {
      const computedThead = new Worker(\`\${__dirname}/worker_computed.js\`);
      computedThead.on('message', (sum) => {
        console.log(\`computed thread: \${sum}\`);
        res.end(\`computed on computed thread: \${sum}\`);
      });
      computedThead.postMessage(1e10);
    } else if (url !== '/favicon.ico') {
      const number = +req.url.slice(1);
      const result = computed(number);
      console.log(\`main thread: \${result}\`);
      res.end(\`computed on main thread: \${result}\`);
    }
  })
  .listen(8080, 'localhost', () => {
    console.log(\`server start at http://localhost:8080\`);
  });
`,paraId:17,tocIndex:4},{value:"\u5DE5\u4F5C\u7EBF\u7A0B\u4EE3\u7801",paraId:18,tocIndex:4},{value:`const { parentPort } = require('worker_threads');

const computed = (limit) => {
  let sum = 0;
  for (let i = 0; i < limit; i++) {
    sum += i;
  }
  return sum;
};

parentPort.on('message', (limit) => {
  const result = computed(limit);
  parentPort.postMessage(result);
});
`,paraId:19,tocIndex:4},{value:"Nodejs \u662F\u5355\u7EBF\u7A0B\u6A21\u578B\uFF0C\u4F46\u5176\u57FA\u4E8E\u4E8B\u4EF6\u9A71\u52A8\u3001\u975E\u963B\u585E I/O \u6A21\u578B\uFF0C\u5E76\u4E14 Node \u81EA\u8EAB\u8FD8\u6709 I/O \u7EBF\u7A0B\u5B58\u5728\uFF0C\u53EF\u4EE5\u5E94\u7528\u4E8E\u5E76\u53D1\u573A\u666F",paraId:20,tocIndex:6},{value:"\u5F53\u9879\u76EE\u4E2D\u6709\u5927\u91CF\u7684\u8BA1\u7B97\u65F6\uFF0C\u4F8B\u5982\u4E0A\u9762\u7684\u793A\u4F8B\uFF0CNodejs \u63D0\u4F9B\u4E86 API \u6765\u5B9E\u73B0\u591A\u7EBF\u7A0B\u548C\u591A\u8FDB\u7A0B",paraId:20,tocIndex:6},{value:"Nodejs \u5F00\u53D1\u8FC7\u7A0B\u4E2D\uFF0C\u9519\u8BEF\u4F1A\u5BFC\u81F4\u6574\u4E2A\u5E94\u7528\u7684\u9000\u51FA\uFF0C\u6240\u4EE5\u8FDB\u7A0B\u5B88\u62A4\u662F\u9700\u8981\u7684",paraId:20,tocIndex:6},{value:"\u5728\u5355\u6838 CPU \u7CFB\u7EDF\u4E0A\u91C7\u7528\u7684\u662F",paraId:21,tocIndex:6},{value:"\u5355\u8FDB\u7A0B+\u5355\u7EBF\u7A0B",paraId:21,tocIndex:6},{value:"\u7684\u6A21\u5F0F\u6765\u5F00\u53D1\u3002\u5728\u591A\u6838 CPU \u7CFB\u7EDF\u4E0A\uFF0C\u901A\u8FC7 ",paraId:21,tocIndex:6},{value:"child_process.fork",paraId:21,tocIndex:6},{value:"\u5F00\u542F\u591A\u4E2A\u8FDB\u7A0B\uFF0Cv0.8 \u4E4B\u540E\u63A8\u51FA\u4E86 Cluster \u6765\u5B9E\u73B0\u591A\u8FDB\u7A0B\u67B6\u6784\uFF0C\u5373",paraId:21,tocIndex:6},{value:"\u591A\u8FDB\u7A0B+\u5355\u7EBF\u7A0B",paraId:21,tocIndex:6},{value:"\u6A21\u578B\u3002\u5F00\u542F\u591A\u8FDB\u7A0B\uFF0C\u4E3B\u8981\u662F\u89E3\u51B3\u4E86\u5355\u8FDB\u7A0B\u6A21\u5F0F\u4E0B Node.js CPU \u5229\u7528\u7387\u4E0D\u8DB3\u7684\u60C5\u51B5\uFF0C\u5145\u5206\u5229\u7528\u591A\u6838 CPU \u7684\u6027\u80FD\u3002",paraId:21,tocIndex:6},{value:"\u8FD9\u662F\u6211\u4EEC\u7B2C\u4E00\u8282\u8FD0\u884C node\uFF0C\u5F00\u542F\u4E00\u4E2A\u8FDB\u7A0B\u540E\u5728\u6D3B\u52A8\u76D1\u89C6\u5668\u7684\u622A\u56FE\u3002\u6211\u4EEC\u4E00\u76F4\u518D\u8BF4 Nodejs \u662F\u4E00\u4E2A\u5355\u7EBF\u7A0B\uFF0C\u90A3\u4E48 node \u542F\u52A8\u4E4B\u540E\u7EBF\u7A0B\u6570\u91CF\u5E94\u8BE5\u4E3A 1\uFF0C\u4E3A\u4EC0\u4E48\u4F1A\u5F00\u542F\u4E86 9 \u4E2A\u7EBF\u7A0B\u5462 \u{1F914}",paraId:22,tocIndex:7},{value:"\u5176\u5B9E\u662F\u56E0\u4E3A Node \u4E2D\u6700\u6838\u5FC3\u7684\u90E8\u5206\u662F V8 \u5F15\u64CE\uFF0C\u5728 Node \u542F\u52A8\u4E4B\u540E\uFF0C\u4F1A\u521B\u5EFA V8 \u5B9E\u4F8B\uFF0C\u8BE5\u5B9E\u4F8B\u662F\u4E00\u4E2A\u591A\u7EBF\u7A0B",paraId:23,tocIndex:7},{value:"\u4E3B\u7EBF\u7A0B: \u7F16\u8BD1\u3001\u6267\u884C\u4EE3\u7801",paraId:24,tocIndex:7},{value:"\u7F16\u8BD1/\u4F18\u5316\u7EBF\u7A0B: \u5728\u4E3B\u7EBF\u7A0B\u6267\u884C\u65F6\uFF0C\u53EF\u4EE5\u4F18\u5316\u4EE3\u7801",paraId:24,tocIndex:7},{value:"\u5206\u6790\u5668\u7EBF\u7A0B: \u8BB0\u5F55\u5206\u6790\u4EE3\u7801\u8FD0\u884C\u65F6\u95F4\uFF0C\u4E3A Crankshaft \u4F18\u5316\u4EE3\u7801\u6267\u884C\u63D0\u4F9B\u4F9D\u636E",paraId:24,tocIndex:7},{value:"\u5783\u573E\u56DE\u6536\u7684\u7EBF\u7A0B",paraId:24,tocIndex:7},{value:"\u{1F4A1} \u56E0\u6B64\u5E38\u8BF4\u7684 Nodejs \u662F\u5355\u7EBF\u7A0B\u4EC5\u4EE3\u8868 JavaScript \u7684\u6267\u884C\u662F\u5355\u7EBF\u7A0B\u7684(\u7F16\u5199\u7684\u4EE3\u7801\u8FD0\u884C\u5728\u5355\u7EBF\u7A0B\u73AF\u5883\u4E2D)\uFF0C\u4F46\u662F JavaScript \u7684\u5BBF\u4E3B\u73AF\u5883 Nodejs \u6216\u8005\u662F\u6D4F\u89C8\u5668\u90FD\u662F\u591A\u7EBF\u7A0B\u7684\u3002\u56E0\u4E3A\u5728 ",paraId:25,tocIndex:7},{value:"libuv",paraId:25,tocIndex:7},{value:" \u4E2D\u6709\u7EBF\u7A0B\u6C60\u7684\u6982\u5FF5\uFF0Clibuv \u4F1A\u901A\u8FC7\u7C7B\u4F3C\u7EBF\u7A0B\u6C60\u7684\u5B9E\u73B0\u6765\u6A21\u62DF\u4E0D\u540C\u64CD\u4F5C\u7CFB\u7EDF\u7684\u5F02\u6B65\u8C03\u7528\uFF0C\u8FD9\u662F\u5BF9\u5F00\u53D1\u8005\u4E0D\u53EF\u89C1\u7684",paraId:25,tocIndex:7},{value:"Nodejs \u7684\u4E2D\u8FDB\u7A0B Process \u662F\u4E00\u4E2A\u5168\u5C40\u5BF9\u8C61\uFF0C\u65E0\u9700\u4F7F\u7528 require\uFF0C\u80FD\u591F\u63D0\u4F9B\u5F53\u524D\u8FDB\u7A0B\u4E2D\u7684\u76F8\u5173\u4FE1\u606F\uFF0C",paraId:26,tocIndex:9},{value:"\u8BE6\u7EC6\u6587\u6863",paraId:26,tocIndex:9},{value:"\u3002",paraId:26,tocIndex:9},{value:"Process \u662F Node \u4E2D\u7684\u5168\u5C40\u6A21\u5757\uFF0C\u53EF\u4EE5\u901A\u8FC7\u5B83\u6765\u83B7\u53D6 node \u8FDB\u7A0B\u76F8\u5173\u4FE1\u606F\u6216\u8005\u8BBE\u7F6E\u8FDB\u7A0B\u76F8\u5173\u4FE1\u606F",paraId:27,tocIndex:11},{value:`\u8FD4\u56DE\u4E00\u4E2A\u5BF9\u8C61\uFF0C\u5B58\u50A8\u5F53\u524D\u73AF\u5883\u76F8\u5173\u7684\u6240\u6709\u4FE1\u606F
\u4E00\u822C\u4F7F\u7528\u662F\u5728\u4E0A\u9762\u6302\u8F7D\u4E00\u4E9B\u53D8\u91CF\u6807\u8BC6\u5F53\u524D\u7684\u7684\u73AF\u5883\u3002\u4F8B\u5982: `,paraId:28,tocIndex:13},{value:"process.env.NODE_ENV",paraId:28,tocIndex:13},{value:"\u7528\u4E8E\u533A\u5206 development \u548C production",paraId:28,tocIndex:13},{value:`NODE_ENV=production node index
`,paraId:29,tocIndex:13},{value:"process.nextTick \u662F\u5F02\u6B65\u6267\u884C\u7684\uFF0C\u4F1A\u5728\u5F53\u524D event loop \u6267\u884C\u5B8C\u6210\u4E4B\u540E\u6267\u884C",paraId:30,tocIndex:14},{value:`function tick() {
  process.nextTick(() => console.log('tick'));
}

console.log('start');

setTimeout(() => {
  console.log('setTimeout');
});

tick();

console.log('end');
`,paraId:31,tocIndex:14},{value:`process.argv \u8FD4\u56DE\u4E00\u4E2A\u6570\u7EC4
\u5BF9\u4E8E\u6570\u7EC4\u6765\u8BF4\uFF0C\u524D\u4E24\u4E2A\u53C2\u6570\u5206\u522B\u662F node \u8DEF\u5F84\u548C\u6587\u4EF6\u8DEF\u5F84`,paraId:32,tocIndex:15},{value:`node index a=1 b=1

//[
//  '/Users/shuangxu/.nvm/versions/node/v14.17.0/bin/node',
//  '/Users/shuangxu/Documents/code/Node-RoadMap/src/Process/process/index',
//  'a=1',
//  'b=1'
//]
`,paraId:33,tocIndex:15},{value:"process.cwd \u8FD4\u56DE\u5F53\u524D\u7684\u5DE5\u4F5C\u8DEF\u5F84",paraId:34,tocIndex:16},{value:"process.chdir(directory) \u66F4\u6539\u5F53\u524D\u7684\u5DE5\u4F5C\u8DEF\u5F84",paraId:34,tocIndex:16},{value:`console.log(process.cwd());
try {
  process.chdir('./src'); // .../Node-RoadMap
  console.log(process.cwd()); //.../Node-RoadMap/src
} catch (error) {}
`,paraId:35,tocIndex:16},{value:"stdin/stdout/stderr \u6807\u51C6\u8F93\u5165\u6D41/\u6807\u51C6\u8F93\u51FA\u6D41/\u6807\u51C6\u9519\u8BEF\u6D41",paraId:36,tocIndex:17},{value:`process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    process.stdout.write(\`data: \${chunk}\`);
  }
});
`,paraId:37,tocIndex:17},{value:"process \u5B9E\u73B0\u4E86 EventEmitter \u80FD\u591F\u901A\u8FC7 process.on \u6765\u5BF9\u5177\u4F53\u7684\u4E8B\u4EF6\u7684\u76D1\u542C",paraId:38,tocIndex:18},{value:"process.on('exit', (code) => {\n  console.log(`About to exit with code: ${code}`);\n});\n",paraId:39,tocIndex:18},{value:"NodJS \u7684\u9000\u51FA\u56E0\u7D20\u6709\u4E00\u4E9B\u662F\u53EF\u4EE5\u9884\u9632\u7684\uFF0C\u4F8B\u5982\u4EE3\u7801\u629B\u51FA\u4E86\u4E00\u4E2A\u5F02\u5E38\uFF1B\u6709\u4E00\u4E9B\u4E0D\u53EF\u9884\u9632\uFF0C\u4F8B\u5982\u5185\u5B58\u8017\u5C3D\u3002\u5982\u679C\u662F\u4F18\u96C5\u9000\u51FA\uFF0Cprocess \u4F1A\u6D3E\u53D1\u4E00\u4E2A exit \u4E8B\u4EF6\uFF0C\u76D1\u542C\u8BE5\u4E8B\u4EF6\u6765\u505A\u6E05\u7406\u5DE5\u4F5C",paraId:40,tocIndex:19},{value:"process.exit(code) \u662F\u6700\u76F4\u63A5\u7ED3\u675F\u8FDB\u7A0B\u7684\u65B9\u5F0F\u3002code \u662F\u53EF\u9009\u62E9\u53C2\u6570\uFF0C0~255 \u4E4B\u95F4\u7684\u4EFB\u4F55\u6570\u5B57\uFF0C\u9ED8\u8BA4\u4E3A 0\u30020 \u8868\u793A\u8FDB\u7A0B\u6267\u884C\u6210\u529F\uFF0C\u975E 0 \u6807\u8BC6\u8FDB\u7A0B\u6267\u884C\u5931\u8D25",paraId:41,tocIndex:20},{value:`function findRightNode(node) {
  if (!node.right) {
    console.log('no right child node', process.pid);
    process.exit(1);
  }
  console.log('This is findRightNode function');
}

findRightNode({ left: 1 });
`,paraId:42,tocIndex:20},{value:"process.exit \u76F4\u63A5\u9000\u51FA\u4E86\uFF0C\u65E0\u6CD5\u83B7\u53D6\u5230\u6709\u6548\u7684\u9519\u8BEF\u4FE1\u606F\u3002\u6240\u4EE5\u5728\u5F00\u53D1\u4E00\u4E9B\u9879\u76EE\u7684\u65F6\u5019\uFF0C\u5C3D\u91CF\u4F7F\u7528\u629B\u51FA\u5F02\u5E38\u7684\u5F62\u5F0F",paraId:43,tocIndex:20},{value:"\u5982\u679C\u6CA1\u6709 try/catch \u8BED\u53E5\u8BE5\u9519\u8BEF\u4F1A\u88AB\u8BA4\u5B9A\u4E3A\u672A\u6355\u83B7\u3002\u5982\u679C\u662F\u4F7F\u7528 throw new Error \u9000\u51FA\u65F6\uFF0Cexit \u4E8B\u4EF6\u76D1\u542C\u5230\u7684 code \u4E3A 1\uFF0C\u8868\u793A\u5F02\u5E38\u9000\u51FA",paraId:44,tocIndex:21},{value:`function findRightNode(node) {
  if (!node.right) {
    console.log('no right child node', process.pid);
    throw new Error('no right child node');
  }
  console.log('This is findRightNode function');
}

findRightNode({ left: 1 });
`,paraId:45,tocIndex:21},{value:`function findRightNode(node) {
  if (!node.right) {
    console.log('no right child node', process.pid);
    throw new Error('no right child node');
  }
  console.log('This is findRightNode function');
}

try {
  findRightNode({ left: 1 });
} catch (error) {
  console.log('hi, catch now');
}
`,paraId:46,tocIndex:21},{value:"\u53EF\u4EE5\u901A\u8FC7 uncaughtException \u4E8B\u4EF6\u6765\u5904\u7406\u672A\u6355\u83B7\u5F02\u5E38",paraId:47,tocIndex:21},{value:`function findRightNode(node) {
  process.on('uncaughtException', (error) => {
    console.log(1111);
    console.error(error);
    process.exit(1);
  });
  if (!node.right) {
    console.log('no right child node', process.pid);
    throw new Error('no right child node');
  }
  console.log('This is findRightNode function');
}

findRightNode({ left: 1 });
`,paraId:48,tocIndex:21},{value:"Promise Rejection \u4E0E\u629B\u51FA\u5F02\u5E38\u7C7B\u4F3C\uFF0C\u8C03\u7528\u7684 reject() \u51FD\u6570\u6216\u8005\u662F async \u51FD\u6570\u4E2D\u629B\u51FA\u5F02\u5E38\u3002\u5982\u679C\u662F reject() \u6216\u8005\u4F7F\u7528 async \u642D\u914D throw Error \u901A\u8FC7 exit \u4E8B\u4EF6\u76D1\u542C\u5230\u7684 code \u5747\u4E3A 0",paraId:49,tocIndex:22},{value:`function findRightNode(node) {
  if (!node.right) {
    console.log('no right child node', process.pid);
    Promise.reject(new Error('no right child node!'));
  }
  console.log('This is findRightNode function');
}

async function findRightNode(node) {
  if (!node.right) {
    console.log('no right child node', process.pid);
    throw new Error('no right child node');
  }
  console.log('This is findRightNode function');
}

findRightNode({ left: 1 });
`,paraId:50,tocIndex:22},{value:`
\u6211\u4EEC\u53EF\u4EE5\u91C7\u7528\u76D1\u542C unhandledRejection \u4E8B\u4EF6\u6765\u5904\u7406\u672A\u6355\u83B7\u7684 Rejection`,paraId:51,tocIndex:22},{value:`function findRightNode(node) {
  process.on('unhandledRejection', (error) => {
    console.log(1111);
    console.error(error);
    process.exit(1);
  });
  if (!node.right) {
    console.log('no right child node', process.pid);
    Promise.reject(new Error('no right child node!'));
  }
  console.log('This is findRightNode function');
}
findRightNode({ left: 1 });
`,paraId:52,tocIndex:22},{value:"\u4FE1\u53F7\u662F\u64CD\u4F5C\u7CFB\u7EDF\u63D0\u4F9B\u4E86\u8FDB\u7A0B\u95F4\u901A\u4FE1\u7684\u673A\u5236\uFF0C\u4FE1\u53F7\u662F\u4E00\u4E2A\u6570\u5B57\u4E5F\u53EF\u4EE5\u4F7F\u7528\u5B57\u7B26\u4E32\u6765\u6807\u8BC6",paraId:53,tocIndex:23},{value:"\u5BF9\u4E8E SIGKILL/SIGSTOP \u662F\u4E0D\u80FD\u591F\u901A\u8FC7\u4E8B\u4EF6\u76D1\u542C\u6355\u83B7\u5230\u7684\u3002",paraId:54,tocIndex:23},{value:"\u9664\u4E86 Process \u4E4B\u5916\uFF0CNodejs \u8FD8\u63D0\u4F9B\u4E86\u4E00\u4E2A ",paraId:55,tocIndex:24},{value:"child_process",paraId:55,tocIndex:24},{value:` \u7684\u6A21\u5757\u5BF9\u5B50\u8FDB\u7A0B\u8FDB\u884C\u64CD\u4F5C\u3002
\u53EF\u4EE5\u901A\u8FC7 Nodejs \u7684 child_process \u6A21\u5757\u521B\u5EFA\u5B50\u8FDB\u7A0B\uFF0C\u5E76\u4E14\u7236\u5B50\u8FDB\u7A0B\u4F7F\u540C\u4E00\u4E2A\u6D88\u606F\u7CFB\u7EDF\uFF0C\u53EF\u4EE5\u76F8\u4E92\u901A\u4FE1`,paraId:55,tocIndex:24},{value:"\u4F1A\u5728\u4E00\u4E2A\u65B0\u7684\u8FDB\u7A0B\u4E2D\u542F\u52A8\u4E00\u6761\u547D\u4EE4\uFF0C\u901A\u8FC7\u8FD9\u6761\u547D\u4EE4\u53EF\u4EE5\u4F20\u9012\u4EFB\u610F\u7684\u53C2\u6570",paraId:56,tocIndex:26},{value:"spawn \u7684\u7B2C\u4E00\u4E2A\u53C2\u6570\u662F\u4E00\u4E2A\u53EF\u6267\u884C\u6587\u4EF6\uFF0C\u7B2C\u4E8C\u4E2A\u662F\u53C2\u6570\u6570\u7EC4",paraId:57,tocIndex:26},{value:"\u53EF\u4EE5\u901A\u8FC7 spawn \u521B\u5EFA\u5B50\u8FDB\u7A0B\uFF0C\u8FD4\u56DE\u4E00\u4E2A ChildProcess \u5B9E\u4F8B\uFF0C\u8BE5\u5B9E\u4F8B\u5B9E\u73B0\u4E86 EventEmitter API\uFF0C\u6240\u4EE5\u5728\u5B50\u8FDB\u7A0B\u4E0A\u53EF\u4EE5\u8FDB\u884C\u4E8B\u4EF6\u6CE8\u518C",paraId:58,tocIndex:26},{value:`const { spawn } = require('child_process');

const child = spawn('pwd');

child.on('exit', function (code, signal) {
  console.log(\`child process exited with code \${code} and signal \${signal}\`);
});
`,paraId:59,tocIndex:26},{value:`\u6BCF\u4E2A\u5B50\u8FDB\u7A0B\u8FD8\u4F1A\u6709\u4E09\u4E2A\u6807\u51C6 stdio \u6D41\uFF0Cstdin/stdout/stderr\u3002\u5F53\u6D41\u5173\u95ED\u7684\u65F6\u5019\u4F1A\u89E6\u53D1\u5B50\u8FDB\u7A0B\u7684 close \u4E8B\u4EF6\uFF0C\u548C exit \u4E8B\u4EF6\u4E0D\u540C\u3002
\u53EF\u4EE5\u5728\u5B50\u8FDB\u7A0B\u7684 stdio \u6D41\u4E0A\u76D1\u542C\u4E0D\u540C\u7684\u4E8B\u4EF6\uFF0C\u5728\u5B50\u8FDB\u7A0B\u4E2D\uFF0Cstdout/stderr \u6D41\u662F\u53EF\u8BFB\u6D41\uFF0C\u800C stdin \u6D41\u662F\u53EF\u5199\u7684\u3002\u5728\u53EF\u8BFB\u6D41\u4E0A\u6211\u4EEC\u53EF\u4EE5\u76D1\u542C data \u4E8B\u4EF6\uFF0C\u83B7\u53D6\u5230\u5185\u5BB9\u3002`,paraId:60,tocIndex:26},{value:`const ls_child = spawn('node', ['../exec/child.js']);

ls_child.stdout.on('data', (data) => {
  console.log(\`stdout: \${data}\`);
});

ls_child.stderr.on('data', (data) => {
  console.log(\`stderr: \${data}\`);
});

ls_child.on('close', (code) => {
  console.log(\`\u5B50\u8FDB\u7A0B\u9000\u51FA\u7801\uFF1A\${code}\`);
});

ls_child.on('exit', (code) => {
  console.log('exit');
});

//child.js
setInterval(() => {
  process.stdout.write(\`111 \\n\`);
}, 1000);
`,paraId:61,tocIndex:26},{value:"node \u4F1A\u751F\u6210\u4E00\u4E2A shell \u8FDB\u7A0B\uFF0C\u5E76\u6267\u884C\u547D\u4EE4\u5BF9\u5E94\u7684 command \u547D\u4EE4\uFF0C\u5E76\u4E14\u5728\u8FD4\u56DE\u6570\u636E\u524D\uFF0C\u4F1A\u5C06\u6570\u636E\u653E\u5165\u5185\u5B58\u4E2D\u3002\u5F53\u5B50\u8FDB\u7A0B\u6267\u884C\u5B8C\u6BD5\u4E4B\u540E\uFF0C\u518D\u8C03\u7528\u56DE\u8C03\u51FD\u6570\uFF0C\u5E76\u628A\u6700\u7EC8\u6570\u636E\u4EA4\u7ED9\u56DE\u8C03\u51FD\u6570\u3002",paraId:62,tocIndex:27},{value:`let childExec = exec('node ./child.js', (err, stdout, stderr) => {
  console.log(err);
  console.log(stdout);
});

childExec.on('exit', (code, sig) => [console.log(sig)]);
childExec.on('close', () => {
  console.log('close');
});
//child.js
setInterval(() => {
  process.stdout.write(\`111 \\n\`);
}, 1000);
`,paraId:63,tocIndex:27},{value:"\u5982\u679C\u9700\u8981\u4F7F\u7528 shell \u8BED\u6CD5\uFF0C\u5E76\u4E14\u547D\u4EE4\u6570\u636E\u4E0D\u5927\u65F6\uFF0C\u53EF\u4EE5\u9009\u62E9 exec \u51FD\u6570\uFF1B\u4F46\u662F\u6570\u636E\u89C4\u6A21\u8F83\u5927\u65F6\uFF0C\u53EF\u9009\u62E9 spawn \u51FD\u6570\uFF0C\u88AB\u4EE5\u6D41\u7684\u65B9\u5F0F\u5904\u7406",paraId:64,tocIndex:27},{value:"exec \u53EF\u4EE5\u901A\u8FC7 timeout \u914D\u7F6E\u6765\u63A7\u5236\u5B50\u8FDB\u7A0B\u8FD0\u884C\u7684\u65F6\u957F\uFF0C\u8D85\u8FC7\u8FD9\u4E2A\u65F6\u957F\uFF0C\u7236\u8FDB\u7A0B\u4F1A\u53D1\u9001 killSignal \u5C5E\u6027(\u9ED8\u8BA4\u4E3A 'SIGTERM')",paraId:65,tocIndex:27},{value:"\u5176\u5B9E spawn \u4E5F\u662F\u53EF\u4EE5\u6267\u884C shell \u8BED\u6CD5\uFF0C\u901A\u8FC7\u5728 options \u4E2D\u914D\u7F6E",paraId:66,tocIndex:27},{value:"shell: true",paraId:66,tocIndex:27},{value:"\u5B83\u7684\u884C\u4E3A\u548C exec \u51FD\u6570\u662F\u4E00\u6837\u7684\uFF0C\u4F46\u63A5\u53D7\u7684\u4E00\u4E2A\u53C2\u6570\u662F\u53EF\u6267\u884C\u6587\u4EF6\uFF0C\u4E0D\u4F1A\u884D\u751F\u4E00\u4E2A shell\uFF0C\u800C\u662F\u5C06\u53EF\u6267\u884C\u7684 file \u76F4\u63A5\u884D\u751F\u4E3A\u4E00\u4E2A\u65B0\u8FDB\u7A0B",paraId:67,tocIndex:28},{value:`\u{1F914} \u53EF\u6267\u884C\u6587\u4EF6\u662F\u4EC0\u4E48\uFF1F
\u53EF\u4EE5\u7531\u64CD\u4F5C\u7CFB\u7EDF\u8FDB\u884C\u52A0\u8F7D\u6267\u884C\u7684\u6587\u4EF6\u3002\u53EF\u6267\u884C\u6587\u4EF6\u5305\u542B\u673A\u5668\u8BED\u8A00\u6307\u4EE4\u6216\u53EF\u6267\u884C\u4EE3\u7801\uFF0C\u5E76\u5DF2\u7ECF\u53EF\u4EE5\u5728\u8BA1\u7B97\u673A\u4E0A\u8FD0\u884C\u3002\u5728 Windows \u7CFB\u7EDF\u4E2D\uFF0C\u5927\u591A\u6570\u53EF\u6267\u884C\u6587\u4EF6\u7684\u540E\u7F00\u540D\u4E3A .exe\uFF1BMac \u7CFB\u7EDF\u4F7F\u7528 .DMG \u4EE5\u53CA .APP \u6269\u5C55\u540D\u4F5C\u4E3A\u53EF\u6267\u884C\u6587\u4EF6`,paraId:68,tocIndex:28},{value:`const { execFile } = require('child_process');

execFile('./file.sh', function (err, stdout, stderr) {
  if (err) {
    console.error(err);
    return;
  }
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
});
`,paraId:69,tocIndex:28},{value:"\u5176\u4E2D\u9047\u5230\u7684\u4E00\u4E2A\u95EE\u9898\uFF0C\u6743\u9650\u4E0D\u591F\uFF0C\u4F7F\u7528",paraId:70,tocIndex:28},{value:"chmod 777 file.sh",paraId:70,tocIndex:28},{value:"\u4FEE\u6539\u6743\u9650\u5373\u53EF",paraId:70,tocIndex:28},{value:"fork \u51FD\u6570\u662F spawn \u51FD\u6570\u9488\u5BF9\u4E8E\u884D\u751F node \u8FDB\u7A0B\u7684\u4E00\u4E2A\u53D8\u79CD\u3002\u4E24\u8005\u7684\u5728\u4E8E\u4F7F\u7528 fork \u65F6\uFF0C\u4F1A\u548C\u7236\u8FDB\u7A0B\u521B\u5EFA IPC \u901A\u9053\u7528\u4E8E\u901A\u4FE1\uFF0C\u5E94\u7528\u5C42\u4F7F\u7528 process.on/process.send \u65B9\u6CD5",paraId:71,tocIndex:29},{value:`exit
\u5F53\u5B50\u8FDB\u7A0B\u7ED3\u675F\u7684\u65F6\u5019\u4F1A\u89E6\u53D1 exit \u4E8B\u4EF6\uFF0Ccode \u4E3A\u8FDB\u7A0B\u6700\u7EC8\u7684\u9000\u51FA\u7801\uFF0C\u5426\u5219\u4E3A null\uFF1B\u5982\u679C\u8FDB\u7A0B\u662F\u63A5\u53D7\u5230\u4FE1\u53F7\u9000\u51FA\u7684\uFF0Csignal \u662F\u4FE1\u53F7\u7684\u5B57\u7B26\u4E32\u540D\u79F0\uFF0C\u5426\u5219\u4E3A null\u3002\u89E6\u53D1\u8BE5\u4E8B\u4EF6\u65F6\u4E24\u8005\u4E4B\u4E00\u4E0D\u4E3A null`,paraId:72,tocIndex:30},{value:`close
\u5728\u8FDB\u7A0B\u7ED3\u675F\u5E76\u4E14\u5B50\u8FDB\u7A0B\u7684 stdio \u6D41\u5DF2\u7ECF\u5173\u95ED\u540E\u89E6\u53D1 close \u4E8B\u4EF6\uFF0Cclose \u4E8B\u4EF6\u4F1A\u5728 exit \u540E\u89E6\u53D1\u3002code \u5982\u679C\u5B50\u8FDB\u7A0B\u81EA\u5DF1\u9000\u51FA\uFF0C\u5219\u4E3A\u9000\u51FA\u7801\uFF1Bsignal \u7EC8\u6B62\u5B50\u8FDB\u7A0B\u7684\u4FE1\u53F7\u3002`,paraId:73,tocIndex:30},{value:`const exec = require('child_process').exec;
const child = exec('ls ../../', (error, stdout, stderr) => {
  if (error) {
    console.log('stderr ', stderr);
    return;
  }
  console.log('stdout \\n', stdout);
});

child.on('close', (code) => {
  console.log(\`close: \${code}\`);
});

child.on('exit', (code) => {
  console.log('exit');
});
`,paraId:74,tocIndex:30},{value:"\u5BF9\u4E8E\u4E0A\u8FF0\u4EE3\u7801\uFF0C\u4F1A\u5148\u6267\u884C exit \u4E8B\u4EF6\uFF0C\u518D\u8F93\u51FA stdout \u4E2D\u7684\u5185\u5BB9\uFF0C\u6700\u540E\u5728\u6267\u884C close \u4E8B\u4EF6",paraId:75,tocIndex:30},{value:"\u901A\u8FC7 fork \u7684\u65B9\u5F0F\u6765\u521B\u5EFA\u5B50\u8FDB\u7A0B\uFF0Cfork \u4E2D\u9700\u8981\u6307\u5B9A\u6267\u884C\u7684 JavaScript \u6587\u4EF6\u6A21\u5757\uFF0C\u5C31\u80FD\u591F\u521B\u5EFA\u51FA\u5B50\u8FDB\u7A0B",paraId:76,tocIndex:31},{value:"\u901A\u8FC7 fork \u521B\u5EFA\u5B50\u8FDB\u7A0B\u4E4B\u540E\uFF0C\u7236\u5B50\u8FDB\u7A0B\u4F1A\u521B\u5EFA\u4E00\u4E2A IPC \u901A\u9053\uFF0C\u65B9\u4FBF\u7236\u5B50\u8FDB\u7A0B\u76F4\u63A5\u901A\u4FE1\uFF0C\u53EF\u4EE5\u76F4\u63A5\u4F7F\u7528 process.send/process.on \u6765\u8FDB\u884C\u901A\u4FE1",paraId:77,tocIndex:31},{value:`// master.js
const childProcess = require('child_process');
const cpus = require('os').cpus().length;

for (let i = 0; i < cpus; i++) {
  childProcess.fork('./worker.js');
}

console.log("FBB's master");

// worker.js
console.log(\`FBB's worker , pid: \${process.pid}\`);
`,paraId:78,tocIndex:31},{value:"\u4F7F\u7528 fork \u521B\u5EFA\u4E00\u4E2A\u5B50\u8FDB\u7A0B\u5B9E\u4F8B\uFF0C\u901A\u8FC7\u8FD9\u4E2A\u5B9E\u4F8B\u53EF\u4EE5\u76D1\u542C\u6765\u81EA\u5B50\u8FDB\u7A0B\u7684\u6D88\u606F(worker.on)\u6216\u8005\u5411\u5B50\u8FDB\u7A0B\u53D1\u9001\u6D88\u606F(worker.send)\u3002worker \u8FDB\u7A0B\u5219\u901A\u8FC7 process \u5BF9\u8C61\u63A5\u53E3\u76D1\u542C\u6765\u81EA\u7236\u8FDB\u7A0B\u7684\u6D88\u606F(process.on)\u6216\u8005\u5411\u7236\u8FDB\u7A0B\u53D1\u9001\u6D88\u606F(process.send)",paraId:79,tocIndex:32},{value:`// master.js
const childProcess = require('child_process');
const worker = childProcess.fork('./worker.js');

worker.send(\`Hi, child process, my pid is \${process.pid}\`);

worker.on('message', (msg) => {
  console.log('[Master] Received message from worker: ' + msg);
});

// worker.js
process.on('message', (msg) => {
  console.log('[worker] Received message from master: ' + msg);
  process.send(
    \`Hello, parent process, my pid: \${process.pid}, my ppid: \${process.ppid}\`,
  );
});
`,paraId:80,tocIndex:32},{value:"Node.js \u4E2D spawn \u4E0E exec \u7684\u5F02\u540C\u6BD4\u8F83",paraId:81,tocIndex:33}]}}]);

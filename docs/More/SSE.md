---
title: SSE
group:
  title: HTTP
  order: 1
order: 3
---

## 前言

随着 ChatGPT 的流行，SSE(Server Send Event) 这种请求方式也进入大众的视野。

![chatgpt.gif](/blog/imgs/SSE/chatgpt.gif)

能够发现在接口发出之后，内容是逐渐返回的，一直处于连接状态且不断的有新的内容推送到接口中。

## 概述

Server-Send Events 为服务器推送事件，简称 SSE，是服务器主动向客户端推送数据的。

是 HTML5 规范中的一员，主要由 HTTP 协议和`EventSource`对象组成。

这种服务端实时向客户端发送数据的传输方式，其实就是基于 EventStream 的事件流。

### SSE 的使用好处

在我们通常需要等待服务端返回数据的过程称为轮询。

## 技术原理

### 协议

1. 使用 SSE 来做服务器端向客户端做数据的实时推送，需要将对应的 http 响应头 **contentType** 设置为 **text/event-stream**
2. 由于所有的数据都是实时推送的，因此不需要有缓存，**Cache-Control** 设置为 **no-cache**
3. SSE 本质还是一个 TCP 连接，且为了保持长时间开启，要将 **Connection** 设置为 **keep-live**

```json
Content-Type: text/event-stream
Cache-Control: no-cache
Connection: keep-alive
```

### 消息格式

EventStream 为 UTF-8 编码格式的文本或者 Base64 编码和 gzip 压缩的二进制消息。

每一条消息由一行或者多行字段(`event`、`id`、`retry`、`data`)组成，每行字段为`字段名:字段值`。

字段以行为单位，每行以`\n`结尾。以`冒号`开头的行为注释行，会被浏览器忽略。

每次推送，可由多个消息组成，每个消息之间以空行分隔（即最后一个字段以`\n\n`结尾）。

:::info{title=" "}
⚠️

1. 在 SSE 之下，浏览器只会识别以上四种消息，其他字段名均会被忽略

2. 如果一行字段中不包含冒号，该行文本会被识别为字段名，字段值为空

3. 服务端时常通过发生注释行来保持连接
   :::

4. event
   自定义事件类型。客户端可以根据不同的事件类型来执行不同的操作。事件类型就为该消息的字段值，如果字段值为空，默认触发 message 事件

5. data
   事件的数据。如果数据跨越多行，每行都应该以 data:开始，数据内容只能以一个字符串的文本形式进行发送

6. id
   事件的唯一标识符。客户端可以使用这个 ID 来恢复事件流

7. retry
   建议的重新连接时间(毫秒)。如果连接中断，客户端将等待这段时间后尝试重新连接

```json
// 该消息为注释
: this is comment

// 该消息只包含一个 data 字段，值为 this is first message
data: this is first message \n\n

// 该消息包含两个 data 字段，值为 this is second message \nthis is third message
data: this is second message \n
data: this is third message \n\n
```

## 实践

### 浏览器 API

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SSE Demo</title>
  </head>
  <body>
    <h1>SSE Demo</h1>
    <button onclick="connectSSE()">建立 SSE 连接</button>
    <button onclick="closeSSE()">断开 SSE 连接</button>
    <br />
    <div id="sse"></div>

    <script>
      const sseElement = document.getElementById('sse');

      let eventSource;

      // 建立 SSE 连接
      const connectSSE = () => {
        eventSource = new EventSource('http://127.0.0.1:3000/sse');

        // 监听消息事件
        eventSource.addEventListener('message', (event) => {
          const data = JSON.parse(event.data);
          sseElement.innerHTML += `${data.id} --- ${data.time}` + '<br />';
        });

        eventSource.onopen = () => {
          sseElement.innerHTML += `SSE 连接成功，状态${eventSource.readyState}<br />`;
        };

        eventSource.onerror = () => {
          sseElement.innerHTML += `SSE 连接错误，状态${eventSource.readyState}<br />`;
        };
      };

      // 断开 SSE 连接
      const closeSSE = () => {
        eventSource.close();
        sseElement.innerHTML += `SSE 连接关闭，状态${eventSource.readyState}<br />`;
      };
    </script>
  </body>
</html>
```

使用 [EventSource](https://developer.mozilla.org/en-US/docs/Web/API/EventSource) 来建立连接，接受两个参数：URL 和 options

- URL：http 事件来源，一旦创建完成 EventSource 就会监听该 URL 推送的数据
- options：可选对象，包含 withCredentials 属性，是否设置了跨源(CORS)凭据，默认为 false

可以使用创建的 eventSource 可以通过 onmessage/onerror/onopen 来监听，addEventListener 还可以监听自定义事件

EventSource 对象的 close 方法断开和服务端的连接

```js
const http = require('http');
const fs = require('fs');

http
  .createServer((req, res) => {
    const url = req.url;
    // 请求 html 返回
    if (url === '/' || url === 'index.html') {
      fs.readFile('index.html', (err, data) => {
        if (err) {
          res.writeHead(500);
          res.end('Error loading');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(data);
        }
      });
    }
    // 处理 sse 请求
    else if (url.includes('/sse')) {
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'Access-Control-Allow-Origin': '*', // 允许跨域
      });

      // 每隔 1 秒发送一条消息
      let id = 0;
      const intervalId = setInterval(() => {
        const data = { id, time: new Date().toDateString() };

        res.write(`data: ${JSON.stringify(data)}\n\n`);
        id++;
        if (id >= 10) {
          clearInterval(intervalId);
          res.end();
        }
      }, 1000);

      // 当客户端关闭连接时停止发送消息
      req.on('close', () => {
        clearInterval(intervalId);
        id = 0;
        res.end();
      });
    } else {
      // 如果请求的路径无效，返回 404 状态码
      res.writeHead(404);
      res.end();
    }
  })
  .listen(3000);

console.log('Server listening on port 3000');
```

![Untitled](/blog/imgs/SSE/Untitled.gif)

能够发现每一秒能够接收到服务端推送过来的内容

### Fetch

```js
const response = await fetch(url, options);
```

接受用户传入 url 和 options 发起 fetch 请求。

可以通过 header 中的 content-type 判断当前是否为 sse 请求

```js
const contentType = response.headers.get('content-type');
if (!contentType?.startsWith('text/event-stream')) {
  throw new Error('SSE 请求必须设置 content-type 为 text/event-stream');
}
```

在我们之前使用 fetch 去后端请求数据的时候，针对于返回值我们都是采用的 response.json 的方式拿到对应的数据，但是 sse 请求返回的是 stream，response.body 拿到的就是对应的流，因此需要采用流相关的方式读取信息

```js
const reader = response.body.getReader();
let result: ReadableStreamDefaultReadResult<Uint8Array>;
while (!(result = await reader.read()).done) {
  // 假定每一次 read 的 value 都是完整的消息
  onmessage(onChunk(result.value));
}
```

使用 onChunk 方法处理处理事件流中的每一份数据

```js
// 伪代码
function onChunk(arr: Uint8Array) {
  const links = seekLinks();
}

// 每一行消息都是以 \n 作为区分
function seekLinks(arr: Uint8Array) {
  const lines = [];
  const buffer = arr;
  const bufLength = buffer.length;
  let position = 0;
  let lineStart = 0;
  while (position < bufLength) {
    // '\n'.charCodeAt() === 10;
    if (buffer[position] === 10) {
      lines.push(buffer.slice(lineStart, position));
      lineStart = position;
    }
    position += 1;
  }
  return lines;
}
```

获取到每一行之后，对每一行做出对应的处理

```js
// 伪代码
function onChunk(arr: Uint8Array){
  const links = seekLinks();
  const decoder = new TextDecoder();
  let message = {
    data: '',
    event: '',
    id: '',
    retry: undefined,
  }:
  links.forEach((line) => {
    // ':'.charCodeAt() === 58;
    const colon = line.findIndex(l => l === 58);
    const fieldArr = line.slice(0, colon);
    const valueArr = line.slice(colon);
    if(colon === -1){
      // 当冒号作为开头的时候，解析成注释
      return;
    }
    const field = decoder.decode(fieldArr);
    const value = decoder.decode(valueArr);
    switch (field) {
      case 'data':
          message.data = message.data
              ? message.data + '\n' + value
              : value;
          break;
      case 'event':
          message.event = value;
          break;
      case 'id':
          message.id = value;
          break;
      case 'retry':
          const retry = parseInt(value, 10);
          message.retry = retry
          break;
  	}
  });
  return message;
}
```

大致的完成了数据的解析问题，具体的可以参考 https://github.com/Azure/fetch-event-source代码

## 总结

SSE（Server-Send Events）是一种服务器向客户端推送数据的技术，基于 HTML5 规范和 EventStream 的事件流。

SSE 可以在 Web 应用程序中实现诸如股票在线数据、日志推送、聊天室实时人数等即时数据推送功能。

## 参考链接

[一文读懂即时更新方案：SSE](https://juejin.cn/post/7221125237500330039?searchId=20240514201144490F15F67EFCAB28F7A7#heading-20)
[告别轮询，SSE 流式传输可太香了！](https://juejin.cn/post/7355666189475954725)

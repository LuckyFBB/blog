---
title: 浅谈一下 NodeJS 中的 Stream
group: Node
order: 994
---

Stream 是用来处理流式数据的接口。流一般是有顺序的，从一个地方流向另一个地方。

**Node.js 中访问`Stream`**

```js
const stream = require('stream');
```

## Stream 分类

- Readable(可读流)：用来读数据。例如： `fs.createReadStream('./index.html')`
- Writable(可写流)：用来写数据。例如：`fs.createWriteStream('./test.html', {flags: 'w'})`
- Duplex(双向流)：可读 + 可写。例如：
- Transform(转换流)：在读写的过程中，可以对数据进行修改。例如：`zlib.createDeflate()`（数据解压/压缩）

## Readable Stream

    - 客户端的 HTTP 响应
    - 服务端的 HTTP 请求
    - fs 的 createReadStream
    - zlib 压缩流
    - crypto 加密流
    - TCP Sockets
    - 子进程的 stdout 和 stderr 子进程标准输出和我错误输出
    - process.stdin 标准输入

**例子**，读文件流

```js
const fs = require('fs');
fs.createReadStream('./index.html').pipe(process.stdout);
```

### 读取模式

可读流有两种模式：**流动模式和暂停模式**。这两种模式决定了 chunk 数据流动的方式：自动流动和手工流动。

在 `stream.Readable` 的 `_readableState`中维护了一个 `flowing`字段，用于存放数据流动的方式。

`flowing`的三种状态：

    - true：流动模式，调用``readable.pause()``/``readable.unpipe()``时，会切换为 false
    - false：暂停模式，数据会在内部缓存中会不断累积
    - null：初始状态，表示当前没有任何机制消费流数据，所以流也不会产生数据。增加``data``事件，或调用``readable.pipe()``/``readable.resume()``可以切换为 true

#### 流动模式

> 数据自动从系统底层读取，行程流动现象，并通过事件，尽可能快地提供给应用程序。监听流的`data`事件就可以进入流动模式。

```js
const rs = fs.createReadStream(path.join(__dirname, './index.html'));
rs.setEncoding('utf8');
rs.on('data', (data) => {
  //   console.log(data);
});
console.log(rs);
```

![image](https://user-images.githubusercontent.com/33477087/173734090-7b371204-7890-4cf4-82dc-0c6e3b1b0d41.png)

#### 暂停模式

> 需要显式地调用`readable.read`方法，触发`data`事件来消耗流数据。

```js
const rsPause = fs.createReadStream(path.join(__dirname, './index.html'));
rsPause.setEncoding('utf8');
console.log(1, rsPause);

rsPause.on('readable', () => {
  let res = rsPause.read();
  // console.log(res)
});
console.log(2, rsPause);
```

![image](https://user-images.githubusercontent.com/33477087/173848170-73d25f0c-bd1f-40af-9e9e-2ce9b05b143a.png)

#### ❌ 可读流都开始于暂停模式

#### 暂停模式切换到流动模式

    - 监听 data 事件
    - 调用 stream.resume 方法
    - 调用 stream.pipe 方法将数据发送到 Writable

#### 流动模式切换到暂停模式

    - 移除 data 事件
    - 如果没有管道目标，调用 stream.pause 方法
    - 如果有管道目标，调用 stream.unpipe 移除多个管道目标，并取消 data 事件监听

```js
const rsPause = fs.createReadStream(path.join(__dirname, './index.html'));
rsPause.setEncoding('utf8');
// 默认为 null
console.log(1, rsPause);

// rsPause.on('readable', () => {
//     // let res = rsPause.read();
//     // console.log(res)
// })
// console.log(2,rsPause);

// 初始化切换到流动模式
rsPause.on('data', (data) => {
  let res = rsPause.resume();
});
console.log(2, rsPause);
// 流动模式切换为暂停模式
rsPause.pause();
console.log(3, rsPause);
rsPause.resume();
// 暂停模式切换为流动模式
console.log(4, rsPause);
```

![image](https://user-images.githubusercontent.com/33477087/174037128-49f376cd-e508-4895-9297-6bcbad13bfa4.png)

**注意**，如过是通过监听`readable`事件将模式切换为暂停模式的，后续任何方式都不能再切换回流动模式。

```js
const Readable = require('./stream_readable');
const readable = new Readable();
console.log(readable);
readable.push('12345');
readable.on('readable', () => {
  console.log('暂停模式获取数据：', readable.read(3));
});
readable.on('data', (data) => {
  console.log('流动模式获取数据：', data);
});
console.log(readable);
```

#### 不同模式获取数据的方式

    - 流动模式

    通过监听``data``事件，回调函数中可获取到数据。

```js
const Readable = require('./stream_readable');
const readable = new Readable();
readable.push('12345');
readable.on('data', (data) => {
  console.log('流动模式获取数据：', data);
});
console.log('模式：', readable._readableState.flowing);
```

![image](https://user-images.githubusercontent.com/33477087/174084298-677de822-e372-4351-bf3e-954ab8800a8d.png)

    - 暂停模式

    通过监听``readable``事件，在``readable``事件中，调用 ``read(size)``方法读取数据。

```js
const Readable = require('./stream_readable');
const readable = new Readable();
readable.push('12345');
readable.on('readable', () => {
  console.log('暂停模式获取数据：', readable.read(3));
});
console.log('模式：', readable._readableState.flowing);
```

![image](https://user-images.githubusercontent.com/33477087/174084793-740b2b3b-91ec-4130-9f0f-be215886eee2.png)

    ``read(size)``方法，如果不传入 size ，则默认查询全部数据。

### 可读流的实现原理

![node可读流 drawio](https://user-images.githubusercontent.com/33477087/174100203-7a9b1597-cd1b-4e47-a0db-1889cbb32e6b.png)

![image](https://user-images.githubusercontent.com/33477087/174102047-aec73a11-7324-415c-8a60-5ad0231ea435.png)

## Writable Stream

    - 客户端的 HTTP 请求
    - 服务端的 HTTP 响应
    - fs 的 createWriteStream
    - zlib 压缩流
    - crypto 加密流
    - TCP Sockets
    - 子进程的 stdin 子进程标准输入
    - process.stdout/process.stderr 标准输出/错误输出

### 可写流的特点

- 通过 write 写入数据

```js
let fs = require('fs');
// 通过 createWriteStream 可以创建一个 WriteStream 的实例
let ws = fs.createWriteStream('./write.txt', {
  flags: 'w',
  highWaterMark: 2, // 定义缓冲区大小
  autoClose: true,
  start: 0, // 开始写入的位置
  mode: 0o666,
  encoding: 'utf8',
});
// 只能写 字符串、buffer
ws.write('1', 'utf8', () => {
  console.log('写入1成功');
});
```

- 可以通过 end 写数据并且关闭流，`end = write + close`

```js
let fs = require('fs');
// 通过 createWriteStream 可以创建一个 WriteStream 的实例
let ws = fs.createWriteStream('./write.txt', {
  flags: 'w',
  highWaterMark: 2, // 定义缓冲区大小
  autoClose: true,
  start: 0, // 开始写入的位置
  mode: 0o666,
  encoding: 'utf8',
});

ws.end('end', 'utf8', () => {
  console.log('写入 end 成功');
});
ws.write('1', 'utf8', () => {
  console.log('写入1成功');
});
```

![image](https://user-images.githubusercontent.com/33477087/174105945-f45117e7-e85c-4c41-89fb-8505be8e881b.png)

- 当写入数据达到 highWaterMark 的大小时，会触发 drain 事件

```js
let fs = require('fs');
// 通过 createWriteStream 可以创建一个 WriteStream 的实例
let ws = fs.createWriteStream('./write.txt', {
  flags: 'w',
  highWaterMark: 2, // 定义缓冲区大小
  autoClose: true,
  start: 0, // 开始写入的位置
  mode: 0o666,
  encoding: 'utf8',
});

ws.write('1123456', 'utf8', () => {
  console.log('写入1成功');
});

// 当正在写入数据 + 缓冲区数据长度超过 highWaterMark 的值时，会触发 drain 事件
ws.on('drain', function () {
  console.log('drain');
});
```

![image](https://user-images.githubusercontent.com/33477087/174110268-acc29c00-3bac-4122-b378-36686be16fcc.png)

### 管道流

> 管道流，是可读流配合可写流的一种传输方式。

通常情况下，写比读更耗时，所以一般读多写少。将多次读的内容放到内存中，比较消耗内存。如果用管道 pipe ，使用规定的内存，与前面的情况有所不同。

```js
const fs = require('fs');
// pipe 方法叫管道，可以控制速率
let rs = fs.createReadStream('./test.txt', {
  highWaterMark: 4,
});
let ws = fs.createWriteStream('./pipeTest.txt', {
  highWaterMark: 1,
});
// 会监听 rs 的 on('data') 将读取到的数据，通过 ws.write 的方法写入文件
// 调用写的一个方法，返回 boolean 类型
// 如果返回 false 就调用 rs 的 pause 方法，暂停读取
// 等待可写流，写入完毕再监听 drain resume rs
rs.pipe(ws); // 会控制速率，防止淹没可用内存
```

## Duplex Stream

> 双工流，既可读，也可写。

```js
const { Duplex, Readable, Writable } = require('stream');

Readable.prototype._read = (n) => {
  console.log('_read 方法');
};
Writable.prototype._write = (n) => {
  console.log('_write 方法');
};
Duplex.prototype._read = (n) => {
  console.log('_read 方法');
};
Duplex.prototype._write = () => {
  console.log('_write 方法');
};
const rsw1 = new Duplex();
const rs = new Readable();
rs.push('12345test');
const ws = new Writable();
rs.pipe(rsw1).pipe(ws).pipe(process.stdout);
```

## Transform Stream

> 转换流，是一种双工流，转换流同时实现了 Readable 和 Writable 接口。对于转换流，只需要实现一个 `transform`方法就可以。

转换流的实例包括：

- zlib streams
- crypto streams

```js
const { Transform } = require('stream');
const upperCase = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  },
});

process.stdin.pipe(upperCase).pipe(process.stdout);
```

![image](https://user-images.githubusercontent.com/33477087/174115567-472beeeb-150c-4ce7-9474-bf5dbf63f7be.png)

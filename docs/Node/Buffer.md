---
title: NodeJS 中的 Buffer 究竟是什么？
group:
  title: Node 基础
  order: 2
order: 0
---

> Buffer 用于读取或操作二进制流，用于操作网络协议、数据库、图片和文件 I/O 等一些需要大量二进制数据的场景。

## 二进制

二进制就是使用 0 和 1 来表示数据。由于计算机只能读取和存储 0 和 1，所以在读取和展示数据时需进行二进制的转换。

**例如：**用二进制表示数字 10：

```js
01010;
```

## Stream

Stream，即流，是对输入输出文件的抽象。读取文件时即输入流，写入文件时即输出流。将文件以流的形式进行在程序中进行传输。

## Buffer

Buffer，即缓冲区。在内存中分配指定大小的内存空间，用来临时存储二进制数据。

**一个实际的例子**，从一个文件夹拷贝到另一个文件夹，数据量大时，一次性那个拷贝的时间大于分批少量数据拷贝的时间。

![F2019CE7-9210-4B6E-A26D-FCF3504F54EE](https://user-images.githubusercontent.com/33477087/172648754-9fe07eb2-4b6c-42ca-8f4e-8d5aff6d9def.png)

**一个极端的例子**，假设读取一个 100G 的文件，写入另一个文件中。如果一次性读取所有的数据，并一次性写入。会有两个问题：

    1. 一次行读取，读取到的内容是放在内存中的，会造成内存的崩溃
    2. 一次性写入，由于文件太大，写入速度会很慢

能想到的一个解决办法是：分段读取和写入。即边读编写。可以利用 Buffer 来存储读取的数据，当数据量达到 Buffer 的长度时，就开始写入。防止一次性读取造成内存被占满阻塞。

```js
// 读写文件 普通
const fs = require('fs');
const path = require('path');
console.log(__dirname);
fs.readFile(path.resolve(__dirname, 'index.html'), (err, data) => {
  fs.writeFile(path.resolve(__dirname, './test.html'), data, (err, data) => {
    console.log(data);
  });
});

// 读写文件 Buffer
const fs = require('fs');
const path = require('path');
function copy(source, target, cb) {
  const BUFFER_SIZE = 3;
  const buffer = Buffer.alloc(BUFFER_SIZE);
  let readOffset = 0;
  let writeOffset = 0;

  fs.open(source, 'r', (err, rfd) => {
    fs.open(target, 'w', (err, wfd) => {
      function next() {
        fs.read(rfd, buffer, 0, BUFFER_SIZE, readOffset, (err, bytesRead) => {
          console.log(222, bytesRead);
          if (err) return cb(err);
          if (bytesRead) {
            fs.write(
              wfd,
              buffer,
              0,
              bytesRead,
              writeOffset,
              (err, bytesWrite) => {
                readOffset += bytesRead;
                writeOffset += bytesWrite;
                next();
              },
            );
            return;
          }
          fs.close(rfd, () => {});
          fs.close(wfd, () => {});
          cb();
        });
      }
      next();
    });
  });
}
copy(`${__dirname}/index.html`, `${__dirname}/test.html`, (err) => {
  if (err) return console.log('err：', err);
  console.log('copy success');
});
```

### Buffer 内存机制

Node.js 中内存是由虚拟机进行管理的。由于**Node.js 是一个基于 Chrome V8 引擎的运行环境**，所以 V8 就是 Node.js 的运行环境。但是 Buffer 处理的是大量的二进制数据，如果用一点内存就像系统去申请，就会造成频繁的向系统申请内存。所以 Buffer 对象的内存不再由 V8 分配，而**是由 Node.js 中的 C++ 进行申请，Javascript 进行内存分配**。这部分内存被称为**堆外内存**。

### Buffer 的内存分配原理

Buffer 的内存分配采用了 slab 机制预先申请，事后分配。slab 是一种动态的内存管理机制，是一块申请好的固定大小的内存区域。

申请到固定的内存后，slab 有三种状态：

    - full：完全分配状态

    申请的内存完全被分配。

    - partial: 部分分配状态

    申请的内存部分被分配。

    - empty: 没有被分配的状态

    申请的内存完全没有被分配。

#### 8KB 限制

Node.js 以 8KB 来区分是大对象还是小对象。小于 8KB 被认为是小对象，大于等于 8KB 被认为是大对象。

源码中设置了初始化的 Buffer 的大小：

```js
Buffer.poolSize = 8 * 1024;
```

创建 Buffer 时，如果未指定大小，则会默认设置为 8KB

![image](https://user-images.githubusercontent.com/33477087/173372740-253ebd18-0bd1-4f47-b9a4-251e50dbaea2.png)

#### < 8kB

**分配一个 2KB 大小的 Buffer**

```js
var buf2KB = Buffer.allocUnsafe(2 * 1024);
console.log('2KB：', Buffer.poolOffset());
var buf2KB2 = Buffer.allocUnsafe(2 * 1024);
console.log('第二个 2KB', Buffer.poolOffset());

var buf2KB3 = Buffer.allocUnsafe(2 * 1024);
console.log('第二个 2KB', Buffer.poolOffset());
var buf3KB4 = Buffer.allocUnsafe(3 * 1024);
console.log('第二个 2KB', Buffer.poolOffset());
```

![image](https://user-images.githubusercontent.com/33477087/173394570-dda3c0d9-cf86-4c15-84b0-da48c7888d4c.png)

#### >= 8kB

**分配大于 8kB 的 BUffer**

```js
var buf9KB = Buffer.allocUnsafe(9 * 1024);
console.log('9KB：', Buffer.poolOffset());
```

![image](https://user-images.githubusercontent.com/33477087/173395741-7bde09ab-9ab5-41f5-8507-b05979972741.png)

#### 总结(alloc 分配内存除外)

1. 在首次加载时会分配一个 8KB 的内存空间
2. 以 8KB 为界，小于 8KB 为小对象，大于 8KB 为大对象
3. 小 Buffer 的情况，判断 slab 的空间是否足够：
   - 如果足够，从剩余的空间进行分配，并更新位移 `poolOffset` 的值
   - 如果不够，则利用 `createPool()` 重新创建一个 slab 的空间大小

![image](https://user-images.githubusercontent.com/33477087/173386023-b5f65d9f-fdd9-40af-a50d-d638ee2b6ee1.png)

4. 大 buffer 的情况，直接通过 `createUnsafeBuffer(size)` 进行创建
5. 内存是利用 Node.js 中的 C++ 进行分配的，利用 JS 进行内存管理。最终的垃圾回收还是通过 V8 的垃圾回收标记进行回收的

### Buffer 的基本使用

#### 实例化方式

- `Buffer.from()`
  TODO: ArrayBuffer

```js
// Buffer.from(array)：传入数组，数组的每一项是一个表示8位的数字，值必须在 0-255之间，否则会取模
const bf1 = Buffer.from([1, 2, 3]);
const bf11 = Buffer.from([256]);
// Buffer.from(arrayBuffer)： arrayBuffer 的一个副本
const bf2 = Buffer.from(bf1);
// Buffer.from(string [, encoding])：返回包含给定字符串的 buffer
const bf3 = Buffer.from('test', 'utf-8');
// Buffer.from(buffer)：buffer 的一个副本
const bf4 = Buffer.from(bf3);
console.log(bf1, bf11, bf2, bf3, bf4);
```

![image](https://user-images.githubusercontent.com/33477087/173399589-d4d9a80a-3d9c-4dd3-9c44-2ea654000fe1.png)

- `Buffer.alloc()` TODO: buffer 里面为什么存的是 16 进制

```js
// Buffer.alloc(size [, fill [, encoding]])：返回指定大小，并且已填充的 buffer
var buf1 = Buffer.alloc(10);
var buf2 = Buffer.alloc(10, 1);
var buf3 = Buffer.alloc(10, 2);
var buf4 = Buffer.alloc(10, 22);

console.log(buf1);
console.log(buf2);
console.log(buf3);
console.log(buf4);
```

![image](https://user-images.githubusercontent.com/33477087/173400248-ba686be4-e438-4d79-b0ba-001c1bcd9075.png)

- `Buffer.allocUnsafe()`

```js
// Buffer.allocUnsafe(size)：返回指定大小的 buffer
const bufUnsafe1 = Buffer.allocUnsafe(10);
console.log(bufUnsafe1);
```

![image](https://user-images.githubusercontent.com/33477087/173400607-84cbd46f-1897-42c0-965e-a15507cdd8f7.png)

#### Buffer 字符编码

- 'ascii' - 仅适用于 7 位 ASCII 数据。此编码速度很快，如果设置则会剥离高位。
- 'utf8' - 多字节编码的 Unicode 字符。许多网页和其他文档格式都使用 UTF-8。
- 'utf16le' - 2 或 4 个字节，小端序编码的 Unicode 字符。支持代理对（U+10000 至 U+10FFFF）。
- 'ucs2' - 'utf16le' 的别名。
- 'base64' - Base64 编码。当从字符串创建 Buffer 时，此编码也会正确地接受 RFC 4648 第 5 节中指定的 “URL 和文件名安全字母”。
- 'latin1' - 一种将 Buffer 编码成单字节编码字符串的方法（由 RFC 1345 中的 IANA 定义，第 63 页，作为 Latin-1 的补充块和 C0/C1 控制码）。
- 'binary' - 'latin1' 的别名。
- 'hex' - 将每个字节编码成两个十六进制的字符。

### 字符串类型与 Buffer 类型相互转换

- 字符串转 Buffer

利用 `Buffer.from(string, encoding)`

```js
// 字符串转 Buffer
const buf = Buffer.from('Buffer 学习', 'utf-8');

console.log(buf);
console.log(buf.length);
```

![image](https://user-images.githubusercontent.com/33477087/173401794-a600308b-c183-479b-83a7-5f78a47b34dd.png)

- Buffer 转字符串

利用 `toString([encoding], [start], [end])`进行转换

    - start、end 不写，默认转换全部

```js
const buf = Buffer.from('Buffer 学习', 'utf-8');

console.log(buf.toString());
```

![image](https://user-images.githubusercontent.com/33477087/173402252-1ba36ce6-d32b-4c95-9c5d-68cf8fe16d15.png)

    - 传入 start、end 实现部分转换

```js
const buf = Buffer.from('Buffer 学习', 'utf-8');

console.log(buf.toString());
console.log(buf.toString('utf-8', 1, 3));
console.log(buf.toString('utf-8', 1, 9));
```

![image](https://user-images.githubusercontent.com/33477087/173402753-8ee5358b-fe2e-4add-bdb3-2b227f506b3a.png)

**为什么会出现乱码？**

在 UTF-8 编码中，一个汉字占三个字节。截取字符串 ·Buffer 学习· 中的 1-9 位，共 8 个字节，前 6 个字符分别是 ·uffer ·，导致最后一个汉字只有两个字节了。所以会乱码。修改如下：

```js
console.log(buf.toString('utf-8', 1, 10));
```

### Buffer 的应用场景

1. I/O 操作

   I/O 分为文件 I/O 和 网络 I/O。本文只是对 Buffer 的操作，后续会专门介绍 I/O。

```js
// 读写文件 Buffer
const fs = require('fs');
const path = require('path');
function copy(source, target, cb) {
  const BUFFER_SIZE = 3;
  const buffer = Buffer.alloc(BUFFER_SIZE);
  let readOffset = 0;
  let writeOffset = 0;

  fs.open(source, 'r', (err, rfd) => {
    fs.open(target, 'w', (err, wfd) => {
      function next() {
        fs.read(rfd, buffer, 0, BUFFER_SIZE, readOffset, (err, bytesRead) => {
          console.log(222, bytesRead);
          if (err) return cb(err);
          if (bytesRead) {
            fs.write(
              wfd,
              buffer,
              0,
              bytesRead,
              writeOffset,
              (err, bytesWrite) => {
                readOffset += bytesRead;
                writeOffset += bytesWrite;
                next();
              },
            );
            return;
          }
          fs.close(rfd, () => {});
          fs.close(wfd, () => {});
          cb();
        });
      }
      next();
    });
  });
}
copy(`${__dirname}/index.html`, `${__dirname}/test.html`, (err) => {
  if (err) return console.log('err：', err);
  console.log('copy success');
});
```

2. 加解密
   一些加密算法中会用到 Buffer。例如 `crypto.createCipheriv` 中的第二个参数 key 为 String 或 Buffer 类型.

```js
const [key, iv, algorithm, encoding, cipherEncoding] = [
  'a123456789',
  '',
  'aes-128-ecb',
  'utf8',
  'base64',
];
function getKey(key) {
  const buf = Buffer.alloc(16);
  buf.fill(key, 0, 10);
  return buf;
}
function encrypt(key, iv, data) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  cipher.update(data, encoding, cipherEncoding);
  return cipher.final(cipherEncoding);
}
function decrypt(key, iv, crypted) {
  let decipher = crypto.createDecipheriv(algorithm, key, iv);
  decipher.update(crypted, cipherEncoding, encoding);
  return decipher.final(encoding);
}

const key2 = getKey(key);
let encryptStr = encrypt(key2, iv, 'Buffer 学习');
let decryptStr = decrypt(key2, iv, encryptStr);
console.log(encryptStr, decryptStr);
```

## Buffer 与 Cache 的区别

- Buffer

  Buffer 用于处理二进制数据，是临时性的存储。等待缓冲区的数据达到一定大小后才存入磁盘。主要用于读写数据。

- Cache

  Cache 是缓存。可以永久的将数据缓存，例如 redis。将不易改变的且数据量大的数据存放到缓存中，例如 一些字典数据。等下次请求接口时，直接从缓存返回，速度更快。

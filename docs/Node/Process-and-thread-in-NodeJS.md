---
title: NodeJS 中的线程和进程
group:
  title: 进程
  order: 2
order: 0
---

<style>
    .link {
        margin-top: 16px;
        padding: 4px 12px 4px 10px;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        border-left: 5px solid #F8CBA6;
        background-color: #FFFBEB;
    }
</style>

## 进程和线程

### 进程(Process)的概念

进程是系统进行**资源分配和调度的基本单位**，是操作系统的基础，进程是**线程的容器**

我们启动一个服务/运行一个实例，就是开启了一个进程。在 Node.js 中我们使用`node server.js`开启一个服务进程，进程之间的数据是不共享的

进程之间都有属于自己的独立运行空间，进程之间是不会相互影响的。例如我们的 Chrome 浏览器，就是一个多进程架构，包含浏览器进程/GPU 进程/网络进程/渲染进程/插件进程等，不会因为一个进程的崩溃导致程序崩溃

```js
const http = require('http');

http.createServer().listen(8081, () => {
  process.title = 'FBB test';
  console.log('进程ID: ----', process.pid);
});
```

![1](https://user-images.githubusercontent.com/38368040/170860189-95f2d45f-1341-4f29-bac8-c2e4d25b1f4e.png)

该示例中开启了一个进程，还有一个概念叫做多进程，它就是进程的复制(fork)，fork 出来的每一个进程都有自己独立的空间地址、数据栈，只用建立了通信进程之间才可以数据共享

进程中包括要执行的代码，代码操作的数据，以及进程控制块 PCB(Processing Control Block)，程序是代码在数据集上的执行过程，执行过程的状态和申请的资源需要记录在同一个数据结构中(PCB)，所以进程是由代码、数据、PCB 组成的

PCB 中记录着 pid、执行到的代码地址、进程的状态(阻塞、运行、就绪等)以及用于通信的信号量、管道、消息队列等数据结构
![18](https://user-images.githubusercontent.com/38368040/171115053-1bc88940-906f-43a3-ab20-bf95d29ee053.png)

### 线程(Thread)的概念

线程是操作系统能够进行**运算调度的最小单位**。线程是隶属于进程的，一个线程只属于一个进程，但是一个进程可包含一个或多个线程。进程线程是一个一对多的关系。

上述讲到进程之间有独立运行空间且相互不影响。线程自己不拥有系统资源，它与同属一个进程的其他的线程共享进程所拥有的全部资源。

同一进程的的多个线程有各自的调用栈(call-stack)，寄存器环境(register context)，线程的本地存储(thread-local storage)

#### 单线程

单线程就是一个进程只开启一个线程。JavaScript 就是一个单线程，程序按着顺序执行，前一个执行完毕后一个才能开始。如果我们的代码中有一段耗时的同步代码，就会导致阻塞。

```js
const http = require('http');

const computed = () => {
  let sum = 0;
  console.log('computed start!');
  console.time('time');

  // 计算0 累加到 10^10的结果
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
      res.end(`Sum is ${sum}`);
    }
    res.end('!!!');
  })
  .listen(8080, 'localhost', () => {
    console.log('server start');
  });
```

![2](https://user-images.githubusercontent.com/38368040/170860057-eb7acf10-6095-4392-a3b2-877e6f81c982.png)

当请求一次 computed 需要花销近 10 秒，在此之后的请求都会需要等待这一时间

![3](https://user-images.githubusercontent.com/38368040/171114990-668833e3-f7e1-4054-8ea7-9bcfacf344ac.png)

#### 多线程

多线程就是一个进程拥有多个线程，每个线程都拥有各自的内容

![4](https://user-images.githubusercontent.com/38368040/171115028-848bd102-4886-4adc-8190-fbf4b8097612.png)

我们一直熟知的是 JavaScript 是单线程语言，在浏览器端为了解决单线程的弱点 HTML5 提供了 Web Worker 为 JavaScript 创建多线程环境；在 Node v10.5 提出了`worker_threads`，让 Node 拥有了**工作线程**

上一节的示例，由于计算量很多，会阻塞程序后面的执行。我们使用 worker_threads 修改上述代码，使用工作线程来做大量计算

主进程代码

```js
const http = require('http');
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
      const computedThead = new Worker(`${__dirname}/worker_computed.js`);
      computedThead.on('message', (sum) => {
        console.log(`computed thread: ${sum}`);
        res.end(`computed on computed thread: ${sum}`);
      });
      computedThead.postMessage(1e10);
    } else if (url !== '/favicon.ico') {
      const number = +req.url.slice(1);
      const result = computed(number);
      console.log(`main thread: ${result}`);
      res.end(`computed on main thread: ${result}`);
    }
  })
  .listen(8080, 'localhost', () => {
    console.log(`server start at http://localhost:8080`);
  });
```

工作线程代码

```js
const { parentPort } = require('worker_threads');

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
```

![image](https://user-images.githubusercontent.com/38368040/175871918-c4d1f541-20b6-4c34-80f0-fa3d724f0958.png)

## Node 中的线程

### Nodejs 是单进程单线程

- Nodejs 是单线程模型，但其基于事件驱动、非阻塞 I/O 模型，并且 Node 自身还有 I/O 线程存在，可以应用于并发场景
- 当项目中有大量的计算时，例如上面的示例，Nodejs 提供了 API 来实现多线程和多进程
- Nodejs 开发过程中，错误会导致整个应用的退出，所以进程守护是需要的

在单核 CPU 系统上采用的是**单进程+单线程**的模式来开发。在多核 CPU 系统上，通过 `child_process.fork`开启多个进程，v0.8 之后推出了 Cluster 来实现多进程架构，即**多进程+单线程**模型。开启多进程，主要是解决了单进程模式下 Node.js CPU 利用率不足的情况，充分利用多核 CPU 的性能。

### Nodejs 单线程的误区

![6](https://user-images.githubusercontent.com/38368040/170860068-97a6fc3a-af5f-4112-af71-c22a8c8a5708.png)

这是我们第一节运行 node，开启一个进程后在活动监视器的截图。我们一直再说 Nodejs 是一个单线程，那么 node 启动之后线程数量应该为 1，为什么会开启了 9 个线程呢 🤔

其实是因为 Node 中最核心的部分是 V8 引擎，在 Node 启动之后，会创建 V8 实例，该实例是一个多线程

- 主线程: 编译、执行代码
- 编译/优化线程: 在主线程执行时，可以优化代码
- 分析器线程: 记录分析代码运行时间，为 Crankshaft 优化代码执行提供依据
- 垃圾回收的线程

💡 因此常说的 Nodejs 是单线程仅代表 JavaScript 的执行是单线程的(编写的代码运行在单线程环境中)，但是 JavaScript 的宿主环境 Nodejs 或者是浏览器都是多线程的。因为在 [libuv](https://luohaha.github.io/Chinese-uvbook/source/introduction.html) 中有线程池的概念，libuv 会通过类似线程池的实现来模拟不同操作系统的异步调用，这是对开发者不可见的

## Node 中的进程

### Process

Nodejs 的中进程 Process 是一个全局对象，无需使用 require，能够提供当前进程中的相关信息，[详细文档](http://nodejs.cn/api-v16/process.html)。

#### 模块概览

##### 是什么

Process 是 Node 中的全局模块，可以通过它来获取 node 进程相关信息或者设置进程相关信息

##### 相关属性

- 环境变量 process.env
  返回一个对象，存储当前环境相关的所有信息
  一般使用是在上面挂载一些变量标识当前的的环境。例如: `process.env.NODE_ENV`用于区分 development 和 production

  ```shell
  NODE_ENV=production node index
  ```

- 异步 process.nextTick
  process.nextTick 是异步执行的，会在当前 event loop 执行完成之后执行

  ```js
  function tick() {
    process.nextTick(() => console.log('tick'));
  }

  console.log('start');

  setTimeout(() => {
    console.log('setTimeout');
  });

  tick();

  console.log('end');
  ```

- 获取命令行参数 process.argv
  process.argv 返回一个数组
  对于数组来说，前两个参数分别是 node 路径和文件路径

  ```js
  node index a=1 b=1

  //[
  //  '/Users/shuangxu/.nvm/versions/node/v14.17.0/bin/node',
  //  '/Users/shuangxu/Documents/code/Node-RoadMap/src/Process/process/index',
  //  'a=1',
  //  'b=1'
  //]
  ```

- 当前工作路径

  - process.cwd 返回当前的工作路径
  - process.chdir(directory) 更改当前的工作路径

  ```js
  console.log(process.cwd());
  try {
    process.chdir('./src'); // .../Node-RoadMap
    console.log(process.cwd()); //.../Node-RoadMap/src
  } catch (error) {}
  ```

##### 标准流

stdin/stdout/stderr 标准输入流/标准输出流/标准错误流

```js
process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    process.stdout.write(`data: ${chunk}`);
  }
});
```

##### 事件监听

process 实现了 EventEmitter 能够通过 process.on 来对具体的事件的监听

```js
process.on('exit', (code) => {
  console.log(`About to exit with code: ${code}`);
});
```

#### 进程是如何退出的

NodJS 的退出因素有一些是可以预防的，例如代码抛出了一个异常；有一些不可预防，例如内存耗尽。如果是优雅退出，process 会派发一个 exit 事件，监听该事件来做清理工作

<img width="1007" alt="image" src="https://user-images.githubusercontent.com/38368040/174482103-dd6b396e-c804-4cfe-a1de-adb36afdcceb.png">

##### 主动退出

process.exit(code) 是最直接结束进程的方式。code 是可选择参数，0~255 之间的任何数字，默认为 0。0 表示进程执行成功，非 0 标识进程执行失败

```js
function findRightNode(node) {
  if (!node.right) {
    console.log('no right child node', process.pid);
    process.exit(1);
  }
  console.log('This is findRightNode function');
}

findRightNode({ left: 1 });
```

process.exit 直接退出了，无法获取到有效的错误信息。所以在开发一些项目的时候，尽量使用抛出异常的形式

##### Exceptions

如果没有 try/catch 语句该错误会被认定为未捕获。如果是使用 throw new Error 退出时，exit 事件监听到的 code 为 1，表示异常退出

```js
function findRightNode(node) {
  if (!node.right) {
    console.log('no right child node', process.pid);
    throw new Error('no right child node');
  }
  console.log('This is findRightNode function');
}

findRightNode({ left: 1 });
```

![image](https://user-images.githubusercontent.com/38368040/174483231-8ac392a2-bb11-4101-a25e-679f7d6c1ba4.png)

```js
function findRightNode(node) {
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
```

![image](https://user-images.githubusercontent.com/38368040/174483277-01634104-ced6-4cb5-b644-4b94ecf112e2.png)

可以通过 uncaughtException 事件来处理未捕获异常

```js
function findRightNode(node) {
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
```

![image](https://user-images.githubusercontent.com/38368040/174483618-371519b0-2aa9-4954-93f4-147ef454f059.png)

##### Rejection

Promise Rejection 与抛出异常类似，调用的 reject() 函数或者是 async 函数中抛出异常。如果是 reject() 或者使用 async 搭配 throw Error 通过 exit 事件监听到的 code 均为 0

```js
function findRightNode(node) {
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
```

![image](https://user-images.githubusercontent.com/38368040/174483852-ae69d83f-0819-4c18-9c73-496ef02cf4ac.png)
我们可以采用监听 unhandledRejection 事件来处理未捕获的 Rejection

```js
function findRightNode(node) {
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
```

![image](https://user-images.githubusercontent.com/38368040/174484154-3ad59760-eb91-4ac6-8b5b-de37cb2c285e.png)

##### 信号

信号是操作系统提供了进程间通信的机制，信号是一个数字也可以使用字符串来标识

<img width="1205" alt="image" src="https://user-images.githubusercontent.com/38368040/175873185-09f0717a-3d95-40da-9ce5-5b7edd013521.png">

对于 SIGKILL/SIGSTOP 是不能够通过事件监听捕获到的。

### 子进程

除了 Process 之外，Nodejs 还提供了一个 [child_process](http://nodejs.cn/api-v16/child_process.html) 的模块对子进程进行操作。
可以通过 Nodejs 的 child_process 模块创建子进程，并且父子进程使同一个消息系统，可以相互通信

#### 四种创建方式

##### spawn

会在一个新的进程中启动一条命令，通过这条命令可以传递任意的参数

spawn 的第一个参数是一个可执行文件，第二个是参数数组

可以通过 spawn 创建子进程，返回一个 ChildProcess 实例，该实例实现了 EventEmitter API，所以在子进程上可以进行事件注册

```js
const { spawn } = require('child_process');

const child = spawn('pwd');

child.on('exit', function (code, signal) {
  console.log(`child process exited with code ${code} and signal ${signal}`);
});
```

每个子进程还会有三个标准 stdio 流，stdin/stdout/stderr。当流关闭的时候会触发子进程的 close 事件，和 exit 事件不同。
可以在子进程的 stdio 流上监听不同的事件，在子进程中，stdout/stderr 流是可读流，而 stdin 流是可写的。在可读流上我们可以监听 data 事件，获取到内容。

```js
const ls_child = spawn('node', ['../exec/child.js']);

ls_child.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls_child.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

ls_child.on('close', (code) => {
  console.log(`子进程退出码：${code}`);
});

ls_child.on('exit', (code) => {
  console.log('exit');
});

//child.js
setInterval(() => {
  process.stdout.write(`111 \n`);
}, 1000);
```

##### exec

node 会生成一个 shell 进程，并执行命令对应的 command 命令，并且在返回数据前，会将数据放入内存中。当子进程执行完毕之后，再调用回调函数，并把最终数据交给回调函数。

```js
let childExec = exec('node ./child.js', (err, stdout, stderr) => {
  console.log(err);
  console.log(stdout);
});

childExec.on('exit', (code, sig) => [console.log(sig)]);
childExec.on('close', () => {
  console.log('close');
});
//child.js
setInterval(() => {
  process.stdout.write(`111 \n`);
}, 1000);
```

如果需要使用 shell 语法，并且命令数据不大时，可以选择 exec 函数；但是数据规模较大时，可选择 spawn 函数，被以流的方式处理

exec 可以通过 timeout 配置来控制子进程运行的时长，超过这个时长，父进程会发送 killSignal 属性(默认为 'SIGTERM')

其实 spawn 也是可以执行 shell 语法，通过在 options 中配置`shell: true`

##### execFile

它的行为和 exec 函数是一样的，但接受的一个参数是可执行文件，不会衍生一个 shell，而是将可执行的 file 直接衍生为一个新进程

🤔 可执行文件是什么？
可以由操作系统进行加载执行的文件。可执行文件包含机器语言指令或可执行代码，并已经可以在计算机上运行。在 Windows 系统中，大多数可执行文件的后缀名为 .exe；Mac 系统使用 .DMG 以及 .APP 扩展名作为可执行文件

```js
const { execFile } = require('child_process');

execFile('./file.sh', function (err, stdout, stderr) {
  if (err) {
    console.error(err);
    return;
  }
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
});
```

其中遇到的一个问题，权限不够，使用`chmod 777 file.sh`修改权限即可
![image](https://user-images.githubusercontent.com/38368040/174480366-0bf41cd8-32d4-4ef7-b04c-d9bd08d3679d.png)

##### fork

fork 函数是 spawn 函数针对于衍生 node 进程的一个变种。两者的在于使用 fork 时，会和父进程创建 IPC 通道用于通信，应用层使用 process.on/process.send 方法

<img width="1440" alt="image" src="https://user-images.githubusercontent.com/38368040/175820370-86543125-6439-42c9-9074-c0b23d07ec47.png">

#### child_process 的 exit/close 执行时机

1. exit
   当子进程结束的时候会触发 exit 事件，code 为进程最终的退出码，否则为 null；如果进程是接受到信号退出的，signal 是信号的字符串名称，否则为 null。触发该事件时两者之一不为 null

2. close
   在进程结束并且子进程的 stdio 流已经关闭后触发 close 事件，close 事件会在 exit 后触发。code 如果子进程自己退出，则为退出码；signal 终止子进程的信号。

```js
const exec = require('child_process').exec;
const child = exec('ls ../../', (error, stdout, stderr) => {
  if (error) {
    console.log('stderr ', stderr);
    return;
  }
  console.log('stdout \n', stdout);
});

child.on('close', (code) => {
  console.log(`close: ${code}`);
});

child.on('exit', (code) => {
  console.log('exit');
});
```

对于上述代码，会先执行 exit 事件，再输出 stdout 中的内容，最后在执行 close 事件

#### 创建子进程

通过 fork 的方式来创建子进程，fork 中需要指定执行的 JavaScript 文件模块，就能够创建出子进程

通过 fork 创建子进程之后，父子进程会创建一个 IPC 通道，方便父子进程直接通信，可以直接使用 process.send/process.on 来进行通信

```js
// master.js
const childProcess = require('child_process');
const cpus = require('os').cpus().length;

for (let i = 0; i < cpus; i++) {
  childProcess.fork('./worker.js');
}

console.log("FBB's master");

// worker.js
console.log(`FBB's worker , pid: ${process.pid}`);
```

#### 父子进程的事件监听

使用 fork 创建一个子进程实例，通过这个实例可以监听来自子进程的消息(worker.on)或者向子进程发送消息(worker.send)。worker 进程则通过 process 对象接口监听来自父进程的消息(process.on)或者向父进程发送消息(process.send)

```js
// master.js
const childProcess = require('child_process');
const worker = childProcess.fork('./worker.js');

worker.send(`Hi, child process, my pid is ${process.pid}`);

worker.on('message', (msg) => {
  console.log('[Master] Received message from worker: ' + msg);
});

// worker.js
process.on('message', (msg) => {
  console.log('[worker] Received message from master: ' + msg);
  process.send(
    `Hello, parent process, my pid: ${process.pid}, my ppid: ${process.ppid}`,
  );
});
```

![8](https://user-images.githubusercontent.com/38368040/170860070-1b113e51-60aa-4935-8b13-2ba61c639d1d.png)

<div class="link">参考链接</div>

- [Node.js 中 spawn 与 exec 的异同比较](https://segmentfault.com/a/1190000002913884)

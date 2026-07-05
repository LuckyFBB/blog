---
title: 多进程架构和 Cluster
group:
  title: 进程
order: 2
---

在本文中主要会介绍多进程架构以及其问题，cluster 在多进程架构上解决了什么问题，以及其原理。

## 多进程架构

其实多进程的出现能够解决单进程、单线程无法充分利用多核 CPU 的问题。上述的父子进程事件监听中，我们能够通过 fork 创建 worker 子进程，并且通过 on/send 事件来进行事件监听。

但是 worker 进程会因为某些异常情况退出，因此在 master 进程中需要监听子进程的存活状态，一旦子进程退出之后，master 进程需要重启新的子进程。子进程退出时，会在父进程触发 exit 事件，父进程只需要监听该事件。

### 主进程 master

- 创建 server 并监听 3000 端口
- 根据系统的 [cpus](http://nodejs.cn/api/os.html#oscpus) 开启多个进程
- 通过子进程对象的 send 发送信息到子进程进行通信
- 在主进程中监听子进程的变化，如果是自杀信号(suicide)重新启动一个工作进程
- 主进程在监听到退出消息的时候，先退出子进程再退出主进程

[对应代码](https://github.com/LuckyFBB/Front-End-Examples/blob/main/node-process/more_process/master.js)

```js
const fork = require('child_process').fork;
const cpus = require('os').cpus();

const server = require('net').createServer();
server.listen(3000);
process.title = 'FBB-Master';

const workers = {};
const createWorker = () => {
  const worker = fork('worker.js');
  worker.on('message', function (message) {
    if (message.act === 'suicide') {
      createWorker();
    }
  });
  worker.on('exit', function (code, signal) {
    console.log(
      `worker process ${worker.pid} exited, code: ${code}, signal: ${signal}`,
    );
    delete workers[worker.pid];
  });
  worker.send('server', server);
  workers[worker.pid] = worker;
  console.log(
    `worker process created, pid: ${worker.pid}, ppid: ${process.pid} `,
  );
};

for (let i = 0; i < cpus.length; i++) {
  createWorker();
}

// SIGINT 程序终止(interrupt)信号 表示用户输入INTR字符(通常是Ctrl-C)时发出，用于通知前台进程组终止进程
process.once('SIGINT', close.bind(this, 'SIGINT'));
// SIGINT类似, 但由QUIT字符(通常是Ctrl-\)来控制
process.once('SIGQUIT', close.bind(this, 'SIGQUIT'));
// 程序结束(terminate)信号，通常用来要求程序自己正常退出
process.once('SIGTERM', close.bind(this, 'SIGTERM'));
process.once('exit', close.bind(this));

function close(code) {
  console.log('进程退出！', code);
  if (code !== 0) {
    for (let pid in workers) {
      console.log('master process exited, kill worker pid:', pid);
      workers[pid].kill('SIGINT');
    }
  }
  process.exit(0);
}
```

### 工作进程 worker

- 创建一个 server 对象
- 通过 message 事件接受主进程 send 方法发送的消息
- 监听 uncaughtException 事件，捕获未处理的异常，发送自杀信息由主进程重建进程，子进程在连接关闭之后再退出

[对应代码](https://github.com/LuckyFBB/Front-End-Examples/blob/main/node-process/more_process/worker.js)

```js
const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/plain',
  });
  res.end('I am worker, pid:' + process.pid + ', ppid:' + process.ppid);
  throw new Error('worker process exception!');
});

let netServer;
process.title = 'FBB-Worker';
process.on('message', function (message, sendHandle) {
  if (message === 'server') {
    netServer = sendHandle;
    netServer.on('connection', function (socket) {
      console.log(`got a connection on worker, pid = ${process.pid}`);
      server.emit('connection', socket);
    });
  }
});

process.on('uncaughtException', function (err) {
  console.log('catch error, send suicide massage');
  process.send({ act: 'suicide' });
  netServer.close(function () {
    process.exit(1);
  });
});
```

Nodejs 的多进程模型就是这样实现的，思考该模型是否有问题 🤔

- 多个进程之间会竞争一个连接，产生惊群现象，效率比较低
- 无法控制一个新的连接是由哪个进程来处理的，导致各个 worker 之间非常不均衡

多线程/多进程等待同一个 socket 事件，当这个事件发生时，所有的线程/进程被同时唤醒，就是惊群。可以预见，这样的效率低下，许多进程被重新唤醒，同时去响应这一个事件，但只有一个进程能处理事件成功，其他的进程在处理该事件失败后重新休眠。这种性能浪费现象就是惊群

## Cluster

cluster 模块可以被用来在多核 CPU 环境负载均衡，基于子进程的 fork 方法并且主要会根据 CPU 核数衍生很多次主应用进程。然后主进程接管并且通过主进程和子进程的交流实现负载均衡。

### Cluster 工作流程(Master-Worker)

cluster 中创建一个主进程(Master)，以及若干个子进程(worker)。由于主进程监听客户端连接请求，并根据特定的策略转发到对应的 worker。

- 优点: 通常只占用一个端口，通信相对简单，转发策略更加灵活
- 缺点: 需要主进程的稳定性较高

<img width="700" alt="image" src="https://user-images.githubusercontent.com/38368040/170860079-7a5677a5-f3f2-489d-8086-1479090df9f2.png">

主进程的工作很简单，只是使用一个调度轮询算法去选择一个工作进程，通过所有的可用的进程让负载均匀地分布。

### 集群创建

Cluster 是常见的 Nodejs 利用多核的方法，是基于上面讲的`child_process.fork`实现的，所以 cluster 产生的进程是通过 IPC 来通信的，是使用`cluster.isMaster`这个标识来区分子进程和父进程

我们开启一个进程，监听 8080 端口，使用[apache 基准测试工具](https://httpd.apache.org/docs/2.4/programs/ab.html)来模拟请求

`ab -c 10 -n 5000 -r http://localhost:8080`，发起 5000 个请求

[对应代码](https://github.com/LuckyFBB/Front-End-Examples/blob/main/node-process/cluster/worker.js)

```js
const http = require('http');
const pid = process.pid;
http
  .createServer((req, res) => {
    for (let i = 0; i < 1e7; i++) {} // simulate CPU work
    res.end(`handled by process.${pid}`);
  })
  .listen(8080, () => {
    console.log(`started process`, pid);
  });
```

当我们执行完 5000 条数据之后，我们能够得到如下的结果:

<img width="700" alt="image" src="https://user-images.githubusercontent.com/38368040/170860082-325e6ae9-b1cd-490f-8e8c-e69d7544b838.png">

借助上述的示例，把它作为一个 worker，使用 cluster 模块来扩展当前示例，在主进程中根据电脑 cpu 的数量来创建对应的子进程

[对应代码](https://github.com/LuckyFBB/Front-End-Examples/blob/main/node-process/cluster/master.js)

```js
const http = require('http');
const cluster = require('cluster');
const cpus = require('os').cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < cpus; i++) {
    cluster.fork(); // 创建子进程
  }
  cluster.on('exit', (worker) => {
    console.log(`${worker.process.pid} died`);
  });
} else {
  require('./worker.js');
}
console.log('hello all');
```

依旧执行上述命令，得到如下的结果。当我们多次请求时，请求会被不同的子进程处理。子进程并不是完全按着顺序轮流执行的，cluster 模块采用的是 round-robin 方式，将负载分布到不同的子进程之间

<img width="700" alt="image" src="https://user-images.githubusercontent.com/38368040/170860084-325a6afd-0564-4647-a4ee-d6f8a8620013.png">

### 提出问题

1. 如果进了 if(cluster.isMaster)，如何进入 else 中的逻辑，并新建好几个子进程，进行通信？
2. 为什么子进程中创建多个 server 的时候，监听了同一个端口，尚未报错？
3. 主进程和子进程各自的作用是什么，分别负责了什么事情？

### 源码分析

#### 进程初始化

master 进程通过 cluster.fork 创建了 worker 进程。cluster.fork 内部使用 child_process.fork 来创建进程的，所以 master 和 worker 之间也会有 IPC 通道进行通信

<img width="700" alt="image" src="https://user-images.githubusercontent.com/38368040/185775772-c1b8550a-f29c-40fb-bdd3-d45686832d5b.png">

当我们使用 require("cluster") 的时候，会去执行

```js
const childOrPrimary = 'NODE_UNIQUE_ID' in process.env ? 'child' : 'primary';
module.exports = require(`internal/cluster/${childOrPrimary}`);
```

当环境变量中没有 NODE_UNIQUE_ID 加载 primary.js

cluster.fork 是 child_process.fork 的封装，调用时会将 NODE_UNIQUE_ID 写到环境变量中

#### 端口共享

##### 流程

在该示例中我们创建了多个 worker 并且监听的是同一个端口。当我们多个进程监听一个端口的时会报错，但是我们的代码中却没有问题？

上述代码中使用 http 模块创建了 http 服务，http 模块最终会调用 net.js 实现网络服务。net 中会根据当前是主进程还是子进程对 listen 方法做特殊处理

<img width="700" alt="image" src="https://user-images.githubusercontent.com/38368040/172322934-8920ddc1-e23b-4026-8f07-ca5dafa45e0a.png">

向 master 进程发送 queryServer 消息，master 在收到这个消息之后，向 master 注册一个内部的 TCP 服务器。

master 在接收到 queryServer 消息后进行服务启动：

- 如果地址没有被监听过，通过 RoundRobinHandle 监听开启服务
- 如果地址被监听过，直接绑定当已经监听的服务上，去消费请求

实现端口共享的原理：

- 端口只会在 master 进程中的内部 TCP 服务器监听一次
- net.js 模块中会判断当前的进程是 master 还是 worker 进程
- 如果是 worker 进程并不会真正的去调用 listen 方法，所以不会报端口错误

我们在子进程会通过 http.createServer().listen，会走到 Server.prototype.listen 方法中，根据判断之后会开始执行 listenInCluster 方法

##### 源码

```js
// listenInCluster
function listenInCluster() {
  if (cluster === undefined) cluster = require('cluster');

  if (cluster.isPrimary) {
    server._listen2(address, port, addressType, backlog, fd, flags);
    return;
  }

  // Get the primary's server handle, and listen on it
  cluster._getServer(server, serverQuery, listenOnPrimaryHandle);
}
```

这里的会对当前是在主进程还是子进程做出判断走不同的逻辑，目前还处于子进程中，调用 cluster.\_getServer 函数

在 cluster.\_getServer 中会构建一个消息体，再发送给主进程，开始和主进程进行通信，主进程

```js
cluster._getServer = function (obj, options, cb) {
  const message = {
    act: 'queryServer',
    index,
    data: null,
    ...options,
  };
  send(message, (reply, handle) => {
    if (handle) {
      // Shared listen socket
      shared(reply, { handle, indexesKey, index }, cb);
    } else {
      // Round-robin.
      rr(reply, { indexesKey, index }, cb);
    }
  });
};
```

当主进程接收到 queryServer 消息之后，会去执行 queryServer 函数。**划重点：**当执行 queryServer 函数的时候会根据不同的调度策略选择不同的调用模式，默认选择 RoundRobinHandle 方法

```js
function queryServer(worker, message) {
  const key =
    `${message.address}:${message.port}:${message.addressType}:` +
    `${message.fd}:${message.index}`;
  let handle = handles.get(key);
  // 主进程会创建 server
  if (handle === undefined) {
    if (
      schedulingPolicy !== SCHED_RR ||
      message.addressType === 'udp4' ||
      message.addressType === 'udp6'
    ) {
      handle = new SharedHandle(key, address, message);
    } else {
      // 走Round-Robin算法，负责处理请求时，主进程server选取哪个子进程server进行处理
      handle = new RoundRobinHandle(key, address, message);
    }

    handles.set(key, handle);
  }

  handle.add(worker, (errno, reply, handle) => {});
}
```

看看 RoundRobinHandle 调度做了什么事情？发现其中创建了一个新的 server 并且做了 listen 监听，那么就会进入到 Server.prototype.listen 进入到 listenInCluster 方法中，由于目前是在主进程中执行，那么会开始执行 server.\_listen2 方法

```js
function RoundRobinHandle(key, address, { port, fd, flags }) {
  this.key = key;
  this.all = new SafeMap();
  this.free = new SafeMap();
  this.handles = [];
  this.handle = null;
  // 在这里创建了主进程中的server,并且监听在子进程中定义的端口
  this.server = net.createServer(assert.fail);

  this.server.listen(address);
}
```

到这里的时候，我们已经分析完了子进程创建 Server 监听端口的时候，并在在主进程中创建了一个 Server 监听相同的端口

接下来将要分析的是，子进程是如何做到的不去监听端口的

当我们主进程的 Server 创建成功之后，会执行 handle.add 方法，调用 handoff 当前的子进程放入到一个 this.free 中

```js
handle.add(worker, (errno, reply, handle) => {
  const { data } = handles.get(key);
  if (errno) handles.delete(key); // Gives other workers a chance to retry.
  send(
    worker,
    {
      errno,
      key,
      ack: message.seq,
      data,
      ...reply,
    },
    handle,
  );
});

RoundRobinHandle.prototype.add = function (worker, send) {
  const done = () => {
    // 将当前的子进程推入this.free中(现在只是推入，等客户端请求时，会取出子进程使用)
    this.handoff(worker);
  };
  this.server.once('listening', done);
};
```

执行完毕之后，会开始执行发送 queryServer 消息时的回调函数

```js
send(message, (reply, handle) => {
  if (handle) {
    // Shared listen socket
    shared(reply, { handle, indexesKey, index }, cb);
  } else {
    // Round-robin.
    rr(reply, { indexesKey, index }, cb);
  }
});
```

在 send 中的 cb 就是调用 clsuter.\_getServer 传入的 listenOnPrimaryHandle 方法，最终也会调用到 server.\_listen2(setupListenHandle)

其实 server.\_listen2(setupListenHandle) 主进程做监听的时候也调用了这个方法，我们来看看其真实面目吧

为主进程创建 TCP 句柄，实现子进程就不会再进行端口监听

```js
function setupListenHandle(address, port, addressType, backlog, fd, flags) {
  // 当子进程在调用进这个方法的时候，已经有_handle了，所以不会再进行handle的创建
  if (this._handle) {
    debug('setupListenHandle: have a handle already');
  } else {
    // 主进程会调用
    let rval = null;
    // Try to bind to the unspecified IPv6 address, see if IPv6 is available
    if (!address && typeof fd !== 'number') {
      // 实际上是创建了主进程的handle句柄，创建好了tcp连接通路
      rval = createServerHandle(DEFAULT_IPV6_ADDR, port, 6, fd, flags);
    }
    this._handle = rval;
  }
}
```

#### 分发客户端服务

##### 流程

master 进程主要负责请求的收集和分发，当一个请求进来之后会被 master 进程监听到，master 采用 RoundRobin 的调度方式去分配请求。每一次从空闲子进程队列中拿出第一个，将请求转发到该子进程做处理，处理完成之后再将子进程放回空闲队列

<img width="700" alt="image" src="https://user-images.githubusercontent.com/38368040/185776187-4b9cd73f-643c-4270-b8ed-39945d2173de.png">

##### 源码

当我们执行 curl http:127.0.0.1:3000 的时候，主进程会监听到有连接进程，能够触发主进程的 listening 事件

```js
this.server.once('listening', () => {
  this.handle.onconnection = (err, handle) => this.distribute(err, handle);
});
```

触发 RoundRobinHandle 的 distribute 方法，取出空闲队列中的第一个进程，为它分配请求

```js
RoundRobinHandle.prototype.distribute = function (err, handle) {
  // 把请求放入请求队列中
  append(this.handles, handle);
  // 空闲队列中取出第一个进程
  const [workerEntry] = this.free;

  if (ArrayIsArray(workerEntry)) {
    const { 0: workerId, 1: worker } = workerEntry;
    this.free.delete(workerId);
    this.handoff(worker);
  }
};
```

执行 handoff 开始为所选进程分配请求，构建消息体，向子进程发送对应的消息和请求

```js
RoundRobinHandle.prototype.handoff = function (worker) {
  // 取出队列中的第一个请求
  const handle = peek(this.handles);
  // 如果为空，说明没有请求，再次放回进程空闲队列中
  if (handle === null) {
    this.free.set(worker.id, worker);
    return;
  }

  remove(handle);
  // 构建消息体
  const message = { act: 'newconn', key: this.key };
  // 向子进程发送消息
  sendHelper(worker.process, message, handle, (reply) => {
    if (reply.accepted) handle.close();
    else this.distribute(0, handle); // Worker is shutting down. Send to another.

    this.handoff(worker);
  });
};
```

当子进程接收到消息之后，会触发 onconnection 方法，来触发 net 模块 onconnection 方法，将对应的 socket 传递给用户层

```js
function onmessage(message, handle) {
  if (message.act === 'newconn') onconnection(message, handle);
}

// Round-robin connection.
function onconnection(message, handle) {
  const key = message.key;
  const server = handles.get(key);
  const accepted = server !== undefined;

  send({ ack: message.seq, accepted });

  if (accepted) server.onconnection(0, handle);
  else handle.close();
}

// server.onconnection
function onconnection(err, clientHandle) {
  const handle = this;
  const self = handle[owner_symbol];
  const socket = new Socket({
    handle: clientHandle,
    allowHalfOpen: self.allowHalfOpen,
    pauseOnCreate: self.pauseOnConnect,
    readable: true,
    writable: true,
  });
  self.emit('connection', socket);
}
```

## 参考链接

- [详解 Node.Js 中实现端口重用原理](https://segmentfault.com/a/1190000014701988)
- [通过源码解析 Node.js 中 cluster 模块的主要功能实现](https://cnodejs.org/topic/56e84480833b7c8a0492e20c)

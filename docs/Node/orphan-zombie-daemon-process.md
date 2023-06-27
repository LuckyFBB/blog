---
title: Node 中的孤儿/僵尸/守护进程
group:
  title: 进程
  order: 2
order: 1
---

### 孤儿进程

父进程已经退出，它的一个或者多个子进程还在运行，上述的子进程会成为孤儿进程

孤儿进程会被 init 进程(pid 为 1)收养，并由 init 进程完成对它们的状态收集工作 [master 对应代码](./../../src/Process/orphan_process/master.js)

```js
const fork = require('child_process').fork;
const server = require('net').createServer();
server.listen(3000);
const worker = fork('./worker.js');

process.title = 'FBB master';

worker.send('server', server);
console.log(`worker created, ppid is ${process.pid}, pid is ${worker.pid}`);
```

下面是 worker 对应的代码 [worker 对应代码](./../../src/Process/orphan_process/worker.js)

```js
const http = require('http');
const server = http.createServer((req, res) => {
  res.end(`I am worker process, pid: ${process.pid}, ppid: ${process.ppid}`);
});

let worker = null;

process.on('message', (message, sendHandle) => {
  if (message === 'server') {
    worker = sendHandle;
    worker.on('connection', (socket) => {
      server.emit('connection', socket);
    });
  }
});
```

执行 node master.js，开启两个进程，当我们执行第一次`curl http://127.0.0.1:3000`，能够打印出来期望的 pid/ppid；当我们在活动监视器退出掉我们的 master 进程，再次执行，这个时候 ppid 就变成了 1，此时的 worker 已经变成了孤儿进程

![10](https://user-images.githubusercontent.com/38368040/170860074-b7577b15-d2bf-4efd-9fca-ccec9e7db884.png)

### 僵尸进程

主进程通过 fork 创建了子进程，如果子进程退出之后父进程没有获取子进程的状态信息，那么子进程中保存的进程号/退出状态/运行时间等都不会被释放，进程号会一直被占用

```js
const fork = require('child_process').fork;

zombie();

function zombie() {
  const worker = fork('./worker.js');
  console.log(`Worker is created, pid: ${worker.pid}, ppid: ${process.pid}`);
  while (1) {} // 主进程永久阻塞
}
```

![11](https://user-images.githubusercontent.com/38368040/170860077-e0a32859-b8c7-4a77-9128-be57481d8d42.png)

// TODO: 下一篇进程状态连接
进程的状态

- R 运行状态(running): 并不意味着进程一定在运行中，它表明进程要么是在运行中要么在运行队列里。
- S 睡眠状态(sleeping): 意味着进程在等待事件完成(这里的睡眠有时候也叫做可中断睡眠 interruptible sleep)
- D 磁盘休眠状态(Disk sleep): 有时候也叫不可中断睡眠状态（uninterruptible sleep），在这个状态的进程通常会等待 IO 的结束
- T 停止状态(stopped): 可以通过发送 SIGSTOP 信号给进程来停止（T）进程。这个被暂停的进程可以通过发送 SIGCONT 信号让进程继续运行
- X 死亡状态(dead): 这个状态只是一个返回状态，你不会在任务列表里看到这个状态。
- Z 僵死状态(zombie)

原本在 Node 中，子进程退出之后，父进程可以感知到并且清理子进程资源，正常情况下，开发者是无需感知的。

该示例之所以能够成为僵尸进程是因为`while(1){}`吃满了父进程的 CPU，无法处理子进程的退出信号。

修改上述代码，子进程退出之后，父进程可以监听到，就不会有僵尸进程的产生。

```js
const fork = require('child_process').fork;

zombie();

function zombie() {
  const worker = fork('./worker.js');
  worker
    .on('exit', () => {
      console.log('exit');
    })
    .on('close', () => {
      console.log('close');
    });
}
```

#### 僵尸进程和孤儿进程区别

![12](https://user-images.githubusercontent.com/38368040/170860078-0dc0ae33-1713-414d-b46c-c5e52b6471be.png)

### 守护进程

#### 是什么

守护进程是一个在后台运行并且不受任何终端控制的进程，并且能够因为某个异常导致进程退出的时候重启子进程
守护进程一般在系统启动时开始运行，除非强行终止，否则直到系统关机都保持运行

#### 为什么脱离终端

当我们编写 Node 代码的时候，我们会使用终端来启动一个进程，通过命令行(Ctrl + C)或者手动关闭终端，当前程序会被关掉这样进程也被关掉了。
但是对于守护进程来说，它需要脱离这种限制，需要在整个系统关闭时才退出，所以不能够依赖终端

#### 如何查看守护进程

使用命令 ps axj a: 显示所有 x: 显示没有终端控制的进程 j: 显示相关信息
![image](https://user-images.githubusercontent.com/38368040/174937045-3444580c-ffe1-4ff0-9307-57abb369296e.png)

#### 进程组/会话/控制终端

##### 进程组是什么

- 每个进程属于一个进程组
- 每个进程组都有一个进程组号(PGID)，等于该进程组组长的 PID
- 一个进程只能为它自己或子进程设置 PGID 号，默认情况下新创建的进程会继承父进程的 PGID

##### 会话期是什么

- 是一个或多个进程组的集合，使用 SID 来标识
- 登录后新建一个会话，登录之后的第一个进程就是会话领头进程，对于领头进程来说 PID = SID
- 一个会话对应一个控制终端

##### 控制终端

一个会话会有一个控制终端用于执行操作，控制进程打开一个终端之后，该终端就会成为当前会话的控制终端

##### 前台进程组/后台进程组

前台进程组：该进程组的进程能够对终端设备进行读写操作
后台进程组：该进程组的进程能够对终端设备进行写操作

##### 它们的关系

![image](https://user-images.githubusercontent.com/38368040/174974029-bfcf28f5-b9f3-43dd-affd-807594e57eae.png)

#### 怎么做

##### 实现监听子进程退出

利用 NodeJS 的事件机制，监听 exit 事件

- 在 master.js 中使用 fork 创建子进程
- 监听 exit 事件，1s 之后创建一个新的子进程

```js
// master.js
const { fork } = require('child_process');

const forkChild = () => {
  const child = fork('log.js');
  child.on('exit', () => {
    setTimeout(() => {
      forkChild();
    }, 1000);
  });
};

forkChild();

// log.js
const fs = require('fs');
const path = require('path');

fs.open(path.resolve(__dirname, 'log.txt'), 'w', function (err, fd) {
  setInterval(() => {
    fs.write(fd, process.pid + '\n', function () {});
  }, 2000);
});
```

使用 node master 启动项目之后，使用 kill 命令杀掉对应的子进程，能够成功重启子进程，守护进程生效~
<img width="721" alt="image" src="https://user-images.githubusercontent.com/38368040/175310465-ae81f9f2-bef8-4c32-a6e6-62915f13f16d.png">

##### 如何退出终端运行？

使用 setsid，那 setsid 能做什么？

- 该进程变成一个新会话的会话组长
- 该进程变成一个新进程组的组长
- 该进程没有控制终端

在 Node 中如何调用 setsid 方法呢？
Node 尚未对 setsid 进程封装，但是我们可以通过 child_process.spawn 来调用该方法。
spawn 中有一个配置项 detached，当其`detached: true`时，会调用 setsid 方法 > 在非 Windows 平台上，如果 options.detached 设置为 true，则子进程将成为新进程组和会话的领导者。 子进程可以在父进程退出后继续运行。

开始实现

1.  在 command 中使用 child_process.spawn(master) 创建子进程
2.  对进程 master 执行 setsid 方法
3.  进程 command 退出，进程 master 由 init 进程接管，此时进程 master 为守护进程

创建 command，使用 spawn 方法衍生子进程

```js
//command.js
const { spawn } = require('child_process');

spawn('node', ['./master.js'], {
  detached: true,
});

process.exit(0);
```

<img width="863" alt="image" src="https://user-images.githubusercontent.com/38368040/175311494-63935f58-bef4-4822-9455-f60f0bee0bc0.png">

当我们执行 node command 之后，我们的主进程就会关闭，但是我们的子进程还在继续运行，且不受终端控制，该进程就是我们创建的守护进程

🤔 我们为什么会 fork/spawn 两次？
第一次执行 spawn：让 master 去调用 setsid 方法，成为会话期的组长，切不受终端的控制
第二次执行 fork：因为第一次 spawn 出来的 master 通过 setsid 成为会话期的组长，能够再一次打开控制终端。再一次 fork 之后，创建出来 log 进程，无法打开新的控制终端

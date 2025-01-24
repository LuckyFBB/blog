---
title: Nodejs 中的进程间通信
group:
  title: 进程
order: 3
---

## 前置知识

### 文件描述符

在 Linux 系统中，一切都看成文件，当进程打开现有文件时，会返回一个文件描述符。
文件描述符是操作系统为了管理已经被进程打开的文件所创建的索引，用来指向被打开的文件。
当我们的进程启动之后，操作系统会给每一个进程分配一个 PCB 控制块，PCB 中会有一个文件描述符表，存放当前进程所有的文件描述符，即当前进程打开的所有文件。

🤔 进程中的文件描述符是如何和系统文件对应起来的？
在内核中，系统会维护另外两种表

- 打开文件表(Open file table)
- i-node 表(i-node table)

文件描述符就是数组的下标，从 0 开始往上递增，0/1/2 默认是我们的输入/输出/错误流的文件描述符
在 PCB 中维护的文件描述表中，可以根据文件描述符找到对应了文件指针，找到对应的打开文件表
打开文件表中维护了：文件偏移量(读写文件的时候会更新)；对于文件的状态标识；指向 i-node 表的指针
想要真正的操作文件，还得靠 i-node 表，能够获取到真实文件的相关信息

他们之间的关系

<img width="700" alt="image" src="https://user-images.githubusercontent.com/38368040/182007262-8e56483d-bd5e-4846-bc1f-1fd855e0eb48.png">

**图解**

- 在进程 A 中，文件描述符 1/20 均指向了同一打开文件表项 23，这可能是对同一文件多次调用了 open 函数形成的
- 进程 A/B 的文件描述符 2 都指向同一文件，这可能是调用了 fork 创建子进程，A/B 是父子关系进程
- 进程 A 的文件描述符 0 和进程 B 的文件描述符指向了不同的打开文件表项，但这些表项指向了同一个文件，这可能是 A/B 进程分别对同一文件发起了 open 调用

**总结**

- 同一进程的不同文件描述符可以指向同一个文件
- 不同进程可以拥有相同的文件描述符
- 不同进程的同一文件描述符可以指向不同的文件
- 不同进程的不同文件描述符可以指向同一个文件

### 文件描述符的重定向

每次读写进程的时候，都是从文件描述符下手，找到对应的打开文件表项，再找到对应的 i-node 表

🤔 如何实现文件描述符重定向？
因为在文件描述符表中，能够找到对应的文件指针，如果我们改变了文件指针，是不是后续的两个表内容就发生了改变
例如：文件描述符 1 指向的显示器，那么将文件描述符 1 指向 log.txt 文件，那么文件描述符 1 也就和 log.txt 对应起来了

#### shell 对文件描述符的重定向

\> 是输出重定向符号，< 是输入重定向符号，它们是文件描述符操作符
\> 和 < 通过修改文件描述符改变了文件指针的指向，来能够实现重定向的功能

我们使用`cat hello.txt`时，默认会将结果输出到显示器上，使用 > 来重定向。`cat hello.txt 1 > log.txt`
以输出的方式打开文件 log.txt，并绑定到文件描述符 1 上

<img width="700" alt="image" src="https://user-images.githubusercontent.com/38368040/182008249-93c10deb-a9c4-47ea-b858-4957d24c486b.png">

#### c 函数对文件描述符的重定向

##### dup

dup 函数是用来打开一个新的文件描述符，指向和 oldfd 同一个文件，共享文件偏移量和文件状态

```c
int main(int argc, char const *argv[])
{
    int fd = open("log.txt");
    int copyFd = dup(fd);
    //将fd阅读文件置于文件末尾，计算偏移量。
    cout << "fd = " << fd << " 偏移量： " << lseek(fd, 0, SEEK_END) << endl;
    //现在我们计算copyFd的偏移量
    cout << "copyFd = " << copyFd << "偏移量：" << lseek(copyFd, 0, SEEK_CUR) << endl;
    return 0;
}
```

<img width="700" alt="image" src="https://user-images.githubusercontent.com/38368040/182008678-d743d7e1-f991-44b1-9cc3-df32d60cb1a6.png">

调用 dup(3) 的时候，会打开新的最小描述符，也就是 4，这个 4 指向了 3 所指向的文件，操作任意一个 fd 都是修改的一个文件

##### dup2

dup2 函数，把指定的 newfd 也指向 oldfd 指向的文件。执行完 dup2 之后，newfd 和 oldfd 同时指向同一个文件，共享文件偏移量和文件状态

```c
int main(int argc, char const *argv[])
{
    int oldfd = open("log.txt");
    int newfd = open("log1.txt");
    dup2(oldfd, newfd);
    //将fd阅读文件置于文件末尾，计算偏移量。
    cout << "fd = " << fd << " 偏移量： " << lseek(fd, 0, SEEK_END) << endl;
    //现在我们计算copyFd的偏移量
    cout << "copyFd = " << copyFd << "偏移量：" << lseek(copyFd, 0, SEEK_CUR) << endl;
    return 0;
}
```

<img width="700" alt="image" src="https://user-images.githubusercontent.com/38368040/182008862-8fc40fce-001f-4381-b71d-8ffc980a25af.png">

## Node 中通信原理

Node 中的 IPC 通道具体实现是由 [libuv](https://luohaha.github.io/Chinese-uvbook/source/introduction.html) 提供的。根据系统的不同实现方式不同，window 下采用命名管道实现，\*nix 下采用 Domain Socket 实现。在应用层只体现为 message 事件和 send 方法。

<img width="700" alt="image" src="https://user-images.githubusercontent.com/38368040/188300844-7a437a02-f8b0-4e9d-9fb6-fa2c28107ca1.png">

父进程在实际创建子进程之前，会创建 IPC 通道并监听它，等到创建出真实的子进程后，通过环境变量(NODE_CHANNEL_FD)告诉子进程该 IPC 通道的文件描述符。

子进程在启动的过程中，会根据该文件描述符去连接 IPC 通道，从而完成父子进程的连接。

建立连接之后可以自由的通信了，IPC 通道是使用命名管道或者 Domain Socket 创建的，属于双向通信。并且它是在系统内核中完成的进程通信

<img width="700" alt="image" src="https://user-images.githubusercontent.com/38368040/179391106-7ec14866-a7cd-42b8-a9fb-b6ab01692eb9.png">

:::info{title=" "}
⚠️  只有在启动的子进程是 Node 进程时，子进程才会根据环境变量去连接对应的 IPC 通道，对于其他类型的子进程则无法实现进程间通信，除非其他进程也按着该约定去连接这个 IPC 通道。
:::

### unix domain socket

#### 是什么

我们知道经典的通信方式是有 Socket，我们平时熟知的 Socket 是基于网络协议的，用于两个不同主机上的两个进程通信，通信需要指定 IP/Host 等。
但如果我们同一台主机上的两个进程想要通信，如果使用 Socket 需要指定 IP/Host，经过网络协议等，会显得过于繁琐。所以 Unix Domain Socket 诞生了。

UDS 的优势：

- 绑定 socket 文件而不是绑定 IP/Host；不需要经过网络协议，而是数据的拷贝
- 也支持 SOCK_STREAM(流套接字)和 SOCK_DGRAM(数据包套接字)，但由于是在本机通过内核通信，不会丢包也不会出现发送包的次序和接收包的次序不一致的问题

#### 如何实现

##### 流程图

<img width="700" alt="image" src="https://user-images.githubusercontent.com/38368040/185744830-f515cdc1-a4d0-4cab-b7b7-73b258af313d.png">

##### Server 端

```c
int main(int argc, char *argv[])
{
    int server_fd ,ret, client_fd;
    struct sockaddr_un serv, client;
    socklen_t len = sizeof(client);
    char buf[1024] = {0};
    int recvlen;

    // 创建 socket
    server_fd = socket(AF_LOCAL, SOCK_STREAM, 0);

    // 初始化 server 信息
    serv.sun_family = AF_LOCAL;
    strcpy(serv.sun_path, "server.sock");

    // 绑定
    ret = bind(server_fd, (struct sockaddr *)&serv, sizeof(serv));

    //设置监听，设置能够同时和服务端连接的客户端数量
    ret = listen(server_fd, 36);

    //等待客户端连接
    client_fd = accept(server_fd, (struct sockaddr *)&client, &len);
    printf("=====client bind file:%s\n", client.sun_path);

    while (1) {
        recvlen = recv(client_fd, buf, sizeof(buf), 0);
        if (recvlen == -1) {
            perror("recv error");
            return -1;
        } else if (recvlen == 0) {
            printf("client disconnet...\n");
            close(client_fd);
            break;
        } else {
            printf("recv buf %s\n", buf);
            send(client_fd, buf, recvlen, 0);
        }
    }

    close(client_fd);
    close(server_fd);
    return 0;
}
```

##### Client 端

```c
int main(int argc, char *argv[])
{
    int client_fd ,ret;
    struct sockaddr_un serv, client;
    socklen_t len = sizeof(client);
    char buf[1024] = {0};
    int recvlen;

    //创建socket
    client_fd = socket(AF_LOCAL, SOCK_STREAM, 0);

    //给客户端绑定一个套接字文件
    client.sun_family = AF_LOCAL;
    strcpy(client.sun_path, "client.sock");
    ret = bind(client_fd, (struct sockaddr *)&client, sizeof(client));

    //初始化server信息
    serv.sun_family = AF_LOCAL;
    strcpy(serv.sun_path, "server.sock");
    //连接
    connect(client_fd, (struct sockaddr *)&serv, sizeof(serv));

    while (1) {
        fgets(buf, sizeof(buf), stdin);
        send(client_fd, buf, strlen(buf)+1, 0);

        recv(client_fd, buf, sizeof(buf), 0);
        printf("recv buf %s\n", buf);
    }

    close(client_fd);
    return 0;
}
```

### 命名管道(Named Pipe)

#### 是什么

命名管道是可以在同一台计算机的不同进程之间，或者跨越一个网络的不同计算机的不同进程之间的可靠的单向或者双向的数据通信。
创建命名管道的进程被称为管道服务端(Pipe Server)，连接到这个管道的进程称为管道客户端(Pipe Client)。

命名管道的命名规范：\\server\pipe[\path]\name

- 其中 server 指定一个服务器的名字，本机适用 \\. 表示，\\192.10.10.1 表示网络上的服务器
- \pipe 是一个不可变化的字串，用于指定该文件属于 NPFS(Named Pipe File System)
- [\path]\name 是唯一命名管道名称的标识

#### 怎么实现

##### 流程图

<img width="700" alt="image" src="https://user-images.githubusercontent.com/38368040/182063743-61d5d963-dd52-4996-9d3c-e6985a237839.png">

##### Pipe Server

```c
void ServerTest()
{
    HANDLE  serverNamePipe;
    char    pipeName[MAX_PATH] = {0};
    char    szReadBuf[MAX_BUFFER] = {0};
    char    szWriteBuf[MAX_BUFFER] = {0};
    DWORD   dwNumRead = 0;
    DWORD   dwNumWrite = 0;

    strcpy(pipeName, "\\\\.\\pipe\\shuangxuPipeTest");
    // 创建管道实例
    serverNamePipe = CreateNamedPipeA(pipeName,
        PIPE_ACCESS_DUPLEX|FILE_FLAG_WRITE_THROUGH,
        PIPE_TYPE_BYTE|PIPE_READMODE_BYTE|PIPE_WAIT,
        PIPE_UNLIMITED_INSTANCES, 0, 0, 0, NULL);
    WriteLog("创建管道成功...");
    // 等待客户端连接
    BOOL bRt= ConnectNamedPipe(serverNamePipe, NULL );
    WriteLog( "收到客户端的连接成功...");
    // 接收数据
    memset( szReadBuf, 0, MAX_BUFFER );
    bRt = ReadFile(serverNamePipe, szReadBuf, MAX_BUFFER-1, &dwNumRead, NULL );
    // 业务逻辑处理 （只为测试用返回原来的数据）
    WriteLog( "收到客户数据:[%s]", szReadBuf);
    // 发送数据
    if( !WriteFile(serverNamePipe, szWriteBuf, dwNumRead, &dwNumWrite, NULL ) )
    {
        WriteLog("向客户写入数据失败:[%#x]", GetLastError());
        return ;
    }
    WriteLog("写入数据成功...");
}
```

##### Pipe Client

```c
void ClientTest()
{
    char    pipeName[MAX_PATH] = {0};
    HANDLE  clientNamePipe;
    DWORD   dwRet;
    char    szReadBuf[MAX_BUFFER] = {0};
    char    szWriteBuf[MAX_BUFFER] = {0};
    DWORD   dwNumRead = 0;
    DWORD   dwNumWrite = 0;

    strcpy(pipeName, "\\\\.\\pipe\\shuangxuPipeTest");
    // 检测管道是否可用
    if(!WaitNamedPipeA(pipeName, 10000)){
        WriteLog("管道[%s]无法打开", pipeName);
        return ;
    }
    // 连接管道
    clientNamePipe = CreateFileA(pipeName,
        GENERIC_READ|GENERIC_WRITE,
        0,
        NULL,
        OPEN_EXISTING,
        FILE_ATTRIBUTE_NORMAL,
        NULL);
    WriteLog("管道连接成功...");
    scanf( "%s", szWritebuf );
    // 发送数据
    if( !WriteFile(clientNamePipe, szWriteBuf, strlen(szWriteBuf), &dwNumWrite, NULL)){
        WriteLog("发送数据失败,GetLastError=[%#x]", GetLastError());
        return ;
    }
    printf("发送数据成功:%s\n", szWritebuf );
    // 接收数据
    if( !ReadFile(clientNamePipe, szReadBuf, MAX_BUFFER-1, &dwNumRead, NULL)){
        WriteLog("接收数据失败,GetLastError=[%#x]", GetLastError() );
        return ;
    }
    WriteLog( "接收到服务器返回:%s", szReadBuf );
    // 关闭管道
    CloseHandle(clientNamePipe);
}
```

## node 创建子进程的流程

### Unix

<img width="700" alt="image" src="https://user-images.githubusercontent.com/38368040/185771767-2fc1335e-c8a3-4953-bbac-09f6629b2803.png">

对于创建子进程、创建管道、重定向管道均是在 c 层实现的

#### 创建子进程

```c
int main(int argc,char *argv[]){
    pid_t pid = fork();
    if (pid < 0) {
        // 错误
    } else if(pid == 0) {
        // 子进程
    } else {
        // 父进程
    }
}
```

#### 创建套接字

使用 socketpair 建立一对匿名的已经连接的套接字，其创建出来的套接字是全双工的，可以实现在同一个文件描述符中进行读写的功能

```c
int main ()
{
    int fd[2];
    int r = socketpair(AF_UNIX, SOCK_STREAM, 0, fd);

    if (fork()){ /* 父进程 */
        int val = 0;
        close(fd[1]);
        while (1){
            sleep(1);
            ++val;
            printf("发送数据: %d\n", val);
            write(fd[0], &val, sizeof(val));
            read(fd[0], &val, sizeof(val));
            printf("接收数据: %d\n", val);
        }
    } else {  /*子进程*/
        int val;
        close(fd[0]);
        while(1){
            read(fd[1], &val, sizeof(val));
            ++val;
            write(fd[1], &val, sizeof(val));
        }
    }
}
```

当我们使用 socketpair 创建了套接字之后，父进程关闭了 fd[1]，子进程关闭了 fd[0]。子进程可以通过 fd[1] 读写数据；同理主进程通过 fd[0]读写数据完成通信。

[对应代码](https://github.com/nodejs/node/blob/main/deps/uv/src/unix/process.c#L344)

## child_process.fork 的详细调用

fork 函数开启一个子进程的流程

<img width="700" alt="image" src="https://user-images.githubusercontent.com/38368040/185772970-9f946fff-a000-4eae-90ba-9107a116e020.png">

### 初始化参数中的 options.stdio，并且调用 spawn 函数

```js
function spawn(file, args, options) {
  const child = new ChildProcess();

  child.spawn(options);
}
```

### 创建 ChildProcess 实例，创建子进程也是调用 C++ 层 this.\_handle.spawn 方法

```js
function ChildProcess() {
  // C++层定义
  this._handle = new Process();
}
```

### 通过 child.spawn 调用到 ChildProcess.prototype.spawn 方法中。

其中 getValidStdio 方法会根据 options.stdio 创建和 C++ 交互的 Pipe 对象，并获得对应的文件描述符，将文件描述符写入到环境变量 NODE_CHANNEL_FD 中，调用 C++ 层创建子进程，在调用 setupChannel 方法

```js
ChildProcess.prototype.spawn = function (options) {
  // 预处理进程间通信的数据结构
  stdio = getValidStdio(stdio, false);
  const ipc = stdio.ipc;
  const ipcFd = stdio.ipcFd;
  //将文件描述符写入环境变量中
  if (ipc !== undefined) {
    ArrayPrototypePush(options.envPairs, `NODE_CHANNEL_FD=${ipcFd}`);
  }
  // 创建进程
  const err = this._handle.spawn(options);
  // 添加send方法和监听IPC中数据
  if (ipc !== undefined) setupChannel(this, ipc, serialization);
};
```

### 子进程启动

会根据环境变量中是否存在 NODE_CHANNEL_FD 判断是否调用 \_forkChild 方法，创建一个 Pipe 对象, 同时调用 open 方法打开对应的文件描述符，在调用 setupChannel

```js
function _forkChild(fd, serializationMode) {
  const p = new Pipe(PipeConstants.IPC);
  p.open(fd);
  p.unref();
  const control = setupChannel(process, p, serializationMode);
}
```

## 句柄传递

### setupChannel

主要是完成了处理接收的消息、发送消息、处理文件描述符传递等

```js
function setipChannel() {
  channel.onread = function (arrayBuffer) {
    //...
  };
  target.on('internalMessage', function (message, handle) {
    //...
  });
  target.send = function (message, handle, options, callback) {
    //...
  };
  target._send = function (message, handle, options, callback) {
    //...
  };
  function handleMessage(message, handle, internal) {
    //...
  }
}
```

- target.send: process.send 方法，这里 target 就是进程对象本身.
- target.\_send: 执行具体 send 逻辑的函数,  当参数 handle 不存在时, 表示普通的消息传递；若存在，包装为内部对象，表明是一个 internalMessage 事件触发。调用使用 JSON.stringify 序列化对象, 使用 channel.writeUtf8String  写入文件描述符中
- channel.onread: 获取到数据时触发, 跟 channel.writeUtf8String 相对应。通过  JSON.parse 反序列化 message  之后, 调用  handleMessage 进而触发对应事件
- handleMessage: 用来判断是触发 message 事件还是 internalMessage 事件
- target.on('internalMessage'): 针对内部对象做特殊处理，在调用 message 事件

<img width="700" alt="image" src="https://user-images.githubusercontent.com/38368040/185774300-230c37a0-c816-4cdd-89da-1fbdfcbc6bea.png">

### 进程间消息传递

- 父进程通过 child.send 发送消息 和 server/socket 句柄对象
- 普通消息直接 JSON.stringify 序列化；对于句柄对象来说，需要先包装成为内部对象

```js
message = {
  cmd: 'NODE_HANDLE',
  type: null,
  msg: message,
};
```

通过 handleConversion.[message.type].send 的方法取出句柄对象对应的 C++ 层面的 TCP 对象，在采用 JSON.stringify 序列化

```js
const handleConversion = {
  'net.Server': {
    simultaneousAccepts: true,

    send(message, server, options) {
      return server._handle;
    },

    got(message, handle, emit) {
      const server = new net.Server();
      server.listen(handle, () => {
        emit(server);
      });
    },
  },
  //....
};
```

- 最后将序列化后的内部对象和 TCP 对象写入到 IPC 通道中
- 子进程在接收到消息之后，使用 JSON.parse 反序列化消息，如果为内部对象触发 internalMessage 事件
- 检查是否带有 TCP 对象，通过 handleConversion.[message.type].got 得到和父进程一样的句柄对象
- 最后发触发 message 事件传递处理好的消息和句柄对象，子进程通过 process.on 接收

## 参考链接

- [分析 child_process.fork 以及进程间消息传递](https://zhuanlan.zhihu.com/p/342049236)
- [Node.js 源码剖析 - 进程](https://theanarkh.github.io/understand-nodejs/chapter13-%E8%BF%9B%E7%A8%8B/)
- [child_process 源码阅读](https://github.com/EasonYou/my-blog/issues/13)

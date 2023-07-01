---
title: 进程间通信之管道
group:
  title: 操作系统
  order: 1
order: 1
---

在之前我们讲了 [Node 中的进程通信](/node/inter-process-communication-in-nodejs)，在 \*nix 系统下使用的是 Unix Domain Socket，在 window 系统下使用的的命名管道。

其实进程间的通信远不止上述两种，该篇文章我们来了解更多吧！

## 匿名管道

在使用 git 命令批量删除本地分支时，经常使用`git branch | grep 'fix_5.2.x' | xargs git branch -d`这个命令，那其实 | 就是我们常说的管道，前面的命令的输出作为后一个命令的输入。

管道是一种**半双工**的通信方式，数据只能有一个流动方向，数据只能从一端写入，从另一端读取。想要实现双方通信，需要实现两个管道。

```cpp
int _pipe[2];
int ret = pipe(_pipe);
```

在 C++ 中，创建管道用 pipe 函数。调用 pipe 函数，会在内核中开辟出一块缓冲区用来进行进程间通信，这块缓冲区称为**管道**，它有一个读端和一个写端。\_pipe[0] 指向管道的读端，\_pipe[1] 指向管道的写端。通过 read(\_pipe[0]) 读取管道中的内容，write(\_pipe[1]) 向管道中写入内容。

### **管道通信的步骤**

1. 父进程创建管道，得到两个文件描述符指向管道的两端

   ![Untitled](https://github.com/LuckyFBB/blog/assets/38368040/8da4618a-68e9-4513-8e17-66ca5cfd9d8a)

2. fork 子进程，子进程复制两个文件描述符指向同一管道

   ![Untitled 1](https://github.com/LuckyFBB/blog/assets/38368040/bf9401d8-6e78-41e6-a958-cb72a7d9f2cd)

3. 父进程关闭写端 \_pipe[1]，子进程关闭读端 \_pipe[0]，从而实现通信

   ![Untitled 2](https://github.com/LuckyFBB/blog/assets/38368040/3e286cf7-3cd9-40cd-a770-514a1e2e8eb3)

```cpp
int main()
{
    int _pipe[2];
    int ret = pipe(_pipe);
    if (ret < 0)
    {
        perror("pipe\n");
    }

    pid_t id = fork();
    if (id < 0)
    {
        perror("fork\n");
    }
    // 子进程
    else if (id == 0)
    {
        close(_pipe[0]);
        char msg[1024] = {0};
        while (1)
        {
            fgets(msg, sizeof(msg), stdin);
            printf("send msg %s\n", msg);
            write(_pipe[1], msg, strlen(msg));
            sleep(1);
        }
    }
    // 父进程
    else
    {
        close(_pipe[1]);
        char msg[1024] = {0};
        while (1)
        {
            memset(msg, '\0', sizeof(msg));
            read(_pipe[0], msg, sizeof(msg));
            printf("recv msg %s\n", msg);
        }
    }
    return 0;
}
```

### 匿名管道的特点

1. 只能单向通信，且只能为存在血缘关系的进程
2. 依赖于文件系统
3. 生命周期跟随进程，在内存中，进程结束后被释放

⭕️ 如果想利用匿名管道实现双向通信，则需要创建两个管道，且需要继承两个管道的文件描述符。

## 命名管道

匿名管道中，只有血缘关系的进程才可以进程通信，命名管道(FIFO)解决了这个问题。

它提供**一个路径名**与之关联，以文件的形式存储在文件系统。即使进程与创建 FIFO 的进程不存在亲缘关系，只要可以访问该路径，就能够通过 FIFO 相互通信。

FIFO 表明是先进先出(First-In-First-Out)，Unix 中的 FIFO 类似管道，是一个半双工的数据流。

```cpp
#include <sys/types.h>
#include <sys/stat.h>

 int ret = mkfifo(pathname, mode);
```

第一个参数是 Unix 的路径名，又为 FIFO 的名字。

mode 参数为文件的权限位，创建 FIFO 后，需要使用 open 函数打开文件来进行读或者写操作。FIFO 不能打开来既可以读又可以写。write 总是从尾部添加数据，read 总是从开头添加数据。

### 命名管道的实现

```cpp
#include <stdio.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <unistd.h>
#include <fcntl.h>
#include <string.h>

#define _PATH_NAME_ "./myfifo"
#define _SIZE_ 100

int main()
{
		// 创建管道时需要在 mode 参数位置传 S_IFIFO,表明创建的是命名管道
    int ret = mkfifo(_PATH_NAME_, S_IFIFO | 0666);
    if (ret == -1)
    {
        printf("make file error\n");
        return -1;
    }
    char buf[_SIZE_];
    memset(buf, '\0', sizeof(buf));
    int fd = open(_PATH_NAME_, O_WRONLY);
    while (true)
    {
        fgets(buf, sizeof(buf) - 1, stdin);
        int ret = write(fd, buf, strlen(buf) + 1);
        if (ret < 0)
        {
            printf("write error\n");
            break;
        }
    }
    close(fd);
		unlink(_PATH_NAME_);
    return 0;
}
```

```cpp
#include<stdio.h>
#include<sys/types.h>
#include<sys/stat.h>
#include<unistd.h>
#include<fcntl.h>
#include<string.h>

#define _PATH_NAME_ "./myfifo"
#define _SIZE_  100

int main()
{
    int fd = open(_PATH_NAME_, O_RDONLY);
    if(fd < 0)
    {
        printf("open file error\n");
        return 1;
    }
    char buf[_SIZE_];
    memset(buf, '\0', sizeof(buf));
    while(true)
    {
        int ret = read(fd, buf, sizeof(buf));
        if(ret < 0)
        {
            printf("read error\n");
            break;
        }
        printf("%s\n", buf);
        int ret1 = write(fd, buf, sizeof(buf));
    }
    close(fd);
		unlink(_PATH_NAME_);
    return 0;
}
```

## 命名管道和匿名管道的区别

![Untitled 3](https://github.com/LuckyFBB/blog/assets/38368040/d2c97d01-de05-4dcc-902b-51aeb5f27edb)

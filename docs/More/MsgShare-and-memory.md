---
title: 进程间通信之消息队列和内存共享
group:
  title: 操作系统
  order: 1
order: 2
---

## 消息队列

消息队列是在两个不相关进程间传递数据的一种简单、高效的方式，其独立于发送进程 、接收进程存在。

消息队列提供了一种一个进程向另一个进程发送一个数据块的方法，数据块具有特定的结构。

```cpp
struct msgbuf
{
    long mtype;         /* message type, must be > 0 */
    char mtext[50];     /* message data */
};
```

写消息等于往队列中加入一个消息块，读消息是删除队列中的消息块.

操作系统中的消息队列都有**一个标识符 key**，每个进程可以通过该标识符打开这个队列，向其添加一个消息块或者读取一个消息块来实现不同进程间的通信，需要通信的进程需要读取。

消息块是进程双方相互约定好的数据格式，其中会带有消息的类型，进程可以通过类型来判断接受哪个消息块。消息块有固定大小(MSGMAX)，因此不适合传输较大的数据。

消息队列的生命周期跟随内核，如果没有释放消息队列或者关闭操作系统，**消息队列就一直存在**。

![Untitled](https://github.com/LuckyFBB/blog/assets/38368040/676aec2c-9583-49fa-b051-6b034e48c6d8)

### 消息队列实现步骤

1. 创建消息队列

   ```cpp
   int main(){
   	int id = msgget(0x121212, O_CREAT | O_RDWR | 0644);
     if(id < 0)
   	{
   		perror("msgget error");
   		return 1;
     }
   }
   ```

   创建 key 为 0x121212 的消息队列，使用`ipcs -q`来查看对应的消息队列

   <img width="610" alt="Untitled 1" src="https://github.com/LuckyFBB/blog/assets/38368040/b3b452ab-eca2-41a5-aeaa-15463e885e5b">

2. 向消息队列写信息

   ```cpp
   while (1)
   {
       char text[50];
       printf("请输入消息体的内容\n");
       fgets(text, sizeof(text) - 1, stdin);
       int buf_size = sizeof(text) + sizeof(long);
       struct msgbuf *buf = (msgbuf *)malloc(buf_size);
       buf->mtype = i % 2 + 1;
       strcpy(buf->mtext, text);
       int snd_ret = msgsnd(id, buf, buf_size, 0);
       printf("send mtype=%ld, mtext=%s\n", buf->mtype, buf->mtext);
       i++;
       free(buf);
   }
   ```

   在写信息的时候，需要设置 type 和 text

3. 从消息队列读信息

   ```cpp
   while (true)
   {
       char text[50];
       int buf_size = sizeof(text) + sizeof(long);
       struct msgbuf *buf = (msgbuf *)malloc(buf_size);
       bzero(buf, buf_size);
       int rcv_ret = msgrcv(id, buf, buf_size, 2, 0);
       if (rcv_ret >= 0)
       {
           printf("rcv rcv_ret=%d, mtype=%ld, mtext=%s\n", rcv_ret, buf->mtype, buf->mtext);
           free(buf);
           buf = nullptr;
       }
       else
       {
           printf("rcv rcv_ret=%d \n", rcv_ret);
       }
   }
   ```

   在读取消息的时候，msgrcv 可以根据消息体对应的 type 来读取数据

### **消息队列 vs 命名管道**

![Untitled 2](https://github.com/LuckyFBB/blog/assets/38368040/153ec058-5d12-4088-8d2d-50d18f1cd102)

## 共享内存

各进程之间是独立存在，互不影响的。之所以进程间的内存不共享且为何要采用虚拟内存，可以查看[现代操作系统之内存管理读书笔记](https://github.com/mumiao/NodeGuide/blob/main/docs/Memory%20management/README.md)。

只有在共享内存的情况下才能够让进程之间产生联系。共享内存是进程间通信中最简单的方式之一。从进程的角度来说，共享的内存就是可以同时被多个进程访问的内存。

🤔️ 为何又要使用共享内存？

当两个进程进行数据传输，且数据量很大的时候，再使用上述的管道和消息队列就不方便了。不如将两个进程的某块虚拟内存映射到同一块物理内存中。进程间需要传送的数据就不需要来回拷贝，进程 A 写入之后进程 B 就能够获取到了。

<img width="745" alt="Untitled 3" src="https://github.com/LuckyFBB/blog/assets/38368040/d34e5a96-75ae-4755-a196-ab57b99cb0dc">

### 共享内存的实现步骤

<img width="898" alt="Untitled 4" src="https://github.com/LuckyFBB/blog/assets/38368040/4e7b8ef5-5892-458a-9a9e-63ff4c0b50e4">

1. 创建共享内存

   ```cpp
   int shmid = shmget(key, SHM_SIZE, IPC_CREAT | 0666);
   ```

2. 共享内存映射到虚拟内存中

   ```cpp
   char *shmaddr = static_cast<char *>(shmat(shmid, nullptr, 0));
   if (shmaddr == reinterpret_cast<char *>(-1))
   {
       std::cerr << "Failed to attach shared memory.\n";
       exit(EXIT_FAILURE);
   }
   ```

3. 进行通信

   ```cpp
   // 写入共享内存
   std::string message = "Hello, world!";
   std::memcpy(shmaddr, message.c_str(), message.size());

   // 读取共享内存
   std::cout << "Message from shared memory: " << shmaddr << '\n';
   ```

```cpp
#include <iostream>
#include <cstdlib>
#include <cstring>
#include <sys/ipc.h>
#include <sys/shm.h>

#define SHM_SIZE 1024

int main()
{
    key_t key = ftok(".", 'a');
    if (key == -1)
    {
        std::cerr << "Failed to create key.\n";
        exit(EXIT_FAILURE);
    }

    int shmid = shmget(key, SHM_SIZE, IPC_CREAT | 0666);
    if (shmid == -1)
    {
        std::cerr << "Failed to create shared memory.\n";
        exit(EXIT_FAILURE);
    }

    char *shmaddr = static_cast<char *>(shmat(shmid, nullptr, 0));
    if (shmaddr == reinterpret_cast<char *>(-1))
    {
        std::cerr << "Failed to attach shared memory.\n";
        exit(EXIT_FAILURE);
    }

    // 写入共享内存
    std::string message = "Hello, world!";
    std::memcpy(shmaddr, message.c_str(), message.size());

    return 0;
}
```

```cpp
#include <iostream>
#include <cstdlib>
#include <cstring>
#include <sys/ipc.h>
#include <sys/shm.h>

#define SHM_SIZE 1024

int main()
{
    key_t key = ftok(".", 'a');
    if (key == -1)
    {
        std::cerr << "Failed to create key.\n";
        exit(EXIT_FAILURE);
    }

    int shmid = shmget(key, SHM_SIZE, IPC_CREAT | 0666);
    if (shmid == -1)
    {
        std::cerr << "Failed to create shared memory.\n";
        exit(EXIT_FAILURE);
    }

    char *shmaddr = static_cast<char *>(shmat(shmid, nullptr, 0));
    if (shmaddr == reinterpret_cast<char *>(-1))
    {
        std::cerr << "Failed to attach shared memory.\n";
        exit(EXIT_FAILURE);
    }

    // 读取共享内存
    std::cout << "Message from shared memory: " << shmaddr << '\n';

    // 删除共享内存
    if (shmctl(shmid, IPC_RMID, nullptr) == -1)
    {
        std::cerr << "Failed to delete shared memory.\n";
        exit(EXIT_FAILURE);
    }

    return 0;
}
```

共享内存实际上就是进程调用 shmget 分配了一块共享内存块，其余想要通信的进程使用 shmat 方法将进程中的地址空间指向共享内存块中。

解决共享内存的映射，当一个进程不再使用共享内存块的时候应该调用 shmdt 方法与该共享内存快脱离。

如果是释放内存块的进程是最后一个使用该内存块的进程，则调用 shmctl 该内存块将被删除。

### **共享内存的特点**

1. 共享内存是进程间共享数据具有最高的效率。一个进程向共享内存区写入了数据，共享这个内存区域的所有进程就可以立刻看到其中的内容。并不需要通过系统调用或者其它需要切入内核的过程来完成。同时它也避免了对数据的各种不必要的复制
2. 使用共享内存值得注意的是多个进程之间对共享内存区访问读取的互斥。某个进程正在向共享内存区写入数据时，别的进程不应当去读/写当前数据

> 参考链接

[腾讯二面：大白你了解共享内存吗？-51CTO.COM](https://www.51cto.com/article/693037.html)

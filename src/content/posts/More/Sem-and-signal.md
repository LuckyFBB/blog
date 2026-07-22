---
title: 进程间通信之信号量和信号
group:
  title: 操作系统
  order: 1
order: 3
---

## 信号量

在[上一篇文章](/blog/more/msg-share-and-memory#%E5%85%B1%E4%BA%AB%E5%86%85%E5%AD%98)中，我们讲到了共享内存，也写了一个简单的事例来讲解了如何来实现内存通信，读写内存数据。当然我们的事例中只涉及写入一次，读取一次的过程。

🤔️ 如果我们想一边写一边读内存中的数据，我们需要如何实现？

那肯定逃不掉 while 循环，让进程一直处于运行状态，例如下面的代码：

```cpp
// 往内存中写数据
while (true)
{
    std::string message;
    std::cout << "Please enter your message: " << "\n";
    std::getline(std::cin, message);
    std::memcpy(shmaddr, message.c_str(), message.size());
}

// 从内存中读数据
while(true){
		std::cout << "Message from shared memory: " << shmaddr << '\n';
}
```

上述伪代码存在一个问题，即使我们不往内存中写入数据，读数据进程也一直在输出。

🤔️ 有没有一种方式能够实现，写进程写完数据通知到读进程，再让其去读取数据？

这时候就要引入我们的**信号量**了！

### **什么是信号量？**

本质是一个变量(整型/记录型)，表示系统中某种资源的数量。拥有两种原子操作，[查看更多](/blog/more/process-read-notes#%E4%BF%A1%E5%8F%B7%E9%87%8F%E6%9C%BA%E5%88%B6)

- P 操作(wait 语法)：该操作会把信号量减去 1，相减后如果信号量 < 0 则表示资源已经被占用，进程需要阻塞；相减后如果信号量 ≥ 0，则表明还有资源可以使用，进程可以正常执行
- V 操作(signal 语法)：该操作会把信号量加上 1，相加后如果信号量 ≤ 0，则表明当前有阻塞中的进程，于是会把该进程唤醒；相加后如果信号量 > 0，则表明当前没有阻塞中的进程

### 相关 API

1. 创建信号量

   ```cpp
   int semget(key_t key,int nsems,int flags)
   ```

2. 改变信号量

   ```cpp
   int semop(int semid, struct sembuf *sops, size_t nops)
   ```

3. 删除和初始化信号量

```cpp
int semctl(int semid, int semnum, int cmd)
```

### 实现信号量通信

```cpp

// 初始化信号量
int set_semvalue(int semid, int value)
{
    semun arg;
    arg.val = value;
    return semctl(semid, 0, SETVAL, arg);
}

// 进行 wait 操作，减少信号量
int sem_wait(int semid)
{
    struct sembuf sb;
    sb.sem_num = 0;
    sb.sem_op = -1;
    sb.sem_flg = SEM_UNDO;
    return semop(semid, &sb, 1);
}

// 进行 signal 操作，增加信号量
int sem_signal(int semid)
{
    struct sembuf sb;
    sb.sem_num = 0;
    sb.sem_op = 1;
    sb.sem_flg = SEM_UNDO;
    return semop(semid, &sb, 1);
}
```

**写数据的进程**

在我们的写进程中初始化 semid 标识往共享内存中写入的数据个数，调用`sem_signal(semid)`使得 semid 的值增加

```cpp
int main()
{
    key_t memory_key = 0x202020;
    key_t sem_key = 0x191919;

    int shmid = shmget(memory_key, SHM_SIZE, IPC_CREAT | 0666);
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

    int semid = semget(sem_key, 1, IPC_CREAT | 0666);

    if (semid == -1)
    {
        std::cerr << "Failed to create semaphore.\n";
        exit(EXIT_FAILURE);
    }

    set_semvalue(semid, 0); // 初始化写信号量

    // 写进程
    if (fork() == 0)
    {
        while (true)
        {
            std::string message;
            std::cout << "Please enter your message: "
                      << "\n";
            std::getline(std::cin, message);
            std::memcpy(shmaddr, message.c_str(), message.size());
            sem_signal(semid); // 发送写信号量
        }
    }

    // 等待子进程结束
    wait(nullptr);

    // 删除共享内存
    if (shmctl(shmid, IPC_RMID, nullptr) == -1)
    {
        std::cerr << "Failed to delete shared memory.\n";
        exit(EXIT_FAILURE);
    }

    // 删除信号量
    if (semctl(semid, 0, IPC_RMID) == -1)
    {
        std::cerr << "Failed to delete semaphore.\n";
        exit(EXIT_FAILURE);
    }

    return 0;
}
```

**读数据的进程**

读进程中的先进行`sem_wait(semid)`的判断，如果这个值小于 0，表示当前没有资源，阻塞后续的操作

```cpp
int main()
{
    key_t memory_key = 0x202020;
    key_t sem_key = 0x191919;

    int shmid = shmget(memory_key, SHM_SIZE, IPC_CREAT | 0666);
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

    int semid = semget(sem_key, 2, IPC_CREAT | 0666);
    if (semid == -1)
    {
        std::cerr << "Failed to create semaphore.\n";
        exit(EXIT_FAILURE);
    }

    // 读进程
    if (fork() == 0)
    {
        while (true)
        {
            sem_wait(semid); // 等待写信号量
            std::cout << "Message from shared memory: " << shmaddr << '\n';
        }
    }

    // 等待子进程结束
    wait(nullptr);

    // 删除共享内存
    if (shmctl(shmid, IPC_RMID, nullptr) == -1)
    {
        std::cerr << "Failed to delete shared memory.\n";
        exit(EXIT_FAILURE);
    }

    // 删除信号量
    if (semctl(semid + 1, 0, IPC_RMID) == -1)
    {
        std::cerr << "Failed to delete semaphore.\n";
        exit(EXIT_FAILURE);
    }

    return 0;
}
```

### 总结

信号量是一个特殊的变量，程序对其访问都是原子操作，且只允许对它进行 P 操作和 V 操作。

我们通常通过信号来解决多个进程对同一资源的访问竞争的问题，使在任一时刻只能有一个执行线程访问代码的临界区域，也可以说它是协调进程间的对同一资源的访问权，也就是用于同步进程的。

## 信号

信号是在软件层次上对中断机制的一种模拟，是一种异步通信方式

信号用于进程间互相通信或者操作的一种机制，信号可以在任何时候发给某一进程，而无需知道该进程的状态。只需要在进程中设置信号对应的处理函数，当信号到达时，由系统处理函数即可。

### **信号的处理方式**

- 执行默认行为
- 捕捉信号，可以为信号定义处理函数
- 忽略信号，当我们不希望处理某些信号的时候，就可以忽略该信号

### **常见的信号**

![Untitled](/blog/imgs/semAndSignal/Untitled.png)

### **信号来源**

- 硬件来源：用户按键输入 Ctrl+C 退出、硬件异常/故障
- 软件终止：进程调用 kill 函数

### **处理流程**

![Untitled](/blog/imgs/semAndSignal/Untitled%201.png)

1. 信号的接收

   接收信号的任务是由内核代理的，当内核接收到信号后会将其放入对应进程的信号队列中，同时向进程发起一个中断，使其进入内核态

2. 信号的检测
   - 进程从内核态返回用户态进行信号检测
   - 进程在内核态中，从睡眠模式被唤醒时进行信号检测
3. 信号的处理

   信号的处理函数是运行在用户态的，进程会返回用户态执行相应的处理函数。当信号的处理函数执行完成之后，还需要返回内核态，检测是否还有别的信号未处理。

一个完整信号的处理是这样，如果多个信号同时到达便会重复执行步骤 2/3

### 信号示例

1. 更改默认的处理函数

   ```cpp
   void myHandle(int sig)
   {
       std::cout << "Catch a signal :" << sig
                 << "\n";
   }
   int main(void)
   {
       // 设置信号处理函数
       signal(SIGINT, myHandle); // 如果收到SIGINT信号，就执行myhandle,如果未设置信号处理函数，则进行默认处理——终止。
       while (1)
       {
           std::cout << "hello world"
                     << "\n";
           sleep(1);
       }
       return 0;
   }
   ```

2. 杀死子进程和自己

   ```cpp
   int main(int argc, const char *argv[])
   {
       pid_t child_pid;
       pid_t parent_pid = getpid();
       child_pid = fork();
       if (child_pid < 0)
       {
           std::cerr << "fork fail :"
                     << "\n";
           exit(1);
       }

       else if (child_pid == 0)
       {
           std::cout << "child"
                     << "\n";
       }
       else
       {
           std::cout << "father pid" << parent_pid << "    child pid    " << child_pid
                     << "\n";

           kill(child_pid, SIGKILL);
           std::cout << "child killed"
                     << "\n";
           sleep(1);
           std::cout << "father"
                     << "\n";
           wait(NULL);
           raise(SIGKILL);
           std::cout << "father killed"
                     << "\n";
       }
       return 0;
   }
   ```

---
title: 操作系统之内存管理读书笔记
group:
  title: 转载
  order: 4
order: 0
---

<style>
    .quote {
        background-color: #f9f1db;
        padding: 10px;
        border-radius: 8px;
        font-weight: 500;
    }
</style>
<div class="quote">📨 此文转载来源于景明</div>

内存（RAM）是计算机中一种需要认真管理的重要资源。就目前来说，虽然一台普通家用计算机的内存容量已经是 20 世纪 60 年代早期全球最大的计算机 IBM 7094 的内存容量的 10000 倍以上，但是程序大小的增长速度比内存容量的增长速度要快得多。正如帕金森定律所指出的：“不管存储器有多大，程序都可以把它填满”。

每个程序员都梦想拥有这样的内存：它是私有的、容量无限大的、速度无限快的，并且是永久性的存储器（即断电时不会丢失数据）。当我们期望这样的内存时，何不进一步要求它价格低廉呢？遗憾的是，目前的技术还不能为我们提供这样的内存。

内存是什么？怎么来的？带着这些疑问，我们继续往下。

## 存储管理器（memory manager）

经过多年探索，人们提出了“分层存储器体系”（memory hierarchy）的概念，计算机有若干兆（MB）快速、昂贵且易失性的高速缓存（cache），数千兆（GB）速度与价格适中且同样易失性的内存，以及几兆兆（TB）低速、廉价、非易失性的磁盘存储，另外还有诸如 DVD 和 USB 等可移动存储装置。操作系统的工作是将这个存储体系抽象为一个有用的模型并管理这个抽象模型。
![](/blog/imgs/memoryReadNote/%E5%86%85%E5%AD%98.png)

操作系统中管理分层存储器体系的部分称为存储管理器（memory manager）。它的任务是有效地管理内存，即记录哪些内存是正在使用的，哪些内存是空闲的；在进程需要时为其分配内存，在进程使用完后释放内存。

## 无存储管理器抽象

在早期，没有存储器抽象的时候，每一个程序都直接访问物理内存。那时候最简单的物理内存就是：

> 从 0 到某个上限的地址集合，每一个地址对应一个可容纳一定数目二进制位的存储单元，通常是 8 个。

在这种情况下，系统想要同时运行多个程序基本是不可能的。多个程序可能访问相同的物理内存，导致物理内存中的数据互相覆盖，程序就会立即奔溃。

在这种情况下，人们也是想到了如何运行多个程序的办法。

使用[交换技术](#内存技术swapping)。操作系统只需要把当前内存中所有内容保存到磁盘文件中，然后把下一个程序读入到内存中再运行即可。只要在某一个时间内存中只有一个程序，那么就不会发生冲突。

但是交换技术也是有缺陷，如果单个进程所需的内存比物理内存大，该怎么解决？

总之，把物理地址暴露给进程会带来下面几个严重问题。

第一，如果用户程序可以寻址内存的每个字节，它们就可以很容易地（故意地或偶然地）破坏操作系统，从而使系统慢慢地停止运行（除非有特殊的硬件进行保护，如 IBM 360 的锁键模式）。即使在只有一个用户进程运行的情况下，这个问题也是存在的。

第二，使用这种模型，想要同时（如果只有一个 CPU 就轮流执行）运行多个程序是很困难的。在个人计算机上，同时打开几个程序是很常见的（一个文字处理器，一个邮件程序，一个网络浏览器，其中一个当前正在工作，其余的在按下鼠标的时候才会被激活）。在系统中没有对物理内存的抽象的情况下，很难做到上述情景，因此，我们需要其他办法。

## 地址空间

要保证多个应用程序同时处于内存中并且不互相影响，则需要解决两个问题：保护和重定位。

**保护**：操作系统把已经在使用中的物理地址打上标记，防止被其余内存使用

**重定位**：操作系统把用户程序指令中的相对地址变换成为所在存储中的绝对地址的过程

为了解决以上问题，人们创造一个新的内存抽象：地址空间。

地址空间是一个进程可用于寻址内存的一套地址集合。每个进程都有一个自己的地址空间，并且这个地址空间独立于其他进程的地址空间。

就像 CPU 运行程序抽象出了进程的概念一样，地址空间是对于程序来说，就是抽象的内存。

并且，地址空间的概念非常的通用，在很多的场合出现，非常的贴近我们的生活。就比如手机号码，通常是一个 11 位的数字，理论上可以从 000 0000 000 到 999 9999 9999。这个就可以算是地址空间。再或者我们 ipv4 的地址，由 12 位数字构成，可以从 000 000 000 000 到 255 255 255 255，这个也是一种地址空间。总结来说就是由规定一个范围的，存在下限与上限的，都可以称为地址空间。

那么如何规定一个程序所在内存的地址下限和上限呢？

### 基址寄存器与界限寄存器

操作系统使用了一种简单的重定位方法，把程序的地址空间映射到物理内存的不同部分。

在 CPU 上配置了两个特殊的硬件寄存器，通常叫做基址寄存器与界限寄存器。

当一个进程运行时，程序的起始物理地址装载到基址寄存器中，程序的长度装载到界限寄存器中。

每次一个进程访问内存，取一条指令，读或写一个数据字，CPU 硬件会在把地址发送到内存总线前，自动把基址值加到进程发出的地址值上。同时，它检查程序提供的地址是否等于或大于界限寄存器里的值。如果访问的地址超过了界限，会产生错误并中止访问。

使用基址寄存器和界限寄存器重定位的缺点是，每次访问内存都需要进行加法和比较运算。比较可以做得很快，但是加法由于进位传递时间的问题，在没有使用特殊电路的情况下会显得很慢。

## 内存技术（swapping）

如果计算机物理内存足够大，就可以保存所有进程，然而，现实情况下却是，多个进程合起来所需的内存就超过计算机的物理内存。造成了内存超载。

有两种处理内存超载的通用方法。最简单的策略是交换（swapping）技术，即把一个进程完整调入内存，使该进程运行一段时间，然后把它存回磁盘。空闲进程主要存储在磁盘上，所以当它们不运行时就不会占用内存（尽管它们的一些进程会周期性地被唤醒以完成相关工作，然后就又进入睡眠状态）。另一种策略是虚拟内存（virtual memory），该策略甚至能使程序在只有一部分被调入内存的情况下运行。

![](/blog/imgs/memoryReadNote/%E4%BA%A4%E6%8D%A2%E6%8A%80%E6%9C%AF.png)
上图中内存随着时间的改变，一开始值 A 进程，之后创建进程 B 和 C 或者从磁盘将它们换入内存。然后 D 被调入，B 被调出，最后 A 再次被调入。由于 A 的位置发生变化，所以在它换入的时候通过软件或者在程序运行期间（多数是这种情况）通过硬件对其地址进行重定位。

交换在内存中产生了多个空闲区（hole，也称为空洞），通过把所有的进程尽可能向下移动，有可能将这些小的空闲区合成一大块。该技术称为内存紧缩（memory compaction）。这个操作通常不进行，因为它要耗费大量的 CPU 时间。例如，一台有 1GB 内存的计算机可以每 20ns 复制 4 个字节，它紧缩全部内存大约要花费 5s。

有一个问题值得注意，即当进程被创建或换入时应该为它分配多大的内存。若进程创建时其大小是固定的并且不再改变，则分配很简单，操作系统准确地按其需要的大小进行分配，不多也不少。

很多程序设计语言都允许从堆中动态地分配内存，那么当进程空间试图增长时，就会出现问题。

如果大部分进程在运行时都要增长，为了减少因内存区域不够而引起的进程交换和移动所产生的开销，一种可用的方法是，当换入或移动进程时为它分配一些额外的内存。

![](/blog/imgs/memoryReadNote/%E9%A2%9D%E5%A4%96%E7%A9%BA%E9%97%B4.png)

当然，这部分额外空间在进行交换时，只会交换使用中的内存，额外空间中未使用的不参与交换。

那如果单个进程所需的内存就超过了物理内存的大小呢？这就需要[虚拟内存](#虚拟内存)了

## 空闲内存的管理

在动态分配内存时，操作系统必须对其进行管理。一般而言，有两种方式跟踪内存使用情况：位图和空闲链表。

### 位图

使用位图方法时，内存可能被划分成小到几个字或大到几千字节的分配单元。每个分配单元对应于位图中的一位，0 表示空闲，1 表示占用（或者相反）。 如下：

![](/blog/imgs/memoryReadNote/%E4%BD%8D%E5%9B%BE.png)

分配单元的大小是一个重要的设计因素。分配单元越小，位图越大。然而即使只有 4 个字节大小的分配单元，32 位的内存也只需要位图中的 1 位；32n 位的内存需要 n 位的位图，所以位图只占用了 1/33 的内存。若选择比较大的分配单元，则位图更小。但若进程的大小不是分配单元的整数倍，那么在最后一个分配单元中就会有一定数量的内存被浪费了。

因为内存的大小和分配单元的大小决定了位图的大小，所以它提供了一种简单的利用一块固定大小的内存区就能对内存使用情况进行记录的方法。这种方法的主要问题是，在决定把一个占 k 个分配单元的进程调入内存时，存储管理器必须搜索位图，在位图中找出有 k 个连续 0 的串。查找位图中指定长度的连续 0 串是耗时的操作（因为在位图中该串可能跨越字的边界），这是位图的缺点。

### 空闲链表

另一种记录内存使用情况的方法是，维护一个记录已分配内存段和空闲内存段的链表。其中链表中的一个结点或者包含一个进程，或者是两个进程间的一个空的空闲区。

链表中的每一个节点都包含以下域：空闲区（H）或进程（P）的指示标志、起始地址、长度和指向下一结点的指针。
![](/blog/imgs/memoryReadNote/%E7%A9%BA%E9%97%B2%E9%93%BE%E8%A1%A8.png)

#### 首次适配（first fit）算法

存储管理器沿着段链表进行搜索，直到找到一个足够大的空闲区，除非空闲区大小和要分配的空间大小正好一样，否则将该空闲区分为两部分，一部分供进程使用，另一部分形成新的空闲区。首次适配算法是一种速度很快的算法，因为它尽可能少地搜索链表结点。

#### 下次适配（next fit）算法

它的工作方式和首次适配算法相同，不同点是每次找到合适的空闲区时都记录当时的位置。以便在下次寻找空闲区时从上次结束的地方开始搜索，而不是像首次适配算法那样每次都从头开始。

#### 最佳适配（best fit）算法

最佳适配算法搜索整个链表（从开始到结束），找出能够容纳进程的最小的空闲区。

最佳适配的空闲区会分裂出很多非常小的空闲区。

#### 最差适配（worst fit）算法

即总是分配最大的可用空闲区，使新的空闲区比较大从而可以继续使用

## 虚拟内存（virtual memory）

尽管基址寄存器和界限寄存器可以用于创建地址空间的抽象，还有另一个问题需要解决：管理软件的膨胀（bloatware）。虽然存储器容量增长快速，但是软件大小的增长更快。

### 覆盖

程序大于内存的问题早在计算时代开始就产生了，虽然只是有限的应用领域，像科学和工程计算（模拟宇宙的创建或模拟新型航空器都会花费大量内存）。在 20 世纪 60 年代所采取的解决方法是：把程序分割成许多片段，称为覆盖（overlay）。程序开始执行时，将覆盖管理模块装入内存，该管理模块立即装入并运行覆盖 0。执行完成后，覆盖 0 通知管理模块装入覆盖 1，或者占用覆盖 0 的上方位置（如果有空间），或者占用覆盖 0（如果没有空间）。一些覆盖系统非常复杂，允许多个覆盖块同时在内存中。覆盖块存放在磁盘上，在需要时由操作系统动态地换入换出。

虽然由系统完成实际的覆盖块换入换出操作，但是程序员必须把程序分割成多个片段。把一个大程序分割成小的、模块化的片段是非常费时和枯燥的，并且易于出错。很少程序员擅长使用覆盖技术。因此，没过多久就有人找到一个办法，把全部的工作都交给操作系统去做。这就是虚拟内存技术

### 什么是虚拟内存？

虚拟内存的基本思想是：每个程序拥有自己的地址空间，这个空间被分割成多个块，每一块称作一页或页面（page）。每一页有连续的地址范围。这些页被映射到物理内存，但并不是所有的页都必须在内存中才能运行程序。当程序引用到一部分在物理内存中的地址空间时，由硬件立刻执行必要的映射。当程序引用到一部分不在物理内存中的地址空间时，由操作系统负责将缺失的部分装入物理内存并重新执行失败的指令。

![](/blog/imgs/memoryReadNote/%E8%99%9A%E6%8B%9F%E5%9C%B0%E5%9D%80%E7%A9%BA%E9%97%B4.png)

### 虚拟地址和虚拟地址空间

由程序产生的地址叫做虚拟地址，而这些虚拟地址构成了虚拟地址空间。

在没有虚拟内存的计算机上，系统直接将虚拟地址送到内存总线上，读写操作使用具有同样地址的物理内存字；而在使用虚拟内存的情况下，虚拟地址不是被直接送到内存总线上，而是被送到内存管理单元（Memory Management Unit，MMU），MMU 把虚拟地址映射为物理内存地址。

### 分页

操作系统通过将虚拟内存分割为大小固定的块来作为硬盘和内存之间的传输单位，这个块被称为虚拟页（Virtual Page, VP），每个虚拟页的大小为 P=2^p 字节。物理内存也会按照这种方法分割为物理页（Physical Page, PP），物理页和虚拟页的大小是一只的，大小也为 P 字节。

虚拟页通常来说都比物理页多，为了解决虚拟地址比物理内存地址大的问题。为每一个虚拟页增加一个“在/不在”位（present/absent bit），用来标志当前虚拟页与物理页是否存在映射关系。

`1`为在，`0`为不在。
![](/blog/imgs/memoryReadNote/%E5%88%86%E9%A1%B5.png)

#### 缺页中断

虚拟页没有被缓存在物理内存中（缓存未命中）被称为缺页。

MMU 根据虚拟地址在页表中寻址到了页号为 2 的虚拟页，该虚拟页的有效位为 0，代表该虚拟页并没有被缓存在物理内存中。这种虚拟页没有被缓存在物理内存中（缓存未命中）的就被称为缺页。

当 CPU 遇见缺页时会触发一个缺页异常，缺页异常将控制权转向操作系统内核，然后调用内核中的缺页异常处理程序。操作系统内核找到一个很少使用的页框且把它的内容写入磁盘（如果它不在磁盘上）。随后把需要访问的页面读到刚才回收的页框中，修改映射关系，然后重新启动引起陷阱的指令。

![](/blog/imgs/memoryReadNote/%E7%BC%BA%E9%A1%B5%E4%B8%AD%E6%96%AD.png)

这种在硬盘和内存之间传送页的行为称为页面调度（paging）：页从硬盘换入内存和从内存换出到硬盘。当缺页异常发生时，才将页面换入到内存的策略称为按需页面调度（demand paging），所有现代操作系统基本都使用的是按需页面调度的策略。

##### 缺页中断处理

1. 硬件陷入内核，在堆栈中保存程序计数器。大多数机器将当前指令的各种状态信息保存在特殊的 CPU 寄存器中。
2. 启动一个汇编代码例程保存通用寄存器和其他易失的信息，以免被操作系统破坏。这个例程将操作系统作为一个函数来调用。
3. 当操作系统发现一个缺页中断时，尝试发现需要哪个虚拟页面。通常一个硬件寄存器包含了这一信息，如果没有的话，操作系统必须检索程序计数器，取出这条指令，用软件分析这条指令，看看它在缺页中断时正在做什么。
4. 一旦知道了发生缺页中断的虚拟地址，操作系统检查这个地址是否有效，并检查存取与保护是否一致。如果不一致，向进程发出一个信号或杀掉该进程。如果地址有效且没有保护错误发生，系统则检查是否有空闲页框。如果没有空闲页框，执行页面置换算法寻找一个页面来淘汰。
5. 如果选择的页框“脏”了，安排该页写回磁盘，并发生一次上下文切换，挂起产生缺页中断的进程，让其他进程运行直至磁盘传输结束。无论如何，该页框被标记为忙，以免因为其他原因而被其他进程占用。
6. 一旦页框“干净”后（无论是立刻还是在写回磁盘后），操作系统查找所需页面在磁盘上的地址，通过磁盘操作将其装入。该页面被装入后，产生缺页中断的进程仍然被挂起，并且如果有其他可运行的用户进程，则选择另一个用户进程运行。
7. 当磁盘中断发生时，表明该页已经被装入，页表已经更新可以反映它的位置，页框也被标记为正常状态。
8. 恢复发生缺页中断指令以前的状态，程序计数器重新指向这条指令。
9. 调度引发缺页中断的进程，操作系统返回调用它的汇编语言例程。
10. 该例程恢复寄存器和其他状态信息，返回到用户空间继续执行，就好像缺页中断没有发生过一样。

### 页表

作为一种最简单的实现，虚拟地址到物理地址的映射可以概括如下：虚拟地址被分成虚拟页号（高位部分）和偏移量（低位部分）两部分。

以 16 位的虚拟地址为例：前 4 为代表虚拟页号，后 12 位代表偏移量。

虚拟页号可用做页表的索引，以找到该虚拟页面对应的页表项。由页表项可以找到页框号（如果有的话）。然后把页框号拼接到偏移量的高位端，以替换掉虚拟页号，形成送往内存的物理地址。

![](/blog/imgs/memoryReadNote/%E5%9C%B0%E5%9D%80%E8%BD%AC%E6%8D%A2.png)

页表的目的是把虚拟页面映射为页框。从数学角度说，页表是一个函数，它的参数是虚拟页号，结果是物理页框号。通过这个函数可以把虚拟地址中的虚拟页面域替换成页框域，从而形成物理地址。

#### 页表项的结构

![](/blog/imgs/memoryReadNote/%E9%A1%B5%E8%A1%A8%E9%A1%B9.png)

- **页框号**：最重要的是页框号，代表物理页。
- **在/不在位**：1 表示该表项是有效的，可以使用；如果是 0，则表示该表项对应的虚拟页面现在不在内存中，访问该页面会引起一个缺页中断。
- **保护**：一个页允许什么类型的访问。最简单的形式是这个域只有一位，0 表示读/写，1 表示只读。一个更先进的方法是使用三位，各位分别对应是否启用读、写、执行该页面。
- **修改**：如果一个页面已经被修改过（即它是“脏”的），则必须把它写回磁盘。如果一个页面没有被修改过（即它是“干净”的），则只简单地把它丢弃就可以了，因为它在磁盘上的副本仍然是有效的。这一位有时也被称为脏位（dirty bit），因为它反映了该页面的状态。
- **访问**：它的值被用来帮助操作系统在发生缺页中断时选择要被淘汰的页面。不再使用的页面要比正在使用的页面更适合淘汰。

虚拟内存本质上是用来创造一个新的抽象概念——地址空间，这个概念是对物理内存的抽象，类似于进程是对物理机器（CPU）的抽象。虚拟内存的实现，是将虚拟地址空间分解成页，并将每一页映射到物理内存的某个页框或者（暂时）解除映射。

### 加速分页查询

由于每次访问内存，都需要进行虚拟地址到物理地址的映射。所有的指令最终都必须来自内存，并且很多指令也会访问内存中的操作数。因此，每条指令进行一两次或更多页表访问是必要的。如果执行一条指令需要 1ns，页表查询必须在 0.2ns 之内完成，以避免映射成为一个主要瓶颈。

大多数优化技术都是从内存中的页表开始的。这种设计对效率有着巨大的影响。例如，假设一条指令要把一个寄存器中的数据复制到另一个寄存器。在不分页的情况下，这条指令只访问一次内存，即从内存中取指令。有了分页后，则因为要访问页表而引起更多次的访问内存。由于执行速度通常被 CPU 从内存中取指令和数据的速度所限制，所以每次内存访问必须进行两次页表访问会降低一半的性能。在这种情况下，没人会采用分页机制。

人们发现了一种现象，大多数程序总是对少量的页面进行多次的访问，而不是相反的。因此，只有很少的页表项会被反复读取，而其他的页表项很少被访问。

那是不是把高频的给保存下来就可以了呢？

基于这种现象，出现的解决方案是为计算机设置一个小型的硬件设备，将虚拟地址直接映射到物理地址，而不必再访问页表。这种设备称为转换检测缓冲区（Translation Lookaside Buffer，TLB），有时又称为相联存储器（associate memory）。它通常在 MMU 中，包含少量的表项

现在看一下 TLB 是如何工作的。将一个虚拟地址放入 MMU 中进行转换时，硬件首先通过将该虚拟页号与 TLB 中所有表项同时（即并行）进行匹配，判断虚拟页面是否在其中。如果发现了一个有效的匹配并且要进行的访问操作并不违反保护位，则将页框号直接从 TLB 中取出而不必再访问页表。如果虚拟页面号确实是在 TLB 中，但指令试图在一个只读页面上进行写操作，则会产生一个保护错误，就像对页表进行非法访问一样。

当虚拟页号不在 TLB 中时发生的事情值得讨论。如果 MMU 检测到没有有效的匹配项时，就会进行正常的页表查询。接着从 TLB 中淘汰一个表项，然后用新找到的页表项代替它。这样，如果这一页面很快再被访问，第二次访问 TLB 时自然将会命中而不是不命中。当一个表项被清除出 TLB 时，将修改位复制到内存中的页表项，而除了访问位，其他的值不变。当页表项中从页表装入到 TLB 中时，所有的值都来自内存。

### 针对大内存的页表

们目前为止讨论的只是单页表，但在实际的环境中虚拟空间地址都是很大的（一个 32 位系统的地址空间有 2^32 = 4GB，更别说 64 位系统了）。在这种情况下，使用一个单页表明显是效率低下的。

#### 多级页表

引入多级页表的原因是避免把全部页表一直保存在内存中。特别是那些从不需要的页表就不应该保留。

![](/blog/imgs/memoryReadNote/%E5%A4%9A%E7%BA%A7%E9%A1%B5%E8%A1%A8.png)
这个结构看起来很像是一个 B-Tree，这种层次结构有效的减缓了内存要求：

- 如果一个一级页表的一个 PTE 是空的，那么相应的二级页表也不会存在。这代表一种巨大的潜在节约（对于一个普通的程序来说，虚拟地址空间的大部分都会是未分配的）。
- 只有一级页表才总是需要缓存在内存中的，这样虚拟内存系统就可以在需要时创建、页面调入或调出二级页表（只有经常使用的二级页表才会被缓存在内存中），这就减少了内存的压力。

#### 倒排页表

对 32 位虚拟地址空间，多级页表可以很好地发挥作用。但是，随着 64 位计算机变得更加普遍，情况发生了彻底的变化。如果现在的地址空间是 264 字节，页面大小为 4KB，我们需要一个有 252 个表项的页表。如果每一个表项 8 个字节，那么整个页表就会超过 3000 万 GB（30PB）。仅仅为页表耗费 3000 万 GB 不是个好主意（现在不是，可能以后几年也不是）。因而，具有 64 位分页虚拟地址空间的系统需要一个不同的解决方案。

解决方案之一就是使用倒排页表（inverted page table）。在这种设计中，在实际内存中每一个页框有一个表项，而不是每一个虚拟页面有一个表项。例如，对于 64 位虚拟地址，4KB 的页，1GB 的 RAM，一个倒排页表仅需要 262 144 个页表项。表项记录哪一个（进程，虚拟页面）对定位于该页框。

![](/blog/imgs/memoryReadNote/%E5%80%92%E6%8E%92%E9%A1%B5%E8%A1%A8.png)

虽然倒排页表节省了大量的空间（至少当虚拟地址空间比物理内存大得多的时候是这样的），但它也有严重的不足：从虚拟地址到物理地址的转换会变得很困难。

### 页面置换算法

| 算法                    | 注释                   |
| ----------------------- | ---------------------- |
| 最优算法                | 不可实现，但可用作基准 |
| NRU（最近未使用）算法   | 相对于 LRU 比较粗暴    |
| FIFO（先进先出）算法    | 可能抛弃重要页面       |
| 第二次机会算法          | 比 FIFO 有重大改善     |
| 时钟算法                | 现实的                 |
| LRU（最近最少使用）算法 | 实现困难               |
| NFU（最不经常使用）算法 | 相对于 LRU 比较粗暴    |
| 老化算法                | 与 LRU 相似            |
| 工作集时钟算法          | 好的有效算法           |

### 分离的指令空间和数据空间

大多数计算机只有一个地址空间，既存放程序也存放数据。如果地址空间足够大，那么一切都好。然而，地址空间通常太小了，这就使得程序员对地址空间的使用出现困难。

一种解决方案是，为指令（程序正文）和数据设置分离的地址空间，分别称为 I 空间和 D 空间，每个地址空间都从 0 开始到某个最大值。

在使用这种设计的计算机中，两种地址空间都可以进行分页，而且互相独立。它们分别有自己的页表，分别完成虚拟页面到物理页框的映射。当硬件进行取指令操作时，它知道要使用 I 空间和 I 空间页表。

### 共享页面

除了区分地址空间和数据空间之外，如何共享他们也是一个问题。

在大型多道程序设计系统中，几个不同的用户同时运行同一个程序是很常见的。显然，由于避免了在内存中有一个页面的两份副本，共享页面效率更高。

如果系统支持分离的 I 空间和 D 空间，那么通过让两个或者多个进程来共享程序就变得非常简单了，这些进程使用相同的 I 空间页表和不同的 D 空间页表。

当进程 A 结束时，能够发现这些页面仍然在被使用是非常必要的，这样，这些页面的磁盘空间才不会被随意释放。查找所有的页表，考察一个页面是否共享，其代价通常比较大，所以需要专门的数据结构记录共享页面。

共享数据要比共享代码麻烦，但也不是不可能。特别是在 UNIX 中，在进行 fork 系统调用后，父进程和子进程要共享程序文本和数据。在分页系统中，通常是让这些进程分别拥有它们自己的页表，但都指向同一个页面集合。这样在执行 fork 调用时就不需要进行页面复制。然而，所有映射到两个进程的数据页面都是只读的。

只要这两个进程都仅仅是读数据，而不做更改，这种情况就可以保持下去。但只要有一个进程更新了一点数据，就会触发只读保护，并引发操作系统陷阱。然后会生成一个该页的副本，这样每个进程都有自己的专用副本。两个复制都是可以读写的，随后对任何一个副本的写操作都不会再引发陷阱。这种策略意味着那些从来不会执行写操作的页面（包括所有程序页面）是不需要复制的，只有实际修改的数据页面需要复制。这种方法称为写时复制，它通过减少复制而提高了性能。

### 共享库

共享库实际上是一种更为通用的机制——内存映射文件（memory-mapped file）的一个特例。这种机制的思想是：进程可以通过发起一个系统调用，将一个文件映射到其虚拟地址空间的一部分。

## 分段

考虑一下如果一个程序有非常多的变量，但是其他部分都是正常数量时会发生什么事情。地址空间中分给符号表的块可能会被装满，但这时其他表中还有大量的空间。编译器当然可以简单地打印出一条信息说由于变量太多编译不能继续进行，但在其他表中还有空间时这样做似乎并不恰当。

一个直观并且通用的方法是在机器上提供多个互相独立的称为段（segment）的地址空间。每个段由一个从 0 到最大的线性地址序列构成。各个段的长度可以是 0 到某个允许的最大值之间的任何一个值。不同的段的长度可以不同，并且通常情况下也都不相同。段的长度在运行期间可以动态改变，比如，堆栈段的长度在数据被压入时会增长，在数据被弹出时又会减小。

因为每个段都构成了一个独立的地址空间，所以它们可以独立地增长或减小而不会影响到其他的段。如果一个在某个段中的堆栈需要更多的空间，它就可以立刻得到所需要的空间，因为它的地址空间中没有任何其他东西阻挡它增长。段当然有可能会被装满，但通常情况下段都很大，因此这种情况发生的可能性很小。

![](/blog/imgs/memoryReadNote/%E6%AE%B5.png)

段是一个逻辑实体，程序员知道这一点并把它作为一个逻辑实体来使用。一个段可能包括一个过程、一个数组、一个堆栈、一组数值变量，但一般它不会同时包含多种不同类型的内容。

如果一个段比较大，把它整个保存在内存中可能很不方便甚至是不可能的，因此产生了对它进行分页.

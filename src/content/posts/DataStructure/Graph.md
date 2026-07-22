---
title: 图
group:
  title: 基础
  order: 1
order: 7
---

在此之前，我对树有了一定的了解，这一次我将对图做一个学习总结，涉及到构建图/搜索算法。感兴趣就点它点它点它！！！

<!-- more -->

### 图

图是由若干给定的点及连接两点的线所构成的图形，这种图形通常用来描述某些事物之间的某种特定关系，用点代表事物，用连接两点的线表示相应两个事物间具有这种关系。

其实树也可以看作是图，只是相对来说比较特殊而已。

树中的元素被称为节点，图中的元素被称为顶点(vertex)。图中的某个顶点都可以和任意其他顶点建立连接关系，把建立的这种关系叫做边(edge)。与顶点相连接的边的条数叫做顶点的度。

在图中，有**无向图**与**有向图**之分，如果边有方向的话，就是有向图，反之则为无向图。

![无向图](/blog/imgs/graph/first.png)

![无向图](/blog/imgs/graph/second.png)

在无向图中，有度的概念，表示为一个顶点有多少条边。在有向图中，会把度分为**入度**和**出度**。入度表示有多少边指向这个顶点；出度表示有多少条边是以这个顶点为起点指向其他顶点。

还有一种图，叫做**带权图**，在带权图中每条边都有一个权重。

![无向图](/blog/imgs/graph/three.png)

#### 存储方法

##### 邻接矩阵存储方法

图的最直观一种存储方式就是邻接矩阵。
邻接矩阵的底层是一个二维数组。对于无向图来说，如果顶点 i 和顶点 j 之间有边，就把 A[i][j]和 A[j][i]标记为 1；对于有向图来说，如果顶点 i 到顶点 j 之间，有一条箭头从顶点 i 指向顶点 j 的边，就把 A[i][j]标记为 1；对于带权图来说，数组中对应的存储相应的权重。

![无向图](/blog/imgs/graph/array.png)

虽然这种存储方式简单、直观，但是比较浪费存储空间。尤其是对于无向图来说，A[i][j]为 1 的话，那么 A[j][i]也为 1。实际上，只需要存储一个就行了，等用于浪费了一般的存储空间。

##### 邻接表存储方法

在表示上，邻接表看起来有点像散列表。每个顶点，都对应了一条链表，链表中存储的是这个顶点与相连接的其他顶点。

![邻接表](/blog/imgs/graph/list.png)

### 构建图

上面有介绍到，图有好几种存储方法，我在这次的代码实现中采用的是邻接表的方式。采用的图为无向图作为示例。

图的构建，可以分成添加顶点和添加边两个步骤。
当我们添加完了顶点之后，需要为每个顶点创建一个字典类(Map)来存储与当前节点相连接的顶点。

```js
class Graph {
  constructor(vertices = []) {
    this.vertices = vertices; //用来存储顶点
    this.adjList = new Map(); //用来存储边
    this.vertices.length && this.__buildGraph(); //如果直接传入顶点数组的话，添加每个顶点的边集合
  }

  //添加顶点
  addVertex(v) {
    this.vertices.push(v);
    this.adjList.set(v, []);
  }

  //添加边
  addEdge(v, w) {
    this.adjList.get(v).push(w);
    this.adjList.get(w).push(v);
  }

  //如果传入了参数，构建成图
  __buildGraph() {
    this.vertices.forEach((item) => this.adjList.set(item, []));
  }

  //example
  let graph =new Graph(['A','B','C','D','E','F','G','H']);
  //逐一加入边
  graph.addEdge("A", "B");
  graph.addEdge("A", "C");
  graph.addEdge("B", "D");
  graph.addEdge("B", "E");
  graph.addEdge("E", "F");
  graph.addEdge("C", "G");
  graph.addEdge("G", "H");
}
```

这一段代码就已经将图类创建好了，如图：

![邻接表](/blog/imgs/graph/search.png)

为了直观的将邻接表展示出来，我们为 Graph 添加 toString 方法，能够展示出与每个顶点连接的其他的顶点。

```js
toString() {
  let s = "";
  this.vertices.forEach((item) => {
    s += `${item}->`;
    let neighbors = this.adjList.get(item);
    neighbors.forEach((neighbor) => {
      s += `${neighbor} `;
    });
    s += "\n";
  });
  return s;
}
```

当对上图执行这个方法之后，打印出这样的字符串。

```
A->B C
B->A D E
C->A G
D->B
E->B F
F->E
G->C H
H->G
```

### 搜索算法

接下来的搜索算法将以上图作为示例。

在本次实现搜索算法的时候，我们为每个节点添加三种状态：

1. 白色：尚未被访问
2. 灰色：被访问但是未被探索
3. 黑色：被访问切被探索

因为我们为节点添加了三种状态，所以在执行算法之前，我们需要对每个顶点进行初始化，添加 initializeColor 函数。全部初始化为白色，未访问状态。

```js
__initializeColor() {
  const color = [];
  for (let i = 0; i < this.vertices.length; i++) {
    color[this.vertices[i]] = "white";
  }
  return color;
}
```

#### 广度优先搜索

广度优先搜索(Breadth-First Search)，简称 BFS。简单来说，就是层层推进的搜索策略。

需要借助**队列(queue)**，先访问顶点并入队，接着它的邻接顶点，如果邻接顶点之前尚未被访问过，就分别入队，然后再分别访问邻接顶点的邻接顶点，一层层的递进，直到当前队列为空。

针对于上图，以'A'做为第一个访问顶点，它的访问顺序就是下图所展示的：

![示意图](/blog/imgs/graph/bfs.png)

代码实现：

```js
bfs(v, cb) {
  const color = this.__initializeColor();
  const queue = [];
  queue.push(v);
  while (queue.length) {
    const curr = queue.shift(); //获取到当前的节点
    color[curr] = "grey"; //当前节点被访问，设置为grey
    const neighbors = this.adjList.get(curr); //拿到当前节点的所有边
    neighbors.forEach((neighbor) => {
      if (color[neighbor] === "white") {
        //如果探索到的子节点是尚未被访问过，就变为grey并且加入队列
        color[neighbor] = "grey";
        queue.push(neighbor);
      }
    });
    color[curr] = "black"; //节点完成搜索和探索的过程，直接变黑
    cb && cb(curr); //如果有callback，就对当前节点执行callback
  }
}
```

#### 深度优先搜索

深度优先搜索(Depth-First Search)，简称 DFS。

简单来说，就是一条路走到无路可走了，然后回退到上一个岔路口，选择另一条路继续走，直到找到出口。

针对于上图，以'A'做为第一个访问顶点，它的访问顺序就是下图所展示的：

![示意图](/blog/imgs/graph/dfs.png)

代码实现：

```js
dfs(v, cb) {
  const color = this.__initializeColor();
  this.__dfsVisit(v, color, cb);
}

__dfsVisit(v, color, cb) {
  color[v] = "grey";
  cb && cb(v);
  const neighbors = this.adjList.get(v);
  neighbors.forEach((neighbor) => {
    color[neighbor] === "white" && this.__dfsVisit(neighbor, color, cb);
  });
  color[v] = "black";
}
```

在此，已经将无向图的两种搜索算法总结出来，有向图和权重图都是类似的。在学习完图之后，大多的数据结构都已经有了一定的基础。接下来将是算法思想的学习，敬请期待。

**相关链接**

- [图的详细代码](https://github.com/LuckyFBB/data_structure/blob/master/graph/graph.js)

# 算法

## 图论

### 有向无环图的拓扑排序

拓扑排序是对DAG的顶点进行排序，使得对每一条有向边(u, v)，均有u（在排序记录中）比v先出现。

拓扑排序的实现算法有两种：入度表、DFS，其时间复杂度均为𝑂(𝑉+𝐸)。

参考：

[【图论】有向无环图的拓扑排序](https://www.cnblogs.com/en-heng/p/5085690.html)

[Topological Sort (Indegree)](https://www.cs.usfca.edu/~galles/visualization/TopoSortIndegree.html)

[Topological Sort (DFS)](https://www.cs.usfca.edu/~galles/visualization/TopoSortDFS.html)
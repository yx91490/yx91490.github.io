# 数据结构与算法

## 算法

### 排序算法

- 插入排序

  - 直接插入排序
  - 折半插入排序
  - 2-路插入排序
  - 希尔排序

- 交换类

  - 冒泡排序
  - 快速排序

- 选择排序

  - 简单选择排序
  - 锦标赛排序（树形选择排序）
  - 堆排序

- 归并排序
- 基数排序

比较：

| 算法                   | 稳定性 | 时间复杂度（平均/最好/最坏） | 空间复杂度 |
| ---------------------- | ------ | ---------------------------- | ---------- |
| 简单排序（除希尔排序） | T      | O(n^2^)                      | O(1)       |
| 快速排序               | F      | O(nlogn)/O(n^2^)             | O(logn)    |
| 堆排序                 | F      | O(nlogn)                     | O(1)       |
| 归并排序               |        | O(nlogn)                     | O(n)       |
| 基数排序               | T      | O(d(n+rd))                   | O(rd)      |

### 堆排序

堆有以下两个特性：

1. 它是一个完全二叉树
2. 堆中的任意一个父节点的值都大于等于（或小于）它的左右孩子节点。

因此，根据第二个特性，就把二叉堆分为大顶堆（或叫最大堆），和小顶堆（或叫最小堆）。

堆排序的过程：

1. 将一颗完全二叉树构建成堆
2. 循环获取堆顶的最大值放到堆的后面，并重建堆。

## 数据结构

### 二叉树

定义：每个节点最多只有两颗子树，并且二叉树的子树有左右之分。

性质：

1. 第`i`层至多有2^i-1^个结点(`i >= 1`) （归纳法证明）
2. 深度为k的二叉树至多有2^k^ - 1个结点（k >= 1）
3. N~0~(终端结点数) = N~2~ (度为2的结点数) + 1
4. 具有N个结点的完全二叉树的深度为floor(log~2~N) + 1
5. 如果对一颗有n个结点的完全二叉树编号，对任一结点i（1 <= i <= n）有：
   1. parent(i) 是 floor(i / 2) （i < 1）
   2. 如果n < 2i, 则结点无左孩子；否则其左孩子为2i
   3. 如果n < 2i + 1, 则结点无右孩子；否则其左孩子为2i + 1

遍历：分为先序遍历，中序遍历，后序遍历

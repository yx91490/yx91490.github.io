# 红黑树

红黑树(RBT)是每个节点都带有颜色属性的自平衡二叉查找树，颜色或红色或黑色。具备以下性质：

```
性质1:节点是红色或黑色；
性质2:根节点是黑色。
性质3:所有的NULL节点都为叶子节点，且颜色为空。
性质4:每个红色节点的两个子节点都是黑色。(从每个叶子到根的所有路径上不能有两个连续的红色节点)
性质5:从任一节点到其每个叶子的所有路径都包含相同数目的黑色节点。
```

红黑树的应用：TreeMap、TreeSet

1、添加
第一步的添加跟二叉搜索树的插入一样。

2、修正平衡
将当前节点记作A，将A的父节点记作B，将B的兄弟节点记作C，将B的父结点记作D。

修正过程如下：

1. 将A设为红色，这样对整颗树的平衡影响较小；
2. 如果A为根节点，则将根节点改成黑色即可，修正结束；
3. 如果B是黑色，那么树就是平衡的，修正结束；
4. 如果B是红色，并且B是D的左孩子，则判断C的颜色：
   - 如果C是红色，则将B和C涂黑，D涂红，把当前节点(A)指向D，然后继续比较A;
   - 如果C是黑色，并且A是B的左孩子，则把B涂黑，D涂红，然后对D右旋，然后继续比较A；
   - 如果C是黑色，并且A是B的右孩子，则把当前节点(A)指向B,然后对新的A左旋。然后把B指向新A的父亲，把D指向新B的父亲，然后把B涂黑，D涂红，对D右旋，然后继续比较A。

5. 如果B是红色，并且B是D的右孩子，则判断C的颜色：
   - 如果C是红色，则将B和C涂黑，D涂红，把当前节点(A)指向D，然后继续比较A;
   - 如果C是黑色，并且A是B的右孩子，则把B涂黑，D涂红，然后对D左旋，然后继续比较A；
   - 如果C是黑色，并且A是B的左孩子，则把当前节点(A)指向B,然后对新的A右旋。然后把B指向新A的父亲，把D指向新B的父亲，然后把B涂黑，D涂红，对D左旋，然后继续比较A。







1. 如果父结点是黑色，插入即可，无需调整。
2. 如果叔叔结点是红色，就把父结点和叔叔结点都转为黑色，祖父结点转为红色，将不平衡向上传递。
3. 如果叔叔结点是黑色或者没有叔叔结点，就看父结点和待插入结点的关系。如果待插入结点和父结点的关系，与父结点与祖父结点的关系一致，比如待插入结点是父结点的左孩子，父结点也是祖父结点的左孩子，就无需多次旋转。否则就先通过相应的旋转将其关系变为一致。

 
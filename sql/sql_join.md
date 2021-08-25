# SQL Join

SQL 的连接(JOIN)语句将数据库中的两个或多个表组合起来.[1] 由”连接”生成的集合, 可以被保存为表, 或者当成表来使用. JOIN 语句的含义是把两张表的属性通过它们的值组合在一起. 基于 ANSI 标准的 SQL 列出了五种 JOIN 方式:

```
内连接(INNER), 全外连接(FULL OUTER), 左外连接(LEFT OUTER), 右外连接(RIGHT OUTER)和交叉连接(CROSS). 
在特定的情况下, 一张表(基本表, 视图, 或连接表)可以和自身进行连接, 成为自连接(self-join).
```

SQL 定义了两种不同语法方式去表示”连接”。首先是`"显式连接符号"`，它显式地使用关键字 JOIN，其次是`"隐式连接符号"`，它使用所谓的”隐式连接符号”。隐式连接符号把需要连接的表放到 SELECT 语句的 FROM 部分，并用逗号隔开。这样就构成了一个”交叉连接”，WHERE 语句可能放置一些过滤谓词(过滤条件)。那些过滤谓词在功能上等价于显式连接符号. 
内连接”可以进一步被分为: 相等连接，自然连接，和交叉连接(见下). 
程序要应该特别注意连接依据的列可能包含 NULL 值，NULL 值不与任何值匹配(甚至和它本身) – 除非连接条件中显式地使用 IS NULL 或 IS NOT NULL 等谓词. 
显式的内连接实例:

```
SELECT *
FROM   employee 
       INNER JOIN department 
          ON employee.DepartmentID = department.DepartmentID
```

等价于:

```
SELECT *  
FROM   employee，department 
WHERE  employee.DepartmentID = department.DepartmentID
```

# 交叉连接(cross join)，

又称卡笛生连接(cartesian join)或叉乘(Product)，它是所有类型的内连接的基础。把表视为行记录的集合，交叉连接即返回这两个集合的笛卡尔积。这其实等价于内连接的链接条件为”永真”，或连接条件不存在. 
如果 A 和 B 是两个集合，它们的交叉连接就记为: A × B. 
用于交叉连接的 SQL 代码在 FROM 列出表名，但并不包含任何过滤的连接谓词. 
显式的交叉连接实例:

```
SELECT *
FROM   employee CROSS JOIN department
```

隐式的交叉连接实例:

```
SELECT *
FROM   employee ,department;
```

外连接查询得到的结果也可以通过关联子查询得到. 例如

```
SELECT employee.LastName, employee.DepartmentID, department.DepartmentName 
FROM   employee LEFT OUTER JOIN department 
          ON employee.DepartmentID = department.DepartmentID
```

也可以写成如下样子:

```
SELECT employee.LastName, employee.DepartmentID,
  (SELECT department.DepartmentName 
    FROM department
   WHERE employee.DepartmentID = department.DepartmentID )
FROM   employee
```

# 半连接 (⋉)(⋊)

半连接是类似于自然连接的写为R ⋉ S的连接，这里的R和S是关系。[2]半连接的结果只是在S中有在公共属性名字上相等的元组所有的R中的元组。例如下面的例子是“雇员”和“部门”和它们的半连接的表：

雇员 
Name EmpId DeptName 
Harry 3415 财务 
Sally 2241 销售 
George 3401 财务 
Harriet 2202 生产

部门 
DeptName Manager 
销售 Harriet 
生产 Charles

雇员⋉部门 
Name EmpId DeptName 
Sally 2241 销售 
Harriet 2202 生产

更形式的说半连接的语义定义如下：

```
R ⋉ S = { t : t 属于 R, s 属于 S, fun (t 并 s) }
```

这里的fun(r)定义同于自然连接。 
半连接可以被使用自然连接模拟如下。假定a1,…,an是R的属性名字，则：

```
R ⋉ S = 派a1,..,an（R⋈S）
```

因为我们可以通过基本运算模拟自然连接因此也就可以模拟半连接。

# 半连接2：

当一张表在另一张表找到匹配的记录之后，半连接（semi-jion）返回第一张表中的记录。与条件连接相反，即使在右节点中找到几条匹配的记录，左节点的表也只会返回一条记录。另外，右节点的表一条记录也不会返回。半连接通常使用IN 或 EXISTS 作为连接条件。下面是一个例子：

SQL> set linesize 999 
SQL> select d.deptno,d.dname,d.loc 
2 from scott.dept d 
3 where d.deptno IN (select e.deptno from scott.emp e);

# 《数据库技术》1.2.1.4.4 半连接运算（Semi join）

两个关系R和S的半连接运算是在关系R和S的自然连接运算的基础之上再作一次投影运算，投影的属性是半连接运算左算子的属性。R∝S可以形式化地表示为：R∝S = πR(R∞S)。我们换个角度思考，两个关系得半连接运算实际上使用了两个关系的Common Keys对关系R做了一次选择运算，选择的条件就是R的Common Keys的键值全部等于S的Common Keys的键值。

我们再以Figure 1.1.3.4.2中的Ra和Rb为例，Ra∝Rb可以表述为：

SELECT Ra.* FROM Ra INNER JOIN Rb ON Ra.Id = Rb.Id

图示

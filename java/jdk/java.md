# Java学习笔记

### 类型大小

| 类型    | 内存大小 | 取值范围                                    |
| ------- | -------- | ------------------------------------------- |
| byte    | 1字节    | [-128, 127]                                 |
| short   | 2字节    | [-32768, 32767]                             |
| int     | 4字节    | [-2147483648, 2147483647]                   |
| long    | 8字节    | [-9223372036854775808, 9223372036854775807] |
| float   | 4字节    |                                             |
| double  | 8字节    |                                             |
| char    | 2字节    | `'\u0000'` ~ `'\uffff'`                     |
| boolean | 1字节    | false、true                                 |

java对象在内存中占用的空间分为3类：

1. 对象头（Header），HotSpot虚拟机的对象头包括两部分信息：
   1. markword（ 在32位系统下是4字节，在64位系统下是8字节）
   2. klass类型指针（ 在32位系统下是4字节， 在64位系统下是8字节）
   3. 如果对象是数组，那么额外增加4个字节
2. 实例数据（Instance Data）
3. 对齐填充（Padding），对象的大小必须是8字节的整数倍

#### 参考

[4.2. Primitive Types and Values](https://docs.oracle.com/javase/specs/jls/se8/html/jls-4.html#jls-4.2)

[java对象在内存的大小](https://www.cnblogs.com/ulysses-you/p/10060463.html)

[Java的对象头和对象组成详解](https://blog.csdn.net/lkforce/article/details/81128115)

### 位移操作

用于操作整型或者字符型如`byte`， `char`， `short`， `int` 和 `long`。

|            | 操作 符 |
| ---------- | :-----: |
| 位与       |    &    |
| 位或       |   \|    |
| 异或       |    ^    |
| 取反       |    ~    |
| 左移       |   <<    |
| 右移       |   >>    |
| 无符号右移 |   >>>   |
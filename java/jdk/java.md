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

## 泛型

### 优点

- 编译时的类型检查（类型安全）
- 消除强制类型转换

### 泛型类

泛型类的定义格式如下：

```java
// 由尖括号 <> 分隔的类型参数部分在类名后面
class name<T1, T2, ..., Tn> {
}
```

类型参数可以是任何**非基本类型**：任何类类型，任何接口类型，任何数组类型或甚至另一个类型参数。

按照惯例，类型参数名称是单个大写字母。最常用的类型参数名称是：

- E - 元素（由 Java 集合框架广泛使用）
- K - Key
- N - Number
- T - Type
- V - Value
- S,U,V 等。第2， 3， 4个类型

`Box` 是泛型 `Box <T>` 的原始类型。但是非泛型类或接口类型不是原始类型。

给定两个具体类型 A 和 B（例如 Number 和 Integer），`MyClass <A>` 与 `MyClass <B>` 没有关系， 不管 A 和 B 是否相关。`MyClass <A>` 和 `MyClass <B>` 的公共父项是 Object。

 只要不改变类型参数，子类型关系在类型之间保留： `ArrayList <String>` 是 `List <String>` 的一个子类型。

为了向后兼容，允许将参数化类型分配给其原始类型。

但是，如果将原始类型分配给参数化类型，则会收到`Unchecked assignment`警告。

### 泛型方法

作用域仅限于声明它的方法。

允许使用静态和非静态泛型方法，以及泛型类构造函数。

只要编译器可以从上下文中推断出类型参数，就可以 用一组空的类型参数 `<>` 替换调用泛型类的构造函数所需的类型参数。 这对尖括号非正式地称为“钻石操作符”。

### 有界类型参数

一个类型参数可以有多个边界：

```java
<T extends B1 & B2 & B3>
```

### 通配符

```java
// 上界通配符
List<? extends A>
// 无界通配符
List <?>
// 下界通配符
List<? super A>
```

上界通配符将未知类型限制为特定类型或该类型的子类型。

下界通配符将未知类型限制为该类型的特定类型或超类型。

可以为通配符指定上界，也可以指定下界，但不能同时指定两者。

`List<? extends A>` 可以非正式地认为是只读的。

对于任何具体类型 A，`List <A>` 是 `List <?>` 的子类型。

`List <Object>` 和 `List <?>` 是不一样的。可以将对象或任何对象的子类型插入到 `List <Object>` 中。 但是只能将 null 插入到 `List <?>` 中。

### 类型擦除

在类型擦除过程中，Java 编译器擦除所有类型参数，并在类型参数有界的情况下用它的第一个边界替换每个类型参数；如果类型参数是无界的，那么它将替换为 Object。

类型擦除确保没有为参数化类型创建新的类；因此，泛型不会导致运行时开销。

可*具体化*类型是其类型信息在运行时完全可用的类型。这包括原语、非泛型类型、原始类型和未绑定通配符的调用。

*不可具体化类型*是在编译时通过类型擦除删除信息的类型——调用未定义为无界通配符的泛型类型。

Java 编程语言不允许创建参数化类型的数组。

### 参考

[JAVA8 官网笔记教程-泛型](https://zq99299.github.io/java-tutorial/java/generics/)

[The Java™ Tutorials-Generics](https://docs.oracle.com/javase/tutorial/java/generics/index.html)

## 注解

### @SuppressWarnings

### 参考

[What is SuppressWarnings ("unchecked") in Java?](https://stackoverflow.com/questions/1129795/what-is-suppresswarnings-unchecked-in-java)


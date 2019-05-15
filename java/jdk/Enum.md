## Enum枚举

### EnumSet类

《effective java》第32条说，EnumSet类主要用来代替位域来实现一些集合操作的。位域是将不同常量用二进制的不同位来表示，从而可以用位运算方便的进行一些集合操作，EnumSet用标准的Set接口实现了位域的集合操作，省去了很多手工处理的过程，性能也媲美位域，所有有什么理由还用位域呢？

#### API

构造类方法：

```java
//返回空Set，其他构造方法大多用它实现
noneOf(Class<E> elementType)
//变参的工厂方法
of(E first, E... rest)
//参数为一到五个枚举值的工厂方法，源码说性能高于变参的工厂方法
of(E e)
of(E e1, E e2)
of(E e1, E e2, E e3)
of(E e1, E e2, E e3, E e4)
of(E e1, E e2, E e3, E e4,E e5)
//包含某一范围的常量，使用了enum的ordinal()方法
range(E from, E to)
//包含枚举类所有常量的Set
allOf(Class<E> elementType)
//从其他集合构建的工厂方法
complementOf(EnumSet<E> s) //取s相对于所有枚举常量的差集
copyOf(Collection<E> c)
copyOf(EnumSet<E> s)  //简单的clone
```

集合操作参考Set接口

#### 实现类

EnumSet是一个抽象类，它有两个实现子类，RegularEnumSet和JumboEnumSet，两者区别是RegularEnumSet用一个long值来表示位域，因此最多只能表示少于64个常量的枚举类，但是适用于大多数情况；而JumboEnumSet使用long[]来表示位域。

### EnumMap类







> 参考：《effective java》第二版


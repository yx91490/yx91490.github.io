# Java8 lambda表达式

使用java8的lambda将list转为map（转）

Java8- Lambda如何实现条件去重distinct List,如何实现条件分组groupBy List

https://www.concretepage.com/java/java-8/



## Lambda 表达式与匿名类的区别

使用匿名类与 Lambda 表达式的一大区别在于关键词的使用。对于匿名类，关键词 `this` 解读为匿名类，而对于 Lambda 表达式，关键词 `this` 解读为写就 Lambda 的外部类。

Lambda 表达式与匿名类的另一不同在于两者的编译方法。Java 编译器编译 Lambda 表达式并将他们转化为类里面的私有函数，它使用 Java 7 中新加的 `invokedynamic` 指令动态绑定该方法，关于 Java 如何将 Lambda 表达式编译为字节码，Tal Weiss 写了一篇[很好的文章](http://www.takipiblog.com/2014/01/16/compiling-Lambda-expressions-scala-vs-java-8/)。

### 参考

- [Function接口 – Java8中java.util.function包下的函数式接口](http://ifeve.com/jjava-util-function-java8/)
- [Predicate和Consumer接口– Java 8中java.util.function包下的接口](http://ifeve.com/predicate-and-consumer-interface-in-java-util-function-package-in-java-8/)
- [Java 8 Convert List to Map using Collectors.toMap() Example](https://www.concretepage.com/java/jdk-8/java-8-convert-list-to-map-using-collectors-tomap-example)
- [深入浅出 Java 8 Lambda 表达式](http://blog.oneapm.com/apm-tech/226.html)
- [Java8- Lambda如何实现条件去重distinct List,如何实现条件分组groupBy List](https://www.wanaright.com/2016/12/17/java8-lambda如何实现条件去重distinct-list如何实现条件分组groupby-list/)
- [java8新特性 lambda Stream map(函数式编程)](https://blog.csdn.net/u014646662/article/details/52261511)

## Java 8 Stream to find element in list

```
ids.forEach(id -> 
    list.stream()
    .filter(p -> p.getId() == id)
    .findAny()
    .ifPresent(p -> {
        // do stuff here
    });
);
```

### 参考

- [Java 8 Stream to find element in list](https://stackoverflow.com/questions/35928747/java-8-stream-to-find-element-in-list)

- [Difference between findAny() and findFirst() in Java 8](https://stackoverflow.com/questions/35359112/difference-between-findany-and-findfirst-in-java-8)

# JDK各版本新特性

### JDK 1.1

- 内部类
- JDBC

### J2SE 1.2

- `strictfp` 关键字
- 集合框架

### J2SE 1.3

- 用于实现动态代理的类

### J2SE 1.4

- 断言
- 仿照Perl的正则表达式
- 非阻塞I/O
- 日志API

### Java SE 5.0

- 泛型
- for-each循环
- 自动装箱、拆箱
- 类型安全的Enum类
- 变长参数
- 静态导入
- 注解

### JDK 6

语言层面没有变化

### JDK 7

- 整数类型的二进制字面量表示
- 数值类型可以用下划线做分隔符提高可读性
- switch语句可以接受String类型
- 泛型类实例化时的类型推断（钻石运算符）
- try-with-resources语句
- 一个catch块中可以处理多个异常类型

### JDK 8 (LTS)

- Lambda表达式
- 方法引用
- 接口中的默认方法和静态方法
- 重复注解支持对同一个声明或类型的多次使用应用相同的注解类型
- 类型注解支持在使用类型的任何地方应用批注，而不仅限于声明
- 改进类型推断：根据目标类型自动推断
- 方法参数反射：可以获取方法的参数名
- Stream API
- Date Time API
- Optional类

### JDK 9

- 模块系统
- JShell
- HTTP/2 客户端
- 集合工厂方法
- 私有接口方法
- 进程 API
- 改进的 Javadoc
- 改进的 Stream API
- 多版本兼容 JAR
- 改进 try-with-resources 语法
- 改进的弃用注解 @Deprecated
- 匿名类可以使用钻石操作符
- 改进 Optional 类
- 改进的 CompletableFuture API
- 轻量级的 JSON API
- 响应式流 API

### JDK 10

- 局部变量类型推断

### JDK 11 (LTS)

- 在Lambda表达式中使用var
- Unicode 10
- 标准HTTP Client
-  Collection.toArray新的默认方法
- Z GC
- 无操作垃圾回收器
- 飞行记录器

### JDK 12

- Shenandoah低暂停时间垃圾收集器（实验性）
- 微基准测试套件
- switch 表达式（预览阶段）
- JVM 常量 API
- 针对G1，提供可中止的混合垃圾收集
- 针对G1，及时释放已申请但未使用的内存

### JDK 13

- switch优化更新（预览版）
- 文本块（预览阶段）
- ZGC：取消使用未使用的内存
- 重新实现旧版 Socket API

### JDK 14

- Switch 表达式
- instanceof的模式匹配（预览版）
- 文本块（第二预览版本）
- Record 类（预览）
- 适用于 Windows 的 ZGC
- 适用于 macOS 的 ZGC
- 移除 CMS 垃圾收集器
- 弃用 ParallelScavenge + SerialOld 的垃圾收集器组合

### JDK 15

- 文本块
- ZGC生产环境可用
- Record类（第二预览版）
- 模式匹配的instanceof（第二预览版）
-  Sealed Classes（第一预览版）

### JDK16

- Vector API (第一预览版)
- Record类（最终版）
-  Sealed Classes（第二预览版）
- 模式匹配的instanceof（最终版）
-  提供jpackage用于打包独立Java应用程序的工具

### JDK 17

- Vector API (第二预览版)
- switch新增模式（预览版）
-  Sealed Classes（最终版）
- 默认启用Parallel GC

### 参考

- [Java Programming Language Enhancements](https://docs.oracle.com/javase/7/docs/technotes/guides/language/enhancements.html)
- [What's New in JDK 8](https://www.oracle.com/technetwork/java/javase/8-whats-new-2157071.html)
- [Java 8 特性 – 终极手册](http://ifeve.com/java-8-features-tutorial/)
- [Java 8新特性终极指南](http://www.importnew.com/11908.html)
- [Java 7中的Try-with-resources](http://ifeve.com/java-7%E4%B8%AD%E7%9A%84try-with-resources/)
- [Java version history](https://en.wikipedia.org/wiki/Java_version_history)
- [JDK17新特性详解](https://my.oschina.net/mdxlcj/blog/5261402)
- [New Features in Java 17](https://www.baeldung.com/java-17-new-features)
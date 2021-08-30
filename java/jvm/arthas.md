# Arthas学习笔记

## 命令列表

| 命令        | 功能                                                         |
| ----------- | ------------------------------------------------------------ |
| dashboard   | 当前系统的实时数据面板                                       |
| thread      | 查看当前线程信息，查看线程的堆栈                             |
| jvm         | 查看当前JVM信息                                              |
| sysprop     | 查看当前JVM的系统属性(System Property)                       |
| sysenv      | 查看当前JVM的环境属性(System Environment Variables)          |
| vmoption    | 查看，更新VM诊断相关的参数                                   |
| perfcounter | 查看当前JVM的 Perf Counter信息                               |
| logger      | 查看logger信息，更新logger level                             |
| mbean       | 查看 Mbean 的信息                                            |
| getstatic   | 查看类的静态属性                                             |
| ognl        | 执行ognl表达式                                               |
| sc          | “Search-Class” 的简写，查看JVM已加载的类信息                 |
| sm          | “Search-Method” 的简写，查看已加载类的方法信息               |
| dump        | dump 已加载类的 bytecode 到特定目录                          |
| heapdump    | 类似jmap命令的heap dump功能                                  |
| vmtool      | 利用JVMTI接口，实现查询内存对象，强制GC等功能。              |
| jad         | 反编译指定已加载类的源码                                     |
| classloader | 查看classloader的继承树，urls，类加载信息                    |
| mc          | Memory Compiler/内存编译器，编译.java文件生成.class。        |
| retransform | 加载外部的.class文件，retransform jvm已加载的类。            |
| redefine    | 加载外部的.class文件，redefine jvm已加载的类。               |
| monitor     | 对匹配 class-pattern／method-pattern／condition-express的类、方法的调用进行监控 |
| watch       | 观察到指定方法的调用情况。能观察到的范围为：`返回值`、`抛出异常`、`入参`，通过编写 OGNL 表达式进行对应变量的查看。 |
| trace       | trace 命令能主动搜索 class-pattern／method-pattern 对应的方法调用路径，渲染和统计整个调用链路上的所有性能开销和追踪调用链路。 |
| stack       | 输出当前方法被调用的调用路径                                 |
| tt          | 记录下指定方法每次调用的入参和返回信息，并能对这些不同的时间下调用进行观测 |
| profiler    | 生成应用热点的火焰图                                         |
| cat         | 打印文件内容                                                 |
| echo        | 打印参数                                                     |
| grep        | 类似传统的grep命令                                           |
| base64      | base64编码转换                                               |
| tee         | 用于读取标准输入的数据，并将其内容输出成文件。               |
| pwd         | 返回当前的工作目录                                           |
| auth        | 验证当前会话                                                 |
| options     | 全局开关                                                     |


## 参考

[命令列表](https://arthas.aliyun.com/doc/commands.html)
## NoSuchMethodError问题的通用调试方法

### 现象

在开发或者部署系统的时候经常会遇到`NoSuchMethodError`这个错误，比如我在修改kylin源码的时候遇到了下面的问题：

```log
Caused by: java.lang.NoSuchMethodError: org.apache.hadoop.hbase.client.Scan.setCaching(I)Lorg/apache/hadoop/hbase/client/Scan;
        at org.apache.kylin.storage.hbase.cube.v2.CubeHBaseRPC.buildScan(CubeHBaseRPC.java:89)
        at org.apache.kylin.storage.hbase.cube.v2.coprocessor.endpoint.CubeVisitService.visitCube(CubeVisitService.java:280)
        at org.apache.kylin.storage.hbase.cube.v2.coprocessor.endpoint.generated.CubeVisitProtos$CubeVisitService.callMethod(CubeVisitProtos.java:5555)
```
大概意思是说`org.apache.hadoop.hbase.client.Scan`这个类中没有`setCaching`这个方法，这个方法表示的是什么意思？如果没见过这个错误或者没见过对应的源码可能并不能一眼看出来。其实`org.apache.hadoop.hbase.client.Scan.setCaching(I)Lorg/apache/hadoop/hbase/client/Scan;`这个是字节码对应的方法签名，`I`表示参数是`int`，`Lorg/apache/hadoop/hbase/client/Scan;`表示返回值是`org.apache.hadoop.hbase.client.Scan`这个类，通过查看kylin运行环境的hbase-client.jar发现返回值与源码中的不一致，通过修改依赖的版本重新编译解决了。这里总结一下这个问题的通用调试方法。

### 原因

`NoSuchMethodError`这个问题是说相应的类中找不到该方法，通常这个问题有以下几种原因：

1. 加载了错误版本的jar包
2. 多个jar包中的类重复了，jvm加载了错误的类

### 排查方法

排查此问题的关键是找到jvm最终加载的是哪个jar包里的类，根据问题发生的环境又可以分为是本地开发环境和服务器部署环境：

##### 本地开发环境

可以通过IDE自带的搜索功能查看类所在的jar包；

调试模式打印类路径：

```java
foo.class.getProtectionDomain().getCodeSource()
```
##### 部署环境

如果是部署到服务器上，则可以通过classpath查找jar包。

排查问题时可能会用到的工具：

1. 反编译工具，如`jd-gui`或者`javap -s foo.jar`可以查看方法的具体签名
2. `java -verbose`，可以输出所有类的加载过程

### NoSuchMethodException

如果方法是通过反射调用的，则会抛出`NoSuchMethodException`这个异常。

### 方法签名

总结一下方法签名中常见的一些符号代表的意义：

| 终结符             | 类型             |
| ------------------ | ---------------- |
| B                  | byte             |
| C                  | char             |
| D                  | double           |
| F                  | float            |
| I                  | int              |
| Ljava/lang/Object; | java.lang.Object |
| J                  | **long**         |
| S                  | short            |
| V                  | void             |
| Z                  | **boolean**      |
| [                  | Array            |

做个实验： 

```java
Compiled from "Demo.java"
public class org.apache.Demo {
  public org.apache.Demo();
    Signature: ()V

  public org.apache.Demo(int);
    Signature: (I)V

  public static void main(java.lang.String[]);
    Signature: ([Ljava/lang/String;)V

  public static char method(float);
    Signature: (F)C

  public void method(boolean);
    Signature: (Z)V

  public void method(boolean, char, byte, short, int, long, float, double);
    Signature: (ZCBSIJFD)V

  public java.lang.String method(java.lang.Boolean, java.lang.Integer);
    Signature: (Ljava/lang/Boolean;Ljava/lang/Integer;)Ljava/lang/String;

  public void method(boolean[]) throws java.lang.Exception;
    Signature: ([Z)V

  public java.lang.String[] method(java.lang.String[][]);
    Signature: ([[Ljava/lang/String;)[Ljava/lang/String;
}
```

### 

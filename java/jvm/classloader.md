# 类与类加载器

1. 每一个类加载器都有一个独立的类名称空间。
2. 一个类和加载他的类加载器来确定他在java虚拟机的唯一性。
3. 类相等涉及的范围：
   1. Class对象的equals()方法的返回结果
   2. Class.isAssignableFrom()方法的返回结果
   3. Class.isInstance()方法的返回结果
   4. instanceof关键字的判定结果
4. 两个class对象是否相等的条件：
   1. 类的完整类名一致
   2. 加载这个类的ClassLoader实例对象相同

类加载过程：

|      | 过程   | 说明                                    |
| ---- | ------ | --------------------------------------- |
|      | 加载   | 读入内存，创建一个`java.lang.Class`对象 |
| 连接 | 验证   | 校验文件格式                            |
| 连接 | 准备   | 为类变量分配内存                        |
| 连接 | 解析   | 的符号引用替换为直接引用                |
|      | 初始化 | 执行类构造器\<clinit>()方法             |
|      | 使用   |                                         |
|      | 卸载   |                                         |

## 分类

1. 启动类加载器 BootstrapClassLoader <JAVA_HOME>/lib目录或者被-Xbootclasspath参数指定的路径中的rt.jar类库加载到内存中。无法被java程序直接引用。getClassLoader()中 return null代替。
2. 扩展类加载器 sum.misc.Launcher$ExtClassLoader 实现。负责加载<JAVA_HOME>/lib/ext目录或者被java.ext.dirs系统变量所指定的路径中的所有类库，开发者可以直接使用这个类加载器。
3. 应用程序类加载器 sum.misc.Launcher$AppClassLoader 实现。负责加载用户类路径上所指定的类库，开发者可以直接使用这个类加载器。

## 双亲委派模型

BootstrapClassLoader > ExtClassLoader > AppClassLoader > UserClassLoader

子类加载器把加载请求委派给父类加载器完成，父加载器无法完成时子加载器才会尝试自己去加载。保证类在jvm中的唯一性。	

**为什么要破坏双亲委派模型**？

由 classloader 加载模型中的可见性(visibility)决定的：父类加载的类对子类是可见的， 然而子类加载的类 对父类却是不可见的。这时候就需要委托子类加载器去加载class文件。

**破坏双亲委派模型**

1. 如果基础类又要回调用户的代码怎么办（如JNDI服务）？

   线程上下文类加载器 可以通过`Thread.setConextClassLoader()`方法进行设置

SPI 是如何打破双亲委派模型的呢？

```java
// java.util.ServiceLoader#load(java.lang.Class<S>)
public static <S> ServiceLoader<S> load(Class<S> service) {
    ClassLoader cl = Thread.currentThread().getContextClassLoader();
    return ServiceLoader.load(service, cl);
}
```

通过从线程上下文（ThreadContext）获取 classloader ，借助这个classloader 可以拿到实现类的 Class。

**tomcat类加载器架构**

解决以下几个问题：

1. 部署在同一个服务器上的两个web应用程序所使用java类库可以相互隔离。
2. 部署在同一个服务器上的两个web应用程序所使用java类库可以相互共享(否则浪费方法区内存)。
3. 服务器保证自身安全不受web应用程序的影响。
4. 支持hostSwap功能。

tomcat类库目录：

|   目录   | tomcat | web应用程序 | 加载器              |
| :------: | :----: | :---------: | ------------------- |
| /common  |   T    |      T      | CommonClassLoader   |
| /server  |   T    |             | CatalinaClassLoader |
| /shared  |        |      T      | SharedClassLoader   |
| /WEB-INF |        |  T(仅自己)  | WebappClassLoader   |

```
BootstrapClassLoader
  |_ExtClassLoader
    |_AppClassLoader
      |_CommonClassLoader
        |_CatalinaClassLoader
        |_SharedClassLoader
          |_WebappClassLoader
            |_JasperLoader
```

## 参考

[为什么说java spi破坏双亲委派模型？](https://www.zhihu.com/question/49667892)

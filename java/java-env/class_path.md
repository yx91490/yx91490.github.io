# 类路径ClassPath

## ClassPath

### 设置方式

```bash
sdkTool -classpath classpath1：classpath2 ...
setenv CLASSPATH classpath1：classpath2 ...
```

每个类路径应以文件名或目录结尾：

1. 以`.jar`或者`.zip`结尾的文件
2. 包含未命名包中类文件的目录
3. 包含命名包中类文件的根包所在目录
4. 包含通配符`*`的路径（如`mydir/*`会被扩展成`mydir`目录下所有的jar文件，包括隐藏文件；但不会包括子目录）
5. 多个classpath之间用`:`分隔

### 类加载机制

jvm会按照`bootstrap类->扩展类->用户classpath`的顺序加载类，用户类按照如下顺序加载：

1. `.`当前目录
2. `CLASSPATH`环境变量
3. `-classpath`命令行工具的参数
4. `-jar`选项

后面的方式会**覆盖**前面的方式。

### 获取方式

在程序中可以通过系统属性`java.class.path`获取

### 参考

> https://docs.oracle.com/javase/8/docs/technotes/tools/findingclasses.html
>
> https://docs.oracle.com/javase/8/docs/technotes/tools//unix/classpath.html
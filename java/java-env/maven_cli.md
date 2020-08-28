# Maven命令行

## 运行插件

### 插件前缀

使用mvn命令调用插件的时候，可以使用插件的前缀来代替繁琐的插件坐标的方式。

插件前缀与插件`groupId:artifactId`是一一对应的关系，这个关系的配置存储在仓库的元数据中，元数据位于下面2个xml中：

```
~/.m2/repository/org/apache/maven/plugins/maven-metadata-central.xml
~/.m2/repository/org/codehaus/mojo/maven-metadata-central.xml
```

也可以通过在`settings.xml`中配置，让maven检查其他`grouId`上的插件元数据中前缀和插件关系的配置，如下：

```xml
<settings>
  <pluginGroups>
    <pluginGroup>com.your.plugins</pluginGroup>
  </pluginGroups>
</settings>
```

### 插件传参

插件传递参数的两种方式：

1. pom.xml中properties中定义的方式指定：

   ```xml
   <properties>
   	<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
   </properties>
   ```

2. mvn命令-D属性名称的方式传递：

   ```bash
   mvn <plugin-prefix>:<goal> [-DParameter1] [-DParameter2] [-DParameterN]
   ```

### 列出插件的所有目标

使用`maven-help-plugin`列出插件所有目标：

```bash
mvn help:describe -Dplugin=<plugin-prefix>
mvn help:describe -Dplugin=<groupId>:<artifactId>[:<version]
```

或者对于Maven内置插件可以使用下面命令：

```bash
mvn <plugin-prefix>:help
```

### 查看插件目标参数列表

使用`maven-help-plugin`列出插件目标参数列表：

```bash
mvn help:describe -Dplugin=<plugin-prefix> -Dgoal=<goal> -Ddetail
```

或者对于Maven内置插件可以使用下面命令：：

```bash
mvn <plugin-prefix>:help -Dgoal=<goal> -Ddetail
```

### maven-help-plugin命令参数

```
mvn help:describe -Dcmd=<goal>
mvn help:describe -Dcmd=<phase>
mvn help:describe -Dplugin=<plugin-prefix>
mvn help:describe -Dplugin=<groupId>:<artifactId>[:<version]
mvn help:describe -DgroupId=<groupId> -DartifactId=<artifactId> -Dversion=<version>
```

## 构建参数

```
b2b
	b2b-account
		b2b-account-api
		b2b-account-service
	b2b-order
		b2b-order-api
		b2b-order-service
```

上面列出了`mvn`命令后面的一些选项，有几个选项本次我们需要用到，如下：

### -pl,--projects \<arg>

构建指定的模块，arg表示多个模块，之间用逗号分开，模块有两种写法

```java
-pl <module1> [,<module2>] [,<moduleN>]
-pl <module1-groupId:module1-artifactId> [,<module2-groupId:module2-artifactId>] [,<module3-groupId:module3-artifactId>]
```

### -rf,--resume-from \<arg>

在完整的构建顺序基础上指定从哪个模块开始构建

### -am,--also-make

同时构建所列模块依赖的模块

### -amd,--also-make-dependents

同时构建依赖于所列模块的模块

## 参考

[Maven系列第6篇：生命周期和插件详解](https://www.cnblogs.com/itsoku123/p/11887484.html)

[Maven系列第8篇：你的maven项目构建太慢了，我实在看不下去](https://www.cnblogs.com/itsoku123/p/11903943.html)
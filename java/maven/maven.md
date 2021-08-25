# Maven指南

## （一）综述

maven这个词可能有以下几个意思：

1. 项目管理工具，可以对Java项目进行依赖管理和构建。
2. 命令行工具，用来在命令行中对项目执行构建命令等。
3. 存放jar包的仓库  ，maven是中央式的jar仓库，所有的jar都会从中央仓库同步到本地。

## （二）项目管理

pom.xml描述了如何构建一个maven项目，通过各种标签我们可以灵活而高效地配置maven项目的构建。

#### 配置属性

字符编码异常：

```shell
Using platform encoding (GBK actually) to copy filtered resources, i.e. build is platform dependent!
```

Maven作为build工具时经常出现此问题，原因是未指定具体编码方式，通过在pom.xml指定编码方式可解决此问题。

```xml
<project>  
  ...  
  <properties>  
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>  
  </properties>  
  ...  
</project>
```

Maven官网在FAQ中，列出了这个问题：[How do I prevent “WARNING Using platform encoding (Cp1252 actually) to copy filtered resources, i.e. build is platform dependent!”](http://maven.apache.org/general.html#encoding-warning)

#### 配置资源目录

把除了`src/main/resources`目录以外的目录里的文件加入ClassPath中，pom.xml里配置：

```xml
<build>
    <resources>
        <resource>
            <directory>src/main/config</directory>
        </resource>
    </resources>
</build>
```

代码中调用：

```
Class.getResource("/path-to-your-res");
ClassLoader.getResource("path-to-your-res");
```

> [Resources and config loading in maven project](https://stackoverflow.com/questions/16374235/resources-and-config-loading-in-maven-project)
>
> [Maven (Surefire): copy test resources from src/test/java](https://stackoverflow.com/questions/4221285/maven-surefire-copy-test-resources-from-src-test-java)
>
> [利用maven中resources插件的copy-resources目标进行资源copy和过滤](https://www.tuicool.com/articles/JfaA7r)

#### 配置Maven插件

##### maven-compiler-plugin

设置JDK版本：

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <version>3.8.0</version>
    <configuration>
        <source>1.8</source>
        <target>1.8</target>
        <encoding>UTF-8</encoding>
    </configuration>
</plugin>
```

另一种简便的方式是设置properties，对于JDK9之前的版本：

```xml
<properties>
    <maven.compiler.source>1.8</maven.compiler.source>
    <maven.compiler.target>1.8</maven.compiler.target>
</properties>
```

JDK9之后的版本（支持交叉编译）：

```xml
<properties>
	<maven.compiler.release>8</maven.compiler.release>
</properties>
```

当代码中使用了过时的API时会提示：

```
[INFO] xxx.java: 某些输入件使用或覆盖了已过时的 API。
[INFO] xxx.java: 有关详细, 请使用 -Xlint:deprecation 重新编译。
```

需要在在pom.xml中通过如下配置来显示详细信息：

```xml
<plugin>
    <artifactId>maven-compiler-plugin</artifactId>
    <configuration>
        <compilerArgument>-Xlint:deprecation</compilerArgument>
    </configuration>
</plugin>
```

当代码中出现了未经检查或不安全的操作时会提示：

```
[INFO] xxx.java: 某些输入件使用了未经检查或不安全的操作。
[INFO] xxx.java: 有关详细 请使用 -Xlint:unchecked 重新编译。
```

需要在在pom.xml中通过如下配置来显示详细信息：

```xml
<plugin>
    <artifactId>maven-compiler-plugin</artifactId>
    <configuration>
        <compilerArgument>-Xlint:unckecked</compilerArgument>
    </configuration>
</plugin>
```

##### maven-jar-plugin

1）在一些开源项目可能会看到依赖中有一些`xxx-test.jar`，这是对应的项目中的测试类单独打成的jar包，以便于在其他项目的测试类中引用。这些test jar使用下面的方式生成：

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-jar-plugin</artifactId>
    <version>3.0.2</version>
    <executions>
        <execution>
            <goals>
                <goal>test-jar</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

在其他项目中按下面的方式引用：

```xml
<!--在其他项目的测试类中引用-->
<dependency>
    <groupId>xxx</groupId>
    <artifactId>xxx</artifactId>
    <version>xxx</version>
    <type>test-jar</type>
    <scope>test</scope>
</dependency>
```

2）配置打包的jar相关：

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-jar-plugin</artifactId>
    <version>2.3.1</version>
    <configuration>
        <outputDirectory>${basedir}/target</outputDirectory>
          <excludes>
                <exclude>config/**</exclude>
           </excludes>
    </configuration>
</plugin>
```

3）将classpath信息加入生成的jar中，同时指定依赖jar包的目录前缀：

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-jar-plugin</artifactId>
    ...
    <configuration>
      <archive>
        <manifest>
          <!-- 将classpath信息加入生成的jar中 -->
          <addClasspath>true</addClasspath>
          <!-- 指定快照版jar名称方式 -->
          <useUniqueVersions>false</useUniqueVersions>
          <!-- 指定依赖jar包的目录前缀 -->
          <classpathPrefix>lib/</classpathPrefix>
        </manifest>
      </archive>
    </configuration>
    ...
  </plugin>
```
如果不指定`useUniqueVersions`为`false`，那么classpath中快照版的jar名称就变为`${artifactId}-${version}-20150316.032502-62.jar`这种maven库里能唯一定位的形式，而不是`${artifactId}-${version}-SNAPSHOT.jar`这种形式，这会导致运行时ClassNotFoundException。

##### maven-dependency-plugin

将依赖的库拷贝到输出目录下：

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-dependency-plugin</artifactId>
    <version>2.8</version>
    <executions>
        <execution>
                <id>copy-dependencies</id>
                <phase>package</phase>
                <goals>
                    <goal>copy-dependencies</goal>
                </goals>
                <configuration>
                    <outputDirectory>${basedir}/target/lib</outputDirectory>
                    <overWriteReleases>true</overWriteReleases>
                    <overWriteSnapshots>true</overWriteSnapshots>
                    <overWriteIfNewer>true</overWriteIfNewer>
                </configuration>
        </execution>
    </executions>
</plugin>
```

##### maven-assembly-plugin

将项目代码和所有依赖的jar包打进一个jar包中：

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-assembly-plugin</artifactId>
    <version>2.6</version>
    <configuration>
        <archive>
            <manifest>
                <!--java -jar运行入口 -->
                <mainClass>xxx</mainClass>
            </manifest>
        </archive>
        <!--打出来的jar包名称去掉jar-with-dependencies后缀-->
        <appendAssemblyId>false</appendAssemblyId>
        <descriptorRefs>
            <descriptorRef>jar-with-dependencies</descriptorRef>
        </descriptorRefs>
    </configuration>
</plugin>
```

##### maven-shade-plugin

重命名包名：

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-shade-plugin</artifactId>
    <version>3.1.1</version>
    <executions>
        <execution>
            <phase>package</phase>
            <goals>
                <goal>shade</goal>
            </goals>
            <configuration>
                <artifactSet>
                    <includes>
                        <include>com.xxx:my-project</include>
                    </includes>
                </artifactSet>
                <relocations>
                    <relocation>
                        <pattern>com.xxx</pattern>
                        <shadedPattern>com.yyy</shadedPattern>
                    </relocation>
                </relocations>
                <filters>
                    <filter>
                        <artifact>*:*</artifact>
                        <excludes>
                            <exclude>META-INF/**/*</exclude>
                            <exclude>config/**/*</exclude>
                        </excludes>
                    </filter>
                </filters>
            </configuration>
        </execution>
    </executions>
</plugin>
```

#### 配置Profile

profile可以让我们针对不同环境定义一系列的配置信息。这样我们就可以定义多个profile，每个profile对应不同的激活条件和配置信息，从而达到不同环境使用不同配置信息的效果。可以通过多种方式激活profile:

- 显式的激活 通过maven 的`-P`参数激活指定的profile，参数的值是profile的id,多个profile以逗号分割,如果不想激活某个默认的profile，就在它的id前加个`!`
- 隐式的激活 配置profile时，可以在 `<profile>` 的 `<activation>` 元素下配置隐式激活的信息。

> [使用 Maven Profile 和 Filtering 打各种环境的包](https://segmentfault.com/a/1190000003908040)  
> [Introduction to Build Profiles](https://maven.apache.org/guides/introduction/introduction-to-profiles.html)

## （三）Maven命令行

#### 强制拉取jar包

有时候某个jar包明明在maven仓库里但就是拉不下来，导致mvn编译打包过程中出现下面的错误：

	[ERROR] Failed to execute goal on project tests: Could not resolve dependencies for project test:test:jar:1.0.0: Failure to find org.apache.spark:spark-sql_2.11:jar:2.2.0.cloudera1 in http://repository.xxxx/maven-public/ was cached in the local repository, resolution will not be reattempted until the update interval of nexus has elapsed or updates are forced -> [Help 1]
可以在`mvn`命令中用`-U`参数强制从远程仓库拉取缺失的jar包：

```shell
mvn -U package
```

#### 跳过单元测试

在使用mvn package进行编译打包时，Maven默认会执行src/test/java中的JUnit测试用例，有时为了跳过执行单元测试会使用下面的参数：

```bash
mvn clean package -DskipTests
# 或者
mvn clean package -Dmaven.test.skip=true
```

这两个参数的主要区别是：

- **-DskipTests**，不执行测试用例，但编译测试用例类生成相应的class文件至target/test-classes下。   
- **-Dmaven.test.skip=true**，不执行测试用例，也不编译测试用例类。

也可以配置到pom.xml的属性里：

```xml
<properties>
  <skipTests>true</skipTests>
  <maven.test.skip>true</maven.test.skip>
</properties>
```

#### 跳过checkstyle检查

有些开源项目会使用checkstyle检查代码格式，在我们打包代码的时候可以使用下面的参数跳过检查：

```bash
mvn clean package -Dcheckstyle.skip=true
```

#### 生成Scala项目模板

命令如下:

     mvn archetype:generate

然后会提示你选择一个模板:

    Choose a number or apply filter (format: [groupId:]artifactId, case sensitive contains): 3: 

输入模板对应数字55后，提示选择一个版本:

	Choose net.alchim31.maven:scala-archetype-simple version: 
	1: 1.4
	2: 1.5
	3: 1.6
然后是一堆jar包坐标的信息:

```
Define value for property 'groupId': test
Define value for property 'artifactId': test
Define value for property 'version' 1.0-SNAPSHOT: : 
Define value for property 'package' test: : test
```

确认后即可.

#### 多模块项目编译指定模块

- -pl, --projects 编译指定项目
- -am, --also-make 同时编译指定项目依赖的项目

```
mvn install -pl $module1[,$module2] -am
```

- [Maven Modules + Building a Single Specific Module](https://stackoverflow.com/questions/1114026/maven-modules-building-a-single-specific-module)
- [How to build maven parent and select number of modules?](https://stackoverflow.com/questions/7368600/how-to-build-maven-parent-and-select-number-of-modules)

## （四）配置Maven仓库

通过配置`${user.home}/.m2/settings.xml`可以指定jar包从哪个镜像库拉取jar包（常见的比如阿里云的镜像库,参考：[阿里云公共代理库](https://help.aliyun.com/document_detail/102512.html)），通常我们会把公司内部的镜像库配置为代理所有仓库(`  <mirrorOf>*</mirrorOf>`)，但这可能导致一些开源项目里单独配置的镜像库失效，比如kylin里的配置：

```xml
<repositories>
    ...
    <repository>
        <id>nexus</id>
        <name>Kyligence Repository</name>
        <url>http://repository.kyligence.io:8081/repository/maven-public/
        </url>
        <releases>
            <enabled>true</enabled>
        </releases>
        <snapshots>
            <enabled>true</enabled>
        </snapshots>
    </repository>
</repositories>
```

这时候只要把配置文件里改为`  <mirrorOf>central</mirrorOf>`（单独代理`central`库）就可以了。

有时候Maven会出现在build后会自动去Downloading 这个maven-metadata.xml文件，由于一些原因会一直卡在DOWNLOADING和retry。找到xml中的updatePolicy标签，改为never即可：

```xml
<repository>
    <id>snapshots</id>
    <name>Snapshots</name>
    <url>url</url>
    <releases>
        <enabled>false</enabled>
    </releases>
    <snapshots>
    <enabled>true</enabled>
    <!-- 这个属性为更新策略，aways:每次，never:从不，daily:每日。-->
    <updatePolicy>never</updatePolicy>
    </snapshots>
</repository>
```

> [maven build后Downloading maven-metadata.xml 的解决方法](https://blog.csdn.net/Joze_3/article/details/75402398)

http://maven.apache.org/guides/mini/guide-mirror-settings.html

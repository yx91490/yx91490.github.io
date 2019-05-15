### 综述

maven这个词可能有以下几个意思：

1. 项目管理工具，可以对Java项目进行依赖管理和构建。
2. 命令行工具，用来在命令行中对项目执行构建命令等。
3. 存放jar包的仓库  ，maven是中央式的jar仓库，所有的jar都会从中央仓库同步到本地。

### 配置pom.xml

pom.xml描述了如何构建一个maven项目，通过各种标签我们可以灵活而高效地配置maven项目的构建。

#### 配置maven插件

在一些开源项目可能会看到依赖中有一些`xxx-test.jar`，这是对应的项目中的测试类单独打成的jar包，以便于在其他项目的测试类中引用。这些test jar使用下面的方式生成：

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

配置打包的jar相关：

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

#### 配置Profile

profile可以让我们针对不同环境定义一系列的配置信息。这样我们就可以定义多个profile，每个profile对应不同的激活条件和配置信息，从而达到不同环境使用不同配置信息的效果。可以通过多种方式激活profile:

- 显式的激活 通过maven 的`-P`参数激活指定的profile，参数的值是profile的id,多个profile以逗号分割,如果不想激活某个默认的profile，就在它的id前加个`!`
- 隐式的激活 配置profile时，可以在 `<profile>` 的 `<activation>` 元素下配置隐式激活的信息。

> [使用 Maven Profile 和 Filtering 打各种环境的包](https://segmentfault.com/a/1190000003908040)  
> [Introduction to Build Profiles](https://maven.apache.org/guides/introduction/introduction-to-profiles.html)

### 配置Maven仓库

通过配置`${user.home}/.m2/settings.xml`可以指定jar包从哪个镜像库拉取jar包（常见的比如[阿里云](http://maven.aliyun.com)的镜像库），通常我们会把公司内部的镜像库配置为代理所有仓库(`  <mirrorOf>*</mirrorOf>`)，但这可能导致一些开源项目里单独配置的镜像库失效，比如kylin里的配置：

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

> [阿里云公共代理库](https://help.aliyun.com/document_detail/102512.html)

### Maven命令行

#### 强制拉取jar包

有时候某个jar包明明在maven仓库里但就是拉不下来，导致mvn编译打包过程中出现下面的错误：

	[ERROR] Failed to execute goal on project tests: Could not resolve dependencies for project test:test:jar:1.0.0: Failure to find org.apache.spark:spark-sql_2.11:jar:2.2.0.cloudera1 in http://repository.xxxx/maven-public/ was cached in the local repository, resolution will not be reattempted until the update interval of nexus has elapsed or updates are forced -> [Help 1]
可以在`mvn`命令中用`-U`参数强制从远程仓库拉取缺失的jar包：

```shell
mvn -U package
```

#### 跳过单元测试

在使用mvn package进行编译打包时，Maven默认会执行src/test/java中的JUnit测试用例，有时为了跳过测试，会使用参数`-DskipTests`或`-Dmaven.test.skip=true`，这两个参数的主要区别是：

- **-DskipTests**，不执行测试用例，但编译测试用例类生成相应的class文件至target/test-classes下。   

- **-Dmaven.test.skip=true**，不执行测试用例，也不编译测试用例类。


# Maven常用插件配置

https://maven.apache.org/guides/mini/guide-configuring-plugins.html

## maven-compiler-plugin

### 传递编译参数

3.3及以下版本：

```xml
<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-compiler-plugin</artifactId>
  <version>3.0</version>
  <configuration>
    <compilerArgument>-verbose -bootclasspath ${java.home}/lib/rt.jar</compilerArgument>
  </configuration>
</plugin>
```

或者：

```xml
<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-compiler-plugin</artifactId>
  <version>3.0</version>
  <configuration>
    <compilerArguments>
      <verbose/>
      <bootclasspath>${java.home}/lib/rt.jar</bootclasspath>
      <Xmaxerrs>1000</Xmaxerrs>
      <Xlint:unchecked/>
    </compilerArguments>
  </configuration>
</plugin>
```

3.3以上版本：

```xml
<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-compiler-plugin</artifactId>
  <version>3.9.0</version>
  <configuration>
    <compilerArgs>
      <arg>-verbose</arg>
      <arg>-Xlint:all,-options,-path</arg>
    </compilerArgs>
  </configuration>
</plugin>
```

参考

[3.0-Pass Compiler Arguments](https://maven.apache.org/plugins-archives/maven-compiler-plugin-3.0/examples/pass-compiler-arguments.html)

[3.9.0-Pass Compiler Arguments](https://maven.apache.org/plugins/maven-compiler-plugin/examples/pass-compiler-arguments.html)

## maven-source-plugin

创建当前项目源文件的 jar 存档。

>  从插件的 3.0.0 版本开始，所有可以通过命令行使用的属性都基于以下模式`maven.source.*`命名。

### 插件目标

| 目标                      | 说明                                                         |
| ------------------------- | ------------------------------------------------------------ |
| source:jar                | 将项目主源码打包到一个jar中                                  |
| source:jar-no-fork        | 类似于jar，但不fork构建声明，适合附加到构建生命周期。        |
| source:test-jar           | 将项目测试源码打包到一个jar中                                |
| source:test-jar-no-fork   | 类似于test-jar，但不fork构建，适合附加到构建生命周期。       |
| source:aggregate          | 聚合所有模块的源码到一个项目中                               |
| source:generated-test-jar | 将测试源码打包到一个jar中                                    |
| source:help               | 展示帮助信息，使用命令`mvn source:help -Ddetail=true -Dgoal=<goal-name>`展示参数详情 |

### 参考

[Apache Maven Source Plugin](https://maven.apache.org/plugins/maven-source-plugin)

## maven-assembly-plugin

### `assembly:assembly`

2.x版本中的`assembly`目标在3.x版本中已删除，新版旧版都可以使用`single`目标代替。

### `assembly:single`

#### 描述文件

描述文件用来指定打包的格式，可以使用自定义的描述文件：

```xml
<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-assembly-plugin</artifactId>
  <version>3.1.0</version>
  <configuration>
    <finalName>${project.artifactId}</finalName>
    <descriptors>
      <descriptor>${assembly.descriptor}</descriptor>
    </descriptors>
  </configuration>
</plugin>
```

或者使用maven-assembly-plugin内置描述文件：

```xml
<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-assembly-plugin</artifactId>
  <version>3.1.0</version>
  <configuration>
    <descriptorRefs>
      <descriptorRef>jar-with-dependencies</descriptorRef>
    </descriptorRefs>
    <appendAssemblyId>false</appendAssemblyId>
    <archive>
      <manifest>
        <mainClass>my.sample.App</mainClass>
      </manifest>
    </archive>
  </configuration>
</plugin>
```

配置说明：

| 配置项                     | 值                    | 说明                                     |
| -------------------------- | --------------------- | ---------------------------------------- |
| descriptorRef              | jar-with-dependencies | 连同依赖jar包打成一个uber jar            |
| appendAssemblyId           | false                 | 去掉文件名中的jar-with-dependencies`后缀 |
| archive.manifest.mainClass | my.sample.App         | 打成以`java -jar`方式执行的jar           |

#### 执行

可以使用`mvn assembly:single`执行，也可以绑定到`package`阶段执行：

```xml
<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-assembly-plugin</artifactId>
  <version>3.1.0</version>
  <configuration>
    <!-- ... -->
  </configuration>
  <executions>
    <execution>
      <phase>package</phase>
      <goals>
          <goal>single</goal>
      </goals>
    </execution>
  </executions>
</plugin>
```

参考：

- [官方文档-描述符格式](http://maven.apache.org/plugins/maven-assembly-plugin/assembly.html)
- [官方文档-内置描述文件](http://maven.apache.org/plugins/maven-assembly-plugin/descriptor-refs.html#)

## maven-shade-plugin

### `shade:shade`

使用Transformer合并HDFS ServiceLoader的配置文件：

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-shade-plugin</artifactId>
    <version>3.2.1</version>
    <configuration>
        <transformers>
            <transformer
                    implementation="org.apache.maven.plugins.shade.resource.AppendingTransformer">
                <resource>META-INF/services/org.apache.hadoop.fs.FileSystem</resource>
            </transformer>
            <transformer
                    implementation="org.apache.maven.plugins.shade.resource.ManifestResourceTransformer">
                <mainClass>my.sample.App</mainClass>
            </transformer>
        </transformers>
    </configuration>
</plugin>
```

指定主类：

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-shade-plugin</artifactId>
    <configuration>
        <transformers>
            <transformer implementation="org.apache.maven.plugins.shade.resource.ManifestResourceTransformer">
                <mainClass>foo.bar.MainClass</mainClass>
            </transformer>
        </transformers>
    </configuration>
 </plugin>
```

解决报错问题：

```
java.lang.SecurityException: Invalid signature file digest for Manifest main attributes
    at sun.security.util.SignatureFileVerifier.processImpl(SignatureFileVerifier.java:284)
    at sun.security.util.SignatureFileVerifier.process(SignatureFileVerifier.java:238)
    at java.util.jar.JarVerifier.processEntry(JarVerifier.java:316)
    at java.util.jar.JarVerifier.update(JarVerifier.java:228)
    at java.util.jar.JarFile.initializeVerifier(JarFile.java:383)
    at java.util.jar.JarFile.getInputStream(JarFile.java:450)
    at sun.misc.JarIndex.getJarIndex(JarIndex.java:137)
    at sun.misc.URLClassPath$JarLoader$1.run(URLClassPath.java:839)
    at sun.misc.URLClassPath$JarLoader$1.run(URLClassPath.java:831)
    at java.security.AccessController.doPrivileged(Native Method)
    at sun.misc.URLClassPath$JarLoader.ensureOpen(URLClassPath.java:830)
    at sun.misc.URLClassPath$JarLoader.<init>(URLClassPath.java:803)
    at sun.misc.URLClassPath$3.run(URLClassPath.java:530)
    at sun.misc.URLClassPath$3.run(URLClassPath.java:520)
    at java.security.AccessController.doPrivileged(Native Method)
    at sun.misc.URLClassPath.getLoader(URLClassPath.java:519)
    at sun.misc.URLClassPath.getLoader(URLClassPath.java:492)
    at sun.misc.URLClassPath.getNextLoader(URLClassPath.java:457)
    at sun.misc.URLClassPath.getResource(URLClassPath.java:211)
    at java.net.URLClassLoader$1.run(URLClassLoader.java:365)
    at java.net.URLClassLoader$1.run(URLClassLoader.java:362)
    at java.security.AccessController.doPrivileged(Native Method)
    at java.net.URLClassLoader.findClass(URLClassLoader.java:361)
    at java.lang.ClassLoader.loadClass(ClassLoader.java:424)
    at sun.misc.Launcher$AppClassLoader.loadClass(Launcher.java:331)
    at java.lang.ClassLoader.loadClass(ClassLoader.java:357)
    at sun.launcher.LauncherHelper.checkAndLoadMain(LauncherHelper.java:495)
Error: A JNI error has occurred, please check your installation and try again
Exception in thread "main"
```

解决：

```xml
 <plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-shade-plugin</artifactId>
   <configuration>
     <minimizeJar>true</minimizeJar>
     <filters>
       <filter>
         <artifact>*:*</artifact>
         <excludes>
           <exclude>META-INF/*.SF</exclude>
           <exclude>META-INF/*.DSA</exclude>
           <exclude>META-INF/*.RSA</exclude>
         </excludes>
       </filter>
     </filters>
   </configuration>
</plugin>
```

参考：

[Invalid signature file digest for Manifest main attributes exception while trying to run jar file](https://stackoverflow.com/questions/34855649/invalid-signature-file-digest-for-manifest-main-attributes-exception-while-tryin)

## maven-dependency-plugin

### dependency:analyze

将依赖分为三类：

- used and declared
- used and undeclared
- unused and declared

此目标总是执行`test-compile`阶段。

[maven-dependency-analyzer](http://maven.apache.org/shared/maven-dependency-analyzer/) 作为默认的分析器，因为工作在字节码层面而非源码层面，所以某些情况检测不到，包括常量、仅保留在源代码的注解和 Javadoc 中的链接。

| 名称                              | 类型     | 描述                                                         |
| --------------------------------- | -------- | ------------------------------------------------------------ |
| analyzer                          | String   | 指定依赖分析器                                               |
| failOnWarning                     | boolean  | 发现告警时让构建失败                                         |
| ignoreNonCompile                  | boolean  | 对于未使用的依赖分析忽略这些scope：Runtime/Provided/Test/System |
| ignoreUnusedRuntime               | boolean  | 对于未使用的依赖分析忽略这些scope：Runtime                   |
| ignoredDependencies               | String[] | 对于“声明但未使用”和“使用但未声明”的列表忽略这些依赖，过滤语法：`[groupId]:[artifactId]:[type]:[version]`，可以使用`*`通配符。 |
| ignoredUnusedDeclaredDependencies | String[] | 对于“声明但未使用”的列表忽略这些依赖，过滤语法：`[groupId]:[artifactId]:[type]:[version]`，可以使用`*`通配符。 |
| ignoredUsedUndeclaredDependencies | String[] | 对于“使用但未声明”的列表忽略这些依赖，过滤语法：`[groupId]:[artifactId]:[type]:[version]`，可以使用`*`通配符。 |
| outputXML                         | boolean  | 输出缺失依赖的xml（使用但未声明）                            |
| skip                              | boolean  | 跳过插件的执行                                               |
| usedDependencies                  | String[] | 强制依赖被使用（覆盖由字节码层面分析造成的不完整结果），依赖格式：`groupId:artifactId` |
| Verbose                           | boolean  | 输出使用到的依赖                                             |

### 参考

[Apache Maven Dependency Plugin – dependency:analyze](https://maven.apache.org/plugins/maven-dependency-plugin/)

## maven-pmd-plugin

### 简介

是一个静态代码检测工具。它可以用来检查：

- 潜在的bug：空的try/catch/finally/switch语句
- 未使用的代码：未使用的局部变量、参数、私有方法等
- 可选的代码：String/StringBuffer的滥用
- 复杂的表达式：不必须的if语句、可以使用while循环完成的for循环
- 重复的代码：拷贝/粘贴代码意味着拷贝/粘贴bugs

### 默认规则集

[Using Rule Sets](https://maven.apache.org/plugins/maven-pmd-plugin/examples/usingRuleSets.html)

### 自定义规则集

参考：

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-pmd-plugin</artifactId>
    <dependencies>
        <dependency>
            <groupId>com.alibaba.p3c</groupId>
            <artifactId>p3c-pmd</artifactId>
            <version>1.3.0</version>
        </dependency>
    </dependencies>
    <configuration>
        <rulesets>
            <ruleset>rulesets/java/ali-concurrent.xml</ruleset>
            <ruleset>rulesets/java/ali-exception.xml</ruleset>
            <ruleset>rulesets/java/ali-flowcontrol.xml</ruleset>
            <ruleset>rulesets/java/ali-naming.xml</ruleset>
            <ruleset>rulesets/java/ali-oop.xml</ruleset>
            <ruleset>rulesets/java/ali-orm.xml</ruleset>
            <ruleset>rulesets/java/ali-other.xml</ruleset>
            <ruleset>rulesets/java/ali-set.xml</ruleset>
        </rulesets>
    </configuration>
</plugin>
```

### 参考

[添加PMD插件扫描潜在的bug](https://www.cnblogs.com/woshimrf/p/using-pmd.html)

## maven-surefire-plugin

### 配置

#### 跳过执行

```xml
<project>
    <properties>
        <!--跳过编译测试类-->
        <maven.test.skip>true</maven.test.skip>
        <!--编译测试类，但不执行-->
        <skipTests>true</skipTests>
    </properties>
</project>
```

#### 包含与排除

默认包含以下的模式：

- `**/Test*.java`
- `**/*Test.java`
- `**/*Tests.java`
- `**/*TestCase.java`

可以在配置中覆盖：

```xml
<project>
  <build>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-surefire-plugin</artifactId>
        <version>3.0.0-M6</version>
        <configuration>
          <includes>
            <include>Sample.java</include>
            <!--支持正则表达式-->
            <include>%regex[.*(Cat|Dog).*Test.*]</include>
            <!--2.19.1之后支持全限定类名-->
            <include>my.package.*, another.package.*</include>
            <!--可以在单个参数使用多种匹配格式-->
            <include>%regex[.*(Cat|Dog).*], !%regex[pkg.*Slow.*.class], pkg/**/*Fast*.java, Basic????, !Unstable*</include>
          </includes>
          <excludes>
            <!--支持ant风格的路径-->
            <exclude>**/TestCircle.java</exclude>
            <exclude>**/TestSquare.java</exclude>
            <!--可以在单个参数使用多种匹配格式-->
            <exclude>%regex[pkg.*Slow.*.class], Unstable*</exclude>
          </excludes>
        </configuration>
      </plugin>
    </plugins>
  </build>
</project>
```

正则表达式需要注意：

- 正则表达式匹配是通过`*.class`文件而不是`*.java`文件
- 正则表达式匹配包含斜杠（“ `/`”）路径，而不包含点（“ `.`”）的包名称
- 结尾的`.class`按照字面意思解释，而不应使用`\.class`

#### 失败后策略

主要由两个参数控制：

| 参数名                 | 默认值 | 用户属性                        | 描述                                                         |
| ---------------------- | ------ | ------------------------------- | ------------------------------------------------------------ |
| skipAfterFailureCount  | 0      | surefire.skipAfterFailureCount  | 在N个测试失败或错误后跳过余下的测试                          |
| rerunFailingTestsCount | 0      | surefire.rerunFailingTestsCount | 失败后重跑次数。如果一个测试重跑后通过，则被标记为flake，但是失败数会被记录。 |

分组执行测试用例：

执行失败后的策略：

失败重试：

并发执行

查看测试报告

### 运行

手动执行测试用例：

参考

[Maven Surefire Plugin](https://maven.apache.org/surefire/maven-surefire-plugin/index.html)

# Maven常用插件配置

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
| outputXML                         | boolean  |                                                              |
| scriptableFlag                    | String   |                                                              |
| scriptableOutput                  | boolean  |                                                              |
| skip                              | boolean  | 跳过插件的执行                                               |
| usedDependencies                  | String[] | 强制依赖被使用，依赖格式：`groupId:artifactId`               |

### 参考

[Apache Maven Dependency Plugin – dependency:analyze](https://maven.apache.org/plugins/maven-dependency-plugin/)

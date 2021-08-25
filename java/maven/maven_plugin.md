# Maven常用插件配置

## Maven-Assembly-Plugin

### `assembly`目标

2.x版本中的`assembly`目标在3.x版本中已删除，新版旧版都可以使用`single`目标代替。

### `single`目标

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
- https://stackoverflow.com/questions/47310215/merging-meta-inf-services-files-with-maven-assembly-plugin

## Maven-Shade-Plugin

### `shade`目标

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


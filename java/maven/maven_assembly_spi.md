# Maven assembly插件与Java SPI机制冲突问题

### 现象

项目中要往HDFS写数据，但是执行的时候产生了下面的异常：

```
Exception in thread "main" java.io.IOException: No FileSystem for scheme: hdfs
    at org.apache.hadoop.fs.FileSystem.getFileSystemClass(FileSystem.java:2584)
    at org.apache.hadoop.fs.FileSystem.createFileSystem(FileSystem.java:2591)
    at org.apache.hadoop.fs.FileSystem.access$200(FileSystem.java:91)
    at org.apache.hadoop.fs.FileSystem$Cache.getInternal(FileSystem.java:2630)
    at org.apache.hadoop.fs.FileSystem$Cache.get(FileSystem.java:2612)
    at org.apache.hadoop.fs.FileSystem.get(FileSystem.java:370)
    ...
```

很奇怪的是如果用`mvn package`打包和lib包一起加载不会产生问题，只有当用`mvn assembly:assembly`打成一个独立的包才会有这个问题。

### 原因

查看出问题的那段代码，可以看出来最终在`FileSystem.loadFileSystems()`中使用了java的spi机制来动态加载`FileSystem`的具体实现类，当加载不到scheme为hdfs的实现类的时候会抛出异常，这就说明`META-INF/services/org.apache.hadoop.fs.FileSystem`文件没有指定正确的实现类。

那hdfs的具体实现类是哪个呢？经过查询是`org.apache.hadoop.hdfs.DistributedFileSystem`这个类，而这个类在`hadoop-hdfs`包里。同时在用assembly打包的时候观察到这样一段日志：

```
...
[INFO] META-INF/services/org.apache.hadoop.fs.FileSystem already added, skipping
```

也就是说`hadoop-hdfs`包里的这个文件被略过了，原因是`hadoop-common`包里也有FileSystem的实现类，而打包的时候`hadoop-common`包先被加载了。

### 解决

根据代码有两种解决方法：

1. 在传入的Configuration类中设置参数`fs.hdfs.impl`为`DistributedFileSystem`类
2. 使用`maven-shade-plugin`插件将spi文件内容合并到一起

方法2的pom.xml配置：

```xml
<plugin>
	<groupId>org.apache.maven.plugins</groupId>
	<artifactId>maven-shade-plugin</artifactId>
	<version>1.4</version>
	<executions>
		<execution>
			<phase>package</phase>
			<goals>
				<goal>shade</goal>
			</goals>
			<configuration>
				<transformers>
					<transformer
							implementation="org.apache.maven.plugins.shade.resource.AppendingTransformer">
						<resource>META-INF/services/org.apache.hadoop.fs.FileSystem</resource>
					</transformer>
				</transformers>
			</configuration>
		</execution>
	</executions>
</plugin>
```


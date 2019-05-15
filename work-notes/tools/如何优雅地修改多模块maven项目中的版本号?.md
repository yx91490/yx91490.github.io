不久前公司出了较为严(dan)格(teng)的jar包管理规范，我等劳苦大众一向贯彻惜码如金，能省则省的精神，上线时从不改版本号，这也导致了十分混乱的局面，尤其是当依赖快照版jar包时，依赖的jar包可以随意更新你却不知道，这就相当于在泥地上建高楼很危险。

但是当我们准备洗心革面发布正式版本的jar包时却发现，更改maven项目中pom.xml里的版本号是一个大坑，原因是：

1. 正式版不能重复发布，所以版本号每次上线都要更改
2. 当项目中包含几个子模块时，通常我们想让子模块的版本号跟父项目的版本号一致
3. 子模块也会相互依赖

这样我们改一次版本号要改很多地方，麻烦不说还容易出错。理想中我们改版本号时能不能做到只修改一处就能生效呢？

最容易解决的是问题3，maven有一个内置属性`${project.version}`表示的是项目的版本号，当一个子模块依赖其他子模块时我们可以这样写：

```xml
	<parent>
		<groupId>parent-groupId</groupId>
		<artifactId>parent-artifactId</artifactId>
		<version>1.0.0</version>
		<relativePath>..</relativePath>
	</parent>
	<artifactId>module-artifactId</artifactId>
	<dependency>
		<artifactId>other-module-artifactId</artifactId>
		<groupId>other-module-groupId</groupId>
		<version>${project.version}</version>
	</dependency>
```

子POM的`groupId`和`version`可以省略，这样只要保证子模块的版本号都一致就不会有问题了。

但是`<parent>`标签中的版本号还是要写，不然会报错，显然maven没有进化到这么智能的程度，或者可能会造成其他混乱而必须指定。而投机取巧地把`<parent>`标签中的版本号换成`${project.version}`也没有成功，因为必须先初始化`<parent>`标签才能知道`${project.version}`是多少。

但是maven除了内置属性之外还可以自定义属性，我们可以在父pom中这样写：

```xml
	<groupId>parent-groupId</groupId>
	<artifactId>parent-artifactId</artifactId>
	<version>${parent-version}</version>

	<properties>
		<parent-version>1.0.0</parent-version>
	</properties>
```
在子pom中这样写：

```xml
<parent>
	<groupId>parent-groupId</groupId>
	<artifactId>parent-artifactId</artifactId>
	<version>${parent-version}</version>
	<relativePath>..</relativePath>
</parent>
```
这样写达到了只修改一处的目的，但是在`mvn install`时会提示 `<parent>` 标签中的`version`不是一个常量，未来的版本可能不支持，而且各个子模块单独`mvn install`时可能会失败。

最终比较折中的解决方案是使用了maven的插件来解决，在父pom中这样写：

```xml
	<groupId>parent-groupId</groupId>
	<artifactId>parent-artifactId</artifactId>
	<version>1.0.0</version>
	<build>
	<plugins>
		<plugin>
			<groupId>org.codehaus.mojo</groupId>
			<artifactId>versions-maven-plugin</artifactId>
			<version>2.3</version>
			<configuration>
				<generateBackupPoms>false</generateBackupPoms>
			</configuration>
		</plugin>
	</plugins>
	</build>
```

只需要执行`mvn -N versions:update-child-modules`则会自动把子POM的`<parent>`标签中的`version`更新为和父POM一致。这样修改一处然后运行一下执行一下命令就可以达到统一修改版本号的目的了。
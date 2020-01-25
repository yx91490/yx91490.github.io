# 发布jar包到maven中央仓库教程

### pom.xml配置

在工程的pom.xml文件中，引入`oss-parent`：

```
<parent>
	<groupId>org.sonatype.oss</groupId>
	<artifactId>oss-parent</artifactId>
	<version>7</version>
</parent>
```

增加Licenses、SCM、Developers信息：

```
<licenses>
	<license>
		<name>The Apache Software License, Version 2.0</name>
		<url>http://www.apache.org/licenses/LICENSE-2.0.txt</url>
	</license>
</licenses>
<scm>
	<url>git@github.com:google/cli-maven-plugin.git</url>
	<connection>scm:git:git@github.com:google/cli-maven-plugin.git</connection>
</scm>
<developers>
	<developer>
		<name>google</name>
		<email>google@google.com</email>
	</developer>
</developers>
```

### 注册SonaType账号

https://issues.sonatype.org/secure/Signup!default.jspa

### 修改maven配置文件setting.xml

```
<servers>
    <server>
      <id>sonatype-nexus-snapshots</id>
      <username>Sonatype账号</username>
      <password>Sonatype密码</password>
    </server>
    <server>
      <id>sonatype-nexus-staging</id>
      <username>Sonatype账号</username>
      <password>Sonatype密码</password>
    </server>
  </servers>
```

### 创建Issue工单

https://issues.sonatype.org/secure/Dashboard.jspa

```
Project: Community Support - Open Source Project Repository Hosting
Issue Type: New Project

Summary: marathon-client
Group Id: io.github.google
Project URL: https://github.com/google/cli-maven-plugin
SCM url: https://github.com/google/cli-maven-plugin.git
```

### 确认域名归属

> create a public repo called [~~OSSRH-50621~~] to verify github account ownership.

### 配置gpg-key

```
# Passphase的参数需要记住
gpg --gen-key
```

```
gpg --list-keys
---------------------------------------------
pub   2048R/824B4D7A 2016-01-06
uid       [ultimate] google <google@google.com>
sub   2048R/7A10AD69 2016-01-06
```

```
# 上传公钥至密钥服务器
gpg --keyserver hkp://keyserver.ubuntu.com:11371 --send-keys 824B4D7A
# 验证是否成功
gpg --keyserver hkp://keyserver.ubuntu.com:11371 --revc-keys 824B4D7A
```

### 部署 jar 包

```
# 需要输入gpg的Passphase
mvn clean deploy -P sonatype-oss-release
```

### 仓库操作

1. 登录https://oss.sonatype.org
2. 点击左侧的`Staging Repositories`
3. 搜索上传的jar包
4. 勾选文件点击close按钮
5. 状态变成closed后，勾选文件点击Release按钮

### 参考

- [发布jar包到maven中央仓库](https://monkeywie.github.io/2018/07/23/publish-jar-to-maven/)
- [request for hosting cli-maven-plugin project](https://issues.sonatype.org/browse/OSSRH-50621)
- [如何发布jar包到maven中央仓库](https://www.cnblogs.com/softidea/p/6743108.ht)
# 发布Jar包到Maven中央仓库指南

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
		<name>user123</name>
		<email>user123@gmail.com</email>
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

生成key（需要填写用户名、邮箱等信息，其中填写的Passphase需要记住）：

```
 $ gpg --gen-key
```

列出公钥信息（其中`824B4D7A`为公钥）：

```
$ gpg --list-keys
---------------------------------------------
pub   2048R/824B4D7A 2016-01-06
uid       [ultimate] user123 <user123@gmail.com>
sub   2048R/7A10AD69 2016-01-06
```

或者这种形式（其中`F88223C1F1461D8A5D6296A55EE3D769D3501C8D`为公钥）：

```
$ gpg --list-keys
----------------------------
pub   rsa2048 2020-01-31 [SC] [expires: 2022-01-30]
      F88223C1F1461D8A5D6296A55EE3D769D3501C8D
uid           [ultimate] user123 <user123@gmail.com>
sub   rsa2048 2020-01-31 [E] [expires: 2022-01-30]
```

上传公钥至密钥服务器：

```
$ gpg --keyserver hkp://pgp.mit.edu --send-keys 824B4D7A
```

验证是否成功：

```
$ gpg --keyserver hkp://pgp.mit.edu --recv-keys 824B4D7A
```

验证成功：

```
gpg: key 3D869D3: "user123 <user123@gmail.com>" not changed
gpg: Total number processed: 1
gpg:              unchanged: 1
```

### 部署 jar 包

```
# 需要输入gpg的Passphase
mvn clean deploy -P sonatype-oss-release
```

如果提示`gpg: 签名时失败： Inappropriate ioctl for device`，请参考https://www.unclewang.info/tips/410/进行操作。

### 仓库操作

1. 登录https://oss.sonatype.org
2. 点击左侧的`Staging Repositories`
3. 搜索上传的jar包
4. 勾选文件点击close按钮
5. 状态变成closed后，勾选文件点击Release按钮

### 参考

- [OSSRH Guide](https://central.sonatype.org/pages/ossrh-guide.html)
- [发布开源项目到Maven Central](https://colobu.com/2014/09/30/deploy-a-project-to-maven-central)
- [发布jar包到maven中央仓库](https://monkeywie.github.io/2018/07/23/publish-jar-to-maven/)
- [request for hosting cli-maven-plugin project](https://issues.sonatype.org/browse/OSSRH-50621)

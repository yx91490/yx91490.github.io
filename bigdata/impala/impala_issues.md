# Impala问题记录

## python2证书问题

运行Impala的脚本`infra/python/deps/pip_download.py`下载pip包的时候，本来想配置一个镜像来加速下载，但是配置完`export PYPI_MIRROR=https://pypi.tuna.tsinghua.edu.cn`之后发现python2访问镜像地址会报错：

```
python2 -c 'from urllib2 import urlopen; urlopen("https://mirrors.tuna.tsinghua.edu.cn/help/pypi/")'
Traceback (most recent call last):
  File "<string>", line 1, in <module>
  File "/usr/lib64/python2.7/urllib2.py", line 154, in urlopen
    return opener.open(url, data, timeout)
  File "/usr/lib64/python2.7/urllib2.py", line 431, in open
    response = self._open(req, data)
  File "/usr/lib64/python2.7/urllib2.py", line 449, in _open
    '_open', req)
  File "/usr/lib64/python2.7/urllib2.py", line 409, in _call_chain
    result = func(*args)
  File "/usr/lib64/python2.7/urllib2.py", line 1258, in https_open
    context=self._context, check_hostname=self._check_hostname)
  File "/usr/lib64/python2.7/urllib2.py", line 1214, in do_open
    raise URLError(err)
urllib2.URLError: <urlopen error [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed (_ssl.c:618)>
```

浏览器访问该地址是没有证书相关问题的，换成http协议会自动跳转到https协议的地址。一开始我以为服务器证书有问题，改代码肯定可以，但是有没有不改代码能生效的方法？于是请教了新来的大牛，大牛一顿操作最终帮我解决了问题。

大佬先查看了下环境：

```
$ cat /etc/redhat-release
CentOS Linux release 7.9.2009 (Core)
```

然后用镜像源安装了下requests：

```shell
PYPI_MIRROR=https://pypi.python.org pip2 install --user requests
```

又升级了下：

```shell
PYPI_MIRROR=https://pypi.python.org pip2 install --user --upgrade requests
```

发现没有问题之后又尝试运行了下脚本：

```shell
python2 pip_download.py
```

然后进python交互终端执行：

```
from urllib2 import urlopen; urlopen("https://mirrors.tuna.tsinghua.edu.cn/help/pypi/")
```

发现还是报错。

然后试探性请求了下镜像源：

```
$ curl -v > /dev/null  https://pypi.tuna.tsinghua.edu.cn/
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0* About to connect() to pypi.tuna.tsinghua.edu.cn port 443 (#0)
*   Trying 101.6.15.130...
* Connected to pypi.tuna.tsinghua.edu.cn (101.6.15.130) port 443 (#0)
* Initializing NSS with certpath: sql:/etc/pki/nssdb
*   CAfile: /etc/pki/tls/certs/ca-bundle.crt
  CApath: none
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0* SSL connection using TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384
* Server certificate:
* 	subject: CN=tuna.tsinghua.edu.cn
* 	start date: 9月 26 09:10:36 2021 GMT
* 	expire date: 12月 25 09:10:35 2021 GMT
* 	common name: tuna.tsinghua.edu.cn
* 	issuer: CN=R3,O=Let's Encrypt,C=US
> GET / HTTP/1.1
> User-Agent: curl/7.29.0
> Host: pypi.tuna.tsinghua.edu.cn
> Accept: */*
> 
< HTTP/1.1 302 Moved Temporarily
< Server: nginx/1.18.0
< Date: Thu, 28 Oct 2021 11:17:48 GMT
< Content-Type: text/html
< Content-Length: 145
< Connection: keep-alive
< Location: https://mirrors.tuna.tsinghua.edu.cn/help/pypi
< 
{ [data not shown]
100   145  100   145    0     0    730      0 --:--:-- --:--:-- --:--:--   728
* Connection #0 to host pypi.tuna.tsinghua.edu.cn left intact
```

然后继续请求跳转之后的地址：

```
curl -v > /dev/null https://mirrors.tuna.tsinghua.edu.cn/help/pypi
...
curl -v > /dev/null https://mirrors.tuna.tsinghua.edu.cn/help/pypi/
...
```

查看证书的rpm包：

```
$ rpm -qa | fgrep cert
ca-certificates-2020.2.41-70.0.el7_8.noarch
```

列出安装包的文件：

```
# rpm -ql ca-certificates
/etc/pki/ca-trust
...
/etc/pki/tls
/etc/pki/tls/cert.pem
/etc/pki/tls/certs
/etc/pki/tls/certs/ca-bundle.crt
/etc/pki/tls/certs/ca-bundle.trust.crt
/etc/ssl
/etc/ssl/certs
...
```

使用python3请求相应地址：

```
// TODO
```

查看证书版本信息：

```
$ rpm -ql ca-certificates -i
Name        : ca-certificates
Version     : 2020.2.41
Release     : 70.0.el7_8
Architecture: noarch
Install Date: 2020年11月13日 星期五 09时54分08秒
Group       : System Environment/Base
Size        : 946094
License     : Public Domain
Signature   : RSA/SHA256, 2020年06月24日 星期三 01时38分15秒, Key ID 24c6a8a7f4a80eb5
Source RPM  : ca-certificates-2020.2.41-70.0.el7_8.src.rpm
Build Date  : 2020年06月23日 星期二 23时39分22秒
Build Host  : x86-02.bsys.centos.org
Relocations : (not relocatable)
Packager    : CentOS BuildSystem <http://bugs.centos.org>
Vendor      : CentOS
URL         : http://www.mozilla.org/
Summary     : The Mozilla CA root certificate bundle
Description :
This package contains the set of CA certificates chosen by the
Mozilla Foundation for use with the Internet PKI.
...
```

查看证书目录：

```
cd /etc/pki/ca-trust
ll
cat README
```

尝试更新证书：

```
update-ca-trust
```

使用strace查看python2使用的证书：

```
$ PYPI_MIRROR=https://pypi.tuna.tsinghua.edu.cn strace -f -etrace=open python2 ./pip_download.py

...
[pid  2846] open("/dev/urandom", O_RDONLY|O_NOCTTY|O_NONBLOCK) = 4
[pid  2846] open("/etc/pki/tls/cert.pem", O_RDONLY) = 4
[pid  2849] open("/etc/pki/tls/cert.pem", O_RDONLY) = 4
[pid  2847] open("/etc/pki/tls/cert.pem", O_RDONLY) = 6
[pid  2849] open("/etc/nsswitch.conf", O_RDONLY|O_CLOEXEC) = 4
[pid  2849] open("/etc/host.conf", O_RDONLY|O_CLOEXEC) = 4
[pid  2849] open("/etc/resolv.conf", O_RDONLY|O_CLOEXEC) = 4
[pid  2849] open("tls/x86_64/libnss_files.so.2", O_RDONLY|O_CLOEXEC) = -1 ENOENT (No such file or directory)
[pid  2849] open("tls/libnss_files.so.2", O_RDONLY|O_CLOEXEC) = -1 ENOENT (No such file or directory)
[pid  2849] open("x86_64/libnss_files.so.2", O_RDONLY|O_CLOEXEC) = -1 ENOENT (No such file or directory)
[pid  2849] open("libnss_files.so.2", O_RDONLY|O_CLOEXEC) = -1 ENOENT (No such file or directory)
[pid  2849] open("/opt/jdk/java/jre/lib/amd64/libnss_files.so.2", O_RDONLY|O_CLOEXEC) = -1 ENOENT (No such file or directory)
[pid  2849] open("/opt/jdk/java/jre/lib/amd64/server/libnss_files.so.2", O_RDONLY|O_CLOEXEC) = -1 ENOENT (No such file or directory)
[pid  2849] open("/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 4
[pid  2849] open("/lib64/libnss_files.so.2", O_RDONLY|O_CLOEXEC) = 4
[pid  2849] open("/etc/hosts", O_RDONLY|O_CLOEXEC) = 4
[pid  2849] open("tls/x86_64/libnss_dns.so.2", O_RDONLY|O_CLOEXEC) = -1 ENOENT (No such file or directory)
[pid  2849] open("tls/libnss_dns.so.2", O_RDONLY|O_CLOEXEC) = -1 ENOENT (No such file or directory)
[pid  2849] open("x86_64/libnss_dns.so.2", O_RDONLY|O_CLOEXEC) = -1 ENOENT (No such file or directory)
[pid  2849] open("libnss_dns.so.2", O_RDONLY|O_CLOEXEC) = -1 ENOENT (No such file or directory)
[pid  2849] open("/opt/jdk/java/jre/lib/amd64/libnss_dns.so.2", O_RDONLY|O_CLOEXEC) = -1 ENOENT (No such file or directory)
[pid  2849] open("/opt/jdk/java/jre/lib/amd64/server/libnss_dns.so.2", O_RDONLY|O_CLOEXEC) = -1 ENOENT (No such file or directory)
[pid  2849] open("/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 4
[pid  2849] open("/lib64/libnss_dns.so.2", O_RDONLY|O_CLOEXEC) = 4
[pid  2846] open("/etc/hosts", O_RDONLY|O_CLOEXEC) = 7
[pid  2848] open("/etc/pki/tls/cert.pem", O_RDONLY) = 6
[pid  2847] open("/etc/hosts", O_RDONLY|O_CLOEXEC) = 6
[pid  2848] open("/etc/hosts", O_RDONLY|O_CLOEXEC) = 3
[pid  2847] open("/etc/gai.conf", O_RDONLY|O_CLOEXEC) = -1 ENOENT (No such file or directory)
[Errno socket error] [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed (_ssl.c:618)
Sleeping for 18 seconds before retrying
[Errno socket error] [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed (_ssl.c:618)
Sleeping for 19 seconds before retrying
[Errno socket error] [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed (_ssl.c:618)
Sleeping for 17 seconds before retrying
[Errno socket error] [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed (_ssl.c:618)
Sleeping for 13 seconds before retrying
Getting package info from /simple/boto3/
[Errno 2] No such file or directory: '/simple/boto3/'
Sleeping for 155 seconds before retrying
Getting package info from https://pypi.tuna.tsinghua.edu.cn/simple/boto3/
[pid  2847] open("/etc/pki/tls/cert.pem", O_RDONLY) = 8
[pid  2847] open("/etc/hosts", O_RDONLY|O_CLOEXEC) = 8
[Errno socket error] [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed (_ssl.c:618)
Sleeping for 18 seconds before retrying
Getting package info from /simple/botocore/
[Errno 2] No such file or directory: '/simple/botocore/'
Sleeping for 108 seconds before retrying
Getting package info from https://pypi.tuna.tsinghua.edu.cn/simple/botocore/
[pid  2849] open("/etc/pki/tls/cert.pem", O_RDONLY) = 6
[pid  2849] open("/etc/hosts", O_RDONLY|O_CLOEXEC) = 6
Getting package info from https://pypi.tuna.tsinghua.edu.cn/simple/simplejson/
[pid  2846] open("/etc/pki/tls/cert.pem", O_RDONLY) = 9
[pid  2846] open("/etc/hosts", O_RDONLY|O_CLOEXEC) = 9
ccd cGetting package info from https://pypi.tuna.tsinghua.edu.cn/simple/allpairs/
[pid  2848] open("/etc/pki/tls/cert.pem", O_RDONLY) = 10
[pid  2848] open("/etc/hosts", O_RDONLY|O_CLOEXEC) = 10
c[Errno socket error] [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed (_ssl.c:618)
Sleeping for 35 seconds before retrying
[Errno socket error] [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed (_ssl.c:618)
Sleeping for 36 seconds before retrying
f[Errno socket error] [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed (_ssl.c:618)
Sleeping for 5 seconds before retrying
```

进入目录：

```
cd /etc/pki/tls
cat cert.pem
```

在基本确定是证书的问题之后，大佬在自己的电脑上继续查找资料和试验，过了以后告诉我，这是python2的bug，系统的证书库里有一个旧的证书 DST Root CA X3，过期时间  Sep 30 14:01:15 2021 GMT，当这个证书存在的时候，python2就会失败。解决办法就是将此证书加入黑名单：

```
$ cat /etc/pki/ca-trust/source/blacklist/Old-DST-Root-CA-X3.pem
-----BEGIN CERTIFICATE-----
MIIDSjCCAjKgAwIBAgIQRK+wgNajJ7qJMDmGLvhAazANBgkqhkiG9w0BAQUFADA/
MSQwIgYDVQQKExtEaWdpdGFsIFNpZ25hdHVyZSBUcnVzdCBDby4xFzAVBgNVBAMT
DkRTVCBSb290IENBIFgzMB4XDTAwMDkzMDIxMTIxOVoXDTIxMDkzMDE0MDExNVow
PzEkMCIGA1UEChMbRGlnaXRhbCBTaWduYXR1cmUgVHJ1c3QgQ28uMRcwFQYDVQQD
Ew5EU1QgUm9vdCBDQSBYMzCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEB
AN+v6ZdQCINXtMxiZfaQguzH0yxrMMpb7NnDfcdAwRgUi+DoM3ZJKuM/IUmTrE4O
rz5Iy2Xu/NMhD2XSKtkyj4zl93ewEnu1lcCJo6m67XMuegwGMoOifooUMM0RoOEq
OLl5CjH9UL2AZd+3UWODyOKIYepLYYHsUmu5ouJLGiifSKOeDNoJjj4XLh7dIN9b
xiqKqy69cK3FCxolkHRyxXtqqzTWMIn/5WgTe1QLyNau7Fqckh49ZLOMxt+/yUFw
7BZy1SbsOFU5Q9D8/RhcQPGX69Wam40dutolucbY38EVAjqr2m7xPi71XAicPNaD
aeQQmxkqtilX4+U9m5/wAl0CAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAOBgNV
HQ8BAf8EBAMCAQYwHQYDVR0OBBYEFMSnsaR7LHH62+FLkHX/xBVghYkQMA0GCSqG
SIb3DQEBBQUAA4IBAQCjGiybFwBcqR7uKGY3Or+Dxz9LwwmglSBd49lZRNI+DT69
ikugdB/OEIKcdBodfpga3csTS7MgROSR6cz8faXbauX+5v3gTt23ADq1cEmv8uXr
AvHRAosZy5Q6XkjEGB5YGV8eAlrwDPGxrancWYaLbumR9YbK+rlmM6pZW87ipxZz
R8srzJmwN0jP41ZL9c8PDHIyh8bwRLtTcm1D9SZImlJnt1ir/md2cXjbDaJWFBM5
JDGFoqgCWjBH4d1QB7wCCZAA62RjYJsWvIjJEubSfZGL+T0yjWW06XyxV3bqxbYo
Ob8VZRzI9neWagqNdwvYkQsEjgfbKbYK7p2CNTUQ
-----END CERTIFICATE-----
```

然后更新证书：

```
update-ca-trust
```

验证没有问题：

```
python2 -c 'from urllib2 import urlopen; urlopen("https://mirrors.tuna.tsinghua.edu.cn/help/pypi/")'
```

参考：

[Old Let’s Encrypt Root Certificate Expiration and OpenSSL 1.0.2](https://www.openssl.org/blog/blog/2021/09/13/LetsEncryptRootCertExpire/)

## 一个JDBC的loginTimeout超时问题

线上的Impala遇到一个Socket超时问题，报错堆栈如下：

```
org.apache.hive.jdbc.HiveConnection []: Error opening session
org.apache.thrift.transport.TTransportException: java.net.SocketTimeoutException: Read timed out
        at org.apache.thrift.transport.TIOStreamTransport.read(TIOStreamTransport.java:129)
        at org.apache.thrift.transport.TTransport.readAll(TTransport.java:86)
        at org.apache.thrift.protocol.TBinaryProtocol.readAll(TBinaryProtocol.java:429)
        at org.apache.thrift.protocol.TBinaryProtocol.readI32(TBinaryProtocol.java:318)
        at org.apache.thrift.protocol.TBinaryProtocol.readMessageBegin(TBinaryProtocol.java:219)
        at org.apache.thrift.TServiceClient.receiveBase(TServiceClient.java:77)
        at org.apache.hive.service.cli.thrift.TCLIService$Client.recv_OpenSession(TCLIService.java:156)
        at org.apache.hive.service.cli.thrift.TCLIService$Client.OpenSession(TCLIService.java:143)
        at org.apache.hive.jdbc.HiveConnection.openSession(HiveConnection.java:464)
        at org.apache.hive.jdbc.HiveConnection.<init>(HiveConnection.java:181)
        at org.apache.hive.jdbc.HiveDriver.connect(HiveDriver.java:105)
        at java.sql.DriverManager.getConnection(DriverManager.java:664)
        at java.sql.DriverManager.getConnection(DriverManager.java:270)
Caused by: java.net.SocketTimeoutException: Read timed out
        at java.net.SocketInputStream.socketRead0(Native Method)
        at java.net.SocketInputStream.socketRead(SocketInputStream.java:116)
```

看了下日志，大约30s就超时了，通常来说Impala的查询的执行时间有可能是分钟级别的，这么短的超时时间明显不对劲，咨询了下大佬Java的Socket超时有可能提前结束吗，大佬的答案是否定的。因为我们用的是Hive JDBC Driver，看了一下Socket超时时间是在thrift的TSocket构造函数里设置的：

https://github.com/apache/hive/blob/rel/release-3.1.3/common/src/java/org/apache/hadoop/hive/common/auth/HiveAuthUtils.java#L45

而 loginTimeout 的取值就有点二了，是从DriverManager的静态方法获取的：

https://github.com/apache/hive/blob/rel/release-3.1.3/jdbc/src/java/org/apache/hive/jdbc/HiveConnection.java#L806

这也就意味着 loginTimeout 的设置没法做到很好的隔离性。用 arthas 看了一下DriverManager.logintimeout的值，还真的是 30s：

```
[arthas@21070]$ getstatic java.sql.DriverManager loginTimeout
field: loginTimeout
@Integer[30]
Affect(row-cnt:1) cost in 19ms
```

而这30s的始作俑者猜一下也大概是跟JDBC有关的其他Driver或者连接池，最终发现是连接MySQL用的HikariCP连接池里做的手脚：

https://github.com/brettwooldridge/HikariCP/blob/HikariCP-4.0.3/src/main/java/com/zaxxer/hikari/pool/PoolBase.java#L114

 https://github.com/brettwooldridge/HikariCP/blob/HikariCP-4.0.3/src/main/java/com/zaxxer/hikari/pool/PoolBase.java#L343

  https://github.com/brettwooldridge/HikariCP/blob/HikariCP-4.0.3/src/main/java/com/zaxxer/hikari/pool/PoolBase.java#L624

   https://github.com/brettwooldridge/HikariCP/blob/HikariCP-4.0.3/src/main/java/com/zaxxer/hikari/util/DriverDataSource.java#L154

这可能算是 JDBC 设计上的一个缺陷吧，全局的静态变量就没法做到线程隔离了，至于 HikariCP 也遵循这个规则的原因就不得而知了。

Hive 的 master 分支其实已经修复了这个问题，修复的方式是由一个新增的 sessionVar 变量来控制，但是Hive JDBC迟迟没有发布正式的版本，最后的修复方法只能是backports了[HIVE-12371](https://github.com/apache/hive/pull/1611)的 patch了。

### 参考

[HIVE-12371 Adding a timeout connection parameter for JDBC](https://issues.apache.org/jira/browse/HIVE-12371)

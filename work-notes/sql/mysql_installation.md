### 在线安装

CentOS 6：

```
$ sudo yum -y install mysql mysql-server mysql-devel
```

CentOS 7：

1、配置YUM源：

```
$ sudo rpm -ivh http://dev.mysql.com/get/mysql-community-release-el7-5.noarch.rpm
```

2、执行安装命令：

```
$ sudo yum -y install mysql-community-server
```

### 离线安装

下载rpm包，CentOS6：

```
$ wget https://repo.mysql.com/yum/mysql-5.6-community/el/6/x86_64/mysql-community-server-5.6.44-2.el6.x86_64.rpm
```

CentOS7：

```
$ wget https://repo.mysql.com/yum/mysql-5.6-community/el/7/x86_64/mysql-community-server-5.6.44-2.el7.x86_64.rpm
```

安装：

```
$ sudo rpm -ivh mysql-community-server.rpm
```

### 配置运行

启动服务：

```
$ sudo service mysqld start                       #centos6
$ sudo systemctl start mysqld.service  #centos7
```

修改超级用户密码：

```
$ mysql -uroot -p
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'MyNewPassword';
```


>  MySQL Server初始化过程会创建超级账户`'root'@'localhost'`，此账户的密码存储在错误日志文件中，查看方式：`$ sudo grep 'temporary password' /var/log/mysqld.log`
>
>  注意：别忘了执行`mysql_secure_installation`命令以提高MySQL5.6安全性，命令包括了设置root密码，移除匿名用户，禁止root远程登录，移除test库等操作。

### 参考

[CentOS-7系统下安装MySQL5.6](https://www.cnblogs.com/joah-q/p/7774274.html)

[A Quick Guide to Using the MySQL Yum Repository](https://dev.mysql.com/doc/mysql-yum-repo-quick-guide/en/)
# CentOS安装MySQL官方版

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

### 配置运行

启动服务：

```
$ sudo service mysqld start            # centos6
$ sudo systemctl start mysqld.service  # centos7
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
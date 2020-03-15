# Beeline命令行

### 执行参数

```
-u <database url>               指定JDBC URL
-r                              reconnect to last saved connect url (in conjunction with !save)
-n <username>                   连接使用的用户名
-p <password>                   连接使用的密码
-d <driver class>               使用的驱动类
-i <init file>                  初始化脚本
-e <query>                      要执行的查询语句
-f <exec file>                  要执行的脚本文件
-w (or) --password-file <password file>  存储密码的文件
--hiveconf property=value       设置属性值
--hivevar name=value            hive变量名和变量值
指定在session级别Hive命令和查询可以使用的变量
--property-file=<property-file> 用来读取连接属性（url，驱动类，用户，密码）的文件
--color=[true/false]            控制是否展示彩色
```

### 示例

1. 使用简单身份认证连接到HiveServer2：

    ```
    beeline -u jdbc:hive2://localhost:10000 username password
    ```

    或者使用`-n`指定用户名，使用`-p`指定密码：

    ```
    beeline -n username -p password -u jdbc:hive2://hs2.local:10012
    ```

2. 使用Kerberos身份认证连接到HiveServer2：

    ```
    beeline -u "jdbc:hive2://hs2.local:10013/default;principal=hive/localhost@mydomain.com
    ```

3. 使用SSL连接到HiveServer2：

    ```
    jdbc:hive2://localhost:10000/default;ssl=true;sslTrustStore=/usr/local/truststore;trustStorePassword=mytruststorepassword
    ```

4. 使用LDAP连接：

    ```
    beeline -u jdbc:hive2://hs2.local:10013/default <ldap-username> <ldap-password>
    ```




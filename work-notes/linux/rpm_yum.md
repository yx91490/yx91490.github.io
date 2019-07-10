### RPM命令

#### 安装

RPM 包的默认安装路径是可以通过命令查询的。

```
$ sudo rpm -ivh 包路径 [包2路径]...
```

此命令中各选项参数的含义为：

- -i（install）：安装;
- -v（verbose）：显示更详细的信息;
- -h（hash）：显示安装进度;

其他选项：

- -nodeps：不检测依赖性安装，所以不建议这样做。
- -replacefiles：替换文件安装。如果要安装软件包，但是包中的部分文件已经存在，那么在正常安装时会报"某个文件已经存在"的错误，从而导致软件无法安装。使用这个选项可以忽略这个报错而覆盖安装。
- -replacepkgs：替换软件包安装。如果软件包已经安装，那么此选项可以把软件包重复安装一遍。
- -force：强制安装。不管是否已经安装，都重新安装。也就是 -replacefiles 和 -replacepkgs 的综合。
- -test：测试安装。不会实际安装，只是检测一下依赖性。
- -prefix：指定安装路径。为安装软件指定安装路径，而不使用默认安装路径。

#### 卸载

```
$ sudo rpm -e 包名
```

支持使用“-nocteps”选项，即可以不检测依赖性直接卸载，但此方式不推荐大家使用

#### 查询

| 项                         | 已安装             | 未安装          |
| -------------------------- | ------------------ | --------------- |
| 查询软件包是否安装         | rpm -q 包名        | 相同            |
| 查询系统中所有安装的软件包 | rpm -qa            | 相同            |
| 查询软件包的详细信息       | rpm -qi 包名       | rpm -qip 包路径 |
| 查询软件包的文件列表       | rpm -ql 包名       | rpm -qlp 包路径 |
| 查询系统文件属于哪个RPM包  | rpm -qf 系统文件名 | 略              |
| 查询软件包的依赖关系       | rpm -qR 包名       | rpm -qRp 包路径 |


### YUM命令

| 操作                     | 命令                         |
| ------------------------ | ---------------------------- |
| 更新包列表               | yum check-update             |
| 更新已安装的包           | sudo yum update              |
| 搜索某个包               | yum search search_string     |
| 查看某个软件包的信息     | yum info package             |
| 在线安装软件包           | sudo yum install package     |
| 离线安装软件包           | sudo yum install package.rpm |
| 删除一个或多个已安装的包 | sudo yum remove package      |

### 参考

[Linux 包管理基础：apt、yum、dnf 和 pkg](https://linux.cn/article-8782-1.html?pr)

[27 个 Linux 下软件包管理工具 DNF 命令例子](https://linux.cn/article-5718-1.html?pr)










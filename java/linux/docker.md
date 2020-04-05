# Docker学习笔记

本文档基于`18.09.2`版本的docker。

## Docker命令行

### 镜像管理

#### docker pull

从镜像仓库中拉取或者更新指定镜像：

```
docker pull [OPTIONS] NAME[:TAG|@DIGEST]
```

如果速度较慢，可以配置镜像库：

编辑文件`/etc/docker/daemon.json`：

```json
{"registry-mirrors":["https://registry.docker-cn.com"]}
```

之后重新启动服务：

```shell
sudo systemctl daemon-reload
sudo systemctl restart docker
```

#### docker images

列出本地镜像：

```
docker images [OPTIONS] [REPOSITORY[:TAG]]
```

#### docker rimi

删除本地一个或多少镜像：

```
docker rmi [OPTIONS] IMAGE [IMAGE...]
```

#### docker tag

给本地镜像打上一个标签：

```
docker tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]
```

#### docker build

使用 Dockerfile 创建镜像：

```
docker build [OPTIONS] PATH | URL | -
```

#### docker history

查看指定镜像的创建历史：

```
docker history [OPTIONS] IMAGE
```

#### docker export

将**容器**导出为tar归档文件：

```
docker export [OPTIONS] CONTAINER
OPTIONS：
    -o 写入文件，而不是标准输出
```

#### docker import

将`docker export`导出的tar文件导入为镜像：

```
docker import [OPTIONS] file|URL|- [REPOSITORY[:TAG]]
```

#### docker save

将指定**镜像**保存成 tar 归档文件：

```
docker save [OPTIONS] IMAGE [IMAGE...]
Options：
    -o 写入文件，而不是标准输出
```

#### docker load

导入使用 `docker save` 命令导出的镜像：

```
docker load [OPTIONS]
Options:
    -i 从归档文件读入，而不是标准输入
```

### 容器管理

#### docker run

创建一个新的容器并运行一个命令：

```
docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
```

#### docker exec

在运行的容器中执行命令：

```
docker exec [OPTIONS] CONTAINER COMMAND [ARG...]
Options:
  -d, --detach               在后台运行命令
  -i, --interactive          以交互模式运行容器
  -t, --tty                  分配一个伪终端
```

#### docker ps

列出容器：

```
docker ps [OPTIONS]
    -a :显示所有的容器，包括未运行的。
```

#### docker top

查看容器中运行的进程信息，支持 ps 命令参数：

```
docker top [OPTIONS] CONTAINER [ps OPTIONS]
```

#### docker logs

获取容器的日志：

```
docker logs [OPTIONS] CONTAINER
Options:
  -f, --follow         跟踪日志输出
      --since string   显示从某时间戳之后的日志 (例如 2013-01-02T13:23:37) 或者相对时间 (例如 42m 从42分钟前开始)
      --tail string    Number of lines to show from the end of the logs (default "all")
  -t, --timestamps     显示时间戳
      --until string   显示到某时间戳之前的日志 (例如 2013-01-02T13:23:37) 或者相对时间 (例如  42m 到42分钟前截止)
```

#### docker start/stop/restart

**docker start** :启动一个或多个已经被停止的容器

**docker stop** :停止一个运行中的容器

**docker restart** :重启容器

```
docker start   [OPTIONS] CONTAINER [CONTAINER...]
docker stop    [OPTIONS] CONTAINER [CONTAINER...]
docker restart [OPTIONS] CONTAINER [CONTAINER...]
```

#### docker kill

杀掉一个运行中的容器：

```
docker kill [OPTIONS] CONTAINER [CONTAINER...]
```

#### docker rm

删除一个或多个容器：

```
docker rm [OPTIONS] CONTAINER [CONTAINER...]
```

### 容器rootfs命令

#### docker commit

从容器创建一个新的镜像：

```
docker commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]]
```

#### docker cp

在容器和本地文件系统之间拷贝文件和文件夹：

```
docker cp [OPTIONS] CONTAINER:SRC_PATH DEST_PATH|-
docker cp [OPTIONS] SRC_PATH|- CONTAINER:DEST_PATH
```

#### docker diff

检查容器里文件结构的更改：

```
docker diff [OPTIONS] CONTAINER
```

### 参考

- [Docker 教程](https://www.runoob.com/docker/docker-tutorial.html)

## Dockerfile配置

### FROM

指定从哪个基础镜像开始构建：

```
FROM [--platform=<platform>] <image>[:<tag>] [AS <name>]
```

### ENV

设置环境变量：

```
ENV <key>=<value> <key>=<value> <key>=<value> ...
```

### COPY

向容器中拷贝文件和文件夹：

```
COPY [--chown=<user>:<group>] <src>... <dest>
```

\<dest>是绝对路径，或者相对`WORKDIR`的相对路径。

### RUN

在build阶段执行，在新的layer上执行命令：

```
RUN <command>
```

### CMD

为容器指定默认启动命令：

```
CMD ["executable","param1","param2"]
```

### ENTRYPOINT

配置容器为可执行的：

```
ENTRYPOINT ["executable", "param1", "param2"]
```

### VOLUME

创建挂载点：

```
VOLUME ["/data"]
```

### 设置时区

```
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
# 或者:
# RUN timedatectl set-timezone Asia/Shanghai
```

### 中文乱码

```
RUN localedef -c -f UTF-8 -i zh_CN zh_CN.utf8
ENV LANG zh_CN.UTF-8
```

### 参考

- [Dockerfile reference](https://docs.docker.com/engine/reference/builder/)
- [Copy directory to other directory at Docker using ADD command](https://stackoverflow.com/questions/26504846/copy-directory-to-other-directory-at-docker-using-add-command)
- [System time (简体中文)](https://wiki.archlinux.org/index.php/System_time_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)#%E6%97%B6%E5%8C%BA)

## Docker-Compose配置

//TODO

## 一些tricky技巧

1.如果配置的网络模式是默认的bridge模式，通常会选择暴露若干个服务的端口，但是容器创建以后有时想另外暴露几个端口，如何在不删除容器的情况下更改暴露的端口？

可以在停止docker服务后修改`/var/lib/container/<containerId>/hostconfig.json`，以及`/var/lib/container/<containerId>/config.v2.json`这两个文件。

2.我们知道对容器中的hosts文件修改重启之后会失效，如何更改hosts使之不失效？

停止docker服务后修改`/var/lib/container/<containerId>/hosts`文件。

3.容器中的dubbo服务如何暴露容器而非宿主的ip？

指定配置参数：`dubbo.protocol.host`为容器的ip。

### 参考

- [修改运行中的docker容器的端口映射](https://blog.csdn.net/londa/article/details/92064142)
- [修改docker容器端口映射的方法](https://blog.csdn.net/wesleyflagon/article/details/78961990)
- [容器跨区双向调用的域名注册方案实现](https://www.jianshu.com/p/69fb93c09817)
- [Dubbo跨区访问注册IP异常的解决方案](https://www.jianshu.com/p/da0fda84953f)
- [Docker部署Dubbo跨主机IP访问解决方案](https://blog.csdn.net/leecho571/article/details/81199067)
- [Where is /var/lib/docker on Mac/OS X](Where is /var/lib/docker on Mac/OS X)

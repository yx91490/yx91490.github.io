# Debian镜像站点的目录结构

### 目录结构

Debian软件包位于`Debian镜像站点`的目录树中，可通过FTP或HTTP访问它们。下列目录存在于任何Debian镜像站点的/debian/目录下：

`/dists/`:

本目录包含“发行版”（distributions），此处是获得Debian发布版本（releases）和已发布版本（pre-releases）的软件包的正规途径（/etc/apt/sources.list的源即指向此目录下的文件夹）。有些旧软件包及Contens-*.gzPackages.gz 文件仍在其中。

`/pool/`:

所有Debian发布版及已发布版的软件包的新的物理地址。可以找到.deb包。

`/tools/`:

一些DOS下的小工具，用于创建启动盘、硬盘分区、压缩/解压缩和启动Linux。

`/doc/`:

Debian的基本文档，如FAQ、错误报告系统使用说明等。

`/indices/`:

维护人员文件和重载文件。

`/project/`:

大部分为开发人员的资源，如：`project/experimental/`:本目录包含了处于开发中的软件包和工具，它们均处于alpha测试阶段。用户不应使用这些软件，因为即使是经验丰富的用户也会被搞得一团糟。`project/orphaned/`:已不再有人维护的软件包，它们已从发行版中孤立出来。
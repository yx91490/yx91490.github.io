# SVN笔记

### SVN提交到老分支补救指南

1. 生成补丁:


```shell
  svn diff old_branch_url new_branch-url >/tmp/patch
```

2. 对已经切换到新分支的工作目录应用补丁:


```shell
  patch -R -p0 < /tmp/patch
```

### SVN如何忽略本地文件

工作中经常会把IDE的配置文件不小心加入版本控制，用下面的命令可以在本地保留文件并从版本控制中删除:

    $ svn rm --keep-local file-to-remove


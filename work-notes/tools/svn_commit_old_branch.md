1. 生成补丁:


```shell
  svn diff old_branch_url new_branch-url >/tmp/patch
```

2. 对已经切换到新分支的工作目录应用补丁:


```shell
  patch -R -p0 < /tmp/patch
```
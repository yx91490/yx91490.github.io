# 如何原子性地更新目录的软链接？

我们都知道在Linux系统上创建软链接的方式是：

```bash
ln -s <target> <link>
```

对于普通文件来说，如果我想更新一个软链接，可以先把软链接删除，然后重新创建：

```bash
rm -f <link_name> && ln -s <target> <link_name>
```

如果想让命令简洁一点可以这样：

```bash
ln -fs <target> <link>
```

但是如果目标路径是一个目录，会发现这样做并不生效。对于目录而言需要加上参数`-n`：

```bash
ln -fsn <target> <link>
```

再来讨论下原子性的问题。使用`-f`参数可以强制替换已经存在的软链接，但是这个操作并非原子性的：

```bash
# ln -fsn file link1
...
symlink("file", "link1")        = -1 EEXIST (File exists)
unlink("link1")                         = 0
symlink("file", "link1")        = 0
...
```

想要原子性地更新软链接只能借助`mv`操作：

```bash
ln -fs <new_target> <new_link> && mv -T <new_link> <link>
```

验证如下，使用了`renameat2`系统调用：

```bash
# strace mv -T link2 link1
...
renameat2(AT_FDCWD, "link2", AT_FDCWD, "link1", 0) = 0
...
```

但是`-T`参数不是POSIX兼容的，更具移植性的代码如下：

```bash
ln -fs <new_target> <other_dir>/<link> && mv -f <other_dir>/<link> ./
```

注意如果两个文件跨磁盘了，`renameat2`调用会失败，操作也不是原子性的：

```bash
...
renameat2(AT_FDCWD, "/tmp/dir", AT_FDCWD, "./dir", 0) = -1 EXDEV (Invalid cross-device link)
unlink("./dir")                         = 0
readlink("/tmp/dir", "/apps/home/target"..., 34) = 33
symlink("/apps/home/target", "./dir") = 0
...
```

## 参考

[Moving a directory atomically](https://stackoverflow.com/questions/307437/moving-a-directory-atomically)

[How to change symlinks atomically](https://blog.moertel.com/posts/2005-08-22-how-to-change-symlinks-atomically.html)
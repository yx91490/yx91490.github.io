# 常用基本命令

## grep

tail一个文件并grep关键字然后输出到文件：

```shell
tail -F log | grep --line-buffered "some words" >> file
```

`--line-buffered`选项用来在换行之后强制刷写buffer。

### 参考

[How to 'grep' a continuous stream?](https://stackoverflow.com/questions/7161821/how-to-grep-a-continuous-stream)

[What does grep line buffering do?](https://askubuntu.com/questions/562344/what-does-grep-line-buffering-do)


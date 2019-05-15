## hadoop命令笔记

### fs命令

### ls

1. 按修改时间倒序排序

   hadoop fs -ls -r -t /path

2. 只列出文件名称

   hadoop fs -ls -C /path

### du

1. 按大小逆序输出子目录及文件的大小

   hadoop fs -du -s /path/* |sort -rnk1

### rm

1. 跳过回收站删除文件

   hadoop rm -r -skipTrash /path

[Merging small files in hadoop](https://stackoverflow.com/questions/39103872/merging-small-files-in-hadoop?answertab=votes#tab-top)
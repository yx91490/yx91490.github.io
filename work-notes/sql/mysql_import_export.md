# MySQL导入导出数据

第一步将数据导出到文本文件里：

    $ mysql -h${HOST} -P${PORT} -u${user} -D${database} -p -e "select ..." > /tmp/data.file
第二步
登录mysql服务端导入数据文件：

    mysql> load data local infile '/tmp/data.file' into table ${table};


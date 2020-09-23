# Kudu

## Kudu迁移master

```

./sbin/kudu-master  \
--fs_data_dirs=/hdp/kudu/data \
--fs_wal_dir=/hdp/kudu/wal \
--master_addresses="211.local.org:7051,212.local.org:7051,213.local.org:7051" \
--heap_profile_path=/tmp/kudu-master.12085 \
--flagfile=/run/cloudera-scm-agent/process/930-kudu-KUDU_MASTER/gflagfile


kudu fs dump uuid --fs_wal_dir=/hdp/kudu/wal --fs_data_dirs=/hdp/kudu/data 2>/dev/null

=======================
$ sudo -u kudu kudu fs dump uuid --fs_wal_dir=/hdp/kudu/wal --fs_data_dirs=/hdp/kudu/data 2>/dev/null
574e72983eee4ec69baa86b32093a460
fcf4d83d650440938d4787b1b5dd04fe
b3e2ea1c87854f3c97624d02fbec400b

$ sudo -u kudu kudu fs dump uuid --fs_wal_dir=/hdp/kudu/wal --fs_data_dirs=/hdp/kudu/data > out.txt 2>err.txt

$ sudo -u kudu kudu local_replica cmeta rewrite_raft_config --fs_wal_dir=/hdp/kudu/wal --fs_data_dirs=/hdp/kudu/data 00000000000000000000000000000000 574e72983eee4ec69baa86b32093a460:211.local.org:7051 fcf4d83d650440938d4787b1b5dd04fe:212.local.org:7051 b3e2ea1c87854f3c97624d02fbec400b:213.local.org:7051

$ sudo -u kudu kudu local_replica copy_from_remote --fs_wal_dir=/hdp/kudu/wal --fs_data_dirs=/hdp/kudu/data 00000000000000000000000000000000 211.local.org:7051


```

## KUDU API

在这里简要说下三种`Kudu`提交数据策略的含义：

- `AUTO_FLUSH_SYNC`：同步刷新模式。调用`KuduSession.apply()`方法后，客户端会等数据刷新到服务器后再返回，这种情况就不能批量插入数据，调用`KuduSession.flush()`方法不会起任何作用，因为此时缓冲区数据已经被刷新到了服务器
- `AUTO_FLUSH_BACKGROUND`：异步刷新模式。调用`KuduSession.apply()`方法后，客户端会立即返回，但是写入将在后台发送，可能与来自同一会话的其他写入一起进行批处理。如果没有足够的缓冲空间，`KuduSession.apply()`会阻塞直到缓冲空间可用。因为写入操作是在后台进行的，因此任何错误都将存储在一个会话本地（`session-local`）缓冲区中，调用`countPendingErrors()`或者`getPendingErrors()`可以获取错误相关的信息。注意：这种模式可能会导致数据写入的时候乱序，这是因为在这种模式下，多个写操作可以并行发送到服务器
- `MANUAL_FLUSH`：手动刷新模式。调用`KuduSession.apply()`方法后，客户端会立即返回，但是写入请求不会被立即发送，需要我们手动调用`KuduSession.flush()`来发送写入请求。如果缓冲区超过了配置的大小，会返回错误

除刷新方式设置外，还有以下参数会影响客户端的写入行为：

- `kudu_mutation_buffer_size`：`Kudu`客户端缓存操作数据的字节数，`KuduTableSink`中定义的默认值为`10MB`，该参数通过`KuduSession`的`SetMutationBufferSpace()`方法设置。可以在`impalad`的启动项中自定义`kudu_mutation_buffer_size`的大小
- `kudu_error_buffer_size`：`KuduSession`操作异常的`buffer`大小，`KuduTableSink`中定义的默认值为`10MB`，该参数通过`KuduSession`的`SetErrorBufferSpace()`方法设置。可以在`impalad`的启动项中自定义`kudu_error_buffer_size`的大小
- 触发`flush`操作的缓存阈值：仅在`AUTO_FLUSH_BACKGROUND`刷新模式下生效。`KuduTableSink`中定义的默认值为`70%`。当缓存大小达到`70%`的时候，`Kudu`客户端开始将缓存的数据发送给相应的`tablet`服务。`Kudu`客户端定义的阈值为`50%`。该阈值通过`KuduSession`的`SetMutationBufferFlushWatermark()`方法设置
- 每个`KuduSession`对象的最大缓存数：`KuduTableSink`将其设置为`0`，表示无限制。该参数通过`KuduSession`的`SetMutationBufferMaxNum()`方法设置

参考

[kudu系列: Java API使用和效率测试](https://www.cnblogs.com/harrychinese/p/kudu_java_api.html)

[KUDU高级分区](https://docs.cloudera.com/documentation/enterprise/6/6.3/topics/kudu_impala.html#concept_r3t_vtz_kt__section_sgh_4vz_kt)

[一次Impala upsert Kudu执行缓慢问题排查总结](https://my.oschina.net/dabird/blog/3190668)
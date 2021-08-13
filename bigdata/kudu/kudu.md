# Kudu

## 编译Kudu源码

### 要求

- 不支持Windows
- C++17兼容的编译器(GCC 7.0)

### RHEL或CentOS

CentOS8.0之前的版本需要安装`Red Hat Developer Toolset`以便于能够访问C++17兼容的编译器。

1.安装必备库：

```shell
sudo yum install autoconf automake cyrus-sasl-devel cyrus-sasl-gssapi \
  cyrus-sasl-plain flex gcc gcc-c++ gdb git java-1.8.0-openjdk-devel \
  krb5-server krb5-workstation libtool make openssl-devel patch \
  pkgconfig redhat-lsb-core rsync unzip vim-common which
```

2.如果在 RHEL 或 8.0 之前的 CentOS 上构建，请安装 Red Hat Developer Toolset。以下是 CentOS 所需的步骤：

```shell
sudo yum install centos-release-scl-rh
sudo yum install devtoolset-8
```

3.可选：如果需要支持 Kudu 的 NVM（非易失性内存）块缓存，请安装 memkind 库：

```shell
sudo yum install memkind
```

如果 Linux 发行版提供的 memkind 包太旧（需要 1.8.0 或更高版本），请从源代码构建和安装：

```shell
sudo yum install numactl-libs numactl-devel
git clone https://github.com/memkind/memkind.git
cd memkind
./build.sh --prefix=/usr
sudo yum remove memkind
sudo make install
sudo ldconfig
```

4.可选：如果您计划构建文档，请安装一些额外的软件包，包括 ruby：

```shell
sudo yum install gem graphviz ruby-devel zlib-devel
```

如果在 RHEL 或 CentOS 7.0 之前构建， gem 包可能需要替换为 rubygems。

构建文档需要 Doxygen 1.8.19 或更高版本，必须 [手动从源代码构建](https://www.doxygen.nl/manual/install.html#install_src_unix)。在低于 8.0 的 CentOS 或 RHEL 上构建此版本的 Doxygen 还需要 [devtoolset](https://www.softwarecollections.org/en/scls/rhscl/devtoolset-8/)。

5.克隆 Git 存储库并切换到新`kudu`目录：

```
git clone https://github.com/apache/kudu
cd kudu
```

6.使用`build-if-necessary.sh`脚本构建缺失的必要的三方软件。不使用 devtoolset 会导致`Host compiler appears to require libatomic, but cannot find it.`：

```shell
build-support/enable_devtoolset.sh thirdparty/build-if-necessary.sh
```

7.使用上一步中安装的程序构建 Kudu。为中间输出选择一个构建目录，该目录可以位于文件系统中的任何位置，但`kudu`目录本身除外。请注意，仍然必须指定 devtoolset，否则会出现`cc1plus: error: unrecognized command line option "-std=c++17"`：

```
mkdir -p build/release
cd build/release
../../build-support/enable_devtoolset.sh \
  ../../thirdparty/installed/common/bin/cmake \
  -DCMAKE_BUILD_TYPE=release ../..
make -j4
```

8.可选：安装 Kudu 可执行文件、库和头文件：

运行`sudo make install`安装以下内容：

- kudu-tserver 和 kudu-master 可执行文件 `/usr/local/sbin`
- Kudu 命令行工具 `/usr/local/bin`
- Kudu 客户端库在 `/usr/local/lib64/`
- Kudu 客户端标头 `/usr/local/include/kudu`

默认安装目录为`/usr/local`。可以通过`DESTDIR` 环境变量对其进行自定义：

```shell
sudo make DESTDIR=/opt/kudu install
```

9.可选：构建文档。注意：此命令会构建不适合上传到 Kudu 网站的本地文档：

```
make docs
```

### 示例脚本

此脚本概述了在新安装的 RHEL 或 CentOS 主机上构建 Kudu 的过程，并可用作自动化部署方案的基础。它跳过上面标记为**可选**的步骤：

```shell
#!/bin/bash

sudo yum -y install autoconf automake curl cyrus-sasl-devel cyrus-sasl-gssapi \
  cyrus-sasl-plain flex gcc gcc-c++ gdb git java-1.8.0-openjdk-devel \
  krb5-server krb5-workstation libtool make openssl-devel patch pkgconfig \
  redhat-lsb-core rsync unzip vim-common which
sudo yum -y install centos-release-scl-rh
sudo yum -y install devtoolset-8
git clone https://github.com/apache/kudu
cd kudu
build-support/enable_devtoolset.sh thirdparty/build-if-necessary.sh
mkdir -p build/release
cd build/release
../../build-support/enable_devtoolset.sh \
  ../../thirdparty/installed/common/bin/cmake \
  -DCMAKE_BUILD_TYPE=release \
  -DNO_TESTS=1 \
  ../..
make -j4
```

### 运行

组织目录：

```
├── bin
│   ├── kudu
│   ├── kudu-master
│   └── kudu-tserver
├── master
│   ├── conf/master.conf
│   ├── data
│   ├── log
│   └── wal
└── tserver
    ├── conf/tserver.conf
    ├── data
    ├── log
    └── wal
```

master/conf/master.conf配置：

```
-rpc_bind_addresses=localhost:7051
-webserver_interface=localhost
-webserver_port=8051
-fs_wal_dir=/home/kudu/kudu_cluster/master/wal
-fs_data_dirs=/home/kudu/kudu_cluster/master/data
-log_dir=/home/kudu/kudu_cluster/master/log
-unlock_unsafe_flags
-never_fsync
```

tserver/conf/tserver.conf配置：

```
-rpc_bind_addresses=localhost:7150
-webserver_interface=localhost
-webserver_port=8150
-fs_wal_dir=/apps/home/worker/kudu_cluster/tserver/wal
-fs_data_dirs=/apps/home/worker/kudu_cluster/tserver/data
-log_dir=/apps/home/worker/kudu_cluster/tserver/log
-unlock_unsafe_flags
-never_fsync
-tserver_master_addrs=127.0.0.1:7051
```

master报错：

```
W0805 17:18:12.092677  5319 negotiation.cc:313] Failed RPC negotiation. Trace:
0805 17:18:12.092524 (+     0us) reactor.cc:583] Submitting negotiation task for server connection from 127.0.0.1:39018
0805 17:18:12.092630 (+   106us) negotiation.cc:304] Negotiation complete: Invalid argument: Server connection negotiation failed: server connection from 127.0.0.1:39018: unable to find SASL plugin: PLAIN
Metrics: {"server-negotiator.queue_time_us":49,"thread_start_us":31,"threads_started":1}
```

tserver报错：

```
W0805 17:05:51.576901  2112 negotiation.cc:313] Failed RPC negotiation. Trace:
0805 17:05:51.576750 (+     0us) reactor.cc:583] Submitting negotiation task for client connection to 127.0.0.1:7051
0805 17:05:51.576852 (+   102us) negotiation.cc:304] Negotiation complete: Invalid argument: Client connection negotiation failed: client connection to 127.0.0.1:7051: unable to find SASL plugin: PLAIN
Metrics: {"client-negotiator.queue_time_us":61,"thread_start_us":48,"threads_started":1}
W0805 17:05:51.576957  2110 heartbeater.cc:586] Failed to heartbeat to 127.0.0.1:7051 (0 consecutive failures): Invalid argument: Failed to ping master at 127.0.0.1:7051: Client connection negotiation failed: client connection to 127.0.0.1:7051: unable to find SASL plugin: PLAIN
```

安装软件包：

```
yum install gcc python-devel
yum install cyrus-sasl*
```

### 参考

[Build From Source](https://kudu.apache.org/docs/installation.html#build_from_source)

[手把手教你在华为云编译和使用Apache Kudu](https://bbs.huaweicloud.com/blogs/174501)

[【原创】大叔经验分享（53）kudu报错unable to find SASL plugin: PLAIN](https://www.cnblogs.com/barneywill/p/10793687.html)

[Kudu 1.8.0 编译安装配置（瘦身版）](https://blog.csdn.net/qqqq0199181/article/details/95506766)

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

## Kudu迁移到多master

### 迁移准备

1. 建立一个维护窗口（1小时足够），期间kudu服务将不可用。

2. 确定master数量，master数据应该是奇数个。推荐设置为3个或5个，可以对应容忍1个或两个失败。

3. 对现有的 master 执行以下准备步骤：

   - 识别并记录 master 的 write-ahead log (WAL) 和数据所在的目录。如果使用 Kudu 系统包，它们的默认位置是`/var/lib/kudu/master`，但可以使用 `fs_wal_dir` 和 `fs_data_dirs`配置参数。

   - 识别并记录 master 用于 RPC 的端口。默认端口值为 7051，但可能已使用`rpc_bind_addresses` 配置参数。

   - 识别主节点的 UUID。可以使用以下命令获取它：

     ```
     $ sudo -u kudu kudu fs dump uuid --fs_wal_dir=<master_wal_dir> [--fs_data_dirs=<master_data_dir>] 2>/dev/null
     ```

   - （可选）为master配置DNS别名。别名可以是DNS的cname（假设机器在DNS中已经存在一条记录），或者`/etc/hosts`里的别名。

4. 如果通过impala访问kudu表，必须同时更新Hive Metastore数据库中的master地址。

   - 如果设置了DNS别名，执行下面的impala SQL：

     ```
     ALTER TABLE table_name
     SET TBLPROPERTIES
     ('kudu.master_addresses' = 'master-1,master-2,master-3');
     ```

   - 如果没有设置DNS别名，参考第11步。

5. 为每个新主执行以下准备步骤：

   - 在集群中选择一台未使用的机器。master 负载很低，因此它可以与其他数据服务或进程混部，但不能与来自相同配置的另一个 Kudu master 混部。
   - 确保机器已使用系统包（已安装过 kudu 和 kudu-master 包）或其他方式安装了 Kudu。
   - 选择并记录主数据所在的目录。
   - 选择并记录主服务器用于 RPC 的端口。
   - （可选）为 master 配置一个 DNS 别名（例如master-2, master-3， 等等）。

### 执行迁移

1. 停止整个集群所有的kudu进程。

2. 格式化每台新主机上的数据目录，并记录生成的UUID。使用以下命令：

   ```
   $ sudo -u kudu kudu fs format --fs_wal_dir=<master_wal_dir> [--fs_data_dirs=<master_data_dir>]
   $ sudo -u kudu kudu fs dump uuid --fs_wal_dir=<master_wal_dir> [--fs_data_dirs=<master_data_dir>] 2>/dev/null
   ```

   示例：

   ```
   [root@kudu-prod002 ~]# sudo -u kudu kudu fs format --fs_wal_dir=/apps/kudu/master/wal --fs_data_dirs=/apps/kudu/master/data
   I0623 08:35:26.214287  7012 fs_manager.cc:263] Metadata directory not provided
   I0623 08:35:26.214372  7012 fs_manager.cc:269] Using write-ahead log directory (fs_wal_dir) as metadata directory
   I0623 08:35:26.216012  7012 fs_manager.cc:602] Generated new instance metadata in path /apps/kudu/master/data/instance:
   uuid: "07f824b6be3a4a4abb9bdddd57f6f6fc"
   format_stamp: "Formatted at 2021-06-23 00:35:26 on kudu-prod002"
   I0623 08:35:26.217067  7012 fs_manager.cc:602] Generated new instance metadata in path /apps/kudu/master/wal/instance:
   uuid: "07f824b6be3a4a4abb9bdddd57f6f6fc"
   format_stamp: "Formatted at 2021-06-23 00:35:26 on kudu-prod002"
   I0623 08:35:26.219463  7012 fs_manager.cc:503] Time spent creating directory manager: real 0.002s   user 0.001s sys 0.000s
   ```

3. 如果使用的是 Cloudera Manager，请立即添加新的 Kudu 主角色，但不要启动它们。

   - 如果使用 DNS 别名，请覆盖每个角色（包括现有的主角色）的 `Master Address` 参数。
   - 如果使用非默认 RPC 端口值，请添加端口号（以冒号分隔）。

4. 在现有 master 上执行以下命令重写 master 的 Raft 配置：

   ```
   $ sudo -u kudu kudu local_replica cmeta rewrite_raft_config --fs_wal_dir=<master_wal_dir> [--fs_data_dirs=<master_data_dir>] 00000000000000000000000000000000 <all_masters>
   ```

   all_masters

   以空格分隔的所有master列表。列表中的每个条目都必须是以下形式的字符串`<uuid>:<主机名>:<端口>`。

   示例：

   ```
   [root@kudu-prod001 master]# sudo -u kudu kudu local_replica cmeta rewrite_raft_config --fs_wal_dir=/apps/kudu/master/wal --fs_data_dirs=/apps/kudu/master/data 00000000000000000000000000000000 3f6308e6f92f4046bf6910db315e3119:kudu-prod001:7051 07f824b6be3a4a4abb9bdddd57f6f6fc:kudu-prod002:7051 bc8a8fa87d3447cfbda6d854b7323711:kudu-prod003:7051
   I0623 08:44:13.146708 30351 fs_manager.cc:263] Metadata directory not provided
   I0623 08:44:13.146780 30351 fs_manager.cc:269] Using write-ahead log directory (fs_wal_dir) as metadata directory
   I0623 08:44:13.147426 30351 fs_manager.cc:399] Time spent opening directory manager: real 0.000s    user 0.000s sys 0.000s
   I0623 08:44:13.147513 30351 env_posix.cc:1676] Not raising this process' open files per process limit of 65535; it is already as high as it can go
   I0623 08:44:13.147557 30351 file_cache.cc:466] Constructed file cache lbm with capacity 26214
   I0623 08:44:13.149086 30351 fs_report.cc:352] FS layout report
   --------------------
   wal directory: 
   metadata directory: 
   1 data directories: /apps/kudu/master/data/data
   Total live blocks: 6
   Total live bytes: 52319
   Total live bytes (after alignment): 65536
   Total number of LBM containers: 7 (0 full)
   Did not check for missing blocks
   Did not check for orphaned blocks
   Total full LBM containers with extra space: 0 (0 repaired)
   Total full LBM container extra space in bytes: 0 (0 repaired)
   Total incomplete LBM containers: 0 (0 repaired)
   Total LBM partial records: 0 (0 repaired)
   I0623 08:44:13.149106 30351 fs_manager.cc:419] Time spent opening block manager: real 0.001s    user 0.000s sys 0.000s
   I0623 08:44:13.149211 30351 fs_manager.cc:436] Opened local filesystem: /apps/kudu/master/data,/apps/kudu/master/wal
   uuid: "3f6308e6f92f4046bf6910db315e3119"
   format_stamp: "Formatted at 2021-06-15 08:20:46 on kudu-prod001"
   I0623 08:44:13.150106 30351 tool_action_local_replica.cc:244] Backed up old consensus metadata to /apps/kudu/master/wal/consensus-meta/00000000000000000000000000000000.pre_rewrite.1624409053149227
   ```

5. 修改现有 master 和新 master 的配置参数`master_addresses`。新值是所有master的逗号分隔列表。每个条目都是这样的格式：`<主机名>:<端口>`。（如果使用cloudera manager可以省略这一步）

6. 启动现有的master

7. 在每台新 master 机器上执行以下命令将 master 数据复制到每个新 master：

   ```
   $ sudo -u kudu kudu local_replica copy_from_remote --fs_wal_dir=<master_data_dir> 00000000000000000000000000000000 <existing_master>
   ```

   示例：

   ```
   [root@kudu-prod002 ~]# sudo -u kudu kudu local_replica copy_from_remote --fs_wal_dir=/apps/kudu/master/wal --fs_data_dirs=/apps/kudu/master/data 00000000000000000000000000000000 kudu-prod001:7051
   I0623 08:48:32.466200  9769 fs_manager.cc:263] Metadata directory not provided
   I0623 08:48:32.466274  9769 fs_manager.cc:269] Using write-ahead log directory (fs_wal_dir) as metadata directory
   I0623 08:48:32.466897  9769 fs_manager.cc:399] Time spent opening directory manager: real 0.000s    user 0.000s sys 0.000s
   I0623 08:48:32.466969  9769 env_posix.cc:1676] Not raising this process' open files per process limit of 65535; it is already as high as it can go
   I0623 08:48:32.467013  9769 file_cache.cc:466] Constructed file cache lbm with capacity 26214
   I0623 08:48:32.467432  9769 fs_report.cc:352] FS layout report
   --------------------
   wal directory: 
   metadata directory: 
   1 data directories: /apps/kudu/master/data/data
   Total live blocks: 0
   Total live bytes: 0
   Total live bytes (after alignment): 0
   Total number of LBM containers: 0 (0 full)
   Did not check for missing blocks
   Did not check for orphaned blocks
   Total full LBM containers with extra space: 0 (0 repaired)
   Total full LBM container extra space in bytes: 0 (0 repaired)
   Total incomplete LBM containers: 0 (0 repaired)
   Total LBM partial records: 0 (0 repaired)
   I0623 08:48:32.467450  9769 fs_manager.cc:419] Time spent opening block manager: real 0.000s    user 0.000s sys 0.000s
   I0623 08:48:32.467555  9769 fs_manager.cc:436] Opened local filesystem: /apps/kudu/master/data,/apps/kudu/master/wal
   uuid: "07f824b6be3a4a4abb9bdddd57f6f6fc"
   format_stamp: "Formatted at 2021-06-23 00:35:26 on kudu-prod002"
   I0623 08:48:32.474596  9769 tablet_copy_client.cc:240] T 00000000000000000000000000000000 P 07f824b6be3a4a4abb9bdddd57f6f6fc: tablet copy: Beginning tablet copy session from remote peer at address kudu-prod001:7051
   I0623 08:48:32.476819  9769 data_dirs.cc:938] Could only allocate 1 dirs of requested 3 for tablet 00000000000000000000000000000000. 1 dirs total
   I0623 08:48:32.478768  9769 tablet_copy_client.cc:575] T 00000000000000000000000000000000 P 07f824b6be3a4a4abb9bdddd57f6f6fc: tablet copy: Starting download of 6 data blocks...
   I0623 08:48:32.480983  9769 tablet_copy_client.cc:538] T 00000000000000000000000000000000 P 07f824b6be3a4a4abb9bdddd57f6f6fc: tablet copy: Starting download of 1 WAL segments...
   I0623 08:48:32.483124  9769 tablet_copy_client.cc:414] T 00000000000000000000000000000000 P 07f824b6be3a4a4abb9bdddd57f6f6fc: tablet copy: Tablet Copy complete. Replacing tablet superblock.
   ```

8. 启动所有新的master

9. 修改值 每个tablet server的`tserver_master_addrs`配置参数。新值必须是逗号分隔的master列表，其中每个条目都是这样格式`<主机名>:<端口>`。（如果使用cloudera manager可以省略这一步）

10. 启动所有的tablet server

11. 如果通过impala访问kudu并且没有设置DNS别名，请手动更新HMS的数据库。

    - 以下是您将在 HMS 数据库中运行的示例 SQL 语句：

      ```
      UPDATE TABLE_PARAMS
      SET PARAM_VALUE =
        'master-1.example.com,master-2.example.com,master-3.example.com'
      WHERE PARAM_KEY = 'kudu.master_addresses' AND PARAM_VALUE = 'old-master';
      ```

    - 通过运行以下SQL更新元数据：

      ```
      INVALIDATE METADATA;
      ```

### 验证

要验证所有 master 都正常工作，请考虑执行以下健全性检查：

- 使用浏览器，访问每个 master 的 web UI 并导航到 /masters。现在应该列出所有master，其中一个master为leader角色，其他的为follower角色。每个master上的内容应该是一样的。
- 在集群上使用kudu命令行工具运行 Kudu系统检查 (ksck) 。有关更多详细信息，请参阅[使用 ksck 监控集群运行状况](https://docs.cloudera.com/documentation/enterprise/6/6.3/topics/kudu_administration_cli.html#ksck)。

### 参考

[Apache: Migrating to Multiple Kudu Masters](https://kudu.apache.org/docs/administration.html#migrate_to_multi_master)

[Cloudera: Migrating to Multiple Kudu Masters](https://docs.cloudera.com/documentation/enterprise/6/6.3/topics/kudu_administration_cli.html#migratingToMultipleKuduMasters.d12e306)

## Kudu Rebalance



参考：

[Monitoring cluster health with ksck](https://docs.cloudera.com/runtime/7.2.0/administering-kudu/topics/kudu-monitoring-cluster-health-with-ksck.html)

[Running tablet rebalancing tool](https://docs.cloudera.com/runtime/7.2.0/administering-kudu/topics/kudu-running-tablet-rebalancing-tool.html)

[Best practices when adding new tablet servers](https://docs.cloudera.com/runtime/7.2.7/kudu-management/topics/kudu-adding-new-tablet-servers.html)

[Kudu Scaling Guide](https://docs.cloudera.com/documentation/enterprise/6/6.3/topics/kudu_scaling.html)

[Migrate data away from a kudu disk](https://stackoverflow.com/questions/61103452/migrate-data-away-from-a-kudu-disk)

[kudu表无法正常访问的一种情况](https://segmentfault.com/a/1190000021635655)

## Kudu数据迁移

### Table copy方式

使用命令行工具`kudu table copy`：

```
kudu table copy <master_addresses> <table_name> <dest_master_addresses> [-nocreate_table] [-dst_table=<table>] [-num_threads=<threads>] [-predicates=<predicates>] [-tablets=<tablets>] [-write_type=<type>] [-negotiation_timeout_ms=<ms>] [-timeout_ms=<ms>]
```

报错1：

```
Invalid argument: Table partitioning must be specified using add_hash_partitions or set_range_partition_columns
```

原因：迁移的表需要设置分区。

报错2：

```
I0811 19:56:26.095109 16312 table_scanner.cc:429] Table impala:bdg_inf.id_name6 created successfully

T a096989375c54f8fb3fc8b4a9fcb30a8 scanned count 857879 cost 3.41085 seconds
T a6ec6df7fc6b442ea028b3b79e429010 scanned count 855723 cost 3.91296 seconds
I0811 19:56:31.095449 16312 table_scanner.cc:612] Scanned count: 2436702
T af000bf1847d43b5a943d4aa3fd1c541 scanned count 854948 cost 3.16102 seconds
T 4599ec58b78848c7afd5b30cdf821aa1 scanned count 855450 cost 3.49121 seconds
Total count 3424000 cost 7.40447 seconds
W0811 19:56:33.499917 16318 client.cc:1713] Couldn't close scanner 6e89b20d9140457b88fe84f413e3d496: Service unavailable: reactor is shutting down (error 108)
```

当前1.9版本未支持，只能作罢。

### Impala SQL方式

将表T1从C1集群迁移到C2集群，在C2集群创建表T2以及指向C1集群T2表的外表T3，在C2集群执行Impala SQL：

```sql
INSERT INTO T2 SELECT * FROM T3
```

### KuduBackupRestore方式

备份：

```shell
spark-submit --class org.apache.kudu.backup.KuduBackup \
  --master yarn \
  --deploy-mode cluster \
  --conf spark.executor.instances=10 \
  --conf spark.executor.memory=5g \
  kudu-backup2_2.11-1.14.0.jar \
  --kuduMasterAddresses master1-host,master-2-host,master-3-host \
  --rootPath hdfs:///kudu-backups \
  tab1 tab2
```

恢复：

```shell
spark-submit --class org.apache.kudu.backup.KuduRestore \
  --master yarn \
  --deploy-mode cluster \
  --conf spark.executor.instances=10 \
  --conf spark.executor.memory=5g \
  kudu-backup2_2.11-1.14.0.jar \
  --kuduMasterAddresses master1-host,master-2-host,master-3-host \
  --rootPath hdfs:///kudu-backups \
  tab1 tab2
```

### Waterdrop方式

使用kudu source和kudu sink插件：

```
source {
    kudu {
        kudu_master = "${SRC_KUDU_MASTER}"
        kudu_table = "impala::${SRC_TABLE_NAME}"
        result_table_name = "table_tmp"
    }
}
transform {
}
sink {
    kudu {
        kudu_master= "${DST_KUDU_MASTER}"
        kudu_table = "impala::${DST_TABLE_NAME}"
        mode = "upsert"
    }
}
```

### 总结

| 方案        | 配置                 | 时间  |
| ----------- | -------------------- | ----- |
| Waterdrop   | 5G内存 * 10 executor | 6min  |
| Impala      | 128G内存 * 3 Impalad | 11min |
| KuduBackup  | 5G内存 * 6 executor  | 23min |
| KuduRestore | 5G内存 * 7 executor  | 12min |

### 参考

[copy: Copy table data to another table](https://kudu.apache.org/docs/command_line_tools_reference.html#table-copy)

## Kudu API

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

## Kudu原理





参考：

[kudu基础入门-背景介绍,kudu是什么,kudu的应用场景,java代码操作kudu](http://www.jszja.com/contents/22/2163.html)

[kudu-列式存储管理器-第四篇（原理篇）](https://daimajiaoliu.com/daima/4eda1fc5f1003fc)

[kudu和hbase的区别和联系](https://blog.csdn.net/weixin_39478115/article/details/78470294)

[kudu底层存储原理](https://blog.csdn.net/weixin_39478115/article/details/79267330)

[kudu读写流程](https://blog.csdn.net/weixin_39478115/article/details/78470269)

[KUDU(二)kudu架构设计](https://big-data.blog.csdn.net/article/details/109014814)

[KUDU(三)kudu数据读写,更新流程](https://blog.csdn.net/wwwzydcom/article/details/109039097)

[KUDU(四)kudu的模式设计](https://big-data.blog.csdn.net/article/details/109063149)

[KUDU(五)kudu优化](https://big-data.blog.csdn.net/article/details/109152338)

## Kudu实践

### Kudu运行指标

我司kudu集群的一些运行指标：

| 指标                       | 值                       | 备注                 |
| -------------------------- | ------------------------ | -------------------- |
| on_disk_size               | 2883144414171B           | 可以用来估算总数据量 |
| du tserver:${fs_data_dirs} | 2883116588K              |                      |
| du tserver:${fs_wal_dir}   | 344735380K               |                      |
| 磁盘使用率                 | 20%,30%                  |                      |
| CPU使用率                  | 平均最大30%, 最大平均80% |                      |
| 内存使用率                 | 平均最大5%, 最大平均15%  |                      |
| 网络入口流量               | 低谷60KB/s, 高峰1.5MB/s  |                      |
| 网络出口流量               | 低谷60KB/s, 高峰4.8MB/s  |                      |
| 磁盘读                     | 低谷为0KB/s,高峰5MB/s    |                      |
| 磁盘写                     | 0.5MB/s                  |                      |
| 查询QPS                    |                          |                      |
| 写入QPS                    |                          |                      |





[Kudu架构介绍及其在小米的应用实践](https://mp.weixin.qq.com/s/Y1_YO44SZbcQEYh1PYMwCA)

[“他们团队都是committer!”—— 小米Kudu开源实践 ](https://mp.weixin.qq.com/s/87Z7iTfat4yEbzzgbX1Xbg)

[我是如何成为Apache Kudu committer & PMC的？](https://mp.weixin.qq.com/s/dlh_kbhEWGw0DRK3j5GtNQ)


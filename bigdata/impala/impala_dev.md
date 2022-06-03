# Impala开发笔记

## 编译构建

### 先决条件

硬件要求：

- CPU 必须至少支持 SSSE3
- 最小内存：16GB
- 硬盘空间：120GB（用于测试数据）

支持的操作系统包括：

- Ubuntu 14.04, 16.04, 18.04
- CentOS 7

### 全量构建

```shell
# cd ~/Impala
bash bin/bootstrap_system.sh
source bin/impala-config.sh
buildall.sh -release -notests
```

- 如果要跳过构建BE测试，将 `-notests` 传递给 buildall.sh 命令
- 如果不需要完全清理，则将 `-noclean` 传递给 buildall.sh 命令

### 增量构建

```shell
# 重新生成cmake文件
./buildall.sh -cmake_only

# 重新构建impalad二进制文件
make -j ${IMPALA_BUILD_THREADS} impalad

# 重新构建java侧的fe
make -j ${IMPALA_BUILD_THREADS} java

# 仅重新构建一个BE测试二进制
make -j ${IMPALA_BUILD_THREADS} buffered-block-mgr-test
 
# 仅重新构建 FE
make fe
```

可以使用ninja加速增量构建：

```shell
# 安装 ninja
sudo apt-get install ninja-build
 
# 代替命令 ./buildall.sh ...:
./buildall.sh ... -ninja
 
# 代替命令  make -j ${IMPALA_BUILD_THREADS} <targets>:
ninja -j ${IMPALA_BUILD_THREADS} <targets>
 
# 使用alias以指定ninja构建线程数
alias ninja='ninja -j ${IMPALA_BUILD_THREADS}'
```

使用distcc，参考：https://github.com/apache/impala/blob/4.0.0/bin/distcc/README.md

跳过检查toolchain依赖项：

```shell
echo "export SKIP_TOOLCHAIN_BOOTSTRAP=true" >> bin/impala-config-local.sh
```

### buildall.sh详细用法

主要作用是编译代码，启动impala依赖的minicluster集群（包括HDFS，Hive，HBase，Kudu等），启动Impala集群（包括catalogd, statestored, impalad），加载测试元数据及数据，执行测试。

参数说明：

| 参数                                                         | 内部变量                                                     | 默认值                                    | 说明                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ----------------------------------------- | ------------------------------------------------------------ |
| -noclean                                                     | CLEAN_ACTION                                                 | False                                     | 不清理编译输出目录。                                         |
| -format                                                      | FORMAT_CLUSTER, <br />FORMAT_METASTORE,<br />FORMAT_RANGER_POLICY_DB | False                                     | 格式化 minicluster, metastore db, 和 ranger policy db        |
| -format_cluster                                              | FORMAT_CLUSTER                                               | False                                     | 格式化 minicluster                                           |
| -format_metastore                                            | FORMAT_METASTORE                                             | False                                     | 格式化 metastore db                                          |
| -format_ranger_policy_db                                     | FORMAT_RANGER_POLICY_DB                                      | False                                     | 格式化 Ranger policy db                                      |
| -upgrade_metastore_db                                        | UPGRADE_METASTORE_SCHEMA                                     | False                                     | 升级metastore db的schema                                     |
| -release_and_debug                                           | BUILD_RELEASE_AND_DEBUG                                      | false                                     | 同时构建 release 和 debug 二进制文件. 覆盖其他的构建类型     |
| -release                                                     | CMAKE_BUILD_TYPE                                             | debug                                     | 构建Release                                                  |
| -codecoverage                                                | CODE_COVERAGE                                                | False                                     | Build with code coverage                                     |
| -asan                                                        | BUILD_ASAN                                                   | False                                     | 构建Address sanitizer                                        |
| -tidy                                                        | BUILD_TIDY                                                   | False                                     | 构建clang-tidy                                               |
| -tsan                                                        | BUILD_TSAN                                                   | False                                     | 构建Thread sanitizer, 和参数 ignore_noninstrumented_modules=1一起运行. 当此flag是 true, TSAN 忽略从 non-instrumented libraries的内存访问. 这降低了假阳性数量, 但会漏掉真正的问题. -full_tsan参数会禁用此 flag |
| -full_tsan                                                   | BUILD_TSAN_FULL                                              | False                                     | 构建Thread sanitizer, 和参数 ignore_noninstrumented_modules=0 一起运行(看-tsan 的描述阐述了这个flag做了什么) |
| -ubsan                                                       | BUILD_UBSAN                                                  | False                                     | 构建Undefined behavior sanitizer                             |
| -full_ubsan                                                  | BUILD_UBSAN_FULL                                             | False                                     | 构建Undefined behavior sanitizer, 包交叉编译生成的 LLVM IR代码. 比单纯的-ubsan查询更慢 |
| -skiptests                                                   | TESTS_ACTION                                                 | False                                     | 跳过执行所有的测试                                           |
| -notests                                                     | BUILD_TESTS, TESTS_ACTION                                    | False                                     | 跳过构建和执行所有的测试                                     |
| -start_minicluster                                           | NEED_MINICLUSTER                                             | 如果运行测试或加载数据为True，否则为False | 启动测试集群，包括Impala和它依赖的集群。如果已经在运行，所有服务都会重启，重新生成 test cluster 配置文件 |
| -start_impala_cluster                                        | START_IMPALA_CLUSTER                                         | False                                     | 在构建完成后启动 Impala minicluster                          |
| -testpairwise                                                | EXPLORATION_STRATEGY                                         | ore                                       | 以'pairwise' 模式运行测试 (会增加测试执行时间)               |
| -testexhaustive                                              | EXPLORATION_STRATEGY                                         | core                                      | 以 'exhaustive' 模式运行测试, 会显著增加测试执行时间.仅应用于workload套件：functional-query, targeted-stress |
| -testdata                                                    | TESTDATA_ACTION                                              | False                                     | 加载测试数据. 如果指定了-snapshot_file 默认为True. 如果-snapshot_file没有指定, 数据会被重新生成。 |
| -snapshot_file \<file name>                                  | SNAPSHOT_FILE                                                | -                                         | 从一个snapshot file加载测试数据                              |
| -metastore_snapshot_file <file_name>: Load the hive metastore snapshot | METASTORE_SNAPSHOT_FILE                                      | -                                         | 加载Hive metastore 快照                                      |
| -so\|-build_shared_libs                                      | BUILD_SHARED_LIBS                                            | static                                    | 动态连接可执行文件                                           |
| -fe_only                                                     | BUILD_FE_ONLY                                                | 0                                         | 仅构建fe                                                     |
| -ninja                                                       | MAKE_CMD                                                     |                                           | 使用 ninja 替代 make                                         |
| -cmake_only                                                  | GEN_CMAKE_ONLY                                               | 0                                         | 仅生成 makefiles, 而不是执行全量构建                         |
| -v\|-debug                                                   | -                                                            | -                                         | 使用调试模式执行shell脚本                                    |

外部环境变量：

| 变量名                   | 候选值                     | 默认值              | 说明                                                         |
| ------------------------ | -------------------------- | ------------------- | ------------------------------------------------------------ |
| CMAKE_BUILD_TYPE         | Debug, Release             | Debug               | 编译Debug版还是Release版，可以通过命令行参数`-release`覆盖   |
| DOWNLOAD_CDH_COMPONENTS  | true,false                 | 无                  | 控制是否下载toolchain的开关之一                              |
| EXPLORATION_STRATEGY     | core, pairwise, exhaustive | core                | 运行测试的模式，可以通过命令行参数`-testpairwise` 或 `testexhaustive`覆盖 |
| IMPALA_ALL_LOGS_DIRS     | 任意                       | 无                  | impala所有日志根目录                                         |
| IMPALA_BUILD_THREADS     | 任意                       | 4                   | 编译线程数                                                   |
| IMPALA_HOME              | 任意                       | 无                  | impala源码目录                                               |
| IMPALA_MAKE_FLAGS        | 任意                       | 无                  | make命令flags                                                |
| SKIP_PYTHON_DOWNLOAD     | true, false                | 无                  | 不下载python依赖库                                           |
| SKIP_TOOLCHAIN_BOOTSTRAP | true, false                | 无                  | 控制是否下载toolchain的开关之一                              |
| TARGET_FILESYSTEM        | hdfs,s3,local              | dfs                 | 加载测试数据的文件系统                                       |
| CDP_FILE                 | -                          | ${IMPALA_HOME}/.cdp | 内容为$CDP_BUILD_NUMBER                                      |

常见用例：

```shell
# 构建并运行所有测试
./buildall.sh

# 构建并跳过测试
./buildall.sh -skiptests

# 构建,然后刷新配置重启minicluster和Impala
./buildall.sh -notests -start_minicluster -start_impala_cluster

# 增量构建并跳过测试.保持现有的minicluster服务运行并重启Impala
./buildall.sh -skiptests -noclean -start_impala_cluster

# 构建,加载一个snapshot文件, 运行测试
./buildall.sh -snapshot_file <file>

# 构建,加载hive metastore和hdfs snapshot, 运行测试
./buildall.sh -snapshot_file <file> -metastore_snapshot_file <file>

# 构建,生成,和增量加载测试数据，并且不格式化mini-cluster (重用HDFS上已存在的数据). 比从snapshot加载更快
./buildall.sh -testdata

# 构建, 格式化mini-cluster和metastore,加载所有测试数据,运行测试
./buildall.sh -testdata -format

# 构建并升级metastore schema至最新版.
./buildall.sh -upgrade_metastore_db
```

### 参考

[Building Impala](https://cwiki.apache.org/confluence/display/IMPALA/Building+Impala)

[Tips for Faster Impala Builds](https://cwiki.apache.org/confluence/display/IMPALA/Tips+for+Faster+Impala+Builds)

## 代码调试

### 参考



[Impala Debugging Tips](https://cwiki.apache.org/confluence/display/IMPALA/Impala+Debugging+Tips)

## 源码分析

以下代码以[4.0.0源码](https://github.com/apache/impala/blob/4.0.0)为例。

### 术语表

| 术语     | 说明 |
| -------- | ---- |
| lhs, rhs |      |
|          |      |
|          |      |

### bootstrap_system.sh

为开发环境做些准备，大体执行流程：

- 设置环境变量 IMPALA_HOME
- 如果是交互模式，询问是否愿意更改环境配置，是则继续，否则退出；如果不是交互模式，直接执行。
- 判断Linux发行版版本（REDHAT6，REDHAT7，UBUNTU16.04），以及是否在Docker内
- 安装一堆软件包，包括编译相关工具，kerberos，postgresql等
- 下载apache-ant-1.9.14和apache-maven-3.5.4并安装到目录`/usr/local`下
- 启动ssh服务
- 初始化postgresql并启动
- 为HMS创建账号，用户名：hiveuser，密码：password
- 配置到localhost的免密登录
- 配置`/etc/hosts`
- 创建目录：`/var/lib/hadoop-hdfs`
- 配置系统最大打开文件数为1048576，最大进程数为unlimited
- 如果IMPALA_HOME目录不存在，则checkout Impala源码，并导出环境变量 IMPALA_HOME到`~/.bashrc`
- 配置JAVA_HOME，并固化到`bin/impala-config-local.sh`
- 下载maven软件包到本地仓库

在Docker里运行此脚本需要做的准备：

```shell
# 添加参数--privileged
docker run --privileged --cap-add SYS_TIME -d -it --name impala_build ubuntu:16.04 bash
# 赋予容器一个非root无需密码的sudoer：
apt-get update
apt-get install sudo
adduser --disabled-password --gecos '' impdev
echo 'impdev ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

# 使用新建的用户运行：
su - impdev -c bin/bootstrap_development.sh
```

### buildall.sh

[第20行](https://github.com/apache/impala/blob/4.0.0/buildall.sh#L20)设置了shell执行在一个比较严格的模式，出现error或者未赋值变量，或管道中有失败则立即终止执行。

[第55行至85行](https://github.com/apache/impala/blob/4.0.0/buildall.sh#L55,L85) 设置内部变量的默认值。

[第88行至286行](https://github.com/apache/impala/blob/4.0.0/buildall.sh#L88,L286)解析命令行参数并设置内部变量。

[第288行至第334行](https://github.com/apache/impala/blob/4.0.0/buildall.sh#L288,L334)重新确定变量`CMAKE_BUILD_TYPE`的值。首先`CMAKE_BUILD_TYPE`变量初始值与`CODE_COVERAGE`变量值可能产生4种情况：

| CMAKE_BUILD_TYPE | CODE_COVERAGE | 结果                  |
| ---------------- | ------------- | --------------------- |
| Debug            | 1             | CODE_COVERAGE_DEBUG   |
| Release          | 1             | CODE_COVERAGE_RELEASE |
| Release          | 0             | RELEASE               |
| Debug            | 0             | （空）                |

前3种非空情况连同`TIDY`，`UBSAN`，`UBSAN_FULL`，`TSAN`， `TSAN_FULL`为真的情况会形成互斥，最终变量`CMAKE_BUILD_TYPE`的值只能取其中之一，或者为空（表示Debug）。

[第344行至349行](https://github.com/apache/impala/blob/4.0.0/buildall.sh#L344,L349)校验启用kerberos的集群上不支持运行测试或者加载测试数据。

[第351行至356行](https://github.com/apache/impala/blob/4.0.0/buildall.sh#L351,L356)校验加载测试数据的hive元数据快照仅支持hdfs文件系统。

[第365行至380行](https://github.com/apache/impala/blob/4.0.0/buildall.sh#L365,L380)定义了函数`create_log_dirs()`。

[第382行至422行](https://github.com/apache/impala/blob/4.0.0/buildall.sh#L382,L422)定义了函数`bootstrap_dependencies()`，主要包括python依赖和编译工具链：

- 如果`SKIP_PYTHON_DOWNLOAD=false`则执行脚本`$IMPALA_HOME/infra/python/deps/download_requirements`下载python的依赖。
- 如果`SKIP_TOOLCHAIN_BOOTSTRAP=true`且`DOWNLOAD_CDH_COMPONENTS=true`，或者`SKIP_TOOLCHAIN_BOOTSTRAP=false`，则执行脚本`$IMPALA_HOME/bin/bootstrap_toolchain.py`下载toolchain。

[第425至428行](https://github.com/apache/impala/blob/4.0.0/buildall.sh#L425,L428)定义了函数`build_fe()`，主要包括2个步骤：

- 生成cmake文件
- 执行`make java`命令

[第435行至455行](https://github.com/apache/impala/blob/4.0.0/buildall.sh#L435,L455)定义了函数`build_all_components()`，主要完成两件事：

- 生成cmake文件
- 执行`make`命令

make命令的目标有三种情况：

| BUILD_TESTS | build_independent_targets | MAKE_TARGETS            |
| ----------- | ------------------------- | ----------------------- |
| 0           | 1                         | notests_all_targets     |
| 0           | 0                         | notests_regular_targets |
| 1           | 任意                      | （空）                  |

[第460行至501行](https://github.com/apache/impala/blob/4.0.0/buildall.sh#L460,L501)定义了函数`generate_cmake_files()`，主要步骤：

- 拼接cmake参数，包括：`-DCMAKE_BUILD_TYPE`，`-DBUILD_SHARED_LIBS`，`-GNinja`，`-DCMAKE_TOOLCHAIN_FILE`，`-DCACHELINESIZE_AARCH64`
- 执行cmake命令

[第506行至534行](https://github.com/apache/impala/blob/4.0.0/buildall.sh#L506,L534)定义了函数`reconfigure_test_cluster()`：

- 强制kill掉impala集群
- 如果有修改元数据的操作则kill掉minicluster集群
- 调用`${IMPALA_HOME}/bin/create-test-configuration.sh`脚本生成impala依赖的hadoop配置文件

[第537行至543行](https://github.com/apache/impala/blob/4.0.0/buildall.sh#L537,L543)定义了函数`start_test_cluster_dependencies()`，主要是调用脚本`$IMPALA_HOME/testdata/bin/run-all.sh`启动minicluster集群。

[第548行至565行](https://github.com/apache/impala/blob/4.0.0/buildall.sh#L548,L565)定义了函数`load_test_data()`，用来执行数据加载步骤：

- 执行脚本`$IMPALA_HOME/bin/create_testdata.sh`

- 执行脚本`${IMPALA_HOME}/testdata/bin/create-load-data.sh`。根据变量`SNAPSHOT_FILE` 和变量`METASTORE_SNAPSHOT_FILE`的值是否为空，传递的参数有4种组合情况：

  | SNAPSHOT_FILE | METASTORE_SNAPSHOT_FILE | CREATE_LOAD_DATA_ARGS                   |
  | ------------- | ----------------------- | --------------------------------------- |
  | 不为空        | 不为空                  | -snapshot_file, -skip_metadata_load     |
  | 不为空        | 空                      | -snapshot_file                          |
  | 空            | 不为空                  | -skip_metadata_load -skip_snapshot_load |
  | 空            | 空                      | 空                                      |

[第567行至573行](https://github.com/apache/impala/blob/4.0.0/buildall.sh#L567,L573)定义了函数`run_all_tests()`，调用脚本`${IMPALA_HOME}/bin/run-all-tests.sh`运行测试。

[第575行至578行](https://github.com/apache/impala/blob/4.0.0/buildall.sh#L575)会调用脚本`$IMPALA_HOME/bin/clean.sh`清理之前的构建目录。

[第620行至623行](https://github.com/apache/impala/blob/4.0.0/buildall.sh#L620,L623)调用脚本`${IMPALA_HOME}/testdata/bin/load-metastore-snapshot.sh`加载Hive metastore的元数据。











格式化cluster？



### report_build_error.sh

setup_report_build_error函数功能：如果接收到错误，打印行号。

### clean.sh

清理编译输出目录，包括：

- 扩展数据源输出目录
- fe输出目录
- be输出目录
- shell输出目录
- python中间文件和目录
- llvm输出目录
- cmake生成文件

### create-test-configuration.sh

使用说明：

```
[-create_metastore] : If true, creates a new metastore.
[-create_ranger_policy_db] : If true, creates a new Ranger policy db.
[-upgrade_metastore_db] : If true, upgrades the schema of HMS db.
```



### Frontend

impalad服务端接收请求入口：`impala-beeswax-server.cc#ImpalaServer::query()`

Frontend.cc#Frontend::GetExecRequest() 通过JNI接口调用

org.apache.impala.planner.Planner.createPlan()

#### org.apache.impala.planner.PlanNode

slot, materialized, conjuncts,

#### org.apache.impala.planner.PlanNodeId

#### org.apache.impala.analysis.TupleDescriptor



#### org.apache.impala.catalog.FeView

LocalView

=======

#### 类型系统

##### org.apache.impala.catalog.PrimitiveType

为什么有了对应的thrift类还要有PrimitiveType？

org.apache.impala.catalog.Type

org.apache.impala.catalog.ScalarType

#### SQL解析

##### org.apache.impala.analysis.StatementBase

子类：

| 类名                                | 抽象类 | 说明 |
| ----------------------------------- | ------ | ---- |
| QueryStmt                           | T      |      |
| ModifyStmt                          | T      |      |
| AlterDbStmt                         | T      |      |
| AlterTableStmt                      | T      |      |
| AlterTableSetColumnStats            | T      |      |
| AlterTableOrViewSetOwnerStmt        | T      |      |
| CommentOnStmt                       | T      |      |
| CommentOnTableOrViewStmt            | T      |      |
| CreateFunctionStmtBase              | T      |      |
| CreateOrAlterViewStmtBase           | T      |      |
| AdminFnStmt                         |        |      |
| AlterDbSetOwnerStmt                 |        |      |
| AlterTableAddColsStmt               |        |      |
| AlterTableAddDropRangePartitionStmt |        |      |
| AlterTableAddPartitionStmt          |        |      |
| AlterTableAlterColStmt              |        |      |
| AlterTableDropColStmt               |        |      |
| AlterTableDropPartitionStmt         |        |      |
| AlterTableOrViewRenameStmt          |        |      |
| AlterTableRecoverPartitionsStmt     |        |      |
| AlterTableReplaceColsStmt           |        |      |
| AlterTableSetCachedStmt             |        |      |
| AlterTableSetFileFormatStmt         |        |      |
| AlterTableSetLocationStmt           |        |      |
| AlterTableSetOwnerStmt              |        |      |
| AlterTableSetRowFormatStmt          |        |      |
| AlterTableSetStmt                   |        |      |
| AlterTableSetTblProperties          |        |      |
| AlterTableSortByStmt                |        |      |
| AlterViewSetOwnerStmt               |        |      |
| AlterViewStmt                       |        |      |
| AuthorizationStmt                   |        |      |
| CommentOnColumnStmt                 |        |      |
| CommentOnDbStmt                     |        |      |
| CommentOnTableStmt                  |        |      |
| CommentOnViewStmt                   |        |      |
| ComputeStatsStmt                    |        |      |
| CopyTestCaseStmt                    |        |      |
| CreateDataSrcStmt                   |        |      |
| CreateDbStmt                        |        |      |
| CreateDropRoleStmt                  |        |      |
| CreateTableAsSelectStmt             |        |      |
| CreateTableDataSrcStmt              |        |      |
| CreateTableLikeFileStmt             |        |      |
| CreateTableLikeStmt                 |        |      |
| CreateTableStmt                     |        |      |
| CreateUdaStmt                       |        |      |
| CreateUdfStmt                       |        |      |
| CreateUdtStmt                       |        |      |
| CreateViewStmt                      |        |      |
| DeleteStmt                          |        |      |
| DescribeDbStmt                      |        |      |
| DescribeTableStmt                   |        |      |
| DropDataSrcStmt                     |        |      |
| DropDbStmt                          |        |      |
| DropFunctionStmt                    |        |      |
| DropStatsStmt                       |        |      |
| DropTableOrViewStmt                 |        |      |
| GrantRevokePrivStmt                 |        |      |
| GrantRevokeRoleStmt                 |        |      |
| InsertStmt                          |        |      |
| LoadDataStmt                        |        |      |
| ResetMetadataStmt                   |        |      |
| SelectStmt                          |        |      |
| SetStmt                             |        |      |
| ShowCreateFunctionStmt              |        |      |
| ShowCreateTableStmt                 |        |      |
| ShowDataSrcsStmt                    |        |      |
| ShowDbsStmt                         |        |      |
| ShowFilesStmt                       |        |      |
| ShowFunctionsStmt                   |        |      |
| ShowGrantPrincipalStmt              |        |      |
| ShowRolesStmt                       |        |      |
| ShowStatsStmt                       |        |      |
| ShowTablesStmt                      |        |      |
| TruncateStmt                        |        |      |
| UnionStmt                           |        |      |
| UpdateStmt                          |        |      |
| UseStmt                             |        |      |
| ValuesStmt                          |        |      |



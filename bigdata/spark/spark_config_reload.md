# [转]Spark动态加载HiveServer2配置

一般来说，Spark写Hive，把`xxx-site.xml`系列配置文件打进jar包里，或`spark-submit`指定下file之类，new个`HiveContext`就完事了。要写外部集群，也不外乎是换对应的`xxx-site.xml`，改改`thrift`服务地址啥的，不费劲。好了，本文结束。

不对，擅长断更的我不会为此特意写篇博客。现在的场景是，每次Spark任务启动的时候才能拿到外部Hive集群的配置信息（别问我为什么，问就是中台的需求，很多集群，java应用启动后才能去读到任务配置，反射组装RDD并执行，Hive配置？lazy的，到写入的时候才会去拿）。
这个过程踩了不少坑，试了几种方案，直接说结论吧。

1. `SparkContext`创建的时候会创建一个`Configuration`对象（注意 `loadDefaults=true`)，写入Hive会用到它；而这个`Configuration`对象里面已经放了常规的那些`***-site.xml`系列配置文件作为 `defaultResources`，这时写入Hive相当于按fat-jar里面的配置来了；
2. 围观`Configuration`代码，reload配置之后会将`defaultResources`逐个读出，而`defaultResources`是个有序的List，那么显然可以用`Configuration#addDefaultResource()`把外部集群的相关配置xml设置为默认资源，这样拿配置的时候就会拿到外部集群的配置啦！！！
3. 为了方便配置的读取，直接放在hdfs吧，这样直接`Configuration.addDefaultResource("hdfs:///path/to/hive-site.xml")`不就可以了吗？诶怎么不行，再围观`Configuration`代码，可以看到加载默认资源最终用的是`Configuration#getResource()`方法，这个方法体就一句话：`return classLoader.getResource(name);`，也就是说，它不会去解析hdfs协议，而是直接从classpath里面去读取。所以不能直接从hdfs读取；
4. 最后的方案是把配置文件放在hdfs，写入Hive前，把它下载到当前classpath的其中某个目录下（比如classpath包含`.` 则下载到`System.getProperty("user.dir")`下），然后`Configuration.addDefaultResource("hive-site.xml")`，因为`Configuration`是用`ClassLoader`进行加载的，所以注意路径没有`/`。
5. 这就完事了？并不，跑起来会发现还是查询jar包里的hive metastore地址，所以还要解析`hive-site.xml`，读取出`hive.metastore.uris`值并放入环境变量中。
6. 这就完事了？并不，考虑到后续还会有其他写入操作，以及`SparkContext.stop()`操作，这些操作都会用到`Configuration`读取配置，然而现在以及有了外部集群的默认资源了，需要删掉，然而`Configuration`并没有提供删除默认资源的方法，所以这里要手动反射删除之。

最终代码（简化版）：

```java
@Slf4j
class WriteExtraHive{
    public static final String HIVE_METASTORE_URIS_KEY = "hive.metastore.uris";
    public static final String BASE_HDFS_PATH = "/path/to/";
    private boolean useSparkSql; //实际的实现是支持走jdbc和走SparkSql，根据是否有hive的配置文件
    private Set<String> extraDefaultResource = new HashSet<>();
    private String hosts; //集群节点，这里只用于区分hdfs的配置路径

    public void write(){
        init(); //加载配置
        write(); //真正写hive
        end(); //移除额外添加的默认资源
    }

    public void init(){
        URL.setURLStreamHandlerFactory(new FsUrlStreamHandlerFactory());
        String hiveSiteXmlPath = calHadoopXmlPath(hosts, "hive-site", false);
        useSparkSql = hiveSiteXmlPath != null;
        log.info("hive-site.xml文件({})存在:{}", hiveSiteXmlPath, useSparkSql);
        if (useSparkSql) {
            String hiveMetaStoreUris = parseMetaStoreUri(hiveSiteXmlPath);
            if (StringUtils.isNotEmpty(hiveMetaStoreUris)) {
                log.info("从hive-site.xml文件读取到{}={},并设置到环境变量", HIVE_METASTORE_URIS_KEY, hiveMetaStoreUris);
                System.setProperty(HIVE_METASTORE_URIS_KEY, hiveMetaStoreUris);
                calHadoopXmlPath(hosts, "hive-site", true);
                calHadoopXmlPath(hosts, "hdfs-site", true);
            } else {
                useSparkSql = false;
            }
        }
    }

    private void write(){
        HiveContext hiveContext = new HiveContext(sc); //别问我从哪来的SparkContext,示例代码，随意看看
        DataFrame docDataFrame = hiveContext.createDataFrame(rowRdd, sparkSchema); //rdd和Schema也是，别问
        docDataFrame.write()
                .mode(SaveMode.Overwrite)
                .saveAsTable("xxx.yyy");
    }

    public void end(){
        synchronized (Configuration.class) {
            Configuration tempalte = new Configuration(false);
            CopyOnWriteArrayList<String> defaultResources = TestUtil.getPrivateField(conf, "defaultResources"); //getPrivateField方法如其名，递归父类拿到字段并设可见再读
            if (defaultResources == null) {
                return;
            }
            for (String resource : extraDefaultResource) {
                defaultResources.remove(resource);
            }
            WeakHashMap<Configuration, Object> REGISTRY = TestUtil.getPrivateField(conf, "REGISTRY");
            if (REGISTRY == null) {
                return;
            }
            for (Configuration curConf : REGISTRY.keySet()) {
                Boolean loadDefaults = TestUtil.getPrivateField(curConf, "loadDefaults");
                if (loadDefaults != null && loadDefaults) {
                    curConf.reloadConfiguration();
                }
            }
        }
    }

    private String calHadoopXmlPath(String hosts, String fileName, boolean addToDefaultRs) {
        String hdfsPath = String.format("hdfs://%shive/%s-%s.xml", BASE_HDFS_PATH, hosts, fileName);
        try {
            FileSystem fs = FileSystem.get(new Configuration());
            if (HdfsUtil.isFileExist(hdfsPath, fs)) {
                if (addToDefaultRs) {
                    ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
                    URL cpResource = classLoader.getResource("");
                    String cpDir = cpResource != null ? cpResource.getPath() : (System.getProperty("user.dir") + File.separator);
                    String downloadFileName = String.format("%s-%s_%s.xml", hosts, fileName, System.currentTimeMillis()); //实际下载本地的名字
                    String fullDownloadFilePath = cpDir + downloadFileName;
                    log.info("增加Hadoop配置文件:{}到Configuration默认资源,下载到本地:{}", hdfsPath, fullDownloadFilePath);
                    try (OutputStream os = new BufferedOutputStream(new FileOutputStream(fullDownloadFilePath))) {
                        HdfsUtil.copyFileAsStream(hdfsPath, os, fs);
                        Configuration.addDefaultResource(downloadFileName); //加入默认资源
                        extraDefaultResource.add(downloadFileName); //记录加过哪些默认资源，后面要移除
                    } catch (Exception e) {
                        log().error(e.getMessage(), e);
                    }
                    log.info("增加Hadoop配置文件:{}后读取classLoader.getResource({})={}", fileName, downloadFileName, classLoader.getResource(downloadFileName));
                }
                return hdfsPath;
            } else {
                log.info("不存在文件:{}", fileName);
            }
        } catch (Exception e) {
            log.error("get FileSystem fail!", e);
        }
        return null;
    }

    private String parseMetaStoreUri(String hiveSiteXmlPath) {
        Configuration conf = new Configuration(false);
        try {
            conf.addResource(new URL(hiveSiteXmlPath));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return conf.get(HIVE_METASTORE_URIS_KEY);
    }
}
```

### 参考

[spark运行时加载hive，hdfs配置文件](https://blog.csdn.net/piduzi/article/details/81636253)
module.exports = {
  title: "yx91490的博客",
  description: 'java, 大数据(hadoop, sqoop, kylin, zeppelin)相关技术, 工作经验记录',
  head: [
    ['meta', { name: 'google-site-verification', content: 'j1Gm2ZeMV3D7mPiI08fpx91dEOSlhCAJjD4vy_pSroQ'}],
    ['meta', { name: 'baidu-site-verification', content: '4z2bGbjYMB'}],
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['script', {},
    `
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?6781d2ac2dff1f3b278518419b4d4deb";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();
    `],
  ],
  themeConfig: {
    smoothScroll: true,
    lastUpdated: '更新时间',
    sidebar: {
    '/sql': [
      {
        title: 'SQL',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          //'/sql/transaction',
          '/sql/sql_join',
          '/sql/mysql',
          '/sql/mysql_installation',
          'sql/oracle_db_data_type.md',
        ]
      },
    ],
    '/linux': [
      {
        title: 'Linux',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/linux/shell',
          '/linux/network',
          '/linux/rpm_yum',
          '/linux/centos6_centos7_diff',
          '/linux/docker',
          '/linux/kill_signal',
          '/linux/ssh_timeout',
          '/linux/netstat',
          '/linux/symlink',
          '/linux/admin_cmd',
          '/linux/ulimit',
          '/linux/systemd',
          '/linux/systemd_wiki',
          '/linux/systemd_blog',
          '/linux/linux_desktop',
          '/linux/wsl',
        ]
      },
      {
        title: '经验',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/linux/static_blog',
        ]
      },
    ],
    '/clang': [
      {
        title: 'C语言',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/clang/c_qsort',
          '/clang/c_keyword',
          '/clang/c_array_func',
          '/clang/c_mem_model',
          '/clang/c_pointer_array',
          '/clang/arguments_parameter_diff',
          '/clang/compile_ibus-libpinyin',
        ]
      },
    ],
    '/java': [ 
      {
        title: 'Maven',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/java/maven/maven',
          '/java/maven/maven_principle',
          '/java/maven/maven_archetype',
          '/java/maven/maven_plugin',
          '/java/maven/maven_modules',
          '/java/maven/maven_assembly_spi',
          '/java/maven/maven_release_jar',
        ]
      },
      {
        title: 'Java环境',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/java/java-env/jdk_tools',
          '/java/java-env/class_path',
          '/java/java-env/mat_cmd_tool',
        ]
      },
      {
        title: 'JDK',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/java/jdk/java',
          '/java/jdk/ieee754',
          '/java/jdk/enum',
          'java/jdk/urlencode',
          '/java/jdk/jdbc',
          '/java/jdk/red_black_tree',
          '/java/jdk/hashmap',
          '/java/jdk/concurrent-hashmap',
          '/java/jdk/date_time',
          'java/jdk/joda_time_period',
          'java/jdk/joda_time_interval',
          'java/jdk/joda_time_quickstart',
          '/java/jdk/jdk_new_features',
          // '/java/jdk/resource_close',
          // '/java/jdk/java8_lambda',
          '/java/jdk/not_catch_throw_error',
          '/java/jdk/no_such_method_error',
          '/java/jdk/io',
          '/java/jdk/multi_thread',
          '/java/jdk/thread_pool',
          '/java/jdk/aqs',
          'java/jdk/condition',
          '/java/jdk/java_concurrent_framework',
          '/java/jdk/lurenjia_java_concurrent',
        ]
      },
      {
        title: 'JVM',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/java/jvm/arthas',
          '/java/jvm/jvm_parameter',
          '/java/jvm/classloader',
          '/java/jvm/java_memory_model',
          '/java/jvm/java_runtime_data_region',
          '/java/jvm/gc',
          '/java/jvm/cms_parnew_gc_log_format',
          '/java/jvm/young_gc_stw',
        ]
      },
      {
        title: '常用库',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/java/library/slf4j',
          '/java/library/slf4j_nop',
          '/java/library/javamail',
          '/java/library/httpclient_fluent_trap',
          '/java/library/poi_full_gc',
          '/java/library/ctrl_char_in_json',
        ]
      },
      {
        title: 'Spring框架',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          // '/java/spring/spring',
          '/java/spring/spring_url_pattern',
          '/java/spring/proguard',
        ]
      },
      {
        title: '缓存',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/java/redis/redis',
          '/java/redis/cache',
        ]
      },
      {
        title: '架构',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/java/architecture/design_pattern',
          // '/java/architecture/distributed_delay_queue',
          // '/java/architecture/distribute_transaction',
          '/java/architecture/redis_distributelock',
          '/java/architecture/short_url_design',
          '/java/architecture/three_layer',
        ]
      },
      {
        title: 'Tomcat',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/java/tomcat/tomcat_host',
          '/java/tomcat/tomcat_400',
          // '/java/tomcat/rest_api_design',
        ]
      },
      {
        title: '开发工具',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/java/tools/macos',
          '/java/tools/idea',
          '/java/tools/git',
          '/java/tools/svn',
          '/java/tools/editor',
          '/java/tools/vim',
          '/java/tools/typora',
        ]
      },
    ],
    '/bigdata': [
      {
        title: 'Zeppelin',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          'bigdata/zeppelin/heart_diease_dataset',
          '/bigdata/zeppelin/zeppelin_bugs',
          '/bigdata/zeppelin/zeppelin_sharding',
        ]
      },
      {
        title: 'Waterdrop',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/bigdata/waterdrop/waterdrop',
        ]
      },
      {
        title: 'Kylin',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/bigdata/kylin/awesome_kylin',
          '/bigdata/kylin/read_kylin_source',
        ]
      },
      {
        title: 'Sqoop',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/bigdata/sqoop/sqoop_usage',
          '/bigdata/sqoop/sqoop_hcatalog',
          '/bigdata/sqoop/sqoop_mysql_temp_file',
        ]
      },
      {
        title: 'ZooKeeper',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/bigdata/zookeeper/zookeeper',
          '/bigdata/zookeeper/zookeeper_user',
          '/bigdata/zookeeper/zk_distribute_lock',
          '/bigdata/zookeeper/isbn9787111524311_note',
        ]
      },
      {
        title: 'Hadoop',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/bigdata/hadoop/hadoop_interview',
          '/bigdata/hadoop/port',
          '/bigdata/hadoop/hdfs_user',
          '/bigdata/hadoop/hdfs_issue',
          '/bigdata/hadoop/distcp',
          '/bigdata/hadoop/columnar_storage_parquet_orc',
          '/bigdata/hadoop/avro_specification_1.8.1',
          '/bigdata/hadoop/yarn',
          '/bigdata/hadoop/yarn_cli',
          '/bigdata/hadoop/mapreduce',
        ]
      },
      {
        title: 'Hive',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/bigdata/hive/hive_cli',
          '/bigdata/hive/hive_ql',
          '/bigdata/hive/hive_data_type',
          '/bigdata/hive/hive_bucket',
          '/bigdata/hive/hive_principle',
          '/bigdata/hive/hive_optimize',
          '/bigdata/hive/hive_parse_json',
        ]
      },
      {
        title: 'OLAP',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/bigdata/olap/olap',
          '/bigdata/olap/data_analyze',
        ]
      },
      {
        title: 'ClickHouse',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/bigdata/clickhouse/clickhouse',
        ]
      },
      {
        title: 'Doris',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          'bigdata/doris/doris',
        ]
      },
      {
        title: 'Kudu',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/bigdata/kudu/kudu',
          '/bigdata/kudu/kudu_paper',
          '/bigdata/kudu/kudu_paper_translation',
          '/bigdata/kudu/kudu_note',
        ]
      },
      {
        title: 'Impala',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/bigdata/impala/impala',
          '/bigdata/impala/impala_admin',
          '/bigdata/impala/impala_dev',
          '/bigdata/impala/impala_issues',
        ]
      },
      {
        title: 'Spark',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/bigdata/spark/spark',
        ]
      },
      {
        title: 'HBase',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/bigdata/hbase/hbase_interview',
          '/bigdata/hbase/hbase_user',
        ]
      },
      {
        title: '笔记',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/bigdata/note/oss_note',
        ]
      },
    ],
    '/':[
        ['', '首页'],
        ['/sql/', 'SQL'],
        ['/java/', 'Java'],
        ['/linux/', 'Linux'],
        ['/bigdata/', '大数据'],
      ]
    },
    nav: [
      { text: 'Java开发', link: '/java/' },
      { text: '大数据', link: '/bigdata/' },
      {
        text: '其他',
        ariaLabel: 'contactMe',
        items: [
          { text: 'SQL', link: '/sql/' },
          { text: 'Linux', link: '/linux/' },
          { text: 'C语言', link: '/clang/' },
          { text: '图示速查', link: '/diagram/' },
          { text: '资料收藏', link: '/collection/' },
          { text: 'Github', link: 'https://github.com/yx91490' },
          { text: '给我留言', link: 'https://github.com/yx91490/yx91490.github.io/issues/new' },
          // { text: '微信公众号', link: 'https://weixin.sogou.com/weixin?query=图解代码' },
        ]
      }
    ],
    displayAllHeaders: true,
    activeHeaderLinks: false,
  },
  plugins: [
    ['@vuepress/medium-zoom'],
    ['@vuepress/plugin-google-analytics', { ga: 'UA-140404299-1' }],
    ['vuepress-plugin-right-anchor',
      {
        showDepth: 3,
        ignore: ['/'],
        expand: {trigger: 'click', clickModeDefaultOpen: false }
      }
    ]
  ],
  markdown: {
    anchor: {
      permalinkSymbol: '$'
    },
  }
}

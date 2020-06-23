module.exports = {
  title: "yx91490的博客",
  description: 'java, 大数据(hadoop, sqoop, kylin, zeppelin)相关技术, 工作经验记录',
  head: [
    ['meta', { name: 'google-site-verification', content: 'j1Gm2ZeMV3D7mPiI08fpx91dEOSlhCAJjD4vy_pSroQ'}],
    ['meta', { name: 'baidu-site-verification', content: '4z2bGbjYMB'}],
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],
  themeConfig: {
    sidebar: {
    '/java': [ 
      {
        title: 'Java环境',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/java/java-env/jdk_tools',
          '/java/java-env/class_path',
          '/java/java-env/mat_cmd_tool',
          '/java/java-env/maven',
          '/java/java-env/maven_modules',
          '/java/java-env/maven_assembly_spi',
          '/java/java-env/maven_release_jar',
        ]
      },
      {
        title: 'JDK',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          'java/jdk/urlencode',
          '/java/jdk/jdbc',
          '/java/jdk/date_time',
          '/java/jdk/enum',
          '/java/jdk/java_concurrent_framework',
          '/java/jdk/classloader',
          '/java/jdk/jdk_new_features',
          '/java/jdk/red_black_tree',
          '/java/jdk/hashmap',
          '/java/jdk/concurrent-hashmap',
          '/java/jdk/ieee754',
          // '/java/jdk/resource_close',
          // '/java/jdk/java8_lambda',
          '/java/jdk/io',
          '/java/jdk/not_catch_throw_error',
          '/java/jdk/no_such_method_error',
        ]
      },
      {
        title: 'JVM',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/java/jvm/jvm_parameter',
          '/java/jvm/gc',
          '/java/jvm/java_memory_model',
          '/java/jvm/cms_parnew_gc_log_format',
          '/java/jvm/java_runtime_data_region',
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
        title: '线程',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/java/thread/multi_thread',
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
        title: 'Linux',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          'java/jdk/joda_time_interval',
          'java/jdk/joda_time_period',
          'java/jdk/joda_time_quickstart',
          'java/linux/kill_signal',
          '/java/linux/docker',
          '/java/linux/rpm_yum',
          '/java/linux/shell',
          '/java/linux/ssh_timeout',
          '/java/linux/netstat',
          'java/linux/systemd',
          '/java/linux/systemd_blog',
          '/java/linux/genymotion_install',
          '/java/linux/centos6_centos7_diff',
          '/java/linux/systemd_wiki',
          '/java/linux/genymotion_install',
          '/java/linux/win10_grub',
          '/java/linux/wsl',
          '/java/linux/debian_mirror',
          '/java/linux/debian_vm',
          '/java/linux/debian_apt_source',
          '/java/linux/install_ubuntu_on_xps13',
          '/java/linux/virtualbox_debian',
          '/java/linux/compile_ibus-libpinyin',
          '/java/linux/soucelist_in_ubuntu',
        ]
      },
      {
        title: 'C语言',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/java/clang/c_qsort',
          '/java/clang/c_keyword',
          '/java/clang/c_array_func',
          '/java/clang/c_mem_model',
          '/java/clang/c_pointer_array',
          '/java/clang/arguments_parameter_diff',
        ]
      },
      {
        title: 'SQL',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          //'/java/sql/transaction',
          '/java/sql/sql_join',
          // '/java/sql/mysql',
          '/java/sql/mysql_grant',
          '/java/sql/mysql_import_export',
          '/java/sql/mysql_installation',
          '/java/sql/mysql_column_width',
          '/java/sql/mysql_group_concat',
          'java/sql/oracle_db_data_type.md',
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
          '/java/architecture/distributed_delay_queue',
          '/java/architecture/distribute_transaction',
          '/java/architecture/redis_distributelock',
          '/java/architecture/short_url_design',
          '/java/architecture/three_layer',
        ]
      },
      {
        title: '经验',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/java/linux/static_blog',
        ]
      },
      {
        title: 'Tomcat',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/java/tomcat/tomcat_400',
          // '/java/tomcat/rest_api_design',
          '/java/tomcat/tomcat_host',
        ]
      },
      {
        title: '开发工具',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/java/tools/git',
          '/java/tools/editor',
          '/java/tools/vim',
          '/java/tools/idea_template',
          '/java/tools/install_gnu_cli_on_macos',
          '/java/tools/svn_commit_old_branch',
          '/java/tools/svn_local_delete',
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
        title: 'Kylin',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/bigdata/kylin/read_kylin_source',
        ]
      },
      {
        title: 'Sqoop',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/bigdata/sqoop/sqoop_mysql_temp_file',
          '/bigdata/sqoop/sqoop_usage',
          '/bigdata/sqoop/sqoop_hcatalog',
        ]
      },
      {
        title: 'ZooKeeper',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/bigdata/zookeeper/zookeeper',
          '/bigdata/zookeeper/zk_distribute_lock',
        ]
      },
      {
        title: 'Hadoop',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/bigdata/hadoop/hadoop_command',
          '/bigdata/hadoop/hadoop_interview',
          '/bigdata/hadoop/yarn',
          '/bigdata/hadoop/distcp',
          '/bigdata/hadoop/port',
        ]
      },
      {
        title: 'HDFS',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/bigdata/hdfs/columnar_storage_parquet_orc',
          '/bigdata/hdfs/avro_specification_1.8.1',
        ]
      },
      {
        title: 'MapReduce',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/bigdata/mapreduce/mapreduce',
        ]
      },
      {
        title: 'HIVE',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/bigdata/hive/impala',
          '/bigdata/hive/beeline',
          '/bigdata/hive/hive_ql',
          '/bigdata/hive/hive_data_type',
          '/bigdata/hive/hive_bucket',
          '/bigdata/hive/hive_principle',
          '/bigdata/hive/hive_optimize',
          '/bigdata/hive/hive_parse_json',
        ]
      },
      {
        title: 'HBase',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/bigdata/hbase/hbase_interview',
          '/bigdata/hbase/hbase_issue',
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
        ['/java/', 'Java'],
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
          { text: '图示速查', link: '/diagram/' },
          { text: '资料收藏', link: '/collection/' },
          { text: 'Github', link: 'https://github.com/yx91490' },
          { text: '给我留言', link: 'https://github.com/yx91490/yx91490.github.io/issues/new' },
          { text: '微信公众号', link: 'https://weixin.sogou.com/weixin?query=图解代码' },
        ]
      }
    ],
//    displayAllHeaders: true,
    activeHeaderLinks: false,
  },
  plugins: [
    ['@vuepress/plugin-google-analytics', {
        ga: 'UA-140404299-1' // UA-00000000-0
    }],
  ]
}

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
        title: 'Redis',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/java/redis/redis',
          '/java/redis/cache', 
        ]
      },
      {
        title: 'Java环境',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/java/java-env/maven',
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
        ]
      },
    ],
    '/bigdata': [
      {
        title: '笔记',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/bigdata/note/oss_note', 
        ]
      },
      {
        title: 'Zeppelin',
        collapsable: false,
        sidebarDepth: 0,
        children: [
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
    ],
    '/work-notes': [
      {
        title: 'Java',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/work-notes/java/slf4j_nop',
          '/work-notes/java/tomcat_400', 
          '/work-notes/java/not_catch_throw_error',
          '/work-notes/java/no_such_method_error',
          '/work-notes/java/httpclient_fluent_trap',
          '/work-notes/java/poi_full_gc',
          '/work-notes/java/maven_modules',
          '/work-notes/java/ctrl_char_in_json',
          // '/work-notes/java/rest_api_design',
          '/work-notes/java/date_time',
          '/work-notes/java/spring_url_pattern',
          '/work-notes/java/javamail',
          '/work-notes/java/maven_assembly_spi',
          '/work-notes/java/tomcat_host',
        ]
      },
      {
        title: '架构',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/work-notes/architecture/design_pattern',
          '/work-notes/architecture/distributed_delay_queue',
          '/work-notes/architecture/distribute_transaction',
          '/work-notes/architecture/redis_distributelock',
          '/work-notes/architecture/short_url_design', 
        ]
      },
      {
        title: 'linux',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/work-notes/linux/netstat',
          '/work-notes/linux/centos6_centos7_diff',
          '/work-notes/linux/rpm_yum',
          '/work-notes/linux/shell', 
        ]
      },
      {
        title: 'SQL',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/work-notes/sql/transaction', 
          '/work-notes/sql/sql_join',
          // '/work-notes/sql/mysql',
          '/work-notes/sql/mysql_grant',
          '/work-notes/sql/mysql_import_export',
          '/work-notes/sql/mysql_installation',
          '/work-notes/sql/mysql_column_width',
          '/work-notes/sql/mysql_group_concat',
        ]
      },
      {
        title: '开发工具',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/work-notes/tools/git',
          '/work-notes/tools/svn_local_delete', 
          '/work-notes/tools/svn_commit_old_branch',
          '/work-notes/tools/editor',
          '/work-notes/tools/vim',
          '/work-notes/tools/typora',
          '/work-notes/tools/idea_template',
          '/work-notes/tools/maven_release_jar',
          // '/work-notes/tools/install_gnu_cli_on_macos',
        ]
      },
      {
        title: 'C语言',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/work-notes/clang/c_keyword',
          '/work-notes/clang/c_qsort',
          '/work-notes/clang/arguments_parameter_diff',
          '/work-notes/clang/c_array_func',
          '/work-notes/clang/c_pointer_array',
          '/work-notes/clang/c_mem_model', 
        ]
      },
      {
        title: '其他',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/work-notes/other/install_ubuntu_on_xps13',
          '/work-notes/other/genymotion_install',
          '/work-notes/other/debian_apt_source',
          '/work-notes/other/compile_ibus-libpinyin',
          '/work-notes/other/virtualbox_debian',
          '/work-notes/other/soucelist_in_ubuntu',
          '/work-notes/other/debian_vm',
          '/work-notes/other/win10_grub',
          '/work-notes/other/systemd_wiki',
          '/work-notes/other/debian_mirror',
          '/work-notes/other/wsl',
          '/work-notes/other/systemd_blog', 
        ]
      },
    ],
    '/':[
        ['', '首页'],
        ['/java/', 'Java'],
        ['/bigdata/', '大数据'],
        ['/work-notes/', '工作笔记'],
      ]
    },
    nav: [
      { text: 'Java', link: '/java/' },
      { text: '大数据', link: '/bigdata/' },
      { text: '工作笔记', link: '/work-notes/' },
      { text: '资料收藏', link: '/collection/' },
      {
        text: '联系我',
        ariaLabel: 'contactMe',
        items: [
          { text: 'Github', link: 'https://github.com/yx91490' },
          { text: '给我留言', link: 'https://github.com/yx91490/yx91490.github.io/issues/new' },
          { text: '微信公众号', link: 'https://weixin.sogou.com/weixin?query=图解代码' },
        ]
      }
    ],
//    displayAllHeaders: true,
    activeHeaderLinks: false,
  }
}

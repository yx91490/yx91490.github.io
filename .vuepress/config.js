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
          '/java/java-env/maven',
          '/java/java-env/jdk_tools',
          '/java/java-env/class_path',
          '/java/java-env/mat_cmd_tool',
          '/java/java-env/proguard',
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
      {
        title: 'SQL',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/java/sql/transaction',
          '/java/sql/sql_join',
          // '/java/sql/mysql',
          '/java/sql/mysql_grant',
          '/java/sql/mysql_import_export',
          '/java/sql/mysql_installation',
          '/java/sql/mysql_column_width',
          '/java/sql/mysql_group_concat',
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
        title: '工作问题记录',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/java/work-notes/slf4j_nop',
          '/java/work-notes/tomcat_400',
          '/java/work-notes/not_catch_throw_error',
          '/java/work-notes/no_such_method_error',
          '/java/work-notes/httpclient_fluent_trap',
          '/java/work-notes/poi_full_gc',
          '/java/work-notes/maven_modules',
          '/java/work-notes/ctrl_char_in_json',
          // '/java/work-notes/rest_api_design',
          '/java/work-notes/date_time',
          '/java/work-notes/spring_url_pattern',
          '/java/work-notes/javamail',
          '/java/work-notes/maven_assembly_spi',
          '/java/work-notes/tomcat_host',
        ]
      },
      {
        title: '开发工具',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/work-notes/tools/git',
          '/work-notes/tools/editor',
          '/work-notes/tools/vim',
          '/work-notes/tools/idea_template',
          '/work-notes/tools/install_gnu_cli_on_macos',
          '/work-notes/tools/svn_commit_old_branch',
          '/work-notes/tools/svn_local_delete',
          '/work-notes/tools/typora',
          '/work-notes/tools/maven_release_jar',
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
    '/work-notes': [
      {
        title: '经验',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/work-notes/other/static_blog',
        ]
      },
      {
        title: 'linux',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/work-notes/linux/rpm_yum',
          '/work-notes/linux/shell',
          '/work-notes/linux/netstat',
          '/work-notes/other/systemd_blog',
          '/work-notes/other/genymotion_install',
          '/work-notes/linux/centos6_centos7_diff',
          '/work-notes/other/systemd_wiki',
          '/work-notes/other/genymotion_install',
          '/work-notes/other/win10_grub',
          '/work-notes/other/wsl',
          '/work-notes/other/debian_mirror',
          '/work-notes/other/debian_vm',
          '/work-notes/other/debian_apt_source',
          '/work-notes/other/install_ubuntu_on_xps13',
          '/work-notes/other/virtualbox_debian',
          '/work-notes/other/compile_ibus-libpinyin',
          '/work-notes/other/soucelist_in_ubuntu',
        ]
      },
      {
        title: 'C语言',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/work-notes/clang/c_qsort',
          '/work-notes/clang/c_keyword',
          '/work-notes/clang/c_array_func',
          '/work-notes/clang/c_mem_model',
          '/work-notes/clang/c_pointer_array',
          '/work-notes/clang/arguments_parameter_diff',
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
      { text: '图示速查', link: '/diagram/' },
      { text: 'Java开发', link: '/java/' },
      { text: '大数据', link: '/bigdata/' },
      { text: '其他笔记', link: '/work-notes/' },
      { text: '资料收藏', link: '/collection/' },
      {
        text: '其他',
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

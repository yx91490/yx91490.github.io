module.exports = {
  description: 'java, 大数据(hadoop, sqoop, kylin, zeppelin)相关技术, 工作经验记录',
  head: [
    ['meta', { name: 'google-site-verification', content: 'j1Gm2ZeMV3D7mPiI08fpx91dEOSlhCAJjD4vy_pSroQ'}],
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],
  themeConfig: {
    sidebar: {
      '/java': [
        {
          title: 'Java',
          path: '/java-env',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            '/java/java-env/maven',
            '/java/java-env/class_path',
          ],
        },
        {
          title: 'JDK',
          path: 'jdk',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            '/java/jdk/ClassLoader',
            '/java/jdk/jdk_new_features',
          ],
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
      {
        text: '更多',
        ariaLabel: 'more',
        items: [
          { text: '资料收藏', link: '/collection/' },
          { text: 'Github', link: 'https://github.com/yx91490' },
          { text: '给我留言', link: 'https://github.com/yx91490/yx91490.github.io/issues' },
        ]
      }
    ],
//    displayAllHeaders: true,
//    activeHeaderLinks: false,
  }
}

# Github Pages + VuePress + Github Actions 搭建个人静态博客

*2019年10月2日*

### 历程

写博客对技术人员来说是一个好习惯，我是一个不太爱折腾的人，更倾向于托管博客而不是自己费事搭建（穷）。在此之前尝试过国内CSDN和OSChina的博客，文章的曝光量不错，但是后来要实名认证，然后发现了GitBook体验不错，但是升级之后成为一个商业性质产品，最终还是把目光落在Github Pages上。

但是原生的Pages不能满足我所有的需求：

1. 能将[markdown格式](https://guides.github.com/features/mastering-markdown)文件渲染成html，排版要尽量美观。
2. 很多主题都要用到NodeJs，对于Java程序员来说太折腾了，最好轻量化一点。
3. 可以像GitBook那样建几个专题，分门别类的整理博客而不是一股脑按时间排序。

尝试使用过[hugo](http://hugo.io)，hugo安装构建都比较简单轻量，但是每个md文件头都要写入文章的元信息（front matter），感觉对md文件有侵入性，主题也没有特别中意的。

偶然发现了[docsify.js](https://docsify.js.org)，这是一个仿[vue官网](https://cn.vuejs.org/)风格的js库，是我喜欢的简洁又不失美观的风格，文档则可以按照自己的想法组织成多级目录分门别类的进行归档整理，当然最酷的是可以直接渲染md文件而无需构建html，非常省事。但是这样做也有一个缺点对搜索引擎不友好，这也是单页面应用的通病。

后来发现vue官网是用[vuepress](http://vuepress.vuejs.org)搭建的，它的理念之一也是希望对搜索引擎更友好。虽然也是NodeJs的产物，但是照着vuepress官网学习了一下发现还是比较简单的。

使用NodeJs搭建的博客可能需要自己构建出html文件push到github仓库，但是将md文件和构建出的html混到同一个仓库不是很优雅；结合webhook使用CI工具是一个相对比较优雅的解决方案。最近Github推出了[Github Actions](https://github.com/features/actions)服务，这有点类似Github推出了自己的CI服务，有了这个之后便给了Github Pages更多玩法，使得博客编写构建发布的整个流程连贯了起来。

目前我的博客是使用Github Pages + VuePress + Github Actions搭建的，大家可以参考：

### 仓库设置

个人Pages仓库是http://github.com/yx91490/yx91490.github.io，限制了只能从master分支构建，所以新建了一个gh-pages分支作为源文件分支：

![image-20191002220411763](./assets/image-20191002220411763.png)

仓库目录结构如下：

```
.
├── .gitignore
├── .nojekyll
├── .github
    └── workflows
        └── workflow.yml //actions配置文件
├── .vuepress
│   ├── config.js    //vuepress配置文件
│   ├── dist         //html发布内容
│   └── public       //静态资源文件
├── README.md        //对应index.html
├── java
│   ├── README.md
│   ├── jdk
│   ├── jvm
│   └── library
└── bigdata
    ├── README.md
    └── tools
```

### VuePress配置

`.vuepress/config.js` 文件主要配置了title，description等标签，一些meta标签，导航栏和侧边栏：

```javascript
module.exports = {
  title: "yx91490的博客",
  description: 'java, 大数据(hadoop, sqoop, kylin, zeppelin)相关技术, 工作经验记录',
  head: [
    ['meta', { name: 'google-site-verification', content: 'xxxxxxx'}],
    ['meta', { name: 'baidu-site-verification', content: 'xxxxxx'}],
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],
  themeConfig: {
    sidebar: {
    '/java': [                          // 侧边栏分组
      {
        title: 'Java环境',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/java/java-env/maven',        // 对应java/java-env/maven.md文件
          '/java/java-env/jdk_tools', 
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
    ],
    '/':[
        ['', '首页'],
        ['/java/', 'Java'],             // 需要注意一些路径前后的“/”
        ['/bigdata/', '大数据'],
      ]
    },
    nav: [
      { text: 'Java', link: '/java/' },
      { text: '大数据', link: '/bigdata/' },
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
```

### Github Actions配置

参考阮一峰老师的文章：http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html，需要注意配置token的那一步，[自己博客](https://yx91490.github.io)的配置：

```yaml
name: Github Pages CD
on:
  push:
    branches:
      - gh-pages                        # 监听源文件分支的push事件
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
    - name: "Step1: Checkout Code"
      uses: actions/checkout@v1

    - name: "Step2: Build And Deploy"
      uses: JamesIves/github-pages-deploy-action@master
      env:
        ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
        BASE_BRANCH: gh-pages           # 从gh-pages分支构建
        BRANCH: master                  # 输出到master分支
        FOLDER: .vuepress/dist          # 构建出的html目录
        BUILD_SCRIPT: npm install -D vuepress && npx vuepress build .
```

### 评论功能

评论功能目前可用的包括基于Github Issues的[Gitment](https://github.com/imsun/gitment)，但是为了省事我只是添加了个留言的链接。

### 统计功能

暂未实现。

### 总结

具体细节可以参考我博客仓库的配置，欢迎留言讨论。

### 参考

- [GitHub Actions 入门教程](http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)
- [Vue 驱动的静态网站生成器](https://vuepress.vuejs.org/zh/)


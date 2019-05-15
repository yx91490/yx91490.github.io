```
Using platform encoding (GBK actually) to copy filtered resources, i.e. build is platform dependent!
```

### 解决方案

Maven作为build工具时经常出现此问题，原因是未指定具体编码方式，通过在pom.xml指定编码方式可解决此问题。

```
<project>  
  ...  
  <properties>  
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>  
  </properties>  
  ...  
</project>
```

Maven官网在FAQ中，列出了这个：[How do I prevent “[WARNING\] Using platform encoding (Cp1252 actually) to copy filtered resources, i.e. build is platform dependent!”](http://maven.apache.org/general.html#encoding-warning)

补充：如果是通过导航来创建maven工程，该配置缺省会被创建。
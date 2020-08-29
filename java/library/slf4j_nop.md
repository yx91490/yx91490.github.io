# slf4jNOP问题

刚接手一个新项目,发现打日志竟然用System.out.println,果断用上slf4j的Logger,后来改动了一下pom发现日志打不出来了,服务启动的时候出现如下错误:
![slf4j_nop](./slf4j_nop.assets/slf4j_nop.png)

查[资料](https://stackoverflow.com/questions/7421612/slf4j-failed-to-load-class-org-slf4j-impl-staticloggerbinder)发现是因为项目只依赖了slf4j的接口没有绑定实现,加上slf4j-log4j12依赖就可以了。
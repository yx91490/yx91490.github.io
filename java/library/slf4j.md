# 日志框架

### 常见问题总结

1. slf4j应该有且仅有一个绑定的日志框架.
2. 通常slf4j的绑定是`slf4j-nop.jar` `slf4j-simple.jar`,`slf4j-log4j12.jar`, `slf4j-jdk14.jar` , `logback-classic.jar`中的一个.
3.  如果在classpath中找不到相应的绑定则会打印`Failed to load class org.slf4j.impl.StaticLoggerBinder`的异常;
4. 如果有多于一个的绑定,则会打印`Multiple bindings were found on the class path`的异常
5. 设置`slf4j.detectLoggerNameMismatch`系统属性检查logger名称不匹配的问题.
6. slf4j-api和相应的绑定包的版本应该保持一致.
7. `log4j-over-slf4j.jar`用来把对log4j的调用重定向到slf4j,和`slf4j-log4j12.jar`混用会导致`StackOverflowError`.
8. `jcl-over-slf4j.jar`用来把对JCL的调用重定向到slf4j,和`slf4j-jcl.jar`混用会导致`StackOverflowError`.

> https://www.slf4j.org/codes.html

### LoggerFactory初始化过程

1. 检查classpath中是否有多个staticLoggerBinder并警告
2. StaticLoggerBinder初始化
3. 把状态置为`SUCCESSFUL_INITIALIZATION`
4. 把SubstituteLogger委派给真实的logger
5. 重演事件?
6. 可能的检查logger名不一致

### SPI机制

1.8版本的slf4j通过spi机制实现对具体日志框架的加载,避免了在slf4j-api包中去掉StaticLoggerBinder类的丑陋做法.

接口类是`org.slf4j.spi.SLF4JServiceProvider`,在绑定包中实现该接口,并在classpath的META-INFO/services/org.slf4j.spi.SLF4JServiceProvider文件中指明实现类的全类名.

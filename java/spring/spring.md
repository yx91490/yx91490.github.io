# Spring

## Spring常用注解

@Bean

@Autowired

@Configration 注解将该类声明为一个配置类。

@ConditionalOnBean：当容器里有指定Bean的条件下

@ConditionalOnMissingBean：当容器里没有指定Bean的情况下

@ConditionalOnMissingClass：当容器里没有指定类的情况下

@ConditionalOnProperty：指定的属性是否有指定的值

@EnableConfigurationProperties的作用: 使@ConfigurationProperties 注解的类生效。

@Scope("prototype") 表示每次获得bean都会生成一个新的对象

@AutoConfigureAfter 在加载配置的类之后再加载当前类

## Spring Boot官方文档

参考：

- [Spring Boot Reference Guide](https://docs.spring.io/spring-boot/docs/2.0.4.RELEASE/reference/htmlsingle/)

## Spring Boot开启debug

应用程序启动报错：

```
Error starting ApplicationContext. To display the conditions report re-run your application with 'debug' enabled. 
```

在application.properties配置文件中加入下面配置进行调试：

```
debug=true
```

## Spring Boot自带执行脚本

参考：

- [launch.script](https://github.com/spring-projects/spring-boot/blob/master/spring-boot-project/spring-boot-tools/spring-boot-loader-tools/src/main/resources/org/springframework/boot/loader/tools/launch.script)
- [55. Installing Spring Boot applications](https://docs.spring.io/spring-boot/docs/1.3.x-SNAPSHOT/reference/html/deployment-install.html)

## Spring Boot向容器注册Bean的多种方式

- 通过@ComponentScan注册Bean
- 通过@Bean注册Bean
- 通过@Import注册Bean

通过@ComponentScan注册Bean
Spring容器会扫描@ComponentScan配置的包路径，找到标记@Component注解的类加入到Spring容器。效果等同于XML配置文件中的<context:component-scan base-package="包名">。java8之后一个类可以标记多个@ComponentScan扫描规则。

### 通过@ComponentScan注册Bean

| 常用属性名     | 类型     | 说明                       |
| -------------- | -------- | -------------------------- |
| includeFilters | Filter[] | 指定扫描导入类型的过滤规则 |
| excludeFilters | Filter[] | 指定扫描排除类型的过滤规则 |
|                |          |                            |

#### @Component说明

常见继承： 
- @Configuration：标记类为配置类，常与@ComponentScan或@Bean注解一起使用 
- @Controller 
- @Repository 
- @Service

### 通过@Bean注册Bean

标记在方法上，将方法返回值注册到Spring容器，类型为返回值类型，id默认为方法名。

效果等同于XML配置文件中的`<bean id="beanName" class="className"/>`

### 通过@Import注册Bean

直接注册指定类：

```java
// 启动类
@Import({ ImportTest.class })
public class RegistryBean {
    public static void main(String[] args) throws Exception {
        ConfigurableApplicationContext context = SpringApplication.run(RegistryBean.class, args);
        String[] beanNames = context.getBeanDefinitionNames();
        for (String beanName : beanNames) {
            System.out.println(beanName);
        }
    }
}

public class ImportTest {
}
```

配合ImportSelector接口注册指定类，同时修改启动类上注解`@Import({ ImportTest.class })`为`@Import({ ImportTest.class，ImportSelectorTest .class })`：

```java
public class ImportSelectorTest implements ImportSelector {
    // ImportSelector接口定义的方法
    // Spring容器会传入当前标记@Import的类的全部注解元数据，用于读取注解中的配置
    // 返回需要注册的全类名，Spring容器会自动注册这些类
    // 注意：不能返回null
    @Override
    public String[] selectImports(AnnotationMetadata importingClassMetadata) {
        // 返回想要注册的全类名
        return new String[] { ImportBeanTest.class.getName() };
    }
}

public class ImportBeanTest {
}
```

配合ImportBeanDefinitionRegistrar接口注册指定类，同时修改启动类上注解`@Import({ ImportTest.class })`为`@Import({ ImportTest.class,ImportSelectorTest.class, ImportBeanDefinitionRegistrarTest.class })`：

```java
public class ImportBeanDefinitionRegistrarTest implements ImportBeanDefinitionRegistrar {
    // ImportBeanDefinitionRegistrar接口定义的方法
    // Spring容器会传入当前标记@Import的类的全部注解元数据和Bean定义信息注册类
    // Spring容器会按照注册类中注册的Bean定义信息进行实例化Bean组件
    @Override
    public void registerBeanDefinitions(AnnotationMetadata importingClassMetadata, BeanDefinitionRegistry registry) {
        // 包装Bean定义信息并进行注册
        RootBeanDefinition beanDefinition = new RootBeanDefinition(String.class);
        registry.registerBeanDefinition("ImportBeanDefinitionRegistrar测试类", beanDefinition);
    }
}
```

### 参考

- [SpringBoot-向容器注册Bean的多种方式](https://blog.csdn.net/weixin_38229356/article/details/80699973)
- [Spring Boot 使用Java代码创建Bean并注册到Spring中](https://blog.csdn.net/catoop/article/details/50558333)

## SpringBoot配置静态资源缓存

配置application.properties（核心类是`org.springframework.boot.autoconfigure.web.ResourceProperties`）：

```
# 缓存1小时
spring.resources.cache.cachecontrol.max-age=3600
```



## Spring加载配置文件

Spring 提供了一个 ResourceUtils 工具类，它支持“classpath:”和“file:”的地址前缀，它能够从指定的地址加载文件资源：

```
File f =  ResourceUtils.getFile("classpath:sqlscript/a.sql");
```

> 注意： ResouceUtils.getFile()用来加载非压缩和Jar包文件类型的资源，要想加载Jar中的文件,只要用可以读取jar中文件的方式加载即可,比如 xxx.class.getClassLoader().getResouceAsStream()这种以流的形式读取文件的方式.

```
ClassPathResource resource = new ClassPathResource("myFile.txt");
String filename = resource.getFilename();
InputStream input = resource.getInputStream();
```

### 参考

- [ResouceUtils.getFile()取不到Jar中资源文件源码小结](https://www.cnblogs.com/chyu/p/8407541.html)
- [spring的ResourceUtils工具类简单应用](https://blog.csdn.net/shuist_king/article/details/69664961)
- [SpringBoot不要使用ResourceUtils读取资源文件](https://blog.csdn.net/baQiWangZhengLiang/article/details/84568846)
- [Spring Boot使用ResourceUtils FileNotFoundException的一次采坑经历](https://www.jianshu.com/p/e06534f307a4)
- [SpringBoot web项目下读取classpath下的文件心得](https://www.cnblogs.com/liaoguanwang/p/9749995.html)

## SpringBoot命令行注入属性

```
java -jar xxx.jar --server.port=8888
```



## 命令行运行指定的类

```java
@SpringBootApplication
@Profile("manual") //确保default Profile下不会激活
public class SpringBootConsoleApplication implements CommandLineRunner {
    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(JDBCBenchmark.class);
        app.setWebApplicationType(WebApplicationType.NONE);
        app.run(args);
    }
    @Override
    public void run(String... args) {
    }
}
```

```
java -Dspring.profiles.active=manual -cp $classpath foo.MainClass arg1, arg2...
```

## 开启访问日志

```properties
# accesslog
server.tomcat.basedir=./
# Enable access log.
server.tomcat.accesslog.enabled=true
# Whether to buffer output such that it is flushed only periodically.
server.tomcat.accesslog.buffered=false
# Directory in which log files are created. Can be absolute or relative to the Tomcat base dir.
server.tomcat.accesslog.directory=logs
# Log file name prefix.
server.tomcat.accesslog.prefix=access_log
# Log file name suffix.
server.tomcat.accesslog.suffix=.log
# Date format to place in the log file name.
server.tomcat.accesslog.file-date-format=.yyyy-MM-dd
# Number of days to retain the access log files before they are removed.
server.tomcat.accesslog.max-days=-1
# Format pattern for access logs.
server.tomcat.accesslog.pattern=common
server.tomcat.accesslog.rename-on-rotate=false
server.tomcat.accesslog.request-attributes-enabled=false
server.tomcat.accesslog.rotate=true
```

Access log内置了两个日志格式模板：

- **common** - `%h %l %u %t "%r" %s %b`，依次为：远程主机名称，远程用户名，被认证的远程用户，日期和时间，请求的第一行，response code，发送的字节数
- **combined** - `%h %l %u %t "%r" %s %b "%{Referer}i" "%{User-Agent}i"`，依次为：远程主机名称，远程用户名，被认证的远程用户，日期和时间，请求的第一行，response code，发送的字节数，request header的Referer信息，request header的User-Agent信息。

pattern的配置：

- **%a** - Remote IP address，远程ip地址，注意不一定是原始ip地址，中间可能经过nginx等的转发
- **%A** - Local IP address，本地ip
- **%b** - Bytes sent, excluding HTTP headers, or '-' if no bytes were sent
- **%B** - Bytes sent, excluding HTTP headers
- **%h** - Remote host name (or IP address if `enableLookups` for the connector is false)，远程主机名称(如果resolveHosts为false则展示IP)
- **%H** - Request protocol，请求协议
- **%l** - Remote logical username from identd (always returns '-')
- **%m** - Request method，请求方法（GET，POST）
- **%p** - Local port，接受请求的本地端口
- **%q** - Query string (prepended with a '?' if it exists, otherwise an empty string
- **%r** - First line of the request，HTTP请求的第一行（包括请求方法，请求的URI）
- **%s** - HTTP status code of the response，HTTP的响应代码，如：200,404
- **%S** - User session ID
- **%t** - Date and time, in Common Log Format format，日期和时间，Common Log Format格式
- **%u** - Remote user that was authenticated
- **%U** - Requested URL path
- **%v** - Local server name
- **%D** - Time taken to process the request, in millis，处理请求的时间，单位毫秒
- **%T** - Time taken to process the request, in seconds，处理请求的时间，单位秒
- **%I** - current Request thread name (can compare later with stacktraces)，当前请求的线程名，可以和打印的log对比查找问题

参考：

- [Apache Tomcat 8 Configuration Reference](https://tomcat.apache.org/tomcat-8.5-doc/config/valve.html#Access_Logging)
- [Common Application properties](https://docs.spring.io/spring-boot/docs/current/reference/html/appendix-application-properties.html)
- [springboot中配置tomcat的access log](https://www.cnblogs.com/shamo89/p/8134865.html)

### 参考

- [Springboot 命令注入属性](https://www.cnblogs.com/wuxinshui/p/10983942.html)
- [Sping Doc - Common Application properties](https://docs.spring.io/spring-boot/docs/current/reference/html/appendix-application-properties.html)
- [Prevent Application / CommandLineRunner classes from executing during JUnit testing](https://stackoverflow.com/questions/29344313/prevent-application-commandlinerunner-classes-from-executing-during-junit-test)
- [Spring Boot without the web server](https://stackoverflow.com/questions/26105061/spring-boot-without-the-web-server)
- [How can I run a specific class / utility in a Spring Boot application with wiring?](https://stackoverflow.com/questions/52778546/how-can-i-run-a-specific-class-utility-in-a-spring-boot-application-with-wirin)

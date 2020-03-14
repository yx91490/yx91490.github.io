# 使用Proguard混淆Spring Boot项目代码

> 发布日期：2019-12-03

项目中需要对代码进行混淆处理，由于项目是标准的maven项目，便使用了`proguard-maven-plugin`来自动化混淆过程，但是在使用过程中也不免踩到了一些坑，网上也很少有提及，在此记录一下。

### 踩过的坑

#### spring bean名称冲突问题

默认proguard混淆后的类名类似a.class，b.class，但是不同包路径下类名可能发生重名，在spring中默认会把类名作为bean的名称，导致会报spring bean名称冲突的问题，可以通过重新实现`BeanNameGenerator`接口来解决：

```java
@SpringBootApplication
@ComponentScan("com.abc.def")
public class Application {

    public static void main(String[] args) {
        new SpringApplicationBuilder(Application.class)
                .beanNameGenerator(new CustomBeanNameGenerator())
                .run(args);
    }

    private static class CustomBeanNameGenerator implements BeanNameGenerator {
        @Override
        public String generateBeanName(BeanDefinition d, BeanDefinitionRegistry r) {
            return d.getBeanClassName();
        }
    }
}
```

#### spring获取不到jar包里的包路径

spring boot启动后实现`ApplicationRunner`接口的初始化类并没有执行，也没有错误日志产生。后来把spring容器注册的Bean打印出来发现除了入口类和spring自己的类都没有加载。spring启动debug模式并调整日志级别为`TRACE`，发现spring没有解析出包含basePackage的jar包来，假设basePackage为`com/abc/def/`，不混淆代码的日志如下：

```
2019-11-24 19:33:49.703 [TRACE] [main] [o.s.c.i.s.PathMatchingResourcePatternResolver : 323] Resolved classpath location [com/abc/def/] to resources [URL [jar:file:/tmp/foo/lib/service-facade-1.0.jar!com/abc/def/], URL [jar:file:/tmp/foo/lib/service-impl-1.0.jar!com/abc/def/]]
```

经proguard混淆后日志如下：

```
2019-11-24 19:33:49.703 [TRACE] [main] [o.s.c.i.s.PathMatchingResourcePatternResolver : 323] Resolved classpath location [com/abc/def/] to resources []
```

但是将混淆后jar包先解压后再压缩处理，却可以正常加载。也就是说proguard在打包过程中把包路径信息丢失了。需要配置`keepdirectories`参数。

#### JDK9编译的jar包类冲突

JDK9编译出来的jar包会和一些类冲突，需要配置`inLibsFilter`排除掉。

#### 多jar包混淆

默认`proguard-maven-plugin`插件只能通过`injar`参数将一个jar包混淆，而常见的项目都是多模块项目，这时就需要通过配置`assembly`参数来实现。

### 参考配置

Pom.xml:

```xml
<plugin>
  <groupId>com.github.wvengen</groupId>
  <artifactId>proguard-maven-plugin</artifactId>
  <version>2.2.0</version>
  <executions>
    <execution>
      <id>release</id>
      <phase>package</phase>
      <goals>
        <goal>proguard</goal>
      </goals>
      <configuration>
        <assembly>
          <inclusions>
            <inclusion>
              <groupId>com.abc.def</groupId>
              <artifactId>lib1</artifactId>
            </inclusion>
            <inclusion>
              <groupId>com.abc.def</groupId>
              <artifactId>lib2</artifactId>
            </inclusion>
          </inclusions>
        </assembly>
        <!--exclude jdk9-->
        <inLibsFilter>!META-INF/versions/9/**.class</inLibsFilter>
        <proguardInclude>proguard.conf</proguardInclude>
        <libs>
          <lib>${java.home}/lib/rt.jar</lib>
          <lib>${java.home}/lib/jce.jar</lib>
        </libs>
        <!--<silent>true</silent>-->
      </configuration>
    </execution>
  </executions>
  <dependencies>
    <dependency>
      <groupId>net.sf.proguard</groupId>
      <artifactId>proguard-base</artifactId>
      <version>6.2.0</version>
    </dependency>
  </dependencies>
</plugin>
```

proguard.conf:

```
-dontshrink
-dontoptimize
-keepdirectories
-adaptclassstrings
-dontusemixedcaseclassnames
-flattenpackagehierarchy 'com.abc.def'
-keepattributes Exceptions,InnerClasses,Signature,Deprecated,SourceFile,LineNumberTable,LocalVariable*Table,*Annotation*,Synthetic,EnclosingMethod

-keep class com.abc.def.Application
-keep class * extends org.springframework.boot.ApplicationRunner

# Keep - Applications. Keep all application classes, along with their 'main'
# methods.
-keepclasseswithmembers public class * {
    public static void main(java.lang.String[]);
}

# Also keep - Enumerations. Keep the special static methods that are required in
# enumeration classes.
-keepclassmembers enum  * {
    public static **[] values();
    public static ** valueOf(java.lang.String);
}

# Keep names - Native method names. Keep all native class/method names.
-keepclasseswithmembers,includedescriptorclasses,allowshrinking class * {
    native <methods>;
}
```

### 参考
1. [Proguard官方文档](https://www.guardsquare.com/en/products/proguard/manual/usage)
2. [proguard-maven-plugin](http://wvengen.github.io/proguard-maven-plugin)
3. [proguard-spring-boot-example](https://github.com/seregaSLM/proguard-spring-boot-example/blob/master/pom.xml)
4. [基于ProGuard-Maven-Plugin的自定义代码混淆插件](https://blog.csdn.net/connect_me/article/details/51320913)
5. [解决Proguard5.3版本不支持含有JDK9代码的Jar包混淆问题](https://blog.csdn.net/gao20009/article/details/84914426)
6. [Bug#35 Missing directory entries in jars](https://sourceforge.net/p/proguard/bugs/35/)
参考：
https://maven.apache.org/shared/maven-archiver/examples/classpath.html  
将classpath信息加入生成的jar中，同时指定依赖jar包的目录前缀：

      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-jar-plugin</artifactId>
        ...
        <configuration>
          <archive>
            <manifest>
              <!-- 将classpath信息加入生成的jar中 -->
              <addClasspath>true</addClasspath>
              <!-- 指定快照版jar名称方式 -->
              <useUniqueVersions>false</useUniqueVersions>
              <!-- 指定依赖jar包的目录前缀 -->
              <classpathPrefix>lib/</classpathPrefix>
            </manifest>
          </archive>
        </configuration>
        ...
      </plugin>
如果不指定`useUniqueVersions`为`false`，那么classpath中快照版的jar名称就变为`${artifactId}-${version}-20150316.032502-62.jar`这种maven库里能唯一定位的形式，而不是`${artifactId}-${version}-SNAPSHOT.jar`这种形式，这会导致运行时ClassNotFoundException。
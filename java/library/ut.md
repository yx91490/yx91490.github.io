# 代码测试笔记

## 单测框架

### Junit4

### Junit5

从 Junit 5 开始，Junit 使用 jupiter 来作为测试引擎。

maven依赖：

```xml
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter-api</artifactId>
    <version>5.3.1</version>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter-engine</artifactId>
    <version>5.3.1</version>
    <scope>test</scope>
</dependency>
```

如果要运行Junit4的代码，maven依赖改为：

```xml
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter-api</artifactId>
    <version>5.3.1</version>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.junit.vintage</groupId>
    <artifactId>junit-vintage-engine</artifactId>
    <version>5.3.1</version>
    <scope>test</scope>
</dependency>
```

#### JUnit4 与 JUnit 5 常用注解对比

| **JUnit4**       | JUnit5             | 说明                                                        |
| ---------------- | ------------------ | ----------------------------------------------------------- |
| **@Test**        | @Test              | 该方法表示一个测试方法                                      |
| **@BeforeClass** | @BeforeAll         | 表示使用了该方法在当前类中所有使用@Test 的方法之前 执行一次 |
| **@AfterClass**  | @AfterAll          | 该方法在当前类中所有使用@Test 的方法之后 执行一次           |
| **@Before**      | @BeforeEach        | 该方法在当前类中每一个使用了@Test方法之前 执行一次          |
| **@After**       | @AfterEach         | 该方法在当前类中每一个使用了@Test方法之后执行一次           |
| **@Ignore**      | @Disabled          | 该方法表示不执行(关闭)该测试方法                            |
| **@Parameters**  | @ParameterizedTest | 该方法是用于参数化数据的                                    |

#### 参考

[JUnit 5 User Guide](https://junit.org/junit5/docs/current/user-guide)

[junit5-samples](https://github.com/junit-team/junit5-samples)

[Executing JUnit 4 and JUnit 5 tests in a same build](https://stackoverflow.com/questions/47158583/executing-junit-4-and-junit-5-tests-in-a-same-build)

[JUnit5 与 JUnit4 区别及及新特性](https://blog.csdn.net/lht3347/article/details/105817377)

[Migrating from JUnit 4 to JUnit 5](https://www.baeldung.com/junit-5-migration)

#### TestNG

### Jacco
# Spring Web

## 一、获取参数

| Content-Type参数形式 | 单个  | 多个同名参数 |
| -------------------- | ----- | ------------ |
| Form表单             | 1.2.1 | 1.2.2        |
| Application/json     | 1.3.1 | 1.3.2        |

### 1.1 Get获取参数

### 1.2 Post获取参数

#### 1.2.1 接收Form表单中的单个参数

| 方式   | 对应方式                       | Form表单示例              | 方法参数示例                                         |
| ------ | ------------------------------ | ------------------------- | ---------------------------------------------------- |
| 方式一 | 每个Form参数映射为一个方法参数 | name=zs,age=18            | @RequestParam String name, @RequestParam Integer age |
| 方式二 | 所有Form参数映射为一个Map      | name=zs,age=18            | @RequestParam Map<String,Object> params              |
| 方式三 | 一个实体类对象                 | user.name=zs, user.age=18 | User user                                            |

> 注：如果Form参数有前缀，且前缀与接收实体类的名称相同，那么参数也是可以正常传递。
>
> 如果一个请求的参数分属不同的对象，也可以使用多个对象来接收参数。

#### 1.2.2 接收Form表单中多个同名参数

@RequestParam注解(数组)

| 方式   | 对应方式                                   | Form表单示例  | 方法参数示例                         |
| ------ | ------------------------------------------ | ------------- | ------------------------------------ |
| 方式一 | 所有Form表单的同名参数映射为同一个方法参数 | name=a,name=b | @RequestParam("name") String[] names |

#### 1.3.1 接收JSON对象

| 方式   | 对应方式               | JSON示例 | 方法参数示例            |
| ------ | ---------------------- | -------- | ----------------------- |
| 方式一 | JSON映射为一个Map参数  |          | @RequestBody Map params |
| 方式二 | JSON映射为一个Bean参数 |          | @RequestBody User user  |

#### 1.3.2 接收JSON数组

| 方式   | 对应方式               | JSON示例 | 方法参数示例                   |
| ------ | ---------------------- | -------- | ------------------------------ |
| 方式一 | JSON映射为一个List参数 |          | @RequestBody List\<User> users |



### 1.5 全局参数日期格式

- Optional<T>
- spring.mvc.date-pattern
- spring.mvc.date-format

[spring-boot 接口请求之Date、LocalDate、LocalDateTime日期类型转换处理](https://blog.csdn.net/xiaoguo1001/article/details/79168441)

[Parsing of LocalDate query parameters in Spring Boot](https://blog.codecentric.de/en/2017/08/parsing-of-localdate-query-parameters-in-spring-boot/)

[gh-5523: Use spring.mvc.date-format to also configure formatting of java.time.LocalDate](https://github.com/spring-projects/spring-boot/pull/9930)

[Change datetime string format in request url when using Spring data rest with QuerydslPredicateExecutor](https://stackoverflow.com/questions/49551834/change-datetime-string-format-in-request-url-when-using-spring-data-rest-with-qu)

[How to use LocalDateTime RequestParam in Spring? ](https://stackoverflow.com/questions/40274353/how-to-use-localdatetime-requestparam-in-spring-i-get-failed-to-convert-string/40276418)

[Working with Date Parameters in Spring](https://www.baeldung.com/spring-date-parameters)



































## 参考

- [SpringBoot - 获取Get请求参数详解（附样例：非空、默认值、数组、对象）](https://www.hangge.com/blog/cache/detail_2484.html)

- [SpringBoot - 获取POST请求参数详解（附样例：表单数据、json、数组、对象）](https://www.hangge.com/blog/cache/detail_2485.html)

  
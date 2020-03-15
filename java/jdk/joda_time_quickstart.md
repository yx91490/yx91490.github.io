# Joda－Time快速上手指导（译文）

> 译自官网：https://www.joda.org/joda-time/quickstart.html

这份指南是对joda－time的一个简介。想查看更多信息请参考完整的[用户指南](http://www.joda.org/joda-time/userguide.html)。

### 日期和时间

日期和时间是一个 十分复杂的领域。joda-time中设计了许多类来完整地阐述这个范畴的细微差别 。

最常用的5个日期时间类是：

- [Instant](http://www.joda.org/joda-time/apidocs/org/joda/time/Instant.html)-	代表时间线上一个 瞬间点的不可变的类。

- [DateTime](http://www.joda.org/joda-time/apidocs/org/joda/time/DateTime.html) 用来替代JDK中Calendar的不可变类。

- [LocalDate](http://www.joda.org/joda-time/apidocs/org/joda/time/LocalDate.html) - 代表一个不带时间的本地日期的不可变类（不分时区）

- [LocalTime](http://www.joda.org/joda-time/apidocs/org/joda/time/LocalTime.html) -代表一个本地时间的不可变类。（不分时区）

- [LocalDateTime](http://www.joda.org/joda-time/apidocs/org/joda/time/LocalDateTime.html) - 表示一个本地日期和时间的不可变类（不分时区）

instant适合表示一个事件的时间戳，因为不必担心历法和时区问题。LocalDate适合表示出生日期，因为没必要指明时间。LocalTime适合表示一天中商店开门或者打烊的时间。DateTime适合作为JDK的Calendar类的一种通用替代者，它比较强调时区的概念。查看关于 [instants](http://www.joda.org/joda-time/key_instant.html) 和 [partials](http://www.joda.org/joda-time/key_partial.html) 的文档。

### 使用日期和时间类

每个日期时间类都提供了各种构造函数，包括对象构造函数。从而允许你从各种不同的对象中构造一个实例对象：例如，一个 DateTime可以从如下的对象中构造出来:

- Date JDK中的瞬间
- Calendar JDK中的日历
- String 遵从ISO8601格式
- Long 毫秒数
- 任何joda-time中的日期时间类

对象构造器不是很常用，使用它是因为以上列出的类型是可扩展的。主要的优势是从一个 JDK的Date类或者一个Calendar类转为 joda-time类非常简单，只需要把这个 类传进构造器。例如 ，下面这段代码把一个 java.util.Date转换为一个DateTime类：

```
  java.util.Date juDate = new Date();
  DateTime dt = new DateTime(juDate);
```
每个 日期时间类提供了访问日期时间[属性](http://www.joda.org/joda-time/field.html)的简便方法。例如，可以通过下面的方式访问月份和年份：

```
  DateTime dt = new DateTime();
  int month = dt.getMonthOfYear();  // 这里1月份是1，十二月份是12
  int year = dt.getYear();
```

和String类似，所有的日期时间类都是在创建之后不能的不可变类，但是可以用提供的简单方法来对一个 新创建的对象中更改属性值。例如，想要对日期时间类设置年份或者加2小时你可以使用下面的方式：

```
  DateTime dt = new DateTime();
  DateTime year2000 = dt.withYear(2000);
  DateTime twoHoursLater = dt.plusHours(2);
```

除了基本的get方法，每个日期时间类对每个属性提供了合适的方法以便充分利用joda-time丰富的功能。例如，获取关于某一月或者某一年的详情：

```
  DateTime dt = new DateTime();
  String monthName = dt.monthOfYear().getAsText();
  String frenchShortName = dt.monthOfYear().getAsShortText(Locale.FRENCH);
  boolean isLeapYear = dt.year().isLeap();
  DateTime rounded = dt.dayOfMonth().roundFloorCopy();
```

### 日历系统和时区

joda-Time支持多种[日历系统](http://www.joda.org/joda-time/key_chronology.html) 和全部的时区，[Chronology](http://www.joda.org/joda-time/apidocs/org/joda/time/Chronology.html) 和 [DateTimeZone](http://www.joda.org/joda-time/apidocs/org/joda/time/DateTimeZone.html) 类提供了这个支持。

joda-Time默认使用ISO日历系统，也是世界各地都在使用的日历。默认的时区和JDK默认时区保持一致。可以在需要的时候更改这些默认值。请注意由于历史原因，1583年之前的ISO日历系统并不精确。

joda-Time使用了可插拨的结构支持多种日历。而JDK使用了像 GregorianCalendar这样的子类来支持多种日历。通过调用一个取决于Chronology具体实现的工厂方法，下面这段代码得到了 一个joda-time的Chronology对象 ：

```
  Chronology coptic = CopticChronology.getInstance();
```

时区是年表的一部分。下面这段代码得到一个东京时区的joda-Time年表：

```
  DateTimeZone zone = DateTimeZone.forID("Asia/Tokyo");
  Chronology gregorianJuian = GJChronology.getInstance(zone);
```

### 时间间隔和时间周期

joda-time支持时间间隔和时间周期。

使用interval类来表示一段时间间隔。它包含了一个开始时间和一个结束时间，允许在这段时间上进行一些操作。

使用Period类来表示一段时间周期。它包含了一段时间周期，像是6个月，3天或7小时。你可以直接创建一个Period，或者从一个interval派生出来。

使用Duration类来表示一段持续时间段。它包含了一个 准确的持续时间段的毫秒数。你可以直接创建一个 Duration类，或者从一个interval对象派生。

尽管period和duration可能很相似，但是他们的操作并不相同 。假如，考虑夏令时的切换时把一个 DateTime加一天：

```
  DateTime dt = new DateTime(2005, 3, 26, 12, 0, 0, 0);
  DateTime plusPeriod = dt.plus(Period.days(1));
  DateTime plusDuration = dt.plus(new Duration(24L*60L*60L*1000L));
```

由于夏令时的切换，这里加上 period只会加23小时而不是24小时。因而结果仍然是午夜。但是无论如何加一个duration将会加24小时 ，因而结果时间 是13:00.

### 更多信息

-  [完整的用户指南](http://www.joda.org/joda-time/userguide.html)
-  [关键概念](http://www.joda.org/joda-time/key.html)
-  [有效的日历系统](http://www.joda.org/joda-time/cal.html)
-  [常见问题](http://www.joda.org/joda-time/faq.html)
-  [Javadoc](http://www.joda.org/joda-time/apidocs/index.html)
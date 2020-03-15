# Joda-Time时间间隔（译文）

> 译自官网：https://www.joda.org/joda-time/key_interval.html

joda-time里的一个interval表示从一个毫秒级的时刻到另一个的时间间隔。两个时刻都是日期时间连续区间上包括时区的具体时刻。

Interval的实现是一个半开区间，也就是说它包括开始的时刻但是不包括结束的时刻。并且Interval被限制只有一个年表和时区。

Interval有获取开始和结束时刻（以及年表和时区）的方法。甚至也有得到Interval的duration和period的方法。

Interval不能比较顺序（例如，他们没有实现Comparable接口，如果你要比较Interval的长度，你必须先获取每个Interval的duration然后比较duration的长度。）

### 使用joda-Time库的Interval

在joda-Time中Interval用ReadableInterval接口表示。这个接口提供了两个实现类：

- [Interval](http://www.joda.org/joda-time/apidocs/org/joda/time/Interval.html) - 一个不可修改的实现类。
- [MutableInterval](http://www.joda.org/joda-time/apidocs/org/joda/time/MutableInterval.html) - 可修改的实现类。

代码可以有多种方式：

```
// 从一个起始时刻到一个结束时刻的interval
DateTime start = new DateTime(2004, 12, 25, 0, 0, 0, 0);
DateTime end = new DateTime(2005, 1, 1, 0, 0, 0, 0);
Interval interval = new Interval(start, end);
```

```
Interval interval = ...
DateTime start = interval.getStart();
DateTime end = interval.getEnd();
Chronology chrono = interval.getChronology();
Duration duration = interval.toDuration();
Period period = interval.toPeriod();
```

需要注意的是，ReadableInterval接口不应该像集合框架API那样使用。

### 空值

joda-Time定义了一个从当前时刻到当前时刻的零长度interval为空interval.因此，

当一个方法定义接收一个ReadableInterval参数时，传入一个null和传入一个零长度的interval在目前是一样的。
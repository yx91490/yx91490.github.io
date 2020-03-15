# Joda-Time时间段（译文）

> 译自官网：https://www.joda.org/joda-time/key_period.html

joda-time中的period对象表示按域表示的一段时间，例如3年5个月2天零7小时 。它和 [duration](http://www.joda.org/joda-time/key_duration.html) 对象的不同 在于它不是精确的毫秒数。只有当指定与它关联 的instant的毫秒数（以及日历和时区信息）时，period才能 解析 为精确的毫秒数。

Period没有 [日历](http://www.joda.org/joda-time/key_chronology.html) 或者时区.可以把它加到instant上，或者interval的任意一端来改变这些对象。在时期时间运算中你可以：

```
      instant  +  period  =  instant
```

例如，考虑1个月的时间段。如果你它加到2月1号（iso）你得到 了3月1号。如果你它加到3月1号（iso）你得到 了4月1号。但是这两种情况下时间间隔的毫秒数是截然不同的。

第2个例子，考虑在夏令时更替时加1天。如果你用period来做加法，那么 要么会加23小时，要么会加25小时。如果你已经创建了一个24小时的duration,你会得到错误的结果。

joda-time库定义了两种类型的period实现，第一种只能保存单一的域，如天或者小时，但不能同时保存这两个域。第2种类型能够保存任何域，表示像5个月8天零7小时这样的值。

### 单一域period

第一种单一域类型是1.4之后新引入的类。Years, Months, Weeks, Days, Hours, Minutes, Seconds -这些类都遵从类似的设计：都只保存跟名字所示的单一域。因此一个days对象只能保存一个表示天数的数字。

当要写一个API只接受以某一个单位度量的特定Period为参数时，这些类会非常有用。例如，一个旅游网站只提供旅行+_1天或者3天的选项，可以把这些信息存入一个 days对象。

这些类提供了静态的工厂对象而不是构造函数。Days包括一个daysBetween(startDate, endDate)方法来获取两个日期之间的天数， 一个daysIn(interval) 方法来获取interval包括的所有天数。另外，有许多常量，像是Days.ZERO 和 Days.ONE. days(int)工厂方法要么返回一个常量，或者创建一个新对象 。

单一域类支持基本的算术运算。Days支持 plus(int), plus(Days), multipliedBy(int), dividedBy(int) and negated()这些运算。由于days是不可变类,所有的运算会返回一个新的实例。单一域类同样实现了comparable接口。

在不同类型的period之间进行转换是很困难的事情。一天并不总是24小时。（在夏令时更替时它可能 是23小时 或者 25小时）。 然而许多应用 有一些商业规则假定24小时是一天等等。为了支持这种情况，Days有一个toStandardHours()方法，它把天数转换为标准的小时数，假定24小时为一天。使用‘标准’这个单词是为了提醒用户有这个假定。

### 任意域period

第二种类型的period是任意域period。它被 Period类和MutablePeriod类实现。在内部，它们由一个个的int型的域保存，每个int保存一个域。一个period标准的域有年，月，日，周，小时，分钟，秒和毫秒。[PeriodType](http://www.joda.org/joda-time/apidocs/org/joda/time/PeriodType.html) 类可以限制这些域，比如 去掉周。当把一个duration或者一个interval转换为一个period时特别显著，因为这个计算需要知道要转换成哪些period域。

当API要有多于一个域的period时，Period类会非常有用。然而，为了更为通用，可以把API定义 为接受一个ReadablePeriod为参数，然后调用的代码可以传递一个Period类或者一个单一域period比如Days。

Period类有方法可以得到每个域。也有方法可以改变一个域的值，比如withDays(int)。它们以'with' 为名是因为返回值是一个新的Period对象，由于不可变的属性。

不可以比较任意域period的顺序，因为比较的策略是没有意义的。相反，你应该把period转换为基于一个具体时间的Duration，然后比较duration.

### 在joda-time中使用Period

在joda-time中一个period用 [ReadablePeriod](http://www.joda.org/joda-time/apidocs/org/joda/time/ReadablePeriod.html) 接口代表。这里提供了9个此接口的实现：

- [Period](http://www.joda.org/joda-time/apidocs/org/joda/time/Period.html) - 一个不可变类的实现
- [MutablePeriod](http://www.joda.org/joda-time/apidocs/org/joda/time/MutablePeriod.html) - 一个可变类的实现
- [Years](http://www.joda.org/joda-time/apidocs/org/joda/time/Years.html) - 只有年份的不可变类的实现
- [Months](http://www.joda.org/joda-time/apidocs/org/joda/time/Months.html) - 只有月份的不可变类的实现
- [Weeks](http://www.joda.org/joda-time/apidocs/org/joda/time/Weeks.html) - 只有星期的不可变类的实现
- [Days](http://www.joda.org/joda-time/apidocs/org/joda/time/Days.html) -只有日数的不可变类的实现
- [Hours](http://www.joda.org/joda-time/apidocs/org/joda/time/Hours.html) - 只有小时的不可变类的实现
- [Minutes](http://www.joda.org/joda-time/apidocs/org/joda/time/Minutes.html) - 只有分钟的不可变类的实现
- [Seconds](http://www.joda.org/joda-time/apidocs/org/joda/time/Seconds.html) -只有秒的不可变类的实现

可以用在各种形式的代码中：

```
DateTime start = new DateTime(2004, 12, 25, 0, 0, 0, 0);
DateTime end = new DateTime(2006, 1, 1, 0, 0, 0, 0);

// period of 1 year and 7 days
Period period = new Period(start, end);

// calc will equal end
DateTime calc = start.plus(period);

// able to calculate whole days between two dates easily
Days days = Days.daysBetween(start, end);

// able to calculate whole months between two dates easily
Months months = Months.monthsBetween(start, end);
```

注意ReadablePeriod接口不应该像集合API那样使用。这个接口仅仅包含操作的核心子集。相反，你应该总是直接使用实现类的API。

### Nulls

joda-time定义了一个空的period作为零长度的period.因此当一个方法定义 为接受一个ReadablePeriod为参数时，传递一个null进去和传递一个零长度的period是一样的。












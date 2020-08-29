# c语言的一些关键字

# 关键字

**保留关键字**

```
char    short     int     unsigned  
long    float     double  struct  
union   void      enum    signed  
const   volatile  typedef auto  
case    continue  default do  
else    for goto  if  
return  switch    while   sizeof  
static  extern    break  register 
```

**C99新增关键字**

```
_Bool   _Complex    _Imaginary  inline  restrict
```

# const

const定义常量从汇编的角度来看，只是给出了对应的内存地址，而不是像#define一样给出的是立即数，所以，const定义的常量在程序运行过程中只有一份拷贝，而#define定义的常量在内存中有若干份拷贝。 
编译器通常不为普通const常量分配存储空间，而是将它们保存在符号表中，这使得它成为一个编译期间的常量，没有了存储与读内存的操作，使得它的效率也很高。

例：下面的代码编译器会报一个错误，请问，哪一个语句是错误的呢？

```
typedef char * pStr;
char string[4] = "bbc";
const char *p1 =" string"; //1式
const pStr p2 =" string"; //2式
p1++;
p2++;
```

答案与分析： 
问题出在p2++上。 
1）const使用的基本形式： const type m;限定m不可变。替换基本形式中的m为1式中的*p1，替换后const char *p1;限定*p1不可变，当然p1是可变的，因此问题中p1++是对的。 
替换基本形式中的type为2式中的pStr，替换后const pStr m;限定m不可变，题中的pStr就是一种新类型，因此问题中p2不可 变，p2++是错误的。 
**const只修饰其后的变量** ，至于const放在类型前还是类型后并没有区别。如：const int a和int const a都是修饰a为const。注意*不是一种类型，如果*pType之前是某类型，那么pType是指向该类型的指针。 
一个简单的判断方法：指针运算符*，是从右到左，那么如：char const *pContent，可以理解为char const (* pContent)，即* pContent为const，而pContent则是可变的。 
在c中，对于const定义的指针，不赋初值编译不报错，强烈建议在初始化时说明指针的指向，防止出现野指针。

还有const int *p=&b;是可以的 虽然b不是常量。 
但是

```
const int a=6;
int *p=&a;
```

会警告，因为它消除了a的const属性。

# enum

(1) 枚举型是一个集合，集合中的元素(枚举成员)是一些命名的**整型常量**，元素之间用逗号,隔开。 
(2) DAY是一个标识符，可以看成这个集合的名字，是一个可选项，即是可有可无的项。 
(3) 第一个枚举成员的默认值为整型的0，后续枚举成员的值在前一个成员上加1。 
(4) 可以人为设定枚举成员的值，从而自定义某个范围内的整数。 
(5) 枚举型是预处理指令#define的替代。 
(6) 类型定义以分号;结束。 
既然枚举也是一种数据类型，那么它和基本数据类型一样也可以对变量进行声明。

**方法一：枚举类型的定义和变量的声明分开**

```
enum DAY
{
  MON=1, TUE, WED, THU, FRI, SAT, SUN
};

enum DAY yesterday;
enum DAY today;
enum DAY tomorrow; //变量tomorrow的类型为枚举型enum DAY
enum DAY good_day, bad_day; //变量good_day和bad_day的类型均为枚举型enum DAY
```

**方法二：类型定义与变量声明同时进行**

```
enum //跟第一个定义不同的是，此处的标号DAY省略，这是允许的。
{
saturday,
sunday = 0,
monday,
tuesday,
wednesday,
thursday,
friday
} workday; //变量workday的类型为枚举型enum DAY
enum week { Mon=1, Tue, Wed, Thu, Fri Sat, Sun} days; //变量days的类型为枚举型enum week
enum BOOLEAN { false, true } end_flag, match_flag; //定义枚举类型并声明了两个枚举型变量
```

**方法三：用typedef关键字将枚举类型定义成别名，并利用该别名进行变量声明：**

```
typedef enum workday
{
 saturday,
sunday = 0,
monday,
tuesday,
wednesday,
thursday,
friday
} workday; //此处的workday为枚举型enum workday的别名


workday today, tomorrow; //变量today和tomorrow的类型为枚举型workday，也即enum    workday
```

enum workday中的workday可以省略：

```
typedef enum
{
saturday,
sunday = 0,
monday,
tuesday,
wednesday,
thursday,
friday
} workday; //此处的workday为枚举型enum workday的别名

workday today, tomorrow; //变量today和tomorrow的类型为枚举型workday，也即enum workday
```

也可以用这种方式：

```
typedef enum workday
{
saturday,
sunday = 0,
monday,
tuesday,
wednesday,
thursday,
friday
};

workday today, tomorrow; //变量today和tomorrow的类型为枚举型workday，也即enum workday
```

注意：同一个程序中不能定义同名的枚举类型，不同的枚举类型中也不能存在同名的命名常量。
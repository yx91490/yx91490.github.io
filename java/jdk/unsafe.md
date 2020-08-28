# sun.misc.Unsafe类学习

## 原子操作相关方法

### getAndAddInt

 int类型值原子操作，对offset地址对应的值做原子增加操作(增加delta)

参数 o：操作的对象
参数 offset：字段内存地址偏移量
参数 delta： 需要加的值

```java
/**
 * Atomically adds the given value to the current value of a field
 * or array element within the given object <code>o</code>
 * at the given <code>offset</code>.
 *
 * @param o object/array to update the field/element in
 * @param offset field/element offset
 * @param delta the value to add
 * @return the previous value
 * @since 1.8
 */
public final int getAndAddInt(Object o, long offset, int delta) {
    int v;
    do {
        v = getIntVolatile(o, offset);
    } while (!compareAndSwapInt(o, offset, v, v + delta));
    return v;
}
```

### getAndAddLong

long类型值原子操作，对offset地址对应的值做原子增加操作(增加delta)

```java

/**
 * Atomically adds the given value to the current value of a field
 * or array element within the given object <code>o</code>
 * at the given <code>offset</code>.
 *
 * @param o object/array to update the field/element in
 * @param offset field/element offset
 * @param delta the value to add
 * @return the previous value
 * @since 1.8
 */
public final long getAndAddLong(Object o, long offset, long delta) {
    long v;
    do {
        v = getLongVolatile(o, offset);
    } while (!compareAndSwapLong(o, offset, v, v + delta));
    return v;
}
```

### getAndSetInt

int类型值原子操作方法，将offset地址对应的值置为newValue

```java
/**
 * Atomically exchanges the given value with the current value of
 * a field or array element within the given object <code>o</code>
 * at the given <code>offset</code>.
 *
 * @param o object/array to update the field/element in
 * @param offset field/element offset
 * @param newValue new value
 * @return the previous value
 * @since 1.8
 */
public final int getAndSetInt(Object o, long offset, int newValue) {
    int v;
    do {
        v = getIntVolatile(o, offset);
    } while (!compareAndSwapInt(o, offset, v, newValue));
    return v;
}
```

### getAndSetLong

long类型值原子操作方法，将offset地址对应的值置为newValue

```java
/**
 * Atomically exchanges the given value with the current value of
 * a field or array element within the given object <code>o</code>
 * at the given <code>offset</code>.
 *
 * @param o object/array to update the field/element in
 * @param offset field/element offset
 * @param newValue new value
 * @return the previous value
 * @since 1.8
 */
public final long getAndSetLong(Object o, long offset, long newValue) {
    long v;
    do {
        v = getLongVolatile(o, offset);
    } while (!compareAndSwapLong(o, offset, v, newValue));
    return v;
}
```

### getAndSetObject

```java
/**
 * Atomically exchanges the given reference value with the current
 * reference value of a field or array element within the given
 * object <code>o</code> at the given <code>offset</code>.
 *
 * @param o object/array to update the field/element in
 * @param offset field/element offset
 * @param newValue new value
 * @return the previous value
 * @since 1.8
 */
public final Object getAndSetObject(Object o, long offset, Object newValue) {
    Object v;
    do {
        v = getObjectVolatile(o, offset);
    } while (!compareAndSwapObject(o, offset, v, newValue));
    return v;
}
```

## 线程调度相关方法

### park

阻塞当前线程，当出现以下几种情况的时候会返回：

- 当正在平衡一个`unpark`
- 当已经平衡完一个`unpark`
- 线程被中断
- 是绝对时间，并且超过了给定的截止时间（自新纪元后的毫秒数）
- 不是绝对时间，并且给定的时间（单位纳秒）不为0且消耗完
- 其他不合逻辑的情况

参数 isAbsolute：是否是绝对时间：

- 如果为true，time是一个绝对时间
- 如果为false，time是一个相对时间，

参数 time：

- 是相对时间的时候单位是纳秒；
- 是绝对时间的时候单位是毫秒，表示的是自新纪元后的毫秒数

```java
/**
 * Block current thread, returning when a balancing
 * <tt>unpark</tt> occurs, or a balancing <tt>unpark</tt> has
 * already occurred, or the thread is interrupted, or, if not
 * absolute and time is not zero, the given time nanoseconds have
 * elapsed, or if absolute, the given deadline in milliseconds
 * since Epoch has passed, or spuriously (i.e., returning for no
 * "reason"). Note: This operation is in the Unsafe class only
 * because <tt>unpark</tt> is, so it would be strange to place it
 * elsewhere.
 */
public native void park(boolean isAbsolute, long time);
```

### unpark

取消阻塞线程，此操作是不安全的仅仅是因为调用者必须保证线程没有被销毁。

```java
/**
 * Unblock the given thread blocked on <tt>park</tt>, or, if it is
 * not blocked, cause the subsequent call to <tt>park</tt> not to
 * block.  Note: this operation is "unsafe" solely because the
 * caller must somehow ensure that the thread has not been
 * destroyed. Nothing special is usually required to ensure this
 * when called from Java (in which there will ordinarily be a live
 * reference to the thread) but this is not nearly-automatically
 * so when calling from native code.
 * @param thread the thread to unpark.
 *
 */
public native void unpark(Object thread);
```

线程中相当于有个许可，许可默认是0，

调用park的时候，发现是0会阻塞当前线程，调用unpark之后，许可会被置为1，并会唤醒当前线程。

如果在park之前先调用了unpark方法，执行park方法的时候，不会阻塞。

park方法被唤醒之后，许可又会被置为0。

多次调用unpark的效果是一样的，许可还是1。

伪代码参考：[UnsafeParkSimulator.java](https://github.com/centercode/code-samples/blob/master/java-samples/jdk-sample/src/main/java/jdk/sun/UnsafeParkSimulator.java)

## volatile语义相关方法

putXXXVolatile方法，设置给定对象的int值，使用volatile语义，即设置后立马更新到内存对其他线程可见，2个参数：

```
o：表示需要操作的对象
offset：表示操作对象中的某个字段地址偏移量
x：将offset对应的字段的值修改为x，并且立即刷新到主存中
```

调用这个方法，会强制将工作内存中修改的数据刷新到主内存中。

getXXXVolatile方法，获得给定对象的指定偏移量offset的int值，使用volatile语义，总能获取到最新的int值。2个参数：

```
o：表示需要操作的对象
offset：表示操作对象中的某个字段地址偏移量
每次调用这个方法都会强制从主内存读取值，将其复制到工作内存中使用。
```

```java
/**
 * Fetches a reference value from a given Java variable, with volatile
 * load semantics. Otherwise identical to {@link #getObject(Object, long)}
 */
public native Object getObjectVolatile(Object o, long offset);

/**
 * Stores a reference value into a given Java variable, with
 * volatile store semantics. Otherwise identical to {@link #putObject(Object, long, Object)}
 */
public native void    putObjectVolatile(Object o, long offset, Object x);

/** Volatile version of {@link #getInt(Object, long)}  */
public native int     getIntVolatile(Object o, long offset);

/** Volatile version of {@link #putInt(Object, long, int)}  */
public native void    putIntVolatile(Object o, long offset, int x);

/** Volatile version of {@link #getBoolean(Object, long)}  */
public native boolean getBooleanVolatile(Object o, long offset);

/** Volatile version of {@link #putBoolean(Object, long, boolean)}  */
public native void    putBooleanVolatile(Object o, long offset, boolean x);

/** Volatile version of {@link #getByte(Object, long)}  */
public native byte    getByteVolatile(Object o, long offset);

/** Volatile version of {@link #putByte(Object, long, byte)}  */
public native void    putByteVolatile(Object o, long offset, byte x);

/** Volatile version of {@link #getShort(Object, long)}  */
public native short   getShortVolatile(Object o, long offset);

/** Volatile version of {@link #putShort(Object, long, short)}  */
public native void    putShortVolatile(Object o, long offset, short x);

/** Volatile version of {@link #getChar(Object, long)}  */
public native char    getCharVolatile(Object o, long offset);

/** Volatile version of {@link #putChar(Object, long, char)}  */
public native void    putCharVolatile(Object o, long offset, char x);

/** Volatile version of {@link #getLong(Object, long)}  */
public native long    getLongVolatile(Object o, long offset);

/** Volatile version of {@link #putLong(Object, long, long)}  */
public native void    putLongVolatile(Object o, long offset, long x);

/** Volatile version of {@link #getFloat(Object, long)}  */
public native float   getFloatVolatile(Object o, long offset);

/** Volatile version of {@link #putFloat(Object, long, float)}  */
public native void    putFloatVolatile(Object o, long offset, float x);

/** Volatile version of {@link #getDouble(Object, long)}  */
public native double  getDoubleVolatile(Object o, long offset);

/** Volatile version of {@link #putDouble(Object, long, double)}  */
public native void    putDoubleVolatile(Object o, long offset, double x);
```

## CAS语义相关方法

```java
/**
 * Atomically update Java variable to <tt>x</tt> if it is currently
 * holding <tt>expected</tt>.
 * @return <tt>true</tt> if successful
 */
public final native boolean compareAndSwapObject(Object o, long offset,
                                                 Object expected,
                                                 Object x);

/**
 * Atomically update Java variable to <tt>x</tt> if it is currently
 * holding <tt>expected</tt>.
 * @return <tt>true</tt> if successful
 */
public final native boolean compareAndSwapInt(Object o, long offset,
                                              int expected,
                                              int x);

/**
 * Atomically update Java variable to <tt>x</tt> if it is currently
 * holding <tt>expected</tt>.
 * @return <tt>true</tt> if successful
 */
public final native boolean compareAndSwapLong(Object o, long offset,
                                               long expected,
                                               long x);
```

> 为什么只有Object，Int， Long三种类型的呢？

## 参考

- [java高并发系列 - 第22天：JUC底层工具类Unsafe，高手必须要了解](https://mp.weixin.qq.com/s/tTMJdWXBLsTZprahysOxcQ)
- [OpenJDK sun.misc.Unsafe.java source code](http://hg.openjdk.java.net/jdk8/jdk8/jdk/file/e822676cd3cd/src/share/classes/sun/misc/Unsafe.java)
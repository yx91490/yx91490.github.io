### 现象

最近发现一个诡异的事情，一个负责监控告警的服务发现hang住了，日志文件停在了几天之前，但是进程的CPU和内存占用都不高，也几乎没有gc。这个服务是用Quartz做定时任务，周期性通过http接口获取状态，异常则通过公司的短信http接口报警的这样一个很简单的服务。猜测要么是Quartz出问题了，要么是httpClient出了问题。

### 排查

用jstack命令dump了下线程状态：

```
"DefaultQuartzScheduler_Worker-10" prio=10 tid=0x00007f6528600000 nid=0x2b303 waiting on condition [0x00007f65043cc000]
   java.lang.Thread.State: WAITING (parking)
    at sun.misc.Unsafe.park(Native Method)
    - parking to wait for  <0x0000000586092820> (a java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject)
    at java.util.concurrent.locks.LockSupport.park(LockSupport.java:186)
    at java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject.await(AbstractQueuedSynchronizer.java:2043)
    at org.apache.http.pool.AbstractConnPool.getPoolEntryBlocking(AbstractConnPool.java:380)
    at org.apache.http.pool.AbstractConnPool.access$200(AbstractConnPool.java:69)
    at org.apache.http.pool.AbstractConnPool$2.get(AbstractConnPool.java:246)
    - locked <0x000000059623b590> (a org.apache.http.pool.AbstractConnPool$2)
    at org.apache.http.pool.AbstractConnPool$2.get(AbstractConnPool.java:193)
    at org.apache.http.impl.conn.PoolingHttpClientConnectionManager.leaseConnection(PoolingHttpClientConnectionManager.java:303)
    at org.apache.http.impl.conn.PoolingHttpClientConnectionManager$1.get(PoolingHttpClientConnectionManager.java:279)
    at org.apache.http.impl.execchain.MainClientExec.execute(MainClientExec.java:191)
    at org.apache.http.impl.execchain.ProtocolExec.execute(ProtocolExec.java:185)
    at org.apache.http.impl.execchain.RetryExec.execute(RetryExec.java:89)
    at org.apache.http.impl.execchain.RedirectExec.execute(RedirectExec.java:111)
    at org.apache.http.impl.client.InternalHttpClient.doExecute(InternalHttpClient.java:185)
    at org.apache.http.impl.client.CloseableHttpClient.execute(CloseableHttpClient.java:83)
    at org.apache.http.impl.client.CloseableHttpClient.execute(CloseableHttpClient.java:56)
    at org.apache.http.client.fluent.Request.internalExecute(Request.java:173)
    at org.apache.http.client.fluent.Request.execute(Request.java:177)
    at com.xxx.alarm.MessageAlarm.doAlarm(MessageAlarm.java:53)
    at com.xxx.alarm.Alarm.alarmError(Alarm.java:22)
    at com.xxx.monitor.JobMonitor.doAlarm(JobMonitor.java:121)
    at com.xxx.monitor.JobMonitor.handleError(JobMonitor.java:181)
    at com.xxx.monitor.JobMonitor.run(JobMonitor.java:71)
    at com.xxx.monitor.CommonJob.execute(CommonJob.java:28)
    at org.quartz.core.JobRunShell.run(JobRunShell.java:202)
    at org.quartz.simpl.SimpleThreadPool$WorkerThread.run(SimpleThreadPool.java:573)
    - locked <0x0000000581ee6408> (a java.lang.Object)
    
"DefaultQuartzScheduler_Worker-9" prio=10 tid=0x00007f65285fe000 nid=0x2b302 waiting on condition [0x00007f65044cd000]
...
```

发现有10个`DefaultQuartzScheduler_Worker-`这样的线程都在等待同一个condition，这就有问题了：

1. 卡在什么地方？
2. 为什么是10个线程？
3. 为什么没有超时抛异常？

大致浏览了下堆栈信息，以及查找资料，确定是卡在从连接池获取连接的过程，这种情况大概率是由于连接没有关闭导致的。出了问题第一个直觉肯定不是怀疑自己的代码，肯定是怀疑卧槽，是不是出httpClient bug了？但是我用的是HttpClient fluent API包，API很简单，而且timeout也设置了，理应不会出现这种情况，大概的使用方式：

```java
String s = Request.Get(url)
                .addHeader(authHeader)
                .addHeader(jsonHeader)
                .connectTimeout(TIMEOUT)
                .socketTimeout(TIMEOUT)
                .execute()
                .handleResponse(RestHandler.INSTANCE);
```

但是注意，这里的`connectTimeout`是http建立连接的时间，`socketTimeout`是连接建立后，数据传输过程中数据包之间间隔的最大时间，并不是从连接池里获取连接的超时时间，也就是说很可能获取连接就没有设置超时！

梳理一下使用httpClient的两个地方，RestHandler类是负责处理response的，里面代码确定是把连接关掉了，但是在调用发送报警短信的接口那里很可疑：

```java
try {
    Request.Get(url)
        .connectTimeout(TIMEOUT)
        .socketTimeout(TIMEOUT)
        .execute();
} catch (IOException e) {
    logger.error("Error when send message", e);
}
```

是不是很有迷惑性？我以为我不需要返回值，然后调用`.execute()`后就没有处理response，但是这就导致response资源没有关闭，导致出现这样的惨案。

至于为什么没有超时抛异常？看了下代码：

```
org.apache.http.client.config.RequestConfig.DEFAULT = new Builder().build();
```

而Builder的构造函数：

```
Builder() {
    super();
    this.staleConnectionCheckEnabled = false;
    this.redirectsEnabled = true;
    this.maxRedirects = 50;
    this.relativeRedirectsAllowed = true;
    this.authenticationEnabled = true;
    this.connectionRequestTimeout = -1; //从连接池获取连接的超时时间默认为-1
    this.connectTimeout = -1;
    this.socketTimeout = -1;
    this.contentCompressionEnabled = true;
}
```

也就是`connectionRequestTimeout`默认值是-1，也就是不超时，而且HttpClient fluent API也不能配置这个参数导致获取连接的线程一直等待。

### 复现

写个简单的循环200次调用，发现当调用超过每个host下默认最大连接数（100次）的时候，main线程确实hang住，而且观察到有100个端口处于CLOSE_WAIT状态：

```
tcp6       0      0 101.52.153.181:49516      125.159.231.178:80      ESTABLISHED 3726/java           
tcp6       0      0 101.52.153.181:49564      125.159.231.178:80      ESTABLISHED 3726/java           
tcp6       0      0 101.52.153.181:49622      125.159.231.178:80      ESTABLISHED 3726/java  
...
```

而当RequestConfig的参数`connectionRequestTimeout`设置为大于0的值时：

```java
RequestConfig requestConfig = RequestConfig.custom()
        .setConnectionRequestTimeout(10)
        .build();
CloseableHttpClient httpClient = HttpClientBuilder.create()
        .setConnectionManager(Executor.CONNMGR)
        .setDefaultRequestConfig(requestConfig)
        .build();
Request request = Request.Get(url)
        .connectTimeout(10_000)
        .socketTimeout(10_000);
Response response = new Response(request.internalExecute(httpClient, null));
```

在获取连接超时后确实会抛出异常：

```
Exception in thread "main" org.apache.http.conn.ConnectionPoolTimeoutException: Timeout waiting for connection from pool
	at org.apache.http.impl.conn.PoolingHttpClientConnectionManager.leaseConnection(PoolingHttpClientConnectionManager.java:313)
	at org.apache.http.impl.conn.PoolingHttpClientConnectionManager$1.get(PoolingHttpClientConnectionManager.java:279)
	at org.apache.http.impl.execchain.MainClientExec.execute(MainClientExec.java:191)
	at org.apache.http.impl.execchain.ProtocolExec.execute(ProtocolExec.java:185)
	at org.apache.http.impl.execchain.RetryExec.execute(RetryExec.java:89)
	at org.apache.http.impl.execchain.RedirectExec.execute(RedirectExec.java:111)
	at org.apache.http.impl.client.InternalHttpClient.doExecute(InternalHttpClient.java:185)
	at org.apache.http.impl.client.CloseableHttpClient.execute(CloseableHttpClient.java:83)
	at org.apache.http.impl.client.CloseableHttpClient.execute(CloseableHttpClient.java:56)
	at org.apache.http.client.fluent.Request.internalExecute(Request.java:173)
	at org.apache.http.client.fluent.Demo.get(Demo.java:30)
	at org.apache.http.client.fluent.Demo.main(Demo.java:14)
```

### 解决

解决办法也很简单，调用关闭资源的方法：

```java
try {
    Request.Get(url)
        .connectTimeout(TIMEOUT)
        .socketTimeout(TIMEOUT)
        .execute();
        .returnContent(); //to close stream
} catch (IOException e) {
    logger.error("Error when send message", e);
}
```

同时也可以参考上节代码设置`connectionRequestTimeout`。

### 总结

以为使用HttpClient fluent API就屏蔽了httpClient的复杂性，但是基本的使用规律却忽略了，而且连接池无法设置超时这点很坑啊！这里面还些疑点，比如为什么thread dump中是10个线程？持有资源没有释放的线程为什么没有在jstack中体现出来？暂时没有搞清楚。

### 参考

[一场HttpClient调用未关闭流引发的问题](https://blog.csdn.net/u010634066/article/details/83120122)

[问题备忘: httpclient连接池异常引发的惨案](https://blog.csdn.net/hry2015/article/details/78965690)

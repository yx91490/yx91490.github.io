# Scala笔记

## By-name parameters

## try-with-resources

正确写法：

```scala
def withResources[T <: AutoCloseable, V](r: => T)(f: T => V): V = {
  val resource: T = r
  require(resource != null, "resource is null")
  var exception: Throwable = null
  try {
    f(resource)
  } catch {
    case NonFatal(e) =>
      exception = e
      throw e
  } finally {
    closeAndAddSuppressed(exception, resource)
  }
}

private def closeAndAddSuppressed(e: Throwable,
                                  resource: AutoCloseable): Unit = {
  if (e != null) {
    try {
      resource.close()
    } catch {
      case NonFatal(suppressed) =>
        e.addSuppressed(suppressed)
    }
  } else {
    resource.close()
  }
}
```

### 参考

https://dkomanov.medium.com/scala-try-with-resources-735baad0fd7d
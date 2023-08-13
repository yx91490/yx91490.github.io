# Prometheus学习笔记

## Metric 类型

### Counter

counter表示一个单调递增的计数器，是一个累积指标，它的值只能增加或者在重启的时候被重置。

### Gauge

gauge表示一个可以任意上升或下降的数值。

### Histogram

histogram对观测值（如请求持续时间或响应大小）进行采样，并对其进行分桶计数。也提供被观测值的加和。

histogram在一次抓取中会暴露多个时间序列：

- 分桶的计数器：`<basename>_bucket{le="<upper inclusive bound>"}`
- 被观测值的加和：`<basename>_sum`
- 总计数：`<basename>_count`，相当于`<basename>_bucket{le="+Inf"}`

### Summary

与histogram类似，summary是对观测值（如请求持续时间和响应大小）的抽样。虽然也提供观测值的总计数和总和，但它在一个滑动的时间窗口上计算可配置的分位数。

summary在一次抓取中会暴露多个时间序列：

- 观测值的分位值：`<basename>{quantile="<φ>"}`，（0 ≤ φ ≤ 1）
- 观测值的加和：`<basename>_sum`
- 观测值的总计数：`<basename>_count`

#### 示例

从多实例数据中计算 95%分位值：

```sql
-- 此histogram的分桶: {le="0.1"}, {le="0.2"}, {le="0.3"}, and {le="0.45"}
-- 线性插值，假设桶内值均匀分布
histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le))
```

### Histogram与Summary

区别：

|                        | Histogram                      | Summary                       |
| ---------------------- | ------------------------------ | ----------------------------- |
| client 端性能          | 消耗小（仅需 counter 值自增）  | 消耗大                        |
| server 端性能          | server 端计算分位值            | server 端消耗少               |
| 指定分位和滑动时间窗口 | 通过 Prometheus 表达式即席计算 | 不能动态指定（client 端预置） |
| 聚合                   | 通过 Prometheus 表达式即席计算 | 不能聚合                      |

选择使用哪种指标的经验法则：

- 如果你需要汇总，就选择histogram
- 否则：
  - 如果你对将要观察到的值的范围和分布有一个概念，就选择histogram
  - 如果你需要一个准确的量化指标，无论数值的范围和分布是什么，都要选择summary

## 参考

[METRIC TYPES](https://prometheus.io/docs/concepts/metric_types/)

[HISTOGRAMS AND SUMMARIES](https://prometheus.io/docs/practices/histograms/#histograms-and-summaries)

[FUNCTIONS](https://prometheus.io/docs/prometheus/latest/querying/functions)
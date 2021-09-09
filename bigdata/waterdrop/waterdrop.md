# Waterdrop学习笔记

以下内容基于waterdrop的v2.x版本。

## 数据流

### Spark批处理

Spark批处理引擎的代码逻辑主要在类[SparkBatchExecution.scala](https://github.com/InterestingLab/waterdrop/blob/dd4dca23ee6087decd94d739d0ab9bff3d6a34ed/waterdrop-spark-api/src/main/scala/io/github/interestinglab/waterdrop/spark/batch/SparkBatchExecution.scala)中，执行流程如下：

- 执行source部分：source可以有多个，每个source都必须注册成一个临时视图。
- 执行transform部分：当transform的输入为空时则跳过后续transform过程。每个transform的输入表都可以通过source_table_name指定，输出都可以选择性地注册为临时视图。如果没有指定source_table_name，首个transform的输入默认接首个source。同样如果没有指定source_table_name，后续transform的输入默认接上一个transform的输出。
- 执行sink部分：顺序执行每个sink过程，每个sink过程都可以通过source_table_name指定输入表。如果没有指定source_table_name，首个sink过程的输入默认接首个source（空数据）或者最后一个transform的输出。



<img src="./waterdrop.assets/waterdrop-spark-batch.png" alt="waterdrop" style="zoom: 80%;" />

## Spark流处理

Spark批处理引擎的代码逻辑主要在类[SparkStreamingExecution.scala](https://github.com/InterestingLab/waterdrop/blob/dd4dca23ee6087decd94d739d0ab9bff3d6a34ed/waterdrop-spark-api/src/main/scala/io/github/interestinglab/waterdrop/spark/stream/SparkStreamingExecution.scala)中，执行流程参考Spark批处理。

## Flink批处理

Spark批处理引擎的代码逻辑主要在类[FlinkBatchExecution.java](https://github.com/InterestingLab/waterdrop/blob/dd4dca23ee6087decd94d739d0ab9bff3d6a34ed/waterdrop-flink-api/src/main/java/io/github/interestinglab/waterdrop/flink/batch/FlinkBatchExecution.java)中，执行流程参考Spark批处理。

## Flink流处理

Spark批处理引擎的代码逻辑主要在类[FlinkStreamExecution.java](https://github.com/InterestingLab/waterdrop/blob/dd4dca23ee6087decd94d739d0ab9bff3d6a34ed/waterdrop-flink-api/src/main/java/io/github/interestinglab/waterdrop/flink/stream/FlinkStreamExecution.java)中，执行流程参考Spark批处理。
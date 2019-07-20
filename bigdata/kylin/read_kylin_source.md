### #1 Step Name: Create Intermediate Flat Hive Table

1. SET TBLPROPERTIES('auto.purge'='true');
2. SEQUENCEFILE
3. 中间表包含所有字段
4. kylin.job.use-advanced-flat-table
5. 关键类：
   - HiveInputBase
   - JoinedFlatTable


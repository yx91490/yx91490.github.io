## 事务

**事务开始于：**

- 连接到数据库上，并执行一条DML语句insert、update或delete
- 前一个事务结束后，又输入了另一条DML语句 

**事务结束于：**

- 执行commit或rollback语句。
- 执行一条DDL语句，例如create table，grant语句，在这种情况下，会自动执行commit语句。
- 断开与数据库的连接
- 执行了一条DML语句，该语句却失败了，在这种情况中，会为这个无效的DML语句执行rollback语句。

**事务的四大特点（ACID）**

- **actomicity(原子性)**　表示一个事务内的所有操作是一个整体，要么全部成功，要么全部失败

- **consistency(一致性)**　表示一个事务内有一个操作失败时，所有的更改过的数据都必须回滚到修改前状态

- **isolation(隔离性)** 事务查看数据时数据所处的状态，要么是另一并发事务修改它之前的状态，要么是另一事务修改它之后的状态，事务不会查看中间状态的数据。

- **durability(持久性)**　持久性事务完成之后，它对于系统的影响是永久性的。

**隔离级别** 

com.mysql.jdbc.Connection的定义有5个级别:

1. TRANSACTION_NONE(不支持事务)
2. TRANSACTION_READ_UNCOMMITTED
3. TRANSACTION_READ_COMMITTED
4. TRANSACTION_REPEATABLE_READ
5. TRANSACTION_SERIALIZABLE

**脏读**

事务A修改了一个数据，但未提交，事务B读到了事务A未提交的更新结果，如果事务A提交失败，事务B读到的就是脏数据。

![脏读](./dirty_read.png)

**不可重复读**

在同一个事务中，对于同一份数据读取到的结果不一致。比如，事务B在事务A提交前读到的结果，和事务A提交后读到的结果可能不同。

![不可重复读](./unrepeated_read.png)

**幻读**

在事务中，前后两次查询，记录数量是不一样的。不可重复读的和幻读很容易混淆，不可重复读侧重于 **修改** ，幻读侧重于 **新增或删除** 。解决不可重复读的问题只需锁住满足条件的行，解决幻读需要 **锁表** 。

**mysql的可重复读一并解决了幻读的问题。**



| 隔离级别 |                  | 脏读 | 不可重复读 | 幻读        |
| -------- | ---------------- | ---- | ---------- | ----------- |
| 未提交读 | READ_UNCOMMITTED | T    | T          | T           |
| 提交读   | READ_COMMITTED   |      | T          | T           |
| 可重复读 | REPEATABLE_READ  |      |            | T(MySQL为F) |
| 可串行化 | SERIALIZABLE     |      |            |             |


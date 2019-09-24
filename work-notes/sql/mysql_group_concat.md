# MySQL的group_concat()函数的使用

```
select group_concat(`field`,'字符串',`field`  separator  ';') from table group by `otherfield`
```
```
select group_concat(`field`,'字符串',`field`  separator  ';') from table group by `otherfield`
```
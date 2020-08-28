# MySQL授权

1. 使用root用户（有授权权限的用户）
2. 本机ip需要单独授权

```
grant all on *.* to 'user'@'ip' identified by 'password';
```
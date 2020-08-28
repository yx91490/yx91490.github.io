# Systemd管理命令

查看日志：

```
systemctl status <service-name.service> -l -n 100
```

或：

```
journalctl -u <service-name.service>
```

按时间过滤：

```
journalctl --since "2016-11-14 19:00:00" --until "2016-11-14 19:05:00"
```

按用户过滤：

```
id -u miki
journalctl _UID=1000 --since "25 minutes ago"
```

纯文本展示：

```
journalctl --no-pager
```



## 参考

- [How to see full log from systemctl status service?](https://unix.stackexchange.com/questions/225401/how-to-see-full-log-from-systemctl-status-service)
- [How use Systemd journalctl Command to Manage Logs](https://linoxide.com/linux-how-to/systemd-journalctl-command-logs/)
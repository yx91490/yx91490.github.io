网络

| 对比项     | CentOS 6               | CentOS 7      |
| ---------- | ---------------------- | ------------- |
| 防火墙     | iptables               | firewalld     |
| 主机名     | /etc/sysconfig/network | /etc/hostname |
| 网络信息   | netstat                | ss            |
| IP地址     | ifconfig               | ip addr       |
| 默认数据库 | MySQL                  | MariaDB       |

文件系统

| 对比项   | CentOS 6                  | CentOS 7                                  |
| -------- | ------------------------- | ----------------------------------------- |
| 文件系统 | ext4                      | xfs                                       |
| 文件结构 | /bin, /sbin, /lib, /lib64 | /usr/bin, /usr/sbin, /usr/lib, /usr/lib64 |
| 时间同步 | \$ ntp<br>\$ ntpq -p | \$ chrony<br/>\$ chronyc sources     |

系统管理

| 对比项       | CentOS 6                                   | CentOS 7                                     |
| ------------ | ------------------------------------------ | -------------------------------------------- |
| 内核版本     | 2.6.x-x                                    | 3.10.x-x                                     |
| 服务运行管理 | service service_name restart/status/reload | systemctl restart/status/reload service_name |
| 服务启动管理 | chkconfig service_name on/off              | systemctl enable/disable service_name        |
| 强制停止     | kill -9 \<PID\>                            | systemctl kill --signal=9 service_name       |

### 参考

- [centos7与centos6区别](https://www.cnblogs.com/bethal/p/5945026.html)
- [CentOS之7与6的区别](https://www.cnblogs.com/Csir/p/6746667.html)
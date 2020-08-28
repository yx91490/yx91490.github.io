# Yarn Cli命令

### list:按状态过滤

```bash
yarn application -list -appStates ALL
```

合法的application 状态:

- ALL
- NEW
- NEW_SAVING
- SUBMITTED
- ACCEPTED
- RUNNING
- FINISHED
- FAILED
- KILLED

输出示例：

```
$ yapp -list -appStates RUNNING
Total number of applications (application-types: [] and states: [RUNNING]):6
                Application-Id	    Application-Name	    Application-Type	      User	     Queue	             State	       Final-State	       Progress	                       Tracking-URL
application_1590912573128_0411	Flink per-job cluster	        Apache Flink	     flink	root.default	           RUNNING	         UNDEFINED	           100%	         http://211.local.org:15405
application_1590912573128_0321	Flink per-job cluster	        Apache Flink	     flink	root.default	           RUNNING	         UNDEFINED	           100%	         http://213.local.org:23514
```

### status：检查某个application的状态

```
$ yapp -status application_1590912573128_0411
Application Report : 
	Application-Id : application_1590912573128_0411
	Application-Name : Flink per-job cluster
	Application-Type : Apache Flink
	User : flink
	Queue : root.default
	Start-Time : 1591327319426
	Finish-Time : 0
	Progress : 100%
	State : RUNNING
	Final-State : UNDEFINED
	Tracking-URL : http://211.local.org:15405
	RPC Port : 15405
	AM Host : 211.local.org
	Aggregate Resource Allocation : 3993613 MB-seconds, 3885 vcore-seconds
	Log Aggregation Status : NOT_START
	Diagnostics : 
```

### logs：查看应用日志

```
yarn logs -applicationId application_1590912573128_0411
```

### rmadmin：检查Resource Manager健康状况

```
yarn rmadmin -checkHealth
```

## 参考

[YARN | How to view application info via command line](https://medium.com/@jayprakash.bilgaye/yarn-how-to-view-application-info-via-command-line-290df9f0274c)
# 一个访问路径包含转义"/"导致Tomcat 400的问题

项目中遇到了一个问题，本地用jetty调试的时候能够正常访问，部署到tomcat服务器上却返回400，没有访问日志，后来发现是访问的URL是正则匹配的，其中包括了转义的“/”，查阅资料发现tomcat默认不支持路径中包括转义“/”的URL。解决办法是配置一下tomcat。

参考资料：
> https://stackoverflow.com/questions/4069002/receive-an-http-400-error-if-2f-is-part-of-the-get-url-in-jboss  
> https://tools.ietf.org/html/rfc7231#section-6.5.1

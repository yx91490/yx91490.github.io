# JavaMail使用总结

在工作中使用java发送过邮件的人一般都知道javamail这个东西,他是JavaEE提供的一套构建邮件和消息应用的API,但是用过的人都知道这套API是多么的难用,刚开始用的时候我都怀疑全世界的程序员的都有这么强的忍耐力吗?为什么没有人重新发明个轮子?难道就是因为他是Oracle官方出品的东西吗:(?

但是越是恶心的东西就越想以后避免再踩到它.于是有了封装一下这个东西的想法(不过事后证明这个东西无论你怎么封装看起来还是那么丑陋...),需求嘛很简单,能够发送邮件就行,邮件内容支持内嵌的图片,还可以带上几个附件就算完美了.事实上,有一堆RFC文档来描述email的具体格式,但是我们可能真正用不上那么全面详细的功能.

肯定没有心思看冗长的英文RFC文档,网上找来一篇看起来不错的[文档](http://www.cnblogs.com/xdp-gacl/p/4216311.html),要构建多层的容器来把不同类型的资源包装起来,比如你要发一封带图片也带附件的邮件,你要这么包装:

([[(text, image)], attach])

但是经过最终的实验发现,其实不必隔离的那么清晰邮件也能正确显示,最终封装的算法是:

1. new一个MimeMultiPart作为整个邮件资源的容器
2. 把正文作为一个BodyPart添加到MimeMultiPart中
3. 把若干图片作为BodyPart依次添加到MimeMultiPart中
4. 把若干附件作为BodyPart依次添加到MimeMultiPart中

代码见[github](https://github.com/yx91490/email4j/blob/develop/src/main/java/desi/juan/email/api/MimeMultipartBuilder.java)

### Content-ID

如果把debug模式打开(`session.setDebug(true)`)你会发现,email的内容是只允许ASCII字符出现的,通常我们会把附件的文件名进行编码防止因为文件名有中文字符而出现问题.但是在测试的过程中发现一个有意思的事情,图片的cid不能是中文字符,否则图片在正文中显示不了,即使是用`MimeUtility.encodeText()`方法进行编码也不行.

### commons-mail

偶然间发现,原来我们javaer喜闻乐见的Apache commons项目里就有这么个项目把javamail封装了一下,它的API使用起来虽然没到丝般顺滑的地步,但是相对于原始的API来说已经是汽车对牛车的进步了.

参见[官网的示例](https://commons.apache.org/proper/commons-email/userguide.html), 发送一封带有图片和附件的邮件:

```java
        String cid = email.embed(new File("/tmp/a.jpg"));
        System.out.println("cid:" + cid);

        email.setHtmlMsg("<h1 style='color:red'>下午3：00会议室讨论</h1> <img src='cid:" + cid + "'>" + " 请准时参加！");

        EmailAttachment emailAttachment = new EmailAttachment();
        emailAttachment.setPath("/tmp/a.jpg");
        emailAttachment.setName("haha");

        email.attach(emailAttachment);
        email.attach(emailAttachment);

        email.setDebug(true);
        // 发送
        email.send();
```

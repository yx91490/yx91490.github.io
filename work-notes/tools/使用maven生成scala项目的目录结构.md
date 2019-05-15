命令如下:

     mvn archetype:generate

然后会提示你选择一个模板:

    Choose a number or apply filter (format: [groupId:]artifactId, case sensitive contains): 3: 

输入模板对应数字55后，提示选择一个版本:

	Choose net.alchim31.maven:scala-archetype-simple version: 
	1: 1.4
	2: 1.5
	3: 1.6
然后是一堆jar包坐标的信息:
    
	Define value for property 'groupId': test
	Define value for property 'artifactId': test
	Define value for property 'version' 1.0-SNAPSHOT: : 
	Define value for property 'package' test: : test
确认后即可.
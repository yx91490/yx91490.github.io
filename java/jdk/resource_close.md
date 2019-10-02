# 资源关闭测试    

    import org.apache.commons.io.IOUtils;
    
    import java.io.File;
    import java.io.FileInputStream;
    import java.io.IOException;
    
    public class Demo {
        public static void main(String[] args) {
            Demo demo = new Demo();
            demo.read();
            try {
                System.in.read();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    
        private void read() {
            try {
                File inFile = new File("/tmp/process.out");
                ProcessBuilder processBuilder = new ProcessBuilder("echo", "abcdefg");
                processBuilder.redirectInput(inFile);
                Process process = processBuilder.start();
                int i = process.waitFor();
                System.out.println("exit: " + i);
                try (FileInputStream fileInputStream = new FileInputStream(inFile);){
                    String str = IOUtils.toString(fileInputStream);
                    System.out.println("output:" + str);
                }
    
            } catch (IOException e) {
                e.printStackTrace();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
    user@XPS13:/tmp$ lsof process.out 
    COMMAND   PID USER   FD   TYPE DEVICE SIZE/OFF    NODE NAME
    java    21128 user   18r   REG  259,6        7 1049290 process.out
    user@XPS13:/tmp$ jps -m
    21128 Demo




    inputStream  : java.lang.UNIXProcess$ProcessPipeInputStream@31c9b6eb(ByteArrayInputStream)
    
    outputStream  : java.lang.ProcessBuilder$NullOutputStream@33c3d029
    
    errorStream  : java.lang.UNIXProcess$ProcessPipeInputStream@7c974e4b(java.lang.ProcessBuilder$NullInputStream)

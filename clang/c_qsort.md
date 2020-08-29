# c语言qsort()函数

linux的man手册中提供了一个比较函数的示例：

```
   #include <stdio.h>
   #include <stdlib.h>
   #include <string.h>

   static int
   cmpstringp(const void *p1, const void *p2)
   {
       /* The actual arguments to this function are "pointers to
          pointers to char", but strcmp(3) arguments are "pointers
          to char", hence the following cast plus dereference */

       return strcmp(* (char * const *) p1, * (char * const *) p2);
   }

   int
   main(int argc, char *argv[])
   {
       int j;

       if (argc < 2) {
           fprintf(stderr, "Usage: %s <string>...\n", argv[0]);
           exit(EXIT_FAILURE);
       }

       qsort(&argv[1], argc - 1, sizeof(char *), cmpstringp);

       for (j = 1; j < argc; j++)
           puts(argv[j]);
       exit(EXIT_SUCCESS);
   }
```

一开始搞不懂return为什么是 * (char * const *) p1 ,后来看注释发现strcmp的原型是：

```
 int strcmp(const char *s1, const char *s2);
```

strcmp接受`const char *`的类型，因此先要把传来的参数p1强制转换成 `const char *` 类型的指针，即 `const char **`，然后传递给 strcmp 作为引数，写成 `* (const char **) p1`，与`* (char * const *) p1`同义。 
但是网上的示例大多数return时并没有写的这样规范，而是写成`*（char*）p1` 这种形式，编译时会有警告并且会自动去掉一个`*`，运行结果会出错。
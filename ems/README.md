# emscripten 与 cmake 构建项目
## c++项目根目录创建build文件夹
- cd build  进入build目录
- emcmake cmake ..  build目录会生成一堆构建文件
- cmake --build .   编译输出目标文件

# emscripten webassembly学习笔记
## wasm文件的加载
异步加载
## wasm文件运行环境
web、node、worker、shell
## 胶水代码
### run方法

## emscripten编译流程
asm.js
### 内存模型
asm.js、wasm、c/c++内存空间均是ArrayBuffer对象 
从c代码中返回的地址，均是以ArrayBuffer为内存模型存储的地址 也就是int8类型的地址值
单向透明的内存模型，从c++读取的地址值在js中是以HEAP8寻址方式下的值   ptr_HEAP8(int8) = ptr_HEAP32(int32) * (32/8)
数组寻址方式 c++中的地址是int32 找到数组首地址 arr_head = a a的值是HEAP8模型下的值 要转换成HEAP32才能和c++中的int32对上
### 函数导出规则
### js、c函数互调
#### js调用c函数
#### c调用js函数
#### js与c数据传递
如何传值，js只有一种数值类型Number，既64位浮点数
交换大块数据时，直接传递参数不可取，可通过内存交换数据
# c预编译指令
<!-- #define            定义一个预处理宏
#undef            取消宏的定义

#if                   编译预处理中的条件命令，相当于C语法中的if语句
#ifdef              判断某个宏是否被定义，若已定义，执行随后的语句
#ifndef            与#ifdef相反，判断某个宏是否未被定义
#elif                若#if, #ifdef, #ifndef或前面的#elif条件不满足，则执行#elif之后的语句，相当于C语法中的else-if
#else              与#if, #ifdef, #ifndef对应, 若这些条件不满足，则执行#else之后的语句，相当于C语法中的else
#endif             #if, #ifdef, #ifndef这些条件命令的结束标志.
defined         　与#if, #elif配合使用，判断某个宏是否被定义 -->l    
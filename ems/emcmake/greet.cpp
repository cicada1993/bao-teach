#include <iostream>
#include "greet.h"
#include <emscripten/bind.h>
using namespace std;
void sayHello()
{
    cout << "Hello,World" << endl;
}

EMSCRIPTEN_BINDINGS(test_method_ebind)
{
    // 绑定方法
    //using namespace emscripten;
    emscripten::function("sayHello", &sayHello);
}
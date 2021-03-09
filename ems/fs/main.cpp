#include <iostream>
#include <fstream>
#include <string>
#ifdef __EMSCRIPTEN__
#endif
#ifndef EM_PORT_API
#if defined(__EMSCRIPTEN__)
#include <emscripten.h>
#if defined(__cplusplus)
#define EM_PORT_API(rettype) extern "C" rettype EMSCRIPTEN_KEEPALIVE
#else
#define EM_PORT_API(rettype) rettype EMSCRIPTEN_KEEPALIVE
#endif
#else
#if defined(__cplusplus)
#define EM_PORT_API(rettype) extern "C" rettype
#else
#define EM_PORT_API(rettype) rettype
#endif
#endif
#endif

int main(int argc, char *argv[])
{
    using namespace std;
    ifstream infile("test.txt");
    if (infile.fail())
    {
        cout << "打开文件失败！" << endl;
    }
    string s;
    while (getline(infile, s))
    {
        cout << s << endl;
    }
    infile.close();
    return 0;
}

EM_PORT_API(int)
sum(int *ptr, int count)
{
    int total = 0;
    for (int i = 0; i < count; i++)
    {
        total += ptr[i];
    }
    return total;
}

int lala = 100;

EM_PORT_API(int *)
get_lala_ptr()
{
    return &lala;
}

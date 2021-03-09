#include <iostream>
#include "greet.h"
#include "area.h"
#include <emscripten.h>
#include <emscripten/bind.h>
#include "cus_export.h"
using namespace std;

// c++中定义 js方法
EM_JS(void, two_logs, (), {
  console.log('hai');
  console.log('bai');
});

int flag = 20;

EM_PORT_API(int *)get_flag_ptr()
{
  return &flag;
}
// EMSCRIPTEN_BINDINGS(test_query_address) 各种报错
// {
//   emscripten::function("get_flag_ptr", &get_flag_ptr, emscripten::allow_raw_pointers());
// }
EM_PORT_API(int) show_me_the_answer(); // c中定义 js中实现
EM_PORT_API(void) show_flag() {
  cout << "当前值：" << flag << endl;
  show_me_the_answer();
}

EM_PORT_API(int*) fibonacci(int count) {
  if(count <=0) {
    return NULL;
  }
  int* re = (int*)malloc(count * 4);
	if (NULL == re) {
    cout << "Not enough memory." << endl;
		return NULL;
	}

	re[0] = 1;
	int i0 = 0, i1 = 1;
	for (int i = 1; i < count; i++){
		re[i] = i0 + i1;
		i0 = i1;
		i1 = re[i];
	}
	return re;
}

int main(int arg, char *argv[])
{
  sayHello();
  float radius = 5;
  cout << "半径为" << radius << "圆面积：" << calArea(radius) << endl;
  two_logs();
  EM_ASM({
    console.log($0); // 貌似只支持数值
  },
         100);
  int v = EM_ASM_INT({
    return $0 + 10;
  },
                     20);
  cout << "计算结果" << v << endl;
}
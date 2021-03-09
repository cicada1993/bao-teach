#include <iostream>
#include <emscripten/bind.h>

int main(int argc, char *argv[])
{
    return 0;
}

void greet()
{
    std::cout << "this is from c++!" << std::endl;
}

EMSCRIPTEN_BINDINGS(test_method_ebind)
{
    // 绑定方法
    using namespace emscripten;
    function("greet", &greet);
}

class EmClass
{
public:
    EmClass(int x, std::string y) : id(x), name(y)
    {
    }

    void incrementId()
    {
        ++id;
    }

    void setId(int _id)
    {
        id = _id;
    }

    int getId() const
    {
        return id;
    }

    static std::string readInstanceMember(const EmClass &instance)
    {
        return instance.name;
    }

private:
    int id;
    std::string name;
};

EMSCRIPTEN_BINDINGS(test_class_ebind)
{
    using namespace emscripten;
    class_<EmClass>("EmClass")
        .constructor<int, std::string>()
        .function("incrementId", &EmClass::incrementId)
        .property("id", &EmClass::getId, &EmClass::setId)
        .class_function("readInstanceMember", &EmClass::readInstanceMember);
}

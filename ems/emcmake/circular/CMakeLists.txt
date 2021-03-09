add_library(area area.cpp)

install(TARGETS area DESTINATION lib)
install(FILES area.h DESTINATION include)
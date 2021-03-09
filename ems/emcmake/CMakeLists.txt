cmake_minimum_required(VERSION 3.4.1)

project(emcmake VERSION 1.0)

option(JS_ONLY "Compiles to native JS (No WASM)" OFF)

message(STATUS "cmake_cur_src_dir ${CMAKE_CURRENT_SOURCE_DIR}")

set(src_dir "${CMAKE_CURRENT_SOURCE_DIR}")

add_subdirectory(circular)

add_executable(emcmake main.cpp greet.cpp)

target_link_libraries(emcmake PRIVATE area)

target_include_directories(emcmake PUBLIC "${src_dir}" "${src_dir}/circular")

if(JS_ONLY)
	message(STATUS "Setting compilation target to native JavaScript")
	set_target_properties(emcmake PROPERTIES LINK_FLAGS "-s ERROR_ON_UNDEFINED_SYMBOLS=0 WASM=0")
else(JS_ONLY)
	message(STATUS "Setting compilation target to WASM")
	set_target_properties(emcmake PROPERTIES LINK_FLAGS "-s WASM=1 --bind --js-library jslinker.js")
endif(JS_ONLY)
# CMAKE generated file: DO NOT EDIT!
# Generated by "MinGW Makefiles" Generator, CMake Version 3.17

# Delete rule output on recipe failure.
.DELETE_ON_ERROR:


#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:


# Disable VCS-based implicit rules.
% : %,v


# Disable VCS-based implicit rules.
% : RCS/%


# Disable VCS-based implicit rules.
% : RCS/%,v


# Disable VCS-based implicit rules.
% : SCCS/s.%


# Disable VCS-based implicit rules.
% : s.%


.SUFFIXES: .hpux_make_needs_suffix_list


# Command-line flag to silence nested $(MAKE).
$(VERBOSE)MAKESILENT = -s

# Suppress display of executed commands.
$(VERBOSE).SILENT:


# A target that is always out of date.
cmake_force:

.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

SHELL = cmd.exe

# The CMake executable.
CMAKE_COMMAND = D:\CMake\bin\cmake.exe

# The command to remove a file.
RM = D:\CMake\bin\cmake.exe -E rm -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = D:\Workspace\happy-learning\vue-cli\em-projects\ems\emcmake

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = D:\Workspace\happy-learning\vue-cli\em-projects\ems\emcmake\build

# Include any dependencies generated for this target.
include circular/CMakeFiles/area.dir/depend.make

# Include the progress variables for this target.
include circular/CMakeFiles/area.dir/progress.make

# Include the compile flags for this target's objects.
include circular/CMakeFiles/area.dir/flags.make

circular/CMakeFiles/area.dir/area.cpp.o: circular/CMakeFiles/area.dir/flags.make
circular/CMakeFiles/area.dir/area.cpp.o: ../circular/area.cpp
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=D:\Workspace\happy-learning\vue-cli\em-projects\ems\emcmake\build\CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building CXX object circular/CMakeFiles/area.dir/area.cpp.o"
	cd /d D:\Workspace\happy-learning\vue-cli\em-projects\ems\emcmake\build\circular && D:\emsdk\upstream\emscripten\em++.bat  $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -o CMakeFiles\area.dir\area.cpp.o -c D:\Workspace\happy-learning\vue-cli\em-projects\ems\emcmake\circular\area.cpp

circular/CMakeFiles/area.dir/area.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/area.dir/area.cpp.i"
	cd /d D:\Workspace\happy-learning\vue-cli\em-projects\ems\emcmake\build\circular && D:\emsdk\upstream\emscripten\em++.bat $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E D:\Workspace\happy-learning\vue-cli\em-projects\ems\emcmake\circular\area.cpp > CMakeFiles\area.dir\area.cpp.i

circular/CMakeFiles/area.dir/area.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/area.dir/area.cpp.s"
	cd /d D:\Workspace\happy-learning\vue-cli\em-projects\ems\emcmake\build\circular && D:\emsdk\upstream\emscripten\em++.bat $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S D:\Workspace\happy-learning\vue-cli\em-projects\ems\emcmake\circular\area.cpp -o CMakeFiles\area.dir\area.cpp.s

# Object files for target area
area_OBJECTS = \
"CMakeFiles/area.dir/area.cpp.o"

# External object files for target area
area_EXTERNAL_OBJECTS =

circular/libarea.a: circular/CMakeFiles/area.dir/area.cpp.o
circular/libarea.a: circular/CMakeFiles/area.dir/build.make
circular/libarea.a: circular/CMakeFiles/area.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir=D:\Workspace\happy-learning\vue-cli\em-projects\ems\emcmake\build\CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Linking CXX static library libarea.a"
	cd /d D:\Workspace\happy-learning\vue-cli\em-projects\ems\emcmake\build\circular && $(CMAKE_COMMAND) -P CMakeFiles\area.dir\cmake_clean_target.cmake
	cd /d D:\Workspace\happy-learning\vue-cli\em-projects\ems\emcmake\build\circular && $(CMAKE_COMMAND) -E cmake_link_script CMakeFiles\area.dir\link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
circular/CMakeFiles/area.dir/build: circular/libarea.a

.PHONY : circular/CMakeFiles/area.dir/build

circular/CMakeFiles/area.dir/clean:
	cd /d D:\Workspace\happy-learning\vue-cli\em-projects\ems\emcmake\build\circular && $(CMAKE_COMMAND) -P CMakeFiles\area.dir\cmake_clean.cmake
.PHONY : circular/CMakeFiles/area.dir/clean

circular/CMakeFiles/area.dir/depend:
	$(CMAKE_COMMAND) -E cmake_depends "MinGW Makefiles" D:\Workspace\happy-learning\vue-cli\em-projects\ems\emcmake D:\Workspace\happy-learning\vue-cli\em-projects\ems\emcmake\circular D:\Workspace\happy-learning\vue-cli\em-projects\ems\emcmake\build D:\Workspace\happy-learning\vue-cli\em-projects\ems\emcmake\build\circular D:\Workspace\happy-learning\vue-cli\em-projects\ems\emcmake\build\circular\CMakeFiles\area.dir\DependInfo.cmake --color=$(COLOR)
.PHONY : circular/CMakeFiles/area.dir/depend

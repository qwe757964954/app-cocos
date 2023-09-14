include(${CMAKE_CURRENT_LIST_DIR}/../src/CMakeLists.txt)

add_library(
    ${LIB_NAME}
    STATIC
    ${P_SRC}
)

target_link_libraries(
    ${LIB_NAME}
    ${ENGINE_NAME}
)

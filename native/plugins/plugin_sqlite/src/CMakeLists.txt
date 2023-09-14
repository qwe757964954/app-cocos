set(
    LIB_NAME
    p_sqlite
)

add_definitions(-DSQLITE_ENABLE_FTS5)
add_definitions(-DSQLITE_ENABLE_LOAD_EXTENSION)

file(
    GLOB
    P_SRC
    "${CMAKE_CURRENT_LIST_DIR}/*.cpp"
    "${CMAKE_CURRENT_LIST_DIR}/*.c"
    "${CMAKE_CURRENT_LIST_DIR}/*.h"
)

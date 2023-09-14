set(_bylabel_GLUE_SRC_DIR ${CMAKE_CURRENT_LIST_DIR})

add_library(teksto STATIC IMPORTED GLOBAL)
set_target_properties(teksto PROPERTIES
    IMPORTED_LOCATION ${_bylabel_GLUE_SRC_DIR}/lib/libteksto.a
)

set(TEKSTO_LIB teksto)

include(${_bylabel_GLUE_SRC_DIR}/../src/CMakeLists.txt)
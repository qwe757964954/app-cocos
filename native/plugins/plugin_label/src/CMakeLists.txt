set(_bylabel_GLUE_SRC_DIR ${CMAKE_CURRENT_LIST_DIR})
set(_bylabel_GLUE_HEAD_DIR ${CMAKE_CURRENT_LIST_DIR}/../include)
file(GLOB_RECURSE BOYAA_RUNTIME_HEADERS CONFIGURE_DEPENDS ${_bylabel_GLUE_HEAD_DIR}/*.h)
file(GLOB_RECURSE BOYAA_RUNTIME_SOURCES CONFIGURE_DEPENDS ${_bylabel_GLUE_SRC_DIR}/*.cpp)

source_group(TREE "${_bylabel_GLUE_SRC_DIR}" FILES 
	${BOYAA_RUNTIME_SOURCES})
source_group(TREE "${_bylabel_GLUE_HEAD_DIR}" FILES 
	${BOYAA_RUNTIME_HEADERS})
    
add_library(bylabel ${BOYAA_RUNTIME_SOURCES})

target_link_libraries(
    bylabel
    ${TEKSTO_LIB}
    ${ENGINE_NAME} # cocos_engine
)

target_include_directories(bylabel PRIVATE
    ${_bylabel_GLUE_SRC_DIR}/../include
)
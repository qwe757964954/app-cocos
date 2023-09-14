set(_boyaa_GLUE_SRC_DIR ${CMAKE_CURRENT_LIST_DIR})

set(USE_LIB ON)

if(${USE_LIB})
    add_library(fontconfig STATIC IMPORTED GLOBAL)
    set_target_properties(fontconfig PROPERTIES
        IMPORTED_LOCATION ${_boyaa_GLUE_SRC_DIR}/lib/Release/fontconfig.lib
        IMPORTED_LOCATION_DEBUG ${_boyaa_GLUE_SRC_DIR}/lib/Debug/fontconfig.lib
    )

    add_library(freetype STATIC IMPORTED GLOBAL)
    set_target_properties(freetype PROPERTIES
        IMPORTED_LOCATION ${_boyaa_GLUE_SRC_DIR}/lib/Release/freetype.lib
        IMPORTED_LOCATION_DEBUG ${_boyaa_GLUE_SRC_DIR}/lib/Debug/freetyped.lib
    )

    add_library(fribidi STATIC IMPORTED GLOBAL)
    set_target_properties(fribidi PROPERTIES
        IMPORTED_LOCATION ${_boyaa_GLUE_SRC_DIR}/lib/Release/fribidi.lib
        IMPORTED_LOCATION_DEBUG ${_boyaa_GLUE_SRC_DIR}/lib/Debug/fribidi.lib
    )

    add_library(harfbuzz STATIC IMPORTED GLOBAL)
    set_target_properties(harfbuzz PROPERTIES
        IMPORTED_LOCATION ${_boyaa_GLUE_SRC_DIR}/lib/Release/harfbuzz.lib
        IMPORTED_LOCATION_DEBUG ${_boyaa_GLUE_SRC_DIR}/lib/Debug/harfbuzz.lib
    )

    add_library(libexpatMD STATIC IMPORTED GLOBAL)
    set_target_properties(libexpatMD PROPERTIES
        IMPORTED_LOCATION ${_boyaa_GLUE_SRC_DIR}/lib/Release/libexpatMD.lib
        IMPORTED_LOCATION_DEBUG ${_boyaa_GLUE_SRC_DIR}/lib/Debug/libexpatdMD.lib
    )

    add_library(libpng16_static STATIC IMPORTED GLOBAL)
    set_target_properties(libpng16_static PROPERTIES
        IMPORTED_LOCATION ${_boyaa_GLUE_SRC_DIR}/lib/Release/libpng16_static.lib
        IMPORTED_LOCATION_DEBUG ${_boyaa_GLUE_SRC_DIR}/lib/Debug/libpng16_staticd.lib
    )

    add_library(glog STATIC IMPORTED GLOBAL)
    set_target_properties(glog PROPERTIES
        IMPORTED_LOCATION ${_boyaa_GLUE_SRC_DIR}/lib/Release/glog.lib
        IMPORTED_LOCATION_DEBUG ${_boyaa_GLUE_SRC_DIR}/lib/Debug/glogd.lib
    )

    add_library(teksto STATIC IMPORTED GLOBAL)
    set_target_properties(teksto PROPERTIES
        IMPORTED_LOCATION ${_boyaa_GLUE_SRC_DIR}/lib/Release/teksto.lib
        IMPORTED_LOCATION_DEBUG ${_boyaa_GLUE_SRC_DIR}/lib/Debug/teksto.lib
    )

    set(TEKSTO_LIB     
        fontconfig
        freetype
        fribidi
        harfbuzz
        libexpatMD
        libpng16_static
        glog
        teksto)

    include(${_boyaa_GLUE_SRC_DIR}/../src/CMakeLists.txt)
else()
    set(TEKSTO_LIB teksto)
    include(${_boyaa_GLUE_SRC_DIR}/../CMakeLists.txt)
endif()

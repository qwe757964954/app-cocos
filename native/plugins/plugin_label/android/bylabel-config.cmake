set(_boyaa_GLUE_SRC_DIR ${CMAKE_CURRENT_LIST_DIR})

# add_library(fontconfig_im STATIC IMPORTED GLOBAL)
# set_target_properties(fontconfig_im PROPERTIES
#     IMPORTED_LOCATION ${_boyaa_GLUE_SRC_DIR}/${ANDROID_ABI}/lib/libfontconfig.a
# )

# add_library(freetype STATIC IMPORTED GLOBAL)
# set_target_properties(freetype PROPERTIES
# IMPORTED_LOCATION ${_boyaa_GLUE_SRC_DIR}/${ANDROID_ABI}/lib/libfreetype.a
# )

# add_library(fribidi STATIC IMPORTED GLOBAL)
# set_target_properties(fribidi PROPERTIES
# IMPORTED_LOCATION ${_boyaa_GLUE_SRC_DIR}/${ANDROID_ABI}/lib/libfribidi.a
# )

# add_library(harfbuzz STATIC IMPORTED GLOBAL)
# set_target_properties(harfbuzz PROPERTIES
# IMPORTED_LOCATION ${_boyaa_GLUE_SRC_DIR}/${ANDROID_ABI}/lib/libharfbuzz.a
# )

# add_library(expat STATIC IMPORTED GLOBAL)
# set_target_properties(expat PROPERTIES
#     IMPORTED_LOCATION ${_boyaa_GLUE_SRC_DIR}/${ANDROID_ABI}/lib/libexpat.a
# )

# add_library(png16 STATIC IMPORTED GLOBAL)
# set_target_properties(png16 PROPERTIES
#     IMPORTED_LOCATION ${_boyaa_GLUE_SRC_DIR}/${ANDROID_ABI}/lib/libpng16.a
# )

# add_library(teksto STATIC IMPORTED GLOBAL)
# set_target_properties(teksto PROPERTIES
#     IMPORTED_LOCATION ${_boyaa_GLUE_SRC_DIR}/${ANDROID_ABI}/lib/libteksto.a
# )

# add_library(glog STATIC IMPORTED GLOBAL)
# set_target_properties(glog PROPERTIES
#     IMPORTED_LOCATION ${_boyaa_GLUE_SRC_DIR}/${ANDROID_ABI}/lib/libglog.a
# )

# add_library(harfbuzz-subset STATIC IMPORTED GLOBAL)
# set_target_properties(harfbuzz-subset PROPERTIES
#     IMPORTED_LOCATION ${_boyaa_GLUE_SRC_DIR}/${ANDROID_ABI}/lib/libharfbuzz-subset.a
# )

add_library(teksto STATIC IMPORTED GLOBAL)
set_target_properties(teksto PROPERTIES
    IMPORTED_LOCATION ${_boyaa_GLUE_SRC_DIR}/${ANDROID_ABI}/lib/libteksto.a
)

set(TEKSTO_LIB teksto)

include(${_boyaa_GLUE_SRC_DIR}/../src/CMakeLists.txt)

# set(TEKSTO_LIB teksto)
# include(${_boyaa_GLUE_SRC_DIR}/../CMakeLists.txt)
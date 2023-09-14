# plugins found & enabled in search path
# To disable automatic update of this file, set SKIP_SCAN_PLUGINS to ON.

set(p_sqlite_ROOT
   "${CC_PROJECT_DIR}/../../plugins/plugin_sqlite/android/${ANDROID_ABI}"
   "${CC_PROJECT_DIR}/../../plugins/plugin_sqlite/android"
)

list(APPEND CMAKE_FIND_ROOT_PATH ${p_sqlite_ROOT})
list(APPEND CC_REGISTERED_PLUGINS
  p_sqlite
)

find_package(p_sqlite
  REQUIRED
  NAMES "p_sqlite"
# NO_DEFAULT_PATH
)
set(p_zip_ROOT
   "${CC_PROJECT_DIR}/../../plugins/plugin_zip/android/${ANDROID_ABI}"
   "${CC_PROJECT_DIR}/../../plugins/plugin_zip/android"
)

list(APPEND CMAKE_FIND_ROOT_PATH ${p_zip_ROOT})
list(APPEND CC_REGISTERED_PLUGINS
  p_zip
)

find_package(p_zip
  REQUIRED
  NAMES "p_zip"
# NO_DEFAULT_PATH
)

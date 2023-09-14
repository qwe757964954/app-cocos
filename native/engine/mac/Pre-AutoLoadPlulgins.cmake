# plugins found & enabled in search path
# To disable automatic update of this file, set SKIP_SCAN_PLUGINS to ON.

set(p_extra_ROOT
   "${CC_PROJECT_DIR}/../../plugins/plugin_extra/mac/${CMAKE_SYSTEM_PROCESSOR}"
   "${CC_PROJECT_DIR}/../../plugins/plugin_extra/mac"
)

list(APPEND CMAKE_FIND_ROOT_PATH ${p_extra_ROOT})
list(APPEND CC_REGISTERED_PLUGINS
  p_extra
)

find_package(p_extra
  REQUIRED
  NAMES "p_extra"
# NO_DEFAULT_PATH
)
set(bylabel_ROOT
   "${CC_PROJECT_DIR}/../../plugins/plugin_label/mac/${CMAKE_SYSTEM_PROCESSOR}"
   "${CC_PROJECT_DIR}/../../plugins/plugin_label/mac"
)

list(APPEND CMAKE_FIND_ROOT_PATH ${bylabel_ROOT})
list(APPEND CC_REGISTERED_PLUGINS
  bylabel
)

find_package(bylabel
  REQUIRED
  NAMES "bylabel"
# NO_DEFAULT_PATH
)
set(p_sensitive_ROOT
   "${CC_PROJECT_DIR}/../../plugins/plugin_sensitive/mac/${CMAKE_SYSTEM_PROCESSOR}"
   "${CC_PROJECT_DIR}/../../plugins/plugin_sensitive/mac"
)

list(APPEND CMAKE_FIND_ROOT_PATH ${p_sensitive_ROOT})
list(APPEND CC_REGISTERED_PLUGINS
  p_sensitive
)

find_package(p_sensitive
  REQUIRED
  NAMES "p_sensitive"
# NO_DEFAULT_PATH
)
set(p_sqlite_ROOT
   "${CC_PROJECT_DIR}/../../plugins/plugin_sqlite/mac/${CMAKE_SYSTEM_PROCESSOR}"
   "${CC_PROJECT_DIR}/../../plugins/plugin_sqlite/mac"
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
   "${CC_PROJECT_DIR}/../../plugins/plugin_zip/mac/${CMAKE_SYSTEM_PROCESSOR}"
   "${CC_PROJECT_DIR}/../../plugins/plugin_zip/mac"
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

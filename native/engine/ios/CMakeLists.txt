cmake_minimum_required(VERSION 3.8)

set(CMAKE_SYSTEM_NAME iOS)
set(APP_NAME "266"  CACHE STRING "Project Name")

project(${APP_NAME} CXX)

set(CC_PROJECT_DIR ${CMAKE_CURRENT_LIST_DIR})
set(CC_UI_RESOURCES)
set(CC_PROJ_SOURCES)
set(CC_ASSET_FILES)
set(CC_COMMON_SOURCES)
set(CC_ALL_SOURCES)

include(${CC_PROJECT_DIR}/../common/CMakeLists.txt)
set(EXECUTABLE_NAME ${APP_NAME})

set(JSB_BRIDGE_TEST_SOURCE
    ${CMAKE_CURRENT_LIST_DIR}/JsbBridgeGame.h
    ${CMAKE_CURRENT_LIST_DIR}/JsbBridgeGame.mm
    ${CMAKE_CURRENT_LIST_DIR}/GameIOSPlatform.h
    ${CMAKE_CURRENT_LIST_DIR}/GameIOSPlatform.mm
    ${CMAKE_CURRENT_LIST_DIR}/NativeOcClass.h
    ${CMAKE_CURRENT_LIST_DIR}/NativeOcClass.m
    # ${CMAKE_CURRENT_LIST_DIR}/266.entitlements
    # ${CMAKE_}
)

set(APP_RESOURCES
    ${CMAKE_CURRENT_LIST_DIR}/LaunchImage/launchAgetips.png
    ${CMAKE_CURRENT_LIST_DIR}/LaunchImage/launchHealthPlay.png
    ${CMAKE_CURRENT_LIST_DIR}/LaunchImage/launchImageBottom.png
    ${CMAKE_CURRENT_LIST_DIR}/LaunchImage/launchImageBottom2.png
)

list(APPEND CC_PROJ_SOURCES
    ${JSB_BRIDGE_TEST_SOURCE}
)

list(APPEND CC_PROJ_SOURCES
    ${APP_RESOURCES}
)


# target_sources(${APP_NAME} PRIVATE ${APP_RESOURCES})


execute_process(COMMAND ${CMAKE_COMMAND} -E
    copy "${CMAKE_CURRENT_LIST_DIR}/Podfile"  "${CC_PROJECT_DIR}/../../../build/ios/proj"
)

cc_ios_before_target(${EXECUTABLE_NAME})
add_executable(${EXECUTABLE_NAME} ${CC_ALL_SOURCES})
cc_ios_after_target(${EXECUTABLE_NAME})

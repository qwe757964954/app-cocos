rm -rf build

TARGETS="arm64-v8a armeabi-v7a"

for TARGET in $TARGETS
do
    echo "start build target:$TARGET"
    BUILD_PATH="build/${TARGET}"
    mkdir -p "${BUILD_PATH}"

    cmake -S . -B ${BUILD_PATH} -G Ninja \
        -DRES_DIR=/Users/boyaa/Workspace/266-app-cocos/build/android \
        -DCOCOS_X_PATH=/Users/boyaa/Workspace/266-cocos-engine/native \
        -DANDROID_STL=c++_static \
        -DANDROID_TOOLCHAIN=clang \
        -DANDROID_ARM_NEON=TRUE \
        -DANDROID_LD=gold \
        -DCMAKE_SYSTEM_NAME=Android \
        -DCMAKE_SYSTEM_VERSION=21 \
        -DANDROID_PLATFORM=android-21 \
        -DCMAKE_BUILD_TYPE=debug \
        -DANDROID_NDK=$NDK_ROOT \
        -DCMAKE_TOOLCHAIN_FILE=$NDK_ROOT/build/cmake/android.toolchain.cmake \
        -DANDROID_ABI=${TARGET} \
        -DCMAKE_ANDROID_ARCH_ABI=${TARGET} \
        -DHIDE_SYMBOLS=ON \

    cmake --build ${BUILD_PATH} --target cocos
done


    

//
//  GameIOSPlatform.m
//  266-game-mobile
//
//  Created by mac on 2023/6/19.
//

#include "GameIOSPlatform.h"

namespace cc{

int32_t GameIOSPlatform::run(int argc, const char** argv) {
    jsbBridgeGame = [JsbBridgeGame new];
    return 0;
}
}//namespace cc

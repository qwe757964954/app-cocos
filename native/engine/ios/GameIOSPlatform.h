//
//  GameIOSPlatform.h
//  266-game-mobile
//
//  Created by mac on 2023/6/19.
//

//#import <Foundation/Foundation.h>
//
//NS_ASSUME_NONNULL_BEGIN
//
//@interface GameIOSPlatform : NSObject
//
//@end
//
//NS_ASSUME_NONNULL_END
#include "cocos/platform/ios/IOSPlatform.h"
#include "JsbBridgeGame.h"

namespace cc{
class GameIOSPlatform : public cc::IOSPlatform {
public:
    /**
     * @brief Start base platform initialization.
     */
    int32_t run(int argc, const char** argv) override;
private:
    JsbBridgeGame* jsbBridgeGame{nullptr};
};
}

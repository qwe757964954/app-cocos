//
//  JsbBridgeGame.h
//  266-game-mobile
//
//  Created by mac on 2023/6/19.
//

#import <Foundation/Foundation.h>
#import <QsdkCocosKit/WXSdkManeger.h>
NS_ASSUME_NONNULL_BEGIN

@interface JsbBridgeGame : NSObject
+(instancetype)sharedManager;
- (NSString *)convertToJsonData:(NSDictionary *)dict;
- (NSDictionary *)dictionaryWithJsonString:(NSString *)jsonString;
@end

NS_ASSUME_NONNULL_END

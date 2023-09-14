//
//  NativeOcClass.h
//  266
//
//  Created by mac on 2023/6/27.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface NativeOcClass : NSObject
+(void)closeMobLogin:(NSString *)str;
+(void)isSupportMobLogin:(NSString *)str;
+(void)setMobPrivacy:(NSString *)jsonstr;
+(void)onWechatLoginClick:(NSString *)jsonstr;
+(void)onAppleLoginClick:(NSString *)jsonstr;
+(void)requestPay:(NSString *)jsonstr;
+(void)mobLogin:(NSString *)jsonstr;
+(void)onAdPreload:(NSString *)jsonstr;
+(void)onShowAdmob:(NSString *)jsonstr;
+(void)hideAds:(NSString *)jsonstr;
+(bool)isWXAppInstalled:(NSString *)jsonstr;
@end

NS_ASSUME_NONNULL_END

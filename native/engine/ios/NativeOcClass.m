//
//  NativeOcClass.m
//  266
//
//  Created by mac on 2023/6/27.
//

#import "NativeOcClass.h"
#import <QsdkCocosKit/QMessageManager.h>
#import "JsbBridgeGame.h"
@implementation NativeOcClass
+(void)closeMobLogin:(NSString *)str
{
    [[QMessageManager sharedManager]closeMobLogin];
}
+(void)isSupportMobLogin:(NSString *)str
{
    [[QMessageManager sharedManager]preMobLogin];
}
+(void)setMobPrivacy:(NSString *)jsonstr
{
    [[QMessageManager sharedManager]setMobPrivacy:jsonstr];
}

+(void)mobLogin:(NSString *)jsonstr
{
    [[QMessageManager sharedManager]mobLogin];
}

+(bool)isWXAppInstalled:(NSString *)jsonstr
{
    return [[QMessageManager sharedManager]isWXAppInstalled];
}

+(void)onWechatLoginClick:(NSString *)jsonstr
{
    NSDictionary *dict = [[JsbBridgeGame sharedManager]dictionaryWithJsonString:jsonstr];
    [[QMessageManager sharedManager]onWechatLoginClick:dict];
}
+(void)onAppleLoginClick:(NSString *)jsonstr
{
    [[QMessageManager sharedManager]onAppleLoginClick];
}

+(void)requestPay:(NSString *)jsonstr
{
    NSDictionary *dict = [[JsbBridgeGame sharedManager]dictionaryWithJsonString:jsonstr];
    [[QMessageManager sharedManager]requestPay:dict];
}
+(void)onAdPreload:(NSString *)jsonstr{
    NSDictionary *dict = [[JsbBridgeGame sharedManager]dictionaryWithJsonString:jsonstr];
    [[QMessageManager sharedManager]onAdPreload:dict];
}

+(void)onShowAdmob:(NSString *)jsonstr{
    NSDictionary *dict = [[JsbBridgeGame sharedManager]dictionaryWithJsonString:jsonstr];
    [[QMessageManager sharedManager]onShowAdmob:dict];
}

+(void)hideAds:(NSString *)jsonstr{
    NSDictionary *dict = [[JsbBridgeGame sharedManager]dictionaryWithJsonString:jsonstr];
    [[QMessageManager sharedManager]hideAds:dict];
}


@end

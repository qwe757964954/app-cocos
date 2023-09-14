//
//  JsbBridgeGame.m
//  266-game-mobile
//
//  Created by mac on 2023/6/19.
//
#include <iostream>
#include <string>
#import <QuartzCore/QuartzCore.h>
#import "JsbBridgeGame.h"
#import <Foundation/Foundation.h>
#import "cocos/platform/apple/JsbBridgeWrapper.h"
#import <QsdkCocosKit/WXSdkManeger.h>
#import <QsdkCocosKit/QMessageManager.h>
@implementation JsbBridgeGame
+(instancetype)sharedManager{
    static JsbBridgeGame *jbw = nil;
    static dispatch_once_t pred;
    dispatch_once(&pred, ^{
        //        jbw = [[self alloc]init];
        jbw = [[super allocWithZone:NULL]init];
        
    });
    return jbw;
}

+(id)allocWithZone:(struct _NSZone *)zone{
    return [JsbBridgeGame sharedManager];
}

-(id)copyWithZone:(struct _NSZone *)zone{
    return [JsbBridgeGame sharedManager];
}


-(id)init{
    if((self = ([super init]))){
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(onPlatformNotification:) name:@"onPlatformNotification" object:nil];
    }
    return self;
}

- (void)onPlatformNotification:(NSNotification *)noti
{
    
    JsbBridgeWrapper *m = [JsbBridgeWrapper sharedInstance];
    NSDictionary *userinfo = noti.object;
    NSDictionary *info = userinfo[@"info"] ? userinfo[@"info"] : @{};
    NSString *jsonStr = [[JsbBridgeGame sharedManager]convertToJsonData:info];
    dispatch_async(dispatch_get_main_queue(), ^{
        [m dispatchEventToScript:userinfo[@"method"] arg:jsonStr];
    });
}

- (NSString *)convertToJsonData:(NSDictionary *)dict
{
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:dict options:NSJSONWritingPrettyPrinted error:&error];
    NSString *jsonString;

    if (!jsonData) {
        NSLog(@"%@",error);
    } else {
        jsonString = [[NSString alloc]initWithData:jsonData encoding:NSUTF8StringEncoding];
    }

    NSMutableString *mutStr = [NSMutableString stringWithString:jsonString];

    NSRange range = {0,jsonString.length};

    //去掉字符串中的空格
    [mutStr replaceOccurrencesOfString:@" " withString:@"" options:NSLiteralSearch range:range];

    NSRange range2 = {0,mutStr.length};

    //去掉字符串中的换行符
    [mutStr replaceOccurrencesOfString:@"\n" withString:@"" options:NSLiteralSearch range:range2];

    return mutStr;
}

- (NSDictionary *)dictionaryWithJsonString:(NSString *)jsonString
{
    if (jsonString == nil) {
        return nil;
    }

    NSData *jsonData = [jsonString dataUsingEncoding:NSUTF8StringEncoding];
    NSError *err;
    NSDictionary *dic = [NSJSONSerialization JSONObjectWithData:jsonData
                                                        options:NSJSONReadingAllowFragments
                                                          error:&err];
    if(err)
    {
        NSLog(@"json解析失败：");
//        return nil;
    }
    return dic;
}

@end

编译之后，插件会将raw-assets目录内的所有文件复制到编译后的assets目录内。

并会区分平台

如 raw-assets/all/readme.txt 文件会被复制到以下位置:

1. windows: build/windows/data/readme.txt  (最后运行时在game.exe/../Resources/readme.txt)
2. android: build/android/data/readme.txt  (最后运行时在apk/assets/readme.txt)


-------------

raw-assets/windows/abc.txt 只会复制到windows平台，其他平台不会复制。


平台名:
all: 所有平台

export type Platform =
    | 'web-desktop'
    | 'web-mobile'
    | 'wechatgame'
    | 'wechatprogram'
    | 'oppo-mini-game'
    | 'vivo-mini-game'
    | 'huawei-quick-game'
    | 'alipay-mini-game'
    | 'taobao-creative-app'
    | 'taobao-mini-game'
    | 'mac'
    | 'ios'
    | 'linux'
    // | 'ios-app-clip'
    | 'android'
    | 'ohos'
    | 'open-harmonyos'
    | 'windows'
    | 'xiaomi-quick-game'
    | 'baidu-mini-game'
    | 'bytedance-mini-game'
    | 'cocos-play'
    | 'huawei-agc'
    | 'link-sure'
    | 'qtt'
    | 'fb-instant-games'
    | 'cocos-runtime'
    | 'xr-meta'
    | 'xr-huaweivr'
    | 'xr-pico'
    | 'xr-rokid'
    | 'xr-monado'
    | 'ar-android'
    | 'ar-ios'
    | 'xr-spaces'
    | 'xr-seed'
    | 'online'
    | 'xr-gsxr'
    | 'xr-yvr'
    | 'xr-htc'
    | 'xr-iqiyi'
    | 'xr-skyworth'
    | 'xr-ffalcon'
    | 'xr-nreal'
    | 'xr-inmo'
    | 'xr-lenovo'
    ;
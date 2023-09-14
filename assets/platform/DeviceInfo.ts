import { sys } from "cc";
import { NativeDevice, log } from "./NativeDevice";
interface DeviceInfoCallback{
    (result: string):void;
}

function IS_IOS (): boolean{
    return sys.isNative && sys.os === sys.OS.IOS;
}

function IS_WINDOWS(): boolean{
    return sys.os === sys.OS.WINDOWS;
}

function IS_WEB(): boolean {
    return sys.isBrowser;
}

export namespace Device{
    export enum Orientation{
        PORTRAIT = 0,
        LANDSCAPE_RIGHT = 90,
        PORTRAIT_UPSIDE_DOWN = 180,
        LANDSCAPE_LEFT = -90
    }
}

export class DeviceInfo {

    static orientationSenseAngle = 45;

    /**
     * 获取平台类型
     * @returns string类型,如:android,ios,windows,web.
     */
    static getPlatform(): string {
        if (sys.isNative && sys.os === sys.OS.ANDROID) {
            return "android";
        }
        if (sys.isNative && sys.os === sys.OS.IOS) {
            return "ios";
        }
        if (sys.isNative && sys.os === sys.OS.WINDOWS) {
            return "windows";
        }
        if (sys.isBrowser) {
            return "web";
        }
        return "unknow"
    }

    /**
     * 获取设备序列号
     * @param listener (result :string) => void类型
     */
    static getSerialNumber(listener :DeviceInfoCallback): void {
        NativeDevice.getSerialNumber(listener);
    }

    /**
     * 获取电话号码
     * @param listener (result :string) => void类型
     */
    static getPhoneNumber(listener :DeviceInfoCallback): void{
        NativeDevice.getPhoneNumber(listener);
    }

    /**
     * 获取imei
     * @param listener (result :string) => void类型
     */
    static getImei(listener :DeviceInfoCallback): void{
        NativeDevice.getImei(listener);
    }

    /**
     * 设置屏幕亮度
     * @param brightness number,亮度值取值0～255,最大亮度为255,最低亮度为0.
     */
    static setScreenBrightness(brightness :number): void{
        return NativeDevice.setScreenBrightness(brightness);
    }

    /**
     * 获取屏幕亮度
     * @returns number 屏幕亮度值.
     */
    static getScreenBrightness(): number{
        return NativeDevice.getScreenBrightness();
    }

    /**
     * 是否是刘海屏
     * 返回值: boolean,true是刘海屏,false不是刘海屏.
     */
    static isNotchScreen(): boolean{
        return NativeDevice.isNotchScreen();
    }

    /**
     * 获取设备型号
     * @returns string,设备型号如:PRO 6s.
     */
    static getModel(): string{
        return NativeDevice.getModel();
    }

    /**
     * 获取包的版本号
     * @returns string,包的版本号.
     */
    static getVersion(): string{
        return NativeDevice.getVersion();
    }

    /**
     * 获取设备品牌
     * @returns string,如:MEIZU PRO 6S.
     */
    static getBrand(): string{
        return NativeDevice.getBrand();
    }

    /**
     * 获取设备制造商
     * @returns string,如:Google,Meizu.
     */
    static getManufacturer(): string{
        return NativeDevice.getManufacturer();
    }

    /**
     * 获取UUID
     * @returns string,这个值每次获取都会变.
     */
    static getUUID(): string{
        return NativeDevice.getUUID();
    }

    /**
     * 获取设备名称
     * @returns string,如:MEIZU PRO 6s.
     */
    static getDeviceName(): string{
        return NativeDevice.getDeviceName();
    }

    /**
     * 获取包名
     * @returns string,如:com.boyaa.cocos.devicedemo.
     */
    static getPackageName(): string{
        return NativeDevice.getPackageName();
    }

    /**
     * 获取包的版本号名称
     * @returns string,如:devicedemo-test.
     */
    static getVersionName(): string{
        return NativeDevice.getVersionName();
    }

    /**
     * 获取包的版本号名称
     * @returns string,如:1.
     */
    static getVersionCode(): string{
        return NativeDevice.getVersionCode();
    }

    /**
     * 获取ip地址
     * @returns string,如:192.168.1.103.
     */
    static getIPAddress(): string{
        return NativeDevice.getIPAddress();
    }

    /**
     * 获取用户代理
     * @returns string,如: Mozilla/5.0 (Linux; Android 11; Pixel 2 Build/RP1A.201005.004.A1; wv) 
     * AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/105.0.5195.136 Mobile Safari/537.36.
     */
    static getUserAgent(): string{
        return NativeDevice.getUserAgent();
    }

    /**
     * 获取国家标识
     * @returns string,如:CN.
     */
    static getCountry(): string{
        return NativeDevice.getCountry();
    }

    /**
     * 获取时区
     * @returns string,如:Asia/Shanghai.
     */
    static getTimeZone(): string{
        return NativeDevice.getTimeZone();
    }

    /**
     * 获取语言标识
     * @returns string,如:zh-Hans-CN.
     */
    static getLocale(): string{
        return NativeDevice.getLocale();
    }

    /**
     * 是否是平板
     * @returns boolean,true是,false不是.
     */
    static isTablet(): boolean{
        return NativeDevice.isTablet();
    }

    /**
     * 是否是模拟器
     * @returns boolean,true是,false不是.
     */
    static isSimulator(): boolean{
        return NativeDevice.isSimulator();
    }

    /**
     * 获取当前音量值
     * @returns int,当前音量值.
     */
    static getVolume(): number{
        return NativeDevice.getVolume();
    }

    static AUDIO_FLAG_SOUND: number = 1;
    static AUDIO_FLAG_UI: number = 2;
    static AUDIO_FLAG_UI_SOUND: number = 3;
    static AUDIO_FLAG_NONE: number = 4;

    /**
     * 设置当前音量值
     * @param volume number,设置的音量值.
     * @param flag 设置时系统音量条的显示模式.
     * 取值如下:
     * 
     * DeviceInfo.AUDIO_FLAG_SOUND: 只有提示音没有进度条.
     * 
     * DeviceInfo.AUDIO_FLAG_UI: 只有进度条没有提示音.
     * 
     * DeviceInfo.AUDIO_FLAG_UI_SOUND既有进度条又有提示音.
     * 
     * DeviceInfo.AUDIO_FLAG_NONE: 没有提示音也没有进度条.
     */
    static setVolume(volume :number,flag :number): void{
        NativeDevice.setVolume(volume,flag);
    }

    /**
     * 按照系统步进增加音量
     * @param flag number,设置时系统音量条的显示模式.
     *  取值如下:
     * 
     * DeviceInfo.AUDIO_FLAG_SOUND: 只有提示音没有进度条.
     * 
     * DeviceInfo.AUDIO_FLAG_UI: 只有进度条没有提示音.
     * 
     * DeviceInfo.AUDIO_FLAG_UI_SOUND既有进度条又有提示音.
     * 
     * DeviceInfo.AUDIO_FLAG_NONE: 没有提示音也没有进度条.
     */
    static raiseVolume(flag :number): void{
        NativeDevice.raiseVolume(flag);
    }

    /**
     * 降低音量
     * @param flag number,设置时系统音量条的显示模式.
     *  取值如下:
     * 
     * DeviceInfo.AUDIO_FLAG_SOUND: 只有提示音没有进度条.
     * 
     * DeviceInfo.AUDIO_FLAG_UI: 只有进度条没有提示音.
     * 
     * DeviceInfo.AUDIO_FLAG_UI_SOUND既有进度条又有提示音.
     * 
     * DeviceInfo.AUDIO_FLAG_NONE: 没有提示音也没有进度条.
     */
    static lowerVolume(flag :number): void{
        NativeDevice.lowerVolume(flag);
    }
    
    /**
     * 是否保持屏幕常亮
     * @param enable boolean,true保持常亮,false关闭保持常亮.
     */
    static keepScreenOn(enable :boolean): void{
        NativeDevice.keepScreenOn(enable);
    }
    
    /**
     * 获取手机屏幕对角尺寸
     * @param enable number,如:4.7257247.
     */
    static getInches(): number{
        return NativeDevice.getInches();
    }
    
    /**
     * 获取内存信息
     * @returns any,是一个json对象可直接取字段值.
     * 
     * 字段如下:
     * 
      android:  
        {
           
            "totalMem": 3834609664,(byte)系统总内存.

            "availMem": 1755373568,(byte)可使用内存.

            "threshold": 226492416,(byte)可用内存达到此阈值后被认为可用内存过低,后台服务或者进程会被杀掉.

            "processUsedSize": 112753,(kb)当前进程正在使用的内存,api23以后为javaHeap,nativeHeap,code,stack,graphics,privateOther,system值的和,
                                      此值与使用androidstudio中profiler调试工具时显示的应用使用的总内存值相同.

            "runtime": {

                "maxMemory": 201326592, (byte)可用的最大内存,java虚拟机(当前进程)能构从操作系统那里挖到的最大的内存.

                "totalMemory": 27379608, (byte)app已占用的内存,java虚拟机现在已经从操作系统那里挖过来的内存大小,也就是java虚拟机这个进程当时所占用的所有内存.

                "freeMemory": 24870912, (byte)app已经占用但实际未使用的内存,这些挖过来而又没有用上的内存.

                "nativeHeapAllocatedSize": 20421072, (byte)--当前进程已经分配的native堆内存.

                "nativeHeapFreeSize": 42221408, (byte)--当前进程navtive堆中空闲内存.

                "nativeHeapSize": 66105344,	(byte)当前进程占用navtive堆总的内存大小.

                以下字段api23以后才可以拿到正确的值,低于此api的设备值为0,这些值对应与'adb shell dumpsys meminfo 包名'命令中 App Summary
                中的值也与使用androidstudio中profiler调试工具时显示的各个字段值相同.               

                "javaHeap": 8792, (kb)java堆占用的物理内存.

                "nativeHeap": 15980, (kb)C++/C堆占用的物理内存.

                "code": 51000, (kb)代码和其它静态资源占用的物理内存.

                "stack": 836, (kb)栈占用的物理内存,包括java和native栈.
                
                "graphics": 1764, (kb)图形占用的物理内存包括Gfx,EGL,GL.

                "privateOther": 29920, (kb)应用中还未被计算在内的物理内存.

                "system": 4461,	(kb)系统占用的物理内存.

                "totalSwap": 11352 (kb)交换区内存.

            }

        }
    ios: 
        {
           
            "totalMem": 3834609664,(byte)系统总内存.

            "availMem": 1755373568,(byte)可使用内存.

            "threshold": 226492416,(byte)可用内存达到此阈值后被认为可用内存过低,后台服务或者进程会被杀掉.

            "runtime": {

                "maxMemory": 201326592, (byte)可用的最大内存,当前进程能构从操作系统那里挖到的最大的内存.

                "totalMemory": 27379608, (byte)app已占用的内存,当前进程从操作系统那里挖过来的内存大小,也就是当前进程当时所占用的所有内存.

                "freeMemory": 24870912, (byte)app已经占用但实际未使用的内存,这些挖过来而又没有用上的内存.

                "nativeHeapAllocatedSize": 0, --为0.

                "nativeHeapFreeSize": 0, --为0.

                "nativeHeapSize": 0, --为0.
            }

        }
     * 
     */
    static getMemoryInfo(): any{
        return JSON.parse(NativeDevice.getMemoryInfo())
    }
    
    /**
     * 调用系统浏览器应用打开传入的url
     * @param url string,网页地址如:"https://www.boyaa.com/game.html".
     */
    static openUrl(url :string): void{
        NativeDevice.openUrl(url);
    }

    /**
     * 打开系统拨号界面
     * @param phoneNumber string,拨号界面显示的电话号码.
     */
    static openDialer(phoneNumber :string): void{
        NativeDevice.openDialer(phoneNumber);
    }
    
    /**
     * 打开系统发送短信界面
     * @param phoneNumber string,发送短信界面发送的目标联系人的号码.
     * @param message string,发送的短信内容.
     */
    static openSms(phoneNumber :string,message :string): void{
        NativeDevice.openSms(phoneNumber,message);
    }

    /**
     * 打开系统设置界面
     */
    static openSysSetting(): void{
        NativeDevice.openSysSetting();
    }

    /**
     * 打开应用设置界面
     */
    static openAppSettings(): void{
        NativeDevice.openAppSettings();
    }

    /**
     * 打开闪光灯
     */
    static openFlashLight(): void{
        NativeDevice.openFlashLight();
    }

    /**
     * 关闭闪光灯
     */
    static offFlashLight(): void{
        NativeDevice.offFlashLight();
    }

    /**
     * 获取cpu信息,在 iOS 系统中,获取各个 CPU 核心的运行频率需要使用私有 API,这可能会导致应用被拒绝.
     * @returns any,是一个json对象可直接取值.
     * 
     *   {

     *   "arch": "arm64-v8a",string 设备架构.

     *   "count": 2, cpu核心数.

     *   "detail": cpu各个核心的频率信息
            [
                {

                "minMhz": 300, 第一个核心最小频率.

                "maxMhz": 1900, 第一个核心最大频率.

                "currentMhz": 1171 第一个核心当前频率.

                },
                {
                "minMhz": 300,
                "maxMhz": 1900,
                "currentMhz": 1171
                }

           ]
        }
     */
    static getCpuData(): any{
        return JSON.parse(NativeDevice.getCpuData());
    }
    
    /**
     * 是否可以弹出通知栏
     * @returns boolean,true用户设置系统允许弹通知栏,false用户设置系统不允许弹通知栏.
     */
    static notificationsEnabled(): boolean{
        return NativeDevice.notificationsEnabled();
    }

    /**
     * 打开应用通知设置界面
     */
    static openAppNotificationSettings(): void{
        NativeDevice.openAppNotificationSettings();
    }
    
    /**
     * 监听用户按音量键的操作
     * @param listener (result: number) => void 类型,监听器.
     * 
     * 回调:
     * result,number,系统音量值,设置以后每按一次音量按键就会回调一次当前音量值.
     */
    static addKeyEventListener(listener :(result :number) => void): void{
        NativeDevice.addKeyEventListener(listener);
    }
    
    /**
     * 监听设备朝向
     * 默认监听0,90,180,360四个角度左右45度范围即所有角度,
     * 手机朝向在0-90,90-180,180-270,270-360某个范围内只回调一次,
     * 可通过setOrientationSenseAngle改变监听范围.     
     * @param enable boolean,true开启监听,false,停止监听.
     * @param listener (result: number) => void 类型,监听器.
     * 
     * 回调:
     * result,number,手机水平时result为-1此时监听不到手机朝向,不是水平时,手持手机顶部在上,
     * 手机顶部顺时针旋转360,角度的变化从0到359回调如下:
     * 
     * 0-45,315-359 : Device.Orientation.PORTRAIT //手机顶部上
     * 
     * 45-135 : Device.Orientation.LANDSCAPE_RIGHT //手机顶部朝右
     * 
     * 135-225 : Device.Orientation.PORTRAIT_UPSIDE_DOWN //手机顶部朝下
     * 
     * 225-315 : Device.Orientation.LANDSCAPE_LEFT //手机顶部朝左
     * 
     */
    static setOrientationEvent(enable: boolean,listener :(result :number) => void): void{
        NativeDevice.setOrientationEvent(enable,DeviceInfo.orientationSenseAngle,listener);
    }
    
    /**
     * 设置监听屏幕朝向角度的范围
     * @param senseAngle number,默认为45,最小为0,最大为45,值越大监听的范围越广.
     * 比如senseAngle值为30:
     * 那么手机朝向改变为以下角度范围内时才会有回调:
     * 0度方向范围:330-359,0-30 内回调Device.Orientation.PORTRAIT
     * 90度方向范围:60-120      内回调Device.Orientation.LANDSCAPE_RIGHT
     * 180度方向范围:150-210    内回调Device.Orientation.PORTRAIT_UPSIDE_DOWN
     * 270度方向范围:240-300    内回调Device.Orientation.LANDSCAPE_LEFT
     * 
     */
    static setOrientationSenseAngle(senseAngle: number): void{
        if (senseAngle > 45){
            senseAngle = 45;
        }
        if(senseAngle < 0) {
            senseAngle = 0;
        }
        DeviceInfo.orientationSenseAngle = senseAngle;
    }
    
    /**
     * 设置设备屏幕朝向
     * @param orientation Device.Orientation中的枚举值,其它值无效,取以下值其一:
     * 
     * Device.Orientation.PORTRAIT 竖屏
     * 
     * Device.Orientation.PORTRAIT_UPSIDE_DOWN 竖屏
     * 
     * Device.Orientation.LANDSCAPE_RIGHT 横屏
     * 
     * Device.Orientation.LANDSCAPE_LEFT 横屏
     */
    static setOrientation(orientation: Device.Orientation): void{
        NativeDevice.setOrientation(orientation);
    }
    
    /**
     * 获取刘海屏信息  android8.0适配了华为、oppo、vivo、小米，9.0使用原生接口.
     * @param listener (result: any) => void类型,监听器.
     * 
     * 回调:
     * result为json对象可直接从以下字段取值.
     * 
     * {
     * 
     *     "SafeInsetLeft":0, //number,为安全区域距离屏幕左边的距离,单位是px.
     * 
     *     "SafeInsetRight":0, //number,为安全区域距离屏幕右边的距离,单位是px.
     * 
     *     "SafeInsetBottom":0, //number,为安全区域距离屏幕底边的距离,单位是px.
     * 
     *     "cutoutHeight":0, //number,刘海屏的高度,单位是px.
     * 
     *     "hasCutout":false  //boolean是否有刘海屏,true有,false没有.
     * 
     * }
     */
    static getCutoutInfo(listener: (result: any) => void): void{
        NativeDevice.getCutoutInfo(listener);
    }

    /**
     * 
     * @returns string,当前device TS脚本版本
     */
    static getScriptVersion(): string{
        return NativeDevice.CURRENT_SCRIPT_VERSION;
    }
    
    /**
     * 
     * @returns string,当前原生sdk的版本.
     */
    static getNativeVersion(): string{
        return NativeDevice.CURRENT_SCRIPT_VERSION;
    }
    
}
 

 
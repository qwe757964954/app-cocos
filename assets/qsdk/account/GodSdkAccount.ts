import { Log } from "bos/exports"
import { native, sys } from "cc"
import { NATIVE } from "cc/env"
import * as platform from "idl/mpff/user/passport.v1"
import { GodSdk } from "qsdk/godsdk/GodSdk"
import { BindCallback, MobCallback, MobListener, MobResult, PlatformParam, SupportCallback } from "./Account"

const LOGIN_TAGS: { [platform: number]: string } = {
    [platform.PlatformType.Weixin]: "weixin",
    [platform.PlatformType.Oppo]: "oppo",
    [platform.PlatformType.Vivo]: "vivo_online",
    [platform.PlatformType.Huawei]: "huawei",
}

export type GodLoginResult = {
    success: boolean
    platform: platform.PlatformType
    msg?: string
    mainStatus?: number
    subStatus?: number
    code?: string
    extra?: {
        user: string
        email: string
        givenName: string
        familyName: string
        realUserStatus: string
        code: string
        token: string
    }
}

export type IosWxLoginResult = {
    code?: string
    state?: string
    msg?: string
    appID?: string
}



export type AppleType = {
    user?: string
    realUserStatus?: string
    authorizationCode?: string
    identityToken?: string
    familyName?: string
    givenName?: string
    email?: string
    credential?: string
    password?: string
    msg?: string
    state?: string
}

export interface LoginListener {
    onLoginResult(result: GodLoginResult)
}


export class GodSdkAccount {
    private static inited = false;
    private static loginListener: LoginListener = null
    private static mobListener: MobListener = null;
    private static isBindWechat:boolean = false;
    private static bindCb:BindCallback = null;
    private static supportCb:SupportCallback  = null;
    private static mobCb:MobCallback = null;
    static init() {
        if (this.inited) {
            return
        }
        this.inited = true

        GodSdk.init()
        if (NATIVE && sys.isMobile) {
            native.jsbBridgeWrapper.addNativeEventListener("godsdk.onLogin", this.onAndroidLogin.bind(this))
            native.jsbBridgeWrapper.addNativeEventListener("onWechatCallback", this.onIosWechatCallback.bind(this));
            native.jsbBridgeWrapper.addNativeEventListener("onAppleCallback", this.onAppleCallback.bind(this));
            native.jsbBridgeWrapper.addNativeEventListener("onMobCallback", this.onMobCallback.bind(this));

        }
    }
    static setLoginListener(listener: LoginListener) {
        this.loginListener = listener
    }

    static setMobListener(listener: MobListener) {
        this.mobListener = listener
    }

    private static notifyListener(result: GodLoginResult) {
        if (this.loginListener) {
            this.loginListener.onLoginResult(result)
        }
    }

    public static setMobLoginListener(listener:MobListener){
        this.mobListener = listener
    }
    private static onAndroidLogin(param: string) {
        console.log("GodSdkAccount.onLogin", param)
        let json
        try {
            json = JSON.parse(param)
        } catch (e) {
            console.error(e)
            return
        }
        if (json.method == "onLoginSuccess" || json.method == "onLoginFailed") {
            let status = json.status || {}
            let plat: platform.PlatformType = null
            for (let key in LOGIN_TAGS) {
                let tag = LOGIN_TAGS[key]
                if (tag == json.loginTag) {
                    plat = parseInt(key)
                    break
                }
            }
            let result: GodLoginResult = {
                success: json.method == "onLoginSuccess",
                msg: status.msg,
                mainStatus: status.mainStatus,
                subStatus: status.subStatus,
                platform: plat,
                code: plat == platform.PlatformType.Weixin && status.extras && status.extras.loginInfo
            }
            this.notifyListener(result);
        }
    }

    private static async onMobCallback(jsonData: string) {
        Log.w("onMobCallback", jsonData);
        let result: MobResult = JSON.parse(jsonData);
        Log.w("onMobCallback", result);
        if (result.preMob) {
            if (this.supportCb) {
                this.supportCb(result.status);
            }
            return;
        }
        if(result.LoginType){
            if (this.mobListener) {
                this.mobListener.onMobResult(result)
            }
            return;
        }
        if (this.mobCb) {
            this.mobCb(result);
        }
    }

    private static async onIosWechatCallback(jsonData: string){
        Log.w("onWechatCallback", jsonData);
        let result: IosWxLoginResult = JSON.parse(jsonData);
        if (this.isBindWechat) {
            if(this.bindCb){
                this.bindCb(result);
            }
            this.isBindWechat = false;
        }else{
            this.iosWechatLogin(result);
        }
    }

    private static iosWechatLogin(result:IosWxLoginResult){
        if (parseInt(result.state) < 0) {
            this.notifyListener({
                success: false,
                platform: platform.PlatformType.Weixin,
            })
        } else {
            this.notifyListener({
                platform: platform.PlatformType.Weixin,
                success: true,
                code: result.code,
                msg: result.msg,
            })
        }
    }

    private static async onAppleCallback(jsonData: string) {
        Log.w("onAppleCallback", jsonData);
        const result: AppleType = JSON.parse(jsonData);
        this.notifyListener({
            success: true,
            platform: platform.PlatformType.Apple,
            msg: result.msg,
            extra: {
                user: result.user,
                email: result.email,
                givenName: result.givenName,
                familyName: result.familyName,
                realUserStatus: result.realUserStatus,
                code: result.authorizationCode,
                token: result.identityToken,
            }
        })
    }

    static wechatLogin(param: PlatformParam) {
        if (sys.platform == sys.Platform.ANDROID) {
            native.reflection.callStaticMethod(
                GodSdk.JAVA_CLASS,
                "login",
                "(Ljava/lang/String;)V",
                LOGIN_TAGS[param.type]
            )
        }else if(sys.platform == sys.Platform.IOS){
            let params = { UniversalLinks: param.universalLinks || "", state: "login" };
            var ret = native.reflection.callStaticMethod("NativeOcClass",
                                          "onWechatLoginClick:",JSON.stringify(params));
        }
    }

    public static bindWechat(universalLinks?:string,callback?:BindCallback){
        this.isBindWechat = true;
        this.bindCb = callback;
        if (sys.platform == sys.Platform.ANDROID) {
            // native.reflection.callStaticMethod(
            //     GodSdk.JAVA_CLASS,
            //     "login",
            //     "(Ljava/lang/String;)V",
            //     LOGIN_TAGS[platform]
            // )
        }else if(sys.platform == sys.Platform.IOS){
            let params = { UniversalLinks: universalLinks || "", state: "bind",scope: "snsapi_userinfo" };
            var ret = native.reflection.callStaticMethod("NativeOcClass",
                                          "onWechatLoginClick:",JSON.stringify(params));
        }
    }

    public static loginAppleNative(){
        if (sys.platform == sys.Platform.IOS) {
            var ret = native.reflection.callStaticMethod("NativeOcClass",
                                          "onAppleLoginClick:","");
        }
    }

    static logout(platform: platform.PlatformType) {
        if (sys.platform == sys.Platform.ANDROID) {
            native.reflection.callStaticMethod(
                GodSdk.JAVA_CLASS,
                "requestLogout",
                "(Ljava/lang/String;)V",
                LOGIN_TAGS[platform]
            )
        }
    }

    public static setMobPrivacy(str: string) {
        if (sys.platform == sys.Platform.ANDROID) {

        } else if (sys.platform == sys.Platform.IOS) {
            var ret = native.reflection.callStaticMethod("NativeOcClass",
                "setMobPrivacy:", str);
        }
    }

    public static isSupportMobLogin(callback:SupportCallback) {
        this.supportCb = callback;
        if (sys.platform == sys.Platform.ANDROID) {

        } else if (sys.platform == sys.Platform.IOS) {
            var ret = native.reflection.callStaticMethod("NativeOcClass",
                "isSupportMobLogin:", "");
        }
    }

    public static closeMobLogin() {
        if (sys.platform == sys.Platform.ANDROID) {

        } else if (sys.platform == sys.Platform.IOS) {
            var ret = native.reflection.callStaticMethod("NativeOcClass",
                "closeMobLogin:", "");
        }
    }
    public static mobLogin(callback:MobCallback) {
        this.mobCb = callback;
        if (sys.platform == sys.Platform.ANDROID) {

        } else if (sys.platform == sys.Platform.IOS) {
            var ret = native.reflection.callStaticMethod("NativeOcClass",
                "mobLogin:", "");
        }
    }

    public static isWXAppInstalled() {
        let isInstall = false
        if (sys.platform == sys.Platform.ANDROID) {
            isInstall = true;
        } else if (sys.platform == sys.Platform.IOS) {
            isInstall = native.reflection.callStaticMethod("NativeOcClass",
                "isWXAppInstalled:", "");
        }
        return isInstall;
    }

}
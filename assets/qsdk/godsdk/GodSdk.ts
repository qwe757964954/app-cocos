
import { js, native, sys } from "cc";

import { NATIVE } from "cc/env";

// local LoginTags = {
//     OPPO = "oppo",
//     Huawei = "huawei_hms_cn",
//     Weixin = "weixin",
//     Vivo = "vivo_online",
//     MobSDK = "mob"
// }

export interface GodSdkListener {
    onInitResult(result: InitResult)
}

export type InitResult = {
    success: boolean
    msg?: string
    mainStatus?: number
    subStatus?: number
    extra?: {
        channel?: string
    }
}

/**
 * godsdk相关功能。 （初始化，specialmethod等）
 */
export class GodSdk {

    static JAVA_CLASS = "com/boyaa/cocos/qsdk/GodSdkExtend"

    private static inited = false
    private static listeners: GodSdkListener[] = []

    public static init() {
        if (this.inited) {
            return
        }
        this.inited = true
        if (sys.platform == sys.Platform.ANDROID) {
            native.reflection.callStaticMethod(
                this.JAVA_CLASS,
                "init",
                "()V"
            )
        }
        if (NATIVE && sys.isMobile) {
            native.jsbBridgeWrapper.addNativeEventListener("godsdk.onCallBack", this.onCallBack.bind(this))
            native.jsbBridgeWrapper.addNativeEventListener("godsdk.onSpecial", this.onSpecial.bind(this))
        }
    }

    public static addListener(listener: GodSdkListener) {
        if (!this.listeners.includes(listener)) {
            this.listeners.push(listener)
        }
    }

    public static removeListener(listener: GodSdkListener) {
        js.array.fastRemove(this.listeners, listener)
    }

    private static onCallBack(param: string) {
        console.log("GodSdk.onCallBack", param)
        let json = null
        try {
            json = JSON.parse(param)
        } catch (e) {
            console.error(e)
            return
        }
        if (json.method == "onInitSuccess" || json.method == "onInitFailed") {
            let result: InitResult = {
                success: json.method == "onInitSuccess",
                msg: json.status && json.status.msg,
                mainStatus: json.status && json.status.mainStatus,
                subStatus: json.status && json.status.subStatus,
                extra: json.status && json.status.extras,
            }
            for (let listener of this.listeners) {
                listener.onInitResult(result)
            }
        }
    }

    private static onSpecial(param: string) {
        console.log("GodSdk.onSpecial", param)
    }

}
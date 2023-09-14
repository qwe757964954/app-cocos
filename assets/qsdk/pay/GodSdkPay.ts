import { native, sys } from "cc";
import * as trade from "idl/mpff/pay/trade.v1";
import { PayChannel } from "idl/mpff/pay/trade.v1";

import { GodSdk } from "../godsdk/GodSdk";
import { Pay, PayResult } from "./Pay";


/**
 * godsdk 支付相关功能。这里仅与godsdk交互，其他与godsdk无关的应该放到Pay，业务也只关心Pay
 */
export class GodSdkPay {

    private static inited = false;

    public static init() {
        if (this.inited) {
            return
        }
        this.inited = true
        GodSdk.init()
        if (sys.platform == sys.Platform.ANDROID) {
            native.jsbBridgeWrapper.addNativeEventListener("godsdk.onIAP", this.onAndroidIAP.bind(this))
        }else if(sys.platform == sys.Platform.IOS){
            native.jsbBridgeWrapper.addNativeEventListener("onIAPCallBack", this.onIosIAP.bind(this));
        }
    }

    private static onAndroidIAP(param: string) {
        console.log("GodSdkPay.onIAP", param)
        let json = null
        try {
            json = JSON.parse(param)
        } catch (e) {
            console.error(e)
            return
        }
        if (json.method == "onPaySuccess" || json.method == "onPayFailed") {
            let result: PayResult = {
                success: json.method == "onPaySuccess",
                pmode: parseInt(json.pmode) || 0,
                msg: json.status && json.status.msg,
                mainStatus: json.status && json.status.mainStatus,
                subStatus: json.status && json.status.subStatus,
            }
            this.processPayResult(result)
        }
    }

    private static onIosIAP(jsonData: string) {
        console.log("GodSdkPay.onIosIAP", jsonData)
        const result: PayResult = JSON.parse(jsonData);
        this.processPayResult(result)
    }

    private static processPayResult(result: PayResult) {
        if (sys.platform == sys.Platform.IOS) {
            this.reportReceiptApple(result);
        } else if (sys.platform == sys.Platform.ANDROID) {
            this.reportReceiptHuaWei(result);
        }
        Pay.notifyListeners(result)
    }

    private static reportReceiptApple(result: PayResult) {
        // TODO 这里的处理也应该放到Pay
    }

    private static reportReceiptHuaWei(result: PayResult) {
        // TODO 这里的处理也应该放到Pay
    }

    /**
     * 唤醒原生层的支付
     * @param param  android:传给godsdk的数据(后端返回的credential), ios:是个object。  该方法会兼容处理2种参数格式
     * @param pmode 
     * @param charge  目前仅ios需要。  为了获取里面的item id
     */
    public static requestPay(param: string | Object, pmode: PayChannel, charge?: trade.ICharge) {
        let json: any = null
        if (typeof param == "string") {
            if(sys.platform == sys.Platform.IOS){
                json = {};
                json.jsonStr = param;
            }else
            {
                json = JSON.parse(param)
            }
            
        } else {
            json = param
        }
        if (pmode == PayChannel.PayChannelWxPay) {
            json.UniversalLinks = Pay.universalLinks
        } else if (pmode == PayChannel.PayChannelApplePay) {
            if (charge && charge.items) {
                let ids = charge.items.map(v => {
                    return v.id
                })
                json.productIDsStr = JSON.stringify(ids)
            }
            json.productID = json.product_id;
        }
        if (sys.platform == sys.Platform.ANDROID) {
            delete json.pmode
            native.reflection.callStaticMethod(
                GodSdk.JAVA_CLASS,
                "requestPay",
                "(Ljava/lang/String;Ljava/lang/String;)V",
                JSON.stringify(json),
                pmode,
            )
        } else if (sys.platform == sys.Platform.IOS) {
            json.pmode = pmode.toString()
            var ret = native.reflection.callStaticMethod("NativeOcClass",
                                          "requestPay:",JSON.stringify(json));
        }
    }
}
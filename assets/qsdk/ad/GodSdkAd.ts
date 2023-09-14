import { native, sys } from "cc";

import { GodSdk } from "../godsdk/GodSdk";
import { AdsType,AdResult, TopnListener } from "./AD";


/**
 * godsdk 支付相关功能。这里仅与godsdk交互，其他与godsdk无关的应该放到Pay，业务也只关心Pay
 */
export class GodSdkAd {

    private static inited = false;
    private static adListener: TopnListener = null
    public static init() {
        if (this.inited) {
            return
        }
        this.inited = true
        GodSdk.init()
        if (sys.platform == sys.Platform.ANDROID) {
            // native.jsbBridgeWrapper.addNativeEventListener("godsdk.onIAP", this.onAndroidIAP.bind(this))
        }else if(sys.platform == sys.Platform.IOS){
            native.jsbBridgeWrapper.addNativeEventListener("onToponCallBack", this.onToponAd.bind(this));
        }
    }

    static setAdListener(listener: TopnListener) {
        this.adListener = listener
    }

    private static adNotifyListener(result: AdResult) {
        if (this.adListener) {
            this.adListener.onAdResult(result)
        }
    }

    private static onToponAd(jsonData: string) {
        console.log("GodSdkPay.onToponAd", jsonData)
        const result: AdResult = JSON.parse(jsonData);
        this.adNotifyListener(result);
    }

    public static preloadAds(adsType:AdsType,adsMod:number,paramStr:string){
        if (sys.platform == sys.Platform.ANDROID) {
            
        } else if (sys.platform == sys.Platform.IOS) {
            const _params: any = JSON.parse(paramStr);
            _params.adsType = adsType;
            _params.adsMod = adsMod;
            _params.request_params = paramStr;
            var ret = native.reflection.callStaticMethod("NativeOcClass",
                                          "onAdPreload:",JSON.stringify(_params));
        }
    }

    public static showAds(adsType:AdsType,adsMod:number,paramStr:string){
        if (sys.platform == sys.Platform.ANDROID) {
            
        } else if (sys.platform == sys.Platform.IOS) {
            const _params: any = JSON.parse(paramStr);
            _params.adsType = adsType;
            _params.adsMod = adsMod;
            _params.request_params = paramStr;
            var ret = native.reflection.callStaticMethod("NativeOcClass",
                                          "onShowAdmob:",JSON.stringify(_params));
        }
    }

    public static hideAds(adsType:AdsType,adsMod:number,paramStr:string){
        if (sys.platform == sys.Platform.ANDROID) {
            
        } else if (sys.platform == sys.Platform.IOS) {
            const _params: any = JSON.parse(paramStr);
            _params.adsType = adsType;
            _params.adsMod = adsMod;
            _params.request_params = paramStr;
            var ret = native.reflection.callStaticMethod("NativeOcClass",
                                          "hideAds:",JSON.stringify(_params));
        }
    }
}
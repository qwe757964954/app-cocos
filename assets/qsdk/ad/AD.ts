import { Log, StorageUtil } from "bos/exports"
import { js, sys } from "cc"
import { GodSdkAd } from "./GodSdkAd"

export interface TopnListener {
    onAdResult(result: AdResult)
}

export interface AdListener {
    onPreLoadCompelete?(result: AdResult),
    onVideoAdPlayFailed?(result: AdResult),
    onVideoAdPlayStart?(result: AdResult),
    onVideoAdPlayEnd?(result: AdResult),
    onAdRewardVerify?(result: AdResult),
    onAdClosed?(result: AdResult),
    onAdClicked?(result: AdResult),
    onAdIsLoading?(result: AdResult),
    onAdsDismissed?(result: AdResult),
    onAdsShown?(result: AdResult),
    onFailed?(result: AdResult),
    onExit?(result: AdResult),
    onPointsSpendSucceed?(result: AdResult),
    onPointsSpendFailed?(result: AdResult),
    onOfferWallPointsChanged?(result: AdResult),
}

export type AdResult = {
    extra?: any
    ad_type?: number
    ad_id?: string
    sceneId?: string
    method?: string
    mainStatus?: number
    request_params?: string
    subStatus?: number
    msg?:string
}

export enum AdsType {
    AD_TYPE_BANNER = 0,
    AD_TYPE_FULLSCREEN = 1,
    AD_TYPE_MOREAPP = 2,
    AD_TYPE_OFFERWALL = 3,
    AD_TYPE_NATIVE = 4,
    AD_TYPE_NATIVE_BANNER = 5,
    AD_TYPE_SPLASH = 6,
    AD_TYPE_NATIVE_SPLASH = 7,
    AD_TYPE_REWARD_VIDEO = 8
}

export enum AdsStatus {
    RESULT_CODE_AdsReceived= 50000,
    RESULT_CODE_AdsShown= 50100,
    RESULT_CODE_AdsDismissed= 50200,
    RESULT_CODE_PointsSpendFailed= 50400,
    RESULT_CODE_OfferWallOnPointsChanged= 50500,
    RESULT_CODE_VideoAdPlayFailed= 50501,
    RESULT_CODE_VideoAdPlayStart= 50502,
    RESULT_CODE_VideoAdPlayProgress= 50503,
    RESULT_CODE_VideoAdPlayEnd= 50504,
    RESULT_CODE_AdClicked= 50505,
    RESULT_CODE_AdClosed= 50506,
    RESULT_CODE_AdRewardVerify= 50507,
    RESULT_CODE_AdIsLoading= 50508,
    RESULT_CODE_NetworkError= 50600,
    RESULT_CODE_UnknownError= 50700,
    RESULT_CODE_Failed= 50800,
    RESULT_CODE_EXIT= 50900
};

export const AdsChannel = {
    duomi: "duomiChannel",
    topon: "topon",
    HMS: "HMS",
    tradplus: "Tradplus",
    donews: "Donews",
    oppo: "Oppo",
    vivo: "Vivo"
};

export type AdParam = {
    adsType?: AdsType
    adsMode?: number
    params?: any
}


/**
 * 提供给业务使用的Pay
 */
export class AD {

    private static inited = false
    private static delegate: AdListener = null
    // private static listeners: AdListener[] = []

    public static init() {
        if (this.inited) {
            return
        }
        this.inited = true
        GodSdkAd.init()
        GodSdkAd.setAdListener({
            onAdResult: this.onGodSdkCallBack.bind(this)
        })
        
    }

    public static setDelegate(delegate:AdListener){
        this.delegate = delegate
    }

    public static onGodSdkCallBack(result: AdResult){
        Log.w("onGodSdkCallBack____________",result);
       
        let msg: any = {};

        if (result.extra) {
            msg = result.extra;
            if (result.extra.request_params) {
                msg.request_params = JSON.parse(result.extra.request_params);
            }
        }else{
            if (sys.platform == sys.Platform.ANDROID) {
                msg = JSON.parse(result.msg);
                if (msg.complete_info && typeof msg.complete_info === "string") {
                    msg.complete_info = JSON.parse(msg.complete_info);
                }
            }else if(sys.platform == sys.Platform.IOS){
                msg = JSON.parse(result.msg);
            }
        }

        if (result.mainStatus === AdsStatus.RESULT_CODE_AdsReceived) {
            if (this.delegate && this.delegate.onPreLoadCompelete) {
                this.delegate.onPreLoadCompelete(msg);
            }
        }else if(result.mainStatus === AdsStatus.RESULT_CODE_VideoAdPlayFailed){
            if (this.delegate && this.delegate.onVideoAdPlayFailed) {
                this.delegate.onVideoAdPlayFailed(msg);
            }
        }else if(result.mainStatus === AdsStatus.RESULT_CODE_VideoAdPlayStart){
            if (this.delegate && this.delegate.onVideoAdPlayStart) {
                this.delegate.onVideoAdPlayStart(msg);
            }
        }else if(result.mainStatus === AdsStatus.RESULT_CODE_VideoAdPlayEnd){
            if (this.delegate && this.delegate.onVideoAdPlayEnd) {
                this.delegate.onVideoAdPlayEnd(msg);
            }
        }else if(result.mainStatus === AdsStatus.RESULT_CODE_AdRewardVerify){
            if (this.delegate && this.delegate.onAdRewardVerify) {
                this.delegate.onAdRewardVerify(msg);
            }
        }else if(result.mainStatus === AdsStatus.RESULT_CODE_AdClosed){
            if (this.delegate && this.delegate.onAdClosed) {
                this.delegate.onAdClosed(msg);
            }
        }else if(result.mainStatus === AdsStatus.RESULT_CODE_AdClicked){
            if (this.delegate && this.delegate.onAdClicked) {
                this.delegate.onAdClicked(msg);
            }
        }else if(result.mainStatus === AdsStatus.RESULT_CODE_AdIsLoading){
            if (this.delegate && this.delegate.onAdIsLoading) {
                this.delegate.onAdIsLoading(msg);
            }
        }else if(result.mainStatus === AdsStatus.RESULT_CODE_AdsDismissed){
            if (this.delegate && this.delegate.onAdsDismissed) {
                this.delegate.onAdsDismissed(msg);
            }
        }else if(result.mainStatus === AdsStatus.RESULT_CODE_AdsShown){
            if (this.delegate && this.delegate.onAdsShown) {
                this.delegate.onAdsShown(msg);
            }
        }else if(result.mainStatus === AdsStatus.RESULT_CODE_Failed){
            if (this.delegate && this.delegate.onFailed) {
                this.delegate.onFailed(msg);
            }
        }else if(result.mainStatus === AdsStatus.RESULT_CODE_EXIT){
            if (this.delegate && this.delegate.onExit) {
                this.delegate.onExit(msg);
            }
        }else if(result.mainStatus === AdsStatus.RESULT_CODE_PointsSpendFailed){
            if (this.delegate && this.delegate.onPointsSpendFailed) {
                this.delegate.onPointsSpendFailed(msg);
            }
        }else if(result.mainStatus === AdsStatus.RESULT_CODE_OfferWallOnPointsChanged){
            if (this.delegate && this.delegate.onOfferWallPointsChanged) {
                this.delegate.onOfferWallPointsChanged(msg);
            }
        }



    }

    // public static addListener(listener: AdListener) {
    //     if (!this.listeners.includes(listener)) {
    //         this.listeners.push(listener)
    //     }
    // }

    // public static removeListener(listener: AdListener) {
    //     js.array.fastRemove(this.listeners, listener)
    // }

    
    // public static notifyListeners(result: AdResult) {
    //     for (let listener of this.listeners) {
    //         listener.onAdResult(result)
    //     }
    // }

    public static preload(params:AdParam){
        const adsType: AdsType = params.adsType || 1;
        const adsMod: number = params.adsMode || 0;
        const jsonStr: string = JSON.stringify(params.params || {});
        GodSdkAd.preloadAds(adsType,adsMod,jsonStr);
    }

    public static show(params:AdParam){
        const adsType: AdsType = params.adsType || 1;
        const adsMod: number = params.adsMode || 0;
        const jsonStr: string = JSON.stringify(params.params || {});
        GodSdkAd.showAds(adsType,adsMod,jsonStr);
    }

    public static hide(params:AdParam){
        const adsType: AdsType = params.adsType || 1;
        const adsMod: number = params.adsMode || 0;
        const jsonStr: string = JSON.stringify(params.params || {});
        GodSdkAd.hideAds(adsType,adsMod,jsonStr);
    }
}
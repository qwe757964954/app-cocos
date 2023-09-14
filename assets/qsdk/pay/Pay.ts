import { StorageUtil } from "bos/exports"
import { js } from "cc"
import * as trade from "idl/mpff/pay/trade.v1"
import { ICharge, PayChannel } from "idl/mpff/pay/trade.v1"
import { GodSdkPay } from "./GodSdkPay"

export interface PayListener {
    onPayResult(result: PayResult)
}

export type PayResult = {
    success: boolean
    pmode: number
    msg?: string
    mainStatus?: number
    subStatus?: number
}

/**
 * 提供给业务使用的Pay
 */
export class Pay {

    private static inited = false
    private static listeners: PayListener[] = []
    private static chargeCache: { [payCenterNo: string]: ICharge } = {}
    private static _universalLinks = "";

    public static init() {
        if (this.inited) {
            return
        }
        this.inited = true
        GodSdkPay.init()
    }

    public static get universalLinks() {
        return this._universalLinks
    }

    public static setUniversalLinks(universalLinks: string) {
        this._universalLinks = universalLinks;
    }

    public static addListener(listener: PayListener) {
        if (!this.listeners.includes(listener)) {
            this.listeners.push(listener)
        }
    }

    public static removeListener(listener: PayListener) {
        js.array.fastRemove(this.listeners, listener)
    }

    /**
     * 通知支付结果。  (内部使用)
     * @param result 
     */
    public static notifyListeners(result: PayResult) {
        for (let listener of this.listeners) {
            listener.onPayResult(result)
        }
    }

    /**
     * 唤起支付
     * @param data 传给godsdk支付接口的数据 / 后端接口返回的credential
     * @param pmode 
     */
    public static requestPay(data: string | object, pmode: PayChannel, charge?: trade.ICharge) {
        if (!this.inited) {
            throw new Error("必须先调用 Pay.init() 进行初始化")
        }
        GodSdkPay.requestPay(data, pmode, charge)
    }

    static async requestPayByCharge(charge: trade.ICharge) {
        this.saveCharge(charge);
        this.requestPay(charge.credential, charge.channel, charge);
    }

    private static saveCharge(charge: ICharge): void {
        if (charge.channel == PayChannel.PayChannelApplePay) {
            this.chargeCache[charge.payCenterNo] = charge
            StorageUtil.set(`chargeCache_${AppConfig.appID}`, JSON.stringify(this.chargeCache));
        }
    }

    static async createCharge(req: trade.ICreateChargeReq) {
        let { err, resp } = await trade.Trade.CreateCharge(req)
        return resp && resp.charge
    }

    static async reportReceipt(req: trade.IReportReceiptReq) {
        let { err, resp } = await trade.Trade.ReportReceipt(req)
        return err
    }

    static async listPayChannel(req: trade.IListPayChannelReq) {
        let { err, resp } = await trade.Trade.ListPayChannel(req)
        return resp
    }
}
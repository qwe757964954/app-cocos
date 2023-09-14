import { App } from 'app/App';
import { PremiumMgr } from 'app/domain/premium/PremiumMgr';
import { Decorator, Log } from 'bos/exports';
import { XComponent } from 'bos/framework/component/XComponent';
import { Label, _decorator, sys } from 'cc';
import { OS, PayChannel } from 'idl/mpff/pay/trade.v1';
import * as mall from "idl/tss/hall/mall.v2";
import { ISPU } from 'idl/tss/hall/mall.v2';
import { Pay, PayListener } from 'qsdk/exports';
const { ccclass, property } = _decorator;

@ccclass('VipMall')
export class VipMall extends XComponent {

    @property({ type: [Label] })
    priceLabels: Label[] = []

    @property(Label)
    btnTitle: Label

    private vipSpu: ISPU
    private listener: PayListener = {
        onPayResult: (result) => {
            console.log("支付结果", result)
        }
    }

    onLoad() {
        this.updateView()
        Pay.addListener(this.listener)
        // init可在任意地方调用，调用一次即可
        Pay.init()

        App.premiumMgr.on(PremiumMgr.EventType.CARD_STATE_CHANGE, this.onCardStateChange, this)
    }

    onCardStateChange() {
        this.updateView()
    }

    onDestroy() {
        Pay.removeListener(this.listener)
        App.privilegeMgr.targetOff(this)
    }

    @Decorator.TryAsync()
    async updateView() {
        const values = await this.promiseAll([App.premiumMgr.isVip(), App.mallMgr.getVipSpu()])
        if (!values[1]) {
            Log.e("get vip spu error")
            return
        }
        const isVip = values[0] as boolean
        this.vipSpu = values[1] as ISPU
        const price = this.vipSpu.sku.price.RMB / 1000
        if (isVip) {
            this.btnTitle.string = `¥${price}/月   立即开通`
        } else {
            this.btnTitle.string = `¥${price}/月   立即续费`
        }
        this.priceLabels[0].string = "¥"
        this.priceLabels[1].string = price.toString()
        this.priceLabels[2].string = "/月"
    }

    async onBuyClick() {
        if (!this.vipSpu) {
            return
        }
        let orderResp = await mall.MallService.CreateOrder({
            spuId: this.vipSpu.id,
            amt: 1,
        })
        if (orderResp.err) {
            console.error("下单失败", orderResp)
            return
        }
        let order = orderResp.resp.order
        let payChannel = PayChannel.PayChannelAliPay
        let os = OS.OSUnknown
        if (sys.platform == sys.Platform.IOS) {
            os = OS.OSiOS
        } else {
            os = OS.OSAndroid
        }
        let payResp = await mall.MallService.PayRMB({
            orderID: order.ID,
            payChannel: payChannel,
            uid: App.userMgr.loginUid,
            deviceInfo: {
                appChannel: AppConfig.channel,
                appVersion: AppConfig.version,
                guid: "ce329e21-15cd-4847-c811-ab7a19fddbb9",
                os: os,
            }
        })
        if (payResp && payResp.resp && payResp.resp.charge) {
            let charge = payResp.resp.charge
            Pay.requestPayByCharge(charge)
        } else {
            console.error("支付失败", payResp)
        }
    }
}
import { SpuBelongType } from "idl/tss/hall/mall.v2";
import { Gateway } from "./Gateway";

export class MallMgr {
    private gateway: Gateway

    constructor() {
        this.gateway = new Gateway()
    }

    async getVipSpu() {
        let resp = await this.gateway.listSpuByUser({
            belongType: SpuBelongType.SpuBelongPremiumCardVIPIntro
        })
        if (resp.total == 0) {
            return
        }
        return resp.spu[0]
    }
}
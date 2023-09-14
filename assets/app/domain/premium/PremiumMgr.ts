import { App } from "app/App";
import { EmptyClass, EventTargetExtends } from "bos/utils/ClassUtils";
import { MemCache } from "bos/exports";
import { Log } from "bos/base/log/Log";
import { ICard, premiumcard } from "idl/tss/hall/premiumcard.v1";
import { PBPremiumCard } from "./code/code";

export class PremiumMgr extends EventTargetExtends(EmptyClass) {
    //根据UID缓存的最高级别的卡片信息
    private _userCards = new MemCache<number, any>();
    //缓存自己所有卡片的状态
    private _myCards = new MemCache<number, any>();
    private _uid = 0

    static EventType = {
        "CARD_STATE_CHANGE": "card_state_change",
    }

    init(){
        premiumcard.on(premiumcard.NotifyRenewSuccess.name, this.onNotifyRenewSuccess, this)
        this._myCards.on(MemCache.EventType.KEY_EXPIRED, this.onMyCardExpired, this)
    }

    setUid(uid: number) {
        this._uid = uid
        this.refreshMyCard()
    }

    private async refreshMyCard() {
        let card = await this.getUserCardByUid(this._uid)
        this.emit(PremiumMgr.EventType.CARD_STATE_CHANGE)
    }

    private onMyCardExpired() {
        this.emit(PremiumMgr.EventType.CARD_STATE_CHANGE)
    }

    async onNotifyRenewSuccess(resp) {
        Log.i("onNotifyRenewSuccess", resp)

        //卡片续期，清理一下缓存
        let type = resp.type
        if (type) {
            this._myCards.delete(type)
            this._userCards.delete(App.userMgr.loginUid)
            this.refreshMyCard()
        }
    }

    //获取最高等级的卡
    async getUserCardByUid(uid? : number) : Promise<ICard> {
        uid = uid ?? App.userMgr.loginUser.uid

        let card = this._userCards.get(uid)
        if (card) {
            return card
        } else {
            let req = {
                uid : uid
            }
            let result = await premiumcard.GetUserCard(req)
            if (result.err != null && result.resp?.card) {
                this._userCards.set(uid, result.resp?.card, 600)
            }
            return result.resp?.card
        }
    }

    async batchGetUserCard(uids : number[]){
        const UIDs = uids
        const cardsOfUID = new Map<number, any>()
        if (UIDs && UIDs.length > 0) {
            const reqUIDs: number[] = []
            for (const uid of UIDs) {
                const value = this._userCards.get(uid)
                if (value) {
                    cardsOfUID[uid] = value
                } else {
                    reqUIDs.push(uid)
                }
            }
            if (reqUIDs.length > 0) {
                let req = {
                    uids : reqUIDs
                }
                let result = await premiumcard.BatchGetUserCard(req)
                Log.d("PremiumCardService:BatchGetUserCard_sync=========>", result, reqUIDs)
                if (result.err == null) {
                    const cards = result.resp?.cards || []
                    for (const card of cards) {
                        this._userCards.set(card.uid, card, 600)
                        cardsOfUID[card.uid] = card
                        const index = reqUIDs.indexOf(card.uid)
                        if (index !== -1) {
                            reqUIDs.splice(index, 1)
                        }
                    }
                    //没有返回的，代表没有卡
                    for (const uid of reqUIDs) {
                        const info = { State: 0 }
                        this._userCards.set(uid, info, 600)
                        cardsOfUID[uid] = info
                    }
                }
            }
        }
        return cardsOfUID
    }

    /**
     * 获取指定类型的卡片信息
     * @param type 卡片类型
     * @param force 是否强制刷新卡片信息
     * @returns 卡片信息
     */
    private async getCardByType(type : number, force?: boolean): Promise<any> {
        let card = this._myCards.get(type);
        if (card && !force) {
            return card;
        } else {
            card = {}
            let req = {
                cardType : type,
                uid : App.userMgr.loginUser.uid 
            }
            let result = await premiumcard.GetUserCardByType(req);
            Log.d("PremiumCardService:GetUserCardByType", req, result);
            if (result.err === null) {
                card = result.resp?.card || {};
                let expired = 600;
                if (card.State === PBPremiumCard.CardStatusOpening && card.expiredAt) {
                    expired = Math.max(0, card.expiredAt - (Date.now() / 1000) - 10);
                }
                this._myCards.set(type, card, expired);
            }
            return card;
        }
    }

    //是否有会员卡
    async isVip() {
        let card = await this.getCardByType(PBPremiumCard.PremiumCardTypeVIP)
        return card && card.State === PBPremiumCard.CardStatusOpening
    }

    //是否有某个级别及以上的尊享卡
    async getCardOverLevel(level : number) {
        let card = await this.getUserCardByUid(App.userMgr.loginUser.uid)
        if (card && card.State === PBPremiumCard.CardStatusOpening && card.Type >= level) {
            return true
        }
        return false
    }
}
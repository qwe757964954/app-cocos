import { NetImageEx } from 'app/components/NetImageEx';
import { MatchApi } from 'app/domain/match/api/MatchApi';
import { PBRegularCommon } from 'app/domain/match/code/code';
import { MatchHandler } from 'app/domain/match/match/handler/MatchHandler';
import { BaseMatchView } from 'app/domain/match/match/controller/BaseMatchView';
import { Utils } from 'app/utils/Utils';
import { Label } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { RevivalInfo } from 'idl/tss/match_v2/officematch.v1';
const { ccclass, property } = _decorator;

@ccclass('RevivalView')
export class RevivalView extends BaseMatchView {

    @property(Label)
    scoreLabel : Label

    @property(Label)
    rankLabel : Label

    @property(Label)
    tipsLabel : Label

    @property(Label)
    timesLabel : Label

    @property(NetImageEx)
    assetIcon : NetImageEx

    @property(Label)
    numLabel : Label

    @property(Node)
    assetNode : Node

    @property(Node)
    hasNode : Node

    @property(Label)
    hasLabel : Label

    @property(NetImageEx)
    hasIcon : NetImageEx

    revivalInfo : RevivalInfo
    timesClock : any

    updateView(handler : MatchHandler, params?) {
        console.warn("RevivalView updateView===============")
        console.debug("RevivalView updateView===============", params)

        super.updateView(handler)

        this.revivalInfo = params?.revival

        if (this.revivalInfo) {
            // let uid = params.uid
            // let user = this.handler.roomInfo.userInfo.findUser(uid)
            // if (user) {
                
            // } else {
            //     console.error("RevivalView updateView not find user", params)
            // }
    
            this.updateRevived()
            this.updateVipTips()
            this.updateTimes()
            this.updateAsset()
        }
    }

    updateAsset() {
        if (this.revivalInfo.type == PBRegularCommon.RevivalTypeAsset) {
            this.assetNode.active = true
            let costAsset = this.revivalInfo.costAsset && this.revivalInfo.costAsset[0]
            let ownAsset = this.revivalInfo.ownAsset && this.revivalInfo.ownAsset[0]
            if (costAsset){
                this.numLabel.string = Utils.formatNumWithX(costAsset.amount)
                this.assetIcon.setUrl(costAsset.icon)
            }

            if (ownAsset) {
                this.tipsLabel.string = "拥有"
                this.hasIcon.setUrl(ownAsset.icon)
                this.hasLabel.string = Utils.formatNumWithX(ownAsset.amount)
            }
        } else {
            this.assetNode.active = false
        }
    }

    updateRevived(){
        if (this.revivalInfo?.scoreWhenRevival?.toString()) {
            this.scoreLabel.string = this.revivalInfo?.scoreWhenRevival?.toString()
        } else {
            this.scoreLabel.string = ""
        }

        if (this.revivalInfo?.rankWhenRevival?.toString()) {
            this.rankLabel.string =  this.revivalInfo?.rankWhenRevival?.toString()
        } else {
            this.rankLabel.string = ""
        }
    }

    updateVipTips(){
        if (this.revivalInfo?.type == PBRegularCommon.RevivalTypeVip) {
            // this.tipsLabel.node.active = true
            this.tipsLabel.string = `今日会员特权复活剩余${(this.revivalInfo?.ownVipRevival || 0)}次` 
        } else {
            // this.tipsLabel.node.active = false
        }
    }

    cancelTimesClock() {
        if (this.timesClock) {
            this.unschedule(this.timesClock)
            this.timesClock = null
        }
    }

    updateTimes() {
        let times = this.revivalInfo?.waitTime ?? 0
        if (times > 0) {
            this.cancelTimesClock()
            this.timesClock = ()=>{
                times--
                this.timesLabel.string = `${times}s`
                if (times <= 0) {
                    this.cancelTimesClock()
                    MatchApi.cancelRevival(this.handler.matchKey, this.handler.srvID)
                }
            }

            this.schedule(this.timesClock, 1)
            this.timesLabel.string = `${times}s`
        } else {
            this.timesLabel.string = `0s`
        }
    }

    onCancelTouch(){
        MatchApi.cancelRevival(this.handler.matchKey, this.handler.srvID)
    }

    onRevivalTouch() {
        MatchApi.revival(this.handler.matchKey, this.handler.srvID)
    }

    onDestroy(): void {
        this.unscheduleAllCallbacks()
    }
}
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Sprite } from 'cc';
import { NetImageEx } from 'app/components/NetImageEx';
import { Label } from 'cc';
import { RichText } from 'cc';
import { MatchHandler } from 'app/domain/match/match/handler/MatchHandler';
import { AssetItem, DynamicPoolInc } from 'app/domain/match/config/PrizeConfig';
import { PBCommon, PBRegularCommon } from 'app/domain/match/code/code';
import { Utils } from 'app/utils/Utils';

@ccclass('PoolItem')
export class PoolItem extends XComponent {
    @property(NetImageEx)
    iconSprite : NetImageEx

    @property(Label)
    numLabel : Label

    @property([RichText])
    tipsLabel : RichText[] = []

    @property(Label)
    addLabel : Label

    @property(Node)
    lineNode : Node

    handler : MatchHandler
    prizeData : any

    baseAmount : number
    curAdd : number

    updateView(handler : MatchHandler, prizeData : any) {
        this.handler = handler
        this.prizeData = prizeData

        this.initJackpot()
        this.initTips()

        this.lineNode.active = this.prizeData.needLine === true
    }

    getAsset(){
        return this.prizeData?.asset
    }

    initJackpot(){
        let baseAmount = 0
        let add = 0
        let basePool = this.prizeData.basePool;
        let asset = this.prizeData.asset
        let amount = Math.floor(asset.amount ?? 0)
        for (let index = 0; index < basePool.length; index++) {
            const pool = basePool[index];
            if (pool.id == asset.id && pool.type == asset.type){
                baseAmount = pool.amount
                add = Math.max(0, amount - baseAmount)
                this.addLabel.string = Utils.formatNumWithUnit(add)
                break
            }
        }

        this.baseAmount = baseAmount
        this.curAdd = add

        this.numLabel.string = Utils.formatNumWithX(Math.floor(asset.amount))
        this.iconSprite.setUrl(asset.icon)
    }

    initTips(){
        let enterIncPoolSwitch = this.prizeData.enterIncPoolSwitch;
        let enterIncPool : DynamicPoolInc = this.prizeData.enterIncPool;
        let revivalIncPoolSwitch = this.prizeData.revivalIncPoolSwitch;
        let revivalIncPool : DynamicPoolInc = this.prizeData.revivalIncPool;
        let basePool = this.prizeData.basePool;
        let asset = this.prizeData.asset
        let baseAmount = 0

        for (let index = 0; index < basePool.length; index++) {
            const pool = basePool[index];
            if (pool.id == asset.id && pool.type == asset.type){
                baseAmount = pool.amount
                break
            }
        }

        for (let index = 0; index < this.tipsLabel.length; index++) {
            const tipLabel = this.tipsLabel[index];
            tipLabel.node.active = false
        }

        let index = 0
        if (enterIncPoolSwitch == PBCommon.SwitchStateOn) {
            let mode = enterIncPool.mode
            let value = enterIncPool.incValue ?? 0
            let trigThr = enterIncPool.trigThr ?? 0
            let configAdd = 0
            if (mode === PBRegularCommon.DynamicPoolIncModeFix) {
                configAdd = value;
            } else if (mode === PBRegularCommon.DynamicPoolIncModeByPercentage) {
                configAdd = Math.floor(value / 100 * baseAmount);
            } else if (mode === PBRegularCommon.DynamicPoolIncModeByPermil) {
                configAdd = Math.floor(value / 1000 * baseAmount);
            }

            let tipsLabel = this.tipsLabel[index]
            tipsLabel.node.active = true
            if (trigThr <= 0){
                tipsLabel.string = `<size=38><color=#FFFFFF>成功报名后增加</color></size><size=38><color=#FB9F3C>${Utils.formatNumWithUnit(configAdd)}个</color></size>`
            } else {
                tipsLabel.string = `<size=38><color=#FFFFFF>报名</color></size><size=38><color=#FB9F3C>${trigThr}人</color></size><size=38><color=#FFFFFF>后,每报名<color></size><size=38><color=#FB9F3C>1人</color></size><size=38><color=#FFFFFF>增加</color></size><size=38><color=#FB9F3C>${Utils.formatNumWithUnit(configAdd)}个</color></size>`
            }

            index++
        }

        if (revivalIncPoolSwitch == PBCommon.SwitchStateOn) {
            let mode = revivalIncPool.mode
            let value = revivalIncPool.incValue ?? 0
            let trigThr = revivalIncPool.trigThr ?? 0
            let configAdd = 0
            if (mode === PBRegularCommon.DynamicPoolIncModeFix) {
                configAdd = value;
            } else if (mode === PBRegularCommon.DynamicPoolIncModeByPercentage) {
                configAdd = Math.floor(value / 100 * baseAmount);
            } else if (mode === PBRegularCommon.DynamicPoolIncModeByPermil) {
                configAdd = Math.floor(value / 1000 * baseAmount);
            }

            let tipsLabel = this.tipsLabel[index]
            tipsLabel.node.active = true
            if (trigThr <= 0){
                tipsLabel.string = `<size=38><color=#FFFFFF>比赛复活增加</color></size><size=38><color=#FB9F3C>${Utils.formatNumWithUnit(configAdd)}个</color></size>`
            } else {
                tipsLabel.string = `<size=38><color=#FFFFFF>复活</color></size><size=38><color=#FB9F3C>${trigThr}人</color></size><size=38><color=#FFFFFF>后,每复活</color></size><size=38><color=#FB9F3C>1人</color></size><size=38><color=#FFFFFF>增加</color></size><size=38><color=#FB9F3C>${Utils.formatNumWithUnit(configAdd)}个</color></size>`
            }
        }
    }

    showChange(total : number){
        let curAdd = total - this.baseAmount
        this.curAdd = curAdd
        this.numLabel.string = Utils.formatNumWithX(total)
        this.addLabel.string = Utils.formatNumWithUnit(curAdd)
    }
}
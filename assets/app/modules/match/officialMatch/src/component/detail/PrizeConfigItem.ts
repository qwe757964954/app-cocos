import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Label } from 'cc';
import { Utils } from 'app/utils/Utils';
import { BaseMatchView } from 'app/domain/match/match/controller/BaseMatchView';
import { MatchHandler } from 'app/domain/match/match/handler/MatchHandler';
import { RoomInfo } from 'app/domain/match/match/data/RoomInfo';
import { ShowRank } from 'app/domain/match/config/MatchConfig';

@ccclass('PrizeConfigItem')
export class PrizeConfigItem extends BaseMatchView {
    @property(Label)
    levelLabel : Label

    @property(Label)
    rankLabel : Label

    @property(Label)
    prizeLabel : Label

    index : number
    handler : MatchHandler
    roomInfo : RoomInfo
    params : any

    getData(): any {
        return this.params
    }

    onEnable() {
        this.addMatchEventListener()
    }

    onDisable() {
        this.removeMatchEventListener()
    }

    addMatchEventListener(){
        if (this.handler){
            this.handler.on(MatchHandler.EventType.PoolChange, this.onPoolChange, this)
        }
    }

    removeMatchEventListener(){
        if (this.handler){
            this.handler.off(MatchHandler.EventType.PoolChange, this.onPoolChange, this)
        }
    }

    onPoolChange(){
        this.poolChange()
    }

    poolChange(){
        let rankPrize = this.roomInfo.config.getRankPrize(this.roomInfo.getPrizePool(), this.roomInfo.baseInfo.getDynamicStageId(), true)
        let ranks = rankPrize.ranks ?? []

        let info = ranks[this.index - 1]
        this.updateInfo(info)
    }

    getIndex(){
        return this.index
    }

    updateView(handler : MatchHandler, params) {
        console.debug("PrizeConfigItem updateView")

        this.handler = handler
        this.roomInfo = this.handler.roomInfo
        this.params = params
        this.index = params.index

        const chineseNumeralMap: string[] = ['一', '二', '三', '四', '五', '六', '七', '八','九', '十']
        if (this.index <= 10) {
            this.levelLabel.string = `${chineseNumeralMap[this.index - 1]}等奖`
        } else {
            this.levelLabel.string = `${this.index}等奖`
        }

        this.updateInfo(params.data)
    }

    updateInfo(rankInfo : ShowRank){
        if (rankInfo) {
            let startNum = rankInfo.startNum
            let endNum = rankInfo.endNum
    
            this.rankLabel.string = `(${startNum}-${endNum}名)`
    
            if(rankInfo.rangeAwardName && rankInfo.rangeAwardName != "") {
                this.prizeLabel.string = rankInfo.rangeAwardName
            } else {
                let dynamicAssets = rankInfo.dynamicAssets ?? []
                let fixedAssets = rankInfo.fixedAssets ?? []
                let merge = [...dynamicAssets,...fixedAssets]
                if (merge.length > 0) {
                    
                    this.prizeLabel.string = `${merge[0].name}${Utils.formatNumWithX(merge[0].amount)}`
                } else {
                    this.prizeLabel.string = ""
                }
            }
        }
    }

    onDestroy(): void {
        this.removeMatchEventListener()
    }
}
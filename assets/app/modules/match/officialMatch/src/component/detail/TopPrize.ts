import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { NetImageEx } from 'app/components/NetImageEx';
import { RoomInfo } from 'app/domain/match/match/data/RoomInfo';
import { MatchHandler } from 'app/domain/match/match/handler/MatchHandler';
import { Utils } from 'app/utils/Utils';
import { BaseMatchView } from 'app/domain/match/match/controller/BaseMatchView';

@ccclass('TopPrize')
export class TopPrize extends BaseMatchView {

    @property([Label])
    rankLabels : Label[] = []

    @property([Label])
    nameLabels : Label[] = []

    @property([NetImageEx])
    prizeIcons : NetImageEx[] = []

    roomInfo : RoomInfo
    handler : MatchHandler
    params : any

    onEnable() {
        console.debug("TopPrize onEnable and register event")
        this.addMatchEventListener()
    }

    onDisable() {
        console.debug("TopPrize onDisable and unregister event")
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
        let rankPrize = this.roomInfo.config.getRankPrize(this.roomInfo.getPrizePool(), this.roomInfo.baseInfo.getDynamicStageId(), true)
        this.updatePrizeName(rankPrize.ranks)
    }

    getData(): any {
        return this.params
    }

    updateView(handler : MatchHandler, params) {
        this.handler = handler
        this.params = params
        this.roomInfo = this.handler.roomInfo

        this.addMatchEventListener()

        let rankPrize = this.roomInfo.config.getRankPrize(this.roomInfo.getPrizePool(), this.roomInfo.baseInfo.getDynamicStageId(), true)
        this.updatePrizeName(rankPrize.ranks)
        this.updatePrizeIcon(rankPrize.ranks)
        this.updateTopRanks(rankPrize.ranks)
    }

    updateTopRanks(ranks) {
        for (let index = 0; index < this.rankLabels.length; index++) {
            const element = this.rankLabels[index];
            if (ranks[index]) {
                let startNum = ranks[index].startNum ?? 1
	            let endNum = ranks[index].endNum ?? 1
                if(startNum == 1) {
                    element.string = `(前${endNum}名)`
                } else {
                    element.string = `(${startNum}-${endNum}名)`
                }
            }
        }
    }

    updatePrizeName(ranks) {
        for (let index = 0; index < this.nameLabels.length; index++) {
            const element = this.nameLabels[index];
            if (ranks[index]) {
                if(ranks[index].rangeAwardName && ranks[index].rangeAwardName != "") {
                    element.string = ranks[index].rangeAwardName
                } else {
                    let dynamicAssets = ranks[index].dynamicAssets ?? []
                    let fixedAssets = ranks[index].fixedAssets ?? []
                    let merge = [...dynamicAssets,...fixedAssets]
                    if (merge.length > 0) {
                        element.string = `${merge[0].name}${Utils.formatNumWithX(merge[0].amount)}`
                    } else {
                        element.string = ""
                    }
                }
            } else {
                element.string = ""
            } 
        }
    }

    updatePrizeIcon(ranks) {
        for (let index = 0; index < this.prizeIcons.length; index++) {
            const element = this.prizeIcons[index];
            if (ranks[index]) {
                if(ranks[index].rangeAwardImage && ranks[index].rangeAwardImage != "") {
                    element.setUrl(ranks[index].rangeAwardImage)
                } else {
                    let dynamicAssets = ranks[index].dynamicAssets ?? []
                    let fixedAssets = ranks[index].fixedAssets ?? []
                    let merge = [...dynamicAssets,...fixedAssets]
                    if (merge.length > 0) {
                        element.setUrl(merge[0].icon)
                    } else {
                        element.setUrl("")
                    }
                }
            } else {
                element.setUrl("")
            } 
        }
    }
    
    onDestroy(): void {
        this.removeMatchEventListener()
    }
}
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { BaseMatchView } from 'app/domain/match/match/controller/BaseMatchView';
import { MatchHandler } from 'app/domain/match/match/handler/MatchHandler';
import { Sprite } from 'cc';
import { Utils } from 'app/utils/Utils';
import { Label } from 'cc';
import { MUser } from 'app/domain/match/match/data/UserInfo';
import { App } from 'app/App';
import { User } from 'app/domain/user/User';
import { isValid } from 'cc';
import { instantiate } from 'cc';
import { StageItem } from '../StageItem';
import { Decorator, resLoader } from 'bos/exports';

@ccclass('PromotionView')
export class PromotionView extends BaseMatchView {

    @property(Sprite)
    cupIcon : Sprite

    @property(Label)
    rankLabel : Label

    @property(Node)
    stageNode : Node

    uid : number

    updateView(handler : MatchHandler, params?) {
        console.warn("PromotionView updateView=========")
        console.debug("PromotionView updateView=========", params)

        super.updateView(handler)

        this.uid = params?.uid

        this.updateStyle()
        this.updateStages()

        if (this.uid) {
            let user = this.handler.roomInfo.userInfo.findUser(this.uid)
            if (user) {
                this.updateRank(user)
            } else {
                console.error("PromotionView updateView not find user", this.handler.roomInfo, this.uid)
            }
        }
    }

    updateStyle() {
        let curIndex = this.handler.roomInfo.baseInfo.getStageInfo().getStageIndex()
        let stageConfigs = this.handler.roomInfo.config.getMatchStages(this.handler.roomInfo.baseInfo.getDynamicStageId())
        let promotionNum = this.handler.roomInfo.getPromotionNum(curIndex, false)   
        let totalPrizeNum =  this.handler.roomInfo.config.getTotalPrizeNum(this.handler.roomInfo.baseInfo.getDynamicStageId())
        let nextStage = curIndex + 1
        let nextIsFinallyRound = (nextStage + 1) == stageConfigs.length
        this.cupIcon.spriteFrame = null
        if (nextIsFinallyRound) {
            Utils.loadSpriteFromBundle(this.cupIcon, "match@matchModules/image/promotion/ResApp_SettlAccounts_Img_Finals")
        } else if (totalPrizeNum >= promotionNum){
            Utils.loadSpriteFromBundle(this.cupIcon, "match@matchModules/image/promotion/ResApp_SettlAccounts_Img_Award")
        } else {
            Utils.loadSpriteFromBundle(this.cupIcon, "match@matchModules/image/promotion/ResApp_SettlAccounts_Img_Promotion")
        }
    }

    updateRank(user : MUser){
        this.handler.roomInfo.userInfo.sort()

        this.rankLabel.string = user.rank.toString()
    }

    @Decorator.TryAsync()
    async updateHead(){
    }

    updateStages(){
        let stageConfigs = this.handler.roomInfo.config.getMatchStages(this.handler.roomInfo.baseInfo.getDynamicStageId())
        let curIndex = this.handler.roomInfo.baseInfo.getStageInfo().getStageIndex()
        let indexInfo = Utils.getRoundIndex(curIndex, stageConfigs.length, 3, 1, 1)
        
        console.debug("StageWaitView updateStageInfo", indexInfo, curIndex, stageConfigs)

        this.stageNode.destroyAllChildren()
        resLoader.loadPrefab("match@matchModules/prefab/StageItem", (err, prefab)=>{
            if (!isValid(this.node) || err){
                return
            }

            for (let index = indexInfo.startIndex; index <= indexInfo.endIndex; index++) {
                const stageInfo = stageConfigs[index];
                let item = instantiate(prefab)
                this.stageNode.addChild(item)
                item.getComponent(StageItem).updateView(this.handler, {
                    stage : stageInfo,
                    needMore : index == (indexInfo.endIndex) && index != (stageConfigs.length - 1),
                    needNext : (index == curIndex) && index < indexInfo.endIndex,
                    inProgress : index == curIndex,
                    isFinally : index == (stageConfigs.length - 1),
                    complete : index < curIndex,
                    needHead : index == curIndex,
                    uid : this.uid,
                })
            }
        })
    }
}
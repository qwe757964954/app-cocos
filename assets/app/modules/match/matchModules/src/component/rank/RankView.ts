import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { MUser } from 'app/domain/match/match/data/UserInfo';
import { PrizePoolInfo } from 'app/domain/match/config/MatchConfig';
import { resLoader, uiMgr } from 'bos/exports';
import { isValid } from 'cc';
import { instantiate } from 'cc';
import { Toggle } from 'cc';
import { BaseMatchView } from 'app/domain/match/match/controller/BaseMatchView';
import { MatchHandler } from 'app/domain/match/match/handler/MatchHandler';
import { RankPage } from './RankPage';
import { RewardPage } from './RewardPage';

enum ShowType {
    Type_Rank,
    Type_Reward,
}

@ccclass('RankView')
export class RankView extends BaseMatchView {

    @property(Node)
    contentNode : Node

    showType : number = ShowType.Type_Rank
    users : MUser[] = []
    rankPrizes : PrizePoolInfo

    rankNode : Node
    rewardNode : Node
    isObserver : boolean
    handler : MatchHandler

    setup(params) {

        console.debug("RankView setup", params)

        this.handler = params.handler        
        this.users = params.users
        this.rankPrizes = params.rankPrizes
        this.isObserver = params.isObserver

        this.showView()
    }

    showView() {
        let showType = this.showType
        if (showType == ShowType.Type_Rank) {
            if (!this.rankNode) {
                resLoader.loadPrefab("match@matchModules/prefab/rank/RankPage", (err, prefab)=>{
                    if (!isValid(this.node) || err || showType != this.showType){
                        return
                    }

                    this.rankNode = instantiate(prefab)
                    this.contentNode.addChild(this.rankNode)
                    let user
                    if (!this.isObserver) {
                        user = this.handler.roomInfo.userInfo.getMySelf()
                    }
                    this.rankNode.getComponent(RankPage).updateView(this.users, user)
                    if (this.rewardNode) {
                        this.rewardNode.active = false
                    }
                })
            } else {
                this.rankNode.active = true
                if (this.rewardNode) {
                    this.rewardNode.active = false
                }
            }
        } else {
            if (!this.rewardNode) {
                resLoader.loadPrefab("match@matchModules/prefab/rank/RewardPage", (err, prefab)=>{
                    if (!isValid(this.node) || err || showType != this.showType){
                        return
                    }

                    this.rewardNode = instantiate(prefab)
                    this.contentNode.addChild(this.rewardNode)
                    this.rewardNode.getComponent(RewardPage).updateView(this.rankPrizes)
                    if (this.rankNode) {
                        this.rankNode.active = false
                    }
                })
            } else {
                this.rewardNode.active = true
                if (this.rankNode) {
                    this.rankNode.active = false
                }
            }
        }
    }

    onToggleChange(toggle : Toggle) {
        if (toggle.node.name == "Toggle1") {
            this.showType = ShowType.Type_Rank
        } else {
            this.showType = ShowType.Type_Reward
        }

        
        this.showView()
    }

    onClose() {
        uiMgr.removePopup(this.node)
    }
}
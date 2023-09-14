import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { BaseMatchView } from 'app/domain/match/match/controller/BaseMatchView';
import { MatchHandler } from 'app/domain/match/match/handler/MatchHandler';
import { MUser } from 'app/domain/match/match/data/UserInfo';
import { Label } from 'cc';
import { PageView } from 'cc';
import { RichText } from 'cc';
import { isValid } from 'cc';
import { instantiate } from 'cc';
import { StageItem } from '../StageItem';
import { TablePage } from './TablePage';
import { Utils } from 'app/utils/Utils';
import { resLoader, TimeUtil, uiMgr } from 'bos/exports';
import { Pool } from 'cc';
import { Prefab } from 'cc';
import { UITransform } from 'cc';
import { OutBarrage } from './OutBarrage';
import { PBRegularCommon } from 'app/domain/match/code/code';
import { App } from 'app/App';

@ccclass('StageWaitView')
export class StageWaitView extends BaseMatchView {

    @property(Label)
    titleLabel : Label

    @property(Label)
    rankLabel : Label

    @property(Label)
    scoreLabel : Label

    @property(RichText)
    tipsLabel : RichText

    @property(PageView)
    tablePageView : PageView

    @property(Prefab)
    tablePageItem : Prefab

    @property(Node)
    stageNode : Node

    @property(Node)
    tableInfoNode : Node

    @property(OutBarrage)
    outBarrage : OutBarrage

    uid : number
    isEmpty : boolean
    _pool : Pool<Node> = null

    onLoad(): void {
        this.initPool()
    }

    initPool(){
        this._pool = new Pool(() => {
            return instantiate(this.tablePageItem)
        }, 10, (node: Node) => {
            node.destroy();
        });
    }

    onDisable(): void {
        this.removeMatchEventListener()
    }

    onDestroy(): void {
        this.removeMatchEventListener()
        this._pool.destroy()
    }

    addMatchEventListener(){
        if (this.handler){
            this.handler.on(MatchHandler.EventType.TableStatusChange, this.onTableChange, this)
            this.handler.on(MatchHandler.EventType.TableNumChange, this.onTableChange, this)
        }
    }

    removeMatchEventListener(){
        if (this.handler){
            this.handler.off(MatchHandler.EventType.TableStatusChange, this.onTableChange, this)
            this.handler.off(MatchHandler.EventType.TableNumChange, this.onTableChange, this)
        }
    }

    @Utils.throttle(500)
    onTableChange() {
        if (!this.isEmpty) {
            this.updateTableNum()
            this.updateTables()
        }
    }

    updateView(handler : MatchHandler, params?) {
        console.warn("StageWaitView updateView=========")
        console.debug("StageWaitView updateView=========", params)

        super.updateView(handler, params)

        this.outBarrage.updateView(this.handler)

        this.uid = params.uid
        this.isEmpty = params.isEmpty

        if (this.uid) {
            this.addMatchEventListener()

            let user = this.handler.roomInfo.userInfo.findUser(this.uid)
            if (user) {
                this.updateRankAndScore(user)
            } else {
                console.error("TableSettleView updateResult not find user", this.handler.roomInfo, this.uid)
            }

            this.updateTitle()
            this.updateStageInfo()

            if (!this.isEmpty) {
                this.tableInfoNode.active = true
                this.updateTableNum()
                this.updateTables()
            }else {
                this.tableInfoNode.active = false
            }
        } else {
            console.error("StageWaitView updateView params is err", params)
        }
    }
    
    updateTitle() {
        if (this.isEmpty) {
            this.titleLabel.string = "等待配桌"
        } else {
            if (this.handler.roomInfo.getIsFinallyRound()) {
                this.titleLabel.string = "等待结果"
            } else {
                this.titleLabel.string = "等待晋级"
            }
        }
    }

    updateRankAndScore(user : MUser){
        this.rankLabel.string = user.rank.toString()
        this.scoreLabel.string = Utils.formatNumWithUnit(user.score)
    }

    updateTableNum() {
        let tables = this.handler.roomInfo.tableInfo.getTables()
        let playingTables = []
        for (let index = 0; index < tables.length; index++) {
            const table = tables[index];
            if (table.status == PBRegularCommon.TableStatusPlaying){
                playingTables.push(table)
            }
        }

        let waitTimes = 2
        let gameID = this.handler.roomInfo.config.getGameID()
        if (gameID === "landlord-tysanrenddz") {// 三人斗地主
            waitTimes = 1.5
        } else if (gameID === "mahjong-hnxinxiang") {// 新乡麻将
            waitTimes = 2.5
        }
 
        let total = playingTables.length
        if (total <= 0){
            this.tipsLabel.string = `<size=42><color=#A59F99>剩余 </size></color><size=42><color=#FFF4D4>${total}</size></color><size=42><color=#A59F99> 卓  </color></size><size=42><color=#A59F99>请稍后...</size></color>`
        } else {
            this.tipsLabel.string = `<size=42><color=#A59F99>剩余 </size></color><size=42><color=#FFF4D4>${total}</size></color><size=42><color=#A59F99> 卓  </color></size><size=42><color=#A59F99>预计等待 </size></color><size=42><color=#FFF4D4>${waitTimes}</size></color><size=42><color=#A59F99> 分钟...</size></color>`
        }

    }

    updateTables(){
        let tables = this.handler.roomInfo.tableInfo.getTables()
        let playingTables = []
        for (let index = 0; index < tables.length; index++) {
            const table = tables[index];
            if (table.status == PBRegularCommon.TableStatusPlaying){
                playingTables.push(table)
            }
        }

        let infos = Utils.makeCellData(playingTables, 2)
        let children = this.tablePageView.content.children ?? []
        for (let index = 0; index < children.length; index++) {
            const item = children[index];
            this._pool.free(item)
        }
        this.tablePageView.removeAllPages()

        for (let index = 0; index < infos.length; index++) {
            const info = infos[index];
            if (info) {
                let node = this._pool.alloc()
                this.tablePageView.addPage(node)
                node.getComponent(TablePage).updateView(this.handler, info, this.tablePageView.getComponent(UITransform).width)
            }
        }
    }

    updateStageInfo(){
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
                    complete : index < curIndex
                })
            }
        })
    }

    onPageEvent(){

    }

    onLeftTouch() {
        let page = Math.max(0, this.tablePageView.getCurrentPageIndex() - 1)
        console.debug("ObserverPage onLeftTouch", page)
        this.tablePageView.scrollToPage(page, 0.2)
    }

    onRightTouch() {
        let page = Math.min(this.tablePageView.getPages().length, this.tablePageView.getCurrentPageIndex() + 1)
        console.debug("ObserverPage onRightTouch", page)
        this.tablePageView.scrollToPage(page, 0.2)
    }

    onRankTouch() {
        let index = this.handler.roomInfo.baseInfo.getStageInfo().getStageIndex()
        let dynamicID = this.handler.roomInfo.baseInfo.getDynamicStageId()
        let promotionType = this.handler.roomInfo.config.getPromotionType(index, dynamicID)
        if (promotionType === PBRegularCommon.PromotionTypeTableRank) {
            // 更新玩家信息
            let table = this.handler.roomInfo.tableInfo.findTableByUID(this.uid)
            if (!table) {
                console.error("StageWaitView onRankTouch not find table")
                return
            }
            const rankUsers: MUser[] = [];
            for (let i = 1; i <= table.uids.length; i++) {
                const v = table.uids[i];
                const user = this.handler.roomInfo.userInfo.findUser(v);
                if (user) {
                    let newUser = user.clone()
                    newUser.rank = user.rankTable
                    rankUsers.push(newUser);
                } else {
                    console.error("ObView:onRankTouch 没有找到玩家", v, this.handler);
                }
            }
            rankUsers.sort((a, b) => a.rank - b.rank);
            
            uiMgr.loadPopup("match@matchModules/prefab/rank/RankView", {params : {
                handler : this.handler,
                users : rankUsers,
                rankPrizes : this.handler.roomInfo.config.getRankPrize(this.handler.roomInfo.getPrizePool(), dynamicID, false),
                isObserver : this.uid == App.userMgr.loginUid,
            }})
        } else {
            uiMgr.loadPopup("match@matchModules/prefab/rank/RankView", {params : {
                handler : this.handler,
                users : this.handler.roomInfo.userInfo.getRankUsers(),
                rankPrizes : this.handler.roomInfo.config.getRankPrize(this.handler.roomInfo.getPrizePool(), dynamicID, false),
                isObserver : this.uid == App.userMgr.loginUid,
            }})
        }
    }

    testOut() {
        let user = this.handler.roomInfo.userInfo.getRankUsers()
        for (let index = 0; index < user.length; index++) {
            const element = user[index];
            if (!element.isOut()) {
                element.updateStatus(PBRegularCommon.UserStatusOut)
                break
            }
        }
    }
}
import { App } from "app/App";
import { MatchController } from "app/domain/match/match/controller/MatchController";
import { MTable } from "app/domain/match/match/data/TableInfo";
import { Log, resLoader, uiMgr } from "bos/exports";
import { resources } from "cc";
import { instantiate } from "cc";
import { UITransform } from "cc";
import { Prefab } from "cc";
import { Node } from "cc";
import { RevivalInfo } from "idl/tss/match_v2/officematch.v1";
import { Widget } from "cc";
import { BaseMatchView } from "./BaseMatchView";
import { MUser } from "app/domain/match/match/data/UserInfo";
import { isValid } from "cc";
import { BlockInputEvents } from "cc";
import { view } from "cc";
import { PBRegularCommon } from "app/domain/match/code/code";

enum ViewType {
    Type_StartAnim,
    Type_TableSettle,
    Type_Wait,
    Type_Promotion,
    Type_Revival,
    Type_Settle,
    Type_Ob,
}

const ViewPath = {
    [ViewType.Type_StartAnim]: "match@matchModules/prefab/stageStart/StageStartView",
    [ViewType.Type_TableSettle]: "match@matchModules/prefab/tableSettle/TableSettleView",
    [ViewType.Type_Wait]: "match@matchModules/prefab/stageWait/StageWaitView",
    [ViewType.Type_Promotion]: "match@matchModules/prefab/promotion/PromotionView",
    [ViewType.Type_Revival]: "match@matchModules/prefab/revival/RevivalView",
    [ViewType.Type_Settle]: "match@matchModules/prefab/settle/SettleView",
    [ViewType.Type_Ob]: "match@matchModules/prefab/ob/ObView",
}

export class OfficialController extends MatchController {
    typeOfView = new Map<number, Node>()
    basicNode: Node
    isBasicNodeInit = false

    reset() {
        console.warn("OfficialController reset")
        super.reset()
    }

    destroyNode() {
        console.warn("OfficialController destroyNode")
        if (this.basicNode) {
            if (isValid(this.basicNode)) {
                this.basicNode.destroy()
            }
            this.basicNode = null
        }

        this.typeOfView.clear()
        this.isBasicNodeInit = false
    }

    initBasicView() {
        if (!this.isBasicNodeInit) {
            let visibleSize = view.getVisibleSize();
            console.warn("OfficialController initBasicView", visibleSize)
            this.basicNode = new Node("OfficialController_basic")
            let transform = this.basicNode.addComponent(UITransform)
            transform.width = visibleSize.width
            transform.height = visibleSize.height
            // this.basicNode.addComponent(BlockInputEvents)
            uiMgr.getCanvasNode().addChild(this.basicNode)
            this.basicNode.setSiblingIndex(1000)

            this.isBasicNodeInit = true
        }
    }

    removeAllView() {
        this.typeOfView.forEach((node, key) => {
            node.destroy()
        })
        this.typeOfView.clear()
    }

    hideAllView() {
        this.typeOfView.forEach((node, key) => {
            node.active = false
        })
    }

    async showView(key: number, params?) {
        if (!this.isBasicNodeInit) {
            this.initBasicView()
        }

        let node = this.typeOfView.get(key)
        if (node) {
            node.active = true
            node.getComponent(BaseMatchView).updateView(this.handler, params)
        } else {
            return new Promise((resolve) => {
                resLoader.loadPrefab(ViewPath[key], (err, prefab) => {
                    if (!err && isValid(this.basicNode)) {
                        node = instantiate(prefab)
                        this.basicNode.addChild(node)
                        this.typeOfView.set(key, node)
                        node.getComponent(BaseMatchView).updateView(this.handler, params)

                        //动态设置一下
                        this.typeOfView.get(ViewType.Type_Ob)?.setSiblingIndex(1000)
                        // this.basicNode.setSiblingIndex(1000)
                    } else {
                        let str = `resources.load ${ViewPath[key]} err ${err}`
                        console.error(str)
                    }

                    resolve(err)
                })
            })
        }
    }

    hideView(key: number) {
        let node = this.typeOfView.get(key)
        if (node) {
            node.active = false
        }
    }

    removeView(key: number) {
        let node = this.typeOfView.get(key)
        if (node) {
            node.destroy()
        }

        this.typeOfView.delete(key)
    }

    /**
     * 隐藏指定类型之外的所有其他view
     * @param keys 
     */
    hideViewWithOutTypes(keys: number[]) {
        this.typeOfView.forEach((node, key)=>{
            if (keys.indexOf(key) == -1) {
                node.active = false
            }
        })
    }

    /**
     * 是否在围观桌子
     * @returns bool
    */
    checkInObserver() {
        if (this.handler.tableObHandler != null && this.handler.tableObHandler.observerUID != null) {
            return true
        }

        return false
    }

    /**
     * 是否围观 某个玩家 打牌
     * @param uid 
     * @returns bool
    */
    checkInObserverByUID(uid: number) {
        if (this.handler.tableObHandler != null && this.handler.tableObHandler.followUID === uid) {
            return true
        }

        return false
    }

    //进入成功
    async onJoinSuccess(preMatchKey) {
        super.onJoinSuccess(preMatchKey)
    }

    //延迟入场成功
    async onDelayJoinSuccess(preMatchKey) {
        super.onDelayJoinSuccess(preMatchKey)
    }

    async onReconnectSuccess() {
        let matchStatus = this.roomInfo.preBaseInfo.getStatus()
        if (matchStatus == PBRegularCommon.MatchStatusRunning) {
            this.handlerUserStatus()
        } else {
            let user = this.roomInfo.userInfo.getMySelf()
            if (user.isReady()) {
                console.warn("OfficialController onReconnect goto ChatRoom")
                resLoader.loadPrefab("match@officialMatch/res/prefab/ChatRoom", (err, prefab: Prefab) => {
                    if (!err) {
                        uiMgr.pushPage(prefab, { params: { preMatchKey: this.handler.preMatchKey, handler: this.handler } })
                    } else {
                        uiMgr.showToast("进入失败")
                        console.error("OfficialController onReconnect err", err)
                    }
                })
            }
        }
    }

    //倒计时
    onMatchAboutToStart(leftTimes: number) {
        //TODO(如果不在聊天室，这里需要重新回到聊天室，并且播放倒计时动画)
    }

    //比赛开始
    onMatchStart() {
        //TODO(如果不在聊天室，这里需要重新回到聊天室，并且播放比赛开始动画)
    }

    //阶段开始
    onMatchStageStart() { }

    //桌子开始
    async onMatchTableStart(table: MTable, isMeIn: boolean) {
        if (this.handler.isRealTime) {
            if (isMeIn) {

                //在围观，需要先退出
                if (this.handler.tableObHandler) {
                    this.handler.leaveTableObserver()
                }

                let err = await App.gameMgr.enterGame({
                    gameID: this.roomInfo.config.getGameID(),
                    matchType: this.roomInfo.config.getMatchType(),
                    playWay: this.roomInfo.config.getPlayOpt(),
                    playerNum: this.roomInfo.config.getSeatNum(),
                    matchKey: this.handler.preMatchKey,
                })

                if (!err) {
                    this.showView(ViewType.Type_StartAnim, {table : table, uid : App.userMgr.loginUid})
                    this.hideViewWithOutTypes([ViewType.Type_StartAnim])
                }
            }
        }
    }

    //桌子开始打牌了
    onMatchGameStart(table : MTable) {
        if (!this.handler.isRealTime) {
            if (this.checkInObserver()) {
                let uid = this.handler.tableObHandler.followUID
                if (table.hasUID(uid)) {
                    this.handler.leaveTableObserver(false)
                    this.handler.joinTableObserver(table)
                }
            }
        }
    }

    //桌子结束    
    onMatchTableResult(table: MTable, tableGameData) {
        if (this.handler.isRealTime) {
            if (table.hasUID(App.userMgr.loginUid)) {
                this.showView(ViewType.Type_TableSettle, { uid: App.userMgr.loginUid, table: table, tableGameData: tableGameData })
            } else {
                //在围观，推出一下
                if (this.handler.tableObHandler) {
                    let uid = this.handler.tableObHandler.observerUID
                    if (table.hasUID(uid)) {
                        this.handler.leaveTableObserver()
                    }
                }
            }
        } else {
            if (this.checkInObserver()) {
                let uid = this.handler.tableObHandler.followUID
                if (table.hasUID(uid)) {
                    this.showView(ViewType.Type_TableSettle, { uid: uid, table: table, tableGameData: tableGameData })
                }
            }
        }
    }

    //正在进行比赛
    async onUserPlaying(uid: number) {
        if (this.handler.isRealTime) {
            if (uid == App.userMgr.loginUid) {
                let err = await App.gameMgr.enterGame({
                    gameID: this.roomInfo.config.getGameID(),
                    matchType: this.roomInfo.config.getMatchType(),
                    playWay: this.roomInfo.config.getPlayOpt(),
                    playerNum: this.roomInfo.config.getSeatNum(),
                    matchKey: this.handler.preMatchKey,
                })

                if (!err) {
                    this.hideAllView()

                    let table = this.roomInfo.tableInfo.findTableByUID(App.userMgr.loginUid)
                    if (table) {
                        App.gameMgr.reconnect({ tKey: table.realKey })
                    } else {
                        //TODO(没有找到桌子处理)
                        console.error("OfficialController onUserPlaying 重连没有找到桌子")
                    }
                } else {
                    console.error("OfficialController onUserPlaying 进入子游戏错误", err)
                }
            }
        }
    }

    //轮空了
    async onUserBye(uid: number) {
        if (this.handler.isRealTime) {
            if (uid == App.userMgr.loginUid) {
                await this.showView(ViewType.Type_Wait, { isEmpty: true, uid: uid })
                this.hideViewWithOutTypes([ViewType.Type_Wait])
            }
        } else {
            if (this.checkInObserverByUID(uid)) {
                await this.showView(ViewType.Type_Wait, { isEmpty: true, uid: uid })
                this.hideView(ViewType.Type_TableSettle)
            }
        }
    }

    //等待晋级了
    async onUserWait(uid: number) {
        if (this.handler.isRealTime) {
            if (uid == App.userMgr.loginUid) {
                await this.showView(ViewType.Type_Wait, { isEmpty: false, uid: uid })
                this.hideViewWithOutTypes([ViewType.Type_Wait])
            }
        } else {
            if (this.checkInObserverByUID(uid)) {
                await this.showView(ViewType.Type_Wait, { isEmpty: false, uid: uid })
                this.hideView(ViewType.Type_TableSettle)
            }
        }
    }

    //玩家等待结果
    async onUserWaitOver(uid: number) {
        if (this.handler.isRealTime) {
            if (uid == App.userMgr.loginUid) {
                await this.showView(ViewType.Type_Wait, { isEmpty: false, uid: uid })
                this.hideViewWithOutTypes([ViewType.Type_Wait])
            }
        } else {
            if (this.checkInObserverByUID(uid)) {
                await this.showView(ViewType.Type_Wait, { isEmpty: false, uid: uid })
                this.hideView(ViewType.Type_TableSettle)
            }
        }
    }

    //晋级了
    async onUserPromotion(uid: number) {
        if (this.handler.isRealTime) {
            if (uid == App.userMgr.loginUid) {
                await this.showView(ViewType.Type_Promotion, { uid: uid })
                this.hideView(ViewType.Type_Wait)
            }
        } else {
            if (this.checkInObserverByUID(uid)) {
                await this.showView(ViewType.Type_Promotion, { uid: uid })
                this.hideView(ViewType.Type_Wait)
            }
        }
    }

    //等待复活了
    async onUserInRevival(uid: number, revival: RevivalInfo | any) {
        if (this.handler.isRealTime && revival) {
            if (uid == App.userMgr.loginUid) {
                this.showView(ViewType.Type_Revival, { revival: revival, uid: uid })
            }
        } else {
            if (this.checkInObserverByUID(uid)) {
                this.showView(ViewType.Type_Wait, { isEmpty: false, uid: uid })
            }
        }
    }

    //结算
    async onUserSettle(uid: number, user: MUser) {
        if (this.handler.isRealTime) {
            if (uid == App.userMgr.loginUid) {
                await this.showView(ViewType.Type_Settle, { uid: uid, user: user })
                this.hideViewWithOutTypes([ViewType.Type_Settle])
            }
        } else {
            if (this.checkInObserverByUID(uid)) {
                await this.showView(ViewType.Type_Settle, { uid: uid, user: user })
                this.hideView(ViewType.Type_TableSettle)
                this.hideView(ViewType.Type_Wait)
            }
        }
    }

    //分组结束 
    onStageGroupEnd() { }

    //阶段结束
    onMatchStageEnd() { }

    //比赛结束
    onMatchEnd() {
        // this.reset()
        // App.gameMgr.exitGame()
    }

    //房间解散了
    onPreMatchDisband() {
        App.matchMgr.leave(this.handler.preMatchKey)
    }

    //进入桌子围观
    async onJoinTableObserver(table: MTable, uid: number) {
        console.warn("OfficialController onJoinTableObserver")
        await this.showView(ViewType.Type_Ob, { uid: uid, table: table })
        this.hideViewWithOutTypes([ViewType.Type_Ob])
    }

    //离开桌子围观
    onLeaveTableObserver() {
        console.warn("OfficialController onLeaveTableObserver")
        //参赛选手退出围观，需要回到等待晋级界面
        if (this.handler.isRealTime) {
            this.hideView(ViewType.Type_Ob)
            this.showView(ViewType.Type_Wait, { isEmpty: false, uid: App.userMgr.loginUid})
        }
    }
}
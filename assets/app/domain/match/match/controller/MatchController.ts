import { App } from "app/App";
import { RoomInfo } from "../data/RoomInfo";
import { MatchHandler } from "../handler/MatchHandler";
import { MatchMgr } from "../../MatchMgr";
import { PBRegularCommon } from "../../code/code";
import { MTable } from "../data/TableInfo";
import { MatchApi } from "../../api/MatchApi";
import { Log } from "bos/exports";
import { RevivalInfo } from "idl/tss/match_v2/officematch.v1";
import { MUser } from "app/domain/match/match/data/UserInfo";

export abstract class MatchController {
    handler : MatchHandler = null
    roomInfo : RoomInfo = null

    constructor(handler : MatchHandler) {
        this.handler = handler
        this.roomInfo = this.handler.roomInfo
    }

    init() {
        App.matchMgr.on(MatchMgr.EventType.JoinPreMatchSuccess, this.onJoinSuccess, this)
        App.matchMgr.on(MatchMgr.EventType.DelayJoinSuccess, this.onDelayJoinSuccess, this)

        this.addListener()
    }

    reset() {
        App.matchMgr.off(MatchMgr.EventType.JoinPreMatchSuccess, this.onJoinSuccess, this)
        App.matchMgr.off(MatchMgr.EventType.DelayJoinSuccess, this.onDelayJoinSuccess, this)

        this.removeListener()

        this.destroyNode()
    }

    abstract destroyNode()

    addListener(){
        this.handler.on(MatchHandler.EventType.MatchAboutToStart, this.onMatchAboutToStart, this)
        this.handler.on(MatchHandler.EventType.MatchStart, this.onMatchStart, this)
        this.handler.on(MatchHandler.EventType.MatchStageStart, this.onMatchStageStart, this)
        this.handler.on(MatchHandler.EventType.MatchTableStart, this.onMatchTableStart, this)
        this.handler.on(MatchHandler.EventType.MatchGameStart, this.onMatchGameStart, this)
        this.handler.on(MatchHandler.EventType.MatchTableResult, this.onMatchTableResult, this)
        this.handler.on(MatchHandler.EventType.UserBye, this.onUserBye, this)
        this.handler.on(MatchHandler.EventType.UserWait, this.onUserWait, this)
        this.handler.on(MatchHandler.EventType.UserPromotion, this.onUserPromotion, this)
        this.handler.on(MatchHandler.EventType.UserInRevival, this.onUserInRevival, this)
        this.handler.on(MatchHandler.EventType.UserSettle, this.onUserSettle, this)
        this.handler.on(MatchHandler.EventType.StageGroupEnd, this.onStageGroupEnd, this)
        this.handler.on(MatchHandler.EventType.MatchStageEnd, this.onMatchStageEnd, this)
        this.handler.on(MatchHandler.EventType.MatchEnd, this.onMatchEnd, this)
        this.handler.on(MatchHandler.EventType.PreMatchDisband, this.onPreMatchDisband, this)
        this.handler.on(MatchHandler.EventType.JoinTableObserver, this.onJoinTableObserver, this)
        this.handler.on(MatchHandler.EventType.LeaveTableObserver, this.onLeaveTableObserver, this)
        this.handler.on(MatchHandler.EventType.ReconnectSuccess, this.onReconnectSuccess, this)
        this.handler.on(MatchHandler.EventType.ReconnectFail, this.onReconnectFail, this)
    }

    removeListener(){
        this.handler.off(MatchHandler.EventType.MatchAboutToStart, this.onMatchAboutToStart, this)
        this.handler.off(MatchHandler.EventType.MatchStart, this.onMatchStart, this)
        this.handler.off(MatchHandler.EventType.MatchStageStart, this.onMatchStageStart, this)
        this.handler.off(MatchHandler.EventType.MatchTableStart, this.onMatchTableStart, this)
        this.handler.off(MatchHandler.EventType.MatchGameStart, this.onMatchGameStart, this)
        this.handler.off(MatchHandler.EventType.MatchTableResult, this.onMatchTableResult, this)
        this.handler.off(MatchHandler.EventType.UserBye, this.onUserBye, this)
        this.handler.off(MatchHandler.EventType.UserWait, this.onUserWait, this)
        this.handler.off(MatchHandler.EventType.UserPromotion, this.onUserPromotion, this)
        this.handler.off(MatchHandler.EventType.UserInRevival, this.onUserInRevival, this)
        this.handler.off(MatchHandler.EventType.UserSettle, this.onUserSettle, this)
        this.handler.off(MatchHandler.EventType.StageGroupEnd, this.onStageGroupEnd, this)
        this.handler.off(MatchHandler.EventType.MatchStageEnd, this.onMatchStageEnd, this)
        this.handler.off(MatchHandler.EventType.MatchEnd, this.onMatchEnd, this)
        this.handler.off(MatchHandler.EventType.PreMatchDisband, this.onPreMatchDisband, this)
        this.handler.off(MatchHandler.EventType.JoinTableObserver, this.onJoinTableObserver, this)
        this.handler.off(MatchHandler.EventType.LeaveTableObserver, this.onLeaveTableObserver, this)
        this.handler.off(MatchHandler.EventType.ReconnectSuccess, this.onReconnectSuccess, this)
        this.handler.off(MatchHandler.EventType.ReconnectFail, this.onReconnectFail, this)
    }

    async handlerUserStatus() {
        let user = this.roomInfo.userInfo.getMySelf()
        if (user.isWait() || user.isWaitOver()) {
            this.onUserWait(App.userMgr.loginUid)
        } else if (user.isPlaying()) {
            this.onUserPlaying(App.userMgr.loginUid)
        } else if (user.isInRevival()) {
            let result = await MatchApi.getMsgUserRevival(this.handler.matchKey, this.handler.srvID)
            if (!result.err) {
                this.onUserInRevival(App.userMgr.loginUid, result.resp)
            } else {
                console.error("MatchController handlerUserStatus getMsgUserRevival err")
            }
        }
    }

    //进入成功
    async onJoinSuccess(preMatchKey) {
        if (preMatchKey == this.handler.preMatchKey) {
            let gameID = this.roomInfo.config.getGameID()
            //TODO(检测子游戏更新)
    
            let matchStatus = this.roomInfo.preBaseInfo.getStatus()
            if (matchStatus == PBRegularCommon.MatchStatusRunning) {
                if (this.handler.isRealTime) {
                    this.handlerUserStatus()
                } else {
                }
            } else if (matchStatus == PBRegularCommon.MatchStatusOver) {
    
            }
        }
    }

    //延迟入场成功
    async onDelayJoinSuccess(preMatchKey) {
        if (preMatchKey == this.handler.preMatchKey) {
            let matchStatus = this.roomInfo.preBaseInfo.getStatus()
            if (matchStatus == PBRegularCommon.MatchStatusRunning) {
                this.handlerUserStatus()
            }
        }
    }

    //重连成功
    async onReconnectSuccess() {
        let matchStatus = this.roomInfo.preBaseInfo.getStatus()
        if (matchStatus == PBRegularCommon.MatchStatusRunning) {
            this.handlerUserStatus()
        }
    }

    //重连失败
    async onReconnectFail() {
    }

    //倒计时
    abstract onMatchAboutToStart(leftTimes : number)

    //比赛开始
    abstract onMatchStart()

    //阶段开始
    abstract onMatchStageStart()

    //桌子开始
    abstract onMatchTableStart(table : MTable, isMeIn : boolean)

    abstract onMatchGameStart(table : MTable)

    //桌子结束    
    abstract onMatchTableResult(table : MTable, isMeIn : boolean)

    //正在进行比赛
    abstract onUserPlaying(uid : number)

    //轮空了
    abstract onUserBye(uid : number)

    //等待晋级了
    abstract onUserWait(uid : number)

    //玩家等待结果
    abstract onUserWaitOver(uid : number)
    
    //晋级了
    abstract onUserPromotion(uid : number)

    //等待复活了
    abstract onUserInRevival(uid : number, revival : RevivalInfo | any)

    //结算
    abstract onUserSettle(uid : number, user : MUser)

    //分组结束 
    abstract onStageGroupEnd()

    //阶段结束
    abstract onMatchStageEnd()

    //比赛结束
    abstract onMatchEnd()

    //房间解散了
    abstract onPreMatchDisband()

    //进入桌子围观
    abstract onJoinTableObserver(table : MTable, uid : number)

    //离开桌子围观
    abstract onLeaveTableObserver()
}
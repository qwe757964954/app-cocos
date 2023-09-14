import { PreMatchListener } from "../listener/PreMatchListener";
import { MatchListener } from "../listener/MatchListener";
import { RoomInfo } from "../data/RoomInfo";
import { ObserverListener } from "../listener/ObserverListener";
import { EmptyClass, EventTargetExtends } from "bos/utils/ClassUtils";
import { MatchController } from "../controller/MatchController";
import { TableObHandler } from "../ob/TableObHandler";
import { MatchApi } from "../../api/MatchApi";
import { App } from "app/App";
import { MTable } from "../data/TableInfo";
import { PBRegularCommon } from "../../code/code";
import { UIMgr } from "bos/framework/gui/UIMgr";
import { uiMgr } from "bos/exports";
import { TaskQueue } from "bos/exports";

let eventIndex = 0
function getUniqueEventName(){
    eventIndex++
    return "MatchHandlerEvent" + eventIndex.toString()
}

export enum ReconnectResult {
    Normal,         //赛前重连 
    Playing,        //赛中重连        
    Observer,       //围观了
    Error,          //出错
}

export class MatchHandler extends EventTargetExtends(EmptyClass){
    static EventType = {
        /*赛前 玩家信息变更*/
        UsersJoin : getUniqueEventName(),               //玩家进来
        UsersLeave : getUniqueEventName(),              //玩家离开
        UsersSigned : getUniqueEventName(),             //玩家报名
        UsersCancelSigned : getUniqueEventName(),       //取消报名
        UsersReady : getUniqueEventName(),              //准备
        UsersCancelReady : getUniqueEventName(),        //取消准备
        UserRevived :getUniqueEventName(),          //复活成功
        UserSignedNumChange :getUniqueEventName(),  // 报名人数变化
        UserReadyNumChange :getUniqueEventName(),   //准备人数变化

        /*赛前 比赛流程*/
        MatchCanReady : getUniqueEventName(),       //可以准备了   
        MatchAboutToStart : getUniqueEventName(),   //即将开赛
        MatchStatusChange : getUniqueEventName(),   //比赛状态变化
        MatchStartFailed : getUniqueEventName(),    //开赛失败
        PreMatchDisband : getUniqueEventName(),     //比赛解散了

        /*赛中 玩家状态变更*/
        UserOut :getUniqueEventName(),              //淘汰
        UserBye :getUniqueEventName(),              //轮空
        UserWait :getUniqueEventName(),             //等待晋级
        UserWaitOver :getUniqueEventName(),         //等待结果
        UserStatusChange :getUniqueEventName(),     //玩家状态变更
        UserPromotion :getUniqueEventName(),        //晋级
        UserQuit : getUniqueEventName(),            //放弃比赛
        UserSettle : getUniqueEventName(),          //结算
        UserInRevival : getUniqueEventName(),       //复活    

        /*赛中 比赛流程*/
        MatchStart : getUniqueEventName(),          //比赛开始
        MatchStageStart : getUniqueEventName(),     //阶段开始
        MatchTableStart : getUniqueEventName(),     //桌子开始
        MatchGameStart : getUniqueEventName(),      //桌子开始打牌了
        MatchTableResult : getUniqueEventName(),    //桌子结束    
        StageGroupEnd : getUniqueEventName(),       //分组结束    
        MatchStageEnd : getUniqueEventName(),       //阶段结束
        MatchEnd : getUniqueEventName(),            //比赛结束

        TableStatusChange : getUniqueEventName(),        //桌子状态变化
        TableNumChange : getUniqueEventName(),          //桌子数量变化
        MatchBaseScoreChange : getUniqueEventName(),    //比赛底分变化
        MatchOutScoreChange : getUniqueEventName(),     //比赛淘汰分变化
        

        RankChange : getUniqueEventName(),              //排行榜变更
        PoolChange : getUniqueEventName(),              //奖池变化
        MatchConfigUpdate : getUniqueEventName(),       //配置更新了
        GoToHomePage :getUniqueEventName(),             //退出比赛

        ChangeObserverView : getUniqueEventName(),      //切换到围观视角(在聊天室，但是没有报名，比赛开赛后，切换到围观视角)

        /**重连了 */
        ReconnectSuccess : getUniqueEventName(),
        ReconnectFail : getUniqueEventName(),

        /**桌子围观 */
        JoinTableObserver : getUniqueEventName(),       //进入桌子围观
        LeaveTableObserver : getUniqueEventName(),       //离开桌子围观

        /**其他事件 */
        PopupSettleMultiDetail : getUniqueEventName(),  //弹出结算倍数详情界面
    }

    //比赛服消息监听
    preMatchListener:PreMatchListener
    matchListener:MatchListener
    observerListener:ObserverListener

    //比赛数据管理
    _roomInfo : RoomInfo = null

    //比赛流程管理器
    _matchController : MatchController = null

    //桌子围观handler
    _tableObHandler : TableObHandler = null
    _followUID : number

    _msgQueue: TaskQueue = new TaskQueue()

    _schedulerID : number
    _preMatchKey : string = ""
    _matchKey : string = ""
    _srvID : number
    _isRealTime = false
    _isValid = true

    constructor(preMatchKey : string, srvID : number, schedulerID : number){
        super()

        this._preMatchKey = preMatchKey
        this._srvID = srvID
        this._schedulerID = schedulerID

        this._roomInfo = new RoomInfo(this)
        this._roomInfo.reset()
        this.preMatchListener = new PreMatchListener(this, this._roomInfo)
        this.matchListener = new MatchListener(this, this._roomInfo)
        this.observerListener = new ObserverListener(this, this._roomInfo)

        this.startListener()
    }

    get srvID(){
        return this._srvID
    }

    set srvID(srvID: number){
        this._srvID = srvID
    }

    get isValid(){
        return this._isValid
    }

    get isRealTime(){
        return this._isRealTime
    }

    set isRealTime(isRealTime){
        this._isRealTime = isRealTime
    }

    get preMatchKey(){
        return this._preMatchKey
    }

    set preMatchKey(preMatchKey){
        this._preMatchKey = preMatchKey
    }

    get matchKey(){
        return this._matchKey
    }

    set matchKey(matchKey){
        this._matchKey = matchKey
    }

    get roomInfo(){
        return this._roomInfo
    }

    set roomInfo(roomInfo){
        this._roomInfo = roomInfo
    }

    get matchController(){
        return this._matchController
    }

    get followUID(){
        return this._followUID
    }

    //设置一个比赛流程管理器
    set matchController(controller){
        if (this._matchController) {
            this._matchController.reset()
            this._matchController = null
        }
        if (controller) {
            this._matchController = controller
            this._matchController.init()
        }
    }

    set tableObHandler(handler){
        this._tableObHandler = handler
    }

    get tableObHandler(){
        return this._tableObHandler
    }

    get schedulerID(){
        return this._schedulerID
    }

    set schedulerID(schedulerID){
        this._schedulerID = schedulerID
    }

    pushTask(task) {
        this._msgQueue.push(task)
    }


    reset(){
        console.warn("MatchHandler reset")

        this.stopListener()
        
        this.roomInfo.reset()
        this._msgQueue.reset()
        this._isValid = false

        this.matchController?.reset()
        this.matchController = null

        if (App.gameMgr.getRunningMatchKey() == this.preMatchKey) {
            App.gameMgr.exitGame()
        }
    }

    startListener(){
        this.preMatchListener.startListener()
        this.matchListener.startListener()
        this.observerListener.startListener()
    }

    stopListener(){
        this.preMatchListener.stopListener()
        this.matchListener.stopListener()
        this.observerListener.stopListener()
    }

    startRun() {
        this._msgQueue.start()
    }

    stopRun() {
        this._msgQueue.stop()
    }

    //join
    async join(delayEnter?: boolean, controller? :MatchController) {
        console.warn("MatchHandler join", delayEnter)
        let result = await MatchApi.joinPreMatch(this.preMatchKey)
        let isOk = true
        if(!result.err){
            let resp = result.resp
            let JoinObserver = resp.JoinObserver
            let isMatchStart = resp.isMatchStart
            let matchKey = resp.matchKey
            let roomInfo = resp.roomInfo || {}
            let preUserInfo = roomInfo.userInfoV2
            let preMatchInfo = roomInfo.preMatchInfo
            let cfgUpdateAt = roomInfo.cfgUpdateAt
            let srvID = resp.srvID

            this.srvID = srvID
            this.preMatchListener.setKey(this.preMatchKey)
            this.roomInfo.initWithPreMathInfo(preMatchInfo, preUserInfo?.users)
            
            //获取配置
            let config = await App.matchMgr.getConfig(isMatchStart ? matchKey : this.schedulerID, isMatchStart, srvID, isMatchStart ? null : cfgUpdateAt)
            if (config) {
                this.roomInfo.initConfig(config)

                if (JoinObserver) {
                    let result = await MatchApi.joinObserver(matchKey)
                    if (!result.err) {
                        this.handleObserverSnapshot(result.resp, matchKey, config, preMatchInfo, preUserInfo.users)
                    } else {
                        isOk = false
                        console.error("MatchMgr joinPreMatch delayJoinMatch err", result)
                    }
                } else if(delayEnter) {
                    let result = await MatchApi.delayJoinMatch(matchKey, srvID)
                    if (!result.err) {
                        let info = result.resp.info
                        this.roomInfo.initBaseInfo(info.matchInfo)
                        this.roomInfo.updateMatchUserInfo(info?.userInfoV2?.users)
                        this.roomInfo.initTableInfo(info?.tableInfo?.tables)

                        this.matchKey = matchKey
                        this.matchListener.setKey(matchKey)
                    } else {
                        isOk = false
                        console.error("MatchMgr joinPreMatch delayJoinMatch err", result)
                    }

                    this.isRealTime = true
                } else {
                    if (isMatchStart) {
                        let result = await MatchApi.getIGInfo(matchKey, srvID)
                        if (!result.err) {
                            let info = result.resp.info
                            this.roomInfo.initBaseInfo(info.matchInfo)
                            this.roomInfo.updateMatchUserInfo(info?.userInfoV2?.users)
                            this.roomInfo.initTableInfo(info?.tableInfoV2?.tables)

                            this.matchListener.setKey(matchKey)
                        } else {
                            isOk = false
                            console.error("MatchMgr joinPreMatch getIGInfo err", result)
                        }
                    } else {
                        this.matchListener.setKey(this.preMatchKey)
                    }

                    this.isRealTime = true
                }
            } else {
                isOk = false
                console.error("MatchMgr joinPreMatch getConfig err")
            }
        } else {
            isOk = false
            console.error("MatchMgr joinPreMatch joinPreMatch err", result)
        }

        if (isOk) {
            if(controller) {
                this.matchController = controller
            } 

            this.startRun()
        }

        return isOk
    }

    async reJoin() {
        this.stopListener()
        this.roomInfo.reset()
        this._msgQueue.reset()
        let isOk = await this.join()
        return isOk
    }

    async delayJoin(controller? :MatchController){
        if (this.matchKey && this.matchKey != "") {
            if (!this.isRealTime) {
                MatchApi.leaveObserver(this.matchKey)
            }

            let result = await MatchApi.delayJoinMatch(this.matchKey, this.srvID)
            if(!result.err) {
                let info = result.resp.info
                if (info) {
                    this.isRealTime = true
                    this.roomInfo.baseInfo.update(info.matchInfo)
                    this.roomInfo.userInfo.updateUsers(info.userInfoV2?.users)
                    this.roomInfo.tableInfo.init(info.tableInfoV2?.tables)

                    if(controller) {
                        this.matchController = controller
                    } 

                    return 0
                } else {
                    console.error("延迟入场失败了 info is null", result)
                    return -1
                }
            } else {
                console.error("延迟入场失败了", result)
                return -1
            }
        }
    }

    //重连
    async reconnect(controller? :MatchController) {
        console.warn("MatchHandler reconnect", this.preMatchKey)
        let result = await MatchApi.reconnectPreMatch(this.preMatchKey)
        let code = ReconnectResult.Normal
        if (!result.err) {
            let info = result.resp.info
            let isMatchStart = result.resp.isMatchStart
            let isOnLook = result.resp.isOnLook
            let matchKey = result.resp.matchKey
            let srvID = result.resp.srvID

            this.roomInfo.initWithPreMathInfo(info.preMatchInfo, info.userInfoV2.users)
            this.preMatchListener.setKey(this.preMatchKey)

            let config = this.roomInfo.config
            if (!this.matchKey || this.matchKey == "") {
                //如果断线的时候比赛还没有开始，配置是可以更改的，所以需要重新获取一下配置
                config = await App.matchMgr.getConfig(isMatchStart ? matchKey : this.schedulerID, isMatchStart, srvID, isMatchStart ? null : info.cfgUpdateAt)
                if (!config) {
                    // uiMgr.showToast("房间异常")
                    console.error("MatchHandler reconnect App.matchMgr.getConfig error")
                }
            }

            this.roomInfo.initConfig(config)

            /**重连回来是围观视角（临界状态or后台挂机or长时间掉线or本来就是在聊天室围观） */
            if (isOnLook) {
                let result = await MatchApi.joinObserver(matchKey)
                if (!result.err) {
                    this.handleObserverSnapshot(result.resp, matchKey, config, info.preMatchInfo, info.userInfoV2.users)

                    if (this.tableObHandler) {
                        //尝试重连一下围观的桌子
                        this.tableObHandler.reconnect()
                    } else {
                        /**围观状态,但是没有围观其他桌子，尝试退出一下游戏*/
                        if (App.gameMgr.getRunningMatchKey() == this.preMatchKey) {
                            App.gameMgr.exitGame()
                            this.matchController?.destroyNode()
                        }
                    }

                    code = ReconnectResult.Observer
                } else {
                    uiMgr.showToast("房间异常")
                    console.error("MatchHandler reconnect MatchApi.joinObserver error", result)
                    code = ReconnectResult.Error
                }
            } else {
                if (isMatchStart) {
                    let result = await MatchApi.getIGInfo(matchKey, srvID)
                    if (!result.err) {
                        this.matchKey = matchKey
                        this.srvID = srvID

                        let info = result.resp.info
                        this.roomInfo.initBaseInfo(info.matchInfo)
                        this.roomInfo.updateMatchUserInfo(info?.userInfoV2?.users)
                        this.roomInfo.initTableInfo(info?.tableInfoV2?.tables)
                        this.matchListener.setKey(matchKey)

                        let user = this.roomInfo.userInfo.getMySelf()
                        if (user.isWait() || user.isWaitOver() || user.isPlaying() || user.isInRevival()) {
                            code = ReconnectResult.Playing
                        }
                    } else {
                        uiMgr.showToast("房间异常")
                        console.error("MatchHandler reconnect MatchApi.getIGInfo err", result)
                        code = ReconnectResult.Error
                    }
                } 

                this.isRealTime = true
            }

            if(controller) {
                this.matchController = controller
            } 
            this.startRun()
        } else {
            uiMgr.showToast("房间异常")
            console.error("MatchHandler reconnect MatchApi.reconnectPreMatch error", result)
            code = ReconnectResult.Error
        }

        if (code == ReconnectResult.Error) {
            this.emit(MatchHandler.EventType.ReconnectFail)
        } else {
            this.emit(MatchHandler.EventType.ReconnectSuccess)
        }

        return code
    }

    //观战
    async joinTableObserver(table? : MTable, uid? : number, isFollow : boolean = true) {
        console.warn("matchHandler joinTableObserver", table, uid)
        if (this._tableObHandler) {
            console.warn("joinTableObserver tableObHandler is already exist")
            return false
        }

        if (!table) {
            console.warn("joinTableObserver the param 'table' is null")
            return
        }

        if (table.status != PBRegularCommon.TableStatusPlaying) {
            console.warn("joinTableObserver table is not playing")
            return
        }

        let realKey = table.realKey
        if (!uid && table.uids && table.uids.length > 0) {
            uid = table.uids[0]
        }

        if (!uid) {
            console.warn("joinTableObserver uid is not valid")
            return
        }

        uiMgr.showLoading()
        let err = await App.gameMgr.joinObserve({
            gameID : this.roomInfo.config.getGameID(),
            matchType : this.roomInfo.config.getMatchType(),
            playWay : this.roomInfo.config.getPlayOpt(),
            playerNum : this.roomInfo.config.getSeatNum(),
            matchKey : this.preMatchKey,
            tableKey : realKey,
            observeData: {
                mainUid: uid, //主视角
                isRealtime : this.isRealTime
            }
        })
        uiMgr.hideLoading()
        if (!err) {
            this._tableObHandler = new TableObHandler(this, table, uid, isFollow)
            if (isFollow) {
                this._followUID = uid
            }
            this.emit(MatchHandler.EventType.JoinTableObserver, table, uid)
            console.warn("JoinTableObserver success")
        } else {
            console.error("joinTableObserver is error", err, table.key, table.realKey)
        }
    }

    //切换视角
    async switchObserver(newUid : number){
        if (this.tableObHandler) {
            this.tableObHandler.observerUID = newUid
            this.tableObHandler.followUID = newUid
        }
        let err = await App.gameMgr.switchObserve(newUid)
        return err
    }

    async leaveTableObserver(exitGame?: boolean) {
        if (this._tableObHandler) {
            this._tableObHandler.reset()
            this._tableObHandler = null
        }

        App.gameMgr.leaveObserve()

        this.emit(MatchHandler.EventType.LeaveTableObserver)

        if (exitGame) {
            this._followUID = null
            App.gameMgr.exitGame()
            this.matchController?.destroyNode()
        }
    }

    handleObserverSnapshot(data, matchKey, config, preMatchInfo, users){
        this.observerListener.handleSnapshot(data, matchKey, config, preMatchInfo, users)
    }
}
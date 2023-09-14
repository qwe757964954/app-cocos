
import { ISession } from "idl/tss/match_v2/common_matematch";
import { IJoinDeskMsg, ILeaveDeskMsg, IMsgMatchOver, IMsgMatchStart, IMsgOneGameResult, IMsgOneGameStart, IReadyMsg, IUserChangeDeskReq, IUserJoinDeskReq, IUserLeaveDeskReq, IUserReadyReq, Matematch as MateMatchService, Matematch } from "idl/tss/match_v2/matematch.v1";
import { SessionInfo, SessionType } from "app/domain/session/SessionMgr";
import { App } from "app/App";
import { EmptyClass, EventTargetExtends, Log, uiMgr } from "bos/exports";
import { Desk } from "./Desk";
import { GameMgr } from "../game/GameMgr";
import { RpcParams, RpcService } from "bos/framework/network/rpc/RpcService";
import { TaskQueue } from "bos/exports";
import { ICheckAndGetUserSessionV1Resp } from "idl/tss/match_v2/appbff.v1";
import { MatchType } from "idl/tss/match_v2/common/common";

type JoinDeskParams = {
    gameID?: string
    playWay?: number
    sessionID?: string
}

const mate_match_type = MatchType.MatchTypeMate

export class MateMgr extends EventTargetExtends(EmptyClass) {
    private _sessionList: ISession[]
    private _desk: Desk
    private _uid: number
    private _msgQueue = new TaskQueue()
    private _session: ISession;
    private _joinFlag: boolean = false

    static EventType = {
        ON_JOIN_DESK: "onJoinDesk",
        ON_LEAVE_DESK: "onLeaveDesk",
        ON_READY_DESK: "onReadyDesk",
        ON_MATCH_START: "onMatchStart",
        ON_MATCH_END: "onMatchEnd",
        ON_GAME_START: "onGameStart",
        ON_GAME_RESULT: "onGameResult",
        ON_USER_JOIN: "onUserJoin",
        ON_USER_LEAVE: "onUserLeave",
        ON_USER_READY: "onUserReady",
    }

    private _deskApis = [
        Matematch.NotifyJoinDesk.name,
        Matematch.NotifyLeaveDesk.name,
        Matematch.NotifyReady.name,
    ]

    private _matchApis = [
        Matematch.NotifyOneGameStart.name,
        Matematch.NotifyOneGameResult.name,
        Matematch.NotifyMatchOver.name,
    ]

    constructor() {
        super()
    }

    init() {
        App.sessionMgr.registerHandler(SessionType.Mate, this)

        App.gameMgr.on(GameMgr.EventType.WILL_ENTER_GAME, this.onWillEnterGame, this)
    }

    setUid(value: number) {
        this._uid = value
        Matematch.on(RpcService.EventType.NOTIFICATION, (method: string, msg: any, params: RpcParams)=>{
            this._msgQueue.push({
                target: this,
                executor: this.onNotification,
                args: [method, msg, params],
            })
        }, this)
        this._msgQueue.start()
    }

    reset() {
        this.resetSession()
    }

    onNotification(data):void {
        let [method, msg, params] = data
        let f = "on" + method
        if (!this[f]) {
            console.log("method not found", method)
            return
        }
        Log.d("MateMgr.onNotification", f, data)
        this[f].call(this, msg, params)
    }

    async getSessionList() {
        if(this._sessionList) {
            return this._sessionList
        }
        let result = await MateMatchService.ListOpenedSession({})
        if (result.err) {
            return
        }
        this._sessionList = result.resp.sessions
        return this._sessionList
    }

    onNotifyMatchStart(msg: IMsgMatchStart, params: RpcParams) {
        this._desk.setMatchStart(msg)
        Log.i("MateMgr.onNotifyMatchStart", this._desk)
        this.emit(MateMgr.EventType.ON_MATCH_START, msg)
        Matematch.setRouteKey(this._desk.matchKey, this._matchApis)
    }

    onNotifyOneGameStart(msg: IMsgOneGameStart, params: RpcParams) {
        this._desk.setGameStart(msg)
        Log.i("MateMgr.onNotifyOneGameStart", this._desk)
        this.emit(MateMgr.EventType.ON_GAME_START, msg)
    }

    onNotifyOneGameResult(msg: IMsgOneGameResult, params: RpcParams) {
        this._desk.setOneGameResult(msg)
        Log.i("MateMgr.onNotifyOneGameResult", this._desk, msg)
        this.emit(MateMgr.EventType.ON_GAME_RESULT, msg)
    }

    onNotifyMatchOver(msg: IMsgMatchOver, params: RpcParams) {
        this._desk.setMatchOver(msg)
        Log.i("MateMgr.onNotifyMatchOver", this._desk)
        this.emit(MateMgr.EventType.ON_MATCH_END, msg)
        Matematch.setRouteKey(this._desk.matchKey, this._matchApis)
    }

    onNotifyJoinDesk(msg: IJoinDeskMsg, params: RpcParams) {
        this._desk.addUser(msg.user)
        Log.i("MateMgr.onNotifyJoinDesk", this._desk)
        this.emit(MateMgr.EventType.ON_USER_JOIN, msg)
    }

    onNotifyLeaveDesk(msg: ILeaveDeskMsg, params: RpcParams) {
        if (msg.user.uid == this._uid) {
            this.resetDesk()
            Log.i("MateMgr.onNotifyLeaveDesk", this._desk)
            this.emit(MateMgr.EventType.ON_LEAVE_DESK, this._desk)
        } else {
            this._desk.removeUser(msg.user.uid)
            Log.i("MateMgr.onNotifyLeaveDesk.others", this._desk)
            this.emit(MateMgr.EventType.ON_USER_LEAVE, msg)
        }
    }

    resetSession(session?: ISession, desk?: Properties<Desk>, user?: any[]) {
        Log.w("MateMgr.resetSession...", session, desk, user)
        this._session = session
        this.resetDesk(desk, user)
        if (!session) {
            this._msgQueue.reset()
            this._msgQueue.stop()
        } else {
            this._msgQueue.start()
        }
    }

    resetDesk(desk?: Properties<Desk>, user?: any[]) {
        Log.w("MateMgr.resetDesk...", desk, user)
        this._desk = new Desk(this._uid)
        desk && this._desk.updateDesk(desk)
        user && this._desk.updateUser(user)
        Matematch.setRouteKey(this._desk.deskID?.toString(), this._deskApis)
    }

    onNotifyReady(msg: IReadyMsg, params: RpcParams) {
        this._desk.setUserReady(msg.user)
        this.emit(MateMgr.EventType.ON_USER_READY, msg)
    }

    async getSession(params: JoinDeskParams) {
        let sessionList = await this.getSessionList()
        if (!sessionList) {
            console.error("session not found", params)
            return
        }
        let session = sessionList.find(s => {
            if (params.sessionID) {
                return s.ID == params.sessionID
            } else {
                return s.gameID === params.gameID
            }
        })
        if (!session) {
            console.error("session not found", params, sessionList)
            return
        }
        return session
    }

    async joinDesk(params: JoinDeskParams) {
        if (this._joinFlag) {
            return
        }
        this._joinFlag = true
        uiMgr.showLoading()
        let result = await this.tryJoinDesk(params)
        uiMgr.hideLoading()
        this._joinFlag = false
        return result
    }

    async tryJoinDesk(params: JoinDeskParams) {
        let session = await this.getSession(params)
        if (!session) {
            Log.e("MateMgr.tryJoinDesk...error[session not found]")
            return
        }
        let req: IUserJoinDeskReq = {
            sessionID: session.ID,
        }
        let result = await MateMatchService.UserJoinDesk(req)
        Log.i("MateMgr.tryJoinDesk...result", result)
        if (result.err || result.resp.code != 0) {
            this.refreshSession()
            return
        }

        this.resetSession(session, {
            srvID: result.resp.srvID,
        }, result.resp.user)
        this.emit(MateMgr.EventType.ON_JOIN_DESK, this._desk)

        return this.enterDesk({
            gameID: session.gameID,
            playWay: session.playWay,
        })
    }

    private async enterDesk(params: any) {
        const running = App.gameMgr.getRunningGame()
        if (!running) {
            return App.gameMgr.enterGame({
                gameID: params.gameID,
                matchType: MatchType.MatchTypeMate,
                playWay: params.playWay,
            })
        } else if (params.gameID == running) {
            return
        } else {
            return new Error("running other game")
        }
    }

    getDesk() {
        return this._desk
    }

    getMyDeskUser() {
        return this._desk?.myself
    }
    
    getDeskUsers() {
        return this._desk?.users
    }

    readyDesk() {
        this._msgQueue.push({
            executor: this.tryReadyDesk,
            target: this,
        })
    }

    getMatchName(): string {
        return this._session && this._session.name;
    }

    private async tryReadyDesk() {
        if (!this._session) {
            return
        }
        if (!this._desk.deskID) {
            return this.joinDesk({
                gameID: this._session.gameID,
                playWay: this._session.playWay,
            })
        }
        let req: IUserReadyReq = {
            sessionID: this._session?.ID,
            deskID: this._desk.deskID,
        }
        let result = await MateMatchService.UserReady(req)
        if (result.err || result.resp.code != 0) {
            this.refreshSession()
            return
        }
        this._desk.getUser(this._uid).isReady = true
        this.emit(MateMgr.EventType.ON_READY_DESK, this._desk)
    }

    changeDesk() {
        this._msgQueue.push({
            executor: this.tryChangeDesk,
            target: this,
        })
    }

    private async tryChangeDesk() {
        if (!this._session) {
            Log.e("MateMgr.tryChangeDesk...error[session not found]")
            return
        }
        if (!this._desk.deskID) {
            return this.joinDesk({
                gameID: this._session.gameID,
                playWay: this._session.playWay,
            })
        }
        let req: IUserChangeDeskReq = {
            sessionID: this._session?.ID,
            deskID: this._desk.deskID,
        }
        let result = await MateMatchService.UserChangeDesk(req)
        Log.i("MateMgr.tryChangeDesk...result", result)
        if (result.err || result.resp.code != 0) {
            this.refreshSession()
            return
        }
        this.resetDesk(null, result.resp.user)
        this.emit(MateMgr.EventType.ON_JOIN_DESK, this._desk)
    }

    leaveDesk() {
        this._msgQueue.push({
            executor: this.tryLeaveDesk,
            target: this,
        })
    }

    private async tryLeaveDesk() {
        Log.i("tryLeaveDesk...", this._session?.ID, this._desk.deskID)
        if (this._session && this._desk?.deskID) {
            let req: IUserLeaveDeskReq = {
                sessionID: this._session?.ID,
                deskID: this._desk?.deskID,
            }
            let result = await MateMatchService.UserLeaveDesk(req)
            Log.i("MateMgr.tryLeaveDesk...result", result)
            if (result.err || result.resp.code != 0) {
                this.refreshSession()
            }
        }
        this.resetSession()
        App.gameMgr.exitGame()
    }

    private refreshSession() {
        this.resetSession()
        App.sessionMgr.reconnectSession(true)
    }

    async reconnectSession(msg: SessionInfo) : Promise<number> {
        Log.i("MateMgr.reconnectSession", msg)
        this.resetSession()
        let err = this.tryReconnectSession(msg)
        if (err) {
            this.resetSession()
            return -1
        }
        return 0
    }

    async tryReconnectSession(msg: SessionInfo) {
        Log.i("MateMgr.tryReconnectSession", msg)
        if (!msg.isMateSession || !msg.mateSession) {
            return -1
        }

        let session = await this.getSession({
            sessionID: msg.mateSession.sessionID,
            gameID: msg.mateSession.gameID,
            playWay: msg.mateSession.playWay,
        })
        if (!session) {
            return -1
        }

        this.resetSession(session, {
            srvID: msg.mateSession.srvID,
            srvName: msg.mateSession.srvName,
            matchKey: msg.mateSession.matchKey,
        }, msg.mateSession.users)
        let err = await this.enterDesk({
            gameID: msg.mateSession.gameID,
            playWay: msg.mateSession.playWay,
        })
        if (err) {
            return err
        }

        if (msg.mateSession.matchKey) {
            let err = await this.reconnectMatch(msg)
            if (err) {
                Log.e("MateMgr.reconnectMatch...err", err)
                return -1
            }
        }
    }

    async reconnectMatch(msg: ICheckAndGetUserSessionV1Resp) {
        let result = await Matematch.GetReconnectInfo({matchKey: msg.mateSession.matchKey})
        const reconnectInfo = result?.resp?.info
        if (reconnectInfo) {
            this._desk.updateUser(reconnectInfo.users)
            this._desk.updateUser(reconnectInfo.deskUsers)
            this._desk.updateDesk({
                ante: reconnectInfo.ante,
                chatID: reconnectInfo.chatID,
            })
            return App.gameMgr.reconnect(reconnectInfo.table)
        }
    }

    onWillEnterGame() {
        if (App.gameMgr.getRunningMatchType() != mate_match_type) {
            this.resetSession()
        }
    }
}
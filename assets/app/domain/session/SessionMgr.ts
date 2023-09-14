import { App } from "app/App"
import { EmptyClass, EventTargetExtends, Log, Net, uiMgr } from "bos/exports"
import { UIMgr } from "bos/framework/gui/UIMgr"
import { Director } from "cc"
import { director } from "cc"
import { Online } from "idl/bgo/base/online"
import { Appbff, ICheckAndGetUserSessionV1Resp } from "idl/tss/match_v2/appbff.v1"
import { IMateSession } from "idl/tss/match_v2/common/common_matetable"
import { IMatchSession, Session } from "idl/tss/match_v2/common_matematch"
import { IMsgUserSession, IUserSession, SessionService } from "idl/tss/match_v2/session.v1"
import { AccountMgr } from "../account/AccountMgr"

export enum SessionType {
    Mate = 1,
    Match = 2,
}

interface SessionHandler {
    reconnectSession(ICheckAndGetUserSessionV1Resp):Promise<number>
}

const REFRESH_INTERVAL = 5*1000

export class SessionInfo {
    isMateSession: boolean = false
    isMatchSession: boolean = false
    mateSession: IMateSession
    matchSession: IUserSession
    updateAt: number
}

class SessionMgr extends EventTargetExtends(EmptyClass) {
    private _handlers: SessionHandler[] = []
    private _sessionInfo: SessionInfo = new SessionInfo()
    private _autoReconnect: boolean = false
    private _reconnectAt: number = 0

    static EventType = {
        SESSION_CHANGED: "session_changed",
    }

    get isMatchSession() { return this._sessionInfo?.isMatchSession }

    get isMateSession() { return this._sessionInfo?.isMateSession }

    get matchSession() { return this._sessionInfo?.matchSession }

    get mateSession() { return this._sessionInfo?.mateSession }

    constructor() {
        super()
    }

    init() {
        SessionService.on(SessionService.NotifyUserSession.name, (msg: IMsgUserSession)=>{
            Log.i("SessionMgr.onNotifyUserSession", msg);
            this._sessionInfo.isMatchSession = msg.IsOfficialSession
            this._sessionInfo.isMateSession = msg.IsMateSession
            this._sessionInfo.matchSession = msg.session
            this._sessionInfo.mateSession = msg.mateSession
            this.emit(SessionMgr.EventType.SESSION_CHANGED, this._sessionInfo)
        });
    }

    setUid(uid: number) {
        Log.d("SessionMgr.setUid", uid)
        this._autoReconnect = undefined
        this._reconnectAt = undefined
        this.checkSession()
    }

    reset() {
        this._sessionInfo.isMatchSession = false
        this._sessionInfo.isMateSession = false
        this._sessionInfo.matchSession = undefined
        this._sessionInfo.mateSession = undefined
    }

    registerHandler(type: SessionType, handler: SessionHandler ) {
        this._handlers[type] = handler
    }

    private async checkSession() {
        let result = await Appbff.CheckAndGetUserSessionV1({})
        Log.i("SessionMgr.getSession...", result)
        if (result.err) {
            Log.e("SessionMgr.getSession...error", result)
            return
        }
        this._sessionInfo.isMatchSession = result.resp?.IsMatchSession
        this._sessionInfo.isMateSession = result.resp?.IsMateSession
        this._sessionInfo.matchSession = result.resp?.matchSession
        this._sessionInfo.mateSession = result.resp?.mateSession
        this._sessionInfo.updateAt = Date.now()
        if (this._autoReconnect) {
            this._autoReconnect = false
            this.reconnect()
        }
    }

    async reconnectSession(isForce: boolean = false) {
        Log.i("reconnectSession...", isForce)
        if (App.userMgr.loginUid == 0) {
            return
        }
        if (isForce) {
            this._autoReconnect = true
            this.checkSession()
            return
        }
        if (this._reconnectAt) {
            return
        }
        if (this._sessionInfo.updateAt) {
            this.reconnect()
            return
        }
        this._autoReconnect = true
    }

    private async reconnect() {
        Log.i("SessionMgr.reconnect...", this._sessionInfo)
        this._reconnectAt = Date.now()
        let tmp = Object.assign({}, this._sessionInfo)
        for (let i = SessionType.Match; i > 0; i--) {
            let handler = this._handlers[i]
            if (handler) {
                let result = await handler.reconnectSession(tmp)
                if (result >= 0) {
                    break
                }
            }
        }
    }
}

export {SessionMgr}
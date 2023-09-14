import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  Void as base_Void,IVoid as base_IVoid ,  BatchGetResourceReq as base_BatchGetResourceReq,IBatchGetResourceReq as base_IBatchGetResourceReq ,  BatchGetResourceResp as base_BatchGetResourceResp,IBatchGetResourceResp as base_IBatchGetResourceResp ,  } from "idl/base/base"
import {  Code as tss_match_v2_common_Code ,  } from "idl/tss/match_v2/common/code"
import {  PromptJump as tss_match_v2_common_PromptJump,IPromptJump as tss_match_v2_common_IPromptJump ,  SessionType as tss_match_v2_common_SessionType ,  MatchType as tss_match_v2_common_MatchType ,  LiveRoomType as tss_match_v2_common_LiveRoomType ,  MatchStatus as tss_match_v2_common_MatchStatus ,  RefactorVer as tss_match_v2_common_RefactorVer ,  } from "idl/tss/match_v2/common/common"
import {  MateSession as tss_match_v2_commonmatetable_MateSession,IMateSession as tss_match_v2_commonmatetable_IMateSession ,  } from "idl/tss/match_v2/common/common_matetable"
import {  MatchSession as tss_match_v2_mate_MatchSession,IMatchSession as tss_match_v2_mate_IMatchSession ,  } from "idl/tss/match_v2/common_matematch"
export interface ICmsUpdatePageHomeCfgReq {
    cfg?: IPageHomeCfg
}
@protobuf.Type.d("tss_match_v2_appbff_v1_CmsUpdatePageHomeCfgReq")
export class CmsUpdatePageHomeCfgReq extends protobuf.Message<ICmsUpdatePageHomeCfgReq> {
    constructor(properties: Properties<ICmsUpdatePageHomeCfgReq>) {
        super(properties);
        if (properties) {
            if (properties.cfg) { this.cfg = PageHomeCfg.create(properties.cfg) as any }
        }
	}
    @protobuf.Field.d(2, "tss_match_v2_appbff_v1_PageHomeCfg", "optional")
    public cfg?: PageHomeCfg|null
}
export interface IMajorPlaceView {
    image?: string|null
    viewName?: string|null
    promptDesc?: string|null
    promptJump?: tss_match_v2_common_IPromptJump
    bubbleStyle?: string|null
    MaxVersion?: number|null
    MinVersion?: number|null
}
@protobuf.Type.d("tss_match_v2_appbff_v1_MajorPlaceView")
export class MajorPlaceView extends protobuf.Message<IMajorPlaceView> {
    constructor(properties: Properties<IMajorPlaceView>) {
        super(properties);
        if (properties) {
            if (properties.image) { this.image = properties.image }
            if (properties.viewName) { this.viewName = properties.viewName }
            if (properties.promptDesc) { this.promptDesc = properties.promptDesc }
            if (properties.promptJump) { this.promptJump = tss_match_v2_common_PromptJump.create(properties.promptJump) as any }
            if (properties.bubbleStyle) { this.bubbleStyle = properties.bubbleStyle }
            if (properties.MaxVersion) { this.MaxVersion = properties.MaxVersion }
            if (properties.MinVersion) { this.MinVersion = properties.MinVersion }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public image?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public viewName?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public promptDesc?: string|null = ""
    @protobuf.Field.d(4, "tss_match_v2_common_PromptJump", "optional")
    public promptJump?: tss_match_v2_common_PromptJump|null
    @protobuf.Field.d(5, "string", "optional", )
    public bubbleStyle?: string|null = ""
    @protobuf.Field.d(6, "int64", "optional", 0)
    public MaxVersion?: number|null = 0
    @protobuf.Field.d(7, "int64", "optional", 0)
    public MinVersion?: number|null = 0
}
export interface ICmsGetPageHomeCfgReq {
    appID?: string|null
}
@protobuf.Type.d("tss_match_v2_appbff_v1_CmsGetPageHomeCfgReq")
export class CmsGetPageHomeCfgReq extends protobuf.Message<ICmsGetPageHomeCfgReq> {
    constructor(properties: Properties<ICmsGetPageHomeCfgReq>) {
        super(properties);
        if (properties) {
            if (properties.appID) { this.appID = properties.appID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public appID?: string|null = ""
}
export interface IMinorPlaceView {
    image?: string|null
    viewName?: string|null
    promptJump?: tss_match_v2_common_IPromptJump
    MaxVersion?: number|null
    MinVersion?: number|null
}
@protobuf.Type.d("tss_match_v2_appbff_v1_MinorPlaceView")
export class MinorPlaceView extends protobuf.Message<IMinorPlaceView> {
    constructor(properties: Properties<IMinorPlaceView>) {
        super(properties);
        if (properties) {
            if (properties.image) { this.image = properties.image }
            if (properties.viewName) { this.viewName = properties.viewName }
            if (properties.promptJump) { this.promptJump = tss_match_v2_common_PromptJump.create(properties.promptJump) as any }
            if (properties.MaxVersion) { this.MaxVersion = properties.MaxVersion }
            if (properties.MinVersion) { this.MinVersion = properties.MinVersion }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public image?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public viewName?: string|null = ""
    @protobuf.Field.d(3, "tss_match_v2_common_PromptJump", "optional")
    public promptJump?: tss_match_v2_common_PromptJump|null
    @protobuf.Field.d(6, "int64", "optional", 0)
    public MaxVersion?: number|null = 0
    @protobuf.Field.d(7, "int64", "optional", 0)
    public MinVersion?: number|null = 0
}
export interface IPageHomeCfg {
    appID?: string|null
    majorPlaces?: IMajorPlaceView[]
    minorPlaces?: IMinorPlaceView[]
}
@protobuf.Type.d("tss_match_v2_appbff_v1_PageHomeCfg")
export class PageHomeCfg extends protobuf.Message<IPageHomeCfg> {
    constructor(properties: Properties<IPageHomeCfg>) {
        super(properties);
        if (properties) {
            if (properties.appID) { this.appID = properties.appID }
            if (properties.majorPlaces) { this.majorPlaces = []; properties.majorPlaces.forEach((value, index)=>{this.majorPlaces[index] = MajorPlaceView.create(properties.majorPlaces[index]) as any})}
            if (properties.minorPlaces) { this.minorPlaces = []; properties.minorPlaces.forEach((value, index)=>{this.minorPlaces[index] = MinorPlaceView.create(properties.minorPlaces[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public appID?: string|null = ""
    @protobuf.Field.d(2, "tss_match_v2_appbff_v1_MajorPlaceView", "repeated")
    public majorPlaces?: MajorPlaceView[] = []
    @protobuf.Field.d(3, "tss_match_v2_appbff_v1_MinorPlaceView", "repeated")
    public minorPlaces?: MinorPlaceView[] = []
}
export interface ICmsGetPageHomeCfgResp {
    cfg?: IPageHomeCfg
}
@protobuf.Type.d("tss_match_v2_appbff_v1_CmsGetPageHomeCfgResp")
export class CmsGetPageHomeCfgResp extends protobuf.Message<ICmsGetPageHomeCfgResp> {
    constructor(properties: Properties<ICmsGetPageHomeCfgResp>) {
        super(properties);
        if (properties) {
            if (properties.cfg) { this.cfg = PageHomeCfg.create(properties.cfg) as any }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_appbff_v1_PageHomeCfg", "optional")
    public cfg?: PageHomeCfg|null
}
export interface IGetPageHomeCfgResp {
    cfg?: IPageHomeCfg
}
@protobuf.Type.d("tss_match_v2_appbff_v1_GetPageHomeCfgResp")
export class GetPageHomeCfgResp extends protobuf.Message<IGetPageHomeCfgResp> {
    constructor(properties: Properties<IGetPageHomeCfgResp>) {
        super(properties);
        if (properties) {
            if (properties.cfg) { this.cfg = PageHomeCfg.create(properties.cfg) as any }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_appbff_v1_PageHomeCfg", "optional")
    public cfg?: PageHomeCfg|null
}
export interface IUserSession {
    srvID?: number|null
    preMatchKey?: string|null
    matchKey?: string|null
    sessionType?: tss_match_v2_common_SessionType|null
    gameID?: string|null
    matchId?: number|null
    matchType?: tss_match_v2_common_MatchType|null
    roomType?: tss_match_v2_common_LiveRoomType|null
    matchStatus?: tss_match_v2_common_MatchStatus|null
    refactorVer?: tss_match_v2_common_RefactorVer|null
}
@protobuf.Type.d("tss_match_v2_appbff_v1_UserSession")
export class UserSession extends protobuf.Message<IUserSession> {
    constructor(properties: Properties<IUserSession>) {
        super(properties);
        if (properties) {
            if (properties.srvID) { this.srvID = properties.srvID }
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
            if (properties.matchKey) { this.matchKey = properties.matchKey }
            if (properties.sessionType) { this.sessionType = properties.sessionType }
            if (properties.gameID) { this.gameID = properties.gameID }
            if (properties.matchId) { this.matchId = properties.matchId }
            if (properties.matchType) { this.matchType = properties.matchType }
            if (properties.roomType) { this.roomType = properties.roomType }
            if (properties.matchStatus) { this.matchStatus = properties.matchStatus }
            if (properties.refactorVer) { this.refactorVer = properties.refactorVer }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public srvID?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public preMatchKey?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public matchKey?: string|null = ""
    @protobuf.Field.d(4, tss_match_v2_common_SessionType, "optional", tss_match_v2_common_SessionType.SessionTypeUnknown)
    public sessionType?: tss_match_v2_common_SessionType|null = tss_match_v2_common_SessionType.SessionTypeUnknown
    @protobuf.Field.d(5, "string", "optional", )
    public gameID?: string|null = ""
    @protobuf.Field.d(6, "int64", "optional", 0)
    public matchId?: number|null = 0
    @protobuf.Field.d(7, tss_match_v2_common_MatchType, "optional", tss_match_v2_common_MatchType.MatchTypeUnknown)
    public matchType?: tss_match_v2_common_MatchType|null = tss_match_v2_common_MatchType.MatchTypeUnknown
    @protobuf.Field.d(8, tss_match_v2_common_LiveRoomType, "optional", tss_match_v2_common_LiveRoomType.LiveRoomTypeUnknown)
    public roomType?: tss_match_v2_common_LiveRoomType|null = tss_match_v2_common_LiveRoomType.LiveRoomTypeUnknown
    @protobuf.Field.d(9, tss_match_v2_common_MatchStatus, "optional", tss_match_v2_common_MatchStatus.MatchStatusUnknown)
    public matchStatus?: tss_match_v2_common_MatchStatus|null = tss_match_v2_common_MatchStatus.MatchStatusUnknown
    @protobuf.Field.d(10, tss_match_v2_common_RefactorVer, "optional", tss_match_v2_common_RefactorVer.RefactorVerV1)
    public refactorVer?: tss_match_v2_common_RefactorVer|null = tss_match_v2_common_RefactorVer.RefactorVerV1
}
export interface ICheckAndGetUserSessionResp {
    sessionType?: tss_match_v2_common_SessionType|null
    session?: IUserSession
    mateSession?: tss_match_v2_mate_IMatchSession
}
@protobuf.Type.d("tss_match_v2_appbff_v1_CheckAndGetUserSessionResp")
export class CheckAndGetUserSessionResp extends protobuf.Message<ICheckAndGetUserSessionResp> {
    constructor(properties: Properties<ICheckAndGetUserSessionResp>) {
        super(properties);
        if (properties) {
            if (properties.sessionType) { this.sessionType = properties.sessionType }
            if (properties.session) { this.session = UserSession.create(properties.session) as any }
            if (properties.mateSession) { this.mateSession = tss_match_v2_mate_MatchSession.create(properties.mateSession) as any }
        }
	}
    @protobuf.Field.d(1, tss_match_v2_common_SessionType, "optional", tss_match_v2_common_SessionType.SessionTypeUnknown)
    public sessionType?: tss_match_v2_common_SessionType|null = tss_match_v2_common_SessionType.SessionTypeUnknown
    @protobuf.Field.d(2, "tss_match_v2_appbff_v1_UserSession", "optional")
    public session?: UserSession|null
    @protobuf.Field.d(3, "tss_match_v2_mate_MatchSession", "optional")
    public mateSession?: tss_match_v2_mate_MatchSession|null
}
export interface ICheckAndGetUserSessionV1Resp {
    matchSession?: IUserSession
    IsMatchSession?: boolean|null
    mateSession?: tss_match_v2_mate_IMatchSession
    IsMateSession?: boolean|null
    IsMateV2Session?: boolean|null
    mateV2Session?: tss_match_v2_commonmatetable_IMateSession
}
@protobuf.Type.d("tss_match_v2_appbff_v1_CheckAndGetUserSessionV1Resp")
export class CheckAndGetUserSessionV1Resp extends protobuf.Message<ICheckAndGetUserSessionV1Resp> {
    constructor(properties: Properties<ICheckAndGetUserSessionV1Resp>) {
        super(properties);
        if (properties) {
            if (properties.matchSession) { this.matchSession = UserSession.create(properties.matchSession) as any }
            if (properties.IsMatchSession) { this.IsMatchSession = properties.IsMatchSession }
            if (properties.mateSession) { this.mateSession = tss_match_v2_mate_MatchSession.create(properties.mateSession) as any }
            if (properties.IsMateSession) { this.IsMateSession = properties.IsMateSession }
            if (properties.IsMateV2Session) { this.IsMateV2Session = properties.IsMateV2Session }
            if (properties.mateV2Session) { this.mateV2Session = tss_match_v2_commonmatetable_MateSession.create(properties.mateV2Session) as any }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_appbff_v1_UserSession", "optional")
    public matchSession?: UserSession|null
    @protobuf.Field.d(2, "bool", "optional", false)
    public IsMatchSession?: boolean|null = false
    @protobuf.Field.d(3, "tss_match_v2_mate_MatchSession", "optional")
    public mateSession?: tss_match_v2_mate_MatchSession|null
    @protobuf.Field.d(4, "bool", "optional", false)
    public IsMateSession?: boolean|null = false
    @protobuf.Field.d(5, "bool", "optional", false)
    public IsMateV2Session?: boolean|null = false
    @protobuf.Field.d(6, "tss_match_v2_commonmatetable_MateSession", "optional")
    public mateV2Session?: tss_match_v2_commonmatetable_MateSession|null
}
export interface IBroadMatchInviteReq {
    preMatchKey?: string|null
    srvID?: number|null
}
@protobuf.Type.d("tss_match_v2_appbff_v1_BroadMatchInviteReq")
export class BroadMatchInviteReq extends protobuf.Message<IBroadMatchInviteReq> {
    constructor(properties: Properties<IBroadMatchInviteReq>) {
        super(properties);
        if (properties) {
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
            if (properties.srvID) { this.srvID = properties.srvID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public preMatchKey?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public srvID?: number|null = 0
}
export interface IBroadMatchInviteResp {
    code?: tss_match_v2_common_Code|null
    leftSec?: number|null
}
@protobuf.Type.d("tss_match_v2_appbff_v1_BroadMatchInviteResp")
export class BroadMatchInviteResp extends protobuf.Message<IBroadMatchInviteResp> {
    constructor(properties: Properties<IBroadMatchInviteResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.leftSec) { this.leftSec = properties.leftSec }
        }
	}
    @protobuf.Field.d(1, tss_match_v2_common_Code, "optional", tss_match_v2_common_Code.CodeOk)
    public code?: tss_match_v2_common_Code|null = tss_match_v2_common_Code.CodeOk
    @protobuf.Field.d(2, "int64", "optional", 0)
    public leftSec?: number|null = 0
}
export interface IMsgUserMatchInvite {
    preMatchKey?: string|null
    srvID?: number|null
    inviterUid?: number|null
    freeTimes?: number|null
    roomType?: tss_match_v2_common_LiveRoomType|null
}
@protobuf.Type.d("tss_match_v2_appbff_v1_MsgUserMatchInvite")
export class MsgUserMatchInvite extends protobuf.Message<IMsgUserMatchInvite> {
    constructor(properties: Properties<IMsgUserMatchInvite>) {
        super(properties);
        if (properties) {
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
            if (properties.srvID) { this.srvID = properties.srvID }
            if (properties.inviterUid) { this.inviterUid = properties.inviterUid }
            if (properties.freeTimes) { this.freeTimes = properties.freeTimes }
            if (properties.roomType) { this.roomType = properties.roomType }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public preMatchKey?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public srvID?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public inviterUid?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public freeTimes?: number|null = 0
    @protobuf.Field.d(5, tss_match_v2_common_LiveRoomType, "optional", tss_match_v2_common_LiveRoomType.LiveRoomTypeUnknown)
    public roomType?: tss_match_v2_common_LiveRoomType|null = tss_match_v2_common_LiveRoomType.LiveRoomTypeUnknown
}
export interface ICurrentTimeOfServer {
    curTime?: number|null
}
@protobuf.Type.d("tss_match_v2_appbff_v1_CurrentTimeOfServer")
export class CurrentTimeOfServer extends protobuf.Message<ICurrentTimeOfServer> {
    constructor(properties: Properties<ICurrentTimeOfServer>) {
        super(properties);
        if (properties) {
            if (properties.curTime) { this.curTime = properties.curTime }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public curTime?: number|null = 0
}
class $Appbff extends RpcService {
    async CheckAndGetUserSession(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:ICheckAndGetUserSessionResp}> {
        let data = base_Void.create(req)
        this.onBeforeReq("CheckAndGetUserSession", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("CheckAndGetUserSession", buffer, params)
        if (err) {
            this.onBeforeResp("CheckAndGetUserSession", err)
            return {err: err, resp: null}
        } else {
            let resp = CheckAndGetUserSessionResp.decode(pack) as any
            this.onBeforeResp("CheckAndGetUserSession", err, resp)
            return {err: null, resp: resp}
        }
    }
    async CheckAndGetUserSessionV1(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:ICheckAndGetUserSessionV1Resp}> {
        let data = base_Void.create(req)
        this.onBeforeReq("CheckAndGetUserSessionV1", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("CheckAndGetUserSessionV1", buffer, params)
        if (err) {
            this.onBeforeResp("CheckAndGetUserSessionV1", err)
            return {err: err, resp: null}
        } else {
            let resp = CheckAndGetUserSessionV1Resp.decode(pack) as any
            this.onBeforeResp("CheckAndGetUserSessionV1", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BroadMatchInvite(req: IBroadMatchInviteReq, params?: RpcParams) : Promise<{err:number, resp:IBroadMatchInviteResp}> {
        let data = BroadMatchInviteReq.create(req)
        this.onBeforeReq("BroadMatchInvite", data, params)
        const buffer = BroadMatchInviteReq.encode(data).finish()
        let [err, pack] = await this.call("BroadMatchInvite", buffer, params)
        if (err) {
            this.onBeforeResp("BroadMatchInvite", err)
            return {err: err, resp: null}
        } else {
            let resp = BroadMatchInviteResp.decode(pack) as any
            this.onBeforeResp("BroadMatchInvite", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetCurrentTimeOfServer(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:ICurrentTimeOfServer}> {
        let data = base_Void.create(req)
        this.onBeforeReq("GetCurrentTimeOfServer", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("GetCurrentTimeOfServer", buffer, params)
        if (err) {
            this.onBeforeResp("GetCurrentTimeOfServer", err)
            return {err: err, resp: null}
        } else {
            let resp = CurrentTimeOfServer.decode(pack) as any
            this.onBeforeResp("GetCurrentTimeOfServer", err, resp)
            return {err: null, resp: resp}
        }
    }
    async CmsUpdatePageHomeCfg(req: ICmsUpdatePageHomeCfgReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = CmsUpdatePageHomeCfgReq.create(req)
        this.onBeforeReq("CmsUpdatePageHomeCfg", data, params)
        const buffer = CmsUpdatePageHomeCfgReq.encode(data).finish()
        let [err, pack] = await this.call("CmsUpdatePageHomeCfg", buffer, params)
        if (err) {
            this.onBeforeResp("CmsUpdatePageHomeCfg", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("CmsUpdatePageHomeCfg", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetPageHomeCfg(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:IGetPageHomeCfgResp}> {
        let data = base_Void.create(req)
        this.onBeforeReq("GetPageHomeCfg", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("GetPageHomeCfg", buffer, params)
        if (err) {
            this.onBeforeResp("GetPageHomeCfg", err)
            return {err: err, resp: null}
        } else {
            let resp = GetPageHomeCfgResp.decode(pack) as any
            this.onBeforeResp("GetPageHomeCfg", err, resp)
            return {err: null, resp: resp}
        }
    }
    async CmsGetPageHomeCfg(req: ICmsGetPageHomeCfgReq, params?: RpcParams) : Promise<{err:number, resp:ICmsGetPageHomeCfgResp}> {
        let data = CmsGetPageHomeCfgReq.create(req)
        this.onBeforeReq("CmsGetPageHomeCfg", data, params)
        const buffer = CmsGetPageHomeCfgReq.encode(data).finish()
        let [err, pack] = await this.call("CmsGetPageHomeCfg", buffer, params)
        if (err) {
            this.onBeforeResp("CmsGetPageHomeCfg", err)
            return {err: err, resp: null}
        } else {
            let resp = CmsGetPageHomeCfgResp.decode(pack) as any
            this.onBeforeResp("CmsGetPageHomeCfg", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetPageHomeCfgForSync(req: base_IBatchGetResourceReq, params?: RpcParams) : Promise<{err:number, resp:base_IBatchGetResourceResp}> {
        let data = base_BatchGetResourceReq.create(req)
        this.onBeforeReq("BatchGetPageHomeCfgForSync", data, params)
        const buffer = base_BatchGetResourceReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetPageHomeCfgForSync", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetPageHomeCfgForSync", err)
            return {err: err, resp: null}
        } else {
            let resp = base_BatchGetResourceResp.decode(pack) as any
            this.onBeforeResp("BatchGetPageHomeCfgForSync", err, resp)
            return {err: null, resp: resp}
        }
    }
    NotifyMatchInvite(data: Uint8Array, params: RpcParams) : {msg: IMsgUserMatchInvite, eventID?: number} {
        let msg = MsgUserMatchInvite.decode(data)
        return {msg: msg}
    }
}
export const Appbff = new $Appbff({
    name: "tss.match.v2.appbff.v1",
})
import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  Void as base_Void,IVoid as base_IVoid ,  } from "idl/base/base"
import {  SessionType as tss_match_v2_common_SessionType ,  MatchType as tss_match_v2_common_MatchType ,  MatchStatus as tss_match_v2_common_MatchStatus ,  LiveRoomType as tss_match_v2_common_LiveRoomType ,  } from "idl/tss/match_v2/common/common"
import {  MateSession as tss_match_v2_commonmatetable_MateSession,IMateSession as tss_match_v2_commonmatetable_IMateSession ,  } from "idl/tss/match_v2/common/common_matetable"
import {  MatchSession as tss_match_v2_mate_MatchSession,IMatchSession as tss_match_v2_mate_IMatchSession ,  } from "idl/tss/match_v2/common_matematch"
export interface IUpdateMateSessionReq {
    uids?: number[]
    session?: tss_match_v2_mate_IMatchSession
}
@protobuf.Type.d("tss_match_v2_session_v1_UpdateMateSessionReq")
export class UpdateMateSessionReq extends protobuf.Message<IUpdateMateSessionReq> {
    constructor(properties: Properties<IUpdateMateSessionReq>) {
        super(properties);
        if (properties) {
            if (properties.uids) { this.uids = []; properties.uids.forEach((value, index)=>{this.uids[index] = properties.uids[index]})}
            if (properties.session) { this.session = tss_match_v2_mate_MatchSession.create(properties.session) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public uids?: number[] = []
    @protobuf.Field.d(2, "tss_match_v2_mate_MatchSession", "optional")
    public session?: tss_match_v2_mate_MatchSession|null
}
export interface IRemoveMateSessionReq {
    uids?: number[]
}
@protobuf.Type.d("tss_match_v2_session_v1_RemoveMateSessionReq")
export class RemoveMateSessionReq extends protobuf.Message<IRemoveMateSessionReq> {
    constructor(properties: Properties<IRemoveMateSessionReq>) {
        super(properties);
        if (properties) {
            if (properties.uids) { this.uids = []; properties.uids.forEach((value, index)=>{this.uids[index] = properties.uids[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public uids?: number[] = []
}
export interface IUpdateMateV2SessionReq {
    uids?: number[]
    session?: tss_match_v2_commonmatetable_IMateSession
}
@protobuf.Type.d("tss_match_v2_session_v1_UpdateMateV2SessionReq")
export class UpdateMateV2SessionReq extends protobuf.Message<IUpdateMateV2SessionReq> {
    constructor(properties: Properties<IUpdateMateV2SessionReq>) {
        super(properties);
        if (properties) {
            if (properties.uids) { this.uids = []; properties.uids.forEach((value, index)=>{this.uids[index] = properties.uids[index]})}
            if (properties.session) { this.session = tss_match_v2_commonmatetable_MateSession.create(properties.session) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public uids?: number[] = []
    @protobuf.Field.d(2, "tss_match_v2_commonmatetable_MateSession", "optional")
    public session?: tss_match_v2_commonmatetable_MateSession|null
}
export interface IRemoveMateV2SessionReq {
    uids?: number[]
}
@protobuf.Type.d("tss_match_v2_session_v1_RemoveMateV2SessionReq")
export class RemoveMateV2SessionReq extends protobuf.Message<IRemoveMateV2SessionReq> {
    constructor(properties: Properties<IRemoveMateV2SessionReq>) {
        super(properties);
        if (properties) {
            if (properties.uids) { this.uids = []; properties.uids.forEach((value, index)=>{this.uids[index] = properties.uids[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public uids?: number[] = []
}
export interface IGetMateSessionReq {
    uid?: number|null
}
@protobuf.Type.d("tss_match_v2_session_v1_GetMateSessionReq")
export class GetMateSessionReq extends protobuf.Message<IGetMateSessionReq> {
    constructor(properties: Properties<IGetMateSessionReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IGetMateSessionResp {
    session?: tss_match_v2_mate_IMatchSession
}
@protobuf.Type.d("tss_match_v2_session_v1_GetMateSessionResp")
export class GetMateSessionResp extends protobuf.Message<IGetMateSessionResp> {
    constructor(properties: Properties<IGetMateSessionResp>) {
        super(properties);
        if (properties) {
            if (properties.session) { this.session = tss_match_v2_mate_MatchSession.create(properties.session) as any }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_mate_MatchSession", "optional")
    public session?: tss_match_v2_mate_MatchSession|null
}
export interface IGetMateV2SessionReq {
    uid?: number|null
}
@protobuf.Type.d("tss_match_v2_session_v1_GetMateV2SessionReq")
export class GetMateV2SessionReq extends protobuf.Message<IGetMateV2SessionReq> {
    constructor(properties: Properties<IGetMateV2SessionReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IGetMateV2SessionResp {
    session?: tss_match_v2_commonmatetable_IMateSession
}
@protobuf.Type.d("tss_match_v2_session_v1_GetMateV2SessionResp")
export class GetMateV2SessionResp extends protobuf.Message<IGetMateV2SessionResp> {
    constructor(properties: Properties<IGetMateV2SessionResp>) {
        super(properties);
        if (properties) {
            if (properties.session) { this.session = tss_match_v2_commonmatetable_MateSession.create(properties.session) as any }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_commonmatetable_MateSession", "optional")
    public session?: tss_match_v2_commonmatetable_MateSession|null
}
export interface IGetMateAllSessionReq {
    uid?: number|null
}
@protobuf.Type.d("tss_match_v2_session_v1_GetMateAllSessionReq")
export class GetMateAllSessionReq extends protobuf.Message<IGetMateAllSessionReq> {
    constructor(properties: Properties<IGetMateAllSessionReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IGetMateAllSessionResp {
    session?: tss_match_v2_mate_IMatchSession
    sessionV2?: tss_match_v2_commonmatetable_IMateSession
    IsMateSession?: boolean|null
    IsMateV2Session?: boolean|null
}
@protobuf.Type.d("tss_match_v2_session_v1_GetMateAllSessionResp")
export class GetMateAllSessionResp extends protobuf.Message<IGetMateAllSessionResp> {
    constructor(properties: Properties<IGetMateAllSessionResp>) {
        super(properties);
        if (properties) {
            if (properties.session) { this.session = tss_match_v2_mate_MatchSession.create(properties.session) as any }
            if (properties.sessionV2) { this.sessionV2 = tss_match_v2_commonmatetable_MateSession.create(properties.sessionV2) as any }
            if (properties.IsMateSession) { this.IsMateSession = properties.IsMateSession }
            if (properties.IsMateV2Session) { this.IsMateV2Session = properties.IsMateV2Session }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_mate_MatchSession", "optional")
    public session?: tss_match_v2_mate_MatchSession|null
    @protobuf.Field.d(2, "tss_match_v2_commonmatetable_MateSession", "optional")
    public sessionV2?: tss_match_v2_commonmatetable_MateSession|null
    @protobuf.Field.d(3, "bool", "optional", false)
    public IsMateSession?: boolean|null = false
    @protobuf.Field.d(4, "bool", "optional", false)
    public IsMateV2Session?: boolean|null = false
}
export interface IBatchGetMateSessionReq {
    uid?: number[]
}
@protobuf.Type.d("tss_match_v2_session_v1_BatchGetMateSessionReq")
export class BatchGetMateSessionReq extends protobuf.Message<IBatchGetMateSessionReq> {
    constructor(properties: Properties<IBatchGetMateSessionReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = []; properties.uid.forEach((value, index)=>{this.uid[index] = properties.uid[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public uid?: number[] = []
}
export interface IMateUserSessions {
    uid?: number|null
    session?: tss_match_v2_mate_IMatchSession
}
@protobuf.Type.d("tss_match_v2_session_v1_MateUserSessions")
export class MateUserSessions extends protobuf.Message<IMateUserSessions> {
    constructor(properties: Properties<IMateUserSessions>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.session) { this.session = tss_match_v2_mate_MatchSession.create(properties.session) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "tss_match_v2_mate_MatchSession", "optional")
    public session?: tss_match_v2_mate_MatchSession|null
}
export interface IBatchGetMateV2SessionReq {
    uid?: number[]
}
@protobuf.Type.d("tss_match_v2_session_v1_BatchGetMateV2SessionReq")
export class BatchGetMateV2SessionReq extends protobuf.Message<IBatchGetMateV2SessionReq> {
    constructor(properties: Properties<IBatchGetMateV2SessionReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = []; properties.uid.forEach((value, index)=>{this.uid[index] = properties.uid[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public uid?: number[] = []
}
export interface IMateV2UserSessions {
    uid?: number|null
    session?: tss_match_v2_commonmatetable_IMateSession
}
@protobuf.Type.d("tss_match_v2_session_v1_MateV2UserSessions")
export class MateV2UserSessions extends protobuf.Message<IMateV2UserSessions> {
    constructor(properties: Properties<IMateV2UserSessions>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.session) { this.session = tss_match_v2_commonmatetable_MateSession.create(properties.session) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "tss_match_v2_commonmatetable_MateSession", "optional")
    public session?: tss_match_v2_commonmatetable_MateSession|null
}
export interface IBatchGetMateSessionResp {
    sessions?: IMateUserSessions[]
}
@protobuf.Type.d("tss_match_v2_session_v1_BatchGetMateSessionResp")
export class BatchGetMateSessionResp extends protobuf.Message<IBatchGetMateSessionResp> {
    constructor(properties: Properties<IBatchGetMateSessionResp>) {
        super(properties);
        if (properties) {
            if (properties.sessions) { this.sessions = []; properties.sessions.forEach((value, index)=>{this.sessions[index] = MateUserSessions.create(properties.sessions[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_session_v1_MateUserSessions", "repeated")
    public sessions?: MateUserSessions[] = []
}
export interface IBatchGetMateV2SessionResp {
    sessions?: IMateV2UserSessions[]
}
@protobuf.Type.d("tss_match_v2_session_v1_BatchGetMateV2SessionResp")
export class BatchGetMateV2SessionResp extends protobuf.Message<IBatchGetMateV2SessionResp> {
    constructor(properties: Properties<IBatchGetMateV2SessionResp>) {
        super(properties);
        if (properties) {
            if (properties.sessions) { this.sessions = []; properties.sessions.forEach((value, index)=>{this.sessions[index] = MateV2UserSessions.create(properties.sessions[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_session_v1_MateV2UserSessions", "repeated")
    public sessions?: MateV2UserSessions[] = []
}
export interface IUserSession {
    srvID?: number|null
    preMatchKey?: string|null
    matchKey?: string|null
    sessionType?: tss_match_v2_common_SessionType|null
    gameID?: string|null
    matchId?: number|null
    matchType?: tss_match_v2_common_MatchType|null
    matchStatus?: tss_match_v2_common_MatchStatus|null
    roomType?: tss_match_v2_common_LiveRoomType|null
}
@protobuf.Type.d("tss_match_v2_session_v1_UserSession")
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
            if (properties.matchStatus) { this.matchStatus = properties.matchStatus }
            if (properties.roomType) { this.roomType = properties.roomType }
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
    @protobuf.Field.d(9, tss_match_v2_common_MatchStatus, "optional", tss_match_v2_common_MatchStatus.MatchStatusUnknown)
    public matchStatus?: tss_match_v2_common_MatchStatus|null = tss_match_v2_common_MatchStatus.MatchStatusUnknown
    @protobuf.Field.d(10, tss_match_v2_common_LiveRoomType, "optional", tss_match_v2_common_LiveRoomType.LiveRoomTypeUnknown)
    public roomType?: tss_match_v2_common_LiveRoomType|null = tss_match_v2_common_LiveRoomType.LiveRoomTypeUnknown
}
export interface IUpdateUserSessionReq {
    session?: IUserSession
    uids?: number[]
}
@protobuf.Type.d("tss_match_v2_session_v1_UpdateUserSessionReq")
export class UpdateUserSessionReq extends protobuf.Message<IUpdateUserSessionReq> {
    constructor(properties: Properties<IUpdateUserSessionReq>) {
        super(properties);
        if (properties) {
            if (properties.session) { this.session = UserSession.create(properties.session) as any }
            if (properties.uids) { this.uids = []; properties.uids.forEach((value, index)=>{this.uids[index] = properties.uids[index]})}
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_session_v1_UserSession", "optional")
    public session?: UserSession|null
    @protobuf.Field.d(2, "int64", "repeated", [])
    public uids?: number[] = []
}
export interface IRemoveUserSessionReq {
    uids?: number[]
}
@protobuf.Type.d("tss_match_v2_session_v1_RemoveUserSessionReq")
export class RemoveUserSessionReq extends protobuf.Message<IRemoveUserSessionReq> {
    constructor(properties: Properties<IRemoveUserSessionReq>) {
        super(properties);
        if (properties) {
            if (properties.uids) { this.uids = []; properties.uids.forEach((value, index)=>{this.uids[index] = properties.uids[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public uids?: number[] = []
}
export interface IGetUserSessionResp {
    session?: IUserSession
}
@protobuf.Type.d("tss_match_v2_session_v1_GetUserSessionResp")
export class GetUserSessionResp extends protobuf.Message<IGetUserSessionResp> {
    constructor(properties: Properties<IGetUserSessionResp>) {
        super(properties);
        if (properties) {
            if (properties.session) { this.session = UserSession.create(properties.session) as any }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_session_v1_UserSession", "optional")
    public session?: UserSession|null
}
export interface IGetUserSessionReq {
    uid?: number|null
}
@protobuf.Type.d("tss_match_v2_session_v1_GetUserSessionReq")
export class GetUserSessionReq extends protobuf.Message<IGetUserSessionReq> {
    constructor(properties: Properties<IGetUserSessionReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IBatchGetMatchSessionReq {
    uid?: number[]
}
@protobuf.Type.d("tss_match_v2_session_v1_BatchGetMatchSessionReq")
export class BatchGetMatchSessionReq extends protobuf.Message<IBatchGetMatchSessionReq> {
    constructor(properties: Properties<IBatchGetMatchSessionReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = []; properties.uid.forEach((value, index)=>{this.uid[index] = properties.uid[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public uid?: number[] = []
}
export interface IMatchSessions {
    uid?: number|null
    session?: IUserSession
}
@protobuf.Type.d("tss_match_v2_session_v1_MatchSessions")
export class MatchSessions extends protobuf.Message<IMatchSessions> {
    constructor(properties: Properties<IMatchSessions>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.session) { this.session = UserSession.create(properties.session) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "tss_match_v2_session_v1_UserSession", "optional")
    public session?: UserSession|null
}
export interface IBatchGetMatchSessionResp {
    sessions?: IMatchSessions[]
}
@protobuf.Type.d("tss_match_v2_session_v1_BatchGetMatchSessionResp")
export class BatchGetMatchSessionResp extends protobuf.Message<IBatchGetMatchSessionResp> {
    constructor(properties: Properties<IBatchGetMatchSessionResp>) {
        super(properties);
        if (properties) {
            if (properties.sessions) { this.sessions = []; properties.sessions.forEach((value, index)=>{this.sessions[index] = MatchSessions.create(properties.sessions[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_session_v1_MatchSessions", "repeated")
    public sessions?: MatchSessions[] = []
}
export interface IMsgUserSession {
    IsOfficialSession?: boolean|null
    session?: IUserSession
    IsMateSession?: boolean|null
    mateSession?: tss_match_v2_mate_IMatchSession
    IsMateV2Session?: boolean|null
    mateV2Session?: tss_match_v2_commonmatetable_IMateSession
}
@protobuf.Type.d("tss_match_v2_session_v1_MsgUserSession")
export class MsgUserSession extends protobuf.Message<IMsgUserSession> {
    constructor(properties: Properties<IMsgUserSession>) {
        super(properties);
        if (properties) {
            if (properties.IsOfficialSession) { this.IsOfficialSession = properties.IsOfficialSession }
            if (properties.session) { this.session = UserSession.create(properties.session) as any }
            if (properties.IsMateSession) { this.IsMateSession = properties.IsMateSession }
            if (properties.mateSession) { this.mateSession = tss_match_v2_mate_MatchSession.create(properties.mateSession) as any }
            if (properties.IsMateV2Session) { this.IsMateV2Session = properties.IsMateV2Session }
            if (properties.mateV2Session) { this.mateV2Session = tss_match_v2_commonmatetable_MateSession.create(properties.mateV2Session) as any }
        }
	}
    @protobuf.Field.d(1, "bool", "optional", false)
    public IsOfficialSession?: boolean|null = false
    @protobuf.Field.d(2, "tss_match_v2_session_v1_UserSession", "optional")
    public session?: UserSession|null
    @protobuf.Field.d(3, "bool", "optional", false)
    public IsMateSession?: boolean|null = false
    @protobuf.Field.d(4, "tss_match_v2_mate_MatchSession", "optional")
    public mateSession?: tss_match_v2_mate_MatchSession|null
    @protobuf.Field.d(5, "bool", "optional", false)
    public IsMateV2Session?: boolean|null = false
    @protobuf.Field.d(6, "tss_match_v2_commonmatetable_MateSession", "optional")
    public mateV2Session?: tss_match_v2_commonmatetable_MateSession|null
}
export interface IBatchGetAllSessionReq {
    uid?: number[]
}
@protobuf.Type.d("tss_match_v2_session_v1_BatchGetAllSessionReq")
export class BatchGetAllSessionReq extends protobuf.Message<IBatchGetAllSessionReq> {
    constructor(properties: Properties<IBatchGetAllSessionReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = []; properties.uid.forEach((value, index)=>{this.uid[index] = properties.uid[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public uid?: number[] = []
}
export interface IUserSessionAll {
    uid?: number|null
    userSession?: IMsgUserSession
}
@protobuf.Type.d("tss_match_v2_session_v1_UserSessionAll")
export class UserSessionAll extends protobuf.Message<IUserSessionAll> {
    constructor(properties: Properties<IUserSessionAll>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.userSession) { this.userSession = MsgUserSession.create(properties.userSession) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "tss_match_v2_session_v1_MsgUserSession", "optional")
    public userSession?: MsgUserSession|null
}
export interface IBatchGetAllSessionResp {
    userSessionAll?: IUserSessionAll[]
}
@protobuf.Type.d("tss_match_v2_session_v1_BatchGetAllSessionResp")
export class BatchGetAllSessionResp extends protobuf.Message<IBatchGetAllSessionResp> {
    constructor(properties: Properties<IBatchGetAllSessionResp>) {
        super(properties);
        if (properties) {
            if (properties.userSessionAll) { this.userSessionAll = []; properties.userSessionAll.forEach((value, index)=>{this.userSessionAll[index] = UserSessionAll.create(properties.userSessionAll[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_session_v1_UserSessionAll", "repeated")
    public userSessionAll?: UserSessionAll[] = []
}
export interface IRemoveRegularSessionByKeyReq {
    uid?: number[]
    preMatchKey?: string|null
}
@protobuf.Type.d("tss_match_v2_session_v1_RemoveRegularSessionByKeyReq")
export class RemoveRegularSessionByKeyReq extends protobuf.Message<IRemoveRegularSessionByKeyReq> {
    constructor(properties: Properties<IRemoveRegularSessionByKeyReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = []; properties.uid.forEach((value, index)=>{this.uid[index] = properties.uid[index]})}
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public uid?: number[] = []
    @protobuf.Field.d(2, "string", "optional", )
    public preMatchKey?: string|null = ""
}
class $SessionService extends RpcService {
    async GetMateSession(req: IGetMateSessionReq, params?: RpcParams) : Promise<{err:number, resp:IGetMateSessionResp}> {
        let data = GetMateSessionReq.create(req)
        this.onBeforeReq("GetMateSession", data, params)
        const buffer = GetMateSessionReq.encode(data).finish()
        let [err, pack] = await this.call("GetMateSession", buffer, params)
        if (err) {
            this.onBeforeResp("GetMateSession", err)
            return {err: err, resp: null}
        } else {
            let resp = GetMateSessionResp.decode(pack) as any
            this.onBeforeResp("GetMateSession", err, resp)
            return {err: null, resp: resp}
        }
    }
    async UpdateMateSession(req: IUpdateMateSessionReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = UpdateMateSessionReq.create(req)
        this.onBeforeReq("UpdateMateSession", data, params)
        const buffer = UpdateMateSessionReq.encode(data).finish()
        let [err, pack] = await this.call("UpdateMateSession", buffer, params)
        if (err) {
            this.onBeforeResp("UpdateMateSession", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("UpdateMateSession", err, resp)
            return {err: null, resp: resp}
        }
    }
    async RemoveMateSession(req: IRemoveMateSessionReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = RemoveMateSessionReq.create(req)
        this.onBeforeReq("RemoveMateSession", data, params)
        const buffer = RemoveMateSessionReq.encode(data).finish()
        let [err, pack] = await this.call("RemoveMateSession", buffer, params)
        if (err) {
            this.onBeforeResp("RemoveMateSession", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("RemoveMateSession", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetMateV2Session(req: IGetMateV2SessionReq, params?: RpcParams) : Promise<{err:number, resp:IGetMateV2SessionResp}> {
        let data = GetMateV2SessionReq.create(req)
        this.onBeforeReq("GetMateV2Session", data, params)
        const buffer = GetMateV2SessionReq.encode(data).finish()
        let [err, pack] = await this.call("GetMateV2Session", buffer, params)
        if (err) {
            this.onBeforeResp("GetMateV2Session", err)
            return {err: err, resp: null}
        } else {
            let resp = GetMateV2SessionResp.decode(pack) as any
            this.onBeforeResp("GetMateV2Session", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetMateAllSession(req: IGetMateAllSessionReq, params?: RpcParams) : Promise<{err:number, resp:IGetMateAllSessionResp}> {
        let data = GetMateAllSessionReq.create(req)
        this.onBeforeReq("GetMateAllSession", data, params)
        const buffer = GetMateAllSessionReq.encode(data).finish()
        let [err, pack] = await this.call("GetMateAllSession", buffer, params)
        if (err) {
            this.onBeforeResp("GetMateAllSession", err)
            return {err: err, resp: null}
        } else {
            let resp = GetMateAllSessionResp.decode(pack) as any
            this.onBeforeResp("GetMateAllSession", err, resp)
            return {err: null, resp: resp}
        }
    }
    async UpdateMateV2Session(req: IUpdateMateV2SessionReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = UpdateMateV2SessionReq.create(req)
        this.onBeforeReq("UpdateMateV2Session", data, params)
        const buffer = UpdateMateV2SessionReq.encode(data).finish()
        let [err, pack] = await this.call("UpdateMateV2Session", buffer, params)
        if (err) {
            this.onBeforeResp("UpdateMateV2Session", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("UpdateMateV2Session", err, resp)
            return {err: null, resp: resp}
        }
    }
    async RemoveMateV2Session(req: IRemoveMateV2SessionReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = RemoveMateV2SessionReq.create(req)
        this.onBeforeReq("RemoveMateV2Session", data, params)
        const buffer = RemoveMateV2SessionReq.encode(data).finish()
        let [err, pack] = await this.call("RemoveMateV2Session", buffer, params)
        if (err) {
            this.onBeforeResp("RemoveMateV2Session", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("RemoveMateV2Session", err, resp)
            return {err: null, resp: resp}
        }
    }
    async UpdateUserSession(req: IUpdateUserSessionReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = UpdateUserSessionReq.create(req)
        this.onBeforeReq("UpdateUserSession", data, params)
        const buffer = UpdateUserSessionReq.encode(data).finish()
        let [err, pack] = await this.call("UpdateUserSession", buffer, params)
        if (err) {
            this.onBeforeResp("UpdateUserSession", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("UpdateUserSession", err, resp)
            return {err: null, resp: resp}
        }
    }
    async RemoveUserSession(req: IRemoveUserSessionReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = RemoveUserSessionReq.create(req)
        this.onBeforeReq("RemoveUserSession", data, params)
        const buffer = RemoveUserSessionReq.encode(data).finish()
        let [err, pack] = await this.call("RemoveUserSession", buffer, params)
        if (err) {
            this.onBeforeResp("RemoveUserSession", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("RemoveUserSession", err, resp)
            return {err: null, resp: resp}
        }
    }
    async RemoveRegularSessionByKey(req: IRemoveRegularSessionByKeyReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = RemoveRegularSessionByKeyReq.create(req)
        this.onBeforeReq("RemoveRegularSessionByKey", data, params)
        const buffer = RemoveRegularSessionByKeyReq.encode(data).finish()
        let [err, pack] = await this.call("RemoveRegularSessionByKey", buffer, params)
        if (err) {
            this.onBeforeResp("RemoveRegularSessionByKey", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("RemoveRegularSessionByKey", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetUserSession(req: IGetUserSessionReq, params?: RpcParams) : Promise<{err:number, resp:IGetUserSessionResp}> {
        let data = GetUserSessionReq.create(req)
        this.onBeforeReq("GetUserSession", data, params)
        const buffer = GetUserSessionReq.encode(data).finish()
        let [err, pack] = await this.call("GetUserSession", buffer, params)
        if (err) {
            this.onBeforeResp("GetUserSession", err)
            return {err: err, resp: null}
        } else {
            let resp = GetUserSessionResp.decode(pack) as any
            this.onBeforeResp("GetUserSession", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetMateSession(req: IBatchGetMateSessionReq, params?: RpcParams) : Promise<{err:number, resp:IBatchGetMateSessionResp}> {
        let data = BatchGetMateSessionReq.create(req)
        this.onBeforeReq("BatchGetMateSession", data, params)
        const buffer = BatchGetMateSessionReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetMateSession", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetMateSession", err)
            return {err: err, resp: null}
        } else {
            let resp = BatchGetMateSessionResp.decode(pack) as any
            this.onBeforeResp("BatchGetMateSession", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetMatchSession(req: IBatchGetMatchSessionReq, params?: RpcParams) : Promise<{err:number, resp:IBatchGetMatchSessionResp}> {
        let data = BatchGetMatchSessionReq.create(req)
        this.onBeforeReq("BatchGetMatchSession", data, params)
        const buffer = BatchGetMatchSessionReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetMatchSession", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetMatchSession", err)
            return {err: err, resp: null}
        } else {
            let resp = BatchGetMatchSessionResp.decode(pack) as any
            this.onBeforeResp("BatchGetMatchSession", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetMateV2Session(req: IBatchGetMateV2SessionReq, params?: RpcParams) : Promise<{err:number, resp:IBatchGetMateV2SessionResp}> {
        let data = BatchGetMateV2SessionReq.create(req)
        this.onBeforeReq("BatchGetMateV2Session", data, params)
        const buffer = BatchGetMateV2SessionReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetMateV2Session", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetMateV2Session", err)
            return {err: err, resp: null}
        } else {
            let resp = BatchGetMateV2SessionResp.decode(pack) as any
            this.onBeforeResp("BatchGetMateV2Session", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetAllSession(req: IBatchGetAllSessionReq, params?: RpcParams) : Promise<{err:number, resp:IBatchGetAllSessionResp}> {
        let data = BatchGetAllSessionReq.create(req)
        this.onBeforeReq("BatchGetAllSession", data, params)
        const buffer = BatchGetAllSessionReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetAllSession", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetAllSession", err)
            return {err: err, resp: null}
        } else {
            let resp = BatchGetAllSessionResp.decode(pack) as any
            this.onBeforeResp("BatchGetAllSession", err, resp)
            return {err: null, resp: resp}
        }
    }
    NotifyUserSession(data: Uint8Array, params: RpcParams) : {msg: IMsgUserSession, eventID?: number} {
        let msg = MsgUserSession.decode(data)
        return {msg: msg}
    }
}
export const SessionService = new $SessionService({
    name: "tss.match.v2.session.v1",
})
import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  Void as base_Void,IVoid as base_IVoid ,  BatchGetResourceReq as base_BatchGetResourceReq,IBatchGetResourceReq as base_IBatchGetResourceReq ,  BatchGetResourceResp as base_BatchGetResourceResp,IBatchGetResourceResp as base_IBatchGetResourceResp ,  } from "idl/base/base"
import {  AssetType as tss_common_AssetType ,  SwitchState as tss_common_SwitchState ,  } from "idl/tss/common/common_define"
import {  GamePlayOption as tss_game_config_GamePlayOption,IGamePlayOption as tss_game_config_IGamePlayOption ,  } from "idl/tss/game/config"
import {  HandleGameEndReq as tss_match_v2_common_HandleGameEndReq,IHandleGameEndReq as tss_match_v2_common_IHandleGameEndReq ,  HandleGameResultReq as tss_match_v2_common_HandleGameResultReq,IHandleGameResultReq as tss_match_v2_common_IHandleGameResultReq ,  MatchOverReason as tss_match_v2_common_MatchOverReason ,  WinningResult as tss_match_v2_common_WinningResult ,  } from "idl/tss/match_v2/common/common"
import {  HandlerTableOverReq as tss_match_v2_commonmatetable_HandlerTableOverReq,IHandlerTableOverReq as tss_match_v2_commonmatetable_IHandlerTableOverReq ,  HandlerTableAbortReq as tss_match_v2_commonmatetable_HandlerTableAbortReq,IHandlerTableAbortReq as tss_match_v2_commonmatetable_IHandlerTableAbortReq ,  } from "idl/tss/match_v2/common/common_matetable"
import {  LevelInfo as tss_match_v2_mate_LevelInfo,ILevelInfo as tss_match_v2_mate_ILevelInfo ,  Prop as tss_match_v2_mate_Prop,IProp as tss_match_v2_mate_IProp ,  Session as tss_match_v2_mate_Session,ISession as tss_match_v2_mate_ISession ,  DeskUser as tss_match_v2_mate_DeskUser,IDeskUser as tss_match_v2_mate_IDeskUser ,  Table as tss_match_v2_mate_Table,ITable as tss_match_v2_mate_ITable ,  User as tss_match_v2_mate_User,IUser as tss_match_v2_mate_IUser ,  RecyclingSource as tss_match_v2_mate_RecyclingSource ,  } from "idl/tss/match_v2/common_matematch"
export interface IStartMatchReq {
    matchKey?: string|null
    jobID?: string|null
}
@protobuf.Type.d("tss_match_v2_matematch_v1_StartMatchReq")
export class StartMatchReq extends protobuf.Message<IStartMatchReq> {
    constructor(properties: Properties<IStartMatchReq>) {
        super(properties);
        if (properties) {
            if (properties.matchKey) { this.matchKey = properties.matchKey }
            if (properties.jobID) { this.jobID = properties.jobID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public matchKey?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public jobID?: string|null = ""
}
export interface IGetOverReq {
    matchKey?: string|null
}
@protobuf.Type.d("tss_match_v2_matematch_v1_GetOverReq")
export class GetOverReq extends protobuf.Message<IGetOverReq> {
    constructor(properties: Properties<IGetOverReq>) {
        super(properties);
        if (properties) {
            if (properties.matchKey) { this.matchKey = properties.matchKey }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public matchKey?: string|null = ""
}
export interface IMsgMatchOver {
    matchKey?: string|null
    reason?: tss_match_v2_common_MatchOverReason|null
    highlightTable?: string|null
    uid?: number|null
    IncCup?: number|null
    totalCups?: number|null
    winStreakMungNum?: number|null
    winStreakNum?: number|null
    result?: tss_match_v2_common_WinningResult|null
    oldLevelInfo?: tss_match_v2_mate_ILevelInfo
    newLevelInfo?: tss_match_v2_mate_ILevelInfo
    isLevelUp?: boolean|null
    markupRate?: number|null
    winProp?: tss_match_v2_mate_IProp
    matchName?: string|null
    isWinStreakReward?: boolean|null
    sessionID?: string|null
    LoseLimit?: number|null
    PrevWinStreakNum?: number|null
}
@protobuf.Type.d("tss_match_v2_matematch_v1_MsgMatchOver")
export class MsgMatchOver extends protobuf.Message<IMsgMatchOver> {
    constructor(properties: Properties<IMsgMatchOver>) {
        super(properties);
        if (properties) {
            if (properties.matchKey) { this.matchKey = properties.matchKey }
            if (properties.reason) { this.reason = properties.reason }
            if (properties.highlightTable) { this.highlightTable = properties.highlightTable }
            if (properties.uid) { this.uid = properties.uid }
            if (properties.IncCup) { this.IncCup = properties.IncCup }
            if (properties.totalCups) { this.totalCups = properties.totalCups }
            if (properties.winStreakMungNum) { this.winStreakMungNum = properties.winStreakMungNum }
            if (properties.winStreakNum) { this.winStreakNum = properties.winStreakNum }
            if (properties.result) { this.result = properties.result }
            if (properties.oldLevelInfo) { this.oldLevelInfo = tss_match_v2_mate_LevelInfo.create(properties.oldLevelInfo) as any }
            if (properties.newLevelInfo) { this.newLevelInfo = tss_match_v2_mate_LevelInfo.create(properties.newLevelInfo) as any }
            if (properties.isLevelUp) { this.isLevelUp = properties.isLevelUp }
            if (properties.markupRate) { this.markupRate = properties.markupRate }
            if (properties.winProp) { this.winProp = tss_match_v2_mate_Prop.create(properties.winProp) as any }
            if (properties.matchName) { this.matchName = properties.matchName }
            if (properties.isWinStreakReward) { this.isWinStreakReward = properties.isWinStreakReward }
            if (properties.sessionID) { this.sessionID = properties.sessionID }
            if (properties.LoseLimit) { this.LoseLimit = properties.LoseLimit }
            if (properties.PrevWinStreakNum) { this.PrevWinStreakNum = properties.PrevWinStreakNum }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public matchKey?: string|null = ""
    @protobuf.Field.d(2, tss_match_v2_common_MatchOverReason, "optional", tss_match_v2_common_MatchOverReason.MatchOverReasonNormal)
    public reason?: tss_match_v2_common_MatchOverReason|null = tss_match_v2_common_MatchOverReason.MatchOverReasonNormal
    @protobuf.Field.d(3, "string", "optional", )
    public highlightTable?: string|null = ""
    @protobuf.Field.d(4, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(5, "int32", "optional", 0)
    public IncCup?: number|null = 0
    @protobuf.Field.d(6, "int32", "optional", 0)
    public totalCups?: number|null = 0
    @protobuf.Field.d(7, "int32", "optional", 0)
    public winStreakMungNum?: number|null = 0
    @protobuf.Field.d(8, "int32", "optional", 0)
    public winStreakNum?: number|null = 0
    @protobuf.Field.d(9, tss_match_v2_common_WinningResult, "optional", tss_match_v2_common_WinningResult.WinningResult_None)
    public result?: tss_match_v2_common_WinningResult|null = tss_match_v2_common_WinningResult.WinningResult_None
    @protobuf.Field.d(10, "tss_match_v2_mate_LevelInfo", "optional")
    public oldLevelInfo?: tss_match_v2_mate_LevelInfo|null
    @protobuf.Field.d(11, "tss_match_v2_mate_LevelInfo", "optional")
    public newLevelInfo?: tss_match_v2_mate_LevelInfo|null
    @protobuf.Field.d(12, "bool", "optional", false)
    public isLevelUp?: boolean|null = false
    @protobuf.Field.d(13, "int64", "optional", 0)
    public markupRate?: number|null = 0
    @protobuf.Field.d(14, "tss_match_v2_mate_Prop", "optional")
    public winProp?: tss_match_v2_mate_Prop|null
    @protobuf.Field.d(15, "string", "optional", )
    public matchName?: string|null = ""
    @protobuf.Field.d(16, "bool", "optional", false)
    public isWinStreakReward?: boolean|null = false
    @protobuf.Field.d(17, "string", "optional", )
    public sessionID?: string|null = ""
    @protobuf.Field.d(18, "int32", "optional", 0)
    public LoseLimit?: number|null = 0
    @protobuf.Field.d(19, "int32", "optional", 0)
    public PrevWinStreakNum?: number|null = 0
}
export interface IRemindSettleMailReq {
    matchKey?: string|null
    uid?: number|null
}
@protobuf.Type.d("tss_match_v2_matematch_v1_RemindSettleMailReq")
export class RemindSettleMailReq extends protobuf.Message<IRemindSettleMailReq> {
    constructor(properties: Properties<IRemindSettleMailReq>) {
        super(properties);
        if (properties) {
            if (properties.matchKey) { this.matchKey = properties.matchKey }
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public matchKey?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IGetOverResp {
    over?: IMsgMatchOver
}
@protobuf.Type.d("tss_match_v2_matematch_v1_GetOverResp")
export class GetOverResp extends protobuf.Message<IGetOverResp> {
    constructor(properties: Properties<IGetOverResp>) {
        super(properties);
        if (properties) {
            if (properties.over) { this.over = MsgMatchOver.create(properties.over) as any }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_matematch_v1_MsgMatchOver", "optional")
    public over?: MsgMatchOver|null
}
export interface IUpdateSessionReq {
    session?: tss_match_v2_mate_ISession
}
@protobuf.Type.d("tss_match_v2_matematch_v1_UpdateSessionReq")
export class UpdateSessionReq extends protobuf.Message<IUpdateSessionReq> {
    constructor(properties: Properties<IUpdateSessionReq>) {
        super(properties);
        if (properties) {
            if (properties.session) { this.session = tss_match_v2_mate_Session.create(properties.session) as any }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_mate_Session", "optional")
    public session?: tss_match_v2_mate_Session|null
}
export interface IUpdateSessionResp {
    code?: number|null
}
@protobuf.Type.d("tss_match_v2_matematch_v1_UpdateSessionResp")
export class UpdateSessionResp extends protobuf.Message<IUpdateSessionResp> {
    constructor(properties: Properties<IUpdateSessionResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
}
export interface IListSessionReq {
    gameID?: string|null
    applicationId?: string|null
    playWay?: number|null
}
@protobuf.Type.d("tss_match_v2_matematch_v1_ListSessionReq")
export class ListSessionReq extends protobuf.Message<IListSessionReq> {
    constructor(properties: Properties<IListSessionReq>) {
        super(properties);
        if (properties) {
            if (properties.gameID) { this.gameID = properties.gameID }
            if (properties.applicationId) { this.applicationId = properties.applicationId }
            if (properties.playWay) { this.playWay = properties.playWay }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public gameID?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public applicationId?: string|null = ""
    @protobuf.Field.d(3, "int32", "optional", 0)
    public playWay?: number|null = 0
}
export interface IListSessionResp {
    sessions?: tss_match_v2_mate_ISession[]
}
@protobuf.Type.d("tss_match_v2_matematch_v1_ListSessionResp")
export class ListSessionResp extends protobuf.Message<IListSessionResp> {
    constructor(properties: Properties<IListSessionResp>) {
        super(properties);
        if (properties) {
            if (properties.sessions) { this.sessions = []; properties.sessions.forEach((value, index)=>{this.sessions[index] = tss_match_v2_mate_Session.create(properties.sessions[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_mate_Session", "repeated")
    public sessions?: tss_match_v2_mate_Session[] = []
}
export interface IListOpenedSessionReq {
    gameID?: string|null
    playWay?: number|null
}
@protobuf.Type.d("tss_match_v2_matematch_v1_ListOpenedSessionReq")
export class ListOpenedSessionReq extends protobuf.Message<IListOpenedSessionReq> {
    constructor(properties: Properties<IListOpenedSessionReq>) {
        super(properties);
        if (properties) {
            if (properties.gameID) { this.gameID = properties.gameID }
            if (properties.playWay) { this.playWay = properties.playWay }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public gameID?: string|null = ""
    @protobuf.Field.d(2, "int32", "optional", 0)
    public playWay?: number|null = 0
}
export interface IListOpenedSessionResp {
    sessions?: tss_match_v2_mate_ISession[]
}
@protobuf.Type.d("tss_match_v2_matematch_v1_ListOpenedSessionResp")
export class ListOpenedSessionResp extends protobuf.Message<IListOpenedSessionResp> {
    constructor(properties: Properties<IListOpenedSessionResp>) {
        super(properties);
        if (properties) {
            if (properties.sessions) { this.sessions = []; properties.sessions.forEach((value, index)=>{this.sessions[index] = tss_match_v2_mate_Session.create(properties.sessions[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_mate_Session", "repeated")
    public sessions?: tss_match_v2_mate_Session[] = []
}
export interface IDeleteSessionReq {
    ID?: string|null
}
@protobuf.Type.d("tss_match_v2_matematch_v1_DeleteSessionReq")
export class DeleteSessionReq extends protobuf.Message<IDeleteSessionReq> {
    constructor(properties: Properties<IDeleteSessionReq>) {
        super(properties);
        if (properties) {
            if (properties.ID) { this.ID = properties.ID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public ID?: string|null = ""
}
export interface IUserJoinDeskReq {
    sessionID?: string|null
    unReady?: boolean|null
}
@protobuf.Type.d("tss_match_v2_matematch_v1_UserJoinDeskReq")
export class UserJoinDeskReq extends protobuf.Message<IUserJoinDeskReq> {
    constructor(properties: Properties<IUserJoinDeskReq>) {
        super(properties);
        if (properties) {
            if (properties.sessionID) { this.sessionID = properties.sessionID }
            if (properties.unReady) { this.unReady = properties.unReady }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public sessionID?: string|null = ""
    @protobuf.Field.d(2, "bool", "optional", false)
    public unReady?: boolean|null = false
}
export interface IJoinDeskMsg {
    user?: tss_match_v2_mate_IDeskUser
}
@protobuf.Type.d("tss_match_v2_matematch_v1_JoinDeskMsg")
export class JoinDeskMsg extends protobuf.Message<IJoinDeskMsg> {
    constructor(properties: Properties<IJoinDeskMsg>) {
        super(properties);
        if (properties) {
            if (properties.user) { this.user = tss_match_v2_mate_DeskUser.create(properties.user) as any }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_mate_DeskUser", "optional")
    public user?: tss_match_v2_mate_DeskUser|null
}
export interface IUserJoinLimit {
    type?: tss_common_AssetType|null
    propID?: number|null
    minNum?: number|null
    maxNum?: number|null
    maxAssetsNumSwitch?: tss_common_SwitchState|null
}
@protobuf.Type.d("tss_match_v2_matematch_v1_UserJoinLimit")
export class UserJoinLimit extends protobuf.Message<IUserJoinLimit> {
    constructor(properties: Properties<IUserJoinLimit>) {
        super(properties);
        if (properties) {
            if (properties.type) { this.type = properties.type }
            if (properties.propID) { this.propID = properties.propID }
            if (properties.minNum) { this.minNum = properties.minNum }
            if (properties.maxNum) { this.maxNum = properties.maxNum }
            if (properties.maxAssetsNumSwitch) { this.maxAssetsNumSwitch = properties.maxAssetsNumSwitch }
        }
	}
    @protobuf.Field.d(1, tss_common_AssetType, "optional", tss_common_AssetType.AssetTypeUnknown)
    public type?: tss_common_AssetType|null = tss_common_AssetType.AssetTypeUnknown
    @protobuf.Field.d(2, "int32", "optional", 0)
    public propID?: number|null = 0
    @protobuf.Field.d(3, "int32", "optional", 0)
    public minNum?: number|null = 0
    @protobuf.Field.d(4, "int32", "optional", 0)
    public maxNum?: number|null = 0
    @protobuf.Field.d(5, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public maxAssetsNumSwitch?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
}
export interface IUserJoinDeskResp {
    code?: number|null
    user?: tss_match_v2_mate_IDeskUser[]
    srvID?: number|null
    limit?: IUserJoinLimit
}
@protobuf.Type.d("tss_match_v2_matematch_v1_UserJoinDeskResp")
export class UserJoinDeskResp extends protobuf.Message<IUserJoinDeskResp> {
    constructor(properties: Properties<IUserJoinDeskResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.user) { this.user = []; properties.user.forEach((value, index)=>{this.user[index] = tss_match_v2_mate_DeskUser.create(properties.user[index]) as any})}
            if (properties.srvID) { this.srvID = properties.srvID }
            if (properties.limit) { this.limit = UserJoinLimit.create(properties.limit) as any }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
    @protobuf.Field.d(2, "tss_match_v2_mate_DeskUser", "repeated")
    public user?: tss_match_v2_mate_DeskUser[] = []
    @protobuf.Field.d(3, "int64", "optional", 0)
    public srvID?: number|null = 0
    @protobuf.Field.d(4, "tss_match_v2_matematch_v1_UserJoinLimit", "optional")
    public limit?: UserJoinLimit|null
}
export interface IReconnectInfo {
    matchSrvName?: string|null
    matchKey?: string|null
    table?: tss_match_v2_mate_ITable
    gameID?: string|null
    users?: tss_match_v2_mate_IUser[]
    chatID?: string|null
    matchName?: string|null
    ante?: number|null
    srvID?: number|null
    deskUsers?: tss_match_v2_mate_IDeskUser[]
}
@protobuf.Type.d("tss_match_v2_matematch_v1_ReconnectInfo")
export class ReconnectInfo extends protobuf.Message<IReconnectInfo> {
    constructor(properties: Properties<IReconnectInfo>) {
        super(properties);
        if (properties) {
            if (properties.matchSrvName) { this.matchSrvName = properties.matchSrvName }
            if (properties.matchKey) { this.matchKey = properties.matchKey }
            if (properties.table) { this.table = tss_match_v2_mate_Table.create(properties.table) as any }
            if (properties.gameID) { this.gameID = properties.gameID }
            if (properties.users) { this.users = []; properties.users.forEach((value, index)=>{this.users[index] = tss_match_v2_mate_User.create(properties.users[index]) as any})}
            if (properties.chatID) { this.chatID = properties.chatID }
            if (properties.matchName) { this.matchName = properties.matchName }
            if (properties.ante) { this.ante = properties.ante }
            if (properties.srvID) { this.srvID = properties.srvID }
            if (properties.deskUsers) { this.deskUsers = []; properties.deskUsers.forEach((value, index)=>{this.deskUsers[index] = tss_match_v2_mate_DeskUser.create(properties.deskUsers[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public matchSrvName?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public matchKey?: string|null = ""
    @protobuf.Field.d(3, "tss_match_v2_mate_Table", "optional")
    public table?: tss_match_v2_mate_Table|null
    @protobuf.Field.d(4, "string", "optional", )
    public gameID?: string|null = ""
    @protobuf.Field.d(5, "tss_match_v2_mate_User", "repeated")
    public users?: tss_match_v2_mate_User[] = []
    @protobuf.Field.d(6, "string", "optional", )
    public chatID?: string|null = ""
    @protobuf.Field.d(7, "string", "optional", )
    public matchName?: string|null = ""
    @protobuf.Field.d(9, "int32", "optional", 0)
    public ante?: number|null = 0
    @protobuf.Field.d(10, "int64", "optional", 0)
    public srvID?: number|null = 0
    @protobuf.Field.d(11, "tss_match_v2_mate_DeskUser", "repeated")
    public deskUsers?: tss_match_v2_mate_DeskUser[] = []
}
export interface IMsgMatchStart {
    ante?: number|null
    matchName?: string|null
    chatID?: string|null
    users?: tss_match_v2_mate_IUser[]
    gameID?: string|null
    matchKey?: string|null
}
@protobuf.Type.d("tss_match_v2_matematch_v1_MsgMatchStart")
export class MsgMatchStart extends protobuf.Message<IMsgMatchStart> {
    constructor(properties: Properties<IMsgMatchStart>) {
        super(properties);
        if (properties) {
            if (properties.ante) { this.ante = properties.ante }
            if (properties.matchName) { this.matchName = properties.matchName }
            if (properties.chatID) { this.chatID = properties.chatID }
            if (properties.users) { this.users = []; properties.users.forEach((value, index)=>{this.users[index] = tss_match_v2_mate_User.create(properties.users[index]) as any})}
            if (properties.gameID) { this.gameID = properties.gameID }
            if (properties.matchKey) { this.matchKey = properties.matchKey }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public ante?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public matchName?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public chatID?: string|null = ""
    @protobuf.Field.d(4, "tss_match_v2_mate_User", "repeated")
    public users?: tss_match_v2_mate_User[] = []
    @protobuf.Field.d(5, "string", "optional", )
    public gameID?: string|null = ""
    @protobuf.Field.d(6, "string", "optional", )
    public matchKey?: string|null = ""
}
export interface IMsgOneGameStart {
    table?: tss_match_v2_mate_ITable
}
@protobuf.Type.d("tss_match_v2_matematch_v1_MsgOneGameStart")
export class MsgOneGameStart extends protobuf.Message<IMsgOneGameStart> {
    constructor(properties: Properties<IMsgOneGameStart>) {
        super(properties);
        if (properties) {
            if (properties.table) { this.table = tss_match_v2_mate_Table.create(properties.table) as any }
        }
	}
    @protobuf.Field.d(3, "tss_match_v2_mate_Table", "optional")
    public table?: tss_match_v2_mate_Table|null
}
export interface IMsgOneGameResult {
    users?: tss_match_v2_mate_IUser[]
    over?: IMsgMatchOver
    tableGameData?: Uint8Array
}
@protobuf.Type.d("tss_match_v2_matematch_v1_MsgOneGameResult")
export class MsgOneGameResult extends protobuf.Message<IMsgOneGameResult> {
    constructor(properties: Properties<IMsgOneGameResult>) {
        super(properties);
        if (properties) {
            if (properties.users) { this.users = []; properties.users.forEach((value, index)=>{this.users[index] = tss_match_v2_mate_User.create(properties.users[index]) as any})}
            if (properties.over) { this.over = MsgMatchOver.create(properties.over) as any }
            if (properties.tableGameData) { this.tableGameData = properties.tableGameData }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_mate_User", "repeated")
    public users?: tss_match_v2_mate_User[] = []
    @protobuf.Field.d(2, "tss_match_v2_matematch_v1_MsgMatchOver", "optional")
    public over?: MsgMatchOver|null
    @protobuf.Field.d(3, "bytes", "optional", [])
    public tableGameData?: Uint8Array
}
export interface ILeaveReq {
    matchKey?: string|null
}
@protobuf.Type.d("tss_match_v2_matematch_v1_LeaveReq")
export class LeaveReq extends protobuf.Message<ILeaveReq> {
    constructor(properties: Properties<ILeaveReq>) {
        super(properties);
        if (properties) {
            if (properties.matchKey) { this.matchKey = properties.matchKey }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public matchKey?: string|null = ""
}
export interface IGetSessionReq {
    ID?: string|null
}
@protobuf.Type.d("tss_match_v2_matematch_v1_GetSessionReq")
export class GetSessionReq extends protobuf.Message<IGetSessionReq> {
    constructor(properties: Properties<IGetSessionReq>) {
        super(properties);
        if (properties) {
            if (properties.ID) { this.ID = properties.ID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public ID?: string|null = ""
}
export interface ISessionPriority {
    sessionID?: string|null
    priority?: number|null
}
@protobuf.Type.d("tss_match_v2_matematch_v1_SessionPriority")
export class SessionPriority extends protobuf.Message<ISessionPriority> {
    constructor(properties: Properties<ISessionPriority>) {
        super(properties);
        if (properties) {
            if (properties.sessionID) { this.sessionID = properties.sessionID }
            if (properties.priority) { this.priority = properties.priority }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public sessionID?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public priority?: number|null = 0
}
export interface IBatchUpdatePriorityReq {
    sessPriorities?: ISessionPriority[]
}
@protobuf.Type.d("tss_match_v2_matematch_v1_BatchUpdatePriorityReq")
export class BatchUpdatePriorityReq extends protobuf.Message<IBatchUpdatePriorityReq> {
    constructor(properties: Properties<IBatchUpdatePriorityReq>) {
        super(properties);
        if (properties) {
            if (properties.sessPriorities) { this.sessPriorities = []; properties.sessPriorities.forEach((value, index)=>{this.sessPriorities[index] = SessionPriority.create(properties.sessPriorities[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_matematch_v1_SessionPriority", "repeated")
    public sessPriorities?: SessionPriority[] = []
}
export interface IGetSessionResp {
    session?: tss_match_v2_mate_ISession
}
@protobuf.Type.d("tss_match_v2_matematch_v1_GetSessionResp")
export class GetSessionResp extends protobuf.Message<IGetSessionResp> {
    constructor(properties: Properties<IGetSessionResp>) {
        super(properties);
        if (properties) {
            if (properties.session) { this.session = tss_match_v2_mate_Session.create(properties.session) as any }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_mate_Session", "optional")
    public session?: tss_match_v2_mate_Session|null
}
export interface IMatchingReq {
    sessionID?: string|null
    jobID?: string|null
}
@protobuf.Type.d("tss_match_v2_matematch_v1_MatchingReq")
export class MatchingReq extends protobuf.Message<IMatchingReq> {
    constructor(properties: Properties<IMatchingReq>) {
        super(properties);
        if (properties) {
            if (properties.sessionID) { this.sessionID = properties.sessionID }
            if (properties.jobID) { this.jobID = properties.jobID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public sessionID?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public jobID?: string|null = ""
}
export interface IUserChangeDeskReq {
    sessionID?: string|null
    deskID?: number|null
}
@protobuf.Type.d("tss_match_v2_matematch_v1_UserChangeDeskReq")
export class UserChangeDeskReq extends protobuf.Message<IUserChangeDeskReq> {
    constructor(properties: Properties<IUserChangeDeskReq>) {
        super(properties);
        if (properties) {
            if (properties.sessionID) { this.sessionID = properties.sessionID }
            if (properties.deskID) { this.deskID = properties.deskID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public sessionID?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public deskID?: number|null = 0
}
export interface IUserChangeDeskResp {
    code?: number|null
    user?: tss_match_v2_mate_IDeskUser[]
    limit?: IUserJoinLimit
}
@protobuf.Type.d("tss_match_v2_matematch_v1_UserChangeDeskResp")
export class UserChangeDeskResp extends protobuf.Message<IUserChangeDeskResp> {
    constructor(properties: Properties<IUserChangeDeskResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.user) { this.user = []; properties.user.forEach((value, index)=>{this.user[index] = tss_match_v2_mate_DeskUser.create(properties.user[index]) as any})}
            if (properties.limit) { this.limit = UserJoinLimit.create(properties.limit) as any }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
    @protobuf.Field.d(2, "tss_match_v2_mate_DeskUser", "repeated")
    public user?: tss_match_v2_mate_DeskUser[] = []
    @protobuf.Field.d(3, "tss_match_v2_matematch_v1_UserJoinLimit", "optional")
    public limit?: UserJoinLimit|null
}
export interface IGetPreMatchDeskUserReq {
    sessionID?: string|null
    deskID?: number|null
}
@protobuf.Type.d("tss_match_v2_matematch_v1_GetPreMatchDeskUserReq")
export class GetPreMatchDeskUserReq extends protobuf.Message<IGetPreMatchDeskUserReq> {
    constructor(properties: Properties<IGetPreMatchDeskUserReq>) {
        super(properties);
        if (properties) {
            if (properties.sessionID) { this.sessionID = properties.sessionID }
            if (properties.deskID) { this.deskID = properties.deskID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public sessionID?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public deskID?: number|null = 0
}
export interface IGetPreMatchDeskUserResp {
    code?: number|null
    users?: tss_match_v2_mate_IDeskUser[]
}
@protobuf.Type.d("tss_match_v2_matematch_v1_GetPreMatchDeskUserResp")
export class GetPreMatchDeskUserResp extends protobuf.Message<IGetPreMatchDeskUserResp> {
    constructor(properties: Properties<IGetPreMatchDeskUserResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.users) { this.users = []; properties.users.forEach((value, index)=>{this.users[index] = tss_match_v2_mate_DeskUser.create(properties.users[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
    @protobuf.Field.d(2, "tss_match_v2_mate_DeskUser", "repeated")
    public users?: tss_match_v2_mate_DeskUser[] = []
}
export interface IUserLeaveDeskReq {
    sessionID?: string|null
    deskID?: number|null
}
@protobuf.Type.d("tss_match_v2_matematch_v1_UserLeaveDeskReq")
export class UserLeaveDeskReq extends protobuf.Message<IUserLeaveDeskReq> {
    constructor(properties: Properties<IUserLeaveDeskReq>) {
        super(properties);
        if (properties) {
            if (properties.sessionID) { this.sessionID = properties.sessionID }
            if (properties.deskID) { this.deskID = properties.deskID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public sessionID?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public deskID?: number|null = 0
}
export interface IUserLeaveDeskResp {
    code?: number|null
}
@protobuf.Type.d("tss_match_v2_matematch_v1_UserLeaveDeskResp")
export class UserLeaveDeskResp extends protobuf.Message<IUserLeaveDeskResp> {
    constructor(properties: Properties<IUserLeaveDeskResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
}
export interface IUserReadyReq {
    sessionID?: string|null
    deskID?: number|null
}
@protobuf.Type.d("tss_match_v2_matematch_v1_UserReadyReq")
export class UserReadyReq extends protobuf.Message<IUserReadyReq> {
    constructor(properties: Properties<IUserReadyReq>) {
        super(properties);
        if (properties) {
            if (properties.sessionID) { this.sessionID = properties.sessionID }
            if (properties.deskID) { this.deskID = properties.deskID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public sessionID?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public deskID?: number|null = 0
}
export interface IUserReadyResp {
    code?: number|null
}
@protobuf.Type.d("tss_match_v2_matematch_v1_UserReadyResp")
export class UserReadyResp extends protobuf.Message<IUserReadyResp> {
    constructor(properties: Properties<IUserReadyResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
}
export interface ILeaveDeskMsg {
    user?: tss_match_v2_mate_IDeskUser
}
@protobuf.Type.d("tss_match_v2_matematch_v1_LeaveDeskMsg")
export class LeaveDeskMsg extends protobuf.Message<ILeaveDeskMsg> {
    constructor(properties: Properties<ILeaveDeskMsg>) {
        super(properties);
        if (properties) {
            if (properties.user) { this.user = tss_match_v2_mate_DeskUser.create(properties.user) as any }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_mate_DeskUser", "optional")
    public user?: tss_match_v2_mate_DeskUser|null
}
export interface IReadyMsg {
    user?: tss_match_v2_mate_IDeskUser
}
@protobuf.Type.d("tss_match_v2_matematch_v1_ReadyMsg")
export class ReadyMsg extends protobuf.Message<IReadyMsg> {
    constructor(properties: Properties<IReadyMsg>) {
        super(properties);
        if (properties) {
            if (properties.user) { this.user = tss_match_v2_mate_DeskUser.create(properties.user) as any }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_mate_DeskUser", "optional")
    public user?: tss_match_v2_mate_DeskUser|null
}
export interface IStreakWinItem {
    streakWinCount?: number|null
    mungReward?: number|null
}
@protobuf.Type.d("tss_match_v2_matematch_v1_StreakWinItem")
export class StreakWinItem extends protobuf.Message<IStreakWinItem> {
    constructor(properties: Properties<IStreakWinItem>) {
        super(properties);
        if (properties) {
            if (properties.streakWinCount) { this.streakWinCount = properties.streakWinCount }
            if (properties.mungReward) { this.mungReward = properties.mungReward }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public streakWinCount?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public mungReward?: number|null = 0
}
export interface IStreakWinConf {
    gameID?: string|null
    isOpen?: boolean|null
    items?: IStreakWinItem[]
}
@protobuf.Type.d("tss_match_v2_matematch_v1_StreakWinConf")
export class StreakWinConf extends protobuf.Message<IStreakWinConf> {
    constructor(properties: Properties<IStreakWinConf>) {
        super(properties);
        if (properties) {
            if (properties.gameID) { this.gameID = properties.gameID }
            if (properties.isOpen) { this.isOpen = properties.isOpen }
            if (properties.items) { this.items = []; properties.items.forEach((value, index)=>{this.items[index] = StreakWinItem.create(properties.items[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public gameID?: string|null = ""
    @protobuf.Field.d(2, "bool", "optional", false)
    public isOpen?: boolean|null = false
    @protobuf.Field.d(3, "tss_match_v2_matematch_v1_StreakWinItem", "repeated")
    public items?: StreakWinItem[] = []
}
export interface IUpsertStreakWinConfReq {
    conf?: IStreakWinConf
}
@protobuf.Type.d("tss_match_v2_matematch_v1_UpsertStreakWinConfReq")
export class UpsertStreakWinConfReq extends protobuf.Message<IUpsertStreakWinConfReq> {
    constructor(properties: Properties<IUpsertStreakWinConfReq>) {
        super(properties);
        if (properties) {
            if (properties.conf) { this.conf = StreakWinConf.create(properties.conf) as any }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_matematch_v1_StreakWinConf", "optional")
    public conf?: StreakWinConf|null
}
export interface IGetStreakWinConfReq {
    gameID?: string|null
}
@protobuf.Type.d("tss_match_v2_matematch_v1_GetStreakWinConfReq")
export class GetStreakWinConfReq extends protobuf.Message<IGetStreakWinConfReq> {
    constructor(properties: Properties<IGetStreakWinConfReq>) {
        super(properties);
        if (properties) {
            if (properties.gameID) { this.gameID = properties.gameID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public gameID?: string|null = ""
}
export interface IGetStreakWinConfResp {
    conf?: IStreakWinConf
}
@protobuf.Type.d("tss_match_v2_matematch_v1_GetStreakWinConfResp")
export class GetStreakWinConfResp extends protobuf.Message<IGetStreakWinConfResp> {
    constructor(properties: Properties<IGetStreakWinConfResp>) {
        super(properties);
        if (properties) {
            if (properties.conf) { this.conf = StreakWinConf.create(properties.conf) as any }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_matematch_v1_StreakWinConf", "optional")
    public conf?: StreakWinConf|null
}
export interface IGetReconnectInfoReq {
    matchKey?: string|null
    isOnlyInfo?: boolean|null
}
@protobuf.Type.d("tss_match_v2_matematch_v1_GetReconnectInfoReq")
export class GetReconnectInfoReq extends protobuf.Message<IGetReconnectInfoReq> {
    constructor(properties: Properties<IGetReconnectInfoReq>) {
        super(properties);
        if (properties) {
            if (properties.matchKey) { this.matchKey = properties.matchKey }
            if (properties.isOnlyInfo) { this.isOnlyInfo = properties.isOnlyInfo }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public matchKey?: string|null = ""
    @protobuf.Field.d(2, "bool", "optional", false)
    public isOnlyInfo?: boolean|null = false
}
export interface IGetReconnectInfoResp {
    code?: number|null
    info?: IReconnectInfo
}
@protobuf.Type.d("tss_match_v2_matematch_v1_GetReconnectInfoResp")
export class GetReconnectInfoResp extends protobuf.Message<IGetReconnectInfoResp> {
    constructor(properties: Properties<IGetReconnectInfoResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.info) { this.info = ReconnectInfo.create(properties.info) as any }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
    @protobuf.Field.d(2, "tss_match_v2_matematch_v1_ReconnectInfo", "optional")
    public info?: ReconnectInfo|null
}
export interface IGetGamePlayOptionReq {
    gameID?: string|null
}
@protobuf.Type.d("tss_match_v2_matematch_v1_GetGamePlayOptionReq")
export class GetGamePlayOptionReq extends protobuf.Message<IGetGamePlayOptionReq> {
    constructor(properties: Properties<IGetGamePlayOptionReq>) {
        super(properties);
        if (properties) {
            if (properties.gameID) { this.gameID = properties.gameID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public gameID?: string|null = ""
}
export interface IGetGamePlayOptionResp {
    code?: number|null
    options?: tss_game_config_IGamePlayOption[]
}
@protobuf.Type.d("tss_match_v2_matematch_v1_GetGamePlayOptionResp")
export class GetGamePlayOptionResp extends protobuf.Message<IGetGamePlayOptionResp> {
    constructor(properties: Properties<IGetGamePlayOptionResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.options) { this.options = []; properties.options.forEach((value, index)=>{this.options[index] = tss_game_config_GamePlayOption.create(properties.options[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
    @protobuf.Field.d(2, "tss_game_config_GamePlayOption", "repeated")
    public options?: tss_game_config_GamePlayOption[] = []
}
export interface IRookieCardGroupItem {
    num?: number|null
    prob?: number|null
}
@protobuf.Type.d("tss_match_v2_matematch_v1_RookieCardGroupItem")
export class RookieCardGroupItem extends protobuf.Message<IRookieCardGroupItem> {
    constructor(properties: Properties<IRookieCardGroupItem>) {
        super(properties);
        if (properties) {
            if (properties.num) { this.num = properties.num }
            if (properties.prob) { this.prob = properties.prob }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public num?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public prob?: number|null = 0
}
export interface IRookieCardSetItem {
    id?: string|null
    pr?: number|null
    groupItem?: IRookieCardGroupItem[]
}
@protobuf.Type.d("tss_match_v2_matematch_v1_RookieCardSetItem")
export class RookieCardSetItem extends protobuf.Message<IRookieCardSetItem> {
    constructor(properties: Properties<IRookieCardSetItem>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.pr) { this.pr = properties.pr }
            if (properties.groupItem) { this.groupItem = []; properties.groupItem.forEach((value, index)=>{this.groupItem[index] = RookieCardGroupItem.create(properties.groupItem[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public id?: string|null = ""
    @protobuf.Field.d(2, "int32", "optional", 0)
    public pr?: number|null = 0
    @protobuf.Field.d(3, "tss_match_v2_matematch_v1_RookieCardGroupItem", "repeated")
    public groupItem?: RookieCardGroupItem[] = []
}
export interface IDealCardsStrategy {
    start?: number|null
    end?: number|null
    item?: IRookieCardSetItem[]
}
@protobuf.Type.d("tss_match_v2_matematch_v1_DealCardsStrategy")
export class DealCardsStrategy extends protobuf.Message<IDealCardsStrategy> {
    constructor(properties: Properties<IDealCardsStrategy>) {
        super(properties);
        if (properties) {
            if (properties.start) { this.start = properties.start }
            if (properties.end) { this.end = properties.end }
            if (properties.item) { this.item = []; properties.item.forEach((value, index)=>{this.item[index] = RookieCardSetItem.create(properties.item[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public start?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public end?: number|null = 0
    @protobuf.Field.d(3, "tss_match_v2_matematch_v1_RookieCardSetItem", "repeated")
    public item?: RookieCardSetItem[] = []
}
export interface IRecyclingMatchReq {
    matchKey?: string|null
    recyclingSource?: tss_match_v2_mate_RecyclingSource|null
    jobId?: string|null
}
@protobuf.Type.d("tss_match_v2_matematch_v1_RecyclingMatchReq")
export class RecyclingMatchReq extends protobuf.Message<IRecyclingMatchReq> {
    constructor(properties: Properties<IRecyclingMatchReq>) {
        super(properties);
        if (properties) {
            if (properties.matchKey) { this.matchKey = properties.matchKey }
            if (properties.recyclingSource) { this.recyclingSource = properties.recyclingSource }
            if (properties.jobId) { this.jobId = properties.jobId }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public matchKey?: string|null = ""
    @protobuf.Field.d(2, tss_match_v2_mate_RecyclingSource, "optional", tss_match_v2_mate_RecyclingSource.RecyclingSourceUnknown)
    public recyclingSource?: tss_match_v2_mate_RecyclingSource|null = tss_match_v2_mate_RecyclingSource.RecyclingSourceUnknown
    @protobuf.Field.d(3, "string", "optional", )
    public jobId?: string|null = ""
}
class $Matematch extends RpcService {
    async Ping(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = base_Void.create(req)
        this.onBeforeReq("Ping", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("Ping", buffer, params)
        if (err) {
            this.onBeforeResp("Ping", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("Ping", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetOver(req: IGetOverReq, params?: RpcParams) : Promise<{err:number, resp:IGetOverResp}> {
        let data = GetOverReq.create(req)
        this.onBeforeReq("GetOver", data, params)
        const buffer = GetOverReq.encode(data).finish()
        let [err, pack] = await this.call("GetOver", buffer, params)
        if (err) {
            this.onBeforeResp("GetOver", err)
            return {err: err, resp: null}
        } else {
            let resp = GetOverResp.decode(pack) as any
            this.onBeforeResp("GetOver", err, resp)
            return {err: null, resp: resp}
        }
    }
    async Leave(req: ILeaveReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = LeaveReq.create(req)
        this.onBeforeReq("Leave", data, params)
        const buffer = LeaveReq.encode(data).finish()
        let [err, pack] = await this.call("Leave", buffer, params)
        if (err) {
            this.onBeforeResp("Leave", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("Leave", err, resp)
            return {err: null, resp: resp}
        }
    }
    async UserJoinDesk(req: IUserJoinDeskReq, params?: RpcParams) : Promise<{err:number, resp:IUserJoinDeskResp}> {
        let data = UserJoinDeskReq.create(req)
        this.onBeforeReq("UserJoinDesk", data, params)
        const buffer = UserJoinDeskReq.encode(data).finish()
        let [err, pack] = await this.call("UserJoinDesk", buffer, params)
        if (err) {
            this.onBeforeResp("UserJoinDesk", err)
            return {err: err, resp: null}
        } else {
            let resp = UserJoinDeskResp.decode(pack) as any
            this.onBeforeResp("UserJoinDesk", err, resp)
            return {err: null, resp: resp}
        }
    }
    async UserLeaveDesk(req: IUserLeaveDeskReq, params?: RpcParams) : Promise<{err:number, resp:IUserLeaveDeskResp}> {
        let data = UserLeaveDeskReq.create(req)
        this.onBeforeReq("UserLeaveDesk", data, params)
        const buffer = UserLeaveDeskReq.encode(data).finish()
        let [err, pack] = await this.call("UserLeaveDesk", buffer, params)
        if (err) {
            this.onBeforeResp("UserLeaveDesk", err)
            return {err: err, resp: null}
        } else {
            let resp = UserLeaveDeskResp.decode(pack) as any
            this.onBeforeResp("UserLeaveDesk", err, resp)
            return {err: null, resp: resp}
        }
    }
    async UserChangeDesk(req: IUserChangeDeskReq, params?: RpcParams) : Promise<{err:number, resp:IUserChangeDeskResp}> {
        let data = UserChangeDeskReq.create(req)
        this.onBeforeReq("UserChangeDesk", data, params)
        const buffer = UserChangeDeskReq.encode(data).finish()
        let [err, pack] = await this.call("UserChangeDesk", buffer, params)
        if (err) {
            this.onBeforeResp("UserChangeDesk", err)
            return {err: err, resp: null}
        } else {
            let resp = UserChangeDeskResp.decode(pack) as any
            this.onBeforeResp("UserChangeDesk", err, resp)
            return {err: null, resp: resp}
        }
    }
    async UserReady(req: IUserReadyReq, params?: RpcParams) : Promise<{err:number, resp:IUserReadyResp}> {
        let data = UserReadyReq.create(req)
        this.onBeforeReq("UserReady", data, params)
        const buffer = UserReadyReq.encode(data).finish()
        let [err, pack] = await this.call("UserReady", buffer, params)
        if (err) {
            this.onBeforeResp("UserReady", err)
            return {err: err, resp: null}
        } else {
            let resp = UserReadyResp.decode(pack) as any
            this.onBeforeResp("UserReady", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListOpenedSession(req: IListOpenedSessionReq, params?: RpcParams) : Promise<{err:number, resp:IListOpenedSessionResp}> {
        let data = ListOpenedSessionReq.create(req)
        this.onBeforeReq("ListOpenedSession", data, params)
        const buffer = ListOpenedSessionReq.encode(data).finish()
        let [err, pack] = await this.call("ListOpenedSession", buffer, params)
        if (err) {
            this.onBeforeResp("ListOpenedSession", err)
            return {err: err, resp: null}
        } else {
            let resp = ListOpenedSessionResp.decode(pack) as any
            this.onBeforeResp("ListOpenedSession", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetStreakWinConf(req: IGetStreakWinConfReq, params?: RpcParams) : Promise<{err:number, resp:IGetStreakWinConfResp}> {
        let data = GetStreakWinConfReq.create(req)
        this.onBeforeReq("GetStreakWinConf", data, params)
        const buffer = GetStreakWinConfReq.encode(data).finish()
        let [err, pack] = await this.call("GetStreakWinConf", buffer, params)
        if (err) {
            this.onBeforeResp("GetStreakWinConf", err)
            return {err: err, resp: null}
        } else {
            let resp = GetStreakWinConfResp.decode(pack) as any
            this.onBeforeResp("GetStreakWinConf", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetReconnectInfo(req: IGetReconnectInfoReq, params?: RpcParams) : Promise<{err:number, resp:IGetReconnectInfoResp}> {
        let data = GetReconnectInfoReq.create(req)
        this.onBeforeReq("GetReconnectInfo", data, params)
        const buffer = GetReconnectInfoReq.encode(data).finish()
        let [err, pack] = await this.call("GetReconnectInfo", buffer, params)
        if (err) {
            this.onBeforeResp("GetReconnectInfo", err)
            return {err: err, resp: null}
        } else {
            let resp = GetReconnectInfoResp.decode(pack) as any
            this.onBeforeResp("GetReconnectInfo", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetGamePlayOption(req: IGetGamePlayOptionReq, params?: RpcParams) : Promise<{err:number, resp:IGetGamePlayOptionResp}> {
        let data = GetGamePlayOptionReq.create(req)
        this.onBeforeReq("GetGamePlayOption", data, params)
        const buffer = GetGamePlayOptionReq.encode(data).finish()
        let [err, pack] = await this.call("GetGamePlayOption", buffer, params)
        if (err) {
            this.onBeforeResp("GetGamePlayOption", err)
            return {err: err, resp: null}
        } else {
            let resp = GetGamePlayOptionResp.decode(pack) as any
            this.onBeforeResp("GetGamePlayOption", err, resp)
            return {err: null, resp: resp}
        }
    }
    async UpsertStreakWinConf(req: IUpsertStreakWinConfReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = UpsertStreakWinConfReq.create(req)
        this.onBeforeReq("UpsertStreakWinConf", data, params)
        const buffer = UpsertStreakWinConfReq.encode(data).finish()
        let [err, pack] = await this.call("UpsertStreakWinConf", buffer, params)
        if (err) {
            this.onBeforeResp("UpsertStreakWinConf", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("UpsertStreakWinConf", err, resp)
            return {err: null, resp: resp}
        }
    }
    async UpdateSession(req: IUpdateSessionReq, params?: RpcParams) : Promise<{err:number, resp:IUpdateSessionResp}> {
        let data = UpdateSessionReq.create(req)
        this.onBeforeReq("UpdateSession", data, params)
        const buffer = UpdateSessionReq.encode(data).finish()
        let [err, pack] = await this.call("UpdateSession", buffer, params)
        if (err) {
            this.onBeforeResp("UpdateSession", err)
            return {err: err, resp: null}
        } else {
            let resp = UpdateSessionResp.decode(pack) as any
            this.onBeforeResp("UpdateSession", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DeleteSession(req: IDeleteSessionReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = DeleteSessionReq.create(req)
        this.onBeforeReq("DeleteSession", data, params)
        const buffer = DeleteSessionReq.encode(data).finish()
        let [err, pack] = await this.call("DeleteSession", buffer, params)
        if (err) {
            this.onBeforeResp("DeleteSession", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("DeleteSession", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListSession(req: IListSessionReq, params?: RpcParams) : Promise<{err:number, resp:IListSessionResp}> {
        let data = ListSessionReq.create(req)
        this.onBeforeReq("ListSession", data, params)
        const buffer = ListSessionReq.encode(data).finish()
        let [err, pack] = await this.call("ListSession", buffer, params)
        if (err) {
            this.onBeforeResp("ListSession", err)
            return {err: err, resp: null}
        } else {
            let resp = ListSessionResp.decode(pack) as any
            this.onBeforeResp("ListSession", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetSession(req: IGetSessionReq, params?: RpcParams) : Promise<{err:number, resp:IGetSessionResp}> {
        let data = GetSessionReq.create(req)
        this.onBeforeReq("GetSession", data, params)
        const buffer = GetSessionReq.encode(data).finish()
        let [err, pack] = await this.call("GetSession", buffer, params)
        if (err) {
            this.onBeforeResp("GetSession", err)
            return {err: err, resp: null}
        } else {
            let resp = GetSessionResp.decode(pack) as any
            this.onBeforeResp("GetSession", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchUpdatePriority(req: IBatchUpdatePriorityReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = BatchUpdatePriorityReq.create(req)
        this.onBeforeReq("BatchUpdatePriority", data, params)
        const buffer = BatchUpdatePriorityReq.encode(data).finish()
        let [err, pack] = await this.call("BatchUpdatePriority", buffer, params)
        if (err) {
            this.onBeforeResp("BatchUpdatePriority", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("BatchUpdatePriority", err, resp)
            return {err: null, resp: resp}
        }
    }
    async AbortMatch(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = base_Void.create(req)
        this.onBeforeReq("AbortMatch", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("AbortMatch", buffer, params)
        if (err) {
            this.onBeforeResp("AbortMatch", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("AbortMatch", err, resp)
            return {err: null, resp: resp}
        }
    }
    async RecyclingMatch(req: IRecyclingMatchReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = RecyclingMatchReq.create(req)
        this.onBeforeReq("RecyclingMatch", data, params)
        const buffer = RecyclingMatchReq.encode(data).finish()
        let [err, pack] = await this.call("RecyclingMatch", buffer, params)
        if (err) {
            this.onBeforeResp("RecyclingMatch", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("RecyclingMatch", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GameEnd(req: tss_match_v2_common_IHandleGameEndReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = tss_match_v2_common_HandleGameEndReq.create(req)
        this.onBeforeReq("GameEnd", data, params)
        const buffer = tss_match_v2_common_HandleGameEndReq.encode(data).finish()
        let [err, pack] = await this.call("GameEnd", buffer, params)
        if (err) {
            this.onBeforeResp("GameEnd", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("GameEnd", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GameResult(req: tss_match_v2_common_IHandleGameResultReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = tss_match_v2_common_HandleGameResultReq.create(req)
        this.onBeforeReq("GameResult", data, params)
        const buffer = tss_match_v2_common_HandleGameResultReq.encode(data).finish()
        let [err, pack] = await this.call("GameResult", buffer, params)
        if (err) {
            this.onBeforeResp("GameResult", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("GameResult", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetPreMatchDeskUser(req: IGetPreMatchDeskUserReq, params?: RpcParams) : Promise<{err:number, resp:IGetPreMatchDeskUserResp}> {
        let data = GetPreMatchDeskUserReq.create(req)
        this.onBeforeReq("GetPreMatchDeskUser", data, params)
        const buffer = GetPreMatchDeskUserReq.encode(data).finish()
        let [err, pack] = await this.call("GetPreMatchDeskUser", buffer, params)
        if (err) {
            this.onBeforeResp("GetPreMatchDeskUser", err)
            return {err: err, resp: null}
        } else {
            let resp = GetPreMatchDeskUserResp.decode(pack) as any
            this.onBeforeResp("GetPreMatchDeskUser", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GameEndV2(req: tss_match_v2_commonmatetable_IHandlerTableOverReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = tss_match_v2_commonmatetable_HandlerTableOverReq.create(req)
        this.onBeforeReq("GameEndV2", data, params)
        const buffer = tss_match_v2_commonmatetable_HandlerTableOverReq.encode(data).finish()
        let [err, pack] = await this.call("GameEndV2", buffer, params)
        if (err) {
            this.onBeforeResp("GameEndV2", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("GameEndV2", err, resp)
            return {err: null, resp: resp}
        }
    }
    async AbortDesk(req: tss_match_v2_commonmatetable_IHandlerTableAbortReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = tss_match_v2_commonmatetable_HandlerTableAbortReq.create(req)
        this.onBeforeReq("AbortDesk", data, params)
        const buffer = tss_match_v2_commonmatetable_HandlerTableAbortReq.encode(data).finish()
        let [err, pack] = await this.call("AbortDesk", buffer, params)
        if (err) {
            this.onBeforeResp("AbortDesk", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("AbortDesk", err, resp)
            return {err: null, resp: resp}
        }
    }
    async StartMatch(req: IStartMatchReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = StartMatchReq.create(req)
        this.onBeforeReq("StartMatch", data, params)
        const buffer = StartMatchReq.encode(data).finish()
        let [err, pack] = await this.call("StartMatch", buffer, params)
        if (err) {
            this.onBeforeResp("StartMatch", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("StartMatch", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetSessionForSync(req: base_IBatchGetResourceReq, params?: RpcParams) : Promise<{err:number, resp:base_IBatchGetResourceResp}> {
        let data = base_BatchGetResourceReq.create(req)
        this.onBeforeReq("BatchGetSessionForSync", data, params)
        const buffer = base_BatchGetResourceReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetSessionForSync", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetSessionForSync", err)
            return {err: err, resp: null}
        } else {
            let resp = base_BatchGetResourceResp.decode(pack) as any
            this.onBeforeResp("BatchGetSessionForSync", err, resp)
            return {err: null, resp: resp}
        }
    }
    async RemindSettleMail(req: IRemindSettleMailReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = RemindSettleMailReq.create(req)
        this.onBeforeReq("RemindSettleMail", data, params)
        const buffer = RemindSettleMailReq.encode(data).finish()
        let [err, pack] = await this.call("RemindSettleMail", buffer, params)
        if (err) {
            this.onBeforeResp("RemindSettleMail", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("RemindSettleMail", err, resp)
            return {err: null, resp: resp}
        }
    }
    NotifyMatchStart(data: Uint8Array, params: RpcParams) : {msg: IMsgMatchStart, eventID?: number} {
        let msg = MsgMatchStart.decode(data)
        return {msg: msg}
    }
    NotifyOneGameStart(data: Uint8Array, params: RpcParams) : {msg: IMsgOneGameStart, eventID?: number} {
        let msg = MsgOneGameStart.decode(data)
        return {msg: msg}
    }
    NotifyOneGameResult(data: Uint8Array, params: RpcParams) : {msg: IMsgOneGameResult, eventID?: number} {
        let msg = MsgOneGameResult.decode(data)
        return {msg: msg}
    }
    NotifyMatchOver(data: Uint8Array, params: RpcParams) : {msg: base_IVoid, eventID?: number} {
        let msg = base_Void.decode(data)
        return {msg: msg}
    }
    NotifyJoinDesk(data: Uint8Array, params: RpcParams) : {msg: IJoinDeskMsg, eventID?: number} {
        let msg = JoinDeskMsg.decode(data)
        return {msg: msg}
    }
    NotifyLeaveDesk(data: Uint8Array, params: RpcParams) : {msg: ILeaveDeskMsg, eventID?: number} {
        let msg = LeaveDeskMsg.decode(data)
        return {msg: msg}
    }
    NotifyReady(data: Uint8Array, params: RpcParams) : {msg: IReadyMsg, eventID?: number} {
        let msg = ReadyMsg.decode(data)
        return {msg: msg}
    }
}
export const Matematch = new $Matematch({
    name: "tss.match.v2.matematch.v1",
})
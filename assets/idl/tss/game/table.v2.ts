import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  Void as base_Void,IVoid as base_IVoid ,  Label as base_Label,ILabel as base_ILabel ,  } from "idl/base/base"
import {  ScoreType as mp_game_cardpool_v1_ScoreType ,  } from "idl/mp/game/cardpool.v1"
import {  PropType as tss_common_PropType ,  } from "idl/tss/common/common_define"
export enum GameResultTag {  
    GameResultTagUnknown = 0,  
    GameResultTag_Win = 1,  
    GameResultTag_Lose = 2,  
    GameResultTag_Drawn = 3,
}
export enum ManagedState {  
    ManagedStateDefault = 0,  
    ManagedStateActive = 1,  
    ManagedStatePassive = 2,
}
export interface IGetReplayInfoReq {
    tableKey?: string|null
}
@protobuf.Type.d("tss_game_table_v2_GetReplayInfoReq")
export class GetReplayInfoReq extends protobuf.Message<IGetReplayInfoReq> {
    constructor(properties: Properties<IGetReplayInfoReq>) {
        super(properties);
        if (properties) {
            if (properties.tableKey) { this.tableKey = properties.tableKey }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public tableKey?: string|null = ""
}
export interface IGetReplayInfoResp {
    code?: number|null
    data?: string[]
}
@protobuf.Type.d("tss_game_table_v2_GetReplayInfoResp")
export class GetReplayInfoResp extends protobuf.Message<IGetReplayInfoResp> {
    constructor(properties: Properties<IGetReplayInfoResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.data) { this.data = []; properties.data.forEach((value, index)=>{this.data[index] = properties.data[index]})}
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
    @protobuf.Field.d(2, "string", "repeated", [])
    public data?: string[] = []
}
export interface IUserInfo {
    uid?: number|null
    matchKey?: string|null
    isLeave?: boolean|null
    appID?: string|null
    rookieNum?: number|null
    appVersion?: string|null
    metadata?: { [k: string]: string|null }
    matchTeam?: string|null
    minCardScore?: number|null
    priorities?: number|null
}
@protobuf.Type.d("tss_game_table_v2_UserInfo")
export class UserInfo extends protobuf.Message<IUserInfo> {
    constructor(properties: Properties<IUserInfo>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.matchKey) { this.matchKey = properties.matchKey }
            if (properties.isLeave) { this.isLeave = properties.isLeave }
            if (properties.appID) { this.appID = properties.appID }
            if (properties.rookieNum) { this.rookieNum = properties.rookieNum }
            if (properties.appVersion) { this.appVersion = properties.appVersion }
            if (properties.metadata) { this.metadata = properties.metadata }
            if (properties.matchTeam) { this.matchTeam = properties.matchTeam }
            if (properties.minCardScore) { this.minCardScore = properties.minCardScore }
            if (properties.priorities) { this.priorities = properties.priorities }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public matchKey?: string|null = ""
    @protobuf.Field.d(3, "bool", "optional", false)
    public isLeave?: boolean|null = false
    @protobuf.Field.d(4, "string", "optional", )
    public appID?: string|null = ""
    @protobuf.Field.d(5, "int32", "optional", 0)
    public rookieNum?: number|null = 0
    @protobuf.Field.d(6, "string", "optional", )
    public appVersion?: string|null = ""
    @protobuf.MapField.d(7, "string", "string")
    public metadata?: { [k: string]: string|null } = {}
    @protobuf.Field.d(8, "string", "optional", )
    public matchTeam?: string|null = ""
    @protobuf.Field.d(9, "int32", "optional", 0)
    public minCardScore?: number|null = 0
    @protobuf.Field.d(10, "int32", "optional", 0)
    public priorities?: number|null = 0
}
export interface IDealCardConfig {
    scoreType?: mp_game_cardpool_v1_ScoreType|null
}
@protobuf.Type.d("tss_game_table_v2_DealCardConfig")
export class DealCardConfig extends protobuf.Message<IDealCardConfig> {
    constructor(properties: Properties<IDealCardConfig>) {
        super(properties);
        if (properties) {
            if (properties.scoreType) { this.scoreType = properties.scoreType }
        }
	}
    @protobuf.Field.d(1, mp_game_cardpool_v1_ScoreType, "optional", mp_game_cardpool_v1_ScoreType.Unknown)
    public scoreType?: mp_game_cardpool_v1_ScoreType|null = mp_game_cardpool_v1_ScoreType.Unknown
}
export interface IUserGroup {
    users?: IUserInfo[]
    playOption?: number|null
    tKey?: string|null
    matchGroup?: string|null
    matchRound?: number|null
    dealCardCfg?: IDealCardConfig
}
@protobuf.Type.d("tss_game_table_v2_UserGroup")
export class UserGroup extends protobuf.Message<IUserGroup> {
    constructor(properties: Properties<IUserGroup>) {
        super(properties);
        if (properties) {
            if (properties.users) { this.users = []; properties.users.forEach((value, index)=>{this.users[index] = UserInfo.create(properties.users[index]) as any})}
            if (properties.playOption) { this.playOption = properties.playOption }
            if (properties.tKey) { this.tKey = properties.tKey }
            if (properties.matchGroup) { this.matchGroup = properties.matchGroup }
            if (properties.matchRound) { this.matchRound = properties.matchRound }
            if (properties.dealCardCfg) { this.dealCardCfg = DealCardConfig.create(properties.dealCardCfg) as any }
        }
	}
    @protobuf.Field.d(1, "tss_game_table_v2_UserInfo", "repeated")
    public users?: UserInfo[] = []
    @protobuf.Field.d(2, "int32", "optional", 0)
    public playOption?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public tKey?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public matchGroup?: string|null = ""
    @protobuf.Field.d(5, "int32", "optional", 0)
    public matchRound?: number|null = 0
    @protobuf.Field.d(6, "tss_game_table_v2_DealCardConfig", "optional")
    public dealCardCfg?: DealCardConfig|null
}
export interface IObserverInfo {
    delaySec?: number|null
}
@protobuf.Type.d("tss_game_table_v2_ObserverInfo")
export class ObserverInfo extends protobuf.Message<IObserverInfo> {
    constructor(properties: Properties<IObserverInfo>) {
        super(properties);
        if (properties) {
            if (properties.delaySec) { this.delaySec = properties.delaySec }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public delaySec?: number|null = 0
}
export interface IRookieConfig {
    data?: IRookieConfig_Item[]
    cardSets?: IRookieCardSetSection[]
}
@protobuf.Type.d("tss_game_table_v2_RookieConfig")
export class RookieConfig extends protobuf.Message<IRookieConfig> {
    constructor(properties: Properties<IRookieConfig>) {
        super(properties);
        if (properties) {
            if (properties.data) { this.data = []; properties.data.forEach((value, index)=>{this.data[index] = RookieConfig_Item.create(properties.data[index]) as any})}
            if (properties.cardSets) { this.cardSets = []; properties.cardSets.forEach((value, index)=>{this.cardSets[index] = RookieCardSetSection.create(properties.cardSets[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_game_table_v2_RookieConfig_Item", "repeated")
    public data?: RookieConfig_Item[] = []
    @protobuf.Field.d(2, "tss_game_table_v2_RookieCardSetSection", "repeated")
    public cardSets?: RookieCardSetSection[] = []
}
export interface IStartTableResp {
    code?: number|null
    tid?: number|null
    tkey?: string|null
    srvId?: number|null
}
@protobuf.Type.d("tss_game_table_v2_StartTableResp")
export class StartTableResp extends protobuf.Message<IStartTableResp> {
    constructor(properties: Properties<IStartTableResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.tid) { this.tid = properties.tid }
            if (properties.tkey) { this.tkey = properties.tkey }
            if (properties.srvId) { this.srvId = properties.srvId }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
    @protobuf.Field.d(2, "uint64", "optional", 0)
    public tid?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public tkey?: string|null = ""
    @protobuf.Field.d(4, "int64", "optional", 0)
    public srvId?: number|null = 0
}
export interface IUserBuff {
    type?: number|null
}
@protobuf.Type.d("tss_game_table_v2_UserBuff")
export class UserBuff extends protobuf.Message<IUserBuff> {
    constructor(properties: Properties<IUserBuff>) {
        super(properties);
        if (properties) {
            if (properties.type) { this.type = properties.type }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public type?: number|null = 0
}
export interface ITableUser {
    uid?: number|null
    buffs?: IUserBuff[]
    curStreakWinCnt?: number|null
    remainOpTime?: number|null
    matchTeam?: string|null
    eventSeq?: number|null
    leftCardNum?: number|null
}
@protobuf.Type.d("tss_game_table_v2_TableUser")
export class TableUser extends protobuf.Message<ITableUser> {
    constructor(properties: Properties<ITableUser>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.buffs) { this.buffs = []; properties.buffs.forEach((value, index)=>{this.buffs[index] = UserBuff.create(properties.buffs[index]) as any})}
            if (properties.curStreakWinCnt) { this.curStreakWinCnt = properties.curStreakWinCnt }
            if (properties.remainOpTime) { this.remainOpTime = properties.remainOpTime }
            if (properties.matchTeam) { this.matchTeam = properties.matchTeam }
            if (properties.eventSeq) { this.eventSeq = properties.eventSeq }
            if (properties.leftCardNum) { this.leftCardNum = properties.leftCardNum }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "tss_game_table_v2_UserBuff", "repeated")
    public buffs?: UserBuff[] = []
    @protobuf.Field.d(3, "int32", "optional", 0)
    public curStreakWinCnt?: number|null = 0
    @protobuf.Field.d(4, "int32", "optional", 0)
    public remainOpTime?: number|null = 0
    @protobuf.Field.d(5, "string", "optional", )
    public matchTeam?: string|null = ""
    @protobuf.Field.d(6, "int32", "optional", 0)
    public eventSeq?: number|null = 0
    @protobuf.Field.d(7, "int32", "optional", 0)
    public leftCardNum?: number|null = 0
}
export interface IMsgTableInfo {
    tableInfo?: Uint8Array
    chatGroup?: string|null
    labels?: base_ILabel[]
    playOption?: number|null
    users?: ITableUser[]
    allocOpTime?: number|null
    downgradeOpTime?: number|null
    chatID?: number|null
    matchType?: string|null
}
@protobuf.Type.d("tss_game_table_v2_MsgTableInfo")
export class MsgTableInfo extends protobuf.Message<IMsgTableInfo> {
    constructor(properties: Properties<IMsgTableInfo>) {
        super(properties);
        if (properties) {
            if (properties.tableInfo) { this.tableInfo = properties.tableInfo }
            if (properties.chatGroup) { this.chatGroup = properties.chatGroup }
            if (properties.labels) { this.labels = []; properties.labels.forEach((value, index)=>{this.labels[index] = base_Label.create(properties.labels[index]) as any})}
            if (properties.playOption) { this.playOption = properties.playOption }
            if (properties.users) { this.users = []; properties.users.forEach((value, index)=>{this.users[index] = TableUser.create(properties.users[index]) as any})}
            if (properties.allocOpTime) { this.allocOpTime = properties.allocOpTime }
            if (properties.downgradeOpTime) { this.downgradeOpTime = properties.downgradeOpTime }
            if (properties.chatID) { this.chatID = properties.chatID }
            if (properties.matchType) { this.matchType = properties.matchType }
        }
	}
    @protobuf.Field.d(1, "bytes", "optional", [])
    public tableInfo?: Uint8Array
    @protobuf.Field.d(2, "string", "optional", )
    public chatGroup?: string|null = ""
    @protobuf.Field.d(3, "base_Label", "repeated")
    public labels?: base_Label[] = []
    @protobuf.Field.d(4, "int32", "optional", 0)
    public playOption?: number|null = 0
    @protobuf.Field.d(5, "tss_game_table_v2_TableUser", "repeated")
    public users?: TableUser[] = []
    @protobuf.Field.d(6, "int32", "optional", 0)
    public allocOpTime?: number|null = 0
    @protobuf.Field.d(7, "int32", "optional", 0)
    public downgradeOpTime?: number|null = 0
    @protobuf.Field.d(8, "int64", "optional", 0)
    public chatID?: number|null = 0
    @protobuf.Field.d(9, "string", "optional", )
    public matchType?: string|null = ""
}
export interface IActionReq {
    eventID?: number|null
    msg?: Uint8Array
}
@protobuf.Type.d("tss_game_table_v2_ActionReq")
export class ActionReq extends protobuf.Message<IActionReq> {
    constructor(properties: Properties<IActionReq>) {
        super(properties);
        if (properties) {
            if (properties.eventID) { this.eventID = properties.eventID }
            if (properties.msg) { this.msg = properties.msg }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public eventID?: number|null = 0
    @protobuf.Field.d(2, "bytes", "optional", [])
    public msg?: Uint8Array
}
export interface ISyncTableStatus {
}
@protobuf.Type.d("tss_game_table_v2_SyncTableStatus")
export class SyncTableStatus extends protobuf.Message<ISyncTableStatus> {
    constructor(properties: Properties<ISyncTableStatus>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface ISyncUserStatus {
    uid?: number|null
    leftOpTime?: number|null
    eventSeq?: number|null
    leftCardNum?: number|null
}
@protobuf.Type.d("tss_game_table_v2_SyncUserStatus")
export class SyncUserStatus extends protobuf.Message<ISyncUserStatus> {
    constructor(properties: Properties<ISyncUserStatus>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.leftOpTime) { this.leftOpTime = properties.leftOpTime }
            if (properties.eventSeq) { this.eventSeq = properties.eventSeq }
            if (properties.leftCardNum) { this.leftCardNum = properties.leftCardNum }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public leftOpTime?: number|null = 0
    @protobuf.Field.d(3, "int32", "optional", 0)
    public eventSeq?: number|null = 0
    @protobuf.Field.d(4, "int32", "optional", 0)
    public leftCardNum?: number|null = 0
}
export interface IMsgNotify {
    eventID?: number|null
    msg?: Uint8Array
    syncUserData?: ISyncUserStatus[]
}
@protobuf.Type.d("tss_game_table_v2_MsgNotify")
export class MsgNotify extends protobuf.Message<IMsgNotify> {
    constructor(properties: Properties<IMsgNotify>) {
        super(properties);
        if (properties) {
            if (properties.eventID) { this.eventID = properties.eventID }
            if (properties.msg) { this.msg = properties.msg }
            if (properties.syncUserData) { this.syncUserData = []; properties.syncUserData.forEach((value, index)=>{this.syncUserData[index] = SyncUserStatus.create(properties.syncUserData[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public eventID?: number|null = 0
    @protobuf.Field.d(2, "bytes", "optional", [])
    public msg?: Uint8Array
    @protobuf.Field.d(3, "tss_game_table_v2_SyncUserStatus", "repeated")
    public syncUserData?: SyncUserStatus[] = []
}
export interface IMsgManaged {
    uid?: number|null
    isManaged?: boolean|null
}
@protobuf.Type.d("tss_game_table_v2_MsgManaged")
export class MsgManaged extends protobuf.Message<IMsgManaged> {
    constructor(properties: Properties<IMsgManaged>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.isManaged) { this.isManaged = properties.isManaged }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "bool", "optional", false)
    public isManaged?: boolean|null = false
}
export interface IReconnectResp {
    code?: number|null
}
@protobuf.Type.d("tss_game_table_v2_ReconnectResp")
export class ReconnectResp extends protobuf.Message<IReconnectResp> {
    constructor(properties: Properties<IReconnectResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
}
export interface IGameMessage {
    uids?: number[]
    desc?: string|null
    msg?: Uint8Array
}
@protobuf.Type.d("tss_game_table_v2_GameMessage")
export class GameMessage extends protobuf.Message<IGameMessage> {
    constructor(properties: Properties<IGameMessage>) {
        super(properties);
        if (properties) {
            if (properties.uids) { this.uids = []; properties.uids.forEach((value, index)=>{this.uids[index] = properties.uids[index]})}
            if (properties.desc) { this.desc = properties.desc }
            if (properties.msg) { this.msg = properties.msg }
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public uids?: number[] = []
    @protobuf.Field.d(2, "string", "optional", )
    public desc?: string|null = ""
    @protobuf.Field.d(3, "bytes", "optional", [])
    public msg?: Uint8Array
}
export interface IMsgTableEnd {
    tid?: number|null
    tkey?: string|null
    srvId?: number|null
}
@protobuf.Type.d("tss_game_table_v2_MsgTableEnd")
export class MsgTableEnd extends protobuf.Message<IMsgTableEnd> {
    constructor(properties: Properties<IMsgTableEnd>) {
        super(properties);
        if (properties) {
            if (properties.tid) { this.tid = properties.tid }
            if (properties.tkey) { this.tkey = properties.tkey }
            if (properties.srvId) { this.srvId = properties.srvId }
        }
	}
    @protobuf.Field.d(1, "uint64", "optional", 0)
    public tid?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public tkey?: string|null = ""
    @protobuf.Field.d(3, "int64", "optional", 0)
    public srvId?: number|null = 0
}
export interface IBatchStartTableReq {
    groups?: IUserGroup[]
    obInfo?: IObserverInfo
    matchType?: string|null
    matchExt?: Uint8Array
    statelessMatch?: boolean|null
    gameResultCb?: string|null
    gameEndCb?: string|null
    rookieCfg?: IRookieConfig
    allocOpTime?: number|null
    downgradeOpTime?: number|null
    gamePanicCb?: string|null
}
@protobuf.Type.d("tss_game_table_v2_BatchStartTableReq")
export class BatchStartTableReq extends protobuf.Message<IBatchStartTableReq> {
    constructor(properties: Properties<IBatchStartTableReq>) {
        super(properties);
        if (properties) {
            if (properties.groups) { this.groups = []; properties.groups.forEach((value, index)=>{this.groups[index] = UserGroup.create(properties.groups[index]) as any})}
            if (properties.obInfo) { this.obInfo = ObserverInfo.create(properties.obInfo) as any }
            if (properties.matchType) { this.matchType = properties.matchType }
            if (properties.matchExt) { this.matchExt = properties.matchExt }
            if (properties.statelessMatch) { this.statelessMatch = properties.statelessMatch }
            if (properties.gameResultCb) { this.gameResultCb = properties.gameResultCb }
            if (properties.gameEndCb) { this.gameEndCb = properties.gameEndCb }
            if (properties.rookieCfg) { this.rookieCfg = RookieConfig.create(properties.rookieCfg) as any }
            if (properties.allocOpTime) { this.allocOpTime = properties.allocOpTime }
            if (properties.downgradeOpTime) { this.downgradeOpTime = properties.downgradeOpTime }
            if (properties.gamePanicCb) { this.gamePanicCb = properties.gamePanicCb }
        }
	}
    @protobuf.Field.d(1, "tss_game_table_v2_UserGroup", "repeated")
    public groups?: UserGroup[] = []
    @protobuf.Field.d(2, "tss_game_table_v2_ObserverInfo", "optional")
    public obInfo?: ObserverInfo|null
    @protobuf.Field.d(3, "string", "optional", )
    public matchType?: string|null = ""
    @protobuf.Field.d(4, "bytes", "optional", [])
    public matchExt?: Uint8Array
    @protobuf.Field.d(5, "bool", "optional", false)
    public statelessMatch?: boolean|null = false
    @protobuf.Field.d(6, "string", "optional", )
    public gameResultCb?: string|null = ""
    @protobuf.Field.d(7, "string", "optional", )
    public gameEndCb?: string|null = ""
    @protobuf.Field.d(8, "tss_game_table_v2_RookieConfig", "optional")
    public rookieCfg?: RookieConfig|null
    @protobuf.Field.d(9, "int32", "optional", 0)
    public allocOpTime?: number|null = 0
    @protobuf.Field.d(10, "int32", "optional", 0)
    public downgradeOpTime?: number|null = 0
    @protobuf.Field.d(11, "string", "optional", )
    public gamePanicCb?: string|null = ""
}
export interface IBatchStartTableResp {
    data?: IStartTableResp[]
}
@protobuf.Type.d("tss_game_table_v2_BatchStartTableResp")
export class BatchStartTableResp extends protobuf.Message<IBatchStartTableResp> {
    constructor(properties: Properties<IBatchStartTableResp>) {
        super(properties);
        if (properties) {
            if (properties.data) { this.data = []; properties.data.forEach((value, index)=>{this.data[index] = StartTableResp.create(properties.data[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_game_table_v2_StartTableResp", "repeated")
    public data?: StartTableResp[] = []
}
export interface IChatMessage {
    from?: number|null
    to?: number[]
    msg?: Uint8Array
    type?: number|null
}
@protobuf.Type.d("tss_game_table_v2_ChatMessage")
export class ChatMessage extends protobuf.Message<IChatMessage> {
    constructor(properties: Properties<IChatMessage>) {
        super(properties);
        if (properties) {
            if (properties.from) { this.from = properties.from }
            if (properties.to) { this.to = []; properties.to.forEach((value, index)=>{this.to[index] = properties.to[index]})}
            if (properties.msg) { this.msg = properties.msg }
            if (properties.type) { this.type = properties.type }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public from?: number|null = 0
    @protobuf.Field.d(2, "int64", "repeated", [])
    public to?: number[] = []
    @protobuf.Field.d(3, "bytes", "optional", [])
    public msg?: Uint8Array
    @protobuf.Field.d(4, "int32", "optional", 0)
    public type?: number|null = 0
}
export interface ISendChatMsgResp {
    code?: number|null
}
@protobuf.Type.d("tss_game_table_v2_SendChatMsgResp")
export class SendChatMsgResp extends protobuf.Message<ISendChatMsgResp> {
    constructor(properties: Properties<ISendChatMsgResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
}
export interface IRookieCardGroupItem {
    num?: number|null
    prob?: number|null
}
@protobuf.Type.d("tss_game_table_v2_RookieCardGroupItem")
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
    prob?: number|null
    data?: IRookieCardGroupItem[]
}
@protobuf.Type.d("tss_game_table_v2_RookieCardSetItem")
export class RookieCardSetItem extends protobuf.Message<IRookieCardSetItem> {
    constructor(properties: Properties<IRookieCardSetItem>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.prob) { this.prob = properties.prob }
            if (properties.data) { this.data = []; properties.data.forEach((value, index)=>{this.data[index] = RookieCardGroupItem.create(properties.data[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public id?: string|null = ""
    @protobuf.Field.d(2, "int32", "optional", 0)
    public prob?: number|null = 0
    @protobuf.Field.d(3, "tss_game_table_v2_RookieCardGroupItem", "repeated")
    public data?: RookieCardGroupItem[] = []
}
export interface IRookieCardSetSection {
    from?: number|null
    to?: number|null
    data?: IRookieCardSetItem[]
}
@protobuf.Type.d("tss_game_table_v2_RookieCardSetSection")
export class RookieCardSetSection extends protobuf.Message<IRookieCardSetSection> {
    constructor(properties: Properties<IRookieCardSetSection>) {
        super(properties);
        if (properties) {
            if (properties.from) { this.from = properties.from }
            if (properties.to) { this.to = properties.to }
            if (properties.data) { this.data = []; properties.data.forEach((value, index)=>{this.data[index] = RookieCardSetItem.create(properties.data[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public from?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public to?: number|null = 0
    @protobuf.Field.d(3, "tss_game_table_v2_RookieCardSetItem", "repeated")
    public data?: RookieCardSetItem[] = []
}
export interface IRookieConfig_Item {
    from?: number|null
    to?: number|null
    nums?: number[]
    probabilities?: number[]
}
@protobuf.Type.d("tss_game_table_v2_RookieConfig_Item")
export class RookieConfig_Item extends protobuf.Message<IRookieConfig_Item> {
    constructor(properties: Properties<IRookieConfig_Item>) {
        super(properties);
        if (properties) {
            if (properties.from) { this.from = properties.from }
            if (properties.to) { this.to = properties.to }
            if (properties.nums) { this.nums = []; properties.nums.forEach((value, index)=>{this.nums[index] = properties.nums[index]})}
            if (properties.probabilities) { this.probabilities = []; properties.probabilities.forEach((value, index)=>{this.probabilities[index] = properties.probabilities[index]})}
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public from?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public to?: number|null = 0
    @protobuf.Field.d(3, "int32", "repeated", [])
    public nums?: number[] = []
    @protobuf.Field.d(4, "int32", "repeated", [])
    public probabilities?: number[] = []
}
export interface IStartTableReq {
    users?: IUserInfo[]
    obInfo?: IObserverInfo
    matchType?: string|null
    matchExt?: Uint8Array
    statelessMatch?: boolean|null
    playOption?: number|null
    tKey?: string|null
    matchGroup?: string|null
    matchRound?: number|null
    gameResultCb?: string|null
    gameEndCb?: string|null
    rookieCfg?: IRookieConfig
    delay?: number|null
    allocOpTime?: number|null
    downgradeOpTime?: number|null
    gamePanicCb?: string|null
    dealCardCfg?: IDealCardConfig
}
@protobuf.Type.d("tss_game_table_v2_StartTableReq")
export class StartTableReq extends protobuf.Message<IStartTableReq> {
    constructor(properties: Properties<IStartTableReq>) {
        super(properties);
        if (properties) {
            if (properties.users) { this.users = []; properties.users.forEach((value, index)=>{this.users[index] = UserInfo.create(properties.users[index]) as any})}
            if (properties.obInfo) { this.obInfo = ObserverInfo.create(properties.obInfo) as any }
            if (properties.matchType) { this.matchType = properties.matchType }
            if (properties.matchExt) { this.matchExt = properties.matchExt }
            if (properties.statelessMatch) { this.statelessMatch = properties.statelessMatch }
            if (properties.playOption) { this.playOption = properties.playOption }
            if (properties.tKey) { this.tKey = properties.tKey }
            if (properties.matchGroup) { this.matchGroup = properties.matchGroup }
            if (properties.matchRound) { this.matchRound = properties.matchRound }
            if (properties.gameResultCb) { this.gameResultCb = properties.gameResultCb }
            if (properties.gameEndCb) { this.gameEndCb = properties.gameEndCb }
            if (properties.rookieCfg) { this.rookieCfg = RookieConfig.create(properties.rookieCfg) as any }
            if (properties.delay) { this.delay = properties.delay }
            if (properties.allocOpTime) { this.allocOpTime = properties.allocOpTime }
            if (properties.downgradeOpTime) { this.downgradeOpTime = properties.downgradeOpTime }
            if (properties.gamePanicCb) { this.gamePanicCb = properties.gamePanicCb }
            if (properties.dealCardCfg) { this.dealCardCfg = DealCardConfig.create(properties.dealCardCfg) as any }
        }
	}
    @protobuf.Field.d(1, "tss_game_table_v2_UserInfo", "repeated")
    public users?: UserInfo[] = []
    @protobuf.Field.d(2, "tss_game_table_v2_ObserverInfo", "optional")
    public obInfo?: ObserverInfo|null
    @protobuf.Field.d(3, "string", "optional", )
    public matchType?: string|null = ""
    @protobuf.Field.d(4, "bytes", "optional", [])
    public matchExt?: Uint8Array
    @protobuf.Field.d(5, "bool", "optional", false)
    public statelessMatch?: boolean|null = false
    @protobuf.Field.d(6, "int32", "optional", 0)
    public playOption?: number|null = 0
    @protobuf.Field.d(7, "string", "optional", )
    public tKey?: string|null = ""
    @protobuf.Field.d(8, "string", "optional", )
    public matchGroup?: string|null = ""
    @protobuf.Field.d(9, "int32", "optional", 0)
    public matchRound?: number|null = 0
    @protobuf.Field.d(10, "string", "optional", )
    public gameResultCb?: string|null = ""
    @protobuf.Field.d(11, "string", "optional", )
    public gameEndCb?: string|null = ""
    @protobuf.Field.d(12, "tss_game_table_v2_RookieConfig", "optional")
    public rookieCfg?: RookieConfig|null
    @protobuf.Field.d(13, "int32", "optional", 0)
    public delay?: number|null = 0
    @protobuf.Field.d(14, "int32", "optional", 0)
    public allocOpTime?: number|null = 0
    @protobuf.Field.d(15, "int32", "optional", 0)
    public downgradeOpTime?: number|null = 0
    @protobuf.Field.d(16, "string", "optional", )
    public gamePanicCb?: string|null = ""
    @protobuf.Field.d(17, "tss_game_table_v2_DealCardConfig", "optional")
    public dealCardCfg?: DealCardConfig|null
}
export interface IUsePropReq {
    propType?: tss_common_PropType|null
    propID?: number|null
}
@protobuf.Type.d("tss_game_table_v2_UsePropReq")
export class UsePropReq extends protobuf.Message<IUsePropReq> {
    constructor(properties: Properties<IUsePropReq>) {
        super(properties);
        if (properties) {
            if (properties.propType) { this.propType = properties.propType }
            if (properties.propID) { this.propID = properties.propID }
        }
	}
    @protobuf.Field.d(1, tss_common_PropType, "optional", tss_common_PropType.PropTypeUnknown)
    public propType?: tss_common_PropType|null = tss_common_PropType.PropTypeUnknown
    @protobuf.Field.d(2, "int64", "optional", 0)
    public propID?: number|null = 0
}
export interface IUsePropResp {
    code?: number|null
}
@protobuf.Type.d("tss_game_table_v2_UsePropResp")
export class UsePropResp extends protobuf.Message<IUsePropResp> {
    constructor(properties: Properties<IUsePropResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
}
class $Table extends RpcService {
    async StartTable(req: IStartTableReq, params?: RpcParams) : Promise<{err:number, resp:IStartTableResp}> {
        let data = StartTableReq.create(req)
        this.onBeforeReq("StartTable", data, params)
        const buffer = StartTableReq.encode(data).finish()
        let [err, pack] = await this.call("StartTable", buffer, params)
        if (err) {
            this.onBeforeResp("StartTable", err)
            return {err: err, resp: null}
        } else {
            let resp = StartTableResp.decode(pack) as any
            this.onBeforeResp("StartTable", err, resp)
            return {err: null, resp: resp}
        }
    }
    async StopTable(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = base_Void.create(req)
        this.onBeforeReq("StopTable", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("StopTable", buffer, params)
        if (err) {
            this.onBeforeResp("StopTable", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("StopTable", err, resp)
            return {err: null, resp: resp}
        }
    }
    async LeaveTable(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = base_Void.create(req)
        this.onBeforeReq("LeaveTable", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("LeaveTable", buffer, params)
        if (err) {
            this.onBeforeResp("LeaveTable", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("LeaveTable", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchStartTable(req: IBatchStartTableReq, params?: RpcParams) : Promise<{err:number, resp:IBatchStartTableResp}> {
        let data = BatchStartTableReq.create(req)
        this.onBeforeReq("BatchStartTable", data, params)
        const buffer = BatchStartTableReq.encode(data).finish()
        let [err, pack] = await this.call("BatchStartTable", buffer, params)
        if (err) {
            this.onBeforeResp("BatchStartTable", err)
            return {err: err, resp: null}
        } else {
            let resp = BatchStartTableResp.decode(pack) as any
            this.onBeforeResp("BatchStartTable", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ReconnectTable(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:IReconnectResp}> {
        let data = base_Void.create(req)
        this.onBeforeReq("ReconnectTable", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("ReconnectTable", buffer, params)
        if (err) {
            this.onBeforeResp("ReconnectTable", err)
            return {err: err, resp: null}
        } else {
            let resp = ReconnectResp.decode(pack) as any
            this.onBeforeResp("ReconnectTable", err, resp)
            return {err: null, resp: resp}
        }
    }
    async StartManaged(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = base_Void.create(req)
        this.onBeforeReq("StartManaged", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("StartManaged", buffer, params)
        if (err) {
            this.onBeforeResp("StartManaged", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("StartManaged", err, resp)
            return {err: null, resp: resp}
        }
    }
    async StopManaged(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = base_Void.create(req)
        this.onBeforeReq("StopManaged", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("StopManaged", buffer, params)
        if (err) {
            this.onBeforeResp("StopManaged", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("StopManaged", err, resp)
            return {err: null, resp: resp}
        }
    }
    async Action(req: IActionReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = ActionReq.create(req)
        this.onBeforeReq("Action", data, params)
        const buffer = ActionReq.encode(data).finish()
        let [err, pack] = await this.call("Action", buffer, params)
        if (err) {
            this.onBeforeResp("Action", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("Action", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SendChatMsg(req: IChatMessage, params?: RpcParams) : Promise<{err:number, resp:ISendChatMsgResp}> {
        let data = ChatMessage.create(req)
        this.onBeforeReq("SendChatMsg", data, params)
        const buffer = ChatMessage.encode(data).finish()
        let [err, pack] = await this.call("SendChatMsg", buffer, params)
        if (err) {
            this.onBeforeResp("SendChatMsg", err)
            return {err: err, resp: null}
        } else {
            let resp = SendChatMsgResp.decode(pack) as any
            this.onBeforeResp("SendChatMsg", err, resp)
            return {err: null, resp: resp}
        }
    }
    async PingTable(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = base_Void.create(req)
        this.onBeforeReq("PingTable", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("PingTable", buffer, params)
        if (err) {
            this.onBeforeResp("PingTable", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("PingTable", err, resp)
            return {err: null, resp: resp}
        }
    }
    async UseProp(req: IUsePropReq, params?: RpcParams) : Promise<{err:number, resp:IUsePropResp}> {
        let data = UsePropReq.create(req)
        this.onBeforeReq("UseProp", data, params)
        const buffer = UsePropReq.encode(data).finish()
        let [err, pack] = await this.call("UseProp", buffer, params)
        if (err) {
            this.onBeforeResp("UseProp", err)
            return {err: err, resp: null}
        } else {
            let resp = UsePropResp.decode(pack) as any
            this.onBeforeResp("UseProp", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetReplayInfo(req: IGetReplayInfoReq, params?: RpcParams) : Promise<{err:number, resp:IGetReplayInfoResp}> {
        let data = GetReplayInfoReq.create(req)
        this.onBeforeReq("GetReplayInfo", data, params)
        const buffer = GetReplayInfoReq.encode(data).finish()
        let [err, pack] = await this.call("GetReplayInfo", buffer, params)
        if (err) {
            this.onBeforeResp("GetReplayInfo", err)
            return {err: err, resp: null}
        } else {
            let resp = GetReplayInfoResp.decode(pack) as any
            this.onBeforeResp("GetReplayInfo", err, resp)
            return {err: null, resp: resp}
        }
    }
    NotifyTableStart(data: Uint8Array, params: RpcParams) : {msg: IMsgTableInfo, eventID?: number} {
        let msg = MsgTableInfo.decode(data)
        return {msg: msg}
    }
    NotifyPlayer(data: Uint8Array, params: RpcParams) : {msg: IMsgNotify, eventID?: number} {
        let msg = MsgNotify.decode(data)
        return {msg: msg}
    }
    NotifyManaged(data: Uint8Array, params: RpcParams) : {msg: IMsgManaged, eventID?: number} {
        let msg = MsgManaged.decode(data)
        return {msg: msg}
    }
    NotifyReconnect(data: Uint8Array, params: RpcParams) : {msg: IMsgTableInfo, eventID?: number} {
        let msg = MsgTableInfo.decode(data)
        return {msg: msg}
    }
    NotifyTableEnd(data: Uint8Array, params: RpcParams) : {msg: IMsgTableEnd, eventID?: number} {
        let msg = MsgTableEnd.decode(data)
        return {msg: msg}
    }
    NotifyRobot(data: Uint8Array, params: RpcParams) : {msg: IGameMessage, eventID?: number} {
        let msg = GameMessage.decode(data)
        return {msg: msg}
    }
    NotifyChatMsg(data: Uint8Array, params: RpcParams) : {msg: IChatMessage, eventID?: number} {
        let msg = ChatMessage.decode(data)
        return {msg: msg}
    }
    NotifyDowngradeOpTime(data: Uint8Array, params: RpcParams) : {msg: base_IVoid, eventID?: number} {
        let msg = base_Void.decode(data)
        return {msg: msg}
    }
}
export const Table = new $Table({
    name: "tss.game.table.v2",
})
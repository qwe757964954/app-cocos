import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  Void as base_Void,IVoid as base_IVoid ,  } from "idl/base/base"
import {  UesrOffLine as bgo_component_UesrOffLine,IUesrOffLine as bgo_component_IUesrOffLine ,  UesrOnLine as bgo_component_UesrOnLine,IUesrOnLine as bgo_component_IUesrOnLine ,  } from "idl/bgo/component/common_msg"
import {  Asset as tss_common_Asset,IAsset as tss_common_IAsset ,  AssetItem as tss_common_AssetItem,IAssetItem as tss_common_IAssetItem ,  } from "idl/tss/common/common_define"
import {  Code as tss_match_v2_common_Code ,  } from "idl/tss/match_v2/common/code"
import {  UserStatus as tss_match_v2_common_UserStatus ,  PreMatchConfig as tss_match_v2_common_PreMatchConfig,IPreMatchConfig as tss_match_v2_common_IPreMatchConfig ,  RefactorVer as tss_match_v2_common_RefactorVer ,  LiveRoomType as tss_match_v2_common_LiveRoomType ,  SpecConfig as tss_match_v2_common_SpecConfig,ISpecConfig as tss_match_v2_common_ISpecConfig ,  PreMatchInfo as tss_match_v2_common_PreMatchInfo,IPreMatchInfo as tss_match_v2_common_IPreMatchInfo ,  UserInfo as tss_match_v2_common_UserInfo,IUserInfo as tss_match_v2_common_IUserInfo ,  MatchStatus as tss_match_v2_common_MatchStatus ,  User as tss_match_v2_common_User,IUser as tss_match_v2_common_IUser ,  EntryConfig as tss_match_v2_common_EntryConfig,IEntryConfig as tss_match_v2_common_IEntryConfig ,  } from "idl/tss/match_v2/common/common"
export enum JoinPreMatchV2Code {  
    CodeOk = 0,  
    CodeNoSuchMatch = 1001,  
    CodeAppChannelMismatch = 1630,
}
export interface IEnterUser {
    uid?: number|null
    EnterAt?: number|null
    isRobot?: boolean|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_EnterUser")
export class EnterUser extends protobuf.Message<IEnterUser> {
    constructor(properties: Properties<IEnterUser>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.EnterAt) { this.EnterAt = properties.EnterAt }
            if (properties.isRobot) { this.isRobot = properties.isRobot }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public EnterAt?: number|null = 0
    @protobuf.Field.d(3, "bool", "optional", false)
    public isRobot?: boolean|null = false
}
export interface IUser {
    uid?: number|null
    EnterAt?: number|null
    isRobot?: boolean|null
    status?: tss_match_v2_common_UserStatus|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_User")
export class User extends protobuf.Message<IUser> {
    constructor(properties: Properties<IUser>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.EnterAt) { this.EnterAt = properties.EnterAt }
            if (properties.isRobot) { this.isRobot = properties.isRobot }
            if (properties.status) { this.status = properties.status }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public EnterAt?: number|null = 0
    @protobuf.Field.d(3, "bool", "optional", false)
    public isRobot?: boolean|null = false
    @protobuf.Field.d(4, tss_match_v2_common_UserStatus, "optional", tss_match_v2_common_UserStatus.UserStatusUnknown)
    public status?: tss_match_v2_common_UserStatus|null = tss_match_v2_common_UserStatus.UserStatusUnknown
}
export interface IMsgUserChange {
    leaveUsers?: number[]
    readyUsers?: number[]
    enterUsers?: IEnterUser[]
    joinUsers?: number[]
    cancelEnterUsers?: number[]
    cancelReadyUsers?: number[]
}
@protobuf.Type.d("tss_match_v2_prematch_v1_MsgUserChange")
export class MsgUserChange extends protobuf.Message<IMsgUserChange> {
    constructor(properties: Properties<IMsgUserChange>) {
        super(properties);
        if (properties) {
            if (properties.leaveUsers) { this.leaveUsers = []; properties.leaveUsers.forEach((value, index)=>{this.leaveUsers[index] = properties.leaveUsers[index]})}
            if (properties.readyUsers) { this.readyUsers = []; properties.readyUsers.forEach((value, index)=>{this.readyUsers[index] = properties.readyUsers[index]})}
            if (properties.enterUsers) { this.enterUsers = []; properties.enterUsers.forEach((value, index)=>{this.enterUsers[index] = EnterUser.create(properties.enterUsers[index]) as any})}
            if (properties.joinUsers) { this.joinUsers = []; properties.joinUsers.forEach((value, index)=>{this.joinUsers[index] = properties.joinUsers[index]})}
            if (properties.cancelEnterUsers) { this.cancelEnterUsers = []; properties.cancelEnterUsers.forEach((value, index)=>{this.cancelEnterUsers[index] = properties.cancelEnterUsers[index]})}
            if (properties.cancelReadyUsers) { this.cancelReadyUsers = []; properties.cancelReadyUsers.forEach((value, index)=>{this.cancelReadyUsers[index] = properties.cancelReadyUsers[index]})}
        }
	}
    @protobuf.Field.d(2, "int64", "repeated", [])
    public leaveUsers?: number[] = []
    @protobuf.Field.d(3, "int64", "repeated", [])
    public readyUsers?: number[] = []
    @protobuf.Field.d(4, "tss_match_v2_prematch_v1_EnterUser", "repeated")
    public enterUsers?: EnterUser[] = []
    @protobuf.Field.d(5, "int64", "repeated", [])
    public joinUsers?: number[] = []
    @protobuf.Field.d(6, "int64", "repeated", [])
    public cancelEnterUsers?: number[] = []
    @protobuf.Field.d(7, "int64", "repeated", [])
    public cancelReadyUsers?: number[] = []
}
export interface ICreatePreMatchReq {
    config?: tss_match_v2_common_IPreMatchConfig
}
@protobuf.Type.d("tss_match_v2_prematch_v1_CreatePreMatchReq")
export class CreatePreMatchReq extends protobuf.Message<ICreatePreMatchReq> {
    constructor(properties: Properties<ICreatePreMatchReq>) {
        super(properties);
        if (properties) {
            if (properties.config) { this.config = tss_match_v2_common_PreMatchConfig.create(properties.config) as any }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_common_PreMatchConfig", "optional")
    public config?: tss_match_v2_common_PreMatchConfig|null
}
export interface ICreatePreMatchResp {
    roomNo?: string|null
    preMatchKey?: string|null
    srvID?: number|null
    code?: tss_match_v2_common_Code|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_CreatePreMatchResp")
export class CreatePreMatchResp extends protobuf.Message<ICreatePreMatchResp> {
    constructor(properties: Properties<ICreatePreMatchResp>) {
        super(properties);
        if (properties) {
            if (properties.roomNo) { this.roomNo = properties.roomNo }
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
            if (properties.srvID) { this.srvID = properties.srvID }
            if (properties.code) { this.code = properties.code }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public roomNo?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public preMatchKey?: string|null = ""
    @protobuf.Field.d(3, "int64", "optional", 0)
    public srvID?: number|null = 0
    @protobuf.Field.d(4, tss_match_v2_common_Code, "optional", tss_match_v2_common_Code.CodeOk)
    public code?: tss_match_v2_common_Code|null = tss_match_v2_common_Code.CodeOk
}
export interface IConfirmJumpMatchReq {
    uid?: number|null
    preMatchKey?: string|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_ConfirmJumpMatchReq")
export class ConfirmJumpMatchReq extends protobuf.Message<IConfirmJumpMatchReq> {
    constructor(properties: Properties<IConfirmJumpMatchReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public preMatchKey?: string|null = ""
}
export interface IConfirmJumpMatchResp {
    code?: number|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_ConfirmJumpMatchResp")
export class ConfirmJumpMatchResp extends protobuf.Message<IConfirmJumpMatchResp> {
    constructor(properties: Properties<IConfirmJumpMatchResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public code?: number|null = 0
}
export interface IReadyJumpMatchReq {
    uid?: number|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_ReadyJumpMatchReq")
export class ReadyJumpMatchReq extends protobuf.Message<IReadyJumpMatchReq> {
    constructor(properties: Properties<IReadyJumpMatchReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IReadyJumpMatchResp {
    code?: number|null
    srvID?: number|null
    preMatchKey?: string|null
    schedulerID?: number|null
    refactorVer?: tss_match_v2_common_RefactorVer|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_ReadyJumpMatchResp")
export class ReadyJumpMatchResp extends protobuf.Message<IReadyJumpMatchResp> {
    constructor(properties: Properties<IReadyJumpMatchResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.srvID) { this.srvID = properties.srvID }
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
            if (properties.schedulerID) { this.schedulerID = properties.schedulerID }
            if (properties.refactorVer) { this.refactorVer = properties.refactorVer }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public code?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public srvID?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public preMatchKey?: string|null = ""
    @protobuf.Field.d(4, "int64", "optional", 0)
    public schedulerID?: number|null = 0
    @protobuf.Field.d(6, tss_match_v2_common_RefactorVer, "optional", tss_match_v2_common_RefactorVer.RefactorVerV1)
    public refactorVer?: tss_match_v2_common_RefactorVer|null = tss_match_v2_common_RefactorVer.RefactorVerV1
}
export interface ICallBackRemindReq {
    jobID?: string|null
    preMatchKey?: string|null
    timeOutAt?: string|null
    remindType?: string|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_CallBackRemindReq")
export class CallBackRemindReq extends protobuf.Message<ICallBackRemindReq> {
    constructor(properties: Properties<ICallBackRemindReq>) {
        super(properties);
        if (properties) {
            if (properties.jobID) { this.jobID = properties.jobID }
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
            if (properties.timeOutAt) { this.timeOutAt = properties.timeOutAt }
            if (properties.remindType) { this.remindType = properties.remindType }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public jobID?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public preMatchKey?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public timeOutAt?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public remindType?: string|null = ""
}
export interface ICallBackAddRobotReq {
    jobID?: string|null
    preMatchKey?: string|null
    timeOutAt?: string|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_CallBackAddRobotReq")
export class CallBackAddRobotReq extends protobuf.Message<ICallBackAddRobotReq> {
    constructor(properties: Properties<ICallBackAddRobotReq>) {
        super(properties);
        if (properties) {
            if (properties.jobID) { this.jobID = properties.jobID }
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
            if (properties.timeOutAt) { this.timeOutAt = properties.timeOutAt }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public jobID?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public preMatchKey?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public timeOutAt?: string|null = ""
}
export interface IGetPoolResp {
    pool?: tss_common_IAsset
}
@protobuf.Type.d("tss_match_v2_prematch_v1_GetPoolResp")
export class GetPoolResp extends protobuf.Message<IGetPoolResp> {
    constructor(properties: Properties<IGetPoolResp>) {
        super(properties);
        if (properties) {
            if (properties.pool) { this.pool = tss_common_Asset.create(properties.pool) as any }
        }
	}
    @protobuf.Field.d(1, "tss_common_Asset", "optional")
    public pool?: tss_common_Asset|null
}
export interface IGetPoolReq {
    preMatchKey?: string|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_GetPoolReq")
export class GetPoolReq extends protobuf.Message<IGetPoolReq> {
    constructor(properties: Properties<IGetPoolReq>) {
        super(properties);
        if (properties) {
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public preMatchKey?: string|null = ""
}
export interface IMsgPoolChange {
    prizePool?: tss_common_IAssetItem[]
}
@protobuf.Type.d("tss_match_v2_prematch_v1_MsgPoolChange")
export class MsgPoolChange extends protobuf.Message<IMsgPoolChange> {
    constructor(properties: Properties<IMsgPoolChange>) {
        super(properties);
        if (properties) {
            if (properties.prizePool) { this.prizePool = []; properties.prizePool.forEach((value, index)=>{this.prizePool[index] = tss_common_AssetItem.create(properties.prizePool[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_common_AssetItem", "repeated")
    public prizePool?: tss_common_AssetItem[] = []
}
export interface ICheckMatchIsExistReq {
    key?: string|null
    schedulerID?: number|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_CheckMatchIsExistReq")
export class CheckMatchIsExistReq extends protobuf.Message<ICheckMatchIsExistReq> {
    constructor(properties: Properties<ICheckMatchIsExistReq>) {
        super(properties);
        if (properties) {
            if (properties.key) { this.key = properties.key }
            if (properties.schedulerID) { this.schedulerID = properties.schedulerID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public key?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public schedulerID?: number|null = 0
}
export interface ICheckMatchIsExistResp {
    isExist?: boolean|null
    roomType?: tss_match_v2_common_LiveRoomType|null
    refactorVer?: tss_match_v2_common_RefactorVer|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_CheckMatchIsExistResp")
export class CheckMatchIsExistResp extends protobuf.Message<ICheckMatchIsExistResp> {
    constructor(properties: Properties<ICheckMatchIsExistResp>) {
        super(properties);
        if (properties) {
            if (properties.isExist) { this.isExist = properties.isExist }
            if (properties.roomType) { this.roomType = properties.roomType }
            if (properties.refactorVer) { this.refactorVer = properties.refactorVer }
        }
	}
    @protobuf.Field.d(1, "bool", "optional", false)
    public isExist?: boolean|null = false
    @protobuf.Field.d(2, tss_match_v2_common_LiveRoomType, "optional", tss_match_v2_common_LiveRoomType.LiveRoomTypeUnknown)
    public roomType?: tss_match_v2_common_LiveRoomType|null = tss_match_v2_common_LiveRoomType.LiveRoomTypeUnknown
    @protobuf.Field.d(6, tss_match_v2_common_RefactorVer, "optional", tss_match_v2_common_RefactorVer.RefactorVerV1)
    public refactorVer?: tss_match_v2_common_RefactorVer|null = tss_match_v2_common_RefactorVer.RefactorVerV1
}
export interface IPauseUpdatePreMatchReq {
    config?: tss_match_v2_common_IPreMatchConfig
}
@protobuf.Type.d("tss_match_v2_prematch_v1_PauseUpdatePreMatchReq")
export class PauseUpdatePreMatchReq extends protobuf.Message<IPauseUpdatePreMatchReq> {
    constructor(properties: Properties<IPauseUpdatePreMatchReq>) {
        super(properties);
        if (properties) {
            if (properties.config) { this.config = tss_match_v2_common_PreMatchConfig.create(properties.config) as any }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_common_PreMatchConfig", "optional")
    public config?: tss_match_v2_common_PreMatchConfig|null
}
export interface IRestorePreMatchReq {
    preMatchKey?: string|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_RestorePreMatchReq")
export class RestorePreMatchReq extends protobuf.Message<IRestorePreMatchReq> {
    constructor(properties: Properties<IRestorePreMatchReq>) {
        super(properties);
        if (properties) {
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public preMatchKey?: string|null = ""
}
export interface IRestorePreMatchResp {
    newSrvID?: number|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_RestorePreMatchResp")
export class RestorePreMatchResp extends protobuf.Message<IRestorePreMatchResp> {
    constructor(properties: Properties<IRestorePreMatchResp>) {
        super(properties);
        if (properties) {
            if (properties.newSrvID) { this.newSrvID = properties.newSrvID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public newSrvID?: number|null = 0
}
export interface ICreatePreMatchSpecReq {
    config?: tss_match_v2_common_ISpecConfig
}
@protobuf.Type.d("tss_match_v2_prematch_v1_CreatePreMatchSpecReq")
export class CreatePreMatchSpecReq extends protobuf.Message<ICreatePreMatchSpecReq> {
    constructor(properties: Properties<ICreatePreMatchSpecReq>) {
        super(properties);
        if (properties) {
            if (properties.config) { this.config = tss_match_v2_common_SpecConfig.create(properties.config) as any }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_common_SpecConfig", "optional")
    public config?: tss_match_v2_common_SpecConfig|null
}
export interface ICreatePreMatchSpecResp {
}
@protobuf.Type.d("tss_match_v2_prematch_v1_CreatePreMatchSpecResp")
export class CreatePreMatchSpecResp extends protobuf.Message<ICreatePreMatchSpecResp> {
    constructor(properties: Properties<ICreatePreMatchSpecResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IAbortMatchReq {
    schedulerID?: number|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_AbortMatchReq")
export class AbortMatchReq extends protobuf.Message<IAbortMatchReq> {
    constructor(properties: Properties<IAbortMatchReq>) {
        super(properties);
        if (properties) {
            if (properties.schedulerID) { this.schedulerID = properties.schedulerID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public schedulerID?: number|null = 0
}
export interface IAbortMatchResp {
}
@protobuf.Type.d("tss_match_v2_prematch_v1_AbortMatchResp")
export class AbortMatchResp extends protobuf.Message<IAbortMatchResp> {
    constructor(properties: Properties<IAbortMatchResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IPingMatchReq {
    preMatchKey?: string|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_PingMatchReq")
export class PingMatchReq extends protobuf.Message<IPingMatchReq> {
    constructor(properties: Properties<IPingMatchReq>) {
        super(properties);
        if (properties) {
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public preMatchKey?: string|null = ""
}
export interface IReconnectPreMatchReq {
    preMatchKey?: string|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_ReconnectPreMatchReq")
export class ReconnectPreMatchReq extends protobuf.Message<IReconnectPreMatchReq> {
    constructor(properties: Properties<IReconnectPreMatchReq>) {
        super(properties);
        if (properties) {
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public preMatchKey?: string|null = ""
}
export interface IUserInfoV2 {
    users?: IUser[]
}
@protobuf.Type.d("tss_match_v2_prematch_v1_UserInfoV2")
export class UserInfoV2 extends protobuf.Message<IUserInfoV2> {
    constructor(properties: Properties<IUserInfoV2>) {
        super(properties);
        if (properties) {
            if (properties.users) { this.users = []; properties.users.forEach((value, index)=>{this.users[index] = User.create(properties.users[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_prematch_v1_User", "repeated")
    public users?: User[] = []
}
export interface IRoomInfoV2 {
    preMatchInfo?: IPreMatchInfo
    cfgUpdateAt?: number|null
    currentUser?: IUser
}
@protobuf.Type.d("tss_match_v2_prematch_v1_RoomInfoV2")
export class RoomInfoV2 extends protobuf.Message<IRoomInfoV2> {
    constructor(properties: Properties<IRoomInfoV2>) {
        super(properties);
        if (properties) {
            if (properties.preMatchInfo) { this.preMatchInfo = PreMatchInfo.create(properties.preMatchInfo) as any }
            if (properties.cfgUpdateAt) { this.cfgUpdateAt = properties.cfgUpdateAt }
            if (properties.currentUser) { this.currentUser = User.create(properties.currentUser) as any }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_prematch_v1_PreMatchInfo", "optional")
    public preMatchInfo?: PreMatchInfo|null
    @protobuf.Field.d(2, "int64", "optional", 0)
    public cfgUpdateAt?: number|null = 0
    @protobuf.Field.d(3, "tss_match_v2_prematch_v1_User", "optional")
    public currentUser?: User|null
}
export interface IGetMatchByScheduleIDReq {
    schedulerID?: number|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_GetMatchByScheduleIDReq")
export class GetMatchByScheduleIDReq extends protobuf.Message<IGetMatchByScheduleIDReq> {
    constructor(properties: Properties<IGetMatchByScheduleIDReq>) {
        super(properties);
        if (properties) {
            if (properties.schedulerID) { this.schedulerID = properties.schedulerID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public schedulerID?: number|null = 0
}
export interface IMatchBriefInfo {
    preMatchKey?: string|null
    matchName?: string|null
    startAt?: number|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_MatchBriefInfo")
export class MatchBriefInfo extends protobuf.Message<IMatchBriefInfo> {
    constructor(properties: Properties<IMatchBriefInfo>) {
        super(properties);
        if (properties) {
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
            if (properties.matchName) { this.matchName = properties.matchName }
            if (properties.startAt) { this.startAt = properties.startAt }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public preMatchKey?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public matchName?: string|null = ""
    @protobuf.Field.d(3, "int64", "optional", 0)
    public startAt?: number|null = 0
}
export interface IGetMatchByScheduleIDResp {
    infos?: IMatchBriefInfo[]
}
@protobuf.Type.d("tss_match_v2_prematch_v1_GetMatchByScheduleIDResp")
export class GetMatchByScheduleIDResp extends protobuf.Message<IGetMatchByScheduleIDResp> {
    constructor(properties: Properties<IGetMatchByScheduleIDResp>) {
        super(properties);
        if (properties) {
            if (properties.infos) { this.infos = []; properties.infos.forEach((value, index)=>{this.infos[index] = MatchBriefInfo.create(properties.infos[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_prematch_v1_MatchBriefInfo", "repeated")
    public infos?: MatchBriefInfo[] = []
}
export interface IForceShutDownMatchReq {
    preMatchKey?: string|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_ForceShutDownMatchReq")
export class ForceShutDownMatchReq extends protobuf.Message<IForceShutDownMatchReq> {
    constructor(properties: Properties<IForceShutDownMatchReq>) {
        super(properties);
        if (properties) {
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public preMatchKey?: string|null = ""
}
export interface IJoinPreMatchReq {
    preMatchKey?: string|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_JoinPreMatchReq")
export class JoinPreMatchReq extends protobuf.Message<IJoinPreMatchReq> {
    constructor(properties: Properties<IJoinPreMatchReq>) {
        super(properties);
        if (properties) {
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public preMatchKey?: string|null = ""
}
export interface IRoomInfo {
    preMatchInfo?: tss_match_v2_common_IPreMatchInfo
    userInfo?: tss_match_v2_common_IUserInfo
    cfgUpdateAt?: number|null
    userInfoV2?: IUserInfoV2
}
@protobuf.Type.d("tss_match_v2_prematch_v1_RoomInfo")
export class RoomInfo extends protobuf.Message<IRoomInfo> {
    constructor(properties: Properties<IRoomInfo>) {
        super(properties);
        if (properties) {
            if (properties.preMatchInfo) { this.preMatchInfo = tss_match_v2_common_PreMatchInfo.create(properties.preMatchInfo) as any }
            if (properties.userInfo) { this.userInfo = tss_match_v2_common_UserInfo.create(properties.userInfo) as any }
            if (properties.cfgUpdateAt) { this.cfgUpdateAt = properties.cfgUpdateAt }
            if (properties.userInfoV2) { this.userInfoV2 = UserInfoV2.create(properties.userInfoV2) as any }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_common_PreMatchInfo", "optional")
    public preMatchInfo?: tss_match_v2_common_PreMatchInfo|null
    @protobuf.Field.d(2, "tss_match_v2_common_UserInfo", "optional")
    public userInfo?: tss_match_v2_common_UserInfo|null
    @protobuf.Field.d(3, "int64", "optional", 0)
    public cfgUpdateAt?: number|null = 0
    @protobuf.Field.d(4, "tss_match_v2_prematch_v1_UserInfoV2", "optional")
    public userInfoV2?: UserInfoV2|null
}
export interface IJoinPreMatchV2Resp {
    matchKey?: string|null
    srvID?: number|null
    JoinObserver?: boolean|null
    roomInfo?: IRoomInfoV2
    isMatchStart?: boolean|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_JoinPreMatchV2Resp")
export class JoinPreMatchV2Resp extends protobuf.Message<IJoinPreMatchV2Resp> {
    constructor(properties: Properties<IJoinPreMatchV2Resp>) {
        super(properties);
        if (properties) {
            if (properties.matchKey) { this.matchKey = properties.matchKey }
            if (properties.srvID) { this.srvID = properties.srvID }
            if (properties.JoinObserver) { this.JoinObserver = properties.JoinObserver }
            if (properties.roomInfo) { this.roomInfo = RoomInfoV2.create(properties.roomInfo) as any }
            if (properties.isMatchStart) { this.isMatchStart = properties.isMatchStart }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public matchKey?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public srvID?: number|null = 0
    @protobuf.Field.d(3, "bool", "optional", false)
    public JoinObserver?: boolean|null = false
    @protobuf.Field.d(4, "tss_match_v2_prematch_v1_RoomInfoV2", "optional")
    public roomInfo?: RoomInfoV2|null
    @protobuf.Field.d(5, "bool", "optional", false)
    public isMatchStart?: boolean|null = false
}
export interface IGetRoomInfoReq {
    preMatchKey?: string|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_GetRoomInfoReq")
export class GetRoomInfoReq extends protobuf.Message<IGetRoomInfoReq> {
    constructor(properties: Properties<IGetRoomInfoReq>) {
        super(properties);
        if (properties) {
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public preMatchKey?: string|null = ""
}
export interface IGetRoomInfoResp {
    info?: IRoomInfo
}
@protobuf.Type.d("tss_match_v2_prematch_v1_GetRoomInfoResp")
export class GetRoomInfoResp extends protobuf.Message<IGetRoomInfoResp> {
    constructor(properties: Properties<IGetRoomInfoResp>) {
        super(properties);
        if (properties) {
            if (properties.info) { this.info = RoomInfo.create(properties.info) as any }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_prematch_v1_RoomInfo", "optional")
    public info?: RoomInfo|null
}
export interface IGetRoomInfoV2Resp {
    info?: IRoomInfoV2
}
@protobuf.Type.d("tss_match_v2_prematch_v1_GetRoomInfoV2Resp")
export class GetRoomInfoV2Resp extends protobuf.Message<IGetRoomInfoV2Resp> {
    constructor(properties: Properties<IGetRoomInfoV2Resp>) {
        super(properties);
        if (properties) {
            if (properties.info) { this.info = RoomInfoV2.create(properties.info) as any }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_prematch_v1_RoomInfoV2", "optional")
    public info?: RoomInfoV2|null
}
export interface IPreMatchInfo {
    leftDurationToStart?: number|null
    enterUserNum?: number|null
    readyUserNum?: number|null
    roomNo?: string|null
    preMatchKey?: string|null
    roomId?: string|null
    pool?: tss_common_IAsset
    prizePool?: tss_common_IAssetItem[]
    matchStartAt?: number|null
    matchReadyAt?: number|null
    status?: tss_match_v2_common_MatchStatus|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_PreMatchInfo")
export class PreMatchInfo extends protobuf.Message<IPreMatchInfo> {
    constructor(properties: Properties<IPreMatchInfo>) {
        super(properties);
        if (properties) {
            if (properties.leftDurationToStart) { this.leftDurationToStart = properties.leftDurationToStart }
            if (properties.enterUserNum) { this.enterUserNum = properties.enterUserNum }
            if (properties.readyUserNum) { this.readyUserNum = properties.readyUserNum }
            if (properties.roomNo) { this.roomNo = properties.roomNo }
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
            if (properties.roomId) { this.roomId = properties.roomId }
            if (properties.pool) { this.pool = tss_common_Asset.create(properties.pool) as any }
            if (properties.prizePool) { this.prizePool = []; properties.prizePool.forEach((value, index)=>{this.prizePool[index] = tss_common_AssetItem.create(properties.prizePool[index]) as any})}
            if (properties.matchStartAt) { this.matchStartAt = properties.matchStartAt }
            if (properties.matchReadyAt) { this.matchReadyAt = properties.matchReadyAt }
            if (properties.status) { this.status = properties.status }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public leftDurationToStart?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public enterUserNum?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public readyUserNum?: number|null = 0
    @protobuf.Field.d(4, "string", "optional", )
    public roomNo?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public preMatchKey?: string|null = ""
    @protobuf.Field.d(6, "string", "optional", )
    public roomId?: string|null = ""
    @protobuf.Field.d(7, "tss_common_Asset", "optional")
    public pool?: tss_common_Asset|null
    @protobuf.Field.d(8, "tss_common_AssetItem", "repeated")
    public prizePool?: tss_common_AssetItem[] = []
    @protobuf.Field.d(9, "int64", "optional", 0)
    public matchStartAt?: number|null = 0
    @protobuf.Field.d(10, "int64", "optional", 0)
    public matchReadyAt?: number|null = 0
    @protobuf.Field.d(11, tss_match_v2_common_MatchStatus, "optional", tss_match_v2_common_MatchStatus.MatchStatusUnknown)
    public status?: tss_match_v2_common_MatchStatus|null = tss_match_v2_common_MatchStatus.MatchStatusUnknown
}
export interface IReconnectPreMatchResp {
    info?: IRoomInfo
    isMatchStart?: boolean|null
    srvID?: number|null
    matchKey?: string|null
    isOnLook?: boolean|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_ReconnectPreMatchResp")
export class ReconnectPreMatchResp extends protobuf.Message<IReconnectPreMatchResp> {
    constructor(properties: Properties<IReconnectPreMatchResp>) {
        super(properties);
        if (properties) {
            if (properties.info) { this.info = RoomInfo.create(properties.info) as any }
            if (properties.isMatchStart) { this.isMatchStart = properties.isMatchStart }
            if (properties.srvID) { this.srvID = properties.srvID }
            if (properties.matchKey) { this.matchKey = properties.matchKey }
            if (properties.isOnLook) { this.isOnLook = properties.isOnLook }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_prematch_v1_RoomInfo", "optional")
    public info?: RoomInfo|null
    @protobuf.Field.d(2, "bool", "optional", false)
    public isMatchStart?: boolean|null = false
    @protobuf.Field.d(3, "int64", "optional", 0)
    public srvID?: number|null = 0
    @protobuf.Field.d(5, "string", "optional", )
    public matchKey?: string|null = ""
    @protobuf.Field.d(6, "bool", "optional", false)
    public isOnLook?: boolean|null = false
}
export interface IReconnectPreMatchV2Resp {
    info?: IRoomInfoV2
    isMatchStart?: boolean|null
    srvID?: number|null
    matchKey?: string|null
    isOnLook?: boolean|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_ReconnectPreMatchV2Resp")
export class ReconnectPreMatchV2Resp extends protobuf.Message<IReconnectPreMatchV2Resp> {
    constructor(properties: Properties<IReconnectPreMatchV2Resp>) {
        super(properties);
        if (properties) {
            if (properties.info) { this.info = RoomInfoV2.create(properties.info) as any }
            if (properties.isMatchStart) { this.isMatchStart = properties.isMatchStart }
            if (properties.srvID) { this.srvID = properties.srvID }
            if (properties.matchKey) { this.matchKey = properties.matchKey }
            if (properties.isOnLook) { this.isOnLook = properties.isOnLook }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_prematch_v1_RoomInfoV2", "optional")
    public info?: RoomInfoV2|null
    @protobuf.Field.d(2, "bool", "optional", false)
    public isMatchStart?: boolean|null = false
    @protobuf.Field.d(3, "int64", "optional", 0)
    public srvID?: number|null = 0
    @protobuf.Field.d(4, "string", "optional", )
    public matchKey?: string|null = ""
    @protobuf.Field.d(5, "bool", "optional", false)
    public isOnLook?: boolean|null = false
}
export interface IJoinPreMatchResp {
    matchKey?: string|null
    srvID?: number|null
    JoinObserver?: boolean|null
    roomInfo?: IRoomInfo
    isMatchStart?: boolean|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_JoinPreMatchResp")
export class JoinPreMatchResp extends protobuf.Message<IJoinPreMatchResp> {
    constructor(properties: Properties<IJoinPreMatchResp>) {
        super(properties);
        if (properties) {
            if (properties.matchKey) { this.matchKey = properties.matchKey }
            if (properties.srvID) { this.srvID = properties.srvID }
            if (properties.JoinObserver) { this.JoinObserver = properties.JoinObserver }
            if (properties.roomInfo) { this.roomInfo = RoomInfo.create(properties.roomInfo) as any }
            if (properties.isMatchStart) { this.isMatchStart = properties.isMatchStart }
        }
	}
    @protobuf.Field.d(2, "string", "optional", )
    public matchKey?: string|null = ""
    @protobuf.Field.d(3, "int64", "optional", 0)
    public srvID?: number|null = 0
    @protobuf.Field.d(4, "bool", "optional", false)
    public JoinObserver?: boolean|null = false
    @protobuf.Field.d(5, "tss_match_v2_prematch_v1_RoomInfo", "optional")
    public roomInfo?: RoomInfo|null
    @protobuf.Field.d(6, "bool", "optional", false)
    public isMatchStart?: boolean|null = false
}
export interface ILeavePreMatchReq {
    preMatchKey?: string|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_LeavePreMatchReq")
export class LeavePreMatchReq extends protobuf.Message<ILeavePreMatchReq> {
    constructor(properties: Properties<ILeavePreMatchReq>) {
        super(properties);
        if (properties) {
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public preMatchKey?: string|null = ""
}
export interface ILeavePreMatchResp {
    code?: tss_match_v2_common_Code|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_LeavePreMatchResp")
export class LeavePreMatchResp extends protobuf.Message<ILeavePreMatchResp> {
    constructor(properties: Properties<ILeavePreMatchResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
        }
	}
    @protobuf.Field.d(1, tss_match_v2_common_Code, "optional", tss_match_v2_common_Code.CodeOk)
    public code?: tss_match_v2_common_Code|null = tss_match_v2_common_Code.CodeOk
}
export interface IEnterPreMatchReq {
    entryToken?: string|null
    isWatchAds?: boolean|null
    preMatchKey?: string|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_EnterPreMatchReq")
export class EnterPreMatchReq extends protobuf.Message<IEnterPreMatchReq> {
    constructor(properties: Properties<IEnterPreMatchReq>) {
        super(properties);
        if (properties) {
            if (properties.entryToken) { this.entryToken = properties.entryToken }
            if (properties.isWatchAds) { this.isWatchAds = properties.isWatchAds }
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public entryToken?: string|null = ""
    @protobuf.Field.d(3, "bool", "optional", false)
    public isWatchAds?: boolean|null = false
    @protobuf.Field.d(5, "string", "optional", )
    public preMatchKey?: string|null = ""
}
export interface IEnterPreMatchResp {
    code?: tss_match_v2_common_Code|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_EnterPreMatchResp")
export class EnterPreMatchResp extends protobuf.Message<IEnterPreMatchResp> {
    constructor(properties: Properties<IEnterPreMatchResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
        }
	}
    @protobuf.Field.d(1, tss_match_v2_common_Code, "optional", tss_match_v2_common_Code.CodeOk)
    public code?: tss_match_v2_common_Code|null = tss_match_v2_common_Code.CodeOk
}
export interface ICancelEnterPreMatchReq {
    preMatchKey?: string|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_CancelEnterPreMatchReq")
export class CancelEnterPreMatchReq extends protobuf.Message<ICancelEnterPreMatchReq> {
    constructor(properties: Properties<ICancelEnterPreMatchReq>) {
        super(properties);
        if (properties) {
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public preMatchKey?: string|null = ""
}
export interface ICancelEnterPreMatchResp {
    ID?: number|null
    matchStartAt?: number|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_CancelEnterPreMatchResp")
export class CancelEnterPreMatchResp extends protobuf.Message<ICancelEnterPreMatchResp> {
    constructor(properties: Properties<ICancelEnterPreMatchResp>) {
        super(properties);
        if (properties) {
            if (properties.ID) { this.ID = properties.ID }
            if (properties.matchStartAt) { this.matchStartAt = properties.matchStartAt }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public ID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public matchStartAt?: number|null = 0
}
export interface IMsgMatchAboutToStart {
    leftDuration?: number|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_MsgMatchAboutToStart")
export class MsgMatchAboutToStart extends protobuf.Message<IMsgMatchAboutToStart> {
    constructor(properties: Properties<IMsgMatchAboutToStart>) {
        super(properties);
        if (properties) {
            if (properties.leftDuration) { this.leftDuration = properties.leftDuration }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public leftDuration?: number|null = 0
}
export interface IMsgJoinObserver {
    matchKey?: string|null
    roomInfo?: IRoomInfo
    srvID?: number|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_MsgJoinObserver")
export class MsgJoinObserver extends protobuf.Message<IMsgJoinObserver> {
    constructor(properties: Properties<IMsgJoinObserver>) {
        super(properties);
        if (properties) {
            if (properties.matchKey) { this.matchKey = properties.matchKey }
            if (properties.roomInfo) { this.roomInfo = RoomInfo.create(properties.roomInfo) as any }
            if (properties.srvID) { this.srvID = properties.srvID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public matchKey?: string|null = ""
    @protobuf.Field.d(2, "tss_match_v2_prematch_v1_RoomInfo", "optional")
    public roomInfo?: RoomInfo|null
    @protobuf.Field.d(3, "int64", "optional", 0)
    public srvID?: number|null = 0
}
export interface IReconnectResp {
}
@protobuf.Type.d("tss_match_v2_prematch_v1_ReconnectResp")
export class ReconnectResp extends protobuf.Message<IReconnectResp> {
    constructor(properties: Properties<IReconnectResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IMsgRoomInfo {
    roomInfo?: IRoomInfo
    srvID?: number|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_MsgRoomInfo")
export class MsgRoomInfo extends protobuf.Message<IMsgRoomInfo> {
    constructor(properties: Properties<IMsgRoomInfo>) {
        super(properties);
        if (properties) {
            if (properties.roomInfo) { this.roomInfo = RoomInfo.create(properties.roomInfo) as any }
            if (properties.srvID) { this.srvID = properties.srvID }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_prematch_v1_RoomInfo", "optional")
    public roomInfo?: RoomInfo|null
    @protobuf.Field.d(2, "int64", "optional", 0)
    public srvID?: number|null = 0
}
export interface IMsgRoomInfoV2 {
    roomInfo?: IRoomInfoV2
    srvID?: number|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_MsgRoomInfoV2")
export class MsgRoomInfoV2 extends protobuf.Message<IMsgRoomInfoV2> {
    constructor(properties: Properties<IMsgRoomInfoV2>) {
        super(properties);
        if (properties) {
            if (properties.roomInfo) { this.roomInfo = RoomInfoV2.create(properties.roomInfo) as any }
            if (properties.srvID) { this.srvID = properties.srvID }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_prematch_v1_RoomInfoV2", "optional")
    public roomInfo?: RoomInfoV2|null
    @protobuf.Field.d(2, "int64", "optional", 0)
    public srvID?: number|null = 0
}
export interface IMsgUserJoin {
    uid?: number|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_MsgUserJoin")
export class MsgUserJoin extends protobuf.Message<IMsgUserJoin> {
    constructor(properties: Properties<IMsgUserJoin>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IMsgUserLeave {
    uid?: number|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_MsgUserLeave")
export class MsgUserLeave extends protobuf.Message<IMsgUserLeave> {
    constructor(properties: Properties<IMsgUserLeave>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IMsgUserEnter {
    user?: tss_match_v2_common_IUser
}
@protobuf.Type.d("tss_match_v2_prematch_v1_MsgUserEnter")
export class MsgUserEnter extends protobuf.Message<IMsgUserEnter> {
    constructor(properties: Properties<IMsgUserEnter>) {
        super(properties);
        if (properties) {
            if (properties.user) { this.user = tss_match_v2_common_User.create(properties.user) as any }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_common_User", "optional")
    public user?: tss_match_v2_common_User|null
}
export interface IMsgUserEnterV2 {
    uid?: number|null
    EnterAt?: number|null
    isRobot?: boolean|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_MsgUserEnterV2")
export class MsgUserEnterV2 extends protobuf.Message<IMsgUserEnterV2> {
    constructor(properties: Properties<IMsgUserEnterV2>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.EnterAt) { this.EnterAt = properties.EnterAt }
            if (properties.isRobot) { this.isRobot = properties.isRobot }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public EnterAt?: number|null = 0
    @protobuf.Field.d(3, "bool", "optional", false)
    public isRobot?: boolean|null = false
}
export interface IMsgUserCancelEnter {
    uid?: number|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_MsgUserCancelEnter")
export class MsgUserCancelEnter extends protobuf.Message<IMsgUserCancelEnter> {
    constructor(properties: Properties<IMsgUserCancelEnter>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IMsgAllOnlineUserStarting {
    joinUsers?: number[]
    matchName?: string|null
    preMatchKey?: string|null
    leftDurationToStart?: number|null
    srvID?: number|null
    championAsset?: tss_common_IAsset
    rangeAwardImage?: string|null
    rangeAwardName?: string|null
    schedulerID?: number|null
    entryConfig?: tss_match_v2_common_IEntryConfig
    listApplicationIds?: string[]
    prizePool?: tss_common_IAssetItem[]
    refactorVer?: tss_match_v2_common_RefactorVer|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_MsgAllOnlineUserStarting")
export class MsgAllOnlineUserStarting extends protobuf.Message<IMsgAllOnlineUserStarting> {
    constructor(properties: Properties<IMsgAllOnlineUserStarting>) {
        super(properties);
        if (properties) {
            if (properties.joinUsers) { this.joinUsers = []; properties.joinUsers.forEach((value, index)=>{this.joinUsers[index] = properties.joinUsers[index]})}
            if (properties.matchName) { this.matchName = properties.matchName }
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
            if (properties.leftDurationToStart) { this.leftDurationToStart = properties.leftDurationToStart }
            if (properties.srvID) { this.srvID = properties.srvID }
            if (properties.championAsset) { this.championAsset = tss_common_Asset.create(properties.championAsset) as any }
            if (properties.rangeAwardImage) { this.rangeAwardImage = properties.rangeAwardImage }
            if (properties.rangeAwardName) { this.rangeAwardName = properties.rangeAwardName }
            if (properties.schedulerID) { this.schedulerID = properties.schedulerID }
            if (properties.entryConfig) { this.entryConfig = tss_match_v2_common_EntryConfig.create(properties.entryConfig) as any }
            if (properties.listApplicationIds) { this.listApplicationIds = []; properties.listApplicationIds.forEach((value, index)=>{this.listApplicationIds[index] = properties.listApplicationIds[index]})}
            if (properties.prizePool) { this.prizePool = []; properties.prizePool.forEach((value, index)=>{this.prizePool[index] = tss_common_AssetItem.create(properties.prizePool[index]) as any})}
            if (properties.refactorVer) { this.refactorVer = properties.refactorVer }
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public joinUsers?: number[] = []
    @protobuf.Field.d(2, "string", "optional", )
    public matchName?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public preMatchKey?: string|null = ""
    @protobuf.Field.d(4, "int64", "optional", 0)
    public leftDurationToStart?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public srvID?: number|null = 0
    @protobuf.Field.d(6, "tss_common_Asset", "optional")
    public championAsset?: tss_common_Asset|null
    @protobuf.Field.d(7, "string", "optional", )
    public rangeAwardImage?: string|null = ""
    @protobuf.Field.d(8, "string", "optional", )
    public rangeAwardName?: string|null = ""
    @protobuf.Field.d(9, "int64", "optional", 0)
    public schedulerID?: number|null = 0
    @protobuf.Field.d(10, "tss_match_v2_common_EntryConfig", "optional")
    public entryConfig?: tss_match_v2_common_EntryConfig|null
    @protobuf.Field.d(11, "string", "repeated", [])
    public listApplicationIds?: string[] = []
    @protobuf.Field.d(12, "tss_common_AssetItem", "repeated")
    public prizePool?: tss_common_AssetItem[] = []
    @protobuf.Field.d(16, tss_match_v2_common_RefactorVer, "optional", tss_match_v2_common_RefactorVer.RefactorVerV1)
    public refactorVer?: tss_match_v2_common_RefactorVer|null = tss_match_v2_common_RefactorVer.RefactorVerV1
}
export interface IMsgUserReady {
    uid?: number|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_MsgUserReady")
export class MsgUserReady extends protobuf.Message<IMsgUserReady> {
    constructor(properties: Properties<IMsgUserReady>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(2, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IMsgUserCancelReady {
    uid?: number|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_MsgUserCancelReady")
export class MsgUserCancelReady extends protobuf.Message<IMsgUserCancelReady> {
    constructor(properties: Properties<IMsgUserCancelReady>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(2, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IMsgUserMatchPrepare {
    leftDurationToStart?: number|null
    preMatchKey?: string|null
    matchName?: string|null
    srvID?: number|null
    startTime?: number|null
    refactorVer?: tss_match_v2_common_RefactorVer|null
    schedulerID?: number|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_MsgUserMatchPrepare")
export class MsgUserMatchPrepare extends protobuf.Message<IMsgUserMatchPrepare> {
    constructor(properties: Properties<IMsgUserMatchPrepare>) {
        super(properties);
        if (properties) {
            if (properties.leftDurationToStart) { this.leftDurationToStart = properties.leftDurationToStart }
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
            if (properties.matchName) { this.matchName = properties.matchName }
            if (properties.srvID) { this.srvID = properties.srvID }
            if (properties.startTime) { this.startTime = properties.startTime }
            if (properties.refactorVer) { this.refactorVer = properties.refactorVer }
            if (properties.schedulerID) { this.schedulerID = properties.schedulerID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public leftDurationToStart?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public preMatchKey?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public matchName?: string|null = ""
    @protobuf.Field.d(4, "int64", "optional", 0)
    public srvID?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public startTime?: number|null = 0
    @protobuf.Field.d(6, tss_match_v2_common_RefactorVer, "optional", tss_match_v2_common_RefactorVer.RefactorVerV1)
    public refactorVer?: tss_match_v2_common_RefactorVer|null = tss_match_v2_common_RefactorVer.RefactorVerV1
    @protobuf.Field.d(7, "int64", "optional", 0)
    public schedulerID?: number|null = 0
}
export interface IDisbandPreMatchReq {
    preMatchKey?: string|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_DisbandPreMatchReq")
export class DisbandPreMatchReq extends protobuf.Message<IDisbandPreMatchReq> {
    constructor(properties: Properties<IDisbandPreMatchReq>) {
        super(properties);
        if (properties) {
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public preMatchKey?: string|null = ""
}
export interface IDisbandPreMatchResp {
}
@protobuf.Type.d("tss_match_v2_prematch_v1_DisbandPreMatchResp")
export class DisbandPreMatchResp extends protobuf.Message<IDisbandPreMatchResp> {
    constructor(properties: Properties<IDisbandPreMatchResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IListPreMatchJoinedUidReq {
    preMatchKey?: string|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_ListPreMatchJoinedUidReq")
export class ListPreMatchJoinedUidReq extends protobuf.Message<IListPreMatchJoinedUidReq> {
    constructor(properties: Properties<IListPreMatchJoinedUidReq>) {
        super(properties);
        if (properties) {
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public preMatchKey?: string|null = ""
}
export interface IListPreMatchJoinedUidResp {
    uid?: number[]
}
@protobuf.Type.d("tss_match_v2_prematch_v1_ListPreMatchJoinedUidResp")
export class ListPreMatchJoinedUidResp extends protobuf.Message<IListPreMatchJoinedUidResp> {
    constructor(properties: Properties<IListPreMatchJoinedUidResp>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = []; properties.uid.forEach((value, index)=>{this.uid[index] = properties.uid[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public uid?: number[] = []
}
export interface IReadyReq {
    preMatchKey?: string|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_ReadyReq")
export class ReadyReq extends protobuf.Message<IReadyReq> {
    constructor(properties: Properties<IReadyReq>) {
        super(properties);
        if (properties) {
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public preMatchKey?: string|null = ""
}
export interface IReadyResp {
    code?: tss_match_v2_common_Code|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_ReadyResp")
export class ReadyResp extends protobuf.Message<IReadyResp> {
    constructor(properties: Properties<IReadyResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
        }
	}
    @protobuf.Field.d(1, tss_match_v2_common_Code, "optional", tss_match_v2_common_Code.CodeOk)
    public code?: tss_match_v2_common_Code|null = tss_match_v2_common_Code.CodeOk
}
export interface ICancelReadyReq {
    preMatchKey?: string|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_CancelReadyReq")
export class CancelReadyReq extends protobuf.Message<ICancelReadyReq> {
    constructor(properties: Properties<ICancelReadyReq>) {
        super(properties);
        if (properties) {
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public preMatchKey?: string|null = ""
}
export interface IApplyRobotReq {
    preMatchKey?: string|null
    applyNum?: number|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_ApplyRobotReq")
export class ApplyRobotReq extends protobuf.Message<IApplyRobotReq> {
    constructor(properties: Properties<IApplyRobotReq>) {
        super(properties);
        if (properties) {
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
            if (properties.applyNum) { this.applyNum = properties.applyNum }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public preMatchKey?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public applyNum?: number|null = 0
}
export interface IMsgJumpMatchPrompt {
    srvID?: number|null
    preMatchKey?: string|null
    matchName?: string|null
    startAt?: number|null
    leftSecond?: number|null
    refactorVer?: tss_match_v2_common_RefactorVer|null
    schedulerID?: number|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_MsgJumpMatchPrompt")
export class MsgJumpMatchPrompt extends protobuf.Message<IMsgJumpMatchPrompt> {
    constructor(properties: Properties<IMsgJumpMatchPrompt>) {
        super(properties);
        if (properties) {
            if (properties.srvID) { this.srvID = properties.srvID }
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
            if (properties.matchName) { this.matchName = properties.matchName }
            if (properties.startAt) { this.startAt = properties.startAt }
            if (properties.leftSecond) { this.leftSecond = properties.leftSecond }
            if (properties.refactorVer) { this.refactorVer = properties.refactorVer }
            if (properties.schedulerID) { this.schedulerID = properties.schedulerID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public srvID?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public preMatchKey?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public matchName?: string|null = ""
    @protobuf.Field.d(4, "int64", "optional", 0)
    public startAt?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public leftSecond?: number|null = 0
    @protobuf.Field.d(6, tss_match_v2_common_RefactorVer, "optional", tss_match_v2_common_RefactorVer.RefactorVerV1)
    public refactorVer?: tss_match_v2_common_RefactorVer|null = tss_match_v2_common_RefactorVer.RefactorVerV1
    @protobuf.Field.d(7, "int64", "optional", 0)
    public schedulerID?: number|null = 0
}
export interface IMsgJumpMatchStartResult {
    isSuccess?: boolean|null
    srvID?: number|null
    preMatchKey?: string|null
    matchName?: string|null
    refactorVer?: tss_match_v2_common_RefactorVer|null
    schedulerID?: number|null
    cfgUpdateAt?: number|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_MsgJumpMatchStartResult")
export class MsgJumpMatchStartResult extends protobuf.Message<IMsgJumpMatchStartResult> {
    constructor(properties: Properties<IMsgJumpMatchStartResult>) {
        super(properties);
        if (properties) {
            if (properties.isSuccess) { this.isSuccess = properties.isSuccess }
            if (properties.srvID) { this.srvID = properties.srvID }
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
            if (properties.matchName) { this.matchName = properties.matchName }
            if (properties.refactorVer) { this.refactorVer = properties.refactorVer }
            if (properties.schedulerID) { this.schedulerID = properties.schedulerID }
            if (properties.cfgUpdateAt) { this.cfgUpdateAt = properties.cfgUpdateAt }
        }
	}
    @protobuf.Field.d(1, "bool", "optional", false)
    public isSuccess?: boolean|null = false
    @protobuf.Field.d(2, "int64", "optional", 0)
    public srvID?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public preMatchKey?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public matchName?: string|null = ""
    @protobuf.Field.d(6, tss_match_v2_common_RefactorVer, "optional", tss_match_v2_common_RefactorVer.RefactorVerV1)
    public refactorVer?: tss_match_v2_common_RefactorVer|null = tss_match_v2_common_RefactorVer.RefactorVerV1
    @protobuf.Field.d(7, "int64", "optional", 0)
    public schedulerID?: number|null = 0
    @protobuf.Field.d(8, "int64", "optional", 0)
    public cfgUpdateAt?: number|null = 0
}
export interface IMsgMatchStartResult {
    isSuccess?: boolean|null
    srvID?: number|null
    matchKey?: string|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_MsgMatchStartResult")
export class MsgMatchStartResult extends protobuf.Message<IMsgMatchStartResult> {
    constructor(properties: Properties<IMsgMatchStartResult>) {
        super(properties);
        if (properties) {
            if (properties.isSuccess) { this.isSuccess = properties.isSuccess }
            if (properties.srvID) { this.srvID = properties.srvID }
            if (properties.matchKey) { this.matchKey = properties.matchKey }
        }
	}
    @protobuf.Field.d(1, "bool", "optional", false)
    public isSuccess?: boolean|null = false
    @protobuf.Field.d(2, "int64", "optional", 0)
    public srvID?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public matchKey?: string|null = ""
}
export interface IMsgConfigUpdate {
}
@protobuf.Type.d("tss_match_v2_prematch_v1_MsgConfigUpdate")
export class MsgConfigUpdate extends protobuf.Message<IMsgConfigUpdate> {
    constructor(properties: Properties<IMsgConfigUpdate>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IMsgReleaseRobot {
    preMatchKey?: string|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_MsgReleaseRobot")
export class MsgReleaseRobot extends protobuf.Message<IMsgReleaseRobot> {
    constructor(properties: Properties<IMsgReleaseRobot>) {
        super(properties);
        if (properties) {
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public preMatchKey?: string|null = ""
}
export interface IMsgPreMatchDisband {
}
@protobuf.Type.d("tss_match_v2_prematch_v1_MsgPreMatchDisband")
export class MsgPreMatchDisband extends protobuf.Message<IMsgPreMatchDisband> {
    constructor(properties: Properties<IMsgPreMatchDisband>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IMsgStartMatchLock {
}
@protobuf.Type.d("tss_match_v2_prematch_v1_MsgStartMatchLock")
export class MsgStartMatchLock extends protobuf.Message<IMsgStartMatchLock> {
    constructor(properties: Properties<IMsgStartMatchLock>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IGetJumpMatchReq {
    uid?: number|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_GetJumpMatchReq")
export class GetJumpMatchReq extends protobuf.Message<IGetJumpMatchReq> {
    constructor(properties: Properties<IGetJumpMatchReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IGetJumpMatchResp {
    code?: number|null
    srvID?: number|null
    preMatchKey?: string|null
    schedulerID?: number|null
    refactorVer?: tss_match_v2_common_RefactorVer|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_GetJumpMatchResp")
export class GetJumpMatchResp extends protobuf.Message<IGetJumpMatchResp> {
    constructor(properties: Properties<IGetJumpMatchResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.srvID) { this.srvID = properties.srvID }
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
            if (properties.schedulerID) { this.schedulerID = properties.schedulerID }
            if (properties.refactorVer) { this.refactorVer = properties.refactorVer }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public code?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public srvID?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public preMatchKey?: string|null = ""
    @protobuf.Field.d(4, "int64", "optional", 0)
    public schedulerID?: number|null = 0
    @protobuf.Field.d(6, tss_match_v2_common_RefactorVer, "optional", tss_match_v2_common_RefactorVer.RefactorVerV1)
    public refactorVer?: tss_match_v2_common_RefactorVer|null = tss_match_v2_common_RefactorVer.RefactorVerV1
}
export interface IListUserEnteredMatchesReq {
    uid?: number|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_ListUserEnteredMatchesReq")
export class ListUserEnteredMatchesReq extends protobuf.Message<IListUserEnteredMatchesReq> {
    constructor(properties: Properties<IListUserEnteredMatchesReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IListUserEnteredMatchesResp {
    preMatchKeys?: string[]
}
@protobuf.Type.d("tss_match_v2_prematch_v1_ListUserEnteredMatchesResp")
export class ListUserEnteredMatchesResp extends protobuf.Message<IListUserEnteredMatchesResp> {
    constructor(properties: Properties<IListUserEnteredMatchesResp>) {
        super(properties);
        if (properties) {
            if (properties.preMatchKeys) { this.preMatchKeys = []; properties.preMatchKeys.forEach((value, index)=>{this.preMatchKeys[index] = properties.preMatchKeys[index]})}
        }
	}
    @protobuf.Field.d(1, "string", "repeated", [])
    public preMatchKeys?: string[] = []
}
export interface IListMatchEnterUsersReq {
    preMatchKey?: string|null
}
@protobuf.Type.d("tss_match_v2_prematch_v1_ListMatchEnterUsersReq")
export class ListMatchEnterUsersReq extends protobuf.Message<IListMatchEnterUsersReq> {
    constructor(properties: Properties<IListMatchEnterUsersReq>) {
        super(properties);
        if (properties) {
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public preMatchKey?: string|null = ""
}
export interface IListMatchEnterUsersResp {
    uids?: number[]
}
@protobuf.Type.d("tss_match_v2_prematch_v1_ListMatchEnterUsersResp")
export class ListMatchEnterUsersResp extends protobuf.Message<IListMatchEnterUsersResp> {
    constructor(properties: Properties<IListMatchEnterUsersResp>) {
        super(properties);
        if (properties) {
            if (properties.uids) { this.uids = []; properties.uids.forEach((value, index)=>{this.uids[index] = properties.uids[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public uids?: number[] = []
}
class $PreMatchService extends RpcService {
    async CreateOfficialPreMatch(req: ICreatePreMatchReq, params?: RpcParams) : Promise<{err:number, resp:ICreatePreMatchResp}> {
        let data = CreatePreMatchReq.create(req)
        this.onBeforeReq("CreateOfficialPreMatch", data, params)
        const buffer = CreatePreMatchReq.encode(data).finish()
        let [err, pack] = await this.call("CreateOfficialPreMatch", buffer, params)
        if (err) {
            this.onBeforeResp("CreateOfficialPreMatch", err)
            return {err: err, resp: null}
        } else {
            let resp = CreatePreMatchResp.decode(pack) as any
            this.onBeforeResp("CreateOfficialPreMatch", err, resp)
            return {err: null, resp: resp}
        }
    }
    async JoinPreMatch(req: IJoinPreMatchReq, params?: RpcParams) : Promise<{err:number, resp:IJoinPreMatchResp}> {
        let data = JoinPreMatchReq.create(req)
        this.onBeforeReq("JoinPreMatch", data, params)
        const buffer = JoinPreMatchReq.encode(data).finish()
        let [err, pack] = await this.call("JoinPreMatch", buffer, params)
        if (err) {
            this.onBeforeResp("JoinPreMatch", err)
            return {err: err, resp: null}
        } else {
            let resp = JoinPreMatchResp.decode(pack) as any
            this.onBeforeResp("JoinPreMatch", err, resp)
            return {err: null, resp: resp}
        }
    }
    async JoinPreMatchV2(req: IJoinPreMatchReq, params?: RpcParams) : Promise<{err:number, resp:IJoinPreMatchV2Resp}> {
        let data = JoinPreMatchReq.create(req)
        this.onBeforeReq("JoinPreMatchV2", data, params)
        const buffer = JoinPreMatchReq.encode(data).finish()
        let [err, pack] = await this.call("JoinPreMatchV2", buffer, params)
        if (err) {
            this.onBeforeResp("JoinPreMatchV2", err)
            return {err: err, resp: null}
        } else {
            let resp = JoinPreMatchV2Resp.decode(pack) as any
            this.onBeforeResp("JoinPreMatchV2", err, resp)
            return {err: null, resp: resp}
        }
    }
    async EnterPreMatch(req: IEnterPreMatchReq, params?: RpcParams) : Promise<{err:number, resp:IEnterPreMatchResp}> {
        let data = EnterPreMatchReq.create(req)
        this.onBeforeReq("EnterPreMatch", data, params)
        const buffer = EnterPreMatchReq.encode(data).finish()
        let [err, pack] = await this.call("EnterPreMatch", buffer, params)
        if (err) {
            this.onBeforeResp("EnterPreMatch", err)
            return {err: err, resp: null}
        } else {
            let resp = EnterPreMatchResp.decode(pack) as any
            this.onBeforeResp("EnterPreMatch", err, resp)
            return {err: null, resp: resp}
        }
    }
    async CancelEnterPreMatch(req: ICancelEnterPreMatchReq, params?: RpcParams) : Promise<{err:number, resp:ICancelEnterPreMatchResp}> {
        let data = CancelEnterPreMatchReq.create(req)
        this.onBeforeReq("CancelEnterPreMatch", data, params)
        const buffer = CancelEnterPreMatchReq.encode(data).finish()
        let [err, pack] = await this.call("CancelEnterPreMatch", buffer, params)
        if (err) {
            this.onBeforeResp("CancelEnterPreMatch", err)
            return {err: err, resp: null}
        } else {
            let resp = CancelEnterPreMatchResp.decode(pack) as any
            this.onBeforeResp("CancelEnterPreMatch", err, resp)
            return {err: null, resp: resp}
        }
    }
    async Ready(req: IReadyReq, params?: RpcParams) : Promise<{err:number, resp:IReadyResp}> {
        let data = ReadyReq.create(req)
        this.onBeforeReq("Ready", data, params)
        const buffer = ReadyReq.encode(data).finish()
        let [err, pack] = await this.call("Ready", buffer, params)
        if (err) {
            this.onBeforeResp("Ready", err)
            return {err: err, resp: null}
        } else {
            let resp = ReadyResp.decode(pack) as any
            this.onBeforeResp("Ready", err, resp)
            return {err: null, resp: resp}
        }
    }
    async CancelReady(req: ICancelReadyReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = CancelReadyReq.create(req)
        this.onBeforeReq("CancelReady", data, params)
        const buffer = CancelReadyReq.encode(data).finish()
        let [err, pack] = await this.call("CancelReady", buffer, params)
        if (err) {
            this.onBeforeResp("CancelReady", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("CancelReady", err, resp)
            return {err: null, resp: resp}
        }
    }
    async PauseUpdatePreMatch(req: IPauseUpdatePreMatchReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = PauseUpdatePreMatchReq.create(req)
        this.onBeforeReq("PauseUpdatePreMatch", data, params)
        const buffer = PauseUpdatePreMatchReq.encode(data).finish()
        let [err, pack] = await this.call("PauseUpdatePreMatch", buffer, params)
        if (err) {
            this.onBeforeResp("PauseUpdatePreMatch", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("PauseUpdatePreMatch", err, resp)
            return {err: null, resp: resp}
        }
    }
    async AbortMatch(req: IAbortMatchReq, params?: RpcParams) : Promise<{err:number, resp:IAbortMatchResp}> {
        let data = AbortMatchReq.create(req)
        this.onBeforeReq("AbortMatch", data, params)
        const buffer = AbortMatchReq.encode(data).finish()
        let [err, pack] = await this.call("AbortMatch", buffer, params)
        if (err) {
            this.onBeforeResp("AbortMatch", err)
            return {err: err, resp: null}
        } else {
            let resp = AbortMatchResp.decode(pack) as any
            this.onBeforeResp("AbortMatch", err, resp)
            return {err: null, resp: resp}
        }
    }
    async PingMatch(req: IPingMatchReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = PingMatchReq.create(req)
        this.onBeforeReq("PingMatch", data, params)
        const buffer = PingMatchReq.encode(data).finish()
        let [err, pack] = await this.call("PingMatch", buffer, params)
        if (err) {
            this.onBeforeResp("PingMatch", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("PingMatch", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ReconnectPreMatch(req: IReconnectPreMatchReq, params?: RpcParams) : Promise<{err:number, resp:IReconnectPreMatchResp}> {
        let data = ReconnectPreMatchReq.create(req)
        this.onBeforeReq("ReconnectPreMatch", data, params)
        const buffer = ReconnectPreMatchReq.encode(data).finish()
        let [err, pack] = await this.call("ReconnectPreMatch", buffer, params)
        if (err) {
            this.onBeforeResp("ReconnectPreMatch", err)
            return {err: err, resp: null}
        } else {
            let resp = ReconnectPreMatchResp.decode(pack) as any
            this.onBeforeResp("ReconnectPreMatch", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ReconnectPreMatchV2(req: IReconnectPreMatchReq, params?: RpcParams) : Promise<{err:number, resp:IReconnectPreMatchV2Resp}> {
        let data = ReconnectPreMatchReq.create(req)
        this.onBeforeReq("ReconnectPreMatchV2", data, params)
        const buffer = ReconnectPreMatchReq.encode(data).finish()
        let [err, pack] = await this.call("ReconnectPreMatchV2", buffer, params)
        if (err) {
            this.onBeforeResp("ReconnectPreMatchV2", err)
            return {err: err, resp: null}
        } else {
            let resp = ReconnectPreMatchV2Resp.decode(pack) as any
            this.onBeforeResp("ReconnectPreMatchV2", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetMatchByScheduleID(req: IGetMatchByScheduleIDReq, params?: RpcParams) : Promise<{err:number, resp:IGetMatchByScheduleIDResp}> {
        let data = GetMatchByScheduleIDReq.create(req)
        this.onBeforeReq("GetMatchByScheduleID", data, params)
        const buffer = GetMatchByScheduleIDReq.encode(data).finish()
        let [err, pack] = await this.call("GetMatchByScheduleID", buffer, params)
        if (err) {
            this.onBeforeResp("GetMatchByScheduleID", err)
            return {err: err, resp: null}
        } else {
            let resp = GetMatchByScheduleIDResp.decode(pack) as any
            this.onBeforeResp("GetMatchByScheduleID", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetRoomInfo(req: IGetRoomInfoReq, params?: RpcParams) : Promise<{err:number, resp:IGetRoomInfoResp}> {
        let data = GetRoomInfoReq.create(req)
        this.onBeforeReq("GetRoomInfo", data, params)
        const buffer = GetRoomInfoReq.encode(data).finish()
        let [err, pack] = await this.call("GetRoomInfo", buffer, params)
        if (err) {
            this.onBeforeResp("GetRoomInfo", err)
            return {err: err, resp: null}
        } else {
            let resp = GetRoomInfoResp.decode(pack) as any
            this.onBeforeResp("GetRoomInfo", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetRoomInfoV2(req: IGetRoomInfoReq, params?: RpcParams) : Promise<{err:number, resp:IGetRoomInfoV2Resp}> {
        let data = GetRoomInfoReq.create(req)
        this.onBeforeReq("GetRoomInfoV2", data, params)
        const buffer = GetRoomInfoReq.encode(data).finish()
        let [err, pack] = await this.call("GetRoomInfoV2", buffer, params)
        if (err) {
            this.onBeforeResp("GetRoomInfoV2", err)
            return {err: err, resp: null}
        } else {
            let resp = GetRoomInfoV2Resp.decode(pack) as any
            this.onBeforeResp("GetRoomInfoV2", err, resp)
            return {err: null, resp: resp}
        }
    }
    async LeavePreMatch(req: ILeavePreMatchReq, params?: RpcParams) : Promise<{err:number, resp:ILeavePreMatchResp}> {
        let data = LeavePreMatchReq.create(req)
        this.onBeforeReq("LeavePreMatch", data, params)
        const buffer = LeavePreMatchReq.encode(data).finish()
        let [err, pack] = await this.call("LeavePreMatch", buffer, params)
        if (err) {
            this.onBeforeResp("LeavePreMatch", err)
            return {err: err, resp: null}
        } else {
            let resp = LeavePreMatchResp.decode(pack) as any
            this.onBeforeResp("LeavePreMatch", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListPreMatchJoinedUid(req: IListPreMatchJoinedUidReq, params?: RpcParams) : Promise<{err:number, resp:IListPreMatchJoinedUidResp}> {
        let data = ListPreMatchJoinedUidReq.create(req)
        this.onBeforeReq("ListPreMatchJoinedUid", data, params)
        const buffer = ListPreMatchJoinedUidReq.encode(data).finish()
        let [err, pack] = await this.call("ListPreMatchJoinedUid", buffer, params)
        if (err) {
            this.onBeforeResp("ListPreMatchJoinedUid", err)
            return {err: err, resp: null}
        } else {
            let resp = ListPreMatchJoinedUidResp.decode(pack) as any
            this.onBeforeResp("ListPreMatchJoinedUid", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ApplyRobot(req: IApplyRobotReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = ApplyRobotReq.create(req)
        this.onBeforeReq("ApplyRobot", data, params)
        const buffer = ApplyRobotReq.encode(data).finish()
        let [err, pack] = await this.call("ApplyRobot", buffer, params)
        if (err) {
            this.onBeforeResp("ApplyRobot", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("ApplyRobot", err, resp)
            return {err: null, resp: resp}
        }
    }
    async InformUserOffline(req: bgo_component_IUesrOffLine, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = bgo_component_UesrOffLine.create(req)
        this.onBeforeReq("InformUserOffline", data, params)
        const buffer = bgo_component_UesrOffLine.encode(data).finish()
        let [err, pack] = await this.call("InformUserOffline", buffer, params)
        if (err) {
            this.onBeforeResp("InformUserOffline", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("InformUserOffline", err, resp)
            return {err: null, resp: resp}
        }
    }
    async InformUserOnline(req: bgo_component_IUesrOnLine, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = bgo_component_UesrOnLine.create(req)
        this.onBeforeReq("InformUserOnline", data, params)
        const buffer = bgo_component_UesrOnLine.encode(data).finish()
        let [err, pack] = await this.call("InformUserOnline", buffer, params)
        if (err) {
            this.onBeforeResp("InformUserOnline", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("InformUserOnline", err, resp)
            return {err: null, resp: resp}
        }
    }
    async CheckMatchIsExist(req: ICheckMatchIsExistReq, params?: RpcParams) : Promise<{err:number, resp:ICheckMatchIsExistResp}> {
        let data = CheckMatchIsExistReq.create(req)
        this.onBeforeReq("CheckMatchIsExist", data, params)
        const buffer = CheckMatchIsExistReq.encode(data).finish()
        let [err, pack] = await this.call("CheckMatchIsExist", buffer, params)
        if (err) {
            this.onBeforeResp("CheckMatchIsExist", err)
            return {err: err, resp: null}
        } else {
            let resp = CheckMatchIsExistResp.decode(pack) as any
            this.onBeforeResp("CheckMatchIsExist", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetPool(req: IGetPoolReq, params?: RpcParams) : Promise<{err:number, resp:IGetPoolResp}> {
        let data = GetPoolReq.create(req)
        this.onBeforeReq("GetPool", data, params)
        const buffer = GetPoolReq.encode(data).finish()
        let [err, pack] = await this.call("GetPool", buffer, params)
        if (err) {
            this.onBeforeResp("GetPool", err)
            return {err: err, resp: null}
        } else {
            let resp = GetPoolResp.decode(pack) as any
            this.onBeforeResp("GetPool", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ConfirmJumpMatch(req: IConfirmJumpMatchReq, params?: RpcParams) : Promise<{err:number, resp:IConfirmJumpMatchResp}> {
        let data = ConfirmJumpMatchReq.create(req)
        this.onBeforeReq("ConfirmJumpMatch", data, params)
        const buffer = ConfirmJumpMatchReq.encode(data).finish()
        let [err, pack] = await this.call("ConfirmJumpMatch", buffer, params)
        if (err) {
            this.onBeforeResp("ConfirmJumpMatch", err)
            return {err: err, resp: null}
        } else {
            let resp = ConfirmJumpMatchResp.decode(pack) as any
            this.onBeforeResp("ConfirmJumpMatch", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ReadyJumpMatch(req: IReadyJumpMatchReq, params?: RpcParams) : Promise<{err:number, resp:IReadyJumpMatchResp}> {
        let data = ReadyJumpMatchReq.create(req)
        this.onBeforeReq("ReadyJumpMatch", data, params)
        const buffer = ReadyJumpMatchReq.encode(data).finish()
        let [err, pack] = await this.call("ReadyJumpMatch", buffer, params)
        if (err) {
            this.onBeforeResp("ReadyJumpMatch", err)
            return {err: err, resp: null}
        } else {
            let resp = ReadyJumpMatchResp.decode(pack) as any
            this.onBeforeResp("ReadyJumpMatch", err, resp)
            return {err: null, resp: resp}
        }
    }
    async CallBackRemind(req: ICallBackRemindReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = CallBackRemindReq.create(req)
        this.onBeforeReq("CallBackRemind", data, params)
        const buffer = CallBackRemindReq.encode(data).finish()
        let [err, pack] = await this.call("CallBackRemind", buffer, params)
        if (err) {
            this.onBeforeResp("CallBackRemind", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("CallBackRemind", err, resp)
            return {err: null, resp: resp}
        }
    }
    async CallBackAddRobot(req: ICallBackAddRobotReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = CallBackAddRobotReq.create(req)
        this.onBeforeReq("CallBackAddRobot", data, params)
        const buffer = CallBackAddRobotReq.encode(data).finish()
        let [err, pack] = await this.call("CallBackAddRobot", buffer, params)
        if (err) {
            this.onBeforeResp("CallBackAddRobot", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("CallBackAddRobot", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ForceShutDownMatch(req: IForceShutDownMatchReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = ForceShutDownMatchReq.create(req)
        this.onBeforeReq("ForceShutDownMatch", data, params)
        const buffer = ForceShutDownMatchReq.encode(data).finish()
        let [err, pack] = await this.call("ForceShutDownMatch", buffer, params)
        if (err) {
            this.onBeforeResp("ForceShutDownMatch", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("ForceShutDownMatch", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetJumpMatch(req: IGetJumpMatchReq, params?: RpcParams) : Promise<{err:number, resp:IGetJumpMatchResp}> {
        let data = GetJumpMatchReq.create(req)
        this.onBeforeReq("GetJumpMatch", data, params)
        const buffer = GetJumpMatchReq.encode(data).finish()
        let [err, pack] = await this.call("GetJumpMatch", buffer, params)
        if (err) {
            this.onBeforeResp("GetJumpMatch", err)
            return {err: err, resp: null}
        } else {
            let resp = GetJumpMatchResp.decode(pack) as any
            this.onBeforeResp("GetJumpMatch", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListUserEnteredMatches(req: IListUserEnteredMatchesReq, params?: RpcParams) : Promise<{err:number, resp:IListUserEnteredMatchesResp}> {
        let data = ListUserEnteredMatchesReq.create(req)
        this.onBeforeReq("ListUserEnteredMatches", data, params)
        const buffer = ListUserEnteredMatchesReq.encode(data).finish()
        let [err, pack] = await this.call("ListUserEnteredMatches", buffer, params)
        if (err) {
            this.onBeforeResp("ListUserEnteredMatches", err)
            return {err: err, resp: null}
        } else {
            let resp = ListUserEnteredMatchesResp.decode(pack) as any
            this.onBeforeResp("ListUserEnteredMatches", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListMatchEnterUsers(req: IListMatchEnterUsersReq, params?: RpcParams) : Promise<{err:number, resp:IListMatchEnterUsersResp}> {
        let data = ListMatchEnterUsersReq.create(req)
        this.onBeforeReq("ListMatchEnterUsers", data, params)
        const buffer = ListMatchEnterUsersReq.encode(data).finish()
        let [err, pack] = await this.call("ListMatchEnterUsers", buffer, params)
        if (err) {
            this.onBeforeResp("ListMatchEnterUsers", err)
            return {err: err, resp: null}
        } else {
            let resp = ListMatchEnterUsersResp.decode(pack) as any
            this.onBeforeResp("ListMatchEnterUsers", err, resp)
            return {err: null, resp: resp}
        }
    }
    NotifyRoomInfo(data: Uint8Array, params: RpcParams) : {msg: IMsgRoomInfo, eventID?: number} {
        let msg = MsgRoomInfo.decode(data)
        return {msg: msg}
    }
    NotifyRoomInfoV2(data: Uint8Array, params: RpcParams) : {msg: IMsgRoomInfoV2, eventID?: number} {
        let msg = MsgRoomInfoV2.decode(data)
        return {msg: msg}
    }
    NotifyPoolChange(data: Uint8Array, params: RpcParams) : {msg: IMsgPoolChange, eventID?: number} {
        let msg = MsgPoolChange.decode(data)
        return {msg: msg}
    }
    NotifyMatchAboutToStart(data: Uint8Array, params: RpcParams) : {msg: IMsgMatchAboutToStart, eventID?: number} {
        let msg = MsgMatchAboutToStart.decode(data)
        return {msg: msg}
    }
    NotifyJoinObserver(data: Uint8Array, params: RpcParams) : {msg: IMsgJoinObserver, eventID?: number} {
        let msg = MsgJoinObserver.decode(data)
        return {msg: msg}
    }
    NotifyUserJoin(data: Uint8Array, params: RpcParams) : {msg: IMsgUserJoin, eventID?: number} {
        let msg = MsgUserJoin.decode(data)
        return {msg: msg}
    }
    NotifyUserLeave(data: Uint8Array, params: RpcParams) : {msg: IMsgUserLeave, eventID?: number} {
        let msg = MsgUserLeave.decode(data)
        return {msg: msg}
    }
    NotifyUserEnter(data: Uint8Array, params: RpcParams) : {msg: IMsgUserEnter, eventID?: number} {
        let msg = MsgUserEnter.decode(data)
        return {msg: msg}
    }
    NotifyUserEnterV2(data: Uint8Array, params: RpcParams) : {msg: IMsgUserEnterV2, eventID?: number} {
        let msg = MsgUserEnterV2.decode(data)
        return {msg: msg}
    }
    NotifyUserCancelEnter(data: Uint8Array, params: RpcParams) : {msg: IMsgUserCancelEnter, eventID?: number} {
        let msg = MsgUserCancelEnter.decode(data)
        return {msg: msg}
    }
    NotifyUserReady(data: Uint8Array, params: RpcParams) : {msg: IMsgUserReady, eventID?: number} {
        let msg = MsgUserReady.decode(data)
        return {msg: msg}
    }
    NotifyUserCancelReady(data: Uint8Array, params: RpcParams) : {msg: IMsgUserCancelReady, eventID?: number} {
        let msg = MsgUserCancelReady.decode(data)
        return {msg: msg}
    }
    NotifyUserMatchPrepare(data: Uint8Array, params: RpcParams) : {msg: IMsgUserMatchPrepare, eventID?: number} {
        let msg = MsgUserMatchPrepare.decode(data)
        return {msg: msg}
    }
    NotifyAllOnlineUserStarting(data: Uint8Array, params: RpcParams) : {msg: IMsgAllOnlineUserStarting, eventID?: number} {
        let msg = MsgAllOnlineUserStarting.decode(data)
        return {msg: msg}
    }
    NotifyJumpMatchPrompt(data: Uint8Array, params: RpcParams) : {msg: IMsgJumpMatchPrompt, eventID?: number} {
        let msg = MsgJumpMatchPrompt.decode(data)
        return {msg: msg}
    }
    NotifyJumpMatchStartResult(data: Uint8Array, params: RpcParams) : {msg: IMsgJumpMatchStartResult, eventID?: number} {
        let msg = MsgJumpMatchStartResult.decode(data)
        return {msg: msg}
    }
    NotifyMsgReleaseRobot(data: Uint8Array, params: RpcParams) : {msg: IMsgReleaseRobot, eventID?: number} {
        let msg = MsgReleaseRobot.decode(data)
        return {msg: msg}
    }
    NotifyPreMatchDisband(data: Uint8Array, params: RpcParams) : {msg: IMsgPreMatchDisband, eventID?: number} {
        let msg = MsgPreMatchDisband.decode(data)
        return {msg: msg}
    }
    NotifyStartMatchLock(data: Uint8Array, params: RpcParams) : {msg: IMsgStartMatchLock, eventID?: number} {
        let msg = MsgStartMatchLock.decode(data)
        return {msg: msg}
    }
    NotifyMatchStartResult(data: Uint8Array, params: RpcParams) : {msg: IMsgMatchStartResult, eventID?: number} {
        let msg = MsgMatchStartResult.decode(data)
        return {msg: msg}
    }
    NotifyConfigUpdate(data: Uint8Array, params: RpcParams) : {msg: IMsgConfigUpdate, eventID?: number} {
        let msg = MsgConfigUpdate.decode(data)
        return {msg: msg}
    }
    NotifyUserChange(data: Uint8Array, params: RpcParams) : {msg: IMsgUserChange, eventID?: number} {
        let msg = MsgUserChange.decode(data)
        return {msg: msg}
    }
}
export const PreMatchService = new $PreMatchService({
    name: "tss.match.v2.prematch.v1",
})
import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  Void as base_Void,IVoid as base_IVoid ,  } from "idl/base/base"
import {  AssetItem as tss_common_AssetItem,IAssetItem as tss_common_IAssetItem ,  } from "idl/tss/common/common_define"
import {  DynamicAssetItems as tss_hall_common_DynamicAssetItems,IDynamicAssetItems as tss_hall_common_IDynamicAssetItems ,  } from "idl/tss/hall/common/assets"
import {  Code as tss_match_v2_common_Code ,  } from "idl/tss/match_v2/common/code"
import {  HandleGameResultReq as tss_match_v2_common_HandleGameResultReq,IHandleGameResultReq as tss_match_v2_common_IHandleGameResultReq ,  HandleGameExceptionReq as tss_match_v2_common_HandleGameExceptionReq,IHandleGameExceptionReq as tss_match_v2_common_IHandleGameExceptionReq ,  StartMatchInfo as tss_match_v2_common_StartMatchInfo,IStartMatchInfo as tss_match_v2_common_IStartMatchInfo ,  RevivalType as tss_match_v2_common_RevivalType ,  TeamScoreInfo as tss_match_v2_common_TeamScoreInfo,ITeamScoreInfo as tss_match_v2_common_ITeamScoreInfo ,  MatchInfo as tss_match_v2_common_MatchInfo,IMatchInfo as tss_match_v2_common_IMatchInfo ,  TableInfo as tss_match_v2_common_TableInfo,ITableInfo as tss_match_v2_common_ITableInfo ,  UserInfo as tss_match_v2_common_UserInfo,IUserInfo as tss_match_v2_common_IUserInfo ,  GroupInfo as tss_match_v2_common_GroupInfo,IGroupInfo as tss_match_v2_common_IGroupInfo ,  User as tss_match_v2_common_User,IUser as tss_match_v2_common_IUser ,  StageGroupItem as tss_match_v2_common_StageGroupItem,IStageGroupItem as tss_match_v2_common_IStageGroupItem ,  Table as tss_match_v2_common_Table,ITable as tss_match_v2_common_ITable ,  GameResultType as tss_match_v2_common_GameResultType ,  PreMatchConfig as tss_match_v2_common_PreMatchConfig,IPreMatchConfig as tss_match_v2_common_IPreMatchConfig ,  UserStatus as tss_match_v2_common_UserStatus ,  TableStatus as tss_match_v2_common_TableStatus ,  } from "idl/tss/match_v2/common/common"
export interface IStartMatchReq {
    startMatchInfo?: tss_match_v2_common_IStartMatchInfo
}
@protobuf.Type.d("tss_match_v2_officematch_v1_StartMatchReq")
export class StartMatchReq extends protobuf.Message<IStartMatchReq> {
    constructor(properties: Properties<IStartMatchReq>) {
        super(properties);
        if (properties) {
            if (properties.startMatchInfo) { this.startMatchInfo = tss_match_v2_common_StartMatchInfo.create(properties.startMatchInfo) as any }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_common_StartMatchInfo", "optional")
    public startMatchInfo?: tss_match_v2_common_StartMatchInfo|null
}
export interface IStartMatchResp {
    code?: tss_match_v2_common_Code|null
    srvId?: number|null
}
@protobuf.Type.d("tss_match_v2_officematch_v1_StartMatchResp")
export class StartMatchResp extends protobuf.Message<IStartMatchResp> {
    constructor(properties: Properties<IStartMatchResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.srvId) { this.srvId = properties.srvId }
        }
	}
    @protobuf.Field.d(1, tss_match_v2_common_Code, "optional", tss_match_v2_common_Code.CodeOk)
    public code?: tss_match_v2_common_Code|null = tss_match_v2_common_Code.CodeOk
    @protobuf.Field.d(2, "int64", "optional", 0)
    public srvId?: number|null = 0
}
export interface IGetPoolResp {
    prizePool?: tss_common_IAssetItem[]
}
@protobuf.Type.d("tss_match_v2_officematch_v1_GetPoolResp")
export class GetPoolResp extends protobuf.Message<IGetPoolResp> {
    constructor(properties: Properties<IGetPoolResp>) {
        super(properties);
        if (properties) {
            if (properties.prizePool) { this.prizePool = []; properties.prizePool.forEach((value, index)=>{this.prizePool[index] = tss_common_AssetItem.create(properties.prizePool[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_common_AssetItem", "repeated")
    public prizePool?: tss_common_AssetItem[] = []
}
export interface IGetPoolReq {
    matchKey?: string|null
}
@protobuf.Type.d("tss_match_v2_officematch_v1_GetPoolReq")
export class GetPoolReq extends protobuf.Message<IGetPoolReq> {
    constructor(properties: Properties<IGetPoolReq>) {
        super(properties);
        if (properties) {
            if (properties.matchKey) { this.matchKey = properties.matchKey }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public matchKey?: string|null = ""
}
export interface IMsgPoolChange {
    prizePool?: tss_common_IAssetItem[]
}
@protobuf.Type.d("tss_match_v2_officematch_v1_MsgPoolChange")
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
export interface IRevivalResp {
    code?: tss_match_v2_common_Code|null
    score?: number|null
}
@protobuf.Type.d("tss_match_v2_officematch_v1_RevivalResp")
export class RevivalResp extends protobuf.Message<IRevivalResp> {
    constructor(properties: Properties<IRevivalResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.score) { this.score = properties.score }
        }
	}
    @protobuf.Field.d(1, tss_match_v2_common_Code, "optional", tss_match_v2_common_Code.CodeOk)
    public code?: tss_match_v2_common_Code|null = tss_match_v2_common_Code.CodeOk
    @protobuf.Field.d(2, "int32", "optional", 0)
    public score?: number|null = 0
}
export interface IRevivalByAdvertisingResp {
    code?: tss_match_v2_common_Code|null
    score?: number|null
}
@protobuf.Type.d("tss_match_v2_officematch_v1_RevivalByAdvertisingResp")
export class RevivalByAdvertisingResp extends protobuf.Message<IRevivalByAdvertisingResp> {
    constructor(properties: Properties<IRevivalByAdvertisingResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.score) { this.score = properties.score }
        }
	}
    @protobuf.Field.d(1, tss_match_v2_common_Code, "optional", tss_match_v2_common_Code.CodeOk)
    public code?: tss_match_v2_common_Code|null = tss_match_v2_common_Code.CodeOk
    @protobuf.Field.d(2, "int32", "optional", 0)
    public score?: number|null = 0
}
export interface ILookAdvertisingResp {
    code?: tss_match_v2_common_Code|null
}
@protobuf.Type.d("tss_match_v2_officematch_v1_LookAdvertisingResp")
export class LookAdvertisingResp extends protobuf.Message<ILookAdvertisingResp> {
    constructor(properties: Properties<ILookAdvertisingResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
        }
	}
    @protobuf.Field.d(1, tss_match_v2_common_Code, "optional", tss_match_v2_common_Code.CodeOk)
    public code?: tss_match_v2_common_Code|null = tss_match_v2_common_Code.CodeOk
}
export interface ICancelRevivalResp {
}
@protobuf.Type.d("tss_match_v2_officematch_v1_CancelRevivalResp")
export class CancelRevivalResp extends protobuf.Message<ICancelRevivalResp> {
    constructor(properties: Properties<ICancelRevivalResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IMsgUserRevival {
    waitTime?: number|null
    currentRank?: number|null
    scoreWhenRevival?: number|null
    rankWhenRevival?: number|null
    type?: tss_match_v2_common_RevivalType|null
    costAsset?: tss_common_IAssetItem[]
    ownAsset?: tss_common_IAssetItem[]
    ownVipRevival?: number|null
    isCanRevival?: boolean|null
    userCurRevivalNum?: number|null
    scoreBeforeRevival?: number|null
}
@protobuf.Type.d("tss_match_v2_officematch_v1_MsgUserRevival")
export class MsgUserRevival extends protobuf.Message<IMsgUserRevival> {
    constructor(properties: Properties<IMsgUserRevival>) {
        super(properties);
        if (properties) {
            if (properties.waitTime) { this.waitTime = properties.waitTime }
            if (properties.currentRank) { this.currentRank = properties.currentRank }
            if (properties.scoreWhenRevival) { this.scoreWhenRevival = properties.scoreWhenRevival }
            if (properties.rankWhenRevival) { this.rankWhenRevival = properties.rankWhenRevival }
            if (properties.type) { this.type = properties.type }
            if (properties.costAsset) { this.costAsset = []; properties.costAsset.forEach((value, index)=>{this.costAsset[index] = tss_common_AssetItem.create(properties.costAsset[index]) as any})}
            if (properties.ownAsset) { this.ownAsset = []; properties.ownAsset.forEach((value, index)=>{this.ownAsset[index] = tss_common_AssetItem.create(properties.ownAsset[index]) as any})}
            if (properties.ownVipRevival) { this.ownVipRevival = properties.ownVipRevival }
            if (properties.isCanRevival) { this.isCanRevival = properties.isCanRevival }
            if (properties.userCurRevivalNum) { this.userCurRevivalNum = properties.userCurRevivalNum }
            if (properties.scoreBeforeRevival) { this.scoreBeforeRevival = properties.scoreBeforeRevival }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public waitTime?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public currentRank?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public scoreWhenRevival?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public rankWhenRevival?: number|null = 0
    @protobuf.Field.d(5, tss_match_v2_common_RevivalType, "optional", tss_match_v2_common_RevivalType.RevivalTypeUnknown)
    public type?: tss_match_v2_common_RevivalType|null = tss_match_v2_common_RevivalType.RevivalTypeUnknown
    @protobuf.Field.d(6, "tss_common_AssetItem", "repeated")
    public costAsset?: tss_common_AssetItem[] = []
    @protobuf.Field.d(7, "tss_common_AssetItem", "repeated")
    public ownAsset?: tss_common_AssetItem[] = []
    @protobuf.Field.d(8, "int64", "optional", 0)
    public ownVipRevival?: number|null = 0
    @protobuf.Field.d(9, "bool", "optional", false)
    public isCanRevival?: boolean|null = false
    @protobuf.Field.d(10, "int64", "optional", 0)
    public userCurRevivalNum?: number|null = 0
    @protobuf.Field.d(11, "int64", "optional", 0)
    public scoreBeforeRevival?: number|null = 0
}
export interface IRevivalInfo {
    waitTime?: number|null
    currentRank?: number|null
    scoreWhenRevival?: number|null
    rankWhenRevival?: number|null
    type?: tss_match_v2_common_RevivalType|null
    costAsset?: tss_common_IAssetItem[]
    ownAsset?: tss_common_IAssetItem[]
    ownVipRevival?: number|null
    isCanRevival?: boolean|null
    userCurRevivalNum?: number|null
    scoreBeforeRevival?: number|null
}
@protobuf.Type.d("tss_match_v2_officematch_v1_RevivalInfo")
export class RevivalInfo extends protobuf.Message<IRevivalInfo> {
    constructor(properties: Properties<IRevivalInfo>) {
        super(properties);
        if (properties) {
            if (properties.waitTime) { this.waitTime = properties.waitTime }
            if (properties.currentRank) { this.currentRank = properties.currentRank }
            if (properties.scoreWhenRevival) { this.scoreWhenRevival = properties.scoreWhenRevival }
            if (properties.rankWhenRevival) { this.rankWhenRevival = properties.rankWhenRevival }
            if (properties.type) { this.type = properties.type }
            if (properties.costAsset) { this.costAsset = []; properties.costAsset.forEach((value, index)=>{this.costAsset[index] = tss_common_AssetItem.create(properties.costAsset[index]) as any})}
            if (properties.ownAsset) { this.ownAsset = []; properties.ownAsset.forEach((value, index)=>{this.ownAsset[index] = tss_common_AssetItem.create(properties.ownAsset[index]) as any})}
            if (properties.ownVipRevival) { this.ownVipRevival = properties.ownVipRevival }
            if (properties.isCanRevival) { this.isCanRevival = properties.isCanRevival }
            if (properties.userCurRevivalNum) { this.userCurRevivalNum = properties.userCurRevivalNum }
            if (properties.scoreBeforeRevival) { this.scoreBeforeRevival = properties.scoreBeforeRevival }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public waitTime?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public currentRank?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public scoreWhenRevival?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public rankWhenRevival?: number|null = 0
    @protobuf.Field.d(5, tss_match_v2_common_RevivalType, "optional", tss_match_v2_common_RevivalType.RevivalTypeUnknown)
    public type?: tss_match_v2_common_RevivalType|null = tss_match_v2_common_RevivalType.RevivalTypeUnknown
    @protobuf.Field.d(6, "tss_common_AssetItem", "repeated")
    public costAsset?: tss_common_AssetItem[] = []
    @protobuf.Field.d(7, "tss_common_AssetItem", "repeated")
    public ownAsset?: tss_common_AssetItem[] = []
    @protobuf.Field.d(8, "int64", "optional", 0)
    public ownVipRevival?: number|null = 0
    @protobuf.Field.d(9, "bool", "optional", false)
    public isCanRevival?: boolean|null = false
    @protobuf.Field.d(10, "int64", "optional", 0)
    public userCurRevivalNum?: number|null = 0
    @protobuf.Field.d(11, "int64", "optional", 0)
    public scoreBeforeRevival?: number|null = 0
}
export interface IMsgUserRevivalV2 {
    uid?: number|null
    revivalInfo?: IRevivalInfo
}
@protobuf.Type.d("tss_match_v2_officematch_v1_MsgUserRevivalV2")
export class MsgUserRevivalV2 extends protobuf.Message<IMsgUserRevivalV2> {
    constructor(properties: Properties<IMsgUserRevivalV2>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.revivalInfo) { this.revivalInfo = RevivalInfo.create(properties.revivalInfo) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "tss_match_v2_officematch_v1_RevivalInfo", "optional")
    public revivalInfo?: RevivalInfo|null
}
export interface IMsgUserRevived {
    uid?: number|null
    score?: number|null
}
@protobuf.Type.d("tss_match_v2_officematch_v1_MsgUserRevived")
export class MsgUserRevived extends protobuf.Message<IMsgUserRevived> {
    constructor(properties: Properties<IMsgUserRevived>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.score) { this.score = properties.score }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public score?: number|null = 0
}
export interface IMsgAllGameEnd {
    teamScoreInfos?: tss_match_v2_common_ITeamScoreInfo[]
    gameNo?: number|null
}
@protobuf.Type.d("tss_match_v2_officematch_v1_MsgAllGameEnd")
export class MsgAllGameEnd extends protobuf.Message<IMsgAllGameEnd> {
    constructor(properties: Properties<IMsgAllGameEnd>) {
        super(properties);
        if (properties) {
            if (properties.teamScoreInfos) { this.teamScoreInfos = []; properties.teamScoreInfos.forEach((value, index)=>{this.teamScoreInfos[index] = tss_match_v2_common_TeamScoreInfo.create(properties.teamScoreInfos[index]) as any})}
            if (properties.gameNo) { this.gameNo = properties.gameNo }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_common_TeamScoreInfo", "repeated")
    public teamScoreInfos?: tss_match_v2_common_TeamScoreInfo[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public gameNo?: number|null = 0
}
export interface IAbortMatchReq {
    schedulerID?: number|null
}
@protobuf.Type.d("tss_match_v2_officematch_v1_AbortMatchReq")
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
@protobuf.Type.d("tss_match_v2_officematch_v1_AbortMatchResp")
export class AbortMatchResp extends protobuf.Message<IAbortMatchResp> {
    constructor(properties: Properties<IAbortMatchResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IPingMatchReq {
    matchKey?: string|null
}
@protobuf.Type.d("tss_match_v2_officematch_v1_PingMatchReq")
export class PingMatchReq extends protobuf.Message<IPingMatchReq> {
    constructor(properties: Properties<IPingMatchReq>) {
        super(properties);
        if (properties) {
            if (properties.matchKey) { this.matchKey = properties.matchKey }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public matchKey?: string|null = ""
}
export interface IGetIGInfoReq {
    matchKey?: string|null
}
@protobuf.Type.d("tss_match_v2_officematch_v1_GetIGInfoReq")
export class GetIGInfoReq extends protobuf.Message<IGetIGInfoReq> {
    constructor(properties: Properties<IGetIGInfoReq>) {
        super(properties);
        if (properties) {
            if (properties.matchKey) { this.matchKey = properties.matchKey }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public matchKey?: string|null = ""
}
export interface IUserInfoV2 {
    users?: IUser[]
}
@protobuf.Type.d("tss_match_v2_officematch_v1_UserInfoV2")
export class UserInfoV2 extends protobuf.Message<IUserInfoV2> {
    constructor(properties: Properties<IUserInfoV2>) {
        super(properties);
        if (properties) {
            if (properties.users) { this.users = []; properties.users.forEach((value, index)=>{this.users[index] = User.create(properties.users[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_officematch_v1_User", "repeated")
    public users?: User[] = []
}
export interface IReconnectMatchReq {
    matchKey?: string|null
}
@protobuf.Type.d("tss_match_v2_officematch_v1_ReconnectMatchReq")
export class ReconnectMatchReq extends protobuf.Message<IReconnectMatchReq> {
    constructor(properties: Properties<IReconnectMatchReq>) {
        super(properties);
        if (properties) {
            if (properties.matchKey) { this.matchKey = properties.matchKey }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public matchKey?: string|null = ""
}
export interface ITableInfoV2 {
    tables?: ITable[]
}
@protobuf.Type.d("tss_match_v2_officematch_v1_TableInfoV2")
export class TableInfoV2 extends protobuf.Message<ITableInfoV2> {
    constructor(properties: Properties<ITableInfoV2>) {
        super(properties);
        if (properties) {
            if (properties.tables) { this.tables = []; properties.tables.forEach((value, index)=>{this.tables[index] = Table.create(properties.tables[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_officematch_v1_Table", "repeated")
    public tables?: Table[] = []
}
export interface IIGInfo {
    matchInfo?: tss_match_v2_common_IMatchInfo
    tableInfo?: tss_match_v2_common_ITableInfo
    userInfo?: tss_match_v2_common_IUserInfo
    tableInfoV2?: ITableInfoV2
    userInfoV2?: IUserInfoV2
}
@protobuf.Type.d("tss_match_v2_officematch_v1_IGInfo")
export class IGInfo extends protobuf.Message<IIGInfo> {
    constructor(properties: Properties<IIGInfo>) {
        super(properties);
        if (properties) {
            if (properties.matchInfo) { this.matchInfo = tss_match_v2_common_MatchInfo.create(properties.matchInfo) as any }
            if (properties.tableInfo) { this.tableInfo = tss_match_v2_common_TableInfo.create(properties.tableInfo) as any }
            if (properties.userInfo) { this.userInfo = tss_match_v2_common_UserInfo.create(properties.userInfo) as any }
            if (properties.tableInfoV2) { this.tableInfoV2 = TableInfoV2.create(properties.tableInfoV2) as any }
            if (properties.userInfoV2) { this.userInfoV2 = UserInfoV2.create(properties.userInfoV2) as any }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_common_MatchInfo", "optional")
    public matchInfo?: tss_match_v2_common_MatchInfo|null
    @protobuf.Field.d(2, "tss_match_v2_common_TableInfo", "optional")
    public tableInfo?: tss_match_v2_common_TableInfo|null
    @protobuf.Field.d(3, "tss_match_v2_common_UserInfo", "optional")
    public userInfo?: tss_match_v2_common_UserInfo|null
    @protobuf.Field.d(4, "tss_match_v2_officematch_v1_TableInfoV2", "optional")
    public tableInfoV2?: TableInfoV2|null
    @protobuf.Field.d(5, "tss_match_v2_officematch_v1_UserInfoV2", "optional")
    public userInfoV2?: UserInfoV2|null
}
export interface IDelayJoinMatchReq {
    matchKey?: string|null
    uid?: number|null
}
@protobuf.Type.d("tss_match_v2_officematch_v1_DelayJoinMatchReq")
export class DelayJoinMatchReq extends protobuf.Message<IDelayJoinMatchReq> {
    constructor(properties: Properties<IDelayJoinMatchReq>) {
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
export interface IDelayJoinMatchResp {
    code?: tss_match_v2_common_Code|null
    info?: IIGInfo
}
@protobuf.Type.d("tss_match_v2_officematch_v1_DelayJoinMatchResp")
export class DelayJoinMatchResp extends protobuf.Message<IDelayJoinMatchResp> {
    constructor(properties: Properties<IDelayJoinMatchResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.info) { this.info = IGInfo.create(properties.info) as any }
        }
	}
    @protobuf.Field.d(1, tss_match_v2_common_Code, "optional", tss_match_v2_common_Code.CodeOk)
    public code?: tss_match_v2_common_Code|null = tss_match_v2_common_Code.CodeOk
    @protobuf.Field.d(2, "tss_match_v2_officematch_v1_IGInfo", "optional")
    public info?: IGInfo|null
}
export interface IMsgMatchStart {
    matchKey?: string|null
    isDynamicStage?: boolean|null
    dynamicStageId?: number|null
    groupInfo?: tss_match_v2_common_IGroupInfo
    srvId?: number|null
}
@protobuf.Type.d("tss_match_v2_officematch_v1_MsgMatchStart")
export class MsgMatchStart extends protobuf.Message<IMsgMatchStart> {
    constructor(properties: Properties<IMsgMatchStart>) {
        super(properties);
        if (properties) {
            if (properties.matchKey) { this.matchKey = properties.matchKey }
            if (properties.isDynamicStage) { this.isDynamicStage = properties.isDynamicStage }
            if (properties.dynamicStageId) { this.dynamicStageId = properties.dynamicStageId }
            if (properties.groupInfo) { this.groupInfo = tss_match_v2_common_GroupInfo.create(properties.groupInfo) as any }
            if (properties.srvId) { this.srvId = properties.srvId }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public matchKey?: string|null = ""
    @protobuf.Field.d(2, "bool", "optional", false)
    public isDynamicStage?: boolean|null = false
    @protobuf.Field.d(3, "int64", "optional", 0)
    public dynamicStageId?: number|null = 0
    @protobuf.Field.d(4, "tss_match_v2_common_GroupInfo", "optional")
    public groupInfo?: tss_match_v2_common_GroupInfo|null
    @protobuf.Field.d(5, "int64", "optional", 0)
    public srvId?: number|null = 0
}
export interface IMsgMatchOver {
    matchKey?: string|null
    users?: tss_match_v2_common_IUser[]
}
@protobuf.Type.d("tss_match_v2_officematch_v1_MsgMatchOver")
export class MsgMatchOver extends protobuf.Message<IMsgMatchOver> {
    constructor(properties: Properties<IMsgMatchOver>) {
        super(properties);
        if (properties) {
            if (properties.matchKey) { this.matchKey = properties.matchKey }
            if (properties.users) { this.users = []; properties.users.forEach((value, index)=>{this.users[index] = tss_match_v2_common_User.create(properties.users[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public matchKey?: string|null = ""
    @protobuf.Field.d(2, "tss_match_v2_common_User", "repeated")
    public users?: tss_match_v2_common_User[] = []
}
export interface IMsgStageStart {
    matchInfo?: tss_match_v2_common_IMatchInfo
    tableInfo?: tss_match_v2_common_ITableInfo
    userInfo?: tss_match_v2_common_IUserInfo
}
@protobuf.Type.d("tss_match_v2_officematch_v1_MsgStageStart")
export class MsgStageStart extends protobuf.Message<IMsgStageStart> {
    constructor(properties: Properties<IMsgStageStart>) {
        super(properties);
        if (properties) {
            if (properties.matchInfo) { this.matchInfo = tss_match_v2_common_MatchInfo.create(properties.matchInfo) as any }
            if (properties.tableInfo) { this.tableInfo = tss_match_v2_common_TableInfo.create(properties.tableInfo) as any }
            if (properties.userInfo) { this.userInfo = tss_match_v2_common_UserInfo.create(properties.userInfo) as any }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_common_MatchInfo", "optional")
    public matchInfo?: tss_match_v2_common_MatchInfo|null
    @protobuf.Field.d(2, "tss_match_v2_common_TableInfo", "optional")
    public tableInfo?: tss_match_v2_common_TableInfo|null
    @protobuf.Field.d(3, "tss_match_v2_common_UserInfo", "optional")
    public userInfo?: tss_match_v2_common_UserInfo|null
}
export interface IMsgStageStartV2 {
    index?: number|null
    groupInfo?: tss_match_v2_common_IGroupInfo
}
@protobuf.Type.d("tss_match_v2_officematch_v1_MsgStageStartV2")
export class MsgStageStartV2 extends protobuf.Message<IMsgStageStartV2> {
    constructor(properties: Properties<IMsgStageStartV2>) {
        super(properties);
        if (properties) {
            if (properties.index) { this.index = properties.index }
            if (properties.groupInfo) { this.groupInfo = tss_match_v2_common_GroupInfo.create(properties.groupInfo) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public index?: number|null = 0
    @protobuf.Field.d(2, "tss_match_v2_common_GroupInfo", "optional")
    public groupInfo?: tss_match_v2_common_GroupInfo|null
}
export interface IMsgStageEnd {
}
@protobuf.Type.d("tss_match_v2_officematch_v1_MsgStageEnd")
export class MsgStageEnd extends protobuf.Message<IMsgStageEnd> {
    constructor(properties: Properties<IMsgStageEnd>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IMsgStageGroupEnd {
    newlyDoneGroupID?: number|null
    doneGroups?: tss_match_v2_common_IStageGroupItem[]
    doingGroups?: tss_match_v2_common_IStageGroupItem[]
}
@protobuf.Type.d("tss_match_v2_officematch_v1_MsgStageGroupEnd")
export class MsgStageGroupEnd extends protobuf.Message<IMsgStageGroupEnd> {
    constructor(properties: Properties<IMsgStageGroupEnd>) {
        super(properties);
        if (properties) {
            if (properties.newlyDoneGroupID) { this.newlyDoneGroupID = properties.newlyDoneGroupID }
            if (properties.doneGroups) { this.doneGroups = []; properties.doneGroups.forEach((value, index)=>{this.doneGroups[index] = tss_match_v2_common_StageGroupItem.create(properties.doneGroups[index]) as any})}
            if (properties.doingGroups) { this.doingGroups = []; properties.doingGroups.forEach((value, index)=>{this.doingGroups[index] = tss_match_v2_common_StageGroupItem.create(properties.doingGroups[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public newlyDoneGroupID?: number|null = 0
    @protobuf.Field.d(2, "tss_match_v2_common_StageGroupItem", "repeated")
    public doneGroups?: tss_match_v2_common_StageGroupItem[] = []
    @protobuf.Field.d(3, "tss_match_v2_common_StageGroupItem", "repeated")
    public doingGroups?: tss_match_v2_common_StageGroupItem[] = []
}
export interface IMsgUserChange {
    matchInfo?: tss_match_v2_common_IMatchInfo
    changeUsers?: tss_match_v2_common_IUser[]
}
@protobuf.Type.d("tss_match_v2_officematch_v1_MsgUserChange")
export class MsgUserChange extends protobuf.Message<IMsgUserChange> {
    constructor(properties: Properties<IMsgUserChange>) {
        super(properties);
        if (properties) {
            if (properties.matchInfo) { this.matchInfo = tss_match_v2_common_MatchInfo.create(properties.matchInfo) as any }
            if (properties.changeUsers) { this.changeUsers = []; properties.changeUsers.forEach((value, index)=>{this.changeUsers[index] = tss_match_v2_common_User.create(properties.changeUsers[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_common_MatchInfo", "optional")
    public matchInfo?: tss_match_v2_common_MatchInfo|null
    @protobuf.Field.d(2, "tss_match_v2_common_User", "repeated")
    public changeUsers?: tss_match_v2_common_User[] = []
}
export interface IMsgScoreChange {
    baseScore?: number|null
    outScore?: number|null
}
@protobuf.Type.d("tss_match_v2_officematch_v1_MsgScoreChange")
export class MsgScoreChange extends protobuf.Message<IMsgScoreChange> {
    constructor(properties: Properties<IMsgScoreChange>) {
        super(properties);
        if (properties) {
            if (properties.baseScore) { this.baseScore = properties.baseScore }
            if (properties.outScore) { this.outScore = properties.outScore }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public baseScore?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public outScore?: number|null = 0
}
export interface IMsgTableStart {
    tables?: tss_match_v2_common_ITable[]
    users?: tss_match_v2_common_IUser[]
}
@protobuf.Type.d("tss_match_v2_officematch_v1_MsgTableStart")
export class MsgTableStart extends protobuf.Message<IMsgTableStart> {
    constructor(properties: Properties<IMsgTableStart>) {
        super(properties);
        if (properties) {
            if (properties.tables) { this.tables = []; properties.tables.forEach((value, index)=>{this.tables[index] = tss_match_v2_common_Table.create(properties.tables[index]) as any})}
            if (properties.users) { this.users = []; properties.users.forEach((value, index)=>{this.users[index] = tss_match_v2_common_User.create(properties.users[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_common_Table", "repeated")
    public tables?: tss_match_v2_common_Table[] = []
    @protobuf.Field.d(2, "tss_match_v2_common_User", "repeated")
    public users?: tss_match_v2_common_User[] = []
}
export interface IOnStartTable {
    key?: string|null
    baseScore?: number|null
    outScore?: number|null
    uids?: number[]
    realKey?: string|null
    groupID?: number|null
}
@protobuf.Type.d("tss_match_v2_officematch_v1_OnStartTable")
export class OnStartTable extends protobuf.Message<IOnStartTable> {
    constructor(properties: Properties<IOnStartTable>) {
        super(properties);
        if (properties) {
            if (properties.key) { this.key = properties.key }
            if (properties.baseScore) { this.baseScore = properties.baseScore }
            if (properties.outScore) { this.outScore = properties.outScore }
            if (properties.uids) { this.uids = []; properties.uids.forEach((value, index)=>{this.uids[index] = properties.uids[index]})}
            if (properties.realKey) { this.realKey = properties.realKey }
            if (properties.groupID) { this.groupID = properties.groupID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public key?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public baseScore?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public outScore?: number|null = 0
    @protobuf.Field.d(4, "int64", "repeated", [])
    public uids?: number[] = []
    @protobuf.Field.d(5, "string", "optional", )
    public realKey?: string|null = ""
    @protobuf.Field.d(6, "int64", "optional", 0)
    public groupID?: number|null = 0
}
export interface IMsgTableGameStart {
    key?: string|null
}
@protobuf.Type.d("tss_match_v2_officematch_v1_MsgTableGameStart")
export class MsgTableGameStart extends protobuf.Message<IMsgTableGameStart> {
    constructor(properties: Properties<IMsgTableGameStart>) {
        super(properties);
        if (properties) {
            if (properties.key) { this.key = properties.key }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public key?: string|null = ""
}
export interface IMsgTableResult {
    table?: tss_match_v2_common_ITable
    users?: tss_match_v2_common_IUser[]
}
@protobuf.Type.d("tss_match_v2_officematch_v1_MsgTableResult")
export class MsgTableResult extends protobuf.Message<IMsgTableResult> {
    constructor(properties: Properties<IMsgTableResult>) {
        super(properties);
        if (properties) {
            if (properties.table) { this.table = tss_match_v2_common_Table.create(properties.table) as any }
            if (properties.users) { this.users = []; properties.users.forEach((value, index)=>{this.users[index] = tss_match_v2_common_User.create(properties.users[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_common_Table", "optional")
    public table?: tss_match_v2_common_Table|null
    @protobuf.Field.d(2, "tss_match_v2_common_User", "repeated")
    public users?: tss_match_v2_common_User[] = []
}
export interface ITableResultUser {
    uid?: number|null
    changeScore?: number|null
    tableRole?: number|null
    gameResult?: tss_match_v2_common_GameResultType|null
    punishMarks?: boolean|null
}
@protobuf.Type.d("tss_match_v2_officematch_v1_TableResultUser")
export class TableResultUser extends protobuf.Message<ITableResultUser> {
    constructor(properties: Properties<ITableResultUser>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.changeScore) { this.changeScore = properties.changeScore }
            if (properties.tableRole) { this.tableRole = properties.tableRole }
            if (properties.gameResult) { this.gameResult = properties.gameResult }
            if (properties.punishMarks) { this.punishMarks = properties.punishMarks }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public changeScore?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public tableRole?: number|null = 0
    @protobuf.Field.d(4, tss_match_v2_common_GameResultType, "optional", tss_match_v2_common_GameResultType.GameResultTypeUnknown)
    public gameResult?: tss_match_v2_common_GameResultType|null = tss_match_v2_common_GameResultType.GameResultTypeUnknown
    @protobuf.Field.d(5, "bool", "optional", false)
    public punishMarks?: boolean|null = false
}
export interface IMsgTableEnd {
    table?: tss_match_v2_common_ITable
}
@protobuf.Type.d("tss_match_v2_officematch_v1_MsgTableEnd")
export class MsgTableEnd extends protobuf.Message<IMsgTableEnd> {
    constructor(properties: Properties<IMsgTableEnd>) {
        super(properties);
        if (properties) {
            if (properties.table) { this.table = tss_match_v2_common_Table.create(properties.table) as any }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_common_Table", "optional")
    public table?: tss_match_v2_common_Table|null
}
export interface IMsgUserSettlement {
    user?: tss_match_v2_common_IUser
}
@protobuf.Type.d("tss_match_v2_officematch_v1_MsgUserSettlement")
export class MsgUserSettlement extends protobuf.Message<IMsgUserSettlement> {
    constructor(properties: Properties<IMsgUserSettlement>) {
        super(properties);
        if (properties) {
            if (properties.user) { this.user = tss_match_v2_common_User.create(properties.user) as any }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_common_User", "optional")
    public user?: tss_match_v2_common_User|null
}
export interface ISettleUser {
    uid?: number|null
    prizeViewAssets?: tss_hall_common_IDynamicAssetItems[]
    outAt?: number|null
    rank?: number|null
}
@protobuf.Type.d("tss_match_v2_officematch_v1_SettleUser")
export class SettleUser extends protobuf.Message<ISettleUser> {
    constructor(properties: Properties<ISettleUser>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.prizeViewAssets) { this.prizeViewAssets = []; properties.prizeViewAssets.forEach((value, index)=>{this.prizeViewAssets[index] = tss_hall_common_DynamicAssetItems.create(properties.prizeViewAssets[index]) as any})}
            if (properties.outAt) { this.outAt = properties.outAt }
            if (properties.rank) { this.rank = properties.rank }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "tss_hall_common_DynamicAssetItems", "repeated")
    public prizeViewAssets?: tss_hall_common_DynamicAssetItems[] = []
    @protobuf.Field.d(3, "int64", "optional", 0)
    public outAt?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public rank?: number|null = 0
}
export interface IConfirmJumpMatchReq {
    uid?: number|null
    matchKey?: string|null
}
@protobuf.Type.d("tss_match_v2_officematch_v1_ConfirmJumpMatchReq")
export class ConfirmJumpMatchReq extends protobuf.Message<IConfirmJumpMatchReq> {
    constructor(properties: Properties<IConfirmJumpMatchReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.matchKey) { this.matchKey = properties.matchKey }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public matchKey?: string|null = ""
}
export interface IConfirmJumpMatchResp {
    code?: number|null
}
@protobuf.Type.d("tss_match_v2_officematch_v1_ConfirmJumpMatchResp")
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
export interface IStageEndQuitMatchReq {
    uid?: number|null
    matchKey?: string|null
}
@protobuf.Type.d("tss_match_v2_officematch_v1_StageEndQuitMatchReq")
export class StageEndQuitMatchReq extends protobuf.Message<IStageEndQuitMatchReq> {
    constructor(properties: Properties<IStageEndQuitMatchReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.matchKey) { this.matchKey = properties.matchKey }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public matchKey?: string|null = ""
}
export interface IStageEndQuitMatchResp {
    code?: number|null
}
@protobuf.Type.d("tss_match_v2_officematch_v1_StageEndQuitMatchResp")
export class StageEndQuitMatchResp extends protobuf.Message<IStageEndQuitMatchResp> {
    constructor(properties: Properties<IStageEndQuitMatchResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public code?: number|null = 0
}
export interface IUpdateRoomUserReq {
    key?: string|null
    uid?: number|null
    isJoin?: boolean|null
}
@protobuf.Type.d("tss_match_v2_officematch_v1_UpdateRoomUserReq")
export class UpdateRoomUserReq extends protobuf.Message<IUpdateRoomUserReq> {
    constructor(properties: Properties<IUpdateRoomUserReq>) {
        super(properties);
        if (properties) {
            if (properties.key) { this.key = properties.key }
            if (properties.uid) { this.uid = properties.uid }
            if (properties.isJoin) { this.isJoin = properties.isJoin }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public key?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(3, "bool", "optional", false)
    public isJoin?: boolean|null = false
}
export interface IMsgMatchStartFailed {
}
@protobuf.Type.d("tss_match_v2_officematch_v1_MsgMatchStartFailed")
export class MsgMatchStartFailed extends protobuf.Message<IMsgMatchStartFailed> {
    constructor(properties: Properties<IMsgMatchStartFailed>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IMsgStageQuit {
    uid?: number|null
}
@protobuf.Type.d("tss_match_v2_officematch_v1_MsgStageQuit")
export class MsgStageQuit extends protobuf.Message<IMsgStageQuit> {
    constructor(properties: Properties<IMsgStageQuit>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IStageLeaveMatchReq {
    uid?: number|null
    matchKey?: string|null
}
@protobuf.Type.d("tss_match_v2_officematch_v1_StageLeaveMatchReq")
export class StageLeaveMatchReq extends protobuf.Message<IStageLeaveMatchReq> {
    constructor(properties: Properties<IStageLeaveMatchReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.matchKey) { this.matchKey = properties.matchKey }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public matchKey?: string|null = ""
}
export interface IStageLeaveMatchResp {
    code?: number|null
}
@protobuf.Type.d("tss_match_v2_officematch_v1_StageLeaveMatchResp")
export class StageLeaveMatchResp extends protobuf.Message<IStageLeaveMatchResp> {
    constructor(properties: Properties<IStageLeaveMatchResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public code?: number|null = 0
}
export interface IMsgStageLeave {
    uid?: number|null
}
@protobuf.Type.d("tss_match_v2_officematch_v1_MsgStageLeave")
export class MsgStageLeave extends protobuf.Message<IMsgStageLeave> {
    constructor(properties: Properties<IMsgStageLeave>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IGetMatchConfigReq {
    matchKey?: string|null
}
@protobuf.Type.d("tss_match_v2_officematch_v1_GetMatchConfigReq")
export class GetMatchConfigReq extends protobuf.Message<IGetMatchConfigReq> {
    constructor(properties: Properties<IGetMatchConfigReq>) {
        super(properties);
        if (properties) {
            if (properties.matchKey) { this.matchKey = properties.matchKey }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public matchKey?: string|null = ""
}
export interface IGetMatchConfigResp {
    cfg?: tss_match_v2_common_IPreMatchConfig
}
@protobuf.Type.d("tss_match_v2_officematch_v1_GetMatchConfigResp")
export class GetMatchConfigResp extends protobuf.Message<IGetMatchConfigResp> {
    constructor(properties: Properties<IGetMatchConfigResp>) {
        super(properties);
        if (properties) {
            if (properties.cfg) { this.cfg = tss_match_v2_common_PreMatchConfig.create(properties.cfg) as any }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_common_PreMatchConfig", "optional")
    public cfg?: tss_match_v2_common_PreMatchConfig|null
}
export interface IUser {
    uid?: number|null
    score?: number|null
    rank?: number|null
    status?: tss_match_v2_common_UserStatus|null
    EnterAt?: number|null
    RoundCnt?: number|null
    isRobot?: boolean|null
    isDelayEnter?: boolean|null
    groupID?: number|null
    OutAt?: number|null
    punishMarks?: boolean|null
    punishCnt?: number|null
    prizeViewAssets?: tss_hall_common_IDynamicAssetItems[]
    curStFinishAt?: number|null
    prevStRank?: number|null
    isStageQuitFlag?: boolean|null
    rankTable?: number|null
    revivedCnt?: number|null
}
@protobuf.Type.d("tss_match_v2_officematch_v1_User")
export class User extends protobuf.Message<IUser> {
    constructor(properties: Properties<IUser>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.score) { this.score = properties.score }
            if (properties.rank) { this.rank = properties.rank }
            if (properties.status) { this.status = properties.status }
            if (properties.EnterAt) { this.EnterAt = properties.EnterAt }
            if (properties.RoundCnt) { this.RoundCnt = properties.RoundCnt }
            if (properties.isRobot) { this.isRobot = properties.isRobot }
            if (properties.isDelayEnter) { this.isDelayEnter = properties.isDelayEnter }
            if (properties.groupID) { this.groupID = properties.groupID }
            if (properties.OutAt) { this.OutAt = properties.OutAt }
            if (properties.punishMarks) { this.punishMarks = properties.punishMarks }
            if (properties.punishCnt) { this.punishCnt = properties.punishCnt }
            if (properties.prizeViewAssets) { this.prizeViewAssets = []; properties.prizeViewAssets.forEach((value, index)=>{this.prizeViewAssets[index] = tss_hall_common_DynamicAssetItems.create(properties.prizeViewAssets[index]) as any})}
            if (properties.curStFinishAt) { this.curStFinishAt = properties.curStFinishAt }
            if (properties.prevStRank) { this.prevStRank = properties.prevStRank }
            if (properties.isStageQuitFlag) { this.isStageQuitFlag = properties.isStageQuitFlag }
            if (properties.rankTable) { this.rankTable = properties.rankTable }
            if (properties.revivedCnt) { this.revivedCnt = properties.revivedCnt }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public score?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public rank?: number|null = 0
    @protobuf.Field.d(4, tss_match_v2_common_UserStatus, "optional", tss_match_v2_common_UserStatus.UserStatusUnknown)
    public status?: tss_match_v2_common_UserStatus|null = tss_match_v2_common_UserStatus.UserStatusUnknown
    @protobuf.Field.d(5, "int64", "optional", 0)
    public EnterAt?: number|null = 0
    @protobuf.Field.d(6, "int64", "optional", 0)
    public RoundCnt?: number|null = 0
    @protobuf.Field.d(7, "bool", "optional", false)
    public isRobot?: boolean|null = false
    @protobuf.Field.d(8, "bool", "optional", false)
    public isDelayEnter?: boolean|null = false
    @protobuf.Field.d(9, "int64", "optional", 0)
    public groupID?: number|null = 0
    @protobuf.Field.d(10, "int64", "optional", 0)
    public OutAt?: number|null = 0
    @protobuf.Field.d(11, "bool", "optional", false)
    public punishMarks?: boolean|null = false
    @protobuf.Field.d(12, "int64", "optional", 0)
    public punishCnt?: number|null = 0
    @protobuf.Field.d(13, "tss_hall_common_DynamicAssetItems", "repeated")
    public prizeViewAssets?: tss_hall_common_DynamicAssetItems[] = []
    @protobuf.Field.d(14, "int64", "optional", 0)
    public curStFinishAt?: number|null = 0
    @protobuf.Field.d(15, "int64", "optional", 0)
    public prevStRank?: number|null = 0
    @protobuf.Field.d(16, "bool", "optional", false)
    public isStageQuitFlag?: boolean|null = false
    @protobuf.Field.d(17, "int64", "optional", 0)
    public rankTable?: number|null = 0
    @protobuf.Field.d(18, "int64", "optional", 0)
    public revivedCnt?: number|null = 0
}
export interface IReconnectMatchResp {
    info?: IIGInfo
    isOnLook?: boolean|null
    matchKey?: string|null
}
@protobuf.Type.d("tss_match_v2_officematch_v1_ReconnectMatchResp")
export class ReconnectMatchResp extends protobuf.Message<IReconnectMatchResp> {
    constructor(properties: Properties<IReconnectMatchResp>) {
        super(properties);
        if (properties) {
            if (properties.info) { this.info = IGInfo.create(properties.info) as any }
            if (properties.isOnLook) { this.isOnLook = properties.isOnLook }
            if (properties.matchKey) { this.matchKey = properties.matchKey }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_officematch_v1_IGInfo", "optional")
    public info?: IGInfo|null
    @protobuf.Field.d(2, "bool", "optional", false)
    public isOnLook?: boolean|null = false
    @protobuf.Field.d(3, "string", "optional", )
    public matchKey?: string|null = ""
}
export interface IMsgUserSettlementV2 {
    user?: ISettleUser
}
@protobuf.Type.d("tss_match_v2_officematch_v1_MsgUserSettlementV2")
export class MsgUserSettlementV2 extends protobuf.Message<IMsgUserSettlementV2> {
    constructor(properties: Properties<IMsgUserSettlementV2>) {
        super(properties);
        if (properties) {
            if (properties.user) { this.user = SettleUser.create(properties.user) as any }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_officematch_v1_SettleUser", "optional")
    public user?: SettleUser|null
}
export interface IMsgTableResultV2 {
    key?: string|null
    users?: ITableResultUser[]
    tableGameData?: Uint8Array
}
@protobuf.Type.d("tss_match_v2_officematch_v1_MsgTableResultV2")
export class MsgTableResultV2 extends protobuf.Message<IMsgTableResultV2> {
    constructor(properties: Properties<IMsgTableResultV2>) {
        super(properties);
        if (properties) {
            if (properties.key) { this.key = properties.key }
            if (properties.users) { this.users = []; properties.users.forEach((value, index)=>{this.users[index] = TableResultUser.create(properties.users[index]) as any})}
            if (properties.tableGameData) { this.tableGameData = properties.tableGameData }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public key?: string|null = ""
    @protobuf.Field.d(2, "tss_match_v2_officematch_v1_TableResultUser", "repeated")
    public users?: TableResultUser[] = []
    @protobuf.Field.d(3, "bytes", "optional", [])
    public tableGameData?: Uint8Array
}
export interface ITable {
    key?: string|null
    baseScore?: number|null
    outScore?: number|null
    uids?: number[]
    gameNo?: number|null
    realKey?: string|null
    status?: tss_match_v2_common_TableStatus|null
    groupID?: number|null
}
@protobuf.Type.d("tss_match_v2_officematch_v1_Table")
export class Table extends protobuf.Message<ITable> {
    constructor(properties: Properties<ITable>) {
        super(properties);
        if (properties) {
            if (properties.key) { this.key = properties.key }
            if (properties.baseScore) { this.baseScore = properties.baseScore }
            if (properties.outScore) { this.outScore = properties.outScore }
            if (properties.uids) { this.uids = []; properties.uids.forEach((value, index)=>{this.uids[index] = properties.uids[index]})}
            if (properties.gameNo) { this.gameNo = properties.gameNo }
            if (properties.realKey) { this.realKey = properties.realKey }
            if (properties.status) { this.status = properties.status }
            if (properties.groupID) { this.groupID = properties.groupID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public key?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public baseScore?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public outScore?: number|null = 0
    @protobuf.Field.d(4, "int64", "repeated", [])
    public uids?: number[] = []
    @protobuf.Field.d(5, "int64", "optional", 0)
    public gameNo?: number|null = 0
    @protobuf.Field.d(6, "string", "optional", )
    public realKey?: string|null = ""
    @protobuf.Field.d(7, tss_match_v2_common_TableStatus, "optional", tss_match_v2_common_TableStatus.TableStatusUnknown)
    public status?: tss_match_v2_common_TableStatus|null = tss_match_v2_common_TableStatus.TableStatusUnknown
    @protobuf.Field.d(8, "int64", "optional", 0)
    public groupID?: number|null = 0
}
export interface IGetIGInfoResp {
    info?: IIGInfo
}
@protobuf.Type.d("tss_match_v2_officematch_v1_GetIGInfoResp")
export class GetIGInfoResp extends protobuf.Message<IGetIGInfoResp> {
    constructor(properties: Properties<IGetIGInfoResp>) {
        super(properties);
        if (properties) {
            if (properties.info) { this.info = IGInfo.create(properties.info) as any }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_officematch_v1_IGInfo", "optional")
    public info?: IGInfo|null
}
export interface IMsgTableStartV2 {
    tables?: IOnStartTable[]
}
@protobuf.Type.d("tss_match_v2_officematch_v1_MsgTableStartV2")
export class MsgTableStartV2 extends protobuf.Message<IMsgTableStartV2> {
    constructor(properties: Properties<IMsgTableStartV2>) {
        super(properties);
        if (properties) {
            if (properties.tables) { this.tables = []; properties.tables.forEach((value, index)=>{this.tables[index] = OnStartTable.create(properties.tables[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_officematch_v1_OnStartTable", "repeated")
    public tables?: OnStartTable[] = []
}
export interface IMsgUserStageEnd {
    uids?: number[]
    curStFinishAt?: number|null
}
@protobuf.Type.d("tss_match_v2_officematch_v1_MsgUserStageEnd")
export class MsgUserStageEnd extends protobuf.Message<IMsgUserStageEnd> {
    constructor(properties: Properties<IMsgUserStageEnd>) {
        super(properties);
        if (properties) {
            if (properties.uids) { this.uids = []; properties.uids.forEach((value, index)=>{this.uids[index] = properties.uids[index]})}
            if (properties.curStFinishAt) { this.curStFinishAt = properties.curStFinishAt }
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public uids?: number[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public curStFinishAt?: number|null = 0
}
export interface IMsgUserStatusWaitOver {
    uids?: number[]
    curStFinishAt?: number|null
}
@protobuf.Type.d("tss_match_v2_officematch_v1_MsgUserStatusWaitOver")
export class MsgUserStatusWaitOver extends protobuf.Message<IMsgUserStatusWaitOver> {
    constructor(properties: Properties<IMsgUserStatusWaitOver>) {
        super(properties);
        if (properties) {
            if (properties.uids) { this.uids = []; properties.uids.forEach((value, index)=>{this.uids[index] = properties.uids[index]})}
            if (properties.curStFinishAt) { this.curStFinishAt = properties.curStFinishAt }
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public uids?: number[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public curStFinishAt?: number|null = 0
}
export interface IMsgUserStatusBye {
    uids?: number[]
}
@protobuf.Type.d("tss_match_v2_officematch_v1_MsgUserStatusBye")
export class MsgUserStatusBye extends protobuf.Message<IMsgUserStatusBye> {
    constructor(properties: Properties<IMsgUserStatusBye>) {
        super(properties);
        if (properties) {
            if (properties.uids) { this.uids = []; properties.uids.forEach((value, index)=>{this.uids[index] = properties.uids[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public uids?: number[] = []
}
export interface IMsgUserDelayJoin {
    uid?: number|null
}
@protobuf.Type.d("tss_match_v2_officematch_v1_MsgUserDelayJoin")
export class MsgUserDelayJoin extends protobuf.Message<IMsgUserDelayJoin> {
    constructor(properties: Properties<IMsgUserDelayJoin>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
}
class $OfficeMatchService extends RpcService {
    async StartMatch(req: IStartMatchReq, params?: RpcParams) : Promise<{err:number, resp:IStartMatchResp}> {
        let data = StartMatchReq.create(req)
        this.onBeforeReq("StartMatch", data, params)
        const buffer = StartMatchReq.encode(data).finish()
        let [err, pack] = await this.call("StartMatch", buffer, params)
        if (err) {
            this.onBeforeResp("StartMatch", err)
            return {err: err, resp: null}
        } else {
            let resp = StartMatchResp.decode(pack) as any
            this.onBeforeResp("StartMatch", err, resp)
            return {err: null, resp: resp}
        }
    }
    async UpdateRoomUser(req: IUpdateRoomUserReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = UpdateRoomUserReq.create(req)
        this.onBeforeReq("UpdateRoomUser", data, params)
        const buffer = UpdateRoomUserReq.encode(data).finish()
        let [err, pack] = await this.call("UpdateRoomUser", buffer, params)
        if (err) {
            this.onBeforeResp("UpdateRoomUser", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("UpdateRoomUser", err, resp)
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
    async HandleGameResult(req: tss_match_v2_common_IHandleGameResultReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = tss_match_v2_common_HandleGameResultReq.create(req)
        this.onBeforeReq("HandleGameResult", data, params)
        const buffer = tss_match_v2_common_HandleGameResultReq.encode(data).finish()
        let [err, pack] = await this.call("HandleGameResult", buffer, params)
        if (err) {
            this.onBeforeResp("HandleGameResult", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("HandleGameResult", err, resp)
            return {err: null, resp: resp}
        }
    }
    async HandleGameException(req: tss_match_v2_common_IHandleGameExceptionReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = tss_match_v2_common_HandleGameExceptionReq.create(req)
        this.onBeforeReq("HandleGameException", data, params)
        const buffer = tss_match_v2_common_HandleGameExceptionReq.encode(data).finish()
        let [err, pack] = await this.call("HandleGameException", buffer, params)
        if (err) {
            this.onBeforeResp("HandleGameException", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("HandleGameException", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetIGInfo(req: IGetIGInfoReq, params?: RpcParams) : Promise<{err:number, resp:IGetIGInfoResp}> {
        let data = GetIGInfoReq.create(req)
        this.onBeforeReq("GetIGInfo", data, params)
        const buffer = GetIGInfoReq.encode(data).finish()
        let [err, pack] = await this.call("GetIGInfo", buffer, params)
        if (err) {
            this.onBeforeResp("GetIGInfo", err)
            return {err: err, resp: null}
        } else {
            let resp = GetIGInfoResp.decode(pack) as any
            this.onBeforeResp("GetIGInfo", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ReconnectMatch(req: IReconnectMatchReq, params?: RpcParams) : Promise<{err:number, resp:IReconnectMatchResp}> {
        let data = ReconnectMatchReq.create(req)
        this.onBeforeReq("ReconnectMatch", data, params)
        const buffer = ReconnectMatchReq.encode(data).finish()
        let [err, pack] = await this.call("ReconnectMatch", buffer, params)
        if (err) {
            this.onBeforeResp("ReconnectMatch", err)
            return {err: err, resp: null}
        } else {
            let resp = ReconnectMatchResp.decode(pack) as any
            this.onBeforeResp("ReconnectMatch", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DelayJoinMatch(req: IDelayJoinMatchReq, params?: RpcParams) : Promise<{err:number, resp:IDelayJoinMatchResp}> {
        let data = DelayJoinMatchReq.create(req)
        this.onBeforeReq("DelayJoinMatch", data, params)
        const buffer = DelayJoinMatchReq.encode(data).finish()
        let [err, pack] = await this.call("DelayJoinMatch", buffer, params)
        if (err) {
            this.onBeforeResp("DelayJoinMatch", err)
            return {err: err, resp: null}
        } else {
            let resp = DelayJoinMatchResp.decode(pack) as any
            this.onBeforeResp("DelayJoinMatch", err, resp)
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
    async Revival(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:IRevivalResp}> {
        let data = base_Void.create(req)
        this.onBeforeReq("Revival", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("Revival", buffer, params)
        if (err) {
            this.onBeforeResp("Revival", err)
            return {err: err, resp: null}
        } else {
            let resp = RevivalResp.decode(pack) as any
            this.onBeforeResp("Revival", err, resp)
            return {err: null, resp: resp}
        }
    }
    async RevivalByAdvertising(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:IRevivalByAdvertisingResp}> {
        let data = base_Void.create(req)
        this.onBeforeReq("RevivalByAdvertising", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("RevivalByAdvertising", buffer, params)
        if (err) {
            this.onBeforeResp("RevivalByAdvertising", err)
            return {err: err, resp: null}
        } else {
            let resp = RevivalByAdvertisingResp.decode(pack) as any
            this.onBeforeResp("RevivalByAdvertising", err, resp)
            return {err: null, resp: resp}
        }
    }
    async LookAdvertising(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:ILookAdvertisingResp}> {
        let data = base_Void.create(req)
        this.onBeforeReq("LookAdvertising", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("LookAdvertising", buffer, params)
        if (err) {
            this.onBeforeResp("LookAdvertising", err)
            return {err: err, resp: null}
        } else {
            let resp = LookAdvertisingResp.decode(pack) as any
            this.onBeforeResp("LookAdvertising", err, resp)
            return {err: null, resp: resp}
        }
    }
    async CancelRevival(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:ICancelRevivalResp}> {
        let data = base_Void.create(req)
        this.onBeforeReq("CancelRevival", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("CancelRevival", buffer, params)
        if (err) {
            this.onBeforeResp("CancelRevival", err)
            return {err: err, resp: null}
        } else {
            let resp = CancelRevivalResp.decode(pack) as any
            this.onBeforeResp("CancelRevival", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetMsgUserRevival(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:IMsgUserRevival}> {
        let data = base_Void.create(req)
        this.onBeforeReq("GetMsgUserRevival", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("GetMsgUserRevival", buffer, params)
        if (err) {
            this.onBeforeResp("GetMsgUserRevival", err)
            return {err: err, resp: null}
        } else {
            let resp = MsgUserRevival.decode(pack) as any
            this.onBeforeResp("GetMsgUserRevival", err, resp)
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
    async StageEndQuitMatch(req: IStageEndQuitMatchReq, params?: RpcParams) : Promise<{err:number, resp:IStageEndQuitMatchResp}> {
        let data = StageEndQuitMatchReq.create(req)
        this.onBeforeReq("StageEndQuitMatch", data, params)
        const buffer = StageEndQuitMatchReq.encode(data).finish()
        let [err, pack] = await this.call("StageEndQuitMatch", buffer, params)
        if (err) {
            this.onBeforeResp("StageEndQuitMatch", err)
            return {err: err, resp: null}
        } else {
            let resp = StageEndQuitMatchResp.decode(pack) as any
            this.onBeforeResp("StageEndQuitMatch", err, resp)
            return {err: null, resp: resp}
        }
    }
    async StageLeaveMatch(req: IStageLeaveMatchReq, params?: RpcParams) : Promise<{err:number, resp:IStageLeaveMatchResp}> {
        let data = StageLeaveMatchReq.create(req)
        this.onBeforeReq("StageLeaveMatch", data, params)
        const buffer = StageLeaveMatchReq.encode(data).finish()
        let [err, pack] = await this.call("StageLeaveMatch", buffer, params)
        if (err) {
            this.onBeforeResp("StageLeaveMatch", err)
            return {err: err, resp: null}
        } else {
            let resp = StageLeaveMatchResp.decode(pack) as any
            this.onBeforeResp("StageLeaveMatch", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetMatchConfig(req: IGetMatchConfigReq, params?: RpcParams) : Promise<{err:number, resp:IGetMatchConfigResp}> {
        let data = GetMatchConfigReq.create(req)
        this.onBeforeReq("GetMatchConfig", data, params)
        const buffer = GetMatchConfigReq.encode(data).finish()
        let [err, pack] = await this.call("GetMatchConfig", buffer, params)
        if (err) {
            this.onBeforeResp("GetMatchConfig", err)
            return {err: err, resp: null}
        } else {
            let resp = GetMatchConfigResp.decode(pack) as any
            this.onBeforeResp("GetMatchConfig", err, resp)
            return {err: null, resp: resp}
        }
    }
    NotifyMatchStart(data: Uint8Array, params: RpcParams) : {msg: IMsgMatchStart, eventID?: number} {
        let msg = MsgMatchStart.decode(data)
        return {msg: msg}
    }
    NotifyMatchOver(data: Uint8Array, params: RpcParams) : {msg: IMsgMatchOver, eventID?: number} {
        let msg = MsgMatchOver.decode(data)
        return {msg: msg}
    }
    NotifyMatchOverV2(data: Uint8Array, params: RpcParams) : {msg: base_IVoid, eventID?: number} {
        let msg = base_Void.decode(data)
        return {msg: msg}
    }
    NotifyStageStart(data: Uint8Array, params: RpcParams) : {msg: IMsgStageStart, eventID?: number} {
        let msg = MsgStageStart.decode(data)
        return {msg: msg}
    }
    NotifyStageStartV2(data: Uint8Array, params: RpcParams) : {msg: IMsgStageStartV2, eventID?: number} {
        let msg = MsgStageStartV2.decode(data)
        return {msg: msg}
    }
    NotifyStageEnd(data: Uint8Array, params: RpcParams) : {msg: IMsgStageEnd, eventID?: number} {
        let msg = MsgStageEnd.decode(data)
        return {msg: msg}
    }
    NotifyStageGroupEnd(data: Uint8Array, params: RpcParams) : {msg: IMsgStageGroupEnd, eventID?: number} {
        let msg = MsgStageGroupEnd.decode(data)
        return {msg: msg}
    }
    NotifyTableStart(data: Uint8Array, params: RpcParams) : {msg: IMsgTableStart, eventID?: number} {
        let msg = MsgTableStart.decode(data)
        return {msg: msg}
    }
    NotifyTableStartV2(data: Uint8Array, params: RpcParams) : {msg: IMsgTableStartV2, eventID?: number} {
        let msg = MsgTableStartV2.decode(data)
        return {msg: msg}
    }
    NotifyTableGameStart(data: Uint8Array, params: RpcParams) : {msg: IMsgTableGameStart, eventID?: number} {
        let msg = MsgTableGameStart.decode(data)
        return {msg: msg}
    }
    NotifyTableResult(data: Uint8Array, params: RpcParams) : {msg: IMsgTableResult, eventID?: number} {
        let msg = MsgTableResult.decode(data)
        return {msg: msg}
    }
    NotifyTableResultV2(data: Uint8Array, params: RpcParams) : {msg: IMsgTableResultV2, eventID?: number} {
        let msg = MsgTableResultV2.decode(data)
        return {msg: msg}
    }
    NotifyTableEnd(data: Uint8Array, params: RpcParams) : {msg: IMsgTableEnd, eventID?: number} {
        let msg = MsgTableEnd.decode(data)
        return {msg: msg}
    }
    NotifyUserChange(data: Uint8Array, params: RpcParams) : {msg: IMsgUserChange, eventID?: number} {
        let msg = MsgUserChange.decode(data)
        return {msg: msg}
    }
    NotifyScoreChange(data: Uint8Array, params: RpcParams) : {msg: IMsgScoreChange, eventID?: number} {
        let msg = MsgScoreChange.decode(data)
        return {msg: msg}
    }
    NotifyUserSettlement(data: Uint8Array, params: RpcParams) : {msg: IMsgUserSettlement, eventID?: number} {
        let msg = MsgUserSettlement.decode(data)
        return {msg: msg}
    }
    NotifyUserSettlementV2(data: Uint8Array, params: RpcParams) : {msg: IMsgUserSettlementV2, eventID?: number} {
        let msg = MsgUserSettlementV2.decode(data)
        return {msg: msg}
    }
    NotifyAllGameEnd(data: Uint8Array, params: RpcParams) : {msg: IMsgAllGameEnd, eventID?: number} {
        let msg = MsgAllGameEnd.decode(data)
        return {msg: msg}
    }
    NotifyUserRevival(data: Uint8Array, params: RpcParams) : {msg: IMsgUserRevival, eventID?: number} {
        let msg = MsgUserRevival.decode(data)
        return {msg: msg}
    }
    NotifyUserRevivalV2(data: Uint8Array, params: RpcParams) : {msg: IMsgUserRevivalV2, eventID?: number} {
        let msg = MsgUserRevivalV2.decode(data)
        return {msg: msg}
    }
    NotifyUserRevived(data: Uint8Array, params: RpcParams) : {msg: IMsgUserRevived, eventID?: number} {
        let msg = MsgUserRevived.decode(data)
        return {msg: msg}
    }
    NotifyPoolChange(data: Uint8Array, params: RpcParams) : {msg: IMsgPoolChange, eventID?: number} {
        let msg = MsgPoolChange.decode(data)
        return {msg: msg}
    }
    NotifyUserPromotion(data: Uint8Array, params: RpcParams) : {msg: base_IVoid, eventID?: number} {
        let msg = base_Void.decode(data)
        return {msg: msg}
    }
    NotifyGoToHomePage(data: Uint8Array, params: RpcParams) : {msg: base_IVoid, eventID?: number} {
        let msg = base_Void.decode(data)
        return {msg: msg}
    }
    NotifyMatchStartFailed(data: Uint8Array, params: RpcParams) : {msg: IMsgMatchStartFailed, eventID?: number} {
        let msg = MsgMatchStartFailed.decode(data)
        return {msg: msg}
    }
    NotifyMsgStageQuit(data: Uint8Array, params: RpcParams) : {msg: IMsgStageQuit, eventID?: number} {
        let msg = MsgStageQuit.decode(data)
        return {msg: msg}
    }
    NotifyMsgStageLeave(data: Uint8Array, params: RpcParams) : {msg: IMsgStageLeave, eventID?: number} {
        let msg = MsgStageLeave.decode(data)
        return {msg: msg}
    }
    NotifyUserStageEnd(data: Uint8Array, params: RpcParams) : {msg: IMsgUserStageEnd, eventID?: number} {
        let msg = MsgUserStageEnd.decode(data)
        return {msg: msg}
    }
    NotifyUserStatusBye(data: Uint8Array, params: RpcParams) : {msg: IMsgUserStatusBye, eventID?: number} {
        let msg = MsgUserStatusBye.decode(data)
        return {msg: msg}
    }
    NotifyUserStatusWaitOver(data: Uint8Array, params: RpcParams) : {msg: IMsgUserStatusWaitOver, eventID?: number} {
        let msg = MsgUserStatusWaitOver.decode(data)
        return {msg: msg}
    }
    NotifyUserDelayJoin(data: Uint8Array, params: RpcParams) : {msg: IMsgUserDelayJoin, eventID?: number} {
        let msg = MsgUserDelayJoin.decode(data)
        return {msg: msg}
    }
}
export const OfficeMatchService = new $OfficeMatchService({
    name: "tss.match.v2.officematch.v1",
})
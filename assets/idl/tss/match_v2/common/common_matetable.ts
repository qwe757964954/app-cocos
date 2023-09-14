import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  AssetType as tss_common_AssetType ,  } from "idl/tss/common/common_define"
import {  DynamicAssetItems as tss_hall_common_DynamicAssetItems,IDynamicAssetItems as tss_hall_common_IDynamicAssetItems ,  } from "idl/tss/hall/common/assets"
import {  GameResultType as tss_match_v2_common_GameResultType ,  } from "idl/tss/match_v2/common/common"
import {  MateMode as tss_match_v2_commonmatesession_MateMode ,  } from "idl/tss/match_v2/common/common_matesession"
export enum RecyclingSource {  
    RecyclingSourceUnknown = 0,  
    RecyclingSourceUser = 1,  
    RecyclingSourceTimed = 2,
}
export interface ILevelInfo {
    levelName?: string|null
    level?: number|null
    seg?: number|null
    icon?: string|null
}
@protobuf.Type.d("tss_match_v2_commonmatetable_LevelInfo")
export class LevelInfo extends protobuf.Message<ILevelInfo> {
    constructor(properties: Properties<ILevelInfo>) {
        super(properties);
        if (properties) {
            if (properties.levelName) { this.levelName = properties.levelName }
            if (properties.level) { this.level = properties.level }
            if (properties.seg) { this.seg = properties.seg }
            if (properties.icon) { this.icon = properties.icon }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public levelName?: string|null = ""
    @protobuf.Field.d(2, "int32", "optional", 0)
    public level?: number|null = 0
    @protobuf.Field.d(3, "double", "optional", 0)
    public seg?: number|null = 0
    @protobuf.Field.d(4, "string", "optional", )
    public icon?: string|null = ""
}
export interface IProp {
    propID?: number|null
    num?: number|null
    assetType?: tss_common_AssetType|null
}
@protobuf.Type.d("tss_match_v2_commonmatetable_Prop")
export class Prop extends protobuf.Message<IProp> {
    constructor(properties: Properties<IProp>) {
        super(properties);
        if (properties) {
            if (properties.propID) { this.propID = properties.propID }
            if (properties.num) { this.num = properties.num }
            if (properties.assetType) { this.assetType = properties.assetType }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public propID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public num?: number|null = 0
    @protobuf.Field.d(3, tss_common_AssetType, "optional", tss_common_AssetType.AssetTypeUnknown)
    public assetType?: tss_common_AssetType|null = tss_common_AssetType.AssetTypeUnknown
}
export interface IUser {
    uid?: number|null
    cup?: number|null
    ownProp?: IProp
    changeScore?: number|null
    assets?: tss_hall_common_IDynamicAssetItems[]
    teamId?: string|null
    isPunishment?: boolean|null
}
@protobuf.Type.d("tss_match_v2_commonmatetable_User")
export class User extends protobuf.Message<IUser> {
    constructor(properties: Properties<IUser>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.cup) { this.cup = properties.cup }
            if (properties.ownProp) { this.ownProp = Prop.create(properties.ownProp) as any }
            if (properties.changeScore) { this.changeScore = properties.changeScore }
            if (properties.assets) { this.assets = []; properties.assets.forEach((value, index)=>{this.assets[index] = tss_hall_common_DynamicAssetItems.create(properties.assets[index]) as any})}
            if (properties.teamId) { this.teamId = properties.teamId }
            if (properties.isPunishment) { this.isPunishment = properties.isPunishment }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public cup?: number|null = 0
    @protobuf.Field.d(3, "tss_match_v2_commonmatetable_Prop", "optional")
    public ownProp?: Prop|null
    @protobuf.Field.d(4, "int32", "optional", 0)
    public changeScore?: number|null = 0
    @protobuf.Field.d(5, "tss_hall_common_DynamicAssetItems", "repeated")
    public assets?: tss_hall_common_DynamicAssetItems[] = []
    @protobuf.Field.d(6, "string", "optional", )
    public teamId?: string|null = ""
    @protobuf.Field.d(7, "bool", "optional", false)
    public isPunishment?: boolean|null = false
}
export interface ITable {
    srvID?: number|null
    tKey?: string|null
    startTime?: number|null
    endTime?: number|null
}
@protobuf.Type.d("tss_match_v2_commonmatetable_Table")
export class Table extends protobuf.Message<ITable> {
    constructor(properties: Properties<ITable>) {
        super(properties);
        if (properties) {
            if (properties.srvID) { this.srvID = properties.srvID }
            if (properties.tKey) { this.tKey = properties.tKey }
            if (properties.startTime) { this.startTime = properties.startTime }
            if (properties.endTime) { this.endTime = properties.endTime }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public srvID?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public tKey?: string|null = ""
    @protobuf.Field.d(3, "int64", "optional", 0)
    public startTime?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public endTime?: number|null = 0
}
export interface IDeskUser {
    uid?: number|null
    joinTime?: number|null
    isRobot?: boolean|null
    isReady?: boolean|null
    deskID?: number|null
    sessionID?: string|null
    seatNo?: number|null
    ownProp?: IProp
    applicationId?: string|null
    version?: string|null
    teamId?: string|null
    resultType?: tss_match_v2_common_GameResultType|null
}
@protobuf.Type.d("tss_match_v2_commonmatetable_DeskUser")
export class DeskUser extends protobuf.Message<IDeskUser> {
    constructor(properties: Properties<IDeskUser>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.joinTime) { this.joinTime = properties.joinTime }
            if (properties.isRobot) { this.isRobot = properties.isRobot }
            if (properties.isReady) { this.isReady = properties.isReady }
            if (properties.deskID) { this.deskID = properties.deskID }
            if (properties.sessionID) { this.sessionID = properties.sessionID }
            if (properties.seatNo) { this.seatNo = properties.seatNo }
            if (properties.ownProp) { this.ownProp = Prop.create(properties.ownProp) as any }
            if (properties.applicationId) { this.applicationId = properties.applicationId }
            if (properties.version) { this.version = properties.version }
            if (properties.teamId) { this.teamId = properties.teamId }
            if (properties.resultType) { this.resultType = properties.resultType }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public joinTime?: number|null = 0
    @protobuf.Field.d(3, "bool", "optional", false)
    public isRobot?: boolean|null = false
    @protobuf.Field.d(4, "bool", "optional", false)
    public isReady?: boolean|null = false
    @protobuf.Field.d(5, "int64", "optional", 0)
    public deskID?: number|null = 0
    @protobuf.Field.d(6, "string", "optional", )
    public sessionID?: string|null = ""
    @protobuf.Field.d(7, "int64", "optional", 0)
    public seatNo?: number|null = 0
    @protobuf.Field.d(8, "tss_match_v2_commonmatetable_Prop", "optional")
    public ownProp?: Prop|null
    @protobuf.Field.d(9, "string", "optional", )
    public applicationId?: string|null = ""
    @protobuf.Field.d(10, "string", "optional", )
    public version?: string|null = ""
    @protobuf.Field.d(11, "string", "optional", )
    public teamId?: string|null = ""
    @protobuf.Field.d(12, tss_match_v2_common_GameResultType, "optional", tss_match_v2_common_GameResultType.GameResultTypeUnknown)
    public resultType?: tss_match_v2_common_GameResultType|null = tss_match_v2_common_GameResultType.GameResultTypeUnknown
}
export interface IMateSession {
    srvName?: string|null
    sessionID?: string|null
    gameID?: string|null
    deskID?: number|null
    srvID?: number|null
    users?: IDeskUser[]
    matchKey?: string|null
    playWay?: number|null
    mateMode?: tss_match_v2_commonmatesession_MateMode|null
    teamID?: string|null
}
@protobuf.Type.d("tss_match_v2_commonmatetable_MateSession")
export class MateSession extends protobuf.Message<IMateSession> {
    constructor(properties: Properties<IMateSession>) {
        super(properties);
        if (properties) {
            if (properties.srvName) { this.srvName = properties.srvName }
            if (properties.sessionID) { this.sessionID = properties.sessionID }
            if (properties.gameID) { this.gameID = properties.gameID }
            if (properties.deskID) { this.deskID = properties.deskID }
            if (properties.srvID) { this.srvID = properties.srvID }
            if (properties.users) { this.users = []; properties.users.forEach((value, index)=>{this.users[index] = DeskUser.create(properties.users[index]) as any})}
            if (properties.matchKey) { this.matchKey = properties.matchKey }
            if (properties.playWay) { this.playWay = properties.playWay }
            if (properties.mateMode) { this.mateMode = properties.mateMode }
            if (properties.teamID) { this.teamID = properties.teamID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public srvName?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public sessionID?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public gameID?: string|null = ""
    @protobuf.Field.d(4, "int64", "optional", 0)
    public deskID?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public srvID?: number|null = 0
    @protobuf.Field.d(6, "tss_match_v2_commonmatetable_DeskUser", "repeated")
    public users?: DeskUser[] = []
    @protobuf.Field.d(7, "string", "optional", )
    public matchKey?: string|null = ""
    @protobuf.Field.d(8, "int32", "optional", 0)
    public playWay?: number|null = 0
    @protobuf.Field.d(9, tss_match_v2_commonmatesession_MateMode, "optional", tss_match_v2_commonmatesession_MateMode.MateModeUnknown)
    public mateMode?: tss_match_v2_commonmatesession_MateMode|null = tss_match_v2_commonmatesession_MateMode.MateModeUnknown
    @protobuf.Field.d(10, "string", "optional", )
    public teamID?: string|null = ""
}
export interface IHandlerTableOverReq {
    deskId?: number|null
    deskUsers?: IDeskUser[]
}
@protobuf.Type.d("tss_match_v2_commonmatetable_HandlerTableOverReq")
export class HandlerTableOverReq extends protobuf.Message<IHandlerTableOverReq> {
    constructor(properties: Properties<IHandlerTableOverReq>) {
        super(properties);
        if (properties) {
            if (properties.deskId) { this.deskId = properties.deskId }
            if (properties.deskUsers) { this.deskUsers = []; properties.deskUsers.forEach((value, index)=>{this.deskUsers[index] = DeskUser.create(properties.deskUsers[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public deskId?: number|null = 0
    @protobuf.Field.d(2, "tss_match_v2_commonmatetable_DeskUser", "repeated")
    public deskUsers?: DeskUser[] = []
}
export interface IHandlerTableAbortReq {
    deskId?: number|null
}
@protobuf.Type.d("tss_match_v2_commonmatetable_HandlerTableAbortReq")
export class HandlerTableAbortReq extends protobuf.Message<IHandlerTableAbortReq> {
    constructor(properties: Properties<IHandlerTableAbortReq>) {
        super(properties);
        if (properties) {
            if (properties.deskId) { this.deskId = properties.deskId }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public deskId?: number|null = 0
}
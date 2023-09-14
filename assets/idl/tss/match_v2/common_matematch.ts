import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  AssetType as tss_common_AssetType ,  SwitchState as tss_common_SwitchState ,  } from "idl/tss/common/common_define"
import {  DynamicAssetItems as tss_hall_common_DynamicAssetItems,IDynamicAssetItems as tss_hall_common_IDynamicAssetItems ,  } from "idl/tss/hall/common/assets"
import {  ExtraParamConfig as tss_hall_common_ExtraParamConfig,IExtraParamConfig as tss_hall_common_IExtraParamConfig ,  } from "idl/tss/hall/common/premiumcard"
import {  PunishmentConfig as tss_match_v2_common_PunishmentConfig,IPunishmentConfig as tss_match_v2_common_IPunishmentConfig ,  } from "idl/tss/match_v2/common/common"
export enum SubMatchType {  
    SubMatchTypeUnknown = 0,  
    SubMatchTypeRookie = 1,  
    SubMatchTypePrimary = 2,  
    SubMatchTypeIntermediate = 3,  
    SubMatchTypeSenior = 4,  
    SubMatchTypeMaster = 5,  
    SubMatchTypeExpert = 6,  
    SubMatchTypePeak = 7,  
    SubMatchTypeKing = 8,  
    SubMatchTypeBackupOne = 9,  
    SubMatchTypeBackupTwo = 10,  
    SubMatchTypeBackupThree = 11,  
    SubMatchTypeBackupFour = 12,  
    SubMatchTypeBackupFive = 13,  
    SubMatchTypeBackupSix = 14,  
    SubMatchTypeBackupSeven = 15,  
    SubMatchTypeBackupEight = 16,
}
export enum UserType {  
    UserTypeAll = 0,  
    UserTypeVip = 1,
}
export enum StrengthDeductType {  
    StrengthSettleTypeUndefined = 0,  
    StrengthSettleTypeLose = 1,  
    StrengthSettleTypeDontCareResult = 2,
}
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
@protobuf.Type.d("tss_match_v2_mate_LevelInfo")
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
export interface ITimeSpan {
    start?: string|null
    end?: string|null
}
@protobuf.Type.d("tss_match_v2_mate_TimeSpan")
export class TimeSpan extends protobuf.Message<ITimeSpan> {
    constructor(properties: Properties<ITimeSpan>) {
        super(properties);
        if (properties) {
            if (properties.start) { this.start = properties.start }
            if (properties.end) { this.end = properties.end }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public start?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public end?: string|null = ""
}
export interface IRange {
    min?: number|null
    max?: number|null
}
@protobuf.Type.d("tss_match_v2_mate_Range")
export class Range extends protobuf.Message<IRange> {
    constructor(properties: Properties<IRange>) {
        super(properties);
        if (properties) {
            if (properties.min) { this.min = properties.min }
            if (properties.max) { this.max = properties.max }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public min?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public max?: number|null = 0
}
export interface ILeaveProbability {
    win?: number|null
    draw?: number|null
    lose?: number|null
}
@protobuf.Type.d("tss_match_v2_mate_LeaveProbability")
export class LeaveProbability extends protobuf.Message<ILeaveProbability> {
    constructor(properties: Properties<ILeaveProbability>) {
        super(properties);
        if (properties) {
            if (properties.win) { this.win = properties.win }
            if (properties.draw) { this.draw = properties.draw }
            if (properties.lose) { this.lose = properties.lose }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public win?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public draw?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public lose?: number|null = 0
}
export interface IRobot {
    isOpen?: boolean|null
    openTimeSpan?: ITimeSpan[]
    maxRobotNumPerTable?: number|null
    joinWaitSeconds?: IRange
    joinIntervalSeconds?: IRange
    leaveProbability?: ILeaveProbability
    leaveOrReadySeconds?: IRange
    robotDifficulty?: number|null
}
@protobuf.Type.d("tss_match_v2_mate_Robot")
export class Robot extends protobuf.Message<IRobot> {
    constructor(properties: Properties<IRobot>) {
        super(properties);
        if (properties) {
            if (properties.isOpen) { this.isOpen = properties.isOpen }
            if (properties.openTimeSpan) { this.openTimeSpan = []; properties.openTimeSpan.forEach((value, index)=>{this.openTimeSpan[index] = TimeSpan.create(properties.openTimeSpan[index]) as any})}
            if (properties.maxRobotNumPerTable) { this.maxRobotNumPerTable = properties.maxRobotNumPerTable }
            if (properties.joinWaitSeconds) { this.joinWaitSeconds = Range.create(properties.joinWaitSeconds) as any }
            if (properties.joinIntervalSeconds) { this.joinIntervalSeconds = Range.create(properties.joinIntervalSeconds) as any }
            if (properties.leaveProbability) { this.leaveProbability = LeaveProbability.create(properties.leaveProbability) as any }
            if (properties.leaveOrReadySeconds) { this.leaveOrReadySeconds = Range.create(properties.leaveOrReadySeconds) as any }
            if (properties.robotDifficulty) { this.robotDifficulty = properties.robotDifficulty }
        }
	}
    @protobuf.Field.d(1, "bool", "optional", false)
    public isOpen?: boolean|null = false
    @protobuf.Field.d(2, "tss_match_v2_mate_TimeSpan", "repeated")
    public openTimeSpan?: TimeSpan[] = []
    @protobuf.Field.d(3, "int32", "optional", 0)
    public maxRobotNumPerTable?: number|null = 0
    @protobuf.Field.d(4, "tss_match_v2_mate_Range", "optional")
    public joinWaitSeconds?: Range|null
    @protobuf.Field.d(5, "tss_match_v2_mate_Range", "optional")
    public joinIntervalSeconds?: Range|null
    @protobuf.Field.d(6, "tss_match_v2_mate_LeaveProbability", "optional")
    public leaveProbability?: LeaveProbability|null
    @protobuf.Field.d(7, "tss_match_v2_mate_Range", "optional")
    public leaveOrReadySeconds?: Range|null
    @protobuf.Field.d(8, "int32", "optional", 0)
    public robotDifficulty?: number|null = 0
}
export interface ISettle {
    type?: tss_common_AssetType|null
    propID?: number|null
    upperLimit?: number|null
    ratio?: number|null
    fee?: number|null
    isLimitSmallStroke?: boolean|null
}
@protobuf.Type.d("tss_match_v2_mate_Settle")
export class Settle extends protobuf.Message<ISettle> {
    constructor(properties: Properties<ISettle>) {
        super(properties);
        if (properties) {
            if (properties.type) { this.type = properties.type }
            if (properties.propID) { this.propID = properties.propID }
            if (properties.upperLimit) { this.upperLimit = properties.upperLimit }
            if (properties.ratio) { this.ratio = properties.ratio }
            if (properties.fee) { this.fee = properties.fee }
            if (properties.isLimitSmallStroke) { this.isLimitSmallStroke = properties.isLimitSmallStroke }
        }
	}
    @protobuf.Field.d(1, tss_common_AssetType, "optional", tss_common_AssetType.AssetTypeUnknown)
    public type?: tss_common_AssetType|null = tss_common_AssetType.AssetTypeUnknown
    @protobuf.Field.d(2, "int32", "optional", 0)
    public propID?: number|null = 0
    @protobuf.Field.d(3, "int32", "optional", 0)
    public upperLimit?: number|null = 0
    @protobuf.Field.d(4, "int32", "optional", 0)
    public ratio?: number|null = 0
    @protobuf.Field.d(5, "int32", "optional", 0)
    public fee?: number|null = 0
    @protobuf.Field.d(6, "bool", "optional", false)
    public isLimitSmallStroke?: boolean|null = false
}
export interface ISessionRecommendRange {
    minAssetsNum?: number|null
    maxAssetsNum?: number|null
}
@protobuf.Type.d("tss_match_v2_mate_SessionRecommendRange")
export class SessionRecommendRange extends protobuf.Message<ISessionRecommendRange> {
    constructor(properties: Properties<ISessionRecommendRange>) {
        super(properties);
        if (properties) {
            if (properties.minAssetsNum) { this.minAssetsNum = properties.minAssetsNum }
            if (properties.maxAssetsNum) { this.maxAssetsNum = properties.maxAssetsNum }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public minAssetsNum?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public maxAssetsNum?: number|null = 0
}
export interface IStrengthDeduct {
    isSpendStrength?: boolean|null
    type?: StrengthDeductType|null
    num?: number|null
}
@protobuf.Type.d("tss_match_v2_mate_StrengthDeduct")
export class StrengthDeduct extends protobuf.Message<IStrengthDeduct> {
    constructor(properties: Properties<IStrengthDeduct>) {
        super(properties);
        if (properties) {
            if (properties.isSpendStrength) { this.isSpendStrength = properties.isSpendStrength }
            if (properties.type) { this.type = properties.type }
            if (properties.num) { this.num = properties.num }
        }
	}
    @protobuf.Field.d(1, "bool", "optional", false)
    public isSpendStrength?: boolean|null = false
    @protobuf.Field.d(2, StrengthDeductType, "optional", StrengthDeductType.StrengthSettleTypeUndefined)
    public type?: StrengthDeductType|null = StrengthDeductType.StrengthSettleTypeUndefined
    @protobuf.Field.d(3, "int32", "optional", 0)
    public num?: number|null = 0
}
export interface IJoinLimit {
    minAssetsNum?: number|null
    strengthDeduct?: IStrengthDeduct
    maxAssetsNum?: number|null
    maxAssetsNumSwitch?: tss_common_SwitchState|null
    sessionRecommendSwitch?: tss_common_SwitchState|null
    sessionRecommendRange?: ISessionRecommendRange
}
@protobuf.Type.d("tss_match_v2_mate_JoinLimit")
export class JoinLimit extends protobuf.Message<IJoinLimit> {
    constructor(properties: Properties<IJoinLimit>) {
        super(properties);
        if (properties) {
            if (properties.minAssetsNum) { this.minAssetsNum = properties.minAssetsNum }
            if (properties.strengthDeduct) { this.strengthDeduct = StrengthDeduct.create(properties.strengthDeduct) as any }
            if (properties.maxAssetsNum) { this.maxAssetsNum = properties.maxAssetsNum }
            if (properties.maxAssetsNumSwitch) { this.maxAssetsNumSwitch = properties.maxAssetsNumSwitch }
            if (properties.sessionRecommendSwitch) { this.sessionRecommendSwitch = properties.sessionRecommendSwitch }
            if (properties.sessionRecommendRange) { this.sessionRecommendRange = SessionRecommendRange.create(properties.sessionRecommendRange) as any }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public minAssetsNum?: number|null = 0
    @protobuf.Field.d(2, "tss_match_v2_mate_StrengthDeduct", "optional")
    public strengthDeduct?: StrengthDeduct|null
    @protobuf.Field.d(3, "int32", "optional", 0)
    public maxAssetsNum?: number|null = 0
    @protobuf.Field.d(4, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public maxAssetsNumSwitch?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
    @protobuf.Field.d(5, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public sessionRecommendSwitch?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
    @protobuf.Field.d(6, "tss_match_v2_mate_SessionRecommendRange", "optional")
    public sessionRecommendRange?: SessionRecommendRange|null
}
export interface ISession {
    ID?: string|null
    name?: string|null
    gameID?: string|null
    img?: string|null
    isOpen?: boolean|null
    settle?: ISettle
    robot?: IRobot
    operator?: string|null
    updatedAt?: number|null
    createdAt?: number|null
    joinLimit?: IJoinLimit
    playWay?: number|null
    playWaySlogan?: string|null
    userType?: UserType|null
    applicationId?: string|null
    maxVersion?: number|null
    minVersion?: number|null
    subMatchType?: SubMatchType|null
    gameCounterID?: number|null
    cardImg?: string|null
    cmsAppIds?: string[]
    realViewAppIds?: string[]
    reportName?: string|null
    punishment?: tss_match_v2_common_IPunishmentConfig
    priority?: number|null
}
@protobuf.Type.d("tss_match_v2_mate_Session")
export class Session extends protobuf.Message<ISession> {
    constructor(properties: Properties<ISession>) {
        super(properties);
        if (properties) {
            if (properties.ID) { this.ID = properties.ID }
            if (properties.name) { this.name = properties.name }
            if (properties.gameID) { this.gameID = properties.gameID }
            if (properties.img) { this.img = properties.img }
            if (properties.isOpen) { this.isOpen = properties.isOpen }
            if (properties.settle) { this.settle = Settle.create(properties.settle) as any }
            if (properties.robot) { this.robot = Robot.create(properties.robot) as any }
            if (properties.operator) { this.operator = properties.operator }
            if (properties.updatedAt) { this.updatedAt = properties.updatedAt }
            if (properties.createdAt) { this.createdAt = properties.createdAt }
            if (properties.joinLimit) { this.joinLimit = JoinLimit.create(properties.joinLimit) as any }
            if (properties.playWay) { this.playWay = properties.playWay }
            if (properties.playWaySlogan) { this.playWaySlogan = properties.playWaySlogan }
            if (properties.userType) { this.userType = properties.userType }
            if (properties.applicationId) { this.applicationId = properties.applicationId }
            if (properties.maxVersion) { this.maxVersion = properties.maxVersion }
            if (properties.minVersion) { this.minVersion = properties.minVersion }
            if (properties.subMatchType) { this.subMatchType = properties.subMatchType }
            if (properties.gameCounterID) { this.gameCounterID = properties.gameCounterID }
            if (properties.cardImg) { this.cardImg = properties.cardImg }
            if (properties.cmsAppIds) { this.cmsAppIds = []; properties.cmsAppIds.forEach((value, index)=>{this.cmsAppIds[index] = properties.cmsAppIds[index]})}
            if (properties.realViewAppIds) { this.realViewAppIds = []; properties.realViewAppIds.forEach((value, index)=>{this.realViewAppIds[index] = properties.realViewAppIds[index]})}
            if (properties.reportName) { this.reportName = properties.reportName }
            if (properties.punishment) { this.punishment = tss_match_v2_common_PunishmentConfig.create(properties.punishment) as any }
            if (properties.priority) { this.priority = properties.priority }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public ID?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public gameID?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public img?: string|null = ""
    @protobuf.Field.d(5, "bool", "optional", false)
    public isOpen?: boolean|null = false
    @protobuf.Field.d(6, "tss_match_v2_mate_Settle", "optional")
    public settle?: Settle|null
    @protobuf.Field.d(7, "tss_match_v2_mate_Robot", "optional")
    public robot?: Robot|null
    @protobuf.Field.d(8, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(9, "int64", "optional", 0)
    public updatedAt?: number|null = 0
    @protobuf.Field.d(10, "int64", "optional", 0)
    public createdAt?: number|null = 0
    @protobuf.Field.d(11, "tss_match_v2_mate_JoinLimit", "optional")
    public joinLimit?: JoinLimit|null
    @protobuf.Field.d(12, "int32", "optional", 0)
    public playWay?: number|null = 0
    @protobuf.Field.d(13, "string", "optional", )
    public playWaySlogan?: string|null = ""
    @protobuf.Field.d(14, UserType, "optional", UserType.UserTypeAll)
    public userType?: UserType|null = UserType.UserTypeAll
    @protobuf.Field.d(15, "string", "optional", )
    public applicationId?: string|null = ""
    @protobuf.Field.d(16, "int64", "optional", 0)
    public maxVersion?: number|null = 0
    @protobuf.Field.d(17, "int64", "optional", 0)
    public minVersion?: number|null = 0
    @protobuf.Field.d(18, SubMatchType, "optional", SubMatchType.SubMatchTypeUnknown)
    public subMatchType?: SubMatchType|null = SubMatchType.SubMatchTypeUnknown
    @protobuf.Field.d(19, "int32", "optional", 0)
    public gameCounterID?: number|null = 0
    @protobuf.Field.d(20, "string", "optional", )
    public cardImg?: string|null = ""
    @protobuf.Field.d(21, "string", "repeated", [])
    public cmsAppIds?: string[] = []
    @protobuf.Field.d(22, "string", "repeated", [])
    public realViewAppIds?: string[] = []
    @protobuf.Field.d(23, "string", "optional", )
    public reportName?: string|null = ""
    @protobuf.Field.d(24, "tss_match_v2_common_PunishmentConfig", "optional")
    public punishment?: tss_match_v2_common_PunishmentConfig|null
    @protobuf.Field.d(25, "int64", "optional", 0)
    public priority?: number|null = 0
}
export interface IProp {
    propID?: number|null
    num?: number|null
    assetType?: tss_common_AssetType|null
}
@protobuf.Type.d("tss_match_v2_mate_Prop")
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
    @protobuf.Field.d(2, "int32", "optional", 0)
    public num?: number|null = 0
    @protobuf.Field.d(3, tss_common_AssetType, "optional", tss_common_AssetType.AssetTypeUnknown)
    public assetType?: tss_common_AssetType|null = tss_common_AssetType.AssetTypeUnknown
}
export interface IUser {
    uid?: number|null
    cup?: number|null
    ownProp?: IProp
    changeScore?: number|null
    isPrivilege?: boolean|null
    extraParamConf?: tss_hall_common_IExtraParamConfig
    assets?: tss_hall_common_IDynamicAssetItems[]
    isPunishment?: boolean|null
}
@protobuf.Type.d("tss_match_v2_mate_User")
export class User extends protobuf.Message<IUser> {
    constructor(properties: Properties<IUser>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.cup) { this.cup = properties.cup }
            if (properties.ownProp) { this.ownProp = Prop.create(properties.ownProp) as any }
            if (properties.changeScore) { this.changeScore = properties.changeScore }
            if (properties.isPrivilege) { this.isPrivilege = properties.isPrivilege }
            if (properties.extraParamConf) { this.extraParamConf = tss_hall_common_ExtraParamConfig.create(properties.extraParamConf) as any }
            if (properties.assets) { this.assets = []; properties.assets.forEach((value, index)=>{this.assets[index] = tss_hall_common_DynamicAssetItems.create(properties.assets[index]) as any})}
            if (properties.isPunishment) { this.isPunishment = properties.isPunishment }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public cup?: number|null = 0
    @protobuf.Field.d(3, "tss_match_v2_mate_Prop", "optional")
    public ownProp?: Prop|null
    @protobuf.Field.d(4, "int32", "optional", 0)
    public changeScore?: number|null = 0
    @protobuf.Field.d(5, "bool", "optional", false)
    public isPrivilege?: boolean|null = false
    @protobuf.Field.d(6, "tss_hall_common_ExtraParamConfig", "optional")
    public extraParamConf?: tss_hall_common_ExtraParamConfig|null
    @protobuf.Field.d(7, "tss_hall_common_DynamicAssetItems", "repeated")
    public assets?: tss_hall_common_DynamicAssetItems[] = []
    @protobuf.Field.d(8, "bool", "optional", false)
    public isPunishment?: boolean|null = false
}
export interface ITable {
    srvID?: number|null
    tKey?: string|null
    startTime?: number|null
    endTime?: number|null
}
@protobuf.Type.d("tss_match_v2_mate_Table")
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
}
@protobuf.Type.d("tss_match_v2_mate_DeskUser")
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
    @protobuf.Field.d(7, "int32", "optional", 0)
    public seatNo?: number|null = 0
    @protobuf.Field.d(8, "tss_match_v2_mate_Prop", "optional")
    public ownProp?: Prop|null
}
export interface IMatchSession {
    srvName?: string|null
    sessionID?: string|null
    gameID?: string|null
    deskID?: number|null
    srvID?: number|null
    users?: IDeskUser[]
    matchKey?: string|null
    playWay?: number|null
}
@protobuf.Type.d("tss_match_v2_mate_MatchSession")
export class MatchSession extends protobuf.Message<IMatchSession> {
    constructor(properties: Properties<IMatchSession>) {
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
    @protobuf.Field.d(6, "tss_match_v2_mate_DeskUser", "repeated")
    public users?: DeskUser[] = []
    @protobuf.Field.d(7, "string", "optional", )
    public matchKey?: string|null = ""
    @protobuf.Field.d(8, "int32", "optional", 0)
    public playWay?: number|null = 0
}
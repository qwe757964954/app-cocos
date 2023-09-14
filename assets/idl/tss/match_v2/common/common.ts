import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  Asset as tss_common_Asset,IAsset as tss_common_IAsset ,  AssetItem as tss_common_AssetItem,IAssetItem as tss_common_IAssetItem ,  SwitchState as tss_common_SwitchState ,  AssetType as tss_common_AssetType ,  } from "idl/tss/common/common_define"
import {  DynamicAssetItems as tss_hall_common_DynamicAssetItems,IDynamicAssetItems as tss_hall_common_IDynamicAssetItems ,  } from "idl/tss/hall/common/assets"
export enum EntryNodeType {  
    EntryNodeTypeUnknown = 0,  
    EntryNodeTypeFree = 1,  
    EntryNodeTypeAsset = 2,  
    EntryNodeTypeVip = 3,  
    EntryNodeTypeExp = 4,  
    EntryNodeTypeAnd = 100,  
    EntryNodeTypeOr = 101,  
    EntryNodeTypeSelect = 102,
}
export enum EntryUserRuleType {  
    EntryUserRuleTypeUnknown = 0,  
    EntryUserRuleTypeAll = 1,  
    EntryUserRuleTypeNovice = 2,  
    EntryUserRuleTypeVip = 3,  
    EntryUserRuleTypeMember = 4,  
    EntryUserRuleTypeCareerExp = 5,  
    EntryUserRuleTypeTitleLevel = 6,
}
export enum PunishmentType {  
    PunishmentTypeUnknown = 0,  
    PunishmentTypeSeverity = 1,  
    PunishmentTypeNormal = 2,
}
export enum StageMode {  
    StageModeUnknown = 0,  
    StageModeStrike = 1,  
    StageModeFinality = 2,
}
export enum SchedulerState {  
    SchedulerStateUnknown = 0,  
    SchedulerStateInit = 1,  
    SchedulerStateRunning = 2,  
    SchedulerStatePause = 3,  
    SchedulerStateStop = 4,
}
export enum CycleMode {  
    CycleModeUnknown = 0,  
    CycleModeInList = 1,  
    CycleModeInRoom = 2,
}
export enum SchedulerType {  
    SchedulerTypeUnknown = 0,  
    SchedulerTypeOnce = 1,  
    SchedulerTypeDailyOnce = 2,  
    SchedulerTypeCycle = 3,  
    SchedulerTypePeriodEnd = 4,
}
export enum PeriodType {  
    PeriodTypeUnknown = 0,  
    PeriodTypeWeek = 1,  
    PeriodTypeMonth = 2,  
    PeriodTypeQuarter = 3,
}
export enum MatchType {  
    MatchTypeUnknown = 0,  
    MatchTypeTiming = 1,  
    MatchTypeSNG = 2,  
    MatchTypeMate = 3,
}
export enum RefactorVer {  
    RefactorVerV1 = 0,  
    RefactorVerV2 = 1,
}
export enum JumpMode {  
    JumpModeUnknown = 0,  
    JumpModeInApp = 1,  
    JumpModeWebSite = 2,
}
export enum SubMatchType {  
    SubMatchTypeUnknown = 0,  
    SubMatchTypeTeam = 1,  
    SubMatchTypeNormal = 2,
}
export enum RobotEnterMode {  
    RobotEnterModeUnknown = 0,  
    RobotEnterModeFixedNum = 1,  
    RobotEnterModeAuto = 2,  
    RobotEnterModeFillMinUserNum = 3,
}
export enum ObserveMode {  
    ObserveModeUnknown = 0,  
    ObserveModeRealTime = 1,  
    ObserveModeDelay = 2,
}
export enum ObserveView {  
    ObserveViewUnknown = 0,  
    ObserveViewEveryPlayer = 1,  
    ObserveViewSignalPlayer = 2,
}
export enum LiveRoomType {  
    LiveRoomTypeUnknown = 0,  
    LiveRoomTypeOfficial = 1,  
    LiveRoomTypePersonal = 2,
}
export enum StageType {  
    StageTypeUnkown = 0,  
    StageTypeStrike = 1,  
    StageTypeFinality = 2,
}
export enum OutScoreIncType {  
    OutScoreIncTypeUnknown = 0,  
    OutScoreIncTypeBasedOnBaseScore = 1,  
    OutScoreIncTypeFixed = 2,  
    OutScoreIncTypeConstant = 3,  
    OutScoreIncTypeTimeRange = 4,
}
export enum StageEndType {  
    StageEndTypeUnknown = 0,  
    StageEndTypeByUserNum = 1,  
    StageEndTypeByTime = 2,  
    StageEndTypeByUserNumAndTime = 3,  
    StageEndTypeByGameNum = 4,  
    StageEndTypeByTeam = 5,
}
export enum PromotionType {  
    PromotionTypeUnknown = 0,  
    PromotionTypeUserRank = 1,  
    PromotionTypeTableRank = 2,  
    PromotionTypeTableResult = 3,
}
export enum UserScoreMode {  
    UserScoreModeUnknown = 0,  
    UserScoreModeFixedRatio = 1,  
    UserScoreModeSqrtAndRatio = 2,
}
export enum CoordinateMode {  
    CoordinateModeUnknown = 0,  
    CoordinateModeSwiss = 1,  
    CoordinateModeSnake = 2,  
    CoordinateModeOnce = 3,  
    CoordinateModeWeight = 4,  
    CoordinateModeTeammate = 5,  
    CoordinateModeTryOnce = 6,  
    CoordinateModeRandom = 7,  
    CoordinateModeTeam = 8,
}
export enum DeclarerMode {  
    DeclarerModeUnknown = 0,  
    DeclarerModeContrarotate = 1,  
    DeclarerModeRandom = 2,
}
export enum RevivalType {  
    RevivalTypeUnknown = 0,  
    RevivalTypeVip = 1,  
    RevivalTypeAsset = 2,  
    RevivalTypeVipOrAsset = 3,  
    RevivalTypeFuture = 4,
}
export enum SettlementType {  
    SettlementTypeUnknown = 0,  
    SettlementTypeBasedOnBaseScore = 1,  
    SettlementTypeFixed = 2,  
    SettlementTypeTeam = 3,
}
export enum BaseScoreIncType {  
    BaseScoreIncTypeUnknown = 0,  
    BaseScoreIncTypeFixed = 1,  
    BaseScoreIncTypeRatio = 2,  
    BaseScoreIncTypeAdd = 3,  
    BaseScoreIncTypeTimeRange = 4,
}
export enum PrizeType {  
    PrizeTypeUnknown = 0,  
    PrizeTypeFixed = 1,  
    PrizeTypeDynamic = 2,  
    PrizeTypeFixedTeam = 3,  
    PrizeTypeFixedAndDynamic = 4,
}
export enum AwardType {  
    AwardTypeUnknown = 0,  
    AwardTypeNormal = 1,  
    AwardTypeVIP = 2,
}
export enum DynamicPoolIncMode {  
    DynamicPoolIncModeUnknow = 0,  
    DynamicPoolIncModeFix = 1,  
    DynamicPoolIncModeByEnter = 2,  
    DynamicPoolIncModeByPercentage = 3,  
    DynamicPoolIncModeByPermil = 4,
}
export enum DynamicPoolChangeWay {  
    DynamicPoolChangeWayUnknown = 0,  
    DynamicPoolChangeWayEnter = 1,  
    DynamicPoolChangeWayRevival = 2,
}
export enum VIPAwardType {  
    VIPAwardTypeUnknown = 0,  
    VIPAwardTypeAppointed = 1,  
    VIPAwardTypeRate = 2,
}
export enum MatchStatus {  
    MatchStatusUnknown = 0,  
    MatchStatusInit = 1,  
    MatchStatusRunning = 2,  
    MatchStatusOver = 3,  
    MatchStatusAbort = 4,  
    MatchStatusIdle = 5,
}
export enum UserStatus {  
    UserStatusUnknown = 0,  
    UserStatusEntry = 1,  
    UserStatusReady = 2,  
    UserStatusPlaying = 3,  
    UserStatusOut = 4,  
    UserStatusWaitRevival = 5,  
    UserStatusBye = 6,  
    UserStatusWait = 7,  
    UserStatusWaitOver = 8,
}
export enum TableStatus {  
    TableStatusUnknown = 0,  
    TableStatusFree = 1,  
    TableStatusBye = 2,  
    TableStatusCoordinate = 3,  
    TableStatusEnd = 4,  
    TableStatusPlaying = 5,
}
export enum GameResultType {  
    GameResultTypeUnknown = 0,  
    GameResultTypeWin = 1,  
    GameResultTypeLoss = 2,  
    GameResultTypeDraw = 3,
}
export enum SessionType {  
    SessionTypeUnknown = 0,  
    SessionTypePreMatch = 1,  
    SessionTypeMatch = 2,  
    SessionTypeMateMatch = 3,
}
export enum MatchOverReason {  
    MatchOverReasonNormal = 0,  
    MatchOverReasonAborted = 1,
}
export enum WinningResult {  
    WinningResult_None = 0,  
    WinningResult_Win = 1,  
    WinningResult_Lose = 2,  
    WinningResult_Draw = 3,
}
export enum CountType {  
    CountTypeUndefined = 0,  
    CountTypeMatchedMatchValue = 1,
}
export enum MatchListDisplayStyle {  
    MatchListDisplayStyleUnknown = 0,  
    MatchListDisplayStyleSmallCard = 1,  
    MatchListDisplayStyleBigCard = 2,
}
export enum MatchDescGenRuleType {  
    MatchDescGenRuleTypeUnknown = 0,  
    MatchDescGenRuleTypeAuto = 1,  
    MatchDescGenRuleTypeCMS = 2,
}
export enum MatchTagType {  
    MatchTagTypeUnknown = 0,  
    MatchTagTypeSmallPrize = 1,  
    MatchTagTypeBigPrize = 2,  
    MatchTagTypeWeekly = 3,  
    MatchTagTypeSuperLeague = 4,  
    MatchTagTypeNovice = 5,  
    MatchTagTypePremium = 6,  
    MatchTagTypeHourly = 7,  
    MatchTagTypeDaily = 8,  
    MatchTagTypeMonthly = 9,
}
export enum MatchSpecialType {  
    MatchSpecialUnknown = 0,  
    MatchSpecialWeekly = 1,  
    MatchSpecialMonthly = 2,  
    MatchSpecialSeason = 3,  
    MatchSpecialPreparation = 4,  
    MatchSpecialThrough = 5,  
    MatchSpecialMaster = 6,
}
export interface IDateSpan {
    start?: string|null
    end?: string|null
}
@protobuf.Type.d("tss_match_v2_common_DateSpan")
export class DateSpan extends protobuf.Message<IDateSpan> {
    constructor(properties: Properties<IDateSpan>) {
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
export interface ITimeSpan {
    start?: string|null
    end?: string|null
    intervalDuration?: number|null
}
@protobuf.Type.d("tss_match_v2_common_TimeSpan")
export class TimeSpan extends protobuf.Message<ITimeSpan> {
    constructor(properties: Properties<ITimeSpan>) {
        super(properties);
        if (properties) {
            if (properties.start) { this.start = properties.start }
            if (properties.end) { this.end = properties.end }
            if (properties.intervalDuration) { this.intervalDuration = properties.intervalDuration }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public start?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public end?: string|null = ""
    @protobuf.Field.d(3, "int64", "optional", 0)
    public intervalDuration?: number|null = 0
}
export interface IDateSection {
    dateSpan?: IDateSpan
    weekdays?: number[]
    intervalDay?: number|null
}
@protobuf.Type.d("tss_match_v2_common_DateSection")
export class DateSection extends protobuf.Message<IDateSection> {
    constructor(properties: Properties<IDateSection>) {
        super(properties);
        if (properties) {
            if (properties.dateSpan) { this.dateSpan = DateSpan.create(properties.dateSpan) as any }
            if (properties.weekdays) { this.weekdays = []; properties.weekdays.forEach((value, index)=>{this.weekdays[index] = properties.weekdays[index]})}
            if (properties.intervalDay) { this.intervalDay = properties.intervalDay }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_common_DateSpan", "optional")
    public dateSpan?: DateSpan|null
    @protobuf.Field.d(2, "int64", "repeated", [])
    public weekdays?: number[] = []
    @protobuf.Field.d(3, "int64", "optional", 0)
    public intervalDay?: number|null = 0
}
export interface IAppRemindInfo {
    ID?: number|null
    matchStartAt?: number|null
    matchName?: string|null
    durationBeginStart?: number|null
}
@protobuf.Type.d("tss_match_v2_common_AppRemindInfo")
export class AppRemindInfo extends protobuf.Message<IAppRemindInfo> {
    constructor(properties: Properties<IAppRemindInfo>) {
        super(properties);
        if (properties) {
            if (properties.ID) { this.ID = properties.ID }
            if (properties.matchStartAt) { this.matchStartAt = properties.matchStartAt }
            if (properties.matchName) { this.matchName = properties.matchName }
            if (properties.durationBeginStart) { this.durationBeginStart = properties.durationBeginStart }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public ID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public matchStartAt?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public matchName?: string|null = ""
    @protobuf.Field.d(4, "int64", "optional", 0)
    public durationBeginStart?: number|null = 0
}
export interface IDailySection {
    timeSpans?: ITimeSpan[]
}
@protobuf.Type.d("tss_match_v2_common_DailySection")
export class DailySection extends protobuf.Message<IDailySection> {
    constructor(properties: Properties<IDailySection>) {
        super(properties);
        if (properties) {
            if (properties.timeSpans) { this.timeSpans = []; properties.timeSpans.forEach((value, index)=>{this.timeSpans[index] = TimeSpan.create(properties.timeSpans[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_common_TimeSpan", "repeated")
    public timeSpans?: TimeSpan[] = []
}
export interface IPromptJump {
    jumpMode?: JumpMode|null
    targetUrl?: string|null
}
@protobuf.Type.d("tss_match_v2_common_PromptJump")
export class PromptJump extends protobuf.Message<IPromptJump> {
    constructor(properties: Properties<IPromptJump>) {
        super(properties);
        if (properties) {
            if (properties.jumpMode) { this.jumpMode = properties.jumpMode }
            if (properties.targetUrl) { this.targetUrl = properties.targetUrl }
        }
	}
    @protobuf.Field.d(1, JumpMode, "optional", JumpMode.JumpModeUnknown)
    public jumpMode?: JumpMode|null = JumpMode.JumpModeUnknown
    @protobuf.Field.d(2, "string", "optional", )
    public targetUrl?: string|null = ""
}
export interface IPreventCheat {
    isOpen?: boolean|null
    isHideUserInfo?: boolean|null
    isAllowProp?: boolean|null
    isCheckLBSLocation?: boolean|null
    isCheckIPLocation?: boolean|null
}
@protobuf.Type.d("tss_match_v2_common_PreventCheat")
export class PreventCheat extends protobuf.Message<IPreventCheat> {
    constructor(properties: Properties<IPreventCheat>) {
        super(properties);
        if (properties) {
            if (properties.isOpen) { this.isOpen = properties.isOpen }
            if (properties.isHideUserInfo) { this.isHideUserInfo = properties.isHideUserInfo }
            if (properties.isAllowProp) { this.isAllowProp = properties.isAllowProp }
            if (properties.isCheckLBSLocation) { this.isCheckLBSLocation = properties.isCheckLBSLocation }
            if (properties.isCheckIPLocation) { this.isCheckIPLocation = properties.isCheckIPLocation }
        }
	}
    @protobuf.Field.d(1, "bool", "optional", false)
    public isOpen?: boolean|null = false
    @protobuf.Field.d(2, "bool", "optional", false)
    public isHideUserInfo?: boolean|null = false
    @protobuf.Field.d(3, "bool", "optional", false)
    public isAllowProp?: boolean|null = false
    @protobuf.Field.d(4, "bool", "optional", false)
    public isCheckLBSLocation?: boolean|null = false
    @protobuf.Field.d(5, "bool", "optional", false)
    public isCheckIPLocation?: boolean|null = false
}
export interface IAppRemindCfg {
    isOpen?: boolean|null
    durationBeginStart?: number|null
}
@protobuf.Type.d("tss_match_v2_common_AppRemindCfg")
export class AppRemindCfg extends protobuf.Message<IAppRemindCfg> {
    constructor(properties: Properties<IAppRemindCfg>) {
        super(properties);
        if (properties) {
            if (properties.isOpen) { this.isOpen = properties.isOpen }
            if (properties.durationBeginStart) { this.durationBeginStart = properties.durationBeginStart }
        }
	}
    @protobuf.Field.d(1, "bool", "optional", false)
    public isOpen?: boolean|null = false
    @protobuf.Field.d(2, "int64", "optional", 0)
    public durationBeginStart?: number|null = 0
}
export interface ITableConfig {
    coordinateMode?: CoordinateMode|null
    declarerMode?: DeclarerMode|null
    swapSeat?: boolean|null
}
@protobuf.Type.d("tss_match_v2_common_TableConfig")
export class TableConfig extends protobuf.Message<ITableConfig> {
    constructor(properties: Properties<ITableConfig>) {
        super(properties);
        if (properties) {
            if (properties.coordinateMode) { this.coordinateMode = properties.coordinateMode }
            if (properties.declarerMode) { this.declarerMode = properties.declarerMode }
            if (properties.swapSeat) { this.swapSeat = properties.swapSeat }
        }
	}
    @protobuf.Field.d(3, CoordinateMode, "optional", CoordinateMode.CoordinateModeUnknown)
    public coordinateMode?: CoordinateMode|null = CoordinateMode.CoordinateModeUnknown
    @protobuf.Field.d(4, DeclarerMode, "optional", DeclarerMode.DeclarerModeUnknown)
    public declarerMode?: DeclarerMode|null = DeclarerMode.DeclarerModeUnknown
    @protobuf.Field.d(5, "bool", "optional", false)
    public swapSeat?: boolean|null = false
}
export interface IEntryNodeConfig {
    id?: number|null
    type?: EntryNodeType|null
    nodes?: IEntryNodeConfig[]
    asset?: tss_common_IAsset
    assetItem?: tss_common_IAssetItem[]
    threshold?: number|null
    sign?: string|null
}
@protobuf.Type.d("tss_match_v2_common_EntryNodeConfig")
export class EntryNodeConfig extends protobuf.Message<IEntryNodeConfig> {
    constructor(properties: Properties<IEntryNodeConfig>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.type) { this.type = properties.type }
            if (properties.nodes) { this.nodes = []; properties.nodes.forEach((value, index)=>{this.nodes[index] = EntryNodeConfig.create(properties.nodes[index]) as any})}
            if (properties.asset) { this.asset = tss_common_Asset.create(properties.asset) as any }
            if (properties.assetItem) { this.assetItem = []; properties.assetItem.forEach((value, index)=>{this.assetItem[index] = tss_common_AssetItem.create(properties.assetItem[index]) as any})}
            if (properties.threshold) { this.threshold = properties.threshold }
            if (properties.sign) { this.sign = properties.sign }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public id?: number|null = 0
    @protobuf.Field.d(2, EntryNodeType, "optional", EntryNodeType.EntryNodeTypeUnknown)
    public type?: EntryNodeType|null = EntryNodeType.EntryNodeTypeUnknown
    @protobuf.Field.d(3, "tss_match_v2_common_EntryNodeConfig", "repeated")
    public nodes?: EntryNodeConfig[] = []
    @protobuf.Field.d(10, "tss_common_Asset", "optional")
    public asset?: tss_common_Asset|null
    @protobuf.Field.d(5, "tss_common_AssetItem", "repeated")
    public assetItem?: tss_common_AssetItem[] = []
    @protobuf.Field.d(11, "int64", "optional", 0)
    public threshold?: number|null = 0
    @protobuf.Field.d(12, "string", "optional", )
    public sign?: string|null = ""
}
export interface IEntryCancelConfig {
    isEnabled?: boolean|null
    deadline?: number|null
}
@protobuf.Type.d("tss_match_v2_common_EntryCancelConfig")
export class EntryCancelConfig extends protobuf.Message<IEntryCancelConfig> {
    constructor(properties: Properties<IEntryCancelConfig>) {
        super(properties);
        if (properties) {
            if (properties.isEnabled) { this.isEnabled = properties.isEnabled }
            if (properties.deadline) { this.deadline = properties.deadline }
        }
	}
    @protobuf.Field.d(1, "bool", "optional", false)
    public isEnabled?: boolean|null = false
    @protobuf.Field.d(2, "int64", "optional", 0)
    public deadline?: number|null = 0
}
export interface IEntryUserRoleLimit {
    type?: EntryUserRuleType|null
    threshold?: number|null
    thresholdMax?: number|null
    isOtherRole?: boolean|null
    otherRole?: IEntryUserRoleLimit[]
}
@protobuf.Type.d("tss_match_v2_common_EntryUserRoleLimit")
export class EntryUserRoleLimit extends protobuf.Message<IEntryUserRoleLimit> {
    constructor(properties: Properties<IEntryUserRoleLimit>) {
        super(properties);
        if (properties) {
            if (properties.type) { this.type = properties.type }
            if (properties.threshold) { this.threshold = properties.threshold }
            if (properties.thresholdMax) { this.thresholdMax = properties.thresholdMax }
            if (properties.isOtherRole) { this.isOtherRole = properties.isOtherRole }
            if (properties.otherRole) { this.otherRole = []; properties.otherRole.forEach((value, index)=>{this.otherRole[index] = EntryUserRoleLimit.create(properties.otherRole[index]) as any})}
        }
	}
    @protobuf.Field.d(1, EntryUserRuleType, "optional", EntryUserRuleType.EntryUserRuleTypeUnknown)
    public type?: EntryUserRuleType|null = EntryUserRuleType.EntryUserRuleTypeUnknown
    @protobuf.Field.d(2, "int64", "optional", 0)
    public threshold?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public thresholdMax?: number|null = 0
    @protobuf.Field.d(4, "bool", "optional", false)
    public isOtherRole?: boolean|null = false
    @protobuf.Field.d(5, "tss_match_v2_common_EntryUserRoleLimit", "repeated")
    public otherRole?: EntryUserRoleLimit[] = []
}
export interface IEntryConfig {
    isEnabled?: boolean|null
    node?: IEntryNodeConfig
    cancel?: IEntryCancelConfig
    isBelongCreator?: boolean|null
    isCanUseWealFreeCount?: boolean|null
    userRole?: IEntryUserRoleLimit
}
@protobuf.Type.d("tss_match_v2_common_EntryConfig")
export class EntryConfig extends protobuf.Message<IEntryConfig> {
    constructor(properties: Properties<IEntryConfig>) {
        super(properties);
        if (properties) {
            if (properties.isEnabled) { this.isEnabled = properties.isEnabled }
            if (properties.node) { this.node = EntryNodeConfig.create(properties.node) as any }
            if (properties.cancel) { this.cancel = EntryCancelConfig.create(properties.cancel) as any }
            if (properties.isBelongCreator) { this.isBelongCreator = properties.isBelongCreator }
            if (properties.isCanUseWealFreeCount) { this.isCanUseWealFreeCount = properties.isCanUseWealFreeCount }
            if (properties.userRole) { this.userRole = EntryUserRoleLimit.create(properties.userRole) as any }
        }
	}
    @protobuf.Field.d(1, "bool", "optional", false)
    public isEnabled?: boolean|null = false
    @protobuf.Field.d(2, "tss_match_v2_common_EntryNodeConfig", "optional")
    public node?: EntryNodeConfig|null
    @protobuf.Field.d(3, "tss_match_v2_common_EntryCancelConfig", "optional")
    public cancel?: EntryCancelConfig|null
    @protobuf.Field.d(4, "bool", "optional", false)
    public isBelongCreator?: boolean|null = false
    @protobuf.Field.d(5, "bool", "optional", false)
    public isCanUseWealFreeCount?: boolean|null = false
    @protobuf.Field.d(6, "tss_match_v2_common_EntryUserRoleLimit", "optional")
    public userRole?: EntryUserRoleLimit|null
}
export interface IMatchTime {
    startAt?: number|null
    readyRelDuration?: number|null
    aboutToStartDuration?: number|null
    cycleStartAt?: number|null
    cycleEndAt?: number|null
    roomCycleDelay?: number|null
    timeSpans?: ITimeSpan[]
    offSitePushDuration?: number|null
    EarliestEnterTime?: number|null
    isCanJump?: boolean|null
    jumpDuration?: number|null
}
@protobuf.Type.d("tss_match_v2_common_MatchTime")
export class MatchTime extends protobuf.Message<IMatchTime> {
    constructor(properties: Properties<IMatchTime>) {
        super(properties);
        if (properties) {
            if (properties.startAt) { this.startAt = properties.startAt }
            if (properties.readyRelDuration) { this.readyRelDuration = properties.readyRelDuration }
            if (properties.aboutToStartDuration) { this.aboutToStartDuration = properties.aboutToStartDuration }
            if (properties.cycleStartAt) { this.cycleStartAt = properties.cycleStartAt }
            if (properties.cycleEndAt) { this.cycleEndAt = properties.cycleEndAt }
            if (properties.roomCycleDelay) { this.roomCycleDelay = properties.roomCycleDelay }
            if (properties.timeSpans) { this.timeSpans = []; properties.timeSpans.forEach((value, index)=>{this.timeSpans[index] = TimeSpan.create(properties.timeSpans[index]) as any})}
            if (properties.offSitePushDuration) { this.offSitePushDuration = properties.offSitePushDuration }
            if (properties.EarliestEnterTime) { this.EarliestEnterTime = properties.EarliestEnterTime }
            if (properties.isCanJump) { this.isCanJump = properties.isCanJump }
            if (properties.jumpDuration) { this.jumpDuration = properties.jumpDuration }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public startAt?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public readyRelDuration?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public aboutToStartDuration?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public cycleStartAt?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public cycleEndAt?: number|null = 0
    @protobuf.Field.d(6, "int64", "optional", 0)
    public roomCycleDelay?: number|null = 0
    @protobuf.Field.d(7, "tss_match_v2_common_TimeSpan", "repeated")
    public timeSpans?: TimeSpan[] = []
    @protobuf.Field.d(8, "int64", "optional", 0)
    public offSitePushDuration?: number|null = 0
    @protobuf.Field.d(9, "int64", "optional", 0)
    public EarliestEnterTime?: number|null = 0
    @protobuf.Field.d(10, "bool", "optional", false)
    public isCanJump?: boolean|null = false
    @protobuf.Field.d(11, "int64", "optional", 0)
    public jumpDuration?: number|null = 0
}
export interface IScoreTimeRangeItem {
    begin?: number|null
    end?: number|null
    score?: number|null
}
@protobuf.Type.d("tss_match_v2_common_ScoreTimeRangeItem")
export class ScoreTimeRangeItem extends protobuf.Message<IScoreTimeRangeItem> {
    constructor(properties: Properties<IScoreTimeRangeItem>) {
        super(properties);
        if (properties) {
            if (properties.begin) { this.begin = properties.begin }
            if (properties.end) { this.end = properties.end }
            if (properties.score) { this.score = properties.score }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public begin?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public end?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public score?: number|null = 0
}
export interface IGameConfig {
    gameId?: string|null
    seatCnt?: number|null
    playOpt?: number|null
    playOptName?: string|null
}
@protobuf.Type.d("tss_match_v2_common_GameConfig")
export class GameConfig extends protobuf.Message<IGameConfig> {
    constructor(properties: Properties<IGameConfig>) {
        super(properties);
        if (properties) {
            if (properties.gameId) { this.gameId = properties.gameId }
            if (properties.seatCnt) { this.seatCnt = properties.seatCnt }
            if (properties.playOpt) { this.playOpt = properties.playOpt }
            if (properties.playOptName) { this.playOptName = properties.playOptName }
        }
	}
    @protobuf.Field.d(2, "string", "optional", )
    public gameId?: string|null = ""
    @protobuf.Field.d(4, "int64", "optional", 0)
    public seatCnt?: number|null = 0
    @protobuf.Field.d(7, "int32", "optional", 0)
    public playOpt?: number|null = 0
    @protobuf.Field.d(8, "string", "optional", )
    public playOptName?: string|null = ""
}
export interface IFastSNGConfig {
    isEnabled?: boolean|null
}
@protobuf.Type.d("tss_match_v2_common_FastSNGConfig")
export class FastSNGConfig extends protobuf.Message<IFastSNGConfig> {
    constructor(properties: Properties<IFastSNGConfig>) {
        super(properties);
        if (properties) {
            if (properties.isEnabled) { this.isEnabled = properties.isEnabled }
        }
	}
    @protobuf.Field.d(1, "bool", "optional", false)
    public isEnabled?: boolean|null = false
}
export interface ISectionRange {
    start?: number|null
    end?: number|null
}
@protobuf.Type.d("tss_match_v2_common_SectionRange")
export class SectionRange extends protobuf.Message<ISectionRange> {
    constructor(properties: Properties<ISectionRange>) {
        super(properties);
        if (properties) {
            if (properties.start) { this.start = properties.start }
            if (properties.end) { this.end = properties.end }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public start?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public end?: number|null = 0
}
export interface IRobotConfig {
    isEnabled?: boolean|null
    mode?: RobotEnterMode|null
    num?: number|null
    entryRelDuration?: number|null
    enterWait?: ISectionRange
    addInterval?: ISectionRange
    addNum?: ISectionRange
    robotDifficulty?: number|null
}
@protobuf.Type.d("tss_match_v2_common_RobotConfig")
export class RobotConfig extends protobuf.Message<IRobotConfig> {
    constructor(properties: Properties<IRobotConfig>) {
        super(properties);
        if (properties) {
            if (properties.isEnabled) { this.isEnabled = properties.isEnabled }
            if (properties.mode) { this.mode = properties.mode }
            if (properties.num) { this.num = properties.num }
            if (properties.entryRelDuration) { this.entryRelDuration = properties.entryRelDuration }
            if (properties.enterWait) { this.enterWait = SectionRange.create(properties.enterWait) as any }
            if (properties.addInterval) { this.addInterval = SectionRange.create(properties.addInterval) as any }
            if (properties.addNum) { this.addNum = SectionRange.create(properties.addNum) as any }
            if (properties.robotDifficulty) { this.robotDifficulty = properties.robotDifficulty }
        }
	}
    @protobuf.Field.d(1, "bool", "optional", false)
    public isEnabled?: boolean|null = false
    @protobuf.Field.d(2, RobotEnterMode, "optional", RobotEnterMode.RobotEnterModeUnknown)
    public mode?: RobotEnterMode|null = RobotEnterMode.RobotEnterModeUnknown
    @protobuf.Field.d(3, "int64", "optional", 0)
    public num?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public entryRelDuration?: number|null = 0
    @protobuf.Field.d(5, "tss_match_v2_common_SectionRange", "optional")
    public enterWait?: SectionRange|null
    @protobuf.Field.d(6, "tss_match_v2_common_SectionRange", "optional")
    public addInterval?: SectionRange|null
    @protobuf.Field.d(7, "tss_match_v2_common_SectionRange", "optional")
    public addNum?: SectionRange|null
    @protobuf.Field.d(8, "int32", "optional", 0)
    public robotDifficulty?: number|null = 0
}
export interface IObserveConfig {
    isEnabled?: boolean|null
    mode?: ObserveMode|null
    delayDuration?: number|null
    isVisible?: boolean|null
    view?: ObserveView|null
}
@protobuf.Type.d("tss_match_v2_common_ObserveConfig")
export class ObserveConfig extends protobuf.Message<IObserveConfig> {
    constructor(properties: Properties<IObserveConfig>) {
        super(properties);
        if (properties) {
            if (properties.isEnabled) { this.isEnabled = properties.isEnabled }
            if (properties.mode) { this.mode = properties.mode }
            if (properties.delayDuration) { this.delayDuration = properties.delayDuration }
            if (properties.isVisible) { this.isVisible = properties.isVisible }
            if (properties.view) { this.view = properties.view }
        }
	}
    @protobuf.Field.d(1, "bool", "optional", false)
    public isEnabled?: boolean|null = false
    @protobuf.Field.d(2, ObserveMode, "optional", ObserveMode.ObserveModeUnknown)
    public mode?: ObserveMode|null = ObserveMode.ObserveModeUnknown
    @protobuf.Field.d(3, "int64", "optional", 0)
    public delayDuration?: number|null = 0
    @protobuf.Field.d(4, "bool", "optional", false)
    public isVisible?: boolean|null = false
    @protobuf.Field.d(5, ObserveView, "optional", ObserveView.ObserveViewUnknown)
    public view?: ObserveView|null = ObserveView.ObserveViewUnknown
}
export interface IDelayPlay {
    isEnabled?: boolean|null
    delayDuration?: number|null
    isFirstStageEffect?: boolean|null
}
@protobuf.Type.d("tss_match_v2_common_DelayPlay")
export class DelayPlay extends protobuf.Message<IDelayPlay> {
    constructor(properties: Properties<IDelayPlay>) {
        super(properties);
        if (properties) {
            if (properties.isEnabled) { this.isEnabled = properties.isEnabled }
            if (properties.delayDuration) { this.delayDuration = properties.delayDuration }
            if (properties.isFirstStageEffect) { this.isFirstStageEffect = properties.isFirstStageEffect }
        }
	}
    @protobuf.Field.d(1, "bool", "optional", false)
    public isEnabled?: boolean|null = false
    @protobuf.Field.d(2, "int64", "optional", 0)
    public delayDuration?: number|null = 0
    @protobuf.Field.d(3, "bool", "optional", false)
    public isFirstStageEffect?: boolean|null = false
}
export interface IOutScoreConfig {
    incType?: OutScoreIncType|null
    initValue?: number|null
    incValue?: number|null
    duration?: number|null
    multiple?: number|null
    items?: IScoreTimeRangeItem[]
}
@protobuf.Type.d("tss_match_v2_common_OutScoreConfig")
export class OutScoreConfig extends protobuf.Message<IOutScoreConfig> {
    constructor(properties: Properties<IOutScoreConfig>) {
        super(properties);
        if (properties) {
            if (properties.incType) { this.incType = properties.incType }
            if (properties.initValue) { this.initValue = properties.initValue }
            if (properties.incValue) { this.incValue = properties.incValue }
            if (properties.duration) { this.duration = properties.duration }
            if (properties.multiple) { this.multiple = properties.multiple }
            if (properties.items) { this.items = []; properties.items.forEach((value, index)=>{this.items[index] = ScoreTimeRangeItem.create(properties.items[index]) as any})}
        }
	}
    @protobuf.Field.d(1, OutScoreIncType, "optional", OutScoreIncType.OutScoreIncTypeUnknown)
    public incType?: OutScoreIncType|null = OutScoreIncType.OutScoreIncTypeUnknown
    @protobuf.Field.d(2, "int64", "optional", 0)
    public initValue?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public incValue?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public duration?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public multiple?: number|null = 0
    @protobuf.Field.d(6, "tss_match_v2_common_ScoreTimeRangeItem", "repeated")
    public items?: ScoreTimeRangeItem[] = []
}
export interface ILiveRoomConfig {
    bg?: string|null
    title?: string|null
    needToken?: boolean|null
    isVisible?: boolean|null
    type?: LiveRoomType|null
}
@protobuf.Type.d("tss_match_v2_common_LiveRoomConfig")
export class LiveRoomConfig extends protobuf.Message<ILiveRoomConfig> {
    constructor(properties: Properties<ILiveRoomConfig>) {
        super(properties);
        if (properties) {
            if (properties.bg) { this.bg = properties.bg }
            if (properties.title) { this.title = properties.title }
            if (properties.needToken) { this.needToken = properties.needToken }
            if (properties.isVisible) { this.isVisible = properties.isVisible }
            if (properties.type) { this.type = properties.type }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public bg?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public title?: string|null = ""
    @protobuf.Field.d(3, "bool", "optional", false)
    public needToken?: boolean|null = false
    @protobuf.Field.d(4, "bool", "optional", false)
    public isVisible?: boolean|null = false
    @protobuf.Field.d(5, LiveRoomType, "optional", LiveRoomType.LiveRoomTypeUnknown)
    public type?: LiveRoomType|null = LiveRoomType.LiveRoomTypeUnknown
}
export interface IStageEndConfig {
    type?: StageEndType|null
    userNum?: number|null
    duration?: number|null
    gameNum?: number|null
}
@protobuf.Type.d("tss_match_v2_common_StageEndConfig")
export class StageEndConfig extends protobuf.Message<IStageEndConfig> {
    constructor(properties: Properties<IStageEndConfig>) {
        super(properties);
        if (properties) {
            if (properties.type) { this.type = properties.type }
            if (properties.userNum) { this.userNum = properties.userNum }
            if (properties.duration) { this.duration = properties.duration }
            if (properties.gameNum) { this.gameNum = properties.gameNum }
        }
	}
    @protobuf.Field.d(1, StageEndType, "optional", StageEndType.StageEndTypeUnknown)
    public type?: StageEndType|null = StageEndType.StageEndTypeUnknown
    @protobuf.Field.d(2, "int64", "optional", 0)
    public userNum?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public duration?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public gameNum?: number|null = 0
}
export interface IPromotionConfig {
    mode?: UserScoreMode|null
    value?: number|null
    maxHoldScore?: number|null
    promotionNum?: number|null
    promotionType?: PromotionType|null
}
@protobuf.Type.d("tss_match_v2_common_PromotionConfig")
export class PromotionConfig extends protobuf.Message<IPromotionConfig> {
    constructor(properties: Properties<IPromotionConfig>) {
        super(properties);
        if (properties) {
            if (properties.mode) { this.mode = properties.mode }
            if (properties.value) { this.value = properties.value }
            if (properties.maxHoldScore) { this.maxHoldScore = properties.maxHoldScore }
            if (properties.promotionNum) { this.promotionNum = properties.promotionNum }
            if (properties.promotionType) { this.promotionType = properties.promotionType }
        }
	}
    @protobuf.Field.d(1, UserScoreMode, "optional", UserScoreMode.UserScoreModeUnknown)
    public mode?: UserScoreMode|null = UserScoreMode.UserScoreModeUnknown
    @protobuf.Field.d(2, "int64", "optional", 0)
    public value?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public maxHoldScore?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public promotionNum?: number|null = 0
    @protobuf.Field.d(5, PromotionType, "optional", PromotionType.PromotionTypeUnknown)
    public promotionType?: PromotionType|null = PromotionType.PromotionTypeUnknown
}
export interface IRevivalConsume {
    type?: RevivalType|null
    costAsset?: tss_common_IAsset
    revivalNum?: number|null
    costAssetV2?: tss_common_IAssetItem[]
}
@protobuf.Type.d("tss_match_v2_common_RevivalConsume")
export class RevivalConsume extends protobuf.Message<IRevivalConsume> {
    constructor(properties: Properties<IRevivalConsume>) {
        super(properties);
        if (properties) {
            if (properties.type) { this.type = properties.type }
            if (properties.costAsset) { this.costAsset = tss_common_Asset.create(properties.costAsset) as any }
            if (properties.revivalNum) { this.revivalNum = properties.revivalNum }
            if (properties.costAssetV2) { this.costAssetV2 = []; properties.costAssetV2.forEach((value, index)=>{this.costAssetV2[index] = tss_common_AssetItem.create(properties.costAssetV2[index]) as any})}
        }
	}
    @protobuf.Field.d(1, RevivalType, "optional", RevivalType.RevivalTypeUnknown)
    public type?: RevivalType|null = RevivalType.RevivalTypeUnknown
    @protobuf.Field.d(2, "tss_common_Asset", "optional")
    public costAsset?: tss_common_Asset|null
    @protobuf.Field.d(3, "int64", "optional", 0)
    public revivalNum?: number|null = 0
    @protobuf.Field.d(4, "tss_common_AssetItem", "repeated")
    public costAssetV2?: tss_common_AssetItem[] = []
}
export interface IRevivalConfig {
    isEnabled?: boolean|null
    endUserNum?: number|null
    cntPerUser?: number|null
    baseScoreFactor?: number|null
    thinkDuration?: number|null
    consume?: IRevivalConsume[]
}
@protobuf.Type.d("tss_match_v2_common_RevivalConfig")
export class RevivalConfig extends protobuf.Message<IRevivalConfig> {
    constructor(properties: Properties<IRevivalConfig>) {
        super(properties);
        if (properties) {
            if (properties.isEnabled) { this.isEnabled = properties.isEnabled }
            if (properties.endUserNum) { this.endUserNum = properties.endUserNum }
            if (properties.cntPerUser) { this.cntPerUser = properties.cntPerUser }
            if (properties.baseScoreFactor) { this.baseScoreFactor = properties.baseScoreFactor }
            if (properties.thinkDuration) { this.thinkDuration = properties.thinkDuration }
            if (properties.consume) { this.consume = []; properties.consume.forEach((value, index)=>{this.consume[index] = RevivalConsume.create(properties.consume[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "bool", "optional", false)
    public isEnabled?: boolean|null = false
    @protobuf.Field.d(2, "int64", "optional", 0)
    public endUserNum?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public cntPerUser?: number|null = 0
    @protobuf.Field.d(6, "int64", "optional", 0)
    public baseScoreFactor?: number|null = 0
    @protobuf.Field.d(7, "int64", "optional", 0)
    public thinkDuration?: number|null = 0
    @protobuf.Field.d(8, "tss_match_v2_common_RevivalConsume", "repeated")
    public consume?: RevivalConsume[] = []
}
export interface IGroupConfig {
    isEnabled?: boolean|null
    userNum?: number|null
}
@protobuf.Type.d("tss_match_v2_common_GroupConfig")
export class GroupConfig extends protobuf.Message<IGroupConfig> {
    constructor(properties: Properties<IGroupConfig>) {
        super(properties);
        if (properties) {
            if (properties.isEnabled) { this.isEnabled = properties.isEnabled }
            if (properties.userNum) { this.userNum = properties.userNum }
        }
	}
    @protobuf.Field.d(1, "bool", "optional", false)
    public isEnabled?: boolean|null = false
    @protobuf.Field.d(2, "int64", "optional", 0)
    public userNum?: number|null = 0
}
export interface IBaseScoreConfig {
    incType?: BaseScoreIncType|null
    initValue?: number|null
    incValue?: number|null
    duration?: number|null
    addValue?: number|null
    items?: IScoreTimeRangeItem[]
}
@protobuf.Type.d("tss_match_v2_common_BaseScoreConfig")
export class BaseScoreConfig extends protobuf.Message<IBaseScoreConfig> {
    constructor(properties: Properties<IBaseScoreConfig>) {
        super(properties);
        if (properties) {
            if (properties.incType) { this.incType = properties.incType }
            if (properties.initValue) { this.initValue = properties.initValue }
            if (properties.incValue) { this.incValue = properties.incValue }
            if (properties.duration) { this.duration = properties.duration }
            if (properties.addValue) { this.addValue = properties.addValue }
            if (properties.items) { this.items = []; properties.items.forEach((value, index)=>{this.items[index] = ScoreTimeRangeItem.create(properties.items[index]) as any})}
        }
	}
    @protobuf.Field.d(1, BaseScoreIncType, "optional", BaseScoreIncType.BaseScoreIncTypeUnknown)
    public incType?: BaseScoreIncType|null = BaseScoreIncType.BaseScoreIncTypeUnknown
    @protobuf.Field.d(2, "int64", "optional", 0)
    public initValue?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public incValue?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public duration?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public addValue?: number|null = 0
    @protobuf.Field.d(6, "tss_match_v2_common_ScoreTimeRangeItem", "repeated")
    public items?: ScoreTimeRangeItem[] = []
}
export interface IFixedSettlementConfig {
    winScore?: number|null
    drawScore?: number|null
    lossScore?: number|null
}
@protobuf.Type.d("tss_match_v2_common_FixedSettlementConfig")
export class FixedSettlementConfig extends protobuf.Message<IFixedSettlementConfig> {
    constructor(properties: Properties<IFixedSettlementConfig>) {
        super(properties);
        if (properties) {
            if (properties.winScore) { this.winScore = properties.winScore }
            if (properties.drawScore) { this.drawScore = properties.drawScore }
            if (properties.lossScore) { this.lossScore = properties.lossScore }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public winScore?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public drawScore?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public lossScore?: number|null = 0
}
export interface ISettlementConfig {
    type?: SettlementType|null
    baseScore?: IBaseScoreConfig
    fixed?: IFixedSettlementConfig
}
@protobuf.Type.d("tss_match_v2_common_SettlementConfig")
export class SettlementConfig extends protobuf.Message<ISettlementConfig> {
    constructor(properties: Properties<ISettlementConfig>) {
        super(properties);
        if (properties) {
            if (properties.type) { this.type = properties.type }
            if (properties.baseScore) { this.baseScore = BaseScoreConfig.create(properties.baseScore) as any }
            if (properties.fixed) { this.fixed = FixedSettlementConfig.create(properties.fixed) as any }
        }
	}
    @protobuf.Field.d(1, SettlementType, "optional", SettlementType.SettlementTypeUnknown)
    public type?: SettlementType|null = SettlementType.SettlementTypeUnknown
    @protobuf.Field.d(2, "tss_match_v2_common_BaseScoreConfig", "optional")
    public baseScore?: BaseScoreConfig|null
    @protobuf.Field.d(3, "tss_match_v2_common_FixedSettlementConfig", "optional")
    public fixed?: FixedSettlementConfig|null
}
export interface IPunishmentConfig {
    isEnabled?: boolean|null
    type?: PunishmentType|null
    count?: number|null
}
@protobuf.Type.d("tss_match_v2_common_PunishmentConfig")
export class PunishmentConfig extends protobuf.Message<IPunishmentConfig> {
    constructor(properties: Properties<IPunishmentConfig>) {
        super(properties);
        if (properties) {
            if (properties.isEnabled) { this.isEnabled = properties.isEnabled }
            if (properties.type) { this.type = properties.type }
            if (properties.count) { this.count = properties.count }
        }
	}
    @protobuf.Field.d(1, "bool", "optional", false)
    public isEnabled?: boolean|null = false
    @protobuf.Field.d(2, PunishmentType, "optional", PunishmentType.PunishmentTypeUnknown)
    public type?: PunishmentType|null = PunishmentType.PunishmentTypeUnknown
    @protobuf.Field.d(3, "int64", "optional", 0)
    public count?: number|null = 0
}
export interface IRankPrizeRate {
    startRank?: number|null
    endRank?: number|null
    rate?: number|null
}
@protobuf.Type.d("tss_match_v2_common_RankPrizeRate")
export class RankPrizeRate extends protobuf.Message<IRankPrizeRate> {
    constructor(properties: Properties<IRankPrizeRate>) {
        super(properties);
        if (properties) {
            if (properties.startRank) { this.startRank = properties.startRank }
            if (properties.endRank) { this.endRank = properties.endRank }
            if (properties.rate) { this.rate = properties.rate }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public startRank?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public endRank?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public rate?: number|null = 0
}
export interface IDynamicPrizePoolConfig {
    ranks?: IRankPrizeRate[]
    basePool?: tss_common_IAsset
    isInc?: boolean|null
    mode?: DynamicPoolIncMode|null
    incValue?: number|null
    basePoolItems?: tss_common_IAssetItem[]
}
@protobuf.Type.d("tss_match_v2_common_DynamicPrizePoolConfig")
export class DynamicPrizePoolConfig extends protobuf.Message<IDynamicPrizePoolConfig> {
    constructor(properties: Properties<IDynamicPrizePoolConfig>) {
        super(properties);
        if (properties) {
            if (properties.ranks) { this.ranks = []; properties.ranks.forEach((value, index)=>{this.ranks[index] = RankPrizeRate.create(properties.ranks[index]) as any})}
            if (properties.basePool) { this.basePool = tss_common_Asset.create(properties.basePool) as any }
            if (properties.isInc) { this.isInc = properties.isInc }
            if (properties.mode) { this.mode = properties.mode }
            if (properties.incValue) { this.incValue = properties.incValue }
            if (properties.basePoolItems) { this.basePoolItems = []; properties.basePoolItems.forEach((value, index)=>{this.basePoolItems[index] = tss_common_AssetItem.create(properties.basePoolItems[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_common_RankPrizeRate", "repeated")
    public ranks?: RankPrizeRate[] = []
    @protobuf.Field.d(2, "tss_common_Asset", "optional")
    public basePool?: tss_common_Asset|null
    @protobuf.Field.d(3, "bool", "optional", false)
    public isInc?: boolean|null = false
    @protobuf.Field.d(4, DynamicPoolIncMode, "optional", DynamicPoolIncMode.DynamicPoolIncModeUnknow)
    public mode?: DynamicPoolIncMode|null = DynamicPoolIncMode.DynamicPoolIncModeUnknow
    @protobuf.Field.d(5, "int64", "optional", 0)
    public incValue?: number|null = 0
    @protobuf.Field.d(6, "tss_common_AssetItem", "repeated")
    public basePoolItems?: tss_common_AssetItem[] = []
}
export interface IFixedTeamPrizePoolConfig {
    asset?: tss_common_IAsset
}
@protobuf.Type.d("tss_match_v2_common_FixedTeamPrizePoolConfig")
export class FixedTeamPrizePoolConfig extends protobuf.Message<IFixedTeamPrizePoolConfig> {
    constructor(properties: Properties<IFixedTeamPrizePoolConfig>) {
        super(properties);
        if (properties) {
            if (properties.asset) { this.asset = tss_common_Asset.create(properties.asset) as any }
        }
	}
    @protobuf.Field.d(1, "tss_common_Asset", "optional")
    public asset?: tss_common_Asset|null
}
export interface IVIPLevelPrize {
    asset?: tss_common_IAsset
    rate?: number|null
    startLevel?: number|null
    endLevel?: number|null
}
@protobuf.Type.d("tss_match_v2_common_VIPLevelPrize")
export class VIPLevelPrize extends protobuf.Message<IVIPLevelPrize> {
    constructor(properties: Properties<IVIPLevelPrize>) {
        super(properties);
        if (properties) {
            if (properties.asset) { this.asset = tss_common_Asset.create(properties.asset) as any }
            if (properties.rate) { this.rate = properties.rate }
            if (properties.startLevel) { this.startLevel = properties.startLevel }
            if (properties.endLevel) { this.endLevel = properties.endLevel }
        }
	}
    @protobuf.Field.d(1, "tss_common_Asset", "optional")
    public asset?: tss_common_Asset|null
    @protobuf.Field.d(2, "int64", "optional", 0)
    public rate?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public startLevel?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public endLevel?: number|null = 0
}
export interface IVIPPrize {
    vipLevelPrize?: IVIPLevelPrize[]
}
@protobuf.Type.d("tss_match_v2_common_VIPPrize")
export class VIPPrize extends protobuf.Message<IVIPPrize> {
    constructor(properties: Properties<IVIPPrize>) {
        super(properties);
        if (properties) {
            if (properties.vipLevelPrize) { this.vipLevelPrize = []; properties.vipLevelPrize.forEach((value, index)=>{this.vipLevelPrize[index] = VIPLevelPrize.create(properties.vipLevelPrize[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_common_VIPLevelPrize", "repeated")
    public vipLevelPrize?: VIPLevelPrize[] = []
}
export interface IRankPrize {
    startRank?: number|null
    endRank?: number|null
    asset?: tss_common_IAsset
    vip?: IVIPPrize
    rangeAwardImage?: string|null
    rangeAwardName?: string|null
    basePool?: tss_common_IAssetItem[]
}
@protobuf.Type.d("tss_match_v2_common_RankPrize")
export class RankPrize extends protobuf.Message<IRankPrize> {
    constructor(properties: Properties<IRankPrize>) {
        super(properties);
        if (properties) {
            if (properties.startRank) { this.startRank = properties.startRank }
            if (properties.endRank) { this.endRank = properties.endRank }
            if (properties.asset) { this.asset = tss_common_Asset.create(properties.asset) as any }
            if (properties.vip) { this.vip = VIPPrize.create(properties.vip) as any }
            if (properties.rangeAwardImage) { this.rangeAwardImage = properties.rangeAwardImage }
            if (properties.rangeAwardName) { this.rangeAwardName = properties.rangeAwardName }
            if (properties.basePool) { this.basePool = []; properties.basePool.forEach((value, index)=>{this.basePool[index] = tss_common_AssetItem.create(properties.basePool[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public startRank?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public endRank?: number|null = 0
    @protobuf.Field.d(3, "tss_common_Asset", "optional")
    public asset?: tss_common_Asset|null
    @protobuf.Field.d(4, "tss_match_v2_common_VIPPrize", "optional")
    public vip?: VIPPrize|null
    @protobuf.Field.d(6, "string", "optional", )
    public rangeAwardImage?: string|null = ""
    @protobuf.Field.d(7, "string", "optional", )
    public rangeAwardName?: string|null = ""
    @protobuf.Field.d(8, "tss_common_AssetItem", "repeated")
    public basePool?: tss_common_AssetItem[] = []
}
export interface IFixedPrizePoolConfig {
    ranks?: IRankPrize[]
    isOpenVip?: boolean|null
    vipAwardType?: VIPAwardType|null
}
@protobuf.Type.d("tss_match_v2_common_FixedPrizePoolConfig")
export class FixedPrizePoolConfig extends protobuf.Message<IFixedPrizePoolConfig> {
    constructor(properties: Properties<IFixedPrizePoolConfig>) {
        super(properties);
        if (properties) {
            if (properties.ranks) { this.ranks = []; properties.ranks.forEach((value, index)=>{this.ranks[index] = RankPrize.create(properties.ranks[index]) as any})}
            if (properties.isOpenVip) { this.isOpenVip = properties.isOpenVip }
            if (properties.vipAwardType) { this.vipAwardType = properties.vipAwardType }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_common_RankPrize", "repeated")
    public ranks?: RankPrize[] = []
    @protobuf.Field.d(2, "bool", "optional", false)
    public isOpenVip?: boolean|null = false
    @protobuf.Field.d(3, VIPAwardType, "optional", VIPAwardType.VIPAwardTypeUnknown)
    public vipAwardType?: VIPAwardType|null = VIPAwardType.VIPAwardTypeUnknown
}
export interface IFixPrizeAndDynamicPoolConfig {
    ranks?: IRankPrizeRateAndFix[]
    isDynamicStage?: boolean|null
    dynamicRankPrizeRateAndFix?: IDynamicRankPrizeRateAndFix[]
    basePool?: tss_common_IAssetItem[]
    enterIncPoolSwitch?: tss_common_SwitchState|null
    enterIncPool?: IDynamicPoolInc
    revivalIncPoolSwitch?: tss_common_SwitchState|null
    revivalIncPool?: IDynamicPoolInc
    fixPrizeSwitch?: tss_common_SwitchState|null
}
@protobuf.Type.d("tss_match_v2_common_FixPrizeAndDynamicPoolConfig")
export class FixPrizeAndDynamicPoolConfig extends protobuf.Message<IFixPrizeAndDynamicPoolConfig> {
    constructor(properties: Properties<IFixPrizeAndDynamicPoolConfig>) {
        super(properties);
        if (properties) {
            if (properties.ranks) { this.ranks = []; properties.ranks.forEach((value, index)=>{this.ranks[index] = RankPrizeRateAndFix.create(properties.ranks[index]) as any})}
            if (properties.isDynamicStage) { this.isDynamicStage = properties.isDynamicStage }
            if (properties.dynamicRankPrizeRateAndFix) { this.dynamicRankPrizeRateAndFix = []; properties.dynamicRankPrizeRateAndFix.forEach((value, index)=>{this.dynamicRankPrizeRateAndFix[index] = DynamicRankPrizeRateAndFix.create(properties.dynamicRankPrizeRateAndFix[index]) as any})}
            if (properties.basePool) { this.basePool = []; properties.basePool.forEach((value, index)=>{this.basePool[index] = tss_common_AssetItem.create(properties.basePool[index]) as any})}
            if (properties.enterIncPoolSwitch) { this.enterIncPoolSwitch = properties.enterIncPoolSwitch }
            if (properties.enterIncPool) { this.enterIncPool = DynamicPoolInc.create(properties.enterIncPool) as any }
            if (properties.revivalIncPoolSwitch) { this.revivalIncPoolSwitch = properties.revivalIncPoolSwitch }
            if (properties.revivalIncPool) { this.revivalIncPool = DynamicPoolInc.create(properties.revivalIncPool) as any }
            if (properties.fixPrizeSwitch) { this.fixPrizeSwitch = properties.fixPrizeSwitch }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_common_RankPrizeRateAndFix", "repeated")
    public ranks?: RankPrizeRateAndFix[] = []
    @protobuf.Field.d(2, "bool", "optional", false)
    public isDynamicStage?: boolean|null = false
    @protobuf.Field.d(3, "tss_match_v2_common_DynamicRankPrizeRateAndFix", "repeated")
    public dynamicRankPrizeRateAndFix?: DynamicRankPrizeRateAndFix[] = []
    @protobuf.Field.d(4, "tss_common_AssetItem", "repeated")
    public basePool?: tss_common_AssetItem[] = []
    @protobuf.Field.d(5, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public enterIncPoolSwitch?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
    @protobuf.Field.d(6, "tss_match_v2_common_DynamicPoolInc", "optional")
    public enterIncPool?: DynamicPoolInc|null
    @protobuf.Field.d(7, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public revivalIncPoolSwitch?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
    @protobuf.Field.d(8, "tss_match_v2_common_DynamicPoolInc", "optional")
    public revivalIncPool?: DynamicPoolInc|null
    @protobuf.Field.d(9, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public fixPrizeSwitch?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
}
export interface IPrizePoolConfig {
    type?: PrizeType|null
    fixedPool?: IFixedPrizePoolConfig
    dynamicPool?: IDynamicPrizePoolConfig
    fixedTeamPool?: IFixedTeamPrizePoolConfig
    isEmceeAward?: boolean|null
    fixAndDynamicPool?: IFixPrizeAndDynamicPoolConfig
}
@protobuf.Type.d("tss_match_v2_common_PrizePoolConfig")
export class PrizePoolConfig extends protobuf.Message<IPrizePoolConfig> {
    constructor(properties: Properties<IPrizePoolConfig>) {
        super(properties);
        if (properties) {
            if (properties.type) { this.type = properties.type }
            if (properties.fixedPool) { this.fixedPool = FixedPrizePoolConfig.create(properties.fixedPool) as any }
            if (properties.dynamicPool) { this.dynamicPool = DynamicPrizePoolConfig.create(properties.dynamicPool) as any }
            if (properties.fixedTeamPool) { this.fixedTeamPool = FixedTeamPrizePoolConfig.create(properties.fixedTeamPool) as any }
            if (properties.isEmceeAward) { this.isEmceeAward = properties.isEmceeAward }
            if (properties.fixAndDynamicPool) { this.fixAndDynamicPool = FixPrizeAndDynamicPoolConfig.create(properties.fixAndDynamicPool) as any }
        }
	}
    @protobuf.Field.d(1, PrizeType, "optional", PrizeType.PrizeTypeUnknown)
    public type?: PrizeType|null = PrizeType.PrizeTypeUnknown
    @protobuf.Field.d(2, "tss_match_v2_common_FixedPrizePoolConfig", "optional")
    public fixedPool?: FixedPrizePoolConfig|null
    @protobuf.Field.d(3, "tss_match_v2_common_DynamicPrizePoolConfig", "optional")
    public dynamicPool?: DynamicPrizePoolConfig|null
    @protobuf.Field.d(4, "tss_match_v2_common_FixedTeamPrizePoolConfig", "optional")
    public fixedTeamPool?: FixedTeamPrizePoolConfig|null
    @protobuf.Field.d(5, "bool", "optional", false)
    public isEmceeAward?: boolean|null = false
    @protobuf.Field.d(6, "tss_match_v2_common_FixPrizeAndDynamicPoolConfig", "optional")
    public fixAndDynamicPool?: FixPrizeAndDynamicPoolConfig|null
}
export interface IDynamicPoolInc {
    mode?: DynamicPoolIncMode|null
    incValue?: number|null
    trigThr?: number|null
}
@protobuf.Type.d("tss_match_v2_common_DynamicPoolInc")
export class DynamicPoolInc extends protobuf.Message<IDynamicPoolInc> {
    constructor(properties: Properties<IDynamicPoolInc>) {
        super(properties);
        if (properties) {
            if (properties.mode) { this.mode = properties.mode }
            if (properties.incValue) { this.incValue = properties.incValue }
            if (properties.trigThr) { this.trigThr = properties.trigThr }
        }
	}
    @protobuf.Field.d(1, DynamicPoolIncMode, "optional", DynamicPoolIncMode.DynamicPoolIncModeUnknow)
    public mode?: DynamicPoolIncMode|null = DynamicPoolIncMode.DynamicPoolIncModeUnknow
    @protobuf.Field.d(2, "int64", "optional", 0)
    public incValue?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public trigThr?: number|null = 0
}
export interface IStageConfig {
    stageType?: StageType|null
    outScore?: IOutScoreConfig
    promotion?: IPromotionConfig
    revival?: IRevivalConfig
    settlement?: ISettlementConfig
    end?: IStageEndConfig
    table?: ITableConfig
    prize?: IPrizePoolConfig
    groupConfig?: IGroupConfig
}
@protobuf.Type.d("tss_match_v2_common_StageConfig")
export class StageConfig extends protobuf.Message<IStageConfig> {
    constructor(properties: Properties<IStageConfig>) {
        super(properties);
        if (properties) {
            if (properties.stageType) { this.stageType = properties.stageType }
            if (properties.outScore) { this.outScore = OutScoreConfig.create(properties.outScore) as any }
            if (properties.promotion) { this.promotion = PromotionConfig.create(properties.promotion) as any }
            if (properties.revival) { this.revival = RevivalConfig.create(properties.revival) as any }
            if (properties.settlement) { this.settlement = SettlementConfig.create(properties.settlement) as any }
            if (properties.end) { this.end = StageEndConfig.create(properties.end) as any }
            if (properties.table) { this.table = TableConfig.create(properties.table) as any }
            if (properties.prize) { this.prize = PrizePoolConfig.create(properties.prize) as any }
            if (properties.groupConfig) { this.groupConfig = GroupConfig.create(properties.groupConfig) as any }
        }
	}
    @protobuf.Field.d(1, StageType, "optional", StageType.StageTypeUnkown)
    public stageType?: StageType|null = StageType.StageTypeUnkown
    @protobuf.Field.d(2, "tss_match_v2_common_OutScoreConfig", "optional")
    public outScore?: OutScoreConfig|null
    @protobuf.Field.d(3, "tss_match_v2_common_PromotionConfig", "optional")
    public promotion?: PromotionConfig|null
    @protobuf.Field.d(4, "tss_match_v2_common_RevivalConfig", "optional")
    public revival?: RevivalConfig|null
    @protobuf.Field.d(5, "tss_match_v2_common_SettlementConfig", "optional")
    public settlement?: SettlementConfig|null
    @protobuf.Field.d(7, "tss_match_v2_common_StageEndConfig", "optional")
    public end?: StageEndConfig|null
    @protobuf.Field.d(10, "tss_match_v2_common_TableConfig", "optional")
    public table?: TableConfig|null
    @protobuf.Field.d(11, "tss_match_v2_common_PrizePoolConfig", "optional")
    public prize?: PrizePoolConfig|null
    @protobuf.Field.d(12, "tss_match_v2_common_GroupConfig", "optional")
    public groupConfig?: GroupConfig|null
}
export interface IRankPrizeRateAndFix {
    startRank?: number|null
    endRank?: number|null
    rate?: number|null
    fixPrize?: tss_common_IAssetItem[]
    rangeAwardImage?: string|null
    rangeAwardName?: string|null
}
@protobuf.Type.d("tss_match_v2_common_RankPrizeRateAndFix")
export class RankPrizeRateAndFix extends protobuf.Message<IRankPrizeRateAndFix> {
    constructor(properties: Properties<IRankPrizeRateAndFix>) {
        super(properties);
        if (properties) {
            if (properties.startRank) { this.startRank = properties.startRank }
            if (properties.endRank) { this.endRank = properties.endRank }
            if (properties.rate) { this.rate = properties.rate }
            if (properties.fixPrize) { this.fixPrize = []; properties.fixPrize.forEach((value, index)=>{this.fixPrize[index] = tss_common_AssetItem.create(properties.fixPrize[index]) as any})}
            if (properties.rangeAwardImage) { this.rangeAwardImage = properties.rangeAwardImage }
            if (properties.rangeAwardName) { this.rangeAwardName = properties.rangeAwardName }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public startRank?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public endRank?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public rate?: number|null = 0
    @protobuf.Field.d(4, "tss_common_AssetItem", "repeated")
    public fixPrize?: tss_common_AssetItem[] = []
    @protobuf.Field.d(5, "string", "optional", )
    public rangeAwardImage?: string|null = ""
    @protobuf.Field.d(6, "string", "optional", )
    public rangeAwardName?: string|null = ""
}
export interface IDynamicRankPrizeRateAndFix {
    dynamicId?: number|null
    rankPrizeRateAndFix?: IRankPrizeRateAndFix[]
}
@protobuf.Type.d("tss_match_v2_common_DynamicRankPrizeRateAndFix")
export class DynamicRankPrizeRateAndFix extends protobuf.Message<IDynamicRankPrizeRateAndFix> {
    constructor(properties: Properties<IDynamicRankPrizeRateAndFix>) {
        super(properties);
        if (properties) {
            if (properties.dynamicId) { this.dynamicId = properties.dynamicId }
            if (properties.rankPrizeRateAndFix) { this.rankPrizeRateAndFix = []; properties.rankPrizeRateAndFix.forEach((value, index)=>{this.rankPrizeRateAndFix[index] = RankPrizeRateAndFix.create(properties.rankPrizeRateAndFix[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public dynamicId?: number|null = 0
    @protobuf.Field.d(2, "tss_match_v2_common_RankPrizeRateAndFix", "repeated")
    public rankPrizeRateAndFix?: RankPrizeRateAndFix[] = []
}
export interface IDynamicSpecConfig {
    id?: number|null
    minNum?: number|null
    maxNum?: number|null
    stages?: IStageConfig[]
}
@protobuf.Type.d("tss_match_v2_common_DynamicSpecConfig")
export class DynamicSpecConfig extends protobuf.Message<IDynamicSpecConfig> {
    constructor(properties: Properties<IDynamicSpecConfig>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.minNum) { this.minNum = properties.minNum }
            if (properties.maxNum) { this.maxNum = properties.maxNum }
            if (properties.stages) { this.stages = []; properties.stages.forEach((value, index)=>{this.stages[index] = StageConfig.create(properties.stages[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public id?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public minNum?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public maxNum?: number|null = 0
    @protobuf.Field.d(4, "tss_match_v2_common_StageConfig", "repeated")
    public stages?: StageConfig[] = []
}
export interface IMatchConfig {
    userInitScore?: number|null
    stages?: IStageConfig[]
    minUserNum?: number|null
    punishment?: IPunishmentConfig
    prize?: IPrizePoolConfig
    modifyVersion?: number|null
    isWeekLyFlag?: boolean|null
    isOpenDynamicStage?: boolean|null
    dynamicSpecConfigs?: IDynamicSpecConfig[]
    maxUserNum?: number|null
}
@protobuf.Type.d("tss_match_v2_common_MatchConfig")
export class MatchConfig extends protobuf.Message<IMatchConfig> {
    constructor(properties: Properties<IMatchConfig>) {
        super(properties);
        if (properties) {
            if (properties.userInitScore) { this.userInitScore = properties.userInitScore }
            if (properties.stages) { this.stages = []; properties.stages.forEach((value, index)=>{this.stages[index] = StageConfig.create(properties.stages[index]) as any})}
            if (properties.minUserNum) { this.minUserNum = properties.minUserNum }
            if (properties.punishment) { this.punishment = PunishmentConfig.create(properties.punishment) as any }
            if (properties.prize) { this.prize = PrizePoolConfig.create(properties.prize) as any }
            if (properties.modifyVersion) { this.modifyVersion = properties.modifyVersion }
            if (properties.isWeekLyFlag) { this.isWeekLyFlag = properties.isWeekLyFlag }
            if (properties.isOpenDynamicStage) { this.isOpenDynamicStage = properties.isOpenDynamicStage }
            if (properties.dynamicSpecConfigs) { this.dynamicSpecConfigs = []; properties.dynamicSpecConfigs.forEach((value, index)=>{this.dynamicSpecConfigs[index] = DynamicSpecConfig.create(properties.dynamicSpecConfigs[index]) as any})}
            if (properties.maxUserNum) { this.maxUserNum = properties.maxUserNum }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public userInitScore?: number|null = 0
    @protobuf.Field.d(3, "tss_match_v2_common_StageConfig", "repeated")
    public stages?: StageConfig[] = []
    @protobuf.Field.d(4, "int64", "optional", 0)
    public minUserNum?: number|null = 0
    @protobuf.Field.d(5, "tss_match_v2_common_PunishmentConfig", "optional")
    public punishment?: PunishmentConfig|null
    @protobuf.Field.d(10, "tss_match_v2_common_PrizePoolConfig", "optional")
    public prize?: PrizePoolConfig|null
    @protobuf.Field.d(6, "int64", "optional", 0)
    public modifyVersion?: number|null = 0
    @protobuf.Field.d(7, "bool", "optional", false)
    public isWeekLyFlag?: boolean|null = false
    @protobuf.Field.d(8, "bool", "optional", false)
    public isOpenDynamicStage?: boolean|null = false
    @protobuf.Field.d(9, "tss_match_v2_common_DynamicSpecConfig", "repeated")
    public dynamicSpecConfigs?: DynamicSpecConfig[] = []
    @protobuf.Field.d(11, "int64", "optional", 0)
    public maxUserNum?: number|null = 0
}
export interface IAdvertiseConfig {
    advertiseSwitch?: tss_common_SwitchState|null
    url?: string|null
    video?: string|null
}
@protobuf.Type.d("tss_match_v2_common_AdvertiseConfig")
export class AdvertiseConfig extends protobuf.Message<IAdvertiseConfig> {
    constructor(properties: Properties<IAdvertiseConfig>) {
        super(properties);
        if (properties) {
            if (properties.advertiseSwitch) { this.advertiseSwitch = properties.advertiseSwitch }
            if (properties.url) { this.url = properties.url }
            if (properties.video) { this.video = properties.video }
        }
	}
    @protobuf.Field.d(1, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public advertiseSwitch?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
    @protobuf.Field.d(2, "string", "optional", )
    public url?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public video?: string|null = ""
}
export interface IMatchViewInfo {
    matchName?: string|null
    imgURL?: string|null
    expectedDuration?: number|null
    descGenRuleType?: MatchDescGenRuleType|null
    CMSMatchDesc?: string|null
    listDisplayStyle?: MatchListDisplayStyle|null
    newImgURL?: string|null
    showInList?: tss_common_SwitchState|null
    showForNovice?: tss_common_SwitchState|null
    imageWidth?: number|null
    imageHeight?: number|null
    maxVersion?: number|null
    minVersion?: number|null
    verImgURL?: string|null
    guideForNovice?: tss_common_SwitchState|null
    matchTagType?: MatchTagType|null
    CMSRevivalRuleDesc?: string|null
    matchSpecialType?: MatchSpecialType|null
    matchTagTypes?: MatchTagType[]
    exceptAppIds?: string[]
    advertiseConfig?: IAdvertiseConfig
}
@protobuf.Type.d("tss_match_v2_common_MatchViewInfo")
export class MatchViewInfo extends protobuf.Message<IMatchViewInfo> {
    constructor(properties: Properties<IMatchViewInfo>) {
        super(properties);
        if (properties) {
            if (properties.matchName) { this.matchName = properties.matchName }
            if (properties.imgURL) { this.imgURL = properties.imgURL }
            if (properties.expectedDuration) { this.expectedDuration = properties.expectedDuration }
            if (properties.descGenRuleType) { this.descGenRuleType = properties.descGenRuleType }
            if (properties.CMSMatchDesc) { this.CMSMatchDesc = properties.CMSMatchDesc }
            if (properties.listDisplayStyle) { this.listDisplayStyle = properties.listDisplayStyle }
            if (properties.newImgURL) { this.newImgURL = properties.newImgURL }
            if (properties.showInList) { this.showInList = properties.showInList }
            if (properties.showForNovice) { this.showForNovice = properties.showForNovice }
            if (properties.imageWidth) { this.imageWidth = properties.imageWidth }
            if (properties.imageHeight) { this.imageHeight = properties.imageHeight }
            if (properties.maxVersion) { this.maxVersion = properties.maxVersion }
            if (properties.minVersion) { this.minVersion = properties.minVersion }
            if (properties.verImgURL) { this.verImgURL = properties.verImgURL }
            if (properties.guideForNovice) { this.guideForNovice = properties.guideForNovice }
            if (properties.matchTagType) { this.matchTagType = properties.matchTagType }
            if (properties.CMSRevivalRuleDesc) { this.CMSRevivalRuleDesc = properties.CMSRevivalRuleDesc }
            if (properties.matchSpecialType) { this.matchSpecialType = properties.matchSpecialType }
            if (properties.matchTagTypes) { this.matchTagTypes = []; properties.matchTagTypes.forEach((value, index)=>{this.matchTagTypes[index] = properties.matchTagTypes[index]})}
            if (properties.exceptAppIds) { this.exceptAppIds = []; properties.exceptAppIds.forEach((value, index)=>{this.exceptAppIds[index] = properties.exceptAppIds[index]})}
            if (properties.advertiseConfig) { this.advertiseConfig = AdvertiseConfig.create(properties.advertiseConfig) as any }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public matchName?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public imgURL?: string|null = ""
    @protobuf.Field.d(3, "int64", "optional", 0)
    public expectedDuration?: number|null = 0
    @protobuf.Field.d(4, MatchDescGenRuleType, "optional", MatchDescGenRuleType.MatchDescGenRuleTypeUnknown)
    public descGenRuleType?: MatchDescGenRuleType|null = MatchDescGenRuleType.MatchDescGenRuleTypeUnknown
    @protobuf.Field.d(5, "string", "optional", )
    public CMSMatchDesc?: string|null = ""
    @protobuf.Field.d(6, MatchListDisplayStyle, "optional", MatchListDisplayStyle.MatchListDisplayStyleUnknown)
    public listDisplayStyle?: MatchListDisplayStyle|null = MatchListDisplayStyle.MatchListDisplayStyleUnknown
    @protobuf.Field.d(7, "string", "optional", )
    public newImgURL?: string|null = ""
    @protobuf.Field.d(8, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public showInList?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
    @protobuf.Field.d(9, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public showForNovice?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
    @protobuf.Field.d(10, "int64", "optional", 0)
    public imageWidth?: number|null = 0
    @protobuf.Field.d(11, "int64", "optional", 0)
    public imageHeight?: number|null = 0
    @protobuf.Field.d(12, "int64", "optional", 0)
    public maxVersion?: number|null = 0
    @protobuf.Field.d(13, "int64", "optional", 0)
    public minVersion?: number|null = 0
    @protobuf.Field.d(14, "string", "optional", )
    public verImgURL?: string|null = ""
    @protobuf.Field.d(15, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public guideForNovice?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
    @protobuf.Field.d(16, MatchTagType, "optional", MatchTagType.MatchTagTypeUnknown)
    public matchTagType?: MatchTagType|null = MatchTagType.MatchTagTypeUnknown
    @protobuf.Field.d(17, "string", "optional", )
    public CMSRevivalRuleDesc?: string|null = ""
    @protobuf.Field.d(18, MatchSpecialType, "optional", MatchSpecialType.MatchSpecialUnknown)
    public matchSpecialType?: MatchSpecialType|null = MatchSpecialType.MatchSpecialUnknown
    @protobuf.Field.d(19, MatchTagType, "repeated", MatchTagType.MatchTagTypeUnknown)
    public matchTagTypes?: MatchTagType[] = []
    @protobuf.Field.d(20, "string", "repeated", [])
    public exceptAppIds?: string[] = []
    @protobuf.Field.d(21, "tss_match_v2_common_AdvertiseConfig", "optional")
    public advertiseConfig?: AdvertiseConfig|null
}
export interface IPlayRhythm {
    isEnabled?: boolean|null
    thinkingOpTime?: number|null
    downgradeOpTime?: number|null
}
@protobuf.Type.d("tss_match_v2_common_PlayRhythm")
export class PlayRhythm extends protobuf.Message<IPlayRhythm> {
    constructor(properties: Properties<IPlayRhythm>) {
        super(properties);
        if (properties) {
            if (properties.isEnabled) { this.isEnabled = properties.isEnabled }
            if (properties.thinkingOpTime) { this.thinkingOpTime = properties.thinkingOpTime }
            if (properties.downgradeOpTime) { this.downgradeOpTime = properties.downgradeOpTime }
        }
	}
    @protobuf.Field.d(1, "bool", "optional", false)
    public isEnabled?: boolean|null = false
    @protobuf.Field.d(2, "int32", "optional", 0)
    public thinkingOpTime?: number|null = 0
    @protobuf.Field.d(3, "int32", "optional", 0)
    public downgradeOpTime?: number|null = 0
}
export interface IPrize {
    awardType?: AwardType|null
    asset?: tss_common_IAsset
}
@protobuf.Type.d("tss_match_v2_common_Prize")
export class Prize extends protobuf.Message<IPrize> {
    constructor(properties: Properties<IPrize>) {
        super(properties);
        if (properties) {
            if (properties.awardType) { this.awardType = properties.awardType }
            if (properties.asset) { this.asset = tss_common_Asset.create(properties.asset) as any }
        }
	}
    @protobuf.Field.d(1, AwardType, "optional", AwardType.AwardTypeUnknown)
    public awardType?: AwardType|null = AwardType.AwardTypeUnknown
    @protobuf.Field.d(2, "tss_common_Asset", "optional")
    public asset?: tss_common_Asset|null
}
export interface ISpecConfig {
    creator?: number|null
    time?: IMatchTime
    entry?: IEntryConfig
    game?: IGameConfig
    robot?: IRobotConfig
    observe?: IObserveConfig
    fastSNG?: IFastSNGConfig
    match?: IMatchConfig
    viewInfo?: IMatchViewInfo
    type?: MatchType|null
    subMatchType?: SubMatchType|null
    schedulerID?: number|null
    cycleMode?: CycleMode|null
    MaxVersion?: number|null
    MinVersion?: number|null
    applicationId?: string|null
    showSeq?: number|null
    isOffSitePush?: boolean|null
    applicationIds?: string[]
    listApplicationIds?: string[]
    preventCheat?: IPreventCheat
    promptJump?: IPromptJump
    delayPlay?: IDelayPlay
    schedulerType?: SchedulerType|null
    playRhythm?: IPlayRhythm
    refactorVer?: RefactorVer|null
    appRemindCfg?: IAppRemindCfg
}
@protobuf.Type.d("tss_match_v2_common_SpecConfig")
export class SpecConfig extends protobuf.Message<ISpecConfig> {
    constructor(properties: Properties<ISpecConfig>) {
        super(properties);
        if (properties) {
            if (properties.creator) { this.creator = properties.creator }
            if (properties.time) { this.time = MatchTime.create(properties.time) as any }
            if (properties.entry) { this.entry = EntryConfig.create(properties.entry) as any }
            if (properties.game) { this.game = GameConfig.create(properties.game) as any }
            if (properties.robot) { this.robot = RobotConfig.create(properties.robot) as any }
            if (properties.observe) { this.observe = ObserveConfig.create(properties.observe) as any }
            if (properties.fastSNG) { this.fastSNG = FastSNGConfig.create(properties.fastSNG) as any }
            if (properties.match) { this.match = MatchConfig.create(properties.match) as any }
            if (properties.viewInfo) { this.viewInfo = MatchViewInfo.create(properties.viewInfo) as any }
            if (properties.type) { this.type = properties.type }
            if (properties.subMatchType) { this.subMatchType = properties.subMatchType }
            if (properties.schedulerID) { this.schedulerID = properties.schedulerID }
            if (properties.cycleMode) { this.cycleMode = properties.cycleMode }
            if (properties.MaxVersion) { this.MaxVersion = properties.MaxVersion }
            if (properties.MinVersion) { this.MinVersion = properties.MinVersion }
            if (properties.applicationId) { this.applicationId = properties.applicationId }
            if (properties.showSeq) { this.showSeq = properties.showSeq }
            if (properties.isOffSitePush) { this.isOffSitePush = properties.isOffSitePush }
            if (properties.applicationIds) { this.applicationIds = []; properties.applicationIds.forEach((value, index)=>{this.applicationIds[index] = properties.applicationIds[index]})}
            if (properties.listApplicationIds) { this.listApplicationIds = []; properties.listApplicationIds.forEach((value, index)=>{this.listApplicationIds[index] = properties.listApplicationIds[index]})}
            if (properties.preventCheat) { this.preventCheat = PreventCheat.create(properties.preventCheat) as any }
            if (properties.promptJump) { this.promptJump = PromptJump.create(properties.promptJump) as any }
            if (properties.delayPlay) { this.delayPlay = DelayPlay.create(properties.delayPlay) as any }
            if (properties.schedulerType) { this.schedulerType = properties.schedulerType }
            if (properties.playRhythm) { this.playRhythm = PlayRhythm.create(properties.playRhythm) as any }
            if (properties.refactorVer) { this.refactorVer = properties.refactorVer }
            if (properties.appRemindCfg) { this.appRemindCfg = AppRemindCfg.create(properties.appRemindCfg) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public creator?: number|null = 0
    @protobuf.Field.d(2, "tss_match_v2_common_MatchTime", "optional")
    public time?: MatchTime|null
    @protobuf.Field.d(3, "tss_match_v2_common_EntryConfig", "optional")
    public entry?: EntryConfig|null
    @protobuf.Field.d(4, "tss_match_v2_common_GameConfig", "optional")
    public game?: GameConfig|null
    @protobuf.Field.d(5, "tss_match_v2_common_RobotConfig", "optional")
    public robot?: RobotConfig|null
    @protobuf.Field.d(6, "tss_match_v2_common_ObserveConfig", "optional")
    public observe?: ObserveConfig|null
    @protobuf.Field.d(7, "tss_match_v2_common_FastSNGConfig", "optional")
    public fastSNG?: FastSNGConfig|null
    @protobuf.Field.d(8, "tss_match_v2_common_MatchConfig", "optional")
    public match?: MatchConfig|null
    @protobuf.Field.d(9, "tss_match_v2_common_MatchViewInfo", "optional")
    public viewInfo?: MatchViewInfo|null
    @protobuf.Field.d(10, MatchType, "optional", MatchType.MatchTypeUnknown)
    public type?: MatchType|null = MatchType.MatchTypeUnknown
    @protobuf.Field.d(11, SubMatchType, "optional", SubMatchType.SubMatchTypeUnknown)
    public subMatchType?: SubMatchType|null = SubMatchType.SubMatchTypeUnknown
    @protobuf.Field.d(12, "int64", "optional", 0)
    public schedulerID?: number|null = 0
    @protobuf.Field.d(13, CycleMode, "optional", CycleMode.CycleModeUnknown)
    public cycleMode?: CycleMode|null = CycleMode.CycleModeUnknown
    @protobuf.Field.d(14, "int64", "optional", 0)
    public MaxVersion?: number|null = 0
    @protobuf.Field.d(15, "int64", "optional", 0)
    public MinVersion?: number|null = 0
    @protobuf.Field.d(16, "string", "optional", )
    public applicationId?: string|null = ""
    @protobuf.Field.d(17, "int64", "optional", 0)
    public showSeq?: number|null = 0
    @protobuf.Field.d(18, "bool", "optional", false)
    public isOffSitePush?: boolean|null = false
    @protobuf.Field.d(19, "string", "repeated", [])
    public applicationIds?: string[] = []
    @protobuf.Field.d(20, "string", "repeated", [])
    public listApplicationIds?: string[] = []
    @protobuf.Field.d(21, "tss_match_v2_common_PreventCheat", "optional")
    public preventCheat?: PreventCheat|null
    @protobuf.Field.d(22, "tss_match_v2_common_PromptJump", "optional")
    public promptJump?: PromptJump|null
    @protobuf.Field.d(23, "tss_match_v2_common_DelayPlay", "optional")
    public delayPlay?: DelayPlay|null
    @protobuf.Field.d(24, SchedulerType, "optional", SchedulerType.SchedulerTypeUnknown)
    public schedulerType?: SchedulerType|null = SchedulerType.SchedulerTypeUnknown
    @protobuf.Field.d(25, "tss_match_v2_common_PlayRhythm", "optional")
    public playRhythm?: PlayRhythm|null
    @protobuf.Field.d(26, RefactorVer, "optional", RefactorVer.RefactorVerV1)
    public refactorVer?: RefactorVer|null = RefactorVer.RefactorVerV1
    @protobuf.Field.d(27, "tss_match_v2_common_AppRemindCfg", "optional")
    public appRemindCfg?: AppRemindCfg|null
}
export interface IPreUser {
    uid?: number|null
    isReady?: boolean|null
    enterAt?: number|null
    appID?: string|null
    appVersion?: string|null
    isRobot?: boolean|null
    enterPay?: tss_common_IAssetItem
    IP?: string|null
    propBatchID?: string|null
}
@protobuf.Type.d("tss_match_v2_common_PreUser")
export class PreUser extends protobuf.Message<IPreUser> {
    constructor(properties: Properties<IPreUser>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.isReady) { this.isReady = properties.isReady }
            if (properties.enterAt) { this.enterAt = properties.enterAt }
            if (properties.appID) { this.appID = properties.appID }
            if (properties.appVersion) { this.appVersion = properties.appVersion }
            if (properties.isRobot) { this.isRobot = properties.isRobot }
            if (properties.enterPay) { this.enterPay = tss_common_AssetItem.create(properties.enterPay) as any }
            if (properties.IP) { this.IP = properties.IP }
            if (properties.propBatchID) { this.propBatchID = properties.propBatchID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "bool", "optional", false)
    public isReady?: boolean|null = false
    @protobuf.Field.d(3, "int64", "optional", 0)
    public enterAt?: number|null = 0
    @protobuf.Field.d(4, "string", "optional", )
    public appID?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public appVersion?: string|null = ""
    @protobuf.Field.d(6, "bool", "optional", false)
    public isRobot?: boolean|null = false
    @protobuf.Field.d(7, "tss_common_AssetItem", "optional")
    public enterPay?: tss_common_AssetItem|null
    @protobuf.Field.d(8, "string", "optional", )
    public IP?: string|null = ""
    @protobuf.Field.d(9, "string", "optional", )
    public propBatchID?: string|null = ""
}
export interface IEntryInfo {
}
@protobuf.Type.d("tss_match_v2_common_EntryInfo")
export class EntryInfo extends protobuf.Message<IEntryInfo> {
    constructor(properties: Properties<IEntryInfo>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IPreMatchInfo {
    leftDurationToStart?: number|null
    entryTokens?: string[]
    joinUserNum?: number|null
    enterUserNum?: number|null
    readyUserNum?: number|null
    observerUserNum?: number|null
    roomNo?: string|null
    preMatchKey?: string|null
    matchKey?: string|null
    entries?: IEntryInfo[]
    roomId?: string|null
    pool?: tss_common_IAsset
    prizePool?: tss_common_IAssetItem[]
    matchStartAt?: number|null
    matchReadyAt?: number|null
    status?: MatchStatus|null
}
@protobuf.Type.d("tss_match_v2_common_PreMatchInfo")
export class PreMatchInfo extends protobuf.Message<IPreMatchInfo> {
    constructor(properties: Properties<IPreMatchInfo>) {
        super(properties);
        if (properties) {
            if (properties.leftDurationToStart) { this.leftDurationToStart = properties.leftDurationToStart }
            if (properties.entryTokens) { this.entryTokens = []; properties.entryTokens.forEach((value, index)=>{this.entryTokens[index] = properties.entryTokens[index]})}
            if (properties.joinUserNum) { this.joinUserNum = properties.joinUserNum }
            if (properties.enterUserNum) { this.enterUserNum = properties.enterUserNum }
            if (properties.readyUserNum) { this.readyUserNum = properties.readyUserNum }
            if (properties.observerUserNum) { this.observerUserNum = properties.observerUserNum }
            if (properties.roomNo) { this.roomNo = properties.roomNo }
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
            if (properties.matchKey) { this.matchKey = properties.matchKey }
            if (properties.entries) { this.entries = []; properties.entries.forEach((value, index)=>{this.entries[index] = EntryInfo.create(properties.entries[index]) as any})}
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
    @protobuf.Field.d(2, "string", "repeated", [])
    public entryTokens?: string[] = []
    @protobuf.Field.d(3, "int64", "optional", 0)
    public joinUserNum?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public enterUserNum?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public readyUserNum?: number|null = 0
    @protobuf.Field.d(11, "int64", "optional", 0)
    public observerUserNum?: number|null = 0
    @protobuf.Field.d(6, "string", "optional", )
    public roomNo?: string|null = ""
    @protobuf.Field.d(7, "string", "optional", )
    public preMatchKey?: string|null = ""
    @protobuf.Field.d(13, "string", "optional", )
    public matchKey?: string|null = ""
    @protobuf.Field.d(8, "tss_match_v2_common_EntryInfo", "repeated")
    public entries?: EntryInfo[] = []
    @protobuf.Field.d(9, "string", "optional", )
    public roomId?: string|null = ""
    @protobuf.Field.d(10, "tss_common_Asset", "optional")
    public pool?: tss_common_Asset|null
    @protobuf.Field.d(12, "tss_common_AssetItem", "repeated")
    public prizePool?: tss_common_AssetItem[] = []
    @protobuf.Field.d(16, "int64", "optional", 0)
    public matchStartAt?: number|null = 0
    @protobuf.Field.d(17, "int64", "optional", 0)
    public matchReadyAt?: number|null = 0
    @protobuf.Field.d(18, MatchStatus, "optional", MatchStatus.MatchStatusUnknown)
    public status?: MatchStatus|null = MatchStatus.MatchStatusUnknown
}
export interface IStageGroupItem {
    groupID?: number|null
    userNum?: number|null
    uids?: number[]
}
@protobuf.Type.d("tss_match_v2_common_StageGroupItem")
export class StageGroupItem extends protobuf.Message<IStageGroupItem> {
    constructor(properties: Properties<IStageGroupItem>) {
        super(properties);
        if (properties) {
            if (properties.groupID) { this.groupID = properties.groupID }
            if (properties.userNum) { this.userNum = properties.userNum }
            if (properties.uids) { this.uids = []; properties.uids.forEach((value, index)=>{this.uids[index] = properties.uids[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public groupID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public userNum?: number|null = 0
    @protobuf.Field.d(3, "int64", "repeated", [])
    public uids?: number[] = []
}
export interface IStage {
    index?: number|null
    LeftDuration?: number|null
    isOver?: boolean|null
    isLastedStage?: boolean|null
}
@protobuf.Type.d("tss_match_v2_common_Stage")
export class Stage extends protobuf.Message<IStage> {
    constructor(properties: Properties<IStage>) {
        super(properties);
        if (properties) {
            if (properties.index) { this.index = properties.index }
            if (properties.LeftDuration) { this.LeftDuration = properties.LeftDuration }
            if (properties.isOver) { this.isOver = properties.isOver }
            if (properties.isLastedStage) { this.isLastedStage = properties.isLastedStage }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public index?: number|null = 0
    @protobuf.Field.d(6, "int64", "optional", 0)
    public LeftDuration?: number|null = 0
    @protobuf.Field.d(7, "bool", "optional", false)
    public isOver?: boolean|null = false
    @protobuf.Field.d(8, "bool", "optional", false)
    public isLastedStage?: boolean|null = false
}
export interface IGroupInfo {
    isOpen?: boolean|null
    groupNum?: number|null
    doneGroups?: IStageGroupItem[]
    doingGroups?: IStageGroupItem[]
}
@protobuf.Type.d("tss_match_v2_common_GroupInfo")
export class GroupInfo extends protobuf.Message<IGroupInfo> {
    constructor(properties: Properties<IGroupInfo>) {
        super(properties);
        if (properties) {
            if (properties.isOpen) { this.isOpen = properties.isOpen }
            if (properties.groupNum) { this.groupNum = properties.groupNum }
            if (properties.doneGroups) { this.doneGroups = []; properties.doneGroups.forEach((value, index)=>{this.doneGroups[index] = StageGroupItem.create(properties.doneGroups[index]) as any})}
            if (properties.doingGroups) { this.doingGroups = []; properties.doingGroups.forEach((value, index)=>{this.doingGroups[index] = StageGroupItem.create(properties.doingGroups[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "bool", "optional", false)
    public isOpen?: boolean|null = false
    @protobuf.Field.d(2, "int64", "optional", 0)
    public groupNum?: number|null = 0
    @protobuf.Field.d(3, "tss_match_v2_common_StageGroupItem", "repeated")
    public doneGroups?: StageGroupItem[] = []
    @protobuf.Field.d(4, "tss_match_v2_common_StageGroupItem", "repeated")
    public doingGroups?: StageGroupItem[] = []
}
export interface IMatchInfo {
    stage?: IStage
    entryUserNum?: number|null
    playingUserNum?: number|null
    waitUserNum?: number|null
    outUserNum?: number|null
    playerNum?: number|null
    baseScore?: number|null
    outScore?: number|null
    status?: MatchStatus|null
    matchKey?: string|null
    preMatchKey?: string|null
    hadUpperBench?: boolean|null
    hadEmceeAward?: boolean|null
    roomId?: string|null
    srvID?: number|null
    isDynamicStage?: boolean|null
    dynamicStageId?: number|null
    groupInfo?: IGroupInfo
    prizePool?: tss_common_IAssetItem[]
    revivedNum?: number|null
}
@protobuf.Type.d("tss_match_v2_common_MatchInfo")
export class MatchInfo extends protobuf.Message<IMatchInfo> {
    constructor(properties: Properties<IMatchInfo>) {
        super(properties);
        if (properties) {
            if (properties.stage) { this.stage = Stage.create(properties.stage) as any }
            if (properties.entryUserNum) { this.entryUserNum = properties.entryUserNum }
            if (properties.playingUserNum) { this.playingUserNum = properties.playingUserNum }
            if (properties.waitUserNum) { this.waitUserNum = properties.waitUserNum }
            if (properties.outUserNum) { this.outUserNum = properties.outUserNum }
            if (properties.playerNum) { this.playerNum = properties.playerNum }
            if (properties.baseScore) { this.baseScore = properties.baseScore }
            if (properties.outScore) { this.outScore = properties.outScore }
            if (properties.status) { this.status = properties.status }
            if (properties.matchKey) { this.matchKey = properties.matchKey }
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
            if (properties.hadUpperBench) { this.hadUpperBench = properties.hadUpperBench }
            if (properties.hadEmceeAward) { this.hadEmceeAward = properties.hadEmceeAward }
            if (properties.roomId) { this.roomId = properties.roomId }
            if (properties.srvID) { this.srvID = properties.srvID }
            if (properties.isDynamicStage) { this.isDynamicStage = properties.isDynamicStage }
            if (properties.dynamicStageId) { this.dynamicStageId = properties.dynamicStageId }
            if (properties.groupInfo) { this.groupInfo = GroupInfo.create(properties.groupInfo) as any }
            if (properties.prizePool) { this.prizePool = []; properties.prizePool.forEach((value, index)=>{this.prizePool[index] = tss_common_AssetItem.create(properties.prizePool[index]) as any})}
            if (properties.revivedNum) { this.revivedNum = properties.revivedNum }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_common_Stage", "optional")
    public stage?: Stage|null
    @protobuf.Field.d(2, "int64", "optional", 0)
    public entryUserNum?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public playingUserNum?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public waitUserNum?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public outUserNum?: number|null = 0
    @protobuf.Field.d(6, "int64", "optional", 0)
    public playerNum?: number|null = 0
    @protobuf.Field.d(8, "int64", "optional", 0)
    public baseScore?: number|null = 0
    @protobuf.Field.d(9, "int64", "optional", 0)
    public outScore?: number|null = 0
    @protobuf.Field.d(10, MatchStatus, "optional", MatchStatus.MatchStatusUnknown)
    public status?: MatchStatus|null = MatchStatus.MatchStatusUnknown
    @protobuf.Field.d(11, "string", "optional", )
    public matchKey?: string|null = ""
    @protobuf.Field.d(12, "string", "optional", )
    public preMatchKey?: string|null = ""
    @protobuf.Field.d(13, "bool", "optional", false)
    public hadUpperBench?: boolean|null = false
    @protobuf.Field.d(14, "bool", "optional", false)
    public hadEmceeAward?: boolean|null = false
    @protobuf.Field.d(15, "string", "optional", )
    public roomId?: string|null = ""
    @protobuf.Field.d(16, "int64", "optional", 0)
    public srvID?: number|null = 0
    @protobuf.Field.d(17, "bool", "optional", false)
    public isDynamicStage?: boolean|null = false
    @protobuf.Field.d(18, "int64", "optional", 0)
    public dynamicStageId?: number|null = 0
    @protobuf.Field.d(19, "tss_match_v2_common_GroupInfo", "optional")
    public groupInfo?: GroupInfo|null
    @protobuf.Field.d(20, "tss_common_AssetItem", "repeated")
    public prizePool?: tss_common_AssetItem[] = []
    @protobuf.Field.d(21, "int64", "optional", 0)
    public revivedNum?: number|null = 0
}
export interface ITeamScoreInfo {
    teamID?: number|null
    winScore?: number|null
}
@protobuf.Type.d("tss_match_v2_common_TeamScoreInfo")
export class TeamScoreInfo extends protobuf.Message<ITeamScoreInfo> {
    constructor(properties: Properties<ITeamScoreInfo>) {
        super(properties);
        if (properties) {
            if (properties.teamID) { this.teamID = properties.teamID }
            if (properties.winScore) { this.winScore = properties.winScore }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public teamID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public winScore?: number|null = 0
}
export interface IUser {
    uid?: number|null
    score?: number|null
    rank?: number|null
    changeScore?: number|null
    Latitude?: number|null
    Longitude?: number|null
    IP?: string|null
    status?: UserStatus|null
    TableRole?: number|null
    gameResult?: GameResultType|null
    prize?: IPrize[]
    tid?: number|null
    sid?: number|null
    teamID?: number|null
    EnterAt?: number|null
    AppID?: string|null
    AppVersion?: string|null
    RoundCnt?: number|null
    isRobot?: boolean|null
    isDelayEnter?: boolean|null
    isFastOut?: boolean|null
    groupID?: number|null
    OutAt?: number|null
    metas?: { [k: string]: string|null }
    punishMarks?: boolean|null
    punishCnt?: number|null
    prizeViewAssets?: tss_hall_common_IDynamicAssetItems[]
    curStFinishAt?: number|null
    prevStRank?: number|null
    enterPay?: tss_common_IAssetItem
    isConfirmPromote?: boolean|null
    isCanStageQuit?: boolean|null
    isStageQuitFlag?: boolean|null
}
@protobuf.Type.d("tss_match_v2_common_User")
export class User extends protobuf.Message<IUser> {
    constructor(properties: Properties<IUser>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.score) { this.score = properties.score }
            if (properties.rank) { this.rank = properties.rank }
            if (properties.changeScore) { this.changeScore = properties.changeScore }
            if (properties.Latitude) { this.Latitude = properties.Latitude }
            if (properties.Longitude) { this.Longitude = properties.Longitude }
            if (properties.IP) { this.IP = properties.IP }
            if (properties.status) { this.status = properties.status }
            if (properties.TableRole) { this.TableRole = properties.TableRole }
            if (properties.gameResult) { this.gameResult = properties.gameResult }
            if (properties.prize) { this.prize = []; properties.prize.forEach((value, index)=>{this.prize[index] = Prize.create(properties.prize[index]) as any})}
            if (properties.tid) { this.tid = properties.tid }
            if (properties.sid) { this.sid = properties.sid }
            if (properties.teamID) { this.teamID = properties.teamID }
            if (properties.EnterAt) { this.EnterAt = properties.EnterAt }
            if (properties.AppID) { this.AppID = properties.AppID }
            if (properties.AppVersion) { this.AppVersion = properties.AppVersion }
            if (properties.RoundCnt) { this.RoundCnt = properties.RoundCnt }
            if (properties.isRobot) { this.isRobot = properties.isRobot }
            if (properties.isDelayEnter) { this.isDelayEnter = properties.isDelayEnter }
            if (properties.isFastOut) { this.isFastOut = properties.isFastOut }
            if (properties.groupID) { this.groupID = properties.groupID }
            if (properties.OutAt) { this.OutAt = properties.OutAt }
            if (properties.metas) { this.metas = properties.metas }
            if (properties.punishMarks) { this.punishMarks = properties.punishMarks }
            if (properties.punishCnt) { this.punishCnt = properties.punishCnt }
            if (properties.prizeViewAssets) { this.prizeViewAssets = []; properties.prizeViewAssets.forEach((value, index)=>{this.prizeViewAssets[index] = tss_hall_common_DynamicAssetItems.create(properties.prizeViewAssets[index]) as any})}
            if (properties.curStFinishAt) { this.curStFinishAt = properties.curStFinishAt }
            if (properties.prevStRank) { this.prevStRank = properties.prevStRank }
            if (properties.enterPay) { this.enterPay = tss_common_AssetItem.create(properties.enterPay) as any }
            if (properties.isConfirmPromote) { this.isConfirmPromote = properties.isConfirmPromote }
            if (properties.isCanStageQuit) { this.isCanStageQuit = properties.isCanStageQuit }
            if (properties.isStageQuitFlag) { this.isStageQuitFlag = properties.isStageQuitFlag }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public score?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public rank?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public changeScore?: number|null = 0
    @protobuf.Field.d(5, "float", "optional", 0)
    public Latitude?: number|null = 0
    @protobuf.Field.d(6, "float", "optional", 0)
    public Longitude?: number|null = 0
    @protobuf.Field.d(7, "string", "optional", )
    public IP?: string|null = ""
    @protobuf.Field.d(8, UserStatus, "optional", UserStatus.UserStatusUnknown)
    public status?: UserStatus|null = UserStatus.UserStatusUnknown
    @protobuf.Field.d(9, "int64", "optional", 0)
    public TableRole?: number|null = 0
    @protobuf.Field.d(10, GameResultType, "optional", GameResultType.GameResultTypeUnknown)
    public gameResult?: GameResultType|null = GameResultType.GameResultTypeUnknown
    @protobuf.Field.d(11, "tss_match_v2_common_Prize", "repeated")
    public prize?: Prize[] = []
    @protobuf.Field.d(12, "int64", "optional", 0)
    public tid?: number|null = 0
    @protobuf.Field.d(13, "int64", "optional", 0)
    public sid?: number|null = 0
    @protobuf.Field.d(14, "int64", "optional", 0)
    public teamID?: number|null = 0
    @protobuf.Field.d(15, "int64", "optional", 0)
    public EnterAt?: number|null = 0
    @protobuf.Field.d(16, "string", "optional", )
    public AppID?: string|null = ""
    @protobuf.Field.d(17, "string", "optional", )
    public AppVersion?: string|null = ""
    @protobuf.Field.d(18, "int64", "optional", 0)
    public RoundCnt?: number|null = 0
    @protobuf.Field.d(19, "bool", "optional", false)
    public isRobot?: boolean|null = false
    @protobuf.Field.d(20, "bool", "optional", false)
    public isDelayEnter?: boolean|null = false
    @protobuf.Field.d(21, "bool", "optional", false)
    public isFastOut?: boolean|null = false
    @protobuf.Field.d(22, "int64", "optional", 0)
    public groupID?: number|null = 0
    @protobuf.Field.d(23, "int64", "optional", 0)
    public OutAt?: number|null = 0
    @protobuf.MapField.d(24, "string", "string")
    public metas?: { [k: string]: string|null } = {}
    @protobuf.Field.d(25, "bool", "optional", false)
    public punishMarks?: boolean|null = false
    @protobuf.Field.d(26, "int64", "optional", 0)
    public punishCnt?: number|null = 0
    @protobuf.Field.d(27, "tss_hall_common_DynamicAssetItems", "repeated")
    public prizeViewAssets?: tss_hall_common_DynamicAssetItems[] = []
    @protobuf.Field.d(28, "int64", "optional", 0)
    public curStFinishAt?: number|null = 0
    @protobuf.Field.d(29, "int64", "optional", 0)
    public prevStRank?: number|null = 0
    @protobuf.Field.d(30, "tss_common_AssetItem", "optional")
    public enterPay?: tss_common_AssetItem|null
    @protobuf.Field.d(31, "bool", "optional", false)
    public isConfirmPromote?: boolean|null = false
    @protobuf.Field.d(32, "bool", "optional", false)
    public isCanStageQuit?: boolean|null = false
    @protobuf.Field.d(33, "bool", "optional", false)
    public isStageQuitFlag?: boolean|null = false
}
export interface ITeam {
    id?: number|null
    score?: number|null
    name?: string|null
    users?: number[]
    isWin?: boolean|null
}
@protobuf.Type.d("tss_match_v2_common_Team")
export class Team extends protobuf.Message<ITeam> {
    constructor(properties: Properties<ITeam>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.score) { this.score = properties.score }
            if (properties.name) { this.name = properties.name }
            if (properties.users) { this.users = []; properties.users.forEach((value, index)=>{this.users[index] = properties.users[index]})}
            if (properties.isWin) { this.isWin = properties.isWin }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public id?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public score?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(4, "int64", "repeated", [])
    public users?: number[] = []
    @protobuf.Field.d(5, "bool", "optional", false)
    public isWin?: boolean|null = false
}
export interface ITeamInfo {
    teams?: ITeam[]
}
@protobuf.Type.d("tss_match_v2_common_TeamInfo")
export class TeamInfo extends protobuf.Message<ITeamInfo> {
    constructor(properties: Properties<ITeamInfo>) {
        super(properties);
        if (properties) {
            if (properties.teams) { this.teams = []; properties.teams.forEach((value, index)=>{this.teams[index] = Team.create(properties.teams[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_common_Team", "repeated")
    public teams?: Team[] = []
}
export interface ITable {
    key?: string|null
    baseScore?: number|null
    outScore?: number|null
    users?: IUser[]
    gameNo?: number|null
    realKey?: string|null
    realSrvId?: number|null
    tid?: number|null
    status?: TableStatus|null
    teamScoreInfos?: ITeamScoreInfo[]
    groupID?: number|null
    uids?: number[]
}
@protobuf.Type.d("tss_match_v2_common_Table")
export class Table extends protobuf.Message<ITable> {
    constructor(properties: Properties<ITable>) {
        super(properties);
        if (properties) {
            if (properties.key) { this.key = properties.key }
            if (properties.baseScore) { this.baseScore = properties.baseScore }
            if (properties.outScore) { this.outScore = properties.outScore }
            if (properties.users) { this.users = []; properties.users.forEach((value, index)=>{this.users[index] = User.create(properties.users[index]) as any})}
            if (properties.gameNo) { this.gameNo = properties.gameNo }
            if (properties.realKey) { this.realKey = properties.realKey }
            if (properties.realSrvId) { this.realSrvId = properties.realSrvId }
            if (properties.tid) { this.tid = properties.tid }
            if (properties.status) { this.status = properties.status }
            if (properties.teamScoreInfos) { this.teamScoreInfos = []; properties.teamScoreInfos.forEach((value, index)=>{this.teamScoreInfos[index] = TeamScoreInfo.create(properties.teamScoreInfos[index]) as any})}
            if (properties.groupID) { this.groupID = properties.groupID }
            if (properties.uids) { this.uids = []; properties.uids.forEach((value, index)=>{this.uids[index] = properties.uids[index]})}
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public key?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public baseScore?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public outScore?: number|null = 0
    @protobuf.Field.d(4, "tss_match_v2_common_User", "repeated")
    public users?: User[] = []
    @protobuf.Field.d(5, "int64", "optional", 0)
    public gameNo?: number|null = 0
    @protobuf.Field.d(6, "string", "optional", )
    public realKey?: string|null = ""
    @protobuf.Field.d(7, "int64", "optional", 0)
    public realSrvId?: number|null = 0
    @protobuf.Field.d(8, "int64", "optional", 0)
    public tid?: number|null = 0
    @protobuf.Field.d(9, TableStatus, "optional", TableStatus.TableStatusUnknown)
    public status?: TableStatus|null = TableStatus.TableStatusUnknown
    @protobuf.Field.d(10, "tss_match_v2_common_TeamScoreInfo", "repeated")
    public teamScoreInfos?: TeamScoreInfo[] = []
    @protobuf.Field.d(11, "int64", "optional", 0)
    public groupID?: number|null = 0
    @protobuf.Field.d(12, "int64", "repeated", [])
    public uids?: number[] = []
}
export interface IStartMatchInfo {
    preMatchKey?: string|null
    matchKey?: string|null
    schedulerID?: number|null
    roomNo?: string|null
    roomID?: string|null
    enterUserNum?: number|null
    readyUserNum?: number|null
    preUsers?: IPreUser[]
    notifyHash?: number|null
    roomUsers?: number[]
    StartAt?: number|null
}
@protobuf.Type.d("tss_match_v2_common_StartMatchInfo")
export class StartMatchInfo extends protobuf.Message<IStartMatchInfo> {
    constructor(properties: Properties<IStartMatchInfo>) {
        super(properties);
        if (properties) {
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
            if (properties.matchKey) { this.matchKey = properties.matchKey }
            if (properties.schedulerID) { this.schedulerID = properties.schedulerID }
            if (properties.roomNo) { this.roomNo = properties.roomNo }
            if (properties.roomID) { this.roomID = properties.roomID }
            if (properties.enterUserNum) { this.enterUserNum = properties.enterUserNum }
            if (properties.readyUserNum) { this.readyUserNum = properties.readyUserNum }
            if (properties.preUsers) { this.preUsers = []; properties.preUsers.forEach((value, index)=>{this.preUsers[index] = PreUser.create(properties.preUsers[index]) as any})}
            if (properties.notifyHash) { this.notifyHash = properties.notifyHash }
            if (properties.roomUsers) { this.roomUsers = []; properties.roomUsers.forEach((value, index)=>{this.roomUsers[index] = properties.roomUsers[index]})}
            if (properties.StartAt) { this.StartAt = properties.StartAt }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public preMatchKey?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public matchKey?: string|null = ""
    @protobuf.Field.d(3, "int64", "optional", 0)
    public schedulerID?: number|null = 0
    @protobuf.Field.d(4, "string", "optional", )
    public roomNo?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public roomID?: string|null = ""
    @protobuf.Field.d(6, "int64", "optional", 0)
    public enterUserNum?: number|null = 0
    @protobuf.Field.d(7, "int64", "optional", 0)
    public readyUserNum?: number|null = 0
    @protobuf.Field.d(8, "tss_match_v2_common_PreUser", "repeated")
    public preUsers?: PreUser[] = []
    @protobuf.Field.d(9, "int64", "optional", 0)
    public notifyHash?: number|null = 0
    @protobuf.Field.d(10, "int64", "repeated", [])
    public roomUsers?: number[] = []
    @protobuf.Field.d(11, "int64", "optional", 0)
    public StartAt?: number|null = 0
}
export interface ITableInfo {
    tables?: ITable[]
}
@protobuf.Type.d("tss_match_v2_common_TableInfo")
export class TableInfo extends protobuf.Message<ITableInfo> {
    constructor(properties: Properties<ITableInfo>) {
        super(properties);
        if (properties) {
            if (properties.tables) { this.tables = []; properties.tables.forEach((value, index)=>{this.tables[index] = Table.create(properties.tables[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_common_Table", "repeated")
    public tables?: Table[] = []
}
export interface IUserInfo {
    users?: IUser[]
}
@protobuf.Type.d("tss_match_v2_common_UserInfo")
export class UserInfo extends protobuf.Message<IUserInfo> {
    constructor(properties: Properties<IUserInfo>) {
        super(properties);
        if (properties) {
            if (properties.users) { this.users = []; properties.users.forEach((value, index)=>{this.users[index] = User.create(properties.users[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_common_User", "repeated")
    public users?: User[] = []
}
export interface IHandleGameExceptionReq {
    tableKey?: string|null
    matchKey?: string|null
}
@protobuf.Type.d("tss_match_v2_common_HandleGameExceptionReq")
export class HandleGameExceptionReq extends protobuf.Message<IHandleGameExceptionReq> {
    constructor(properties: Properties<IHandleGameExceptionReq>) {
        super(properties);
        if (properties) {
            if (properties.tableKey) { this.tableKey = properties.tableKey }
            if (properties.matchKey) { this.matchKey = properties.matchKey }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public tableKey?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public matchKey?: string|null = ""
}
export interface IGameResultItem {
    uid?: number|null
    role?: number|null
    scoreRatio?: number|null
    gameResult?: GameResultType|null
    playTime?: number|null
    isTimeOut?: boolean|null
    allStep?: number|null
    handCnt?: number|null
    isHighlight?: boolean|null
    entrustCnt?: number|null
    entrustedCnt?: number|null
    endEntrustStatus?: number|null
    allStepCost?: number|null
    metas?: { [k: string]: string|null }
}
@protobuf.Type.d("tss_match_v2_common_GameResultItem")
export class GameResultItem extends protobuf.Message<IGameResultItem> {
    constructor(properties: Properties<IGameResultItem>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.role) { this.role = properties.role }
            if (properties.scoreRatio) { this.scoreRatio = properties.scoreRatio }
            if (properties.gameResult) { this.gameResult = properties.gameResult }
            if (properties.playTime) { this.playTime = properties.playTime }
            if (properties.isTimeOut) { this.isTimeOut = properties.isTimeOut }
            if (properties.allStep) { this.allStep = properties.allStep }
            if (properties.handCnt) { this.handCnt = properties.handCnt }
            if (properties.isHighlight) { this.isHighlight = properties.isHighlight }
            if (properties.entrustCnt) { this.entrustCnt = properties.entrustCnt }
            if (properties.entrustedCnt) { this.entrustedCnt = properties.entrustedCnt }
            if (properties.endEntrustStatus) { this.endEntrustStatus = properties.endEntrustStatus }
            if (properties.allStepCost) { this.allStepCost = properties.allStepCost }
            if (properties.metas) { this.metas = properties.metas }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public role?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public scoreRatio?: number|null = 0
    @protobuf.Field.d(4, GameResultType, "optional", GameResultType.GameResultTypeUnknown)
    public gameResult?: GameResultType|null = GameResultType.GameResultTypeUnknown
    @protobuf.Field.d(5, "int64", "optional", 0)
    public playTime?: number|null = 0
    @protobuf.Field.d(6, "bool", "optional", false)
    public isTimeOut?: boolean|null = false
    @protobuf.Field.d(7, "int64", "optional", 0)
    public allStep?: number|null = 0
    @protobuf.Field.d(8, "int64", "optional", 0)
    public handCnt?: number|null = 0
    @protobuf.Field.d(9, "bool", "optional", false)
    public isHighlight?: boolean|null = false
    @protobuf.Field.d(10, "int64", "optional", 0)
    public entrustCnt?: number|null = 0
    @protobuf.Field.d(11, "int64", "optional", 0)
    public entrustedCnt?: number|null = 0
    @protobuf.Field.d(12, "int64", "optional", 0)
    public endEntrustStatus?: number|null = 0
    @protobuf.Field.d(13, "int64", "optional", 0)
    public allStepCost?: number|null = 0
    @protobuf.MapField.d(14, "string", "string")
    public metas?: { [k: string]: string|null } = {}
}
export interface IGameResult {
    tableKey?: string|null
    items?: IGameResultItem[]
    tableGameData?: Uint8Array
}
@protobuf.Type.d("tss_match_v2_common_GameResult")
export class GameResult extends protobuf.Message<IGameResult> {
    constructor(properties: Properties<IGameResult>) {
        super(properties);
        if (properties) {
            if (properties.tableKey) { this.tableKey = properties.tableKey }
            if (properties.items) { this.items = []; properties.items.forEach((value, index)=>{this.items[index] = GameResultItem.create(properties.items[index]) as any})}
            if (properties.tableGameData) { this.tableGameData = properties.tableGameData }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public tableKey?: string|null = ""
    @protobuf.Field.d(4, "tss_match_v2_common_GameResultItem", "repeated")
    public items?: GameResultItem[] = []
    @protobuf.Field.d(5, "bytes", "optional", [])
    public tableGameData?: Uint8Array
}
export interface IHandleGameResultReq {
    gameResult?: IGameResult
    releaseDelay?: number|null
}
@protobuf.Type.d("tss_match_v2_common_HandleGameResultReq")
export class HandleGameResultReq extends protobuf.Message<IHandleGameResultReq> {
    constructor(properties: Properties<IHandleGameResultReq>) {
        super(properties);
        if (properties) {
            if (properties.gameResult) { this.gameResult = GameResult.create(properties.gameResult) as any }
            if (properties.releaseDelay) { this.releaseDelay = properties.releaseDelay }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_common_GameResult", "optional")
    public gameResult?: GameResult|null
    @protobuf.Field.d(2, "int64", "optional", 0)
    public releaseDelay?: number|null = 0
}
export interface IGameEnd {
    tableKey?: string|null
}
@protobuf.Type.d("tss_match_v2_common_GameEnd")
export class GameEnd extends protobuf.Message<IGameEnd> {
    constructor(properties: Properties<IGameEnd>) {
        super(properties);
        if (properties) {
            if (properties.tableKey) { this.tableKey = properties.tableKey }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public tableKey?: string|null = ""
}
export interface IHandleGameEndReq {
    gameEnd?: IGameEnd
}
@protobuf.Type.d("tss_match_v2_common_HandleGameEndReq")
export class HandleGameEndReq extends protobuf.Message<IHandleGameEndReq> {
    constructor(properties: Properties<IHandleGameEndReq>) {
        super(properties);
        if (properties) {
            if (properties.gameEnd) { this.gameEnd = GameEnd.create(properties.gameEnd) as any }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_common_GameEnd", "optional")
    public gameEnd?: GameEnd|null
}
export interface IPreMatchConfig {
    liveRoom?: ILiveRoomConfig
    spec?: ISpecConfig
    creator?: number|null
    operator?: string|null
    updateAt?: number|null
    schedulerID?: number|null
    keepDuration?: number|null
    showSeq?: number|null
}
@protobuf.Type.d("tss_match_v2_common_PreMatchConfig")
export class PreMatchConfig extends protobuf.Message<IPreMatchConfig> {
    constructor(properties: Properties<IPreMatchConfig>) {
        super(properties);
        if (properties) {
            if (properties.liveRoom) { this.liveRoom = LiveRoomConfig.create(properties.liveRoom) as any }
            if (properties.spec) { this.spec = SpecConfig.create(properties.spec) as any }
            if (properties.creator) { this.creator = properties.creator }
            if (properties.operator) { this.operator = properties.operator }
            if (properties.updateAt) { this.updateAt = properties.updateAt }
            if (properties.schedulerID) { this.schedulerID = properties.schedulerID }
            if (properties.keepDuration) { this.keepDuration = properties.keepDuration }
            if (properties.showSeq) { this.showSeq = properties.showSeq }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_common_LiveRoomConfig", "optional")
    public liveRoom?: LiveRoomConfig|null
    @protobuf.Field.d(2, "tss_match_v2_common_SpecConfig", "optional")
    public spec?: SpecConfig|null
    @protobuf.Field.d(3, "int64", "optional", 0)
    public creator?: number|null = 0
    @protobuf.Field.d(4, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(5, "int64", "optional", 0)
    public updateAt?: number|null = 0
    @protobuf.Field.d(6, "int64", "optional", 0)
    public schedulerID?: number|null = 0
    @protobuf.Field.d(7, "int64", "optional", 0)
    public keepDuration?: number|null = 0
    @protobuf.Field.d(8, "int64", "optional", 0)
    public showSeq?: number|null = 0
}
export interface ISchedulerConf {
    startTime?: string|null
    createTime?: string|null
    dateSection?: IDateSection
    dailySection?: IDailySection
    preMatch?: IPreMatchConfig
    schedulerType?: SchedulerType|null
    cycleMode?: CycleMode|null
    roomCycleDelay?: number|null
    createTimeDate?: string|null
    periodType?: PeriodType|null
}
@protobuf.Type.d("tss_match_v2_common_SchedulerConf")
export class SchedulerConf extends protobuf.Message<ISchedulerConf> {
    constructor(properties: Properties<ISchedulerConf>) {
        super(properties);
        if (properties) {
            if (properties.startTime) { this.startTime = properties.startTime }
            if (properties.createTime) { this.createTime = properties.createTime }
            if (properties.dateSection) { this.dateSection = DateSection.create(properties.dateSection) as any }
            if (properties.dailySection) { this.dailySection = DailySection.create(properties.dailySection) as any }
            if (properties.preMatch) { this.preMatch = PreMatchConfig.create(properties.preMatch) as any }
            if (properties.schedulerType) { this.schedulerType = properties.schedulerType }
            if (properties.cycleMode) { this.cycleMode = properties.cycleMode }
            if (properties.roomCycleDelay) { this.roomCycleDelay = properties.roomCycleDelay }
            if (properties.createTimeDate) { this.createTimeDate = properties.createTimeDate }
            if (properties.periodType) { this.periodType = properties.periodType }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public startTime?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public createTime?: string|null = ""
    @protobuf.Field.d(3, "tss_match_v2_common_DateSection", "optional")
    public dateSection?: DateSection|null
    @protobuf.Field.d(4, "tss_match_v2_common_DailySection", "optional")
    public dailySection?: DailySection|null
    @protobuf.Field.d(5, "tss_match_v2_common_PreMatchConfig", "optional")
    public preMatch?: PreMatchConfig|null
    @protobuf.Field.d(6, SchedulerType, "optional", SchedulerType.SchedulerTypeUnknown)
    public schedulerType?: SchedulerType|null = SchedulerType.SchedulerTypeUnknown
    @protobuf.Field.d(7, CycleMode, "optional", CycleMode.CycleModeUnknown)
    public cycleMode?: CycleMode|null = CycleMode.CycleModeUnknown
    @protobuf.Field.d(8, "int64", "optional", 0)
    public roomCycleDelay?: number|null = 0
    @protobuf.Field.d(9, "string", "optional", )
    public createTimeDate?: string|null = ""
    @protobuf.Field.d(10, PeriodType, "optional", PeriodType.PeriodTypeUnknown)
    public periodType?: PeriodType|null = PeriodType.PeriodTypeUnknown
}
export interface IDefaultScheduler {
    minPlayerNum?: number|null
    maxPlayerNum?: number|null
    id?: number|null
    isOpen?: boolean|null
}
@protobuf.Type.d("tss_match_v2_common_DefaultScheduler")
export class DefaultScheduler extends protobuf.Message<IDefaultScheduler> {
    constructor(properties: Properties<IDefaultScheduler>) {
        super(properties);
        if (properties) {
            if (properties.minPlayerNum) { this.minPlayerNum = properties.minPlayerNum }
            if (properties.maxPlayerNum) { this.maxPlayerNum = properties.maxPlayerNum }
            if (properties.id) { this.id = properties.id }
            if (properties.isOpen) { this.isOpen = properties.isOpen }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public minPlayerNum?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public maxPlayerNum?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public id?: number|null = 0
    @protobuf.Field.d(4, "bool", "optional", false)
    public isOpen?: boolean|null = false
}
export interface IDefaultEntry {
    assetType?: tss_common_AssetType|null
    num?: number[]
    isOpen?: boolean|null
}
@protobuf.Type.d("tss_match_v2_common_DefaultEntry")
export class DefaultEntry extends protobuf.Message<IDefaultEntry> {
    constructor(properties: Properties<IDefaultEntry>) {
        super(properties);
        if (properties) {
            if (properties.assetType) { this.assetType = properties.assetType }
            if (properties.num) { this.num = []; properties.num.forEach((value, index)=>{this.num[index] = properties.num[index]})}
            if (properties.isOpen) { this.isOpen = properties.isOpen }
        }
	}
    @protobuf.Field.d(1, tss_common_AssetType, "optional", tss_common_AssetType.AssetTypeUnknown)
    public assetType?: tss_common_AssetType|null = tss_common_AssetType.AssetTypeUnknown
    @protobuf.Field.d(2, "int64", "repeated", [])
    public num?: number[] = []
    @protobuf.Field.d(3, "bool", "optional", false)
    public isOpen?: boolean|null = false
}
export interface IDefaultPrize {
    minPlayerNum?: number|null
    maxPlayerNum?: number|null
    rankPrizes?: IRankPrize[]
    rankPrizeRates?: IRankPrizeRate[]
    isOpen?: boolean|null
}
@protobuf.Type.d("tss_match_v2_common_DefaultPrize")
export class DefaultPrize extends protobuf.Message<IDefaultPrize> {
    constructor(properties: Properties<IDefaultPrize>) {
        super(properties);
        if (properties) {
            if (properties.minPlayerNum) { this.minPlayerNum = properties.minPlayerNum }
            if (properties.maxPlayerNum) { this.maxPlayerNum = properties.maxPlayerNum }
            if (properties.rankPrizes) { this.rankPrizes = []; properties.rankPrizes.forEach((value, index)=>{this.rankPrizes[index] = RankPrize.create(properties.rankPrizes[index]) as any})}
            if (properties.rankPrizeRates) { this.rankPrizeRates = []; properties.rankPrizeRates.forEach((value, index)=>{this.rankPrizeRates[index] = RankPrizeRate.create(properties.rankPrizeRates[index]) as any})}
            if (properties.isOpen) { this.isOpen = properties.isOpen }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public minPlayerNum?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public maxPlayerNum?: number|null = 0
    @protobuf.Field.d(3, "tss_match_v2_common_RankPrize", "repeated")
    public rankPrizes?: RankPrize[] = []
    @protobuf.Field.d(4, "tss_match_v2_common_RankPrizeRate", "repeated")
    public rankPrizeRates?: RankPrizeRate[] = []
    @protobuf.Field.d(5, "bool", "optional", false)
    public isOpen?: boolean|null = false
}
export interface IDefaultPool {
    assetType?: tss_common_AssetType|null
    num?: number[]
    isOpen?: boolean|null
}
@protobuf.Type.d("tss_match_v2_common_DefaultPool")
export class DefaultPool extends protobuf.Message<IDefaultPool> {
    constructor(properties: Properties<IDefaultPool>) {
        super(properties);
        if (properties) {
            if (properties.assetType) { this.assetType = properties.assetType }
            if (properties.num) { this.num = []; properties.num.forEach((value, index)=>{this.num[index] = properties.num[index]})}
            if (properties.isOpen) { this.isOpen = properties.isOpen }
        }
	}
    @protobuf.Field.d(1, tss_common_AssetType, "optional", tss_common_AssetType.AssetTypeUnknown)
    public assetType?: tss_common_AssetType|null = tss_common_AssetType.AssetTypeUnknown
    @protobuf.Field.d(2, "int64", "repeated", [])
    public num?: number[] = []
    @protobuf.Field.d(3, "bool", "optional", false)
    public isOpen?: boolean|null = false
}
export interface ISelfBuildPrize {
    prizeType?: PrizeType|null
    isInc?: boolean|null
    mode?: DynamicPoolIncMode|null
    incValue?: number|null
    defaultPools?: IDefaultPool[]
    defaultPrizes?: IDefaultPrize[]
}
@protobuf.Type.d("tss_match_v2_common_SelfBuildPrize")
export class SelfBuildPrize extends protobuf.Message<ISelfBuildPrize> {
    constructor(properties: Properties<ISelfBuildPrize>) {
        super(properties);
        if (properties) {
            if (properties.prizeType) { this.prizeType = properties.prizeType }
            if (properties.isInc) { this.isInc = properties.isInc }
            if (properties.mode) { this.mode = properties.mode }
            if (properties.incValue) { this.incValue = properties.incValue }
            if (properties.defaultPools) { this.defaultPools = []; properties.defaultPools.forEach((value, index)=>{this.defaultPools[index] = DefaultPool.create(properties.defaultPools[index]) as any})}
            if (properties.defaultPrizes) { this.defaultPrizes = []; properties.defaultPrizes.forEach((value, index)=>{this.defaultPrizes[index] = DefaultPrize.create(properties.defaultPrizes[index]) as any})}
        }
	}
    @protobuf.Field.d(1, PrizeType, "optional", PrizeType.PrizeTypeUnknown)
    public prizeType?: PrizeType|null = PrizeType.PrizeTypeUnknown
    @protobuf.Field.d(2, "bool", "optional", false)
    public isInc?: boolean|null = false
    @protobuf.Field.d(3, DynamicPoolIncMode, "optional", DynamicPoolIncMode.DynamicPoolIncModeUnknow)
    public mode?: DynamicPoolIncMode|null = DynamicPoolIncMode.DynamicPoolIncModeUnknow
    @protobuf.Field.d(4, "int64", "optional", 0)
    public incValue?: number|null = 0
    @protobuf.Field.d(5, "tss_match_v2_common_DefaultPool", "repeated")
    public defaultPools?: DefaultPool[] = []
    @protobuf.Field.d(6, "tss_match_v2_common_DefaultPrize", "repeated")
    public defaultPrizes?: DefaultPrize[] = []
}
export interface ISelfBuildMatchConfig {
    isBelongCreator?: boolean|null
    payAssetType?: tss_common_AssetType|null
    gameID?: string|null
    matchType?: MatchType|null
    defaultSchedulers?: IDefaultScheduler[]
    defaultEntrys?: IDefaultEntry[]
    prize?: ISelfBuildPrize
    isDynamicPay?: boolean|null
    pondRatioEntry?: number[]
}
@protobuf.Type.d("tss_match_v2_common_SelfBuildMatchConfig")
export class SelfBuildMatchConfig extends protobuf.Message<ISelfBuildMatchConfig> {
    constructor(properties: Properties<ISelfBuildMatchConfig>) {
        super(properties);
        if (properties) {
            if (properties.isBelongCreator) { this.isBelongCreator = properties.isBelongCreator }
            if (properties.payAssetType) { this.payAssetType = properties.payAssetType }
            if (properties.gameID) { this.gameID = properties.gameID }
            if (properties.matchType) { this.matchType = properties.matchType }
            if (properties.defaultSchedulers) { this.defaultSchedulers = []; properties.defaultSchedulers.forEach((value, index)=>{this.defaultSchedulers[index] = DefaultScheduler.create(properties.defaultSchedulers[index]) as any})}
            if (properties.defaultEntrys) { this.defaultEntrys = []; properties.defaultEntrys.forEach((value, index)=>{this.defaultEntrys[index] = DefaultEntry.create(properties.defaultEntrys[index]) as any})}
            if (properties.prize) { this.prize = SelfBuildPrize.create(properties.prize) as any }
            if (properties.isDynamicPay) { this.isDynamicPay = properties.isDynamicPay }
            if (properties.pondRatioEntry) { this.pondRatioEntry = []; properties.pondRatioEntry.forEach((value, index)=>{this.pondRatioEntry[index] = properties.pondRatioEntry[index]})}
        }
	}
    @protobuf.Field.d(1, "bool", "optional", false)
    public isBelongCreator?: boolean|null = false
    @protobuf.Field.d(2, tss_common_AssetType, "optional", tss_common_AssetType.AssetTypeUnknown)
    public payAssetType?: tss_common_AssetType|null = tss_common_AssetType.AssetTypeUnknown
    @protobuf.Field.d(3, "string", "optional", )
    public gameID?: string|null = ""
    @protobuf.Field.d(4, MatchType, "optional", MatchType.MatchTypeUnknown)
    public matchType?: MatchType|null = MatchType.MatchTypeUnknown
    @protobuf.Field.d(5, "tss_match_v2_common_DefaultScheduler", "repeated")
    public defaultSchedulers?: DefaultScheduler[] = []
    @protobuf.Field.d(6, "tss_match_v2_common_DefaultEntry", "repeated")
    public defaultEntrys?: DefaultEntry[] = []
    @protobuf.Field.d(7, "tss_match_v2_common_SelfBuildPrize", "optional")
    public prize?: SelfBuildPrize|null
    @protobuf.Field.d(8, "bool", "optional", false)
    public isDynamicPay?: boolean|null = false
    @protobuf.Field.d(9, "int64", "repeated", [])
    public pondRatioEntry?: number[] = []
}
export interface IScheduler {
    ID?: number|null
    config?: ISchedulerConf
    LastMatchTime?: string|null
    CreatedAt?: number|null
    UpdatedAt?: number|null
    state?: SchedulerState|null
    NextMatchStartAt?: number|null
}
@protobuf.Type.d("tss_match_v2_common_Scheduler")
export class Scheduler extends protobuf.Message<IScheduler> {
    constructor(properties: Properties<IScheduler>) {
        super(properties);
        if (properties) {
            if (properties.ID) { this.ID = properties.ID }
            if (properties.config) { this.config = SchedulerConf.create(properties.config) as any }
            if (properties.LastMatchTime) { this.LastMatchTime = properties.LastMatchTime }
            if (properties.CreatedAt) { this.CreatedAt = properties.CreatedAt }
            if (properties.UpdatedAt) { this.UpdatedAt = properties.UpdatedAt }
            if (properties.state) { this.state = properties.state }
            if (properties.NextMatchStartAt) { this.NextMatchStartAt = properties.NextMatchStartAt }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public ID?: number|null = 0
    @protobuf.Field.d(2, "tss_match_v2_common_SchedulerConf", "optional")
    public config?: SchedulerConf|null
    @protobuf.Field.d(3, "string", "optional", )
    public LastMatchTime?: string|null = ""
    @protobuf.Field.d(4, "int64", "optional", 0)
    public CreatedAt?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public UpdatedAt?: number|null = 0
    @protobuf.Field.d(6, SchedulerState, "optional", SchedulerState.SchedulerStateUnknown)
    public state?: SchedulerState|null = SchedulerState.SchedulerStateUnknown
    @protobuf.Field.d(7, "int64", "optional", 0)
    public NextMatchStartAt?: number|null = 0
}
export interface IMsgReleaseRobot {
    matchKey?: string|null
}
@protobuf.Type.d("tss_match_v2_common_MsgReleaseRobot")
export class MsgReleaseRobot extends protobuf.Message<IMsgReleaseRobot> {
    constructor(properties: Properties<IMsgReleaseRobot>) {
        super(properties);
        if (properties) {
            if (properties.matchKey) { this.matchKey = properties.matchKey }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public matchKey?: string|null = ""
}
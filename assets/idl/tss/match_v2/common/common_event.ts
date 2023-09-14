import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  AssetType as tss_common_AssetType ,  } from "idl/tss/common/common_define"
import {  SubMatchType as tss_match_v2_commonmatesession_SubMatchType ,  MateMode as tss_match_v2_commonmatesession_MateMode ,  } from "idl/tss/match_v2/common/common_matesession"
import {  SubMatchType as tss_match_v2_mate_SubMatchType ,  } from "idl/tss/match_v2/common_matematch"
export enum EventType {  
    UnknownEventType = 0,  
    CreatePreMatchEventType = 1,  
    UpdatePreMatchEventType = 2,  
    PreMatchOverEventType = 3,  
    UserJoinEventType = 4,  
    UserLeaveEventType = 5,  
    UserSignUpEventType = 6,  
    UserCancelSignUpEventType = 7,  
    CreateMatchEventType = 8,  
    MatchOverEventType = 9,  
    UpsertWhitelistEventType = 10,  
    DeleteWhitelistEventType = 11,  
    StageEndEventType = 12,  
    TablesEndEventType = 13,  
    UserOutEventType = 14,  
    UserRevivalEventType = 15,  
    CreateListConfigEventType = 16,  
    CreateMatchTabEventType = 17,  
    DeleteMatchTabEventType = 18,  
    ObserverSnapshotEventType = 19,  
    ChatRoomClosedEventType = 20,  
    SyncFastMatchCfgEventType = 21,  
    UserJoinObserverEventType = 22,  
    UpdateMatchHotLevelEventType = 23,  
    CreateSkipTabRuleEventType = 24,  
    SortTabListEventType = 25,  
    UserMatchProcessEventType = 26,  
    UpdateUserPortraitForBeginnerEventType = 27,  
    UpdateProtectConfigForBeginnerEventType = 28,  
    CompensateUserFeeEventType = 29,  
    UserPassBreakthroughEventType = 30,  
    BreakthroughTableEndEventType = 31,  
    BreakthroughStartEventType = 32,  
    BreakthroughSaveEventType = 33,  
    BreakthroughContinueEventType = 34,  
    BreakthroughRoundEventType = 35,  
    BreakthroughUserRecycleEventType = 36,  
    MatchingSettleEventType = 37,  
    UserPunishedEventType = 38,  
    UserNumInMatchEventType = 39,  
    WinningStreakEventType = 40,  
    UserUsedVIPPrivilegeEventType = 41,  
    BettingMatchStartEventType = 42,  
    BettingMatchUserAnteEventType = 43,  
    BettingMatchRecycleMungEventType = 44,  
    UserRewardEventType = 45,  
    FinalRankEventType = 46,  
    SortMatchEventType = 47,  
    BreakthroughSucceedEventType = 48,  
    TableChangeEventType = 49,  
    ClearInvalidMatchEventType = 50,  
    UserFastMatchDifficultyEventType = 51,  
    StandingMatchPassRoundEventType = 52,  
    UserTableEndEventType = 53,  
    RoundChangeEventType = 54,  
    UpdateSessionConfigEvent = 56,  
    DataLogEventType = 100,
}
export enum UserType {  
    UserType_Unknow = 0,  
    UserType_GreenHand = 1,  
    UserType_VIP = 2,
}
export enum TableChangeType {  
    TableChangeStart = 0,  
    TableChangeEnd = 15,
}
export interface IDataLogEvent {
    bdCode?: number|null
    data?: Uint8Array
    uid?: number|null
    gameID?: string|null
}
@protobuf.Type.d("tss_match_v2_commonevent_DataLogEvent")
export class DataLogEvent extends protobuf.Message<IDataLogEvent> {
    constructor(properties: Properties<IDataLogEvent>) {
        super(properties);
        if (properties) {
            if (properties.bdCode) { this.bdCode = properties.bdCode }
            if (properties.data) { this.data = properties.data }
            if (properties.uid) { this.uid = properties.uid }
            if (properties.gameID) { this.gameID = properties.gameID }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public bdCode?: number|null = 0
    @protobuf.Field.d(2, "bytes", "optional", [])
    public data?: Uint8Array
    @protobuf.Field.d(3, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(4, "string", "optional", )
    public gameID?: string|null = ""
}
export interface IUserRewardEvent {
    matchKey?: string|null
    matchType?: number|null
    preMatchKey?: string|null
    gameID?: string|null
    subMatchType?: number|null
    propName?: string|null
    propID?: number|null
    propNum?: number|null
    rank?: number|null
    uid?: number|null
    matchID?: string|null
    ruleID?: number|null
}
@protobuf.Type.d("tss_match_v2_commonevent_UserRewardEvent")
export class UserRewardEvent extends protobuf.Message<IUserRewardEvent> {
    constructor(properties: Properties<IUserRewardEvent>) {
        super(properties);
        if (properties) {
            if (properties.matchKey) { this.matchKey = properties.matchKey }
            if (properties.matchType) { this.matchType = properties.matchType }
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
            if (properties.gameID) { this.gameID = properties.gameID }
            if (properties.subMatchType) { this.subMatchType = properties.subMatchType }
            if (properties.propName) { this.propName = properties.propName }
            if (properties.propID) { this.propID = properties.propID }
            if (properties.propNum) { this.propNum = properties.propNum }
            if (properties.rank) { this.rank = properties.rank }
            if (properties.uid) { this.uid = properties.uid }
            if (properties.matchID) { this.matchID = properties.matchID }
            if (properties.ruleID) { this.ruleID = properties.ruleID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public matchKey?: string|null = ""
    @protobuf.Field.d(2, "int32", "optional", 0)
    public matchType?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public preMatchKey?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public gameID?: string|null = ""
    @protobuf.Field.d(5, "int32", "optional", 0)
    public subMatchType?: number|null = 0
    @protobuf.Field.d(6, "string", "optional", )
    public propName?: string|null = ""
    @protobuf.Field.d(7, "int32", "optional", 0)
    public propID?: number|null = 0
    @protobuf.Field.d(8, "int32", "optional", 0)
    public propNum?: number|null = 0
    @protobuf.Field.d(9, "int32", "optional", 0)
    public rank?: number|null = 0
    @protobuf.Field.d(10, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(11, "string", "optional", )
    public matchID?: string|null = ""
    @protobuf.Field.d(12, "int64", "optional", 0)
    public ruleID?: number|null = 0
}
export interface IRewardProp {
    id?: number|null
    num?: number|null
    name?: string|null
    img?: string|null
    expireTime?: number|null
    rewardMode?: number|null
    mungNum?: number|null
    icon?: string|null
    type?: number|null
    desc?: string|null
    isGivenVIP?: boolean|null
    mungNumAfterMarkup?: number|null
}
@protobuf.Type.d("tss_match_v2_commonevent_RewardProp")
export class RewardProp extends protobuf.Message<IRewardProp> {
    constructor(properties: Properties<IRewardProp>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.num) { this.num = properties.num }
            if (properties.name) { this.name = properties.name }
            if (properties.img) { this.img = properties.img }
            if (properties.expireTime) { this.expireTime = properties.expireTime }
            if (properties.rewardMode) { this.rewardMode = properties.rewardMode }
            if (properties.mungNum) { this.mungNum = properties.mungNum }
            if (properties.icon) { this.icon = properties.icon }
            if (properties.type) { this.type = properties.type }
            if (properties.desc) { this.desc = properties.desc }
            if (properties.isGivenVIP) { this.isGivenVIP = properties.isGivenVIP }
            if (properties.mungNumAfterMarkup) { this.mungNumAfterMarkup = properties.mungNumAfterMarkup }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public id?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public num?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public img?: string|null = ""
    @protobuf.Field.d(5, "int64", "optional", 0)
    public expireTime?: number|null = 0
    @protobuf.Field.d(6, "int32", "optional", 0)
    public rewardMode?: number|null = 0
    @protobuf.Field.d(7, "int32", "optional", 0)
    public mungNum?: number|null = 0
    @protobuf.Field.d(8, "string", "optional", )
    public icon?: string|null = ""
    @protobuf.Field.d(9, "int32", "optional", 0)
    public type?: number|null = 0
    @protobuf.Field.d(10, "string", "optional", )
    public desc?: string|null = ""
    @protobuf.Field.d(11, "bool", "optional", false)
    public isGivenVIP?: boolean|null = false
    @protobuf.Field.d(12, "int32", "optional", 0)
    public mungNumAfterMarkup?: number|null = 0
}
export interface IUserNumInMatchEvent {
    matchType?: number|null
    totalUserNum?: number|null
    playingUserNum?: number|null
    gameID?: string|null
}
@protobuf.Type.d("tss_match_v2_commonevent_UserNumInMatchEvent")
export class UserNumInMatchEvent extends protobuf.Message<IUserNumInMatchEvent> {
    constructor(properties: Properties<IUserNumInMatchEvent>) {
        super(properties);
        if (properties) {
            if (properties.matchType) { this.matchType = properties.matchType }
            if (properties.totalUserNum) { this.totalUserNum = properties.totalUserNum }
            if (properties.playingUserNum) { this.playingUserNum = properties.playingUserNum }
            if (properties.gameID) { this.gameID = properties.gameID }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public matchType?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public totalUserNum?: number|null = 0
    @protobuf.Field.d(3, "int32", "optional", 0)
    public playingUserNum?: number|null = 0
    @protobuf.Field.d(4, "string", "optional", )
    public gameID?: string|null = ""
}
export interface IPlayerInfo {
    uid?: number|null
    winningResult?: number|null
    changeScore?: number|null
    gameTag?: string[]
    displayUid?: number|null
    changeCup?: number|null
    totalCup?: number|null
    titleName?: string|null
    titleLevel?: number|null
    titleIcon?: string|null
}
@protobuf.Type.d("tss_match_v2_commonevent_PlayerInfo")
export class PlayerInfo extends protobuf.Message<IPlayerInfo> {
    constructor(properties: Properties<IPlayerInfo>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.winningResult) { this.winningResult = properties.winningResult }
            if (properties.changeScore) { this.changeScore = properties.changeScore }
            if (properties.gameTag) { this.gameTag = []; properties.gameTag.forEach((value, index)=>{this.gameTag[index] = properties.gameTag[index]})}
            if (properties.displayUid) { this.displayUid = properties.displayUid }
            if (properties.changeCup) { this.changeCup = properties.changeCup }
            if (properties.totalCup) { this.totalCup = properties.totalCup }
            if (properties.titleName) { this.titleName = properties.titleName }
            if (properties.titleLevel) { this.titleLevel = properties.titleLevel }
            if (properties.titleIcon) { this.titleIcon = properties.titleIcon }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public winningResult?: number|null = 0
    @protobuf.Field.d(3, "int32", "optional", 0)
    public changeScore?: number|null = 0
    @protobuf.Field.d(4, "string", "repeated", [])
    public gameTag?: string[] = []
    @protobuf.Field.d(5, "int64", "optional", 0)
    public displayUid?: number|null = 0
    @protobuf.Field.d(6, "int32", "optional", 0)
    public changeCup?: number|null = 0
    @protobuf.Field.d(7, "int32", "optional", 0)
    public totalCup?: number|null = 0
    @protobuf.Field.d(8, "string", "optional", )
    public titleName?: string|null = ""
    @protobuf.Field.d(9, "int32", "optional", 0)
    public titleLevel?: number|null = 0
    @protobuf.Field.d(10, "string", "optional", )
    public titleIcon?: string|null = ""
}
export interface IUserRevivalEvent {
    uid?: number|null
    gameID?: string|null
    time?: number|null
    type?: number|null
    propID?: number|null
    propNum?: number|null
    score?: number|null
    matchKey?: string|null
    preMatchKey?: string|null
    matchType?: number|null
    subMatchType?: number|null
    matchID?: number|null
    matchConfigTags?: string[]
    curRound?: number|null
    ruleID?: number|null
}
@protobuf.Type.d("tss_match_v2_commonevent_UserRevivalEvent")
export class UserRevivalEvent extends protobuf.Message<IUserRevivalEvent> {
    constructor(properties: Properties<IUserRevivalEvent>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.gameID) { this.gameID = properties.gameID }
            if (properties.time) { this.time = properties.time }
            if (properties.type) { this.type = properties.type }
            if (properties.propID) { this.propID = properties.propID }
            if (properties.propNum) { this.propNum = properties.propNum }
            if (properties.score) { this.score = properties.score }
            if (properties.matchKey) { this.matchKey = properties.matchKey }
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
            if (properties.matchType) { this.matchType = properties.matchType }
            if (properties.subMatchType) { this.subMatchType = properties.subMatchType }
            if (properties.matchID) { this.matchID = properties.matchID }
            if (properties.matchConfigTags) { this.matchConfigTags = []; properties.matchConfigTags.forEach((value, index)=>{this.matchConfigTags[index] = properties.matchConfigTags[index]})}
            if (properties.curRound) { this.curRound = properties.curRound }
            if (properties.ruleID) { this.ruleID = properties.ruleID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public gameID?: string|null = ""
    @protobuf.Field.d(3, "int64", "optional", 0)
    public time?: number|null = 0
    @protobuf.Field.d(4, "int32", "optional", 0)
    public type?: number|null = 0
    @protobuf.Field.d(5, "int32", "optional", 0)
    public propID?: number|null = 0
    @protobuf.Field.d(6, "int32", "optional", 0)
    public propNum?: number|null = 0
    @protobuf.Field.d(7, "int32", "optional", 0)
    public score?: number|null = 0
    @protobuf.Field.d(8, "string", "optional", )
    public matchKey?: string|null = ""
    @protobuf.Field.d(9, "string", "optional", )
    public preMatchKey?: string|null = ""
    @protobuf.Field.d(10, "int32", "optional", 0)
    public matchType?: number|null = 0
    @protobuf.Field.d(11, "int32", "optional", 0)
    public subMatchType?: number|null = 0
    @protobuf.Field.d(12, "int64", "optional", 0)
    public matchID?: number|null = 0
    @protobuf.Field.d(13, "string", "repeated", [])
    public matchConfigTags?: string[] = []
    @protobuf.Field.d(14, "int32", "optional", 0)
    public curRound?: number|null = 0
    @protobuf.Field.d(15, "int64", "optional", 0)
    public ruleID?: number|null = 0
}
export interface IBreakthrough {
    roundNum?: number|null
    successNum?: number|null
    isUnderway?: boolean|null
    isPass?: boolean|null
}
@protobuf.Type.d("tss_match_v2_commonevent_Breakthrough")
export class Breakthrough extends protobuf.Message<IBreakthrough> {
    constructor(properties: Properties<IBreakthrough>) {
        super(properties);
        if (properties) {
            if (properties.roundNum) { this.roundNum = properties.roundNum }
            if (properties.successNum) { this.successNum = properties.successNum }
            if (properties.isUnderway) { this.isUnderway = properties.isUnderway }
            if (properties.isPass) { this.isPass = properties.isPass }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public roundNum?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public successNum?: number|null = 0
    @protobuf.Field.d(3, "bool", "optional", false)
    public isUnderway?: boolean|null = false
    @protobuf.Field.d(4, "bool", "optional", false)
    public isPass?: boolean|null = false
}
export interface IReward {
    name?: string|null
    IconURL?: string|null
    props?: IRewardProp[]
}
@protobuf.Type.d("tss_match_v2_commonevent_Reward")
export class Reward extends protobuf.Message<IReward> {
    constructor(properties: Properties<IReward>) {
        super(properties);
        if (properties) {
            if (properties.name) { this.name = properties.name }
            if (properties.IconURL) { this.IconURL = properties.IconURL }
            if (properties.props) { this.props = []; properties.props.forEach((value, index)=>{this.props[index] = RewardProp.create(properties.props[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public IconURL?: string|null = ""
    @protobuf.Field.d(3, "tss_match_v2_commonevent_RewardProp", "repeated")
    public props?: RewardProp[] = []
}
export interface IUserOutEvent {
    matchID?: string|null
    matchSystemID?: string|null
    matchKey?: string|null
    gameID?: string|null
    matchName?: string|null
    matchIcon?: string|null
    reward?: IReward
    rank?: number|null
    startTime?: number|null
    outTime?: number|null
    uID?: number|null
    preMatchKey?: string|null
    matchType?: number|null
    subMatchType?: number|null
    hasEnterLastRound?: boolean|null
    roundReward?: IReward
    totalNumber?: number|null
    matchConfigTags?: string[]
    breakthrough?: IBreakthrough
    miniDisplayURL?: string|null
    prizeMode?: number|null
    userType?: UserType|null
    ruleID?: number|null
    isLeave?: boolean|null
    difficulty?: number|null
}
@protobuf.Type.d("tss_match_v2_commonevent_UserOutEvent")
export class UserOutEvent extends protobuf.Message<IUserOutEvent> {
    constructor(properties: Properties<IUserOutEvent>) {
        super(properties);
        if (properties) {
            if (properties.matchID) { this.matchID = properties.matchID }
            if (properties.matchSystemID) { this.matchSystemID = properties.matchSystemID }
            if (properties.matchKey) { this.matchKey = properties.matchKey }
            if (properties.gameID) { this.gameID = properties.gameID }
            if (properties.matchName) { this.matchName = properties.matchName }
            if (properties.matchIcon) { this.matchIcon = properties.matchIcon }
            if (properties.reward) { this.reward = Reward.create(properties.reward) as any }
            if (properties.rank) { this.rank = properties.rank }
            if (properties.startTime) { this.startTime = properties.startTime }
            if (properties.outTime) { this.outTime = properties.outTime }
            if (properties.uID) { this.uID = properties.uID }
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
            if (properties.matchType) { this.matchType = properties.matchType }
            if (properties.subMatchType) { this.subMatchType = properties.subMatchType }
            if (properties.hasEnterLastRound) { this.hasEnterLastRound = properties.hasEnterLastRound }
            if (properties.roundReward) { this.roundReward = Reward.create(properties.roundReward) as any }
            if (properties.totalNumber) { this.totalNumber = properties.totalNumber }
            if (properties.matchConfigTags) { this.matchConfigTags = []; properties.matchConfigTags.forEach((value, index)=>{this.matchConfigTags[index] = properties.matchConfigTags[index]})}
            if (properties.breakthrough) { this.breakthrough = Breakthrough.create(properties.breakthrough) as any }
            if (properties.miniDisplayURL) { this.miniDisplayURL = properties.miniDisplayURL }
            if (properties.prizeMode) { this.prizeMode = properties.prizeMode }
            if (properties.userType) { this.userType = properties.userType }
            if (properties.ruleID) { this.ruleID = properties.ruleID }
            if (properties.isLeave) { this.isLeave = properties.isLeave }
            if (properties.difficulty) { this.difficulty = properties.difficulty }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public matchID?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public matchSystemID?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public matchKey?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public gameID?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public matchName?: string|null = ""
    @protobuf.Field.d(6, "string", "optional", )
    public matchIcon?: string|null = ""
    @protobuf.Field.d(7, "tss_match_v2_commonevent_Reward", "optional")
    public reward?: Reward|null
    @protobuf.Field.d(8, "int32", "optional", 0)
    public rank?: number|null = 0
    @protobuf.Field.d(9, "int64", "optional", 0)
    public startTime?: number|null = 0
    @protobuf.Field.d(10, "int64", "optional", 0)
    public outTime?: number|null = 0
    @protobuf.Field.d(11, "int64", "optional", 0)
    public uID?: number|null = 0
    @protobuf.Field.d(12, "string", "optional", )
    public preMatchKey?: string|null = ""
    @protobuf.Field.d(13, "int32", "optional", 0)
    public matchType?: number|null = 0
    @protobuf.Field.d(14, "int32", "optional", 0)
    public subMatchType?: number|null = 0
    @protobuf.Field.d(15, "bool", "optional", false)
    public hasEnterLastRound?: boolean|null = false
    @protobuf.Field.d(16, "tss_match_v2_commonevent_Reward", "optional")
    public roundReward?: Reward|null
    @protobuf.Field.d(17, "int32", "optional", 0)
    public totalNumber?: number|null = 0
    @protobuf.Field.d(18, "string", "repeated", [])
    public matchConfigTags?: string[] = []
    @protobuf.Field.d(19, "tss_match_v2_commonevent_Breakthrough", "optional")
    public breakthrough?: Breakthrough|null
    @protobuf.Field.d(20, "string", "optional", )
    public miniDisplayURL?: string|null = ""
    @protobuf.Field.d(21, "int32", "optional", 0)
    public prizeMode?: number|null = 0
    @protobuf.Field.d(22, UserType, "optional", UserType.UserType_Unknow)
    public userType?: UserType|null = UserType.UserType_Unknow
    @protobuf.Field.d(23, "int64", "optional", 0)
    public ruleID?: number|null = 0
    @protobuf.Field.d(24, "bool", "optional", false)
    public isLeave?: boolean|null = false
    @protobuf.Field.d(25, "double", "optional", 0)
    public difficulty?: number|null = 0
}
export interface IwinningStreakEvent {
    matchType?: number|null
    winNum?: number|null
    winSeq?: number|null
    gameID?: string|null
    prop?: IRewardProp
    uid?: number|null
    matchKey?: string|null
}
@protobuf.Type.d("tss_match_v2_commonevent_winningStreakEvent")
export class winningStreakEvent extends protobuf.Message<IwinningStreakEvent> {
    constructor(properties: Properties<IwinningStreakEvent>) {
        super(properties);
        if (properties) {
            if (properties.matchType) { this.matchType = properties.matchType }
            if (properties.winNum) { this.winNum = properties.winNum }
            if (properties.winSeq) { this.winSeq = properties.winSeq }
            if (properties.gameID) { this.gameID = properties.gameID }
            if (properties.prop) { this.prop = RewardProp.create(properties.prop) as any }
            if (properties.uid) { this.uid = properties.uid }
            if (properties.matchKey) { this.matchKey = properties.matchKey }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public matchType?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public winNum?: number|null = 0
    @protobuf.Field.d(3, "int32", "optional", 0)
    public winSeq?: number|null = 0
    @protobuf.Field.d(4, "string", "optional", )
    public gameID?: string|null = ""
    @protobuf.Field.d(5, "tss_match_v2_commonevent_RewardProp", "optional")
    public prop?: RewardProp|null
    @protobuf.Field.d(6, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(7, "string", "optional", )
    public matchKey?: string|null = ""
}
export interface ITable {
    startTime?: number|null
    endTime?: number|null
    players?: IPlayerInfo[]
    key?: string|null
}
@protobuf.Type.d("tss_match_v2_commonevent_Table")
export class Table extends protobuf.Message<ITable> {
    constructor(properties: Properties<ITable>) {
        super(properties);
        if (properties) {
            if (properties.startTime) { this.startTime = properties.startTime }
            if (properties.endTime) { this.endTime = properties.endTime }
            if (properties.players) { this.players = []; properties.players.forEach((value, index)=>{this.players[index] = PlayerInfo.create(properties.players[index]) as any})}
            if (properties.key) { this.key = properties.key }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public startTime?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public endTime?: number|null = 0
    @protobuf.Field.d(3, "tss_match_v2_commonevent_PlayerInfo", "repeated")
    public players?: PlayerInfo[] = []
    @protobuf.Field.d(4, "string", "optional", )
    public key?: string|null = ""
}
export interface ITablesEndEvent {
    tablesKey?: string|null
    tables?: ITable[]
}
@protobuf.Type.d("tss_match_v2_commonevent_TablesEndEvent")
export class TablesEndEvent extends protobuf.Message<ITablesEndEvent> {
    constructor(properties: Properties<ITablesEndEvent>) {
        super(properties);
        if (properties) {
            if (properties.tablesKey) { this.tablesKey = properties.tablesKey }
            if (properties.tables) { this.tables = []; properties.tables.forEach((value, index)=>{this.tables[index] = Table.create(properties.tables[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public tablesKey?: string|null = ""
    @protobuf.Field.d(2, "tss_match_v2_commonevent_Table", "repeated")
    public tables?: Table[] = []
}
export interface IMatchingSettleEvent {
    matchKey?: string|null
    players?: IPlayerInfo[]
    gameID?: string|null
    settleAt?: number|null
}
@protobuf.Type.d("tss_match_v2_commonevent_MatchingSettleEvent")
export class MatchingSettleEvent extends protobuf.Message<IMatchingSettleEvent> {
    constructor(properties: Properties<IMatchingSettleEvent>) {
        super(properties);
        if (properties) {
            if (properties.matchKey) { this.matchKey = properties.matchKey }
            if (properties.players) { this.players = []; properties.players.forEach((value, index)=>{this.players[index] = PlayerInfo.create(properties.players[index]) as any})}
            if (properties.gameID) { this.gameID = properties.gameID }
            if (properties.settleAt) { this.settleAt = properties.settleAt }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public matchKey?: string|null = ""
    @protobuf.Field.d(2, "tss_match_v2_commonevent_PlayerInfo", "repeated")
    public players?: PlayerInfo[] = []
    @protobuf.Field.d(3, "string", "optional", )
    public gameID?: string|null = ""
    @protobuf.Field.d(4, "int64", "optional", 0)
    public settleAt?: number|null = 0
}
export interface ICreatePreMatchEvent {
    preMatchKey?: string|null
    preMatchData?: Uint8Array
    preMatchCfg?: Uint8Array
    preSeriesCfg?: Uint8Array
}
@protobuf.Type.d("tss_match_v2_commonevent_CreatePreMatchEvent")
export class CreatePreMatchEvent extends protobuf.Message<ICreatePreMatchEvent> {
    constructor(properties: Properties<ICreatePreMatchEvent>) {
        super(properties);
        if (properties) {
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
            if (properties.preMatchData) { this.preMatchData = properties.preMatchData }
            if (properties.preMatchCfg) { this.preMatchCfg = properties.preMatchCfg }
            if (properties.preSeriesCfg) { this.preSeriesCfg = properties.preSeriesCfg }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public preMatchKey?: string|null = ""
    @protobuf.Field.d(2, "bytes", "optional", [])
    public preMatchData?: Uint8Array
    @protobuf.Field.d(3, "bytes", "optional", [])
    public preMatchCfg?: Uint8Array
    @protobuf.Field.d(4, "bytes", "optional", [])
    public preSeriesCfg?: Uint8Array
}
export interface IUpdatePreMatchEvent {
    preMatchKey?: string|null
    preMatchData?: Uint8Array
    preMatchCfg?: Uint8Array
    preSeriesCfg?: Uint8Array
}
@protobuf.Type.d("tss_match_v2_commonevent_UpdatePreMatchEvent")
export class UpdatePreMatchEvent extends protobuf.Message<IUpdatePreMatchEvent> {
    constructor(properties: Properties<IUpdatePreMatchEvent>) {
        super(properties);
        if (properties) {
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
            if (properties.preMatchData) { this.preMatchData = properties.preMatchData }
            if (properties.preMatchCfg) { this.preMatchCfg = properties.preMatchCfg }
            if (properties.preSeriesCfg) { this.preSeriesCfg = properties.preSeriesCfg }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public preMatchKey?: string|null = ""
    @protobuf.Field.d(2, "bytes", "optional", [])
    public preMatchData?: Uint8Array
    @protobuf.Field.d(3, "bytes", "optional", [])
    public preMatchCfg?: Uint8Array
    @protobuf.Field.d(4, "bytes", "optional", [])
    public preSeriesCfg?: Uint8Array
}
export interface IPreMatchOverEvent {
    preMatchKey?: string|null
    isStartFailed?: boolean|null
    failedCode?: number|null
    signedUsers?: number[]
    joinedUsers?: number[]
    seriesKey?: string|null
    signedTimes?: number[]
    preMatchCfg?: Uint8Array
}
@protobuf.Type.d("tss_match_v2_commonevent_PreMatchOverEvent")
export class PreMatchOverEvent extends protobuf.Message<IPreMatchOverEvent> {
    constructor(properties: Properties<IPreMatchOverEvent>) {
        super(properties);
        if (properties) {
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
            if (properties.isStartFailed) { this.isStartFailed = properties.isStartFailed }
            if (properties.failedCode) { this.failedCode = properties.failedCode }
            if (properties.signedUsers) { this.signedUsers = []; properties.signedUsers.forEach((value, index)=>{this.signedUsers[index] = properties.signedUsers[index]})}
            if (properties.joinedUsers) { this.joinedUsers = []; properties.joinedUsers.forEach((value, index)=>{this.joinedUsers[index] = properties.joinedUsers[index]})}
            if (properties.seriesKey) { this.seriesKey = properties.seriesKey }
            if (properties.signedTimes) { this.signedTimes = []; properties.signedTimes.forEach((value, index)=>{this.signedTimes[index] = properties.signedTimes[index]})}
            if (properties.preMatchCfg) { this.preMatchCfg = properties.preMatchCfg }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public preMatchKey?: string|null = ""
    @protobuf.Field.d(2, "bool", "optional", false)
    public isStartFailed?: boolean|null = false
    @protobuf.Field.d(3, "int32", "optional", 0)
    public failedCode?: number|null = 0
    @protobuf.Field.d(4, "int64", "repeated", [])
    public signedUsers?: number[] = []
    @protobuf.Field.d(5, "int64", "repeated", [])
    public joinedUsers?: number[] = []
    @protobuf.Field.d(6, "string", "optional", )
    public seriesKey?: string|null = ""
    @protobuf.Field.d(7, "int64", "repeated", [])
    public signedTimes?: number[] = []
    @protobuf.Field.d(8, "bytes", "optional", [])
    public preMatchCfg?: Uint8Array
}
export interface IUserJoinEvent {
    uID?: number|null
    preMatchKey?: string|null
    subMatchType?: number|null
    matchConfigTags?: string[]
    ruleID?: number|null
    matchType?: number|null
    signedType?: number|null
    propID?: number|null
    propNum?: number|null
    matchKey?: string|null
    propName?: string|null
    gameID?: string|null
    matchID?: string|null
}
@protobuf.Type.d("tss_match_v2_commonevent_UserJoinEvent")
export class UserJoinEvent extends protobuf.Message<IUserJoinEvent> {
    constructor(properties: Properties<IUserJoinEvent>) {
        super(properties);
        if (properties) {
            if (properties.uID) { this.uID = properties.uID }
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
            if (properties.subMatchType) { this.subMatchType = properties.subMatchType }
            if (properties.matchConfigTags) { this.matchConfigTags = []; properties.matchConfigTags.forEach((value, index)=>{this.matchConfigTags[index] = properties.matchConfigTags[index]})}
            if (properties.ruleID) { this.ruleID = properties.ruleID }
            if (properties.matchType) { this.matchType = properties.matchType }
            if (properties.signedType) { this.signedType = properties.signedType }
            if (properties.propID) { this.propID = properties.propID }
            if (properties.propNum) { this.propNum = properties.propNum }
            if (properties.matchKey) { this.matchKey = properties.matchKey }
            if (properties.propName) { this.propName = properties.propName }
            if (properties.gameID) { this.gameID = properties.gameID }
            if (properties.matchID) { this.matchID = properties.matchID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uID?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public preMatchKey?: string|null = ""
    @protobuf.Field.d(3, "int32", "optional", 0)
    public subMatchType?: number|null = 0
    @protobuf.Field.d(4, "string", "repeated", [])
    public matchConfigTags?: string[] = []
    @protobuf.Field.d(5, "int64", "optional", 0)
    public ruleID?: number|null = 0
    @protobuf.Field.d(6, "int32", "optional", 0)
    public matchType?: number|null = 0
    @protobuf.Field.d(7, "int32", "optional", 0)
    public signedType?: number|null = 0
    @protobuf.Field.d(8, "int32", "optional", 0)
    public propID?: number|null = 0
    @protobuf.Field.d(9, "int32", "optional", 0)
    public propNum?: number|null = 0
    @protobuf.Field.d(10, "string", "optional", )
    public matchKey?: string|null = ""
    @protobuf.Field.d(11, "string", "optional", )
    public propName?: string|null = ""
    @protobuf.Field.d(12, "string", "optional", )
    public gameID?: string|null = ""
    @protobuf.Field.d(13, "string", "optional", )
    public matchID?: string|null = ""
}
export interface IUserLeaveEvent {
    uid?: number|null
    preMatchKey?: string|null
    subMatchType?: number|null
    matchConfigTags?: string[]
    ruleID?: number|null
}
@protobuf.Type.d("tss_match_v2_commonevent_UserLeaveEvent")
export class UserLeaveEvent extends protobuf.Message<IUserLeaveEvent> {
    constructor(properties: Properties<IUserLeaveEvent>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
            if (properties.subMatchType) { this.subMatchType = properties.subMatchType }
            if (properties.matchConfigTags) { this.matchConfigTags = []; properties.matchConfigTags.forEach((value, index)=>{this.matchConfigTags[index] = properties.matchConfigTags[index]})}
            if (properties.ruleID) { this.ruleID = properties.ruleID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public preMatchKey?: string|null = ""
    @protobuf.Field.d(3, "int32", "optional", 0)
    public subMatchType?: number|null = 0
    @protobuf.Field.d(4, "string", "repeated", [])
    public matchConfigTags?: string[] = []
    @protobuf.Field.d(5, "int64", "optional", 0)
    public ruleID?: number|null = 0
}
export interface IUserSignUpEvent {
    uid?: number|null
    preMatchKey?: string|null
    matchType?: number|null
    subMatchType?: number|null
    signedTime?: number|null
    signedType?: number|null
    matchTime?: number|null
    matchName?: string|null
    cancelSignedTime?: number|null
    propID?: number|null
    propNum?: number|null
    propName?: string|null
    fee?: number|null
    gameID?: string|null
    diamondNum?: number|null
    hasCompensate?: boolean|null
    propCompensate?: string|null
    matchID?: string|null
    inviterUid?: number|null
    mungNum?: number|null
    matchConfigTags?: string[]
    phaseSeq?: number|null
    ruleID?: number|null
}
@protobuf.Type.d("tss_match_v2_commonevent_UserSignUpEvent")
export class UserSignUpEvent extends protobuf.Message<IUserSignUpEvent> {
    constructor(properties: Properties<IUserSignUpEvent>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
            if (properties.matchType) { this.matchType = properties.matchType }
            if (properties.subMatchType) { this.subMatchType = properties.subMatchType }
            if (properties.signedTime) { this.signedTime = properties.signedTime }
            if (properties.signedType) { this.signedType = properties.signedType }
            if (properties.matchTime) { this.matchTime = properties.matchTime }
            if (properties.matchName) { this.matchName = properties.matchName }
            if (properties.cancelSignedTime) { this.cancelSignedTime = properties.cancelSignedTime }
            if (properties.propID) { this.propID = properties.propID }
            if (properties.propNum) { this.propNum = properties.propNum }
            if (properties.propName) { this.propName = properties.propName }
            if (properties.fee) { this.fee = properties.fee }
            if (properties.gameID) { this.gameID = properties.gameID }
            if (properties.diamondNum) { this.diamondNum = properties.diamondNum }
            if (properties.hasCompensate) { this.hasCompensate = properties.hasCompensate }
            if (properties.propCompensate) { this.propCompensate = properties.propCompensate }
            if (properties.matchID) { this.matchID = properties.matchID }
            if (properties.inviterUid) { this.inviterUid = properties.inviterUid }
            if (properties.mungNum) { this.mungNum = properties.mungNum }
            if (properties.matchConfigTags) { this.matchConfigTags = []; properties.matchConfigTags.forEach((value, index)=>{this.matchConfigTags[index] = properties.matchConfigTags[index]})}
            if (properties.phaseSeq) { this.phaseSeq = properties.phaseSeq }
            if (properties.ruleID) { this.ruleID = properties.ruleID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public preMatchKey?: string|null = ""
    @protobuf.Field.d(3, "int32", "optional", 0)
    public matchType?: number|null = 0
    @protobuf.Field.d(4, "int32", "optional", 0)
    public subMatchType?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public signedTime?: number|null = 0
    @protobuf.Field.d(6, "int32", "optional", 0)
    public signedType?: number|null = 0
    @protobuf.Field.d(7, "int64", "optional", 0)
    public matchTime?: number|null = 0
    @protobuf.Field.d(8, "string", "optional", )
    public matchName?: string|null = ""
    @protobuf.Field.d(9, "int64", "optional", 0)
    public cancelSignedTime?: number|null = 0
    @protobuf.Field.d(10, "int32", "optional", 0)
    public propID?: number|null = 0
    @protobuf.Field.d(11, "int32", "optional", 0)
    public propNum?: number|null = 0
    @protobuf.Field.d(12, "string", "optional", )
    public propName?: string|null = ""
    @protobuf.Field.d(13, "int64", "optional", 0)
    public fee?: number|null = 0
    @protobuf.Field.d(14, "string", "optional", )
    public gameID?: string|null = ""
    @protobuf.Field.d(15, "int32", "optional", 0)
    public diamondNum?: number|null = 0
    @protobuf.Field.d(16, "bool", "optional", false)
    public hasCompensate?: boolean|null = false
    @protobuf.Field.d(17, "string", "optional", )
    public propCompensate?: string|null = ""
    @protobuf.Field.d(18, "string", "optional", )
    public matchID?: string|null = ""
    @protobuf.Field.d(19, "int64", "optional", 0)
    public inviterUid?: number|null = 0
    @protobuf.Field.d(20, "int32", "optional", 0)
    public mungNum?: number|null = 0
    @protobuf.Field.d(21, "string", "repeated", [])
    public matchConfigTags?: string[] = []
    @protobuf.Field.d(22, "int32", "optional", 0)
    public phaseSeq?: number|null = 0
    @protobuf.Field.d(23, "int64", "optional", 0)
    public ruleID?: number|null = 0
}
export interface IUserCancelSignUpEvent {
    uid?: number|null
    preMatchKey?: string|null
    matchID?: string|null
    matchType?: number|null
    subMatchType?: number|null
    timestamp?: number|null
    gameID?: string|null
    signedTime?: number|null
    matchConfigTags?: string[]
    phaseSeq?: number|null
    ruleID?: number|null
}
@protobuf.Type.d("tss_match_v2_commonevent_UserCancelSignUpEvent")
export class UserCancelSignUpEvent extends protobuf.Message<IUserCancelSignUpEvent> {
    constructor(properties: Properties<IUserCancelSignUpEvent>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
            if (properties.matchID) { this.matchID = properties.matchID }
            if (properties.matchType) { this.matchType = properties.matchType }
            if (properties.subMatchType) { this.subMatchType = properties.subMatchType }
            if (properties.timestamp) { this.timestamp = properties.timestamp }
            if (properties.gameID) { this.gameID = properties.gameID }
            if (properties.signedTime) { this.signedTime = properties.signedTime }
            if (properties.matchConfigTags) { this.matchConfigTags = []; properties.matchConfigTags.forEach((value, index)=>{this.matchConfigTags[index] = properties.matchConfigTags[index]})}
            if (properties.phaseSeq) { this.phaseSeq = properties.phaseSeq }
            if (properties.ruleID) { this.ruleID = properties.ruleID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public preMatchKey?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public matchID?: string|null = ""
    @protobuf.Field.d(4, "int32", "optional", 0)
    public matchType?: number|null = 0
    @protobuf.Field.d(5, "int32", "optional", 0)
    public subMatchType?: number|null = 0
    @protobuf.Field.d(6, "int64", "optional", 0)
    public timestamp?: number|null = 0
    @protobuf.Field.d(7, "string", "optional", )
    public gameID?: string|null = ""
    @protobuf.Field.d(8, "int64", "optional", 0)
    public signedTime?: number|null = 0
    @protobuf.Field.d(9, "string", "repeated", [])
    public matchConfigTags?: string[] = []
    @protobuf.Field.d(10, "int32", "optional", 0)
    public phaseSeq?: number|null = 0
    @protobuf.Field.d(11, "int64", "optional", 0)
    public ruleID?: number|null = 0
}
export interface IUserJoinDeskEvent {
    uid?: number|null
    deskID?: number|null
    sessionID?: string|null
    sessionName?: string|null
    isRobot?: boolean|null
    gameID?: string|null
    playWay?: number|null
    subMatchType?: number|null
    createAt?: number|null
}
@protobuf.Type.d("tss_match_v2_commonevent_UserJoinDeskEvent")
export class UserJoinDeskEvent extends protobuf.Message<IUserJoinDeskEvent> {
    constructor(properties: Properties<IUserJoinDeskEvent>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.deskID) { this.deskID = properties.deskID }
            if (properties.sessionID) { this.sessionID = properties.sessionID }
            if (properties.sessionName) { this.sessionName = properties.sessionName }
            if (properties.isRobot) { this.isRobot = properties.isRobot }
            if (properties.gameID) { this.gameID = properties.gameID }
            if (properties.playWay) { this.playWay = properties.playWay }
            if (properties.subMatchType) { this.subMatchType = properties.subMatchType }
            if (properties.createAt) { this.createAt = properties.createAt }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public deskID?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public sessionID?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public sessionName?: string|null = ""
    @protobuf.Field.d(5, "bool", "optional", false)
    public isRobot?: boolean|null = false
    @protobuf.Field.d(6, "string", "optional", )
    public gameID?: string|null = ""
    @protobuf.Field.d(7, "int64", "optional", 0)
    public playWay?: number|null = 0
    @protobuf.Field.d(8, "int64", "optional", 0)
    public subMatchType?: number|null = 0
    @protobuf.Field.d(9, "int64", "optional", 0)
    public createAt?: number|null = 0
}
export interface IUserLeaveDeskEvent {
    uid?: number|null
    deskID?: number|null
    sessionID?: string|null
    createAt?: number|null
}
@protobuf.Type.d("tss_match_v2_commonevent_UserLeaveDeskEvent")
export class UserLeaveDeskEvent extends protobuf.Message<IUserLeaveDeskEvent> {
    constructor(properties: Properties<IUserLeaveDeskEvent>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.deskID) { this.deskID = properties.deskID }
            if (properties.sessionID) { this.sessionID = properties.sessionID }
            if (properties.createAt) { this.createAt = properties.createAt }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public deskID?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public sessionID?: string|null = ""
    @protobuf.Field.d(4, "int64", "optional", 0)
    public createAt?: number|null = 0
}
export interface IRewardRank {
    start?: number|null
    end?: number|null
    props?: IRewardProp[]
    rewardName?: string|null
    rewardIconURL?: string|null
}
@protobuf.Type.d("tss_match_v2_commonevent_RewardRank")
export class RewardRank extends protobuf.Message<IRewardRank> {
    constructor(properties: Properties<IRewardRank>) {
        super(properties);
        if (properties) {
            if (properties.start) { this.start = properties.start }
            if (properties.end) { this.end = properties.end }
            if (properties.props) { this.props = []; properties.props.forEach((value, index)=>{this.props[index] = RewardProp.create(properties.props[index]) as any})}
            if (properties.rewardName) { this.rewardName = properties.rewardName }
            if (properties.rewardIconURL) { this.rewardIconURL = properties.rewardIconURL }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public start?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public end?: number|null = 0
    @protobuf.Field.d(3, "tss_match_v2_commonevent_RewardProp", "repeated")
    public props?: RewardProp[] = []
    @protobuf.Field.d(4, "string", "optional", )
    public rewardName?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public rewardIconURL?: string|null = ""
}
export interface IMatchJoinInfo {
    playerNum?: number|null
    robotNum?: number|null
    total?: number|null
}
@protobuf.Type.d("tss_match_v2_commonevent_MatchJoinInfo")
export class MatchJoinInfo extends protobuf.Message<IMatchJoinInfo> {
    constructor(properties: Properties<IMatchJoinInfo>) {
        super(properties);
        if (properties) {
            if (properties.playerNum) { this.playerNum = properties.playerNum }
            if (properties.robotNum) { this.robotNum = properties.robotNum }
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public playerNum?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public robotNum?: number|null = 0
    @protobuf.Field.d(3, "int32", "optional", 0)
    public total?: number|null = 0
}
export interface IUser {
    UID?: number|null
    cupChange?: number|null
    winningResults?: number[]
    totalCup?: number|null
    isVictory?: boolean|null
    winningStreak?: number|null
    mungNum?: number|null
    highlightTable?: string|null
    settleNum?: number|null
    MaxVersion?: number|null
    MinVersion?: number|null
    applicationId?: string|null
    Role?: number|null
    entrustCnt?: number|null
    entrustedCnt?: number|null
    endEntrustStatus?: number|null
    allStepCost?: number|null
    allStep?: number|null
    gameResultType?: number|null
    ownNum?: number|null
    joinTime?: number|null
    metas?: { [k: string]: string|null }
    Version?: string|null
    settleNumAfterPrivilege?: number|null
    teamID?: string|null
}
@protobuf.Type.d("tss_match_v2_commonevent_User")
export class User extends protobuf.Message<IUser> {
    constructor(properties: Properties<IUser>) {
        super(properties);
        if (properties) {
            if (properties.UID) { this.UID = properties.UID }
            if (properties.cupChange) { this.cupChange = properties.cupChange }
            if (properties.winningResults) { this.winningResults = []; properties.winningResults.forEach((value, index)=>{this.winningResults[index] = properties.winningResults[index]})}
            if (properties.totalCup) { this.totalCup = properties.totalCup }
            if (properties.isVictory) { this.isVictory = properties.isVictory }
            if (properties.winningStreak) { this.winningStreak = properties.winningStreak }
            if (properties.mungNum) { this.mungNum = properties.mungNum }
            if (properties.highlightTable) { this.highlightTable = properties.highlightTable }
            if (properties.settleNum) { this.settleNum = properties.settleNum }
            if (properties.MaxVersion) { this.MaxVersion = properties.MaxVersion }
            if (properties.MinVersion) { this.MinVersion = properties.MinVersion }
            if (properties.applicationId) { this.applicationId = properties.applicationId }
            if (properties.Role) { this.Role = properties.Role }
            if (properties.entrustCnt) { this.entrustCnt = properties.entrustCnt }
            if (properties.entrustedCnt) { this.entrustedCnt = properties.entrustedCnt }
            if (properties.endEntrustStatus) { this.endEntrustStatus = properties.endEntrustStatus }
            if (properties.allStepCost) { this.allStepCost = properties.allStepCost }
            if (properties.allStep) { this.allStep = properties.allStep }
            if (properties.gameResultType) { this.gameResultType = properties.gameResultType }
            if (properties.ownNum) { this.ownNum = properties.ownNum }
            if (properties.joinTime) { this.joinTime = properties.joinTime }
            if (properties.metas) { this.metas = properties.metas }
            if (properties.Version) { this.Version = properties.Version }
            if (properties.settleNumAfterPrivilege) { this.settleNumAfterPrivilege = properties.settleNumAfterPrivilege }
            if (properties.teamID) { this.teamID = properties.teamID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public UID?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public cupChange?: number|null = 0
    @protobuf.Field.d(3, "int32", "repeated", [])
    public winningResults?: number[] = []
    @protobuf.Field.d(4, "int64", "optional", 0)
    public totalCup?: number|null = 0
    @protobuf.Field.d(5, "bool", "optional", false)
    public isVictory?: boolean|null = false
    @protobuf.Field.d(6, "int32", "optional", 0)
    public winningStreak?: number|null = 0
    @protobuf.Field.d(7, "int32", "optional", 0)
    public mungNum?: number|null = 0
    @protobuf.Field.d(8, "string", "optional", )
    public highlightTable?: string|null = ""
    @protobuf.Field.d(9, "int32", "optional", 0)
    public settleNum?: number|null = 0
    @protobuf.Field.d(14, "int64", "optional", 0)
    public MaxVersion?: number|null = 0
    @protobuf.Field.d(15, "int64", "optional", 0)
    public MinVersion?: number|null = 0
    @protobuf.Field.d(16, "string", "optional", )
    public applicationId?: string|null = ""
    @protobuf.Field.d(17, "int64", "optional", 0)
    public Role?: number|null = 0
    @protobuf.Field.d(20, "int64", "optional", 0)
    public entrustCnt?: number|null = 0
    @protobuf.Field.d(21, "int64", "optional", 0)
    public entrustedCnt?: number|null = 0
    @protobuf.Field.d(22, "int64", "optional", 0)
    public endEntrustStatus?: number|null = 0
    @protobuf.Field.d(23, "int64", "optional", 0)
    public allStepCost?: number|null = 0
    @protobuf.Field.d(24, "int64", "optional", 0)
    public allStep?: number|null = 0
    @protobuf.Field.d(25, "int32", "optional", 0)
    public gameResultType?: number|null = 0
    @protobuf.Field.d(26, "int64", "optional", 0)
    public ownNum?: number|null = 0
    @protobuf.Field.d(27, "int64", "optional", 0)
    public joinTime?: number|null = 0
    @protobuf.MapField.d(28, "string", "string")
    public metas?: { [k: string]: string|null } = {}
    @protobuf.Field.d(29, "string", "optional", )
    public Version?: string|null = ""
    @protobuf.Field.d(30, "int64", "optional", 0)
    public settleNumAfterPrivilege?: number|null = 0
    @protobuf.Field.d(31, "string", "optional", )
    public teamID?: string|null = ""
}
export interface IMatchOverEvent {
    matchKey?: string|null
    matchType?: number|null
    preMatchKey?: string|null
    tableKey?: string|null
    overTime?: number|null
    gameID?: string|null
    users?: IUser[]
    matchName?: string|null
    matchIcon?: string|null
    cabinID?: number|null
    gameNum?: number|null
    lastRoundProcessSec?: number|null
    subMatchType?: number|null
    matchID?: number|null
    startTime?: number|null
    matchConfigTags?: string[]
    mungPoolNum?: number|null
    phaseSeq?: number|null
    ruleID?: number|null
    matchEventData?: Uint8Array
    type?: tss_common_AssetType|null
    sessionId?: string|null
    mateSubMatchType?: tss_match_v2_mate_SubMatchType|null
    playWay?: number|null
    commonMateSubMatchType?: tss_match_v2_commonmatesession_SubMatchType|null
    commonMateMode?: tss_match_v2_commonmatesession_MateMode|null
    fee?: number|null
    reportName?: string|null
}
@protobuf.Type.d("tss_match_v2_commonevent_MatchOverEvent")
export class MatchOverEvent extends protobuf.Message<IMatchOverEvent> {
    constructor(properties: Properties<IMatchOverEvent>) {
        super(properties);
        if (properties) {
            if (properties.matchKey) { this.matchKey = properties.matchKey }
            if (properties.matchType) { this.matchType = properties.matchType }
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
            if (properties.tableKey) { this.tableKey = properties.tableKey }
            if (properties.overTime) { this.overTime = properties.overTime }
            if (properties.gameID) { this.gameID = properties.gameID }
            if (properties.users) { this.users = []; properties.users.forEach((value, index)=>{this.users[index] = User.create(properties.users[index]) as any})}
            if (properties.matchName) { this.matchName = properties.matchName }
            if (properties.matchIcon) { this.matchIcon = properties.matchIcon }
            if (properties.cabinID) { this.cabinID = properties.cabinID }
            if (properties.gameNum) { this.gameNum = properties.gameNum }
            if (properties.lastRoundProcessSec) { this.lastRoundProcessSec = properties.lastRoundProcessSec }
            if (properties.subMatchType) { this.subMatchType = properties.subMatchType }
            if (properties.matchID) { this.matchID = properties.matchID }
            if (properties.startTime) { this.startTime = properties.startTime }
            if (properties.matchConfigTags) { this.matchConfigTags = []; properties.matchConfigTags.forEach((value, index)=>{this.matchConfigTags[index] = properties.matchConfigTags[index]})}
            if (properties.mungPoolNum) { this.mungPoolNum = properties.mungPoolNum }
            if (properties.phaseSeq) { this.phaseSeq = properties.phaseSeq }
            if (properties.ruleID) { this.ruleID = properties.ruleID }
            if (properties.matchEventData) { this.matchEventData = properties.matchEventData }
            if (properties.type) { this.type = properties.type }
            if (properties.sessionId) { this.sessionId = properties.sessionId }
            if (properties.mateSubMatchType) { this.mateSubMatchType = properties.mateSubMatchType }
            if (properties.playWay) { this.playWay = properties.playWay }
            if (properties.commonMateSubMatchType) { this.commonMateSubMatchType = properties.commonMateSubMatchType }
            if (properties.commonMateMode) { this.commonMateMode = properties.commonMateMode }
            if (properties.fee) { this.fee = properties.fee }
            if (properties.reportName) { this.reportName = properties.reportName }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public matchKey?: string|null = ""
    @protobuf.Field.d(2, "int32", "optional", 0)
    public matchType?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public preMatchKey?: string|null = ""
    @protobuf.Field.d(30, "string", "optional", )
    public tableKey?: string|null = ""
    @protobuf.Field.d(4, "int64", "optional", 0)
    public overTime?: number|null = 0
    @protobuf.Field.d(5, "string", "optional", )
    public gameID?: string|null = ""
    @protobuf.Field.d(6, "tss_match_v2_commonevent_User", "repeated")
    public users?: User[] = []
    @protobuf.Field.d(7, "string", "optional", )
    public matchName?: string|null = ""
    @protobuf.Field.d(8, "string", "optional", )
    public matchIcon?: string|null = ""
    @protobuf.Field.d(9, "int64", "optional", 0)
    public cabinID?: number|null = 0
    @protobuf.Field.d(10, "int32", "optional", 0)
    public gameNum?: number|null = 0
    @protobuf.Field.d(11, "int32", "optional", 0)
    public lastRoundProcessSec?: number|null = 0
    @protobuf.Field.d(12, "int32", "optional", 0)
    public subMatchType?: number|null = 0
    @protobuf.Field.d(13, "int64", "optional", 0)
    public matchID?: number|null = 0
    @protobuf.Field.d(14, "int64", "optional", 0)
    public startTime?: number|null = 0
    @protobuf.Field.d(15, "string", "repeated", [])
    public matchConfigTags?: string[] = []
    @protobuf.Field.d(16, "int32", "optional", 0)
    public mungPoolNum?: number|null = 0
    @protobuf.Field.d(17, "int32", "optional", 0)
    public phaseSeq?: number|null = 0
    @protobuf.Field.d(18, "int64", "optional", 0)
    public ruleID?: number|null = 0
    @protobuf.Field.d(19, "bytes", "optional", [])
    public matchEventData?: Uint8Array
    @protobuf.Field.d(20, tss_common_AssetType, "optional", tss_common_AssetType.AssetTypeUnknown)
    public type?: tss_common_AssetType|null = tss_common_AssetType.AssetTypeUnknown
    @protobuf.Field.d(21, "string", "optional", )
    public sessionId?: string|null = ""
    @protobuf.Field.d(22, tss_match_v2_mate_SubMatchType, "optional", tss_match_v2_mate_SubMatchType.SubMatchTypeUnknown)
    public mateSubMatchType?: tss_match_v2_mate_SubMatchType|null = tss_match_v2_mate_SubMatchType.SubMatchTypeUnknown
    @protobuf.Field.d(23, "int32", "optional", 0)
    public playWay?: number|null = 0
    @protobuf.Field.d(24, tss_match_v2_commonmatesession_SubMatchType, "optional", tss_match_v2_commonmatesession_SubMatchType.SubMatchTypeUnknown)
    public commonMateSubMatchType?: tss_match_v2_commonmatesession_SubMatchType|null = tss_match_v2_commonmatesession_SubMatchType.SubMatchTypeUnknown
    @protobuf.Field.d(25, tss_match_v2_commonmatesession_MateMode, "optional", tss_match_v2_commonmatesession_MateMode.MateModeUnknown)
    public commonMateMode?: tss_match_v2_commonmatesession_MateMode|null = tss_match_v2_commonmatesession_MateMode.MateModeUnknown
    @protobuf.Field.d(26, "int32", "optional", 0)
    public fee?: number|null = 0
    @protobuf.Field.d(27, "string", "optional", )
    public reportName?: string|null = ""
}
export interface IFinalRankEvent {
    matchType?: number|null
    finalRankEventData?: Uint8Array
}
@protobuf.Type.d("tss_match_v2_commonevent_FinalRankEvent")
export class FinalRankEvent extends protobuf.Message<IFinalRankEvent> {
    constructor(properties: Properties<IFinalRankEvent>) {
        super(properties);
        if (properties) {
            if (properties.matchType) { this.matchType = properties.matchType }
            if (properties.finalRankEventData) { this.finalRankEventData = properties.finalRankEventData }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public matchType?: number|null = 0
    @protobuf.Field.d(2, "bytes", "optional", [])
    public finalRankEventData?: Uint8Array
}
export interface IUpsertWhitelistEvent {
    matchID?: number|null
    users?: number[]
}
@protobuf.Type.d("tss_match_v2_commonevent_UpsertWhitelistEvent")
export class UpsertWhitelistEvent extends protobuf.Message<IUpsertWhitelistEvent> {
    constructor(properties: Properties<IUpsertWhitelistEvent>) {
        super(properties);
        if (properties) {
            if (properties.matchID) { this.matchID = properties.matchID }
            if (properties.users) { this.users = []; properties.users.forEach((value, index)=>{this.users[index] = properties.users[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public matchID?: number|null = 0
    @protobuf.Field.d(2, "int64", "repeated", [])
    public users?: number[] = []
}
export interface IDeleteWhitelistEvent {
    matchID?: number|null
}
@protobuf.Type.d("tss_match_v2_commonevent_DeleteWhitelistEvent")
export class DeleteWhitelistEvent extends protobuf.Message<IDeleteWhitelistEvent> {
    constructor(properties: Properties<IDeleteWhitelistEvent>) {
        super(properties);
        if (properties) {
            if (properties.matchID) { this.matchID = properties.matchID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public matchID?: number|null = 0
}
export interface ICreateMatchEvent {
    matchKey?: string|null
    matchType?: number|null
    preMatchKey?: string|null
    matchData?: Uint8Array
    matchID?: string|null
    matchName?: string|null
    gameID?: string|null
    rewards?: IRewardRank[]
    startTime?: number|null
    endTime?: number|null
    displayURL?: string|null
    signUpNum?: number|null
    joinInfo?: IMatchJoinInfo
    revivalType?: number|null
    seriesScheduleName?: string|null
    hasWhitelist?: boolean|null
    matchTags?: number[]
    uids?: number[]
    cabinID?: number|null
    subMatchType?: number|null
    minPlayerNum?: number|null
    prizeRingSize?: number|null
    signedType?: number|null
    propID?: number|null
    propNum?: number|null
    userType?: UserType|null
    matchConfigTags?: string[]
    roundNum?: number|null
    phaseSeq?: number|null
    miniDisplayURL?: string|null
    prizeMode?: number|null
    immediatelyMungNum?: number|null
    ruleID?: number|null
    creator?: number|null
    ruleType?: number|null
    sessionId?: string|null
    users?: IUser[]
    commonMateMode?: tss_match_v2_commonmatesession_MateMode|null
}
@protobuf.Type.d("tss_match_v2_commonevent_CreateMatchEvent")
export class CreateMatchEvent extends protobuf.Message<ICreateMatchEvent> {
    constructor(properties: Properties<ICreateMatchEvent>) {
        super(properties);
        if (properties) {
            if (properties.matchKey) { this.matchKey = properties.matchKey }
            if (properties.matchType) { this.matchType = properties.matchType }
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
            if (properties.matchData) { this.matchData = properties.matchData }
            if (properties.matchID) { this.matchID = properties.matchID }
            if (properties.matchName) { this.matchName = properties.matchName }
            if (properties.gameID) { this.gameID = properties.gameID }
            if (properties.rewards) { this.rewards = []; properties.rewards.forEach((value, index)=>{this.rewards[index] = RewardRank.create(properties.rewards[index]) as any})}
            if (properties.startTime) { this.startTime = properties.startTime }
            if (properties.endTime) { this.endTime = properties.endTime }
            if (properties.displayURL) { this.displayURL = properties.displayURL }
            if (properties.signUpNum) { this.signUpNum = properties.signUpNum }
            if (properties.joinInfo) { this.joinInfo = MatchJoinInfo.create(properties.joinInfo) as any }
            if (properties.revivalType) { this.revivalType = properties.revivalType }
            if (properties.seriesScheduleName) { this.seriesScheduleName = properties.seriesScheduleName }
            if (properties.hasWhitelist) { this.hasWhitelist = properties.hasWhitelist }
            if (properties.matchTags) { this.matchTags = []; properties.matchTags.forEach((value, index)=>{this.matchTags[index] = properties.matchTags[index]})}
            if (properties.uids) { this.uids = []; properties.uids.forEach((value, index)=>{this.uids[index] = properties.uids[index]})}
            if (properties.cabinID) { this.cabinID = properties.cabinID }
            if (properties.subMatchType) { this.subMatchType = properties.subMatchType }
            if (properties.minPlayerNum) { this.minPlayerNum = properties.minPlayerNum }
            if (properties.prizeRingSize) { this.prizeRingSize = properties.prizeRingSize }
            if (properties.signedType) { this.signedType = properties.signedType }
            if (properties.propID) { this.propID = properties.propID }
            if (properties.propNum) { this.propNum = properties.propNum }
            if (properties.userType) { this.userType = properties.userType }
            if (properties.matchConfigTags) { this.matchConfigTags = []; properties.matchConfigTags.forEach((value, index)=>{this.matchConfigTags[index] = properties.matchConfigTags[index]})}
            if (properties.roundNum) { this.roundNum = properties.roundNum }
            if (properties.phaseSeq) { this.phaseSeq = properties.phaseSeq }
            if (properties.miniDisplayURL) { this.miniDisplayURL = properties.miniDisplayURL }
            if (properties.prizeMode) { this.prizeMode = properties.prizeMode }
            if (properties.immediatelyMungNum) { this.immediatelyMungNum = properties.immediatelyMungNum }
            if (properties.ruleID) { this.ruleID = properties.ruleID }
            if (properties.creator) { this.creator = properties.creator }
            if (properties.ruleType) { this.ruleType = properties.ruleType }
            if (properties.sessionId) { this.sessionId = properties.sessionId }
            if (properties.users) { this.users = []; properties.users.forEach((value, index)=>{this.users[index] = User.create(properties.users[index]) as any})}
            if (properties.commonMateMode) { this.commonMateMode = properties.commonMateMode }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public matchKey?: string|null = ""
    @protobuf.Field.d(2, "int32", "optional", 0)
    public matchType?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public preMatchKey?: string|null = ""
    @protobuf.Field.d(4, "bytes", "optional", [])
    public matchData?: Uint8Array
    @protobuf.Field.d(5, "string", "optional", )
    public matchID?: string|null = ""
    @protobuf.Field.d(6, "string", "optional", )
    public matchName?: string|null = ""
    @protobuf.Field.d(7, "string", "optional", )
    public gameID?: string|null = ""
    @protobuf.Field.d(8, "tss_match_v2_commonevent_RewardRank", "repeated")
    public rewards?: RewardRank[] = []
    @protobuf.Field.d(9, "int64", "optional", 0)
    public startTime?: number|null = 0
    @protobuf.Field.d(10, "int64", "optional", 0)
    public endTime?: number|null = 0
    @protobuf.Field.d(11, "string", "optional", )
    public displayURL?: string|null = ""
    @protobuf.Field.d(12, "int32", "optional", 0)
    public signUpNum?: number|null = 0
    @protobuf.Field.d(13, "tss_match_v2_commonevent_MatchJoinInfo", "optional")
    public joinInfo?: MatchJoinInfo|null
    @protobuf.Field.d(14, "int32", "optional", 0)
    public revivalType?: number|null = 0
    @protobuf.Field.d(15, "string", "optional", )
    public seriesScheduleName?: string|null = ""
    @protobuf.Field.d(16, "bool", "optional", false)
    public hasWhitelist?: boolean|null = false
    @protobuf.Field.d(17, "int64", "repeated", [])
    public matchTags?: number[] = []
    @protobuf.Field.d(18, "int64", "repeated", [])
    public uids?: number[] = []
    @protobuf.Field.d(19, "int64", "optional", 0)
    public cabinID?: number|null = 0
    @protobuf.Field.d(20, "int32", "optional", 0)
    public subMatchType?: number|null = 0
    @protobuf.Field.d(21, "int32", "optional", 0)
    public minPlayerNum?: number|null = 0
    @protobuf.Field.d(22, "int32", "optional", 0)
    public prizeRingSize?: number|null = 0
    @protobuf.Field.d(23, "int32", "optional", 0)
    public signedType?: number|null = 0
    @protobuf.Field.d(24, "int32", "optional", 0)
    public propID?: number|null = 0
    @protobuf.Field.d(25, "int32", "optional", 0)
    public propNum?: number|null = 0
    @protobuf.Field.d(26, UserType, "optional", UserType.UserType_Unknow)
    public userType?: UserType|null = UserType.UserType_Unknow
    @protobuf.Field.d(27, "string", "repeated", [])
    public matchConfigTags?: string[] = []
    @protobuf.Field.d(28, "int32", "optional", 0)
    public roundNum?: number|null = 0
    @protobuf.Field.d(29, "int32", "optional", 0)
    public phaseSeq?: number|null = 0
    @protobuf.Field.d(30, "string", "optional", )
    public miniDisplayURL?: string|null = ""
    @protobuf.Field.d(31, "int32", "optional", 0)
    public prizeMode?: number|null = 0
    @protobuf.Field.d(32, "int32", "optional", 0)
    public immediatelyMungNum?: number|null = 0
    @protobuf.Field.d(33, "int64", "optional", 0)
    public ruleID?: number|null = 0
    @protobuf.Field.d(34, "int64", "optional", 0)
    public creator?: number|null = 0
    @protobuf.Field.d(35, "int32", "optional", 0)
    public ruleType?: number|null = 0
    @protobuf.Field.d(36, "string", "optional", )
    public sessionId?: string|null = ""
    @protobuf.Field.d(37, "tss_match_v2_commonevent_User", "repeated")
    public users?: User[] = []
    @protobuf.Field.d(38, tss_match_v2_commonmatesession_MateMode, "optional", tss_match_v2_commonmatesession_MateMode.MateModeUnknown)
    public commonMateMode?: tss_match_v2_commonmatesession_MateMode|null = tss_match_v2_commonmatesession_MateMode.MateModeUnknown
}
export interface ICreateListConfigEvent {
    pageType?: number|null
    baseCfg?: Uint8Array
    optionalCfg?: Uint8Array
}
@protobuf.Type.d("tss_match_v2_commonevent_CreateListConfigEvent")
export class CreateListConfigEvent extends protobuf.Message<ICreateListConfigEvent> {
    constructor(properties: Properties<ICreateListConfigEvent>) {
        super(properties);
        if (properties) {
            if (properties.pageType) { this.pageType = properties.pageType }
            if (properties.baseCfg) { this.baseCfg = properties.baseCfg }
            if (properties.optionalCfg) { this.optionalCfg = properties.optionalCfg }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public pageType?: number|null = 0
    @protobuf.Field.d(2, "bytes", "optional", [])
    public baseCfg?: Uint8Array
    @protobuf.Field.d(3, "bytes", "optional", [])
    public optionalCfg?: Uint8Array
}
export interface ICreateMatchTabEvent {
    matchTab?: Uint8Array
}
@protobuf.Type.d("tss_match_v2_commonevent_CreateMatchTabEvent")
export class CreateMatchTabEvent extends protobuf.Message<ICreateMatchTabEvent> {
    constructor(properties: Properties<ICreateMatchTabEvent>) {
        super(properties);
        if (properties) {
            if (properties.matchTab) { this.matchTab = properties.matchTab }
        }
	}
    @protobuf.Field.d(1, "bytes", "optional", [])
    public matchTab?: Uint8Array
}
export interface IDeleteMatchTabEvent {
    tabID?: number|null
}
@protobuf.Type.d("tss_match_v2_commonevent_DeleteMatchTabEvent")
export class DeleteMatchTabEvent extends protobuf.Message<IDeleteMatchTabEvent> {
    constructor(properties: Properties<IDeleteMatchTabEvent>) {
        super(properties);
        if (properties) {
            if (properties.tabID) { this.tabID = properties.tabID }
        }
	}
    @protobuf.Field.d(2, "int64", "optional", 0)
    public tabID?: number|null = 0
}
export interface IUserRank {
    uid?: number|null
    rank?: number|null
    score?: number|null
    state?: number|null
    tableID?: number|null
    tableKey?: string|null
    isObserved?: boolean|null
    isInObservedTable?: boolean|null
    ObserverHot?: number|null
}
@protobuf.Type.d("tss_match_v2_commonevent_UserRank")
export class UserRank extends protobuf.Message<IUserRank> {
    constructor(properties: Properties<IUserRank>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.rank) { this.rank = properties.rank }
            if (properties.score) { this.score = properties.score }
            if (properties.state) { this.state = properties.state }
            if (properties.tableID) { this.tableID = properties.tableID }
            if (properties.tableKey) { this.tableKey = properties.tableKey }
            if (properties.isObserved) { this.isObserved = properties.isObserved }
            if (properties.isInObservedTable) { this.isInObservedTable = properties.isInObservedTable }
            if (properties.ObserverHot) { this.ObserverHot = properties.ObserverHot }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public rank?: number|null = 0
    @protobuf.Field.d(3, "int32", "optional", 0)
    public score?: number|null = 0
    @protobuf.Field.d(4, "int32", "optional", 0)
    public state?: number|null = 0
    @protobuf.Field.d(5, "uint64", "optional", 0)
    public tableID?: number|null = 0
    @protobuf.Field.d(6, "string", "optional", )
    public tableKey?: string|null = ""
    @protobuf.Field.d(7, "bool", "optional", false)
    public isObserved?: boolean|null = false
    @protobuf.Field.d(8, "bool", "optional", false)
    public isInObservedTable?: boolean|null = false
    @protobuf.Field.d(9, "int64", "optional", 0)
    public ObserverHot?: number|null = 0
}
export interface ITableInfo {
    tKey?: string|null
    tSrvID?: number|null
    users?: IUserRank[]
    openingSec?: number|null
    startTime?: number|null
    endTime?: number|null
    observerHot?: number|null
    typ?: TableChangeType|null
}
@protobuf.Type.d("tss_match_v2_commonevent_TableInfo")
export class TableInfo extends protobuf.Message<ITableInfo> {
    constructor(properties: Properties<ITableInfo>) {
        super(properties);
        if (properties) {
            if (properties.tKey) { this.tKey = properties.tKey }
            if (properties.tSrvID) { this.tSrvID = properties.tSrvID }
            if (properties.users) { this.users = []; properties.users.forEach((value, index)=>{this.users[index] = UserRank.create(properties.users[index]) as any})}
            if (properties.openingSec) { this.openingSec = properties.openingSec }
            if (properties.startTime) { this.startTime = properties.startTime }
            if (properties.endTime) { this.endTime = properties.endTime }
            if (properties.observerHot) { this.observerHot = properties.observerHot }
            if (properties.typ) { this.typ = properties.typ }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public tKey?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public tSrvID?: number|null = 0
    @protobuf.Field.d(3, "tss_match_v2_commonevent_UserRank", "repeated")
    public users?: UserRank[] = []
    @protobuf.Field.d(4, "int64", "optional", 0)
    public openingSec?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public startTime?: number|null = 0
    @protobuf.Field.d(7, "int64", "optional", 0)
    public endTime?: number|null = 0
    @protobuf.Field.d(6, "int64", "optional", 0)
    public observerHot?: number|null = 0
    @protobuf.Field.d(8, TableChangeType, "optional", TableChangeType.TableChangeStart)
    public typ?: TableChangeType|null = TableChangeType.TableChangeStart
}
export interface IMatchTableInfo {
    tables?: ITableInfo[]
    tableSrvName?: string|null
    gameID?: string|null
}
@protobuf.Type.d("tss_match_v2_commonevent_MatchTableInfo")
export class MatchTableInfo extends protobuf.Message<IMatchTableInfo> {
    constructor(properties: Properties<IMatchTableInfo>) {
        super(properties);
        if (properties) {
            if (properties.tables) { this.tables = []; properties.tables.forEach((value, index)=>{this.tables[index] = TableInfo.create(properties.tables[index]) as any})}
            if (properties.tableSrvName) { this.tableSrvName = properties.tableSrvName }
            if (properties.gameID) { this.gameID = properties.gameID }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_commonevent_TableInfo", "repeated")
    public tables?: TableInfo[] = []
    @protobuf.Field.d(2, "string", "optional", )
    public tableSrvName?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public gameID?: string|null = ""
}
export interface IChatRoomClosedEvent {
    preMatchKey?: string|null
    members?: number[]
    matchKey?: string|null
    subMatchType?: number|null
}
@protobuf.Type.d("tss_match_v2_commonevent_ChatRoomClosedEvent")
export class ChatRoomClosedEvent extends protobuf.Message<IChatRoomClosedEvent> {
    constructor(properties: Properties<IChatRoomClosedEvent>) {
        super(properties);
        if (properties) {
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
            if (properties.members) { this.members = []; properties.members.forEach((value, index)=>{this.members[index] = properties.members[index]})}
            if (properties.matchKey) { this.matchKey = properties.matchKey }
            if (properties.subMatchType) { this.subMatchType = properties.subMatchType }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public preMatchKey?: string|null = ""
    @protobuf.Field.d(2, "int64", "repeated", [])
    public members?: number[] = []
    @protobuf.Field.d(3, "string", "optional", )
    public matchKey?: string|null = ""
    @protobuf.Field.d(4, "int32", "optional", 0)
    public subMatchType?: number|null = 0
}
export interface ISyncFastMatchCfgEvent {
    syncType?: number|null
    matchID?: number|null
    cfg?: Uint8Array
}
@protobuf.Type.d("tss_match_v2_commonevent_SyncFastMatchCfgEvent")
export class SyncFastMatchCfgEvent extends protobuf.Message<ISyncFastMatchCfgEvent> {
    constructor(properties: Properties<ISyncFastMatchCfgEvent>) {
        super(properties);
        if (properties) {
            if (properties.syncType) { this.syncType = properties.syncType }
            if (properties.matchID) { this.matchID = properties.matchID }
            if (properties.cfg) { this.cfg = properties.cfg }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public syncType?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public matchID?: number|null = 0
    @protobuf.Field.d(3, "bytes", "optional", [])
    public cfg?: Uint8Array
}
export interface IUserJoinObserverEvent {
    uid?: number|null
    matchType?: number|null
    matchKey?: string|null
}
@protobuf.Type.d("tss_match_v2_commonevent_UserJoinObserverEvent")
export class UserJoinObserverEvent extends protobuf.Message<IUserJoinObserverEvent> {
    constructor(properties: Properties<IUserJoinObserverEvent>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.matchType) { this.matchType = properties.matchType }
            if (properties.matchKey) { this.matchKey = properties.matchKey }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public matchType?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public matchKey?: string|null = ""
}
export interface IMatchStat {
    matchID?: number|null
    minNum?: number|null
    curPlayerNum?: number|null
    poolID?: string|null
    srvID?: number|null
    matchConfigTags?: string[]
    ruleID?: number|null
}
@protobuf.Type.d("tss_match_v2_commonevent_MatchStat")
export class MatchStat extends protobuf.Message<IMatchStat> {
    constructor(properties: Properties<IMatchStat>) {
        super(properties);
        if (properties) {
            if (properties.matchID) { this.matchID = properties.matchID }
            if (properties.minNum) { this.minNum = properties.minNum }
            if (properties.curPlayerNum) { this.curPlayerNum = properties.curPlayerNum }
            if (properties.poolID) { this.poolID = properties.poolID }
            if (properties.srvID) { this.srvID = properties.srvID }
            if (properties.matchConfigTags) { this.matchConfigTags = []; properties.matchConfigTags.forEach((value, index)=>{this.matchConfigTags[index] = properties.matchConfigTags[index]})}
            if (properties.ruleID) { this.ruleID = properties.ruleID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public matchID?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public minNum?: number|null = 0
    @protobuf.Field.d(3, "int32", "optional", 0)
    public curPlayerNum?: number|null = 0
    @protobuf.Field.d(4, "string", "optional", )
    public poolID?: string|null = ""
    @protobuf.Field.d(5, "int64", "optional", 0)
    public srvID?: number|null = 0
    @protobuf.Field.d(6, "string", "repeated", [])
    public matchConfigTags?: string[] = []
    @protobuf.Field.d(7, "int64", "optional", 0)
    public ruleID?: number|null = 0
}
export interface ITableChangeEvent {
    typ?: TableChangeType|null
    matchKey?: string|null
    info?: ITableInfo
}
@protobuf.Type.d("tss_match_v2_commonevent_TableChangeEvent")
export class TableChangeEvent extends protobuf.Message<ITableChangeEvent> {
    constructor(properties: Properties<ITableChangeEvent>) {
        super(properties);
        if (properties) {
            if (properties.typ) { this.typ = properties.typ }
            if (properties.matchKey) { this.matchKey = properties.matchKey }
            if (properties.info) { this.info = TableInfo.create(properties.info) as any }
        }
	}
    @protobuf.Field.d(1, TableChangeType, "optional", TableChangeType.TableChangeStart)
    public typ?: TableChangeType|null = TableChangeType.TableChangeStart
    @protobuf.Field.d(2, "string", "optional", )
    public matchKey?: string|null = ""
    @protobuf.Field.d(3, "tss_match_v2_commonevent_TableInfo", "optional")
    public info?: TableInfo|null
}
export interface IClearInvalidMatchEvent {
    _type?: number|null
    keys?: string[]
}
@protobuf.Type.d("tss_match_v2_commonevent_ClearInvalidMatchEvent")
export class ClearInvalidMatchEvent extends protobuf.Message<IClearInvalidMatchEvent> {
    constructor(properties: Properties<IClearInvalidMatchEvent>) {
        super(properties);
        if (properties) {
            if (properties._type) { this._type = properties._type }
            if (properties.keys) { this.keys = []; properties.keys.forEach((value, index)=>{this.keys[index] = properties.keys[index]})}
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public _type?: number|null = 0
    @protobuf.Field.d(2, "string", "repeated", [])
    public keys?: string[] = []
}
export interface IUserTableEndEvent {
    endTime?: number|null
    uid?: number|null
    winningResult?: number|null
    otherUids?: number[]
}
@protobuf.Type.d("tss_match_v2_commonevent_UserTableEndEvent")
export class UserTableEndEvent extends protobuf.Message<IUserTableEndEvent> {
    constructor(properties: Properties<IUserTableEndEvent>) {
        super(properties);
        if (properties) {
            if (properties.endTime) { this.endTime = properties.endTime }
            if (properties.uid) { this.uid = properties.uid }
            if (properties.winningResult) { this.winningResult = properties.winningResult }
            if (properties.otherUids) { this.otherUids = []; properties.otherUids.forEach((value, index)=>{this.otherUids[index] = properties.otherUids[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public endTime?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(3, "int32", "optional", 0)
    public winningResult?: number|null = 0
    @protobuf.Field.d(4, "int64", "repeated", [])
    public otherUids?: number[] = []
}
export interface IUpdateSessionConfig {
    sessionId?: string|null
}
@protobuf.Type.d("tss_match_v2_commonevent_UpdateSessionConfig")
export class UpdateSessionConfig extends protobuf.Message<IUpdateSessionConfig> {
    constructor(properties: Properties<IUpdateSessionConfig>) {
        super(properties);
        if (properties) {
            if (properties.sessionId) { this.sessionId = properties.sessionId }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public sessionId?: string|null = ""
}
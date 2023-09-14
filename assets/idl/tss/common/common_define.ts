import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
export enum State {  
    StateUnknown = 0,  
    StateOnline = 1,  
    StateOffline = 2,  
    StatePending = 3,
}
export enum OS {  
    OSUnknown = 0,  
    OSiOS = 1,  
    OSAndroid = 2,  
    OSWin32 = 3,
}
export enum SysModules {  
    SysModules_Unknown = 0,  
    SysModules_Prop = 1,  
    SysModules_VIP = 2,
}
export enum ExpireType {  
    ExpireTypeUnknown = 0,  
    ExpireTypeDuration = 1,  
    ExpireTypeTime = 2,
}
export enum ItemType {  
    ItemTypeUnknown = 0,  
    ItemTypeProp = 1,  
    ItemTypeMung = 2,  
    ItemTypeCoin = 3,
}
export enum Sign {  
    SignUnknown = 0,  
    SignCredit = 1,  
    SignDebit = 2,
}
export enum Way {  
    WayNone = 0,  
    WayIncMatch = 1,  
    WayIncCMS = 2,  
    WayIncMall = 3,  
    WayIncSYS = 4,  
    WayIncActivity = 5,  
    WayIncVipWeal = 6,  
    WayIncVipPoint = 7,  
    WayIncCDK = 8,  
    WayIncGiftBag = 9,  
    WayIncTask = 10,  
    WayIncExchangePresent = 11,  
    WayIncBeginner = 12,  
    WayIncThirdPartRefund = 13,  
    WayIncMatchingRank = 14,  
    WayIncMatchingStreakWin = 15,  
    WayIncPrizeComment = 16,  
    WayIncUse = 17,  
    WayIncActivityDailyTask = 18,  
    WayIncActivityWeeklySign = 19,  
    WayIncActivityNewUserTask = 20,  
    WayIncRegularMatch = 21,  
    WayIncFastMatch = 22,  
    WayIncBreakthroughMatch = 23,  
    WayIncBettingMatch = 24,  
    WayIncStandingMatch = 25,  
    WayIncCustomMatch = 26,  
    WayReturnCustomMatch = 27,  
    WayIncMatchingMatch = 28,  
    WayIncOtherMatch = 30,  
    WayIncTicketExchangeMung = 31,  
    WayIncActivityInviterRebate = 32,  
    WayIncActivityProfitInvite = 33,  
    WayIncWeiChatFollowGift = 34,  
    WayIncWeiChatWealGift = 35,  
    WayIncActivityVIPAdd = 36,  
    WayIncActivityShared = 37,  
    WayIncActivityMailRecommended = 38,  
    WayIncExchange = 39,  
    WayIncFirstOrderPresent = 40,  
    WayIncTreeCollect = 41,  
    WayIncTreeSteal = 42,  
    WayIncTreeActivate = 43,  
    WayIncFreeGive = 44,  
    WayIncTreeGuardCollect = 45,  
    WayIncTreeMascotCollect = 46,  
    WayIncMarkupCard = 47,  
    WayIncRechargeGive = 48,  
    WayIncAdReward = 49,  
    WayIncGuess = 50,  
    WayIncWithdraw = 51,  
    WayIncLargess = 52,  
    WayIncInvite = 53,  
    WayIncVIPRecharge = 54,  
    WayIncQuestionnaire = 55,  
    WayMallPromotionAdd = 57,  
    WayIncLuckyBag = 58,  
    WayIncBankruptcy = 59,  
    WayIncLuckyBagCreator = 60,  
    WayIncMigrate = 61,  
    WayIncWeekRank = 62,  
    WayIncHonourReward = 63,  
    WayIncPopularityReward = 64,  
    WayIncUniqueItemCompensation = 65,  
    WayIncActivityNovice = 66,  
    WayIncPropBag = 67,  
    WayIncSendFriendPresent = 68,  
    WayIncPrizeDraw = 69,  
    WayIncVipLevelAward = 70,  
    WayIncVipWeeklyBenefit = 71,  
    WayIncPremiumcardDailyBenefit = 72,  
    WayIncPremiumcardRechargeReward = 73,  
    WayIncMallPurchaseBonus = 74,  
    WayIncUserTitleWinningStreakAward = 75,  
    WayIncNewMall = 76,  
    WayIncActivityJigsaw = 77,  
    WayIncActivityJigsawRollback = 78,  
    WayIncUserTitleLevelUpAward = 79,  
    WayIncUserPresent = 80,  
    WayIncCareerExpAward = 81,  
    WayIncVerifyIDCard = 82,  
    WayIncTaskReward = 83,  
    WayIncVipSubsidy = 84,  
    WayIncPropCompensation = 85,  
    WayIncLottery = 86,  
    WayDecUse = 100,  
    WayDecCMS = 101,  
    WayDecExpire = 102,  
    WayDecThirdPart = 103,  
    WayDecTree = 105,  
    WayDecCleanUp = 106,  
    WayDecMall = 107,  
    WayDecGuess = 108,  
    WayDecRegularMatch = 111,  
    WayDecFastMatch = 112,  
    WayDecBreakthroughMatch = 113,  
    WayDecBettingMatch = 114,  
    WayDecMatchingMatch = 115,  
    WayDecStandingMatch = 116,  
    WayDecCustomMatch = 117,  
    WayDecOtherMatch = 120,  
    WayDecMatchingMatchFee = 121,  
    WayDecTicketExchangeMung = 131,  
    WayDecLargess = 141,  
    WayDecWithdraw = 142,  
    WayDecLuckyBagCreator = 143,  
    WayDecMigrate = 144,  
    WayDecActivityWeeklySign = 145,  
    WayDecActivityNovice = 147,  
    WayIncPrizeDrawNoMoreUsed = 148,  
    WayDecPrizeDraw = 149,  
    WayDecSendFriendPresent = 150,  
    WayDecNewMall = 151,  
    WayDecActivityJigsaw = 152,  
    WayDecActivityJigsawRollback = 153,  
    WayDecInviteRollback = 154,  
    WayDecUserPresent = 155,  
    WayDecUpgradeCabinet = 156,  
    WayDecMailAwardFailRollback = 157,  
    WayDecExchange = 158,  
    WayDecInvalidProp = 159,  
    WayDecPropRecycle = 162,  
    WayIncRankSettle = 160,  
    WayIncRankLike = 161,  
    WayDecLottery = 163,
}
export enum AwardAcceptType {  
    AwardAcceptTypeUnknown = 0,  
    AwardAcceptTypeManualAccept = 1,  
    AwardAcceptTypeAutoAccept = 2,
}
export enum AwardAcceptDest {  
    AwardAcceptDestUnknown = 0,  
    AwardAcceptDestSysMail = 1,  
    AwardAcceptDestUserBag = 2,
}
export enum AwardAcceptStrategy {  
    AwardAwardAcceptStrategyDefault = 0,  
    AwardAwardAcceptStrategySelect = 1,
}
export enum AwardType {  
    AwardTypeUnknown = 0,  
    AwardTypeFixed = 1,  
    AwardTypeRandom = 2,
}
export enum VIPRewardType {  
    VIPRewardTypeUnknown = 0,  
    VIPRewardTypeClose = 1,  
    VIPRewardTypeDouble = 2,  
    VIPRewardTypeLevel = 3,
}
export enum UserGroupType {  
    UserGroupTypeUnknown = 0,  
    UserGroupTypeNormal = 1,  
    UserGroupTypeBlock = 2,
}
export enum PayChannel {  
    PayChannelUnknown = 0,  
    PayChannelGooglePay = 12,  
    PayChannelAliPayWap = 26,  
    PayChannelApple = 99,  
    PayChannelOPPOPAY = 215,  
    PayChannelAliPay = 265,  
    PayChannelWeChat = 431,  
    PayChannelWxPayJsApi = 520,  
    PayChannelVIVOPAY = 889,  
    PayChannelHuaWeiPay = 892,  
    PayChannelWxPayH5 = 898,  
    PayChannelWxPayMPJsApi = 899,  
    PayChannelApplePeriod = 913,  
    PayChannelAliPayPeriod = 914,  
    PayCHannelAliPayApp = 932,
}
export enum PropCategory {  
    PropCategoryUnknown = 0,  
    PropCategoryVoucher = 2000,  
    PropCategoryNormal = 3000,  
    PropCategoryTicket = 4000,  
    PropCategoryInteraction = 5000,  
    PropCategoryDress = 6000,  
    PropCategoryGift = 7000,  
    PropCategoryCoupon = 8000,  
    PropCategoryTress = 9000,  
    PropCategoryLargess = 10000,
}
export enum PropType {  
    PropTypeUnknown = 0,  
    PropTypeExclusiveVoucher = 2000,  
    PropTypeCommonVoucher = 2001,  
    PropTypeTopUpVoucher = 2002,  
    PropTypeGeneral = 3000,  
    PropTypeRenameCard = 3001,  
    PropTypeHorn = 3002,  
    PropTypeKickPlayer = 3003,  
    PropTypeReward = 3004,  
    PropTypeDouble = 3005,  
    PropTypeArchive = 3006,  
    PropTypeBuffTracker = 3007,  
    PropTypeCountTracker = 3008,  
    PropTypeExpAddBuffCard = 3009,  
    PropTypeBalanceAddBuffCard = 3010,  
    PropTypeNoDeductionCupBuffCard = 3011,  
    PropTypeDoubleExpAddCountCard = 3012,  
    PropTypeBalanceAddCountCard = 3013,  
    PropTypeNoDeductionCupCountCard = 3014,  
    PropTypeReviveCard = 3015,  
    PropTypeVipCard = 3016,  
    PropTypeFreeShippingVoucher = 3017,  
    PropTypeMungAddBuffCard = 3018,  
    PropTypePriorityCard = 3023,  
    PropTypePriorityCardCount = 3024,  
    PropTypePremiumCard = 3025,  
    PropTypeJigsaw = 3026,  
    PropTypeProtectWinningStreakBuffCard = 3028,  
    PropTypeProtectWinningStreakCardCount = 3029,  
    PropTypeTicket = 4000,  
    PropTypeRegularMatchTicket = 4001,  
    PropTypeFastMatchTicket = 4002,  
    PropTypeWeeklyMatchTicket = 4003,  
    PropTypePIPCount = 5000,  
    PropTypePIPBuff = 5001,  
    PropTypeDressHead = 6000,  
    PropTypeDressChatBubble = 6001,  
    PropTypeDressEmoticon = 6002,  
    PropTypeDressSceneSkin = 6003,  
    PropTypeDressGameSkin = 6004,  
    PropTypeDressDialectVoice = 6005,  
    PropTypeGiftDirectlyOpen = 7000,  
    PropTypeGiftManuallyOpen = 7001,  
    PropTypeCoupon = 8000,  
    PropTypeDeductionCoupon = 8001,  
    PropTypeDiscountCoupon = 8002,  
    PropTypeMTreeSunshineCard = 9001,  
    PropTypeMTreeIntimacyCard = 9002,  
    PropTypeMTreeFertilizerCard = 9003,  
    PropTypeLargessThumb = 10001,  
    PropTypeLargessLove = 10002,  
    PropTypeLargessStar = 10003,  
    PropTypeLargessFlower = 10004,  
    PropTypeLargessFireworks = 10005,  
    PropTypeLargessAirplane = 10006,  
    PropTypeLargessSixSixSix = 10007,  
    PropTypeLargessRocket = 10008,  
    PropTypeLargessRocketMeteor = 10009,  
    PropTypeLargessRocketSalute = 10010,  
    PropTypeLargessSportsCar = 10011,
}
export enum AssetType {  
    AssetTypeUnknown = 0,  
    AssetTypeFree = 1,  
    AssetTypeProp = 2,  
    AssetTypeDiamond = 3,  
    AssetTypeMung = 4,  
    AssetTypeCoin = 5,  
    AssetTypePoint = 6,  
    AssetTypePopularity = 7,  
    AssetTypeEarning = 8,  
    AssetTypeGift = 9,  
    AssetTypeDress = 10,  
    AssetTypeHonourPoint = 11,
}
export enum RoleType {  
    RoleTypeUnknown = 0,  
    RoleTypeHost = 1,  
    RoleTypeGuest = 2,  
    RoleTypeViewer = 3,  
    RoleTypePlayer = 4,  
    RoleTypeAssistant = 5,
}
export enum WinningResult {  
    WinningResult_None = 0,  
    WinningResult_Win = 1,  
    WinningResult_Lose = 2,  
    WinningResult_Draw = 3,
}
export enum Gender {  
    GenderUnknown = 0,  
    GenderMale = 1,  
    GenderFemale = 2,
}
export enum SwitchState {  
    SwitchStateUnknown = 0,  
    SwitchStateOn = 1,  
    SwitchStateOff = 2,
}
export enum ComparisonOperator {  
    ComparisonUnknown = 0,  
    ComparisonGT = 1,  
    ComparisonGTE = 2,  
    ComparisonLT = 3,  
    ComparisonLTE = 4,  
    ComparisonEqual = 5,
}
export enum UserRobotFlag {  
    UserRobotFlagUnknown = 0,  
    UserRobotFlagPlayer = 1,  
    UserRobotFlagRobot = 2,  
    UserRobotFlagWhite = 3,
}
export enum GrantType {  
    GrantTypeDirectly = 0,  
    GrantTypeByMail = 1,
}
export interface IRange {
    start?: number|null
    end?: number|null
}
@protobuf.Type.d("tss_common_Range")
export class Range extends protobuf.Message<IRange> {
    constructor(properties: Properties<IRange>) {
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
export interface IMetadata {
    key?: string|null
    value?: string|null
    desc?: string|null
}
@protobuf.Type.d("tss_common_Metadata")
export class Metadata extends protobuf.Message<IMetadata> {
    constructor(properties: Properties<IMetadata>) {
        super(properties);
        if (properties) {
            if (properties.key) { this.key = properties.key }
            if (properties.value) { this.value = properties.value }
            if (properties.desc) { this.desc = properties.desc }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public key?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public value?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public desc?: string|null = ""
}
export interface IExpireData {
    type?: ExpireType|null
    value?: number|null
}
@protobuf.Type.d("tss_common_ExpireData")
export class ExpireData extends protobuf.Message<IExpireData> {
    constructor(properties: Properties<IExpireData>) {
        super(properties);
        if (properties) {
            if (properties.type) { this.type = properties.type }
            if (properties.value) { this.value = properties.value }
        }
	}
    @protobuf.Field.d(1, ExpireType, "optional", ExpireType.ExpireTypeUnknown)
    public type?: ExpireType|null = ExpireType.ExpireTypeUnknown
    @protobuf.Field.d(2, "int64", "optional", 0)
    public value?: number|null = 0
}
export interface IPropItem {
    propID?: number|null
    name?: string|null
    img?: string|null
    num?: number|null
    typeID?: number|null
    expire?: IExpireData
    desc?: string|null
    itemType?: ItemType|null
    icon?: string|null
}
@protobuf.Type.d("tss_common_PropItem")
export class PropItem extends protobuf.Message<IPropItem> {
    constructor(properties: Properties<IPropItem>) {
        super(properties);
        if (properties) {
            if (properties.propID) { this.propID = properties.propID }
            if (properties.name) { this.name = properties.name }
            if (properties.img) { this.img = properties.img }
            if (properties.num) { this.num = properties.num }
            if (properties.typeID) { this.typeID = properties.typeID }
            if (properties.expire) { this.expire = ExpireData.create(properties.expire) as any }
            if (properties.desc) { this.desc = properties.desc }
            if (properties.itemType) { this.itemType = properties.itemType }
            if (properties.icon) { this.icon = properties.icon }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public propID?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public img?: string|null = ""
    @protobuf.Field.d(4, "int32", "optional", 0)
    public num?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public typeID?: number|null = 0
    @protobuf.Field.d(6, "tss_common_ExpireData", "optional")
    public expire?: ExpireData|null
    @protobuf.Field.d(7, "string", "optional", )
    public desc?: string|null = ""
    @protobuf.Field.d(8, ItemType, "optional", ItemType.ItemTypeUnknown)
    public itemType?: ItemType|null = ItemType.ItemTypeUnknown
    @protobuf.Field.d(9, "string", "optional", )
    public icon?: string|null = ""
}
export interface IVIPLevelReward {
    level?: number|null
    multiple?: number|null
    name?: string|null
}
@protobuf.Type.d("tss_common_VIPLevelReward")
export class VIPLevelReward extends protobuf.Message<IVIPLevelReward> {
    constructor(properties: Properties<IVIPLevelReward>) {
        super(properties);
        if (properties) {
            if (properties.level) { this.level = properties.level }
            if (properties.multiple) { this.multiple = properties.multiple }
            if (properties.name) { this.name = properties.name }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public level?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public multiple?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public name?: string|null = ""
}
export interface ISysMailBody {
    title?: string|null
    content?: string|null
    expire?: IExpireData
    reason?: string|null
    templateType?: number|null
}
@protobuf.Type.d("tss_common_SysMailBody")
export class SysMailBody extends protobuf.Message<ISysMailBody> {
    constructor(properties: Properties<ISysMailBody>) {
        super(properties);
        if (properties) {
            if (properties.title) { this.title = properties.title }
            if (properties.content) { this.content = properties.content }
            if (properties.expire) { this.expire = ExpireData.create(properties.expire) as any }
            if (properties.reason) { this.reason = properties.reason }
            if (properties.templateType) { this.templateType = properties.templateType }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public title?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public content?: string|null = ""
    @protobuf.Field.d(3, "tss_common_ExpireData", "optional")
    public expire?: ExpireData|null
    @protobuf.Field.d(4, "string", "optional", )
    public reason?: string|null = ""
    @protobuf.Field.d(5, "int32", "optional", 0)
    public templateType?: number|null = 0
}
export interface IAwardAcceptConf {
    awardAcceptType?: AwardAcceptType|null
    awardAcceptDest?: AwardAcceptDest|null
    sysMailBody?: ISysMailBody
    awardAcceptStrategy?: AwardAcceptStrategy|null
    selectNum?: number|null
}
@protobuf.Type.d("tss_common_AwardAcceptConf")
export class AwardAcceptConf extends protobuf.Message<IAwardAcceptConf> {
    constructor(properties: Properties<IAwardAcceptConf>) {
        super(properties);
        if (properties) {
            if (properties.awardAcceptType) { this.awardAcceptType = properties.awardAcceptType }
            if (properties.awardAcceptDest) { this.awardAcceptDest = properties.awardAcceptDest }
            if (properties.sysMailBody) { this.sysMailBody = SysMailBody.create(properties.sysMailBody) as any }
            if (properties.awardAcceptStrategy) { this.awardAcceptStrategy = properties.awardAcceptStrategy }
            if (properties.selectNum) { this.selectNum = properties.selectNum }
        }
	}
    @protobuf.Field.d(1, AwardAcceptType, "optional", AwardAcceptType.AwardAcceptTypeUnknown)
    public awardAcceptType?: AwardAcceptType|null = AwardAcceptType.AwardAcceptTypeUnknown
    @protobuf.Field.d(2, AwardAcceptDest, "optional", AwardAcceptDest.AwardAcceptDestUnknown)
    public awardAcceptDest?: AwardAcceptDest|null = AwardAcceptDest.AwardAcceptDestUnknown
    @protobuf.Field.d(5, "tss_common_SysMailBody", "optional")
    public sysMailBody?: SysMailBody|null
    @protobuf.Field.d(6, AwardAcceptStrategy, "optional", AwardAcceptStrategy.AwardAwardAcceptStrategyDefault)
    public awardAcceptStrategy?: AwardAcceptStrategy|null = AwardAcceptStrategy.AwardAwardAcceptStrategyDefault
    @protobuf.Field.d(7, "int64", "optional", 0)
    public selectNum?: number|null = 0
}
export interface IMoney {
    amount?: number|null
    currency?: string|null
    decimal?: number|null
}
@protobuf.Type.d("tss_common_Money")
export class Money extends protobuf.Message<IMoney> {
    constructor(properties: Properties<IMoney>) {
        super(properties);
        if (properties) {
            if (properties.amount) { this.amount = properties.amount }
            if (properties.currency) { this.currency = properties.currency }
            if (properties.decimal) { this.decimal = properties.decimal }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public amount?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public currency?: string|null = ""
    @protobuf.Field.d(3, "int64", "optional", 0)
    public decimal?: number|null = 0
}
export interface IAssetExchangeRate {
    amount?: number|null
    money?: IMoney
}
@protobuf.Type.d("tss_common_AssetExchangeRate")
export class AssetExchangeRate extends protobuf.Message<IAssetExchangeRate> {
    constructor(properties: Properties<IAssetExchangeRate>) {
        super(properties);
        if (properties) {
            if (properties.amount) { this.amount = properties.amount }
            if (properties.money) { this.money = Money.create(properties.money) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public amount?: number|null = 0
    @protobuf.Field.d(2, "tss_common_Money", "optional")
    public money?: Money|null
}
export interface IProp {
    id?: number|null
    amount?: number|null
    type?: PropType|null
    img?: string|null
    icon?: string|null
    desc?: string|null
    expire?: IExpireData
}
@protobuf.Type.d("tss_common_Prop")
export class Prop extends protobuf.Message<IProp> {
    constructor(properties: Properties<IProp>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.amount) { this.amount = properties.amount }
            if (properties.type) { this.type = properties.type }
            if (properties.img) { this.img = properties.img }
            if (properties.icon) { this.icon = properties.icon }
            if (properties.desc) { this.desc = properties.desc }
            if (properties.expire) { this.expire = ExpireData.create(properties.expire) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public id?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public amount?: number|null = 0
    @protobuf.Field.d(3, PropType, "optional", PropType.PropTypeUnknown)
    public type?: PropType|null = PropType.PropTypeUnknown
    @protobuf.Field.d(4, "string", "optional", )
    public img?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public icon?: string|null = ""
    @protobuf.Field.d(6, "string", "optional", )
    public desc?: string|null = ""
    @protobuf.Field.d(7, "tss_common_ExpireData", "optional")
    public expire?: ExpireData|null
}
export interface IAssetItem {
    id?: number|null
    amount?: number|null
    img?: string|null
    icon?: string|null
    desc?: string|null
    expire?: IExpireData
    name?: string|null
    type?: AssetType|null
    meta?: { [k: string]: string|null }
}
@protobuf.Type.d("tss_common_AssetItem")
export class AssetItem extends protobuf.Message<IAssetItem> {
    constructor(properties: Properties<IAssetItem>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.amount) { this.amount = properties.amount }
            if (properties.img) { this.img = properties.img }
            if (properties.icon) { this.icon = properties.icon }
            if (properties.desc) { this.desc = properties.desc }
            if (properties.expire) { this.expire = ExpireData.create(properties.expire) as any }
            if (properties.name) { this.name = properties.name }
            if (properties.type) { this.type = properties.type }
            if (properties.meta) { this.meta = properties.meta }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public id?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public amount?: number|null = 0
    @protobuf.Field.d(4, "string", "optional", )
    public img?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public icon?: string|null = ""
    @protobuf.Field.d(6, "string", "optional", )
    public desc?: string|null = ""
    @protobuf.Field.d(7, "tss_common_ExpireData", "optional")
    public expire?: ExpireData|null
    @protobuf.Field.d(8, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(9, AssetType, "optional", AssetType.AssetTypeUnknown)
    public type?: AssetType|null = AssetType.AssetTypeUnknown
    @protobuf.MapField.d(10, "string", "string")
    public meta?: { [k: string]: string|null } = {}
}
export interface IAsset {
    props?: IAssetItem[]
    diamond?: IAssetItem
    coin?: IAssetItem
    mung?: IAssetItem
    gift?: IAssetItem[]
    dress?: IAssetItem[]
    honourPoint?: IAssetItem
}
@protobuf.Type.d("tss_common_Asset")
export class Asset extends protobuf.Message<IAsset> {
    constructor(properties: Properties<IAsset>) {
        super(properties);
        if (properties) {
            if (properties.props) { this.props = []; properties.props.forEach((value, index)=>{this.props[index] = AssetItem.create(properties.props[index]) as any})}
            if (properties.diamond) { this.diamond = AssetItem.create(properties.diamond) as any }
            if (properties.coin) { this.coin = AssetItem.create(properties.coin) as any }
            if (properties.mung) { this.mung = AssetItem.create(properties.mung) as any }
            if (properties.gift) { this.gift = []; properties.gift.forEach((value, index)=>{this.gift[index] = AssetItem.create(properties.gift[index]) as any})}
            if (properties.dress) { this.dress = []; properties.dress.forEach((value, index)=>{this.dress[index] = AssetItem.create(properties.dress[index]) as any})}
            if (properties.honourPoint) { this.honourPoint = AssetItem.create(properties.honourPoint) as any }
        }
	}
    @protobuf.Field.d(1, "tss_common_AssetItem", "repeated")
    public props?: AssetItem[] = []
    @protobuf.Field.d(2, "tss_common_AssetItem", "optional")
    public diamond?: AssetItem|null
    @protobuf.Field.d(3, "tss_common_AssetItem", "optional")
    public coin?: AssetItem|null
    @protobuf.Field.d(4, "tss_common_AssetItem", "optional")
    public mung?: AssetItem|null
    @protobuf.Field.d(5, "tss_common_AssetItem", "repeated")
    public gift?: AssetItem[] = []
    @protobuf.Field.d(6, "tss_common_AssetItem", "repeated")
    public dress?: AssetItem[] = []
    @protobuf.Field.d(7, "tss_common_AssetItem", "optional")
    public honourPoint?: AssetItem|null
}
export interface IParameter {
    intVal?: number|null
    strVal?: string|null
    switch?: SwitchState|null
    assetItems?: IAssetItem[]
}
@protobuf.Type.d("tss_common_Parameter")
export class Parameter extends protobuf.Message<IParameter> {
    constructor(properties: Properties<IParameter>) {
        super(properties);
        if (properties) {
            if (properties.intVal) { this.intVal = properties.intVal }
            if (properties.strVal) { this.strVal = properties.strVal }
            if (properties.switch) { this.switch = properties.switch }
            if (properties.assetItems) { this.assetItems = []; properties.assetItems.forEach((value, index)=>{this.assetItems[index] = AssetItem.create(properties.assetItems[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public intVal?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public strVal?: string|null = ""
    @protobuf.Field.d(3, SwitchState, "optional", SwitchState.SwitchStateUnknown)
    public switch?: SwitchState|null = SwitchState.SwitchStateUnknown
    @protobuf.Field.d(4, "tss_common_AssetItem", "repeated")
    public assetItems?: AssetItem[] = []
}
export interface IAppConfig {
    key?: string|null
    desc?: string|null
    switch?: SwitchState|null
    param?: IParameter
    operator?: string|null
    updateAt?: number|null
}
@protobuf.Type.d("tss_common_AppConfig")
export class AppConfig extends protobuf.Message<IAppConfig> {
    constructor(properties: Properties<IAppConfig>) {
        super(properties);
        if (properties) {
            if (properties.key) { this.key = properties.key }
            if (properties.desc) { this.desc = properties.desc }
            if (properties.switch) { this.switch = properties.switch }
            if (properties.param) { this.param = Parameter.create(properties.param) as any }
            if (properties.operator) { this.operator = properties.operator }
            if (properties.updateAt) { this.updateAt = properties.updateAt }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public key?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public desc?: string|null = ""
    @protobuf.Field.d(3, SwitchState, "optional", SwitchState.SwitchStateUnknown)
    public switch?: SwitchState|null = SwitchState.SwitchStateUnknown
    @protobuf.Field.d(4, "tss_common_Parameter", "optional")
    public param?: Parameter|null
    @protobuf.Field.d(5, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(6, "int64", "optional", 0)
    public updateAt?: number|null = 0
}
import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  Void as base_Void,IVoid as base_IVoid ,  BatchGetResourceReq as base_BatchGetResourceReq,IBatchGetResourceReq as base_IBatchGetResourceReq ,  BatchGetResourceResp as base_BatchGetResourceResp,IBatchGetResourceResp as base_IBatchGetResourceResp ,  } from "idl/base/base"
import {  PaidReq as mp_pay_callback_trade_v1_PaidReq,IPaidReq as mp_pay_callback_trade_v1_IPaidReq ,  PaidResp as mp_pay_callback_trade_v1_PaidResp,IPaidResp as mp_pay_callback_trade_v1_IPaidResp ,  } from "idl/mp/pay/callback/trade.v1"
import {  PayChannel as mp_pay_trade_v1_PayChannel ,  DeviceInfo as mp_pay_trade_v1_DeviceInfo,IDeviceInfo as mp_pay_trade_v1_IDeviceInfo ,  Charge as mp_pay_trade_v1_Charge,ICharge as mp_pay_trade_v1_ICharge ,  } from "idl/mp/pay/trade.v1"
import {  SwitchState as tss_common_SwitchState ,  AssetItem as tss_common_AssetItem,IAssetItem as tss_common_IAssetItem ,  State as tss_common_State ,  AssetType as tss_common_AssetType ,  } from "idl/tss/common/common_define"
import {  ActivityBase as tss_hall_common_ActivityBase,IActivityBase as tss_hall_common_IActivityBase ,  ActivityType as tss_hall_common_ActivityType ,  ActivityOnlineType as tss_hall_common_ActivityOnlineType ,  } from "idl/tss/hall/common/activity"
import {  PremiumCardType as tss_hall_common_PremiumCardType ,  } from "idl/tss/hall/common/premiumcard"
import {  Price as tss_hall_common_Price,IPrice as tss_hall_common_IPrice ,  } from "idl/tss/hall/common/prizemall"
export enum SPUType {  
    SPUTypeUnknown = 0,  
    SPUTypeCoin = 1,  
    SPUTypeDiamond = 2,  
    SPUTypeProp = 3,  
    SPUTypeGift = 4,  
    SPUTypePremiumCard = 5,  
    SPUTypeLargess = 6,  
    SPUTypeDress = 7,
}
export enum ResType {  
    ResTypeUnknown = 0,  
    ResTypeProp = 1,  
    ResTypeUserDress = 2,  
    ResTypeDiamond = 3,  
    ResTypeCoin = 4,  
    ResTypeLargess = 5,  
    ResTypePremiumCard = 6,  
    ResTypeRecommend = 7,  
    ResTypeCurrency = 8,  
    ResTypeUserDressPoke = 9,  
    ResTypeUserDressMahjong = 10,  
    ResTypeUserDressBody = 11,
}
export enum SpuBelongType {  
    SpuBelongUnknown = 0,  
    SpuBelongMallList = 1,  
    SpuBelongPremiumCardIntro = 2,  
    SpuBelongLargessList = 3,  
    SpuBelongFirstCharge = 4,  
    SpuBelongBankruptcyFirstCharge = 5,  
    SpuBelongBankruptcySupport = 6,  
    SpuUserPresent = 7,  
    SpuBelongPremiumCardVIPIntro = 8,
}
export enum SpuTag {  
    SpuTagUnknown = 0,  
    SpuTagHot = 1,
}
export enum SpuSpecTag {  
    SpuSpecTagUnknown = 0,  
    SpuSpecTagFree = 1,
}
export enum TabType {  
    TabTypeUnknown = 0,  
    TabTypeMallList = 1,  
    TabTypePresentList = 2,
}
export enum SKUType {  
    SKUTypeUnknown = 0,  
    SKUTypePremiumCard = 1,  
    SKUTypeVirtualAsset = 2,
}
export enum PeriodType {  
    PeriodTypeUnknown = 0,  
    PeriodTypeDaily = 1,  
    PeriodTypeWeek = 2,  
    PeriodTypeMonth = 3,  
    PeriodTypeForever = 4,
}
export enum DiscountType {  
    DiscountTypeUnknown = 0,  
    DiscountTypeFirstGlobal = 1,  
    DiscountTypeFirstSpu = 2,  
    DiscountTypeAlways = 3,  
    DiscountTypeFirstSpuType = 4,
}
export enum AdditionalImg {  
    AdditionalImgUnknown = 0,  
    AdditionalImgDeskWallpaperLandscape = 1,  
    AdditionalImgDeskWallpaperPortrait = 2,
}
export enum PaymentType {  
    PaymentTypeKnown = 0,  
    PaymentTypeRMB = 1,  
    PaymentTypeVirtualAsset = 2,
}
export enum DeliveryState {  
    DeliveryStateUnknown = 0,  
    DeliveryStatePending = 1,  
    DeliveryStateFailed = 2,  
    DeliveryStateSuccess = 3,
}
export enum PayState {  
    PayStateUnknown = 0,  
    PayStatePending = 1,  
    PayStateFailed = 2,  
    PayStateSucceeded = 3,  
    PayStateRefunding = 4,  
    PayStateRefundSuccess = 5,  
    PayStateRejectRefund = 6,
}
export enum OrderState {  
    OrderStateUnknown = 0,  
    OrderStateOpen = 1,  
    OrderStateSuccess = 2,  
    OrderStateCancel = 3,  
    OrderStateClose = 4,
}
export enum EventType {  
    EventTypeUnknown = 0,  
    EventTypePaySuccess = 1,  
    EventTypePayFailed = 2,  
    EventTypeOrderSuccess = 3,  
    EventTypeOrderCancel = 4,  
    EventTypeRefunding = 5,  
    EventTypeDeliverySuccess = 7,  
    EventTypeDeliveryFailed = 8,  
    EventTypeRefundFinish = 14,  
    EventTypeOrderClose = 15,
}
export enum ImMessageType {  
    ImMessageTypeUnknown = 0,  
    ImMessageTypeSendUserPresent = 1,  
    ImMessageTypeAskUserPresent = 2,
}
export interface ICommon {
    priority?: number|null
    appID?: string[]
    createAt?: number|null
    updateAt?: number|null
    operator?: string|null
    minVersion?: number|null
    maxVersion?: number|null
}
@protobuf.Type.d("tss_hall_mall_v2_Common")
export class Common extends protobuf.Message<ICommon> {
    constructor(properties: Properties<ICommon>) {
        super(properties);
        if (properties) {
            if (properties.priority) { this.priority = properties.priority }
            if (properties.appID) { this.appID = []; properties.appID.forEach((value, index)=>{this.appID[index] = properties.appID[index]})}
            if (properties.createAt) { this.createAt = properties.createAt }
            if (properties.updateAt) { this.updateAt = properties.updateAt }
            if (properties.operator) { this.operator = properties.operator }
            if (properties.minVersion) { this.minVersion = properties.minVersion }
            if (properties.maxVersion) { this.maxVersion = properties.maxVersion }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public priority?: number|null = 0
    @protobuf.Field.d(2, "string", "repeated", [])
    public appID?: string[] = []
    @protobuf.Field.d(3, "int64", "optional", 0)
    public createAt?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public updateAt?: number|null = 0
    @protobuf.Field.d(5, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(6, "int64", "optional", 0)
    public minVersion?: number|null = 0
    @protobuf.Field.d(7, "int64", "optional", 0)
    public maxVersion?: number|null = 0
}
export interface ILimitConf {
    switch?: tss_common_SwitchState|null
    type?: PeriodType|null
    targetValue?: number|null
    buyTimes?: number|null
}
@protobuf.Type.d("tss_hall_mall_v2_LimitConf")
export class LimitConf extends protobuf.Message<ILimitConf> {
    constructor(properties: Properties<ILimitConf>) {
        super(properties);
        if (properties) {
            if (properties.switch) { this.switch = properties.switch }
            if (properties.type) { this.type = properties.type }
            if (properties.targetValue) { this.targetValue = properties.targetValue }
            if (properties.buyTimes) { this.buyTimes = properties.buyTimes }
        }
	}
    @protobuf.Field.d(1, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public switch?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
    @protobuf.Field.d(2, PeriodType, "optional", PeriodType.PeriodTypeUnknown)
    public type?: PeriodType|null = PeriodType.PeriodTypeUnknown
    @protobuf.Field.d(3, "int64", "optional", 0)
    public targetValue?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public buyTimes?: number|null = 0
}
export interface ITab {
    ID?: string|null
    name?: string|null
    commonInfo?: ICommon
    category?: SPUType[]
    effectAt?: number|null
    expireAt?: number|null
    desc?: string|null
    tags?: string[]
    resType?: ResType|null
    tabType?: TabType|null
}
@protobuf.Type.d("tss_hall_mall_v2_Tab")
export class Tab extends protobuf.Message<ITab> {
    constructor(properties: Properties<ITab>) {
        super(properties);
        if (properties) {
            if (properties.ID) { this.ID = properties.ID }
            if (properties.name) { this.name = properties.name }
            if (properties.commonInfo) { this.commonInfo = Common.create(properties.commonInfo) as any }
            if (properties.category) { this.category = []; properties.category.forEach((value, index)=>{this.category[index] = properties.category[index]})}
            if (properties.effectAt) { this.effectAt = properties.effectAt }
            if (properties.expireAt) { this.expireAt = properties.expireAt }
            if (properties.desc) { this.desc = properties.desc }
            if (properties.tags) { this.tags = []; properties.tags.forEach((value, index)=>{this.tags[index] = properties.tags[index]})}
            if (properties.resType) { this.resType = properties.resType }
            if (properties.tabType) { this.tabType = properties.tabType }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public ID?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(3, "tss_hall_mall_v2_Common", "optional")
    public commonInfo?: Common|null
    @protobuf.Field.d(4, SPUType, "repeated", SPUType.SPUTypeUnknown)
    public category?: SPUType[] = []
    @protobuf.Field.d(6, "int64", "optional", 0)
    public effectAt?: number|null = 0
    @protobuf.Field.d(7, "int64", "optional", 0)
    public expireAt?: number|null = 0
    @protobuf.Field.d(8, "string", "optional", )
    public desc?: string|null = ""
    @protobuf.Field.d(9, "string", "repeated", [])
    public tags?: string[] = []
    @protobuf.Field.d(10, ResType, "optional", ResType.ResTypeUnknown)
    public resType?: ResType|null = ResType.ResTypeUnknown
    @protobuf.Field.d(11, TabType, "optional", TabType.TabTypeUnknown)
    public tabType?: TabType|null = TabType.TabTypeUnknown
}
export interface IVipConf {
    switch?: tss_common_SwitchState|null
    level?: number|null
}
@protobuf.Type.d("tss_hall_mall_v2_VipConf")
export class VipConf extends protobuf.Message<IVipConf> {
    constructor(properties: Properties<IVipConf>) {
        super(properties);
        if (properties) {
            if (properties.switch) { this.switch = properties.switch }
            if (properties.level) { this.level = properties.level }
        }
	}
    @protobuf.Field.d(1, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public switch?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
    @protobuf.Field.d(2, "int64", "optional", 0)
    public level?: number|null = 0
}
export interface IPremiumCardConf {
    switch?: tss_common_SwitchState|null
    cardType?: tss_hall_common_PremiumCardType|null
}
@protobuf.Type.d("tss_hall_mall_v2_PremiumCardConf")
export class PremiumCardConf extends protobuf.Message<IPremiumCardConf> {
    constructor(properties: Properties<IPremiumCardConf>) {
        super(properties);
        if (properties) {
            if (properties.switch) { this.switch = properties.switch }
            if (properties.cardType) { this.cardType = properties.cardType }
        }
	}
    @protobuf.Field.d(1, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public switch?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
    @protobuf.Field.d(2, tss_hall_common_PremiumCardType, "optional", tss_hall_common_PremiumCardType.PremiumCardTypeUnknown)
    public cardType?: tss_hall_common_PremiumCardType|null = tss_hall_common_PremiumCardType.PremiumCardTypeUnknown
}
export interface IDiscountConf {
    switch?: tss_common_SwitchState|null
    type?: DiscountType|null
    priceValue?: number|null
}
@protobuf.Type.d("tss_hall_mall_v2_DiscountConf")
export class DiscountConf extends protobuf.Message<IDiscountConf> {
    constructor(properties: Properties<IDiscountConf>) {
        super(properties);
        if (properties) {
            if (properties.switch) { this.switch = properties.switch }
            if (properties.type) { this.type = properties.type }
            if (properties.priceValue) { this.priceValue = properties.priceValue }
        }
	}
    @protobuf.Field.d(1, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public switch?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
    @protobuf.Field.d(2, DiscountType, "optional", DiscountType.DiscountTypeUnknown)
    public type?: DiscountType|null = DiscountType.DiscountTypeUnknown
    @protobuf.Field.d(3, "int64", "optional", 0)
    public priceValue?: number|null = 0
}
export interface IProduct {
    asset?: tss_common_IAssetItem
    unitDuration?: number|null
}
@protobuf.Type.d("tss_hall_mall_v2_Product")
export class Product extends protobuf.Message<IProduct> {
    constructor(properties: Properties<IProduct>) {
        super(properties);
        if (properties) {
            if (properties.asset) { this.asset = tss_common_AssetItem.create(properties.asset) as any }
            if (properties.unitDuration) { this.unitDuration = properties.unitDuration }
        }
	}
    @protobuf.Field.d(2, "tss_common_AssetItem", "optional")
    public asset?: tss_common_AssetItem|null
    @protobuf.Field.d(3, "int64", "optional", 0)
    public unitDuration?: number|null = 0
}
export interface IActivityConf {
    Id?: number|null
    base?: tss_hall_common_IActivityBase
}
@protobuf.Type.d("tss_hall_mall_v2_ActivityConf")
export class ActivityConf extends protobuf.Message<IActivityConf> {
    constructor(properties: Properties<IActivityConf>) {
        super(properties);
        if (properties) {
            if (properties.Id) { this.Id = properties.Id }
            if (properties.base) { this.base = tss_hall_common_ActivityBase.create(properties.base) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public Id?: number|null = 0
    @protobuf.Field.d(2, "tss_hall_common_ActivityBase", "optional")
    public base?: tss_hall_common_ActivityBase|null
}
export interface IPopConf {
    timer?: number|null
    popPeriodType?: PeriodType|null
    popTimes?: number|null
    popSwitch?: tss_common_SwitchState|null
}
@protobuf.Type.d("tss_hall_mall_v2_PopConf")
export class PopConf extends protobuf.Message<IPopConf> {
    constructor(properties: Properties<IPopConf>) {
        super(properties);
        if (properties) {
            if (properties.timer) { this.timer = properties.timer }
            if (properties.popPeriodType) { this.popPeriodType = properties.popPeriodType }
            if (properties.popTimes) { this.popTimes = properties.popTimes }
            if (properties.popSwitch) { this.popSwitch = properties.popSwitch }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public timer?: number|null = 0
    @protobuf.Field.d(2, PeriodType, "optional", PeriodType.PeriodTypeUnknown)
    public popPeriodType?: PeriodType|null = PeriodType.PeriodTypeUnknown
    @protobuf.Field.d(3, "int64", "optional", 0)
    public popTimes?: number|null = 0
    @protobuf.Field.d(4, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public popSwitch?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
}
export interface ISKU {
    ID?: string|null
    genderSwitch?: tss_common_SwitchState|null
    female?: IProduct
    male?: IProduct
    androgynous?: IProduct
    type?: SKUType|null
    price?: tss_hall_common_IPrice
    img?: string|null
    premiumCardOnlySwitch?: tss_common_SwitchState|null
    additionalImg?: { [k: string]: string|null }
}
@protobuf.Type.d("tss_hall_mall_v2_SKU")
export class SKU extends protobuf.Message<ISKU> {
    constructor(properties: Properties<ISKU>) {
        super(properties);
        if (properties) {
            if (properties.ID) { this.ID = properties.ID }
            if (properties.genderSwitch) { this.genderSwitch = properties.genderSwitch }
            if (properties.female) { this.female = Product.create(properties.female) as any }
            if (properties.male) { this.male = Product.create(properties.male) as any }
            if (properties.androgynous) { this.androgynous = Product.create(properties.androgynous) as any }
            if (properties.type) { this.type = properties.type }
            if (properties.price) { this.price = tss_hall_common_Price.create(properties.price) as any }
            if (properties.img) { this.img = properties.img }
            if (properties.premiumCardOnlySwitch) { this.premiumCardOnlySwitch = properties.premiumCardOnlySwitch }
            if (properties.additionalImg) { this.additionalImg = properties.additionalImg }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public ID?: string|null = ""
    @protobuf.Field.d(2, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public genderSwitch?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
    @protobuf.Field.d(3, "tss_hall_mall_v2_Product", "optional")
    public female?: Product|null
    @protobuf.Field.d(4, "tss_hall_mall_v2_Product", "optional")
    public male?: Product|null
    @protobuf.Field.d(5, "tss_hall_mall_v2_Product", "optional")
    public androgynous?: Product|null
    @protobuf.Field.d(6, SKUType, "optional", SKUType.SKUTypeUnknown)
    public type?: SKUType|null = SKUType.SKUTypeUnknown
    @protobuf.Field.d(7, "tss_hall_common_Price", "optional")
    public price?: tss_hall_common_Price|null
    @protobuf.Field.d(8, "string", "optional", )
    public img?: string|null = ""
    @protobuf.Field.d(9, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public premiumCardOnlySwitch?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
    @protobuf.MapField.d(27, "int64", "string")
    public additionalImg?: { [k: string]: string|null } = {}
}
export interface IUserBriefActivity {
    id?: number|null
    base?: tss_hall_common_IActivityBase
}
@protobuf.Type.d("tss_hall_mall_v2_UserBriefActivity")
export class UserBriefActivity extends protobuf.Message<IUserBriefActivity> {
    constructor(properties: Properties<IUserBriefActivity>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.base) { this.base = tss_hall_common_ActivityBase.create(properties.base) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public id?: number|null = 0
    @protobuf.Field.d(2, "tss_hall_common_ActivityBase", "optional")
    public base?: tss_hall_common_ActivityBase|null
}
export interface ISPU {
    id?: number|null
    sku?: ISKU
    category?: SPUType|null
    present?: ISKU[]
    name?: string|null
    desc?: string|null
    RMBWorth?: number|null
    tags?: string[]
    LimitConf?: ILimitConf
    categoryName?: string|null
    commonInfo?: ICommon
    beginAt?: number|null
    endAt?: number|null
    listImage?: string|null
    effectAt?: number|null
    expireAt?: number|null
    discountConf?: IDiscountConf
    vipConf?: IVipConf
    thirdPartySpuId?: string|null
    unmatchedTab?: string[]
    belongType?: SpuBelongType|null
    presentAmt?: number|null
    meta?: { [k: string]: string|null }
    spuTag?: SpuTag|null
    spuSpecTag?: SpuSpecTag[]
    presentPercent?: number|null
    presentInfoShow?: string|null
    presentImg?: string|null
    firstSpuPercent?: number|null
    firstSpuInfoShow?: string|null
    firstSpuImg?: string|null
    firstSpuPresent?: ISKU[]
    premiumCardConf?: IPremiumCardConf
    historySpuCount?: number|null
}
@protobuf.Type.d("tss_hall_mall_v2_SPU")
export class SPU extends protobuf.Message<ISPU> {
    constructor(properties: Properties<ISPU>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.sku) { this.sku = SKU.create(properties.sku) as any }
            if (properties.category) { this.category = properties.category }
            if (properties.present) { this.present = []; properties.present.forEach((value, index)=>{this.present[index] = SKU.create(properties.present[index]) as any})}
            if (properties.name) { this.name = properties.name }
            if (properties.desc) { this.desc = properties.desc }
            if (properties.RMBWorth) { this.RMBWorth = properties.RMBWorth }
            if (properties.tags) { this.tags = []; properties.tags.forEach((value, index)=>{this.tags[index] = properties.tags[index]})}
            if (properties.LimitConf) { this.LimitConf = LimitConf.create(properties.LimitConf) as any }
            if (properties.categoryName) { this.categoryName = properties.categoryName }
            if (properties.commonInfo) { this.commonInfo = Common.create(properties.commonInfo) as any }
            if (properties.beginAt) { this.beginAt = properties.beginAt }
            if (properties.endAt) { this.endAt = properties.endAt }
            if (properties.listImage) { this.listImage = properties.listImage }
            if (properties.effectAt) { this.effectAt = properties.effectAt }
            if (properties.expireAt) { this.expireAt = properties.expireAt }
            if (properties.discountConf) { this.discountConf = DiscountConf.create(properties.discountConf) as any }
            if (properties.vipConf) { this.vipConf = VipConf.create(properties.vipConf) as any }
            if (properties.thirdPartySpuId) { this.thirdPartySpuId = properties.thirdPartySpuId }
            if (properties.unmatchedTab) { this.unmatchedTab = []; properties.unmatchedTab.forEach((value, index)=>{this.unmatchedTab[index] = properties.unmatchedTab[index]})}
            if (properties.belongType) { this.belongType = properties.belongType }
            if (properties.presentAmt) { this.presentAmt = properties.presentAmt }
            if (properties.meta) { this.meta = properties.meta }
            if (properties.spuTag) { this.spuTag = properties.spuTag }
            if (properties.spuSpecTag) { this.spuSpecTag = []; properties.spuSpecTag.forEach((value, index)=>{this.spuSpecTag[index] = properties.spuSpecTag[index]})}
            if (properties.presentPercent) { this.presentPercent = properties.presentPercent }
            if (properties.presentInfoShow) { this.presentInfoShow = properties.presentInfoShow }
            if (properties.presentImg) { this.presentImg = properties.presentImg }
            if (properties.firstSpuPercent) { this.firstSpuPercent = properties.firstSpuPercent }
            if (properties.firstSpuInfoShow) { this.firstSpuInfoShow = properties.firstSpuInfoShow }
            if (properties.firstSpuImg) { this.firstSpuImg = properties.firstSpuImg }
            if (properties.firstSpuPresent) { this.firstSpuPresent = []; properties.firstSpuPresent.forEach((value, index)=>{this.firstSpuPresent[index] = SKU.create(properties.firstSpuPresent[index]) as any})}
            if (properties.premiumCardConf) { this.premiumCardConf = PremiumCardConf.create(properties.premiumCardConf) as any }
            if (properties.historySpuCount) { this.historySpuCount = properties.historySpuCount }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public id?: number|null = 0
    @protobuf.Field.d(2, "tss_hall_mall_v2_SKU", "optional")
    public sku?: SKU|null
    @protobuf.Field.d(3, SPUType, "optional", SPUType.SPUTypeUnknown)
    public category?: SPUType|null = SPUType.SPUTypeUnknown
    @protobuf.Field.d(4, "tss_hall_mall_v2_SKU", "repeated")
    public present?: SKU[] = []
    @protobuf.Field.d(5, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(6, "string", "optional", )
    public desc?: string|null = ""
    @protobuf.Field.d(8, "int64", "optional", 0)
    public RMBWorth?: number|null = 0
    @protobuf.Field.d(9, "string", "repeated", [])
    public tags?: string[] = []
    @protobuf.Field.d(10, "tss_hall_mall_v2_LimitConf", "optional")
    public LimitConf?: LimitConf|null
    @protobuf.Field.d(12, "string", "optional", )
    public categoryName?: string|null = ""
    @protobuf.Field.d(13, "tss_hall_mall_v2_Common", "optional")
    public commonInfo?: Common|null
    @protobuf.Field.d(14, "int64", "optional", 0)
    public beginAt?: number|null = 0
    @protobuf.Field.d(15, "int64", "optional", 0)
    public endAt?: number|null = 0
    @protobuf.Field.d(16, "string", "optional", )
    public listImage?: string|null = ""
    @protobuf.Field.d(17, "int64", "optional", 0)
    public effectAt?: number|null = 0
    @protobuf.Field.d(18, "int64", "optional", 0)
    public expireAt?: number|null = 0
    @protobuf.Field.d(19, "tss_hall_mall_v2_DiscountConf", "optional")
    public discountConf?: DiscountConf|null
    @protobuf.Field.d(20, "tss_hall_mall_v2_VipConf", "optional")
    public vipConf?: VipConf|null
    @protobuf.Field.d(21, "string", "optional", )
    public thirdPartySpuId?: string|null = ""
    @protobuf.Field.d(22, "string", "repeated", [])
    public unmatchedTab?: string[] = []
    @protobuf.Field.d(24, SpuBelongType, "optional", SpuBelongType.SpuBelongUnknown)
    public belongType?: SpuBelongType|null = SpuBelongType.SpuBelongUnknown
    @protobuf.Field.d(26, "int64", "optional", 0)
    public presentAmt?: number|null = 0
    @protobuf.MapField.d(27, "string", "string")
    public meta?: { [k: string]: string|null } = {}
    @protobuf.Field.d(28, SpuTag, "optional", SpuTag.SpuTagUnknown)
    public spuTag?: SpuTag|null = SpuTag.SpuTagUnknown
    @protobuf.Field.d(29, SpuSpecTag, "repeated", SpuSpecTag.SpuSpecTagUnknown)
    public spuSpecTag?: SpuSpecTag[] = []
    @protobuf.Field.d(23, "int32", "optional", 0)
    public presentPercent?: number|null = 0
    @protobuf.Field.d(30, "string", "optional", )
    public presentInfoShow?: string|null = ""
    @protobuf.Field.d(31, "string", "optional", )
    public presentImg?: string|null = ""
    @protobuf.Field.d(32, "int32", "optional", 0)
    public firstSpuPercent?: number|null = 0
    @protobuf.Field.d(33, "string", "optional", )
    public firstSpuInfoShow?: string|null = ""
    @protobuf.Field.d(34, "string", "optional", )
    public firstSpuImg?: string|null = ""
    @protobuf.Field.d(35, "tss_hall_mall_v2_SKU", "repeated")
    public firstSpuPresent?: SKU[] = []
    @protobuf.Field.d(37, "tss_hall_mall_v2_PremiumCardConf", "optional")
    public premiumCardConf?: PremiumCardConf|null
    @protobuf.Field.d(36, "int64", "optional", 0)
    public historySpuCount?: number|null = 0
}
export interface IActivity {
    Id?: number|null
    base?: tss_hall_common_IActivityBase
    spus?: ISPU[]
    popConf?: IPopConf
    giftIntroduce?: string|null
}
@protobuf.Type.d("tss_hall_mall_v2_Activity")
export class Activity extends protobuf.Message<IActivity> {
    constructor(properties: Properties<IActivity>) {
        super(properties);
        if (properties) {
            if (properties.Id) { this.Id = properties.Id }
            if (properties.base) { this.base = tss_hall_common_ActivityBase.create(properties.base) as any }
            if (properties.spus) { this.spus = []; properties.spus.forEach((value, index)=>{this.spus[index] = SPU.create(properties.spus[index]) as any})}
            if (properties.popConf) { this.popConf = PopConf.create(properties.popConf) as any }
            if (properties.giftIntroduce) { this.giftIntroduce = properties.giftIntroduce }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public Id?: number|null = 0
    @protobuf.Field.d(2, "tss_hall_common_ActivityBase", "optional")
    public base?: tss_hall_common_ActivityBase|null
    @protobuf.Field.d(3, "tss_hall_mall_v2_SPU", "repeated")
    public spus?: SPU[] = []
    @protobuf.Field.d(5, "tss_hall_mall_v2_PopConf", "optional")
    public popConf?: PopConf|null
    @protobuf.Field.d(6, "string", "optional", )
    public giftIntroduce?: string|null = ""
}
export interface IUserActivityView {
    Id?: number|null
    spus?: ISPU[]
    conf?: IActivityConf
}
@protobuf.Type.d("tss_hall_mall_v2_UserActivityView")
export class UserActivityView extends protobuf.Message<IUserActivityView> {
    constructor(properties: Properties<IUserActivityView>) {
        super(properties);
        if (properties) {
            if (properties.Id) { this.Id = properties.Id }
            if (properties.spus) { this.spus = []; properties.spus.forEach((value, index)=>{this.spus[index] = SPU.create(properties.spus[index]) as any})}
            if (properties.conf) { this.conf = ActivityConf.create(properties.conf) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public Id?: number|null = 0
    @protobuf.Field.d(3, "tss_hall_mall_v2_SPU", "repeated")
    public spus?: SPU[] = []
    @protobuf.Field.d(4, "tss_hall_mall_v2_ActivityConf", "optional")
    public conf?: ActivityConf|null
}
export interface IOrderItem {
    spuId?: number|null
    sku?: ISKU
    unitPrice?: tss_hall_common_IPrice
    amt?: number|null
    totalPrice?: tss_hall_common_IPrice
    actualPrice?: tss_hall_common_IPrice
    product?: IProduct
}
@protobuf.Type.d("tss_hall_mall_v2_OrderItem")
export class OrderItem extends protobuf.Message<IOrderItem> {
    constructor(properties: Properties<IOrderItem>) {
        super(properties);
        if (properties) {
            if (properties.spuId) { this.spuId = properties.spuId }
            if (properties.sku) { this.sku = SKU.create(properties.sku) as any }
            if (properties.unitPrice) { this.unitPrice = tss_hall_common_Price.create(properties.unitPrice) as any }
            if (properties.amt) { this.amt = properties.amt }
            if (properties.totalPrice) { this.totalPrice = tss_hall_common_Price.create(properties.totalPrice) as any }
            if (properties.actualPrice) { this.actualPrice = tss_hall_common_Price.create(properties.actualPrice) as any }
            if (properties.product) { this.product = Product.create(properties.product) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public spuId?: number|null = 0
    @protobuf.Field.d(2, "tss_hall_mall_v2_SKU", "optional")
    public sku?: SKU|null
    @protobuf.Field.d(3, "tss_hall_common_Price", "optional")
    public unitPrice?: tss_hall_common_Price|null
    @protobuf.Field.d(4, "int64", "optional", 0)
    public amt?: number|null = 0
    @protobuf.Field.d(5, "tss_hall_common_Price", "optional")
    public totalPrice?: tss_hall_common_Price|null
    @protobuf.Field.d(6, "tss_hall_common_Price", "optional")
    public actualPrice?: tss_hall_common_Price|null
    @protobuf.Field.d(7, "tss_hall_mall_v2_Product", "optional")
    public product?: Product|null
}
export interface IPayment {
    type?: PaymentType|null
    price?: tss_hall_common_IPrice
    payID?: string|null
    state?: PayState|null
    refundPayID?: string|null
    payAt?: number|null
    PayCenterNo?: string|null
    payChannel?: mp_pay_trade_v1_PayChannel|null
}
@protobuf.Type.d("tss_hall_mall_v2_Payment")
export class Payment extends protobuf.Message<IPayment> {
    constructor(properties: Properties<IPayment>) {
        super(properties);
        if (properties) {
            if (properties.type) { this.type = properties.type }
            if (properties.price) { this.price = tss_hall_common_Price.create(properties.price) as any }
            if (properties.payID) { this.payID = properties.payID }
            if (properties.state) { this.state = properties.state }
            if (properties.refundPayID) { this.refundPayID = properties.refundPayID }
            if (properties.payAt) { this.payAt = properties.payAt }
            if (properties.PayCenterNo) { this.PayCenterNo = properties.PayCenterNo }
            if (properties.payChannel) { this.payChannel = properties.payChannel }
        }
	}
    @protobuf.Field.d(1, PaymentType, "optional", PaymentType.PaymentTypeKnown)
    public type?: PaymentType|null = PaymentType.PaymentTypeKnown
    @protobuf.Field.d(2, "tss_hall_common_Price", "optional")
    public price?: tss_hall_common_Price|null
    @protobuf.Field.d(3, "string", "optional", )
    public payID?: string|null = ""
    @protobuf.Field.d(4, PayState, "optional", PayState.PayStateUnknown)
    public state?: PayState|null = PayState.PayStateUnknown
    @protobuf.Field.d(5, "string", "optional", )
    public refundPayID?: string|null = ""
    @protobuf.Field.d(6, "int64", "optional", 0)
    public payAt?: number|null = 0
    @protobuf.Field.d(7, "string", "optional", )
    public PayCenterNo?: string|null = ""
    @protobuf.Field.d(8, mp_pay_trade_v1_PayChannel, "optional", mp_pay_trade_v1_PayChannel.PayChannelUnknown)
    public payChannel?: mp_pay_trade_v1_PayChannel|null = mp_pay_trade_v1_PayChannel.PayChannelUnknown
}
export interface IOrder {
    ID?: string|null
    items?: IOrderItem[]
    rmbPayment?: IPayment
    virtualPayment?: IPayment
    DeliveryState?: DeliveryState|null
    createAt?: number|null
    updateAt?: number|null
    orderState?: OrderState|null
    UID?: number|null
    scene?: string|null
    applicationID?: string|null
    spuType?: SPUType|null
    batchID?: string|null
}
@protobuf.Type.d("tss_hall_mall_v2_Order")
export class Order extends protobuf.Message<IOrder> {
    constructor(properties: Properties<IOrder>) {
        super(properties);
        if (properties) {
            if (properties.ID) { this.ID = properties.ID }
            if (properties.items) { this.items = []; properties.items.forEach((value, index)=>{this.items[index] = OrderItem.create(properties.items[index]) as any})}
            if (properties.rmbPayment) { this.rmbPayment = Payment.create(properties.rmbPayment) as any }
            if (properties.virtualPayment) { this.virtualPayment = Payment.create(properties.virtualPayment) as any }
            if (properties.DeliveryState) { this.DeliveryState = properties.DeliveryState }
            if (properties.createAt) { this.createAt = properties.createAt }
            if (properties.updateAt) { this.updateAt = properties.updateAt }
            if (properties.orderState) { this.orderState = properties.orderState }
            if (properties.UID) { this.UID = properties.UID }
            if (properties.scene) { this.scene = properties.scene }
            if (properties.applicationID) { this.applicationID = properties.applicationID }
            if (properties.spuType) { this.spuType = properties.spuType }
            if (properties.batchID) { this.batchID = properties.batchID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public ID?: string|null = ""
    @protobuf.Field.d(2, "tss_hall_mall_v2_OrderItem", "repeated")
    public items?: OrderItem[] = []
    @protobuf.Field.d(3, "tss_hall_mall_v2_Payment", "optional")
    public rmbPayment?: Payment|null
    @protobuf.Field.d(4, "tss_hall_mall_v2_Payment", "optional")
    public virtualPayment?: Payment|null
    @protobuf.Field.d(5, DeliveryState, "optional", DeliveryState.DeliveryStateUnknown)
    public DeliveryState?: DeliveryState|null = DeliveryState.DeliveryStateUnknown
    @protobuf.Field.d(6, "int64", "optional", 0)
    public createAt?: number|null = 0
    @protobuf.Field.d(7, "int64", "optional", 0)
    public updateAt?: number|null = 0
    @protobuf.Field.d(8, OrderState, "optional", OrderState.OrderStateUnknown)
    public orderState?: OrderState|null = OrderState.OrderStateUnknown
    @protobuf.Field.d(9, "int64", "optional", 0)
    public UID?: number|null = 0
    @protobuf.Field.d(10, "string", "optional", )
    public scene?: string|null = ""
    @protobuf.Field.d(11, "string", "optional", )
    public applicationID?: string|null = ""
    @protobuf.Field.d(12, SPUType, "optional", SPUType.SPUTypeUnknown)
    public spuType?: SPUType|null = SPUType.SPUTypeUnknown
    @protobuf.Field.d(13, "string", "optional", )
    public batchID?: string|null = ""
}
export interface ISpuTypeCount {
    SpuType?: SPUType|null
    Amt?: number|null
}
@protobuf.Type.d("tss_hall_mall_v2_SpuTypeCount")
export class SpuTypeCount extends protobuf.Message<ISpuTypeCount> {
    constructor(properties: Properties<ISpuTypeCount>) {
        super(properties);
        if (properties) {
            if (properties.SpuType) { this.SpuType = properties.SpuType }
            if (properties.Amt) { this.Amt = properties.Amt }
        }
	}
    @protobuf.Field.d(1, SPUType, "optional", SPUType.SPUTypeUnknown)
    public SpuType?: SPUType|null = SPUType.SPUTypeUnknown
    @protobuf.Field.d(2, "int64", "optional", 0)
    public Amt?: number|null = 0
}
export interface ISpuCount {
    SpuId?: number|null
    Amt?: number|null
}
@protobuf.Type.d("tss_hall_mall_v2_SpuCount")
export class SpuCount extends protobuf.Message<ISpuCount> {
    constructor(properties: Properties<ISpuCount>) {
        super(properties);
        if (properties) {
            if (properties.SpuId) { this.SpuId = properties.SpuId }
            if (properties.Amt) { this.Amt = properties.Amt }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public SpuId?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public Amt?: number|null = 0
}
export interface IPersonalStat {
    UID?: number|null
    SpuTypeCounts?: ISpuTypeCount[]
    SpuCounts?: ISpuCount[]
    SpuAmt?: number|null
    RmbAmt?: number|null
    CreateAt?: number|null
    UpdateAt?: number|null
}
@protobuf.Type.d("tss_hall_mall_v2_PersonalStat")
export class PersonalStat extends protobuf.Message<IPersonalStat> {
    constructor(properties: Properties<IPersonalStat>) {
        super(properties);
        if (properties) {
            if (properties.UID) { this.UID = properties.UID }
            if (properties.SpuTypeCounts) { this.SpuTypeCounts = []; properties.SpuTypeCounts.forEach((value, index)=>{this.SpuTypeCounts[index] = SpuTypeCount.create(properties.SpuTypeCounts[index]) as any})}
            if (properties.SpuCounts) { this.SpuCounts = []; properties.SpuCounts.forEach((value, index)=>{this.SpuCounts[index] = SpuCount.create(properties.SpuCounts[index]) as any})}
            if (properties.SpuAmt) { this.SpuAmt = properties.SpuAmt }
            if (properties.RmbAmt) { this.RmbAmt = properties.RmbAmt }
            if (properties.CreateAt) { this.CreateAt = properties.CreateAt }
            if (properties.UpdateAt) { this.UpdateAt = properties.UpdateAt }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public UID?: number|null = 0
    @protobuf.Field.d(2, "tss_hall_mall_v2_SpuTypeCount", "repeated")
    public SpuTypeCounts?: SpuTypeCount[] = []
    @protobuf.Field.d(3, "tss_hall_mall_v2_SpuCount", "repeated")
    public SpuCounts?: SpuCount[] = []
    @protobuf.Field.d(4, "int64", "optional", 0)
    public SpuAmt?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public RmbAmt?: number|null = 0
    @protobuf.Field.d(6, "int64", "optional", 0)
    public CreateAt?: number|null = 0
    @protobuf.Field.d(7, "int64", "optional", 0)
    public UpdateAt?: number|null = 0
}
export interface IPrivilegeAddPart {
    vipCoinExtraBargainPercent?: number|null
}
@protobuf.Type.d("tss_hall_mall_v2_PrivilegeAddPart")
export class PrivilegeAddPart extends protobuf.Message<IPrivilegeAddPart> {
    constructor(properties: Properties<IPrivilegeAddPart>) {
        super(properties);
        if (properties) {
            if (properties.vipCoinExtraBargainPercent) { this.vipCoinExtraBargainPercent = properties.vipCoinExtraBargainPercent }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public vipCoinExtraBargainPercent?: number|null = 0
}
export interface IUserPresentLog {
    spuId?: number|null
    uid?: number|null
    sender?: number[]
    receiver?: number[]
    senderLimit?: number|null
    receiverLimit?: number|null
}
@protobuf.Type.d("tss_hall_mall_v2_UserPresentLog")
export class UserPresentLog extends protobuf.Message<IUserPresentLog> {
    constructor(properties: Properties<IUserPresentLog>) {
        super(properties);
        if (properties) {
            if (properties.spuId) { this.spuId = properties.spuId }
            if (properties.uid) { this.uid = properties.uid }
            if (properties.sender) { this.sender = []; properties.sender.forEach((value, index)=>{this.sender[index] = properties.sender[index]})}
            if (properties.receiver) { this.receiver = []; properties.receiver.forEach((value, index)=>{this.receiver[index] = properties.receiver[index]})}
            if (properties.senderLimit) { this.senderLimit = properties.senderLimit }
            if (properties.receiverLimit) { this.receiverLimit = properties.receiverLimit }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public spuId?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(3, "int64", "repeated", [])
    public sender?: number[] = []
    @protobuf.Field.d(4, "int64", "repeated", [])
    public receiver?: number[] = []
    @protobuf.Field.d(5, "int64", "optional", 0)
    public senderLimit?: number|null = 0
    @protobuf.Field.d(6, "int64", "optional", 0)
    public receiverLimit?: number|null = 0
}
export interface IUserPresentOrder {
    orderID?: string|null
    sender?: number|null
    receiver?: number[]
    createAt?: number|null
    updateAt?: number|null
    deliveryState?: { [k: string]: DeliveryState }
}
@protobuf.Type.d("tss_hall_mall_v2_UserPresentOrder")
export class UserPresentOrder extends protobuf.Message<IUserPresentOrder> {
    constructor(properties: Properties<IUserPresentOrder>) {
        super(properties);
        if (properties) {
            if (properties.orderID) { this.orderID = properties.orderID }
            if (properties.sender) { this.sender = properties.sender }
            if (properties.receiver) { this.receiver = []; properties.receiver.forEach((value, index)=>{this.receiver[index] = properties.receiver[index]})}
            if (properties.createAt) { this.createAt = properties.createAt }
            if (properties.updateAt) { this.updateAt = properties.updateAt }
            if (properties.deliveryState) { this.deliveryState = properties.deliveryState }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public orderID?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public sender?: number|null = 0
    @protobuf.Field.d(3, "int64", "repeated", [])
    public receiver?: number[] = []
    @protobuf.Field.d(4, "int64", "optional", 0)
    public createAt?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public updateAt?: number|null = 0
    @protobuf.MapField.d(6, "int64", DeliveryState)
    public deliveryState?: { [k: string]: DeliveryState } = {}
}
export interface ISaveTabReq {
    tab?: ITab
}
@protobuf.Type.d("tss_hall_mall_v2_SaveTabReq")
export class SaveTabReq extends protobuf.Message<ISaveTabReq> {
    constructor(properties: Properties<ISaveTabReq>) {
        super(properties);
        if (properties) {
            if (properties.tab) { this.tab = Tab.create(properties.tab) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_mall_v2_Tab", "optional")
    public tab?: Tab|null
}
export interface ISaveTabResp {
    tab?: ITab
}
@protobuf.Type.d("tss_hall_mall_v2_SaveTabResp")
export class SaveTabResp extends protobuf.Message<ISaveTabResp> {
    constructor(properties: Properties<ISaveTabResp>) {
        super(properties);
        if (properties) {
            if (properties.tab) { this.tab = Tab.create(properties.tab) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_mall_v2_Tab", "optional")
    public tab?: Tab|null
}
export interface IListTabReq {
    page?: number|null
    pageSize?: number|null
    appID?: string|null
    name?: string|null
    tabType?: TabType|null
}
@protobuf.Type.d("tss_hall_mall_v2_ListTabReq")
export class ListTabReq extends protobuf.Message<IListTabReq> {
    constructor(properties: Properties<IListTabReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.appID) { this.appID = properties.appID }
            if (properties.name) { this.name = properties.name }
            if (properties.tabType) { this.tabType = properties.tabType }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public appID?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(5, TabType, "optional", TabType.TabTypeUnknown)
    public tabType?: TabType|null = TabType.TabTypeUnknown
}
export interface IGetTabReq {
    id?: string|null
}
@protobuf.Type.d("tss_hall_mall_v2_GetTabReq")
export class GetTabReq extends protobuf.Message<IGetTabReq> {
    constructor(properties: Properties<IGetTabReq>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public id?: string|null = ""
}
export interface IGetTabResp {
    tab?: ITab
}
@protobuf.Type.d("tss_hall_mall_v2_GetTabResp")
export class GetTabResp extends protobuf.Message<IGetTabResp> {
    constructor(properties: Properties<IGetTabResp>) {
        super(properties);
        if (properties) {
            if (properties.tab) { this.tab = Tab.create(properties.tab) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_mall_v2_Tab", "optional")
    public tab?: Tab|null
}
export interface IGetSPUReq {
    id?: number|null
}
@protobuf.Type.d("tss_hall_mall_v2_GetSPUReq")
export class GetSPUReq extends protobuf.Message<IGetSPUReq> {
    constructor(properties: Properties<IGetSPUReq>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public id?: number|null = 0
}
export interface IDeleteSPUReq {
    id?: number|null
}
@protobuf.Type.d("tss_hall_mall_v2_DeleteSPUReq")
export class DeleteSPUReq extends protobuf.Message<IDeleteSPUReq> {
    constructor(properties: Properties<IDeleteSPUReq>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public id?: number|null = 0
}
export interface IDeleteActivityReq {
    id?: number|null
}
@protobuf.Type.d("tss_hall_mall_v2_DeleteActivityReq")
export class DeleteActivityReq extends protobuf.Message<IDeleteActivityReq> {
    constructor(properties: Properties<IDeleteActivityReq>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public id?: number|null = 0
}
export interface IDeleteTabReq {
    id?: string|null
}
@protobuf.Type.d("tss_hall_mall_v2_DeleteTabReq")
export class DeleteTabReq extends protobuf.Message<IDeleteTabReq> {
    constructor(properties: Properties<IDeleteTabReq>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public id?: string|null = ""
}
export interface IGetSPUResp {
    spu?: ISPU
}
@protobuf.Type.d("tss_hall_mall_v2_GetSPUResp")
export class GetSPUResp extends protobuf.Message<IGetSPUResp> {
    constructor(properties: Properties<IGetSPUResp>) {
        super(properties);
        if (properties) {
            if (properties.spu) { this.spu = SPU.create(properties.spu) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_mall_v2_SPU", "optional")
    public spu?: SPU|null
}
export interface IListTabResp {
    tab?: ITab[]
    total?: number|null
}
@protobuf.Type.d("tss_hall_mall_v2_ListTabResp")
export class ListTabResp extends protobuf.Message<IListTabResp> {
    constructor(properties: Properties<IListTabResp>) {
        super(properties);
        if (properties) {
            if (properties.tab) { this.tab = []; properties.tab.forEach((value, index)=>{this.tab[index] = Tab.create(properties.tab[index]) as any})}
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "tss_hall_mall_v2_Tab", "repeated")
    public tab?: Tab[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public total?: number|null = 0
}
export interface IListTabByUserResp {
    tab?: ITab[]
    total?: number|null
}
@protobuf.Type.d("tss_hall_mall_v2_ListTabByUserResp")
export class ListTabByUserResp extends protobuf.Message<IListTabByUserResp> {
    constructor(properties: Properties<IListTabByUserResp>) {
        super(properties);
        if (properties) {
            if (properties.tab) { this.tab = []; properties.tab.forEach((value, index)=>{this.tab[index] = Tab.create(properties.tab[index]) as any})}
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "tss_hall_mall_v2_Tab", "repeated")
    public tab?: Tab[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public total?: number|null = 0
}
export interface ITabPriority {
    tabId?: string|null
    priority?: number|null
}
@protobuf.Type.d("tss_hall_mall_v2_TabPriority")
export class TabPriority extends protobuf.Message<ITabPriority> {
    constructor(properties: Properties<ITabPriority>) {
        super(properties);
        if (properties) {
            if (properties.tabId) { this.tabId = properties.tabId }
            if (properties.priority) { this.priority = properties.priority }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public tabId?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public priority?: number|null = 0
}
export interface IBatchUpdateTabPriorityReq {
    tabPriority?: ITabPriority[]
}
@protobuf.Type.d("tss_hall_mall_v2_BatchUpdateTabPriorityReq")
export class BatchUpdateTabPriorityReq extends protobuf.Message<IBatchUpdateTabPriorityReq> {
    constructor(properties: Properties<IBatchUpdateTabPriorityReq>) {
        super(properties);
        if (properties) {
            if (properties.tabPriority) { this.tabPriority = []; properties.tabPriority.forEach((value, index)=>{this.tabPriority[index] = TabPriority.create(properties.tabPriority[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_mall_v2_TabPriority", "repeated")
    public tabPriority?: TabPriority[] = []
}
export interface ISaveSPUReq {
    spu?: ISPU
}
@protobuf.Type.d("tss_hall_mall_v2_SaveSPUReq")
export class SaveSPUReq extends protobuf.Message<ISaveSPUReq> {
    constructor(properties: Properties<ISaveSPUReq>) {
        super(properties);
        if (properties) {
            if (properties.spu) { this.spu = SPU.create(properties.spu) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_mall_v2_SPU", "optional")
    public spu?: SPU|null
}
export interface ISaveSPUResp {
    spu?: ISPU
}
@protobuf.Type.d("tss_hall_mall_v2_SaveSPUResp")
export class SaveSPUResp extends protobuf.Message<ISaveSPUResp> {
    constructor(properties: Properties<ISaveSPUResp>) {
        super(properties);
        if (properties) {
            if (properties.spu) { this.spu = SPU.create(properties.spu) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_mall_v2_SPU", "optional")
    public spu?: SPU|null
}
export interface IListSPUReq {
    name?: string|null
    desc?: string|null
    page?: number|null
    pageSize?: number|null
    appID?: string|null
    spuType?: SPUType|null
    isOnSale?: boolean|null
    belongType?: SpuBelongType|null
    spuID?: number|null
    onlineState?: tss_common_State|null
    meta?: { [k: string]: string|null }
}
@protobuf.Type.d("tss_hall_mall_v2_ListSPUReq")
export class ListSPUReq extends protobuf.Message<IListSPUReq> {
    constructor(properties: Properties<IListSPUReq>) {
        super(properties);
        if (properties) {
            if (properties.name) { this.name = properties.name }
            if (properties.desc) { this.desc = properties.desc }
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.appID) { this.appID = properties.appID }
            if (properties.spuType) { this.spuType = properties.spuType }
            if (properties.isOnSale) { this.isOnSale = properties.isOnSale }
            if (properties.belongType) { this.belongType = properties.belongType }
            if (properties.spuID) { this.spuID = properties.spuID }
            if (properties.onlineState) { this.onlineState = properties.onlineState }
            if (properties.meta) { this.meta = properties.meta }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public desc?: string|null = ""
    @protobuf.Field.d(3, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(5, "string", "optional", )
    public appID?: string|null = ""
    @protobuf.Field.d(6, SPUType, "optional", SPUType.SPUTypeUnknown)
    public spuType?: SPUType|null = SPUType.SPUTypeUnknown
    @protobuf.Field.d(7, "bool", "optional", false)
    public isOnSale?: boolean|null = false
    @protobuf.Field.d(8, SpuBelongType, "optional", SpuBelongType.SpuBelongUnknown)
    public belongType?: SpuBelongType|null = SpuBelongType.SpuBelongUnknown
    @protobuf.Field.d(9, "int64", "optional", 0)
    public spuID?: number|null = 0
    @protobuf.Field.d(10, tss_common_State, "optional", tss_common_State.StateUnknown)
    public onlineState?: tss_common_State|null = tss_common_State.StateUnknown
    @protobuf.MapField.d(11, "string", "string")
    public meta?: { [k: string]: string|null } = {}
}
export interface IGetCoinSPUNeedReq {
    coinNeedLow?: number|null
    coinNeedHigh?: number|null
}
@protobuf.Type.d("tss_hall_mall_v2_GetCoinSPUNeedReq")
export class GetCoinSPUNeedReq extends protobuf.Message<IGetCoinSPUNeedReq> {
    constructor(properties: Properties<IGetCoinSPUNeedReq>) {
        super(properties);
        if (properties) {
            if (properties.coinNeedLow) { this.coinNeedLow = properties.coinNeedLow }
            if (properties.coinNeedHigh) { this.coinNeedHigh = properties.coinNeedHigh }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public coinNeedLow?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public coinNeedHigh?: number|null = 0
}
export interface IGetCoinSPUNeedResp {
    spu?: ISPU[]
    spuDiamondToGetCoin?: ISPU
}
@protobuf.Type.d("tss_hall_mall_v2_GetCoinSPUNeedResp")
export class GetCoinSPUNeedResp extends protobuf.Message<IGetCoinSPUNeedResp> {
    constructor(properties: Properties<IGetCoinSPUNeedResp>) {
        super(properties);
        if (properties) {
            if (properties.spu) { this.spu = []; properties.spu.forEach((value, index)=>{this.spu[index] = SPU.create(properties.spu[index]) as any})}
            if (properties.spuDiamondToGetCoin) { this.spuDiamondToGetCoin = SPU.create(properties.spuDiamondToGetCoin) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_mall_v2_SPU", "repeated")
    public spu?: SPU[] = []
    @protobuf.Field.d(2, "tss_hall_mall_v2_SPU", "optional")
    public spuDiamondToGetCoin?: SPU|null
}
export interface IGetCurrencySPUNeedReq {
    currencyNeed?: number|null
    currencyAssetType?: tss_common_AssetType|null
}
@protobuf.Type.d("tss_hall_mall_v2_GetCurrencySPUNeedReq")
export class GetCurrencySPUNeedReq extends protobuf.Message<IGetCurrencySPUNeedReq> {
    constructor(properties: Properties<IGetCurrencySPUNeedReq>) {
        super(properties);
        if (properties) {
            if (properties.currencyNeed) { this.currencyNeed = properties.currencyNeed }
            if (properties.currencyAssetType) { this.currencyAssetType = properties.currencyAssetType }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public currencyNeed?: number|null = 0
    @protobuf.Field.d(2, tss_common_AssetType, "optional", tss_common_AssetType.AssetTypeUnknown)
    public currencyAssetType?: tss_common_AssetType|null = tss_common_AssetType.AssetTypeUnknown
}
export interface IGetCurrencySPUNeedResp {
    spu?: ISPU[]
    spuDiamondToGetCoin?: ISPU
}
@protobuf.Type.d("tss_hall_mall_v2_GetCurrencySPUNeedResp")
export class GetCurrencySPUNeedResp extends protobuf.Message<IGetCurrencySPUNeedResp> {
    constructor(properties: Properties<IGetCurrencySPUNeedResp>) {
        super(properties);
        if (properties) {
            if (properties.spu) { this.spu = []; properties.spu.forEach((value, index)=>{this.spu[index] = SPU.create(properties.spu[index]) as any})}
            if (properties.spuDiamondToGetCoin) { this.spuDiamondToGetCoin = SPU.create(properties.spuDiamondToGetCoin) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_mall_v2_SPU", "repeated")
    public spu?: SPU[] = []
    @protobuf.Field.d(2, "tss_hall_mall_v2_SPU", "optional")
    public spuDiamondToGetCoin?: SPU|null
}
export interface IListSPUResp {
    spu?: ISPU[]
    total?: number|null
}
@protobuf.Type.d("tss_hall_mall_v2_ListSPUResp")
export class ListSPUResp extends protobuf.Message<IListSPUResp> {
    constructor(properties: Properties<IListSPUResp>) {
        super(properties);
        if (properties) {
            if (properties.spu) { this.spu = []; properties.spu.forEach((value, index)=>{this.spu[index] = SPU.create(properties.spu[index]) as any})}
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "tss_hall_mall_v2_SPU", "repeated")
    public spu?: SPU[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public total?: number|null = 0
}
export interface IListOrderReq {
    page?: number|null
    pageSize?: number|null
    uid?: number|null
    spuType?: SPUType|null
    beginAt?: number|null
    endAt?: number|null
    applicationID?: string|null
    orderState?: OrderState|null
    payChannel?: mp_pay_trade_v1_PayChannel|null
    orderId?: string|null
}
@protobuf.Type.d("tss_hall_mall_v2_ListOrderReq")
export class ListOrderReq extends protobuf.Message<IListOrderReq> {
    constructor(properties: Properties<IListOrderReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.uid) { this.uid = properties.uid }
            if (properties.spuType) { this.spuType = properties.spuType }
            if (properties.beginAt) { this.beginAt = properties.beginAt }
            if (properties.endAt) { this.endAt = properties.endAt }
            if (properties.applicationID) { this.applicationID = properties.applicationID }
            if (properties.orderState) { this.orderState = properties.orderState }
            if (properties.payChannel) { this.payChannel = properties.payChannel }
            if (properties.orderId) { this.orderId = properties.orderId }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(4, SPUType, "optional", SPUType.SPUTypeUnknown)
    public spuType?: SPUType|null = SPUType.SPUTypeUnknown
    @protobuf.Field.d(5, "int64", "optional", 0)
    public beginAt?: number|null = 0
    @protobuf.Field.d(6, "int64", "optional", 0)
    public endAt?: number|null = 0
    @protobuf.Field.d(7, "string", "optional", )
    public applicationID?: string|null = ""
    @protobuf.Field.d(8, OrderState, "optional", OrderState.OrderStateUnknown)
    public orderState?: OrderState|null = OrderState.OrderStateUnknown
    @protobuf.Field.d(9, mp_pay_trade_v1_PayChannel, "optional", mp_pay_trade_v1_PayChannel.PayChannelUnknown)
    public payChannel?: mp_pay_trade_v1_PayChannel|null = mp_pay_trade_v1_PayChannel.PayChannelUnknown
    @protobuf.Field.d(10, "string", "optional", )
    public orderId?: string|null = ""
}
export interface IListOrderResp {
    order?: IOrder[]
    total?: number|null
}
@protobuf.Type.d("tss_hall_mall_v2_ListOrderResp")
export class ListOrderResp extends protobuf.Message<IListOrderResp> {
    constructor(properties: Properties<IListOrderResp>) {
        super(properties);
        if (properties) {
            if (properties.order) { this.order = []; properties.order.forEach((value, index)=>{this.order[index] = Order.create(properties.order[index]) as any})}
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "tss_hall_mall_v2_Order", "repeated")
    public order?: Order[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public total?: number|null = 0
}
export interface IListSPUByUserReq {
    tabID?: string|null
    page?: number|null
    pageSize?: number|null
    meta?: { [k: string]: string|null }
    belongType?: SpuBelongType|null
    spuTypes?: SPUType[]
}
@protobuf.Type.d("tss_hall_mall_v2_ListSPUByUserReq")
export class ListSPUByUserReq extends protobuf.Message<IListSPUByUserReq> {
    constructor(properties: Properties<IListSPUByUserReq>) {
        super(properties);
        if (properties) {
            if (properties.tabID) { this.tabID = properties.tabID }
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.meta) { this.meta = properties.meta }
            if (properties.belongType) { this.belongType = properties.belongType }
            if (properties.spuTypes) { this.spuTypes = []; properties.spuTypes.forEach((value, index)=>{this.spuTypes[index] = properties.spuTypes[index]})}
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public tabID?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.MapField.d(4, "string", "string")
    public meta?: { [k: string]: string|null } = {}
    @protobuf.Field.d(5, SpuBelongType, "optional", SpuBelongType.SpuBelongUnknown)
    public belongType?: SpuBelongType|null = SpuBelongType.SpuBelongUnknown
    @protobuf.Field.d(6, SPUType, "repeated", SPUType.SPUTypeUnknown)
    public spuTypes?: SPUType[] = []
}
export interface IListSPUByUserResp {
    spu?: ISPU[]
    total?: number|null
}
@protobuf.Type.d("tss_hall_mall_v2_ListSPUByUserResp")
export class ListSPUByUserResp extends protobuf.Message<IListSPUByUserResp> {
    constructor(properties: Properties<IListSPUByUserResp>) {
        super(properties);
        if (properties) {
            if (properties.spu) { this.spu = []; properties.spu.forEach((value, index)=>{this.spu[index] = SPU.create(properties.spu[index]) as any})}
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "tss_hall_mall_v2_SPU", "repeated")
    public spu?: SPU[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public total?: number|null = 0
}
export interface IListSPUByUserWithBelongReq {
    belongType?: SpuBelongType|null
    page?: number|null
    pageSize?: number|null
}
@protobuf.Type.d("tss_hall_mall_v2_ListSPUByUserWithBelongReq")
export class ListSPUByUserWithBelongReq extends protobuf.Message<IListSPUByUserWithBelongReq> {
    constructor(properties: Properties<IListSPUByUserWithBelongReq>) {
        super(properties);
        if (properties) {
            if (properties.belongType) { this.belongType = properties.belongType }
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
        }
	}
    @protobuf.Field.d(1, SpuBelongType, "optional", SpuBelongType.SpuBelongUnknown)
    public belongType?: SpuBelongType|null = SpuBelongType.SpuBelongUnknown
    @protobuf.Field.d(2, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public pageSize?: number|null = 0
}
export interface IListSPUByUserWithBelongResp {
    spu?: ISPU[]
    total?: number|null
}
@protobuf.Type.d("tss_hall_mall_v2_ListSPUByUserWithBelongResp")
export class ListSPUByUserWithBelongResp extends protobuf.Message<IListSPUByUserWithBelongResp> {
    constructor(properties: Properties<IListSPUByUserWithBelongResp>) {
        super(properties);
        if (properties) {
            if (properties.spu) { this.spu = []; properties.spu.forEach((value, index)=>{this.spu[index] = SPU.create(properties.spu[index]) as any})}
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "tss_hall_mall_v2_SPU", "repeated")
    public spu?: SPU[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public total?: number|null = 0
}
export interface ICreateOrderReq {
    spuId?: number|null
    scene?: string|null
    amt?: number|null
}
@protobuf.Type.d("tss_hall_mall_v2_CreateOrderReq")
export class CreateOrderReq extends protobuf.Message<ICreateOrderReq> {
    constructor(properties: Properties<ICreateOrderReq>) {
        super(properties);
        if (properties) {
            if (properties.spuId) { this.spuId = properties.spuId }
            if (properties.scene) { this.scene = properties.scene }
            if (properties.amt) { this.amt = properties.amt }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public spuId?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public scene?: string|null = ""
    @protobuf.Field.d(3, "int64", "optional", 0)
    public amt?: number|null = 0
}
export interface ICreateOrderResp {
    order?: IOrder
}
@protobuf.Type.d("tss_hall_mall_v2_CreateOrderResp")
export class CreateOrderResp extends protobuf.Message<ICreateOrderResp> {
    constructor(properties: Properties<ICreateOrderResp>) {
        super(properties);
        if (properties) {
            if (properties.order) { this.order = Order.create(properties.order) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_mall_v2_Order", "optional")
    public order?: Order|null
}
export interface ICreateMultiSpuOrderReq {
    spuIds?: number[]
    scene?: string|null
}
@protobuf.Type.d("tss_hall_mall_v2_CreateMultiSpuOrderReq")
export class CreateMultiSpuOrderReq extends protobuf.Message<ICreateMultiSpuOrderReq> {
    constructor(properties: Properties<ICreateMultiSpuOrderReq>) {
        super(properties);
        if (properties) {
            if (properties.spuIds) { this.spuIds = []; properties.spuIds.forEach((value, index)=>{this.spuIds[index] = properties.spuIds[index]})}
            if (properties.scene) { this.scene = properties.scene }
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public spuIds?: number[] = []
    @protobuf.Field.d(2, "string", "optional", )
    public scene?: string|null = ""
}
export interface ICreateMultiSpuOrderResp {
    orders?: IOrder[]
}
@protobuf.Type.d("tss_hall_mall_v2_CreateMultiSpuOrderResp")
export class CreateMultiSpuOrderResp extends protobuf.Message<ICreateMultiSpuOrderResp> {
    constructor(properties: Properties<ICreateMultiSpuOrderResp>) {
        super(properties);
        if (properties) {
            if (properties.orders) { this.orders = []; properties.orders.forEach((value, index)=>{this.orders[index] = Order.create(properties.orders[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_mall_v2_Order", "repeated")
    public orders?: Order[] = []
}
export interface IGetOrderByUserReq {
    orderID?: string|null
}
@protobuf.Type.d("tss_hall_mall_v2_GetOrderByUserReq")
export class GetOrderByUserReq extends protobuf.Message<IGetOrderByUserReq> {
    constructor(properties: Properties<IGetOrderByUserReq>) {
        super(properties);
        if (properties) {
            if (properties.orderID) { this.orderID = properties.orderID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public orderID?: string|null = ""
}
export interface IGetOrderByUserResp {
    order?: IOrder
}
@protobuf.Type.d("tss_hall_mall_v2_GetOrderByUserResp")
export class GetOrderByUserResp extends protobuf.Message<IGetOrderByUserResp> {
    constructor(properties: Properties<IGetOrderByUserResp>) {
        super(properties);
        if (properties) {
            if (properties.order) { this.order = Order.create(properties.order) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_mall_v2_Order", "optional")
    public order?: Order|null
}
export interface IPayTimeOutCallbackReq {
    orderID?: string|null
}
@protobuf.Type.d("tss_hall_mall_v2_PayTimeOutCallbackReq")
export class PayTimeOutCallbackReq extends protobuf.Message<IPayTimeOutCallbackReq> {
    constructor(properties: Properties<IPayTimeOutCallbackReq>) {
        super(properties);
        if (properties) {
            if (properties.orderID) { this.orderID = properties.orderID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public orderID?: string|null = ""
}
export interface IPayRMBReq {
    payChannel?: mp_pay_trade_v1_PayChannel|null
    uid?: number|null
    deviceInfo?: mp_pay_trade_v1_IDeviceInfo
    extra?: string|null
    orderID?: string|null
}
@protobuf.Type.d("tss_hall_mall_v2_PayRMBReq")
export class PayRMBReq extends protobuf.Message<IPayRMBReq> {
    constructor(properties: Properties<IPayRMBReq>) {
        super(properties);
        if (properties) {
            if (properties.payChannel) { this.payChannel = properties.payChannel }
            if (properties.uid) { this.uid = properties.uid }
            if (properties.deviceInfo) { this.deviceInfo = mp_pay_trade_v1_DeviceInfo.create(properties.deviceInfo) as any }
            if (properties.extra) { this.extra = properties.extra }
            if (properties.orderID) { this.orderID = properties.orderID }
        }
	}
    @protobuf.Field.d(2, mp_pay_trade_v1_PayChannel, "optional", mp_pay_trade_v1_PayChannel.PayChannelUnknown)
    public payChannel?: mp_pay_trade_v1_PayChannel|null = mp_pay_trade_v1_PayChannel.PayChannelUnknown
    @protobuf.Field.d(3, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(5, "mp_pay_trade_v1_DeviceInfo", "optional")
    public deviceInfo?: mp_pay_trade_v1_DeviceInfo|null
    @protobuf.Field.d(6, "string", "optional", )
    public extra?: string|null = ""
    @protobuf.Field.d(7, "string", "optional", )
    public orderID?: string|null = ""
}
export interface IPayRMBResp {
    charge?: mp_pay_trade_v1_ICharge
}
@protobuf.Type.d("tss_hall_mall_v2_PayRMBResp")
export class PayRMBResp extends protobuf.Message<IPayRMBResp> {
    constructor(properties: Properties<IPayRMBResp>) {
        super(properties);
        if (properties) {
            if (properties.charge) { this.charge = mp_pay_trade_v1_Charge.create(properties.charge) as any }
        }
	}
    @protobuf.Field.d(1, "mp_pay_trade_v1_Charge", "optional")
    public charge?: mp_pay_trade_v1_Charge|null
}
export interface INotifyAfterDeliveryResp {
    uid?: number|null
    order?: IOrder
    privilegeAddPart?: IPrivilegeAddPart
}
@protobuf.Type.d("tss_hall_mall_v2_NotifyAfterDeliveryResp")
export class NotifyAfterDeliveryResp extends protobuf.Message<INotifyAfterDeliveryResp> {
    constructor(properties: Properties<INotifyAfterDeliveryResp>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.order) { this.order = Order.create(properties.order) as any }
            if (properties.privilegeAddPart) { this.privilegeAddPart = PrivilegeAddPart.create(properties.privilegeAddPart) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "tss_hall_mall_v2_Order", "optional")
    public order?: Order|null
    @protobuf.Field.d(3, "tss_hall_mall_v2_PrivilegeAddPart", "optional")
    public privilegeAddPart?: PrivilegeAddPart|null
}
export interface IBatchGetSPUByUserReq {
    spuId?: number[]
}
@protobuf.Type.d("tss_hall_mall_v2_BatchGetSPUByUserReq")
export class BatchGetSPUByUserReq extends protobuf.Message<IBatchGetSPUByUserReq> {
    constructor(properties: Properties<IBatchGetSPUByUserReq>) {
        super(properties);
        if (properties) {
            if (properties.spuId) { this.spuId = []; properties.spuId.forEach((value, index)=>{this.spuId[index] = properties.spuId[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public spuId?: number[] = []
}
export interface IBatchGetSPUByUserResp {
    spu?: ISPU[]
}
@protobuf.Type.d("tss_hall_mall_v2_BatchGetSPUByUserResp")
export class BatchGetSPUByUserResp extends protobuf.Message<IBatchGetSPUByUserResp> {
    constructor(properties: Properties<IBatchGetSPUByUserResp>) {
        super(properties);
        if (properties) {
            if (properties.spu) { this.spu = []; properties.spu.forEach((value, index)=>{this.spu[index] = SPU.create(properties.spu[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_mall_v2_SPU", "repeated")
    public spu?: SPU[] = []
}
export interface IGetCheapRevivalSPUResp {
    spu?: ISPU[]
}
@protobuf.Type.d("tss_hall_mall_v2_GetCheapRevivalSPUResp")
export class GetCheapRevivalSPUResp extends protobuf.Message<IGetCheapRevivalSPUResp> {
    constructor(properties: Properties<IGetCheapRevivalSPUResp>) {
        super(properties);
        if (properties) {
            if (properties.spu) { this.spu = []; properties.spu.forEach((value, index)=>{this.spu[index] = SPU.create(properties.spu[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_mall_v2_SPU", "repeated")
    public spu?: SPU[] = []
}
export interface IGetPersonalStatReq {
    uid?: number|null
}
@protobuf.Type.d("tss_hall_mall_v2_GetPersonalStatReq")
export class GetPersonalStatReq extends protobuf.Message<IGetPersonalStatReq> {
    constructor(properties: Properties<IGetPersonalStatReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IGetPersonalStatResp {
    stat?: IPersonalStat
}
@protobuf.Type.d("tss_hall_mall_v2_GetPersonalStatResp")
export class GetPersonalStatResp extends protobuf.Message<IGetPersonalStatResp> {
    constructor(properties: Properties<IGetPersonalStatResp>) {
        super(properties);
        if (properties) {
            if (properties.stat) { this.stat = PersonalStat.create(properties.stat) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_mall_v2_PersonalStat", "optional")
    public stat?: PersonalStat|null
}
export interface IGetUserActivityReq {
    id?: number|null
}
@protobuf.Type.d("tss_hall_mall_v2_GetUserActivityReq")
export class GetUserActivityReq extends protobuf.Message<IGetUserActivityReq> {
    constructor(properties: Properties<IGetUserActivityReq>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public id?: number|null = 0
}
export interface IGetUserActivityResp {
    userActivity?: IUserActivityView
}
@protobuf.Type.d("tss_hall_mall_v2_GetUserActivityResp")
export class GetUserActivityResp extends protobuf.Message<IGetUserActivityResp> {
    constructor(properties: Properties<IGetUserActivityResp>) {
        super(properties);
        if (properties) {
            if (properties.userActivity) { this.userActivity = UserActivityView.create(properties.userActivity) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_mall_v2_UserActivityView", "optional")
    public userActivity?: UserActivityView|null
}
export interface IListUserActivityReq {
    page?: number|null
    pageSize?: number|null
    isPopup?: tss_common_SwitchState|null
    isList?: tss_common_SwitchState|null
    isShortCut?: tss_common_SwitchState|null
    activityType?: tss_hall_common_ActivityType|null
}
@protobuf.Type.d("tss_hall_mall_v2_ListUserActivityReq")
export class ListUserActivityReq extends protobuf.Message<IListUserActivityReq> {
    constructor(properties: Properties<IListUserActivityReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.isPopup) { this.isPopup = properties.isPopup }
            if (properties.isList) { this.isList = properties.isList }
            if (properties.isShortCut) { this.isShortCut = properties.isShortCut }
            if (properties.activityType) { this.activityType = properties.activityType }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(3, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public isPopup?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
    @protobuf.Field.d(4, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public isList?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
    @protobuf.Field.d(5, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public isShortCut?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
    @protobuf.Field.d(6, tss_hall_common_ActivityType, "optional", tss_hall_common_ActivityType.ActivityTypeUnknown)
    public activityType?: tss_hall_common_ActivityType|null = tss_hall_common_ActivityType.ActivityTypeUnknown
}
export interface IListUserActivityResp {
    total?: number|null
    views?: IUserActivityView[]
}
@protobuf.Type.d("tss_hall_mall_v2_ListUserActivityResp")
export class ListUserActivityResp extends protobuf.Message<IListUserActivityResp> {
    constructor(properties: Properties<IListUserActivityResp>) {
        super(properties);
        if (properties) {
            if (properties.total) { this.total = properties.total }
            if (properties.views) { this.views = []; properties.views.forEach((value, index)=>{this.views[index] = UserActivityView.create(properties.views[index]) as any})}
        }
	}
    @protobuf.Field.d(2, "int64", "optional", 0)
    public total?: number|null = 0
    @protobuf.Field.d(3, "tss_hall_mall_v2_UserActivityView", "repeated")
    public views?: UserActivityView[] = []
}
export interface ISaveActivityReq {
    activity?: IActivity
}
@protobuf.Type.d("tss_hall_mall_v2_SaveActivityReq")
export class SaveActivityReq extends protobuf.Message<ISaveActivityReq> {
    constructor(properties: Properties<ISaveActivityReq>) {
        super(properties);
        if (properties) {
            if (properties.activity) { this.activity = Activity.create(properties.activity) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_mall_v2_Activity", "optional")
    public activity?: Activity|null
}
export interface ISaveActivityResp {
    activity?: IActivity
}
@protobuf.Type.d("tss_hall_mall_v2_SaveActivityResp")
export class SaveActivityResp extends protobuf.Message<ISaveActivityResp> {
    constructor(properties: Properties<ISaveActivityResp>) {
        super(properties);
        if (properties) {
            if (properties.activity) { this.activity = Activity.create(properties.activity) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_mall_v2_Activity", "optional")
    public activity?: Activity|null
}
export interface IListActivityReq {
    page?: number|null
    pageSize?: number|null
    appID?: string|null
    name?: string|null
    activityOnlineType?: tss_hall_common_ActivityOnlineType|null
}
@protobuf.Type.d("tss_hall_mall_v2_ListActivityReq")
export class ListActivityReq extends protobuf.Message<IListActivityReq> {
    constructor(properties: Properties<IListActivityReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.appID) { this.appID = properties.appID }
            if (properties.name) { this.name = properties.name }
            if (properties.activityOnlineType) { this.activityOnlineType = properties.activityOnlineType }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public appID?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(5, tss_hall_common_ActivityOnlineType, "optional", tss_hall_common_ActivityOnlineType.ActivityOnlineTypeUnknwon)
    public activityOnlineType?: tss_hall_common_ActivityOnlineType|null = tss_hall_common_ActivityOnlineType.ActivityOnlineTypeUnknwon
}
export interface IListActivityResp {
    activity?: IActivity[]
    total?: number|null
}
@protobuf.Type.d("tss_hall_mall_v2_ListActivityResp")
export class ListActivityResp extends protobuf.Message<IListActivityResp> {
    constructor(properties: Properties<IListActivityResp>) {
        super(properties);
        if (properties) {
            if (properties.activity) { this.activity = []; properties.activity.forEach((value, index)=>{this.activity[index] = Activity.create(properties.activity[index]) as any})}
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "tss_hall_mall_v2_Activity", "repeated")
    public activity?: Activity[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public total?: number|null = 0
}
export interface IGetActivityReq {
    activityId?: number|null
}
@protobuf.Type.d("tss_hall_mall_v2_GetActivityReq")
export class GetActivityReq extends protobuf.Message<IGetActivityReq> {
    constructor(properties: Properties<IGetActivityReq>) {
        super(properties);
        if (properties) {
            if (properties.activityId) { this.activityId = properties.activityId }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public activityId?: number|null = 0
}
export interface IGetActivityResp {
    activity?: IActivity
}
@protobuf.Type.d("tss_hall_mall_v2_GetActivityResp")
export class GetActivityResp extends protobuf.Message<IGetActivityResp> {
    constructor(properties: Properties<IGetActivityResp>) {
        super(properties);
        if (properties) {
            if (properties.activity) { this.activity = Activity.create(properties.activity) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_mall_v2_Activity", "optional")
    public activity?: Activity|null
}
export interface IGetActivityByUserReq {
    activityId?: number|null
}
@protobuf.Type.d("tss_hall_mall_v2_GetActivityByUserReq")
export class GetActivityByUserReq extends protobuf.Message<IGetActivityByUserReq> {
    constructor(properties: Properties<IGetActivityByUserReq>) {
        super(properties);
        if (properties) {
            if (properties.activityId) { this.activityId = properties.activityId }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public activityId?: number|null = 0
}
export interface IGetActivityByUserResp {
    activity?: IActivity
}
@protobuf.Type.d("tss_hall_mall_v2_GetActivityByUserResp")
export class GetActivityByUserResp extends protobuf.Message<IGetActivityByUserResp> {
    constructor(properties: Properties<IGetActivityByUserResp>) {
        super(properties);
        if (properties) {
            if (properties.activity) { this.activity = Activity.create(properties.activity) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_mall_v2_Activity", "optional")
    public activity?: Activity|null
}
export interface IGetActivityByTypeReq {
    type?: tss_hall_common_ActivityType|null
}
@protobuf.Type.d("tss_hall_mall_v2_GetActivityByTypeReq")
export class GetActivityByTypeReq extends protobuf.Message<IGetActivityByTypeReq> {
    constructor(properties: Properties<IGetActivityByTypeReq>) {
        super(properties);
        if (properties) {
            if (properties.type) { this.type = properties.type }
        }
	}
    @protobuf.Field.d(1, tss_hall_common_ActivityType, "optional", tss_hall_common_ActivityType.ActivityTypeUnknown)
    public type?: tss_hall_common_ActivityType|null = tss_hall_common_ActivityType.ActivityTypeUnknown
}
export interface IGetActivityByTypeResp {
    activity?: IActivity[]
}
@protobuf.Type.d("tss_hall_mall_v2_GetActivityByTypeResp")
export class GetActivityByTypeResp extends protobuf.Message<IGetActivityByTypeResp> {
    constructor(properties: Properties<IGetActivityByTypeResp>) {
        super(properties);
        if (properties) {
            if (properties.activity) { this.activity = []; properties.activity.forEach((value, index)=>{this.activity[index] = Activity.create(properties.activity[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_mall_v2_Activity", "repeated")
    public activity?: Activity[] = []
}
export interface IActivityPriority {
    Id?: number|null
    priority?: number|null
}
@protobuf.Type.d("tss_hall_mall_v2_ActivityPriority")
export class ActivityPriority extends protobuf.Message<IActivityPriority> {
    constructor(properties: Properties<IActivityPriority>) {
        super(properties);
        if (properties) {
            if (properties.Id) { this.Id = properties.Id }
            if (properties.priority) { this.priority = properties.priority }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public Id?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public priority?: number|null = 0
}
export interface IBatchUpdateActivityPriorityReq {
    activityPriority?: IActivityPriority[]
}
@protobuf.Type.d("tss_hall_mall_v2_BatchUpdateActivityPriorityReq")
export class BatchUpdateActivityPriorityReq extends protobuf.Message<IBatchUpdateActivityPriorityReq> {
    constructor(properties: Properties<IBatchUpdateActivityPriorityReq>) {
        super(properties);
        if (properties) {
            if (properties.activityPriority) { this.activityPriority = []; properties.activityPriority.forEach((value, index)=>{this.activityPriority[index] = ActivityPriority.create(properties.activityPriority[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_mall_v2_ActivityPriority", "repeated")
    public activityPriority?: ActivityPriority[] = []
}
export interface ISendUserPresentReq {
    spuId?: number|null
    receiver?: number[]
    scene?: string|null
    content?: string|null
}
@protobuf.Type.d("tss_hall_mall_v2_SendUserPresentReq")
export class SendUserPresentReq extends protobuf.Message<ISendUserPresentReq> {
    constructor(properties: Properties<ISendUserPresentReq>) {
        super(properties);
        if (properties) {
            if (properties.spuId) { this.spuId = properties.spuId }
            if (properties.receiver) { this.receiver = []; properties.receiver.forEach((value, index)=>{this.receiver[index] = properties.receiver[index]})}
            if (properties.scene) { this.scene = properties.scene }
            if (properties.content) { this.content = properties.content }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public spuId?: number|null = 0
    @protobuf.Field.d(3, "int64", "repeated", [])
    public receiver?: number[] = []
    @protobuf.Field.d(4, "string", "optional", )
    public scene?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public content?: string|null = ""
}
export interface IAskUserPresentReq {
    spuId?: number|null
    sender?: number|null
    content?: string|null
    senders?: number[]
}
@protobuf.Type.d("tss_hall_mall_v2_AskUserPresentReq")
export class AskUserPresentReq extends protobuf.Message<IAskUserPresentReq> {
    constructor(properties: Properties<IAskUserPresentReq>) {
        super(properties);
        if (properties) {
            if (properties.spuId) { this.spuId = properties.spuId }
            if (properties.sender) { this.sender = properties.sender }
            if (properties.content) { this.content = properties.content }
            if (properties.senders) { this.senders = []; properties.senders.forEach((value, index)=>{this.senders[index] = properties.senders[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public spuId?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public sender?: number|null = 0
    @protobuf.Field.d(4, "string", "optional", )
    public content?: string|null = ""
    @protobuf.Field.d(5, "int64", "repeated", [])
    public senders?: number[] = []
}
export interface IGetUserPresentLogReq {
    spuId?: number|null
}
@protobuf.Type.d("tss_hall_mall_v2_GetUserPresentLogReq")
export class GetUserPresentLogReq extends protobuf.Message<IGetUserPresentLogReq> {
    constructor(properties: Properties<IGetUserPresentLogReq>) {
        super(properties);
        if (properties) {
            if (properties.spuId) { this.spuId = properties.spuId }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public spuId?: number|null = 0
}
export interface IGetUserPresentLogResp {
    userPresentLog?: IUserPresentLog
}
@protobuf.Type.d("tss_hall_mall_v2_GetUserPresentLogResp")
export class GetUserPresentLogResp extends protobuf.Message<IGetUserPresentLogResp> {
    constructor(properties: Properties<IGetUserPresentLogResp>) {
        super(properties);
        if (properties) {
            if (properties.userPresentLog) { this.userPresentLog = UserPresentLog.create(properties.userPresentLog) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_mall_v2_UserPresentLog", "optional")
    public userPresentLog?: UserPresentLog|null
}
export interface IListTabByUserReq {
    tabType?: TabType|null
}
@protobuf.Type.d("tss_hall_mall_v2_ListTabByUserReq")
export class ListTabByUserReq extends protobuf.Message<IListTabByUserReq> {
    constructor(properties: Properties<IListTabByUserReq>) {
        super(properties);
        if (properties) {
            if (properties.tabType) { this.tabType = properties.tabType }
        }
	}
    @protobuf.Field.d(1, TabType, "optional", TabType.TabTypeUnknown)
    public tabType?: TabType|null = TabType.TabTypeUnknown
}
export interface IListUserPresentOrderReq {
    page?: number|null
    pageSize?: number|null
    sender?: number|null
    receiver?: number|null
    beginAt?: number|null
    endAt?: number|null
    orderId?: string|null
}
@protobuf.Type.d("tss_hall_mall_v2_ListUserPresentOrderReq")
export class ListUserPresentOrderReq extends protobuf.Message<IListUserPresentOrderReq> {
    constructor(properties: Properties<IListUserPresentOrderReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.sender) { this.sender = properties.sender }
            if (properties.receiver) { this.receiver = properties.receiver }
            if (properties.beginAt) { this.beginAt = properties.beginAt }
            if (properties.endAt) { this.endAt = properties.endAt }
            if (properties.orderId) { this.orderId = properties.orderId }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public sender?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public receiver?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public beginAt?: number|null = 0
    @protobuf.Field.d(6, "int64", "optional", 0)
    public endAt?: number|null = 0
    @protobuf.Field.d(7, "string", "optional", )
    public orderId?: string|null = ""
}
export interface IListUserPresentOrderResp {
    order?: IUserPresentOrder[]
    total?: number|null
}
@protobuf.Type.d("tss_hall_mall_v2_ListUserPresentOrderResp")
export class ListUserPresentOrderResp extends protobuf.Message<IListUserPresentOrderResp> {
    constructor(properties: Properties<IListUserPresentOrderResp>) {
        super(properties);
        if (properties) {
            if (properties.order) { this.order = []; properties.order.forEach((value, index)=>{this.order[index] = UserPresentOrder.create(properties.order[index]) as any})}
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "tss_hall_mall_v2_UserPresentOrder", "repeated")
    public order?: UserPresentOrder[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public total?: number|null = 0
}
export interface IGetUserPresentBadgeResp {
    freeSendNumTotal?: number|null
}
@protobuf.Type.d("tss_hall_mall_v2_GetUserPresentBadgeResp")
export class GetUserPresentBadgeResp extends protobuf.Message<IGetUserPresentBadgeResp> {
    constructor(properties: Properties<IGetUserPresentBadgeResp>) {
        super(properties);
        if (properties) {
            if (properties.freeSendNumTotal) { this.freeSendNumTotal = properties.freeSendNumTotal }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public freeSendNumTotal?: number|null = 0
}
export interface ISendUserPresentResp {
    order?: IOrder
}
@protobuf.Type.d("tss_hall_mall_v2_SendUserPresentResp")
export class SendUserPresentResp extends protobuf.Message<ISendUserPresentResp> {
    constructor(properties: Properties<ISendUserPresentResp>) {
        super(properties);
        if (properties) {
            if (properties.order) { this.order = Order.create(properties.order) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_mall_v2_Order", "optional")
    public order?: Order|null
}
class $MallService extends RpcService {
    async SaveTab(req: ISaveTabReq, params?: RpcParams) : Promise<{err:number, resp:ISaveTabResp}> {
        let data = SaveTabReq.create(req)
        this.onBeforeReq("SaveTab", data, params)
        const buffer = SaveTabReq.encode(data).finish()
        let [err, pack] = await this.call("SaveTab", buffer, params)
        if (err) {
            this.onBeforeResp("SaveTab", err)
            return {err: err, resp: null}
        } else {
            let resp = SaveTabResp.decode(pack) as any
            this.onBeforeResp("SaveTab", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListTab(req: IListTabReq, params?: RpcParams) : Promise<{err:number, resp:IListTabResp}> {
        let data = ListTabReq.create(req)
        this.onBeforeReq("ListTab", data, params)
        const buffer = ListTabReq.encode(data).finish()
        let [err, pack] = await this.call("ListTab", buffer, params)
        if (err) {
            this.onBeforeResp("ListTab", err)
            return {err: err, resp: null}
        } else {
            let resp = ListTabResp.decode(pack) as any
            this.onBeforeResp("ListTab", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetTab(req: IGetTabReq, params?: RpcParams) : Promise<{err:number, resp:IGetTabResp}> {
        let data = GetTabReq.create(req)
        this.onBeforeReq("GetTab", data, params)
        const buffer = GetTabReq.encode(data).finish()
        let [err, pack] = await this.call("GetTab", buffer, params)
        if (err) {
            this.onBeforeResp("GetTab", err)
            return {err: err, resp: null}
        } else {
            let resp = GetTabResp.decode(pack) as any
            this.onBeforeResp("GetTab", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchUpdateTabPriority(req: IBatchUpdateTabPriorityReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = BatchUpdateTabPriorityReq.create(req)
        this.onBeforeReq("BatchUpdateTabPriority", data, params)
        const buffer = BatchUpdateTabPriorityReq.encode(data).finish()
        let [err, pack] = await this.call("BatchUpdateTabPriority", buffer, params)
        if (err) {
            this.onBeforeResp("BatchUpdateTabPriority", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("BatchUpdateTabPriority", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListTabByUser(req: IListTabByUserReq, params?: RpcParams) : Promise<{err:number, resp:IListTabByUserResp}> {
        let data = ListTabByUserReq.create(req)
        this.onBeforeReq("ListTabByUser", data, params)
        const buffer = ListTabByUserReq.encode(data).finish()
        let [err, pack] = await this.call("ListTabByUser", buffer, params)
        if (err) {
            this.onBeforeResp("ListTabByUser", err)
            return {err: err, resp: null}
        } else {
            let resp = ListTabByUserResp.decode(pack) as any
            this.onBeforeResp("ListTabByUser", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DeleteTab(req: IDeleteTabReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = DeleteTabReq.create(req)
        this.onBeforeReq("DeleteTab", data, params)
        const buffer = DeleteTabReq.encode(data).finish()
        let [err, pack] = await this.call("DeleteTab", buffer, params)
        if (err) {
            this.onBeforeResp("DeleteTab", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("DeleteTab", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetTabForSync(req: base_IBatchGetResourceReq, params?: RpcParams) : Promise<{err:number, resp:base_IBatchGetResourceResp}> {
        let data = base_BatchGetResourceReq.create(req)
        this.onBeforeReq("BatchGetTabForSync", data, params)
        const buffer = base_BatchGetResourceReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetTabForSync", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetTabForSync", err)
            return {err: err, resp: null}
        } else {
            let resp = base_BatchGetResourceResp.decode(pack) as any
            this.onBeforeResp("BatchGetTabForSync", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SaveSPU(req: ISaveSPUReq, params?: RpcParams) : Promise<{err:number, resp:ISaveSPUResp}> {
        let data = SaveSPUReq.create(req)
        this.onBeforeReq("SaveSPU", data, params)
        const buffer = SaveSPUReq.encode(data).finish()
        let [err, pack] = await this.call("SaveSPU", buffer, params)
        if (err) {
            this.onBeforeResp("SaveSPU", err)
            return {err: err, resp: null}
        } else {
            let resp = SaveSPUResp.decode(pack) as any
            this.onBeforeResp("SaveSPU", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListSPU(req: IListSPUReq, params?: RpcParams) : Promise<{err:number, resp:IListSPUResp}> {
        let data = ListSPUReq.create(req)
        this.onBeforeReq("ListSPU", data, params)
        const buffer = ListSPUReq.encode(data).finish()
        let [err, pack] = await this.call("ListSPU", buffer, params)
        if (err) {
            this.onBeforeResp("ListSPU", err)
            return {err: err, resp: null}
        } else {
            let resp = ListSPUResp.decode(pack) as any
            this.onBeforeResp("ListSPU", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetCoinSPUNeed(req: IGetCoinSPUNeedReq, params?: RpcParams) : Promise<{err:number, resp:IGetCoinSPUNeedResp}> {
        let data = GetCoinSPUNeedReq.create(req)
        this.onBeforeReq("GetCoinSPUNeed", data, params)
        const buffer = GetCoinSPUNeedReq.encode(data).finish()
        let [err, pack] = await this.call("GetCoinSPUNeed", buffer, params)
        if (err) {
            this.onBeforeResp("GetCoinSPUNeed", err)
            return {err: err, resp: null}
        } else {
            let resp = GetCoinSPUNeedResp.decode(pack) as any
            this.onBeforeResp("GetCoinSPUNeed", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetCurrencySPUNeed(req: IGetCurrencySPUNeedReq, params?: RpcParams) : Promise<{err:number, resp:IGetCurrencySPUNeedResp}> {
        let data = GetCurrencySPUNeedReq.create(req)
        this.onBeforeReq("GetCurrencySPUNeed", data, params)
        const buffer = GetCurrencySPUNeedReq.encode(data).finish()
        let [err, pack] = await this.call("GetCurrencySPUNeed", buffer, params)
        if (err) {
            this.onBeforeResp("GetCurrencySPUNeed", err)
            return {err: err, resp: null}
        } else {
            let resp = GetCurrencySPUNeedResp.decode(pack) as any
            this.onBeforeResp("GetCurrencySPUNeed", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListSPUByUser(req: IListSPUByUserReq, params?: RpcParams) : Promise<{err:number, resp:IListSPUByUserResp}> {
        let data = ListSPUByUserReq.create(req)
        this.onBeforeReq("ListSPUByUser", data, params)
        const buffer = ListSPUByUserReq.encode(data).finish()
        let [err, pack] = await this.call("ListSPUByUser", buffer, params)
        if (err) {
            this.onBeforeResp("ListSPUByUser", err)
            return {err: err, resp: null}
        } else {
            let resp = ListSPUByUserResp.decode(pack) as any
            this.onBeforeResp("ListSPUByUser", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListSPUByUserWithBelong(req: IListSPUByUserWithBelongReq, params?: RpcParams) : Promise<{err:number, resp:IListSPUByUserWithBelongResp}> {
        let data = ListSPUByUserWithBelongReq.create(req)
        this.onBeforeReq("ListSPUByUserWithBelong", data, params)
        const buffer = ListSPUByUserWithBelongReq.encode(data).finish()
        let [err, pack] = await this.call("ListSPUByUserWithBelong", buffer, params)
        if (err) {
            this.onBeforeResp("ListSPUByUserWithBelong", err)
            return {err: err, resp: null}
        } else {
            let resp = ListSPUByUserWithBelongResp.decode(pack) as any
            this.onBeforeResp("ListSPUByUserWithBelong", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetSPUByUser(req: IBatchGetSPUByUserReq, params?: RpcParams) : Promise<{err:number, resp:IBatchGetSPUByUserResp}> {
        let data = BatchGetSPUByUserReq.create(req)
        this.onBeforeReq("BatchGetSPUByUser", data, params)
        const buffer = BatchGetSPUByUserReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetSPUByUser", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetSPUByUser", err)
            return {err: err, resp: null}
        } else {
            let resp = BatchGetSPUByUserResp.decode(pack) as any
            this.onBeforeResp("BatchGetSPUByUser", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetSPUForSync(req: base_IBatchGetResourceReq, params?: RpcParams) : Promise<{err:number, resp:base_IBatchGetResourceResp}> {
        let data = base_BatchGetResourceReq.create(req)
        this.onBeforeReq("BatchGetSPUForSync", data, params)
        const buffer = base_BatchGetResourceReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetSPUForSync", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetSPUForSync", err)
            return {err: err, resp: null}
        } else {
            let resp = base_BatchGetResourceResp.decode(pack) as any
            this.onBeforeResp("BatchGetSPUForSync", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetSPU(req: IGetSPUReq, params?: RpcParams) : Promise<{err:number, resp:IGetSPUResp}> {
        let data = GetSPUReq.create(req)
        this.onBeforeReq("GetSPU", data, params)
        const buffer = GetSPUReq.encode(data).finish()
        let [err, pack] = await this.call("GetSPU", buffer, params)
        if (err) {
            this.onBeforeResp("GetSPU", err)
            return {err: err, resp: null}
        } else {
            let resp = GetSPUResp.decode(pack) as any
            this.onBeforeResp("GetSPU", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DeleteSPU(req: IDeleteSPUReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = DeleteSPUReq.create(req)
        this.onBeforeReq("DeleteSPU", data, params)
        const buffer = DeleteSPUReq.encode(data).finish()
        let [err, pack] = await this.call("DeleteSPU", buffer, params)
        if (err) {
            this.onBeforeResp("DeleteSPU", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("DeleteSPU", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetCheapRevivalSPU(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:IGetCheapRevivalSPUResp}> {
        let data = base_Void.create(req)
        this.onBeforeReq("GetCheapRevivalSPU", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("GetCheapRevivalSPU", buffer, params)
        if (err) {
            this.onBeforeResp("GetCheapRevivalSPU", err)
            return {err: err, resp: null}
        } else {
            let resp = GetCheapRevivalSPUResp.decode(pack) as any
            this.onBeforeResp("GetCheapRevivalSPU", err, resp)
            return {err: null, resp: resp}
        }
    }
    async PayRMB(req: IPayRMBReq, params?: RpcParams) : Promise<{err:number, resp:IPayRMBResp}> {
        let data = PayRMBReq.create(req)
        this.onBeforeReq("PayRMB", data, params)
        const buffer = PayRMBReq.encode(data).finish()
        let [err, pack] = await this.call("PayRMB", buffer, params)
        if (err) {
            this.onBeforeResp("PayRMB", err)
            return {err: err, resp: null}
        } else {
            let resp = PayRMBResp.decode(pack) as any
            this.onBeforeResp("PayRMB", err, resp)
            return {err: null, resp: resp}
        }
    }
    async PayRMBCallBack(req: mp_pay_callback_trade_v1_IPaidReq, params?: RpcParams) : Promise<{err:number, resp:mp_pay_callback_trade_v1_IPaidResp}> {
        let data = mp_pay_callback_trade_v1_PaidReq.create(req)
        this.onBeforeReq("PayRMBCallBack", data, params)
        const buffer = mp_pay_callback_trade_v1_PaidReq.encode(data).finish()
        let [err, pack] = await this.call("PayRMBCallBack", buffer, params)
        if (err) {
            this.onBeforeResp("PayRMBCallBack", err)
            return {err: err, resp: null}
        } else {
            let resp = mp_pay_callback_trade_v1_PaidResp.decode(pack) as any
            this.onBeforeResp("PayRMBCallBack", err, resp)
            return {err: null, resp: resp}
        }
    }
    async RefundRMBCallback(req: mp_pay_callback_trade_v1_IPaidReq, params?: RpcParams) : Promise<{err:number, resp:mp_pay_callback_trade_v1_IPaidResp}> {
        let data = mp_pay_callback_trade_v1_PaidReq.create(req)
        this.onBeforeReq("RefundRMBCallback", data, params)
        const buffer = mp_pay_callback_trade_v1_PaidReq.encode(data).finish()
        let [err, pack] = await this.call("RefundRMBCallback", buffer, params)
        if (err) {
            this.onBeforeResp("RefundRMBCallback", err)
            return {err: err, resp: null}
        } else {
            let resp = mp_pay_callback_trade_v1_PaidResp.decode(pack) as any
            this.onBeforeResp("RefundRMBCallback", err, resp)
            return {err: null, resp: resp}
        }
    }
    async CreateOrder(req: ICreateOrderReq, params?: RpcParams) : Promise<{err:number, resp:ICreateOrderResp}> {
        let data = CreateOrderReq.create(req)
        this.onBeforeReq("CreateOrder", data, params)
        const buffer = CreateOrderReq.encode(data).finish()
        let [err, pack] = await this.call("CreateOrder", buffer, params)
        if (err) {
            this.onBeforeResp("CreateOrder", err)
            return {err: err, resp: null}
        } else {
            let resp = CreateOrderResp.decode(pack) as any
            this.onBeforeResp("CreateOrder", err, resp)
            return {err: null, resp: resp}
        }
    }
    async CreateMultiSpuOrder(req: ICreateMultiSpuOrderReq, params?: RpcParams) : Promise<{err:number, resp:ICreateMultiSpuOrderResp}> {
        let data = CreateMultiSpuOrderReq.create(req)
        this.onBeforeReq("CreateMultiSpuOrder", data, params)
        const buffer = CreateMultiSpuOrderReq.encode(data).finish()
        let [err, pack] = await this.call("CreateMultiSpuOrder", buffer, params)
        if (err) {
            this.onBeforeResp("CreateMultiSpuOrder", err)
            return {err: err, resp: null}
        } else {
            let resp = CreateMultiSpuOrderResp.decode(pack) as any
            this.onBeforeResp("CreateMultiSpuOrder", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetOrderByUser(req: IGetOrderByUserReq, params?: RpcParams) : Promise<{err:number, resp:INotifyAfterDeliveryResp}> {
        let data = GetOrderByUserReq.create(req)
        this.onBeforeReq("GetOrderByUser", data, params)
        const buffer = GetOrderByUserReq.encode(data).finish()
        let [err, pack] = await this.call("GetOrderByUser", buffer, params)
        if (err) {
            this.onBeforeResp("GetOrderByUser", err)
            return {err: err, resp: null}
        } else {
            let resp = NotifyAfterDeliveryResp.decode(pack) as any
            this.onBeforeResp("GetOrderByUser", err, resp)
            return {err: null, resp: resp}
        }
    }
    async PayTimeOutCallback(req: IPayTimeOutCallbackReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = PayTimeOutCallbackReq.create(req)
        this.onBeforeReq("PayTimeOutCallback", data, params)
        const buffer = PayTimeOutCallbackReq.encode(data).finish()
        let [err, pack] = await this.call("PayTimeOutCallback", buffer, params)
        if (err) {
            this.onBeforeResp("PayTimeOutCallback", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("PayTimeOutCallback", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListOrder(req: IListOrderReq, params?: RpcParams) : Promise<{err:number, resp:IListOrderResp}> {
        let data = ListOrderReq.create(req)
        this.onBeforeReq("ListOrder", data, params)
        const buffer = ListOrderReq.encode(data).finish()
        let [err, pack] = await this.call("ListOrder", buffer, params)
        if (err) {
            this.onBeforeResp("ListOrder", err)
            return {err: err, resp: null}
        } else {
            let resp = ListOrderResp.decode(pack) as any
            this.onBeforeResp("ListOrder", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetPersonalStat(req: IGetPersonalStatReq, params?: RpcParams) : Promise<{err:number, resp:IGetPersonalStatResp}> {
        let data = GetPersonalStatReq.create(req)
        this.onBeforeReq("GetPersonalStat", data, params)
        const buffer = GetPersonalStatReq.encode(data).finish()
        let [err, pack] = await this.call("GetPersonalStat", buffer, params)
        if (err) {
            this.onBeforeResp("GetPersonalStat", err)
            return {err: err, resp: null}
        } else {
            let resp = GetPersonalStatResp.decode(pack) as any
            this.onBeforeResp("GetPersonalStat", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SaveActivity(req: ISaveActivityReq, params?: RpcParams) : Promise<{err:number, resp:ISaveActivityResp}> {
        let data = SaveActivityReq.create(req)
        this.onBeforeReq("SaveActivity", data, params)
        const buffer = SaveActivityReq.encode(data).finish()
        let [err, pack] = await this.call("SaveActivity", buffer, params)
        if (err) {
            this.onBeforeResp("SaveActivity", err)
            return {err: err, resp: null}
        } else {
            let resp = SaveActivityResp.decode(pack) as any
            this.onBeforeResp("SaveActivity", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListActivity(req: IListActivityReq, params?: RpcParams) : Promise<{err:number, resp:IListActivityResp}> {
        let data = ListActivityReq.create(req)
        this.onBeforeReq("ListActivity", data, params)
        const buffer = ListActivityReq.encode(data).finish()
        let [err, pack] = await this.call("ListActivity", buffer, params)
        if (err) {
            this.onBeforeResp("ListActivity", err)
            return {err: err, resp: null}
        } else {
            let resp = ListActivityResp.decode(pack) as any
            this.onBeforeResp("ListActivity", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetActivity(req: IGetActivityReq, params?: RpcParams) : Promise<{err:number, resp:IGetActivityResp}> {
        let data = GetActivityReq.create(req)
        this.onBeforeReq("GetActivity", data, params)
        const buffer = GetActivityReq.encode(data).finish()
        let [err, pack] = await this.call("GetActivity", buffer, params)
        if (err) {
            this.onBeforeResp("GetActivity", err)
            return {err: err, resp: null}
        } else {
            let resp = GetActivityResp.decode(pack) as any
            this.onBeforeResp("GetActivity", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetActivityByUser(req: IGetActivityByUserReq, params?: RpcParams) : Promise<{err:number, resp:IGetActivityByUserResp}> {
        let data = GetActivityByUserReq.create(req)
        this.onBeforeReq("GetActivityByUser", data, params)
        const buffer = GetActivityByUserReq.encode(data).finish()
        let [err, pack] = await this.call("GetActivityByUser", buffer, params)
        if (err) {
            this.onBeforeResp("GetActivityByUser", err)
            return {err: err, resp: null}
        } else {
            let resp = GetActivityByUserResp.decode(pack) as any
            this.onBeforeResp("GetActivityByUser", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetActivityByType(req: IGetActivityByTypeReq, params?: RpcParams) : Promise<{err:number, resp:IGetActivityByTypeResp}> {
        let data = GetActivityByTypeReq.create(req)
        this.onBeforeReq("GetActivityByType", data, params)
        const buffer = GetActivityByTypeReq.encode(data).finish()
        let [err, pack] = await this.call("GetActivityByType", buffer, params)
        if (err) {
            this.onBeforeResp("GetActivityByType", err)
            return {err: err, resp: null}
        } else {
            let resp = GetActivityByTypeResp.decode(pack) as any
            this.onBeforeResp("GetActivityByType", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListUserActivity(req: IListUserActivityReq, params?: RpcParams) : Promise<{err:number, resp:IListUserActivityResp}> {
        let data = ListUserActivityReq.create(req)
        this.onBeforeReq("ListUserActivity", data, params)
        const buffer = ListUserActivityReq.encode(data).finish()
        let [err, pack] = await this.call("ListUserActivity", buffer, params)
        if (err) {
            this.onBeforeResp("ListUserActivity", err)
            return {err: err, resp: null}
        } else {
            let resp = ListUserActivityResp.decode(pack) as any
            this.onBeforeResp("ListUserActivity", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetActivityForSync(req: base_IBatchGetResourceReq, params?: RpcParams) : Promise<{err:number, resp:base_IBatchGetResourceResp}> {
        let data = base_BatchGetResourceReq.create(req)
        this.onBeforeReq("BatchGetActivityForSync", data, params)
        const buffer = base_BatchGetResourceReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetActivityForSync", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetActivityForSync", err)
            return {err: err, resp: null}
        } else {
            let resp = base_BatchGetResourceResp.decode(pack) as any
            this.onBeforeResp("BatchGetActivityForSync", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DeleteActivity(req: IDeleteActivityReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = DeleteActivityReq.create(req)
        this.onBeforeReq("DeleteActivity", data, params)
        const buffer = DeleteActivityReq.encode(data).finish()
        let [err, pack] = await this.call("DeleteActivity", buffer, params)
        if (err) {
            this.onBeforeResp("DeleteActivity", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("DeleteActivity", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SendUserPresent(req: ISendUserPresentReq, params?: RpcParams) : Promise<{err:number, resp:ISendUserPresentResp}> {
        let data = SendUserPresentReq.create(req)
        this.onBeforeReq("SendUserPresent", data, params)
        const buffer = SendUserPresentReq.encode(data).finish()
        let [err, pack] = await this.call("SendUserPresent", buffer, params)
        if (err) {
            this.onBeforeResp("SendUserPresent", err)
            return {err: err, resp: null}
        } else {
            let resp = SendUserPresentResp.decode(pack) as any
            this.onBeforeResp("SendUserPresent", err, resp)
            return {err: null, resp: resp}
        }
    }
    async AskUserPresent(req: IAskUserPresentReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = AskUserPresentReq.create(req)
        this.onBeforeReq("AskUserPresent", data, params)
        const buffer = AskUserPresentReq.encode(data).finish()
        let [err, pack] = await this.call("AskUserPresent", buffer, params)
        if (err) {
            this.onBeforeResp("AskUserPresent", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("AskUserPresent", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetUserPresentLog(req: IGetUserPresentLogReq, params?: RpcParams) : Promise<{err:number, resp:IGetUserPresentLogResp}> {
        let data = GetUserPresentLogReq.create(req)
        this.onBeforeReq("GetUserPresentLog", data, params)
        const buffer = GetUserPresentLogReq.encode(data).finish()
        let [err, pack] = await this.call("GetUserPresentLog", buffer, params)
        if (err) {
            this.onBeforeResp("GetUserPresentLog", err)
            return {err: err, resp: null}
        } else {
            let resp = GetUserPresentLogResp.decode(pack) as any
            this.onBeforeResp("GetUserPresentLog", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListUserPresentOrder(req: IListUserPresentOrderReq, params?: RpcParams) : Promise<{err:number, resp:IListUserPresentOrderResp}> {
        let data = ListUserPresentOrderReq.create(req)
        this.onBeforeReq("ListUserPresentOrder", data, params)
        const buffer = ListUserPresentOrderReq.encode(data).finish()
        let [err, pack] = await this.call("ListUserPresentOrder", buffer, params)
        if (err) {
            this.onBeforeResp("ListUserPresentOrder", err)
            return {err: err, resp: null}
        } else {
            let resp = ListUserPresentOrderResp.decode(pack) as any
            this.onBeforeResp("ListUserPresentOrder", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetUserPresentBadge(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:IGetUserPresentBadgeResp}> {
        let data = base_Void.create(req)
        this.onBeforeReq("GetUserPresentBadge", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("GetUserPresentBadge", buffer, params)
        if (err) {
            this.onBeforeResp("GetUserPresentBadge", err)
            return {err: err, resp: null}
        } else {
            let resp = GetUserPresentBadgeResp.decode(pack) as any
            this.onBeforeResp("GetUserPresentBadge", err, resp)
            return {err: null, resp: resp}
        }
    }
    NotifyAfterDelivery(data: Uint8Array, params: RpcParams) : {msg: INotifyAfterDeliveryResp, eventID?: number} {
        let msg = NotifyAfterDeliveryResp.decode(data)
        return {msg: msg}
    }
}
export const MallService = new $MallService({
    name: "tss.hall.mall.v2",
})
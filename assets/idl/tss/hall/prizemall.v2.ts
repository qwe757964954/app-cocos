import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  Void as base_Void,IVoid as base_IVoid ,  BatchGetResourceReq as base_BatchGetResourceReq,IBatchGetResourceReq as base_IBatchGetResourceReq ,  BatchGetResourceResp as base_BatchGetResourceResp,IBatchGetResourceResp as base_IBatchGetResourceResp ,  } from "idl/base/base"
import {  SwitchState as tss_common_SwitchState ,  AssetItem as tss_common_AssetItem,IAssetItem as tss_common_IAssetItem ,  } from "idl/tss/common/common_define"
import {  Price as tss_hall_common_Price,IPrice as tss_hall_common_IPrice ,  DeliveryChannelType as tss_hall_common_DeliveryChannelType ,  Address as tss_hall_common_Address,IAddress as tss_hall_common_IAddress ,  } from "idl/tss/hall/common/prizemall"
import {  Order as tss_hall_exchangeorder_v7_Order,IOrder as tss_hall_exchangeorder_v7_IOrder ,  } from "idl/tss/hall/exchangeorder.v7"
export enum PlanType {  
    PlanTypeUnknown = 0,  
    PlanTypeMung = 1,  
    PlanTypeMungAndRMB = 2,  
    PlanTypeProp = 3,
}
export enum PostageType {  
    PostageTypeUnknown = 0,  
    PostageTypeOfficialPay = 1,  
    PostageTypePersonalPay = 2,
}
export enum PeriodType {  
    PeriodTypeUnknown = 0,  
    PeriodTypeDaily = 1,  
    PeriodTypeWeek = 2,  
    PeriodTypeMonth = 3,  
    PeriodTypeForever = 4,
}
export enum AllowRoleType {  
    AllowRoleTypeUnknown = 0,  
    AllowRoleTypeUserNew = 1,  
    AllowRoleTypeUserPremiumCard = 2,
}
export enum OddsDisplayConfType {  
    OddsDisplayConfTypeUnknown = 0,  
    OddsDisplayConfTypeLuckyMung = 1,
}
export enum UserCouponPropStatus {  
    UserCouponPropStatusUnknown = 0,  
    UserCouponPropUnUse = 1,  
    UserCouponPropUsing = 2,  
    UserCouponPropUsed = 3,
}
export enum OrderFromType {  
    OrderFromTypeUnknown = 0,  
    OrderFromTypeMall = 1,  
    OrderFromTypeShoppingCart = 2,
}
export interface IMerchandiseCategory {
    ID?: number|null
    name?: string|null
    commonInfo?: ICommon
}
@protobuf.Type.d("tss_hall_prizemall_v2_MerchandiseCategory")
export class MerchandiseCategory extends protobuf.Message<IMerchandiseCategory> {
    constructor(properties: Properties<IMerchandiseCategory>) {
        super(properties);
        if (properties) {
            if (properties.ID) { this.ID = properties.ID }
            if (properties.name) { this.name = properties.name }
            if (properties.commonInfo) { this.commonInfo = Common.create(properties.commonInfo) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public ID?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(3, "tss_hall_prizemall_v2_Common", "optional")
    public commonInfo?: Common|null
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
@protobuf.Type.d("tss_hall_prizemall_v2_Common")
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
export interface ITab {
    ID?: string|null
    name?: string|null
    commonInfo?: ICommon
    categoryID?: number[]
    tags?: string[]
    effectAt?: number|null
    expireAt?: number|null
    desc?: string|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_Tab")
export class Tab extends protobuf.Message<ITab> {
    constructor(properties: Properties<ITab>) {
        super(properties);
        if (properties) {
            if (properties.ID) { this.ID = properties.ID }
            if (properties.name) { this.name = properties.name }
            if (properties.commonInfo) { this.commonInfo = Common.create(properties.commonInfo) as any }
            if (properties.categoryID) { this.categoryID = []; properties.categoryID.forEach((value, index)=>{this.categoryID[index] = properties.categoryID[index]})}
            if (properties.tags) { this.tags = []; properties.tags.forEach((value, index)=>{this.tags[index] = properties.tags[index]})}
            if (properties.effectAt) { this.effectAt = properties.effectAt }
            if (properties.expireAt) { this.expireAt = properties.expireAt }
            if (properties.desc) { this.desc = properties.desc }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public ID?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(3, "tss_hall_prizemall_v2_Common", "optional")
    public commonInfo?: Common|null
    @protobuf.Field.d(4, "int64", "repeated", [])
    public categoryID?: number[] = []
    @protobuf.Field.d(5, "string", "repeated", [])
    public tags?: string[] = []
    @protobuf.Field.d(6, "int64", "optional", 0)
    public effectAt?: number|null = 0
    @protobuf.Field.d(7, "int64", "optional", 0)
    public expireAt?: number|null = 0
    @protobuf.Field.d(8, "string", "optional", )
    public desc?: string|null = ""
}
export interface IBanner {
    ID?: string|null
    URI?: string|null
    image?: string|null
    effectAt?: number|null
    expireAt?: number|null
    commonInfo?: ICommon
}
@protobuf.Type.d("tss_hall_prizemall_v2_Banner")
export class Banner extends protobuf.Message<IBanner> {
    constructor(properties: Properties<IBanner>) {
        super(properties);
        if (properties) {
            if (properties.ID) { this.ID = properties.ID }
            if (properties.URI) { this.URI = properties.URI }
            if (properties.image) { this.image = properties.image }
            if (properties.effectAt) { this.effectAt = properties.effectAt }
            if (properties.expireAt) { this.expireAt = properties.expireAt }
            if (properties.commonInfo) { this.commonInfo = Common.create(properties.commonInfo) as any }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public ID?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public URI?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public image?: string|null = ""
    @protobuf.Field.d(4, "int64", "optional", 0)
    public effectAt?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public expireAt?: number|null = 0
    @protobuf.Field.d(6, "tss_hall_prizemall_v2_Common", "optional")
    public commonInfo?: Common|null
}
export interface ISpecificValue {
    value?: string|null
    icon?: string|null
    valueCN?: string|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_SpecificValue")
export class SpecificValue extends protobuf.Message<ISpecificValue> {
    constructor(properties: Properties<ISpecificValue>) {
        super(properties);
        if (properties) {
            if (properties.value) { this.value = properties.value }
            if (properties.icon) { this.icon = properties.icon }
            if (properties.valueCN) { this.valueCN = properties.valueCN }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public value?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public icon?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public valueCN?: string|null = ""
}
export interface IProductVariant {
    ID?: string|null
    nameCN?: string|null
    values?: ISpecificValue[]
    desc?: string|null
    createAt?: number|null
    updateAt?: number|null
    operator?: string|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_ProductVariant")
export class ProductVariant extends protobuf.Message<IProductVariant> {
    constructor(properties: Properties<IProductVariant>) {
        super(properties);
        if (properties) {
            if (properties.ID) { this.ID = properties.ID }
            if (properties.nameCN) { this.nameCN = properties.nameCN }
            if (properties.values) { this.values = []; properties.values.forEach((value, index)=>{this.values[index] = SpecificValue.create(properties.values[index]) as any})}
            if (properties.desc) { this.desc = properties.desc }
            if (properties.createAt) { this.createAt = properties.createAt }
            if (properties.updateAt) { this.updateAt = properties.updateAt }
            if (properties.operator) { this.operator = properties.operator }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public ID?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public nameCN?: string|null = ""
    @protobuf.Field.d(3, "tss_hall_prizemall_v2_SpecificValue", "repeated")
    public values?: SpecificValue[] = []
    @protobuf.Field.d(4, "string", "optional", )
    public desc?: string|null = ""
    @protobuf.Field.d(5, "int64", "optional", 0)
    public createAt?: number|null = 0
    @protobuf.Field.d(6, "int64", "optional", 0)
    public updateAt?: number|null = 0
    @protobuf.Field.d(7, "string", "optional", )
    public operator?: string|null = ""
}
export interface IDiscountConf {
    switch?: tss_common_SwitchState|null
    beginAt?: number|null
    endAt?: number|null
    discountPrice?: tss_hall_common_IPrice
    discountNum?: number|null
    cacheOriginPrice?: tss_hall_common_IPrice
}
@protobuf.Type.d("tss_hall_prizemall_v2_DiscountConf")
export class DiscountConf extends protobuf.Message<IDiscountConf> {
    constructor(properties: Properties<IDiscountConf>) {
        super(properties);
        if (properties) {
            if (properties.switch) { this.switch = properties.switch }
            if (properties.beginAt) { this.beginAt = properties.beginAt }
            if (properties.endAt) { this.endAt = properties.endAt }
            if (properties.discountPrice) { this.discountPrice = tss_hall_common_Price.create(properties.discountPrice) as any }
            if (properties.discountNum) { this.discountNum = properties.discountNum }
            if (properties.cacheOriginPrice) { this.cacheOriginPrice = tss_hall_common_Price.create(properties.cacheOriginPrice) as any }
        }
	}
    @protobuf.Field.d(1, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public switch?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
    @protobuf.Field.d(2, "int64", "optional", 0)
    public beginAt?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public endAt?: number|null = 0
    @protobuf.Field.d(4, "tss_hall_common_Price", "optional")
    public discountPrice?: tss_hall_common_Price|null
    @protobuf.Field.d(5, "int64", "optional", 0)
    public discountNum?: number|null = 0
    @protobuf.Field.d(6, "tss_hall_common_Price", "optional")
    public cacheOriginPrice?: tss_hall_common_Price|null
}
export interface ISKUSpecific {
    key?: string|null
    value?: string|null
    nameCN?: string|null
    valueCN?: string|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_SKUSpecific")
export class SKUSpecific extends protobuf.Message<ISKUSpecific> {
    constructor(properties: Properties<ISKUSpecific>) {
        super(properties);
        if (properties) {
            if (properties.key) { this.key = properties.key }
            if (properties.value) { this.value = properties.value }
            if (properties.nameCN) { this.nameCN = properties.nameCN }
            if (properties.valueCN) { this.valueCN = properties.valueCN }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public key?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public value?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public nameCN?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public valueCN?: string|null = ""
}
export interface IImage {
    imgURL?: string|null
    URI?: string|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_Image")
export class Image extends protobuf.Message<IImage> {
    constructor(properties: Properties<IImage>) {
        super(properties);
        if (properties) {
            if (properties.imgURL) { this.imgURL = properties.imgURL }
            if (properties.URI) { this.URI = properties.URI }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public imgURL?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public URI?: string|null = ""
}
export interface ILimitConf {
    switch?: tss_common_SwitchState|null
    type?: PeriodType|null
    targetValue?: number|null
    buyTimes?: number|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_LimitConf")
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
export interface IReductionConf {
    triggerAmt?: number|null
    discountPrice?: tss_hall_common_IPrice
    discountNum?: number|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_ReductionConf")
export class ReductionConf extends protobuf.Message<IReductionConf> {
    constructor(properties: Properties<IReductionConf>) {
        super(properties);
        if (properties) {
            if (properties.triggerAmt) { this.triggerAmt = properties.triggerAmt }
            if (properties.discountPrice) { this.discountPrice = tss_hall_common_Price.create(properties.discountPrice) as any }
            if (properties.discountNum) { this.discountNum = properties.discountNum }
        }
	}
    @protobuf.Field.d(2, "int64", "optional", 0)
    public triggerAmt?: number|null = 0
    @protobuf.Field.d(5, "tss_hall_common_Price", "optional")
    public discountPrice?: tss_hall_common_Price|null
    @protobuf.Field.d(6, "int64", "optional", 0)
    public discountNum?: number|null = 0
}
export interface IBuyAmtReductionConf {
    switch?: tss_common_SwitchState|null
    beginAt?: number|null
    endAt?: number|null
    reductionConfs?: IReductionConf[]
    cacheOriginPrice?: tss_hall_common_IPrice
}
@protobuf.Type.d("tss_hall_prizemall_v2_BuyAmtReductionConf")
export class BuyAmtReductionConf extends protobuf.Message<IBuyAmtReductionConf> {
    constructor(properties: Properties<IBuyAmtReductionConf>) {
        super(properties);
        if (properties) {
            if (properties.switch) { this.switch = properties.switch }
            if (properties.beginAt) { this.beginAt = properties.beginAt }
            if (properties.endAt) { this.endAt = properties.endAt }
            if (properties.reductionConfs) { this.reductionConfs = []; properties.reductionConfs.forEach((value, index)=>{this.reductionConfs[index] = ReductionConf.create(properties.reductionConfs[index]) as any})}
            if (properties.cacheOriginPrice) { this.cacheOriginPrice = tss_hall_common_Price.create(properties.cacheOriginPrice) as any }
        }
	}
    @protobuf.Field.d(1, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public switch?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
    @protobuf.Field.d(3, "int64", "optional", 0)
    public beginAt?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public endAt?: number|null = 0
    @protobuf.Field.d(5, "tss_hall_prizemall_v2_ReductionConf", "repeated")
    public reductionConfs?: ReductionConf[] = []
    @protobuf.Field.d(7, "tss_hall_common_Price", "optional")
    public cacheOriginPrice?: tss_hall_common_Price|null
}
export interface IPricePlan {
    type?: PlanType|null
    switchState?: tss_common_SwitchState|null
    normalPrice?: tss_hall_common_IPrice
    premiumPrice?: tss_hall_common_IPrice
    premiumSwitchState?: tss_common_SwitchState|null
    discountConf?: IDiscountConf
    buyAmtReductionConf?: IBuyAmtReductionConf
}
@protobuf.Type.d("tss_hall_prizemall_v2_PricePlan")
export class PricePlan extends protobuf.Message<IPricePlan> {
    constructor(properties: Properties<IPricePlan>) {
        super(properties);
        if (properties) {
            if (properties.type) { this.type = properties.type }
            if (properties.switchState) { this.switchState = properties.switchState }
            if (properties.normalPrice) { this.normalPrice = tss_hall_common_Price.create(properties.normalPrice) as any }
            if (properties.premiumPrice) { this.premiumPrice = tss_hall_common_Price.create(properties.premiumPrice) as any }
            if (properties.premiumSwitchState) { this.premiumSwitchState = properties.premiumSwitchState }
            if (properties.discountConf) { this.discountConf = DiscountConf.create(properties.discountConf) as any }
            if (properties.buyAmtReductionConf) { this.buyAmtReductionConf = BuyAmtReductionConf.create(properties.buyAmtReductionConf) as any }
        }
	}
    @protobuf.Field.d(1, PlanType, "optional", PlanType.PlanTypeUnknown)
    public type?: PlanType|null = PlanType.PlanTypeUnknown
    @protobuf.Field.d(2, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public switchState?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
    @protobuf.Field.d(3, "tss_hall_common_Price", "optional")
    public normalPrice?: tss_hall_common_Price|null
    @protobuf.Field.d(4, "tss_hall_common_Price", "optional")
    public premiumPrice?: tss_hall_common_Price|null
    @protobuf.Field.d(5, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public premiumSwitchState?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
    @protobuf.Field.d(6, "tss_hall_prizemall_v2_DiscountConf", "optional")
    public discountConf?: DiscountConf|null
    @protobuf.Field.d(7, "tss_hall_prizemall_v2_BuyAmtReductionConf", "optional")
    public buyAmtReductionConf?: BuyAmtReductionConf|null
}
export interface IRoleLimitConf {
    switch?: tss_common_SwitchState|null
    type?: AllowRoleType|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_RoleLimitConf")
export class RoleLimitConf extends protobuf.Message<IRoleLimitConf> {
    constructor(properties: Properties<IRoleLimitConf>) {
        super(properties);
        if (properties) {
            if (properties.switch) { this.switch = properties.switch }
            if (properties.type) { this.type = properties.type }
        }
	}
    @protobuf.Field.d(1, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public switch?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
    @protobuf.Field.d(2, AllowRoleType, "optional", AllowRoleType.AllowRoleTypeUnknown)
    public type?: AllowRoleType|null = AllowRoleType.AllowRoleTypeUnknown
}
export interface ICouponPropConf {
    switch?: tss_common_SwitchState|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_CouponPropConf")
export class CouponPropConf extends protobuf.Message<ICouponPropConf> {
    constructor(properties: Properties<ICouponPropConf>) {
        super(properties);
        if (properties) {
            if (properties.switch) { this.switch = properties.switch }
        }
	}
    @protobuf.Field.d(1, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public switch?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
}
export interface IOddsConf {
    spuID?: number|null
    skuID?: number|null
    odds?: number|null
    img?: string|null
    showPrice?: number|null
    name?: string|null
    num?: number|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_OddsConf")
export class OddsConf extends protobuf.Message<IOddsConf> {
    constructor(properties: Properties<IOddsConf>) {
        super(properties);
        if (properties) {
            if (properties.spuID) { this.spuID = properties.spuID }
            if (properties.skuID) { this.skuID = properties.skuID }
            if (properties.odds) { this.odds = properties.odds }
            if (properties.img) { this.img = properties.img }
            if (properties.showPrice) { this.showPrice = properties.showPrice }
            if (properties.name) { this.name = properties.name }
            if (properties.num) { this.num = properties.num }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public spuID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public skuID?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public odds?: number|null = 0
    @protobuf.Field.d(4, "string", "optional", )
    public img?: string|null = ""
    @protobuf.Field.d(5, "int64", "optional", 0)
    public showPrice?: number|null = 0
    @protobuf.Field.d(6, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(7, "int64", "optional", 0)
    public num?: number|null = 0
}
export interface IDisplayGroup {
    imgs?: string[]
    groupName?: string|null
    oddsConfs?: IOddsConf[]
    desc?: string|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_DisplayGroup")
export class DisplayGroup extends protobuf.Message<IDisplayGroup> {
    constructor(properties: Properties<IDisplayGroup>) {
        super(properties);
        if (properties) {
            if (properties.imgs) { this.imgs = []; properties.imgs.forEach((value, index)=>{this.imgs[index] = properties.imgs[index]})}
            if (properties.groupName) { this.groupName = properties.groupName }
            if (properties.oddsConfs) { this.oddsConfs = []; properties.oddsConfs.forEach((value, index)=>{this.oddsConfs[index] = OddsConf.create(properties.oddsConfs[index]) as any})}
            if (properties.desc) { this.desc = properties.desc }
        }
	}
    @protobuf.Field.d(1, "string", "repeated", [])
    public imgs?: string[] = []
    @protobuf.Field.d(2, "string", "optional", )
    public groupName?: string|null = ""
    @protobuf.Field.d(3, "tss_hall_prizemall_v2_OddsConf", "repeated")
    public oddsConfs?: OddsConf[] = []
    @protobuf.Field.d(4, "string", "optional", )
    public desc?: string|null = ""
}
export interface IOddsDisplayConf {
    switch?: tss_common_SwitchState|null
    displayGroups?: IDisplayGroup[]
    title?: string|null
    type?: OddsDisplayConfType|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_OddsDisplayConf")
export class OddsDisplayConf extends protobuf.Message<IOddsDisplayConf> {
    constructor(properties: Properties<IOddsDisplayConf>) {
        super(properties);
        if (properties) {
            if (properties.switch) { this.switch = properties.switch }
            if (properties.displayGroups) { this.displayGroups = []; properties.displayGroups.forEach((value, index)=>{this.displayGroups[index] = DisplayGroup.create(properties.displayGroups[index]) as any})}
            if (properties.title) { this.title = properties.title }
            if (properties.type) { this.type = properties.type }
        }
	}
    @protobuf.Field.d(1, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public switch?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
    @protobuf.Field.d(2, "tss_hall_prizemall_v2_DisplayGroup", "repeated")
    public displayGroups?: DisplayGroup[] = []
    @protobuf.Field.d(3, "string", "optional", )
    public title?: string|null = ""
    @protobuf.Field.d(4, OddsDisplayConfType, "optional", OddsDisplayConfType.OddsDisplayConfTypeUnknown)
    public type?: OddsDisplayConfType|null = OddsDisplayConfType.OddsDisplayConfTypeUnknown
}
export interface IUserCouponProp {
    ID?: string|null
    uid?: number|null
    propId?: number|null
    propName?: string|null
    expireAt?: number|null
    discount?: number|null
    status?: UserCouponPropStatus|null
    img?: string|null
    icon?: string|null
    RelatedSkuId?: number|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_UserCouponProp")
export class UserCouponProp extends protobuf.Message<IUserCouponProp> {
    constructor(properties: Properties<IUserCouponProp>) {
        super(properties);
        if (properties) {
            if (properties.ID) { this.ID = properties.ID }
            if (properties.uid) { this.uid = properties.uid }
            if (properties.propId) { this.propId = properties.propId }
            if (properties.propName) { this.propName = properties.propName }
            if (properties.expireAt) { this.expireAt = properties.expireAt }
            if (properties.discount) { this.discount = properties.discount }
            if (properties.status) { this.status = properties.status }
            if (properties.img) { this.img = properties.img }
            if (properties.icon) { this.icon = properties.icon }
            if (properties.RelatedSkuId) { this.RelatedSkuId = properties.RelatedSkuId }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public ID?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public propId?: number|null = 0
    @protobuf.Field.d(4, "string", "optional", )
    public propName?: string|null = ""
    @protobuf.Field.d(5, "int64", "optional", 0)
    public expireAt?: number|null = 0
    @protobuf.Field.d(6, "int64", "optional", 0)
    public discount?: number|null = 0
    @protobuf.Field.d(7, UserCouponPropStatus, "optional", UserCouponPropStatus.UserCouponPropStatusUnknown)
    public status?: UserCouponPropStatus|null = UserCouponPropStatus.UserCouponPropStatusUnknown
    @protobuf.Field.d(8, "string", "optional", )
    public img?: string|null = ""
    @protobuf.Field.d(9, "string", "optional", )
    public icon?: string|null = ""
    @protobuf.Field.d(10, "int64", "optional", 0)
    public RelatedSkuId?: number|null = 0
}
export interface ISPU {
    ID?: number|null
    commonInfo?: ICommon
    name?: string|null
    desc?: string|null
    categoryID?: number|null
    categoryName?: string|null
    introduce?: IImage[]
    postage?: PostageType|null
    deliveryChannel?: tss_hall_common_DeliveryChannelType|null
    tags?: string[]
    commentSwitchState?: tss_common_SwitchState|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_SPU")
export class SPU extends protobuf.Message<ISPU> {
    constructor(properties: Properties<ISPU>) {
        super(properties);
        if (properties) {
            if (properties.ID) { this.ID = properties.ID }
            if (properties.commonInfo) { this.commonInfo = Common.create(properties.commonInfo) as any }
            if (properties.name) { this.name = properties.name }
            if (properties.desc) { this.desc = properties.desc }
            if (properties.categoryID) { this.categoryID = properties.categoryID }
            if (properties.categoryName) { this.categoryName = properties.categoryName }
            if (properties.introduce) { this.introduce = []; properties.introduce.forEach((value, index)=>{this.introduce[index] = Image.create(properties.introduce[index]) as any})}
            if (properties.postage) { this.postage = properties.postage }
            if (properties.deliveryChannel) { this.deliveryChannel = properties.deliveryChannel }
            if (properties.tags) { this.tags = []; properties.tags.forEach((value, index)=>{this.tags[index] = properties.tags[index]})}
            if (properties.commentSwitchState) { this.commentSwitchState = properties.commentSwitchState }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public ID?: number|null = 0
    @protobuf.Field.d(2, "tss_hall_prizemall_v2_Common", "optional")
    public commonInfo?: Common|null
    @protobuf.Field.d(3, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public desc?: string|null = ""
    @protobuf.Field.d(5, "int64", "optional", 0)
    public categoryID?: number|null = 0
    @protobuf.Field.d(6, "string", "optional", )
    public categoryName?: string|null = ""
    @protobuf.Field.d(7, "tss_hall_prizemall_v2_Image", "repeated")
    public introduce?: Image[] = []
    @protobuf.Field.d(8, PostageType, "optional", PostageType.PostageTypeUnknown)
    public postage?: PostageType|null = PostageType.PostageTypeUnknown
    @protobuf.Field.d(9, tss_hall_common_DeliveryChannelType, "optional", tss_hall_common_DeliveryChannelType.DeliveryChannelTypeUnknown)
    public deliveryChannel?: tss_hall_common_DeliveryChannelType|null = tss_hall_common_DeliveryChannelType.DeliveryChannelTypeUnknown
    @protobuf.Field.d(10, "string", "repeated", [])
    public tags?: string[] = []
    @protobuf.Field.d(11, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public commentSwitchState?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
}
export interface ISKU {
    ID?: number|null
    commonInfo?: ICommon
    name?: string|null
    desc?: string|null
    showImages?: string[]
    salesAmount?: number|null
    prices?: IPricePlan[]
    showPrice?: number|null
    spec?: ISKUSpecific[]
    stock?: number|null
    SPUID?: number|null
    categoryID?: number|null
    tags?: string[]
    beginAt?: number|null
    endAt?: number|null
    listImage?: string|null
    effectAt?: number|null
    expireAt?: number|null
    categroyName?: string|null
    postage?: PostageType|null
    deliveryChannel?: tss_hall_common_DeliveryChannelType|null
    propAsset?: tss_common_IAssetItem
    showInListSwitchState?: tss_common_SwitchState|null
    commentSwitchState?: tss_common_SwitchState|null
    limitConf?: ILimitConf
    roleLimitConf?: IRoleLimitConf
    couponPropConf?: ICouponPropConf
    userCouponProp?: IUserCouponProp
    oddsDisplayConf?: IOddsDisplayConf
}
@protobuf.Type.d("tss_hall_prizemall_v2_SKU")
export class SKU extends protobuf.Message<ISKU> {
    constructor(properties: Properties<ISKU>) {
        super(properties);
        if (properties) {
            if (properties.ID) { this.ID = properties.ID }
            if (properties.commonInfo) { this.commonInfo = Common.create(properties.commonInfo) as any }
            if (properties.name) { this.name = properties.name }
            if (properties.desc) { this.desc = properties.desc }
            if (properties.showImages) { this.showImages = []; properties.showImages.forEach((value, index)=>{this.showImages[index] = properties.showImages[index]})}
            if (properties.salesAmount) { this.salesAmount = properties.salesAmount }
            if (properties.prices) { this.prices = []; properties.prices.forEach((value, index)=>{this.prices[index] = PricePlan.create(properties.prices[index]) as any})}
            if (properties.showPrice) { this.showPrice = properties.showPrice }
            if (properties.spec) { this.spec = []; properties.spec.forEach((value, index)=>{this.spec[index] = SKUSpecific.create(properties.spec[index]) as any})}
            if (properties.stock) { this.stock = properties.stock }
            if (properties.SPUID) { this.SPUID = properties.SPUID }
            if (properties.categoryID) { this.categoryID = properties.categoryID }
            if (properties.tags) { this.tags = []; properties.tags.forEach((value, index)=>{this.tags[index] = properties.tags[index]})}
            if (properties.beginAt) { this.beginAt = properties.beginAt }
            if (properties.endAt) { this.endAt = properties.endAt }
            if (properties.listImage) { this.listImage = properties.listImage }
            if (properties.effectAt) { this.effectAt = properties.effectAt }
            if (properties.expireAt) { this.expireAt = properties.expireAt }
            if (properties.categroyName) { this.categroyName = properties.categroyName }
            if (properties.postage) { this.postage = properties.postage }
            if (properties.deliveryChannel) { this.deliveryChannel = properties.deliveryChannel }
            if (properties.propAsset) { this.propAsset = tss_common_AssetItem.create(properties.propAsset) as any }
            if (properties.showInListSwitchState) { this.showInListSwitchState = properties.showInListSwitchState }
            if (properties.commentSwitchState) { this.commentSwitchState = properties.commentSwitchState }
            if (properties.limitConf) { this.limitConf = LimitConf.create(properties.limitConf) as any }
            if (properties.roleLimitConf) { this.roleLimitConf = RoleLimitConf.create(properties.roleLimitConf) as any }
            if (properties.couponPropConf) { this.couponPropConf = CouponPropConf.create(properties.couponPropConf) as any }
            if (properties.userCouponProp) { this.userCouponProp = UserCouponProp.create(properties.userCouponProp) as any }
            if (properties.oddsDisplayConf) { this.oddsDisplayConf = OddsDisplayConf.create(properties.oddsDisplayConf) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public ID?: number|null = 0
    @protobuf.Field.d(2, "tss_hall_prizemall_v2_Common", "optional")
    public commonInfo?: Common|null
    @protobuf.Field.d(3, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public desc?: string|null = ""
    @protobuf.Field.d(5, "string", "repeated", [])
    public showImages?: string[] = []
    @protobuf.Field.d(6, "int64", "optional", 0)
    public salesAmount?: number|null = 0
    @protobuf.Field.d(7, "tss_hall_prizemall_v2_PricePlan", "repeated")
    public prices?: PricePlan[] = []
    @protobuf.Field.d(8, "int64", "optional", 0)
    public showPrice?: number|null = 0
    @protobuf.Field.d(9, "tss_hall_prizemall_v2_SKUSpecific", "repeated")
    public spec?: SKUSpecific[] = []
    @protobuf.Field.d(10, "int64", "optional", 0)
    public stock?: number|null = 0
    @protobuf.Field.d(11, "int64", "optional", 0)
    public SPUID?: number|null = 0
    @protobuf.Field.d(12, "int64", "optional", 0)
    public categoryID?: number|null = 0
    @protobuf.Field.d(13, "string", "repeated", [])
    public tags?: string[] = []
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
    @protobuf.Field.d(19, "string", "optional", )
    public categroyName?: string|null = ""
    @protobuf.Field.d(20, PostageType, "optional", PostageType.PostageTypeUnknown)
    public postage?: PostageType|null = PostageType.PostageTypeUnknown
    @protobuf.Field.d(21, tss_hall_common_DeliveryChannelType, "optional", tss_hall_common_DeliveryChannelType.DeliveryChannelTypeUnknown)
    public deliveryChannel?: tss_hall_common_DeliveryChannelType|null = tss_hall_common_DeliveryChannelType.DeliveryChannelTypeUnknown
    @protobuf.Field.d(22, "tss_common_AssetItem", "optional")
    public propAsset?: tss_common_AssetItem|null
    @protobuf.Field.d(23, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public showInListSwitchState?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
    @protobuf.Field.d(24, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public commentSwitchState?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
    @protobuf.Field.d(25, "tss_hall_prizemall_v2_LimitConf", "optional")
    public limitConf?: LimitConf|null
    @protobuf.Field.d(26, "tss_hall_prizemall_v2_RoleLimitConf", "optional")
    public roleLimitConf?: RoleLimitConf|null
    @protobuf.Field.d(27, "tss_hall_prizemall_v2_CouponPropConf", "optional")
    public couponPropConf?: CouponPropConf|null
    @protobuf.Field.d(28, "tss_hall_prizemall_v2_UserCouponProp", "optional")
    public userCouponProp?: UserCouponProp|null
    @protobuf.Field.d(29, "tss_hall_prizemall_v2_OddsDisplayConf", "optional")
    public oddsDisplayConf?: OddsDisplayConf|null
}
export interface IMerchandise {
    spu?: ISPU
    spec?: IProductVariant[]
    product?: ISKU[]
}
@protobuf.Type.d("tss_hall_prizemall_v2_Merchandise")
export class Merchandise extends protobuf.Message<IMerchandise> {
    constructor(properties: Properties<IMerchandise>) {
        super(properties);
        if (properties) {
            if (properties.spu) { this.spu = SPU.create(properties.spu) as any }
            if (properties.spec) { this.spec = []; properties.spec.forEach((value, index)=>{this.spec[index] = ProductVariant.create(properties.spec[index]) as any})}
            if (properties.product) { this.product = []; properties.product.forEach((value, index)=>{this.product[index] = SKU.create(properties.product[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizemall_v2_SPU", "optional")
    public spu?: SPU|null
    @protobuf.Field.d(2, "tss_hall_prizemall_v2_ProductVariant", "repeated")
    public spec?: ProductVariant[] = []
    @protobuf.Field.d(3, "tss_hall_prizemall_v2_SKU", "repeated")
    public product?: SKU[] = []
}
export interface IMerchandiseForConf {
    spu?: ISPU
    oddsDisplayConf?: IOddsDisplayConf
    sku?: ISKU[]
}
@protobuf.Type.d("tss_hall_prizemall_v2_MerchandiseForConf")
export class MerchandiseForConf extends protobuf.Message<IMerchandiseForConf> {
    constructor(properties: Properties<IMerchandiseForConf>) {
        super(properties);
        if (properties) {
            if (properties.spu) { this.spu = SPU.create(properties.spu) as any }
            if (properties.oddsDisplayConf) { this.oddsDisplayConf = OddsDisplayConf.create(properties.oddsDisplayConf) as any }
            if (properties.sku) { this.sku = []; properties.sku.forEach((value, index)=>{this.sku[index] = SKU.create(properties.sku[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizemall_v2_SPU", "optional")
    public spu?: SPU|null
    @protobuf.Field.d(2, "tss_hall_prizemall_v2_OddsDisplayConf", "optional")
    public oddsDisplayConf?: OddsDisplayConf|null
    @protobuf.Field.d(3, "tss_hall_prizemall_v2_SKU", "repeated")
    public sku?: SKU[] = []
}
export interface ICartItem {
    ID?: string|null
    UID?: number|null
    SKUID?: number|null
    amount?: number|null
    createAt?: number|null
    updateAt?: number|null
    pricePlanType?: PlanType|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_CartItem")
export class CartItem extends protobuf.Message<ICartItem> {
    constructor(properties: Properties<ICartItem>) {
        super(properties);
        if (properties) {
            if (properties.ID) { this.ID = properties.ID }
            if (properties.UID) { this.UID = properties.UID }
            if (properties.SKUID) { this.SKUID = properties.SKUID }
            if (properties.amount) { this.amount = properties.amount }
            if (properties.createAt) { this.createAt = properties.createAt }
            if (properties.updateAt) { this.updateAt = properties.updateAt }
            if (properties.pricePlanType) { this.pricePlanType = properties.pricePlanType }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public ID?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public UID?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public SKUID?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public amount?: number|null = 0
    @protobuf.Field.d(6, "int64", "optional", 0)
    public createAt?: number|null = 0
    @protobuf.Field.d(7, "int64", "optional", 0)
    public updateAt?: number|null = 0
    @protobuf.Field.d(8, PlanType, "optional", PlanType.PlanTypeUnknown)
    public pricePlanType?: PlanType|null = PlanType.PlanTypeUnknown
}
export interface IUserCartItem {
    cartItem?: ICartItem
    sku?: ISKU
}
@protobuf.Type.d("tss_hall_prizemall_v2_UserCartItem")
export class UserCartItem extends protobuf.Message<IUserCartItem> {
    constructor(properties: Properties<IUserCartItem>) {
        super(properties);
        if (properties) {
            if (properties.cartItem) { this.cartItem = CartItem.create(properties.cartItem) as any }
            if (properties.sku) { this.sku = SKU.create(properties.sku) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizemall_v2_CartItem", "optional")
    public cartItem?: CartItem|null
    @protobuf.Field.d(2, "tss_hall_prizemall_v2_SKU", "optional")
    public sku?: SKU|null
}
export interface IUserCartItemWithPrice {
    cartItem?: ICartItem
    sku?: ISKU
    actualUnitPrice?: tss_hall_common_IPrice
    actualPrice?: tss_hall_common_IPrice
}
@protobuf.Type.d("tss_hall_prizemall_v2_UserCartItemWithPrice")
export class UserCartItemWithPrice extends protobuf.Message<IUserCartItemWithPrice> {
    constructor(properties: Properties<IUserCartItemWithPrice>) {
        super(properties);
        if (properties) {
            if (properties.cartItem) { this.cartItem = CartItem.create(properties.cartItem) as any }
            if (properties.sku) { this.sku = SKU.create(properties.sku) as any }
            if (properties.actualUnitPrice) { this.actualUnitPrice = tss_hall_common_Price.create(properties.actualUnitPrice) as any }
            if (properties.actualPrice) { this.actualPrice = tss_hall_common_Price.create(properties.actualPrice) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizemall_v2_CartItem", "optional")
    public cartItem?: CartItem|null
    @protobuf.Field.d(2, "tss_hall_prizemall_v2_SKU", "optional")
    public sku?: SKU|null
    @protobuf.Field.d(3, "tss_hall_common_Price", "optional")
    public actualUnitPrice?: tss_hall_common_Price|null
    @protobuf.Field.d(4, "tss_hall_common_Price", "optional")
    public actualPrice?: tss_hall_common_Price|null
}
export interface IStatPersonal {
    UID?: number|null
    SKUCount?: number|null
    worthAmt?: number|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_StatPersonal")
export class StatPersonal extends protobuf.Message<IStatPersonal> {
    constructor(properties: Properties<IStatPersonal>) {
        super(properties);
        if (properties) {
            if (properties.UID) { this.UID = properties.UID }
            if (properties.SKUCount) { this.SKUCount = properties.SKUCount }
            if (properties.worthAmt) { this.worthAmt = properties.worthAmt }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public UID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public SKUCount?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public worthAmt?: number|null = 0
}
export interface IStatSKU {
    ID?: number|null
    salesAmt?: number|null
    createAt?: number|null
    updateAt?: number|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_StatSKU")
export class StatSKU extends protobuf.Message<IStatSKU> {
    constructor(properties: Properties<IStatSKU>) {
        super(properties);
        if (properties) {
            if (properties.ID) { this.ID = properties.ID }
            if (properties.salesAmt) { this.salesAmt = properties.salesAmt }
            if (properties.createAt) { this.createAt = properties.createAt }
            if (properties.updateAt) { this.updateAt = properties.updateAt }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public ID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public salesAmt?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public createAt?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public updateAt?: number|null = 0
}
export interface IStatSPU {
    ID?: number|null
    salesAmt?: number|null
    createAt?: number|null
    updateAt?: number|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_StatSPU")
export class StatSPU extends protobuf.Message<IStatSPU> {
    constructor(properties: Properties<IStatSPU>) {
        super(properties);
        if (properties) {
            if (properties.ID) { this.ID = properties.ID }
            if (properties.salesAmt) { this.salesAmt = properties.salesAmt }
            if (properties.createAt) { this.createAt = properties.createAt }
            if (properties.updateAt) { this.updateAt = properties.updateAt }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public ID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public salesAmt?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public createAt?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public updateAt?: number|null = 0
}
export interface ISaveBannerReq {
    banner?: IBanner
}
@protobuf.Type.d("tss_hall_prizemall_v2_SaveBannerReq")
export class SaveBannerReq extends protobuf.Message<ISaveBannerReq> {
    constructor(properties: Properties<ISaveBannerReq>) {
        super(properties);
        if (properties) {
            if (properties.banner) { this.banner = Banner.create(properties.banner) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizemall_v2_Banner", "optional")
    public banner?: Banner|null
}
export interface ISaveBannerResp {
    banner?: IBanner
}
@protobuf.Type.d("tss_hall_prizemall_v2_SaveBannerResp")
export class SaveBannerResp extends protobuf.Message<ISaveBannerResp> {
    constructor(properties: Properties<ISaveBannerResp>) {
        super(properties);
        if (properties) {
            if (properties.banner) { this.banner = Banner.create(properties.banner) as any }
        }
	}
    @protobuf.Field.d(2, "tss_hall_prizemall_v2_Banner", "optional")
    public banner?: Banner|null
}
export interface IListBannerReq {
    page?: number|null
    pageSize?: number|null
    appID?: string|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_ListBannerReq")
export class ListBannerReq extends protobuf.Message<IListBannerReq> {
    constructor(properties: Properties<IListBannerReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.appID) { this.appID = properties.appID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public appID?: string|null = ""
}
export interface IListBannerResp {
    banner?: IBanner[]
    total?: number|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_ListBannerResp")
export class ListBannerResp extends protobuf.Message<IListBannerResp> {
    constructor(properties: Properties<IListBannerResp>) {
        super(properties);
        if (properties) {
            if (properties.banner) { this.banner = []; properties.banner.forEach((value, index)=>{this.banner[index] = Banner.create(properties.banner[index]) as any})}
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizemall_v2_Banner", "repeated")
    public banner?: Banner[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public total?: number|null = 0
}
export interface IDeleteBannerReq {
    id?: string[]
}
@protobuf.Type.d("tss_hall_prizemall_v2_DeleteBannerReq")
export class DeleteBannerReq extends protobuf.Message<IDeleteBannerReq> {
    constructor(properties: Properties<IDeleteBannerReq>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = []; properties.id.forEach((value, index)=>{this.id[index] = properties.id[index]})}
        }
	}
    @protobuf.Field.d(1, "string", "repeated", [])
    public id?: string[] = []
}
export interface ISaveProductVariantReq {
    variant?: IProductVariant
}
@protobuf.Type.d("tss_hall_prizemall_v2_SaveProductVariantReq")
export class SaveProductVariantReq extends protobuf.Message<ISaveProductVariantReq> {
    constructor(properties: Properties<ISaveProductVariantReq>) {
        super(properties);
        if (properties) {
            if (properties.variant) { this.variant = ProductVariant.create(properties.variant) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizemall_v2_ProductVariant", "optional")
    public variant?: ProductVariant|null
}
export interface ISaveProductVariantResp {
    variant?: IProductVariant
}
@protobuf.Type.d("tss_hall_prizemall_v2_SaveProductVariantResp")
export class SaveProductVariantResp extends protobuf.Message<ISaveProductVariantResp> {
    constructor(properties: Properties<ISaveProductVariantResp>) {
        super(properties);
        if (properties) {
            if (properties.variant) { this.variant = ProductVariant.create(properties.variant) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizemall_v2_ProductVariant", "optional")
    public variant?: ProductVariant|null
}
export interface IListProductVariantReq {
    name?: string|null
    desc?: string|null
    page?: number|null
    pageSize?: number|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_ListProductVariantReq")
export class ListProductVariantReq extends protobuf.Message<IListProductVariantReq> {
    constructor(properties: Properties<IListProductVariantReq>) {
        super(properties);
        if (properties) {
            if (properties.name) { this.name = properties.name }
            if (properties.desc) { this.desc = properties.desc }
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
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
}
export interface IListProductVariantResp {
    variants?: IProductVariant[]
    total?: number|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_ListProductVariantResp")
export class ListProductVariantResp extends protobuf.Message<IListProductVariantResp> {
    constructor(properties: Properties<IListProductVariantResp>) {
        super(properties);
        if (properties) {
            if (properties.variants) { this.variants = []; properties.variants.forEach((value, index)=>{this.variants[index] = ProductVariant.create(properties.variants[index]) as any})}
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizemall_v2_ProductVariant", "repeated")
    public variants?: ProductVariant[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public total?: number|null = 0
}
export interface ISaveTabReq {
    tab?: ITab
}
@protobuf.Type.d("tss_hall_prizemall_v2_SaveTabReq")
export class SaveTabReq extends protobuf.Message<ISaveTabReq> {
    constructor(properties: Properties<ISaveTabReq>) {
        super(properties);
        if (properties) {
            if (properties.tab) { this.tab = Tab.create(properties.tab) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizemall_v2_Tab", "optional")
    public tab?: Tab|null
}
export interface ISaveTabResp {
    tab?: ITab
}
@protobuf.Type.d("tss_hall_prizemall_v2_SaveTabResp")
export class SaveTabResp extends protobuf.Message<ISaveTabResp> {
    constructor(properties: Properties<ISaveTabResp>) {
        super(properties);
        if (properties) {
            if (properties.tab) { this.tab = Tab.create(properties.tab) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizemall_v2_Tab", "optional")
    public tab?: Tab|null
}
export interface IListTabReq {
    page?: number|null
    pageSize?: number|null
    appID?: string|null
    name?: string|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_ListTabReq")
export class ListTabReq extends protobuf.Message<IListTabReq> {
    constructor(properties: Properties<IListTabReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.appID) { this.appID = properties.appID }
            if (properties.name) { this.name = properties.name }
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
}
export interface IListTabResp {
    tab?: ITab[]
    total?: number|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_ListTabResp")
export class ListTabResp extends protobuf.Message<IListTabResp> {
    constructor(properties: Properties<IListTabResp>) {
        super(properties);
        if (properties) {
            if (properties.tab) { this.tab = []; properties.tab.forEach((value, index)=>{this.tab[index] = Tab.create(properties.tab[index]) as any})}
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizemall_v2_Tab", "repeated")
    public tab?: Tab[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public total?: number|null = 0
}
export interface ISaveMerchandiseCategoryReq {
    category?: IMerchandiseCategory
}
@protobuf.Type.d("tss_hall_prizemall_v2_SaveMerchandiseCategoryReq")
export class SaveMerchandiseCategoryReq extends protobuf.Message<ISaveMerchandiseCategoryReq> {
    constructor(properties: Properties<ISaveMerchandiseCategoryReq>) {
        super(properties);
        if (properties) {
            if (properties.category) { this.category = MerchandiseCategory.create(properties.category) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizemall_v2_MerchandiseCategory", "optional")
    public category?: MerchandiseCategory|null
}
export interface ISaveMerchandiseCategoryResp {
    category?: IMerchandiseCategory
}
@protobuf.Type.d("tss_hall_prizemall_v2_SaveMerchandiseCategoryResp")
export class SaveMerchandiseCategoryResp extends protobuf.Message<ISaveMerchandiseCategoryResp> {
    constructor(properties: Properties<ISaveMerchandiseCategoryResp>) {
        super(properties);
        if (properties) {
            if (properties.category) { this.category = MerchandiseCategory.create(properties.category) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizemall_v2_MerchandiseCategory", "optional")
    public category?: MerchandiseCategory|null
}
export interface IDeleteMerchandiseCategoryReq {
    ID?: number|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_DeleteMerchandiseCategoryReq")
export class DeleteMerchandiseCategoryReq extends protobuf.Message<IDeleteMerchandiseCategoryReq> {
    constructor(properties: Properties<IDeleteMerchandiseCategoryReq>) {
        super(properties);
        if (properties) {
            if (properties.ID) { this.ID = properties.ID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public ID?: number|null = 0
}
export interface IListMerchandiseCategoryReq {
    page?: number|null
    pageSize?: number|null
    name?: string|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_ListMerchandiseCategoryReq")
export class ListMerchandiseCategoryReq extends protobuf.Message<IListMerchandiseCategoryReq> {
    constructor(properties: Properties<IListMerchandiseCategoryReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.name) { this.name = properties.name }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public name?: string|null = ""
}
export interface IListMerchandiseCategoryResp {
    category?: IMerchandiseCategory[]
    total?: number|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_ListMerchandiseCategoryResp")
export class ListMerchandiseCategoryResp extends protobuf.Message<IListMerchandiseCategoryResp> {
    constructor(properties: Properties<IListMerchandiseCategoryResp>) {
        super(properties);
        if (properties) {
            if (properties.category) { this.category = []; properties.category.forEach((value, index)=>{this.category[index] = MerchandiseCategory.create(properties.category[index]) as any})}
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizemall_v2_MerchandiseCategory", "repeated")
    public category?: MerchandiseCategory[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public total?: number|null = 0
}
export interface ISaveSPUReq {
    spu?: ISPU
}
@protobuf.Type.d("tss_hall_prizemall_v2_SaveSPUReq")
export class SaveSPUReq extends protobuf.Message<ISaveSPUReq> {
    constructor(properties: Properties<ISaveSPUReq>) {
        super(properties);
        if (properties) {
            if (properties.spu) { this.spu = SPU.create(properties.spu) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizemall_v2_SPU", "optional")
    public spu?: SPU|null
}
export interface ISaveSPUResp {
    spu?: ISPU
}
@protobuf.Type.d("tss_hall_prizemall_v2_SaveSPUResp")
export class SaveSPUResp extends protobuf.Message<ISaveSPUResp> {
    constructor(properties: Properties<ISaveSPUResp>) {
        super(properties);
        if (properties) {
            if (properties.spu) { this.spu = SPU.create(properties.spu) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizemall_v2_SPU", "optional")
    public spu?: SPU|null
}
export interface IListSPUReq {
    name?: string|null
    desc?: string|null
    page?: number|null
    pageSize?: number|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_ListSPUReq")
export class ListSPUReq extends protobuf.Message<IListSPUReq> {
    constructor(properties: Properties<IListSPUReq>) {
        super(properties);
        if (properties) {
            if (properties.name) { this.name = properties.name }
            if (properties.desc) { this.desc = properties.desc }
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
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
}
export interface IListSPUResp {
    spu?: ISPU[]
    total?: number|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_ListSPUResp")
export class ListSPUResp extends protobuf.Message<IListSPUResp> {
    constructor(properties: Properties<IListSPUResp>) {
        super(properties);
        if (properties) {
            if (properties.spu) { this.spu = []; properties.spu.forEach((value, index)=>{this.spu[index] = SPU.create(properties.spu[index]) as any})}
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizemall_v2_SPU", "repeated")
    public spu?: SPU[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public total?: number|null = 0
}
export interface ISaveMerchandiseReq {
    merchandise?: IMerchandiseForConf
}
@protobuf.Type.d("tss_hall_prizemall_v2_SaveMerchandiseReq")
export class SaveMerchandiseReq extends protobuf.Message<ISaveMerchandiseReq> {
    constructor(properties: Properties<ISaveMerchandiseReq>) {
        super(properties);
        if (properties) {
            if (properties.merchandise) { this.merchandise = MerchandiseForConf.create(properties.merchandise) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizemall_v2_MerchandiseForConf", "optional")
    public merchandise?: MerchandiseForConf|null
}
export interface ISaveMerchandiseResp {
    merchandise?: IMerchandiseForConf
}
@protobuf.Type.d("tss_hall_prizemall_v2_SaveMerchandiseResp")
export class SaveMerchandiseResp extends protobuf.Message<ISaveMerchandiseResp> {
    constructor(properties: Properties<ISaveMerchandiseResp>) {
        super(properties);
        if (properties) {
            if (properties.merchandise) { this.merchandise = MerchandiseForConf.create(properties.merchandise) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizemall_v2_MerchandiseForConf", "optional")
    public merchandise?: MerchandiseForConf|null
}
export interface IGetMerchandiseReq {
    ID?: number|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_GetMerchandiseReq")
export class GetMerchandiseReq extends protobuf.Message<IGetMerchandiseReq> {
    constructor(properties: Properties<IGetMerchandiseReq>) {
        super(properties);
        if (properties) {
            if (properties.ID) { this.ID = properties.ID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public ID?: number|null = 0
}
export interface IGetMerchandiseResp {
    merchandise?: IMerchandiseForConf
}
@protobuf.Type.d("tss_hall_prizemall_v2_GetMerchandiseResp")
export class GetMerchandiseResp extends protobuf.Message<IGetMerchandiseResp> {
    constructor(properties: Properties<IGetMerchandiseResp>) {
        super(properties);
        if (properties) {
            if (properties.merchandise) { this.merchandise = MerchandiseForConf.create(properties.merchandise) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizemall_v2_MerchandiseForConf", "optional")
    public merchandise?: MerchandiseForConf|null
}
export interface IListMerchandiseReq {
    page?: number|null
    pageSize?: number|null
    name?: string|null
    categoryID?: number|null
    appID?: string|null
    SpuId?: number|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_ListMerchandiseReq")
export class ListMerchandiseReq extends protobuf.Message<IListMerchandiseReq> {
    constructor(properties: Properties<IListMerchandiseReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.name) { this.name = properties.name }
            if (properties.categoryID) { this.categoryID = properties.categoryID }
            if (properties.appID) { this.appID = properties.appID }
            if (properties.SpuId) { this.SpuId = properties.SpuId }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(4, "int64", "optional", 0)
    public categoryID?: number|null = 0
    @protobuf.Field.d(5, "string", "optional", )
    public appID?: string|null = ""
    @protobuf.Field.d(6, "int64", "optional", 0)
    public SpuId?: number|null = 0
}
export interface IListMerchandiseResp {
    merchandise?: IMerchandiseForConf[]
    total?: number|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_ListMerchandiseResp")
export class ListMerchandiseResp extends protobuf.Message<IListMerchandiseResp> {
    constructor(properties: Properties<IListMerchandiseResp>) {
        super(properties);
        if (properties) {
            if (properties.merchandise) { this.merchandise = []; properties.merchandise.forEach((value, index)=>{this.merchandise[index] = MerchandiseForConf.create(properties.merchandise[index]) as any})}
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizemall_v2_MerchandiseForConf", "repeated")
    public merchandise?: MerchandiseForConf[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public total?: number|null = 0
}
export interface ISaveSKUReq {
    sku?: ISKU
}
@protobuf.Type.d("tss_hall_prizemall_v2_SaveSKUReq")
export class SaveSKUReq extends protobuf.Message<ISaveSKUReq> {
    constructor(properties: Properties<ISaveSKUReq>) {
        super(properties);
        if (properties) {
            if (properties.sku) { this.sku = SKU.create(properties.sku) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizemall_v2_SKU", "optional")
    public sku?: SKU|null
}
export interface ISaveSKUResp {
    sku?: ISKU
}
@protobuf.Type.d("tss_hall_prizemall_v2_SaveSKUResp")
export class SaveSKUResp extends protobuf.Message<ISaveSKUResp> {
    constructor(properties: Properties<ISaveSKUResp>) {
        super(properties);
        if (properties) {
            if (properties.sku) { this.sku = SKU.create(properties.sku) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizemall_v2_SKU", "optional")
    public sku?: SKU|null
}
export interface IGetSKUReq {
    ID?: number|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_GetSKUReq")
export class GetSKUReq extends protobuf.Message<IGetSKUReq> {
    constructor(properties: Properties<IGetSKUReq>) {
        super(properties);
        if (properties) {
            if (properties.ID) { this.ID = properties.ID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public ID?: number|null = 0
}
export interface IGetSKUResp {
    sku?: ISKU
}
@protobuf.Type.d("tss_hall_prizemall_v2_GetSKUResp")
export class GetSKUResp extends protobuf.Message<IGetSKUResp> {
    constructor(properties: Properties<IGetSKUResp>) {
        super(properties);
        if (properties) {
            if (properties.sku) { this.sku = SKU.create(properties.sku) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizemall_v2_SKU", "optional")
    public sku?: SKU|null
}
export interface IListSKUReq {
    page?: number|null
    pageSize?: number|null
    name?: string|null
    categoryID?: number|null
    appID?: string|null
    skuId?: number|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_ListSKUReq")
export class ListSKUReq extends protobuf.Message<IListSKUReq> {
    constructor(properties: Properties<IListSKUReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.name) { this.name = properties.name }
            if (properties.categoryID) { this.categoryID = properties.categoryID }
            if (properties.appID) { this.appID = properties.appID }
            if (properties.skuId) { this.skuId = properties.skuId }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(4, "int64", "optional", 0)
    public categoryID?: number|null = 0
    @protobuf.Field.d(5, "string", "optional", )
    public appID?: string|null = ""
    @protobuf.Field.d(6, "int64", "optional", 0)
    public skuId?: number|null = 0
}
export interface IListSKUResp {
    sku?: ISKU[]
    total?: number|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_ListSKUResp")
export class ListSKUResp extends protobuf.Message<IListSKUResp> {
    constructor(properties: Properties<IListSKUResp>) {
        super(properties);
        if (properties) {
            if (properties.sku) { this.sku = []; properties.sku.forEach((value, index)=>{this.sku[index] = SKU.create(properties.sku[index]) as any})}
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizemall_v2_SKU", "repeated")
    public sku?: SKU[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public total?: number|null = 0
}
export interface IListSKUByUserReq {
    tabID?: string|null
    page?: number|null
    pageSize?: number|null
    sort?: string|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_ListSKUByUserReq")
export class ListSKUByUserReq extends protobuf.Message<IListSKUByUserReq> {
    constructor(properties: Properties<IListSKUByUserReq>) {
        super(properties);
        if (properties) {
            if (properties.tabID) { this.tabID = properties.tabID }
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.sort) { this.sort = properties.sort }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public tabID?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(4, "string", "optional", )
    public sort?: string|null = ""
}
export interface IListSKUByUserResp {
    sku?: ISKU[]
    total?: number|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_ListSKUByUserResp")
export class ListSKUByUserResp extends protobuf.Message<IListSKUByUserResp> {
    constructor(properties: Properties<IListSKUByUserResp>) {
        super(properties);
        if (properties) {
            if (properties.sku) { this.sku = []; properties.sku.forEach((value, index)=>{this.sku[index] = SKU.create(properties.sku[index]) as any})}
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizemall_v2_SKU", "repeated")
    public sku?: SKU[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public total?: number|null = 0
}
export interface IGetSPUByUserReq {
    ID?: number|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_GetSPUByUserReq")
export class GetSPUByUserReq extends protobuf.Message<IGetSPUByUserReq> {
    constructor(properties: Properties<IGetSPUByUserReq>) {
        super(properties);
        if (properties) {
            if (properties.ID) { this.ID = properties.ID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public ID?: number|null = 0
}
export interface IGetSPUByUserResp {
    info?: IMerchandise
}
@protobuf.Type.d("tss_hall_prizemall_v2_GetSPUByUserResp")
export class GetSPUByUserResp extends protobuf.Message<IGetSPUByUserResp> {
    constructor(properties: Properties<IGetSPUByUserResp>) {
        super(properties);
        if (properties) {
            if (properties.info) { this.info = Merchandise.create(properties.info) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizemall_v2_Merchandise", "optional")
    public info?: Merchandise|null
}
export interface IGetSKUByUserReq {
    ID?: number|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_GetSKUByUserReq")
export class GetSKUByUserReq extends protobuf.Message<IGetSKUByUserReq> {
    constructor(properties: Properties<IGetSKUByUserReq>) {
        super(properties);
        if (properties) {
            if (properties.ID) { this.ID = properties.ID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public ID?: number|null = 0
}
export interface IGetSKUByUserResp {
    sku?: ISKU
}
@protobuf.Type.d("tss_hall_prizemall_v2_GetSKUByUserResp")
export class GetSKUByUserResp extends protobuf.Message<IGetSKUByUserResp> {
    constructor(properties: Properties<IGetSKUByUserResp>) {
        super(properties);
        if (properties) {
            if (properties.sku) { this.sku = SKU.create(properties.sku) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizemall_v2_SKU", "optional")
    public sku?: SKU|null
}
export interface ISearchSKUByUserReq {
    page?: number|null
    pageSize?: number|null
    name?: string|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_SearchSKUByUserReq")
export class SearchSKUByUserReq extends protobuf.Message<ISearchSKUByUserReq> {
    constructor(properties: Properties<ISearchSKUByUserReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.name) { this.name = properties.name }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public name?: string|null = ""
}
export interface ISearchSKUByUserResp {
    sku?: ISKU[]
    total?: number|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_SearchSKUByUserResp")
export class SearchSKUByUserResp extends protobuf.Message<ISearchSKUByUserResp> {
    constructor(properties: Properties<ISearchSKUByUserResp>) {
        super(properties);
        if (properties) {
            if (properties.sku) { this.sku = []; properties.sku.forEach((value, index)=>{this.sku[index] = SKU.create(properties.sku[index]) as any})}
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizemall_v2_SKU", "repeated")
    public sku?: SKU[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public total?: number|null = 0
}
export interface ISaveShoppingCartItemReq {
    SKUID?: number|null
    amount?: number|null
    pricePlanType?: PlanType|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_SaveShoppingCartItemReq")
export class SaveShoppingCartItemReq extends protobuf.Message<ISaveShoppingCartItemReq> {
    constructor(properties: Properties<ISaveShoppingCartItemReq>) {
        super(properties);
        if (properties) {
            if (properties.SKUID) { this.SKUID = properties.SKUID }
            if (properties.amount) { this.amount = properties.amount }
            if (properties.pricePlanType) { this.pricePlanType = properties.pricePlanType }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public SKUID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public amount?: number|null = 0
    @protobuf.Field.d(3, PlanType, "optional", PlanType.PlanTypeUnknown)
    public pricePlanType?: PlanType|null = PlanType.PlanTypeUnknown
}
export interface IAddShoppingCartItemReq {
    SKUID?: number|null
    amount?: number|null
    pricePlanType?: PlanType|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_AddShoppingCartItemReq")
export class AddShoppingCartItemReq extends protobuf.Message<IAddShoppingCartItemReq> {
    constructor(properties: Properties<IAddShoppingCartItemReq>) {
        super(properties);
        if (properties) {
            if (properties.SKUID) { this.SKUID = properties.SKUID }
            if (properties.amount) { this.amount = properties.amount }
            if (properties.pricePlanType) { this.pricePlanType = properties.pricePlanType }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public SKUID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public amount?: number|null = 0
    @protobuf.Field.d(3, PlanType, "optional", PlanType.PlanTypeUnknown)
    public pricePlanType?: PlanType|null = PlanType.PlanTypeUnknown
}
export interface IListUserShoppingCartItemReq {
    page?: number|null
    pageSize?: number|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_ListUserShoppingCartItemReq")
export class ListUserShoppingCartItemReq extends protobuf.Message<IListUserShoppingCartItemReq> {
    constructor(properties: Properties<IListUserShoppingCartItemReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public pageSize?: number|null = 0
}
export interface IListUserShoppingCartItemResp {
    items?: IUserCartItem[]
    total?: number|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_ListUserShoppingCartItemResp")
export class ListUserShoppingCartItemResp extends protobuf.Message<IListUserShoppingCartItemResp> {
    constructor(properties: Properties<IListUserShoppingCartItemResp>) {
        super(properties);
        if (properties) {
            if (properties.items) { this.items = []; properties.items.forEach((value, index)=>{this.items[index] = UserCartItem.create(properties.items[index]) as any})}
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizemall_v2_UserCartItem", "repeated")
    public items?: UserCartItem[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public total?: number|null = 0
}
export interface IListUserShoppingCartItemWithPriceReq {
    page?: number|null
    pageSize?: number|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_ListUserShoppingCartItemWithPriceReq")
export class ListUserShoppingCartItemWithPriceReq extends protobuf.Message<IListUserShoppingCartItemWithPriceReq> {
    constructor(properties: Properties<IListUserShoppingCartItemWithPriceReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public pageSize?: number|null = 0
}
export interface IListUserShoppingCartItemWithPriceResp {
    items?: IUserCartItemWithPrice[]
    total?: number|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_ListUserShoppingCartItemWithPriceResp")
export class ListUserShoppingCartItemWithPriceResp extends protobuf.Message<IListUserShoppingCartItemWithPriceResp> {
    constructor(properties: Properties<IListUserShoppingCartItemWithPriceResp>) {
        super(properties);
        if (properties) {
            if (properties.items) { this.items = []; properties.items.forEach((value, index)=>{this.items[index] = UserCartItemWithPrice.create(properties.items[index]) as any})}
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizemall_v2_UserCartItemWithPrice", "repeated")
    public items?: UserCartItemWithPrice[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public total?: number|null = 0
}
export interface IOrderItem {
    SKUID?: number|null
    amount?: number|null
    planType?: PlanType|null
    originPrice?: tss_hall_common_IPrice
    actualPrice?: tss_hall_common_IPrice
    SPUID?: number|null
    DCType?: tss_hall_common_DeliveryChannelType|null
    supplierID?: string|null
    supplierAddr?: tss_hall_common_IAddress
    originUnitPrice?: tss_hall_common_IPrice
    actualUnitPrice?: tss_hall_common_IPrice
    userCouponPropId?: string|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_OrderItem")
export class OrderItem extends protobuf.Message<IOrderItem> {
    constructor(properties: Properties<IOrderItem>) {
        super(properties);
        if (properties) {
            if (properties.SKUID) { this.SKUID = properties.SKUID }
            if (properties.amount) { this.amount = properties.amount }
            if (properties.planType) { this.planType = properties.planType }
            if (properties.originPrice) { this.originPrice = tss_hall_common_Price.create(properties.originPrice) as any }
            if (properties.actualPrice) { this.actualPrice = tss_hall_common_Price.create(properties.actualPrice) as any }
            if (properties.SPUID) { this.SPUID = properties.SPUID }
            if (properties.DCType) { this.DCType = properties.DCType }
            if (properties.supplierID) { this.supplierID = properties.supplierID }
            if (properties.supplierAddr) { this.supplierAddr = tss_hall_common_Address.create(properties.supplierAddr) as any }
            if (properties.originUnitPrice) { this.originUnitPrice = tss_hall_common_Price.create(properties.originUnitPrice) as any }
            if (properties.actualUnitPrice) { this.actualUnitPrice = tss_hall_common_Price.create(properties.actualUnitPrice) as any }
            if (properties.userCouponPropId) { this.userCouponPropId = properties.userCouponPropId }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public SKUID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public amount?: number|null = 0
    @protobuf.Field.d(3, PlanType, "optional", PlanType.PlanTypeUnknown)
    public planType?: PlanType|null = PlanType.PlanTypeUnknown
    @protobuf.Field.d(4, "tss_hall_common_Price", "optional")
    public originPrice?: tss_hall_common_Price|null
    @protobuf.Field.d(5, "tss_hall_common_Price", "optional")
    public actualPrice?: tss_hall_common_Price|null
    @protobuf.Field.d(6, "int64", "optional", 0)
    public SPUID?: number|null = 0
    @protobuf.Field.d(7, tss_hall_common_DeliveryChannelType, "optional", tss_hall_common_DeliveryChannelType.DeliveryChannelTypeUnknown)
    public DCType?: tss_hall_common_DeliveryChannelType|null = tss_hall_common_DeliveryChannelType.DeliveryChannelTypeUnknown
    @protobuf.Field.d(8, "string", "optional", )
    public supplierID?: string|null = ""
    @protobuf.Field.d(9, "tss_hall_common_Address", "optional")
    public supplierAddr?: tss_hall_common_Address|null
    @protobuf.Field.d(10, "tss_hall_common_Price", "optional")
    public originUnitPrice?: tss_hall_common_Price|null
    @protobuf.Field.d(11, "tss_hall_common_Price", "optional")
    public actualUnitPrice?: tss_hall_common_Price|null
    @protobuf.Field.d(12, "string", "optional", )
    public userCouponPropId?: string|null = ""
}
export interface ICalcOrderReq {
    uid?: number|null
    items?: IOrderItem[]
}
@protobuf.Type.d("tss_hall_prizemall_v2_CalcOrderReq")
export class CalcOrderReq extends protobuf.Message<ICalcOrderReq> {
    constructor(properties: Properties<ICalcOrderReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.items) { this.items = []; properties.items.forEach((value, index)=>{this.items[index] = OrderItem.create(properties.items[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "tss_hall_prizemall_v2_OrderItem", "repeated")
    public items?: OrderItem[] = []
}
export interface ICalcOrderResp {
    items?: IOrderItem[]
    totalRMB?: number|null
    totalAsset?: tss_common_IAssetItem[]
    postRMB?: number|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_CalcOrderResp")
export class CalcOrderResp extends protobuf.Message<ICalcOrderResp> {
    constructor(properties: Properties<ICalcOrderResp>) {
        super(properties);
        if (properties) {
            if (properties.items) { this.items = []; properties.items.forEach((value, index)=>{this.items[index] = OrderItem.create(properties.items[index]) as any})}
            if (properties.totalRMB) { this.totalRMB = properties.totalRMB }
            if (properties.totalAsset) { this.totalAsset = []; properties.totalAsset.forEach((value, index)=>{this.totalAsset[index] = tss_common_AssetItem.create(properties.totalAsset[index]) as any})}
            if (properties.postRMB) { this.postRMB = properties.postRMB }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizemall_v2_OrderItem", "repeated")
    public items?: OrderItem[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public totalRMB?: number|null = 0
    @protobuf.Field.d(3, "tss_common_AssetItem", "repeated")
    public totalAsset?: tss_common_AssetItem[] = []
    @protobuf.Field.d(4, "int64", "optional", 0)
    public postRMB?: number|null = 0
}
export interface ICreateOrderReq {
    uid?: number|null
    from?: OrderFromType|null
    items?: IOrderItem[]
    addr?: tss_hall_common_IAddress
}
@protobuf.Type.d("tss_hall_prizemall_v2_CreateOrderReq")
export class CreateOrderReq extends protobuf.Message<ICreateOrderReq> {
    constructor(properties: Properties<ICreateOrderReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.from) { this.from = properties.from }
            if (properties.items) { this.items = []; properties.items.forEach((value, index)=>{this.items[index] = OrderItem.create(properties.items[index]) as any})}
            if (properties.addr) { this.addr = tss_hall_common_Address.create(properties.addr) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, OrderFromType, "optional", OrderFromType.OrderFromTypeUnknown)
    public from?: OrderFromType|null = OrderFromType.OrderFromTypeUnknown
    @protobuf.Field.d(3, "tss_hall_prizemall_v2_OrderItem", "repeated")
    public items?: OrderItem[] = []
    @protobuf.Field.d(4, "tss_hall_common_Address", "optional")
    public addr?: tss_hall_common_Address|null
}
export interface ICreateOrderResp {
    batchID?: string|null
    orders?: tss_hall_exchangeorder_v7_IOrder[]
    rmbAmt?: number|null
    orderIDs?: string[]
}
@protobuf.Type.d("tss_hall_prizemall_v2_CreateOrderResp")
export class CreateOrderResp extends protobuf.Message<ICreateOrderResp> {
    constructor(properties: Properties<ICreateOrderResp>) {
        super(properties);
        if (properties) {
            if (properties.batchID) { this.batchID = properties.batchID }
            if (properties.orders) { this.orders = []; properties.orders.forEach((value, index)=>{this.orders[index] = tss_hall_exchangeorder_v7_Order.create(properties.orders[index]) as any})}
            if (properties.rmbAmt) { this.rmbAmt = properties.rmbAmt }
            if (properties.orderIDs) { this.orderIDs = []; properties.orderIDs.forEach((value, index)=>{this.orderIDs[index] = properties.orderIDs[index]})}
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public batchID?: string|null = ""
    @protobuf.Field.d(2, "tss_hall_exchangeorder_v7_Order", "repeated")
    public orders?: tss_hall_exchangeorder_v7_Order[] = []
    @protobuf.Field.d(12, "int64", "optional", 0)
    public rmbAmt?: number|null = 0
    @protobuf.Field.d(13, "string", "repeated", [])
    public orderIDs?: string[] = []
}
export interface IDeleteUserShoppingCartItemReq {
    ids?: string[]
}
@protobuf.Type.d("tss_hall_prizemall_v2_DeleteUserShoppingCartItemReq")
export class DeleteUserShoppingCartItemReq extends protobuf.Message<IDeleteUserShoppingCartItemReq> {
    constructor(properties: Properties<IDeleteUserShoppingCartItemReq>) {
        super(properties);
        if (properties) {
            if (properties.ids) { this.ids = []; properties.ids.forEach((value, index)=>{this.ids[index] = properties.ids[index]})}
        }
	}
    @protobuf.Field.d(1, "string", "repeated", [])
    public ids?: string[] = []
}
export interface IGetProductVariantReq {
    ID?: string|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_GetProductVariantReq")
export class GetProductVariantReq extends protobuf.Message<IGetProductVariantReq> {
    constructor(properties: Properties<IGetProductVariantReq>) {
        super(properties);
        if (properties) {
            if (properties.ID) { this.ID = properties.ID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public ID?: string|null = ""
}
export interface IGetProductVariantResp {
    variant?: IProductVariant
}
@protobuf.Type.d("tss_hall_prizemall_v2_GetProductVariantResp")
export class GetProductVariantResp extends protobuf.Message<IGetProductVariantResp> {
    constructor(properties: Properties<IGetProductVariantResp>) {
        super(properties);
        if (properties) {
            if (properties.variant) { this.variant = ProductVariant.create(properties.variant) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizemall_v2_ProductVariant", "optional")
    public variant?: ProductVariant|null
}
export interface IGetUserStatReq {
    uid?: number|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_GetUserStatReq")
export class GetUserStatReq extends protobuf.Message<IGetUserStatReq> {
    constructor(properties: Properties<IGetUserStatReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface ITabPriority {
    tabId?: string|null
    priority?: number|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_TabPriority")
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
@protobuf.Type.d("tss_hall_prizemall_v2_BatchUpdateTabPriorityReq")
export class BatchUpdateTabPriorityReq extends protobuf.Message<IBatchUpdateTabPriorityReq> {
    constructor(properties: Properties<IBatchUpdateTabPriorityReq>) {
        super(properties);
        if (properties) {
            if (properties.tabPriority) { this.tabPriority = []; properties.tabPriority.forEach((value, index)=>{this.tabPriority[index] = TabPriority.create(properties.tabPriority[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizemall_v2_TabPriority", "repeated")
    public tabPriority?: TabPriority[] = []
}
export interface IGetUserStatResp {
    stat?: IStatPersonal
}
@protobuf.Type.d("tss_hall_prizemall_v2_GetUserStatResp")
export class GetUserStatResp extends protobuf.Message<IGetUserStatResp> {
    constructor(properties: Properties<IGetUserStatResp>) {
        super(properties);
        if (properties) {
            if (properties.stat) { this.stat = StatPersonal.create(properties.stat) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizemall_v2_StatPersonal", "optional")
    public stat?: StatPersonal|null
}
export interface IGetUserCouponPropListReq {
    uid?: number|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_GetUserCouponPropListReq")
export class GetUserCouponPropListReq extends protobuf.Message<IGetUserCouponPropListReq> {
    constructor(properties: Properties<IGetUserCouponPropListReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IGetUserCouponPropListResp {
    userCouponProps?: IUserCouponProp[]
}
@protobuf.Type.d("tss_hall_prizemall_v2_GetUserCouponPropListResp")
export class GetUserCouponPropListResp extends protobuf.Message<IGetUserCouponPropListResp> {
    constructor(properties: Properties<IGetUserCouponPropListResp>) {
        super(properties);
        if (properties) {
            if (properties.userCouponProps) { this.userCouponProps = []; properties.userCouponProps.forEach((value, index)=>{this.userCouponProps[index] = UserCouponProp.create(properties.userCouponProps[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizemall_v2_UserCouponProp", "repeated")
    public userCouponProps?: UserCouponProp[] = []
}
export interface IAddUserCouponPropReq {
    uid?: number|null
    propId?: number|null
    expireAt?: number|null
    discount?: number|null
    num?: number|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_AddUserCouponPropReq")
export class AddUserCouponPropReq extends protobuf.Message<IAddUserCouponPropReq> {
    constructor(properties: Properties<IAddUserCouponPropReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.propId) { this.propId = properties.propId }
            if (properties.expireAt) { this.expireAt = properties.expireAt }
            if (properties.discount) { this.discount = properties.discount }
            if (properties.num) { this.num = properties.num }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public propId?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public expireAt?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public discount?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public num?: number|null = 0
}
export interface IDelUserCouponPropReq {
    uid?: number|null
    propId?: number|null
    expireAt?: number|null
    num?: number|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_DelUserCouponPropReq")
export class DelUserCouponPropReq extends protobuf.Message<IDelUserCouponPropReq> {
    constructor(properties: Properties<IDelUserCouponPropReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.propId) { this.propId = properties.propId }
            if (properties.expireAt) { this.expireAt = properties.expireAt }
            if (properties.num) { this.num = properties.num }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public propId?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public expireAt?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public num?: number|null = 0
}
export interface IRelateSkuUserCouponPropReq {
    userCouponPropId?: string|null
    skuId?: number|null
}
@protobuf.Type.d("tss_hall_prizemall_v2_RelateSkuUserCouponPropReq")
export class RelateSkuUserCouponPropReq extends protobuf.Message<IRelateSkuUserCouponPropReq> {
    constructor(properties: Properties<IRelateSkuUserCouponPropReq>) {
        super(properties);
        if (properties) {
            if (properties.userCouponPropId) { this.userCouponPropId = properties.userCouponPropId }
            if (properties.skuId) { this.skuId = properties.skuId }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public userCouponPropId?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public skuId?: number|null = 0
}
class $PrizeMall extends RpcService {
    async SaveBanner(req: ISaveBannerReq, params?: RpcParams) : Promise<{err:number, resp:ISaveBannerResp}> {
        let data = SaveBannerReq.create(req)
        this.onBeforeReq("SaveBanner", data, params)
        const buffer = SaveBannerReq.encode(data).finish()
        let [err, pack] = await this.call("SaveBanner", buffer, params)
        if (err) {
            this.onBeforeResp("SaveBanner", err)
            return {err: err, resp: null}
        } else {
            let resp = SaveBannerResp.decode(pack) as any
            this.onBeforeResp("SaveBanner", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListBannerByUser(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:IListBannerResp}> {
        let data = base_Void.create(req)
        this.onBeforeReq("ListBannerByUser", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("ListBannerByUser", buffer, params)
        if (err) {
            this.onBeforeResp("ListBannerByUser", err)
            return {err: err, resp: null}
        } else {
            let resp = ListBannerResp.decode(pack) as any
            this.onBeforeResp("ListBannerByUser", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListBanner(req: IListBannerReq, params?: RpcParams) : Promise<{err:number, resp:IListBannerResp}> {
        let data = ListBannerReq.create(req)
        this.onBeforeReq("ListBanner", data, params)
        const buffer = ListBannerReq.encode(data).finish()
        let [err, pack] = await this.call("ListBanner", buffer, params)
        if (err) {
            this.onBeforeResp("ListBanner", err)
            return {err: err, resp: null}
        } else {
            let resp = ListBannerResp.decode(pack) as any
            this.onBeforeResp("ListBanner", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DeleteBanner(req: IDeleteBannerReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = DeleteBannerReq.create(req)
        this.onBeforeReq("DeleteBanner", data, params)
        const buffer = DeleteBannerReq.encode(data).finish()
        let [err, pack] = await this.call("DeleteBanner", buffer, params)
        if (err) {
            this.onBeforeResp("DeleteBanner", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("DeleteBanner", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetBannerForSync(req: base_IBatchGetResourceReq, params?: RpcParams) : Promise<{err:number, resp:base_IBatchGetResourceResp}> {
        let data = base_BatchGetResourceReq.create(req)
        this.onBeforeReq("BatchGetBannerForSync", data, params)
        const buffer = base_BatchGetResourceReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetBannerForSync", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetBannerForSync", err)
            return {err: err, resp: null}
        } else {
            let resp = base_BatchGetResourceResp.decode(pack) as any
            this.onBeforeResp("BatchGetBannerForSync", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SaveProductVariant(req: ISaveProductVariantReq, params?: RpcParams) : Promise<{err:number, resp:ISaveProductVariantResp}> {
        let data = SaveProductVariantReq.create(req)
        this.onBeforeReq("SaveProductVariant", data, params)
        const buffer = SaveProductVariantReq.encode(data).finish()
        let [err, pack] = await this.call("SaveProductVariant", buffer, params)
        if (err) {
            this.onBeforeResp("SaveProductVariant", err)
            return {err: err, resp: null}
        } else {
            let resp = SaveProductVariantResp.decode(pack) as any
            this.onBeforeResp("SaveProductVariant", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListProductVariant(req: IListProductVariantReq, params?: RpcParams) : Promise<{err:number, resp:IListProductVariantResp}> {
        let data = ListProductVariantReq.create(req)
        this.onBeforeReq("ListProductVariant", data, params)
        const buffer = ListProductVariantReq.encode(data).finish()
        let [err, pack] = await this.call("ListProductVariant", buffer, params)
        if (err) {
            this.onBeforeResp("ListProductVariant", err)
            return {err: err, resp: null}
        } else {
            let resp = ListProductVariantResp.decode(pack) as any
            this.onBeforeResp("ListProductVariant", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetProductVariant(req: IGetProductVariantReq, params?: RpcParams) : Promise<{err:number, resp:IGetProductVariantResp}> {
        let data = GetProductVariantReq.create(req)
        this.onBeforeReq("GetProductVariant", data, params)
        const buffer = GetProductVariantReq.encode(data).finish()
        let [err, pack] = await this.call("GetProductVariant", buffer, params)
        if (err) {
            this.onBeforeResp("GetProductVariant", err)
            return {err: err, resp: null}
        } else {
            let resp = GetProductVariantResp.decode(pack) as any
            this.onBeforeResp("GetProductVariant", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetProductVariantForSync(req: base_IBatchGetResourceReq, params?: RpcParams) : Promise<{err:number, resp:base_IBatchGetResourceResp}> {
        let data = base_BatchGetResourceReq.create(req)
        this.onBeforeReq("BatchGetProductVariantForSync", data, params)
        const buffer = base_BatchGetResourceReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetProductVariantForSync", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetProductVariantForSync", err)
            return {err: err, resp: null}
        } else {
            let resp = base_BatchGetResourceResp.decode(pack) as any
            this.onBeforeResp("BatchGetProductVariantForSync", err, resp)
            return {err: null, resp: resp}
        }
    }
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
    async ListTabByUser(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:IListTabResp}> {
        let data = base_Void.create(req)
        this.onBeforeReq("ListTabByUser", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("ListTabByUser", buffer, params)
        if (err) {
            this.onBeforeResp("ListTabByUser", err)
            return {err: err, resp: null}
        } else {
            let resp = ListTabResp.decode(pack) as any
            this.onBeforeResp("ListTabByUser", err, resp)
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
    async SaveMerchandiseCategory(req: ISaveMerchandiseCategoryReq, params?: RpcParams) : Promise<{err:number, resp:ISaveMerchandiseCategoryResp}> {
        let data = SaveMerchandiseCategoryReq.create(req)
        this.onBeforeReq("SaveMerchandiseCategory", data, params)
        const buffer = SaveMerchandiseCategoryReq.encode(data).finish()
        let [err, pack] = await this.call("SaveMerchandiseCategory", buffer, params)
        if (err) {
            this.onBeforeResp("SaveMerchandiseCategory", err)
            return {err: err, resp: null}
        } else {
            let resp = SaveMerchandiseCategoryResp.decode(pack) as any
            this.onBeforeResp("SaveMerchandiseCategory", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListMerchandiseCategory(req: IListMerchandiseCategoryReq, params?: RpcParams) : Promise<{err:number, resp:IListMerchandiseCategoryResp}> {
        let data = ListMerchandiseCategoryReq.create(req)
        this.onBeforeReq("ListMerchandiseCategory", data, params)
        const buffer = ListMerchandiseCategoryReq.encode(data).finish()
        let [err, pack] = await this.call("ListMerchandiseCategory", buffer, params)
        if (err) {
            this.onBeforeResp("ListMerchandiseCategory", err)
            return {err: err, resp: null}
        } else {
            let resp = ListMerchandiseCategoryResp.decode(pack) as any
            this.onBeforeResp("ListMerchandiseCategory", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DeleteMerchandiseCategory(req: IDeleteMerchandiseCategoryReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = DeleteMerchandiseCategoryReq.create(req)
        this.onBeforeReq("DeleteMerchandiseCategory", data, params)
        const buffer = DeleteMerchandiseCategoryReq.encode(data).finish()
        let [err, pack] = await this.call("DeleteMerchandiseCategory", buffer, params)
        if (err) {
            this.onBeforeResp("DeleteMerchandiseCategory", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("DeleteMerchandiseCategory", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetMerchandiseCategoryForSync(req: base_IBatchGetResourceReq, params?: RpcParams) : Promise<{err:number, resp:base_IBatchGetResourceResp}> {
        let data = base_BatchGetResourceReq.create(req)
        this.onBeforeReq("BatchGetMerchandiseCategoryForSync", data, params)
        const buffer = base_BatchGetResourceReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetMerchandiseCategoryForSync", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetMerchandiseCategoryForSync", err)
            return {err: err, resp: null}
        } else {
            let resp = base_BatchGetResourceResp.decode(pack) as any
            this.onBeforeResp("BatchGetMerchandiseCategoryForSync", err, resp)
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
    async SaveSKU(req: ISaveSKUReq, params?: RpcParams) : Promise<{err:number, resp:ISaveSKUResp}> {
        let data = SaveSKUReq.create(req)
        this.onBeforeReq("SaveSKU", data, params)
        const buffer = SaveSKUReq.encode(data).finish()
        let [err, pack] = await this.call("SaveSKU", buffer, params)
        if (err) {
            this.onBeforeResp("SaveSKU", err)
            return {err: err, resp: null}
        } else {
            let resp = SaveSKUResp.decode(pack) as any
            this.onBeforeResp("SaveSKU", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetSKU(req: IGetSKUReq, params?: RpcParams) : Promise<{err:number, resp:IGetSKUResp}> {
        let data = GetSKUReq.create(req)
        this.onBeforeReq("GetSKU", data, params)
        const buffer = GetSKUReq.encode(data).finish()
        let [err, pack] = await this.call("GetSKU", buffer, params)
        if (err) {
            this.onBeforeResp("GetSKU", err)
            return {err: err, resp: null}
        } else {
            let resp = GetSKUResp.decode(pack) as any
            this.onBeforeResp("GetSKU", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListSKU(req: IListSKUReq, params?: RpcParams) : Promise<{err:number, resp:IListSKUResp}> {
        let data = ListSKUReq.create(req)
        this.onBeforeReq("ListSKU", data, params)
        const buffer = ListSKUReq.encode(data).finish()
        let [err, pack] = await this.call("ListSKU", buffer, params)
        if (err) {
            this.onBeforeResp("ListSKU", err)
            return {err: err, resp: null}
        } else {
            let resp = ListSKUResp.decode(pack) as any
            this.onBeforeResp("ListSKU", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetSKUForSync(req: base_IBatchGetResourceReq, params?: RpcParams) : Promise<{err:number, resp:base_IBatchGetResourceResp}> {
        let data = base_BatchGetResourceReq.create(req)
        this.onBeforeReq("BatchGetSKUForSync", data, params)
        const buffer = base_BatchGetResourceReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetSKUForSync", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetSKUForSync", err)
            return {err: err, resp: null}
        } else {
            let resp = base_BatchGetResourceResp.decode(pack) as any
            this.onBeforeResp("BatchGetSKUForSync", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SaveMerchandise(req: ISaveMerchandiseReq, params?: RpcParams) : Promise<{err:number, resp:ISaveMerchandiseResp}> {
        let data = SaveMerchandiseReq.create(req)
        this.onBeforeReq("SaveMerchandise", data, params)
        const buffer = SaveMerchandiseReq.encode(data).finish()
        let [err, pack] = await this.call("SaveMerchandise", buffer, params)
        if (err) {
            this.onBeforeResp("SaveMerchandise", err)
            return {err: err, resp: null}
        } else {
            let resp = SaveMerchandiseResp.decode(pack) as any
            this.onBeforeResp("SaveMerchandise", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetMerchandise(req: IGetMerchandiseReq, params?: RpcParams) : Promise<{err:number, resp:IGetMerchandiseResp}> {
        let data = GetMerchandiseReq.create(req)
        this.onBeforeReq("GetMerchandise", data, params)
        const buffer = GetMerchandiseReq.encode(data).finish()
        let [err, pack] = await this.call("GetMerchandise", buffer, params)
        if (err) {
            this.onBeforeResp("GetMerchandise", err)
            return {err: err, resp: null}
        } else {
            let resp = GetMerchandiseResp.decode(pack) as any
            this.onBeforeResp("GetMerchandise", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListMerchandise(req: IListMerchandiseReq, params?: RpcParams) : Promise<{err:number, resp:IListMerchandiseResp}> {
        let data = ListMerchandiseReq.create(req)
        this.onBeforeReq("ListMerchandise", data, params)
        const buffer = ListMerchandiseReq.encode(data).finish()
        let [err, pack] = await this.call("ListMerchandise", buffer, params)
        if (err) {
            this.onBeforeResp("ListMerchandise", err)
            return {err: err, resp: null}
        } else {
            let resp = ListMerchandiseResp.decode(pack) as any
            this.onBeforeResp("ListMerchandise", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetMerchandiseForSync(req: base_IBatchGetResourceReq, params?: RpcParams) : Promise<{err:number, resp:base_IBatchGetResourceResp}> {
        let data = base_BatchGetResourceReq.create(req)
        this.onBeforeReq("BatchGetMerchandiseForSync", data, params)
        const buffer = base_BatchGetResourceReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetMerchandiseForSync", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetMerchandiseForSync", err)
            return {err: err, resp: null}
        } else {
            let resp = base_BatchGetResourceResp.decode(pack) as any
            this.onBeforeResp("BatchGetMerchandiseForSync", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListSKUByUser(req: IListSKUByUserReq, params?: RpcParams) : Promise<{err:number, resp:IListSKUByUserResp}> {
        let data = ListSKUByUserReq.create(req)
        this.onBeforeReq("ListSKUByUser", data, params)
        const buffer = ListSKUByUserReq.encode(data).finish()
        let [err, pack] = await this.call("ListSKUByUser", buffer, params)
        if (err) {
            this.onBeforeResp("ListSKUByUser", err)
            return {err: err, resp: null}
        } else {
            let resp = ListSKUByUserResp.decode(pack) as any
            this.onBeforeResp("ListSKUByUser", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetSPUByUser(req: IGetSPUByUserReq, params?: RpcParams) : Promise<{err:number, resp:IGetSPUByUserResp}> {
        let data = GetSPUByUserReq.create(req)
        this.onBeforeReq("GetSPUByUser", data, params)
        const buffer = GetSPUByUserReq.encode(data).finish()
        let [err, pack] = await this.call("GetSPUByUser", buffer, params)
        if (err) {
            this.onBeforeResp("GetSPUByUser", err)
            return {err: err, resp: null}
        } else {
            let resp = GetSPUByUserResp.decode(pack) as any
            this.onBeforeResp("GetSPUByUser", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetSKUByUser(req: IGetSKUByUserReq, params?: RpcParams) : Promise<{err:number, resp:IGetSKUByUserResp}> {
        let data = GetSKUByUserReq.create(req)
        this.onBeforeReq("GetSKUByUser", data, params)
        const buffer = GetSKUByUserReq.encode(data).finish()
        let [err, pack] = await this.call("GetSKUByUser", buffer, params)
        if (err) {
            this.onBeforeResp("GetSKUByUser", err)
            return {err: err, resp: null}
        } else {
            let resp = GetSKUByUserResp.decode(pack) as any
            this.onBeforeResp("GetSKUByUser", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SearchSKUByUser(req: ISearchSKUByUserReq, params?: RpcParams) : Promise<{err:number, resp:ISearchSKUByUserResp}> {
        let data = SearchSKUByUserReq.create(req)
        this.onBeforeReq("SearchSKUByUser", data, params)
        const buffer = SearchSKUByUserReq.encode(data).finish()
        let [err, pack] = await this.call("SearchSKUByUser", buffer, params)
        if (err) {
            this.onBeforeResp("SearchSKUByUser", err)
            return {err: err, resp: null}
        } else {
            let resp = SearchSKUByUserResp.decode(pack) as any
            this.onBeforeResp("SearchSKUByUser", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SaveUserShoppingCartItem(req: ISaveShoppingCartItemReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = SaveShoppingCartItemReq.create(req)
        this.onBeforeReq("SaveUserShoppingCartItem", data, params)
        const buffer = SaveShoppingCartItemReq.encode(data).finish()
        let [err, pack] = await this.call("SaveUserShoppingCartItem", buffer, params)
        if (err) {
            this.onBeforeResp("SaveUserShoppingCartItem", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("SaveUserShoppingCartItem", err, resp)
            return {err: null, resp: resp}
        }
    }
    async AddUserShoppingCartItem(req: IAddShoppingCartItemReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = AddShoppingCartItemReq.create(req)
        this.onBeforeReq("AddUserShoppingCartItem", data, params)
        const buffer = AddShoppingCartItemReq.encode(data).finish()
        let [err, pack] = await this.call("AddUserShoppingCartItem", buffer, params)
        if (err) {
            this.onBeforeResp("AddUserShoppingCartItem", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("AddUserShoppingCartItem", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListUserShoppingCartItem(req: IListUserShoppingCartItemReq, params?: RpcParams) : Promise<{err:number, resp:IListUserShoppingCartItemResp}> {
        let data = ListUserShoppingCartItemReq.create(req)
        this.onBeforeReq("ListUserShoppingCartItem", data, params)
        const buffer = ListUserShoppingCartItemReq.encode(data).finish()
        let [err, pack] = await this.call("ListUserShoppingCartItem", buffer, params)
        if (err) {
            this.onBeforeResp("ListUserShoppingCartItem", err)
            return {err: err, resp: null}
        } else {
            let resp = ListUserShoppingCartItemResp.decode(pack) as any
            this.onBeforeResp("ListUserShoppingCartItem", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListUserShoppingCartItemWithPrice(req: IListUserShoppingCartItemWithPriceReq, params?: RpcParams) : Promise<{err:number, resp:IListUserShoppingCartItemWithPriceResp}> {
        let data = ListUserShoppingCartItemWithPriceReq.create(req)
        this.onBeforeReq("ListUserShoppingCartItemWithPrice", data, params)
        const buffer = ListUserShoppingCartItemWithPriceReq.encode(data).finish()
        let [err, pack] = await this.call("ListUserShoppingCartItemWithPrice", buffer, params)
        if (err) {
            this.onBeforeResp("ListUserShoppingCartItemWithPrice", err)
            return {err: err, resp: null}
        } else {
            let resp = ListUserShoppingCartItemWithPriceResp.decode(pack) as any
            this.onBeforeResp("ListUserShoppingCartItemWithPrice", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DeleteUserShoppingCartItem(req: IDeleteUserShoppingCartItemReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = DeleteUserShoppingCartItemReq.create(req)
        this.onBeforeReq("DeleteUserShoppingCartItem", data, params)
        const buffer = DeleteUserShoppingCartItemReq.encode(data).finish()
        let [err, pack] = await this.call("DeleteUserShoppingCartItem", buffer, params)
        if (err) {
            this.onBeforeResp("DeleteUserShoppingCartItem", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("DeleteUserShoppingCartItem", err, resp)
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
    async CalcOrder(req: ICalcOrderReq, params?: RpcParams) : Promise<{err:number, resp:ICalcOrderResp}> {
        let data = CalcOrderReq.create(req)
        this.onBeforeReq("CalcOrder", data, params)
        const buffer = CalcOrderReq.encode(data).finish()
        let [err, pack] = await this.call("CalcOrder", buffer, params)
        if (err) {
            this.onBeforeResp("CalcOrder", err)
            return {err: err, resp: null}
        } else {
            let resp = CalcOrderResp.decode(pack) as any
            this.onBeforeResp("CalcOrder", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetUserStat(req: IGetUserStatReq, params?: RpcParams) : Promise<{err:number, resp:IGetUserStatResp}> {
        let data = GetUserStatReq.create(req)
        this.onBeforeReq("GetUserStat", data, params)
        const buffer = GetUserStatReq.encode(data).finish()
        let [err, pack] = await this.call("GetUserStat", buffer, params)
        if (err) {
            this.onBeforeResp("GetUserStat", err)
            return {err: err, resp: null}
        } else {
            let resp = GetUserStatResp.decode(pack) as any
            this.onBeforeResp("GetUserStat", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetUserCouponPropList(req: IGetUserCouponPropListReq, params?: RpcParams) : Promise<{err:number, resp:IGetUserCouponPropListResp}> {
        let data = GetUserCouponPropListReq.create(req)
        this.onBeforeReq("GetUserCouponPropList", data, params)
        const buffer = GetUserCouponPropListReq.encode(data).finish()
        let [err, pack] = await this.call("GetUserCouponPropList", buffer, params)
        if (err) {
            this.onBeforeResp("GetUserCouponPropList", err)
            return {err: err, resp: null}
        } else {
            let resp = GetUserCouponPropListResp.decode(pack) as any
            this.onBeforeResp("GetUserCouponPropList", err, resp)
            return {err: null, resp: resp}
        }
    }
    async AddUserCouponProp(req: IAddUserCouponPropReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = AddUserCouponPropReq.create(req)
        this.onBeforeReq("AddUserCouponProp", data, params)
        const buffer = AddUserCouponPropReq.encode(data).finish()
        let [err, pack] = await this.call("AddUserCouponProp", buffer, params)
        if (err) {
            this.onBeforeResp("AddUserCouponProp", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("AddUserCouponProp", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DelUserCouponProp(req: IDelUserCouponPropReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = DelUserCouponPropReq.create(req)
        this.onBeforeReq("DelUserCouponProp", data, params)
        const buffer = DelUserCouponPropReq.encode(data).finish()
        let [err, pack] = await this.call("DelUserCouponProp", buffer, params)
        if (err) {
            this.onBeforeResp("DelUserCouponProp", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("DelUserCouponProp", err, resp)
            return {err: null, resp: resp}
        }
    }
    async RelateSkuUserCouponProp(req: IRelateSkuUserCouponPropReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = RelateSkuUserCouponPropReq.create(req)
        this.onBeforeReq("RelateSkuUserCouponProp", data, params)
        const buffer = RelateSkuUserCouponPropReq.encode(data).finish()
        let [err, pack] = await this.call("RelateSkuUserCouponProp", buffer, params)
        if (err) {
            this.onBeforeResp("RelateSkuUserCouponProp", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("RelateSkuUserCouponProp", err, resp)
            return {err: null, resp: resp}
        }
    }
}
export const PrizeMall = new $PrizeMall({
    name: "tss.hall.prizemall.v2",
})
import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  Void as base_Void,IVoid as base_IVoid ,  BatchGetResourceReq as base_BatchGetResourceReq,IBatchGetResourceReq as base_IBatchGetResourceReq ,  BatchGetResourceResp as base_BatchGetResourceResp,IBatchGetResourceResp as base_IBatchGetResourceResp ,  } from "idl/base/base"
import {  AssetItem as tss_common_AssetItem,IAssetItem as tss_common_IAssetItem ,  PropType as tss_common_PropType ,  PropCategory as tss_common_PropCategory ,  ExpireData as tss_common_ExpireData,IExpireData as tss_common_IExpireData ,  Way as tss_common_Way ,  Sign as tss_common_Sign ,  UserRobotFlag as tss_common_UserRobotFlag ,  } from "idl/tss/common/common_define"
import {  Code as tss_hall_Code ,  } from "idl/tss/hall/code"
import {  IncUserAssetsReq as tss_hall_common_IncUserAssetsReq,IIncUserAssetsReq as tss_hall_common_IIncUserAssetsReq ,  IncUserAssetsResp as tss_hall_common_IncUserAssetsResp,IIncUserAssetsResp as tss_hall_common_IIncUserAssetsResp ,  CalcIncUserAssetsReq as tss_hall_common_CalcIncUserAssetsReq,ICalcIncUserAssetsReq as tss_hall_common_ICalcIncUserAssetsReq ,  CalcIncUserAssetsResp as tss_hall_common_CalcIncUserAssetsResp,ICalcIncUserAssetsResp as tss_hall_common_ICalcIncUserAssetsResp ,  SaveIncUserAssetsReq as tss_hall_common_SaveIncUserAssetsReq,ISaveIncUserAssetsReq as tss_hall_common_ISaveIncUserAssetsReq ,  SaveIncUserAssetsResp as tss_hall_common_SaveIncUserAssetsResp,ISaveIncUserAssetsResp as tss_hall_common_ISaveIncUserAssetsResp ,  DecUserAssetsReq as tss_hall_common_DecUserAssetsReq,IDecUserAssetsReq as tss_hall_common_IDecUserAssetsReq ,  DecUserAssetsResp as tss_hall_common_DecUserAssetsResp,IDecUserAssetsResp as tss_hall_common_IDecUserAssetsResp ,  FillAssetsReq as tss_hall_common_FillAssetsReq,IFillAssetsReq as tss_hall_common_IFillAssetsReq ,  FillAssetsResp as tss_hall_common_FillAssetsResp,IFillAssetsResp as tss_hall_common_IFillAssetsResp ,  DynamicAssetItems as tss_hall_common_DynamicAssetItems,IDynamicAssetItems as tss_hall_common_IDynamicAssetItems ,  } from "idl/tss/hall/common/assets"
import {  BuffExtraConf as tss_hall_common_BuffExtraConf,IBuffExtraConf as tss_hall_common_IBuffExtraConf ,  } from "idl/tss/hall/common/buff"
import {  DeliverProduct as tss_hall_common_DeliverProduct,IDeliverProduct as tss_hall_common_IDeliverProduct ,  } from "idl/tss/hall/common/mall"
import {  PremiumCardType as tss_hall_common_PremiumCardType ,  } from "idl/tss/hall/common/premiumcard"
export enum State {  
    PropStateUnknown = 0,  
    PropStateEnabled = 1,  
    PropStateDisabled = 2,
}
export enum UsageType {  
    UsageTypeUnknown = 0,  
    UsageTypeDirectly = 1,  
    UsageTypeJump = 2,  
    UsageTypeNoneAction = 3,  
    UsageTypeJumpExchange = 4,
}
export enum GrantType {  
    GrantTypeDirectly = 0,  
    GrantTypeByMail = 1,
}
export enum GiftOpenMethodType {  
    GiftOpenMethodTypeUnknown = 0,  
    GiftOpenMethodTypeAuto = 1,  
    GiftOpenMethodTypeManual = 2,
}
export enum QueryTab {  
    TabUnknown = 0,  
    TabRegular = 1,  
    TabVoucher = 2,
}
export enum UserPropState {  
    UserPropStateUnknown = 0,  
    UserPropStateNormal = 1,  
    UserPropStateDeleted = 2,
}
export enum CleanUpOption {  
    CleanUpOptDiscard = 0,  
    CleanUpOptRecycle = 1,
}
export enum ResType {  
    ResTypeUnknown = 0,  
    ResTypeProp = 1,  
    ResTypeGift = 2,
}
export interface INotifyGiftOpenResultResp {
    results?: tss_common_IAssetItem[]
}
@protobuf.Type.d("tss_hall_prop_v4_NotifyGiftOpenResultResp")
export class NotifyGiftOpenResultResp extends protobuf.Message<INotifyGiftOpenResultResp> {
    constructor(properties: Properties<INotifyGiftOpenResultResp>) {
        super(properties);
        if (properties) {
            if (properties.results) { this.results = []; properties.results.forEach((value, index)=>{this.results[index] = tss_common_AssetItem.create(properties.results[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_common_AssetItem", "repeated")
    public results?: tss_common_AssetItem[] = []
}
export interface ICleanUpUserPropBadgeReq {
    uid?: number|null
    propId?: number|null
    type?: tss_common_PropType|null
    expireAt?: number|null
}
@protobuf.Type.d("tss_hall_prop_v4_CleanUpUserPropBadgeReq")
export class CleanUpUserPropBadgeReq extends protobuf.Message<ICleanUpUserPropBadgeReq> {
    constructor(properties: Properties<ICleanUpUserPropBadgeReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.propId) { this.propId = properties.propId }
            if (properties.type) { this.type = properties.type }
            if (properties.expireAt) { this.expireAt = properties.expireAt }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public propId?: number|null = 0
    @protobuf.Field.d(3, tss_common_PropType, "optional", tss_common_PropType.PropTypeUnknown)
    public type?: tss_common_PropType|null = tss_common_PropType.PropTypeUnknown
    @protobuf.Field.d(4, "int64", "optional", 0)
    public expireAt?: number|null = 0
}
export interface ICheckUserExpiredPropCallbackReq {
    uid?: number|null
    resId?: number|null
    expireAt?: number|null
    resType?: ResType|null
}
@protobuf.Type.d("tss_hall_prop_v4_CheckUserExpiredPropCallbackReq")
export class CheckUserExpiredPropCallbackReq extends protobuf.Message<ICheckUserExpiredPropCallbackReq> {
    constructor(properties: Properties<ICheckUserExpiredPropCallbackReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.resId) { this.resId = properties.resId }
            if (properties.expireAt) { this.expireAt = properties.expireAt }
            if (properties.resType) { this.resType = properties.resType }
        }
	}
    @protobuf.Field.d(2, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public resId?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public expireAt?: number|null = 0
    @protobuf.Field.d(5, ResType, "optional", ResType.ResTypeUnknown)
    public resType?: ResType|null = ResType.ResTypeUnknown
}
export interface IPremiumCard {
    Type?: tss_hall_common_PremiumCardType|null
    unitTime?: number|null
}
@protobuf.Type.d("tss_hall_prop_v4_PremiumCard")
export class PremiumCard extends protobuf.Message<IPremiumCard> {
    constructor(properties: Properties<IPremiumCard>) {
        super(properties);
        if (properties) {
            if (properties.Type) { this.Type = properties.Type }
            if (properties.unitTime) { this.unitTime = properties.unitTime }
        }
	}
    @protobuf.Field.d(1, tss_hall_common_PremiumCardType, "optional", tss_hall_common_PremiumCardType.PremiumCardTypeUnknown)
    public Type?: tss_hall_common_PremiumCardType|null = tss_hall_common_PremiumCardType.PremiumCardTypeUnknown
    @protobuf.Field.d(2, "int64", "optional", 0)
    public unitTime?: number|null = 0
}
export interface IIntimacyProp {
    intimacy?: number|null
}
@protobuf.Type.d("tss_hall_prop_v4_IntimacyProp")
export class IntimacyProp extends protobuf.Message<IIntimacyProp> {
    constructor(properties: Properties<IIntimacyProp>) {
        super(properties);
        if (properties) {
            if (properties.intimacy) { this.intimacy = properties.intimacy }
        }
	}
    @protobuf.Field.d(7, "int64", "optional", 0)
    public intimacy?: number|null = 0
}
export interface IUsage {
    Type?: UsageType|null
    Desc?: string|null
    url?: string|null
}
@protobuf.Type.d("tss_hall_prop_v4_Usage")
export class Usage extends protobuf.Message<IUsage> {
    constructor(properties: Properties<IUsage>) {
        super(properties);
        if (properties) {
            if (properties.Type) { this.Type = properties.Type }
            if (properties.Desc) { this.Desc = properties.Desc }
            if (properties.url) { this.url = properties.url }
        }
	}
    @protobuf.Field.d(1, UsageType, "optional", UsageType.UsageTypeUnknown)
    public Type?: UsageType|null = UsageType.UsageTypeUnknown
    @protobuf.Field.d(2, "string", "optional", )
    public Desc?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public url?: string|null = ""
}
export interface IBuffProp {
    duration?: number|null
    count?: number|null
    markupRate?: number|null
    buffExtraConf?: tss_hall_common_IBuffExtraConf
}
@protobuf.Type.d("tss_hall_prop_v4_BuffProp")
export class BuffProp extends protobuf.Message<IBuffProp> {
    constructor(properties: Properties<IBuffProp>) {
        super(properties);
        if (properties) {
            if (properties.duration) { this.duration = properties.duration }
            if (properties.count) { this.count = properties.count }
            if (properties.markupRate) { this.markupRate = properties.markupRate }
            if (properties.buffExtraConf) { this.buffExtraConf = tss_hall_common_BuffExtraConf.create(properties.buffExtraConf) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public duration?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public count?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public markupRate?: number|null = 0
    @protobuf.Field.d(4, "tss_hall_common_BuffExtraConf", "optional")
    public buffExtraConf?: tss_hall_common_BuffExtraConf|null
}
export interface ICouponProp {
    moneyAmount?: number|null
    discount?: number|null
    deduction?: number|null
    maxDeduction?: number|null
    startAt?: number|null
    endAt?: number|null
}
@protobuf.Type.d("tss_hall_prop_v4_CouponProp")
export class CouponProp extends protobuf.Message<ICouponProp> {
    constructor(properties: Properties<ICouponProp>) {
        super(properties);
        if (properties) {
            if (properties.moneyAmount) { this.moneyAmount = properties.moneyAmount }
            if (properties.discount) { this.discount = properties.discount }
            if (properties.deduction) { this.deduction = properties.deduction }
            if (properties.maxDeduction) { this.maxDeduction = properties.maxDeduction }
            if (properties.startAt) { this.startAt = properties.startAt }
            if (properties.endAt) { this.endAt = properties.endAt }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public moneyAmount?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public discount?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public deduction?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public maxDeduction?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public startAt?: number|null = 0
    @protobuf.Field.d(6, "int64", "optional", 0)
    public endAt?: number|null = 0
}
export interface IPopularityProp {
    IsOpenWithdraw?: boolean|null
    popularity?: number|null
}
@protobuf.Type.d("tss_hall_prop_v4_PopularityProp")
export class PopularityProp extends protobuf.Message<IPopularityProp> {
    constructor(properties: Properties<IPopularityProp>) {
        super(properties);
        if (properties) {
            if (properties.IsOpenWithdraw) { this.IsOpenWithdraw = properties.IsOpenWithdraw }
            if (properties.popularity) { this.popularity = properties.popularity }
        }
	}
    @protobuf.Field.d(1, "bool", "optional", false)
    public IsOpenWithdraw?: boolean|null = false
    @protobuf.Field.d(2, "int64", "optional", 0)
    public popularity?: number|null = 0
}
export interface IBaseProp {
    propID?: number|null
    category?: tss_common_PropCategory|null
    type?: tss_common_PropType|null
    name?: string|null
    desc?: string|null
    img?: string|null
    icon?: string|null
    price?: number|null
    tags?: string[]
    state?: State|null
    isStack?: boolean|null
    createAt?: number|null
    updateAt?: number|null
    operator?: string|null
    usage?: IUsage
    referDiamond?: number|null
    referPrice?: number|null
    canSend?: boolean|null
    discardCompensation?: number|null
    usableLevel?: number|null
    usablePremium?: boolean|null
    referMung?: number|null
    recycleAble?: boolean|null
    isInvisibleForUser?: boolean|null
    isInvisibleForCMS?: boolean|null
}
@protobuf.Type.d("tss_hall_prop_v4_BaseProp")
export class BaseProp extends protobuf.Message<IBaseProp> {
    constructor(properties: Properties<IBaseProp>) {
        super(properties);
        if (properties) {
            if (properties.propID) { this.propID = properties.propID }
            if (properties.category) { this.category = properties.category }
            if (properties.type) { this.type = properties.type }
            if (properties.name) { this.name = properties.name }
            if (properties.desc) { this.desc = properties.desc }
            if (properties.img) { this.img = properties.img }
            if (properties.icon) { this.icon = properties.icon }
            if (properties.price) { this.price = properties.price }
            if (properties.tags) { this.tags = []; properties.tags.forEach((value, index)=>{this.tags[index] = properties.tags[index]})}
            if (properties.state) { this.state = properties.state }
            if (properties.isStack) { this.isStack = properties.isStack }
            if (properties.createAt) { this.createAt = properties.createAt }
            if (properties.updateAt) { this.updateAt = properties.updateAt }
            if (properties.operator) { this.operator = properties.operator }
            if (properties.usage) { this.usage = Usage.create(properties.usage) as any }
            if (properties.referDiamond) { this.referDiamond = properties.referDiamond }
            if (properties.referPrice) { this.referPrice = properties.referPrice }
            if (properties.canSend) { this.canSend = properties.canSend }
            if (properties.discardCompensation) { this.discardCompensation = properties.discardCompensation }
            if (properties.usableLevel) { this.usableLevel = properties.usableLevel }
            if (properties.usablePremium) { this.usablePremium = properties.usablePremium }
            if (properties.referMung) { this.referMung = properties.referMung }
            if (properties.recycleAble) { this.recycleAble = properties.recycleAble }
            if (properties.isInvisibleForUser) { this.isInvisibleForUser = properties.isInvisibleForUser }
            if (properties.isInvisibleForCMS) { this.isInvisibleForCMS = properties.isInvisibleForCMS }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public propID?: number|null = 0
    @protobuf.Field.d(2, tss_common_PropCategory, "optional", tss_common_PropCategory.PropCategoryUnknown)
    public category?: tss_common_PropCategory|null = tss_common_PropCategory.PropCategoryUnknown
    @protobuf.Field.d(3, tss_common_PropType, "optional", tss_common_PropType.PropTypeUnknown)
    public type?: tss_common_PropType|null = tss_common_PropType.PropTypeUnknown
    @protobuf.Field.d(4, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public desc?: string|null = ""
    @protobuf.Field.d(6, "string", "optional", )
    public img?: string|null = ""
    @protobuf.Field.d(7, "string", "optional", )
    public icon?: string|null = ""
    @protobuf.Field.d(8, "int32", "optional", 0)
    public price?: number|null = 0
    @protobuf.Field.d(9, "string", "repeated", [])
    public tags?: string[] = []
    @protobuf.Field.d(10, State, "optional", State.PropStateUnknown)
    public state?: State|null = State.PropStateUnknown
    @protobuf.Field.d(11, "bool", "optional", false)
    public isStack?: boolean|null = false
    @protobuf.Field.d(12, "int64", "optional", 0)
    public createAt?: number|null = 0
    @protobuf.Field.d(13, "int64", "optional", 0)
    public updateAt?: number|null = 0
    @protobuf.Field.d(14, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(15, "tss_hall_prop_v4_Usage", "optional")
    public usage?: Usage|null
    @protobuf.Field.d(16, "int32", "optional", 0)
    public referDiamond?: number|null = 0
    @protobuf.Field.d(17, "int32", "optional", 0)
    public referPrice?: number|null = 0
    @protobuf.Field.d(18, "bool", "optional", false)
    public canSend?: boolean|null = false
    @protobuf.Field.d(19, "int32", "optional", 0)
    public discardCompensation?: number|null = 0
    @protobuf.Field.d(20, "int32", "optional", 0)
    public usableLevel?: number|null = 0
    @protobuf.Field.d(21, "bool", "optional", false)
    public usablePremium?: boolean|null = false
    @protobuf.Field.d(22, "int32", "optional", 0)
    public referMung?: number|null = 0
    @protobuf.Field.d(23, "bool", "optional", false)
    public recycleAble?: boolean|null = false
    @protobuf.Field.d(24, "bool", "optional", false)
    public isInvisibleForUser?: boolean|null = false
    @protobuf.Field.d(25, "bool", "optional", false)
    public isInvisibleForCMS?: boolean|null = false
}
export interface IProp {
    id?: number|null
    base?: IBaseProp
    buff?: IBuffProp
    coupon?: ICouponProp
    intimacy?: IIntimacyProp
    popularity?: IPopularityProp
    premiumCard?: IPremiumCard
}
@protobuf.Type.d("tss_hall_prop_v4_Prop")
export class Prop extends protobuf.Message<IProp> {
    constructor(properties: Properties<IProp>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.base) { this.base = BaseProp.create(properties.base) as any }
            if (properties.buff) { this.buff = BuffProp.create(properties.buff) as any }
            if (properties.coupon) { this.coupon = CouponProp.create(properties.coupon) as any }
            if (properties.intimacy) { this.intimacy = IntimacyProp.create(properties.intimacy) as any }
            if (properties.popularity) { this.popularity = PopularityProp.create(properties.popularity) as any }
            if (properties.premiumCard) { this.premiumCard = PremiumCard.create(properties.premiumCard) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public id?: number|null = 0
    @protobuf.Field.d(2, "tss_hall_prop_v4_BaseProp", "optional")
    public base?: BaseProp|null
    @protobuf.Field.d(3, "tss_hall_prop_v4_BuffProp", "optional")
    public buff?: BuffProp|null
    @protobuf.Field.d(5, "tss_hall_prop_v4_CouponProp", "optional")
    public coupon?: CouponProp|null
    @protobuf.Field.d(6, "tss_hall_prop_v4_IntimacyProp", "optional")
    public intimacy?: IntimacyProp|null
    @protobuf.Field.d(7, "tss_hall_prop_v4_PopularityProp", "optional")
    public popularity?: PopularityProp|null
    @protobuf.Field.d(8, "tss_hall_prop_v4_PremiumCard", "optional")
    public premiumCard?: PremiumCard|null
}
export interface ISavePropReq {
    prop?: IProp
}
@protobuf.Type.d("tss_hall_prop_v4_SavePropReq")
export class SavePropReq extends protobuf.Message<ISavePropReq> {
    constructor(properties: Properties<ISavePropReq>) {
        super(properties);
        if (properties) {
            if (properties.prop) { this.prop = Prop.create(properties.prop) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prop_v4_Prop", "optional")
    public prop?: Prop|null
}
export interface ISavePropResp {
    prop?: IProp
}
@protobuf.Type.d("tss_hall_prop_v4_SavePropResp")
export class SavePropResp extends protobuf.Message<ISavePropResp> {
    constructor(properties: Properties<ISavePropResp>) {
        super(properties);
        if (properties) {
            if (properties.prop) { this.prop = Prop.create(properties.prop) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prop_v4_Prop", "optional")
    public prop?: Prop|null
}
export interface IBatchGetPropReq {
    ids?: number[]
}
@protobuf.Type.d("tss_hall_prop_v4_BatchGetPropReq")
export class BatchGetPropReq extends protobuf.Message<IBatchGetPropReq> {
    constructor(properties: Properties<IBatchGetPropReq>) {
        super(properties);
        if (properties) {
            if (properties.ids) { this.ids = []; properties.ids.forEach((value, index)=>{this.ids[index] = properties.ids[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public ids?: number[] = []
}
export interface IBatchGetPropResp {
    props?: IProp[]
}
@protobuf.Type.d("tss_hall_prop_v4_BatchGetPropResp")
export class BatchGetPropResp extends protobuf.Message<IBatchGetPropResp> {
    constructor(properties: Properties<IBatchGetPropResp>) {
        super(properties);
        if (properties) {
            if (properties.props) { this.props = []; properties.props.forEach((value, index)=>{this.props[index] = Prop.create(properties.props[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_prop_v4_Prop", "repeated")
    public props?: Prop[] = []
}
export interface IListPropReq {
    page?: number|null
    pageSize?: number|null
    types?: tss_common_PropType[]
    keyword?: string|null
    category?: tss_common_PropCategory|null
    invisible?: boolean|null
}
@protobuf.Type.d("tss_hall_prop_v4_ListPropReq")
export class ListPropReq extends protobuf.Message<IListPropReq> {
    constructor(properties: Properties<IListPropReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.types) { this.types = []; properties.types.forEach((value, index)=>{this.types[index] = properties.types[index]})}
            if (properties.keyword) { this.keyword = properties.keyword }
            if (properties.category) { this.category = properties.category }
            if (properties.invisible) { this.invisible = properties.invisible }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(3, tss_common_PropType, "repeated", tss_common_PropType.PropTypeUnknown)
    public types?: tss_common_PropType[] = []
    @protobuf.Field.d(4, "string", "optional", )
    public keyword?: string|null = ""
    @protobuf.Field.d(5, tss_common_PropCategory, "optional", tss_common_PropCategory.PropCategoryUnknown)
    public category?: tss_common_PropCategory|null = tss_common_PropCategory.PropCategoryUnknown
    @protobuf.Field.d(6, "bool", "optional", false)
    public invisible?: boolean|null = false
}
export interface IListPropResp {
    totalSize?: number|null
    props?: IProp[]
}
@protobuf.Type.d("tss_hall_prop_v4_ListPropResp")
export class ListPropResp extends protobuf.Message<IListPropResp> {
    constructor(properties: Properties<IListPropResp>) {
        super(properties);
        if (properties) {
            if (properties.totalSize) { this.totalSize = properties.totalSize }
            if (properties.props) { this.props = []; properties.props.forEach((value, index)=>{this.props[index] = Prop.create(properties.props[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public totalSize?: number|null = 0
    @protobuf.Field.d(2, "tss_hall_prop_v4_Prop", "repeated")
    public props?: Prop[] = []
}
export interface IGetPropReq {
    id?: number|null
}
@protobuf.Type.d("tss_hall_prop_v4_GetPropReq")
export class GetPropReq extends protobuf.Message<IGetPropReq> {
    constructor(properties: Properties<IGetPropReq>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public id?: number|null = 0
}
export interface IGetPropResp {
    prop?: IProp
}
@protobuf.Type.d("tss_hall_prop_v4_GetPropResp")
export class GetPropResp extends protobuf.Message<IGetPropResp> {
    constructor(properties: Properties<IGetPropResp>) {
        super(properties);
        if (properties) {
            if (properties.prop) { this.prop = Prop.create(properties.prop) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prop_v4_Prop", "optional")
    public prop?: Prop|null
}
export interface IGift {
    id?: number|null
    name?: string|null
    desc?: string|null
    img?: string|null
    icon?: string|null
    price?: number|null
    tags?: string[]
    state?: State|null
    isStack?: boolean|null
    createAt?: number|null
    updateAt?: number|null
    operator?: string|null
    openMethod?: GiftOpenMethodType|null
    referDiamond?: number|null
    referPrice?: number|null
    items?: tss_common_IAssetItem[]
    CanSend?: boolean|null
    discardCompensation?: number|null
    blindBox?: boolean|null
    prizePoolId?: number|null
    referMung?: number|null
    recycleAble?: boolean|null
    isInvisibleForUser?: boolean|null
    isInvisibleForCMS?: boolean|null
}
@protobuf.Type.d("tss_hall_prop_v4_Gift")
export class Gift extends protobuf.Message<IGift> {
    constructor(properties: Properties<IGift>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.name) { this.name = properties.name }
            if (properties.desc) { this.desc = properties.desc }
            if (properties.img) { this.img = properties.img }
            if (properties.icon) { this.icon = properties.icon }
            if (properties.price) { this.price = properties.price }
            if (properties.tags) { this.tags = []; properties.tags.forEach((value, index)=>{this.tags[index] = properties.tags[index]})}
            if (properties.state) { this.state = properties.state }
            if (properties.isStack) { this.isStack = properties.isStack }
            if (properties.createAt) { this.createAt = properties.createAt }
            if (properties.updateAt) { this.updateAt = properties.updateAt }
            if (properties.operator) { this.operator = properties.operator }
            if (properties.openMethod) { this.openMethod = properties.openMethod }
            if (properties.referDiamond) { this.referDiamond = properties.referDiamond }
            if (properties.referPrice) { this.referPrice = properties.referPrice }
            if (properties.items) { this.items = []; properties.items.forEach((value, index)=>{this.items[index] = tss_common_AssetItem.create(properties.items[index]) as any})}
            if (properties.CanSend) { this.CanSend = properties.CanSend }
            if (properties.discardCompensation) { this.discardCompensation = properties.discardCompensation }
            if (properties.blindBox) { this.blindBox = properties.blindBox }
            if (properties.prizePoolId) { this.prizePoolId = properties.prizePoolId }
            if (properties.referMung) { this.referMung = properties.referMung }
            if (properties.recycleAble) { this.recycleAble = properties.recycleAble }
            if (properties.isInvisibleForUser) { this.isInvisibleForUser = properties.isInvisibleForUser }
            if (properties.isInvisibleForCMS) { this.isInvisibleForCMS = properties.isInvisibleForCMS }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public id?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public desc?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public img?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public icon?: string|null = ""
    @protobuf.Field.d(6, "int32", "optional", 0)
    public price?: number|null = 0
    @protobuf.Field.d(7, "string", "repeated", [])
    public tags?: string[] = []
    @protobuf.Field.d(8, State, "optional", State.PropStateUnknown)
    public state?: State|null = State.PropStateUnknown
    @protobuf.Field.d(9, "bool", "optional", false)
    public isStack?: boolean|null = false
    @protobuf.Field.d(10, "int64", "optional", 0)
    public createAt?: number|null = 0
    @protobuf.Field.d(11, "int64", "optional", 0)
    public updateAt?: number|null = 0
    @protobuf.Field.d(12, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(13, GiftOpenMethodType, "optional", GiftOpenMethodType.GiftOpenMethodTypeUnknown)
    public openMethod?: GiftOpenMethodType|null = GiftOpenMethodType.GiftOpenMethodTypeUnknown
    @protobuf.Field.d(14, "int32", "optional", 0)
    public referDiamond?: number|null = 0
    @protobuf.Field.d(15, "int32", "optional", 0)
    public referPrice?: number|null = 0
    @protobuf.Field.d(16, "tss_common_AssetItem", "repeated")
    public items?: tss_common_AssetItem[] = []
    @protobuf.Field.d(17, "bool", "optional", false)
    public CanSend?: boolean|null = false
    @protobuf.Field.d(18, "int32", "optional", 0)
    public discardCompensation?: number|null = 0
    @protobuf.Field.d(19, "bool", "optional", false)
    public blindBox?: boolean|null = false
    @protobuf.Field.d(20, "int64", "optional", 0)
    public prizePoolId?: number|null = 0
    @protobuf.Field.d(21, "int32", "optional", 0)
    public referMung?: number|null = 0
    @protobuf.Field.d(22, "bool", "optional", false)
    public recycleAble?: boolean|null = false
    @protobuf.Field.d(24, "bool", "optional", false)
    public isInvisibleForUser?: boolean|null = false
    @protobuf.Field.d(25, "bool", "optional", false)
    public isInvisibleForCMS?: boolean|null = false
}
export interface IUserProp {
    uid?: number|null
    propID?: number|null
    num?: number|null
    expireAt?: number|null
    category?: tss_common_PropCategory|null
    type?: tss_common_PropType|null
    name?: string|null
    desc?: string|null
    img?: string|null
    icon?: string|null
    grantedAt?: number|null
    usage?: IUsage
    showTag?: string|null
    badgeNum?: number|null
    state?: State|null
    objectID?: string|null
    buff?: IBuffProp
    coupon?: ICouponProp
    gitfItems?: tss_common_IAssetItem[]
    canSend?: boolean|null
    discardCompensation?: number|null
    shortcut?: boolean|null
    numInShortcut?: number|null
    referMung?: number|null
    recycleAble?: boolean|null
}
@protobuf.Type.d("tss_hall_prop_v4_UserProp")
export class UserProp extends protobuf.Message<IUserProp> {
    constructor(properties: Properties<IUserProp>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.propID) { this.propID = properties.propID }
            if (properties.num) { this.num = properties.num }
            if (properties.expireAt) { this.expireAt = properties.expireAt }
            if (properties.category) { this.category = properties.category }
            if (properties.type) { this.type = properties.type }
            if (properties.name) { this.name = properties.name }
            if (properties.desc) { this.desc = properties.desc }
            if (properties.img) { this.img = properties.img }
            if (properties.icon) { this.icon = properties.icon }
            if (properties.grantedAt) { this.grantedAt = properties.grantedAt }
            if (properties.usage) { this.usage = Usage.create(properties.usage) as any }
            if (properties.showTag) { this.showTag = properties.showTag }
            if (properties.badgeNum) { this.badgeNum = properties.badgeNum }
            if (properties.state) { this.state = properties.state }
            if (properties.objectID) { this.objectID = properties.objectID }
            if (properties.buff) { this.buff = BuffProp.create(properties.buff) as any }
            if (properties.coupon) { this.coupon = CouponProp.create(properties.coupon) as any }
            if (properties.gitfItems) { this.gitfItems = []; properties.gitfItems.forEach((value, index)=>{this.gitfItems[index] = tss_common_AssetItem.create(properties.gitfItems[index]) as any})}
            if (properties.canSend) { this.canSend = properties.canSend }
            if (properties.discardCompensation) { this.discardCompensation = properties.discardCompensation }
            if (properties.shortcut) { this.shortcut = properties.shortcut }
            if (properties.numInShortcut) { this.numInShortcut = properties.numInShortcut }
            if (properties.referMung) { this.referMung = properties.referMung }
            if (properties.recycleAble) { this.recycleAble = properties.recycleAble }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public propID?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public num?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public expireAt?: number|null = 0
    @protobuf.Field.d(5, tss_common_PropCategory, "optional", tss_common_PropCategory.PropCategoryUnknown)
    public category?: tss_common_PropCategory|null = tss_common_PropCategory.PropCategoryUnknown
    @protobuf.Field.d(6, tss_common_PropType, "optional", tss_common_PropType.PropTypeUnknown)
    public type?: tss_common_PropType|null = tss_common_PropType.PropTypeUnknown
    @protobuf.Field.d(7, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(8, "string", "optional", )
    public desc?: string|null = ""
    @protobuf.Field.d(9, "string", "optional", )
    public img?: string|null = ""
    @protobuf.Field.d(10, "string", "optional", )
    public icon?: string|null = ""
    @protobuf.Field.d(11, "int64", "optional", 0)
    public grantedAt?: number|null = 0
    @protobuf.Field.d(12, "tss_hall_prop_v4_Usage", "optional")
    public usage?: Usage|null
    @protobuf.Field.d(13, "string", "optional", )
    public showTag?: string|null = ""
    @protobuf.Field.d(14, "int64", "optional", 0)
    public badgeNum?: number|null = 0
    @protobuf.Field.d(15, State, "optional", State.PropStateUnknown)
    public state?: State|null = State.PropStateUnknown
    @protobuf.Field.d(16, "string", "optional", )
    public objectID?: string|null = ""
    @protobuf.Field.d(41, "tss_hall_prop_v4_BuffProp", "optional")
    public buff?: BuffProp|null
    @protobuf.Field.d(42, "tss_hall_prop_v4_CouponProp", "optional")
    public coupon?: CouponProp|null
    @protobuf.Field.d(43, "tss_common_AssetItem", "repeated")
    public gitfItems?: tss_common_AssetItem[] = []
    @protobuf.Field.d(44, "bool", "optional", false)
    public canSend?: boolean|null = false
    @protobuf.Field.d(45, "int32", "optional", 0)
    public discardCompensation?: number|null = 0
    @protobuf.Field.d(46, "bool", "optional", false)
    public shortcut?: boolean|null = false
    @protobuf.Field.d(47, "int64", "optional", 0)
    public numInShortcut?: number|null = 0
    @protobuf.Field.d(48, "int32", "optional", 0)
    public referMung?: number|null = 0
    @protobuf.Field.d(49, "bool", "optional", false)
    public recycleAble?: boolean|null = false
}
export interface IUserChangeItem {
    ID?: number|null
    expire?: tss_common_IExpireData
    num?: number|null
    extra?: string|null
}
@protobuf.Type.d("tss_hall_prop_v4_UserChangeItem")
export class UserChangeItem extends protobuf.Message<IUserChangeItem> {
    constructor(properties: Properties<IUserChangeItem>) {
        super(properties);
        if (properties) {
            if (properties.ID) { this.ID = properties.ID }
            if (properties.expire) { this.expire = tss_common_ExpireData.create(properties.expire) as any }
            if (properties.num) { this.num = properties.num }
            if (properties.extra) { this.extra = properties.extra }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public ID?: number|null = 0
    @protobuf.Field.d(2, "tss_common_ExpireData", "optional")
    public expire?: tss_common_ExpireData|null
    @protobuf.Field.d(3, "int64", "optional", 0)
    public num?: number|null = 0
    @protobuf.Field.d(4, "string", "optional", )
    public extra?: string|null = ""
}
export interface IUserPropChangeStamp {
    way?: tss_common_Way|null
    operator?: string|null
    grantType?: GrantType|null
    scene?: { [k: string]: string|null }
}
@protobuf.Type.d("tss_hall_prop_v4_UserPropChangeStamp")
export class UserPropChangeStamp extends protobuf.Message<IUserPropChangeStamp> {
    constructor(properties: Properties<IUserPropChangeStamp>) {
        super(properties);
        if (properties) {
            if (properties.way) { this.way = properties.way }
            if (properties.operator) { this.operator = properties.operator }
            if (properties.grantType) { this.grantType = properties.grantType }
            if (properties.scene) { this.scene = properties.scene }
        }
	}
    @protobuf.Field.d(1, tss_common_Way, "optional", tss_common_Way.WayNone)
    public way?: tss_common_Way|null = tss_common_Way.WayNone
    @protobuf.Field.d(2, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(3, GrantType, "optional", GrantType.GrantTypeDirectly)
    public grantType?: GrantType|null = GrantType.GrantTypeDirectly
    @protobuf.MapField.d(4, "string", "string")
    public scene?: { [k: string]: string|null } = {}
}
export interface IUserChange {
    uid?: number|null
    items?: IUserChangeItem[]
    stamp?: IUserPropChangeStamp
}
@protobuf.Type.d("tss_hall_prop_v4_UserChange")
export class UserChange extends protobuf.Message<IUserChange> {
    constructor(properties: Properties<IUserChange>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.items) { this.items = []; properties.items.forEach((value, index)=>{this.items[index] = UserChangeItem.create(properties.items[index]) as any})}
            if (properties.stamp) { this.stamp = UserPropChangeStamp.create(properties.stamp) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "tss_hall_prop_v4_UserChangeItem", "repeated")
    public items?: UserChangeItem[] = []
    @protobuf.Field.d(3, "tss_hall_prop_v4_UserPropChangeStamp", "optional")
    public stamp?: UserPropChangeStamp|null
}
export interface IIncUserPropReq {
    change?: IUserChange
}
@protobuf.Type.d("tss_hall_prop_v4_IncUserPropReq")
export class IncUserPropReq extends protobuf.Message<IIncUserPropReq> {
    constructor(properties: Properties<IIncUserPropReq>) {
        super(properties);
        if (properties) {
            if (properties.change) { this.change = UserChange.create(properties.change) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prop_v4_UserChange", "optional")
    public change?: UserChange|null
}
export interface IIncUserPropResp {
    batchID?: string|null
    assets?: tss_hall_common_IDynamicAssetItems[]
}
@protobuf.Type.d("tss_hall_prop_v4_IncUserPropResp")
export class IncUserPropResp extends protobuf.Message<IIncUserPropResp> {
    constructor(properties: Properties<IIncUserPropResp>) {
        super(properties);
        if (properties) {
            if (properties.batchID) { this.batchID = properties.batchID }
            if (properties.assets) { this.assets = []; properties.assets.forEach((value, index)=>{this.assets[index] = tss_hall_common_DynamicAssetItems.create(properties.assets[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public batchID?: string|null = ""
    @protobuf.Field.d(2, "tss_hall_common_DynamicAssetItems", "repeated")
    public assets?: tss_hall_common_DynamicAssetItems[] = []
}
export interface IDecUserPropReq {
    change?: IUserChange
}
@protobuf.Type.d("tss_hall_prop_v4_DecUserPropReq")
export class DecUserPropReq extends protobuf.Message<IDecUserPropReq> {
    constructor(properties: Properties<IDecUserPropReq>) {
        super(properties);
        if (properties) {
            if (properties.change) { this.change = UserChange.create(properties.change) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prop_v4_UserChange", "optional")
    public change?: UserChange|null
}
export interface IDecUserPropResp {
    code?: tss_hall_Code|null
    batchID?: string|null
    uid?: number|null
}
@protobuf.Type.d("tss_hall_prop_v4_DecUserPropResp")
export class DecUserPropResp extends protobuf.Message<IDecUserPropResp> {
    constructor(properties: Properties<IDecUserPropResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.batchID) { this.batchID = properties.batchID }
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, tss_hall_Code, "optional", tss_hall_Code.CODE_SUCCEED)
    public code?: tss_hall_Code|null = tss_hall_Code.CODE_SUCCEED
    @protobuf.Field.d(2, "string", "optional", )
    public batchID?: string|null = ""
    @protobuf.Field.d(3, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IRefundUserPropReq {
    uid?: number|null
    batchID?: string|null
}
@protobuf.Type.d("tss_hall_prop_v4_RefundUserPropReq")
export class RefundUserPropReq extends protobuf.Message<IRefundUserPropReq> {
    constructor(properties: Properties<IRefundUserPropReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.batchID) { this.batchID = properties.batchID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public batchID?: string|null = ""
}
export interface IRefundUserPropResp {
    batchID?: string|null
}
@protobuf.Type.d("tss_hall_prop_v4_RefundUserPropResp")
export class RefundUserPropResp extends protobuf.Message<IRefundUserPropResp> {
    constructor(properties: Properties<IRefundUserPropResp>) {
        super(properties);
        if (properties) {
            if (properties.batchID) { this.batchID = properties.batchID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public batchID?: string|null = ""
}
export interface IRenameReq {
    propID?: number|null
    expireAt?: number|null
    name?: string|null
    uid?: number|null
}
@protobuf.Type.d("tss_hall_prop_v4_RenameReq")
export class RenameReq extends protobuf.Message<IRenameReq> {
    constructor(properties: Properties<IRenameReq>) {
        super(properties);
        if (properties) {
            if (properties.propID) { this.propID = properties.propID }
            if (properties.expireAt) { this.expireAt = properties.expireAt }
            if (properties.name) { this.name = properties.name }
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public propID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public expireAt?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(4, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IRenameResp {
    code?: tss_hall_Code|null
}
@protobuf.Type.d("tss_hall_prop_v4_RenameResp")
export class RenameResp extends protobuf.Message<IRenameResp> {
    constructor(properties: Properties<IRenameResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
        }
	}
    @protobuf.Field.d(1, tss_hall_Code, "optional", tss_hall_Code.CODE_SUCCEED)
    public code?: tss_hall_Code|null = tss_hall_Code.CODE_SUCCEED
}
export interface IActivateVipReq {
    propID?: number|null
    expireAt?: number|null
    uid?: number|null
}
@protobuf.Type.d("tss_hall_prop_v4_ActivateVipReq")
export class ActivateVipReq extends protobuf.Message<IActivateVipReq> {
    constructor(properties: Properties<IActivateVipReq>) {
        super(properties);
        if (properties) {
            if (properties.propID) { this.propID = properties.propID }
            if (properties.expireAt) { this.expireAt = properties.expireAt }
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public propID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public expireAt?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IActivateVipResp {
    code?: tss_hall_Code|null
    expiredAt?: number|null
    hour?: number|null
}
@protobuf.Type.d("tss_hall_prop_v4_ActivateVipResp")
export class ActivateVipResp extends protobuf.Message<IActivateVipResp> {
    constructor(properties: Properties<IActivateVipResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.expiredAt) { this.expiredAt = properties.expiredAt }
            if (properties.hour) { this.hour = properties.hour }
        }
	}
    @protobuf.Field.d(1, tss_hall_Code, "optional", tss_hall_Code.CODE_SUCCEED)
    public code?: tss_hall_Code|null = tss_hall_Code.CODE_SUCCEED
    @protobuf.Field.d(2, "int64", "optional", 0)
    public expiredAt?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public hour?: number|null = 0
}
export interface IActivatePremiumCardReq {
    propID?: number|null
    expireAt?: number|null
    uid?: number|null
}
@protobuf.Type.d("tss_hall_prop_v4_ActivatePremiumCardReq")
export class ActivatePremiumCardReq extends protobuf.Message<IActivatePremiumCardReq> {
    constructor(properties: Properties<IActivatePremiumCardReq>) {
        super(properties);
        if (properties) {
            if (properties.propID) { this.propID = properties.propID }
            if (properties.expireAt) { this.expireAt = properties.expireAt }
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public propID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public expireAt?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IActivatePremiumCardResp {
    code?: tss_hall_Code|null
    expiredAt?: number|null
    hour?: number|null
}
@protobuf.Type.d("tss_hall_prop_v4_ActivatePremiumCardResp")
export class ActivatePremiumCardResp extends protobuf.Message<IActivatePremiumCardResp> {
    constructor(properties: Properties<IActivatePremiumCardResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.expiredAt) { this.expiredAt = properties.expiredAt }
            if (properties.hour) { this.hour = properties.hour }
        }
	}
    @protobuf.Field.d(1, tss_hall_Code, "optional", tss_hall_Code.CODE_SUCCEED)
    public code?: tss_hall_Code|null = tss_hall_Code.CODE_SUCCEED
    @protobuf.Field.d(2, "int64", "optional", 0)
    public expiredAt?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public hour?: number|null = 0
}
export interface IActivateSteakWinningProtectCardReq {
    propID?: number|null
    expireAt?: number|null
    uid?: number|null
    gameId?: string|null
}
@protobuf.Type.d("tss_hall_prop_v4_ActivateSteakWinningProtectCardReq")
export class ActivateSteakWinningProtectCardReq extends protobuf.Message<IActivateSteakWinningProtectCardReq> {
    constructor(properties: Properties<IActivateSteakWinningProtectCardReq>) {
        super(properties);
        if (properties) {
            if (properties.propID) { this.propID = properties.propID }
            if (properties.expireAt) { this.expireAt = properties.expireAt }
            if (properties.uid) { this.uid = properties.uid }
            if (properties.gameId) { this.gameId = properties.gameId }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public propID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public expireAt?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(4, "string", "optional", )
    public gameId?: string|null = ""
}
export interface IActivateSteakWinningProtectCardResp {
    code?: tss_hall_Code|null
}
@protobuf.Type.d("tss_hall_prop_v4_ActivateSteakWinningProtectCardResp")
export class ActivateSteakWinningProtectCardResp extends protobuf.Message<IActivateSteakWinningProtectCardResp> {
    constructor(properties: Properties<IActivateSteakWinningProtectCardResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
        }
	}
    @protobuf.Field.d(1, tss_hall_Code, "optional", tss_hall_Code.CODE_SUCCEED)
    public code?: tss_hall_Code|null = tss_hall_Code.CODE_SUCCEED
}
export interface IOpenGiftReq {
    id?: number|null
    expireAt?: number|null
    uid?: number|null
}
@protobuf.Type.d("tss_hall_prop_v4_OpenGiftReq")
export class OpenGiftReq extends protobuf.Message<IOpenGiftReq> {
    constructor(properties: Properties<IOpenGiftReq>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.expireAt) { this.expireAt = properties.expireAt }
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public id?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public expireAt?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IOpenGiftResp {
    code?: tss_hall_Code|null
    items?: tss_common_IAssetItem[]
}
@protobuf.Type.d("tss_hall_prop_v4_OpenGiftResp")
export class OpenGiftResp extends protobuf.Message<IOpenGiftResp> {
    constructor(properties: Properties<IOpenGiftResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.items) { this.items = []; properties.items.forEach((value, index)=>{this.items[index] = tss_common_AssetItem.create(properties.items[index]) as any})}
        }
	}
    @protobuf.Field.d(1, tss_hall_Code, "optional", tss_hall_Code.CODE_SUCCEED)
    public code?: tss_hall_Code|null = tss_hall_Code.CODE_SUCCEED
    @protobuf.Field.d(4, "tss_common_AssetItem", "repeated")
    public items?: tss_common_AssetItem[] = []
}
export interface IActivateUserBuffReq {
    propID?: number|null
    expireAt?: number|null
    uid?: number|null
    pType?: tss_common_PropType|null
}
@protobuf.Type.d("tss_hall_prop_v4_ActivateUserBuffReq")
export class ActivateUserBuffReq extends protobuf.Message<IActivateUserBuffReq> {
    constructor(properties: Properties<IActivateUserBuffReq>) {
        super(properties);
        if (properties) {
            if (properties.propID) { this.propID = properties.propID }
            if (properties.expireAt) { this.expireAt = properties.expireAt }
            if (properties.uid) { this.uid = properties.uid }
            if (properties.pType) { this.pType = properties.pType }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public propID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public expireAt?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(4, tss_common_PropType, "optional", tss_common_PropType.PropTypeUnknown)
    public pType?: tss_common_PropType|null = tss_common_PropType.PropTypeUnknown
}
export interface IActivateUserBuffResp {
    code?: tss_hall_Code|null
    markupRate?: number|null
}
@protobuf.Type.d("tss_hall_prop_v4_ActivateUserBuffResp")
export class ActivateUserBuffResp extends protobuf.Message<IActivateUserBuffResp> {
    constructor(properties: Properties<IActivateUserBuffResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.markupRate) { this.markupRate = properties.markupRate }
        }
	}
    @protobuf.Field.d(1, tss_hall_Code, "optional", tss_hall_Code.CODE_SUCCEED)
    public code?: tss_hall_Code|null = tss_hall_Code.CODE_SUCCEED
    @protobuf.Field.d(2, "int64", "optional", 0)
    public markupRate?: number|null = 0
}
export interface IIncUserIntimacyReq {
    uid?: number|null
    propID?: number|null
    propNum?: number|null
    withUid?: number|null
}
@protobuf.Type.d("tss_hall_prop_v4_IncUserIntimacyReq")
export class IncUserIntimacyReq extends protobuf.Message<IIncUserIntimacyReq> {
    constructor(properties: Properties<IIncUserIntimacyReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.propID) { this.propID = properties.propID }
            if (properties.propNum) { this.propNum = properties.propNum }
            if (properties.withUid) { this.withUid = properties.withUid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public propID?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public propNum?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public withUid?: number|null = 0
}
export interface IIncUserIntimacyResp {
    incIntimacy?: number|null
    curIntimacy?: number|null
}
@protobuf.Type.d("tss_hall_prop_v4_IncUserIntimacyResp")
export class IncUserIntimacyResp extends protobuf.Message<IIncUserIntimacyResp> {
    constructor(properties: Properties<IIncUserIntimacyResp>) {
        super(properties);
        if (properties) {
            if (properties.incIntimacy) { this.incIntimacy = properties.incIntimacy }
            if (properties.curIntimacy) { this.curIntimacy = properties.curIntimacy }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public incIntimacy?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public curIntimacy?: number|null = 0
}
export interface IBatchGetUserPropReq {
    uid?: number|null
    ids?: number[]
}
@protobuf.Type.d("tss_hall_prop_v4_BatchGetUserPropReq")
export class BatchGetUserPropReq extends protobuf.Message<IBatchGetUserPropReq> {
    constructor(properties: Properties<IBatchGetUserPropReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.ids) { this.ids = []; properties.ids.forEach((value, index)=>{this.ids[index] = properties.ids[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "repeated", [])
    public ids?: number[] = []
}
export interface IBatchGetUserGiftReq {
    uid?: number|null
    ids?: number[]
}
@protobuf.Type.d("tss_hall_prop_v4_BatchGetUserGiftReq")
export class BatchGetUserGiftReq extends protobuf.Message<IBatchGetUserGiftReq> {
    constructor(properties: Properties<IBatchGetUserGiftReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.ids) { this.ids = []; properties.ids.forEach((value, index)=>{this.ids[index] = properties.ids[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "repeated", [])
    public ids?: number[] = []
}
export interface IBatchGetUserPropResp {
    props?: IUserProp[]
}
@protobuf.Type.d("tss_hall_prop_v4_BatchGetUserPropResp")
export class BatchGetUserPropResp extends protobuf.Message<IBatchGetUserPropResp> {
    constructor(properties: Properties<IBatchGetUserPropResp>) {
        super(properties);
        if (properties) {
            if (properties.props) { this.props = []; properties.props.forEach((value, index)=>{this.props[index] = UserProp.create(properties.props[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_prop_v4_UserProp", "repeated")
    public props?: UserProp[] = []
}
export interface IBatchGetUserGiftResp {
    gifts?: IUserProp[]
}
@protobuf.Type.d("tss_hall_prop_v4_BatchGetUserGiftResp")
export class BatchGetUserGiftResp extends protobuf.Message<IBatchGetUserGiftResp> {
    constructor(properties: Properties<IBatchGetUserGiftResp>) {
        super(properties);
        if (properties) {
            if (properties.gifts) { this.gifts = []; properties.gifts.forEach((value, index)=>{this.gifts[index] = UserProp.create(properties.gifts[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_prop_v4_UserProp", "repeated")
    public gifts?: UserProp[] = []
}
export interface IBlock {
    propTypes?: tss_common_PropType[]
}
@protobuf.Type.d("tss_hall_prop_v4_Block")
export class Block extends protobuf.Message<IBlock> {
    constructor(properties: Properties<IBlock>) {
        super(properties);
        if (properties) {
            if (properties.propTypes) { this.propTypes = []; properties.propTypes.forEach((value, index)=>{this.propTypes[index] = properties.propTypes[index]})}
        }
	}
    @protobuf.Field.d(1, tss_common_PropType, "repeated", tss_common_PropType.PropTypeUnknown)
    public propTypes?: tss_common_PropType[] = []
}
export interface IListUserResReq {
    page?: number|null
    pageSize?: number|null
    uid?: number|null
    canSend?: boolean|null
    types?: tss_common_PropType[]
    queryTab?: QueryTab|null
}
@protobuf.Type.d("tss_hall_prop_v4_ListUserResReq")
export class ListUserResReq extends protobuf.Message<IListUserResReq> {
    constructor(properties: Properties<IListUserResReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.uid) { this.uid = properties.uid }
            if (properties.canSend) { this.canSend = properties.canSend }
            if (properties.types) { this.types = []; properties.types.forEach((value, index)=>{this.types[index] = properties.types[index]})}
            if (properties.queryTab) { this.queryTab = properties.queryTab }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(4, "bool", "optional", false)
    public canSend?: boolean|null = false
    @protobuf.Field.d(5, tss_common_PropType, "repeated", tss_common_PropType.PropTypeUnknown)
    public types?: tss_common_PropType[] = []
    @protobuf.Field.d(6, QueryTab, "optional", QueryTab.TabUnknown)
    public queryTab?: QueryTab|null = QueryTab.TabUnknown
}
export interface IListUserResV2Req {
    page?: number|null
    pageSize?: number|null
    uid?: number|null
    canSend?: boolean|null
    types?: tss_common_PropType[]
    queryTab?: QueryTab|null
}
@protobuf.Type.d("tss_hall_prop_v4_ListUserResV2Req")
export class ListUserResV2Req extends protobuf.Message<IListUserResV2Req> {
    constructor(properties: Properties<IListUserResV2Req>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.uid) { this.uid = properties.uid }
            if (properties.canSend) { this.canSend = properties.canSend }
            if (properties.types) { this.types = []; properties.types.forEach((value, index)=>{this.types[index] = properties.types[index]})}
            if (properties.queryTab) { this.queryTab = properties.queryTab }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(4, "bool", "optional", false)
    public canSend?: boolean|null = false
    @protobuf.Field.d(5, tss_common_PropType, "repeated", tss_common_PropType.PropTypeUnknown)
    public types?: tss_common_PropType[] = []
    @protobuf.Field.d(6, QueryTab, "optional", QueryTab.TabUnknown)
    public queryTab?: QueryTab|null = QueryTab.TabUnknown
}
export interface IExpandPropDetailsReq {
    uid?: number|null
    id?: number|null
    page?: number|null
    pageSize?: number|null
    propType?: tss_common_PropType|null
}
@protobuf.Type.d("tss_hall_prop_v4_ExpandPropDetailsReq")
export class ExpandPropDetailsReq extends protobuf.Message<IExpandPropDetailsReq> {
    constructor(properties: Properties<IExpandPropDetailsReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.id) { this.id = properties.id }
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.propType) { this.propType = properties.propType }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public id?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(5, tss_common_PropType, "optional", tss_common_PropType.PropTypeUnknown)
    public propType?: tss_common_PropType|null = tss_common_PropType.PropTypeUnknown
}
export interface ICMSListUserResReq {
    page?: number|null
    pageSize?: number|null
    uid?: number|null
}
@protobuf.Type.d("tss_hall_prop_v4_CMSListUserResReq")
export class CMSListUserResReq extends protobuf.Message<ICMSListUserResReq> {
    constructor(properties: Properties<ICMSListUserResReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IListUserResResp {
    props?: IUserProp[]
    totalSize?: number|null
    vouchers?: IUserProp[]
}
@protobuf.Type.d("tss_hall_prop_v4_ListUserResResp")
export class ListUserResResp extends protobuf.Message<IListUserResResp> {
    constructor(properties: Properties<IListUserResResp>) {
        super(properties);
        if (properties) {
            if (properties.props) { this.props = []; properties.props.forEach((value, index)=>{this.props[index] = UserProp.create(properties.props[index]) as any})}
            if (properties.totalSize) { this.totalSize = properties.totalSize }
            if (properties.vouchers) { this.vouchers = []; properties.vouchers.forEach((value, index)=>{this.vouchers[index] = UserProp.create(properties.vouchers[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_prop_v4_UserProp", "repeated")
    public props?: UserProp[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public totalSize?: number|null = 0
    @protobuf.Field.d(3, "tss_hall_prop_v4_UserProp", "repeated")
    public vouchers?: UserProp[] = []
}
export interface IListUserResV2Resp {
    props?: IUserProp[]
    totalSize?: number|null
}
@protobuf.Type.d("tss_hall_prop_v4_ListUserResV2Resp")
export class ListUserResV2Resp extends protobuf.Message<IListUserResV2Resp> {
    constructor(properties: Properties<IListUserResV2Resp>) {
        super(properties);
        if (properties) {
            if (properties.props) { this.props = []; properties.props.forEach((value, index)=>{this.props[index] = UserProp.create(properties.props[index]) as any})}
            if (properties.totalSize) { this.totalSize = properties.totalSize }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prop_v4_UserProp", "repeated")
    public props?: UserProp[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public totalSize?: number|null = 0
}
export interface IExpandPropDetailsResp {
    props?: IUserProp[]
    totalSize?: number|null
}
@protobuf.Type.d("tss_hall_prop_v4_ExpandPropDetailsResp")
export class ExpandPropDetailsResp extends protobuf.Message<IExpandPropDetailsResp> {
    constructor(properties: Properties<IExpandPropDetailsResp>) {
        super(properties);
        if (properties) {
            if (properties.props) { this.props = []; properties.props.forEach((value, index)=>{this.props[index] = UserProp.create(properties.props[index]) as any})}
            if (properties.totalSize) { this.totalSize = properties.totalSize }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prop_v4_UserProp", "repeated")
    public props?: UserProp[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public totalSize?: number|null = 0
}
export interface ICMSListUserResResp {
    props?: IUserProp[]
    totalSize?: number|null
}
@protobuf.Type.d("tss_hall_prop_v4_CMSListUserResResp")
export class CMSListUserResResp extends protobuf.Message<ICMSListUserResResp> {
    constructor(properties: Properties<ICMSListUserResResp>) {
        super(properties);
        if (properties) {
            if (properties.props) { this.props = []; properties.props.forEach((value, index)=>{this.props[index] = UserProp.create(properties.props[index]) as any})}
            if (properties.totalSize) { this.totalSize = properties.totalSize }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prop_v4_UserProp", "repeated")
    public props?: UserProp[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public totalSize?: number|null = 0
}
export interface IListUserMergedPropReq {
    uid?: number|null
    types?: tss_common_PropType[]
}
@protobuf.Type.d("tss_hall_prop_v4_ListUserMergedPropReq")
export class ListUserMergedPropReq extends protobuf.Message<IListUserMergedPropReq> {
    constructor(properties: Properties<IListUserMergedPropReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.types) { this.types = []; properties.types.forEach((value, index)=>{this.types[index] = properties.types[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, tss_common_PropType, "repeated", tss_common_PropType.PropTypeUnknown)
    public types?: tss_common_PropType[] = []
}
export interface IListUserMergedPropResp {
    props?: IUserProp[]
}
@protobuf.Type.d("tss_hall_prop_v4_ListUserMergedPropResp")
export class ListUserMergedPropResp extends protobuf.Message<IListUserMergedPropResp> {
    constructor(properties: Properties<IListUserMergedPropResp>) {
        super(properties);
        if (properties) {
            if (properties.props) { this.props = []; properties.props.forEach((value, index)=>{this.props[index] = UserProp.create(properties.props[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_prop_v4_UserProp", "repeated")
    public props?: UserProp[] = []
}
export interface IBatchGetUserMergedPropReq {
    uid?: number|null
    propIDs?: number[]
}
@protobuf.Type.d("tss_hall_prop_v4_BatchGetUserMergedPropReq")
export class BatchGetUserMergedPropReq extends protobuf.Message<IBatchGetUserMergedPropReq> {
    constructor(properties: Properties<IBatchGetUserMergedPropReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.propIDs) { this.propIDs = []; properties.propIDs.forEach((value, index)=>{this.propIDs[index] = properties.propIDs[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "repeated", [])
    public propIDs?: number[] = []
}
export interface IBatchGetUserMergedPropResp {
    props?: IUserProp[]
}
@protobuf.Type.d("tss_hall_prop_v4_BatchGetUserMergedPropResp")
export class BatchGetUserMergedPropResp extends protobuf.Message<IBatchGetUserMergedPropResp> {
    constructor(properties: Properties<IBatchGetUserMergedPropResp>) {
        super(properties);
        if (properties) {
            if (properties.props) { this.props = []; properties.props.forEach((value, index)=>{this.props[index] = UserProp.create(properties.props[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_prop_v4_UserProp", "repeated")
    public props?: UserProp[] = []
}
export interface ICountUserPropReq {
    uid?: number|null
    propID?: number|null
    categories?: tss_common_PropCategory[]
    types?: tss_common_PropType[]
    expireAtStart?: number|null
    expireAtEnd?: number|null
    block?: IBlock
}
@protobuf.Type.d("tss_hall_prop_v4_CountUserPropReq")
export class CountUserPropReq extends protobuf.Message<ICountUserPropReq> {
    constructor(properties: Properties<ICountUserPropReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.propID) { this.propID = properties.propID }
            if (properties.categories) { this.categories = []; properties.categories.forEach((value, index)=>{this.categories[index] = properties.categories[index]})}
            if (properties.types) { this.types = []; properties.types.forEach((value, index)=>{this.types[index] = properties.types[index]})}
            if (properties.expireAtStart) { this.expireAtStart = properties.expireAtStart }
            if (properties.expireAtEnd) { this.expireAtEnd = properties.expireAtEnd }
            if (properties.block) { this.block = Block.create(properties.block) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public propID?: number|null = 0
    @protobuf.Field.d(3, tss_common_PropCategory, "repeated", tss_common_PropCategory.PropCategoryUnknown)
    public categories?: tss_common_PropCategory[] = []
    @protobuf.Field.d(4, tss_common_PropType, "repeated", tss_common_PropType.PropTypeUnknown)
    public types?: tss_common_PropType[] = []
    @protobuf.Field.d(5, "int64", "optional", 0)
    public expireAtStart?: number|null = 0
    @protobuf.Field.d(6, "int64", "optional", 0)
    public expireAtEnd?: number|null = 0
    @protobuf.Field.d(7, "tss_hall_prop_v4_Block", "optional")
    public block?: Block|null
}
export interface ICountUserPropResp {
    totalSize?: number|null
}
@protobuf.Type.d("tss_hall_prop_v4_CountUserPropResp")
export class CountUserPropResp extends protobuf.Message<ICountUserPropResp> {
    constructor(properties: Properties<ICountUserPropResp>) {
        super(properties);
        if (properties) {
            if (properties.totalSize) { this.totalSize = properties.totalSize }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public totalSize?: number|null = 0
}
export interface ICountCurrentUserPropByPropTypeReq {
    uid?: number|null
    types?: tss_common_PropType[]
}
@protobuf.Type.d("tss_hall_prop_v4_CountCurrentUserPropByPropTypeReq")
export class CountCurrentUserPropByPropTypeReq extends protobuf.Message<ICountCurrentUserPropByPropTypeReq> {
    constructor(properties: Properties<ICountCurrentUserPropByPropTypeReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.types) { this.types = []; properties.types.forEach((value, index)=>{this.types[index] = properties.types[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, tss_common_PropType, "repeated", tss_common_PropType.PropTypeUnknown)
    public types?: tss_common_PropType[] = []
}
export interface ICountCurrentUserPropByPropTypeResp {
    cntsMap?: { [k: string]: number|null }
}
@protobuf.Type.d("tss_hall_prop_v4_CountCurrentUserPropByPropTypeResp")
export class CountCurrentUserPropByPropTypeResp extends protobuf.Message<ICountCurrentUserPropByPropTypeResp> {
    constructor(properties: Properties<ICountCurrentUserPropByPropTypeResp>) {
        super(properties);
        if (properties) {
            if (properties.cntsMap) { this.cntsMap = properties.cntsMap }
        }
	}
    @protobuf.MapField.d(1, "int32", "int64")
    public cntsMap?: { [k: string]: number|null } = {}
}
export interface ICountCurrentUserPropByCategoryReq {
    uid?: number|null
    categories?: tss_common_PropCategory[]
    types?: tss_common_PropType[]
}
@protobuf.Type.d("tss_hall_prop_v4_CountCurrentUserPropByCategoryReq")
export class CountCurrentUserPropByCategoryReq extends protobuf.Message<ICountCurrentUserPropByCategoryReq> {
    constructor(properties: Properties<ICountCurrentUserPropByCategoryReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.categories) { this.categories = []; properties.categories.forEach((value, index)=>{this.categories[index] = properties.categories[index]})}
            if (properties.types) { this.types = []; properties.types.forEach((value, index)=>{this.types[index] = properties.types[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, tss_common_PropCategory, "repeated", tss_common_PropCategory.PropCategoryUnknown)
    public categories?: tss_common_PropCategory[] = []
    @protobuf.Field.d(3, tss_common_PropType, "repeated", tss_common_PropType.PropTypeUnknown)
    public types?: tss_common_PropType[] = []
}
export interface ICategoryItemCnt {
    category?: tss_common_PropCategory|null
    type?: tss_common_PropType|null
    cnt?: number|null
}
@protobuf.Type.d("tss_hall_prop_v4_CategoryItemCnt")
export class CategoryItemCnt extends protobuf.Message<ICategoryItemCnt> {
    constructor(properties: Properties<ICategoryItemCnt>) {
        super(properties);
        if (properties) {
            if (properties.category) { this.category = properties.category }
            if (properties.type) { this.type = properties.type }
            if (properties.cnt) { this.cnt = properties.cnt }
        }
	}
    @protobuf.Field.d(1, tss_common_PropCategory, "optional", tss_common_PropCategory.PropCategoryUnknown)
    public category?: tss_common_PropCategory|null = tss_common_PropCategory.PropCategoryUnknown
    @protobuf.Field.d(2, tss_common_PropType, "optional", tss_common_PropType.PropTypeUnknown)
    public type?: tss_common_PropType|null = tss_common_PropType.PropTypeUnknown
    @protobuf.Field.d(3, "int64", "optional", 0)
    public cnt?: number|null = 0
}
export interface ICountCurrentUserPropByCategoryResp {
    itemCnts?: ICategoryItemCnt[]
}
@protobuf.Type.d("tss_hall_prop_v4_CountCurrentUserPropByCategoryResp")
export class CountCurrentUserPropByCategoryResp extends protobuf.Message<ICountCurrentUserPropByCategoryResp> {
    constructor(properties: Properties<ICountCurrentUserPropByCategoryResp>) {
        super(properties);
        if (properties) {
            if (properties.itemCnts) { this.itemCnts = []; properties.itemCnts.forEach((value, index)=>{this.itemCnts[index] = CategoryItemCnt.create(properties.itemCnts[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_prop_v4_CategoryItemCnt", "repeated")
    public itemCnts?: CategoryItemCnt[] = []
}
export interface ICleanUpUserPropReq {
    uid?: number|null
    propID?: number|null
    categories?: tss_common_PropCategory[]
    types?: tss_common_PropType[]
    expireAt?: number|null
    option?: CleanUpOption|null
}
@protobuf.Type.d("tss_hall_prop_v4_CleanUpUserPropReq")
export class CleanUpUserPropReq extends protobuf.Message<ICleanUpUserPropReq> {
    constructor(properties: Properties<ICleanUpUserPropReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.propID) { this.propID = properties.propID }
            if (properties.categories) { this.categories = []; properties.categories.forEach((value, index)=>{this.categories[index] = properties.categories[index]})}
            if (properties.types) { this.types = []; properties.types.forEach((value, index)=>{this.types[index] = properties.types[index]})}
            if (properties.expireAt) { this.expireAt = properties.expireAt }
            if (properties.option) { this.option = properties.option }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public propID?: number|null = 0
    @protobuf.Field.d(3, tss_common_PropCategory, "repeated", tss_common_PropCategory.PropCategoryUnknown)
    public categories?: tss_common_PropCategory[] = []
    @protobuf.Field.d(4, tss_common_PropType, "repeated", tss_common_PropType.PropTypeUnknown)
    public types?: tss_common_PropType[] = []
    @protobuf.Field.d(5, "int64", "optional", 0)
    public expireAt?: number|null = 0
    @protobuf.Field.d(6, CleanUpOption, "optional", CleanUpOption.CleanUpOptDiscard)
    public option?: CleanUpOption|null = CleanUpOption.CleanUpOptDiscard
}
export interface ICleanUpUserPropV2Req {
    uid?: number|null
    propID?: number|null
    categories?: tss_common_PropCategory[]
    types?: tss_common_PropType[]
    expireAt?: number|null
    option?: CleanUpOption|null
    num?: number|null
}
@protobuf.Type.d("tss_hall_prop_v4_CleanUpUserPropV2Req")
export class CleanUpUserPropV2Req extends protobuf.Message<ICleanUpUserPropV2Req> {
    constructor(properties: Properties<ICleanUpUserPropV2Req>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.propID) { this.propID = properties.propID }
            if (properties.categories) { this.categories = []; properties.categories.forEach((value, index)=>{this.categories[index] = properties.categories[index]})}
            if (properties.types) { this.types = []; properties.types.forEach((value, index)=>{this.types[index] = properties.types[index]})}
            if (properties.expireAt) { this.expireAt = properties.expireAt }
            if (properties.option) { this.option = properties.option }
            if (properties.num) { this.num = properties.num }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public propID?: number|null = 0
    @protobuf.Field.d(3, tss_common_PropCategory, "repeated", tss_common_PropCategory.PropCategoryUnknown)
    public categories?: tss_common_PropCategory[] = []
    @protobuf.Field.d(4, tss_common_PropType, "repeated", tss_common_PropType.PropTypeUnknown)
    public types?: tss_common_PropType[] = []
    @protobuf.Field.d(5, "int64", "optional", 0)
    public expireAt?: number|null = 0
    @protobuf.Field.d(6, CleanUpOption, "optional", CleanUpOption.CleanUpOptDiscard)
    public option?: CleanUpOption|null = CleanUpOption.CleanUpOptDiscard
    @protobuf.Field.d(7, "int64", "optional", 0)
    public num?: number|null = 0
}
export interface ICleanUpUserPropV2Resp {
    compensate?: tss_common_IAssetItem[]
}
@protobuf.Type.d("tss_hall_prop_v4_CleanUpUserPropV2Resp")
export class CleanUpUserPropV2Resp extends protobuf.Message<ICleanUpUserPropV2Resp> {
    constructor(properties: Properties<ICleanUpUserPropV2Resp>) {
        super(properties);
        if (properties) {
            if (properties.compensate) { this.compensate = []; properties.compensate.forEach((value, index)=>{this.compensate[index] = tss_common_AssetItem.create(properties.compensate[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_common_AssetItem", "repeated")
    public compensate?: tss_common_AssetItem[] = []
}
export interface ICleanUpUserPropResp {
}
@protobuf.Type.d("tss_hall_prop_v4_CleanUpUserPropResp")
export class CleanUpUserPropResp extends protobuf.Message<ICleanUpUserPropResp> {
    constructor(properties: Properties<ICleanUpUserPropResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IUserPropLog {
    uid?: number|null
    propID?: number|null
    balance?: number|null
    num?: number|null
    batchId?: string|null
    sign?: tss_common_Sign|null
    createAt?: number|null
    way?: tss_common_Way|null
    grantType?: GrantType|null
    expireAt?: number|null
    extra?: string|null
    operator?: string|null
    propName?: string|null
    urf?: tss_common_UserRobotFlag|null
}
@protobuf.Type.d("tss_hall_prop_v4_UserPropLog")
export class UserPropLog extends protobuf.Message<IUserPropLog> {
    constructor(properties: Properties<IUserPropLog>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.propID) { this.propID = properties.propID }
            if (properties.balance) { this.balance = properties.balance }
            if (properties.num) { this.num = properties.num }
            if (properties.batchId) { this.batchId = properties.batchId }
            if (properties.sign) { this.sign = properties.sign }
            if (properties.createAt) { this.createAt = properties.createAt }
            if (properties.way) { this.way = properties.way }
            if (properties.grantType) { this.grantType = properties.grantType }
            if (properties.expireAt) { this.expireAt = properties.expireAt }
            if (properties.extra) { this.extra = properties.extra }
            if (properties.operator) { this.operator = properties.operator }
            if (properties.propName) { this.propName = properties.propName }
            if (properties.urf) { this.urf = properties.urf }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public propID?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public balance?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public num?: number|null = 0
    @protobuf.Field.d(5, "string", "optional", )
    public batchId?: string|null = ""
    @protobuf.Field.d(6, tss_common_Sign, "optional", tss_common_Sign.SignUnknown)
    public sign?: tss_common_Sign|null = tss_common_Sign.SignUnknown
    @protobuf.Field.d(7, "int64", "optional", 0)
    public createAt?: number|null = 0
    @protobuf.Field.d(8, tss_common_Way, "optional", tss_common_Way.WayNone)
    public way?: tss_common_Way|null = tss_common_Way.WayNone
    @protobuf.Field.d(9, GrantType, "optional", GrantType.GrantTypeDirectly)
    public grantType?: GrantType|null = GrantType.GrantTypeDirectly
    @protobuf.Field.d(10, "int64", "optional", 0)
    public expireAt?: number|null = 0
    @protobuf.Field.d(11, "string", "optional", )
    public extra?: string|null = ""
    @protobuf.Field.d(12, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(13, "string", "optional", )
    public propName?: string|null = ""
    @protobuf.Field.d(14, tss_common_UserRobotFlag, "optional", tss_common_UserRobotFlag.UserRobotFlagUnknown)
    public urf?: tss_common_UserRobotFlag|null = tss_common_UserRobotFlag.UserRobotFlagUnknown
}
export interface IUserGiftLog {
    uid?: number|null
    giftID?: number|null
    balance?: number|null
    num?: number|null
    batchId?: string|null
    sign?: tss_common_Sign|null
    createAt?: number|null
    way?: tss_common_Way|null
    grantType?: GrantType|null
    expireAt?: number|null
    extra?: string|null
    operator?: string|null
    giftName?: string|null
    items?: tss_common_IAssetItem[]
    urf?: tss_common_UserRobotFlag|null
}
@protobuf.Type.d("tss_hall_prop_v4_UserGiftLog")
export class UserGiftLog extends protobuf.Message<IUserGiftLog> {
    constructor(properties: Properties<IUserGiftLog>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.giftID) { this.giftID = properties.giftID }
            if (properties.balance) { this.balance = properties.balance }
            if (properties.num) { this.num = properties.num }
            if (properties.batchId) { this.batchId = properties.batchId }
            if (properties.sign) { this.sign = properties.sign }
            if (properties.createAt) { this.createAt = properties.createAt }
            if (properties.way) { this.way = properties.way }
            if (properties.grantType) { this.grantType = properties.grantType }
            if (properties.expireAt) { this.expireAt = properties.expireAt }
            if (properties.extra) { this.extra = properties.extra }
            if (properties.operator) { this.operator = properties.operator }
            if (properties.giftName) { this.giftName = properties.giftName }
            if (properties.items) { this.items = []; properties.items.forEach((value, index)=>{this.items[index] = tss_common_AssetItem.create(properties.items[index]) as any})}
            if (properties.urf) { this.urf = properties.urf }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public giftID?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public balance?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public num?: number|null = 0
    @protobuf.Field.d(5, "string", "optional", )
    public batchId?: string|null = ""
    @protobuf.Field.d(6, tss_common_Sign, "optional", tss_common_Sign.SignUnknown)
    public sign?: tss_common_Sign|null = tss_common_Sign.SignUnknown
    @protobuf.Field.d(7, "int64", "optional", 0)
    public createAt?: number|null = 0
    @protobuf.Field.d(8, tss_common_Way, "optional", tss_common_Way.WayNone)
    public way?: tss_common_Way|null = tss_common_Way.WayNone
    @protobuf.Field.d(9, GrantType, "optional", GrantType.GrantTypeDirectly)
    public grantType?: GrantType|null = GrantType.GrantTypeDirectly
    @protobuf.Field.d(10, "int64", "optional", 0)
    public expireAt?: number|null = 0
    @protobuf.Field.d(11, "string", "optional", )
    public extra?: string|null = ""
    @protobuf.Field.d(12, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(13, "string", "optional", )
    public giftName?: string|null = ""
    @protobuf.Field.d(14, "tss_common_AssetItem", "repeated")
    public items?: tss_common_AssetItem[] = []
    @protobuf.Field.d(15, tss_common_UserRobotFlag, "optional", tss_common_UserRobotFlag.UserRobotFlagUnknown)
    public urf?: tss_common_UserRobotFlag|null = tss_common_UserRobotFlag.UserRobotFlagUnknown
}
export interface IListUserPropLogReq {
    page?: number|null
    pageSize?: number|null
    uid?: number|null
    beginAt?: number|null
    endAt?: number|null
    propID?: number|null
    way?: tss_common_Way|null
}
@protobuf.Type.d("tss_hall_prop_v4_ListUserPropLogReq")
export class ListUserPropLogReq extends protobuf.Message<IListUserPropLogReq> {
    constructor(properties: Properties<IListUserPropLogReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.uid) { this.uid = properties.uid }
            if (properties.beginAt) { this.beginAt = properties.beginAt }
            if (properties.endAt) { this.endAt = properties.endAt }
            if (properties.propID) { this.propID = properties.propID }
            if (properties.way) { this.way = properties.way }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public beginAt?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public endAt?: number|null = 0
    @protobuf.Field.d(6, "int64", "optional", 0)
    public propID?: number|null = 0
    @protobuf.Field.d(7, tss_common_Way, "optional", tss_common_Way.WayNone)
    public way?: tss_common_Way|null = tss_common_Way.WayNone
}
export interface IListUserPropLogResp {
    logs?: IUserPropLog[]
    totalSize?: number|null
}
@protobuf.Type.d("tss_hall_prop_v4_ListUserPropLogResp")
export class ListUserPropLogResp extends protobuf.Message<IListUserPropLogResp> {
    constructor(properties: Properties<IListUserPropLogResp>) {
        super(properties);
        if (properties) {
            if (properties.logs) { this.logs = []; properties.logs.forEach((value, index)=>{this.logs[index] = UserPropLog.create(properties.logs[index]) as any})}
            if (properties.totalSize) { this.totalSize = properties.totalSize }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prop_v4_UserPropLog", "repeated")
    public logs?: UserPropLog[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public totalSize?: number|null = 0
}
export interface IGetStatsReq {
    ResID?: number|null
    type?: ResType|null
}
@protobuf.Type.d("tss_hall_prop_v4_GetStatsReq")
export class GetStatsReq extends protobuf.Message<IGetStatsReq> {
    constructor(properties: Properties<IGetStatsReq>) {
        super(properties);
        if (properties) {
            if (properties.ResID) { this.ResID = properties.ResID }
            if (properties.type) { this.type = properties.type }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public ResID?: number|null = 0
    @protobuf.Field.d(2, ResType, "optional", ResType.ResTypeUnknown)
    public type?: ResType|null = ResType.ResTypeUnknown
}
export interface IStats {
    ResID?: number|null
    acceptNum?: number|null
    expiredNum?: number|null
    usedNum?: number|null
}
@protobuf.Type.d("tss_hall_prop_v4_Stats")
export class Stats extends protobuf.Message<IStats> {
    constructor(properties: Properties<IStats>) {
        super(properties);
        if (properties) {
            if (properties.ResID) { this.ResID = properties.ResID }
            if (properties.acceptNum) { this.acceptNum = properties.acceptNum }
            if (properties.expiredNum) { this.expiredNum = properties.expiredNum }
            if (properties.usedNum) { this.usedNum = properties.usedNum }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public ResID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public acceptNum?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public expiredNum?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public usedNum?: number|null = 0
}
export interface IGetStatsResp {
    stats?: IStats
}
@protobuf.Type.d("tss_hall_prop_v4_GetStatsResp")
export class GetStatsResp extends protobuf.Message<IGetStatsResp> {
    constructor(properties: Properties<IGetStatsResp>) {
        super(properties);
        if (properties) {
            if (properties.stats) { this.stats = Stats.create(properties.stats) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prop_v4_Stats", "optional")
    public stats?: Stats|null
}
export interface IBadge {
    amount?: number|null
    key?: string|null
}
@protobuf.Type.d("tss_hall_prop_v4_Badge")
export class Badge extends protobuf.Message<IBadge> {
    constructor(properties: Properties<IBadge>) {
        super(properties);
        if (properties) {
            if (properties.amount) { this.amount = properties.amount }
            if (properties.key) { this.key = properties.key }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public amount?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public key?: string|null = ""
}
export interface IGetUserBadgeReq {
    uid?: number|null
}
@protobuf.Type.d("tss_hall_prop_v4_GetUserBadgeReq")
export class GetUserBadgeReq extends protobuf.Message<IGetUserBadgeReq> {
    constructor(properties: Properties<IGetUserBadgeReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IListUserBadgeReq {
    uid?: number|null
}
@protobuf.Type.d("tss_hall_prop_v4_ListUserBadgeReq")
export class ListUserBadgeReq extends protobuf.Message<IListUserBadgeReq> {
    constructor(properties: Properties<IListUserBadgeReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IGetUserBadgeResp {
    badge?: IBadge
}
@protobuf.Type.d("tss_hall_prop_v4_GetUserBadgeResp")
export class GetUserBadgeResp extends protobuf.Message<IGetUserBadgeResp> {
    constructor(properties: Properties<IGetUserBadgeResp>) {
        super(properties);
        if (properties) {
            if (properties.badge) { this.badge = Badge.create(properties.badge) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prop_v4_Badge", "optional")
    public badge?: Badge|null
}
export interface IListUserBadgeResp {
    badges?: IBadge[]
}
@protobuf.Type.d("tss_hall_prop_v4_ListUserBadgeResp")
export class ListUserBadgeResp extends protobuf.Message<IListUserBadgeResp> {
    constructor(properties: Properties<IListUserBadgeResp>) {
        super(properties);
        if (properties) {
            if (properties.badges) { this.badges = []; properties.badges.forEach((value, index)=>{this.badges[index] = Badge.create(properties.badges[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_prop_v4_Badge", "repeated")
    public badges?: Badge[] = []
}
export interface ICleanUpUserBadgeReq {
    uid?: number|null
    badgeKey?: string|null
}
@protobuf.Type.d("tss_hall_prop_v4_CleanUpUserBadgeReq")
export class CleanUpUserBadgeReq extends protobuf.Message<ICleanUpUserBadgeReq> {
    constructor(properties: Properties<ICleanUpUserBadgeReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.badgeKey) { this.badgeKey = properties.badgeKey }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public badgeKey?: string|null = ""
}
export interface ICleanUpUserBadgeResp {
    badge?: IBadge
}
@protobuf.Type.d("tss_hall_prop_v4_CleanUpUserBadgeResp")
export class CleanUpUserBadgeResp extends protobuf.Message<ICleanUpUserBadgeResp> {
    constructor(properties: Properties<ICleanUpUserBadgeResp>) {
        super(properties);
        if (properties) {
            if (properties.badge) { this.badge = Badge.create(properties.badge) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prop_v4_Badge", "optional")
    public badge?: Badge|null
}
export interface ICheckUserPropExpiredReq {
    uid?: number|null
    categories?: tss_common_PropCategory[]
    types?: tss_common_PropType[]
    block?: IBlock
}
@protobuf.Type.d("tss_hall_prop_v4_CheckUserPropExpiredReq")
export class CheckUserPropExpiredReq extends protobuf.Message<ICheckUserPropExpiredReq> {
    constructor(properties: Properties<ICheckUserPropExpiredReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.categories) { this.categories = []; properties.categories.forEach((value, index)=>{this.categories[index] = properties.categories[index]})}
            if (properties.types) { this.types = []; properties.types.forEach((value, index)=>{this.types[index] = properties.types[index]})}
            if (properties.block) { this.block = Block.create(properties.block) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, tss_common_PropCategory, "repeated", tss_common_PropCategory.PropCategoryUnknown)
    public categories?: tss_common_PropCategory[] = []
    @protobuf.Field.d(3, tss_common_PropType, "repeated", tss_common_PropType.PropTypeUnknown)
    public types?: tss_common_PropType[] = []
    @protobuf.Field.d(4, "tss_hall_prop_v4_Block", "optional")
    public block?: Block|null
}
export interface ICheckUserPropExpiredResp {
    hasExpired?: boolean|null
}
@protobuf.Type.d("tss_hall_prop_v4_CheckUserPropExpiredResp")
export class CheckUserPropExpiredResp extends protobuf.Message<ICheckUserPropExpiredResp> {
    constructor(properties: Properties<ICheckUserPropExpiredResp>) {
        super(properties);
        if (properties) {
            if (properties.hasExpired) { this.hasExpired = properties.hasExpired }
        }
	}
    @protobuf.Field.d(1, "bool", "optional", false)
    public hasExpired?: boolean|null = false
}
export interface ISaveGiftReq {
    gift?: IGift
}
@protobuf.Type.d("tss_hall_prop_v4_SaveGiftReq")
export class SaveGiftReq extends protobuf.Message<ISaveGiftReq> {
    constructor(properties: Properties<ISaveGiftReq>) {
        super(properties);
        if (properties) {
            if (properties.gift) { this.gift = Gift.create(properties.gift) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prop_v4_Gift", "optional")
    public gift?: Gift|null
}
export interface ISaveGiftResp {
    gift?: IGift
}
@protobuf.Type.d("tss_hall_prop_v4_SaveGiftResp")
export class SaveGiftResp extends protobuf.Message<ISaveGiftResp> {
    constructor(properties: Properties<ISaveGiftResp>) {
        super(properties);
        if (properties) {
            if (properties.gift) { this.gift = Gift.create(properties.gift) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prop_v4_Gift", "optional")
    public gift?: Gift|null
}
export interface IListGiftReq {
    page?: number|null
    pageSize?: number|null
    state?: State|null
    keyword?: string|null
    ids?: number[]
}
@protobuf.Type.d("tss_hall_prop_v4_ListGiftReq")
export class ListGiftReq extends protobuf.Message<IListGiftReq> {
    constructor(properties: Properties<IListGiftReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.state) { this.state = properties.state }
            if (properties.keyword) { this.keyword = properties.keyword }
            if (properties.ids) { this.ids = []; properties.ids.forEach((value, index)=>{this.ids[index] = properties.ids[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(3, State, "optional", State.PropStateUnknown)
    public state?: State|null = State.PropStateUnknown
    @protobuf.Field.d(4, "string", "optional", )
    public keyword?: string|null = ""
    @protobuf.Field.d(5, "int64", "repeated", [])
    public ids?: number[] = []
}
export interface IListGiftResp {
    gifts?: IGift[]
    total?: number|null
}
@protobuf.Type.d("tss_hall_prop_v4_ListGiftResp")
export class ListGiftResp extends protobuf.Message<IListGiftResp> {
    constructor(properties: Properties<IListGiftResp>) {
        super(properties);
        if (properties) {
            if (properties.gifts) { this.gifts = []; properties.gifts.forEach((value, index)=>{this.gifts[index] = Gift.create(properties.gifts[index]) as any})}
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prop_v4_Gift", "repeated")
    public gifts?: Gift[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public total?: number|null = 0
}
export interface IGetGiftReq {
    id?: number|null
}
@protobuf.Type.d("tss_hall_prop_v4_GetGiftReq")
export class GetGiftReq extends protobuf.Message<IGetGiftReq> {
    constructor(properties: Properties<IGetGiftReq>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public id?: number|null = 0
}
export interface IGetGiftResp {
    gift?: IGift
}
@protobuf.Type.d("tss_hall_prop_v4_GetGiftResp")
export class GetGiftResp extends protobuf.Message<IGetGiftResp> {
    constructor(properties: Properties<IGetGiftResp>) {
        super(properties);
        if (properties) {
            if (properties.gift) { this.gift = Gift.create(properties.gift) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prop_v4_Gift", "optional")
    public gift?: Gift|null
}
export interface IIncUserGiftReq {
    change?: IUserChange
}
@protobuf.Type.d("tss_hall_prop_v4_IncUserGiftReq")
export class IncUserGiftReq extends protobuf.Message<IIncUserGiftReq> {
    constructor(properties: Properties<IIncUserGiftReq>) {
        super(properties);
        if (properties) {
            if (properties.change) { this.change = UserChange.create(properties.change) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prop_v4_UserChange", "optional")
    public change?: UserChange|null
}
export interface IIncUserGiftResp {
    assets?: tss_hall_common_IDynamicAssetItems[]
}
@protobuf.Type.d("tss_hall_prop_v4_IncUserGiftResp")
export class IncUserGiftResp extends protobuf.Message<IIncUserGiftResp> {
    constructor(properties: Properties<IIncUserGiftResp>) {
        super(properties);
        if (properties) {
            if (properties.assets) { this.assets = []; properties.assets.forEach((value, index)=>{this.assets[index] = tss_hall_common_DynamicAssetItems.create(properties.assets[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_common_DynamicAssetItems", "repeated")
    public assets?: tss_hall_common_DynamicAssetItems[] = []
}
export interface IDecUserGiftReq {
    change?: IUserChange
}
@protobuf.Type.d("tss_hall_prop_v4_DecUserGiftReq")
export class DecUserGiftReq extends protobuf.Message<IDecUserGiftReq> {
    constructor(properties: Properties<IDecUserGiftReq>) {
        super(properties);
        if (properties) {
            if (properties.change) { this.change = UserChange.create(properties.change) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prop_v4_UserChange", "optional")
    public change?: UserChange|null
}
export interface IDecUserGiftResp {
    code?: tss_hall_Code|null
    batchID?: string|null
    uid?: number|null
}
@protobuf.Type.d("tss_hall_prop_v4_DecUserGiftResp")
export class DecUserGiftResp extends protobuf.Message<IDecUserGiftResp> {
    constructor(properties: Properties<IDecUserGiftResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.batchID) { this.batchID = properties.batchID }
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, tss_hall_Code, "optional", tss_hall_Code.CODE_SUCCEED)
    public code?: tss_hall_Code|null = tss_hall_Code.CODE_SUCCEED
    @protobuf.Field.d(2, "string", "optional", )
    public batchID?: string|null = ""
    @protobuf.Field.d(3, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IRefundUserGiftReq {
    uid?: number|null
    batchID?: string|null
}
@protobuf.Type.d("tss_hall_prop_v4_RefundUserGiftReq")
export class RefundUserGiftReq extends protobuf.Message<IRefundUserGiftReq> {
    constructor(properties: Properties<IRefundUserGiftReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.batchID) { this.batchID = properties.batchID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public batchID?: string|null = ""
}
export interface IRefundUserGiftResp {
}
@protobuf.Type.d("tss_hall_prop_v4_RefundUserGiftResp")
export class RefundUserGiftResp extends protobuf.Message<IRefundUserGiftResp> {
    constructor(properties: Properties<IRefundUserGiftResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface ICategoryItem {
    ID?: number|null
    name?: string|null
}
@protobuf.Type.d("tss_hall_prop_v4_CategoryItem")
export class CategoryItem extends protobuf.Message<ICategoryItem> {
    constructor(properties: Properties<ICategoryItem>) {
        super(properties);
        if (properties) {
            if (properties.ID) { this.ID = properties.ID }
            if (properties.name) { this.name = properties.name }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public ID?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public name?: string|null = ""
}
export interface IListPropCategoryResp {
    categories?: ICategoryItem[]
}
@protobuf.Type.d("tss_hall_prop_v4_ListPropCategoryResp")
export class ListPropCategoryResp extends protobuf.Message<IListPropCategoryResp> {
    constructor(properties: Properties<IListPropCategoryResp>) {
        super(properties);
        if (properties) {
            if (properties.categories) { this.categories = []; properties.categories.forEach((value, index)=>{this.categories[index] = CategoryItem.create(properties.categories[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_prop_v4_CategoryItem", "repeated")
    public categories?: CategoryItem[] = []
}
export interface IListPropTypeReq {
    categoryID?: number|null
}
@protobuf.Type.d("tss_hall_prop_v4_ListPropTypeReq")
export class ListPropTypeReq extends protobuf.Message<IListPropTypeReq> {
    constructor(properties: Properties<IListPropTypeReq>) {
        super(properties);
        if (properties) {
            if (properties.categoryID) { this.categoryID = properties.categoryID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public categoryID?: number|null = 0
}
export interface IPropTypeItem {
    ID?: number|null
    name?: string|null
}
@protobuf.Type.d("tss_hall_prop_v4_PropTypeItem")
export class PropTypeItem extends protobuf.Message<IPropTypeItem> {
    constructor(properties: Properties<IPropTypeItem>) {
        super(properties);
        if (properties) {
            if (properties.ID) { this.ID = properties.ID }
            if (properties.name) { this.name = properties.name }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public ID?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public name?: string|null = ""
}
export interface IListPropTypeResp {
    types?: IPropTypeItem[]
}
@protobuf.Type.d("tss_hall_prop_v4_ListPropTypeResp")
export class ListPropTypeResp extends protobuf.Message<IListPropTypeResp> {
    constructor(properties: Properties<IListPropTypeResp>) {
        super(properties);
        if (properties) {
            if (properties.types) { this.types = []; properties.types.forEach((value, index)=>{this.types[index] = PropTypeItem.create(properties.types[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_prop_v4_PropTypeItem", "repeated")
    public types?: PropTypeItem[] = []
}
export interface IListUserGiftLogReq {
    page?: number|null
    pageSize?: number|null
    uid?: number|null
    beginAt?: number|null
    endAt?: number|null
    giftID?: number|null
}
@protobuf.Type.d("tss_hall_prop_v4_ListUserGiftLogReq")
export class ListUserGiftLogReq extends protobuf.Message<IListUserGiftLogReq> {
    constructor(properties: Properties<IListUserGiftLogReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.uid) { this.uid = properties.uid }
            if (properties.beginAt) { this.beginAt = properties.beginAt }
            if (properties.endAt) { this.endAt = properties.endAt }
            if (properties.giftID) { this.giftID = properties.giftID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public beginAt?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public endAt?: number|null = 0
    @protobuf.Field.d(6, "int64", "optional", 0)
    public giftID?: number|null = 0
}
export interface IListUserGiftLogResp {
    logs?: IUserGiftLog[]
    totalSize?: number|null
}
@protobuf.Type.d("tss_hall_prop_v4_ListUserGiftLogResp")
export class ListUserGiftLogResp extends protobuf.Message<IListUserGiftLogResp> {
    constructor(properties: Properties<IListUserGiftLogResp>) {
        super(properties);
        if (properties) {
            if (properties.logs) { this.logs = []; properties.logs.forEach((value, index)=>{this.logs[index] = UserGiftLog.create(properties.logs[index]) as any})}
            if (properties.totalSize) { this.totalSize = properties.totalSize }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prop_v4_UserGiftLog", "repeated")
    public logs?: UserGiftLog[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public totalSize?: number|null = 0
}
export interface IHasExpiredResReq {
    uid?: number|null
}
@protobuf.Type.d("tss_hall_prop_v4_HasExpiredResReq")
export class HasExpiredResReq extends protobuf.Message<IHasExpiredResReq> {
    constructor(properties: Properties<IHasExpiredResReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IHasExpiredResResp {
    hasPropExpired?: boolean|null
    hasGiftExpired?: boolean|null
}
@protobuf.Type.d("tss_hall_prop_v4_HasExpiredResResp")
export class HasExpiredResResp extends protobuf.Message<IHasExpiredResResp> {
    constructor(properties: Properties<IHasExpiredResResp>) {
        super(properties);
        if (properties) {
            if (properties.hasPropExpired) { this.hasPropExpired = properties.hasPropExpired }
            if (properties.hasGiftExpired) { this.hasGiftExpired = properties.hasGiftExpired }
        }
	}
    @protobuf.Field.d(1, "bool", "optional", false)
    public hasPropExpired?: boolean|null = false
    @protobuf.Field.d(2, "bool", "optional", false)
    public hasGiftExpired?: boolean|null = false
}
export interface ICleanUpUserGiftReq {
    uid?: number|null
    giftId?: number|null
    expireAt?: number|null
}
@protobuf.Type.d("tss_hall_prop_v4_CleanUpUserGiftReq")
export class CleanUpUserGiftReq extends protobuf.Message<ICleanUpUserGiftReq> {
    constructor(properties: Properties<ICleanUpUserGiftReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.giftId) { this.giftId = properties.giftId }
            if (properties.expireAt) { this.expireAt = properties.expireAt }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public giftId?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public expireAt?: number|null = 0
}
export interface ICleanUpUserGiftResp {
}
@protobuf.Type.d("tss_hall_prop_v4_CleanUpUserGiftResp")
export class CleanUpUserGiftResp extends protobuf.Message<ICleanUpUserGiftResp> {
    constructor(properties: Properties<ICleanUpUserGiftResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IBatchGetGiftReq {
    ids?: number[]
}
@protobuf.Type.d("tss_hall_prop_v4_BatchGetGiftReq")
export class BatchGetGiftReq extends protobuf.Message<IBatchGetGiftReq> {
    constructor(properties: Properties<IBatchGetGiftReq>) {
        super(properties);
        if (properties) {
            if (properties.ids) { this.ids = []; properties.ids.forEach((value, index)=>{this.ids[index] = properties.ids[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public ids?: number[] = []
}
export interface IBatchGetGiftResp {
    gifts?: IGift[]
}
@protobuf.Type.d("tss_hall_prop_v4_BatchGetGiftResp")
export class BatchGetGiftResp extends protobuf.Message<IBatchGetGiftResp> {
    constructor(properties: Properties<IBatchGetGiftResp>) {
        super(properties);
        if (properties) {
            if (properties.gifts) { this.gifts = []; properties.gifts.forEach((value, index)=>{this.gifts[index] = Gift.create(properties.gifts[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_prop_v4_Gift", "repeated")
    public gifts?: Gift[] = []
}
export interface IActivateUserPropReq {
    uid?: number|null
    type?: tss_common_PropType|null
}
@protobuf.Type.d("tss_hall_prop_v4_ActivateUserPropReq")
export class ActivateUserPropReq extends protobuf.Message<IActivateUserPropReq> {
    constructor(properties: Properties<IActivateUserPropReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.type) { this.type = properties.type }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, tss_common_PropType, "optional", tss_common_PropType.PropTypeUnknown)
    public type?: tss_common_PropType|null = tss_common_PropType.PropTypeUnknown
}
export interface IActivateUserPropResp {
    num?: number|null
}
@protobuf.Type.d("tss_hall_prop_v4_ActivateUserPropResp")
export class ActivateUserPropResp extends protobuf.Message<IActivateUserPropResp> {
    constructor(properties: Properties<IActivateUserPropResp>) {
        super(properties);
        if (properties) {
            if (properties.num) { this.num = properties.num }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public num?: number|null = 0
}
export interface ISendServiceBroadcastReq {
    chatId?: number|null
    content?: string|null
    propID?: number|null
    expireAt?: number|null
}
@protobuf.Type.d("tss_hall_prop_v4_SendServiceBroadcastReq")
export class SendServiceBroadcastReq extends protobuf.Message<ISendServiceBroadcastReq> {
    constructor(properties: Properties<ISendServiceBroadcastReq>) {
        super(properties);
        if (properties) {
            if (properties.chatId) { this.chatId = properties.chatId }
            if (properties.content) { this.content = properties.content }
            if (properties.propID) { this.propID = properties.propID }
            if (properties.expireAt) { this.expireAt = properties.expireAt }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public chatId?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public content?: string|null = ""
    @protobuf.Field.d(3, "int64", "optional", 0)
    public propID?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public expireAt?: number|null = 0
}
export interface ISendServiceBroadcastResp {
    code?: tss_hall_Code|null
}
@protobuf.Type.d("tss_hall_prop_v4_SendServiceBroadcastResp")
export class SendServiceBroadcastResp extends protobuf.Message<ISendServiceBroadcastResp> {
    constructor(properties: Properties<ISendServiceBroadcastResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
        }
	}
    @protobuf.Field.d(1, tss_hall_Code, "optional", tss_hall_Code.CODE_SUCCEED)
    public code?: tss_hall_Code|null = tss_hall_Code.CODE_SUCCEED
}
class $PropService extends RpcService {
    async SaveProp(req: ISavePropReq, params?: RpcParams) : Promise<{err:number, resp:ISavePropResp}> {
        let data = SavePropReq.create(req)
        this.onBeforeReq("SaveProp", data, params)
        const buffer = SavePropReq.encode(data).finish()
        let [err, pack] = await this.call("SaveProp", buffer, params)
        if (err) {
            this.onBeforeResp("SaveProp", err)
            return {err: err, resp: null}
        } else {
            let resp = SavePropResp.decode(pack) as any
            this.onBeforeResp("SaveProp", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetProp(req: IBatchGetPropReq, params?: RpcParams) : Promise<{err:number, resp:IBatchGetPropResp}> {
        let data = BatchGetPropReq.create(req)
        this.onBeforeReq("BatchGetProp", data, params)
        const buffer = BatchGetPropReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetProp", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetProp", err)
            return {err: err, resp: null}
        } else {
            let resp = BatchGetPropResp.decode(pack) as any
            this.onBeforeResp("BatchGetProp", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListProp(req: IListPropReq, params?: RpcParams) : Promise<{err:number, resp:IListPropResp}> {
        let data = ListPropReq.create(req)
        this.onBeforeReq("ListProp", data, params)
        const buffer = ListPropReq.encode(data).finish()
        let [err, pack] = await this.call("ListProp", buffer, params)
        if (err) {
            this.onBeforeResp("ListProp", err)
            return {err: err, resp: null}
        } else {
            let resp = ListPropResp.decode(pack) as any
            this.onBeforeResp("ListProp", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetProp(req: IGetPropReq, params?: RpcParams) : Promise<{err:number, resp:IGetPropResp}> {
        let data = GetPropReq.create(req)
        this.onBeforeReq("GetProp", data, params)
        const buffer = GetPropReq.encode(data).finish()
        let [err, pack] = await this.call("GetProp", buffer, params)
        if (err) {
            this.onBeforeResp("GetProp", err)
            return {err: err, resp: null}
        } else {
            let resp = GetPropResp.decode(pack) as any
            this.onBeforeResp("GetProp", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetStats(req: IGetStatsReq, params?: RpcParams) : Promise<{err:number, resp:IGetStatsResp}> {
        let data = GetStatsReq.create(req)
        this.onBeforeReq("GetStats", data, params)
        const buffer = GetStatsReq.encode(data).finish()
        let [err, pack] = await this.call("GetStats", buffer, params)
        if (err) {
            this.onBeforeResp("GetStats", err)
            return {err: err, resp: null}
        } else {
            let resp = GetStatsResp.decode(pack) as any
            this.onBeforeResp("GetStats", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SaveGift(req: ISaveGiftReq, params?: RpcParams) : Promise<{err:number, resp:ISaveGiftResp}> {
        let data = SaveGiftReq.create(req)
        this.onBeforeReq("SaveGift", data, params)
        const buffer = SaveGiftReq.encode(data).finish()
        let [err, pack] = await this.call("SaveGift", buffer, params)
        if (err) {
            this.onBeforeResp("SaveGift", err)
            return {err: err, resp: null}
        } else {
            let resp = SaveGiftResp.decode(pack) as any
            this.onBeforeResp("SaveGift", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetGift(req: IBatchGetGiftReq, params?: RpcParams) : Promise<{err:number, resp:IBatchGetGiftResp}> {
        let data = BatchGetGiftReq.create(req)
        this.onBeforeReq("BatchGetGift", data, params)
        const buffer = BatchGetGiftReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetGift", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetGift", err)
            return {err: err, resp: null}
        } else {
            let resp = BatchGetGiftResp.decode(pack) as any
            this.onBeforeResp("BatchGetGift", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListGift(req: IListGiftReq, params?: RpcParams) : Promise<{err:number, resp:IListGiftResp}> {
        let data = ListGiftReq.create(req)
        this.onBeforeReq("ListGift", data, params)
        const buffer = ListGiftReq.encode(data).finish()
        let [err, pack] = await this.call("ListGift", buffer, params)
        if (err) {
            this.onBeforeResp("ListGift", err)
            return {err: err, resp: null}
        } else {
            let resp = ListGiftResp.decode(pack) as any
            this.onBeforeResp("ListGift", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetGift(req: IGetGiftReq, params?: RpcParams) : Promise<{err:number, resp:IGetGiftResp}> {
        let data = GetGiftReq.create(req)
        this.onBeforeReq("GetGift", data, params)
        const buffer = GetGiftReq.encode(data).finish()
        let [err, pack] = await this.call("GetGift", buffer, params)
        if (err) {
            this.onBeforeResp("GetGift", err)
            return {err: err, resp: null}
        } else {
            let resp = GetGiftResp.decode(pack) as any
            this.onBeforeResp("GetGift", err, resp)
            return {err: null, resp: resp}
        }
    }
    async IncUserGift(req: IIncUserGiftReq, params?: RpcParams) : Promise<{err:number, resp:IIncUserGiftResp}> {
        let data = IncUserGiftReq.create(req)
        this.onBeforeReq("IncUserGift", data, params)
        const buffer = IncUserGiftReq.encode(data).finish()
        let [err, pack] = await this.call("IncUserGift", buffer, params)
        if (err) {
            this.onBeforeResp("IncUserGift", err)
            return {err: err, resp: null}
        } else {
            let resp = IncUserGiftResp.decode(pack) as any
            this.onBeforeResp("IncUserGift", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DecUserGift(req: IDecUserGiftReq, params?: RpcParams) : Promise<{err:number, resp:IDecUserGiftResp}> {
        let data = DecUserGiftReq.create(req)
        this.onBeforeReq("DecUserGift", data, params)
        const buffer = DecUserGiftReq.encode(data).finish()
        let [err, pack] = await this.call("DecUserGift", buffer, params)
        if (err) {
            this.onBeforeResp("DecUserGift", err)
            return {err: err, resp: null}
        } else {
            let resp = DecUserGiftResp.decode(pack) as any
            this.onBeforeResp("DecUserGift", err, resp)
            return {err: null, resp: resp}
        }
    }
    async RefundUserGift(req: IRefundUserGiftReq, params?: RpcParams) : Promise<{err:number, resp:IRefundUserGiftResp}> {
        let data = RefundUserGiftReq.create(req)
        this.onBeforeReq("RefundUserGift", data, params)
        const buffer = RefundUserGiftReq.encode(data).finish()
        let [err, pack] = await this.call("RefundUserGift", buffer, params)
        if (err) {
            this.onBeforeResp("RefundUserGift", err)
            return {err: err, resp: null}
        } else {
            let resp = RefundUserGiftResp.decode(pack) as any
            this.onBeforeResp("RefundUserGift", err, resp)
            return {err: null, resp: resp}
        }
    }
    async CleanUpUserGift(req: ICleanUpUserGiftReq, params?: RpcParams) : Promise<{err:number, resp:ICleanUpUserGiftResp}> {
        let data = CleanUpUserGiftReq.create(req)
        this.onBeforeReq("CleanUpUserGift", data, params)
        const buffer = CleanUpUserGiftReq.encode(data).finish()
        let [err, pack] = await this.call("CleanUpUserGift", buffer, params)
        if (err) {
            this.onBeforeResp("CleanUpUserGift", err)
            return {err: err, resp: null}
        } else {
            let resp = CleanUpUserGiftResp.decode(pack) as any
            this.onBeforeResp("CleanUpUserGift", err, resp)
            return {err: null, resp: resp}
        }
    }
    async IncUserProp(req: IIncUserPropReq, params?: RpcParams) : Promise<{err:number, resp:IIncUserPropResp}> {
        let data = IncUserPropReq.create(req)
        this.onBeforeReq("IncUserProp", data, params)
        const buffer = IncUserPropReq.encode(data).finish()
        let [err, pack] = await this.call("IncUserProp", buffer, params)
        if (err) {
            this.onBeforeResp("IncUserProp", err)
            return {err: err, resp: null}
        } else {
            let resp = IncUserPropResp.decode(pack) as any
            this.onBeforeResp("IncUserProp", err, resp)
            return {err: null, resp: resp}
        }
    }
    async IncUserAssets(req: tss_hall_common_IIncUserAssetsReq, params?: RpcParams) : Promise<{err:number, resp:tss_hall_common_IIncUserAssetsResp}> {
        let data = tss_hall_common_IncUserAssetsReq.create(req)
        this.onBeforeReq("IncUserAssets", data, params)
        const buffer = tss_hall_common_IncUserAssetsReq.encode(data).finish()
        let [err, pack] = await this.call("IncUserAssets", buffer, params)
        if (err) {
            this.onBeforeResp("IncUserAssets", err)
            return {err: err, resp: null}
        } else {
            let resp = tss_hall_common_IncUserAssetsResp.decode(pack) as any
            this.onBeforeResp("IncUserAssets", err, resp)
            return {err: null, resp: resp}
        }
    }
    async CalcIncUserAssets(req: tss_hall_common_ICalcIncUserAssetsReq, params?: RpcParams) : Promise<{err:number, resp:tss_hall_common_ICalcIncUserAssetsResp}> {
        let data = tss_hall_common_CalcIncUserAssetsReq.create(req)
        this.onBeforeReq("CalcIncUserAssets", data, params)
        const buffer = tss_hall_common_CalcIncUserAssetsReq.encode(data).finish()
        let [err, pack] = await this.call("CalcIncUserAssets", buffer, params)
        if (err) {
            this.onBeforeResp("CalcIncUserAssets", err)
            return {err: err, resp: null}
        } else {
            let resp = tss_hall_common_CalcIncUserAssetsResp.decode(pack) as any
            this.onBeforeResp("CalcIncUserAssets", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SaveIncUserAssets(req: tss_hall_common_ISaveIncUserAssetsReq, params?: RpcParams) : Promise<{err:number, resp:tss_hall_common_ISaveIncUserAssetsResp}> {
        let data = tss_hall_common_SaveIncUserAssetsReq.create(req)
        this.onBeforeReq("SaveIncUserAssets", data, params)
        const buffer = tss_hall_common_SaveIncUserAssetsReq.encode(data).finish()
        let [err, pack] = await this.call("SaveIncUserAssets", buffer, params)
        if (err) {
            this.onBeforeResp("SaveIncUserAssets", err)
            return {err: err, resp: null}
        } else {
            let resp = tss_hall_common_SaveIncUserAssetsResp.decode(pack) as any
            this.onBeforeResp("SaveIncUserAssets", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DecUserAssets(req: tss_hall_common_IDecUserAssetsReq, params?: RpcParams) : Promise<{err:number, resp:tss_hall_common_IDecUserAssetsResp}> {
        let data = tss_hall_common_DecUserAssetsReq.create(req)
        this.onBeforeReq("DecUserAssets", data, params)
        const buffer = tss_hall_common_DecUserAssetsReq.encode(data).finish()
        let [err, pack] = await this.call("DecUserAssets", buffer, params)
        if (err) {
            this.onBeforeResp("DecUserAssets", err)
            return {err: err, resp: null}
        } else {
            let resp = tss_hall_common_DecUserAssetsResp.decode(pack) as any
            this.onBeforeResp("DecUserAssets", err, resp)
            return {err: null, resp: resp}
        }
    }
    async FillAssets(req: tss_hall_common_IFillAssetsReq, params?: RpcParams) : Promise<{err:number, resp:tss_hall_common_IFillAssetsResp}> {
        let data = tss_hall_common_FillAssetsReq.create(req)
        this.onBeforeReq("FillAssets", data, params)
        const buffer = tss_hall_common_FillAssetsReq.encode(data).finish()
        let [err, pack] = await this.call("FillAssets", buffer, params)
        if (err) {
            this.onBeforeResp("FillAssets", err)
            return {err: err, resp: null}
        } else {
            let resp = tss_hall_common_FillAssetsResp.decode(pack) as any
            this.onBeforeResp("FillAssets", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DecUserProp(req: IDecUserPropReq, params?: RpcParams) : Promise<{err:number, resp:IDecUserPropResp}> {
        let data = DecUserPropReq.create(req)
        this.onBeforeReq("DecUserProp", data, params)
        const buffer = DecUserPropReq.encode(data).finish()
        let [err, pack] = await this.call("DecUserProp", buffer, params)
        if (err) {
            this.onBeforeResp("DecUserProp", err)
            return {err: err, resp: null}
        } else {
            let resp = DecUserPropResp.decode(pack) as any
            this.onBeforeResp("DecUserProp", err, resp)
            return {err: null, resp: resp}
        }
    }
    async RefundUserProp(req: IRefundUserPropReq, params?: RpcParams) : Promise<{err:number, resp:IRefundUserPropResp}> {
        let data = RefundUserPropReq.create(req)
        this.onBeforeReq("RefundUserProp", data, params)
        const buffer = RefundUserPropReq.encode(data).finish()
        let [err, pack] = await this.call("RefundUserProp", buffer, params)
        if (err) {
            this.onBeforeResp("RefundUserProp", err)
            return {err: err, resp: null}
        } else {
            let resp = RefundUserPropResp.decode(pack) as any
            this.onBeforeResp("RefundUserProp", err, resp)
            return {err: null, resp: resp}
        }
    }
    async Rename(req: IRenameReq, params?: RpcParams) : Promise<{err:number, resp:IRenameResp}> {
        let data = RenameReq.create(req)
        this.onBeforeReq("Rename", data, params)
        const buffer = RenameReq.encode(data).finish()
        let [err, pack] = await this.call("Rename", buffer, params)
        if (err) {
            this.onBeforeResp("Rename", err)
            return {err: err, resp: null}
        } else {
            let resp = RenameResp.decode(pack) as any
            this.onBeforeResp("Rename", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ActivateVip(req: IActivateVipReq, params?: RpcParams) : Promise<{err:number, resp:IActivateVipResp}> {
        let data = ActivateVipReq.create(req)
        this.onBeforeReq("ActivateVip", data, params)
        const buffer = ActivateVipReq.encode(data).finish()
        let [err, pack] = await this.call("ActivateVip", buffer, params)
        if (err) {
            this.onBeforeResp("ActivateVip", err)
            return {err: err, resp: null}
        } else {
            let resp = ActivateVipResp.decode(pack) as any
            this.onBeforeResp("ActivateVip", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ActivatePremiumCard(req: IActivatePremiumCardReq, params?: RpcParams) : Promise<{err:number, resp:IActivatePremiumCardResp}> {
        let data = ActivatePremiumCardReq.create(req)
        this.onBeforeReq("ActivatePremiumCard", data, params)
        const buffer = ActivatePremiumCardReq.encode(data).finish()
        let [err, pack] = await this.call("ActivatePremiumCard", buffer, params)
        if (err) {
            this.onBeforeResp("ActivatePremiumCard", err)
            return {err: err, resp: null}
        } else {
            let resp = ActivatePremiumCardResp.decode(pack) as any
            this.onBeforeResp("ActivatePremiumCard", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ActivateSteakWinningProtectCard(req: IActivateSteakWinningProtectCardReq, params?: RpcParams) : Promise<{err:number, resp:IActivateSteakWinningProtectCardResp}> {
        let data = ActivateSteakWinningProtectCardReq.create(req)
        this.onBeforeReq("ActivateSteakWinningProtectCard", data, params)
        const buffer = ActivateSteakWinningProtectCardReq.encode(data).finish()
        let [err, pack] = await this.call("ActivateSteakWinningProtectCard", buffer, params)
        if (err) {
            this.onBeforeResp("ActivateSteakWinningProtectCard", err)
            return {err: err, resp: null}
        } else {
            let resp = ActivateSteakWinningProtectCardResp.decode(pack) as any
            this.onBeforeResp("ActivateSteakWinningProtectCard", err, resp)
            return {err: null, resp: resp}
        }
    }
    async OpenGift(req: IOpenGiftReq, params?: RpcParams) : Promise<{err:number, resp:IOpenGiftResp}> {
        let data = OpenGiftReq.create(req)
        this.onBeforeReq("OpenGift", data, params)
        const buffer = OpenGiftReq.encode(data).finish()
        let [err, pack] = await this.call("OpenGift", buffer, params)
        if (err) {
            this.onBeforeResp("OpenGift", err)
            return {err: err, resp: null}
        } else {
            let resp = OpenGiftResp.decode(pack) as any
            this.onBeforeResp("OpenGift", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ActivateUserBuff(req: IActivateUserBuffReq, params?: RpcParams) : Promise<{err:number, resp:IActivateUserBuffResp}> {
        let data = ActivateUserBuffReq.create(req)
        this.onBeforeReq("ActivateUserBuff", data, params)
        const buffer = ActivateUserBuffReq.encode(data).finish()
        let [err, pack] = await this.call("ActivateUserBuff", buffer, params)
        if (err) {
            this.onBeforeResp("ActivateUserBuff", err)
            return {err: err, resp: null}
        } else {
            let resp = ActivateUserBuffResp.decode(pack) as any
            this.onBeforeResp("ActivateUserBuff", err, resp)
            return {err: null, resp: resp}
        }
    }
    async IncUserIntimacy(req: IIncUserIntimacyReq, params?: RpcParams) : Promise<{err:number, resp:IIncUserIntimacyResp}> {
        let data = IncUserIntimacyReq.create(req)
        this.onBeforeReq("IncUserIntimacy", data, params)
        const buffer = IncUserIntimacyReq.encode(data).finish()
        let [err, pack] = await this.call("IncUserIntimacy", buffer, params)
        if (err) {
            this.onBeforeResp("IncUserIntimacy", err)
            return {err: err, resp: null}
        } else {
            let resp = IncUserIntimacyResp.decode(pack) as any
            this.onBeforeResp("IncUserIntimacy", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetUserProp(req: IBatchGetUserPropReq, params?: RpcParams) : Promise<{err:number, resp:IBatchGetUserPropResp}> {
        let data = BatchGetUserPropReq.create(req)
        this.onBeforeReq("BatchGetUserProp", data, params)
        const buffer = BatchGetUserPropReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetUserProp", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetUserProp", err)
            return {err: err, resp: null}
        } else {
            let resp = BatchGetUserPropResp.decode(pack) as any
            this.onBeforeResp("BatchGetUserProp", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetUserGift(req: IBatchGetUserGiftReq, params?: RpcParams) : Promise<{err:number, resp:IBatchGetUserGiftResp}> {
        let data = BatchGetUserGiftReq.create(req)
        this.onBeforeReq("BatchGetUserGift", data, params)
        const buffer = BatchGetUserGiftReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetUserGift", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetUserGift", err)
            return {err: err, resp: null}
        } else {
            let resp = BatchGetUserGiftResp.decode(pack) as any
            this.onBeforeResp("BatchGetUserGift", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListUserRes(req: IListUserResReq, params?: RpcParams) : Promise<{err:number, resp:IListUserResResp}> {
        let data = ListUserResReq.create(req)
        this.onBeforeReq("ListUserRes", data, params)
        const buffer = ListUserResReq.encode(data).finish()
        let [err, pack] = await this.call("ListUserRes", buffer, params)
        if (err) {
            this.onBeforeResp("ListUserRes", err)
            return {err: err, resp: null}
        } else {
            let resp = ListUserResResp.decode(pack) as any
            this.onBeforeResp("ListUserRes", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListUserResV2(req: IListUserResV2Req, params?: RpcParams) : Promise<{err:number, resp:IListUserResV2Resp}> {
        let data = ListUserResV2Req.create(req)
        this.onBeforeReq("ListUserResV2", data, params)
        const buffer = ListUserResV2Req.encode(data).finish()
        let [err, pack] = await this.call("ListUserResV2", buffer, params)
        if (err) {
            this.onBeforeResp("ListUserResV2", err)
            return {err: err, resp: null}
        } else {
            let resp = ListUserResV2Resp.decode(pack) as any
            this.onBeforeResp("ListUserResV2", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ExpandPropDetails(req: IExpandPropDetailsReq, params?: RpcParams) : Promise<{err:number, resp:IExpandPropDetailsResp}> {
        let data = ExpandPropDetailsReq.create(req)
        this.onBeforeReq("ExpandPropDetails", data, params)
        const buffer = ExpandPropDetailsReq.encode(data).finish()
        let [err, pack] = await this.call("ExpandPropDetails", buffer, params)
        if (err) {
            this.onBeforeResp("ExpandPropDetails", err)
            return {err: err, resp: null}
        } else {
            let resp = ExpandPropDetailsResp.decode(pack) as any
            this.onBeforeResp("ExpandPropDetails", err, resp)
            return {err: null, resp: resp}
        }
    }
    async CMSListUserRes(req: ICMSListUserResReq, params?: RpcParams) : Promise<{err:number, resp:ICMSListUserResResp}> {
        let data = CMSListUserResReq.create(req)
        this.onBeforeReq("CMSListUserRes", data, params)
        const buffer = CMSListUserResReq.encode(data).finish()
        let [err, pack] = await this.call("CMSListUserRes", buffer, params)
        if (err) {
            this.onBeforeResp("CMSListUserRes", err)
            return {err: err, resp: null}
        } else {
            let resp = CMSListUserResResp.decode(pack) as any
            this.onBeforeResp("CMSListUserRes", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListUserMergedProp(req: IListUserMergedPropReq, params?: RpcParams) : Promise<{err:number, resp:IListUserMergedPropResp}> {
        let data = ListUserMergedPropReq.create(req)
        this.onBeforeReq("ListUserMergedProp", data, params)
        const buffer = ListUserMergedPropReq.encode(data).finish()
        let [err, pack] = await this.call("ListUserMergedProp", buffer, params)
        if (err) {
            this.onBeforeResp("ListUserMergedProp", err)
            return {err: err, resp: null}
        } else {
            let resp = ListUserMergedPropResp.decode(pack) as any
            this.onBeforeResp("ListUserMergedProp", err, resp)
            return {err: null, resp: resp}
        }
    }
    async CountUserProp(req: ICountUserPropReq, params?: RpcParams) : Promise<{err:number, resp:ICountUserPropResp}> {
        let data = CountUserPropReq.create(req)
        this.onBeforeReq("CountUserProp", data, params)
        const buffer = CountUserPropReq.encode(data).finish()
        let [err, pack] = await this.call("CountUserProp", buffer, params)
        if (err) {
            this.onBeforeResp("CountUserProp", err)
            return {err: err, resp: null}
        } else {
            let resp = CountUserPropResp.decode(pack) as any
            this.onBeforeResp("CountUserProp", err, resp)
            return {err: null, resp: resp}
        }
    }
    async CountCurrentUserPropByPropType(req: ICountCurrentUserPropByPropTypeReq, params?: RpcParams) : Promise<{err:number, resp:ICountCurrentUserPropByPropTypeResp}> {
        let data = CountCurrentUserPropByPropTypeReq.create(req)
        this.onBeforeReq("CountCurrentUserPropByPropType", data, params)
        const buffer = CountCurrentUserPropByPropTypeReq.encode(data).finish()
        let [err, pack] = await this.call("CountCurrentUserPropByPropType", buffer, params)
        if (err) {
            this.onBeforeResp("CountCurrentUserPropByPropType", err)
            return {err: err, resp: null}
        } else {
            let resp = CountCurrentUserPropByPropTypeResp.decode(pack) as any
            this.onBeforeResp("CountCurrentUserPropByPropType", err, resp)
            return {err: null, resp: resp}
        }
    }
    async CountCurrentUserPropByCategory(req: ICountCurrentUserPropByCategoryReq, params?: RpcParams) : Promise<{err:number, resp:ICountCurrentUserPropByCategoryResp}> {
        let data = CountCurrentUserPropByCategoryReq.create(req)
        this.onBeforeReq("CountCurrentUserPropByCategory", data, params)
        const buffer = CountCurrentUserPropByCategoryReq.encode(data).finish()
        let [err, pack] = await this.call("CountCurrentUserPropByCategory", buffer, params)
        if (err) {
            this.onBeforeResp("CountCurrentUserPropByCategory", err)
            return {err: err, resp: null}
        } else {
            let resp = CountCurrentUserPropByCategoryResp.decode(pack) as any
            this.onBeforeResp("CountCurrentUserPropByCategory", err, resp)
            return {err: null, resp: resp}
        }
    }
    async CleanUpUserProp(req: ICleanUpUserPropReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = CleanUpUserPropReq.create(req)
        this.onBeforeReq("CleanUpUserProp", data, params)
        const buffer = CleanUpUserPropReq.encode(data).finish()
        let [err, pack] = await this.call("CleanUpUserProp", buffer, params)
        if (err) {
            this.onBeforeResp("CleanUpUserProp", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("CleanUpUserProp", err, resp)
            return {err: null, resp: resp}
        }
    }
    async CleanUpUserPropV2(req: ICleanUpUserPropV2Req, params?: RpcParams) : Promise<{err:number, resp:ICleanUpUserPropV2Resp}> {
        let data = CleanUpUserPropV2Req.create(req)
        this.onBeforeReq("CleanUpUserPropV2", data, params)
        const buffer = CleanUpUserPropV2Req.encode(data).finish()
        let [err, pack] = await this.call("CleanUpUserPropV2", buffer, params)
        if (err) {
            this.onBeforeResp("CleanUpUserPropV2", err)
            return {err: err, resp: null}
        } else {
            let resp = CleanUpUserPropV2Resp.decode(pack) as any
            this.onBeforeResp("CleanUpUserPropV2", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetUserBadge(req: IGetUserBadgeReq, params?: RpcParams) : Promise<{err:number, resp:IGetUserBadgeResp}> {
        let data = GetUserBadgeReq.create(req)
        this.onBeforeReq("GetUserBadge", data, params)
        const buffer = GetUserBadgeReq.encode(data).finish()
        let [err, pack] = await this.call("GetUserBadge", buffer, params)
        if (err) {
            this.onBeforeResp("GetUserBadge", err)
            return {err: err, resp: null}
        } else {
            let resp = GetUserBadgeResp.decode(pack) as any
            this.onBeforeResp("GetUserBadge", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListUserBadge(req: IListUserBadgeReq, params?: RpcParams) : Promise<{err:number, resp:IListUserBadgeResp}> {
        let data = ListUserBadgeReq.create(req)
        this.onBeforeReq("ListUserBadge", data, params)
        const buffer = ListUserBadgeReq.encode(data).finish()
        let [err, pack] = await this.call("ListUserBadge", buffer, params)
        if (err) {
            this.onBeforeResp("ListUserBadge", err)
            return {err: err, resp: null}
        } else {
            let resp = ListUserBadgeResp.decode(pack) as any
            this.onBeforeResp("ListUserBadge", err, resp)
            return {err: null, resp: resp}
        }
    }
    async CleanUpUserBadge(req: ICleanUpUserBadgeReq, params?: RpcParams) : Promise<{err:number, resp:ICleanUpUserBadgeResp}> {
        let data = CleanUpUserBadgeReq.create(req)
        this.onBeforeReq("CleanUpUserBadge", data, params)
        const buffer = CleanUpUserBadgeReq.encode(data).finish()
        let [err, pack] = await this.call("CleanUpUserBadge", buffer, params)
        if (err) {
            this.onBeforeResp("CleanUpUserBadge", err)
            return {err: err, resp: null}
        } else {
            let resp = CleanUpUserBadgeResp.decode(pack) as any
            this.onBeforeResp("CleanUpUserBadge", err, resp)
            return {err: null, resp: resp}
        }
    }
    async CleanUpUserPropBadge(req: ICleanUpUserPropBadgeReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = CleanUpUserPropBadgeReq.create(req)
        this.onBeforeReq("CleanUpUserPropBadge", data, params)
        const buffer = CleanUpUserPropBadgeReq.encode(data).finish()
        let [err, pack] = await this.call("CleanUpUserPropBadge", buffer, params)
        if (err) {
            this.onBeforeResp("CleanUpUserPropBadge", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("CleanUpUserPropBadge", err, resp)
            return {err: null, resp: resp}
        }
    }
    async CheckUserPropExpired(req: ICheckUserPropExpiredReq, params?: RpcParams) : Promise<{err:number, resp:ICheckUserPropExpiredResp}> {
        let data = CheckUserPropExpiredReq.create(req)
        this.onBeforeReq("CheckUserPropExpired", data, params)
        const buffer = CheckUserPropExpiredReq.encode(data).finish()
        let [err, pack] = await this.call("CheckUserPropExpired", buffer, params)
        if (err) {
            this.onBeforeResp("CheckUserPropExpired", err)
            return {err: err, resp: null}
        } else {
            let resp = CheckUserPropExpiredResp.decode(pack) as any
            this.onBeforeResp("CheckUserPropExpired", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SendServiceBroadcast(req: ISendServiceBroadcastReq, params?: RpcParams) : Promise<{err:number, resp:ISendServiceBroadcastResp}> {
        let data = SendServiceBroadcastReq.create(req)
        this.onBeforeReq("SendServiceBroadcast", data, params)
        const buffer = SendServiceBroadcastReq.encode(data).finish()
        let [err, pack] = await this.call("SendServiceBroadcast", buffer, params)
        if (err) {
            this.onBeforeResp("SendServiceBroadcast", err)
            return {err: err, resp: null}
        } else {
            let resp = SendServiceBroadcastResp.decode(pack) as any
            this.onBeforeResp("SendServiceBroadcast", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListUserPropLog(req: IListUserPropLogReq, params?: RpcParams) : Promise<{err:number, resp:IListUserPropLogResp}> {
        let data = ListUserPropLogReq.create(req)
        this.onBeforeReq("ListUserPropLog", data, params)
        const buffer = ListUserPropLogReq.encode(data).finish()
        let [err, pack] = await this.call("ListUserPropLog", buffer, params)
        if (err) {
            this.onBeforeResp("ListUserPropLog", err)
            return {err: err, resp: null}
        } else {
            let resp = ListUserPropLogResp.decode(pack) as any
            this.onBeforeResp("ListUserPropLog", err, resp)
            return {err: null, resp: resp}
        }
    }
    async CheckUserExpiredPropCallback(req: ICheckUserExpiredPropCallbackReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = CheckUserExpiredPropCallbackReq.create(req)
        this.onBeforeReq("CheckUserExpiredPropCallback", data, params)
        const buffer = CheckUserExpiredPropCallbackReq.encode(data).finish()
        let [err, pack] = await this.call("CheckUserExpiredPropCallback", buffer, params)
        if (err) {
            this.onBeforeResp("CheckUserExpiredPropCallback", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("CheckUserExpiredPropCallback", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ActivateUserProp(req: IActivateUserPropReq, params?: RpcParams) : Promise<{err:number, resp:IActivateUserPropResp}> {
        let data = ActivateUserPropReq.create(req)
        this.onBeforeReq("ActivateUserProp", data, params)
        const buffer = ActivateUserPropReq.encode(data).finish()
        let [err, pack] = await this.call("ActivateUserProp", buffer, params)
        if (err) {
            this.onBeforeResp("ActivateUserProp", err)
            return {err: err, resp: null}
        } else {
            let resp = ActivateUserPropResp.decode(pack) as any
            this.onBeforeResp("ActivateUserProp", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetPropForSync(req: base_IBatchGetResourceReq, params?: RpcParams) : Promise<{err:number, resp:base_IBatchGetResourceResp}> {
        let data = base_BatchGetResourceReq.create(req)
        this.onBeforeReq("BatchGetPropForSync", data, params)
        const buffer = base_BatchGetResourceReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetPropForSync", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetPropForSync", err)
            return {err: err, resp: null}
        } else {
            let resp = base_BatchGetResourceResp.decode(pack) as any
            this.onBeforeResp("BatchGetPropForSync", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetGiftForSync(req: base_IBatchGetResourceReq, params?: RpcParams) : Promise<{err:number, resp:base_IBatchGetResourceResp}> {
        let data = base_BatchGetResourceReq.create(req)
        this.onBeforeReq("BatchGetGiftForSync", data, params)
        const buffer = base_BatchGetResourceReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetGiftForSync", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetGiftForSync", err)
            return {err: err, resp: null}
        } else {
            let resp = base_BatchGetResourceResp.decode(pack) as any
            this.onBeforeResp("BatchGetGiftForSync", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DeliveryProp(req: tss_hall_common_IDeliverProduct, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = tss_hall_common_DeliverProduct.create(req)
        this.onBeforeReq("DeliveryProp", data, params)
        const buffer = tss_hall_common_DeliverProduct.encode(data).finish()
        let [err, pack] = await this.call("DeliveryProp", buffer, params)
        if (err) {
            this.onBeforeResp("DeliveryProp", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("DeliveryProp", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListPropCategory(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:IListPropCategoryResp}> {
        let data = base_Void.create(req)
        this.onBeforeReq("ListPropCategory", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("ListPropCategory", buffer, params)
        if (err) {
            this.onBeforeResp("ListPropCategory", err)
            return {err: err, resp: null}
        } else {
            let resp = ListPropCategoryResp.decode(pack) as any
            this.onBeforeResp("ListPropCategory", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListPropType(req: IListPropTypeReq, params?: RpcParams) : Promise<{err:number, resp:IListPropTypeResp}> {
        let data = ListPropTypeReq.create(req)
        this.onBeforeReq("ListPropType", data, params)
        const buffer = ListPropTypeReq.encode(data).finish()
        let [err, pack] = await this.call("ListPropType", buffer, params)
        if (err) {
            this.onBeforeResp("ListPropType", err)
            return {err: err, resp: null}
        } else {
            let resp = ListPropTypeResp.decode(pack) as any
            this.onBeforeResp("ListPropType", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListUserGiftLog(req: IListUserGiftLogReq, params?: RpcParams) : Promise<{err:number, resp:IListUserGiftLogResp}> {
        let data = ListUserGiftLogReq.create(req)
        this.onBeforeReq("ListUserGiftLog", data, params)
        const buffer = ListUserGiftLogReq.encode(data).finish()
        let [err, pack] = await this.call("ListUserGiftLog", buffer, params)
        if (err) {
            this.onBeforeResp("ListUserGiftLog", err)
            return {err: err, resp: null}
        } else {
            let resp = ListUserGiftLogResp.decode(pack) as any
            this.onBeforeResp("ListUserGiftLog", err, resp)
            return {err: null, resp: resp}
        }
    }
    async HasExpiredRes(req: IHasExpiredResReq, params?: RpcParams) : Promise<{err:number, resp:IHasExpiredResResp}> {
        let data = HasExpiredResReq.create(req)
        this.onBeforeReq("HasExpiredRes", data, params)
        const buffer = HasExpiredResReq.encode(data).finish()
        let [err, pack] = await this.call("HasExpiredRes", buffer, params)
        if (err) {
            this.onBeforeResp("HasExpiredRes", err)
            return {err: err, resp: null}
        } else {
            let resp = HasExpiredResResp.decode(pack) as any
            this.onBeforeResp("HasExpiredRes", err, resp)
            return {err: null, resp: resp}
        }
    }
}
export const PropService = new $PropService({
    name: "tss.hall.prop.v4",
})
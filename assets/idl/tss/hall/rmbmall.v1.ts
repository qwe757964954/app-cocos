import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  Void as base_Void,IVoid as base_IVoid ,  BatchGetResourceReq as base_BatchGetResourceReq,IBatchGetResourceReq as base_IBatchGetResourceReq ,  BatchGetResourceResp as base_BatchGetResourceResp,IBatchGetResourceResp as base_IBatchGetResourceResp ,  } from "idl/base/base"
import {  DeliveryRequest as bgo_component_DeliveryRequest,IDeliveryRequest as bgo_component_IDeliveryRequest ,  DeliveryResponse as bgo_component_DeliveryResponse,IDeliveryResponse as bgo_component_IDeliveryResponse ,  } from "idl/bgo/component/common_pay"
import {  PaidReq as mp_pay_callback_trade_v1_PaidReq,IPaidReq as mp_pay_callback_trade_v1_IPaidReq ,  PaidResp as mp_pay_callback_trade_v1_PaidResp,IPaidResp as mp_pay_callback_trade_v1_IPaidResp ,  } from "idl/mp/pay/callback/trade.v1"
import {  PayChannel as mp_pay_trade_v1_PayChannel ,  DeviceInfo as mp_pay_trade_v1_DeviceInfo,IDeviceInfo as mp_pay_trade_v1_IDeviceInfo ,  Charge as mp_pay_trade_v1_Charge,ICharge as mp_pay_trade_v1_ICharge ,  } from "idl/mp/pay/trade.v1"
import {  OS as tss_common_OS ,  PayChannel as tss_common_PayChannel ,  SwitchState as tss_common_SwitchState ,  AssetItem as tss_common_AssetItem,IAssetItem as tss_common_IAssetItem ,  } from "idl/tss/common/common_define"
import {  ProductType as tss_hall_common_ProductType ,  } from "idl/tss/hall/common/mall"
export enum PromotionType {  
    PromotionUnknown = 0,  
    PromotionGiving = 1,  
    PromotionDeduction = 2,  
    PromotionClosed = 3,
}
export enum OrderStatus {  
    OrderStatusUnknown = 0,  
    OrderStatusPendingPayment = 1,  
    OrderStatusToBeDelivery = 2,  
    OrderStatusSuccess = 3,  
    OrderStatusFailed = 4,  
    OrderStatusPaymentTimeOut = 5,
}
export enum PromotionTarget {  
    TargetUnknown = 0,  
    TargetVip = 1,  
    TargetAll = 2,
}
export enum ListType {  
    ListTypeRMBMall = 0,  
    ListTypePremiumCardIntroduce = 1,
}
export interface ISaveMerchandiseReq {
    merchandise?: IRMBMerchandise
}
@protobuf.Type.d("tss_hall_rmbmall_v1_SaveMerchandiseReq")
export class SaveMerchandiseReq extends protobuf.Message<ISaveMerchandiseReq> {
    constructor(properties: Properties<ISaveMerchandiseReq>) {
        super(properties);
        if (properties) {
            if (properties.merchandise) { this.merchandise = RMBMerchandise.create(properties.merchandise) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_rmbmall_v1_RMBMerchandise", "optional")
    public merchandise?: RMBMerchandise|null
}
export interface ISaveMerchandiseResp {
    id?: number|null
}
@protobuf.Type.d("tss_hall_rmbmall_v1_SaveMerchandiseResp")
export class SaveMerchandiseResp extends protobuf.Message<ISaveMerchandiseResp> {
    constructor(properties: Properties<ISaveMerchandiseResp>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public id?: number|null = 0
}
export interface IMerchandiseSort {
    id?: number|null
    priority?: number|null
}
@protobuf.Type.d("tss_hall_rmbmall_v1_MerchandiseSort")
export class MerchandiseSort extends protobuf.Message<IMerchandiseSort> {
    constructor(properties: Properties<IMerchandiseSort>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.priority) { this.priority = properties.priority }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public id?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public priority?: number|null = 0
}
export interface IBatchSortMerchandiseReq {
    merchandise?: IMerchandiseSort[]
}
@protobuf.Type.d("tss_hall_rmbmall_v1_BatchSortMerchandiseReq")
export class BatchSortMerchandiseReq extends protobuf.Message<IBatchSortMerchandiseReq> {
    constructor(properties: Properties<IBatchSortMerchandiseReq>) {
        super(properties);
        if (properties) {
            if (properties.merchandise) { this.merchandise = []; properties.merchandise.forEach((value, index)=>{this.merchandise[index] = MerchandiseSort.create(properties.merchandise[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_rmbmall_v1_MerchandiseSort", "repeated")
    public merchandise?: MerchandiseSort[] = []
}
export interface IListMerchandiseReq {
    page?: number|null
    pageSize?: number|null
    pType?: tss_hall_common_ProductType|null
    blockMids?: number[]
    listType?: ListType|null
}
@protobuf.Type.d("tss_hall_rmbmall_v1_ListMerchandiseReq")
export class ListMerchandiseReq extends protobuf.Message<IListMerchandiseReq> {
    constructor(properties: Properties<IListMerchandiseReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.pType) { this.pType = properties.pType }
            if (properties.blockMids) { this.blockMids = []; properties.blockMids.forEach((value, index)=>{this.blockMids[index] = properties.blockMids[index]})}
            if (properties.listType) { this.listType = properties.listType }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(3, tss_hall_common_ProductType, "optional", tss_hall_common_ProductType.ProductUnknown)
    public pType?: tss_hall_common_ProductType|null = tss_hall_common_ProductType.ProductUnknown
    @protobuf.Field.d(4, "int64", "repeated", [])
    public blockMids?: number[] = []
    @protobuf.Field.d(5, ListType, "optional", ListType.ListTypeRMBMall)
    public listType?: ListType|null = ListType.ListTypeRMBMall
}
export interface IGenderGift {
    maleGiftRelatedId?: number|null
    femaleGiftRelatedId?: number|null
}
@protobuf.Type.d("tss_hall_rmbmall_v1_GenderGift")
export class GenderGift extends protobuf.Message<IGenderGift> {
    constructor(properties: Properties<IGenderGift>) {
        super(properties);
        if (properties) {
            if (properties.maleGiftRelatedId) { this.maleGiftRelatedId = properties.maleGiftRelatedId }
            if (properties.femaleGiftRelatedId) { this.femaleGiftRelatedId = properties.femaleGiftRelatedId }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public maleGiftRelatedId?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public femaleGiftRelatedId?: number|null = 0
}
export interface IDeleteMerchandiseReq {
    id?: number|null
    operator?: string|null
}
@protobuf.Type.d("tss_hall_rmbmall_v1_DeleteMerchandiseReq")
export class DeleteMerchandiseReq extends protobuf.Message<IDeleteMerchandiseReq> {
    constructor(properties: Properties<IDeleteMerchandiseReq>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.operator) { this.operator = properties.operator }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public id?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public operator?: string|null = ""
}
export interface IOrder {
    OrderId?: string|null
    uid?: number|null
    merchandiseId?: number|null
    actualPrice?: number|null
    originPrice?: number|null
    amount?: number|null
    os?: tss_common_OS|null
    payChannel?: tss_common_PayChannel|null
    status?: OrderStatus|null
    CreateAt?: number|null
    UpdateAt?: number|null
    merchandiseName?: string|null
    pType?: tss_hall_common_ProductType|null
}
@protobuf.Type.d("tss_hall_rmbmall_v1_Order")
export class Order extends protobuf.Message<IOrder> {
    constructor(properties: Properties<IOrder>) {
        super(properties);
        if (properties) {
            if (properties.OrderId) { this.OrderId = properties.OrderId }
            if (properties.uid) { this.uid = properties.uid }
            if (properties.merchandiseId) { this.merchandiseId = properties.merchandiseId }
            if (properties.actualPrice) { this.actualPrice = properties.actualPrice }
            if (properties.originPrice) { this.originPrice = properties.originPrice }
            if (properties.amount) { this.amount = properties.amount }
            if (properties.os) { this.os = properties.os }
            if (properties.payChannel) { this.payChannel = properties.payChannel }
            if (properties.status) { this.status = properties.status }
            if (properties.CreateAt) { this.CreateAt = properties.CreateAt }
            if (properties.UpdateAt) { this.UpdateAt = properties.UpdateAt }
            if (properties.merchandiseName) { this.merchandiseName = properties.merchandiseName }
            if (properties.pType) { this.pType = properties.pType }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public OrderId?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public merchandiseId?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public actualPrice?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public originPrice?: number|null = 0
    @protobuf.Field.d(6, "int64", "optional", 0)
    public amount?: number|null = 0
    @protobuf.Field.d(7, tss_common_OS, "optional", tss_common_OS.OSUnknown)
    public os?: tss_common_OS|null = tss_common_OS.OSUnknown
    @protobuf.Field.d(8, tss_common_PayChannel, "optional", tss_common_PayChannel.PayChannelUnknown)
    public payChannel?: tss_common_PayChannel|null = tss_common_PayChannel.PayChannelUnknown
    @protobuf.Field.d(9, OrderStatus, "optional", OrderStatus.OrderStatusUnknown)
    public status?: OrderStatus|null = OrderStatus.OrderStatusUnknown
    @protobuf.Field.d(10, "int64", "optional", 0)
    public CreateAt?: number|null = 0
    @protobuf.Field.d(11, "int64", "optional", 0)
    public UpdateAt?: number|null = 0
    @protobuf.Field.d(12, "string", "optional", )
    public merchandiseName?: string|null = ""
    @protobuf.Field.d(13, tss_hall_common_ProductType, "optional", tss_hall_common_ProductType.ProductUnknown)
    public pType?: tss_hall_common_ProductType|null = tss_hall_common_ProductType.ProductUnknown
}
export interface ICommitMerchandiseReq {
    merchandiseId?: number|null
    payChannel?: tss_common_PayChannel|null
    uid?: number|null
    platform?: tss_common_OS|null
    scene?: string|null
    extraJson?: string|null
}
@protobuf.Type.d("tss_hall_rmbmall_v1_CommitMerchandiseReq")
export class CommitMerchandiseReq extends protobuf.Message<ICommitMerchandiseReq> {
    constructor(properties: Properties<ICommitMerchandiseReq>) {
        super(properties);
        if (properties) {
            if (properties.merchandiseId) { this.merchandiseId = properties.merchandiseId }
            if (properties.payChannel) { this.payChannel = properties.payChannel }
            if (properties.uid) { this.uid = properties.uid }
            if (properties.platform) { this.platform = properties.platform }
            if (properties.scene) { this.scene = properties.scene }
            if (properties.extraJson) { this.extraJson = properties.extraJson }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public merchandiseId?: number|null = 0
    @protobuf.Field.d(2, tss_common_PayChannel, "optional", tss_common_PayChannel.PayChannelUnknown)
    public payChannel?: tss_common_PayChannel|null = tss_common_PayChannel.PayChannelUnknown
    @protobuf.Field.d(3, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(4, tss_common_OS, "optional", tss_common_OS.OSUnknown)
    public platform?: tss_common_OS|null = tss_common_OS.OSUnknown
    @protobuf.Field.d(5, "string", "optional", )
    public scene?: string|null = ""
    @protobuf.Field.d(6, "string", "optional", )
    public extraJson?: string|null = ""
}
export interface IPBOrderInfo {
    RET?: number|null
    MSG?: string|null
    PID?: string|null
    ORDER?: string|null
    SID?: string|null
    APPID?: string|null
    SITEMID?: string|null
    MID?: number|null
    PMODE?: number|null
    PAMOUNT?: string|null
    ITEMID?: string|null
    PAYCONFID?: string|null
    PAMOUNT_UNIT?: string|null
    PAMOUNT_RATE?: string|null
    PAMOUNT_USD?: number|null
    NOTIFY_URL?: string|null
    extraJson?: string|null
}
@protobuf.Type.d("tss_hall_rmbmall_v1_PBOrderInfo")
export class PBOrderInfo extends protobuf.Message<IPBOrderInfo> {
    constructor(properties: Properties<IPBOrderInfo>) {
        super(properties);
        if (properties) {
            if (properties.RET) { this.RET = properties.RET }
            if (properties.MSG) { this.MSG = properties.MSG }
            if (properties.PID) { this.PID = properties.PID }
            if (properties.ORDER) { this.ORDER = properties.ORDER }
            if (properties.SID) { this.SID = properties.SID }
            if (properties.APPID) { this.APPID = properties.APPID }
            if (properties.SITEMID) { this.SITEMID = properties.SITEMID }
            if (properties.MID) { this.MID = properties.MID }
            if (properties.PMODE) { this.PMODE = properties.PMODE }
            if (properties.PAMOUNT) { this.PAMOUNT = properties.PAMOUNT }
            if (properties.ITEMID) { this.ITEMID = properties.ITEMID }
            if (properties.PAYCONFID) { this.PAYCONFID = properties.PAYCONFID }
            if (properties.PAMOUNT_UNIT) { this.PAMOUNT_UNIT = properties.PAMOUNT_UNIT }
            if (properties.PAMOUNT_RATE) { this.PAMOUNT_RATE = properties.PAMOUNT_RATE }
            if (properties.PAMOUNT_USD) { this.PAMOUNT_USD = properties.PAMOUNT_USD }
            if (properties.NOTIFY_URL) { this.NOTIFY_URL = properties.NOTIFY_URL }
            if (properties.extraJson) { this.extraJson = properties.extraJson }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public RET?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public MSG?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public PID?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public ORDER?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public SID?: string|null = ""
    @protobuf.Field.d(6, "string", "optional", )
    public APPID?: string|null = ""
    @protobuf.Field.d(7, "string", "optional", )
    public SITEMID?: string|null = ""
    @protobuf.Field.d(8, "int64", "optional", 0)
    public MID?: number|null = 0
    @protobuf.Field.d(9, "int32", "optional", 0)
    public PMODE?: number|null = 0
    @protobuf.Field.d(10, "string", "optional", )
    public PAMOUNT?: string|null = ""
    @protobuf.Field.d(11, "string", "optional", )
    public ITEMID?: string|null = ""
    @protobuf.Field.d(12, "string", "optional", )
    public PAYCONFID?: string|null = ""
    @protobuf.Field.d(13, "string", "optional", )
    public PAMOUNT_UNIT?: string|null = ""
    @protobuf.Field.d(14, "string", "optional", )
    public PAMOUNT_RATE?: string|null = ""
    @protobuf.Field.d(15, "float", "optional", 0)
    public PAMOUNT_USD?: number|null = 0
    @protobuf.Field.d(16, "string", "optional", )
    public NOTIFY_URL?: string|null = ""
    @protobuf.Field.d(17, "string", "optional", )
    public extraJson?: string|null = ""
}
export interface ICommitMerchandiseV1Req {
    merchandiseId?: number|null
    payChannel?: mp_pay_trade_v1_PayChannel|null
    deviceInfo?: mp_pay_trade_v1_IDeviceInfo
    scene?: string|null
    extraJson?: string|null
}
@protobuf.Type.d("tss_hall_rmbmall_v1_CommitMerchandiseV1Req")
export class CommitMerchandiseV1Req extends protobuf.Message<ICommitMerchandiseV1Req> {
    constructor(properties: Properties<ICommitMerchandiseV1Req>) {
        super(properties);
        if (properties) {
            if (properties.merchandiseId) { this.merchandiseId = properties.merchandiseId }
            if (properties.payChannel) { this.payChannel = properties.payChannel }
            if (properties.deviceInfo) { this.deviceInfo = mp_pay_trade_v1_DeviceInfo.create(properties.deviceInfo) as any }
            if (properties.scene) { this.scene = properties.scene }
            if (properties.extraJson) { this.extraJson = properties.extraJson }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public merchandiseId?: number|null = 0
    @protobuf.Field.d(2, mp_pay_trade_v1_PayChannel, "optional", mp_pay_trade_v1_PayChannel.PayChannelUnknown)
    public payChannel?: mp_pay_trade_v1_PayChannel|null = mp_pay_trade_v1_PayChannel.PayChannelUnknown
    @protobuf.Field.d(3, "mp_pay_trade_v1_DeviceInfo", "optional")
    public deviceInfo?: mp_pay_trade_v1_DeviceInfo|null
    @protobuf.Field.d(4, "string", "optional", )
    public scene?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public extraJson?: string|null = ""
}
export interface ICommitMerchandiseV1Resp {
    charge?: mp_pay_trade_v1_ICharge
}
@protobuf.Type.d("tss_hall_rmbmall_v1_CommitMerchandiseV1Resp")
export class CommitMerchandiseV1Resp extends protobuf.Message<ICommitMerchandiseV1Resp> {
    constructor(properties: Properties<ICommitMerchandiseV1Resp>) {
        super(properties);
        if (properties) {
            if (properties.charge) { this.charge = mp_pay_trade_v1_Charge.create(properties.charge) as any }
        }
	}
    @protobuf.Field.d(1, "mp_pay_trade_v1_Charge", "optional")
    public charge?: mp_pay_trade_v1_Charge|null
}
export interface ICommitMerchandiseResp {
    order?: IPBOrderInfo
    thirdMerchandiseId?: string|null
    proxyUrl?: string|null
}
@protobuf.Type.d("tss_hall_rmbmall_v1_CommitMerchandiseResp")
export class CommitMerchandiseResp extends protobuf.Message<ICommitMerchandiseResp> {
    constructor(properties: Properties<ICommitMerchandiseResp>) {
        super(properties);
        if (properties) {
            if (properties.order) { this.order = PBOrderInfo.create(properties.order) as any }
            if (properties.thirdMerchandiseId) { this.thirdMerchandiseId = properties.thirdMerchandiseId }
            if (properties.proxyUrl) { this.proxyUrl = properties.proxyUrl }
        }
	}
    @protobuf.Field.d(1, "tss_hall_rmbmall_v1_PBOrderInfo", "optional")
    public order?: PBOrderInfo|null
    @protobuf.Field.d(2, "string", "optional", )
    public thirdMerchandiseId?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public proxyUrl?: string|null = ""
}
export interface IPromotion {
    type?: PromotionType|null
    value?: number|null
    promotionGivingPercent?: number|null
    promotionTarget?: PromotionTarget|null
}
@protobuf.Type.d("tss_hall_rmbmall_v1_Promotion")
export class Promotion extends protobuf.Message<IPromotion> {
    constructor(properties: Properties<IPromotion>) {
        super(properties);
        if (properties) {
            if (properties.type) { this.type = properties.type }
            if (properties.value) { this.value = properties.value }
            if (properties.promotionGivingPercent) { this.promotionGivingPercent = properties.promotionGivingPercent }
            if (properties.promotionTarget) { this.promotionTarget = properties.promotionTarget }
        }
	}
    @protobuf.Field.d(1, PromotionType, "optional", PromotionType.PromotionUnknown)
    public type?: PromotionType|null = PromotionType.PromotionUnknown
    @protobuf.Field.d(2, "int64", "optional", 0)
    public value?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public promotionGivingPercent?: number|null = 0
    @protobuf.Field.d(4, PromotionTarget, "optional", PromotionTarget.TargetUnknown)
    public promotionTarget?: PromotionTarget|null = PromotionTarget.TargetUnknown
}
export interface IPresent {
    switch?: tss_common_SwitchState|null
    asset?: tss_common_IAssetItem[]
}
@protobuf.Type.d("tss_hall_rmbmall_v1_Present")
export class Present extends protobuf.Message<IPresent> {
    constructor(properties: Properties<IPresent>) {
        super(properties);
        if (properties) {
            if (properties.switch) { this.switch = properties.switch }
            if (properties.asset) { this.asset = []; properties.asset.forEach((value, index)=>{this.asset[index] = tss_common_AssetItem.create(properties.asset[index]) as any})}
        }
	}
    @protobuf.Field.d(1, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public switch?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
    @protobuf.Field.d(2, "tss_common_AssetItem", "repeated")
    public asset?: tss_common_AssetItem[] = []
}
export interface IRMBMerchandise {
    id?: number|null
    name?: string|null
    pid?: number|null
    pType?: tss_hall_common_ProductType|null
    amount?: number|null
    price?: number|null
    iosMerchandiseId?: string|null
    updateAt?: number|null
    beginAt?: number|null
    endAt?: number|null
    operator?: string|null
    img?: string|null
    priority?: number|null
    promotion?: IPromotion
    desc?: string|null
    applicationId?: string|null
    maxVersion?: number|null
    minVersion?: number|null
    firstBuyPromotion?: IPromotion
    firstTime?: boolean|null
    GenderSpecific?: boolean|null
    genderGift?: IGenderGift
    previewImg?: string|null
    present?: IPresent
    listType?: ListType|null
}
@protobuf.Type.d("tss_hall_rmbmall_v1_RMBMerchandise")
export class RMBMerchandise extends protobuf.Message<IRMBMerchandise> {
    constructor(properties: Properties<IRMBMerchandise>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.name) { this.name = properties.name }
            if (properties.pid) { this.pid = properties.pid }
            if (properties.pType) { this.pType = properties.pType }
            if (properties.amount) { this.amount = properties.amount }
            if (properties.price) { this.price = properties.price }
            if (properties.iosMerchandiseId) { this.iosMerchandiseId = properties.iosMerchandiseId }
            if (properties.updateAt) { this.updateAt = properties.updateAt }
            if (properties.beginAt) { this.beginAt = properties.beginAt }
            if (properties.endAt) { this.endAt = properties.endAt }
            if (properties.operator) { this.operator = properties.operator }
            if (properties.img) { this.img = properties.img }
            if (properties.priority) { this.priority = properties.priority }
            if (properties.promotion) { this.promotion = Promotion.create(properties.promotion) as any }
            if (properties.desc) { this.desc = properties.desc }
            if (properties.applicationId) { this.applicationId = properties.applicationId }
            if (properties.maxVersion) { this.maxVersion = properties.maxVersion }
            if (properties.minVersion) { this.minVersion = properties.minVersion }
            if (properties.firstBuyPromotion) { this.firstBuyPromotion = Promotion.create(properties.firstBuyPromotion) as any }
            if (properties.firstTime) { this.firstTime = properties.firstTime }
            if (properties.GenderSpecific) { this.GenderSpecific = properties.GenderSpecific }
            if (properties.genderGift) { this.genderGift = GenderGift.create(properties.genderGift) as any }
            if (properties.previewImg) { this.previewImg = properties.previewImg }
            if (properties.present) { this.present = Present.create(properties.present) as any }
            if (properties.listType) { this.listType = properties.listType }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public id?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(3, "int64", "optional", 0)
    public pid?: number|null = 0
    @protobuf.Field.d(4, tss_hall_common_ProductType, "optional", tss_hall_common_ProductType.ProductUnknown)
    public pType?: tss_hall_common_ProductType|null = tss_hall_common_ProductType.ProductUnknown
    @protobuf.Field.d(5, "int64", "optional", 0)
    public amount?: number|null = 0
    @protobuf.Field.d(6, "int64", "optional", 0)
    public price?: number|null = 0
    @protobuf.Field.d(7, "string", "optional", )
    public iosMerchandiseId?: string|null = ""
    @protobuf.Field.d(8, "int64", "optional", 0)
    public updateAt?: number|null = 0
    @protobuf.Field.d(9, "int64", "optional", 0)
    public beginAt?: number|null = 0
    @protobuf.Field.d(10, "int64", "optional", 0)
    public endAt?: number|null = 0
    @protobuf.Field.d(11, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(12, "string", "optional", )
    public img?: string|null = ""
    @protobuf.Field.d(13, "int64", "optional", 0)
    public priority?: number|null = 0
    @protobuf.Field.d(14, "tss_hall_rmbmall_v1_Promotion", "optional")
    public promotion?: Promotion|null
    @protobuf.Field.d(15, "string", "optional", )
    public desc?: string|null = ""
    @protobuf.Field.d(16, "string", "optional", )
    public applicationId?: string|null = ""
    @protobuf.Field.d(17, "int64", "optional", 0)
    public maxVersion?: number|null = 0
    @protobuf.Field.d(18, "int64", "optional", 0)
    public minVersion?: number|null = 0
    @protobuf.Field.d(19, "tss_hall_rmbmall_v1_Promotion", "optional")
    public firstBuyPromotion?: Promotion|null
    @protobuf.Field.d(20, "bool", "optional", false)
    public firstTime?: boolean|null = false
    @protobuf.Field.d(21, "bool", "optional", false)
    public GenderSpecific?: boolean|null = false
    @protobuf.Field.d(23, "tss_hall_rmbmall_v1_GenderGift", "optional")
    public genderGift?: GenderGift|null
    @protobuf.Field.d(24, "string", "optional", )
    public previewImg?: string|null = ""
    @protobuf.Field.d(25, "tss_hall_rmbmall_v1_Present", "optional")
    public present?: Present|null
    @protobuf.Field.d(26, ListType, "optional", ListType.ListTypeRMBMall)
    public listType?: ListType|null = ListType.ListTypeRMBMall
}
export interface ICMSListMerchandiseReq {
    page?: number|null
    pageSize?: number|null
    pTypes?: tss_hall_common_ProductType[]
    applicationId?: string|null
    listType?: ListType|null
}
@protobuf.Type.d("tss_hall_rmbmall_v1_CMSListMerchandiseReq")
export class CMSListMerchandiseReq extends protobuf.Message<ICMSListMerchandiseReq> {
    constructor(properties: Properties<ICMSListMerchandiseReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.pTypes) { this.pTypes = []; properties.pTypes.forEach((value, index)=>{this.pTypes[index] = properties.pTypes[index]})}
            if (properties.applicationId) { this.applicationId = properties.applicationId }
            if (properties.listType) { this.listType = properties.listType }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(3, tss_hall_common_ProductType, "repeated", tss_hall_common_ProductType.ProductUnknown)
    public pTypes?: tss_hall_common_ProductType[] = []
    @protobuf.Field.d(4, "string", "optional", )
    public applicationId?: string|null = ""
    @protobuf.Field.d(5, ListType, "optional", ListType.ListTypeRMBMall)
    public listType?: ListType|null = ListType.ListTypeRMBMall
}
export interface ICMSListMerchandiseResp {
    merchandises?: IRMBMerchandise[]
    totalSize?: number|null
}
@protobuf.Type.d("tss_hall_rmbmall_v1_CMSListMerchandiseResp")
export class CMSListMerchandiseResp extends protobuf.Message<ICMSListMerchandiseResp> {
    constructor(properties: Properties<ICMSListMerchandiseResp>) {
        super(properties);
        if (properties) {
            if (properties.merchandises) { this.merchandises = []; properties.merchandises.forEach((value, index)=>{this.merchandises[index] = RMBMerchandise.create(properties.merchandises[index]) as any})}
            if (properties.totalSize) { this.totalSize = properties.totalSize }
        }
	}
    @protobuf.Field.d(1, "tss_hall_rmbmall_v1_RMBMerchandise", "repeated")
    public merchandises?: RMBMerchandise[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public totalSize?: number|null = 0
}
export interface IBatchGetMerchandiseReq {
    ids?: number[]
}
@protobuf.Type.d("tss_hall_rmbmall_v1_BatchGetMerchandiseReq")
export class BatchGetMerchandiseReq extends protobuf.Message<IBatchGetMerchandiseReq> {
    constructor(properties: Properties<IBatchGetMerchandiseReq>) {
        super(properties);
        if (properties) {
            if (properties.ids) { this.ids = []; properties.ids.forEach((value, index)=>{this.ids[index] = properties.ids[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public ids?: number[] = []
}
export interface IBatchGetMerchandiseResp {
    merchandises?: IRMBMerchandise[]
}
@protobuf.Type.d("tss_hall_rmbmall_v1_BatchGetMerchandiseResp")
export class BatchGetMerchandiseResp extends protobuf.Message<IBatchGetMerchandiseResp> {
    constructor(properties: Properties<IBatchGetMerchandiseResp>) {
        super(properties);
        if (properties) {
            if (properties.merchandises) { this.merchandises = []; properties.merchandises.forEach((value, index)=>{this.merchandises[index] = RMBMerchandise.create(properties.merchandises[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_rmbmall_v1_RMBMerchandise", "repeated")
    public merchandises?: RMBMerchandise[] = []
}
export interface IListMerchandiseOrderReq {
    page?: number|null
    pageSize?: number|null
    beginAt?: number|null
    endAt?: number|null
    uid?: number|null
    payChannel?: tss_common_PayChannel|null
    status?: OrderStatus|null
    pType?: tss_hall_common_ProductType|null
}
@protobuf.Type.d("tss_hall_rmbmall_v1_ListMerchandiseOrderReq")
export class ListMerchandiseOrderReq extends protobuf.Message<IListMerchandiseOrderReq> {
    constructor(properties: Properties<IListMerchandiseOrderReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.beginAt) { this.beginAt = properties.beginAt }
            if (properties.endAt) { this.endAt = properties.endAt }
            if (properties.uid) { this.uid = properties.uid }
            if (properties.payChannel) { this.payChannel = properties.payChannel }
            if (properties.status) { this.status = properties.status }
            if (properties.pType) { this.pType = properties.pType }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public beginAt?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public endAt?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(6, tss_common_PayChannel, "optional", tss_common_PayChannel.PayChannelUnknown)
    public payChannel?: tss_common_PayChannel|null = tss_common_PayChannel.PayChannelUnknown
    @protobuf.Field.d(7, OrderStatus, "optional", OrderStatus.OrderStatusUnknown)
    public status?: OrderStatus|null = OrderStatus.OrderStatusUnknown
    @protobuf.Field.d(8, tss_hall_common_ProductType, "optional", tss_hall_common_ProductType.ProductUnknown)
    public pType?: tss_hall_common_ProductType|null = tss_hall_common_ProductType.ProductUnknown
}
export interface IListMerchandiseOrderResp {
    orders?: IOrder[]
}
@protobuf.Type.d("tss_hall_rmbmall_v1_ListMerchandiseOrderResp")
export class ListMerchandiseOrderResp extends protobuf.Message<IListMerchandiseOrderResp> {
    constructor(properties: Properties<IListMerchandiseOrderResp>) {
        super(properties);
        if (properties) {
            if (properties.orders) { this.orders = []; properties.orders.forEach((value, index)=>{this.orders[index] = Order.create(properties.orders[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_rmbmall_v1_Order", "repeated")
    public orders?: Order[] = []
}
export interface IUserMerchandise {
    uid?: number|null
    order?: IOrder
}
@protobuf.Type.d("tss_hall_rmbmall_v1_UserMerchandise")
export class UserMerchandise extends protobuf.Message<IUserMerchandise> {
    constructor(properties: Properties<IUserMerchandise>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.order) { this.order = Order.create(properties.order) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "tss_hall_rmbmall_v1_Order", "optional")
    public order?: Order|null
}
export interface IOrderTimeOutCallbackReq {
    orderId?: string|null
}
@protobuf.Type.d("tss_hall_rmbmall_v1_OrderTimeOutCallbackReq")
export class OrderTimeOutCallbackReq extends protobuf.Message<IOrderTimeOutCallbackReq> {
    constructor(properties: Properties<IOrderTimeOutCallbackReq>) {
        super(properties);
        if (properties) {
            if (properties.orderId) { this.orderId = properties.orderId }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public orderId?: string|null = ""
}
export interface IListMerchandiseResp {
    merchandises?: IRMBMerchandise[]
    totalSize?: number|null
}
@protobuf.Type.d("tss_hall_rmbmall_v1_ListMerchandiseResp")
export class ListMerchandiseResp extends protobuf.Message<IListMerchandiseResp> {
    constructor(properties: Properties<IListMerchandiseResp>) {
        super(properties);
        if (properties) {
            if (properties.merchandises) { this.merchandises = []; properties.merchandises.forEach((value, index)=>{this.merchandises[index] = RMBMerchandise.create(properties.merchandises[index]) as any})}
            if (properties.totalSize) { this.totalSize = properties.totalSize }
        }
	}
    @protobuf.Field.d(1, "tss_hall_rmbmall_v1_RMBMerchandise", "repeated")
    public merchandises?: RMBMerchandise[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public totalSize?: number|null = 0
}
class $RMBMallService extends RpcService {
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
    async BatchSortMerchandise(req: IBatchSortMerchandiseReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = BatchSortMerchandiseReq.create(req)
        this.onBeforeReq("BatchSortMerchandise", data, params)
        const buffer = BatchSortMerchandiseReq.encode(data).finish()
        let [err, pack] = await this.call("BatchSortMerchandise", buffer, params)
        if (err) {
            this.onBeforeResp("BatchSortMerchandise", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("BatchSortMerchandise", err, resp)
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
    async CMSListMerchandise(req: ICMSListMerchandiseReq, params?: RpcParams) : Promise<{err:number, resp:ICMSListMerchandiseResp}> {
        let data = CMSListMerchandiseReq.create(req)
        this.onBeforeReq("CMSListMerchandise", data, params)
        const buffer = CMSListMerchandiseReq.encode(data).finish()
        let [err, pack] = await this.call("CMSListMerchandise", buffer, params)
        if (err) {
            this.onBeforeResp("CMSListMerchandise", err)
            return {err: err, resp: null}
        } else {
            let resp = CMSListMerchandiseResp.decode(pack) as any
            this.onBeforeResp("CMSListMerchandise", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DeleteMerchandise(req: IDeleteMerchandiseReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = DeleteMerchandiseReq.create(req)
        this.onBeforeReq("DeleteMerchandise", data, params)
        const buffer = DeleteMerchandiseReq.encode(data).finish()
        let [err, pack] = await this.call("DeleteMerchandise", buffer, params)
        if (err) {
            this.onBeforeResp("DeleteMerchandise", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("DeleteMerchandise", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DeliverProduct(req: bgo_component_IDeliveryRequest, params?: RpcParams) : Promise<{err:number, resp:bgo_component_IDeliveryResponse}> {
        let data = bgo_component_DeliveryRequest.create(req)
        this.onBeforeReq("DeliverProduct", data, params)
        const buffer = bgo_component_DeliveryRequest.encode(data).finish()
        let [err, pack] = await this.call("DeliverProduct", buffer, params)
        if (err) {
            this.onBeforeResp("DeliverProduct", err)
            return {err: err, resp: null}
        } else {
            let resp = bgo_component_DeliveryResponse.decode(pack) as any
            this.onBeforeResp("DeliverProduct", err, resp)
            return {err: null, resp: resp}
        }
    }
    async CommitMerchandiseOrder(req: ICommitMerchandiseReq, params?: RpcParams) : Promise<{err:number, resp:ICommitMerchandiseResp}> {
        let data = CommitMerchandiseReq.create(req)
        this.onBeforeReq("CommitMerchandiseOrder", data, params)
        const buffer = CommitMerchandiseReq.encode(data).finish()
        let [err, pack] = await this.call("CommitMerchandiseOrder", buffer, params)
        if (err) {
            this.onBeforeResp("CommitMerchandiseOrder", err)
            return {err: err, resp: null}
        } else {
            let resp = CommitMerchandiseResp.decode(pack) as any
            this.onBeforeResp("CommitMerchandiseOrder", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetMerchandise(req: IBatchGetMerchandiseReq, params?: RpcParams) : Promise<{err:number, resp:IBatchGetMerchandiseResp}> {
        let data = BatchGetMerchandiseReq.create(req)
        this.onBeforeReq("BatchGetMerchandise", data, params)
        const buffer = BatchGetMerchandiseReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetMerchandise", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetMerchandise", err)
            return {err: err, resp: null}
        } else {
            let resp = BatchGetMerchandiseResp.decode(pack) as any
            this.onBeforeResp("BatchGetMerchandise", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListMerchandiseOrder(req: IListMerchandiseOrderReq, params?: RpcParams) : Promise<{err:number, resp:IListMerchandiseOrderResp}> {
        let data = ListMerchandiseOrderReq.create(req)
        this.onBeforeReq("ListMerchandiseOrder", data, params)
        const buffer = ListMerchandiseOrderReq.encode(data).finish()
        let [err, pack] = await this.call("ListMerchandiseOrder", buffer, params)
        if (err) {
            this.onBeforeResp("ListMerchandiseOrder", err)
            return {err: err, resp: null}
        } else {
            let resp = ListMerchandiseOrderResp.decode(pack) as any
            this.onBeforeResp("ListMerchandiseOrder", err, resp)
            return {err: null, resp: resp}
        }
    }
    async OrderTimeOutCallback(req: IOrderTimeOutCallbackReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = OrderTimeOutCallbackReq.create(req)
        this.onBeforeReq("OrderTimeOutCallback", data, params)
        const buffer = OrderTimeOutCallbackReq.encode(data).finish()
        let [err, pack] = await this.call("OrderTimeOutCallback", buffer, params)
        if (err) {
            this.onBeforeResp("OrderTimeOutCallback", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("OrderTimeOutCallback", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DeliverProductV1(req: mp_pay_callback_trade_v1_IPaidReq, params?: RpcParams) : Promise<{err:number, resp:mp_pay_callback_trade_v1_IPaidResp}> {
        let data = mp_pay_callback_trade_v1_PaidReq.create(req)
        this.onBeforeReq("DeliverProductV1", data, params)
        const buffer = mp_pay_callback_trade_v1_PaidReq.encode(data).finish()
        let [err, pack] = await this.call("DeliverProductV1", buffer, params)
        if (err) {
            this.onBeforeResp("DeliverProductV1", err)
            return {err: err, resp: null}
        } else {
            let resp = mp_pay_callback_trade_v1_PaidResp.decode(pack) as any
            this.onBeforeResp("DeliverProductV1", err, resp)
            return {err: null, resp: resp}
        }
    }
    async CommitMerchandiseOrderV1(req: ICommitMerchandiseV1Req, params?: RpcParams) : Promise<{err:number, resp:ICommitMerchandiseV1Resp}> {
        let data = CommitMerchandiseV1Req.create(req)
        this.onBeforeReq("CommitMerchandiseOrderV1", data, params)
        const buffer = CommitMerchandiseV1Req.encode(data).finish()
        let [err, pack] = await this.call("CommitMerchandiseOrderV1", buffer, params)
        if (err) {
            this.onBeforeResp("CommitMerchandiseOrderV1", err)
            return {err: err, resp: null}
        } else {
            let resp = CommitMerchandiseV1Resp.decode(pack) as any
            this.onBeforeResp("CommitMerchandiseOrderV1", err, resp)
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
    NotifyUserMerchandise(data: Uint8Array, params: RpcParams) : {msg: IUserMerchandise, eventID?: number} {
        let msg = UserMerchandise.decode(data)
        return {msg: msg}
    }
}
export const RMBMallService = new $RMBMallService({
    name: "tss.hall.rmbmall.v1",
})
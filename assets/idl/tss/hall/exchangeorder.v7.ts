import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  Void as base_Void,IVoid as base_IVoid ,  } from "idl/base/base"
import {  PaidReq as mp_pay_callback_trade_v1_PaidReq,IPaidReq as mp_pay_callback_trade_v1_IPaidReq ,  PaidResp as mp_pay_callback_trade_v1_PaidResp,IPaidResp as mp_pay_callback_trade_v1_IPaidResp ,  } from "idl/mp/pay/callback/trade.v1"
import {  PayChannel as mp_pay_trade_v1_PayChannel ,  DeviceInfo as mp_pay_trade_v1_DeviceInfo,IDeviceInfo as mp_pay_trade_v1_IDeviceInfo ,  Charge as mp_pay_trade_v1_Charge,ICharge as mp_pay_trade_v1_ICharge ,  } from "idl/mp/pay/trade.v1"
import {  CallbackAfterItemQueryReq as mpff_social_callback_im_v2_CallbackAfterItemQueryReq,ICallbackAfterItemQueryReq as mpff_social_callback_im_v2_ICallbackAfterItemQueryReq ,  CallbackAfterItemQueryResp as mpff_social_callback_im_v2_CallbackAfterItemQueryResp,ICallbackAfterItemQueryResp as mpff_social_callback_im_v2_ICallbackAfterItemQueryResp ,  } from "idl/mpff/social/callback/im.v2"
import {  AssetItem as tss_common_AssetItem,IAssetItem as tss_common_IAssetItem ,  SwitchState as tss_common_SwitchState ,  } from "idl/tss/common/common_define"
import {  DeliveryChannelType as tss_hall_common_DeliveryChannelType ,  Address as tss_hall_common_Address,IAddress as tss_hall_common_IAddress ,  Price as tss_hall_common_Price,IPrice as tss_hall_common_IPrice ,  DiscountPrice as tss_hall_common_DiscountPrice,IDiscountPrice as tss_hall_common_IDiscountPrice ,  } from "idl/tss/hall/common/prizemall"
export enum PayState {  
    PayStateUnknown = 0,  
    PayStatePending = 1,  
    PayStateFailed = 2,  
    PayStateSucceeded = 3,  
    PayStateRefunding = 4,  
    PayStateRefundSuccess = 5,  
    PayStateRejectRefund = 6,
}
export enum PaymentType {  
    PaymentTypeKnown = 0,  
    PaymentTypeRMB = 1,  
    PaymentTypeVirtualAsset = 2,
}
export enum DeliveryState {  
    DeliveryStateUnknown = 0,  
    DeliveryStatePending = 1,  
    DeliveryStateWaitReceipt = 2,  
    DeliveryStateReceiptedSuccess = 3,  
    DeliveryStateFailed = 4,
}
export enum CommentState {  
    CommentStateUnknown = 0,  
    CommentStatePending = 1,  
    CommentStateSuccess = 2,  
    CommentStateClose = 3,
}
export enum OrderState {  
    OrderStateUnknown = 0,  
    OrderStateOpen = 1,  
    OrderStateClose = 2,  
    OrderStateSuccess = 3,  
    OrderStateCancel = 4,
}
export enum EventType {  
    EventTypeUnknown = 0,  
    EventTypePaySuccess = 1,  
    EventTypePayFailed = 2,  
    EventTypeCustomerCancel = 3,  
    EventTypeCustomerApplyRefund = 4,  
    EventTypeBusinessRefund = 5,  
    EventTypeBusinessReject = 6,  
    EventTypeDeliverySuccess = 7,  
    EventTypeDeliveryFailed = 8,  
    EventTypeAutoCustomerReceipt = 9,  
    EventTypeCustomerReceipt = 10,  
    EventTypeBusinessReceipt = 11,  
    EventTypeBusinessRejectRefund = 12,  
    EventTypeCApplyAfterSales = 13,  
    EventTypeRefundFinish = 14,  
    EventTypeBusinessCancel = 15,
}
export enum OutBoundEventType {  
    OutBoundEventTypeUnknown = 0,  
    OutBoundEventTypeAutoDelivery = 1,  
    OutBoundEventTypeAutoApplyRefund = 2,  
    OutBoundEventTypeAutoApplyCancelOrder = 3,  
    OutBoundEventTypeCreateOrderSuccess = 4,  
    OutBoundEventTypeAutoRefund = 5,  
    OutBoundEventTypeAutoReceipt = 6,
}
export enum PayRMBMode {  
    PayRMBModeUnknown = 0,  
    PayRMBModeBatch = 1,  
    PayRMBModeSingle = 2,
}
export enum AfterSupportState {  
    AfterSupportStateUnknown = 0,  
    AfterSupportStateNever = 1,  
    AfterSupportStateOpen = 2,  
    AfterSupportStateClosed = 3,
}
export enum SupportType {  
    SupportTypeUnknown = 0,  
    SupportTypeRefund = 1,  
    SupportTypeWrongDistribution = 2,  
    SupportTypeGoodDamaged = 3,
}
export enum ListAfterSupportType {  
    ListAfterSupportTypeUnknown = 0,  
    ListAfterSupportTypeUnDeal = 1,  
    ListAfterSupportTypeIgnored = 2,  
    ListAfterSupportTypeDealed = 3,
}
export interface ICDK {
    ID?: string|null
    password?: string|null
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_CDK")
export class CDK extends protobuf.Message<ICDK> {
    constructor(properties: Properties<ICDK>) {
        super(properties);
        if (properties) {
            if (properties.ID) { this.ID = properties.ID }
            if (properties.password) { this.password = properties.password }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public ID?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public password?: string|null = ""
}
export interface IPackageItem {
    SKUID?: number|null
    amt?: number|null
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_PackageItem")
export class PackageItem extends protobuf.Message<IPackageItem> {
    constructor(properties: Properties<IPackageItem>) {
        super(properties);
        if (properties) {
            if (properties.SKUID) { this.SKUID = properties.SKUID }
            if (properties.amt) { this.amt = properties.amt }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public SKUID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public amt?: number|null = 0
}
export interface IExpressDelivery {
    PackageID?: string|null
    deliveryType?: tss_hall_common_DeliveryChannelType|null
    expressCompany?: string|null
    expressID?: string|null
    CDKs?: ICDK[]
    items?: IPackageItem[]
    receiverAddr?: tss_hall_common_IAddress
    senderAddr?: tss_hall_common_IAddress
    createAt?: number|null
    desc?: string|null
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_ExpressDelivery")
export class ExpressDelivery extends protobuf.Message<IExpressDelivery> {
    constructor(properties: Properties<IExpressDelivery>) {
        super(properties);
        if (properties) {
            if (properties.PackageID) { this.PackageID = properties.PackageID }
            if (properties.deliveryType) { this.deliveryType = properties.deliveryType }
            if (properties.expressCompany) { this.expressCompany = properties.expressCompany }
            if (properties.expressID) { this.expressID = properties.expressID }
            if (properties.CDKs) { this.CDKs = []; properties.CDKs.forEach((value, index)=>{this.CDKs[index] = CDK.create(properties.CDKs[index]) as any})}
            if (properties.items) { this.items = []; properties.items.forEach((value, index)=>{this.items[index] = PackageItem.create(properties.items[index]) as any})}
            if (properties.receiverAddr) { this.receiverAddr = tss_hall_common_Address.create(properties.receiverAddr) as any }
            if (properties.senderAddr) { this.senderAddr = tss_hall_common_Address.create(properties.senderAddr) as any }
            if (properties.createAt) { this.createAt = properties.createAt }
            if (properties.desc) { this.desc = properties.desc }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public PackageID?: string|null = ""
    @protobuf.Field.d(2, tss_hall_common_DeliveryChannelType, "optional", tss_hall_common_DeliveryChannelType.DeliveryChannelTypeUnknown)
    public deliveryType?: tss_hall_common_DeliveryChannelType|null = tss_hall_common_DeliveryChannelType.DeliveryChannelTypeUnknown
    @protobuf.Field.d(3, "string", "optional", )
    public expressCompany?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public expressID?: string|null = ""
    @protobuf.Field.d(5, "tss_hall_exchangeorder_v7_CDK", "repeated")
    public CDKs?: CDK[] = []
    @protobuf.Field.d(6, "tss_hall_exchangeorder_v7_PackageItem", "repeated")
    public items?: PackageItem[] = []
    @protobuf.Field.d(7, "tss_hall_common_Address", "optional")
    public receiverAddr?: tss_hall_common_Address|null
    @protobuf.Field.d(8, "tss_hall_common_Address", "optional")
    public senderAddr?: tss_hall_common_Address|null
    @protobuf.Field.d(9, "int64", "optional", 0)
    public createAt?: number|null = 0
    @protobuf.Field.d(10, "string", "optional", )
    public desc?: string|null = ""
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
    discountPrice?: tss_hall_common_IDiscountPrice
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_Payment")
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
            if (properties.discountPrice) { this.discountPrice = tss_hall_common_DiscountPrice.create(properties.discountPrice) as any }
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
    @protobuf.Field.d(9, "tss_hall_common_DiscountPrice", "optional")
    public discountPrice?: tss_hall_common_DiscountPrice|null
}
export interface IOrderItem {
    SKUID?: number|null
    SPUID?: number|null
    name?: string|null
    image?: string|null
    spec?: string|null
    originUnit?: tss_hall_common_IPrice
    actualUnit?: tss_hall_common_IPrice
    amount?: number|null
    totalPrice?: tss_hall_common_IPrice
    worth?: number|null
    deliveryType?: tss_hall_common_DeliveryChannelType|null
    asset?: tss_common_IAssetItem
    commentSwitch?: tss_common_SwitchState|null
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_OrderItem")
export class OrderItem extends protobuf.Message<IOrderItem> {
    constructor(properties: Properties<IOrderItem>) {
        super(properties);
        if (properties) {
            if (properties.SKUID) { this.SKUID = properties.SKUID }
            if (properties.SPUID) { this.SPUID = properties.SPUID }
            if (properties.name) { this.name = properties.name }
            if (properties.image) { this.image = properties.image }
            if (properties.spec) { this.spec = properties.spec }
            if (properties.originUnit) { this.originUnit = tss_hall_common_Price.create(properties.originUnit) as any }
            if (properties.actualUnit) { this.actualUnit = tss_hall_common_Price.create(properties.actualUnit) as any }
            if (properties.amount) { this.amount = properties.amount }
            if (properties.totalPrice) { this.totalPrice = tss_hall_common_Price.create(properties.totalPrice) as any }
            if (properties.worth) { this.worth = properties.worth }
            if (properties.deliveryType) { this.deliveryType = properties.deliveryType }
            if (properties.asset) { this.asset = tss_common_AssetItem.create(properties.asset) as any }
            if (properties.commentSwitch) { this.commentSwitch = properties.commentSwitch }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public SKUID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public SPUID?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public image?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public spec?: string|null = ""
    @protobuf.Field.d(6, "tss_hall_common_Price", "optional")
    public originUnit?: tss_hall_common_Price|null
    @protobuf.Field.d(7, "tss_hall_common_Price", "optional")
    public actualUnit?: tss_hall_common_Price|null
    @protobuf.Field.d(8, "int64", "optional", 0)
    public amount?: number|null = 0
    @protobuf.Field.d(9, "tss_hall_common_Price", "optional")
    public totalPrice?: tss_hall_common_Price|null
    @protobuf.Field.d(10, "int64", "optional", 0)
    public worth?: number|null = 0
    @protobuf.Field.d(11, tss_hall_common_DeliveryChannelType, "optional", tss_hall_common_DeliveryChannelType.DeliveryChannelTypeUnknown)
    public deliveryType?: tss_hall_common_DeliveryChannelType|null = tss_hall_common_DeliveryChannelType.DeliveryChannelTypeUnknown
    @protobuf.Field.d(12, "tss_common_AssetItem", "optional")
    public asset?: tss_common_AssetItem|null
    @protobuf.Field.d(13, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public commentSwitch?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
}
export interface IAfterSupportComment {
    from?: number|null
    to?: number|null
    content?: string|null
    images?: string[]
    createAt?: number|null
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_AfterSupportComment")
export class AfterSupportComment extends protobuf.Message<IAfterSupportComment> {
    constructor(properties: Properties<IAfterSupportComment>) {
        super(properties);
        if (properties) {
            if (properties.from) { this.from = properties.from }
            if (properties.to) { this.to = properties.to }
            if (properties.content) { this.content = properties.content }
            if (properties.images) { this.images = []; properties.images.forEach((value, index)=>{this.images[index] = properties.images[index]})}
            if (properties.createAt) { this.createAt = properties.createAt }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public from?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public to?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public content?: string|null = ""
    @protobuf.Field.d(4, "string", "repeated", [])
    public images?: string[] = []
    @protobuf.Field.d(5, "int64", "optional", 0)
    public createAt?: number|null = 0
}
export interface IAfterSupportOrder {
    orderID?: string|null
    uId?: number|null
    userNickname?: string|null
    supportType?: SupportType|null
    isGetGoods?: boolean|null
    userUnreadCommentNum?: number|null
    comment?: IAfterSupportComment[]
    toCheckType?: ListAfterSupportType|null
    operator?: string|null
    createAt?: number|null
    updateAt?: number|null
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_AfterSupportOrder")
export class AfterSupportOrder extends protobuf.Message<IAfterSupportOrder> {
    constructor(properties: Properties<IAfterSupportOrder>) {
        super(properties);
        if (properties) {
            if (properties.orderID) { this.orderID = properties.orderID }
            if (properties.uId) { this.uId = properties.uId }
            if (properties.userNickname) { this.userNickname = properties.userNickname }
            if (properties.supportType) { this.supportType = properties.supportType }
            if (properties.isGetGoods) { this.isGetGoods = properties.isGetGoods }
            if (properties.userUnreadCommentNum) { this.userUnreadCommentNum = properties.userUnreadCommentNum }
            if (properties.comment) { this.comment = []; properties.comment.forEach((value, index)=>{this.comment[index] = AfterSupportComment.create(properties.comment[index]) as any})}
            if (properties.toCheckType) { this.toCheckType = properties.toCheckType }
            if (properties.operator) { this.operator = properties.operator }
            if (properties.createAt) { this.createAt = properties.createAt }
            if (properties.updateAt) { this.updateAt = properties.updateAt }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public orderID?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public uId?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public userNickname?: string|null = ""
    @protobuf.Field.d(4, SupportType, "optional", SupportType.SupportTypeUnknown)
    public supportType?: SupportType|null = SupportType.SupportTypeUnknown
    @protobuf.Field.d(5, "bool", "optional", false)
    public isGetGoods?: boolean|null = false
    @protobuf.Field.d(7, "int32", "optional", 0)
    public userUnreadCommentNum?: number|null = 0
    @protobuf.Field.d(8, "tss_hall_exchangeorder_v7_AfterSupportComment", "repeated")
    public comment?: AfterSupportComment[] = []
    @protobuf.Field.d(10, ListAfterSupportType, "optional", ListAfterSupportType.ListAfterSupportTypeUnknown)
    public toCheckType?: ListAfterSupportType|null = ListAfterSupportType.ListAfterSupportTypeUnknown
    @protobuf.Field.d(11, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(12, "int64", "optional", 0)
    public createAt?: number|null = 0
    @protobuf.Field.d(13, "int64", "optional", 0)
    public updateAt?: number|null = 0
}
export interface IExchangeTopUpProp {
    appIds?: string[]
    assetTo?: tss_common_IAssetItem
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_ExchangeTopUpProp")
export class ExchangeTopUpProp extends protobuf.Message<IExchangeTopUpProp> {
    constructor(properties: Properties<IExchangeTopUpProp>) {
        super(properties);
        if (properties) {
            if (properties.appIds) { this.appIds = []; properties.appIds.forEach((value, index)=>{this.appIds[index] = properties.appIds[index]})}
            if (properties.assetTo) { this.assetTo = tss_common_AssetItem.create(properties.assetTo) as any }
        }
	}
    @protobuf.Field.d(1, "string", "repeated", [])
    public appIds?: string[] = []
    @protobuf.Field.d(2, "tss_common_AssetItem", "optional")
    public assetTo?: tss_common_AssetItem|null
}
export interface IExchangeTopUpPropConf {
    assetToDefault?: tss_common_IAssetItem
    assetToWithAppIds?: IExchangeTopUpProp[]
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_ExchangeTopUpPropConf")
export class ExchangeTopUpPropConf extends protobuf.Message<IExchangeTopUpPropConf> {
    constructor(properties: Properties<IExchangeTopUpPropConf>) {
        super(properties);
        if (properties) {
            if (properties.assetToDefault) { this.assetToDefault = tss_common_AssetItem.create(properties.assetToDefault) as any }
            if (properties.assetToWithAppIds) { this.assetToWithAppIds = []; properties.assetToWithAppIds.forEach((value, index)=>{this.assetToWithAppIds[index] = ExchangeTopUpProp.create(properties.assetToWithAppIds[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_common_AssetItem", "optional")
    public assetToDefault?: tss_common_AssetItem|null
    @protobuf.Field.d(2, "tss_hall_exchangeorder_v7_ExchangeTopUpProp", "repeated")
    public assetToWithAppIds?: ExchangeTopUpProp[] = []
}
export interface IOrder {
    ID?: string|null
    UID?: number|null
    RMBPayment?: IPayment
    assetPayments?: IPayment[]
    express?: IExpressDelivery[]
    orderState?: OrderState|null
    commentState?: CommentState|null
    deliveryState?: DeliveryState|null
    payState?: PayState|null
    orderItem?: IOrderItem[]
    createAt?: number|null
    updateAt?: number|null
    receiverAddr?: tss_hall_common_IAddress
    postPayment?: IPayment
    batchID?: string|null
    eventFlow?: { [k: string]: string|null }
    payTimeOutAt?: number|null
    isBatchOrder?: boolean|null
    afterSupportState?: AfterSupportState|null
    supplierID?: string|null
    token?: string|null
    supplierAddr?: tss_hall_common_IAddress
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_Order")
export class Order extends protobuf.Message<IOrder> {
    constructor(properties: Properties<IOrder>) {
        super(properties);
        if (properties) {
            if (properties.ID) { this.ID = properties.ID }
            if (properties.UID) { this.UID = properties.UID }
            if (properties.RMBPayment) { this.RMBPayment = Payment.create(properties.RMBPayment) as any }
            if (properties.assetPayments) { this.assetPayments = []; properties.assetPayments.forEach((value, index)=>{this.assetPayments[index] = Payment.create(properties.assetPayments[index]) as any})}
            if (properties.express) { this.express = []; properties.express.forEach((value, index)=>{this.express[index] = ExpressDelivery.create(properties.express[index]) as any})}
            if (properties.orderState) { this.orderState = properties.orderState }
            if (properties.commentState) { this.commentState = properties.commentState }
            if (properties.deliveryState) { this.deliveryState = properties.deliveryState }
            if (properties.payState) { this.payState = properties.payState }
            if (properties.orderItem) { this.orderItem = []; properties.orderItem.forEach((value, index)=>{this.orderItem[index] = OrderItem.create(properties.orderItem[index]) as any})}
            if (properties.createAt) { this.createAt = properties.createAt }
            if (properties.updateAt) { this.updateAt = properties.updateAt }
            if (properties.receiverAddr) { this.receiverAddr = tss_hall_common_Address.create(properties.receiverAddr) as any }
            if (properties.postPayment) { this.postPayment = Payment.create(properties.postPayment) as any }
            if (properties.batchID) { this.batchID = properties.batchID }
            if (properties.eventFlow) { this.eventFlow = properties.eventFlow }
            if (properties.payTimeOutAt) { this.payTimeOutAt = properties.payTimeOutAt }
            if (properties.isBatchOrder) { this.isBatchOrder = properties.isBatchOrder }
            if (properties.afterSupportState) { this.afterSupportState = properties.afterSupportState }
            if (properties.supplierID) { this.supplierID = properties.supplierID }
            if (properties.token) { this.token = properties.token }
            if (properties.supplierAddr) { this.supplierAddr = tss_hall_common_Address.create(properties.supplierAddr) as any }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public ID?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public UID?: number|null = 0
    @protobuf.Field.d(3, "tss_hall_exchangeorder_v7_Payment", "optional")
    public RMBPayment?: Payment|null
    @protobuf.Field.d(4, "tss_hall_exchangeorder_v7_Payment", "repeated")
    public assetPayments?: Payment[] = []
    @protobuf.Field.d(5, "tss_hall_exchangeorder_v7_ExpressDelivery", "repeated")
    public express?: ExpressDelivery[] = []
    @protobuf.Field.d(6, OrderState, "optional", OrderState.OrderStateUnknown)
    public orderState?: OrderState|null = OrderState.OrderStateUnknown
    @protobuf.Field.d(7, CommentState, "optional", CommentState.CommentStateUnknown)
    public commentState?: CommentState|null = CommentState.CommentStateUnknown
    @protobuf.Field.d(8, DeliveryState, "optional", DeliveryState.DeliveryStateUnknown)
    public deliveryState?: DeliveryState|null = DeliveryState.DeliveryStateUnknown
    @protobuf.Field.d(9, PayState, "optional", PayState.PayStateUnknown)
    public payState?: PayState|null = PayState.PayStateUnknown
    @protobuf.Field.d(10, "tss_hall_exchangeorder_v7_OrderItem", "repeated")
    public orderItem?: OrderItem[] = []
    @protobuf.Field.d(11, "int64", "optional", 0)
    public createAt?: number|null = 0
    @protobuf.Field.d(12, "int64", "optional", 0)
    public updateAt?: number|null = 0
    @protobuf.Field.d(13, "tss_hall_common_Address", "optional")
    public receiverAddr?: tss_hall_common_Address|null
    @protobuf.Field.d(14, "tss_hall_exchangeorder_v7_Payment", "optional")
    public postPayment?: Payment|null
    @protobuf.Field.d(15, "string", "optional", )
    public batchID?: string|null = ""
    @protobuf.MapField.d(16, "string", "string")
    public eventFlow?: { [k: string]: string|null } = {}
    @protobuf.Field.d(17, "int64", "optional", 0)
    public payTimeOutAt?: number|null = 0
    @protobuf.Field.d(18, "bool", "optional", false)
    public isBatchOrder?: boolean|null = false
    @protobuf.Field.d(19, AfterSupportState, "optional", AfterSupportState.AfterSupportStateUnknown)
    public afterSupportState?: AfterSupportState|null = AfterSupportState.AfterSupportStateUnknown
    @protobuf.Field.d(20, "string", "optional", )
    public supplierID?: string|null = ""
    @protobuf.Field.d(21, "string", "optional", )
    public token?: string|null = ""
    @protobuf.Field.d(22, "tss_hall_common_Address", "optional")
    public supplierAddr?: tss_hall_common_Address|null
}
export interface ICommitOrder {
    orderItem?: IOrderItem[]
    totalPrice?: IPayment[]
    addr?: tss_hall_common_IAddress
    postPayment?: IPayment
    supplierID?: string|null
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_CommitOrder")
export class CommitOrder extends protobuf.Message<ICommitOrder> {
    constructor(properties: Properties<ICommitOrder>) {
        super(properties);
        if (properties) {
            if (properties.orderItem) { this.orderItem = []; properties.orderItem.forEach((value, index)=>{this.orderItem[index] = OrderItem.create(properties.orderItem[index]) as any})}
            if (properties.totalPrice) { this.totalPrice = []; properties.totalPrice.forEach((value, index)=>{this.totalPrice[index] = Payment.create(properties.totalPrice[index]) as any})}
            if (properties.addr) { this.addr = tss_hall_common_Address.create(properties.addr) as any }
            if (properties.postPayment) { this.postPayment = Payment.create(properties.postPayment) as any }
            if (properties.supplierID) { this.supplierID = properties.supplierID }
        }
	}
    @protobuf.Field.d(1, "tss_hall_exchangeorder_v7_OrderItem", "repeated")
    public orderItem?: OrderItem[] = []
    @protobuf.Field.d(2, "tss_hall_exchangeorder_v7_Payment", "repeated")
    public totalPrice?: Payment[] = []
    @protobuf.Field.d(3, "tss_hall_common_Address", "optional")
    public addr?: tss_hall_common_Address|null
    @protobuf.Field.d(4, "tss_hall_exchangeorder_v7_Payment", "optional")
    public postPayment?: Payment|null
    @protobuf.Field.d(5, "string", "optional", )
    public supplierID?: string|null = ""
}
export interface ICommitOrderReq {
    order?: ICommitOrder
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_CommitOrderReq")
export class CommitOrderReq extends protobuf.Message<ICommitOrderReq> {
    constructor(properties: Properties<ICommitOrderReq>) {
        super(properties);
        if (properties) {
            if (properties.order) { this.order = CommitOrder.create(properties.order) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_exchangeorder_v7_CommitOrder", "optional")
    public order?: CommitOrder|null
}
export interface ICommitOrderResp {
    orders?: IOrder
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_CommitOrderResp")
export class CommitOrderResp extends protobuf.Message<ICommitOrderResp> {
    constructor(properties: Properties<ICommitOrderResp>) {
        super(properties);
        if (properties) {
            if (properties.orders) { this.orders = Order.create(properties.orders) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_exchangeorder_v7_Order", "optional")
    public orders?: Order|null
}
export interface IBatchCommitOrderReq {
    orders?: ICommitOrder[]
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_BatchCommitOrderReq")
export class BatchCommitOrderReq extends protobuf.Message<IBatchCommitOrderReq> {
    constructor(properties: Properties<IBatchCommitOrderReq>) {
        super(properties);
        if (properties) {
            if (properties.orders) { this.orders = []; properties.orders.forEach((value, index)=>{this.orders[index] = CommitOrder.create(properties.orders[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_exchangeorder_v7_CommitOrder", "repeated")
    public orders?: CommitOrder[] = []
}
export interface IBatchCommitOrderResp {
    orders?: IOrder[]
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_BatchCommitOrderResp")
export class BatchCommitOrderResp extends protobuf.Message<IBatchCommitOrderResp> {
    constructor(properties: Properties<IBatchCommitOrderResp>) {
        super(properties);
        if (properties) {
            if (properties.orders) { this.orders = []; properties.orders.forEach((value, index)=>{this.orders[index] = Order.create(properties.orders[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_exchangeorder_v7_Order", "repeated")
    public orders?: Order[] = []
}
export interface IGetOrderReq {
    orderID?: string|null
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_GetOrderReq")
export class GetOrderReq extends protobuf.Message<IGetOrderReq> {
    constructor(properties: Properties<IGetOrderReq>) {
        super(properties);
        if (properties) {
            if (properties.orderID) { this.orderID = properties.orderID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public orderID?: string|null = ""
}
export interface IGetOrderResp {
    order?: IOrder
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_GetOrderResp")
export class GetOrderResp extends protobuf.Message<IGetOrderResp> {
    constructor(properties: Properties<IGetOrderResp>) {
        super(properties);
        if (properties) {
            if (properties.order) { this.order = Order.create(properties.order) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_exchangeorder_v7_Order", "optional")
    public order?: Order|null
}
export interface ISaveOrderReq {
    order?: IOrder
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_SaveOrderReq")
export class SaveOrderReq extends protobuf.Message<ISaveOrderReq> {
    constructor(properties: Properties<ISaveOrderReq>) {
        super(properties);
        if (properties) {
            if (properties.order) { this.order = Order.create(properties.order) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_exchangeorder_v7_Order", "optional")
    public order?: Order|null
}
export interface ISaveOrderResp {
    order?: IOrder
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_SaveOrderResp")
export class SaveOrderResp extends protobuf.Message<ISaveOrderResp> {
    constructor(properties: Properties<ISaveOrderResp>) {
        super(properties);
        if (properties) {
            if (properties.order) { this.order = Order.create(properties.order) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_exchangeorder_v7_Order", "optional")
    public order?: Order|null
}
export interface IListOrderReq {
    uid?: number|null
    beginAt?: number|null
    endAt?: number|null
    payState?: PayState|null
    deliveryState?: DeliveryState|null
    commentState?: CommentState|null
    page?: number|null
    pageSize?: number|null
    deliveryType?: tss_hall_common_DeliveryChannelType|null
    orderState?: OrderState|null
    orderId?: string|null
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_ListOrderReq")
export class ListOrderReq extends protobuf.Message<IListOrderReq> {
    constructor(properties: Properties<IListOrderReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.beginAt) { this.beginAt = properties.beginAt }
            if (properties.endAt) { this.endAt = properties.endAt }
            if (properties.payState) { this.payState = properties.payState }
            if (properties.deliveryState) { this.deliveryState = properties.deliveryState }
            if (properties.commentState) { this.commentState = properties.commentState }
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.deliveryType) { this.deliveryType = properties.deliveryType }
            if (properties.orderState) { this.orderState = properties.orderState }
            if (properties.orderId) { this.orderId = properties.orderId }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public beginAt?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public endAt?: number|null = 0
    @protobuf.Field.d(4, PayState, "optional", PayState.PayStateUnknown)
    public payState?: PayState|null = PayState.PayStateUnknown
    @protobuf.Field.d(5, DeliveryState, "optional", DeliveryState.DeliveryStateUnknown)
    public deliveryState?: DeliveryState|null = DeliveryState.DeliveryStateUnknown
    @protobuf.Field.d(6, CommentState, "optional", CommentState.CommentStateUnknown)
    public commentState?: CommentState|null = CommentState.CommentStateUnknown
    @protobuf.Field.d(7, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(8, "int64", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(9, tss_hall_common_DeliveryChannelType, "optional", tss_hall_common_DeliveryChannelType.DeliveryChannelTypeUnknown)
    public deliveryType?: tss_hall_common_DeliveryChannelType|null = tss_hall_common_DeliveryChannelType.DeliveryChannelTypeUnknown
    @protobuf.Field.d(10, OrderState, "optional", OrderState.OrderStateUnknown)
    public orderState?: OrderState|null = OrderState.OrderStateUnknown
    @protobuf.Field.d(11, "string", "optional", )
    public orderId?: string|null = ""
}
export interface IListOrderResp {
    orders?: IOrder[]
    total?: number|null
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_ListOrderResp")
export class ListOrderResp extends protobuf.Message<IListOrderResp> {
    constructor(properties: Properties<IListOrderResp>) {
        super(properties);
        if (properties) {
            if (properties.orders) { this.orders = []; properties.orders.forEach((value, index)=>{this.orders[index] = Order.create(properties.orders[index]) as any})}
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "tss_hall_exchangeorder_v7_Order", "repeated")
    public orders?: Order[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public total?: number|null = 0
}
export interface IPayRMBReq {
    batchID?: string|null
    payChannel?: mp_pay_trade_v1_PayChannel|null
    uid?: number|null
    deviceInfo?: mp_pay_trade_v1_IDeviceInfo
    extra?: string|null
    orderID?: string|null
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_PayRMBReq")
export class PayRMBReq extends protobuf.Message<IPayRMBReq> {
    constructor(properties: Properties<IPayRMBReq>) {
        super(properties);
        if (properties) {
            if (properties.batchID) { this.batchID = properties.batchID }
            if (properties.payChannel) { this.payChannel = properties.payChannel }
            if (properties.uid) { this.uid = properties.uid }
            if (properties.deviceInfo) { this.deviceInfo = mp_pay_trade_v1_DeviceInfo.create(properties.deviceInfo) as any }
            if (properties.extra) { this.extra = properties.extra }
            if (properties.orderID) { this.orderID = properties.orderID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public batchID?: string|null = ""
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
@protobuf.Type.d("tss_hall_exchangeorder_v7_PayRMBResp")
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
export interface IDeliverOrderReq {
    expressID?: string|null
    expressCompanyName?: string|null
    cdks?: ICDK[]
    items?: IPackageItem[]
    batchID?: string|null
    orderID?: string|null
    desc?: string|null
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_DeliverOrderReq")
export class DeliverOrderReq extends protobuf.Message<IDeliverOrderReq> {
    constructor(properties: Properties<IDeliverOrderReq>) {
        super(properties);
        if (properties) {
            if (properties.expressID) { this.expressID = properties.expressID }
            if (properties.expressCompanyName) { this.expressCompanyName = properties.expressCompanyName }
            if (properties.cdks) { this.cdks = []; properties.cdks.forEach((value, index)=>{this.cdks[index] = CDK.create(properties.cdks[index]) as any})}
            if (properties.items) { this.items = []; properties.items.forEach((value, index)=>{this.items[index] = PackageItem.create(properties.items[index]) as any})}
            if (properties.batchID) { this.batchID = properties.batchID }
            if (properties.orderID) { this.orderID = properties.orderID }
            if (properties.desc) { this.desc = properties.desc }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public expressID?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public expressCompanyName?: string|null = ""
    @protobuf.Field.d(3, "tss_hall_exchangeorder_v7_CDK", "repeated")
    public cdks?: CDK[] = []
    @protobuf.Field.d(4, "tss_hall_exchangeorder_v7_PackageItem", "repeated")
    public items?: PackageItem[] = []
    @protobuf.Field.d(5, "string", "optional", )
    public batchID?: string|null = ""
    @protobuf.Field.d(6, "string", "optional", )
    public orderID?: string|null = ""
    @protobuf.Field.d(7, "string", "optional", )
    public desc?: string|null = ""
}
export interface IDeliverOrderByCustomerReq {
    expressID?: string|null
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_DeliverOrderByCustomerReq")
export class DeliverOrderByCustomerReq extends protobuf.Message<IDeliverOrderByCustomerReq> {
    constructor(properties: Properties<IDeliverOrderByCustomerReq>) {
        super(properties);
        if (properties) {
            if (properties.expressID) { this.expressID = properties.expressID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public expressID?: string|null = ""
}
export interface IReceiptByCustomerReq {
    orderID?: string|null
    batchID?: string|null
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_ReceiptByCustomerReq")
export class ReceiptByCustomerReq extends protobuf.Message<IReceiptByCustomerReq> {
    constructor(properties: Properties<IReceiptByCustomerReq>) {
        super(properties);
        if (properties) {
            if (properties.orderID) { this.orderID = properties.orderID }
            if (properties.batchID) { this.batchID = properties.batchID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public orderID?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public batchID?: string|null = ""
}
export interface IReceiptByBusinessReq {
    orderID?: string|null
    batchID?: string|null
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_ReceiptByBusinessReq")
export class ReceiptByBusinessReq extends protobuf.Message<IReceiptByBusinessReq> {
    constructor(properties: Properties<IReceiptByBusinessReq>) {
        super(properties);
        if (properties) {
            if (properties.orderID) { this.orderID = properties.orderID }
            if (properties.batchID) { this.batchID = properties.batchID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public orderID?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public batchID?: string|null = ""
}
export interface IConfirmOrderReq {
    orderID?: string|null
    batchID?: string|null
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_ConfirmOrderReq")
export class ConfirmOrderReq extends protobuf.Message<IConfirmOrderReq> {
    constructor(properties: Properties<IConfirmOrderReq>) {
        super(properties);
        if (properties) {
            if (properties.orderID) { this.orderID = properties.orderID }
            if (properties.batchID) { this.batchID = properties.batchID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public orderID?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public batchID?: string|null = ""
}
export interface IApplyRefundOrderReq {
    orderID?: string|null
    batchID?: string|null
    reason?: string|null
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_ApplyRefundOrderReq")
export class ApplyRefundOrderReq extends protobuf.Message<IApplyRefundOrderReq> {
    constructor(properties: Properties<IApplyRefundOrderReq>) {
        super(properties);
        if (properties) {
            if (properties.orderID) { this.orderID = properties.orderID }
            if (properties.batchID) { this.batchID = properties.batchID }
            if (properties.reason) { this.reason = properties.reason }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public orderID?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public batchID?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public reason?: string|null = ""
}
export interface IApplyCancelOrderReq {
    orderID?: string|null
    batchID?: string|null
    reason?: string|null
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_ApplyCancelOrderReq")
export class ApplyCancelOrderReq extends protobuf.Message<IApplyCancelOrderReq> {
    constructor(properties: Properties<IApplyCancelOrderReq>) {
        super(properties);
        if (properties) {
            if (properties.orderID) { this.orderID = properties.orderID }
            if (properties.batchID) { this.batchID = properties.batchID }
            if (properties.reason) { this.reason = properties.reason }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public orderID?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public batchID?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public reason?: string|null = ""
}
export interface IRejectApplyReq {
    orderID?: string|null
    batchID?: string|null
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_RejectApplyReq")
export class RejectApplyReq extends protobuf.Message<IRejectApplyReq> {
    constructor(properties: Properties<IRejectApplyReq>) {
        super(properties);
        if (properties) {
            if (properties.orderID) { this.orderID = properties.orderID }
            if (properties.batchID) { this.batchID = properties.batchID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public orderID?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public batchID?: string|null = ""
}
export interface ITopupCallbackReq {
    orderID?: string|null
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_TopupCallbackReq")
export class TopupCallbackReq extends protobuf.Message<ITopupCallbackReq> {
    constructor(properties: Properties<ITopupCallbackReq>) {
        super(properties);
        if (properties) {
            if (properties.orderID) { this.orderID = properties.orderID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public orderID?: string|null = ""
}
export interface IRejectRefundReq {
    orderID?: string|null
    batchID?: string|null
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_RejectRefundReq")
export class RejectRefundReq extends protobuf.Message<IRejectRefundReq> {
    constructor(properties: Properties<IRejectRefundReq>) {
        super(properties);
        if (properties) {
            if (properties.orderID) { this.orderID = properties.orderID }
            if (properties.batchID) { this.batchID = properties.batchID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public orderID?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public batchID?: string|null = ""
}
export interface IModifyReceiveAddrReq {
    batchID?: string|null
    orderID?: string|null
    addr?: tss_hall_common_IAddress
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_ModifyReceiveAddrReq")
export class ModifyReceiveAddrReq extends protobuf.Message<IModifyReceiveAddrReq> {
    constructor(properties: Properties<IModifyReceiveAddrReq>) {
        super(properties);
        if (properties) {
            if (properties.batchID) { this.batchID = properties.batchID }
            if (properties.orderID) { this.orderID = properties.orderID }
            if (properties.addr) { this.addr = tss_hall_common_Address.create(properties.addr) as any }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public batchID?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public orderID?: string|null = ""
    @protobuf.Field.d(3, "tss_hall_common_Address", "optional")
    public addr?: tss_hall_common_Address|null
}
export interface ITopUpOrderFailedReq {
    orderID?: string|null
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_TopUpOrderFailedReq")
export class TopUpOrderFailedReq extends protobuf.Message<ITopUpOrderFailedReq> {
    constructor(properties: Properties<ITopUpOrderFailedReq>) {
        super(properties);
        if (properties) {
            if (properties.orderID) { this.orderID = properties.orderID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public orderID?: string|null = ""
}
export interface ITopUpOrderSucceededReq {
    orderID?: string|null
    balance?: string|null
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_TopUpOrderSucceededReq")
export class TopUpOrderSucceededReq extends protobuf.Message<ITopUpOrderSucceededReq> {
    constructor(properties: Properties<ITopUpOrderSucceededReq>) {
        super(properties);
        if (properties) {
            if (properties.orderID) { this.orderID = properties.orderID }
            if (properties.balance) { this.balance = properties.balance }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public orderID?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public balance?: string|null = ""
}
export interface IDeleteOrderReq {
    orderID?: string|null
    batchID?: string|null
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_DeleteOrderReq")
export class DeleteOrderReq extends protobuf.Message<IDeleteOrderReq> {
    constructor(properties: Properties<IDeleteOrderReq>) {
        super(properties);
        if (properties) {
            if (properties.orderID) { this.orderID = properties.orderID }
            if (properties.batchID) { this.batchID = properties.batchID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public orderID?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public batchID?: string|null = ""
}
export interface IPayTimeOutCallbackReq {
    batchID?: string|null
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_PayTimeOutCallbackReq")
export class PayTimeOutCallbackReq extends protobuf.Message<IPayTimeOutCallbackReq> {
    constructor(properties: Properties<IPayTimeOutCallbackReq>) {
        super(properties);
        if (properties) {
            if (properties.batchID) { this.batchID = properties.batchID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public batchID?: string|null = ""
}
export interface ICountOrderResp {
    PayStatePending?: number|null
    DeliveryStatePending?: number|null
    DeliveryStateWaitReceipt?: number|null
    CommentStatePending?: number|null
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_CountOrderResp")
export class CountOrderResp extends protobuf.Message<ICountOrderResp> {
    constructor(properties: Properties<ICountOrderResp>) {
        super(properties);
        if (properties) {
            if (properties.PayStatePending) { this.PayStatePending = properties.PayStatePending }
            if (properties.DeliveryStatePending) { this.DeliveryStatePending = properties.DeliveryStatePending }
            if (properties.DeliveryStateWaitReceipt) { this.DeliveryStateWaitReceipt = properties.DeliveryStateWaitReceipt }
            if (properties.CommentStatePending) { this.CommentStatePending = properties.CommentStatePending }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public PayStatePending?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public DeliveryStatePending?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public DeliveryStateWaitReceipt?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public CommentStatePending?: number|null = 0
}
export interface IReceiptTimeOutCallbackReq {
    batchID?: string|null
    orderID?: string|null
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_ReceiptTimeOutCallbackReq")
export class ReceiptTimeOutCallbackReq extends protobuf.Message<IReceiptTimeOutCallbackReq> {
    constructor(properties: Properties<IReceiptTimeOutCallbackReq>) {
        super(properties);
        if (properties) {
            if (properties.batchID) { this.batchID = properties.batchID }
            if (properties.orderID) { this.orderID = properties.orderID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public batchID?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public orderID?: string|null = ""
}
export interface ICancelOrderByBusinessReq {
    batchID?: string|null
    orderID?: string|null
    reason?: string|null
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_CancelOrderByBusinessReq")
export class CancelOrderByBusinessReq extends protobuf.Message<ICancelOrderByBusinessReq> {
    constructor(properties: Properties<ICancelOrderByBusinessReq>) {
        super(properties);
        if (properties) {
            if (properties.batchID) { this.batchID = properties.batchID }
            if (properties.orderID) { this.orderID = properties.orderID }
            if (properties.reason) { this.reason = properties.reason }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public batchID?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public orderID?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public reason?: string|null = ""
}
export interface IUpdateOrderCommentStateReq {
    orderID?: string|null
    UID?: number|null
    state?: CommentState|null
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_UpdateOrderCommentStateReq")
export class UpdateOrderCommentStateReq extends protobuf.Message<IUpdateOrderCommentStateReq> {
    constructor(properties: Properties<IUpdateOrderCommentStateReq>) {
        super(properties);
        if (properties) {
            if (properties.orderID) { this.orderID = properties.orderID }
            if (properties.UID) { this.UID = properties.UID }
            if (properties.state) { this.state = properties.state }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public orderID?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public UID?: number|null = 0
    @protobuf.Field.d(3, CommentState, "optional", CommentState.CommentStateUnknown)
    public state?: CommentState|null = CommentState.CommentStateUnknown
}
export interface IUpdateOrderAfterSupportStateReq {
    orderID?: string|null
    UID?: number|null
    state?: AfterSupportState|null
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_UpdateOrderAfterSupportStateReq")
export class UpdateOrderAfterSupportStateReq extends protobuf.Message<IUpdateOrderAfterSupportStateReq> {
    constructor(properties: Properties<IUpdateOrderAfterSupportStateReq>) {
        super(properties);
        if (properties) {
            if (properties.orderID) { this.orderID = properties.orderID }
            if (properties.UID) { this.UID = properties.UID }
            if (properties.state) { this.state = properties.state }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public orderID?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public UID?: number|null = 0
    @protobuf.Field.d(3, AfterSupportState, "optional", AfterSupportState.AfterSupportStateUnknown)
    public state?: AfterSupportState|null = AfterSupportState.AfterSupportStateUnknown
}
export interface ISaveAfterSupportReq {
    afterSupport?: IAfterSupportOrder
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_SaveAfterSupportReq")
export class SaveAfterSupportReq extends protobuf.Message<ISaveAfterSupportReq> {
    constructor(properties: Properties<ISaveAfterSupportReq>) {
        super(properties);
        if (properties) {
            if (properties.afterSupport) { this.afterSupport = AfterSupportOrder.create(properties.afterSupport) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_exchangeorder_v7_AfterSupportOrder", "optional")
    public afterSupport?: AfterSupportOrder|null
}
export interface IGetAfterSupportReq {
    orderId?: string|null
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_GetAfterSupportReq")
export class GetAfterSupportReq extends protobuf.Message<IGetAfterSupportReq> {
    constructor(properties: Properties<IGetAfterSupportReq>) {
        super(properties);
        if (properties) {
            if (properties.orderId) { this.orderId = properties.orderId }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public orderId?: string|null = ""
}
export interface IAfterSupportView {
    afterSupport?: IAfterSupportOrder
    orderInfo?: IOrder
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_AfterSupportView")
export class AfterSupportView extends protobuf.Message<IAfterSupportView> {
    constructor(properties: Properties<IAfterSupportView>) {
        super(properties);
        if (properties) {
            if (properties.afterSupport) { this.afterSupport = AfterSupportOrder.create(properties.afterSupport) as any }
            if (properties.orderInfo) { this.orderInfo = Order.create(properties.orderInfo) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_exchangeorder_v7_AfterSupportOrder", "optional")
    public afterSupport?: AfterSupportOrder|null
    @protobuf.Field.d(2, "tss_hall_exchangeorder_v7_Order", "optional")
    public orderInfo?: Order|null
}
export interface ICreateAfterSupportCommentReq {
    orderId?: string|null
    afterSupportComment?: IAfterSupportComment
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_CreateAfterSupportCommentReq")
export class CreateAfterSupportCommentReq extends protobuf.Message<ICreateAfterSupportCommentReq> {
    constructor(properties: Properties<ICreateAfterSupportCommentReq>) {
        super(properties);
        if (properties) {
            if (properties.orderId) { this.orderId = properties.orderId }
            if (properties.afterSupportComment) { this.afterSupportComment = AfterSupportComment.create(properties.afterSupportComment) as any }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public orderId?: string|null = ""
    @protobuf.Field.d(2, "tss_hall_exchangeorder_v7_AfterSupportComment", "optional")
    public afterSupportComment?: AfterSupportComment|null
}
export interface IAdminCreateAfterSupportCommentReq {
    orderId?: string|null
    afterSupportComment?: IAfterSupportComment
    operator?: string|null
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_AdminCreateAfterSupportCommentReq")
export class AdminCreateAfterSupportCommentReq extends protobuf.Message<IAdminCreateAfterSupportCommentReq> {
    constructor(properties: Properties<IAdminCreateAfterSupportCommentReq>) {
        super(properties);
        if (properties) {
            if (properties.orderId) { this.orderId = properties.orderId }
            if (properties.afterSupportComment) { this.afterSupportComment = AfterSupportComment.create(properties.afterSupportComment) as any }
            if (properties.operator) { this.operator = properties.operator }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public orderId?: string|null = ""
    @protobuf.Field.d(2, "tss_hall_exchangeorder_v7_AfterSupportComment", "optional")
    public afterSupportComment?: AfterSupportComment|null
    @protobuf.Field.d(3, "string", "optional", )
    public operator?: string|null = ""
}
export interface IGetAfterSupportResp {
    afterSupport?: IAfterSupportView
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_GetAfterSupportResp")
export class GetAfterSupportResp extends protobuf.Message<IGetAfterSupportResp> {
    constructor(properties: Properties<IGetAfterSupportResp>) {
        super(properties);
        if (properties) {
            if (properties.afterSupport) { this.afterSupport = AfterSupportView.create(properties.afterSupport) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_exchangeorder_v7_AfterSupportView", "optional")
    public afterSupport?: AfterSupportView|null
}
export interface IAdminIgnoreSupportReq {
    orderId?: string[]
    operator?: string|null
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_AdminIgnoreSupportReq")
export class AdminIgnoreSupportReq extends protobuf.Message<IAdminIgnoreSupportReq> {
    constructor(properties: Properties<IAdminIgnoreSupportReq>) {
        super(properties);
        if (properties) {
            if (properties.orderId) { this.orderId = []; properties.orderId.forEach((value, index)=>{this.orderId[index] = properties.orderId[index]})}
            if (properties.operator) { this.operator = properties.operator }
        }
	}
    @protobuf.Field.d(1, "string", "repeated", [])
    public orderId?: string[] = []
    @protobuf.Field.d(2, "string", "optional", )
    public operator?: string|null = ""
}
export interface IAdminGetAfterSupportListReq {
    page?: number|null
    pageSize?: number|null
    ListType?: ListAfterSupportType|null
    orderId?: string|null
    userNickname?: string|null
    uid?: number|null
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_AdminGetAfterSupportListReq")
export class AdminGetAfterSupportListReq extends protobuf.Message<IAdminGetAfterSupportListReq> {
    constructor(properties: Properties<IAdminGetAfterSupportListReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.ListType) { this.ListType = properties.ListType }
            if (properties.orderId) { this.orderId = properties.orderId }
            if (properties.userNickname) { this.userNickname = properties.userNickname }
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(3, ListAfterSupportType, "optional", ListAfterSupportType.ListAfterSupportTypeUnknown)
    public ListType?: ListAfterSupportType|null = ListAfterSupportType.ListAfterSupportTypeUnknown
    @protobuf.Field.d(4, "string", "optional", )
    public orderId?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public userNickname?: string|null = ""
    @protobuf.Field.d(8, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IAdminGetAfterSupportListResp {
    afterSupport?: IAfterSupportView[]
    total?: number|null
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_AdminGetAfterSupportListResp")
export class AdminGetAfterSupportListResp extends protobuf.Message<IAdminGetAfterSupportListResp> {
    constructor(properties: Properties<IAdminGetAfterSupportListResp>) {
        super(properties);
        if (properties) {
            if (properties.afterSupport) { this.afterSupport = []; properties.afterSupport.forEach((value, index)=>{this.afterSupport[index] = AfterSupportView.create(properties.afterSupport[index]) as any})}
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "tss_hall_exchangeorder_v7_AfterSupportView", "repeated")
    public afterSupport?: AfterSupportView[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public total?: number|null = 0
}
export interface IGetAfterSupportListReq {
    page?: number|null
    pageSize?: number|null
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_GetAfterSupportListReq")
export class GetAfterSupportListReq extends protobuf.Message<IGetAfterSupportListReq> {
    constructor(properties: Properties<IGetAfterSupportListReq>) {
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
export interface IGetAfterSupportListResp {
    afterSupport?: IAfterSupportView[]
    total?: number|null
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_GetAfterSupportListResp")
export class GetAfterSupportListResp extends protobuf.Message<IGetAfterSupportListResp> {
    constructor(properties: Properties<IGetAfterSupportListResp>) {
        super(properties);
        if (properties) {
            if (properties.afterSupport) { this.afterSupport = []; properties.afterSupport.forEach((value, index)=>{this.afterSupport[index] = AfterSupportView.create(properties.afterSupport[index]) as any})}
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "tss_hall_exchangeorder_v7_AfterSupportView", "repeated")
    public afterSupport?: AfterSupportView[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public total?: number|null = 0
}
export interface IWipeAfterSupportUnreadNumReq {
    orderId?: string|null
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_WipeAfterSupportUnreadNumReq")
export class WipeAfterSupportUnreadNumReq extends protobuf.Message<IWipeAfterSupportUnreadNumReq> {
    constructor(properties: Properties<IWipeAfterSupportUnreadNumReq>) {
        super(properties);
        if (properties) {
            if (properties.orderId) { this.orderId = properties.orderId }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public orderId?: string|null = ""
}
export interface IWipeOrderStateChangeFlagReq {
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_WipeOrderStateChangeFlagReq")
export class WipeOrderStateChangeFlagReq extends protobuf.Message<IWipeOrderStateChangeFlagReq> {
    constructor(properties: Properties<IWipeOrderStateChangeFlagReq>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface INotifyAfterSupportUnreadResp {
    userUnreadCommentNum?: number|null
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_NotifyAfterSupportUnreadResp")
export class NotifyAfterSupportUnreadResp extends protobuf.Message<INotifyAfterSupportUnreadResp> {
    constructor(properties: Properties<INotifyAfterSupportUnreadResp>) {
        super(properties);
        if (properties) {
            if (properties.userUnreadCommentNum) { this.userUnreadCommentNum = properties.userUnreadCommentNum }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public userUnreadCommentNum?: number|null = 0
}
export interface IGetAfterSupportUnreadResp {
    userUnreadCommentNum?: number|null
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_GetAfterSupportUnreadResp")
export class GetAfterSupportUnreadResp extends protobuf.Message<IGetAfterSupportUnreadResp> {
    constructor(properties: Properties<IGetAfterSupportUnreadResp>) {
        super(properties);
        if (properties) {
            if (properties.userUnreadCommentNum) { this.userUnreadCommentNum = properties.userUnreadCommentNum }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public userUnreadCommentNum?: number|null = 0
}
export interface INotifyOrderStateChangeFlagResp {
    userOrderStateChange?: boolean|null
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_NotifyOrderStateChangeFlagResp")
export class NotifyOrderStateChangeFlagResp extends protobuf.Message<INotifyOrderStateChangeFlagResp> {
    constructor(properties: Properties<INotifyOrderStateChangeFlagResp>) {
        super(properties);
        if (properties) {
            if (properties.userOrderStateChange) { this.userOrderStateChange = properties.userOrderStateChange }
        }
	}
    @protobuf.Field.d(1, "bool", "optional", false)
    public userOrderStateChange?: boolean|null = false
}
export interface IGetOrderStateChangeFlagResp {
    userOrderStateChange?: boolean|null
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_GetOrderStateChangeFlagResp")
export class GetOrderStateChangeFlagResp extends protobuf.Message<IGetOrderStateChangeFlagResp> {
    constructor(properties: Properties<IGetOrderStateChangeFlagResp>) {
        super(properties);
        if (properties) {
            if (properties.userOrderStateChange) { this.userOrderStateChange = properties.userOrderStateChange }
        }
	}
    @protobuf.Field.d(1, "bool", "optional", false)
    public userOrderStateChange?: boolean|null = false
}
export interface IDeliveryOrderBySupplierReq {
    token?: string|null
    supplierID?: string|null
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_DeliveryOrderBySupplierReq")
export class DeliveryOrderBySupplierReq extends protobuf.Message<IDeliveryOrderBySupplierReq> {
    constructor(properties: Properties<IDeliveryOrderBySupplierReq>) {
        super(properties);
        if (properties) {
            if (properties.token) { this.token = properties.token }
            if (properties.supplierID) { this.supplierID = properties.supplierID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public token?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public supplierID?: string|null = ""
}
export interface IDeliveryOrderBySupplierResp {
    code?: number|null
    order?: IOrder
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_DeliveryOrderBySupplierResp")
export class DeliveryOrderBySupplierResp extends protobuf.Message<IDeliveryOrderBySupplierResp> {
    constructor(properties: Properties<IDeliveryOrderBySupplierResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.order) { this.order = Order.create(properties.order) as any }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
    @protobuf.Field.d(2, "tss_hall_exchangeorder_v7_Order", "optional")
    public order?: Order|null
}
export interface IListOrderBySupplierReq {
    deliveryState?: DeliveryState|null
    beginAt?: number|null
    endAt?: number|null
    orderState?: OrderState|null
    supplierID?: string|null
    page?: number|null
    pageSize?: number|null
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_ListOrderBySupplierReq")
export class ListOrderBySupplierReq extends protobuf.Message<IListOrderBySupplierReq> {
    constructor(properties: Properties<IListOrderBySupplierReq>) {
        super(properties);
        if (properties) {
            if (properties.deliveryState) { this.deliveryState = properties.deliveryState }
            if (properties.beginAt) { this.beginAt = properties.beginAt }
            if (properties.endAt) { this.endAt = properties.endAt }
            if (properties.orderState) { this.orderState = properties.orderState }
            if (properties.supplierID) { this.supplierID = properties.supplierID }
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
        }
	}
    @protobuf.Field.d(1, DeliveryState, "optional", DeliveryState.DeliveryStateUnknown)
    public deliveryState?: DeliveryState|null = DeliveryState.DeliveryStateUnknown
    @protobuf.Field.d(2, "int64", "optional", 0)
    public beginAt?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public endAt?: number|null = 0
    @protobuf.Field.d(4, OrderState, "optional", OrderState.OrderStateUnknown)
    public orderState?: OrderState|null = OrderState.OrderStateUnknown
    @protobuf.Field.d(5, "string", "optional", )
    public supplierID?: string|null = ""
    @protobuf.Field.d(6, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(7, "int64", "optional", 0)
    public pageSize?: number|null = 0
}
export interface IListOrderBySupplierResp {
    orderList?: IOrder[]
    total?: number|null
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_ListOrderBySupplierResp")
export class ListOrderBySupplierResp extends protobuf.Message<IListOrderBySupplierResp> {
    constructor(properties: Properties<IListOrderBySupplierResp>) {
        super(properties);
        if (properties) {
            if (properties.orderList) { this.orderList = []; properties.orderList.forEach((value, index)=>{this.orderList[index] = Order.create(properties.orderList[index]) as any})}
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "tss_hall_exchangeorder_v7_Order", "repeated")
    public orderList?: Order[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public total?: number|null = 0
}
export interface IExchangeUserTopUpPropReq {
    uid?: number|null
    assetFrom?: tss_common_IAssetItem
    assetTo?: tss_common_IAssetItem
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_ExchangeUserTopUpPropReq")
export class ExchangeUserTopUpPropReq extends protobuf.Message<IExchangeUserTopUpPropReq> {
    constructor(properties: Properties<IExchangeUserTopUpPropReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.assetFrom) { this.assetFrom = tss_common_AssetItem.create(properties.assetFrom) as any }
            if (properties.assetTo) { this.assetTo = tss_common_AssetItem.create(properties.assetTo) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "tss_common_AssetItem", "optional")
    public assetFrom?: tss_common_AssetItem|null
    @protobuf.Field.d(3, "tss_common_AssetItem", "optional")
    public assetTo?: tss_common_AssetItem|null
}
export interface IExchangeUserPropMassage {
    assetFrom?: tss_common_IAssetItem[]
    assetTo?: tss_common_IAssetItem[]
    content?: string|null
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_ExchangeUserPropMassage")
export class ExchangeUserPropMassage extends protobuf.Message<IExchangeUserPropMassage> {
    constructor(properties: Properties<IExchangeUserPropMassage>) {
        super(properties);
        if (properties) {
            if (properties.assetFrom) { this.assetFrom = []; properties.assetFrom.forEach((value, index)=>{this.assetFrom[index] = tss_common_AssetItem.create(properties.assetFrom[index]) as any})}
            if (properties.assetTo) { this.assetTo = []; properties.assetTo.forEach((value, index)=>{this.assetTo[index] = tss_common_AssetItem.create(properties.assetTo[index]) as any})}
            if (properties.content) { this.content = properties.content }
        }
	}
    @protobuf.Field.d(1, "tss_common_AssetItem", "repeated")
    public assetFrom?: tss_common_AssetItem[] = []
    @protobuf.Field.d(2, "tss_common_AssetItem", "repeated")
    public assetTo?: tss_common_AssetItem[] = []
    @protobuf.Field.d(3, "string", "optional", )
    public content?: string|null = ""
}
export interface IExchangeUserTopUpPropResp {
    decBatchID?: string|null
    incBatchID?: string|null
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_ExchangeUserTopUpPropResp")
export class ExchangeUserTopUpPropResp extends protobuf.Message<IExchangeUserTopUpPropResp> {
    constructor(properties: Properties<IExchangeUserTopUpPropResp>) {
        super(properties);
        if (properties) {
            if (properties.decBatchID) { this.decBatchID = properties.decBatchID }
            if (properties.incBatchID) { this.incBatchID = properties.incBatchID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public decBatchID?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public incBatchID?: string|null = ""
}
export interface ISaveExchangeTopUpPropConfReq {
    exchangeTopUpPropConf?: IExchangeTopUpPropConf
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_SaveExchangeTopUpPropConfReq")
export class SaveExchangeTopUpPropConfReq extends protobuf.Message<ISaveExchangeTopUpPropConfReq> {
    constructor(properties: Properties<ISaveExchangeTopUpPropConfReq>) {
        super(properties);
        if (properties) {
            if (properties.exchangeTopUpPropConf) { this.exchangeTopUpPropConf = ExchangeTopUpPropConf.create(properties.exchangeTopUpPropConf) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_exchangeorder_v7_ExchangeTopUpPropConf", "optional")
    public exchangeTopUpPropConf?: ExchangeTopUpPropConf|null
}
export interface IGetExchangeTopUpPropConfResp {
    exchangeTopUpPropConf?: IExchangeTopUpPropConf
}
@protobuf.Type.d("tss_hall_exchangeorder_v7_GetExchangeTopUpPropConfResp")
export class GetExchangeTopUpPropConfResp extends protobuf.Message<IGetExchangeTopUpPropConfResp> {
    constructor(properties: Properties<IGetExchangeTopUpPropConfResp>) {
        super(properties);
        if (properties) {
            if (properties.exchangeTopUpPropConf) { this.exchangeTopUpPropConf = ExchangeTopUpPropConf.create(properties.exchangeTopUpPropConf) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_exchangeorder_v7_ExchangeTopUpPropConf", "optional")
    public exchangeTopUpPropConf?: ExchangeTopUpPropConf|null
}
class $ExchangeOrder extends RpcService {
    async CommitOrder(req: ICommitOrderReq, params?: RpcParams) : Promise<{err:number, resp:ICommitOrderResp}> {
        let data = CommitOrderReq.create(req)
        this.onBeforeReq("CommitOrder", data, params)
        const buffer = CommitOrderReq.encode(data).finish()
        let [err, pack] = await this.call("CommitOrder", buffer, params)
        if (err) {
            this.onBeforeResp("CommitOrder", err)
            return {err: err, resp: null}
        } else {
            let resp = CommitOrderResp.decode(pack) as any
            this.onBeforeResp("CommitOrder", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchCommitOrder(req: IBatchCommitOrderReq, params?: RpcParams) : Promise<{err:number, resp:IBatchCommitOrderResp}> {
        let data = BatchCommitOrderReq.create(req)
        this.onBeforeReq("BatchCommitOrder", data, params)
        const buffer = BatchCommitOrderReq.encode(data).finish()
        let [err, pack] = await this.call("BatchCommitOrder", buffer, params)
        if (err) {
            this.onBeforeResp("BatchCommitOrder", err)
            return {err: err, resp: null}
        } else {
            let resp = BatchCommitOrderResp.decode(pack) as any
            this.onBeforeResp("BatchCommitOrder", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetOrder(req: IGetOrderReq, params?: RpcParams) : Promise<{err:number, resp:IGetOrderResp}> {
        let data = GetOrderReq.create(req)
        this.onBeforeReq("GetOrder", data, params)
        const buffer = GetOrderReq.encode(data).finish()
        let [err, pack] = await this.call("GetOrder", buffer, params)
        if (err) {
            this.onBeforeResp("GetOrder", err)
            return {err: err, resp: null}
        } else {
            let resp = GetOrderResp.decode(pack) as any
            this.onBeforeResp("GetOrder", err, resp)
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
    async DeliverOrderByBusiness(req: IDeliverOrderReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = DeliverOrderReq.create(req)
        this.onBeforeReq("DeliverOrderByBusiness", data, params)
        const buffer = DeliverOrderReq.encode(data).finish()
        let [err, pack] = await this.call("DeliverOrderByBusiness", buffer, params)
        if (err) {
            this.onBeforeResp("DeliverOrderByBusiness", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("DeliverOrderByBusiness", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DeliveryOrderBySupplier(req: IDeliveryOrderBySupplierReq, params?: RpcParams) : Promise<{err:number, resp:IDeliveryOrderBySupplierResp}> {
        let data = DeliveryOrderBySupplierReq.create(req)
        this.onBeforeReq("DeliveryOrderBySupplier", data, params)
        const buffer = DeliveryOrderBySupplierReq.encode(data).finish()
        let [err, pack] = await this.call("DeliveryOrderBySupplier", buffer, params)
        if (err) {
            this.onBeforeResp("DeliveryOrderBySupplier", err)
            return {err: err, resp: null}
        } else {
            let resp = DeliveryOrderBySupplierResp.decode(pack) as any
            this.onBeforeResp("DeliveryOrderBySupplier", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListOrderBySupplier(req: IListOrderBySupplierReq, params?: RpcParams) : Promise<{err:number, resp:IListOrderBySupplierResp}> {
        let data = ListOrderBySupplierReq.create(req)
        this.onBeforeReq("ListOrderBySupplier", data, params)
        const buffer = ListOrderBySupplierReq.encode(data).finish()
        let [err, pack] = await this.call("ListOrderBySupplier", buffer, params)
        if (err) {
            this.onBeforeResp("ListOrderBySupplier", err)
            return {err: err, resp: null}
        } else {
            let resp = ListOrderBySupplierResp.decode(pack) as any
            this.onBeforeResp("ListOrderBySupplier", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ReceiptByCustomer(req: IReceiptByCustomerReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = ReceiptByCustomerReq.create(req)
        this.onBeforeReq("ReceiptByCustomer", data, params)
        const buffer = ReceiptByCustomerReq.encode(data).finish()
        let [err, pack] = await this.call("ReceiptByCustomer", buffer, params)
        if (err) {
            this.onBeforeResp("ReceiptByCustomer", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("ReceiptByCustomer", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ApplyRefundOrder(req: IApplyRefundOrderReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = ApplyRefundOrderReq.create(req)
        this.onBeforeReq("ApplyRefundOrder", data, params)
        const buffer = ApplyRefundOrderReq.encode(data).finish()
        let [err, pack] = await this.call("ApplyRefundOrder", buffer, params)
        if (err) {
            this.onBeforeResp("ApplyRefundOrder", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("ApplyRefundOrder", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ApplyCancelOrder(req: IApplyCancelOrderReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = ApplyCancelOrderReq.create(req)
        this.onBeforeReq("ApplyCancelOrder", data, params)
        const buffer = ApplyCancelOrderReq.encode(data).finish()
        let [err, pack] = await this.call("ApplyCancelOrder", buffer, params)
        if (err) {
            this.onBeforeResp("ApplyCancelOrder", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("ApplyCancelOrder", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ConfirmRefundOrder(req: IConfirmOrderReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = ConfirmOrderReq.create(req)
        this.onBeforeReq("ConfirmRefundOrder", data, params)
        const buffer = ConfirmOrderReq.encode(data).finish()
        let [err, pack] = await this.call("ConfirmRefundOrder", buffer, params)
        if (err) {
            this.onBeforeResp("ConfirmRefundOrder", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("ConfirmRefundOrder", err, resp)
            return {err: null, resp: resp}
        }
    }
    async RejectApply(req: IRejectApplyReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = RejectApplyReq.create(req)
        this.onBeforeReq("RejectApply", data, params)
        const buffer = RejectApplyReq.encode(data).finish()
        let [err, pack] = await this.call("RejectApply", buffer, params)
        if (err) {
            this.onBeforeResp("RejectApply", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("RejectApply", err, resp)
            return {err: null, resp: resp}
        }
    }
    async RejectRefund(req: IRejectRefundReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = RejectRefundReq.create(req)
        this.onBeforeReq("RejectRefund", data, params)
        const buffer = RejectRefundReq.encode(data).finish()
        let [err, pack] = await this.call("RejectRefund", buffer, params)
        if (err) {
            this.onBeforeResp("RejectRefund", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("RejectRefund", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ModifyReceiveAddr(req: IModifyReceiveAddrReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = ModifyReceiveAddrReq.create(req)
        this.onBeforeReq("ModifyReceiveAddr", data, params)
        const buffer = ModifyReceiveAddrReq.encode(data).finish()
        let [err, pack] = await this.call("ModifyReceiveAddr", buffer, params)
        if (err) {
            this.onBeforeResp("ModifyReceiveAddr", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("ModifyReceiveAddr", err, resp)
            return {err: null, resp: resp}
        }
    }
    async TopUpOrderFailed(req: ITopUpOrderFailedReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = TopUpOrderFailedReq.create(req)
        this.onBeforeReq("TopUpOrderFailed", data, params)
        const buffer = TopUpOrderFailedReq.encode(data).finish()
        let [err, pack] = await this.call("TopUpOrderFailed", buffer, params)
        if (err) {
            this.onBeforeResp("TopUpOrderFailed", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("TopUpOrderFailed", err, resp)
            return {err: null, resp: resp}
        }
    }
    async TopUpOrderSucceeded(req: ITopUpOrderSucceededReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = TopUpOrderSucceededReq.create(req)
        this.onBeforeReq("TopUpOrderSucceeded", data, params)
        const buffer = TopUpOrderSucceededReq.encode(data).finish()
        let [err, pack] = await this.call("TopUpOrderSucceeded", buffer, params)
        if (err) {
            this.onBeforeResp("TopUpOrderSucceeded", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("TopUpOrderSucceeded", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DeleteOrder(req: IDeleteOrderReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = DeleteOrderReq.create(req)
        this.onBeforeReq("DeleteOrder", data, params)
        const buffer = DeleteOrderReq.encode(data).finish()
        let [err, pack] = await this.call("DeleteOrder", buffer, params)
        if (err) {
            this.onBeforeResp("DeleteOrder", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("DeleteOrder", err, resp)
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
    async CountOrder(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:ICountOrderResp}> {
        let data = base_Void.create(req)
        this.onBeforeReq("CountOrder", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("CountOrder", buffer, params)
        if (err) {
            this.onBeforeResp("CountOrder", err)
            return {err: err, resp: null}
        } else {
            let resp = CountOrderResp.decode(pack) as any
            this.onBeforeResp("CountOrder", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ReceiptTimeOutCallback(req: IReceiptTimeOutCallbackReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = ReceiptTimeOutCallbackReq.create(req)
        this.onBeforeReq("ReceiptTimeOutCallback", data, params)
        const buffer = ReceiptTimeOutCallbackReq.encode(data).finish()
        let [err, pack] = await this.call("ReceiptTimeOutCallback", buffer, params)
        if (err) {
            this.onBeforeResp("ReceiptTimeOutCallback", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("ReceiptTimeOutCallback", err, resp)
            return {err: null, resp: resp}
        }
    }
    async CancelOrderByBusiness(req: ICancelOrderByBusinessReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = CancelOrderByBusinessReq.create(req)
        this.onBeforeReq("CancelOrderByBusiness", data, params)
        const buffer = CancelOrderByBusinessReq.encode(data).finish()
        let [err, pack] = await this.call("CancelOrderByBusiness", buffer, params)
        if (err) {
            this.onBeforeResp("CancelOrderByBusiness", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("CancelOrderByBusiness", err, resp)
            return {err: null, resp: resp}
        }
    }
    async UpdateOrderCommentState(req: IUpdateOrderCommentStateReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = UpdateOrderCommentStateReq.create(req)
        this.onBeforeReq("UpdateOrderCommentState", data, params)
        const buffer = UpdateOrderCommentStateReq.encode(data).finish()
        let [err, pack] = await this.call("UpdateOrderCommentState", buffer, params)
        if (err) {
            this.onBeforeResp("UpdateOrderCommentState", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("UpdateOrderCommentState", err, resp)
            return {err: null, resp: resp}
        }
    }
    async UpdateOrderAfterSupportState(req: IUpdateOrderAfterSupportStateReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = UpdateOrderAfterSupportStateReq.create(req)
        this.onBeforeReq("UpdateOrderAfterSupportState", data, params)
        const buffer = UpdateOrderAfterSupportStateReq.encode(data).finish()
        let [err, pack] = await this.call("UpdateOrderAfterSupportState", buffer, params)
        if (err) {
            this.onBeforeResp("UpdateOrderAfterSupportState", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("UpdateOrderAfterSupportState", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SaveAfterSupport(req: ISaveAfterSupportReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = SaveAfterSupportReq.create(req)
        this.onBeforeReq("SaveAfterSupport", data, params)
        const buffer = SaveAfterSupportReq.encode(data).finish()
        let [err, pack] = await this.call("SaveAfterSupport", buffer, params)
        if (err) {
            this.onBeforeResp("SaveAfterSupport", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("SaveAfterSupport", err, resp)
            return {err: null, resp: resp}
        }
    }
    async CreateAfterSupportComment(req: ICreateAfterSupportCommentReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = CreateAfterSupportCommentReq.create(req)
        this.onBeforeReq("CreateAfterSupportComment", data, params)
        const buffer = CreateAfterSupportCommentReq.encode(data).finish()
        let [err, pack] = await this.call("CreateAfterSupportComment", buffer, params)
        if (err) {
            this.onBeforeResp("CreateAfterSupportComment", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("CreateAfterSupportComment", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetAfterSupport(req: IGetAfterSupportReq, params?: RpcParams) : Promise<{err:number, resp:IGetAfterSupportResp}> {
        let data = GetAfterSupportReq.create(req)
        this.onBeforeReq("GetAfterSupport", data, params)
        const buffer = GetAfterSupportReq.encode(data).finish()
        let [err, pack] = await this.call("GetAfterSupport", buffer, params)
        if (err) {
            this.onBeforeResp("GetAfterSupport", err)
            return {err: err, resp: null}
        } else {
            let resp = GetAfterSupportResp.decode(pack) as any
            this.onBeforeResp("GetAfterSupport", err, resp)
            return {err: null, resp: resp}
        }
    }
    async WipeAfterSupportUnreadNum(req: IWipeAfterSupportUnreadNumReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = WipeAfterSupportUnreadNumReq.create(req)
        this.onBeforeReq("WipeAfterSupportUnreadNum", data, params)
        const buffer = WipeAfterSupportUnreadNumReq.encode(data).finish()
        let [err, pack] = await this.call("WipeAfterSupportUnreadNum", buffer, params)
        if (err) {
            this.onBeforeResp("WipeAfterSupportUnreadNum", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("WipeAfterSupportUnreadNum", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetAfterSupportList(req: IGetAfterSupportListReq, params?: RpcParams) : Promise<{err:number, resp:IGetAfterSupportListResp}> {
        let data = GetAfterSupportListReq.create(req)
        this.onBeforeReq("GetAfterSupportList", data, params)
        const buffer = GetAfterSupportListReq.encode(data).finish()
        let [err, pack] = await this.call("GetAfterSupportList", buffer, params)
        if (err) {
            this.onBeforeResp("GetAfterSupportList", err)
            return {err: err, resp: null}
        } else {
            let resp = GetAfterSupportListResp.decode(pack) as any
            this.onBeforeResp("GetAfterSupportList", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetOrderStateChangeFlag(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:IGetOrderStateChangeFlagResp}> {
        let data = base_Void.create(req)
        this.onBeforeReq("GetOrderStateChangeFlag", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("GetOrderStateChangeFlag", buffer, params)
        if (err) {
            this.onBeforeResp("GetOrderStateChangeFlag", err)
            return {err: err, resp: null}
        } else {
            let resp = GetOrderStateChangeFlagResp.decode(pack) as any
            this.onBeforeResp("GetOrderStateChangeFlag", err, resp)
            return {err: null, resp: resp}
        }
    }
    async WipeOrderStateChangeFlag(req: IWipeOrderStateChangeFlagReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = WipeOrderStateChangeFlagReq.create(req)
        this.onBeforeReq("WipeOrderStateChangeFlag", data, params)
        const buffer = WipeOrderStateChangeFlagReq.encode(data).finish()
        let [err, pack] = await this.call("WipeOrderStateChangeFlag", buffer, params)
        if (err) {
            this.onBeforeResp("WipeOrderStateChangeFlag", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("WipeOrderStateChangeFlag", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetAfterSupportUnread(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:IGetAfterSupportUnreadResp}> {
        let data = base_Void.create(req)
        this.onBeforeReq("GetAfterSupportUnread", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("GetAfterSupportUnread", buffer, params)
        if (err) {
            this.onBeforeResp("GetAfterSupportUnread", err)
            return {err: err, resp: null}
        } else {
            let resp = GetAfterSupportUnreadResp.decode(pack) as any
            this.onBeforeResp("GetAfterSupportUnread", err, resp)
            return {err: null, resp: resp}
        }
    }
    async AdminCreateAfterSupportComment(req: IAdminCreateAfterSupportCommentReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = AdminCreateAfterSupportCommentReq.create(req)
        this.onBeforeReq("AdminCreateAfterSupportComment", data, params)
        const buffer = AdminCreateAfterSupportCommentReq.encode(data).finish()
        let [err, pack] = await this.call("AdminCreateAfterSupportComment", buffer, params)
        if (err) {
            this.onBeforeResp("AdminCreateAfterSupportComment", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("AdminCreateAfterSupportComment", err, resp)
            return {err: null, resp: resp}
        }
    }
    async AdminIgnoreSupport(req: IAdminIgnoreSupportReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = AdminIgnoreSupportReq.create(req)
        this.onBeforeReq("AdminIgnoreSupport", data, params)
        const buffer = AdminIgnoreSupportReq.encode(data).finish()
        let [err, pack] = await this.call("AdminIgnoreSupport", buffer, params)
        if (err) {
            this.onBeforeResp("AdminIgnoreSupport", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("AdminIgnoreSupport", err, resp)
            return {err: null, resp: resp}
        }
    }
    async AdminGetAfterSupportList(req: IAdminGetAfterSupportListReq, params?: RpcParams) : Promise<{err:number, resp:IAdminGetAfterSupportListResp}> {
        let data = AdminGetAfterSupportListReq.create(req)
        this.onBeforeReq("AdminGetAfterSupportList", data, params)
        const buffer = AdminGetAfterSupportListReq.encode(data).finish()
        let [err, pack] = await this.call("AdminGetAfterSupportList", buffer, params)
        if (err) {
            this.onBeforeResp("AdminGetAfterSupportList", err)
            return {err: err, resp: null}
        } else {
            let resp = AdminGetAfterSupportListResp.decode(pack) as any
            this.onBeforeResp("AdminGetAfterSupportList", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SaveExchangeTopUpPropConf(req: ISaveExchangeTopUpPropConfReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = SaveExchangeTopUpPropConfReq.create(req)
        this.onBeforeReq("SaveExchangeTopUpPropConf", data, params)
        const buffer = SaveExchangeTopUpPropConfReq.encode(data).finish()
        let [err, pack] = await this.call("SaveExchangeTopUpPropConf", buffer, params)
        if (err) {
            this.onBeforeResp("SaveExchangeTopUpPropConf", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("SaveExchangeTopUpPropConf", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetExchangeTopUpPropConf(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:IGetExchangeTopUpPropConfResp}> {
        let data = base_Void.create(req)
        this.onBeforeReq("GetExchangeTopUpPropConf", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("GetExchangeTopUpPropConf", buffer, params)
        if (err) {
            this.onBeforeResp("GetExchangeTopUpPropConf", err)
            return {err: err, resp: null}
        } else {
            let resp = GetExchangeTopUpPropConfResp.decode(pack) as any
            this.onBeforeResp("GetExchangeTopUpPropConf", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ExchangeUserTopUpProp(req: IExchangeUserTopUpPropReq, params?: RpcParams) : Promise<{err:number, resp:IExchangeUserTopUpPropResp}> {
        let data = ExchangeUserTopUpPropReq.create(req)
        this.onBeforeReq("ExchangeUserTopUpProp", data, params)
        const buffer = ExchangeUserTopUpPropReq.encode(data).finish()
        let [err, pack] = await this.call("ExchangeUserTopUpProp", buffer, params)
        if (err) {
            this.onBeforeResp("ExchangeUserTopUpProp", err)
            return {err: err, resp: null}
        } else {
            let resp = ExchangeUserTopUpPropResp.decode(pack) as any
            this.onBeforeResp("ExchangeUserTopUpProp", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ExchangeUserTopUpPropByMpItemQuery(req: mpff_social_callback_im_v2_ICallbackAfterItemQueryReq, params?: RpcParams) : Promise<{err:number, resp:mpff_social_callback_im_v2_ICallbackAfterItemQueryResp}> {
        let data = mpff_social_callback_im_v2_CallbackAfterItemQueryReq.create(req)
        this.onBeforeReq("ExchangeUserTopUpPropByMpItemQuery", data, params)
        const buffer = mpff_social_callback_im_v2_CallbackAfterItemQueryReq.encode(data).finish()
        let [err, pack] = await this.call("ExchangeUserTopUpPropByMpItemQuery", buffer, params)
        if (err) {
            this.onBeforeResp("ExchangeUserTopUpPropByMpItemQuery", err)
            return {err: err, resp: null}
        } else {
            let resp = mpff_social_callback_im_v2_CallbackAfterItemQueryResp.decode(pack) as any
            this.onBeforeResp("ExchangeUserTopUpPropByMpItemQuery", err, resp)
            return {err: null, resp: resp}
        }
    }
    NotifyAfterSupportUnread(data: Uint8Array, params: RpcParams) : {msg: INotifyAfterSupportUnreadResp, eventID?: number} {
        let msg = NotifyAfterSupportUnreadResp.decode(data)
        return {msg: msg}
    }
    NotifyOrderStateChangeFlag(data: Uint8Array, params: RpcParams) : {msg: INotifyOrderStateChangeFlagResp, eventID?: number} {
        let msg = NotifyOrderStateChangeFlagResp.decode(data)
        return {msg: msg}
    }
}
export const ExchangeOrder = new $ExchangeOrder({
    name: "tss.hall.exchangeorder.v7",
})
import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  HttpBody as bgo_component_httpagent_HttpBody,IHttpBody as bgo_component_httpagent_IHttpBody ,  } from "idl/bgo/component/httpagent"
export enum Code {  
    CodeOK = 0,  
    CodeSignatureInvalid = 4001,  
    CodeChargeNotExists = 4004,  
    CodeChargeCantRefund = 4005,  
    CodeChargeCallbackFail = 4006,  
    CodePayChannelNotSupport = 5001,  
    CodePayChannelCreateOrderFail = 5002,  
    CodePayChannelOrderNotExists = 5003,  
    CodePayChannelProductIDNotMatch = 5004,  
    CodeReceiptInvalid = 6001,  
    CodeReceiptNotMatchCharge = 6002,
}
export enum OS {  
    OSUnknown = 0,  
    OSiOS = 1,  
    OSAndroid = 2,
}
export enum PayChannel {  
    PayChannelUnknown = 0,  
    PayChannelAliPay = 265,  
    PayChannelWxPay = 431,  
    PayChannelApplePay = 99,  
    PayChannelAppleIAP = 941,  
    PayChannelOppoPay = 215,  
    PayChannelVivoPay = 889,  
    PayChannelHuaweiPay = 892,
}
export enum ChargeStatus {  
    ChargeStatusNone = 0,  
    ChargeStatusCreated = 1,  
    ChargeStatusPaid = 2,  
    ChargeStatusCallbackFail = 3,  
    ChargeStatusFinished = 4,  
    ChargeStatusPartRefund = 5,  
    ChargeStatusRefund = 6,  
    ChargeStatusFail = 7,  
    ChargeStatusCancel = 99,
}
export interface IPageReq {
    page?: number|null
    pageSize?: number|null
}
@protobuf.Type.d("mp_pay_trade_v1_PageReq")
export class PageReq extends protobuf.Message<IPageReq> {
    constructor(properties: Properties<IPageReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public pageSize?: number|null = 0
}
export interface IPageResp {
    total?: number|null
}
@protobuf.Type.d("mp_pay_trade_v1_PageResp")
export class PageResp extends protobuf.Message<IPageResp> {
    constructor(properties: Properties<IPageResp>) {
        super(properties);
        if (properties) {
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(2, "int64", "optional", 0)
    public total?: number|null = 0
}
export interface IDeviceInfo {
    os?: OS|null
    ip?: string|null
    guid?: string|null
    appChannel?: string|null
    appVersion?: string|null
}
@protobuf.Type.d("mp_pay_trade_v1_DeviceInfo")
export class DeviceInfo extends protobuf.Message<IDeviceInfo> {
    constructor(properties: Properties<IDeviceInfo>) {
        super(properties);
        if (properties) {
            if (properties.os) { this.os = properties.os }
            if (properties.ip) { this.ip = properties.ip }
            if (properties.guid) { this.guid = properties.guid }
            if (properties.appChannel) { this.appChannel = properties.appChannel }
            if (properties.appVersion) { this.appVersion = properties.appVersion }
        }
	}
    @protobuf.Field.d(1, OS, "optional", OS.OSUnknown)
    public os?: OS|null = OS.OSUnknown
    @protobuf.Field.d(2, "string", "optional", )
    public ip?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public guid?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public appChannel?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public appVersion?: string|null = ""
}
export interface IItemInfo {
    id?: string|null
    name?: string|null
    num?: number|null
    price?: number|null
    productID?: string|null
}
@protobuf.Type.d("mp_pay_trade_v1_ItemInfo")
export class ItemInfo extends protobuf.Message<IItemInfo> {
    constructor(properties: Properties<IItemInfo>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.name) { this.name = properties.name }
            if (properties.num) { this.num = properties.num }
            if (properties.price) { this.price = properties.price }
            if (properties.productID) { this.productID = properties.productID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public id?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(3, "int64", "optional", 0)
    public num?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public price?: number|null = 0
    @protobuf.Field.d(5, "string", "optional", )
    public productID?: string|null = ""
}
export interface ICharge {
    id?: string|null
    appID?: number|null
    uid?: number|null
    status?: ChargeStatus|null
    payCenterNo?: string|null
    appTradeNo?: string|null
    customTradeNo?: string|null
    channelTradeNo?: string|null
    channel?: PayChannel|null
    currency?: string|null
    amount?: number|null
    subject?: string|null
    body?: string|null
    items?: IItemInfo[]
    credential?: string|null
    extra?: string|null
    callbackUrl?: string|null
    deviceInfo?: IDeviceInfo
    createdAt?: number|null
    paidAt?: number|null
    callbackAt?: number|null
    cancelAt?: number|null
    amountRefunded?: number|null
}
@protobuf.Type.d("mp_pay_trade_v1_Charge")
export class Charge extends protobuf.Message<ICharge> {
    constructor(properties: Properties<ICharge>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.appID) { this.appID = properties.appID }
            if (properties.uid) { this.uid = properties.uid }
            if (properties.status) { this.status = properties.status }
            if (properties.payCenterNo) { this.payCenterNo = properties.payCenterNo }
            if (properties.appTradeNo) { this.appTradeNo = properties.appTradeNo }
            if (properties.customTradeNo) { this.customTradeNo = properties.customTradeNo }
            if (properties.channelTradeNo) { this.channelTradeNo = properties.channelTradeNo }
            if (properties.channel) { this.channel = properties.channel }
            if (properties.currency) { this.currency = properties.currency }
            if (properties.amount) { this.amount = properties.amount }
            if (properties.subject) { this.subject = properties.subject }
            if (properties.body) { this.body = properties.body }
            if (properties.items) { this.items = []; properties.items.forEach((value, index)=>{this.items[index] = ItemInfo.create(properties.items[index]) as any})}
            if (properties.credential) { this.credential = properties.credential }
            if (properties.extra) { this.extra = properties.extra }
            if (properties.callbackUrl) { this.callbackUrl = properties.callbackUrl }
            if (properties.deviceInfo) { this.deviceInfo = DeviceInfo.create(properties.deviceInfo) as any }
            if (properties.createdAt) { this.createdAt = properties.createdAt }
            if (properties.paidAt) { this.paidAt = properties.paidAt }
            if (properties.callbackAt) { this.callbackAt = properties.callbackAt }
            if (properties.cancelAt) { this.cancelAt = properties.cancelAt }
            if (properties.amountRefunded) { this.amountRefunded = properties.amountRefunded }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public id?: string|null = ""
    @protobuf.Field.d(2, "int32", "optional", 0)
    public appID?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(4, ChargeStatus, "optional", ChargeStatus.ChargeStatusNone)
    public status?: ChargeStatus|null = ChargeStatus.ChargeStatusNone
    @protobuf.Field.d(5, "string", "optional", )
    public payCenterNo?: string|null = ""
    @protobuf.Field.d(6, "string", "optional", )
    public appTradeNo?: string|null = ""
    @protobuf.Field.d(7, "string", "optional", )
    public customTradeNo?: string|null = ""
    @protobuf.Field.d(8, "string", "optional", )
    public channelTradeNo?: string|null = ""
    @protobuf.Field.d(9, PayChannel, "optional", PayChannel.PayChannelUnknown)
    public channel?: PayChannel|null = PayChannel.PayChannelUnknown
    @protobuf.Field.d(10, "string", "optional", )
    public currency?: string|null = ""
    @protobuf.Field.d(11, "int64", "optional", 0)
    public amount?: number|null = 0
    @protobuf.Field.d(12, "string", "optional", )
    public subject?: string|null = ""
    @protobuf.Field.d(13, "string", "optional", )
    public body?: string|null = ""
    @protobuf.Field.d(14, "mp_pay_trade_v1_ItemInfo", "repeated")
    public items?: ItemInfo[] = []
    @protobuf.Field.d(15, "string", "optional", )
    public credential?: string|null = ""
    @protobuf.Field.d(16, "string", "optional", )
    public extra?: string|null = ""
    @protobuf.Field.d(17, "string", "optional", )
    public callbackUrl?: string|null = ""
    @protobuf.Field.d(18, "mp_pay_trade_v1_DeviceInfo", "optional")
    public deviceInfo?: DeviceInfo|null
    @protobuf.Field.d(19, "int64", "optional", 0)
    public createdAt?: number|null = 0
    @protobuf.Field.d(20, "int64", "optional", 0)
    public paidAt?: number|null = 0
    @protobuf.Field.d(21, "int64", "optional", 0)
    public callbackAt?: number|null = 0
    @protobuf.Field.d(22, "int64", "optional", 0)
    public cancelAt?: number|null = 0
    @protobuf.Field.d(23, "int64", "optional", 0)
    public amountRefunded?: number|null = 0
}
export interface ICreateChargeReq {
    uid?: number|null
    appID?: number|null
    appTradeNo?: string|null
    channel?: PayChannel|null
    deviceInfo?: IDeviceInfo
    currency?: string|null
    amount?: number|null
    subject?: string|null
    body?: string|null
    items?: IItemInfo[]
    callbackURL?: string|null
    extra?: string|null
}
@protobuf.Type.d("mp_pay_trade_v1_CreateChargeReq")
export class CreateChargeReq extends protobuf.Message<ICreateChargeReq> {
    constructor(properties: Properties<ICreateChargeReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.appID) { this.appID = properties.appID }
            if (properties.appTradeNo) { this.appTradeNo = properties.appTradeNo }
            if (properties.channel) { this.channel = properties.channel }
            if (properties.deviceInfo) { this.deviceInfo = DeviceInfo.create(properties.deviceInfo) as any }
            if (properties.currency) { this.currency = properties.currency }
            if (properties.amount) { this.amount = properties.amount }
            if (properties.subject) { this.subject = properties.subject }
            if (properties.body) { this.body = properties.body }
            if (properties.items) { this.items = []; properties.items.forEach((value, index)=>{this.items[index] = ItemInfo.create(properties.items[index]) as any})}
            if (properties.callbackURL) { this.callbackURL = properties.callbackURL }
            if (properties.extra) { this.extra = properties.extra }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public appID?: number|null = 0
    @protobuf.Field.d(4, "string", "optional", )
    public appTradeNo?: string|null = ""
    @protobuf.Field.d(5, PayChannel, "optional", PayChannel.PayChannelUnknown)
    public channel?: PayChannel|null = PayChannel.PayChannelUnknown
    @protobuf.Field.d(6, "mp_pay_trade_v1_DeviceInfo", "optional")
    public deviceInfo?: DeviceInfo|null
    @protobuf.Field.d(7, "string", "optional", )
    public currency?: string|null = ""
    @protobuf.Field.d(8, "int64", "optional", 0)
    public amount?: number|null = 0
    @protobuf.Field.d(9, "string", "optional", )
    public subject?: string|null = ""
    @protobuf.Field.d(10, "string", "optional", )
    public body?: string|null = ""
    @protobuf.Field.d(12, "mp_pay_trade_v1_ItemInfo", "repeated")
    public items?: ItemInfo[] = []
    @protobuf.Field.d(13, "string", "optional", )
    public callbackURL?: string|null = ""
    @protobuf.Field.d(14, "string", "optional", )
    public extra?: string|null = ""
}
export interface ICreateChargeResp {
    charge?: ICharge
}
@protobuf.Type.d("mp_pay_trade_v1_CreateChargeResp")
export class CreateChargeResp extends protobuf.Message<ICreateChargeResp> {
    constructor(properties: Properties<ICreateChargeResp>) {
        super(properties);
        if (properties) {
            if (properties.charge) { this.charge = Charge.create(properties.charge) as any }
        }
	}
    @protobuf.Field.d(2, "mp_pay_trade_v1_Charge", "optional")
    public charge?: Charge|null
}
export interface IPayChannelReceipt {
    appID?: number|null
    channel?: PayChannel|null
    chargeID?: string|null
    payCenterNo?: string|null
    customTradeNo?: string|null
    channelTradeNo?: string|null
    appChannel?: string|null
    receipt?: string|null
    sign?: string|null
    time?: number|null
    test?: boolean|null
}
@protobuf.Type.d("mp_pay_trade_v1_PayChannelReceipt")
export class PayChannelReceipt extends protobuf.Message<IPayChannelReceipt> {
    constructor(properties: Properties<IPayChannelReceipt>) {
        super(properties);
        if (properties) {
            if (properties.appID) { this.appID = properties.appID }
            if (properties.channel) { this.channel = properties.channel }
            if (properties.chargeID) { this.chargeID = properties.chargeID }
            if (properties.payCenterNo) { this.payCenterNo = properties.payCenterNo }
            if (properties.customTradeNo) { this.customTradeNo = properties.customTradeNo }
            if (properties.channelTradeNo) { this.channelTradeNo = properties.channelTradeNo }
            if (properties.appChannel) { this.appChannel = properties.appChannel }
            if (properties.receipt) { this.receipt = properties.receipt }
            if (properties.sign) { this.sign = properties.sign }
            if (properties.time) { this.time = properties.time }
            if (properties.test) { this.test = properties.test }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public appID?: number|null = 0
    @protobuf.Field.d(2, PayChannel, "optional", PayChannel.PayChannelUnknown)
    public channel?: PayChannel|null = PayChannel.PayChannelUnknown
    @protobuf.Field.d(3, "string", "optional", )
    public chargeID?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public payCenterNo?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public customTradeNo?: string|null = ""
    @protobuf.Field.d(6, "string", "optional", )
    public channelTradeNo?: string|null = ""
    @protobuf.Field.d(7, "string", "optional", )
    public appChannel?: string|null = ""
    @protobuf.Field.d(12, "string", "optional", )
    public receipt?: string|null = ""
    @protobuf.Field.d(13, "string", "optional", )
    public sign?: string|null = ""
    @protobuf.Field.d(14, "int64", "optional", 0)
    public time?: number|null = 0
    @protobuf.Field.d(15, "bool", "optional", false)
    public test?: boolean|null = false
}
export interface IReportReceiptReq {
    receipt?: IPayChannelReceipt
}
@protobuf.Type.d("mp_pay_trade_v1_ReportReceiptReq")
export class ReportReceiptReq extends protobuf.Message<IReportReceiptReq> {
    constructor(properties: Properties<IReportReceiptReq>) {
        super(properties);
        if (properties) {
            if (properties.receipt) { this.receipt = PayChannelReceipt.create(properties.receipt) as any }
        }
	}
    @protobuf.Field.d(2, "mp_pay_trade_v1_PayChannelReceipt", "optional")
    public receipt?: PayChannelReceipt|null
}
export interface IReportReceiptResp {
}
@protobuf.Type.d("mp_pay_trade_v1_ReportReceiptResp")
export class ReportReceiptResp extends protobuf.Message<IReportReceiptResp> {
    constructor(properties: Properties<IReportReceiptResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IRefundReq {
    appID?: number|null
    appChannel?: string|null
    chargeID?: string|null
    items?: IItemInfo[]
    callbackUrl?: string|null
    operator?: string|null
    sign?: string|null
}
@protobuf.Type.d("mp_pay_trade_v1_RefundReq")
export class RefundReq extends protobuf.Message<IRefundReq> {
    constructor(properties: Properties<IRefundReq>) {
        super(properties);
        if (properties) {
            if (properties.appID) { this.appID = properties.appID }
            if (properties.appChannel) { this.appChannel = properties.appChannel }
            if (properties.chargeID) { this.chargeID = properties.chargeID }
            if (properties.items) { this.items = []; properties.items.forEach((value, index)=>{this.items[index] = ItemInfo.create(properties.items[index]) as any})}
            if (properties.callbackUrl) { this.callbackUrl = properties.callbackUrl }
            if (properties.operator) { this.operator = properties.operator }
            if (properties.sign) { this.sign = properties.sign }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public appID?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public appChannel?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public chargeID?: string|null = ""
    @protobuf.Field.d(4, "mp_pay_trade_v1_ItemInfo", "repeated")
    public items?: ItemInfo[] = []
    @protobuf.Field.d(13, "string", "optional", )
    public callbackUrl?: string|null = ""
    @protobuf.Field.d(14, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(15, "string", "optional", )
    public sign?: string|null = ""
}
export interface IRefundResp {
}
@protobuf.Type.d("mp_pay_trade_v1_RefundResp")
export class RefundResp extends protobuf.Message<IRefundResp> {
    constructor(properties: Properties<IRefundResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IListPayChannelReq {
    appID?: number|null
    appChannel?: string|null
}
@protobuf.Type.d("mp_pay_trade_v1_ListPayChannelReq")
export class ListPayChannelReq extends protobuf.Message<IListPayChannelReq> {
    constructor(properties: Properties<IListPayChannelReq>) {
        super(properties);
        if (properties) {
            if (properties.appID) { this.appID = properties.appID }
            if (properties.appChannel) { this.appChannel = properties.appChannel }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public appID?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public appChannel?: string|null = ""
}
export interface IListPayChannelResp {
    channels?: PayChannel[]
}
@protobuf.Type.d("mp_pay_trade_v1_ListPayChannelResp")
export class ListPayChannelResp extends protobuf.Message<IListPayChannelResp> {
    constructor(properties: Properties<IListPayChannelResp>) {
        super(properties);
        if (properties) {
            if (properties.channels) { this.channels = []; properties.channels.forEach((value, index)=>{this.channels[index] = properties.channels[index]})}
        }
	}
    @protobuf.Field.d(2, PayChannel, "repeated", PayChannel.PayChannelUnknown)
    public channels?: PayChannel[] = []
}
export interface IChargeFilter {
    appID?: number|null
    appChannel?: string|null
    payChannel?: PayChannel|null
    chargeID?: string|null
    payCenterNo?: string|null
    customTradeNo?: string|null
    channelTradeNo?: string|null
    uid?: number|null
    status?: ChargeStatus|null
}
@protobuf.Type.d("mp_pay_trade_v1_ChargeFilter")
export class ChargeFilter extends protobuf.Message<IChargeFilter> {
    constructor(properties: Properties<IChargeFilter>) {
        super(properties);
        if (properties) {
            if (properties.appID) { this.appID = properties.appID }
            if (properties.appChannel) { this.appChannel = properties.appChannel }
            if (properties.payChannel) { this.payChannel = properties.payChannel }
            if (properties.chargeID) { this.chargeID = properties.chargeID }
            if (properties.payCenterNo) { this.payCenterNo = properties.payCenterNo }
            if (properties.customTradeNo) { this.customTradeNo = properties.customTradeNo }
            if (properties.channelTradeNo) { this.channelTradeNo = properties.channelTradeNo }
            if (properties.uid) { this.uid = properties.uid }
            if (properties.status) { this.status = properties.status }
        }
	}
    @protobuf.Field.d(2, "int32", "optional", 0)
    public appID?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public appChannel?: string|null = ""
    @protobuf.Field.d(4, PayChannel, "optional", PayChannel.PayChannelUnknown)
    public payChannel?: PayChannel|null = PayChannel.PayChannelUnknown
    @protobuf.Field.d(5, "string", "optional", )
    public chargeID?: string|null = ""
    @protobuf.Field.d(7, "string", "optional", )
    public payCenterNo?: string|null = ""
    @protobuf.Field.d(8, "string", "optional", )
    public customTradeNo?: string|null = ""
    @protobuf.Field.d(9, "string", "optional", )
    public channelTradeNo?: string|null = ""
    @protobuf.Field.d(10, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(11, ChargeStatus, "optional", ChargeStatus.ChargeStatusNone)
    public status?: ChargeStatus|null = ChargeStatus.ChargeStatusNone
}
export interface IListChargeReq {
    page?: IPageReq
    filter?: IChargeFilter
}
@protobuf.Type.d("mp_pay_trade_v1_ListChargeReq")
export class ListChargeReq extends protobuf.Message<IListChargeReq> {
    constructor(properties: Properties<IListChargeReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = PageReq.create(properties.page) as any }
            if (properties.filter) { this.filter = ChargeFilter.create(properties.filter) as any }
        }
	}
    @protobuf.Field.d(1, "mp_pay_trade_v1_PageReq", "optional")
    public page?: PageReq|null
    @protobuf.Field.d(2, "mp_pay_trade_v1_ChargeFilter", "optional")
    public filter?: ChargeFilter|null
}
export interface IListChargeResp {
    page?: IPageResp
    charges?: ICharge[]
}
@protobuf.Type.d("mp_pay_trade_v1_ListChargeResp")
export class ListChargeResp extends protobuf.Message<IListChargeResp> {
    constructor(properties: Properties<IListChargeResp>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = PageResp.create(properties.page) as any }
            if (properties.charges) { this.charges = []; properties.charges.forEach((value, index)=>{this.charges[index] = Charge.create(properties.charges[index]) as any})}
        }
	}
    @protobuf.Field.d(2, "mp_pay_trade_v1_PageResp", "optional")
    public page?: PageResp|null
    @protobuf.Field.d(3, "mp_pay_trade_v1_Charge", "repeated")
    public charges?: Charge[] = []
}
class $Trade extends RpcService {
    async CreateCharge(req: ICreateChargeReq, params?: RpcParams) : Promise<{err:number, resp:ICreateChargeResp}> {
        let data = CreateChargeReq.create(req)
        this.onBeforeReq("CreateCharge", data, params)
        const buffer = CreateChargeReq.encode(data).finish()
        let [err, pack] = await this.call("CreateCharge", buffer, params)
        if (err) {
            this.onBeforeResp("CreateCharge", err)
            return {err: err, resp: null}
        } else {
            let resp = CreateChargeResp.decode(pack) as any
            this.onBeforeResp("CreateCharge", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ReportReceipt(req: IReportReceiptReq, params?: RpcParams) : Promise<{err:number, resp:IReportReceiptResp}> {
        let data = ReportReceiptReq.create(req)
        this.onBeforeReq("ReportReceipt", data, params)
        const buffer = ReportReceiptReq.encode(data).finish()
        let [err, pack] = await this.call("ReportReceipt", buffer, params)
        if (err) {
            this.onBeforeResp("ReportReceipt", err)
            return {err: err, resp: null}
        } else {
            let resp = ReportReceiptResp.decode(pack) as any
            this.onBeforeResp("ReportReceipt", err, resp)
            return {err: null, resp: resp}
        }
    }
    async Refund(req: IRefundReq, params?: RpcParams) : Promise<{err:number, resp:IRefundResp}> {
        let data = RefundReq.create(req)
        this.onBeforeReq("Refund", data, params)
        const buffer = RefundReq.encode(data).finish()
        let [err, pack] = await this.call("Refund", buffer, params)
        if (err) {
            this.onBeforeResp("Refund", err)
            return {err: err, resp: null}
        } else {
            let resp = RefundResp.decode(pack) as any
            this.onBeforeResp("Refund", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListPayChannel(req: IListPayChannelReq, params?: RpcParams) : Promise<{err:number, resp:IListPayChannelResp}> {
        let data = ListPayChannelReq.create(req)
        this.onBeforeReq("ListPayChannel", data, params)
        const buffer = ListPayChannelReq.encode(data).finish()
        let [err, pack] = await this.call("ListPayChannel", buffer, params)
        if (err) {
            this.onBeforeResp("ListPayChannel", err)
            return {err: err, resp: null}
        } else {
            let resp = ListPayChannelResp.decode(pack) as any
            this.onBeforeResp("ListPayChannel", err, resp)
            return {err: null, resp: resp}
        }
    }
    async PayCenterCallback(req: bgo_component_httpagent_IHttpBody, params?: RpcParams) : Promise<{err:number, resp:bgo_component_httpagent_IHttpBody}> {
        let data = bgo_component_httpagent_HttpBody.create(req)
        this.onBeforeReq("PayCenterCallback", data, params)
        const buffer = bgo_component_httpagent_HttpBody.encode(data).finish()
        let [err, pack] = await this.call("PayCenterCallback", buffer, params)
        if (err) {
            this.onBeforeResp("PayCenterCallback", err)
            return {err: err, resp: null}
        } else {
            let resp = bgo_component_httpagent_HttpBody.decode(pack) as any
            this.onBeforeResp("PayCenterCallback", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListCharge(req: IListChargeReq, params?: RpcParams) : Promise<{err:number, resp:IListChargeResp}> {
        let data = ListChargeReq.create(req)
        this.onBeforeReq("ListCharge", data, params)
        const buffer = ListChargeReq.encode(data).finish()
        let [err, pack] = await this.call("ListCharge", buffer, params)
        if (err) {
            this.onBeforeResp("ListCharge", err)
            return {err: err, resp: null}
        } else {
            let resp = ListChargeResp.decode(pack) as any
            this.onBeforeResp("ListCharge", err, resp)
            return {err: null, resp: resp}
        }
    }
}
export const Trade = new $Trade({
    name: "mp.pay.trade.v1",
})
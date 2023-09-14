import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  Void as base_Void,IVoid as base_IVoid ,  } from "idl/base/base"
import {  TradeCompleteReq as mp_pay_callback_trade_v1_TradeCompleteReq,ITradeCompleteReq as mp_pay_callback_trade_v1_ITradeCompleteReq ,  TradeCompleteResp as mp_pay_callback_trade_v1_TradeCompleteResp,ITradeCompleteResp as mp_pay_callback_trade_v1_ITradeCompleteResp ,  } from "idl/mp/pay/callback/trade.v1"
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
export interface IDeviceInfo {
    os?: OS|null
    ip?: string|null
    guid?: string|null
    appChannel?: string|null
    appVersion?: string|null
}
@protobuf.Type.d("mpff_pay_trade_v1_DeviceInfo")
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
@protobuf.Type.d("mpff_pay_trade_v1_ItemInfo")
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
@protobuf.Type.d("mpff_pay_trade_v1_Charge")
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
    @protobuf.Field.d(14, "mpff_pay_trade_v1_ItemInfo", "repeated")
    public items?: ItemInfo[] = []
    @protobuf.Field.d(15, "string", "optional", )
    public credential?: string|null = ""
    @protobuf.Field.d(16, "string", "optional", )
    public extra?: string|null = ""
    @protobuf.Field.d(17, "string", "optional", )
    public callbackUrl?: string|null = ""
    @protobuf.Field.d(18, "mpff_pay_trade_v1_DeviceInfo", "optional")
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
@protobuf.Type.d("mpff_pay_trade_v1_CreateChargeReq")
export class CreateChargeReq extends protobuf.Message<ICreateChargeReq> {
    constructor(properties: Properties<ICreateChargeReq>) {
        super(properties);
        if (properties) {
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
    @protobuf.Field.d(2, "int32", "optional", 0)
    public appID?: number|null = 0
    @protobuf.Field.d(4, "string", "optional", )
    public appTradeNo?: string|null = ""
    @protobuf.Field.d(5, PayChannel, "optional", PayChannel.PayChannelUnknown)
    public channel?: PayChannel|null = PayChannel.PayChannelUnknown
    @protobuf.Field.d(6, "mpff_pay_trade_v1_DeviceInfo", "optional")
    public deviceInfo?: DeviceInfo|null
    @protobuf.Field.d(7, "string", "optional", )
    public currency?: string|null = ""
    @protobuf.Field.d(8, "int64", "optional", 0)
    public amount?: number|null = 0
    @protobuf.Field.d(9, "string", "optional", )
    public subject?: string|null = ""
    @protobuf.Field.d(10, "string", "optional", )
    public body?: string|null = ""
    @protobuf.Field.d(12, "mpff_pay_trade_v1_ItemInfo", "repeated")
    public items?: ItemInfo[] = []
    @protobuf.Field.d(13, "string", "optional", )
    public callbackURL?: string|null = ""
    @protobuf.Field.d(14, "string", "optional", )
    public extra?: string|null = ""
}
export interface ICreateChargeResp {
    charge?: ICharge
}
@protobuf.Type.d("mpff_pay_trade_v1_CreateChargeResp")
export class CreateChargeResp extends protobuf.Message<ICreateChargeResp> {
    constructor(properties: Properties<ICreateChargeResp>) {
        super(properties);
        if (properties) {
            if (properties.charge) { this.charge = Charge.create(properties.charge) as any }
        }
	}
    @protobuf.Field.d(2, "mpff_pay_trade_v1_Charge", "optional")
    public charge?: Charge|null
}
export interface IPayChannelReceipt {
    appID?: number|null
    channel?: PayChannel|null
    chargeID?: string|null
    payCenterNo?: string|null
    customTradeNo?: string|null
    channelTradeNo?: string|null
    receipt?: string|null
    sign?: string|null
    time?: number|null
    test?: boolean|null
}
@protobuf.Type.d("mpff_pay_trade_v1_PayChannelReceipt")
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
@protobuf.Type.d("mpff_pay_trade_v1_ReportReceiptReq")
export class ReportReceiptReq extends protobuf.Message<IReportReceiptReq> {
    constructor(properties: Properties<IReportReceiptReq>) {
        super(properties);
        if (properties) {
            if (properties.receipt) { this.receipt = PayChannelReceipt.create(properties.receipt) as any }
        }
	}
    @protobuf.Field.d(2, "mpff_pay_trade_v1_PayChannelReceipt", "optional")
    public receipt?: PayChannelReceipt|null
}
export interface IReportReceiptResp {
}
@protobuf.Type.d("mpff_pay_trade_v1_ReportReceiptResp")
export class ReportReceiptResp extends protobuf.Message<IReportReceiptResp> {
    constructor(properties: Properties<IReportReceiptResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IListPayChannelReq {
}
@protobuf.Type.d("mpff_pay_trade_v1_ListPayChannelReq")
export class ListPayChannelReq extends protobuf.Message<IListPayChannelReq> {
    constructor(properties: Properties<IListPayChannelReq>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IListPayChannelResp {
    appChannel?: string|null
    payChannels?: PayChannel[]
}
@protobuf.Type.d("mpff_pay_trade_v1_ListPayChannelResp")
export class ListPayChannelResp extends protobuf.Message<IListPayChannelResp> {
    constructor(properties: Properties<IListPayChannelResp>) {
        super(properties);
        if (properties) {
            if (properties.appChannel) { this.appChannel = properties.appChannel }
            if (properties.payChannels) { this.payChannels = []; properties.payChannels.forEach((value, index)=>{this.payChannels[index] = properties.payChannels[index]})}
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public appChannel?: string|null = ""
    @protobuf.Field.d(2, PayChannel, "repeated", PayChannel.PayChannelUnknown)
    public payChannels?: PayChannel[] = []
}
export interface ITradeCompleteNotify {
    appID?: number|null
    channel?: PayChannel|null
    chargeID?: string|null
    payCenterNo?: string|null
    customTradeNo?: string|null
    channelTradeNo?: string|null
}
@protobuf.Type.d("mpff_pay_trade_v1_TradeCompleteNotify")
export class TradeCompleteNotify extends protobuf.Message<ITradeCompleteNotify> {
    constructor(properties: Properties<ITradeCompleteNotify>) {
        super(properties);
        if (properties) {
            if (properties.appID) { this.appID = properties.appID }
            if (properties.channel) { this.channel = properties.channel }
            if (properties.chargeID) { this.chargeID = properties.chargeID }
            if (properties.payCenterNo) { this.payCenterNo = properties.payCenterNo }
            if (properties.customTradeNo) { this.customTradeNo = properties.customTradeNo }
            if (properties.channelTradeNo) { this.channelTradeNo = properties.channelTradeNo }
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
    async CallbackTradeComplete(req: mp_pay_callback_trade_v1_ITradeCompleteReq, params?: RpcParams) : Promise<{err:number, resp:mp_pay_callback_trade_v1_ITradeCompleteResp}> {
        let data = mp_pay_callback_trade_v1_TradeCompleteReq.create(req)
        this.onBeforeReq("CallbackTradeComplete", data, params)
        const buffer = mp_pay_callback_trade_v1_TradeCompleteReq.encode(data).finish()
        let [err, pack] = await this.call("CallbackTradeComplete", buffer, params)
        if (err) {
            this.onBeforeResp("CallbackTradeComplete", err)
            return {err: err, resp: null}
        } else {
            let resp = mp_pay_callback_trade_v1_TradeCompleteResp.decode(pack) as any
            this.onBeforeResp("CallbackTradeComplete", err, resp)
            return {err: null, resp: resp}
        }
    }
    NotifyTradeComplete(data: Uint8Array, params: RpcParams) : {msg: ITradeCompleteNotify, eventID?: number} {
        let msg = TradeCompleteNotify.decode(data)
        return {msg: msg}
    }
}
export const Trade = new $Trade({
    name: "mpff.pay.trade.v1",
})
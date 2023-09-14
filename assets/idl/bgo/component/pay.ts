import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  Void as base_Void,IVoid as base_IVoid ,  } from "idl/base/base"
import {  HttpBody as bgo_component_httpagent_HttpBody,IHttpBody as bgo_component_httpagent_IHttpBody ,  } from "idl/bgo/component/httpagent"
export enum PeriodType {  
    DAY = 0,  
    MONTH = 1,
}
export enum DeviceType {  
    WIN = 0,  
    IOS = 1,  
    ANDROID = 2,  
    WEB = 3,  
    MAC = 4,
}
export enum PMode {  
    PModeUnknown = 0,  
    GooglePay = 12,  
    ApplePay = 99,  
    AliPayApp = 265,  
    AliPayWap = 26,  
    WxPayApp = 431,  
    WxPayH5 = 898,  
    WxPayJsApi = 520,  
    WxPayMPJsApi = 899,  
    VIVOPAY = 889,  
    OPPOPAY = 215,  
    ApplePayPeriod = 913,  
    AliPayPeriod = 914,  
    HuaWeiPay = 892,
}
export enum PayLimitStatus {  
    PayLimitStatusNone = 0,  
    PayLimitStatusSingleLimit = 1,  
    PayLimitStatusMonthLimit = 2,
}
export interface ICallBackRetryJobReq {
    jobID?: string|null
    delaySec?: number|null
    retryCount?: number|null
    maxRetry?: number|null
    body?: Uint8Array
    serverName?: string|null
    method?: string|null
}
@protobuf.Type.d("bgo_component_pay_CallBackRetryJobReq")
export class CallBackRetryJobReq extends protobuf.Message<ICallBackRetryJobReq> {
    constructor(properties: Properties<ICallBackRetryJobReq>) {
        super(properties);
        if (properties) {
            if (properties.jobID) { this.jobID = properties.jobID }
            if (properties.delaySec) { this.delaySec = properties.delaySec }
            if (properties.retryCount) { this.retryCount = properties.retryCount }
            if (properties.maxRetry) { this.maxRetry = properties.maxRetry }
            if (properties.body) { this.body = properties.body }
            if (properties.serverName) { this.serverName = properties.serverName }
            if (properties.method) { this.method = properties.method }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public jobID?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public delaySec?: number|null = 0
    @protobuf.Field.d(3, "int32", "optional", 0)
    public retryCount?: number|null = 0
    @protobuf.Field.d(4, "int32", "optional", 0)
    public maxRetry?: number|null = 0
    @protobuf.Field.d(5, "bytes", "optional", [])
    public body?: Uint8Array
    @protobuf.Field.d(6, "string", "optional", )
    public serverName?: string|null = ""
    @protobuf.Field.d(7, "string", "optional", )
    public method?: string|null = ""
}
export interface IPeriodOrder {
    periodType?: PeriodType|null
    period?: number|null
    signAmount?: string|null
    signStatusServerName?: string|null
    signStatusMethod?: string|null
    productID?: string|null
}
@protobuf.Type.d("bgo_component_pay_PeriodOrder")
export class PeriodOrder extends protobuf.Message<IPeriodOrder> {
    constructor(properties: Properties<IPeriodOrder>) {
        super(properties);
        if (properties) {
            if (properties.periodType) { this.periodType = properties.periodType }
            if (properties.period) { this.period = properties.period }
            if (properties.signAmount) { this.signAmount = properties.signAmount }
            if (properties.signStatusServerName) { this.signStatusServerName = properties.signStatusServerName }
            if (properties.signStatusMethod) { this.signStatusMethod = properties.signStatusMethod }
            if (properties.productID) { this.productID = properties.productID }
        }
	}
    @protobuf.Field.d(1, PeriodType, "optional", PeriodType.DAY)
    public periodType?: PeriodType|null = PeriodType.DAY
    @protobuf.Field.d(2, "int32", "optional", 0)
    public period?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public signAmount?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public signStatusServerName?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public signStatusMethod?: string|null = ""
    @protobuf.Field.d(6, "string", "optional", )
    public productID?: string|null = ""
}
export interface IMsgBytes {
    bytes?: Uint8Array
}
@protobuf.Type.d("bgo_component_pay_MsgBytes")
export class MsgBytes extends protobuf.Message<IMsgBytes> {
    constructor(properties: Properties<IMsgBytes>) {
        super(properties);
        if (properties) {
            if (properties.bytes) { this.bytes = properties.bytes }
        }
	}
    @protobuf.Field.d(1, "bytes", "optional", [])
    public bytes?: Uint8Array
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
@protobuf.Type.d("bgo_component_pay_PBOrderInfo")
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
export interface IPBNoticeInfo {
    pid?: string|null
    pdealno?: string|null
    receipt?: string|null
    time?: number|null
    test?: number|null
    sign?: string|null
}
@protobuf.Type.d("bgo_component_pay_PBNoticeInfo")
export class PBNoticeInfo extends protobuf.Message<IPBNoticeInfo> {
    constructor(properties: Properties<IPBNoticeInfo>) {
        super(properties);
        if (properties) {
            if (properties.pid) { this.pid = properties.pid }
            if (properties.pdealno) { this.pdealno = properties.pdealno }
            if (properties.receipt) { this.receipt = properties.receipt }
            if (properties.time) { this.time = properties.time }
            if (properties.test) { this.test = properties.test }
            if (properties.sign) { this.sign = properties.sign }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public pid?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public pdealno?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public receipt?: string|null = ""
    @protobuf.Field.d(4, "int64", "optional", 0)
    public time?: number|null = 0
    @protobuf.Field.d(5, "int32", "optional", 0)
    public test?: number|null = 0
    @protobuf.Field.d(6, "string", "optional", )
    public sign?: string|null = ""
}
export interface ICreateOrderRequest {
    gid?: number|null
    price?: string|null
    unit?: string|null
    name?: string|null
    mode?: number|null
    zid?: number|null
    ServerName?: string|null
    Method?: string|null
    expireTimeUnix?: number|null
    extra?: string|null
    periodOrder?: IPeriodOrder
}
@protobuf.Type.d("bgo_component_pay_CreateOrderRequest")
export class CreateOrderRequest extends protobuf.Message<ICreateOrderRequest> {
    constructor(properties: Properties<ICreateOrderRequest>) {
        super(properties);
        if (properties) {
            if (properties.gid) { this.gid = properties.gid }
            if (properties.price) { this.price = properties.price }
            if (properties.unit) { this.unit = properties.unit }
            if (properties.name) { this.name = properties.name }
            if (properties.mode) { this.mode = properties.mode }
            if (properties.zid) { this.zid = properties.zid }
            if (properties.ServerName) { this.ServerName = properties.ServerName }
            if (properties.Method) { this.Method = properties.Method }
            if (properties.expireTimeUnix) { this.expireTimeUnix = properties.expireTimeUnix }
            if (properties.extra) { this.extra = properties.extra }
            if (properties.periodOrder) { this.periodOrder = PeriodOrder.create(properties.periodOrder) as any }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public gid?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public price?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public unit?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(5, "int32", "optional", 0)
    public mode?: number|null = 0
    @protobuf.Field.d(6, "int32", "optional", 0)
    public zid?: number|null = 0
    @protobuf.Field.d(7, "string", "optional", )
    public ServerName?: string|null = ""
    @protobuf.Field.d(8, "string", "optional", )
    public Method?: string|null = ""
    @protobuf.Field.d(9, "int64", "optional", 0)
    public expireTimeUnix?: number|null = 0
    @protobuf.Field.d(10, "string", "optional", )
    public extra?: string|null = ""
    @protobuf.Field.d(11, "bgo_component_pay_PeriodOrder", "optional")
    public periodOrder?: PeriodOrder|null
}
export interface ICreateOrderExtra {
    callBackUrl?: string|null
    openid?: string|null
    productId?: string|null
}
@protobuf.Type.d("bgo_component_pay_CreateOrderExtra")
export class CreateOrderExtra extends protobuf.Message<ICreateOrderExtra> {
    constructor(properties: Properties<ICreateOrderExtra>) {
        super(properties);
        if (properties) {
            if (properties.callBackUrl) { this.callBackUrl = properties.callBackUrl }
            if (properties.openid) { this.openid = properties.openid }
            if (properties.productId) { this.productId = properties.productId }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public callBackUrl?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public openid?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public productId?: string|null = ""
}
export interface ICreateOrderResponse {
    code?: number|null
    order?: IPBOrderInfo
    proxyUrl?: string|null
}
@protobuf.Type.d("bgo_component_pay_CreateOrderResponse")
export class CreateOrderResponse extends protobuf.Message<ICreateOrderResponse> {
    constructor(properties: Properties<ICreateOrderResponse>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.order) { this.order = PBOrderInfo.create(properties.order) as any }
            if (properties.proxyUrl) { this.proxyUrl = properties.proxyUrl }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
    @protobuf.Field.d(3, "bgo_component_pay_PBOrderInfo", "optional")
    public order?: PBOrderInfo|null
    @protobuf.Field.d(4, "string", "optional", )
    public proxyUrl?: string|null = ""
}
export interface INoticeCenterRequest {
    mode?: number|null
    info?: IPBNoticeInfo
}
@protobuf.Type.d("bgo_component_pay_NoticeCenterRequest")
export class NoticeCenterRequest extends protobuf.Message<INoticeCenterRequest> {
    constructor(properties: Properties<INoticeCenterRequest>) {
        super(properties);
        if (properties) {
            if (properties.mode) { this.mode = properties.mode }
            if (properties.info) { this.info = PBNoticeInfo.create(properties.info) as any }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public mode?: number|null = 0
    @protobuf.Field.d(2, "bgo_component_pay_PBNoticeInfo", "optional")
    public info?: PBNoticeInfo|null
}
export interface INoticeCenterResponse {
    code?: number|null
    ErrorCode?: string|null
    result?: number|null
    error?: string|null
}
@protobuf.Type.d("bgo_component_pay_NoticeCenterResponse")
export class NoticeCenterResponse extends protobuf.Message<INoticeCenterResponse> {
    constructor(properties: Properties<INoticeCenterResponse>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.ErrorCode) { this.ErrorCode = properties.ErrorCode }
            if (properties.result) { this.result = properties.result }
            if (properties.error) { this.error = properties.error }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public ErrorCode?: string|null = ""
    @protobuf.Field.d(3, "int32", "optional", 0)
    public result?: number|null = 0
    @protobuf.Field.d(4, "string", "optional", )
    public error?: string|null = ""
}
export interface IPayPconfRequest {
    Sid?: string|null
    AppId?: string|null
    DevId?: DeviceType|null
    PMode?: number|null
    ZoneId?: number|null
}
@protobuf.Type.d("bgo_component_pay_PayPconfRequest")
export class PayPconfRequest extends protobuf.Message<IPayPconfRequest> {
    constructor(properties: Properties<IPayPconfRequest>) {
        super(properties);
        if (properties) {
            if (properties.Sid) { this.Sid = properties.Sid }
            if (properties.AppId) { this.AppId = properties.AppId }
            if (properties.DevId) { this.DevId = properties.DevId }
            if (properties.PMode) { this.PMode = properties.PMode }
            if (properties.ZoneId) { this.ZoneId = properties.ZoneId }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public Sid?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public AppId?: string|null = ""
    @protobuf.Field.d(3, DeviceType, "optional", DeviceType.WIN)
    public DevId?: DeviceType|null = DeviceType.WIN
    @protobuf.Field.d(4, "int32", "optional", 0)
    public PMode?: number|null = 0
    @protobuf.Field.d(5, "int32", "optional", 0)
    public ZoneId?: number|null = 0
}
export interface IPayPconfResponse {
    code?: number|null
}
@protobuf.Type.d("bgo_component_pay_PayPconfResponse")
export class PayPconfResponse extends protobuf.Message<IPayPconfResponse> {
    constructor(properties: Properties<IPayPconfResponse>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
}
export interface IPBIOSGoodsInfo {
    bid?: string|null
    productid?: string|null
    amount?: string|null
    tier?: string|null
}
@protobuf.Type.d("bgo_component_pay_PBIOSGoodsInfo")
export class PBIOSGoodsInfo extends protobuf.Message<IPBIOSGoodsInfo> {
    constructor(properties: Properties<IPBIOSGoodsInfo>) {
        super(properties);
        if (properties) {
            if (properties.bid) { this.bid = properties.bid }
            if (properties.productid) { this.productid = properties.productid }
            if (properties.amount) { this.amount = properties.amount }
            if (properties.tier) { this.tier = properties.tier }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public bid?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public productid?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public amount?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public tier?: string|null = ""
}
export interface IIOSGoodsRegisterRequest {
    goods?: IPBIOSGoodsInfo[]
}
@protobuf.Type.d("bgo_component_pay_IOSGoodsRegisterRequest")
export class IOSGoodsRegisterRequest extends protobuf.Message<IIOSGoodsRegisterRequest> {
    constructor(properties: Properties<IIOSGoodsRegisterRequest>) {
        super(properties);
        if (properties) {
            if (properties.goods) { this.goods = []; properties.goods.forEach((value, index)=>{this.goods[index] = PBIOSGoodsInfo.create(properties.goods[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "bgo_component_pay_PBIOSGoodsInfo", "repeated")
    public goods?: PBIOSGoodsInfo[] = []
}
export interface IIOSGoodsRegisterResponse {
    code?: number|null
}
@protobuf.Type.d("bgo_component_pay_IOSGoodsRegisterResponse")
export class IOSGoodsRegisterResponse extends protobuf.Message<IIOSGoodsRegisterResponse> {
    constructor(properties: Properties<IIOSGoodsRegisterResponse>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
}
export interface IDeliveryRequest {
    Do?: string|null
    Paycoins?: string|null
    Sitemid?: string|null
    Pid?: string|null
    Time?: string|null
    Sign?: string|null
    Pamount?: string|null
    Pmode?: string|null
    Payconfid?: string|null
    Paychips_v2?: string|null
    Payprod_v2?: string|null
    Sign_v2?: string|null
    Pdealno?: string|null
    Pc_sid?: string|null
    Pc_appid?: string|null
    Pc_time?: string|null
    Pc_rate?: string|null
    Pamount_usd?: string|null
    Pamount_rate?: string|null
    Pamount_unit?: string|null
    Mid?: string|null
    Ext?: string|null
    Game_item_id?: string|null
    Pamount_change?: string|null
    Pstarttime?: string|null
    Pendtime?: string|null
    Sign_v3?: string|null
}
@protobuf.Type.d("bgo_component_pay_DeliveryRequest")
export class DeliveryRequest extends protobuf.Message<IDeliveryRequest> {
    constructor(properties: Properties<IDeliveryRequest>) {
        super(properties);
        if (properties) {
            if (properties.Do) { this.Do = properties.Do }
            if (properties.Paycoins) { this.Paycoins = properties.Paycoins }
            if (properties.Sitemid) { this.Sitemid = properties.Sitemid }
            if (properties.Pid) { this.Pid = properties.Pid }
            if (properties.Time) { this.Time = properties.Time }
            if (properties.Sign) { this.Sign = properties.Sign }
            if (properties.Pamount) { this.Pamount = properties.Pamount }
            if (properties.Pmode) { this.Pmode = properties.Pmode }
            if (properties.Payconfid) { this.Payconfid = properties.Payconfid }
            if (properties.Paychips_v2) { this.Paychips_v2 = properties.Paychips_v2 }
            if (properties.Payprod_v2) { this.Payprod_v2 = properties.Payprod_v2 }
            if (properties.Sign_v2) { this.Sign_v2 = properties.Sign_v2 }
            if (properties.Pdealno) { this.Pdealno = properties.Pdealno }
            if (properties.Pc_sid) { this.Pc_sid = properties.Pc_sid }
            if (properties.Pc_appid) { this.Pc_appid = properties.Pc_appid }
            if (properties.Pc_time) { this.Pc_time = properties.Pc_time }
            if (properties.Pc_rate) { this.Pc_rate = properties.Pc_rate }
            if (properties.Pamount_usd) { this.Pamount_usd = properties.Pamount_usd }
            if (properties.Pamount_rate) { this.Pamount_rate = properties.Pamount_rate }
            if (properties.Pamount_unit) { this.Pamount_unit = properties.Pamount_unit }
            if (properties.Mid) { this.Mid = properties.Mid }
            if (properties.Ext) { this.Ext = properties.Ext }
            if (properties.Game_item_id) { this.Game_item_id = properties.Game_item_id }
            if (properties.Pamount_change) { this.Pamount_change = properties.Pamount_change }
            if (properties.Pstarttime) { this.Pstarttime = properties.Pstarttime }
            if (properties.Pendtime) { this.Pendtime = properties.Pendtime }
            if (properties.Sign_v3) { this.Sign_v3 = properties.Sign_v3 }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public Do?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public Paycoins?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public Sitemid?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public Pid?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public Time?: string|null = ""
    @protobuf.Field.d(6, "string", "optional", )
    public Sign?: string|null = ""
    @protobuf.Field.d(7, "string", "optional", )
    public Pamount?: string|null = ""
    @protobuf.Field.d(8, "string", "optional", )
    public Pmode?: string|null = ""
    @protobuf.Field.d(9, "string", "optional", )
    public Payconfid?: string|null = ""
    @protobuf.Field.d(10, "string", "optional", )
    public Paychips_v2?: string|null = ""
    @protobuf.Field.d(11, "string", "optional", )
    public Payprod_v2?: string|null = ""
    @protobuf.Field.d(12, "string", "optional", )
    public Sign_v2?: string|null = ""
    @protobuf.Field.d(13, "string", "optional", )
    public Pdealno?: string|null = ""
    @protobuf.Field.d(14, "string", "optional", )
    public Pc_sid?: string|null = ""
    @protobuf.Field.d(15, "string", "optional", )
    public Pc_appid?: string|null = ""
    @protobuf.Field.d(16, "string", "optional", )
    public Pc_time?: string|null = ""
    @protobuf.Field.d(17, "string", "optional", )
    public Pc_rate?: string|null = ""
    @protobuf.Field.d(18, "string", "optional", )
    public Pamount_usd?: string|null = ""
    @protobuf.Field.d(19, "string", "optional", )
    public Pamount_rate?: string|null = ""
    @protobuf.Field.d(20, "string", "optional", )
    public Pamount_unit?: string|null = ""
    @protobuf.Field.d(21, "string", "optional", )
    public Mid?: string|null = ""
    @protobuf.Field.d(22, "string", "optional", )
    public Ext?: string|null = ""
    @protobuf.Field.d(23, "string", "optional", )
    public Game_item_id?: string|null = ""
    @protobuf.Field.d(24, "string", "optional", )
    public Pamount_change?: string|null = ""
    @protobuf.Field.d(25, "string", "optional", )
    public Pstarttime?: string|null = ""
    @protobuf.Field.d(26, "string", "optional", )
    public Pendtime?: string|null = ""
    @protobuf.Field.d(27, "string", "optional", )
    public Sign_v3?: string|null = ""
}
export interface IDeliveryResponse {
    code?: number|null
}
@protobuf.Type.d("bgo_component_pay_DeliveryResponse")
export class DeliveryResponse extends protobuf.Message<IDeliveryResponse> {
    constructor(properties: Properties<IDeliveryResponse>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
}
export interface IRefundOrderReq {
    pid?: string|null
    reason?: string|null
    operator?: string|null
    sign?: string|null
}
@protobuf.Type.d("bgo_component_pay_RefundOrderReq")
export class RefundOrderReq extends protobuf.Message<IRefundOrderReq> {
    constructor(properties: Properties<IRefundOrderReq>) {
        super(properties);
        if (properties) {
            if (properties.pid) { this.pid = properties.pid }
            if (properties.reason) { this.reason = properties.reason }
            if (properties.operator) { this.operator = properties.operator }
            if (properties.sign) { this.sign = properties.sign }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public pid?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public reason?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public sign?: string|null = ""
}
export interface IRefundOrderResp {
    code?: number|null
}
@protobuf.Type.d("bgo_component_pay_RefundOrderResp")
export class RefundOrderResp extends protobuf.Message<IRefundOrderResp> {
    constructor(properties: Properties<IRefundOrderResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
}
export interface IProductInfo {
    productId?: string|null
    amount?: string|null
    periodType?: PeriodType|null
    period?: number|null
    goodsId?: string|null
}
@protobuf.Type.d("bgo_component_pay_ProductInfo")
export class ProductInfo extends protobuf.Message<IProductInfo> {
    constructor(properties: Properties<IProductInfo>) {
        super(properties);
        if (properties) {
            if (properties.productId) { this.productId = properties.productId }
            if (properties.amount) { this.amount = properties.amount }
            if (properties.periodType) { this.periodType = properties.periodType }
            if (properties.period) { this.period = properties.period }
            if (properties.goodsId) { this.goodsId = properties.goodsId }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public productId?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public amount?: string|null = ""
    @protobuf.Field.d(3, PeriodType, "optional", PeriodType.DAY)
    public periodType?: PeriodType|null = PeriodType.DAY
    @protobuf.Field.d(4, "int32", "optional", 0)
    public period?: number|null = 0
    @protobuf.Field.d(5, "string", "optional", )
    public goodsId?: string|null = ""
}
export interface IUpdateAppleProductInfoReq {
    infos?: IProductInfo[]
}
@protobuf.Type.d("bgo_component_pay_UpdateAppleProductInfoReq")
export class UpdateAppleProductInfoReq extends protobuf.Message<IUpdateAppleProductInfoReq> {
    constructor(properties: Properties<IUpdateAppleProductInfoReq>) {
        super(properties);
        if (properties) {
            if (properties.infos) { this.infos = []; properties.infos.forEach((value, index)=>{this.infos[index] = ProductInfo.create(properties.infos[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "bgo_component_pay_ProductInfo", "repeated")
    public infos?: ProductInfo[] = []
}
export interface IGetPayLimitInfoReq {
    amount?: number|null
}
@protobuf.Type.d("bgo_component_pay_GetPayLimitInfoReq")
export class GetPayLimitInfoReq extends protobuf.Message<IGetPayLimitInfoReq> {
    constructor(properties: Properties<IGetPayLimitInfoReq>) {
        super(properties);
        if (properties) {
            if (properties.amount) { this.amount = properties.amount }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public amount?: number|null = 0
}
export interface ILimitInfo {
    hadLimit?: boolean|null
    limitStatus?: PayLimitStatus|null
    singleLimit?: number|null
    monthLimit?: number|null
    monthLimitLeft?: number|null
    minAge?: number|null
    maxAge?: number|null
    age?: number|null
    monthAmount?: number|null
}
@protobuf.Type.d("bgo_component_pay_LimitInfo")
export class LimitInfo extends protobuf.Message<ILimitInfo> {
    constructor(properties: Properties<ILimitInfo>) {
        super(properties);
        if (properties) {
            if (properties.hadLimit) { this.hadLimit = properties.hadLimit }
            if (properties.limitStatus) { this.limitStatus = properties.limitStatus }
            if (properties.singleLimit) { this.singleLimit = properties.singleLimit }
            if (properties.monthLimit) { this.monthLimit = properties.monthLimit }
            if (properties.monthLimitLeft) { this.monthLimitLeft = properties.monthLimitLeft }
            if (properties.minAge) { this.minAge = properties.minAge }
            if (properties.maxAge) { this.maxAge = properties.maxAge }
            if (properties.age) { this.age = properties.age }
            if (properties.monthAmount) { this.monthAmount = properties.monthAmount }
        }
	}
    @protobuf.Field.d(1, "bool", "optional", false)
    public hadLimit?: boolean|null = false
    @protobuf.Field.d(2, PayLimitStatus, "optional", PayLimitStatus.PayLimitStatusNone)
    public limitStatus?: PayLimitStatus|null = PayLimitStatus.PayLimitStatusNone
    @protobuf.Field.d(3, "int64", "optional", 0)
    public singleLimit?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public monthLimit?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public monthLimitLeft?: number|null = 0
    @protobuf.Field.d(6, "int32", "optional", 0)
    public minAge?: number|null = 0
    @protobuf.Field.d(7, "int32", "optional", 0)
    public maxAge?: number|null = 0
    @protobuf.Field.d(8, "int32", "optional", 0)
    public age?: number|null = 0
    @protobuf.Field.d(9, "int64", "optional", 0)
    public monthAmount?: number|null = 0
}
export interface IGetPayLimitInfoResp {
    limitInfo?: ILimitInfo
    hintText?: string|null
}
@protobuf.Type.d("bgo_component_pay_GetPayLimitInfoResp")
export class GetPayLimitInfoResp extends protobuf.Message<IGetPayLimitInfoResp> {
    constructor(properties: Properties<IGetPayLimitInfoResp>) {
        super(properties);
        if (properties) {
            if (properties.limitInfo) { this.limitInfo = LimitInfo.create(properties.limitInfo) as any }
            if (properties.hintText) { this.hintText = properties.hintText }
        }
	}
    @protobuf.Field.d(1, "bgo_component_pay_LimitInfo", "optional")
    public limitInfo?: LimitInfo|null
    @protobuf.Field.d(2, "string", "optional", )
    public hintText?: string|null = ""
}
export interface IHintText {
    id?: string|null
    minAge?: number|null
    maxAge?: number|null
    text?: string|null
}
@protobuf.Type.d("bgo_component_pay_HintText")
export class HintText extends protobuf.Message<IHintText> {
    constructor(properties: Properties<IHintText>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.minAge) { this.minAge = properties.minAge }
            if (properties.maxAge) { this.maxAge = properties.maxAge }
            if (properties.text) { this.text = properties.text }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public id?: string|null = ""
    @protobuf.Field.d(2, "int32", "optional", 0)
    public minAge?: number|null = 0
    @protobuf.Field.d(3, "int32", "optional", 0)
    public maxAge?: number|null = 0
    @protobuf.Field.d(4, "string", "optional", )
    public text?: string|null = ""
}
export interface ISavePayLimitHintTextReq {
    hintText?: IHintText
}
@protobuf.Type.d("bgo_component_pay_SavePayLimitHintTextReq")
export class SavePayLimitHintTextReq extends protobuf.Message<ISavePayLimitHintTextReq> {
    constructor(properties: Properties<ISavePayLimitHintTextReq>) {
        super(properties);
        if (properties) {
            if (properties.hintText) { this.hintText = HintText.create(properties.hintText) as any }
        }
	}
    @protobuf.Field.d(1, "bgo_component_pay_HintText", "optional")
    public hintText?: HintText|null
}
export interface ISavePayLimitHintTextResp {
}
@protobuf.Type.d("bgo_component_pay_SavePayLimitHintTextResp")
export class SavePayLimitHintTextResp extends protobuf.Message<ISavePayLimitHintTextResp> {
    constructor(properties: Properties<ISavePayLimitHintTextResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IRemovePayLimitHintTextReq {
    id?: string|null
}
@protobuf.Type.d("bgo_component_pay_RemovePayLimitHintTextReq")
export class RemovePayLimitHintTextReq extends protobuf.Message<IRemovePayLimitHintTextReq> {
    constructor(properties: Properties<IRemovePayLimitHintTextReq>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public id?: string|null = ""
}
export interface IRemovePayLimitHintTextResp {
}
@protobuf.Type.d("bgo_component_pay_RemovePayLimitHintTextResp")
export class RemovePayLimitHintTextResp extends protobuf.Message<IRemovePayLimitHintTextResp> {
    constructor(properties: Properties<IRemovePayLimitHintTextResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IListPayLimitHintTextReq {
}
@protobuf.Type.d("bgo_component_pay_ListPayLimitHintTextReq")
export class ListPayLimitHintTextReq extends protobuf.Message<IListPayLimitHintTextReq> {
    constructor(properties: Properties<IListPayLimitHintTextReq>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IListPayLimitHintTextResp {
    hintTexts?: IHintText[]
}
@protobuf.Type.d("bgo_component_pay_ListPayLimitHintTextResp")
export class ListPayLimitHintTextResp extends protobuf.Message<IListPayLimitHintTextResp> {
    constructor(properties: Properties<IListPayLimitHintTextResp>) {
        super(properties);
        if (properties) {
            if (properties.hintTexts) { this.hintTexts = []; properties.hintTexts.forEach((value, index)=>{this.hintTexts[index] = HintText.create(properties.hintTexts[index]) as any})}
        }
	}
    @protobuf.Field.d(3, "bgo_component_pay_HintText", "repeated")
    public hintTexts?: HintText[] = []
}
class $Pay extends RpcService {
    async CreateOrder(req: ICreateOrderRequest, params?: RpcParams) : Promise<{err:number, resp:ICreateOrderResponse}> {
        let data = CreateOrderRequest.create(req)
        console.log("CreateOrder...begin", data, params)
        const buffer = CreateOrderRequest.encode(data).finish()
        let [err, pack] = await this.call("CreateOrder", buffer, params)
        if (err) {
            console.error("CreateOrder...error", RpcService.ErrCode[err] || err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = CreateOrderResponse.decode(pack) as any
            console.log("CreateOrder...end", resp)
            return {err: null, resp: resp}
        }
    }
    async NoticeCenter(req: INoticeCenterRequest, params?: RpcParams) : Promise<{err:number, resp:INoticeCenterResponse}> {
        let data = NoticeCenterRequest.create(req)
        console.log("NoticeCenter...begin", data, params)
        const buffer = NoticeCenterRequest.encode(data).finish()
        let [err, pack] = await this.call("NoticeCenter", buffer, params)
        if (err) {
            console.error("NoticeCenter...error", RpcService.ErrCode[err] || err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = NoticeCenterResponse.decode(pack) as any
            console.log("NoticeCenter...end", resp)
            return {err: null, resp: resp}
        }
    }
    async DeliveryOrder(req: IMsgBytes, params?: RpcParams) : Promise<{err:number, resp:IMsgBytes}> {
        let data = MsgBytes.create(req)
        console.log("DeliveryOrder...begin", data, params)
        const buffer = MsgBytes.encode(data).finish()
        let [err, pack] = await this.call("DeliveryOrder", buffer, params)
        if (err) {
            console.error("DeliveryOrder...error", RpcService.ErrCode[err] || err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = MsgBytes.decode(pack) as any
            console.log("DeliveryOrder...end", resp)
            return {err: null, resp: resp}
        }
    }
    async PayCenterConfig(req: IPayPconfRequest, params?: RpcParams) : Promise<{err:number, resp:IPayPconfResponse}> {
        let data = PayPconfRequest.create(req)
        console.log("PayCenterConfig...begin", data, params)
        const buffer = PayPconfRequest.encode(data).finish()
        let [err, pack] = await this.call("PayCenterConfig", buffer, params)
        if (err) {
            console.error("PayCenterConfig...error", RpcService.ErrCode[err] || err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = PayPconfResponse.decode(pack) as any
            console.log("PayCenterConfig...end", resp)
            return {err: null, resp: resp}
        }
    }
    async IOSGoodsRegister(req: IIOSGoodsRegisterRequest, params?: RpcParams) : Promise<{err:number, resp:IIOSGoodsRegisterResponse}> {
        let data = IOSGoodsRegisterRequest.create(req)
        console.log("IOSGoodsRegister...begin", data, params)
        const buffer = IOSGoodsRegisterRequest.encode(data).finish()
        let [err, pack] = await this.call("IOSGoodsRegister", buffer, params)
        if (err) {
            console.error("IOSGoodsRegister...error", RpcService.ErrCode[err] || err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = IOSGoodsRegisterResponse.decode(pack) as any
            console.log("IOSGoodsRegister...end", resp)
            return {err: null, resp: resp}
        }
    }
    async RegistryPayConfByHttp(req: IMsgBytes, params?: RpcParams) : Promise<{err:number, resp:IMsgBytes}> {
        let data = MsgBytes.create(req)
        console.log("RegistryPayConfByHttp...begin", data, params)
        const buffer = MsgBytes.encode(data).finish()
        let [err, pack] = await this.call("RegistryPayConfByHttp", buffer, params)
        if (err) {
            console.error("RegistryPayConfByHttp...error", RpcService.ErrCode[err] || err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = MsgBytes.decode(pack) as any
            console.log("RegistryPayConfByHttp...end", resp)
            return {err: null, resp: resp}
        }
    }
    async RegistryIOSGoodsByHttp(req: IMsgBytes, params?: RpcParams) : Promise<{err:number, resp:IMsgBytes}> {
        let data = MsgBytes.create(req)
        console.log("RegistryIOSGoodsByHttp...begin", data, params)
        const buffer = MsgBytes.encode(data).finish()
        let [err, pack] = await this.call("RegistryIOSGoodsByHttp", buffer, params)
        if (err) {
            console.error("RegistryIOSGoodsByHttp...error", RpcService.ErrCode[err] || err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = MsgBytes.decode(pack) as any
            console.log("RegistryIOSGoodsByHttp...end", resp)
            return {err: null, resp: resp}
        }
    }
    async RegistryPayTokenByHttp(req: IMsgBytes, params?: RpcParams) : Promise<{err:number, resp:IMsgBytes}> {
        let data = MsgBytes.create(req)
        console.log("RegistryPayTokenByHttp...begin", data, params)
        const buffer = MsgBytes.encode(data).finish()
        let [err, pack] = await this.call("RegistryPayTokenByHttp", buffer, params)
        if (err) {
            console.error("RegistryPayTokenByHttp...error", RpcService.ErrCode[err] || err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = MsgBytes.decode(pack) as any
            console.log("RegistryPayTokenByHttp...end", resp)
            return {err: null, resp: resp}
        }
    }
    async RefundOrder(req: IRefundOrderReq, params?: RpcParams) : Promise<{err:number, resp:IRefundOrderResp}> {
        let data = RefundOrderReq.create(req)
        console.log("RefundOrder...begin", data, params)
        const buffer = RefundOrderReq.encode(data).finish()
        let [err, pack] = await this.call("RefundOrder", buffer, params)
        if (err) {
            console.error("RefundOrder...error", RpcService.ErrCode[err] || err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = RefundOrderResp.decode(pack) as any
            console.log("RefundOrder...end", resp)
            return {err: null, resp: resp}
        }
    }
    async AliPayCallBack(req: bgo_component_httpagent_IHttpBody, params?: RpcParams) : Promise<{err:number, resp:bgo_component_httpagent_IHttpBody}> {
        let data = bgo_component_httpagent_HttpBody.create(req)
        console.log("AliPayCallBack...begin", data, params)
        const buffer = bgo_component_httpagent_HttpBody.encode(data).finish()
        let [err, pack] = await this.call("AliPayCallBack", buffer, params)
        if (err) {
            console.error("AliPayCallBack...error", RpcService.ErrCode[err] || err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = bgo_component_httpagent_HttpBody.decode(pack) as any
            console.log("AliPayCallBack...end", resp)
            return {err: null, resp: resp}
        }
    }
    async ApplePayCallBack(req: bgo_component_httpagent_IHttpBody, params?: RpcParams) : Promise<{err:number, resp:bgo_component_httpagent_IHttpBody}> {
        let data = bgo_component_httpagent_HttpBody.create(req)
        console.log("ApplePayCallBack...begin", data, params)
        const buffer = bgo_component_httpagent_HttpBody.encode(data).finish()
        let [err, pack] = await this.call("ApplePayCallBack", buffer, params)
        if (err) {
            console.error("ApplePayCallBack...error", RpcService.ErrCode[err] || err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = bgo_component_httpagent_HttpBody.decode(pack) as any
            console.log("ApplePayCallBack...end", resp)
            return {err: null, resp: resp}
        }
    }
    async UpdateAppleProductInfo(req: IUpdateAppleProductInfoReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = UpdateAppleProductInfoReq.create(req)
        console.log("UpdateAppleProductInfo...begin", data, params)
        const buffer = UpdateAppleProductInfoReq.encode(data).finish()
        let [err, pack] = await this.call("UpdateAppleProductInfo", buffer, params)
        if (err) {
            console.error("UpdateAppleProductInfo...error", RpcService.ErrCode[err] || err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            console.log("UpdateAppleProductInfo...end", resp)
            return {err: null, resp: resp}
        }
    }
    async CallBackRetryJob(req: ICallBackRetryJobReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = CallBackRetryJobReq.create(req)
        console.log("CallBackRetryJob...begin", data, params)
        const buffer = CallBackRetryJobReq.encode(data).finish()
        let [err, pack] = await this.call("CallBackRetryJob", buffer, params)
        if (err) {
            console.error("CallBackRetryJob...error", RpcService.ErrCode[err] || err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            console.log("CallBackRetryJob...end", resp)
            return {err: null, resp: resp}
        }
    }
    async GetPayLimitInfo(req: IGetPayLimitInfoReq, params?: RpcParams) : Promise<{err:number, resp:IGetPayLimitInfoResp}> {
        let data = GetPayLimitInfoReq.create(req)
        console.log("GetPayLimitInfo...begin", data, params)
        const buffer = GetPayLimitInfoReq.encode(data).finish()
        let [err, pack] = await this.call("GetPayLimitInfo", buffer, params)
        if (err) {
            console.error("GetPayLimitInfo...error", RpcService.ErrCode[err] || err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = GetPayLimitInfoResp.decode(pack) as any
            console.log("GetPayLimitInfo...end", resp)
            return {err: null, resp: resp}
        }
    }
    async SavePayLimitHintText(req: ISavePayLimitHintTextReq, params?: RpcParams) : Promise<{err:number, resp:ISavePayLimitHintTextResp}> {
        let data = SavePayLimitHintTextReq.create(req)
        console.log("SavePayLimitHintText...begin", data, params)
        const buffer = SavePayLimitHintTextReq.encode(data).finish()
        let [err, pack] = await this.call("SavePayLimitHintText", buffer, params)
        if (err) {
            console.error("SavePayLimitHintText...error", RpcService.ErrCode[err] || err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = SavePayLimitHintTextResp.decode(pack) as any
            console.log("SavePayLimitHintText...end", resp)
            return {err: null, resp: resp}
        }
    }
    async RemovePayLimitHintText(req: IRemovePayLimitHintTextReq, params?: RpcParams) : Promise<{err:number, resp:IRemovePayLimitHintTextResp}> {
        let data = RemovePayLimitHintTextReq.create(req)
        console.log("RemovePayLimitHintText...begin", data, params)
        const buffer = RemovePayLimitHintTextReq.encode(data).finish()
        let [err, pack] = await this.call("RemovePayLimitHintText", buffer, params)
        if (err) {
            console.error("RemovePayLimitHintText...error", RpcService.ErrCode[err] || err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = RemovePayLimitHintTextResp.decode(pack) as any
            console.log("RemovePayLimitHintText...end", resp)
            return {err: null, resp: resp}
        }
    }
    async ListPayLimitHintText(req: IListPayLimitHintTextReq, params?: RpcParams) : Promise<{err:number, resp:IListPayLimitHintTextResp}> {
        let data = ListPayLimitHintTextReq.create(req)
        console.log("ListPayLimitHintText...begin", data, params)
        const buffer = ListPayLimitHintTextReq.encode(data).finish()
        let [err, pack] = await this.call("ListPayLimitHintText", buffer, params)
        if (err) {
            console.error("ListPayLimitHintText...error", RpcService.ErrCode[err] || err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = ListPayLimitHintTextResp.decode(pack) as any
            console.log("ListPayLimitHintText...end", resp)
            return {err: null, resp: resp}
        }
    }
}
export const Pay = new $Pay({
    name: "bgo.component.pay",
})
import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
export enum PeriodAction {  
    Sign = 0,  
    UnSign = 1,  
    ChangeCurrentPeriod = 2,  
    ChangeNextPeriod = 3,  
    Renew = 4,  
    RenewFail = 5,  
    Cancel = 6,
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
    ItemName?: string|null
    SignNo?: string|null
}
@protobuf.Type.d("bgo_component_DeliveryRequest")
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
            if (properties.ItemName) { this.ItemName = properties.ItemName }
            if (properties.SignNo) { this.SignNo = properties.SignNo }
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
    @protobuf.Field.d(28, "string", "optional", )
    public ItemName?: string|null = ""
    @protobuf.Field.d(29, "string", "optional", )
    public SignNo?: string|null = ""
}
export interface IDeliveryResponse {
    code?: number|null
}
@protobuf.Type.d("bgo_component_DeliveryResponse")
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
export interface IRefundExt {
    wid?: string|null
    fee?: string|null
    status?: string|null
    time?: string|null
    account?: string|null
}
@protobuf.Type.d("bgo_component_RefundExt")
export class RefundExt extends protobuf.Message<IRefundExt> {
    constructor(properties: Properties<IRefundExt>) {
        super(properties);
        if (properties) {
            if (properties.wid) { this.wid = properties.wid }
            if (properties.fee) { this.fee = properties.fee }
            if (properties.status) { this.status = properties.status }
            if (properties.time) { this.time = properties.time }
            if (properties.account) { this.account = properties.account }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public wid?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public fee?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public status?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public time?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public account?: string|null = ""
}
export interface ICallBackPeriodOrderReq {
    uid?: number|null
    pMode?: number|null
    action?: PeriodAction|null
    pid?: string|null
    signNo?: string|null
    startTime?: number|null
    goodsId?: string|null
    productId?: string|null
    oldUid?: number|null
    msg?: string|null
    cancelTime?: number|null
    originRenewTime?: number|null
}
@protobuf.Type.d("bgo_component_CallBackPeriodOrderReq")
export class CallBackPeriodOrderReq extends protobuf.Message<ICallBackPeriodOrderReq> {
    constructor(properties: Properties<ICallBackPeriodOrderReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.pMode) { this.pMode = properties.pMode }
            if (properties.action) { this.action = properties.action }
            if (properties.pid) { this.pid = properties.pid }
            if (properties.signNo) { this.signNo = properties.signNo }
            if (properties.startTime) { this.startTime = properties.startTime }
            if (properties.goodsId) { this.goodsId = properties.goodsId }
            if (properties.productId) { this.productId = properties.productId }
            if (properties.oldUid) { this.oldUid = properties.oldUid }
            if (properties.msg) { this.msg = properties.msg }
            if (properties.cancelTime) { this.cancelTime = properties.cancelTime }
            if (properties.originRenewTime) { this.originRenewTime = properties.originRenewTime }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public pMode?: number|null = 0
    @protobuf.Field.d(3, PeriodAction, "optional", PeriodAction.Sign)
    public action?: PeriodAction|null = PeriodAction.Sign
    @protobuf.Field.d(4, "string", "optional", )
    public pid?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public signNo?: string|null = ""
    @protobuf.Field.d(6, "int64", "optional", 0)
    public startTime?: number|null = 0
    @protobuf.Field.d(7, "string", "optional", )
    public goodsId?: string|null = ""
    @protobuf.Field.d(8, "string", "optional", )
    public productId?: string|null = ""
    @protobuf.Field.d(9, "int64", "optional", 0)
    public oldUid?: number|null = 0
    @protobuf.Field.d(10, "string", "optional", )
    public msg?: string|null = ""
    @protobuf.Field.d(11, "int64", "optional", 0)
    public cancelTime?: number|null = 0
    @protobuf.Field.d(12, "int64", "optional", 0)
    public originRenewTime?: number|null = 0
}
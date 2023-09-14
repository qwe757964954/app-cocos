import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  Charge as mp_pay_trade_v1_Charge,ICharge as mp_pay_trade_v1_ICharge ,  } from "idl/mp/pay/trade.v1"
export interface IPaidReq {
    charge?: mp_pay_trade_v1_ICharge
}
@protobuf.Type.d("mp_pay_callback_trade_v1_PaidReq")
export class PaidReq extends protobuf.Message<IPaidReq> {
    constructor(properties: Properties<IPaidReq>) {
        super(properties);
        if (properties) {
            if (properties.charge) { this.charge = mp_pay_trade_v1_Charge.create(properties.charge) as any }
        }
	}
    @protobuf.Field.d(2, "mp_pay_trade_v1_Charge", "optional")
    public charge?: mp_pay_trade_v1_Charge|null
}
export interface IPaidResp {
}
@protobuf.Type.d("mp_pay_callback_trade_v1_PaidResp")
export class PaidResp extends protobuf.Message<IPaidResp> {
    constructor(properties: Properties<IPaidResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface ITradeCompleteReq {
    charge?: mp_pay_trade_v1_ICharge
}
@protobuf.Type.d("mp_pay_callback_trade_v1_TradeCompleteReq")
export class TradeCompleteReq extends protobuf.Message<ITradeCompleteReq> {
    constructor(properties: Properties<ITradeCompleteReq>) {
        super(properties);
        if (properties) {
            if (properties.charge) { this.charge = mp_pay_trade_v1_Charge.create(properties.charge) as any }
        }
	}
    @protobuf.Field.d(2, "mp_pay_trade_v1_Charge", "optional")
    public charge?: mp_pay_trade_v1_Charge|null
}
export interface ITradeCompleteResp {
}
@protobuf.Type.d("mp_pay_callback_trade_v1_TradeCompleteResp")
export class TradeCompleteResp extends protobuf.Message<ITradeCompleteResp> {
    constructor(properties: Properties<ITradeCompleteResp>) {
        super(properties);
        if (properties) {
        }
	}
}
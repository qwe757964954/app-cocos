import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  Void as pdk_base_Void,IVoid as base_IVoid ,  } from "idl/base/base"
export enum ScoreOp {  
    Set = 0,  
    Mul = 1,  
    Add = 2,
}
export enum NullValue {  
    NULL_VALUE = 0,
}
export enum ErrCode {  
    Null = 0,  
    InvalidArgs = 1,
}
export interface IMsgGameStart {
}
@protobuf.Type.d("pdk_tss_pdk_extendtable_v3_MsgGameStart")
export class MsgGameStart extends protobuf.Message<IMsgGameStart> {
    constructor(properties: Properties<IMsgGameStart>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IUInt32sValue {
    value?: number[]
}
@protobuf.Type.d("pdk_tss_pdk_extendtable_v3_UInt32sValue")
export class UInt32sValue extends protobuf.Message<IUInt32sValue> {
    constructor(properties: Properties<IUInt32sValue>) {
        super(properties);
        if (properties) {
            if (properties.value) { this.value = []; properties.value.forEach((value, index)=>{this.value[index] = properties.value[index]})}
        }
	}
    @protobuf.Field.d(1, "uint32", "repeated", [])
    public value?: number[] = []
}
export interface IHandCardValue {
    uint32s_value?: IUInt32sValue
    int32_value?: number|null
}
@protobuf.Type.d("pdk_tss_pdk_extendtable_v3_HandCardValue")
export class HandCardValue extends protobuf.Message<IHandCardValue> {
    constructor(properties: Properties<IHandCardValue>) {
        super(properties);
        if (properties) {
            if (properties.uint32s_value) { this.uint32s_value = UInt32sValue.create(properties.uint32s_value) as any }
            if (properties.int32_value) { this.int32_value = properties.int32_value }
        }
	}
    @protobuf.Field.d(1, "pdk_tss_pdk_extendtable_v3_UInt32sValue", "optional")
    public uint32s_value?: UInt32sValue|null
    @protobuf.Field.d(2, "int32", "optional", 0)
    public int32_value?: number|null = 0
    @protobuf.OneOf.d("uint32s_value","int32_value")
    public value?: ("uint32s_value"|"int32_value")
}
export interface IOpenCardInfo {
    time?: number|null
}
@protobuf.Type.d("pdk_tss_pdk_extendtable_v3_OpenCardInfo")
export class OpenCardInfo extends protobuf.Message<IOpenCardInfo> {
    constructor(properties: Properties<IOpenCardInfo>) {
        super(properties);
        if (properties) {
            if (properties.time) { this.time = properties.time }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public time?: number|null = 0
}
export interface IOpenCardResult {
    uid?: number|null
    cards?: number[]
}
@protobuf.Type.d("pdk_tss_pdk_extendtable_v3_OpenCardResult")
export class OpenCardResult extends protobuf.Message<IOpenCardResult> {
    constructor(properties: Properties<IOpenCardResult>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.cards) { this.cards = []; properties.cards.forEach((value, index)=>{this.cards[index] = properties.cards[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "uint32", "repeated", [])
    public cards?: number[] = []
}
export interface IBaWangJiaoInfo {
    cards?: number[]
    time?: number|null
}
@protobuf.Type.d("pdk_tss_pdk_extendtable_v3_BaWangJiaoInfo")
export class BaWangJiaoInfo extends protobuf.Message<IBaWangJiaoInfo> {
    constructor(properties: Properties<IBaWangJiaoInfo>) {
        super(properties);
        if (properties) {
            if (properties.cards) { this.cards = []; properties.cards.forEach((value, index)=>{this.cards[index] = properties.cards[index]})}
            if (properties.time) { this.time = properties.time }
        }
	}
    @protobuf.Field.d(1, "uint32", "repeated", [])
    public cards?: number[] = []
    @protobuf.Field.d(2, "int32", "optional", 0)
    public time?: number|null = 0
}
export interface IBaWangJiaoResult {
    uid?: number|null
    cards?: number[]
}
@protobuf.Type.d("pdk_tss_pdk_extendtable_v3_BaWangJiaoResult")
export class BaWangJiaoResult extends protobuf.Message<IBaWangJiaoResult> {
    constructor(properties: Properties<IBaWangJiaoResult>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.cards) { this.cards = []; properties.cards.forEach((value, index)=>{this.cards[index] = properties.cards[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "uint32", "repeated", [])
    public cards?: number[] = []
}
export interface ICallScoreResult {
    uid?: number|null
    score?: number|null
    caller?: number|null
    callScore?: number|null
    bottomCards?: number[]
    totalMultiples?: number|null
    isForce?: boolean|null
}
@protobuf.Type.d("pdk_tss_pdk_extendtable_v3_CallScoreResult")
export class CallScoreResult extends protobuf.Message<ICallScoreResult> {
    constructor(properties: Properties<ICallScoreResult>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.score) { this.score = properties.score }
            if (properties.caller) { this.caller = properties.caller }
            if (properties.callScore) { this.callScore = properties.callScore }
            if (properties.bottomCards) { this.bottomCards = []; properties.bottomCards.forEach((value, index)=>{this.bottomCards[index] = properties.bottomCards[index]})}
            if (properties.totalMultiples) { this.totalMultiples = properties.totalMultiples }
            if (properties.isForce) { this.isForce = properties.isForce }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public score?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public caller?: number|null = 0
    @protobuf.Field.d(4, "int32", "optional", 0)
    public callScore?: number|null = 0
    @protobuf.Field.d(5, "uint32", "repeated", [])
    public bottomCards?: number[] = []
    @protobuf.Field.d(6, "int32", "optional", 0)
    public totalMultiples?: number|null = 0
    @protobuf.Field.d(7, "bool", "optional", false)
    public isForce?: boolean|null = false
}
export interface IShowCardResult {
    uid?: number|null
    opcode?: number|null
    cards?: number[]
    isForce?: boolean|null
}
@protobuf.Type.d("pdk_tss_pdk_extendtable_v3_ShowCardResult")
export class ShowCardResult extends protobuf.Message<IShowCardResult> {
    constructor(properties: Properties<IShowCardResult>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.opcode) { this.opcode = properties.opcode }
            if (properties.cards) { this.cards = []; properties.cards.forEach((value, index)=>{this.cards[index] = properties.cards[index]})}
            if (properties.isForce) { this.isForce = properties.isForce }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public opcode?: number|null = 0
    @protobuf.Field.d(3, "uint32", "repeated", [])
    public cards?: number[] = []
    @protobuf.Field.d(4, "bool", "optional", false)
    public isForce?: boolean|null = false
}
export interface IScoreInfo {
    key?: number|null
    value?: number|null
}
@protobuf.Type.d("pdk_tss_pdk_extendtable_v3_ScoreInfo")
export class ScoreInfo extends protobuf.Message<IScoreInfo> {
    constructor(properties: Properties<IScoreInfo>) {
        super(properties);
        if (properties) {
            if (properties.key) { this.key = properties.key }
            if (properties.value) { this.value = properties.value }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public key?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public value?: number|null = 0
}
export interface IInt32KV {
    key?: string|null
    value?: number|null
}
@protobuf.Type.d("pdk_tss_pdk_extendtable_v3_Int32KV")
export class Int32KV extends protobuf.Message<IInt32KV> {
    constructor(properties: Properties<IInt32KV>) {
        super(properties);
        if (properties) {
            if (properties.key) { this.key = properties.key }
            if (properties.value) { this.value = properties.value }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public key?: string|null = ""
    @protobuf.Field.d(2, "int32", "optional", 0)
    public value?: number|null = 0
}
export interface ICallScoreInfo {
    uid?: number|null
    minScore?: number|null
    maxScore?: number|null
    time?: number|null
}
@protobuf.Type.d("pdk_tss_pdk_extendtable_v3_CallScoreInfo")
export class CallScoreInfo extends protobuf.Message<ICallScoreInfo> {
    constructor(properties: Properties<ICallScoreInfo>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.minScore) { this.minScore = properties.minScore }
            if (properties.maxScore) { this.maxScore = properties.maxScore }
            if (properties.time) { this.time = properties.time }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public minScore?: number|null = 0
    @protobuf.Field.d(3, "int32", "optional", 0)
    public maxScore?: number|null = 0
    @protobuf.Field.d(4, "int32", "optional", 0)
    public time?: number|null = 0
}
export interface IMsgTeamInfo {
    team?: number|null
    score?: number|null
}
@protobuf.Type.d("pdk_tss_pdk_extendtable_v3_MsgTeamInfo")
export class MsgTeamInfo extends protobuf.Message<IMsgTeamInfo> {
    constructor(properties: Properties<IMsgTeamInfo>) {
        super(properties);
        if (properties) {
            if (properties.team) { this.team = properties.team }
            if (properties.score) { this.score = properties.score }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public team?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public score?: number|null = 0
}
export interface IShowCardInfo {
    uid?: number|null
    opcodes?: number[]
    cards?: number[]
}
@protobuf.Type.d("pdk_tss_pdk_extendtable_v3_ShowCardInfo")
export class ShowCardInfo extends protobuf.Message<IShowCardInfo> {
    constructor(properties: Properties<IShowCardInfo>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.opcodes) { this.opcodes = []; properties.opcodes.forEach((value, index)=>{this.opcodes[index] = properties.opcodes[index]})}
            if (properties.cards) { this.cards = []; properties.cards.forEach((value, index)=>{this.cards[index] = properties.cards[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int32", "repeated", [])
    public opcodes?: number[] = []
    @protobuf.Field.d(3, "uint32", "repeated", [])
    public cards?: number[] = []
}
export interface IMsgUserResult {
    uid?: number|null
    playCards?: number[]
    totalScore?: number|null
    result?: number|null
    leftCards?: number[]
    winType?: number|null
    rank?: number|null
    scoreInfo?: IScoreInfo[]
    statusInfo?: IInt32KV[]
}
@protobuf.Type.d("pdk_tss_pdk_extendtable_v3_MsgUserResult")
export class MsgUserResult extends protobuf.Message<IMsgUserResult> {
    constructor(properties: Properties<IMsgUserResult>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.playCards) { this.playCards = []; properties.playCards.forEach((value, index)=>{this.playCards[index] = properties.playCards[index]})}
            if (properties.totalScore) { this.totalScore = properties.totalScore }
            if (properties.result) { this.result = properties.result }
            if (properties.leftCards) { this.leftCards = []; properties.leftCards.forEach((value, index)=>{this.leftCards[index] = properties.leftCards[index]})}
            if (properties.winType) { this.winType = properties.winType }
            if (properties.rank) { this.rank = properties.rank }
            if (properties.scoreInfo) { this.scoreInfo = []; properties.scoreInfo.forEach((value, index)=>{this.scoreInfo[index] = ScoreInfo.create(properties.scoreInfo[index]) as any})}
            if (properties.statusInfo) { this.statusInfo = []; properties.statusInfo.forEach((value, index)=>{this.statusInfo[index] = Int32KV.create(properties.statusInfo[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "uint32", "repeated", [])
    public playCards?: number[] = []
    @protobuf.Field.d(3, "int64", "optional", 0)
    public totalScore?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public result?: number|null = 0
    @protobuf.Field.d(5, "uint32", "repeated", [])
    public leftCards?: number[] = []
    @protobuf.Field.d(6, "int32", "optional", 0)
    public winType?: number|null = 0
    @protobuf.Field.d(7, "int32", "optional", 0)
    public rank?: number|null = 0
    @protobuf.Field.d(8, "pdk_tss_pdk_extendtable_v3_ScoreInfo", "repeated")
    public scoreInfo?: ScoreInfo[] = []
    @protobuf.Field.d(9, "pdk_tss_pdk_extendtable_v3_Int32KV", "repeated")
    public statusInfo?: Int32KV[] = []
}
export interface ICardConfig_CardTypeItem {
    type?: number|null
    args?: string[]
}
@protobuf.Type.d("pdk_tss_pdk_extendtable_v3_CardConfig_CardTypeItem")
export class CardConfig_CardTypeItem extends protobuf.Message<ICardConfig_CardTypeItem> {
    constructor(properties: Properties<ICardConfig_CardTypeItem>) {
        super(properties);
        if (properties) {
            if (properties.type) { this.type = properties.type }
            if (properties.args) { this.args = []; properties.args.forEach((value, index)=>{this.args[index] = properties.args[index]})}
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public type?: number|null = 0
    @protobuf.Field.d(2, "string", "repeated", [])
    public args?: string[] = []
}
export interface ICallDealerInfo {
    uid?: number|null
    caller?: number|null
    time?: number|null
}
@protobuf.Type.d("pdk_tss_pdk_extendtable_v3_CallDealerInfo")
export class CallDealerInfo extends protobuf.Message<ICallDealerInfo> {
    constructor(properties: Properties<ICallDealerInfo>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.caller) { this.caller = properties.caller }
            if (properties.time) { this.time = properties.time }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public caller?: number|null = 0
    @protobuf.Field.d(3, "int32", "optional", 0)
    public time?: number|null = 0
}
export interface IInt32sValue {
    value?: number[]
}
@protobuf.Type.d("pdk_tss_pdk_extendtable_v3_Int32sValue")
export class Int32sValue extends protobuf.Message<IInt32sValue> {
    constructor(properties: Properties<IInt32sValue>) {
        super(properties);
        if (properties) {
            if (properties.value) { this.value = []; properties.value.forEach((value, index)=>{this.value[index] = properties.value[index]})}
        }
	}
    @protobuf.Field.d(1, "int32", "repeated", [])
    public value?: number[] = []
}
export interface IPickCardInfo {
    uid?: number|null
    time?: number|null
    num?: number|null
}
@protobuf.Type.d("pdk_tss_pdk_extendtable_v3_PickCardInfo")
export class PickCardInfo extends protobuf.Message<IPickCardInfo> {
    constructor(properties: Properties<IPickCardInfo>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.time) { this.time = properties.time }
            if (properties.num) { this.num = properties.num }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public time?: number|null = 0
    @protobuf.Field.d(3, "int32", "optional", 0)
    public num?: number|null = 0
}
export interface IPlayCardReq {
    opcode?: number|null
    cards?: number[]
    unitNums?: number[]
}
@protobuf.Type.d("pdk_tss_pdk_extendtable_v3_PlayCardReq")
export class PlayCardReq extends protobuf.Message<IPlayCardReq> {
    constructor(properties: Properties<IPlayCardReq>) {
        super(properties);
        if (properties) {
            if (properties.opcode) { this.opcode = properties.opcode }
            if (properties.cards) { this.cards = []; properties.cards.forEach((value, index)=>{this.cards[index] = properties.cards[index]})}
            if (properties.unitNums) { this.unitNums = []; properties.unitNums.forEach((value, index)=>{this.unitNums[index] = properties.unitNums[index]})}
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public opcode?: number|null = 0
    @protobuf.Field.d(2, "uint32", "repeated", [])
    public cards?: number[] = []
    @protobuf.Field.d(3, "int32", "repeated", [])
    public unitNums?: number[] = []
}
export interface IPlayCardInfo {
    uid?: number|null
    isNew?: boolean|null
    time?: number|null
    extraTime?: number|null
}
@protobuf.Type.d("pdk_tss_pdk_extendtable_v3_PlayCardInfo")
export class PlayCardInfo extends protobuf.Message<IPlayCardInfo> {
    constructor(properties: Properties<IPlayCardInfo>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.isNew) { this.isNew = properties.isNew }
            if (properties.time) { this.time = properties.time }
            if (properties.extraTime) { this.extraTime = properties.extraTime }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "bool", "optional", false)
    public isNew?: boolean|null = false
    @protobuf.Field.d(3, "int32", "optional", 0)
    public time?: number|null = 0
    @protobuf.Field.d(4, "int32", "optional", 0)
    public extraTime?: number|null = 0
}
export interface IPlayCardResult {
    uid?: number|null
    opcode?: number|null
    cards?: number[]
    unitNums?: number[]
}
@protobuf.Type.d("pdk_tss_pdk_extendtable_v3_PlayCardResult")
export class PlayCardResult extends protobuf.Message<IPlayCardResult> {
    constructor(properties: Properties<IPlayCardResult>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.opcode) { this.opcode = properties.opcode }
            if (properties.cards) { this.cards = []; properties.cards.forEach((value, index)=>{this.cards[index] = properties.cards[index]})}
            if (properties.unitNums) { this.unitNums = []; properties.unitNums.forEach((value, index)=>{this.unitNums[index] = properties.unitNums[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public opcode?: number|null = 0
    @protobuf.Field.d(3, "uint32", "repeated", [])
    public cards?: number[] = []
    @protobuf.Field.d(4, "int32", "repeated", [])
    public unitNums?: number[] = []
}
export interface ICallDealerResult {
    uid?: number|null
    opcode?: number|null
    bottomCards?: number[]
    totalMultiples?: number|null
    isForce?: boolean|null
    caller?: number|null
    isEnd?: boolean|null
}
@protobuf.Type.d("pdk_tss_pdk_extendtable_v3_CallDealerResult")
export class CallDealerResult extends protobuf.Message<ICallDealerResult> {
    constructor(properties: Properties<ICallDealerResult>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.opcode) { this.opcode = properties.opcode }
            if (properties.bottomCards) { this.bottomCards = []; properties.bottomCards.forEach((value, index)=>{this.bottomCards[index] = properties.bottomCards[index]})}
            if (properties.totalMultiples) { this.totalMultiples = properties.totalMultiples }
            if (properties.isForce) { this.isForce = properties.isForce }
            if (properties.caller) { this.caller = properties.caller }
            if (properties.isEnd) { this.isEnd = properties.isEnd }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public opcode?: number|null = 0
    @protobuf.Field.d(3, "uint32", "repeated", [])
    public bottomCards?: number[] = []
    @protobuf.Field.d(4, "int32", "optional", 0)
    public totalMultiples?: number|null = 0
    @protobuf.Field.d(5, "bool", "optional", false)
    public isForce?: boolean|null = false
    @protobuf.Field.d(6, "int64", "optional", 0)
    public caller?: number|null = 0
    @protobuf.Field.d(7, "bool", "optional", false)
    public isEnd?: boolean|null = false
}
export interface IOpInfo {
    uid?: number|null
    time?: number|null
    stage?: string|null
    null?: NullValue|null
    play_card_info?: IPlayCardInfo
    call_score_info?: ICallScoreInfo
    int32s_value?: IInt32sValue
    show_card_info?: IShowCardInfo
    call_dealer_info?: ICallDealerInfo
    pick_card_info?: IPickCardInfo
    bawangjiao_info?: IBaWangJiaoInfo
    opencard_info?: IOpenCardInfo
}
@protobuf.Type.d("pdk_tss_pdk_extendtable_v3_OpInfo")
export class OpInfo extends protobuf.Message<IOpInfo> {
    constructor(properties: Properties<IOpInfo>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.time) { this.time = properties.time }
            if (properties.stage) { this.stage = properties.stage }
            if (properties.null) { this.null = properties.null }
            if (properties.play_card_info) { this.play_card_info = PlayCardInfo.create(properties.play_card_info) as any }
            if (properties.call_score_info) { this.call_score_info = CallScoreInfo.create(properties.call_score_info) as any }
            if (properties.int32s_value) { this.int32s_value = Int32sValue.create(properties.int32s_value) as any }
            if (properties.show_card_info) { this.show_card_info = ShowCardInfo.create(properties.show_card_info) as any }
            if (properties.call_dealer_info) { this.call_dealer_info = CallDealerInfo.create(properties.call_dealer_info) as any }
            if (properties.pick_card_info) { this.pick_card_info = PickCardInfo.create(properties.pick_card_info) as any }
            if (properties.bawangjiao_info) { this.bawangjiao_info = BaWangJiaoInfo.create(properties.bawangjiao_info) as any }
            if (properties.opencard_info) { this.opencard_info = OpenCardInfo.create(properties.opencard_info) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public time?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public stage?: string|null = ""
    @protobuf.Field.d(101, NullValue, "optional", NullValue.NULL_VALUE)
    public null?: NullValue|null = NullValue.NULL_VALUE
    @protobuf.Field.d(102, "pdk_tss_pdk_extendtable_v3_PlayCardInfo", "optional")
    public play_card_info?: PlayCardInfo|null
    @protobuf.Field.d(103, "pdk_tss_pdk_extendtable_v3_CallScoreInfo", "optional")
    public call_score_info?: CallScoreInfo|null
    @protobuf.Field.d(104, "pdk_tss_pdk_extendtable_v3_Int32sValue", "optional")
    public int32s_value?: Int32sValue|null
    @protobuf.Field.d(105, "pdk_tss_pdk_extendtable_v3_ShowCardInfo", "optional")
    public show_card_info?: ShowCardInfo|null
    @protobuf.Field.d(106, "pdk_tss_pdk_extendtable_v3_CallDealerInfo", "optional")
    public call_dealer_info?: CallDealerInfo|null
    @protobuf.Field.d(107, "pdk_tss_pdk_extendtable_v3_PickCardInfo", "optional")
    public pick_card_info?: PickCardInfo|null
    @protobuf.Field.d(108, "pdk_tss_pdk_extendtable_v3_BaWangJiaoInfo", "optional")
    public bawangjiao_info?: BaWangJiaoInfo|null
    @protobuf.Field.d(109, "pdk_tss_pdk_extendtable_v3_OpenCardInfo", "optional")
    public opencard_info?: OpenCardInfo|null
    @protobuf.OneOf.d("null","play_card_info","call_score_info","int32s_value","show_card_info","call_dealer_info","pick_card_info","bawangjiao_info","opencard_info")
    public value?: ("null"|"play_card_info"|"call_score_info"|"int32s_value"|"show_card_info"|"call_dealer_info"|"pick_card_info"|"bawangjiao_info"|"opencard_info")
}
export interface IDealCardItem {
    uid?: number|null
    value?: IHandCardValue
    opInfo?: IOpInfo
}
@protobuf.Type.d("pdk_tss_pdk_extendtable_v3_DealCardItem")
export class DealCardItem extends protobuf.Message<IDealCardItem> {
    constructor(properties: Properties<IDealCardItem>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.value) { this.value = HandCardValue.create(properties.value) as any }
            if (properties.opInfo) { this.opInfo = OpInfo.create(properties.opInfo) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "pdk_tss_pdk_extendtable_v3_HandCardValue", "optional")
    public value?: HandCardValue|null
    @protobuf.Field.d(3, "pdk_tss_pdk_extendtable_v3_OpInfo", "optional")
    public opInfo?: OpInfo|null
}
export interface IRaiseScoreResult {
    uid?: number|null
    opcode?: number|null
    totalScore?: number|null
    isEnd?: boolean|null
}
@protobuf.Type.d("pdk_tss_pdk_extendtable_v3_RaiseScoreResult")
export class RaiseScoreResult extends protobuf.Message<IRaiseScoreResult> {
    constructor(properties: Properties<IRaiseScoreResult>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.opcode) { this.opcode = properties.opcode }
            if (properties.totalScore) { this.totalScore = properties.totalScore }
            if (properties.isEnd) { this.isEnd = properties.isEnd }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public opcode?: number|null = 0
    @protobuf.Field.d(3, "int32", "optional", 0)
    public totalScore?: number|null = 0
    @protobuf.Field.d(4, "bool", "optional", false)
    public isEnd?: boolean|null = false
}
export interface IPickCardResult {
    uid?: number|null
    cards?: number[]
}
@protobuf.Type.d("pdk_tss_pdk_extendtable_v3_PickCardResult")
export class PickCardResult extends protobuf.Message<IPickCardResult> {
    constructor(properties: Properties<IPickCardResult>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.cards) { this.cards = []; properties.cards.forEach((value, index)=>{this.cards[index] = properties.cards[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "uint32", "repeated", [])
    public cards?: number[] = []
}
export interface IMsgUserRank {
    uid?: number|null
    rank?: number|null
}
@protobuf.Type.d("pdk_tss_pdk_extendtable_v3_MsgUserRank")
export class MsgUserRank extends protobuf.Message<IMsgUserRank> {
    constructor(properties: Properties<IMsgUserRank>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.rank) { this.rank = properties.rank }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public rank?: number|null = 0
}
export interface ICallScoreReq {
    score?: number|null
}
@protobuf.Type.d("pdk_tss_pdk_extendtable_v3_CallScoreReq")
export class CallScoreReq extends protobuf.Message<ICallScoreReq> {
    constructor(properties: Properties<ICallScoreReq>) {
        super(properties);
        if (properties) {
            if (properties.score) { this.score = properties.score }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public score?: number|null = 0
}
export interface IOpResult {
    uid?: number|null
    stage?: string|null
    null?: NullValue|null
    play_card_result?: IPlayCardResult
    call_score_result?: ICallScoreResult
    int32_value?: number|null
    uint32s_value?: IUInt32sValue
    show_card_result?: IShowCardResult
    call_dealer_result?: ICallDealerResult
    raise_score_result?: IRaiseScoreResult
    pick_card_result?: IPickCardResult
    bawangjiao_result?: IBaWangJiaoResult
    opencard_result?: IOpenCardResult
}
@protobuf.Type.d("pdk_tss_pdk_extendtable_v3_OpResult")
export class OpResult extends protobuf.Message<IOpResult> {
    constructor(properties: Properties<IOpResult>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.stage) { this.stage = properties.stage }
            if (properties.null) { this.null = properties.null }
            if (properties.play_card_result) { this.play_card_result = PlayCardResult.create(properties.play_card_result) as any }
            if (properties.call_score_result) { this.call_score_result = CallScoreResult.create(properties.call_score_result) as any }
            if (properties.int32_value) { this.int32_value = properties.int32_value }
            if (properties.uint32s_value) { this.uint32s_value = UInt32sValue.create(properties.uint32s_value) as any }
            if (properties.show_card_result) { this.show_card_result = ShowCardResult.create(properties.show_card_result) as any }
            if (properties.call_dealer_result) { this.call_dealer_result = CallDealerResult.create(properties.call_dealer_result) as any }
            if (properties.raise_score_result) { this.raise_score_result = RaiseScoreResult.create(properties.raise_score_result) as any }
            if (properties.pick_card_result) { this.pick_card_result = PickCardResult.create(properties.pick_card_result) as any }
            if (properties.bawangjiao_result) { this.bawangjiao_result = BaWangJiaoResult.create(properties.bawangjiao_result) as any }
            if (properties.opencard_result) { this.opencard_result = OpenCardResult.create(properties.opencard_result) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public stage?: string|null = ""
    @protobuf.Field.d(100, NullValue, "optional", NullValue.NULL_VALUE)
    public null?: NullValue|null = NullValue.NULL_VALUE
    @protobuf.Field.d(101, "pdk_tss_pdk_extendtable_v3_PlayCardResult", "optional")
    public play_card_result?: PlayCardResult|null
    @protobuf.Field.d(102, "pdk_tss_pdk_extendtable_v3_CallScoreResult", "optional")
    public call_score_result?: CallScoreResult|null
    @protobuf.Field.d(103, "int32", "optional", 0)
    public int32_value?: number|null = 0
    @protobuf.Field.d(104, "pdk_tss_pdk_extendtable_v3_UInt32sValue", "optional")
    public uint32s_value?: UInt32sValue|null
    @protobuf.Field.d(105, "pdk_tss_pdk_extendtable_v3_ShowCardResult", "optional")
    public show_card_result?: ShowCardResult|null
    @protobuf.Field.d(106, "pdk_tss_pdk_extendtable_v3_CallDealerResult", "optional")
    public call_dealer_result?: CallDealerResult|null
    @protobuf.Field.d(107, "pdk_tss_pdk_extendtable_v3_RaiseScoreResult", "optional")
    public raise_score_result?: RaiseScoreResult|null
    @protobuf.Field.d(108, "pdk_tss_pdk_extendtable_v3_PickCardResult", "optional")
    public pick_card_result?: PickCardResult|null
    @protobuf.Field.d(109, "pdk_tss_pdk_extendtable_v3_BaWangJiaoResult", "optional")
    public bawangjiao_result?: BaWangJiaoResult|null
    @protobuf.Field.d(110, "pdk_tss_pdk_extendtable_v3_OpenCardResult", "optional")
    public opencard_result?: OpenCardResult|null
    @protobuf.OneOf.d("null","play_card_result","call_score_result","int32_value","uint32s_value","show_card_result","call_dealer_result","raise_score_result","pick_card_result","bawangjiao_result","opencard_result")
    public value?: ("null"|"play_card_result"|"call_score_result"|"int32_value"|"uint32s_value"|"show_card_result"|"call_dealer_result"|"raise_score_result"|"pick_card_result"|"bawangjiao_result"|"opencard_result")
}
export interface IMsgScoreChange {
    type?: number|null
    change?: number|null
    changeOP?: ScoreOp|null
    score?: number|null
    uid?: number|null
    data?: IOpResult
    totalScore?: number|null
}
@protobuf.Type.d("pdk_tss_pdk_extendtable_v3_MsgScoreChange")
export class MsgScoreChange extends protobuf.Message<IMsgScoreChange> {
    constructor(properties: Properties<IMsgScoreChange>) {
        super(properties);
        if (properties) {
            if (properties.type) { this.type = properties.type }
            if (properties.change) { this.change = properties.change }
            if (properties.changeOP) { this.changeOP = properties.changeOP }
            if (properties.score) { this.score = properties.score }
            if (properties.uid) { this.uid = properties.uid }
            if (properties.data) { this.data = OpResult.create(properties.data) as any }
            if (properties.totalScore) { this.totalScore = properties.totalScore }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public type?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public change?: number|null = 0
    @protobuf.Field.d(3, ScoreOp, "optional", ScoreOp.Set)
    public changeOP?: ScoreOp|null = ScoreOp.Set
    @protobuf.Field.d(4, "int64", "optional", 0)
    public score?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(6, "pdk_tss_pdk_extendtable_v3_OpResult", "optional")
    public data?: OpResult|null
    @protobuf.Field.d(7, "int64", "optional", 0)
    public totalScore?: number|null = 0
}
export interface IMsgLaiziCards {
    cards?: number[]
}
@protobuf.Type.d("pdk_tss_pdk_extendtable_v3_MsgLaiziCards")
export class MsgLaiziCards extends protobuf.Message<IMsgLaiziCards> {
    constructor(properties: Properties<IMsgLaiziCards>) {
        super(properties);
        if (properties) {
            if (properties.cards) { this.cards = []; properties.cards.forEach((value, index)=>{this.cards[index] = properties.cards[index]})}
        }
	}
    @protobuf.Field.d(1, "uint32", "repeated", [])
    public cards?: number[] = []
}
export interface IMsgUserInfo {
    uid?: number|null
    seat?: number|null
    isManaged?: boolean|null
    handCards?: IHandCardValue
    identity?: number|null
    rank?: number|null
    team?: number|null
    opInfo?: IOpInfo
    identityData?: IOpResult
    originCards?: number[]
    scoreInfo?: IScoreInfo[]
    statusInfo?: IInt32KV[]
}
@protobuf.Type.d("pdk_tss_pdk_extendtable_v3_MsgUserInfo")
export class MsgUserInfo extends protobuf.Message<IMsgUserInfo> {
    constructor(properties: Properties<IMsgUserInfo>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.seat) { this.seat = properties.seat }
            if (properties.isManaged) { this.isManaged = properties.isManaged }
            if (properties.handCards) { this.handCards = HandCardValue.create(properties.handCards) as any }
            if (properties.identity) { this.identity = properties.identity }
            if (properties.rank) { this.rank = properties.rank }
            if (properties.team) { this.team = properties.team }
            if (properties.opInfo) { this.opInfo = OpInfo.create(properties.opInfo) as any }
            if (properties.identityData) { this.identityData = OpResult.create(properties.identityData) as any }
            if (properties.originCards) { this.originCards = []; properties.originCards.forEach((value, index)=>{this.originCards[index] = properties.originCards[index]})}
            if (properties.scoreInfo) { this.scoreInfo = []; properties.scoreInfo.forEach((value, index)=>{this.scoreInfo[index] = ScoreInfo.create(properties.scoreInfo[index]) as any})}
            if (properties.statusInfo) { this.statusInfo = []; properties.statusInfo.forEach((value, index)=>{this.statusInfo[index] = Int32KV.create(properties.statusInfo[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public seat?: number|null = 0
    @protobuf.Field.d(3, "bool", "optional", false)
    public isManaged?: boolean|null = false
    @protobuf.Field.d(4, "pdk_tss_pdk_extendtable_v3_HandCardValue", "optional")
    public handCards?: HandCardValue|null
    @protobuf.Field.d(5, "int32", "optional", 0)
    public identity?: number|null = 0
    @protobuf.Field.d(6, "int32", "optional", 0)
    public rank?: number|null = 0
    @protobuf.Field.d(7, "int32", "optional", 0)
    public team?: number|null = 0
    @protobuf.Field.d(8, "pdk_tss_pdk_extendtable_v3_OpInfo", "optional")
    public opInfo?: OpInfo|null
    @protobuf.Field.d(9, "pdk_tss_pdk_extendtable_v3_OpResult", "optional")
    public identityData?: OpResult|null
    @protobuf.Field.d(10, "uint32", "repeated", [])
    public originCards?: number[] = []
    @protobuf.Field.d(11, "pdk_tss_pdk_extendtable_v3_ScoreInfo", "repeated")
    public scoreInfo?: ScoreInfo[] = []
    @protobuf.Field.d(12, "pdk_tss_pdk_extendtable_v3_Int32KV", "repeated")
    public statusInfo?: Int32KV[] = []
}
export interface IMsgBadRequest {
    code?: number|null
    user?: IMsgUserInfo
    stage?: string|null
}
@protobuf.Type.d("pdk_tss_pdk_extendtable_v3_MsgBadRequest")
export class MsgBadRequest extends protobuf.Message<IMsgBadRequest> {
    constructor(properties: Properties<IMsgBadRequest>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.user) { this.user = MsgUserInfo.create(properties.user) as any }
            if (properties.stage) { this.stage = properties.stage }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
    @protobuf.Field.d(2, "pdk_tss_pdk_extendtable_v3_MsgUserInfo", "optional")
    public user?: MsgUserInfo|null
    @protobuf.Field.d(3, "string", "optional", )
    public stage?: string|null = ""
}
export interface ITaskInfo {
    taskID?: number|null
    taskType?: number|null
    cardType?: number|null
    score?: number|null
}
@protobuf.Type.d("pdk_tss_pdk_extendtable_v3_TaskInfo")
export class TaskInfo extends protobuf.Message<ITaskInfo> {
    constructor(properties: Properties<ITaskInfo>) {
        super(properties);
        if (properties) {
            if (properties.taskID) { this.taskID = properties.taskID }
            if (properties.taskType) { this.taskType = properties.taskType }
            if (properties.cardType) { this.cardType = properties.cardType }
            if (properties.score) { this.score = properties.score }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public taskID?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public taskType?: number|null = 0
    @protobuf.Field.d(3, "int32", "optional", 0)
    public cardType?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public score?: number|null = 0
}
export interface IMsgBatchedScoreChange {
    data?: IMsgScoreChange[]
}
@protobuf.Type.d("pdk_tss_pdk_extendtable_v3_MsgBatchedScoreChange")
export class MsgBatchedScoreChange extends protobuf.Message<IMsgBatchedScoreChange> {
    constructor(properties: Properties<IMsgBatchedScoreChange>) {
        super(properties);
        if (properties) {
            if (properties.data) { this.data = []; properties.data.forEach((value, index)=>{this.data[index] = MsgScoreChange.create(properties.data[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "pdk_tss_pdk_extendtable_v3_MsgScoreChange", "repeated")
    public data?: MsgScoreChange[] = []
}
export interface IMsgDealCard {
    dealCards?: IDealCardItem[]
    bottomCards?: number[]
}
@protobuf.Type.d("pdk_tss_pdk_extendtable_v3_MsgDealCard")
export class MsgDealCard extends protobuf.Message<IMsgDealCard> {
    constructor(properties: Properties<IMsgDealCard>) {
        super(properties);
        if (properties) {
            if (properties.dealCards) { this.dealCards = []; properties.dealCards.forEach((value, index)=>{this.dealCards[index] = DealCardItem.create(properties.dealCards[index]) as any})}
            if (properties.bottomCards) { this.bottomCards = []; properties.bottomCards.forEach((value, index)=>{this.bottomCards[index] = properties.bottomCards[index]})}
        }
	}
    @protobuf.Field.d(1, "pdk_tss_pdk_extendtable_v3_DealCardItem", "repeated")
    public dealCards?: DealCardItem[] = []
    @protobuf.Field.d(2, "uint32", "repeated", [])
    public bottomCards?: number[] = []
}
export interface IOperateReq {
    opcode?: number|null
    data?: IOpResult
}
@protobuf.Type.d("pdk_tss_pdk_extendtable_v3_OperateReq")
export class OperateReq extends protobuf.Message<IOperateReq> {
    constructor(properties: Properties<IOperateReq>) {
        super(properties);
        if (properties) {
            if (properties.opcode) { this.opcode = properties.opcode }
            if (properties.data) { this.data = OpResult.create(properties.data) as any }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public opcode?: number|null = 0
    @protobuf.Field.d(2, "pdk_tss_pdk_extendtable_v3_OpResult", "optional")
    public data?: OpResult|null
}
export interface IMsgUserIdentity {
    uid?: number|null
    identity?: number|null
    data?: IOpResult
}
@protobuf.Type.d("pdk_tss_pdk_extendtable_v3_MsgUserIdentity")
export class MsgUserIdentity extends protobuf.Message<IMsgUserIdentity> {
    constructor(properties: Properties<IMsgUserIdentity>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.identity) { this.identity = properties.identity }
            if (properties.data) { this.data = OpResult.create(properties.data) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public identity?: number|null = 0
    @protobuf.Field.d(3, "pdk_tss_pdk_extendtable_v3_OpResult", "optional")
    public data?: OpResult|null
}
export interface IMsgGameResult {
    results?: IMsgUserResult[]
    scoreInfo?: IScoreInfo[]
    totalScore?: number|null
    winType?: number|null
}
@protobuf.Type.d("pdk_tss_pdk_extendtable_v3_MsgGameResult")
export class MsgGameResult extends protobuf.Message<IMsgGameResult> {
    constructor(properties: Properties<IMsgGameResult>) {
        super(properties);
        if (properties) {
            if (properties.results) { this.results = []; properties.results.forEach((value, index)=>{this.results[index] = MsgUserResult.create(properties.results[index]) as any})}
            if (properties.scoreInfo) { this.scoreInfo = []; properties.scoreInfo.forEach((value, index)=>{this.scoreInfo[index] = ScoreInfo.create(properties.scoreInfo[index]) as any})}
            if (properties.totalScore) { this.totalScore = properties.totalScore }
            if (properties.winType) { this.winType = properties.winType }
        }
	}
    @protobuf.Field.d(1, "pdk_tss_pdk_extendtable_v3_MsgUserResult", "repeated")
    public results?: MsgUserResult[] = []
    @protobuf.Field.d(2, "pdk_tss_pdk_extendtable_v3_ScoreInfo", "repeated")
    public scoreInfo?: ScoreInfo[] = []
    @protobuf.Field.d(3, "int64", "optional", 0)
    public totalScore?: number|null = 0
    @protobuf.Field.d(4, "int32", "optional", 0)
    public winType?: number|null = 0
}
export interface IMsgSurrender {
    uid?: number|null
}
@protobuf.Type.d("pdk_tss_pdk_extendtable_v3_MsgSurrender")
export class MsgSurrender extends protobuf.Message<IMsgSurrender> {
    constructor(properties: Properties<IMsgSurrender>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IMultiOpInfo {
    data?: IOpInfo[]
}
@protobuf.Type.d("pdk_tss_pdk_extendtable_v3_MultiOpInfo")
export class MultiOpInfo extends protobuf.Message<IMultiOpInfo> {
    constructor(properties: Properties<IMultiOpInfo>) {
        super(properties);
        if (properties) {
            if (properties.data) { this.data = []; properties.data.forEach((value, index)=>{this.data[index] = OpInfo.create(properties.data[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "pdk_tss_pdk_extendtable_v3_OpInfo", "repeated")
    public data?: OpInfo[] = []
}
export interface IPickCardReq {
    cards?: number[]
}
@protobuf.Type.d("pdk_tss_pdk_extendtable_v3_PickCardReq")
export class PickCardReq extends protobuf.Message<IPickCardReq> {
    constructor(properties: Properties<IPickCardReq>) {
        super(properties);
        if (properties) {
            if (properties.cards) { this.cards = []; properties.cards.forEach((value, index)=>{this.cards[index] = properties.cards[index]})}
        }
	}
    @protobuf.Field.d(1, "uint32", "repeated", [])
    public cards?: number[] = []
}
export interface IMsgReplacePlayer {
    seat?: number|null
    curUser?: IMsgUserInfo
    preUser?: IMsgUserInfo
}
@protobuf.Type.d("pdk_tss_pdk_extendtable_v3_MsgReplacePlayer")
export class MsgReplacePlayer extends protobuf.Message<IMsgReplacePlayer> {
    constructor(properties: Properties<IMsgReplacePlayer>) {
        super(properties);
        if (properties) {
            if (properties.seat) { this.seat = properties.seat }
            if (properties.curUser) { this.curUser = MsgUserInfo.create(properties.curUser) as any }
            if (properties.preUser) { this.preUser = MsgUserInfo.create(properties.preUser) as any }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public seat?: number|null = 0
    @protobuf.Field.d(2, "pdk_tss_pdk_extendtable_v3_MsgUserInfo", "optional")
    public curUser?: MsgUserInfo|null
    @protobuf.Field.d(3, "pdk_tss_pdk_extendtable_v3_MsgUserInfo", "optional")
    public preUser?: MsgUserInfo|null
}
export interface IMsgFirstPlayer {
    uid?: number|null
}
@protobuf.Type.d("pdk_tss_pdk_extendtable_v3_MsgFirstPlayer")
export class MsgFirstPlayer extends protobuf.Message<IMsgFirstPlayer> {
    constructor(properties: Properties<IMsgFirstPlayer>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface ICardConfig {
    types?: ICardConfig_CardTypeItem[]
    compare?: string[]
    totalCards?: number[]
}
@protobuf.Type.d("pdk_tss_pdk_extendtable_v3_CardConfig")
export class CardConfig extends protobuf.Message<ICardConfig> {
    constructor(properties: Properties<ICardConfig>) {
        super(properties);
        if (properties) {
            if (properties.types) { this.types = []; properties.types.forEach((value, index)=>{this.types[index] = CardConfig_CardTypeItem.create(properties.types[index]) as any})}
            if (properties.compare) { this.compare = []; properties.compare.forEach((value, index)=>{this.compare[index] = properties.compare[index]})}
            if (properties.totalCards) { this.totalCards = []; properties.totalCards.forEach((value, index)=>{this.totalCards[index] = properties.totalCards[index]})}
        }
	}
    @protobuf.Field.d(1, "pdk_tss_pdk_extendtable_v3_CardConfig_CardTypeItem", "repeated")
    public types?: CardConfig_CardTypeItem[] = []
    @protobuf.Field.d(2, "string", "repeated", [])
    public compare?: string[] = []
    @protobuf.Field.d(3, "uint32", "repeated", [])
    public totalCards?: number[] = []
}
export interface IMsgTaskList {
    data?: ITaskInfo[]
}
@protobuf.Type.d("pdk_tss_pdk_extendtable_v3_MsgTaskList")
export class MsgTaskList extends protobuf.Message<IMsgTaskList> {
    constructor(properties: Properties<IMsgTaskList>) {
        super(properties);
        if (properties) {
            if (properties.data) { this.data = []; properties.data.forEach((value, index)=>{this.data[index] = TaskInfo.create(properties.data[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "pdk_tss_pdk_extendtable_v3_TaskInfo", "repeated")
    public data?: TaskInfo[] = []
}
export interface IMsgTaskResult {
    uid?: number|null
    taskID?: number|null
    result?: boolean|null
}
@protobuf.Type.d("pdk_tss_pdk_extendtable_v3_MsgTaskResult")
export class MsgTaskResult extends protobuf.Message<IMsgTaskResult> {
    constructor(properties: Properties<IMsgTaskResult>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.taskID) { this.taskID = properties.taskID }
            if (properties.result) { this.result = properties.result }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public taskID?: number|null = 0
    @protobuf.Field.d(3, "bool", "optional", false)
    public result?: boolean|null = false
}
export interface IMsgTableInfo {
    tid?: number|null
    tKey?: string|null
    users?: IMsgUserInfo[]
    playOption?: number|null
    mode?: number|null
    stage?: string|null
    teams?: IMsgTeamInfo[]
    roundScore?: number|null
    opResults?: IOpResult[]
    playCards?: number[]
    laizi?: number[]
    scoreInfo?: IScoreInfo[]
    totalScore?: number|null
    bottomCards?: number[]
    baseScore?: number|null
    tasks?: ITaskInfo[]
    cardConfig?: ICardConfig
    syncOps?: IOpResult[]
}
@protobuf.Type.d("pdk_tss_pdk_extendtable_v3_MsgTableInfo")
export class MsgTableInfo extends protobuf.Message<IMsgTableInfo> {
    constructor(properties: Properties<IMsgTableInfo>) {
        super(properties);
        if (properties) {
            if (properties.tid) { this.tid = properties.tid }
            if (properties.tKey) { this.tKey = properties.tKey }
            if (properties.users) { this.users = []; properties.users.forEach((value, index)=>{this.users[index] = MsgUserInfo.create(properties.users[index]) as any})}
            if (properties.playOption) { this.playOption = properties.playOption }
            if (properties.mode) { this.mode = properties.mode }
            if (properties.stage) { this.stage = properties.stage }
            if (properties.teams) { this.teams = []; properties.teams.forEach((value, index)=>{this.teams[index] = MsgTeamInfo.create(properties.teams[index]) as any})}
            if (properties.roundScore) { this.roundScore = properties.roundScore }
            if (properties.opResults) { this.opResults = []; properties.opResults.forEach((value, index)=>{this.opResults[index] = OpResult.create(properties.opResults[index]) as any})}
            if (properties.playCards) { this.playCards = []; properties.playCards.forEach((value, index)=>{this.playCards[index] = properties.playCards[index]})}
            if (properties.laizi) { this.laizi = []; properties.laizi.forEach((value, index)=>{this.laizi[index] = properties.laizi[index]})}
            if (properties.scoreInfo) { this.scoreInfo = []; properties.scoreInfo.forEach((value, index)=>{this.scoreInfo[index] = ScoreInfo.create(properties.scoreInfo[index]) as any})}
            if (properties.totalScore) { this.totalScore = properties.totalScore }
            if (properties.bottomCards) { this.bottomCards = []; properties.bottomCards.forEach((value, index)=>{this.bottomCards[index] = properties.bottomCards[index]})}
            if (properties.baseScore) { this.baseScore = properties.baseScore }
            if (properties.tasks) { this.tasks = []; properties.tasks.forEach((value, index)=>{this.tasks[index] = TaskInfo.create(properties.tasks[index]) as any})}
            if (properties.cardConfig) { this.cardConfig = CardConfig.create(properties.cardConfig) as any }
            if (properties.syncOps) { this.syncOps = []; properties.syncOps.forEach((value, index)=>{this.syncOps[index] = OpResult.create(properties.syncOps[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "uint64", "optional", 0)
    public tid?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public tKey?: string|null = ""
    @protobuf.Field.d(3, "pdk_tss_pdk_extendtable_v3_MsgUserInfo", "repeated")
    public users?: MsgUserInfo[] = []
    @protobuf.Field.d(4, "int32", "optional", 0)
    public playOption?: number|null = 0
    @protobuf.Field.d(5, "int32", "optional", 0)
    public mode?: number|null = 0
    @protobuf.Field.d(6, "string", "optional", )
    public stage?: string|null = ""
    @protobuf.Field.d(7, "pdk_tss_pdk_extendtable_v3_MsgTeamInfo", "repeated")
    public teams?: MsgTeamInfo[] = []
    @protobuf.Field.d(8, "int64", "optional", 0)
    public roundScore?: number|null = 0
    @protobuf.Field.d(9, "pdk_tss_pdk_extendtable_v3_OpResult", "repeated")
    public opResults?: OpResult[] = []
    @protobuf.Field.d(10, "uint32", "repeated", [])
    public playCards?: number[] = []
    @protobuf.Field.d(11, "uint32", "repeated", [])
    public laizi?: number[] = []
    @protobuf.Field.d(12, "pdk_tss_pdk_extendtable_v3_ScoreInfo", "repeated")
    public scoreInfo?: ScoreInfo[] = []
    @protobuf.Field.d(13, "int64", "optional", 0)
    public totalScore?: number|null = 0
    @protobuf.Field.d(14, "uint32", "repeated", [])
    public bottomCards?: number[] = []
    @protobuf.Field.d(15, "int64", "optional", 0)
    public baseScore?: number|null = 0
    @protobuf.Field.d(16, "pdk_tss_pdk_extendtable_v3_TaskInfo", "repeated")
    public tasks?: TaskInfo[] = []
    @protobuf.Field.d(17, "pdk_tss_pdk_extendtable_v3_CardConfig", "optional")
    public cardConfig?: CardConfig|null
    @protobuf.Field.d(18, "pdk_tss_pdk_extendtable_v3_OpResult", "repeated")
    public syncOps?: OpResult[] = []
}
class $ExtendTable extends RpcService {
    @RpcDecorator({eventID:1001, extend:"Action"})
    PlayCard(req: IPlayCardReq, params: RpcParams) : {bytes: Uint8Array, eventID?: number} {
        let bytes = PlayCardReq.encode(req).finish()
        return {bytes: bytes, eventID: 1001}
    }
    @RpcDecorator({eventID:1002, extend:"Action"})
    DoOperate(req: IOperateReq, params: RpcParams) : {bytes: Uint8Array, eventID?: number} {
        let bytes = OperateReq.encode(req).finish()
        return {bytes: bytes, eventID: 1002}
    }
    @RpcDecorator({eventID:1003, extend:"Action"})
    CallScore(req: ICallScoreReq, params: RpcParams) : {bytes: Uint8Array, eventID?: number} {
        let bytes = CallScoreReq.encode(req).finish()
        return {bytes: bytes, eventID: 1003}
    }
    @RpcDecorator({eventID:1004, extend:"Action"})
    Surrender(req: base_IVoid, params: RpcParams) : {bytes: Uint8Array, eventID?: number} {
        let bytes = pdk_base_Void.encode(req).finish()
        return {bytes: bytes, eventID: 1004}
    }
    @RpcDecorator({eventID:1005, extend:"Action"})
    PickCards(req: IPickCardReq, params: RpcParams) : {bytes: Uint8Array, eventID?: number} {
        let bytes = PickCardReq.encode(req).finish()
        return {bytes: bytes, eventID: 1005}
    }
    @RpcDecorator({eventID:2000, extend:"NotifyPlayer"})
    NotifyGameStart(data: Uint8Array, params: RpcParams) : {msg: IMsgGameStart, eventID?: number} {
        let msg = MsgGameStart.decode(data)
        return {msg: msg, eventID: 2000}
    }
    @RpcDecorator({eventID:2001, extend:"NotifyPlayer"})
    NotifyDealCard(data: Uint8Array, params: RpcParams) : {msg: IMsgDealCard, eventID?: number} {
        let msg = MsgDealCard.decode(data)
        return {msg: msg, eventID: 2001}
    }
    @RpcDecorator({eventID:2002, extend:"NotifyPlayer"})
    NotifyPlayStart(data: Uint8Array, params: RpcParams) : {msg: IPlayCardInfo, eventID?: number} {
        let msg = PlayCardInfo.decode(data)
        return {msg: msg, eventID: 2002}
    }
    @RpcDecorator({eventID:2003, extend:"NotifyPlayer"})
    NotifyPlayCard(data: Uint8Array, params: RpcParams) : {msg: IPlayCardResult, eventID?: number} {
        let msg = PlayCardResult.decode(data)
        return {msg: msg, eventID: 2003}
    }
    @RpcDecorator({eventID:2004, extend:"NotifyPlayer"})
    NotifyScoreChange(data: Uint8Array, params: RpcParams) : {msg: IMsgScoreChange, eventID?: number} {
        let msg = MsgScoreChange.decode(data)
        return {msg: msg, eventID: 2004}
    }
    @RpcDecorator({eventID:2005, extend:"NotifyPlayer"})
    NotifyGameResult(data: Uint8Array, params: RpcParams) : {msg: IMsgGameResult, eventID?: number} {
        let msg = MsgGameResult.decode(data)
        return {msg: msg, eventID: 2005}
    }
    @RpcDecorator({eventID:2006, extend:"NotifyPlayer"})
    NotifyOpStart(data: Uint8Array, params: RpcParams) : {msg: IOpInfo, eventID?: number} {
        let msg = OpInfo.decode(data)
        return {msg: msg, eventID: 2006}
    }
    @RpcDecorator({eventID:2007, extend:"NotifyPlayer"})
    NotifyOpResult(data: Uint8Array, params: RpcParams) : {msg: IOpResult, eventID?: number} {
        let msg = OpResult.decode(data)
        return {msg: msg, eventID: 2007}
    }
    @RpcDecorator({eventID:2008, extend:"NotifyPlayer"})
    NotifyUserIdentity(data: Uint8Array, params: RpcParams) : {msg: IMsgUserIdentity, eventID?: number} {
        let msg = MsgUserIdentity.decode(data)
        return {msg: msg, eventID: 2008}
    }
    @RpcDecorator({eventID:2009, extend:"NotifyPlayer"})
    NotifyUserRank(data: Uint8Array, params: RpcParams) : {msg: IMsgUserRank, eventID?: number} {
        let msg = MsgUserRank.decode(data)
        return {msg: msg, eventID: 2009}
    }
    @RpcDecorator({eventID:2010, extend:"NotifyPlayer"})
    NotifyBatchedScoreChange(data: Uint8Array, params: RpcParams) : {msg: IMsgBatchedScoreChange, eventID?: number} {
        let msg = MsgBatchedScoreChange.decode(data)
        return {msg: msg, eventID: 2010}
    }
    @RpcDecorator({eventID:2100, extend:"NotifyPlayer"})
    NotifyCallScoreStart(data: Uint8Array, params: RpcParams) : {msg: ICallScoreInfo, eventID?: number} {
        let msg = CallScoreInfo.decode(data)
        return {msg: msg, eventID: 2100}
    }
    @RpcDecorator({eventID:2101, extend:"NotifyPlayer"})
    NotifyCallScoreResult(data: Uint8Array, params: RpcParams) : {msg: ICallScoreResult, eventID?: number} {
        let msg = CallScoreResult.decode(data)
        return {msg: msg, eventID: 2101}
    }
    @RpcDecorator({eventID:2102, extend:"NotifyPlayer"})
    NotifyLaiziCards(data: Uint8Array, params: RpcParams) : {msg: IMsgLaiziCards, eventID?: number} {
        let msg = MsgLaiziCards.decode(data)
        return {msg: msg, eventID: 2102}
    }
    @RpcDecorator({eventID:2103, extend:"NotifyPlayer"})
    NotifyReplacePlayer(data: Uint8Array, params: RpcParams) : {msg: IMsgReplacePlayer, eventID?: number} {
        let msg = MsgReplacePlayer.decode(data)
        return {msg: msg, eventID: 2103}
    }
    @RpcDecorator({eventID:2104, extend:"NotifyPlayer"})
    NotifyBadRequest(data: Uint8Array, params: RpcParams) : {msg: IMsgBadRequest, eventID?: number} {
        let msg = MsgBadRequest.decode(data)
        return {msg: msg, eventID: 2104}
    }
    @RpcDecorator({eventID:2105, extend:"NotifyPlayer"})
    NotifyCallDealerStart(data: Uint8Array, params: RpcParams) : {msg: ICallDealerInfo, eventID?: number} {
        let msg = CallDealerInfo.decode(data)
        return {msg: msg, eventID: 2105}
    }
    @RpcDecorator({eventID:2106, extend:"NotifyPlayer"})
    NotifyCallDealerResult(data: Uint8Array, params: RpcParams) : {msg: ICallDealerResult, eventID?: number} {
        let msg = CallDealerResult.decode(data)
        return {msg: msg, eventID: 2106}
    }
    @RpcDecorator({eventID:2107, extend:"NotifyPlayer"})
    NotifyRaiseScoreStart(data: Uint8Array, params: RpcParams) : {msg: IOpInfo, eventID?: number} {
        let msg = OpInfo.decode(data)
        return {msg: msg, eventID: 2107}
    }
    @RpcDecorator({eventID:2108, extend:"NotifyPlayer"})
    NotifyRaiseScoreResult(data: Uint8Array, params: RpcParams) : {msg: IRaiseScoreResult, eventID?: number} {
        let msg = RaiseScoreResult.decode(data)
        return {msg: msg, eventID: 2108}
    }
    @RpcDecorator({eventID:2109, extend:"NotifyPlayer"})
    NotifySurrender(data: Uint8Array, params: RpcParams) : {msg: IMsgSurrender, eventID?: number} {
        let msg = MsgSurrender.decode(data)
        return {msg: msg, eventID: 2109}
    }
    @RpcDecorator({eventID:2110, extend:"NotifyPlayer"})
    NotifyMultiOpInfo(data: Uint8Array, params: RpcParams) : {msg: IMultiOpInfo, eventID?: number} {
        let msg = MultiOpInfo.decode(data)
        return {msg: msg, eventID: 2110}
    }
    @RpcDecorator({eventID:2111, extend:"NotifyPlayer"})
    NotifyPickCardResult(data: Uint8Array, params: RpcParams) : {msg: IPickCardResult, eventID?: number} {
        let msg = PickCardResult.decode(data)
        return {msg: msg, eventID: 2111}
    }
    @RpcDecorator({eventID:2112, extend:"NotifyPlayer"})
    NotifyFirstPlayer(data: Uint8Array, params: RpcParams) : {msg: IMsgFirstPlayer, eventID?: number} {
        let msg = MsgFirstPlayer.decode(data)
        return {msg: msg, eventID: 2112}
    }
    @RpcDecorator({eventID:2113, extend:"NotifyPlayer"})
    NotifyTaskList(data: Uint8Array, params: RpcParams) : {msg: IMsgTaskList, eventID?: number} {
        let msg = MsgTaskList.decode(data)
        return {msg: msg, eventID: 2113}
    }
    @RpcDecorator({eventID:2114, extend:"NotifyPlayer"})
    NotifyTaskResult(data: Uint8Array, params: RpcParams) : {msg: IMsgTaskResult, eventID?: number} {
        let msg = MsgTaskResult.decode(data)
        return {msg: msg, eventID: 2114}
    }
}
export const ExtendTable = new $ExtendTable({
    name: "tss.pdk.extendtable.v3",
})
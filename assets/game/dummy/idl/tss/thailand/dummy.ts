import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  Void as dummy_base_Void,IVoid as base_IVoid ,  } from "idl/base/base"
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
export enum Opcode {  
    OpcodeUnknown = 0,  
    OpcodeBornCard = 1,  
    OpcodeFollowCard = 2,  
    OpcodePutCard = 3,  
    OpcodeDrawCard = 4,  
    OpcodeDropCard = 5,  
    OpcodeShowSpecialCard = 6,
}
export interface IMsgGameStart {
}
@protobuf.Type.d("dummy_tss_thailand_dummy_v1_MsgGameStart")
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
@protobuf.Type.d("dummy_tss_thailand_dummy_v1_UInt32sValue")
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
}
@protobuf.Type.d("dummy_tss_thailand_dummy_v1_HandCardValue")
export class HandCardValue extends protobuf.Message<IHandCardValue> {
    constructor(properties: Properties<IHandCardValue>) {
        super(properties);
        if (properties) {
            if (properties.uint32s_value) { this.uint32s_value = UInt32sValue.create(properties.uint32s_value) as any }
        }
	}
    @protobuf.Field.d(1, "dummy_tss_thailand_dummy_v1_UInt32sValue", "optional")
    public uint32s_value?: UInt32sValue|null
    @protobuf.OneOf.d("uint32s_value")
    public value?: ("uint32s_value")
}
export interface IOpenCardInfo {
    time?: number|null
}
@protobuf.Type.d("dummy_tss_thailand_dummy_v1_OpenCardInfo")
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
@protobuf.Type.d("dummy_tss_thailand_dummy_v1_OpenCardResult")
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
@protobuf.Type.d("dummy_tss_thailand_dummy_v1_BaWangJiaoInfo")
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
@protobuf.Type.d("dummy_tss_thailand_dummy_v1_BaWangJiaoResult")
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
export interface IMsgUserScoreChange {
    type?: number|null
    change?: number|null
    score?: number|null
    uid?: number|null
}
@protobuf.Type.d("dummy_tss_thailand_dummy_v1_MsgUserScoreChange")
export class MsgUserScoreChange extends protobuf.Message<IMsgUserScoreChange> {
    constructor(properties: Properties<IMsgUserScoreChange>) {
        super(properties);
        if (properties) {
            if (properties.type) { this.type = properties.type }
            if (properties.change) { this.change = properties.change }
            if (properties.score) { this.score = properties.score }
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public type?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public change?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public score?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IMsgScoreChange {
    data?: IMsgUserScoreChange[]
}
@protobuf.Type.d("dummy_tss_thailand_dummy_v1_MsgScoreChange")
export class MsgScoreChange extends protobuf.Message<IMsgScoreChange> {
    constructor(properties: Properties<IMsgScoreChange>) {
        super(properties);
        if (properties) {
            if (properties.data) { this.data = []; properties.data.forEach((value, index)=>{this.data[index] = MsgUserScoreChange.create(properties.data[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "dummy_tss_thailand_dummy_v1_MsgUserScoreChange", "repeated")
    public data?: MsgUserScoreChange[] = []
}
export interface IScoreInfo {
    key?: number|null
    value?: number|null
}
@protobuf.Type.d("dummy_tss_thailand_dummy_v1_ScoreInfo")
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
export interface IMsgUserResult {
    uid?: number|null
    playCards?: number[]
    totalScore?: number|null
    result?: number|null
    leftCards?: number[]
    winType?: number|null
    rank?: number|null
    scoreInfo?: IScoreInfo[]
}
@protobuf.Type.d("dummy_tss_thailand_dummy_v1_MsgUserResult")
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
    @protobuf.Field.d(8, "dummy_tss_thailand_dummy_v1_ScoreInfo", "repeated")
    public scoreInfo?: ScoreInfo[] = []
}
export interface IDealCardItem {
    uid?: number|null
    value?: IHandCardValue
}
@protobuf.Type.d("dummy_tss_thailand_dummy_v1_DealCardItem")
export class DealCardItem extends protobuf.Message<IDealCardItem> {
    constructor(properties: Properties<IDealCardItem>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.value) { this.value = HandCardValue.create(properties.value) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "dummy_tss_thailand_dummy_v1_HandCardValue", "optional")
    public value?: HandCardValue|null
}
export interface IMsgTeamInfo {
    team?: number|null
    score?: number|null
}
@protobuf.Type.d("dummy_tss_thailand_dummy_v1_MsgTeamInfo")
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
export interface IFollowCardInfo {
    targetUid?: number|null
    cardsSeq?: number|null
    cards?: number[]
}
@protobuf.Type.d("dummy_tss_thailand_dummy_v1_FollowCardInfo")
export class FollowCardInfo extends protobuf.Message<IFollowCardInfo> {
    constructor(properties: Properties<IFollowCardInfo>) {
        super(properties);
        if (properties) {
            if (properties.targetUid) { this.targetUid = properties.targetUid }
            if (properties.cardsSeq) { this.cardsSeq = properties.cardsSeq }
            if (properties.cards) { this.cards = []; properties.cards.forEach((value, index)=>{this.cards[index] = properties.cards[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public targetUid?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public cardsSeq?: number|null = 0
    @protobuf.Field.d(3, "uint32", "repeated", [])
    public cards?: number[] = []
}
export interface IMsgGameResult {
    results?: IMsgUserResult[]
}
@protobuf.Type.d("dummy_tss_thailand_dummy_v1_MsgGameResult")
export class MsgGameResult extends protobuf.Message<IMsgGameResult> {
    constructor(properties: Properties<IMsgGameResult>) {
        super(properties);
        if (properties) {
            if (properties.results) { this.results = []; properties.results.forEach((value, index)=>{this.results[index] = MsgUserResult.create(properties.results[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "dummy_tss_thailand_dummy_v1_MsgUserResult", "repeated")
    public results?: MsgUserResult[] = []
}
export interface ICardConfig_CardTypeItem {
    type?: number|null
    args?: string[]
}
@protobuf.Type.d("dummy_tss_thailand_dummy_v1_CardConfig_CardTypeItem")
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
export interface ICallScoreInfo {
    uid?: number|null
    minScore?: number|null
    maxScore?: number|null
    time?: number|null
}
@protobuf.Type.d("dummy_tss_thailand_dummy_v1_CallScoreInfo")
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
export interface IInt32sValue {
    value?: number[]
}
@protobuf.Type.d("dummy_tss_thailand_dummy_v1_Int32sValue")
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
export interface IMsgDealCard {
    dealCards?: IDealCardItem[]
}
@protobuf.Type.d("dummy_tss_thailand_dummy_v1_MsgDealCard")
export class MsgDealCard extends protobuf.Message<IMsgDealCard> {
    constructor(properties: Properties<IMsgDealCard>) {
        super(properties);
        if (properties) {
            if (properties.dealCards) { this.dealCards = []; properties.dealCards.forEach((value, index)=>{this.dealCards[index] = DealCardItem.create(properties.dealCards[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "dummy_tss_thailand_dummy_v1_DealCardItem", "repeated")
    public dealCards?: DealCardItem[] = []
}
export interface IPlayCardReq {
    opcode?: number|null
    cards?: number[]
    unitNums?: number[]
}
@protobuf.Type.d("dummy_tss_thailand_dummy_v1_PlayCardReq")
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
export interface IFollowCardOpts {
    targets?: IFollowCardInfo[]
}
@protobuf.Type.d("dummy_tss_thailand_dummy_v1_FollowCardOpts")
export class FollowCardOpts extends protobuf.Message<IFollowCardOpts> {
    constructor(properties: Properties<IFollowCardOpts>) {
        super(properties);
        if (properties) {
            if (properties.targets) { this.targets = []; properties.targets.forEach((value, index)=>{this.targets[index] = FollowCardInfo.create(properties.targets[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "dummy_tss_thailand_dummy_v1_FollowCardInfo", "repeated")
    public targets?: FollowCardInfo[] = []
}
export interface IBornCardOpts {
    targets?: IBornCardInfo[]
}
@protobuf.Type.d("dummy_tss_thailand_dummy_v1_BornCardOpts")
export class BornCardOpts extends protobuf.Message<IBornCardOpts> {
    constructor(properties: Properties<IBornCardOpts>) {
        super(properties);
        if (properties) {
            if (properties.targets) { this.targets = []; properties.targets.forEach((value, index)=>{this.targets[index] = BornCardInfo.create(properties.targets[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "dummy_tss_thailand_dummy_v1_BornCardInfo", "repeated")
    public targets?: BornCardInfo[] = []
}
export interface IBornCardInfo {
    uid?: number|null
    cardsSeq?: number|null
    cards?: number[]
}
@protobuf.Type.d("dummy_tss_thailand_dummy_v1_BornCardInfo")
export class BornCardInfo extends protobuf.Message<IBornCardInfo> {
    constructor(properties: Properties<IBornCardInfo>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.cardsSeq) { this.cardsSeq = properties.cardsSeq }
            if (properties.cards) { this.cards = []; properties.cards.forEach((value, index)=>{this.cards[index] = properties.cards[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public cardsSeq?: number|null = 0
    @protobuf.Field.d(3, "uint32", "repeated", [])
    public cards?: number[] = []
}
export interface IShowCardInfo {
    uid?: number|null
    opcodes?: number[]
    cards?: number[]
}
@protobuf.Type.d("dummy_tss_thailand_dummy_v1_ShowCardInfo")
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
export interface ICallDealerInfo {
    uid?: number|null
    caller?: number|null
    time?: number|null
}
@protobuf.Type.d("dummy_tss_thailand_dummy_v1_CallDealerInfo")
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
export interface IPickCardInfo {
    uid?: number|null
    time?: number|null
    num?: number|null
}
@protobuf.Type.d("dummy_tss_thailand_dummy_v1_PickCardInfo")
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
export interface IDropCardInfo {
    uid?: number|null
    card?: number|null
}
@protobuf.Type.d("dummy_tss_thailand_dummy_v1_DropCardInfo")
export class DropCardInfo extends protobuf.Message<IDropCardInfo> {
    constructor(properties: Properties<IDropCardInfo>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.card) { this.card = properties.card }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "uint32", "optional", 0)
    public card?: number|null = 0
}
export interface IDrawCardInfo {
    uid?: number|null
    card?: number|null
}
@protobuf.Type.d("dummy_tss_thailand_dummy_v1_DrawCardInfo")
export class DrawCardInfo extends protobuf.Message<IDrawCardInfo> {
    constructor(properties: Properties<IDrawCardInfo>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.card) { this.card = properties.card }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "uint32", "optional", 0)
    public card?: number|null = 0
}
export interface IMsgUserRank {
    uid?: number|null
    rank?: number|null
}
@protobuf.Type.d("dummy_tss_thailand_dummy_v1_MsgUserRank")
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
@protobuf.Type.d("dummy_tss_thailand_dummy_v1_CallScoreReq")
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
export interface IInt32KV {
    key?: string|null
    value?: number|null
}
@protobuf.Type.d("dummy_tss_thailand_dummy_v1_Int32KV")
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
export interface ICallScoreResult {
    uid?: number|null
    score?: number|null
    caller?: number|null
    callScore?: number|null
    bottomCards?: number[]
    totalMultiples?: number|null
    isForce?: boolean|null
}
@protobuf.Type.d("dummy_tss_thailand_dummy_v1_CallScoreResult")
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
export interface IMsgLaiziCards {
    cards?: number[]
}
@protobuf.Type.d("dummy_tss_thailand_dummy_v1_MsgLaiziCards")
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
export interface IPutCardOpts {
    targets?: IPutCardInfo[]
}
@protobuf.Type.d("dummy_tss_thailand_dummy_v1_PutCardOpts")
export class PutCardOpts extends protobuf.Message<IPutCardOpts> {
    constructor(properties: Properties<IPutCardOpts>) {
        super(properties);
        if (properties) {
            if (properties.targets) { this.targets = []; properties.targets.forEach((value, index)=>{this.targets[index] = PutCardInfo.create(properties.targets[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "dummy_tss_thailand_dummy_v1_PutCardInfo", "repeated")
    public targets?: PutCardInfo[] = []
}
export interface IOptionList {
    uid?: number|null
    stage?: string|null
    born_card_opts?: IBornCardOpts
    follow_card_opts?: IFollowCardOpts
    put_card_opts?: IPutCardOpts
}
@protobuf.Type.d("dummy_tss_thailand_dummy_v1_OptionList")
export class OptionList extends protobuf.Message<IOptionList> {
    constructor(properties: Properties<IOptionList>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.stage) { this.stage = properties.stage }
            if (properties.born_card_opts) { this.born_card_opts = BornCardOpts.create(properties.born_card_opts) as any }
            if (properties.follow_card_opts) { this.follow_card_opts = FollowCardOpts.create(properties.follow_card_opts) as any }
            if (properties.put_card_opts) { this.put_card_opts = PutCardOpts.create(properties.put_card_opts) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public stage?: string|null = ""
    @protobuf.Field.d(101, "dummy_tss_thailand_dummy_v1_BornCardOpts", "optional")
    public born_card_opts?: BornCardOpts|null
    @protobuf.Field.d(102, "dummy_tss_thailand_dummy_v1_FollowCardOpts", "optional")
    public follow_card_opts?: FollowCardOpts|null
    @protobuf.Field.d(103, "dummy_tss_thailand_dummy_v1_PutCardOpts", "optional")
    public put_card_opts?: PutCardOpts|null
    @protobuf.OneOf.d("born_card_opts","follow_card_opts","put_card_opts")
    public value?: ("born_card_opts"|"follow_card_opts"|"put_card_opts")
}
export interface IPlayCardInfo {
    uid?: number|null
    isNew?: boolean|null
    time?: number|null
    extraTime?: number|null
    opcodes?: Opcode[]
    options?: IOptionList
}
@protobuf.Type.d("dummy_tss_thailand_dummy_v1_PlayCardInfo")
export class PlayCardInfo extends protobuf.Message<IPlayCardInfo> {
    constructor(properties: Properties<IPlayCardInfo>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.isNew) { this.isNew = properties.isNew }
            if (properties.time) { this.time = properties.time }
            if (properties.extraTime) { this.extraTime = properties.extraTime }
            if (properties.opcodes) { this.opcodes = []; properties.opcodes.forEach((value, index)=>{this.opcodes[index] = properties.opcodes[index]})}
            if (properties.options) { this.options = OptionList.create(properties.options) as any }
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
    @protobuf.Field.d(5, Opcode, "repeated", Opcode.OpcodeUnknown)
    public opcodes?: Opcode[] = []
    @protobuf.Field.d(6, "dummy_tss_thailand_dummy_v1_OptionList", "optional")
    public options?: OptionList|null
}
export interface IShowCardResult {
    uid?: number|null
    opcode?: number|null
    cards?: number[]
    isForce?: boolean|null
}
@protobuf.Type.d("dummy_tss_thailand_dummy_v1_ShowCardResult")
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
export interface IPutCardInfo {
    uid?: number|null
    cardsSeq?: number|null
    cards?: number[]
}
@protobuf.Type.d("dummy_tss_thailand_dummy_v1_PutCardInfo")
export class PutCardInfo extends protobuf.Message<IPutCardInfo> {
    constructor(properties: Properties<IPutCardInfo>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.cardsSeq) { this.cardsSeq = properties.cardsSeq }
            if (properties.cards) { this.cards = []; properties.cards.forEach((value, index)=>{this.cards[index] = properties.cards[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public cardsSeq?: number|null = 0
    @protobuf.Field.d(3, "uint32", "repeated", [])
    public cards?: number[] = []
}
export interface IOpResult {
    uid?: number|null
    stage?: string|null
    null?: NullValue|null
    draw_card_info?: IDrawCardInfo
    follow_card_info?: IFollowCardInfo
    born_card_info?: IBornCardInfo
    put_card_info?: IPutCardInfo
    drop_card_info?: IDropCardInfo
}
@protobuf.Type.d("dummy_tss_thailand_dummy_v1_OpResult")
export class OpResult extends protobuf.Message<IOpResult> {
    constructor(properties: Properties<IOpResult>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.stage) { this.stage = properties.stage }
            if (properties.null) { this.null = properties.null }
            if (properties.draw_card_info) { this.draw_card_info = DrawCardInfo.create(properties.draw_card_info) as any }
            if (properties.follow_card_info) { this.follow_card_info = FollowCardInfo.create(properties.follow_card_info) as any }
            if (properties.born_card_info) { this.born_card_info = BornCardInfo.create(properties.born_card_info) as any }
            if (properties.put_card_info) { this.put_card_info = PutCardInfo.create(properties.put_card_info) as any }
            if (properties.drop_card_info) { this.drop_card_info = DropCardInfo.create(properties.drop_card_info) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public stage?: string|null = ""
    @protobuf.Field.d(100, NullValue, "optional", NullValue.NULL_VALUE)
    public null?: NullValue|null = NullValue.NULL_VALUE
    @protobuf.Field.d(111, "dummy_tss_thailand_dummy_v1_DrawCardInfo", "optional")
    public draw_card_info?: DrawCardInfo|null
    @protobuf.Field.d(112, "dummy_tss_thailand_dummy_v1_FollowCardInfo", "optional")
    public follow_card_info?: FollowCardInfo|null
    @protobuf.Field.d(113, "dummy_tss_thailand_dummy_v1_BornCardInfo", "optional")
    public born_card_info?: BornCardInfo|null
    @protobuf.Field.d(114, "dummy_tss_thailand_dummy_v1_PutCardInfo", "optional")
    public put_card_info?: PutCardInfo|null
    @protobuf.Field.d(115, "dummy_tss_thailand_dummy_v1_DropCardInfo", "optional")
    public drop_card_info?: DropCardInfo|null
    @protobuf.OneOf.d("null","draw_card_info","follow_card_info","born_card_info","put_card_info","drop_card_info")
    public value?: ("null"|"draw_card_info"|"follow_card_info"|"born_card_info"|"put_card_info"|"drop_card_info")
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
@protobuf.Type.d("dummy_tss_thailand_dummy_v1_OpInfo")
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
    @protobuf.Field.d(102, "dummy_tss_thailand_dummy_v1_PlayCardInfo", "optional")
    public play_card_info?: PlayCardInfo|null
    @protobuf.Field.d(103, "dummy_tss_thailand_dummy_v1_CallScoreInfo", "optional")
    public call_score_info?: CallScoreInfo|null
    @protobuf.Field.d(104, "dummy_tss_thailand_dummy_v1_Int32sValue", "optional")
    public int32s_value?: Int32sValue|null
    @protobuf.Field.d(105, "dummy_tss_thailand_dummy_v1_ShowCardInfo", "optional")
    public show_card_info?: ShowCardInfo|null
    @protobuf.Field.d(106, "dummy_tss_thailand_dummy_v1_CallDealerInfo", "optional")
    public call_dealer_info?: CallDealerInfo|null
    @protobuf.Field.d(107, "dummy_tss_thailand_dummy_v1_PickCardInfo", "optional")
    public pick_card_info?: PickCardInfo|null
    @protobuf.Field.d(108, "dummy_tss_thailand_dummy_v1_BaWangJiaoInfo", "optional")
    public bawangjiao_info?: BaWangJiaoInfo|null
    @protobuf.Field.d(109, "dummy_tss_thailand_dummy_v1_OpenCardInfo", "optional")
    public opencard_info?: OpenCardInfo|null
    @protobuf.OneOf.d("null","play_card_info","call_score_info","int32s_value","show_card_info","call_dealer_info","pick_card_info","bawangjiao_info","opencard_info")
    public value?: ("null"|"play_card_info"|"call_score_info"|"int32s_value"|"show_card_info"|"call_dealer_info"|"pick_card_info"|"bawangjiao_info"|"opencard_info")
}
export interface IMsgFirstCardInfo {
    value?: number|null
}
@protobuf.Type.d("dummy_tss_thailand_dummy_v1_MsgFirstCardInfo")
export class MsgFirstCardInfo extends protobuf.Message<IMsgFirstCardInfo> {
    constructor(properties: Properties<IMsgFirstCardInfo>) {
        super(properties);
        if (properties) {
            if (properties.value) { this.value = properties.value }
        }
	}
    @protobuf.Field.d(1, "uint32", "optional", 0)
    public value?: number|null = 0
}
export interface IPlayOpResult {
    uid?: number|null
    opcode?: number|null
    cards?: number[]
    opResult?: IOpResult
}
@protobuf.Type.d("dummy_tss_thailand_dummy_v1_PlayOpResult")
export class PlayOpResult extends protobuf.Message<IPlayOpResult> {
    constructor(properties: Properties<IPlayOpResult>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.opcode) { this.opcode = properties.opcode }
            if (properties.cards) { this.cards = []; properties.cards.forEach((value, index)=>{this.cards[index] = properties.cards[index]})}
            if (properties.opResult) { this.opResult = OpResult.create(properties.opResult) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public opcode?: number|null = 0
    @protobuf.Field.d(3, "uint32", "repeated", [])
    public cards?: number[] = []
    @protobuf.Field.d(4, "dummy_tss_thailand_dummy_v1_OpResult", "optional")
    public opResult?: OpResult|null
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
@protobuf.Type.d("dummy_tss_thailand_dummy_v1_MsgUserInfo")
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
    @protobuf.Field.d(4, "dummy_tss_thailand_dummy_v1_HandCardValue", "optional")
    public handCards?: HandCardValue|null
    @protobuf.Field.d(5, "int32", "optional", 0)
    public identity?: number|null = 0
    @protobuf.Field.d(6, "int32", "optional", 0)
    public rank?: number|null = 0
    @protobuf.Field.d(7, "int32", "optional", 0)
    public team?: number|null = 0
    @protobuf.Field.d(8, "dummy_tss_thailand_dummy_v1_OpInfo", "optional")
    public opInfo?: OpInfo|null
    @protobuf.Field.d(9, "dummy_tss_thailand_dummy_v1_OpResult", "optional")
    public identityData?: OpResult|null
    @protobuf.Field.d(10, "uint32", "repeated", [])
    public originCards?: number[] = []
    @protobuf.Field.d(11, "dummy_tss_thailand_dummy_v1_ScoreInfo", "repeated")
    public scoreInfo?: ScoreInfo[] = []
    @protobuf.Field.d(12, "dummy_tss_thailand_dummy_v1_Int32KV", "repeated")
    public statusInfo?: Int32KV[] = []
}
export interface IOperateReq {
    opcode?: number|null
    data?: IOpResult
}
@protobuf.Type.d("dummy_tss_thailand_dummy_v1_OperateReq")
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
    @protobuf.Field.d(2, "dummy_tss_thailand_dummy_v1_OpResult", "optional")
    public data?: OpResult|null
}
export interface IMultiOpInfo {
    data?: IOpInfo[]
}
@protobuf.Type.d("dummy_tss_thailand_dummy_v1_MultiOpInfo")
export class MultiOpInfo extends protobuf.Message<IMultiOpInfo> {
    constructor(properties: Properties<IMultiOpInfo>) {
        super(properties);
        if (properties) {
            if (properties.data) { this.data = []; properties.data.forEach((value, index)=>{this.data[index] = OpInfo.create(properties.data[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "dummy_tss_thailand_dummy_v1_OpInfo", "repeated")
    public data?: OpInfo[] = []
}
export interface IMsgUserIdentity {
    uid?: number|null
    identity?: number|null
    data?: IOpResult
}
@protobuf.Type.d("dummy_tss_thailand_dummy_v1_MsgUserIdentity")
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
    @protobuf.Field.d(3, "dummy_tss_thailand_dummy_v1_OpResult", "optional")
    public data?: OpResult|null
}
export interface IMsgReplacePlayer {
    seat?: number|null
    curUser?: IMsgUserInfo
    preUser?: IMsgUserInfo
}
@protobuf.Type.d("dummy_tss_thailand_dummy_v1_MsgReplacePlayer")
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
    @protobuf.Field.d(2, "dummy_tss_thailand_dummy_v1_MsgUserInfo", "optional")
    public curUser?: MsgUserInfo|null
    @protobuf.Field.d(3, "dummy_tss_thailand_dummy_v1_MsgUserInfo", "optional")
    public preUser?: MsgUserInfo|null
}
export interface IMsgBadRequest {
    code?: number|null
    user?: IMsgUserInfo
    stage?: string|null
}
@protobuf.Type.d("dummy_tss_thailand_dummy_v1_MsgBadRequest")
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
    @protobuf.Field.d(2, "dummy_tss_thailand_dummy_v1_MsgUserInfo", "optional")
    public user?: MsgUserInfo|null
    @protobuf.Field.d(3, "string", "optional", )
    public stage?: string|null = ""
}
export interface ICardConfig {
    types?: ICardConfig_CardTypeItem[]
    compare?: string[]
    totalCards?: number[]
}
@protobuf.Type.d("dummy_tss_thailand_dummy_v1_CardConfig")
export class CardConfig extends protobuf.Message<ICardConfig> {
    constructor(properties: Properties<ICardConfig>) {
        super(properties);
        if (properties) {
            if (properties.types) { this.types = []; properties.types.forEach((value, index)=>{this.types[index] = CardConfig_CardTypeItem.create(properties.types[index]) as any})}
            if (properties.compare) { this.compare = []; properties.compare.forEach((value, index)=>{this.compare[index] = properties.compare[index]})}
            if (properties.totalCards) { this.totalCards = []; properties.totalCards.forEach((value, index)=>{this.totalCards[index] = properties.totalCards[index]})}
        }
	}
    @protobuf.Field.d(1, "dummy_tss_thailand_dummy_v1_CardConfig_CardTypeItem", "repeated")
    public types?: CardConfig_CardTypeItem[] = []
    @protobuf.Field.d(2, "string", "repeated", [])
    public compare?: string[] = []
    @protobuf.Field.d(3, "uint32", "repeated", [])
    public totalCards?: number[] = []
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
    cardConfig?: ICardConfig
    syncOps?: IOpResult[]
}
@protobuf.Type.d("dummy_tss_thailand_dummy_v1_MsgTableInfo")
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
            if (properties.cardConfig) { this.cardConfig = CardConfig.create(properties.cardConfig) as any }
            if (properties.syncOps) { this.syncOps = []; properties.syncOps.forEach((value, index)=>{this.syncOps[index] = OpResult.create(properties.syncOps[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "uint64", "optional", 0)
    public tid?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public tKey?: string|null = ""
    @protobuf.Field.d(3, "dummy_tss_thailand_dummy_v1_MsgUserInfo", "repeated")
    public users?: MsgUserInfo[] = []
    @protobuf.Field.d(4, "int32", "optional", 0)
    public playOption?: number|null = 0
    @protobuf.Field.d(5, "int32", "optional", 0)
    public mode?: number|null = 0
    @protobuf.Field.d(6, "string", "optional", )
    public stage?: string|null = ""
    @protobuf.Field.d(7, "dummy_tss_thailand_dummy_v1_MsgTeamInfo", "repeated")
    public teams?: MsgTeamInfo[] = []
    @protobuf.Field.d(8, "int64", "optional", 0)
    public roundScore?: number|null = 0
    @protobuf.Field.d(9, "dummy_tss_thailand_dummy_v1_OpResult", "repeated")
    public opResults?: OpResult[] = []
    @protobuf.Field.d(10, "uint32", "repeated", [])
    public playCards?: number[] = []
    @protobuf.Field.d(11, "uint32", "repeated", [])
    public laizi?: number[] = []
    @protobuf.Field.d(12, "dummy_tss_thailand_dummy_v1_ScoreInfo", "repeated")
    public scoreInfo?: ScoreInfo[] = []
    @protobuf.Field.d(13, "int64", "optional", 0)
    public totalScore?: number|null = 0
    @protobuf.Field.d(14, "uint32", "repeated", [])
    public bottomCards?: number[] = []
    @protobuf.Field.d(15, "int64", "optional", 0)
    public baseScore?: number|null = 0
    @protobuf.Field.d(17, "dummy_tss_thailand_dummy_v1_CardConfig", "optional")
    public cardConfig?: CardConfig|null
    @protobuf.Field.d(18, "dummy_tss_thailand_dummy_v1_OpResult", "repeated")
    public syncOps?: OpResult[] = []
}
class $ExtendTable extends RpcService {
    @RpcDecorator({eventID:1002, extend:"Action"})
    DoOperate(req: IOperateReq, params: RpcParams) : {bytes: Uint8Array, eventID?: number} {
        let bytes = OperateReq.encode(req).finish()
        return {bytes: bytes, eventID: 1002}
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
    NotifyFirstCard(data: Uint8Array, params: RpcParams) : {msg: IMsgFirstCardInfo, eventID?: number} {
        let msg = MsgFirstCardInfo.decode(data)
        return {msg: msg, eventID: 2003}
    }
    @RpcDecorator({eventID:2104, extend:"NotifyPlayer"})
    NotifyBadRequest(data: Uint8Array, params: RpcParams) : {msg: IMsgBadRequest, eventID?: number} {
        let msg = MsgBadRequest.decode(data)
        return {msg: msg, eventID: 2104}
    }
    @RpcDecorator({eventID:2005, extend:"NotifyPlayer"})
    NotifyGameResult(data: Uint8Array, params: RpcParams) : {msg: IMsgGameResult, eventID?: number} {
        let msg = MsgGameResult.decode(data)
        return {msg: msg, eventID: 2005}
    }
    @RpcDecorator({eventID:2006, extend:"NotifyPlayer"})
    NotifyOpResult(data: Uint8Array, params: RpcParams) : {msg: IPlayOpResult, eventID?: number} {
        let msg = PlayOpResult.decode(data)
        return {msg: msg, eventID: 2006}
    }
    @RpcDecorator({eventID:2017, extend:"NotifyPlayer"})
    NotifyScoreChange(data: Uint8Array, params: RpcParams) : {msg: IMsgScoreChange, eventID?: number} {
        let msg = MsgScoreChange.decode(data)
        return {msg: msg, eventID: 2017}
    }
}
export const ExtendTable = new $ExtendTable({
    name: "tss.thailand.dummy.v1",
})
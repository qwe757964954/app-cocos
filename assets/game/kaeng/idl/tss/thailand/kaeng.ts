import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  Void as kaeng_base_Void,IVoid as base_IVoid ,  } from "idl/base/base"
export enum ScoreOp {  
    Set = 0,  
    Mul = 1,  
    Add = 2,
}
export enum ScoreType {  
    ScoreTypeUnknown = 0,  
    SpecialScoreTypeSameThree = 1,  
    SpecialScoreTypeOneLine = 2,  
    SpecialScoreTypeSameColor = 3,  
    SpecialScoreTypeSameThreeAndPair = 4,  
    SpecialScoreTypeSameFour = 5,  
    SpecialScoreTypeSameColorAndOneLine = 6,  
    ScoreTypeFollowCard = 7,  
    ScoreTypeWinShowCard = 8,  
    ScoreTypeFailShowCard = 9,
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
    OpcodeDrawCard = 1,  
    OpcodeFollowCard = 2,  
    OpcodeShowCard = 3,  
    OpcodeDropCard = 4,
}
export interface IMsgGameStart {
}
@protobuf.Type.d("kaeng_tss_thailand_kaeng_v1_MsgGameStart")
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
@protobuf.Type.d("kaeng_tss_thailand_kaeng_v1_UInt32sValue")
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
@protobuf.Type.d("kaeng_tss_thailand_kaeng_v1_HandCardValue")
export class HandCardValue extends protobuf.Message<IHandCardValue> {
    constructor(properties: Properties<IHandCardValue>) {
        super(properties);
        if (properties) {
            if (properties.uint32s_value) { this.uint32s_value = UInt32sValue.create(properties.uint32s_value) as any }
            if (properties.int32_value) { this.int32_value = properties.int32_value }
        }
	}
    @protobuf.Field.d(1, "kaeng_tss_thailand_kaeng_v1_UInt32sValue", "optional")
    public uint32s_value?: UInt32sValue|null
    @protobuf.Field.d(2, "int32", "optional", 0)
    public int32_value?: number|null = 0
    @protobuf.OneOf.d("uint32s_value","int32_value")
    public value?: ("uint32s_value"|"int32_value")
}
export interface IFollowCardInfo {
    uid?: number|null
    targetUid?: number|null
    card?: number[]
}
@protobuf.Type.d("kaeng_tss_thailand_kaeng_v1_FollowCardInfo")
export class FollowCardInfo extends protobuf.Message<IFollowCardInfo> {
    constructor(properties: Properties<IFollowCardInfo>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.targetUid) { this.targetUid = properties.targetUid }
            if (properties.card) { this.card = []; properties.card.forEach((value, index)=>{this.card[index] = properties.card[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public targetUid?: number|null = 0
    @protobuf.Field.d(3, "uint32", "repeated", [])
    public card?: number[] = []
}
export interface IDropCardInfo {
    uid?: number|null
    card?: number[]
}
@protobuf.Type.d("kaeng_tss_thailand_kaeng_v1_DropCardInfo")
export class DropCardInfo extends protobuf.Message<IDropCardInfo> {
    constructor(properties: Properties<IDropCardInfo>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.card) { this.card = []; properties.card.forEach((value, index)=>{this.card[index] = properties.card[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "uint32", "repeated", [])
    public card?: number[] = []
}
export interface IScoreInfo {
    key?: number|null
    value?: number|null
}
@protobuf.Type.d("kaeng_tss_thailand_kaeng_v1_ScoreInfo")
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
    scoreInfo?: IScoreInfo[]
}
@protobuf.Type.d("kaeng_tss_thailand_kaeng_v1_MsgUserResult")
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
    @protobuf.Field.d(8, "kaeng_tss_thailand_kaeng_v1_ScoreInfo", "repeated")
    public scoreInfo?: ScoreInfo[] = []
}
export interface IDealCardItem {
    uid?: number|null
    value?: IHandCardValue
}
@protobuf.Type.d("kaeng_tss_thailand_kaeng_v1_DealCardItem")
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
    @protobuf.Field.d(2, "kaeng_tss_thailand_kaeng_v1_HandCardValue", "optional")
    public value?: HandCardValue|null
}
export interface IDrawCardInfo {
    uid?: number|null
    card?: number|null
}
@protobuf.Type.d("kaeng_tss_thailand_kaeng_v1_DrawCardInfo")
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
export interface IMsgGameResult {
    results?: IMsgUserResult[]
    baseScore?: number|null
}
@protobuf.Type.d("kaeng_tss_thailand_kaeng_v1_MsgGameResult")
export class MsgGameResult extends protobuf.Message<IMsgGameResult> {
    constructor(properties: Properties<IMsgGameResult>) {
        super(properties);
        if (properties) {
            if (properties.results) { this.results = []; properties.results.forEach((value, index)=>{this.results[index] = MsgUserResult.create(properties.results[index]) as any})}
            if (properties.baseScore) { this.baseScore = properties.baseScore }
        }
	}
    @protobuf.Field.d(1, "kaeng_tss_thailand_kaeng_v1_MsgUserResult", "repeated")
    public results?: MsgUserResult[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public baseScore?: number|null = 0
}
export interface ICardConfig_CardTypeItem {
    type?: number|null
    args?: string[]
}
@protobuf.Type.d("kaeng_tss_thailand_kaeng_v1_CardConfig_CardTypeItem")
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
export interface IInt32KV {
    key?: string|null
    value?: number|null
}
@protobuf.Type.d("kaeng_tss_thailand_kaeng_v1_Int32KV")
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
export interface IInt32sValue {
    value?: number[]
}
@protobuf.Type.d("kaeng_tss_thailand_kaeng_v1_Int32sValue")
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
@protobuf.Type.d("kaeng_tss_thailand_kaeng_v1_MsgDealCard")
export class MsgDealCard extends protobuf.Message<IMsgDealCard> {
    constructor(properties: Properties<IMsgDealCard>) {
        super(properties);
        if (properties) {
            if (properties.dealCards) { this.dealCards = []; properties.dealCards.forEach((value, index)=>{this.dealCards[index] = DealCardItem.create(properties.dealCards[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "kaeng_tss_thailand_kaeng_v1_DealCardItem", "repeated")
    public dealCards?: DealCardItem[] = []
}
export interface IPlayCardReq {
    opcode?: number|null
    cards?: number[]
    unitNums?: number[]
}
@protobuf.Type.d("kaeng_tss_thailand_kaeng_v1_PlayCardReq")
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
export interface IDrawCardOpt {
}
@protobuf.Type.d("kaeng_tss_thailand_kaeng_v1_DrawCardOpt")
export class DrawCardOpt extends protobuf.Message<IDrawCardOpt> {
    constructor(properties: Properties<IDrawCardOpt>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IShowCardOpt {
}
@protobuf.Type.d("kaeng_tss_thailand_kaeng_v1_ShowCardOpt")
export class ShowCardOpt extends protobuf.Message<IShowCardOpt> {
    constructor(properties: Properties<IShowCardOpt>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IOpResult {
    uid?: number|null
    stage?: string|null
    null?: NullValue|null
    draw_card_info?: IDrawCardInfo
    follow_card_info?: IFollowCardInfo
    drop_card_info?: IDropCardInfo
}
@protobuf.Type.d("kaeng_tss_thailand_kaeng_v1_OpResult")
export class OpResult extends protobuf.Message<IOpResult> {
    constructor(properties: Properties<IOpResult>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.stage) { this.stage = properties.stage }
            if (properties.null) { this.null = properties.null }
            if (properties.draw_card_info) { this.draw_card_info = DrawCardInfo.create(properties.draw_card_info) as any }
            if (properties.follow_card_info) { this.follow_card_info = FollowCardInfo.create(properties.follow_card_info) as any }
            if (properties.drop_card_info) { this.drop_card_info = DropCardInfo.create(properties.drop_card_info) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public stage?: string|null = ""
    @protobuf.Field.d(100, NullValue, "optional", NullValue.NULL_VALUE)
    public null?: NullValue|null = NullValue.NULL_VALUE
    @protobuf.Field.d(111, "kaeng_tss_thailand_kaeng_v1_DrawCardInfo", "optional")
    public draw_card_info?: DrawCardInfo|null
    @protobuf.Field.d(112, "kaeng_tss_thailand_kaeng_v1_FollowCardInfo", "optional")
    public follow_card_info?: FollowCardInfo|null
    @protobuf.Field.d(115, "kaeng_tss_thailand_kaeng_v1_DropCardInfo", "optional")
    public drop_card_info?: DropCardInfo|null
    @protobuf.OneOf.d("null","draw_card_info","follow_card_info","drop_card_info")
    public value?: ("null"|"draw_card_info"|"follow_card_info"|"drop_card_info")
}
export interface IMsgUserScoreChange {
    type?: number|null
    change?: number|null
    changeOP?: ScoreOp|null
    score?: number|null
    uid?: number|null
    data?: IOpResult
    totalScore?: number|null
}
@protobuf.Type.d("kaeng_tss_thailand_kaeng_v1_MsgUserScoreChange")
export class MsgUserScoreChange extends protobuf.Message<IMsgUserScoreChange> {
    constructor(properties: Properties<IMsgUserScoreChange>) {
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
    @protobuf.Field.d(6, "kaeng_tss_thailand_kaeng_v1_OpResult", "optional")
    public data?: OpResult|null
    @protobuf.Field.d(7, "int64", "optional", 0)
    public totalScore?: number|null = 0
}
export interface IOpInfo {
    uid?: number|null
    time?: number|null
    stage?: string|null
    null?: NullValue|null
    play_card_info?: IMsgPlayCardInfo
    int32s_value?: IInt32sValue
    draw_card_info?: IDrawCardInfo
    follow_card_info?: IFollowCardInfo
    drop_card_info?: IDropCardInfo
}
@protobuf.Type.d("kaeng_tss_thailand_kaeng_v1_OpInfo")
export class OpInfo extends protobuf.Message<IOpInfo> {
    constructor(properties: Properties<IOpInfo>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.time) { this.time = properties.time }
            if (properties.stage) { this.stage = properties.stage }
            if (properties.null) { this.null = properties.null }
            if (properties.play_card_info) { this.play_card_info = MsgPlayCardInfo.create(properties.play_card_info) as any }
            if (properties.int32s_value) { this.int32s_value = Int32sValue.create(properties.int32s_value) as any }
            if (properties.draw_card_info) { this.draw_card_info = DrawCardInfo.create(properties.draw_card_info) as any }
            if (properties.follow_card_info) { this.follow_card_info = FollowCardInfo.create(properties.follow_card_info) as any }
            if (properties.drop_card_info) { this.drop_card_info = DropCardInfo.create(properties.drop_card_info) as any }
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
    @protobuf.Field.d(102, "kaeng_tss_thailand_kaeng_v1_MsgPlayCardInfo", "optional")
    public play_card_info?: MsgPlayCardInfo|null
    @protobuf.Field.d(104, "kaeng_tss_thailand_kaeng_v1_Int32sValue", "optional")
    public int32s_value?: Int32sValue|null
    @protobuf.Field.d(111, "kaeng_tss_thailand_kaeng_v1_DrawCardInfo", "optional")
    public draw_card_info?: DrawCardInfo|null
    @protobuf.Field.d(112, "kaeng_tss_thailand_kaeng_v1_FollowCardInfo", "optional")
    public follow_card_info?: FollowCardInfo|null
    @protobuf.Field.d(115, "kaeng_tss_thailand_kaeng_v1_DropCardInfo", "optional")
    public drop_card_info?: DropCardInfo|null
    @protobuf.OneOf.d("null","play_card_info","int32s_value","draw_card_info","follow_card_info","drop_card_info")
    public value?: ("null"|"play_card_info"|"int32s_value"|"draw_card_info"|"follow_card_info"|"drop_card_info")
}
export interface IMsgUserInfo {
    uid?: number|null
    seat?: number|null
    isManaged?: boolean|null
    handCards?: IHandCardValue
    opInfo?: IOpInfo
    originCards?: number[]
    scoreInfo?: IScoreInfo[]
    statusInfo?: IInt32KV[]
}
@protobuf.Type.d("kaeng_tss_thailand_kaeng_v1_MsgUserInfo")
export class MsgUserInfo extends protobuf.Message<IMsgUserInfo> {
    constructor(properties: Properties<IMsgUserInfo>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.seat) { this.seat = properties.seat }
            if (properties.isManaged) { this.isManaged = properties.isManaged }
            if (properties.handCards) { this.handCards = HandCardValue.create(properties.handCards) as any }
            if (properties.opInfo) { this.opInfo = OpInfo.create(properties.opInfo) as any }
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
    @protobuf.Field.d(4, "kaeng_tss_thailand_kaeng_v1_HandCardValue", "optional")
    public handCards?: HandCardValue|null
    @protobuf.Field.d(8, "kaeng_tss_thailand_kaeng_v1_OpInfo", "optional")
    public opInfo?: OpInfo|null
    @protobuf.Field.d(10, "uint32", "repeated", [])
    public originCards?: number[] = []
    @protobuf.Field.d(11, "kaeng_tss_thailand_kaeng_v1_ScoreInfo", "repeated")
    public scoreInfo?: ScoreInfo[] = []
    @protobuf.Field.d(12, "kaeng_tss_thailand_kaeng_v1_Int32KV", "repeated")
    public statusInfo?: Int32KV[] = []
}
export interface IOperateReq {
    opcode?: number|null
    data?: IOpResult
}
@protobuf.Type.d("kaeng_tss_thailand_kaeng_v1_OperateReq")
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
    @protobuf.Field.d(2, "kaeng_tss_thailand_kaeng_v1_OpResult", "optional")
    public data?: OpResult|null
}
export interface IMsgReplacePlayer {
    seat?: number|null
    curUser?: IMsgUserInfo
    preUser?: IMsgUserInfo
}
@protobuf.Type.d("kaeng_tss_thailand_kaeng_v1_MsgReplacePlayer")
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
    @protobuf.Field.d(2, "kaeng_tss_thailand_kaeng_v1_MsgUserInfo", "optional")
    public curUser?: MsgUserInfo|null
    @protobuf.Field.d(3, "kaeng_tss_thailand_kaeng_v1_MsgUserInfo", "optional")
    public preUser?: MsgUserInfo|null
}
export interface IMsgBadRequest {
    code?: number|null
    user?: IMsgUserInfo
    stage?: string|null
}
@protobuf.Type.d("kaeng_tss_thailand_kaeng_v1_MsgBadRequest")
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
    @protobuf.Field.d(2, "kaeng_tss_thailand_kaeng_v1_MsgUserInfo", "optional")
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
@protobuf.Type.d("kaeng_tss_thailand_kaeng_v1_TaskInfo")
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
export interface IMsgFirstPlayer {
    uid?: number|null
}
@protobuf.Type.d("kaeng_tss_thailand_kaeng_v1_MsgFirstPlayer")
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
export interface IDirectlyShowCardScoreConfig {
    ActivelyShowCardSuccessScore?: number|null
    ActivelyShowCardFailScore?: number|null
}
@protobuf.Type.d("kaeng_tss_thailand_kaeng_v1_DirectlyShowCardScoreConfig")
export class DirectlyShowCardScoreConfig extends protobuf.Message<IDirectlyShowCardScoreConfig> {
    constructor(properties: Properties<IDirectlyShowCardScoreConfig>) {
        super(properties);
        if (properties) {
            if (properties.ActivelyShowCardSuccessScore) { this.ActivelyShowCardSuccessScore = properties.ActivelyShowCardSuccessScore }
            if (properties.ActivelyShowCardFailScore) { this.ActivelyShowCardFailScore = properties.ActivelyShowCardFailScore }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public ActivelyShowCardSuccessScore?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public ActivelyShowCardFailScore?: number|null = 0
}
export interface IMsgTaskList {
    data?: ITaskInfo[]
}
@protobuf.Type.d("kaeng_tss_thailand_kaeng_v1_MsgTaskList")
export class MsgTaskList extends protobuf.Message<IMsgTaskList> {
    constructor(properties: Properties<IMsgTaskList>) {
        super(properties);
        if (properties) {
            if (properties.data) { this.data = []; properties.data.forEach((value, index)=>{this.data[index] = TaskInfo.create(properties.data[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "kaeng_tss_thailand_kaeng_v1_TaskInfo", "repeated")
    public data?: TaskInfo[] = []
}
export interface IMsgTaskResult {
    uid?: number|null
    taskID?: number|null
    result?: boolean|null
}
@protobuf.Type.d("kaeng_tss_thailand_kaeng_v1_MsgTaskResult")
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
export interface IMsgFirstCardInfo {
    value?: number|null
}
@protobuf.Type.d("kaeng_tss_thailand_kaeng_v1_MsgFirstCardInfo")
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
export interface IMsgFollowCardAble {
    uid?: number|null
    cards?: number[]
}
@protobuf.Type.d("kaeng_tss_thailand_kaeng_v1_MsgFollowCardAble")
export class MsgFollowCardAble extends protobuf.Message<IMsgFollowCardAble> {
    constructor(properties: Properties<IMsgFollowCardAble>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.cards) { this.cards = []; properties.cards.forEach((value, index)=>{this.cards[index] = properties.cards[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(3, "uint32", "repeated", [])
    public cards?: number[] = []
}
export interface IPlayerCards {
    uid?: number|null
    cards?: number[]
    cardValue?: number|null
}
@protobuf.Type.d("kaeng_tss_thailand_kaeng_v1_PlayerCards")
export class PlayerCards extends protobuf.Message<IPlayerCards> {
    constructor(properties: Properties<IPlayerCards>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.cards) { this.cards = []; properties.cards.forEach((value, index)=>{this.cards[index] = properties.cards[index]})}
            if (properties.cardValue) { this.cardValue = properties.cardValue }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "uint32", "repeated", [])
    public cards?: number[] = []
    @protobuf.Field.d(3, "int64", "optional", 0)
    public cardValue?: number|null = 0
}
export interface IFollowCardOpt {
    target?: IFollowCardInfo
}
@protobuf.Type.d("kaeng_tss_thailand_kaeng_v1_FollowCardOpt")
export class FollowCardOpt extends protobuf.Message<IFollowCardOpt> {
    constructor(properties: Properties<IFollowCardOpt>) {
        super(properties);
        if (properties) {
            if (properties.target) { this.target = FollowCardInfo.create(properties.target) as any }
        }
	}
    @protobuf.Field.d(1, "kaeng_tss_thailand_kaeng_v1_FollowCardInfo", "optional")
    public target?: FollowCardInfo|null
}
export interface IOptionList {
    uid?: number|null
    stage?: string|null
    draw_card_opt?: IDrawCardOpt
    follow_card_opt?: IFollowCardOpt
    show_card_opt?: IShowCardOpt
}
@protobuf.Type.d("kaeng_tss_thailand_kaeng_v1_OptionList")
export class OptionList extends protobuf.Message<IOptionList> {
    constructor(properties: Properties<IOptionList>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.stage) { this.stage = properties.stage }
            if (properties.draw_card_opt) { this.draw_card_opt = DrawCardOpt.create(properties.draw_card_opt) as any }
            if (properties.follow_card_opt) { this.follow_card_opt = FollowCardOpt.create(properties.follow_card_opt) as any }
            if (properties.show_card_opt) { this.show_card_opt = ShowCardOpt.create(properties.show_card_opt) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public stage?: string|null = ""
    @protobuf.Field.d(101, "kaeng_tss_thailand_kaeng_v1_DrawCardOpt", "optional")
    public draw_card_opt?: DrawCardOpt|null
    @protobuf.Field.d(102, "kaeng_tss_thailand_kaeng_v1_FollowCardOpt", "optional")
    public follow_card_opt?: FollowCardOpt|null
    @protobuf.Field.d(103, "kaeng_tss_thailand_kaeng_v1_ShowCardOpt", "optional")
    public show_card_opt?: ShowCardOpt|null
    @protobuf.OneOf.d("draw_card_opt","follow_card_opt","show_card_opt")
    public value?: ("draw_card_opt"|"follow_card_opt"|"show_card_opt")
}
export interface IMsgPlayCardInfo {
    uid?: number|null
    isNew?: boolean|null
    time?: number|null
    extraTime?: number|null
    opcode?: Opcode[]
    options?: IOptionList
}
@protobuf.Type.d("kaeng_tss_thailand_kaeng_v1_MsgPlayCardInfo")
export class MsgPlayCardInfo extends protobuf.Message<IMsgPlayCardInfo> {
    constructor(properties: Properties<IMsgPlayCardInfo>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.isNew) { this.isNew = properties.isNew }
            if (properties.time) { this.time = properties.time }
            if (properties.extraTime) { this.extraTime = properties.extraTime }
            if (properties.opcode) { this.opcode = []; properties.opcode.forEach((value, index)=>{this.opcode[index] = properties.opcode[index]})}
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
    public opcode?: Opcode[] = []
    @protobuf.Field.d(6, "kaeng_tss_thailand_kaeng_v1_OptionList", "optional")
    public options?: OptionList|null
}
export interface IMsgScoreChange {
    data?: IMsgUserScoreChange[]
}
@protobuf.Type.d("kaeng_tss_thailand_kaeng_v1_MsgScoreChange")
export class MsgScoreChange extends protobuf.Message<IMsgScoreChange> {
    constructor(properties: Properties<IMsgScoreChange>) {
        super(properties);
        if (properties) {
            if (properties.data) { this.data = []; properties.data.forEach((value, index)=>{this.data[index] = MsgUserScoreChange.create(properties.data[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "kaeng_tss_thailand_kaeng_v1_MsgUserScoreChange", "repeated")
    public data?: MsgUserScoreChange[] = []
}
export interface IMsgPlayResult {
    uid?: number|null
    opcode?: number|null
    opResult?: IOpResult
}
@protobuf.Type.d("kaeng_tss_thailand_kaeng_v1_MsgPlayResult")
export class MsgPlayResult extends protobuf.Message<IMsgPlayResult> {
    constructor(properties: Properties<IMsgPlayResult>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.opcode) { this.opcode = properties.opcode }
            if (properties.opResult) { this.opResult = OpResult.create(properties.opResult) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public opcode?: number|null = 0
    @protobuf.Field.d(3, "kaeng_tss_thailand_kaeng_v1_OpResult", "optional")
    public opResult?: OpResult|null
}
export interface IMultiOpInfo {
    data?: IOpInfo[]
}
@protobuf.Type.d("kaeng_tss_thailand_kaeng_v1_MultiOpInfo")
export class MultiOpInfo extends protobuf.Message<IMultiOpInfo> {
    constructor(properties: Properties<IMultiOpInfo>) {
        super(properties);
        if (properties) {
            if (properties.data) { this.data = []; properties.data.forEach((value, index)=>{this.data[index] = OpInfo.create(properties.data[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "kaeng_tss_thailand_kaeng_v1_OpInfo", "repeated")
    public data?: OpInfo[] = []
}
export interface IMsgShowCardResult {
    actionUser?: IPlayerCards
    otherUser?: IPlayerCards[]
}
@protobuf.Type.d("kaeng_tss_thailand_kaeng_v1_MsgShowCardResult")
export class MsgShowCardResult extends protobuf.Message<IMsgShowCardResult> {
    constructor(properties: Properties<IMsgShowCardResult>) {
        super(properties);
        if (properties) {
            if (properties.actionUser) { this.actionUser = PlayerCards.create(properties.actionUser) as any }
            if (properties.otherUser) { this.otherUser = []; properties.otherUser.forEach((value, index)=>{this.otherUser[index] = PlayerCards.create(properties.otherUser[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "kaeng_tss_thailand_kaeng_v1_PlayerCards", "optional")
    public actionUser?: PlayerCards|null
    @protobuf.Field.d(2, "kaeng_tss_thailand_kaeng_v1_PlayerCards", "repeated")
    public otherUser?: PlayerCards[] = []
}
export interface IIndirectlyShowCardScoreConfig {
    ActivelyShowCardSuccessScore?: number|null
    PassivelyShowCardSuccessScore?: number|null
    PassivelyShowCardFailScore?: number|null
}
@protobuf.Type.d("kaeng_tss_thailand_kaeng_v1_IndirectlyShowCardScoreConfig")
export class IndirectlyShowCardScoreConfig extends protobuf.Message<IIndirectlyShowCardScoreConfig> {
    constructor(properties: Properties<IIndirectlyShowCardScoreConfig>) {
        super(properties);
        if (properties) {
            if (properties.ActivelyShowCardSuccessScore) { this.ActivelyShowCardSuccessScore = properties.ActivelyShowCardSuccessScore }
            if (properties.PassivelyShowCardSuccessScore) { this.PassivelyShowCardSuccessScore = properties.PassivelyShowCardSuccessScore }
            if (properties.PassivelyShowCardFailScore) { this.PassivelyShowCardFailScore = properties.PassivelyShowCardFailScore }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public ActivelyShowCardSuccessScore?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public PassivelyShowCardSuccessScore?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public PassivelyShowCardFailScore?: number|null = 0
}
export interface IScoreConfig {
    BaseScore?: number|null
    FollowCardScore?: number|null
    ZiMoScore?: number|null
    directlyShowCardScore?: IDirectlyShowCardScoreConfig
    indirectlyShowCardScore?: IIndirectlyShowCardScoreConfig
    PointShotDirectlyScore?: number|null
    PointShotIndirectlyScore?: number|null
}
@protobuf.Type.d("kaeng_tss_thailand_kaeng_v1_ScoreConfig")
export class ScoreConfig extends protobuf.Message<IScoreConfig> {
    constructor(properties: Properties<IScoreConfig>) {
        super(properties);
        if (properties) {
            if (properties.BaseScore) { this.BaseScore = properties.BaseScore }
            if (properties.FollowCardScore) { this.FollowCardScore = properties.FollowCardScore }
            if (properties.ZiMoScore) { this.ZiMoScore = properties.ZiMoScore }
            if (properties.directlyShowCardScore) { this.directlyShowCardScore = DirectlyShowCardScoreConfig.create(properties.directlyShowCardScore) as any }
            if (properties.indirectlyShowCardScore) { this.indirectlyShowCardScore = IndirectlyShowCardScoreConfig.create(properties.indirectlyShowCardScore) as any }
            if (properties.PointShotDirectlyScore) { this.PointShotDirectlyScore = properties.PointShotDirectlyScore }
            if (properties.PointShotIndirectlyScore) { this.PointShotIndirectlyScore = properties.PointShotIndirectlyScore }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public BaseScore?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public FollowCardScore?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public ZiMoScore?: number|null = 0
    @protobuf.Field.d(4, "kaeng_tss_thailand_kaeng_v1_DirectlyShowCardScoreConfig", "optional")
    public directlyShowCardScore?: DirectlyShowCardScoreConfig|null
    @protobuf.Field.d(5, "kaeng_tss_thailand_kaeng_v1_IndirectlyShowCardScoreConfig", "optional")
    public indirectlyShowCardScore?: IndirectlyShowCardScoreConfig|null
    @protobuf.Field.d(7, "int64", "optional", 0)
    public PointShotDirectlyScore?: number|null = 0
    @protobuf.Field.d(8, "int64", "optional", 0)
    public PointShotIndirectlyScore?: number|null = 0
}
export interface ICardConfig {
    types?: ICardConfig_CardTypeItem[]
    compare?: string[]
    totalCards?: number[]
}
@protobuf.Type.d("kaeng_tss_thailand_kaeng_v1_CardConfig")
export class CardConfig extends protobuf.Message<ICardConfig> {
    constructor(properties: Properties<ICardConfig>) {
        super(properties);
        if (properties) {
            if (properties.types) { this.types = []; properties.types.forEach((value, index)=>{this.types[index] = CardConfig_CardTypeItem.create(properties.types[index]) as any})}
            if (properties.compare) { this.compare = []; properties.compare.forEach((value, index)=>{this.compare[index] = properties.compare[index]})}
            if (properties.totalCards) { this.totalCards = []; properties.totalCards.forEach((value, index)=>{this.totalCards[index] = properties.totalCards[index]})}
        }
	}
    @protobuf.Field.d(1, "kaeng_tss_thailand_kaeng_v1_CardConfig_CardTypeItem", "repeated")
    public types?: CardConfig_CardTypeItem[] = []
    @protobuf.Field.d(2, "string", "repeated", [])
    public compare?: string[] = []
    @protobuf.Field.d(3, "uint32", "repeated", [])
    public totalCards?: number[] = []
}
export interface IUserSpecialCard {
    uid?: number|null
    cardType?: ScoreType|null
}
@protobuf.Type.d("kaeng_tss_thailand_kaeng_v1_UserSpecialCard")
export class UserSpecialCard extends protobuf.Message<IUserSpecialCard> {
    constructor(properties: Properties<IUserSpecialCard>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.cardType) { this.cardType = properties.cardType }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, ScoreType, "optional", ScoreType.ScoreTypeUnknown)
    public cardType?: ScoreType|null = ScoreType.ScoreTypeUnknown
}
export interface IMsgSpecialCardInfo {
    userSpecialCards?: IUserSpecialCard[]
}
@protobuf.Type.d("kaeng_tss_thailand_kaeng_v1_MsgSpecialCardInfo")
export class MsgSpecialCardInfo extends protobuf.Message<IMsgSpecialCardInfo> {
    constructor(properties: Properties<IMsgSpecialCardInfo>) {
        super(properties);
        if (properties) {
            if (properties.userSpecialCards) { this.userSpecialCards = []; properties.userSpecialCards.forEach((value, index)=>{this.userSpecialCards[index] = UserSpecialCard.create(properties.userSpecialCards[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "kaeng_tss_thailand_kaeng_v1_UserSpecialCard", "repeated")
    public userSpecialCards?: UserSpecialCard[] = []
}
export interface IMsgTableInfo {
    tid?: number|null
    tKey?: string|null
    users?: IMsgUserInfo[]
    playOption?: number|null
    stage?: string|null
    opResults?: IOpResult[]
    playCards?: number[]
    scoreConfig?: IScoreConfig
    tasks?: ITaskInfo[]
    cardConfig?: ICardConfig
    syncOps?: IOpResult[]
}
@protobuf.Type.d("kaeng_tss_thailand_kaeng_v1_MsgTableInfo")
export class MsgTableInfo extends protobuf.Message<IMsgTableInfo> {
    constructor(properties: Properties<IMsgTableInfo>) {
        super(properties);
        if (properties) {
            if (properties.tid) { this.tid = properties.tid }
            if (properties.tKey) { this.tKey = properties.tKey }
            if (properties.users) { this.users = []; properties.users.forEach((value, index)=>{this.users[index] = MsgUserInfo.create(properties.users[index]) as any})}
            if (properties.playOption) { this.playOption = properties.playOption }
            if (properties.stage) { this.stage = properties.stage }
            if (properties.opResults) { this.opResults = []; properties.opResults.forEach((value, index)=>{this.opResults[index] = OpResult.create(properties.opResults[index]) as any})}
            if (properties.playCards) { this.playCards = []; properties.playCards.forEach((value, index)=>{this.playCards[index] = properties.playCards[index]})}
            if (properties.scoreConfig) { this.scoreConfig = ScoreConfig.create(properties.scoreConfig) as any }
            if (properties.tasks) { this.tasks = []; properties.tasks.forEach((value, index)=>{this.tasks[index] = TaskInfo.create(properties.tasks[index]) as any})}
            if (properties.cardConfig) { this.cardConfig = CardConfig.create(properties.cardConfig) as any }
            if (properties.syncOps) { this.syncOps = []; properties.syncOps.forEach((value, index)=>{this.syncOps[index] = OpResult.create(properties.syncOps[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "uint64", "optional", 0)
    public tid?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public tKey?: string|null = ""
    @protobuf.Field.d(3, "kaeng_tss_thailand_kaeng_v1_MsgUserInfo", "repeated")
    public users?: MsgUserInfo[] = []
    @protobuf.Field.d(4, "int32", "optional", 0)
    public playOption?: number|null = 0
    @protobuf.Field.d(6, "string", "optional", )
    public stage?: string|null = ""
    @protobuf.Field.d(9, "kaeng_tss_thailand_kaeng_v1_OpResult", "repeated")
    public opResults?: OpResult[] = []
    @protobuf.Field.d(8, "uint32", "repeated", [])
    public playCards?: number[] = []
    @protobuf.Field.d(10, "kaeng_tss_thailand_kaeng_v1_ScoreConfig", "optional")
    public scoreConfig?: ScoreConfig|null
    @protobuf.Field.d(16, "kaeng_tss_thailand_kaeng_v1_TaskInfo", "repeated")
    public tasks?: TaskInfo[] = []
    @protobuf.Field.d(17, "kaeng_tss_thailand_kaeng_v1_CardConfig", "optional")
    public cardConfig?: CardConfig|null
    @protobuf.Field.d(18, "kaeng_tss_thailand_kaeng_v1_OpResult", "repeated")
    public syncOps?: OpResult[] = []
}
class $KaengTable extends RpcService {
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
    NotifySpecialCardType(data: Uint8Array, params: RpcParams) : {msg: IMsgSpecialCardInfo, eventID?: number} {
        let msg = MsgSpecialCardInfo.decode(data)
        return {msg: msg, eventID: 2002}
    }
    @RpcDecorator({eventID:2003, extend:"NotifyPlayer"})
    NotifyPlayStart(data: Uint8Array, params: RpcParams) : {msg: IMsgPlayCardInfo, eventID?: number} {
        let msg = MsgPlayCardInfo.decode(data)
        return {msg: msg, eventID: 2003}
    }
    @RpcDecorator({eventID:2005, extend:"NotifyPlayer"})
    NotifyGameResult(data: Uint8Array, params: RpcParams) : {msg: IMsgGameResult, eventID?: number} {
        let msg = MsgGameResult.decode(data)
        return {msg: msg, eventID: 2005}
    }
    @RpcDecorator({eventID:2006, extend:"NotifyPlayer"})
    NotifyPlayResult(data: Uint8Array, params: RpcParams) : {msg: IMsgPlayResult, eventID?: number} {
        let msg = MsgPlayResult.decode(data)
        return {msg: msg, eventID: 2006}
    }
    @RpcDecorator({eventID:2007, extend:"NotifyPlayer"})
    NotifyShowCard(data: Uint8Array, params: RpcParams) : {msg: IMsgShowCardResult, eventID?: number} {
        let msg = MsgShowCardResult.decode(data)
        return {msg: msg, eventID: 2007}
    }
    @RpcDecorator({eventID:2104, extend:"NotifyPlayer"})
    NotifyBadRequest(data: Uint8Array, params: RpcParams) : {msg: IMsgBadRequest, eventID?: number} {
        let msg = MsgBadRequest.decode(data)
        return {msg: msg, eventID: 2104}
    }
    @RpcDecorator({eventID:2017, extend:"NotifyPlayer"})
    NotifyScoreChange(data: Uint8Array, params: RpcParams) : {msg: IMsgScoreChange, eventID?: number} {
        let msg = MsgScoreChange.decode(data)
        return {msg: msg, eventID: 2017}
    }
}
export const KaengTable = new $KaengTable({
    name: "tss.thailand.kaeng.v1",
})
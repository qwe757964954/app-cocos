import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  Void as mahjong_base_Void,IVoid as base_IVoid ,  } from "idl/base/base"
export enum Code {  
    CODE_OK = 0,  
    CODE_NO = 1,
}
export interface IResp {
    resp?: string|null
}
@protobuf.Type.d("mahjong_tss_mahjong_extendtable_v4_Resp")
export class Resp extends protobuf.Message<IResp> {
    constructor(properties: Properties<IResp>) {
        super(properties);
        if (properties) {
            if (properties.resp) { this.resp = properties.resp }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public resp?: string|null = ""
}
export interface IMsgTableStart {
    matchInfo?: Uint8Array
    tableInfo?: Uint8Array
}
@protobuf.Type.d("mahjong_tss_mahjong_extendtable_v4_MsgTableStart")
export class MsgTableStart extends protobuf.Message<IMsgTableStart> {
    constructor(properties: Properties<IMsgTableStart>) {
        super(properties);
        if (properties) {
            if (properties.matchInfo) { this.matchInfo = properties.matchInfo }
            if (properties.tableInfo) { this.tableInfo = properties.tableInfo }
        }
	}
    @protobuf.Field.d(1, "bytes", "optional", [])
    public matchInfo?: Uint8Array
    @protobuf.Field.d(2, "bytes", "optional", [])
    public tableInfo?: Uint8Array
}
export interface ITingItem {
    card?: number|null
    fan?: number|null
}
@protobuf.Type.d("mahjong_tss_mahjong_extendtable_v4_TingItem")
export class TingItem extends protobuf.Message<ITingItem> {
    constructor(properties: Properties<ITingItem>) {
        super(properties);
        if (properties) {
            if (properties.card) { this.card = properties.card }
            if (properties.fan) { this.fan = properties.fan }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public card?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public fan?: number|null = 0
}
export interface IHuInfo {
    opCode?: number|null
    opCard?: number|null
    cardUid?: number|null
    index?: number|null
}
@protobuf.Type.d("mahjong_tss_mahjong_extendtable_v4_HuInfo")
export class HuInfo extends protobuf.Message<IHuInfo> {
    constructor(properties: Properties<IHuInfo>) {
        super(properties);
        if (properties) {
            if (properties.opCode) { this.opCode = properties.opCode }
            if (properties.opCard) { this.opCard = properties.opCard }
            if (properties.cardUid) { this.cardUid = properties.cardUid }
            if (properties.index) { this.index = properties.index }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public opCode?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public opCard?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public cardUid?: number|null = 0
    @protobuf.Field.d(4, "int32", "optional", 0)
    public index?: number|null = 0
}
export interface ITingData {
    outCard?: number|null
    tingList?: ITingItem[]
}
@protobuf.Type.d("mahjong_tss_mahjong_extendtable_v4_TingData")
export class TingData extends protobuf.Message<ITingData> {
    constructor(properties: Properties<ITingData>) {
        super(properties);
        if (properties) {
            if (properties.outCard) { this.outCard = properties.outCard }
            if (properties.tingList) { this.tingList = []; properties.tingList.forEach((value, index)=>{this.tingList[index] = TingItem.create(properties.tingList[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public outCard?: number|null = 0
    @protobuf.Field.d(2, "mahjong_tss_mahjong_extendtable_v4_TingItem", "repeated")
    public tingList?: TingItem[] = []
}
export interface IHandCard {
    uid?: number|null
    cards?: number[]
    opGroups?: IOperateData[]
    lastCard?: number|null
}
@protobuf.Type.d("mahjong_tss_mahjong_extendtable_v4_HandCard")
export class HandCard extends protobuf.Message<IHandCard> {
    constructor(properties: Properties<IHandCard>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.cards) { this.cards = []; properties.cards.forEach((value, index)=>{this.cards[index] = properties.cards[index]})}
            if (properties.opGroups) { this.opGroups = []; properties.opGroups.forEach((value, index)=>{this.opGroups[index] = OperateData.create(properties.opGroups[index]) as any})}
            if (properties.lastCard) { this.lastCard = properties.lastCard }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int32", "repeated", [])
    public cards?: number[] = []
    @protobuf.Field.d(3, "mahjong_tss_mahjong_extendtable_v4_OperateData", "repeated")
    public opGroups?: OperateData[] = []
    @protobuf.Field.d(4, "int32", "optional", 0)
    public lastCard?: number|null = 0
}
export interface IDiceInfo {
    uid?: number|null
    dices?: number[]
    totalPoint?: number|null
}
@protobuf.Type.d("mahjong_tss_mahjong_extendtable_v4_DiceInfo")
export class DiceInfo extends protobuf.Message<IDiceInfo> {
    constructor(properties: Properties<IDiceInfo>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.dices) { this.dices = []; properties.dices.forEach((value, index)=>{this.dices[index] = properties.dices[index]})}
            if (properties.totalPoint) { this.totalPoint = properties.totalPoint }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int32", "repeated", [])
    public dices?: number[] = []
    @protobuf.Field.d(3, "int32", "optional", 0)
    public totalPoint?: number|null = 0
}
export interface IFixBanker {
    bankerId?: number|null
}
@protobuf.Type.d("mahjong_tss_mahjong_extendtable_v4_FixBanker")
export class FixBanker extends protobuf.Message<IFixBanker> {
    constructor(properties: Properties<IFixBanker>) {
        super(properties);
        if (properties) {
            if (properties.bankerId) { this.bankerId = properties.bankerId }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public bankerId?: number|null = 0
}
export interface IDealCardItem {
    uid?: number|null
    cards?: number[]
    count?: number|null
}
@protobuf.Type.d("mahjong_tss_mahjong_extendtable_v4_DealCardItem")
export class DealCardItem extends protobuf.Message<IDealCardItem> {
    constructor(properties: Properties<IDealCardItem>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.cards) { this.cards = []; properties.cards.forEach((value, index)=>{this.cards[index] = properties.cards[index]})}
            if (properties.count) { this.count = properties.count }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int32", "repeated", [])
    public cards?: number[] = []
    @protobuf.Field.d(3, "int32", "optional", 0)
    public count?: number|null = 0
}
export interface IDealCardInfo {
    dealCards?: IDealCardItem[]
    wallCnt?: number|null
}
@protobuf.Type.d("mahjong_tss_mahjong_extendtable_v4_DealCardInfo")
export class DealCardInfo extends protobuf.Message<IDealCardInfo> {
    constructor(properties: Properties<IDealCardInfo>) {
        super(properties);
        if (properties) {
            if (properties.dealCards) { this.dealCards = []; properties.dealCards.forEach((value, index)=>{this.dealCards[index] = DealCardItem.create(properties.dealCards[index]) as any})}
            if (properties.wallCnt) { this.wallCnt = properties.wallCnt }
        }
	}
    @protobuf.Field.d(1, "mahjong_tss_mahjong_extendtable_v4_DealCardItem", "repeated")
    public dealCards?: DealCardItem[] = []
    @protobuf.Field.d(2, "int32", "optional", 0)
    public wallCnt?: number|null = 0
}
export interface IOperateData {
    opCode?: number|null
    opCard?: number|null
    opCards?: number[]
    cardUid?: number|null
}
@protobuf.Type.d("mahjong_tss_mahjong_extendtable_v4_OperateData")
export class OperateData extends protobuf.Message<IOperateData> {
    constructor(properties: Properties<IOperateData>) {
        super(properties);
        if (properties) {
            if (properties.opCode) { this.opCode = properties.opCode }
            if (properties.opCard) { this.opCard = properties.opCard }
            if (properties.opCards) { this.opCards = []; properties.opCards.forEach((value, index)=>{this.opCards[index] = properties.opCards[index]})}
            if (properties.cardUid) { this.cardUid = properties.cardUid }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public opCode?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public opCard?: number|null = 0
    @protobuf.Field.d(3, "int32", "repeated", [])
    public opCards?: number[] = []
    @protobuf.Field.d(4, "int64", "optional", 0)
    public cardUid?: number|null = 0
}
export interface ICardGroup {
    cards?: number[]
}
@protobuf.Type.d("mahjong_tss_mahjong_extendtable_v4_CardGroup")
export class CardGroup extends protobuf.Message<ICardGroup> {
    constructor(properties: Properties<ICardGroup>) {
        super(properties);
        if (properties) {
            if (properties.cards) { this.cards = []; properties.cards.forEach((value, index)=>{this.cards[index] = properties.cards[index]})}
        }
	}
    @protobuf.Field.d(1, "int32", "repeated", [])
    public cards?: number[] = []
}
export interface IOperateInfo {
    opCode?: number|null
    groups?: ICardGroup[]
}
@protobuf.Type.d("mahjong_tss_mahjong_extendtable_v4_OperateInfo")
export class OperateInfo extends protobuf.Message<IOperateInfo> {
    constructor(properties: Properties<IOperateInfo>) {
        super(properties);
        if (properties) {
            if (properties.opCode) { this.opCode = properties.opCode }
            if (properties.groups) { this.groups = []; properties.groups.forEach((value, index)=>{this.groups[index] = CardGroup.create(properties.groups[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public opCode?: number|null = 0
    @protobuf.Field.d(2, "mahjong_tss_mahjong_extendtable_v4_CardGroup", "repeated")
    public groups?: CardGroup[] = []
}
export interface ITingInfo {
    isTing?: boolean|null
    tingCode?: number|null
    tingList?: ITingItem[]
}
@protobuf.Type.d("mahjong_tss_mahjong_extendtable_v4_TingInfo")
export class TingInfo extends protobuf.Message<ITingInfo> {
    constructor(properties: Properties<ITingInfo>) {
        super(properties);
        if (properties) {
            if (properties.isTing) { this.isTing = properties.isTing }
            if (properties.tingCode) { this.tingCode = properties.tingCode }
            if (properties.tingList) { this.tingList = []; properties.tingList.forEach((value, index)=>{this.tingList[index] = TingItem.create(properties.tingList[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "bool", "optional", false)
    public isTing?: boolean|null = false
    @protobuf.Field.d(2, "int32", "optional", 0)
    public tingCode?: number|null = 0
    @protobuf.Field.d(3, "mahjong_tss_mahjong_extendtable_v4_TingItem", "repeated")
    public tingList?: TingItem[] = []
}
export interface IFzItem {
    uid?: number|null
    card?: number|null
}
@protobuf.Type.d("mahjong_tss_mahjong_extendtable_v4_FzItem")
export class FzItem extends protobuf.Message<IFzItem> {
    constructor(properties: Properties<IFzItem>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.card) { this.card = properties.card }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public card?: number|null = 0
}
export interface IOperateResultInfo {
    uid?: number|null
    cardUid?: number|null
    opData?: IOperateData
    handCnt?: number|null
    wallCnt?: number|null
    tingList?: ITingItem[]
    fzData?: IFzItem[]
}
@protobuf.Type.d("mahjong_tss_mahjong_extendtable_v4_OperateResultInfo")
export class OperateResultInfo extends protobuf.Message<IOperateResultInfo> {
    constructor(properties: Properties<IOperateResultInfo>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.cardUid) { this.cardUid = properties.cardUid }
            if (properties.opData) { this.opData = OperateData.create(properties.opData) as any }
            if (properties.handCnt) { this.handCnt = properties.handCnt }
            if (properties.wallCnt) { this.wallCnt = properties.wallCnt }
            if (properties.tingList) { this.tingList = []; properties.tingList.forEach((value, index)=>{this.tingList[index] = TingItem.create(properties.tingList[index]) as any})}
            if (properties.fzData) { this.fzData = []; properties.fzData.forEach((value, index)=>{this.fzData[index] = FzItem.create(properties.fzData[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public cardUid?: number|null = 0
    @protobuf.Field.d(3, "mahjong_tss_mahjong_extendtable_v4_OperateData", "optional")
    public opData?: OperateData|null
    @protobuf.Field.d(4, "int32", "optional", 0)
    public handCnt?: number|null = 0
    @protobuf.Field.d(5, "int32", "optional", 0)
    public wallCnt?: number|null = 0
    @protobuf.Field.d(6, "mahjong_tss_mahjong_extendtable_v4_TingItem", "repeated")
    public tingList?: TingItem[] = []
    @protobuf.Field.d(7, "mahjong_tss_mahjong_extendtable_v4_FzItem", "repeated")
    public fzData?: FzItem[] = []
}
export interface IOperateWaiting {
    uid?: number|null
}
@protobuf.Type.d("mahjong_tss_mahjong_extendtable_v4_OperateWaiting")
export class OperateWaiting extends protobuf.Message<IOperateWaiting> {
    constructor(properties: Properties<IOperateWaiting>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IOperateOption {
    uid?: number|null
    cardUid?: number|null
    opInfos?: IOperateInfo[]
    time?: number|null
    tingDatas?: ITingData[]
    extTime?: number|null
}
@protobuf.Type.d("mahjong_tss_mahjong_extendtable_v4_OperateOption")
export class OperateOption extends protobuf.Message<IOperateOption> {
    constructor(properties: Properties<IOperateOption>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.cardUid) { this.cardUid = properties.cardUid }
            if (properties.opInfos) { this.opInfos = []; properties.opInfos.forEach((value, index)=>{this.opInfos[index] = OperateInfo.create(properties.opInfos[index]) as any})}
            if (properties.time) { this.time = properties.time }
            if (properties.tingDatas) { this.tingDatas = []; properties.tingDatas.forEach((value, index)=>{this.tingDatas[index] = TingData.create(properties.tingDatas[index]) as any})}
            if (properties.extTime) { this.extTime = properties.extTime }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public cardUid?: number|null = 0
    @protobuf.Field.d(3, "mahjong_tss_mahjong_extendtable_v4_OperateInfo", "repeated")
    public opInfos?: OperateInfo[] = []
    @protobuf.Field.d(4, "int64", "optional", 0)
    public time?: number|null = 0
    @protobuf.Field.d(5, "mahjong_tss_mahjong_extendtable_v4_TingData", "repeated")
    public tingDatas?: TingData[] = []
    @protobuf.Field.d(6, "int64", "optional", 0)
    public extTime?: number|null = 0
}
export interface IHandCards {
    handCards?: IHandCard[]
    baoCards?: number[]
}
@protobuf.Type.d("mahjong_tss_mahjong_extendtable_v4_HandCards")
export class HandCards extends protobuf.Message<IHandCards> {
    constructor(properties: Properties<IHandCards>) {
        super(properties);
        if (properties) {
            if (properties.handCards) { this.handCards = []; properties.handCards.forEach((value, index)=>{this.handCards[index] = HandCard.create(properties.handCards[index]) as any})}
            if (properties.baoCards) { this.baoCards = []; properties.baoCards.forEach((value, index)=>{this.baoCards[index] = properties.baoCards[index]})}
        }
	}
    @protobuf.Field.d(1, "mahjong_tss_mahjong_extendtable_v4_HandCard", "repeated")
    public handCards?: HandCard[] = []
    @protobuf.Field.d(2, "int32", "repeated", [])
    public baoCards?: number[] = []
}
export interface IGameStart {
    msg?: string|null
}
@protobuf.Type.d("mahjong_tss_mahjong_extendtable_v4_GameStart")
export class GameStart extends protobuf.Message<IGameStart> {
    constructor(properties: Properties<IGameStart>) {
        super(properties);
        if (properties) {
            if (properties.msg) { this.msg = properties.msg }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public msg?: string|null = ""
}
export interface IGameEnd {
    msg?: string|null
}
@protobuf.Type.d("mahjong_tss_mahjong_extendtable_v4_GameEnd")
export class GameEnd extends protobuf.Message<IGameEnd> {
    constructor(properties: Properties<IGameEnd>) {
        super(properties);
        if (properties) {
            if (properties.msg) { this.msg = properties.msg }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public msg?: string|null = ""
}
export interface IUser {
    seat?: number|null
    uid?: number|null
    handCard?: IHandCard
    outCards?: number[]
    opts?: IOperateOption
    isTrust?: boolean|null
    tingInfo?: ITingInfo
    huInfos?: IHuInfo[]
    exposeCards?: number[]
}
@protobuf.Type.d("mahjong_tss_mahjong_extendtable_v4_User")
export class User extends protobuf.Message<IUser> {
    constructor(properties: Properties<IUser>) {
        super(properties);
        if (properties) {
            if (properties.seat) { this.seat = properties.seat }
            if (properties.uid) { this.uid = properties.uid }
            if (properties.handCard) { this.handCard = HandCard.create(properties.handCard) as any }
            if (properties.outCards) { this.outCards = []; properties.outCards.forEach((value, index)=>{this.outCards[index] = properties.outCards[index]})}
            if (properties.opts) { this.opts = OperateOption.create(properties.opts) as any }
            if (properties.isTrust) { this.isTrust = properties.isTrust }
            if (properties.tingInfo) { this.tingInfo = TingInfo.create(properties.tingInfo) as any }
            if (properties.huInfos) { this.huInfos = []; properties.huInfos.forEach((value, index)=>{this.huInfos[index] = HuInfo.create(properties.huInfos[index]) as any})}
            if (properties.exposeCards) { this.exposeCards = []; properties.exposeCards.forEach((value, index)=>{this.exposeCards[index] = properties.exposeCards[index]})}
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public seat?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(3, "mahjong_tss_mahjong_extendtable_v4_HandCard", "optional")
    public handCard?: HandCard|null
    @protobuf.Field.d(4, "int32", "repeated", [])
    public outCards?: number[] = []
    @protobuf.Field.d(5, "mahjong_tss_mahjong_extendtable_v4_OperateOption", "optional")
    public opts?: OperateOption|null
    @protobuf.Field.d(6, "bool", "optional", false)
    public isTrust?: boolean|null = false
    @protobuf.Field.d(7, "mahjong_tss_mahjong_extendtable_v4_TingInfo", "optional")
    public tingInfo?: TingInfo|null
    @protobuf.Field.d(8, "mahjong_tss_mahjong_extendtable_v4_HuInfo", "repeated")
    public huInfos?: HuInfo[] = []
    @protobuf.Field.d(9, "int32", "repeated", [])
    public exposeCards?: number[] = []
}
export interface IBetData {
    type?: number|null
    uid?: number|null
    opt?: IBetOption
    time?: number|null
    extTime?: number|null
}
@protobuf.Type.d("mahjong_tss_mahjong_extendtable_v4_BetData")
export class BetData extends protobuf.Message<IBetData> {
    constructor(properties: Properties<IBetData>) {
        super(properties);
        if (properties) {
            if (properties.type) { this.type = properties.type }
            if (properties.uid) { this.uid = properties.uid }
            if (properties.opt) { this.opt = BetOption.create(properties.opt) as any }
            if (properties.time) { this.time = properties.time }
            if (properties.extTime) { this.extTime = properties.extTime }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public type?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(3, "mahjong_tss_mahjong_extendtable_v4_BetOption", "optional")
    public opt?: BetOption|null
    @protobuf.Field.d(4, "int32", "optional", 0)
    public time?: number|null = 0
    @protobuf.Field.d(5, "int32", "optional", 0)
    public extTime?: number|null = 0
}
export interface IGameSettle {
    tableSettle?: Uint8Array
}
@protobuf.Type.d("mahjong_tss_mahjong_extendtable_v4_GameSettle")
export class GameSettle extends protobuf.Message<IGameSettle> {
    constructor(properties: Properties<IGameSettle>) {
        super(properties);
        if (properties) {
            if (properties.tableSettle) { this.tableSettle = properties.tableSettle }
        }
	}
    @protobuf.Field.d(1, "bytes", "optional", [])
    public tableSettle?: Uint8Array
}
export interface IBetOption {
    tgUid?: number|null
    options?: number[]
    option?: number|null
}
@protobuf.Type.d("mahjong_tss_mahjong_extendtable_v4_BetOption")
export class BetOption extends protobuf.Message<IBetOption> {
    constructor(properties: Properties<IBetOption>) {
        super(properties);
        if (properties) {
            if (properties.tgUid) { this.tgUid = properties.tgUid }
            if (properties.options) { this.options = []; properties.options.forEach((value, index)=>{this.options[index] = properties.options[index]})}
            if (properties.option) { this.option = properties.option }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public tgUid?: number|null = 0
    @protobuf.Field.d(2, "int32", "repeated", [])
    public options?: number[] = []
    @protobuf.Field.d(3, "int32", "optional", 0)
    public option?: number|null = 0
}
export interface IChangeCardData {
    type?: number|null
    uid?: number|null
    time?: number|null
    extTime?: number|null
    count?: number|null
    cards?: number[]
    state?: number|null
}
@protobuf.Type.d("mahjong_tss_mahjong_extendtable_v4_ChangeCardData")
export class ChangeCardData extends protobuf.Message<IChangeCardData> {
    constructor(properties: Properties<IChangeCardData>) {
        super(properties);
        if (properties) {
            if (properties.type) { this.type = properties.type }
            if (properties.uid) { this.uid = properties.uid }
            if (properties.time) { this.time = properties.time }
            if (properties.extTime) { this.extTime = properties.extTime }
            if (properties.count) { this.count = properties.count }
            if (properties.cards) { this.cards = []; properties.cards.forEach((value, index)=>{this.cards[index] = properties.cards[index]})}
            if (properties.state) { this.state = properties.state }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public type?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(3, "int32", "optional", 0)
    public time?: number|null = 0
    @protobuf.Field.d(4, "int32", "optional", 0)
    public extTime?: number|null = 0
    @protobuf.Field.d(5, "int32", "optional", 0)
    public count?: number|null = 0
    @protobuf.Field.d(6, "int32", "repeated", [])
    public cards?: number[] = []
    @protobuf.Field.d(7, "int32", "optional", 0)
    public state?: number|null = 0
}
export interface IBetEnd {
    betDatas?: IBetData[]
}
@protobuf.Type.d("mahjong_tss_mahjong_extendtable_v4_BetEnd")
export class BetEnd extends protobuf.Message<IBetEnd> {
    constructor(properties: Properties<IBetEnd>) {
        super(properties);
        if (properties) {
            if (properties.betDatas) { this.betDatas = []; properties.betDatas.forEach((value, index)=>{this.betDatas[index] = BetData.create(properties.betDatas[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "mahjong_tss_mahjong_extendtable_v4_BetData", "repeated")
    public betDatas?: BetData[] = []
}
export interface IDingQueData {
    type?: number|null
    uid?: number|null
    time?: number|null
    extTime?: number|null
    result?: number|null
    options?: number[]
    state?: number|null
}
@protobuf.Type.d("mahjong_tss_mahjong_extendtable_v4_DingQueData")
export class DingQueData extends protobuf.Message<IDingQueData> {
    constructor(properties: Properties<IDingQueData>) {
        super(properties);
        if (properties) {
            if (properties.type) { this.type = properties.type }
            if (properties.uid) { this.uid = properties.uid }
            if (properties.time) { this.time = properties.time }
            if (properties.extTime) { this.extTime = properties.extTime }
            if (properties.result) { this.result = properties.result }
            if (properties.options) { this.options = []; properties.options.forEach((value, index)=>{this.options[index] = properties.options[index]})}
            if (properties.state) { this.state = properties.state }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public type?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(3, "int32", "optional", 0)
    public time?: number|null = 0
    @protobuf.Field.d(4, "int32", "optional", 0)
    public extTime?: number|null = 0
    @protobuf.Field.d(5, "int32", "optional", 0)
    public result?: number|null = 0
    @protobuf.Field.d(6, "int32", "repeated", [])
    public options?: number[] = []
    @protobuf.Field.d(7, "int32", "optional", 0)
    public state?: number|null = 0
}
export interface IChangeCardEnd {
    ccDatas?: IChangeCardData[]
    offset?: number|null
}
@protobuf.Type.d("mahjong_tss_mahjong_extendtable_v4_ChangeCardEnd")
export class ChangeCardEnd extends protobuf.Message<IChangeCardEnd> {
    constructor(properties: Properties<IChangeCardEnd>) {
        super(properties);
        if (properties) {
            if (properties.ccDatas) { this.ccDatas = []; properties.ccDatas.forEach((value, index)=>{this.ccDatas[index] = ChangeCardData.create(properties.ccDatas[index]) as any})}
            if (properties.offset) { this.offset = properties.offset }
        }
	}
    @protobuf.Field.d(1, "mahjong_tss_mahjong_extendtable_v4_ChangeCardData", "repeated")
    public ccDatas?: ChangeCardData[] = []
    @protobuf.Field.d(2, "int32", "optional", 0)
    public offset?: number|null = 0
}
export interface IDingLaiZiData {
    fanCard?: number|null
    lzCards?: number[]
    wallCnt?: number|null
    isFoldCard?: boolean|null
}
@protobuf.Type.d("mahjong_tss_mahjong_extendtable_v4_DingLaiZiData")
export class DingLaiZiData extends protobuf.Message<IDingLaiZiData> {
    constructor(properties: Properties<IDingLaiZiData>) {
        super(properties);
        if (properties) {
            if (properties.fanCard) { this.fanCard = properties.fanCard }
            if (properties.lzCards) { this.lzCards = []; properties.lzCards.forEach((value, index)=>{this.lzCards[index] = properties.lzCards[index]})}
            if (properties.wallCnt) { this.wallCnt = properties.wallCnt }
            if (properties.isFoldCard) { this.isFoldCard = properties.isFoldCard }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public fanCard?: number|null = 0
    @protobuf.Field.d(2, "int32", "repeated", [])
    public lzCards?: number[] = []
    @protobuf.Field.d(3, "int32", "optional", 0)
    public wallCnt?: number|null = 0
    @protobuf.Field.d(4, "bool", "optional", false)
    public isFoldCard?: boolean|null = false
}
export interface IDingQueEnd {
    dqDatas?: IDingQueData[]
}
@protobuf.Type.d("mahjong_tss_mahjong_extendtable_v4_DingQueEnd")
export class DingQueEnd extends protobuf.Message<IDingQueEnd> {
    constructor(properties: Properties<IDingQueEnd>) {
        super(properties);
        if (properties) {
            if (properties.dqDatas) { this.dqDatas = []; properties.dqDatas.forEach((value, index)=>{this.dqDatas[index] = DingQueData.create(properties.dqDatas[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "mahjong_tss_mahjong_extendtable_v4_DingQueData", "repeated")
    public dqDatas?: DingQueData[] = []
}
export interface IUpdateOpData {
    uid?: number|null
    opData?: IOperateData
    oldOpData?: IOperateData
}
@protobuf.Type.d("mahjong_tss_mahjong_extendtable_v4_UpdateOpData")
export class UpdateOpData extends protobuf.Message<IUpdateOpData> {
    constructor(properties: Properties<IUpdateOpData>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.opData) { this.opData = OperateData.create(properties.opData) as any }
            if (properties.oldOpData) { this.oldOpData = OperateData.create(properties.oldOpData) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "mahjong_tss_mahjong_extendtable_v4_OperateData", "optional")
    public opData?: OperateData|null
    @protobuf.Field.d(3, "mahjong_tss_mahjong_extendtable_v4_OperateData", "optional")
    public oldOpData?: OperateData|null
}
export interface ITable {
    tid?: number|null
    tkey?: string|null
    users?: IUser[]
    state?: number|null
    bankerId?: number|null
    wallCnt?: number|null
    baoCards?: number[]
    preOpUid?: number|null
    totalOpTime?: number|null
    betDatas?: IBetData[]
    changeCardDatas?: IChangeCardData[]
    dingQueDatas?: IDingQueData[]
    laiZiData?: IDingLaiZiData
}
@protobuf.Type.d("mahjong_tss_mahjong_extendtable_v4_Table")
export class Table extends protobuf.Message<ITable> {
    constructor(properties: Properties<ITable>) {
        super(properties);
        if (properties) {
            if (properties.tid) { this.tid = properties.tid }
            if (properties.tkey) { this.tkey = properties.tkey }
            if (properties.users) { this.users = []; properties.users.forEach((value, index)=>{this.users[index] = User.create(properties.users[index]) as any})}
            if (properties.state) { this.state = properties.state }
            if (properties.bankerId) { this.bankerId = properties.bankerId }
            if (properties.wallCnt) { this.wallCnt = properties.wallCnt }
            if (properties.baoCards) { this.baoCards = []; properties.baoCards.forEach((value, index)=>{this.baoCards[index] = properties.baoCards[index]})}
            if (properties.preOpUid) { this.preOpUid = properties.preOpUid }
            if (properties.totalOpTime) { this.totalOpTime = properties.totalOpTime }
            if (properties.betDatas) { this.betDatas = []; properties.betDatas.forEach((value, index)=>{this.betDatas[index] = BetData.create(properties.betDatas[index]) as any})}
            if (properties.changeCardDatas) { this.changeCardDatas = []; properties.changeCardDatas.forEach((value, index)=>{this.changeCardDatas[index] = ChangeCardData.create(properties.changeCardDatas[index]) as any})}
            if (properties.dingQueDatas) { this.dingQueDatas = []; properties.dingQueDatas.forEach((value, index)=>{this.dingQueDatas[index] = DingQueData.create(properties.dingQueDatas[index]) as any})}
            if (properties.laiZiData) { this.laiZiData = DingLaiZiData.create(properties.laiZiData) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public tid?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public tkey?: string|null = ""
    @protobuf.Field.d(3, "mahjong_tss_mahjong_extendtable_v4_User", "repeated")
    public users?: User[] = []
    @protobuf.Field.d(4, "int32", "optional", 0)
    public state?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public bankerId?: number|null = 0
    @protobuf.Field.d(6, "int32", "optional", 0)
    public wallCnt?: number|null = 0
    @protobuf.Field.d(7, "int32", "repeated", [])
    public baoCards?: number[] = []
    @protobuf.Field.d(8, "int64", "optional", 0)
    public preOpUid?: number|null = 0
    @protobuf.Field.d(9, "int64", "optional", 0)
    public totalOpTime?: number|null = 0
    @protobuf.Field.d(10, "mahjong_tss_mahjong_extendtable_v4_BetData", "repeated")
    public betDatas?: BetData[] = []
    @protobuf.Field.d(11, "mahjong_tss_mahjong_extendtable_v4_ChangeCardData", "repeated")
    public changeCardDatas?: ChangeCardData[] = []
    @protobuf.Field.d(12, "mahjong_tss_mahjong_extendtable_v4_DingQueData", "repeated")
    public dingQueDatas?: DingQueData[] = []
    @protobuf.Field.d(13, "mahjong_tss_mahjong_extendtable_v4_DingLaiZiData", "optional")
    public laiZiData?: DingLaiZiData|null
}
export interface IUserCards {
    uid?: number|null
    cards?: number[]
}
@protobuf.Type.d("mahjong_tss_mahjong_extendtable_v4_UserCards")
export class UserCards extends protobuf.Message<IUserCards> {
    constructor(properties: Properties<IUserCards>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.cards) { this.cards = []; properties.cards.forEach((value, index)=>{this.cards[index] = properties.cards[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int32", "repeated", [])
    public cards?: number[] = []
}
export interface IMaiMaData {
    cardsList?: IUserCards[]
    rxCards?: number[]
    payCards?: number[]
}
@protobuf.Type.d("mahjong_tss_mahjong_extendtable_v4_MaiMaData")
export class MaiMaData extends protobuf.Message<IMaiMaData> {
    constructor(properties: Properties<IMaiMaData>) {
        super(properties);
        if (properties) {
            if (properties.cardsList) { this.cardsList = []; properties.cardsList.forEach((value, index)=>{this.cardsList[index] = UserCards.create(properties.cardsList[index]) as any})}
            if (properties.rxCards) { this.rxCards = []; properties.rxCards.forEach((value, index)=>{this.rxCards[index] = properties.rxCards[index]})}
            if (properties.payCards) { this.payCards = []; properties.payCards.forEach((value, index)=>{this.payCards[index] = properties.payCards[index]})}
        }
	}
    @protobuf.Field.d(1, "mahjong_tss_mahjong_extendtable_v4_UserCards", "repeated")
    public cardsList?: UserCards[] = []
    @protobuf.Field.d(2, "int32", "repeated", [])
    public rxCards?: number[] = []
    @protobuf.Field.d(3, "int32", "repeated", [])
    public payCards?: number[] = []
}
class $ExtendTable extends RpcService {
    @RpcDecorator({eventID:1, extend:"Action"})
    Operate(req: IOperateData, params: RpcParams) : {bytes: Uint8Array, eventID?: number} {
        let bytes = OperateData.encode(req).finish()
        return {bytes: bytes, eventID: 1}
    }
    @RpcDecorator({eventID:2, extend:"Action"})
    Bet(req: IBetData, params: RpcParams) : {bytes: Uint8Array, eventID?: number} {
        let bytes = BetData.encode(req).finish()
        return {bytes: bytes, eventID: 2}
    }
    @RpcDecorator({eventID:3, extend:"Action"})
    ChangeCard(req: IChangeCardData, params: RpcParams) : {bytes: Uint8Array, eventID?: number} {
        let bytes = ChangeCardData.encode(req).finish()
        return {bytes: bytes, eventID: 3}
    }
    @RpcDecorator({eventID:4, extend:"Action"})
    DingQue(req: IDingQueData, params: RpcParams) : {bytes: Uint8Array, eventID?: number} {
        let bytes = DingQueData.encode(req).finish()
        return {bytes: bytes, eventID: 4}
    }
    @RpcDecorator({eventID:101, extend:"NotifyPlayer"})
    TableInfo(data: Uint8Array, params: RpcParams) : {msg: ITable, eventID?: number} {
        let msg = Table.decode(data)
        return {msg: msg, eventID: 101}
    }
    @RpcDecorator({eventID:102, extend:"NotifyPlayer"})
    StartGame(data: Uint8Array, params: RpcParams) : {msg: IGameStart, eventID?: number} {
        let msg = GameStart.decode(data)
        return {msg: msg, eventID: 102}
    }
    @RpcDecorator({eventID:103, extend:"NotifyPlayer"})
    ZhiTou(data: Uint8Array, params: RpcParams) : {msg: IDiceInfo, eventID?: number} {
        let msg = DiceInfo.decode(data)
        return {msg: msg, eventID: 103}
    }
    @RpcDecorator({eventID:104, extend:"NotifyPlayer"})
    DingZhuang(data: Uint8Array, params: RpcParams) : {msg: IFixBanker, eventID?: number} {
        let msg = FixBanker.decode(data)
        return {msg: msg, eventID: 104}
    }
    @RpcDecorator({eventID:105, extend:"NotifyPlayer"})
    DealCard(data: Uint8Array, params: RpcParams) : {msg: IDealCardInfo, eventID?: number} {
        let msg = DealCardInfo.decode(data)
        return {msg: msg, eventID: 105}
    }
    @RpcDecorator({eventID:106, extend:"NotifyPlayer"})
    StartOperate(data: Uint8Array, params: RpcParams) : {msg: IOperateOption, eventID?: number} {
        let msg = OperateOption.decode(data)
        return {msg: msg, eventID: 106}
    }
    @RpcDecorator({eventID:107, extend:"NotifyPlayer"})
    OperateResult(data: Uint8Array, params: RpcParams) : {msg: IOperateResultInfo, eventID?: number} {
        let msg = OperateResultInfo.decode(data)
        return {msg: msg, eventID: 107}
    }
    @RpcDecorator({eventID:108, extend:"NotifyPlayer"})
    WaitOperation(data: Uint8Array, params: RpcParams) : {msg: IOperateWaiting, eventID?: number} {
        let msg = OperateWaiting.decode(data)
        return {msg: msg, eventID: 108}
    }
    @RpcDecorator({eventID:109, extend:"NotifyPlayer"})
    EndGame(data: Uint8Array, params: RpcParams) : {msg: IGameEnd, eventID?: number} {
        let msg = GameEnd.decode(data)
        return {msg: msg, eventID: 109}
    }
    @RpcDecorator({eventID:110, extend:"NotifyPlayer"})
    ShowCards(data: Uint8Array, params: RpcParams) : {msg: IHandCards, eventID?: number} {
        let msg = HandCards.decode(data)
        return {msg: msg, eventID: 110}
    }
    @RpcDecorator({eventID:111, extend:"NotifyPlayer"})
    SettleGame(data: Uint8Array, params: RpcParams) : {msg: IGameSettle, eventID?: number} {
        let msg = GameSettle.decode(data)
        return {msg: msg, eventID: 111}
    }
    @RpcDecorator({eventID:112, extend:"NotifyPlayer"})
    NotifyBet(data: Uint8Array, params: RpcParams) : {msg: IBetData, eventID?: number} {
        let msg = BetData.decode(data)
        return {msg: msg, eventID: 112}
    }
    @RpcDecorator({eventID:113, extend:"NotifyPlayer"})
    EndBet(data: Uint8Array, params: RpcParams) : {msg: IBetEnd, eventID?: number} {
        let msg = BetEnd.decode(data)
        return {msg: msg, eventID: 113}
    }
    @RpcDecorator({eventID:114, extend:"NotifyPlayer"})
    NotifyChangeCard(data: Uint8Array, params: RpcParams) : {msg: IChangeCardData, eventID?: number} {
        let msg = ChangeCardData.decode(data)
        return {msg: msg, eventID: 114}
    }
    @RpcDecorator({eventID:115, extend:"NotifyPlayer"})
    EndChangeCard(data: Uint8Array, params: RpcParams) : {msg: IChangeCardEnd, eventID?: number} {
        let msg = ChangeCardEnd.decode(data)
        return {msg: msg, eventID: 115}
    }
    @RpcDecorator({eventID:116, extend:"NotifyPlayer"})
    NotifyDingQue(data: Uint8Array, params: RpcParams) : {msg: IDingQueData, eventID?: number} {
        let msg = DingQueData.decode(data)
        return {msg: msg, eventID: 116}
    }
    @RpcDecorator({eventID:117, extend:"NotifyPlayer"})
    EndDingQue(data: Uint8Array, params: RpcParams) : {msg: IDingQueEnd, eventID?: number} {
        let msg = DingQueEnd.decode(data)
        return {msg: msg, eventID: 117}
    }
    @RpcDecorator({eventID:118, extend:"NotifyPlayer"})
    SubSettleGame(data: Uint8Array, params: RpcParams) : {msg: IGameSettle, eventID?: number} {
        let msg = GameSettle.decode(data)
        return {msg: msg, eventID: 118}
    }
    @RpcDecorator({eventID:119, extend:"NotifyPlayer"})
    NotifyUpdateOpData(data: Uint8Array, params: RpcParams) : {msg: IUpdateOpData, eventID?: number} {
        let msg = UpdateOpData.decode(data)
        return {msg: msg, eventID: 119}
    }
    @RpcDecorator({eventID:120, extend:"NotifyPlayer"})
    NotifyDingLaiZi(data: Uint8Array, params: RpcParams) : {msg: IDingLaiZiData, eventID?: number} {
        let msg = DingLaiZiData.decode(data)
        return {msg: msg, eventID: 120}
    }
    @RpcDecorator({eventID:121, extend:"NotifyPlayer"})
    NotifyMaiMa(data: Uint8Array, params: RpcParams) : {msg: IMaiMaData, eventID?: number} {
        let msg = MaiMaData.decode(data)
        return {msg: msg, eventID: 121}
    }
}
export const ExtendTable = new $ExtendTable({
    name: "tss.mahjong.extendtable.v4",
})
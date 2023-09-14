import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  Void as base_Void,IVoid as base_IVoid ,  BatchGetResourceReq as base_BatchGetResourceReq,IBatchGetResourceReq as base_IBatchGetResourceReq ,  BatchGetResourceResp as base_BatchGetResourceResp,IBatchGetResourceResp as base_IBatchGetResourceResp ,  } from "idl/base/base"
import {  AssetItem as tss_common_AssetItem,IAssetItem as tss_common_IAssetItem ,  AppConfig as tss_common_AppConfig,IAppConfig as tss_common_IAppConfig ,  } from "idl/tss/common/common_define"
import {  BatchGetBadgeReq as tss_hall_common_BatchGetBadgeReq,IBatchGetBadgeReq as tss_hall_common_IBatchGetBadgeReq ,  BatchGetBadgeResp as tss_hall_common_BatchGetBadgeResp,IBatchGetBadgeResp as tss_hall_common_IBatchGetBadgeResp ,  } from "idl/tss/hall/common/badge"
import {  DeliverProduct as tss_hall_common_DeliverProduct,IDeliverProduct as tss_hall_common_IDeliverProduct ,  } from "idl/tss/hall/common/mall"
import {  PremiumCardType as tss_hall_common_PremiumCardType ,  } from "idl/tss/hall/common/premiumcard"
export enum CardStatus {  
    CardStatusUnknown = 0,  
    CardStatusNot = 1,  
    CardStatusOpening = 2,  
    CardStatusExpired = 3,
}
export enum FailCode {  
    FailCodeOK = 0,  
    FailCodeNot = 1,
}
export interface IVoid {
}
@protobuf.Type.d("tss_hall_premiumcard_v1_Void")
export class Void extends protobuf.Message<IVoid> {
    constructor(properties: Properties<IVoid>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface ICard {
    uid?: number|null
    State?: CardStatus|null
    expiredAt?: number|null
    Type?: tss_hall_common_PremiumCardType|null
    hasTry?: boolean|null
}
@protobuf.Type.d("tss_hall_premiumcard_v1_Card")
export class Card extends protobuf.Message<ICard> {
    constructor(properties: Properties<ICard>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.State) { this.State = properties.State }
            if (properties.expiredAt) { this.expiredAt = properties.expiredAt }
            if (properties.Type) { this.Type = properties.Type }
            if (properties.hasTry) { this.hasTry = properties.hasTry }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, CardStatus, "optional", CardStatus.CardStatusUnknown)
    public State?: CardStatus|null = CardStatus.CardStatusUnknown
    @protobuf.Field.d(3, "int64", "optional", 0)
    public expiredAt?: number|null = 0
    @protobuf.Field.d(6, tss_hall_common_PremiumCardType, "optional", tss_hall_common_PremiumCardType.PremiumCardTypeUnknown)
    public Type?: tss_hall_common_PremiumCardType|null = tss_hall_common_PremiumCardType.PremiumCardTypeUnknown
    @protobuf.Field.d(7, "bool", "optional", false)
    public hasTry?: boolean|null = false
}
export interface ICardConf {
    Id?: string|null
    name?: string|null
    createAt?: number|null
    updateAt?: number|null
    operator?: string|null
    Type?: tss_hall_common_PremiumCardType|null
    assets?: tss_common_IAssetItem[]
}
@protobuf.Type.d("tss_hall_premiumcard_v1_CardConf")
export class CardConf extends protobuf.Message<ICardConf> {
    constructor(properties: Properties<ICardConf>) {
        super(properties);
        if (properties) {
            if (properties.Id) { this.Id = properties.Id }
            if (properties.name) { this.name = properties.name }
            if (properties.createAt) { this.createAt = properties.createAt }
            if (properties.updateAt) { this.updateAt = properties.updateAt }
            if (properties.operator) { this.operator = properties.operator }
            if (properties.Type) { this.Type = properties.Type }
            if (properties.assets) { this.assets = []; properties.assets.forEach((value, index)=>{this.assets[index] = tss_common_AssetItem.create(properties.assets[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public Id?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(3, "int64", "optional", 0)
    public createAt?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public updateAt?: number|null = 0
    @protobuf.Field.d(5, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(6, tss_hall_common_PremiumCardType, "optional", tss_hall_common_PremiumCardType.PremiumCardTypeUnknown)
    public Type?: tss_hall_common_PremiumCardType|null = tss_hall_common_PremiumCardType.PremiumCardTypeUnknown
    @protobuf.Field.d(7, "tss_common_AssetItem", "repeated")
    public assets?: tss_common_AssetItem[] = []
}
export interface IFirstTimeOpenCardDurationConf {
    appID?: string|null
    days?: number|null
}
@protobuf.Type.d("tss_hall_premiumcard_v1_FirstTimeOpenCardDurationConf")
export class FirstTimeOpenCardDurationConf extends protobuf.Message<IFirstTimeOpenCardDurationConf> {
    constructor(properties: Properties<IFirstTimeOpenCardDurationConf>) {
        super(properties);
        if (properties) {
            if (properties.appID) { this.appID = properties.appID }
            if (properties.days) { this.days = properties.days }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public appID?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public days?: number|null = 0
}
export interface IOpenCardDurationConf {
    id?: string|null
    dayConf?: IFirstTimeOpenCardDurationConf[]
}
@protobuf.Type.d("tss_hall_premiumcard_v1_OpenCardDurationConf")
export class OpenCardDurationConf extends protobuf.Message<IOpenCardDurationConf> {
    constructor(properties: Properties<IOpenCardDurationConf>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.dayConf) { this.dayConf = []; properties.dayConf.forEach((value, index)=>{this.dayConf[index] = FirstTimeOpenCardDurationConf.create(properties.dayConf[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public id?: string|null = ""
    @protobuf.Field.d(2, "tss_hall_premiumcard_v1_FirstTimeOpenCardDurationConf", "repeated")
    public dayConf?: FirstTimeOpenCardDurationConf[] = []
}
export interface ISaveOpenCardDurationConfReq {
    openCardDurationConf?: IOpenCardDurationConf
}
@protobuf.Type.d("tss_hall_premiumcard_v1_SaveOpenCardDurationConfReq")
export class SaveOpenCardDurationConfReq extends protobuf.Message<ISaveOpenCardDurationConfReq> {
    constructor(properties: Properties<ISaveOpenCardDurationConfReq>) {
        super(properties);
        if (properties) {
            if (properties.openCardDurationConf) { this.openCardDurationConf = OpenCardDurationConf.create(properties.openCardDurationConf) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_premiumcard_v1_OpenCardDurationConf", "optional")
    public openCardDurationConf?: OpenCardDurationConf|null
}
export interface IGetOpenCardDurationConfResp {
    openCardDurationConf?: IOpenCardDurationConf
}
@protobuf.Type.d("tss_hall_premiumcard_v1_GetOpenCardDurationConfResp")
export class GetOpenCardDurationConfResp extends protobuf.Message<IGetOpenCardDurationConfResp> {
    constructor(properties: Properties<IGetOpenCardDurationConfResp>) {
        super(properties);
        if (properties) {
            if (properties.openCardDurationConf) { this.openCardDurationConf = OpenCardDurationConf.create(properties.openCardDurationConf) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_premiumcard_v1_OpenCardDurationConf", "optional")
    public openCardDurationConf?: OpenCardDurationConf|null
}
export interface IOpenUserCardReq {
    time?: number|null
    Type?: tss_hall_common_PremiumCardType|null
    uid?: number|null
}
@protobuf.Type.d("tss_hall_premiumcard_v1_OpenUserCardReq")
export class OpenUserCardReq extends protobuf.Message<IOpenUserCardReq> {
    constructor(properties: Properties<IOpenUserCardReq>) {
        super(properties);
        if (properties) {
            if (properties.time) { this.time = properties.time }
            if (properties.Type) { this.Type = properties.Type }
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public time?: number|null = 0
    @protobuf.Field.d(2, tss_hall_common_PremiumCardType, "optional", tss_hall_common_PremiumCardType.PremiumCardTypeUnknown)
    public Type?: tss_hall_common_PremiumCardType|null = tss_hall_common_PremiumCardType.PremiumCardTypeUnknown
    @protobuf.Field.d(3, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IGetIsUserCardTriedReq {
    Type?: tss_hall_common_PremiumCardType|null
}
@protobuf.Type.d("tss_hall_premiumcard_v1_GetIsUserCardTriedReq")
export class GetIsUserCardTriedReq extends protobuf.Message<IGetIsUserCardTriedReq> {
    constructor(properties: Properties<IGetIsUserCardTriedReq>) {
        super(properties);
        if (properties) {
            if (properties.Type) { this.Type = properties.Type }
        }
	}
    @protobuf.Field.d(1, tss_hall_common_PremiumCardType, "optional", tss_hall_common_PremiumCardType.PremiumCardTypeUnknown)
    public Type?: tss_hall_common_PremiumCardType|null = tss_hall_common_PremiumCardType.PremiumCardTypeUnknown
}
export interface IGetIsUserCardTriedResp {
    isTried?: boolean|null
}
@protobuf.Type.d("tss_hall_premiumcard_v1_GetIsUserCardTriedResp")
export class GetIsUserCardTriedResp extends protobuf.Message<IGetIsUserCardTriedResp> {
    constructor(properties: Properties<IGetIsUserCardTriedResp>) {
        super(properties);
        if (properties) {
            if (properties.isTried) { this.isTried = properties.isTried }
        }
	}
    @protobuf.Field.d(1, "bool", "optional", false)
    public isTried?: boolean|null = false
}
export interface IGiveUserForeverCardReq {
    Type?: tss_hall_common_PremiumCardType|null
    uid?: number|null
}
@protobuf.Type.d("tss_hall_premiumcard_v1_GiveUserForeverCardReq")
export class GiveUserForeverCardReq extends protobuf.Message<IGiveUserForeverCardReq> {
    constructor(properties: Properties<IGiveUserForeverCardReq>) {
        super(properties);
        if (properties) {
            if (properties.Type) { this.Type = properties.Type }
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(2, tss_hall_common_PremiumCardType, "optional", tss_hall_common_PremiumCardType.PremiumCardTypeUnknown)
    public Type?: tss_hall_common_PremiumCardType|null = tss_hall_common_PremiumCardType.PremiumCardTypeUnknown
    @protobuf.Field.d(3, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IOpenUserCardResp {
    card?: ICard
    days?: number|null
}
@protobuf.Type.d("tss_hall_premiumcard_v1_OpenUserCardResp")
export class OpenUserCardResp extends protobuf.Message<IOpenUserCardResp> {
    constructor(properties: Properties<IOpenUserCardResp>) {
        super(properties);
        if (properties) {
            if (properties.card) { this.card = Card.create(properties.card) as any }
            if (properties.days) { this.days = properties.days }
        }
	}
    @protobuf.Field.d(1, "tss_hall_premiumcard_v1_Card", "optional")
    public card?: Card|null
    @protobuf.Field.d(2, "int64", "optional", 0)
    public days?: number|null = 0
}
export interface IGetUserCardReq {
    uid?: number|null
}
@protobuf.Type.d("tss_hall_premiumcard_v1_GetUserCardReq")
export class GetUserCardReq extends protobuf.Message<IGetUserCardReq> {
    constructor(properties: Properties<IGetUserCardReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IGetUserCardResp {
    card?: ICard
}
@protobuf.Type.d("tss_hall_premiumcard_v1_GetUserCardResp")
export class GetUserCardResp extends protobuf.Message<IGetUserCardResp> {
    constructor(properties: Properties<IGetUserCardResp>) {
        super(properties);
        if (properties) {
            if (properties.card) { this.card = Card.create(properties.card) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_premiumcard_v1_Card", "optional")
    public card?: Card|null
}
export interface IGetUserCardByTypeReq {
    uid?: number|null
    cardType?: tss_hall_common_PremiumCardType|null
}
@protobuf.Type.d("tss_hall_premiumcard_v1_GetUserCardByTypeReq")
export class GetUserCardByTypeReq extends protobuf.Message<IGetUserCardByTypeReq> {
    constructor(properties: Properties<IGetUserCardByTypeReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.cardType) { this.cardType = properties.cardType }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, tss_hall_common_PremiumCardType, "optional", tss_hall_common_PremiumCardType.PremiumCardTypeUnknown)
    public cardType?: tss_hall_common_PremiumCardType|null = tss_hall_common_PremiumCardType.PremiumCardTypeUnknown
}
export interface IGetUserCardByTypeResp {
    card?: ICard
}
@protobuf.Type.d("tss_hall_premiumcard_v1_GetUserCardByTypeResp")
export class GetUserCardByTypeResp extends protobuf.Message<IGetUserCardByTypeResp> {
    constructor(properties: Properties<IGetUserCardByTypeResp>) {
        super(properties);
        if (properties) {
            if (properties.card) { this.card = Card.create(properties.card) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_premiumcard_v1_Card", "optional")
    public card?: Card|null
}
export interface IGetUserAllCardReq {
    uid?: number|null
}
@protobuf.Type.d("tss_hall_premiumcard_v1_GetUserAllCardReq")
export class GetUserAllCardReq extends protobuf.Message<IGetUserAllCardReq> {
    constructor(properties: Properties<IGetUserAllCardReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IBatchGetUserAllCardReq {
    uids?: number[]
}
@protobuf.Type.d("tss_hall_premiumcard_v1_BatchGetUserAllCardReq")
export class BatchGetUserAllCardReq extends protobuf.Message<IBatchGetUserAllCardReq> {
    constructor(properties: Properties<IBatchGetUserAllCardReq>) {
        super(properties);
        if (properties) {
            if (properties.uids) { this.uids = []; properties.uids.forEach((value, index)=>{this.uids[index] = properties.uids[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public uids?: number[] = []
}
export interface IGetUserAllCardResp {
    card?: ICard[]
}
@protobuf.Type.d("tss_hall_premiumcard_v1_GetUserAllCardResp")
export class GetUserAllCardResp extends protobuf.Message<IGetUserAllCardResp> {
    constructor(properties: Properties<IGetUserAllCardResp>) {
        super(properties);
        if (properties) {
            if (properties.card) { this.card = []; properties.card.forEach((value, index)=>{this.card[index] = Card.create(properties.card[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_premiumcard_v1_Card", "repeated")
    public card?: Card[] = []
}
export interface IUserAllCard {
    uid?: number|null
    cards?: ICard[]
}
@protobuf.Type.d("tss_hall_premiumcard_v1_UserAllCard")
export class UserAllCard extends protobuf.Message<IUserAllCard> {
    constructor(properties: Properties<IUserAllCard>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.cards) { this.cards = []; properties.cards.forEach((value, index)=>{this.cards[index] = Card.create(properties.cards[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "tss_hall_premiumcard_v1_Card", "repeated")
    public cards?: Card[] = []
}
export interface IBatchGetUserAllCardResp {
    userAllCard?: IUserAllCard[]
}
@protobuf.Type.d("tss_hall_premiumcard_v1_BatchGetUserAllCardResp")
export class BatchGetUserAllCardResp extends protobuf.Message<IBatchGetUserAllCardResp> {
    constructor(properties: Properties<IBatchGetUserAllCardResp>) {
        super(properties);
        if (properties) {
            if (properties.userAllCard) { this.userAllCard = []; properties.userAllCard.forEach((value, index)=>{this.userAllCard[index] = UserAllCard.create(properties.userAllCard[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_premiumcard_v1_UserAllCard", "repeated")
    public userAllCard?: UserAllCard[] = []
}
export interface IGetCardDailyBenefitReq {
    uid?: number|null
}
@protobuf.Type.d("tss_hall_premiumcard_v1_GetCardDailyBenefitReq")
export class GetCardDailyBenefitReq extends protobuf.Message<IGetCardDailyBenefitReq> {
    constructor(properties: Properties<IGetCardDailyBenefitReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IPremiumCardDailyBenefitView {
    conf?: ICardConf
    hasDailyBenefitToReceive?: boolean|null
    expiredAt?: number|null
}
@protobuf.Type.d("tss_hall_premiumcard_v1_PremiumCardDailyBenefitView")
export class PremiumCardDailyBenefitView extends protobuf.Message<IPremiumCardDailyBenefitView> {
    constructor(properties: Properties<IPremiumCardDailyBenefitView>) {
        super(properties);
        if (properties) {
            if (properties.conf) { this.conf = CardConf.create(properties.conf) as any }
            if (properties.hasDailyBenefitToReceive) { this.hasDailyBenefitToReceive = properties.hasDailyBenefitToReceive }
            if (properties.expiredAt) { this.expiredAt = properties.expiredAt }
        }
	}
    @protobuf.Field.d(1, "tss_hall_premiumcard_v1_CardConf", "optional")
    public conf?: CardConf|null
    @protobuf.Field.d(2, "bool", "optional", false)
    public hasDailyBenefitToReceive?: boolean|null = false
    @protobuf.Field.d(3, "int64", "optional", 0)
    public expiredAt?: number|null = 0
}
export interface IGetCardDailyBenefitResp {
    card?: IPremiumCardDailyBenefitView[]
}
@protobuf.Type.d("tss_hall_premiumcard_v1_GetCardDailyBenefitResp")
export class GetCardDailyBenefitResp extends protobuf.Message<IGetCardDailyBenefitResp> {
    constructor(properties: Properties<IGetCardDailyBenefitResp>) {
        super(properties);
        if (properties) {
            if (properties.card) { this.card = []; properties.card.forEach((value, index)=>{this.card[index] = PremiumCardDailyBenefitView.create(properties.card[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_premiumcard_v1_PremiumCardDailyBenefitView", "repeated")
    public card?: PremiumCardDailyBenefitView[] = []
}
export interface IReceiveCardDailyBenefitReq {
    confId?: string|null
}
@protobuf.Type.d("tss_hall_premiumcard_v1_ReceiveCardDailyBenefitReq")
export class ReceiveCardDailyBenefitReq extends protobuf.Message<IReceiveCardDailyBenefitReq> {
    constructor(properties: Properties<IReceiveCardDailyBenefitReq>) {
        super(properties);
        if (properties) {
            if (properties.confId) { this.confId = properties.confId }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public confId?: string|null = ""
}
export interface IReceiveCardDailyBenefitResp {
    assets?: tss_common_IAssetItem[]
}
@protobuf.Type.d("tss_hall_premiumcard_v1_ReceiveCardDailyBenefitResp")
export class ReceiveCardDailyBenefitResp extends protobuf.Message<IReceiveCardDailyBenefitResp> {
    constructor(properties: Properties<IReceiveCardDailyBenefitResp>) {
        super(properties);
        if (properties) {
            if (properties.assets) { this.assets = []; properties.assets.forEach((value, index)=>{this.assets[index] = tss_common_AssetItem.create(properties.assets[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_common_AssetItem", "repeated")
    public assets?: tss_common_AssetItem[] = []
}
export interface IBatchGetUserCardReq {
    uids?: number[]
}
@protobuf.Type.d("tss_hall_premiumcard_v1_BatchGetUserCardReq")
export class BatchGetUserCardReq extends protobuf.Message<IBatchGetUserCardReq> {
    constructor(properties: Properties<IBatchGetUserCardReq>) {
        super(properties);
        if (properties) {
            if (properties.uids) { this.uids = []; properties.uids.forEach((value, index)=>{this.uids[index] = properties.uids[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public uids?: number[] = []
}
export interface IBatchGetUserCardResp {
    cards?: ICard[]
}
@protobuf.Type.d("tss_hall_premiumcard_v1_BatchGetUserCardResp")
export class BatchGetUserCardResp extends protobuf.Message<IBatchGetUserCardResp> {
    constructor(properties: Properties<IBatchGetUserCardResp>) {
        super(properties);
        if (properties) {
            if (properties.cards) { this.cards = []; properties.cards.forEach((value, index)=>{this.cards[index] = Card.create(properties.cards[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_premiumcard_v1_Card", "repeated")
    public cards?: Card[] = []
}
export interface IDelUserCardReq {
    uid?: number|null
}
@protobuf.Type.d("tss_hall_premiumcard_v1_DelUserCardReq")
export class DelUserCardReq extends protobuf.Message<IDelUserCardReq> {
    constructor(properties: Properties<IDelUserCardReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IDelUserCardResp {
    State?: number|null
}
@protobuf.Type.d("tss_hall_premiumcard_v1_DelUserCardResp")
export class DelUserCardResp extends protobuf.Message<IDelUserCardResp> {
    constructor(properties: Properties<IDelUserCardResp>) {
        super(properties);
        if (properties) {
            if (properties.State) { this.State = properties.State }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public State?: number|null = 0
}
export interface IUpReq {
    cards?: ICard
}
@protobuf.Type.d("tss_hall_premiumcard_v1_UpReq")
export class UpReq extends protobuf.Message<IUpReq> {
    constructor(properties: Properties<IUpReq>) {
        super(properties);
        if (properties) {
            if (properties.cards) { this.cards = Card.create(properties.cards) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_premiumcard_v1_Card", "optional")
    public cards?: Card|null
}
export interface IUpResp {
    cards?: ICard
}
@protobuf.Type.d("tss_hall_premiumcard_v1_UpResp")
export class UpResp extends protobuf.Message<IUpResp> {
    constructor(properties: Properties<IUpResp>) {
        super(properties);
        if (properties) {
            if (properties.cards) { this.cards = Card.create(properties.cards) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_premiumcard_v1_Card", "optional")
    public cards?: Card|null
}
export interface IRenewUserCardReq {
    uid?: number|null
    time?: number|null
    Type?: tss_hall_common_PremiumCardType|null
}
@protobuf.Type.d("tss_hall_premiumcard_v1_RenewUserCardReq")
export class RenewUserCardReq extends protobuf.Message<IRenewUserCardReq> {
    constructor(properties: Properties<IRenewUserCardReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.time) { this.time = properties.time }
            if (properties.Type) { this.Type = properties.Type }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public time?: number|null = 0
    @protobuf.Field.d(3, tss_hall_common_PremiumCardType, "optional", tss_hall_common_PremiumCardType.PremiumCardTypeUnknown)
    public Type?: tss_hall_common_PremiumCardType|null = tss_hall_common_PremiumCardType.PremiumCardTypeUnknown
}
export interface IRenewUserCardResp {
    expiredAt?: number|null
    card?: ICard
}
@protobuf.Type.d("tss_hall_premiumcard_v1_RenewUserCardResp")
export class RenewUserCardResp extends protobuf.Message<IRenewUserCardResp> {
    constructor(properties: Properties<IRenewUserCardResp>) {
        super(properties);
        if (properties) {
            if (properties.expiredAt) { this.expiredAt = properties.expiredAt }
            if (properties.card) { this.card = Card.create(properties.card) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public expiredAt?: number|null = 0
    @protobuf.Field.d(2, "tss_hall_premiumcard_v1_Card", "optional")
    public card?: Card|null
}
export interface IInviteRecord {
    id?: number|null
    uid?: number|null
    targetUid?: number|null
    duration?: number|null
    status?: boolean|null
}
@protobuf.Type.d("tss_hall_premiumcard_v1_InviteRecord")
export class InviteRecord extends protobuf.Message<IInviteRecord> {
    constructor(properties: Properties<IInviteRecord>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.uid) { this.uid = properties.uid }
            if (properties.targetUid) { this.targetUid = properties.targetUid }
            if (properties.duration) { this.duration = properties.duration }
            if (properties.status) { this.status = properties.status }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public id?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public targetUid?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public duration?: number|null = 0
    @protobuf.Field.d(5, "bool", "optional", false)
    public status?: boolean|null = false
}
export interface ISaveInviteRecordReq {
    record?: IInviteRecord
}
@protobuf.Type.d("tss_hall_premiumcard_v1_SaveInviteRecordReq")
export class SaveInviteRecordReq extends protobuf.Message<ISaveInviteRecordReq> {
    constructor(properties: Properties<ISaveInviteRecordReq>) {
        super(properties);
        if (properties) {
            if (properties.record) { this.record = InviteRecord.create(properties.record) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_premiumcard_v1_InviteRecord", "optional")
    public record?: InviteRecord|null
}
export interface IListInviteRecordReq {
    page?: number|null
    pageSize?: number|null
}
@protobuf.Type.d("tss_hall_premiumcard_v1_ListInviteRecordReq")
export class ListInviteRecordReq extends protobuf.Message<IListInviteRecordReq> {
    constructor(properties: Properties<IListInviteRecordReq>) {
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
export interface IListInviteRecordResp {
    recordList?: IInviteRecord[]
    totalNum?: number|null
}
@protobuf.Type.d("tss_hall_premiumcard_v1_ListInviteRecordResp")
export class ListInviteRecordResp extends protobuf.Message<IListInviteRecordResp> {
    constructor(properties: Properties<IListInviteRecordResp>) {
        super(properties);
        if (properties) {
            if (properties.recordList) { this.recordList = []; properties.recordList.forEach((value, index)=>{this.recordList[index] = InviteRecord.create(properties.recordList[index]) as any})}
            if (properties.totalNum) { this.totalNum = properties.totalNum }
        }
	}
    @protobuf.Field.d(1, "tss_hall_premiumcard_v1_InviteRecord", "repeated")
    public recordList?: InviteRecord[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public totalNum?: number|null = 0
}
export interface ICardProduct {
    id?: number|null
    name?: string|null
    duration?: number|null
    desc?: string|null
    img?: string|null
    createAt?: number|null
    updateAt?: number|null
    operator?: string|null
    type?: tss_hall_common_PremiumCardType|null
}
@protobuf.Type.d("tss_hall_premiumcard_v1_CardProduct")
export class CardProduct extends protobuf.Message<ICardProduct> {
    constructor(properties: Properties<ICardProduct>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.name) { this.name = properties.name }
            if (properties.duration) { this.duration = properties.duration }
            if (properties.desc) { this.desc = properties.desc }
            if (properties.img) { this.img = properties.img }
            if (properties.createAt) { this.createAt = properties.createAt }
            if (properties.updateAt) { this.updateAt = properties.updateAt }
            if (properties.operator) { this.operator = properties.operator }
            if (properties.type) { this.type = properties.type }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public id?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(3, "int64", "optional", 0)
    public duration?: number|null = 0
    @protobuf.Field.d(4, "string", "optional", )
    public desc?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public img?: string|null = ""
    @protobuf.Field.d(6, "int64", "optional", 0)
    public createAt?: number|null = 0
    @protobuf.Field.d(7, "int64", "optional", 0)
    public updateAt?: number|null = 0
    @protobuf.Field.d(8, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(9, tss_hall_common_PremiumCardType, "optional", tss_hall_common_PremiumCardType.PremiumCardTypeUnknown)
    public type?: tss_hall_common_PremiumCardType|null = tss_hall_common_PremiumCardType.PremiumCardTypeUnknown
}
export interface ISaveCardProductReq {
    product?: ICardProduct
}
@protobuf.Type.d("tss_hall_premiumcard_v1_SaveCardProductReq")
export class SaveCardProductReq extends protobuf.Message<ISaveCardProductReq> {
    constructor(properties: Properties<ISaveCardProductReq>) {
        super(properties);
        if (properties) {
            if (properties.product) { this.product = CardProduct.create(properties.product) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_premiumcard_v1_CardProduct", "optional")
    public product?: CardProduct|null
}
export interface ISaveCardConfReq {
    conf?: ICardConf
}
@protobuf.Type.d("tss_hall_premiumcard_v1_SaveCardConfReq")
export class SaveCardConfReq extends protobuf.Message<ISaveCardConfReq> {
    constructor(properties: Properties<ISaveCardConfReq>) {
        super(properties);
        if (properties) {
            if (properties.conf) { this.conf = CardConf.create(properties.conf) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_premiumcard_v1_CardConf", "optional")
    public conf?: CardConf|null
}
export interface IBatchSaveCardConfReq {
    conf?: ICardConf[]
}
@protobuf.Type.d("tss_hall_premiumcard_v1_BatchSaveCardConfReq")
export class BatchSaveCardConfReq extends protobuf.Message<IBatchSaveCardConfReq> {
    constructor(properties: Properties<IBatchSaveCardConfReq>) {
        super(properties);
        if (properties) {
            if (properties.conf) { this.conf = []; properties.conf.forEach((value, index)=>{this.conf[index] = CardConf.create(properties.conf[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_premiumcard_v1_CardConf", "repeated")
    public conf?: CardConf[] = []
}
export interface IListCardProductReq {
    page?: number|null
    pageSize?: number|null
}
@protobuf.Type.d("tss_hall_premiumcard_v1_ListCardProductReq")
export class ListCardProductReq extends protobuf.Message<IListCardProductReq> {
    constructor(properties: Properties<IListCardProductReq>) {
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
export interface IListCardProductResp {
    products?: ICardProduct[]
}
@protobuf.Type.d("tss_hall_premiumcard_v1_ListCardProductResp")
export class ListCardProductResp extends protobuf.Message<IListCardProductResp> {
    constructor(properties: Properties<IListCardProductResp>) {
        super(properties);
        if (properties) {
            if (properties.products) { this.products = []; properties.products.forEach((value, index)=>{this.products[index] = CardProduct.create(properties.products[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_premiumcard_v1_CardProduct", "repeated")
    public products?: CardProduct[] = []
}
export interface IDelCardProductReq {
    id?: number|null
}
@protobuf.Type.d("tss_hall_premiumcard_v1_DelCardProductReq")
export class DelCardProductReq extends protobuf.Message<IDelCardProductReq> {
    constructor(properties: Properties<IDelCardProductReq>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public id?: number|null = 0
}
export interface IReadInviteRecordReq {
    lastRecordId?: number|null
}
@protobuf.Type.d("tss_hall_premiumcard_v1_ReadInviteRecordReq")
export class ReadInviteRecordReq extends protobuf.Message<IReadInviteRecordReq> {
    constructor(properties: Properties<IReadInviteRecordReq>) {
        super(properties);
        if (properties) {
            if (properties.lastRecordId) { this.lastRecordId = properties.lastRecordId }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public lastRecordId?: number|null = 0
}
export interface IDeliverySuccessResp {
    product?: tss_hall_common_IDeliverProduct
    newExpire?: number|null
    FirstTimeOpen?: boolean|null
    hour?: number|null
}
@protobuf.Type.d("tss_hall_premiumcard_v1_DeliverySuccessResp")
export class DeliverySuccessResp extends protobuf.Message<IDeliverySuccessResp> {
    constructor(properties: Properties<IDeliverySuccessResp>) {
        super(properties);
        if (properties) {
            if (properties.product) { this.product = tss_hall_common_DeliverProduct.create(properties.product) as any }
            if (properties.newExpire) { this.newExpire = properties.newExpire }
            if (properties.FirstTimeOpen) { this.FirstTimeOpen = properties.FirstTimeOpen }
            if (properties.hour) { this.hour = properties.hour }
        }
	}
    @protobuf.Field.d(1, "tss_hall_common_DeliverProduct", "optional")
    public product?: tss_hall_common_DeliverProduct|null
    @protobuf.Field.d(2, "int64", "optional", 0)
    public newExpire?: number|null = 0
    @protobuf.Field.d(3, "bool", "optional", false)
    public FirstTimeOpen?: boolean|null = false
    @protobuf.Field.d(4, "int64", "optional", 0)
    public hour?: number|null = 0
}
export interface IRenewSuccessResp {
    newExpire?: number|null
    FirstTimeOpen?: boolean|null
    hour?: number|null
    type?: tss_hall_common_PremiumCardType|null
}
@protobuf.Type.d("tss_hall_premiumcard_v1_RenewSuccessResp")
export class RenewSuccessResp extends protobuf.Message<IRenewSuccessResp> {
    constructor(properties: Properties<IRenewSuccessResp>) {
        super(properties);
        if (properties) {
            if (properties.newExpire) { this.newExpire = properties.newExpire }
            if (properties.FirstTimeOpen) { this.FirstTimeOpen = properties.FirstTimeOpen }
            if (properties.hour) { this.hour = properties.hour }
            if (properties.type) { this.type = properties.type }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public newExpire?: number|null = 0
    @protobuf.Field.d(2, "bool", "optional", false)
    public FirstTimeOpen?: boolean|null = false
    @protobuf.Field.d(3, "int64", "optional", 0)
    public hour?: number|null = 0
    @protobuf.Field.d(4, tss_hall_common_PremiumCardType, "optional", tss_hall_common_PremiumCardType.PremiumCardTypeUnknown)
    public type?: tss_hall_common_PremiumCardType|null = tss_hall_common_PremiumCardType.PremiumCardTypeUnknown
}
export interface IDeliveryPremiumCardReq {
    product?: tss_hall_common_IDeliverProduct
}
@protobuf.Type.d("tss_hall_premiumcard_v1_DeliveryPremiumCardReq")
export class DeliveryPremiumCardReq extends protobuf.Message<IDeliveryPremiumCardReq> {
    constructor(properties: Properties<IDeliveryPremiumCardReq>) {
        super(properties);
        if (properties) {
            if (properties.product) { this.product = tss_hall_common_DeliverProduct.create(properties.product) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_common_DeliverProduct", "optional")
    public product?: tss_hall_common_DeliverProduct|null
}
export interface IBatchSaveAppConfigReq {
    config?: tss_common_IAppConfig[]
}
@protobuf.Type.d("tss_hall_premiumcard_v1_BatchSaveAppConfigReq")
export class BatchSaveAppConfigReq extends protobuf.Message<IBatchSaveAppConfigReq> {
    constructor(properties: Properties<IBatchSaveAppConfigReq>) {
        super(properties);
        if (properties) {
            if (properties.config) { this.config = []; properties.config.forEach((value, index)=>{this.config[index] = tss_common_AppConfig.create(properties.config[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_common_AppConfig", "repeated")
    public config?: tss_common_AppConfig[] = []
}
export interface IListAppConfigReq {
    page?: number|null
    pageSize?: number|null
}
@protobuf.Type.d("tss_hall_premiumcard_v1_ListAppConfigReq")
export class ListAppConfigReq extends protobuf.Message<IListAppConfigReq> {
    constructor(properties: Properties<IListAppConfigReq>) {
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
export interface IListAppConfigResp {
    config?: tss_common_IAppConfig[]
}
@protobuf.Type.d("tss_hall_premiumcard_v1_ListAppConfigResp")
export class ListAppConfigResp extends protobuf.Message<IListAppConfigResp> {
    constructor(properties: Properties<IListAppConfigResp>) {
        super(properties);
        if (properties) {
            if (properties.config) { this.config = []; properties.config.forEach((value, index)=>{this.config[index] = tss_common_AppConfig.create(properties.config[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_common_AppConfig", "repeated")
    public config?: tss_common_AppConfig[] = []
}
export interface IListCardConfigResp {
    config?: ICardConf[]
}
@protobuf.Type.d("tss_hall_premiumcard_v1_ListCardConfigResp")
export class ListCardConfigResp extends protobuf.Message<IListCardConfigResp> {
    constructor(properties: Properties<IListCardConfigResp>) {
        super(properties);
        if (properties) {
            if (properties.config) { this.config = []; properties.config.forEach((value, index)=>{this.config[index] = CardConf.create(properties.config[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_premiumcard_v1_CardConf", "repeated")
    public config?: CardConf[] = []
}
export interface IGetCardConfigByTypeReq {
    cardType?: tss_hall_common_PremiumCardType|null
}
@protobuf.Type.d("tss_hall_premiumcard_v1_GetCardConfigByTypeReq")
export class GetCardConfigByTypeReq extends protobuf.Message<IGetCardConfigByTypeReq> {
    constructor(properties: Properties<IGetCardConfigByTypeReq>) {
        super(properties);
        if (properties) {
            if (properties.cardType) { this.cardType = properties.cardType }
        }
	}
    @protobuf.Field.d(1, tss_hall_common_PremiumCardType, "optional", tss_hall_common_PremiumCardType.PremiumCardTypeUnknown)
    public cardType?: tss_hall_common_PremiumCardType|null = tss_hall_common_PremiumCardType.PremiumCardTypeUnknown
}
export interface IGetCardConfigByTypeResp {
    config?: ICardConf
}
@protobuf.Type.d("tss_hall_premiumcard_v1_GetCardConfigByTypeResp")
export class GetCardConfigByTypeResp extends protobuf.Message<IGetCardConfigByTypeResp> {
    constructor(properties: Properties<IGetCardConfigByTypeResp>) {
        super(properties);
        if (properties) {
            if (properties.config) { this.config = CardConf.create(properties.config) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_premiumcard_v1_CardConf", "optional")
    public config?: CardConf|null
}
export interface IGetBadgeResp {
    haveBadge?: boolean|null
}
@protobuf.Type.d("tss_hall_premiumcard_v1_GetBadgeResp")
export class GetBadgeResp extends protobuf.Message<IGetBadgeResp> {
    constructor(properties: Properties<IGetBadgeResp>) {
        super(properties);
        if (properties) {
            if (properties.haveBadge) { this.haveBadge = properties.haveBadge }
        }
	}
    @protobuf.Field.d(1, "bool", "optional", false)
    public haveBadge?: boolean|null = false
}
export interface IInviteSuccessResp {
    newExpire?: number|null
    hour?: number|null
}
@protobuf.Type.d("tss_hall_premiumcard_v1_InviteSuccessResp")
export class InviteSuccessResp extends protobuf.Message<IInviteSuccessResp> {
    constructor(properties: Properties<IInviteSuccessResp>) {
        super(properties);
        if (properties) {
            if (properties.newExpire) { this.newExpire = properties.newExpire }
            if (properties.hour) { this.hour = properties.hour }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public newExpire?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public hour?: number|null = 0
}
export interface IGetUserFirstTimeRecordReq {
    uid?: number|null
}
@protobuf.Type.d("tss_hall_premiumcard_v1_GetUserFirstTimeRecordReq")
export class GetUserFirstTimeRecordReq extends protobuf.Message<IGetUserFirstTimeRecordReq> {
    constructor(properties: Properties<IGetUserFirstTimeRecordReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IGetUserFirstTimeRecordResp {
    isOpenCard?: boolean|null
    orderId?: string|null
}
@protobuf.Type.d("tss_hall_premiumcard_v1_GetUserFirstTimeRecordResp")
export class GetUserFirstTimeRecordResp extends protobuf.Message<IGetUserFirstTimeRecordResp> {
    constructor(properties: Properties<IGetUserFirstTimeRecordResp>) {
        super(properties);
        if (properties) {
            if (properties.isOpenCard) { this.isOpenCard = properties.isOpenCard }
            if (properties.orderId) { this.orderId = properties.orderId }
        }
	}
    @protobuf.Field.d(1, "bool", "optional", false)
    public isOpenCard?: boolean|null = false
    @protobuf.Field.d(2, "string", "optional", )
    public orderId?: string|null = ""
}
export interface IBatchGetCardProductReq {
    ids?: number[]
}
@protobuf.Type.d("tss_hall_premiumcard_v1_BatchGetCardProductReq")
export class BatchGetCardProductReq extends protobuf.Message<IBatchGetCardProductReq> {
    constructor(properties: Properties<IBatchGetCardProductReq>) {
        super(properties);
        if (properties) {
            if (properties.ids) { this.ids = []; properties.ids.forEach((value, index)=>{this.ids[index] = properties.ids[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public ids?: number[] = []
}
export interface IBatchGetCardProductResp {
    products?: ICardProduct[]
}
@protobuf.Type.d("tss_hall_premiumcard_v1_BatchGetCardProductResp")
export class BatchGetCardProductResp extends protobuf.Message<IBatchGetCardProductResp> {
    constructor(properties: Properties<IBatchGetCardProductResp>) {
        super(properties);
        if (properties) {
            if (properties.products) { this.products = []; properties.products.forEach((value, index)=>{this.products[index] = CardProduct.create(properties.products[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_premiumcard_v1_CardProduct", "repeated")
    public products?: CardProduct[] = []
}
class $premiumcard extends RpcService {
    async OpenUserCard(req: IOpenUserCardReq, params?: RpcParams) : Promise<{err:number, resp:IOpenUserCardResp}> {
        let data = OpenUserCardReq.create(req)
        this.onBeforeReq("OpenUserCard", data, params)
        const buffer = OpenUserCardReq.encode(data).finish()
        let [err, pack] = await this.call("OpenUserCard", buffer, params)
        if (err) {
            this.onBeforeResp("OpenUserCard", err)
            return {err: err, resp: null}
        } else {
            let resp = OpenUserCardResp.decode(pack) as any
            this.onBeforeResp("OpenUserCard", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetIsUserCardTried(req: IGetIsUserCardTriedReq, params?: RpcParams) : Promise<{err:number, resp:IGetIsUserCardTriedResp}> {
        let data = GetIsUserCardTriedReq.create(req)
        this.onBeforeReq("GetIsUserCardTried", data, params)
        const buffer = GetIsUserCardTriedReq.encode(data).finish()
        let [err, pack] = await this.call("GetIsUserCardTried", buffer, params)
        if (err) {
            this.onBeforeResp("GetIsUserCardTried", err)
            return {err: err, resp: null}
        } else {
            let resp = GetIsUserCardTriedResp.decode(pack) as any
            this.onBeforeResp("GetIsUserCardTried", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetCardDailyBenefit(req: IGetCardDailyBenefitReq, params?: RpcParams) : Promise<{err:number, resp:IGetCardDailyBenefitResp}> {
        let data = GetCardDailyBenefitReq.create(req)
        this.onBeforeReq("GetCardDailyBenefit", data, params)
        const buffer = GetCardDailyBenefitReq.encode(data).finish()
        let [err, pack] = await this.call("GetCardDailyBenefit", buffer, params)
        if (err) {
            this.onBeforeResp("GetCardDailyBenefit", err)
            return {err: err, resp: null}
        } else {
            let resp = GetCardDailyBenefitResp.decode(pack) as any
            this.onBeforeResp("GetCardDailyBenefit", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ReceiveCardDailyBenefit(req: IReceiveCardDailyBenefitReq, params?: RpcParams) : Promise<{err:number, resp:IReceiveCardDailyBenefitResp}> {
        let data = ReceiveCardDailyBenefitReq.create(req)
        this.onBeforeReq("ReceiveCardDailyBenefit", data, params)
        const buffer = ReceiveCardDailyBenefitReq.encode(data).finish()
        let [err, pack] = await this.call("ReceiveCardDailyBenefit", buffer, params)
        if (err) {
            this.onBeforeResp("ReceiveCardDailyBenefit", err)
            return {err: err, resp: null}
        } else {
            let resp = ReceiveCardDailyBenefitResp.decode(pack) as any
            this.onBeforeResp("ReceiveCardDailyBenefit", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetUserCard(req: IGetUserCardReq, params?: RpcParams) : Promise<{err:number, resp:IGetUserCardResp}> {
        let data = GetUserCardReq.create(req)
        this.onBeforeReq("GetUserCard", data, params)
        const buffer = GetUserCardReq.encode(data).finish()
        let [err, pack] = await this.call("GetUserCard", buffer, params)
        if (err) {
            this.onBeforeResp("GetUserCard", err)
            return {err: err, resp: null}
        } else {
            let resp = GetUserCardResp.decode(pack) as any
            this.onBeforeResp("GetUserCard", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetUserCardByType(req: IGetUserCardByTypeReq, params?: RpcParams) : Promise<{err:number, resp:IGetUserCardByTypeResp}> {
        let data = GetUserCardByTypeReq.create(req)
        this.onBeforeReq("GetUserCardByType", data, params)
        const buffer = GetUserCardByTypeReq.encode(data).finish()
        let [err, pack] = await this.call("GetUserCardByType", buffer, params)
        if (err) {
            this.onBeforeResp("GetUserCardByType", err)
            return {err: err, resp: null}
        } else {
            let resp = GetUserCardByTypeResp.decode(pack) as any
            this.onBeforeResp("GetUserCardByType", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetUserAllCard(req: IGetUserAllCardReq, params?: RpcParams) : Promise<{err:number, resp:IGetUserAllCardResp}> {
        let data = GetUserAllCardReq.create(req)
        this.onBeforeReq("GetUserAllCard", data, params)
        const buffer = GetUserAllCardReq.encode(data).finish()
        let [err, pack] = await this.call("GetUserAllCard", buffer, params)
        if (err) {
            this.onBeforeResp("GetUserAllCard", err)
            return {err: err, resp: null}
        } else {
            let resp = GetUserAllCardResp.decode(pack) as any
            this.onBeforeResp("GetUserAllCard", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetUserAllCard(req: IBatchGetUserAllCardReq, params?: RpcParams) : Promise<{err:number, resp:IBatchGetUserAllCardResp}> {
        let data = BatchGetUserAllCardReq.create(req)
        this.onBeforeReq("BatchGetUserAllCard", data, params)
        const buffer = BatchGetUserAllCardReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetUserAllCard", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetUserAllCard", err)
            return {err: err, resp: null}
        } else {
            let resp = BatchGetUserAllCardResp.decode(pack) as any
            this.onBeforeResp("BatchGetUserAllCard", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetUserCard(req: IBatchGetUserCardReq, params?: RpcParams) : Promise<{err:number, resp:IBatchGetUserCardResp}> {
        let data = BatchGetUserCardReq.create(req)
        this.onBeforeReq("BatchGetUserCard", data, params)
        const buffer = BatchGetUserCardReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetUserCard", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetUserCard", err)
            return {err: err, resp: null}
        } else {
            let resp = BatchGetUserCardResp.decode(pack) as any
            this.onBeforeResp("BatchGetUserCard", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DelUserCard(req: IDelUserCardReq, params?: RpcParams) : Promise<{err:number, resp:IDelUserCardResp}> {
        let data = DelUserCardReq.create(req)
        this.onBeforeReq("DelUserCard", data, params)
        const buffer = DelUserCardReq.encode(data).finish()
        let [err, pack] = await this.call("DelUserCard", buffer, params)
        if (err) {
            this.onBeforeResp("DelUserCard", err)
            return {err: err, resp: null}
        } else {
            let resp = DelUserCardResp.decode(pack) as any
            this.onBeforeResp("DelUserCard", err, resp)
            return {err: null, resp: resp}
        }
    }
    async RenewUserCard(req: IRenewUserCardReq, params?: RpcParams) : Promise<{err:number, resp:IRenewUserCardResp}> {
        let data = RenewUserCardReq.create(req)
        this.onBeforeReq("RenewUserCard", data, params)
        const buffer = RenewUserCardReq.encode(data).finish()
        let [err, pack] = await this.call("RenewUserCard", buffer, params)
        if (err) {
            this.onBeforeResp("RenewUserCard", err)
            return {err: err, resp: null}
        } else {
            let resp = RenewUserCardResp.decode(pack) as any
            this.onBeforeResp("RenewUserCard", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DeliveryPremiumCard(req: tss_hall_common_IDeliverProduct, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = tss_hall_common_DeliverProduct.create(req)
        this.onBeforeReq("DeliveryPremiumCard", data, params)
        const buffer = tss_hall_common_DeliverProduct.encode(data).finish()
        let [err, pack] = await this.call("DeliveryPremiumCard", buffer, params)
        if (err) {
            this.onBeforeResp("DeliveryPremiumCard", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("DeliveryPremiumCard", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListInviteRecord(req: IListInviteRecordReq, params?: RpcParams) : Promise<{err:number, resp:IListInviteRecordResp}> {
        let data = ListInviteRecordReq.create(req)
        this.onBeforeReq("ListInviteRecord", data, params)
        const buffer = ListInviteRecordReq.encode(data).finish()
        let [err, pack] = await this.call("ListInviteRecord", buffer, params)
        if (err) {
            this.onBeforeResp("ListInviteRecord", err)
            return {err: err, resp: null}
        } else {
            let resp = ListInviteRecordResp.decode(pack) as any
            this.onBeforeResp("ListInviteRecord", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ReadInviteRecord(req: IReadInviteRecordReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = ReadInviteRecordReq.create(req)
        this.onBeforeReq("ReadInviteRecord", data, params)
        const buffer = ReadInviteRecordReq.encode(data).finish()
        let [err, pack] = await this.call("ReadInviteRecord", buffer, params)
        if (err) {
            this.onBeforeResp("ReadInviteRecord", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("ReadInviteRecord", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetCardProduct(req: IBatchGetCardProductReq, params?: RpcParams) : Promise<{err:number, resp:IBatchGetCardProductResp}> {
        let data = BatchGetCardProductReq.create(req)
        this.onBeforeReq("BatchGetCardProduct", data, params)
        const buffer = BatchGetCardProductReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetCardProduct", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetCardProduct", err)
            return {err: err, resp: null}
        } else {
            let resp = BatchGetCardProductResp.decode(pack) as any
            this.onBeforeResp("BatchGetCardProduct", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SaveCardProduct(req: ISaveCardProductReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = SaveCardProductReq.create(req)
        this.onBeforeReq("SaveCardProduct", data, params)
        const buffer = SaveCardProductReq.encode(data).finish()
        let [err, pack] = await this.call("SaveCardProduct", buffer, params)
        if (err) {
            this.onBeforeResp("SaveCardProduct", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("SaveCardProduct", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListCardProduct(req: IListCardProductReq, params?: RpcParams) : Promise<{err:number, resp:IListCardProductResp}> {
        let data = ListCardProductReq.create(req)
        this.onBeforeReq("ListCardProduct", data, params)
        const buffer = ListCardProductReq.encode(data).finish()
        let [err, pack] = await this.call("ListCardProduct", buffer, params)
        if (err) {
            this.onBeforeResp("ListCardProduct", err)
            return {err: err, resp: null}
        } else {
            let resp = ListCardProductResp.decode(pack) as any
            this.onBeforeResp("ListCardProduct", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DelCardProduct(req: IDelCardProductReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = DelCardProductReq.create(req)
        this.onBeforeReq("DelCardProduct", data, params)
        const buffer = DelCardProductReq.encode(data).finish()
        let [err, pack] = await this.call("DelCardProduct", buffer, params)
        if (err) {
            this.onBeforeResp("DelCardProduct", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("DelCardProduct", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchSaveAppConfig(req: IBatchSaveAppConfigReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = BatchSaveAppConfigReq.create(req)
        this.onBeforeReq("BatchSaveAppConfig", data, params)
        const buffer = BatchSaveAppConfigReq.encode(data).finish()
        let [err, pack] = await this.call("BatchSaveAppConfig", buffer, params)
        if (err) {
            this.onBeforeResp("BatchSaveAppConfig", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("BatchSaveAppConfig", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListAppConfig(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:IListAppConfigResp}> {
        let data = base_Void.create(req)
        this.onBeforeReq("ListAppConfig", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("ListAppConfig", buffer, params)
        if (err) {
            this.onBeforeResp("ListAppConfig", err)
            return {err: err, resp: null}
        } else {
            let resp = ListAppConfigResp.decode(pack) as any
            this.onBeforeResp("ListAppConfig", err, resp)
            return {err: null, resp: resp}
        }
    }
    async CheckUserPremiumCardExpire(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = base_Void.create(req)
        this.onBeforeReq("CheckUserPremiumCardExpire", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("CheckUserPremiumCardExpire", buffer, params)
        if (err) {
            this.onBeforeResp("CheckUserPremiumCardExpire", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("CheckUserPremiumCardExpire", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetUserFirstTimeRecord(req: IGetUserFirstTimeRecordReq, params?: RpcParams) : Promise<{err:number, resp:IGetUserFirstTimeRecordResp}> {
        let data = GetUserFirstTimeRecordReq.create(req)
        this.onBeforeReq("GetUserFirstTimeRecord", data, params)
        const buffer = GetUserFirstTimeRecordReq.encode(data).finish()
        let [err, pack] = await this.call("GetUserFirstTimeRecord", buffer, params)
        if (err) {
            this.onBeforeResp("GetUserFirstTimeRecord", err)
            return {err: err, resp: null}
        } else {
            let resp = GetUserFirstTimeRecordResp.decode(pack) as any
            this.onBeforeResp("GetUserFirstTimeRecord", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SyncAppConfig(req: base_IBatchGetResourceReq, params?: RpcParams) : Promise<{err:number, resp:base_IBatchGetResourceResp}> {
        let data = base_BatchGetResourceReq.create(req)
        this.onBeforeReq("SyncAppConfig", data, params)
        const buffer = base_BatchGetResourceReq.encode(data).finish()
        let [err, pack] = await this.call("SyncAppConfig", buffer, params)
        if (err) {
            this.onBeforeResp("SyncAppConfig", err)
            return {err: err, resp: null}
        } else {
            let resp = base_BatchGetResourceResp.decode(pack) as any
            this.onBeforeResp("SyncAppConfig", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetPremiumCardForSync(req: base_IBatchGetResourceReq, params?: RpcParams) : Promise<{err:number, resp:base_IBatchGetResourceResp}> {
        let data = base_BatchGetResourceReq.create(req)
        this.onBeforeReq("BatchGetPremiumCardForSync", data, params)
        const buffer = base_BatchGetResourceReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetPremiumCardForSync", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetPremiumCardForSync", err)
            return {err: err, resp: null}
        } else {
            let resp = base_BatchGetResourceResp.decode(pack) as any
            this.onBeforeResp("BatchGetPremiumCardForSync", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SaveCardConf(req: ISaveCardConfReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = SaveCardConfReq.create(req)
        this.onBeforeReq("SaveCardConf", data, params)
        const buffer = SaveCardConfReq.encode(data).finish()
        let [err, pack] = await this.call("SaveCardConf", buffer, params)
        if (err) {
            this.onBeforeResp("SaveCardConf", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("SaveCardConf", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListCardConfig(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:IListCardConfigResp}> {
        let data = base_Void.create(req)
        this.onBeforeReq("ListCardConfig", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("ListCardConfig", buffer, params)
        if (err) {
            this.onBeforeResp("ListCardConfig", err)
            return {err: err, resp: null}
        } else {
            let resp = ListCardConfigResp.decode(pack) as any
            this.onBeforeResp("ListCardConfig", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetCardConfigByType(req: IGetCardConfigByTypeReq, params?: RpcParams) : Promise<{err:number, resp:IGetCardConfigByTypeResp}> {
        let data = GetCardConfigByTypeReq.create(req)
        this.onBeforeReq("GetCardConfigByType", data, params)
        const buffer = GetCardConfigByTypeReq.encode(data).finish()
        let [err, pack] = await this.call("GetCardConfigByType", buffer, params)
        if (err) {
            this.onBeforeResp("GetCardConfigByType", err)
            return {err: err, resp: null}
        } else {
            let resp = GetCardConfigByTypeResp.decode(pack) as any
            this.onBeforeResp("GetCardConfigByType", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchSaveCardConf(req: IBatchSaveCardConfReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = BatchSaveCardConfReq.create(req)
        this.onBeforeReq("BatchSaveCardConf", data, params)
        const buffer = BatchSaveCardConfReq.encode(data).finish()
        let [err, pack] = await this.call("BatchSaveCardConf", buffer, params)
        if (err) {
            this.onBeforeResp("BatchSaveCardConf", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("BatchSaveCardConf", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetBadge(req: tss_hall_common_IBatchGetBadgeReq, params?: RpcParams) : Promise<{err:number, resp:tss_hall_common_IBatchGetBadgeResp}> {
        let data = tss_hall_common_BatchGetBadgeReq.create(req)
        this.onBeforeReq("BatchGetBadge", data, params)
        const buffer = tss_hall_common_BatchGetBadgeReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetBadge", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetBadge", err)
            return {err: err, resp: null}
        } else {
            let resp = tss_hall_common_BatchGetBadgeResp.decode(pack) as any
            this.onBeforeResp("BatchGetBadge", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GiveUserForeverCard(req: IGiveUserForeverCardReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = GiveUserForeverCardReq.create(req)
        this.onBeforeReq("GiveUserForeverCard", data, params)
        const buffer = GiveUserForeverCardReq.encode(data).finish()
        let [err, pack] = await this.call("GiveUserForeverCard", buffer, params)
        if (err) {
            this.onBeforeResp("GiveUserForeverCard", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("GiveUserForeverCard", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SaveOpenCardDurationConf(req: ISaveOpenCardDurationConfReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = SaveOpenCardDurationConfReq.create(req)
        this.onBeforeReq("SaveOpenCardDurationConf", data, params)
        const buffer = SaveOpenCardDurationConfReq.encode(data).finish()
        let [err, pack] = await this.call("SaveOpenCardDurationConf", buffer, params)
        if (err) {
            this.onBeforeResp("SaveOpenCardDurationConf", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("SaveOpenCardDurationConf", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetOpenCardDurationConf(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:IGetOpenCardDurationConfResp}> {
        let data = base_Void.create(req)
        this.onBeforeReq("GetOpenCardDurationConf", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("GetOpenCardDurationConf", buffer, params)
        if (err) {
            this.onBeforeResp("GetOpenCardDurationConf", err)
            return {err: err, resp: null}
        } else {
            let resp = GetOpenCardDurationConfResp.decode(pack) as any
            this.onBeforeResp("GetOpenCardDurationConf", err, resp)
            return {err: null, resp: resp}
        }
    }
    NotifyDeliverySuccess(data: Uint8Array, params: RpcParams) : {msg: IDeliverySuccessResp, eventID?: number} {
        let msg = DeliverySuccessResp.decode(data)
        return {msg: msg}
    }
    NotifyRenewSuccess(data: Uint8Array, params: RpcParams) : {msg: IRenewSuccessResp, eventID?: number} {
        let msg = RenewSuccessResp.decode(data)
        return {msg: msg}
    }
    NotifyInviteSuccess(data: Uint8Array, params: RpcParams) : {msg: IInviteSuccessResp, eventID?: number} {
        let msg = InviteSuccessResp.decode(data)
        return {msg: msg}
    }
}
export const premiumcard = new $premiumcard({
    name: "tss.hall.premiumcard.v1",
})
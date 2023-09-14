import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  Void as base_Void,IVoid as base_IVoid ,  BatchGetResourceReq as base_BatchGetResourceReq,IBatchGetResourceReq as base_IBatchGetResourceReq ,  BatchGetResourceResp as base_BatchGetResourceResp,IBatchGetResourceResp as base_IBatchGetResourceResp ,  } from "idl/base/base"
import {  AssetType as tss_common_AssetType ,  AssetExchangeRate as tss_common_AssetExchangeRate,IAssetExchangeRate as tss_common_IAssetExchangeRate ,  Way as tss_common_Way ,  Sign as tss_common_Sign ,  UserRobotFlag as tss_common_UserRobotFlag ,  PayChannel as tss_common_PayChannel ,  OS as tss_common_OS ,  } from "idl/tss/common/common_define"
import {  Code as tss_hall_Code ,  } from "idl/tss/hall/code"
import {  IncUserAssetsReq as tss_hall_common_IncUserAssetsReq,IIncUserAssetsReq as tss_hall_common_IIncUserAssetsReq ,  IncUserAssetsResp as tss_hall_common_IncUserAssetsResp,IIncUserAssetsResp as tss_hall_common_IIncUserAssetsResp ,  CalcIncUserAssetsReq as tss_hall_common_CalcIncUserAssetsReq,ICalcIncUserAssetsReq as tss_hall_common_ICalcIncUserAssetsReq ,  CalcIncUserAssetsResp as tss_hall_common_CalcIncUserAssetsResp,ICalcIncUserAssetsResp as tss_hall_common_ICalcIncUserAssetsResp ,  SaveIncUserAssetsReq as tss_hall_common_SaveIncUserAssetsReq,ISaveIncUserAssetsReq as tss_hall_common_ISaveIncUserAssetsReq ,  SaveIncUserAssetsResp as tss_hall_common_SaveIncUserAssetsResp,ISaveIncUserAssetsResp as tss_hall_common_ISaveIncUserAssetsResp ,  DecUserAssetsReq as tss_hall_common_DecUserAssetsReq,IDecUserAssetsReq as tss_hall_common_IDecUserAssetsReq ,  DecUserAssetsResp as tss_hall_common_DecUserAssetsResp,IDecUserAssetsResp as tss_hall_common_IDecUserAssetsResp ,  FillAssetsReq as tss_hall_common_FillAssetsReq,IFillAssetsReq as tss_hall_common_IFillAssetsReq ,  FillAssetsResp as tss_hall_common_FillAssetsResp,IFillAssetsResp as tss_hall_common_IFillAssetsResp ,  DynamicAssetItems as tss_hall_common_DynamicAssetItems,IDynamicAssetItems as tss_hall_common_IDynamicAssetItems ,  } from "idl/tss/hall/common/assets"
import {  DeliverProduct as tss_hall_common_DeliverProduct,IDeliverProduct as tss_hall_common_IDeliverProduct ,  } from "idl/tss/hall/common/mall"
export enum ProductState {  
    ProductStateUnknown = 0,  
    ProductStateOnline = 1,  
    ProductStateOffline = 2,
}
export enum FirstChargeWealType {  
    FirstChargeWealTypeUnknown = 0,  
    FirstChargeWealTypeDeduction = 1,  
    FirstChargeWealTypeGiving = 2,
}
export enum OrderStatus {  
    OrderStatusUnknown = 0,  
    OrderStatusPendingPayment = 1,  
    OrderStatusToBeDelivery = 2,  
    OrderStatusSuccess = 3,  
    OrderStatusFailed = 4,
}
export enum PopulartityBookType {  
    PopulartityBookTypeUnknown = 0,  
    PopulartityBookTypeOrdinary = 1,  
    PopulartityBookTypeWithdrawal = 2,
}
export enum PromotionType {  
    PromotionUnknown = 0,  
    PromotionGiving = 1,  
    PromotionDeduction = 2,  
    PromotionClosed = 3,
}
export interface IListUserAssetNumberReq {
    page?: number|null
    pageSize?: number|null
    assetType?: tss_common_AssetType|null
}
@protobuf.Type.d("tss_hall_wallet_v2_ListUserAssetNumberReq")
export class ListUserAssetNumberReq extends protobuf.Message<IListUserAssetNumberReq> {
    constructor(properties: Properties<IListUserAssetNumberReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.assetType) { this.assetType = properties.assetType }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(3, tss_common_AssetType, "optional", tss_common_AssetType.AssetTypeUnknown)
    public assetType?: tss_common_AssetType|null = tss_common_AssetType.AssetTypeUnknown
}
export interface IUserAssetNumber {
    uid?: number|null
    number?: number|null
}
@protobuf.Type.d("tss_hall_wallet_v2_UserAssetNumber")
export class UserAssetNumber extends protobuf.Message<IUserAssetNumber> {
    constructor(properties: Properties<IUserAssetNumber>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.number) { this.number = properties.number }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public number?: number|null = 0
}
export interface IAssetConfig {
    type?: tss_common_AssetType|null
    name?: string|null
    img?: string|null
    icon?: string|null
    desc?: string|null
    updateAt?: number|null
    operator?: string|null
    AERate?: tss_common_IAssetExchangeRate
}
@protobuf.Type.d("tss_hall_wallet_v2_AssetConfig")
export class AssetConfig extends protobuf.Message<IAssetConfig> {
    constructor(properties: Properties<IAssetConfig>) {
        super(properties);
        if (properties) {
            if (properties.type) { this.type = properties.type }
            if (properties.name) { this.name = properties.name }
            if (properties.img) { this.img = properties.img }
            if (properties.icon) { this.icon = properties.icon }
            if (properties.desc) { this.desc = properties.desc }
            if (properties.updateAt) { this.updateAt = properties.updateAt }
            if (properties.operator) { this.operator = properties.operator }
            if (properties.AERate) { this.AERate = tss_common_AssetExchangeRate.create(properties.AERate) as any }
        }
	}
    @protobuf.Field.d(1, tss_common_AssetType, "optional", tss_common_AssetType.AssetTypeUnknown)
    public type?: tss_common_AssetType|null = tss_common_AssetType.AssetTypeUnknown
    @protobuf.Field.d(2, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public img?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public icon?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public desc?: string|null = ""
    @protobuf.Field.d(6, "int64", "optional", 0)
    public updateAt?: number|null = 0
    @protobuf.Field.d(7, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(8, "tss_common_AssetExchangeRate", "optional")
    public AERate?: tss_common_AssetExchangeRate|null
}
export interface IListUserAssetNumberResp {
    userAssetNumbers?: IUserAssetNumber[]
}
@protobuf.Type.d("tss_hall_wallet_v2_ListUserAssetNumberResp")
export class ListUserAssetNumberResp extends protobuf.Message<IListUserAssetNumberResp> {
    constructor(properties: Properties<IListUserAssetNumberResp>) {
        super(properties);
        if (properties) {
            if (properties.userAssetNumbers) { this.userAssetNumbers = []; properties.userAssetNumbers.forEach((value, index)=>{this.userAssetNumbers[index] = UserAssetNumber.create(properties.userAssetNumbers[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_wallet_v2_UserAssetNumber", "repeated")
    public userAssetNumbers?: UserAssetNumber[] = []
}
export interface ISaveAssetConfigReq {
    asset?: IAssetConfig
}
@protobuf.Type.d("tss_hall_wallet_v2_SaveAssetConfigReq")
export class SaveAssetConfigReq extends protobuf.Message<ISaveAssetConfigReq> {
    constructor(properties: Properties<ISaveAssetConfigReq>) {
        super(properties);
        if (properties) {
            if (properties.asset) { this.asset = AssetConfig.create(properties.asset) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_wallet_v2_AssetConfig", "optional")
    public asset?: AssetConfig|null
}
export interface IGetAssetConfigReq {
    type?: tss_common_AssetType|null
}
@protobuf.Type.d("tss_hall_wallet_v2_GetAssetConfigReq")
export class GetAssetConfigReq extends protobuf.Message<IGetAssetConfigReq> {
    constructor(properties: Properties<IGetAssetConfigReq>) {
        super(properties);
        if (properties) {
            if (properties.type) { this.type = properties.type }
        }
	}
    @protobuf.Field.d(1, tss_common_AssetType, "optional", tss_common_AssetType.AssetTypeUnknown)
    public type?: tss_common_AssetType|null = tss_common_AssetType.AssetTypeUnknown
}
export interface IGetAssetConfigResp {
    asset?: IAssetConfig
}
@protobuf.Type.d("tss_hall_wallet_v2_GetAssetConfigResp")
export class GetAssetConfigResp extends protobuf.Message<IGetAssetConfigResp> {
    constructor(properties: Properties<IGetAssetConfigResp>) {
        super(properties);
        if (properties) {
            if (properties.asset) { this.asset = AssetConfig.create(properties.asset) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_wallet_v2_AssetConfig", "optional")
    public asset?: AssetConfig|null
}
export interface IUserAssetChangeItem {
    assetType?: tss_common_AssetType|null
    amount?: number|null
    extraJson?: string|null
    markupAmount?: number|null
}
@protobuf.Type.d("tss_hall_wallet_v2_UserAssetChangeItem")
export class UserAssetChangeItem extends protobuf.Message<IUserAssetChangeItem> {
    constructor(properties: Properties<IUserAssetChangeItem>) {
        super(properties);
        if (properties) {
            if (properties.assetType) { this.assetType = properties.assetType }
            if (properties.amount) { this.amount = properties.amount }
            if (properties.extraJson) { this.extraJson = properties.extraJson }
            if (properties.markupAmount) { this.markupAmount = properties.markupAmount }
        }
	}
    @protobuf.Field.d(1, tss_common_AssetType, "optional", tss_common_AssetType.AssetTypeUnknown)
    public assetType?: tss_common_AssetType|null = tss_common_AssetType.AssetTypeUnknown
    @protobuf.Field.d(2, "int64", "optional", 0)
    public amount?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public extraJson?: string|null = ""
    @protobuf.Field.d(4, "int64", "optional", 0)
    public markupAmount?: number|null = 0
}
export interface IUserAssetChangeStamp {
    way?: tss_common_Way|null
    operator?: string|null
    scene?: { [k: string]: string|null }
}
@protobuf.Type.d("tss_hall_wallet_v2_UserAssetChangeStamp")
export class UserAssetChangeStamp extends protobuf.Message<IUserAssetChangeStamp> {
    constructor(properties: Properties<IUserAssetChangeStamp>) {
        super(properties);
        if (properties) {
            if (properties.way) { this.way = properties.way }
            if (properties.operator) { this.operator = properties.operator }
            if (properties.scene) { this.scene = properties.scene }
        }
	}
    @protobuf.Field.d(1, tss_common_Way, "optional", tss_common_Way.WayNone)
    public way?: tss_common_Way|null = tss_common_Way.WayNone
    @protobuf.Field.d(2, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.MapField.d(3, "string", "string")
    public scene?: { [k: string]: string|null } = {}
}
export interface IUserAssetChange {
    uid?: number|null
    item?: IUserAssetChangeItem
    stamp?: IUserAssetChangeStamp
}
@protobuf.Type.d("tss_hall_wallet_v2_UserAssetChange")
export class UserAssetChange extends protobuf.Message<IUserAssetChange> {
    constructor(properties: Properties<IUserAssetChange>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.item) { this.item = UserAssetChangeItem.create(properties.item) as any }
            if (properties.stamp) { this.stamp = UserAssetChangeStamp.create(properties.stamp) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "tss_hall_wallet_v2_UserAssetChangeItem", "optional")
    public item?: UserAssetChangeItem|null
    @protobuf.Field.d(3, "tss_hall_wallet_v2_UserAssetChangeStamp", "optional")
    public stamp?: UserAssetChangeStamp|null
}
export interface IIncUserAssetReq {
    change?: IUserAssetChange
}
@protobuf.Type.d("tss_hall_wallet_v2_IncUserAssetReq")
export class IncUserAssetReq extends protobuf.Message<IIncUserAssetReq> {
    constructor(properties: Properties<IIncUserAssetReq>) {
        super(properties);
        if (properties) {
            if (properties.change) { this.change = UserAssetChange.create(properties.change) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_wallet_v2_UserAssetChange", "optional")
    public change?: UserAssetChange|null
}
export interface IIncUserAssetResp {
    batchID?: string|null
    markupIncAmount?: number|null
    markupRate?: number|null
    changeAmount?: number|null
    totalAmount?: number|null
    assets?: tss_hall_common_IDynamicAssetItems[]
}
@protobuf.Type.d("tss_hall_wallet_v2_IncUserAssetResp")
export class IncUserAssetResp extends protobuf.Message<IIncUserAssetResp> {
    constructor(properties: Properties<IIncUserAssetResp>) {
        super(properties);
        if (properties) {
            if (properties.batchID) { this.batchID = properties.batchID }
            if (properties.markupIncAmount) { this.markupIncAmount = properties.markupIncAmount }
            if (properties.markupRate) { this.markupRate = properties.markupRate }
            if (properties.changeAmount) { this.changeAmount = properties.changeAmount }
            if (properties.totalAmount) { this.totalAmount = properties.totalAmount }
            if (properties.assets) { this.assets = []; properties.assets.forEach((value, index)=>{this.assets[index] = tss_hall_common_DynamicAssetItems.create(properties.assets[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public batchID?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public markupIncAmount?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public markupRate?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public changeAmount?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public totalAmount?: number|null = 0
    @protobuf.Field.d(6, "tss_hall_common_DynamicAssetItems", "repeated")
    public assets?: tss_hall_common_DynamicAssetItems[] = []
}
export interface IGetBatchIdReq {
    uid?: number|null
    assetType?: tss_common_AssetType|null
}
@protobuf.Type.d("tss_hall_wallet_v2_GetBatchIdReq")
export class GetBatchIdReq extends protobuf.Message<IGetBatchIdReq> {
    constructor(properties: Properties<IGetBatchIdReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.assetType) { this.assetType = properties.assetType }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, tss_common_AssetType, "optional", tss_common_AssetType.AssetTypeUnknown)
    public assetType?: tss_common_AssetType|null = tss_common_AssetType.AssetTypeUnknown
}
export interface IGetBatchIdResp {
    batchID?: string|null
}
@protobuf.Type.d("tss_hall_wallet_v2_GetBatchIdResp")
export class GetBatchIdResp extends protobuf.Message<IGetBatchIdResp> {
    constructor(properties: Properties<IGetBatchIdResp>) {
        super(properties);
        if (properties) {
            if (properties.batchID) { this.batchID = properties.batchID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public batchID?: string|null = ""
}
export interface IBatchIncUserAssetReq {
    changes?: IUserAssetChange[]
    assetType?: tss_common_AssetType|null
    uid?: number|null
}
@protobuf.Type.d("tss_hall_wallet_v2_BatchIncUserAssetReq")
export class BatchIncUserAssetReq extends protobuf.Message<IBatchIncUserAssetReq> {
    constructor(properties: Properties<IBatchIncUserAssetReq>) {
        super(properties);
        if (properties) {
            if (properties.changes) { this.changes = []; properties.changes.forEach((value, index)=>{this.changes[index] = UserAssetChange.create(properties.changes[index]) as any})}
            if (properties.assetType) { this.assetType = properties.assetType }
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "tss_hall_wallet_v2_UserAssetChange", "repeated")
    public changes?: UserAssetChange[] = []
    @protobuf.Field.d(2, tss_common_AssetType, "optional", tss_common_AssetType.AssetTypeUnknown)
    public assetType?: tss_common_AssetType|null = tss_common_AssetType.AssetTypeUnknown
    @protobuf.Field.d(3, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IBatchIncUserAssetResp {
    batchID?: string|null
    markupIncAmount?: number|null
    markupRate?: number|null
    changeAmount?: number|null
    totalAmount?: number|null
    assets?: tss_hall_common_IDynamicAssetItems[]
}
@protobuf.Type.d("tss_hall_wallet_v2_BatchIncUserAssetResp")
export class BatchIncUserAssetResp extends protobuf.Message<IBatchIncUserAssetResp> {
    constructor(properties: Properties<IBatchIncUserAssetResp>) {
        super(properties);
        if (properties) {
            if (properties.batchID) { this.batchID = properties.batchID }
            if (properties.markupIncAmount) { this.markupIncAmount = properties.markupIncAmount }
            if (properties.markupRate) { this.markupRate = properties.markupRate }
            if (properties.changeAmount) { this.changeAmount = properties.changeAmount }
            if (properties.totalAmount) { this.totalAmount = properties.totalAmount }
            if (properties.assets) { this.assets = []; properties.assets.forEach((value, index)=>{this.assets[index] = tss_hall_common_DynamicAssetItems.create(properties.assets[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public batchID?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public markupIncAmount?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public markupRate?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public changeAmount?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public totalAmount?: number|null = 0
    @protobuf.Field.d(6, "tss_hall_common_DynamicAssetItems", "repeated")
    public assets?: tss_hall_common_DynamicAssetItems[] = []
}
export interface IDecUserAssetReq {
    change?: IUserAssetChange
}
@protobuf.Type.d("tss_hall_wallet_v2_DecUserAssetReq")
export class DecUserAssetReq extends protobuf.Message<IDecUserAssetReq> {
    constructor(properties: Properties<IDecUserAssetReq>) {
        super(properties);
        if (properties) {
            if (properties.change) { this.change = UserAssetChange.create(properties.change) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_wallet_v2_UserAssetChange", "optional")
    public change?: UserAssetChange|null
}
export interface IDecUserAssetResp {
    code?: tss_hall_Code|null
    batchID?: string|null
    changeAmount?: number|null
    totalAmount?: number|null
}
@protobuf.Type.d("tss_hall_wallet_v2_DecUserAssetResp")
export class DecUserAssetResp extends protobuf.Message<IDecUserAssetResp> {
    constructor(properties: Properties<IDecUserAssetResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.batchID) { this.batchID = properties.batchID }
            if (properties.changeAmount) { this.changeAmount = properties.changeAmount }
            if (properties.totalAmount) { this.totalAmount = properties.totalAmount }
        }
	}
    @protobuf.Field.d(1, tss_hall_Code, "optional", tss_hall_Code.CODE_SUCCEED)
    public code?: tss_hall_Code|null = tss_hall_Code.CODE_SUCCEED
    @protobuf.Field.d(2, "string", "optional", )
    public batchID?: string|null = ""
    @protobuf.Field.d(3, "int64", "optional", 0)
    public changeAmount?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public totalAmount?: number|null = 0
}
export interface IRefundUserAssetReq {
    batchID?: string|null
}
@protobuf.Type.d("tss_hall_wallet_v2_RefundUserAssetReq")
export class RefundUserAssetReq extends protobuf.Message<IRefundUserAssetReq> {
    constructor(properties: Properties<IRefundUserAssetReq>) {
        super(properties);
        if (properties) {
            if (properties.batchID) { this.batchID = properties.batchID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public batchID?: string|null = ""
}
export interface IRefundUserAssetResp {
    refundBatchID?: string|null
}
@protobuf.Type.d("tss_hall_wallet_v2_RefundUserAssetResp")
export class RefundUserAssetResp extends protobuf.Message<IRefundUserAssetResp> {
    constructor(properties: Properties<IRefundUserAssetResp>) {
        super(properties);
        if (properties) {
            if (properties.refundBatchID) { this.refundBatchID = properties.refundBatchID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public refundBatchID?: string|null = ""
}
export interface IGetUserAssetReq {
    uid?: number|null
    assetType?: tss_common_AssetType|null
}
@protobuf.Type.d("tss_hall_wallet_v2_GetUserAssetReq")
export class GetUserAssetReq extends protobuf.Message<IGetUserAssetReq> {
    constructor(properties: Properties<IGetUserAssetReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.assetType) { this.assetType = properties.assetType }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, tss_common_AssetType, "optional", tss_common_AssetType.AssetTypeUnknown)
    public assetType?: tss_common_AssetType|null = tss_common_AssetType.AssetTypeUnknown
}
export interface IUserAsset {
    uid?: number|null
    amount?: number|null
    name?: string|null
    img?: string|null
    icon?: string|null
    desc?: string|null
}
@protobuf.Type.d("tss_hall_wallet_v2_UserAsset")
export class UserAsset extends protobuf.Message<IUserAsset> {
    constructor(properties: Properties<IUserAsset>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.amount) { this.amount = properties.amount }
            if (properties.name) { this.name = properties.name }
            if (properties.img) { this.img = properties.img }
            if (properties.icon) { this.icon = properties.icon }
            if (properties.desc) { this.desc = properties.desc }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public amount?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public img?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public icon?: string|null = ""
    @protobuf.Field.d(6, "string", "optional", )
    public desc?: string|null = ""
}
export interface IGetUserAssetResp {
    userAsset?: IUserAsset
}
@protobuf.Type.d("tss_hall_wallet_v2_GetUserAssetResp")
export class GetUserAssetResp extends protobuf.Message<IGetUserAssetResp> {
    constructor(properties: Properties<IGetUserAssetResp>) {
        super(properties);
        if (properties) {
            if (properties.userAsset) { this.userAsset = UserAsset.create(properties.userAsset) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_wallet_v2_UserAsset", "optional")
    public userAsset?: UserAsset|null
}
export interface IUserAssetLog {
    uid?: number|null
    changeAmount?: number|null
    sign?: tss_common_Sign|null
    balanceAmount?: number|null
    way?: tss_common_Way|null
    batchId?: string|null
    operator?: string|null
    extraJson?: string|null
    createAt?: number|null
    urf?: tss_common_UserRobotFlag|null
    wayString?: string|null
}
@protobuf.Type.d("tss_hall_wallet_v2_UserAssetLog")
export class UserAssetLog extends protobuf.Message<IUserAssetLog> {
    constructor(properties: Properties<IUserAssetLog>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.changeAmount) { this.changeAmount = properties.changeAmount }
            if (properties.sign) { this.sign = properties.sign }
            if (properties.balanceAmount) { this.balanceAmount = properties.balanceAmount }
            if (properties.way) { this.way = properties.way }
            if (properties.batchId) { this.batchId = properties.batchId }
            if (properties.operator) { this.operator = properties.operator }
            if (properties.extraJson) { this.extraJson = properties.extraJson }
            if (properties.createAt) { this.createAt = properties.createAt }
            if (properties.urf) { this.urf = properties.urf }
            if (properties.wayString) { this.wayString = properties.wayString }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public changeAmount?: number|null = 0
    @protobuf.Field.d(3, tss_common_Sign, "optional", tss_common_Sign.SignUnknown)
    public sign?: tss_common_Sign|null = tss_common_Sign.SignUnknown
    @protobuf.Field.d(4, "int64", "optional", 0)
    public balanceAmount?: number|null = 0
    @protobuf.Field.d(5, tss_common_Way, "optional", tss_common_Way.WayNone)
    public way?: tss_common_Way|null = tss_common_Way.WayNone
    @protobuf.Field.d(6, "string", "optional", )
    public batchId?: string|null = ""
    @protobuf.Field.d(7, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(8, "string", "optional", )
    public extraJson?: string|null = ""
    @protobuf.Field.d(9, "int64", "optional", 0)
    public createAt?: number|null = 0
    @protobuf.Field.d(10, tss_common_UserRobotFlag, "optional", tss_common_UserRobotFlag.UserRobotFlagUnknown)
    public urf?: tss_common_UserRobotFlag|null = tss_common_UserRobotFlag.UserRobotFlagUnknown
    @protobuf.Field.d(11, "string", "optional", )
    public wayString?: string|null = ""
}
export interface IListUserAssetLogReq {
    uid?: number|null
    assetType?: tss_common_AssetType|null
    startAt?: number|null
    endAt?: number|null
    page?: number|null
    pageSize?: number|null
    way?: tss_common_Way|null
    lastPageIndex?: string|null
}
@protobuf.Type.d("tss_hall_wallet_v2_ListUserAssetLogReq")
export class ListUserAssetLogReq extends protobuf.Message<IListUserAssetLogReq> {
    constructor(properties: Properties<IListUserAssetLogReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.assetType) { this.assetType = properties.assetType }
            if (properties.startAt) { this.startAt = properties.startAt }
            if (properties.endAt) { this.endAt = properties.endAt }
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.way) { this.way = properties.way }
            if (properties.lastPageIndex) { this.lastPageIndex = properties.lastPageIndex }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, tss_common_AssetType, "optional", tss_common_AssetType.AssetTypeUnknown)
    public assetType?: tss_common_AssetType|null = tss_common_AssetType.AssetTypeUnknown
    @protobuf.Field.d(3, "int64", "optional", 0)
    public startAt?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public endAt?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(6, "int64", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(7, tss_common_Way, "optional", tss_common_Way.WayNone)
    public way?: tss_common_Way|null = tss_common_Way.WayNone
    @protobuf.Field.d(8, "string", "optional", )
    public lastPageIndex?: string|null = ""
}
export interface IGetUserAssetLogCntReq {
    uid?: number|null
    assetType?: tss_common_AssetType|null
    startAt?: number|null
    endAt?: number|null
    way?: tss_common_Way|null
}
@protobuf.Type.d("tss_hall_wallet_v2_GetUserAssetLogCntReq")
export class GetUserAssetLogCntReq extends protobuf.Message<IGetUserAssetLogCntReq> {
    constructor(properties: Properties<IGetUserAssetLogCntReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.assetType) { this.assetType = properties.assetType }
            if (properties.startAt) { this.startAt = properties.startAt }
            if (properties.endAt) { this.endAt = properties.endAt }
            if (properties.way) { this.way = properties.way }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, tss_common_AssetType, "optional", tss_common_AssetType.AssetTypeUnknown)
    public assetType?: tss_common_AssetType|null = tss_common_AssetType.AssetTypeUnknown
    @protobuf.Field.d(3, "int64", "optional", 0)
    public startAt?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public endAt?: number|null = 0
    @protobuf.Field.d(7, tss_common_Way, "optional", tss_common_Way.WayNone)
    public way?: tss_common_Way|null = tss_common_Way.WayNone
}
export interface IGetUserAssetLogCntResp {
    total?: number|null
}
@protobuf.Type.d("tss_hall_wallet_v2_GetUserAssetLogCntResp")
export class GetUserAssetLogCntResp extends protobuf.Message<IGetUserAssetLogCntResp> {
    constructor(properties: Properties<IGetUserAssetLogCntResp>) {
        super(properties);
        if (properties) {
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public total?: number|null = 0
}
export interface IListUserAssetLogResp {
    logs?: IUserAssetLog[]
    totalSize?: number|null
    lastPageIndex?: string|null
}
@protobuf.Type.d("tss_hall_wallet_v2_ListUserAssetLogResp")
export class ListUserAssetLogResp extends protobuf.Message<IListUserAssetLogResp> {
    constructor(properties: Properties<IListUserAssetLogResp>) {
        super(properties);
        if (properties) {
            if (properties.logs) { this.logs = []; properties.logs.forEach((value, index)=>{this.logs[index] = UserAssetLog.create(properties.logs[index]) as any})}
            if (properties.totalSize) { this.totalSize = properties.totalSize }
            if (properties.lastPageIndex) { this.lastPageIndex = properties.lastPageIndex }
        }
	}
    @protobuf.Field.d(1, "tss_hall_wallet_v2_UserAssetLog", "repeated")
    public logs?: UserAssetLog[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public totalSize?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public lastPageIndex?: string|null = ""
}
export interface IGetUserAssetStatsReq {
    uid?: number|null
    assetType?: tss_common_AssetType|null
    sign?: tss_common_Sign|null
}
@protobuf.Type.d("tss_hall_wallet_v2_GetUserAssetStatsReq")
export class GetUserAssetStatsReq extends protobuf.Message<IGetUserAssetStatsReq> {
    constructor(properties: Properties<IGetUserAssetStatsReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.assetType) { this.assetType = properties.assetType }
            if (properties.sign) { this.sign = properties.sign }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, tss_common_AssetType, "optional", tss_common_AssetType.AssetTypeUnknown)
    public assetType?: tss_common_AssetType|null = tss_common_AssetType.AssetTypeUnknown
    @protobuf.Field.d(3, tss_common_Sign, "optional", tss_common_Sign.SignUnknown)
    public sign?: tss_common_Sign|null = tss_common_Sign.SignUnknown
}
export interface IUserAssetStats {
    uid?: number|null
    sign?: tss_common_Sign|null
    amount?: number|null
}
@protobuf.Type.d("tss_hall_wallet_v2_UserAssetStats")
export class UserAssetStats extends protobuf.Message<IUserAssetStats> {
    constructor(properties: Properties<IUserAssetStats>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.sign) { this.sign = properties.sign }
            if (properties.amount) { this.amount = properties.amount }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, tss_common_Sign, "optional", tss_common_Sign.SignUnknown)
    public sign?: tss_common_Sign|null = tss_common_Sign.SignUnknown
    @protobuf.Field.d(3, "int64", "optional", 0)
    public amount?: number|null = 0
}
export interface IGetUserAssetStatsResp {
    stats?: IUserAssetStats
}
@protobuf.Type.d("tss_hall_wallet_v2_GetUserAssetStatsResp")
export class GetUserAssetStatsResp extends protobuf.Message<IGetUserAssetStatsResp> {
    constructor(properties: Properties<IGetUserAssetStatsResp>) {
        super(properties);
        if (properties) {
            if (properties.stats) { this.stats = UserAssetStats.create(properties.stats) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_wallet_v2_UserAssetStats", "optional")
    public stats?: UserAssetStats|null
}
export interface IPromotion {
    type?: PromotionType|null
    value?: number|null
}
@protobuf.Type.d("tss_hall_wallet_v2_Promotion")
export class Promotion extends protobuf.Message<IPromotion> {
    constructor(properties: Properties<IPromotion>) {
        super(properties);
        if (properties) {
            if (properties.type) { this.type = properties.type }
            if (properties.value) { this.value = properties.value }
        }
	}
    @protobuf.Field.d(1, PromotionType, "optional", PromotionType.PromotionUnknown)
    public type?: PromotionType|null = PromotionType.PromotionUnknown
    @protobuf.Field.d(2, "int64", "optional", 0)
    public value?: number|null = 0
}
export interface IFirstChargeWeal {
    type?: FirstChargeWealType|null
    value?: number|null
}
@protobuf.Type.d("tss_hall_wallet_v2_FirstChargeWeal")
export class FirstChargeWeal extends protobuf.Message<IFirstChargeWeal> {
    constructor(properties: Properties<IFirstChargeWeal>) {
        super(properties);
        if (properties) {
            if (properties.type) { this.type = properties.type }
            if (properties.value) { this.value = properties.value }
        }
	}
    @protobuf.Field.d(1, FirstChargeWealType, "optional", FirstChargeWealType.FirstChargeWealTypeUnknown)
    public type?: FirstChargeWealType|null = FirstChargeWealType.FirstChargeWealTypeUnknown
    @protobuf.Field.d(2, "int64", "optional", 0)
    public value?: number|null = 0
}
export interface IDiamondProduct {
    id?: number|null
    amount?: number|null
    iosPrice?: number|null
    androidPrice?: number|null
    iosProductId?: string|null
    givingPoint?: number|null
    growthValue?: number|null
    state?: ProductState|null
    firstChargeWealType?: FirstChargeWealType|null
    firstChargeWealValue?: number|null
    updateAt?: number|null
    beginAt?: number|null
    endAt?: number|null
    operator?: string|null
    img?: string|null
    sort?: number|null
    promotion?: IPromotion
    applicationId?: string|null
}
@protobuf.Type.d("tss_hall_wallet_v2_DiamondProduct")
export class DiamondProduct extends protobuf.Message<IDiamondProduct> {
    constructor(properties: Properties<IDiamondProduct>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.amount) { this.amount = properties.amount }
            if (properties.iosPrice) { this.iosPrice = properties.iosPrice }
            if (properties.androidPrice) { this.androidPrice = properties.androidPrice }
            if (properties.iosProductId) { this.iosProductId = properties.iosProductId }
            if (properties.givingPoint) { this.givingPoint = properties.givingPoint }
            if (properties.growthValue) { this.growthValue = properties.growthValue }
            if (properties.state) { this.state = properties.state }
            if (properties.firstChargeWealType) { this.firstChargeWealType = properties.firstChargeWealType }
            if (properties.firstChargeWealValue) { this.firstChargeWealValue = properties.firstChargeWealValue }
            if (properties.updateAt) { this.updateAt = properties.updateAt }
            if (properties.beginAt) { this.beginAt = properties.beginAt }
            if (properties.endAt) { this.endAt = properties.endAt }
            if (properties.operator) { this.operator = properties.operator }
            if (properties.img) { this.img = properties.img }
            if (properties.sort) { this.sort = properties.sort }
            if (properties.promotion) { this.promotion = Promotion.create(properties.promotion) as any }
            if (properties.applicationId) { this.applicationId = properties.applicationId }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public id?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public amount?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public iosPrice?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public androidPrice?: number|null = 0
    @protobuf.Field.d(5, "string", "optional", )
    public iosProductId?: string|null = ""
    @protobuf.Field.d(6, "int64", "optional", 0)
    public givingPoint?: number|null = 0
    @protobuf.Field.d(7, "int64", "optional", 0)
    public growthValue?: number|null = 0
    @protobuf.Field.d(8, ProductState, "optional", ProductState.ProductStateUnknown)
    public state?: ProductState|null = ProductState.ProductStateUnknown
    @protobuf.Field.d(9, FirstChargeWealType, "optional", FirstChargeWealType.FirstChargeWealTypeUnknown)
    public firstChargeWealType?: FirstChargeWealType|null = FirstChargeWealType.FirstChargeWealTypeUnknown
    @protobuf.Field.d(10, "int64", "optional", 0)
    public firstChargeWealValue?: number|null = 0
    @protobuf.Field.d(11, "int64", "optional", 0)
    public updateAt?: number|null = 0
    @protobuf.Field.d(12, "int64", "optional", 0)
    public beginAt?: number|null = 0
    @protobuf.Field.d(13, "int64", "optional", 0)
    public endAt?: number|null = 0
    @protobuf.Field.d(14, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(15, "string", "optional", )
    public img?: string|null = ""
    @protobuf.Field.d(16, "int64", "optional", 0)
    public sort?: number|null = 0
    @protobuf.Field.d(17, "tss_hall_wallet_v2_Promotion", "optional")
    public promotion?: Promotion|null
    @protobuf.Field.d(19, "string", "optional", )
    public applicationId?: string|null = ""
}
export interface ISaveDiamondProductResp {
    product?: IDiamondProduct
}
@protobuf.Type.d("tss_hall_wallet_v2_SaveDiamondProductResp")
export class SaveDiamondProductResp extends protobuf.Message<ISaveDiamondProductResp> {
    constructor(properties: Properties<ISaveDiamondProductResp>) {
        super(properties);
        if (properties) {
            if (properties.product) { this.product = DiamondProduct.create(properties.product) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_wallet_v2_DiamondProduct", "optional")
    public product?: DiamondProduct|null
}
export interface IListDiamondProductReq {
    page?: number|null
    pageSize?: number|null
    state?: ProductState|null
    applicationId?: string|null
}
@protobuf.Type.d("tss_hall_wallet_v2_ListDiamondProductReq")
export class ListDiamondProductReq extends protobuf.Message<IListDiamondProductReq> {
    constructor(properties: Properties<IListDiamondProductReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.state) { this.state = properties.state }
            if (properties.applicationId) { this.applicationId = properties.applicationId }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(3, ProductState, "optional", ProductState.ProductStateUnknown)
    public state?: ProductState|null = ProductState.ProductStateUnknown
    @protobuf.Field.d(4, "string", "optional", )
    public applicationId?: string|null = ""
}
export interface IListDiamondProductResp {
    products?: IDiamondProduct[]
    totalSize?: number|null
}
@protobuf.Type.d("tss_hall_wallet_v2_ListDiamondProductResp")
export class ListDiamondProductResp extends protobuf.Message<IListDiamondProductResp> {
    constructor(properties: Properties<IListDiamondProductResp>) {
        super(properties);
        if (properties) {
            if (properties.products) { this.products = []; properties.products.forEach((value, index)=>{this.products[index] = DiamondProduct.create(properties.products[index]) as any})}
            if (properties.totalSize) { this.totalSize = properties.totalSize }
        }
	}
    @protobuf.Field.d(1, "tss_hall_wallet_v2_DiamondProduct", "repeated")
    public products?: DiamondProduct[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public totalSize?: number|null = 0
}
export interface IDeleteDiamondProductReq {
    id?: number|null
}
@protobuf.Type.d("tss_hall_wallet_v2_DeleteDiamondProductReq")
export class DeleteDiamondProductReq extends protobuf.Message<IDeleteDiamondProductReq> {
    constructor(properties: Properties<IDeleteDiamondProductReq>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public id?: number|null = 0
}
export interface IUserDiamondProduct {
    id?: number|null
    amount?: number|null
    applePrice?: number|null
    androidPrice?: number|null
    appleProductId?: string|null
    firstChargeWealType?: FirstChargeWealType|null
    firstChargeWealValue?: number|null
    givingPoint?: number|null
    growthValue?: number|null
    firstTime?: boolean|null
    img?: string|null
    sort?: number|null
    promotion?: IPromotion
}
@protobuf.Type.d("tss_hall_wallet_v2_UserDiamondProduct")
export class UserDiamondProduct extends protobuf.Message<IUserDiamondProduct> {
    constructor(properties: Properties<IUserDiamondProduct>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.amount) { this.amount = properties.amount }
            if (properties.applePrice) { this.applePrice = properties.applePrice }
            if (properties.androidPrice) { this.androidPrice = properties.androidPrice }
            if (properties.appleProductId) { this.appleProductId = properties.appleProductId }
            if (properties.firstChargeWealType) { this.firstChargeWealType = properties.firstChargeWealType }
            if (properties.firstChargeWealValue) { this.firstChargeWealValue = properties.firstChargeWealValue }
            if (properties.givingPoint) { this.givingPoint = properties.givingPoint }
            if (properties.growthValue) { this.growthValue = properties.growthValue }
            if (properties.firstTime) { this.firstTime = properties.firstTime }
            if (properties.img) { this.img = properties.img }
            if (properties.sort) { this.sort = properties.sort }
            if (properties.promotion) { this.promotion = Promotion.create(properties.promotion) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public id?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public amount?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public applePrice?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public androidPrice?: number|null = 0
    @protobuf.Field.d(5, "string", "optional", )
    public appleProductId?: string|null = ""
    @protobuf.Field.d(6, FirstChargeWealType, "optional", FirstChargeWealType.FirstChargeWealTypeUnknown)
    public firstChargeWealType?: FirstChargeWealType|null = FirstChargeWealType.FirstChargeWealTypeUnknown
    @protobuf.Field.d(7, "int64", "optional", 0)
    public firstChargeWealValue?: number|null = 0
    @protobuf.Field.d(8, "int64", "optional", 0)
    public givingPoint?: number|null = 0
    @protobuf.Field.d(9, "int64", "optional", 0)
    public growthValue?: number|null = 0
    @protobuf.Field.d(10, "bool", "optional", false)
    public firstTime?: boolean|null = false
    @protobuf.Field.d(11, "string", "optional", )
    public img?: string|null = ""
    @protobuf.Field.d(16, "int64", "optional", 0)
    public sort?: number|null = 0
    @protobuf.Field.d(17, "tss_hall_wallet_v2_Promotion", "optional")
    public promotion?: Promotion|null
}
export interface IListUserDiamondProductReq {
    uid?: number|null
}
@protobuf.Type.d("tss_hall_wallet_v2_ListUserDiamondProductReq")
export class ListUserDiamondProductReq extends protobuf.Message<IListUserDiamondProductReq> {
    constructor(properties: Properties<IListUserDiamondProductReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IListUserDiamondProductResp {
    products?: IUserDiamondProduct[]
}
@protobuf.Type.d("tss_hall_wallet_v2_ListUserDiamondProductResp")
export class ListUserDiamondProductResp extends protobuf.Message<IListUserDiamondProductResp> {
    constructor(properties: Properties<IListUserDiamondProductResp>) {
        super(properties);
        if (properties) {
            if (properties.products) { this.products = []; properties.products.forEach((value, index)=>{this.products[index] = UserDiamondProduct.create(properties.products[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_wallet_v2_UserDiamondProduct", "repeated")
    public products?: UserDiamondProduct[] = []
}
export interface IUserPoint {
    uid?: number|null
    amount?: number|null
    year?: number|null
    showExpire?: boolean|null
}
@protobuf.Type.d("tss_hall_wallet_v2_UserPoint")
export class UserPoint extends protobuf.Message<IUserPoint> {
    constructor(properties: Properties<IUserPoint>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.amount) { this.amount = properties.amount }
            if (properties.year) { this.year = properties.year }
            if (properties.showExpire) { this.showExpire = properties.showExpire }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public amount?: number|null = 0
    @protobuf.Field.d(3, "int32", "optional", 0)
    public year?: number|null = 0
    @protobuf.Field.d(4, "bool", "optional", false)
    public showExpire?: boolean|null = false
}
export interface IIncUserPointReq {
    uid?: number|null
    amount?: number|null
    way?: tss_common_Way|null
    extraJson?: string|null
}
@protobuf.Type.d("tss_hall_wallet_v2_IncUserPointReq")
export class IncUserPointReq extends protobuf.Message<IIncUserPointReq> {
    constructor(properties: Properties<IIncUserPointReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.amount) { this.amount = properties.amount }
            if (properties.way) { this.way = properties.way }
            if (properties.extraJson) { this.extraJson = properties.extraJson }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public amount?: number|null = 0
    @protobuf.Field.d(3, tss_common_Way, "optional", tss_common_Way.WayNone)
    public way?: tss_common_Way|null = tss_common_Way.WayNone
    @protobuf.Field.d(4, "string", "optional", )
    public extraJson?: string|null = ""
}
export interface IIncUserPointResp {
    batchId?: string|null
}
@protobuf.Type.d("tss_hall_wallet_v2_IncUserPointResp")
export class IncUserPointResp extends protobuf.Message<IIncUserPointResp> {
    constructor(properties: Properties<IIncUserPointResp>) {
        super(properties);
        if (properties) {
            if (properties.batchId) { this.batchId = properties.batchId }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public batchId?: string|null = ""
}
export interface IGetUserPointReq {
    uid?: number|null
}
@protobuf.Type.d("tss_hall_wallet_v2_GetUserPointReq")
export class GetUserPointReq extends protobuf.Message<IGetUserPointReq> {
    constructor(properties: Properties<IGetUserPointReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IGetUserPointResp {
    Points?: IUserPoint[]
}
@protobuf.Type.d("tss_hall_wallet_v2_GetUserPointResp")
export class GetUserPointResp extends protobuf.Message<IGetUserPointResp> {
    constructor(properties: Properties<IGetUserPointResp>) {
        super(properties);
        if (properties) {
            if (properties.Points) { this.Points = []; properties.Points.forEach((value, index)=>{this.Points[index] = UserPoint.create(properties.Points[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_wallet_v2_UserPoint", "repeated")
    public Points?: UserPoint[] = []
}
export interface IDecUserPointReq {
    uid?: number|null
    amount?: number|null
    way?: tss_common_Way|null
    extraJson?: string|null
}
@protobuf.Type.d("tss_hall_wallet_v2_DecUserPointReq")
export class DecUserPointReq extends protobuf.Message<IDecUserPointReq> {
    constructor(properties: Properties<IDecUserPointReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.amount) { this.amount = properties.amount }
            if (properties.way) { this.way = properties.way }
            if (properties.extraJson) { this.extraJson = properties.extraJson }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public amount?: number|null = 0
    @protobuf.Field.d(3, tss_common_Way, "optional", tss_common_Way.WayNone)
    public way?: tss_common_Way|null = tss_common_Way.WayNone
    @protobuf.Field.d(4, "string", "optional", )
    public extraJson?: string|null = ""
}
export interface IDecUserPointResp {
    code?: tss_hall_Code|null
    batchId?: string|null
}
@protobuf.Type.d("tss_hall_wallet_v2_DecUserPointResp")
export class DecUserPointResp extends protobuf.Message<IDecUserPointResp> {
    constructor(properties: Properties<IDecUserPointResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.batchId) { this.batchId = properties.batchId }
        }
	}
    @protobuf.Field.d(1, tss_hall_Code, "optional", tss_hall_Code.CODE_SUCCEED)
    public code?: tss_hall_Code|null = tss_hall_Code.CODE_SUCCEED
    @protobuf.Field.d(2, "string", "optional", )
    public batchId?: string|null = ""
}
export interface IListUserPointLogReq {
    uid?: number|null
    page?: number|null
    pageSize?: number|null
    beginAt?: number|null
    endAt?: number|null
}
@protobuf.Type.d("tss_hall_wallet_v2_ListUserPointLogReq")
export class ListUserPointLogReq extends protobuf.Message<IListUserPointLogReq> {
    constructor(properties: Properties<IListUserPointLogReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.beginAt) { this.beginAt = properties.beginAt }
            if (properties.endAt) { this.endAt = properties.endAt }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public beginAt?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public endAt?: number|null = 0
}
export interface IListUserPointLogResp {
    totalSize?: number|null
    logs?: IUserAssetLog[]
}
@protobuf.Type.d("tss_hall_wallet_v2_ListUserPointLogResp")
export class ListUserPointLogResp extends protobuf.Message<IListUserPointLogResp> {
    constructor(properties: Properties<IListUserPointLogResp>) {
        super(properties);
        if (properties) {
            if (properties.totalSize) { this.totalSize = properties.totalSize }
            if (properties.logs) { this.logs = []; properties.logs.forEach((value, index)=>{this.logs[index] = UserAssetLog.create(properties.logs[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public totalSize?: number|null = 0
    @protobuf.Field.d(2, "tss_hall_wallet_v2_UserAssetLog", "repeated")
    public logs?: UserAssetLog[] = []
}
export interface IRefundUserPointReq {
    batchId?: string|null
}
@protobuf.Type.d("tss_hall_wallet_v2_RefundUserPointReq")
export class RefundUserPointReq extends protobuf.Message<IRefundUserPointReq> {
    constructor(properties: Properties<IRefundUserPointReq>) {
        super(properties);
        if (properties) {
            if (properties.batchId) { this.batchId = properties.batchId }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public batchId?: string|null = ""
}
export interface IRefundUserPointResp {
}
@protobuf.Type.d("tss_hall_wallet_v2_RefundUserPointResp")
export class RefundUserPointResp extends protobuf.Message<IRefundUserPointResp> {
    constructor(properties: Properties<IRefundUserPointResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IUserDiamond {
    uid?: number|null
    amount?: number|null
    addPoint?: number|null
    addGrowth?: number|null
}
@protobuf.Type.d("tss_hall_wallet_v2_UserDiamond")
export class UserDiamond extends protobuf.Message<IUserDiamond> {
    constructor(properties: Properties<IUserDiamond>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.amount) { this.amount = properties.amount }
            if (properties.addPoint) { this.addPoint = properties.addPoint }
            if (properties.addGrowth) { this.addGrowth = properties.addGrowth }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public amount?: number|null = 0
    @protobuf.Field.d(3, "int32", "optional", 0)
    public addPoint?: number|null = 0
    @protobuf.Field.d(4, "int32", "optional", 0)
    public addGrowth?: number|null = 0
}
export interface ICommitDiamondOrderReq {
    prodId?: number|null
    payChannel?: tss_common_PayChannel|null
    uid?: number|null
    platform?: tss_common_OS|null
    scene?: string|null
    extraJson?: string|null
}
@protobuf.Type.d("tss_hall_wallet_v2_CommitDiamondOrderReq")
export class CommitDiamondOrderReq extends protobuf.Message<ICommitDiamondOrderReq> {
    constructor(properties: Properties<ICommitDiamondOrderReq>) {
        super(properties);
        if (properties) {
            if (properties.prodId) { this.prodId = properties.prodId }
            if (properties.payChannel) { this.payChannel = properties.payChannel }
            if (properties.uid) { this.uid = properties.uid }
            if (properties.platform) { this.platform = properties.platform }
            if (properties.scene) { this.scene = properties.scene }
            if (properties.extraJson) { this.extraJson = properties.extraJson }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public prodId?: number|null = 0
    @protobuf.Field.d(2, tss_common_PayChannel, "optional", tss_common_PayChannel.PayChannelUnknown)
    public payChannel?: tss_common_PayChannel|null = tss_common_PayChannel.PayChannelUnknown
    @protobuf.Field.d(3, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(4, tss_common_OS, "optional", tss_common_OS.OSUnknown)
    public platform?: tss_common_OS|null = tss_common_OS.OSUnknown
    @protobuf.Field.d(5, "string", "optional", )
    public scene?: string|null = ""
    @protobuf.Field.d(6, "string", "optional", )
    public extraJson?: string|null = ""
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
@protobuf.Type.d("tss_hall_wallet_v2_PBOrderInfo")
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
export interface ICommitDiamondOrderResp {
    order?: IPBOrderInfo
    thirdProdId?: string|null
    proxyUrl?: string|null
}
@protobuf.Type.d("tss_hall_wallet_v2_CommitDiamondOrderResp")
export class CommitDiamondOrderResp extends protobuf.Message<ICommitDiamondOrderResp> {
    constructor(properties: Properties<ICommitDiamondOrderResp>) {
        super(properties);
        if (properties) {
            if (properties.order) { this.order = PBOrderInfo.create(properties.order) as any }
            if (properties.thirdProdId) { this.thirdProdId = properties.thirdProdId }
            if (properties.proxyUrl) { this.proxyUrl = properties.proxyUrl }
        }
	}
    @protobuf.Field.d(1, "tss_hall_wallet_v2_PBOrderInfo", "optional")
    public order?: PBOrderInfo|null
    @protobuf.Field.d(2, "string", "optional", )
    public thirdProdId?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public proxyUrl?: string|null = ""
}
export interface IUserMung {
    uid?: number|null
    num?: number|null
    updateAt?: number|null
}
@protobuf.Type.d("tss_hall_wallet_v2_UserMung")
export class UserMung extends protobuf.Message<IUserMung> {
    constructor(properties: Properties<IUserMung>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.num) { this.num = properties.num }
            if (properties.updateAt) { this.updateAt = properties.updateAt }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public num?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public updateAt?: number|null = 0
}
export interface IBatchGetUserAssetReq {
    uids?: number[]
    assetType?: tss_common_AssetType[]
}
@protobuf.Type.d("tss_hall_wallet_v2_BatchGetUserAssetReq")
export class BatchGetUserAssetReq extends protobuf.Message<IBatchGetUserAssetReq> {
    constructor(properties: Properties<IBatchGetUserAssetReq>) {
        super(properties);
        if (properties) {
            if (properties.uids) { this.uids = []; properties.uids.forEach((value, index)=>{this.uids[index] = properties.uids[index]})}
            if (properties.assetType) { this.assetType = []; properties.assetType.forEach((value, index)=>{this.assetType[index] = properties.assetType[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public uids?: number[] = []
    @protobuf.Field.d(2, tss_common_AssetType, "repeated", tss_common_AssetType.AssetTypeUnknown)
    public assetType?: tss_common_AssetType[] = []
}
export interface IBatchGetUserAssetResp_AssetAmount {
    assetType?: tss_common_AssetType|null
    amount?: number|null
}
@protobuf.Type.d("tss_hall_wallet_v2_BatchGetUserAssetResp_AssetAmount")
export class BatchGetUserAssetResp_AssetAmount extends protobuf.Message<IBatchGetUserAssetResp_AssetAmount> {
    constructor(properties: Properties<IBatchGetUserAssetResp_AssetAmount>) {
        super(properties);
        if (properties) {
            if (properties.assetType) { this.assetType = properties.assetType }
            if (properties.amount) { this.amount = properties.amount }
        }
	}
    @protobuf.Field.d(1, tss_common_AssetType, "optional", tss_common_AssetType.AssetTypeUnknown)
    public assetType?: tss_common_AssetType|null = tss_common_AssetType.AssetTypeUnknown
    @protobuf.Field.d(2, "int64", "optional", 0)
    public amount?: number|null = 0
}
export interface IIncUserPopularityReq {
    uid?: number|null
    bookType?: PopulartityBookType|null
    amt?: number|null
    extraJson?: string|null
    stamp?: IUserAssetChangeStamp
}
@protobuf.Type.d("tss_hall_wallet_v2_IncUserPopularityReq")
export class IncUserPopularityReq extends protobuf.Message<IIncUserPopularityReq> {
    constructor(properties: Properties<IIncUserPopularityReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.bookType) { this.bookType = properties.bookType }
            if (properties.amt) { this.amt = properties.amt }
            if (properties.extraJson) { this.extraJson = properties.extraJson }
            if (properties.stamp) { this.stamp = UserAssetChangeStamp.create(properties.stamp) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, PopulartityBookType, "optional", PopulartityBookType.PopulartityBookTypeUnknown)
    public bookType?: PopulartityBookType|null = PopulartityBookType.PopulartityBookTypeUnknown
    @protobuf.Field.d(3, "int64", "optional", 0)
    public amt?: number|null = 0
    @protobuf.Field.d(4, "string", "optional", )
    public extraJson?: string|null = ""
    @protobuf.Field.d(5, "tss_hall_wallet_v2_UserAssetChangeStamp", "optional")
    public stamp?: UserAssetChangeStamp|null
}
export interface IIncUserPopularityResp {
    batchId?: string|null
}
@protobuf.Type.d("tss_hall_wallet_v2_IncUserPopularityResp")
export class IncUserPopularityResp extends protobuf.Message<IIncUserPopularityResp> {
    constructor(properties: Properties<IIncUserPopularityResp>) {
        super(properties);
        if (properties) {
            if (properties.batchId) { this.batchId = properties.batchId }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public batchId?: string|null = ""
}
export interface IListUserPopularityLogReq {
    uid?: number|null
    page?: number|null
    pageSize?: number|null
    beginAt?: number|null
    endAt?: number|null
    way?: tss_common_Way|null
}
@protobuf.Type.d("tss_hall_wallet_v2_ListUserPopularityLogReq")
export class ListUserPopularityLogReq extends protobuf.Message<IListUserPopularityLogReq> {
    constructor(properties: Properties<IListUserPopularityLogReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.beginAt) { this.beginAt = properties.beginAt }
            if (properties.endAt) { this.endAt = properties.endAt }
            if (properties.way) { this.way = properties.way }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public beginAt?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public endAt?: number|null = 0
    @protobuf.Field.d(6, tss_common_Way, "optional", tss_common_Way.WayNone)
    public way?: tss_common_Way|null = tss_common_Way.WayNone
}
export interface IListUserPopularityLogResp {
    totalSize?: number|null
    logs?: IUserAssetLog[]
}
@protobuf.Type.d("tss_hall_wallet_v2_ListUserPopularityLogResp")
export class ListUserPopularityLogResp extends protobuf.Message<IListUserPopularityLogResp> {
    constructor(properties: Properties<IListUserPopularityLogResp>) {
        super(properties);
        if (properties) {
            if (properties.totalSize) { this.totalSize = properties.totalSize }
            if (properties.logs) { this.logs = []; properties.logs.forEach((value, index)=>{this.logs[index] = UserAssetLog.create(properties.logs[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public totalSize?: number|null = 0
    @protobuf.Field.d(2, "tss_hall_wallet_v2_UserAssetLog", "repeated")
    public logs?: UserAssetLog[] = []
}
export interface IGetUserPopularityReq {
    uid?: number|null
}
@protobuf.Type.d("tss_hall_wallet_v2_GetUserPopularityReq")
export class GetUserPopularityReq extends protobuf.Message<IGetUserPopularityReq> {
    constructor(properties: Properties<IGetUserPopularityReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IGetUserPopularityResp {
    OrdinaryAmt?: number|null
    WithdrawalAmt?: number|null
}
@protobuf.Type.d("tss_hall_wallet_v2_GetUserPopularityResp")
export class GetUserPopularityResp extends protobuf.Message<IGetUserPopularityResp> {
    constructor(properties: Properties<IGetUserPopularityResp>) {
        super(properties);
        if (properties) {
            if (properties.OrdinaryAmt) { this.OrdinaryAmt = properties.OrdinaryAmt }
            if (properties.WithdrawalAmt) { this.WithdrawalAmt = properties.WithdrawalAmt }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public OrdinaryAmt?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public WithdrawalAmt?: number|null = 0
}
export interface IMsgUserAssetChange {
    uid?: number|null
    type?: tss_common_AssetType|null
    changeAmount?: number|null
    totalAmount?: number|null
    way?: tss_common_Way|null
}
@protobuf.Type.d("tss_hall_wallet_v2_MsgUserAssetChange")
export class MsgUserAssetChange extends protobuf.Message<IMsgUserAssetChange> {
    constructor(properties: Properties<IMsgUserAssetChange>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.type) { this.type = properties.type }
            if (properties.changeAmount) { this.changeAmount = properties.changeAmount }
            if (properties.totalAmount) { this.totalAmount = properties.totalAmount }
            if (properties.way) { this.way = properties.way }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, tss_common_AssetType, "optional", tss_common_AssetType.AssetTypeUnknown)
    public type?: tss_common_AssetType|null = tss_common_AssetType.AssetTypeUnknown
    @protobuf.Field.d(3, "int64", "optional", 0)
    public changeAmount?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public totalAmount?: number|null = 0
    @protobuf.Field.d(5, tss_common_Way, "optional", tss_common_Way.WayNone)
    public way?: tss_common_Way|null = tss_common_Way.WayNone
}
export interface IAssetExchangeReq {
    beginType?: tss_common_AssetType|null
    endType?: tss_common_AssetType|null
    exchangeBeginNum?: number|null
}
@protobuf.Type.d("tss_hall_wallet_v2_AssetExchangeReq")
export class AssetExchangeReq extends protobuf.Message<IAssetExchangeReq> {
    constructor(properties: Properties<IAssetExchangeReq>) {
        super(properties);
        if (properties) {
            if (properties.beginType) { this.beginType = properties.beginType }
            if (properties.endType) { this.endType = properties.endType }
            if (properties.exchangeBeginNum) { this.exchangeBeginNum = properties.exchangeBeginNum }
        }
	}
    @protobuf.Field.d(1, tss_common_AssetType, "optional", tss_common_AssetType.AssetTypeUnknown)
    public beginType?: tss_common_AssetType|null = tss_common_AssetType.AssetTypeUnknown
    @protobuf.Field.d(2, tss_common_AssetType, "optional", tss_common_AssetType.AssetTypeUnknown)
    public endType?: tss_common_AssetType|null = tss_common_AssetType.AssetTypeUnknown
    @protobuf.Field.d(3, "int64", "optional", 0)
    public exchangeBeginNum?: number|null = 0
}
export interface IAssetExchangeResp {
    exchangeEndNum?: number|null
}
@protobuf.Type.d("tss_hall_wallet_v2_AssetExchangeResp")
export class AssetExchangeResp extends protobuf.Message<IAssetExchangeResp> {
    constructor(properties: Properties<IAssetExchangeResp>) {
        super(properties);
        if (properties) {
            if (properties.exchangeEndNum) { this.exchangeEndNum = properties.exchangeEndNum }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public exchangeEndNum?: number|null = 0
}
export interface IProductSort {
    pid?: number|null
    sort?: number|null
}
@protobuf.Type.d("tss_hall_wallet_v2_ProductSort")
export class ProductSort extends protobuf.Message<IProductSort> {
    constructor(properties: Properties<IProductSort>) {
        super(properties);
        if (properties) {
            if (properties.pid) { this.pid = properties.pid }
            if (properties.sort) { this.sort = properties.sort }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public pid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public sort?: number|null = 0
}
export interface IBatchSortDiamondProductReq {
    products?: IProductSort[]
}
@protobuf.Type.d("tss_hall_wallet_v2_BatchSortDiamondProductReq")
export class BatchSortDiamondProductReq extends protobuf.Message<IBatchSortDiamondProductReq> {
    constructor(properties: Properties<IBatchSortDiamondProductReq>) {
        super(properties);
        if (properties) {
            if (properties.products) { this.products = []; properties.products.forEach((value, index)=>{this.products[index] = ProductSort.create(properties.products[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_wallet_v2_ProductSort", "repeated")
    public products?: ProductSort[] = []
}
export interface ISaveDiamondProductReq {
    product?: IDiamondProduct
}
@protobuf.Type.d("tss_hall_wallet_v2_SaveDiamondProductReq")
export class SaveDiamondProductReq extends protobuf.Message<ISaveDiamondProductReq> {
    constructor(properties: Properties<ISaveDiamondProductReq>) {
        super(properties);
        if (properties) {
            if (properties.product) { this.product = DiamondProduct.create(properties.product) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_wallet_v2_DiamondProduct", "optional")
    public product?: DiamondProduct|null
}
export interface IBatchGetDiamondProductReq {
    ids?: number[]
}
@protobuf.Type.d("tss_hall_wallet_v2_BatchGetDiamondProductReq")
export class BatchGetDiamondProductReq extends protobuf.Message<IBatchGetDiamondProductReq> {
    constructor(properties: Properties<IBatchGetDiamondProductReq>) {
        super(properties);
        if (properties) {
            if (properties.ids) { this.ids = []; properties.ids.forEach((value, index)=>{this.ids[index] = properties.ids[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public ids?: number[] = []
}
export interface IBatchGetDiamondProductResp {
    products?: IDiamondProduct[]
}
@protobuf.Type.d("tss_hall_wallet_v2_BatchGetDiamondProductResp")
export class BatchGetDiamondProductResp extends protobuf.Message<IBatchGetDiamondProductResp> {
    constructor(properties: Properties<IBatchGetDiamondProductResp>) {
        super(properties);
        if (properties) {
            if (properties.products) { this.products = []; properties.products.forEach((value, index)=>{this.products[index] = DiamondProduct.create(properties.products[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_wallet_v2_DiamondProduct", "repeated")
    public products?: DiamondProduct[] = []
}
export interface IVirtualAssetExchangeCurrencyReq {
    virtualAssetAmount?: number|null
    virtualAssetType?: tss_common_AssetType|null
}
@protobuf.Type.d("tss_hall_wallet_v2_VirtualAssetExchangeCurrencyReq")
export class VirtualAssetExchangeCurrencyReq extends protobuf.Message<IVirtualAssetExchangeCurrencyReq> {
    constructor(properties: Properties<IVirtualAssetExchangeCurrencyReq>) {
        super(properties);
        if (properties) {
            if (properties.virtualAssetAmount) { this.virtualAssetAmount = properties.virtualAssetAmount }
            if (properties.virtualAssetType) { this.virtualAssetType = properties.virtualAssetType }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public virtualAssetAmount?: number|null = 0
    @protobuf.Field.d(2, tss_common_AssetType, "optional", tss_common_AssetType.AssetTypeUnknown)
    public virtualAssetType?: tss_common_AssetType|null = tss_common_AssetType.AssetTypeUnknown
}
export interface IVirtualAssetExchangeCurrencyResp {
    currencyAmount?: number|null
}
@protobuf.Type.d("tss_hall_wallet_v2_VirtualAssetExchangeCurrencyResp")
export class VirtualAssetExchangeCurrencyResp extends protobuf.Message<IVirtualAssetExchangeCurrencyResp> {
    constructor(properties: Properties<IVirtualAssetExchangeCurrencyResp>) {
        super(properties);
        if (properties) {
            if (properties.currencyAmount) { this.currencyAmount = properties.currencyAmount }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public currencyAmount?: number|null = 0
}
export interface IVirtualAssetExchangeCurrencyRawReq {
    virtualAssetAmount?: number|null
    virtualAssetType?: tss_common_AssetType|null
}
@protobuf.Type.d("tss_hall_wallet_v2_VirtualAssetExchangeCurrencyRawReq")
export class VirtualAssetExchangeCurrencyRawReq extends protobuf.Message<IVirtualAssetExchangeCurrencyRawReq> {
    constructor(properties: Properties<IVirtualAssetExchangeCurrencyRawReq>) {
        super(properties);
        if (properties) {
            if (properties.virtualAssetAmount) { this.virtualAssetAmount = properties.virtualAssetAmount }
            if (properties.virtualAssetType) { this.virtualAssetType = properties.virtualAssetType }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public virtualAssetAmount?: number|null = 0
    @protobuf.Field.d(2, tss_common_AssetType, "optional", tss_common_AssetType.AssetTypeUnknown)
    public virtualAssetType?: tss_common_AssetType|null = tss_common_AssetType.AssetTypeUnknown
}
export interface IVirtualAssetExchangeCurrencyRawResp {
    currencyAmountRaw?: number|null
    currencyAmount?: number|null
}
@protobuf.Type.d("tss_hall_wallet_v2_VirtualAssetExchangeCurrencyRawResp")
export class VirtualAssetExchangeCurrencyRawResp extends protobuf.Message<IVirtualAssetExchangeCurrencyRawResp> {
    constructor(properties: Properties<IVirtualAssetExchangeCurrencyRawResp>) {
        super(properties);
        if (properties) {
            if (properties.currencyAmountRaw) { this.currencyAmountRaw = properties.currencyAmountRaw }
            if (properties.currencyAmount) { this.currencyAmount = properties.currencyAmount }
        }
	}
    @protobuf.Field.d(1, "float", "optional", 0)
    public currencyAmountRaw?: number|null = 0
    @protobuf.Field.d(2, "float", "optional", 0)
    public currencyAmount?: number|null = 0
}
export interface IBatchGetUserAssetResp_BatchUserAsset {
    uid?: number|null
    asset?: IBatchGetUserAssetResp_AssetAmount[]
}
@protobuf.Type.d("tss_hall_wallet_v2_BatchGetUserAssetResp_BatchUserAsset")
export class BatchGetUserAssetResp_BatchUserAsset extends protobuf.Message<IBatchGetUserAssetResp_BatchUserAsset> {
    constructor(properties: Properties<IBatchGetUserAssetResp_BatchUserAsset>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.asset) { this.asset = []; properties.asset.forEach((value, index)=>{this.asset[index] = BatchGetUserAssetResp_AssetAmount.create(properties.asset[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "tss_hall_wallet_v2_BatchGetUserAssetResp_AssetAmount", "repeated")
    public asset?: BatchGetUserAssetResp_AssetAmount[] = []
}
export interface IBatchGetUserAssetResp {
    userAsset?: IBatchGetUserAssetResp_BatchUserAsset[]
}
@protobuf.Type.d("tss_hall_wallet_v2_BatchGetUserAssetResp")
export class BatchGetUserAssetResp extends protobuf.Message<IBatchGetUserAssetResp> {
    constructor(properties: Properties<IBatchGetUserAssetResp>) {
        super(properties);
        if (properties) {
            if (properties.userAsset) { this.userAsset = []; properties.userAsset.forEach((value, index)=>{this.userAsset[index] = BatchGetUserAssetResp_BatchUserAsset.create(properties.userAsset[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_wallet_v2_BatchGetUserAssetResp_BatchUserAsset", "repeated")
    public userAsset?: BatchGetUserAssetResp_BatchUserAsset[] = []
}
class $Wallet extends RpcService {
    async SaveAssetConfig(req: ISaveAssetConfigReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = SaveAssetConfigReq.create(req)
        this.onBeforeReq("SaveAssetConfig", data, params)
        const buffer = SaveAssetConfigReq.encode(data).finish()
        let [err, pack] = await this.call("SaveAssetConfig", buffer, params)
        if (err) {
            this.onBeforeResp("SaveAssetConfig", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("SaveAssetConfig", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetAssetConfig(req: IGetAssetConfigReq, params?: RpcParams) : Promise<{err:number, resp:IGetAssetConfigResp}> {
        let data = GetAssetConfigReq.create(req)
        this.onBeforeReq("GetAssetConfig", data, params)
        const buffer = GetAssetConfigReq.encode(data).finish()
        let [err, pack] = await this.call("GetAssetConfig", buffer, params)
        if (err) {
            this.onBeforeResp("GetAssetConfig", err)
            return {err: err, resp: null}
        } else {
            let resp = GetAssetConfigResp.decode(pack) as any
            this.onBeforeResp("GetAssetConfig", err, resp)
            return {err: null, resp: resp}
        }
    }
    async IncUserAsset(req: IIncUserAssetReq, params?: RpcParams) : Promise<{err:number, resp:IIncUserAssetResp}> {
        let data = IncUserAssetReq.create(req)
        this.onBeforeReq("IncUserAsset", data, params)
        const buffer = IncUserAssetReq.encode(data).finish()
        let [err, pack] = await this.call("IncUserAsset", buffer, params)
        if (err) {
            this.onBeforeResp("IncUserAsset", err)
            return {err: err, resp: null}
        } else {
            let resp = IncUserAssetResp.decode(pack) as any
            this.onBeforeResp("IncUserAsset", err, resp)
            return {err: null, resp: resp}
        }
    }
    async IncUserAssets(req: tss_hall_common_IIncUserAssetsReq, params?: RpcParams) : Promise<{err:number, resp:tss_hall_common_IIncUserAssetsResp}> {
        let data = tss_hall_common_IncUserAssetsReq.create(req)
        this.onBeforeReq("IncUserAssets", data, params)
        const buffer = tss_hall_common_IncUserAssetsReq.encode(data).finish()
        let [err, pack] = await this.call("IncUserAssets", buffer, params)
        if (err) {
            this.onBeforeResp("IncUserAssets", err)
            return {err: err, resp: null}
        } else {
            let resp = tss_hall_common_IncUserAssetsResp.decode(pack) as any
            this.onBeforeResp("IncUserAssets", err, resp)
            return {err: null, resp: resp}
        }
    }
    async CalcIncUserAssets(req: tss_hall_common_ICalcIncUserAssetsReq, params?: RpcParams) : Promise<{err:number, resp:tss_hall_common_ICalcIncUserAssetsResp}> {
        let data = tss_hall_common_CalcIncUserAssetsReq.create(req)
        this.onBeforeReq("CalcIncUserAssets", data, params)
        const buffer = tss_hall_common_CalcIncUserAssetsReq.encode(data).finish()
        let [err, pack] = await this.call("CalcIncUserAssets", buffer, params)
        if (err) {
            this.onBeforeResp("CalcIncUserAssets", err)
            return {err: err, resp: null}
        } else {
            let resp = tss_hall_common_CalcIncUserAssetsResp.decode(pack) as any
            this.onBeforeResp("CalcIncUserAssets", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SaveIncUserAssets(req: tss_hall_common_ISaveIncUserAssetsReq, params?: RpcParams) : Promise<{err:number, resp:tss_hall_common_ISaveIncUserAssetsResp}> {
        let data = tss_hall_common_SaveIncUserAssetsReq.create(req)
        this.onBeforeReq("SaveIncUserAssets", data, params)
        const buffer = tss_hall_common_SaveIncUserAssetsReq.encode(data).finish()
        let [err, pack] = await this.call("SaveIncUserAssets", buffer, params)
        if (err) {
            this.onBeforeResp("SaveIncUserAssets", err)
            return {err: err, resp: null}
        } else {
            let resp = tss_hall_common_SaveIncUserAssetsResp.decode(pack) as any
            this.onBeforeResp("SaveIncUserAssets", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DecUserAssets(req: tss_hall_common_IDecUserAssetsReq, params?: RpcParams) : Promise<{err:number, resp:tss_hall_common_IDecUserAssetsResp}> {
        let data = tss_hall_common_DecUserAssetsReq.create(req)
        this.onBeforeReq("DecUserAssets", data, params)
        const buffer = tss_hall_common_DecUserAssetsReq.encode(data).finish()
        let [err, pack] = await this.call("DecUserAssets", buffer, params)
        if (err) {
            this.onBeforeResp("DecUserAssets", err)
            return {err: err, resp: null}
        } else {
            let resp = tss_hall_common_DecUserAssetsResp.decode(pack) as any
            this.onBeforeResp("DecUserAssets", err, resp)
            return {err: null, resp: resp}
        }
    }
    async FillAssets(req: tss_hall_common_IFillAssetsReq, params?: RpcParams) : Promise<{err:number, resp:tss_hall_common_IFillAssetsResp}> {
        let data = tss_hall_common_FillAssetsReq.create(req)
        this.onBeforeReq("FillAssets", data, params)
        const buffer = tss_hall_common_FillAssetsReq.encode(data).finish()
        let [err, pack] = await this.call("FillAssets", buffer, params)
        if (err) {
            this.onBeforeResp("FillAssets", err)
            return {err: err, resp: null}
        } else {
            let resp = tss_hall_common_FillAssetsResp.decode(pack) as any
            this.onBeforeResp("FillAssets", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchIncUserAsset(req: IBatchIncUserAssetReq, params?: RpcParams) : Promise<{err:number, resp:IBatchIncUserAssetResp}> {
        let data = BatchIncUserAssetReq.create(req)
        this.onBeforeReq("BatchIncUserAsset", data, params)
        const buffer = BatchIncUserAssetReq.encode(data).finish()
        let [err, pack] = await this.call("BatchIncUserAsset", buffer, params)
        if (err) {
            this.onBeforeResp("BatchIncUserAsset", err)
            return {err: err, resp: null}
        } else {
            let resp = BatchIncUserAssetResp.decode(pack) as any
            this.onBeforeResp("BatchIncUserAsset", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DecUserAsset(req: IDecUserAssetReq, params?: RpcParams) : Promise<{err:number, resp:IDecUserAssetResp}> {
        let data = DecUserAssetReq.create(req)
        this.onBeforeReq("DecUserAsset", data, params)
        const buffer = DecUserAssetReq.encode(data).finish()
        let [err, pack] = await this.call("DecUserAsset", buffer, params)
        if (err) {
            this.onBeforeResp("DecUserAsset", err)
            return {err: err, resp: null}
        } else {
            let resp = DecUserAssetResp.decode(pack) as any
            this.onBeforeResp("DecUserAsset", err, resp)
            return {err: null, resp: resp}
        }
    }
    async RefundUserAsset(req: IRefundUserAssetReq, params?: RpcParams) : Promise<{err:number, resp:IRefundUserAssetResp}> {
        let data = RefundUserAssetReq.create(req)
        this.onBeforeReq("RefundUserAsset", data, params)
        const buffer = RefundUserAssetReq.encode(data).finish()
        let [err, pack] = await this.call("RefundUserAsset", buffer, params)
        if (err) {
            this.onBeforeResp("RefundUserAsset", err)
            return {err: err, resp: null}
        } else {
            let resp = RefundUserAssetResp.decode(pack) as any
            this.onBeforeResp("RefundUserAsset", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetUserAsset(req: IGetUserAssetReq, params?: RpcParams) : Promise<{err:number, resp:IGetUserAssetResp}> {
        let data = GetUserAssetReq.create(req)
        this.onBeforeReq("GetUserAsset", data, params)
        const buffer = GetUserAssetReq.encode(data).finish()
        let [err, pack] = await this.call("GetUserAsset", buffer, params)
        if (err) {
            this.onBeforeResp("GetUserAsset", err)
            return {err: err, resp: null}
        } else {
            let resp = GetUserAssetResp.decode(pack) as any
            this.onBeforeResp("GetUserAsset", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListUserAssetLog(req: IListUserAssetLogReq, params?: RpcParams) : Promise<{err:number, resp:IListUserAssetLogResp}> {
        let data = ListUserAssetLogReq.create(req)
        this.onBeforeReq("ListUserAssetLog", data, params)
        const buffer = ListUserAssetLogReq.encode(data).finish()
        let [err, pack] = await this.call("ListUserAssetLog", buffer, params)
        if (err) {
            this.onBeforeResp("ListUserAssetLog", err)
            return {err: err, resp: null}
        } else {
            let resp = ListUserAssetLogResp.decode(pack) as any
            this.onBeforeResp("ListUserAssetLog", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetUserAssetLogCnt(req: IGetUserAssetLogCntReq, params?: RpcParams) : Promise<{err:number, resp:IGetUserAssetLogCntResp}> {
        let data = GetUserAssetLogCntReq.create(req)
        this.onBeforeReq("GetUserAssetLogCnt", data, params)
        const buffer = GetUserAssetLogCntReq.encode(data).finish()
        let [err, pack] = await this.call("GetUserAssetLogCnt", buffer, params)
        if (err) {
            this.onBeforeResp("GetUserAssetLogCnt", err)
            return {err: err, resp: null}
        } else {
            let resp = GetUserAssetLogCntResp.decode(pack) as any
            this.onBeforeResp("GetUserAssetLogCnt", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetUserAssetStats(req: IGetUserAssetStatsReq, params?: RpcParams) : Promise<{err:number, resp:IGetUserAssetStatsResp}> {
        let data = GetUserAssetStatsReq.create(req)
        this.onBeforeReq("GetUserAssetStats", data, params)
        const buffer = GetUserAssetStatsReq.encode(data).finish()
        let [err, pack] = await this.call("GetUserAssetStats", buffer, params)
        if (err) {
            this.onBeforeResp("GetUserAssetStats", err)
            return {err: err, resp: null}
        } else {
            let resp = GetUserAssetStatsResp.decode(pack) as any
            this.onBeforeResp("GetUserAssetStats", err, resp)
            return {err: null, resp: resp}
        }
    }
    async IncUserPoint(req: IIncUserPointReq, params?: RpcParams) : Promise<{err:number, resp:IIncUserPointResp}> {
        let data = IncUserPointReq.create(req)
        this.onBeforeReq("IncUserPoint", data, params)
        const buffer = IncUserPointReq.encode(data).finish()
        let [err, pack] = await this.call("IncUserPoint", buffer, params)
        if (err) {
            this.onBeforeResp("IncUserPoint", err)
            return {err: err, resp: null}
        } else {
            let resp = IncUserPointResp.decode(pack) as any
            this.onBeforeResp("IncUserPoint", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetUserPoint(req: IGetUserPointReq, params?: RpcParams) : Promise<{err:number, resp:IGetUserPointResp}> {
        let data = GetUserPointReq.create(req)
        this.onBeforeReq("GetUserPoint", data, params)
        const buffer = GetUserPointReq.encode(data).finish()
        let [err, pack] = await this.call("GetUserPoint", buffer, params)
        if (err) {
            this.onBeforeResp("GetUserPoint", err)
            return {err: err, resp: null}
        } else {
            let resp = GetUserPointResp.decode(pack) as any
            this.onBeforeResp("GetUserPoint", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DecUserPoint(req: IDecUserPointReq, params?: RpcParams) : Promise<{err:number, resp:IDecUserPointResp}> {
        let data = DecUserPointReq.create(req)
        this.onBeforeReq("DecUserPoint", data, params)
        const buffer = DecUserPointReq.encode(data).finish()
        let [err, pack] = await this.call("DecUserPoint", buffer, params)
        if (err) {
            this.onBeforeResp("DecUserPoint", err)
            return {err: err, resp: null}
        } else {
            let resp = DecUserPointResp.decode(pack) as any
            this.onBeforeResp("DecUserPoint", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListUserPointLog(req: IListUserPointLogReq, params?: RpcParams) : Promise<{err:number, resp:IListUserPointLogResp}> {
        let data = ListUserPointLogReq.create(req)
        this.onBeforeReq("ListUserPointLog", data, params)
        const buffer = ListUserPointLogReq.encode(data).finish()
        let [err, pack] = await this.call("ListUserPointLog", buffer, params)
        if (err) {
            this.onBeforeResp("ListUserPointLog", err)
            return {err: err, resp: null}
        } else {
            let resp = ListUserPointLogResp.decode(pack) as any
            this.onBeforeResp("ListUserPointLog", err, resp)
            return {err: null, resp: resp}
        }
    }
    async RefundUserPoint(req: IRefundUserPointReq, params?: RpcParams) : Promise<{err:number, resp:IRefundUserPointResp}> {
        let data = RefundUserPointReq.create(req)
        this.onBeforeReq("RefundUserPoint", data, params)
        const buffer = RefundUserPointReq.encode(data).finish()
        let [err, pack] = await this.call("RefundUserPoint", buffer, params)
        if (err) {
            this.onBeforeResp("RefundUserPoint", err)
            return {err: err, resp: null}
        } else {
            let resp = RefundUserPointResp.decode(pack) as any
            this.onBeforeResp("RefundUserPoint", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetUserAsset(req: IBatchGetUserAssetReq, params?: RpcParams) : Promise<{err:number, resp:IBatchGetUserAssetResp}> {
        let data = BatchGetUserAssetReq.create(req)
        this.onBeforeReq("BatchGetUserAsset", data, params)
        const buffer = BatchGetUserAssetReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetUserAsset", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetUserAsset", err)
            return {err: err, resp: null}
        } else {
            let resp = BatchGetUserAssetResp.decode(pack) as any
            this.onBeforeResp("BatchGetUserAsset", err, resp)
            return {err: null, resp: resp}
        }
    }
    async IncUserPopularity(req: IIncUserPopularityReq, params?: RpcParams) : Promise<{err:number, resp:IIncUserPopularityResp}> {
        let data = IncUserPopularityReq.create(req)
        this.onBeforeReq("IncUserPopularity", data, params)
        const buffer = IncUserPopularityReq.encode(data).finish()
        let [err, pack] = await this.call("IncUserPopularity", buffer, params)
        if (err) {
            this.onBeforeResp("IncUserPopularity", err)
            return {err: err, resp: null}
        } else {
            let resp = IncUserPopularityResp.decode(pack) as any
            this.onBeforeResp("IncUserPopularity", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListUserPopularityLog(req: IListUserPopularityLogReq, params?: RpcParams) : Promise<{err:number, resp:IListUserPopularityLogResp}> {
        let data = ListUserPopularityLogReq.create(req)
        this.onBeforeReq("ListUserPopularityLog", data, params)
        const buffer = ListUserPopularityLogReq.encode(data).finish()
        let [err, pack] = await this.call("ListUserPopularityLog", buffer, params)
        if (err) {
            this.onBeforeResp("ListUserPopularityLog", err)
            return {err: err, resp: null}
        } else {
            let resp = ListUserPopularityLogResp.decode(pack) as any
            this.onBeforeResp("ListUserPopularityLog", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetUserPopularity(req: IGetUserPopularityReq, params?: RpcParams) : Promise<{err:number, resp:IGetUserPopularityResp}> {
        let data = GetUserPopularityReq.create(req)
        this.onBeforeReq("GetUserPopularity", data, params)
        const buffer = GetUserPopularityReq.encode(data).finish()
        let [err, pack] = await this.call("GetUserPopularity", buffer, params)
        if (err) {
            this.onBeforeResp("GetUserPopularity", err)
            return {err: err, resp: null}
        } else {
            let resp = GetUserPopularityResp.decode(pack) as any
            this.onBeforeResp("GetUserPopularity", err, resp)
            return {err: null, resp: resp}
        }
    }
    async AssetExchange(req: IAssetExchangeReq, params?: RpcParams) : Promise<{err:number, resp:IAssetExchangeResp}> {
        let data = AssetExchangeReq.create(req)
        this.onBeforeReq("AssetExchange", data, params)
        const buffer = AssetExchangeReq.encode(data).finish()
        let [err, pack] = await this.call("AssetExchange", buffer, params)
        if (err) {
            this.onBeforeResp("AssetExchange", err)
            return {err: err, resp: null}
        } else {
            let resp = AssetExchangeResp.decode(pack) as any
            this.onBeforeResp("AssetExchange", err, resp)
            return {err: null, resp: resp}
        }
    }
    async VirtualAssetExchangeCurrency(req: IVirtualAssetExchangeCurrencyReq, params?: RpcParams) : Promise<{err:number, resp:IVirtualAssetExchangeCurrencyResp}> {
        let data = VirtualAssetExchangeCurrencyReq.create(req)
        this.onBeforeReq("VirtualAssetExchangeCurrency", data, params)
        const buffer = VirtualAssetExchangeCurrencyReq.encode(data).finish()
        let [err, pack] = await this.call("VirtualAssetExchangeCurrency", buffer, params)
        if (err) {
            this.onBeforeResp("VirtualAssetExchangeCurrency", err)
            return {err: err, resp: null}
        } else {
            let resp = VirtualAssetExchangeCurrencyResp.decode(pack) as any
            this.onBeforeResp("VirtualAssetExchangeCurrency", err, resp)
            return {err: null, resp: resp}
        }
    }
    async VirtualAssetExchangeCurrencyRaw(req: IVirtualAssetExchangeCurrencyRawReq, params?: RpcParams) : Promise<{err:number, resp:IVirtualAssetExchangeCurrencyRawResp}> {
        let data = VirtualAssetExchangeCurrencyRawReq.create(req)
        this.onBeforeReq("VirtualAssetExchangeCurrencyRaw", data, params)
        const buffer = VirtualAssetExchangeCurrencyRawReq.encode(data).finish()
        let [err, pack] = await this.call("VirtualAssetExchangeCurrencyRaw", buffer, params)
        if (err) {
            this.onBeforeResp("VirtualAssetExchangeCurrencyRaw", err)
            return {err: err, resp: null}
        } else {
            let resp = VirtualAssetExchangeCurrencyRawResp.decode(pack) as any
            this.onBeforeResp("VirtualAssetExchangeCurrencyRaw", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DeliveryDiamond(req: tss_hall_common_IDeliverProduct, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = tss_hall_common_DeliverProduct.create(req)
        this.onBeforeReq("DeliveryDiamond", data, params)
        const buffer = tss_hall_common_DeliverProduct.encode(data).finish()
        let [err, pack] = await this.call("DeliveryDiamond", buffer, params)
        if (err) {
            this.onBeforeResp("DeliveryDiamond", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("DeliveryDiamond", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetAssetConfigForSync(req: base_IBatchGetResourceReq, params?: RpcParams) : Promise<{err:number, resp:base_IBatchGetResourceResp}> {
        let data = base_BatchGetResourceReq.create(req)
        this.onBeforeReq("BatchGetAssetConfigForSync", data, params)
        const buffer = base_BatchGetResourceReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetAssetConfigForSync", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetAssetConfigForSync", err)
            return {err: err, resp: null}
        } else {
            let resp = base_BatchGetResourceResp.decode(pack) as any
            this.onBeforeResp("BatchGetAssetConfigForSync", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListUserAssetNumber(req: IListUserAssetNumberReq, params?: RpcParams) : Promise<{err:number, resp:IListUserAssetNumberResp}> {
        let data = ListUserAssetNumberReq.create(req)
        this.onBeforeReq("ListUserAssetNumber", data, params)
        const buffer = ListUserAssetNumberReq.encode(data).finish()
        let [err, pack] = await this.call("ListUserAssetNumber", buffer, params)
        if (err) {
            this.onBeforeResp("ListUserAssetNumber", err)
            return {err: err, resp: null}
        } else {
            let resp = ListUserAssetNumberResp.decode(pack) as any
            this.onBeforeResp("ListUserAssetNumber", err, resp)
            return {err: null, resp: resp}
        }
    }
    NotifyUserDiamond(data: Uint8Array, params: RpcParams) : {msg: IUserDiamond, eventID?: number} {
        let msg = UserDiamond.decode(data)
        return {msg: msg}
    }
    NotifyUserAssetChange(data: Uint8Array, params: RpcParams) : {msg: IMsgUserAssetChange, eventID?: number} {
        let msg = MsgUserAssetChange.decode(data)
        return {msg: msg}
    }
}
export const Wallet = new $Wallet({
    name: "tss.hall.wallet.v2",
})
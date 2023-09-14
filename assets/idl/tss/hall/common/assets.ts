import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  ExpireData as tss_common_ExpireData,IExpireData as tss_common_IExpireData ,  AssetType as tss_common_AssetType ,  Way as tss_common_Way ,  GrantType as tss_common_GrantType ,  AssetItem as tss_common_AssetItem,IAssetItem as tss_common_IAssetItem ,  } from "idl/tss/common/common_define"
import {  Code as tss_hall_Code ,  } from "idl/tss/hall/code"
export enum DynamicAssetType {  
    DynamicAssetTypeUnknown = 0,  
    DynamicAssetTypeBase = 1,  
    DynamicAssetTypeMarkup = 2,
}
export enum AssetMarkupRateType {  
    AssetMarkupRateTypeUnknown = 0,  
    AssetMarkupRateTypeBalanceAddCard = 1,  
    AssetMarkupRateTypeVip = 2,
}
export interface IAssetsChangeItem {
    ID?: number|null
    expire?: tss_common_IExpireData
    num?: number|null
    extra?: string|null
    assetType?: tss_common_AssetType|null
    markupAmount?: number|null
}
@protobuf.Type.d("tss_hall_common_AssetsChangeItem")
export class AssetsChangeItem extends protobuf.Message<IAssetsChangeItem> {
    constructor(properties: Properties<IAssetsChangeItem>) {
        super(properties);
        if (properties) {
            if (properties.ID) { this.ID = properties.ID }
            if (properties.expire) { this.expire = tss_common_ExpireData.create(properties.expire) as any }
            if (properties.num) { this.num = properties.num }
            if (properties.extra) { this.extra = properties.extra }
            if (properties.assetType) { this.assetType = properties.assetType }
            if (properties.markupAmount) { this.markupAmount = properties.markupAmount }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public ID?: number|null = 0
    @protobuf.Field.d(2, "tss_common_ExpireData", "optional")
    public expire?: tss_common_ExpireData|null
    @protobuf.Field.d(3, "int64", "optional", 0)
    public num?: number|null = 0
    @protobuf.Field.d(4, "string", "optional", )
    public extra?: string|null = ""
    @protobuf.Field.d(5, tss_common_AssetType, "optional", tss_common_AssetType.AssetTypeUnknown)
    public assetType?: tss_common_AssetType|null = tss_common_AssetType.AssetTypeUnknown
    @protobuf.Field.d(6, "int64", "optional", 0)
    public markupAmount?: number|null = 0
}
export interface IAssetsChangeStamp {
    way?: tss_common_Way|null
    operator?: string|null
    grantType?: tss_common_GrantType|null
    scene?: { [k: string]: string|null }
}
@protobuf.Type.d("tss_hall_common_AssetsChangeStamp")
export class AssetsChangeStamp extends protobuf.Message<IAssetsChangeStamp> {
    constructor(properties: Properties<IAssetsChangeStamp>) {
        super(properties);
        if (properties) {
            if (properties.way) { this.way = properties.way }
            if (properties.operator) { this.operator = properties.operator }
            if (properties.grantType) { this.grantType = properties.grantType }
            if (properties.scene) { this.scene = properties.scene }
        }
	}
    @protobuf.Field.d(1, tss_common_Way, "optional", tss_common_Way.WayNone)
    public way?: tss_common_Way|null = tss_common_Way.WayNone
    @protobuf.Field.d(2, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(3, tss_common_GrantType, "optional", tss_common_GrantType.GrantTypeDirectly)
    public grantType?: tss_common_GrantType|null = tss_common_GrantType.GrantTypeDirectly
    @protobuf.MapField.d(4, "string", "string")
    public scene?: { [k: string]: string|null } = {}
}
export interface IAssetsChangeInfo {
    item?: IAssetsChangeItem
    stamp?: IAssetsChangeStamp
}
@protobuf.Type.d("tss_hall_common_AssetsChangeInfo")
export class AssetsChangeInfo extends protobuf.Message<IAssetsChangeInfo> {
    constructor(properties: Properties<IAssetsChangeInfo>) {
        super(properties);
        if (properties) {
            if (properties.item) { this.item = AssetsChangeItem.create(properties.item) as any }
            if (properties.stamp) { this.stamp = AssetsChangeStamp.create(properties.stamp) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_common_AssetsChangeItem", "optional")
    public item?: AssetsChangeItem|null
    @protobuf.Field.d(2, "tss_hall_common_AssetsChangeStamp", "optional")
    public stamp?: AssetsChangeStamp|null
}
export interface IDynamicAssetItems {
    dtype?: DynamicAssetType|null
    asset?: tss_common_IAssetItem[]
    markupRate?: number|null
    markupRateType?: AssetMarkupRateType|null
    way?: tss_common_Way|null
    meta?: { [k: string]: string|null }
    scene?: { [k: string]: string|null }
    grantType?: tss_common_GrantType|null
}
@protobuf.Type.d("tss_hall_common_DynamicAssetItems")
export class DynamicAssetItems extends protobuf.Message<IDynamicAssetItems> {
    constructor(properties: Properties<IDynamicAssetItems>) {
        super(properties);
        if (properties) {
            if (properties.dtype) { this.dtype = properties.dtype }
            if (properties.asset) { this.asset = []; properties.asset.forEach((value, index)=>{this.asset[index] = tss_common_AssetItem.create(properties.asset[index]) as any})}
            if (properties.markupRate) { this.markupRate = properties.markupRate }
            if (properties.markupRateType) { this.markupRateType = properties.markupRateType }
            if (properties.way) { this.way = properties.way }
            if (properties.meta) { this.meta = properties.meta }
            if (properties.scene) { this.scene = properties.scene }
            if (properties.grantType) { this.grantType = properties.grantType }
        }
	}
    @protobuf.Field.d(1, DynamicAssetType, "optional", DynamicAssetType.DynamicAssetTypeUnknown)
    public dtype?: DynamicAssetType|null = DynamicAssetType.DynamicAssetTypeUnknown
    @protobuf.Field.d(2, "tss_common_AssetItem", "repeated")
    public asset?: tss_common_AssetItem[] = []
    @protobuf.Field.d(3, "int64", "optional", 0)
    public markupRate?: number|null = 0
    @protobuf.Field.d(4, AssetMarkupRateType, "optional", AssetMarkupRateType.AssetMarkupRateTypeUnknown)
    public markupRateType?: AssetMarkupRateType|null = AssetMarkupRateType.AssetMarkupRateTypeUnknown
    @protobuf.Field.d(5, tss_common_Way, "optional", tss_common_Way.WayNone)
    public way?: tss_common_Way|null = tss_common_Way.WayNone
    @protobuf.MapField.d(6, "string", "string")
    public meta?: { [k: string]: string|null } = {}
    @protobuf.MapField.d(7, "string", "string")
    public scene?: { [k: string]: string|null } = {}
    @protobuf.Field.d(8, tss_common_GrantType, "optional", tss_common_GrantType.GrantTypeDirectly)
    public grantType?: tss_common_GrantType|null = tss_common_GrantType.GrantTypeDirectly
}
export interface IIncUserAssetsReq {
    uid?: number|null
    items?: IAssetsChangeItem[]
    stamp?: IAssetsChangeStamp
}
@protobuf.Type.d("tss_hall_common_IncUserAssetsReq")
export class IncUserAssetsReq extends protobuf.Message<IIncUserAssetsReq> {
    constructor(properties: Properties<IIncUserAssetsReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.items) { this.items = []; properties.items.forEach((value, index)=>{this.items[index] = AssetsChangeItem.create(properties.items[index]) as any})}
            if (properties.stamp) { this.stamp = AssetsChangeStamp.create(properties.stamp) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "tss_hall_common_AssetsChangeItem", "repeated")
    public items?: AssetsChangeItem[] = []
    @protobuf.Field.d(3, "tss_hall_common_AssetsChangeStamp", "optional")
    public stamp?: AssetsChangeStamp|null
}
export interface IIncUserAssetsResp {
    batchID?: string|null
    assets?: IDynamicAssetItems[]
}
@protobuf.Type.d("tss_hall_common_IncUserAssetsResp")
export class IncUserAssetsResp extends protobuf.Message<IIncUserAssetsResp> {
    constructor(properties: Properties<IIncUserAssetsResp>) {
        super(properties);
        if (properties) {
            if (properties.batchID) { this.batchID = properties.batchID }
            if (properties.assets) { this.assets = []; properties.assets.forEach((value, index)=>{this.assets[index] = DynamicAssetItems.create(properties.assets[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public batchID?: string|null = ""
    @protobuf.Field.d(2, "tss_hall_common_DynamicAssetItems", "repeated")
    public assets?: DynamicAssetItems[] = []
}
export interface ICalcIncUserAssetsReq {
    uid?: number|null
    items?: IAssetsChangeItem[]
    stamp?: IAssetsChangeStamp
}
@protobuf.Type.d("tss_hall_common_CalcIncUserAssetsReq")
export class CalcIncUserAssetsReq extends protobuf.Message<ICalcIncUserAssetsReq> {
    constructor(properties: Properties<ICalcIncUserAssetsReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.items) { this.items = []; properties.items.forEach((value, index)=>{this.items[index] = AssetsChangeItem.create(properties.items[index]) as any})}
            if (properties.stamp) { this.stamp = AssetsChangeStamp.create(properties.stamp) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "tss_hall_common_AssetsChangeItem", "repeated")
    public items?: AssetsChangeItem[] = []
    @protobuf.Field.d(3, "tss_hall_common_AssetsChangeStamp", "optional")
    public stamp?: AssetsChangeStamp|null
}
export interface ICalcIncUserAssetsResp {
    assets?: IDynamicAssetItems[]
}
@protobuf.Type.d("tss_hall_common_CalcIncUserAssetsResp")
export class CalcIncUserAssetsResp extends protobuf.Message<ICalcIncUserAssetsResp> {
    constructor(properties: Properties<ICalcIncUserAssetsResp>) {
        super(properties);
        if (properties) {
            if (properties.assets) { this.assets = []; properties.assets.forEach((value, index)=>{this.assets[index] = DynamicAssetItems.create(properties.assets[index]) as any})}
        }
	}
    @protobuf.Field.d(2, "tss_hall_common_DynamicAssetItems", "repeated")
    public assets?: DynamicAssetItems[] = []
}
export interface ISaveIncUserAssetsReq {
    uid?: number|null
    assets?: IDynamicAssetItems[]
}
@protobuf.Type.d("tss_hall_common_SaveIncUserAssetsReq")
export class SaveIncUserAssetsReq extends protobuf.Message<ISaveIncUserAssetsReq> {
    constructor(properties: Properties<ISaveIncUserAssetsReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.assets) { this.assets = []; properties.assets.forEach((value, index)=>{this.assets[index] = DynamicAssetItems.create(properties.assets[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "tss_hall_common_DynamicAssetItems", "repeated")
    public assets?: DynamicAssetItems[] = []
}
export interface ISaveIncUserAssetsResp {
    batchID?: string|null
}
@protobuf.Type.d("tss_hall_common_SaveIncUserAssetsResp")
export class SaveIncUserAssetsResp extends protobuf.Message<ISaveIncUserAssetsResp> {
    constructor(properties: Properties<ISaveIncUserAssetsResp>) {
        super(properties);
        if (properties) {
            if (properties.batchID) { this.batchID = properties.batchID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public batchID?: string|null = ""
}
export interface IDecUserAssetsReq {
    uid?: number|null
    items?: IAssetsChangeItem[]
    stamp?: IAssetsChangeStamp
}
@protobuf.Type.d("tss_hall_common_DecUserAssetsReq")
export class DecUserAssetsReq extends protobuf.Message<IDecUserAssetsReq> {
    constructor(properties: Properties<IDecUserAssetsReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.items) { this.items = []; properties.items.forEach((value, index)=>{this.items[index] = AssetsChangeItem.create(properties.items[index]) as any})}
            if (properties.stamp) { this.stamp = AssetsChangeStamp.create(properties.stamp) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "tss_hall_common_AssetsChangeItem", "repeated")
    public items?: AssetsChangeItem[] = []
    @protobuf.Field.d(3, "tss_hall_common_AssetsChangeStamp", "optional")
    public stamp?: AssetsChangeStamp|null
}
export interface IDecUserAssetsResp {
    code?: tss_hall_Code|null
    batchID?: string|null
}
@protobuf.Type.d("tss_hall_common_DecUserAssetsResp")
export class DecUserAssetsResp extends protobuf.Message<IDecUserAssetsResp> {
    constructor(properties: Properties<IDecUserAssetsResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.batchID) { this.batchID = properties.batchID }
        }
	}
    @protobuf.Field.d(1, tss_hall_Code, "optional", tss_hall_Code.CODE_SUCCEED)
    public code?: tss_hall_Code|null = tss_hall_Code.CODE_SUCCEED
    @protobuf.Field.d(2, "string", "optional", )
    public batchID?: string|null = ""
}
export interface IFillAssetsReq {
    assets?: tss_common_IAssetItem[]
}
@protobuf.Type.d("tss_hall_common_FillAssetsReq")
export class FillAssetsReq extends protobuf.Message<IFillAssetsReq> {
    constructor(properties: Properties<IFillAssetsReq>) {
        super(properties);
        if (properties) {
            if (properties.assets) { this.assets = []; properties.assets.forEach((value, index)=>{this.assets[index] = tss_common_AssetItem.create(properties.assets[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_common_AssetItem", "repeated")
    public assets?: tss_common_AssetItem[] = []
}
export interface IFillAssetsResp {
    assets?: tss_common_IAssetItem[]
}
@protobuf.Type.d("tss_hall_common_FillAssetsResp")
export class FillAssetsResp extends protobuf.Message<IFillAssetsResp> {
    constructor(properties: Properties<IFillAssetsResp>) {
        super(properties);
        if (properties) {
            if (properties.assets) { this.assets = []; properties.assets.forEach((value, index)=>{this.assets[index] = tss_common_AssetItem.create(properties.assets[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_common_AssetItem", "repeated")
    public assets?: tss_common_AssetItem[] = []
}
import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  Void as base_Void,IVoid as base_IVoid ,  BatchGetResourceReq as base_BatchGetResourceReq,IBatchGetResourceReq as base_IBatchGetResourceReq ,  BatchGetResourceResp as base_BatchGetResourceResp,IBatchGetResourceResp as base_IBatchGetResourceResp ,  } from "idl/base/base"
import {  AssetItem as tss_common_AssetItem,IAssetItem as tss_common_IAssetItem ,  Way as tss_common_Way ,  } from "idl/tss/common/common_define"
import {  DynamicAssetItems as tss_hall_common_DynamicAssetItems,IDynamicAssetItems as tss_hall_common_IDynamicAssetItems ,  } from "idl/tss/hall/common/assets"
import {  BuffExtraConf as tss_hall_common_BuffExtraConf,IBuffExtraConf as tss_hall_common_IBuffExtraConf ,  BuffCondition as tss_hall_common_BuffCondition ,  } from "idl/tss/hall/common/buff"
export enum BuffType {  
    BuffTypeUnknown = 0,  
    BuffTypeTracker = 1,  
    BuffTypeExpAddCard = 2,  
    BuffTypeBalanceAddCard = 3,  
    BuffTypeNoDeductionCupCard = 4,  
    BuffTypeMungAddCard = 5,  
    BuffTypePriorityCard = 6,  
    BuffTypeProtectWinningStreak = 7,
}
export enum Code {  
    CodeOk = 0,  
    CodeNoSuchBuff = 1001,
}
export interface IBuff {
    type?: BuffType|null
    name?: string|null
    desc?: string|null
    img?: string|null
    markupRate?: number|null
}
@protobuf.Type.d("tss_hall_buff_v3_Buff")
export class Buff extends protobuf.Message<IBuff> {
    constructor(properties: Properties<IBuff>) {
        super(properties);
        if (properties) {
            if (properties.type) { this.type = properties.type }
            if (properties.name) { this.name = properties.name }
            if (properties.desc) { this.desc = properties.desc }
            if (properties.img) { this.img = properties.img }
            if (properties.markupRate) { this.markupRate = properties.markupRate }
        }
	}
    @protobuf.Field.d(1, BuffType, "optional", BuffType.BuffTypeUnknown)
    public type?: BuffType|null = BuffType.BuffTypeUnknown
    @protobuf.Field.d(3, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public desc?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public img?: string|null = ""
    @protobuf.Field.d(6, "int64", "optional", 0)
    public markupRate?: number|null = 0
}
export interface IUpdateBuffReq {
    buff?: IBuff
}
@protobuf.Type.d("tss_hall_buff_v3_UpdateBuffReq")
export class UpdateBuffReq extends protobuf.Message<IUpdateBuffReq> {
    constructor(properties: Properties<IUpdateBuffReq>) {
        super(properties);
        if (properties) {
            if (properties.buff) { this.buff = Buff.create(properties.buff) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_buff_v3_Buff", "optional")
    public buff?: Buff|null
}
export interface IListBuffReq {
}
@protobuf.Type.d("tss_hall_buff_v3_ListBuffReq")
export class ListBuffReq extends protobuf.Message<IListBuffReq> {
    constructor(properties: Properties<IListBuffReq>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IListBuffResp {
    buffs?: IBuff[]
}
@protobuf.Type.d("tss_hall_buff_v3_ListBuffResp")
export class ListBuffResp extends protobuf.Message<IListBuffResp> {
    constructor(properties: Properties<IListBuffResp>) {
        super(properties);
        if (properties) {
            if (properties.buffs) { this.buffs = []; properties.buffs.forEach((value, index)=>{this.buffs[index] = Buff.create(properties.buffs[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_buff_v3_Buff", "repeated")
    public buffs?: Buff[] = []
}
export interface IUserBuff {
    uid?: number|null
    type?: BuffType|null
    name?: string|null
    img?: string|null
    desc?: string|null
    expireAt?: number|null
    markupRate?: number|null
    buffExtraConf?: tss_hall_common_IBuffExtraConf
}
@protobuf.Type.d("tss_hall_buff_v3_UserBuff")
export class UserBuff extends protobuf.Message<IUserBuff> {
    constructor(properties: Properties<IUserBuff>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.type) { this.type = properties.type }
            if (properties.name) { this.name = properties.name }
            if (properties.img) { this.img = properties.img }
            if (properties.desc) { this.desc = properties.desc }
            if (properties.expireAt) { this.expireAt = properties.expireAt }
            if (properties.markupRate) { this.markupRate = properties.markupRate }
            if (properties.buffExtraConf) { this.buffExtraConf = tss_hall_common_BuffExtraConf.create(properties.buffExtraConf) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, BuffType, "optional", BuffType.BuffTypeUnknown)
    public type?: BuffType|null = BuffType.BuffTypeUnknown
    @protobuf.Field.d(3, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public img?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public desc?: string|null = ""
    @protobuf.Field.d(6, "int64", "optional", 0)
    public expireAt?: number|null = 0
    @protobuf.Field.d(7, "int64", "optional", 0)
    public markupRate?: number|null = 0
    @protobuf.Field.d(8, "tss_hall_common_BuffExtraConf", "optional")
    public buffExtraConf?: tss_hall_common_BuffExtraConf|null
}
export interface IItemsAddByBuff {
    buffType?: BuffType|null
    assetAddByBuff?: tss_common_IAssetItem[]
    markupRate?: number|null
    meta?: { [k: string]: string|null }
}
@protobuf.Type.d("tss_hall_buff_v3_ItemsAddByBuff")
export class ItemsAddByBuff extends protobuf.Message<IItemsAddByBuff> {
    constructor(properties: Properties<IItemsAddByBuff>) {
        super(properties);
        if (properties) {
            if (properties.buffType) { this.buffType = properties.buffType }
            if (properties.assetAddByBuff) { this.assetAddByBuff = []; properties.assetAddByBuff.forEach((value, index)=>{this.assetAddByBuff[index] = tss_common_AssetItem.create(properties.assetAddByBuff[index]) as any})}
            if (properties.markupRate) { this.markupRate = properties.markupRate }
            if (properties.meta) { this.meta = properties.meta }
        }
	}
    @protobuf.Field.d(1, BuffType, "optional", BuffType.BuffTypeUnknown)
    public buffType?: BuffType|null = BuffType.BuffTypeUnknown
    @protobuf.Field.d(2, "tss_common_AssetItem", "repeated")
    public assetAddByBuff?: tss_common_AssetItem[] = []
    @protobuf.Field.d(3, "int64", "optional", 0)
    public markupRate?: number|null = 0
    @protobuf.MapField.d(4, "string", "string")
    public meta?: { [k: string]: string|null } = {}
}
export interface ICalcItemsAddByBuffReq {
    way?: tss_common_Way|null
    asset?: tss_common_IAssetItem[]
    uid?: number|null
}
@protobuf.Type.d("tss_hall_buff_v3_CalcItemsAddByBuffReq")
export class CalcItemsAddByBuffReq extends protobuf.Message<ICalcItemsAddByBuffReq> {
    constructor(properties: Properties<ICalcItemsAddByBuffReq>) {
        super(properties);
        if (properties) {
            if (properties.way) { this.way = properties.way }
            if (properties.asset) { this.asset = []; properties.asset.forEach((value, index)=>{this.asset[index] = tss_common_AssetItem.create(properties.asset[index]) as any})}
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, tss_common_Way, "optional", tss_common_Way.WayNone)
    public way?: tss_common_Way|null = tss_common_Way.WayNone
    @protobuf.Field.d(2, "tss_common_AssetItem", "repeated")
    public asset?: tss_common_AssetItem[] = []
    @protobuf.Field.d(3, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface ICalcItemsAddByBuffResp {
    itemsAddByBuff?: tss_hall_common_IDynamicAssetItems[]
}
@protobuf.Type.d("tss_hall_buff_v3_CalcItemsAddByBuffResp")
export class CalcItemsAddByBuffResp extends protobuf.Message<ICalcItemsAddByBuffResp> {
    constructor(properties: Properties<ICalcItemsAddByBuffResp>) {
        super(properties);
        if (properties) {
            if (properties.itemsAddByBuff) { this.itemsAddByBuff = []; properties.itemsAddByBuff.forEach((value, index)=>{this.itemsAddByBuff[index] = tss_hall_common_DynamicAssetItems.create(properties.itemsAddByBuff[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_common_DynamicAssetItems", "repeated")
    public itemsAddByBuff?: tss_hall_common_DynamicAssetItems[] = []
}
export interface IActivateUserBuffReq {
    uid?: number|null
    buffType?: BuffType|null
    duration?: number|null
    markupRate?: number|null
    buffExtraConf?: tss_hall_common_IBuffExtraConf
}
@protobuf.Type.d("tss_hall_buff_v3_ActivateUserBuffReq")
export class ActivateUserBuffReq extends protobuf.Message<IActivateUserBuffReq> {
    constructor(properties: Properties<IActivateUserBuffReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.buffType) { this.buffType = properties.buffType }
            if (properties.duration) { this.duration = properties.duration }
            if (properties.markupRate) { this.markupRate = properties.markupRate }
            if (properties.buffExtraConf) { this.buffExtraConf = tss_hall_common_BuffExtraConf.create(properties.buffExtraConf) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, BuffType, "optional", BuffType.BuffTypeUnknown)
    public buffType?: BuffType|null = BuffType.BuffTypeUnknown
    @protobuf.Field.d(3, "int64", "optional", 0)
    public duration?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public markupRate?: number|null = 0
    @protobuf.Field.d(5, "tss_hall_common_BuffExtraConf", "optional")
    public buffExtraConf?: tss_hall_common_BuffExtraConf|null
}
export interface ISearchUserBuffReq {
}
@protobuf.Type.d("tss_hall_buff_v3_SearchUserBuffReq")
export class SearchUserBuffReq extends protobuf.Message<ISearchUserBuffReq> {
    constructor(properties: Properties<ISearchUserBuffReq>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface ISearchUserBuffResp {
    buffs?: IUserBuff[]
}
@protobuf.Type.d("tss_hall_buff_v3_SearchUserBuffResp")
export class SearchUserBuffResp extends protobuf.Message<ISearchUserBuffResp> {
    constructor(properties: Properties<ISearchUserBuffResp>) {
        super(properties);
        if (properties) {
            if (properties.buffs) { this.buffs = []; properties.buffs.forEach((value, index)=>{this.buffs[index] = UserBuff.create(properties.buffs[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_buff_v3_UserBuff", "repeated")
    public buffs?: UserBuff[] = []
}
export interface IGetUserBuffReq {
    buffType?: BuffType|null
    buffCondition?: tss_hall_common_BuffCondition|null
}
@protobuf.Type.d("tss_hall_buff_v3_GetUserBuffReq")
export class GetUserBuffReq extends protobuf.Message<IGetUserBuffReq> {
    constructor(properties: Properties<IGetUserBuffReq>) {
        super(properties);
        if (properties) {
            if (properties.buffType) { this.buffType = properties.buffType }
            if (properties.buffCondition) { this.buffCondition = properties.buffCondition }
        }
	}
    @protobuf.Field.d(1, BuffType, "optional", BuffType.BuffTypeUnknown)
    public buffType?: BuffType|null = BuffType.BuffTypeUnknown
    @protobuf.Field.d(2, tss_hall_common_BuffCondition, "optional", tss_hall_common_BuffCondition.BuffConditionUnknown)
    public buffCondition?: tss_hall_common_BuffCondition|null = tss_hall_common_BuffCondition.BuffConditionUnknown
}
export interface IGetUserBuffResp {
    code?: Code|null
    buff?: IUserBuff
}
@protobuf.Type.d("tss_hall_buff_v3_GetUserBuffResp")
export class GetUserBuffResp extends protobuf.Message<IGetUserBuffResp> {
    constructor(properties: Properties<IGetUserBuffResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.buff) { this.buff = UserBuff.create(properties.buff) as any }
        }
	}
    @protobuf.Field.d(1, Code, "optional", Code.CodeOk)
    public code?: Code|null = Code.CodeOk
    @protobuf.Field.d(2, "tss_hall_buff_v3_UserBuff", "optional")
    public buff?: UserBuff|null
}
export interface IListUserBuffForAdminReq {
    uid?: number|null
}
@protobuf.Type.d("tss_hall_buff_v3_ListUserBuffForAdminReq")
export class ListUserBuffForAdminReq extends protobuf.Message<IListUserBuffForAdminReq> {
    constructor(properties: Properties<IListUserBuffForAdminReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IListUserBuffForAdminResp {
    buffs?: IUserBuff[]
}
@protobuf.Type.d("tss_hall_buff_v3_ListUserBuffForAdminResp")
export class ListUserBuffForAdminResp extends protobuf.Message<IListUserBuffForAdminResp> {
    constructor(properties: Properties<IListUserBuffForAdminResp>) {
        super(properties);
        if (properties) {
            if (properties.buffs) { this.buffs = []; properties.buffs.forEach((value, index)=>{this.buffs[index] = UserBuff.create(properties.buffs[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_buff_v3_UserBuff", "repeated")
    public buffs?: UserBuff[] = []
}
export interface IBatchGetUserBuffReq {
    types?: BuffType[]
    uids?: number[]
}
@protobuf.Type.d("tss_hall_buff_v3_BatchGetUserBuffReq")
export class BatchGetUserBuffReq extends protobuf.Message<IBatchGetUserBuffReq> {
    constructor(properties: Properties<IBatchGetUserBuffReq>) {
        super(properties);
        if (properties) {
            if (properties.types) { this.types = []; properties.types.forEach((value, index)=>{this.types[index] = properties.types[index]})}
            if (properties.uids) { this.uids = []; properties.uids.forEach((value, index)=>{this.uids[index] = properties.uids[index]})}
        }
	}
    @protobuf.Field.d(1, BuffType, "repeated", BuffType.BuffTypeUnknown)
    public types?: BuffType[] = []
    @protobuf.Field.d(2, "int64", "repeated", [])
    public uids?: number[] = []
}
export interface IBatchGetUserBuffResp {
    buffs?: IUserBuff[]
}
@protobuf.Type.d("tss_hall_buff_v3_BatchGetUserBuffResp")
export class BatchGetUserBuffResp extends protobuf.Message<IBatchGetUserBuffResp> {
    constructor(properties: Properties<IBatchGetUserBuffResp>) {
        super(properties);
        if (properties) {
            if (properties.buffs) { this.buffs = []; properties.buffs.forEach((value, index)=>{this.buffs[index] = UserBuff.create(properties.buffs[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_buff_v3_UserBuff", "repeated")
    public buffs?: UserBuff[] = []
}
class $BuffService extends RpcService {
    async UpdateBuff(req: IUpdateBuffReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = UpdateBuffReq.create(req)
        this.onBeforeReq("UpdateBuff", data, params)
        const buffer = UpdateBuffReq.encode(data).finish()
        let [err, pack] = await this.call("UpdateBuff", buffer, params)
        if (err) {
            this.onBeforeResp("UpdateBuff", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("UpdateBuff", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListBuff(req: IListBuffReq, params?: RpcParams) : Promise<{err:number, resp:IListBuffResp}> {
        let data = ListBuffReq.create(req)
        this.onBeforeReq("ListBuff", data, params)
        const buffer = ListBuffReq.encode(data).finish()
        let [err, pack] = await this.call("ListBuff", buffer, params)
        if (err) {
            this.onBeforeResp("ListBuff", err)
            return {err: err, resp: null}
        } else {
            let resp = ListBuffResp.decode(pack) as any
            this.onBeforeResp("ListBuff", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ActivateUserBuff(req: IActivateUserBuffReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = ActivateUserBuffReq.create(req)
        this.onBeforeReq("ActivateUserBuff", data, params)
        const buffer = ActivateUserBuffReq.encode(data).finish()
        let [err, pack] = await this.call("ActivateUserBuff", buffer, params)
        if (err) {
            this.onBeforeResp("ActivateUserBuff", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("ActivateUserBuff", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetUserBuff(req: IGetUserBuffReq, params?: RpcParams) : Promise<{err:number, resp:IGetUserBuffResp}> {
        let data = GetUserBuffReq.create(req)
        this.onBeforeReq("GetUserBuff", data, params)
        const buffer = GetUserBuffReq.encode(data).finish()
        let [err, pack] = await this.call("GetUserBuff", buffer, params)
        if (err) {
            this.onBeforeResp("GetUserBuff", err)
            return {err: err, resp: null}
        } else {
            let resp = GetUserBuffResp.decode(pack) as any
            this.onBeforeResp("GetUserBuff", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SearchUserBuff(req: ISearchUserBuffReq, params?: RpcParams) : Promise<{err:number, resp:ISearchUserBuffResp}> {
        let data = SearchUserBuffReq.create(req)
        this.onBeforeReq("SearchUserBuff", data, params)
        const buffer = SearchUserBuffReq.encode(data).finish()
        let [err, pack] = await this.call("SearchUserBuff", buffer, params)
        if (err) {
            this.onBeforeResp("SearchUserBuff", err)
            return {err: err, resp: null}
        } else {
            let resp = SearchUserBuffResp.decode(pack) as any
            this.onBeforeResp("SearchUserBuff", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListUserBuffForAdmin(req: IListUserBuffForAdminReq, params?: RpcParams) : Promise<{err:number, resp:IListUserBuffForAdminResp}> {
        let data = ListUserBuffForAdminReq.create(req)
        this.onBeforeReq("ListUserBuffForAdmin", data, params)
        const buffer = ListUserBuffForAdminReq.encode(data).finish()
        let [err, pack] = await this.call("ListUserBuffForAdmin", buffer, params)
        if (err) {
            this.onBeforeResp("ListUserBuffForAdmin", err)
            return {err: err, resp: null}
        } else {
            let resp = ListUserBuffForAdminResp.decode(pack) as any
            this.onBeforeResp("ListUserBuffForAdmin", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetUserBuff(req: IBatchGetUserBuffReq, params?: RpcParams) : Promise<{err:number, resp:IBatchGetUserBuffResp}> {
        let data = BatchGetUserBuffReq.create(req)
        this.onBeforeReq("BatchGetUserBuff", data, params)
        const buffer = BatchGetUserBuffReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetUserBuff", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetUserBuff", err)
            return {err: err, resp: null}
        } else {
            let resp = BatchGetUserBuffResp.decode(pack) as any
            this.onBeforeResp("BatchGetUserBuff", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetBuffForSync(req: base_IBatchGetResourceReq, params?: RpcParams) : Promise<{err:number, resp:base_IBatchGetResourceResp}> {
        let data = base_BatchGetResourceReq.create(req)
        this.onBeforeReq("BatchGetBuffForSync", data, params)
        const buffer = base_BatchGetResourceReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetBuffForSync", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetBuffForSync", err)
            return {err: err, resp: null}
        } else {
            let resp = base_BatchGetResourceResp.decode(pack) as any
            this.onBeforeResp("BatchGetBuffForSync", err, resp)
            return {err: null, resp: resp}
        }
    }
    async CalcItemsAddByBuff(req: ICalcItemsAddByBuffReq, params?: RpcParams) : Promise<{err:number, resp:ICalcItemsAddByBuffResp}> {
        let data = CalcItemsAddByBuffReq.create(req)
        this.onBeforeReq("CalcItemsAddByBuff", data, params)
        const buffer = CalcItemsAddByBuffReq.encode(data).finish()
        let [err, pack] = await this.call("CalcItemsAddByBuff", buffer, params)
        if (err) {
            this.onBeforeResp("CalcItemsAddByBuff", err)
            return {err: err, resp: null}
        } else {
            let resp = CalcItemsAddByBuffResp.decode(pack) as any
            this.onBeforeResp("CalcItemsAddByBuff", err, resp)
            return {err: null, resp: resp}
        }
    }
}
export const BuffService = new $BuffService({
    name: "tss.hall.buff.v3",
})
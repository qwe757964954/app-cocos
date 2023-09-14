import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  Void as base_Void,IVoid as base_IVoid ,  } from "idl/base/base"
import {  State as tss_common_State ,  AssetType as tss_common_AssetType ,  } from "idl/tss/common/common_define"
import {  Code as tss_hall_Code ,  } from "idl/tss/hall/code"
export enum IntimacyRank {  
    NoRequirement = 0,  
    Acquaintances = 1,  
    OrdinaryFriend = 16,  
    InterestedFriend = 41,  
    CloseFriend = 71,  
    HeartToHeart = 150,
}
export interface ISendCondition {
    intimacyRank?: IntimacyRank|null
    followEachOther?: boolean|null
}
@protobuf.Type.d("tss_hall_sendpresent_v1_SendCondition")
export class SendCondition extends protobuf.Message<ISendCondition> {
    constructor(properties: Properties<ISendCondition>) {
        super(properties);
        if (properties) {
            if (properties.intimacyRank) { this.intimacyRank = properties.intimacyRank }
            if (properties.followEachOther) { this.followEachOther = properties.followEachOther }
        }
	}
    @protobuf.Field.d(1, IntimacyRank, "optional", IntimacyRank.NoRequirement)
    public intimacyRank?: IntimacyRank|null = IntimacyRank.NoRequirement
    @protobuf.Field.d(2, "bool", "optional", false)
    public followEachOther?: boolean|null = false
}
export interface ISendPresentConfig {
    state?: tss_common_State|null
    limitPerDay?: number|null
    limitEachFriendsPerDay?: number|null
    numLimitEachFriendsPerDay?: number|null
    vipLimitEachFriendsPerDay?: number|null
    vipNumLimitEachFriendPerDay?: number|null
    sendCondition?: ISendCondition
}
@protobuf.Type.d("tss_hall_sendpresent_v1_SendPresentConfig")
export class SendPresentConfig extends protobuf.Message<ISendPresentConfig> {
    constructor(properties: Properties<ISendPresentConfig>) {
        super(properties);
        if (properties) {
            if (properties.state) { this.state = properties.state }
            if (properties.limitPerDay) { this.limitPerDay = properties.limitPerDay }
            if (properties.limitEachFriendsPerDay) { this.limitEachFriendsPerDay = properties.limitEachFriendsPerDay }
            if (properties.numLimitEachFriendsPerDay) { this.numLimitEachFriendsPerDay = properties.numLimitEachFriendsPerDay }
            if (properties.vipLimitEachFriendsPerDay) { this.vipLimitEachFriendsPerDay = properties.vipLimitEachFriendsPerDay }
            if (properties.vipNumLimitEachFriendPerDay) { this.vipNumLimitEachFriendPerDay = properties.vipNumLimitEachFriendPerDay }
            if (properties.sendCondition) { this.sendCondition = SendCondition.create(properties.sendCondition) as any }
        }
	}
    @protobuf.Field.d(1, tss_common_State, "optional", tss_common_State.StateUnknown)
    public state?: tss_common_State|null = tss_common_State.StateUnknown
    @protobuf.Field.d(2, "int64", "optional", 0)
    public limitPerDay?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public limitEachFriendsPerDay?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public numLimitEachFriendsPerDay?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public vipLimitEachFriendsPerDay?: number|null = 0
    @protobuf.Field.d(6, "int64", "optional", 0)
    public vipNumLimitEachFriendPerDay?: number|null = 0
    @protobuf.Field.d(7, "tss_hall_sendpresent_v1_SendCondition", "optional")
    public sendCondition?: SendCondition|null
}
export interface IGetConfigResp {
    config?: ISendPresentConfig
}
@protobuf.Type.d("tss_hall_sendpresent_v1_GetConfigResp")
export class GetConfigResp extends protobuf.Message<IGetConfigResp> {
    constructor(properties: Properties<IGetConfigResp>) {
        super(properties);
        if (properties) {
            if (properties.config) { this.config = SendPresentConfig.create(properties.config) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_sendpresent_v1_SendPresentConfig", "optional")
    public config?: SendPresentConfig|null
}
export interface ISaveConfigReq {
    config?: ISendPresentConfig
}
@protobuf.Type.d("tss_hall_sendpresent_v1_SaveConfigReq")
export class SaveConfigReq extends protobuf.Message<ISaveConfigReq> {
    constructor(properties: Properties<ISaveConfigReq>) {
        super(properties);
        if (properties) {
            if (properties.config) { this.config = SendPresentConfig.create(properties.config) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_sendpresent_v1_SendPresentConfig", "optional")
    public config?: SendPresentConfig|null
}
export interface ISendPresentReq {
    toUid?: number|null
    propId?: number|null
    num?: number|null
    assetType?: tss_common_AssetType|null
}
@protobuf.Type.d("tss_hall_sendpresent_v1_SendPresentReq")
export class SendPresentReq extends protobuf.Message<ISendPresentReq> {
    constructor(properties: Properties<ISendPresentReq>) {
        super(properties);
        if (properties) {
            if (properties.toUid) { this.toUid = properties.toUid }
            if (properties.propId) { this.propId = properties.propId }
            if (properties.num) { this.num = properties.num }
            if (properties.assetType) { this.assetType = properties.assetType }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public toUid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public propId?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public num?: number|null = 0
    @protobuf.Field.d(4, tss_common_AssetType, "optional", tss_common_AssetType.AssetTypeUnknown)
    public assetType?: tss_common_AssetType|null = tss_common_AssetType.AssetTypeUnknown
}
export interface ISendPresentResp {
    code?: tss_hall_Code|null
}
@protobuf.Type.d("tss_hall_sendpresent_v1_SendPresentResp")
export class SendPresentResp extends protobuf.Message<ISendPresentResp> {
    constructor(properties: Properties<ISendPresentResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
        }
	}
    @protobuf.Field.d(1, tss_hall_Code, "optional", tss_hall_Code.CODE_SUCCEED)
    public code?: tss_hall_Code|null = tss_hall_Code.CODE_SUCCEED
}
export interface IGetFriendPresentStatusReq {
    toUid?: number|null
}
@protobuf.Type.d("tss_hall_sendpresent_v1_GetFriendPresentStatusReq")
export class GetFriendPresentStatusReq extends protobuf.Message<IGetFriendPresentStatusReq> {
    constructor(properties: Properties<IGetFriendPresentStatusReq>) {
        super(properties);
        if (properties) {
            if (properties.toUid) { this.toUid = properties.toUid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public toUid?: number|null = 0
}
export interface IGetFriendPresentStatusResp {
    code?: tss_hall_Code|null
}
@protobuf.Type.d("tss_hall_sendpresent_v1_GetFriendPresentStatusResp")
export class GetFriendPresentStatusResp extends protobuf.Message<IGetFriendPresentStatusResp> {
    constructor(properties: Properties<IGetFriendPresentStatusResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
        }
	}
    @protobuf.Field.d(1, tss_hall_Code, "optional", tss_hall_Code.CODE_SUCCEED)
    public code?: tss_hall_Code|null = tss_hall_Code.CODE_SUCCEED
}
export interface IGetAllFriendsCanSendResp {
    uids?: number[]
    code?: tss_hall_Code|null
}
@protobuf.Type.d("tss_hall_sendpresent_v1_GetAllFriendsCanSendResp")
export class GetAllFriendsCanSendResp extends protobuf.Message<IGetAllFriendsCanSendResp> {
    constructor(properties: Properties<IGetAllFriendsCanSendResp>) {
        super(properties);
        if (properties) {
            if (properties.uids) { this.uids = []; properties.uids.forEach((value, index)=>{this.uids[index] = properties.uids[index]})}
            if (properties.code) { this.code = properties.code }
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public uids?: number[] = []
    @protobuf.Field.d(2, tss_hall_Code, "optional", tss_hall_Code.CODE_SUCCEED)
    public code?: tss_hall_Code|null = tss_hall_Code.CODE_SUCCEED
}
export interface IGetAllFriendsCanSendReq {
    searchContent?: string|null
}
@protobuf.Type.d("tss_hall_sendpresent_v1_GetAllFriendsCanSendReq")
export class GetAllFriendsCanSendReq extends protobuf.Message<IGetAllFriendsCanSendReq> {
    constructor(properties: Properties<IGetAllFriendsCanSendReq>) {
        super(properties);
        if (properties) {
            if (properties.searchContent) { this.searchContent = properties.searchContent }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public searchContent?: string|null = ""
}
export interface IGetUserDailySendPresentChanceResp {
    chanceRemain?: number|null
}
@protobuf.Type.d("tss_hall_sendpresent_v1_GetUserDailySendPresentChanceResp")
export class GetUserDailySendPresentChanceResp extends protobuf.Message<IGetUserDailySendPresentChanceResp> {
    constructor(properties: Properties<IGetUserDailySendPresentChanceResp>) {
        super(properties);
        if (properties) {
            if (properties.chanceRemain) { this.chanceRemain = properties.chanceRemain }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public chanceRemain?: number|null = 0
}
export interface IBatchSendPresentReq {
    toUids?: number[]
    propId?: number|null
    num?: number|null
    assetType?: tss_common_AssetType|null
}
@protobuf.Type.d("tss_hall_sendpresent_v1_BatchSendPresentReq")
export class BatchSendPresentReq extends protobuf.Message<IBatchSendPresentReq> {
    constructor(properties: Properties<IBatchSendPresentReq>) {
        super(properties);
        if (properties) {
            if (properties.toUids) { this.toUids = []; properties.toUids.forEach((value, index)=>{this.toUids[index] = properties.toUids[index]})}
            if (properties.propId) { this.propId = properties.propId }
            if (properties.num) { this.num = properties.num }
            if (properties.assetType) { this.assetType = properties.assetType }
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public toUids?: number[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public propId?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public num?: number|null = 0
    @protobuf.Field.d(4, tss_common_AssetType, "optional", tss_common_AssetType.AssetTypeUnknown)
    public assetType?: tss_common_AssetType|null = tss_common_AssetType.AssetTypeUnknown
}
export interface IBatchSendPresentResp {
    code?: tss_hall_Code|null
}
@protobuf.Type.d("tss_hall_sendpresent_v1_BatchSendPresentResp")
export class BatchSendPresentResp extends protobuf.Message<IBatchSendPresentResp> {
    constructor(properties: Properties<IBatchSendPresentResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
        }
	}
    @protobuf.Field.d(1, tss_hall_Code, "optional", tss_hall_Code.CODE_SUCCEED)
    public code?: tss_hall_Code|null = tss_hall_Code.CODE_SUCCEED
}
class $SendPresentService extends RpcService {
    async GetConfig(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:IGetConfigResp}> {
        let data = base_Void.create(req)
        this.onBeforeReq("GetConfig", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("GetConfig", buffer, params)
        if (err) {
            this.onBeforeResp("GetConfig", err)
            return {err: err, resp: null}
        } else {
            let resp = GetConfigResp.decode(pack) as any
            this.onBeforeResp("GetConfig", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SaveConfig(req: ISaveConfigReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = SaveConfigReq.create(req)
        this.onBeforeReq("SaveConfig", data, params)
        const buffer = SaveConfigReq.encode(data).finish()
        let [err, pack] = await this.call("SaveConfig", buffer, params)
        if (err) {
            this.onBeforeResp("SaveConfig", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("SaveConfig", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SendPresent(req: ISendPresentReq, params?: RpcParams) : Promise<{err:number, resp:ISendPresentResp}> {
        let data = SendPresentReq.create(req)
        this.onBeforeReq("SendPresent", data, params)
        const buffer = SendPresentReq.encode(data).finish()
        let [err, pack] = await this.call("SendPresent", buffer, params)
        if (err) {
            this.onBeforeResp("SendPresent", err)
            return {err: err, resp: null}
        } else {
            let resp = SendPresentResp.decode(pack) as any
            this.onBeforeResp("SendPresent", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetFriendPresentStatus(req: IGetFriendPresentStatusReq, params?: RpcParams) : Promise<{err:number, resp:IGetFriendPresentStatusResp}> {
        let data = GetFriendPresentStatusReq.create(req)
        this.onBeforeReq("GetFriendPresentStatus", data, params)
        const buffer = GetFriendPresentStatusReq.encode(data).finish()
        let [err, pack] = await this.call("GetFriendPresentStatus", buffer, params)
        if (err) {
            this.onBeforeResp("GetFriendPresentStatus", err)
            return {err: err, resp: null}
        } else {
            let resp = GetFriendPresentStatusResp.decode(pack) as any
            this.onBeforeResp("GetFriendPresentStatus", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetAllFriendsCanSend(req: IGetAllFriendsCanSendReq, params?: RpcParams) : Promise<{err:number, resp:IGetAllFriendsCanSendResp}> {
        let data = GetAllFriendsCanSendReq.create(req)
        this.onBeforeReq("GetAllFriendsCanSend", data, params)
        const buffer = GetAllFriendsCanSendReq.encode(data).finish()
        let [err, pack] = await this.call("GetAllFriendsCanSend", buffer, params)
        if (err) {
            this.onBeforeResp("GetAllFriendsCanSend", err)
            return {err: err, resp: null}
        } else {
            let resp = GetAllFriendsCanSendResp.decode(pack) as any
            this.onBeforeResp("GetAllFriendsCanSend", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetUserDailySendPresentChance(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:IGetUserDailySendPresentChanceResp}> {
        let data = base_Void.create(req)
        this.onBeforeReq("GetUserDailySendPresentChance", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("GetUserDailySendPresentChance", buffer, params)
        if (err) {
            this.onBeforeResp("GetUserDailySendPresentChance", err)
            return {err: err, resp: null}
        } else {
            let resp = GetUserDailySendPresentChanceResp.decode(pack) as any
            this.onBeforeResp("GetUserDailySendPresentChance", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchSendPresent(req: IBatchSendPresentReq, params?: RpcParams) : Promise<{err:number, resp:IBatchSendPresentResp}> {
        let data = BatchSendPresentReq.create(req)
        this.onBeforeReq("BatchSendPresent", data, params)
        const buffer = BatchSendPresentReq.encode(data).finish()
        let [err, pack] = await this.call("BatchSendPresent", buffer, params)
        if (err) {
            this.onBeforeResp("BatchSendPresent", err)
            return {err: err, resp: null}
        } else {
            let resp = BatchSendPresentResp.decode(pack) as any
            this.onBeforeResp("BatchSendPresent", err, resp)
            return {err: null, resp: resp}
        }
    }
}
export const SendPresentService = new $SendPresentService({
    name: "tss.hall.sendpresent.v1",
})
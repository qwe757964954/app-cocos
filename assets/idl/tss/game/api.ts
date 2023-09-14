import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  Void as base_Void,IVoid as base_IVoid ,  } from "idl/base/base"
export enum EnumSetFlag {  
    EnumSetFlagUnknown = 0,  
    Flag_Set_User_Name = 1,  
    Flag_Set_User_Sex = 2,  
    Flag_Set_User_Avatar = 4,
}
export enum AttrType {  
    AttrTypeUnknown = 0,  
    Type_Int64 = 1,  
    Type_String = 2,  
    Type_Int32 = 3,  
    Type_Float64 = 4,  
    Type_Json = 5,  
    Type_Bool = 6,  
    Type_None = 7,
}
export enum AttrTag {  
    AttrTagUnknown = 0,  
    Tag_UserInfo = 65535,  
    Tag_Level = 65534,  
    Tag_Cup = 65533,  
    Tag_EXP = 65532,  
    Tag_LevelName = 65531,  
    Tag_Seg = 65530,  
    Tag_CurWinStreak = 65525,  
    Tag_TopWinStreak = 65526,  
    Tag_WinRate = 65527,  
    Tag_AllCount = 65528,  
    Tag_WinCount = 65529,  
    Tag_LoseCount = 65520,  
    Tag_DrawCount = 65521,  
    Tag_MaxScore = 65522,  
    Tag_UserVIP = 65311,
}
export interface IGetUserInfoReq {
    uid?: number|null
}
@protobuf.Type.d("tss_game_api_v1_GetUserInfoReq")
export class GetUserInfoReq extends protobuf.Message<IGetUserInfoReq> {
    constructor(properties: Properties<IGetUserInfoReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IUserAttr {
    tag?: number|null
    attrType?: number|null
    attrValue?: string|null
}
@protobuf.Type.d("tss_game_api_v1_UserAttr")
export class UserAttr extends protobuf.Message<IUserAttr> {
    constructor(properties: Properties<IUserAttr>) {
        super(properties);
        if (properties) {
            if (properties.tag) { this.tag = properties.tag }
            if (properties.attrType) { this.attrType = properties.attrType }
            if (properties.attrValue) { this.attrValue = properties.attrValue }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public tag?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public attrType?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public attrValue?: string|null = ""
}
export interface IGetMulUserInfoReq {
    uids?: number[]
}
@protobuf.Type.d("tss_game_api_v1_GetMulUserInfoReq")
export class GetMulUserInfoReq extends protobuf.Message<IGetMulUserInfoReq> {
    constructor(properties: Properties<IGetMulUserInfoReq>) {
        super(properties);
        if (properties) {
            if (properties.uids) { this.uids = []; properties.uids.forEach((value, index)=>{this.uids[index] = properties.uids[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public uids?: number[] = []
}
export interface IUserUidAttrs {
    uid?: number|null
    attrs?: IUserAttr[]
}
@protobuf.Type.d("tss_game_api_v1_UserUidAttrs")
export class UserUidAttrs extends protobuf.Message<IUserUidAttrs> {
    constructor(properties: Properties<IUserUidAttrs>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.attrs) { this.attrs = []; properties.attrs.forEach((value, index)=>{this.attrs[index] = UserAttr.create(properties.attrs[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "tss_game_api_v1_UserAttr", "repeated")
    public attrs?: UserAttr[] = []
}
export interface IGetGameCareerReq {
}
@protobuf.Type.d("tss_game_api_v1_GetGameCareerReq")
export class GetGameCareerReq extends protobuf.Message<IGetGameCareerReq> {
    constructor(properties: Properties<IGetGameCareerReq>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IGameCareerInfo {
    levelName?: string|null
    totalCups?: number|null
    allCount?: number|null
    winRate?: number|null
    maxScore?: number|null
    topStreakWinCnt?: number|null
}
@protobuf.Type.d("tss_game_api_v1_GameCareerInfo")
export class GameCareerInfo extends protobuf.Message<IGameCareerInfo> {
    constructor(properties: Properties<IGameCareerInfo>) {
        super(properties);
        if (properties) {
            if (properties.levelName) { this.levelName = properties.levelName }
            if (properties.totalCups) { this.totalCups = properties.totalCups }
            if (properties.allCount) { this.allCount = properties.allCount }
            if (properties.winRate) { this.winRate = properties.winRate }
            if (properties.maxScore) { this.maxScore = properties.maxScore }
            if (properties.topStreakWinCnt) { this.topStreakWinCnt = properties.topStreakWinCnt }
        }
	}
    @protobuf.Field.d(3, "string", "optional", )
    public levelName?: string|null = ""
    @protobuf.Field.d(4, "int64", "optional", 0)
    public totalCups?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public allCount?: number|null = 0
    @protobuf.Field.d(6, "float", "optional", 0)
    public winRate?: number|null = 0
    @protobuf.Field.d(7, "int64", "optional", 0)
    public maxScore?: number|null = 0
    @protobuf.Field.d(8, "int32", "optional", 0)
    public topStreakWinCnt?: number|null = 0
}
export interface IGetGameCareerResp {
    code?: number|null
    career?: IGameCareerInfo
}
@protobuf.Type.d("tss_game_api_v1_GetGameCareerResp")
export class GetGameCareerResp extends protobuf.Message<IGetGameCareerResp> {
    constructor(properties: Properties<IGetGameCareerResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.career) { this.career = GameCareerInfo.create(properties.career) as any }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
    @protobuf.Field.d(2, "tss_game_api_v1_GameCareerInfo", "optional")
    public career?: GameCareerInfo|null
}
export interface IGetMulUserInfoResp {
    code?: number|null
    uidAttrs?: IUserUidAttrs[]
}
@protobuf.Type.d("tss_game_api_v1_GetMulUserInfoResp")
export class GetMulUserInfoResp extends protobuf.Message<IGetMulUserInfoResp> {
    constructor(properties: Properties<IGetMulUserInfoResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.uidAttrs) { this.uidAttrs = []; properties.uidAttrs.forEach((value, index)=>{this.uidAttrs[index] = UserUidAttrs.create(properties.uidAttrs[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
    @protobuf.Field.d(2, "tss_game_api_v1_UserUidAttrs", "repeated")
    public uidAttrs?: UserUidAttrs[] = []
}
export interface IGetUserInfoResp {
    code?: number|null
    attrs?: IUserAttr[]
}
@protobuf.Type.d("tss_game_api_v1_GetUserInfoResp")
export class GetUserInfoResp extends protobuf.Message<IGetUserInfoResp> {
    constructor(properties: Properties<IGetUserInfoResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.attrs) { this.attrs = []; properties.attrs.forEach((value, index)=>{this.attrs[index] = UserAttr.create(properties.attrs[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
    @protobuf.Field.d(2, "tss_game_api_v1_UserAttr", "repeated")
    public attrs?: UserAttr[] = []
}
class $API extends RpcService {
    async GetUserInfo(req: IGetUserInfoReq, params?: RpcParams) : Promise<{err:number, resp:IGetUserInfoResp}> {
        let data = GetUserInfoReq.create(req)
        this.onBeforeReq("GetUserInfo", data, params)
        const buffer = GetUserInfoReq.encode(data).finish()
        let [err, pack] = await this.call("GetUserInfo", buffer, params)
        if (err) {
            this.onBeforeResp("GetUserInfo", err)
            return {err: err, resp: null}
        } else {
            let resp = GetUserInfoResp.decode(pack) as any
            this.onBeforeResp("GetUserInfo", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetMulUserInfo(req: IGetMulUserInfoReq, params?: RpcParams) : Promise<{err:number, resp:IGetMulUserInfoResp}> {
        let data = GetMulUserInfoReq.create(req)
        this.onBeforeReq("GetMulUserInfo", data, params)
        const buffer = GetMulUserInfoReq.encode(data).finish()
        let [err, pack] = await this.call("GetMulUserInfo", buffer, params)
        if (err) {
            this.onBeforeResp("GetMulUserInfo", err)
            return {err: err, resp: null}
        } else {
            let resp = GetMulUserInfoResp.decode(pack) as any
            this.onBeforeResp("GetMulUserInfo", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetGameCareer(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:IGetGameCareerResp}> {
        let data = base_Void.create(req)
        this.onBeforeReq("GetGameCareer", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("GetGameCareer", buffer, params)
        if (err) {
            this.onBeforeResp("GetGameCareer", err)
            return {err: err, resp: null}
        } else {
            let resp = GetGameCareerResp.decode(pack) as any
            this.onBeforeResp("GetGameCareer", err, resp)
            return {err: null, resp: resp}
        }
    }
}
export const API = new $API({
    name: "tss.game.api.v1",
})
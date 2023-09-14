import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  DeviceType as bgo_base_DeviceType ,  } from "idl/bgo/base/common"
export enum KickoutAccountReasonType {  
    None = 0,  
    RepeatLogin = 1,  
    RestartServer = 2,  
    PauseServer = 3,  
    LockoutAccount = 4,  
    GuestTrialEnd = 5,  
    Deactivate = 6,
}
export enum ResultCode {  
    OK = 0,  
    NODATA = 1,
}
export interface IEmpty {
}
@protobuf.Type.d("online_Empty")
export class Empty extends protobuf.Message<IEmpty> {
    constructor(properties: Properties<IEmpty>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IKickUsersReq {
    AppID?: number|null
    UIDs?: number[]
    Code?: KickoutAccountReasonType|null
}
@protobuf.Type.d("online_KickUsersReq")
export class KickUsersReq extends protobuf.Message<IKickUsersReq> {
    constructor(properties: Properties<IKickUsersReq>) {
        super(properties);
        if (properties) {
            if (properties.AppID) { this.AppID = properties.AppID }
            if (properties.UIDs) { this.UIDs = []; properties.UIDs.forEach((value, index)=>{this.UIDs[index] = properties.UIDs[index]})}
            if (properties.Code) { this.Code = properties.Code }
        }
	}
    @protobuf.Field.d(1, "uint32", "optional", 0)
    public AppID?: number|null = 0
    @protobuf.Field.d(2, "int64", "repeated", [])
    public UIDs?: number[] = []
    @protobuf.Field.d(3, KickoutAccountReasonType, "optional", KickoutAccountReasonType.None)
    public Code?: KickoutAccountReasonType|null = KickoutAccountReasonType.None
}
export interface IUserLoginReq {
    PlatType?: bgo_base_DeviceType|null
    Fid?: number|null
    Latitude?: number|null
    Longitude?: number|null
    Language?: string|null
    DeviceGuid?: string|null
    ClientVersion?: string|null
    DeviceMode?: string|null
}
@protobuf.Type.d("online_UserLoginReq")
export class UserLoginReq extends protobuf.Message<IUserLoginReq> {
    constructor(properties: Properties<IUserLoginReq>) {
        super(properties);
        if (properties) {
            if (properties.PlatType) { this.PlatType = properties.PlatType }
            if (properties.Fid) { this.Fid = properties.Fid }
            if (properties.Latitude) { this.Latitude = properties.Latitude }
            if (properties.Longitude) { this.Longitude = properties.Longitude }
            if (properties.Language) { this.Language = properties.Language }
            if (properties.DeviceGuid) { this.DeviceGuid = properties.DeviceGuid }
            if (properties.ClientVersion) { this.ClientVersion = properties.ClientVersion }
            if (properties.DeviceMode) { this.DeviceMode = properties.DeviceMode }
        }
	}
    @protobuf.Field.d(1, bgo_base_DeviceType, "optional", bgo_base_DeviceType.WIN)
    public PlatType?: bgo_base_DeviceType|null = bgo_base_DeviceType.WIN
    @protobuf.Field.d(3, "int64", "optional", 0)
    public Fid?: number|null = 0
    @protobuf.Field.d(4, "float", "optional", 0)
    public Latitude?: number|null = 0
    @protobuf.Field.d(5, "float", "optional", 0)
    public Longitude?: number|null = 0
    @protobuf.Field.d(6, "string", "optional", )
    public Language?: string|null = ""
    @protobuf.Field.d(7, "string", "optional", )
    public DeviceGuid?: string|null = ""
    @protobuf.Field.d(8, "string", "optional", )
    public ClientVersion?: string|null = ""
    @protobuf.Field.d(9, "string", "optional", )
    public DeviceMode?: string|null = ""
}
export interface INotifyKickoutUser {
    Code?: KickoutAccountReasonType|null
}
@protobuf.Type.d("online_NotifyKickoutUser")
export class NotifyKickoutUser extends protobuf.Message<INotifyKickoutUser> {
    constructor(properties: Properties<INotifyKickoutUser>) {
        super(properties);
        if (properties) {
            if (properties.Code) { this.Code = properties.Code }
        }
	}
    @protobuf.Field.d(1, KickoutAccountReasonType, "optional", KickoutAccountReasonType.None)
    public Code?: KickoutAccountReasonType|null = KickoutAccountReasonType.None
}
export interface IUserInfo {
    Result?: ResultCode|null
    Fid?: number|null
    IP?: string|null
    Latitude?: number|null
    Longitude?: number|null
    PlatType?: bgo_base_DeviceType|null
    Language?: string|null
    Time?: number|null
}
@protobuf.Type.d("online_UserInfo")
export class UserInfo extends protobuf.Message<IUserInfo> {
    constructor(properties: Properties<IUserInfo>) {
        super(properties);
        if (properties) {
            if (properties.Result) { this.Result = properties.Result }
            if (properties.Fid) { this.Fid = properties.Fid }
            if (properties.IP) { this.IP = properties.IP }
            if (properties.Latitude) { this.Latitude = properties.Latitude }
            if (properties.Longitude) { this.Longitude = properties.Longitude }
            if (properties.PlatType) { this.PlatType = properties.PlatType }
            if (properties.Language) { this.Language = properties.Language }
            if (properties.Time) { this.Time = properties.Time }
        }
	}
    @protobuf.Field.d(1, ResultCode, "optional", ResultCode.OK)
    public Result?: ResultCode|null = ResultCode.OK
    @protobuf.Field.d(2, "int64", "optional", 0)
    public Fid?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public IP?: string|null = ""
    @protobuf.Field.d(4, "float", "optional", 0)
    public Latitude?: number|null = 0
    @protobuf.Field.d(5, "float", "optional", 0)
    public Longitude?: number|null = 0
    @protobuf.Field.d(6, bgo_base_DeviceType, "optional", bgo_base_DeviceType.WIN)
    public PlatType?: bgo_base_DeviceType|null = bgo_base_DeviceType.WIN
    @protobuf.Field.d(7, "string", "optional", )
    public Language?: string|null = ""
    @protobuf.Field.d(8, "int64", "optional", 0)
    public Time?: number|null = 0
}
export interface IGetUserInfosRequest {
    AppID?: number|null
    UIDs?: number[]
}
@protobuf.Type.d("online_GetUserInfosRequest")
export class GetUserInfosRequest extends protobuf.Message<IGetUserInfosRequest> {
    constructor(properties: Properties<IGetUserInfosRequest>) {
        super(properties);
        if (properties) {
            if (properties.AppID) { this.AppID = properties.AppID }
            if (properties.UIDs) { this.UIDs = []; properties.UIDs.forEach((value, index)=>{this.UIDs[index] = properties.UIDs[index]})}
        }
	}
    @protobuf.Field.d(1, "uint32", "optional", 0)
    public AppID?: number|null = 0
    @protobuf.Field.d(2, "int64", "repeated", [])
    public UIDs?: number[] = []
}
export interface IUserOnlineInfo {
    UID?: number|null
    AppIDs?: number[]
}
@protobuf.Type.d("online_UserOnlineInfo")
export class UserOnlineInfo extends protobuf.Message<IUserOnlineInfo> {
    constructor(properties: Properties<IUserOnlineInfo>) {
        super(properties);
        if (properties) {
            if (properties.UID) { this.UID = properties.UID }
            if (properties.AppIDs) { this.AppIDs = []; properties.AppIDs.forEach((value, index)=>{this.AppIDs[index] = properties.AppIDs[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public UID?: number|null = 0
    @protobuf.Field.d(2, "uint32", "repeated", [])
    public AppIDs?: number[] = []
}
export interface IGetUserInfosResponse {
    Users?: IUserOnlineInfo[]
}
@protobuf.Type.d("online_GetUserInfosResponse")
export class GetUserInfosResponse extends protobuf.Message<IGetUserInfosResponse> {
    constructor(properties: Properties<IGetUserInfosResponse>) {
        super(properties);
        if (properties) {
            if (properties.Users) { this.Users = []; properties.Users.forEach((value, index)=>{this.Users[index] = UserOnlineInfo.create(properties.Users[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "online_UserOnlineInfo", "repeated")
    public Users?: UserOnlineInfo[] = []
}
export interface IDelFidsRequest {
    Fids?: number[]
}
@protobuf.Type.d("online_DelFidsRequest")
export class DelFidsRequest extends protobuf.Message<IDelFidsRequest> {
    constructor(properties: Properties<IDelFidsRequest>) {
        super(properties);
        if (properties) {
            if (properties.Fids) { this.Fids = []; properties.Fids.forEach((value, index)=>{this.Fids[index] = properties.Fids[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public Fids?: number[] = []
}
class $Online extends RpcService {
    async UserLogout(req: IEmpty, params?: RpcParams) : Promise<{err:number, resp:IEmpty}> {
        let data = Empty.create(req)
        this.onBeforeReq("UserLogout", data, params)
        const buffer = Empty.encode(data).finish()
        let [err, pack] = await this.call("UserLogout", buffer, params)
        if (err) {
            this.onBeforeResp("UserLogout", err)
            return {err: err, resp: null}
        } else {
            let resp = Empty.decode(pack) as any
            this.onBeforeResp("UserLogout", err, resp)
            return {err: null, resp: resp}
        }
    }
    async UserLogin(req: IUserLoginReq, params?: RpcParams) : Promise<{err:number, resp:IEmpty}> {
        let data = UserLoginReq.create(req)
        this.onBeforeReq("UserLogin", data, params)
        const buffer = UserLoginReq.encode(data).finish()
        let [err, pack] = await this.call("UserLogin", buffer, params)
        if (err) {
            this.onBeforeResp("UserLogin", err)
            return {err: err, resp: null}
        } else {
            let resp = Empty.decode(pack) as any
            this.onBeforeResp("UserLogin", err, resp)
            return {err: null, resp: resp}
        }
    }
    async CloseConnet(req: IEmpty, params?: RpcParams) : Promise<{err:number, resp:IEmpty}> {
        let data = Empty.create(req)
        this.onBeforeReq("CloseConnet", data, params)
        const buffer = Empty.encode(data).finish()
        let [err, pack] = await this.call("CloseConnet", buffer, params)
        if (err) {
            this.onBeforeResp("CloseConnet", err)
            return {err: err, resp: null}
        } else {
            let resp = Empty.decode(pack) as any
            this.onBeforeResp("CloseConnet", err, resp)
            return {err: null, resp: resp}
        }
    }
    async OnFidNonExistent(req: IDelFidsRequest, params?: RpcParams) : Promise<{err:number, resp:IEmpty}> {
        let data = DelFidsRequest.create(req)
        this.onBeforeReq("OnFidNonExistent", data, params)
        const buffer = DelFidsRequest.encode(data).finish()
        let [err, pack] = await this.call("OnFidNonExistent", buffer, params)
        if (err) {
            this.onBeforeResp("OnFidNonExistent", err)
            return {err: err, resp: null}
        } else {
            let resp = Empty.decode(pack) as any
            this.onBeforeResp("OnFidNonExistent", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetUserOnlineInfo(req: IGetUserInfosRequest, params?: RpcParams) : Promise<{err:number, resp:IGetUserInfosResponse}> {
        let data = GetUserInfosRequest.create(req)
        this.onBeforeReq("GetUserOnlineInfo", data, params)
        const buffer = GetUserInfosRequest.encode(data).finish()
        let [err, pack] = await this.call("GetUserOnlineInfo", buffer, params)
        if (err) {
            this.onBeforeResp("GetUserOnlineInfo", err)
            return {err: err, resp: null}
        } else {
            let resp = GetUserInfosResponse.decode(pack) as any
            this.onBeforeResp("GetUserOnlineInfo", err, resp)
            return {err: null, resp: resp}
        }
    }
    async KickUsers(req: IKickUsersReq, params?: RpcParams) : Promise<{err:number, resp:IEmpty}> {
        let data = KickUsersReq.create(req)
        this.onBeforeReq("KickUsers", data, params)
        const buffer = KickUsersReq.encode(data).finish()
        let [err, pack] = await this.call("KickUsers", buffer, params)
        if (err) {
            this.onBeforeResp("KickUsers", err)
            return {err: err, resp: null}
        } else {
            let resp = Empty.decode(pack) as any
            this.onBeforeResp("KickUsers", err, resp)
            return {err: null, resp: resp}
        }
    }
    async KickUserByApp(req: IEmpty, params?: RpcParams) : Promise<{err:number, resp:IEmpty}> {
        let data = Empty.create(req)
        this.onBeforeReq("KickUserByApp", data, params)
        const buffer = Empty.encode(data).finish()
        let [err, pack] = await this.call("KickUserByApp", buffer, params)
        if (err) {
            this.onBeforeResp("KickUserByApp", err)
            return {err: err, resp: null}
        } else {
            let resp = Empty.decode(pack) as any
            this.onBeforeResp("KickUserByApp", err, resp)
            return {err: null, resp: resp}
        }
    }
    NotifyKickUser(data: Uint8Array, params: RpcParams) : {msg: INotifyKickoutUser, eventID?: number} {
        let msg = NotifyKickoutUser.decode(data)
        return {msg: msg}
    }
}
export const Online = new $Online({
    name: "online",
})
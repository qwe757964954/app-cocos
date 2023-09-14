import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
export enum DeviceType {  
    WIN = 0,  
    IOS = 1,  
    ANDROID = 2,  
    WEB = 3,  
    MAC = 4,  
    SIMULATOR = 5,  
    HARMONYOS = 6,
}
export interface ISessionAuthReq {
    Uid?: number|null
    Session?: Uint8Array
    Ext?: IAuthExtend
}
@protobuf.Type.d("bgo_base_SessionAuthReq")
export class SessionAuthReq extends protobuf.Message<ISessionAuthReq> {
    constructor(properties: Properties<ISessionAuthReq>) {
        super(properties);
        if (properties) {
            if (properties.Uid) { this.Uid = properties.Uid }
            if (properties.Session) { this.Session = properties.Session }
            if (properties.Ext) { this.Ext = AuthExtend.create(properties.Ext) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public Uid?: number|null = 0
    @protobuf.Field.d(2, "bytes", "optional", [])
    public Session?: Uint8Array
    @protobuf.Field.d(3, "bgo_base_AuthExtend", "optional")
    public Ext?: AuthExtend|null
}
export interface ISessionAuthResp {
    code?: number|null
    Session?: Uint8Array
    ID?: number|null
}
@protobuf.Type.d("bgo_base_SessionAuthResp")
export class SessionAuthResp extends protobuf.Message<ISessionAuthResp> {
    constructor(properties: Properties<ISessionAuthResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.Session) { this.Session = properties.Session }
            if (properties.ID) { this.ID = properties.ID }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
    @protobuf.Field.d(2, "bytes", "optional", [])
    public Session?: Uint8Array
    @protobuf.Field.d(3, "int64", "optional", 0)
    public ID?: number|null = 0
}
export interface IAuthExtend {
    DeviceGuid?: string|null
    DeviceType?: DeviceType|null
    DeviceMode?: string|null
    ClientTime?: number|null
    Language?: string|null
    ClientVersion?: string|null
    Other?: Uint8Array
}
@protobuf.Type.d("bgo_base_AuthExtend")
export class AuthExtend extends protobuf.Message<IAuthExtend> {
    constructor(properties: Properties<IAuthExtend>) {
        super(properties);
        if (properties) {
            if (properties.DeviceGuid) { this.DeviceGuid = properties.DeviceGuid }
            if (properties.DeviceType) { this.DeviceType = properties.DeviceType }
            if (properties.DeviceMode) { this.DeviceMode = properties.DeviceMode }
            if (properties.ClientTime) { this.ClientTime = properties.ClientTime }
            if (properties.Language) { this.Language = properties.Language }
            if (properties.ClientVersion) { this.ClientVersion = properties.ClientVersion }
            if (properties.Other) { this.Other = properties.Other }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public DeviceGuid?: string|null = ""
    @protobuf.Field.d(2, DeviceType, "optional", DeviceType.WIN)
    public DeviceType?: DeviceType|null = DeviceType.WIN
    @protobuf.Field.d(3, "string", "optional", )
    public DeviceMode?: string|null = ""
    @protobuf.Field.d(4, "uint64", "optional", 0)
    public ClientTime?: number|null = 0
    @protobuf.Field.d(5, "string", "optional", )
    public Language?: string|null = ""
    @protobuf.Field.d(6, "string", "optional", )
    public ClientVersion?: string|null = ""
    @protobuf.Field.d(7, "bytes", "optional", [])
    public Other?: Uint8Array
}
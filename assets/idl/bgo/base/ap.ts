import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
export enum MSGType {  
    CallRequest = 0,  
    PushRequest = 1,  
    Stream = 2,
}
export interface IEmpty {
}
@protobuf.Type.d("ap_Empty")
export class Empty extends protobuf.Message<IEmpty> {
    constructor(properties: Properties<IEmpty>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IByRegister {
    Appid?: number|null
    Token?: string|null
    SpaceName?: string|null
    Key?: number|null
    Ver?: number|null
    TAG?: string|null
    MustMetadata?: { [k: string]: string|null }
}
@protobuf.Type.d("ap_ByRegister")
export class ByRegister extends protobuf.Message<IByRegister> {
    constructor(properties: Properties<IByRegister>) {
        super(properties);
        if (properties) {
            if (properties.Appid) { this.Appid = properties.Appid }
            if (properties.Token) { this.Token = properties.Token }
            if (properties.SpaceName) { this.SpaceName = properties.SpaceName }
            if (properties.Key) { this.Key = properties.Key }
            if (properties.Ver) { this.Ver = properties.Ver }
            if (properties.TAG) { this.TAG = properties.TAG }
            if (properties.MustMetadata) { this.MustMetadata = properties.MustMetadata }
        }
	}
    @protobuf.Field.d(1, "uint32", "optional", 0)
    public Appid?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public Token?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public SpaceName?: string|null = ""
    @protobuf.Field.d(4, "int64", "optional", 0)
    public Key?: number|null = 0
    @protobuf.Field.d(5, "int32", "optional", 0)
    public Ver?: number|null = 0
    @protobuf.Field.d(6, "string", "optional", )
    public TAG?: string|null = ""
    @protobuf.MapField.d(7, "string", "string")
    public MustMetadata?: { [k: string]: string|null } = {}
}
export interface IByRegisterResp {
    CryptoKey?: number|null
    Ver?: number|null
}
@protobuf.Type.d("ap_ByRegisterResp")
export class ByRegisterResp extends protobuf.Message<IByRegisterResp> {
    constructor(properties: Properties<IByRegisterResp>) {
        super(properties);
        if (properties) {
            if (properties.CryptoKey) { this.CryptoKey = properties.CryptoKey }
            if (properties.Ver) { this.Ver = properties.Ver }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public CryptoKey?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public Ver?: number|null = 0
}
export interface IByHead {
    Server?: string|null
    Method?: string|null
    DestID?: number|null
    Req?: number|null
    MType?: MSGType|null
    StreamID?: number|null
}
@protobuf.Type.d("ap_ByHead")
export class ByHead extends protobuf.Message<IByHead> {
    constructor(properties: Properties<IByHead>) {
        super(properties);
        if (properties) {
            if (properties.Server) { this.Server = properties.Server }
            if (properties.Method) { this.Method = properties.Method }
            if (properties.DestID) { this.DestID = properties.DestID }
            if (properties.Req) { this.Req = properties.Req }
            if (properties.MType) { this.MType = properties.MType }
            if (properties.StreamID) { this.StreamID = properties.StreamID }
        }
	}
    @protobuf.Field.d(2, "string", "optional", )
    public Server?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public Method?: string|null = ""
    @protobuf.Field.d(4, "int64", "optional", 0)
    public DestID?: number|null = 0
    @protobuf.Field.d(5, "uint32", "optional", 0)
    public Req?: number|null = 0
    @protobuf.Field.d(6, MSGType, "optional", MSGType.CallRequest)
    public MType?: MSGType|null = MSGType.CallRequest
    @protobuf.Field.d(7, "uint32", "optional", 0)
    public StreamID?: number|null = 0
}
export interface IByPack {
    Header?: IByHead
    Body?: Uint8Array
    Metadata?: { [k: string]: string|null }
    Err?: number|null
    ErrMsg?: string|null
    BitState?: Uint8Array
    Ext?: Uint8Array
}
@protobuf.Type.d("ap_ByPack")
export class ByPack extends protobuf.Message<IByPack> {
    constructor(properties: Properties<IByPack>) {
        super(properties);
        if (properties) {
            if (properties.Header) { this.Header = ByHead.create(properties.Header) as any }
            if (properties.Body) { this.Body = properties.Body }
            if (properties.Metadata) { this.Metadata = properties.Metadata }
            if (properties.Err) { this.Err = properties.Err }
            if (properties.ErrMsg) { this.ErrMsg = properties.ErrMsg }
            if (properties.BitState) { this.BitState = properties.BitState }
            if (properties.Ext) { this.Ext = properties.Ext }
        }
	}
    @protobuf.Field.d(1, "ap_ByHead", "optional")
    public Header?: ByHead|null
    @protobuf.Field.d(2, "bytes", "optional", [])
    public Body?: Uint8Array
    @protobuf.MapField.d(3, "string", "string")
    public Metadata?: { [k: string]: string|null } = {}
    @protobuf.Field.d(4, "int32", "optional", 0)
    public Err?: number|null = 0
    @protobuf.Field.d(5, "string", "optional", )
    public ErrMsg?: string|null = ""
    @protobuf.Field.d(6, "bytes", "optional", [])
    public BitState?: Uint8Array
    @protobuf.Field.d(7, "bytes", "optional", [])
    public Ext?: Uint8Array
}
export interface IPing {
    SendTime?: number|null
    RecvTime?: number|null
}
@protobuf.Type.d("ap_Ping")
export class Ping extends protobuf.Message<IPing> {
    constructor(properties: Properties<IPing>) {
        super(properties);
        if (properties) {
            if (properties.SendTime) { this.SendTime = properties.SendTime }
            if (properties.RecvTime) { this.RecvTime = properties.RecvTime }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public SendTime?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public RecvTime?: number|null = 0
}
export interface IGetAppReq {
    Appid?: number|null
}
@protobuf.Type.d("ap_GetAppReq")
export class GetAppReq extends protobuf.Message<IGetAppReq> {
    constructor(properties: Properties<IGetAppReq>) {
        super(properties);
        if (properties) {
            if (properties.Appid) { this.Appid = properties.Appid }
        }
	}
    @protobuf.Field.d(1, "uint32", "optional", 0)
    public Appid?: number|null = 0
}
export interface IGetAppResp {
    Appid?: number|null
    Name?: string|null
}
@protobuf.Type.d("ap_GetAppResp")
export class GetAppResp extends protobuf.Message<IGetAppResp> {
    constructor(properties: Properties<IGetAppResp>) {
        super(properties);
        if (properties) {
            if (properties.Appid) { this.Appid = properties.Appid }
            if (properties.Name) { this.Name = properties.Name }
        }
	}
    @protobuf.Field.d(1, "uint32", "optional", 0)
    public Appid?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public Name?: string|null = ""
}
class $Ap extends RpcService {
    async Register(req: IByRegister, params?: RpcParams) : Promise<{err:number, resp:IEmpty}> {
        let data = ByRegister.create(req)
        this.onBeforeReq("Register", data, params)
        const buffer = ByRegister.encode(data).finish()
        let [err, pack] = await this.call("Register", buffer, params)
        if (err) {
            this.onBeforeResp("Register", err)
            return {err: err, resp: null}
        } else {
            let resp = Empty.decode(pack) as any
            this.onBeforeResp("Register", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ApPing(req: IPing, params?: RpcParams) : Promise<{err:number, resp:IPing}> {
        let data = Ping.create(req)
        this.onBeforeReq("ApPing", data, params)
        const buffer = Ping.encode(data).finish()
        let [err, pack] = await this.call("ApPing", buffer, params)
        if (err) {
            this.onBeforeResp("ApPing", err)
            return {err: err, resp: null}
        } else {
            let resp = Ping.decode(pack) as any
            this.onBeforeResp("ApPing", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetApp(req: IGetAppReq, params?: RpcParams) : Promise<{err:number, resp:IGetAppResp}> {
        let data = GetAppReq.create(req)
        this.onBeforeReq("GetApp", data, params)
        const buffer = GetAppReq.encode(data).finish()
        let [err, pack] = await this.call("GetApp", buffer, params)
        if (err) {
            this.onBeforeResp("GetApp", err)
            return {err: err, resp: null}
        } else {
            let resp = GetAppResp.decode(pack) as any
            this.onBeforeResp("GetApp", err, resp)
            return {err: null, resp: resp}
        }
    }
    NotifyChangeAp(data: Uint8Array, params: RpcParams) : {msg: IEmpty, eventID?: number} {
        let msg = Empty.decode(data)
        return {msg: msg}
    }
    NotifyCloseServer(data: Uint8Array, params: RpcParams) : {msg: IEmpty, eventID?: number} {
        let msg = Empty.decode(data)
        return {msg: msg}
    }
}
export const Ap = new $Ap({
    name: "ap",
})
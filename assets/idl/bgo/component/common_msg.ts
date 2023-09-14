import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
export enum PlatTypeCode {  
    WIN = 0,  
    IOS = 1,  
    ANDROID = 2,  
    WEB = 3,  
    MAC = 4,
}
export interface IUesrOnLine {
    PlatType?: PlatTypeCode|null
    Fid?: number|null
    IP?: string|null
}
@protobuf.Type.d("bgo_component_UesrOnLine")
export class UesrOnLine extends protobuf.Message<IUesrOnLine> {
    constructor(properties: Properties<IUesrOnLine>) {
        super(properties);
        if (properties) {
            if (properties.PlatType) { this.PlatType = properties.PlatType }
            if (properties.Fid) { this.Fid = properties.Fid }
            if (properties.IP) { this.IP = properties.IP }
        }
	}
    @protobuf.Field.d(1, PlatTypeCode, "optional", PlatTypeCode.WIN)
    public PlatType?: PlatTypeCode|null = PlatTypeCode.WIN
    @protobuf.Field.d(2, "int64", "optional", 0)
    public Fid?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public IP?: string|null = ""
}
export interface IUesrOffLine {
    Fid?: number|null
}
@protobuf.Type.d("bgo_component_UesrOffLine")
export class UesrOffLine extends protobuf.Message<IUesrOffLine> {
    constructor(properties: Properties<IUesrOffLine>) {
        super(properties);
        if (properties) {
            if (properties.Fid) { this.Fid = properties.Fid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public Fid?: number|null = 0
}
export interface IServerChange {
    Name?: string|null
    ID?: number|null
}
@protobuf.Type.d("bgo_component_ServerChange")
export class ServerChange extends protobuf.Message<IServerChange> {
    constructor(properties: Properties<IServerChange>) {
        super(properties);
        if (properties) {
            if (properties.Name) { this.Name = properties.Name }
            if (properties.ID) { this.ID = properties.ID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public Name?: string|null = ""
    @protobuf.Field.d(2, "uint32", "optional", 0)
    public ID?: number|null = 0
}
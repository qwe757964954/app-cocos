import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
export interface IVoid {
}
@protobuf.Type.d("dummy_base_Void")
export class Void extends protobuf.Message<IVoid> {
    constructor(properties: Properties<IVoid>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface ILabel {
    Key?: string|null
    Value?: string|null
}
@protobuf.Type.d("dummy_base_Label")
export class Label extends protobuf.Message<ILabel> {
    constructor(properties: Properties<ILabel>) {
        super(properties);
        if (properties) {
            if (properties.Key) { this.Key = properties.Key }
            if (properties.Value) { this.Value = properties.Value }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public Key?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public Value?: string|null = ""
}
export interface IExceptionResp {
    code?: number|null
}
@protobuf.Type.d("dummy_base_ExceptionResp")
export class ExceptionResp extends protobuf.Message<IExceptionResp> {
    constructor(properties: Properties<IExceptionResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
}
export interface IFieldMask {
    paths?: string[]
}
@protobuf.Type.d("dummy_base_FieldMask")
export class FieldMask extends protobuf.Message<IFieldMask> {
    constructor(properties: Properties<IFieldMask>) {
        super(properties);
        if (properties) {
            if (properties.paths) { this.paths = []; properties.paths.forEach((value, index)=>{this.paths[index] = properties.paths[index]})}
        }
	}
    @protobuf.Field.d(1, "string", "repeated", [])
    public paths?: string[] = []
}
export interface ISyncDependence {
    serviceName?: string|null
    updateMethodName?: string|null
    getMethodName?: string|null
    int64Ids?: number[]
    stringIds?: string[]
}
@protobuf.Type.d("dummy_base_SyncDependence")
export class SyncDependence extends protobuf.Message<ISyncDependence> {
    constructor(properties: Properties<ISyncDependence>) {
        super(properties);
        if (properties) {
            if (properties.serviceName) { this.serviceName = properties.serviceName }
            if (properties.updateMethodName) { this.updateMethodName = properties.updateMethodName }
            if (properties.getMethodName) { this.getMethodName = properties.getMethodName }
            if (properties.int64Ids) { this.int64Ids = []; properties.int64Ids.forEach((value, index)=>{this.int64Ids[index] = properties.int64Ids[index]})}
            if (properties.stringIds) { this.stringIds = []; properties.stringIds.forEach((value, index)=>{this.stringIds[index] = properties.stringIds[index]})}
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public serviceName?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public updateMethodName?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public getMethodName?: string|null = ""
    @protobuf.Field.d(4, "int64", "repeated", [])
    public int64Ids?: number[] = []
    @protobuf.Field.d(5, "string", "repeated", [])
    public stringIds?: string[] = []
}
export interface IBatchGetResourceReq {
    int64Ids?: number[]
    stringIds?: string[]
    operator?: string|null
}
@protobuf.Type.d("dummy_base_BatchGetResourceReq")
export class BatchGetResourceReq extends protobuf.Message<IBatchGetResourceReq> {
    constructor(properties: Properties<IBatchGetResourceReq>) {
        super(properties);
        if (properties) {
            if (properties.int64Ids) { this.int64Ids = []; properties.int64Ids.forEach((value, index)=>{this.int64Ids[index] = properties.int64Ids[index]})}
            if (properties.stringIds) { this.stringIds = []; properties.stringIds.forEach((value, index)=>{this.stringIds[index] = properties.stringIds[index]})}
            if (properties.operator) { this.operator = properties.operator }
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public int64Ids?: number[] = []
    @protobuf.Field.d(2, "string", "repeated", [])
    public stringIds?: string[] = []
    @protobuf.Field.d(3, "string", "optional", )
    public operator?: string|null = ""
}
export interface IResource {
    id?: number|null
    updateData?: Uint8Array
    checksum?: string|null
    dependencies?: ISyncDependence[]
    desc?: string|null
    stringID?: string|null
}
@protobuf.Type.d("dummy_base_Resource")
export class Resource extends protobuf.Message<IResource> {
    constructor(properties: Properties<IResource>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.updateData) { this.updateData = properties.updateData }
            if (properties.checksum) { this.checksum = properties.checksum }
            if (properties.dependencies) { this.dependencies = []; properties.dependencies.forEach((value, index)=>{this.dependencies[index] = SyncDependence.create(properties.dependencies[index]) as any})}
            if (properties.desc) { this.desc = properties.desc }
            if (properties.stringID) { this.stringID = properties.stringID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public id?: number|null = 0
    @protobuf.Field.d(2, "bytes", "optional", [])
    public updateData?: Uint8Array
    @protobuf.Field.d(3, "string", "optional", )
    public checksum?: string|null = ""
    @protobuf.Field.d(4, "dummy_base_SyncDependence", "repeated")
    public dependencies?: SyncDependence[] = []
    @protobuf.Field.d(5, "string", "optional", )
    public desc?: string|null = ""
    @protobuf.Field.d(6, "string", "optional", )
    public stringID?: string|null = ""
}
export interface IBatchGetResourceResp {
    resources?: IResource[]
}
@protobuf.Type.d("dummy_base_BatchGetResourceResp")
export class BatchGetResourceResp extends protobuf.Message<IBatchGetResourceResp> {
    constructor(properties: Properties<IBatchGetResourceResp>) {
        super(properties);
        if (properties) {
            if (properties.resources) { this.resources = []; properties.resources.forEach((value, index)=>{this.resources[index] = Resource.create(properties.resources[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "dummy_base_Resource", "repeated")
    public resources?: Resource[] = []
}
export interface IResourceDesc {
    serviceName?: string|null
    getMethodName?: string|null
    updateMethodName?: string|null
    ids?: number[]
}
@protobuf.Type.d("dummy_base_ResourceDesc")
export class ResourceDesc extends protobuf.Message<IResourceDesc> {
    constructor(properties: Properties<IResourceDesc>) {
        super(properties);
        if (properties) {
            if (properties.serviceName) { this.serviceName = properties.serviceName }
            if (properties.getMethodName) { this.getMethodName = properties.getMethodName }
            if (properties.updateMethodName) { this.updateMethodName = properties.updateMethodName }
            if (properties.ids) { this.ids = []; properties.ids.forEach((value, index)=>{this.ids[index] = properties.ids[index]})}
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public serviceName?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public getMethodName?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public updateMethodName?: string|null = ""
    @protobuf.Field.d(4, "int64", "repeated", [])
    public ids?: number[] = []
}
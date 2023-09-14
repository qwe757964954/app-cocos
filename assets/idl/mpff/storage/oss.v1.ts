import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
export enum Code {  
    Success = 0,
}
export enum Platform {  
    PlatformUnknown = 0,  
    PlatformAli = 1,  
    PlatformTencent = 2,  
    PlatformMinio = 3,
}
export enum AuditResult {  
    AuditResultPass = 0,  
    AuditResultSensitive = 1,  
    AuditResultSuspect = 2,
}
export interface IHost {
    protocol?: string|null
    url?: string|null
}
@protobuf.Type.d("mpff_storage_oss_v1_Host")
export class Host extends protobuf.Message<IHost> {
    constructor(properties: Properties<IHost>) {
        super(properties);
        if (properties) {
            if (properties.protocol) { this.protocol = properties.protocol }
            if (properties.url) { this.url = properties.url }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public protocol?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public url?: string|null = ""
}
export interface ICredentials {
    securityToken?: string|null
    accessKeyID?: string|null
    accessKeySecret?: string|null
    expire?: number|null
    region?: string|null
    bucket?: string|null
    dir?: string|null
    host?: IHost
}
@protobuf.Type.d("mpff_storage_oss_v1_Credentials")
export class Credentials extends protobuf.Message<ICredentials> {
    constructor(properties: Properties<ICredentials>) {
        super(properties);
        if (properties) {
            if (properties.securityToken) { this.securityToken = properties.securityToken }
            if (properties.accessKeyID) { this.accessKeyID = properties.accessKeyID }
            if (properties.accessKeySecret) { this.accessKeySecret = properties.accessKeySecret }
            if (properties.expire) { this.expire = properties.expire }
            if (properties.region) { this.region = properties.region }
            if (properties.bucket) { this.bucket = properties.bucket }
            if (properties.dir) { this.dir = properties.dir }
            if (properties.host) { this.host = Host.create(properties.host) as any }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public securityToken?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public accessKeyID?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public accessKeySecret?: string|null = ""
    @protobuf.Field.d(4, "int64", "optional", 0)
    public expire?: number|null = 0
    @protobuf.Field.d(5, "string", "optional", )
    public region?: string|null = ""
    @protobuf.Field.d(6, "string", "optional", )
    public bucket?: string|null = ""
    @protobuf.Field.d(7, "string", "optional", )
    public dir?: string|null = ""
    @protobuf.Field.d(8, "mpff_storage_oss_v1_Host", "optional")
    public host?: Host|null
}
export interface IGetSTSReq {
}
@protobuf.Type.d("mpff_storage_oss_v1_GetSTSReq")
export class GetSTSReq extends protobuf.Message<IGetSTSReq> {
    constructor(properties: Properties<IGetSTSReq>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IGetSTSResp {
    platform?: Platform|null
    credentials?: ICredentials
    isOpenAudit?: boolean|null
}
@protobuf.Type.d("mpff_storage_oss_v1_GetSTSResp")
export class GetSTSResp extends protobuf.Message<IGetSTSResp> {
    constructor(properties: Properties<IGetSTSResp>) {
        super(properties);
        if (properties) {
            if (properties.platform) { this.platform = properties.platform }
            if (properties.credentials) { this.credentials = Credentials.create(properties.credentials) as any }
            if (properties.isOpenAudit) { this.isOpenAudit = properties.isOpenAudit }
        }
	}
    @protobuf.Field.d(1, Platform, "optional", Platform.PlatformUnknown)
    public platform?: Platform|null = Platform.PlatformUnknown
    @protobuf.Field.d(2, "mpff_storage_oss_v1_Credentials", "optional")
    public credentials?: Credentials|null
    @protobuf.Field.d(3, "bool", "optional", false)
    public isOpenAudit?: boolean|null = false
}
export interface IImageAuditReq {
    objectKey?: string|null
}
@protobuf.Type.d("mpff_storage_oss_v1_ImageAuditReq")
export class ImageAuditReq extends protobuf.Message<IImageAuditReq> {
    constructor(properties: Properties<IImageAuditReq>) {
        super(properties);
        if (properties) {
            if (properties.objectKey) { this.objectKey = properties.objectKey }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public objectKey?: string|null = ""
}
export interface IImageAuditResp {
    result?: AuditResult|null
}
@protobuf.Type.d("mpff_storage_oss_v1_ImageAuditResp")
export class ImageAuditResp extends protobuf.Message<IImageAuditResp> {
    constructor(properties: Properties<IImageAuditResp>) {
        super(properties);
        if (properties) {
            if (properties.result) { this.result = properties.result }
        }
	}
    @protobuf.Field.d(1, AuditResult, "optional", AuditResult.AuditResultPass)
    public result?: AuditResult|null = AuditResult.AuditResultPass
}
class $OSS extends RpcService {
    async GetSTS(req: IGetSTSReq, params?: RpcParams) : Promise<{err:number, resp:IGetSTSResp}> {
        let data = GetSTSReq.create(req)
        this.onBeforeReq("GetSTS", data, params)
        const buffer = GetSTSReq.encode(data).finish()
        let [err, pack] = await this.call("GetSTS", buffer, params)
        if (err) {
            this.onBeforeResp("GetSTS", err)
            return {err: err, resp: null}
        } else {
            let resp = GetSTSResp.decode(pack) as any
            this.onBeforeResp("GetSTS", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ImageAudit(req: IImageAuditReq, params?: RpcParams) : Promise<{err:number, resp:IImageAuditResp}> {
        let data = ImageAuditReq.create(req)
        this.onBeforeReq("ImageAudit", data, params)
        const buffer = ImageAuditReq.encode(data).finish()
        let [err, pack] = await this.call("ImageAudit", buffer, params)
        if (err) {
            this.onBeforeResp("ImageAudit", err)
            return {err: err, resp: null}
        } else {
            let resp = ImageAuditResp.decode(pack) as any
            this.onBeforeResp("ImageAudit", err, resp)
            return {err: null, resp: resp}
        }
    }
}
export const OSS = new $OSS({
    name: "mpff.storage.oss.v1",
})
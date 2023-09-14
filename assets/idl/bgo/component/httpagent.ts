import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
export enum AgentAppId {  
    AgentAppIdUnknown = 0,  
    H5PrizeMiniProgram = 1023,  
    H5PrizeCenter = 1024,
}
export enum Permission {  
    PermissionRejectAll = 0,  
    PermissionMustAppServerAuth = 1,  
    PermissionGatewayJwtAuth = 2,  
    PermissionAllowAll = 15,
}
export enum FilterMode {  
    FilterModeReject = 0,  
    FilterModeAllow = 1,
}
export interface IHttpBody {
    content_type?: string|null
    data?: Uint8Array
    rawQuery?: string|null
}
@protobuf.Type.d("bgo_component_httpagent_HttpBody")
export class HttpBody extends protobuf.Message<IHttpBody> {
    constructor(properties: Properties<IHttpBody>) {
        super(properties);
        if (properties) {
            if (properties.content_type) { this.content_type = properties.content_type }
            if (properties.data) { this.data = properties.data }
            if (properties.rawQuery) { this.rawQuery = properties.rawQuery }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public content_type?: string|null = ""
    @protobuf.Field.d(2, "bytes", "optional", [])
    public data?: Uint8Array
    @protobuf.Field.d(4, "string", "optional", )
    public rawQuery?: string|null = ""
}
export interface IRespBody {
    code?: number|null
    msg?: string|null
    data?: Uint8Array
}
@protobuf.Type.d("bgo_component_httpagent_RespBody")
export class RespBody extends protobuf.Message<IRespBody> {
    constructor(properties: Properties<IRespBody>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.msg) { this.msg = properties.msg }
            if (properties.data) { this.data = properties.data }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public msg?: string|null = ""
    @protobuf.Field.d(3, "bytes", "optional", [])
    public data?: Uint8Array
}
export interface IRoutePermissionConfig {
    path?: string|null
    permission?: Permission|null
}
@protobuf.Type.d("bgo_component_httpagent_RoutePermissionConfig")
export class RoutePermissionConfig extends protobuf.Message<IRoutePermissionConfig> {
    constructor(properties: Properties<IRoutePermissionConfig>) {
        super(properties);
        if (properties) {
            if (properties.path) { this.path = properties.path }
            if (properties.permission) { this.permission = properties.permission }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public path?: string|null = ""
    @protobuf.Field.d(2, Permission, "optional", Permission.PermissionRejectAll)
    public permission?: Permission|null = Permission.PermissionRejectAll
}
export interface ITokenClaims {
    appId?: number|null
    appChannel?: string|null
    uid?: number|null
    ttlSec?: number|null
}
@protobuf.Type.d("bgo_component_httpagent_TokenClaims")
export class TokenClaims extends protobuf.Message<ITokenClaims> {
    constructor(properties: Properties<ITokenClaims>) {
        super(properties);
        if (properties) {
            if (properties.appId) { this.appId = properties.appId }
            if (properties.appChannel) { this.appChannel = properties.appChannel }
            if (properties.uid) { this.uid = properties.uid }
            if (properties.ttlSec) { this.ttlSec = properties.ttlSec }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public appId?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public appChannel?: string|null = ""
    @protobuf.Field.d(3, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public ttlSec?: number|null = 0
}
export interface IGenJwtReq {
    claims?: ITokenClaims
}
@protobuf.Type.d("bgo_component_httpagent_GenJwtReq")
export class GenJwtReq extends protobuf.Message<IGenJwtReq> {
    constructor(properties: Properties<IGenJwtReq>) {
        super(properties);
        if (properties) {
            if (properties.claims) { this.claims = TokenClaims.create(properties.claims) as any }
        }
	}
    @protobuf.Field.d(1, "bgo_component_httpagent_TokenClaims", "optional")
    public claims?: TokenClaims|null
}
export interface IGenJwtResp {
    token?: string|null
}
@protobuf.Type.d("bgo_component_httpagent_GenJwtResp")
export class GenJwtResp extends protobuf.Message<IGenJwtResp> {
    constructor(properties: Properties<IGenJwtResp>) {
        super(properties);
        if (properties) {
            if (properties.token) { this.token = properties.token }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public token?: string|null = ""
}
export interface ITokenVerifyReq {
    appId?: number|null
    appChannel?: string|null
    uid?: number|null
    token?: string|null
}
@protobuf.Type.d("bgo_component_httpagent_TokenVerifyReq")
export class TokenVerifyReq extends protobuf.Message<ITokenVerifyReq> {
    constructor(properties: Properties<ITokenVerifyReq>) {
        super(properties);
        if (properties) {
            if (properties.appId) { this.appId = properties.appId }
            if (properties.appChannel) { this.appChannel = properties.appChannel }
            if (properties.uid) { this.uid = properties.uid }
            if (properties.token) { this.token = properties.token }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public appId?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public appChannel?: string|null = ""
    @protobuf.Field.d(3, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(4, "string", "optional", )
    public token?: string|null = ""
}
export interface ITokenVerifyResp {
    valid?: boolean|null
}
@protobuf.Type.d("bgo_component_httpagent_TokenVerifyResp")
export class TokenVerifyResp extends protobuf.Message<ITokenVerifyResp> {
    constructor(properties: Properties<ITokenVerifyResp>) {
        super(properties);
        if (properties) {
            if (properties.valid) { this.valid = properties.valid }
        }
	}
    @protobuf.Field.d(1, "bool", "optional", false)
    public valid?: boolean|null = false
}
export interface IAppJwtConfig {
    appId?: number|null
    tokenVerifyCallbackURL?: string|null
    secret?: Uint8Array
    alg?: string|null
    createdAt?: number|null
    updatedAt?: number|null
    operator?: string|null
}
@protobuf.Type.d("bgo_component_httpagent_AppJwtConfig")
export class AppJwtConfig extends protobuf.Message<IAppJwtConfig> {
    constructor(properties: Properties<IAppJwtConfig>) {
        super(properties);
        if (properties) {
            if (properties.appId) { this.appId = properties.appId }
            if (properties.tokenVerifyCallbackURL) { this.tokenVerifyCallbackURL = properties.tokenVerifyCallbackURL }
            if (properties.secret) { this.secret = properties.secret }
            if (properties.alg) { this.alg = properties.alg }
            if (properties.createdAt) { this.createdAt = properties.createdAt }
            if (properties.updatedAt) { this.updatedAt = properties.updatedAt }
            if (properties.operator) { this.operator = properties.operator }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public appId?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public tokenVerifyCallbackURL?: string|null = ""
    @protobuf.Field.d(3, "bytes", "optional", [])
    public secret?: Uint8Array
    @protobuf.Field.d(5, "string", "optional", )
    public alg?: string|null = ""
    @protobuf.Field.d(13, "int64", "optional", 0)
    public createdAt?: number|null = 0
    @protobuf.Field.d(14, "int64", "optional", 0)
    public updatedAt?: number|null = 0
    @protobuf.Field.d(15, "string", "optional", )
    public operator?: string|null = ""
}
export interface IInitAppJwtConfigReq {
    appId?: number|null
    tokenVerifyCallbackURL?: string|null
    operator?: string|null
}
@protobuf.Type.d("bgo_component_httpagent_InitAppJwtConfigReq")
export class InitAppJwtConfigReq extends protobuf.Message<IInitAppJwtConfigReq> {
    constructor(properties: Properties<IInitAppJwtConfigReq>) {
        super(properties);
        if (properties) {
            if (properties.appId) { this.appId = properties.appId }
            if (properties.tokenVerifyCallbackURL) { this.tokenVerifyCallbackURL = properties.tokenVerifyCallbackURL }
            if (properties.operator) { this.operator = properties.operator }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public appId?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public tokenVerifyCallbackURL?: string|null = ""
    @protobuf.Field.d(15, "string", "optional", )
    public operator?: string|null = ""
}
export interface IInitAppJwtConfigResp {
    config?: IAppJwtConfig
}
@protobuf.Type.d("bgo_component_httpagent_InitAppJwtConfigResp")
export class InitAppJwtConfigResp extends protobuf.Message<IInitAppJwtConfigResp> {
    constructor(properties: Properties<IInitAppJwtConfigResp>) {
        super(properties);
        if (properties) {
            if (properties.config) { this.config = AppJwtConfig.create(properties.config) as any }
        }
	}
    @protobuf.Field.d(1, "bgo_component_httpagent_AppJwtConfig", "optional")
    public config?: AppJwtConfig|null
}
export interface IGetAppJwtConfigReq {
    appId?: number|null
}
@protobuf.Type.d("bgo_component_httpagent_GetAppJwtConfigReq")
export class GetAppJwtConfigReq extends protobuf.Message<IGetAppJwtConfigReq> {
    constructor(properties: Properties<IGetAppJwtConfigReq>) {
        super(properties);
        if (properties) {
            if (properties.appId) { this.appId = properties.appId }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public appId?: number|null = 0
}
export interface IGetAppJwtConfigResp {
    config?: IAppJwtConfig
}
@protobuf.Type.d("bgo_component_httpagent_GetAppJwtConfigResp")
export class GetAppJwtConfigResp extends protobuf.Message<IGetAppJwtConfigResp> {
    constructor(properties: Properties<IGetAppJwtConfigResp>) {
        super(properties);
        if (properties) {
            if (properties.config) { this.config = AppJwtConfig.create(properties.config) as any }
        }
	}
    @protobuf.Field.d(1, "bgo_component_httpagent_AppJwtConfig", "optional")
    public config?: AppJwtConfig|null
}
export interface IUpdateAppJwtConfigReq {
    appId?: number|null
    tokenVerifyCallbackURL?: string|null
    operator?: string|null
}
@protobuf.Type.d("bgo_component_httpagent_UpdateAppJwtConfigReq")
export class UpdateAppJwtConfigReq extends protobuf.Message<IUpdateAppJwtConfigReq> {
    constructor(properties: Properties<IUpdateAppJwtConfigReq>) {
        super(properties);
        if (properties) {
            if (properties.appId) { this.appId = properties.appId }
            if (properties.tokenVerifyCallbackURL) { this.tokenVerifyCallbackURL = properties.tokenVerifyCallbackURL }
            if (properties.operator) { this.operator = properties.operator }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public appId?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public tokenVerifyCallbackURL?: string|null = ""
    @protobuf.Field.d(15, "string", "optional", )
    public operator?: string|null = ""
}
export interface IUpdateAppJwtConfigResp {
}
@protobuf.Type.d("bgo_component_httpagent_UpdateAppJwtConfigResp")
export class UpdateAppJwtConfigResp extends protobuf.Message<IUpdateAppJwtConfigResp> {
    constructor(properties: Properties<IUpdateAppJwtConfigResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IPermissionConfig {
    appChannel?: string|null
    permission?: Permission|null
}
@protobuf.Type.d("bgo_component_httpagent_PermissionConfig")
export class PermissionConfig extends protobuf.Message<IPermissionConfig> {
    constructor(properties: Properties<IPermissionConfig>) {
        super(properties);
        if (properties) {
            if (properties.appChannel) { this.appChannel = properties.appChannel }
            if (properties.permission) { this.permission = properties.permission }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public appChannel?: string|null = ""
    @protobuf.Field.d(2, Permission, "optional", Permission.PermissionRejectAll)
    public permission?: Permission|null = Permission.PermissionRejectAll
}
export interface IMethodRouteConfig {
    method?: string|null
    permission?: IPermissionConfig[]
}
@protobuf.Type.d("bgo_component_httpagent_MethodRouteConfig")
export class MethodRouteConfig extends protobuf.Message<IMethodRouteConfig> {
    constructor(properties: Properties<IMethodRouteConfig>) {
        super(properties);
        if (properties) {
            if (properties.method) { this.method = properties.method }
            if (properties.permission) { this.permission = []; properties.permission.forEach((value, index)=>{this.permission[index] = PermissionConfig.create(properties.permission[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public method?: string|null = ""
    @protobuf.Field.d(2, "bgo_component_httpagent_PermissionConfig", "repeated")
    public permission?: PermissionConfig[] = []
}
export interface IAppServiceRouteConfig {
    appId?: number|null
    service?: string|null
    permission?: IPermissionConfig[]
    methods?: IMethodRouteConfig[]
    createdAt?: number|null
    updatedAt?: number|null
    operator?: string|null
}
@protobuf.Type.d("bgo_component_httpagent_AppServiceRouteConfig")
export class AppServiceRouteConfig extends protobuf.Message<IAppServiceRouteConfig> {
    constructor(properties: Properties<IAppServiceRouteConfig>) {
        super(properties);
        if (properties) {
            if (properties.appId) { this.appId = properties.appId }
            if (properties.service) { this.service = properties.service }
            if (properties.permission) { this.permission = []; properties.permission.forEach((value, index)=>{this.permission[index] = PermissionConfig.create(properties.permission[index]) as any})}
            if (properties.methods) { this.methods = []; properties.methods.forEach((value, index)=>{this.methods[index] = MethodRouteConfig.create(properties.methods[index]) as any})}
            if (properties.createdAt) { this.createdAt = properties.createdAt }
            if (properties.updatedAt) { this.updatedAt = properties.updatedAt }
            if (properties.operator) { this.operator = properties.operator }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public appId?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public service?: string|null = ""
    @protobuf.Field.d(3, "bgo_component_httpagent_PermissionConfig", "repeated")
    public permission?: PermissionConfig[] = []
    @protobuf.Field.d(4, "bgo_component_httpagent_MethodRouteConfig", "repeated")
    public methods?: MethodRouteConfig[] = []
    @protobuf.Field.d(13, "int64", "optional", 0)
    public createdAt?: number|null = 0
    @protobuf.Field.d(14, "int64", "optional", 0)
    public updatedAt?: number|null = 0
    @protobuf.Field.d(15, "string", "optional", )
    public operator?: string|null = ""
}
export interface IUpdateAppServiceRouteConfigReq {
    config?: IAppServiceRouteConfig
}
@protobuf.Type.d("bgo_component_httpagent_UpdateAppServiceRouteConfigReq")
export class UpdateAppServiceRouteConfigReq extends protobuf.Message<IUpdateAppServiceRouteConfigReq> {
    constructor(properties: Properties<IUpdateAppServiceRouteConfigReq>) {
        super(properties);
        if (properties) {
            if (properties.config) { this.config = AppServiceRouteConfig.create(properties.config) as any }
        }
	}
    @protobuf.Field.d(1, "bgo_component_httpagent_AppServiceRouteConfig", "optional")
    public config?: AppServiceRouteConfig|null
}
export interface IUpdateAppServiceRouteConfigResp {
}
@protobuf.Type.d("bgo_component_httpagent_UpdateAppServiceRouteConfigResp")
export class UpdateAppServiceRouteConfigResp extends protobuf.Message<IUpdateAppServiceRouteConfigResp> {
    constructor(properties: Properties<IUpdateAppServiceRouteConfigResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IGetAppServiceRouteConfigReq {
    appId?: number|null
    service?: string|null
}
@protobuf.Type.d("bgo_component_httpagent_GetAppServiceRouteConfigReq")
export class GetAppServiceRouteConfigReq extends protobuf.Message<IGetAppServiceRouteConfigReq> {
    constructor(properties: Properties<IGetAppServiceRouteConfigReq>) {
        super(properties);
        if (properties) {
            if (properties.appId) { this.appId = properties.appId }
            if (properties.service) { this.service = properties.service }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public appId?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public service?: string|null = ""
}
export interface IGetAppServiceRouteConfigResp {
    config?: IAppServiceRouteConfig
}
@protobuf.Type.d("bgo_component_httpagent_GetAppServiceRouteConfigResp")
export class GetAppServiceRouteConfigResp extends protobuf.Message<IGetAppServiceRouteConfigResp> {
    constructor(properties: Properties<IGetAppServiceRouteConfigResp>) {
        super(properties);
        if (properties) {
            if (properties.config) { this.config = AppServiceRouteConfig.create(properties.config) as any }
        }
	}
    @protobuf.Field.d(1, "bgo_component_httpagent_AppServiceRouteConfig", "optional")
    public config?: AppServiceRouteConfig|null
}
export interface IListAppServiceRouteConfigReq {
    page?: number|null
    pageSize?: number|null
    appId?: number|null
}
@protobuf.Type.d("bgo_component_httpagent_ListAppServiceRouteConfigReq")
export class ListAppServiceRouteConfigReq extends protobuf.Message<IListAppServiceRouteConfigReq> {
    constructor(properties: Properties<IListAppServiceRouteConfigReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.appId) { this.appId = properties.appId }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(3, "int32", "optional", 0)
    public appId?: number|null = 0
}
export interface IListAppServiceRouteConfigResp {
    total?: number|null
    configs?: IAppServiceRouteConfig[]
}
@protobuf.Type.d("bgo_component_httpagent_ListAppServiceRouteConfigResp")
export class ListAppServiceRouteConfigResp extends protobuf.Message<IListAppServiceRouteConfigResp> {
    constructor(properties: Properties<IListAppServiceRouteConfigResp>) {
        super(properties);
        if (properties) {
            if (properties.total) { this.total = properties.total }
            if (properties.configs) { this.configs = []; properties.configs.forEach((value, index)=>{this.configs[index] = AppServiceRouteConfig.create(properties.configs[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public total?: number|null = 0
    @protobuf.Field.d(2, "bgo_component_httpagent_AppServiceRouteConfig", "repeated")
    public configs?: AppServiceRouteConfig[] = []
}
export interface IDeleteAppServiceRouteConfigReq {
    appId?: number|null
    service?: string|null
    operator?: string|null
}
@protobuf.Type.d("bgo_component_httpagent_DeleteAppServiceRouteConfigReq")
export class DeleteAppServiceRouteConfigReq extends protobuf.Message<IDeleteAppServiceRouteConfigReq> {
    constructor(properties: Properties<IDeleteAppServiceRouteConfigReq>) {
        super(properties);
        if (properties) {
            if (properties.appId) { this.appId = properties.appId }
            if (properties.service) { this.service = properties.service }
            if (properties.operator) { this.operator = properties.operator }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public appId?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public service?: string|null = ""
    @protobuf.Field.d(15, "string", "optional", )
    public operator?: string|null = ""
}
export interface IDeleteAppServiceRouteConfigResp {
}
@protobuf.Type.d("bgo_component_httpagent_DeleteAppServiceRouteConfigResp")
export class DeleteAppServiceRouteConfigResp extends protobuf.Message<IDeleteAppServiceRouteConfigResp> {
    constructor(properties: Properties<IDeleteAppServiceRouteConfigResp>) {
        super(properties);
        if (properties) {
        }
	}
}
class $Httpagent extends RpcService {
    async InitAppJwtConfig(req: IInitAppJwtConfigReq, params?: RpcParams) : Promise<{err:number, resp:IInitAppJwtConfigResp}> {
        let data = InitAppJwtConfigReq.create(req)
        this.onBeforeReq("InitAppJwtConfig", data, params)
        const buffer = InitAppJwtConfigReq.encode(data).finish()
        let [err, pack] = await this.call("InitAppJwtConfig", buffer, params)
        if (err) {
            this.onBeforeResp("InitAppJwtConfig", err)
            return {err: err, resp: null}
        } else {
            let resp = InitAppJwtConfigResp.decode(pack) as any
            this.onBeforeResp("InitAppJwtConfig", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetAppJwtConfig(req: IGetAppJwtConfigReq, params?: RpcParams) : Promise<{err:number, resp:IGetAppJwtConfigResp}> {
        let data = GetAppJwtConfigReq.create(req)
        this.onBeforeReq("GetAppJwtConfig", data, params)
        const buffer = GetAppJwtConfigReq.encode(data).finish()
        let [err, pack] = await this.call("GetAppJwtConfig", buffer, params)
        if (err) {
            this.onBeforeResp("GetAppJwtConfig", err)
            return {err: err, resp: null}
        } else {
            let resp = GetAppJwtConfigResp.decode(pack) as any
            this.onBeforeResp("GetAppJwtConfig", err, resp)
            return {err: null, resp: resp}
        }
    }
    async UpdateAppJwtConfig(req: IUpdateAppJwtConfigReq, params?: RpcParams) : Promise<{err:number, resp:IUpdateAppJwtConfigResp}> {
        let data = UpdateAppJwtConfigReq.create(req)
        this.onBeforeReq("UpdateAppJwtConfig", data, params)
        const buffer = UpdateAppJwtConfigReq.encode(data).finish()
        let [err, pack] = await this.call("UpdateAppJwtConfig", buffer, params)
        if (err) {
            this.onBeforeResp("UpdateAppJwtConfig", err)
            return {err: err, resp: null}
        } else {
            let resp = UpdateAppJwtConfigResp.decode(pack) as any
            this.onBeforeResp("UpdateAppJwtConfig", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GenJwt(req: IGenJwtReq, params?: RpcParams) : Promise<{err:number, resp:IGenJwtResp}> {
        let data = GenJwtReq.create(req)
        this.onBeforeReq("GenJwt", data, params)
        const buffer = GenJwtReq.encode(data).finish()
        let [err, pack] = await this.call("GenJwt", buffer, params)
        if (err) {
            this.onBeforeResp("GenJwt", err)
            return {err: err, resp: null}
        } else {
            let resp = GenJwtResp.decode(pack) as any
            this.onBeforeResp("GenJwt", err, resp)
            return {err: null, resp: resp}
        }
    }
    async UpdateAppServiceRouteConfig(req: IUpdateAppServiceRouteConfigReq, params?: RpcParams) : Promise<{err:number, resp:IUpdateAppServiceRouteConfigResp}> {
        let data = UpdateAppServiceRouteConfigReq.create(req)
        this.onBeforeReq("UpdateAppServiceRouteConfig", data, params)
        const buffer = UpdateAppServiceRouteConfigReq.encode(data).finish()
        let [err, pack] = await this.call("UpdateAppServiceRouteConfig", buffer, params)
        if (err) {
            this.onBeforeResp("UpdateAppServiceRouteConfig", err)
            return {err: err, resp: null}
        } else {
            let resp = UpdateAppServiceRouteConfigResp.decode(pack) as any
            this.onBeforeResp("UpdateAppServiceRouteConfig", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetAppServiceRouteConfig(req: IGetAppServiceRouteConfigReq, params?: RpcParams) : Promise<{err:number, resp:IGetAppServiceRouteConfigResp}> {
        let data = GetAppServiceRouteConfigReq.create(req)
        this.onBeforeReq("GetAppServiceRouteConfig", data, params)
        const buffer = GetAppServiceRouteConfigReq.encode(data).finish()
        let [err, pack] = await this.call("GetAppServiceRouteConfig", buffer, params)
        if (err) {
            this.onBeforeResp("GetAppServiceRouteConfig", err)
            return {err: err, resp: null}
        } else {
            let resp = GetAppServiceRouteConfigResp.decode(pack) as any
            this.onBeforeResp("GetAppServiceRouteConfig", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListAppServiceRouteConfig(req: IListAppServiceRouteConfigReq, params?: RpcParams) : Promise<{err:number, resp:IListAppServiceRouteConfigResp}> {
        let data = ListAppServiceRouteConfigReq.create(req)
        this.onBeforeReq("ListAppServiceRouteConfig", data, params)
        const buffer = ListAppServiceRouteConfigReq.encode(data).finish()
        let [err, pack] = await this.call("ListAppServiceRouteConfig", buffer, params)
        if (err) {
            this.onBeforeResp("ListAppServiceRouteConfig", err)
            return {err: err, resp: null}
        } else {
            let resp = ListAppServiceRouteConfigResp.decode(pack) as any
            this.onBeforeResp("ListAppServiceRouteConfig", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DeleteAppServiceRouteConfig(req: IDeleteAppServiceRouteConfigReq, params?: RpcParams) : Promise<{err:number, resp:IDeleteAppServiceRouteConfigResp}> {
        let data = DeleteAppServiceRouteConfigReq.create(req)
        this.onBeforeReq("DeleteAppServiceRouteConfig", data, params)
        const buffer = DeleteAppServiceRouteConfigReq.encode(data).finish()
        let [err, pack] = await this.call("DeleteAppServiceRouteConfig", buffer, params)
        if (err) {
            this.onBeforeResp("DeleteAppServiceRouteConfig", err)
            return {err: err, resp: null}
        } else {
            let resp = DeleteAppServiceRouteConfigResp.decode(pack) as any
            this.onBeforeResp("DeleteAppServiceRouteConfig", err, resp)
            return {err: null, resp: resp}
        }
    }
}
export const Httpagent = new $Httpagent({
    name: "bgo.component.httpagent",
})
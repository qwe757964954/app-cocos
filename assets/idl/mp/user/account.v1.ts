import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
export type Properties<T> = { [P in keyof T]?: T[P] };
import {  Void as base_Void,IVoid as base_IVoid ,  } from "idl/base/base"
import {  UesrOnLine as bgo_component_UesrOnLine,IUesrOnLine as bgo_component_IUesrOnLine ,  UesrOffLine as bgo_component_UesrOffLine,IUesrOffLine as bgo_component_IUesrOffLine ,  } from "idl/bgo/component/common_msg"
import {  HttpBody as bgo_component_httpagent_HttpBody,IHttpBody as bgo_component_httpagent_IHttpBody ,  } from "idl/bgo/component/httpagent"
import {  AppUser as mp_v1_AppUser,IAppUser as mp_v1_IAppUser ,  App as mp_v1_App,IApp as mp_v1_IApp ,  Account as mp_v1_Account,IAccount as mp_v1_IAccount ,  } from "idl/mp/mp.v1"
export enum PermissionStatus {  
    PermissionStatusUnknown = 0,  
    PermissionStatusAllow = 1,  
    PermissionStatusDeny = 2,
}
export enum Code {  
    Success = 0,  
    PhonenumFormat = 10001,  
    CaptchaWrong = 10002,  
    CaptchaToofast = 10003,  
    CaptchaExpire = 10004,  
    CaptchaOuttime = 10005,  
    CaptchaUnexpire = 10006,  
    CaptchaSendfail = 10007,  
    CaptchaTimeLimit = 10008,  
    Binded = 20001,  
    PasswordIncorrect = 20003,  
    UnbindNumForbidden = 20005,  
    PassportIsRegistered = 20006,  
    TokenWrong = 30001,  
    IDCardVerifyResultFail = 2001,  
    IDCardVerifyResultNotMatch = 2002,  
    IDCardVerifyResultInvalid = 2003,  
    IDCardVerifyResultRetryLimit = 2005,  
    IDCardVerifyResultBindAccountLimit = 2006,  
    IDCardNotFound = 2007,  
    AppUserCancelLimit = 3001,  
    AppUserNotFound = 3002,  
    AppPermissionDeny = 4002,  
    RegisterLimit = 4003,  
    AuthLimit = 4004,
}
export enum CaptchaType {  
    CaptchaTypeLogin = 0,  
    CaptchaTypeBind = 1,  
    CaptchaTypeChangeBind = 2,  
    CaptchaTypeSetPassword = 3,
}
export enum CaptchaRiskType {  
    CaptchaRiskTypeUnknown = 0,  
    CaptchaRiskControlTypeTry = 1,  
    CaptchaRiskControlTypeGenerate = 2,
}
export enum PassportType {  
    PassportTypeUnknow = 0,  
    PassportTypeGuid = 1,  
    PassportTypePhone = 2,  
    PassportTypeEmail = 3,  
    PassportTypePlatformBegin = 10000000,  
    PassportTypePlatformWechat = 10000001,  
    PassportTypePlatformApple = 10000002,  
    PassportTypePlatformOppo = 10000003,  
    PassportTypePlatformVivo = 10000004,  
    PassportTypePlatformHuawei = 10000005,  
    PassportTypePlatformXiaomi = 10000006,  
    PassportTypePlatformMeizu = 10000007,  
    PassportTypePlatformYingyongbao = 10000008,  
    PassportTypePlatformEnd = 20000000,
}
export enum CancelAppUserOperate {  
    CancelAppUserOperateUnknown = 0,  
    CancelAppUserOperateUserCancel = 1,  
    CancelAppUserOperateRevokeUserLogin = 2,  
    CancelAppUserOperateSucTimeUp = 3,  
    CancelAppUserOperateAdminRevoke = 4,  
    CancelAppUserOperateSucForce = 5,
}
export enum CancelAppUserState {  
    CancelAppUserStateUnknown = 0,  
    CancelAppUserStateIng = 1,  
    CancelAppUserStateSuc = 2,  
    CancelAppUserStateRevoke = 3,  
    CancelAppUserStateFail = 4,
}
export enum DeviceType {  
    DeviceTypeWin = 0,  
    DeviceTypeIOS = 1,  
    DeviceTypeAndroid = 2,  
    DeviceTypeWeb = 3,  
    DeviceTypeMac = 4,  
    DeviceTypeSimulator = 5,
}
export enum PlatformType {  
    PlatformTypeUnknown = 0,  
    PlatformTypeWeixin = 1,  
    PlatformTypeApple = 2,  
    PlatformTypeOppo = 3,  
    PlatformTypeVivo = 4,  
    PlatformTypeHuawei = 5,  
    PlatformTypeXiaomi = 6,  
    PlatformTypeMeizu = 7,  
    PlatformTypeYingyongbao = 8,  
    PlatformTypeMob = 1000,
}
export enum Sex {  
    SexUnknown = 0,  
    SexMale = 1,  
    SexFemale = 2,
}
export enum IDCardStatus {  
    IDCardStatusUnVerify = 0,  
    IDCardStatusVerifying = 1,  
    IDCardStatusVerifySuccess = 2,  
    IDCardStatusVerifyFail = 3,
}
export enum RegisterRiskType {  
    RegisterRiskTypeUnknown = 0,  
    RegisterRiskTypeIP = 1,  
    RegisterRiskTypeDevice = 2,  
    RegisterRiskTypeSimulator = 3,
}
export enum WhitelistRiskType {  
    WhitelistRiskTypeUnknown = 0,  
    WhitelistRiskTypeWhite = 1,  
    WhitelistRiskTypeBlack = 2,
}
export enum CaptchaType {  
    CaptchaTypePhone = 0,  
    CaptchaTypeEmail = 1,
}
export enum PasswordType {  
    PasswordTypePhone = 0,  
    PasswordTypeEmail = 1,
}
export enum LoginType {  
    LoginTypeGuid = 0,  
    LoginTypeCaptcha = 1,  
    LoginTypePassword = 2,  
    LoginTypeCertificate = 3,  
    LoginTypePlatform = 4,  
    LoginTypeIdentify = 5,
}
export enum VerifyType {  
    VerifyTypePhone = 0,
}
export enum LoginBindType {  
    LoginBindTypeUnknown = 0,  
    LoginBindTypePhoneCaptcha = 1,  
    LoginBindTypePlatform = 4,
}
export enum VerifyType {  
    VerifyTypePhoneCaptcha = 0,  
    VerifyTypeOldPassword = 1,  
    VerifyTypeForce = 2,
}
export enum CancelType {  
    CancelTypePhone = 0,  
    CancelTypeGuid = 1,
}
export enum CreateType {  
    CreateTypeEmail = 0,
}
export interface IQueryOpt {
    appID?: number|null
    appUserID?: number|null
    phone?: IPhone
    platform?: IPlatform
    email?: string|null
    guid?: string|null
    accountID?: number|null
}
@protobuf.Type.d("mp_user_account_v1_QueryOpt")
export class QueryOpt extends protobuf.Message<IQueryOpt> {
    constructor(properties: Properties<IQueryOpt>) {
        super(properties);
        if (properties) {
            if (properties.appID) { this.appID = properties.appID }
            if (properties.appUserID) { this.appUserID = properties.appUserID }
            if (properties.phone) { this.phone = Phone.create(properties.phone) as any }
            if (properties.platform) { this.platform = Platform.create(properties.platform) as any }
            if (properties.email) { this.email = properties.email }
            if (properties.guid) { this.guid = properties.guid }
            if (properties.accountID) { this.accountID = properties.accountID }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public appID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public appUserID?: number|null = 0
    @protobuf.Field.d(3, "mp_user_account_v1_Phone", "optional")
    public phone?: Phone|null
    @protobuf.Field.d(4, "mp_user_account_v1_Platform", "optional")
    public platform?: Platform|null
    @protobuf.Field.d(5, "string", "optional", )
    public email?: string|null = ""
    @protobuf.Field.d(6, "string", "optional", )
    public guid?: string|null = ""
    @protobuf.Field.d(7, "int64", "optional", 0)
    public accountID?: number|null = 0
}
export interface IAppUser {
    appID?: number|null
    appUserID?: number|null
    registerAt?: number|null
    accountID?: number|null
    banAt?: number|null
}
@protobuf.Type.d("mp_user_account_v1_AppUser")
export class AppUser extends protobuf.Message<IAppUser> {
    constructor(properties: Properties<IAppUser>) {
        super(properties);
        if (properties) {
            if (properties.appID) { this.appID = properties.appID }
            if (properties.appUserID) { this.appUserID = properties.appUserID }
            if (properties.registerAt) { this.registerAt = properties.registerAt }
            if (properties.accountID) { this.accountID = properties.accountID }
            if (properties.banAt) { this.banAt = properties.banAt }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public appID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public appUserID?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public registerAt?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public accountID?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public banAt?: number|null = 0
}
export interface IGetAppUserReq {
    queryOpt?: IQueryOpt
}
@protobuf.Type.d("mp_user_account_v1_GetAppUserReq")
export class GetAppUserReq extends protobuf.Message<IGetAppUserReq> {
    constructor(properties: Properties<IGetAppUserReq>) {
        super(properties);
        if (properties) {
            if (properties.queryOpt) { this.queryOpt = QueryOpt.create(properties.queryOpt) as any }
        }
	}
    @protobuf.Field.d(1, "mp_user_account_v1_QueryOpt", "optional")
    public queryOpt?: QueryOpt|null
}
export interface IGetAppUserResp {
    user?: IAppUser
}
@protobuf.Type.d("mp_user_account_v1_GetAppUserResp")
export class GetAppUserResp extends protobuf.Message<IGetAppUserResp> {
    constructor(properties: Properties<IGetAppUserResp>) {
        super(properties);
        if (properties) {
            if (properties.user) { this.user = AppUser.create(properties.user) as any }
        }
	}
    @protobuf.Field.d(1, "mp_user_account_v1_AppUser", "optional")
    public user?: AppUser|null
}
export interface IAppUserPermission {
    appUser?: mp_v1_IAppUser
    isAtive?: boolean|null
    status?: PermissionStatus|null
    channelID?: string|null
}
@protobuf.Type.d("mp_user_account_v1_AppUserPermission")
export class AppUserPermission extends protobuf.Message<IAppUserPermission> {
    constructor(properties: Properties<IAppUserPermission>) {
        super(properties);
        if (properties) {
            if (properties.appUser) { this.appUser = mp_v1_AppUser.create(properties.appUser) as any }
            if (properties.isAtive) { this.isAtive = properties.isAtive }
            if (properties.status) { this.status = properties.status }
            if (properties.channelID) { this.channelID = properties.channelID }
        }
	}
    @protobuf.Field.d(1, "mp_v1_AppUser", "optional")
    public appUser?: mp_v1_AppUser|null
    @protobuf.Field.d(2, "bool", "optional", false)
    public isAtive?: boolean|null = false
    @protobuf.Field.d(3, PermissionStatus, "optional", PermissionStatus.PermissionStatusUnknown)
    public status?: PermissionStatus|null = PermissionStatus.PermissionStatusUnknown
    @protobuf.Field.d(4, "string", "optional", )
    public channelID?: string|null = ""
}
export interface IListAppUserPermissionReq {
    appUser?: mp_v1_IAppUser
    page?: number|null
    pageSize?: number|null
    channelID?: string|null
}
@protobuf.Type.d("mp_user_account_v1_ListAppUserPermissionReq")
export class ListAppUserPermissionReq extends protobuf.Message<IListAppUserPermissionReq> {
    constructor(properties: Properties<IListAppUserPermissionReq>) {
        super(properties);
        if (properties) {
            if (properties.appUser) { this.appUser = mp_v1_AppUser.create(properties.appUser) as any }
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.channelID) { this.channelID = properties.channelID }
        }
	}
    @protobuf.Field.d(1, "mp_v1_AppUser", "optional")
    public appUser?: mp_v1_AppUser|null
    @protobuf.Field.d(2, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(4, "string", "optional", )
    public channelID?: string|null = ""
}
export interface IListAppUserPermissionResp {
    list?: IAppUserPermission[]
}
@protobuf.Type.d("mp_user_account_v1_ListAppUserPermissionResp")
export class ListAppUserPermissionResp extends protobuf.Message<IListAppUserPermissionResp> {
    constructor(properties: Properties<IListAppUserPermissionResp>) {
        super(properties);
        if (properties) {
            if (properties.list) { this.list = []; properties.list.forEach((value, index)=>{this.list[index] = AppUserPermission.create(properties.list[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "mp_user_account_v1_AppUserPermission", "repeated")
    public list?: AppUserPermission[] = []
}
export interface ISaveAppUserPermissionReq {
    permission?: IAppUserPermission
}
@protobuf.Type.d("mp_user_account_v1_SaveAppUserPermissionReq")
export class SaveAppUserPermissionReq extends protobuf.Message<ISaveAppUserPermissionReq> {
    constructor(properties: Properties<ISaveAppUserPermissionReq>) {
        super(properties);
        if (properties) {
            if (properties.permission) { this.permission = AppUserPermission.create(properties.permission) as any }
        }
	}
    @protobuf.Field.d(1, "mp_user_account_v1_AppUserPermission", "optional")
    public permission?: AppUserPermission|null
}
export interface ISaveAppUserPermissionResp {
}
@protobuf.Type.d("mp_user_account_v1_SaveAppUserPermissionResp")
export class SaveAppUserPermissionResp extends protobuf.Message<ISaveAppUserPermissionResp> {
    constructor(properties: Properties<ISaveAppUserPermissionResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IDelAppUserPermissionReq {
    appUser?: mp_v1_IAppUser
    channelID?: string|null
}
@protobuf.Type.d("mp_user_account_v1_DelAppUserPermissionReq")
export class DelAppUserPermissionReq extends protobuf.Message<IDelAppUserPermissionReq> {
    constructor(properties: Properties<IDelAppUserPermissionReq>) {
        super(properties);
        if (properties) {
            if (properties.appUser) { this.appUser = mp_v1_AppUser.create(properties.appUser) as any }
            if (properties.channelID) { this.channelID = properties.channelID }
        }
	}
    @protobuf.Field.d(1, "mp_v1_AppUser", "optional")
    public appUser?: mp_v1_AppUser|null
    @protobuf.Field.d(2, "string", "optional", )
    public channelID?: string|null = ""
}
export interface IDelAppUserPermissionResp {
}
@protobuf.Type.d("mp_user_account_v1_DelAppUserPermissionResp")
export class DelAppUserPermissionResp extends protobuf.Message<IDelAppUserPermissionResp> {
    constructor(properties: Properties<IDelAppUserPermissionResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface ICaptchaStatus {
    type?: CaptchaType|null
    code?: string|null
    expiredAt?: number|null
}
@protobuf.Type.d("mp_user_account_v1_CaptchaStatus")
export class CaptchaStatus extends protobuf.Message<ICaptchaStatus> {
    constructor(properties: Properties<ICaptchaStatus>) {
        super(properties);
        if (properties) {
            if (properties.type) { this.type = properties.type }
            if (properties.code) { this.code = properties.code }
            if (properties.expiredAt) { this.expiredAt = properties.expiredAt }
        }
	}
    @protobuf.Field.d(1, CaptchaType, "optional", CaptchaType.CaptchaTypeLogin)
    public type?: CaptchaType|null = CaptchaType.CaptchaTypeLogin
    @protobuf.Field.d(2, "string", "optional", )
    public code?: string|null = ""
    @protobuf.Field.d(3, "int64", "optional", 0)
    public expiredAt?: number|null = 0
}
export interface ICaptchaRiskStatus {
    type?: CaptchaType|null
    riskType?: CaptchaRiskType|null
    val?: number|null
    ttl?: number|null
}
@protobuf.Type.d("mp_user_account_v1_CaptchaRiskStatus")
export class CaptchaRiskStatus extends protobuf.Message<ICaptchaRiskStatus> {
    constructor(properties: Properties<ICaptchaRiskStatus>) {
        super(properties);
        if (properties) {
            if (properties.type) { this.type = properties.type }
            if (properties.riskType) { this.riskType = properties.riskType }
            if (properties.val) { this.val = properties.val }
            if (properties.ttl) { this.ttl = properties.ttl }
        }
	}
    @protobuf.Field.d(1, CaptchaType, "optional", CaptchaType.CaptchaTypeLogin)
    public type?: CaptchaType|null = CaptchaType.CaptchaTypeLogin
    @protobuf.Field.d(2, CaptchaRiskType, "optional", CaptchaRiskType.CaptchaRiskTypeUnknown)
    public riskType?: CaptchaRiskType|null = CaptchaRiskType.CaptchaRiskTypeUnknown
    @protobuf.Field.d(3, "int32", "optional", 0)
    public val?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public ttl?: number|null = 0
}
export interface IPhone {
    number?: string|null
    zone?: number|null
}
@protobuf.Type.d("mp_user_account_v1_Phone")
export class Phone extends protobuf.Message<IPhone> {
    constructor(properties: Properties<IPhone>) {
        super(properties);
        if (properties) {
            if (properties.number) { this.number = properties.number }
            if (properties.zone) { this.zone = properties.zone }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public number?: string|null = ""
    @protobuf.Field.d(2, "uint32", "optional", 0)
    public zone?: number|null = 0
}
export interface IGetCaptchaStatusResp {
    statusList?: ICaptchaRiskStatus[]
    list?: ICaptchaStatus[]
}
@protobuf.Type.d("mp_user_account_v1_GetCaptchaStatusResp")
export class GetCaptchaStatusResp extends protobuf.Message<IGetCaptchaStatusResp> {
    constructor(properties: Properties<IGetCaptchaStatusResp>) {
        super(properties);
        if (properties) {
            if (properties.statusList) { this.statusList = []; properties.statusList.forEach((value, index)=>{this.statusList[index] = CaptchaRiskStatus.create(properties.statusList[index]) as any})}
            if (properties.list) { this.list = []; properties.list.forEach((value, index)=>{this.list[index] = CaptchaStatus.create(properties.list[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "mp_user_account_v1_CaptchaRiskStatus", "repeated")
    public statusList?: CaptchaRiskStatus[] = []
    @protobuf.Field.d(2, "mp_user_account_v1_CaptchaStatus", "repeated")
    public list?: CaptchaStatus[] = []
}
export interface IResetCaptchaRiskReq {
    appID?: number|null
    phone?: IPhone
    type?: CaptchaType|null
    riskType?: CaptchaRiskType|null
}
@protobuf.Type.d("mp_user_account_v1_ResetCaptchaRiskReq")
export class ResetCaptchaRiskReq extends protobuf.Message<IResetCaptchaRiskReq> {
    constructor(properties: Properties<IResetCaptchaRiskReq>) {
        super(properties);
        if (properties) {
            if (properties.appID) { this.appID = properties.appID }
            if (properties.phone) { this.phone = Phone.create(properties.phone) as any }
            if (properties.type) { this.type = properties.type }
            if (properties.riskType) { this.riskType = properties.riskType }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public appID?: number|null = 0
    @protobuf.Field.d(2, "mp_user_account_v1_Phone", "optional")
    public phone?: Phone|null
    @protobuf.Field.d(3, CaptchaType, "optional", CaptchaType.CaptchaTypeLogin)
    public type?: CaptchaType|null = CaptchaType.CaptchaTypeLogin
    @protobuf.Field.d(4, CaptchaRiskType, "optional", CaptchaRiskType.CaptchaRiskTypeUnknown)
    public riskType?: CaptchaRiskType|null = CaptchaRiskType.CaptchaRiskTypeUnknown
}
export interface IResetCaptchaRiskResp {
}
@protobuf.Type.d("mp_user_account_v1_ResetCaptchaRiskResp")
export class ResetCaptchaRiskResp extends protobuf.Message<IResetCaptchaRiskResp> {
    constructor(properties: Properties<IResetCaptchaRiskResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IRunCancelAppUserTaskReq {
}
@protobuf.Type.d("mp_user_account_v1_RunCancelAppUserTaskReq")
export class RunCancelAppUserTaskReq extends protobuf.Message<IRunCancelAppUserTaskReq> {
    constructor(properties: Properties<IRunCancelAppUserTaskReq>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IRunCancelAppUserTaskResp {
}
@protobuf.Type.d("mp_user_account_v1_RunCancelAppUserTaskResp")
export class RunCancelAppUserTaskResp extends protobuf.Message<IRunCancelAppUserTaskResp> {
    constructor(properties: Properties<IRunCancelAppUserTaskResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface ICancelAppUserTask {
    idCardNo?: string|null
    idCardName?: string|null
    createdAt?: number|null
}
@protobuf.Type.d("mp_user_account_v1_CancelAppUserTask")
export class CancelAppUserTask extends protobuf.Message<ICancelAppUserTask> {
    constructor(properties: Properties<ICancelAppUserTask>) {
        super(properties);
        if (properties) {
            if (properties.idCardNo) { this.idCardNo = properties.idCardNo }
            if (properties.idCardName) { this.idCardName = properties.idCardName }
            if (properties.createdAt) { this.createdAt = properties.createdAt }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public idCardNo?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public idCardName?: string|null = ""
    @protobuf.Field.d(3, "int64", "optional", 0)
    public createdAt?: number|null = 0
}
export interface ICancelAppUserLog {
    id?: string|null
    task?: ICancelAppUserTask
    operator?: string|null
    state?: CancelAppUserState|null
    operate?: CancelAppUserOperate|null
    createdAt?: number|null
}
@protobuf.Type.d("mp_user_account_v1_CancelAppUserLog")
export class CancelAppUserLog extends protobuf.Message<ICancelAppUserLog> {
    constructor(properties: Properties<ICancelAppUserLog>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.task) { this.task = CancelAppUserTask.create(properties.task) as any }
            if (properties.operator) { this.operator = properties.operator }
            if (properties.state) { this.state = properties.state }
            if (properties.operate) { this.operate = properties.operate }
            if (properties.createdAt) { this.createdAt = properties.createdAt }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public id?: string|null = ""
    @protobuf.Field.d(2, "mp_user_account_v1_CancelAppUserTask", "optional")
    public task?: CancelAppUserTask|null
    @protobuf.Field.d(3, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(4, CancelAppUserState, "optional", CancelAppUserState.CancelAppUserStateUnknown)
    public state?: CancelAppUserState|null = CancelAppUserState.CancelAppUserStateUnknown
    @protobuf.Field.d(5, CancelAppUserOperate, "optional", CancelAppUserOperate.CancelAppUserOperateUnknown)
    public operate?: CancelAppUserOperate|null = CancelAppUserOperate.CancelAppUserOperateUnknown
    @protobuf.Field.d(6, "int64", "optional", 0)
    public createdAt?: number|null = 0
}
export interface IListCancelAppUserLogReq {
    appUser?: mp_v1_IAppUser
}
@protobuf.Type.d("mp_user_account_v1_ListCancelAppUserLogReq")
export class ListCancelAppUserLogReq extends protobuf.Message<IListCancelAppUserLogReq> {
    constructor(properties: Properties<IListCancelAppUserLogReq>) {
        super(properties);
        if (properties) {
            if (properties.appUser) { this.appUser = mp_v1_AppUser.create(properties.appUser) as any }
        }
	}
    @protobuf.Field.d(1, "mp_v1_AppUser", "optional")
    public appUser?: mp_v1_AppUser|null
}
export interface IListCancelAppUserLogResp {
    list?: ICancelAppUserLog[]
}
@protobuf.Type.d("mp_user_account_v1_ListCancelAppUserLogResp")
export class ListCancelAppUserLogResp extends protobuf.Message<IListCancelAppUserLogResp> {
    constructor(properties: Properties<IListCancelAppUserLogResp>) {
        super(properties);
        if (properties) {
            if (properties.list) { this.list = []; properties.list.forEach((value, index)=>{this.list[index] = CancelAppUserLog.create(properties.list[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "mp_user_account_v1_CancelAppUserLog", "repeated")
    public list?: CancelAppUserLog[] = []
}
export interface IRevokeCancelAppUserReq {
    appUser?: mp_v1_IAppUser
}
@protobuf.Type.d("mp_user_account_v1_RevokeCancelAppUserReq")
export class RevokeCancelAppUserReq extends protobuf.Message<IRevokeCancelAppUserReq> {
    constructor(properties: Properties<IRevokeCancelAppUserReq>) {
        super(properties);
        if (properties) {
            if (properties.appUser) { this.appUser = mp_v1_AppUser.create(properties.appUser) as any }
        }
	}
    @protobuf.Field.d(1, "mp_v1_AppUser", "optional")
    public appUser?: mp_v1_AppUser|null
}
export interface IRevokeCancelAppUserResp {
}
@protobuf.Type.d("mp_user_account_v1_RevokeCancelAppUserResp")
export class RevokeCancelAppUserResp extends protobuf.Message<IRevokeCancelAppUserResp> {
    constructor(properties: Properties<IRevokeCancelAppUserResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface ILogoutReq {
    appUser?: mp_v1_IAppUser
    fdID?: number|null
}
@protobuf.Type.d("mp_user_account_v1_LogoutReq")
export class LogoutReq extends protobuf.Message<ILogoutReq> {
    constructor(properties: Properties<ILogoutReq>) {
        super(properties);
        if (properties) {
            if (properties.appUser) { this.appUser = mp_v1_AppUser.create(properties.appUser) as any }
            if (properties.fdID) { this.fdID = properties.fdID }
        }
	}
    @protobuf.Field.d(1, "mp_v1_AppUser", "optional")
    public appUser?: mp_v1_AppUser|null
    @protobuf.Field.d(3, "int64", "optional", 0)
    public fdID?: number|null = 0
}
export interface ILogoutResp {
}
@protobuf.Type.d("mp_user_account_v1_LogoutResp")
export class LogoutResp extends protobuf.Message<ILogoutResp> {
    constructor(properties: Properties<ILogoutResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface ILoginParam {
    ip?: string|null
    tokenTag?: string|null
    guid?: string|null
    deviceType?: DeviceType|null
    deviceMode?: string|null
    clientTime?: number|null
    clientVersion?: string|null
    latitude?: number|null
    longitude?: number|null
    language?: string|null
    os?: string|null
    channel?: string|null
    isSimulator?: boolean|null
}
@protobuf.Type.d("mp_user_account_v1_LoginParam")
export class LoginParam extends protobuf.Message<ILoginParam> {
    constructor(properties: Properties<ILoginParam>) {
        super(properties);
        if (properties) {
            if (properties.ip) { this.ip = properties.ip }
            if (properties.tokenTag) { this.tokenTag = properties.tokenTag }
            if (properties.guid) { this.guid = properties.guid }
            if (properties.deviceType) { this.deviceType = properties.deviceType }
            if (properties.deviceMode) { this.deviceMode = properties.deviceMode }
            if (properties.clientTime) { this.clientTime = properties.clientTime }
            if (properties.clientVersion) { this.clientVersion = properties.clientVersion }
            if (properties.latitude) { this.latitude = properties.latitude }
            if (properties.longitude) { this.longitude = properties.longitude }
            if (properties.language) { this.language = properties.language }
            if (properties.os) { this.os = properties.os }
            if (properties.channel) { this.channel = properties.channel }
            if (properties.isSimulator) { this.isSimulator = properties.isSimulator }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public ip?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public tokenTag?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public guid?: string|null = ""
    @protobuf.Field.d(6, DeviceType, "optional", DeviceType.DeviceTypeWin)
    public deviceType?: DeviceType|null = DeviceType.DeviceTypeWin
    @protobuf.Field.d(7, "string", "optional", )
    public deviceMode?: string|null = ""
    @protobuf.Field.d(8, "int64", "optional", 0)
    public clientTime?: number|null = 0
    @protobuf.Field.d(9, "string", "optional", )
    public clientVersion?: string|null = ""
    @protobuf.Field.d(10, "float", "optional", 0)
    public latitude?: number|null = 0
    @protobuf.Field.d(11, "float", "optional", 0)
    public longitude?: number|null = 0
    @protobuf.Field.d(12, "string", "optional", )
    public language?: string|null = ""
    @protobuf.Field.d(13, "string", "optional", )
    public os?: string|null = ""
    @protobuf.Field.d(14, "string", "optional", )
    public channel?: string|null = ""
    @protobuf.Field.d(15, "bool", "optional", false)
    public isSimulator?: boolean|null = false
}
export interface IIdentifyLogin {
    operatorToken?: string|null
    operator?: string|null
    serviceToken?: string|null
}
@protobuf.Type.d("mp_user_account_v1_IdentifyLogin")
export class IdentifyLogin extends protobuf.Message<IIdentifyLogin> {
    constructor(properties: Properties<IIdentifyLogin>) {
        super(properties);
        if (properties) {
            if (properties.operatorToken) { this.operatorToken = properties.operatorToken }
            if (properties.operator) { this.operator = properties.operator }
            if (properties.serviceToken) { this.serviceToken = properties.serviceToken }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public operatorToken?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public serviceToken?: string|null = ""
}
export interface IPlatformCode {
    platformType?: PlatformType|null
    platformCode?: string|null
    identityToken?: string|null
    openID?: string|null
    accessToken?: string|null
    param?: string|null
    appID?: string|null
}
@protobuf.Type.d("mp_user_account_v1_PlatformCode")
export class PlatformCode extends protobuf.Message<IPlatformCode> {
    constructor(properties: Properties<IPlatformCode>) {
        super(properties);
        if (properties) {
            if (properties.platformType) { this.platformType = properties.platformType }
            if (properties.platformCode) { this.platformCode = properties.platformCode }
            if (properties.identityToken) { this.identityToken = properties.identityToken }
            if (properties.openID) { this.openID = properties.openID }
            if (properties.accessToken) { this.accessToken = properties.accessToken }
            if (properties.param) { this.param = properties.param }
            if (properties.appID) { this.appID = properties.appID }
        }
	}
    @protobuf.Field.d(1, PlatformType, "optional", PlatformType.PlatformTypeUnknown)
    public platformType?: PlatformType|null = PlatformType.PlatformTypeUnknown
    @protobuf.Field.d(2, "string", "optional", )
    public platformCode?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public identityToken?: string|null = ""
    @protobuf.Field.d(8, "string", "optional", )
    public openID?: string|null = ""
    @protobuf.Field.d(9, "string", "optional", )
    public accessToken?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public param?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public appID?: string|null = ""
}
export interface IGuidLogin {
    guid?: string|null
}
@protobuf.Type.d("mp_user_account_v1_GuidLogin")
export class GuidLogin extends protobuf.Message<IGuidLogin> {
    constructor(properties: Properties<IGuidLogin>) {
        super(properties);
        if (properties) {
            if (properties.guid) { this.guid = properties.guid }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public guid?: string|null = ""
}
export interface ICaptchaLogin {
    captchaType?: CaptchaType|null
    captcha?: string|null
    phone?: IPhone
    email?: string|null
}
@protobuf.Type.d("mp_user_account_v1_CaptchaLogin")
export class CaptchaLogin extends protobuf.Message<ICaptchaLogin> {
    constructor(properties: Properties<ICaptchaLogin>) {
        super(properties);
        if (properties) {
            if (properties.captchaType) { this.captchaType = properties.captchaType }
            if (properties.captcha) { this.captcha = properties.captcha }
            if (properties.phone) { this.phone = Phone.create(properties.phone) as any }
            if (properties.email) { this.email = properties.email }
        }
	}
    @protobuf.Field.d(1, CaptchaType, "optional", CaptchaType.CaptchaTypePhone)
    public captchaType?: CaptchaType|null = CaptchaType.CaptchaTypePhone
    @protobuf.Field.d(2, "string", "optional", )
    public captcha?: string|null = ""
    @protobuf.Field.d(3, "mp_user_account_v1_Phone", "optional")
    public phone?: Phone|null
    @protobuf.Field.d(4, "string", "optional", )
    public email?: string|null = ""
}
export interface IGetCaptchaStatusReq {
    appID?: number|null
    phone?: IPhone
}
@protobuf.Type.d("mp_user_account_v1_GetCaptchaStatusReq")
export class GetCaptchaStatusReq extends protobuf.Message<IGetCaptchaStatusReq> {
    constructor(properties: Properties<IGetCaptchaStatusReq>) {
        super(properties);
        if (properties) {
            if (properties.appID) { this.appID = properties.appID }
            if (properties.phone) { this.phone = Phone.create(properties.phone) as any }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public appID?: number|null = 0
    @protobuf.Field.d(2, "mp_user_account_v1_Phone", "optional")
    public phone?: Phone|null
}
export interface IPasswordLogin {
    passwordType?: PasswordType|null
    password?: string|null
    phone?: IPhone
    email?: string|null
}
@protobuf.Type.d("mp_user_account_v1_PasswordLogin")
export class PasswordLogin extends protobuf.Message<IPasswordLogin> {
    constructor(properties: Properties<IPasswordLogin>) {
        super(properties);
        if (properties) {
            if (properties.passwordType) { this.passwordType = properties.passwordType }
            if (properties.password) { this.password = properties.password }
            if (properties.phone) { this.phone = Phone.create(properties.phone) as any }
            if (properties.email) { this.email = properties.email }
        }
	}
    @protobuf.Field.d(1, PasswordType, "optional", PasswordType.PasswordTypePhone)
    public passwordType?: PasswordType|null = PasswordType.PasswordTypePhone
    @protobuf.Field.d(2, "string", "optional", )
    public password?: string|null = ""
    @protobuf.Field.d(3, "mp_user_account_v1_Phone", "optional")
    public phone?: Phone|null
    @protobuf.Field.d(4, "string", "optional", )
    public email?: string|null = ""
}
export interface ICertificateLogin {
    appUserID?: number|null
    token?: string|null
}
@protobuf.Type.d("mp_user_account_v1_CertificateLogin")
export class CertificateLogin extends protobuf.Message<ICertificateLogin> {
    constructor(properties: Properties<ICertificateLogin>) {
        super(properties);
        if (properties) {
            if (properties.appUserID) { this.appUserID = properties.appUserID }
            if (properties.token) { this.token = properties.token }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public appUserID?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public token?: string|null = ""
}
export interface ILoginData {
    loginType?: LoginType|null
    guidLogin?: IGuidLogin
    captchaLogin?: ICaptchaLogin
    passwordLogin?: IPasswordLogin
    certificateLogin?: ICertificateLogin
    platformLogin?: IPlatformCode
    identifyLogin?: IIdentifyLogin
}
@protobuf.Type.d("mp_user_account_v1_LoginData")
export class LoginData extends protobuf.Message<ILoginData> {
    constructor(properties: Properties<ILoginData>) {
        super(properties);
        if (properties) {
            if (properties.loginType) { this.loginType = properties.loginType }
            if (properties.guidLogin) { this.guidLogin = GuidLogin.create(properties.guidLogin) as any }
            if (properties.captchaLogin) { this.captchaLogin = CaptchaLogin.create(properties.captchaLogin) as any }
            if (properties.passwordLogin) { this.passwordLogin = PasswordLogin.create(properties.passwordLogin) as any }
            if (properties.certificateLogin) { this.certificateLogin = CertificateLogin.create(properties.certificateLogin) as any }
            if (properties.platformLogin) { this.platformLogin = PlatformCode.create(properties.platformLogin) as any }
            if (properties.identifyLogin) { this.identifyLogin = IdentifyLogin.create(properties.identifyLogin) as any }
        }
	}
    @protobuf.Field.d(1, LoginType, "optional", LoginType.LoginTypeGuid)
    public loginType?: LoginType|null = LoginType.LoginTypeGuid
    @protobuf.Field.d(2, "mp_user_account_v1_GuidLogin", "optional")
    public guidLogin?: GuidLogin|null
    @protobuf.Field.d(3, "mp_user_account_v1_CaptchaLogin", "optional")
    public captchaLogin?: CaptchaLogin|null
    @protobuf.Field.d(4, "mp_user_account_v1_PasswordLogin", "optional")
    public passwordLogin?: PasswordLogin|null
    @protobuf.Field.d(5, "mp_user_account_v1_CertificateLogin", "optional")
    public certificateLogin?: CertificateLogin|null
    @protobuf.Field.d(6, "mp_user_account_v1_PlatformCode", "optional")
    public platformLogin?: PlatformCode|null
    @protobuf.Field.d(7, "mp_user_account_v1_IdentifyLogin", "optional")
    public identifyLogin?: IdentifyLogin|null
}
export interface ILoginReq {
    appID?: number|null
    param?: ILoginParam
    loginData?: ILoginData
}
@protobuf.Type.d("mp_user_account_v1_LoginReq")
export class LoginReq extends protobuf.Message<ILoginReq> {
    constructor(properties: Properties<ILoginReq>) {
        super(properties);
        if (properties) {
            if (properties.appID) { this.appID = properties.appID }
            if (properties.param) { this.param = LoginParam.create(properties.param) as any }
            if (properties.loginData) { this.loginData = LoginData.create(properties.loginData) as any }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public appID?: number|null = 0
    @protobuf.Field.d(2, "mp_user_account_v1_LoginParam", "optional")
    public param?: LoginParam|null
    @protobuf.Field.d(3, "mp_user_account_v1_LoginData", "optional")
    public loginData?: LoginData|null
}
export interface IPhoneCaptcha {
    phone?: IPhone
    captcha?: string|null
}
@protobuf.Type.d("mp_user_account_v1_PhoneCaptcha")
export class PhoneCaptcha extends protobuf.Message<IPhoneCaptcha> {
    constructor(properties: Properties<IPhoneCaptcha>) {
        super(properties);
        if (properties) {
            if (properties.phone) { this.phone = Phone.create(properties.phone) as any }
            if (properties.captcha) { this.captcha = properties.captcha }
        }
	}
    @protobuf.Field.d(3, "mp_user_account_v1_Phone", "optional")
    public phone?: Phone|null
    @protobuf.Field.d(5, "string", "optional", )
    public captcha?: string|null = ""
}
export interface ICertificate {
    token?: string|null
    expireAt?: number|null
}
@protobuf.Type.d("mp_user_account_v1_Certificate")
export class Certificate extends protobuf.Message<ICertificate> {
    constructor(properties: Properties<ICertificate>) {
        super(properties);
        if (properties) {
            if (properties.token) { this.token = properties.token }
            if (properties.expireAt) { this.expireAt = properties.expireAt }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public token?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public expireAt?: number|null = 0
}
export interface ICertificateClaims {
    accountID?: number|null
    loginType?: LoginType|null
    passportType?: PassportType|null
    appID?: number|null
    appUserID?: number|null
    tag?: string|null
    random?: number|null
}
@protobuf.Type.d("mp_user_account_v1_CertificateClaims")
export class CertificateClaims extends protobuf.Message<ICertificateClaims> {
    constructor(properties: Properties<ICertificateClaims>) {
        super(properties);
        if (properties) {
            if (properties.accountID) { this.accountID = properties.accountID }
            if (properties.loginType) { this.loginType = properties.loginType }
            if (properties.passportType) { this.passportType = properties.passportType }
            if (properties.appID) { this.appID = properties.appID }
            if (properties.appUserID) { this.appUserID = properties.appUserID }
            if (properties.tag) { this.tag = properties.tag }
            if (properties.random) { this.random = properties.random }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public accountID?: number|null = 0
    @protobuf.Field.d(2, LoginType, "optional", LoginType.LoginTypeGuid)
    public loginType?: LoginType|null = LoginType.LoginTypeGuid
    @protobuf.Field.d(3, PassportType, "optional", PassportType.PassportTypeUnknow)
    public passportType?: PassportType|null = PassportType.PassportTypeUnknow
    @protobuf.Field.d(4, "int32", "optional", 0)
    public appID?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public appUserID?: number|null = 0
    @protobuf.Field.d(6, "string", "optional", )
    public tag?: string|null = ""
    @protobuf.Field.d(7, "int32", "optional", 0)
    public random?: number|null = 0
}
export interface IPlatformUserInfo {
    openID?: string|null
    nickname?: string|null
    headImgURL?: string|null
    sex?: Sex|null
}
@protobuf.Type.d("mp_user_account_v1_PlatformUserInfo")
export class PlatformUserInfo extends protobuf.Message<IPlatformUserInfo> {
    constructor(properties: Properties<IPlatformUserInfo>) {
        super(properties);
        if (properties) {
            if (properties.openID) { this.openID = properties.openID }
            if (properties.nickname) { this.nickname = properties.nickname }
            if (properties.headImgURL) { this.headImgURL = properties.headImgURL }
            if (properties.sex) { this.sex = properties.sex }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public openID?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public nickname?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public headImgURL?: string|null = ""
    @protobuf.Field.d(4, Sex, "optional", Sex.SexUnknown)
    public sex?: Sex|null = Sex.SexUnknown
}
export interface IPlatformLoginResp {
    type?: PlatformType|null
    userInfo?: IPlatformUserInfo
}
@protobuf.Type.d("mp_user_account_v1_PlatformLoginResp")
export class PlatformLoginResp extends protobuf.Message<IPlatformLoginResp> {
    constructor(properties: Properties<IPlatformLoginResp>) {
        super(properties);
        if (properties) {
            if (properties.type) { this.type = properties.type }
            if (properties.userInfo) { this.userInfo = PlatformUserInfo.create(properties.userInfo) as any }
        }
	}
    @protobuf.Field.d(1, PlatformType, "optional", PlatformType.PlatformTypeUnknown)
    public type?: PlatformType|null = PlatformType.PlatformTypeUnknown
    @protobuf.Field.d(2, "mp_user_account_v1_PlatformUserInfo", "optional")
    public userInfo?: PlatformUserInfo|null
}
export interface ILoginResp {
    mpAccountID?: number|null
    appUserID?: number|null
    certificate?: ICertificate
    errRetryTimes?: number|null
    errRetryAt?: number|null
    platform?: IPlatformLoginResp
    lastLoginAt?: number|null
}
@protobuf.Type.d("mp_user_account_v1_LoginResp")
export class LoginResp extends protobuf.Message<ILoginResp> {
    constructor(properties: Properties<ILoginResp>) {
        super(properties);
        if (properties) {
            if (properties.mpAccountID) { this.mpAccountID = properties.mpAccountID }
            if (properties.appUserID) { this.appUserID = properties.appUserID }
            if (properties.certificate) { this.certificate = Certificate.create(properties.certificate) as any }
            if (properties.errRetryTimes) { this.errRetryTimes = properties.errRetryTimes }
            if (properties.errRetryAt) { this.errRetryAt = properties.errRetryAt }
            if (properties.platform) { this.platform = PlatformLoginResp.create(properties.platform) as any }
            if (properties.lastLoginAt) { this.lastLoginAt = properties.lastLoginAt }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public mpAccountID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public appUserID?: number|null = 0
    @protobuf.Field.d(3, "mp_user_account_v1_Certificate", "optional")
    public certificate?: Certificate|null
    @protobuf.Field.d(4, "int32", "optional", 0)
    public errRetryTimes?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public errRetryAt?: number|null = 0
    @protobuf.Field.d(7, "mp_user_account_v1_PlatformLoginResp", "optional")
    public platform?: PlatformLoginResp|null
    @protobuf.OneOf.d("platform")
    public LoginResp?: ("platform")
    @protobuf.Field.d(8, "int64", "optional", 0)
    public lastLoginAt?: number|null = 0
}
export interface ILoginLog {
    appUser?: mp_v1_IAppUser
    accountID?: number|null
    loginType?: LoginType|null
    passportType?: PassportType|null
    loginParam?: ILoginParam
    loginAt?: number|null
}
@protobuf.Type.d("mp_user_account_v1_LoginLog")
export class LoginLog extends protobuf.Message<ILoginLog> {
    constructor(properties: Properties<ILoginLog>) {
        super(properties);
        if (properties) {
            if (properties.appUser) { this.appUser = mp_v1_AppUser.create(properties.appUser) as any }
            if (properties.accountID) { this.accountID = properties.accountID }
            if (properties.loginType) { this.loginType = properties.loginType }
            if (properties.passportType) { this.passportType = properties.passportType }
            if (properties.loginParam) { this.loginParam = LoginParam.create(properties.loginParam) as any }
            if (properties.loginAt) { this.loginAt = properties.loginAt }
        }
	}
    @protobuf.Field.d(1, "mp_v1_AppUser", "optional")
    public appUser?: mp_v1_AppUser|null
    @protobuf.Field.d(2, "int64", "optional", 0)
    public accountID?: number|null = 0
    @protobuf.Field.d(3, LoginType, "optional", LoginType.LoginTypeGuid)
    public loginType?: LoginType|null = LoginType.LoginTypeGuid
    @protobuf.Field.d(4, PassportType, "optional", PassportType.PassportTypeUnknow)
    public passportType?: PassportType|null = PassportType.PassportTypeUnknow
    @protobuf.Field.d(5, "mp_user_account_v1_LoginParam", "optional")
    public loginParam?: LoginParam|null
    @protobuf.Field.d(6, "int64", "optional", 0)
    public loginAt?: number|null = 0
}
export interface IGetLastLoginLogReq {
    appUser?: mp_v1_IAppUser
    queryOpt?: IQueryOpt
}
@protobuf.Type.d("mp_user_account_v1_GetLastLoginLogReq")
export class GetLastLoginLogReq extends protobuf.Message<IGetLastLoginLogReq> {
    constructor(properties: Properties<IGetLastLoginLogReq>) {
        super(properties);
        if (properties) {
            if (properties.appUser) { this.appUser = mp_v1_AppUser.create(properties.appUser) as any }
            if (properties.queryOpt) { this.queryOpt = QueryOpt.create(properties.queryOpt) as any }
        }
	}
    @protobuf.Field.d(1, "mp_v1_AppUser", "optional")
    public appUser?: mp_v1_AppUser|null
    @protobuf.Field.d(2, "mp_user_account_v1_QueryOpt", "optional")
    public queryOpt?: QueryOpt|null
}
export interface IGetLastLoginLogResp {
    log?: ILoginLog
}
@protobuf.Type.d("mp_user_account_v1_GetLastLoginLogResp")
export class GetLastLoginLogResp extends protobuf.Message<IGetLastLoginLogResp> {
    constructor(properties: Properties<IGetLastLoginLogResp>) {
        super(properties);
        if (properties) {
            if (properties.log) { this.log = LoginLog.create(properties.log) as any }
        }
	}
    @protobuf.Field.d(1, "mp_user_account_v1_LoginLog", "optional")
    public log?: LoginLog|null
}
export interface IListLoginLogReq {
    appUser?: mp_v1_IAppUser
    queryOpt?: IQueryOpt
    page?: number|null
    pageSize?: number|null
}
@protobuf.Type.d("mp_user_account_v1_ListLoginLogReq")
export class ListLoginLogReq extends protobuf.Message<IListLoginLogReq> {
    constructor(properties: Properties<IListLoginLogReq>) {
        super(properties);
        if (properties) {
            if (properties.appUser) { this.appUser = mp_v1_AppUser.create(properties.appUser) as any }
            if (properties.queryOpt) { this.queryOpt = QueryOpt.create(properties.queryOpt) as any }
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
        }
	}
    @protobuf.Field.d(1, "mp_v1_AppUser", "optional")
    public appUser?: mp_v1_AppUser|null
    @protobuf.Field.d(4, "mp_user_account_v1_QueryOpt", "optional")
    public queryOpt?: QueryOpt|null
    @protobuf.Field.d(2, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public pageSize?: number|null = 0
}
export interface IListLoginLogResp {
    list?: ILoginLog[]
    total?: number|null
}
@protobuf.Type.d("mp_user_account_v1_ListLoginLogResp")
export class ListLoginLogResp extends protobuf.Message<IListLoginLogResp> {
    constructor(properties: Properties<IListLoginLogResp>) {
        super(properties);
        if (properties) {
            if (properties.list) { this.list = []; properties.list.forEach((value, index)=>{this.list[index] = LoginLog.create(properties.list[index]) as any})}
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "mp_user_account_v1_LoginLog", "repeated")
    public list?: LoginLog[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public total?: number|null = 0
}
export interface IChangeAppUserReq {
    appID?: number|null
    srcAppUserID?: number|null
    toAppUserID?: number|null
}
@protobuf.Type.d("mp_user_account_v1_ChangeAppUserReq")
export class ChangeAppUserReq extends protobuf.Message<IChangeAppUserReq> {
    constructor(properties: Properties<IChangeAppUserReq>) {
        super(properties);
        if (properties) {
            if (properties.appID) { this.appID = properties.appID }
            if (properties.srcAppUserID) { this.srcAppUserID = properties.srcAppUserID }
            if (properties.toAppUserID) { this.toAppUserID = properties.toAppUserID }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public appID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public srcAppUserID?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public toAppUserID?: number|null = 0
}
export interface IChangeAppUserResp {
}
@protobuf.Type.d("mp_user_account_v1_ChangeAppUserResp")
export class ChangeAppUserResp extends protobuf.Message<IChangeAppUserResp> {
    constructor(properties: Properties<IChangeAppUserResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface ISendCaptchaReq {
    appID?: number|null
    captchaType?: CaptchaType|null
    phone?: IPhone
}
@protobuf.Type.d("mp_user_account_v1_SendCaptchaReq")
export class SendCaptchaReq extends protobuf.Message<ISendCaptchaReq> {
    constructor(properties: Properties<ISendCaptchaReq>) {
        super(properties);
        if (properties) {
            if (properties.appID) { this.appID = properties.appID }
            if (properties.captchaType) { this.captchaType = properties.captchaType }
            if (properties.phone) { this.phone = Phone.create(properties.phone) as any }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public appID?: number|null = 0
    @protobuf.Field.d(2, CaptchaType, "optional", CaptchaType.CaptchaTypeLogin)
    public captchaType?: CaptchaType|null = CaptchaType.CaptchaTypeLogin
    @protobuf.Field.d(4, "mp_user_account_v1_Phone", "optional")
    public phone?: Phone|null
}
export interface ISendCaptchaResp {
    expiredTime?: number|null
}
@protobuf.Type.d("mp_user_account_v1_SendCaptchaResp")
export class SendCaptchaResp extends protobuf.Message<ISendCaptchaResp> {
    constructor(properties: Properties<ISendCaptchaResp>) {
        super(properties);
        if (properties) {
            if (properties.expiredTime) { this.expiredTime = properties.expiredTime }
        }
	}
    @protobuf.Field.d(2, "int64", "optional", 0)
    public expiredTime?: number|null = 0
}
export interface IVerifyCaptchaReq {
    appID?: number|null
    captchaType?: CaptchaType|null
    captcha?: string|null
    verifyType?: VerifyType|null
    phone?: IPhone
}
@protobuf.Type.d("mp_user_account_v1_VerifyCaptchaReq")
export class VerifyCaptchaReq extends protobuf.Message<IVerifyCaptchaReq> {
    constructor(properties: Properties<IVerifyCaptchaReq>) {
        super(properties);
        if (properties) {
            if (properties.appID) { this.appID = properties.appID }
            if (properties.captchaType) { this.captchaType = properties.captchaType }
            if (properties.captcha) { this.captcha = properties.captcha }
            if (properties.verifyType) { this.verifyType = properties.verifyType }
            if (properties.phone) { this.phone = Phone.create(properties.phone) as any }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public appID?: number|null = 0
    @protobuf.Field.d(2, CaptchaType, "optional", CaptchaType.CaptchaTypeLogin)
    public captchaType?: CaptchaType|null = CaptchaType.CaptchaTypeLogin
    @protobuf.Field.d(3, "string", "optional", )
    public captcha?: string|null = ""
    @protobuf.Field.d(4, VerifyType, "optional", VerifyType.VerifyTypePhone)
    public verifyType?: VerifyType|null = VerifyType.VerifyTypePhone
    @protobuf.Field.d(5, "mp_user_account_v1_Phone", "optional")
    public phone?: Phone|null
}
export interface IVerifyCaptchaResp {
    expiredTime?: number|null
}
@protobuf.Type.d("mp_user_account_v1_VerifyCaptchaResp")
export class VerifyCaptchaResp extends protobuf.Message<IVerifyCaptchaResp> {
    constructor(properties: Properties<IVerifyCaptchaResp>) {
        super(properties);
        if (properties) {
            if (properties.expiredTime) { this.expiredTime = properties.expiredTime }
        }
	}
    @protobuf.Field.d(2, "int64", "optional", 0)
    public expiredTime?: number|null = 0
}
export interface IBindReq {
    appUser?: mp_v1_IAppUser
    channleID?: string|null
    Phone?: IPhone
    phoneCaptcha?: IPhoneCaptcha
    platformCode?: IPlatformCode
}
@protobuf.Type.d("mp_user_account_v1_BindReq")
export class BindReq extends protobuf.Message<IBindReq> {
    constructor(properties: Properties<IBindReq>) {
        super(properties);
        if (properties) {
            if (properties.appUser) { this.appUser = mp_v1_AppUser.create(properties.appUser) as any }
            if (properties.channleID) { this.channleID = properties.channleID }
            if (properties.Phone) { this.Phone = Phone.create(properties.Phone) as any }
            if (properties.phoneCaptcha) { this.phoneCaptcha = PhoneCaptcha.create(properties.phoneCaptcha) as any }
            if (properties.platformCode) { this.platformCode = PlatformCode.create(properties.platformCode) as any }
        }
	}
    @protobuf.Field.d(1, "mp_v1_AppUser", "optional")
    public appUser?: mp_v1_AppUser|null
    @protobuf.Field.d(6, "string", "optional", )
    public channleID?: string|null = ""
    @protobuf.Field.d(3, "mp_user_account_v1_Phone", "optional")
    public Phone?: Phone|null
    @protobuf.Field.d(4, "mp_user_account_v1_PhoneCaptcha", "optional")
    public phoneCaptcha?: PhoneCaptcha|null
    @protobuf.Field.d(5, "mp_user_account_v1_PlatformCode", "optional")
    public platformCode?: PlatformCode|null
    @protobuf.OneOf.d("Phone","phoneCaptcha","platformCode")
    public Param?: ("Phone"|"phoneCaptcha"|"platformCode")
}
export interface IBindResp {
    platform?: IPlatformLoginResp
}
@protobuf.Type.d("mp_user_account_v1_BindResp")
export class BindResp extends protobuf.Message<IBindResp> {
    constructor(properties: Properties<IBindResp>) {
        super(properties);
        if (properties) {
            if (properties.platform) { this.platform = PlatformLoginResp.create(properties.platform) as any }
        }
	}
    @protobuf.Field.d(2, "mp_user_account_v1_PlatformLoginResp", "optional")
    public platform?: PlatformLoginResp|null
    @protobuf.OneOf.d("platform")
    public Resp?: ("platform")
}
export interface IUnbindReq {
    appUser?: mp_v1_IAppUser
    passortType?: PassportType|null
    force?: boolean|null
}
@protobuf.Type.d("mp_user_account_v1_UnbindReq")
export class UnbindReq extends protobuf.Message<IUnbindReq> {
    constructor(properties: Properties<IUnbindReq>) {
        super(properties);
        if (properties) {
            if (properties.appUser) { this.appUser = mp_v1_AppUser.create(properties.appUser) as any }
            if (properties.passortType) { this.passortType = properties.passortType }
            if (properties.force) { this.force = properties.force }
        }
	}
    @protobuf.Field.d(1, "mp_v1_AppUser", "optional")
    public appUser?: mp_v1_AppUser|null
    @protobuf.Field.d(4, PassportType, "optional", PassportType.PassportTypeUnknow)
    public passortType?: PassportType|null = PassportType.PassportTypeUnknow
    @protobuf.Field.d(5, "bool", "optional", false)
    public force?: boolean|null = false
}
export interface IUnbindResp {
}
@protobuf.Type.d("mp_user_account_v1_UnbindResp")
export class UnbindResp extends protobuf.Message<IUnbindResp> {
    constructor(properties: Properties<IUnbindResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IChangePhone {
    oldPhone?: IPhone
    oldCaptcha?: string|null
    newPhone?: IPhone
    newCaptcha?: string|null
}
@protobuf.Type.d("mp_user_account_v1_ChangePhone")
export class ChangePhone extends protobuf.Message<IChangePhone> {
    constructor(properties: Properties<IChangePhone>) {
        super(properties);
        if (properties) {
            if (properties.oldPhone) { this.oldPhone = Phone.create(properties.oldPhone) as any }
            if (properties.oldCaptcha) { this.oldCaptcha = properties.oldCaptcha }
            if (properties.newPhone) { this.newPhone = Phone.create(properties.newPhone) as any }
            if (properties.newCaptcha) { this.newCaptcha = properties.newCaptcha }
        }
	}
    @protobuf.Field.d(1, "mp_user_account_v1_Phone", "optional")
    public oldPhone?: Phone|null
    @protobuf.Field.d(2, "string", "optional", )
    public oldCaptcha?: string|null = ""
    @protobuf.Field.d(3, "mp_user_account_v1_Phone", "optional")
    public newPhone?: Phone|null
    @protobuf.Field.d(4, "string", "optional", )
    public newCaptcha?: string|null = ""
}
export interface IChangeReq {
    appUser?: mp_v1_IAppUser
    phone?: IChangePhone
}
@protobuf.Type.d("mp_user_account_v1_ChangeReq")
export class ChangeReq extends protobuf.Message<IChangeReq> {
    constructor(properties: Properties<IChangeReq>) {
        super(properties);
        if (properties) {
            if (properties.appUser) { this.appUser = mp_v1_AppUser.create(properties.appUser) as any }
            if (properties.phone) { this.phone = ChangePhone.create(properties.phone) as any }
        }
	}
    @protobuf.Field.d(1, "mp_v1_AppUser", "optional")
    public appUser?: mp_v1_AppUser|null
    @protobuf.Field.d(3, "mp_user_account_v1_ChangePhone", "optional")
    public phone?: ChangePhone|null
}
export interface IChangeResp {
}
@protobuf.Type.d("mp_user_account_v1_ChangeResp")
export class ChangeResp extends protobuf.Message<IChangeResp> {
    constructor(properties: Properties<IChangeResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface ILoginBind {
    loginBindType?: LoginBindType|null
    phoneCaptcha?: IPhoneCaptcha
    platformCode?: IPlatformCode
}
@protobuf.Type.d("mp_user_account_v1_LoginBind")
export class LoginBind extends protobuf.Message<ILoginBind> {
    constructor(properties: Properties<ILoginBind>) {
        super(properties);
        if (properties) {
            if (properties.loginBindType) { this.loginBindType = properties.loginBindType }
            if (properties.phoneCaptcha) { this.phoneCaptcha = PhoneCaptcha.create(properties.phoneCaptcha) as any }
            if (properties.platformCode) { this.platformCode = PlatformCode.create(properties.platformCode) as any }
        }
	}
    @protobuf.Field.d(1, LoginBindType, "optional", LoginBindType.LoginBindTypeUnknown)
    public loginBindType?: LoginBindType|null = LoginBindType.LoginBindTypeUnknown
    @protobuf.Field.d(2, "mp_user_account_v1_PhoneCaptcha", "optional")
    public phoneCaptcha?: PhoneCaptcha|null
    @protobuf.Field.d(6, "mp_user_account_v1_PlatformCode", "optional")
    public platformCode?: PlatformCode|null
}
export interface ISetPasswordReq {
    appUser?: mp_v1_IAppUser
    password?: string|null
    verifyType?: VerifyType|null
    phoneCaptcha?: IPhoneCaptcha
    oldPassword?: string|null
}
@protobuf.Type.d("mp_user_account_v1_SetPasswordReq")
export class SetPasswordReq extends protobuf.Message<ISetPasswordReq> {
    constructor(properties: Properties<ISetPasswordReq>) {
        super(properties);
        if (properties) {
            if (properties.appUser) { this.appUser = mp_v1_AppUser.create(properties.appUser) as any }
            if (properties.password) { this.password = properties.password }
            if (properties.verifyType) { this.verifyType = properties.verifyType }
            if (properties.phoneCaptcha) { this.phoneCaptcha = PhoneCaptcha.create(properties.phoneCaptcha) as any }
            if (properties.oldPassword) { this.oldPassword = properties.oldPassword }
        }
	}
    @protobuf.Field.d(1, "mp_v1_AppUser", "optional")
    public appUser?: mp_v1_AppUser|null
    @protobuf.Field.d(3, "string", "optional", )
    public password?: string|null = ""
    @protobuf.Field.d(4, VerifyType, "optional", VerifyType.VerifyTypePhoneCaptcha)
    public verifyType?: VerifyType|null = VerifyType.VerifyTypePhoneCaptcha
    @protobuf.Field.d(5, "mp_user_account_v1_PhoneCaptcha", "optional")
    public phoneCaptcha?: PhoneCaptcha|null
    @protobuf.Field.d(6, "string", "optional", )
    public oldPassword?: string|null = ""
}
export interface ISetPasswordResp {
}
@protobuf.Type.d("mp_user_account_v1_SetPasswordResp")
export class SetPasswordResp extends protobuf.Message<ISetPasswordResp> {
    constructor(properties: Properties<ISetPasswordResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IPlatform {
    type?: PlatformType|null
    id?: string|null
}
@protobuf.Type.d("mp_user_account_v1_Platform")
export class Platform extends protobuf.Message<IPlatform> {
    constructor(properties: Properties<IPlatform>) {
        super(properties);
        if (properties) {
            if (properties.type) { this.type = properties.type }
            if (properties.id) { this.id = properties.id }
        }
	}
    @protobuf.Field.d(1, PlatformType, "optional", PlatformType.PlatformTypeUnknown)
    public type?: PlatformType|null = PlatformType.PlatformTypeUnknown
    @protobuf.Field.d(2, "string", "optional", )
    public id?: string|null = ""
}
export interface IGetResp {
    mpAccountID?: number|null
    existPassword?: boolean|null
}
@protobuf.Type.d("mp_user_account_v1_GetResp")
export class GetResp extends protobuf.Message<IGetResp> {
    constructor(properties: Properties<IGetResp>) {
        super(properties);
        if (properties) {
            if (properties.mpAccountID) { this.mpAccountID = properties.mpAccountID }
            if (properties.existPassword) { this.existPassword = properties.existPassword }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public mpAccountID?: number|null = 0
    @protobuf.Field.d(2, "bool", "optional", false)
    public existPassword?: boolean|null = false
}
export interface IListPassportReq {
    appID?: number|null
    appUserID?: number|null
    passportType?: PassportType|null
    phone?: IPhone
    email?: string|null
    guid?: string|null
}
@protobuf.Type.d("mp_user_account_v1_ListPassportReq")
export class ListPassportReq extends protobuf.Message<IListPassportReq> {
    constructor(properties: Properties<IListPassportReq>) {
        super(properties);
        if (properties) {
            if (properties.appID) { this.appID = properties.appID }
            if (properties.appUserID) { this.appUserID = properties.appUserID }
            if (properties.passportType) { this.passportType = properties.passportType }
            if (properties.phone) { this.phone = Phone.create(properties.phone) as any }
            if (properties.email) { this.email = properties.email }
            if (properties.guid) { this.guid = properties.guid }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public appID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public appUserID?: number|null = 0
    @protobuf.Field.d(3, PassportType, "optional", PassportType.PassportTypeUnknow)
    public passportType?: PassportType|null = PassportType.PassportTypeUnknow
    @protobuf.Field.d(4, "mp_user_account_v1_Phone", "optional")
    public phone?: Phone|null
    @protobuf.Field.d(5, "string", "optional", )
    public email?: string|null = ""
    @protobuf.Field.d(6, "string", "optional", )
    public guid?: string|null = ""
}
export interface IGetReq {
    appUser?: mp_v1_IAppUser
    phone?: IPhone
    platform?: IPlatform
    email?: string|null
    guid?: string|null
}
@protobuf.Type.d("mp_user_account_v1_GetReq")
export class GetReq extends protobuf.Message<IGetReq> {
    constructor(properties: Properties<IGetReq>) {
        super(properties);
        if (properties) {
            if (properties.appUser) { this.appUser = mp_v1_AppUser.create(properties.appUser) as any }
            if (properties.phone) { this.phone = Phone.create(properties.phone) as any }
            if (properties.platform) { this.platform = Platform.create(properties.platform) as any }
            if (properties.email) { this.email = properties.email }
            if (properties.guid) { this.guid = properties.guid }
        }
	}
    @protobuf.Field.d(1, "mp_v1_AppUser", "optional")
    public appUser?: mp_v1_AppUser|null
    @protobuf.Field.d(2, "mp_user_account_v1_Phone", "optional")
    public phone?: Phone|null
    @protobuf.Field.d(3, "mp_user_account_v1_Platform", "optional")
    public platform?: Platform|null
    @protobuf.Field.d(4, "string", "optional", )
    public email?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public guid?: string|null = ""
}
export interface IListPassportResp {
    appUserID?: number|null
    phone?: IPhone
    email?: string|null
    guid?: string|null
    existPassword?: boolean|null
    platformList?: IPlatform[]
}
@protobuf.Type.d("mp_user_account_v1_ListPassportResp")
export class ListPassportResp extends protobuf.Message<IListPassportResp> {
    constructor(properties: Properties<IListPassportResp>) {
        super(properties);
        if (properties) {
            if (properties.appUserID) { this.appUserID = properties.appUserID }
            if (properties.phone) { this.phone = Phone.create(properties.phone) as any }
            if (properties.email) { this.email = properties.email }
            if (properties.guid) { this.guid = properties.guid }
            if (properties.existPassword) { this.existPassword = properties.existPassword }
            if (properties.platformList) { this.platformList = []; properties.platformList.forEach((value, index)=>{this.platformList[index] = Platform.create(properties.platformList[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public appUserID?: number|null = 0
    @protobuf.Field.d(2, "mp_user_account_v1_Phone", "optional")
    public phone?: Phone|null
    @protobuf.Field.d(3, "string", "optional", )
    public email?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public guid?: string|null = ""
    @protobuf.Field.d(5, "bool", "optional", false)
    public existPassword?: boolean|null = false
    @protobuf.Field.d(6, "mp_user_account_v1_Platform", "repeated")
    public platformList?: Platform[] = []
}
export interface ICancelPassportReq {
    appUser?: mp_v1_IAppUser
    cancelType?: CancelType|null
    operator?: string|null
}
@protobuf.Type.d("mp_user_account_v1_CancelPassportReq")
export class CancelPassportReq extends protobuf.Message<ICancelPassportReq> {
    constructor(properties: Properties<ICancelPassportReq>) {
        super(properties);
        if (properties) {
            if (properties.appUser) { this.appUser = mp_v1_AppUser.create(properties.appUser) as any }
            if (properties.cancelType) { this.cancelType = properties.cancelType }
            if (properties.operator) { this.operator = properties.operator }
        }
	}
    @protobuf.Field.d(1, "mp_v1_AppUser", "optional")
    public appUser?: mp_v1_AppUser|null
    @protobuf.Field.d(2, CancelType, "optional", CancelType.CancelTypePhone)
    public cancelType?: CancelType|null = CancelType.CancelTypePhone
    @protobuf.Field.d(5, "string", "optional", )
    public operator?: string|null = ""
}
export interface ICancelPassportResp {
}
@protobuf.Type.d("mp_user_account_v1_CancelPassportResp")
export class CancelPassportResp extends protobuf.Message<ICancelPassportResp> {
    constructor(properties: Properties<ICancelPassportResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface ICancelAppUserReq {
    appUser?: mp_v1_IAppUser
    idCardName?: string|null
    idCardNo?: string|null
    operator?: string|null
    operate?: CancelAppUserOperate|null
    contact?: string|null
    isForce?: boolean|null
}
@protobuf.Type.d("mp_user_account_v1_CancelAppUserReq")
export class CancelAppUserReq extends protobuf.Message<ICancelAppUserReq> {
    constructor(properties: Properties<ICancelAppUserReq>) {
        super(properties);
        if (properties) {
            if (properties.appUser) { this.appUser = mp_v1_AppUser.create(properties.appUser) as any }
            if (properties.idCardName) { this.idCardName = properties.idCardName }
            if (properties.idCardNo) { this.idCardNo = properties.idCardNo }
            if (properties.operator) { this.operator = properties.operator }
            if (properties.operate) { this.operate = properties.operate }
            if (properties.contact) { this.contact = properties.contact }
            if (properties.isForce) { this.isForce = properties.isForce }
        }
	}
    @protobuf.Field.d(1, "mp_v1_AppUser", "optional")
    public appUser?: mp_v1_AppUser|null
    @protobuf.Field.d(2, "string", "optional", )
    public idCardName?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public idCardNo?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(5, CancelAppUserOperate, "optional", CancelAppUserOperate.CancelAppUserOperateUnknown)
    public operate?: CancelAppUserOperate|null = CancelAppUserOperate.CancelAppUserOperateUnknown
    @protobuf.Field.d(6, "string", "optional", )
    public contact?: string|null = ""
    @protobuf.Field.d(7, "bool", "optional", false)
    public isForce?: boolean|null = false
}
export interface ICancelAppUserResp {
}
@protobuf.Type.d("mp_user_account_v1_CancelAppUserResp")
export class CancelAppUserResp extends protobuf.Message<ICancelAppUserResp> {
    constructor(properties: Properties<ICancelAppUserResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface ICreateEmail {
    email?: string|null
    password?: string|null
}
@protobuf.Type.d("mp_user_account_v1_CreateEmail")
export class CreateEmail extends protobuf.Message<ICreateEmail> {
    constructor(properties: Properties<ICreateEmail>) {
        super(properties);
        if (properties) {
            if (properties.email) { this.email = properties.email }
            if (properties.password) { this.password = properties.password }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public email?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public password?: string|null = ""
}
export interface ICreateReq {
    appID?: number|null
    createType?: CreateType|null
    email?: ICreateEmail
}
@protobuf.Type.d("mp_user_account_v1_CreateReq")
export class CreateReq extends protobuf.Message<ICreateReq> {
    constructor(properties: Properties<ICreateReq>) {
        super(properties);
        if (properties) {
            if (properties.appID) { this.appID = properties.appID }
            if (properties.createType) { this.createType = properties.createType }
            if (properties.email) { this.email = CreateEmail.create(properties.email) as any }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public appID?: number|null = 0
    @protobuf.Field.d(2, CreateType, "optional", CreateType.CreateTypeEmail)
    public createType?: CreateType|null = CreateType.CreateTypeEmail
    @protobuf.Field.d(3, "mp_user_account_v1_CreateEmail", "optional")
    public email?: CreateEmail|null
}
export interface ICreateResp {
    appUserID?: number|null
    accountID?: number|null
}
@protobuf.Type.d("mp_user_account_v1_CreateResp")
export class CreateResp extends protobuf.Message<ICreateResp> {
    constructor(properties: Properties<ICreateResp>) {
        super(properties);
        if (properties) {
            if (properties.appUserID) { this.appUserID = properties.appUserID }
            if (properties.accountID) { this.accountID = properties.accountID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public appUserID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public accountID?: number|null = 0
}
export interface IIDCard {
    cardNo?: string|null
    cardName?: string|null
    status?: IDCardStatus|null
    updateAt?: number|null
}
@protobuf.Type.d("mp_user_account_v1_IDCard")
export class IDCard extends protobuf.Message<IIDCard> {
    constructor(properties: Properties<IIDCard>) {
        super(properties);
        if (properties) {
            if (properties.cardNo) { this.cardNo = properties.cardNo }
            if (properties.cardName) { this.cardName = properties.cardName }
            if (properties.status) { this.status = properties.status }
            if (properties.updateAt) { this.updateAt = properties.updateAt }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public cardNo?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public cardName?: string|null = ""
    @protobuf.Field.d(3, IDCardStatus, "optional", IDCardStatus.IDCardStatusUnVerify)
    public status?: IDCardStatus|null = IDCardStatus.IDCardStatusUnVerify
    @protobuf.Field.d(4, "int64", "optional", 0)
    public updateAt?: number|null = 0
}
export interface IVerifyIDCardReq {
    appUser?: mp_v1_IAppUser
    idCardName?: string|null
    idCardNo?: string|null
}
@protobuf.Type.d("mp_user_account_v1_VerifyIDCardReq")
export class VerifyIDCardReq extends protobuf.Message<IVerifyIDCardReq> {
    constructor(properties: Properties<IVerifyIDCardReq>) {
        super(properties);
        if (properties) {
            if (properties.appUser) { this.appUser = mp_v1_AppUser.create(properties.appUser) as any }
            if (properties.idCardName) { this.idCardName = properties.idCardName }
            if (properties.idCardNo) { this.idCardNo = properties.idCardNo }
        }
	}
    @protobuf.Field.d(1, "mp_v1_AppUser", "optional")
    public appUser?: mp_v1_AppUser|null
    @protobuf.Field.d(3, "string", "optional", )
    public idCardName?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public idCardNo?: string|null = ""
}
export interface IVerifyIDCardResp {
    status?: IDCardStatus|null
    retryRemain?: number|null
}
@protobuf.Type.d("mp_user_account_v1_VerifyIDCardResp")
export class VerifyIDCardResp extends protobuf.Message<IVerifyIDCardResp> {
    constructor(properties: Properties<IVerifyIDCardResp>) {
        super(properties);
        if (properties) {
            if (properties.status) { this.status = properties.status }
            if (properties.retryRemain) { this.retryRemain = properties.retryRemain }
        }
	}
    @protobuf.Field.d(2, IDCardStatus, "optional", IDCardStatus.IDCardStatusUnVerify)
    public status?: IDCardStatus|null = IDCardStatus.IDCardStatusUnVerify
    @protobuf.Field.d(3, "int32", "optional", 0)
    public retryRemain?: number|null = 0
}
export interface IGetIDCardReq {
    appUser?: mp_v1_IAppUser
}
@protobuf.Type.d("mp_user_account_v1_GetIDCardReq")
export class GetIDCardReq extends protobuf.Message<IGetIDCardReq> {
    constructor(properties: Properties<IGetIDCardReq>) {
        super(properties);
        if (properties) {
            if (properties.appUser) { this.appUser = mp_v1_AppUser.create(properties.appUser) as any }
        }
	}
    @protobuf.Field.d(1, "mp_v1_AppUser", "optional")
    public appUser?: mp_v1_AppUser|null
}
export interface IGetIDCardResp {
    info?: IIDCard
}
@protobuf.Type.d("mp_user_account_v1_GetIDCardResp")
export class GetIDCardResp extends protobuf.Message<IGetIDCardResp> {
    constructor(properties: Properties<IGetIDCardResp>) {
        super(properties);
        if (properties) {
            if (properties.info) { this.info = IDCard.create(properties.info) as any }
        }
	}
    @protobuf.Field.d(1, "mp_user_account_v1_IDCard", "optional")
    public info?: IDCard|null
}
export interface IListAppUserByIDCardReq {
    appID?: number|null
    cardNo?: string|null
}
@protobuf.Type.d("mp_user_account_v1_ListAppUserByIDCardReq")
export class ListAppUserByIDCardReq extends protobuf.Message<IListAppUserByIDCardReq> {
    constructor(properties: Properties<IListAppUserByIDCardReq>) {
        super(properties);
        if (properties) {
            if (properties.appID) { this.appID = properties.appID }
            if (properties.cardNo) { this.cardNo = properties.cardNo }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public appID?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public cardNo?: string|null = ""
}
export interface IListAppUserByIDCardResp {
    appUserIDList?: number[]
}
@protobuf.Type.d("mp_user_account_v1_ListAppUserByIDCardResp")
export class ListAppUserByIDCardResp extends protobuf.Message<IListAppUserByIDCardResp> {
    constructor(properties: Properties<IListAppUserByIDCardResp>) {
        super(properties);
        if (properties) {
            if (properties.appUserIDList) { this.appUserIDList = []; properties.appUserIDList.forEach((value, index)=>{this.appUserIDList[index] = properties.appUserIDList[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public appUserIDList?: number[] = []
}
export interface IGetIDCardByNoReq {
    idCardNo?: string|null
}
@protobuf.Type.d("mp_user_account_v1_GetIDCardByNoReq")
export class GetIDCardByNoReq extends protobuf.Message<IGetIDCardByNoReq> {
    constructor(properties: Properties<IGetIDCardByNoReq>) {
        super(properties);
        if (properties) {
            if (properties.idCardNo) { this.idCardNo = properties.idCardNo }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public idCardNo?: string|null = ""
}
export interface IGetIDCardByNoResp {
    info?: IIDCard
}
@protobuf.Type.d("mp_user_account_v1_GetIDCardByNoResp")
export class GetIDCardByNoResp extends protobuf.Message<IGetIDCardByNoResp> {
    constructor(properties: Properties<IGetIDCardByNoResp>) {
        super(properties);
        if (properties) {
            if (properties.info) { this.info = IDCard.create(properties.info) as any }
        }
	}
    @protobuf.Field.d(1, "mp_user_account_v1_IDCard", "optional")
    public info?: IDCard|null
}
export interface IRemoveIDCardReq {
    appUser?: mp_v1_IAppUser
}
@protobuf.Type.d("mp_user_account_v1_RemoveIDCardReq")
export class RemoveIDCardReq extends protobuf.Message<IRemoveIDCardReq> {
    constructor(properties: Properties<IRemoveIDCardReq>) {
        super(properties);
        if (properties) {
            if (properties.appUser) { this.appUser = mp_v1_AppUser.create(properties.appUser) as any }
        }
	}
    @protobuf.Field.d(1, "mp_v1_AppUser", "optional")
    public appUser?: mp_v1_AppUser|null
}
export interface IRemoveIDCardResp {
}
@protobuf.Type.d("mp_user_account_v1_RemoveIDCardResp")
export class RemoveIDCardResp extends protobuf.Message<IRemoveIDCardResp> {
    constructor(properties: Properties<IRemoveIDCardResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IResetIDCardRetryLimitReq {
    appUser?: mp_v1_IAppUser
}
@protobuf.Type.d("mp_user_account_v1_ResetIDCardRetryLimitReq")
export class ResetIDCardRetryLimitReq extends protobuf.Message<IResetIDCardRetryLimitReq> {
    constructor(properties: Properties<IResetIDCardRetryLimitReq>) {
        super(properties);
        if (properties) {
            if (properties.appUser) { this.appUser = mp_v1_AppUser.create(properties.appUser) as any }
        }
	}
    @protobuf.Field.d(1, "mp_v1_AppUser", "optional")
    public appUser?: mp_v1_AppUser|null
}
export interface IResetIDCardRetryLimitResp {
}
@protobuf.Type.d("mp_user_account_v1_ResetIDCardRetryLimitResp")
export class ResetIDCardRetryLimitResp extends protobuf.Message<IResetIDCardRetryLimitResp> {
    constructor(properties: Properties<IResetIDCardRetryLimitResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IVerifyCertificateReq {
    mpApp?: mp_v1_IApp
    mpAccount?: mp_v1_IAccount
    tokenTag?: string|null
    token?: string|null
}
@protobuf.Type.d("mp_user_account_v1_VerifyCertificateReq")
export class VerifyCertificateReq extends protobuf.Message<IVerifyCertificateReq> {
    constructor(properties: Properties<IVerifyCertificateReq>) {
        super(properties);
        if (properties) {
            if (properties.mpApp) { this.mpApp = mp_v1_App.create(properties.mpApp) as any }
            if (properties.mpAccount) { this.mpAccount = mp_v1_Account.create(properties.mpAccount) as any }
            if (properties.tokenTag) { this.tokenTag = properties.tokenTag }
            if (properties.token) { this.token = properties.token }
        }
	}
    @protobuf.Field.d(1, "mp_v1_App", "optional")
    public mpApp?: mp_v1_App|null
    @protobuf.Field.d(2, "mp_v1_Account", "optional")
    public mpAccount?: mp_v1_Account|null
    @protobuf.Field.d(3, "string", "optional", )
    public tokenTag?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public token?: string|null = ""
}
export interface IVerifyCertificateResp {
    expireAt?: number|null
}
@protobuf.Type.d("mp_user_account_v1_VerifyCertificateResp")
export class VerifyCertificateResp extends protobuf.Message<IVerifyCertificateResp> {
    constructor(properties: Properties<IVerifyCertificateResp>) {
        super(properties);
        if (properties) {
            if (properties.expireAt) { this.expireAt = properties.expireAt }
        }
	}
    @protobuf.Field.d(2, "int64", "optional", 0)
    public expireAt?: number|null = 0
}
export interface IGetCertificateReq {
    token?: string|null
}
@protobuf.Type.d("mp_user_account_v1_GetCertificateReq")
export class GetCertificateReq extends protobuf.Message<IGetCertificateReq> {
    constructor(properties: Properties<IGetCertificateReq>) {
        super(properties);
        if (properties) {
            if (properties.token) { this.token = properties.token }
        }
	}
    @protobuf.Field.d(4, "string", "optional", )
    public token?: string|null = ""
}
export interface IGetCertificateResp {
    expiredAt?: number|null
    Claims?: ICertificateClaims
}
@protobuf.Type.d("mp_user_account_v1_GetCertificateResp")
export class GetCertificateResp extends protobuf.Message<IGetCertificateResp> {
    constructor(properties: Properties<IGetCertificateResp>) {
        super(properties);
        if (properties) {
            if (properties.expiredAt) { this.expiredAt = properties.expiredAt }
            if (properties.Claims) { this.Claims = CertificateClaims.create(properties.Claims) as any }
        }
	}
    @protobuf.Field.d(3, "int64", "optional", 0)
    public expiredAt?: number|null = 0
    @protobuf.Field.d(4, "mp_user_account_v1_CertificateClaims", "optional")
    public Claims?: CertificateClaims|null
}
export interface IPhoneUser {
    phone?: IPhone
    appUserID?: number|null
}
@protobuf.Type.d("mp_user_account_v1_PhoneUser")
export class PhoneUser extends protobuf.Message<IPhoneUser> {
    constructor(properties: Properties<IPhoneUser>) {
        super(properties);
        if (properties) {
            if (properties.phone) { this.phone = Phone.create(properties.phone) as any }
            if (properties.appUserID) { this.appUserID = properties.appUserID }
        }
	}
    @protobuf.Field.d(1, "mp_user_account_v1_Phone", "optional")
    public phone?: Phone|null
    @protobuf.Field.d(2, "int64", "optional", 0)
    public appUserID?: number|null = 0
}
export interface IListAppUserByPhoneReq {
    appID?: number|null
    PhoneList?: IPhone[]
}
@protobuf.Type.d("mp_user_account_v1_ListAppUserByPhoneReq")
export class ListAppUserByPhoneReq extends protobuf.Message<IListAppUserByPhoneReq> {
    constructor(properties: Properties<IListAppUserByPhoneReq>) {
        super(properties);
        if (properties) {
            if (properties.appID) { this.appID = properties.appID }
            if (properties.PhoneList) { this.PhoneList = []; properties.PhoneList.forEach((value, index)=>{this.PhoneList[index] = Phone.create(properties.PhoneList[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public appID?: number|null = 0
    @protobuf.Field.d(2, "mp_user_account_v1_Phone", "repeated")
    public PhoneList?: Phone[] = []
}
export interface IListAppUserByPhoneResp {
    list?: IPhoneUser[]
}
@protobuf.Type.d("mp_user_account_v1_ListAppUserByPhoneResp")
export class ListAppUserByPhoneResp extends protobuf.Message<IListAppUserByPhoneResp> {
    constructor(properties: Properties<IListAppUserByPhoneResp>) {
        super(properties);
        if (properties) {
            if (properties.list) { this.list = []; properties.list.forEach((value, index)=>{this.list[index] = PhoneUser.create(properties.list[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "mp_user_account_v1_PhoneUser", "repeated")
    public list?: PhoneUser[] = []
}
export interface IRiskTriggerLog {
    id?: string|null
    item?: string|null
    type?: RegisterRiskType|null
    count?: number|null
    createdAt?: number|null
}
@protobuf.Type.d("mp_user_account_v1_RiskTriggerLog")
export class RiskTriggerLog extends protobuf.Message<IRiskTriggerLog> {
    constructor(properties: Properties<IRiskTriggerLog>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.item) { this.item = properties.item }
            if (properties.type) { this.type = properties.type }
            if (properties.count) { this.count = properties.count }
            if (properties.createdAt) { this.createdAt = properties.createdAt }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public id?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public item?: string|null = ""
    @protobuf.Field.d(3, RegisterRiskType, "optional", RegisterRiskType.RegisterRiskTypeUnknown)
    public type?: RegisterRiskType|null = RegisterRiskType.RegisterRiskTypeUnknown
    @protobuf.Field.d(4, "int32", "optional", 0)
    public count?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public createdAt?: number|null = 0
}
export interface IListRiskTriggerLogReq {
    page?: number|null
    pageSize?: number|null
}
@protobuf.Type.d("mp_user_account_v1_ListRiskTriggerLogReq")
export class ListRiskTriggerLogReq extends protobuf.Message<IListRiskTriggerLogReq> {
    constructor(properties: Properties<IListRiskTriggerLogReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public pageSize?: number|null = 0
}
export interface IListRiskTriggerLogResp {
    list?: IRiskTriggerLog[]
    total?: number|null
}
@protobuf.Type.d("mp_user_account_v1_ListRiskTriggerLogResp")
export class ListRiskTriggerLogResp extends protobuf.Message<IListRiskTriggerLogResp> {
    constructor(properties: Properties<IListRiskTriggerLogResp>) {
        super(properties);
        if (properties) {
            if (properties.list) { this.list = []; properties.list.forEach((value, index)=>{this.list[index] = RiskTriggerLog.create(properties.list[index]) as any})}
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "mp_user_account_v1_RiskTriggerLog", "repeated")
    public list?: RiskTriggerLog[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public total?: number|null = 0
}
export interface IWhitelist {
    id?: string|null
    name?: string|null
}
@protobuf.Type.d("mp_user_account_v1_Whitelist")
export class Whitelist extends protobuf.Message<IWhitelist> {
    constructor(properties: Properties<IWhitelist>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.name) { this.name = properties.name }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public id?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public name?: string|null = ""
}
export interface IListRiskWhitelistReq {
    riskType?: RegisterRiskType|null
    type?: WhitelistRiskType|null
}
@protobuf.Type.d("mp_user_account_v1_ListRiskWhitelistReq")
export class ListRiskWhitelistReq extends protobuf.Message<IListRiskWhitelistReq> {
    constructor(properties: Properties<IListRiskWhitelistReq>) {
        super(properties);
        if (properties) {
            if (properties.riskType) { this.riskType = properties.riskType }
            if (properties.type) { this.type = properties.type }
        }
	}
    @protobuf.Field.d(1, RegisterRiskType, "optional", RegisterRiskType.RegisterRiskTypeUnknown)
    public riskType?: RegisterRiskType|null = RegisterRiskType.RegisterRiskTypeUnknown
    @protobuf.Field.d(2, WhitelistRiskType, "optional", WhitelistRiskType.WhitelistRiskTypeUnknown)
    public type?: WhitelistRiskType|null = WhitelistRiskType.WhitelistRiskTypeUnknown
}
export interface IListRiskWhitelistResp {
    list?: IWhitelist[]
}
@protobuf.Type.d("mp_user_account_v1_ListRiskWhitelistResp")
export class ListRiskWhitelistResp extends protobuf.Message<IListRiskWhitelistResp> {
    constructor(properties: Properties<IListRiskWhitelistResp>) {
        super(properties);
        if (properties) {
            if (properties.list) { this.list = []; properties.list.forEach((value, index)=>{this.list[index] = Whitelist.create(properties.list[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "mp_user_account_v1_Whitelist", "repeated")
    public list?: Whitelist[] = []
}
export interface IAddRiskWhitelistReq {
    riskType?: RegisterRiskType|null
    type?: WhitelistRiskType|null
    whitelist?: IWhitelist
    appID?: number|null
}
@protobuf.Type.d("mp_user_account_v1_AddRiskWhitelistReq")
export class AddRiskWhitelistReq extends protobuf.Message<IAddRiskWhitelistReq> {
    constructor(properties: Properties<IAddRiskWhitelistReq>) {
        super(properties);
        if (properties) {
            if (properties.riskType) { this.riskType = properties.riskType }
            if (properties.type) { this.type = properties.type }
            if (properties.whitelist) { this.whitelist = Whitelist.create(properties.whitelist) as any }
            if (properties.appID) { this.appID = properties.appID }
        }
	}
    @protobuf.Field.d(1, RegisterRiskType, "optional", RegisterRiskType.RegisterRiskTypeUnknown)
    public riskType?: RegisterRiskType|null = RegisterRiskType.RegisterRiskTypeUnknown
    @protobuf.Field.d(2, WhitelistRiskType, "optional", WhitelistRiskType.WhitelistRiskTypeUnknown)
    public type?: WhitelistRiskType|null = WhitelistRiskType.WhitelistRiskTypeUnknown
    @protobuf.Field.d(3, "mp_user_account_v1_Whitelist", "optional")
    public whitelist?: Whitelist|null
    @protobuf.Field.d(4, "int32", "optional", 0)
    public appID?: number|null = 0
}
export interface IAddRiskWhitelistResp {
}
@protobuf.Type.d("mp_user_account_v1_AddRiskWhitelistResp")
export class AddRiskWhitelistResp extends protobuf.Message<IAddRiskWhitelistResp> {
    constructor(properties: Properties<IAddRiskWhitelistResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IDelRiskWhitelistReq {
    riskType?: RegisterRiskType|null
    type?: WhitelistRiskType|null
    id?: string|null
    appID?: number|null
}
@protobuf.Type.d("mp_user_account_v1_DelRiskWhitelistReq")
export class DelRiskWhitelistReq extends protobuf.Message<IDelRiskWhitelistReq> {
    constructor(properties: Properties<IDelRiskWhitelistReq>) {
        super(properties);
        if (properties) {
            if (properties.riskType) { this.riskType = properties.riskType }
            if (properties.type) { this.type = properties.type }
            if (properties.id) { this.id = properties.id }
            if (properties.appID) { this.appID = properties.appID }
        }
	}
    @protobuf.Field.d(1, RegisterRiskType, "optional", RegisterRiskType.RegisterRiskTypeUnknown)
    public riskType?: RegisterRiskType|null = RegisterRiskType.RegisterRiskTypeUnknown
    @protobuf.Field.d(2, WhitelistRiskType, "optional", WhitelistRiskType.WhitelistRiskTypeUnknown)
    public type?: WhitelistRiskType|null = WhitelistRiskType.WhitelistRiskTypeUnknown
    @protobuf.Field.d(3, "string", "optional", )
    public id?: string|null = ""
    @protobuf.Field.d(4, "int32", "optional", 0)
    public appID?: number|null = 0
}
export interface IDelRiskWhitelistResp {
}
@protobuf.Type.d("mp_user_account_v1_DelRiskWhitelistResp")
export class DelRiskWhitelistResp extends protobuf.Message<IDelRiskWhitelistResp> {
    constructor(properties: Properties<IDelRiskWhitelistResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IHistoryAppUserReq {
    appID?: number|null
    appUserID?: number|null
}
@protobuf.Type.d("mp_user_account_v1_HistoryAppUserReq")
export class HistoryAppUserReq extends protobuf.Message<IHistoryAppUserReq> {
    constructor(properties: Properties<IHistoryAppUserReq>) {
        super(properties);
        if (properties) {
            if (properties.appID) { this.appID = properties.appID }
            if (properties.appUserID) { this.appUserID = properties.appUserID }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public appID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public appUserID?: number|null = 0
}
export interface IHistoryAppUserResp {
    list?: number[]
}
@protobuf.Type.d("mp_user_account_v1_HistoryAppUserResp")
export class HistoryAppUserResp extends protobuf.Message<IHistoryAppUserResp> {
    constructor(properties: Properties<IHistoryAppUserResp>) {
        super(properties);
        if (properties) {
            if (properties.list) { this.list = []; properties.list.forEach((value, index)=>{this.list[index] = properties.list[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public list?: number[] = []
}
export interface IManager {
    boyaaId?: number|null
    boyaaName?: string|null
    name?: string|null
    phoneNumber?: string|null
    phoneCallSwitch?: boolean|null
    phoneMsgSwitch?: boolean|null
    weChatSwitch?: boolean|null
}
@protobuf.Type.d("mp_user_account_v1_Manager")
export class Manager extends protobuf.Message<IManager> {
    constructor(properties: Properties<IManager>) {
        super(properties);
        if (properties) {
            if (properties.boyaaId) { this.boyaaId = properties.boyaaId }
            if (properties.boyaaName) { this.boyaaName = properties.boyaaName }
            if (properties.name) { this.name = properties.name }
            if (properties.phoneNumber) { this.phoneNumber = properties.phoneNumber }
            if (properties.phoneCallSwitch) { this.phoneCallSwitch = properties.phoneCallSwitch }
            if (properties.phoneMsgSwitch) { this.phoneMsgSwitch = properties.phoneMsgSwitch }
            if (properties.weChatSwitch) { this.weChatSwitch = properties.weChatSwitch }
        }
	}
    @protobuf.Field.d(2, "int64", "optional", 0)
    public boyaaId?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public boyaaName?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public phoneNumber?: string|null = ""
    @protobuf.Field.d(6, "bool", "optional", false)
    public phoneCallSwitch?: boolean|null = false
    @protobuf.Field.d(7, "bool", "optional", false)
    public phoneMsgSwitch?: boolean|null = false
    @protobuf.Field.d(8, "bool", "optional", false)
    public weChatSwitch?: boolean|null = false
}
export interface ISaveManagerReq {
    manager?: IManager
}
@protobuf.Type.d("mp_user_account_v1_SaveManagerReq")
export class SaveManagerReq extends protobuf.Message<ISaveManagerReq> {
    constructor(properties: Properties<ISaveManagerReq>) {
        super(properties);
        if (properties) {
            if (properties.manager) { this.manager = Manager.create(properties.manager) as any }
        }
	}
    @protobuf.Field.d(1, "mp_user_account_v1_Manager", "optional")
    public manager?: Manager|null
}
export interface ISaveManagerResp {
    manager?: IManager
}
@protobuf.Type.d("mp_user_account_v1_SaveManagerResp")
export class SaveManagerResp extends protobuf.Message<ISaveManagerResp> {
    constructor(properties: Properties<ISaveManagerResp>) {
        super(properties);
        if (properties) {
            if (properties.manager) { this.manager = Manager.create(properties.manager) as any }
        }
	}
    @protobuf.Field.d(1, "mp_user_account_v1_Manager", "optional")
    public manager?: Manager|null
}
export interface IListManagerReq {
    page?: number|null
    pageSize?: number|null
}
@protobuf.Type.d("mp_user_account_v1_ListManagerReq")
export class ListManagerReq extends protobuf.Message<IListManagerReq> {
    constructor(properties: Properties<IListManagerReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public pageSize?: number|null = 0
}
export interface IListManagerResp {
    total?: number|null
    managers?: IManager[]
}
@protobuf.Type.d("mp_user_account_v1_ListManagerResp")
export class ListManagerResp extends protobuf.Message<IListManagerResp> {
    constructor(properties: Properties<IListManagerResp>) {
        super(properties);
        if (properties) {
            if (properties.total) { this.total = properties.total }
            if (properties.managers) { this.managers = []; properties.managers.forEach((value, index)=>{this.managers[index] = Manager.create(properties.managers[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public total?: number|null = 0
    @protobuf.Field.d(2, "mp_user_account_v1_Manager", "repeated")
    public managers?: Manager[] = []
}
export interface IDeleteManagerReq {
    boyaaId?: number|null
}
@protobuf.Type.d("mp_user_account_v1_DeleteManagerReq")
export class DeleteManagerReq extends protobuf.Message<IDeleteManagerReq> {
    constructor(properties: Properties<IDeleteManagerReq>) {
        super(properties);
        if (properties) {
            if (properties.boyaaId) { this.boyaaId = properties.boyaaId }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public boyaaId?: number|null = 0
}
class $UserAccount extends RpcService {
    async Login(req: ILoginReq, params?: RpcParams) : Promise<{err:number, resp:ILoginResp}> {
        let data = LoginReq.create(req)
        console.log("Login...begin", data, params)
        const buffer = LoginReq.encode(data).finish()
        let [err, pack] = await this.call("Login", buffer, params)
        if (err) {
            console.error("Login...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = LoginResp.decode(pack) as any
            console.log("Login...end", resp)
            return {err: null, resp: resp}
        }
    }
    async GetAppUser(req: IGetAppUserReq, params?: RpcParams) : Promise<{err:number, resp:IGetAppUserResp}> {
        let data = GetAppUserReq.create(req)
        console.log("GetAppUser...begin", data, params)
        const buffer = GetAppUserReq.encode(data).finish()
        let [err, pack] = await this.call("GetAppUser", buffer, params)
        if (err) {
            console.error("GetAppUser...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = GetAppUserResp.decode(pack) as any
            console.log("GetAppUser...end", resp)
            return {err: null, resp: resp}
        }
    }
    async GetLastLoginLog(req: IGetLastLoginLogReq, params?: RpcParams) : Promise<{err:number, resp:IGetLastLoginLogResp}> {
        let data = GetLastLoginLogReq.create(req)
        console.log("GetLastLoginLog...begin", data, params)
        const buffer = GetLastLoginLogReq.encode(data).finish()
        let [err, pack] = await this.call("GetLastLoginLog", buffer, params)
        if (err) {
            console.error("GetLastLoginLog...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = GetLastLoginLogResp.decode(pack) as any
            console.log("GetLastLoginLog...end", resp)
            return {err: null, resp: resp}
        }
    }
    async ListLoginLog(req: IListLoginLogReq, params?: RpcParams) : Promise<{err:number, resp:IListLoginLogResp}> {
        let data = ListLoginLogReq.create(req)
        console.log("ListLoginLog...begin", data, params)
        const buffer = ListLoginLogReq.encode(data).finish()
        let [err, pack] = await this.call("ListLoginLog", buffer, params)
        if (err) {
            console.error("ListLoginLog...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = ListLoginLogResp.decode(pack) as any
            console.log("ListLoginLog...end", resp)
            return {err: null, resp: resp}
        }
    }
    async SendCaptcha(req: ISendCaptchaReq, params?: RpcParams) : Promise<{err:number, resp:ISendCaptchaResp}> {
        let data = SendCaptchaReq.create(req)
        console.log("SendCaptcha...begin", data, params)
        const buffer = SendCaptchaReq.encode(data).finish()
        let [err, pack] = await this.call("SendCaptcha", buffer, params)
        if (err) {
            console.error("SendCaptcha...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = SendCaptchaResp.decode(pack) as any
            console.log("SendCaptcha...end", resp)
            return {err: null, resp: resp}
        }
    }
    async Bind(req: IBindReq, params?: RpcParams) : Promise<{err:number, resp:IBindResp}> {
        let data = BindReq.create(req)
        console.log("Bind...begin", data, params)
        const buffer = BindReq.encode(data).finish()
        let [err, pack] = await this.call("Bind", buffer, params)
        if (err) {
            console.error("Bind...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = BindResp.decode(pack) as any
            console.log("Bind...end", resp)
            return {err: null, resp: resp}
        }
    }
    async Unbind(req: IUnbindReq, params?: RpcParams) : Promise<{err:number, resp:IUnbindResp}> {
        let data = UnbindReq.create(req)
        console.log("Unbind...begin", data, params)
        const buffer = UnbindReq.encode(data).finish()
        let [err, pack] = await this.call("Unbind", buffer, params)
        if (err) {
            console.error("Unbind...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = UnbindResp.decode(pack) as any
            console.log("Unbind...end", resp)
            return {err: null, resp: resp}
        }
    }
    async Change(req: IChangeReq, params?: RpcParams) : Promise<{err:number, resp:IChangeResp}> {
        let data = ChangeReq.create(req)
        console.log("Change...begin", data, params)
        const buffer = ChangeReq.encode(data).finish()
        let [err, pack] = await this.call("Change", buffer, params)
        if (err) {
            console.error("Change...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = ChangeResp.decode(pack) as any
            console.log("Change...end", resp)
            return {err: null, resp: resp}
        }
    }
    async SetPassword(req: ISetPasswordReq, params?: RpcParams) : Promise<{err:number, resp:ISetPasswordResp}> {
        let data = SetPasswordReq.create(req)
        console.log("SetPassword...begin", data, params)
        const buffer = SetPasswordReq.encode(data).finish()
        let [err, pack] = await this.call("SetPassword", buffer, params)
        if (err) {
            console.error("SetPassword...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = SetPasswordResp.decode(pack) as any
            console.log("SetPassword...end", resp)
            return {err: null, resp: resp}
        }
    }
    async Get(req: IGetReq, params?: RpcParams) : Promise<{err:number, resp:IGetResp}> {
        let data = GetReq.create(req)
        console.log("Get...begin", data, params)
        const buffer = GetReq.encode(data).finish()
        let [err, pack] = await this.call("Get", buffer, params)
        if (err) {
            console.error("Get...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = GetResp.decode(pack) as any
            console.log("Get...end", resp)
            return {err: null, resp: resp}
        }
    }
    async ChangeAppUser(req: IChangeAppUserReq, params?: RpcParams) : Promise<{err:number, resp:IChangeAppUserResp}> {
        let data = ChangeAppUserReq.create(req)
        console.log("ChangeAppUser...begin", data, params)
        const buffer = ChangeAppUserReq.encode(data).finish()
        let [err, pack] = await this.call("ChangeAppUser", buffer, params)
        if (err) {
            console.error("ChangeAppUser...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = ChangeAppUserResp.decode(pack) as any
            console.log("ChangeAppUser...end", resp)
            return {err: null, resp: resp}
        }
    }
    async ListPassport(req: IListPassportReq, params?: RpcParams) : Promise<{err:number, resp:IListPassportResp}> {
        let data = ListPassportReq.create(req)
        console.log("ListPassport...begin", data, params)
        const buffer = ListPassportReq.encode(data).finish()
        let [err, pack] = await this.call("ListPassport", buffer, params)
        if (err) {
            console.error("ListPassport...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = ListPassportResp.decode(pack) as any
            console.log("ListPassport...end", resp)
            return {err: null, resp: resp}
        }
    }
    async Logout(req: ILogoutReq, params?: RpcParams) : Promise<{err:number, resp:ILogoutResp}> {
        let data = LogoutReq.create(req)
        console.log("Logout...begin", data, params)
        const buffer = LogoutReq.encode(data).finish()
        let [err, pack] = await this.call("Logout", buffer, params)
        if (err) {
            console.error("Logout...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = LogoutResp.decode(pack) as any
            console.log("Logout...end", resp)
            return {err: null, resp: resp}
        }
    }
    async VerifyCaptcha(req: IVerifyCaptchaReq, params?: RpcParams) : Promise<{err:number, resp:IVerifyCaptchaResp}> {
        let data = VerifyCaptchaReq.create(req)
        console.log("VerifyCaptcha...begin", data, params)
        const buffer = VerifyCaptchaReq.encode(data).finish()
        let [err, pack] = await this.call("VerifyCaptcha", buffer, params)
        if (err) {
            console.error("VerifyCaptcha...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = VerifyCaptchaResp.decode(pack) as any
            console.log("VerifyCaptcha...end", resp)
            return {err: null, resp: resp}
        }
    }
    async CancelPassport(req: ICancelPassportReq, params?: RpcParams) : Promise<{err:number, resp:ICancelPassportResp}> {
        let data = CancelPassportReq.create(req)
        console.log("CancelPassport...begin", data, params)
        const buffer = CancelPassportReq.encode(data).finish()
        let [err, pack] = await this.call("CancelPassport", buffer, params)
        if (err) {
            console.error("CancelPassport...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = CancelPassportResp.decode(pack) as any
            console.log("CancelPassport...end", resp)
            return {err: null, resp: resp}
        }
    }
    async CancelAppUser(req: ICancelAppUserReq, params?: RpcParams) : Promise<{err:number, resp:ICancelAppUserResp}> {
        let data = CancelAppUserReq.create(req)
        console.log("CancelAppUser...begin", data, params)
        const buffer = CancelAppUserReq.encode(data).finish()
        let [err, pack] = await this.call("CancelAppUser", buffer, params)
        if (err) {
            console.error("CancelAppUser...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = CancelAppUserResp.decode(pack) as any
            console.log("CancelAppUser...end", resp)
            return {err: null, resp: resp}
        }
    }
    async ListCancelAppUserLog(req: IListCancelAppUserLogReq, params?: RpcParams) : Promise<{err:number, resp:IListCancelAppUserLogResp}> {
        let data = ListCancelAppUserLogReq.create(req)
        console.log("ListCancelAppUserLog...begin", data, params)
        const buffer = ListCancelAppUserLogReq.encode(data).finish()
        let [err, pack] = await this.call("ListCancelAppUserLog", buffer, params)
        if (err) {
            console.error("ListCancelAppUserLog...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = ListCancelAppUserLogResp.decode(pack) as any
            console.log("ListCancelAppUserLog...end", resp)
            return {err: null, resp: resp}
        }
    }
    async RevokeCancelAppUser(req: IRevokeCancelAppUserReq, params?: RpcParams) : Promise<{err:number, resp:IRevokeCancelAppUserResp}> {
        let data = RevokeCancelAppUserReq.create(req)
        console.log("RevokeCancelAppUser...begin", data, params)
        const buffer = RevokeCancelAppUserReq.encode(data).finish()
        let [err, pack] = await this.call("RevokeCancelAppUser", buffer, params)
        if (err) {
            console.error("RevokeCancelAppUser...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = RevokeCancelAppUserResp.decode(pack) as any
            console.log("RevokeCancelAppUser...end", resp)
            return {err: null, resp: resp}
        }
    }
    async VerifyCertificate(req: IVerifyCertificateReq, params?: RpcParams) : Promise<{err:number, resp:IVerifyCertificateResp}> {
        let data = VerifyCertificateReq.create(req)
        console.log("VerifyCertificate...begin", data, params)
        const buffer = VerifyCertificateReq.encode(data).finish()
        let [err, pack] = await this.call("VerifyCertificate", buffer, params)
        if (err) {
            console.error("VerifyCertificate...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = VerifyCertificateResp.decode(pack) as any
            console.log("VerifyCertificate...end", resp)
            return {err: null, resp: resp}
        }
    }
    async GetCertificate(req: IGetCertificateReq, params?: RpcParams) : Promise<{err:number, resp:IGetCertificateResp}> {
        let data = GetCertificateReq.create(req)
        console.log("GetCertificate...begin", data, params)
        const buffer = GetCertificateReq.encode(data).finish()
        let [err, pack] = await this.call("GetCertificate", buffer, params)
        if (err) {
            console.error("GetCertificate...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = GetCertificateResp.decode(pack) as any
            console.log("GetCertificate...end", resp)
            return {err: null, resp: resp}
        }
    }
    async Create(req: ICreateReq, params?: RpcParams) : Promise<{err:number, resp:ICreateResp}> {
        let data = CreateReq.create(req)
        console.log("Create...begin", data, params)
        const buffer = CreateReq.encode(data).finish()
        let [err, pack] = await this.call("Create", buffer, params)
        if (err) {
            console.error("Create...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = CreateResp.decode(pack) as any
            console.log("Create...end", resp)
            return {err: null, resp: resp}
        }
    }
    async VerifyIDCard(req: IVerifyIDCardReq, params?: RpcParams) : Promise<{err:number, resp:IVerifyIDCardResp}> {
        let data = VerifyIDCardReq.create(req)
        console.log("VerifyIDCard...begin", data, params)
        const buffer = VerifyIDCardReq.encode(data).finish()
        let [err, pack] = await this.call("VerifyIDCard", buffer, params)
        if (err) {
            console.error("VerifyIDCard...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = VerifyIDCardResp.decode(pack) as any
            console.log("VerifyIDCard...end", resp)
            return {err: null, resp: resp}
        }
    }
    async GetIDCard(req: IGetIDCardReq, params?: RpcParams) : Promise<{err:number, resp:IGetIDCardResp}> {
        let data = GetIDCardReq.create(req)
        console.log("GetIDCard...begin", data, params)
        const buffer = GetIDCardReq.encode(data).finish()
        let [err, pack] = await this.call("GetIDCard", buffer, params)
        if (err) {
            console.error("GetIDCard...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = GetIDCardResp.decode(pack) as any
            console.log("GetIDCard...end", resp)
            return {err: null, resp: resp}
        }
    }
    async ListAppUserByIDCard(req: IListAppUserByIDCardReq, params?: RpcParams) : Promise<{err:number, resp:IListAppUserByIDCardResp}> {
        let data = ListAppUserByIDCardReq.create(req)
        console.log("ListAppUserByIDCard...begin", data, params)
        const buffer = ListAppUserByIDCardReq.encode(data).finish()
        let [err, pack] = await this.call("ListAppUserByIDCard", buffer, params)
        if (err) {
            console.error("ListAppUserByIDCard...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = ListAppUserByIDCardResp.decode(pack) as any
            console.log("ListAppUserByIDCard...end", resp)
            return {err: null, resp: resp}
        }
    }
    async IDCardVerifyCallBack(req: bgo_component_httpagent_IHttpBody, params?: RpcParams) : Promise<{err:number, resp:bgo_component_httpagent_IHttpBody}> {
        let data = bgo_component_httpagent_HttpBody.create(req)
        console.log("IDCardVerifyCallBack...begin", data, params)
        const buffer = bgo_component_httpagent_HttpBody.encode(data).finish()
        let [err, pack] = await this.call("IDCardVerifyCallBack", buffer, params)
        if (err) {
            console.error("IDCardVerifyCallBack...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = bgo_component_httpagent_HttpBody.decode(pack) as any
            console.log("IDCardVerifyCallBack...end", resp)
            return {err: null, resp: resp}
        }
    }
    async RemoveIDCard(req: IRemoveIDCardReq, params?: RpcParams) : Promise<{err:number, resp:IRemoveIDCardResp}> {
        let data = RemoveIDCardReq.create(req)
        console.log("RemoveIDCard...begin", data, params)
        const buffer = RemoveIDCardReq.encode(data).finish()
        let [err, pack] = await this.call("RemoveIDCard", buffer, params)
        if (err) {
            console.error("RemoveIDCard...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = RemoveIDCardResp.decode(pack) as any
            console.log("RemoveIDCard...end", resp)
            return {err: null, resp: resp}
        }
    }
    async ResetIDCardRetryLimit(req: IResetIDCardRetryLimitReq, params?: RpcParams) : Promise<{err:number, resp:IResetIDCardRetryLimitResp}> {
        let data = ResetIDCardRetryLimitReq.create(req)
        console.log("ResetIDCardRetryLimit...begin", data, params)
        const buffer = ResetIDCardRetryLimitReq.encode(data).finish()
        let [err, pack] = await this.call("ResetIDCardRetryLimit", buffer, params)
        if (err) {
            console.error("ResetIDCardRetryLimit...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = ResetIDCardRetryLimitResp.decode(pack) as any
            console.log("ResetIDCardRetryLimit...end", resp)
            return {err: null, resp: resp}
        }
    }
    async SubscribeOnlineCallback(req: bgo_component_IUesrOnLine, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = bgo_component_UesrOnLine.create(req)
        console.log("SubscribeOnlineCallback...begin", data, params)
        const buffer = bgo_component_UesrOnLine.encode(data).finish()
        let [err, pack] = await this.call("SubscribeOnlineCallback", buffer, params)
        if (err) {
            console.error("SubscribeOnlineCallback...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            console.log("SubscribeOnlineCallback...end", resp)
            return {err: null, resp: resp}
        }
    }
    async SubscribeOfflineCallback(req: bgo_component_IUesrOffLine, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = bgo_component_UesrOffLine.create(req)
        console.log("SubscribeOfflineCallback...begin", data, params)
        const buffer = bgo_component_UesrOffLine.encode(data).finish()
        let [err, pack] = await this.call("SubscribeOfflineCallback", buffer, params)
        if (err) {
            console.error("SubscribeOfflineCallback...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            console.log("SubscribeOfflineCallback...end", resp)
            return {err: null, resp: resp}
        }
    }
    async RunCancelAppUserTask(req: IRunCancelAppUserTaskReq, params?: RpcParams) : Promise<{err:number, resp:IRunCancelAppUserTaskResp}> {
        let data = RunCancelAppUserTaskReq.create(req)
        console.log("RunCancelAppUserTask...begin", data, params)
        const buffer = RunCancelAppUserTaskReq.encode(data).finish()
        let [err, pack] = await this.call("RunCancelAppUserTask", buffer, params)
        if (err) {
            console.error("RunCancelAppUserTask...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = RunCancelAppUserTaskResp.decode(pack) as any
            console.log("RunCancelAppUserTask...end", resp)
            return {err: null, resp: resp}
        }
    }
    async ListAppUserPermission(req: IListAppUserPermissionReq, params?: RpcParams) : Promise<{err:number, resp:IListAppUserPermissionResp}> {
        let data = ListAppUserPermissionReq.create(req)
        console.log("ListAppUserPermission...begin", data, params)
        const buffer = ListAppUserPermissionReq.encode(data).finish()
        let [err, pack] = await this.call("ListAppUserPermission", buffer, params)
        if (err) {
            console.error("ListAppUserPermission...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = ListAppUserPermissionResp.decode(pack) as any
            console.log("ListAppUserPermission...end", resp)
            return {err: null, resp: resp}
        }
    }
    async SaveAppUserPermission(req: ISaveAppUserPermissionReq, params?: RpcParams) : Promise<{err:number, resp:ISaveAppUserPermissionResp}> {
        let data = SaveAppUserPermissionReq.create(req)
        console.log("SaveAppUserPermission...begin", data, params)
        const buffer = SaveAppUserPermissionReq.encode(data).finish()
        let [err, pack] = await this.call("SaveAppUserPermission", buffer, params)
        if (err) {
            console.error("SaveAppUserPermission...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = SaveAppUserPermissionResp.decode(pack) as any
            console.log("SaveAppUserPermission...end", resp)
            return {err: null, resp: resp}
        }
    }
    async DelAppUserPermission(req: IDelAppUserPermissionReq, params?: RpcParams) : Promise<{err:number, resp:IDelAppUserPermissionResp}> {
        let data = DelAppUserPermissionReq.create(req)
        console.log("DelAppUserPermission...begin", data, params)
        const buffer = DelAppUserPermissionReq.encode(data).finish()
        let [err, pack] = await this.call("DelAppUserPermission", buffer, params)
        if (err) {
            console.error("DelAppUserPermission...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = DelAppUserPermissionResp.decode(pack) as any
            console.log("DelAppUserPermission...end", resp)
            return {err: null, resp: resp}
        }
    }
    async ListAppUserByPhone(req: IListAppUserByPhoneReq, params?: RpcParams) : Promise<{err:number, resp:IListAppUserByPhoneResp}> {
        let data = ListAppUserByPhoneReq.create(req)
        console.log("ListAppUserByPhone...begin", data, params)
        const buffer = ListAppUserByPhoneReq.encode(data).finish()
        let [err, pack] = await this.call("ListAppUserByPhone", buffer, params)
        if (err) {
            console.error("ListAppUserByPhone...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = ListAppUserByPhoneResp.decode(pack) as any
            console.log("ListAppUserByPhone...end", resp)
            return {err: null, resp: resp}
        }
    }
    async ListRiskTriggerLog(req: IListRiskTriggerLogReq, params?: RpcParams) : Promise<{err:number, resp:IListRiskTriggerLogResp}> {
        let data = ListRiskTriggerLogReq.create(req)
        console.log("ListRiskTriggerLog...begin", data, params)
        const buffer = ListRiskTriggerLogReq.encode(data).finish()
        let [err, pack] = await this.call("ListRiskTriggerLog", buffer, params)
        if (err) {
            console.error("ListRiskTriggerLog...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = ListRiskTriggerLogResp.decode(pack) as any
            console.log("ListRiskTriggerLog...end", resp)
            return {err: null, resp: resp}
        }
    }
    async ListRiskWhitelist(req: IListRiskWhitelistReq, params?: RpcParams) : Promise<{err:number, resp:IListRiskWhitelistResp}> {
        let data = ListRiskWhitelistReq.create(req)
        console.log("ListRiskWhitelist...begin", data, params)
        const buffer = ListRiskWhitelistReq.encode(data).finish()
        let [err, pack] = await this.call("ListRiskWhitelist", buffer, params)
        if (err) {
            console.error("ListRiskWhitelist...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = ListRiskWhitelistResp.decode(pack) as any
            console.log("ListRiskWhitelist...end", resp)
            return {err: null, resp: resp}
        }
    }
    async AddRiskWhitelist(req: IAddRiskWhitelistReq, params?: RpcParams) : Promise<{err:number, resp:IAddRiskWhitelistResp}> {
        let data = AddRiskWhitelistReq.create(req)
        console.log("AddRiskWhitelist...begin", data, params)
        const buffer = AddRiskWhitelistReq.encode(data).finish()
        let [err, pack] = await this.call("AddRiskWhitelist", buffer, params)
        if (err) {
            console.error("AddRiskWhitelist...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = AddRiskWhitelistResp.decode(pack) as any
            console.log("AddRiskWhitelist...end", resp)
            return {err: null, resp: resp}
        }
    }
    async DelRiskWhitelist(req: IDelRiskWhitelistReq, params?: RpcParams) : Promise<{err:number, resp:IDelRiskWhitelistResp}> {
        let data = DelRiskWhitelistReq.create(req)
        console.log("DelRiskWhitelist...begin", data, params)
        const buffer = DelRiskWhitelistReq.encode(data).finish()
        let [err, pack] = await this.call("DelRiskWhitelist", buffer, params)
        if (err) {
            console.error("DelRiskWhitelist...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = DelRiskWhitelistResp.decode(pack) as any
            console.log("DelRiskWhitelist...end", resp)
            return {err: null, resp: resp}
        }
    }
    async HistoryAppUser(req: IHistoryAppUserReq, params?: RpcParams) : Promise<{err:number, resp:IHistoryAppUserResp}> {
        let data = HistoryAppUserReq.create(req)
        console.log("HistoryAppUser...begin", data, params)
        const buffer = HistoryAppUserReq.encode(data).finish()
        let [err, pack] = await this.call("HistoryAppUser", buffer, params)
        if (err) {
            console.error("HistoryAppUser...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = HistoryAppUserResp.decode(pack) as any
            console.log("HistoryAppUser...end", resp)
            return {err: null, resp: resp}
        }
    }
    async GetCaptchaStatus(req: IGetCaptchaStatusReq, params?: RpcParams) : Promise<{err:number, resp:IGetCaptchaStatusResp}> {
        let data = GetCaptchaStatusReq.create(req)
        console.log("GetCaptchaStatus...begin", data, params)
        const buffer = GetCaptchaStatusReq.encode(data).finish()
        let [err, pack] = await this.call("GetCaptchaStatus", buffer, params)
        if (err) {
            console.error("GetCaptchaStatus...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = GetCaptchaStatusResp.decode(pack) as any
            console.log("GetCaptchaStatus...end", resp)
            return {err: null, resp: resp}
        }
    }
    async ResetCaptchaRisk(req: IResetCaptchaRiskReq, params?: RpcParams) : Promise<{err:number, resp:IResetCaptchaRiskResp}> {
        let data = ResetCaptchaRiskReq.create(req)
        console.log("ResetCaptchaRisk...begin", data, params)
        const buffer = ResetCaptchaRiskReq.encode(data).finish()
        let [err, pack] = await this.call("ResetCaptchaRisk", buffer, params)
        if (err) {
            console.error("ResetCaptchaRisk...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = ResetCaptchaRiskResp.decode(pack) as any
            console.log("ResetCaptchaRisk...end", resp)
            return {err: null, resp: resp}
        }
    }
    async SaveManager(req: ISaveManagerReq, params?: RpcParams) : Promise<{err:number, resp:ISaveManagerResp}> {
        let data = SaveManagerReq.create(req)
        console.log("SaveManager...begin", data, params)
        const buffer = SaveManagerReq.encode(data).finish()
        let [err, pack] = await this.call("SaveManager", buffer, params)
        if (err) {
            console.error("SaveManager...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = SaveManagerResp.decode(pack) as any
            console.log("SaveManager...end", resp)
            return {err: null, resp: resp}
        }
    }
    async ListManager(req: IListManagerReq, params?: RpcParams) : Promise<{err:number, resp:IListManagerResp}> {
        let data = ListManagerReq.create(req)
        console.log("ListManager...begin", data, params)
        const buffer = ListManagerReq.encode(data).finish()
        let [err, pack] = await this.call("ListManager", buffer, params)
        if (err) {
            console.error("ListManager...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = ListManagerResp.decode(pack) as any
            console.log("ListManager...end", resp)
            return {err: null, resp: resp}
        }
    }
    async DeleteManager(req: IDeleteManagerReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = DeleteManagerReq.create(req)
        console.log("DeleteManager...begin", data, params)
        const buffer = DeleteManagerReq.encode(data).finish()
        let [err, pack] = await this.call("DeleteManager", buffer, params)
        if (err) {
            console.error("DeleteManager...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            console.log("DeleteManager...end", resp)
            return {err: null, resp: resp}
        }
    }
}
export const UserAccount = new $UserAccount({
    name: "mp.user.account.v1",
})
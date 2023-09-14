import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
export enum Code {  
    Success = 0,  
    LoginResultAccountBanned = 10001,  
    LoginResultAccountTypeLimit = 10002,  
    LoginResultMaintenance = 10003,  
    LoginResultErrTokenWrong = 10004,  
    LoginResultErrPasswordWrong = 10005,  
    LoginLinkReuse = 10006,  
    SmsCaptchaStatusPhoneInvalid = 20001,  
    SmsCaptchaStatusCaptchaWrong = 20002,  
    SmsCaptchaStatusTooFast = 20003,  
    SmsCaptchaStatusExpire = 20004,  
    SmsCaptchaStatusFailLimit = 20005,  
    SmsCaptchaStatusUnExpired = 20006,  
    SmsCaptchaStatusSendFail = 20007,  
    SmsCaptchaStatusTimeLimit = 20008,  
    BindPhoneResultPhoneBinded = 30001,  
    BindPlatformResultBinded = 40001,  
    UnbindNumForbidden = 40002,  
    ChangePasswordResultPasswordExist = 30201,  
    ChangePasswordResultInvalidPasswordFormat = 30202,  
    IDCardVerifyResultFail = 2001,  
    IDCardVerifyResultNotMatch = 2002,  
    IDCardVerifyResultInvalid = 2003,  
    IDCardVerifyResultRetryLimit = 2005,  
    IDCardVerifyResultBindAccountLimit = 2006,  
    RegisterLimit = 4003,  
    AuthLimit = 4004,  
    CancelPassportTimesLimit = 50001,
}
export enum PasswordStatus {  
    PasswordStatusEmpty = 0,  
    PasswordStatusExisted = 1,
}
export enum PlatformType {  
    Unknown = 0,  
    Weixin = 1,  
    Apple = 2,  
    Oppo = 3,  
    Vivo = 4,  
    Huawei = 5,  
    Xiaomi = 6,  
    Meizu = 7,  
    Yingyongbao = 8,  
    QQ = 9,  
    UC = 10,  
    Sina = 11,  
    Baidu = 12,  
    Coolpad = 13,  
    Weibo = 14,  
    Sogou = 15,  
    Yidongmm = 16,  
    Kugou = 17,  
    Toutiao = 18,  
    Egame = 19,  
    Wandoujia = 20,  
    Lenovo = 21,  
    PlatformTypeMob = 1000,
}
export enum DeviceType {  
    DeviceTypeWin = 0,  
    DeviceTypeIOS = 1,  
    DeviceTypeAndroid = 2,  
    DeviceTypeWeb = 3,  
    DeviceTypeMac = 4,  
    DeviceTypeSimulator = 5,
}
export enum Sex {  
    SexUnknown = 0,  
    SexMale = 1,  
    SexFemale = 2,
}
export enum CaptchaType {  
    CaptchaTypeUnKnown = 0,  
    CaptchaTypeLogin = 1,  
    CaptchaTypeSetPassword = 2,  
    CaptchaTypeBind = 3,  
    CaptchaTypeUnBind = 4,  
    CaptchaTypeChangeBind = 5,
}
export enum IDCardStatus {  
    IDCardUnVerify = 0,  
    IDCardVerifying = 1,  
    IDCardVerifySuccess = 2,  
    IDCardVerifyFail = 3,
}
export enum LoginByOpIdentifyReq_IdentifyServer {  
    ServerUnknown = 0,  
    Mob = 1,
}
export enum ListAuthTypeResp_BaseType {  
    BaseTypeUnknown = 0,  
    BaseTypeGuid = 1,  
    BaseTypePhoneCode = 2,  
    BaseTypePhonePassword = 3,  
    BaseTypeEmailCode = 4,  
    BaseTypeEmailPassword = 5,
}
export interface IHourPerid {
    startSec?: number|null
    endSec?: number|null
}
@protobuf.Type.d("mpff_user_passport_v1_HourPerid")
export class HourPerid extends protobuf.Message<IHourPerid> {
    constructor(properties: Properties<IHourPerid>) {
        super(properties);
        if (properties) {
            if (properties.startSec) { this.startSec = properties.startSec }
            if (properties.endSec) { this.endSec = properties.endSec }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public startSec?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public endSec?: number|null = 0
}
export interface IAntiAddiction {
    isOpen?: boolean|null
    isRealname?: boolean|null
    isMinor?: boolean|null
    remainPlaySec?: number|null
    notice?: string|null
    age?: number|null
    minAge?: number|null
}
@protobuf.Type.d("mpff_user_passport_v1_AntiAddiction")
export class AntiAddiction extends protobuf.Message<IAntiAddiction> {
    constructor(properties: Properties<IAntiAddiction>) {
        super(properties);
        if (properties) {
            if (properties.isOpen) { this.isOpen = properties.isOpen }
            if (properties.isRealname) { this.isRealname = properties.isRealname }
            if (properties.isMinor) { this.isMinor = properties.isMinor }
            if (properties.remainPlaySec) { this.remainPlaySec = properties.remainPlaySec }
            if (properties.notice) { this.notice = properties.notice }
            if (properties.age) { this.age = properties.age }
            if (properties.minAge) { this.minAge = properties.minAge }
        }
	}
    @protobuf.Field.d(4, "bool", "optional", false)
    public isOpen?: boolean|null = false
    @protobuf.Field.d(5, "bool", "optional", false)
    public isRealname?: boolean|null = false
    @protobuf.Field.d(6, "bool", "optional", false)
    public isMinor?: boolean|null = false
    @protobuf.Field.d(8, "int32", "optional", 0)
    public remainPlaySec?: number|null = 0
    @protobuf.Field.d(9, "string", "optional", )
    public notice?: string|null = ""
    @protobuf.Field.d(10, "int32", "optional", 0)
    public age?: number|null = 0
    @protobuf.Field.d(11, "int32", "optional", 0)
    public minAge?: number|null = 0
}
export interface IPhone {
    number?: string|null
    zone?: number|null
}
@protobuf.Type.d("mpff_user_passport_v1_Phone")
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
export interface IMpPub {
    name?: string|null
    pwdExists?: boolean|null
}
@protobuf.Type.d("mpff_user_passport_v1_MpPub")
export class MpPub extends protobuf.Message<IMpPub> {
    constructor(properties: Properties<IMpPub>) {
        super(properties);
        if (properties) {
            if (properties.name) { this.name = properties.name }
            if (properties.pwdExists) { this.pwdExists = properties.pwdExists }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(2, "bool", "optional", false)
    public pwdExists?: boolean|null = false
}
export interface IPlatform {
    type?: PlatformType|null
    id?: string|null
}
@protobuf.Type.d("mpff_user_passport_v1_Platform")
export class Platform extends protobuf.Message<IPlatform> {
    constructor(properties: Properties<IPlatform>) {
        super(properties);
        if (properties) {
            if (properties.type) { this.type = properties.type }
            if (properties.id) { this.id = properties.id }
        }
	}
    @protobuf.Field.d(1, PlatformType, "optional", PlatformType.Unknown)
    public type?: PlatformType|null = PlatformType.Unknown
    @protobuf.Field.d(2, "string", "optional", )
    public id?: string|null = ""
}
export interface IPlatformUserInfo {
    openID?: string|null
    nickname?: string|null
    headImgURL?: string|null
    sex?: Sex|null
}
@protobuf.Type.d("mpff_user_passport_v1_PlatformUserInfo")
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
@protobuf.Type.d("mpff_user_passport_v1_PlatformLoginResp")
export class PlatformLoginResp extends protobuf.Message<IPlatformLoginResp> {
    constructor(properties: Properties<IPlatformLoginResp>) {
        super(properties);
        if (properties) {
            if (properties.type) { this.type = properties.type }
            if (properties.userInfo) { this.userInfo = PlatformUserInfo.create(properties.userInfo) as any }
        }
	}
    @protobuf.Field.d(1, PlatformType, "optional", PlatformType.Unknown)
    public type?: PlatformType|null = PlatformType.Unknown
    @protobuf.Field.d(2, "mpff_user_passport_v1_PlatformUserInfo", "optional")
    public userInfo?: PlatformUserInfo|null
}
export interface ILoginReqCommon {
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
    tokenTag?: string|null
    isSimulator?: boolean|null
}
@protobuf.Type.d("mpff_user_passport_v1_LoginReqCommon")
export class LoginReqCommon extends protobuf.Message<ILoginReqCommon> {
    constructor(properties: Properties<ILoginReqCommon>) {
        super(properties);
        if (properties) {
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
            if (properties.tokenTag) { this.tokenTag = properties.tokenTag }
            if (properties.isSimulator) { this.isSimulator = properties.isSimulator }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public guid?: string|null = ""
    @protobuf.Field.d(2, DeviceType, "optional", DeviceType.DeviceTypeWin)
    public deviceType?: DeviceType|null = DeviceType.DeviceTypeWin
    @protobuf.Field.d(3, "string", "optional", )
    public deviceMode?: string|null = ""
    @protobuf.Field.d(4, "int64", "optional", 0)
    public clientTime?: number|null = 0
    @protobuf.Field.d(5, "string", "optional", )
    public clientVersion?: string|null = ""
    @protobuf.Field.d(6, "float", "optional", 0)
    public latitude?: number|null = 0
    @protobuf.Field.d(7, "float", "optional", 0)
    public longitude?: number|null = 0
    @protobuf.Field.d(8, "string", "optional", )
    public language?: string|null = ""
    @protobuf.Field.d(9, "string", "optional", )
    public os?: string|null = ""
    @protobuf.Field.d(10, "string", "optional", )
    public channel?: string|null = ""
    @protobuf.Field.d(11, "string", "optional", )
    public tokenTag?: string|null = ""
    @protobuf.Field.d(12, "bool", "optional", false)
    public isSimulator?: boolean|null = false
}
export interface ILoginRespCommon {
    uid?: number|null
    token?: string|null
    tokenExpiredAt?: number|null
    isRegister?: boolean|null
    antiAddiction?: IAntiAddiction
    lastLoginAt?: number|null
}
@protobuf.Type.d("mpff_user_passport_v1_LoginRespCommon")
export class LoginRespCommon extends protobuf.Message<ILoginRespCommon> {
    constructor(properties: Properties<ILoginRespCommon>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.token) { this.token = properties.token }
            if (properties.tokenExpiredAt) { this.tokenExpiredAt = properties.tokenExpiredAt }
            if (properties.isRegister) { this.isRegister = properties.isRegister }
            if (properties.antiAddiction) { this.antiAddiction = AntiAddiction.create(properties.antiAddiction) as any }
            if (properties.lastLoginAt) { this.lastLoginAt = properties.lastLoginAt }
        }
	}
    @protobuf.Field.d(2, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(4, "string", "optional", )
    public token?: string|null = ""
    @protobuf.Field.d(5, "int64", "optional", 0)
    public tokenExpiredAt?: number|null = 0
    @protobuf.Field.d(7, "bool", "optional", false)
    public isRegister?: boolean|null = false
    @protobuf.Field.d(8, "mpff_user_passport_v1_AntiAddiction", "optional")
    public antiAddiction?: AntiAddiction|null
    @protobuf.Field.d(9, "int64", "optional", 0)
    public lastLoginAt?: number|null = 0
}
export interface ILoginByTokenReq {
    common?: ILoginReqCommon
    uid?: number|null
    token?: string|null
}
@protobuf.Type.d("mpff_user_passport_v1_LoginByTokenReq")
export class LoginByTokenReq extends protobuf.Message<ILoginByTokenReq> {
    constructor(properties: Properties<ILoginByTokenReq>) {
        super(properties);
        if (properties) {
            if (properties.common) { this.common = LoginReqCommon.create(properties.common) as any }
            if (properties.uid) { this.uid = properties.uid }
            if (properties.token) { this.token = properties.token }
        }
	}
    @protobuf.Field.d(1, "mpff_user_passport_v1_LoginReqCommon", "optional")
    public common?: LoginReqCommon|null
    @protobuf.Field.d(2, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public token?: string|null = ""
}
export interface ILoginByTokenResp {
    common?: ILoginRespCommon
}
@protobuf.Type.d("mpff_user_passport_v1_LoginByTokenResp")
export class LoginByTokenResp extends protobuf.Message<ILoginByTokenResp> {
    constructor(properties: Properties<ILoginByTokenResp>) {
        super(properties);
        if (properties) {
            if (properties.common) { this.common = LoginRespCommon.create(properties.common) as any }
        }
	}
    @protobuf.Field.d(2, "mpff_user_passport_v1_LoginRespCommon", "optional")
    public common?: LoginRespCommon|null
}
export interface ILoginByGuidReq {
    common?: ILoginReqCommon
}
@protobuf.Type.d("mpff_user_passport_v1_LoginByGuidReq")
export class LoginByGuidReq extends protobuf.Message<ILoginByGuidReq> {
    constructor(properties: Properties<ILoginByGuidReq>) {
        super(properties);
        if (properties) {
            if (properties.common) { this.common = LoginReqCommon.create(properties.common) as any }
        }
	}
    @protobuf.Field.d(1, "mpff_user_passport_v1_LoginReqCommon", "optional")
    public common?: LoginReqCommon|null
}
export interface ILoginByGuidResp {
    common?: ILoginRespCommon
}
@protobuf.Type.d("mpff_user_passport_v1_LoginByGuidResp")
export class LoginByGuidResp extends protobuf.Message<ILoginByGuidResp> {
    constructor(properties: Properties<ILoginByGuidResp>) {
        super(properties);
        if (properties) {
            if (properties.common) { this.common = LoginRespCommon.create(properties.common) as any }
        }
	}
    @protobuf.Field.d(2, "mpff_user_passport_v1_LoginRespCommon", "optional")
    public common?: LoginRespCommon|null
}
export interface ILoginByPhoneSmsReq {
    common?: ILoginReqCommon
    phone?: IPhone
    captcha?: string|null
}
@protobuf.Type.d("mpff_user_passport_v1_LoginByPhoneSmsReq")
export class LoginByPhoneSmsReq extends protobuf.Message<ILoginByPhoneSmsReq> {
    constructor(properties: Properties<ILoginByPhoneSmsReq>) {
        super(properties);
        if (properties) {
            if (properties.common) { this.common = LoginReqCommon.create(properties.common) as any }
            if (properties.phone) { this.phone = Phone.create(properties.phone) as any }
            if (properties.captcha) { this.captcha = properties.captcha }
        }
	}
    @protobuf.Field.d(1, "mpff_user_passport_v1_LoginReqCommon", "optional")
    public common?: LoginReqCommon|null
    @protobuf.Field.d(2, "mpff_user_passport_v1_Phone", "optional")
    public phone?: Phone|null
    @protobuf.Field.d(3, "string", "optional", )
    public captcha?: string|null = ""
}
export interface ILoginByPhoneSmsResp {
    common?: ILoginRespCommon
    retryLeft?: number|null
}
@protobuf.Type.d("mpff_user_passport_v1_LoginByPhoneSmsResp")
export class LoginByPhoneSmsResp extends protobuf.Message<ILoginByPhoneSmsResp> {
    constructor(properties: Properties<ILoginByPhoneSmsResp>) {
        super(properties);
        if (properties) {
            if (properties.common) { this.common = LoginRespCommon.create(properties.common) as any }
            if (properties.retryLeft) { this.retryLeft = properties.retryLeft }
        }
	}
    @protobuf.Field.d(2, "mpff_user_passport_v1_LoginRespCommon", "optional")
    public common?: LoginRespCommon|null
    @protobuf.Field.d(3, "int32", "optional", 0)
    public retryLeft?: number|null = 0
}
export interface ILoginByPhonePwdReq {
    common?: ILoginReqCommon
    phone?: IPhone
    password?: string|null
}
@protobuf.Type.d("mpff_user_passport_v1_LoginByPhonePwdReq")
export class LoginByPhonePwdReq extends protobuf.Message<ILoginByPhonePwdReq> {
    constructor(properties: Properties<ILoginByPhonePwdReq>) {
        super(properties);
        if (properties) {
            if (properties.common) { this.common = LoginReqCommon.create(properties.common) as any }
            if (properties.phone) { this.phone = Phone.create(properties.phone) as any }
            if (properties.password) { this.password = properties.password }
        }
	}
    @protobuf.Field.d(1, "mpff_user_passport_v1_LoginReqCommon", "optional")
    public common?: LoginReqCommon|null
    @protobuf.Field.d(2, "mpff_user_passport_v1_Phone", "optional")
    public phone?: Phone|null
    @protobuf.Field.d(3, "string", "optional", )
    public password?: string|null = ""
}
export interface ILoginByPhonePwdResp {
    common?: ILoginRespCommon
}
@protobuf.Type.d("mpff_user_passport_v1_LoginByPhonePwdResp")
export class LoginByPhonePwdResp extends protobuf.Message<ILoginByPhonePwdResp> {
    constructor(properties: Properties<ILoginByPhonePwdResp>) {
        super(properties);
        if (properties) {
            if (properties.common) { this.common = LoginRespCommon.create(properties.common) as any }
        }
	}
    @protobuf.Field.d(2, "mpff_user_passport_v1_LoginRespCommon", "optional")
    public common?: LoginRespCommon|null
}
export interface ILoginByEmailPwdReq {
    common?: ILoginReqCommon
    email?: string|null
    password?: string|null
}
@protobuf.Type.d("mpff_user_passport_v1_LoginByEmailPwdReq")
export class LoginByEmailPwdReq extends protobuf.Message<ILoginByEmailPwdReq> {
    constructor(properties: Properties<ILoginByEmailPwdReq>) {
        super(properties);
        if (properties) {
            if (properties.common) { this.common = LoginReqCommon.create(properties.common) as any }
            if (properties.email) { this.email = properties.email }
            if (properties.password) { this.password = properties.password }
        }
	}
    @protobuf.Field.d(1, "mpff_user_passport_v1_LoginReqCommon", "optional")
    public common?: LoginReqCommon|null
    @protobuf.Field.d(2, "string", "optional", )
    public email?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public password?: string|null = ""
}
export interface ILoginByEmailPwdResp {
    common?: ILoginRespCommon
}
@protobuf.Type.d("mpff_user_passport_v1_LoginByEmailPwdResp")
export class LoginByEmailPwdResp extends protobuf.Message<ILoginByEmailPwdResp> {
    constructor(properties: Properties<ILoginByEmailPwdResp>) {
        super(properties);
        if (properties) {
            if (properties.common) { this.common = LoginRespCommon.create(properties.common) as any }
        }
	}
    @protobuf.Field.d(2, "mpff_user_passport_v1_LoginRespCommon", "optional")
    public common?: LoginRespCommon|null
}
export interface ILoginByPlatformReq {
    common?: ILoginReqCommon
    type?: PlatformType|null
    code?: string|null
    token?: string|null
    openID?: string|null
    accessToken?: string|null
    param?: string|null
    appID?: string|null
}
@protobuf.Type.d("mpff_user_passport_v1_LoginByPlatformReq")
export class LoginByPlatformReq extends protobuf.Message<ILoginByPlatformReq> {
    constructor(properties: Properties<ILoginByPlatformReq>) {
        super(properties);
        if (properties) {
            if (properties.common) { this.common = LoginReqCommon.create(properties.common) as any }
            if (properties.type) { this.type = properties.type }
            if (properties.code) { this.code = properties.code }
            if (properties.token) { this.token = properties.token }
            if (properties.openID) { this.openID = properties.openID }
            if (properties.accessToken) { this.accessToken = properties.accessToken }
            if (properties.param) { this.param = properties.param }
            if (properties.appID) { this.appID = properties.appID }
        }
	}
    @protobuf.Field.d(1, "mpff_user_passport_v1_LoginReqCommon", "optional")
    public common?: LoginReqCommon|null
    @protobuf.Field.d(2, PlatformType, "optional", PlatformType.Unknown)
    public type?: PlatformType|null = PlatformType.Unknown
    @protobuf.Field.d(3, "string", "optional", )
    public code?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public token?: string|null = ""
    @protobuf.Field.d(8, "string", "optional", )
    public openID?: string|null = ""
    @protobuf.Field.d(9, "string", "optional", )
    public accessToken?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public param?: string|null = ""
    @protobuf.Field.d(6, "string", "optional", )
    public appID?: string|null = ""
}
export interface ILoginByPlatformParamReq {
    common?: ILoginReqCommon
    type?: PlatformType|null
    param?: string|null
}
@protobuf.Type.d("mpff_user_passport_v1_LoginByPlatformParamReq")
export class LoginByPlatformParamReq extends protobuf.Message<ILoginByPlatformParamReq> {
    constructor(properties: Properties<ILoginByPlatformParamReq>) {
        super(properties);
        if (properties) {
            if (properties.common) { this.common = LoginReqCommon.create(properties.common) as any }
            if (properties.type) { this.type = properties.type }
            if (properties.param) { this.param = properties.param }
        }
	}
    @protobuf.Field.d(1, "mpff_user_passport_v1_LoginReqCommon", "optional")
    public common?: LoginReqCommon|null
    @protobuf.Field.d(2, PlatformType, "optional", PlatformType.Unknown)
    public type?: PlatformType|null = PlatformType.Unknown
    @protobuf.Field.d(3, "string", "optional", )
    public param?: string|null = ""
}
export interface ILoginByPlatformResp {
    common?: ILoginRespCommon
    userInfo?: IPlatformUserInfo
}
@protobuf.Type.d("mpff_user_passport_v1_LoginByPlatformResp")
export class LoginByPlatformResp extends protobuf.Message<ILoginByPlatformResp> {
    constructor(properties: Properties<ILoginByPlatformResp>) {
        super(properties);
        if (properties) {
            if (properties.common) { this.common = LoginRespCommon.create(properties.common) as any }
            if (properties.userInfo) { this.userInfo = PlatformUserInfo.create(properties.userInfo) as any }
        }
	}
    @protobuf.Field.d(2, "mpff_user_passport_v1_LoginRespCommon", "optional")
    public common?: LoginRespCommon|null
    @protobuf.Field.d(3, "mpff_user_passport_v1_PlatformUserInfo", "optional")
    public userInfo?: PlatformUserInfo|null
}
export interface ILoginByOpIdentifyReq {
    common?: ILoginReqCommon
    server?: LoginByOpIdentifyReq_IdentifyServer|null
    operatorToken?: string|null
    operator?: string|null
    serviceToken?: string|null
}
@protobuf.Type.d("mpff_user_passport_v1_LoginByOpIdentifyReq")
export class LoginByOpIdentifyReq extends protobuf.Message<ILoginByOpIdentifyReq> {
    constructor(properties: Properties<ILoginByOpIdentifyReq>) {
        super(properties);
        if (properties) {
            if (properties.common) { this.common = LoginReqCommon.create(properties.common) as any }
            if (properties.server) { this.server = properties.server }
            if (properties.operatorToken) { this.operatorToken = properties.operatorToken }
            if (properties.operator) { this.operator = properties.operator }
            if (properties.serviceToken) { this.serviceToken = properties.serviceToken }
        }
	}
    @protobuf.Field.d(1, "mpff_user_passport_v1_LoginReqCommon", "optional")
    public common?: LoginReqCommon|null
    @protobuf.Field.d(5, LoginByOpIdentifyReq_IdentifyServer, "optional", LoginByOpIdentifyReq_IdentifyServer.ServerUnknown)
    public server?: LoginByOpIdentifyReq_IdentifyServer|null = LoginByOpIdentifyReq_IdentifyServer.ServerUnknown
    @protobuf.Field.d(2, "string", "optional", )
    public operatorToken?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public serviceToken?: string|null = ""
}
export interface ILoginByOpIdentifyResp {
    common?: ILoginRespCommon
}
@protobuf.Type.d("mpff_user_passport_v1_LoginByOpIdentifyResp")
export class LoginByOpIdentifyResp extends protobuf.Message<ILoginByOpIdentifyResp> {
    constructor(properties: Properties<ILoginByOpIdentifyResp>) {
        super(properties);
        if (properties) {
            if (properties.common) { this.common = LoginRespCommon.create(properties.common) as any }
        }
	}
    @protobuf.Field.d(2, "mpff_user_passport_v1_LoginRespCommon", "optional")
    public common?: LoginRespCommon|null
}
export interface ISendSmsCaptchaReq {
    type?: CaptchaType|null
    phone?: IPhone
}
@protobuf.Type.d("mpff_user_passport_v1_SendSmsCaptchaReq")
export class SendSmsCaptchaReq extends protobuf.Message<ISendSmsCaptchaReq> {
    constructor(properties: Properties<ISendSmsCaptchaReq>) {
        super(properties);
        if (properties) {
            if (properties.type) { this.type = properties.type }
            if (properties.phone) { this.phone = Phone.create(properties.phone) as any }
        }
	}
    @protobuf.Field.d(1, CaptchaType, "optional", CaptchaType.CaptchaTypeUnKnown)
    public type?: CaptchaType|null = CaptchaType.CaptchaTypeUnKnown
    @protobuf.Field.d(2, "mpff_user_passport_v1_Phone", "optional")
    public phone?: Phone|null
}
export interface ISendSmsCaptchaResp {
    expiredAt?: number|null
}
@protobuf.Type.d("mpff_user_passport_v1_SendSmsCaptchaResp")
export class SendSmsCaptchaResp extends protobuf.Message<ISendSmsCaptchaResp> {
    constructor(properties: Properties<ISendSmsCaptchaResp>) {
        super(properties);
        if (properties) {
            if (properties.expiredAt) { this.expiredAt = properties.expiredAt }
        }
	}
    @protobuf.Field.d(2, "int64", "optional", 0)
    public expiredAt?: number|null = 0
}
export interface IVerifySmsCaptchaReq {
    type?: CaptchaType|null
    phone?: IPhone
    captcha?: string|null
}
@protobuf.Type.d("mpff_user_passport_v1_VerifySmsCaptchaReq")
export class VerifySmsCaptchaReq extends protobuf.Message<IVerifySmsCaptchaReq> {
    constructor(properties: Properties<IVerifySmsCaptchaReq>) {
        super(properties);
        if (properties) {
            if (properties.type) { this.type = properties.type }
            if (properties.phone) { this.phone = Phone.create(properties.phone) as any }
            if (properties.captcha) { this.captcha = properties.captcha }
        }
	}
    @protobuf.Field.d(1, CaptchaType, "optional", CaptchaType.CaptchaTypeUnKnown)
    public type?: CaptchaType|null = CaptchaType.CaptchaTypeUnKnown
    @protobuf.Field.d(2, "mpff_user_passport_v1_Phone", "optional")
    public phone?: Phone|null
    @protobuf.Field.d(3, "string", "optional", )
    public captcha?: string|null = ""
}
export interface IVerifySmsCaptchaResp {
    expiredAt?: number|null
}
@protobuf.Type.d("mpff_user_passport_v1_VerifySmsCaptchaResp")
export class VerifySmsCaptchaResp extends protobuf.Message<IVerifySmsCaptchaResp> {
    constructor(properties: Properties<IVerifySmsCaptchaResp>) {
        super(properties);
        if (properties) {
            if (properties.expiredAt) { this.expiredAt = properties.expiredAt }
        }
	}
    @protobuf.Field.d(2, "int64", "optional", 0)
    public expiredAt?: number|null = 0
}
export interface IBindPhoneReq {
    phone?: IPhone
    captcha?: string|null
}
@protobuf.Type.d("mpff_user_passport_v1_BindPhoneReq")
export class BindPhoneReq extends protobuf.Message<IBindPhoneReq> {
    constructor(properties: Properties<IBindPhoneReq>) {
        super(properties);
        if (properties) {
            if (properties.phone) { this.phone = Phone.create(properties.phone) as any }
            if (properties.captcha) { this.captcha = properties.captcha }
        }
	}
    @protobuf.Field.d(1, "mpff_user_passport_v1_Phone", "optional")
    public phone?: Phone|null
    @protobuf.Field.d(2, "string", "optional", )
    public captcha?: string|null = ""
}
export interface IBindPlatformReq {
    type?: PlatformType|null
    code?: string|null
    token?: string|null
    openID?: string|null
    accessToken?: string|null
    param?: string|null
    appID?: string|null
}
@protobuf.Type.d("mpff_user_passport_v1_BindPlatformReq")
export class BindPlatformReq extends protobuf.Message<IBindPlatformReq> {
    constructor(properties: Properties<IBindPlatformReq>) {
        super(properties);
        if (properties) {
            if (properties.type) { this.type = properties.type }
            if (properties.code) { this.code = properties.code }
            if (properties.token) { this.token = properties.token }
            if (properties.openID) { this.openID = properties.openID }
            if (properties.accessToken) { this.accessToken = properties.accessToken }
            if (properties.param) { this.param = properties.param }
            if (properties.appID) { this.appID = properties.appID }
        }
	}
    @protobuf.Field.d(1, PlatformType, "optional", PlatformType.Unknown)
    public type?: PlatformType|null = PlatformType.Unknown
    @protobuf.Field.d(2, "string", "optional", )
    public code?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public token?: string|null = ""
    @protobuf.Field.d(7, "string", "optional", )
    public openID?: string|null = ""
    @protobuf.Field.d(6, "string", "optional", )
    public accessToken?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public param?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public appID?: string|null = ""
}
export interface IBindPhoneResp {
}
@protobuf.Type.d("mpff_user_passport_v1_BindPhoneResp")
export class BindPhoneResp extends protobuf.Message<IBindPhoneResp> {
    constructor(properties: Properties<IBindPhoneResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IBind {
    phone?: IBindPhoneReq
    platform?: IBindPlatformReq
}
@protobuf.Type.d("mpff_user_passport_v1_Bind")
export class Bind extends protobuf.Message<IBind> {
    constructor(properties: Properties<IBind>) {
        super(properties);
        if (properties) {
            if (properties.phone) { this.phone = BindPhoneReq.create(properties.phone) as any }
            if (properties.platform) { this.platform = BindPlatformReq.create(properties.platform) as any }
        }
	}
    @protobuf.Field.d(2, "mpff_user_passport_v1_BindPhoneReq", "optional")
    public phone?: BindPhoneReq|null
    @protobuf.Field.d(3, "mpff_user_passport_v1_BindPlatformReq", "optional")
    public platform?: BindPlatformReq|null
}
export interface IBindPlatformResp {
    userInfo?: IPlatformUserInfo
}
@protobuf.Type.d("mpff_user_passport_v1_BindPlatformResp")
export class BindPlatformResp extends protobuf.Message<IBindPlatformResp> {
    constructor(properties: Properties<IBindPlatformResp>) {
        super(properties);
        if (properties) {
            if (properties.userInfo) { this.userInfo = PlatformUserInfo.create(properties.userInfo) as any }
        }
	}
    @protobuf.Field.d(2, "mpff_user_passport_v1_PlatformUserInfo", "optional")
    public userInfo?: PlatformUserInfo|null
}
export interface IUnbindPlatformReq {
    type?: PlatformType|null
}
@protobuf.Type.d("mpff_user_passport_v1_UnbindPlatformReq")
export class UnbindPlatformReq extends protobuf.Message<IUnbindPlatformReq> {
    constructor(properties: Properties<IUnbindPlatformReq>) {
        super(properties);
        if (properties) {
            if (properties.type) { this.type = properties.type }
        }
	}
    @protobuf.Field.d(1, PlatformType, "optional", PlatformType.Unknown)
    public type?: PlatformType|null = PlatformType.Unknown
}
export interface IUnbindPlatformResp {
}
@protobuf.Type.d("mpff_user_passport_v1_UnbindPlatformResp")
export class UnbindPlatformResp extends protobuf.Message<IUnbindPlatformResp> {
    constructor(properties: Properties<IUnbindPlatformResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IChangeBindPhoneReq {
    old?: IBindPhoneReq
    new?: IBindPhoneReq
}
@protobuf.Type.d("mpff_user_passport_v1_ChangeBindPhoneReq")
export class ChangeBindPhoneReq extends protobuf.Message<IChangeBindPhoneReq> {
    constructor(properties: Properties<IChangeBindPhoneReq>) {
        super(properties);
        if (properties) {
            if (properties.old) { this.old = BindPhoneReq.create(properties.old) as any }
            if (properties.new) { this.new = BindPhoneReq.create(properties.new) as any }
        }
	}
    @protobuf.Field.d(1, "mpff_user_passport_v1_BindPhoneReq", "optional")
    public old?: BindPhoneReq|null
    @protobuf.Field.d(2, "mpff_user_passport_v1_BindPhoneReq", "optional")
    public new?: BindPhoneReq|null
}
export interface IChangeBindPhoneResp {
}
@protobuf.Type.d("mpff_user_passport_v1_ChangeBindPhoneResp")
export class ChangeBindPhoneResp extends protobuf.Message<IChangeBindPhoneResp> {
    constructor(properties: Properties<IChangeBindPhoneResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface ISetPasswordBySmsReq {
    phone?: IPhone
    captcha?: string|null
    password?: string|null
}
@protobuf.Type.d("mpff_user_passport_v1_SetPasswordBySmsReq")
export class SetPasswordBySmsReq extends protobuf.Message<ISetPasswordBySmsReq> {
    constructor(properties: Properties<ISetPasswordBySmsReq>) {
        super(properties);
        if (properties) {
            if (properties.phone) { this.phone = Phone.create(properties.phone) as any }
            if (properties.captcha) { this.captcha = properties.captcha }
            if (properties.password) { this.password = properties.password }
        }
	}
    @protobuf.Field.d(1, "mpff_user_passport_v1_Phone", "optional")
    public phone?: Phone|null
    @protobuf.Field.d(2, "string", "optional", )
    public captcha?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public password?: string|null = ""
}
export interface ISetPasswordBySmsResp {
}
@protobuf.Type.d("mpff_user_passport_v1_SetPasswordBySmsResp")
export class SetPasswordBySmsResp extends protobuf.Message<ISetPasswordBySmsResp> {
    constructor(properties: Properties<ISetPasswordBySmsResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IChangePasswordReq {
    oldPassword?: string|null
    newPassword?: string|null
}
@protobuf.Type.d("mpff_user_passport_v1_ChangePasswordReq")
export class ChangePasswordReq extends protobuf.Message<IChangePasswordReq> {
    constructor(properties: Properties<IChangePasswordReq>) {
        super(properties);
        if (properties) {
            if (properties.oldPassword) { this.oldPassword = properties.oldPassword }
            if (properties.newPassword) { this.newPassword = properties.newPassword }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public oldPassword?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public newPassword?: string|null = ""
}
export interface IChangePasswordResp {
}
@protobuf.Type.d("mpff_user_passport_v1_ChangePasswordResp")
export class ChangePasswordResp extends protobuf.Message<IChangePasswordResp> {
    constructor(properties: Properties<IChangePasswordResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IListPassportReq {
}
@protobuf.Type.d("mpff_user_passport_v1_ListPassportReq")
export class ListPassportReq extends protobuf.Message<IListPassportReq> {
    constructor(properties: Properties<IListPassportReq>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IListPassportResp {
    uid?: number|null
    phone?: IPhone
    email?: string|null
    guid?: string|null
    mpPub?: IMpPub
    platformList?: IPlatform[]
}
@protobuf.Type.d("mpff_user_passport_v1_ListPassportResp")
export class ListPassportResp extends protobuf.Message<IListPassportResp> {
    constructor(properties: Properties<IListPassportResp>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.phone) { this.phone = Phone.create(properties.phone) as any }
            if (properties.email) { this.email = properties.email }
            if (properties.guid) { this.guid = properties.guid }
            if (properties.mpPub) { this.mpPub = MpPub.create(properties.mpPub) as any }
            if (properties.platformList) { this.platformList = []; properties.platformList.forEach((value, index)=>{this.platformList[index] = Platform.create(properties.platformList[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "mpff_user_passport_v1_Phone", "optional")
    public phone?: Phone|null
    @protobuf.Field.d(3, "string", "optional", )
    public email?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public guid?: string|null = ""
    @protobuf.Field.d(5, "mpff_user_passport_v1_MpPub", "optional")
    public mpPub?: MpPub|null
    @protobuf.Field.d(6, "mpff_user_passport_v1_Platform", "repeated")
    public platformList?: Platform[] = []
}
export interface IGetPassportReq {
    phone?: IPhone
    email?: string|null
    guid?: string|null
}
@protobuf.Type.d("mpff_user_passport_v1_GetPassportReq")
export class GetPassportReq extends protobuf.Message<IGetPassportReq> {
    constructor(properties: Properties<IGetPassportReq>) {
        super(properties);
        if (properties) {
            if (properties.phone) { this.phone = Phone.create(properties.phone) as any }
            if (properties.email) { this.email = properties.email }
            if (properties.guid) { this.guid = properties.guid }
        }
	}
    @protobuf.Field.d(1, "mpff_user_passport_v1_Phone", "optional")
    public phone?: Phone|null
    @protobuf.Field.d(2, "string", "optional", )
    public email?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public guid?: string|null = ""
}
export interface IGetPassportResp {
    uid?: number|null
    phone?: IPhone
    email?: string|null
    guid?: string|null
    mpPub?: IMpPub
    platformList?: IPlatform[]
}
@protobuf.Type.d("mpff_user_passport_v1_GetPassportResp")
export class GetPassportResp extends protobuf.Message<IGetPassportResp> {
    constructor(properties: Properties<IGetPassportResp>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.phone) { this.phone = Phone.create(properties.phone) as any }
            if (properties.email) { this.email = properties.email }
            if (properties.guid) { this.guid = properties.guid }
            if (properties.mpPub) { this.mpPub = MpPub.create(properties.mpPub) as any }
            if (properties.platformList) { this.platformList = []; properties.platformList.forEach((value, index)=>{this.platformList[index] = Platform.create(properties.platformList[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "mpff_user_passport_v1_Phone", "optional")
    public phone?: Phone|null
    @protobuf.Field.d(3, "string", "optional", )
    public email?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public guid?: string|null = ""
    @protobuf.Field.d(5, "mpff_user_passport_v1_MpPub", "optional")
    public mpPub?: MpPub|null
    @protobuf.Field.d(6, "mpff_user_passport_v1_Platform", "repeated")
    public platformList?: Platform[] = []
}
export interface IFindPassportReq {
    phone?: IPhone
    email?: string|null
    guid?: string|null
    platform?: IPlatform
}
@protobuf.Type.d("mpff_user_passport_v1_FindPassportReq")
export class FindPassportReq extends protobuf.Message<IFindPassportReq> {
    constructor(properties: Properties<IFindPassportReq>) {
        super(properties);
        if (properties) {
            if (properties.phone) { this.phone = Phone.create(properties.phone) as any }
            if (properties.email) { this.email = properties.email }
            if (properties.guid) { this.guid = properties.guid }
            if (properties.platform) { this.platform = Platform.create(properties.platform) as any }
        }
	}
    @protobuf.Field.d(1, "mpff_user_passport_v1_Phone", "optional")
    public phone?: Phone|null
    @protobuf.Field.d(2, "string", "optional", )
    public email?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public guid?: string|null = ""
    @protobuf.Field.d(4, "mpff_user_passport_v1_Platform", "optional")
    public platform?: Platform|null
}
export interface IFindPassportResp {
    mpPub?: IMpPub
    isExist?: boolean|null
}
@protobuf.Type.d("mpff_user_passport_v1_FindPassportResp")
export class FindPassportResp extends protobuf.Message<IFindPassportResp> {
    constructor(properties: Properties<IFindPassportResp>) {
        super(properties);
        if (properties) {
            if (properties.mpPub) { this.mpPub = MpPub.create(properties.mpPub) as any }
            if (properties.isExist) { this.isExist = properties.isExist }
        }
	}
    @protobuf.Field.d(1, "mpff_user_passport_v1_MpPub", "optional")
    public mpPub?: MpPub|null
    @protobuf.Field.d(2, "bool", "optional", false)
    public isExist?: boolean|null = false
}
export interface IPhoneUser {
    phone?: IPhone
    uid?: number|null
}
@protobuf.Type.d("mpff_user_passport_v1_PhoneUser")
export class PhoneUser extends protobuf.Message<IPhoneUser> {
    constructor(properties: Properties<IPhoneUser>) {
        super(properties);
        if (properties) {
            if (properties.phone) { this.phone = Phone.create(properties.phone) as any }
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "mpff_user_passport_v1_Phone", "optional")
    public phone?: Phone|null
    @protobuf.Field.d(2, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IListUserByPhoneReq {
    PhoneList?: IPhone[]
}
@protobuf.Type.d("mpff_user_passport_v1_ListUserByPhoneReq")
export class ListUserByPhoneReq extends protobuf.Message<IListUserByPhoneReq> {
    constructor(properties: Properties<IListUserByPhoneReq>) {
        super(properties);
        if (properties) {
            if (properties.PhoneList) { this.PhoneList = []; properties.PhoneList.forEach((value, index)=>{this.PhoneList[index] = Phone.create(properties.PhoneList[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "mpff_user_passport_v1_Phone", "repeated")
    public PhoneList?: Phone[] = []
}
export interface IListUserByPhoneResp {
    list?: IPhoneUser[]
}
@protobuf.Type.d("mpff_user_passport_v1_ListUserByPhoneResp")
export class ListUserByPhoneResp extends protobuf.Message<IListUserByPhoneResp> {
    constructor(properties: Properties<IListUserByPhoneResp>) {
        super(properties);
        if (properties) {
            if (properties.list) { this.list = []; properties.list.forEach((value, index)=>{this.list[index] = PhoneUser.create(properties.list[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "mpff_user_passport_v1_PhoneUser", "repeated")
    public list?: PhoneUser[] = []
}
export interface ICreateEmailAccountReq {
    email?: string|null
    password?: string|null
}
@protobuf.Type.d("mpff_user_passport_v1_CreateEmailAccountReq")
export class CreateEmailAccountReq extends protobuf.Message<ICreateEmailAccountReq> {
    constructor(properties: Properties<ICreateEmailAccountReq>) {
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
export interface ICreateEmailAccountResp {
    uid?: number|null
}
@protobuf.Type.d("mpff_user_passport_v1_CreateEmailAccountResp")
export class CreateEmailAccountResp extends protobuf.Message<ICreateEmailAccountResp> {
    constructor(properties: Properties<ICreateEmailAccountResp>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IVerifyIDCardReq {
    idCardName?: string|null
    idCardNo?: string|null
}
@protobuf.Type.d("mpff_user_passport_v1_VerifyIDCardReq")
export class VerifyIDCardReq extends protobuf.Message<IVerifyIDCardReq> {
    constructor(properties: Properties<IVerifyIDCardReq>) {
        super(properties);
        if (properties) {
            if (properties.idCardName) { this.idCardName = properties.idCardName }
            if (properties.idCardNo) { this.idCardNo = properties.idCardNo }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public idCardName?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public idCardNo?: string|null = ""
}
export interface IVerifyIDCardResp {
    status?: IDCardStatus|null
    retryRemain?: number|null
    antiAddiction?: IAntiAddiction
}
@protobuf.Type.d("mpff_user_passport_v1_VerifyIDCardResp")
export class VerifyIDCardResp extends protobuf.Message<IVerifyIDCardResp> {
    constructor(properties: Properties<IVerifyIDCardResp>) {
        super(properties);
        if (properties) {
            if (properties.status) { this.status = properties.status }
            if (properties.retryRemain) { this.retryRemain = properties.retryRemain }
            if (properties.antiAddiction) { this.antiAddiction = AntiAddiction.create(properties.antiAddiction) as any }
        }
	}
    @protobuf.Field.d(2, IDCardStatus, "optional", IDCardStatus.IDCardUnVerify)
    public status?: IDCardStatus|null = IDCardStatus.IDCardUnVerify
    @protobuf.Field.d(3, "int32", "optional", 0)
    public retryRemain?: number|null = 0
    @protobuf.Field.d(4, "mpff_user_passport_v1_AntiAddiction", "optional")
    public antiAddiction?: AntiAddiction|null
}
export interface IIDCard {
    cardNo?: string|null
    cardName?: string|null
    status?: IDCardStatus|null
    updateAt?: number|null
}
@protobuf.Type.d("mpff_user_passport_v1_IDCard")
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
    @protobuf.Field.d(3, IDCardStatus, "optional", IDCardStatus.IDCardUnVerify)
    public status?: IDCardStatus|null = IDCardStatus.IDCardUnVerify
    @protobuf.Field.d(4, "int64", "optional", 0)
    public updateAt?: number|null = 0
}
export interface IGetIDCardReq {
}
@protobuf.Type.d("mpff_user_passport_v1_GetIDCardReq")
export class GetIDCardReq extends protobuf.Message<IGetIDCardReq> {
    constructor(properties: Properties<IGetIDCardReq>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IGeIDCardResp {
    info?: IIDCard
}
@protobuf.Type.d("mpff_user_passport_v1_GeIDCardResp")
export class GeIDCardResp extends protobuf.Message<IGeIDCardResp> {
    constructor(properties: Properties<IGeIDCardResp>) {
        super(properties);
        if (properties) {
            if (properties.info) { this.info = IDCard.create(properties.info) as any }
        }
	}
    @protobuf.Field.d(1, "mpff_user_passport_v1_IDCard", "optional")
    public info?: IDCard|null
}
export interface ICancelPassportReq {
    uid?: number|null
}
@protobuf.Type.d("mpff_user_passport_v1_CancelPassportReq")
export class CancelPassportReq extends protobuf.Message<ICancelPassportReq> {
    constructor(properties: Properties<ICancelPassportReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface ICancelPassportResp {
}
@protobuf.Type.d("mpff_user_passport_v1_CancelPassportResp")
export class CancelPassportResp extends protobuf.Message<ICancelPassportResp> {
    constructor(properties: Properties<ICancelPassportResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IListAuthTypeReq {
}
@protobuf.Type.d("mpff_user_passport_v1_ListAuthTypeReq")
export class ListAuthTypeReq extends protobuf.Message<IListAuthTypeReq> {
    constructor(properties: Properties<IListAuthTypeReq>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IListAuthTypeResp {
    baseTypeList?: ListAuthTypeResp_BaseType[]
    platformList?: PlatformType[]
}
@protobuf.Type.d("mpff_user_passport_v1_ListAuthTypeResp")
export class ListAuthTypeResp extends protobuf.Message<IListAuthTypeResp> {
    constructor(properties: Properties<IListAuthTypeResp>) {
        super(properties);
        if (properties) {
            if (properties.baseTypeList) { this.baseTypeList = []; properties.baseTypeList.forEach((value, index)=>{this.baseTypeList[index] = properties.baseTypeList[index]})}
            if (properties.platformList) { this.platformList = []; properties.platformList.forEach((value, index)=>{this.platformList[index] = properties.platformList[index]})}
        }
	}
    @protobuf.Field.d(1, ListAuthTypeResp_BaseType, "repeated", ListAuthTypeResp_BaseType.BaseTypeUnknown)
    public baseTypeList?: ListAuthTypeResp_BaseType[] = []
    @protobuf.Field.d(2, PlatformType, "repeated", PlatformType.Unknown)
    public platformList?: PlatformType[] = []
}
class $Passport extends RpcService {
    async LoginByToken(req: ILoginByTokenReq, params?: RpcParams) : Promise<{err:number, resp:ILoginByTokenResp}> {
        let data = LoginByTokenReq.create(req)
        this.onBeforeReq("LoginByToken", data, params)
        const buffer = LoginByTokenReq.encode(data).finish()
        let [err, pack] = await this.call("LoginByToken", buffer, params)
        if (err) {
            this.onBeforeResp("LoginByToken", err)
            return {err: err, resp: null}
        } else {
            let resp = LoginByTokenResp.decode(pack) as any
            this.onBeforeResp("LoginByToken", err, resp)
            return {err: null, resp: resp}
        }
    }
    async LoginByGuid(req: ILoginByGuidReq, params?: RpcParams) : Promise<{err:number, resp:ILoginByGuidResp}> {
        let data = LoginByGuidReq.create(req)
        this.onBeforeReq("LoginByGuid", data, params)
        const buffer = LoginByGuidReq.encode(data).finish()
        let [err, pack] = await this.call("LoginByGuid", buffer, params)
        if (err) {
            this.onBeforeResp("LoginByGuid", err)
            return {err: err, resp: null}
        } else {
            let resp = LoginByGuidResp.decode(pack) as any
            this.onBeforeResp("LoginByGuid", err, resp)
            return {err: null, resp: resp}
        }
    }
    async LoginByPhoneSms(req: ILoginByPhoneSmsReq, params?: RpcParams) : Promise<{err:number, resp:ILoginByPhoneSmsResp}> {
        let data = LoginByPhoneSmsReq.create(req)
        this.onBeforeReq("LoginByPhoneSms", data, params)
        const buffer = LoginByPhoneSmsReq.encode(data).finish()
        let [err, pack] = await this.call("LoginByPhoneSms", buffer, params)
        if (err) {
            this.onBeforeResp("LoginByPhoneSms", err)
            return {err: err, resp: null}
        } else {
            let resp = LoginByPhoneSmsResp.decode(pack) as any
            this.onBeforeResp("LoginByPhoneSms", err, resp)
            return {err: null, resp: resp}
        }
    }
    async LoginByPhonePwd(req: ILoginByPhonePwdReq, params?: RpcParams) : Promise<{err:number, resp:ILoginByPhonePwdResp}> {
        let data = LoginByPhonePwdReq.create(req)
        this.onBeforeReq("LoginByPhonePwd", data, params)
        const buffer = LoginByPhonePwdReq.encode(data).finish()
        let [err, pack] = await this.call("LoginByPhonePwd", buffer, params)
        if (err) {
            this.onBeforeResp("LoginByPhonePwd", err)
            return {err: err, resp: null}
        } else {
            let resp = LoginByPhonePwdResp.decode(pack) as any
            this.onBeforeResp("LoginByPhonePwd", err, resp)
            return {err: null, resp: resp}
        }
    }
    async LoginByEmailPwd(req: ILoginByEmailPwdReq, params?: RpcParams) : Promise<{err:number, resp:ILoginByEmailPwdResp}> {
        let data = LoginByEmailPwdReq.create(req)
        this.onBeforeReq("LoginByEmailPwd", data, params)
        const buffer = LoginByEmailPwdReq.encode(data).finish()
        let [err, pack] = await this.call("LoginByEmailPwd", buffer, params)
        if (err) {
            this.onBeforeResp("LoginByEmailPwd", err)
            return {err: err, resp: null}
        } else {
            let resp = LoginByEmailPwdResp.decode(pack) as any
            this.onBeforeResp("LoginByEmailPwd", err, resp)
            return {err: null, resp: resp}
        }
    }
    async LoginByPlatform(req: ILoginByPlatformReq, params?: RpcParams) : Promise<{err:number, resp:ILoginByPlatformResp}> {
        let data = LoginByPlatformReq.create(req)
        this.onBeforeReq("LoginByPlatform", data, params)
        const buffer = LoginByPlatformReq.encode(data).finish()
        let [err, pack] = await this.call("LoginByPlatform", buffer, params)
        if (err) {
            this.onBeforeResp("LoginByPlatform", err)
            return {err: err, resp: null}
        } else {
            let resp = LoginByPlatformResp.decode(pack) as any
            this.onBeforeResp("LoginByPlatform", err, resp)
            return {err: null, resp: resp}
        }
    }
    async LoginByOpIdentify(req: ILoginByOpIdentifyReq, params?: RpcParams) : Promise<{err:number, resp:ILoginByOpIdentifyResp}> {
        let data = LoginByOpIdentifyReq.create(req)
        this.onBeforeReq("LoginByOpIdentify", data, params)
        const buffer = LoginByOpIdentifyReq.encode(data).finish()
        let [err, pack] = await this.call("LoginByOpIdentify", buffer, params)
        if (err) {
            this.onBeforeResp("LoginByOpIdentify", err)
            return {err: err, resp: null}
        } else {
            let resp = LoginByOpIdentifyResp.decode(pack) as any
            this.onBeforeResp("LoginByOpIdentify", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SendSmsCaptcha(req: ISendSmsCaptchaReq, params?: RpcParams) : Promise<{err:number, resp:ISendSmsCaptchaResp}> {
        let data = SendSmsCaptchaReq.create(req)
        this.onBeforeReq("SendSmsCaptcha", data, params)
        const buffer = SendSmsCaptchaReq.encode(data).finish()
        let [err, pack] = await this.call("SendSmsCaptcha", buffer, params)
        if (err) {
            this.onBeforeResp("SendSmsCaptcha", err)
            return {err: err, resp: null}
        } else {
            let resp = SendSmsCaptchaResp.decode(pack) as any
            this.onBeforeResp("SendSmsCaptcha", err, resp)
            return {err: null, resp: resp}
        }
    }
    async VerifySmsCaptcha(req: IVerifySmsCaptchaReq, params?: RpcParams) : Promise<{err:number, resp:IVerifySmsCaptchaResp}> {
        let data = VerifySmsCaptchaReq.create(req)
        this.onBeforeReq("VerifySmsCaptcha", data, params)
        const buffer = VerifySmsCaptchaReq.encode(data).finish()
        let [err, pack] = await this.call("VerifySmsCaptcha", buffer, params)
        if (err) {
            this.onBeforeResp("VerifySmsCaptcha", err)
            return {err: err, resp: null}
        } else {
            let resp = VerifySmsCaptchaResp.decode(pack) as any
            this.onBeforeResp("VerifySmsCaptcha", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BindPhone(req: IBindPhoneReq, params?: RpcParams) : Promise<{err:number, resp:IBindPhoneResp}> {
        let data = BindPhoneReq.create(req)
        this.onBeforeReq("BindPhone", data, params)
        const buffer = BindPhoneReq.encode(data).finish()
        let [err, pack] = await this.call("BindPhone", buffer, params)
        if (err) {
            this.onBeforeResp("BindPhone", err)
            return {err: err, resp: null}
        } else {
            let resp = BindPhoneResp.decode(pack) as any
            this.onBeforeResp("BindPhone", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BindPlatform(req: IBindPlatformReq, params?: RpcParams) : Promise<{err:number, resp:IBindPlatformResp}> {
        let data = BindPlatformReq.create(req)
        this.onBeforeReq("BindPlatform", data, params)
        const buffer = BindPlatformReq.encode(data).finish()
        let [err, pack] = await this.call("BindPlatform", buffer, params)
        if (err) {
            this.onBeforeResp("BindPlatform", err)
            return {err: err, resp: null}
        } else {
            let resp = BindPlatformResp.decode(pack) as any
            this.onBeforeResp("BindPlatform", err, resp)
            return {err: null, resp: resp}
        }
    }
    async UnbindPlatform(req: IUnbindPlatformReq, params?: RpcParams) : Promise<{err:number, resp:IUnbindPlatformResp}> {
        let data = UnbindPlatformReq.create(req)
        this.onBeforeReq("UnbindPlatform", data, params)
        const buffer = UnbindPlatformReq.encode(data).finish()
        let [err, pack] = await this.call("UnbindPlatform", buffer, params)
        if (err) {
            this.onBeforeResp("UnbindPlatform", err)
            return {err: err, resp: null}
        } else {
            let resp = UnbindPlatformResp.decode(pack) as any
            this.onBeforeResp("UnbindPlatform", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ChangeBindPhone(req: IChangeBindPhoneReq, params?: RpcParams) : Promise<{err:number, resp:IChangeBindPhoneResp}> {
        let data = ChangeBindPhoneReq.create(req)
        this.onBeforeReq("ChangeBindPhone", data, params)
        const buffer = ChangeBindPhoneReq.encode(data).finish()
        let [err, pack] = await this.call("ChangeBindPhone", buffer, params)
        if (err) {
            this.onBeforeResp("ChangeBindPhone", err)
            return {err: err, resp: null}
        } else {
            let resp = ChangeBindPhoneResp.decode(pack) as any
            this.onBeforeResp("ChangeBindPhone", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SetPasswordBySms(req: ISetPasswordBySmsReq, params?: RpcParams) : Promise<{err:number, resp:ISetPasswordBySmsResp}> {
        let data = SetPasswordBySmsReq.create(req)
        this.onBeforeReq("SetPasswordBySms", data, params)
        const buffer = SetPasswordBySmsReq.encode(data).finish()
        let [err, pack] = await this.call("SetPasswordBySms", buffer, params)
        if (err) {
            this.onBeforeResp("SetPasswordBySms", err)
            return {err: err, resp: null}
        } else {
            let resp = SetPasswordBySmsResp.decode(pack) as any
            this.onBeforeResp("SetPasswordBySms", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ChangePassword(req: IChangePasswordReq, params?: RpcParams) : Promise<{err:number, resp:IChangePasswordResp}> {
        let data = ChangePasswordReq.create(req)
        this.onBeforeReq("ChangePassword", data, params)
        const buffer = ChangePasswordReq.encode(data).finish()
        let [err, pack] = await this.call("ChangePassword", buffer, params)
        if (err) {
            this.onBeforeResp("ChangePassword", err)
            return {err: err, resp: null}
        } else {
            let resp = ChangePasswordResp.decode(pack) as any
            this.onBeforeResp("ChangePassword", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetPassport(req: IGetPassportReq, params?: RpcParams) : Promise<{err:number, resp:IGetPassportResp}> {
        let data = GetPassportReq.create(req)
        this.onBeforeReq("GetPassport", data, params)
        const buffer = GetPassportReq.encode(data).finish()
        let [err, pack] = await this.call("GetPassport", buffer, params)
        if (err) {
            this.onBeforeResp("GetPassport", err)
            return {err: err, resp: null}
        } else {
            let resp = GetPassportResp.decode(pack) as any
            this.onBeforeResp("GetPassport", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListPassport(req: IListPassportReq, params?: RpcParams) : Promise<{err:number, resp:IListPassportResp}> {
        let data = ListPassportReq.create(req)
        this.onBeforeReq("ListPassport", data, params)
        const buffer = ListPassportReq.encode(data).finish()
        let [err, pack] = await this.call("ListPassport", buffer, params)
        if (err) {
            this.onBeforeResp("ListPassport", err)
            return {err: err, resp: null}
        } else {
            let resp = ListPassportResp.decode(pack) as any
            this.onBeforeResp("ListPassport", err, resp)
            return {err: null, resp: resp}
        }
    }
    async FindPassport(req: IFindPassportReq, params?: RpcParams) : Promise<{err:number, resp:IFindPassportResp}> {
        let data = FindPassportReq.create(req)
        this.onBeforeReq("FindPassport", data, params)
        const buffer = FindPassportReq.encode(data).finish()
        let [err, pack] = await this.call("FindPassport", buffer, params)
        if (err) {
            this.onBeforeResp("FindPassport", err)
            return {err: err, resp: null}
        } else {
            let resp = FindPassportResp.decode(pack) as any
            this.onBeforeResp("FindPassport", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListUserByPhone(req: IListUserByPhoneReq, params?: RpcParams) : Promise<{err:number, resp:IListUserByPhoneResp}> {
        let data = ListUserByPhoneReq.create(req)
        this.onBeforeReq("ListUserByPhone", data, params)
        const buffer = ListUserByPhoneReq.encode(data).finish()
        let [err, pack] = await this.call("ListUserByPhone", buffer, params)
        if (err) {
            this.onBeforeResp("ListUserByPhone", err)
            return {err: err, resp: null}
        } else {
            let resp = ListUserByPhoneResp.decode(pack) as any
            this.onBeforeResp("ListUserByPhone", err, resp)
            return {err: null, resp: resp}
        }
    }
    async CreateEmailAccount(req: ICreateEmailAccountReq, params?: RpcParams) : Promise<{err:number, resp:ICreateEmailAccountResp}> {
        let data = CreateEmailAccountReq.create(req)
        this.onBeforeReq("CreateEmailAccount", data, params)
        const buffer = CreateEmailAccountReq.encode(data).finish()
        let [err, pack] = await this.call("CreateEmailAccount", buffer, params)
        if (err) {
            this.onBeforeResp("CreateEmailAccount", err)
            return {err: err, resp: null}
        } else {
            let resp = CreateEmailAccountResp.decode(pack) as any
            this.onBeforeResp("CreateEmailAccount", err, resp)
            return {err: null, resp: resp}
        }
    }
    async VerifyIDCard(req: IVerifyIDCardReq, params?: RpcParams) : Promise<{err:number, resp:IVerifyIDCardResp}> {
        let data = VerifyIDCardReq.create(req)
        this.onBeforeReq("VerifyIDCard", data, params)
        const buffer = VerifyIDCardReq.encode(data).finish()
        let [err, pack] = await this.call("VerifyIDCard", buffer, params)
        if (err) {
            this.onBeforeResp("VerifyIDCard", err)
            return {err: err, resp: null}
        } else {
            let resp = VerifyIDCardResp.decode(pack) as any
            this.onBeforeResp("VerifyIDCard", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetIDCard(req: IGetIDCardReq, params?: RpcParams) : Promise<{err:number, resp:IGeIDCardResp}> {
        let data = GetIDCardReq.create(req)
        this.onBeforeReq("GetIDCard", data, params)
        const buffer = GetIDCardReq.encode(data).finish()
        let [err, pack] = await this.call("GetIDCard", buffer, params)
        if (err) {
            this.onBeforeResp("GetIDCard", err)
            return {err: err, resp: null}
        } else {
            let resp = GeIDCardResp.decode(pack) as any
            this.onBeforeResp("GetIDCard", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListAuthType(req: IListAuthTypeReq, params?: RpcParams) : Promise<{err:number, resp:IListAuthTypeResp}> {
        let data = ListAuthTypeReq.create(req)
        this.onBeforeReq("ListAuthType", data, params)
        const buffer = ListAuthTypeReq.encode(data).finish()
        let [err, pack] = await this.call("ListAuthType", buffer, params)
        if (err) {
            this.onBeforeResp("ListAuthType", err)
            return {err: err, resp: null}
        } else {
            let resp = ListAuthTypeResp.decode(pack) as any
            this.onBeforeResp("ListAuthType", err, resp)
            return {err: null, resp: resp}
        }
    }
}
export const Passport = new $Passport({
    name: "mpff.user.passport.v1",
})
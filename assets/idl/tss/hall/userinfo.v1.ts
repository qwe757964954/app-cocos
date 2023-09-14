import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  Void as base_Void,IVoid as base_IVoid ,  FieldMask as base_FieldMask,IFieldMask as base_IFieldMask ,  } from "idl/base/base"
import {  CallbackNotifyAppUserCancelReq as mp_user_callback_account_v1_CallbackNotifyAppUserCancelReq,ICallbackNotifyAppUserCancelReq as mp_user_callback_account_v1_ICallbackNotifyAppUserCancelReq ,  CallbackNotifyAppUserCancelResp as mp_user_callback_account_v1_CallbackNotifyAppUserCancelResp,ICallbackNotifyAppUserCancelResp as mp_user_callback_account_v1_ICallbackNotifyAppUserCancelResp ,  } from "idl/mp/user/callback/account.v1"
import {  CallbackAfterIDCardChangeReq as mpff_user_callback_passport_v1_CallbackAfterIDCardChangeReq,ICallbackAfterIDCardChangeReq as mpff_user_callback_passport_v1_ICallbackAfterIDCardChangeReq ,  CallbackAfterIDCardChangeResp as mpff_user_callback_passport_v1_CallbackAfterIDCardChangeResp,ICallbackAfterIDCardChangeResp as mpff_user_callback_passport_v1_ICallbackAfterIDCardChangeResp ,  CallbackAfterBindPhoneReq as mpff_user_callback_passport_v1_CallbackAfterBindPhoneReq,ICallbackAfterBindPhoneReq as mpff_user_callback_passport_v1_ICallbackAfterBindPhoneReq ,  CallbackAfterBindPhoneResp as mpff_user_callback_passport_v1_CallbackAfterBindPhoneResp,ICallbackAfterBindPhoneResp as mpff_user_callback_passport_v1_ICallbackAfterBindPhoneResp ,  } from "idl/mpff/user/callback/passport.v1"
import {  Gender as tss_common_Gender ,  } from "idl/tss/common/common_define"
export enum Code {  
    CodeOK = 0,  
    CodeNicknameDuplicate = 3001,  
    CodeNicknameChanceLimit = 3002,  
    CodeNicknameInvalid = 3003,  
    CodeNicknameLenInvalid = 3004,  
    CodeIdCardInfoNotMatchUser = 4001,  
    CodeDeactivated = 4002,  
    CodeDeactivatedTimesLimit = 4003,
}
export enum RoleType {  
    RoleTypeRegular = 0,  
    RoleTypeRobot = 1,
}
export enum NoviceStatus {  
    NoviceStatusNone = 0,  
    NoviceStatusNovice = 1,
}
export enum IdCardStatus {  
    IdCardUnAuth = 0,  
    IdCardAuthing = 1,  
    IdCardAuthSuccess = 2,  
    IdCardAuthFail = 3,
}
export enum GenderFilter {  
    GenderFilterAll = 0,  
    GenderFilterUnknow = 1,  
    GenderFilterMale = 2,  
    GenderFilterFemale = 3,
}
export enum IdCardStatusFilter {  
    IdCardStatusFilterAll = 0,  
    IdCardStatusFilterUnAuth = 1,  
    IdCardStatusFilterAuthing = 2,  
    IdCardStatusFilterSuccess = 3,  
    IdCardStatusFilterFail = 4,  
    IdCardStatusFilterAuthingAndSuc = 5,  
    IdCardStatusFilterUnAuthAnFail = 6,
}
export enum RoleTypeFilter {  
    RoleTypeFilterAll = 0,  
    RoleTypeFilterRegular = 1,  
    RoleTypeFilterRobot = 2,
}
export enum IdCardVerifyResult {  
    IdCardVerifyResultOK = 0,  
    IdCardVerifyResultFail = 2001,  
    IdCardVerifyResultNotMatch = 2002,  
    IdCardVerifyResultInvalid = 2003,  
    IdCardVerifyResultRetryLimit = 2005,  
    IdCardVerifyResultBindAccountLimit = 2006,
}
export enum UserUpdateResult {  
    UserUpdateResultOK = 0,  
    UserUpdateResultNicknameDuplicate = 3001,  
    UserUpdateResultNicknameChanceLimit = 3002,  
    UserUpdateResultNicknameInvalid = 3003,  
    UserUpdateResultNicknameLenInvalid = 3004,  
    UserUpdateResultNicknameDisableUpdate = 3005,
}
export enum BanReason {  
    BanReasonOther = 0,  
    BanReasonCardCheat = 1,  
    BanReasonMatchCheat = 2,  
    BanReasonIllegalDealDiamond = 3,  
    BanReasonViolateNameAvatar = 4,  
    BanReasonAccountHacked = 5,  
    BanReasonViolateContent = 6,
}
export enum UnbanReason {  
    UnbanReasonOther = 0,  
    UnbanReasonMistake = 1,  
    UnbanReasonWarned = 2,
}
export enum BanStatus {  
    BanStatusUnknown = 0,  
    BanStatusBan = 1,  
    BanStatusUnBan = 2,
}
export enum DeactivateStatus {  
    DeactivateStatusNone = 0,  
    DeactivateStatusFinished = 1,
}
export enum MuteReason {  
    MuteReasonOther = 0,  
    MuteReasonPolitical = 1,  
    MuteReasonPornOrAd = 2,  
    MuteReasonInsult = 3,
}
export enum UnmuteReason {  
    UnmuteReasonOther = 0,  
    UnmuteReasonMistake = 1,  
    UnmuteReasonWarned = 2,
}
export enum MuteStatus {  
    MuteStatusUnknown = 0,  
    MuteStatusMute = 1,  
    MuteStatusUnMute = 2,
}
export enum NicknameItemType {  
    NicknameItemTypeUnknown = 0,  
    NicknameItemTypeFamilyName = 1,  
    NicknameItemTypeGivenName = 2,
}
export interface IUser {
    uid?: number|null
    nickname?: string|null
    gender?: tss_common_Gender|null
    birthday?: number|null
    avatar?: string|null
    coverPic?: string|null
    cityCode?: number|null
    roleType?: RoleType|null
    noviceStatus?: NoviceStatus|null
    bannedUntil?: number|null
    createAt?: number|null
    updateAt?: number|null
    deactivateAt?: number|null
    noviceExpireAt?: number|null
    mutedUntil?: number|null
    applicationId?: string|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_User")
export class User extends protobuf.Message<IUser> {
    constructor(properties: Properties<IUser>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.nickname) { this.nickname = properties.nickname }
            if (properties.gender) { this.gender = properties.gender }
            if (properties.birthday) { this.birthday = properties.birthday }
            if (properties.avatar) { this.avatar = properties.avatar }
            if (properties.coverPic) { this.coverPic = properties.coverPic }
            if (properties.cityCode) { this.cityCode = properties.cityCode }
            if (properties.roleType) { this.roleType = properties.roleType }
            if (properties.noviceStatus) { this.noviceStatus = properties.noviceStatus }
            if (properties.bannedUntil) { this.bannedUntil = properties.bannedUntil }
            if (properties.createAt) { this.createAt = properties.createAt }
            if (properties.updateAt) { this.updateAt = properties.updateAt }
            if (properties.deactivateAt) { this.deactivateAt = properties.deactivateAt }
            if (properties.noviceExpireAt) { this.noviceExpireAt = properties.noviceExpireAt }
            if (properties.mutedUntil) { this.mutedUntil = properties.mutedUntil }
            if (properties.applicationId) { this.applicationId = properties.applicationId }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public nickname?: string|null = ""
    @protobuf.Field.d(4, tss_common_Gender, "optional", tss_common_Gender.GenderUnknown)
    public gender?: tss_common_Gender|null = tss_common_Gender.GenderUnknown
    @protobuf.Field.d(5, "int64", "optional", 0)
    public birthday?: number|null = 0
    @protobuf.Field.d(6, "string", "optional", )
    public avatar?: string|null = ""
    @protobuf.Field.d(7, "string", "optional", )
    public coverPic?: string|null = ""
    @protobuf.Field.d(8, "int32", "optional", 0)
    public cityCode?: number|null = 0
    @protobuf.Field.d(9, RoleType, "optional", RoleType.RoleTypeRegular)
    public roleType?: RoleType|null = RoleType.RoleTypeRegular
    @protobuf.Field.d(11, NoviceStatus, "optional", NoviceStatus.NoviceStatusNone)
    public noviceStatus?: NoviceStatus|null = NoviceStatus.NoviceStatusNone
    @protobuf.Field.d(13, "int64", "optional", 0)
    public bannedUntil?: number|null = 0
    @protobuf.Field.d(14, "int64", "optional", 0)
    public createAt?: number|null = 0
    @protobuf.Field.d(15, "int64", "optional", 0)
    public updateAt?: number|null = 0
    @protobuf.Field.d(16, "int64", "optional", 0)
    public deactivateAt?: number|null = 0
    @protobuf.Field.d(17, "int64", "optional", 0)
    public noviceExpireAt?: number|null = 0
    @protobuf.Field.d(18, "int64", "optional", 0)
    public mutedUntil?: number|null = 0
    @protobuf.Field.d(19, "string", "optional", )
    public applicationId?: string|null = ""
}
export interface IIdCardInfo {
    uid?: number|null
    idNo?: string|null
    name?: string|null
    status?: IdCardStatus|null
    pi?: string|null
    gender?: tss_common_Gender|null
    birthday?: number|null
    updateAt?: number|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_IdCardInfo")
export class IdCardInfo extends protobuf.Message<IIdCardInfo> {
    constructor(properties: Properties<IIdCardInfo>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.idNo) { this.idNo = properties.idNo }
            if (properties.name) { this.name = properties.name }
            if (properties.status) { this.status = properties.status }
            if (properties.pi) { this.pi = properties.pi }
            if (properties.gender) { this.gender = properties.gender }
            if (properties.birthday) { this.birthday = properties.birthday }
            if (properties.updateAt) { this.updateAt = properties.updateAt }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public idNo?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(4, IdCardStatus, "optional", IdCardStatus.IdCardUnAuth)
    public status?: IdCardStatus|null = IdCardStatus.IdCardUnAuth
    @protobuf.Field.d(5, "string", "optional", )
    public pi?: string|null = ""
    @protobuf.Field.d(6, tss_common_Gender, "optional", tss_common_Gender.GenderUnknown)
    public gender?: tss_common_Gender|null = tss_common_Gender.GenderUnknown
    @protobuf.Field.d(7, "int64", "optional", 0)
    public birthday?: number|null = 0
    @protobuf.Field.d(15, "int64", "optional", 0)
    public updateAt?: number|null = 0
}
export interface IPageReq {
    index?: number|null
    size?: number|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_PageReq")
export class PageReq extends protobuf.Message<IPageReq> {
    constructor(properties: Properties<IPageReq>) {
        super(properties);
        if (properties) {
            if (properties.index) { this.index = properties.index }
            if (properties.size) { this.size = properties.size }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public index?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public size?: number|null = 0
}
export interface IPageResp {
    index?: number|null
    total?: number|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_PageResp")
export class PageResp extends protobuf.Message<IPageResp> {
    constructor(properties: Properties<IPageResp>) {
        super(properties);
        if (properties) {
            if (properties.index) { this.index = properties.index }
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public index?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public total?: number|null = 0
}
export interface IRegistryExtInfo {
    guid?: string|null
    deviceMode?: string|null
    clientTime?: number|null
    clientVersion?: string|null
    latitude?: number|null
    longitude?: number|null
    language?: string|null
    os?: string|null
    channel?: string|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_RegistryExtInfo")
export class RegistryExtInfo extends protobuf.Message<IRegistryExtInfo> {
    constructor(properties: Properties<IRegistryExtInfo>) {
        super(properties);
        if (properties) {
            if (properties.guid) { this.guid = properties.guid }
            if (properties.deviceMode) { this.deviceMode = properties.deviceMode }
            if (properties.clientTime) { this.clientTime = properties.clientTime }
            if (properties.clientVersion) { this.clientVersion = properties.clientVersion }
            if (properties.latitude) { this.latitude = properties.latitude }
            if (properties.longitude) { this.longitude = properties.longitude }
            if (properties.language) { this.language = properties.language }
            if (properties.os) { this.os = properties.os }
            if (properties.channel) { this.channel = properties.channel }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public guid?: string|null = ""
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
}
export interface ICreateUserReq {
    user?: IUser
    extInfo?: IRegistryExtInfo
}
@protobuf.Type.d("tss_hall_userinfo_v1_CreateUserReq")
export class CreateUserReq extends protobuf.Message<ICreateUserReq> {
    constructor(properties: Properties<ICreateUserReq>) {
        super(properties);
        if (properties) {
            if (properties.user) { this.user = User.create(properties.user) as any }
            if (properties.extInfo) { this.extInfo = RegistryExtInfo.create(properties.extInfo) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_userinfo_v1_User", "optional")
    public user?: User|null
    @protobuf.Field.d(2, "tss_hall_userinfo_v1_RegistryExtInfo", "optional")
    public extInfo?: RegistryExtInfo|null
}
export interface ICreateUserResp {
    user?: IUser
}
@protobuf.Type.d("tss_hall_userinfo_v1_CreateUserResp")
export class CreateUserResp extends protobuf.Message<ICreateUserResp> {
    constructor(properties: Properties<ICreateUserResp>) {
        super(properties);
        if (properties) {
            if (properties.user) { this.user = User.create(properties.user) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_userinfo_v1_User", "optional")
    public user?: User|null
}
export interface IGetOrCreateUserReq {
    user?: IUser
    extInfo?: IRegistryExtInfo
}
@protobuf.Type.d("tss_hall_userinfo_v1_GetOrCreateUserReq")
export class GetOrCreateUserReq extends protobuf.Message<IGetOrCreateUserReq> {
    constructor(properties: Properties<IGetOrCreateUserReq>) {
        super(properties);
        if (properties) {
            if (properties.user) { this.user = User.create(properties.user) as any }
            if (properties.extInfo) { this.extInfo = RegistryExtInfo.create(properties.extInfo) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_userinfo_v1_User", "optional")
    public user?: User|null
    @protobuf.Field.d(2, "tss_hall_userinfo_v1_RegistryExtInfo", "optional")
    public extInfo?: RegistryExtInfo|null
}
export interface IGetOrCreateUserResp {
    user?: IUser
    isNew?: boolean|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_GetOrCreateUserResp")
export class GetOrCreateUserResp extends protobuf.Message<IGetOrCreateUserResp> {
    constructor(properties: Properties<IGetOrCreateUserResp>) {
        super(properties);
        if (properties) {
            if (properties.user) { this.user = User.create(properties.user) as any }
            if (properties.isNew) { this.isNew = properties.isNew }
        }
	}
    @protobuf.Field.d(1, "tss_hall_userinfo_v1_User", "optional")
    public user?: User|null
    @protobuf.Field.d(2, "bool", "optional", false)
    public isNew?: boolean|null = false
}
export interface IGetUserReq {
    uid?: number|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_GetUserReq")
export class GetUserReq extends protobuf.Message<IGetUserReq> {
    constructor(properties: Properties<IGetUserReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IGetUserResp {
    user?: IUser
}
@protobuf.Type.d("tss_hall_userinfo_v1_GetUserResp")
export class GetUserResp extends protobuf.Message<IGetUserResp> {
    constructor(properties: Properties<IGetUserResp>) {
        super(properties);
        if (properties) {
            if (properties.user) { this.user = User.create(properties.user) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_userinfo_v1_User", "optional")
    public user?: User|null
}
export interface IBatchGetUserReq {
    uids?: number[]
}
@protobuf.Type.d("tss_hall_userinfo_v1_BatchGetUserReq")
export class BatchGetUserReq extends protobuf.Message<IBatchGetUserReq> {
    constructor(properties: Properties<IBatchGetUserReq>) {
        super(properties);
        if (properties) {
            if (properties.uids) { this.uids = []; properties.uids.forEach((value, index)=>{this.uids[index] = properties.uids[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public uids?: number[] = []
}
export interface IBatchGetUserResp {
    users?: IUser[]
}
@protobuf.Type.d("tss_hall_userinfo_v1_BatchGetUserResp")
export class BatchGetUserResp extends protobuf.Message<IBatchGetUserResp> {
    constructor(properties: Properties<IBatchGetUserResp>) {
        super(properties);
        if (properties) {
            if (properties.users) { this.users = []; properties.users.forEach((value, index)=>{this.users[index] = User.create(properties.users[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_userinfo_v1_User", "repeated")
    public users?: User[] = []
}
export interface ISearchUsersReq {
    page?: IPageReq
    nickname?: string|null
    gender?: GenderFilter|null
    idCardStatus?: IdCardStatusFilter|null
    roleType?: RoleTypeFilter|null
    uid?: number|null
    phoneNumber?: number|null
    createAfter?: number|null
    createBefore?: number|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_SearchUsersReq")
export class SearchUsersReq extends protobuf.Message<ISearchUsersReq> {
    constructor(properties: Properties<ISearchUsersReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = PageReq.create(properties.page) as any }
            if (properties.nickname) { this.nickname = properties.nickname }
            if (properties.gender) { this.gender = properties.gender }
            if (properties.idCardStatus) { this.idCardStatus = properties.idCardStatus }
            if (properties.roleType) { this.roleType = properties.roleType }
            if (properties.uid) { this.uid = properties.uid }
            if (properties.phoneNumber) { this.phoneNumber = properties.phoneNumber }
            if (properties.createAfter) { this.createAfter = properties.createAfter }
            if (properties.createBefore) { this.createBefore = properties.createBefore }
        }
	}
    @protobuf.Field.d(1, "tss_hall_userinfo_v1_PageReq", "optional")
    public page?: PageReq|null
    @protobuf.Field.d(2, "string", "optional", )
    public nickname?: string|null = ""
    @protobuf.Field.d(3, GenderFilter, "optional", GenderFilter.GenderFilterAll)
    public gender?: GenderFilter|null = GenderFilter.GenderFilterAll
    @protobuf.Field.d(4, IdCardStatusFilter, "optional", IdCardStatusFilter.IdCardStatusFilterAll)
    public idCardStatus?: IdCardStatusFilter|null = IdCardStatusFilter.IdCardStatusFilterAll
    @protobuf.Field.d(5, RoleTypeFilter, "optional", RoleTypeFilter.RoleTypeFilterAll)
    public roleType?: RoleTypeFilter|null = RoleTypeFilter.RoleTypeFilterAll
    @protobuf.Field.d(6, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(7, "int64", "optional", 0)
    public phoneNumber?: number|null = 0
    @protobuf.Field.d(14, "int64", "optional", 0)
    public createAfter?: number|null = 0
    @protobuf.Field.d(15, "int64", "optional", 0)
    public createBefore?: number|null = 0
}
export interface ISearchUsersResp {
    page?: IPageResp
    users?: IUser[]
}
@protobuf.Type.d("tss_hall_userinfo_v1_SearchUsersResp")
export class SearchUsersResp extends protobuf.Message<ISearchUsersResp> {
    constructor(properties: Properties<ISearchUsersResp>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = PageResp.create(properties.page) as any }
            if (properties.users) { this.users = []; properties.users.forEach((value, index)=>{this.users[index] = User.create(properties.users[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_userinfo_v1_PageResp", "optional")
    public page?: PageResp|null
    @protobuf.Field.d(2, "tss_hall_userinfo_v1_User", "repeated")
    public users?: User[] = []
}
export interface IFuzzySearchUsersReq {
    page?: IPageReq
    keyword?: string|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_FuzzySearchUsersReq")
export class FuzzySearchUsersReq extends protobuf.Message<IFuzzySearchUsersReq> {
    constructor(properties: Properties<IFuzzySearchUsersReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = PageReq.create(properties.page) as any }
            if (properties.keyword) { this.keyword = properties.keyword }
        }
	}
    @protobuf.Field.d(1, "tss_hall_userinfo_v1_PageReq", "optional")
    public page?: PageReq|null
    @protobuf.Field.d(2, "string", "optional", )
    public keyword?: string|null = ""
}
export interface IFuzzySearchUsersResp {
    users?: IUser[]
}
@protobuf.Type.d("tss_hall_userinfo_v1_FuzzySearchUsersResp")
export class FuzzySearchUsersResp extends protobuf.Message<IFuzzySearchUsersResp> {
    constructor(properties: Properties<IFuzzySearchUsersResp>) {
        super(properties);
        if (properties) {
            if (properties.users) { this.users = []; properties.users.forEach((value, index)=>{this.users[index] = User.create(properties.users[index]) as any})}
        }
	}
    @protobuf.Field.d(2, "tss_hall_userinfo_v1_User", "repeated")
    public users?: User[] = []
}
export interface IVerifyIdCardReq {
    name?: string|null
    idNo?: string|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_VerifyIdCardReq")
export class VerifyIdCardReq extends protobuf.Message<IVerifyIdCardReq> {
    constructor(properties: Properties<IVerifyIdCardReq>) {
        super(properties);
        if (properties) {
            if (properties.name) { this.name = properties.name }
            if (properties.idNo) { this.idNo = properties.idNo }
        }
	}
    @protobuf.Field.d(2, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public idNo?: string|null = ""
}
export interface IVerifyIdCardResp {
    code?: IdCardVerifyResult|null
    status?: IdCardStatus|null
    retryLeft?: number|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_VerifyIdCardResp")
export class VerifyIdCardResp extends protobuf.Message<IVerifyIdCardResp> {
    constructor(properties: Properties<IVerifyIdCardResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.status) { this.status = properties.status }
            if (properties.retryLeft) { this.retryLeft = properties.retryLeft }
        }
	}
    @protobuf.Field.d(1, IdCardVerifyResult, "optional", IdCardVerifyResult.IdCardVerifyResultOK)
    public code?: IdCardVerifyResult|null = IdCardVerifyResult.IdCardVerifyResultOK
    @protobuf.Field.d(2, IdCardStatus, "optional", IdCardStatus.IdCardUnAuth)
    public status?: IdCardStatus|null = IdCardStatus.IdCardUnAuth
    @protobuf.Field.d(3, "int32", "optional", 0)
    public retryLeft?: number|null = 0
}
export interface IGetUserIdCardInfoReq {
    uid?: number|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_GetUserIdCardInfoReq")
export class GetUserIdCardInfoReq extends protobuf.Message<IGetUserIdCardInfoReq> {
    constructor(properties: Properties<IGetUserIdCardInfoReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IGetUserIdCardInfoResp {
    info?: IIdCardInfo
}
@protobuf.Type.d("tss_hall_userinfo_v1_GetUserIdCardInfoResp")
export class GetUserIdCardInfoResp extends protobuf.Message<IGetUserIdCardInfoResp> {
    constructor(properties: Properties<IGetUserIdCardInfoResp>) {
        super(properties);
        if (properties) {
            if (properties.info) { this.info = IdCardInfo.create(properties.info) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_userinfo_v1_IdCardInfo", "optional")
    public info?: IdCardInfo|null
}
export interface IGetUserIdCardInfosByIdNoReq {
    idNo?: string|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_GetUserIdCardInfosByIdNoReq")
export class GetUserIdCardInfosByIdNoReq extends protobuf.Message<IGetUserIdCardInfosByIdNoReq> {
    constructor(properties: Properties<IGetUserIdCardInfosByIdNoReq>) {
        super(properties);
        if (properties) {
            if (properties.idNo) { this.idNo = properties.idNo }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public idNo?: string|null = ""
}
export interface IGetUserIdCardInfosByIdNoResp {
    infos?: IIdCardInfo[]
}
@protobuf.Type.d("tss_hall_userinfo_v1_GetUserIdCardInfosByIdNoResp")
export class GetUserIdCardInfosByIdNoResp extends protobuf.Message<IGetUserIdCardInfosByIdNoResp> {
    constructor(properties: Properties<IGetUserIdCardInfosByIdNoResp>) {
        super(properties);
        if (properties) {
            if (properties.infos) { this.infos = []; properties.infos.forEach((value, index)=>{this.infos[index] = IdCardInfo.create(properties.infos[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_userinfo_v1_IdCardInfo", "repeated")
    public infos?: IdCardInfo[] = []
}
export interface IRemoveUserIdCardInfoReq {
    uid?: number|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_RemoveUserIdCardInfoReq")
export class RemoveUserIdCardInfoReq extends protobuf.Message<IRemoveUserIdCardInfoReq> {
    constructor(properties: Properties<IRemoveUserIdCardInfoReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IRemoveUserIdCardInfoResp {
}
@protobuf.Type.d("tss_hall_userinfo_v1_RemoveUserIdCardInfoResp")
export class RemoveUserIdCardInfoResp extends protobuf.Message<IRemoveUserIdCardInfoResp> {
    constructor(properties: Properties<IRemoveUserIdCardInfoResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IRemoveUserIdCardRetryLimitReq {
    uid?: number|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_RemoveUserIdCardRetryLimitReq")
export class RemoveUserIdCardRetryLimitReq extends protobuf.Message<IRemoveUserIdCardRetryLimitReq> {
    constructor(properties: Properties<IRemoveUserIdCardRetryLimitReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IRemoveUserIdCardRetryLimitResp {
}
@protobuf.Type.d("tss_hall_userinfo_v1_RemoveUserIdCardRetryLimitResp")
export class RemoveUserIdCardRetryLimitResp extends protobuf.Message<IRemoveUserIdCardRetryLimitResp> {
    constructor(properties: Properties<IRemoveUserIdCardRetryLimitResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IUpdateUserReq {
    user?: IUser
    fieldMask?: base_IFieldMask
}
@protobuf.Type.d("tss_hall_userinfo_v1_UpdateUserReq")
export class UpdateUserReq extends protobuf.Message<IUpdateUserReq> {
    constructor(properties: Properties<IUpdateUserReq>) {
        super(properties);
        if (properties) {
            if (properties.user) { this.user = User.create(properties.user) as any }
            if (properties.fieldMask) { this.fieldMask = base_FieldMask.create(properties.fieldMask) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_userinfo_v1_User", "optional")
    public user?: User|null
    @protobuf.Field.d(2, "base_FieldMask", "optional")
    public fieldMask?: base_FieldMask|null
}
export interface IUpdateUserResp {
    code?: UserUpdateResult|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_UpdateUserResp")
export class UpdateUserResp extends protobuf.Message<IUpdateUserResp> {
    constructor(properties: Properties<IUpdateUserResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
        }
	}
    @protobuf.Field.d(1, UserUpdateResult, "optional", UserUpdateResult.UserUpdateResultOK)
    public code?: UserUpdateResult|null = UserUpdateResult.UserUpdateResultOK
}
export interface IUpdateUserBySelfReq {
    user?: IUser
    fieldMask?: base_IFieldMask
}
@protobuf.Type.d("tss_hall_userinfo_v1_UpdateUserBySelfReq")
export class UpdateUserBySelfReq extends protobuf.Message<IUpdateUserBySelfReq> {
    constructor(properties: Properties<IUpdateUserBySelfReq>) {
        super(properties);
        if (properties) {
            if (properties.user) { this.user = User.create(properties.user) as any }
            if (properties.fieldMask) { this.fieldMask = base_FieldMask.create(properties.fieldMask) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_userinfo_v1_User", "optional")
    public user?: User|null
    @protobuf.Field.d(2, "base_FieldMask", "optional")
    public fieldMask?: base_FieldMask|null
}
export interface IUpdateUserBySelfResp {
    code?: UserUpdateResult|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_UpdateUserBySelfResp")
export class UpdateUserBySelfResp extends protobuf.Message<IUpdateUserBySelfResp> {
    constructor(properties: Properties<IUpdateUserBySelfResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
        }
	}
    @protobuf.Field.d(1, UserUpdateResult, "optional", UserUpdateResult.UserUpdateResultOK)
    public code?: UserUpdateResult|null = UserUpdateResult.UserUpdateResultOK
}
export interface IGetNicknameUpdatePermissionReq {
}
@protobuf.Type.d("tss_hall_userinfo_v1_GetNicknameUpdatePermissionReq")
export class GetNicknameUpdatePermissionReq extends protobuf.Message<IGetNicknameUpdatePermissionReq> {
    constructor(properties: Properties<IGetNicknameUpdatePermissionReq>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IGetNicknameUpdatePermissionResp {
    freeUpdateNickname?: boolean|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_GetNicknameUpdatePermissionResp")
export class GetNicknameUpdatePermissionResp extends protobuf.Message<IGetNicknameUpdatePermissionResp> {
    constructor(properties: Properties<IGetNicknameUpdatePermissionResp>) {
        super(properties);
        if (properties) {
            if (properties.freeUpdateNickname) { this.freeUpdateNickname = properties.freeUpdateNickname }
        }
	}
    @protobuf.Field.d(1, "bool", "optional", false)
    public freeUpdateNickname?: boolean|null = false
}
export interface IGetRandUidReq {
    num?: number|null
    roleType?: RoleTypeFilter|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_GetRandUidReq")
export class GetRandUidReq extends protobuf.Message<IGetRandUidReq> {
    constructor(properties: Properties<IGetRandUidReq>) {
        super(properties);
        if (properties) {
            if (properties.num) { this.num = properties.num }
            if (properties.roleType) { this.roleType = properties.roleType }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public num?: number|null = 0
    @protobuf.Field.d(2, RoleTypeFilter, "optional", RoleTypeFilter.RoleTypeFilterAll)
    public roleType?: RoleTypeFilter|null = RoleTypeFilter.RoleTypeFilterAll
}
export interface IGetRandUidResp {
    uids?: number[]
}
@protobuf.Type.d("tss_hall_userinfo_v1_GetRandUidResp")
export class GetRandUidResp extends protobuf.Message<IGetRandUidResp> {
    constructor(properties: Properties<IGetRandUidResp>) {
        super(properties);
        if (properties) {
            if (properties.uids) { this.uids = []; properties.uids.forEach((value, index)=>{this.uids[index] = properties.uids[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public uids?: number[] = []
}
export interface ICountUserReq {
}
@protobuf.Type.d("tss_hall_userinfo_v1_CountUserReq")
export class CountUserReq extends protobuf.Message<ICountUserReq> {
    constructor(properties: Properties<ICountUserReq>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface ICountUserResp {
    count?: number|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_CountUserResp")
export class CountUserResp extends protobuf.Message<ICountUserResp> {
    constructor(properties: Properties<ICountUserResp>) {
        super(properties);
        if (properties) {
            if (properties.count) { this.count = properties.count }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public count?: number|null = 0
}
export interface IUploadCustomAvatarReq {
    customAvatarURL?: string|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_UploadCustomAvatarReq")
export class UploadCustomAvatarReq extends protobuf.Message<IUploadCustomAvatarReq> {
    constructor(properties: Properties<IUploadCustomAvatarReq>) {
        super(properties);
        if (properties) {
            if (properties.customAvatarURL) { this.customAvatarURL = properties.customAvatarURL }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public customAvatarURL?: string|null = ""
}
export interface IUploadCustomAvatarResp {
}
@protobuf.Type.d("tss_hall_userinfo_v1_UploadCustomAvatarResp")
export class UploadCustomAvatarResp extends protobuf.Message<IUploadCustomAvatarResp> {
    constructor(properties: Properties<IUploadCustomAvatarResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IGetCustomAvatarReq {
}
@protobuf.Type.d("tss_hall_userinfo_v1_GetCustomAvatarReq")
export class GetCustomAvatarReq extends protobuf.Message<IGetCustomAvatarReq> {
    constructor(properties: Properties<IGetCustomAvatarReq>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IGetCustomAvatarResp {
    customAvatarURL?: string|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_GetCustomAvatarResp")
export class GetCustomAvatarResp extends protobuf.Message<IGetCustomAvatarResp> {
    constructor(properties: Properties<IGetCustomAvatarResp>) {
        super(properties);
        if (properties) {
            if (properties.customAvatarURL) { this.customAvatarURL = properties.customAvatarURL }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public customAvatarURL?: string|null = ""
}
export interface IBanUserMail {
    title?: string|null
    content?: string|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_BanUserMail")
export class BanUserMail extends protobuf.Message<IBanUserMail> {
    constructor(properties: Properties<IBanUserMail>) {
        super(properties);
        if (properties) {
            if (properties.title) { this.title = properties.title }
            if (properties.content) { this.content = properties.content }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public title?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public content?: string|null = ""
}
export interface IBanUserReq {
    uids?: number[]
    reason?: BanReason|null
    banTimeSec?: number|null
    description?: string|null
    evidenceURLs?: string[]
    manipulator?: string|null
    forceOffline?: boolean|null
    mail?: IBanUserMail
}
@protobuf.Type.d("tss_hall_userinfo_v1_BanUserReq")
export class BanUserReq extends protobuf.Message<IBanUserReq> {
    constructor(properties: Properties<IBanUserReq>) {
        super(properties);
        if (properties) {
            if (properties.uids) { this.uids = []; properties.uids.forEach((value, index)=>{this.uids[index] = properties.uids[index]})}
            if (properties.reason) { this.reason = properties.reason }
            if (properties.banTimeSec) { this.banTimeSec = properties.banTimeSec }
            if (properties.description) { this.description = properties.description }
            if (properties.evidenceURLs) { this.evidenceURLs = []; properties.evidenceURLs.forEach((value, index)=>{this.evidenceURLs[index] = properties.evidenceURLs[index]})}
            if (properties.manipulator) { this.manipulator = properties.manipulator }
            if (properties.forceOffline) { this.forceOffline = properties.forceOffline }
            if (properties.mail) { this.mail = BanUserMail.create(properties.mail) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public uids?: number[] = []
    @protobuf.Field.d(2, BanReason, "optional", BanReason.BanReasonOther)
    public reason?: BanReason|null = BanReason.BanReasonOther
    @protobuf.Field.d(3, "int64", "optional", 0)
    public banTimeSec?: number|null = 0
    @protobuf.Field.d(5, "string", "optional", )
    public description?: string|null = ""
    @protobuf.Field.d(6, "string", "repeated", [])
    public evidenceURLs?: string[] = []
    @protobuf.Field.d(7, "string", "optional", )
    public manipulator?: string|null = ""
    @protobuf.Field.d(8, "bool", "optional", false)
    public forceOffline?: boolean|null = false
    @protobuf.Field.d(9, "tss_hall_userinfo_v1_BanUserMail", "optional")
    public mail?: BanUserMail|null
}
export interface IBanUserResp {
}
@protobuf.Type.d("tss_hall_userinfo_v1_BanUserResp")
export class BanUserResp extends protobuf.Message<IBanUserResp> {
    constructor(properties: Properties<IBanUserResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IUnbanUserReq {
    uids?: number[]
    reason?: UnbanReason|null
    description?: string|null
    manipulator?: string|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_UnbanUserReq")
export class UnbanUserReq extends protobuf.Message<IUnbanUserReq> {
    constructor(properties: Properties<IUnbanUserReq>) {
        super(properties);
        if (properties) {
            if (properties.uids) { this.uids = []; properties.uids.forEach((value, index)=>{this.uids[index] = properties.uids[index]})}
            if (properties.reason) { this.reason = properties.reason }
            if (properties.description) { this.description = properties.description }
            if (properties.manipulator) { this.manipulator = properties.manipulator }
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public uids?: number[] = []
    @protobuf.Field.d(3, UnbanReason, "optional", UnbanReason.UnbanReasonOther)
    public reason?: UnbanReason|null = UnbanReason.UnbanReasonOther
    @protobuf.Field.d(4, "string", "optional", )
    public description?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public manipulator?: string|null = ""
}
export interface IUnbanUserResp {
}
@protobuf.Type.d("tss_hall_userinfo_v1_UnbanUserResp")
export class UnbanUserResp extends protobuf.Message<IUnbanUserResp> {
    constructor(properties: Properties<IUnbanUserResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IUserBanLog {
    id?: number|null
    uids?: number[]
    banStatus?: BanStatus|null
    banTimeSec?: number|null
    lockReason?: BanReason|null
    unlockReason?: UnbanReason|null
    description?: string|null
    evidenceURLs?: string[]
    manipulator?: string|null
    updateAt?: number|null
    mail?: IBanUserMail
}
@protobuf.Type.d("tss_hall_userinfo_v1_UserBanLog")
export class UserBanLog extends protobuf.Message<IUserBanLog> {
    constructor(properties: Properties<IUserBanLog>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.uids) { this.uids = []; properties.uids.forEach((value, index)=>{this.uids[index] = properties.uids[index]})}
            if (properties.banStatus) { this.banStatus = properties.banStatus }
            if (properties.banTimeSec) { this.banTimeSec = properties.banTimeSec }
            if (properties.lockReason) { this.lockReason = properties.lockReason }
            if (properties.unlockReason) { this.unlockReason = properties.unlockReason }
            if (properties.description) { this.description = properties.description }
            if (properties.evidenceURLs) { this.evidenceURLs = []; properties.evidenceURLs.forEach((value, index)=>{this.evidenceURLs[index] = properties.evidenceURLs[index]})}
            if (properties.manipulator) { this.manipulator = properties.manipulator }
            if (properties.updateAt) { this.updateAt = properties.updateAt }
            if (properties.mail) { this.mail = BanUserMail.create(properties.mail) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public id?: number|null = 0
    @protobuf.Field.d(2, "int64", "repeated", [])
    public uids?: number[] = []
    @protobuf.Field.d(4, BanStatus, "optional", BanStatus.BanStatusUnknown)
    public banStatus?: BanStatus|null = BanStatus.BanStatusUnknown
    @protobuf.Field.d(5, "int64", "optional", 0)
    public banTimeSec?: number|null = 0
    @protobuf.Field.d(6, BanReason, "optional", BanReason.BanReasonOther)
    public lockReason?: BanReason|null = BanReason.BanReasonOther
    @protobuf.Field.d(7, UnbanReason, "optional", UnbanReason.UnbanReasonOther)
    public unlockReason?: UnbanReason|null = UnbanReason.UnbanReasonOther
    @protobuf.Field.d(8, "string", "optional", )
    public description?: string|null = ""
    @protobuf.Field.d(9, "string", "repeated", [])
    public evidenceURLs?: string[] = []
    @protobuf.Field.d(10, "string", "optional", )
    public manipulator?: string|null = ""
    @protobuf.Field.d(11, "int64", "optional", 0)
    public updateAt?: number|null = 0
    @protobuf.Field.d(12, "tss_hall_userinfo_v1_BanUserMail", "optional")
    public mail?: BanUserMail|null
}
export interface IGetBanLogsReq {
    page?: IPageReq
    uid?: number|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_GetBanLogsReq")
export class GetBanLogsReq extends protobuf.Message<IGetBanLogsReq> {
    constructor(properties: Properties<IGetBanLogsReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = PageReq.create(properties.page) as any }
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "tss_hall_userinfo_v1_PageReq", "optional")
    public page?: PageReq|null
    @protobuf.Field.d(2, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IGetBanLogsResp {
    page?: IPageResp
    logs?: IUserBanLog[]
}
@protobuf.Type.d("tss_hall_userinfo_v1_GetBanLogsResp")
export class GetBanLogsResp extends protobuf.Message<IGetBanLogsResp> {
    constructor(properties: Properties<IGetBanLogsResp>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = PageResp.create(properties.page) as any }
            if (properties.logs) { this.logs = []; properties.logs.forEach((value, index)=>{this.logs[index] = UserBanLog.create(properties.logs[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_userinfo_v1_PageResp", "optional")
    public page?: PageResp|null
    @protobuf.Field.d(2, "tss_hall_userinfo_v1_UserBanLog", "repeated")
    public logs?: UserBanLog[] = []
}
export interface IGetUserBanInfoReq {
    uid?: number|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_GetUserBanInfoReq")
export class GetUserBanInfoReq extends protobuf.Message<IGetUserBanInfoReq> {
    constructor(properties: Properties<IGetUserBanInfoReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IGetUserBanInfoResp {
    uid?: number|null
    reason?: string|null
    startAt?: number|null
    endAt?: number|null
    banReason?: BanReason|null
    description?: string|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_GetUserBanInfoResp")
export class GetUserBanInfoResp extends protobuf.Message<IGetUserBanInfoResp> {
    constructor(properties: Properties<IGetUserBanInfoResp>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.reason) { this.reason = properties.reason }
            if (properties.startAt) { this.startAt = properties.startAt }
            if (properties.endAt) { this.endAt = properties.endAt }
            if (properties.banReason) { this.banReason = properties.banReason }
            if (properties.description) { this.description = properties.description }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public reason?: string|null = ""
    @protobuf.Field.d(3, "int64", "optional", 0)
    public startAt?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public endAt?: number|null = 0
    @protobuf.Field.d(5, BanReason, "optional", BanReason.BanReasonOther)
    public banReason?: BanReason|null = BanReason.BanReasonOther
    @protobuf.Field.d(6, "string", "optional", )
    public description?: string|null = ""
}
export interface IShippingAddr {
    ID?: string|null
    UID?: number|null
    receiver?: string|null
    contactNumber?: string|null
    province?: string|null
    city?: string|null
    region?: string|null
    addr?: string|null
    default?: number|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_ShippingAddr")
export class ShippingAddr extends protobuf.Message<IShippingAddr> {
    constructor(properties: Properties<IShippingAddr>) {
        super(properties);
        if (properties) {
            if (properties.ID) { this.ID = properties.ID }
            if (properties.UID) { this.UID = properties.UID }
            if (properties.receiver) { this.receiver = properties.receiver }
            if (properties.contactNumber) { this.contactNumber = properties.contactNumber }
            if (properties.province) { this.province = properties.province }
            if (properties.city) { this.city = properties.city }
            if (properties.region) { this.region = properties.region }
            if (properties.addr) { this.addr = properties.addr }
            if (properties.default) { this.default = properties.default }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public ID?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public UID?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public receiver?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public contactNumber?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public province?: string|null = ""
    @protobuf.Field.d(6, "string", "optional", )
    public city?: string|null = ""
    @protobuf.Field.d(7, "string", "optional", )
    public region?: string|null = ""
    @protobuf.Field.d(8, "string", "optional", )
    public addr?: string|null = ""
    @protobuf.Field.d(9, "int32", "optional", 0)
    public default?: number|null = 0
}
export interface IGetShippingAddrReq {
    ID?: string|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_GetShippingAddrReq")
export class GetShippingAddrReq extends protobuf.Message<IGetShippingAddrReq> {
    constructor(properties: Properties<IGetShippingAddrReq>) {
        super(properties);
        if (properties) {
            if (properties.ID) { this.ID = properties.ID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public ID?: string|null = ""
}
export interface IGetShippingAddrResp {
    info?: IShippingAddr
}
@protobuf.Type.d("tss_hall_userinfo_v1_GetShippingAddrResp")
export class GetShippingAddrResp extends protobuf.Message<IGetShippingAddrResp> {
    constructor(properties: Properties<IGetShippingAddrResp>) {
        super(properties);
        if (properties) {
            if (properties.info) { this.info = ShippingAddr.create(properties.info) as any }
        }
	}
    @protobuf.Field.d(2, "tss_hall_userinfo_v1_ShippingAddr", "optional")
    public info?: ShippingAddr|null
}
export interface IListShippingAddrReq {
    page?: number|null
    pageSize?: number|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_ListShippingAddrReq")
export class ListShippingAddrReq extends protobuf.Message<IListShippingAddrReq> {
    constructor(properties: Properties<IListShippingAddrReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
        }
	}
    @protobuf.Field.d(2, "int32", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(3, "int32", "optional", 0)
    public pageSize?: number|null = 0
}
export interface IListShippingAddrResp {
    infos?: IShippingAddr[]
    total?: number|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_ListShippingAddrResp")
export class ListShippingAddrResp extends protobuf.Message<IListShippingAddrResp> {
    constructor(properties: Properties<IListShippingAddrResp>) {
        super(properties);
        if (properties) {
            if (properties.infos) { this.infos = []; properties.infos.forEach((value, index)=>{this.infos[index] = ShippingAddr.create(properties.infos[index]) as any})}
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(2, "tss_hall_userinfo_v1_ShippingAddr", "repeated")
    public infos?: ShippingAddr[] = []
    @protobuf.Field.d(3, "int32", "optional", 0)
    public total?: number|null = 0
}
export interface ICreateShippingAddrReq {
    info?: IShippingAddr
}
@protobuf.Type.d("tss_hall_userinfo_v1_CreateShippingAddrReq")
export class CreateShippingAddrReq extends protobuf.Message<ICreateShippingAddrReq> {
    constructor(properties: Properties<ICreateShippingAddrReq>) {
        super(properties);
        if (properties) {
            if (properties.info) { this.info = ShippingAddr.create(properties.info) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_userinfo_v1_ShippingAddr", "optional")
    public info?: ShippingAddr|null
}
export interface ICreateShippingAddrResp {
    info?: IShippingAddr
}
@protobuf.Type.d("tss_hall_userinfo_v1_CreateShippingAddrResp")
export class CreateShippingAddrResp extends protobuf.Message<ICreateShippingAddrResp> {
    constructor(properties: Properties<ICreateShippingAddrResp>) {
        super(properties);
        if (properties) {
            if (properties.info) { this.info = ShippingAddr.create(properties.info) as any }
        }
	}
    @protobuf.Field.d(2, "tss_hall_userinfo_v1_ShippingAddr", "optional")
    public info?: ShippingAddr|null
}
export interface IUpdateShippingAddrReq {
    info?: IShippingAddr
    updateMask?: base_IFieldMask
}
@protobuf.Type.d("tss_hall_userinfo_v1_UpdateShippingAddrReq")
export class UpdateShippingAddrReq extends protobuf.Message<IUpdateShippingAddrReq> {
    constructor(properties: Properties<IUpdateShippingAddrReq>) {
        super(properties);
        if (properties) {
            if (properties.info) { this.info = ShippingAddr.create(properties.info) as any }
            if (properties.updateMask) { this.updateMask = base_FieldMask.create(properties.updateMask) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_userinfo_v1_ShippingAddr", "optional")
    public info?: ShippingAddr|null
    @protobuf.Field.d(2, "base_FieldMask", "optional")
    public updateMask?: base_FieldMask|null
}
export interface IUpdateShippingAddrResp {
    info?: IShippingAddr
}
@protobuf.Type.d("tss_hall_userinfo_v1_UpdateShippingAddrResp")
export class UpdateShippingAddrResp extends protobuf.Message<IUpdateShippingAddrResp> {
    constructor(properties: Properties<IUpdateShippingAddrResp>) {
        super(properties);
        if (properties) {
            if (properties.info) { this.info = ShippingAddr.create(properties.info) as any }
        }
	}
    @protobuf.Field.d(2, "tss_hall_userinfo_v1_ShippingAddr", "optional")
    public info?: ShippingAddr|null
}
export interface IDeleteShippingAddrReq {
    ID?: string|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_DeleteShippingAddrReq")
export class DeleteShippingAddrReq extends protobuf.Message<IDeleteShippingAddrReq> {
    constructor(properties: Properties<IDeleteShippingAddrReq>) {
        super(properties);
        if (properties) {
            if (properties.ID) { this.ID = properties.ID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public ID?: string|null = ""
}
export interface IDeleteShippingAddrResp {
}
@protobuf.Type.d("tss_hall_userinfo_v1_DeleteShippingAddrResp")
export class DeleteShippingAddrResp extends protobuf.Message<IDeleteShippingAddrResp> {
    constructor(properties: Properties<IDeleteShippingAddrResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IGetShippingAddrByUIDReq {
    ID?: string|null
    UID?: number|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_GetShippingAddrByUIDReq")
export class GetShippingAddrByUIDReq extends protobuf.Message<IGetShippingAddrByUIDReq> {
    constructor(properties: Properties<IGetShippingAddrByUIDReq>) {
        super(properties);
        if (properties) {
            if (properties.ID) { this.ID = properties.ID }
            if (properties.UID) { this.UID = properties.UID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public ID?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public UID?: number|null = 0
}
export interface IGetShippingAddrByUIDResp {
    info?: IShippingAddr
}
@protobuf.Type.d("tss_hall_userinfo_v1_GetShippingAddrByUIDResp")
export class GetShippingAddrByUIDResp extends protobuf.Message<IGetShippingAddrByUIDResp> {
    constructor(properties: Properties<IGetShippingAddrByUIDResp>) {
        super(properties);
        if (properties) {
            if (properties.info) { this.info = ShippingAddr.create(properties.info) as any }
        }
	}
    @protobuf.Field.d(2, "tss_hall_userinfo_v1_ShippingAddr", "optional")
    public info?: ShippingAddr|null
}
export interface IListShippingAddrByUIDReq {
    UID?: number|null
    page?: number|null
    pageSize?: number|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_ListShippingAddrByUIDReq")
export class ListShippingAddrByUIDReq extends protobuf.Message<IListShippingAddrByUIDReq> {
    constructor(properties: Properties<IListShippingAddrByUIDReq>) {
        super(properties);
        if (properties) {
            if (properties.UID) { this.UID = properties.UID }
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public UID?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(3, "int32", "optional", 0)
    public pageSize?: number|null = 0
}
export interface IListShippingAddrByUIDResp {
    infos?: IShippingAddr[]
    total?: number|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_ListShippingAddrByUIDResp")
export class ListShippingAddrByUIDResp extends protobuf.Message<IListShippingAddrByUIDResp> {
    constructor(properties: Properties<IListShippingAddrByUIDResp>) {
        super(properties);
        if (properties) {
            if (properties.infos) { this.infos = []; properties.infos.forEach((value, index)=>{this.infos[index] = ShippingAddr.create(properties.infos[index]) as any})}
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(2, "tss_hall_userinfo_v1_ShippingAddr", "repeated")
    public infos?: ShippingAddr[] = []
    @protobuf.Field.d(3, "int32", "optional", 0)
    public total?: number|null = 0
}
export interface IDeactivateUserReq {
    name?: string|null
    idNo?: string|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_DeactivateUserReq")
export class DeactivateUserReq extends protobuf.Message<IDeactivateUserReq> {
    constructor(properties: Properties<IDeactivateUserReq>) {
        super(properties);
        if (properties) {
            if (properties.name) { this.name = properties.name }
            if (properties.idNo) { this.idNo = properties.idNo }
        }
	}
    @protobuf.Field.d(2, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public idNo?: string|null = ""
}
export interface IDeactivateUserResp {
    code?: Code|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_DeactivateUserResp")
export class DeactivateUserResp extends protobuf.Message<IDeactivateUserResp> {
    constructor(properties: Properties<IDeactivateUserResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
        }
	}
    @protobuf.Field.d(1, Code, "optional", Code.CodeOK)
    public code?: Code|null = Code.CodeOK
}
export interface IDeactivateUserByAdminReq {
    uid?: number|null
    operator?: string|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_DeactivateUserByAdminReq")
export class DeactivateUserByAdminReq extends protobuf.Message<IDeactivateUserByAdminReq> {
    constructor(properties: Properties<IDeactivateUserByAdminReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.operator) { this.operator = properties.operator }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public operator?: string|null = ""
}
export interface IDeactivateUserByAdminResp {
}
@protobuf.Type.d("tss_hall_userinfo_v1_DeactivateUserByAdminResp")
export class DeactivateUserByAdminResp extends protobuf.Message<IDeactivateUserByAdminResp> {
    constructor(properties: Properties<IDeactivateUserByAdminResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IPassportRecord {
    phone?: string|null
    email?: string|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_PassportRecord")
export class PassportRecord extends protobuf.Message<IPassportRecord> {
    constructor(properties: Properties<IPassportRecord>) {
        super(properties);
        if (properties) {
            if (properties.phone) { this.phone = properties.phone }
            if (properties.email) { this.email = properties.email }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public phone?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public email?: string|null = ""
}
export interface IDeactivateLog {
    uid?: number|null
    user?: IUser
    passport?: IPassportRecord
    operator?: string|null
    deactivateAt?: number|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_DeactivateLog")
export class DeactivateLog extends protobuf.Message<IDeactivateLog> {
    constructor(properties: Properties<IDeactivateLog>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.user) { this.user = User.create(properties.user) as any }
            if (properties.passport) { this.passport = PassportRecord.create(properties.passport) as any }
            if (properties.operator) { this.operator = properties.operator }
            if (properties.deactivateAt) { this.deactivateAt = properties.deactivateAt }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "tss_hall_userinfo_v1_User", "optional")
    public user?: User|null
    @protobuf.Field.d(3, "tss_hall_userinfo_v1_PassportRecord", "optional")
    public passport?: PassportRecord|null
    @protobuf.Field.d(4, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(5, "int64", "optional", 0)
    public deactivateAt?: number|null = 0
}
export interface IGetLatestUserDeactivateLogReq {
    uid?: number|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_GetLatestUserDeactivateLogReq")
export class GetLatestUserDeactivateLogReq extends protobuf.Message<IGetLatestUserDeactivateLogReq> {
    constructor(properties: Properties<IGetLatestUserDeactivateLogReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IGetLatestUserDeactivateLogResp {
    status?: DeactivateStatus|null
    log?: IDeactivateLog
}
@protobuf.Type.d("tss_hall_userinfo_v1_GetLatestUserDeactivateLogResp")
export class GetLatestUserDeactivateLogResp extends protobuf.Message<IGetLatestUserDeactivateLogResp> {
    constructor(properties: Properties<IGetLatestUserDeactivateLogResp>) {
        super(properties);
        if (properties) {
            if (properties.status) { this.status = properties.status }
            if (properties.log) { this.log = DeactivateLog.create(properties.log) as any }
        }
	}
    @protobuf.Field.d(2, DeactivateStatus, "optional", DeactivateStatus.DeactivateStatusNone)
    public status?: DeactivateStatus|null = DeactivateStatus.DeactivateStatusNone
    @protobuf.Field.d(3, "tss_hall_userinfo_v1_DeactivateLog", "optional")
    public log?: DeactivateLog|null
}
export interface IResetNicknameReq {
    uid?: number|null
    operator?: string|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_ResetNicknameReq")
export class ResetNicknameReq extends protobuf.Message<IResetNicknameReq> {
    constructor(properties: Properties<IResetNicknameReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.operator) { this.operator = properties.operator }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(15, "string", "optional", )
    public operator?: string|null = ""
}
export interface IResetNicknameResp {
}
@protobuf.Type.d("tss_hall_userinfo_v1_ResetNicknameResp")
export class ResetNicknameResp extends protobuf.Message<IResetNicknameResp> {
    constructor(properties: Properties<IResetNicknameResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IResetAvatarReq {
    uid?: number|null
    operator?: string|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_ResetAvatarReq")
export class ResetAvatarReq extends protobuf.Message<IResetAvatarReq> {
    constructor(properties: Properties<IResetAvatarReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.operator) { this.operator = properties.operator }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(15, "string", "optional", )
    public operator?: string|null = ""
}
export interface IResetAvatarResp {
}
@protobuf.Type.d("tss_hall_userinfo_v1_ResetAvatarResp")
export class ResetAvatarResp extends protobuf.Message<IResetAvatarResp> {
    constructor(properties: Properties<IResetAvatarResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IResetNicknameBySensitiveTaskReq {
    resetNickname?: boolean|null
    uid?: number|null
    nickname?: string|null
    sensitiveWord?: string|null
    sensitiveVersion?: string|null
    source?: string|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_ResetNicknameBySensitiveTaskReq")
export class ResetNicknameBySensitiveTaskReq extends protobuf.Message<IResetNicknameBySensitiveTaskReq> {
    constructor(properties: Properties<IResetNicknameBySensitiveTaskReq>) {
        super(properties);
        if (properties) {
            if (properties.resetNickname) { this.resetNickname = properties.resetNickname }
            if (properties.uid) { this.uid = properties.uid }
            if (properties.nickname) { this.nickname = properties.nickname }
            if (properties.sensitiveWord) { this.sensitiveWord = properties.sensitiveWord }
            if (properties.sensitiveVersion) { this.sensitiveVersion = properties.sensitiveVersion }
            if (properties.source) { this.source = properties.source }
        }
	}
    @protobuf.Field.d(1, "bool", "optional", false)
    public resetNickname?: boolean|null = false
    @protobuf.Field.d(2, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public nickname?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public sensitiveWord?: string|null = ""
    @protobuf.Field.d(14, "string", "optional", )
    public sensitiveVersion?: string|null = ""
    @protobuf.Field.d(15, "string", "optional", )
    public source?: string|null = ""
}
export interface IResetNicknameBySensitiveTaskResp {
}
@protobuf.Type.d("tss_hall_userinfo_v1_ResetNicknameBySensitiveTaskResp")
export class ResetNicknameBySensitiveTaskResp extends protobuf.Message<IResetNicknameBySensitiveTaskResp> {
    constructor(properties: Properties<IResetNicknameBySensitiveTaskResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IAvatarConfig {
    defaultAvatar?: string|null
    avatarList?: string[]
}
@protobuf.Type.d("tss_hall_userinfo_v1_AvatarConfig")
export class AvatarConfig extends protobuf.Message<IAvatarConfig> {
    constructor(properties: Properties<IAvatarConfig>) {
        super(properties);
        if (properties) {
            if (properties.defaultAvatar) { this.defaultAvatar = properties.defaultAvatar }
            if (properties.avatarList) { this.avatarList = []; properties.avatarList.forEach((value, index)=>{this.avatarList[index] = properties.avatarList[index]})}
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public defaultAvatar?: string|null = ""
    @protobuf.Field.d(2, "string", "repeated", [])
    public avatarList?: string[] = []
}
export interface IUserInfoConfig {
    avatar?: IAvatarConfig
}
@protobuf.Type.d("tss_hall_userinfo_v1_UserInfoConfig")
export class UserInfoConfig extends protobuf.Message<IUserInfoConfig> {
    constructor(properties: Properties<IUserInfoConfig>) {
        super(properties);
        if (properties) {
            if (properties.avatar) { this.avatar = AvatarConfig.create(properties.avatar) as any }
        }
	}
    @protobuf.Field.d(2, "tss_hall_userinfo_v1_AvatarConfig", "optional")
    public avatar?: AvatarConfig|null
}
export interface IGetUserInfoConfigReq {
}
@protobuf.Type.d("tss_hall_userinfo_v1_GetUserInfoConfigReq")
export class GetUserInfoConfigReq extends protobuf.Message<IGetUserInfoConfigReq> {
    constructor(properties: Properties<IGetUserInfoConfigReq>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IGetUserInfoConfigResp {
    config?: IUserInfoConfig
}
@protobuf.Type.d("tss_hall_userinfo_v1_GetUserInfoConfigResp")
export class GetUserInfoConfigResp extends protobuf.Message<IGetUserInfoConfigResp> {
    constructor(properties: Properties<IGetUserInfoConfigResp>) {
        super(properties);
        if (properties) {
            if (properties.config) { this.config = UserInfoConfig.create(properties.config) as any }
        }
	}
    @protobuf.Field.d(2, "tss_hall_userinfo_v1_UserInfoConfig", "optional")
    public config?: UserInfoConfig|null
}
export interface IUpdateUserInfoConfigReq {
    config?: IUserInfoConfig
    operator?: string|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_UpdateUserInfoConfigReq")
export class UpdateUserInfoConfigReq extends protobuf.Message<IUpdateUserInfoConfigReq> {
    constructor(properties: Properties<IUpdateUserInfoConfigReq>) {
        super(properties);
        if (properties) {
            if (properties.config) { this.config = UserInfoConfig.create(properties.config) as any }
            if (properties.operator) { this.operator = properties.operator }
        }
	}
    @protobuf.Field.d(1, "tss_hall_userinfo_v1_UserInfoConfig", "optional")
    public config?: UserInfoConfig|null
    @protobuf.Field.d(15, "string", "optional", )
    public operator?: string|null = ""
}
export interface IUpdateUserInfoConfigResp {
}
@protobuf.Type.d("tss_hall_userinfo_v1_UpdateUserInfoConfigResp")
export class UpdateUserInfoConfigResp extends protobuf.Message<IUpdateUserInfoConfigResp> {
    constructor(properties: Properties<IUpdateUserInfoConfigResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IValidateNicknameReq {
    nickname?: string|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_ValidateNicknameReq")
export class ValidateNicknameReq extends protobuf.Message<IValidateNicknameReq> {
    constructor(properties: Properties<IValidateNicknameReq>) {
        super(properties);
        if (properties) {
            if (properties.nickname) { this.nickname = properties.nickname }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public nickname?: string|null = ""
}
export interface IValidateNicknameResp {
}
@protobuf.Type.d("tss_hall_userinfo_v1_ValidateNicknameResp")
export class ValidateNicknameResp extends protobuf.Message<IValidateNicknameResp> {
    constructor(properties: Properties<IValidateNicknameResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IMuteUserMail {
    title?: string|null
    content?: string|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_MuteUserMail")
export class MuteUserMail extends protobuf.Message<IMuteUserMail> {
    constructor(properties: Properties<IMuteUserMail>) {
        super(properties);
        if (properties) {
            if (properties.title) { this.title = properties.title }
            if (properties.content) { this.content = properties.content }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public title?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public content?: string|null = ""
}
export interface IMuteUserReq {
    uids?: number[]
    reason?: MuteReason|null
    muteTimeSec?: number|null
    description?: string|null
    evidenceURLs?: string[]
    manipulator?: string|null
    forceOffline?: boolean|null
    mail?: IMuteUserMail
}
@protobuf.Type.d("tss_hall_userinfo_v1_MuteUserReq")
export class MuteUserReq extends protobuf.Message<IMuteUserReq> {
    constructor(properties: Properties<IMuteUserReq>) {
        super(properties);
        if (properties) {
            if (properties.uids) { this.uids = []; properties.uids.forEach((value, index)=>{this.uids[index] = properties.uids[index]})}
            if (properties.reason) { this.reason = properties.reason }
            if (properties.muteTimeSec) { this.muteTimeSec = properties.muteTimeSec }
            if (properties.description) { this.description = properties.description }
            if (properties.evidenceURLs) { this.evidenceURLs = []; properties.evidenceURLs.forEach((value, index)=>{this.evidenceURLs[index] = properties.evidenceURLs[index]})}
            if (properties.manipulator) { this.manipulator = properties.manipulator }
            if (properties.forceOffline) { this.forceOffline = properties.forceOffline }
            if (properties.mail) { this.mail = MuteUserMail.create(properties.mail) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public uids?: number[] = []
    @protobuf.Field.d(2, MuteReason, "optional", MuteReason.MuteReasonOther)
    public reason?: MuteReason|null = MuteReason.MuteReasonOther
    @protobuf.Field.d(3, "int64", "optional", 0)
    public muteTimeSec?: number|null = 0
    @protobuf.Field.d(5, "string", "optional", )
    public description?: string|null = ""
    @protobuf.Field.d(6, "string", "repeated", [])
    public evidenceURLs?: string[] = []
    @protobuf.Field.d(7, "string", "optional", )
    public manipulator?: string|null = ""
    @protobuf.Field.d(8, "bool", "optional", false)
    public forceOffline?: boolean|null = false
    @protobuf.Field.d(9, "tss_hall_userinfo_v1_MuteUserMail", "optional")
    public mail?: MuteUserMail|null
}
export interface IMuteUserResp {
}
@protobuf.Type.d("tss_hall_userinfo_v1_MuteUserResp")
export class MuteUserResp extends protobuf.Message<IMuteUserResp> {
    constructor(properties: Properties<IMuteUserResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IUnmuteUserReq {
    uids?: number[]
    reason?: UnmuteReason|null
    description?: string|null
    manipulator?: string|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_UnmuteUserReq")
export class UnmuteUserReq extends protobuf.Message<IUnmuteUserReq> {
    constructor(properties: Properties<IUnmuteUserReq>) {
        super(properties);
        if (properties) {
            if (properties.uids) { this.uids = []; properties.uids.forEach((value, index)=>{this.uids[index] = properties.uids[index]})}
            if (properties.reason) { this.reason = properties.reason }
            if (properties.description) { this.description = properties.description }
            if (properties.manipulator) { this.manipulator = properties.manipulator }
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public uids?: number[] = []
    @protobuf.Field.d(3, UnmuteReason, "optional", UnmuteReason.UnmuteReasonOther)
    public reason?: UnmuteReason|null = UnmuteReason.UnmuteReasonOther
    @protobuf.Field.d(4, "string", "optional", )
    public description?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public manipulator?: string|null = ""
}
export interface IUnmuteUserResp {
}
@protobuf.Type.d("tss_hall_userinfo_v1_UnmuteUserResp")
export class UnmuteUserResp extends protobuf.Message<IUnmuteUserResp> {
    constructor(properties: Properties<IUnmuteUserResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IUserMuteLog {
    id?: number|null
    uids?: number[]
    muteStatus?: MuteStatus|null
    muteTimeSec?: number|null
    muteReason?: MuteReason|null
    unmuteReason?: UnmuteReason|null
    description?: string|null
    evidenceURLs?: string[]
    manipulator?: string|null
    updateAt?: number|null
    mail?: IMuteUserMail
}
@protobuf.Type.d("tss_hall_userinfo_v1_UserMuteLog")
export class UserMuteLog extends protobuf.Message<IUserMuteLog> {
    constructor(properties: Properties<IUserMuteLog>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.uids) { this.uids = []; properties.uids.forEach((value, index)=>{this.uids[index] = properties.uids[index]})}
            if (properties.muteStatus) { this.muteStatus = properties.muteStatus }
            if (properties.muteTimeSec) { this.muteTimeSec = properties.muteTimeSec }
            if (properties.muteReason) { this.muteReason = properties.muteReason }
            if (properties.unmuteReason) { this.unmuteReason = properties.unmuteReason }
            if (properties.description) { this.description = properties.description }
            if (properties.evidenceURLs) { this.evidenceURLs = []; properties.evidenceURLs.forEach((value, index)=>{this.evidenceURLs[index] = properties.evidenceURLs[index]})}
            if (properties.manipulator) { this.manipulator = properties.manipulator }
            if (properties.updateAt) { this.updateAt = properties.updateAt }
            if (properties.mail) { this.mail = MuteUserMail.create(properties.mail) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public id?: number|null = 0
    @protobuf.Field.d(2, "int64", "repeated", [])
    public uids?: number[] = []
    @protobuf.Field.d(4, MuteStatus, "optional", MuteStatus.MuteStatusUnknown)
    public muteStatus?: MuteStatus|null = MuteStatus.MuteStatusUnknown
    @protobuf.Field.d(5, "int64", "optional", 0)
    public muteTimeSec?: number|null = 0
    @protobuf.Field.d(6, MuteReason, "optional", MuteReason.MuteReasonOther)
    public muteReason?: MuteReason|null = MuteReason.MuteReasonOther
    @protobuf.Field.d(7, UnmuteReason, "optional", UnmuteReason.UnmuteReasonOther)
    public unmuteReason?: UnmuteReason|null = UnmuteReason.UnmuteReasonOther
    @protobuf.Field.d(8, "string", "optional", )
    public description?: string|null = ""
    @protobuf.Field.d(9, "string", "repeated", [])
    public evidenceURLs?: string[] = []
    @protobuf.Field.d(10, "string", "optional", )
    public manipulator?: string|null = ""
    @protobuf.Field.d(11, "int64", "optional", 0)
    public updateAt?: number|null = 0
    @protobuf.Field.d(12, "tss_hall_userinfo_v1_MuteUserMail", "optional")
    public mail?: MuteUserMail|null
}
export interface IGetMuteLogsReq {
    page?: IPageReq
    uid?: number|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_GetMuteLogsReq")
export class GetMuteLogsReq extends protobuf.Message<IGetMuteLogsReq> {
    constructor(properties: Properties<IGetMuteLogsReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = PageReq.create(properties.page) as any }
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "tss_hall_userinfo_v1_PageReq", "optional")
    public page?: PageReq|null
    @protobuf.Field.d(2, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IGetMuteLogsResp {
    page?: IPageResp
    logs?: IUserMuteLog[]
}
@protobuf.Type.d("tss_hall_userinfo_v1_GetMuteLogsResp")
export class GetMuteLogsResp extends protobuf.Message<IGetMuteLogsResp> {
    constructor(properties: Properties<IGetMuteLogsResp>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = PageResp.create(properties.page) as any }
            if (properties.logs) { this.logs = []; properties.logs.forEach((value, index)=>{this.logs[index] = UserMuteLog.create(properties.logs[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_userinfo_v1_PageResp", "optional")
    public page?: PageResp|null
    @protobuf.Field.d(2, "tss_hall_userinfo_v1_UserMuteLog", "repeated")
    public logs?: UserMuteLog[] = []
}
export interface IGetUserMuteInfoReq {
    uid?: number|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_GetUserMuteInfoReq")
export class GetUserMuteInfoReq extends protobuf.Message<IGetUserMuteInfoReq> {
    constructor(properties: Properties<IGetUserMuteInfoReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IGetUserMuteInfoResp {
    uid?: number|null
    reason?: string|null
    startAt?: number|null
    endAt?: number|null
    muteReason?: MuteReason|null
    description?: string|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_GetUserMuteInfoResp")
export class GetUserMuteInfoResp extends protobuf.Message<IGetUserMuteInfoResp> {
    constructor(properties: Properties<IGetUserMuteInfoResp>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.reason) { this.reason = properties.reason }
            if (properties.startAt) { this.startAt = properties.startAt }
            if (properties.endAt) { this.endAt = properties.endAt }
            if (properties.muteReason) { this.muteReason = properties.muteReason }
            if (properties.description) { this.description = properties.description }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public reason?: string|null = ""
    @protobuf.Field.d(3, "int64", "optional", 0)
    public startAt?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public endAt?: number|null = 0
    @protobuf.Field.d(5, MuteReason, "optional", MuteReason.MuteReasonOther)
    public muteReason?: MuteReason|null = MuteReason.MuteReasonOther
    @protobuf.Field.d(6, "string", "optional", )
    public description?: string|null = ""
}
export interface INicknameItem {
    id?: string|null
    gender?: tss_common_Gender|null
    type?: NicknameItemType|null
    name?: string|null
    operator?: string|null
    createdAt?: number|null
    updatedAt?: number|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_NicknameItem")
export class NicknameItem extends protobuf.Message<INicknameItem> {
    constructor(properties: Properties<INicknameItem>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.gender) { this.gender = properties.gender }
            if (properties.type) { this.type = properties.type }
            if (properties.name) { this.name = properties.name }
            if (properties.operator) { this.operator = properties.operator }
            if (properties.createdAt) { this.createdAt = properties.createdAt }
            if (properties.updatedAt) { this.updatedAt = properties.updatedAt }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public id?: string|null = ""
    @protobuf.Field.d(2, tss_common_Gender, "optional", tss_common_Gender.GenderUnknown)
    public gender?: tss_common_Gender|null = tss_common_Gender.GenderUnknown
    @protobuf.Field.d(3, NicknameItemType, "optional", NicknameItemType.NicknameItemTypeUnknown)
    public type?: NicknameItemType|null = NicknameItemType.NicknameItemTypeUnknown
    @protobuf.Field.d(4, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(13, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(14, "int64", "optional", 0)
    public createdAt?: number|null = 0
    @protobuf.Field.d(15, "int64", "optional", 0)
    public updatedAt?: number|null = 0
}
export interface IUploadNicknameItemsReq {
    gender?: tss_common_Gender|null
    type?: NicknameItemType|null
    names?: string[]
    operator?: string|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_UploadNicknameItemsReq")
export class UploadNicknameItemsReq extends protobuf.Message<IUploadNicknameItemsReq> {
    constructor(properties: Properties<IUploadNicknameItemsReq>) {
        super(properties);
        if (properties) {
            if (properties.gender) { this.gender = properties.gender }
            if (properties.type) { this.type = properties.type }
            if (properties.names) { this.names = []; properties.names.forEach((value, index)=>{this.names[index] = properties.names[index]})}
            if (properties.operator) { this.operator = properties.operator }
        }
	}
    @protobuf.Field.d(2, tss_common_Gender, "optional", tss_common_Gender.GenderUnknown)
    public gender?: tss_common_Gender|null = tss_common_Gender.GenderUnknown
    @protobuf.Field.d(3, NicknameItemType, "optional", NicknameItemType.NicknameItemTypeUnknown)
    public type?: NicknameItemType|null = NicknameItemType.NicknameItemTypeUnknown
    @protobuf.Field.d(4, "string", "repeated", [])
    public names?: string[] = []
    @protobuf.Field.d(15, "string", "optional", )
    public operator?: string|null = ""
}
export interface IUploadNicknameItemsResp {
}
@protobuf.Type.d("tss_hall_userinfo_v1_UploadNicknameItemsResp")
export class UploadNicknameItemsResp extends protobuf.Message<IUploadNicknameItemsResp> {
    constructor(properties: Properties<IUploadNicknameItemsResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IUpdateNicknameItemReq {
    id?: string|null
    name?: string|null
    operator?: string|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_UpdateNicknameItemReq")
export class UpdateNicknameItemReq extends protobuf.Message<IUpdateNicknameItemReq> {
    constructor(properties: Properties<IUpdateNicknameItemReq>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.name) { this.name = properties.name }
            if (properties.operator) { this.operator = properties.operator }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public id?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(15, "string", "optional", )
    public operator?: string|null = ""
}
export interface IUpdateNicknameItemResp {
}
@protobuf.Type.d("tss_hall_userinfo_v1_UpdateNicknameItemResp")
export class UpdateNicknameItemResp extends protobuf.Message<IUpdateNicknameItemResp> {
    constructor(properties: Properties<IUpdateNicknameItemResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IListNicknameItemsReq {
    page?: IPageReq
    gender?: tss_common_Gender|null
    type?: NicknameItemType|null
    name?: string|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_ListNicknameItemsReq")
export class ListNicknameItemsReq extends protobuf.Message<IListNicknameItemsReq> {
    constructor(properties: Properties<IListNicknameItemsReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = PageReq.create(properties.page) as any }
            if (properties.gender) { this.gender = properties.gender }
            if (properties.type) { this.type = properties.type }
            if (properties.name) { this.name = properties.name }
        }
	}
    @protobuf.Field.d(1, "tss_hall_userinfo_v1_PageReq", "optional")
    public page?: PageReq|null
    @protobuf.Field.d(2, tss_common_Gender, "optional", tss_common_Gender.GenderUnknown)
    public gender?: tss_common_Gender|null = tss_common_Gender.GenderUnknown
    @protobuf.Field.d(3, NicknameItemType, "optional", NicknameItemType.NicknameItemTypeUnknown)
    public type?: NicknameItemType|null = NicknameItemType.NicknameItemTypeUnknown
    @protobuf.Field.d(4, "string", "optional", )
    public name?: string|null = ""
}
export interface IListNicknameItemsResp {
    total?: number|null
    items?: INicknameItem[]
}
@protobuf.Type.d("tss_hall_userinfo_v1_ListNicknameItemsResp")
export class ListNicknameItemsResp extends protobuf.Message<IListNicknameItemsResp> {
    constructor(properties: Properties<IListNicknameItemsResp>) {
        super(properties);
        if (properties) {
            if (properties.total) { this.total = properties.total }
            if (properties.items) { this.items = []; properties.items.forEach((value, index)=>{this.items[index] = NicknameItem.create(properties.items[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public total?: number|null = 0
    @protobuf.Field.d(3, "tss_hall_userinfo_v1_NicknameItem", "repeated")
    public items?: NicknameItem[] = []
}
export interface IGetRandNicknameReq {
    gender?: tss_common_Gender|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_GetRandNicknameReq")
export class GetRandNicknameReq extends protobuf.Message<IGetRandNicknameReq> {
    constructor(properties: Properties<IGetRandNicknameReq>) {
        super(properties);
        if (properties) {
            if (properties.gender) { this.gender = properties.gender }
        }
	}
    @protobuf.Field.d(2, tss_common_Gender, "optional", tss_common_Gender.GenderUnknown)
    public gender?: tss_common_Gender|null = tss_common_Gender.GenderUnknown
}
export interface IGetRandNicknameResp {
    nickname?: string|null
}
@protobuf.Type.d("tss_hall_userinfo_v1_GetRandNicknameResp")
export class GetRandNicknameResp extends protobuf.Message<IGetRandNicknameResp> {
    constructor(properties: Properties<IGetRandNicknameResp>) {
        super(properties);
        if (properties) {
            if (properties.nickname) { this.nickname = properties.nickname }
        }
	}
    @protobuf.Field.d(2, "string", "optional", )
    public nickname?: string|null = ""
}
class $Userinfo extends RpcService {
    async CreateUser(req: ICreateUserReq, params?: RpcParams) : Promise<{err:number, resp:ICreateUserResp}> {
        let data = CreateUserReq.create(req)
        this.onBeforeReq("CreateUser", data, params)
        const buffer = CreateUserReq.encode(data).finish()
        let [err, pack] = await this.call("CreateUser", buffer, params)
        if (err) {
            this.onBeforeResp("CreateUser", err)
            return {err: err, resp: null}
        } else {
            let resp = CreateUserResp.decode(pack) as any
            this.onBeforeResp("CreateUser", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetOrCreateUser(req: IGetOrCreateUserReq, params?: RpcParams) : Promise<{err:number, resp:IGetOrCreateUserResp}> {
        let data = GetOrCreateUserReq.create(req)
        this.onBeforeReq("GetOrCreateUser", data, params)
        const buffer = GetOrCreateUserReq.encode(data).finish()
        let [err, pack] = await this.call("GetOrCreateUser", buffer, params)
        if (err) {
            this.onBeforeResp("GetOrCreateUser", err)
            return {err: err, resp: null}
        } else {
            let resp = GetOrCreateUserResp.decode(pack) as any
            this.onBeforeResp("GetOrCreateUser", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetUser(req: IGetUserReq, params?: RpcParams) : Promise<{err:number, resp:IGetUserResp}> {
        let data = GetUserReq.create(req)
        this.onBeforeReq("GetUser", data, params)
        const buffer = GetUserReq.encode(data).finish()
        let [err, pack] = await this.call("GetUser", buffer, params)
        if (err) {
            this.onBeforeResp("GetUser", err)
            return {err: err, resp: null}
        } else {
            let resp = GetUserResp.decode(pack) as any
            this.onBeforeResp("GetUser", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetUser(req: IBatchGetUserReq, params?: RpcParams) : Promise<{err:number, resp:IBatchGetUserResp}> {
        let data = BatchGetUserReq.create(req)
        this.onBeforeReq("BatchGetUser", data, params)
        const buffer = BatchGetUserReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetUser", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetUser", err)
            return {err: err, resp: null}
        } else {
            let resp = BatchGetUserResp.decode(pack) as any
            this.onBeforeResp("BatchGetUser", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SearchUsers(req: ISearchUsersReq, params?: RpcParams) : Promise<{err:number, resp:ISearchUsersResp}> {
        let data = SearchUsersReq.create(req)
        this.onBeforeReq("SearchUsers", data, params)
        const buffer = SearchUsersReq.encode(data).finish()
        let [err, pack] = await this.call("SearchUsers", buffer, params)
        if (err) {
            this.onBeforeResp("SearchUsers", err)
            return {err: err, resp: null}
        } else {
            let resp = SearchUsersResp.decode(pack) as any
            this.onBeforeResp("SearchUsers", err, resp)
            return {err: null, resp: resp}
        }
    }
    async FuzzySearchUsers(req: IFuzzySearchUsersReq, params?: RpcParams) : Promise<{err:number, resp:IFuzzySearchUsersResp}> {
        let data = FuzzySearchUsersReq.create(req)
        this.onBeforeReq("FuzzySearchUsers", data, params)
        const buffer = FuzzySearchUsersReq.encode(data).finish()
        let [err, pack] = await this.call("FuzzySearchUsers", buffer, params)
        if (err) {
            this.onBeforeResp("FuzzySearchUsers", err)
            return {err: err, resp: null}
        } else {
            let resp = FuzzySearchUsersResp.decode(pack) as any
            this.onBeforeResp("FuzzySearchUsers", err, resp)
            return {err: null, resp: resp}
        }
    }
    async UpdateUser(req: IUpdateUserReq, params?: RpcParams) : Promise<{err:number, resp:IUpdateUserResp}> {
        let data = UpdateUserReq.create(req)
        this.onBeforeReq("UpdateUser", data, params)
        const buffer = UpdateUserReq.encode(data).finish()
        let [err, pack] = await this.call("UpdateUser", buffer, params)
        if (err) {
            this.onBeforeResp("UpdateUser", err)
            return {err: err, resp: null}
        } else {
            let resp = UpdateUserResp.decode(pack) as any
            this.onBeforeResp("UpdateUser", err, resp)
            return {err: null, resp: resp}
        }
    }
    async UpdateUserBySelf(req: IUpdateUserBySelfReq, params?: RpcParams) : Promise<{err:number, resp:IUpdateUserBySelfResp}> {
        let data = UpdateUserBySelfReq.create(req)
        this.onBeforeReq("UpdateUserBySelf", data, params)
        const buffer = UpdateUserBySelfReq.encode(data).finish()
        let [err, pack] = await this.call("UpdateUserBySelf", buffer, params)
        if (err) {
            this.onBeforeResp("UpdateUserBySelf", err)
            return {err: err, resp: null}
        } else {
            let resp = UpdateUserBySelfResp.decode(pack) as any
            this.onBeforeResp("UpdateUserBySelf", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetNicknameUpdatePermission(req: IGetNicknameUpdatePermissionReq, params?: RpcParams) : Promise<{err:number, resp:IGetNicknameUpdatePermissionResp}> {
        let data = GetNicknameUpdatePermissionReq.create(req)
        this.onBeforeReq("GetNicknameUpdatePermission", data, params)
        const buffer = GetNicknameUpdatePermissionReq.encode(data).finish()
        let [err, pack] = await this.call("GetNicknameUpdatePermission", buffer, params)
        if (err) {
            this.onBeforeResp("GetNicknameUpdatePermission", err)
            return {err: err, resp: null}
        } else {
            let resp = GetNicknameUpdatePermissionResp.decode(pack) as any
            this.onBeforeResp("GetNicknameUpdatePermission", err, resp)
            return {err: null, resp: resp}
        }
    }
    async CreateNicknameCheckJob(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = base_Void.create(req)
        this.onBeforeReq("CreateNicknameCheckJob", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("CreateNicknameCheckJob", buffer, params)
        if (err) {
            this.onBeforeResp("CreateNicknameCheckJob", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("CreateNicknameCheckJob", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetRandUid(req: IGetRandUidReq, params?: RpcParams) : Promise<{err:number, resp:IGetRandUidResp}> {
        let data = GetRandUidReq.create(req)
        this.onBeforeReq("GetRandUid", data, params)
        const buffer = GetRandUidReq.encode(data).finish()
        let [err, pack] = await this.call("GetRandUid", buffer, params)
        if (err) {
            this.onBeforeResp("GetRandUid", err)
            return {err: err, resp: null}
        } else {
            let resp = GetRandUidResp.decode(pack) as any
            this.onBeforeResp("GetRandUid", err, resp)
            return {err: null, resp: resp}
        }
    }
    async CountUser(req: ICountUserReq, params?: RpcParams) : Promise<{err:number, resp:ICountUserResp}> {
        let data = CountUserReq.create(req)
        this.onBeforeReq("CountUser", data, params)
        const buffer = CountUserReq.encode(data).finish()
        let [err, pack] = await this.call("CountUser", buffer, params)
        if (err) {
            this.onBeforeResp("CountUser", err)
            return {err: err, resp: null}
        } else {
            let resp = CountUserResp.decode(pack) as any
            this.onBeforeResp("CountUser", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetRandNickname(req: IGetRandNicknameReq, params?: RpcParams) : Promise<{err:number, resp:IGetRandNicknameResp}> {
        let data = GetRandNicknameReq.create(req)
        this.onBeforeReq("GetRandNickname", data, params)
        const buffer = GetRandNicknameReq.encode(data).finish()
        let [err, pack] = await this.call("GetRandNickname", buffer, params)
        if (err) {
            this.onBeforeResp("GetRandNickname", err)
            return {err: err, resp: null}
        } else {
            let resp = GetRandNicknameResp.decode(pack) as any
            this.onBeforeResp("GetRandNickname", err, resp)
            return {err: null, resp: resp}
        }
    }
    async UploadCustomAvatar(req: IUploadCustomAvatarReq, params?: RpcParams) : Promise<{err:number, resp:IUploadCustomAvatarResp}> {
        let data = UploadCustomAvatarReq.create(req)
        this.onBeforeReq("UploadCustomAvatar", data, params)
        const buffer = UploadCustomAvatarReq.encode(data).finish()
        let [err, pack] = await this.call("UploadCustomAvatar", buffer, params)
        if (err) {
            this.onBeforeResp("UploadCustomAvatar", err)
            return {err: err, resp: null}
        } else {
            let resp = UploadCustomAvatarResp.decode(pack) as any
            this.onBeforeResp("UploadCustomAvatar", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetCustomAvatar(req: IGetCustomAvatarReq, params?: RpcParams) : Promise<{err:number, resp:IGetCustomAvatarResp}> {
        let data = GetCustomAvatarReq.create(req)
        this.onBeforeReq("GetCustomAvatar", data, params)
        const buffer = GetCustomAvatarReq.encode(data).finish()
        let [err, pack] = await this.call("GetCustomAvatar", buffer, params)
        if (err) {
            this.onBeforeResp("GetCustomAvatar", err)
            return {err: err, resp: null}
        } else {
            let resp = GetCustomAvatarResp.decode(pack) as any
            this.onBeforeResp("GetCustomAvatar", err, resp)
            return {err: null, resp: resp}
        }
    }
    async VerifyIdCard(req: IVerifyIdCardReq, params?: RpcParams) : Promise<{err:number, resp:IVerifyIdCardResp}> {
        let data = VerifyIdCardReq.create(req)
        this.onBeforeReq("VerifyIdCard", data, params)
        const buffer = VerifyIdCardReq.encode(data).finish()
        let [err, pack] = await this.call("VerifyIdCard", buffer, params)
        if (err) {
            this.onBeforeResp("VerifyIdCard", err)
            return {err: err, resp: null}
        } else {
            let resp = VerifyIdCardResp.decode(pack) as any
            this.onBeforeResp("VerifyIdCard", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetUserIdCardInfo(req: IGetUserIdCardInfoReq, params?: RpcParams) : Promise<{err:number, resp:IGetUserIdCardInfoResp}> {
        let data = GetUserIdCardInfoReq.create(req)
        this.onBeforeReq("GetUserIdCardInfo", data, params)
        const buffer = GetUserIdCardInfoReq.encode(data).finish()
        let [err, pack] = await this.call("GetUserIdCardInfo", buffer, params)
        if (err) {
            this.onBeforeResp("GetUserIdCardInfo", err)
            return {err: err, resp: null}
        } else {
            let resp = GetUserIdCardInfoResp.decode(pack) as any
            this.onBeforeResp("GetUserIdCardInfo", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetUserIdCardInfosByIdNo(req: IGetUserIdCardInfosByIdNoReq, params?: RpcParams) : Promise<{err:number, resp:IGetUserIdCardInfosByIdNoResp}> {
        let data = GetUserIdCardInfosByIdNoReq.create(req)
        this.onBeforeReq("GetUserIdCardInfosByIdNo", data, params)
        const buffer = GetUserIdCardInfosByIdNoReq.encode(data).finish()
        let [err, pack] = await this.call("GetUserIdCardInfosByIdNo", buffer, params)
        if (err) {
            this.onBeforeResp("GetUserIdCardInfosByIdNo", err)
            return {err: err, resp: null}
        } else {
            let resp = GetUserIdCardInfosByIdNoResp.decode(pack) as any
            this.onBeforeResp("GetUserIdCardInfosByIdNo", err, resp)
            return {err: null, resp: resp}
        }
    }
    async RemoveUserIdCardInfo(req: IRemoveUserIdCardInfoReq, params?: RpcParams) : Promise<{err:number, resp:IRemoveUserIdCardInfoResp}> {
        let data = RemoveUserIdCardInfoReq.create(req)
        this.onBeforeReq("RemoveUserIdCardInfo", data, params)
        const buffer = RemoveUserIdCardInfoReq.encode(data).finish()
        let [err, pack] = await this.call("RemoveUserIdCardInfo", buffer, params)
        if (err) {
            this.onBeforeResp("RemoveUserIdCardInfo", err)
            return {err: err, resp: null}
        } else {
            let resp = RemoveUserIdCardInfoResp.decode(pack) as any
            this.onBeforeResp("RemoveUserIdCardInfo", err, resp)
            return {err: null, resp: resp}
        }
    }
    async RemoveUserIdCardRetryLimit(req: IRemoveUserIdCardRetryLimitReq, params?: RpcParams) : Promise<{err:number, resp:IRemoveUserIdCardRetryLimitResp}> {
        let data = RemoveUserIdCardRetryLimitReq.create(req)
        this.onBeforeReq("RemoveUserIdCardRetryLimit", data, params)
        const buffer = RemoveUserIdCardRetryLimitReq.encode(data).finish()
        let [err, pack] = await this.call("RemoveUserIdCardRetryLimit", buffer, params)
        if (err) {
            this.onBeforeResp("RemoveUserIdCardRetryLimit", err)
            return {err: err, resp: null}
        } else {
            let resp = RemoveUserIdCardRetryLimitResp.decode(pack) as any
            this.onBeforeResp("RemoveUserIdCardRetryLimit", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BanUser(req: IBanUserReq, params?: RpcParams) : Promise<{err:number, resp:IBanUserResp}> {
        let data = BanUserReq.create(req)
        this.onBeforeReq("BanUser", data, params)
        const buffer = BanUserReq.encode(data).finish()
        let [err, pack] = await this.call("BanUser", buffer, params)
        if (err) {
            this.onBeforeResp("BanUser", err)
            return {err: err, resp: null}
        } else {
            let resp = BanUserResp.decode(pack) as any
            this.onBeforeResp("BanUser", err, resp)
            return {err: null, resp: resp}
        }
    }
    async UnbanUser(req: IUnbanUserReq, params?: RpcParams) : Promise<{err:number, resp:IUnbanUserResp}> {
        let data = UnbanUserReq.create(req)
        this.onBeforeReq("UnbanUser", data, params)
        const buffer = UnbanUserReq.encode(data).finish()
        let [err, pack] = await this.call("UnbanUser", buffer, params)
        if (err) {
            this.onBeforeResp("UnbanUser", err)
            return {err: err, resp: null}
        } else {
            let resp = UnbanUserResp.decode(pack) as any
            this.onBeforeResp("UnbanUser", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetBanLogs(req: IGetBanLogsReq, params?: RpcParams) : Promise<{err:number, resp:IGetBanLogsResp}> {
        let data = GetBanLogsReq.create(req)
        this.onBeforeReq("GetBanLogs", data, params)
        const buffer = GetBanLogsReq.encode(data).finish()
        let [err, pack] = await this.call("GetBanLogs", buffer, params)
        if (err) {
            this.onBeforeResp("GetBanLogs", err)
            return {err: err, resp: null}
        } else {
            let resp = GetBanLogsResp.decode(pack) as any
            this.onBeforeResp("GetBanLogs", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetUserBanInfo(req: IGetUserBanInfoReq, params?: RpcParams) : Promise<{err:number, resp:IGetUserBanInfoResp}> {
        let data = GetUserBanInfoReq.create(req)
        this.onBeforeReq("GetUserBanInfo", data, params)
        const buffer = GetUserBanInfoReq.encode(data).finish()
        let [err, pack] = await this.call("GetUserBanInfo", buffer, params)
        if (err) {
            this.onBeforeResp("GetUserBanInfo", err)
            return {err: err, resp: null}
        } else {
            let resp = GetUserBanInfoResp.decode(pack) as any
            this.onBeforeResp("GetUserBanInfo", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetUserInfoConfig(req: IGetUserInfoConfigReq, params?: RpcParams) : Promise<{err:number, resp:IGetUserInfoConfigResp}> {
        let data = GetUserInfoConfigReq.create(req)
        this.onBeforeReq("GetUserInfoConfig", data, params)
        const buffer = GetUserInfoConfigReq.encode(data).finish()
        let [err, pack] = await this.call("GetUserInfoConfig", buffer, params)
        if (err) {
            this.onBeforeResp("GetUserInfoConfig", err)
            return {err: err, resp: null}
        } else {
            let resp = GetUserInfoConfigResp.decode(pack) as any
            this.onBeforeResp("GetUserInfoConfig", err, resp)
            return {err: null, resp: resp}
        }
    }
    async UpdateUserInfoConfig(req: IUpdateUserInfoConfigReq, params?: RpcParams) : Promise<{err:number, resp:IUpdateUserInfoConfigResp}> {
        let data = UpdateUserInfoConfigReq.create(req)
        this.onBeforeReq("UpdateUserInfoConfig", data, params)
        const buffer = UpdateUserInfoConfigReq.encode(data).finish()
        let [err, pack] = await this.call("UpdateUserInfoConfig", buffer, params)
        if (err) {
            this.onBeforeResp("UpdateUserInfoConfig", err)
            return {err: err, resp: null}
        } else {
            let resp = UpdateUserInfoConfigResp.decode(pack) as any
            this.onBeforeResp("UpdateUserInfoConfig", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetShippingAddr(req: IGetShippingAddrReq, params?: RpcParams) : Promise<{err:number, resp:IGetShippingAddrResp}> {
        let data = GetShippingAddrReq.create(req)
        this.onBeforeReq("GetShippingAddr", data, params)
        const buffer = GetShippingAddrReq.encode(data).finish()
        let [err, pack] = await this.call("GetShippingAddr", buffer, params)
        if (err) {
            this.onBeforeResp("GetShippingAddr", err)
            return {err: err, resp: null}
        } else {
            let resp = GetShippingAddrResp.decode(pack) as any
            this.onBeforeResp("GetShippingAddr", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListShippingAddr(req: IListShippingAddrReq, params?: RpcParams) : Promise<{err:number, resp:IListShippingAddrResp}> {
        let data = ListShippingAddrReq.create(req)
        this.onBeforeReq("ListShippingAddr", data, params)
        const buffer = ListShippingAddrReq.encode(data).finish()
        let [err, pack] = await this.call("ListShippingAddr", buffer, params)
        if (err) {
            this.onBeforeResp("ListShippingAddr", err)
            return {err: err, resp: null}
        } else {
            let resp = ListShippingAddrResp.decode(pack) as any
            this.onBeforeResp("ListShippingAddr", err, resp)
            return {err: null, resp: resp}
        }
    }
    async CreateShippingAddr(req: ICreateShippingAddrReq, params?: RpcParams) : Promise<{err:number, resp:ICreateShippingAddrResp}> {
        let data = CreateShippingAddrReq.create(req)
        this.onBeforeReq("CreateShippingAddr", data, params)
        const buffer = CreateShippingAddrReq.encode(data).finish()
        let [err, pack] = await this.call("CreateShippingAddr", buffer, params)
        if (err) {
            this.onBeforeResp("CreateShippingAddr", err)
            return {err: err, resp: null}
        } else {
            let resp = CreateShippingAddrResp.decode(pack) as any
            this.onBeforeResp("CreateShippingAddr", err, resp)
            return {err: null, resp: resp}
        }
    }
    async UpdateShippingAddr(req: IUpdateShippingAddrReq, params?: RpcParams) : Promise<{err:number, resp:IUpdateShippingAddrResp}> {
        let data = UpdateShippingAddrReq.create(req)
        this.onBeforeReq("UpdateShippingAddr", data, params)
        const buffer = UpdateShippingAddrReq.encode(data).finish()
        let [err, pack] = await this.call("UpdateShippingAddr", buffer, params)
        if (err) {
            this.onBeforeResp("UpdateShippingAddr", err)
            return {err: err, resp: null}
        } else {
            let resp = UpdateShippingAddrResp.decode(pack) as any
            this.onBeforeResp("UpdateShippingAddr", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DeleteShippingAddr(req: IDeleteShippingAddrReq, params?: RpcParams) : Promise<{err:number, resp:IDeleteShippingAddrResp}> {
        let data = DeleteShippingAddrReq.create(req)
        this.onBeforeReq("DeleteShippingAddr", data, params)
        const buffer = DeleteShippingAddrReq.encode(data).finish()
        let [err, pack] = await this.call("DeleteShippingAddr", buffer, params)
        if (err) {
            this.onBeforeResp("DeleteShippingAddr", err)
            return {err: err, resp: null}
        } else {
            let resp = DeleteShippingAddrResp.decode(pack) as any
            this.onBeforeResp("DeleteShippingAddr", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetShippingAddrByUID(req: IGetShippingAddrByUIDReq, params?: RpcParams) : Promise<{err:number, resp:IGetShippingAddrByUIDResp}> {
        let data = GetShippingAddrByUIDReq.create(req)
        this.onBeforeReq("GetShippingAddrByUID", data, params)
        const buffer = GetShippingAddrByUIDReq.encode(data).finish()
        let [err, pack] = await this.call("GetShippingAddrByUID", buffer, params)
        if (err) {
            this.onBeforeResp("GetShippingAddrByUID", err)
            return {err: err, resp: null}
        } else {
            let resp = GetShippingAddrByUIDResp.decode(pack) as any
            this.onBeforeResp("GetShippingAddrByUID", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListShippingAddrByUID(req: IListShippingAddrByUIDReq, params?: RpcParams) : Promise<{err:number, resp:IListShippingAddrByUIDResp}> {
        let data = ListShippingAddrByUIDReq.create(req)
        this.onBeforeReq("ListShippingAddrByUID", data, params)
        const buffer = ListShippingAddrByUIDReq.encode(data).finish()
        let [err, pack] = await this.call("ListShippingAddrByUID", buffer, params)
        if (err) {
            this.onBeforeResp("ListShippingAddrByUID", err)
            return {err: err, resp: null}
        } else {
            let resp = ListShippingAddrByUIDResp.decode(pack) as any
            this.onBeforeResp("ListShippingAddrByUID", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DeactivateUser(req: IDeactivateUserReq, params?: RpcParams) : Promise<{err:number, resp:IDeactivateUserResp}> {
        let data = DeactivateUserReq.create(req)
        this.onBeforeReq("DeactivateUser", data, params)
        const buffer = DeactivateUserReq.encode(data).finish()
        let [err, pack] = await this.call("DeactivateUser", buffer, params)
        if (err) {
            this.onBeforeResp("DeactivateUser", err)
            return {err: err, resp: null}
        } else {
            let resp = DeactivateUserResp.decode(pack) as any
            this.onBeforeResp("DeactivateUser", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetLatestUserDeactivateLog(req: IGetLatestUserDeactivateLogReq, params?: RpcParams) : Promise<{err:number, resp:IGetLatestUserDeactivateLogResp}> {
        let data = GetLatestUserDeactivateLogReq.create(req)
        this.onBeforeReq("GetLatestUserDeactivateLog", data, params)
        const buffer = GetLatestUserDeactivateLogReq.encode(data).finish()
        let [err, pack] = await this.call("GetLatestUserDeactivateLog", buffer, params)
        if (err) {
            this.onBeforeResp("GetLatestUserDeactivateLog", err)
            return {err: err, resp: null}
        } else {
            let resp = GetLatestUserDeactivateLogResp.decode(pack) as any
            this.onBeforeResp("GetLatestUserDeactivateLog", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DeactivateUserByAdmin(req: IDeactivateUserByAdminReq, params?: RpcParams) : Promise<{err:number, resp:IDeactivateUserByAdminResp}> {
        let data = DeactivateUserByAdminReq.create(req)
        this.onBeforeReq("DeactivateUserByAdmin", data, params)
        const buffer = DeactivateUserByAdminReq.encode(data).finish()
        let [err, pack] = await this.call("DeactivateUserByAdmin", buffer, params)
        if (err) {
            this.onBeforeResp("DeactivateUserByAdmin", err)
            return {err: err, resp: null}
        } else {
            let resp = DeactivateUserByAdminResp.decode(pack) as any
            this.onBeforeResp("DeactivateUserByAdmin", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ResetNickname(req: IResetNicknameReq, params?: RpcParams) : Promise<{err:number, resp:IResetNicknameResp}> {
        let data = ResetNicknameReq.create(req)
        this.onBeforeReq("ResetNickname", data, params)
        const buffer = ResetNicknameReq.encode(data).finish()
        let [err, pack] = await this.call("ResetNickname", buffer, params)
        if (err) {
            this.onBeforeResp("ResetNickname", err)
            return {err: err, resp: null}
        } else {
            let resp = ResetNicknameResp.decode(pack) as any
            this.onBeforeResp("ResetNickname", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ResetAvatar(req: IResetAvatarReq, params?: RpcParams) : Promise<{err:number, resp:IResetAvatarResp}> {
        let data = ResetAvatarReq.create(req)
        this.onBeforeReq("ResetAvatar", data, params)
        const buffer = ResetAvatarReq.encode(data).finish()
        let [err, pack] = await this.call("ResetAvatar", buffer, params)
        if (err) {
            this.onBeforeResp("ResetAvatar", err)
            return {err: err, resp: null}
        } else {
            let resp = ResetAvatarResp.decode(pack) as any
            this.onBeforeResp("ResetAvatar", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ResetNicknameBySensitiveTask(req: IResetNicknameBySensitiveTaskReq, params?: RpcParams) : Promise<{err:number, resp:IResetNicknameBySensitiveTaskResp}> {
        let data = ResetNicknameBySensitiveTaskReq.create(req)
        this.onBeforeReq("ResetNicknameBySensitiveTask", data, params)
        const buffer = ResetNicknameBySensitiveTaskReq.encode(data).finish()
        let [err, pack] = await this.call("ResetNicknameBySensitiveTask", buffer, params)
        if (err) {
            this.onBeforeResp("ResetNicknameBySensitiveTask", err)
            return {err: err, resp: null}
        } else {
            let resp = ResetNicknameBySensitiveTaskResp.decode(pack) as any
            this.onBeforeResp("ResetNicknameBySensitiveTask", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ValidateNickname(req: IValidateNicknameReq, params?: RpcParams) : Promise<{err:number, resp:IValidateNicknameResp}> {
        let data = ValidateNicknameReq.create(req)
        this.onBeforeReq("ValidateNickname", data, params)
        const buffer = ValidateNicknameReq.encode(data).finish()
        let [err, pack] = await this.call("ValidateNickname", buffer, params)
        if (err) {
            this.onBeforeResp("ValidateNickname", err)
            return {err: err, resp: null}
        } else {
            let resp = ValidateNicknameResp.decode(pack) as any
            this.onBeforeResp("ValidateNickname", err, resp)
            return {err: null, resp: resp}
        }
    }
    async MuteUser(req: IMuteUserReq, params?: RpcParams) : Promise<{err:number, resp:IMuteUserResp}> {
        let data = MuteUserReq.create(req)
        this.onBeforeReq("MuteUser", data, params)
        const buffer = MuteUserReq.encode(data).finish()
        let [err, pack] = await this.call("MuteUser", buffer, params)
        if (err) {
            this.onBeforeResp("MuteUser", err)
            return {err: err, resp: null}
        } else {
            let resp = MuteUserResp.decode(pack) as any
            this.onBeforeResp("MuteUser", err, resp)
            return {err: null, resp: resp}
        }
    }
    async UnmuteUser(req: IUnmuteUserReq, params?: RpcParams) : Promise<{err:number, resp:IUnmuteUserResp}> {
        let data = UnmuteUserReq.create(req)
        this.onBeforeReq("UnmuteUser", data, params)
        const buffer = UnmuteUserReq.encode(data).finish()
        let [err, pack] = await this.call("UnmuteUser", buffer, params)
        if (err) {
            this.onBeforeResp("UnmuteUser", err)
            return {err: err, resp: null}
        } else {
            let resp = UnmuteUserResp.decode(pack) as any
            this.onBeforeResp("UnmuteUser", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetMuteLogs(req: IGetMuteLogsReq, params?: RpcParams) : Promise<{err:number, resp:IGetMuteLogsResp}> {
        let data = GetMuteLogsReq.create(req)
        this.onBeforeReq("GetMuteLogs", data, params)
        const buffer = GetMuteLogsReq.encode(data).finish()
        let [err, pack] = await this.call("GetMuteLogs", buffer, params)
        if (err) {
            this.onBeforeResp("GetMuteLogs", err)
            return {err: err, resp: null}
        } else {
            let resp = GetMuteLogsResp.decode(pack) as any
            this.onBeforeResp("GetMuteLogs", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetUserMuteInfo(req: IGetUserMuteInfoReq, params?: RpcParams) : Promise<{err:number, resp:IGetUserMuteInfoResp}> {
        let data = GetUserMuteInfoReq.create(req)
        this.onBeforeReq("GetUserMuteInfo", data, params)
        const buffer = GetUserMuteInfoReq.encode(data).finish()
        let [err, pack] = await this.call("GetUserMuteInfo", buffer, params)
        if (err) {
            this.onBeforeResp("GetUserMuteInfo", err)
            return {err: err, resp: null}
        } else {
            let resp = GetUserMuteInfoResp.decode(pack) as any
            this.onBeforeResp("GetUserMuteInfo", err, resp)
            return {err: null, resp: resp}
        }
    }
    async UploadNicknameItems(req: IUploadNicknameItemsReq, params?: RpcParams) : Promise<{err:number, resp:IUploadNicknameItemsResp}> {
        let data = UploadNicknameItemsReq.create(req)
        this.onBeforeReq("UploadNicknameItems", data, params)
        const buffer = UploadNicknameItemsReq.encode(data).finish()
        let [err, pack] = await this.call("UploadNicknameItems", buffer, params)
        if (err) {
            this.onBeforeResp("UploadNicknameItems", err)
            return {err: err, resp: null}
        } else {
            let resp = UploadNicknameItemsResp.decode(pack) as any
            this.onBeforeResp("UploadNicknameItems", err, resp)
            return {err: null, resp: resp}
        }
    }
    async UpdateNicknameItem(req: IUpdateNicknameItemReq, params?: RpcParams) : Promise<{err:number, resp:IUpdateNicknameItemResp}> {
        let data = UpdateNicknameItemReq.create(req)
        this.onBeforeReq("UpdateNicknameItem", data, params)
        const buffer = UpdateNicknameItemReq.encode(data).finish()
        let [err, pack] = await this.call("UpdateNicknameItem", buffer, params)
        if (err) {
            this.onBeforeResp("UpdateNicknameItem", err)
            return {err: err, resp: null}
        } else {
            let resp = UpdateNicknameItemResp.decode(pack) as any
            this.onBeforeResp("UpdateNicknameItem", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListNicknameItems(req: IListNicknameItemsReq, params?: RpcParams) : Promise<{err:number, resp:IListNicknameItemsResp}> {
        let data = ListNicknameItemsReq.create(req)
        this.onBeforeReq("ListNicknameItems", data, params)
        const buffer = ListNicknameItemsReq.encode(data).finish()
        let [err, pack] = await this.call("ListNicknameItems", buffer, params)
        if (err) {
            this.onBeforeResp("ListNicknameItems", err)
            return {err: err, resp: null}
        } else {
            let resp = ListNicknameItemsResp.decode(pack) as any
            this.onBeforeResp("ListNicknameItems", err, resp)
            return {err: null, resp: resp}
        }
    }
    async MpffCallBackAfterIdCardChange(req: mpff_user_callback_passport_v1_ICallbackAfterIDCardChangeReq, params?: RpcParams) : Promise<{err:number, resp:mpff_user_callback_passport_v1_ICallbackAfterIDCardChangeResp}> {
        let data = mpff_user_callback_passport_v1_CallbackAfterIDCardChangeReq.create(req)
        this.onBeforeReq("MpffCallBackAfterIdCardChange", data, params)
        const buffer = mpff_user_callback_passport_v1_CallbackAfterIDCardChangeReq.encode(data).finish()
        let [err, pack] = await this.call("MpffCallBackAfterIdCardChange", buffer, params)
        if (err) {
            this.onBeforeResp("MpffCallBackAfterIdCardChange", err)
            return {err: err, resp: null}
        } else {
            let resp = mpff_user_callback_passport_v1_CallbackAfterIDCardChangeResp.decode(pack) as any
            this.onBeforeResp("MpffCallBackAfterIdCardChange", err, resp)
            return {err: null, resp: resp}
        }
    }
    async MpffCallbackAfterBindPhone(req: mpff_user_callback_passport_v1_ICallbackAfterBindPhoneReq, params?: RpcParams) : Promise<{err:number, resp:mpff_user_callback_passport_v1_ICallbackAfterBindPhoneResp}> {
        let data = mpff_user_callback_passport_v1_CallbackAfterBindPhoneReq.create(req)
        this.onBeforeReq("MpffCallbackAfterBindPhone", data, params)
        const buffer = mpff_user_callback_passport_v1_CallbackAfterBindPhoneReq.encode(data).finish()
        let [err, pack] = await this.call("MpffCallbackAfterBindPhone", buffer, params)
        if (err) {
            this.onBeforeResp("MpffCallbackAfterBindPhone", err)
            return {err: err, resp: null}
        } else {
            let resp = mpff_user_callback_passport_v1_CallbackAfterBindPhoneResp.decode(pack) as any
            this.onBeforeResp("MpffCallbackAfterBindPhone", err, resp)
            return {err: null, resp: resp}
        }
    }
    async MpCallbackCallbackNotifyAppUserCancel(req: mp_user_callback_account_v1_ICallbackNotifyAppUserCancelReq, params?: RpcParams) : Promise<{err:number, resp:mp_user_callback_account_v1_ICallbackNotifyAppUserCancelResp}> {
        let data = mp_user_callback_account_v1_CallbackNotifyAppUserCancelReq.create(req)
        this.onBeforeReq("MpCallbackCallbackNotifyAppUserCancel", data, params)
        const buffer = mp_user_callback_account_v1_CallbackNotifyAppUserCancelReq.encode(data).finish()
        let [err, pack] = await this.call("MpCallbackCallbackNotifyAppUserCancel", buffer, params)
        if (err) {
            this.onBeforeResp("MpCallbackCallbackNotifyAppUserCancel", err)
            return {err: err, resp: null}
        } else {
            let resp = mp_user_callback_account_v1_CallbackNotifyAppUserCancelResp.decode(pack) as any
            this.onBeforeResp("MpCallbackCallbackNotifyAppUserCancel", err, resp)
            return {err: null, resp: resp}
        }
    }
}
export const Userinfo = new $Userinfo({
    name: "tss.hall.userinfo.v1",
})
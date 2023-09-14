import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
export enum IntelligentPhoneCheckCode {  
    NOTHIND = 0,  
    NOPAWD = 1,  
    UNREG = 2,  
    INVALID = 3,  
    PAWD = 4,
}
export enum SexValue {  
    UNKNOWN = 0,  
    BOY = 1,  
    GIRL = 2,
}
export enum AccountType {  
    UNKNOW = 0,  
    PHONE = 1,  
    EMAIL = 2,  
    VISITOR = 3,  
    USERCODE = 4,
}
export enum AccountLvEm {  
    LV_VISITOR = 0,  
    LV_USERCODE = 1,  
    LV_RealVerify = 2,  
    LV_Unknow = 4,
}
export enum SmsType {  
    OTHER = 0,  
    REGISTER = 1,  
    PWDCHG = 2,  
    LOGIN = 3,  
    BIND = 4,  
    UNBID = 5,  
    CHANGEBING = 6,
}
export enum BindType {  
    BindTypeUnknown = 0,  
    GETPHONE = 1,  
    GETEMAIL = 2,
}
export enum ThirdBindType {  
    ThirdBindTypeUnknown = 0,  
    FaceBook = 1,  
    WeChat = 2,
}
export interface ILockInfo {
    Appid?: number|null
    End?: number|null
}
@protobuf.Type.d("bgo_account_LockInfo")
export class LockInfo extends protobuf.Message<ILockInfo> {
    constructor(properties: Properties<ILockInfo>) {
        super(properties);
        if (properties) {
            if (properties.Appid) { this.Appid = properties.Appid }
            if (properties.End) { this.End = properties.End }
        }
	}
    @protobuf.Field.d(1, "uint32", "optional", 0)
    public Appid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public End?: number|null = 0
}
export interface IUserInfo {
    sex?: SexValue|null
    name?: string|null
    avatar?: string|null
    extend?: string|null
    UID?: number|null
    bigpic?: string|null
    modTime?: number|null
    isRobot?: boolean|null
    realName?: string|null
    socialSex?: SexValue|null
    socialLocation?: number|null
    socialBirthday?: string|null
    realBirthday?: string|null
    Ext?: string|null
}
@protobuf.Type.d("bgo_account_UserInfo")
export class UserInfo extends protobuf.Message<IUserInfo> {
    constructor(properties: Properties<IUserInfo>) {
        super(properties);
        if (properties) {
            if (properties.sex) { this.sex = properties.sex }
            if (properties.name) { this.name = properties.name }
            if (properties.avatar) { this.avatar = properties.avatar }
            if (properties.extend) { this.extend = properties.extend }
            if (properties.UID) { this.UID = properties.UID }
            if (properties.bigpic) { this.bigpic = properties.bigpic }
            if (properties.modTime) { this.modTime = properties.modTime }
            if (properties.isRobot) { this.isRobot = properties.isRobot }
            if (properties.realName) { this.realName = properties.realName }
            if (properties.socialSex) { this.socialSex = properties.socialSex }
            if (properties.socialLocation) { this.socialLocation = properties.socialLocation }
            if (properties.socialBirthday) { this.socialBirthday = properties.socialBirthday }
            if (properties.realBirthday) { this.realBirthday = properties.realBirthday }
            if (properties.Ext) { this.Ext = properties.Ext }
        }
	}
    @protobuf.Field.d(1, SexValue, "optional", SexValue.UNKNOWN)
    public sex?: SexValue|null = SexValue.UNKNOWN
    @protobuf.Field.d(2, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public avatar?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public extend?: string|null = ""
    @protobuf.Field.d(5, "int64", "optional", 0)
    public UID?: number|null = 0
    @protobuf.Field.d(7, "string", "optional", )
    public bigpic?: string|null = ""
    @protobuf.Field.d(9, "int64", "optional", 0)
    public modTime?: number|null = 0
    @protobuf.Field.d(11, "bool", "optional", false)
    public isRobot?: boolean|null = false
    @protobuf.Field.d(12, "string", "optional", )
    public realName?: string|null = ""
    @protobuf.Field.d(13, SexValue, "optional", SexValue.UNKNOWN)
    public socialSex?: SexValue|null = SexValue.UNKNOWN
    @protobuf.Field.d(14, "int32", "optional", 0)
    public socialLocation?: number|null = 0
    @protobuf.Field.d(15, "string", "optional", )
    public socialBirthday?: string|null = ""
    @protobuf.Field.d(16, "string", "optional", )
    public realBirthday?: string|null = ""
    @protobuf.Field.d(17, "string", "optional", )
    public Ext?: string|null = ""
}
export interface IRegExtInfo {
    os?: string|null
    channel?: string|null
}
@protobuf.Type.d("bgo_account_RegExtInfo")
export class RegExtInfo extends protobuf.Message<IRegExtInfo> {
    constructor(properties: Properties<IRegExtInfo>) {
        super(properties);
        if (properties) {
            if (properties.os) { this.os = properties.os }
            if (properties.channel) { this.channel = properties.channel }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public os?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public channel?: string|null = ""
}
export interface IBindRecommendRegRequest {
    uidRec?: number|null
    uidBeRec?: number|null
}
@protobuf.Type.d("bgo_account_BindRecommendRegRequest")
export class BindRecommendRegRequest extends protobuf.Message<IBindRecommendRegRequest> {
    constructor(properties: Properties<IBindRecommendRegRequest>) {
        super(properties);
        if (properties) {
            if (properties.uidRec) { this.uidRec = properties.uidRec }
            if (properties.uidBeRec) { this.uidBeRec = properties.uidBeRec }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uidRec?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public uidBeRec?: number|null = 0
}
export interface IBindRecommendRegResponse {
    result?: number|null
}
@protobuf.Type.d("bgo_account_BindRecommendRegResponse")
export class BindRecommendRegResponse extends protobuf.Message<IBindRecommendRegResponse> {
    constructor(properties: Properties<IBindRecommendRegResponse>) {
        super(properties);
        if (properties) {
            if (properties.result) { this.result = properties.result }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public result?: number|null = 0
}
export interface IRecommendRegItem {
    uid?: number|null
    time?: number|null
}
@protobuf.Type.d("bgo_account_RecommendRegItem")
export class RecommendRegItem extends protobuf.Message<IRecommendRegItem> {
    constructor(properties: Properties<IRecommendRegItem>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.time) { this.time = properties.time }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public time?: number|null = 0
}
export interface IGetRecommendRegListRequest {
    uidRec?: number|null
}
@protobuf.Type.d("bgo_account_GetRecommendRegListRequest")
export class GetRecommendRegListRequest extends protobuf.Message<IGetRecommendRegListRequest> {
    constructor(properties: Properties<IGetRecommendRegListRequest>) {
        super(properties);
        if (properties) {
            if (properties.uidRec) { this.uidRec = properties.uidRec }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uidRec?: number|null = 0
}
export interface IGetRecommendRegListResponse {
    result?: number|null
    list?: IRecommendRegItem[]
}
@protobuf.Type.d("bgo_account_GetRecommendRegListResponse")
export class GetRecommendRegListResponse extends protobuf.Message<IGetRecommendRegListResponse> {
    constructor(properties: Properties<IGetRecommendRegListResponse>) {
        super(properties);
        if (properties) {
            if (properties.result) { this.result = properties.result }
            if (properties.list) { this.list = []; properties.list.forEach((value, index)=>{this.list[index] = RecommendRegItem.create(properties.list[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public result?: number|null = 0
    @protobuf.Field.d(2, "bgo_account_RecommendRegItem", "repeated")
    public list?: RecommendRegItem[] = []
}
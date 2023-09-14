import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  Void as base_Void,IVoid as base_IVoid ,  } from "idl/base/base"
import {  ExpireData as tss_common_ExpireData,IExpireData as tss_common_IExpireData ,  Way as tss_common_Way ,  Asset as tss_common_Asset,IAsset as tss_common_IAsset ,  AssetItem as tss_common_AssetItem,IAssetItem as tss_common_IAssetItem ,  ItemType as tss_common_ItemType ,  } from "idl/tss/common/common_define"
import {  DynamicAssetItems as tss_hall_common_DynamicAssetItems,IDynamicAssetItems as tss_hall_common_IDynamicAssetItems ,  } from "idl/tss/hall/common/assets"
export enum MailTaskState {  
    MailTaskStateUnknown = 0,  
    MailTaskStateInit = 1,  
    MailTaskStateSending = 2,  
    MailTaskStateDone = 3,  
    MailTaskStateFailed = 4,  
    MailTaskStateRevokeing = 5,  
    MailTaskStateRevokeSuccess = 6,  
    MailTaskStateRevokeFailed = 7,
}
export enum ChangeType {  
    ChangeTypeUnknown = 0,  
    ChangeTypeIncr = 1,  
    ChangeTypeDecr = 2,
}
export enum SenderType {  
    SenderTypeSystem = 0,  
    SenderTypeFriend = 1,
}
export enum SubType {  
    SubTypeDefault = 0,  
    SubTypeLargess = 1,
}
export enum RefundService {  
    ServiceUnknown = 0,  
    ServiceProp = 1,  
    ServiceWallet = 2,
}
export enum SendWay {  
    SendWayDefault = 0,  
    SendWayOnLogin = 1,
}
export enum RevokeState {  
    RevokeStateUnknown = 0,  
    RevokeStateSuccess = 1,  
    RevokeStateFailed = 2,
}
export enum OperateType {  
    OperateTypeUnknown = 0,  
    OperateTypeRevoke = 1,
}
export interface IMailTime {
    expire?: tss_common_IExpireData
    receiveTime?: number|null
}
@protobuf.Type.d("tss_hall_mail_v2_MailTime")
export class MailTime extends protobuf.Message<IMailTime> {
    constructor(properties: Properties<IMailTime>) {
        super(properties);
        if (properties) {
            if (properties.expire) { this.expire = tss_common_ExpireData.create(properties.expire) as any }
            if (properties.receiveTime) { this.receiveTime = properties.receiveTime }
        }
	}
    @protobuf.Field.d(1, "tss_common_ExpireData", "optional")
    public expire?: tss_common_ExpireData|null
    @protobuf.Field.d(3, "int64", "optional", 0)
    public receiveTime?: number|null = 0
}
export interface IAwardData {
    way?: tss_common_Way|null
    asset?: tss_common_IAsset
    scene?: { [k: string]: string|null }
    assets?: tss_common_IAssetItem[]
    dynamicAssets?: tss_hall_common_IDynamicAssetItems[]
}
@protobuf.Type.d("tss_hall_mail_v2_AwardData")
export class AwardData extends protobuf.Message<IAwardData> {
    constructor(properties: Properties<IAwardData>) {
        super(properties);
        if (properties) {
            if (properties.way) { this.way = properties.way }
            if (properties.asset) { this.asset = tss_common_Asset.create(properties.asset) as any }
            if (properties.scene) { this.scene = properties.scene }
            if (properties.assets) { this.assets = []; properties.assets.forEach((value, index)=>{this.assets[index] = tss_common_AssetItem.create(properties.assets[index]) as any})}
            if (properties.dynamicAssets) { this.dynamicAssets = []; properties.dynamicAssets.forEach((value, index)=>{this.dynamicAssets[index] = tss_hall_common_DynamicAssetItems.create(properties.dynamicAssets[index]) as any})}
        }
	}
    @protobuf.Field.d(1, tss_common_Way, "optional", tss_common_Way.WayNone)
    public way?: tss_common_Way|null = tss_common_Way.WayNone
    @protobuf.Field.d(2, "tss_common_Asset", "optional")
    public asset?: tss_common_Asset|null
    @protobuf.MapField.d(3, "string", "string")
    public scene?: { [k: string]: string|null } = {}
    @protobuf.Field.d(4, "tss_common_AssetItem", "repeated")
    public assets?: tss_common_AssetItem[] = []
    @protobuf.Field.d(5, "tss_hall_common_DynamicAssetItems", "repeated")
    public dynamicAssets?: tss_hall_common_DynamicAssetItems[] = []
}
export interface ISysMaillTmpl {
    origin?: string|null
    title?: string|null
    content?: string|null
    changeReason?: string|null
    expire?: tss_common_IExpireData
    aData?: IAwardData
    MailExtra?: Uint8Array
    URL?: string|null
    isShowContent?: boolean|null
    btnContent?: string|null
    sendType?: SenderType|null
    senderUid?: number|null
    subType?: SubType|null
    assetItem?: tss_common_IAssetItem
    isRefundMail?: boolean|null
    refundService?: RefundService|null
    batchId?: string|null
}
@protobuf.Type.d("tss_hall_mail_v2_SysMaillTmpl")
export class SysMaillTmpl extends protobuf.Message<ISysMaillTmpl> {
    constructor(properties: Properties<ISysMaillTmpl>) {
        super(properties);
        if (properties) {
            if (properties.origin) { this.origin = properties.origin }
            if (properties.title) { this.title = properties.title }
            if (properties.content) { this.content = properties.content }
            if (properties.changeReason) { this.changeReason = properties.changeReason }
            if (properties.expire) { this.expire = tss_common_ExpireData.create(properties.expire) as any }
            if (properties.aData) { this.aData = AwardData.create(properties.aData) as any }
            if (properties.MailExtra) { this.MailExtra = properties.MailExtra }
            if (properties.URL) { this.URL = properties.URL }
            if (properties.isShowContent) { this.isShowContent = properties.isShowContent }
            if (properties.btnContent) { this.btnContent = properties.btnContent }
            if (properties.sendType) { this.sendType = properties.sendType }
            if (properties.senderUid) { this.senderUid = properties.senderUid }
            if (properties.subType) { this.subType = properties.subType }
            if (properties.assetItem) { this.assetItem = tss_common_AssetItem.create(properties.assetItem) as any }
            if (properties.isRefundMail) { this.isRefundMail = properties.isRefundMail }
            if (properties.refundService) { this.refundService = properties.refundService }
            if (properties.batchId) { this.batchId = properties.batchId }
        }
	}
    @protobuf.Field.d(2, "string", "optional", )
    public origin?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public title?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public content?: string|null = ""
    @protobuf.Field.d(8, "string", "optional", )
    public changeReason?: string|null = ""
    @protobuf.Field.d(6, "tss_common_ExpireData", "optional")
    public expire?: tss_common_ExpireData|null
    @protobuf.Field.d(7, "tss_hall_mail_v2_AwardData", "optional")
    public aData?: AwardData|null
    @protobuf.Field.d(10, "bytes", "optional", [])
    public MailExtra?: Uint8Array
    @protobuf.Field.d(11, "string", "optional", )
    public URL?: string|null = ""
    @protobuf.Field.d(12, "bool", "optional", false)
    public isShowContent?: boolean|null = false
    @protobuf.Field.d(13, "string", "optional", )
    public btnContent?: string|null = ""
    @protobuf.Field.d(14, SenderType, "optional", SenderType.SenderTypeSystem)
    public sendType?: SenderType|null = SenderType.SenderTypeSystem
    @protobuf.Field.d(15, "int64", "optional", 0)
    public senderUid?: number|null = 0
    @protobuf.Field.d(16, SubType, "optional", SubType.SubTypeDefault)
    public subType?: SubType|null = SubType.SubTypeDefault
    @protobuf.Field.d(17, "tss_common_AssetItem", "optional")
    public assetItem?: tss_common_AssetItem|null
    @protobuf.Field.d(18, "bool", "optional", false)
    public isRefundMail?: boolean|null = false
    @protobuf.Field.d(19, RefundService, "optional", RefundService.ServiceUnknown)
    public refundService?: RefundService|null = RefundService.ServiceUnknown
    @protobuf.Field.d(20, "string", "optional", )
    public batchId?: string|null = ""
}
export interface ISysMailData {
    mid?: string|null
    origin?: string|null
    title?: string|null
    content?: string|null
    isRead?: boolean|null
    expiredAt?: number|null
    aData?: IAwardData
    changeReason?: string|null
    createdAt?: number|null
    isAccept?: boolean|null
    URL?: string|null
    isShowContent?: boolean|null
    btnContent?: string|null
}
@protobuf.Type.d("tss_hall_mail_v2_SysMailData")
export class SysMailData extends protobuf.Message<ISysMailData> {
    constructor(properties: Properties<ISysMailData>) {
        super(properties);
        if (properties) {
            if (properties.mid) { this.mid = properties.mid }
            if (properties.origin) { this.origin = properties.origin }
            if (properties.title) { this.title = properties.title }
            if (properties.content) { this.content = properties.content }
            if (properties.isRead) { this.isRead = properties.isRead }
            if (properties.expiredAt) { this.expiredAt = properties.expiredAt }
            if (properties.aData) { this.aData = AwardData.create(properties.aData) as any }
            if (properties.changeReason) { this.changeReason = properties.changeReason }
            if (properties.createdAt) { this.createdAt = properties.createdAt }
            if (properties.isAccept) { this.isAccept = properties.isAccept }
            if (properties.URL) { this.URL = properties.URL }
            if (properties.isShowContent) { this.isShowContent = properties.isShowContent }
            if (properties.btnContent) { this.btnContent = properties.btnContent }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public mid?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public origin?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public title?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public content?: string|null = ""
    @protobuf.Field.d(5, "bool", "optional", false)
    public isRead?: boolean|null = false
    @protobuf.Field.d(6, "int64", "optional", 0)
    public expiredAt?: number|null = 0
    @protobuf.Field.d(7, "tss_hall_mail_v2_AwardData", "optional")
    public aData?: AwardData|null
    @protobuf.Field.d(8, "string", "optional", )
    public changeReason?: string|null = ""
    @protobuf.Field.d(9, "int64", "optional", 0)
    public createdAt?: number|null = 0
    @protobuf.Field.d(10, "bool", "optional", false)
    public isAccept?: boolean|null = false
    @protobuf.Field.d(11, "string", "optional", )
    public URL?: string|null = ""
    @protobuf.Field.d(12, "bool", "optional", false)
    public isShowContent?: boolean|null = false
    @protobuf.Field.d(13, "string", "optional", )
    public btnContent?: string|null = ""
}
export interface IBatchSendSysMailReq {
    groupID?: string|null
    UIDs?: number[]
    data?: ISysMaillTmpl
    MailExtra?: Uint8Array
    operator?: string|null
}
@protobuf.Type.d("tss_hall_mail_v2_BatchSendSysMailReq")
export class BatchSendSysMailReq extends protobuf.Message<IBatchSendSysMailReq> {
    constructor(properties: Properties<IBatchSendSysMailReq>) {
        super(properties);
        if (properties) {
            if (properties.groupID) { this.groupID = properties.groupID }
            if (properties.UIDs) { this.UIDs = []; properties.UIDs.forEach((value, index)=>{this.UIDs[index] = properties.UIDs[index]})}
            if (properties.data) { this.data = SysMaillTmpl.create(properties.data) as any }
            if (properties.MailExtra) { this.MailExtra = properties.MailExtra }
            if (properties.operator) { this.operator = properties.operator }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public groupID?: string|null = ""
    @protobuf.Field.d(2, "int64", "repeated", [])
    public UIDs?: number[] = []
    @protobuf.Field.d(3, "tss_hall_mail_v2_SysMaillTmpl", "optional")
    public data?: SysMaillTmpl|null
    @protobuf.Field.d(4, "bytes", "optional", [])
    public MailExtra?: Uint8Array
    @protobuf.Field.d(5, "string", "optional", )
    public operator?: string|null = ""
}
export interface IBatchSendSysMailResp {
}
@protobuf.Type.d("tss_hall_mail_v2_BatchSendSysMailResp")
export class BatchSendSysMailResp extends protobuf.Message<IBatchSendSysMailResp> {
    constructor(properties: Properties<IBatchSendSysMailResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IListSysMailsReq {
    UID?: number|null
    page?: number|null
    pageSize?: number|null
    senderType?: SenderType|null
}
@protobuf.Type.d("tss_hall_mail_v2_ListSysMailsReq")
export class ListSysMailsReq extends protobuf.Message<IListSysMailsReq> {
    constructor(properties: Properties<IListSysMailsReq>) {
        super(properties);
        if (properties) {
            if (properties.UID) { this.UID = properties.UID }
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.senderType) { this.senderType = properties.senderType }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public UID?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(3, "int32", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(4, SenderType, "optional", SenderType.SenderTypeSystem)
    public senderType?: SenderType|null = SenderType.SenderTypeSystem
}
export interface IMailBriefData {
    mid?: string|null
    origin?: string|null
    title?: string|null
    isRead?: boolean|null
    expiredAt?: number|null
    isExistAward?: boolean|null
    isAccept?: boolean|null
    createdAt?: number|null
    content?: string|null
    URL?: string|null
    isShowContent?: boolean|null
    btnContent?: string|null
    senderUid?: number|null
    isNew?: boolean|null
    subType?: SubType|null
    assetItem?: tss_common_IAssetItem
    assetItems?: tss_common_IAssetItem[]
    dynamicAssets?: tss_hall_common_IDynamicAssetItems[]
}
@protobuf.Type.d("tss_hall_mail_v2_MailBriefData")
export class MailBriefData extends protobuf.Message<IMailBriefData> {
    constructor(properties: Properties<IMailBriefData>) {
        super(properties);
        if (properties) {
            if (properties.mid) { this.mid = properties.mid }
            if (properties.origin) { this.origin = properties.origin }
            if (properties.title) { this.title = properties.title }
            if (properties.isRead) { this.isRead = properties.isRead }
            if (properties.expiredAt) { this.expiredAt = properties.expiredAt }
            if (properties.isExistAward) { this.isExistAward = properties.isExistAward }
            if (properties.isAccept) { this.isAccept = properties.isAccept }
            if (properties.createdAt) { this.createdAt = properties.createdAt }
            if (properties.content) { this.content = properties.content }
            if (properties.URL) { this.URL = properties.URL }
            if (properties.isShowContent) { this.isShowContent = properties.isShowContent }
            if (properties.btnContent) { this.btnContent = properties.btnContent }
            if (properties.senderUid) { this.senderUid = properties.senderUid }
            if (properties.isNew) { this.isNew = properties.isNew }
            if (properties.subType) { this.subType = properties.subType }
            if (properties.assetItem) { this.assetItem = tss_common_AssetItem.create(properties.assetItem) as any }
            if (properties.assetItems) { this.assetItems = []; properties.assetItems.forEach((value, index)=>{this.assetItems[index] = tss_common_AssetItem.create(properties.assetItems[index]) as any})}
            if (properties.dynamicAssets) { this.dynamicAssets = []; properties.dynamicAssets.forEach((value, index)=>{this.dynamicAssets[index] = tss_hall_common_DynamicAssetItems.create(properties.dynamicAssets[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public mid?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public origin?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public title?: string|null = ""
    @protobuf.Field.d(4, "bool", "optional", false)
    public isRead?: boolean|null = false
    @protobuf.Field.d(5, "int64", "optional", 0)
    public expiredAt?: number|null = 0
    @protobuf.Field.d(6, "bool", "optional", false)
    public isExistAward?: boolean|null = false
    @protobuf.Field.d(7, "bool", "optional", false)
    public isAccept?: boolean|null = false
    @protobuf.Field.d(8, "int64", "optional", 0)
    public createdAt?: number|null = 0
    @protobuf.Field.d(9, "string", "optional", )
    public content?: string|null = ""
    @protobuf.Field.d(10, "string", "optional", )
    public URL?: string|null = ""
    @protobuf.Field.d(11, "bool", "optional", false)
    public isShowContent?: boolean|null = false
    @protobuf.Field.d(12, "string", "optional", )
    public btnContent?: string|null = ""
    @protobuf.Field.d(13, "int64", "optional", 0)
    public senderUid?: number|null = 0
    @protobuf.Field.d(14, "bool", "optional", false)
    public isNew?: boolean|null = false
    @protobuf.Field.d(16, SubType, "optional", SubType.SubTypeDefault)
    public subType?: SubType|null = SubType.SubTypeDefault
    @protobuf.Field.d(17, "tss_common_AssetItem", "optional")
    public assetItem?: tss_common_AssetItem|null
    @protobuf.Field.d(18, "tss_common_AssetItem", "repeated")
    public assetItems?: tss_common_AssetItem[] = []
    @protobuf.Field.d(19, "tss_hall_common_DynamicAssetItems", "repeated")
    public dynamicAssets?: tss_hall_common_DynamicAssetItems[] = []
}
export interface IGetSysMailResp {
    data?: ISysMailData
    total?: number|null
    unAcceptNum?: number|null
}
@protobuf.Type.d("tss_hall_mail_v2_GetSysMailResp")
export class GetSysMailResp extends protobuf.Message<IGetSysMailResp> {
    constructor(properties: Properties<IGetSysMailResp>) {
        super(properties);
        if (properties) {
            if (properties.data) { this.data = SysMailData.create(properties.data) as any }
            if (properties.total) { this.total = properties.total }
            if (properties.unAcceptNum) { this.unAcceptNum = properties.unAcceptNum }
        }
	}
    @protobuf.Field.d(2, "tss_hall_mail_v2_SysMailData", "optional")
    public data?: SysMailData|null
    @protobuf.Field.d(3, "int64", "optional", 0)
    public total?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public unAcceptNum?: number|null = 0
}
export interface IListSysMailsResp {
    data?: IMailBriefData[]
    total?: number|null
    unAcceptNum?: number|null
}
@protobuf.Type.d("tss_hall_mail_v2_ListSysMailsResp")
export class ListSysMailsResp extends protobuf.Message<IListSysMailsResp> {
    constructor(properties: Properties<IListSysMailsResp>) {
        super(properties);
        if (properties) {
            if (properties.data) { this.data = []; properties.data.forEach((value, index)=>{this.data[index] = MailBriefData.create(properties.data[index]) as any})}
            if (properties.total) { this.total = properties.total }
            if (properties.unAcceptNum) { this.unAcceptNum = properties.unAcceptNum }
        }
	}
    @protobuf.Field.d(2, "tss_hall_mail_v2_MailBriefData", "repeated")
    public data?: MailBriefData[] = []
    @protobuf.Field.d(3, "int64", "optional", 0)
    public total?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public unAcceptNum?: number|null = 0
}
export interface IGetSysMailReq {
    MiD?: string|null
}
@protobuf.Type.d("tss_hall_mail_v2_GetSysMailReq")
export class GetSysMailReq extends protobuf.Message<IGetSysMailReq> {
    constructor(properties: Properties<IGetSysMailReq>) {
        super(properties);
        if (properties) {
            if (properties.MiD) { this.MiD = properties.MiD }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public MiD?: string|null = ""
}
export interface IGetUnreadMailNumReq {
    UID?: number|null
}
@protobuf.Type.d("tss_hall_mail_v2_GetUnreadMailNumReq")
export class GetUnreadMailNumReq extends protobuf.Message<IGetUnreadMailNumReq> {
    constructor(properties: Properties<IGetUnreadMailNumReq>) {
        super(properties);
        if (properties) {
            if (properties.UID) { this.UID = properties.UID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public UID?: number|null = 0
}
export interface IGetUnreadMailNumResp {
    friendRedDotNum?: number|null
    systemRedDotNum?: number|null
}
@protobuf.Type.d("tss_hall_mail_v2_GetUnreadMailNumResp")
export class GetUnreadMailNumResp extends protobuf.Message<IGetUnreadMailNumResp> {
    constructor(properties: Properties<IGetUnreadMailNumResp>) {
        super(properties);
        if (properties) {
            if (properties.friendRedDotNum) { this.friendRedDotNum = properties.friendRedDotNum }
            if (properties.systemRedDotNum) { this.systemRedDotNum = properties.systemRedDotNum }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public friendRedDotNum?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public systemRedDotNum?: number|null = 0
}
export interface IAcceptAwardReq {
    UID?: number|null
    MID?: string|null
}
@protobuf.Type.d("tss_hall_mail_v2_AcceptAwardReq")
export class AcceptAwardReq extends protobuf.Message<IAcceptAwardReq> {
    constructor(properties: Properties<IAcceptAwardReq>) {
        super(properties);
        if (properties) {
            if (properties.UID) { this.UID = properties.UID }
            if (properties.MID) { this.MID = properties.MID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public UID?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public MID?: string|null = ""
}
export interface IAcceptAwardResp {
    asset?: tss_common_IAsset
}
@protobuf.Type.d("tss_hall_mail_v2_AcceptAwardResp")
export class AcceptAwardResp extends protobuf.Message<IAcceptAwardResp> {
    constructor(properties: Properties<IAcceptAwardResp>) {
        super(properties);
        if (properties) {
            if (properties.asset) { this.asset = tss_common_Asset.create(properties.asset) as any }
        }
	}
    @protobuf.Field.d(1, "tss_common_Asset", "optional")
    public asset?: tss_common_Asset|null
}
export interface IBatchAcceptAwardReq {
    UID?: number|null
    MIDs?: string[]
}
@protobuf.Type.d("tss_hall_mail_v2_BatchAcceptAwardReq")
export class BatchAcceptAwardReq extends protobuf.Message<IBatchAcceptAwardReq> {
    constructor(properties: Properties<IBatchAcceptAwardReq>) {
        super(properties);
        if (properties) {
            if (properties.UID) { this.UID = properties.UID }
            if (properties.MIDs) { this.MIDs = []; properties.MIDs.forEach((value, index)=>{this.MIDs[index] = properties.MIDs[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public UID?: number|null = 0
    @protobuf.Field.d(2, "string", "repeated", [])
    public MIDs?: string[] = []
}
export interface IBatchReadMailReq {
    UID?: number|null
}
@protobuf.Type.d("tss_hall_mail_v2_BatchReadMailReq")
export class BatchReadMailReq extends protobuf.Message<IBatchReadMailReq> {
    constructor(properties: Properties<IBatchReadMailReq>) {
        super(properties);
        if (properties) {
            if (properties.UID) { this.UID = properties.UID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public UID?: number|null = 0
}
export interface IBatchAwardData {
    MID?: string|null
    asset?: tss_common_IAsset
}
@protobuf.Type.d("tss_hall_mail_v2_BatchAwardData")
export class BatchAwardData extends protobuf.Message<IBatchAwardData> {
    constructor(properties: Properties<IBatchAwardData>) {
        super(properties);
        if (properties) {
            if (properties.MID) { this.MID = properties.MID }
            if (properties.asset) { this.asset = tss_common_Asset.create(properties.asset) as any }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public MID?: string|null = ""
    @protobuf.Field.d(2, "tss_common_Asset", "optional")
    public asset?: tss_common_Asset|null
}
export interface IBatchAcceptAwardResp {
    bData?: IBatchAwardData[]
}
@protobuf.Type.d("tss_hall_mail_v2_BatchAcceptAwardResp")
export class BatchAcceptAwardResp extends protobuf.Message<IBatchAcceptAwardResp> {
    constructor(properties: Properties<IBatchAcceptAwardResp>) {
        super(properties);
        if (properties) {
            if (properties.bData) { this.bData = []; properties.bData.forEach((value, index)=>{this.bData[index] = BatchAwardData.create(properties.bData[index]) as any})}
        }
	}
    @protobuf.Field.d(2, "tss_hall_mail_v2_BatchAwardData", "repeated")
    public bData?: BatchAwardData[] = []
}
export interface INotifySysMailResp {
    friendRedDotNum?: number|null
    systemRedDotNum?: number|null
    data?: IMailBriefData
}
@protobuf.Type.d("tss_hall_mail_v2_NotifySysMailResp")
export class NotifySysMailResp extends protobuf.Message<INotifySysMailResp> {
    constructor(properties: Properties<INotifySysMailResp>) {
        super(properties);
        if (properties) {
            if (properties.friendRedDotNum) { this.friendRedDotNum = properties.friendRedDotNum }
            if (properties.systemRedDotNum) { this.systemRedDotNum = properties.systemRedDotNum }
            if (properties.data) { this.data = MailBriefData.create(properties.data) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public friendRedDotNum?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public systemRedDotNum?: number|null = 0
    @protobuf.Field.d(3, "tss_hall_mail_v2_MailBriefData", "optional")
    public data?: MailBriefData|null
}
export interface IDeleteMailReq {
    MiD?: string|null
}
@protobuf.Type.d("tss_hall_mail_v2_DeleteMailReq")
export class DeleteMailReq extends protobuf.Message<IDeleteMailReq> {
    constructor(properties: Properties<IDeleteMailReq>) {
        super(properties);
        if (properties) {
            if (properties.MiD) { this.MiD = properties.MiD }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public MiD?: string|null = ""
}
export interface IListBatchSendMailLogReq {
    itemType?: tss_common_ItemType|null
    page?: number|null
    pageSize?: number|null
}
@protobuf.Type.d("tss_hall_mail_v2_ListBatchSendMailLogReq")
export class ListBatchSendMailLogReq extends protobuf.Message<IListBatchSendMailLogReq> {
    constructor(properties: Properties<IListBatchSendMailLogReq>) {
        super(properties);
        if (properties) {
            if (properties.itemType) { this.itemType = properties.itemType }
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
        }
	}
    @protobuf.Field.d(1, tss_common_ItemType, "optional", tss_common_ItemType.ItemTypeUnknown)
    public itemType?: tss_common_ItemType|null = tss_common_ItemType.ItemTypeUnknown
    @protobuf.Field.d(2, "int32", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(3, "int32", "optional", 0)
    public pageSize?: number|null = 0
}
export interface ISendMailLog {
    objectID?: string|null
    createAt?: number|null
    itemType?: tss_common_ItemType|null
    propID?: number|null
    propName?: string|null
    num?: number|null
    expireAt?: number|null
    way?: tss_common_Way|null
    groupID?: string|null
    groupName?: string|null
    UIDs?: number[]
    isSuccess?: boolean|null
    operator?: string|null
}
@protobuf.Type.d("tss_hall_mail_v2_SendMailLog")
export class SendMailLog extends protobuf.Message<ISendMailLog> {
    constructor(properties: Properties<ISendMailLog>) {
        super(properties);
        if (properties) {
            if (properties.objectID) { this.objectID = properties.objectID }
            if (properties.createAt) { this.createAt = properties.createAt }
            if (properties.itemType) { this.itemType = properties.itemType }
            if (properties.propID) { this.propID = properties.propID }
            if (properties.propName) { this.propName = properties.propName }
            if (properties.num) { this.num = properties.num }
            if (properties.expireAt) { this.expireAt = properties.expireAt }
            if (properties.way) { this.way = properties.way }
            if (properties.groupID) { this.groupID = properties.groupID }
            if (properties.groupName) { this.groupName = properties.groupName }
            if (properties.UIDs) { this.UIDs = []; properties.UIDs.forEach((value, index)=>{this.UIDs[index] = properties.UIDs[index]})}
            if (properties.isSuccess) { this.isSuccess = properties.isSuccess }
            if (properties.operator) { this.operator = properties.operator }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public objectID?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public createAt?: number|null = 0
    @protobuf.Field.d(3, tss_common_ItemType, "optional", tss_common_ItemType.ItemTypeUnknown)
    public itemType?: tss_common_ItemType|null = tss_common_ItemType.ItemTypeUnknown
    @protobuf.Field.d(4, "int64", "optional", 0)
    public propID?: number|null = 0
    @protobuf.Field.d(5, "string", "optional", )
    public propName?: string|null = ""
    @protobuf.Field.d(6, "int32", "optional", 0)
    public num?: number|null = 0
    @protobuf.Field.d(7, "int64", "optional", 0)
    public expireAt?: number|null = 0
    @protobuf.Field.d(9, tss_common_Way, "optional", tss_common_Way.WayNone)
    public way?: tss_common_Way|null = tss_common_Way.WayNone
    @protobuf.Field.d(10, "string", "optional", )
    public groupID?: string|null = ""
    @protobuf.Field.d(11, "string", "optional", )
    public groupName?: string|null = ""
    @protobuf.Field.d(12, "int64", "repeated", [])
    public UIDs?: number[] = []
    @protobuf.Field.d(13, "bool", "optional", false)
    public isSuccess?: boolean|null = false
    @protobuf.Field.d(14, "string", "optional", )
    public operator?: string|null = ""
}
export interface IListBatchSendMailLogRsp {
    logs?: ISendMailLog[]
    totalSize?: number|null
}
@protobuf.Type.d("tss_hall_mail_v2_ListBatchSendMailLogRsp")
export class ListBatchSendMailLogRsp extends protobuf.Message<IListBatchSendMailLogRsp> {
    constructor(properties: Properties<IListBatchSendMailLogRsp>) {
        super(properties);
        if (properties) {
            if (properties.logs) { this.logs = []; properties.logs.forEach((value, index)=>{this.logs[index] = SendMailLog.create(properties.logs[index]) as any})}
            if (properties.totalSize) { this.totalSize = properties.totalSize }
        }
	}
    @protobuf.Field.d(1, "tss_hall_mail_v2_SendMailLog", "repeated")
    public logs?: SendMailLog[] = []
    @protobuf.Field.d(2, "int32", "optional", 0)
    public totalSize?: number|null = 0
}
export interface IDeleteAllUserMailReq {
    uid?: number|null
    senderType?: SenderType|null
}
@protobuf.Type.d("tss_hall_mail_v2_DeleteAllUserMailReq")
export class DeleteAllUserMailReq extends protobuf.Message<IDeleteAllUserMailReq> {
    constructor(properties: Properties<IDeleteAllUserMailReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.senderType) { this.senderType = properties.senderType }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, SenderType, "optional", SenderType.SenderTypeSystem)
    public senderType?: SenderType|null = SenderType.SenderTypeSystem
}
export interface IDeleteAllUserMailResp {
    deleteCnt?: number|null
}
@protobuf.Type.d("tss_hall_mail_v2_DeleteAllUserMailResp")
export class DeleteAllUserMailResp extends protobuf.Message<IDeleteAllUserMailResp> {
    constructor(properties: Properties<IDeleteAllUserMailResp>) {
        super(properties);
        if (properties) {
            if (properties.deleteCnt) { this.deleteCnt = properties.deleteCnt }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public deleteCnt?: number|null = 0
}
export interface IClearUserNewMailFlagReq {
    uid?: number|null
    senderType?: SenderType|null
}
@protobuf.Type.d("tss_hall_mail_v2_ClearUserNewMailFlagReq")
export class ClearUserNewMailFlagReq extends protobuf.Message<IClearUserNewMailFlagReq> {
    constructor(properties: Properties<IClearUserNewMailFlagReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.senderType) { this.senderType = properties.senderType }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, SenderType, "optional", SenderType.SenderTypeSystem)
    public senderType?: SenderType|null = SenderType.SenderTypeSystem
}
export interface IDeleteMailResp {
}
@protobuf.Type.d("tss_hall_mail_v2_DeleteMailResp")
export class DeleteMailResp extends protobuf.Message<IDeleteMailResp> {
    constructor(properties: Properties<IDeleteMailResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IMailTask {
    groupID?: string|null
    UIDs?: number[]
    tmpl?: ISysMaillTmpl
    operator?: string|null
    batchID?: string|null
    state?: MailTaskState|null
    groupName?: string|null
    createdAt?: number|null
    way?: tss_common_Way|null
    appIDs?: string[]
    minVersion?: number|null
    maxVersion?: number|null
    receiveBeginAt?: number|null
    receiveEndAt?: number|null
    sendWay?: SendWay|null
}
@protobuf.Type.d("tss_hall_mail_v2_MailTask")
export class MailTask extends protobuf.Message<IMailTask> {
    constructor(properties: Properties<IMailTask>) {
        super(properties);
        if (properties) {
            if (properties.groupID) { this.groupID = properties.groupID }
            if (properties.UIDs) { this.UIDs = []; properties.UIDs.forEach((value, index)=>{this.UIDs[index] = properties.UIDs[index]})}
            if (properties.tmpl) { this.tmpl = SysMaillTmpl.create(properties.tmpl) as any }
            if (properties.operator) { this.operator = properties.operator }
            if (properties.batchID) { this.batchID = properties.batchID }
            if (properties.state) { this.state = properties.state }
            if (properties.groupName) { this.groupName = properties.groupName }
            if (properties.createdAt) { this.createdAt = properties.createdAt }
            if (properties.way) { this.way = properties.way }
            if (properties.appIDs) { this.appIDs = []; properties.appIDs.forEach((value, index)=>{this.appIDs[index] = properties.appIDs[index]})}
            if (properties.minVersion) { this.minVersion = properties.minVersion }
            if (properties.maxVersion) { this.maxVersion = properties.maxVersion }
            if (properties.receiveBeginAt) { this.receiveBeginAt = properties.receiveBeginAt }
            if (properties.receiveEndAt) { this.receiveEndAt = properties.receiveEndAt }
            if (properties.sendWay) { this.sendWay = properties.sendWay }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public groupID?: string|null = ""
    @protobuf.Field.d(2, "int64", "repeated", [])
    public UIDs?: number[] = []
    @protobuf.Field.d(3, "tss_hall_mail_v2_SysMaillTmpl", "optional")
    public tmpl?: SysMaillTmpl|null
    @protobuf.Field.d(4, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public batchID?: string|null = ""
    @protobuf.Field.d(6, MailTaskState, "optional", MailTaskState.MailTaskStateUnknown)
    public state?: MailTaskState|null = MailTaskState.MailTaskStateUnknown
    @protobuf.Field.d(7, "string", "optional", )
    public groupName?: string|null = ""
    @protobuf.Field.d(8, "int64", "optional", 0)
    public createdAt?: number|null = 0
    @protobuf.Field.d(9, tss_common_Way, "optional", tss_common_Way.WayNone)
    public way?: tss_common_Way|null = tss_common_Way.WayNone
    @protobuf.Field.d(10, "string", "repeated", [])
    public appIDs?: string[] = []
    @protobuf.Field.d(11, "int64", "optional", 0)
    public minVersion?: number|null = 0
    @protobuf.Field.d(12, "int64", "optional", 0)
    public maxVersion?: number|null = 0
    @protobuf.Field.d(13, "int64", "optional", 0)
    public receiveBeginAt?: number|null = 0
    @protobuf.Field.d(14, "int64", "optional", 0)
    public receiveEndAt?: number|null = 0
    @protobuf.Field.d(15, SendWay, "optional", SendWay.SendWayDefault)
    public sendWay?: SendWay|null = SendWay.SendWayDefault
}
export interface ICreateSysMailTaskReq {
    task?: IMailTask
}
@protobuf.Type.d("tss_hall_mail_v2_CreateSysMailTaskReq")
export class CreateSysMailTaskReq extends protobuf.Message<ICreateSysMailTaskReq> {
    constructor(properties: Properties<ICreateSysMailTaskReq>) {
        super(properties);
        if (properties) {
            if (properties.task) { this.task = MailTask.create(properties.task) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_mail_v2_MailTask", "optional")
    public task?: MailTask|null
}
export interface ICreateSysMailTaskRsp {
    batchID?: string|null
}
@protobuf.Type.d("tss_hall_mail_v2_CreateSysMailTaskRsp")
export class CreateSysMailTaskRsp extends protobuf.Message<ICreateSysMailTaskRsp> {
    constructor(properties: Properties<ICreateSysMailTaskRsp>) {
        super(properties);
        if (properties) {
            if (properties.batchID) { this.batchID = properties.batchID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public batchID?: string|null = ""
}
export interface ISendSysMailReq {
    batchID?: string|null
}
@protobuf.Type.d("tss_hall_mail_v2_SendSysMailReq")
export class SendSysMailReq extends protobuf.Message<ISendSysMailReq> {
    constructor(properties: Properties<ISendSysMailReq>) {
        super(properties);
        if (properties) {
            if (properties.batchID) { this.batchID = properties.batchID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public batchID?: string|null = ""
}
export interface IListSysMailTaskReq {
    page?: number|null
    pageSize?: number|null
    attachmentType?: tss_common_ItemType|null
    operator?: string|null
    way?: tss_common_Way|null
    title?: string|null
    propName?: string|null
    propId?: number|null
    beginTime?: number|null
    endTime?: number|null
}
@protobuf.Type.d("tss_hall_mail_v2_ListSysMailTaskReq")
export class ListSysMailTaskReq extends protobuf.Message<IListSysMailTaskReq> {
    constructor(properties: Properties<IListSysMailTaskReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.attachmentType) { this.attachmentType = properties.attachmentType }
            if (properties.operator) { this.operator = properties.operator }
            if (properties.way) { this.way = properties.way }
            if (properties.title) { this.title = properties.title }
            if (properties.propName) { this.propName = properties.propName }
            if (properties.propId) { this.propId = properties.propId }
            if (properties.beginTime) { this.beginTime = properties.beginTime }
            if (properties.endTime) { this.endTime = properties.endTime }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(3, tss_common_ItemType, "optional", tss_common_ItemType.ItemTypeUnknown)
    public attachmentType?: tss_common_ItemType|null = tss_common_ItemType.ItemTypeUnknown
    @protobuf.Field.d(4, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(5, tss_common_Way, "optional", tss_common_Way.WayNone)
    public way?: tss_common_Way|null = tss_common_Way.WayNone
    @protobuf.Field.d(6, "string", "optional", )
    public title?: string|null = ""
    @protobuf.Field.d(7, "string", "optional", )
    public propName?: string|null = ""
    @protobuf.Field.d(8, "int64", "optional", 0)
    public propId?: number|null = 0
    @protobuf.Field.d(9, "int64", "optional", 0)
    public beginTime?: number|null = 0
    @protobuf.Field.d(10, "int64", "optional", 0)
    public endTime?: number|null = 0
}
export interface IGetSysMailTaskNumReq {
    operator?: string|null
    way?: tss_common_Way|null
    title?: string|null
    propName?: string|null
    propId?: number|null
    beginTime?: number|null
    endTime?: number|null
}
@protobuf.Type.d("tss_hall_mail_v2_GetSysMailTaskNumReq")
export class GetSysMailTaskNumReq extends protobuf.Message<IGetSysMailTaskNumReq> {
    constructor(properties: Properties<IGetSysMailTaskNumReq>) {
        super(properties);
        if (properties) {
            if (properties.operator) { this.operator = properties.operator }
            if (properties.way) { this.way = properties.way }
            if (properties.title) { this.title = properties.title }
            if (properties.propName) { this.propName = properties.propName }
            if (properties.propId) { this.propId = properties.propId }
            if (properties.beginTime) { this.beginTime = properties.beginTime }
            if (properties.endTime) { this.endTime = properties.endTime }
        }
	}
    @protobuf.Field.d(4, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(5, tss_common_Way, "optional", tss_common_Way.WayNone)
    public way?: tss_common_Way|null = tss_common_Way.WayNone
    @protobuf.Field.d(6, "string", "optional", )
    public title?: string|null = ""
    @protobuf.Field.d(7, "string", "optional", )
    public propName?: string|null = ""
    @protobuf.Field.d(8, "int64", "optional", 0)
    public propId?: number|null = 0
    @protobuf.Field.d(9, "int64", "optional", 0)
    public beginTime?: number|null = 0
    @protobuf.Field.d(10, "int64", "optional", 0)
    public endTime?: number|null = 0
}
export interface IListSysMailTaskResp {
    tasks?: IMailTask[]
    total?: number|null
}
@protobuf.Type.d("tss_hall_mail_v2_ListSysMailTaskResp")
export class ListSysMailTaskResp extends protobuf.Message<IListSysMailTaskResp> {
    constructor(properties: Properties<IListSysMailTaskResp>) {
        super(properties);
        if (properties) {
            if (properties.tasks) { this.tasks = []; properties.tasks.forEach((value, index)=>{this.tasks[index] = MailTask.create(properties.tasks[index]) as any})}
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "tss_hall_mail_v2_MailTask", "repeated")
    public tasks?: MailTask[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public total?: number|null = 0
}
export interface IGetSysMailTaskNumResp {
    total?: number|null
}
@protobuf.Type.d("tss_hall_mail_v2_GetSysMailTaskNumResp")
export class GetSysMailTaskNumResp extends protobuf.Message<IGetSysMailTaskNumResp> {
    constructor(properties: Properties<IGetSysMailTaskNumResp>) {
        super(properties);
        if (properties) {
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(2, "int64", "optional", 0)
    public total?: number|null = 0
}
export interface IListSysMailUidReq {
    batchID?: string|null
    page?: number|null
    pageSize?: number|null
    revoke?: RevokeState|null
}
@protobuf.Type.d("tss_hall_mail_v2_ListSysMailUidReq")
export class ListSysMailUidReq extends protobuf.Message<IListSysMailUidReq> {
    constructor(properties: Properties<IListSysMailUidReq>) {
        super(properties);
        if (properties) {
            if (properties.batchID) { this.batchID = properties.batchID }
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.revoke) { this.revoke = properties.revoke }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public batchID?: string|null = ""
    @protobuf.Field.d(2, "int32", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(3, "int32", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(4, RevokeState, "optional", RevokeState.RevokeStateUnknown)
    public revoke?: RevokeState|null = RevokeState.RevokeStateUnknown
}
export interface IGetSysMailTaskReq {
    batchID?: string|null
}
@protobuf.Type.d("tss_hall_mail_v2_GetSysMailTaskReq")
export class GetSysMailTaskReq extends protobuf.Message<IGetSysMailTaskReq> {
    constructor(properties: Properties<IGetSysMailTaskReq>) {
        super(properties);
        if (properties) {
            if (properties.batchID) { this.batchID = properties.batchID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public batchID?: string|null = ""
}
export interface IListSysMailUidResp {
    total?: number|null
    uids?: number[]
}
@protobuf.Type.d("tss_hall_mail_v2_ListSysMailUidResp")
export class ListSysMailUidResp extends protobuf.Message<IListSysMailUidResp> {
    constructor(properties: Properties<IListSysMailUidResp>) {
        super(properties);
        if (properties) {
            if (properties.total) { this.total = properties.total }
            if (properties.uids) { this.uids = []; properties.uids.forEach((value, index)=>{this.uids[index] = properties.uids[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public total?: number|null = 0
    @protobuf.Field.d(2, "int64", "repeated", [])
    public uids?: number[] = []
}
export interface IGetSysMailTaskResp {
    task?: IMailTask
}
@protobuf.Type.d("tss_hall_mail_v2_GetSysMailTaskResp")
export class GetSysMailTaskResp extends protobuf.Message<IGetSysMailTaskResp> {
    constructor(properties: Properties<IGetSysMailTaskResp>) {
        super(properties);
        if (properties) {
            if (properties.task) { this.task = MailTask.create(properties.task) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_mail_v2_MailTask", "optional")
    public task?: MailTask|null
}
export interface IRevokeMailReq {
    batchId?: string|null
    operator?: string|null
}
@protobuf.Type.d("tss_hall_mail_v2_RevokeMailReq")
export class RevokeMailReq extends protobuf.Message<IRevokeMailReq> {
    constructor(properties: Properties<IRevokeMailReq>) {
        super(properties);
        if (properties) {
            if (properties.batchId) { this.batchId = properties.batchId }
            if (properties.operator) { this.operator = properties.operator }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public batchId?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public operator?: string|null = ""
}
export interface IOperateLog {
    id?: string|null
    title?: string|null
    batchId?: string|null
    successCount?: number|null
    failedCount?: number|null
    operator?: string|null
    createdAt?: number|null
    updatedAt?: number|null
    operate?: OperateType|null
    groupName?: string|null
    uids?: number[]
}
@protobuf.Type.d("tss_hall_mail_v2_OperateLog")
export class OperateLog extends protobuf.Message<IOperateLog> {
    constructor(properties: Properties<IOperateLog>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.title) { this.title = properties.title }
            if (properties.batchId) { this.batchId = properties.batchId }
            if (properties.successCount) { this.successCount = properties.successCount }
            if (properties.failedCount) { this.failedCount = properties.failedCount }
            if (properties.operator) { this.operator = properties.operator }
            if (properties.createdAt) { this.createdAt = properties.createdAt }
            if (properties.updatedAt) { this.updatedAt = properties.updatedAt }
            if (properties.operate) { this.operate = properties.operate }
            if (properties.groupName) { this.groupName = properties.groupName }
            if (properties.uids) { this.uids = []; properties.uids.forEach((value, index)=>{this.uids[index] = properties.uids[index]})}
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public id?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public title?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public batchId?: string|null = ""
    @protobuf.Field.d(4, "int64", "optional", 0)
    public successCount?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public failedCount?: number|null = 0
    @protobuf.Field.d(6, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(7, "int64", "optional", 0)
    public createdAt?: number|null = 0
    @protobuf.Field.d(8, "int64", "optional", 0)
    public updatedAt?: number|null = 0
    @protobuf.Field.d(9, OperateType, "optional", OperateType.OperateTypeUnknown)
    public operate?: OperateType|null = OperateType.OperateTypeUnknown
    @protobuf.Field.d(10, "string", "optional", )
    public groupName?: string|null = ""
    @protobuf.Field.d(11, "int64", "repeated", [])
    public uids?: number[] = []
}
export interface IListSysMailTaskOperateLogReq {
    page?: number|null
    pageSize?: number|null
}
@protobuf.Type.d("tss_hall_mail_v2_ListSysMailTaskOperateLogReq")
export class ListSysMailTaskOperateLogReq extends protobuf.Message<IListSysMailTaskOperateLogReq> {
    constructor(properties: Properties<IListSysMailTaskOperateLogReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public pageSize?: number|null = 0
}
export interface IListSysMailTaskOperateLogResp {
    total?: number|null
    logs?: IOperateLog[]
}
@protobuf.Type.d("tss_hall_mail_v2_ListSysMailTaskOperateLogResp")
export class ListSysMailTaskOperateLogResp extends protobuf.Message<IListSysMailTaskOperateLogResp> {
    constructor(properties: Properties<IListSysMailTaskOperateLogResp>) {
        super(properties);
        if (properties) {
            if (properties.total) { this.total = properties.total }
            if (properties.logs) { this.logs = []; properties.logs.forEach((value, index)=>{this.logs[index] = OperateLog.create(properties.logs[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public total?: number|null = 0
    @protobuf.Field.d(2, "tss_hall_mail_v2_OperateLog", "repeated")
    public logs?: OperateLog[] = []
}
export interface IRevokeMailResp {
    log?: IOperateLog
}
@protobuf.Type.d("tss_hall_mail_v2_RevokeMailResp")
export class RevokeMailResp extends protobuf.Message<IRevokeMailResp> {
    constructor(properties: Properties<IRevokeMailResp>) {
        super(properties);
        if (properties) {
            if (properties.log) { this.log = OperateLog.create(properties.log) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_mail_v2_OperateLog", "optional")
    public log?: OperateLog|null
}
export interface IGetSysMailTaskOperateLogReq {
    id?: string|null
}
@protobuf.Type.d("tss_hall_mail_v2_GetSysMailTaskOperateLogReq")
export class GetSysMailTaskOperateLogReq extends protobuf.Message<IGetSysMailTaskOperateLogReq> {
    constructor(properties: Properties<IGetSysMailTaskOperateLogReq>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public id?: string|null = ""
}
export interface IGetSysMailTaskOperateLogResp {
    log?: IOperateLog
}
@protobuf.Type.d("tss_hall_mail_v2_GetSysMailTaskOperateLogResp")
export class GetSysMailTaskOperateLogResp extends protobuf.Message<IGetSysMailTaskOperateLogResp> {
    constructor(properties: Properties<IGetSysMailTaskOperateLogResp>) {
        super(properties);
        if (properties) {
            if (properties.log) { this.log = OperateLog.create(properties.log) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_mail_v2_OperateLog", "optional")
    public log?: OperateLog|null
}
export interface IUserMailLogView {
    createdAt?: number|null
    title?: string|null
    exprieAt?: number|null
    aData?: IAwardData
    operator?: string|null
    isRead?: boolean|null
    isAccept?: boolean|null
    deletedAt?: number|null
    revoke?: RevokeState|null
    way?: tss_common_Way|null
}
@protobuf.Type.d("tss_hall_mail_v2_UserMailLogView")
export class UserMailLogView extends protobuf.Message<IUserMailLogView> {
    constructor(properties: Properties<IUserMailLogView>) {
        super(properties);
        if (properties) {
            if (properties.createdAt) { this.createdAt = properties.createdAt }
            if (properties.title) { this.title = properties.title }
            if (properties.exprieAt) { this.exprieAt = properties.exprieAt }
            if (properties.aData) { this.aData = AwardData.create(properties.aData) as any }
            if (properties.operator) { this.operator = properties.operator }
            if (properties.isRead) { this.isRead = properties.isRead }
            if (properties.isAccept) { this.isAccept = properties.isAccept }
            if (properties.deletedAt) { this.deletedAt = properties.deletedAt }
            if (properties.revoke) { this.revoke = properties.revoke }
            if (properties.way) { this.way = properties.way }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public createdAt?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public title?: string|null = ""
    @protobuf.Field.d(3, "int64", "optional", 0)
    public exprieAt?: number|null = 0
    @protobuf.Field.d(4, "tss_hall_mail_v2_AwardData", "optional")
    public aData?: AwardData|null
    @protobuf.Field.d(5, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(6, "bool", "optional", false)
    public isRead?: boolean|null = false
    @protobuf.Field.d(7, "bool", "optional", false)
    public isAccept?: boolean|null = false
    @protobuf.Field.d(8, "int64", "optional", 0)
    public deletedAt?: number|null = 0
    @protobuf.Field.d(9, RevokeState, "optional", RevokeState.RevokeStateUnknown)
    public revoke?: RevokeState|null = RevokeState.RevokeStateUnknown
    @protobuf.Field.d(10, tss_common_Way, "optional", tss_common_Way.WayNone)
    public way?: tss_common_Way|null = tss_common_Way.WayNone
}
export interface IListUserMailLogViewReq {
    uid?: number|null
    page?: number|null
    pageSize?: number|null
    way?: tss_common_Way|null
}
@protobuf.Type.d("tss_hall_mail_v2_ListUserMailLogViewReq")
export class ListUserMailLogViewReq extends protobuf.Message<IListUserMailLogViewReq> {
    constructor(properties: Properties<IListUserMailLogViewReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.way) { this.way = properties.way }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(3, "int32", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(4, tss_common_Way, "optional", tss_common_Way.WayNone)
    public way?: tss_common_Way|null = tss_common_Way.WayNone
}
export interface IListUserMailLogViewResp {
    data?: IUserMailLogView[]
    total?: number|null
}
@protobuf.Type.d("tss_hall_mail_v2_ListUserMailLogViewResp")
export class ListUserMailLogViewResp extends protobuf.Message<IListUserMailLogViewResp> {
    constructor(properties: Properties<IListUserMailLogViewResp>) {
        super(properties);
        if (properties) {
            if (properties.data) { this.data = []; properties.data.forEach((value, index)=>{this.data[index] = UserMailLogView.create(properties.data[index]) as any})}
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "tss_hall_mail_v2_UserMailLogView", "repeated")
    public data?: UserMailLogView[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public total?: number|null = 0
}
class $Mail extends RpcService {
    async CreateSysMailTask(req: ICreateSysMailTaskReq, params?: RpcParams) : Promise<{err:number, resp:ICreateSysMailTaskRsp}> {
        let data = CreateSysMailTaskReq.create(req)
        this.onBeforeReq("CreateSysMailTask", data, params)
        const buffer = CreateSysMailTaskReq.encode(data).finish()
        let [err, pack] = await this.call("CreateSysMailTask", buffer, params)
        if (err) {
            this.onBeforeResp("CreateSysMailTask", err)
            return {err: err, resp: null}
        } else {
            let resp = CreateSysMailTaskRsp.decode(pack) as any
            this.onBeforeResp("CreateSysMailTask", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SendSysMail(req: ISendSysMailReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = SendSysMailReq.create(req)
        this.onBeforeReq("SendSysMail", data, params)
        const buffer = SendSysMailReq.encode(data).finish()
        let [err, pack] = await this.call("SendSysMail", buffer, params)
        if (err) {
            this.onBeforeResp("SendSysMail", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("SendSysMail", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListSysMailTask(req: IListSysMailTaskReq, params?: RpcParams) : Promise<{err:number, resp:IListSysMailTaskResp}> {
        let data = ListSysMailTaskReq.create(req)
        this.onBeforeReq("ListSysMailTask", data, params)
        const buffer = ListSysMailTaskReq.encode(data).finish()
        let [err, pack] = await this.call("ListSysMailTask", buffer, params)
        if (err) {
            this.onBeforeResp("ListSysMailTask", err)
            return {err: err, resp: null}
        } else {
            let resp = ListSysMailTaskResp.decode(pack) as any
            this.onBeforeResp("ListSysMailTask", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetSysMailTaskNum(req: IGetSysMailTaskNumReq, params?: RpcParams) : Promise<{err:number, resp:IGetSysMailTaskNumResp}> {
        let data = GetSysMailTaskNumReq.create(req)
        this.onBeforeReq("GetSysMailTaskNum", data, params)
        const buffer = GetSysMailTaskNumReq.encode(data).finish()
        let [err, pack] = await this.call("GetSysMailTaskNum", buffer, params)
        if (err) {
            this.onBeforeResp("GetSysMailTaskNum", err)
            return {err: err, resp: null}
        } else {
            let resp = GetSysMailTaskNumResp.decode(pack) as any
            this.onBeforeResp("GetSysMailTaskNum", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListSysMailUid(req: IListSysMailUidReq, params?: RpcParams) : Promise<{err:number, resp:IListSysMailUidResp}> {
        let data = ListSysMailUidReq.create(req)
        this.onBeforeReq("ListSysMailUid", data, params)
        const buffer = ListSysMailUidReq.encode(data).finish()
        let [err, pack] = await this.call("ListSysMailUid", buffer, params)
        if (err) {
            this.onBeforeResp("ListSysMailUid", err)
            return {err: err, resp: null}
        } else {
            let resp = ListSysMailUidResp.decode(pack) as any
            this.onBeforeResp("ListSysMailUid", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetSysMailTask(req: IGetSysMailTaskReq, params?: RpcParams) : Promise<{err:number, resp:IGetSysMailTaskResp}> {
        let data = GetSysMailTaskReq.create(req)
        this.onBeforeReq("GetSysMailTask", data, params)
        const buffer = GetSysMailTaskReq.encode(data).finish()
        let [err, pack] = await this.call("GetSysMailTask", buffer, params)
        if (err) {
            this.onBeforeResp("GetSysMailTask", err)
            return {err: err, resp: null}
        } else {
            let resp = GetSysMailTaskResp.decode(pack) as any
            this.onBeforeResp("GetSysMailTask", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListSysMailTaskOperateLog(req: IListSysMailTaskOperateLogReq, params?: RpcParams) : Promise<{err:number, resp:IListSysMailTaskOperateLogResp}> {
        let data = ListSysMailTaskOperateLogReq.create(req)
        this.onBeforeReq("ListSysMailTaskOperateLog", data, params)
        const buffer = ListSysMailTaskOperateLogReq.encode(data).finish()
        let [err, pack] = await this.call("ListSysMailTaskOperateLog", buffer, params)
        if (err) {
            this.onBeforeResp("ListSysMailTaskOperateLog", err)
            return {err: err, resp: null}
        } else {
            let resp = ListSysMailTaskOperateLogResp.decode(pack) as any
            this.onBeforeResp("ListSysMailTaskOperateLog", err, resp)
            return {err: null, resp: resp}
        }
    }
    async RevokeMail(req: IRevokeMailReq, params?: RpcParams) : Promise<{err:number, resp:IRevokeMailResp}> {
        let data = RevokeMailReq.create(req)
        this.onBeforeReq("RevokeMail", data, params)
        const buffer = RevokeMailReq.encode(data).finish()
        let [err, pack] = await this.call("RevokeMail", buffer, params)
        if (err) {
            this.onBeforeResp("RevokeMail", err)
            return {err: err, resp: null}
        } else {
            let resp = RevokeMailResp.decode(pack) as any
            this.onBeforeResp("RevokeMail", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetSysMailTaskOperateLog(req: IGetSysMailTaskOperateLogReq, params?: RpcParams) : Promise<{err:number, resp:IGetSysMailTaskOperateLogResp}> {
        let data = GetSysMailTaskOperateLogReq.create(req)
        this.onBeforeReq("GetSysMailTaskOperateLog", data, params)
        const buffer = GetSysMailTaskOperateLogReq.encode(data).finish()
        let [err, pack] = await this.call("GetSysMailTaskOperateLog", buffer, params)
        if (err) {
            this.onBeforeResp("GetSysMailTaskOperateLog", err)
            return {err: err, resp: null}
        } else {
            let resp = GetSysMailTaskOperateLogResp.decode(pack) as any
            this.onBeforeResp("GetSysMailTaskOperateLog", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetSysMail(req: IGetSysMailReq, params?: RpcParams) : Promise<{err:number, resp:IGetSysMailResp}> {
        let data = GetSysMailReq.create(req)
        this.onBeforeReq("GetSysMail", data, params)
        const buffer = GetSysMailReq.encode(data).finish()
        let [err, pack] = await this.call("GetSysMail", buffer, params)
        if (err) {
            this.onBeforeResp("GetSysMail", err)
            return {err: err, resp: null}
        } else {
            let resp = GetSysMailResp.decode(pack) as any
            this.onBeforeResp("GetSysMail", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListSysMails(req: IListSysMailsReq, params?: RpcParams) : Promise<{err:number, resp:IListSysMailsResp}> {
        let data = ListSysMailsReq.create(req)
        this.onBeforeReq("ListSysMails", data, params)
        const buffer = ListSysMailsReq.encode(data).finish()
        let [err, pack] = await this.call("ListSysMails", buffer, params)
        if (err) {
            this.onBeforeResp("ListSysMails", err)
            return {err: err, resp: null}
        } else {
            let resp = ListSysMailsResp.decode(pack) as any
            this.onBeforeResp("ListSysMails", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetUnreadMailNum(req: IGetUnreadMailNumReq, params?: RpcParams) : Promise<{err:number, resp:IGetUnreadMailNumResp}> {
        let data = GetUnreadMailNumReq.create(req)
        this.onBeforeReq("GetUnreadMailNum", data, params)
        const buffer = GetUnreadMailNumReq.encode(data).finish()
        let [err, pack] = await this.call("GetUnreadMailNum", buffer, params)
        if (err) {
            this.onBeforeResp("GetUnreadMailNum", err)
            return {err: err, resp: null}
        } else {
            let resp = GetUnreadMailNumResp.decode(pack) as any
            this.onBeforeResp("GetUnreadMailNum", err, resp)
            return {err: null, resp: resp}
        }
    }
    async AcceptAward(req: IAcceptAwardReq, params?: RpcParams) : Promise<{err:number, resp:IAcceptAwardResp}> {
        let data = AcceptAwardReq.create(req)
        this.onBeforeReq("AcceptAward", data, params)
        const buffer = AcceptAwardReq.encode(data).finish()
        let [err, pack] = await this.call("AcceptAward", buffer, params)
        if (err) {
            this.onBeforeResp("AcceptAward", err)
            return {err: err, resp: null}
        } else {
            let resp = AcceptAwardResp.decode(pack) as any
            this.onBeforeResp("AcceptAward", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchAcceptAward(req: IBatchAcceptAwardReq, params?: RpcParams) : Promise<{err:number, resp:IBatchAcceptAwardResp}> {
        let data = BatchAcceptAwardReq.create(req)
        this.onBeforeReq("BatchAcceptAward", data, params)
        const buffer = BatchAcceptAwardReq.encode(data).finish()
        let [err, pack] = await this.call("BatchAcceptAward", buffer, params)
        if (err) {
            this.onBeforeResp("BatchAcceptAward", err)
            return {err: err, resp: null}
        } else {
            let resp = BatchAcceptAwardResp.decode(pack) as any
            this.onBeforeResp("BatchAcceptAward", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchReadMail(req: IBatchReadMailReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = BatchReadMailReq.create(req)
        this.onBeforeReq("BatchReadMail", data, params)
        const buffer = BatchReadMailReq.encode(data).finish()
        let [err, pack] = await this.call("BatchReadMail", buffer, params)
        if (err) {
            this.onBeforeResp("BatchReadMail", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("BatchReadMail", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DeleteMail(req: IDeleteMailReq, params?: RpcParams) : Promise<{err:number, resp:IDeleteMailResp}> {
        let data = DeleteMailReq.create(req)
        this.onBeforeReq("DeleteMail", data, params)
        const buffer = DeleteMailReq.encode(data).finish()
        let [err, pack] = await this.call("DeleteMail", buffer, params)
        if (err) {
            this.onBeforeResp("DeleteMail", err)
            return {err: err, resp: null}
        } else {
            let resp = DeleteMailResp.decode(pack) as any
            this.onBeforeResp("DeleteMail", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListUserMailLogView(req: IListUserMailLogViewReq, params?: RpcParams) : Promise<{err:number, resp:IListUserMailLogViewResp}> {
        let data = ListUserMailLogViewReq.create(req)
        this.onBeforeReq("ListUserMailLogView", data, params)
        const buffer = ListUserMailLogViewReq.encode(data).finish()
        let [err, pack] = await this.call("ListUserMailLogView", buffer, params)
        if (err) {
            this.onBeforeResp("ListUserMailLogView", err)
            return {err: err, resp: null}
        } else {
            let resp = ListUserMailLogViewResp.decode(pack) as any
            this.onBeforeResp("ListUserMailLogView", err, resp)
            return {err: null, resp: resp}
        }
    }
    async CbDeleteFriendMail(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = base_Void.create(req)
        this.onBeforeReq("CbDeleteFriendMail", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("CbDeleteFriendMail", buffer, params)
        if (err) {
            this.onBeforeResp("CbDeleteFriendMail", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("CbDeleteFriendMail", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DeleteAllUserMail(req: IDeleteAllUserMailReq, params?: RpcParams) : Promise<{err:number, resp:IDeleteAllUserMailResp}> {
        let data = DeleteAllUserMailReq.create(req)
        this.onBeforeReq("DeleteAllUserMail", data, params)
        const buffer = DeleteAllUserMailReq.encode(data).finish()
        let [err, pack] = await this.call("DeleteAllUserMail", buffer, params)
        if (err) {
            this.onBeforeResp("DeleteAllUserMail", err)
            return {err: err, resp: null}
        } else {
            let resp = DeleteAllUserMailResp.decode(pack) as any
            this.onBeforeResp("DeleteAllUserMail", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ClearUserNewMailFlag(req: IClearUserNewMailFlagReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = ClearUserNewMailFlagReq.create(req)
        this.onBeforeReq("ClearUserNewMailFlag", data, params)
        const buffer = ClearUserNewMailFlagReq.encode(data).finish()
        let [err, pack] = await this.call("ClearUserNewMailFlag", buffer, params)
        if (err) {
            this.onBeforeResp("ClearUserNewMailFlag", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("ClearUserNewMailFlag", err, resp)
            return {err: null, resp: resp}
        }
    }
    NotifySysMail(data: Uint8Array, params: RpcParams) : {msg: INotifySysMailResp, eventID?: number} {
        let msg = NotifySysMailResp.decode(data)
        return {msg: msg}
    }
}
export const Mail = new $Mail({
    name: "tss.hall.mail.v2",
})
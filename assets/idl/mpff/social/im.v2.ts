import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  Void as base_Void,IVoid as base_IVoid ,  } from "idl/base/base"
import {  ChatType as mp_common_ChatType ,  MessageKey as mp_common_MessageKey,IMessageKey as mp_common_IMessageKey ,  FromType as mp_common_FromType ,  MessageType as mp_common_MessageType ,  MessageSeq as mp_common_MessageSeq,IMessageSeq as mp_common_IMessageSeq ,  MessageEntity as mp_common_MessageEntity,IMessageEntity as mp_common_IMessageEntity ,  ReplyMarkup as mp_common_ReplyMarkup,IReplyMarkup as mp_common_IReplyMarkup ,  GroupJoinStrategy as mp_common_GroupJoinStrategy,IGroupJoinStrategy as mp_common_IGroupJoinStrategy ,  GroupAnnouncement as mp_common_GroupAnnouncement,IGroupAnnouncement as mp_common_IGroupAnnouncement ,  Hash as mp_common_Hash,IHash as mp_common_IHash ,  } from "idl/mp/common/social.im"
import {  MpIMNotifyCall as mp_common_MpIMNotifyCall,IMpIMNotifyCall as mp_common_IMpIMNotifyCall ,  } from "idl/mp/common/social.im.notify"
import {  StringValue as mp_common_StringValue,IStringValue as mp_common_IStringValue ,  BytesValue as mp_common_BytesValue,IBytesValue as mp_common_IBytesValue ,  Int64Value as mp_common_Int64Value,IInt64Value as mp_common_IInt64Value ,  Int32Value as mp_common_Int32Value,IInt32Value as mp_common_IInt32Value ,  } from "idl/mp/common/wrappers"
export enum ErrCode {  
    Suc = 0,  
    ErrIsBusy = 10001,  
    ErrRoomNotFound = 10002,  
    UserNotInGroup = 1003,  
    UserBlacked = 1001,  
    SendMsgLimit = 1002,  
    BlockUser = 1004,  
    RevokeTimeLimit = 1005,  
    ErrUnknown = 1006,  
    Muted = 1007,  
    SpeedLimit = 1008,  
    AuditReject = 2001,  
    GroupAddUserForbidden = 2002,  
    GroupHasJoined = 2003,
}
export enum GroupType {  
    Normal = 0,  
    Temporary = 1,
}
export enum ApplyJoinGroupResult {  
    ApplyJoinGroupResultPending = 0,  
    ApplyJoinGroupResultAccepted = 1,  
    ApplyJoinGroupResultRejected = 2,  
    ApplyJoinGroupResultExpired = 3,
}
export enum NotifyMsg_Cmd {  
    NotifyCmdUnknow = 0,  
    NotifyCmdNewInbox = 1,  
    NotifyCmdMessage = 2,  
    NotifyCmdNewGroupApply = 3,
}
export interface IMessageNotifyResp {
}
@protobuf.Type.d("mpff_social_im_v2_MessageNotifyResp")
export class MessageNotifyResp extends protobuf.Message<IMessageNotifyResp> {
    constructor(properties: Properties<IMessageNotifyResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IListHistoryReq {
    userID?: number|null
    toID?: number|null
    chatType?: mp_common_ChatType|null
    msgKey?: mp_common_IMessageKey
    IsPre?: boolean|null
}
@protobuf.Type.d("mpff_social_im_v2_ListHistoryReq")
export class ListHistoryReq extends protobuf.Message<IListHistoryReq> {
    constructor(properties: Properties<IListHistoryReq>) {
        super(properties);
        if (properties) {
            if (properties.userID) { this.userID = properties.userID }
            if (properties.toID) { this.toID = properties.toID }
            if (properties.chatType) { this.chatType = properties.chatType }
            if (properties.msgKey) { this.msgKey = mp_common_MessageKey.create(properties.msgKey) as any }
            if (properties.IsPre) { this.IsPre = properties.IsPre }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public userID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public toID?: number|null = 0
    @protobuf.Field.d(3, mp_common_ChatType, "optional", mp_common_ChatType.Single)
    public chatType?: mp_common_ChatType|null = mp_common_ChatType.Single
    @protobuf.Field.d(4, "mp_common_MessageKey", "optional")
    public msgKey?: mp_common_MessageKey|null
    @protobuf.Field.d(5, "bool", "optional", false)
    public IsPre?: boolean|null = false
}
export interface IMessage {
    chatType?: mp_common_ChatType|null
    fromID?: number|null
    fromType?: mp_common_FromType|null
    toID?: number|null
    type?: mp_common_MessageType|null
    content?: Uint8Array
    msgKey?: mp_common_IMessageKey
    createdAt?: number|null
    clientSeq?: number|null
    srvSeq?: mp_common_IMessageSeq
    extra?: Uint8Array
    isTmp?: boolean|null
    entity?: mp_common_IMessageEntity
    replyMarkup?: mp_common_IReplyMarkup
}
@protobuf.Type.d("mpff_social_im_v2_Message")
export class Message extends protobuf.Message<IMessage> {
    constructor(properties: Properties<IMessage>) {
        super(properties);
        if (properties) {
            if (properties.chatType) { this.chatType = properties.chatType }
            if (properties.fromID) { this.fromID = properties.fromID }
            if (properties.fromType) { this.fromType = properties.fromType }
            if (properties.toID) { this.toID = properties.toID }
            if (properties.type) { this.type = properties.type }
            if (properties.content) { this.content = properties.content }
            if (properties.msgKey) { this.msgKey = mp_common_MessageKey.create(properties.msgKey) as any }
            if (properties.createdAt) { this.createdAt = properties.createdAt }
            if (properties.clientSeq) { this.clientSeq = properties.clientSeq }
            if (properties.srvSeq) { this.srvSeq = mp_common_MessageSeq.create(properties.srvSeq) as any }
            if (properties.extra) { this.extra = properties.extra }
            if (properties.isTmp) { this.isTmp = properties.isTmp }
            if (properties.entity) { this.entity = mp_common_MessageEntity.create(properties.entity) as any }
            if (properties.replyMarkup) { this.replyMarkup = mp_common_ReplyMarkup.create(properties.replyMarkup) as any }
        }
	}
    @protobuf.Field.d(1, mp_common_ChatType, "optional", mp_common_ChatType.Single)
    public chatType?: mp_common_ChatType|null = mp_common_ChatType.Single
    @protobuf.Field.d(2, "int64", "optional", 0)
    public fromID?: number|null = 0
    @protobuf.Field.d(14, mp_common_FromType, "optional", mp_common_FromType.FromTypeUser)
    public fromType?: mp_common_FromType|null = mp_common_FromType.FromTypeUser
    @protobuf.Field.d(3, "int64", "optional", 0)
    public toID?: number|null = 0
    @protobuf.Field.d(4, mp_common_MessageType, "optional", mp_common_MessageType.Text)
    public type?: mp_common_MessageType|null = mp_common_MessageType.Text
    @protobuf.Field.d(5, "bytes", "optional", [])
    public content?: Uint8Array
    @protobuf.Field.d(6, "mp_common_MessageKey", "optional")
    public msgKey?: mp_common_MessageKey|null
    @protobuf.Field.d(7, "int64", "optional", 0)
    public createdAt?: number|null = 0
    @protobuf.Field.d(9, "int64", "optional", 0)
    public clientSeq?: number|null = 0
    @protobuf.Field.d(11, "mp_common_MessageSeq", "optional")
    public srvSeq?: mp_common_MessageSeq|null
    @protobuf.Field.d(12, "bytes", "optional", [])
    public extra?: Uint8Array
    @protobuf.Field.d(13, "bool", "optional", false)
    public isTmp?: boolean|null = false
    @protobuf.Field.d(16, "mp_common_MessageEntity", "optional")
    public entity?: mp_common_MessageEntity|null
    @protobuf.Field.d(17, "mp_common_ReplyMarkup", "optional")
    public replyMarkup?: mp_common_ReplyMarkup|null
}
export interface IConversationSetting {
    userID?: number|null
    sessionID?: string|null
    isSave?: boolean|null
    showNick?: boolean|null
    isDND?: boolean|null
    isBlack?: boolean|null
    bgPic?: string|null
    enable?: boolean|null
    topRank?: number|null
    extra?: Uint8Array
}
@protobuf.Type.d("mpff_social_im_v2_ConversationSetting")
export class ConversationSetting extends protobuf.Message<IConversationSetting> {
    constructor(properties: Properties<IConversationSetting>) {
        super(properties);
        if (properties) {
            if (properties.userID) { this.userID = properties.userID }
            if (properties.sessionID) { this.sessionID = properties.sessionID }
            if (properties.isSave) { this.isSave = properties.isSave }
            if (properties.showNick) { this.showNick = properties.showNick }
            if (properties.isDND) { this.isDND = properties.isDND }
            if (properties.isBlack) { this.isBlack = properties.isBlack }
            if (properties.bgPic) { this.bgPic = properties.bgPic }
            if (properties.enable) { this.enable = properties.enable }
            if (properties.topRank) { this.topRank = properties.topRank }
            if (properties.extra) { this.extra = properties.extra }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public userID?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public sessionID?: string|null = ""
    @protobuf.Field.d(4, "bool", "optional", false)
    public isSave?: boolean|null = false
    @protobuf.Field.d(5, "bool", "optional", false)
    public showNick?: boolean|null = false
    @protobuf.Field.d(6, "bool", "optional", false)
    public isDND?: boolean|null = false
    @protobuf.Field.d(7, "bool", "optional", false)
    public isBlack?: boolean|null = false
    @protobuf.Field.d(8, "string", "optional", )
    public bgPic?: string|null = ""
    @protobuf.Field.d(9, "bool", "optional", false)
    public enable?: boolean|null = false
    @protobuf.Field.d(10, "int32", "optional", 0)
    public topRank?: number|null = 0
    @protobuf.Field.d(11, "bytes", "optional", [])
    public extra?: Uint8Array
}
export interface ISetGroupRoleResp {
}
@protobuf.Type.d("mpff_social_im_v2_SetGroupRoleResp")
export class SetGroupRoleResp extends protobuf.Message<ISetGroupRoleResp> {
    constructor(properties: Properties<ISetGroupRoleResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface ISaveConversationSettingReq {
    setting?: IConversationSetting
}
@protobuf.Type.d("mpff_social_im_v2_SaveConversationSettingReq")
export class SaveConversationSettingReq extends protobuf.Message<ISaveConversationSettingReq> {
    constructor(properties: Properties<ISaveConversationSettingReq>) {
        super(properties);
        if (properties) {
            if (properties.setting) { this.setting = ConversationSetting.create(properties.setting) as any }
        }
	}
    @protobuf.Field.d(1, "mpff_social_im_v2_ConversationSetting", "optional")
    public setting?: ConversationSetting|null
}
export interface ISaveConversationSettingResp {
}
@protobuf.Type.d("mpff_social_im_v2_SaveConversationSettingResp")
export class SaveConversationSettingResp extends protobuf.Message<ISaveConversationSettingResp> {
    constructor(properties: Properties<ISaveConversationSettingResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IGetConversationSettingReq {
    sessionID?: string|null
}
@protobuf.Type.d("mpff_social_im_v2_GetConversationSettingReq")
export class GetConversationSettingReq extends protobuf.Message<IGetConversationSettingReq> {
    constructor(properties: Properties<IGetConversationSettingReq>) {
        super(properties);
        if (properties) {
            if (properties.sessionID) { this.sessionID = properties.sessionID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public sessionID?: string|null = ""
}
export interface IGetConversationSettingResp {
    setting?: IConversationSetting
}
@protobuf.Type.d("mpff_social_im_v2_GetConversationSettingResp")
export class GetConversationSettingResp extends protobuf.Message<IGetConversationSettingResp> {
    constructor(properties: Properties<IGetConversationSettingResp>) {
        super(properties);
        if (properties) {
            if (properties.setting) { this.setting = ConversationSetting.create(properties.setting) as any }
        }
	}
    @protobuf.Field.d(1, "mpff_social_im_v2_ConversationSetting", "optional")
    public setting?: ConversationSetting|null
}
export interface IMuteUser {
    userID?: number|null
    leftTime?: number|null
}
@protobuf.Type.d("mpff_social_im_v2_MuteUser")
export class MuteUser extends protobuf.Message<IMuteUser> {
    constructor(properties: Properties<IMuteUser>) {
        super(properties);
        if (properties) {
            if (properties.userID) { this.userID = properties.userID }
            if (properties.leftTime) { this.leftTime = properties.leftTime }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public userID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public leftTime?: number|null = 0
}
export interface IGroupInfo {
    groupID?: number|null
    name?: string|null
    icon?: string|null
    ownerUserID?: number|null
    type?: GroupType|null
    userCount?: number|null
    joinStrategy?: mp_common_IGroupJoinStrategy
    mark?: string|null
    extra?: Uint8Array
}
@protobuf.Type.d("mpff_social_im_v2_GroupInfo")
export class GroupInfo extends protobuf.Message<IGroupInfo> {
    constructor(properties: Properties<IGroupInfo>) {
        super(properties);
        if (properties) {
            if (properties.groupID) { this.groupID = properties.groupID }
            if (properties.name) { this.name = properties.name }
            if (properties.icon) { this.icon = properties.icon }
            if (properties.ownerUserID) { this.ownerUserID = properties.ownerUserID }
            if (properties.type) { this.type = properties.type }
            if (properties.userCount) { this.userCount = properties.userCount }
            if (properties.joinStrategy) { this.joinStrategy = mp_common_GroupJoinStrategy.create(properties.joinStrategy) as any }
            if (properties.mark) { this.mark = properties.mark }
            if (properties.extra) { this.extra = properties.extra }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public groupID?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public icon?: string|null = ""
    @protobuf.Field.d(4, "int64", "optional", 0)
    public ownerUserID?: number|null = 0
    @protobuf.Field.d(5, GroupType, "optional", GroupType.Normal)
    public type?: GroupType|null = GroupType.Normal
    @protobuf.Field.d(6, "int32", "optional", 0)
    public userCount?: number|null = 0
    @protobuf.Field.d(7, "mp_common_GroupJoinStrategy", "optional")
    public joinStrategy?: mp_common_GroupJoinStrategy|null
    @protobuf.Field.d(9, "string", "optional", )
    public mark?: string|null = ""
    @protobuf.Field.d(10, "bytes", "optional", [])
    public extra?: Uint8Array
}
export interface ICreateGroupReq {
    name?: string|null
    userIDList?: number[]
    type?: GroupType|null
    ttl?: number|null
    joinStrategy?: mp_common_IGroupJoinStrategy
    mark?: string|null
    extra?: Uint8Array
}
@protobuf.Type.d("mpff_social_im_v2_CreateGroupReq")
export class CreateGroupReq extends protobuf.Message<ICreateGroupReq> {
    constructor(properties: Properties<ICreateGroupReq>) {
        super(properties);
        if (properties) {
            if (properties.name) { this.name = properties.name }
            if (properties.userIDList) { this.userIDList = []; properties.userIDList.forEach((value, index)=>{this.userIDList[index] = properties.userIDList[index]})}
            if (properties.type) { this.type = properties.type }
            if (properties.ttl) { this.ttl = properties.ttl }
            if (properties.joinStrategy) { this.joinStrategy = mp_common_GroupJoinStrategy.create(properties.joinStrategy) as any }
            if (properties.mark) { this.mark = properties.mark }
            if (properties.extra) { this.extra = properties.extra }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(2, "int64", "repeated", [])
    public userIDList?: number[] = []
    @protobuf.Field.d(3, GroupType, "optional", GroupType.Normal)
    public type?: GroupType|null = GroupType.Normal
    @protobuf.Field.d(4, "int64", "optional", 0)
    public ttl?: number|null = 0
    @protobuf.Field.d(6, "mp_common_GroupJoinStrategy", "optional")
    public joinStrategy?: mp_common_GroupJoinStrategy|null
    @protobuf.Field.d(8, "string", "optional", )
    public mark?: string|null = ""
    @protobuf.Field.d(9, "bytes", "optional", [])
    public extra?: Uint8Array
}
export interface ICreateGroupResp {
    groupID?: number|null
}
@protobuf.Type.d("mpff_social_im_v2_CreateGroupResp")
export class CreateGroupResp extends protobuf.Message<ICreateGroupResp> {
    constructor(properties: Properties<ICreateGroupResp>) {
        super(properties);
        if (properties) {
            if (properties.groupID) { this.groupID = properties.groupID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public groupID?: number|null = 0
}
export interface IGetGroupReq {
    groupID?: number|null
}
@protobuf.Type.d("mpff_social_im_v2_GetGroupReq")
export class GetGroupReq extends protobuf.Message<IGetGroupReq> {
    constructor(properties: Properties<IGetGroupReq>) {
        super(properties);
        if (properties) {
            if (properties.groupID) { this.groupID = properties.groupID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public groupID?: number|null = 0
}
export interface IGetGroupResp {
    group?: IGroupInfo
}
@protobuf.Type.d("mpff_social_im_v2_GetGroupResp")
export class GetGroupResp extends protobuf.Message<IGetGroupResp> {
    constructor(properties: Properties<IGetGroupResp>) {
        super(properties);
        if (properties) {
            if (properties.group) { this.group = GroupInfo.create(properties.group) as any }
        }
	}
    @protobuf.Field.d(1, "mpff_social_im_v2_GroupInfo", "optional")
    public group?: GroupInfo|null
}
export interface IGroupExtraInfo {
    announcement?: mp_common_IGroupAnnouncement
}
@protobuf.Type.d("mpff_social_im_v2_GroupExtraInfo")
export class GroupExtraInfo extends protobuf.Message<IGroupExtraInfo> {
    constructor(properties: Properties<IGroupExtraInfo>) {
        super(properties);
        if (properties) {
            if (properties.announcement) { this.announcement = mp_common_GroupAnnouncement.create(properties.announcement) as any }
        }
	}
    @protobuf.Field.d(1, "mp_common_GroupAnnouncement", "optional")
    public announcement?: mp_common_GroupAnnouncement|null
}
export interface IGetGroupExtraInfoReq {
    groupID?: number|null
}
@protobuf.Type.d("mpff_social_im_v2_GetGroupExtraInfoReq")
export class GetGroupExtraInfoReq extends protobuf.Message<IGetGroupExtraInfoReq> {
    constructor(properties: Properties<IGetGroupExtraInfoReq>) {
        super(properties);
        if (properties) {
            if (properties.groupID) { this.groupID = properties.groupID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public groupID?: number|null = 0
}
export interface IGetGroupExtraInfoResp {
    extra?: IGroupExtraInfo
}
@protobuf.Type.d("mpff_social_im_v2_GetGroupExtraInfoResp")
export class GetGroupExtraInfoResp extends protobuf.Message<IGetGroupExtraInfoResp> {
    constructor(properties: Properties<IGetGroupExtraInfoResp>) {
        super(properties);
        if (properties) {
            if (properties.extra) { this.extra = GroupExtraInfo.create(properties.extra) as any }
        }
	}
    @protobuf.Field.d(1, "mpff_social_im_v2_GroupExtraInfo", "optional")
    public extra?: GroupExtraInfo|null
}
export interface ISaveGroupReq {
    groupID?: number|null
    name?: mp_common_IStringValue
    mark?: mp_common_IStringValue
    extra?: mp_common_IBytesValue
    joinStrategy?: mp_common_IGroupJoinStrategy
}
@protobuf.Type.d("mpff_social_im_v2_SaveGroupReq")
export class SaveGroupReq extends protobuf.Message<ISaveGroupReq> {
    constructor(properties: Properties<ISaveGroupReq>) {
        super(properties);
        if (properties) {
            if (properties.groupID) { this.groupID = properties.groupID }
            if (properties.name) { this.name = mp_common_StringValue.create(properties.name) as any }
            if (properties.mark) { this.mark = mp_common_StringValue.create(properties.mark) as any }
            if (properties.extra) { this.extra = mp_common_BytesValue.create(properties.extra) as any }
            if (properties.joinStrategy) { this.joinStrategy = mp_common_GroupJoinStrategy.create(properties.joinStrategy) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public groupID?: number|null = 0
    @protobuf.Field.d(3, "mp_common_StringValue", "optional")
    public name?: mp_common_StringValue|null
    @protobuf.Field.d(4, "mp_common_StringValue", "optional")
    public mark?: mp_common_StringValue|null
    @protobuf.Field.d(5, "mp_common_BytesValue", "optional")
    public extra?: mp_common_BytesValue|null
    @protobuf.Field.d(6, "mp_common_GroupJoinStrategy", "optional")
    public joinStrategy?: mp_common_GroupJoinStrategy|null
}
export interface ISaveGroupResp {
}
@protobuf.Type.d("mpff_social_im_v2_SaveGroupResp")
export class SaveGroupResp extends protobuf.Message<ISaveGroupResp> {
    constructor(properties: Properties<ISaveGroupResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IRemoveGroupUserReq {
    groupID?: number|null
    userIDList?: number[]
}
@protobuf.Type.d("mpff_social_im_v2_RemoveGroupUserReq")
export class RemoveGroupUserReq extends protobuf.Message<IRemoveGroupUserReq> {
    constructor(properties: Properties<IRemoveGroupUserReq>) {
        super(properties);
        if (properties) {
            if (properties.groupID) { this.groupID = properties.groupID }
            if (properties.userIDList) { this.userIDList = []; properties.userIDList.forEach((value, index)=>{this.userIDList[index] = properties.userIDList[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public groupID?: number|null = 0
    @protobuf.Field.d(2, "int64", "repeated", [])
    public userIDList?: number[] = []
}
export interface IRemoveGroupUserResp {
}
@protobuf.Type.d("mpff_social_im_v2_RemoveGroupUserResp")
export class RemoveGroupUserResp extends protobuf.Message<IRemoveGroupUserResp> {
    constructor(properties: Properties<IRemoveGroupUserResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IAddGroupUserReq {
    groupID?: number|null
    userIDList?: number[]
    reason?: string|null
}
@protobuf.Type.d("mpff_social_im_v2_AddGroupUserReq")
export class AddGroupUserReq extends protobuf.Message<IAddGroupUserReq> {
    constructor(properties: Properties<IAddGroupUserReq>) {
        super(properties);
        if (properties) {
            if (properties.groupID) { this.groupID = properties.groupID }
            if (properties.userIDList) { this.userIDList = []; properties.userIDList.forEach((value, index)=>{this.userIDList[index] = properties.userIDList[index]})}
            if (properties.reason) { this.reason = properties.reason }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public groupID?: number|null = 0
    @protobuf.Field.d(2, "int64", "repeated", [])
    public userIDList?: number[] = []
    @protobuf.Field.d(3, "string", "optional", )
    public reason?: string|null = ""
}
export interface IAddGroupUserResp {
}
@protobuf.Type.d("mpff_social_im_v2_AddGroupUserResp")
export class AddGroupUserResp extends protobuf.Message<IAddGroupUserResp> {
    constructor(properties: Properties<IAddGroupUserResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IGroupUser {
    userID?: number|null
    alias?: string|null
    muteExpireAt?: number|null
    createdAt?: number|null
    roleLevel?: number|null
    extra?: Uint8Array
    updatedAt?: number|null
}
@protobuf.Type.d("mpff_social_im_v2_GroupUser")
export class GroupUser extends protobuf.Message<IGroupUser> {
    constructor(properties: Properties<IGroupUser>) {
        super(properties);
        if (properties) {
            if (properties.userID) { this.userID = properties.userID }
            if (properties.alias) { this.alias = properties.alias }
            if (properties.muteExpireAt) { this.muteExpireAt = properties.muteExpireAt }
            if (properties.createdAt) { this.createdAt = properties.createdAt }
            if (properties.roleLevel) { this.roleLevel = properties.roleLevel }
            if (properties.extra) { this.extra = properties.extra }
            if (properties.updatedAt) { this.updatedAt = properties.updatedAt }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public userID?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public alias?: string|null = ""
    @protobuf.Field.d(4, "int64", "optional", 0)
    public muteExpireAt?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public createdAt?: number|null = 0
    @protobuf.Field.d(6, "int32", "optional", 0)
    public roleLevel?: number|null = 0
    @protobuf.Field.d(7, "bytes", "optional", [])
    public extra?: Uint8Array
    @protobuf.Field.d(8, "int64", "optional", 0)
    public updatedAt?: number|null = 0
}
export interface ISetGroupUserReq {
    groupID?: number|null
    userIDList?: number[]
    alias?: mp_common_IStringValue
    extra?: mp_common_IBytesValue
    muteSec?: mp_common_IInt64Value
    roleLevel?: mp_common_IInt32Value
}
@protobuf.Type.d("mpff_social_im_v2_SetGroupUserReq")
export class SetGroupUserReq extends protobuf.Message<ISetGroupUserReq> {
    constructor(properties: Properties<ISetGroupUserReq>) {
        super(properties);
        if (properties) {
            if (properties.groupID) { this.groupID = properties.groupID }
            if (properties.userIDList) { this.userIDList = []; properties.userIDList.forEach((value, index)=>{this.userIDList[index] = properties.userIDList[index]})}
            if (properties.alias) { this.alias = mp_common_StringValue.create(properties.alias) as any }
            if (properties.extra) { this.extra = mp_common_BytesValue.create(properties.extra) as any }
            if (properties.muteSec) { this.muteSec = mp_common_Int64Value.create(properties.muteSec) as any }
            if (properties.roleLevel) { this.roleLevel = mp_common_Int32Value.create(properties.roleLevel) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public groupID?: number|null = 0
    @protobuf.Field.d(3, "int64", "repeated", [])
    public userIDList?: number[] = []
    @protobuf.Field.d(4, "mp_common_StringValue", "optional")
    public alias?: mp_common_StringValue|null
    @protobuf.Field.d(5, "mp_common_BytesValue", "optional")
    public extra?: mp_common_BytesValue|null
    @protobuf.Field.d(6, "mp_common_Int64Value", "optional")
    public muteSec?: mp_common_Int64Value|null
    @protobuf.Field.d(7, "mp_common_Int32Value", "optional")
    public roleLevel?: mp_common_Int32Value|null
}
export interface ISetGroupUserResp {
}
@protobuf.Type.d("mpff_social_im_v2_SetGroupUserResp")
export class SetGroupUserResp extends protobuf.Message<ISetGroupUserResp> {
    constructor(properties: Properties<ISetGroupUserResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IListGroupUserReq {
    groupID?: number|null
    hash?: mp_common_IHash
}
@protobuf.Type.d("mpff_social_im_v2_ListGroupUserReq")
export class ListGroupUserReq extends protobuf.Message<IListGroupUserReq> {
    constructor(properties: Properties<IListGroupUserReq>) {
        super(properties);
        if (properties) {
            if (properties.groupID) { this.groupID = properties.groupID }
            if (properties.hash) { this.hash = mp_common_Hash.create(properties.hash) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public groupID?: number|null = 0
    @protobuf.Field.d(2, "mp_common_Hash", "optional")
    public hash?: mp_common_Hash|null
}
export interface IGetGroupUserReq {
    groupID?: number|null
    userID?: number|null
}
@protobuf.Type.d("mpff_social_im_v2_GetGroupUserReq")
export class GetGroupUserReq extends protobuf.Message<IGetGroupUserReq> {
    constructor(properties: Properties<IGetGroupUserReq>) {
        super(properties);
        if (properties) {
            if (properties.groupID) { this.groupID = properties.groupID }
            if (properties.userID) { this.userID = properties.userID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public groupID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public userID?: number|null = 0
}
export interface IGetGroupUserResp {
    user?: IGroupUser
}
@protobuf.Type.d("mpff_social_im_v2_GetGroupUserResp")
export class GetGroupUserResp extends protobuf.Message<IGetGroupUserResp> {
    constructor(properties: Properties<IGetGroupUserResp>) {
        super(properties);
        if (properties) {
            if (properties.user) { this.user = GroupUser.create(properties.user) as any }
        }
	}
    @protobuf.Field.d(1, "mpff_social_im_v2_GroupUser", "optional")
    public user?: GroupUser|null
}
export interface IChannel {
    appID?: number|null
    chatID?: number|null
    id?: string|null
    name?: string|null
    icon?: string|null
}
@protobuf.Type.d("mpff_social_im_v2_Channel")
export class Channel extends protobuf.Message<IChannel> {
    constructor(properties: Properties<IChannel>) {
        super(properties);
        if (properties) {
            if (properties.appID) { this.appID = properties.appID }
            if (properties.chatID) { this.chatID = properties.chatID }
            if (properties.id) { this.id = properties.id }
            if (properties.name) { this.name = properties.name }
            if (properties.icon) { this.icon = properties.icon }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public appID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public chatID?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public id?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public icon?: string|null = ""
}
export interface IListChannelReq {
}
@protobuf.Type.d("mpff_social_im_v2_ListChannelReq")
export class ListChannelReq extends protobuf.Message<IListChannelReq> {
    constructor(properties: Properties<IListChannelReq>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IListChannelResp {
    list?: IChannel[]
}
@protobuf.Type.d("mpff_social_im_v2_ListChannelResp")
export class ListChannelResp extends protobuf.Message<IListChannelResp> {
    constructor(properties: Properties<IListChannelResp>) {
        super(properties);
        if (properties) {
            if (properties.list) { this.list = []; properties.list.forEach((value, index)=>{this.list[index] = Channel.create(properties.list[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "mpff_social_im_v2_Channel", "repeated")
    public list?: Channel[] = []
}
export interface IListGroupUserResp {
    userList?: IGroupUser[]
    hash?: mp_common_IHash
}
@protobuf.Type.d("mpff_social_im_v2_ListGroupUserResp")
export class ListGroupUserResp extends protobuf.Message<IListGroupUserResp> {
    constructor(properties: Properties<IListGroupUserResp>) {
        super(properties);
        if (properties) {
            if (properties.userList) { this.userList = []; properties.userList.forEach((value, index)=>{this.userList[index] = GroupUser.create(properties.userList[index]) as any})}
            if (properties.hash) { this.hash = mp_common_Hash.create(properties.hash) as any }
        }
	}
    @protobuf.Field.d(1, "mpff_social_im_v2_GroupUser", "repeated")
    public userList?: GroupUser[] = []
    @protobuf.Field.d(2, "mp_common_Hash", "optional")
    public hash?: mp_common_Hash|null
}
export interface IJoinGroupReq {
    groupID?: number|null
    applyMsg?: string|null
    inviteKey?: string|null
}
@protobuf.Type.d("mpff_social_im_v2_JoinGroupReq")
export class JoinGroupReq extends protobuf.Message<IJoinGroupReq> {
    constructor(properties: Properties<IJoinGroupReq>) {
        super(properties);
        if (properties) {
            if (properties.groupID) { this.groupID = properties.groupID }
            if (properties.applyMsg) { this.applyMsg = properties.applyMsg }
            if (properties.inviteKey) { this.inviteKey = properties.inviteKey }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public groupID?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public applyMsg?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public inviteKey?: string|null = ""
}
export interface IJoinGroupResp {
}
@protobuf.Type.d("mpff_social_im_v2_JoinGroupResp")
export class JoinGroupResp extends protobuf.Message<IJoinGroupResp> {
    constructor(properties: Properties<IJoinGroupResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IJoinGroupInvite {
    inviteKey?: string|null
    groupID?: number|null
    userID?: number|null
    ttl?: number|null
    createdAt?: number|null
}
@protobuf.Type.d("mpff_social_im_v2_JoinGroupInvite")
export class JoinGroupInvite extends protobuf.Message<IJoinGroupInvite> {
    constructor(properties: Properties<IJoinGroupInvite>) {
        super(properties);
        if (properties) {
            if (properties.inviteKey) { this.inviteKey = properties.inviteKey }
            if (properties.groupID) { this.groupID = properties.groupID }
            if (properties.userID) { this.userID = properties.userID }
            if (properties.ttl) { this.ttl = properties.ttl }
            if (properties.createdAt) { this.createdAt = properties.createdAt }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public inviteKey?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public groupID?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public userID?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public ttl?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public createdAt?: number|null = 0
}
export interface ICreateJoinGroupInviteReq {
    groupID?: number|null
}
@protobuf.Type.d("mpff_social_im_v2_CreateJoinGroupInviteReq")
export class CreateJoinGroupInviteReq extends protobuf.Message<ICreateJoinGroupInviteReq> {
    constructor(properties: Properties<ICreateJoinGroupInviteReq>) {
        super(properties);
        if (properties) {
            if (properties.groupID) { this.groupID = properties.groupID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public groupID?: number|null = 0
}
export interface ICreateJoinGroupInviteResp {
    invite?: IJoinGroupInvite
}
@protobuf.Type.d("mpff_social_im_v2_CreateJoinGroupInviteResp")
export class CreateJoinGroupInviteResp extends protobuf.Message<ICreateJoinGroupInviteResp> {
    constructor(properties: Properties<ICreateJoinGroupInviteResp>) {
        super(properties);
        if (properties) {
            if (properties.invite) { this.invite = JoinGroupInvite.create(properties.invite) as any }
        }
	}
    @protobuf.Field.d(1, "mpff_social_im_v2_JoinGroupInvite", "optional")
    public invite?: JoinGroupInvite|null
}
export interface IApplyJoinGroup {
    applyID?: string|null
    groupID?: number|null
    applyMsg?: string|null
    applyUserID?: number|null
    expiredAt?: number|null
    processMsg?: string|null
    result?: ApplyJoinGroupResult|null
    seq?: number|null
}
@protobuf.Type.d("mpff_social_im_v2_ApplyJoinGroup")
export class ApplyJoinGroup extends protobuf.Message<IApplyJoinGroup> {
    constructor(properties: Properties<IApplyJoinGroup>) {
        super(properties);
        if (properties) {
            if (properties.applyID) { this.applyID = properties.applyID }
            if (properties.groupID) { this.groupID = properties.groupID }
            if (properties.applyMsg) { this.applyMsg = properties.applyMsg }
            if (properties.applyUserID) { this.applyUserID = properties.applyUserID }
            if (properties.expiredAt) { this.expiredAt = properties.expiredAt }
            if (properties.processMsg) { this.processMsg = properties.processMsg }
            if (properties.result) { this.result = properties.result }
            if (properties.seq) { this.seq = properties.seq }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public applyID?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public groupID?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public applyMsg?: string|null = ""
    @protobuf.Field.d(4, "int64", "optional", 0)
    public applyUserID?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public expiredAt?: number|null = 0
    @protobuf.Field.d(6, "string", "optional", )
    public processMsg?: string|null = ""
    @protobuf.Field.d(7, ApplyJoinGroupResult, "optional", ApplyJoinGroupResult.ApplyJoinGroupResultPending)
    public result?: ApplyJoinGroupResult|null = ApplyJoinGroupResult.ApplyJoinGroupResultPending
    @protobuf.Field.d(8, "int64", "optional", 0)
    public seq?: number|null = 0
}
export interface ISyncApplyJoinGroupReq {
    seq?: number|null
}
@protobuf.Type.d("mpff_social_im_v2_SyncApplyJoinGroupReq")
export class SyncApplyJoinGroupReq extends protobuf.Message<ISyncApplyJoinGroupReq> {
    constructor(properties: Properties<ISyncApplyJoinGroupReq>) {
        super(properties);
        if (properties) {
            if (properties.seq) { this.seq = properties.seq }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public seq?: number|null = 0
}
export interface ISyncApplyJoinGroupResp {
    list?: IApplyJoinGroup[]
}
@protobuf.Type.d("mpff_social_im_v2_SyncApplyJoinGroupResp")
export class SyncApplyJoinGroupResp extends protobuf.Message<ISyncApplyJoinGroupResp> {
    constructor(properties: Properties<ISyncApplyJoinGroupResp>) {
        super(properties);
        if (properties) {
            if (properties.list) { this.list = []; properties.list.forEach((value, index)=>{this.list[index] = ApplyJoinGroup.create(properties.list[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "mpff_social_im_v2_ApplyJoinGroup", "repeated")
    public list?: ApplyJoinGroup[] = []
}
export interface IProcessApplyJoinGroupReq {
    applyID?: string|null
    result?: ApplyJoinGroupResult|null
    processMsg?: string|null
}
@protobuf.Type.d("mpff_social_im_v2_ProcessApplyJoinGroupReq")
export class ProcessApplyJoinGroupReq extends protobuf.Message<IProcessApplyJoinGroupReq> {
    constructor(properties: Properties<IProcessApplyJoinGroupReq>) {
        super(properties);
        if (properties) {
            if (properties.applyID) { this.applyID = properties.applyID }
            if (properties.result) { this.result = properties.result }
            if (properties.processMsg) { this.processMsg = properties.processMsg }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public applyID?: string|null = ""
    @protobuf.Field.d(2, ApplyJoinGroupResult, "optional", ApplyJoinGroupResult.ApplyJoinGroupResultPending)
    public result?: ApplyJoinGroupResult|null = ApplyJoinGroupResult.ApplyJoinGroupResultPending
    @protobuf.Field.d(3, "string", "optional", )
    public processMsg?: string|null = ""
}
export interface IProcessApplyJoinGroupResp {
}
@protobuf.Type.d("mpff_social_im_v2_ProcessApplyJoinGroupResp")
export class ProcessApplyJoinGroupResp extends protobuf.Message<IProcessApplyJoinGroupResp> {
    constructor(properties: Properties<IProcessApplyJoinGroupResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IChangeGroupOwnerReq {
    groupID?: number|null
    userID?: number|null
}
@protobuf.Type.d("mpff_social_im_v2_ChangeGroupOwnerReq")
export class ChangeGroupOwnerReq extends protobuf.Message<IChangeGroupOwnerReq> {
    constructor(properties: Properties<IChangeGroupOwnerReq>) {
        super(properties);
        if (properties) {
            if (properties.groupID) { this.groupID = properties.groupID }
            if (properties.userID) { this.userID = properties.userID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public groupID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public userID?: number|null = 0
}
export interface IChangeGroupOwnerResp {
}
@protobuf.Type.d("mpff_social_im_v2_ChangeGroupOwnerResp")
export class ChangeGroupOwnerResp extends protobuf.Message<IChangeGroupOwnerResp> {
    constructor(properties: Properties<IChangeGroupOwnerResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IMessageCreateGroup {
    createUserID?: number|null
    joinUserIDList?: number|null
}
@protobuf.Type.d("mpff_social_im_v2_MessageCreateGroup")
export class MessageCreateGroup extends protobuf.Message<IMessageCreateGroup> {
    constructor(properties: Properties<IMessageCreateGroup>) {
        super(properties);
        if (properties) {
            if (properties.createUserID) { this.createUserID = properties.createUserID }
            if (properties.joinUserIDList) { this.joinUserIDList = properties.joinUserIDList }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public createUserID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public joinUserIDList?: number|null = 0
}
export interface IListHistoryResp {
    list?: IMessage[]
}
@protobuf.Type.d("mpff_social_im_v2_ListHistoryResp")
export class ListHistoryResp extends protobuf.Message<IListHistoryResp> {
    constructor(properties: Properties<IListHistoryResp>) {
        super(properties);
        if (properties) {
            if (properties.list) { this.list = []; properties.list.forEach((value, index)=>{this.list[index] = Message.create(properties.list[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "mpff_social_im_v2_Message", "repeated")
    public list?: Message[] = []
}
export interface IMergerMessage {
    msgList?: IMessage[]
}
@protobuf.Type.d("mpff_social_im_v2_MergerMessage")
export class MergerMessage extends protobuf.Message<IMergerMessage> {
    constructor(properties: Properties<IMergerMessage>) {
        super(properties);
        if (properties) {
            if (properties.msgList) { this.msgList = []; properties.msgList.forEach((value, index)=>{this.msgList[index] = Message.create(properties.msgList[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "mpff_social_im_v2_Message", "repeated")
    public msgList?: Message[] = []
}
export interface IListMessageReq {
    pageSize?: number|null
    lastSeq?: mp_common_IMessageSeq
}
@protobuf.Type.d("mpff_social_im_v2_ListMessageReq")
export class ListMessageReq extends protobuf.Message<IListMessageReq> {
    constructor(properties: Properties<IListMessageReq>) {
        super(properties);
        if (properties) {
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.lastSeq) { this.lastSeq = mp_common_MessageSeq.create(properties.lastSeq) as any }
        }
	}
    @protobuf.Field.d(2, "int64", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(3, "mp_common_MessageSeq", "optional")
    public lastSeq?: mp_common_MessageSeq|null
}
export interface IListMessageResp {
    list?: IMessage[]
}
@protobuf.Type.d("mpff_social_im_v2_ListMessageResp")
export class ListMessageResp extends protobuf.Message<IListMessageResp> {
    constructor(properties: Properties<IListMessageResp>) {
        super(properties);
        if (properties) {
            if (properties.list) { this.list = []; properties.list.forEach((value, index)=>{this.list[index] = Message.create(properties.list[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "mpff_social_im_v2_Message", "repeated")
    public list?: Message[] = []
}
export interface ISendMessageReq {
    message?: IMessage
    specifyToIDList?: number[]
}
@protobuf.Type.d("mpff_social_im_v2_SendMessageReq")
export class SendMessageReq extends protobuf.Message<ISendMessageReq> {
    constructor(properties: Properties<ISendMessageReq>) {
        super(properties);
        if (properties) {
            if (properties.message) { this.message = Message.create(properties.message) as any }
            if (properties.specifyToIDList) { this.specifyToIDList = []; properties.specifyToIDList.forEach((value, index)=>{this.specifyToIDList[index] = properties.specifyToIDList[index]})}
        }
	}
    @protobuf.Field.d(1, "mpff_social_im_v2_Message", "optional")
    public message?: Message|null
    @protobuf.Field.d(3, "int64", "repeated", [])
    public specifyToIDList?: number[] = []
}
export interface ISendMessageResp {
    msgKey?: mp_common_IMessageKey
    createdAt?: number|null
}
@protobuf.Type.d("mpff_social_im_v2_SendMessageResp")
export class SendMessageResp extends protobuf.Message<ISendMessageResp> {
    constructor(properties: Properties<ISendMessageResp>) {
        super(properties);
        if (properties) {
            if (properties.msgKey) { this.msgKey = mp_common_MessageKey.create(properties.msgKey) as any }
            if (properties.createdAt) { this.createdAt = properties.createdAt }
        }
	}
    @protobuf.Field.d(1, "mp_common_MessageKey", "optional")
    public msgKey?: mp_common_MessageKey|null
    @protobuf.Field.d(2, "int64", "optional", 0)
    public createdAt?: number|null = 0
}
export interface IItemQueryReq {
    messageKey?: mp_common_IMessageKey
    queryData?: Uint8Array
    queryURL?: string|null
}
@protobuf.Type.d("mpff_social_im_v2_ItemQueryReq")
export class ItemQueryReq extends protobuf.Message<IItemQueryReq> {
    constructor(properties: Properties<IItemQueryReq>) {
        super(properties);
        if (properties) {
            if (properties.messageKey) { this.messageKey = mp_common_MessageKey.create(properties.messageKey) as any }
            if (properties.queryData) { this.queryData = properties.queryData }
            if (properties.queryURL) { this.queryURL = properties.queryURL }
        }
	}
    @protobuf.Field.d(1, "mp_common_MessageKey", "optional")
    public messageKey?: mp_common_MessageKey|null
    @protobuf.Field.d(2, "bytes", "optional", [])
    public queryData?: Uint8Array
    @protobuf.Field.d(3, "string", "optional", )
    public queryURL?: string|null = ""
}
export interface IMessageUpdateTrigger {
    content?: Uint8Array
    replyMarkup?: mp_common_IReplyMarkup
}
@protobuf.Type.d("mpff_social_im_v2_MessageUpdateTrigger")
export class MessageUpdateTrigger extends protobuf.Message<IMessageUpdateTrigger> {
    constructor(properties: Properties<IMessageUpdateTrigger>) {
        super(properties);
        if (properties) {
            if (properties.content) { this.content = properties.content }
            if (properties.replyMarkup) { this.replyMarkup = mp_common_ReplyMarkup.create(properties.replyMarkup) as any }
        }
	}
    @protobuf.Field.d(1, "bytes", "optional", [])
    public content?: Uint8Array
    @protobuf.Field.d(2, "mp_common_ReplyMarkup", "optional")
    public replyMarkup?: mp_common_ReplyMarkup|null
}
export interface IItemQueryResp {
    data?: Uint8Array
    messageUpdateTrigger?: IMessageUpdateTrigger
    toast?: string|null
}
@protobuf.Type.d("mpff_social_im_v2_ItemQueryResp")
export class ItemQueryResp extends protobuf.Message<IItemQueryResp> {
    constructor(properties: Properties<IItemQueryResp>) {
        super(properties);
        if (properties) {
            if (properties.data) { this.data = properties.data }
            if (properties.messageUpdateTrigger) { this.messageUpdateTrigger = MessageUpdateTrigger.create(properties.messageUpdateTrigger) as any }
            if (properties.toast) { this.toast = properties.toast }
        }
	}
    @protobuf.Field.d(1, "bytes", "optional", [])
    public data?: Uint8Array
    @protobuf.Field.d(2, "mpff_social_im_v2_MessageUpdateTrigger", "optional")
    public messageUpdateTrigger?: MessageUpdateTrigger|null
    @protobuf.Field.d(3, "string", "optional", )
    public toast?: string|null = ""
}
export interface ILoginReq {
    userID?: number|null
}
@protobuf.Type.d("mpff_social_im_v2_LoginReq")
export class LoginReq extends protobuf.Message<ILoginReq> {
    constructor(properties: Properties<ILoginReq>) {
        super(properties);
        if (properties) {
            if (properties.userID) { this.userID = properties.userID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public userID?: number|null = 0
}
export interface ILoginResp {
}
@protobuf.Type.d("mpff_social_im_v2_LoginResp")
export class LoginResp extends protobuf.Message<ILoginResp> {
    constructor(properties: Properties<ILoginResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IDisbandGroupReq {
    groupID?: number|null
}
@protobuf.Type.d("mpff_social_im_v2_DisbandGroupReq")
export class DisbandGroupReq extends protobuf.Message<IDisbandGroupReq> {
    constructor(properties: Properties<IDisbandGroupReq>) {
        super(properties);
        if (properties) {
            if (properties.groupID) { this.groupID = properties.groupID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public groupID?: number|null = 0
}
export interface IDisbandGroupResp {
}
@protobuf.Type.d("mpff_social_im_v2_DisbandGroupResp")
export class DisbandGroupResp extends protobuf.Message<IDisbandGroupResp> {
    constructor(properties: Properties<IDisbandGroupResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface ISetGroupAnnouncementReq {
    groupID?: number|null
    announcement?: string|null
}
@protobuf.Type.d("mpff_social_im_v2_SetGroupAnnouncementReq")
export class SetGroupAnnouncementReq extends protobuf.Message<ISetGroupAnnouncementReq> {
    constructor(properties: Properties<ISetGroupAnnouncementReq>) {
        super(properties);
        if (properties) {
            if (properties.groupID) { this.groupID = properties.groupID }
            if (properties.announcement) { this.announcement = properties.announcement }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public groupID?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public announcement?: string|null = ""
}
export interface ISetGroupAnnouncementResp {
}
@protobuf.Type.d("mpff_social_im_v2_SetGroupAnnouncementResp")
export class SetGroupAnnouncementResp extends protobuf.Message<ISetGroupAnnouncementResp> {
    constructor(properties: Properties<ISetGroupAnnouncementResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface INotifyMsg {
    cmd?: NotifyMsg_Cmd|null
    message?: IMessage
    srvSeq?: mp_common_IMessageSeq
}
@protobuf.Type.d("mpff_social_im_v2_NotifyMsg")
export class NotifyMsg extends protobuf.Message<INotifyMsg> {
    constructor(properties: Properties<INotifyMsg>) {
        super(properties);
        if (properties) {
            if (properties.cmd) { this.cmd = properties.cmd }
            if (properties.message) { this.message = Message.create(properties.message) as any }
            if (properties.srvSeq) { this.srvSeq = mp_common_MessageSeq.create(properties.srvSeq) as any }
        }
	}
    @protobuf.Field.d(1, NotifyMsg_Cmd, "optional", NotifyMsg_Cmd.NotifyCmdUnknow)
    public cmd?: NotifyMsg_Cmd|null = NotifyMsg_Cmd.NotifyCmdUnknow
    @protobuf.Field.d(2, "mpff_social_im_v2_Message", "optional")
    public message?: Message|null
    @protobuf.Field.d(3, "mp_common_MessageSeq", "optional")
    public srvSeq?: mp_common_MessageSeq|null
}
class $IM extends RpcService {
    async SendMessage(req: ISendMessageReq, params?: RpcParams) : Promise<{err:number, resp:ISendMessageResp}> {
        let data = SendMessageReq.create(req)
        this.onBeforeReq("SendMessage", data, params)
        const buffer = SendMessageReq.encode(data).finish()
        let [err, pack] = await this.call("SendMessage", buffer, params)
        if (err) {
            this.onBeforeResp("SendMessage", err)
            return {err: err, resp: null}
        } else {
            let resp = SendMessageResp.decode(pack) as any
            this.onBeforeResp("SendMessage", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListMessage(req: IListMessageReq, params?: RpcParams) : Promise<{err:number, resp:IListMessageResp}> {
        let data = ListMessageReq.create(req)
        this.onBeforeReq("ListMessage", data, params)
        const buffer = ListMessageReq.encode(data).finish()
        let [err, pack] = await this.call("ListMessage", buffer, params)
        if (err) {
            this.onBeforeResp("ListMessage", err)
            return {err: err, resp: null}
        } else {
            let resp = ListMessageResp.decode(pack) as any
            this.onBeforeResp("ListMessage", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ItemQuery(req: IItemQueryReq, params?: RpcParams) : Promise<{err:number, resp:IItemQueryResp}> {
        let data = ItemQueryReq.create(req)
        this.onBeforeReq("ItemQuery", data, params)
        const buffer = ItemQueryReq.encode(data).finish()
        let [err, pack] = await this.call("ItemQuery", buffer, params)
        if (err) {
            this.onBeforeResp("ItemQuery", err)
            return {err: err, resp: null}
        } else {
            let resp = ItemQueryResp.decode(pack) as any
            this.onBeforeResp("ItemQuery", err, resp)
            return {err: null, resp: resp}
        }
    }
    async CreateGroup(req: ICreateGroupReq, params?: RpcParams) : Promise<{err:number, resp:ICreateGroupResp}> {
        let data = CreateGroupReq.create(req)
        this.onBeforeReq("CreateGroup", data, params)
        const buffer = CreateGroupReq.encode(data).finish()
        let [err, pack] = await this.call("CreateGroup", buffer, params)
        if (err) {
            this.onBeforeResp("CreateGroup", err)
            return {err: err, resp: null}
        } else {
            let resp = CreateGroupResp.decode(pack) as any
            this.onBeforeResp("CreateGroup", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetGroup(req: IGetGroupReq, params?: RpcParams) : Promise<{err:number, resp:IGetGroupResp}> {
        let data = GetGroupReq.create(req)
        this.onBeforeReq("GetGroup", data, params)
        const buffer = GetGroupReq.encode(data).finish()
        let [err, pack] = await this.call("GetGroup", buffer, params)
        if (err) {
            this.onBeforeResp("GetGroup", err)
            return {err: err, resp: null}
        } else {
            let resp = GetGroupResp.decode(pack) as any
            this.onBeforeResp("GetGroup", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetGroupExtraInfo(req: IGetGroupExtraInfoReq, params?: RpcParams) : Promise<{err:number, resp:IGetGroupExtraInfoResp}> {
        let data = GetGroupExtraInfoReq.create(req)
        this.onBeforeReq("GetGroupExtraInfo", data, params)
        const buffer = GetGroupExtraInfoReq.encode(data).finish()
        let [err, pack] = await this.call("GetGroupExtraInfo", buffer, params)
        if (err) {
            this.onBeforeResp("GetGroupExtraInfo", err)
            return {err: err, resp: null}
        } else {
            let resp = GetGroupExtraInfoResp.decode(pack) as any
            this.onBeforeResp("GetGroupExtraInfo", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SaveGroup(req: ISaveGroupReq, params?: RpcParams) : Promise<{err:number, resp:ISaveGroupResp}> {
        let data = SaveGroupReq.create(req)
        this.onBeforeReq("SaveGroup", data, params)
        const buffer = SaveGroupReq.encode(data).finish()
        let [err, pack] = await this.call("SaveGroup", buffer, params)
        if (err) {
            this.onBeforeResp("SaveGroup", err)
            return {err: err, resp: null}
        } else {
            let resp = SaveGroupResp.decode(pack) as any
            this.onBeforeResp("SaveGroup", err, resp)
            return {err: null, resp: resp}
        }
    }
    async RemoveGroupUser(req: IRemoveGroupUserReq, params?: RpcParams) : Promise<{err:number, resp:IRemoveGroupUserResp}> {
        let data = RemoveGroupUserReq.create(req)
        this.onBeforeReq("RemoveGroupUser", data, params)
        const buffer = RemoveGroupUserReq.encode(data).finish()
        let [err, pack] = await this.call("RemoveGroupUser", buffer, params)
        if (err) {
            this.onBeforeResp("RemoveGroupUser", err)
            return {err: err, resp: null}
        } else {
            let resp = RemoveGroupUserResp.decode(pack) as any
            this.onBeforeResp("RemoveGroupUser", err, resp)
            return {err: null, resp: resp}
        }
    }
    async AddGroupUser(req: IAddGroupUserReq, params?: RpcParams) : Promise<{err:number, resp:IAddGroupUserResp}> {
        let data = AddGroupUserReq.create(req)
        this.onBeforeReq("AddGroupUser", data, params)
        const buffer = AddGroupUserReq.encode(data).finish()
        let [err, pack] = await this.call("AddGroupUser", buffer, params)
        if (err) {
            this.onBeforeResp("AddGroupUser", err)
            return {err: err, resp: null}
        } else {
            let resp = AddGroupUserResp.decode(pack) as any
            this.onBeforeResp("AddGroupUser", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListGroupUser(req: IListGroupUserReq, params?: RpcParams) : Promise<{err:number, resp:IListGroupUserResp}> {
        let data = ListGroupUserReq.create(req)
        this.onBeforeReq("ListGroupUser", data, params)
        const buffer = ListGroupUserReq.encode(data).finish()
        let [err, pack] = await this.call("ListGroupUser", buffer, params)
        if (err) {
            this.onBeforeResp("ListGroupUser", err)
            return {err: err, resp: null}
        } else {
            let resp = ListGroupUserResp.decode(pack) as any
            this.onBeforeResp("ListGroupUser", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetGroupUser(req: IGetGroupUserReq, params?: RpcParams) : Promise<{err:number, resp:IGetGroupUserResp}> {
        let data = GetGroupUserReq.create(req)
        this.onBeforeReq("GetGroupUser", data, params)
        const buffer = GetGroupUserReq.encode(data).finish()
        let [err, pack] = await this.call("GetGroupUser", buffer, params)
        if (err) {
            this.onBeforeResp("GetGroupUser", err)
            return {err: err, resp: null}
        } else {
            let resp = GetGroupUserResp.decode(pack) as any
            this.onBeforeResp("GetGroupUser", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SetGroupUser(req: ISetGroupUserReq, params?: RpcParams) : Promise<{err:number, resp:ISetGroupUserResp}> {
        let data = SetGroupUserReq.create(req)
        this.onBeforeReq("SetGroupUser", data, params)
        const buffer = SetGroupUserReq.encode(data).finish()
        let [err, pack] = await this.call("SetGroupUser", buffer, params)
        if (err) {
            this.onBeforeResp("SetGroupUser", err)
            return {err: err, resp: null}
        } else {
            let resp = SetGroupUserResp.decode(pack) as any
            this.onBeforeResp("SetGroupUser", err, resp)
            return {err: null, resp: resp}
        }
    }
    async JoinGroup(req: IJoinGroupReq, params?: RpcParams) : Promise<{err:number, resp:IJoinGroupResp}> {
        let data = JoinGroupReq.create(req)
        this.onBeforeReq("JoinGroup", data, params)
        const buffer = JoinGroupReq.encode(data).finish()
        let [err, pack] = await this.call("JoinGroup", buffer, params)
        if (err) {
            this.onBeforeResp("JoinGroup", err)
            return {err: err, resp: null}
        } else {
            let resp = JoinGroupResp.decode(pack) as any
            this.onBeforeResp("JoinGroup", err, resp)
            return {err: null, resp: resp}
        }
    }
    async CreateJoinGroupInvite(req: ICreateJoinGroupInviteReq, params?: RpcParams) : Promise<{err:number, resp:ICreateJoinGroupInviteResp}> {
        let data = CreateJoinGroupInviteReq.create(req)
        this.onBeforeReq("CreateJoinGroupInvite", data, params)
        const buffer = CreateJoinGroupInviteReq.encode(data).finish()
        let [err, pack] = await this.call("CreateJoinGroupInvite", buffer, params)
        if (err) {
            this.onBeforeResp("CreateJoinGroupInvite", err)
            return {err: err, resp: null}
        } else {
            let resp = CreateJoinGroupInviteResp.decode(pack) as any
            this.onBeforeResp("CreateJoinGroupInvite", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SyncApplyJoinGroup(req: ISyncApplyJoinGroupReq, params?: RpcParams) : Promise<{err:number, resp:ISyncApplyJoinGroupResp}> {
        let data = SyncApplyJoinGroupReq.create(req)
        this.onBeforeReq("SyncApplyJoinGroup", data, params)
        const buffer = SyncApplyJoinGroupReq.encode(data).finish()
        let [err, pack] = await this.call("SyncApplyJoinGroup", buffer, params)
        if (err) {
            this.onBeforeResp("SyncApplyJoinGroup", err)
            return {err: err, resp: null}
        } else {
            let resp = SyncApplyJoinGroupResp.decode(pack) as any
            this.onBeforeResp("SyncApplyJoinGroup", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ProcessApplyJoinGroup(req: IProcessApplyJoinGroupReq, params?: RpcParams) : Promise<{err:number, resp:IProcessApplyJoinGroupResp}> {
        let data = ProcessApplyJoinGroupReq.create(req)
        this.onBeforeReq("ProcessApplyJoinGroup", data, params)
        const buffer = ProcessApplyJoinGroupReq.encode(data).finish()
        let [err, pack] = await this.call("ProcessApplyJoinGroup", buffer, params)
        if (err) {
            this.onBeforeResp("ProcessApplyJoinGroup", err)
            return {err: err, resp: null}
        } else {
            let resp = ProcessApplyJoinGroupResp.decode(pack) as any
            this.onBeforeResp("ProcessApplyJoinGroup", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ChangeGroupOwner(req: IChangeGroupOwnerReq, params?: RpcParams) : Promise<{err:number, resp:IChangeGroupOwnerResp}> {
        let data = ChangeGroupOwnerReq.create(req)
        this.onBeforeReq("ChangeGroupOwner", data, params)
        const buffer = ChangeGroupOwnerReq.encode(data).finish()
        let [err, pack] = await this.call("ChangeGroupOwner", buffer, params)
        if (err) {
            this.onBeforeResp("ChangeGroupOwner", err)
            return {err: err, resp: null}
        } else {
            let resp = ChangeGroupOwnerResp.decode(pack) as any
            this.onBeforeResp("ChangeGroupOwner", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListChannel(req: IListChannelReq, params?: RpcParams) : Promise<{err:number, resp:IListChannelResp}> {
        let data = ListChannelReq.create(req)
        this.onBeforeReq("ListChannel", data, params)
        const buffer = ListChannelReq.encode(data).finish()
        let [err, pack] = await this.call("ListChannel", buffer, params)
        if (err) {
            this.onBeforeResp("ListChannel", err)
            return {err: err, resp: null}
        } else {
            let resp = ListChannelResp.decode(pack) as any
            this.onBeforeResp("ListChannel", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SaveConversationSetting(req: ISaveConversationSettingReq, params?: RpcParams) : Promise<{err:number, resp:ISaveConversationSettingResp}> {
        let data = SaveConversationSettingReq.create(req)
        this.onBeforeReq("SaveConversationSetting", data, params)
        const buffer = SaveConversationSettingReq.encode(data).finish()
        let [err, pack] = await this.call("SaveConversationSetting", buffer, params)
        if (err) {
            this.onBeforeResp("SaveConversationSetting", err)
            return {err: err, resp: null}
        } else {
            let resp = SaveConversationSettingResp.decode(pack) as any
            this.onBeforeResp("SaveConversationSetting", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetConversationSetting(req: IGetConversationSettingReq, params?: RpcParams) : Promise<{err:number, resp:IGetConversationSettingResp}> {
        let data = GetConversationSettingReq.create(req)
        this.onBeforeReq("GetConversationSetting", data, params)
        const buffer = GetConversationSettingReq.encode(data).finish()
        let [err, pack] = await this.call("GetConversationSetting", buffer, params)
        if (err) {
            this.onBeforeResp("GetConversationSetting", err)
            return {err: err, resp: null}
        } else {
            let resp = GetConversationSettingResp.decode(pack) as any
            this.onBeforeResp("GetConversationSetting", err, resp)
            return {err: null, resp: resp}
        }
    }
    async Login(req: ILoginReq, params?: RpcParams) : Promise<{err:number, resp:ILoginResp}> {
        let data = LoginReq.create(req)
        this.onBeforeReq("Login", data, params)
        const buffer = LoginReq.encode(data).finish()
        let [err, pack] = await this.call("Login", buffer, params)
        if (err) {
            this.onBeforeResp("Login", err)
            return {err: err, resp: null}
        } else {
            let resp = LoginResp.decode(pack) as any
            this.onBeforeResp("Login", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DisbandGroup(req: IDisbandGroupReq, params?: RpcParams) : Promise<{err:number, resp:IDisbandGroupResp}> {
        let data = DisbandGroupReq.create(req)
        this.onBeforeReq("DisbandGroup", data, params)
        const buffer = DisbandGroupReq.encode(data).finish()
        let [err, pack] = await this.call("DisbandGroup", buffer, params)
        if (err) {
            this.onBeforeResp("DisbandGroup", err)
            return {err: err, resp: null}
        } else {
            let resp = DisbandGroupResp.decode(pack) as any
            this.onBeforeResp("DisbandGroup", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SetGroupAnnouncement(req: ISetGroupAnnouncementReq, params?: RpcParams) : Promise<{err:number, resp:ISetGroupAnnouncementResp}> {
        let data = SetGroupAnnouncementReq.create(req)
        this.onBeforeReq("SetGroupAnnouncement", data, params)
        const buffer = SetGroupAnnouncementReq.encode(data).finish()
        let [err, pack] = await this.call("SetGroupAnnouncement", buffer, params)
        if (err) {
            this.onBeforeResp("SetGroupAnnouncement", err)
            return {err: err, resp: null}
        } else {
            let resp = SetGroupAnnouncementResp.decode(pack) as any
            this.onBeforeResp("SetGroupAnnouncement", err, resp)
            return {err: null, resp: resp}
        }
    }
    async MpNotifyCall(req: mp_common_IMpIMNotifyCall, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = mp_common_MpIMNotifyCall.create(req)
        this.onBeforeReq("MpNotifyCall", data, params)
        const buffer = mp_common_MpIMNotifyCall.encode(data).finish()
        let [err, pack] = await this.call("MpNotifyCall", buffer, params)
        if (err) {
            this.onBeforeResp("MpNotifyCall", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("MpNotifyCall", err, resp)
            return {err: null, resp: resp}
        }
    }
    NotifyMessage(data: Uint8Array, params: RpcParams) : {msg: INotifyMsg, eventID?: number} {
        let msg = NotifyMsg.decode(data)
        return {msg: msg}
    }
}
export const IM = new $IM({
    name: "mpff.social.im.v2",
})
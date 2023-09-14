import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  StringValue as mp_common_StringValue,IStringValue as mp_common_IStringValue ,  Int64Value as mp_common_Int64Value,IInt64Value as mp_common_IInt64Value ,  Int32Value as mp_common_Int32Value,IInt32Value as mp_common_IInt32Value ,  BytesValue as mp_common_BytesValue,IBytesValue as mp_common_IBytesValue ,  } from "idl/mp/common/wrappers"
export enum ChatType {  
    Single = 0,  
    Group = 1,  
    Official = 3,  
    Channel = 4,
}
export enum FromType {  
    FromTypeUser = 0,  
    FromTypeOfficial = 3,
}
export enum GroupRole {  
    GroupRoleUnknown = 0,  
    GroupRoleOwner = 1,  
    GroupRoleAdmin = 2,  
    GroupRoleMember = 3,
}
export enum MessageType {  
    Text = 0,  
    Image = 7,  
    Voice = 8,  
    Video = 9,  
    File = 10,  
    Quote = 5,  
    Revoked = 6,  
    List = 11,  
    Edit = 12,  
    Meeting = 20,  
    MeetingSignaling = 21,  
    Merger = 30,  
    Card = 40,  
    Custom = 100,  
    Sys = 101,
}
export enum CallingAction {  
    Unknown = 0,  
    Invite = 1,  
    Reject = 2,  
    Accept = 3,  
    Leave = 4,
}
export enum CallingFinishReason {  
    ReasonUnknown = 0,  
    ReasonCancel = 1,  
    ReasonReject = 2,  
    ReasonTimeOut = 3,  
    ReasonBusy = 4,  
    ReasonHangUp = 5,  
    ReasonException = 6,
}
export enum MediaMode {  
    MediaModeUnknown = 0,  
    MediaModeAudio = 1,  
    MediaModeVideo = 2,  
    MediaModeVideoAndAudio = 3,
}
export enum SysCMD {  
    SysCmdUnknown = 0,  
    MessageBegin = 1001,  
    InboxNewMessage = 1002,  
    SendMessageRejected = 1003,  
    MessageDel = 1004,  
    MessageUpdate = 1005,  
    MessageEnd = 2000,  
    GroupBegin = 5001,  
    GroupCreated = 5002,  
    AddGroupUser = 5003,  
    RemoveGroupUser = 5004,  
    UpdateGroupAnnouncement = 5005,  
    UpdateGroupName = 5006,  
    ChangeGroupOwner = 5008,  
    GroupSetRole = 5009,  
    GroupChangeInfo = 5010,  
    InviteGroupUser = 5011,  
    GroupUserInfoChange = 5012,  
    GroupEnd = 7001,  
    RelateBegin = 7002,  
    RelateApplyAccept = 7003,  
    RelateEnd = 8000,
}
export enum GroupJoinStrategy_GroupJoinType {  
    GroupJoinTypeDirectly = 0,  
    GroupJoinTypeApply = 1,
}
export enum ItemComponent_ItemComponentType {  
    UnknownComponentType = 0,  
    MessageBox = 1,
}
export enum MessageCard_CardType {  
    Single = 0,  
    Group = 1,
}
export enum MessageSysSendMessageRejected_RejectedType {  
    RejectUnknown = 0,  
    Blacked = 1,  
    BlockUser = 2,  
    SendLimit = 3,  
    Muted = 4,  
    SpeedLimit = 5,
}
export enum MessageSysMessageDel_Reason {  
    ReasonUnknown = 0,  
    ReasonAudit = 1,
}
export enum MessageSysGroupChangeInfo_Type {  
    GroupChangeInfoTypeUnknown = 0,  
    GroupChangeInfoTypeName = 1,  
    GroupChangeInfoTypeAnnouncement = 2,  
    GroupChangeInfoTypeMark = 3,  
    GroupChangeInfoTypeExtra = 4,  
    GroupChangeInfoTypeJoinStrategy = 5,
}
export enum MessageImage_Type {  
    Uknown = 0,  
    Orgin = 1,  
    Big = 2,  
    Thumb = 3,
}
export enum MessageSysMessageUpdate_Type {  
    MessageUpdateTypeUnknown = 0,  
    MessageUpdateTypeContent = 1,  
    MessageUpdateTypeReplyMarkup = 2,
}
export interface IMessageKey {
    timestamp?: number|null
    fromID?: number|null
    random?: number|null
}
@protobuf.Type.d("mp_common_MessageKey")
export class MessageKey extends protobuf.Message<IMessageKey> {
    constructor(properties: Properties<IMessageKey>) {
        super(properties);
        if (properties) {
            if (properties.timestamp) { this.timestamp = properties.timestamp }
            if (properties.fromID) { this.fromID = properties.fromID }
            if (properties.random) { this.random = properties.random }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public timestamp?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public fromID?: number|null = 0
    @protobuf.Field.d(3, "uint32", "optional", 0)
    public random?: number|null = 0
}
export interface IMessageSeq {
    bat?: number|null
    seq?: number|null
}
@protobuf.Type.d("mp_common_MessageSeq")
export class MessageSeq extends protobuf.Message<IMessageSeq> {
    constructor(properties: Properties<IMessageSeq>) {
        super(properties);
        if (properties) {
            if (properties.bat) { this.bat = properties.bat }
            if (properties.seq) { this.seq = properties.seq }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public bat?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public seq?: number|null = 0
}
export interface IHash {
    value?: string|null
    createdAt?: number|null
    expireAt?: number|null
}
@protobuf.Type.d("mp_common_Hash")
export class Hash extends protobuf.Message<IHash> {
    constructor(properties: Properties<IHash>) {
        super(properties);
        if (properties) {
            if (properties.value) { this.value = properties.value }
            if (properties.createdAt) { this.createdAt = properties.createdAt }
            if (properties.expireAt) { this.expireAt = properties.expireAt }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public value?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public createdAt?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public expireAt?: number|null = 0
}
export interface IGroupJoinStrategy {
    joinType?: GroupJoinStrategy_GroupJoinType|null
}
@protobuf.Type.d("mp_common_GroupJoinStrategy")
export class GroupJoinStrategy extends protobuf.Message<IGroupJoinStrategy> {
    constructor(properties: Properties<IGroupJoinStrategy>) {
        super(properties);
        if (properties) {
            if (properties.joinType) { this.joinType = properties.joinType }
        }
	}
    @protobuf.Field.d(1, GroupJoinStrategy_GroupJoinType, "optional", GroupJoinStrategy_GroupJoinType.GroupJoinTypeDirectly)
    public joinType?: GroupJoinStrategy_GroupJoinType|null = GroupJoinStrategy_GroupJoinType.GroupJoinTypeDirectly
}
export interface IGroupAnnouncement {
    announcement?: string|null
    createdAt?: number|null
    userID?: number|null
}
@protobuf.Type.d("mp_common_GroupAnnouncement")
export class GroupAnnouncement extends protobuf.Message<IGroupAnnouncement> {
    constructor(properties: Properties<IGroupAnnouncement>) {
        super(properties);
        if (properties) {
            if (properties.announcement) { this.announcement = properties.announcement }
            if (properties.createdAt) { this.createdAt = properties.createdAt }
            if (properties.userID) { this.userID = properties.userID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public announcement?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public createdAt?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public userID?: number|null = 0
}
export interface IMessageImage_Info {
    type?: MessageImage_Type|null
    size?: number|null
    width?: number|null
    height?: number|null
    suffix?: string|null
    name?: string|null
}
@protobuf.Type.d("mp_common_MessageImage_Info")
export class MessageImage_Info extends protobuf.Message<IMessageImage_Info> {
    constructor(properties: Properties<IMessageImage_Info>) {
        super(properties);
        if (properties) {
            if (properties.type) { this.type = properties.type }
            if (properties.size) { this.size = properties.size }
            if (properties.width) { this.width = properties.width }
            if (properties.height) { this.height = properties.height }
            if (properties.suffix) { this.suffix = properties.suffix }
            if (properties.name) { this.name = properties.name }
        }
	}
    @protobuf.Field.d(1, MessageImage_Type, "optional", MessageImage_Type.Uknown)
    public type?: MessageImage_Type|null = MessageImage_Type.Uknown
    @protobuf.Field.d(2, "int32", "optional", 0)
    public size?: number|null = 0
    @protobuf.Field.d(3, "int32", "optional", 0)
    public width?: number|null = 0
    @protobuf.Field.d(4, "int32", "optional", 0)
    public height?: number|null = 0
    @protobuf.Field.d(5, "string", "optional", )
    public suffix?: string|null = ""
    @protobuf.Field.d(6, "string", "optional", )
    public name?: string|null = ""
}
export interface IMessageAudio_Info {
    size?: number|null
    duration?: number|null
    suffix?: string|null
    name?: string|null
}
@protobuf.Type.d("mp_common_MessageAudio_Info")
export class MessageAudio_Info extends protobuf.Message<IMessageAudio_Info> {
    constructor(properties: Properties<IMessageAudio_Info>) {
        super(properties);
        if (properties) {
            if (properties.size) { this.size = properties.size }
            if (properties.duration) { this.duration = properties.duration }
            if (properties.suffix) { this.suffix = properties.suffix }
            if (properties.name) { this.name = properties.name }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public size?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public duration?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public suffix?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public name?: string|null = ""
}
export interface IMessageVideo_Info {
    width?: number|null
    height?: number|null
    duration?: number|null
    size?: number|null
    suffix?: string|null
    name?: string|null
}
@protobuf.Type.d("mp_common_MessageVideo_Info")
export class MessageVideo_Info extends protobuf.Message<IMessageVideo_Info> {
    constructor(properties: Properties<IMessageVideo_Info>) {
        super(properties);
        if (properties) {
            if (properties.width) { this.width = properties.width }
            if (properties.height) { this.height = properties.height }
            if (properties.duration) { this.duration = properties.duration }
            if (properties.size) { this.size = properties.size }
            if (properties.suffix) { this.suffix = properties.suffix }
            if (properties.name) { this.name = properties.name }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public width?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public height?: number|null = 0
    @protobuf.Field.d(3, "int32", "optional", 0)
    public duration?: number|null = 0
    @protobuf.Field.d(4, "int32", "optional", 0)
    public size?: number|null = 0
    @protobuf.Field.d(5, "string", "optional", )
    public suffix?: string|null = ""
    @protobuf.Field.d(6, "string", "optional", )
    public name?: string|null = ""
}
export interface IMessageFile_Info {
    size?: number|null
    suffix?: string|null
    name?: string|null
}
@protobuf.Type.d("mp_common_MessageFile_Info")
export class MessageFile_Info extends protobuf.Message<IMessageFile_Info> {
    constructor(properties: Properties<IMessageFile_Info>) {
        super(properties);
        if (properties) {
            if (properties.size) { this.size = properties.size }
            if (properties.suffix) { this.suffix = properties.suffix }
            if (properties.name) { this.name = properties.name }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public size?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public suffix?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public name?: string|null = ""
}
export interface IMessageQuote {
    msgKey?: IMessageKey
    content?: string|null
}
@protobuf.Type.d("mp_common_MessageQuote")
export class MessageQuote extends protobuf.Message<IMessageQuote> {
    constructor(properties: Properties<IMessageQuote>) {
        super(properties);
        if (properties) {
            if (properties.msgKey) { this.msgKey = MessageKey.create(properties.msgKey) as any }
            if (properties.content) { this.content = properties.content }
        }
	}
    @protobuf.Field.d(1, "mp_common_MessageKey", "optional")
    public msgKey?: MessageKey|null
    @protobuf.Field.d(2, "string", "optional", )
    public content?: string|null = ""
}
export interface IMessageRevoked {
    msgKey?: IMessageKey
}
@protobuf.Type.d("mp_common_MessageRevoked")
export class MessageRevoked extends protobuf.Message<IMessageRevoked> {
    constructor(properties: Properties<IMessageRevoked>) {
        super(properties);
        if (properties) {
            if (properties.msgKey) { this.msgKey = MessageKey.create(properties.msgKey) as any }
        }
	}
    @protobuf.Field.d(1, "mp_common_MessageKey", "optional")
    public msgKey?: MessageKey|null
}
export interface IItemComponentMessageBox {
    title?: string|null
    message?: string|null
    confirmText?: string|null
    cancelText?: string|null
}
@protobuf.Type.d("mp_common_ItemComponentMessageBox")
export class ItemComponentMessageBox extends protobuf.Message<IItemComponentMessageBox> {
    constructor(properties: Properties<IItemComponentMessageBox>) {
        super(properties);
        if (properties) {
            if (properties.title) { this.title = properties.title }
            if (properties.message) { this.message = properties.message }
            if (properties.confirmText) { this.confirmText = properties.confirmText }
            if (properties.cancelText) { this.cancelText = properties.cancelText }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public title?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public message?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public confirmText?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public cancelText?: string|null = ""
}
export interface IItemComponent {
    type?: ItemComponent_ItemComponentType|null
    messageBox?: IItemComponentMessageBox
}
@protobuf.Type.d("mp_common_ItemComponent")
export class ItemComponent extends protobuf.Message<IItemComponent> {
    constructor(properties: Properties<IItemComponent>) {
        super(properties);
        if (properties) {
            if (properties.type) { this.type = properties.type }
            if (properties.messageBox) { this.messageBox = ItemComponentMessageBox.create(properties.messageBox) as any }
        }
	}
    @protobuf.Field.d(1, ItemComponent_ItemComponentType, "optional", ItemComponent_ItemComponentType.UnknownComponentType)
    public type?: ItemComponent_ItemComponentType|null = ItemComponent_ItemComponentType.UnknownComponentType
    @protobuf.Field.d(2, "mp_common_ItemComponentMessageBox", "optional")
    public messageBox?: ItemComponentMessageBox|null
}
export interface IItem {
    text?: string|null
    url?: string|null
    queryData?: Uint8Array
    queryURL?: string|null
    component?: IItemComponent
    expireAt?: number|null
}
@protobuf.Type.d("mp_common_Item")
export class Item extends protobuf.Message<IItem> {
    constructor(properties: Properties<IItem>) {
        super(properties);
        if (properties) {
            if (properties.text) { this.text = properties.text }
            if (properties.url) { this.url = properties.url }
            if (properties.queryData) { this.queryData = properties.queryData }
            if (properties.queryURL) { this.queryURL = properties.queryURL }
            if (properties.component) { this.component = ItemComponent.create(properties.component) as any }
            if (properties.expireAt) { this.expireAt = properties.expireAt }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public text?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public url?: string|null = ""
    @protobuf.Field.d(3, "bytes", "optional", [])
    public queryData?: Uint8Array
    @protobuf.Field.d(4, "string", "optional", )
    public queryURL?: string|null = ""
    @protobuf.Field.d(5, "mp_common_ItemComponent", "optional")
    public component?: ItemComponent|null
    @protobuf.Field.d(6, "int64", "optional", 0)
    public expireAt?: number|null = 0
}
export interface IInlineKeyboardMarkup_ItemList {
    list?: IItem[]
}
@protobuf.Type.d("mp_common_InlineKeyboardMarkup_ItemList")
export class InlineKeyboardMarkup_ItemList extends protobuf.Message<IInlineKeyboardMarkup_ItemList> {
    constructor(properties: Properties<IInlineKeyboardMarkup_ItemList>) {
        super(properties);
        if (properties) {
            if (properties.list) { this.list = []; properties.list.forEach((value, index)=>{this.list[index] = Item.create(properties.list[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "mp_common_Item", "repeated")
    public list?: Item[] = []
}
export interface IInlineKeyboardMarkup {
    list?: IInlineKeyboardMarkup_ItemList[]
    expireAt?: number|null
}
@protobuf.Type.d("mp_common_InlineKeyboardMarkup")
export class InlineKeyboardMarkup extends protobuf.Message<IInlineKeyboardMarkup> {
    constructor(properties: Properties<IInlineKeyboardMarkup>) {
        super(properties);
        if (properties) {
            if (properties.list) { this.list = []; properties.list.forEach((value, index)=>{this.list[index] = InlineKeyboardMarkup_ItemList.create(properties.list[index]) as any})}
            if (properties.expireAt) { this.expireAt = properties.expireAt }
        }
	}
    @protobuf.Field.d(1, "mp_common_InlineKeyboardMarkup_ItemList", "repeated")
    public list?: InlineKeyboardMarkup_ItemList[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public expireAt?: number|null = 0
}
export interface IMessageList {
    text?: string|null
    items?: IItem[]
}
@protobuf.Type.d("mp_common_MessageList")
export class MessageList extends protobuf.Message<IMessageList> {
    constructor(properties: Properties<IMessageList>) {
        super(properties);
        if (properties) {
            if (properties.text) { this.text = properties.text }
            if (properties.items) { this.items = []; properties.items.forEach((value, index)=>{this.items[index] = Item.create(properties.items[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public text?: string|null = ""
    @protobuf.Field.d(2, "mp_common_Item", "repeated")
    public items?: Item[] = []
}
export interface IMessageEntityMention {
    offset?: number|null
    length?: number|null
    mentionID?: number|null
}
@protobuf.Type.d("mp_common_MessageEntityMention")
export class MessageEntityMention extends protobuf.Message<IMessageEntityMention> {
    constructor(properties: Properties<IMessageEntityMention>) {
        super(properties);
        if (properties) {
            if (properties.offset) { this.offset = properties.offset }
            if (properties.length) { this.length = properties.length }
            if (properties.mentionID) { this.mentionID = properties.mentionID }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public offset?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public length?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public mentionID?: number|null = 0
}
export interface IMessageSys {
    cmd?: SysCMD|null
    body?: Uint8Array
}
@protobuf.Type.d("mp_common_MessageSys")
export class MessageSys extends protobuf.Message<IMessageSys> {
    constructor(properties: Properties<IMessageSys>) {
        super(properties);
        if (properties) {
            if (properties.cmd) { this.cmd = properties.cmd }
            if (properties.body) { this.body = properties.body }
        }
	}
    @protobuf.Field.d(1, SysCMD, "optional", SysCMD.SysCmdUnknown)
    public cmd?: SysCMD|null = SysCMD.SysCmdUnknown
    @protobuf.Field.d(2, "bytes", "optional", [])
    public body?: Uint8Array
}
export interface IMessageCard {
    type?: MessageCard_CardType|null
    userID?: number|null
}
@protobuf.Type.d("mp_common_MessageCard")
export class MessageCard extends protobuf.Message<IMessageCard> {
    constructor(properties: Properties<IMessageCard>) {
        super(properties);
        if (properties) {
            if (properties.type) { this.type = properties.type }
            if (properties.userID) { this.userID = properties.userID }
        }
	}
    @protobuf.Field.d(1, MessageCard_CardType, "optional", MessageCard_CardType.Single)
    public type?: MessageCard_CardType|null = MessageCard_CardType.Single
    @protobuf.Field.d(2, "int64", "optional", 0)
    public userID?: number|null = 0
}
export interface IMessageMeetingSignaling {
    version?: string|null
    platform?: number|null
    action?: CallingAction|null
    userIDList?: number[]
    callingUserIDList?: number[]
    roomID?: string|null
    mediaMode?: MediaMode|null
    reason?: CallingFinishReason|null
    expire?: number|null
    createUserID?: number|null
    extra?: Uint8Array
}
@protobuf.Type.d("mp_common_MessageMeetingSignaling")
export class MessageMeetingSignaling extends protobuf.Message<IMessageMeetingSignaling> {
    constructor(properties: Properties<IMessageMeetingSignaling>) {
        super(properties);
        if (properties) {
            if (properties.version) { this.version = properties.version }
            if (properties.platform) { this.platform = properties.platform }
            if (properties.action) { this.action = properties.action }
            if (properties.userIDList) { this.userIDList = []; properties.userIDList.forEach((value, index)=>{this.userIDList[index] = properties.userIDList[index]})}
            if (properties.callingUserIDList) { this.callingUserIDList = []; properties.callingUserIDList.forEach((value, index)=>{this.callingUserIDList[index] = properties.callingUserIDList[index]})}
            if (properties.roomID) { this.roomID = properties.roomID }
            if (properties.mediaMode) { this.mediaMode = properties.mediaMode }
            if (properties.reason) { this.reason = properties.reason }
            if (properties.expire) { this.expire = properties.expire }
            if (properties.createUserID) { this.createUserID = properties.createUserID }
            if (properties.extra) { this.extra = properties.extra }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public version?: string|null = ""
    @protobuf.Field.d(2, "int32", "optional", 0)
    public platform?: number|null = 0
    @protobuf.Field.d(3, CallingAction, "optional", CallingAction.Unknown)
    public action?: CallingAction|null = CallingAction.Unknown
    @protobuf.Field.d(4, "int64", "repeated", [])
    public userIDList?: number[] = []
    @protobuf.Field.d(5, "int64", "repeated", [])
    public callingUserIDList?: number[] = []
    @protobuf.Field.d(6, "string", "optional", )
    public roomID?: string|null = ""
    @protobuf.Field.d(7, MediaMode, "optional", MediaMode.MediaModeUnknown)
    public mediaMode?: MediaMode|null = MediaMode.MediaModeUnknown
    @protobuf.Field.d(8, CallingFinishReason, "optional", CallingFinishReason.ReasonUnknown)
    public reason?: CallingFinishReason|null = CallingFinishReason.ReasonUnknown
    @protobuf.Field.d(9, "int32", "optional", 0)
    public expire?: number|null = 0
    @protobuf.Field.d(10, "int64", "optional", 0)
    public createUserID?: number|null = 0
    @protobuf.Field.d(11, "bytes", "optional", [])
    public extra?: Uint8Array
}
export interface IMessageSysInboxNewMessage {
}
@protobuf.Type.d("mp_common_MessageSysInboxNewMessage")
export class MessageSysInboxNewMessage extends protobuf.Message<IMessageSysInboxNewMessage> {
    constructor(properties: Properties<IMessageSysInboxNewMessage>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IMessageSysSendMessageRejected {
    type?: MessageSysSendMessageRejected_RejectedType|null
}
@protobuf.Type.d("mp_common_MessageSysSendMessageRejected")
export class MessageSysSendMessageRejected extends protobuf.Message<IMessageSysSendMessageRejected> {
    constructor(properties: Properties<IMessageSysSendMessageRejected>) {
        super(properties);
        if (properties) {
            if (properties.type) { this.type = properties.type }
        }
	}
    @protobuf.Field.d(1, MessageSysSendMessageRejected_RejectedType, "optional", MessageSysSendMessageRejected_RejectedType.RejectUnknown)
    public type?: MessageSysSendMessageRejected_RejectedType|null = MessageSysSendMessageRejected_RejectedType.RejectUnknown
}
export interface IMessageSysMessageDel {
    reason?: MessageSysMessageDel_Reason|null
    msgKey?: IMessageKey
}
@protobuf.Type.d("mp_common_MessageSysMessageDel")
export class MessageSysMessageDel extends protobuf.Message<IMessageSysMessageDel> {
    constructor(properties: Properties<IMessageSysMessageDel>) {
        super(properties);
        if (properties) {
            if (properties.reason) { this.reason = properties.reason }
            if (properties.msgKey) { this.msgKey = MessageKey.create(properties.msgKey) as any }
        }
	}
    @protobuf.Field.d(1, MessageSysMessageDel_Reason, "optional", MessageSysMessageDel_Reason.ReasonUnknown)
    public reason?: MessageSysMessageDel_Reason|null = MessageSysMessageDel_Reason.ReasonUnknown
    @protobuf.Field.d(2, "mp_common_MessageKey", "optional")
    public msgKey?: MessageKey|null
}
export interface IReplyMarkup {
    inlineKeyboardMarkup?: IInlineKeyboardMarkup
}
@protobuf.Type.d("mp_common_ReplyMarkup")
export class ReplyMarkup extends protobuf.Message<IReplyMarkup> {
    constructor(properties: Properties<IReplyMarkup>) {
        super(properties);
        if (properties) {
            if (properties.inlineKeyboardMarkup) { this.inlineKeyboardMarkup = InlineKeyboardMarkup.create(properties.inlineKeyboardMarkup) as any }
        }
	}
    @protobuf.Field.d(1, "mp_common_InlineKeyboardMarkup", "optional")
    public inlineKeyboardMarkup?: InlineKeyboardMarkup|null
}
export interface IMessageSysGroupCreated {
    groupName?: string|null
    userIDList?: number[]
    updatedAt?: number|null
}
@protobuf.Type.d("mp_common_MessageSysGroupCreated")
export class MessageSysGroupCreated extends protobuf.Message<IMessageSysGroupCreated> {
    constructor(properties: Properties<IMessageSysGroupCreated>) {
        super(properties);
        if (properties) {
            if (properties.groupName) { this.groupName = properties.groupName }
            if (properties.userIDList) { this.userIDList = []; properties.userIDList.forEach((value, index)=>{this.userIDList[index] = properties.userIDList[index]})}
            if (properties.updatedAt) { this.updatedAt = properties.updatedAt }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public groupName?: string|null = ""
    @protobuf.Field.d(2, "int64", "repeated", [])
    public userIDList?: number[] = []
    @protobuf.Field.d(3, "int64", "optional", 0)
    public updatedAt?: number|null = 0
}
export interface IMessageSysAddGroupUser {
    userIDList?: number[]
    updatedAt?: number|null
}
@protobuf.Type.d("mp_common_MessageSysAddGroupUser")
export class MessageSysAddGroupUser extends protobuf.Message<IMessageSysAddGroupUser> {
    constructor(properties: Properties<IMessageSysAddGroupUser>) {
        super(properties);
        if (properties) {
            if (properties.userIDList) { this.userIDList = []; properties.userIDList.forEach((value, index)=>{this.userIDList[index] = properties.userIDList[index]})}
            if (properties.updatedAt) { this.updatedAt = properties.updatedAt }
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public userIDList?: number[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public updatedAt?: number|null = 0
}
export interface IMessageSysRemoveGroupUser {
    userIDList?: number[]
}
@protobuf.Type.d("mp_common_MessageSysRemoveGroupUser")
export class MessageSysRemoveGroupUser extends protobuf.Message<IMessageSysRemoveGroupUser> {
    constructor(properties: Properties<IMessageSysRemoveGroupUser>) {
        super(properties);
        if (properties) {
            if (properties.userIDList) { this.userIDList = []; properties.userIDList.forEach((value, index)=>{this.userIDList[index] = properties.userIDList[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public userIDList?: number[] = []
}
export interface IMessageSysUpdateGroupAnnouncement {
    announcement?: string|null
}
@protobuf.Type.d("mp_common_MessageSysUpdateGroupAnnouncement")
export class MessageSysUpdateGroupAnnouncement extends protobuf.Message<IMessageSysUpdateGroupAnnouncement> {
    constructor(properties: Properties<IMessageSysUpdateGroupAnnouncement>) {
        super(properties);
        if (properties) {
            if (properties.announcement) { this.announcement = properties.announcement }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public announcement?: string|null = ""
}
export interface IMessageSysChangeGroupOwner {
    oldOwnerID?: number|null
    newOwnerID?: number|null
}
@protobuf.Type.d("mp_common_MessageSysChangeGroupOwner")
export class MessageSysChangeGroupOwner extends protobuf.Message<IMessageSysChangeGroupOwner> {
    constructor(properties: Properties<IMessageSysChangeGroupOwner>) {
        super(properties);
        if (properties) {
            if (properties.oldOwnerID) { this.oldOwnerID = properties.oldOwnerID }
            if (properties.newOwnerID) { this.newOwnerID = properties.newOwnerID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public oldOwnerID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public newOwnerID?: number|null = 0
}
export interface IMessageSysGroupSetRole {
    operateUserID?: number|null
    userIDList?: number[]
    role?: GroupRole|null
}
@protobuf.Type.d("mp_common_MessageSysGroupSetRole")
export class MessageSysGroupSetRole extends protobuf.Message<IMessageSysGroupSetRole> {
    constructor(properties: Properties<IMessageSysGroupSetRole>) {
        super(properties);
        if (properties) {
            if (properties.operateUserID) { this.operateUserID = properties.operateUserID }
            if (properties.userIDList) { this.userIDList = []; properties.userIDList.forEach((value, index)=>{this.userIDList[index] = properties.userIDList[index]})}
            if (properties.role) { this.role = properties.role }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public operateUserID?: number|null = 0
    @protobuf.Field.d(2, "int64", "repeated", [])
    public userIDList?: number[] = []
    @protobuf.Field.d(3, GroupRole, "optional", GroupRole.GroupRoleUnknown)
    public role?: GroupRole|null = GroupRole.GroupRoleUnknown
}
export interface IMessageSysUpdateGroupName {
    groupName?: string|null
}
@protobuf.Type.d("mp_common_MessageSysUpdateGroupName")
export class MessageSysUpdateGroupName extends protobuf.Message<IMessageSysUpdateGroupName> {
    constructor(properties: Properties<IMessageSysUpdateGroupName>) {
        super(properties);
        if (properties) {
            if (properties.groupName) { this.groupName = properties.groupName }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public groupName?: string|null = ""
}
export interface IMessageSysGroupChangeInfo {
    changeType?: MessageSysGroupChangeInfo_Type|null
    userID?: number|null
    name?: string|null
    announcement?: IGroupAnnouncement
    mark?: string|null
    extra?: Uint8Array
    joinStrategy?: IGroupJoinStrategy
}
@protobuf.Type.d("mp_common_MessageSysGroupChangeInfo")
export class MessageSysGroupChangeInfo extends protobuf.Message<IMessageSysGroupChangeInfo> {
    constructor(properties: Properties<IMessageSysGroupChangeInfo>) {
        super(properties);
        if (properties) {
            if (properties.changeType) { this.changeType = properties.changeType }
            if (properties.userID) { this.userID = properties.userID }
            if (properties.name) { this.name = properties.name }
            if (properties.announcement) { this.announcement = GroupAnnouncement.create(properties.announcement) as any }
            if (properties.mark) { this.mark = properties.mark }
            if (properties.extra) { this.extra = properties.extra }
            if (properties.joinStrategy) { this.joinStrategy = GroupJoinStrategy.create(properties.joinStrategy) as any }
        }
	}
    @protobuf.Field.d(1, MessageSysGroupChangeInfo_Type, "optional", MessageSysGroupChangeInfo_Type.GroupChangeInfoTypeUnknown)
    public changeType?: MessageSysGroupChangeInfo_Type|null = MessageSysGroupChangeInfo_Type.GroupChangeInfoTypeUnknown
    @protobuf.Field.d(2, "int64", "optional", 0)
    public userID?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(4, "mp_common_GroupAnnouncement", "optional")
    public announcement?: GroupAnnouncement|null
    @protobuf.Field.d(5, "string", "optional", )
    public mark?: string|null = ""
    @protobuf.Field.d(6, "bytes", "optional", [])
    public extra?: Uint8Array
    @protobuf.Field.d(7, "mp_common_GroupJoinStrategy", "optional")
    public joinStrategy?: GroupJoinStrategy|null
}
export interface IGroupUserChangeInfo {
    userID?: number|null
    alias?: mp_common_IStringValue
    muteExpireAt?: mp_common_IInt64Value
    roleLevel?: mp_common_IInt32Value
    extra?: mp_common_IBytesValue
}
@protobuf.Type.d("mp_common_GroupUserChangeInfo")
export class GroupUserChangeInfo extends protobuf.Message<IGroupUserChangeInfo> {
    constructor(properties: Properties<IGroupUserChangeInfo>) {
        super(properties);
        if (properties) {
            if (properties.userID) { this.userID = properties.userID }
            if (properties.alias) { this.alias = mp_common_StringValue.create(properties.alias) as any }
            if (properties.muteExpireAt) { this.muteExpireAt = mp_common_Int64Value.create(properties.muteExpireAt) as any }
            if (properties.roleLevel) { this.roleLevel = mp_common_Int32Value.create(properties.roleLevel) as any }
            if (properties.extra) { this.extra = mp_common_BytesValue.create(properties.extra) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public userID?: number|null = 0
    @protobuf.Field.d(2, "mp_common_StringValue", "optional")
    public alias?: mp_common_StringValue|null
    @protobuf.Field.d(3, "mp_common_Int64Value", "optional")
    public muteExpireAt?: mp_common_Int64Value|null
    @protobuf.Field.d(4, "mp_common_Int32Value", "optional")
    public roleLevel?: mp_common_Int32Value|null
    @protobuf.Field.d(5, "mp_common_BytesValue", "optional")
    public extra?: mp_common_BytesValue|null
}
export interface IMessageSysGroupUserInfoChange {
    opUserID?: number|null
    changeInfo?: IGroupUserChangeInfo[]
    updatedAt?: number|null
}
@protobuf.Type.d("mp_common_MessageSysGroupUserInfoChange")
export class MessageSysGroupUserInfoChange extends protobuf.Message<IMessageSysGroupUserInfoChange> {
    constructor(properties: Properties<IMessageSysGroupUserInfoChange>) {
        super(properties);
        if (properties) {
            if (properties.opUserID) { this.opUserID = properties.opUserID }
            if (properties.changeInfo) { this.changeInfo = []; properties.changeInfo.forEach((value, index)=>{this.changeInfo[index] = GroupUserChangeInfo.create(properties.changeInfo[index]) as any})}
            if (properties.updatedAt) { this.updatedAt = properties.updatedAt }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public opUserID?: number|null = 0
    @protobuf.Field.d(2, "mp_common_GroupUserChangeInfo", "repeated")
    public changeInfo?: GroupUserChangeInfo[] = []
    @protobuf.Field.d(3, "int64", "optional", 0)
    public updatedAt?: number|null = 0
}
export interface IMessageSysInviteGroupUser {
    inviterID?: number|null
    userIDList?: number[]
    reason?: string|null
}
@protobuf.Type.d("mp_common_MessageSysInviteGroupUser")
export class MessageSysInviteGroupUser extends protobuf.Message<IMessageSysInviteGroupUser> {
    constructor(properties: Properties<IMessageSysInviteGroupUser>) {
        super(properties);
        if (properties) {
            if (properties.inviterID) { this.inviterID = properties.inviterID }
            if (properties.userIDList) { this.userIDList = []; properties.userIDList.forEach((value, index)=>{this.userIDList[index] = properties.userIDList[index]})}
            if (properties.reason) { this.reason = properties.reason }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public inviterID?: number|null = 0
    @protobuf.Field.d(2, "int64", "repeated", [])
    public userIDList?: number[] = []
    @protobuf.Field.d(3, "string", "optional", )
    public reason?: string|null = ""
}
export interface IMessageEntity {
    mentions?: IMessageEntityMention[]
}
@protobuf.Type.d("mp_common_MessageEntity")
export class MessageEntity extends protobuf.Message<IMessageEntity> {
    constructor(properties: Properties<IMessageEntity>) {
        super(properties);
        if (properties) {
            if (properties.mentions) { this.mentions = []; properties.mentions.forEach((value, index)=>{this.mentions[index] = MessageEntityMention.create(properties.mentions[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "mp_common_MessageEntityMention", "repeated")
    public mentions?: MessageEntityMention[] = []
}
export interface IMessageEdit {
    chatType?: ChatType|null
    msgKey?: IMessageKey
    type?: MessageType|null
    content?: Uint8Array
    entity?: IMessageEntity
    replyMarkup?: IReplyMarkup
}
@protobuf.Type.d("mp_common_MessageEdit")
export class MessageEdit extends protobuf.Message<IMessageEdit> {
    constructor(properties: Properties<IMessageEdit>) {
        super(properties);
        if (properties) {
            if (properties.chatType) { this.chatType = properties.chatType }
            if (properties.msgKey) { this.msgKey = MessageKey.create(properties.msgKey) as any }
            if (properties.type) { this.type = properties.type }
            if (properties.content) { this.content = properties.content }
            if (properties.entity) { this.entity = MessageEntity.create(properties.entity) as any }
            if (properties.replyMarkup) { this.replyMarkup = ReplyMarkup.create(properties.replyMarkup) as any }
        }
	}
    @protobuf.Field.d(1, ChatType, "optional", ChatType.Single)
    public chatType?: ChatType|null = ChatType.Single
    @protobuf.Field.d(2, "mp_common_MessageKey", "optional")
    public msgKey?: MessageKey|null
    @protobuf.Field.d(3, MessageType, "optional", MessageType.Text)
    public type?: MessageType|null = MessageType.Text
    @protobuf.Field.d(4, "bytes", "optional", [])
    public content?: Uint8Array
    @protobuf.Field.d(5, "mp_common_MessageEntity", "optional")
    public entity?: MessageEntity|null
    @protobuf.Field.d(6, "mp_common_ReplyMarkup", "optional")
    public replyMarkup?: ReplyMarkup|null
}
export interface IMessageImage {
    url?: string|null
    info?: IMessageImage_Info
    extra?: Uint8Array
}
@protobuf.Type.d("mp_common_MessageImage")
export class MessageImage extends protobuf.Message<IMessageImage> {
    constructor(properties: Properties<IMessageImage>) {
        super(properties);
        if (properties) {
            if (properties.url) { this.url = properties.url }
            if (properties.info) { this.info = MessageImage_Info.create(properties.info) as any }
            if (properties.extra) { this.extra = properties.extra }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public url?: string|null = ""
    @protobuf.Field.d(2, "mp_common_MessageImage_Info", "optional")
    public info?: MessageImage_Info|null
    @protobuf.Field.d(3, "bytes", "optional", [])
    public extra?: Uint8Array
}
export interface IMessageAudio {
    url?: string|null
    info?: IMessageAudio_Info
    extra?: Uint8Array
}
@protobuf.Type.d("mp_common_MessageAudio")
export class MessageAudio extends protobuf.Message<IMessageAudio> {
    constructor(properties: Properties<IMessageAudio>) {
        super(properties);
        if (properties) {
            if (properties.url) { this.url = properties.url }
            if (properties.info) { this.info = MessageAudio_Info.create(properties.info) as any }
            if (properties.extra) { this.extra = properties.extra }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public url?: string|null = ""
    @protobuf.Field.d(2, "mp_common_MessageAudio_Info", "optional")
    public info?: MessageAudio_Info|null
    @protobuf.Field.d(3, "bytes", "optional", [])
    public extra?: Uint8Array
}
export interface IMessageVideo {
    url?: string|null
    info?: IMessageVideo_Info
    extra?: Uint8Array
}
@protobuf.Type.d("mp_common_MessageVideo")
export class MessageVideo extends protobuf.Message<IMessageVideo> {
    constructor(properties: Properties<IMessageVideo>) {
        super(properties);
        if (properties) {
            if (properties.url) { this.url = properties.url }
            if (properties.info) { this.info = MessageVideo_Info.create(properties.info) as any }
            if (properties.extra) { this.extra = properties.extra }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public url?: string|null = ""
    @protobuf.Field.d(2, "mp_common_MessageVideo_Info", "optional")
    public info?: MessageVideo_Info|null
    @protobuf.Field.d(3, "bytes", "optional", [])
    public extra?: Uint8Array
}
export interface IMessageFile {
    url?: string|null
    info?: IMessageFile_Info
    extra?: Uint8Array
}
@protobuf.Type.d("mp_common_MessageFile")
export class MessageFile extends protobuf.Message<IMessageFile> {
    constructor(properties: Properties<IMessageFile>) {
        super(properties);
        if (properties) {
            if (properties.url) { this.url = properties.url }
            if (properties.info) { this.info = MessageFile_Info.create(properties.info) as any }
            if (properties.extra) { this.extra = properties.extra }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public url?: string|null = ""
    @protobuf.Field.d(2, "mp_common_MessageFile_Info", "optional")
    public info?: MessageFile_Info|null
    @protobuf.Field.d(3, "bytes", "optional", [])
    public extra?: Uint8Array
}
export interface IMessageSysMessageUpdate {
    changeTypes?: MessageSysMessageUpdate_Type[]
    msgKey?: IMessageKey
    content?: Uint8Array
    replyMarkup?: IReplyMarkup
}
@protobuf.Type.d("mp_common_MessageSysMessageUpdate")
export class MessageSysMessageUpdate extends protobuf.Message<IMessageSysMessageUpdate> {
    constructor(properties: Properties<IMessageSysMessageUpdate>) {
        super(properties);
        if (properties) {
            if (properties.changeTypes) { this.changeTypes = []; properties.changeTypes.forEach((value, index)=>{this.changeTypes[index] = properties.changeTypes[index]})}
            if (properties.msgKey) { this.msgKey = MessageKey.create(properties.msgKey) as any }
            if (properties.content) { this.content = properties.content }
            if (properties.replyMarkup) { this.replyMarkup = ReplyMarkup.create(properties.replyMarkup) as any }
        }
	}
    @protobuf.Field.d(1, MessageSysMessageUpdate_Type, "repeated", MessageSysMessageUpdate_Type.MessageUpdateTypeUnknown)
    public changeTypes?: MessageSysMessageUpdate_Type[] = []
    @protobuf.Field.d(2, "mp_common_MessageKey", "optional")
    public msgKey?: MessageKey|null
    @protobuf.Field.d(3, "bytes", "optional", [])
    public content?: Uint8Array
    @protobuf.Field.d(4, "mp_common_ReplyMarkup", "optional")
    public replyMarkup?: ReplyMarkup|null
}
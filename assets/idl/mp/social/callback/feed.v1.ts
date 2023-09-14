import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
export enum NoticeType {  
    NoticeTypeUnknown = 0,  
    NoticeTypeComment = 1,  
    NoticeTypeLike = 2,  
    NoticeTypeAt = 3,
}
export enum VisitPermission {  
    VisitPermissionDefault = 0,  
    VisitPermissionForbid = 1,
}
export interface ICallbackNotifyNewFeedReq {
    appID?: number|null
    fromUserID?: number|null
    toUserIDs?: number[]
    postID?: number|null
    createdAt?: number|null
}
@protobuf.Type.d("mp_social_callback_feed_v1_CallbackNotifyNewFeedReq")
export class CallbackNotifyNewFeedReq extends protobuf.Message<ICallbackNotifyNewFeedReq> {
    constructor(properties: Properties<ICallbackNotifyNewFeedReq>) {
        super(properties);
        if (properties) {
            if (properties.appID) { this.appID = properties.appID }
            if (properties.fromUserID) { this.fromUserID = properties.fromUserID }
            if (properties.toUserIDs) { this.toUserIDs = []; properties.toUserIDs.forEach((value, index)=>{this.toUserIDs[index] = properties.toUserIDs[index]})}
            if (properties.postID) { this.postID = properties.postID }
            if (properties.createdAt) { this.createdAt = properties.createdAt }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public appID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public fromUserID?: number|null = 0
    @protobuf.Field.d(3, "int64", "repeated", [])
    public toUserIDs?: number[] = []
    @protobuf.Field.d(4, "int64", "optional", 0)
    public postID?: number|null = 0
    @protobuf.Field.d(15, "int64", "optional", 0)
    public createdAt?: number|null = 0
}
export interface ICallbackNotifyNewFeedResp {
}
@protobuf.Type.d("mp_social_callback_feed_v1_CallbackNotifyNewFeedResp")
export class CallbackNotifyNewFeedResp extends protobuf.Message<ICallbackNotifyNewFeedResp> {
    constructor(properties: Properties<ICallbackNotifyNewFeedResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface INotice {
    appID?: number|null
    fromUserID?: number|null
    toUserID?: number|null
    postID?: number|null
    commentID?: number|null
    noticeID?: number|null
    noticeType?: NoticeType|null
    createdAt?: number|null
}
@protobuf.Type.d("mp_social_callback_feed_v1_Notice")
export class Notice extends protobuf.Message<INotice> {
    constructor(properties: Properties<INotice>) {
        super(properties);
        if (properties) {
            if (properties.appID) { this.appID = properties.appID }
            if (properties.fromUserID) { this.fromUserID = properties.fromUserID }
            if (properties.toUserID) { this.toUserID = properties.toUserID }
            if (properties.postID) { this.postID = properties.postID }
            if (properties.commentID) { this.commentID = properties.commentID }
            if (properties.noticeID) { this.noticeID = properties.noticeID }
            if (properties.noticeType) { this.noticeType = properties.noticeType }
            if (properties.createdAt) { this.createdAt = properties.createdAt }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public appID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public fromUserID?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public toUserID?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public postID?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public commentID?: number|null = 0
    @protobuf.Field.d(6, "int64", "optional", 0)
    public noticeID?: number|null = 0
    @protobuf.Field.d(7, NoticeType, "optional", NoticeType.NoticeTypeUnknown)
    public noticeType?: NoticeType|null = NoticeType.NoticeTypeUnknown
    @protobuf.Field.d(15, "int64", "optional", 0)
    public createdAt?: number|null = 0
}
export interface ICallbackNotifyNewNoticeReq {
    notices?: INotice[]
}
@protobuf.Type.d("mp_social_callback_feed_v1_CallbackNotifyNewNoticeReq")
export class CallbackNotifyNewNoticeReq extends protobuf.Message<ICallbackNotifyNewNoticeReq> {
    constructor(properties: Properties<ICallbackNotifyNewNoticeReq>) {
        super(properties);
        if (properties) {
            if (properties.notices) { this.notices = []; properties.notices.forEach((value, index)=>{this.notices[index] = Notice.create(properties.notices[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "mp_social_callback_feed_v1_Notice", "repeated")
    public notices?: Notice[] = []
}
export interface ICallbackNotifyNewNoticeResp {
}
@protobuf.Type.d("mp_social_callback_feed_v1_CallbackNotifyNewNoticeResp")
export class CallbackNotifyNewNoticeResp extends protobuf.Message<ICallbackNotifyNewNoticeResp> {
    constructor(properties: Properties<ICallbackNotifyNewNoticeResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IListFeedReceiverReq {
    appID?: number|null
    userID?: number|null
}
@protobuf.Type.d("mp_social_callback_feed_v1_ListFeedReceiverReq")
export class ListFeedReceiverReq extends protobuf.Message<IListFeedReceiverReq> {
    constructor(properties: Properties<IListFeedReceiverReq>) {
        super(properties);
        if (properties) {
            if (properties.appID) { this.appID = properties.appID }
            if (properties.userID) { this.userID = properties.userID }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public appID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public userID?: number|null = 0
}
export interface IReceiver {
    userID?: number|null
}
@protobuf.Type.d("mp_social_callback_feed_v1_Receiver")
export class Receiver extends protobuf.Message<IReceiver> {
    constructor(properties: Properties<IReceiver>) {
        super(properties);
        if (properties) {
            if (properties.userID) { this.userID = properties.userID }
        }
	}
    @protobuf.Field.d(2, "int64", "optional", 0)
    public userID?: number|null = 0
}
export interface IListFeedReceiverResp {
    receivers?: IReceiver[]
}
@protobuf.Type.d("mp_social_callback_feed_v1_ListFeedReceiverResp")
export class ListFeedReceiverResp extends protobuf.Message<IListFeedReceiverResp> {
    constructor(properties: Properties<IListFeedReceiverResp>) {
        super(properties);
        if (properties) {
            if (properties.receivers) { this.receivers = []; properties.receivers.forEach((value, index)=>{this.receivers[index] = Receiver.create(properties.receivers[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "mp_social_callback_feed_v1_Receiver", "repeated")
    public receivers?: Receiver[] = []
}
export interface ICheckUserVisitPermissionReq {
    appID?: number|null
    userID?: number|null
}
@protobuf.Type.d("mp_social_callback_feed_v1_CheckUserVisitPermissionReq")
export class CheckUserVisitPermissionReq extends protobuf.Message<ICheckUserVisitPermissionReq> {
    constructor(properties: Properties<ICheckUserVisitPermissionReq>) {
        super(properties);
        if (properties) {
            if (properties.appID) { this.appID = properties.appID }
            if (properties.userID) { this.userID = properties.userID }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public appID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public userID?: number|null = 0
}
export interface ICheckUserVisitPermissionResp {
    visitPermission?: VisitPermission|null
}
@protobuf.Type.d("mp_social_callback_feed_v1_CheckUserVisitPermissionResp")
export class CheckUserVisitPermissionResp extends protobuf.Message<ICheckUserVisitPermissionResp> {
    constructor(properties: Properties<ICheckUserVisitPermissionResp>) {
        super(properties);
        if (properties) {
            if (properties.visitPermission) { this.visitPermission = properties.visitPermission }
        }
	}
    @protobuf.Field.d(1, VisitPermission, "optional", VisitPermission.VisitPermissionDefault)
    public visitPermission?: VisitPermission|null = VisitPermission.VisitPermissionDefault
}
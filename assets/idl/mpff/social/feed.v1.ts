import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  Void as base_Void,IVoid as base_IVoid ,  } from "idl/base/base"
import {  CallbackNotifyRejectDetectionTaskReq as mp_audit_callback_detect_v1_CallbackNotifyRejectDetectionTaskReq,ICallbackNotifyRejectDetectionTaskReq as mp_audit_callback_detect_v1_ICallbackNotifyRejectDetectionTaskReq ,  CallbackNotifyRejectDetectionTaskResp as mp_audit_callback_detect_v1_CallbackNotifyRejectDetectionTaskResp,ICallbackNotifyRejectDetectionTaskResp as mp_audit_callback_detect_v1_ICallbackNotifyRejectDetectionTaskResp ,  } from "idl/mp/audit/callback/detect.v1"
import {  CallbackNotifyNewFeedReq as mp_social_callback_feed_v1_CallbackNotifyNewFeedReq,ICallbackNotifyNewFeedReq as mp_social_callback_feed_v1_ICallbackNotifyNewFeedReq ,  CallbackNotifyNewFeedResp as mp_social_callback_feed_v1_CallbackNotifyNewFeedResp,ICallbackNotifyNewFeedResp as mp_social_callback_feed_v1_ICallbackNotifyNewFeedResp ,  CallbackNotifyNewNoticeReq as mp_social_callback_feed_v1_CallbackNotifyNewNoticeReq,ICallbackNotifyNewNoticeReq as mp_social_callback_feed_v1_ICallbackNotifyNewNoticeReq ,  CallbackNotifyNewNoticeResp as mp_social_callback_feed_v1_CallbackNotifyNewNoticeResp,ICallbackNotifyNewNoticeResp as mp_social_callback_feed_v1_ICallbackNotifyNewNoticeResp ,  } from "idl/mp/social/callback/feed.v1"
export enum Code {  
    CodeOK = 0,  
    CodePostNotFound = 4001,  
    CodeCommentNotFound = 4002,  
    CodeAlreadyLiked = 4003,  
    CodeNotLiked = 4004,  
    CodePermissionForbid = 4005,  
    CodeAuditReject = 5001,  
    CodeUserBeMuted = 5002,
}
export enum ResourceType {  
    ResourceTypeUnknown = 0,  
    ResourceTypePicture = 1,  
    ResourceTypeVideo = 2,  
    ResourceTypeWeb = 3,  
    ResourceTypeAd = 4,  
    ResourceTypeArticle = 5,
}
export enum PermissionType {  
    PermissionTypeDefault = 0,  
    PermissionTypeSelfOnly = 1,  
    PermissionTypeAllowUsers = 2,  
    PermissionTypeForbidUsers = 3,
}
export enum NoticeType {  
    NoticeTypeUnknown = 0,  
    NoticeTypeComment = 1,  
    NoticeTypeLike = 2,  
    NoticeTypeAt = 3,
}
export enum ContentStatus {  
    ContentStatusUnknown = 0,  
    ContentStatusNormal = 1,  
    ContentStatusDeleted = 2,
}
export interface ISimplePost {
    postID?: number|null
    userID?: number|null
}
@protobuf.Type.d("mpff_social_feed_v1_SimplePost")
export class SimplePost extends protobuf.Message<ISimplePost> {
    constructor(properties: Properties<ISimplePost>) {
        super(properties);
        if (properties) {
            if (properties.postID) { this.postID = properties.postID }
            if (properties.userID) { this.userID = properties.userID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public postID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public userID?: number|null = 0
}
export interface ISimpleComment {
    commentID?: number|null
    userID?: number|null
}
@protobuf.Type.d("mpff_social_feed_v1_SimpleComment")
export class SimpleComment extends protobuf.Message<ISimpleComment> {
    constructor(properties: Properties<ISimpleComment>) {
        super(properties);
        if (properties) {
            if (properties.commentID) { this.commentID = properties.commentID }
            if (properties.userID) { this.userID = properties.userID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public commentID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public userID?: number|null = 0
}
export interface ISimplePostInteractiveInfo {
    likeUserIDs?: number[]
    commentCount?: number|null
    comments?: ISimpleComment[]
}
@protobuf.Type.d("mpff_social_feed_v1_SimplePostInteractiveInfo")
export class SimplePostInteractiveInfo extends protobuf.Message<ISimplePostInteractiveInfo> {
    constructor(properties: Properties<ISimplePostInteractiveInfo>) {
        super(properties);
        if (properties) {
            if (properties.likeUserIDs) { this.likeUserIDs = []; properties.likeUserIDs.forEach((value, index)=>{this.likeUserIDs[index] = properties.likeUserIDs[index]})}
            if (properties.commentCount) { this.commentCount = properties.commentCount }
            if (properties.comments) { this.comments = []; properties.comments.forEach((value, index)=>{this.comments[index] = SimpleComment.create(properties.comments[index]) as any})}
        }
	}
    @protobuf.Field.d(2, "int64", "repeated", [])
    public likeUserIDs?: number[] = []
    @protobuf.Field.d(3, "int64", "optional", 0)
    public commentCount?: number|null = 0
    @protobuf.Field.d(4, "mpff_social_feed_v1_SimpleComment", "repeated")
    public comments?: SimpleComment[] = []
}
export interface IPermission {
    permissionType?: PermissionType|null
    effectUserIDs?: number[]
}
@protobuf.Type.d("mpff_social_feed_v1_Permission")
export class Permission extends protobuf.Message<IPermission> {
    constructor(properties: Properties<IPermission>) {
        super(properties);
        if (properties) {
            if (properties.permissionType) { this.permissionType = properties.permissionType }
            if (properties.effectUserIDs) { this.effectUserIDs = []; properties.effectUserIDs.forEach((value, index)=>{this.effectUserIDs[index] = properties.effectUserIDs[index]})}
        }
	}
    @protobuf.Field.d(4, PermissionType, "optional", PermissionType.PermissionTypeDefault)
    public permissionType?: PermissionType|null = PermissionType.PermissionTypeDefault
    @protobuf.Field.d(5, "int64", "repeated", [])
    public effectUserIDs?: number[] = []
}
export interface ILocation {
    longitude?: number|null
    latitude?: number|null
    address?: string|null
}
@protobuf.Type.d("mpff_social_feed_v1_Location")
export class Location extends protobuf.Message<ILocation> {
    constructor(properties: Properties<ILocation>) {
        super(properties);
        if (properties) {
            if (properties.longitude) { this.longitude = properties.longitude }
            if (properties.latitude) { this.latitude = properties.latitude }
            if (properties.address) { this.address = properties.address }
        }
	}
    @protobuf.Field.d(1, "float", "optional", 0)
    public longitude?: number|null = 0
    @protobuf.Field.d(2, "float", "optional", 0)
    public latitude?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public address?: string|null = ""
}
export interface IResource {
    url?: string|null
    resourceType?: ResourceType|null
    extra?: Uint8Array
}
@protobuf.Type.d("mpff_social_feed_v1_Resource")
export class Resource extends protobuf.Message<IResource> {
    constructor(properties: Properties<IResource>) {
        super(properties);
        if (properties) {
            if (properties.url) { this.url = properties.url }
            if (properties.resourceType) { this.resourceType = properties.resourceType }
            if (properties.extra) { this.extra = properties.extra }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public url?: string|null = ""
    @protobuf.Field.d(2, ResourceType, "optional", ResourceType.ResourceTypeUnknown)
    public resourceType?: ResourceType|null = ResourceType.ResourceTypeUnknown
    @protobuf.Field.d(15, "bytes", "optional", [])
    public extra?: Uint8Array
}
export interface ISimpleFeed {
    post?: ISimplePost
    interactive?: ISimplePostInteractiveInfo
    permission?: IPermission
}
@protobuf.Type.d("mpff_social_feed_v1_SimpleFeed")
export class SimpleFeed extends protobuf.Message<ISimpleFeed> {
    constructor(properties: Properties<ISimpleFeed>) {
        super(properties);
        if (properties) {
            if (properties.post) { this.post = SimplePost.create(properties.post) as any }
            if (properties.interactive) { this.interactive = SimplePostInteractiveInfo.create(properties.interactive) as any }
            if (properties.permission) { this.permission = Permission.create(properties.permission) as any }
        }
	}
    @protobuf.Field.d(1, "mpff_social_feed_v1_SimplePost", "optional")
    public post?: SimplePost|null
    @protobuf.Field.d(2, "mpff_social_feed_v1_SimplePostInteractiveInfo", "optional")
    public interactive?: SimplePostInteractiveInfo|null
    @protobuf.Field.d(3, "mpff_social_feed_v1_Permission", "optional")
    public permission?: Permission|null
}
export interface IPost {
    postID?: number|null
    userID?: number|null
    content?: string|null
    resources?: IResource[]
    atUserIDs?: number[]
    location?: ILocation
    extra?: string|null
    createdAt?: number|null
    deletedAt?: number|null
}
@protobuf.Type.d("mpff_social_feed_v1_Post")
export class Post extends protobuf.Message<IPost> {
    constructor(properties: Properties<IPost>) {
        super(properties);
        if (properties) {
            if (properties.postID) { this.postID = properties.postID }
            if (properties.userID) { this.userID = properties.userID }
            if (properties.content) { this.content = properties.content }
            if (properties.resources) { this.resources = []; properties.resources.forEach((value, index)=>{this.resources[index] = Resource.create(properties.resources[index]) as any})}
            if (properties.atUserIDs) { this.atUserIDs = []; properties.atUserIDs.forEach((value, index)=>{this.atUserIDs[index] = properties.atUserIDs[index]})}
            if (properties.location) { this.location = Location.create(properties.location) as any }
            if (properties.extra) { this.extra = properties.extra }
            if (properties.createdAt) { this.createdAt = properties.createdAt }
            if (properties.deletedAt) { this.deletedAt = properties.deletedAt }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public postID?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public userID?: number|null = 0
    @protobuf.Field.d(4, "string", "optional", )
    public content?: string|null = ""
    @protobuf.Field.d(5, "mpff_social_feed_v1_Resource", "repeated")
    public resources?: Resource[] = []
    @protobuf.Field.d(6, "int64", "repeated", [])
    public atUserIDs?: number[] = []
    @protobuf.Field.d(12, "mpff_social_feed_v1_Location", "optional")
    public location?: Location|null
    @protobuf.Field.d(13, "string", "optional", )
    public extra?: string|null = ""
    @protobuf.Field.d(15, "int64", "optional", 0)
    public createdAt?: number|null = 0
    @protobuf.Field.d(16, "int64", "optional", 0)
    public deletedAt?: number|null = 0
}
export interface IPermissionParams {
    permissionType?: PermissionType|null
    effectUserIDs?: number[]
}
@protobuf.Type.d("mpff_social_feed_v1_PermissionParams")
export class PermissionParams extends protobuf.Message<IPermissionParams> {
    constructor(properties: Properties<IPermissionParams>) {
        super(properties);
        if (properties) {
            if (properties.permissionType) { this.permissionType = properties.permissionType }
            if (properties.effectUserIDs) { this.effectUserIDs = []; properties.effectUserIDs.forEach((value, index)=>{this.effectUserIDs[index] = properties.effectUserIDs[index]})}
        }
	}
    @protobuf.Field.d(1, PermissionType, "optional", PermissionType.PermissionTypeDefault)
    public permissionType?: PermissionType|null = PermissionType.PermissionTypeDefault
    @protobuf.Field.d(2, "int64", "repeated", [])
    public effectUserIDs?: number[] = []
}
export interface ITimeLimitationParams {
    deletedAt?: number|null
}
@protobuf.Type.d("mpff_social_feed_v1_TimeLimitationParams")
export class TimeLimitationParams extends protobuf.Message<ITimeLimitationParams> {
    constructor(properties: Properties<ITimeLimitationParams>) {
        super(properties);
        if (properties) {
            if (properties.deletedAt) { this.deletedAt = properties.deletedAt }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public deletedAt?: number|null = 0
}
export interface ISubmitPostReq {
    content?: string|null
    resources?: IResource[]
    atUserIDs?: number[]
    permission?: IPermissionParams
    timeLimitation?: ITimeLimitationParams
    location?: ILocation
    extra?: string|null
}
@protobuf.Type.d("mpff_social_feed_v1_SubmitPostReq")
export class SubmitPostReq extends protobuf.Message<ISubmitPostReq> {
    constructor(properties: Properties<ISubmitPostReq>) {
        super(properties);
        if (properties) {
            if (properties.content) { this.content = properties.content }
            if (properties.resources) { this.resources = []; properties.resources.forEach((value, index)=>{this.resources[index] = Resource.create(properties.resources[index]) as any})}
            if (properties.atUserIDs) { this.atUserIDs = []; properties.atUserIDs.forEach((value, index)=>{this.atUserIDs[index] = properties.atUserIDs[index]})}
            if (properties.permission) { this.permission = PermissionParams.create(properties.permission) as any }
            if (properties.timeLimitation) { this.timeLimitation = TimeLimitationParams.create(properties.timeLimitation) as any }
            if (properties.location) { this.location = Location.create(properties.location) as any }
            if (properties.extra) { this.extra = properties.extra }
        }
	}
    @protobuf.Field.d(4, "string", "optional", )
    public content?: string|null = ""
    @protobuf.Field.d(5, "mpff_social_feed_v1_Resource", "repeated")
    public resources?: Resource[] = []
    @protobuf.Field.d(6, "int64", "repeated", [])
    public atUserIDs?: number[] = []
    @protobuf.Field.d(7, "mpff_social_feed_v1_PermissionParams", "optional")
    public permission?: PermissionParams|null
    @protobuf.Field.d(8, "mpff_social_feed_v1_TimeLimitationParams", "optional")
    public timeLimitation?: TimeLimitationParams|null
    @protobuf.Field.d(12, "mpff_social_feed_v1_Location", "optional")
    public location?: Location|null
    @protobuf.Field.d(13, "string", "optional", )
    public extra?: string|null = ""
}
export interface ISubmitPostResp {
    postID?: number|null
}
@protobuf.Type.d("mpff_social_feed_v1_SubmitPostResp")
export class SubmitPostResp extends protobuf.Message<ISubmitPostResp> {
    constructor(properties: Properties<ISubmitPostResp>) {
        super(properties);
        if (properties) {
            if (properties.postID) { this.postID = properties.postID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public postID?: number|null = 0
}
export interface ILikePostReq {
    postID?: number|null
}
@protobuf.Type.d("mpff_social_feed_v1_LikePostReq")
export class LikePostReq extends protobuf.Message<ILikePostReq> {
    constructor(properties: Properties<ILikePostReq>) {
        super(properties);
        if (properties) {
            if (properties.postID) { this.postID = properties.postID }
        }
	}
    @protobuf.Field.d(4, "int64", "optional", 0)
    public postID?: number|null = 0
}
export interface ILikePostResp {
}
@protobuf.Type.d("mpff_social_feed_v1_LikePostResp")
export class LikePostResp extends protobuf.Message<ILikePostResp> {
    constructor(properties: Properties<ILikePostResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface ICancelLikePostReq {
    postID?: number|null
}
@protobuf.Type.d("mpff_social_feed_v1_CancelLikePostReq")
export class CancelLikePostReq extends protobuf.Message<ICancelLikePostReq> {
    constructor(properties: Properties<ICancelLikePostReq>) {
        super(properties);
        if (properties) {
            if (properties.postID) { this.postID = properties.postID }
        }
	}
    @protobuf.Field.d(4, "int64", "optional", 0)
    public postID?: number|null = 0
}
export interface ICancelLikePostResp {
}
@protobuf.Type.d("mpff_social_feed_v1_CancelLikePostResp")
export class CancelLikePostResp extends protobuf.Message<ICancelLikePostResp> {
    constructor(properties: Properties<ICancelLikePostResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IBatchGetPostsReq {
    postIDs?: number[]
}
@protobuf.Type.d("mpff_social_feed_v1_BatchGetPostsReq")
export class BatchGetPostsReq extends protobuf.Message<IBatchGetPostsReq> {
    constructor(properties: Properties<IBatchGetPostsReq>) {
        super(properties);
        if (properties) {
            if (properties.postIDs) { this.postIDs = []; properties.postIDs.forEach((value, index)=>{this.postIDs[index] = properties.postIDs[index]})}
        }
	}
    @protobuf.Field.d(2, "int64", "repeated", [])
    public postIDs?: number[] = []
}
export interface IBatchGetPostsResp {
    posts?: IPost[]
}
@protobuf.Type.d("mpff_social_feed_v1_BatchGetPostsResp")
export class BatchGetPostsResp extends protobuf.Message<IBatchGetPostsResp> {
    constructor(properties: Properties<IBatchGetPostsResp>) {
        super(properties);
        if (properties) {
            if (properties.posts) { this.posts = []; properties.posts.forEach((value, index)=>{this.posts[index] = Post.create(properties.posts[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "mpff_social_feed_v1_Post", "repeated")
    public posts?: Post[] = []
}
export interface IDeletePostReq {
    postID?: number|null
}
@protobuf.Type.d("mpff_social_feed_v1_DeletePostReq")
export class DeletePostReq extends protobuf.Message<IDeletePostReq> {
    constructor(properties: Properties<IDeletePostReq>) {
        super(properties);
        if (properties) {
            if (properties.postID) { this.postID = properties.postID }
        }
	}
    @protobuf.Field.d(4, "int64", "optional", 0)
    public postID?: number|null = 0
}
export interface IDeletePostResp {
}
@protobuf.Type.d("mpff_social_feed_v1_DeletePostResp")
export class DeletePostResp extends protobuf.Message<IDeletePostResp> {
    constructor(properties: Properties<IDeletePostResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IComment {
    commentID?: number|null
    userID?: number|null
    postID?: number|null
    toCommentID?: number|null
    atUserIDs?: number[]
    content?: string|null
    extra?: string|null
    createdAt?: number|null
}
@protobuf.Type.d("mpff_social_feed_v1_Comment")
export class Comment extends protobuf.Message<IComment> {
    constructor(properties: Properties<IComment>) {
        super(properties);
        if (properties) {
            if (properties.commentID) { this.commentID = properties.commentID }
            if (properties.userID) { this.userID = properties.userID }
            if (properties.postID) { this.postID = properties.postID }
            if (properties.toCommentID) { this.toCommentID = properties.toCommentID }
            if (properties.atUserIDs) { this.atUserIDs = []; properties.atUserIDs.forEach((value, index)=>{this.atUserIDs[index] = properties.atUserIDs[index]})}
            if (properties.content) { this.content = properties.content }
            if (properties.extra) { this.extra = properties.extra }
            if (properties.createdAt) { this.createdAt = properties.createdAt }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public commentID?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public userID?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public postID?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public toCommentID?: number|null = 0
    @protobuf.Field.d(6, "int64", "repeated", [])
    public atUserIDs?: number[] = []
    @protobuf.Field.d(7, "string", "optional", )
    public content?: string|null = ""
    @protobuf.Field.d(13, "string", "optional", )
    public extra?: string|null = ""
    @protobuf.Field.d(15, "int64", "optional", 0)
    public createdAt?: number|null = 0
}
export interface ISubmitCommentReq {
    postID?: number|null
    toCommentID?: number|null
    atUserIDs?: number[]
    content?: string|null
    extra?: string|null
}
@protobuf.Type.d("mpff_social_feed_v1_SubmitCommentReq")
export class SubmitCommentReq extends protobuf.Message<ISubmitCommentReq> {
    constructor(properties: Properties<ISubmitCommentReq>) {
        super(properties);
        if (properties) {
            if (properties.postID) { this.postID = properties.postID }
            if (properties.toCommentID) { this.toCommentID = properties.toCommentID }
            if (properties.atUserIDs) { this.atUserIDs = []; properties.atUserIDs.forEach((value, index)=>{this.atUserIDs[index] = properties.atUserIDs[index]})}
            if (properties.content) { this.content = properties.content }
            if (properties.extra) { this.extra = properties.extra }
        }
	}
    @protobuf.Field.d(4, "int64", "optional", 0)
    public postID?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public toCommentID?: number|null = 0
    @protobuf.Field.d(6, "int64", "repeated", [])
    public atUserIDs?: number[] = []
    @protobuf.Field.d(7, "string", "optional", )
    public content?: string|null = ""
    @protobuf.Field.d(13, "string", "optional", )
    public extra?: string|null = ""
}
export interface ISubmitCommentResp {
    commentID?: number|null
}
@protobuf.Type.d("mpff_social_feed_v1_SubmitCommentResp")
export class SubmitCommentResp extends protobuf.Message<ISubmitCommentResp> {
    constructor(properties: Properties<ISubmitCommentResp>) {
        super(properties);
        if (properties) {
            if (properties.commentID) { this.commentID = properties.commentID }
        }
	}
    @protobuf.Field.d(2, "int64", "optional", 0)
    public commentID?: number|null = 0
}
export interface IDeleteCommentReq {
    commentID?: number|null
}
@protobuf.Type.d("mpff_social_feed_v1_DeleteCommentReq")
export class DeleteCommentReq extends protobuf.Message<IDeleteCommentReq> {
    constructor(properties: Properties<IDeleteCommentReq>) {
        super(properties);
        if (properties) {
            if (properties.commentID) { this.commentID = properties.commentID }
        }
	}
    @protobuf.Field.d(4, "int64", "optional", 0)
    public commentID?: number|null = 0
}
export interface IDeleteCommentResp {
}
@protobuf.Type.d("mpff_social_feed_v1_DeleteCommentResp")
export class DeleteCommentResp extends protobuf.Message<IDeleteCommentResp> {
    constructor(properties: Properties<IDeleteCommentResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IBatchGetCommentsReq {
    commentIDs?: number[]
}
@protobuf.Type.d("mpff_social_feed_v1_BatchGetCommentsReq")
export class BatchGetCommentsReq extends protobuf.Message<IBatchGetCommentsReq> {
    constructor(properties: Properties<IBatchGetCommentsReq>) {
        super(properties);
        if (properties) {
            if (properties.commentIDs) { this.commentIDs = []; properties.commentIDs.forEach((value, index)=>{this.commentIDs[index] = properties.commentIDs[index]})}
        }
	}
    @protobuf.Field.d(2, "int64", "repeated", [])
    public commentIDs?: number[] = []
}
export interface IBatchGetCommentsResp {
    comments?: IComment[]
}
@protobuf.Type.d("mpff_social_feed_v1_BatchGetCommentsResp")
export class BatchGetCommentsResp extends protobuf.Message<IBatchGetCommentsResp> {
    constructor(properties: Properties<IBatchGetCommentsResp>) {
        super(properties);
        if (properties) {
            if (properties.comments) { this.comments = []; properties.comments.forEach((value, index)=>{this.comments[index] = Comment.create(properties.comments[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "mpff_social_feed_v1_Comment", "repeated")
    public comments?: Comment[] = []
}
export interface IListPostCommentsReq {
    postID?: number|null
    baseCommentID?: number|null
    count?: number|null
}
@protobuf.Type.d("mpff_social_feed_v1_ListPostCommentsReq")
export class ListPostCommentsReq extends protobuf.Message<IListPostCommentsReq> {
    constructor(properties: Properties<IListPostCommentsReq>) {
        super(properties);
        if (properties) {
            if (properties.postID) { this.postID = properties.postID }
            if (properties.baseCommentID) { this.baseCommentID = properties.baseCommentID }
            if (properties.count) { this.count = properties.count }
        }
	}
    @protobuf.Field.d(3, "int64", "optional", 0)
    public postID?: number|null = 0
    @protobuf.Field.d(6, "int64", "optional", 0)
    public baseCommentID?: number|null = 0
    @protobuf.Field.d(7, "int32", "optional", 0)
    public count?: number|null = 0
}
export interface IListPostCommentsResp {
    comments?: IComment[]
}
@protobuf.Type.d("mpff_social_feed_v1_ListPostCommentsResp")
export class ListPostCommentsResp extends protobuf.Message<IListPostCommentsResp> {
    constructor(properties: Properties<IListPostCommentsResp>) {
        super(properties);
        if (properties) {
            if (properties.comments) { this.comments = []; properties.comments.forEach((value, index)=>{this.comments[index] = Comment.create(properties.comments[index]) as any})}
        }
	}
    @protobuf.Field.d(3, "mpff_social_feed_v1_Comment", "repeated")
    public comments?: Comment[] = []
}
export interface IListPostSimpleCommentsReq {
    postID?: number|null
    baseCommentID?: number|null
    count?: number|null
}
@protobuf.Type.d("mpff_social_feed_v1_ListPostSimpleCommentsReq")
export class ListPostSimpleCommentsReq extends protobuf.Message<IListPostSimpleCommentsReq> {
    constructor(properties: Properties<IListPostSimpleCommentsReq>) {
        super(properties);
        if (properties) {
            if (properties.postID) { this.postID = properties.postID }
            if (properties.baseCommentID) { this.baseCommentID = properties.baseCommentID }
            if (properties.count) { this.count = properties.count }
        }
	}
    @protobuf.Field.d(3, "int64", "optional", 0)
    public postID?: number|null = 0
    @protobuf.Field.d(6, "int64", "optional", 0)
    public baseCommentID?: number|null = 0
    @protobuf.Field.d(7, "int32", "optional", 0)
    public count?: number|null = 0
}
export interface IListPostSimpleCommentsResp {
    comments?: ISimpleComment[]
}
@protobuf.Type.d("mpff_social_feed_v1_ListPostSimpleCommentsResp")
export class ListPostSimpleCommentsResp extends protobuf.Message<IListPostSimpleCommentsResp> {
    constructor(properties: Properties<IListPostSimpleCommentsResp>) {
        super(properties);
        if (properties) {
            if (properties.comments) { this.comments = []; properties.comments.forEach((value, index)=>{this.comments[index] = SimpleComment.create(properties.comments[index]) as any})}
        }
	}
    @protobuf.Field.d(2, "mpff_social_feed_v1_SimpleComment", "repeated")
    public comments?: SimpleComment[] = []
}
export interface IPostInteractiveInfo {
    postID?: number|null
    likeUserIDs?: number[]
    commentCount?: number|null
    comments?: IComment[]
}
@protobuf.Type.d("mpff_social_feed_v1_PostInteractiveInfo")
export class PostInteractiveInfo extends protobuf.Message<IPostInteractiveInfo> {
    constructor(properties: Properties<IPostInteractiveInfo>) {
        super(properties);
        if (properties) {
            if (properties.postID) { this.postID = properties.postID }
            if (properties.likeUserIDs) { this.likeUserIDs = []; properties.likeUserIDs.forEach((value, index)=>{this.likeUserIDs[index] = properties.likeUserIDs[index]})}
            if (properties.commentCount) { this.commentCount = properties.commentCount }
            if (properties.comments) { this.comments = []; properties.comments.forEach((value, index)=>{this.comments[index] = Comment.create(properties.comments[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public postID?: number|null = 0
    @protobuf.Field.d(3, "int64", "repeated", [])
    public likeUserIDs?: number[] = []
    @protobuf.Field.d(4, "int64", "optional", 0)
    public commentCount?: number|null = 0
    @protobuf.Field.d(5, "mpff_social_feed_v1_Comment", "repeated")
    public comments?: Comment[] = []
}
export interface IFeed {
    post?: IPost
    interactive?: IPostInteractiveInfo
    permission?: IPermission
}
@protobuf.Type.d("mpff_social_feed_v1_Feed")
export class Feed extends protobuf.Message<IFeed> {
    constructor(properties: Properties<IFeed>) {
        super(properties);
        if (properties) {
            if (properties.post) { this.post = Post.create(properties.post) as any }
            if (properties.interactive) { this.interactive = PostInteractiveInfo.create(properties.interactive) as any }
            if (properties.permission) { this.permission = Permission.create(properties.permission) as any }
        }
	}
    @protobuf.Field.d(1, "mpff_social_feed_v1_Post", "optional")
    public post?: Post|null
    @protobuf.Field.d(2, "mpff_social_feed_v1_PostInteractiveInfo", "optional")
    public interactive?: PostInteractiveInfo|null
    @protobuf.Field.d(3, "mpff_social_feed_v1_Permission", "optional")
    public permission?: Permission|null
}
export interface IGetFeedReq {
    postID?: number|null
}
@protobuf.Type.d("mpff_social_feed_v1_GetFeedReq")
export class GetFeedReq extends protobuf.Message<IGetFeedReq> {
    constructor(properties: Properties<IGetFeedReq>) {
        super(properties);
        if (properties) {
            if (properties.postID) { this.postID = properties.postID }
        }
	}
    @protobuf.Field.d(3, "int64", "optional", 0)
    public postID?: number|null = 0
}
export interface IGetFeedResp {
    feed?: IFeed
}
@protobuf.Type.d("mpff_social_feed_v1_GetFeedResp")
export class GetFeedResp extends protobuf.Message<IGetFeedResp> {
    constructor(properties: Properties<IGetFeedResp>) {
        super(properties);
        if (properties) {
            if (properties.feed) { this.feed = Feed.create(properties.feed) as any }
        }
	}
    @protobuf.Field.d(2, "mpff_social_feed_v1_Feed", "optional")
    public feed?: Feed|null
}
export interface IGetLatestPostHintReq {
}
@protobuf.Type.d("mpff_social_feed_v1_GetLatestPostHintReq")
export class GetLatestPostHintReq extends protobuf.Message<IGetLatestPostHintReq> {
    constructor(properties: Properties<IGetLatestPostHintReq>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IGetLatestPostHintResp {
    userID?: number|null
    postID?: number|null
}
@protobuf.Type.d("mpff_social_feed_v1_GetLatestPostHintResp")
export class GetLatestPostHintResp extends protobuf.Message<IGetLatestPostHintResp> {
    constructor(properties: Properties<IGetLatestPostHintResp>) {
        super(properties);
        if (properties) {
            if (properties.userID) { this.userID = properties.userID }
            if (properties.postID) { this.postID = properties.postID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public userID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public postID?: number|null = 0
}
export interface IListSimpleFollowTimelineReq {
    basePostID?: number|null
    count?: number|null
    clientLatestPostID?: number|null
    postCommentCount?: number|null
}
@protobuf.Type.d("mpff_social_feed_v1_ListSimpleFollowTimelineReq")
export class ListSimpleFollowTimelineReq extends protobuf.Message<IListSimpleFollowTimelineReq> {
    constructor(properties: Properties<IListSimpleFollowTimelineReq>) {
        super(properties);
        if (properties) {
            if (properties.basePostID) { this.basePostID = properties.basePostID }
            if (properties.count) { this.count = properties.count }
            if (properties.clientLatestPostID) { this.clientLatestPostID = properties.clientLatestPostID }
            if (properties.postCommentCount) { this.postCommentCount = properties.postCommentCount }
        }
	}
    @protobuf.Field.d(4, "int64", "optional", 0)
    public basePostID?: number|null = 0
    @protobuf.Field.d(5, "int32", "optional", 0)
    public count?: number|null = 0
    @protobuf.Field.d(6, "int64", "optional", 0)
    public clientLatestPostID?: number|null = 0
    @protobuf.Field.d(7, "int32", "optional", 0)
    public postCommentCount?: number|null = 0
}
export interface IListSimpleFollowTimelineResp {
    feeds?: ISimpleFeed[]
}
@protobuf.Type.d("mpff_social_feed_v1_ListSimpleFollowTimelineResp")
export class ListSimpleFollowTimelineResp extends protobuf.Message<IListSimpleFollowTimelineResp> {
    constructor(properties: Properties<IListSimpleFollowTimelineResp>) {
        super(properties);
        if (properties) {
            if (properties.feeds) { this.feeds = []; properties.feeds.forEach((value, index)=>{this.feeds[index] = SimpleFeed.create(properties.feeds[index]) as any})}
        }
	}
    @protobuf.Field.d(2, "mpff_social_feed_v1_SimpleFeed", "repeated")
    public feeds?: SimpleFeed[] = []
}
export interface IListSimplePersonalTimelineReq {
    userID?: number|null
    basePostID?: number|null
    count?: number|null
    postCommentCount?: number|null
}
@protobuf.Type.d("mpff_social_feed_v1_ListSimplePersonalTimelineReq")
export class ListSimplePersonalTimelineReq extends protobuf.Message<IListSimplePersonalTimelineReq> {
    constructor(properties: Properties<IListSimplePersonalTimelineReq>) {
        super(properties);
        if (properties) {
            if (properties.userID) { this.userID = properties.userID }
            if (properties.basePostID) { this.basePostID = properties.basePostID }
            if (properties.count) { this.count = properties.count }
            if (properties.postCommentCount) { this.postCommentCount = properties.postCommentCount }
        }
	}
    @protobuf.Field.d(2, "int64", "optional", 0)
    public userID?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public basePostID?: number|null = 0
    @protobuf.Field.d(5, "int32", "optional", 0)
    public count?: number|null = 0
    @protobuf.Field.d(7, "int32", "optional", 0)
    public postCommentCount?: number|null = 0
}
export interface IListSimplePersonalTimelineResp {
    feeds?: ISimpleFeed[]
}
@protobuf.Type.d("mpff_social_feed_v1_ListSimplePersonalTimelineResp")
export class ListSimplePersonalTimelineResp extends protobuf.Message<IListSimplePersonalTimelineResp> {
    constructor(properties: Properties<IListSimplePersonalTimelineResp>) {
        super(properties);
        if (properties) {
            if (properties.feeds) { this.feeds = []; properties.feeds.forEach((value, index)=>{this.feeds[index] = SimpleFeed.create(properties.feeds[index]) as any})}
        }
	}
    @protobuf.Field.d(2, "mpff_social_feed_v1_SimpleFeed", "repeated")
    public feeds?: SimpleFeed[] = []
}
export interface INotice {
    noticeID?: number|null
    userID?: number|null
    noticeType?: NoticeType|null
    postID?: number|null
    commentID?: number|null
    fromUserID?: number|null
    createdAt?: number|null
}
@protobuf.Type.d("mpff_social_feed_v1_Notice")
export class Notice extends protobuf.Message<INotice> {
    constructor(properties: Properties<INotice>) {
        super(properties);
        if (properties) {
            if (properties.noticeID) { this.noticeID = properties.noticeID }
            if (properties.userID) { this.userID = properties.userID }
            if (properties.noticeType) { this.noticeType = properties.noticeType }
            if (properties.postID) { this.postID = properties.postID }
            if (properties.commentID) { this.commentID = properties.commentID }
            if (properties.fromUserID) { this.fromUserID = properties.fromUserID }
            if (properties.createdAt) { this.createdAt = properties.createdAt }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public noticeID?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public userID?: number|null = 0
    @protobuf.Field.d(4, NoticeType, "optional", NoticeType.NoticeTypeUnknown)
    public noticeType?: NoticeType|null = NoticeType.NoticeTypeUnknown
    @protobuf.Field.d(5, "int64", "optional", 0)
    public postID?: number|null = 0
    @protobuf.Field.d(6, "int64", "optional", 0)
    public commentID?: number|null = 0
    @protobuf.Field.d(7, "int64", "optional", 0)
    public fromUserID?: number|null = 0
    @protobuf.Field.d(8, "int64", "optional", 0)
    public createdAt?: number|null = 0
}
export interface IListNoticesReq {
    baseNoticeID?: number|null
    count?: number|null
    clientLatestNoticeID?: number|null
}
@protobuf.Type.d("mpff_social_feed_v1_ListNoticesReq")
export class ListNoticesReq extends protobuf.Message<IListNoticesReq> {
    constructor(properties: Properties<IListNoticesReq>) {
        super(properties);
        if (properties) {
            if (properties.baseNoticeID) { this.baseNoticeID = properties.baseNoticeID }
            if (properties.count) { this.count = properties.count }
            if (properties.clientLatestNoticeID) { this.clientLatestNoticeID = properties.clientLatestNoticeID }
        }
	}
    @protobuf.Field.d(3, "int64", "optional", 0)
    public baseNoticeID?: number|null = 0
    @protobuf.Field.d(5, "int32", "optional", 0)
    public count?: number|null = 0
    @protobuf.Field.d(6, "int64", "optional", 0)
    public clientLatestNoticeID?: number|null = 0
}
export interface IListNoticesResp {
    notices?: INotice[]
    lastAckNoticeID?: number|null
    postMap?: { [k: string]: Post }
    commentMap?: { [k: string]: Comment }
}
@protobuf.Type.d("mpff_social_feed_v1_ListNoticesResp")
export class ListNoticesResp extends protobuf.Message<IListNoticesResp> {
    constructor(properties: Properties<IListNoticesResp>) {
        super(properties);
        if (properties) {
            if (properties.notices) { this.notices = []; properties.notices.forEach((value, index)=>{this.notices[index] = Notice.create(properties.notices[index]) as any})}
            if (properties.lastAckNoticeID) { this.lastAckNoticeID = properties.lastAckNoticeID }
            if (properties.postMap) { this.postMap = properties.postMap }
            if (properties.commentMap) { this.commentMap = properties.commentMap }
        }
	}
    @protobuf.Field.d(3, "mpff_social_feed_v1_Notice", "repeated")
    public notices?: Notice[] = []
    @protobuf.Field.d(4, "int64", "optional", 0)
    public lastAckNoticeID?: number|null = 0
    @protobuf.MapField.d(5, "int64", Post)
    public postMap?: { [k: string]: Post } = {}
    @protobuf.MapField.d(6, "int64", Comment)
    public commentMap?: { [k: string]: Comment } = {}
}
export interface IListSimpleNoticesReq {
    baseNoticeID?: number|null
    count?: number|null
    clientLatestNoticeID?: number|null
}
@protobuf.Type.d("mpff_social_feed_v1_ListSimpleNoticesReq")
export class ListSimpleNoticesReq extends protobuf.Message<IListSimpleNoticesReq> {
    constructor(properties: Properties<IListSimpleNoticesReq>) {
        super(properties);
        if (properties) {
            if (properties.baseNoticeID) { this.baseNoticeID = properties.baseNoticeID }
            if (properties.count) { this.count = properties.count }
            if (properties.clientLatestNoticeID) { this.clientLatestNoticeID = properties.clientLatestNoticeID }
        }
	}
    @protobuf.Field.d(3, "int64", "optional", 0)
    public baseNoticeID?: number|null = 0
    @protobuf.Field.d(5, "int32", "optional", 0)
    public count?: number|null = 0
    @protobuf.Field.d(6, "int64", "optional", 0)
    public clientLatestNoticeID?: number|null = 0
}
export interface IListSimpleNoticesResp {
    notices?: INotice[]
    lastAckNoticeID?: number|null
    postStatusMap?: { [k: string]: ContentStatus }
    commentStatusMap?: { [k: string]: ContentStatus }
}
@protobuf.Type.d("mpff_social_feed_v1_ListSimpleNoticesResp")
export class ListSimpleNoticesResp extends protobuf.Message<IListSimpleNoticesResp> {
    constructor(properties: Properties<IListSimpleNoticesResp>) {
        super(properties);
        if (properties) {
            if (properties.notices) { this.notices = []; properties.notices.forEach((value, index)=>{this.notices[index] = Notice.create(properties.notices[index]) as any})}
            if (properties.lastAckNoticeID) { this.lastAckNoticeID = properties.lastAckNoticeID }
            if (properties.postStatusMap) { this.postStatusMap = properties.postStatusMap }
            if (properties.commentStatusMap) { this.commentStatusMap = properties.commentStatusMap }
        }
	}
    @protobuf.Field.d(3, "mpff_social_feed_v1_Notice", "repeated")
    public notices?: Notice[] = []
    @protobuf.Field.d(4, "int64", "optional", 0)
    public lastAckNoticeID?: number|null = 0
    @protobuf.MapField.d(5, "int64", ContentStatus)
    public postStatusMap?: { [k: string]: ContentStatus } = {}
    @protobuf.MapField.d(6, "int64", ContentStatus)
    public commentStatusMap?: { [k: string]: ContentStatus } = {}
}
export interface IListUnreadNoticesReq {
}
@protobuf.Type.d("mpff_social_feed_v1_ListUnreadNoticesReq")
export class ListUnreadNoticesReq extends protobuf.Message<IListUnreadNoticesReq> {
    constructor(properties: Properties<IListUnreadNoticesReq>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IListUnreadNoticesResp {
    notices?: INotice[]
}
@protobuf.Type.d("mpff_social_feed_v1_ListUnreadNoticesResp")
export class ListUnreadNoticesResp extends protobuf.Message<IListUnreadNoticesResp> {
    constructor(properties: Properties<IListUnreadNoticesResp>) {
        super(properties);
        if (properties) {
            if (properties.notices) { this.notices = []; properties.notices.forEach((value, index)=>{this.notices[index] = Notice.create(properties.notices[index]) as any})}
        }
	}
    @protobuf.Field.d(3, "mpff_social_feed_v1_Notice", "repeated")
    public notices?: Notice[] = []
}
export interface IClearAllNoticesOfUserReq {
}
@protobuf.Type.d("mpff_social_feed_v1_ClearAllNoticesOfUserReq")
export class ClearAllNoticesOfUserReq extends protobuf.Message<IClearAllNoticesOfUserReq> {
    constructor(properties: Properties<IClearAllNoticesOfUserReq>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IClearAllNoticesOfUserResp {
}
@protobuf.Type.d("mpff_social_feed_v1_ClearAllNoticesOfUserResp")
export class ClearAllNoticesOfUserResp extends protobuf.Message<IClearAllNoticesOfUserResp> {
    constructor(properties: Properties<IClearAllNoticesOfUserResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IUserFeedConfig {
    userID?: number|null
    forbidVisitUserIDs?: number[]
    rejectFeedUserIDs?: number[]
}
@protobuf.Type.d("mpff_social_feed_v1_UserFeedConfig")
export class UserFeedConfig extends protobuf.Message<IUserFeedConfig> {
    constructor(properties: Properties<IUserFeedConfig>) {
        super(properties);
        if (properties) {
            if (properties.userID) { this.userID = properties.userID }
            if (properties.forbidVisitUserIDs) { this.forbidVisitUserIDs = []; properties.forbidVisitUserIDs.forEach((value, index)=>{this.forbidVisitUserIDs[index] = properties.forbidVisitUserIDs[index]})}
            if (properties.rejectFeedUserIDs) { this.rejectFeedUserIDs = []; properties.rejectFeedUserIDs.forEach((value, index)=>{this.rejectFeedUserIDs[index] = properties.rejectFeedUserIDs[index]})}
        }
	}
    @protobuf.Field.d(2, "int64", "optional", 0)
    public userID?: number|null = 0
    @protobuf.Field.d(5, "int64", "repeated", [])
    public forbidVisitUserIDs?: number[] = []
    @protobuf.Field.d(6, "int64", "repeated", [])
    public rejectFeedUserIDs?: number[] = []
}
export interface IGetUserFeedConfigReq {
}
@protobuf.Type.d("mpff_social_feed_v1_GetUserFeedConfigReq")
export class GetUserFeedConfigReq extends protobuf.Message<IGetUserFeedConfigReq> {
    constructor(properties: Properties<IGetUserFeedConfigReq>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IGetUserFeedConfigResp {
    userFeedConfig?: IUserFeedConfig
}
@protobuf.Type.d("mpff_social_feed_v1_GetUserFeedConfigResp")
export class GetUserFeedConfigResp extends protobuf.Message<IGetUserFeedConfigResp> {
    constructor(properties: Properties<IGetUserFeedConfigResp>) {
        super(properties);
        if (properties) {
            if (properties.userFeedConfig) { this.userFeedConfig = UserFeedConfig.create(properties.userFeedConfig) as any }
        }
	}
    @protobuf.Field.d(1, "mpff_social_feed_v1_UserFeedConfig", "optional")
    public userFeedConfig?: UserFeedConfig|null
}
export interface IBatchSetForbidVisitUsersReq {
    effectUserIDs?: number[]
    forbid?: boolean|null
}
@protobuf.Type.d("mpff_social_feed_v1_BatchSetForbidVisitUsersReq")
export class BatchSetForbidVisitUsersReq extends protobuf.Message<IBatchSetForbidVisitUsersReq> {
    constructor(properties: Properties<IBatchSetForbidVisitUsersReq>) {
        super(properties);
        if (properties) {
            if (properties.effectUserIDs) { this.effectUserIDs = []; properties.effectUserIDs.forEach((value, index)=>{this.effectUserIDs[index] = properties.effectUserIDs[index]})}
            if (properties.forbid) { this.forbid = properties.forbid }
        }
	}
    @protobuf.Field.d(3, "int64", "repeated", [])
    public effectUserIDs?: number[] = []
    @protobuf.Field.d(4, "bool", "optional", false)
    public forbid?: boolean|null = false
}
export interface IBatchSetForbidVisitUsersResp {
}
@protobuf.Type.d("mpff_social_feed_v1_BatchSetForbidVisitUsersResp")
export class BatchSetForbidVisitUsersResp extends protobuf.Message<IBatchSetForbidVisitUsersResp> {
    constructor(properties: Properties<IBatchSetForbidVisitUsersResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IBatchSetRejectFeedOfUsersReq {
    effectUserIDs?: number[]
    reject?: boolean|null
}
@protobuf.Type.d("mpff_social_feed_v1_BatchSetRejectFeedOfUsersReq")
export class BatchSetRejectFeedOfUsersReq extends protobuf.Message<IBatchSetRejectFeedOfUsersReq> {
    constructor(properties: Properties<IBatchSetRejectFeedOfUsersReq>) {
        super(properties);
        if (properties) {
            if (properties.effectUserIDs) { this.effectUserIDs = []; properties.effectUserIDs.forEach((value, index)=>{this.effectUserIDs[index] = properties.effectUserIDs[index]})}
            if (properties.reject) { this.reject = properties.reject }
        }
	}
    @protobuf.Field.d(3, "int64", "repeated", [])
    public effectUserIDs?: number[] = []
    @protobuf.Field.d(4, "bool", "optional", false)
    public reject?: boolean|null = false
}
export interface IBatchSetRejectFeedOfUsersResp {
}
@protobuf.Type.d("mpff_social_feed_v1_BatchSetRejectFeedOfUsersResp")
export class BatchSetRejectFeedOfUsersResp extends protobuf.Message<IBatchSetRejectFeedOfUsersResp> {
    constructor(properties: Properties<IBatchSetRejectFeedOfUsersResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface INewFeedInfo {
    userID?: number|null
    postID?: number|null
}
@protobuf.Type.d("mpff_social_feed_v1_NewFeedInfo")
export class NewFeedInfo extends protobuf.Message<INewFeedInfo> {
    constructor(properties: Properties<INewFeedInfo>) {
        super(properties);
        if (properties) {
            if (properties.userID) { this.userID = properties.userID }
            if (properties.postID) { this.postID = properties.postID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public userID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public postID?: number|null = 0
}
export interface INotifyNewFeedMsg {
    newFeedInfo?: INewFeedInfo
}
@protobuf.Type.d("mpff_social_feed_v1_NotifyNewFeedMsg")
export class NotifyNewFeedMsg extends protobuf.Message<INotifyNewFeedMsg> {
    constructor(properties: Properties<INotifyNewFeedMsg>) {
        super(properties);
        if (properties) {
            if (properties.newFeedInfo) { this.newFeedInfo = NewFeedInfo.create(properties.newFeedInfo) as any }
        }
	}
    @protobuf.Field.d(1, "mpff_social_feed_v1_NewFeedInfo", "optional")
    public newFeedInfo?: NewFeedInfo|null
}
export interface INewNotice {
    userID?: number|null
    noticeID?: number|null
    postID?: number|null
}
@protobuf.Type.d("mpff_social_feed_v1_NewNotice")
export class NewNotice extends protobuf.Message<INewNotice> {
    constructor(properties: Properties<INewNotice>) {
        super(properties);
        if (properties) {
            if (properties.userID) { this.userID = properties.userID }
            if (properties.noticeID) { this.noticeID = properties.noticeID }
            if (properties.postID) { this.postID = properties.postID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public userID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public noticeID?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public postID?: number|null = 0
}
export interface INotifyNewNoticeMsg {
    NewNotice?: INewNotice
}
@protobuf.Type.d("mpff_social_feed_v1_NotifyNewNoticeMsg")
export class NotifyNewNoticeMsg extends protobuf.Message<INotifyNewNoticeMsg> {
    constructor(properties: Properties<INotifyNewNoticeMsg>) {
        super(properties);
        if (properties) {
            if (properties.NewNotice) { this.NewNotice = NewNotice.create(properties.NewNotice) as any }
        }
	}
    @protobuf.Field.d(1, "mpff_social_feed_v1_NewNotice", "optional")
    public NewNotice?: NewNotice|null
}
class $FeedService extends RpcService {
    async SubmitPost(req: ISubmitPostReq, params?: RpcParams) : Promise<{err:number, resp:ISubmitPostResp}> {
        let data = SubmitPostReq.create(req)
        this.onBeforeReq("SubmitPost", data, params)
        const buffer = SubmitPostReq.encode(data).finish()
        let [err, pack] = await this.call("SubmitPost", buffer, params)
        if (err) {
            this.onBeforeResp("SubmitPost", err)
            return {err: err, resp: null}
        } else {
            let resp = SubmitPostResp.decode(pack) as any
            this.onBeforeResp("SubmitPost", err, resp)
            return {err: null, resp: resp}
        }
    }
    async LikePost(req: ILikePostReq, params?: RpcParams) : Promise<{err:number, resp:ILikePostResp}> {
        let data = LikePostReq.create(req)
        this.onBeforeReq("LikePost", data, params)
        const buffer = LikePostReq.encode(data).finish()
        let [err, pack] = await this.call("LikePost", buffer, params)
        if (err) {
            this.onBeforeResp("LikePost", err)
            return {err: err, resp: null}
        } else {
            let resp = LikePostResp.decode(pack) as any
            this.onBeforeResp("LikePost", err, resp)
            return {err: null, resp: resp}
        }
    }
    async CancelLikePost(req: ICancelLikePostReq, params?: RpcParams) : Promise<{err:number, resp:ICancelLikePostResp}> {
        let data = CancelLikePostReq.create(req)
        this.onBeforeReq("CancelLikePost", data, params)
        const buffer = CancelLikePostReq.encode(data).finish()
        let [err, pack] = await this.call("CancelLikePost", buffer, params)
        if (err) {
            this.onBeforeResp("CancelLikePost", err)
            return {err: err, resp: null}
        } else {
            let resp = CancelLikePostResp.decode(pack) as any
            this.onBeforeResp("CancelLikePost", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DeletePost(req: IDeletePostReq, params?: RpcParams) : Promise<{err:number, resp:IDeletePostResp}> {
        let data = DeletePostReq.create(req)
        this.onBeforeReq("DeletePost", data, params)
        const buffer = DeletePostReq.encode(data).finish()
        let [err, pack] = await this.call("DeletePost", buffer, params)
        if (err) {
            this.onBeforeResp("DeletePost", err)
            return {err: err, resp: null}
        } else {
            let resp = DeletePostResp.decode(pack) as any
            this.onBeforeResp("DeletePost", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetPosts(req: IBatchGetPostsReq, params?: RpcParams) : Promise<{err:number, resp:IBatchGetPostsResp}> {
        let data = BatchGetPostsReq.create(req)
        this.onBeforeReq("BatchGetPosts", data, params)
        const buffer = BatchGetPostsReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetPosts", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetPosts", err)
            return {err: err, resp: null}
        } else {
            let resp = BatchGetPostsResp.decode(pack) as any
            this.onBeforeResp("BatchGetPosts", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetLatestPostHint(req: IGetLatestPostHintReq, params?: RpcParams) : Promise<{err:number, resp:IGetLatestPostHintResp}> {
        let data = GetLatestPostHintReq.create(req)
        this.onBeforeReq("GetLatestPostHint", data, params)
        const buffer = GetLatestPostHintReq.encode(data).finish()
        let [err, pack] = await this.call("GetLatestPostHint", buffer, params)
        if (err) {
            this.onBeforeResp("GetLatestPostHint", err)
            return {err: err, resp: null}
        } else {
            let resp = GetLatestPostHintResp.decode(pack) as any
            this.onBeforeResp("GetLatestPostHint", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SubmitComment(req: ISubmitCommentReq, params?: RpcParams) : Promise<{err:number, resp:ISubmitCommentResp}> {
        let data = SubmitCommentReq.create(req)
        this.onBeforeReq("SubmitComment", data, params)
        const buffer = SubmitCommentReq.encode(data).finish()
        let [err, pack] = await this.call("SubmitComment", buffer, params)
        if (err) {
            this.onBeforeResp("SubmitComment", err)
            return {err: err, resp: null}
        } else {
            let resp = SubmitCommentResp.decode(pack) as any
            this.onBeforeResp("SubmitComment", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DeleteComment(req: IDeleteCommentReq, params?: RpcParams) : Promise<{err:number, resp:IDeleteCommentResp}> {
        let data = DeleteCommentReq.create(req)
        this.onBeforeReq("DeleteComment", data, params)
        const buffer = DeleteCommentReq.encode(data).finish()
        let [err, pack] = await this.call("DeleteComment", buffer, params)
        if (err) {
            this.onBeforeResp("DeleteComment", err)
            return {err: err, resp: null}
        } else {
            let resp = DeleteCommentResp.decode(pack) as any
            this.onBeforeResp("DeleteComment", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetComments(req: IBatchGetCommentsReq, params?: RpcParams) : Promise<{err:number, resp:IBatchGetCommentsResp}> {
        let data = BatchGetCommentsReq.create(req)
        this.onBeforeReq("BatchGetComments", data, params)
        const buffer = BatchGetCommentsReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetComments", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetComments", err)
            return {err: err, resp: null}
        } else {
            let resp = BatchGetCommentsResp.decode(pack) as any
            this.onBeforeResp("BatchGetComments", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListPostComments(req: IListPostCommentsReq, params?: RpcParams) : Promise<{err:number, resp:IListPostCommentsResp}> {
        let data = ListPostCommentsReq.create(req)
        this.onBeforeReq("ListPostComments", data, params)
        const buffer = ListPostCommentsReq.encode(data).finish()
        let [err, pack] = await this.call("ListPostComments", buffer, params)
        if (err) {
            this.onBeforeResp("ListPostComments", err)
            return {err: err, resp: null}
        } else {
            let resp = ListPostCommentsResp.decode(pack) as any
            this.onBeforeResp("ListPostComments", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListPostSimpleComments(req: IListPostSimpleCommentsReq, params?: RpcParams) : Promise<{err:number, resp:IListPostSimpleCommentsResp}> {
        let data = ListPostSimpleCommentsReq.create(req)
        this.onBeforeReq("ListPostSimpleComments", data, params)
        const buffer = ListPostSimpleCommentsReq.encode(data).finish()
        let [err, pack] = await this.call("ListPostSimpleComments", buffer, params)
        if (err) {
            this.onBeforeResp("ListPostSimpleComments", err)
            return {err: err, resp: null}
        } else {
            let resp = ListPostSimpleCommentsResp.decode(pack) as any
            this.onBeforeResp("ListPostSimpleComments", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetFeed(req: IGetFeedReq, params?: RpcParams) : Promise<{err:number, resp:IGetFeedResp}> {
        let data = GetFeedReq.create(req)
        this.onBeforeReq("GetFeed", data, params)
        const buffer = GetFeedReq.encode(data).finish()
        let [err, pack] = await this.call("GetFeed", buffer, params)
        if (err) {
            this.onBeforeResp("GetFeed", err)
            return {err: err, resp: null}
        } else {
            let resp = GetFeedResp.decode(pack) as any
            this.onBeforeResp("GetFeed", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListSimpleFollowTimeline(req: IListSimpleFollowTimelineReq, params?: RpcParams) : Promise<{err:number, resp:IListSimpleFollowTimelineResp}> {
        let data = ListSimpleFollowTimelineReq.create(req)
        this.onBeforeReq("ListSimpleFollowTimeline", data, params)
        const buffer = ListSimpleFollowTimelineReq.encode(data).finish()
        let [err, pack] = await this.call("ListSimpleFollowTimeline", buffer, params)
        if (err) {
            this.onBeforeResp("ListSimpleFollowTimeline", err)
            return {err: err, resp: null}
        } else {
            let resp = ListSimpleFollowTimelineResp.decode(pack) as any
            this.onBeforeResp("ListSimpleFollowTimeline", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListSimplePersonalTimeline(req: IListSimplePersonalTimelineReq, params?: RpcParams) : Promise<{err:number, resp:IListSimplePersonalTimelineResp}> {
        let data = ListSimplePersonalTimelineReq.create(req)
        this.onBeforeReq("ListSimplePersonalTimeline", data, params)
        const buffer = ListSimplePersonalTimelineReq.encode(data).finish()
        let [err, pack] = await this.call("ListSimplePersonalTimeline", buffer, params)
        if (err) {
            this.onBeforeResp("ListSimplePersonalTimeline", err)
            return {err: err, resp: null}
        } else {
            let resp = ListSimplePersonalTimelineResp.decode(pack) as any
            this.onBeforeResp("ListSimplePersonalTimeline", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListNotices(req: IListNoticesReq, params?: RpcParams) : Promise<{err:number, resp:IListNoticesResp}> {
        let data = ListNoticesReq.create(req)
        this.onBeforeReq("ListNotices", data, params)
        const buffer = ListNoticesReq.encode(data).finish()
        let [err, pack] = await this.call("ListNotices", buffer, params)
        if (err) {
            this.onBeforeResp("ListNotices", err)
            return {err: err, resp: null}
        } else {
            let resp = ListNoticesResp.decode(pack) as any
            this.onBeforeResp("ListNotices", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListSimpleNotices(req: IListSimpleNoticesReq, params?: RpcParams) : Promise<{err:number, resp:IListSimpleNoticesResp}> {
        let data = ListSimpleNoticesReq.create(req)
        this.onBeforeReq("ListSimpleNotices", data, params)
        const buffer = ListSimpleNoticesReq.encode(data).finish()
        let [err, pack] = await this.call("ListSimpleNotices", buffer, params)
        if (err) {
            this.onBeforeResp("ListSimpleNotices", err)
            return {err: err, resp: null}
        } else {
            let resp = ListSimpleNoticesResp.decode(pack) as any
            this.onBeforeResp("ListSimpleNotices", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListUnreadNotices(req: IListUnreadNoticesReq, params?: RpcParams) : Promise<{err:number, resp:IListUnreadNoticesResp}> {
        let data = ListUnreadNoticesReq.create(req)
        this.onBeforeReq("ListUnreadNotices", data, params)
        const buffer = ListUnreadNoticesReq.encode(data).finish()
        let [err, pack] = await this.call("ListUnreadNotices", buffer, params)
        if (err) {
            this.onBeforeResp("ListUnreadNotices", err)
            return {err: err, resp: null}
        } else {
            let resp = ListUnreadNoticesResp.decode(pack) as any
            this.onBeforeResp("ListUnreadNotices", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ClearAllNoticesOfUser(req: IClearAllNoticesOfUserReq, params?: RpcParams) : Promise<{err:number, resp:IClearAllNoticesOfUserResp}> {
        let data = ClearAllNoticesOfUserReq.create(req)
        this.onBeforeReq("ClearAllNoticesOfUser", data, params)
        const buffer = ClearAllNoticesOfUserReq.encode(data).finish()
        let [err, pack] = await this.call("ClearAllNoticesOfUser", buffer, params)
        if (err) {
            this.onBeforeResp("ClearAllNoticesOfUser", err)
            return {err: err, resp: null}
        } else {
            let resp = ClearAllNoticesOfUserResp.decode(pack) as any
            this.onBeforeResp("ClearAllNoticesOfUser", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetUserFeedConfig(req: IGetUserFeedConfigReq, params?: RpcParams) : Promise<{err:number, resp:IGetUserFeedConfigResp}> {
        let data = GetUserFeedConfigReq.create(req)
        this.onBeforeReq("GetUserFeedConfig", data, params)
        const buffer = GetUserFeedConfigReq.encode(data).finish()
        let [err, pack] = await this.call("GetUserFeedConfig", buffer, params)
        if (err) {
            this.onBeforeResp("GetUserFeedConfig", err)
            return {err: err, resp: null}
        } else {
            let resp = GetUserFeedConfigResp.decode(pack) as any
            this.onBeforeResp("GetUserFeedConfig", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchSetForbidVisitUsers(req: IBatchSetForbidVisitUsersReq, params?: RpcParams) : Promise<{err:number, resp:IBatchSetForbidVisitUsersResp}> {
        let data = BatchSetForbidVisitUsersReq.create(req)
        this.onBeforeReq("BatchSetForbidVisitUsers", data, params)
        const buffer = BatchSetForbidVisitUsersReq.encode(data).finish()
        let [err, pack] = await this.call("BatchSetForbidVisitUsers", buffer, params)
        if (err) {
            this.onBeforeResp("BatchSetForbidVisitUsers", err)
            return {err: err, resp: null}
        } else {
            let resp = BatchSetForbidVisitUsersResp.decode(pack) as any
            this.onBeforeResp("BatchSetForbidVisitUsers", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchSetRejectFeedOfUsers(req: IBatchSetRejectFeedOfUsersReq, params?: RpcParams) : Promise<{err:number, resp:IBatchSetRejectFeedOfUsersResp}> {
        let data = BatchSetRejectFeedOfUsersReq.create(req)
        this.onBeforeReq("BatchSetRejectFeedOfUsers", data, params)
        const buffer = BatchSetRejectFeedOfUsersReq.encode(data).finish()
        let [err, pack] = await this.call("BatchSetRejectFeedOfUsers", buffer, params)
        if (err) {
            this.onBeforeResp("BatchSetRejectFeedOfUsers", err)
            return {err: err, resp: null}
        } else {
            let resp = BatchSetRejectFeedOfUsersResp.decode(pack) as any
            this.onBeforeResp("BatchSetRejectFeedOfUsers", err, resp)
            return {err: null, resp: resp}
        }
    }
    async MpCallbackNotifyNewFeed(req: mp_social_callback_feed_v1_ICallbackNotifyNewFeedReq, params?: RpcParams) : Promise<{err:number, resp:mp_social_callback_feed_v1_ICallbackNotifyNewFeedResp}> {
        let data = mp_social_callback_feed_v1_CallbackNotifyNewFeedReq.create(req)
        this.onBeforeReq("MpCallbackNotifyNewFeed", data, params)
        const buffer = mp_social_callback_feed_v1_CallbackNotifyNewFeedReq.encode(data).finish()
        let [err, pack] = await this.call("MpCallbackNotifyNewFeed", buffer, params)
        if (err) {
            this.onBeforeResp("MpCallbackNotifyNewFeed", err)
            return {err: err, resp: null}
        } else {
            let resp = mp_social_callback_feed_v1_CallbackNotifyNewFeedResp.decode(pack) as any
            this.onBeforeResp("MpCallbackNotifyNewFeed", err, resp)
            return {err: null, resp: resp}
        }
    }
    async MpCallbackNotifyNewNotice(req: mp_social_callback_feed_v1_ICallbackNotifyNewNoticeReq, params?: RpcParams) : Promise<{err:number, resp:mp_social_callback_feed_v1_ICallbackNotifyNewNoticeResp}> {
        let data = mp_social_callback_feed_v1_CallbackNotifyNewNoticeReq.create(req)
        this.onBeforeReq("MpCallbackNotifyNewNotice", data, params)
        const buffer = mp_social_callback_feed_v1_CallbackNotifyNewNoticeReq.encode(data).finish()
        let [err, pack] = await this.call("MpCallbackNotifyNewNotice", buffer, params)
        if (err) {
            this.onBeforeResp("MpCallbackNotifyNewNotice", err)
            return {err: err, resp: null}
        } else {
            let resp = mp_social_callback_feed_v1_CallbackNotifyNewNoticeResp.decode(pack) as any
            this.onBeforeResp("MpCallbackNotifyNewNotice", err, resp)
            return {err: null, resp: resp}
        }
    }
    async CallbackNotifyRejectDetectionTask(req: mp_audit_callback_detect_v1_ICallbackNotifyRejectDetectionTaskReq, params?: RpcParams) : Promise<{err:number, resp:mp_audit_callback_detect_v1_ICallbackNotifyRejectDetectionTaskResp}> {
        let data = mp_audit_callback_detect_v1_CallbackNotifyRejectDetectionTaskReq.create(req)
        this.onBeforeReq("CallbackNotifyRejectDetectionTask", data, params)
        const buffer = mp_audit_callback_detect_v1_CallbackNotifyRejectDetectionTaskReq.encode(data).finish()
        let [err, pack] = await this.call("CallbackNotifyRejectDetectionTask", buffer, params)
        if (err) {
            this.onBeforeResp("CallbackNotifyRejectDetectionTask", err)
            return {err: err, resp: null}
        } else {
            let resp = mp_audit_callback_detect_v1_CallbackNotifyRejectDetectionTaskResp.decode(pack) as any
            this.onBeforeResp("CallbackNotifyRejectDetectionTask", err, resp)
            return {err: null, resp: resp}
        }
    }
    NotifyNewFeed(data: Uint8Array, params: RpcParams) : {msg: INotifyNewFeedMsg, eventID?: number} {
        let msg = NotifyNewFeedMsg.decode(data)
        return {msg: msg}
    }
    NotifyNewNotice(data: Uint8Array, params: RpcParams) : {msg: INotifyNewNoticeMsg, eventID?: number} {
        let msg = NotifyNewNoticeMsg.decode(data)
        return {msg: msg}
    }
}
export const FeedService = new $FeedService({
    name: "mpff.social.feed.v1",
})
import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  MessageKey as mp_common_MessageKey,IMessageKey as mp_common_IMessageKey ,  ReplyMarkup as mp_common_ReplyMarkup,IReplyMarkup as mp_common_IReplyMarkup ,  } from "idl/mp/common/social.im"
import {  CreateGroupReq as mpff_social_im_v2_CreateGroupReq,ICreateGroupReq as mpff_social_im_v2_ICreateGroupReq ,  AddGroupUserReq as mpff_social_im_v2_AddGroupUserReq,IAddGroupUserReq as mpff_social_im_v2_IAddGroupUserReq ,  AddGroupUserResp as mpff_social_im_v2_AddGroupUserResp,IAddGroupUserResp as mpff_social_im_v2_IAddGroupUserResp ,  RemoveGroupUserResp as mpff_social_im_v2_RemoveGroupUserResp,IRemoveGroupUserResp as mpff_social_im_v2_IRemoveGroupUserResp ,  RemoveGroupUserReq as mpff_social_im_v2_RemoveGroupUserReq,IRemoveGroupUserReq as mpff_social_im_v2_IRemoveGroupUserReq ,  CreateGroupResp as mpff_social_im_v2_CreateGroupResp,ICreateGroupResp as mpff_social_im_v2_ICreateGroupResp ,  SendMessageReq as mpff_social_im_v2_SendMessageReq,ISendMessageReq as mpff_social_im_v2_ISendMessageReq ,  SendMessageResp as mpff_social_im_v2_SendMessageResp,ISendMessageResp as mpff_social_im_v2_ISendMessageResp ,  DisbandGroupResp as mpff_social_im_v2_DisbandGroupResp,IDisbandGroupResp as mpff_social_im_v2_IDisbandGroupResp ,  DisbandGroupReq as mpff_social_im_v2_DisbandGroupReq,IDisbandGroupReq as mpff_social_im_v2_IDisbandGroupReq ,  } from "idl/mpff/social/im.v2"
export enum CallbackBeforeSendMsgResult {  
    CallbackBeforeSendMsgResultOK = 0,  
    CallbackBeforeSendMsgResultBlacked = 1001,  
    CallbackBeforeSendMsgResultBeyondLimit = 1002,  
    CallbackBeforeSendMsgResultBlockUser = 1003,  
    CallbackBeforeSendMsgResultMuted = 1007,  
    CallbackBeforeSendMsgResultSpeedLimit = 1008,
}
export interface ICallbackBeforeCreateGroupReq {
    req?: mpff_social_im_v2_ICreateGroupReq
}
@protobuf.Type.d("mpff_social_callback_im_v2_CallbackBeforeCreateGroupReq")
export class CallbackBeforeCreateGroupReq extends protobuf.Message<ICallbackBeforeCreateGroupReq> {
    constructor(properties: Properties<ICallbackBeforeCreateGroupReq>) {
        super(properties);
        if (properties) {
            if (properties.req) { this.req = mpff_social_im_v2_CreateGroupReq.create(properties.req) as any }
        }
	}
    @protobuf.Field.d(1, "mpff_social_im_v2_CreateGroupReq", "optional")
    public req?: mpff_social_im_v2_CreateGroupReq|null
}
export interface ICallbackBeforeCreateGroupResp {
}
@protobuf.Type.d("mpff_social_callback_im_v2_CallbackBeforeCreateGroupResp")
export class CallbackBeforeCreateGroupResp extends protobuf.Message<ICallbackBeforeCreateGroupResp> {
    constructor(properties: Properties<ICallbackBeforeCreateGroupResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface ICallbackBeforeAddGroupUserReq {
    req?: mpff_social_im_v2_IAddGroupUserReq
}
@protobuf.Type.d("mpff_social_callback_im_v2_CallbackBeforeAddGroupUserReq")
export class CallbackBeforeAddGroupUserReq extends protobuf.Message<ICallbackBeforeAddGroupUserReq> {
    constructor(properties: Properties<ICallbackBeforeAddGroupUserReq>) {
        super(properties);
        if (properties) {
            if (properties.req) { this.req = mpff_social_im_v2_AddGroupUserReq.create(properties.req) as any }
        }
	}
    @protobuf.Field.d(1, "mpff_social_im_v2_AddGroupUserReq", "optional")
    public req?: mpff_social_im_v2_AddGroupUserReq|null
}
export interface ICallbackBeforeAddGroupUserResp {
}
@protobuf.Type.d("mpff_social_callback_im_v2_CallbackBeforeAddGroupUserResp")
export class CallbackBeforeAddGroupUserResp extends protobuf.Message<ICallbackBeforeAddGroupUserResp> {
    constructor(properties: Properties<ICallbackBeforeAddGroupUserResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface ICallbackAfterAddGroupUserReq {
    resp?: mpff_social_im_v2_IAddGroupUserResp
    req?: mpff_social_im_v2_IAddGroupUserReq
}
@protobuf.Type.d("mpff_social_callback_im_v2_CallbackAfterAddGroupUserReq")
export class CallbackAfterAddGroupUserReq extends protobuf.Message<ICallbackAfterAddGroupUserReq> {
    constructor(properties: Properties<ICallbackAfterAddGroupUserReq>) {
        super(properties);
        if (properties) {
            if (properties.resp) { this.resp = mpff_social_im_v2_AddGroupUserResp.create(properties.resp) as any }
            if (properties.req) { this.req = mpff_social_im_v2_AddGroupUserReq.create(properties.req) as any }
        }
	}
    @protobuf.Field.d(2, "mpff_social_im_v2_AddGroupUserResp", "optional")
    public resp?: mpff_social_im_v2_AddGroupUserResp|null
    @protobuf.Field.d(3, "mpff_social_im_v2_AddGroupUserReq", "optional")
    public req?: mpff_social_im_v2_AddGroupUserReq|null
}
export interface ICallbackAfterAddGroupUserResp {
}
@protobuf.Type.d("mpff_social_callback_im_v2_CallbackAfterAddGroupUserResp")
export class CallbackAfterAddGroupUserResp extends protobuf.Message<ICallbackAfterAddGroupUserResp> {
    constructor(properties: Properties<ICallbackAfterAddGroupUserResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface ICallbackAfterRemoveGroupUserReq {
    resp?: mpff_social_im_v2_IRemoveGroupUserResp
    req?: mpff_social_im_v2_IRemoveGroupUserReq
}
@protobuf.Type.d("mpff_social_callback_im_v2_CallbackAfterRemoveGroupUserReq")
export class CallbackAfterRemoveGroupUserReq extends protobuf.Message<ICallbackAfterRemoveGroupUserReq> {
    constructor(properties: Properties<ICallbackAfterRemoveGroupUserReq>) {
        super(properties);
        if (properties) {
            if (properties.resp) { this.resp = mpff_social_im_v2_RemoveGroupUserResp.create(properties.resp) as any }
            if (properties.req) { this.req = mpff_social_im_v2_RemoveGroupUserReq.create(properties.req) as any }
        }
	}
    @protobuf.Field.d(1, "mpff_social_im_v2_RemoveGroupUserResp", "optional")
    public resp?: mpff_social_im_v2_RemoveGroupUserResp|null
    @protobuf.Field.d(2, "mpff_social_im_v2_RemoveGroupUserReq", "optional")
    public req?: mpff_social_im_v2_RemoveGroupUserReq|null
}
export interface ICallbackAfterRemoveGroupUserResp {
}
@protobuf.Type.d("mpff_social_callback_im_v2_CallbackAfterRemoveGroupUserResp")
export class CallbackAfterRemoveGroupUserResp extends protobuf.Message<ICallbackAfterRemoveGroupUserResp> {
    constructor(properties: Properties<ICallbackAfterRemoveGroupUserResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface ICallbackAfterCreateGroupReq {
    resp?: mpff_social_im_v2_ICreateGroupResp
    req?: mpff_social_im_v2_ICreateGroupReq
}
@protobuf.Type.d("mpff_social_callback_im_v2_CallbackAfterCreateGroupReq")
export class CallbackAfterCreateGroupReq extends protobuf.Message<ICallbackAfterCreateGroupReq> {
    constructor(properties: Properties<ICallbackAfterCreateGroupReq>) {
        super(properties);
        if (properties) {
            if (properties.resp) { this.resp = mpff_social_im_v2_CreateGroupResp.create(properties.resp) as any }
            if (properties.req) { this.req = mpff_social_im_v2_CreateGroupReq.create(properties.req) as any }
        }
	}
    @protobuf.Field.d(1, "mpff_social_im_v2_CreateGroupResp", "optional")
    public resp?: mpff_social_im_v2_CreateGroupResp|null
    @protobuf.Field.d(2, "mpff_social_im_v2_CreateGroupReq", "optional")
    public req?: mpff_social_im_v2_CreateGroupReq|null
}
export interface ICallbackAfterCreateGroupResp {
}
@protobuf.Type.d("mpff_social_callback_im_v2_CallbackAfterCreateGroupResp")
export class CallbackAfterCreateGroupResp extends protobuf.Message<ICallbackAfterCreateGroupResp> {
    constructor(properties: Properties<ICallbackAfterCreateGroupResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface ICallbackBeforeSendMsgReq {
    req?: mpff_social_im_v2_ISendMessageReq
}
@protobuf.Type.d("mpff_social_callback_im_v2_CallbackBeforeSendMsgReq")
export class CallbackBeforeSendMsgReq extends protobuf.Message<ICallbackBeforeSendMsgReq> {
    constructor(properties: Properties<ICallbackBeforeSendMsgReq>) {
        super(properties);
        if (properties) {
            if (properties.req) { this.req = mpff_social_im_v2_SendMessageReq.create(properties.req) as any }
        }
	}
    @protobuf.Field.d(1, "mpff_social_im_v2_SendMessageReq", "optional")
    public req?: mpff_social_im_v2_SendMessageReq|null
}
export interface ICallbackBeforeSendMsgResp {
    code?: CallbackBeforeSendMsgResult|null
}
@protobuf.Type.d("mpff_social_callback_im_v2_CallbackBeforeSendMsgResp")
export class CallbackBeforeSendMsgResp extends protobuf.Message<ICallbackBeforeSendMsgResp> {
    constructor(properties: Properties<ICallbackBeforeSendMsgResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
        }
	}
    @protobuf.Field.d(1, CallbackBeforeSendMsgResult, "optional", CallbackBeforeSendMsgResult.CallbackBeforeSendMsgResultOK)
    public code?: CallbackBeforeSendMsgResult|null = CallbackBeforeSendMsgResult.CallbackBeforeSendMsgResultOK
}
export interface ICallbackAfterSendMsgReq {
    resp?: mpff_social_im_v2_ISendMessageResp
    req?: mpff_social_im_v2_ISendMessageReq
}
@protobuf.Type.d("mpff_social_callback_im_v2_CallbackAfterSendMsgReq")
export class CallbackAfterSendMsgReq extends protobuf.Message<ICallbackAfterSendMsgReq> {
    constructor(properties: Properties<ICallbackAfterSendMsgReq>) {
        super(properties);
        if (properties) {
            if (properties.resp) { this.resp = mpff_social_im_v2_SendMessageResp.create(properties.resp) as any }
            if (properties.req) { this.req = mpff_social_im_v2_SendMessageReq.create(properties.req) as any }
        }
	}
    @protobuf.Field.d(1, "mpff_social_im_v2_SendMessageResp", "optional")
    public resp?: mpff_social_im_v2_SendMessageResp|null
    @protobuf.Field.d(2, "mpff_social_im_v2_SendMessageReq", "optional")
    public req?: mpff_social_im_v2_SendMessageReq|null
}
export interface ICallbackAfterSendMsgResp {
}
@protobuf.Type.d("mpff_social_callback_im_v2_CallbackAfterSendMsgResp")
export class CallbackAfterSendMsgResp extends protobuf.Message<ICallbackAfterSendMsgResp> {
    constructor(properties: Properties<ICallbackAfterSendMsgResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface ICallbackAfterGroupDestroyedReq {
    resp?: mpff_social_im_v2_IDisbandGroupResp
    req?: mpff_social_im_v2_IDisbandGroupReq
}
@protobuf.Type.d("mpff_social_callback_im_v2_CallbackAfterGroupDestroyedReq")
export class CallbackAfterGroupDestroyedReq extends protobuf.Message<ICallbackAfterGroupDestroyedReq> {
    constructor(properties: Properties<ICallbackAfterGroupDestroyedReq>) {
        super(properties);
        if (properties) {
            if (properties.resp) { this.resp = mpff_social_im_v2_DisbandGroupResp.create(properties.resp) as any }
            if (properties.req) { this.req = mpff_social_im_v2_DisbandGroupReq.create(properties.req) as any }
        }
	}
    @protobuf.Field.d(1, "mpff_social_im_v2_DisbandGroupResp", "optional")
    public resp?: mpff_social_im_v2_DisbandGroupResp|null
    @protobuf.Field.d(2, "mpff_social_im_v2_DisbandGroupReq", "optional")
    public req?: mpff_social_im_v2_DisbandGroupReq|null
}
export interface ICallbackAfterGroupDestroyedResp {
}
@protobuf.Type.d("mpff_social_callback_im_v2_CallbackAfterGroupDestroyedResp")
export class CallbackAfterGroupDestroyedResp extends protobuf.Message<ICallbackAfterGroupDestroyedResp> {
    constructor(properties: Properties<ICallbackAfterGroupDestroyedResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IItemQueryReq {
    appID?: number|null
    messageKey?: mp_common_IMessageKey
    fromID?: number|null
    queryData?: Uint8Array
}
@protobuf.Type.d("mpff_social_callback_im_v2_ItemQueryReq")
export class ItemQueryReq extends protobuf.Message<IItemQueryReq> {
    constructor(properties: Properties<IItemQueryReq>) {
        super(properties);
        if (properties) {
            if (properties.appID) { this.appID = properties.appID }
            if (properties.messageKey) { this.messageKey = mp_common_MessageKey.create(properties.messageKey) as any }
            if (properties.fromID) { this.fromID = properties.fromID }
            if (properties.queryData) { this.queryData = properties.queryData }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public appID?: number|null = 0
    @protobuf.Field.d(2, "mp_common_MessageKey", "optional")
    public messageKey?: mp_common_MessageKey|null
    @protobuf.Field.d(3, "int64", "optional", 0)
    public fromID?: number|null = 0
    @protobuf.Field.d(4, "bytes", "optional", [])
    public queryData?: Uint8Array
}
export interface IMessageUpdateTrigger {
    content?: Uint8Array
    replyMarkup?: mp_common_IReplyMarkup
}
@protobuf.Type.d("mpff_social_callback_im_v2_MessageUpdateTrigger")
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
export interface ICallbackAfterItemQueryReq {
    req?: IItemQueryReq
}
@protobuf.Type.d("mpff_social_callback_im_v2_CallbackAfterItemQueryReq")
export class CallbackAfterItemQueryReq extends protobuf.Message<ICallbackAfterItemQueryReq> {
    constructor(properties: Properties<ICallbackAfterItemQueryReq>) {
        super(properties);
        if (properties) {
            if (properties.req) { this.req = ItemQueryReq.create(properties.req) as any }
        }
	}
    @protobuf.Field.d(1, "mpff_social_callback_im_v2_ItemQueryReq", "optional")
    public req?: ItemQueryReq|null
}
export interface ICallbackAfterItemQueryResp {
    data?: Uint8Array
    messageUpdateTrigger?: IMessageUpdateTrigger
    toast?: string|null
}
@protobuf.Type.d("mpff_social_callback_im_v2_CallbackAfterItemQueryResp")
export class CallbackAfterItemQueryResp extends protobuf.Message<ICallbackAfterItemQueryResp> {
    constructor(properties: Properties<ICallbackAfterItemQueryResp>) {
        super(properties);
        if (properties) {
            if (properties.data) { this.data = properties.data }
            if (properties.messageUpdateTrigger) { this.messageUpdateTrigger = MessageUpdateTrigger.create(properties.messageUpdateTrigger) as any }
            if (properties.toast) { this.toast = properties.toast }
        }
	}
    @protobuf.Field.d(1, "bytes", "optional", [])
    public data?: Uint8Array
    @protobuf.Field.d(2, "mpff_social_callback_im_v2_MessageUpdateTrigger", "optional")
    public messageUpdateTrigger?: MessageUpdateTrigger|null
    @protobuf.Field.d(3, "string", "optional", )
    public toast?: string|null = ""
}
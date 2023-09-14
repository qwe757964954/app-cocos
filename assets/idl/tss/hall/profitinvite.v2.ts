import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  Void as base_Void,IVoid as base_IVoid ,  } from "idl/base/base"
import {  AwardAcceptConf as tss_common_AwardAcceptConf,IAwardAcceptConf as tss_common_IAwardAcceptConf ,  PropItem as tss_common_PropItem,IPropItem as tss_common_IPropItem ,  } from "idl/tss/common/common_define"
import {  Task as tss_common_task_Task,ITask as tss_common_task_ITask ,  } from "idl/tss/common/common_task.v2"
export enum ActivityUser {  
    ActivityUserUnknown = 0,  
    ActivityUserAll = 1,  
    ActivityUserVIP = 2,  
    ActivityUserNew = 3,
}
export enum ShareType {  
    ShareTypeUnknown = 0,  
    ShareTypeWeChat = 1,  
    ShareTypeCopyLink = 2,  
    ShareTypeQRCode = 3,  
    ShareTypeWeChatMoments = 4,  
    ShareTypeQQ = 5,  
    ShareTypeScreenShot = 6,
}
export enum Code {  
    CodeOk = 0,  
    CodeAwardAlreadyAccepted = 1001,  
    CodePhoneAlreadyRegistered = 1002,  
    CodeInvalidPhone = 1003,  
    CodePhoneAlreadyInvited = 1004,
}
export enum TaskStatus {  
    TaskStatusUndefined = 0,  
    TaskStatusIncomplete = 1,  
    TaskStatusCompleted = 2,  
    TaskStatusAccepted = 3,
}
export enum AwardType {  
    AwardTypeUndefined = 0,  
    AwardTypeProp = 1,  
    AwardTypePrice = 2,  
    AwardTypeMung = 3,
}
export enum BoxType {  
    BoxTypeUndefined = 0,  
    BoxTypeTaskAward = 1,  
    BoxTypeMatchAward = 2,  
    BoxTypePayAward = 3,  
    BoxTypeInviteAward = 4,
}
export interface IUpsertActivityReq {
    activity?: IActivity
}
@protobuf.Type.d("tss_hall_profitinvite_v2_UpsertActivityReq")
export class UpsertActivityReq extends protobuf.Message<IUpsertActivityReq> {
    constructor(properties: Properties<IUpsertActivityReq>) {
        super(properties);
        if (properties) {
            if (properties.activity) { this.activity = Activity.create(properties.activity) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_profitinvite_v2_Activity", "optional")
    public activity?: Activity|null
}
export interface IActAward {
    userAcceptConf?: tss_common_IAwardAcceptConf
    userProp?: tss_common_IPropItem[]
}
@protobuf.Type.d("tss_hall_profitinvite_v2_ActAward")
export class ActAward extends protobuf.Message<IActAward> {
    constructor(properties: Properties<IActAward>) {
        super(properties);
        if (properties) {
            if (properties.userAcceptConf) { this.userAcceptConf = tss_common_AwardAcceptConf.create(properties.userAcceptConf) as any }
            if (properties.userProp) { this.userProp = []; properties.userProp.forEach((value, index)=>{this.userProp[index] = tss_common_PropItem.create(properties.userProp[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_common_AwardAcceptConf", "optional")
    public userAcceptConf?: tss_common_AwardAcceptConf|null
    @protobuf.Field.d(2, "tss_common_PropItem", "repeated")
    public userProp?: tss_common_PropItem[] = []
}
export interface IInviteActItem {
    taskInfo?: tss_common_task_ITask
    inviterAward?: IActAward
    inviteeAward?: IActAward
}
@protobuf.Type.d("tss_hall_profitinvite_v2_InviteActItem")
export class InviteActItem extends protobuf.Message<IInviteActItem> {
    constructor(properties: Properties<IInviteActItem>) {
        super(properties);
        if (properties) {
            if (properties.taskInfo) { this.taskInfo = tss_common_task_Task.create(properties.taskInfo) as any }
            if (properties.inviterAward) { this.inviterAward = ActAward.create(properties.inviterAward) as any }
            if (properties.inviteeAward) { this.inviteeAward = ActAward.create(properties.inviteeAward) as any }
        }
	}
    @protobuf.Field.d(1, "tss_common_task_Task", "optional")
    public taskInfo?: tss_common_task_Task|null
    @protobuf.Field.d(2, "tss_hall_profitinvite_v2_ActAward", "optional")
    public inviterAward?: ActAward|null
    @protobuf.Field.d(3, "tss_hall_profitinvite_v2_ActAward", "optional")
    public inviteeAward?: ActAward|null
}
export interface ITaskAward {
    enable?: boolean|null
    dayDuration?: number|null
    awardDesc?: string|null
    ruleDesc?: string|null
    inviteActItems?: IInviteActItem[]
}
@protobuf.Type.d("tss_hall_profitinvite_v2_TaskAward")
export class TaskAward extends protobuf.Message<ITaskAward> {
    constructor(properties: Properties<ITaskAward>) {
        super(properties);
        if (properties) {
            if (properties.enable) { this.enable = properties.enable }
            if (properties.dayDuration) { this.dayDuration = properties.dayDuration }
            if (properties.awardDesc) { this.awardDesc = properties.awardDesc }
            if (properties.ruleDesc) { this.ruleDesc = properties.ruleDesc }
            if (properties.inviteActItems) { this.inviteActItems = []; properties.inviteActItems.forEach((value, index)=>{this.inviteActItems[index] = InviteActItem.create(properties.inviteActItems[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "bool", "optional", false)
    public enable?: boolean|null = false
    @protobuf.Field.d(2, "int64", "optional", 0)
    public dayDuration?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public awardDesc?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public ruleDesc?: string|null = ""
    @protobuf.Field.d(8, "tss_hall_profitinvite_v2_InviteActItem", "repeated")
    public inviteActItems?: InviteActItem[] = []
}
export interface IPayAward {
    enable?: boolean|null
    awardDesc?: string|null
    rate?: number|null
    ruleDesc?: string|null
    awardType?: AwardType|null
    propAward?: tss_common_IPropItem
    propAwardPrice?: number|null
}
@protobuf.Type.d("tss_hall_profitinvite_v2_PayAward")
export class PayAward extends protobuf.Message<IPayAward> {
    constructor(properties: Properties<IPayAward>) {
        super(properties);
        if (properties) {
            if (properties.enable) { this.enable = properties.enable }
            if (properties.awardDesc) { this.awardDesc = properties.awardDesc }
            if (properties.rate) { this.rate = properties.rate }
            if (properties.ruleDesc) { this.ruleDesc = properties.ruleDesc }
            if (properties.awardType) { this.awardType = properties.awardType }
            if (properties.propAward) { this.propAward = tss_common_PropItem.create(properties.propAward) as any }
            if (properties.propAwardPrice) { this.propAwardPrice = properties.propAwardPrice }
        }
	}
    @protobuf.Field.d(1, "bool", "optional", false)
    public enable?: boolean|null = false
    @protobuf.Field.d(2, "string", "optional", )
    public awardDesc?: string|null = ""
    @protobuf.Field.d(3, "int32", "optional", 0)
    public rate?: number|null = 0
    @protobuf.Field.d(4, "string", "optional", )
    public ruleDesc?: string|null = ""
    @protobuf.Field.d(5, AwardType, "optional", AwardType.AwardTypeUndefined)
    public awardType?: AwardType|null = AwardType.AwardTypeUndefined
    @protobuf.Field.d(6, "tss_common_PropItem", "optional")
    public propAward?: tss_common_PropItem|null
    @protobuf.Field.d(7, "int64", "optional", 0)
    public propAwardPrice?: number|null = 0
}
export interface IInviteAward {
    enable?: boolean|null
    awardDesc?: string|null
    rate?: number|null
    ruleDesc?: string|null
    awardType?: AwardType|null
    propAward?: tss_common_IPropItem
    propAwardPrice?: number|null
}
@protobuf.Type.d("tss_hall_profitinvite_v2_InviteAward")
export class InviteAward extends protobuf.Message<IInviteAward> {
    constructor(properties: Properties<IInviteAward>) {
        super(properties);
        if (properties) {
            if (properties.enable) { this.enable = properties.enable }
            if (properties.awardDesc) { this.awardDesc = properties.awardDesc }
            if (properties.rate) { this.rate = properties.rate }
            if (properties.ruleDesc) { this.ruleDesc = properties.ruleDesc }
            if (properties.awardType) { this.awardType = properties.awardType }
            if (properties.propAward) { this.propAward = tss_common_PropItem.create(properties.propAward) as any }
            if (properties.propAwardPrice) { this.propAwardPrice = properties.propAwardPrice }
        }
	}
    @protobuf.Field.d(1, "bool", "optional", false)
    public enable?: boolean|null = false
    @protobuf.Field.d(2, "string", "optional", )
    public awardDesc?: string|null = ""
    @protobuf.Field.d(3, "int32", "optional", 0)
    public rate?: number|null = 0
    @protobuf.Field.d(4, "string", "optional", )
    public ruleDesc?: string|null = ""
    @protobuf.Field.d(5, AwardType, "optional", AwardType.AwardTypeUndefined)
    public awardType?: AwardType|null = AwardType.AwardTypeUndefined
    @protobuf.Field.d(6, "tss_common_PropItem", "optional")
    public propAward?: tss_common_PropItem|null
    @protobuf.Field.d(7, "int64", "optional", 0)
    public propAwardPrice?: number|null = 0
}
export interface IMatchAward {
    enable?: boolean|null
    awardDesc?: string|null
    dayDuration?: number|null
    rate?: number|null
    ruleDesc?: string|null
    awardType?: AwardType|null
    propAward?: tss_common_IPropItem
    propAwardPrice?: number|null
}
@protobuf.Type.d("tss_hall_profitinvite_v2_MatchAward")
export class MatchAward extends protobuf.Message<IMatchAward> {
    constructor(properties: Properties<IMatchAward>) {
        super(properties);
        if (properties) {
            if (properties.enable) { this.enable = properties.enable }
            if (properties.awardDesc) { this.awardDesc = properties.awardDesc }
            if (properties.dayDuration) { this.dayDuration = properties.dayDuration }
            if (properties.rate) { this.rate = properties.rate }
            if (properties.ruleDesc) { this.ruleDesc = properties.ruleDesc }
            if (properties.awardType) { this.awardType = properties.awardType }
            if (properties.propAward) { this.propAward = tss_common_PropItem.create(properties.propAward) as any }
            if (properties.propAwardPrice) { this.propAwardPrice = properties.propAwardPrice }
        }
	}
    @protobuf.Field.d(1, "bool", "optional", false)
    public enable?: boolean|null = false
    @protobuf.Field.d(2, "string", "optional", )
    public awardDesc?: string|null = ""
    @protobuf.Field.d(3, "int64", "optional", 0)
    public dayDuration?: number|null = 0
    @protobuf.Field.d(4, "int32", "optional", 0)
    public rate?: number|null = 0
    @protobuf.Field.d(5, "string", "optional", )
    public ruleDesc?: string|null = ""
    @protobuf.Field.d(6, AwardType, "optional", AwardType.AwardTypeUndefined)
    public awardType?: AwardType|null = AwardType.AwardTypeUndefined
    @protobuf.Field.d(7, "tss_common_PropItem", "optional")
    public propAward?: tss_common_PropItem|null
    @protobuf.Field.d(8, "int64", "optional", 0)
    public propAwardPrice?: number|null = 0
}
export interface IActivity {
    title?: string|null
    activityUser?: ActivityUser|null
    appRule?: string|null
    htmlLink?: string|null
    longTermAward?: tss_common_IPropItem
    longTermAwardPrice?: number|null
    taskAward?: ITaskAward
    matchAward?: IMatchAward
    payAward?: IPayAward
    inviteAward?: IInviteAward
    id?: number|null
}
@protobuf.Type.d("tss_hall_profitinvite_v2_Activity")
export class Activity extends protobuf.Message<IActivity> {
    constructor(properties: Properties<IActivity>) {
        super(properties);
        if (properties) {
            if (properties.title) { this.title = properties.title }
            if (properties.activityUser) { this.activityUser = properties.activityUser }
            if (properties.appRule) { this.appRule = properties.appRule }
            if (properties.htmlLink) { this.htmlLink = properties.htmlLink }
            if (properties.longTermAward) { this.longTermAward = tss_common_PropItem.create(properties.longTermAward) as any }
            if (properties.longTermAwardPrice) { this.longTermAwardPrice = properties.longTermAwardPrice }
            if (properties.taskAward) { this.taskAward = TaskAward.create(properties.taskAward) as any }
            if (properties.matchAward) { this.matchAward = MatchAward.create(properties.matchAward) as any }
            if (properties.payAward) { this.payAward = PayAward.create(properties.payAward) as any }
            if (properties.inviteAward) { this.inviteAward = InviteAward.create(properties.inviteAward) as any }
            if (properties.id) { this.id = properties.id }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public title?: string|null = ""
    @protobuf.Field.d(2, ActivityUser, "optional", ActivityUser.ActivityUserUnknown)
    public activityUser?: ActivityUser|null = ActivityUser.ActivityUserUnknown
    @protobuf.Field.d(3, "string", "optional", )
    public appRule?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public htmlLink?: string|null = ""
    @protobuf.Field.d(5, "tss_common_PropItem", "optional")
    public longTermAward?: tss_common_PropItem|null
    @protobuf.Field.d(6, "int64", "optional", 0)
    public longTermAwardPrice?: number|null = 0
    @protobuf.Field.d(7, "tss_hall_profitinvite_v2_TaskAward", "optional")
    public taskAward?: TaskAward|null
    @protobuf.Field.d(8, "tss_hall_profitinvite_v2_MatchAward", "optional")
    public matchAward?: MatchAward|null
    @protobuf.Field.d(9, "tss_hall_profitinvite_v2_PayAward", "optional")
    public payAward?: PayAward|null
    @protobuf.Field.d(10, "tss_hall_profitinvite_v2_InviteAward", "optional")
    public inviteAward?: InviteAward|null
    @protobuf.Field.d(11, "int64", "optional", 0)
    public id?: number|null = 0
}
export interface IInviteFlowReq {
    page?: number|null
    pageSize?: number|null
    uid?: number|null
}
@protobuf.Type.d("tss_hall_profitinvite_v2_InviteFlowReq")
export class InviteFlowReq extends protobuf.Message<IInviteFlowReq> {
    constructor(properties: Properties<IInviteFlowReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IInviteFlow {
    uid?: number|null
    shareType?: ShareType|null
    invitedUid?: number|null
    phoneNum?: string|null
    registryTime?: number|null
    inviteAwards?: IInviteAward[]
    rebateMung?: number|null
    userProp?: tss_common_IPropItem
}
@protobuf.Type.d("tss_hall_profitinvite_v2_InviteFlow")
export class InviteFlow extends protobuf.Message<IInviteFlow> {
    constructor(properties: Properties<IInviteFlow>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.shareType) { this.shareType = properties.shareType }
            if (properties.invitedUid) { this.invitedUid = properties.invitedUid }
            if (properties.phoneNum) { this.phoneNum = properties.phoneNum }
            if (properties.registryTime) { this.registryTime = properties.registryTime }
            if (properties.inviteAwards) { this.inviteAwards = []; properties.inviteAwards.forEach((value, index)=>{this.inviteAwards[index] = InviteAward.create(properties.inviteAwards[index]) as any})}
            if (properties.rebateMung) { this.rebateMung = properties.rebateMung }
            if (properties.userProp) { this.userProp = tss_common_PropItem.create(properties.userProp) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, ShareType, "optional", ShareType.ShareTypeUnknown)
    public shareType?: ShareType|null = ShareType.ShareTypeUnknown
    @protobuf.Field.d(3, "int64", "optional", 0)
    public invitedUid?: number|null = 0
    @protobuf.Field.d(4, "string", "optional", )
    public phoneNum?: string|null = ""
    @protobuf.Field.d(5, "int64", "optional", 0)
    public registryTime?: number|null = 0
    @protobuf.Field.d(6, "tss_hall_profitinvite_v2_InviteAward", "repeated")
    public inviteAwards?: InviteAward[] = []
    @protobuf.Field.d(7, "int64", "optional", 0)
    public rebateMung?: number|null = 0
    @protobuf.Field.d(8, "tss_common_PropItem", "optional")
    public userProp?: tss_common_PropItem|null
}
export interface IInviteFlowResp {
    totalSize?: number|null
    records?: IInviteFlow[]
}
@protobuf.Type.d("tss_hall_profitinvite_v2_InviteFlowResp")
export class InviteFlowResp extends protobuf.Message<IInviteFlowResp> {
    constructor(properties: Properties<IInviteFlowResp>) {
        super(properties);
        if (properties) {
            if (properties.totalSize) { this.totalSize = properties.totalSize }
            if (properties.records) { this.records = []; properties.records.forEach((value, index)=>{this.records[index] = InviteFlow.create(properties.records[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public totalSize?: number|null = 0
    @protobuf.Field.d(2, "tss_hall_profitinvite_v2_InviteFlow", "repeated")
    public records?: InviteFlow[] = []
}
export interface IListAwardStatReq {
    page?: number|null
    pageSize?: number|null
}
@protobuf.Type.d("tss_hall_profitinvite_v2_ListAwardStatReq")
export class ListAwardStatReq extends protobuf.Message<IListAwardStatReq> {
    constructor(properties: Properties<IListAwardStatReq>) {
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
export interface IAccumulativeAward {
    currentPrice?: number|null
    accumulativePrice?: number|null
    otherPrice?: number|null
    mungNum?: number|null
    ticketNum?: number|null
    inviteeNum?: number|null
    uid?: number|null
}
@protobuf.Type.d("tss_hall_profitinvite_v2_AccumulativeAward")
export class AccumulativeAward extends protobuf.Message<IAccumulativeAward> {
    constructor(properties: Properties<IAccumulativeAward>) {
        super(properties);
        if (properties) {
            if (properties.currentPrice) { this.currentPrice = properties.currentPrice }
            if (properties.accumulativePrice) { this.accumulativePrice = properties.accumulativePrice }
            if (properties.otherPrice) { this.otherPrice = properties.otherPrice }
            if (properties.mungNum) { this.mungNum = properties.mungNum }
            if (properties.ticketNum) { this.ticketNum = properties.ticketNum }
            if (properties.inviteeNum) { this.inviteeNum = properties.inviteeNum }
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public currentPrice?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public accumulativePrice?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public otherPrice?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public mungNum?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public ticketNum?: number|null = 0
    @protobuf.Field.d(6, "int64", "optional", 0)
    public inviteeNum?: number|null = 0
    @protobuf.Field.d(7, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IAcceptInvitationReq {
    uid?: number|null
    phoneNum?: string|null
    shareType?: ShareType|null
}
@protobuf.Type.d("tss_hall_profitinvite_v2_AcceptInvitationReq")
export class AcceptInvitationReq extends protobuf.Message<IAcceptInvitationReq> {
    constructor(properties: Properties<IAcceptInvitationReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.phoneNum) { this.phoneNum = properties.phoneNum }
            if (properties.shareType) { this.shareType = properties.shareType }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public phoneNum?: string|null = ""
    @protobuf.Field.d(3, ShareType, "optional", ShareType.ShareTypeUnknown)
    public shareType?: ShareType|null = ShareType.ShareTypeUnknown
}
export interface IAcceptInvitationResp {
    code?: Code|null
    msg?: string|null
}
@protobuf.Type.d("tss_hall_profitinvite_v2_AcceptInvitationResp")
export class AcceptInvitationResp extends protobuf.Message<IAcceptInvitationResp> {
    constructor(properties: Properties<IAcceptInvitationResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.msg) { this.msg = properties.msg }
        }
	}
    @protobuf.Field.d(1, Code, "optional", Code.CodeOk)
    public code?: Code|null = Code.CodeOk
    @protobuf.Field.d(2, "string", "optional", )
    public msg?: string|null = ""
}
export interface IReceiveTaskPrizeReq {
    phoneNum?: string|null
    boxIndex?: number|null
    getMungRebate?: boolean|null
}
@protobuf.Type.d("tss_hall_profitinvite_v2_ReceiveTaskPrizeReq")
export class ReceiveTaskPrizeReq extends protobuf.Message<IReceiveTaskPrizeReq> {
    constructor(properties: Properties<IReceiveTaskPrizeReq>) {
        super(properties);
        if (properties) {
            if (properties.phoneNum) { this.phoneNum = properties.phoneNum }
            if (properties.boxIndex) { this.boxIndex = properties.boxIndex }
            if (properties.getMungRebate) { this.getMungRebate = properties.getMungRebate }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public phoneNum?: string|null = ""
    @protobuf.Field.d(2, "int32", "optional", 0)
    public boxIndex?: number|null = 0
    @protobuf.Field.d(3, "bool", "optional", false)
    public getMungRebate?: boolean|null = false
}
export interface IReceiveTaskPrizeResp {
    code?: number|null
}
@protobuf.Type.d("tss_hall_profitinvite_v2_ReceiveTaskPrizeResp")
export class ReceiveTaskPrizeResp extends protobuf.Message<IReceiveTaskPrizeResp> {
    constructor(properties: Properties<IReceiveTaskPrizeResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
}
export interface ICallInviteeOnlineReq {
    invitedUid?: number|null
    phoneNum?: string|null
}
@protobuf.Type.d("tss_hall_profitinvite_v2_CallInviteeOnlineReq")
export class CallInviteeOnlineReq extends protobuf.Message<ICallInviteeOnlineReq> {
    constructor(properties: Properties<ICallInviteeOnlineReq>) {
        super(properties);
        if (properties) {
            if (properties.invitedUid) { this.invitedUid = properties.invitedUid }
            if (properties.phoneNum) { this.phoneNum = properties.phoneNum }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public invitedUid?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public phoneNum?: string|null = ""
}
export interface ICallInviteeOnlineResp {
}
@protobuf.Type.d("tss_hall_profitinvite_v2_CallInviteeOnlineResp")
export class CallInviteeOnlineResp extends protobuf.Message<ICallInviteeOnlineResp> {
    constructor(properties: Properties<ICallInviteeOnlineResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IListInviteDetailReq {
    uid?: number|null
    page?: number|null
    pageSize?: number|null
}
@protobuf.Type.d("tss_hall_profitinvite_v2_ListInviteDetailReq")
export class ListInviteDetailReq extends protobuf.Message<IListInviteDetailReq> {
    constructor(properties: Properties<IListInviteDetailReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(3, "int32", "optional", 0)
    public pageSize?: number|null = 0
}
export interface IBox {
    index?: number|null
    boxType?: BoxType|null
    awardType?: AwardType|null
    TaskDesc?: string|null
    targetNum?: number|null
    currentNum?: number|null
    receiveNum?: number|null
    startAt?: number|null
    endAt?: number|null
    rate?: number|null
    propAward?: tss_common_IPropItem[]
    AwardDesc?: string|null
}
@protobuf.Type.d("tss_hall_profitinvite_v2_Box")
export class Box extends protobuf.Message<IBox> {
    constructor(properties: Properties<IBox>) {
        super(properties);
        if (properties) {
            if (properties.index) { this.index = properties.index }
            if (properties.boxType) { this.boxType = properties.boxType }
            if (properties.awardType) { this.awardType = properties.awardType }
            if (properties.TaskDesc) { this.TaskDesc = properties.TaskDesc }
            if (properties.targetNum) { this.targetNum = properties.targetNum }
            if (properties.currentNum) { this.currentNum = properties.currentNum }
            if (properties.receiveNum) { this.receiveNum = properties.receiveNum }
            if (properties.startAt) { this.startAt = properties.startAt }
            if (properties.endAt) { this.endAt = properties.endAt }
            if (properties.rate) { this.rate = properties.rate }
            if (properties.propAward) { this.propAward = []; properties.propAward.forEach((value, index)=>{this.propAward[index] = tss_common_PropItem.create(properties.propAward[index]) as any})}
            if (properties.AwardDesc) { this.AwardDesc = properties.AwardDesc }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public index?: number|null = 0
    @protobuf.Field.d(2, BoxType, "optional", BoxType.BoxTypeUndefined)
    public boxType?: BoxType|null = BoxType.BoxTypeUndefined
    @protobuf.Field.d(3, AwardType, "optional", AwardType.AwardTypeUndefined)
    public awardType?: AwardType|null = AwardType.AwardTypeUndefined
    @protobuf.Field.d(4, "string", "optional", )
    public TaskDesc?: string|null = ""
    @protobuf.Field.d(5, "int64", "optional", 0)
    public targetNum?: number|null = 0
    @protobuf.Field.d(6, "int64", "optional", 0)
    public currentNum?: number|null = 0
    @protobuf.Field.d(7, "int64", "optional", 0)
    public receiveNum?: number|null = 0
    @protobuf.Field.d(8, "int64", "optional", 0)
    public startAt?: number|null = 0
    @protobuf.Field.d(9, "int64", "optional", 0)
    public endAt?: number|null = 0
    @protobuf.Field.d(10, "int32", "optional", 0)
    public rate?: number|null = 0
    @protobuf.Field.d(11, "tss_common_PropItem", "repeated")
    public propAward?: tss_common_PropItem[] = []
    @protobuf.Field.d(12, "string", "optional", )
    public AwardDesc?: string|null = ""
}
export interface IInviteRecord {
    uid?: number|null
    phoneNum?: string|null
    invitedUid?: number|null
    box?: IBox[]
    isShowRedDot?: boolean|null
    shareType?: ShareType|null
    registryTime?: number|null
    inviteTime?: number|null
    sumPrice?: number|null
}
@protobuf.Type.d("tss_hall_profitinvite_v2_InviteRecord")
export class InviteRecord extends protobuf.Message<IInviteRecord> {
    constructor(properties: Properties<IInviteRecord>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.phoneNum) { this.phoneNum = properties.phoneNum }
            if (properties.invitedUid) { this.invitedUid = properties.invitedUid }
            if (properties.box) { this.box = []; properties.box.forEach((value, index)=>{this.box[index] = Box.create(properties.box[index]) as any})}
            if (properties.isShowRedDot) { this.isShowRedDot = properties.isShowRedDot }
            if (properties.shareType) { this.shareType = properties.shareType }
            if (properties.registryTime) { this.registryTime = properties.registryTime }
            if (properties.inviteTime) { this.inviteTime = properties.inviteTime }
            if (properties.sumPrice) { this.sumPrice = properties.sumPrice }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public phoneNum?: string|null = ""
    @protobuf.Field.d(3, "int64", "optional", 0)
    public invitedUid?: number|null = 0
    @protobuf.Field.d(4, "tss_hall_profitinvite_v2_Box", "repeated")
    public box?: Box[] = []
    @protobuf.Field.d(5, "bool", "optional", false)
    public isShowRedDot?: boolean|null = false
    @protobuf.Field.d(6, ShareType, "optional", ShareType.ShareTypeUnknown)
    public shareType?: ShareType|null = ShareType.ShareTypeUnknown
    @protobuf.Field.d(7, "int64", "optional", 0)
    public registryTime?: number|null = 0
    @protobuf.Field.d(8, "int64", "optional", 0)
    public inviteTime?: number|null = 0
    @protobuf.Field.d(9, "int64", "optional", 0)
    public sumPrice?: number|null = 0
}
export interface IGetActivityResp {
    activity?: IActivity
}
@protobuf.Type.d("tss_hall_profitinvite_v2_GetActivityResp")
export class GetActivityResp extends protobuf.Message<IGetActivityResp> {
    constructor(properties: Properties<IGetActivityResp>) {
        super(properties);
        if (properties) {
            if (properties.activity) { this.activity = Activity.create(properties.activity) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_profitinvite_v2_Activity", "optional")
    public activity?: Activity|null
}
export interface IListInviteDetailResp {
    records?: IInviteRecord[]
}
@protobuf.Type.d("tss_hall_profitinvite_v2_ListInviteDetailResp")
export class ListInviteDetailResp extends protobuf.Message<IListInviteDetailResp> {
    constructor(properties: Properties<IListInviteDetailResp>) {
        super(properties);
        if (properties) {
            if (properties.records) { this.records = []; properties.records.forEach((value, index)=>{this.records[index] = InviteRecord.create(properties.records[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_profitinvite_v2_InviteRecord", "repeated")
    public records?: InviteRecord[] = []
}
export interface IReceivePoolPrizeReq {
    price?: number|null
}
@protobuf.Type.d("tss_hall_profitinvite_v2_ReceivePoolPrizeReq")
export class ReceivePoolPrizeReq extends protobuf.Message<IReceivePoolPrizeReq> {
    constructor(properties: Properties<IReceivePoolPrizeReq>) {
        super(properties);
        if (properties) {
            if (properties.price) { this.price = properties.price }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public price?: number|null = 0
}
export interface IReceivePoolPrizeResp {
    code?: number|null
}
@protobuf.Type.d("tss_hall_profitinvite_v2_ReceivePoolPrizeResp")
export class ReceivePoolPrizeResp extends protobuf.Message<IReceivePoolPrizeResp> {
    constructor(properties: Properties<IReceivePoolPrizeResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
}
export interface IGetPoolInfoReq {
}
@protobuf.Type.d("tss_hall_profitinvite_v2_GetPoolInfoReq")
export class GetPoolInfoReq extends protobuf.Message<IGetPoolInfoReq> {
    constructor(properties: Properties<IGetPoolInfoReq>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IGetPoolInfoResp {
    accumulativeAward?: IAccumulativeAward
}
@protobuf.Type.d("tss_hall_profitinvite_v2_GetPoolInfoResp")
export class GetPoolInfoResp extends protobuf.Message<IGetPoolInfoResp> {
    constructor(properties: Properties<IGetPoolInfoResp>) {
        super(properties);
        if (properties) {
            if (properties.accumulativeAward) { this.accumulativeAward = AccumulativeAward.create(properties.accumulativeAward) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_profitinvite_v2_AccumulativeAward", "optional")
    public accumulativeAward?: AccumulativeAward|null
}
export interface IListAwardStatResp {
    accumulativeAward?: IAccumulativeAward[]
}
@protobuf.Type.d("tss_hall_profitinvite_v2_ListAwardStatResp")
export class ListAwardStatResp extends protobuf.Message<IListAwardStatResp> {
    constructor(properties: Properties<IListAwardStatResp>) {
        super(properties);
        if (properties) {
            if (properties.accumulativeAward) { this.accumulativeAward = []; properties.accumulativeAward.forEach((value, index)=>{this.accumulativeAward[index] = AccumulativeAward.create(properties.accumulativeAward[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_profitinvite_v2_AccumulativeAward", "repeated")
    public accumulativeAward?: AccumulativeAward[] = []
}
export interface IListAwardFlowReq {
    uid?: number|null
    page?: number|null
    pageSize?: number|null
}
@protobuf.Type.d("tss_hall_profitinvite_v2_ListAwardFlowReq")
export class ListAwardFlowReq extends protobuf.Message<IListAwardFlowReq> {
    constructor(properties: Properties<IListAwardFlowReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(3, "int32", "optional", 0)
    public pageSize?: number|null = 0
}
export interface IAwardFlow {
    uid?: number|null
    time?: number|null
    awardType?: AwardType|null
    inviterAward?: tss_common_IPropItem[]
    TaskName?: string|null
    price?: number|null
    inviteeAward?: tss_common_IPropItem[]
    shareType?: ShareType|null
    TaskDesc?: string|null
    AwardDesc?: string|null
    boxType?: BoxType|null
    inviterUid?: number|null
}
@protobuf.Type.d("tss_hall_profitinvite_v2_AwardFlow")
export class AwardFlow extends protobuf.Message<IAwardFlow> {
    constructor(properties: Properties<IAwardFlow>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.time) { this.time = properties.time }
            if (properties.awardType) { this.awardType = properties.awardType }
            if (properties.inviterAward) { this.inviterAward = []; properties.inviterAward.forEach((value, index)=>{this.inviterAward[index] = tss_common_PropItem.create(properties.inviterAward[index]) as any})}
            if (properties.TaskName) { this.TaskName = properties.TaskName }
            if (properties.price) { this.price = properties.price }
            if (properties.inviteeAward) { this.inviteeAward = []; properties.inviteeAward.forEach((value, index)=>{this.inviteeAward[index] = tss_common_PropItem.create(properties.inviteeAward[index]) as any})}
            if (properties.shareType) { this.shareType = properties.shareType }
            if (properties.TaskDesc) { this.TaskDesc = properties.TaskDesc }
            if (properties.AwardDesc) { this.AwardDesc = properties.AwardDesc }
            if (properties.boxType) { this.boxType = properties.boxType }
            if (properties.inviterUid) { this.inviterUid = properties.inviterUid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public time?: number|null = 0
    @protobuf.Field.d(3, AwardType, "optional", AwardType.AwardTypeUndefined)
    public awardType?: AwardType|null = AwardType.AwardTypeUndefined
    @protobuf.Field.d(4, "tss_common_PropItem", "repeated")
    public inviterAward?: tss_common_PropItem[] = []
    @protobuf.Field.d(5, "string", "optional", )
    public TaskName?: string|null = ""
    @protobuf.Field.d(6, "int64", "optional", 0)
    public price?: number|null = 0
    @protobuf.Field.d(7, "tss_common_PropItem", "repeated")
    public inviteeAward?: tss_common_PropItem[] = []
    @protobuf.Field.d(8, ShareType, "optional", ShareType.ShareTypeUnknown)
    public shareType?: ShareType|null = ShareType.ShareTypeUnknown
    @protobuf.Field.d(9, "string", "optional", )
    public TaskDesc?: string|null = ""
    @protobuf.Field.d(10, "string", "optional", )
    public AwardDesc?: string|null = ""
    @protobuf.Field.d(11, BoxType, "optional", BoxType.BoxTypeUndefined)
    public boxType?: BoxType|null = BoxType.BoxTypeUndefined
    @protobuf.Field.d(12, "int64", "optional", 0)
    public inviterUid?: number|null = 0
}
export interface IListAwardFlowResp {
    flows?: IAwardFlow[]
}
@protobuf.Type.d("tss_hall_profitinvite_v2_ListAwardFlowResp")
export class ListAwardFlowResp extends protobuf.Message<IListAwardFlowResp> {
    constructor(properties: Properties<IListAwardFlowResp>) {
        super(properties);
        if (properties) {
            if (properties.flows) { this.flows = []; properties.flows.forEach((value, index)=>{this.flows[index] = AwardFlow.create(properties.flows[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_profitinvite_v2_AwardFlow", "repeated")
    public flows?: AwardFlow[] = []
}
class $ProfitInviteService extends RpcService {
    async UpsertActivity(req: IUpsertActivityReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = UpsertActivityReq.create(req)
        this.onBeforeReq("UpsertActivity", data, params)
        const buffer = UpsertActivityReq.encode(data).finish()
        let [err, pack] = await this.call("UpsertActivity", buffer, params)
        if (err) {
            this.onBeforeResp("UpsertActivity", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("UpsertActivity", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ReceiveTaskPrize(req: IReceiveTaskPrizeReq, params?: RpcParams) : Promise<{err:number, resp:IReceiveTaskPrizeResp}> {
        let data = ReceiveTaskPrizeReq.create(req)
        this.onBeforeReq("ReceiveTaskPrize", data, params)
        const buffer = ReceiveTaskPrizeReq.encode(data).finish()
        let [err, pack] = await this.call("ReceiveTaskPrize", buffer, params)
        if (err) {
            this.onBeforeResp("ReceiveTaskPrize", err)
            return {err: err, resp: null}
        } else {
            let resp = ReceiveTaskPrizeResp.decode(pack) as any
            this.onBeforeResp("ReceiveTaskPrize", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListInviteDetail(req: IListInviteDetailReq, params?: RpcParams) : Promise<{err:number, resp:IListInviteDetailResp}> {
        let data = ListInviteDetailReq.create(req)
        this.onBeforeReq("ListInviteDetail", data, params)
        const buffer = ListInviteDetailReq.encode(data).finish()
        let [err, pack] = await this.call("ListInviteDetail", buffer, params)
        if (err) {
            this.onBeforeResp("ListInviteDetail", err)
            return {err: err, resp: null}
        } else {
            let resp = ListInviteDetailResp.decode(pack) as any
            this.onBeforeResp("ListInviteDetail", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetPoolInfo(req: IGetPoolInfoReq, params?: RpcParams) : Promise<{err:number, resp:IGetPoolInfoResp}> {
        let data = GetPoolInfoReq.create(req)
        this.onBeforeReq("GetPoolInfo", data, params)
        const buffer = GetPoolInfoReq.encode(data).finish()
        let [err, pack] = await this.call("GetPoolInfo", buffer, params)
        if (err) {
            this.onBeforeResp("GetPoolInfo", err)
            return {err: err, resp: null}
        } else {
            let resp = GetPoolInfoResp.decode(pack) as any
            this.onBeforeResp("GetPoolInfo", err, resp)
            return {err: null, resp: resp}
        }
    }
    async AcceptInvitation(req: IAcceptInvitationReq, params?: RpcParams) : Promise<{err:number, resp:IAcceptInvitationResp}> {
        let data = AcceptInvitationReq.create(req)
        this.onBeforeReq("AcceptInvitation", data, params)
        const buffer = AcceptInvitationReq.encode(data).finish()
        let [err, pack] = await this.call("AcceptInvitation", buffer, params)
        if (err) {
            this.onBeforeResp("AcceptInvitation", err)
            return {err: err, resp: null}
        } else {
            let resp = AcceptInvitationResp.decode(pack) as any
            this.onBeforeResp("AcceptInvitation", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListAwardStat(req: IListAwardStatReq, params?: RpcParams) : Promise<{err:number, resp:IListAwardStatResp}> {
        let data = ListAwardStatReq.create(req)
        this.onBeforeReq("ListAwardStat", data, params)
        const buffer = ListAwardStatReq.encode(data).finish()
        let [err, pack] = await this.call("ListAwardStat", buffer, params)
        if (err) {
            this.onBeforeResp("ListAwardStat", err)
            return {err: err, resp: null}
        } else {
            let resp = ListAwardStatResp.decode(pack) as any
            this.onBeforeResp("ListAwardStat", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ReceivePoolPrize(req: IReceivePoolPrizeReq, params?: RpcParams) : Promise<{err:number, resp:IReceivePoolPrizeResp}> {
        let data = ReceivePoolPrizeReq.create(req)
        this.onBeforeReq("ReceivePoolPrize", data, params)
        const buffer = ReceivePoolPrizeReq.encode(data).finish()
        let [err, pack] = await this.call("ReceivePoolPrize", buffer, params)
        if (err) {
            this.onBeforeResp("ReceivePoolPrize", err)
            return {err: err, resp: null}
        } else {
            let resp = ReceivePoolPrizeResp.decode(pack) as any
            this.onBeforeResp("ReceivePoolPrize", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListAwardFlow(req: IListAwardFlowReq, params?: RpcParams) : Promise<{err:number, resp:IListAwardFlowResp}> {
        let data = ListAwardFlowReq.create(req)
        this.onBeforeReq("ListAwardFlow", data, params)
        const buffer = ListAwardFlowReq.encode(data).finish()
        let [err, pack] = await this.call("ListAwardFlow", buffer, params)
        if (err) {
            this.onBeforeResp("ListAwardFlow", err)
            return {err: err, resp: null}
        } else {
            let resp = ListAwardFlowResp.decode(pack) as any
            this.onBeforeResp("ListAwardFlow", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetActivity(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:IGetActivityResp}> {
        let data = base_Void.create(req)
        this.onBeforeReq("GetActivity", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("GetActivity", buffer, params)
        if (err) {
            this.onBeforeResp("GetActivity", err)
            return {err: err, resp: null}
        } else {
            let resp = GetActivityResp.decode(pack) as any
            this.onBeforeResp("GetActivity", err, resp)
            return {err: null, resp: resp}
        }
    }
}
export const ProfitInviteService = new $ProfitInviteService({
    name: "tss.hall.profitinvite.v2",
})
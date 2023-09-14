import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  Void as base_Void,IVoid as base_IVoid ,  BatchGetResourceReq as base_BatchGetResourceReq,IBatchGetResourceReq as base_IBatchGetResourceReq ,  BatchGetResourceResp as base_BatchGetResourceResp,IBatchGetResourceResp as base_IBatchGetResourceResp ,  } from "idl/base/base"
import {  SwitchState as tss_common_SwitchState ,  AssetItem as tss_common_AssetItem,IAssetItem as tss_common_IAssetItem ,  AwardAcceptConf as tss_common_AwardAcceptConf,IAwardAcceptConf as tss_common_IAwardAcceptConf ,  } from "idl/tss/common/common_define"
import {  TaskStatus as tss_common_task_TaskStatus ,  TaskAwardAcceptStatus as tss_common_task_TaskAwardAcceptStatus ,  Task as tss_common_task_Task,ITask as tss_common_task_ITask ,  } from "idl/tss/common/common_task.v2"
import {  ActivityBase as tss_hall_common_ActivityBase,IActivityBase as tss_hall_common_IActivityBase ,  ActivityType as tss_hall_common_ActivityType ,  ActivityOnlineType as tss_hall_common_ActivityOnlineType ,  ActivityPriority as tss_hall_common_ActivityPriority,IActivityPriority as tss_hall_common_IActivityPriority ,  ActivityTab as tss_hall_common_ActivityTab ,  } from "idl/tss/hall/common/activity"
import {  BatchGetBadgeReq as tss_hall_common_BatchGetBadgeReq,IBatchGetBadgeReq as tss_hall_common_IBatchGetBadgeReq ,  BatchGetBadgeResp as tss_hall_common_BatchGetBadgeResp,IBatchGetBadgeResp as tss_hall_common_IBatchGetBadgeResp ,  ListUserActivityBadgeReq as tss_hall_common_ListUserActivityBadgeReq,IListUserActivityBadgeReq as tss_hall_common_IListUserActivityBadgeReq ,  ListUserActivityBadgeResp as tss_hall_common_ListUserActivityBadgeResp,IListUserActivityBadgeResp as tss_hall_common_IListUserActivityBadgeResp ,  Badge as tss_hall_common_Badge,IBadge as tss_hall_common_IBadge ,  } from "idl/tss/hall/common/badge"
export enum ContentType {  
    Text = 0,  
    Image = 1,
}
export interface IActivity {
    id?: number|null
    base?: tss_hall_common_IActivityBase
    taskConf?: ITaskConfig
    announcementConfig?: IAnnouncementConfig
    popularizeConfig?: IPopularizeConfig
}
@protobuf.Type.d("tss_hall_activityhub_v2_Activity")
export class Activity extends protobuf.Message<IActivity> {
    constructor(properties: Properties<IActivity>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.base) { this.base = tss_hall_common_ActivityBase.create(properties.base) as any }
            if (properties.taskConf) { this.taskConf = TaskConfig.create(properties.taskConf) as any }
            if (properties.announcementConfig) { this.announcementConfig = AnnouncementConfig.create(properties.announcementConfig) as any }
            if (properties.popularizeConfig) { this.popularizeConfig = PopularizeConfig.create(properties.popularizeConfig) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public id?: number|null = 0
    @protobuf.Field.d(2, "tss_hall_common_ActivityBase", "optional")
    public base?: tss_hall_common_ActivityBase|null
    @protobuf.Field.d(3, "tss_hall_activityhub_v2_TaskConfig", "optional")
    public taskConf?: TaskConfig|null
    @protobuf.Field.d(4, "tss_hall_activityhub_v2_AnnouncementConfig", "optional")
    public announcementConfig?: AnnouncementConfig|null
    @protobuf.Field.d(5, "tss_hall_activityhub_v2_PopularizeConfig", "optional")
    public popularizeConfig?: PopularizeConfig|null
}
export interface ISaveActivityReq {
    activity?: IActivity
}
@protobuf.Type.d("tss_hall_activityhub_v2_SaveActivityReq")
export class SaveActivityReq extends protobuf.Message<ISaveActivityReq> {
    constructor(properties: Properties<ISaveActivityReq>) {
        super(properties);
        if (properties) {
            if (properties.activity) { this.activity = Activity.create(properties.activity) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_activityhub_v2_Activity", "optional")
    public activity?: Activity|null
}
export interface ISaveActivityResp {
    activityID?: number|null
}
@protobuf.Type.d("tss_hall_activityhub_v2_SaveActivityResp")
export class SaveActivityResp extends protobuf.Message<ISaveActivityResp> {
    constructor(properties: Properties<ISaveActivityResp>) {
        super(properties);
        if (properties) {
            if (properties.activityID) { this.activityID = properties.activityID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public activityID?: number|null = 0
}
export interface IGetActivityReq {
    activityID?: number|null
}
@protobuf.Type.d("tss_hall_activityhub_v2_GetActivityReq")
export class GetActivityReq extends protobuf.Message<IGetActivityReq> {
    constructor(properties: Properties<IGetActivityReq>) {
        super(properties);
        if (properties) {
            if (properties.activityID) { this.activityID = properties.activityID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public activityID?: number|null = 0
}
export interface IGetActivityResp {
    activity?: IActivity
}
@protobuf.Type.d("tss_hall_activityhub_v2_GetActivityResp")
export class GetActivityResp extends protobuf.Message<IGetActivityResp> {
    constructor(properties: Properties<IGetActivityResp>) {
        super(properties);
        if (properties) {
            if (properties.activity) { this.activity = Activity.create(properties.activity) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_activityhub_v2_Activity", "optional")
    public activity?: Activity|null
}
export interface IBatchGetActivityReq {
    ids?: number[]
}
@protobuf.Type.d("tss_hall_activityhub_v2_BatchGetActivityReq")
export class BatchGetActivityReq extends protobuf.Message<IBatchGetActivityReq> {
    constructor(properties: Properties<IBatchGetActivityReq>) {
        super(properties);
        if (properties) {
            if (properties.ids) { this.ids = []; properties.ids.forEach((value, index)=>{this.ids[index] = properties.ids[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public ids?: number[] = []
}
export interface IBatchGetActivityResp {
    activities?: IActivity[]
}
@protobuf.Type.d("tss_hall_activityhub_v2_BatchGetActivityResp")
export class BatchGetActivityResp extends protobuf.Message<IBatchGetActivityResp> {
    constructor(properties: Properties<IBatchGetActivityResp>) {
        super(properties);
        if (properties) {
            if (properties.activities) { this.activities = []; properties.activities.forEach((value, index)=>{this.activities[index] = Activity.create(properties.activities[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_activityhub_v2_Activity", "repeated")
    public activities?: Activity[] = []
}
export interface IDeleteActivityReq {
    activityID?: number|null
    operator?: string|null
}
@protobuf.Type.d("tss_hall_activityhub_v2_DeleteActivityReq")
export class DeleteActivityReq extends protobuf.Message<IDeleteActivityReq> {
    constructor(properties: Properties<IDeleteActivityReq>) {
        super(properties);
        if (properties) {
            if (properties.activityID) { this.activityID = properties.activityID }
            if (properties.operator) { this.operator = properties.operator }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public activityID?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public operator?: string|null = ""
}
export interface IDeleteActivityResp {
}
@protobuf.Type.d("tss_hall_activityhub_v2_DeleteActivityResp")
export class DeleteActivityResp extends protobuf.Message<IDeleteActivityResp> {
    constructor(properties: Properties<IDeleteActivityResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IListActivityReq {
    key?: string|null
    isPopup?: tss_common_SwitchState|null
    page?: number|null
    pageSize?: number|null
    applicationId?: string|null
    activityType?: tss_hall_common_ActivityType|null
    activityOnlineType?: tss_hall_common_ActivityOnlineType|null
}
@protobuf.Type.d("tss_hall_activityhub_v2_ListActivityReq")
export class ListActivityReq extends protobuf.Message<IListActivityReq> {
    constructor(properties: Properties<IListActivityReq>) {
        super(properties);
        if (properties) {
            if (properties.key) { this.key = properties.key }
            if (properties.isPopup) { this.isPopup = properties.isPopup }
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.applicationId) { this.applicationId = properties.applicationId }
            if (properties.activityType) { this.activityType = properties.activityType }
            if (properties.activityOnlineType) { this.activityOnlineType = properties.activityOnlineType }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public key?: string|null = ""
    @protobuf.Field.d(2, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public isPopup?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
    @protobuf.Field.d(3, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(5, "string", "optional", )
    public applicationId?: string|null = ""
    @protobuf.Field.d(6, tss_hall_common_ActivityType, "optional", tss_hall_common_ActivityType.ActivityTypeUnknown)
    public activityType?: tss_hall_common_ActivityType|null = tss_hall_common_ActivityType.ActivityTypeUnknown
    @protobuf.Field.d(7, tss_hall_common_ActivityOnlineType, "optional", tss_hall_common_ActivityOnlineType.ActivityOnlineTypeUnknwon)
    public activityOnlineType?: tss_hall_common_ActivityOnlineType|null = tss_hall_common_ActivityOnlineType.ActivityOnlineTypeUnknwon
}
export interface IListActivityResp {
    activities?: IActivity[]
    totalSize?: number|null
}
@protobuf.Type.d("tss_hall_activityhub_v2_ListActivityResp")
export class ListActivityResp extends protobuf.Message<IListActivityResp> {
    constructor(properties: Properties<IListActivityResp>) {
        super(properties);
        if (properties) {
            if (properties.activities) { this.activities = []; properties.activities.forEach((value, index)=>{this.activities[index] = Activity.create(properties.activities[index]) as any})}
            if (properties.totalSize) { this.totalSize = properties.totalSize }
        }
	}
    @protobuf.Field.d(1, "tss_hall_activityhub_v2_Activity", "repeated")
    public activities?: Activity[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public totalSize?: number|null = 0
}
export interface IBatchUpdatePriorityReq {
    updatePriority?: tss_hall_common_IActivityPriority[]
}
@protobuf.Type.d("tss_hall_activityhub_v2_BatchUpdatePriorityReq")
export class BatchUpdatePriorityReq extends protobuf.Message<IBatchUpdatePriorityReq> {
    constructor(properties: Properties<IBatchUpdatePriorityReq>) {
        super(properties);
        if (properties) {
            if (properties.updatePriority) { this.updatePriority = []; properties.updatePriority.forEach((value, index)=>{this.updatePriority[index] = tss_hall_common_ActivityPriority.create(properties.updatePriority[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_common_ActivityPriority", "repeated")
    public updatePriority?: tss_hall_common_ActivityPriority[] = []
}
export interface IUserBriefActivity {
    id?: number|null
    base?: tss_hall_common_IActivityBase
    badge?: tss_hall_common_IBadge
}
@protobuf.Type.d("tss_hall_activityhub_v2_UserBriefActivity")
export class UserBriefActivity extends protobuf.Message<IUserBriefActivity> {
    constructor(properties: Properties<IUserBriefActivity>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.base) { this.base = tss_hall_common_ActivityBase.create(properties.base) as any }
            if (properties.badge) { this.badge = tss_hall_common_Badge.create(properties.badge) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public id?: number|null = 0
    @protobuf.Field.d(2, "tss_hall_common_ActivityBase", "optional")
    public base?: tss_hall_common_ActivityBase|null
    @protobuf.Field.d(3, "tss_hall_common_Badge", "optional")
    public badge?: tss_hall_common_Badge|null
}
export interface IUserTask {
    taskID?: number|null
    uid?: number|null
    period?: number|null
    doneCnt?: number|null
    doneAt?: number|null
    taskStatus?: tss_common_task_TaskStatus|null
    acceptStatus?: tss_common_task_TaskAwardAcceptStatus|null
    progress?: number|null
}
@protobuf.Type.d("tss_hall_activityhub_v2_UserTask")
export class UserTask extends protobuf.Message<IUserTask> {
    constructor(properties: Properties<IUserTask>) {
        super(properties);
        if (properties) {
            if (properties.taskID) { this.taskID = properties.taskID }
            if (properties.uid) { this.uid = properties.uid }
            if (properties.period) { this.period = properties.period }
            if (properties.doneCnt) { this.doneCnt = properties.doneCnt }
            if (properties.doneAt) { this.doneAt = properties.doneAt }
            if (properties.taskStatus) { this.taskStatus = properties.taskStatus }
            if (properties.acceptStatus) { this.acceptStatus = properties.acceptStatus }
            if (properties.progress) { this.progress = properties.progress }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public taskID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public period?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public doneCnt?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public doneAt?: number|null = 0
    @protobuf.Field.d(6, tss_common_task_TaskStatus, "optional", tss_common_task_TaskStatus.TaskStatusUnknown)
    public taskStatus?: tss_common_task_TaskStatus|null = tss_common_task_TaskStatus.TaskStatusUnknown
    @protobuf.Field.d(7, tss_common_task_TaskAwardAcceptStatus, "optional", tss_common_task_TaskAwardAcceptStatus.TaskAwardAcceptStatusUnknown)
    public acceptStatus?: tss_common_task_TaskAwardAcceptStatus|null = tss_common_task_TaskAwardAcceptStatus.TaskAwardAcceptStatusUnknown
    @protobuf.Field.d(10, "int64", "optional", 0)
    public progress?: number|null = 0
}
export interface IListUserBriefActivityReq {
    page?: number|null
    pageSize?: number|null
    isPopup?: tss_common_SwitchState|null
    isList?: tss_common_SwitchState|null
    isShortCut?: tss_common_SwitchState|null
    activityTab?: tss_hall_common_ActivityTab|null
}
@protobuf.Type.d("tss_hall_activityhub_v2_ListUserBriefActivityReq")
export class ListUserBriefActivityReq extends protobuf.Message<IListUserBriefActivityReq> {
    constructor(properties: Properties<IListUserBriefActivityReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.isPopup) { this.isPopup = properties.isPopup }
            if (properties.isList) { this.isList = properties.isList }
            if (properties.isShortCut) { this.isShortCut = properties.isShortCut }
            if (properties.activityTab) { this.activityTab = properties.activityTab }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(3, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public isPopup?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
    @protobuf.Field.d(4, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public isList?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
    @protobuf.Field.d(5, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public isShortCut?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
    @protobuf.Field.d(6, tss_hall_common_ActivityTab, "optional", tss_hall_common_ActivityTab.ActivityTabUnknown)
    public activityTab?: tss_hall_common_ActivityTab|null = tss_hall_common_ActivityTab.ActivityTabUnknown
}
export interface IListUserBriefActivityResp {
    activities?: IUserBriefActivity[]
    total?: number|null
}
@protobuf.Type.d("tss_hall_activityhub_v2_ListUserBriefActivityResp")
export class ListUserBriefActivityResp extends protobuf.Message<IListUserBriefActivityResp> {
    constructor(properties: Properties<IListUserBriefActivityResp>) {
        super(properties);
        if (properties) {
            if (properties.activities) { this.activities = []; properties.activities.forEach((value, index)=>{this.activities[index] = UserBriefActivity.create(properties.activities[index]) as any})}
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "tss_hall_activityhub_v2_UserBriefActivity", "repeated")
    public activities?: UserBriefActivity[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public total?: number|null = 0
}
export interface ITaskConfig {
    task?: tss_common_task_ITask
    assets?: tss_common_IAssetItem[]
    awardAcceptConf?: tss_common_IAwardAcceptConf
    isRewardEnabled?: boolean|null
}
@protobuf.Type.d("tss_hall_activityhub_v2_TaskConfig")
export class TaskConfig extends protobuf.Message<ITaskConfig> {
    constructor(properties: Properties<ITaskConfig>) {
        super(properties);
        if (properties) {
            if (properties.task) { this.task = tss_common_task_Task.create(properties.task) as any }
            if (properties.assets) { this.assets = []; properties.assets.forEach((value, index)=>{this.assets[index] = tss_common_AssetItem.create(properties.assets[index]) as any})}
            if (properties.awardAcceptConf) { this.awardAcceptConf = tss_common_AwardAcceptConf.create(properties.awardAcceptConf) as any }
            if (properties.isRewardEnabled) { this.isRewardEnabled = properties.isRewardEnabled }
        }
	}
    @protobuf.Field.d(1, "tss_common_task_Task", "optional")
    public task?: tss_common_task_Task|null
    @protobuf.Field.d(2, "tss_common_AssetItem", "repeated")
    public assets?: tss_common_AssetItem[] = []
    @protobuf.Field.d(3, "tss_common_AwardAcceptConf", "optional")
    public awardAcceptConf?: tss_common_AwardAcceptConf|null
    @protobuf.Field.d(4, "bool", "optional", false)
    public isRewardEnabled?: boolean|null = false
}
export interface IAnnouncementConfig {
    showInDownloadPage?: tss_common_SwitchState|null
    title?: string|null
    content?: string|null
    contentType?: ContentType|null
}
@protobuf.Type.d("tss_hall_activityhub_v2_AnnouncementConfig")
export class AnnouncementConfig extends protobuf.Message<IAnnouncementConfig> {
    constructor(properties: Properties<IAnnouncementConfig>) {
        super(properties);
        if (properties) {
            if (properties.showInDownloadPage) { this.showInDownloadPage = properties.showInDownloadPage }
            if (properties.title) { this.title = properties.title }
            if (properties.content) { this.content = properties.content }
            if (properties.contentType) { this.contentType = properties.contentType }
        }
	}
    @protobuf.Field.d(1, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public showInDownloadPage?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
    @protobuf.Field.d(2, "string", "optional", )
    public title?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public content?: string|null = ""
    @protobuf.Field.d(4, ContentType, "optional", ContentType.Text)
    public contentType?: ContentType|null = ContentType.Text
}
export interface IPopularizeConfig {
    content?: string|null
    contentType?: ContentType|null
}
@protobuf.Type.d("tss_hall_activityhub_v2_PopularizeConfig")
export class PopularizeConfig extends protobuf.Message<IPopularizeConfig> {
    constructor(properties: Properties<IPopularizeConfig>) {
        super(properties);
        if (properties) {
            if (properties.content) { this.content = properties.content }
            if (properties.contentType) { this.contentType = properties.contentType }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public content?: string|null = ""
    @protobuf.Field.d(2, ContentType, "optional", ContentType.Text)
    public contentType?: ContentType|null = ContentType.Text
}
export interface IAcceptTaskAwardReq {
    uid?: number|null
    activityId?: number|null
}
@protobuf.Type.d("tss_hall_activityhub_v2_AcceptTaskAwardReq")
export class AcceptTaskAwardReq extends protobuf.Message<IAcceptTaskAwardReq> {
    constructor(properties: Properties<IAcceptTaskAwardReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.activityId) { this.activityId = properties.activityId }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public activityId?: number|null = 0
}
export interface IAcceptTaskAwardResp {
    assets?: tss_common_IAssetItem[]
}
@protobuf.Type.d("tss_hall_activityhub_v2_AcceptTaskAwardResp")
export class AcceptTaskAwardResp extends protobuf.Message<IAcceptTaskAwardResp> {
    constructor(properties: Properties<IAcceptTaskAwardResp>) {
        super(properties);
        if (properties) {
            if (properties.assets) { this.assets = []; properties.assets.forEach((value, index)=>{this.assets[index] = tss_common_AssetItem.create(properties.assets[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_common_AssetItem", "repeated")
    public assets?: tss_common_AssetItem[] = []
}
export interface IGetUserActivityReq {
    activityId?: number|null
}
@protobuf.Type.d("tss_hall_activityhub_v2_GetUserActivityReq")
export class GetUserActivityReq extends protobuf.Message<IGetUserActivityReq> {
    constructor(properties: Properties<IGetUserActivityReq>) {
        super(properties);
        if (properties) {
            if (properties.activityId) { this.activityId = properties.activityId }
        }
	}
    @protobuf.Field.d(2, "int64", "optional", 0)
    public activityId?: number|null = 0
}
export interface IGetUserActivityByTypeReq {
    activityType?: tss_hall_common_ActivityType|null
}
@protobuf.Type.d("tss_hall_activityhub_v2_GetUserActivityByTypeReq")
export class GetUserActivityByTypeReq extends protobuf.Message<IGetUserActivityByTypeReq> {
    constructor(properties: Properties<IGetUserActivityByTypeReq>) {
        super(properties);
        if (properties) {
            if (properties.activityType) { this.activityType = properties.activityType }
        }
	}
    @protobuf.Field.d(1, tss_hall_common_ActivityType, "optional", tss_hall_common_ActivityType.ActivityTypeUnknown)
    public activityType?: tss_hall_common_ActivityType|null = tss_hall_common_ActivityType.ActivityTypeUnknown
}
export interface IGetUserActivityResp {
    activity?: IActivity
    task?: IUserTask
}
@protobuf.Type.d("tss_hall_activityhub_v2_GetUserActivityResp")
export class GetUserActivityResp extends protobuf.Message<IGetUserActivityResp> {
    constructor(properties: Properties<IGetUserActivityResp>) {
        super(properties);
        if (properties) {
            if (properties.activity) { this.activity = Activity.create(properties.activity) as any }
            if (properties.task) { this.task = UserTask.create(properties.task) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_activityhub_v2_Activity", "optional")
    public activity?: Activity|null
    @protobuf.Field.d(2, "tss_hall_activityhub_v2_UserTask", "optional")
    public task?: UserTask|null
}
export interface IGetUserActivityByTypeResp {
    activity?: IActivity
    task?: IUserTask
}
@protobuf.Type.d("tss_hall_activityhub_v2_GetUserActivityByTypeResp")
export class GetUserActivityByTypeResp extends protobuf.Message<IGetUserActivityByTypeResp> {
    constructor(properties: Properties<IGetUserActivityByTypeResp>) {
        super(properties);
        if (properties) {
            if (properties.activity) { this.activity = Activity.create(properties.activity) as any }
            if (properties.task) { this.task = UserTask.create(properties.task) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_activityhub_v2_Activity", "optional")
    public activity?: Activity|null
    @protobuf.Field.d(2, "tss_hall_activityhub_v2_UserTask", "optional")
    public task?: UserTask|null
}
export interface IGetAnnouncementResp {
    IsOpen?: boolean|null
    Title?: string|null
    Content?: string|null
}
@protobuf.Type.d("tss_hall_activityhub_v2_GetAnnouncementResp")
export class GetAnnouncementResp extends protobuf.Message<IGetAnnouncementResp> {
    constructor(properties: Properties<IGetAnnouncementResp>) {
        super(properties);
        if (properties) {
            if (properties.IsOpen) { this.IsOpen = properties.IsOpen }
            if (properties.Title) { this.Title = properties.Title }
            if (properties.Content) { this.Content = properties.Content }
        }
	}
    @protobuf.Field.d(1, "bool", "optional", false)
    public IsOpen?: boolean|null = false
    @protobuf.Field.d(2, "string", "optional", )
    public Title?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public Content?: string|null = ""
}
class $ActivityHub extends RpcService {
    async SaveActivity(req: ISaveActivityReq, params?: RpcParams) : Promise<{err:number, resp:ISaveActivityResp}> {
        let data = SaveActivityReq.create(req)
        this.onBeforeReq("SaveActivity", data, params)
        const buffer = SaveActivityReq.encode(data).finish()
        let [err, pack] = await this.call("SaveActivity", buffer, params)
        if (err) {
            this.onBeforeResp("SaveActivity", err)
            return {err: err, resp: null}
        } else {
            let resp = SaveActivityResp.decode(pack) as any
            this.onBeforeResp("SaveActivity", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetActivity(req: IGetActivityReq, params?: RpcParams) : Promise<{err:number, resp:IGetActivityResp}> {
        let data = GetActivityReq.create(req)
        this.onBeforeReq("GetActivity", data, params)
        const buffer = GetActivityReq.encode(data).finish()
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
    async DeleteActivity(req: IDeleteActivityReq, params?: RpcParams) : Promise<{err:number, resp:IDeleteActivityResp}> {
        let data = DeleteActivityReq.create(req)
        this.onBeforeReq("DeleteActivity", data, params)
        const buffer = DeleteActivityReq.encode(data).finish()
        let [err, pack] = await this.call("DeleteActivity", buffer, params)
        if (err) {
            this.onBeforeResp("DeleteActivity", err)
            return {err: err, resp: null}
        } else {
            let resp = DeleteActivityResp.decode(pack) as any
            this.onBeforeResp("DeleteActivity", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListActivity(req: IListActivityReq, params?: RpcParams) : Promise<{err:number, resp:IListActivityResp}> {
        let data = ListActivityReq.create(req)
        this.onBeforeReq("ListActivity", data, params)
        const buffer = ListActivityReq.encode(data).finish()
        let [err, pack] = await this.call("ListActivity", buffer, params)
        if (err) {
            this.onBeforeResp("ListActivity", err)
            return {err: err, resp: null}
        } else {
            let resp = ListActivityResp.decode(pack) as any
            this.onBeforeResp("ListActivity", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetActivity(req: IBatchGetActivityReq, params?: RpcParams) : Promise<{err:number, resp:IBatchGetActivityResp}> {
        let data = BatchGetActivityReq.create(req)
        this.onBeforeReq("BatchGetActivity", data, params)
        const buffer = BatchGetActivityReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetActivity", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetActivity", err)
            return {err: err, resp: null}
        } else {
            let resp = BatchGetActivityResp.decode(pack) as any
            this.onBeforeResp("BatchGetActivity", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchUpdatePriority(req: IBatchUpdatePriorityReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = BatchUpdatePriorityReq.create(req)
        this.onBeforeReq("BatchUpdatePriority", data, params)
        const buffer = BatchUpdatePriorityReq.encode(data).finish()
        let [err, pack] = await this.call("BatchUpdatePriority", buffer, params)
        if (err) {
            this.onBeforeResp("BatchUpdatePriority", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("BatchUpdatePriority", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListUserBriefActivity(req: IListUserBriefActivityReq, params?: RpcParams) : Promise<{err:number, resp:IListUserBriefActivityResp}> {
        let data = ListUserBriefActivityReq.create(req)
        this.onBeforeReq("ListUserBriefActivity", data, params)
        const buffer = ListUserBriefActivityReq.encode(data).finish()
        let [err, pack] = await this.call("ListUserBriefActivity", buffer, params)
        if (err) {
            this.onBeforeResp("ListUserBriefActivity", err)
            return {err: err, resp: null}
        } else {
            let resp = ListUserBriefActivityResp.decode(pack) as any
            this.onBeforeResp("ListUserBriefActivity", err, resp)
            return {err: null, resp: resp}
        }
    }
    async AcceptAward(req: IAcceptTaskAwardReq, params?: RpcParams) : Promise<{err:number, resp:IAcceptTaskAwardResp}> {
        let data = AcceptTaskAwardReq.create(req)
        this.onBeforeReq("AcceptAward", data, params)
        const buffer = AcceptTaskAwardReq.encode(data).finish()
        let [err, pack] = await this.call("AcceptAward", buffer, params)
        if (err) {
            this.onBeforeResp("AcceptAward", err)
            return {err: err, resp: null}
        } else {
            let resp = AcceptTaskAwardResp.decode(pack) as any
            this.onBeforeResp("AcceptAward", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetUserActivity(req: IGetUserActivityReq, params?: RpcParams) : Promise<{err:number, resp:IGetUserActivityResp}> {
        let data = GetUserActivityReq.create(req)
        this.onBeforeReq("GetUserActivity", data, params)
        const buffer = GetUserActivityReq.encode(data).finish()
        let [err, pack] = await this.call("GetUserActivity", buffer, params)
        if (err) {
            this.onBeforeResp("GetUserActivity", err)
            return {err: err, resp: null}
        } else {
            let resp = GetUserActivityResp.decode(pack) as any
            this.onBeforeResp("GetUserActivity", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetUserActivityByType(req: IGetUserActivityByTypeReq, params?: RpcParams) : Promise<{err:number, resp:IGetUserActivityByTypeResp}> {
        let data = GetUserActivityByTypeReq.create(req)
        this.onBeforeReq("GetUserActivityByType", data, params)
        const buffer = GetUserActivityByTypeReq.encode(data).finish()
        let [err, pack] = await this.call("GetUserActivityByType", buffer, params)
        if (err) {
            this.onBeforeResp("GetUserActivityByType", err)
            return {err: err, resp: null}
        } else {
            let resp = GetUserActivityByTypeResp.decode(pack) as any
            this.onBeforeResp("GetUserActivityByType", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetActivityForSync(req: base_IBatchGetResourceReq, params?: RpcParams) : Promise<{err:number, resp:base_IBatchGetResourceResp}> {
        let data = base_BatchGetResourceReq.create(req)
        this.onBeforeReq("BatchGetActivityForSync", data, params)
        const buffer = base_BatchGetResourceReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetActivityForSync", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetActivityForSync", err)
            return {err: err, resp: null}
        } else {
            let resp = base_BatchGetResourceResp.decode(pack) as any
            this.onBeforeResp("BatchGetActivityForSync", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetBadge(req: tss_hall_common_IBatchGetBadgeReq, params?: RpcParams) : Promise<{err:number, resp:tss_hall_common_IBatchGetBadgeResp}> {
        let data = tss_hall_common_BatchGetBadgeReq.create(req)
        this.onBeforeReq("BatchGetBadge", data, params)
        const buffer = tss_hall_common_BatchGetBadgeReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetBadge", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetBadge", err)
            return {err: err, resp: null}
        } else {
            let resp = tss_hall_common_BatchGetBadgeResp.decode(pack) as any
            this.onBeforeResp("BatchGetBadge", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListUserActivityBadge(req: tss_hall_common_IListUserActivityBadgeReq, params?: RpcParams) : Promise<{err:number, resp:tss_hall_common_IListUserActivityBadgeResp}> {
        let data = tss_hall_common_ListUserActivityBadgeReq.create(req)
        this.onBeforeReq("ListUserActivityBadge", data, params)
        const buffer = tss_hall_common_ListUserActivityBadgeReq.encode(data).finish()
        let [err, pack] = await this.call("ListUserActivityBadge", buffer, params)
        if (err) {
            this.onBeforeResp("ListUserActivityBadge", err)
            return {err: err, resp: null}
        } else {
            let resp = tss_hall_common_ListUserActivityBadgeResp.decode(pack) as any
            this.onBeforeResp("ListUserActivityBadge", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetAnnouncement(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:IGetAnnouncementResp}> {
        let data = base_Void.create(req)
        this.onBeforeReq("GetAnnouncement", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("GetAnnouncement", buffer, params)
        if (err) {
            this.onBeforeResp("GetAnnouncement", err)
            return {err: err, resp: null}
        } else {
            let resp = GetAnnouncementResp.decode(pack) as any
            this.onBeforeResp("GetAnnouncement", err, resp)
            return {err: null, resp: resp}
        }
    }
}
export const ActivityHub = new $ActivityHub({
    name: "tss.hall.activityhub.v2",
})
import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  AssetItem as tss_common_AssetItem,IAssetItem as tss_common_IAssetItem ,  State as tss_common_State ,  AwardAcceptConf as tss_common_AwardAcceptConf,IAwardAcceptConf as tss_common_IAwardAcceptConf ,  } from "idl/tss/common/common_define"
export enum TargetUser {  
    TargetUserUnknown = 0,  
    TargetUserAll = 1,  
    TargetUserVip = 2,  
    TargetUserNewUser = 3,  
    TargetUserTourist = 4,  
    TargetUserOldUser = 5,  
    TargetUserBackUser = 6,  
    TargetUserNotCertification = 7,  
    TargetUserNotVip = 8,
}
export enum GetTaskType {  
    GetTaskTypeUnknown = 0,  
    GetTaskTypeAuto = 1,  
    GetTaskTypeManually = 2,
}
export enum TaskTimeType {  
    TaskTimeTypeUnknown = 0,  
    TaskTimeTypeAll = 1,  
    TaskTimeTypeTimeFrame = 2,  
    TaskTimeTypeWeekday = 3,
}
export enum TaskEffectType {  
    TaskEffectTypeUnknown = 0,  
    TaskEffectTypeUnlimited = 1,  
    TaskEffectTypeLimited = 2,
}
export enum TaskPeriodType {  
    TaskPeriodTypeUnknown = 0,  
    TaskPeriodTypeUnlimited = 1,  
    TaskPeriodTypeDay = 2,  
    TaskPeriodTypeWeek = 3,  
    TaskPeriodTypeMonth = 4,  
    TaskPeriodTypeExternal = 5,  
    TaskPeriodTypeQuarter = 6,  
    TaskPeriodTypeYear = 7,  
    TaskPeriodTypeTuesday = 8,  
    TaskPeriodTypeWednesday = 9,  
    TaskPeriodTypeThursday = 10,  
    TaskPeriodTypeFriday = 11,  
    TaskPeriodTypeSaturday = 12,  
    TaskPeriodTypeSunday = 13,
}
export enum CalcStrategy {  
    CalcStrategyUnknown = 0,  
    CalcStrategyContinuous = 1,  
    CalcStrategyAccumulation = 2,  
    CalcStrategyTimesCA = 3,  
    CalcStrategyResetEachTime = 4,  
    CalcStrategyHistoryGreatestTimeTimesCA = 5,  
    CalcStrategyGrossValue = 6,
}
export enum PublishStatus {  
    PublishStatusUnknown = 0,  
    PublishStatusDraft = 1,  
    PublishStatusOnline = 2,  
    PublishStatusOffline = 3,  
    PublishStatusPublished = 4,
}
export enum TaskStatus {  
    TaskStatusUnknown = 0,  
    TaskStatusDoing = 1,  
    TaskStatusDone = 2,
}
export enum TaskAwardAcceptStatus {  
    TaskAwardAcceptStatusUnknown = 0,  
    TaskAwardAcceptStatusAccepted = 1,  
    TaskAwardAcceptStatusUnAccept = 2,  
    TaskAwardAcceptStatusNotMetCondition = 3,
}
export enum BadgeCalcCondition {  
    BadgeCalcDefault = 0,  
    BadgeCalcCanDoTask = 1,
}
export interface IPublish {
    onlineTime?: number|null
    offlineTime?: number|null
    status?: PublishStatus|null
}
@protobuf.Type.d("tss_common_task_Publish")
export class Publish extends protobuf.Message<IPublish> {
    constructor(properties: Properties<IPublish>) {
        super(properties);
        if (properties) {
            if (properties.onlineTime) { this.onlineTime = properties.onlineTime }
            if (properties.offlineTime) { this.offlineTime = properties.offlineTime }
            if (properties.status) { this.status = properties.status }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public onlineTime?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public offlineTime?: number|null = 0
    @protobuf.Field.d(3, PublishStatus, "optional", PublishStatus.PublishStatusUnknown)
    public status?: PublishStatus|null = PublishStatus.PublishStatusUnknown
}
export interface ICustomValue {
    topic?: string|null
    val?: number|null
    img?: string|null
}
@protobuf.Type.d("tss_common_task_CustomValue")
export class CustomValue extends protobuf.Message<ICustomValue> {
    constructor(properties: Properties<ICustomValue>) {
        super(properties);
        if (properties) {
            if (properties.topic) { this.topic = properties.topic }
            if (properties.val) { this.val = properties.val }
            if (properties.img) { this.img = properties.img }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public topic?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public val?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public img?: string|null = ""
}
export interface ITaskRewardItem {
    id?: number|null
    assetItems?: tss_common_IAssetItem[]
    customValues?: ICustomValue[]
}
@protobuf.Type.d("tss_common_task_TaskRewardItem")
export class TaskRewardItem extends protobuf.Message<ITaskRewardItem> {
    constructor(properties: Properties<ITaskRewardItem>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.assetItems) { this.assetItems = []; properties.assetItems.forEach((value, index)=>{this.assetItems[index] = tss_common_AssetItem.create(properties.assetItems[index]) as any})}
            if (properties.customValues) { this.customValues = []; properties.customValues.forEach((value, index)=>{this.customValues[index] = CustomValue.create(properties.customValues[index]) as any})}
        }
	}
    @protobuf.Field.d(3, "int64", "optional", 0)
    public id?: number|null = 0
    @protobuf.Field.d(1, "tss_common_AssetItem", "repeated")
    public assetItems?: tss_common_AssetItem[] = []
    @protobuf.Field.d(2, "tss_common_task_CustomValue", "repeated")
    public customValues?: CustomValue[] = []
}
export interface ITask {
    taskID?: number|null
    taskName?: string|null
    desc?: string|null
    icon?: string|null
    targetUser?: TargetUser|null
    getTaskType?: GetTaskType|null
    taskTimeType?: TaskTimeType|null
    weekdays?: number[]
    relativeStartAt?: number|null
    relativeEndAt?: number|null
    taskEffectType?: TaskEffectType|null
    effectDuration?: number|null
    eventTopic?: string|null
    targetPerCycle?: number|null
    url?: string|null
    periodType?: TaskPeriodType|null
    periodCnt?: number|null
    cycleCntPerPeriod?: number|null
    calcStrategy?: CalcStrategy|null
    operator?: string|null
    updateAt?: number|null
    publish?: IPublish
    isPush?: boolean|null
    checksum?: string|null
    topicID?: number|null
    appURL?: string|null
    rewardItems?: ITaskRewardItem
    multiSelectRewardItems?: ITaskRewardItem[]
    robotTask?: boolean|null
    badgeCalcCondition?: BadgeCalcCondition|null
    state?: tss_common_State|null
    seq?: number|null
    awardAcceptconf?: tss_common_IAwardAcceptConf
    sort?: number|null
}
@protobuf.Type.d("tss_common_task_Task")
export class Task extends protobuf.Message<ITask> {
    constructor(properties: Properties<ITask>) {
        super(properties);
        if (properties) {
            if (properties.taskID) { this.taskID = properties.taskID }
            if (properties.taskName) { this.taskName = properties.taskName }
            if (properties.desc) { this.desc = properties.desc }
            if (properties.icon) { this.icon = properties.icon }
            if (properties.targetUser) { this.targetUser = properties.targetUser }
            if (properties.getTaskType) { this.getTaskType = properties.getTaskType }
            if (properties.taskTimeType) { this.taskTimeType = properties.taskTimeType }
            if (properties.weekdays) { this.weekdays = []; properties.weekdays.forEach((value, index)=>{this.weekdays[index] = properties.weekdays[index]})}
            if (properties.relativeStartAt) { this.relativeStartAt = properties.relativeStartAt }
            if (properties.relativeEndAt) { this.relativeEndAt = properties.relativeEndAt }
            if (properties.taskEffectType) { this.taskEffectType = properties.taskEffectType }
            if (properties.effectDuration) { this.effectDuration = properties.effectDuration }
            if (properties.eventTopic) { this.eventTopic = properties.eventTopic }
            if (properties.targetPerCycle) { this.targetPerCycle = properties.targetPerCycle }
            if (properties.url) { this.url = properties.url }
            if (properties.periodType) { this.periodType = properties.periodType }
            if (properties.periodCnt) { this.periodCnt = properties.periodCnt }
            if (properties.cycleCntPerPeriod) { this.cycleCntPerPeriod = properties.cycleCntPerPeriod }
            if (properties.calcStrategy) { this.calcStrategy = properties.calcStrategy }
            if (properties.operator) { this.operator = properties.operator }
            if (properties.updateAt) { this.updateAt = properties.updateAt }
            if (properties.publish) { this.publish = Publish.create(properties.publish) as any }
            if (properties.isPush) { this.isPush = properties.isPush }
            if (properties.checksum) { this.checksum = properties.checksum }
            if (properties.topicID) { this.topicID = properties.topicID }
            if (properties.appURL) { this.appURL = properties.appURL }
            if (properties.rewardItems) { this.rewardItems = TaskRewardItem.create(properties.rewardItems) as any }
            if (properties.multiSelectRewardItems) { this.multiSelectRewardItems = []; properties.multiSelectRewardItems.forEach((value, index)=>{this.multiSelectRewardItems[index] = TaskRewardItem.create(properties.multiSelectRewardItems[index]) as any})}
            if (properties.robotTask) { this.robotTask = properties.robotTask }
            if (properties.badgeCalcCondition) { this.badgeCalcCondition = properties.badgeCalcCondition }
            if (properties.state) { this.state = properties.state }
            if (properties.seq) { this.seq = properties.seq }
            if (properties.awardAcceptconf) { this.awardAcceptconf = tss_common_AwardAcceptConf.create(properties.awardAcceptconf) as any }
            if (properties.sort) { this.sort = properties.sort }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public taskID?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public taskName?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public desc?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public icon?: string|null = ""
    @protobuf.Field.d(5, TargetUser, "optional", TargetUser.TargetUserUnknown)
    public targetUser?: TargetUser|null = TargetUser.TargetUserUnknown
    @protobuf.Field.d(6, GetTaskType, "optional", GetTaskType.GetTaskTypeUnknown)
    public getTaskType?: GetTaskType|null = GetTaskType.GetTaskTypeUnknown
    @protobuf.Field.d(7, TaskTimeType, "optional", TaskTimeType.TaskTimeTypeUnknown)
    public taskTimeType?: TaskTimeType|null = TaskTimeType.TaskTimeTypeUnknown
    @protobuf.Field.d(8, "int32", "repeated", [])
    public weekdays?: number[] = []
    @protobuf.Field.d(9, "int64", "optional", 0)
    public relativeStartAt?: number|null = 0
    @protobuf.Field.d(10, "int64", "optional", 0)
    public relativeEndAt?: number|null = 0
    @protobuf.Field.d(11, TaskEffectType, "optional", TaskEffectType.TaskEffectTypeUnknown)
    public taskEffectType?: TaskEffectType|null = TaskEffectType.TaskEffectTypeUnknown
    @protobuf.Field.d(12, "int64", "optional", 0)
    public effectDuration?: number|null = 0
    @protobuf.Field.d(13, "string", "optional", )
    public eventTopic?: string|null = ""
    @protobuf.Field.d(14, "int64", "optional", 0)
    public targetPerCycle?: number|null = 0
    @protobuf.Field.d(15, "string", "optional", )
    public url?: string|null = ""
    @protobuf.Field.d(16, TaskPeriodType, "optional", TaskPeriodType.TaskPeriodTypeUnknown)
    public periodType?: TaskPeriodType|null = TaskPeriodType.TaskPeriodTypeUnknown
    @protobuf.Field.d(17, "int64", "optional", 0)
    public periodCnt?: number|null = 0
    @protobuf.Field.d(18, "int64", "optional", 0)
    public cycleCntPerPeriod?: number|null = 0
    @protobuf.Field.d(19, CalcStrategy, "optional", CalcStrategy.CalcStrategyUnknown)
    public calcStrategy?: CalcStrategy|null = CalcStrategy.CalcStrategyUnknown
    @protobuf.Field.d(20, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(21, "int64", "optional", 0)
    public updateAt?: number|null = 0
    @protobuf.Field.d(23, "tss_common_task_Publish", "optional")
    public publish?: Publish|null
    @protobuf.Field.d(24, "bool", "optional", false)
    public isPush?: boolean|null = false
    @protobuf.Field.d(25, "string", "optional", )
    public checksum?: string|null = ""
    @protobuf.Field.d(26, "int64", "optional", 0)
    public topicID?: number|null = 0
    @protobuf.Field.d(27, "string", "optional", )
    public appURL?: string|null = ""
    @protobuf.Field.d(28, "tss_common_task_TaskRewardItem", "optional")
    public rewardItems?: TaskRewardItem|null
    @protobuf.Field.d(35, "tss_common_task_TaskRewardItem", "repeated")
    public multiSelectRewardItems?: TaskRewardItem[] = []
    @protobuf.Field.d(29, "bool", "optional", false)
    public robotTask?: boolean|null = false
    @protobuf.Field.d(30, BadgeCalcCondition, "optional", BadgeCalcCondition.BadgeCalcDefault)
    public badgeCalcCondition?: BadgeCalcCondition|null = BadgeCalcCondition.BadgeCalcDefault
    @protobuf.Field.d(32, tss_common_State, "optional", tss_common_State.StateUnknown)
    public state?: tss_common_State|null = tss_common_State.StateUnknown
    @protobuf.Field.d(33, "int64", "optional", 0)
    public seq?: number|null = 0
    @protobuf.Field.d(34, "tss_common_AwardAcceptConf", "optional")
    public awardAcceptconf?: tss_common_AwardAcceptConf|null
    @protobuf.Field.d(36, "int64", "optional", 0)
    public sort?: number|null = 0
}
import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  SwitchState as tss_common_SwitchState ,  } from "idl/tss/common/common_define"
import {  TargetUser as tss_common_task_TargetUser ,  } from "idl/tss/common/common_task.v2"
export enum ActivityType {  
    ActivityTypeUnknown = 0,  
    ActivityTypeJump = 1,  
    ActivityTypeGeneralRank = 2,  
    ActivityTreviFountain = 3,  
    ActivityTypeAnnouncement = 4,  
    ActivityTypeScore = 5,  
    ActivitySingleTask = 6,  
    ActivityWeeklyMatch = 7,  
    ActivityNovice = 8,  
    ActivityLuckyBag = 9,  
    ActivityCollection = 10,  
    ActivityBankruptcyFirstCharge = 11,  
    ActivityFirstCharge = 12,  
    ActivityJigsaw = 13,  
    ActivityNoviceBenefit = 14,  
    ActivityLeague = 15,  
    ActivitySchedule = 16,  
    ActivityReturn = 17,  
    ActivityPopularize = 18,  
    ActivityServiceActive = 19,  
    ActivityPrizeDraw = 20,  
    ActivityInviteReward = 21,  
    ActivityRedBagRain = 22,  
    ActivityIdCardVerify = 23,  
    ActivityPopUpRecommended = 24,  
    ActivityGeneral = 50,  
    ActivityReturnV2 = 51,  
    ActivityPremierLeague = 52,  
    ActivityNoviceV2 = 53,
}
export enum FrequencyType {  
    FrequencyTypeUnknown = 0,  
    FrequencyTypeOncely = 1,  
    FrequencyTypeDaily = 2,  
    FrequencyTypeWeekly = 3,  
    FrequencyTypeMonthly = 4,
}
export enum PopUpContentType {  
    PopUpContentTypeUnknown = 0,  
    PopUpContentTypeImg = 1,  
    PopUpContentTypeText = 2,
}
export enum PopUpType {  
    PopUpTypeDefault = 0,  
    PopUpTypeCountDown = 1,
}
export enum ActivityTagType {  
    ActivityTagTypeUnknwon = 0,  
    ActivityTagTypeNew = 1,  
    ActivityTagTypeHot = 2,  
    ActivityTagTypeVip = 3,
}
export enum ActivityOnlineType {  
    ActivityOnlineTypeUnknwon = 0,  
    ActivityOnlineTypeOnline = 1,  
    ActivityOnlineTypeComingSoon = 2,  
    ActivityOnlineTypeOffline = 3,
}
export enum ExternalBadgeType {  
    ExternalBadgeNone = 0,  
    ExternalBadgeMonthlySignIn = 1,
}
export enum ActivityTab {  
    ActivityTabUnknown = 0,  
    ActivityTabAnnouncement = 1,  
    ActivityTabExcludeAnnouncement = 2,  
    ActivityTabBenefits = 3,
}
export enum AnnouncementContentType {  
    AnnouncementText = 0,  
    AnnouncementImage = 1,
}
export interface IPopUpConf {
    switch?: tss_common_SwitchState|null
    contentType?: PopUpContentType|null
    img?: string|null
    title?: string|null
    content?: string|null
    fType?: FrequencyType|null
    fValue?: number|null
    verSwitch?: tss_common_SwitchState|null
    verConf?: IPopUpConfWithVer[]
    countDownPopUpConf?: ICountDownPopUpConf
    popUpType?: PopUpType|null
    countDownPopUpConfV2?: ICountDownPopUpConfV2
}
@protobuf.Type.d("tss_hall_common_PopUpConf")
export class PopUpConf extends protobuf.Message<IPopUpConf> {
    constructor(properties: Properties<IPopUpConf>) {
        super(properties);
        if (properties) {
            if (properties.switch) { this.switch = properties.switch }
            if (properties.contentType) { this.contentType = properties.contentType }
            if (properties.img) { this.img = properties.img }
            if (properties.title) { this.title = properties.title }
            if (properties.content) { this.content = properties.content }
            if (properties.fType) { this.fType = properties.fType }
            if (properties.fValue) { this.fValue = properties.fValue }
            if (properties.verSwitch) { this.verSwitch = properties.verSwitch }
            if (properties.verConf) { this.verConf = []; properties.verConf.forEach((value, index)=>{this.verConf[index] = PopUpConfWithVer.create(properties.verConf[index]) as any})}
            if (properties.countDownPopUpConf) { this.countDownPopUpConf = CountDownPopUpConf.create(properties.countDownPopUpConf) as any }
            if (properties.popUpType) { this.popUpType = properties.popUpType }
            if (properties.countDownPopUpConfV2) { this.countDownPopUpConfV2 = CountDownPopUpConfV2.create(properties.countDownPopUpConfV2) as any }
        }
	}
    @protobuf.Field.d(1, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public switch?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
    @protobuf.Field.d(2, PopUpContentType, "optional", PopUpContentType.PopUpContentTypeUnknown)
    public contentType?: PopUpContentType|null = PopUpContentType.PopUpContentTypeUnknown
    @protobuf.Field.d(3, "string", "optional", )
    public img?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public title?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public content?: string|null = ""
    @protobuf.Field.d(6, FrequencyType, "optional", FrequencyType.FrequencyTypeUnknown)
    public fType?: FrequencyType|null = FrequencyType.FrequencyTypeUnknown
    @protobuf.Field.d(7, "int64", "optional", 0)
    public fValue?: number|null = 0
    @protobuf.Field.d(8, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public verSwitch?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
    @protobuf.Field.d(9, "tss_hall_common_PopUpConfWithVer", "repeated")
    public verConf?: PopUpConfWithVer[] = []
    @protobuf.Field.d(10, "tss_hall_common_CountDownPopUpConf", "optional")
    public countDownPopUpConf?: CountDownPopUpConf|null
    @protobuf.Field.d(11, PopUpType, "optional", PopUpType.PopUpTypeDefault)
    public popUpType?: PopUpType|null = PopUpType.PopUpTypeDefault
    @protobuf.Field.d(12, "tss_hall_common_CountDownPopUpConfV2", "optional")
    public countDownPopUpConfV2?: CountDownPopUpConfV2|null
}
export interface ILeftDayPopUpConf {
    leftDays?: number|null
    img?: string|null
    url?: string|null
}
@protobuf.Type.d("tss_hall_common_LeftDayPopUpConf")
export class LeftDayPopUpConf extends protobuf.Message<ILeftDayPopUpConf> {
    constructor(properties: Properties<ILeftDayPopUpConf>) {
        super(properties);
        if (properties) {
            if (properties.leftDays) { this.leftDays = properties.leftDays }
            if (properties.img) { this.img = properties.img }
            if (properties.url) { this.url = properties.url }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public leftDays?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public img?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public url?: string|null = ""
}
export interface IShortCutConfWithVer {
    Icon?: string|null
    WordIcon?: string|null
    animationSwitch?: tss_common_SwitchState|null
    minVersion?: number|null
    maxVersion?: number|null
}
@protobuf.Type.d("tss_hall_common_ShortCutConfWithVer")
export class ShortCutConfWithVer extends protobuf.Message<IShortCutConfWithVer> {
    constructor(properties: Properties<IShortCutConfWithVer>) {
        super(properties);
        if (properties) {
            if (properties.Icon) { this.Icon = properties.Icon }
            if (properties.WordIcon) { this.WordIcon = properties.WordIcon }
            if (properties.animationSwitch) { this.animationSwitch = properties.animationSwitch }
            if (properties.minVersion) { this.minVersion = properties.minVersion }
            if (properties.maxVersion) { this.maxVersion = properties.maxVersion }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public Icon?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public WordIcon?: string|null = ""
    @protobuf.Field.d(3, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public animationSwitch?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
    @protobuf.Field.d(4, "int64", "optional", 0)
    public minVersion?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public maxVersion?: number|null = 0
}
export interface IShortCutConf {
    switch?: tss_common_SwitchState|null
    Icon?: string|null
    WordIcon?: string|null
    animationSwitch?: tss_common_SwitchState|null
    verSwitch?: tss_common_SwitchState|null
    verConf?: IShortCutConfWithVer[]
}
@protobuf.Type.d("tss_hall_common_ShortCutConf")
export class ShortCutConf extends protobuf.Message<IShortCutConf> {
    constructor(properties: Properties<IShortCutConf>) {
        super(properties);
        if (properties) {
            if (properties.switch) { this.switch = properties.switch }
            if (properties.Icon) { this.Icon = properties.Icon }
            if (properties.WordIcon) { this.WordIcon = properties.WordIcon }
            if (properties.animationSwitch) { this.animationSwitch = properties.animationSwitch }
            if (properties.verSwitch) { this.verSwitch = properties.verSwitch }
            if (properties.verConf) { this.verConf = []; properties.verConf.forEach((value, index)=>{this.verConf[index] = ShortCutConfWithVer.create(properties.verConf[index]) as any})}
        }
	}
    @protobuf.Field.d(1, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public switch?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
    @protobuf.Field.d(2, "string", "optional", )
    public Icon?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public WordIcon?: string|null = ""
    @protobuf.Field.d(4, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public animationSwitch?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
    @protobuf.Field.d(5, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public verSwitch?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
    @protobuf.Field.d(6, "tss_hall_common_ShortCutConfWithVer", "repeated")
    public verConf?: ShortCutConfWithVer[] = []
}
export interface IListViewConfWithVer {
    img?: string|null
    minVersion?: number|null
    maxVersion?: number|null
}
@protobuf.Type.d("tss_hall_common_ListViewConfWithVer")
export class ListViewConfWithVer extends protobuf.Message<IListViewConfWithVer> {
    constructor(properties: Properties<IListViewConfWithVer>) {
        super(properties);
        if (properties) {
            if (properties.img) { this.img = properties.img }
            if (properties.minVersion) { this.minVersion = properties.minVersion }
            if (properties.maxVersion) { this.maxVersion = properties.maxVersion }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public img?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public minVersion?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public maxVersion?: number|null = 0
}
export interface IListViewConf {
    switch?: tss_common_SwitchState|null
    img?: string|null
    verSwitch?: tss_common_SwitchState|null
    verConf?: IListViewConfWithVer[]
}
@protobuf.Type.d("tss_hall_common_ListViewConf")
export class ListViewConf extends protobuf.Message<IListViewConf> {
    constructor(properties: Properties<IListViewConf>) {
        super(properties);
        if (properties) {
            if (properties.switch) { this.switch = properties.switch }
            if (properties.img) { this.img = properties.img }
            if (properties.verSwitch) { this.verSwitch = properties.verSwitch }
            if (properties.verConf) { this.verConf = []; properties.verConf.forEach((value, index)=>{this.verConf[index] = ListViewConfWithVer.create(properties.verConf[index]) as any})}
        }
	}
    @protobuf.Field.d(1, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public switch?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
    @protobuf.Field.d(2, "string", "optional", )
    public img?: string|null = ""
    @protobuf.Field.d(3, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public verSwitch?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
    @protobuf.Field.d(4, "tss_hall_common_ListViewConfWithVer", "repeated")
    public verConf?: ListViewConfWithVer[] = []
}
export interface IActivityPriority {
    id?: number|null
    priority?: number|null
}
@protobuf.Type.d("tss_hall_common_ActivityPriority")
export class ActivityPriority extends protobuf.Message<IActivityPriority> {
    constructor(properties: Properties<IActivityPriority>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.priority) { this.priority = properties.priority }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public id?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public priority?: number|null = 0
}
export interface IAnnouncementConfig {
    showInDownloadPage?: tss_common_SwitchState|null
    title?: string|null
    content?: string|null
    contentType?: AnnouncementContentType|null
    imgs?: string[]
    switch?: tss_common_SwitchState|null
}
@protobuf.Type.d("tss_hall_common_AnnouncementConfig")
export class AnnouncementConfig extends protobuf.Message<IAnnouncementConfig> {
    constructor(properties: Properties<IAnnouncementConfig>) {
        super(properties);
        if (properties) {
            if (properties.showInDownloadPage) { this.showInDownloadPage = properties.showInDownloadPage }
            if (properties.title) { this.title = properties.title }
            if (properties.content) { this.content = properties.content }
            if (properties.contentType) { this.contentType = properties.contentType }
            if (properties.imgs) { this.imgs = []; properties.imgs.forEach((value, index)=>{this.imgs[index] = properties.imgs[index]})}
            if (properties.switch) { this.switch = properties.switch }
        }
	}
    @protobuf.Field.d(1, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public showInDownloadPage?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
    @protobuf.Field.d(2, "string", "optional", )
    public title?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public content?: string|null = ""
    @protobuf.Field.d(4, AnnouncementContentType, "optional", AnnouncementContentType.AnnouncementText)
    public contentType?: AnnouncementContentType|null = AnnouncementContentType.AnnouncementText
    @protobuf.Field.d(5, "string", "repeated", [])
    public imgs?: string[] = []
    @protobuf.Field.d(6, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public switch?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
}
export interface ICountDownPopUpConfV2 {
    beginAt?: number|null
    periodLength?: number|null
    items?: ILeftDayPopUpConf[]
}
@protobuf.Type.d("tss_hall_common_CountDownPopUpConfV2")
export class CountDownPopUpConfV2 extends protobuf.Message<ICountDownPopUpConfV2> {
    constructor(properties: Properties<ICountDownPopUpConfV2>) {
        super(properties);
        if (properties) {
            if (properties.beginAt) { this.beginAt = properties.beginAt }
            if (properties.periodLength) { this.periodLength = properties.periodLength }
            if (properties.items) { this.items = []; properties.items.forEach((value, index)=>{this.items[index] = LeftDayPopUpConf.create(properties.items[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public beginAt?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public periodLength?: number|null = 0
    @protobuf.Field.d(3, "tss_hall_common_LeftDayPopUpConf", "repeated")
    public items?: LeftDayPopUpConf[] = []
}
export interface ICountDownPopUpConf {
    switch?: tss_common_SwitchState|null
    items?: ILeftDayPopUpConf[]
}
@protobuf.Type.d("tss_hall_common_CountDownPopUpConf")
export class CountDownPopUpConf extends protobuf.Message<ICountDownPopUpConf> {
    constructor(properties: Properties<ICountDownPopUpConf>) {
        super(properties);
        if (properties) {
            if (properties.switch) { this.switch = properties.switch }
            if (properties.items) { this.items = []; properties.items.forEach((value, index)=>{this.items[index] = LeftDayPopUpConf.create(properties.items[index]) as any})}
        }
	}
    @protobuf.Field.d(1, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public switch?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
    @protobuf.Field.d(2, "tss_hall_common_LeftDayPopUpConf", "repeated")
    public items?: LeftDayPopUpConf[] = []
}
export interface IPopUpConfWithVer {
    contentType?: PopUpContentType|null
    img?: string|null
    title?: string|null
    content?: string|null
    fType?: FrequencyType|null
    fValue?: number|null
    minVersion?: number|null
    maxVersion?: number|null
    countDownPopUpConf?: ICountDownPopUpConf
    countDownPopUpConfV2?: ICountDownPopUpConfV2
}
@protobuf.Type.d("tss_hall_common_PopUpConfWithVer")
export class PopUpConfWithVer extends protobuf.Message<IPopUpConfWithVer> {
    constructor(properties: Properties<IPopUpConfWithVer>) {
        super(properties);
        if (properties) {
            if (properties.contentType) { this.contentType = properties.contentType }
            if (properties.img) { this.img = properties.img }
            if (properties.title) { this.title = properties.title }
            if (properties.content) { this.content = properties.content }
            if (properties.fType) { this.fType = properties.fType }
            if (properties.fValue) { this.fValue = properties.fValue }
            if (properties.minVersion) { this.minVersion = properties.minVersion }
            if (properties.maxVersion) { this.maxVersion = properties.maxVersion }
            if (properties.countDownPopUpConf) { this.countDownPopUpConf = CountDownPopUpConf.create(properties.countDownPopUpConf) as any }
            if (properties.countDownPopUpConfV2) { this.countDownPopUpConfV2 = CountDownPopUpConfV2.create(properties.countDownPopUpConfV2) as any }
        }
	}
    @protobuf.Field.d(1, PopUpContentType, "optional", PopUpContentType.PopUpContentTypeUnknown)
    public contentType?: PopUpContentType|null = PopUpContentType.PopUpContentTypeUnknown
    @protobuf.Field.d(2, "string", "optional", )
    public img?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public title?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public content?: string|null = ""
    @protobuf.Field.d(5, FrequencyType, "optional", FrequencyType.FrequencyTypeUnknown)
    public fType?: FrequencyType|null = FrequencyType.FrequencyTypeUnknown
    @protobuf.Field.d(6, "int64", "optional", 0)
    public fValue?: number|null = 0
    @protobuf.Field.d(7, "int64", "optional", 0)
    public minVersion?: number|null = 0
    @protobuf.Field.d(8, "int64", "optional", 0)
    public maxVersion?: number|null = 0
    @protobuf.Field.d(9, "tss_hall_common_CountDownPopUpConf", "optional")
    public countDownPopUpConf?: CountDownPopUpConf|null
    @protobuf.Field.d(10, "tss_hall_common_CountDownPopUpConfV2", "optional")
    public countDownPopUpConfV2?: CountDownPopUpConfV2|null
}
export interface IActivityBase {
    name?: string|null
    applicationId?: string|null
    effectAt?: number|null
    expireAt?: number|null
    listView?: IListViewConf
    popup?: IPopUpConf
    shortCut?: IShortCutConf
    type?: ActivityType|null
    target?: tss_common_task_TargetUser[]
    URI?: string|null
    onlineAt?: number|null
    offlineAt?: number|null
    priority?: number|null
    ruleDesc?: string|null
    viewTmplURL?: string|null
    operator?: string|null
    createAt?: number|null
    updateAt?: number|null
    maxVersion?: number|null
    minVersion?: number|null
    tagType?: ActivityTagType|null
    newActivityBadge?: tss_common_SwitchState|null
    appId?: string[]
    netView?: string|null
    appURL?: string|null
    content?: Uint8Array
    userGroupIDs?: string[]
    activityTab?: ActivityTab|null
    resourceId?: number|null
    externalBadgeType?: ExternalBadgeType|null
    announcement?: IAnnouncementConfig
}
@protobuf.Type.d("tss_hall_common_ActivityBase")
export class ActivityBase extends protobuf.Message<IActivityBase> {
    constructor(properties: Properties<IActivityBase>) {
        super(properties);
        if (properties) {
            if (properties.name) { this.name = properties.name }
            if (properties.applicationId) { this.applicationId = properties.applicationId }
            if (properties.effectAt) { this.effectAt = properties.effectAt }
            if (properties.expireAt) { this.expireAt = properties.expireAt }
            if (properties.listView) { this.listView = ListViewConf.create(properties.listView) as any }
            if (properties.popup) { this.popup = PopUpConf.create(properties.popup) as any }
            if (properties.shortCut) { this.shortCut = ShortCutConf.create(properties.shortCut) as any }
            if (properties.type) { this.type = properties.type }
            if (properties.target) { this.target = []; properties.target.forEach((value, index)=>{this.target[index] = properties.target[index]})}
            if (properties.URI) { this.URI = properties.URI }
            if (properties.onlineAt) { this.onlineAt = properties.onlineAt }
            if (properties.offlineAt) { this.offlineAt = properties.offlineAt }
            if (properties.priority) { this.priority = properties.priority }
            if (properties.ruleDesc) { this.ruleDesc = properties.ruleDesc }
            if (properties.viewTmplURL) { this.viewTmplURL = properties.viewTmplURL }
            if (properties.operator) { this.operator = properties.operator }
            if (properties.createAt) { this.createAt = properties.createAt }
            if (properties.updateAt) { this.updateAt = properties.updateAt }
            if (properties.maxVersion) { this.maxVersion = properties.maxVersion }
            if (properties.minVersion) { this.minVersion = properties.minVersion }
            if (properties.tagType) { this.tagType = properties.tagType }
            if (properties.newActivityBadge) { this.newActivityBadge = properties.newActivityBadge }
            if (properties.appId) { this.appId = []; properties.appId.forEach((value, index)=>{this.appId[index] = properties.appId[index]})}
            if (properties.netView) { this.netView = properties.netView }
            if (properties.appURL) { this.appURL = properties.appURL }
            if (properties.content) { this.content = properties.content }
            if (properties.userGroupIDs) { this.userGroupIDs = []; properties.userGroupIDs.forEach((value, index)=>{this.userGroupIDs[index] = properties.userGroupIDs[index]})}
            if (properties.activityTab) { this.activityTab = properties.activityTab }
            if (properties.resourceId) { this.resourceId = properties.resourceId }
            if (properties.externalBadgeType) { this.externalBadgeType = properties.externalBadgeType }
            if (properties.announcement) { this.announcement = AnnouncementConfig.create(properties.announcement) as any }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public applicationId?: string|null = ""
    @protobuf.Field.d(3, "int64", "optional", 0)
    public effectAt?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public expireAt?: number|null = 0
    @protobuf.Field.d(5, "tss_hall_common_ListViewConf", "optional")
    public listView?: ListViewConf|null
    @protobuf.Field.d(6, "tss_hall_common_PopUpConf", "optional")
    public popup?: PopUpConf|null
    @protobuf.Field.d(7, "tss_hall_common_ShortCutConf", "optional")
    public shortCut?: ShortCutConf|null
    @protobuf.Field.d(8, ActivityType, "optional", ActivityType.ActivityTypeUnknown)
    public type?: ActivityType|null = ActivityType.ActivityTypeUnknown
    @protobuf.Field.d(9, tss_common_task_TargetUser, "repeated", tss_common_task_TargetUser.TargetUserUnknown)
    public target?: tss_common_task_TargetUser[] = []
    @protobuf.Field.d(10, "string", "optional", )
    public URI?: string|null = ""
    @protobuf.Field.d(11, "int64", "optional", 0)
    public onlineAt?: number|null = 0
    @protobuf.Field.d(12, "int64", "optional", 0)
    public offlineAt?: number|null = 0
    @protobuf.Field.d(13, "int64", "optional", 0)
    public priority?: number|null = 0
    @protobuf.Field.d(14, "string", "optional", )
    public ruleDesc?: string|null = ""
    @protobuf.Field.d(15, "string", "optional", )
    public viewTmplURL?: string|null = ""
    @protobuf.Field.d(16, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(17, "int64", "optional", 0)
    public createAt?: number|null = 0
    @protobuf.Field.d(18, "int64", "optional", 0)
    public updateAt?: number|null = 0
    @protobuf.Field.d(19, "int64", "optional", 0)
    public maxVersion?: number|null = 0
    @protobuf.Field.d(20, "int64", "optional", 0)
    public minVersion?: number|null = 0
    @protobuf.Field.d(21, ActivityTagType, "optional", ActivityTagType.ActivityTagTypeUnknwon)
    public tagType?: ActivityTagType|null = ActivityTagType.ActivityTagTypeUnknwon
    @protobuf.Field.d(22, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public newActivityBadge?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
    @protobuf.Field.d(23, "string", "repeated", [])
    public appId?: string[] = []
    @protobuf.Field.d(24, "string", "optional", )
    public netView?: string|null = ""
    @protobuf.Field.d(25, "string", "optional", )
    public appURL?: string|null = ""
    @protobuf.Field.d(26, "bytes", "optional", [])
    public content?: Uint8Array
    @protobuf.Field.d(27, "string", "repeated", [])
    public userGroupIDs?: string[] = []
    @protobuf.Field.d(28, ActivityTab, "optional", ActivityTab.ActivityTabUnknown)
    public activityTab?: ActivityTab|null = ActivityTab.ActivityTabUnknown
    @protobuf.Field.d(29, "int64", "optional", 0)
    public resourceId?: number|null = 0
    @protobuf.Field.d(30, ExternalBadgeType, "optional", ExternalBadgeType.ExternalBadgeNone)
    public externalBadgeType?: ExternalBadgeType|null = ExternalBadgeType.ExternalBadgeNone
    @protobuf.Field.d(32, "tss_hall_common_AnnouncementConfig", "optional")
    public announcement?: AnnouncementConfig|null
}
import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  Void as base_Void,IVoid as base_IVoid ,  BatchGetResourceReq as base_BatchGetResourceReq,IBatchGetResourceReq as base_IBatchGetResourceReq ,  BatchGetResourceResp as base_BatchGetResourceResp,IBatchGetResourceResp as base_IBatchGetResourceResp ,  } from "idl/base/base"
import {  SwitchState as tss_common_SwitchState ,  } from "idl/tss/common/common_define"
export enum HomePopupType {  
    HomePopupTypeUnknown = 0,  
    HomePopupTypeNotice = 1,  
    HomePopupTypeActivity = 2,
}
export enum PopupType {  
    PopTypeUnknown = 0,  
    PopTypeDayOnce = 1,  
    PopTypePerLogin = 2,  
    PopTypeOnlyOnce = 3,  
    PopTypeWeekly = 4,
}
export enum AppConfType {  
    TextConfig = 0,  
    IMConfig = 1,
}
export enum ListStatus {  
    ListStatusUnknown = 0,  
    ListStatusActive = 1,  
    ListStatusNotActive = 2,  
    ListStatusAll = 3,
}
export enum MatchLoadingType {  
    MatchLoadingTypeUnknown = 0,  
    MatchLoadingTypeFast = 1,  
    MatchLoadingTypeBreakthrough = 2,  
    MatchLoadingTypeRegularMatch = 3,  
    MatchLoadingTypeBettingMatch = 4,
}
export enum ShowSceneType {  
    ShowSceneTypeUnknown = 0,  
    ShowSceneTypeHomePage = 1,  
    ShowSceneTypeFindGame = 2,  
    ShowSceneTypeMyPage = 3,  
    ShowSceneTypeMessage = 4,  
    ShowSceneTypeAccount = 5,
}
export enum FloatingWindowStateType {  
    FloatingWindowStateTypeUnknown = 0,  
    FloatingWindowStateTypeOnline = 1,  
    FloatingWindowStateTypeLogin = 2,
}
export enum AppConfKey {  
    KeyUnknown = 0,  
    KeyPrivacy = 1,  
    KeyServer = 2,  
    KeyAgeAppropriate = 3,  
    KeyPrivacyHtml = 4,  
    KeyServerHtml = 5,  
    KeyAgeAppropriateHtml = 6,
}
export interface IHomePopupConf {
    type?: HomePopupType|null
    ID?: number|null
    popSeq?: number|null
    name?: string|null
    img?: string|null
    onlineAt?: number|null
    offlineAt?: number|null
    updateAt?: number|null
    operator?: string|null
    userGroupIds?: string[]
    popupFrequency?: PopupType|null
    status?: number|null
}
@protobuf.Type.d("tss_hall_appconf_v1_HomePopupConf")
export class HomePopupConf extends protobuf.Message<IHomePopupConf> {
    constructor(properties: Properties<IHomePopupConf>) {
        super(properties);
        if (properties) {
            if (properties.type) { this.type = properties.type }
            if (properties.ID) { this.ID = properties.ID }
            if (properties.popSeq) { this.popSeq = properties.popSeq }
            if (properties.name) { this.name = properties.name }
            if (properties.img) { this.img = properties.img }
            if (properties.onlineAt) { this.onlineAt = properties.onlineAt }
            if (properties.offlineAt) { this.offlineAt = properties.offlineAt }
            if (properties.updateAt) { this.updateAt = properties.updateAt }
            if (properties.operator) { this.operator = properties.operator }
            if (properties.userGroupIds) { this.userGroupIds = []; properties.userGroupIds.forEach((value, index)=>{this.userGroupIds[index] = properties.userGroupIds[index]})}
            if (properties.popupFrequency) { this.popupFrequency = properties.popupFrequency }
            if (properties.status) { this.status = properties.status }
        }
	}
    @protobuf.Field.d(1, HomePopupType, "optional", HomePopupType.HomePopupTypeUnknown)
    public type?: HomePopupType|null = HomePopupType.HomePopupTypeUnknown
    @protobuf.Field.d(2, "int64", "optional", 0)
    public ID?: number|null = 0
    @protobuf.Field.d(3, "int32", "optional", 0)
    public popSeq?: number|null = 0
    @protobuf.Field.d(4, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public img?: string|null = ""
    @protobuf.Field.d(6, "int64", "optional", 0)
    public onlineAt?: number|null = 0
    @protobuf.Field.d(7, "int64", "optional", 0)
    public offlineAt?: number|null = 0
    @protobuf.Field.d(8, "int64", "optional", 0)
    public updateAt?: number|null = 0
    @protobuf.Field.d(9, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(12, "string", "repeated", [])
    public userGroupIds?: string[] = []
    @protobuf.Field.d(13, PopupType, "optional", PopupType.PopTypeUnknown)
    public popupFrequency?: PopupType|null = PopupType.PopTypeUnknown
    @protobuf.Field.d(14, "int32", "optional", 0)
    public status?: number|null = 0
}
export interface IAppConf {
    key?: string|null
    title?: string|null
    content?: string|null
    createdAt?: number|null
    updatedAt?: number|null
    id?: string|null
    minVersion?: number|null
    maxVersion?: number|null
    appId?: string[]
    state?: tss_common_SwitchState|null
    mutiContents?: string[]
    operator?: string|null
    confType?: AppConfType|null
}
@protobuf.Type.d("tss_hall_appconf_v1_AppConf")
export class AppConf extends protobuf.Message<IAppConf> {
    constructor(properties: Properties<IAppConf>) {
        super(properties);
        if (properties) {
            if (properties.key) { this.key = properties.key }
            if (properties.title) { this.title = properties.title }
            if (properties.content) { this.content = properties.content }
            if (properties.createdAt) { this.createdAt = properties.createdAt }
            if (properties.updatedAt) { this.updatedAt = properties.updatedAt }
            if (properties.id) { this.id = properties.id }
            if (properties.minVersion) { this.minVersion = properties.minVersion }
            if (properties.maxVersion) { this.maxVersion = properties.maxVersion }
            if (properties.appId) { this.appId = []; properties.appId.forEach((value, index)=>{this.appId[index] = properties.appId[index]})}
            if (properties.state) { this.state = properties.state }
            if (properties.mutiContents) { this.mutiContents = []; properties.mutiContents.forEach((value, index)=>{this.mutiContents[index] = properties.mutiContents[index]})}
            if (properties.operator) { this.operator = properties.operator }
            if (properties.confType) { this.confType = properties.confType }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public key?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public title?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public content?: string|null = ""
    @protobuf.Field.d(4, "int64", "optional", 0)
    public createdAt?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public updatedAt?: number|null = 0
    @protobuf.Field.d(6, "string", "optional", )
    public id?: string|null = ""
    @protobuf.Field.d(7, "int64", "optional", 0)
    public minVersion?: number|null = 0
    @protobuf.Field.d(8, "int64", "optional", 0)
    public maxVersion?: number|null = 0
    @protobuf.Field.d(9, "string", "repeated", [])
    public appId?: string[] = []
    @protobuf.Field.d(10, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public state?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
    @protobuf.Field.d(11, "string", "repeated", [])
    public mutiContents?: string[] = []
    @protobuf.Field.d(12, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(13, AppConfType, "optional", AppConfType.TextConfig)
    public confType?: AppConfType|null = AppConfType.TextConfig
}
export interface IDeleteAppConfReq {
    id?: string|null
}
@protobuf.Type.d("tss_hall_appconf_v1_DeleteAppConfReq")
export class DeleteAppConfReq extends protobuf.Message<IDeleteAppConfReq> {
    constructor(properties: Properties<IDeleteAppConfReq>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public id?: string|null = ""
}
export interface IListAppConfReq {
    page?: number|null
    pageSize?: number|null
    key?: string|null
    applicationId?: string|null
}
@protobuf.Type.d("tss_hall_appconf_v1_ListAppConfReq")
export class ListAppConfReq extends protobuf.Message<IListAppConfReq> {
    constructor(properties: Properties<IListAppConfReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.key) { this.key = properties.key }
            if (properties.applicationId) { this.applicationId = properties.applicationId }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public key?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public applicationId?: string|null = ""
}
export interface IListAppConfResp {
    confs?: IAppConf[]
}
@protobuf.Type.d("tss_hall_appconf_v1_ListAppConfResp")
export class ListAppConfResp extends protobuf.Message<IListAppConfResp> {
    constructor(properties: Properties<IListAppConfResp>) {
        super(properties);
        if (properties) {
            if (properties.confs) { this.confs = []; properties.confs.forEach((value, index)=>{this.confs[index] = AppConf.create(properties.confs[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_appconf_v1_AppConf", "repeated")
    public confs?: AppConf[] = []
}
export interface IGetAppConfReq {
    key?: string|null
    updatedAt?: number|null
}
@protobuf.Type.d("tss_hall_appconf_v1_GetAppConfReq")
export class GetAppConfReq extends protobuf.Message<IGetAppConfReq> {
    constructor(properties: Properties<IGetAppConfReq>) {
        super(properties);
        if (properties) {
            if (properties.key) { this.key = properties.key }
            if (properties.updatedAt) { this.updatedAt = properties.updatedAt }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public key?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public updatedAt?: number|null = 0
}
export interface ICMSGetAppConfReq {
    ID?: string|null
}
@protobuf.Type.d("tss_hall_appconf_v1_CMSGetAppConfReq")
export class CMSGetAppConfReq extends protobuf.Message<ICMSGetAppConfReq> {
    constructor(properties: Properties<ICMSGetAppConfReq>) {
        super(properties);
        if (properties) {
            if (properties.ID) { this.ID = properties.ID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public ID?: string|null = ""
}
export interface IGetAppConfResp {
    conf?: IAppConf
}
@protobuf.Type.d("tss_hall_appconf_v1_GetAppConfResp")
export class GetAppConfResp extends protobuf.Message<IGetAppConfResp> {
    constructor(properties: Properties<IGetAppConfResp>) {
        super(properties);
        if (properties) {
            if (properties.conf) { this.conf = AppConf.create(properties.conf) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_appconf_v1_AppConf", "optional")
    public conf?: AppConf|null
}
export interface ICMSGetAppConfResp {
    conf?: IAppConf
}
@protobuf.Type.d("tss_hall_appconf_v1_CMSGetAppConfResp")
export class CMSGetAppConfResp extends protobuf.Message<ICMSGetAppConfResp> {
    constructor(properties: Properties<ICMSGetAppConfResp>) {
        super(properties);
        if (properties) {
            if (properties.conf) { this.conf = AppConf.create(properties.conf) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_appconf_v1_AppConf", "optional")
    public conf?: AppConf|null
}
export interface ISaveAppConfReq {
    conf?: IAppConf
    isNewVersionRequest?: boolean|null
}
@protobuf.Type.d("tss_hall_appconf_v1_SaveAppConfReq")
export class SaveAppConfReq extends protobuf.Message<ISaveAppConfReq> {
    constructor(properties: Properties<ISaveAppConfReq>) {
        super(properties);
        if (properties) {
            if (properties.conf) { this.conf = AppConf.create(properties.conf) as any }
            if (properties.isNewVersionRequest) { this.isNewVersionRequest = properties.isNewVersionRequest }
        }
	}
    @protobuf.Field.d(1, "tss_hall_appconf_v1_AppConf", "optional")
    public conf?: AppConf|null
    @protobuf.Field.d(3, "bool", "optional", false)
    public isNewVersionRequest?: boolean|null = false
}
export interface IBatchGetAppConfReq {
    key?: string[]
}
@protobuf.Type.d("tss_hall_appconf_v1_BatchGetAppConfReq")
export class BatchGetAppConfReq extends protobuf.Message<IBatchGetAppConfReq> {
    constructor(properties: Properties<IBatchGetAppConfReq>) {
        super(properties);
        if (properties) {
            if (properties.key) { this.key = []; properties.key.forEach((value, index)=>{this.key[index] = properties.key[index]})}
        }
	}
    @protobuf.Field.d(1, "string", "repeated", [])
    public key?: string[] = []
}
export interface IBatchGetAppConfResp {
    conf?: IAppConf[]
}
@protobuf.Type.d("tss_hall_appconf_v1_BatchGetAppConfResp")
export class BatchGetAppConfResp extends protobuf.Message<IBatchGetAppConfResp> {
    constructor(properties: Properties<IBatchGetAppConfResp>) {
        super(properties);
        if (properties) {
            if (properties.conf) { this.conf = []; properties.conf.forEach((value, index)=>{this.conf[index] = AppConf.create(properties.conf[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_appconf_v1_AppConf", "repeated")
    public conf?: AppConf[] = []
}
export interface IoperationLog {
    operator?: string|null
    key?: string|null
    createdAt?: number|null
    configID?: number|null
}
@protobuf.Type.d("tss_hall_appconf_v1_operationLog")
export class operationLog extends protobuf.Message<IoperationLog> {
    constructor(properties: Properties<IoperationLog>) {
        super(properties);
        if (properties) {
            if (properties.operator) { this.operator = properties.operator }
            if (properties.key) { this.key = properties.key }
            if (properties.createdAt) { this.createdAt = properties.createdAt }
            if (properties.configID) { this.configID = properties.configID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public key?: string|null = ""
    @protobuf.Field.d(3, "int64", "optional", 0)
    public createdAt?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public configID?: number|null = 0
}
export interface IListOperationLogReq {
    page?: number|null
    pageSize?: number|null
    key?: string|null
}
@protobuf.Type.d("tss_hall_appconf_v1_ListOperationLogReq")
export class ListOperationLogReq extends protobuf.Message<IListOperationLogReq> {
    constructor(properties: Properties<IListOperationLogReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.key) { this.key = properties.key }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public key?: string|null = ""
}
export interface IListOperationLogResp {
    logs?: IoperationLog[]
    total?: number|null
}
@protobuf.Type.d("tss_hall_appconf_v1_ListOperationLogResp")
export class ListOperationLogResp extends protobuf.Message<IListOperationLogResp> {
    constructor(properties: Properties<IListOperationLogResp>) {
        super(properties);
        if (properties) {
            if (properties.logs) { this.logs = []; properties.logs.forEach((value, index)=>{this.logs[index] = operationLog.create(properties.logs[index]) as any})}
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "tss_hall_appconf_v1_operationLog", "repeated")
    public logs?: operationLog[] = []
    @protobuf.Field.d(2, "int32", "optional", 0)
    public total?: number|null = 0
}
export interface IListHomePopupReq {
    page?: number|null
    pageSize?: number|null
    listStatus?: ListStatus|null
    groupIds?: string[]
    status?: number[]
}
@protobuf.Type.d("tss_hall_appconf_v1_ListHomePopupReq")
export class ListHomePopupReq extends protobuf.Message<IListHomePopupReq> {
    constructor(properties: Properties<IListHomePopupReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.listStatus) { this.listStatus = properties.listStatus }
            if (properties.groupIds) { this.groupIds = []; properties.groupIds.forEach((value, index)=>{this.groupIds[index] = properties.groupIds[index]})}
            if (properties.status) { this.status = []; properties.status.forEach((value, index)=>{this.status[index] = properties.status[index]})}
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(3, ListStatus, "optional", ListStatus.ListStatusUnknown)
    public listStatus?: ListStatus|null = ListStatus.ListStatusUnknown
    @protobuf.Field.d(4, "string", "repeated", [])
    public groupIds?: string[] = []
    @protobuf.Field.d(5, "int32", "repeated", [])
    public status?: number[] = []
}
export interface IListHomePopupResp {
    PopupConfigs?: IHomePopupConf[]
    total?: number|null
}
@protobuf.Type.d("tss_hall_appconf_v1_ListHomePopupResp")
export class ListHomePopupResp extends protobuf.Message<IListHomePopupResp> {
    constructor(properties: Properties<IListHomePopupResp>) {
        super(properties);
        if (properties) {
            if (properties.PopupConfigs) { this.PopupConfigs = []; properties.PopupConfigs.forEach((value, index)=>{this.PopupConfigs[index] = HomePopupConf.create(properties.PopupConfigs[index]) as any})}
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "tss_hall_appconf_v1_HomePopupConf", "repeated")
    public PopupConfigs?: HomePopupConf[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public total?: number|null = 0
}
export interface ISaveHomePopupSeqReq {
    PopupConfigs?: IHomePopupConf[]
    operator?: string|null
}
@protobuf.Type.d("tss_hall_appconf_v1_SaveHomePopupSeqReq")
export class SaveHomePopupSeqReq extends protobuf.Message<ISaveHomePopupSeqReq> {
    constructor(properties: Properties<ISaveHomePopupSeqReq>) {
        super(properties);
        if (properties) {
            if (properties.PopupConfigs) { this.PopupConfigs = []; properties.PopupConfigs.forEach((value, index)=>{this.PopupConfigs[index] = HomePopupConf.create(properties.PopupConfigs[index]) as any})}
            if (properties.operator) { this.operator = properties.operator }
        }
	}
    @protobuf.Field.d(1, "tss_hall_appconf_v1_HomePopupConf", "repeated")
    public PopupConfigs?: HomePopupConf[] = []
    @protobuf.Field.d(2, "string", "optional", )
    public operator?: string|null = ""
}
export interface ISaveHomePopupSeqResp {
    code?: number|null
    errMsg?: string|null
}
@protobuf.Type.d("tss_hall_appconf_v1_SaveHomePopupSeqResp")
export class SaveHomePopupSeqResp extends protobuf.Message<ISaveHomePopupSeqResp> {
    constructor(properties: Properties<ISaveHomePopupSeqResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.errMsg) { this.errMsg = properties.errMsg }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public errMsg?: string|null = ""
}
export interface IGetHomePopupReq {
    type?: HomePopupType|null
    ID?: number|null
}
@protobuf.Type.d("tss_hall_appconf_v1_GetHomePopupReq")
export class GetHomePopupReq extends protobuf.Message<IGetHomePopupReq> {
    constructor(properties: Properties<IGetHomePopupReq>) {
        super(properties);
        if (properties) {
            if (properties.type) { this.type = properties.type }
            if (properties.ID) { this.ID = properties.ID }
        }
	}
    @protobuf.Field.d(1, HomePopupType, "optional", HomePopupType.HomePopupTypeUnknown)
    public type?: HomePopupType|null = HomePopupType.HomePopupTypeUnknown
    @protobuf.Field.d(2, "int64", "optional", 0)
    public ID?: number|null = 0
}
export interface IGetHomePopupResp {
    conf?: IHomePopupConf
}
@protobuf.Type.d("tss_hall_appconf_v1_GetHomePopupResp")
export class GetHomePopupResp extends protobuf.Message<IGetHomePopupResp> {
    constructor(properties: Properties<IGetHomePopupResp>) {
        super(properties);
        if (properties) {
            if (properties.conf) { this.conf = HomePopupConf.create(properties.conf) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_appconf_v1_HomePopupConf", "optional")
    public conf?: HomePopupConf|null
}
export interface IUpdateLoadingPageConf {
    imgs?: string[]
    updatedAt?: number|null
    createdAt?: number|null
    operator?: string|null
}
@protobuf.Type.d("tss_hall_appconf_v1_UpdateLoadingPageConf")
export class UpdateLoadingPageConf extends protobuf.Message<IUpdateLoadingPageConf> {
    constructor(properties: Properties<IUpdateLoadingPageConf>) {
        super(properties);
        if (properties) {
            if (properties.imgs) { this.imgs = []; properties.imgs.forEach((value, index)=>{this.imgs[index] = properties.imgs[index]})}
            if (properties.updatedAt) { this.updatedAt = properties.updatedAt }
            if (properties.createdAt) { this.createdAt = properties.createdAt }
            if (properties.operator) { this.operator = properties.operator }
        }
	}
    @protobuf.Field.d(1, "string", "repeated", [])
    public imgs?: string[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public updatedAt?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public createdAt?: number|null = 0
    @protobuf.Field.d(4, "string", "optional", )
    public operator?: string|null = ""
}
export interface IImgInfo {
    img?: string|null
    prizeID?: number|null
    prizeName?: string|null
}
@protobuf.Type.d("tss_hall_appconf_v1_ImgInfo")
export class ImgInfo extends protobuf.Message<IImgInfo> {
    constructor(properties: Properties<IImgInfo>) {
        super(properties);
        if (properties) {
            if (properties.img) { this.img = properties.img }
            if (properties.prizeID) { this.prizeID = properties.prizeID }
            if (properties.prizeName) { this.prizeName = properties.prizeName }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public img?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public prizeID?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public prizeName?: string|null = ""
}
export interface ILoadingPageConf {
    imgs?: string[]
    start?: number|null
    end?: number|null
    imgInfos?: IImgInfo[]
}
@protobuf.Type.d("tss_hall_appconf_v1_LoadingPageConf")
export class LoadingPageConf extends protobuf.Message<ILoadingPageConf> {
    constructor(properties: Properties<ILoadingPageConf>) {
        super(properties);
        if (properties) {
            if (properties.imgs) { this.imgs = []; properties.imgs.forEach((value, index)=>{this.imgs[index] = properties.imgs[index]})}
            if (properties.start) { this.start = properties.start }
            if (properties.end) { this.end = properties.end }
            if (properties.imgInfos) { this.imgInfos = []; properties.imgInfos.forEach((value, index)=>{this.imgInfos[index] = ImgInfo.create(properties.imgInfos[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "string", "repeated", [])
    public imgs?: string[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public start?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public end?: number|null = 0
    @protobuf.Field.d(4, "tss_hall_appconf_v1_ImgInfo", "repeated")
    public imgInfos?: ImgInfo[] = []
}
export interface IMatchLoadingPageConf {
    matchLoadingType?: MatchLoadingType|null
    configs?: ILoadingPageConf[]
    updatedAt?: number|null
    createdAt?: number|null
    operator?: string|null
}
@protobuf.Type.d("tss_hall_appconf_v1_MatchLoadingPageConf")
export class MatchLoadingPageConf extends protobuf.Message<IMatchLoadingPageConf> {
    constructor(properties: Properties<IMatchLoadingPageConf>) {
        super(properties);
        if (properties) {
            if (properties.matchLoadingType) { this.matchLoadingType = properties.matchLoadingType }
            if (properties.configs) { this.configs = []; properties.configs.forEach((value, index)=>{this.configs[index] = LoadingPageConf.create(properties.configs[index]) as any})}
            if (properties.updatedAt) { this.updatedAt = properties.updatedAt }
            if (properties.createdAt) { this.createdAt = properties.createdAt }
            if (properties.operator) { this.operator = properties.operator }
        }
	}
    @protobuf.Field.d(1, MatchLoadingType, "optional", MatchLoadingType.MatchLoadingTypeUnknown)
    public matchLoadingType?: MatchLoadingType|null = MatchLoadingType.MatchLoadingTypeUnknown
    @protobuf.Field.d(2, "tss_hall_appconf_v1_LoadingPageConf", "repeated")
    public configs?: LoadingPageConf[] = []
    @protobuf.Field.d(3, "int64", "optional", 0)
    public updatedAt?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public createdAt?: number|null = 0
    @protobuf.Field.d(5, "string", "optional", )
    public operator?: string|null = ""
}
export interface IGetLoadingPageConfResp {
    updateConf?: IUpdateLoadingPageConf
    matchConfs?: IMatchLoadingPageConf[]
}
@protobuf.Type.d("tss_hall_appconf_v1_GetLoadingPageConfResp")
export class GetLoadingPageConfResp extends protobuf.Message<IGetLoadingPageConfResp> {
    constructor(properties: Properties<IGetLoadingPageConfResp>) {
        super(properties);
        if (properties) {
            if (properties.updateConf) { this.updateConf = UpdateLoadingPageConf.create(properties.updateConf) as any }
            if (properties.matchConfs) { this.matchConfs = []; properties.matchConfs.forEach((value, index)=>{this.matchConfs[index] = MatchLoadingPageConf.create(properties.matchConfs[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_appconf_v1_UpdateLoadingPageConf", "optional")
    public updateConf?: UpdateLoadingPageConf|null
    @protobuf.Field.d(2, "tss_hall_appconf_v1_MatchLoadingPageConf", "repeated")
    public matchConfs?: MatchLoadingPageConf[] = []
}
export interface IGetUpdateLoadingPageConfResp {
    updateConf?: IUpdateLoadingPageConf
}
@protobuf.Type.d("tss_hall_appconf_v1_GetUpdateLoadingPageConfResp")
export class GetUpdateLoadingPageConfResp extends protobuf.Message<IGetUpdateLoadingPageConfResp> {
    constructor(properties: Properties<IGetUpdateLoadingPageConfResp>) {
        super(properties);
        if (properties) {
            if (properties.updateConf) { this.updateConf = UpdateLoadingPageConf.create(properties.updateConf) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_appconf_v1_UpdateLoadingPageConf", "optional")
    public updateConf?: UpdateLoadingPageConf|null
}
export interface IUpsertUpdateLoadingPageConfReq {
    updateConf?: IUpdateLoadingPageConf
}
@protobuf.Type.d("tss_hall_appconf_v1_UpsertUpdateLoadingPageConfReq")
export class UpsertUpdateLoadingPageConfReq extends protobuf.Message<IUpsertUpdateLoadingPageConfReq> {
    constructor(properties: Properties<IUpsertUpdateLoadingPageConfReq>) {
        super(properties);
        if (properties) {
            if (properties.updateConf) { this.updateConf = UpdateLoadingPageConf.create(properties.updateConf) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_appconf_v1_UpdateLoadingPageConf", "optional")
    public updateConf?: UpdateLoadingPageConf|null
}
export interface IUpsertMatchLoadingPageConfReq {
    matchConf?: IMatchLoadingPageConf
}
@protobuf.Type.d("tss_hall_appconf_v1_UpsertMatchLoadingPageConfReq")
export class UpsertMatchLoadingPageConfReq extends protobuf.Message<IUpsertMatchLoadingPageConfReq> {
    constructor(properties: Properties<IUpsertMatchLoadingPageConfReq>) {
        super(properties);
        if (properties) {
            if (properties.matchConf) { this.matchConf = MatchLoadingPageConf.create(properties.matchConf) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_appconf_v1_MatchLoadingPageConf", "optional")
    public matchConf?: MatchLoadingPageConf|null
}
export interface IGetMatchLoadingPageConfReq {
    matchLoadingType?: MatchLoadingType|null
}
@protobuf.Type.d("tss_hall_appconf_v1_GetMatchLoadingPageConfReq")
export class GetMatchLoadingPageConfReq extends protobuf.Message<IGetMatchLoadingPageConfReq> {
    constructor(properties: Properties<IGetMatchLoadingPageConfReq>) {
        super(properties);
        if (properties) {
            if (properties.matchLoadingType) { this.matchLoadingType = properties.matchLoadingType }
        }
	}
    @protobuf.Field.d(1, MatchLoadingType, "optional", MatchLoadingType.MatchLoadingTypeUnknown)
    public matchLoadingType?: MatchLoadingType|null = MatchLoadingType.MatchLoadingTypeUnknown
}
export interface IGetMatchLoadingPageConfResp {
    matchConf?: IMatchLoadingPageConf
}
@protobuf.Type.d("tss_hall_appconf_v1_GetMatchLoadingPageConfResp")
export class GetMatchLoadingPageConfResp extends protobuf.Message<IGetMatchLoadingPageConfResp> {
    constructor(properties: Properties<IGetMatchLoadingPageConfResp>) {
        super(properties);
        if (properties) {
            if (properties.matchConf) { this.matchConf = MatchLoadingPageConf.create(properties.matchConf) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_appconf_v1_MatchLoadingPageConf", "optional")
    public matchConf?: MatchLoadingPageConf|null
}
export interface IListMatchLoadingPageConfResp {
    matchConfs?: IMatchLoadingPageConf[]
}
@protobuf.Type.d("tss_hall_appconf_v1_ListMatchLoadingPageConfResp")
export class ListMatchLoadingPageConfResp extends protobuf.Message<IListMatchLoadingPageConfResp> {
    constructor(properties: Properties<IListMatchLoadingPageConfResp>) {
        super(properties);
        if (properties) {
            if (properties.matchConfs) { this.matchConfs = []; properties.matchConfs.forEach((value, index)=>{this.matchConfs[index] = MatchLoadingPageConf.create(properties.matchConfs[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_appconf_v1_MatchLoadingPageConf", "repeated")
    public matchConfs?: MatchLoadingPageConf[] = []
}
export interface IDeleteMatchLoadingPageConfReq {
    matchLoadingType?: MatchLoadingType|null
}
@protobuf.Type.d("tss_hall_appconf_v1_DeleteMatchLoadingPageConfReq")
export class DeleteMatchLoadingPageConfReq extends protobuf.Message<IDeleteMatchLoadingPageConfReq> {
    constructor(properties: Properties<IDeleteMatchLoadingPageConfReq>) {
        super(properties);
        if (properties) {
            if (properties.matchLoadingType) { this.matchLoadingType = properties.matchLoadingType }
        }
	}
    @protobuf.Field.d(1, MatchLoadingType, "optional", MatchLoadingType.MatchLoadingTypeUnknown)
    public matchLoadingType?: MatchLoadingType|null = MatchLoadingType.MatchLoadingTypeUnknown
}
export interface IFloatingWindowConf {
    desc?: string|null
    img?: string|null
    url?: string|null
    showScenes?: ShowSceneType[]
    userGroups?: string[]
    popupType?: PopupType|null
    listOrder?: number|null
    operator?: string|null
    updatedAt?: number|null
    createdAt?: number|null
    state?: FloatingWindowStateType|null
    id?: number|null
}
@protobuf.Type.d("tss_hall_appconf_v1_FloatingWindowConf")
export class FloatingWindowConf extends protobuf.Message<IFloatingWindowConf> {
    constructor(properties: Properties<IFloatingWindowConf>) {
        super(properties);
        if (properties) {
            if (properties.desc) { this.desc = properties.desc }
            if (properties.img) { this.img = properties.img }
            if (properties.url) { this.url = properties.url }
            if (properties.showScenes) { this.showScenes = []; properties.showScenes.forEach((value, index)=>{this.showScenes[index] = properties.showScenes[index]})}
            if (properties.userGroups) { this.userGroups = []; properties.userGroups.forEach((value, index)=>{this.userGroups[index] = properties.userGroups[index]})}
            if (properties.popupType) { this.popupType = properties.popupType }
            if (properties.listOrder) { this.listOrder = properties.listOrder }
            if (properties.operator) { this.operator = properties.operator }
            if (properties.updatedAt) { this.updatedAt = properties.updatedAt }
            if (properties.createdAt) { this.createdAt = properties.createdAt }
            if (properties.state) { this.state = properties.state }
            if (properties.id) { this.id = properties.id }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public desc?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public img?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public url?: string|null = ""
    @protobuf.Field.d(4, ShowSceneType, "repeated", ShowSceneType.ShowSceneTypeUnknown)
    public showScenes?: ShowSceneType[] = []
    @protobuf.Field.d(5, "string", "repeated", [])
    public userGroups?: string[] = []
    @protobuf.Field.d(6, PopupType, "optional", PopupType.PopTypeUnknown)
    public popupType?: PopupType|null = PopupType.PopTypeUnknown
    @protobuf.Field.d(7, "int64", "optional", 0)
    public listOrder?: number|null = 0
    @protobuf.Field.d(8, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(9, "int64", "optional", 0)
    public updatedAt?: number|null = 0
    @protobuf.Field.d(10, "int64", "optional", 0)
    public createdAt?: number|null = 0
    @protobuf.Field.d(11, FloatingWindowStateType, "optional", FloatingWindowStateType.FloatingWindowStateTypeUnknown)
    public state?: FloatingWindowStateType|null = FloatingWindowStateType.FloatingWindowStateTypeUnknown
    @protobuf.Field.d(12, "int64", "optional", 0)
    public id?: number|null = 0
}
export interface IListFloatingWindowConfReq {
    state?: FloatingWindowStateType|null
}
@protobuf.Type.d("tss_hall_appconf_v1_ListFloatingWindowConfReq")
export class ListFloatingWindowConfReq extends protobuf.Message<IListFloatingWindowConfReq> {
    constructor(properties: Properties<IListFloatingWindowConfReq>) {
        super(properties);
        if (properties) {
            if (properties.state) { this.state = properties.state }
        }
	}
    @protobuf.Field.d(1, FloatingWindowStateType, "optional", FloatingWindowStateType.FloatingWindowStateTypeUnknown)
    public state?: FloatingWindowStateType|null = FloatingWindowStateType.FloatingWindowStateTypeUnknown
}
export interface IListFloatingWindowConfResp {
    configs?: IFloatingWindowConf[]
}
@protobuf.Type.d("tss_hall_appconf_v1_ListFloatingWindowConfResp")
export class ListFloatingWindowConfResp extends protobuf.Message<IListFloatingWindowConfResp> {
    constructor(properties: Properties<IListFloatingWindowConfResp>) {
        super(properties);
        if (properties) {
            if (properties.configs) { this.configs = []; properties.configs.forEach((value, index)=>{this.configs[index] = FloatingWindowConf.create(properties.configs[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_appconf_v1_FloatingWindowConf", "repeated")
    public configs?: FloatingWindowConf[] = []
}
export interface IGetFloatingWindowConfReq {
    id?: number|null
}
@protobuf.Type.d("tss_hall_appconf_v1_GetFloatingWindowConfReq")
export class GetFloatingWindowConfReq extends protobuf.Message<IGetFloatingWindowConfReq> {
    constructor(properties: Properties<IGetFloatingWindowConfReq>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public id?: number|null = 0
}
export interface IGetFloatingWindowConfResp {
    config?: IFloatingWindowConf
}
@protobuf.Type.d("tss_hall_appconf_v1_GetFloatingWindowConfResp")
export class GetFloatingWindowConfResp extends protobuf.Message<IGetFloatingWindowConfResp> {
    constructor(properties: Properties<IGetFloatingWindowConfResp>) {
        super(properties);
        if (properties) {
            if (properties.config) { this.config = FloatingWindowConf.create(properties.config) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_appconf_v1_FloatingWindowConf", "optional")
    public config?: FloatingWindowConf|null
}
export interface IUpsertFloatingWindowConfReq {
    config?: IFloatingWindowConf
}
@protobuf.Type.d("tss_hall_appconf_v1_UpsertFloatingWindowConfReq")
export class UpsertFloatingWindowConfReq extends protobuf.Message<IUpsertFloatingWindowConfReq> {
    constructor(properties: Properties<IUpsertFloatingWindowConfReq>) {
        super(properties);
        if (properties) {
            if (properties.config) { this.config = FloatingWindowConf.create(properties.config) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_appconf_v1_FloatingWindowConf", "optional")
    public config?: FloatingWindowConf|null
}
export interface IGetAssignedFloatingWindowConfReq {
    showScenes?: ShowSceneType|null
}
@protobuf.Type.d("tss_hall_appconf_v1_GetAssignedFloatingWindowConfReq")
export class GetAssignedFloatingWindowConfReq extends protobuf.Message<IGetAssignedFloatingWindowConfReq> {
    constructor(properties: Properties<IGetAssignedFloatingWindowConfReq>) {
        super(properties);
        if (properties) {
            if (properties.showScenes) { this.showScenes = properties.showScenes }
        }
	}
    @protobuf.Field.d(1, ShowSceneType, "optional", ShowSceneType.ShowSceneTypeUnknown)
    public showScenes?: ShowSceneType|null = ShowSceneType.ShowSceneTypeUnknown
}
export interface IGetAssignedFloatingWindowConfResp {
    configs?: IFloatingWindowConf[]
}
@protobuf.Type.d("tss_hall_appconf_v1_GetAssignedFloatingWindowConfResp")
export class GetAssignedFloatingWindowConfResp extends protobuf.Message<IGetAssignedFloatingWindowConfResp> {
    constructor(properties: Properties<IGetAssignedFloatingWindowConfResp>) {
        super(properties);
        if (properties) {
            if (properties.configs) { this.configs = []; properties.configs.forEach((value, index)=>{this.configs[index] = FloatingWindowConf.create(properties.configs[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_appconf_v1_FloatingWindowConf", "repeated")
    public configs?: FloatingWindowConf[] = []
}
export interface ISortFloatingWindowConf {
    id?: number|null
    listOrder?: number|null
}
@protobuf.Type.d("tss_hall_appconf_v1_SortFloatingWindowConf")
export class SortFloatingWindowConf extends protobuf.Message<ISortFloatingWindowConf> {
    constructor(properties: Properties<ISortFloatingWindowConf>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.listOrder) { this.listOrder = properties.listOrder }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public id?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public listOrder?: number|null = 0
}
export interface ISortFloatingWindowConfReq {
    sorts?: ISortFloatingWindowConf[]
}
@protobuf.Type.d("tss_hall_appconf_v1_SortFloatingWindowConfReq")
export class SortFloatingWindowConfReq extends protobuf.Message<ISortFloatingWindowConfReq> {
    constructor(properties: Properties<ISortFloatingWindowConfReq>) {
        super(properties);
        if (properties) {
            if (properties.sorts) { this.sorts = []; properties.sorts.forEach((value, index)=>{this.sorts[index] = SortFloatingWindowConf.create(properties.sorts[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_appconf_v1_SortFloatingWindowConf", "repeated")
    public sorts?: SortFloatingWindowConf[] = []
}
export interface IKeyValue {
    key?: string|null
    value?: string|null
    default?: string|null
    required?: boolean|null
    desc?: string|null
}
@protobuf.Type.d("tss_hall_appconf_v1_KeyValue")
export class KeyValue extends protobuf.Message<IKeyValue> {
    constructor(properties: Properties<IKeyValue>) {
        super(properties);
        if (properties) {
            if (properties.key) { this.key = properties.key }
            if (properties.value) { this.value = properties.value }
            if (properties.default) { this.default = properties.default }
            if (properties.required) { this.required = properties.required }
            if (properties.desc) { this.desc = properties.desc }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public key?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public value?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public default?: string|null = ""
    @protobuf.Field.d(4, "bool", "optional", false)
    public required?: boolean|null = false
    @protobuf.Field.d(5, "string", "optional", )
    public desc?: string|null = ""
}
export interface INetViewWithVer {
    netView?: string|null
    minVersion?: number|null
    maxVersion?: number|null
}
@protobuf.Type.d("tss_hall_appconf_v1_NetViewWithVer")
export class NetViewWithVer extends protobuf.Message<INetViewWithVer> {
    constructor(properties: Properties<INetViewWithVer>) {
        super(properties);
        if (properties) {
            if (properties.netView) { this.netView = properties.netView }
            if (properties.minVersion) { this.minVersion = properties.minVersion }
            if (properties.maxVersion) { this.maxVersion = properties.maxVersion }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public netView?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public minVersion?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public maxVersion?: number|null = 0
}
export interface IAppRedirect {
    id?: number|null
    localPath?: string|null
    descName?: string|null
    category?: number|null
    netView?: string|null
    keyValue?: IKeyValue[]
    operator?: string|null
    netViews?: INetViewWithVer[]
}
@protobuf.Type.d("tss_hall_appconf_v1_AppRedirect")
export class AppRedirect extends protobuf.Message<IAppRedirect> {
    constructor(properties: Properties<IAppRedirect>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.localPath) { this.localPath = properties.localPath }
            if (properties.descName) { this.descName = properties.descName }
            if (properties.category) { this.category = properties.category }
            if (properties.netView) { this.netView = properties.netView }
            if (properties.keyValue) { this.keyValue = []; properties.keyValue.forEach((value, index)=>{this.keyValue[index] = KeyValue.create(properties.keyValue[index]) as any})}
            if (properties.operator) { this.operator = properties.operator }
            if (properties.netViews) { this.netViews = []; properties.netViews.forEach((value, index)=>{this.netViews[index] = NetViewWithVer.create(properties.netViews[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public id?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public localPath?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public descName?: string|null = ""
    @protobuf.Field.d(4, "int64", "optional", 0)
    public category?: number|null = 0
    @protobuf.Field.d(5, "string", "optional", )
    public netView?: string|null = ""
    @protobuf.Field.d(6, "tss_hall_appconf_v1_KeyValue", "repeated")
    public keyValue?: KeyValue[] = []
    @protobuf.Field.d(7, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(8, "tss_hall_appconf_v1_NetViewWithVer", "repeated")
    public netViews?: NetViewWithVer[] = []
}
export interface IAppRedirectCategory {
    id?: number|null
    name?: string|null
}
@protobuf.Type.d("tss_hall_appconf_v1_AppRedirectCategory")
export class AppRedirectCategory extends protobuf.Message<IAppRedirectCategory> {
    constructor(properties: Properties<IAppRedirectCategory>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.name) { this.name = properties.name }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public id?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public name?: string|null = ""
}
export interface IGetAppRedirectReq {
    id?: number|null
}
@protobuf.Type.d("tss_hall_appconf_v1_GetAppRedirectReq")
export class GetAppRedirectReq extends protobuf.Message<IGetAppRedirectReq> {
    constructor(properties: Properties<IGetAppRedirectReq>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public id?: number|null = 0
}
export interface IGetAppRedirectResp {
    appRedirect?: IAppRedirect
}
@protobuf.Type.d("tss_hall_appconf_v1_GetAppRedirectResp")
export class GetAppRedirectResp extends protobuf.Message<IGetAppRedirectResp> {
    constructor(properties: Properties<IGetAppRedirectResp>) {
        super(properties);
        if (properties) {
            if (properties.appRedirect) { this.appRedirect = AppRedirect.create(properties.appRedirect) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_appconf_v1_AppRedirect", "optional")
    public appRedirect?: AppRedirect|null
}
export interface ISaveAppRedirectReq {
    appRedirect?: IAppRedirect
}
@protobuf.Type.d("tss_hall_appconf_v1_SaveAppRedirectReq")
export class SaveAppRedirectReq extends protobuf.Message<ISaveAppRedirectReq> {
    constructor(properties: Properties<ISaveAppRedirectReq>) {
        super(properties);
        if (properties) {
            if (properties.appRedirect) { this.appRedirect = AppRedirect.create(properties.appRedirect) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_appconf_v1_AppRedirect", "optional")
    public appRedirect?: AppRedirect|null
}
export interface IListAppRedirectReq {
    category?: number|null
    page?: number|null
    pageSize?: number|null
}
@protobuf.Type.d("tss_hall_appconf_v1_ListAppRedirectReq")
export class ListAppRedirectReq extends protobuf.Message<IListAppRedirectReq> {
    constructor(properties: Properties<IListAppRedirectReq>) {
        super(properties);
        if (properties) {
            if (properties.category) { this.category = properties.category }
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public category?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public pageSize?: number|null = 0
}
export interface IListAppRedirectResp {
    appRedirectList?: IAppRedirect[]
    total?: number|null
}
@protobuf.Type.d("tss_hall_appconf_v1_ListAppRedirectResp")
export class ListAppRedirectResp extends protobuf.Message<IListAppRedirectResp> {
    constructor(properties: Properties<IListAppRedirectResp>) {
        super(properties);
        if (properties) {
            if (properties.appRedirectList) { this.appRedirectList = []; properties.appRedirectList.forEach((value, index)=>{this.appRedirectList[index] = AppRedirect.create(properties.appRedirectList[index]) as any})}
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "tss_hall_appconf_v1_AppRedirect", "repeated")
    public appRedirectList?: AppRedirect[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public total?: number|null = 0
}
export interface IGetAppRedirectCategoryReq {
    id?: number|null
}
@protobuf.Type.d("tss_hall_appconf_v1_GetAppRedirectCategoryReq")
export class GetAppRedirectCategoryReq extends protobuf.Message<IGetAppRedirectCategoryReq> {
    constructor(properties: Properties<IGetAppRedirectCategoryReq>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public id?: number|null = 0
}
export interface IGetAppRedirectCategoryResp {
    appRedirectCategory?: IAppRedirectCategory
}
@protobuf.Type.d("tss_hall_appconf_v1_GetAppRedirectCategoryResp")
export class GetAppRedirectCategoryResp extends protobuf.Message<IGetAppRedirectCategoryResp> {
    constructor(properties: Properties<IGetAppRedirectCategoryResp>) {
        super(properties);
        if (properties) {
            if (properties.appRedirectCategory) { this.appRedirectCategory = AppRedirectCategory.create(properties.appRedirectCategory) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_appconf_v1_AppRedirectCategory", "optional")
    public appRedirectCategory?: AppRedirectCategory|null
}
export interface IListAppRedirectCategoryResp {
    categoryList?: IAppRedirectCategory[]
}
@protobuf.Type.d("tss_hall_appconf_v1_ListAppRedirectCategoryResp")
export class ListAppRedirectCategoryResp extends protobuf.Message<IListAppRedirectCategoryResp> {
    constructor(properties: Properties<IListAppRedirectCategoryResp>) {
        super(properties);
        if (properties) {
            if (properties.categoryList) { this.categoryList = []; properties.categoryList.forEach((value, index)=>{this.categoryList[index] = AppRedirectCategory.create(properties.categoryList[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_appconf_v1_AppRedirectCategory", "repeated")
    public categoryList?: AppRedirectCategory[] = []
}
export interface IGetAppConfByEnumReq {
    confKey?: AppConfKey|null
}
@protobuf.Type.d("tss_hall_appconf_v1_GetAppConfByEnumReq")
export class GetAppConfByEnumReq extends protobuf.Message<IGetAppConfByEnumReq> {
    constructor(properties: Properties<IGetAppConfByEnumReq>) {
        super(properties);
        if (properties) {
            if (properties.confKey) { this.confKey = properties.confKey }
        }
	}
    @protobuf.Field.d(1, AppConfKey, "optional", AppConfKey.KeyUnknown)
    public confKey?: AppConfKey|null = AppConfKey.KeyUnknown
}
export interface IGetAppConfByEnumResp {
    conf?: IAppConf
}
@protobuf.Type.d("tss_hall_appconf_v1_GetAppConfByEnumResp")
export class GetAppConfByEnumResp extends protobuf.Message<IGetAppConfByEnumResp> {
    constructor(properties: Properties<IGetAppConfByEnumResp>) {
        super(properties);
        if (properties) {
            if (properties.conf) { this.conf = AppConf.create(properties.conf) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_appconf_v1_AppConf", "optional")
    public conf?: AppConf|null
}
class $Conf extends RpcService {
    async GetAppConf(req: IGetAppConfReq, params?: RpcParams) : Promise<{err:number, resp:IGetAppConfResp}> {
        let data = GetAppConfReq.create(req)
        this.onBeforeReq("GetAppConf", data, params)
        const buffer = GetAppConfReq.encode(data).finish()
        let [err, pack] = await this.call("GetAppConf", buffer, params)
        if (err) {
            this.onBeforeResp("GetAppConf", err)
            return {err: err, resp: null}
        } else {
            let resp = GetAppConfResp.decode(pack) as any
            this.onBeforeResp("GetAppConf", err, resp)
            return {err: null, resp: resp}
        }
    }
    async CMSGetAppConf(req: ICMSGetAppConfReq, params?: RpcParams) : Promise<{err:number, resp:ICMSGetAppConfResp}> {
        let data = CMSGetAppConfReq.create(req)
        this.onBeforeReq("CMSGetAppConf", data, params)
        const buffer = CMSGetAppConfReq.encode(data).finish()
        let [err, pack] = await this.call("CMSGetAppConf", buffer, params)
        if (err) {
            this.onBeforeResp("CMSGetAppConf", err)
            return {err: err, resp: null}
        } else {
            let resp = CMSGetAppConfResp.decode(pack) as any
            this.onBeforeResp("CMSGetAppConf", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListAppConf(req: IListAppConfReq, params?: RpcParams) : Promise<{err:number, resp:IListAppConfResp}> {
        let data = ListAppConfReq.create(req)
        this.onBeforeReq("ListAppConf", data, params)
        const buffer = ListAppConfReq.encode(data).finish()
        let [err, pack] = await this.call("ListAppConf", buffer, params)
        if (err) {
            this.onBeforeResp("ListAppConf", err)
            return {err: err, resp: null}
        } else {
            let resp = ListAppConfResp.decode(pack) as any
            this.onBeforeResp("ListAppConf", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DeleteAppConf(req: IDeleteAppConfReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = DeleteAppConfReq.create(req)
        this.onBeforeReq("DeleteAppConf", data, params)
        const buffer = DeleteAppConfReq.encode(data).finish()
        let [err, pack] = await this.call("DeleteAppConf", buffer, params)
        if (err) {
            this.onBeforeResp("DeleteAppConf", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("DeleteAppConf", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetAppConf(req: IBatchGetAppConfReq, params?: RpcParams) : Promise<{err:number, resp:IBatchGetAppConfResp}> {
        let data = BatchGetAppConfReq.create(req)
        this.onBeforeReq("BatchGetAppConf", data, params)
        const buffer = BatchGetAppConfReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetAppConf", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetAppConf", err)
            return {err: err, resp: null}
        } else {
            let resp = BatchGetAppConfResp.decode(pack) as any
            this.onBeforeResp("BatchGetAppConf", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetAppConfByEnum(req: IGetAppConfByEnumReq, params?: RpcParams) : Promise<{err:number, resp:IGetAppConfByEnumResp}> {
        let data = GetAppConfByEnumReq.create(req)
        this.onBeforeReq("GetAppConfByEnum", data, params)
        const buffer = GetAppConfByEnumReq.encode(data).finish()
        let [err, pack] = await this.call("GetAppConfByEnum", buffer, params)
        if (err) {
            this.onBeforeResp("GetAppConfByEnum", err)
            return {err: err, resp: null}
        } else {
            let resp = GetAppConfByEnumResp.decode(pack) as any
            this.onBeforeResp("GetAppConfByEnum", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetLoadingPageConf(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:IGetLoadingPageConfResp}> {
        let data = base_Void.create(req)
        this.onBeforeReq("GetLoadingPageConf", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("GetLoadingPageConf", buffer, params)
        if (err) {
            this.onBeforeResp("GetLoadingPageConf", err)
            return {err: err, resp: null}
        } else {
            let resp = GetLoadingPageConfResp.decode(pack) as any
            this.onBeforeResp("GetLoadingPageConf", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SaveAppConf(req: ISaveAppConfReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = SaveAppConfReq.create(req)
        this.onBeforeReq("SaveAppConf", data, params)
        const buffer = SaveAppConfReq.encode(data).finish()
        let [err, pack] = await this.call("SaveAppConf", buffer, params)
        if (err) {
            this.onBeforeResp("SaveAppConf", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("SaveAppConf", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListOperationLog(req: IListOperationLogReq, params?: RpcParams) : Promise<{err:number, resp:IListOperationLogResp}> {
        let data = ListOperationLogReq.create(req)
        this.onBeforeReq("ListOperationLog", data, params)
        const buffer = ListOperationLogReq.encode(data).finish()
        let [err, pack] = await this.call("ListOperationLog", buffer, params)
        if (err) {
            this.onBeforeResp("ListOperationLog", err)
            return {err: err, resp: null}
        } else {
            let resp = ListOperationLogResp.decode(pack) as any
            this.onBeforeResp("ListOperationLog", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListHomePopup(req: IListHomePopupReq, params?: RpcParams) : Promise<{err:number, resp:IListHomePopupResp}> {
        let data = ListHomePopupReq.create(req)
        this.onBeforeReq("ListHomePopup", data, params)
        const buffer = ListHomePopupReq.encode(data).finish()
        let [err, pack] = await this.call("ListHomePopup", buffer, params)
        if (err) {
            this.onBeforeResp("ListHomePopup", err)
            return {err: err, resp: null}
        } else {
            let resp = ListHomePopupResp.decode(pack) as any
            this.onBeforeResp("ListHomePopup", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SaveHomePopup(req: ISaveHomePopupSeqReq, params?: RpcParams) : Promise<{err:number, resp:ISaveHomePopupSeqResp}> {
        let data = SaveHomePopupSeqReq.create(req)
        this.onBeforeReq("SaveHomePopup", data, params)
        const buffer = SaveHomePopupSeqReq.encode(data).finish()
        let [err, pack] = await this.call("SaveHomePopup", buffer, params)
        if (err) {
            this.onBeforeResp("SaveHomePopup", err)
            return {err: err, resp: null}
        } else {
            let resp = SaveHomePopupSeqResp.decode(pack) as any
            this.onBeforeResp("SaveHomePopup", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetHomePopup(req: IGetHomePopupReq, params?: RpcParams) : Promise<{err:number, resp:IGetHomePopupResp}> {
        let data = GetHomePopupReq.create(req)
        this.onBeforeReq("GetHomePopup", data, params)
        const buffer = GetHomePopupReq.encode(data).finish()
        let [err, pack] = await this.call("GetHomePopup", buffer, params)
        if (err) {
            this.onBeforeResp("GetHomePopup", err)
            return {err: err, resp: null}
        } else {
            let resp = GetHomePopupResp.decode(pack) as any
            this.onBeforeResp("GetHomePopup", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetUpdateLoadingPageConf(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:IGetUpdateLoadingPageConfResp}> {
        let data = base_Void.create(req)
        this.onBeforeReq("GetUpdateLoadingPageConf", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("GetUpdateLoadingPageConf", buffer, params)
        if (err) {
            this.onBeforeResp("GetUpdateLoadingPageConf", err)
            return {err: err, resp: null}
        } else {
            let resp = GetUpdateLoadingPageConfResp.decode(pack) as any
            this.onBeforeResp("GetUpdateLoadingPageConf", err, resp)
            return {err: null, resp: resp}
        }
    }
    async UpsertUpdateLoadingPageConf(req: IUpsertUpdateLoadingPageConfReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = UpsertUpdateLoadingPageConfReq.create(req)
        this.onBeforeReq("UpsertUpdateLoadingPageConf", data, params)
        const buffer = UpsertUpdateLoadingPageConfReq.encode(data).finish()
        let [err, pack] = await this.call("UpsertUpdateLoadingPageConf", buffer, params)
        if (err) {
            this.onBeforeResp("UpsertUpdateLoadingPageConf", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("UpsertUpdateLoadingPageConf", err, resp)
            return {err: null, resp: resp}
        }
    }
    async UpsertMatchLoadingPageConf(req: IUpsertMatchLoadingPageConfReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = UpsertMatchLoadingPageConfReq.create(req)
        this.onBeforeReq("UpsertMatchLoadingPageConf", data, params)
        const buffer = UpsertMatchLoadingPageConfReq.encode(data).finish()
        let [err, pack] = await this.call("UpsertMatchLoadingPageConf", buffer, params)
        if (err) {
            this.onBeforeResp("UpsertMatchLoadingPageConf", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("UpsertMatchLoadingPageConf", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetMatchLoadingPageConf(req: IGetMatchLoadingPageConfReq, params?: RpcParams) : Promise<{err:number, resp:IGetMatchLoadingPageConfResp}> {
        let data = GetMatchLoadingPageConfReq.create(req)
        this.onBeforeReq("GetMatchLoadingPageConf", data, params)
        const buffer = GetMatchLoadingPageConfReq.encode(data).finish()
        let [err, pack] = await this.call("GetMatchLoadingPageConf", buffer, params)
        if (err) {
            this.onBeforeResp("GetMatchLoadingPageConf", err)
            return {err: err, resp: null}
        } else {
            let resp = GetMatchLoadingPageConfResp.decode(pack) as any
            this.onBeforeResp("GetMatchLoadingPageConf", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListMatchLoadingPageConf(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:IListMatchLoadingPageConfResp}> {
        let data = base_Void.create(req)
        this.onBeforeReq("ListMatchLoadingPageConf", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("ListMatchLoadingPageConf", buffer, params)
        if (err) {
            this.onBeforeResp("ListMatchLoadingPageConf", err)
            return {err: err, resp: null}
        } else {
            let resp = ListMatchLoadingPageConfResp.decode(pack) as any
            this.onBeforeResp("ListMatchLoadingPageConf", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DeleteMatchLoadingPageConf(req: IDeleteMatchLoadingPageConfReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = DeleteMatchLoadingPageConfReq.create(req)
        this.onBeforeReq("DeleteMatchLoadingPageConf", data, params)
        const buffer = DeleteMatchLoadingPageConfReq.encode(data).finish()
        let [err, pack] = await this.call("DeleteMatchLoadingPageConf", buffer, params)
        if (err) {
            this.onBeforeResp("DeleteMatchLoadingPageConf", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("DeleteMatchLoadingPageConf", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListFloatingWindowConf(req: IListFloatingWindowConfReq, params?: RpcParams) : Promise<{err:number, resp:IListFloatingWindowConfResp}> {
        let data = ListFloatingWindowConfReq.create(req)
        this.onBeforeReq("ListFloatingWindowConf", data, params)
        const buffer = ListFloatingWindowConfReq.encode(data).finish()
        let [err, pack] = await this.call("ListFloatingWindowConf", buffer, params)
        if (err) {
            this.onBeforeResp("ListFloatingWindowConf", err)
            return {err: err, resp: null}
        } else {
            let resp = ListFloatingWindowConfResp.decode(pack) as any
            this.onBeforeResp("ListFloatingWindowConf", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetFloatingWindowConf(req: IGetFloatingWindowConfReq, params?: RpcParams) : Promise<{err:number, resp:IGetFloatingWindowConfResp}> {
        let data = GetFloatingWindowConfReq.create(req)
        this.onBeforeReq("GetFloatingWindowConf", data, params)
        const buffer = GetFloatingWindowConfReq.encode(data).finish()
        let [err, pack] = await this.call("GetFloatingWindowConf", buffer, params)
        if (err) {
            this.onBeforeResp("GetFloatingWindowConf", err)
            return {err: err, resp: null}
        } else {
            let resp = GetFloatingWindowConfResp.decode(pack) as any
            this.onBeforeResp("GetFloatingWindowConf", err, resp)
            return {err: null, resp: resp}
        }
    }
    async UpsertFloatingWindowConf(req: IUpsertFloatingWindowConfReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = UpsertFloatingWindowConfReq.create(req)
        this.onBeforeReq("UpsertFloatingWindowConf", data, params)
        const buffer = UpsertFloatingWindowConfReq.encode(data).finish()
        let [err, pack] = await this.call("UpsertFloatingWindowConf", buffer, params)
        if (err) {
            this.onBeforeResp("UpsertFloatingWindowConf", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("UpsertFloatingWindowConf", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SortFloatingWindowConf(req: ISortFloatingWindowConfReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = SortFloatingWindowConfReq.create(req)
        this.onBeforeReq("SortFloatingWindowConf", data, params)
        const buffer = SortFloatingWindowConfReq.encode(data).finish()
        let [err, pack] = await this.call("SortFloatingWindowConf", buffer, params)
        if (err) {
            this.onBeforeResp("SortFloatingWindowConf", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("SortFloatingWindowConf", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetAssignedFloatingWindowConf(req: IGetAssignedFloatingWindowConfReq, params?: RpcParams) : Promise<{err:number, resp:IGetAssignedFloatingWindowConfResp}> {
        let data = GetAssignedFloatingWindowConfReq.create(req)
        this.onBeforeReq("GetAssignedFloatingWindowConf", data, params)
        const buffer = GetAssignedFloatingWindowConfReq.encode(data).finish()
        let [err, pack] = await this.call("GetAssignedFloatingWindowConf", buffer, params)
        if (err) {
            this.onBeforeResp("GetAssignedFloatingWindowConf", err)
            return {err: err, resp: null}
        } else {
            let resp = GetAssignedFloatingWindowConfResp.decode(pack) as any
            this.onBeforeResp("GetAssignedFloatingWindowConf", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetAppRedirect(req: IGetAppRedirectReq, params?: RpcParams) : Promise<{err:number, resp:IGetAppRedirectResp}> {
        let data = GetAppRedirectReq.create(req)
        this.onBeforeReq("GetAppRedirect", data, params)
        const buffer = GetAppRedirectReq.encode(data).finish()
        let [err, pack] = await this.call("GetAppRedirect", buffer, params)
        if (err) {
            this.onBeforeResp("GetAppRedirect", err)
            return {err: err, resp: null}
        } else {
            let resp = GetAppRedirectResp.decode(pack) as any
            this.onBeforeResp("GetAppRedirect", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SaveAppRedirect(req: ISaveAppRedirectReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = SaveAppRedirectReq.create(req)
        this.onBeforeReq("SaveAppRedirect", data, params)
        const buffer = SaveAppRedirectReq.encode(data).finish()
        let [err, pack] = await this.call("SaveAppRedirect", buffer, params)
        if (err) {
            this.onBeforeResp("SaveAppRedirect", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("SaveAppRedirect", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListAppRedirect(req: IListAppRedirectReq, params?: RpcParams) : Promise<{err:number, resp:IListAppRedirectResp}> {
        let data = ListAppRedirectReq.create(req)
        this.onBeforeReq("ListAppRedirect", data, params)
        const buffer = ListAppRedirectReq.encode(data).finish()
        let [err, pack] = await this.call("ListAppRedirect", buffer, params)
        if (err) {
            this.onBeforeResp("ListAppRedirect", err)
            return {err: err, resp: null}
        } else {
            let resp = ListAppRedirectResp.decode(pack) as any
            this.onBeforeResp("ListAppRedirect", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DeleteAppRedirect(req: IGetAppRedirectReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = GetAppRedirectReq.create(req)
        this.onBeforeReq("DeleteAppRedirect", data, params)
        const buffer = GetAppRedirectReq.encode(data).finish()
        let [err, pack] = await this.call("DeleteAppRedirect", buffer, params)
        if (err) {
            this.onBeforeResp("DeleteAppRedirect", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("DeleteAppRedirect", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetAppRedirectCategory(req: IGetAppRedirectCategoryReq, params?: RpcParams) : Promise<{err:number, resp:IGetAppRedirectCategoryResp}> {
        let data = GetAppRedirectCategoryReq.create(req)
        this.onBeforeReq("GetAppRedirectCategory", data, params)
        const buffer = GetAppRedirectCategoryReq.encode(data).finish()
        let [err, pack] = await this.call("GetAppRedirectCategory", buffer, params)
        if (err) {
            this.onBeforeResp("GetAppRedirectCategory", err)
            return {err: err, resp: null}
        } else {
            let resp = GetAppRedirectCategoryResp.decode(pack) as any
            this.onBeforeResp("GetAppRedirectCategory", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListAppRedirectCategory(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:IListAppRedirectCategoryResp}> {
        let data = base_Void.create(req)
        this.onBeforeReq("ListAppRedirectCategory", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("ListAppRedirectCategory", buffer, params)
        if (err) {
            this.onBeforeResp("ListAppRedirectCategory", err)
            return {err: err, resp: null}
        } else {
            let resp = ListAppRedirectCategoryResp.decode(pack) as any
            this.onBeforeResp("ListAppRedirectCategory", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SaveAppRedirectCategory(req: IAppRedirectCategory, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = AppRedirectCategory.create(req)
        this.onBeforeReq("SaveAppRedirectCategory", data, params)
        const buffer = AppRedirectCategory.encode(data).finish()
        let [err, pack] = await this.call("SaveAppRedirectCategory", buffer, params)
        if (err) {
            this.onBeforeResp("SaveAppRedirectCategory", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("SaveAppRedirectCategory", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DeleteAppRedirectCategory(req: IGetAppRedirectCategoryReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = GetAppRedirectCategoryReq.create(req)
        this.onBeforeReq("DeleteAppRedirectCategory", data, params)
        const buffer = GetAppRedirectCategoryReq.encode(data).finish()
        let [err, pack] = await this.call("DeleteAppRedirectCategory", buffer, params)
        if (err) {
            this.onBeforeResp("DeleteAppRedirectCategory", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("DeleteAppRedirectCategory", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetAppRedirectCategoryForSync(req: base_IBatchGetResourceReq, params?: RpcParams) : Promise<{err:number, resp:base_IBatchGetResourceResp}> {
        let data = base_BatchGetResourceReq.create(req)
        this.onBeforeReq("BatchGetAppRedirectCategoryForSync", data, params)
        const buffer = base_BatchGetResourceReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetAppRedirectCategoryForSync", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetAppRedirectCategoryForSync", err)
            return {err: err, resp: null}
        } else {
            let resp = base_BatchGetResourceResp.decode(pack) as any
            this.onBeforeResp("BatchGetAppRedirectCategoryForSync", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetAppRedirectForSync(req: base_IBatchGetResourceReq, params?: RpcParams) : Promise<{err:number, resp:base_IBatchGetResourceResp}> {
        let data = base_BatchGetResourceReq.create(req)
        this.onBeforeReq("BatchGetAppRedirectForSync", data, params)
        const buffer = base_BatchGetResourceReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetAppRedirectForSync", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetAppRedirectForSync", err)
            return {err: err, resp: null}
        } else {
            let resp = base_BatchGetResourceResp.decode(pack) as any
            this.onBeforeResp("BatchGetAppRedirectForSync", err, resp)
            return {err: null, resp: resp}
        }
    }
}
export const Conf = new $Conf({
    name: "tss.hall.appconf.v1",
})
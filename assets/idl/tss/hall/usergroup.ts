import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  Void as base_Void,IVoid as base_IVoid ,  } from "idl/base/base"
import {  State as tss_common_State ,  SysMailBody as tss_common_SysMailBody,ISysMailBody as tss_common_ISysMailBody ,  Asset as tss_common_Asset,IAsset as tss_common_IAsset ,  } from "idl/tss/common/common_define"
import {  GroupType as tss_common_GroupType ,  GroupParams as tss_common_GroupParams,IGroupParams as tss_common_IGroupParams ,  } from "idl/tss/common/common_usergroup"
export enum ResourceOperateType {  
    ResourceOperateTypeUnknown = 0,  
    AddGroup = 1,  
    DelGroup = 2,  
    AddUser = 3,  
    DelUser = 4,  
    CreateGroup = 5,  
    UpdateGroup = 6,  
    EnableGroup = 7,  
    DisableGroup = 8,  
    CreateOperationStrategy = 9,  
    UpdateOperationStrategy = 10,  
    DeleteOperationStrategy = 11,  
    EnableOperationStrategy = 12,  
    DisableOperationStrategy = 13,
}
export enum SQLTemplateType {  
    SQLTemplateTypeUnknown = 0,  
    SQLTemplateTypePlayTime = 1,  
    SQLTemplateTypeRFMExchange = 2,  
    SQLTemplateTypeRFMActivity = 3,  
    SQLTemplateTypeExchangeWish = 4,  
    SQLTemplateTypeConsumeCount = 5,  
    SQLTemplateTypeConsumeRMB = 6,  
    SQLTemplateTypeExchangeCombine = 7,  
    SQLTemplateTypeExchange = 8,  
    SQLTemplateTypeUserMung = 9,  
    SQLTemplateTypeCouponSensitivity = 10,  
    SQLTemplateTypeExchangeCategory = 11,  
    SQLTemplateTypeActivityVitality = 12,  
    SQLTemplateTypeFastMatchJoinNum = 13,  
    SQLTemplateTypeBigPrizeMatchJoinNum = 14,  
    SQLTemplateTypePrizeMallVisitNum = 15,  
    SQLTemplateTypePrizeMallVisitCategory = 16,  
    SQLTemplateTypePrizeMallVisitPriceRange = 17,  
    SQLTemplateTypeUserTicketRemainRange = 18,  
    SQLTemplateTypeDailyTaskFinishRange = 19,
}
export enum SetCalcType {  
    SetCalcTypeUnknown = 0,  
    SetCalcTypeIntersection = 1,  
    SetCalcTypeUnion = 2,
}
export enum StrategyType {  
    StrategyTypeUnknown = 0,  
    StrategyTypeOneTime = 1,  
    StrategyContinued = 2,
}
export enum StrategyUserFrequencyType {  
    StrategyUserFrequencyTypeUnknown = 0,  
    StrategyUserFrequencyTypeDay = 1,  
    StrategyUserFrequencyTypeWeek = 2,  
    StrategyUserFrequencyTypeMonth = 3,  
    StrategyUserFrequencyTypeYear = 4,
}
export enum StrategyExecuteType {  
    StrategyExecuteTypeUnknow = 0,  
    StrategyExecuteTypeMail = 1,  
    StrategyPushMsg = 2,
}
export enum PushMode {  
    Precise = 0,  
    Fuzzy = 1,
}
export enum PushType {  
    Uids = 0,  
    All = 2,  
    Group = 3,
}
export interface ICreateUserGroupReq {
    group?: IUserGroup
}
@protobuf.Type.d("tss_hall_usergroup_CreateUserGroupReq")
export class CreateUserGroupReq extends protobuf.Message<ICreateUserGroupReq> {
    constructor(properties: Properties<ICreateUserGroupReq>) {
        super(properties);
        if (properties) {
            if (properties.group) { this.group = UserGroup.create(properties.group) as any }
        }
	}
    @protobuf.Field.d(6, "tss_hall_usergroup_UserGroup", "optional")
    public group?: UserGroup|null
}
export interface IBankruptConf {
    BankruptProtect?: number|null
    MaxBankruptProtectPerDay?: number|null
}
@protobuf.Type.d("tss_hall_usergroup_BankruptConf")
export class BankruptConf extends protobuf.Message<IBankruptConf> {
    constructor(properties: Properties<IBankruptConf>) {
        super(properties);
        if (properties) {
            if (properties.BankruptProtect) { this.BankruptProtect = properties.BankruptProtect }
            if (properties.MaxBankruptProtectPerDay) { this.MaxBankruptProtectPerDay = properties.MaxBankruptProtectPerDay }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public BankruptProtect?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public MaxBankruptProtectPerDay?: number|null = 0
}
export interface IBackV2Conf {
    backTime?: number|null
}
@protobuf.Type.d("tss_hall_usergroup_BackV2Conf")
export class BackV2Conf extends protobuf.Message<IBackV2Conf> {
    constructor(properties: Properties<IBackV2Conf>) {
        super(properties);
        if (properties) {
            if (properties.backTime) { this.backTime = properties.backTime }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public backTime?: number|null = 0
}
export interface IDeleteUserGroupReq {
    GroupID?: string|null
    OperatorName?: string|null
}
@protobuf.Type.d("tss_hall_usergroup_DeleteUserGroupReq")
export class DeleteUserGroupReq extends protobuf.Message<IDeleteUserGroupReq> {
    constructor(properties: Properties<IDeleteUserGroupReq>) {
        super(properties);
        if (properties) {
            if (properties.GroupID) { this.GroupID = properties.GroupID }
            if (properties.OperatorName) { this.OperatorName = properties.OperatorName }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public GroupID?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public OperatorName?: string|null = ""
}
export interface IListUserGroupReq {
    CurPage?: number|null
    ShowNum?: number|null
}
@protobuf.Type.d("tss_hall_usergroup_ListUserGroupReq")
export class ListUserGroupReq extends protobuf.Message<IListUserGroupReq> {
    constructor(properties: Properties<IListUserGroupReq>) {
        super(properties);
        if (properties) {
            if (properties.CurPage) { this.CurPage = properties.CurPage }
            if (properties.ShowNum) { this.ShowNum = properties.ShowNum }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public CurPage?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public ShowNum?: number|null = 0
}
export interface IExtraConf {
    bankruptConf?: IBankruptConf
    backV2Conf?: IBackV2Conf
}
@protobuf.Type.d("tss_hall_usergroup_ExtraConf")
export class ExtraConf extends protobuf.Message<IExtraConf> {
    constructor(properties: Properties<IExtraConf>) {
        super(properties);
        if (properties) {
            if (properties.bankruptConf) { this.bankruptConf = BankruptConf.create(properties.bankruptConf) as any }
            if (properties.backV2Conf) { this.backV2Conf = BackV2Conf.create(properties.backV2Conf) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_usergroup_BankruptConf", "optional")
    public bankruptConf?: BankruptConf|null
    @protobuf.Field.d(2, "tss_hall_usergroup_BackV2Conf", "optional")
    public backV2Conf?: BackV2Conf|null
}
export interface ISQLTemplate {
    templateID?: SQLTemplateType|null
    template?: string|null
    minDu?: number|null
    maxDu?: number|null
    days?: number|null
    beginAt?: number|null
    endAt?: number|null
    judgeSymbol1?: string|null
    judgeSymbol2?: string|null
    judgeSymbol3?: string|null
    min?: number|null
    max?: number|null
    tabID?: number|null
    calcType?: SetCalcType|null
}
@protobuf.Type.d("tss_hall_usergroup_SQLTemplate")
export class SQLTemplate extends protobuf.Message<ISQLTemplate> {
    constructor(properties: Properties<ISQLTemplate>) {
        super(properties);
        if (properties) {
            if (properties.templateID) { this.templateID = properties.templateID }
            if (properties.template) { this.template = properties.template }
            if (properties.minDu) { this.minDu = properties.minDu }
            if (properties.maxDu) { this.maxDu = properties.maxDu }
            if (properties.days) { this.days = properties.days }
            if (properties.beginAt) { this.beginAt = properties.beginAt }
            if (properties.endAt) { this.endAt = properties.endAt }
            if (properties.judgeSymbol1) { this.judgeSymbol1 = properties.judgeSymbol1 }
            if (properties.judgeSymbol2) { this.judgeSymbol2 = properties.judgeSymbol2 }
            if (properties.judgeSymbol3) { this.judgeSymbol3 = properties.judgeSymbol3 }
            if (properties.min) { this.min = properties.min }
            if (properties.max) { this.max = properties.max }
            if (properties.tabID) { this.tabID = properties.tabID }
            if (properties.calcType) { this.calcType = properties.calcType }
        }
	}
    @protobuf.Field.d(1, SQLTemplateType, "optional", SQLTemplateType.SQLTemplateTypeUnknown)
    public templateID?: SQLTemplateType|null = SQLTemplateType.SQLTemplateTypeUnknown
    @protobuf.Field.d(2, "string", "optional", )
    public template?: string|null = ""
    @protobuf.Field.d(3, "int64", "optional", 0)
    public minDu?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public maxDu?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public days?: number|null = 0
    @protobuf.Field.d(6, "int64", "optional", 0)
    public beginAt?: number|null = 0
    @protobuf.Field.d(7, "int64", "optional", 0)
    public endAt?: number|null = 0
    @protobuf.Field.d(8, "string", "optional", )
    public judgeSymbol1?: string|null = ""
    @protobuf.Field.d(9, "string", "optional", )
    public judgeSymbol2?: string|null = ""
    @protobuf.Field.d(10, "string", "optional", )
    public judgeSymbol3?: string|null = ""
    @protobuf.Field.d(11, "int64", "optional", 0)
    public min?: number|null = 0
    @protobuf.Field.d(12, "int64", "optional", 0)
    public max?: number|null = 0
    @protobuf.Field.d(13, "int64", "optional", 0)
    public tabID?: number|null = 0
    @protobuf.Field.d(14, SetCalcType, "optional", SetCalcType.SetCalcTypeUnknown)
    public calcType?: SetCalcType|null = SetCalcType.SetCalcTypeUnknown
}
export interface IExtra {
    value?: number|null
}
@protobuf.Type.d("tss_hall_usergroup_Extra")
export class Extra extends protobuf.Message<IExtra> {
    constructor(properties: Properties<IExtra>) {
        super(properties);
        if (properties) {
            if (properties.value) { this.value = properties.value }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public value?: number|null = 0
}
export interface IUserGroup {
    GroupID?: string|null
    GroupName?: string|null
    GroupDesc?: string|null
    OperatorName?: string|null
    Type?: tss_common_GroupType|null
    CreatedAt?: number|null
    UpdatedAt?: number|null
    state?: tss_common_State|null
    chartID?: string|null
    uids?: number[]
    sqlTmpls?: ISQLTemplate[]
    Conf?: IExtraConf
    extra?: IExtra
}
@protobuf.Type.d("tss_hall_usergroup_UserGroup")
export class UserGroup extends protobuf.Message<IUserGroup> {
    constructor(properties: Properties<IUserGroup>) {
        super(properties);
        if (properties) {
            if (properties.GroupID) { this.GroupID = properties.GroupID }
            if (properties.GroupName) { this.GroupName = properties.GroupName }
            if (properties.GroupDesc) { this.GroupDesc = properties.GroupDesc }
            if (properties.OperatorName) { this.OperatorName = properties.OperatorName }
            if (properties.Type) { this.Type = properties.Type }
            if (properties.CreatedAt) { this.CreatedAt = properties.CreatedAt }
            if (properties.UpdatedAt) { this.UpdatedAt = properties.UpdatedAt }
            if (properties.state) { this.state = properties.state }
            if (properties.chartID) { this.chartID = properties.chartID }
            if (properties.uids) { this.uids = []; properties.uids.forEach((value, index)=>{this.uids[index] = properties.uids[index]})}
            if (properties.sqlTmpls) { this.sqlTmpls = []; properties.sqlTmpls.forEach((value, index)=>{this.sqlTmpls[index] = SQLTemplate.create(properties.sqlTmpls[index]) as any})}
            if (properties.Conf) { this.Conf = ExtraConf.create(properties.Conf) as any }
            if (properties.extra) { this.extra = Extra.create(properties.extra) as any }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public GroupID?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public GroupName?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public GroupDesc?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public OperatorName?: string|null = ""
    @protobuf.Field.d(5, tss_common_GroupType, "optional", tss_common_GroupType.GroupTypeUnknown)
    public Type?: tss_common_GroupType|null = tss_common_GroupType.GroupTypeUnknown
    @protobuf.Field.d(6, "int64", "optional", 0)
    public CreatedAt?: number|null = 0
    @protobuf.Field.d(7, "int64", "optional", 0)
    public UpdatedAt?: number|null = 0
    @protobuf.Field.d(8, tss_common_State, "optional", tss_common_State.StateUnknown)
    public state?: tss_common_State|null = tss_common_State.StateUnknown
    @protobuf.Field.d(9, "string", "optional", )
    public chartID?: string|null = ""
    @protobuf.Field.d(10, "int64", "repeated", [])
    public uids?: number[] = []
    @protobuf.Field.d(12, "tss_hall_usergroup_SQLTemplate", "repeated")
    public sqlTmpls?: SQLTemplate[] = []
    @protobuf.Field.d(13, "tss_hall_usergroup_ExtraConf", "optional")
    public Conf?: ExtraConf|null
    @protobuf.Field.d(14, "tss_hall_usergroup_Extra", "optional")
    public extra?: Extra|null
}
export interface IListUserGroupResp {
    UserGroups?: IUserGroup[]
    CurPage?: number|null
    Total?: number|null
}
@protobuf.Type.d("tss_hall_usergroup_ListUserGroupResp")
export class ListUserGroupResp extends protobuf.Message<IListUserGroupResp> {
    constructor(properties: Properties<IListUserGroupResp>) {
        super(properties);
        if (properties) {
            if (properties.UserGroups) { this.UserGroups = []; properties.UserGroups.forEach((value, index)=>{this.UserGroups[index] = UserGroup.create(properties.UserGroups[index]) as any})}
            if (properties.CurPage) { this.CurPage = properties.CurPage }
            if (properties.Total) { this.Total = properties.Total }
        }
	}
    @protobuf.Field.d(1, "tss_hall_usergroup_UserGroup", "repeated")
    public UserGroups?: UserGroup[] = []
    @protobuf.Field.d(2, "int32", "optional", 0)
    public CurPage?: number|null = 0
    @protobuf.Field.d(3, "int32", "optional", 0)
    public Total?: number|null = 0
}
export interface IUpdateUserGroupReq {
    group?: IUserGroup
}
@protobuf.Type.d("tss_hall_usergroup_UpdateUserGroupReq")
export class UpdateUserGroupReq extends protobuf.Message<IUpdateUserGroupReq> {
    constructor(properties: Properties<IUpdateUserGroupReq>) {
        super(properties);
        if (properties) {
            if (properties.group) { this.group = UserGroup.create(properties.group) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_usergroup_UserGroup", "optional")
    public group?: UserGroup|null
}
export interface IUpdateUserGroupResp {
    group?: IUserGroup
}
@protobuf.Type.d("tss_hall_usergroup_UpdateUserGroupResp")
export class UpdateUserGroupResp extends protobuf.Message<IUpdateUserGroupResp> {
    constructor(properties: Properties<IUpdateUserGroupResp>) {
        super(properties);
        if (properties) {
            if (properties.group) { this.group = UserGroup.create(properties.group) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_usergroup_UserGroup", "optional")
    public group?: UserGroup|null
}
export interface ISearchUserGroupReq {
    MatchStr?: string|null
    CurPage?: number|null
    ShowNum?: number|null
}
@protobuf.Type.d("tss_hall_usergroup_SearchUserGroupReq")
export class SearchUserGroupReq extends protobuf.Message<ISearchUserGroupReq> {
    constructor(properties: Properties<ISearchUserGroupReq>) {
        super(properties);
        if (properties) {
            if (properties.MatchStr) { this.MatchStr = properties.MatchStr }
            if (properties.CurPage) { this.CurPage = properties.CurPage }
            if (properties.ShowNum) { this.ShowNum = properties.ShowNum }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public MatchStr?: string|null = ""
    @protobuf.Field.d(2, "int32", "optional", 0)
    public CurPage?: number|null = 0
    @protobuf.Field.d(3, "int32", "optional", 0)
    public ShowNum?: number|null = 0
}
export interface ISearchUserGroupResp {
    UserGroups?: IUserGroup[]
    CurPage?: number|null
    Total?: number|null
}
@protobuf.Type.d("tss_hall_usergroup_SearchUserGroupResp")
export class SearchUserGroupResp extends protobuf.Message<ISearchUserGroupResp> {
    constructor(properties: Properties<ISearchUserGroupResp>) {
        super(properties);
        if (properties) {
            if (properties.UserGroups) { this.UserGroups = []; properties.UserGroups.forEach((value, index)=>{this.UserGroups[index] = UserGroup.create(properties.UserGroups[index]) as any})}
            if (properties.CurPage) { this.CurPage = properties.CurPage }
            if (properties.Total) { this.Total = properties.Total }
        }
	}
    @protobuf.Field.d(1, "tss_hall_usergroup_UserGroup", "repeated")
    public UserGroups?: UserGroup[] = []
    @protobuf.Field.d(2, "int32", "optional", 0)
    public CurPage?: number|null = 0
    @protobuf.Field.d(3, "int32", "optional", 0)
    public Total?: number|null = 0
}
export interface IGetGroupReq {
    GroupID?: string|null
}
@protobuf.Type.d("tss_hall_usergroup_GetGroupReq")
export class GetGroupReq extends protobuf.Message<IGetGroupReq> {
    constructor(properties: Properties<IGetGroupReq>) {
        super(properties);
        if (properties) {
            if (properties.GroupID) { this.GroupID = properties.GroupID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public GroupID?: string|null = ""
}
export interface IGetGroupResp {
    group?: IUserGroup
}
@protobuf.Type.d("tss_hall_usergroup_GetGroupResp")
export class GetGroupResp extends protobuf.Message<IGetGroupResp> {
    constructor(properties: Properties<IGetGroupResp>) {
        super(properties);
        if (properties) {
            if (properties.group) { this.group = UserGroup.create(properties.group) as any }
        }
	}
    @protobuf.Field.d(7, "tss_hall_usergroup_UserGroup", "optional")
    public group?: UserGroup|null
}
export interface IAddUserToGroupReq {
    groupID?: string|null
    uid?: number[]
    operatorName?: string|null
}
@protobuf.Type.d("tss_hall_usergroup_AddUserToGroupReq")
export class AddUserToGroupReq extends protobuf.Message<IAddUserToGroupReq> {
    constructor(properties: Properties<IAddUserToGroupReq>) {
        super(properties);
        if (properties) {
            if (properties.groupID) { this.groupID = properties.groupID }
            if (properties.uid) { this.uid = []; properties.uid.forEach((value, index)=>{this.uid[index] = properties.uid[index]})}
            if (properties.operatorName) { this.operatorName = properties.operatorName }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public groupID?: string|null = ""
    @protobuf.Field.d(2, "int64", "repeated", [])
    public uid?: number[] = []
    @protobuf.Field.d(3, "string", "optional", )
    public operatorName?: string|null = ""
}
export interface IRemoveUserFromGroupReq {
    groupID?: string|null
    uid?: number[]
    operatorName?: string|null
}
@protobuf.Type.d("tss_hall_usergroup_RemoveUserFromGroupReq")
export class RemoveUserFromGroupReq extends protobuf.Message<IRemoveUserFromGroupReq> {
    constructor(properties: Properties<IRemoveUserFromGroupReq>) {
        super(properties);
        if (properties) {
            if (properties.groupID) { this.groupID = properties.groupID }
            if (properties.uid) { this.uid = []; properties.uid.forEach((value, index)=>{this.uid[index] = properties.uid[index]})}
            if (properties.operatorName) { this.operatorName = properties.operatorName }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public groupID?: string|null = ""
    @protobuf.Field.d(2, "int64", "repeated", [])
    public uid?: number[] = []
    @protobuf.Field.d(3, "string", "optional", )
    public operatorName?: string|null = ""
}
export interface IListUserOfGroupReq {
    uid?: number|null
    ascByUid?: boolean|null
    page?: number|null
    pageSize?: number|null
    groupID?: string|null
}
@protobuf.Type.d("tss_hall_usergroup_ListUserOfGroupReq")
export class ListUserOfGroupReq extends protobuf.Message<IListUserOfGroupReq> {
    constructor(properties: Properties<IListUserOfGroupReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.ascByUid) { this.ascByUid = properties.ascByUid }
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.groupID) { this.groupID = properties.groupID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "bool", "optional", false)
    public ascByUid?: boolean|null = false
    @protobuf.Field.d(3, "int32", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(4, "int32", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(5, "string", "optional", )
    public groupID?: string|null = ""
}
export interface IUser {
    uid?: number|null
    nickName?: string|null
    avatar?: string|null
    realName?: string|null
    sex?: string|null
}
@protobuf.Type.d("tss_hall_usergroup_User")
export class User extends protobuf.Message<IUser> {
    constructor(properties: Properties<IUser>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.nickName) { this.nickName = properties.nickName }
            if (properties.avatar) { this.avatar = properties.avatar }
            if (properties.realName) { this.realName = properties.realName }
            if (properties.sex) { this.sex = properties.sex }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public nickName?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public avatar?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public realName?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public sex?: string|null = ""
}
export interface IListUserOfGroupResp {
    user?: IUser[]
    totalNum?: number|null
}
@protobuf.Type.d("tss_hall_usergroup_ListUserOfGroupResp")
export class ListUserOfGroupResp extends protobuf.Message<IListUserOfGroupResp> {
    constructor(properties: Properties<IListUserOfGroupResp>) {
        super(properties);
        if (properties) {
            if (properties.user) { this.user = []; properties.user.forEach((value, index)=>{this.user[index] = User.create(properties.user[index]) as any})}
            if (properties.totalNum) { this.totalNum = properties.totalNum }
        }
	}
    @protobuf.Field.d(1, "tss_hall_usergroup_User", "repeated")
    public user?: User[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public totalNum?: number|null = 0
}
export interface IListUserGroupRecordReq {
    CurPage?: number|null
    ShowNum?: number|null
}
@protobuf.Type.d("tss_hall_usergroup_ListUserGroupRecordReq")
export class ListUserGroupRecordReq extends protobuf.Message<IListUserGroupRecordReq> {
    constructor(properties: Properties<IListUserGroupRecordReq>) {
        super(properties);
        if (properties) {
            if (properties.CurPage) { this.CurPage = properties.CurPage }
            if (properties.ShowNum) { this.ShowNum = properties.ShowNum }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public CurPage?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public ShowNum?: number|null = 0
}
export interface IUserGroupRecord {
    RecordID?: string|null
    CreatedAt?: number|null
    OperatorName?: string|null
    Type?: ResourceOperateType|null
    GroupName?: string|null
    GroupDesc?: string|null
    UIDs?: number[]
    resourceID?: string|null
}
@protobuf.Type.d("tss_hall_usergroup_UserGroupRecord")
export class UserGroupRecord extends protobuf.Message<IUserGroupRecord> {
    constructor(properties: Properties<IUserGroupRecord>) {
        super(properties);
        if (properties) {
            if (properties.RecordID) { this.RecordID = properties.RecordID }
            if (properties.CreatedAt) { this.CreatedAt = properties.CreatedAt }
            if (properties.OperatorName) { this.OperatorName = properties.OperatorName }
            if (properties.Type) { this.Type = properties.Type }
            if (properties.GroupName) { this.GroupName = properties.GroupName }
            if (properties.GroupDesc) { this.GroupDesc = properties.GroupDesc }
            if (properties.UIDs) { this.UIDs = []; properties.UIDs.forEach((value, index)=>{this.UIDs[index] = properties.UIDs[index]})}
            if (properties.resourceID) { this.resourceID = properties.resourceID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public RecordID?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public CreatedAt?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public OperatorName?: string|null = ""
    @protobuf.Field.d(4, ResourceOperateType, "optional", ResourceOperateType.ResourceOperateTypeUnknown)
    public Type?: ResourceOperateType|null = ResourceOperateType.ResourceOperateTypeUnknown
    @protobuf.Field.d(5, "string", "optional", )
    public GroupName?: string|null = ""
    @protobuf.Field.d(6, "string", "optional", )
    public GroupDesc?: string|null = ""
    @protobuf.Field.d(7, "int64", "repeated", [])
    public UIDs?: number[] = []
    @protobuf.Field.d(8, "string", "optional", )
    public resourceID?: string|null = ""
}
export interface IListUserGroupRecordResp {
    GroupRecords?: IUserGroupRecord[]
    CurPage?: number|null
    Total?: number|null
}
@protobuf.Type.d("tss_hall_usergroup_ListUserGroupRecordResp")
export class ListUserGroupRecordResp extends protobuf.Message<IListUserGroupRecordResp> {
    constructor(properties: Properties<IListUserGroupRecordResp>) {
        super(properties);
        if (properties) {
            if (properties.GroupRecords) { this.GroupRecords = []; properties.GroupRecords.forEach((value, index)=>{this.GroupRecords[index] = UserGroupRecord.create(properties.GroupRecords[index]) as any})}
            if (properties.CurPage) { this.CurPage = properties.CurPage }
            if (properties.Total) { this.Total = properties.Total }
        }
	}
    @protobuf.Field.d(1, "tss_hall_usergroup_UserGroupRecord", "repeated")
    public GroupRecords?: UserGroupRecord[] = []
    @protobuf.Field.d(2, "int32", "optional", 0)
    public CurPage?: number|null = 0
    @protobuf.Field.d(3, "int32", "optional", 0)
    public Total?: number|null = 0
}
export interface IListOperateUserFlowReq {
    page?: number|null
    pageSize?: number|null
    uid?: number|null
}
@protobuf.Type.d("tss_hall_usergroup_ListOperateUserFlowReq")
export class ListOperateUserFlowReq extends protobuf.Message<IListOperateUserFlowReq> {
    constructor(properties: Properties<IListOperateUserFlowReq>) {
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
export interface IOperateUserFlow {
    objectID?: string|null
    createdAt?: number|null
    operatorName?: string|null
    type?: ResourceOperateType|null
    groupName?: string|null
    groupDesc?: string|null
    uid?: number|null
    groupID?: string|null
}
@protobuf.Type.d("tss_hall_usergroup_OperateUserFlow")
export class OperateUserFlow extends protobuf.Message<IOperateUserFlow> {
    constructor(properties: Properties<IOperateUserFlow>) {
        super(properties);
        if (properties) {
            if (properties.objectID) { this.objectID = properties.objectID }
            if (properties.createdAt) { this.createdAt = properties.createdAt }
            if (properties.operatorName) { this.operatorName = properties.operatorName }
            if (properties.type) { this.type = properties.type }
            if (properties.groupName) { this.groupName = properties.groupName }
            if (properties.groupDesc) { this.groupDesc = properties.groupDesc }
            if (properties.uid) { this.uid = properties.uid }
            if (properties.groupID) { this.groupID = properties.groupID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public objectID?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public createdAt?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public operatorName?: string|null = ""
    @protobuf.Field.d(4, ResourceOperateType, "optional", ResourceOperateType.ResourceOperateTypeUnknown)
    public type?: ResourceOperateType|null = ResourceOperateType.ResourceOperateTypeUnknown
    @protobuf.Field.d(5, "string", "optional", )
    public groupName?: string|null = ""
    @protobuf.Field.d(6, "string", "optional", )
    public groupDesc?: string|null = ""
    @protobuf.Field.d(7, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(8, "string", "optional", )
    public groupID?: string|null = ""
}
export interface IListOperateUserFlowResp {
    flow?: IOperateUserFlow[]
    total?: number|null
}
@protobuf.Type.d("tss_hall_usergroup_ListOperateUserFlowResp")
export class ListOperateUserFlowResp extends protobuf.Message<IListOperateUserFlowResp> {
    constructor(properties: Properties<IListOperateUserFlowResp>) {
        super(properties);
        if (properties) {
            if (properties.flow) { this.flow = []; properties.flow.forEach((value, index)=>{this.flow[index] = OperateUserFlow.create(properties.flow[index]) as any})}
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "tss_hall_usergroup_OperateUserFlow", "repeated")
    public flow?: OperateUserFlow[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public total?: number|null = 0
}
export interface IListGroupOfUserReq {
    uid?: number|null
    gId?: string[]
    groupParams?: tss_common_IGroupParams[]
}
@protobuf.Type.d("tss_hall_usergroup_ListGroupOfUserReq")
export class ListGroupOfUserReq extends protobuf.Message<IListGroupOfUserReq> {
    constructor(properties: Properties<IListGroupOfUserReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.gId) { this.gId = []; properties.gId.forEach((value, index)=>{this.gId[index] = properties.gId[index]})}
            if (properties.groupParams) { this.groupParams = []; properties.groupParams.forEach((value, index)=>{this.groupParams[index] = tss_common_GroupParams.create(properties.groupParams[index]) as any})}
        }
	}
    @protobuf.Field.d(7, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(8, "string", "repeated", [])
    public gId?: string[] = []
    @protobuf.Field.d(9, "tss_common_GroupParams", "repeated")
    public groupParams?: tss_common_GroupParams[] = []
}
export interface IListGroupOfUserResp {
    UserGroups?: IUserGroup[]
}
@protobuf.Type.d("tss_hall_usergroup_ListGroupOfUserResp")
export class ListGroupOfUserResp extends protobuf.Message<IListGroupOfUserResp> {
    constructor(properties: Properties<IListGroupOfUserResp>) {
        super(properties);
        if (properties) {
            if (properties.UserGroups) { this.UserGroups = []; properties.UserGroups.forEach((value, index)=>{this.UserGroups[index] = UserGroup.create(properties.UserGroups[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_usergroup_UserGroup", "repeated")
    public UserGroups?: UserGroup[] = []
}
export interface IUpdateUserGroupStateReq {
    NewState?: tss_common_State|null
    id?: string|null
    operator?: string|null
}
@protobuf.Type.d("tss_hall_usergroup_UpdateUserGroupStateReq")
export class UpdateUserGroupStateReq extends protobuf.Message<IUpdateUserGroupStateReq> {
    constructor(properties: Properties<IUpdateUserGroupStateReq>) {
        super(properties);
        if (properties) {
            if (properties.NewState) { this.NewState = properties.NewState }
            if (properties.id) { this.id = properties.id }
            if (properties.operator) { this.operator = properties.operator }
        }
	}
    @protobuf.Field.d(1, tss_common_State, "optional", tss_common_State.StateUnknown)
    public NewState?: tss_common_State|null = tss_common_State.StateUnknown
    @protobuf.Field.d(2, "string", "optional", )
    public id?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public operator?: string|null = ""
}
export interface IGroupOfUser {
    uid?: number|null
    UserGroups?: IUserGroup[]
}
@protobuf.Type.d("tss_hall_usergroup_GroupOfUser")
export class GroupOfUser extends protobuf.Message<IGroupOfUser> {
    constructor(properties: Properties<IGroupOfUser>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.UserGroups) { this.UserGroups = []; properties.UserGroups.forEach((value, index)=>{this.UserGroups[index] = UserGroup.create(properties.UserGroups[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "tss_hall_usergroup_UserGroup", "repeated")
    public UserGroups?: UserGroup[] = []
}
export interface IBatchListGroupOfUserResp {
    groupOfUsers?: IGroupOfUser[]
}
@protobuf.Type.d("tss_hall_usergroup_BatchListGroupOfUserResp")
export class BatchListGroupOfUserResp extends protobuf.Message<IBatchListGroupOfUserResp> {
    constructor(properties: Properties<IBatchListGroupOfUserResp>) {
        super(properties);
        if (properties) {
            if (properties.groupOfUsers) { this.groupOfUsers = []; properties.groupOfUsers.forEach((value, index)=>{this.groupOfUsers[index] = GroupOfUser.create(properties.groupOfUsers[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_usergroup_GroupOfUser", "repeated")
    public groupOfUsers?: GroupOfUser[] = []
}
export interface IBatchListGroupOfUserReq {
    uid?: number[]
    gId?: string[]
    groupParams?: tss_common_IGroupParams[]
}
@protobuf.Type.d("tss_hall_usergroup_BatchListGroupOfUserReq")
export class BatchListGroupOfUserReq extends protobuf.Message<IBatchListGroupOfUserReq> {
    constructor(properties: Properties<IBatchListGroupOfUserReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = []; properties.uid.forEach((value, index)=>{this.uid[index] = properties.uid[index]})}
            if (properties.gId) { this.gId = []; properties.gId.forEach((value, index)=>{this.gId[index] = properties.gId[index]})}
            if (properties.groupParams) { this.groupParams = []; properties.groupParams.forEach((value, index)=>{this.groupParams[index] = tss_common_GroupParams.create(properties.groupParams[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public uid?: number[] = []
    @protobuf.Field.d(2, "string", "repeated", [])
    public gId?: string[] = []
    @protobuf.Field.d(9, "tss_common_GroupParams", "repeated")
    public groupParams?: tss_common_GroupParams[] = []
}
export interface IAppMsg {
    title?: string|null
    content?: string|null
    pushMode?: PushMode|null
}
@protobuf.Type.d("tss_hall_usergroup_AppMsg")
export class AppMsg extends protobuf.Message<IAppMsg> {
    constructor(properties: Properties<IAppMsg>) {
        super(properties);
        if (properties) {
            if (properties.title) { this.title = properties.title }
            if (properties.content) { this.content = properties.content }
            if (properties.pushMode) { this.pushMode = properties.pushMode }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public title?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public content?: string|null = ""
    @protobuf.Field.d(3, PushMode, "optional", PushMode.Precise)
    public pushMode?: PushMode|null = PushMode.Precise
}
export interface IOperationStrategy {
    id?: string|null
    name?: string|null
    desc?: string|null
    strategy?: StrategyType|null
    beginAt?: number|null
    endAt?: number|null
    createdAt?: number|null
    updatedAt?: number|null
    state?: tss_common_State|null
    operator?: string|null
    targetGroupID?: string|null
    mail?: tss_common_ISysMailBody
    appMsg?: IAppMsg
    executeType?: StrategyExecuteType|null
    frequencyType?: StrategyUserFrequencyType|null
    asset?: tss_common_IAsset
}
@protobuf.Type.d("tss_hall_usergroup_OperationStrategy")
export class OperationStrategy extends protobuf.Message<IOperationStrategy> {
    constructor(properties: Properties<IOperationStrategy>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.name) { this.name = properties.name }
            if (properties.desc) { this.desc = properties.desc }
            if (properties.strategy) { this.strategy = properties.strategy }
            if (properties.beginAt) { this.beginAt = properties.beginAt }
            if (properties.endAt) { this.endAt = properties.endAt }
            if (properties.createdAt) { this.createdAt = properties.createdAt }
            if (properties.updatedAt) { this.updatedAt = properties.updatedAt }
            if (properties.state) { this.state = properties.state }
            if (properties.operator) { this.operator = properties.operator }
            if (properties.targetGroupID) { this.targetGroupID = properties.targetGroupID }
            if (properties.mail) { this.mail = tss_common_SysMailBody.create(properties.mail) as any }
            if (properties.appMsg) { this.appMsg = AppMsg.create(properties.appMsg) as any }
            if (properties.executeType) { this.executeType = properties.executeType }
            if (properties.frequencyType) { this.frequencyType = properties.frequencyType }
            if (properties.asset) { this.asset = tss_common_Asset.create(properties.asset) as any }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public id?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public desc?: string|null = ""
    @protobuf.Field.d(4, StrategyType, "optional", StrategyType.StrategyTypeUnknown)
    public strategy?: StrategyType|null = StrategyType.StrategyTypeUnknown
    @protobuf.Field.d(5, "int64", "optional", 0)
    public beginAt?: number|null = 0
    @protobuf.Field.d(6, "int64", "optional", 0)
    public endAt?: number|null = 0
    @protobuf.Field.d(7, "int64", "optional", 0)
    public createdAt?: number|null = 0
    @protobuf.Field.d(8, "int64", "optional", 0)
    public updatedAt?: number|null = 0
    @protobuf.Field.d(9, tss_common_State, "optional", tss_common_State.StateUnknown)
    public state?: tss_common_State|null = tss_common_State.StateUnknown
    @protobuf.Field.d(10, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(11, "string", "optional", )
    public targetGroupID?: string|null = ""
    @protobuf.Field.d(12, "tss_common_SysMailBody", "optional")
    public mail?: tss_common_SysMailBody|null
    @protobuf.Field.d(13, "tss_hall_usergroup_AppMsg", "optional")
    public appMsg?: AppMsg|null
    @protobuf.Field.d(14, StrategyExecuteType, "optional", StrategyExecuteType.StrategyExecuteTypeUnknow)
    public executeType?: StrategyExecuteType|null = StrategyExecuteType.StrategyExecuteTypeUnknow
    @protobuf.Field.d(15, StrategyUserFrequencyType, "optional", StrategyUserFrequencyType.StrategyUserFrequencyTypeUnknown)
    public frequencyType?: StrategyUserFrequencyType|null = StrategyUserFrequencyType.StrategyUserFrequencyTypeUnknown
    @protobuf.Field.d(16, "tss_common_Asset", "optional")
    public asset?: tss_common_Asset|null
}
export interface IOperationStrategyExecuteLog {
    logID?: string|null
    executedAt?: number|null
    strategyID?: string|null
    strategyName?: string|null
    groupID?: string|null
    groupName?: string|null
}
@protobuf.Type.d("tss_hall_usergroup_OperationStrategyExecuteLog")
export class OperationStrategyExecuteLog extends protobuf.Message<IOperationStrategyExecuteLog> {
    constructor(properties: Properties<IOperationStrategyExecuteLog>) {
        super(properties);
        if (properties) {
            if (properties.logID) { this.logID = properties.logID }
            if (properties.executedAt) { this.executedAt = properties.executedAt }
            if (properties.strategyID) { this.strategyID = properties.strategyID }
            if (properties.strategyName) { this.strategyName = properties.strategyName }
            if (properties.groupID) { this.groupID = properties.groupID }
            if (properties.groupName) { this.groupName = properties.groupName }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public logID?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public executedAt?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public strategyID?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public strategyName?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public groupID?: string|null = ""
    @protobuf.Field.d(6, "string", "optional", )
    public groupName?: string|null = ""
}
export interface IOperationStrategyExecuteUserLog {
    logID?: string|null
    uid?: number|null
    createdAt?: number|null
    periodNo?: string|null
    strategyID?: string|null
    nickName?: string|null
}
@protobuf.Type.d("tss_hall_usergroup_OperationStrategyExecuteUserLog")
export class OperationStrategyExecuteUserLog extends protobuf.Message<IOperationStrategyExecuteUserLog> {
    constructor(properties: Properties<IOperationStrategyExecuteUserLog>) {
        super(properties);
        if (properties) {
            if (properties.logID) { this.logID = properties.logID }
            if (properties.uid) { this.uid = properties.uid }
            if (properties.createdAt) { this.createdAt = properties.createdAt }
            if (properties.periodNo) { this.periodNo = properties.periodNo }
            if (properties.strategyID) { this.strategyID = properties.strategyID }
            if (properties.nickName) { this.nickName = properties.nickName }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public logID?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public createdAt?: number|null = 0
    @protobuf.Field.d(4, "string", "optional", )
    public periodNo?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public strategyID?: string|null = ""
    @protobuf.Field.d(6, "string", "optional", )
    public nickName?: string|null = ""
}
export interface ICreateOperationStrategyReq {
    strategy?: IOperationStrategy
}
@protobuf.Type.d("tss_hall_usergroup_CreateOperationStrategyReq")
export class CreateOperationStrategyReq extends protobuf.Message<ICreateOperationStrategyReq> {
    constructor(properties: Properties<ICreateOperationStrategyReq>) {
        super(properties);
        if (properties) {
            if (properties.strategy) { this.strategy = OperationStrategy.create(properties.strategy) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_usergroup_OperationStrategy", "optional")
    public strategy?: OperationStrategy|null
}
export interface ICreateOperationStrategyResp {
    strategy?: IOperationStrategy
}
@protobuf.Type.d("tss_hall_usergroup_CreateOperationStrategyResp")
export class CreateOperationStrategyResp extends protobuf.Message<ICreateOperationStrategyResp> {
    constructor(properties: Properties<ICreateOperationStrategyResp>) {
        super(properties);
        if (properties) {
            if (properties.strategy) { this.strategy = OperationStrategy.create(properties.strategy) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_usergroup_OperationStrategy", "optional")
    public strategy?: OperationStrategy|null
}
export interface IGetOperationStrategyReq {
    strategyID?: string|null
}
@protobuf.Type.d("tss_hall_usergroup_GetOperationStrategyReq")
export class GetOperationStrategyReq extends protobuf.Message<IGetOperationStrategyReq> {
    constructor(properties: Properties<IGetOperationStrategyReq>) {
        super(properties);
        if (properties) {
            if (properties.strategyID) { this.strategyID = properties.strategyID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public strategyID?: string|null = ""
}
export interface IGetOperationStrategyResp {
    strategy?: IOperationStrategy
}
@protobuf.Type.d("tss_hall_usergroup_GetOperationStrategyResp")
export class GetOperationStrategyResp extends protobuf.Message<IGetOperationStrategyResp> {
    constructor(properties: Properties<IGetOperationStrategyResp>) {
        super(properties);
        if (properties) {
            if (properties.strategy) { this.strategy = OperationStrategy.create(properties.strategy) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_usergroup_OperationStrategy", "optional")
    public strategy?: OperationStrategy|null
}
export interface IUpdateOperationStrategyReq {
    strategy?: IOperationStrategy
}
@protobuf.Type.d("tss_hall_usergroup_UpdateOperationStrategyReq")
export class UpdateOperationStrategyReq extends protobuf.Message<IUpdateOperationStrategyReq> {
    constructor(properties: Properties<IUpdateOperationStrategyReq>) {
        super(properties);
        if (properties) {
            if (properties.strategy) { this.strategy = OperationStrategy.create(properties.strategy) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_usergroup_OperationStrategy", "optional")
    public strategy?: OperationStrategy|null
}
export interface IUpdateOperationStrategyResp {
    strategy?: IOperationStrategy
}
@protobuf.Type.d("tss_hall_usergroup_UpdateOperationStrategyResp")
export class UpdateOperationStrategyResp extends protobuf.Message<IUpdateOperationStrategyResp> {
    constructor(properties: Properties<IUpdateOperationStrategyResp>) {
        super(properties);
        if (properties) {
            if (properties.strategy) { this.strategy = OperationStrategy.create(properties.strategy) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_usergroup_OperationStrategy", "optional")
    public strategy?: OperationStrategy|null
}
export interface IDeleteOperationStrategyReq {
    strategyID?: string|null
    operator?: string|null
}
@protobuf.Type.d("tss_hall_usergroup_DeleteOperationStrategyReq")
export class DeleteOperationStrategyReq extends protobuf.Message<IDeleteOperationStrategyReq> {
    constructor(properties: Properties<IDeleteOperationStrategyReq>) {
        super(properties);
        if (properties) {
            if (properties.strategyID) { this.strategyID = properties.strategyID }
            if (properties.operator) { this.operator = properties.operator }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public strategyID?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public operator?: string|null = ""
}
export interface IListOperationStrategyReq {
    state?: tss_common_State|null
    strategyName?: string|null
    page?: number|null
    pageSize?: number|null
}
@protobuf.Type.d("tss_hall_usergroup_ListOperationStrategyReq")
export class ListOperationStrategyReq extends protobuf.Message<IListOperationStrategyReq> {
    constructor(properties: Properties<IListOperationStrategyReq>) {
        super(properties);
        if (properties) {
            if (properties.state) { this.state = properties.state }
            if (properties.strategyName) { this.strategyName = properties.strategyName }
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
        }
	}
    @protobuf.Field.d(1, tss_common_State, "optional", tss_common_State.StateUnknown)
    public state?: tss_common_State|null = tss_common_State.StateUnknown
    @protobuf.Field.d(2, "string", "optional", )
    public strategyName?: string|null = ""
    @protobuf.Field.d(3, "int32", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(4, "int32", "optional", 0)
    public pageSize?: number|null = 0
}
export interface IListOperationStrategyResp {
    total?: number|null
    strategys?: IOperationStrategy[]
}
@protobuf.Type.d("tss_hall_usergroup_ListOperationStrategyResp")
export class ListOperationStrategyResp extends protobuf.Message<IListOperationStrategyResp> {
    constructor(properties: Properties<IListOperationStrategyResp>) {
        super(properties);
        if (properties) {
            if (properties.total) { this.total = properties.total }
            if (properties.strategys) { this.strategys = []; properties.strategys.forEach((value, index)=>{this.strategys[index] = OperationStrategy.create(properties.strategys[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public total?: number|null = 0
    @protobuf.Field.d(2, "tss_hall_usergroup_OperationStrategy", "repeated")
    public strategys?: OperationStrategy[] = []
}
export interface IListOperationStrategyExecuteLogReq {
    page?: number|null
    pageSize?: number|null
    strategyID?: string|null
    groupID?: string|null
    beginAt?: number|null
    endAt?: number|null
}
@protobuf.Type.d("tss_hall_usergroup_ListOperationStrategyExecuteLogReq")
export class ListOperationStrategyExecuteLogReq extends protobuf.Message<IListOperationStrategyExecuteLogReq> {
    constructor(properties: Properties<IListOperationStrategyExecuteLogReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.strategyID) { this.strategyID = properties.strategyID }
            if (properties.groupID) { this.groupID = properties.groupID }
            if (properties.beginAt) { this.beginAt = properties.beginAt }
            if (properties.endAt) { this.endAt = properties.endAt }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public strategyID?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public groupID?: string|null = ""
    @protobuf.Field.d(5, "int64", "optional", 0)
    public beginAt?: number|null = 0
    @protobuf.Field.d(6, "int64", "optional", 0)
    public endAt?: number|null = 0
}
export interface IListOperationStrategyExecuteLogResp {
    total?: number|null
    logs?: IOperationStrategyExecuteLog[]
}
@protobuf.Type.d("tss_hall_usergroup_ListOperationStrategyExecuteLogResp")
export class ListOperationStrategyExecuteLogResp extends protobuf.Message<IListOperationStrategyExecuteLogResp> {
    constructor(properties: Properties<IListOperationStrategyExecuteLogResp>) {
        super(properties);
        if (properties) {
            if (properties.total) { this.total = properties.total }
            if (properties.logs) { this.logs = []; properties.logs.forEach((value, index)=>{this.logs[index] = OperationStrategyExecuteLog.create(properties.logs[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public total?: number|null = 0
    @protobuf.Field.d(2, "tss_hall_usergroup_OperationStrategyExecuteLog", "repeated")
    public logs?: OperationStrategyExecuteLog[] = []
}
export interface IListOperationStrategyExecuteUserLogReq {
    logID?: string|null
    page?: number|null
    pageSize?: number|null
}
@protobuf.Type.d("tss_hall_usergroup_ListOperationStrategyExecuteUserLogReq")
export class ListOperationStrategyExecuteUserLogReq extends protobuf.Message<IListOperationStrategyExecuteUserLogReq> {
    constructor(properties: Properties<IListOperationStrategyExecuteUserLogReq>) {
        super(properties);
        if (properties) {
            if (properties.logID) { this.logID = properties.logID }
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public logID?: string|null = ""
    @protobuf.Field.d(2, "int32", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(3, "int32", "optional", 0)
    public pageSize?: number|null = 0
}
export interface IListOperationStrategyExecuteUserLogResp {
    total?: number|null
    logs?: IOperationStrategyExecuteUserLog[]
}
@protobuf.Type.d("tss_hall_usergroup_ListOperationStrategyExecuteUserLogResp")
export class ListOperationStrategyExecuteUserLogResp extends protobuf.Message<IListOperationStrategyExecuteUserLogResp> {
    constructor(properties: Properties<IListOperationStrategyExecuteUserLogResp>) {
        super(properties);
        if (properties) {
            if (properties.total) { this.total = properties.total }
            if (properties.logs) { this.logs = []; properties.logs.forEach((value, index)=>{this.logs[index] = OperationStrategyExecuteUserLog.create(properties.logs[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public total?: number|null = 0
    @protobuf.Field.d(2, "tss_hall_usergroup_OperationStrategyExecuteUserLog", "repeated")
    public logs?: OperationStrategyExecuteUserLog[] = []
}
export interface IUpdateOperationStrategyStateReq {
    newState?: tss_common_State|null
    id?: string|null
    operator?: string|null
}
@protobuf.Type.d("tss_hall_usergroup_UpdateOperationStrategyStateReq")
export class UpdateOperationStrategyStateReq extends protobuf.Message<IUpdateOperationStrategyStateReq> {
    constructor(properties: Properties<IUpdateOperationStrategyStateReq>) {
        super(properties);
        if (properties) {
            if (properties.newState) { this.newState = properties.newState }
            if (properties.id) { this.id = properties.id }
            if (properties.operator) { this.operator = properties.operator }
        }
	}
    @protobuf.Field.d(1, tss_common_State, "optional", tss_common_State.StateUnknown)
    public newState?: tss_common_State|null = tss_common_State.StateUnknown
    @protobuf.Field.d(2, "string", "optional", )
    public id?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public operator?: string|null = ""
}
export interface IExecuteOperationStrategyReq {
    strategyID?: string|null
}
@protobuf.Type.d("tss_hall_usergroup_ExecuteOperationStrategyReq")
export class ExecuteOperationStrategyReq extends protobuf.Message<IExecuteOperationStrategyReq> {
    constructor(properties: Properties<IExecuteOperationStrategyReq>) {
        super(properties);
        if (properties) {
            if (properties.strategyID) { this.strategyID = properties.strategyID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public strategyID?: string|null = ""
}
class $UserGroupService extends RpcService {
    async CreateUserGroup(req: ICreateUserGroupReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = CreateUserGroupReq.create(req)
        this.onBeforeReq("CreateUserGroup", data, params)
        const buffer = CreateUserGroupReq.encode(data).finish()
        let [err, pack] = await this.call("CreateUserGroup", buffer, params)
        if (err) {
            this.onBeforeResp("CreateUserGroup", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("CreateUserGroup", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DeleteUserGroup(req: IDeleteUserGroupReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = DeleteUserGroupReq.create(req)
        this.onBeforeReq("DeleteUserGroup", data, params)
        const buffer = DeleteUserGroupReq.encode(data).finish()
        let [err, pack] = await this.call("DeleteUserGroup", buffer, params)
        if (err) {
            this.onBeforeResp("DeleteUserGroup", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("DeleteUserGroup", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListUserGroup(req: IListUserGroupReq, params?: RpcParams) : Promise<{err:number, resp:IListUserGroupResp}> {
        let data = ListUserGroupReq.create(req)
        this.onBeforeReq("ListUserGroup", data, params)
        const buffer = ListUserGroupReq.encode(data).finish()
        let [err, pack] = await this.call("ListUserGroup", buffer, params)
        if (err) {
            this.onBeforeResp("ListUserGroup", err)
            return {err: err, resp: null}
        } else {
            let resp = ListUserGroupResp.decode(pack) as any
            this.onBeforeResp("ListUserGroup", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListUserGroupRecord(req: IListUserGroupRecordReq, params?: RpcParams) : Promise<{err:number, resp:IListUserGroupRecordResp}> {
        let data = ListUserGroupRecordReq.create(req)
        this.onBeforeReq("ListUserGroupRecord", data, params)
        const buffer = ListUserGroupRecordReq.encode(data).finish()
        let [err, pack] = await this.call("ListUserGroupRecord", buffer, params)
        if (err) {
            this.onBeforeResp("ListUserGroupRecord", err)
            return {err: err, resp: null}
        } else {
            let resp = ListUserGroupRecordResp.decode(pack) as any
            this.onBeforeResp("ListUserGroupRecord", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SearchUserGroup(req: ISearchUserGroupReq, params?: RpcParams) : Promise<{err:number, resp:ISearchUserGroupResp}> {
        let data = SearchUserGroupReq.create(req)
        this.onBeforeReq("SearchUserGroup", data, params)
        const buffer = SearchUserGroupReq.encode(data).finish()
        let [err, pack] = await this.call("SearchUserGroup", buffer, params)
        if (err) {
            this.onBeforeResp("SearchUserGroup", err)
            return {err: err, resp: null}
        } else {
            let resp = SearchUserGroupResp.decode(pack) as any
            this.onBeforeResp("SearchUserGroup", err, resp)
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
    async AddUserToGroup(req: IAddUserToGroupReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = AddUserToGroupReq.create(req)
        this.onBeforeReq("AddUserToGroup", data, params)
        const buffer = AddUserToGroupReq.encode(data).finish()
        let [err, pack] = await this.call("AddUserToGroup", buffer, params)
        if (err) {
            this.onBeforeResp("AddUserToGroup", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("AddUserToGroup", err, resp)
            return {err: null, resp: resp}
        }
    }
    async RemoveUserFromGroup(req: IRemoveUserFromGroupReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = RemoveUserFromGroupReq.create(req)
        this.onBeforeReq("RemoveUserFromGroup", data, params)
        const buffer = RemoveUserFromGroupReq.encode(data).finish()
        let [err, pack] = await this.call("RemoveUserFromGroup", buffer, params)
        if (err) {
            this.onBeforeResp("RemoveUserFromGroup", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("RemoveUserFromGroup", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListUserOfGroup(req: IListUserOfGroupReq, params?: RpcParams) : Promise<{err:number, resp:IListUserOfGroupResp}> {
        let data = ListUserOfGroupReq.create(req)
        this.onBeforeReq("ListUserOfGroup", data, params)
        const buffer = ListUserOfGroupReq.encode(data).finish()
        let [err, pack] = await this.call("ListUserOfGroup", buffer, params)
        if (err) {
            this.onBeforeResp("ListUserOfGroup", err)
            return {err: err, resp: null}
        } else {
            let resp = ListUserOfGroupResp.decode(pack) as any
            this.onBeforeResp("ListUserOfGroup", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListOperateUserFlow(req: IListOperateUserFlowReq, params?: RpcParams) : Promise<{err:number, resp:IListOperateUserFlowResp}> {
        let data = ListOperateUserFlowReq.create(req)
        this.onBeforeReq("ListOperateUserFlow", data, params)
        const buffer = ListOperateUserFlowReq.encode(data).finish()
        let [err, pack] = await this.call("ListOperateUserFlow", buffer, params)
        if (err) {
            this.onBeforeResp("ListOperateUserFlow", err)
            return {err: err, resp: null}
        } else {
            let resp = ListOperateUserFlowResp.decode(pack) as any
            this.onBeforeResp("ListOperateUserFlow", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListGroupOfUser(req: IListGroupOfUserReq, params?: RpcParams) : Promise<{err:number, resp:IListGroupOfUserResp}> {
        let data = ListGroupOfUserReq.create(req)
        this.onBeforeReq("ListGroupOfUser", data, params)
        const buffer = ListGroupOfUserReq.encode(data).finish()
        let [err, pack] = await this.call("ListGroupOfUser", buffer, params)
        if (err) {
            this.onBeforeResp("ListGroupOfUser", err)
            return {err: err, resp: null}
        } else {
            let resp = ListGroupOfUserResp.decode(pack) as any
            this.onBeforeResp("ListGroupOfUser", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchListGroupOfUser(req: IBatchListGroupOfUserReq, params?: RpcParams) : Promise<{err:number, resp:IBatchListGroupOfUserResp}> {
        let data = BatchListGroupOfUserReq.create(req)
        this.onBeforeReq("BatchListGroupOfUser", data, params)
        const buffer = BatchListGroupOfUserReq.encode(data).finish()
        let [err, pack] = await this.call("BatchListGroupOfUser", buffer, params)
        if (err) {
            this.onBeforeResp("BatchListGroupOfUser", err)
            return {err: err, resp: null}
        } else {
            let resp = BatchListGroupOfUserResp.decode(pack) as any
            this.onBeforeResp("BatchListGroupOfUser", err, resp)
            return {err: null, resp: resp}
        }
    }
    async UpdateUserGroup(req: IUpdateUserGroupReq, params?: RpcParams) : Promise<{err:number, resp:IUpdateUserGroupResp}> {
        let data = UpdateUserGroupReq.create(req)
        this.onBeforeReq("UpdateUserGroup", data, params)
        const buffer = UpdateUserGroupReq.encode(data).finish()
        let [err, pack] = await this.call("UpdateUserGroup", buffer, params)
        if (err) {
            this.onBeforeResp("UpdateUserGroup", err)
            return {err: err, resp: null}
        } else {
            let resp = UpdateUserGroupResp.decode(pack) as any
            this.onBeforeResp("UpdateUserGroup", err, resp)
            return {err: null, resp: resp}
        }
    }
    async UpdateUserGroupState(req: IUpdateUserGroupStateReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = UpdateUserGroupStateReq.create(req)
        this.onBeforeReq("UpdateUserGroupState", data, params)
        const buffer = UpdateUserGroupStateReq.encode(data).finish()
        let [err, pack] = await this.call("UpdateUserGroupState", buffer, params)
        if (err) {
            this.onBeforeResp("UpdateUserGroupState", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("UpdateUserGroupState", err, resp)
            return {err: null, resp: resp}
        }
    }
    async CreateOperationStrategy(req: ICreateOperationStrategyReq, params?: RpcParams) : Promise<{err:number, resp:ICreateOperationStrategyResp}> {
        let data = CreateOperationStrategyReq.create(req)
        this.onBeforeReq("CreateOperationStrategy", data, params)
        const buffer = CreateOperationStrategyReq.encode(data).finish()
        let [err, pack] = await this.call("CreateOperationStrategy", buffer, params)
        if (err) {
            this.onBeforeResp("CreateOperationStrategy", err)
            return {err: err, resp: null}
        } else {
            let resp = CreateOperationStrategyResp.decode(pack) as any
            this.onBeforeResp("CreateOperationStrategy", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetOperationStrategy(req: IGetOperationStrategyReq, params?: RpcParams) : Promise<{err:number, resp:IGetOperationStrategyResp}> {
        let data = GetOperationStrategyReq.create(req)
        this.onBeforeReq("GetOperationStrategy", data, params)
        const buffer = GetOperationStrategyReq.encode(data).finish()
        let [err, pack] = await this.call("GetOperationStrategy", buffer, params)
        if (err) {
            this.onBeforeResp("GetOperationStrategy", err)
            return {err: err, resp: null}
        } else {
            let resp = GetOperationStrategyResp.decode(pack) as any
            this.onBeforeResp("GetOperationStrategy", err, resp)
            return {err: null, resp: resp}
        }
    }
    async UpdateOperationStrategy(req: IUpdateOperationStrategyReq, params?: RpcParams) : Promise<{err:number, resp:IUpdateOperationStrategyResp}> {
        let data = UpdateOperationStrategyReq.create(req)
        this.onBeforeReq("UpdateOperationStrategy", data, params)
        const buffer = UpdateOperationStrategyReq.encode(data).finish()
        let [err, pack] = await this.call("UpdateOperationStrategy", buffer, params)
        if (err) {
            this.onBeforeResp("UpdateOperationStrategy", err)
            return {err: err, resp: null}
        } else {
            let resp = UpdateOperationStrategyResp.decode(pack) as any
            this.onBeforeResp("UpdateOperationStrategy", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DeleteOperationStrategy(req: IDeleteOperationStrategyReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = DeleteOperationStrategyReq.create(req)
        this.onBeforeReq("DeleteOperationStrategy", data, params)
        const buffer = DeleteOperationStrategyReq.encode(data).finish()
        let [err, pack] = await this.call("DeleteOperationStrategy", buffer, params)
        if (err) {
            this.onBeforeResp("DeleteOperationStrategy", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("DeleteOperationStrategy", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListOperationStrategy(req: IListOperationStrategyReq, params?: RpcParams) : Promise<{err:number, resp:IListOperationStrategyResp}> {
        let data = ListOperationStrategyReq.create(req)
        this.onBeforeReq("ListOperationStrategy", data, params)
        const buffer = ListOperationStrategyReq.encode(data).finish()
        let [err, pack] = await this.call("ListOperationStrategy", buffer, params)
        if (err) {
            this.onBeforeResp("ListOperationStrategy", err)
            return {err: err, resp: null}
        } else {
            let resp = ListOperationStrategyResp.decode(pack) as any
            this.onBeforeResp("ListOperationStrategy", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListOperationStrategyExecuteLog(req: IListOperationStrategyExecuteLogReq, params?: RpcParams) : Promise<{err:number, resp:IListOperationStrategyExecuteLogResp}> {
        let data = ListOperationStrategyExecuteLogReq.create(req)
        this.onBeforeReq("ListOperationStrategyExecuteLog", data, params)
        const buffer = ListOperationStrategyExecuteLogReq.encode(data).finish()
        let [err, pack] = await this.call("ListOperationStrategyExecuteLog", buffer, params)
        if (err) {
            this.onBeforeResp("ListOperationStrategyExecuteLog", err)
            return {err: err, resp: null}
        } else {
            let resp = ListOperationStrategyExecuteLogResp.decode(pack) as any
            this.onBeforeResp("ListOperationStrategyExecuteLog", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListOperationStrategyExecuteUserLog(req: IListOperationStrategyExecuteUserLogReq, params?: RpcParams) : Promise<{err:number, resp:IListOperationStrategyExecuteUserLogResp}> {
        let data = ListOperationStrategyExecuteUserLogReq.create(req)
        this.onBeforeReq("ListOperationStrategyExecuteUserLog", data, params)
        const buffer = ListOperationStrategyExecuteUserLogReq.encode(data).finish()
        let [err, pack] = await this.call("ListOperationStrategyExecuteUserLog", buffer, params)
        if (err) {
            this.onBeforeResp("ListOperationStrategyExecuteUserLog", err)
            return {err: err, resp: null}
        } else {
            let resp = ListOperationStrategyExecuteUserLogResp.decode(pack) as any
            this.onBeforeResp("ListOperationStrategyExecuteUserLog", err, resp)
            return {err: null, resp: resp}
        }
    }
    async UpdateOperationStrategyState(req: IUpdateOperationStrategyStateReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = UpdateOperationStrategyStateReq.create(req)
        this.onBeforeReq("UpdateOperationStrategyState", data, params)
        const buffer = UpdateOperationStrategyStateReq.encode(data).finish()
        let [err, pack] = await this.call("UpdateOperationStrategyState", buffer, params)
        if (err) {
            this.onBeforeResp("UpdateOperationStrategyState", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("UpdateOperationStrategyState", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ExecuteOperationStrategy(req: IExecuteOperationStrategyReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = ExecuteOperationStrategyReq.create(req)
        this.onBeforeReq("ExecuteOperationStrategy", data, params)
        const buffer = ExecuteOperationStrategyReq.encode(data).finish()
        let [err, pack] = await this.call("ExecuteOperationStrategy", buffer, params)
        if (err) {
            this.onBeforeResp("ExecuteOperationStrategy", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("ExecuteOperationStrategy", err, resp)
            return {err: null, resp: resp}
        }
    }
}
export const UserGroupService = new $UserGroupService({
    name: "tss.hall.usergroup",
})
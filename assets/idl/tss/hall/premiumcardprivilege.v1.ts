import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  Void as base_Void,IVoid as base_IVoid ,  BatchGetResourceReq as base_BatchGetResourceReq,IBatchGetResourceReq as base_IBatchGetResourceReq ,  BatchGetResourceResp as base_BatchGetResourceResp,IBatchGetResourceResp as base_IBatchGetResourceResp ,  } from "idl/base/base"
import {  State as tss_common_State ,  SwitchState as tss_common_SwitchState ,  } from "idl/tss/common/common_define"
import {  Code as tss_hall_Code ,  } from "idl/tss/hall/code"
import {  PremiumCardType as tss_hall_common_PremiumCardType ,  PrivilegeType as tss_hall_common_PrivilegeType ,  ExtraParamConfig as tss_hall_common_ExtraParamConfig,IExtraParamConfig as tss_hall_common_IExtraParamConfig ,  } from "idl/tss/hall/common/premiumcard"
export enum PrivilegeStrategy {  
    PrivilegeStrategyUnknown = 0,  
    PrivilegeStrategyDailyTimes = 1,  
    PrivilegeStrategyWeaklyTimes = 2,  
    PrivilegeStrategyIdentityVerification = 10,
}
export interface IPrivilegeStrategyConfig {
    type?: PrivilegeStrategy|null
    times?: number|null
    cardType?: tss_hall_common_PremiumCardType[]
    effectiveVipLevels?: number[]
}
@protobuf.Type.d("tss_hall_premiumcardprivilege_v1_PrivilegeStrategyConfig")
export class PrivilegeStrategyConfig extends protobuf.Message<IPrivilegeStrategyConfig> {
    constructor(properties: Properties<IPrivilegeStrategyConfig>) {
        super(properties);
        if (properties) {
            if (properties.type) { this.type = properties.type }
            if (properties.times) { this.times = properties.times }
            if (properties.cardType) { this.cardType = []; properties.cardType.forEach((value, index)=>{this.cardType[index] = properties.cardType[index]})}
            if (properties.effectiveVipLevels) { this.effectiveVipLevels = []; properties.effectiveVipLevels.forEach((value, index)=>{this.effectiveVipLevels[index] = properties.effectiveVipLevels[index]})}
        }
	}
    @protobuf.Field.d(1, PrivilegeStrategy, "optional", PrivilegeStrategy.PrivilegeStrategyUnknown)
    public type?: PrivilegeStrategy|null = PrivilegeStrategy.PrivilegeStrategyUnknown
    @protobuf.Field.d(2, "int64", "optional", 0)
    public times?: number|null = 0
    @protobuf.Field.d(3, tss_hall_common_PremiumCardType, "repeated", tss_hall_common_PremiumCardType.PremiumCardTypeUnknown)
    public cardType?: tss_hall_common_PremiumCardType[] = []
    @protobuf.Field.d(4, "int64", "repeated", [])
    public effectiveVipLevels?: number[] = []
}
export interface IPrivilegeConfig {
    id?: number|null
    StrategyConf?: IPrivilegeStrategyConfig
    type?: tss_hall_common_PrivilegeType|null
    extraParamConf?: tss_hall_common_IExtraParamConfig
    state?: tss_common_State|null
    name?: string|null
    img?: string|null
    desc?: string|null
    CreateAt?: number|null
    UpdateAt?: number|null
    operator?: string|null
    priority?: number|null
    applicationId?: string|null
    minVersion?: number|null
    maxVersion?: number|null
    invalidImg?: string|null
    activeImg?: string|null
    isDisplayOnApp?: boolean|null
    isNewSwitch?: tss_common_SwitchState|null
}
@protobuf.Type.d("tss_hall_premiumcardprivilege_v1_PrivilegeConfig")
export class PrivilegeConfig extends protobuf.Message<IPrivilegeConfig> {
    constructor(properties: Properties<IPrivilegeConfig>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.StrategyConf) { this.StrategyConf = PrivilegeStrategyConfig.create(properties.StrategyConf) as any }
            if (properties.type) { this.type = properties.type }
            if (properties.extraParamConf) { this.extraParamConf = tss_hall_common_ExtraParamConfig.create(properties.extraParamConf) as any }
            if (properties.state) { this.state = properties.state }
            if (properties.name) { this.name = properties.name }
            if (properties.img) { this.img = properties.img }
            if (properties.desc) { this.desc = properties.desc }
            if (properties.CreateAt) { this.CreateAt = properties.CreateAt }
            if (properties.UpdateAt) { this.UpdateAt = properties.UpdateAt }
            if (properties.operator) { this.operator = properties.operator }
            if (properties.priority) { this.priority = properties.priority }
            if (properties.applicationId) { this.applicationId = properties.applicationId }
            if (properties.minVersion) { this.minVersion = properties.minVersion }
            if (properties.maxVersion) { this.maxVersion = properties.maxVersion }
            if (properties.invalidImg) { this.invalidImg = properties.invalidImg }
            if (properties.activeImg) { this.activeImg = properties.activeImg }
            if (properties.isDisplayOnApp) { this.isDisplayOnApp = properties.isDisplayOnApp }
            if (properties.isNewSwitch) { this.isNewSwitch = properties.isNewSwitch }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public id?: number|null = 0
    @protobuf.Field.d(2, "tss_hall_premiumcardprivilege_v1_PrivilegeStrategyConfig", "optional")
    public StrategyConf?: PrivilegeStrategyConfig|null
    @protobuf.Field.d(3, tss_hall_common_PrivilegeType, "optional", tss_hall_common_PrivilegeType.PrivilegeTypeUnknown)
    public type?: tss_hall_common_PrivilegeType|null = tss_hall_common_PrivilegeType.PrivilegeTypeUnknown
    @protobuf.Field.d(4, "tss_hall_common_ExtraParamConfig", "optional")
    public extraParamConf?: tss_hall_common_ExtraParamConfig|null
    @protobuf.Field.d(5, tss_common_State, "optional", tss_common_State.StateUnknown)
    public state?: tss_common_State|null = tss_common_State.StateUnknown
    @protobuf.Field.d(10, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(11, "string", "optional", )
    public img?: string|null = ""
    @protobuf.Field.d(12, "string", "optional", )
    public desc?: string|null = ""
    @protobuf.Field.d(13, "int64", "optional", 0)
    public CreateAt?: number|null = 0
    @protobuf.Field.d(14, "int64", "optional", 0)
    public UpdateAt?: number|null = 0
    @protobuf.Field.d(15, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(16, "int64", "optional", 0)
    public priority?: number|null = 0
    @protobuf.Field.d(17, "string", "optional", )
    public applicationId?: string|null = ""
    @protobuf.Field.d(18, "int64", "optional", 0)
    public minVersion?: number|null = 0
    @protobuf.Field.d(19, "int64", "optional", 0)
    public maxVersion?: number|null = 0
    @protobuf.Field.d(20, "string", "optional", )
    public invalidImg?: string|null = ""
    @protobuf.Field.d(21, "string", "optional", )
    public activeImg?: string|null = ""
    @protobuf.Field.d(22, "bool", "optional", false)
    public isDisplayOnApp?: boolean|null = false
    @protobuf.Field.d(24, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public isNewSwitch?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
}
export interface IUserPrivilege {
    conf?: IPrivilegeConfig
    remainderTimes?: number|null
}
@protobuf.Type.d("tss_hall_premiumcardprivilege_v1_UserPrivilege")
export class UserPrivilege extends protobuf.Message<IUserPrivilege> {
    constructor(properties: Properties<IUserPrivilege>) {
        super(properties);
        if (properties) {
            if (properties.conf) { this.conf = PrivilegeConfig.create(properties.conf) as any }
            if (properties.remainderTimes) { this.remainderTimes = properties.remainderTimes }
        }
	}
    @protobuf.Field.d(1, "tss_hall_premiumcardprivilege_v1_PrivilegeConfig", "optional")
    public conf?: PrivilegeConfig|null
    @protobuf.Field.d(2, "int64", "optional", 0)
    public remainderTimes?: number|null = 0
}
export interface ISavePrivilegeConfigReq {
    conf?: IPrivilegeConfig
}
@protobuf.Type.d("tss_hall_premiumcardprivilege_v1_SavePrivilegeConfigReq")
export class SavePrivilegeConfigReq extends protobuf.Message<ISavePrivilegeConfigReq> {
    constructor(properties: Properties<ISavePrivilegeConfigReq>) {
        super(properties);
        if (properties) {
            if (properties.conf) { this.conf = PrivilegeConfig.create(properties.conf) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_premiumcardprivilege_v1_PrivilegeConfig", "optional")
    public conf?: PrivilegeConfig|null
}
export interface ISavePrivilegeConfigResp {
    conf?: IPrivilegeConfig
}
@protobuf.Type.d("tss_hall_premiumcardprivilege_v1_SavePrivilegeConfigResp")
export class SavePrivilegeConfigResp extends protobuf.Message<ISavePrivilegeConfigResp> {
    constructor(properties: Properties<ISavePrivilegeConfigResp>) {
        super(properties);
        if (properties) {
            if (properties.conf) { this.conf = PrivilegeConfig.create(properties.conf) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_premiumcardprivilege_v1_PrivilegeConfig", "optional")
    public conf?: PrivilegeConfig|null
}
export interface IListPrivilegeConfigReq {
    page?: number|null
    pageSize?: number|null
    cardType?: tss_hall_common_PremiumCardType|null
    state?: tss_common_State|null
    privilegeType?: tss_hall_common_PrivilegeType[]
    effectiveVipLevel?: number[]
    isDisplayOnApp?: boolean|null
}
@protobuf.Type.d("tss_hall_premiumcardprivilege_v1_ListPrivilegeConfigReq")
export class ListPrivilegeConfigReq extends protobuf.Message<IListPrivilegeConfigReq> {
    constructor(properties: Properties<IListPrivilegeConfigReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.cardType) { this.cardType = properties.cardType }
            if (properties.state) { this.state = properties.state }
            if (properties.privilegeType) { this.privilegeType = []; properties.privilegeType.forEach((value, index)=>{this.privilegeType[index] = properties.privilegeType[index]})}
            if (properties.effectiveVipLevel) { this.effectiveVipLevel = []; properties.effectiveVipLevel.forEach((value, index)=>{this.effectiveVipLevel[index] = properties.effectiveVipLevel[index]})}
            if (properties.isDisplayOnApp) { this.isDisplayOnApp = properties.isDisplayOnApp }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(3, tss_hall_common_PremiumCardType, "optional", tss_hall_common_PremiumCardType.PremiumCardTypeUnknown)
    public cardType?: tss_hall_common_PremiumCardType|null = tss_hall_common_PremiumCardType.PremiumCardTypeUnknown
    @protobuf.Field.d(4, tss_common_State, "optional", tss_common_State.StateUnknown)
    public state?: tss_common_State|null = tss_common_State.StateUnknown
    @protobuf.Field.d(5, tss_hall_common_PrivilegeType, "repeated", tss_hall_common_PrivilegeType.PrivilegeTypeUnknown)
    public privilegeType?: tss_hall_common_PrivilegeType[] = []
    @protobuf.Field.d(6, "int64", "repeated", [])
    public effectiveVipLevel?: number[] = []
    @protobuf.Field.d(7, "bool", "optional", false)
    public isDisplayOnApp?: boolean|null = false
}
export interface IListPrivilegeConfigResp {
    conf?: IPrivilegeConfig[]
    total?: number|null
}
@protobuf.Type.d("tss_hall_premiumcardprivilege_v1_ListPrivilegeConfigResp")
export class ListPrivilegeConfigResp extends protobuf.Message<IListPrivilegeConfigResp> {
    constructor(properties: Properties<IListPrivilegeConfigResp>) {
        super(properties);
        if (properties) {
            if (properties.conf) { this.conf = []; properties.conf.forEach((value, index)=>{this.conf[index] = PrivilegeConfig.create(properties.conf[index]) as any})}
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "tss_hall_premiumcardprivilege_v1_PrivilegeConfig", "repeated")
    public conf?: PrivilegeConfig[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public total?: number|null = 0
}
export interface IGetPrivilegeConfigReq {
    id?: number|null
}
@protobuf.Type.d("tss_hall_premiumcardprivilege_v1_GetPrivilegeConfigReq")
export class GetPrivilegeConfigReq extends protobuf.Message<IGetPrivilegeConfigReq> {
    constructor(properties: Properties<IGetPrivilegeConfigReq>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public id?: number|null = 0
}
export interface IGetPrivilegeConfigResp {
    conf?: IPrivilegeConfig
}
@protobuf.Type.d("tss_hall_premiumcardprivilege_v1_GetPrivilegeConfigResp")
export class GetPrivilegeConfigResp extends protobuf.Message<IGetPrivilegeConfigResp> {
    constructor(properties: Properties<IGetPrivilegeConfigResp>) {
        super(properties);
        if (properties) {
            if (properties.conf) { this.conf = PrivilegeConfig.create(properties.conf) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_premiumcardprivilege_v1_PrivilegeConfig", "optional")
    public conf?: PrivilegeConfig|null
}
export interface IGetUserPrivilegeReq {
    uid?: number|null
    type?: tss_hall_common_PrivilegeType|null
}
@protobuf.Type.d("tss_hall_premiumcardprivilege_v1_GetUserPrivilegeReq")
export class GetUserPrivilegeReq extends protobuf.Message<IGetUserPrivilegeReq> {
    constructor(properties: Properties<IGetUserPrivilegeReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.type) { this.type = properties.type }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, tss_hall_common_PrivilegeType, "optional", tss_hall_common_PrivilegeType.PrivilegeTypeUnknown)
    public type?: tss_hall_common_PrivilegeType|null = tss_hall_common_PrivilegeType.PrivilegeTypeUnknown
}
export interface IGetUserPrivilegeResp {
    user?: IUserPrivilege
}
@protobuf.Type.d("tss_hall_premiumcardprivilege_v1_GetUserPrivilegeResp")
export class GetUserPrivilegeResp extends protobuf.Message<IGetUserPrivilegeResp> {
    constructor(properties: Properties<IGetUserPrivilegeResp>) {
        super(properties);
        if (properties) {
            if (properties.user) { this.user = UserPrivilege.create(properties.user) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_premiumcardprivilege_v1_UserPrivilege", "optional")
    public user?: UserPrivilege|null
}
export interface IExerciseUserPrivilegeReq {
    uid?: number|null
    type?: tss_hall_common_PrivilegeType|null
}
@protobuf.Type.d("tss_hall_premiumcardprivilege_v1_ExerciseUserPrivilegeReq")
export class ExerciseUserPrivilegeReq extends protobuf.Message<IExerciseUserPrivilegeReq> {
    constructor(properties: Properties<IExerciseUserPrivilegeReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.type) { this.type = properties.type }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, tss_hall_common_PrivilegeType, "optional", tss_hall_common_PrivilegeType.PrivilegeTypeUnknown)
    public type?: tss_hall_common_PrivilegeType|null = tss_hall_common_PrivilegeType.PrivilegeTypeUnknown
}
export interface IExerciseUserPrivilegeResp {
    code?: tss_hall_Code|null
    user?: IUserPrivilege
}
@protobuf.Type.d("tss_hall_premiumcardprivilege_v1_ExerciseUserPrivilegeResp")
export class ExerciseUserPrivilegeResp extends protobuf.Message<IExerciseUserPrivilegeResp> {
    constructor(properties: Properties<IExerciseUserPrivilegeResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.user) { this.user = UserPrivilege.create(properties.user) as any }
        }
	}
    @protobuf.Field.d(1, tss_hall_Code, "optional", tss_hall_Code.CODE_SUCCEED)
    public code?: tss_hall_Code|null = tss_hall_Code.CODE_SUCCEED
    @protobuf.Field.d(2, "tss_hall_premiumcardprivilege_v1_UserPrivilege", "optional")
    public user?: UserPrivilege|null
}
export interface IBatchGetUserPrivilegeReq {
    uid?: number|null
    types?: tss_hall_common_PrivilegeType[]
}
@protobuf.Type.d("tss_hall_premiumcardprivilege_v1_BatchGetUserPrivilegeReq")
export class BatchGetUserPrivilegeReq extends protobuf.Message<IBatchGetUserPrivilegeReq> {
    constructor(properties: Properties<IBatchGetUserPrivilegeReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.types) { this.types = []; properties.types.forEach((value, index)=>{this.types[index] = properties.types[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, tss_hall_common_PrivilegeType, "repeated", tss_hall_common_PrivilegeType.PrivilegeTypeUnknown)
    public types?: tss_hall_common_PrivilegeType[] = []
}
export interface IBatchGetUserPrivilegeResp {
    users?: IUserPrivilege[]
}
@protobuf.Type.d("tss_hall_premiumcardprivilege_v1_BatchGetUserPrivilegeResp")
export class BatchGetUserPrivilegeResp extends protobuf.Message<IBatchGetUserPrivilegeResp> {
    constructor(properties: Properties<IBatchGetUserPrivilegeResp>) {
        super(properties);
        if (properties) {
            if (properties.users) { this.users = []; properties.users.forEach((value, index)=>{this.users[index] = UserPrivilege.create(properties.users[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_premiumcardprivilege_v1_UserPrivilege", "repeated")
    public users?: UserPrivilege[] = []
}
export interface IBatchGetMutiUserPrivilegeReq {
    uid?: number[]
    types?: tss_hall_common_PrivilegeType[]
}
@protobuf.Type.d("tss_hall_premiumcardprivilege_v1_BatchGetMutiUserPrivilegeReq")
export class BatchGetMutiUserPrivilegeReq extends protobuf.Message<IBatchGetMutiUserPrivilegeReq> {
    constructor(properties: Properties<IBatchGetMutiUserPrivilegeReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = []; properties.uid.forEach((value, index)=>{this.uid[index] = properties.uid[index]})}
            if (properties.types) { this.types = []; properties.types.forEach((value, index)=>{this.types[index] = properties.types[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public uid?: number[] = []
    @protobuf.Field.d(2, tss_hall_common_PrivilegeType, "repeated", tss_hall_common_PrivilegeType.PrivilegeTypeUnknown)
    public types?: tss_hall_common_PrivilegeType[] = []
}
export interface IMutiUserPrivilege {
    uid?: number|null
    users?: IUserPrivilege[]
}
@protobuf.Type.d("tss_hall_premiumcardprivilege_v1_MutiUserPrivilege")
export class MutiUserPrivilege extends protobuf.Message<IMutiUserPrivilege> {
    constructor(properties: Properties<IMutiUserPrivilege>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.users) { this.users = []; properties.users.forEach((value, index)=>{this.users[index] = UserPrivilege.create(properties.users[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "tss_hall_premiumcardprivilege_v1_UserPrivilege", "repeated")
    public users?: UserPrivilege[] = []
}
export interface IBatchGetMutiUserPrivilegeResp {
    users?: IMutiUserPrivilege[]
}
@protobuf.Type.d("tss_hall_premiumcardprivilege_v1_BatchGetMutiUserPrivilegeResp")
export class BatchGetMutiUserPrivilegeResp extends protobuf.Message<IBatchGetMutiUserPrivilegeResp> {
    constructor(properties: Properties<IBatchGetMutiUserPrivilegeResp>) {
        super(properties);
        if (properties) {
            if (properties.users) { this.users = []; properties.users.forEach((value, index)=>{this.users[index] = MutiUserPrivilege.create(properties.users[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_premiumcardprivilege_v1_MutiUserPrivilege", "repeated")
    public users?: MutiUserPrivilege[] = []
}
export interface IDeletePrivilegeConfigReq {
    id?: number|null
    operator?: string|null
}
@protobuf.Type.d("tss_hall_premiumcardprivilege_v1_DeletePrivilegeConfigReq")
export class DeletePrivilegeConfigReq extends protobuf.Message<IDeletePrivilegeConfigReq> {
    constructor(properties: Properties<IDeletePrivilegeConfigReq>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.operator) { this.operator = properties.operator }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public id?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public operator?: string|null = ""
}
export interface IRefundUserPrivilegeReq {
    uid?: number|null
    type?: tss_hall_common_PrivilegeType|null
}
@protobuf.Type.d("tss_hall_premiumcardprivilege_v1_RefundUserPrivilegeReq")
export class RefundUserPrivilegeReq extends protobuf.Message<IRefundUserPrivilegeReq> {
    constructor(properties: Properties<IRefundUserPrivilegeReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.type) { this.type = properties.type }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, tss_hall_common_PrivilegeType, "optional", tss_hall_common_PrivilegeType.PrivilegeTypeUnknown)
    public type?: tss_hall_common_PrivilegeType|null = tss_hall_common_PrivilegeType.PrivilegeTypeUnknown
}
export interface IPriority {
    id?: number|null
    priority?: number|null
}
@protobuf.Type.d("tss_hall_premiumcardprivilege_v1_Priority")
export class Priority extends protobuf.Message<IPriority> {
    constructor(properties: Properties<IPriority>) {
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
export interface IBatchUpdatePriorityReq {
    priority?: IPriority[]
}
@protobuf.Type.d("tss_hall_premiumcardprivilege_v1_BatchUpdatePriorityReq")
export class BatchUpdatePriorityReq extends protobuf.Message<IBatchUpdatePriorityReq> {
    constructor(properties: Properties<IBatchUpdatePriorityReq>) {
        super(properties);
        if (properties) {
            if (properties.priority) { this.priority = []; properties.priority.forEach((value, index)=>{this.priority[index] = Priority.create(properties.priority[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_premiumcardprivilege_v1_Priority", "repeated")
    public priority?: Priority[] = []
}
export interface IListPrivilegeConfigCMSReq {
    page?: number|null
    pageSize?: number|null
    cardType?: tss_hall_common_PremiumCardType|null
    state?: tss_common_State|null
    privilegeType?: tss_hall_common_PrivilegeType[]
    applicationId?: string|null
    operator?: string|null
    effectiveVipLevel?: number|null
}
@protobuf.Type.d("tss_hall_premiumcardprivilege_v1_ListPrivilegeConfigCMSReq")
export class ListPrivilegeConfigCMSReq extends protobuf.Message<IListPrivilegeConfigCMSReq> {
    constructor(properties: Properties<IListPrivilegeConfigCMSReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.cardType) { this.cardType = properties.cardType }
            if (properties.state) { this.state = properties.state }
            if (properties.privilegeType) { this.privilegeType = []; properties.privilegeType.forEach((value, index)=>{this.privilegeType[index] = properties.privilegeType[index]})}
            if (properties.applicationId) { this.applicationId = properties.applicationId }
            if (properties.operator) { this.operator = properties.operator }
            if (properties.effectiveVipLevel) { this.effectiveVipLevel = properties.effectiveVipLevel }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(3, tss_hall_common_PremiumCardType, "optional", tss_hall_common_PremiumCardType.PremiumCardTypeUnknown)
    public cardType?: tss_hall_common_PremiumCardType|null = tss_hall_common_PremiumCardType.PremiumCardTypeUnknown
    @protobuf.Field.d(4, tss_common_State, "optional", tss_common_State.StateUnknown)
    public state?: tss_common_State|null = tss_common_State.StateUnknown
    @protobuf.Field.d(5, tss_hall_common_PrivilegeType, "repeated", tss_hall_common_PrivilegeType.PrivilegeTypeUnknown)
    public privilegeType?: tss_hall_common_PrivilegeType[] = []
    @protobuf.Field.d(6, "string", "optional", )
    public applicationId?: string|null = ""
    @protobuf.Field.d(7, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(8, "int64", "optional", 0)
    public effectiveVipLevel?: number|null = 0
}
export interface IListPrivilegeConfigCMSResp {
    conf?: IPrivilegeConfig[]
    total?: number|null
}
@protobuf.Type.d("tss_hall_premiumcardprivilege_v1_ListPrivilegeConfigCMSResp")
export class ListPrivilegeConfigCMSResp extends protobuf.Message<IListPrivilegeConfigCMSResp> {
    constructor(properties: Properties<IListPrivilegeConfigCMSResp>) {
        super(properties);
        if (properties) {
            if (properties.conf) { this.conf = []; properties.conf.forEach((value, index)=>{this.conf[index] = PrivilegeConfig.create(properties.conf[index]) as any})}
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "tss_hall_premiumcardprivilege_v1_PrivilegeConfig", "repeated")
    public conf?: PrivilegeConfig[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public total?: number|null = 0
}
class $Premiumcardprivilege extends RpcService {
    async SavePrivilegeConfig(req: ISavePrivilegeConfigReq, params?: RpcParams) : Promise<{err:number, resp:ISavePrivilegeConfigResp}> {
        let data = SavePrivilegeConfigReq.create(req)
        this.onBeforeReq("SavePrivilegeConfig", data, params)
        const buffer = SavePrivilegeConfigReq.encode(data).finish()
        let [err, pack] = await this.call("SavePrivilegeConfig", buffer, params)
        if (err) {
            this.onBeforeResp("SavePrivilegeConfig", err)
            return {err: err, resp: null}
        } else {
            let resp = SavePrivilegeConfigResp.decode(pack) as any
            this.onBeforeResp("SavePrivilegeConfig", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListPrivilegeConfig(req: IListPrivilegeConfigReq, params?: RpcParams) : Promise<{err:number, resp:IListPrivilegeConfigResp}> {
        let data = ListPrivilegeConfigReq.create(req)
        this.onBeforeReq("ListPrivilegeConfig", data, params)
        const buffer = ListPrivilegeConfigReq.encode(data).finish()
        let [err, pack] = await this.call("ListPrivilegeConfig", buffer, params)
        if (err) {
            this.onBeforeResp("ListPrivilegeConfig", err)
            return {err: err, resp: null}
        } else {
            let resp = ListPrivilegeConfigResp.decode(pack) as any
            this.onBeforeResp("ListPrivilegeConfig", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListPrivilegeConfigCMS(req: IListPrivilegeConfigCMSReq, params?: RpcParams) : Promise<{err:number, resp:IListPrivilegeConfigCMSResp}> {
        let data = ListPrivilegeConfigCMSReq.create(req)
        this.onBeforeReq("ListPrivilegeConfigCMS", data, params)
        const buffer = ListPrivilegeConfigCMSReq.encode(data).finish()
        let [err, pack] = await this.call("ListPrivilegeConfigCMS", buffer, params)
        if (err) {
            this.onBeforeResp("ListPrivilegeConfigCMS", err)
            return {err: err, resp: null}
        } else {
            let resp = ListPrivilegeConfigCMSResp.decode(pack) as any
            this.onBeforeResp("ListPrivilegeConfigCMS", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetPrivilegeConfig(req: IGetPrivilegeConfigReq, params?: RpcParams) : Promise<{err:number, resp:IGetPrivilegeConfigResp}> {
        let data = GetPrivilegeConfigReq.create(req)
        this.onBeforeReq("GetPrivilegeConfig", data, params)
        const buffer = GetPrivilegeConfigReq.encode(data).finish()
        let [err, pack] = await this.call("GetPrivilegeConfig", buffer, params)
        if (err) {
            this.onBeforeResp("GetPrivilegeConfig", err)
            return {err: err, resp: null}
        } else {
            let resp = GetPrivilegeConfigResp.decode(pack) as any
            this.onBeforeResp("GetPrivilegeConfig", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DeletePrivilegeConfig(req: IDeletePrivilegeConfigReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = DeletePrivilegeConfigReq.create(req)
        this.onBeforeReq("DeletePrivilegeConfig", data, params)
        const buffer = DeletePrivilegeConfigReq.encode(data).finish()
        let [err, pack] = await this.call("DeletePrivilegeConfig", buffer, params)
        if (err) {
            this.onBeforeResp("DeletePrivilegeConfig", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("DeletePrivilegeConfig", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetUserPrivilege(req: IGetUserPrivilegeReq, params?: RpcParams) : Promise<{err:number, resp:IGetUserPrivilegeResp}> {
        let data = GetUserPrivilegeReq.create(req)
        this.onBeforeReq("GetUserPrivilege", data, params)
        const buffer = GetUserPrivilegeReq.encode(data).finish()
        let [err, pack] = await this.call("GetUserPrivilege", buffer, params)
        if (err) {
            this.onBeforeResp("GetUserPrivilege", err)
            return {err: err, resp: null}
        } else {
            let resp = GetUserPrivilegeResp.decode(pack) as any
            this.onBeforeResp("GetUserPrivilege", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetUserPrivilege(req: IBatchGetUserPrivilegeReq, params?: RpcParams) : Promise<{err:number, resp:IBatchGetUserPrivilegeResp}> {
        let data = BatchGetUserPrivilegeReq.create(req)
        this.onBeforeReq("BatchGetUserPrivilege", data, params)
        const buffer = BatchGetUserPrivilegeReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetUserPrivilege", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetUserPrivilege", err)
            return {err: err, resp: null}
        } else {
            let resp = BatchGetUserPrivilegeResp.decode(pack) as any
            this.onBeforeResp("BatchGetUserPrivilege", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ExerciseUserPrivilege(req: IExerciseUserPrivilegeReq, params?: RpcParams) : Promise<{err:number, resp:IExerciseUserPrivilegeResp}> {
        let data = ExerciseUserPrivilegeReq.create(req)
        this.onBeforeReq("ExerciseUserPrivilege", data, params)
        const buffer = ExerciseUserPrivilegeReq.encode(data).finish()
        let [err, pack] = await this.call("ExerciseUserPrivilege", buffer, params)
        if (err) {
            this.onBeforeResp("ExerciseUserPrivilege", err)
            return {err: err, resp: null}
        } else {
            let resp = ExerciseUserPrivilegeResp.decode(pack) as any
            this.onBeforeResp("ExerciseUserPrivilege", err, resp)
            return {err: null, resp: resp}
        }
    }
    async RefundUserPrivilege(req: IRefundUserPrivilegeReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = RefundUserPrivilegeReq.create(req)
        this.onBeforeReq("RefundUserPrivilege", data, params)
        const buffer = RefundUserPrivilegeReq.encode(data).finish()
        let [err, pack] = await this.call("RefundUserPrivilege", buffer, params)
        if (err) {
            this.onBeforeResp("RefundUserPrivilege", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("RefundUserPrivilege", err, resp)
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
    async BatchGetPrivilegeForSync(req: base_IBatchGetResourceReq, params?: RpcParams) : Promise<{err:number, resp:base_IBatchGetResourceResp}> {
        let data = base_BatchGetResourceReq.create(req)
        this.onBeforeReq("BatchGetPrivilegeForSync", data, params)
        const buffer = base_BatchGetResourceReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetPrivilegeForSync", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetPrivilegeForSync", err)
            return {err: err, resp: null}
        } else {
            let resp = base_BatchGetResourceResp.decode(pack) as any
            this.onBeforeResp("BatchGetPrivilegeForSync", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetMutiUserPrivilege(req: IBatchGetMutiUserPrivilegeReq, params?: RpcParams) : Promise<{err:number, resp:IBatchGetMutiUserPrivilegeResp}> {
        let data = BatchGetMutiUserPrivilegeReq.create(req)
        this.onBeforeReq("BatchGetMutiUserPrivilege", data, params)
        const buffer = BatchGetMutiUserPrivilegeReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetMutiUserPrivilege", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetMutiUserPrivilege", err)
            return {err: err, resp: null}
        } else {
            let resp = BatchGetMutiUserPrivilegeResp.decode(pack) as any
            this.onBeforeResp("BatchGetMutiUserPrivilege", err, resp)
            return {err: null, resp: resp}
        }
    }
}
export const Premiumcardprivilege = new $Premiumcardprivilege({
    name: "tss.hall.premiumcardprivilege.v1",
})
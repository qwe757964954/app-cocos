import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
export enum ActivityModuleType {  
    ActivityModuleUnknown = 0,  
    ActivityModuleTask = 1,  
    ActivityModuleRank = 2,  
    ActivityModulePrizeDraw = 3,  
    ActivityModuleLeague = 4,  
    ActivityModuleExchange = 5,
}
export interface IMsgActivityPopUpRecommended {
    productId?: number|null
    mungNum?: number|null
}
@protobuf.Type.d("tss_hall_common_MsgActivityPopUpRecommended")
export class MsgActivityPopUpRecommended extends protobuf.Message<IMsgActivityPopUpRecommended> {
    constructor(properties: Properties<IMsgActivityPopUpRecommended>) {
        super(properties);
        if (properties) {
            if (properties.productId) { this.productId = properties.productId }
            if (properties.mungNum) { this.mungNum = properties.mungNum }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public productId?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public mungNum?: number|null = 0
}
export interface IActivityModule {
    moduleType?: ActivityModuleType|null
    id?: number|null
    tag?: string|null
}
@protobuf.Type.d("tss_hall_common_ActivityModule")
export class ActivityModule extends protobuf.Message<IActivityModule> {
    constructor(properties: Properties<IActivityModule>) {
        super(properties);
        if (properties) {
            if (properties.moduleType) { this.moduleType = properties.moduleType }
            if (properties.id) { this.id = properties.id }
            if (properties.tag) { this.tag = properties.tag }
        }
	}
    @protobuf.Field.d(1, ActivityModuleType, "optional", ActivityModuleType.ActivityModuleUnknown)
    public moduleType?: ActivityModuleType|null = ActivityModuleType.ActivityModuleUnknown
    @protobuf.Field.d(2, "int64", "optional", 0)
    public id?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public tag?: string|null = ""
}
export interface IMsgActivityGeneral {
    activityModules?: IActivityModule[]
}
@protobuf.Type.d("tss_hall_common_MsgActivityGeneral")
export class MsgActivityGeneral extends protobuf.Message<IMsgActivityGeneral> {
    constructor(properties: Properties<IMsgActivityGeneral>) {
        super(properties);
        if (properties) {
            if (properties.activityModules) { this.activityModules = []; properties.activityModules.forEach((value, index)=>{this.activityModules[index] = ActivityModule.create(properties.activityModules[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_common_ActivityModule", "repeated")
    public activityModules?: ActivityModule[] = []
}
export interface IUserActivityRecord {
    beginAt?: number|null
    duration?: number|null
    activated?: boolean|null
}
@protobuf.Type.d("tss_hall_common_UserActivityRecord")
export class UserActivityRecord extends protobuf.Message<IUserActivityRecord> {
    constructor(properties: Properties<IUserActivityRecord>) {
        super(properties);
        if (properties) {
            if (properties.beginAt) { this.beginAt = properties.beginAt }
            if (properties.duration) { this.duration = properties.duration }
            if (properties.activated) { this.activated = properties.activated }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public beginAt?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public duration?: number|null = 0
    @protobuf.Field.d(3, "bool", "optional", false)
    public activated?: boolean|null = false
}
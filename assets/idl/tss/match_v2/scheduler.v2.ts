import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  Void as base_Void,IVoid as base_IVoid ,  BatchGetResourceReq as base_BatchGetResourceReq,IBatchGetResourceReq as base_IBatchGetResourceReq ,  BatchGetResourceResp as base_BatchGetResourceResp,IBatchGetResourceResp as base_IBatchGetResourceResp ,  } from "idl/base/base"
import {  Scheduler as tss_match_v2_common_Scheduler,IScheduler as tss_match_v2_common_IScheduler ,  SchedulerState as tss_match_v2_common_SchedulerState ,  MatchTagType as tss_match_v2_common_MatchTagType ,  AppRemindInfo as tss_match_v2_common_AppRemindInfo,IAppRemindInfo as tss_match_v2_common_IAppRemindInfo ,  } from "idl/tss/match_v2/common/common"
export interface IDeleteSchedulerReq {
    schedulerID?: number|null
}
@protobuf.Type.d("tss_match_v2_scheduler_v2_DeleteSchedulerReq")
export class DeleteSchedulerReq extends protobuf.Message<IDeleteSchedulerReq> {
    constructor(properties: Properties<IDeleteSchedulerReq>) {
        super(properties);
        if (properties) {
            if (properties.schedulerID) { this.schedulerID = properties.schedulerID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public schedulerID?: number|null = 0
}
export interface IUpdateSchedulerReq {
    scheduler?: tss_match_v2_common_IScheduler
}
@protobuf.Type.d("tss_match_v2_scheduler_v2_UpdateSchedulerReq")
export class UpdateSchedulerReq extends protobuf.Message<IUpdateSchedulerReq> {
    constructor(properties: Properties<IUpdateSchedulerReq>) {
        super(properties);
        if (properties) {
            if (properties.scheduler) { this.scheduler = tss_match_v2_common_Scheduler.create(properties.scheduler) as any }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_common_Scheduler", "optional")
    public scheduler?: tss_match_v2_common_Scheduler|null
}
export interface IUpdateShowSeqReq {
    schedulerID?: number|null
    showSeq?: number|null
}
@protobuf.Type.d("tss_match_v2_scheduler_v2_UpdateShowSeqReq")
export class UpdateShowSeqReq extends protobuf.Message<IUpdateShowSeqReq> {
    constructor(properties: Properties<IUpdateShowSeqReq>) {
        super(properties);
        if (properties) {
            if (properties.schedulerID) { this.schedulerID = properties.schedulerID }
            if (properties.showSeq) { this.showSeq = properties.showSeq }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public schedulerID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public showSeq?: number|null = 0
}
export interface IUpdateSchedulerResp {
}
@protobuf.Type.d("tss_match_v2_scheduler_v2_UpdateSchedulerResp")
export class UpdateSchedulerResp extends protobuf.Message<IUpdateSchedulerResp> {
    constructor(properties: Properties<IUpdateSchedulerResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IScheduleReq {
    jobID?: string|null
    schedulerID?: number|null
    scheduTime?: string|null
}
@protobuf.Type.d("tss_match_v2_scheduler_v2_ScheduleReq")
export class ScheduleReq extends protobuf.Message<IScheduleReq> {
    constructor(properties: Properties<IScheduleReq>) {
        super(properties);
        if (properties) {
            if (properties.jobID) { this.jobID = properties.jobID }
            if (properties.schedulerID) { this.schedulerID = properties.schedulerID }
            if (properties.scheduTime) { this.scheduTime = properties.scheduTime }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public jobID?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public schedulerID?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public scheduTime?: string|null = ""
}
export interface IScheduleResp {
}
@protobuf.Type.d("tss_match_v2_scheduler_v2_ScheduleResp")
export class ScheduleResp extends protobuf.Message<IScheduleResp> {
    constructor(properties: Properties<IScheduleResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IUpdateSchedulerStateReq {
    ID?: number|null
    state?: tss_match_v2_common_SchedulerState|null
}
@protobuf.Type.d("tss_match_v2_scheduler_v2_UpdateSchedulerStateReq")
export class UpdateSchedulerStateReq extends protobuf.Message<IUpdateSchedulerStateReq> {
    constructor(properties: Properties<IUpdateSchedulerStateReq>) {
        super(properties);
        if (properties) {
            if (properties.ID) { this.ID = properties.ID }
            if (properties.state) { this.state = properties.state }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public ID?: number|null = 0
    @protobuf.Field.d(2, tss_match_v2_common_SchedulerState, "optional", tss_match_v2_common_SchedulerState.SchedulerStateUnknown)
    public state?: tss_match_v2_common_SchedulerState|null = tss_match_v2_common_SchedulerState.SchedulerStateUnknown
}
export interface IUpdateSchedulerStateResp {
}
@protobuf.Type.d("tss_match_v2_scheduler_v2_UpdateSchedulerStateResp")
export class UpdateSchedulerStateResp extends protobuf.Message<IUpdateSchedulerStateResp> {
    constructor(properties: Properties<IUpdateSchedulerStateResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IListSchedulerReq {
    page?: number|null
    pageSize?: number|null
    applicationId?: string|null
    matchID?: number|null
    matchName?: string|null
    state?: tss_match_v2_common_SchedulerState|null
    matchTagType?: tss_match_v2_common_MatchTagType|null
}
@protobuf.Type.d("tss_match_v2_scheduler_v2_ListSchedulerReq")
export class ListSchedulerReq extends protobuf.Message<IListSchedulerReq> {
    constructor(properties: Properties<IListSchedulerReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.applicationId) { this.applicationId = properties.applicationId }
            if (properties.matchID) { this.matchID = properties.matchID }
            if (properties.matchName) { this.matchName = properties.matchName }
            if (properties.state) { this.state = properties.state }
            if (properties.matchTagType) { this.matchTagType = properties.matchTagType }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public applicationId?: string|null = ""
    @protobuf.Field.d(4, "int64", "optional", 0)
    public matchID?: number|null = 0
    @protobuf.Field.d(5, "string", "optional", )
    public matchName?: string|null = ""
    @protobuf.Field.d(6, tss_match_v2_common_SchedulerState, "optional", tss_match_v2_common_SchedulerState.SchedulerStateUnknown)
    public state?: tss_match_v2_common_SchedulerState|null = tss_match_v2_common_SchedulerState.SchedulerStateUnknown
    @protobuf.Field.d(7, tss_match_v2_common_MatchTagType, "optional", tss_match_v2_common_MatchTagType.MatchTagTypeUnknown)
    public matchTagType?: tss_match_v2_common_MatchTagType|null = tss_match_v2_common_MatchTagType.MatchTagTypeUnknown
}
export interface IListSchedulerResp {
    schedulers?: tss_match_v2_common_IScheduler[]
    totalSize?: number|null
}
@protobuf.Type.d("tss_match_v2_scheduler_v2_ListSchedulerResp")
export class ListSchedulerResp extends protobuf.Message<IListSchedulerResp> {
    constructor(properties: Properties<IListSchedulerResp>) {
        super(properties);
        if (properties) {
            if (properties.schedulers) { this.schedulers = []; properties.schedulers.forEach((value, index)=>{this.schedulers[index] = tss_match_v2_common_Scheduler.create(properties.schedulers[index]) as any})}
            if (properties.totalSize) { this.totalSize = properties.totalSize }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_common_Scheduler", "repeated")
    public schedulers?: tss_match_v2_common_Scheduler[] = []
    @protobuf.Field.d(2, "int32", "optional", 0)
    public totalSize?: number|null = 0
}
export interface IBatchGetSchedulerByGameAndPlayWayReq {
    gameId?: string|null
    playWay?: number|null
}
@protobuf.Type.d("tss_match_v2_scheduler_v2_BatchGetSchedulerByGameAndPlayWayReq")
export class BatchGetSchedulerByGameAndPlayWayReq extends protobuf.Message<IBatchGetSchedulerByGameAndPlayWayReq> {
    constructor(properties: Properties<IBatchGetSchedulerByGameAndPlayWayReq>) {
        super(properties);
        if (properties) {
            if (properties.gameId) { this.gameId = properties.gameId }
            if (properties.playWay) { this.playWay = properties.playWay }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public gameId?: string|null = ""
    @protobuf.Field.d(2, "int32", "optional", 0)
    public playWay?: number|null = 0
}
export interface IBatchGetSchedulerByGameAndPlayWayResp {
    schedulers?: tss_match_v2_common_IScheduler[]
}
@protobuf.Type.d("tss_match_v2_scheduler_v2_BatchGetSchedulerByGameAndPlayWayResp")
export class BatchGetSchedulerByGameAndPlayWayResp extends protobuf.Message<IBatchGetSchedulerByGameAndPlayWayResp> {
    constructor(properties: Properties<IBatchGetSchedulerByGameAndPlayWayResp>) {
        super(properties);
        if (properties) {
            if (properties.schedulers) { this.schedulers = []; properties.schedulers.forEach((value, index)=>{this.schedulers[index] = tss_match_v2_common_Scheduler.create(properties.schedulers[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_common_Scheduler", "repeated")
    public schedulers?: tss_match_v2_common_Scheduler[] = []
}
export interface IGetSchedulerReq {
    id?: number|null
}
@protobuf.Type.d("tss_match_v2_scheduler_v2_GetSchedulerReq")
export class GetSchedulerReq extends protobuf.Message<IGetSchedulerReq> {
    constructor(properties: Properties<IGetSchedulerReq>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public id?: number|null = 0
}
export interface IGetSchedulerResp {
    scheduler?: tss_match_v2_common_IScheduler
}
@protobuf.Type.d("tss_match_v2_scheduler_v2_GetSchedulerResp")
export class GetSchedulerResp extends protobuf.Message<IGetSchedulerResp> {
    constructor(properties: Properties<IGetSchedulerResp>) {
        super(properties);
        if (properties) {
            if (properties.scheduler) { this.scheduler = tss_match_v2_common_Scheduler.create(properties.scheduler) as any }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_common_Scheduler", "optional")
    public scheduler?: tss_match_v2_common_Scheduler|null
}
export interface IGetAppRemindInfoResp {
    remindInfo?: tss_match_v2_common_IAppRemindInfo[]
}
@protobuf.Type.d("tss_match_v2_scheduler_v2_GetAppRemindInfoResp")
export class GetAppRemindInfoResp extends protobuf.Message<IGetAppRemindInfoResp> {
    constructor(properties: Properties<IGetAppRemindInfoResp>) {
        super(properties);
        if (properties) {
            if (properties.remindInfo) { this.remindInfo = []; properties.remindInfo.forEach((value, index)=>{this.remindInfo[index] = tss_match_v2_common_AppRemindInfo.create(properties.remindInfo[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_common_AppRemindInfo", "repeated")
    public remindInfo?: tss_match_v2_common_AppRemindInfo[] = []
}
export interface IGetOfficeRuleDescReq {
    id?: number|null
}
@protobuf.Type.d("tss_match_v2_scheduler_v2_GetOfficeRuleDescReq")
export class GetOfficeRuleDescReq extends protobuf.Message<IGetOfficeRuleDescReq> {
    constructor(properties: Properties<IGetOfficeRuleDescReq>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public id?: number|null = 0
}
export interface IGetOfficeRuleDescResp {
    desc?: string|null
    revivalRuleDesc?: string|null
}
@protobuf.Type.d("tss_match_v2_scheduler_v2_GetOfficeRuleDescResp")
export class GetOfficeRuleDescResp extends protobuf.Message<IGetOfficeRuleDescResp> {
    constructor(properties: Properties<IGetOfficeRuleDescResp>) {
        super(properties);
        if (properties) {
            if (properties.desc) { this.desc = properties.desc }
            if (properties.revivalRuleDesc) { this.revivalRuleDesc = properties.revivalRuleDesc }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public desc?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public revivalRuleDesc?: string|null = ""
}
class $Scheduler extends RpcService {
    async UpdateScheduler(req: IUpdateSchedulerReq, params?: RpcParams) : Promise<{err:number, resp:IUpdateSchedulerResp}> {
        let data = UpdateSchedulerReq.create(req)
        this.onBeforeReq("UpdateScheduler", data, params)
        const buffer = UpdateSchedulerReq.encode(data).finish()
        let [err, pack] = await this.call("UpdateScheduler", buffer, params)
        if (err) {
            this.onBeforeResp("UpdateScheduler", err)
            return {err: err, resp: null}
        } else {
            let resp = UpdateSchedulerResp.decode(pack) as any
            this.onBeforeResp("UpdateScheduler", err, resp)
            return {err: null, resp: resp}
        }
    }
    async UpdateShowSeq(req: IUpdateShowSeqReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = UpdateShowSeqReq.create(req)
        this.onBeforeReq("UpdateShowSeq", data, params)
        const buffer = UpdateShowSeqReq.encode(data).finish()
        let [err, pack] = await this.call("UpdateShowSeq", buffer, params)
        if (err) {
            this.onBeforeResp("UpdateShowSeq", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("UpdateShowSeq", err, resp)
            return {err: null, resp: resp}
        }
    }
    async Schedule(req: IScheduleReq, params?: RpcParams) : Promise<{err:number, resp:IScheduleResp}> {
        let data = ScheduleReq.create(req)
        this.onBeforeReq("Schedule", data, params)
        const buffer = ScheduleReq.encode(data).finish()
        let [err, pack] = await this.call("Schedule", buffer, params)
        if (err) {
            this.onBeforeResp("Schedule", err)
            return {err: err, resp: null}
        } else {
            let resp = ScheduleResp.decode(pack) as any
            this.onBeforeResp("Schedule", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListScheduler(req: IListSchedulerReq, params?: RpcParams) : Promise<{err:number, resp:IListSchedulerResp}> {
        let data = ListSchedulerReq.create(req)
        this.onBeforeReq("ListScheduler", data, params)
        const buffer = ListSchedulerReq.encode(data).finish()
        let [err, pack] = await this.call("ListScheduler", buffer, params)
        if (err) {
            this.onBeforeResp("ListScheduler", err)
            return {err: err, resp: null}
        } else {
            let resp = ListSchedulerResp.decode(pack) as any
            this.onBeforeResp("ListScheduler", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetSchedulerByGameAndPlayWay(req: IBatchGetSchedulerByGameAndPlayWayReq, params?: RpcParams) : Promise<{err:number, resp:IBatchGetSchedulerByGameAndPlayWayResp}> {
        let data = BatchGetSchedulerByGameAndPlayWayReq.create(req)
        this.onBeforeReq("BatchGetSchedulerByGameAndPlayWay", data, params)
        const buffer = BatchGetSchedulerByGameAndPlayWayReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetSchedulerByGameAndPlayWay", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetSchedulerByGameAndPlayWay", err)
            return {err: err, resp: null}
        } else {
            let resp = BatchGetSchedulerByGameAndPlayWayResp.decode(pack) as any
            this.onBeforeResp("BatchGetSchedulerByGameAndPlayWay", err, resp)
            return {err: null, resp: resp}
        }
    }
    async UpdateSchedulerState(req: IUpdateSchedulerStateReq, params?: RpcParams) : Promise<{err:number, resp:IUpdateSchedulerStateResp}> {
        let data = UpdateSchedulerStateReq.create(req)
        this.onBeforeReq("UpdateSchedulerState", data, params)
        const buffer = UpdateSchedulerStateReq.encode(data).finish()
        let [err, pack] = await this.call("UpdateSchedulerState", buffer, params)
        if (err) {
            this.onBeforeResp("UpdateSchedulerState", err)
            return {err: err, resp: null}
        } else {
            let resp = UpdateSchedulerStateResp.decode(pack) as any
            this.onBeforeResp("UpdateSchedulerState", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetScheduler(req: IGetSchedulerReq, params?: RpcParams) : Promise<{err:number, resp:IGetSchedulerResp}> {
        let data = GetSchedulerReq.create(req)
        this.onBeforeReq("GetScheduler", data, params)
        const buffer = GetSchedulerReq.encode(data).finish()
        let [err, pack] = await this.call("GetScheduler", buffer, params)
        if (err) {
            this.onBeforeResp("GetScheduler", err)
            return {err: err, resp: null}
        } else {
            let resp = GetSchedulerResp.decode(pack) as any
            this.onBeforeResp("GetScheduler", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetAppRemindInfo(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:IGetAppRemindInfoResp}> {
        let data = base_Void.create(req)
        this.onBeforeReq("GetAppRemindInfo", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("GetAppRemindInfo", buffer, params)
        if (err) {
            this.onBeforeResp("GetAppRemindInfo", err)
            return {err: err, resp: null}
        } else {
            let resp = GetAppRemindInfoResp.decode(pack) as any
            this.onBeforeResp("GetAppRemindInfo", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetOfficeRuleDesc(req: IGetOfficeRuleDescReq, params?: RpcParams) : Promise<{err:number, resp:IGetOfficeRuleDescResp}> {
        let data = GetOfficeRuleDescReq.create(req)
        this.onBeforeReq("GetOfficeRuleDesc", data, params)
        const buffer = GetOfficeRuleDescReq.encode(data).finish()
        let [err, pack] = await this.call("GetOfficeRuleDesc", buffer, params)
        if (err) {
            this.onBeforeResp("GetOfficeRuleDesc", err)
            return {err: err, resp: null}
        } else {
            let resp = GetOfficeRuleDescResp.decode(pack) as any
            this.onBeforeResp("GetOfficeRuleDesc", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DeleteScheduler(req: IDeleteSchedulerReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = DeleteSchedulerReq.create(req)
        this.onBeforeReq("DeleteScheduler", data, params)
        const buffer = DeleteSchedulerReq.encode(data).finish()
        let [err, pack] = await this.call("DeleteScheduler", buffer, params)
        if (err) {
            this.onBeforeResp("DeleteScheduler", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("DeleteScheduler", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ReloadScheduler(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = base_Void.create(req)
        this.onBeforeReq("ReloadScheduler", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("ReloadScheduler", buffer, params)
        if (err) {
            this.onBeforeResp("ReloadScheduler", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("ReloadScheduler", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetSchedulerForSync(req: base_IBatchGetResourceReq, params?: RpcParams) : Promise<{err:number, resp:base_IBatchGetResourceResp}> {
        let data = base_BatchGetResourceReq.create(req)
        this.onBeforeReq("BatchGetSchedulerForSync", data, params)
        const buffer = base_BatchGetResourceReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetSchedulerForSync", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetSchedulerForSync", err)
            return {err: err, resp: null}
        } else {
            let resp = base_BatchGetResourceResp.decode(pack) as any
            this.onBeforeResp("BatchGetSchedulerForSync", err, resp)
            return {err: null, resp: resp}
        }
    }
}
export const Scheduler = new $Scheduler({
    name: "tss.match.v2.scheduler.v2",
})
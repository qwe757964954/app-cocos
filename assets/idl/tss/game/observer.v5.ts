import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
export type Properties<T> = { [P in keyof T]?: T[P] };
import {  Void as base_Void,IVoid as base_IVoid ,  } from "idl/base/base"
export interface IJoinReq {
    isRealtime?: boolean|null
}
@protobuf.Type.d("tss_game_observer_v5_JoinReq")
export class JoinReq extends protobuf.Message<IJoinReq> {
    constructor(properties: Properties<IJoinReq>) {
        super(properties);
        if (properties) {
            if (properties.isRealtime) { this.isRealtime = properties.isRealtime }
        }
	}
    @protobuf.Field.d(1, "bool", "optional", false)
    public isRealtime?: boolean|null = false
}
export interface ISnapshot {
    ID?: number|null
    data?: Uint8Array
    behaviorID?: number|null
}
@protobuf.Type.d("tss_game_observer_v5_Snapshot")
export class Snapshot extends protobuf.Message<ISnapshot> {
    constructor(properties: Properties<ISnapshot>) {
        super(properties);
        if (properties) {
            if (properties.ID) { this.ID = properties.ID }
            if (properties.data) { this.data = properties.data }
            if (properties.behaviorID) { this.behaviorID = properties.behaviorID }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public ID?: number|null = 0
    @protobuf.Field.d(2, "bytes", "optional", [])
    public data?: Uint8Array
    @protobuf.Field.d(3, "int32", "optional", 0)
    public behaviorID?: number|null = 0
}
export interface ILeaveResp {
    code?: number|null
}
@protobuf.Type.d("tss_game_observer_v5_LeaveResp")
export class LeaveResp extends protobuf.Message<ILeaveResp> {
    constructor(properties: Properties<ILeaveResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
}
export interface IGetObserverNumReq {
    isRealtime?: boolean|null
}
@protobuf.Type.d("tss_game_observer_v5_GetObserverNumReq")
export class GetObserverNumReq extends protobuf.Message<IGetObserverNumReq> {
    constructor(properties: Properties<IGetObserverNumReq>) {
        super(properties);
        if (properties) {
            if (properties.isRealtime) { this.isRealtime = properties.isRealtime }
        }
	}
    @protobuf.Field.d(1, "bool", "optional", false)
    public isRealtime?: boolean|null = false
}
export interface IGetObserverNumResp {
    code?: number|null
    num?: number|null
}
@protobuf.Type.d("tss_game_observer_v5_GetObserverNumResp")
export class GetObserverNumResp extends protobuf.Message<IGetObserverNumResp> {
    constructor(properties: Properties<IGetObserverNumResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.num) { this.num = properties.num }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public num?: number|null = 0
}
export interface IListObserverReq {
    isRealtime?: boolean|null
}
@protobuf.Type.d("tss_game_observer_v5_ListObserverReq")
export class ListObserverReq extends protobuf.Message<IListObserverReq> {
    constructor(properties: Properties<IListObserverReq>) {
        super(properties);
        if (properties) {
            if (properties.isRealtime) { this.isRealtime = properties.isRealtime }
        }
	}
    @protobuf.Field.d(1, "bool", "optional", false)
    public isRealtime?: boolean|null = false
}
export interface IListObserverResp {
    code?: number|null
    users?: number[]
}
@protobuf.Type.d("tss_game_observer_v5_ListObserverResp")
export class ListObserverResp extends protobuf.Message<IListObserverResp> {
    constructor(properties: Properties<IListObserverResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.users) { this.users = []; properties.users.forEach((value, index)=>{this.users[index] = properties.users[index]})}
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
    @protobuf.Field.d(2, "int64", "repeated", [])
    public users?: number[] = []
}
export interface IMsgSnapshot {
    ID?: number|null
    data?: Uint8Array
}
@protobuf.Type.d("tss_game_observer_v5_MsgSnapshot")
export class MsgSnapshot extends protobuf.Message<IMsgSnapshot> {
    constructor(properties: Properties<IMsgSnapshot>) {
        super(properties);
        if (properties) {
            if (properties.ID) { this.ID = properties.ID }
            if (properties.data) { this.data = properties.data }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public ID?: number|null = 0
    @protobuf.Field.d(2, "bytes", "optional", [])
    public data?: Uint8Array
}
export interface IMsgBehavior {
    ID?: number|null
    data?: Uint8Array
    timestamp?: number|null
}
@protobuf.Type.d("tss_game_observer_v5_MsgBehavior")
export class MsgBehavior extends protobuf.Message<IMsgBehavior> {
    constructor(properties: Properties<IMsgBehavior>) {
        super(properties);
        if (properties) {
            if (properties.ID) { this.ID = properties.ID }
            if (properties.data) { this.data = properties.data }
            if (properties.timestamp) { this.timestamp = properties.timestamp }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public ID?: number|null = 0
    @protobuf.Field.d(2, "bytes", "optional", [])
    public data?: Uint8Array
    @protobuf.Field.d(3, "int64", "optional", 0)
    public timestamp?: number|null = 0
}
export interface IObserverInfo {
    delaySec?: number|null
    snapshot?: ISnapshot
}
@protobuf.Type.d("tss_game_observer_v5_ObserverInfo")
export class ObserverInfo extends protobuf.Message<IObserverInfo> {
    constructor(properties: Properties<IObserverInfo>) {
        super(properties);
        if (properties) {
            if (properties.delaySec) { this.delaySec = properties.delaySec }
            if (properties.snapshot) { this.snapshot = Snapshot.create(properties.snapshot) as any }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public delaySec?: number|null = 0
    @protobuf.Field.d(2, "tss_game_observer_v5_Snapshot", "optional")
    public snapshot?: Snapshot|null
}
export interface IInitResourceReq {
    gameID?: string|null
    version?: string|null
    startTime?: number|null
    obInfo?: IObserverInfo
}
@protobuf.Type.d("tss_game_observer_v5_InitResourceReq")
export class InitResourceReq extends protobuf.Message<IInitResourceReq> {
    constructor(properties: Properties<IInitResourceReq>) {
        super(properties);
        if (properties) {
            if (properties.gameID) { this.gameID = properties.gameID }
            if (properties.version) { this.version = properties.version }
            if (properties.startTime) { this.startTime = properties.startTime }
            if (properties.obInfo) { this.obInfo = ObserverInfo.create(properties.obInfo) as any }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public gameID?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public version?: string|null = ""
    @protobuf.Field.d(3, "int64", "optional", 0)
    public startTime?: number|null = 0
    @protobuf.Field.d(4, "tss_game_observer_v5_ObserverInfo", "optional")
    public obInfo?: ObserverInfo|null
}
export interface IInitResourceResp {
    code?: number|null
    obSrvID?: number|null
}
@protobuf.Type.d("tss_game_observer_v5_InitResourceResp")
export class InitResourceResp extends protobuf.Message<IInitResourceResp> {
    constructor(properties: Properties<IInitResourceResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.obSrvID) { this.obSrvID = properties.obSrvID }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public obSrvID?: number|null = 0
}
export interface IPostSnapshotReq {
    snapshot?: ISnapshot
}
@protobuf.Type.d("tss_game_observer_v5_PostSnapshotReq")
export class PostSnapshotReq extends protobuf.Message<IPostSnapshotReq> {
    constructor(properties: Properties<IPostSnapshotReq>) {
        super(properties);
        if (properties) {
            if (properties.snapshot) { this.snapshot = Snapshot.create(properties.snapshot) as any }
        }
	}
    @protobuf.Field.d(1, "tss_game_observer_v5_Snapshot", "optional")
    public snapshot?: Snapshot|null
}
export interface IBehavior {
    ID?: number|null
    data?: Uint8Array
    timestamp?: number|null
    snapshotID?: number|null
}
@protobuf.Type.d("tss_game_observer_v5_Behavior")
export class Behavior extends protobuf.Message<IBehavior> {
    constructor(properties: Properties<IBehavior>) {
        super(properties);
        if (properties) {
            if (properties.ID) { this.ID = properties.ID }
            if (properties.data) { this.data = properties.data }
            if (properties.timestamp) { this.timestamp = properties.timestamp }
            if (properties.snapshotID) { this.snapshotID = properties.snapshotID }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public ID?: number|null = 0
    @protobuf.Field.d(2, "bytes", "optional", [])
    public data?: Uint8Array
    @protobuf.Field.d(3, "int64", "optional", 0)
    public timestamp?: number|null = 0
    @protobuf.Field.d(4, "int32", "optional", 0)
    public snapshotID?: number|null = 0
}
export interface IJoinResp {
    code?: number|null
    snapshot?: ISnapshot
    behaviors?: IBehavior[]
    chatID?: string|null
}
@protobuf.Type.d("tss_game_observer_v5_JoinResp")
export class JoinResp extends protobuf.Message<IJoinResp> {
    constructor(properties: Properties<IJoinResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.snapshot) { this.snapshot = Snapshot.create(properties.snapshot) as any }
            if (properties.behaviors) { this.behaviors = []; properties.behaviors.forEach((value, index)=>{this.behaviors[index] = Behavior.create(properties.behaviors[index]) as any})}
            if (properties.chatID) { this.chatID = properties.chatID }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
    @protobuf.Field.d(2, "tss_game_observer_v5_Snapshot", "optional")
    public snapshot?: Snapshot|null
    @protobuf.Field.d(3, "tss_game_observer_v5_Behavior", "repeated")
    public behaviors?: Behavior[] = []
    @protobuf.Field.d(4, "string", "optional", )
    public chatID?: string|null = ""
}
export interface IPostBehaviorReq {
    behavior?: IBehavior
}
@protobuf.Type.d("tss_game_observer_v5_PostBehaviorReq")
export class PostBehaviorReq extends protobuf.Message<IPostBehaviorReq> {
    constructor(properties: Properties<IPostBehaviorReq>) {
        super(properties);
        if (properties) {
            if (properties.behavior) { this.behavior = Behavior.create(properties.behavior) as any }
        }
	}
    @protobuf.Field.d(1, "tss_game_observer_v5_Behavior", "optional")
    public behavior?: Behavior|null
}
export interface IReplayMsg {
    id?: number|null
    time?: number|null
    msg?: Uint8Array
}
@protobuf.Type.d("tss_game_observer_v5_ReplayMsg")
export class ReplayMsg extends protobuf.Message<IReplayMsg> {
    constructor(properties: Properties<IReplayMsg>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.time) { this.time = properties.time }
            if (properties.msg) { this.msg = properties.msg }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public id?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public time?: number|null = 0
    @protobuf.Field.d(3, "bytes", "optional", [])
    public msg?: Uint8Array
}
export interface IUserGameLog {
    uid?: number|null
    score?: number|null
    result?: number|null
    tags?: string[]
    role?: number|null
}
@protobuf.Type.d("tss_game_observer_v5_UserGameLog")
export class UserGameLog extends protobuf.Message<IUserGameLog> {
    constructor(properties: Properties<IUserGameLog>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.score) { this.score = properties.score }
            if (properties.result) { this.result = properties.result }
            if (properties.tags) { this.tags = []; properties.tags.forEach((value, index)=>{this.tags[index] = properties.tags[index]})}
            if (properties.role) { this.role = properties.role }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public score?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public result?: number|null = 0
    @protobuf.Field.d(4, "string", "repeated", [])
    public tags?: string[] = []
    @protobuf.Field.d(5, "int64", "optional", 0)
    public role?: number|null = 0
}
export interface IGameLog {
    tableKey?: string|null
    gameID?: string|null
    startTime?: number|null
    endTime?: number|null
    tags?: string[]
    userLogs?: IUserGameLog[]
}
@protobuf.Type.d("tss_game_observer_v5_GameLog")
export class GameLog extends protobuf.Message<IGameLog> {
    constructor(properties: Properties<IGameLog>) {
        super(properties);
        if (properties) {
            if (properties.tableKey) { this.tableKey = properties.tableKey }
            if (properties.gameID) { this.gameID = properties.gameID }
            if (properties.startTime) { this.startTime = properties.startTime }
            if (properties.endTime) { this.endTime = properties.endTime }
            if (properties.tags) { this.tags = []; properties.tags.forEach((value, index)=>{this.tags[index] = properties.tags[index]})}
            if (properties.userLogs) { this.userLogs = []; properties.userLogs.forEach((value, index)=>{this.userLogs[index] = UserGameLog.create(properties.userLogs[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public tableKey?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public gameID?: string|null = ""
    @protobuf.Field.d(3, "int64", "optional", 0)
    public startTime?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public endTime?: number|null = 0
    @protobuf.Field.d(5, "string", "repeated", [])
    public tags?: string[] = []
    @protobuf.Field.d(6, "tss_game_observer_v5_UserGameLog", "repeated")
    public userLogs?: UserGameLog[] = []
}
export interface IGetGameReplayReq {
    tableKey?: string|null
    version?: string|null
}
@protobuf.Type.d("tss_game_observer_v5_GetGameReplayReq")
export class GetGameReplayReq extends protobuf.Message<IGetGameReplayReq> {
    constructor(properties: Properties<IGetGameReplayReq>) {
        super(properties);
        if (properties) {
            if (properties.tableKey) { this.tableKey = properties.tableKey }
            if (properties.version) { this.version = properties.version }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public tableKey?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public version?: string|null = ""
}
export interface IGetGameReplayResp {
    code?: number|null
    number?: number|null
    data?: IReplayMsg[]
}
@protobuf.Type.d("tss_game_observer_v5_GetGameReplayResp")
export class GetGameReplayResp extends protobuf.Message<IGetGameReplayResp> {
    constructor(properties: Properties<IGetGameReplayResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.number) { this.number = properties.number }
            if (properties.data) { this.data = []; properties.data.forEach((value, index)=>{this.data[index] = ReplayMsg.create(properties.data[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public number?: number|null = 0
    @protobuf.Field.d(3, "tss_game_observer_v5_ReplayMsg", "repeated")
    public data?: ReplayMsg[] = []
}
export interface IListUserGameLogReq {
    uid?: number|null
    page?: number|null
    pageSize?: number|null
}
@protobuf.Type.d("tss_game_observer_v5_ListUserGameLogReq")
export class ListUserGameLogReq extends protobuf.Message<IListUserGameLogReq> {
    constructor(properties: Properties<IListUserGameLogReq>) {
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
export interface IListUserGameLogResp {
    code?: number|null
    logs?: IGameLog[]
}
@protobuf.Type.d("tss_game_observer_v5_ListUserGameLogResp")
export class ListUserGameLogResp extends protobuf.Message<IListUserGameLogResp> {
    constructor(properties: Properties<IListUserGameLogResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.logs) { this.logs = []; properties.logs.forEach((value, index)=>{this.logs[index] = GameLog.create(properties.logs[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
    @protobuf.Field.d(2, "tss_game_observer_v5_GameLog", "repeated")
    public logs?: GameLog[] = []
}
export interface IGetTogetherUIDByMTReq {
    uid?: number|null
    time?: number|null
    page?: number|null
    pageSize?: number|null
}
@protobuf.Type.d("tss_game_observer_v5_GetTogetherUIDByMTReq")
export class GetTogetherUIDByMTReq extends protobuf.Message<IGetTogetherUIDByMTReq> {
    constructor(properties: Properties<IGetTogetherUIDByMTReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.time) { this.time = properties.time }
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public time?: number|null = 0
    @protobuf.Field.d(3, "int32", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(4, "int32", "optional", 0)
    public pageSize?: number|null = 0
}
export interface IGetTogetherUIDByMTResp {
    code?: number|null
    uids?: number[]
    total?: number|null
}
@protobuf.Type.d("tss_game_observer_v5_GetTogetherUIDByMTResp")
export class GetTogetherUIDByMTResp extends protobuf.Message<IGetTogetherUIDByMTResp> {
    constructor(properties: Properties<IGetTogetherUIDByMTResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.uids) { this.uids = []; properties.uids.forEach((value, index)=>{this.uids[index] = properties.uids[index]})}
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
    @protobuf.Field.d(2, "int64", "repeated", [])
    public uids?: number[] = []
    @protobuf.Field.d(3, "int32", "optional", 0)
    public total?: number|null = 0
}
export interface ISubscribeReq {
    isRealtime?: boolean|null
}
@protobuf.Type.d("tss_game_observer_v5_SubscribeReq")
export class SubscribeReq extends protobuf.Message<ISubscribeReq> {
    constructor(properties: Properties<ISubscribeReq>) {
        super(properties);
        if (properties) {
            if (properties.isRealtime) { this.isRealtime = properties.isRealtime }
        }
	}
    @protobuf.Field.d(1, "bool", "optional", false)
    public isRealtime?: boolean|null = false
}
export interface IUnsubscribeReq {
}
@protobuf.Type.d("tss_game_observer_v5_UnsubscribeReq")
export class UnsubscribeReq extends protobuf.Message<IUnsubscribeReq> {
    constructor(properties: Properties<IUnsubscribeReq>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface ISubscribeResp {
    code?: number|null
    snapshot?: ISnapshot
    behaviors?: IBehavior[]
}
@protobuf.Type.d("tss_game_observer_v5_SubscribeResp")
export class SubscribeResp extends protobuf.Message<ISubscribeResp> {
    constructor(properties: Properties<ISubscribeResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.snapshot) { this.snapshot = Snapshot.create(properties.snapshot) as any }
            if (properties.behaviors) { this.behaviors = []; properties.behaviors.forEach((value, index)=>{this.behaviors[index] = Behavior.create(properties.behaviors[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
    @protobuf.Field.d(2, "tss_game_observer_v5_Snapshot", "optional")
    public snapshot?: Snapshot|null
    @protobuf.Field.d(3, "tss_game_observer_v5_Behavior", "repeated")
    public behaviors?: Behavior[] = []
}
export interface IUnsubscribeResp {
    code?: number|null
}
@protobuf.Type.d("tss_game_observer_v5_UnsubscribeResp")
export class UnsubscribeResp extends protobuf.Message<IUnsubscribeResp> {
    constructor(properties: Properties<IUnsubscribeResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
}
class $Observer extends RpcService {
    async Join(req: IJoinReq, params?: RpcParams) : Promise<{err:number, resp:IJoinResp}> {
        let data = JoinReq.create(req)
        console.log("Join...begin", data, params)
        const buffer = JoinReq.encode(data).finish()
        let [err, pack] = await this.call("Join", buffer, params)
        if (err) {
            console.error("Join...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = JoinResp.decode(pack) as any
            console.log("Join...end", resp)
            return {err: null, resp: resp}
        }
    }
    async Leave(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:ILeaveResp}> {
        let data = base_Void.create(req)
        console.log("Leave...begin", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("Leave", buffer, params)
        if (err) {
            console.error("Leave...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = LeaveResp.decode(pack) as any
            console.log("Leave...end", resp)
            return {err: null, resp: resp}
        }
    }
    async GetObserverNum(req: IGetObserverNumReq, params?: RpcParams) : Promise<{err:number, resp:IGetObserverNumResp}> {
        let data = GetObserverNumReq.create(req)
        console.log("GetObserverNum...begin", data, params)
        const buffer = GetObserverNumReq.encode(data).finish()
        let [err, pack] = await this.call("GetObserverNum", buffer, params)
        if (err) {
            console.error("GetObserverNum...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = GetObserverNumResp.decode(pack) as any
            console.log("GetObserverNum...end", resp)
            return {err: null, resp: resp}
        }
    }
    async ListObserver(req: IListObserverReq, params?: RpcParams) : Promise<{err:number, resp:IListObserverResp}> {
        let data = ListObserverReq.create(req)
        console.log("ListObserver...begin", data, params)
        const buffer = ListObserverReq.encode(data).finish()
        let [err, pack] = await this.call("ListObserver", buffer, params)
        if (err) {
            console.error("ListObserver...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = ListObserverResp.decode(pack) as any
            console.log("ListObserver...end", resp)
            return {err: null, resp: resp}
        }
    }
    async Subscribe(req: ISubscribeReq, params?: RpcParams) : Promise<{err:number, resp:ISubscribeResp}> {
        let data = SubscribeReq.create(req)
        console.log("Subscribe...begin", data, params)
        const buffer = SubscribeReq.encode(data).finish()
        let [err, pack] = await this.call("Subscribe", buffer, params)
        if (err) {
            console.error("Subscribe...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = SubscribeResp.decode(pack) as any
            console.log("Subscribe...end", resp)
            return {err: null, resp: resp}
        }
    }
    async Unsubscribe(req: IUnsubscribeReq, params?: RpcParams) : Promise<{err:number, resp:IUnsubscribeResp}> {
        let data = UnsubscribeReq.create(req)
        console.log("Unsubscribe...begin", data, params)
        const buffer = UnsubscribeReq.encode(data).finish()
        let [err, pack] = await this.call("Unsubscribe", buffer, params)
        if (err) {
            console.error("Unsubscribe...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = UnsubscribeResp.decode(pack) as any
            console.log("Unsubscribe...end", resp)
            return {err: null, resp: resp}
        }
    }
    async InitResource(req: IInitResourceReq, params?: RpcParams) : Promise<{err:number, resp:IInitResourceResp}> {
        let data = InitResourceReq.create(req)
        console.log("InitResource...begin", data, params)
        const buffer = InitResourceReq.encode(data).finish()
        let [err, pack] = await this.call("InitResource", buffer, params)
        if (err) {
            console.error("InitResource...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = InitResourceResp.decode(pack) as any
            console.log("InitResource...end", resp)
            return {err: null, resp: resp}
        }
    }
    async PostSnapshot(req: IPostSnapshotReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = PostSnapshotReq.create(req)
        console.log("PostSnapshot...begin", data, params)
        const buffer = PostSnapshotReq.encode(data).finish()
        let [err, pack] = await this.call("PostSnapshot", buffer, params)
        if (err) {
            console.error("PostSnapshot...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            console.log("PostSnapshot...end", resp)
            return {err: null, resp: resp}
        }
    }
    async PostBehavior(req: IPostBehaviorReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = PostBehaviorReq.create(req)
        console.log("PostBehavior...begin", data, params)
        const buffer = PostBehaviorReq.encode(data).finish()
        let [err, pack] = await this.call("PostBehavior", buffer, params)
        if (err) {
            console.error("PostBehavior...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            console.log("PostBehavior...end", resp)
            return {err: null, resp: resp}
        }
    }
    async PostOver(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = base_Void.create(req)
        console.log("PostOver...begin", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("PostOver", buffer, params)
        if (err) {
            console.error("PostOver...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            console.log("PostOver...end", resp)
            return {err: null, resp: resp}
        }
    }
    async GetGameReplay(req: IGetGameReplayReq, params?: RpcParams) : Promise<{err:number, resp:IGetGameReplayResp}> {
        let data = GetGameReplayReq.create(req)
        console.log("GetGameReplay...begin", data, params)
        const buffer = GetGameReplayReq.encode(data).finish()
        let [err, pack] = await this.call("GetGameReplay", buffer, params)
        if (err) {
            console.error("GetGameReplay...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = GetGameReplayResp.decode(pack) as any
            console.log("GetGameReplay...end", resp)
            return {err: null, resp: resp}
        }
    }
    async GetGameReplay2(req: IGetGameReplayReq, params?: RpcParams) : Promise<{err:number, resp:IGetGameReplayResp}> {
        let data = GetGameReplayReq.create(req)
        console.log("GetGameReplay2...begin", data, params)
        const buffer = GetGameReplayReq.encode(data).finish()
        let [err, pack] = await this.call("GetGameReplay2", buffer, params)
        if (err) {
            console.error("GetGameReplay2...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = GetGameReplayResp.decode(pack) as any
            console.log("GetGameReplay2...end", resp)
            return {err: null, resp: resp}
        }
    }
    async CleanGameReplay(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = base_Void.create(req)
        console.log("CleanGameReplay...begin", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("CleanGameReplay", buffer, params)
        if (err) {
            console.error("CleanGameReplay...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            console.log("CleanGameReplay...end", resp)
            return {err: null, resp: resp}
        }
    }
    NotifyUserLeave(data: Uint8Array, params: RpcParams) : {msg: base_IVoid, eventID?: number} {
        let msg = base_Void.decode(data)
        return {msg: msg}
    }
    NotifySnapshot(data: Uint8Array, params: RpcParams) : {msg: IMsgSnapshot, eventID?: number} {
        let msg = MsgSnapshot.decode(data)
        return {msg: msg}
    }
    NotifyBehavior(data: Uint8Array, params: RpcParams) : {msg: IMsgBehavior, eventID?: number} {
        let msg = MsgBehavior.decode(data)
        return {msg: msg}
    }
    NotifyGameReplay(data: Uint8Array, params: RpcParams) : {msg: IReplayMsg, eventID?: number} {
        let msg = ReplayMsg.decode(data)
        return {msg: msg}
    }
}
export const Observer = new $Observer({
    name: "tss.game.observer.v5",
})
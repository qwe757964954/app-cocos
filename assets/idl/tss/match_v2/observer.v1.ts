import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  Void as base_Void,IVoid as base_IVoid ,  } from "idl/base/base"
export interface IObserverInfo {
    delaySec?: number|null
    snapshot?: ISnapshotFrame
}
@protobuf.Type.d("tss_match_v2_observer_v1_ObserverInfo")
export class ObserverInfo extends protobuf.Message<IObserverInfo> {
    constructor(properties: Properties<IObserverInfo>) {
        super(properties);
        if (properties) {
            if (properties.delaySec) { this.delaySec = properties.delaySec }
            if (properties.snapshot) { this.snapshot = SnapshotFrame.create(properties.snapshot) as any }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public delaySec?: number|null = 0
    @protobuf.Field.d(2, "tss_match_v2_observer_v1_SnapshotFrame", "optional")
    public snapshot?: SnapshotFrame|null
}
export interface IHeadFrame {
    ID?: string|null
    version?: string|null
    startTime?: number|null
    observerInfo?: IObserverInfo
}
@protobuf.Type.d("tss_match_v2_observer_v1_HeadFrame")
export class HeadFrame extends protobuf.Message<IHeadFrame> {
    constructor(properties: Properties<IHeadFrame>) {
        super(properties);
        if (properties) {
            if (properties.ID) { this.ID = properties.ID }
            if (properties.version) { this.version = properties.version }
            if (properties.startTime) { this.startTime = properties.startTime }
            if (properties.observerInfo) { this.observerInfo = ObserverInfo.create(properties.observerInfo) as any }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public ID?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public version?: string|null = ""
    @protobuf.Field.d(3, "int64", "optional", 0)
    public startTime?: number|null = 0
    @protobuf.Field.d(4, "tss_match_v2_observer_v1_ObserverInfo", "optional")
    public observerInfo?: ObserverInfo|null
}
export interface IPostHeadFrameReq {
    head?: IHeadFrame
}
@protobuf.Type.d("tss_match_v2_observer_v1_PostHeadFrameReq")
export class PostHeadFrameReq extends protobuf.Message<IPostHeadFrameReq> {
    constructor(properties: Properties<IPostHeadFrameReq>) {
        super(properties);
        if (properties) {
            if (properties.head) { this.head = HeadFrame.create(properties.head) as any }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_observer_v1_HeadFrame", "optional")
    public head?: HeadFrame|null
}
export interface IPostHeadFrameResp {
    observerSrvId?: number|null
}
@protobuf.Type.d("tss_match_v2_observer_v1_PostHeadFrameResp")
export class PostHeadFrameResp extends protobuf.Message<IPostHeadFrameResp> {
    constructor(properties: Properties<IPostHeadFrameResp>) {
        super(properties);
        if (properties) {
            if (properties.observerSrvId) { this.observerSrvId = properties.observerSrvId }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public observerSrvId?: number|null = 0
}
export interface ISnapshotFrame {
    ID?: number|null
    data?: Uint8Array
    behaviorID?: number|null
    resourceID?: string|null
}
@protobuf.Type.d("tss_match_v2_observer_v1_SnapshotFrame")
export class SnapshotFrame extends protobuf.Message<ISnapshotFrame> {
    constructor(properties: Properties<ISnapshotFrame>) {
        super(properties);
        if (properties) {
            if (properties.ID) { this.ID = properties.ID }
            if (properties.data) { this.data = properties.data }
            if (properties.behaviorID) { this.behaviorID = properties.behaviorID }
            if (properties.resourceID) { this.resourceID = properties.resourceID }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public ID?: number|null = 0
    @protobuf.Field.d(2, "bytes", "optional", [])
    public data?: Uint8Array
    @protobuf.Field.d(3, "int32", "optional", 0)
    public behaviorID?: number|null = 0
    @protobuf.Field.d(4, "string", "optional", )
    public resourceID?: string|null = ""
}
export interface IBehaviorFrame {
    ID?: number|null
    data?: Uint8Array
    timestamp?: number|null
    snapshotID?: number|null
    resourceID?: string|null
    methodName?: string|null
}
@protobuf.Type.d("tss_match_v2_observer_v1_BehaviorFrame")
export class BehaviorFrame extends protobuf.Message<IBehaviorFrame> {
    constructor(properties: Properties<IBehaviorFrame>) {
        super(properties);
        if (properties) {
            if (properties.ID) { this.ID = properties.ID }
            if (properties.data) { this.data = properties.data }
            if (properties.timestamp) { this.timestamp = properties.timestamp }
            if (properties.snapshotID) { this.snapshotID = properties.snapshotID }
            if (properties.resourceID) { this.resourceID = properties.resourceID }
            if (properties.methodName) { this.methodName = properties.methodName }
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
    @protobuf.Field.d(5, "string", "optional", )
    public resourceID?: string|null = ""
    @protobuf.Field.d(6, "string", "optional", )
    public methodName?: string|null = ""
}
export interface IMsgSnapshotFrame {
    snapshot?: ISnapshotFrame
}
@protobuf.Type.d("tss_match_v2_observer_v1_MsgSnapshotFrame")
export class MsgSnapshotFrame extends protobuf.Message<IMsgSnapshotFrame> {
    constructor(properties: Properties<IMsgSnapshotFrame>) {
        super(properties);
        if (properties) {
            if (properties.snapshot) { this.snapshot = SnapshotFrame.create(properties.snapshot) as any }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_observer_v1_SnapshotFrame", "optional")
    public snapshot?: SnapshotFrame|null
}
export interface IMsgBehaviorFrame {
    behavior?: IBehaviorFrame
}
@protobuf.Type.d("tss_match_v2_observer_v1_MsgBehaviorFrame")
export class MsgBehaviorFrame extends protobuf.Message<IMsgBehaviorFrame> {
    constructor(properties: Properties<IMsgBehaviorFrame>) {
        super(properties);
        if (properties) {
            if (properties.behavior) { this.behavior = BehaviorFrame.create(properties.behavior) as any }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_observer_v1_BehaviorFrame", "optional")
    public behavior?: BehaviorFrame|null
}
export interface IPostSnapshotFrameReq {
    snapshot?: ISnapshotFrame
}
@protobuf.Type.d("tss_match_v2_observer_v1_PostSnapshotFrameReq")
export class PostSnapshotFrameReq extends protobuf.Message<IPostSnapshotFrameReq> {
    constructor(properties: Properties<IPostSnapshotFrameReq>) {
        super(properties);
        if (properties) {
            if (properties.snapshot) { this.snapshot = SnapshotFrame.create(properties.snapshot) as any }
        }
	}
    @protobuf.Field.d(2, "tss_match_v2_observer_v1_SnapshotFrame", "optional")
    public snapshot?: SnapshotFrame|null
}
export interface IPostBehaviorFrameReq {
    behavior?: IBehaviorFrame
}
@protobuf.Type.d("tss_match_v2_observer_v1_PostBehaviorFrameReq")
export class PostBehaviorFrameReq extends protobuf.Message<IPostBehaviorFrameReq> {
    constructor(properties: Properties<IPostBehaviorFrameReq>) {
        super(properties);
        if (properties) {
            if (properties.behavior) { this.behavior = BehaviorFrame.create(properties.behavior) as any }
        }
	}
    @protobuf.Field.d(2, "tss_match_v2_observer_v1_BehaviorFrame", "optional")
    public behavior?: BehaviorFrame|null
}
export interface ISubscribeReq {
    resourceID?: string|null
}
@protobuf.Type.d("tss_match_v2_observer_v1_SubscribeReq")
export class SubscribeReq extends protobuf.Message<ISubscribeReq> {
    constructor(properties: Properties<ISubscribeReq>) {
        super(properties);
        if (properties) {
            if (properties.resourceID) { this.resourceID = properties.resourceID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public resourceID?: string|null = ""
}
export interface IUnsubscribeReq {
    resourceID?: string|null
}
@protobuf.Type.d("tss_match_v2_observer_v1_UnsubscribeReq")
export class UnsubscribeReq extends protobuf.Message<IUnsubscribeReq> {
    constructor(properties: Properties<IUnsubscribeReq>) {
        super(properties);
        if (properties) {
            if (properties.resourceID) { this.resourceID = properties.resourceID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public resourceID?: string|null = ""
}
export interface ISubscribeResp {
    snapshot?: ISnapshotFrame
    behaviors?: IBehaviorFrame[]
}
@protobuf.Type.d("tss_match_v2_observer_v1_SubscribeResp")
export class SubscribeResp extends protobuf.Message<ISubscribeResp> {
    constructor(properties: Properties<ISubscribeResp>) {
        super(properties);
        if (properties) {
            if (properties.snapshot) { this.snapshot = SnapshotFrame.create(properties.snapshot) as any }
            if (properties.behaviors) { this.behaviors = []; properties.behaviors.forEach((value, index)=>{this.behaviors[index] = BehaviorFrame.create(properties.behaviors[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_observer_v1_SnapshotFrame", "optional")
    public snapshot?: SnapshotFrame|null
    @protobuf.Field.d(2, "tss_match_v2_observer_v1_BehaviorFrame", "repeated")
    public behaviors?: BehaviorFrame[] = []
}
export interface IUnsubscribeResp {
}
@protobuf.Type.d("tss_match_v2_observer_v1_UnsubscribeResp")
export class UnsubscribeResp extends protobuf.Message<IUnsubscribeResp> {
    constructor(properties: Properties<IUnsubscribeResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IPostEndFrameReq {
    resourceID?: string|null
}
@protobuf.Type.d("tss_match_v2_observer_v1_PostEndFrameReq")
export class PostEndFrameReq extends protobuf.Message<IPostEndFrameReq> {
    constructor(properties: Properties<IPostEndFrameReq>) {
        super(properties);
        if (properties) {
            if (properties.resourceID) { this.resourceID = properties.resourceID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public resourceID?: string|null = ""
}
class $ObserverService extends RpcService {
    async PostHeadFrame(req: IPostHeadFrameReq, params?: RpcParams) : Promise<{err:number, resp:IPostHeadFrameResp}> {
        let data = PostHeadFrameReq.create(req)
        this.onBeforeReq("PostHeadFrame", data, params)
        const buffer = PostHeadFrameReq.encode(data).finish()
        let [err, pack] = await this.call("PostHeadFrame", buffer, params)
        if (err) {
            this.onBeforeResp("PostHeadFrame", err)
            return {err: err, resp: null}
        } else {
            let resp = PostHeadFrameResp.decode(pack) as any
            this.onBeforeResp("PostHeadFrame", err, resp)
            return {err: null, resp: resp}
        }
    }
    async PostSnapshotFrame(req: IPostSnapshotFrameReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = PostSnapshotFrameReq.create(req)
        this.onBeforeReq("PostSnapshotFrame", data, params)
        const buffer = PostSnapshotFrameReq.encode(data).finish()
        let [err, pack] = await this.call("PostSnapshotFrame", buffer, params)
        if (err) {
            this.onBeforeResp("PostSnapshotFrame", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("PostSnapshotFrame", err, resp)
            return {err: null, resp: resp}
        }
    }
    async PostBehaviorFrame(req: IPostBehaviorFrameReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = PostBehaviorFrameReq.create(req)
        this.onBeforeReq("PostBehaviorFrame", data, params)
        const buffer = PostBehaviorFrameReq.encode(data).finish()
        let [err, pack] = await this.call("PostBehaviorFrame", buffer, params)
        if (err) {
            this.onBeforeResp("PostBehaviorFrame", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("PostBehaviorFrame", err, resp)
            return {err: null, resp: resp}
        }
    }
    async PostEndFrame(req: IPostEndFrameReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = PostEndFrameReq.create(req)
        this.onBeforeReq("PostEndFrame", data, params)
        const buffer = PostEndFrameReq.encode(data).finish()
        let [err, pack] = await this.call("PostEndFrame", buffer, params)
        if (err) {
            this.onBeforeResp("PostEndFrame", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("PostEndFrame", err, resp)
            return {err: null, resp: resp}
        }
    }
    async Subscribe(req: ISubscribeReq, params?: RpcParams) : Promise<{err:number, resp:ISubscribeResp}> {
        let data = SubscribeReq.create(req)
        this.onBeforeReq("Subscribe", data, params)
        const buffer = SubscribeReq.encode(data).finish()
        let [err, pack] = await this.call("Subscribe", buffer, params)
        if (err) {
            this.onBeforeResp("Subscribe", err)
            return {err: err, resp: null}
        } else {
            let resp = SubscribeResp.decode(pack) as any
            this.onBeforeResp("Subscribe", err, resp)
            return {err: null, resp: resp}
        }
    }
    async Unsubscribe(req: IUnsubscribeReq, params?: RpcParams) : Promise<{err:number, resp:IUnsubscribeResp}> {
        let data = UnsubscribeReq.create(req)
        this.onBeforeReq("Unsubscribe", data, params)
        const buffer = UnsubscribeReq.encode(data).finish()
        let [err, pack] = await this.call("Unsubscribe", buffer, params)
        if (err) {
            this.onBeforeResp("Unsubscribe", err)
            return {err: err, resp: null}
        } else {
            let resp = UnsubscribeResp.decode(pack) as any
            this.onBeforeResp("Unsubscribe", err, resp)
            return {err: null, resp: resp}
        }
    }
    NotifyBehaviorFrame(data: Uint8Array, params: RpcParams) : {msg: IMsgBehaviorFrame, eventID?: number} {
        let msg = MsgBehaviorFrame.decode(data)
        return {msg: msg}
    }
}
export const ObserverService = new $ObserverService({
    name: "tss.match.v2.observer.v1",
})
import { EmptyClass, EventTargetExtends } from "bos/utils/ClassUtils";
import { Log } from "bos/exports";
import { IByPack, MSGType } from "./Net";
import { NetMgr } from "./NetMgr";

type ServiceCallback = (data: any) => void;

type RpcOption = {
    eventID: number
    extend: string
    func: string
}

export function RpcDecorator(data: any): (target: RpcService, func: string, descriptor: PropertyDescriptor) => PropertyDescriptor {
    return (target: RpcService, func: string, descriptor: PropertyDescriptor) => {
        if (target["decorators"] == null) {
            target["decorators"] = new Array<RpcOption>()
        }
        target["decorators"].push({
            extend: data.extend,
            eventID: data.eventID,
            func: func,
        });
        return descriptor;
    };
}

class CallInfo {
    callback?: Function;
    startAt: number = 0;
    timeout: any;

    constructor(props: any) {
        this.startAt = props.startAt ? props.startAt : 0;
        this.callback = props.callback ? props.callback : null;
    }

    setTimeout(timeout: number) {
        this.timeout = setTimeout(() => {
            this.tryCallback(-1)
        }, timeout)
        return this
    }

    tryCallback(err: any, resp?: any) {
        if (this.callback) {
            this.callback([err, resp])
            this.callback = null
        }
        if (this.timeout) {
            clearTimeout(this.timeout)
            this.timeout = null
        }
    }
}

export class RpcParams {
    ext?: string
    destID?: number
    req?: number
    mtype?: number
}

class RpcService extends EventTargetExtends(EmptyClass) {
    protected name = ""
    protected sen = ""
    private _req = 0
    private _callInfo = new Map<number, CallInfo>();
    private _destInfo = new Map<string, number>();
    private _routeApi = new Map<string, string>();
    private _routeKey : string;

    static EventType = {
        NOTIFICATION: "NOTIFICATION"
    }

    static ErrCode = {
        0: "OK",
        1: "No content",
        2: "Bad request",
        3: "Unauthorized",
        4: "Method not allowed",
        5: "Request timeout",
        6: "Internal server error",
        7: "Service not found",
        8: "Method not found",
        9: "Network exception",
        10: "Service unavailable",
        11: "Queue not found",
        12: "Internal",
        13: "Async return",
        14: "Unknown",
        15: "not enough resource",
        [-1]: "Request timeout",
    };

    constructor(data) { 
        super() 
        this.name = data.name
        NetMgr.getInstance().registerService(this)
    }

    get service() { 
        if (this.sen) {
            return `${this.name}.${this.sen}`
        }
        return this.name
    }

    setSen(sen?: string) {
        console.log("setSen...", this.service, sen)
        NetMgr.getInstance().unregisterService(this)
        this.sen = sen
        NetMgr.getInstance().registerService(this)
    }

    reset() {
        this._callInfo.clear()
    }

    async call(method: string, buffer: Uint8Array, params?: RpcParams) : Promise<[number|null, Uint8Array|null]> {
        return new Promise((resolve) => {
            this.send(method, buffer, params, (data)=>{
                resolve(data)
            })
        })
    }

    private setDestByExt(ext: string, destID: number) {
        this._destInfo[ext] = destID
    }

    private getDestByExt(ext: string) {
        return this._destInfo[ext] ? this._destInfo[ext] : 0
    }

    private send(method: string, buffer: Uint8Array, params?: RpcParams, cb?: ServiceCallback) {
        let req = this._req++
        let ext = params?.ext
        NetMgr.getInstance().sendMessage(this.service, method, buffer, {
            ext: ext,
            req: req,
            destID: this.getDestByExt(ext),
        })
        this._callInfo.set(req, new CallInfo({
            startAt: Date.now(),
            callback: cb,
        }).setTimeout(11*1000))
    }

    onMessage(pack: IByPack) {
        switch (pack.Header.MType) {
            case MSGType.CallRequest:
                let req = pack.Header.Req
                let callInfo = this._callInfo.get(req)
                callInfo?.tryCallback(pack.Err, pack.Body || new Uint8Array())
                break
            case MSGType.PushRequest:
                let ext = pack.Ext ? String.fromCharCode(...pack.Ext) : ""
                ext ?? this.setDestByExt(ext, pack.Header.DestID)
                let method = pack.Header.Method
                let f = this[method]
                if (!f) {
                    Log.e("service method not found", pack.Header.Server, pack.Header.Method)
                    return
                }
                let key = this._routeApi.get(method) || this._routeKey
                if (key && ext && key !== ext) {
                    Log.e("service route not match", pack.Header.Server, pack.Header.Method, ext, key)
                    return
                }
                let params = {
                    ext: ext
                }
                Log.d("onMessage...", this.service, method, ext)
                let result = f?.call(this, pack.Body ?? new Uint8Array(), params)
                this.emit(RpcService.EventType.NOTIFICATION, method, result.msg, params)
                this.emit(method, result.msg, params)
                break
            case MSGType.Stream:
                //暂不支持流调用
                break
        }
    }

    getEventOptions(eventID) {
        return this["decorators"]?.find((e: RpcOption)=>{
            return e.eventID == eventID
        })
    }

    setRouteKey(key: string, apiList?: string[]) {
        if (apiList) {
            apiList.forEach(api => {
                this._routeApi.set(api, key)
            })
        } else {
            this._routeKey = key
        }
    }

    onBeforeReq(method: string, req: any, params: any) {
        NetMgr.getInstance().onBeforeReq(this, method, req, params)
    }

    onBeforeResp(method: string, err: number, resp?: any) {
        NetMgr.getInstance().onBeforeResp(this, method, err, resp)
    }
}

// interface Service extends EventTarget {}

// applyMixins(Service, [EventTarget])

export { RpcService }
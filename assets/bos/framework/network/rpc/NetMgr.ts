import { log, path, sys, warn } from "cc";
import { BaseSocket } from "bos/base/socket/BaseSocket";
import { EmptyClass, EventTargetExtends } from "bos/utils/ClassUtils";
import { Log, ObjectUtil, StringUtil, gzip } from "bos/exports";
import { TaskQueue } from "bos/exports";
import { IByPack } from "./Net";

interface Link {
    url: string
    recv(handler: (msg: IByPack)=>void): void
    send(service: string, method: string, buffer: any, params: any): void
}

export interface LinkDelegate {
    onClosed(link: Link): void
    onConnected(link: Link): void
    onRegistered(link: Link): void
}

export interface NetDelegate {
    connect(delegate: LinkDelegate): void
    getLink(): Link|undefined
    close(): void
    unpackMsg(pack: IByPack): Promise<IByPack>
    onBeforeResp(service: IRpcService, method: string, err: number, resp?: any): void;
    onBeforeReq(service: IRpcService, method: string, req: any, params: any): void;
}

interface IRpcService {
    service: string
    onMessage(pack: IByPack): void
    reset(): void
}

type NetParams = {
    delegate: NetDelegate,
}

export class NetMgr extends EventTargetExtends(EmptyClass) {
    private _msgQueue: TaskQueue = new TaskQueue()
    private _delegate: NetDelegate
    private _svcInfo = new Map<string, IRpcService[]>()

    public constructor() { super() }

    private static instance: NetMgr | null = null;

    public static EventType = {
        conn_closed: "conn_closed",
        conn_connected: "conn_connected",
        conn_registered: "conn_registered",
    }

    public static getInstance(): NetMgr {
        if (NetMgr.instance == null) {
            NetMgr.instance = new NetMgr();
        }
        return NetMgr.instance;
    }

    async dispatchMsg(msg: IByPack) {
        msg = await this._delegate.unpackMsg(msg)
        this._svcInfo.get(msg.Header.Server)?.forEach((service)=>{
            service.onMessage(msg)
        })
    }

    init(params: NetParams) {
        this._delegate = params.delegate
        Log.d("NetMgr.init", params);
    }

    connect() {
        Log.d("NetMgr.connect");
        this._delegate.connect({
            onClosed: (link)=>{
                Log.i("NetMgr.onClosed", link.url)
                this.emit(NetMgr.EventType.conn_closed, link)
            },
            onConnected: (link)=>{
                Log.i("NetMgr.onConnected", link.url)
                this.emit(NetMgr.EventType.conn_connected, link)
            },
            onRegistered: (link)=>{
                this.startDispatchMsg()
                this.emit(NetMgr.EventType.conn_registered, link)
                link.recv((pack: IByPack)=>{
                    this._msgQueue.push({
                        target: this,
                        executor: this.dispatchMsg,
                        args: pack,
                    })
                })
            },
        })
    }

    sendMessage(service: string, method: string, buffer: any, params: any) {
        this._delegate.getLink()?.send(service, method, buffer, params)
    }

    stopDispatchMsg() {
        this._msgQueue.stop()
    }

    startDispatchMsg() {
        this._msgQueue.start()
    }

    close() {
        Log.w("NetMgr.close")
        this._delegate.close()
    }

    reset() {
        this._msgQueue.reset()
        
        this._svcInfo.forEach((value, key) => {
            value.forEach((e)=>{
                e.reset()
            })
        })
    }

    registerService(svc: IRpcService) {
        let arr = this._svcInfo.get(svc.service)
        if (arr) {
            const index = arr.indexOf(svc)
            if (index >= 0) {
                return
            }
            arr.push(svc)
        } else {
            arr = [svc]
            this._svcInfo.set(svc.service, arr)
        }
    }

    unregisterService(svc: IRpcService) {
        let arr = this._svcInfo.get(svc.service)
        if (arr) {
            this._svcInfo.set(svc.service, arr.filter((e)=>{return e !== svc}))
        }
    }


    onBeforeReq(service: IRpcService, method: string, req: any, params: any) {
        this._delegate.onBeforeReq(service, method, req, params)
    }

    onBeforeResp(service: IRpcService, method: string, err: number, resp?: any) {
        this._delegate.onBeforeResp(service, method, err, resp)
    }
}

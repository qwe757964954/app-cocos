import { BaseSocket } from "bos/base/socket/BaseSocket";
import { NetConfig, NetState } from "./Config";
import { EmptyClass, EventTargetExtends, Log, StringUtil, gzip } from "bos/exports";
import { ByHead, ByPack, ByRegister, ByRegisterResp, Ping } from "idl/bgo/base/ap";
import BufferUtil from "bos/utils/BufferUtil";
import { RpcParams } from "../../../bos/framework/network/rpc/RpcService";
import { Ap as ApService } from "idl/bgo/base/ap";
import netLogger from "./Logger";

type ApDelegate = {
    onApDelay?: (ap: Ap) => void
    onApConnected?: (ap: Ap) => void
    onApRegistered?: (ap: Ap) => void
    onApClosed?: (ap: Ap) => void
    onApError?: (ap: Ap, err: any) => void
}

const ApError = {
    recv_first_pack_error: "recv_first_pack_error",
    register_error: "register_error",
    heartbeat_error: "heartbeat_error"
}

export class Ap {
    private _cfg: NetConfig
    private _socket: BaseSocket
    private _delegate: ApDelegate
    private _heartbeat: any
    private _recvAt: number;
    private _receiver: (pack: ByPack) => void
    private _pingNum: number
    private _pingInterval: any
    private _pingDelays: number[] = []

    public url: string
    public state: NetState = NetState.Default
    public delay: number

    init(data: { delegate: ApDelegate, url: string, cfg: NetConfig }) {
        this._delegate = data.delegate
        this._cfg = data.cfg
        this.url = data.url
    }

    connect() {
        if (!this.url) {
            netLogger.i("Ap.connect...error[url not config]")
            return
        }
        if (this.state != NetState.Default) {
            return
        }
        this.state = NetState.Connecting
        this._socket = new BaseSocket();
        this._socket.connect({
            url: this.url,
            delegate: this,
        });
    }

    onSocketOpen(sock: BaseSocket, event: any) {
        netLogger.d("Ap.onSocketOpen", this.url, this.state)
    }

    onSocketError(sock: BaseSocket, event: any) {
        netLogger.d("Ap.onSocketError...", this.url, this.state, event);
        if (this.state == NetState.Default) {
            return
        }
        this.reset()
        this._delegate?.onApError.call(this._delegate, this, event)
    }

    onSocketClose(sock: BaseSocket, event: any) {
        netLogger.d("Ap.onSocketClose...", this.url, this.state, event);
        if (this.state == NetState.Default) {
            return
        }
        this.reset()
        this._delegate?.onApClosed.call(this._delegate, this)
    }

    async onSocketMessage(sock: BaseSocket, data: ArrayBuffer) {
        // netLogger.d("onSocketMessage...", this.state, data);
        if (sock != this._socket) {
            return
        }
        switch (this.state) {
            case NetState.Connecting: {
                let view = new Uint16Array(data);
                if (view.length <= 0) {
                    netLogger.e("Ap.onSocketMessage...接收初包错误", view);
                    this.close(ApError.recv_first_pack_error)
                    return;
                }
                let cmd = view[0];
                if (cmd == 200 || cmd == 110) {
                    netLogger.i("Ap.onSocketMessage...接收初包成功");
                    this.state = NetState.Connected;
                    this._delegate?.onApConnected.call(this._delegate, this)
                    this.register()
                } else {
                    netLogger.e("Ap.onSocketMessage...接收初包错误", cmd);
                    this.close(ApError.recv_first_pack_error)
                }
                break;
            }
            case NetState.Connected: {
                let buffer = data as ArrayBuffer;
                let view = new Uint8Array(buffer);
                let pack = ByRegisterResp.decode(view);
                netLogger.d("Ap.onSocketMessage...注册成功", pack);
                this.state = NetState.Registered;
                clearInterval(this._heartbeat)
                this._heartbeat = setInterval(() => {
                    this.checkAlive()
                }, this._cfg.heartbeatInterval)
                this._delegate?.onApRegistered.call(this._delegate, this)
                break;
            }
            case NetState.Registered: {
                this._recvAt = Date.now()
                let buffer = new Uint8Array(data)
                let pack: ByPack = ByPack.decode(buffer)
                if (!pack.Header && !pack.Err) {
                    // netLogger.d("心跳响应");
                    this._socket.send({ data: buffer });
                    return;
                }
                if (pack.Header.Method !== ApService.ApPing.name) {
                    netLogger.d("onMessage->", pack.Header.Server, pack.Header.Method, pack.Header.Req)
                }
                // 压缩包
                // if (pack.BitState && pack.BitState.length > 0 && pack.BitState[0] == 1) {
                //     let decoded = await gzip.uncompress(pack.Body)
                //     pack.Body = new Uint8Array(decoded)
                // }
                this._receiver?.call(null, pack)
                break;
            }
        }
    }

    private checkAlive() {
        if (this.state == NetState.Registered && Date.now() - this._recvAt > this._cfg.heartbeatTimeout) {
            this.close(ApError.heartbeat_error)
        }
    }

    close(err?: any) {
        netLogger.w("Ap.close", this.url, this.state)
        this._socket?.close()
        this.reset()
        err && this._delegate.onApError(this, err)
    }

    reset() {
        this.state = NetState.Default
        this._receiver = null
        this.stopPing()
    }

    async register() {
        if (this.state != NetState.Connected) {
            return
        }
        netLogger.d("Ap.register", this.url);
        let req = {
            Appid: this._cfg.appid,
            Token: this._cfg.token,
            SpaceName: this._cfg.spaceName,
            MustMetadata: this._cfg.mustMetadata,
        };
        let buffer = ByRegister.encode(req).finish();
        this._socket.send({
            data: buffer,
        });
    }

    stopPing() {
        this._pingInterval && clearInterval(this._pingInterval)
        this._pingInterval = undefined
        this._pingNum = 0
    }

    startPing(num?: number) {
        this.stopPing()
        this._pingInterval = setInterval(async () => {
            let result = await ApService.ApPing({
                SendTime: Date.now()
            })
            let delay = undefined
            if(result.err) {
                delay = Number.MAX_VALUE
            } else {
                delay = Date.now() - result.resp.SendTime
            }
            this._pingDelays.push(delay)
            if (this._pingDelays.length > 3) {
                this._pingDelays.shift()
            }
            this._pingNum++
            if (num >= 0 && this._pingNum >= num) {
                netLogger.i("Ap.startPing...finish", this.url, delay, this._pingDelays)
                this.stopPing()
            } else {
                // netLogger.i("Ap.startPing...delay", this.url, delay, this._pingDelays)
            }
        }, this._cfg.ap.pingInterval);
    }

    send(service: string, method: string, buffer: any, params?: RpcParams) {
        if (this.state != NetState.Registered) {
            netLogger.e("Ap.send...error", this.url, this.state)
            return
        }
        let header = new ByHead({
            Server: service,
            Method: method,
            DestID: params?.destID || 0,
            Req: params?.req,
            MType: params?.mtype || 0,
        });
        let pack = new ByPack({
            Header: header,
            Metadata: {
                ApplicationId: AppConfig.channel,
                ApplicationVer: AppConfig.version,
            },
            Body: buffer,
            Ext: StringUtil.stringToUint8Array(params?.ext || ""),
        });
        if(pack.Header.Method !== ApService.ApPing.name) {
            netLogger.d("sendMessage->", pack.Header.Server, pack.Header.Method, pack.Header.Req)
        }
        let data = ByPack.encode(pack).finish();
        let bytes = BufferUtil.sliceBuffer(data)
        this._socket.send({ data: bytes });
    }

    isConnected(): boolean {
        return this.state == NetState.Connected || this.state == NetState.Registered
    }

    isRegistered(): boolean {
        return this.state == NetState.Registered
    }

    recv(f: (pack: ByPack) => void) {
        this._receiver = f
    }
}

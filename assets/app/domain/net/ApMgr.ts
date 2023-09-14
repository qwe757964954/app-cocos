import { EmptyClass, EventTargetExtends, Log, ObjectUtil, gzip } from "bos/exports"
import { Ap } from "./Ap"
import { NetConfig } from "./Config"
import { ByPack } from "idl/bgo/base/ap"
import { LinkDelegate, NetDelegate } from "bos/framework/network/rpc/NetMgr"
import { RpcService } from "bos/framework/network/rpc/RpcService"
import netLogger from "./Logger"

export class ApMgr extends EventTargetExtends(EmptyClass) implements NetDelegate {
    private _link: Ap
    private _apList: Ap[] = []
    private _cfg = new NetConfig()
    private _reconnectTimer: any
    private _linkDelegate: LinkDelegate

    init(cfg: NetConfig) {
        ObjectUtil.deepMerge(this._cfg, cfg)
        this._cfg.ap.list.forEach((url) => {
            const ap = new Ap()
            ap.init({
                delegate: this, cfg: this._cfg, url: url
            })
            this._apList.push(ap)
        })
        this._link = this._apList[0]
        this.connect()
        this.loadRemote()
    }

    getLink() { return this._link }

    private async loadRemote() {
        netLogger.i("ApMgr.loadRemote")
        let resp = new Promise((resolve) => {
            let xhr = new XMLHttpRequest()
            let url = `${this._cfg.ap.url}${this._cfg.appid}/ver/${this._cfg.ap.ver}`
            xhr.open("GET", url, true)
            xhr.onload = () => {
                netLogger.i("ApMgr.loadRemote...resp", xhr, url)
                resolve(xhr.response)
            }
            xhr.onerror = (err) => {
                netLogger.i("ApMgr.loadRemote...err", err, url)
                resolve(undefined)
            }
            xhr.send()
        })
    }

    private reconnect() {
        this._reconnectTimer && clearTimeout(this._reconnectTimer)
        this._reconnectTimer = setTimeout(() => {
            this.connect()
        }, 1 * 1000);
    }

    connect(delegate?: LinkDelegate) {
        delegate && (this._linkDelegate = delegate)
        if (this._link) {
            this._link.connect()
        } else {
            this._apList.forEach((e) => e.connect())
        }
    }

    close() {
        this._link?.close()
        this._reconnectTimer && clearTimeout(this._reconnectTimer)
    }

    /* ApEvent */
    onApDelay(ap: Ap) {
        netLogger.i("ApMgr.onApDelay", ap.url)
        if (this._link == ap) {

        } else {

        }
    }

    onApConnected(ap: Ap) {
        netLogger.i("ApMgr.onApConnected", ap.url)
        this._link === ap && this._linkDelegate?.onConnected.call(this._linkDelegate, ap)
    }

    onApRegistered(ap: Ap) {
        netLogger.i("ApMgr.onApRegistered", ap.url)
        if (this._link == ap || !this._link) {
            this._link = ap
            this._linkDelegate?.onRegistered.call(this._linkDelegate, ap)
            this._apList.forEach((e) => {
                e !== ap && e.close()
            })
            ap.startPing(-1)
        }
    }

    onApClosed(ap: Ap) {
        netLogger.i("ApMgr.onApClosed", ap.url)
        if (ap === this._link) {
            this._linkDelegate?.onClosed.call(this._linkDelegate, ap)
            this.reconnect()
        } else if(!this._link) {
            this.reconnect()
        }
    }

    onApError(ap: Ap, err: any) {
        netLogger.e("ApMgr.onApError", ap.url, err)
        if (ap === this._link) {
            this._linkDelegate?.onClosed.call(this._linkDelegate, ap)
            this._link = undefined
            this.reconnect()
        } else if(!this._link) {
            this.reconnect()
        }
    }

    async unpackMsg(pack: ByPack) {
        // 压缩包
        if (pack.BitState && pack.BitState.length > 0 && pack.BitState[0] == 1) {
            let decoded = await gzip.uncompress(pack.Body)
            pack.Body = new Uint8Array(decoded)
        }
        return pack
    }

    onBeforeReq(service: RpcService, method: string, req: any, params: any) {
        if (method === "ApPing") {
            return
        }
        netLogger.d("ApMgr.onBeforeReq...", service.service, method, req, params)
    }

    onBeforeResp(service: RpcService, method: string, err: number, resp?: any) {
        if (method === "ApPing") {
            return
        }
        netLogger.d("ApMgr.onBeforeResp...", service.service, method, err, resp)
    }
}
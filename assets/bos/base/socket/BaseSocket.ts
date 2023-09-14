import { log, native, sys } from "cc";
import { NATIVE } from "cc/env";
import { CACERT } from "./cacert";

export class BaseSocket {
    private socket?: any;
    private delegate: any;

    onopen(event: any) {
        log("onopen...", event);
        this.delegate.onSocketOpen.call(this.delegate, this, event);
    }

    onclose(event: any) {
        log("onclose...", event);
        this.delegate.onSocketClose.call(this.delegate, this, event);
    }

    onerror(event: any) {
        log("onerror...", event, this.delegate);
        this.delegate.onSocketError.call(this.delegate, this, event);
    }

    onmessage(data: string | ArrayBuffer) {
        this.delegate.onSocketMessage.call(this.delegate, this, data);
    }

    send(data: any) {
        // log("send...", data)
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            let bytes = data.data
            // log("send wx...", bytes)
            this.socket?.send({
                data: bytes,
                success: (res: any) => {
                    log("wx.send.success...", res);
                },
                fail: (res: any) => {
                    log("wx.send.fail...", res);
                },
                complete: (res: any) => {
                    log("wx.send.complete...", res);
                },
            });
        } else {
            // log("send ws...", bytes)
            this.socket?.send(data.data);
        }
    }

    connect(data: any) {
        this.delegate = data.delegate;
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            let wss = wx.connectSocket({
                url: data.url,
                success: function () {
                    log("connect socket success.");
                },
                fail: function () {
                    log("connect socket fail.");
                },
            });
            wss.onOpen((res) => {
                log("wx.onOpen...", res);
                this.onopen(res);
            });
            wss.onClose((res) => {
                log("wx.onClose...", res);
                this.onclose(res);
            });
            wss.onError((res) => {
                log("wx.onError...", res);
                this.onerror(res);
            });
            wss.onMessage((res) => {
                log("wx.onMessage...", res);
                this.onmessage(res.data);
            });
            this.socket = wss;
        } else {
            let ws: WebSocket
            console.log("NATIVE", NATIVE)
            if (NATIVE) {
                let WS: any = WebSocket
                let newFile = native.fileUtils.getWritablePath() + "cacert.pem"
                console.log("cacert", newFile)
                if (!native.fileUtils.isFileExist(newFile)) {
                    let flag = native.fileUtils.writeStringToFile(CACERT, newFile)
                    if (!flag) {
                        console.error("复制cacert.pem文件失败")
                    }
                }
                ws = new WS(data.url, null, newFile)
            } else {
                ws = new WebSocket(data.url);
            }
            ws.onopen = (event) => {
                log("ws.onopen...", event);
                this.onopen(event);
            };
            ws.onmessage = (event) => {
                // log("ws.onmessage...", event);
                // let buffer = await event.data.arrayBuffer();
                let buffer = event.data
                this.onmessage(buffer);
            };
            ws.onerror = (event) => {
                log("ws.onerror...", event);
                this.onerror(event);
            };
            ws.onclose = (event) => {
                log("ws.onclose...", event);
                this.onclose(event);
            };
            ws.binaryType = "arraybuffer"
            this.socket = ws;
        }
    }

    close() {
        this.socket?.close()
    }
}

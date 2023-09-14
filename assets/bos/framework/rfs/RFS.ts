import { StringUtil } from "bos/exports";
import { Canvas, Color, Game, Graphics, Label, Node, UITransform, director, game, js, native } from "cc";
import { NATIVE } from "cc/env";
import { NativeUI } from "platform/NativeUI";

let RFS_UPDATE_ROOT = ""

let am: native.AssetsManager = null
let serverAddress: ServerAddress
let remoteUrl: string

let progressNode: Node

async function httpGet(url: string): Promise<string> {
    try {
        let resp = await fetch(url)
        if (resp.status == 200) {
            let text = await resp.text()
            return text
        }
    } catch (e) {
        return null
    }
}

function updateProgress(text: string) {
    if (!text) {
        if (progressNode) {
            progressNode.destroy()
            progressNode = null
        }
        return
    }
    if (progressNode == null || !progressNode.isValid) {
        progressNode = new Node()
        progressNode.addComponent(UITransform).setContentSize(800, 300)
        progressNode.name = "rfs_progress_root"
        director.getScene().getComponentInChildren(Canvas).node.addChild(progressNode)

        {
            let g = progressNode.addComponent(Graphics)
            g.fillColor = Color.GRAY
            g.fillRect(-400, -150, 800, 300)
        }

        {
            let node = new Node()
            node.parent = progressNode
            let label = node.addComponent(Label)
            label.fontSize = 80
            label.color = Color.RED
            label.lineHeight = 90
            label.overflow = Label.Overflow.NONE
        }
    }

    progressNode.getComponentInChildren(Label).string = text
}

/**
* 比如2个版本号大小
* @param v1 格式如 : 1.2.3.4
* @param v2 
* @returns  1: v1更大。   -1: v1更小。   0: 相等
*/
function versionComparator(v1: string, v2: string): number {
    let va = v1.split(".")
    let vb = v2.split(".")
    let len = Math.max(va.length, vb.length)
    for (let i = 0; i < len; i++) {
        let a = parseInt(va[i] || "0") || 0
        let b = parseInt(vb[i] || "0") || 0
        if (a > b) {
            return 1
        } else if (a < b) {
            return -1
        }
    }

    return 0
}

function genRemoteVersion(version: string) {
    let strs = version.split(".")
    if (strs[0] == "999") {
        let v = parseInt(strs[2]) + 1
        return `999.999.${v}`
    } else {
        return "999.999.1"
    }
}

namespace Update {

    export function checkUpdate() {
        if (am) {
            return
        }
        am = new native.AssetsManager("", RFS_UPDATE_ROOT)
        am.setVersionCompareHandle(versionComparator)
        am.setVerifyCallback((path, asset) => {
            console.log(
                "verify",
                "path", path,
                "asset.path", asset.path,
                "asset.downloadState", asset.downloadState,
                "asset.compressed", asset.compressed,
                "asset.size", asset.size,
                "asset.path", asset.path,
            )
            if (path.endsWith("project.manifest") || path.endsWith("version.manifest")) {
                return true
            }
            if (asset.compressed) {
                return true
            }
            let size = native.fileUtils.getFileSize(path)
            if (size != asset.size) {
                console.log("文件大小不匹配", asset.size, size)
                return false
            }
            // 计算md5
            // let data = native.fileUtils.getDataFromFile(path)
            return true
        })
        am.setEventCallback(onEventCallback)
        console.log("手动加载内置manifest")
        let json = JSON.parse(native.fileUtils.getStringFromFile("project.manifest"))
        json.packageUrl = remoteUrl
        json.remoteManifestUrl = `${remoteUrl}project.manifest`
        let localVersion = json.version
        let localManifest = new native.Manifest(JSON.stringify(json), RFS_UPDATE_ROOT)
        console.log("localManifest", localManifest, json.version, localManifest.getPackageUrl(), localManifest.getManifestFileUrl())
        am.loadLocalManifest(localManifest, RFS_UPDATE_ROOT)

        httpGet(`${remoteUrl}project.manifest?t=${Date.now()}`).then(text => {
            console.log("download remote manifest", text)
            if (text) {
                let json = JSON.parse(text)
                json.packageUrl = remoteUrl
                json.remoteManifestUrl = `${remoteUrl}project.manifest`
                json.version = genRemoteVersion(localVersion)
                let manifest = new native.Manifest(JSON.stringify(json), RFS_UPDATE_ROOT)
                console.log("remote manifest", manifest, json.version, manifest.getPackageUrl(), manifest.getManifestFileUrl())
                am.loadRemoteManifest(manifest)
            } else {
                onUpdateFailed("load remote manifest failed")
            }
        })
    }

    export function clean() {
        native.fileUtils.removeDirectory(RFS_UPDATE_ROOT)
        let key = "BY_COCOS_SEARCH_PATH"
        let value = localStorage.getItem(key)
        if (value) {
            let paths = value.split(";")
            js.array.remove(paths, RFS_UPDATE_ROOT)
            localStorage.setItem(key, paths.join(";"))
        }
        console.log("rfs.clean", localStorage.getItem(key))
        game.restart()
    }

    function onUpdateFailed(e: string) {
        console.log("rfs.onUpdateFailed", e)
        am = null
        updateProgress(null)
        NativeUI.Dialog.show("", "rfs更新失败:" + e, "ok", "", () => {
        })
    }

    function onUpdateFinish() {
        am = null
        let key = "BY_COCOS_SEARCH_PATH"
        let value = localStorage.getItem(key)
        if (value) {
            let paths = value.split(";")
            if (!paths.includes(RFS_UPDATE_ROOT)) {
                js.array.appendObjectsAt(paths, [RFS_UPDATE_ROOT], 0)
                localStorage.setItem(key, paths.join(";"))
            }
        } else {
            localStorage.setItem(key, RFS_UPDATE_ROOT)
        }
        console.log("rfs.onUpdateFinish", localStorage.getItem(key))
        updateProgress(null)
        NativeUI.Dialog.show("", "rfs更新成功", "ok", "", () => {
            game.restart()
        })
    }

    function onUpdateProgress(event: native.EventAssetsManager) {
        updateProgress(`rfs更新进度: ${event.getDownloadedFiles()}/${event.getTotalFiles()}`)
    }

    function onNoUpdate() {
        am = null
        updateProgress(null)
        NativeUI.Dialog.show("", "rfs 没有更新", "ok", "ok", () => { })
    }

    function onEventCallback(event: native.EventAssetsManager) {
        let code = event.getEventCode()
        switch (code) {
            case native.EventAssetsManager.ASSET_UPDATED:
                console.log("asset update", event.getAssetId(), event.getMessage())
                break;
            case native.EventAssetsManager.ERROR_DECOMPRESS:
                console.log("decompress error", event.getAssetId, event.getMessage())
                break;
            case native.EventAssetsManager.ERROR_UPDATING:
                console.log("updating error", event.getAssetId(), event.getMessage())
                break;
            case native.EventAssetsManager.UPDATE_FAILED:
                console.log("update failed", event.getMessage())
                onUpdateFailed(event.getMessage())
                break;
            case native.EventAssetsManager.UPDATE_FINISHED:
                console.log("update finish", event.getMessage())
                onUpdateFinish()
                break;
            case native.EventAssetsManager.UPDATE_PROGRESSION:
                console.log("update progress",
                    "getTotalBytes", event.getTotalBytes(),
                    "getDownloadedBytes", event.getDownloadedBytes(),
                    "getPercent", event.getPercent()
                )
                onUpdateProgress(event)
                break;
            case native.EventAssetsManager.ALREADY_UP_TO_DATE:
                console.log("ALREADY_UP_TO_DATE")
                onNoUpdate()
                break
            case native.EventAssetsManager.ERROR_PARSE_MANIFEST:
            case native.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
            case native.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
                console.log("ERROR_PARSE_MANIFEST/ERROR_NO_LOCAL_MANIFEST/ERROR_DOWNLOAD_MANIFEST")
                onUpdateFailed("load local/remote manifest failed: " + event.getMessage())
                break;
            case native.EventAssetsManager.NEW_VERSION_FOUND:
                console.log("NEW_VERSION_FOUND")
                am.update()
                break;
        }
    }
}

type ServerAddress = {
    ip: string
    port: number
}

let wss: WebSocket
let heartBeatTimer: any

function processMessage(msg: any) {
    if (msg.event == "restart") {
        game.restart()
    } else if (msg.event == "update") {
        Update.checkUpdate()
    } else if (msg.event == "clean") {
        Update.clean()
    }
}

function getServerAddress(): ServerAddress {

    {
        let file = native.fileUtils.getWritablePath() + "caches/current_start_url"
        if (native.fileUtils.isFileExist(file)) {
            let content = native.fileUtils.getStringFromFile(file).trim()
            if (content.startsWith("boyaarfs")) {
                let index = content.indexOf("://")
                content = content.substring(index + 3)
                let strs = content.split("/")
                let json = {
                    ip: strs[0],
                    port: parseInt(strs[1])
                }
                native.fileUtils.writeStringToFile(JSON.stringify(json), native.fileUtils.getWritablePath() + "caches/rfs.json")
            }
        }
    }

    let file = native.fileUtils.getWritablePath() + "caches/rfs.json"
    if (!native.fileUtils.isFileExist(file)) {
        return
    }
    let content = native.fileUtils.getStringFromFile(file)
    let json: any
    try {
        json = JSON.parse(content)
    } catch (e) {
        console.warn("rfs", file, content, e)
        return
    }
    return { ip: json.ip, port: json.port }
}

function checkSocket() {
    if (wss) {
        return
    }
    serverAddress = getServerAddress()
    if (!serverAddress) {
        return
    }
    remoteUrl = `http://${serverAddress.ip}:${serverAddress.port}/`
    wss = new WebSocket(`ws://${serverAddress.ip}:${serverAddress.port}/ws`)
    wss.onopen = () => {
        console.log("rfs.onopen")
        NativeUI.Toast.show("rfs连接成功", NativeUI.Toast.GRAVITY_BOTTOM, 3000)
    }
    wss.onclose = () => {
        console.log("rfs.onclose")
        wss = null
    }
    wss.onerror = (e) => {
        console.log("rfsf.onerror", e)
        wss = null
        NativeUI.Toast.show("rfs断开链接", NativeUI.Toast.GRAVITY_BOTTOM, 3000)
    }
    wss.onmessage = (e) => {
        let content = ""
        let data = e.data
        if (data instanceof ArrayBuffer) {
            content = StringUtil.byteBufferToUTF8String(new Uint8Array(data))
        } else if (typeof data == "string") {
            content = data
        } else {
            console.warn("rfs.onmessage收到的数据格式不正确", data)
        }
        // console.log("rfs.onmessage", content)
        try {
            let json = JSON.parse(content)
            processMessage(json)
        } catch (e) {
            console.warn("rfs.onmessage.error", content, e)
        }
    }
    wss.binaryType = "arraybuffer"
    heartBeatTimer = setInterval(() => {
        wss.send(JSON.stringify({ event: "heartbeat" }))
    }, 5000)
    clearInterval(heartBeatTimer)
}


namespace RFS {
    export function init() {
        RFS_UPDATE_ROOT = native.fileUtils.getWritablePath() + "rfs_update_root/"
        game.on(Game.EVENT_SHOW, checkSocket)
        game.on(Game.EVENT_GAME_INITED, checkSocket)
    }
}


if (NATIVE) {
    RFS.init()
}

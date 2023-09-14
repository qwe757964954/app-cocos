import { TextAsset, assetManager, native } from "cc";

// const PACKAGE_URL = "http://172.20.153.128:9000"

interface HotUpdateCallback {
    onFinish()
    onFailed()
    onNewVersionFound()
    onProgress(percent: number)
}

type InitParams = {
    callback: HotUpdateCallback,
    updateRoot: string
    serverUrl: string
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

function printLog(...msg) {
    console.log("QuickUpdate", ...msg)
}

/**
 * 热更新
 */
export class HotUpdate {

    private static am: native.AssetsManager
    private static isUpdating = false
    private static updateRoot = ""
    private static serverUrl = ""
    private static callback: HotUpdateCallback = null

    public static init(params: InitParams) {
        this.callback = params.callback
        this.serverUrl = params.serverUrl
        this.updateRoot = params.updateRoot.replace(/\\/g, "/").replace(/\/\//g, "/")
        if (this.updateRoot.endsWith("/")) {
            this.updateRoot = this.updateRoot.substring(0, this.updateRoot.length - 1)
        }
    }

    /**
     * 检查更新
     */
    public static checkUpdate() {
        if (this.isUpdating) {
            throw new Error("正在更新中")
        }
        if (!this.callback) {
            throw new Error("必须设置callback")
        }
        this.isUpdating = true
        this.deleteAm()
        this.initAm()
        this.am.setEventCallback(event => {
            printLog("event", event)
            let code = event.getEventCode()
            switch (code) {
                case native.EventAssetsManager.ALREADY_UP_TO_DATE:
                    printLog("ALREADY_UP_TO_DATE")
                    this.onNoUpdate()
                    break
                case native.EventAssetsManager.ERROR_PARSE_MANIFEST:
                case native.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                case native.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
                    printLog("ERROR_PARSE_MANIFEST/ERROR_NO_LOCAL_MANIFEST/ERROR_DOWNLOAD_MANIFEST")
                    this.onUpdateFailed()
                    break;
                case native.EventAssetsManager.NEW_VERSION_FOUND:
                    printLog("NEW_VERSION_FOUND")
                    this.onNewVersionFound()
                    break;
            }
        })
        this.loadLocalManifest()
        this.loadRemoteManifest()
    }

    private static loadLocalManifest() {
        if (this.am.getState() != native.AssetsManager.State.UNINITED) {
            printLog("local manifest 已经自动加载")
            printLog(this.am.getLocalManifest())
            printLog(this.am.getLocalManifest().getManifestFileUrl())
            return true
        }
        printLog("手动加载内置manifest")
        let content = native.fileUtils.getStringFromFile("project.manifest")
        content = content.replace(/REMOTE_URL/g, this.serverUrl)
        let localManifest = new native.Manifest(content, this.updateRoot)
        printLog("localManifest", localManifest, localManifest.getPackageUrl(), localManifest.getManifestFileUrl())
        this.am.loadLocalManifest(localManifest, this.updateRoot)
    }

    private static loadRemoteManifest() {
        assetManager.loadRemote<TextAsset>(`${this.serverUrl}/project.manifest?t=${Date.now()}`, { ext: ".txt" }, (e, v) => {
            printLog("download remote manifest", e, v)
            if (!e && v && v instanceof TextAsset) {
                let content = v.text
                content = content.replace(/REMOTE_URL/g, this.serverUrl)
                assetManager.releaseAsset(v)
                let manifest = new native.Manifest(content, this.updateRoot)
                printLog("remote manifest", manifest, manifest.getPackageUrl(), manifest.getManifestFileUrl())
                this.am.loadRemoteManifest(manifest)
            } else {
                this.onUpdateFailed()
            }
        })
    }

    /**
     * 修改update/project.manifest，把里面的packageurl改成正确的。 
     * @returns  如果成功，返回此文件的绝对路径。 如果失败或者不存在，则返回null
     */
    private static modifyLocalManifest(): string | null {
        let path = this.updateRoot + "/project.manifest"
        printLog("modifyLocalManifest", path)
        if (native.fileUtils.isFileExist(path)) {
            printLog("文件存在")
            let content = native.fileUtils.getStringFromFile(path)
            try {
                let json = JSON.parse(content)
                json.packageUrl = this.serverUrl + "/"
                json.remoteManifestUrl = this.serverUrl + "/project.manifest"
                content = JSON.stringify(json)
                native.fileUtils.writeStringToFile(content, path)
                printLog("修改完成")
                return path
            } catch (e) {
                printLog(e)
                native.fileUtils.removeDirectory(this.updateRoot)
            }
        } else {
            printLog("文件不存在，从来没有更新过")
        }
    }

    static doUpdate() {
        if (!this.callback) {
            throw new Error("必须设置callback")
        }
        if (!this.am) {
            this.checkUpdate()
            return
        }
        printLog("local version", this.am.getLocalManifest().getVersion())
        printLog("remote version", this.am.getRemoteManifest().getVersion())
        this.am.setEventCallback(event => {
            printLog("event", event)
            let code = event.getEventCode()
            switch (code) {
                case native.EventAssetsManager.ASSET_UPDATED:
                    printLog("asset update", event.getAssetId(), event.getMessage())
                    break;
                case native.EventAssetsManager.ERROR_DECOMPRESS:
                    printLog("decompress error", event.getAssetId, event.getMessage())
                    break;
                case native.EventAssetsManager.ERROR_UPDATING:
                    printLog("updating error", event.getAssetId(), event.getMessage())
                    break;
                case native.EventAssetsManager.UPDATE_FAILED:
                    printLog("update failed", event.getMessage())
                    this.onUpdateFailed()
                    break;
                case native.EventAssetsManager.UPDATE_FINISHED:
                    printLog("update finish", event.getMessage())
                    this.onUpdateFinish()
                    break;
                case native.EventAssetsManager.UPDATE_PROGRESSION:
                    printLog("update progress",
                        "getTotalBytes", event.getTotalBytes(),
                        "getDownloadedBytes", event.getDownloadedBytes(),
                        "getPercent", event.getPercent()
                    )
                    this.onProgress(event)
                    break;
            }
        })
        this.am.update()
    }

    private static initAm() {
        if (this.am) {
            return
        }
        let localManifestPath = this.modifyLocalManifest()
        this.am = new native.AssetsManager(localManifestPath || "", this.updateRoot)
        this.am.setVersionCompareHandle(versionComparator)
        this.am.setVerifyCallback((path, asset) => {
            printLog("verify",
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
                printLog("文件大小不匹配", asset.size, size)
                return false
            }
            // 计算md5
            // let data = native.fileUtils.getDataFromFile(path)
            return true
        })
    }

    private static deleteAm() {
        if (this.am) {
            this.am.setEventCallback(function () { })
            this.am = null
        }
    }

    private static onNoUpdate() {
        this.deleteAm()
        this.isUpdating = false
        this.callback && this.callback.onFinish()
    }

    private static onUpdateFailed() {
        this.deleteAm()
        this.isUpdating = false
        this.callback && this.callback.onFailed()
    }

    private static onNewVersionFound() {
        this.isUpdating = false
        this.callback && this.callback.onNewVersionFound()
    }

    private static onUpdateFinish() {
        this.deleteAm()
        this.isUpdating = false
        this.callback && this.callback.onFinish()
    }

    private static onProgress(event: native.EventAssetsManager) {
        this.callback && this.callback.onProgress(event.getPercent() || 0)
    }

}

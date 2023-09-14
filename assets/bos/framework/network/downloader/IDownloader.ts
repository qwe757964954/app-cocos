import { ImageAsset, SpriteFrame, assetManager, js, sys } from "cc"
import { md5 } from "../../../base/crypto/md5"

export type DownloadRequest = {
    url: string
    /**
     * 文件本地路径。如果不传则默认是 md5(url)
     */
    localPath?: string
}

export type DownloadListener = {
    onProgress?(percent: number)
    onFinish?(result: DownloadResult)
}

export type DownloadResult = {
    success: boolean
    errmsg?: string,
    req: DownloadRequest
}

export type DownloadTask = {
    req: DownloadRequest
    /**
     * 取消任务。 取消后不会有任何回调
     */
    cancel()
}

export class TaskWrapper {
    req: DownloadRequest
    listeners: DownloadListener[] = []

    private realCancel: VoidFunction

    constructor(realCancel: VoidFunction) {
        this.realCancel = realCancel
    }

    cancel(listener: DownloadListener) {
        js.array.fastRemove(this.listeners, listener)
        if (this.listeners.length == 0 && this.realCancel) {
            this.realCancel()
        }
    }

    onFinish(result: DownloadResult) {
        this.listeners.forEach(listener => {
            if (listener && listener.onFinish) {
                listener.onFinish(result)
            }
        })
    }

    onProgress(percent: number) {
        this.listeners.forEach(v => {
            if (v && v.onProgress) {
                v.onProgress(percent)
            }
        })
    }
}

export function newDownloadTask(req: DownloadRequest, cancelFun?: VoidFunction): DownloadTask {
    return {
        req: req,
        cancel: cancelFun || function () { }
    }
}

/**
 * 文件下载器。
 * 
 * 把文件下载到指定位置，会默认保存到 /data/data/com.boyaa.266/files/download_cache/md5(url) 。
 * 可通过 localPath 参数来指定保存位置。
 * 
 * 下载完成后 结果里的 req.localPath 就是本地文件路径，在native平台上可直接使用 native.fileUtils访问此文件。
 * 
 * **localPath额外说明**
 * 
 * - 如果下载时指定了localPath，则以后访问此文件直接使用localPath即可。
 * - 如果下载时没有指定localPath，则获取这个localPath有2种方式：1.下载完成后结果里的req.localPath  2. downloader.getLocalPath(md5(url))
 */
export abstract class IDownloader {

    abstract download(req: DownloadRequest, listener?: DownloadListener): DownloadTask
    /**
     * 读取本地文件内容。 返回的是ArrayBuffer类型。
     * 
     * 要返回其他类型(如string)，则应该直接使用 native.fileUtils
     * @param localPath 文件真实路径 
     */
    abstract getData(localPath: string): Promise<ArrayBuffer>
    abstract exists(localPath: string): Promise<boolean>
    abstract delete(localPath: string): Promise<void>
    abstract getLocalPath(key: string): string

    downloadAsync(req: DownloadRequest): Promise<DownloadResult> {
        return new Promise<DownloadResult>(r => {
            this.download(req, {
                onFinish: (result) => {
                    r(result)
                },
            })
        })
    }

    /**
     * 通过url加载一个SpriteFrame。 此方法同时适配native/web平台
     * @param url 
     * @param localPath 
     * @returns 
     */
    async downloadImageAsync(url: string, localPath?: string): Promise<SpriteFrame> {
        if (sys.isBrowser) {
            return new Promise<SpriteFrame>(async (r) => {
                url = url.trim()
                assetManager.loadRemote(url, { ext: ".png" }, (e, v) => {
                    if (!e && v && v instanceof ImageAsset) {
                        let frame = SpriteFrame.createWithImage(v)
                        r(frame)
                    } else {
                        console.warn("Downloader加载本地图片失败", localPath, e)
                        r(null)
                    }
                })
            })
        }
        return new Promise<SpriteFrame>(async (r) => {
            url = url.trim()
            if (!localPath) {
                localPath = md5(url)
                localPath = this.getLocalPath(localPath)
            }
            let exists = await this.exists(localPath)
            if (!exists) {
                let result = await this.downloadAsync({ url: url, localPath: localPath })
                if (!result.success) {
                    console.warn("Downloader下载失败", url, localPath, result.errmsg)
                    r(null)
                    return
                }
            }
            assetManager.loadRemote<ImageAsset>(localPath, { ext: ".png" }, (e, v) => {
                if (!e && v && v instanceof ImageAsset) {
                    let frame = SpriteFrame.createWithImage(v)
                    r(frame)
                } else {
                    console.warn("Downloader加载本地图片失败", localPath, e)
                    r(null)
                }
            })
        })
    }
}
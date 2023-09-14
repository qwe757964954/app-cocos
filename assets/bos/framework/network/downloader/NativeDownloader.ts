import { native } from "cc"
import { md5 } from "../../../base/crypto/md5"
import { DownloadListener, DownloadRequest, DownloadTask, IDownloader, TaskWrapper, newDownloadTask } from "./IDownloader"


export class NativeDownloader extends IDownloader {

    private cacheRoot: string
    private tasks: { [localPath: string]: TaskWrapper } = {}
    private downloader: native.Downloader

    constructor() {
        super()
        this.cacheRoot = native.fileUtils.getWritablePath() + "download_cache/"
        this.cacheRoot = this.cacheRoot.replace(/\\/g, "/")
        this.cacheRoot = this.cacheRoot.replace(/\/\//g, "/")
        native.fileUtils.createDirectory(this.cacheRoot)
        this.downloader = new native.Downloader({
            countOfMaxProcessingTasks: 4,
            tempFileNameSuffix: ".tmp",
            timeoutInSeconds: 10,
        })
        this.downloader.onError = (task, code, _, error) => {
            let taskWrapper = this.tasks[task.identifier]
            if (!taskWrapper) {
                return
            }
            if (task.storagePath) {
                native.fileUtils.removeFile(task.storagePath)
            }
            if (taskWrapper.req.localPath) {
                native.fileUtils.removeFile(taskWrapper.req.localPath)
            }
            delete this.tasks[task.identifier]
            taskWrapper.onFinish({
                success: false,
                errmsg: error || "unknown error",
                req: taskWrapper.req,
            })
        }
        this.downloader.onProgress = (task, received, totalReceived, total) => {
            let taskWrapper = this.tasks[task.identifier]
            if (!taskWrapper) {
                return
            }
            let percent = 0
            if (total && total > 0) {
                percent = Math.max(received, totalReceived) / total
            }
            taskWrapper.onProgress(percent)
        }
        this.downloader.onSuccess = (task) => {
            let taskWrapper = this.tasks[task.identifier]
            if (!taskWrapper) {
                return
            }
            delete this.tasks[task.identifier]
            taskWrapper.onFinish({
                success: true,
                req: taskWrapper.req
            })
        }
    }

    download(req: DownloadRequest, listener?: DownloadListener): DownloadTask {
        if (!req.localPath) {
            req.localPath = this.cacheRoot + md5(req.url)
        }
        let taskWrapper = this.tasks[req.localPath]
        if (taskWrapper) {
            if (taskWrapper.req.localPath == req.localPath) {
                taskWrapper.listeners.push(listener)
                return {
                    req: req,
                    cancel: () => {
                        taskWrapper.cancel(listener)
                    }
                }
            } else {
                listener && listener.onFinish && listener.onFinish({ success: false, errmsg: "任务已存在", req: req })
                return newDownloadTask(req)
            }
        }
        let task = this.downloader.createDownloadTask(req.url, req.localPath, req.localPath)
        taskWrapper = new TaskWrapper(() => {
            this.downloader.abort(task)
        })
        taskWrapper.req = req
        taskWrapper.listeners = [listener]
        this.tasks[req.localPath] = taskWrapper
        return {
            req: req,
            cancel: () => {
                taskWrapper.cancel(listener)
            }
        }
    }

    async getData(localPath: string): Promise<ArrayBuffer> {
        return native.fileUtils.getDataFromFile(localPath)
    }

    async exists(localPath: string): Promise<boolean> {
        return native.fileUtils.isFileExist(localPath)
    }

    async delete(localPath: string): Promise<void> {
        native.fileUtils.removeFile(localPath)
    }

    getLocalPath(key: string): string {
        if (key.includes("/") || key.includes("\\")) {
            return key
        }
        return this.cacheRoot + key
    }
}

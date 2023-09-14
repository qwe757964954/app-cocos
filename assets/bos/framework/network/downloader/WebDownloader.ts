import { DownloadListener, DownloadRequest, DownloadTask, IDownloader } from "./IDownloader";

export class WebDownloader extends IDownloader {

    private throw() {
        throw new Error("Downloader仅支持native平台")
    }

    download(req: DownloadRequest, listener: DownloadListener): DownloadTask {
        this.throw()
        return
    }

    async getData(localPath: string): Promise<ArrayBuffer> {
        this.throw()
        return
    }

    async exists(localPath: string): Promise<boolean> {
        this.throw()
        return
    }

    delete(localPath: string): Promise<void> {
        this.throw()
        return
    }

    getLocalPath(key: string): string {
        return key
    }

}
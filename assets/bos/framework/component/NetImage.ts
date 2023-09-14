import { Net, XComponent } from 'bos/exports';
import { CCString, ImageAsset, Sprite, SpriteFrame, _decorator, assetManager, sys } from 'cc';
import { EDITOR, NATIVE } from 'cc/env';
import { md5 } from '../../base/crypto/md5';
const { ccclass, property, menu, executeInEditMode } = _decorator;

export type NetImageOption = {
    /**
     * 下载的网络图片会缓存在本地，默认使用md5(url)作为localPath。如果url是带有参数，并且参数可能会变动的，则应该传入一个localPath来做为本地缓存地址
     */
    localPath?: string
}

export type UrlConvertor = (url: string) => string

type RetryResult<T> = {
    result?: T,
    shouldRetry?: boolean
}

type RetryFunction<T> = () => Promise<RetryResult<T>>

async function retry<T>(fun: RetryFunction<T>, times: number): Promise<T> {
    while (times > 0) {
        times--
        let result = await fun()
        if (result) {
            if (result.result) {
                return result.result
            } else if (result.shouldRetry) {
                // 继续重试
            } else {
                break
            }
        }
    }
    return null
}

async function loadRemoteImage(url: string): Promise<ImageAsset> {
    return new Promise<ImageAsset>(r => {
        assetManager.loadRemote(url, { ext: ".png" }, (e, v) => {
            if (!e && v && v instanceof ImageAsset) {
                r(v)
            } else {
                console.warn("NetImage加载图片失败", url, e)
                r(null)
            }
        })
    })
}

/**
 * 用于显示网络图片。
 * 
 * 此组件依赖 Sprite。 如果没有，会自动添加一个
 * 
 * @example
 * let img = this.getComponent(NetImage)
 * img.setUrl("http://aaa.com/logo.png")
 * 
 * @example
 * // 对于web平台，localPath依然可以这样传
 * img.setUrl("http://aaa.com/logo.png?token=xxx", {localPath="/sdcard/xx/logo.png"})
 */
@ccclass('NetImage')
@menu("bos/ui/NetImage")
@executeInEditMode
export class NetImage extends XComponent {

    /**
     * 设置一个全局的方法，在调用setUrl时会通过此方法对url进行转换
     * @param convertor 
     */
    static setUrlConvertor(convertor: UrlConvertor) {
        NetImage.urlConvertor = convertor
    }

    /**
     * 图片加载完成 (成功或者失败都会在node上发送这个事件)
     * 
     * param: (spriteFrame?)
     */
    public static EVENT_IMAGE_LOADED = "NetImage.EVENT_IMAGE_LOADED"

    private static urlConvertor: UrlConvertor

    private sprite: Sprite
    private currentRequestID = 0

    @property(CCString)
    private url = ""

    onLoad(): void {
        if (this.url) {
            this.setUrl(this.url)
        }
    }

    onFocusInEditor() {
        if (this.url) {
            this.setUrl(this.url)
        }
    }

    private ensureSprite() {
        if (this.sprite) {
            return
        }
        this.sprite = this.getComponent(Sprite)
        if (!this.sprite) {
            this.sprite = this.addComponent(Sprite)
            this.sprite.sizeMode = Sprite.SizeMode.CUSTOM
            this.sprite.trim = false
        }
    }

    private async loadImg(url: string, opt?: NetImageOption): Promise<RetryResult<SpriteFrame>> {
        let requestID = ++this.currentRequestID
        let localPath = ""
        if (opt && opt.localPath) {
            localPath = opt.localPath
        } else {
            localPath = md5(url)
            localPath = Net.downloader.getLocalPath(localPath)
        }
        if (NATIVE) {
            let exists = await Net.downloader.exists(localPath)
            if (!exists) {
                let result = await Net.downloader.downloadAsync({ url: url, localPath: localPath })
                if (!result.success) {
                    return { shouldRetry: requestID == this.currentRequestID }
                }
            }
            let img = await loadRemoteImage(localPath)
            let frame = SpriteFrame.createWithImage(img)
            if (this.selfValid && requestID == this.currentRequestID) {
                this.sprite.spriteFrame = frame
            }
            return { result: frame }
        } else if (sys.isBrowser) {
            let frame = await Net.downloader.downloadImageAsync(url, localPath)
            if (!this.selfValid) {
                return
            }
            if (frame) {
                if (requestID == this.currentRequestID) {
                    this.sprite.spriteFrame = frame
                }
                return { result: frame }
            } else {
                return { shouldRetry: requestID == this.currentRequestID }
            }
        }
    }

    async setUrl(url: string, opt?: NetImageOption): Promise<SpriteFrame> {
        this.ensureSprite()
        if (NetImage.urlConvertor) {
            url = NetImage.urlConvertor(url)
        }
        if (EDITOR) {
            assetManager.loadRemote<ImageAsset>(url, { ext: ".png" }, (e, v) => {
                if (!e && v && v instanceof ImageAsset && this.selfValid) {
                    this.sprite.spriteFrame = SpriteFrame.createWithImage(v)
                }
            })
            return
        }
        let frame = await retry(() => {
            return this.loadImg(url, opt)
        }, 3)
        if (this.selfValid) {
            this.node.emit(NetImage.EVENT_IMAGE_LOADED, frame)
        }
        return frame
    }
}
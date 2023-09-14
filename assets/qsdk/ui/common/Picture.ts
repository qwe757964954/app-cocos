import { md5 } from 'bos/base/crypto/md5';
import { Base64, Net } from 'bos/exports';
import { YogaFlex } from 'bos/framework/yoga/YogaFlex';
import { CCString, Color, Component, ImageAsset, Size, Sprite, SpriteFrame, UITransform, _decorator, assetManager, ccenum, sys } from 'cc';
import { EDITOR } from 'cc/env';
import { OSS } from 'qsdk/exports';
const { ccclass, property, executeInEditMode, disallowMultiple, type, menu } = _decorator;

/**
 * 图片适配模式
 */
enum FitMod {
    default = 0,
    width = 1,
    height = 2,
    auto = 3,
    full = 4,
    pad = 5,
}
ccenum(FitMod)

type Opt = {
    /**
     * cos的处理参数
     */
    process: string
}

export type UrlConvertor = (url: string) => string

/**
 * 保存已经下载过的SpriteFrame
 */
let frame_caches: { [key: string]: SpriteFrame } = {}

function loadRemoteImageAsync(url: string): Promise<ImageAsset> {
    return new Promise<ImageAsset>(r => {
        assetManager.loadRemote(url, { ext: ".png" }, (e, v) => {
            if (v && v instanceof ImageAsset) {
                r(v)
            } else {
                console.warn("Picture加载图片失败", url, e)
                r(null)
            }
        })
    })
}

async function loadSpriteFrameWithCache(url: string, key?: string) {
    if (!key) {
        key = md5(url)
    }
    let frame = frame_caches[key]
    if (!frame || !frame.isValid) {
        if (sys.isBrowser) {
            let asset = await loadRemoteImageAsync(url)
            if (asset) {
                // console.log("Picture.loadSpriteFrameWithCache load success", url, key)
                frame = SpriteFrame.createWithImage(asset)
                frame_caches[key] = frame
            }
        } else {
            let localPath = Net.downloader.getLocalPath(key)
            frame = await Net.downloader.downloadImageAsync(url, localPath)
            if (frame) {
                frame_caches[key] = frame
            } else {
                console.warn("Picture加载图片失败", url, key)
            }
        }
    } else {
        // console.log("Picture.loadSpriteFrameWithCache hitCache", url, key, frame, [frame.width, frame.height], frame.originalSize)
    }
    return frame
}

/**
 * 加载网络图片。  支持 http/oss
 * 
 * @example
 * picture.url="oss://xxx"
 * picture.fitMod = Picture.FitMod.pad
 * picture.designSize = new Size(300,300)
 * picture.padColor = Color.WHITE
 * picture.refresh()
 * 
 * @example
 * picture.setUrl("http://xx.xx/xx.png")
 * 
 * @example
 * picture.setUrl("oss://xxx", {process:"imageMogr2/thumbnail/300x300"})
 */
@ccclass('Picture')
@disallowMultiple
@executeInEditMode
@menu("qsdk/ui/Picture")
export class Picture extends Component {

    static FitMod = FitMod

    /**
     * 设置一个全局的方法，在调用setUrl时会通过此方法对url进行转换
     * @param convertor 
     */
    static setUrlConvertor(convertor: UrlConvertor) {
        Picture.urlConvertor = convertor
    }

    private static urlConvertor: UrlConvertor

    @property(CCString)
    url = ""

    @property({ serializable: true })
    _designSize: Size = new Size(0, 0)

    @property(Size)
    get designSize() {
        return this._designSize || new Size(0, 0)
    }
    set designSize(v) {
        if (!v) {
            v = new Size(0, 0)
        } else {
            v.width = Math.floor(v.width)
            v.height = Math.floor(v.height)
        }
        this._designSize = v
    }

    @type(FitMod)
    fitMod: FitMod = FitMod.default

    @property(Color)
    padColor: Color = Color.BLACK.clone()

    @property(SpriteFrame)
    failedSprite: SpriteFrame = null

    opt: Opt = null
    private currentRequestID = 0

    private sprite: Sprite
    private _lastProcess = ""
    get lastProcess() {
        return this._lastProcess
    }

    onLoad() {
        this.ensureSprite()
        this.loadImage()
    }

    onFocusInEditor() {
        this.loadImage()
    }

    /**
     * 如果直接修改了 padColor/fitMod/url 等参数，需要手动调用refresh重新加载
     */
    refresh() {
        this.loadImage()
    }

    setUrl(url: string, opt?: Opt) {
        if (url) {
            url = url.trim()
        }
        this.url = url
        this.opt = opt
        this.refresh()
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

    private async loadImage() {
        if (!this.url) {
            return
        }
        this.ensureSprite()
        let url = this.url
        if (Picture.urlConvertor) {
            url = Picture.urlConvertor(url)
        }
        let lurl = url.toLocaleLowerCase()
        if (lurl.startsWith("http://") || lurl.startsWith("https://")) {
            this.loadHttp(url)
        } else if (lurl.startsWith("cos://") || lurl.startsWith("oss://")) {
            this.loadOSS(url)
        }
    }

    private applyImage(frame: SpriteFrame) {
        this.sprite.spriteFrame = frame
        if (!frame) {
            return
        }
        let designSize = this.designSize
        if (designSize.width == 0 || designSize.height == 0) {
            designSize = new Size(this.getComponent(UITransform).contentSize)
        }
        let frameSize = frame.originalSize
        let finalSize = new Size()
        let maxWidth = designSize.width
        let maxHeight = designSize.height
        let scaleW = frameSize.width / maxWidth
        let scaleH = frameSize.height / maxHeight
        switch (this.fitMod) {
            case FitMod.width: {
                finalSize.width = frameSize.width / scaleW
                finalSize.height = frameSize.height / scaleW
                break
            }
            case FitMod.height: {
                finalSize.width = frameSize.width / scaleH
                finalSize.height = frameSize.height / scaleH
                break
            }
            case FitMod.pad:
            case FitMod.auto: {
                let s = scaleH > scaleW ? scaleH : scaleW
                finalSize.width = frameSize.width / s
                finalSize.height = frameSize.height / s
                break
            }
            case FitMod.full: {
                finalSize.width = designSize.width
                finalSize.height = designSize.height
                break
            }
            default: {
                finalSize.width = frameSize.width
                finalSize.height = frameSize.height
            }
        }
        // console.log("-----applyImage", this.node.uuid, "frame", new Size(frame.width, frame.height), "designSize", designSize, "finalSize", finalSize)
        let yoga = this.getComponent(YogaFlex)
        if (yoga) {
            yoga.setSize(finalSize.width, finalSize.height)
        } else {
            this.getComponent(UITransform).setContentSize(finalSize)
        }
    }

    private async loadHttp(url: string) {
        if (EDITOR) {
            assetManager.loadRemote<ImageAsset>(url, { ext: ".png" }, (e, v) => {
                if (!e && v && v instanceof ImageAsset && this.node.isValid) {
                    this.sprite.spriteFrame = SpriteFrame.createWithImage(v)
                } else {
                    console.warn("Picture加载图片失败", url, e)
                }
            })
            return
        }
        let id = ++this.currentRequestID
        let frame = await loadSpriteFrameWithCache(url)
        if (!this.isValid || !this.node.isValid) {
            return
        }
        if (id != this.currentRequestID) {
            return
        }
        this.applyImage(frame || this.failedSprite)
    }

    private async loadOSS(url: string) {
        // console.log("Picture.loadOSS", url)
        let process = ""
        if (this.opt && this.opt.process) {
            process = this.opt.process
        } else {
            process = this.genProcess()
        }
        this._lastProcess = process
        let id = ++this.currentRequestID
        let osskey = url.substring(6).trim()
        // console.log("Picture.loadOSS", key)
        let realurl = await OSS.getInstance().getObjectUrlAsync(osskey)
        // console.log("Picture.loadOSS url", realurl)
        if (!this.isValid || !this.node.isValid) {
            return
        }
        if (realurl) {
            if (process) {
                if (realurl.includes("?")) {
                    realurl = realurl + "&" + process
                } else {
                    realurl = realurl + "?" + process
                }
            }
            // console.log("Picture.loadOSS fainalURL", realurl)
            let key = md5(`${osskey}_${process}`)
            let frame = await loadSpriteFrameWithCache(realurl, key)
            if (!this.isValid || !this.node.isValid) {
                return
            }
            if (id != this.currentRequestID) {
                return
            }
            this.applyImage(frame || this.failedSprite)
        } else {
            if (id != this.currentRequestID) {
                return
            }
            this.applyImage(this.failedSprite)
        }
    }

    private genProcess(): string {
        switch (this.fitMod) {
            case FitMod.default:
                return ""
            case FitMod.width:
                return `imageMogr2/thumbnail/${this._designSize.width}x`
            case FitMod.height:
                return `imageMogr2/thumbnail/x${this._designSize.height}`
            case FitMod.auto:
            case FitMod.full:
                return `imageMogr2/thumbnail/${this._designSize.width}x${this._designSize.height}`
            case FitMod.pad:
                let color = this.padColor.toCSS("#rrggbb")
                color = Base64.encode(color)
                return `imageMogr2/thumbnail/${this._designSize.width}x${this._designSize.height}/pad/1/color/${color}`
            default:
                return ""
        }
    }
}

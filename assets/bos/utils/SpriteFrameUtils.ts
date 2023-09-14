import { ImageAsset, SpriteFrame, assetManager, sys } from "cc";
import { Base64 } from "../base/encoding/base64";

/**
 * 加载SpriteFrame的一些方法
 */
export class SpriteFrameUtils {

    static async fromArrayBuffer(arrayBuffer: ArrayBuffer): Promise<SpriteFrame | null> {
        return new Promise<SpriteFrame>(r => {
            let data = Base64.encode(arrayBuffer)
            let url = `data:image/png;base64,${data}`
            assetManager.loadRemote<ImageAsset>(url, { ext: ".png" }, (e, v) => {
                if (!e && v && v instanceof ImageAsset) {
                    r(SpriteFrame.createWithImage(v))
                } else {
                    r(null)
                }
            })
        })
    }

    static async fromBlob(blob: Blob | File): Promise<SpriteFrame | null> {
        let ab = await blob.arrayBuffer()
        return this.fromArrayBuffer(ab)
    }

    /**
     * 把 blob/file 转换为 html image。 仅支持web平台
     * @param blob 
     * @returns 
     */
    static async toImage(blob: Blob | File): Promise<HTMLImageElement | null> {
        if (!sys.isBrowser) {
            return null
        }
        return new Promise<HTMLImageElement | null>(async (r) => {
            let ab = await blob.arrayBuffer()
            let data = Base64.encode(ab)
            let img = document.createElement("img")
            img.src = `data:image/png;base64,${data}`
            img.onload = () => {
                r(img)
            }
            img.onerror = () => {
                r(null)
            }
        })
    }

}
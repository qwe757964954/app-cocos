import { ImageAsset, Size, SpriteFrame, Texture2D, assetManager, native, sys } from "cc";
import { NATIVE } from "cc/env";
import { Base64 } from "../encoding/base64";
import { XFile } from "./XFile";
import { XImageFile } from "./XImageFile";


function flipY(data: Uint8Array, width: number, height) {
    let lines: Uint8Array[] = []

    for (let y = 0; y < height; y++) {
        let start = width * 4 * y
        let end = width * 4 * (y + 1)
        let line = data.slice(start, end)
        lines.push(line)
    }
    let rtn = new Uint8Array(width * height * 4)
    for (let y = 0; y < height; y++) {
        let line = lines[height - y - 1]
        rtn.set(line, width * 4 * y)
    }
    return rtn
}

function restoreRGB(data: Uint8Array)
{
    for (let pixelCount = 0; pixelCount < data.length / 4; pixelCount++)
    {
        if (data[pixelCount * 4 + 3] != 255)
        {
            let alpha = data[pixelCount * 4 + 3] / 255
            data[pixelCount * 4] /= alpha
            data[pixelCount * 4 + 1] /= alpha
            data[pixelCount * 4 + 2] /= alpha
        }
    }
}

/**
 * 截图结果。 NodeUtil.renderToImage
 * 
 */
export class CaptureFile implements XFile, XImageFile {

    private data: Uint8Array
    private width: number
    private height: number
    private png: ArrayBuffer
    private fileName: string
    private imageAsset: ImageAsset
    private frame: SpriteFrame

    constructor(rgbaData: Uint8Array, width: number, height: number) {
        this.data = flipY(rgbaData, width, height)
        restoreRGB(this.data)
        this.width = width
        this.height = height
        if (sys.isBrowser) {
            this.fileName = "capture.png"
            let base64 = this.genBase64()
            this.png = Base64.decodeToArrayBuffer(base64)
        } else {
            let dir = native.fileUtils.getWritablePath() + "tmp"
            native.fileUtils.createDirectory(dir)
            this.fileName = native.fileUtils.getWritablePath() + `tmp/capture_${Date.now()}.png`
        }
    }

    private async genPng() {
        if (this.png) {
            return
        }
        try {
            await native.saveImageData(this.data, this.width, this.height, this.fileName)
        } catch (e) {
            console.log("saveImageData failed")
        }
        if (native.fileUtils.isFileExist(this.fileName)) {
            this.png = native.fileUtils.getDataFromFile(this.fileName)
            native.fileUtils.removeFile(this.fileName)
        }
    }

    private genCanvas() {
        let canvas = document.createElement("canvas")
        canvas.width = this.width
        canvas.height = this.height
        let ctx = canvas.getContext("2d")
        let uint8ClampedArray = new Uint8ClampedArray(this.data)
        let imageData = new ImageData(uint8ClampedArray, this.width, this.height)
        ctx.putImageData(imageData, 0, 0)
        return canvas
    }

    private genBase64() {
        let canvas = this.genCanvas()
        let url = canvas.toDataURL("image/png")
        let TAG = ";base64,"
        let index = url.indexOf(TAG)
        return url.substring(index + TAG.length)
    }

    async getImageSize(): Promise<Size> {
        return new Size(this.width, this.height)
    }

    async getSpriteFrame(): Promise<SpriteFrame> {
        if (this.frame) {
            return this.frame
        }
        this.imageAsset = new ImageAsset({
            _compressed: false,
            _data: this.data,
            width: this.width,
            height: this.height,
            format: Texture2D.PixelFormat.RGBA8888
        })
        this.frame = SpriteFrame.createWithImage(this.imageAsset)
        return this.frame
    }

    destroy() {
        if (this.imageAsset) {
            assetManager.releaseAsset(this.imageAsset)
            this.imageAsset = null
        }
        if (this.frame) {
            assetManager.releaseAsset(this.frame)
            this.frame = null
        }
    }

    /**
     * 固定返回  .png
     */
    get ext(): string {
        return ".png"
    }

    /**
     * 在native平台上，此文件名是临时文件的名。调用saveToFile(path)会把图片保存到path，但不会改变此值。
     */
    get name(): string {
        let index = this.fileName.lastIndexOf("/")
        return this.fileName.substring(index + 1)
    }

    /**
     * 在web平台可以直接获得到文件大小。但在native平台上，需要先调用 arrayBuffer或者saveToFile 之后才可以获得文件大小。 
     * 如果无法获得，则返回-1
     */
    get fileSize(): number {
        if (!this.png) {
            return -1
        }
        return this.png.byteLength
    }

    async arrayBuffer(): Promise<ArrayBuffer> {
        await this.genPng()
        return Promise.resolve(this.png)
    }

    /**
     * 把截图保存到文件。  
     * @param path
     */
    async saveToFile(path: string) {
        if (NATIVE) {
            await this.genPng()
            if (this.png) {
                let index = path.lastIndexOf("/")
                if (index > -1) {
                    let dir = path.substring(0, index)
                    native.fileUtils.createDirectory(dir)
                }
                native.fileUtils.writeDataToFile(this.png, path)
            }
        } else {
            let canvas = this.genCanvas()
            canvas.toBlob(blob => {
                let file = new File([blob], "capture.png", { type: "octstream/stream" })
                let link = document.createElement("a")
                let url = URL.createObjectURL(file)
                link.target = "_blank"
                link.download = "capture.png"
                link.href = url
                document.body.appendChild(link)
                link.click()
                link.remove()
                URL.revokeObjectURL(url)
            })
        }
    }

}
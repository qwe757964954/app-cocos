import { XImageFile } from "bos/base/filesystem/XImageFile"
import { SpriteFrameUtils, XFile } from "bos/exports"
import { ImageAsset, Size, SpriteFrame, assetManager, native, sys } from "cc"
import { Gallery } from "./Gallery"

export enum GalleryType {
    image = Gallery.TYPE_IMAGE,
    video = Gallery.TYPE_VIDEO,
    all = Gallery.TYPE_ALL,
}

export type GalleryResult<T extends GalleryFile> = {
    /**
     * 如果为true，则表示需要读取文件的权限。需要使用 Permission.request来申请 TYPE_EXTERNAL_STORAGE 权限
     */
    noPermission: boolean
    /**
     * 用前需要判断 !=null && length>0
     */
    files?: T[]
}

async function loadRemoteImageAsync(path: string): Promise<ImageAsset> {
    return new Promise<ImageAsset>(async (r) => {
        assetManager.loadRemote<ImageAsset>(path, { ext: ".png" }, (e, v) => {
            if (v && v instanceof ImageAsset) {
                r(v)
            } else {
                r(null)
            }
        })
    })
}

export class GalleryFile implements XFile {

    protected _path: string | File = null

    constructor(path: string | File) {
        this._path = path
    }

    get name(): string {
        if (sys.isBrowser) {
            return (this._path as File).name
        } else {
            let p = this._path as string
            let index = p.lastIndexOf("/")
            return p.substring(index + 1)
        }
    }

    get ext(): string {
        let name = this.name
        if (!name) {
            return ""
        }
        let index = name.lastIndexOf(".")
        return name.substring(index)
    }

    get fileSize(): number {
        if (sys.isBrowser) {
            return (this._path as File).size
        } else {
            return native.fileUtils.getFileSize(this._path as string)
        }
    }

    async arrayBuffer(): Promise<ArrayBuffer> {
        if (sys.isBrowser) {
            return (this._path as File).arrayBuffer()
        } else {
            return native.fileUtils.getDataFromFile(this._path as string)
        }
    }

}

export class GalleryImage extends GalleryFile implements XImageFile {

    private _size: Size = null
    private _frame: SpriteFrame = null

    async getImageSize() {
        if (this._size == null) {
            if (sys.isBrowser) {
                let img = await SpriteFrameUtils.toImage(this._path as File)
                if (img) {
                    this._size = new Size(img.width, img.height)
                }
            } else {
                let img = await loadRemoteImageAsync(this._path as string)
                this._size = new Size(img.width, img.height)
            }
        }
        return this._size
    }

    async getSpriteFrame() {
        if (this._frame == null) {
            if (sys.isBrowser) {
                this._frame = await SpriteFrameUtils.fromBlob(this._path as File)
            } else {
                let img = await loadRemoteImageAsync(this._path as string)
                if (img) {
                    this._frame = SpriteFrame.createWithImage(img)
                }
            }
        }
        return this._frame
    }

    destroy() {
        if (this._frame) {
            assetManager.releaseAsset(this._frame)
            this._frame = null
        }
    }

}

export class GalleryVideo extends GalleryFile { }

async function openCustomGalleryWeb(type: GalleryType): Promise<File> {
    return new Promise<File>(r => {
        let input = document.createElement("input")
        input.type = "file"
        if (type == GalleryType.image) {
            input.accept = "image/png,image/jpg,image/jpeg"
        } else if (type == GalleryType.video) {
            input.accept = "video/*"
        } else {
            input.accept = "*/*"
        }
        input.style.display = "none"
        document.getElementsByTagName("body")[0].append(input)
        input.oninput = async () => {
            input.remove();
            if (input.files && input.files[0]) {
                r && r(input.files[0])
            } else {
                r && r(null)
            }
            r = null
        }
        input.onabort = () => {
            r && r(null)
            r = null
        }
        input.oncancel = () => {
            r && r(null)
            r = null
        }
        input.click()
    })
}

async function openCustomGalleryNative(type: GalleryType, limit: number, editable: boolean): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
        Gallery.openCustomGallery(type, limit, editable, (status, result) => {
            if (result) {
                result = result.filter(v => v != "" && v != null)
            }
            if (status == Gallery.OPEN_SUCCESS) {
                resolve(result)
            } else if (status == Gallery.NO_PERMISSION_INT) {
                reject()
            } else {
                resolve(null)
            }
        })
    })
}

export let GalleryX = {

    async openCustomGalleryImage(limit: number, editable: boolean): Promise<GalleryResult<GalleryImage>> {
        return GalleryX.openCustomGallery(GalleryType.image, limit, editable) as Promise<GalleryResult<GalleryImage>>
    },

    /**
     * 选取文件 (图片/视频)
     * @param type 
     * @param limit 最大可选数量。 在web平台只能选1个。
     * @param editable 选择图片时是否可裁剪图片。如果选多张，则不可裁剪。
     * @returns 
     */
    async openCustomGallery(type: GalleryType, limit: number, editable: boolean): Promise<GalleryResult<GalleryFile>> {
        let files: (string | File)[]
        if (sys.isBrowser) {
            let file = await openCustomGalleryWeb(type)
            if (file) {
                files = [file]
            }
        } else if (sys.isMobile) {
            let paths: string[]
            try {
                paths = await openCustomGalleryNative(type, limit, editable)
            } catch (e) {
                return { noPermission: true }
            }
            files = paths
        }
        let rtn: GalleryResult<GalleryFile> = {
            noPermission: false,
            files: null,
        }
        if (files) {
            rtn.files = files.map(path => {
                if (type == GalleryType.image) {
                    return new GalleryImage(path)
                } else if (type == GalleryType.video) {
                    return new GalleryVideo(path)
                } else {
                    return new GalleryFile(path)
                }
            })
        }
        return rtn
    }
}

import { Component, _decorator } from 'cc';
import { GalleryX } from 'platform/GalleryX';
import { Permission } from 'platform/exports';
import { OSS } from 'qsdk/exports';
const { ccclass } = _decorator;

@ccclass('TestDevice')
export class TestDevice extends Component {

    start() {
        OSS.getInstance().init()
    }

    async onChooseImageClick() {
        let result = await GalleryX.openCustomGalleryImage(1, true)
        console.log("choose result", result)
        if (result.noPermission) {
            console.log("需要权限")
            Permission.request(Permission.TYPE_EXTERNAL_STORAGE, v => {
                console.log("授权结果", v)
            })
            return
        }
        if (result.files) {
            for (let i = 0; i < result.files.length; i++) {
                let file = result.files[i]
                console.log("name", file.name)
                console.log("ext", file.ext)
                console.log("file size", file.fileSize)
                console.log("img size", await file.getImageSize())
                console.log("spriteframe", await file.getSpriteFrame())
                console.log("arrayBuffer", await file.arrayBuffer())
                console.log("如果获取过SpriteFrame,用完需要destroy")
                file.destroy()
                let ab = await file.arrayBuffer()
                let ret = await OSS.getInstance().uploadFile(ab, {
                    prefix: null,
                    onProgress: (progress) => {
                        console.log("progress", progress)
                    }
                })
                console.log("upload result", ret)
            }
        }
    }
}



import { _decorator, Component, EditBox, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Feed } from 'qsdk/feed/Feed';
import { SocialFeedEvent } from '../../../common/src/Define';
import { SimpleButtonEx } from 'app/modules/social/common/src/component/SimpleButtonEx';
import { ISubmitPostReq, Permission, SubmitPostReq } from 'idl/mpff/social/feed.v1';
import { FeedEvent } from 'qsdk/feed/define';
import { ImageUtil, SpriteFrameUtils, uiMgr } from 'bos/exports';
import { Sprite } from 'cc';
import { SpriteFrame } from 'cc';
import { Prefab } from 'cc';
import { instantiate } from 'cc';
import { SubmitImage } from './SubmitImage';
import { YogaFlex } from 'bos/framework/yoga/YogaFlex';
import { GalleryImage, GalleryType, GalleryX } from 'platform/GalleryX';
import { NativeDevice } from 'platform/NativeDevice';

@ccclass('SubmitPostViewCtr')
export class SubmitPostViewCtr extends XComponent {

    @property(EditBox)
    editBox = null;

    @property(SimpleButtonEx)
    submitBtn = null

    @property(Prefab)
    SubmitImagePrefab: Prefab = null

    @property(Node)
    resourceView: Node = null

    @property(Node)
    selectNode: Node = null

    selectFileList: GalleryImage[] = []

    start() {
        this.onTextChange()
    }


    onClickSubmit() {
        let content = this.editBox.string
        if (this.selectFileList.length > 0) {

            let req = {
                content: content,
                files: this.selectFileList
            }
            Feed.getInstance().submitImagePost(req).then(({ err }) => {
                if (!err) {
                    this.onClickClose()
                    Feed.getInstance().emit(FeedEvent.ON_NOTIFY_UPDATE_FEED)
                }
            })

        } else {
            let req: ISubmitPostReq = {
                content: content
            }
            Feed.getInstance().submitPost(req).then(({ err, resp }) => {
                if (!err) {
                    this.onClickClose()
                    Feed.getInstance().emit(FeedEvent.ON_NOTIFY_UPDATE_FEED)
                }
            })
        }

    }

    onClickClose() {
        uiMgr.popPage()
    }

    onTextChange() {
        let enable = this.editBox.string === "" ? false : true
        if (this.selectFileList.length > 0) {
            enable = true
        }

        this.submitBtn.setEnabled(enable)
    }

    //
    onClickSelectFile() {
        this.onChooseImageClick()
    }


    // private async chooseFileWeb(fileType: string) {
    //     let input = document.createElement("input")
    //     // input.id = "ss_upload_input_file"
    //     input.type = "file"
    //     input.accept = fileType
    //     input.style.display = "none"
    //     document.getElementsByTagName("body")[0].append(input)
    //     input.oninput = async () => {
    //         input.remove()
    //         let file = input.files[0]
    //         input.remove()

    //         this.selectFileList.push(file)
    //         this.updateResources()

    //     }
    //     input.click()
    // }

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
                this.selectFileList.push(file)
                this.updateResources()
                // console.log("name", file.name)
                // console.log("ext", file.ext)
                // console.log("file size", file.fileSize)
                // console.log("img size", await file.getImageSize())
                // console.log("spriteframe", await file.getSpriteFrame())
                // console.log("arrayBuffer", await file.arrayBuffer())
                // console.log("如果获取过SpriteFrame,用完需要destroy")
                // file.destroy()
                // let ab = await file.arrayBuffer()
                // let ret = await OSS.getInstance().uploadFile(ab, {
                //     prefix: null,
                //     onProgress: (progress) => {
                //         console.log("progress", progress)
                //     }
                // })
                // console.log("upload result", ret)
            }
        }
    }


    async updateResources() {

        this.onTextChange()

        this.resourceView.removeAllChildren()
        for (let index = 0; index < this.selectFileList.length; index++) {
            const element = this.selectFileList[index];
            let image = instantiate(this.SubmitImagePrefab)
            image.getComponent(SubmitImage).updateView(index, element)
            // image.getComponent(YogaFlex).setMargin(20, 0, 0, 0)
            this.resourceView.addChild(image)
        }
        // this.selectNode.getComponent(YogaFlex).setMargin(20, 0, 0, 0)
        this.resourceView.addChild(this.selectNode)
    }



}
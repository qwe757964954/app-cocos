import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { ImageUtil, Log, SpriteFrameUtils } from 'bos/exports';
import { Sprite } from 'cc';
import { UITransform } from 'cc';
import { size } from 'cc';
import { Label } from 'cc';
import { BundleSprite } from 'bos/framework/component/BundleSprite';
import { SelectImgLayout } from './SelectImgLayout';

import {GalleryImage, GalleryType, GalleryX} from 'platform/GalleryX';
import {Permission} from 'platform/Permission';
import { NATIVE } from 'cc/env';
import { OSS } from 'qsdk/exports';


@ccclass('UploadImg')
export class UploadImg extends XComponent {
    @property(Sprite)
    imageView:Sprite = null!;

    @property(Node)
    emptyImg:Node = null!;

    @property(Label)
    descLab:Label = null!;

    @property(Node)
    delBtn:Node = null!;

    private _delegate: SelectImgLayout = null!;
    private _index = 0;

    set delegate(value: SelectImgLayout) {
        this._delegate = value;
    }

    initIndex(index:number){
        this._index = index;
    }

    resetUI(){
        this.delBtn.active = false;
        this.emptyImg.active = false;
        this.imageView.node.active = false;
        this.descLab.node.active = false;
    }

    setResetGUI(){
        this.resetUI();
        this.descLab.node.active = true;
        this.descLab.string = "上传图片0/3";
        this.emptyImg.active = true;
        let sprite = this.emptyImg.getComponent(BundleSprite);
        if (sprite) {
            sprite.spriteFrame = 'prizeCenter@res/image/support/Res_Hall_Prizes_Evaluate_icon_xiangji';
        }
    }

    setAddGUI(index:number){
        this.resetUI();
        this.descLab.node.active = true;
        this.descLab.string = `上传图片${index}/3`;
        this.emptyImg.active = true;
        let sprite = this.emptyImg.getComponent(BundleSprite);
        if (sprite) {
            sprite.spriteFrame = 'prizeCenter@res/image/support/Res_Hall_Prizes_Evaluate_icon_tianjiazp';
        }  
    }

    private async chooseFile() {
        let result = await GalleryX.openCustomGallery(GalleryType.image, 1, true)
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
                let file = result.files[i] as GalleryImage
                console.log("name", file.name)
                this._delegate.onEventSelectPic(file)
            }
        }
    }

    async setSpriteFrame(file:GalleryImage){
        this.resetUI();
        //@ts-ignore
        // let img: Image = await ImageUtil.createImage(file);
        // let { width, height } = this.adapter(img.width, img.height)
        // let arrayBuffer = await file.arrayBuffer()
        // let blob = new Blob([arrayBuffer], { type: "image/png" });
        // let frame = await SpriteFrameUtils.fromBlob(blob);
        let imageSize = await file.getImageSize();
        let { width, height } = this.adapter(imageSize.width, imageSize.height)
        this.imageView.node.active = true;
        this.imageView.spriteFrame = await file.getSpriteFrame();
        this.imageView.getComponent(UITransform).setContentSize(size(width,height));
        this.delBtn.active = true;
    }
    
    adapter(width: number, height: number) {
        const imageW: number = width;
        const imageH: number = height;

        let content = this.node.getChildByName("content")
        let size = content.getComponent(UITransform).contentSize
        const maxWidth: number = size.width;
        const maxHeight: number = size.height;

        const scaleW: number = imageW / maxWidth;
        const scaleH: number = imageH / maxHeight;

        let finalWidth: number = imageW / scaleW;
        let finalHeight: number = imageH / scaleW;

        const s: number = scaleH > scaleW ? scaleH : scaleW;
        finalWidth = imageW / s;
        finalHeight = imageH / s;
        return { width: Math.ceil(finalWidth), height: Math.ceil(finalHeight) }
    }


    onClickUpload(){
        this.chooseFile();
    }

    onClickDel(){
        this._delegate.onEventDelPic(this._index);
    }
}
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { SpriteFrameUtils } from 'bos/utils/SpriteFrameUtils';
import { Sprite } from 'cc';
import { ImageUtil } from 'bos/utils/ImageUtil';
import { Vec2 } from 'cc';
import { UITransform } from 'cc';
import { Size } from 'cc';
import { size } from 'cc';
import { GalleryImage } from 'platform/GalleryX';

@ccclass('SubmitImage')
export class SubmitImage extends XComponent {
    @property(Sprite)
    imageView: Sprite = null

    async updateView(index: number, file: GalleryImage) {

        let imageSize = await file.getImageSize()
        let { width, height } = this.adapter(imageSize.width, imageSize.height)
        // console.log("updateView width, height-->", width, height)
        let frame = await file.getSpriteFrame()
        this.imageView.spriteFrame = frame
        this.imageView.getComponent(UITransform).setContentSize(size(width, height))
    }

    adapter(width: number, height: number) {
        const imageW: number = width;
        const imageH: number = height;

        const maxWidth: number = 240
        const maxHeight: number = 240;

        const scaleW: number = imageW / maxWidth;
        const scaleH: number = imageH / maxHeight;

        let finalWidth: number = imageW / scaleW;
        let finalHeight: number = imageH / scaleW;

        // if (this.fit === FitMode.default) {
        //     finalWidth = imageW;
        //     finalHeight = imageH;
        // } else if (this.fit === FitMode.width) {
        //     finalWidth = imageW / scaleW;
        //     finalHeight = imageH / scaleW;
        // } else if (this.fit === FitMode.height) {
        //     finalWidth = imageW / scaleH;
        //     finalHeight = imageH / scaleH;
        // } else if (this.fit === FitMode.pad || this.fit === FitMode.auto) {
        //     const s: number = scaleH > scaleW ? scaleH : scaleW;
        //     finalWidth = imageW / s;
        //     finalHeight = imageH / s;
        // } else if (this.fit === FitMode.full) {
        //     finalWidth = maxWidth;
        //     finalHeight = maxHeight;
        // }

        const s: number = scaleH > scaleW ? scaleH : scaleW;
        finalWidth = imageW / s;
        finalHeight = imageH / s;


        return { width: Math.ceil(finalWidth), height: Math.ceil(finalHeight) }

    }

}
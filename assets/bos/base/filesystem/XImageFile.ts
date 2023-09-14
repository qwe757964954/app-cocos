import { Size, SpriteFrame } from "cc";

export interface XImageFile {
    getImageSize(): Promise<Size>
    getSpriteFrame(): Promise<SpriteFrame>
    /**
     * 如果你调用过 getSpriteFrame  并且spriteframe不再使用，需要调用此方法来释放内存。  也可以自己调用  assetManager.releaseAsset(frame)。
     * 
     * **释放后就无法再使用，界面上如果还在使用此SpriteFrame，则会显示为黑色**
     */
    destroy()
}
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Picture } from 'qsdk/exports';
@ccclass('OssImgItem')
export class OssImgItem extends XComponent {
    @property(Node)
    icon:Node = null!;

    setUrl(url:string){
        this.icon.getComponent(Picture)!.setUrl(url);
    }
}
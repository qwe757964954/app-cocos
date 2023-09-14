import { _decorator, Component, Node ,Sprite} from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { NetImageEx } from 'app/components/NetImageEx';
import {ISKU}  from 'idl/tss/hall/prizemall.v2';
@ccclass('Banner')
export class Banner extends XComponent {
    @property(Sprite)
    iconImg:Sprite = null!;

    init(sku:ISKU){
        (this.iconImg.getComponent(NetImageEx) as NetImageEx)!.setUrl(sku.showImages[0]);
    }

    start() {

    }

    update(deltaTime: number) {

    }
}
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { NetImageEx } from 'app/components/NetImageEx';
import { Log } from 'bos/exports';


@ccclass('PrizeImgCell')
export class PrizeImgCell extends XComponent {
    onLoad(): void {
        this.node.on(NetImageEx.EventType.ON_COMPLETE, this.onLoadComplete, this)
    }

    onLoadComplete(){

    }
}
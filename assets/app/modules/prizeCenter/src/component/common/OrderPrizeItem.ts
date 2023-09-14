import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Sprite } from 'cc';
import { NetImageEx } from 'app/components/NetImageEx';

@ccclass('OrderPrizeItem')
export class OrderPrizeItem extends XComponent {
    @property(Sprite)
    icon:Sprite = null!;

    setUrl(url:string){
        (this.icon.getComponent(NetImageEx) as NetImageEx)!.setUrl(url);
    }

}
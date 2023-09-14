import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Label } from 'cc';

@ccclass('OrderDataItem')
export class OrderDataItem extends XComponent {
    @property(Label)
    numLab:Label = null!;

    @property(Node)
    numNode:Node = null!;

    updateView(num:number){
        this.numNode.active = num > 0;
        this.numLab.string = num.toString();
    }

}
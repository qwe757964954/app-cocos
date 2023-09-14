import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';

@ccclass('PrizeCenterUnRead')
export class PrizeCenterUnRead extends XComponent {
    @property(Label)
    numLab:Label|null = null;

    updateView(num:number){
        this.numLab.string = `${num}`;
    }
}
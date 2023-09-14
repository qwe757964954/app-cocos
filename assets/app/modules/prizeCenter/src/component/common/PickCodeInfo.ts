import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Label } from 'cc';
//import {}

@ccclass('PickCodeInfo')
export class PickCodeInfo extends XComponent {
    @property(Label)
    tokenLab:Label = null!;

    initQR(token:string){
        this.tokenLab.string = `兑换码：${token}`;
    }
}
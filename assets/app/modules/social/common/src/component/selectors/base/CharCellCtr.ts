import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Label } from 'cc';

@ccclass('CharCellCtr')
export class CharCellCtr extends XComponent {
    @property(Label)
    textLabel: Label = null

    updateView(data: any) {
        console.log("CharCellCtr:updateView", data.char)
        this.textLabel.string = data.char
    }
}
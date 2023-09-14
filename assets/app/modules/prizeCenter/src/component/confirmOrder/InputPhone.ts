import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { EditBox } from 'cc';

@ccclass('InputPhone')
export class InputPhone extends XComponent {
    @property(EditBox)
    edit:EditBox = null!;

    get phoneNum(){
        return this.edit.string;
    }
    start() {

    }

    update(deltaTime: number) {

    }
}
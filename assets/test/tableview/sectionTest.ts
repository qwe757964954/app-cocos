import { Label } from 'cc';
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('sectionTest')
export class sectionTest extends Component {

    @property(Label)
    public lbl_name: Label = null!;

    set name(value: string) {
        this.lbl_name.string = value
    }
}



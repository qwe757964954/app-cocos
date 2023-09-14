import { eventSystem } from 'bos/exports';
import { Label } from 'cc';
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('QuickTextCell')
export class QuickTextCell extends Component {

    @property(Label)
    private label: Label = null!;
    start() {

    }

    updateView(text: string) {
        this.label.string = text
    }

    onClick() {
        eventSystem.emit("onQuickTextClick",this.label.string)
    }

}



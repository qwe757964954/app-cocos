import { Log } from 'bos/exports';
import { ToastParams } from 'bos/framework/gui/UIMgr';
import { UIOpacity } from 'cc';
import { tween } from 'cc';
import { Label } from 'cc';
import { Sprite } from 'cc';
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Toast')
export class Toast extends Component {
    @property({type: UIOpacity})
    opacity: UIOpacity;

    @property(Label)
    label: Label;

    setup(text: string, params?: ToastParams) {
        this.label.string = text

        tween(this.opacity).delay(1).to(0.3, {opacity: 0}).call(()=>{
            // Log.i("Toast.complete")
            this.node.removeFromParent()
            this.node.destroy()
        }).start()
    }
}


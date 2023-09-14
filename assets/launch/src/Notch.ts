import { Log } from 'bos/exports';
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Notch')
export class Notch extends Component {
    @property(Node)
    top: Node

    @property(Node)
    bottom: Node

    onLoad() {
        Log.d("Notch.onLoad")
    }
}


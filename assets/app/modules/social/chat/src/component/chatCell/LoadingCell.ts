import { eventSystem } from 'bos/exports';
import { _decorator, Component, Node, Tween, tween, } from 'cc';
import { Message } from 'qsdk/im/core/Message';
const { ccclass, property } = _decorator;

@ccclass('LoadingCell')
export class LoadingCell extends Component {
    @property(Node)
    loadingNode: Node = null!;

    start() {

    }

    updateView(message: Message) {
        console.log("LoadingCell:updateView11", message)
        Tween.stopAllByTarget(this.loadingNode)
        // tween(this.loadingNode).repeatForever().by(1, { angle: 360 }, { easing: 'sineOut' }).start()
        tween(this.loadingNode).by(1, { angle: 360 }, { easing: 'sineOut' }).repeatForever().start()
        eventSystem.emit("onChatLoadingShow", message)

    }
}



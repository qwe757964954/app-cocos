import XGIF from 'bos/framework/gif/XGIF';
import { _decorator, Component, Node } from 'cc';
import { Message } from 'qsdk/im/core/Message';
const { ccclass, property } = _decorator;

@ccclass('GifCell')
export class GifCell extends Component {
    message: Message;
    start() {

    }

    updateView(message: Message) {
        if (this.message && this.message.msgID == message.msgID) {
            return
        }
        this.message = message;
        let index = message.content.content.index
        let path = `social@chat/res/image/gif/file` + index + `.gif`
        this.node.addComponent(XGIF).preload(path).then(() => {
            this.node.getComponent(XGIF).play(true)
        });
    }

}



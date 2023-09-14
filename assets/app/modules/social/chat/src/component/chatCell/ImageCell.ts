import { _decorator, Component, Node } from 'cc';
import { Picture } from 'qsdk/exports';
import { Message } from 'qsdk/im/core/Message';
const { ccclass, property } = _decorator;

@ccclass('ImageCell')
export class ImageCell extends Component {

    @property(Node)
    image: Node = null!

    start() {

    }

    updateView(message: Message) {
        if (this.image) {
            this.image.getComponent(Picture)?.setUrl(message.content.url)
        }
    }
}



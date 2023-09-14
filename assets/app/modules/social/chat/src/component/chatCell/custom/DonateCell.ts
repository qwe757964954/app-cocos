import { _decorator, Component, Label, Node } from 'cc';
import { Message } from 'qsdk/im/core/Message';
const { ccclass, property } = _decorator;

@ccclass('DonateCell')
export class DonateCell extends Component {

    @property({ type: Label })
    type : Label | null = null

    start() {

    }

    updateView(message: Message) {
        if (!this.type) return
        if(!message.content.content) return
        if(!message.content.content.type) return
        this.type.string = message.content.content.type
    }

    update(deltaTime: number) {
        
    }
}



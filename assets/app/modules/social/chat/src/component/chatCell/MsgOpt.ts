import { eventSystem } from 'bos/exports';
import { Prefab } from 'cc';
import { EventTouch } from 'cc';
import { instantiate } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { Message } from 'qsdk/im/core/Message';
const { ccclass, property } = _decorator;

@ccclass('MsgOpt')
export class MsgOpt extends Component {

    private message: Message = null;
    start() {

    }

    updateView(message: Message) {
        this.message = message;
    }

    onLongPress(event: EventTouch) {
        let arg = { node: event.target, message: this.message, eventTouch: event };
        eventSystem.emit('onMessageLongPress', arg);
    }

    onClick(event: EventTouch) {
        let arg = { node: event.target, message: this.message, eventTouch: event };
        eventSystem.emit('onMessageClick', arg);
    }
}



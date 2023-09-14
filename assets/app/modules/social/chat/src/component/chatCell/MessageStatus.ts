import { _decorator, Component, Node, Sprite, UITransform } from 'cc';
import { UpdateView } from '../../../../common/src/component/UpdateView';
import { Message } from 'qsdk/im/core/Message';
import { SpriteFrame } from 'cc';
import { Size } from 'cc';
import { NodeUtil } from 'bos/exports';
const { ccclass, property } = _decorator;

@ccclass('MessageStatus')
export class MessageStatus extends Component {

    @property(SpriteFrame)
    sending: SpriteFrame = null

    @property(SpriteFrame)
    failedUnit: SpriteFrame = null

    @property(SpriteFrame)
    defaultUnit: SpriteFrame = null

    start() {

    }

    updateView(message: Message) {
        console.log("updateView", message, "MessageStatus")
        if (message.status == 0) {
            this.node.active = false
            return
        } else {
            this.node.active = true
            if (message.status == 2) {
                let sp = this.node.getComponent(Sprite)
                if (sp) {
                    sp.spriteFrame = this.failedUnit
                }
            } else {
                let sp = this.node.getComponent(Sprite)
                if (sp) {
                    sp.spriteFrame = this.sending
                }
            }
        }
        NodeUtil.setContentSize(this.node, new Size(48, 48))
    }
}



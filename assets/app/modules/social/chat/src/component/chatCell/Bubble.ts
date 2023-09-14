import { _decorator, Component, Node, SpriteFrame, Sprite } from 'cc';
// import { UpdateView } from '../../../../common/src/component/UpdateView';
import { Message } from 'qsdk/im/core/Message';
import { Label } from 'cc';
import { Color } from 'cc';
import { MessageType } from 'idl/mp/common/social.im';
import { YogaFlex } from 'bos/framework/yoga/YogaFlex';
const { ccclass, property } = _decorator;

@ccclass('Bubble')
export class Bubble extends Component {

    @property(Boolean)
    changeColor: Boolean = true

    @property(Label)
    content: Label = null!;

    @property(SpriteFrame)
    leftBgUnit: SpriteFrame = null!

    @property(SpriteFrame)
    rightBgUnit: SpriteFrame = null!

    @property(Color)
    mineColor: Color = new Color(204, 204, 204, 255)

    @property(Color)
    targetColor: Color = new Color(25, 25, 25, 255)

    start() {

    }

    updateView(message: Message) {
        // console.warn("updateView", message, "Bubble")
        this.updateLayoutDirection(message)
        if (this.content) {
            if (message.type == MessageType.Text) {
                this.content.string = message.content
            } else if (message.type == MessageType.Quote) {
                this.content.string = message.content.content
            }

        }
    }

    updateLayoutDirection(message: Message) {
        if (message.isMySelf()) {
            let sp = this.node.getComponent(Sprite)
            if (this.content) {
                this.content.color = this.targetColor
                let yoga = this.content.node.getComponent(YogaFlex)
                yoga.setMargin(36, 38, 46, 38)
            }
            if (sp && this.changeColor) {
                sp.color = this.mineColor
                sp.spriteFrame = this.rightBgUnit
            }
        } else {
            if (this.content) {
                this.content.color = this.mineColor
                let yoga = this.content.node.getComponent(YogaFlex)
                yoga.setMargin(46, 38, 36, 38)
            }

            let sp = this.node.getComponent(Sprite)
            if (sp && this.changeColor) {
                sp.color = this.targetColor
                sp.spriteFrame = this.leftBgUnit
            }
        }
    }
}



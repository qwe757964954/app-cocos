import { Log } from 'bos/exports';
import { YogaFlex } from 'bos/framework/yoga/YogaFlex';
import { _decorator, Component, Node, Enum } from 'cc';
import { Message } from 'qsdk/im/core/Message';
const { ccclass, property } = _decorator;

export enum MsgDirection {
    RTL = 1,
    LTR = 2,
};

@ccclass('LayoutDirection')
export class LayoutDirection extends Component {

    @property(Node)
    views: Node[] = []

    @property({
        type: Enum(MsgDirection),
    })
    direction: MsgDirection = MsgDirection.RTL

    start() {

    }

    updateView(message: Message) {
        let d = 0
        if (this.direction == MsgDirection.RTL) {
            if (message.isMySelf()) {
                d = 2
            } else {
                d = 1
            }
        } else {
            if (message.isMySelf()) {
                d = 1
            } else {
                d = 2
            }
        }

        this.views.forEach((view) => {
            let yogaFlex = view.getComponent(YogaFlex)
            if (yogaFlex) {
                yogaFlex.Direction = d
            }
        })
    }
}
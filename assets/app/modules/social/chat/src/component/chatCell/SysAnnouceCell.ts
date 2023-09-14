import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Message } from 'qsdk/im/core/Message';
import { YogaFlex } from 'bos/framework/yoga/YogaFlex';
import { FlexDirection, Direction } from 'bos/framework/yoga/YogaEnum';

@ccclass('SysAnnounceCell')
export class SysAnnounceCell extends XComponent {
    @property(Label)
    msg: Label = null

    @property(Node)
    views: Node[] = []

    updateView(message: Message) {
        console.log("SysAnnounceCell updateView", message)
        this.msg.string = "群公告\n" + message.sysContent.announcement.announcement

        if (message.isMySelf()) {
            this.views.forEach(view => {
                let yogaFlex = view.getComponent(YogaFlex)
                if (yogaFlex) {
                    yogaFlex.FlexDirection = FlexDirection.RowReverse
                    console.log("yogaFlex.Direction--->", Direction.RTL)
                }

            });
        }

    }

}
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { BlackListCellCtr } from './BlackListCellCtr';
import { eventSystem } from 'bos/exports';

@ccclass('BlackListCellOptCtr')
export class BlackListCellOptCtr extends XComponent {
    onClickItem(event: Event, customEventData: string) {
        let ctr = this.node.parent.getComponent(BlackListCellCtr)
        if (ctr) {
            let userID = ctr.userID

            eventSystem.emit("IM_UN_BLACKED_USER", userID)

        }

    }
}
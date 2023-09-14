import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Avatar } from 'app/modules/common/avatar/src/Avatar';

@ccclass('PromotionHead')
export class PromotionHead extends XComponent {
    @property(Avatar)
    avatarNode : Avatar

    updateView(uid: number) {
        console.debug("PromotionHead updateView", uid)
        if (uid) {
            this.avatarNode.setUserID(uid)
        }
    }
}
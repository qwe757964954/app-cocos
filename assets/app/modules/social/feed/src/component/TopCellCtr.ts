import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Label } from 'cc';
import { TopCellData } from './FeedTableview';
import { Prefab } from 'cc';
import { instantiate } from 'cc';
import { director } from 'cc';
import { eventSystem } from 'bos/exports';
import { SocialFeedEvent } from 'app/modules/social/common/src/Define';
import { Avatar } from 'app/modules/common/avatar/src/Avatar';
import { App } from 'app/App';
import { UITransform } from 'cc';

@ccclass('TopCellCtr')
export class TopCellCtr extends XComponent {

    @property(Label)
    nameLabel: Label = null;

    @property(Avatar)
    avatar: Avatar = null


    @property(Node)
    topView: Node = null

    protected start(): void {
        // this.node.setSiblingIndex(9999)

        // this.node.getComponent(UITransform).priority = 99
        // this.topView.getComponent(UITransform).priority = 99
        // this.topView.setSiblingIndex(99)
        // this.node.setSiblingIndex(99)
    }

    updateView(feedData: TopCellData) {

        App.userMgr.getUserByID(feedData.uid).finish().then((user) => {
            this.nameLabel.string = user.nickname
            this.avatar.setUserID(feedData.uid)
        })

    }

    onClickSubmitPost() {
        console.log("SocialFeedEvent.ON_SHOW_SUBMIT_POST_VIEW")
        eventSystem.emit(SocialFeedEvent.ON_SHOW_SUBMIT_POST_VIEW)
    }
}
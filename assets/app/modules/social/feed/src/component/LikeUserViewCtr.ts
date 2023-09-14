import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { FeedEntity } from 'qsdk/feed/db/Model';
import { UITransform } from 'cc';
import { Vec3 } from 'cc';
import { App } from 'app/App';

@ccclass('LikeUserViewCtr')
export class LikeUserViewCtr extends XComponent {
    @property(Label)
    likeLabel: Label = null;

    start() {

    }

    updateView(feedEntity: FeedEntity) {
        let list = feedEntity.getLikeUserIDList()
        let userNameList = []
        for (let index = 0; index < list.length; index++) {
            App.userMgr.getUserByID(list[index]).finish().then((user) => {
                userNameList.push(user.nickname)
                if (index == list.length - 1) {
                    let str: string = userNameList.join(",");
                    this.likeLabel.string = str
                }
            })
        }
        // this.likeLabel.node.setPosition(new Vec3(-375, -5, 0))
        // console.log("LikeUserViewCtrLabel", this.likeLabel.node.position, this.likeLabel.getComponent(UITransform).height)
    }

}
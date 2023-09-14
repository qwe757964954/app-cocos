import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { UITransform } from 'cc';
import { Selector, SelectorType } from 'app/modules/social/common/src/Selector';
import { SelectUserParams } from 'app/modules/social/common/src/component/selectors/select/SelectUserCtr';
import { StrongRelation } from 'qsdk/relation/StrongRelation';
import { IM } from 'qsdk/im/IM';
import { ICreateGroupReq } from 'idl/mpff/social/im.v2';
import { uiMgr } from 'bos/exports';
@ccclass('MoreViewCtr')
export class MoreViewCtr extends XComponent {
    @property(Node)
    contentNode: Node = null;

    updateView(position: Vec3) {
        let trs = this.node.getComponent(UITransform)
        let pos = trs.convertToNodeSpaceAR(position);
        console.log("MoreViewCtr-11->", pos)

        let trs2 = this.contentNode.getComponent(UITransform)
        pos.x = pos.x - trs2.width / 2 + 60
        pos.y = pos.y - trs2.height / 2 - 40

        this.contentNode.setPosition(pos)
    }

    onClickAddFriend() {
        console.log("MoreViewCtr:onClickAddFriend")
        let page = "social@contacts/res/prefab/AddFriendView"
        uiMgr.loadPage(page)
        this.onClickClose()
    }

    onClickScan() {
        console.log("MoreViewCtr:onClickScan")
        this.onClickClose()

    }

    async onClickCreateGroup() {
        console.log("MoreViewCtr:onClickCreateGroup")
        let friendList = await StrongRelation.getInstance().getFriendList()
        let userIDList = []
        for (let index = 0; index < friendList.length; index++) {
            userIDList.push(friendList[index].userID)
        }

        let params: SelectUserParams = {
            userIDList: userIDList,
            onComplete: function (userIDList: number[]): void {
                console.log("onComplete-->", userIDList)
                let name = userIDList.join(",")
                let req: ICreateGroupReq = {
                    userIDList: userIDList,
                    name: ""
                }
                IM.getInstance().createGroup(req).then(({ err, resp }) => {
                    if (!err) {
                        
                    }
                })
            }
        }
        Selector.getInstance().loadSelector(SelectorType.User, params)

        this.onClickClose()
    }

    onClickClose() {
        this.node.removeFromParent()
    }


}
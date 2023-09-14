import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { StrongRelation } from 'qsdk/relation/StrongRelation';
import { Label } from 'cc';
import { IApplyMutualFollowReq } from 'idl/mpff/social/relation.v1';
import { App } from 'app/App';
import { User } from 'app/domain/user/User';

@ccclass('SearchUserCellCtr')
export class SearchUserCellCtr extends XComponent {
    @property(Node)
    addFriend: Node = null

    @property(Label)
    statusLabel: Label = null

    @property(Label)
    commonLabel: Label = null

    @property(Label)
    nameLabel: Label = null

    private user: User = null

    async updateView(user: User) {
        this.user = user
        this.nameLabel.string = user.nickname

        let relation = await StrongRelation.getInstance().query(user.uid)
        console.log("updateView relation-->", relation)
        if (relation?.isFriend()) {
            this.addFriend.active = false
            this.commonLabel.node.active = false

            this.statusLabel.node.active = true
        } else {
            this.addFriend.active = true
            this.statusLabel.node.active = false

        }
    }

    onClickAdd() {
        let req: IApplyMutualFollowReq = {
            uid: this.user.uid
        }
        StrongRelation.getInstance().apply(req).then(({ err, resp }) => {
            if (!err) {
                this.addFriend.active = false
                this.statusLabel.node.active = true
            }
        })
    }
}
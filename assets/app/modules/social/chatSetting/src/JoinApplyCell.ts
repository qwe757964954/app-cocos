import { App } from 'app/App';
import { Avatar } from 'app/modules/common/avatar/src/Avatar';
import { _decorator, Button, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('JoinApplyCell')
export class JoinApplyCell extends Component {

    @property(Node)
    avatar: Node = null

    @property(Label)
    contentLabel: Label = null

    @property(Button)
    confirmBtn: Button = null

    start() {

    }

    async updateView(params: { userID: number, inventedUserID: number[], isAgree: boolean }) {
        if (this.avatar) {
            this.avatar.getComponent(Avatar).setUserID(params.userID)
        }
        if (this.contentLabel) {
            let user = await App.userMgr.getUserByID(params.userID).finish();
            let UserNick = user.nickname
            let inventedUserNick = ''
            for (let i = 0; i < params.inventedUserID.length; i++) {
                let user = await App.userMgr.getUserByID(params.inventedUserID[i]).finish();
                if (i == 0) {
                    inventedUserNick = user.nickname
                } else {
                    inventedUserNick = inventedUserNick + '、' + user.nickname
                }
            }
            this.contentLabel.string = UserNick + '邀请' + inventedUserNick + "进群"

        }
        if (this.confirmBtn) {
            if (params.isAgree) {
                this.confirmBtn.interactable = false
                this.confirmBtn.node.getChildByName("Label").getComponent(Label).string = "已同意"
            }
        }
    }

    clickConfirm() {
        this.confirmBtn.interactable = false
        this.confirmBtn.node.getChildByName("Label").getComponent(Label).string = "已同意"
        //将人加入群

    }
}
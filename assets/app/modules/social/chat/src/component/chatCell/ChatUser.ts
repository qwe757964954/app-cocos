import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Avatar } from 'app/modules/common/avatar/src/Avatar';
import { Message } from 'qsdk/im/core/Message';
import { Label } from 'cc';
import { IM } from 'qsdk/im/IM';
import { App } from 'app/App';

@ccclass('ChatUser')
export class ChatUser extends Component {

    @property(Label)
    nick: Label = null!;

    @property(Avatar)
    avatar: Avatar = null!;

    start() {

    }

    updateView(message: Message) {
        if (this.avatar) {
            this.avatar.setUserID(message.fromID);
        }
        this.updateNick(message);
    }

    async updateNick(message: Message) {
        if (this.nick) {
            if (message.isGroup() && message.isMySelf() == false) {
                this.nick.node.active = IM.getInstance().groupMgr.getIsShowAlias(message.groupID)
            } else {
                this.nick.node.active = false
            }

            if (this.nick.node.active == true) {
                let alias = IM.getInstance().groupMgr.getUserAlias(message.groupID, message.fromID)
                if (alias && alias != "") {
                    this.nick.string = alias
                } else {
                    let user = await App.userMgr.getUserByID(message.fromID).finish()
                    if (this.node.isValid == false) {
                        return
                    }
                    this.nick.string = user.nickname
                }
            }
        }
    }
}
import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Avatar } from 'app/modules/common/avatar/src/Avatar';
import { Message } from 'qsdk/im/core/Message';
import { IMessageCard } from 'idl/mp/common/social.im';
import { App } from 'app/App';

@ccclass('CardCell')
export class CardCell extends XComponent {
    @property(Avatar)
    avatar: Avatar = null

    @property(Label)
    uidLabel: Label = null

    @property(Label)
    nameLabel: Label = null

    updateView(message: Message) {
        let content: IMessageCard = message.content
        this.avatar.setUserID(content.userID)

        this.uidLabel.string = content.userID + ""

        App.userMgr.getUserByID(content.userID).finish().then((user) => {
            this.nameLabel.string = user.nickname
        })

    }

}
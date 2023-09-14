import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { IRelation } from 'qsdk/relation/db/Model';
import { Label } from 'cc';
import { App } from 'app/App';
import { IM } from 'qsdk/im/IM';
import { ChatType } from 'qsdk/im/config/define';
import { Decorator, eventSystem, uiMgr } from 'bos/exports';
import { Message } from 'qsdk/im/core/Message';
import { Avatar } from 'app/modules/common/avatar/src/Avatar';
import { UserChar } from 'app/modules/social/common/src/component/selectors/base/CharSideBarCtr';

@ccclass('UserCellCtr')
export class UserCellCtr extends XComponent {
    @property(Avatar)
    avatarView: Avatar = null

    @property(Label)
    nameLabel: Label = null

    public userID: number = 0
    private userChar: UserChar = null;
    updateView(userChar: UserChar) {
        console.log("UserCellCtr:updateView-->", userChar.user, userChar.char)

        this.userChar = userChar
        if (userChar) {
            this.avatarView.setUserID(userChar.user.uid)
            this.userID = userChar.user.uid
            this.nameLabel.string = userChar.user.nickname

        }
        console.log("UserCellCtr:updateView")
    }

    @Decorator.OnNodeEvent("cellClick")
    public onCellClick() {
        console.log("onClickCell")
        let message = new Message()
        message.fromID = IM.getInstance().myUid
        message.toID = this.userChar.user.uid
        message.chatType = ChatType.Single

        let session = IM.getInstance().processor.addTempSession(message)

        if (session) {
            uiMgr.loadPage("social@chat/res/prefab/ChatView", { params: { sessionID: session.sessionID } })
        }

    }
 

}
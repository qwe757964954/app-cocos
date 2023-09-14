import { _decorator, Component, Node } from 'cc';
import { Message } from 'qsdk/im/core/Message';
import { Label } from 'cc';
import { Log, TimeUtil } from 'bos/exports';
import UserMgr from 'app/domain/user/UserMgr';
import { App } from 'app/App';
const { ccclass, property } = _decorator;

@ccclass('RevokedCell')
export class RevokedCell extends Component {

    @property(Label)
    text: Label = null!;
    start() {

    }

    updateView(message: Message) {
        if (this.text == null) {
            return
        }
        if (message.isMySelf()) {
            this.text.string = "你撤回了一条消息"
        } else {
            App.userMgr.getUserByID(message.otherID()).finish().then((user) => {
                if (user) {
                    this.text.string = `${user.nickname}撤回了一条消息`
                }
            })
        }
    }

}



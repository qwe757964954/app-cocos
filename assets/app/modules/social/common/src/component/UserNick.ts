import { App } from 'app/App';
import { _decorator, Component, instantiate, Node, Prefab,Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UserNick')
export class UserNick extends Component {

    userID: number = 0;

    async setUserID(userID: number) {
        this.userID = userID;
        let user = await App.userMgr.getUserByID(userID).finish();
        if (this.node.isValid && user && user.uid == this.userID) {
            let label = this.node.getComponent(Label)
            if (label) {
                label.string = user.nickname;
            }
        }
    }
}
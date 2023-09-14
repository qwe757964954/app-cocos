import { App } from 'app/App';
import { SpriteFrame } from 'cc';
import { Sprite } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { Picture } from 'qsdk/exports';
import { IM } from 'qsdk/im/IM';
const { ccclass, property } = _decorator;

@ccclass('Group')
export class Group extends Component {


    @property(Node)
    content: Node = null!;

    private defaultUnit: SpriteFrame = null!;
    start() {

    }

    setDefaultUnit(defaultUnit: SpriteFrame) {
        this.defaultUnit = defaultUnit
    }

    async setSessionID(sessionID: string) {
        let session = IM.getInstance().getSession(sessionID);
        if (session) {
            let message = session.message
            if (message && message.isGroup()) {
                let children = this.content.children;
                let groupUserList = await IM.getInstance().listGroupUser(message.groupID);
                for (let index = 0; index < 4; index++) {
                    const element = groupUserList[index];
                    let child = children[index];
                    if (child) {
                        child.active = true
                        let sp = child.getComponent(Sprite)
                        if (sp) {
                            sp.spriteFrame = this.defaultUnit
                        }
                        let pic = child.getComponent(Picture)

                        if (element == null) {
                            child.active = false
                        }else if (pic && element) {
                            pic.failedSprite = this.defaultUnit
                            App.userMgr.getUserByID(element.userID).finish().then((user) => {
                                if (user && user.avatar) {
                                    pic.setUrl(user.avatar)
                                }
                            })
                        }
                    }
                }

            }
        }
    }
}



import { _decorator, Label, Node, Vec2, Vec3, Sprite, Color } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Session } from 'qsdk/im/core/Session';
import { Message } from 'qsdk/im/core/Message';
import { Decorator, uiMgr } from 'bos/exports';
import { Avatar } from 'app/modules/common/avatar/src/Avatar';
import { ChatUtil } from 'app/modules/social/chat/src/component/ChatUtil';

@ccclass('SessionCell')
export class SessionCell extends XComponent {

    @property(Label)
    content: Label = null!;

    @property(Label)
    time: Label = null!;

    @property(Label)
    nick: Label = null!;

    @property(Avatar)
    avatar: Avatar = null!;

    @property(Node)
    dndNode: Node = null!;

    session: Session = null!;

    downPos: Vec2 = new Vec2(0, 0)
    cellStartPos: Vec3 = new Vec3(0, 0, 0)



    updateView(session: Session, index?: number) {
        console.log("sessionCell:updateView", index, session)

        this.node.position = new Vec3(0, this.node.position.y, 0)
        this.session = session;
        // this.uName.string = data.uName
        this.updateSessionName(session);
        this.processTime(session.message.createdAt);
        this.updateColor(session);
        this.updateContent(session.message);
        if (this.avatar) {
            this.avatar.setSessionID(session.sessionID);
        }

        this.dndNode.active = this.session.isDND

    }

    async updateSessionName(session: Session) {
        if (this.nick) {
            //存在群备注，显示群备注
            if (this.session.extra && this.session.extra.groupMark) {
                this.nick.string = this.session.extra.groupMark
                return;
            }
            let name = session.name
            if (name && name != "") {
                this.nick.string = name
            } else {
                let name = await session.getTempName()
                if (this.node.isValid) {
                    this.nick.string = name
                }
            }
        }
    }

    updateColor(session: Session) {
        let sp = this.node.getComponent(Sprite)
        if (sp) {
            if (session.topRank > 0) {
                sp.color = new Color(32, 32, 32)
            } else {
                sp.color = new Color(25, 25, 25)
            }
        }

    }


    public async updateContent(message: Message) {
        if (message == null) {
            return;
        }

        let text = await ChatUtil.getMessageShortText(message)

        if (this.content && this.content.isValid) {
            this.content.string = text;
        }

    }




    @Decorator.OnNodeEvent("cellClick")
    public onCellClick() {
        uiMgr.loadPage("social@chat/res/prefab/ChatView", { params: { sessionID: this.session.sessionID } })

    }

    public processTime(time: number): void {
        const createTime: Date = new Date(time * 1000); // convert seconds to milliseconds
        const currentTime: Date = new Date();

        if (
            createTime.getFullYear() === currentTime.getFullYear() &&
            createTime.getMonth() === currentTime.getMonth() &&
            createTime.getDate() === currentTime.getDate()
        ) {
            this.time.string = `${createTime.getHours().toString().padStart(2, "0")}:${createTime.getMinutes().toString().padStart(2, "0")}`;
        } else if (
            createTime.getFullYear() === currentTime.getFullYear() &&
            createTime.getMonth() === currentTime.getMonth() &&
            createTime.getDate() - currentTime.getDate() === -1
        ) {
            this.time.string == "昨天";
        } else {
            this.time.string = `${createTime.getFullYear().toString().padStart(2, "0")}/${(createTime.getMonth() + 1).toString().padStart(2, "0")}/${createTime.getDate().toString().padStart(2, "0")}`
        }
    }
}
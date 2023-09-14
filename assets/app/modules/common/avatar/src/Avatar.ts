import { App } from 'app/App';
import { SpriteFrame } from 'cc';
import { Sprite } from 'cc';
import { instantiate } from 'cc';
import { Prefab } from 'cc';
import { Widget } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { Picture } from 'qsdk/exports';
import { IM } from 'qsdk/im/IM';
import { Group } from './Group';
import { RingyBar } from './RingyBar';
import { uiMgr } from 'bos/exports';
import { User } from 'app/domain/user/User';
const { ccclass, property } = _decorator;

@ccclass('Avatar')
export class Avatar extends Component {
    @property(Node)
    public bg: Node = null!;

    @property(Node)
    public mask: Node = null!;

    @property(Node)
    public image: Node = null!;

    @property(RingyBar)
    public ringyBar: RingyBar = null!;

    @property(SpriteFrame)
    public defaultUnit: SpriteFrame = null!;

    @property(SpriteFrame)
    public failedUnit: SpriteFrame = null!;

    @property(Prefab)
    public groupPrefab: Prefab = null!;

    @property(Prefab)
    public userInfo: Prefab = null!;

    private groupNode: Node = null!;
    private user: User = null!;

    start() {

    }

    private setAvatar(url: string) {
        if (this.image) {
            this.image.active = true;
            let picture = this.image.getComponent(Picture);
            if (picture) {
                picture.failedSprite = this.failedUnit
                picture.setUrl(url);
            }
        }
    }

    async setUserID(uid: number) {
        this.showGroup(false);
        let user = await App.userMgr.getUserByID(uid).finish();
        this.user = user;
        // console.log('setUserID', uid, user);
        if (user.avatar) {
            this.setAvatar(user.avatar);
        }

    }

    setSessionID(sessionID: string) {
        let session = IM.getInstance().getSession(sessionID);
        // console.log('setSessionID', sessionID, session);
        if (session) {
            let message = session.message;
            if (message) {
                if (message.isSingle()) {
                    this.setUserID(message.otherID());
                } else if (message.isGroup()) {
                    if (this.groupNode == null) {
                        this.groupNode = instantiate(this.groupPrefab);
                        this.node.addChild(this.groupNode);
                        this.groupNode.getComponent(Group).setDefaultUnit(this.defaultUnit);
                        // this.groupNode = new Node()
                        // this.node.addChild(this.groupNode);
                        // let widget = this.groupNode.addComponent(Widget);
                        // widget.isAlignTop = true;
                        // widget.left = 0;
                        // widget.top = 0;
                        // widget.right = 0;
                        // widget.bottom = 0;
                        // let sp = this.groupNode.addComponent(Sprite);
                        // // sp.spriteFrame = "default_sprite_splash.png";
                        // // let sf = new SpriteFrame();
                        // // sf.texture =
                        // // sp.spriteFrame = this.defaultUnit;
                    }
                    this.showGroup(true);
                    this.groupNode.getComponent(Group).setSessionID(sessionID);
                }
            }
        }
    }

    onClick() {
        if (this.userInfo == null || this.user == null) {
            return;
        }
        uiMgr.pushPopup(this.userInfo, { params: { user: this.user } });
        console.log('onClick');
    }

    private showGroup(isShow: boolean) {
        if (this.groupNode) {
            this.groupNode.active = isShow;
        }
        if (this.bg) {
            this.bg.active = !isShow;
        }
    }

    //hexColor：进度条颜色   secondInfo：可选，倒计时到达某一限值后，变换颜色
    setRingyColor(hexColor: string, secondInfo?: { color: string, time: number }) {
        this.ringyBar.setColor(hexColor, secondInfo);
    }

    //设置倒计时起始值
    setRingyStart(time: number) {
        this.ringyBar.setStartTime(time);
    }

    //结束环形进度条
    setRingyEnd() {
        this.ringyBar.setEnd();
    }
}



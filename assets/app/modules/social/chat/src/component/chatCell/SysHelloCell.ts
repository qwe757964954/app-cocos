import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Message } from 'qsdk/im/core/Message';
import { Label } from 'cc';
import { App } from 'app/App';
import { Avatar } from 'app/modules/common/avatar/src/Avatar';
import { view } from 'cc';
import { SpriteFrame } from 'cc';
import { Color } from 'cc';
import { Sprite } from 'cc';
import { YogaFlex } from 'bos/framework/yoga/YogaFlex';
import { Direction, FlexDirection } from 'bos/framework/yoga/YogaEnum';

@ccclass('SysHelloCell')
export class SysHelloCell extends XComponent {
    @property(Label)
    desc1: Label = null
    @property(Label)
    desc2: Label = null

    @property(Label)
    msg1: Label = null
    @property(Label)
    msg2: Label = null

    @property(Avatar)
    avatar1: Avatar = null
    @property(Avatar)
    avatar2: Avatar = null

    @property(Node)
    contentView1: Node = null

    @property(Node)
    contentView2: Node = null


    @property(Node)
    views: Node[] = []

    @property(SpriteFrame)
    rightBgUnit: SpriteFrame = null!

    @property(Sprite)
    bubble1: Sprite = null

    updateView(message: Message) {

        this.desc1.string = "以上是打招呼的内容"

        if (message.isMySelf()) {
            console.log("isMyself1111111")
            this.contentView2.active = false
            App.userMgr.getUserByID(message.toID).finish().then((user) => {

                this.avatar1.setUserID(message.toID)

                this.msg1.string = "我是" + user.nickname

                this.desc2.node.active = true
                this.desc2.string = "你已经添加了" + user.nickname + ",现在可以开始聊天了"
            })


        } else {
            console.log("isMyself22222222")

            this.views.forEach(view => {
                let yogaFlex = view.getComponent(YogaFlex)
                if (yogaFlex) {
                    yogaFlex.FlexDirection = FlexDirection.RowReverse
                    console.log("yogaFlex.Direction--->", Direction.RTL)
                }

            });

            this.contentView2.active = true
            this.avatar1.setUserID(message.toID)

            this.avatar2.setUserID(message.fromID)

            this.desc2.node.active = false

            App.userMgr.getUserByID(message.toID).finish().then((user) => {
                this.msg1.string = "我是" + user.nickname
                this.msg1.color = new Color("#191919")
            })

            this.msg2.string = "我通过了你的好友验证请求，现在我们可以开始聊天了"


            this.bubble1.spriteFrame = this.rightBgUnit
            this.bubble1.color = new Color("#CCCCCC")
        }


    }
}
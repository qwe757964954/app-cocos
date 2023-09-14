import { eventSystem } from 'bos/exports';
import { BundleSprite } from 'bos/framework/component/BundleSprite';
import { YogaFlex } from 'bos/framework/yoga/YogaFlex';
import { Button, EventTouch, UITransform } from 'cc';
import { Sprite } from 'cc';
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EmojiCell')
export class EmojiCell extends Component {

    @property(Node)
    emojiPage: Node = null!

    emojiList: Node[] = []

    start() {
        this.loadEmoji()
    }

    //加载表情
    loadEmoji() {
        for (let i = 1; i < 50; i++) {
            let emoji = this.createEmoji(i)
            emoji.addComponent(YogaFlex).setMargin(21, 21, 6.5, 6.5)
            const buttonHandler = new Button.EventHandler()
            buttonHandler.target = this.node
            buttonHandler.component = 'EmojiCell'
            buttonHandler.customEventData = i as unknown as string
            buttonHandler.handler = 'onEmojiClick'
            emoji.addComponent(Button).clickEvents.push(buttonHandler);
            this.emojiList.push(emoji);
        }
        this.addEmoji()
    }


    createEmoji(i: number) {
        let sp = new Node()
        sp.addComponent(UITransform).setContentSize(112, 112)
        let bs = sp.addComponent(BundleSprite)
        sp.getComponent(Sprite).sizeMode = Sprite.SizeMode.CUSTOM
        bs.spriteFrame = "social@chat/res/image/emoji/file" + i
        sp.name = 'emoji_' + i;
        return sp
    }

    //添加表情
    addEmoji() {
        let emoji = this.emojiList
        for (let i = 0; i < emoji.length; i++) {
            this.emojiPage.insertChild(emoji[i], i)
        }
    }

    onEmojiClick(event: EventTouch, customEventData: string) {
        eventSystem.emit("onEmojiClick", customEventData)
    }

    //点击删除
    clickDelete() {
        eventSystem.emit("onDeleteClick")

    }

    //点击发送
    clickSend() {
        eventSystem.emit("onSendClick")
    }
}



import { eventSystem, resLoader } from 'bos/exports';
import XGIF from 'bos/framework/gif/XGIF';
import { YogaFlex } from 'bos/framework/yoga/YogaFlex';
import { Button, EventTouch, Sprite, UITransform } from 'cc';
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GIFCell')
export class GIFCell extends Component {

    @property(Node)
    gifContent: Node = null!

    gifList: Node[] = []

    start() {
        this.loadExpression()
    }

    //加载表情
    loadExpression() {
        for (let i = 1; i < 22; i++) {
            let gif = this.createGIF(i)
            console.log("gif", gif)
            gif.addComponent(YogaFlex).setMargin(5, 5, 20, 20)
            const buttonHandler = new Button.EventHandler()
            buttonHandler.target = this.node
            buttonHandler.component = 'GIFCell'
            buttonHandler.customEventData = i as unknown as string
            buttonHandler.handler = 'onGIFClick'
            gif.addComponent(Button).clickEvents.push(buttonHandler);
            this.gifList.push(gif);
        }

        this.addGIF()

    }

    createGIF(i: number) {
        let sp = new Node()
        sp.addComponent(UITransform).setContentSize(200, 200)
        let path = "social@chat/res/image/gif/file" + i + ".gif"
        sp.addComponent(XGIF).preload(path).then(() => {
            sp.getComponent(XGIF).play(true)
        });
        sp.name = 'gif_' + i;
        return sp
    }

    onGIFClick(event: EventTouch, customEventData: string) {
        eventSystem.emit("onGIFClick", customEventData)
    }


    //添加表情
    addGIF() {
        let emoji = this.gifList
        for (let i = 0; i < emoji.length; i++) {
            this.gifContent.insertChild(emoji[i], i)
        }
    }
}



import { Log } from 'bos/exports';
import { _decorator, Component, EventTouch, Node, ScrollView, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MailCellScrollButton')
export class MailCellScrollButton extends Component {

    @property(ScrollView)
    public scrollView: ScrollView = null!;
    private downPos: Vec2 = new Vec2(0, 0);
    protected onEnable(): void {
        this.node.on(Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.on(Node.EventType.TOUCH_END, this.touchEnd, this);
    }

    protected onDisable(): void {
        this.node.on(Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.on(Node.EventType.TOUCH_END, this.touchEnd, this);
    }

    touchStart(event: EventTouch) {
        this.downPos = event.getUIStartLocation().clone();
    }
    touchEnd(event: EventTouch) {
        let isClick = true;
        let pos = event.getUILocation().subtract(this.downPos);
        if (Math.abs(pos.y) > 5) {
            isClick = false;
        }
        if (Math.abs(pos.x) > 5) {
            isClick = false;
        }
        if (isClick) {
            this.node.emit("MailCellClick", this.node);
        }
    }
}



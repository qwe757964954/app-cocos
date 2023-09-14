import { EventTouch } from 'cc';
import { Vec3 } from 'cc';
import { ScrollView } from 'cc';
import { tween } from 'cc';
import { Vec2 } from 'cc';
import { Label } from 'cc';
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ItemTest')
export class ItemTest extends Component {

    @property(Label)
    public lbl_name: Label = null!;

    set name(value: string) {
        this.lbl_name.string = value
    }

    tableView: Node = null!;

    setTableView(node: Node) {
        this.tableView = node
    }

    downPos: Vec2 = new Vec2(0, 0)
    cellStartPos: Vec3 = new Vec3(0, 0, 0)
    canMove: boolean = false

    start() {
        this.node.on(Node.EventType.TOUCH_START, this.touchStart, this, true);
        this.node.on(Node.EventType.TOUCH_MOVE, this.touchMove2, this,true);
        this.node.on(Node.EventType.TOUCH_END, this.touchEnd, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.touchCancel, this);
    }

    touchStart(event: EventTouch) {
        this.downPos = event.getUIStartLocation().clone()
        this.cellStartPos = this.node.position.clone()
        this.canMove = false
        if (this.tableView && this.tableView["lastShowBtnCell"]) {
            this.resetNodePos(this.tableView["lastShowBtnCell"])
            this.tableView["lastShowBtnCell"] = null
        }
    }

    touchMove2(event: EventTouch) {
        if (event.getDeltaY() == 0) {
            this.canMove = true
        }
        if (this.canMove) {
            let pos = event.getUILocation().subtract(this.downPos)
            let mov = new Vec3(this.cellStartPos.x + pos.x, this.cellStartPos.y, 0)
            if (Math.abs(pos.x) > 5) {
                this.tableView.getComponent(ScrollView)!.enabled = false
            }
            if (mov.x > 0) {
                mov.x = 0
            }
            this.node.position = mov
        }

        // this.node.position = this.cellStartPos.add(new Vec3(pos.x,0,0))
        // this.node.position = this.node.position.add(new math.Vec3(event.getDeltaX(),0,0))
        // event.propagationStopped = true;
        // event.propagationImmediateStopped = true;
    }

    touchEnd() {
        this.canMove = false
        this.tableView.getComponent(ScrollView)!.enabled = true
        if (this.node.position.x < -50) {
            tween(this.node).to(0.2, { position: new Vec3(-200, this.node.position.y, 0) }).start()
            this.tableView["lastShowBtnCell"] = this.node
        } else {
            this.resetNodePos(this.node)
        }
    }

    resetNodePos(node) {
        tween(node).to(0.15, { position: new Vec3(0, node.position.y, 0) }).start()
    }

    touchCancel(node) {
        this.canMove = false
        this.tableView.getComponent(ScrollView)!.enabled = true
        this.resetNodePos(this.node)
        // console.log("aaaa1", node)
        // if (this.node.position.x < -100) {
        //     tween(this.node).to(0.2, { position: new Vec3(-400, 0, 0) }).start()
        // }
    }

}



import { NodeUtil, TouchUtil } from 'bos/exports';
import { EventTouch, NodeEventType } from 'cc';
import { Vec3 } from 'cc';
import { ScrollView } from 'cc';
import { Size } from 'cc';
import { UITransform } from 'cc';
import { UI } from 'cc';
import { instantiate } from 'cc';
import { Prefab } from 'cc';
import { tween } from 'cc';
import { Vec2 } from 'cc';
import { Label } from 'cc';
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CellButtons')
export class CellButtons extends Component {


    @property(Prefab)
    public btnPrefab: Prefab = null!;


    @property(Number)
    public moveOffset: number = -100;

    private scrollView: Node = null!;
    isLock: boolean;

    setScrollView(node: Node) {
        this.scrollView = node
    }
    get isShowing() {
        if (this.isMoveBack == true) {
            return true
        }
        return this.isShow
    }

    private downPos: Vec2 = new Vec2(0, 0)
    private cellStartPos: Vec3 = new Vec3(0, 0, 0)
    private canMove: boolean = false
    private isMoveBack = false
    private isShow = false
    private btnCellNode = null
    private isCancel = false

    protected onEnable(): void {
        // this.node.on(Node.EventType.TOUCH_START, this.touchStart3, this);
        this.node.position = new Vec3(0, this.node.position.y, 0)
        this.node.on(Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.node.on(Node.EventType.TOUCH_END, this.touchEnd, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.touchCancel, this);

        // if (this.scrollView && this.scrollView['test_'] == null) {
        //     this.scrollView.on(Node.EventType.TOUCH_START, this.touchStart2, this,true);
        //     this.scrollView['test_'] = true
        // }

    }
    // touchStart2(event: EventTouch) {
    //     console.log("touchStart2",event.bubbles,event)
    // }

    // touchStart3(event: EventTouch) {
    //     console.warn("touchStart3",event.bubbles,event)
    // }


    protected onDisable(): void {
        this.node.on(Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.node.on(Node.EventType.TOUCH_END, this.touchEnd, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.touchCancel, this);
        this.node.position = new Vec3(0, this.node.position.y, 0)

    }

    touchStart(event: EventTouch) {
        // console.log(event)
        this.isLock = false
        // console.warn("touchStart",event.bubbles,event)
        this.downPos = event.getUIStartLocation().clone()
        this.cellStartPos = this.node.position.clone()
        this.canMove = false
        this.isMoveBack = false
        this.isCancel = false
        if (this.scrollView && this.scrollView["lastShowBtnCell"]) {
            let moveBackNode = this.scrollView["lastShowBtnCell"]
            if (moveBackNode == this.node) {
                this.isMoveBack = true
            }
            let cellCom = moveBackNode.getComponent(CellButtons)
            if (cellCom) {
                this.resetNodePos(moveBackNode, cellCom.btnCellNode)
            }
            this.scrollView["lastShowBtnCell"] = null
        }
        if (this.btnCellNode == null && this.btnPrefab) {
            let btn = instantiate(this.btnPrefab)
            this.node.addChild(btn)
            this.btnCellNode = btn
            NodeUtil.sendMessage(this.btnCellNode, "updateView", this.node)

            let size = NodeUtil.getContentSize(this.node)
            let anchorX = this.node.getComponent(UITransform).anchorX
            let height = NodeUtil.getContentSize(this.node).height
            NodeUtil.setContentSize(btn, new Size(size.width, height))
            btn.setPosition(new Vec3(size.width * 1, 0, 0))
        } else {
            this.btnCellNode.active = true
            NodeUtil.sendMessage(this.btnCellNode, "updateView", this.node)
        }

    }

    touchMove(event: EventTouch) {
        // event.propagationImmediateStopped = true
        // event.propagationStopped = true
        if (this.isCancel) {
            return
        }
        if (this.isMoveBack == true) {
            return
        }
        if (event.getDeltaY() == 0) {
            this.canMove = true
        }
        if (this.canMove) {
            this.isShow = true
            let pos = event.getUILocation().subtract(this.downPos)
            let mov = new Vec3(this.cellStartPos.x + pos.x, this.cellStartPos.y, 0)
            if (Math.abs(pos.x) > 5 && Math.abs(pos.y) <= 5) {
                // this.lockTouch()
                TouchUtil.lock(event)
                event.propagationStopped = true
                this.isLock = true
            }
            if (this.isLock) {
                // event.propagationStopped = true
                if (mov.x > 0) {
                    mov.x = 0
                }
                if (this.btnCellNode) {
                    let size = NodeUtil.getContentSize(this.btnCellNode)
                    if (mov.x < size.width * -1) {
                        mov.x = size.width * -1
                    }
                    NodeUtil.sendMessage(this.btnCellNode, "followMove", mov.x)
                }
                this.node.position = mov
            }

        }
    }

    touchEnd(event: EventTouch) {
        let isClick = false
        if (this.isLock == false) {
            isClick = true
        }
        if (this.isCancel) {
            isClick = false
        }
        let pos = event.getUILocation().subtract(this.downPos)
        if (Math.abs(pos.y) > 5) {
            isClick = false
        }

        this.canMove = false
        // this.unLockTouch()
        if (this.isMoveBack) {
            return
        }

        if (this.node.position.x < this.moveOffset) {
            let defaultPosX = this.moveOffset * 2
            if (this.btnCellNode) {
                defaultPosX = NodeUtil.getContentSize(this.btnCellNode).width * -1
            }
            let startX = this.node.position.x
            tween(this.node).to(0.2, {}, {
                onUpdate: (target, ratio) => {
                    let t = startX + (defaultPosX - startX) * ratio
                    NodeUtil.sendMessage(this.btnCellNode, "followMove", t)
                    this.node.position = new Vec3(t, this.node.position.y, 0)
                },
            }).start()

            if (this.scrollView) {
                this.scrollView["lastShowBtnCell"] = this.node
            }
        } else {
            this.resetNodePos(this.node, this.btnCellNode)
        }
        if (isClick == true) {
            this.node.emit("cellClick", this.node)
        }
        this.isLock = false
    }

    resetNodePos(node: Node, hideNode?: Node) {
        if (node.position.x != 0) {
            tween(node).to(0.15, { position: new Vec3(0, node.position.y, 0) }).call(() => {
                if (hideNode) {
                    hideNode.active = true
                }
                node.getComponent(CellButtons).isShow = false
            }).start()
        }
    }

    touchCancel(event: EventTouch) {
        this.isCancel = true
        console.warn("touchCancel",event)
        if (event.target == this.node) {
            this.touchEnd(event)
        }
    }

    // lockTouch() {
    //     if (this.scrollView) {
    //         this.scrollView.getComponent(ScrollView)!.enabled = false
    //     }
    // }

    // unLockTouch() {
    //     if (this.scrollView) {
    //         this.scrollView.getComponent(ScrollView)!.enabled = true
    //     }
    // }

    // isLock() {
    //     if (this.scrollView) {
    //         return this.scrollView.getComponent(ScrollView)!.enabled == false
    //     }
    //     return false
    // }

}



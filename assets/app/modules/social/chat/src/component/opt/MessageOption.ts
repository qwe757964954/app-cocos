import { TimeUtil, eventSystem, uiMgr } from 'bos/exports';
import { Prefab, ScrollView } from 'cc';
import { UITransform } from 'cc';
import { Vec3 } from 'cc';
import { Layout } from 'cc';
import { EventTouch } from 'cc';
import { instantiate } from 'cc';
import { _decorator, Component, Node, view } from 'cc';
import { IM } from 'qsdk/im/IM';
import { MessageType } from 'qsdk/im/config/define';
import { Message } from 'qsdk/im/core/Message';
const { ccclass, property } = _decorator;

const COPY = 1
const QUOTE = 2
const REVOKE = 3
const RESEND = 4
const FORWARD = 5
const DELETE = 6

const ItemConfig = {
    [MessageType.Text]: [QUOTE, REVOKE, RESEND, FORWARD, DELETE],
    [MessageType.Image]: [COPY, QUOTE, REVOKE, RESEND, FORWARD, DELETE],
}

@ccclass('MessageOption')
export class MessageOption extends Component {


    private message: Message = null;

    @property(Node)
    content: Node = null;

    @property(Node)
    layout: Node = null;

    @property(Node)
    triangle: Node = null;


    bottomView: Node = null!

    chatTableView: Node = null!

    setBottomView(node: Node) {
        this.bottomView = node
    }

    setChatTableView(chatTableView: Node) {
        this.chatTableView = chatTableView
    }

    start() {
        if (this.chatTableView) {
            this.chatTableView.getComponent(ScrollView)!.enabled = false
        }
    }

    protected onEnable(): void {
        this.node.on(Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.on(Node.EventType.TOUCH_END, this.touchEnd, this);

        if (this.chatTableView) {
            this.chatTableView.getComponent(ScrollView)!.enabled = false
        }
    }

    protected onDisable(): void {
        this.node.off(Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.off(Node.EventType.TOUCH_END, this.touchEnd, this);
        if (this.chatTableView) {
            this.chatTableView.getComponent(ScrollView)!.enabled = true
        }
    }

    touchStart(event: EventTouch) {
        event.propagationImmediateStopped = true
        event.propagationStopped = true
    }

    touchEnd() {
        console.warn('updateView', "touchEnd");
        if (this.content) {
            this.node.active = false
        }
    }

    onCopy() {

    }

    onDelete() {
        eventSystem.emit('onChatMessageDelete', this.message)
        this.node.active = false
    }

    onQuote() {
        eventSystem.emit('onMessageQuote', this.message)
        this.node.active = false
    }

    onResend() {

    }

    onForward() {
        uiMgr.showToast('待开发')
    }

    onRevoked() {
        IM.getInstance().revokedMessage(this.message)
        this.node.active = false
    }



    updateView(data: { node: Node, message: Message, eventTouch: EventTouch }) {
        this.message = data.message;
        this.updateItemList(data.message)
        this.updatePos(data.node)
    }

    updateItemList(message: Message) {
        let list = ItemConfig[message.type]
        if (list) {
            let children = this.layout.children
            children.forEach((node, index) => {
                let item = -1
                list.forEach((i: number) => {
                    if (i == index + 1) {
                        item = i
                    }
                })
                if (item == RESEND) {
                    if (message.status == 0) {
                        item = -1
                    }
                }
                if (item == REVOKE) {
                    let time = TimeUtil.getTime()
                    if (time - message.createdAt > 2 * 60) {
                        item = -1
                    }
                }
                if (item > 0) {
                    node.active = true
                } else {
                    node.active = false
                }
            })
            console.warn('children', children);
        }
    }

    updatePos(node: Node) {
        this.layout.getComponent(Layout).updateLayout()
        let transform = node.getComponent(UITransform)
        let nodeSize = transform.contentSize

        if (this.message.isMySelf()) {
            transform.anchorX = 0.85
            this.content.getComponent(UITransform).setAnchorPoint(0.85, 1)
        } else {
            transform.anchorX = 0.15
            this.content.getComponent(UITransform).setAnchorPoint(0.15, 1)
        }
        let contentSize = this.content.getComponent(UITransform).contentSize
        let nodeWorldPos = new Vec3()
        transform.convertToWorldSpaceAR(new Vec3(0, 0, 0), nodeWorldPos)
        let bottomSize = this.bottomView.getComponent(UITransform).contentSize

        console.warn('dir', bottomSize, nodeWorldPos, contentSize, nodeSize);

        let miniHeight = bottomSize.height + contentSize.height + nodeSize.height + 40

        // 小于最小高度，在上方显示
        if (nodeWorldPos.y < miniHeight) {

            let trianglePos = new Vec3()
            this.triangle.parent.getComponent(UITransform).convertToNodeSpaceAR(nodeWorldPos, trianglePos)

            trianglePos.add(new Vec3(0, 10, 0))
            this.triangle.setPosition(trianglePos.x, trianglePos.y, 0)
            this.triangle.setScale(1, -1, 1)

            let contentPos = this.content.getPosition()
            let triangleWorldPos = new Vec3()
            this.triangle.getComponent(UITransform).convertToWorldSpaceAR(new Vec3(0, 0, 0), triangleWorldPos)
            triangleWorldPos.add(new Vec3(0, contentSize.height, 0))
            this.content.parent.getComponent(UITransform).convertToNodeSpaceAR(triangleWorldPos, contentPos)
            this.content.setPosition(contentPos.x, contentPos.y + 8, 0)

            console.warn('worldPos', nodeWorldPos, trianglePos, view.getVisibleSize(), this.layout.getComponent(UITransform).contentSize, contentPos);
        } else {
            // 在下方显示
            let trianglePos = new Vec3()
            this.triangle.parent.getComponent(UITransform).convertToNodeSpaceAR(nodeWorldPos, trianglePos)
            this.triangle.setScale(1, 1, 1)

            trianglePos.add(new Vec3(0, -10 - nodeSize.height, 0))
            this.triangle.setPosition(trianglePos.x, trianglePos.y, 0)

            let contentPos = this.content.getPosition()
            let triangleWorldPos = new Vec3()
            this.triangle.getComponent(UITransform).convertToWorldSpaceAR(new Vec3(0, 0, 0), triangleWorldPos)
            this.content.parent.getComponent(UITransform).convertToNodeSpaceAR(triangleWorldPos, contentPos)
            this.content.setPosition(contentPos.x, contentPos.y - 8, 0)

            console.warn('worldPos', nodeWorldPos, trianglePos, view.getVisibleSize(), this.layout.getComponent(UITransform).contentSize, contentPos);
        }

    }

}
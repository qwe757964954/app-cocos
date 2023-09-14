import { _decorator, Component, Node, NodeEventType, EventTouch, Vec2, Vec3, view, UIOpacity, tween, Tween, UITransform } from 'cc';
import { Picture } from 'qsdk/exports';
import { PhotoSource } from '../../../../../domain/photo/PhotoSource';
import { TouchUtil, uiMgr } from 'bos/exports';
const { ccclass, property } = _decorator;


const _tempVec2 = new Vec2();
const _tempVec2_1 = new Vec2();
const _tempVec3_s = new Vec3();
const _tempPosVec3 = new Vec3();

@ccclass('PhotoDrag')
export class PhotoDrag extends Component {

    @property(Number)
    distanceY: number = 200;

    private orgPos: Vec3 = new Vec3(0, 0)
    isMoveEnable: boolean;
    isDragPage: boolean;
    targetNode: Node;
    isMovingToTarget: boolean = false;

    updateView(ps: PhotoSource, targetNode: Node) {
        this.targetNode = targetNode;
    }


    protected onEnable(): void {
        this.node.on(NodeEventType.TOUCH_START, this.onTouchStart, this)
        this.node.on(NodeEventType.TOUCH_MOVE, this.onTouchMove, this)
        this.node.on(NodeEventType.TOUCH_END, this.onTouchEnd, this)
        this.node.on(NodeEventType.TOUCH_CANCEL, this.onTouchCanceled, this)
    }

    private onTouchStart(touch: EventTouch) {
        this.orgPos = this.node.position.clone()
        this.isMoveEnable = false
        this.isDragPage = false
    }

    private onTouchMove(touch: EventTouch) {
        // event.propagationStopped = true;
        const deltaMove = touch.getUILocation(_tempVec2);
        deltaMove.subtract(touch.getUIStartLocation(_tempVec2_1));
        if (Math.abs(deltaMove.x) > 20) {
            this.isDragPage = true
        }
        if (this.isDragPage == false && Math.abs(deltaMove.y) > 20) {
            TouchUtil.lock(touch, this.node);
            this.isMoveEnable = true
        }

        if (this.isMoveEnable) {
            const visibleSize = view.getVisibleSize();
            let scale = (visibleSize.y + deltaMove.y) / visibleSize.y
            scale = Math.min(scale * 1, 1)
            _tempVec3_s.set(scale, scale, 1)
            this.node.scale = _tempVec3_s
            _tempPosVec3.set(this.orgPos.x + deltaMove.x, this.orgPos.y + deltaMove.y, 0)
            this.node.position = _tempPosVec3

            let opacity = this.node.parent.getComponent(UIOpacity)
            opacity.opacity = 255 * scale
        }
    }

    private onTouchEnd(touch: EventTouch) {
        if (this.isMoveEnable) {
            touch.propagationStopped = true;
            const deltaMove = touch.getUILocation(_tempVec2);
            deltaMove.subtract(touch.getUIStartLocation(_tempVec2_1));
            if (Math.abs(deltaMove.y) > this.distanceY) {
                this.moveToTarget()
            } else {
                this.resetView()
            }
        }else {
            const deltaMove = touch.getUILocation(_tempVec2);
            deltaMove.subtract(touch.getUIStartLocation(_tempVec2_1));
            if (deltaMove.length() < 5) {
                touch.propagationStopped = true;
                this.moveToTarget()
            }
        }
    }

    private onTouchCanceled(touch: EventTouch) {
        this.onTouchEnd(touch)
    }


    protected onDisable(): void {
        this.node.off(NodeEventType.TOUCH_START, this.onTouchStart, this)
        this.node.off(NodeEventType.TOUCH_MOVE, this.onTouchMove, this)
        this.node.off(NodeEventType.TOUCH_END, this.onTouchEnd, this)
        this.node.off(NodeEventType.TOUCH_CANCEL, this.onTouchCanceled, this)
    }

    resetView() {
        Tween.stopAllByTarget(this.node)
        tween(this.node).to(0.2, { scale: new Vec3(1, 1, 1) }).start()
        tween(this.node).to(0.2, { position: this.orgPos }).start()
        tween(this.node.parent.getComponent(UIOpacity)).to(0.2, { opacity: 255 }).start()
    }

    moveToTarget() {
        this.isMovingToTarget = true
        if (this.targetNode) {
            let tSize = this.targetNode.getComponent(UITransform).contentSize
            let iSize = this.node.getComponent(UITransform).contentSize
            let sw = tSize.width / iSize.width
            let sh = tSize.height / iSize.height

            let targetNodeWorldPos = new Vec3()
            let targetPos  = new Vec3()
            this.targetNode.getComponent(UITransform).convertToWorldSpaceAR(new Vec3(0, 0, 0), targetNodeWorldPos)
            this.node.parent.getComponent(UITransform).convertToNodeSpaceAR(targetNodeWorldPos,targetPos)

            Tween.stopAllByTarget(this.node)
            tween(this.node).to(0.2, { scale: new Vec3(sw, sh, 1) }).call(() => {
                this.onMoveFinish()
            }).start()
            tween(this.node).to(0.2, { position: targetPos }).start()
            tween(this.node.parent.getComponent(UIOpacity)).to(0.2, { opacity: 0 }).start()

        } else {
            Tween.stopAllByTarget(this.node)
            tween(this.node).to(0.2, { scale: new Vec3(1, 1, 1) }).call(() => {
                this.onMoveFinish()
            }).start()
            tween(this.node).to(0.2, { position: this.orgPos }).start()
            tween(this.node.parent.getComponent(UIOpacity)).to(0.2, { opacity: 0 }).start()
        }
    }

    onMoveFinish() {
        this.isMovingToTarget = false
        uiMgr.popPage()
        console.log("onMoveFinish")
    }
}



import { _decorator, Component, Node, NodeEventType, EventTouch, Vec2, Vec3,view } from 'cc';
import { Picture } from 'qsdk/exports';
import { PhotoSource } from '../../../../../domain/photo/PhotoSource';
import { TouchUtil } from 'bos/exports';
const { ccclass, property } = _decorator;


const _tempVec2 = new Vec2();
const _tempVec2_1 = new Vec2();
const _tempVec3_s = new Vec3();
const _tempPosVec3 = new Vec3();

@ccclass('ImageCell')
export class ImageCell extends Component {

    @property(Picture)
    image: Picture = null!;

    private orgPos: Vec3 = new Vec3(0, 0)
    isMoveEnable: boolean;
    isDragPage: boolean;

    updateView(ps: PhotoSource) {
        // this.image.url = ps.url;
        console.log("updateView", ps)
        this.image.setUrl(ps.url);
    }

    // protected onEnable(): void {
    //     this.image.node.on(NodeEventType.TOUCH_START, this.onTouchStart, this)
    //     this.image.node.on(NodeEventType.TOUCH_MOVE, this.onTouchMove, this)
    //     this.image.node.on(NodeEventType.TOUCH_END, this.onTouchEnd, this)
    //     this.image.node.on(NodeEventType.TOUCH_CANCEL, this.onTouchCanceled, this)
    // }

    // private onTouchStart(touch: EventTouch) {
    //     this.orgPos = this.image.node.position.clone()
    //     this.isMoveEnable = false
    //     this.isDragPage = false
    // }

    // private onTouchMove(touch: EventTouch) {
    //     // event.propagationStopped = true;
    //     const deltaMove = touch.getUILocation(_tempVec2);
    //     deltaMove.subtract(touch.getUIStartLocation(_tempVec2_1));
    //     if (Math.abs(deltaMove.x) > 20) {
    //         this.isDragPage = true
    //     }
    //     if (this.isDragPage == false && Math.abs(deltaMove.y) > 20) {
    //         TouchUtil.lock(touch, this.image.node);
    //         this.isMoveEnable = true
    //     }

    //     if (this.isMoveEnable) {
    //         const visibleSize = view.getVisibleSize();
    //         let scale = (visibleSize.y + deltaMove.y) / visibleSize.y
    //         scale = Math.min(scale * 1, 1)
    //         _tempVec3_s.set(scale, scale, 1)
    //         this.image.node.scale = _tempVec3_s
    //         _tempPosVec3.set(this.orgPos.x + deltaMove.x, this.orgPos.y + deltaMove.y, 0)
    //         this.image.node.position = _tempPosVec3
    //     }
    // }

    // private onTouchEnd(touch: EventTouch) {
    //     if (this.isMoveEnable) {
    //         touch.propagationStopped = true;
    //         this.resetView()
    //     }
    // }

    // private onTouchCanceled(touch: EventTouch) {
    //     // touch.propagationStopped = true;
    // }


    // protected onDisable(): void {
    //     this.image.node.off(NodeEventType.TOUCH_START, this.onTouchStart, this)
    //     this.image.node.off(NodeEventType.TOUCH_MOVE, this.onTouchMove, this)
    //     this.image.node.off(NodeEventType.TOUCH_END, this.onTouchEnd, this)
    //     this.image.node.off(NodeEventType.TOUCH_CANCEL, this.onTouchCanceled, this)
    // }

    // resetView() {
    //     this.image.node.scale = new Vec3(1, 1, 1)
    //     this.image.node.position = this.orgPos
    // }
}



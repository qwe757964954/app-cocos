import { _decorator, Component, EventTouch, Node, UITransform, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BoundingBoxTest')
export class BoundingBoxTest extends Component {

    @property(Node)
    public touchNode: Node;


    start() {
        this.touchNode.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    onDestroy() {
        this.touchNode?.off(Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    onTouchEnd(event: EventTouch) {
        let endIndex = -1;
        let startIndex = -1;
        let touchPos = event.getUILocation();
        let children = this.touchNode.children;
        let startPos = event.getUIStartLocation();
        let uiComp = this.touchNode.getComponent(UITransform);
        let endPos = uiComp.convertToNodeSpaceAR(new Vec3(touchPos.x, touchPos.y));
        let startPos2 = uiComp.convertToNodeSpaceAR(new Vec3(startPos.x, startPos.y));

        for (let i = children?.length - 1; i >= 0; i--) {
            let boundingBox = children[i]?.getComponent(UITransform)?.getBoundingBox();
            if (!boundingBox) { continue };
            if (startIndex < 0 && boundingBox.contains(new Vec2(startPos2.x, startPos2.y))) {
                startIndex = i;
            }
            if (endIndex < 0 && boundingBox.contains(new Vec2(endPos.x, endPos.y))) {
                endIndex = i;
            }
        }
        console.log(`startIndex is ${startIndex}, endIndex is ${endIndex}`);
    }
}
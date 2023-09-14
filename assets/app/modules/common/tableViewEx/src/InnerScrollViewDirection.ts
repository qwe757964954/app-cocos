import { _decorator, Node, EventTouch, Component, ScrollView } from "cc";
const DirectionType = {
    TOP_BUTTON: 1,
    LEFT_RIGHT: 2,
    OTHER: 0
};
const { ccclass, property } = _decorator;
@ccclass('InnerScrollViewDirection')
export default class InnerScrollViewDirection extends Component {
    private direction: number = DirectionType.OTHER;
    protected onLoad(): void {
        let scrollView = this.node.getComponent(ScrollView);
        scrollView['_unregisterEvent']();
        let _onTouchBegan = scrollView['_onTouchBegan'];
        let _onTouchMoved = scrollView['_onTouchMoved'];
        let _onTouchEnded = scrollView['_onTouchEnded'];
        let _stopPropagationIfTargetIsMe = scrollView['_stopPropagationIfTargetIsMe'];
        // let _onTouchCancelled = scrollView['_onTouchCancelled'];
        let self = this;
        scrollView['_onTouchBegan'] = function (event: EventTouch, captureListeners?: Node[]) {
            self.direction = DirectionType.OTHER;
            _onTouchBegan.call(this, event, captureListeners);
        };
        scrollView['_onTouchEnded'] = function (event: EventTouch, captureListeners?: Node[]) {
            self.direction = DirectionType.OTHER;
            _onTouchEnded.call(this, event, captureListeners);
        };
        scrollView['_onTouchMoved'] = function (event: EventTouch, captureListeners?: Node[]) {
            const touch = event.touch;
            const deltaMove = touch.getUILocation().subtract(touch.getUIStartLocation());
            if (self.direction == DirectionType.OTHER && deltaMove.length() > 5) {
                let numX: number = Math.abs(deltaMove.x);
                let numY: number = Math.abs(deltaMove.y);
                if (numX < numY) {
                    self.direction = DirectionType.TOP_BUTTON;
                } else {
                    self.direction = DirectionType.LEFT_RIGHT;
                }
            }
            if (self.isDifferentBetweenSettingAndPlan(this)) {
                event.propagationStopped = true;
                _onTouchMoved.call(this, event, captureListeners);
            }
        };

        scrollView['_stopPropagationIfTargetIsMe'] = function (event: EventTouch) {
            if (self.isDifferentBetweenSettingAndPlan(this)) {
                _stopPropagationIfTargetIsMe.call(this, event);
            }
        };

        // scrollView['_onTouchCancelled'] = function (event: EventTouch, captureListeners?: Node[]): void {
        //     _onTouchCancelled.call(this, event, captureListeners);
        // };

        scrollView['_registerEvent']();
    }

    isDifferentBetweenSettingAndPlan(sv: ScrollView): boolean {
        if (this.direction === DirectionType.OTHER) {
            return false;
        }
        if (this.direction === DirectionType.TOP_BUTTON && sv.horizontal) {
            return false;
        }
        if (this.direction === DirectionType.LEFT_RIGHT && sv.vertical) {
            return false;
        }
        return true;
    }
}
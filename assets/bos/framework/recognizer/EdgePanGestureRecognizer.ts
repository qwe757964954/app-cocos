import { _decorator, CCFloat, CCInteger, Component, EventHandler, Event, Node, EventTouch, Vec2, ccenum, Enum, view } from 'cc';
const { ccclass, property } = _decorator;

import { GestureRecognizer, RecognizerState, GesRecognizerEvent } from './GestureRecognizer';

export enum EdgeType {
    Left,       // 左
    Top,        // 上
    Right,      // 右
    Bottom,     // 底
};


export class GesEdgePanEvent extends EventTouch {
    constructor(name: string, event?: EventTouch, state?: RecognizerState) {
        super(event.getTouches(), event.bubbles, name,event.getAllTouches());
        this.state = state;
        this.touch = event.touch;
    }
    public state: RecognizerState = null;  // 自定义的属性
    public time: number = 0;
    public edge: EdgeType = EdgeType.Left;
    public velocity: Vec2 = new Vec2();
}

const g_scale_factor = 1.0
const _tempVec2 = new Vec2();
const _tempVec2_1 = new Vec2();



@ccclass('EdgePanGestureRecognizer')
export class EdgePanGestureRecognizer extends GestureRecognizer {
    @property({
        displayName: "边缘方向",
        type: Enum(EdgeType),
    })
    edgeMask: EdgeType = EdgeType.Left;

    @property({
        displayName: "响应范围",
        type: CCInteger,
    })
    edgeMargin = 60

    @property({
        displayName: "最小触发距离",
        type: CCInteger,
    })
    miniDistance = 0

    protected time = 0

    protected velocity = new Vec2()

    protected onEnable(): void {
        this.registerNodeEvent();
    }

    protected onDisable(): void {
        this.unRegisterNodeEvent();
    }

    registerNodeEvent() {
        this.node.on(Node.EventType.TOUCH_START, this.touchStart, this,true);
        this.node.on(Node.EventType.TOUCH_MOVE, this.touchMove, this,true);
        this.node.on(Node.EventType.TOUCH_END, this.touchEnd, this,true);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.touchCanceled, this,true);
    }

    unRegisterNodeEvent() {
        this.node.targetOff(this);
    }



    touchMove(touch: EventTouch) {
        if (this.state == RecognizerState.Possible) {
            const deltaMove = touch.getUILocation(_tempVec2);
            deltaMove.subtract(touch.getUIStartLocation(_tempVec2_1));
            let offset = Math.max(Math.abs(deltaMove.x), Math.abs(deltaMove.y));
            if (offset > this.miniDistance) {
                this.onBegin(touch);
            }
        } else if (this.state == RecognizerState.Begin || this.state == RecognizerState.Changed) {
            this.onChanged(touch);
        }
    }

    touchStart(touch: EventTouch) {
        this.state = RecognizerState.Possible;
        touch.getUIStartLocation(_tempVec2);
        const visibleSize = view.getVisibleSize();

        if (this.edgeMask == EdgeType.Left && _tempVec2.x < this.edgeMargin) {

        } else if (this.edgeMask == EdgeType.Top && visibleSize.y - _tempVec2.y < this.edgeMargin) {

        } else if (this.edgeMask == EdgeType.Right && visibleSize.x - _tempVec2.x < this.edgeMargin) {

        } else if (this.edgeMask == EdgeType.Bottom && _tempVec2.y < this.edgeMargin) {

        } else {
            this.onFail(touch)
            return
        }
    }

    touchCanceled(touch: EventTouch) {
        this.onFail(touch);
    }

    touchEnd(touch: EventTouch) {
        if (this.state == RecognizerState.Begin || this.state == RecognizerState.Changed) {
            this.onEnded(touch);
        }
    }

    triggerEvent(touch: EventTouch) {
        let event = new GesEdgePanEvent(GesRecognizerEvent.EdgePanEvent, touch, this.state)
        event.time = this.time
        event.velocity = this.velocity
        event.edge = this.edgeMask
        event.target = this.node;
        event.currentTarget = this.node;
        this.node.emit(event.type, event);
        return event;
    }

    onChanged(touch: EventTouch) {
        this.state = RecognizerState.Changed;
        let duration = (new Date().getTime() - this.time) / 1000.0;
        duration = Math.max(duration, 0.016);
        touch.getDelta(_tempVec2);
        let offset = _tempVec2
        _tempVec2_1.x = (offset.x / duration) / g_scale_factor;
        _tempVec2_1.y = (offset.y / duration) / g_scale_factor;

        if (duration < (10.0 / 60.0)) {
            this.velocity.x = 0.8 * _tempVec2_1.x + 0.2 * this.velocity.x;
            this.velocity.y = 0.8 * _tempVec2_1.y + 0.2 * this.velocity.y;
        } else {
            this.velocity.x = _tempVec2_1.x;
            this.velocity.y = _tempVec2_1.y;
        }

        this.time = new Date().getTime();
        touch.propagationStopped = true;
        this.triggerEvent(touch);
    }
    onFail(touch: EventTouch) {
        this.state = RecognizerState.Failed;
        this.triggerEvent(touch);
    }

    onBegin(touch: EventTouch) {
        this.state = RecognizerState.Begin;
        this.time = new Date().getTime();
        this.velocity.x = 0;
        this.velocity.y = 0;
        this.triggerEvent(touch);
        touch.propagationStopped = true;
    }
    onEnded(touch: EventTouch) {
        this.state = RecognizerState.Ended;
        this.triggerEvent(touch);
        touch.propagationStopped = true;
    }
}
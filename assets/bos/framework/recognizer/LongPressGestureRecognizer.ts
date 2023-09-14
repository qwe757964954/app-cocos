import { _decorator, CCFloat, CCInteger, Component, EventHandler, Event, Node, EventTouch, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

import { GestureRecognizer, RecognizerState, GesRecognizerEvent } from './GestureRecognizer';

export class GesLongPressEvent extends EventTouch {
    constructor(name: string, event?: EventTouch, state?: RecognizerState) {
        super(event.getTouches(), event.bubbles, name);
        this.touch = event.touch;
        this.state = state;
    }
    public state: RecognizerState = null;  // 自定义的属性
}

const _tempVec2 = new Vec2();
const _tempVec2_1 = new Vec2();

@ccclass('LongPressGestureRecognizer')
export class TapGestureRecognizer extends GestureRecognizer {

    @property({
        displayName: "长按间隔",
        type: CCFloat,
    })
    time: number = 0.5;

    @property({
        serializable: true,
        type: EventHandler,
        displayName: "触发回调",
    })
    public callBackEvent: EventHandler[] = [];

    started: boolean;
    hasTimer: boolean;
    protected lastTouch: EventTouch = null;

    protected onEnable(): void {
        this.registerNodeEvent();
    }

    registerNodeEvent() {
        this.node.on(Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.node.on(Node.EventType.TOUCH_END, this.touchEnd, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.touchCanceled, this);

    }

    unRegisterNodeEvent() {
        this.node.off(Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.off(Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.node.off(Node.EventType.TOUCH_END, this.touchEnd, this);
        this.node.off(Node.EventType.TOUCH_CANCEL, this.touchCanceled, this);


    }

    protected onDisable(): void {
        this.unRegisterNodeEvent();
    }

    touchMove(touch: EventTouch) {
        this.lastTouch = touch;
        const deltaMove = touch.getUILocation(_tempVec2);
        deltaMove.subtract(touch.getUIStartLocation(_tempVec2_1));
        if (deltaMove.length() > 7 && this.state == RecognizerState.Possible) {
            this.onChanged();
        }
    }

    touchStart(touch: EventTouch) {
        this.lastTouch = touch;
        this.state = RecognizerState.Possible;
        this.startTimer();
    }

    touchCanceled(touch: EventTouch) {
        this.lastTouch = touch;
        this.stopTimer();
        this.onFail();
        this.lastTouch = null;

    }

    touchEnd(touch: EventTouch) {
        this.lastTouch = touch;
        switch (this.state) {
            case RecognizerState.Begin:
                this.onEnded();
                touch.propagationStopped = true;
                touch.propagationImmediateStopped = true;
                break;
            default:
                this.onFail();
                break
        }
        this.lastTouch = null;
    }

    triggerEvent(doCallBack: boolean = false) {
        let event = new GesLongPressEvent(GesRecognizerEvent.LongPressEvent, this.lastTouch, this.state)
        event.target = this.node
        event.currentTarget = this.node
        if (doCallBack) {
            EventHandler.emitEvents(this.callBackEvent, event);
        }
        this.node.emit(event.type, event);
        // this.node.dispatchEvent(event);
        return event;
    }

    reset() {

    }

    startTimer() {
        if (!this.hasTimer) {
            this.scheduleOnce(this.timerCallback, this.time);
            this.hasTimer = true;
        }
    }

    stopTimer() {
        this.unschedule(this.timerCallback);
        this.hasTimer = false
    }

    timerCallback(dt: number) {
        if (this.state == RecognizerState.Possible) {
            this.onBegin();
        } else {
            this.onFail();
        }
    }

    onChanged() {
        this.state = RecognizerState.Changed;
        this.triggerEvent();
    }
    onFail() {
        this.state = RecognizerState.Failed;
        this.triggerEvent();
        this.stopTimer();
    }

    onBegin() {
        this.state = RecognizerState.Begin;
        this.triggerEvent(true);
        this.stopTimer();
    }
    onEnded() {
        this.state = RecognizerState.Ended;
        this.triggerEvent();
    }
}
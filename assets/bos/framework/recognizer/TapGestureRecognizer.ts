import { _decorator, CCFloat, CCInteger, Component, EventHandler, Event, Node, EventTouch, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

import { GestureRecognizer, RecognizerState, GesRecognizerEvent } from './GestureRecognizer';

export class GesTapEvent extends EventTouch {
    constructor(name: string, event?: EventTouch, state?: RecognizerState) {
        super(event.getTouches(), event.bubbles, name);
        this.state = state;
        this.touch = event.touch;
    }
    public state: RecognizerState = null;  // 自定义的属性
    public tapped: number = 0;
}

@ccclass('TapGestureRecognizer')
export class TapGestureRecognizer extends GestureRecognizer {

    @property({
        displayName: "点击次数",
        type: CCInteger,
    })
    tapCount: number = 2;

    @property({
        displayName: "时间间隔",
        type: CCFloat,
    })
    time: number = 0.5;

    @property({
        serializable: true,
        type: EventHandler,
        displayName: "触发回调",
    })
    public callBackEvent: EventHandler[] = [];

    tapped: number = 0;

    started: boolean;
    hasTimer: boolean;


    protected onEnable(): void {
        this.registerNodeEvent();
    }

    protected registerNodeEvent() {
        this.node.on(Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.on(Node.EventType.TOUCH_END, this.touchEnd, this, true);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.touchCanceled, this);
    }

    protected unRegisterNodeEvent() {
        this.node.off(Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.off(Node.EventType.TOUCH_END, this.touchEnd, this, true);
        this.node.off(Node.EventType.TOUCH_CANCEL, this.touchCanceled, this);
    }

    onTGREvent(event: GesTapEvent) {
        console.log("TapGREvent", event.state, event.tapped);
    }

    protected onDisable(): void {
        this.unRegisterNodeEvent();
    }

    touchStart(touch: EventTouch) {
        this.state = RecognizerState.Begin;
        this.startTimer();
    }

    touchCanceled(touch: EventTouch) {
        this.stopTimer();
        this.onFail();

    }

    touchEnd(touch: EventTouch) {
        this.tapped++;
        if (this.tapped >= this.tapCount) {
            this.state = RecognizerState.Ended;
            this.stopTimer();
            this.triggerEvent(touch, true);
            touch.propagationStopped = true;
            touch.propagationImmediateStopped = true;
            this.reset();
        }
    }

    triggerEvent(touch?: EventTouch, doCallBack: boolean = false) {
        let event = new GesTapEvent(GesRecognizerEvent.TapEvent, touch, this.state)
        event.tapped = this.tapped;
        event.target = this.node;
        event.currentTarget = this.node;
        if (doCallBack) {
            EventHandler.emitEvents(this.callBackEvent, event);
        }
        this.node.emit(event.type, event);
    }

    reset() {
        this.tapped = 0;
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
        this.onFail();
    }

    onFail() {
        const touch = new EventTouch([], false, "");
        this.state = RecognizerState.Failed;
        this.triggerEvent(touch, false);
        this.tapped = 0;
        this.stopTimer();
    }
}
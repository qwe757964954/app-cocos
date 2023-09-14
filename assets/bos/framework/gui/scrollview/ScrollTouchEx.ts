import { _decorator, Component, EventTouch, Node, NodeEventType, ScrollView } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ScrollTouchEx')
export class ScrollTouchEx extends Component {

    scrollView: ScrollView = null;
    lockTarget: Node = null;
    // dispatchedCancelEvent: boolean;
    start() {
        // this.dispatchedCancelEvent = false
        if (this.scrollView == null) {
            this.scrollView = this.node.getComponent(ScrollView);


            let _onTouchBegan = this.scrollView['_onTouchBegan']
            let _onTouchMoved = this.scrollView['_onTouchMoved']
            let _onTouchEnded = this.scrollView['_onTouchEnded']
            let _onTouchCancelled = this.scrollView['_onTouchCancelled']

            this.scrollView['_unregisterEvent']()

            let self = this;
            this.scrollView['_onTouchBegan'] = function (event: EventTouch, captureListeners?: Node[]) {
                self.lockTarget = null
                this.dispatchedCancelEvent = false
                if (event.simulate) {
                    event.simulate = false;
                    return;
                }
                const customEvent = new EventTouch(event.getTouches(), event.bubbles, NodeEventType.TOUCH_START);
                customEvent.touch = event.touch;
                customEvent.simulate = true;
                customEvent.target = event.target;
                // (event.target as Node).dispatchEvent(customEvent);
                self.dispatchCustomEvent(customEvent, self.node)
                if (self.lockTarget == null && customEvent['lockTarget']) {
                    self.lockTarget = customEvent['lockTarget']
                    self.tryDispatchCancelEvent(customEvent, captureListeners)
                }
                event.propagationStopped = true
                if (customEvent.propagationStopped) {
                    return;
                }
                _onTouchBegan.call(this, event, captureListeners);
            }

            this.scrollView['_onTouchMoved'] = function (event: EventTouch, captureListeners?: Node[]) {
                if (event.simulate) {
                    event.simulate = false;
                    return;
                }
                const customEvent = new EventTouch(event.getTouches(), event.bubbles, NodeEventType.TOUCH_MOVE);
                customEvent.touch = event.touch;
                customEvent.simulate = true;
                customEvent.target = event.target;
                // (event.target as Node).dispatchEvent(customEvent);
                self.dispatchCustomEvent(customEvent, self.node)
                if (self.lockTarget == null && customEvent['lockTarget']) {
                    self.lockTarget = customEvent['lockTarget']
                    self.tryDispatchCancelEvent(customEvent, captureListeners)
                }
                event.propagationStopped = true
                if (customEvent.propagationStopped) {
                    return;
                }
                _onTouchMoved.call(this, event, captureListeners);
            }

            this.scrollView['_onTouchEnded'] = function (event: EventTouch, captureListeners?: Node[]) {
                if (event.simulate) {
                    event.simulate = false;
                    return;
                }
                const customEvent = new EventTouch(event.getTouches(), event.bubbles, NodeEventType.TOUCH_END);
                customEvent.touch = event.touch;
                customEvent.simulate = true;
                customEvent.target = event.target;
                // (event.target as Node).dispatchEvent(customEvent);
                self.dispatchCustomEvent(customEvent, self.node)
                self.lockTarget = null
                // self.dispatchedCancelEvent = false
                event.propagationStopped = true
                if (customEvent.propagationStopped) {
                    return;
                }
                _onTouchEnded.call(this, event, captureListeners);
            }

            this.scrollView['_onTouchCancelled'] = function (event: EventTouch, captureListeners?: Node[]) {
                if (event.simulate && event['fromCustomEvent'] == true) {
                    event.simulate = false;
                    return;
                }
                const customEvent = new EventTouch(event.getTouches(), event.bubbles, NodeEventType.TOUCH_CANCEL);
                customEvent.touch = event.touch;
                customEvent.simulate = true;
                customEvent.target = event.target;
                customEvent['fromCustomEvent'] = true
                // (event.target as Node).dispatchEvent(customEvent);
                self.dispatchCustomEvent(customEvent, self.node)
                self.lockTarget = null
                // self.dispatchedCancelEvent = false
                event.propagationStopped = true
                if (customEvent.propagationStopped) {
                    return;
                }
                _onTouchCancelled.call(this, event, captureListeners);
            }
            this.scrollView['_registerEvent']()
        }
    }

    dispatchCustomEvent(event: EventTouch, captureTarget?: Node) {
        const _cachedArray = new Array<Node>(16);
        let eventProcessor = event.target._eventProcessor;
        let target: Node;
        let i = 0;

        if (this.lockTarget) {
            target = this.lockTarget;
            event.currentTarget = this.lockTarget;
            if (target.eventProcessor && target.eventProcessor.capturingTarget) {
                target.eventProcessor.capturingTarget.emit(event.type, event, _cachedArray);
            }
            if (target.eventProcessor && target.eventProcessor.bubblingTarget) {
                target.eventProcessor.bubblingTarget.emit(event.type, event);
            }
            event.propagationStopped = true
            return
        }


        // Event.CAPTURING_PHASE
        _cachedArray.length = 0;
        eventProcessor.getCapturingTargets(event.type, _cachedArray);

        let dispatch = false
        // capturing
        event.eventPhase = 1;
        for (i = _cachedArray.length - 1; i >= 0; --i) {
            target = _cachedArray[i];
            if (captureTarget && captureTarget == target) {
                dispatch = true
            }
            if (dispatch && target.eventProcessor.capturingTarget) {
                event.currentTarget = target;
                // fire event
                target.eventProcessor.capturingTarget.emit(event.type, event, _cachedArray);
                // check if propagation stopped
                if (event.propagationStopped) {
                    _cachedArray.length = 0;
                    return;
                }
            }
        }
        _cachedArray.length = 0;

        // Event.AT_TARGET
        // checks if destroyed in capturing callbacks
        event.eventPhase = 2;
        event.currentTarget = event.target;
        if (eventProcessor.capturingTarget) {
            eventProcessor.capturingTarget.emit(event.type, event);
        }
        if (!event.propagationImmediateStopped && eventProcessor.bubblingTarget) {
            eventProcessor.bubblingTarget.emit(event.type, event);
        }

        if (!event.propagationStopped && event.bubbles) {
            // Event.BUBBLING_PHASE
            eventProcessor.getBubblingTargets(event.type, _cachedArray);
            // propagate
            event.eventPhase = 3;
            for (i = 0; i < _cachedArray.length; ++i) {
                target = _cachedArray[i];
                if (target.eventProcessor.bubblingTarget) {
                    event.currentTarget = target;
                    // fire event
                    target.eventProcessor.bubblingTarget.emit(event.type, event);
                    // check if propagation stopped
                    if (event.propagationStopped) {
                        _cachedArray.length = 0;
                        return;
                    }
                }
            }
        }
        _cachedArray.length = 0;
    }

    tryDispatchCancelEvent(event: EventTouch, captureListeners?: Node[]) {
        if (this.lockTarget) {
            const customEvent = new EventTouch(event.getTouches(), event.bubbles, NodeEventType.TOUCH_CANCEL);
            customEvent.touch = event.touch;
            customEvent.simulate = true;
            customEvent.target = event.target;
            customEvent['fromCustomEvent'] = true
            this.dispatchEventWithIgnoreTarget(customEvent, this.lockTarget)
        }
    }

    dispatchEventWithIgnoreTarget(event: EventTouch, ignoreTarget?: Node) {
        const _cachedArray = new Array<Node>(16);
        let eventProcessor = event.target._eventProcessor;
        let target: Node;
        let i = 0;


        // Event.CAPTURING_PHASE
        _cachedArray.length = 0;
        eventProcessor.getCapturingTargets(event.type, _cachedArray);

        let dispatch = true
        // capturing
        event.eventPhase = 1;
        for (i = _cachedArray.length - 1; i >= 0; --i) {
            target = _cachedArray[i];
            dispatch = true
            if (ignoreTarget && ignoreTarget == target) {
                dispatch = false
            }
            if (dispatch && target.eventProcessor.capturingTarget) {
                event.currentTarget = target;
                // fire event
                target.eventProcessor.capturingTarget.emit(event.type, event, _cachedArray);
                // check if propagation stopped
                if (event.propagationStopped) {
                    _cachedArray.length = 0;
                    return;
                }
            }
        }
        _cachedArray.length = 0;

        // Event.AT_TARGET
        // checks if destroyed in capturing callbacks
        event.eventPhase = 2;
        event.currentTarget = event.target;
        if (eventProcessor.capturingTarget && eventProcessor.node != ignoreTarget) {
            eventProcessor.capturingTarget.emit(event.type, event);
        }
        if (!event.propagationImmediateStopped && eventProcessor.bubblingTarget && eventProcessor.node != ignoreTarget) {
            eventProcessor.bubblingTarget.emit(event.type, event);
        }

        if (!event.propagationStopped && event.bubbles) {
            // Event.BUBBLING_PHASE
            eventProcessor.getBubblingTargets(event.type, _cachedArray);
            // propagate
            event.eventPhase = 3;
            for (i = 0; i < _cachedArray.length; ++i) {
                target = _cachedArray[i];
                dispatch = true
                if (ignoreTarget && ignoreTarget == target) {
                    dispatch = false
                }
                if (dispatch && target.eventProcessor.bubblingTarget) {
                    event.currentTarget = target;
                    // fire event
                    target.eventProcessor.bubblingTarget.emit(event.type, event);
                    // check if propagation stopped
                    if (event.propagationStopped) {
                        _cachedArray.length = 0;
                        return;
                    }
                }
            }
        }
        _cachedArray.length = 0;
    }
}
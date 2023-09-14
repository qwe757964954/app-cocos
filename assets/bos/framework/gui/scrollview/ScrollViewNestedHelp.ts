import { EventHandler } from 'cc';
import { EventTouch } from 'cc';
import { UITransform } from 'cc';
import { ViewGroup } from 'cc';
import { EventMouse } from 'cc';
import { ScrollView } from 'cc';
import { _decorator, Component, Node } from 'cc';
const { ccclass, property, executeInEditMode, disallowMultiple } = _decorator;

enum ScrollEvent {
    ScrollToTop = 0,
    scrollToBottom = 1,
    scrollToLeft = 2,
    scrollToRight = 3,
    scrolling = 4,
    bounceBottom = 6,
    bounceLeft = 7,
    bounceRight = 8,
    bounceTop = 5,
    scrollEnded = 9,
    touchUp = 10,
    scrollEndedWithThreshold = 11,
    scrollBegan = 12,
};

enum MoveDir {
    LEFT = 0,
    RIGHT = 1,
    TOP = 2,
    BOTTOM = 3,
    UNKNOW = 4,
};

let ScrollEventName = {
    [ScrollEvent.ScrollToTop]: 'scroll-to-top',
    [ScrollEvent.scrollToBottom]: 'scroll-to-bottom',
    [ScrollEvent.scrollToLeft]: 'scroll-to-left',
    [ScrollEvent.scrollToRight]: 'scroll-to-right',
    [ScrollEvent.scrolling]: 'scrolling',
    [ScrollEvent.bounceBottom]: 'bounce-to-bottom',
    [ScrollEvent.bounceLeft]: 'bounce-to-left',
    [ScrollEvent.bounceRight]: 'bounce-to-right',
    [ScrollEvent.bounceTop]: 'bounce-to-top',
    [ScrollEvent.scrollEnded]: 'scroll-end',
    [ScrollEvent.touchUp]: 'touchup',
    [ScrollEvent.scrollEndedWithThreshold]: 'scrollEndedWithThreshold',
    [ScrollEvent.scrollBegan]: 'scroll-began',
}

/**
 *  cocos 事件派发流程
 *  1、先走 Event.CAPTURING_PHASE 阶段，通过寻找当前节点得父节点是否注册 Capture 回调，有则会触发，从当前节点得父节点逐个向父节点
 *  Capture 注册得方式是，on(type: string | NodeEventType, callback: AnyFunction, target?: unknown, useCapture: any = false) 最后得参数
 *  此阶段可以 设置 Event.propagationStopped 停止后续的派发 
 *  2、走 Event.AT_TARGET 阶段，就是在当前节点派发
 *  2.1 当前节点的 capturingTarget 回调，可以 event.propagationImmediateStopped 控制不走下面的 2.2 的 bubblingTarget 
 *  2.2 bubblingTarget 回调，
 *  AT_TARGET 阶段可以设置 event.propagationStopped 停止不走 BUBBLEING_PHASE 阶段
 *  3、走 Event.BUBBLING_PHASE 冒泡节点，就是从当前节点向父节点递归派发
 */

@ccclass('ScrollViewNestedHelp')
@disallowMultiple
@executeInEditMode
export class ScrollViewNestedHelp extends Component {

    private _scrollView: ScrollView = null!;
    private _isScrollViewChildren: boolean = false;
    private _edageStatus: boolean[] = [false, false, false, false];
    private _lastVDir: MoveDir = MoveDir.UNKNOW
    private _lastHDir: MoveDir = MoveDir.UNKNOW
    private _viewTransform: UITransform = null!;
    private _contentUITransform: UITransform = null!;


    get viewTransform() {
        if (this._viewTransform) return this._viewTransform;

        this._viewTransform = this._scrollView.content.parent.getComponent(UITransform);

        return this._viewTransform
    }

    get contentTransform() {
        if (this._contentUITransform) return this._contentUITransform;

        this._contentUITransform = this._scrollView.content.getComponent(UITransform);

        return this._contentUITransform
    }

    @property({
        displayName: "addForChildScrollView",
        tooltip: "自动给子节点中的 ScrollView 添加 ScrollViewNestedHelp 组件",
    })
    get AddComponetToChild() {
        return false;
    }
    set AddComponetToChild(value: boolean) {
        if (value) {
            let scrollviews = this.node.getComponentsInChildren(ScrollView)

            for (let scollview of scrollviews) {
                if (scollview.getComponent(ScrollViewNestedHelp) == null)
                    scollview.node.addComponent(ScrollViewNestedHelp)
            }
        }
    }

    @property({
        displayName: "disableChildElastic",
        tooltip: "自动将所有子节点 ScrollView 的 Elastic 属性禁用",
    })
    get DisableChildElastic() {
        return false;
    }
    set DisableChildElastic(value: boolean) {
        if (value) {
            let scrollviews = this.node.getComponentsInChildren(ScrollView)

            for (let scollview of scrollviews) {
                scollview.elastic = false;
            }
        }
    }

    private initControl() {
        this._scrollView = this.getComponent(ScrollView)

        if (this._scrollView == null) return;

        // let findEvent = false;
        // let classname = ScrollViewNestedHelp.name
        // let handlename = this.scrollViewDidScroll.name

        // for (let event of this._scrollView.scrollEvents) {
        //     if (event.target == this.node &&
        //         event.component == classname &&
        //         event.handler == handlename) {
        //         findEvent = true;
        //     }
        // }
        // if (!findEvent) {
        //     let eventHandler = new EventHandler();
        //     eventHandler.target = this.node;
        //     eventHandler.component = classname;
        //     eventHandler.handler = handlename;
        //     this._scrollView.scrollEvents.push(eventHandler);
        // }

        (this._scrollView as any)._hasNestedViewGroup = (event: Event, captureListeners?: Node[]) => {
            return this.scrollViewEventFilter(event, captureListeners)
        }

        this._isScrollViewChildren = false;
        let parent = this.node.parent
        while (parent) {
            if (parent.getComponent(ViewGroup)) {
                this._isScrollViewChildren = true;
                break;
            }
            parent = parent.parent
        }
    }

    private getContentOffset(horizontal: boolean): number {
        let viewSize = this.viewTransform.contentSize
        let pos = this.contentTransform.node.position;

        let offset = 0;
        if (horizontal) {
            offset = -viewSize.width / 2 - pos.x;
        }
        else {
            offset = pos.y - viewSize.height / 2;
        }

        return offset;
    }

    private isOutEdge(dir: MoveDir) {
        switch (dir) {
            case MoveDir.LEFT:
                {
                    let offset = this.getContentOffset(true);
                    return offset <= 0
                }
            case MoveDir.RIGHT:
                {
                    let offset = this.getContentOffset(true);
                    let viewsize = this.viewTransform.contentSize
                    let contentsize = this.contentTransform.contentSize

                    let maxOffset = (contentsize.width - viewsize.width)
                    if (maxOffset < 0) maxOffset = 0;
                    return (offset >= maxOffset)
                }
            case MoveDir.TOP:
                {
                    let offset = this.getContentOffset(false);

                    return offset <= 0;
                }
            case MoveDir.BOTTOM:
                {
                    let offset = this.getContentOffset(false);
                    let viewsize = this.viewTransform.contentSize
                    let contentsize = this.contentTransform.contentSize

                    let maxOffset = (contentsize.height - viewsize.height)
                    if (maxOffset < 0) maxOffset = 0;

                    return (offset >= maxOffset)
                }
        }
    }

    private isScrollToEdge(event: Event) {
        if (!this._isScrollViewChildren) return false;
        let isEdge = false;
        if (this._scrollView.horizontal) {
            let movedir = this._lastHDir;

            if (event instanceof EventTouch) {
                let detalx = event.getDeltaX()
                if (detalx != 0) {
                    movedir = detalx < 0 ? MoveDir.LEFT : MoveDir.RIGHT
                }
            }

            this._lastHDir = movedir
            if (movedir != MoveDir.UNKNOW) {
                isEdge = this.isOutEdge(movedir)
                // let reverseDir = movedir == MoveDir.LEFT ? MoveDir.RIGHT : MoveDir.LEFT;
                // this._edageStatus[reverseDir] = false;
            }
            //console.log("horizontal dir", movedir)
        }

        if (this._scrollView.vertical) {
            let movedir = this._lastVDir;
            if (event instanceof EventTouch) {
                let detaly = event.getDeltaY()
                if (detaly != 0)
                    movedir = detaly < 0 ? MoveDir.TOP : MoveDir.BOTTOM

            } else if (event instanceof EventMouse) {
                let detaly = event.getScrollY()
                if (detaly != 0)
                    movedir = detaly > 0 ? MoveDir.TOP : MoveDir.BOTTOM
            }

            this._lastVDir = movedir
            if (movedir != MoveDir.UNKNOW) {
                isEdge = this.isOutEdge(movedir)
            }
            // console.log("vertical dir", event, movedir, this._lastVDir, this._edageStatus)
        }

        console.log("isEdgae", this.node.name, isEdge, this._lastVDir, this._edageStatus, event, (event instanceof EventTouch) ? event.getDeltaY() : 0)
        return isEdge;
    }

    private scrollViewEventFilter(event: Event, captureListeners?: Node[]) {
        if (!event) {
            return false;
        }

        let filter = false
        //当前节点派发的时候
        if (event.eventPhase == Event.CAPTURING_PHASE) {
            filter = (ScrollView.prototype as any)._hasNestedViewGroup.call(this._scrollView, event, captureListeners);
        } else if (event.eventPhase == Event.AT_TARGET) {
            filter = this.isScrollToEdge(event); //更具当前状态处理是否
        }

        //console.log("scrollViewEventFilter", this.node.name, filter, event, captureListeners)
        return filter;
    }

    protected initEvent() {
        if (this._scrollView == null) return;
        this.node.on(Node.EventType.TOUCH_START, (this._scrollView as any)._onTouchBegan, this._scrollView);
        this.node.on(Node.EventType.TOUCH_MOVE, (this._scrollView as any)._onTouchMoved, this._scrollView);
        this.node.on(Node.EventType.TOUCH_END, (this._scrollView as any)._onTouchEnded, this._scrollView);
        this.node.on(Node.EventType.TOUCH_CANCEL, (this._scrollView as any)._onTouchCancelled, this._scrollView);
        this.node.on(Node.EventType.MOUSE_WHEEL, (this._scrollView as any)._onMouseWheel, this._scrollView);
    }

    protected uninitEvent() {
        if (this._scrollView == null) return;
        this.node.off(Node.EventType.TOUCH_START, (this._scrollView as any)._onTouchBegan, this._scrollView);
        this.node.off(Node.EventType.TOUCH_MOVE, (this._scrollView as any)._onTouchMoved, this._scrollView);
        this.node.off(Node.EventType.TOUCH_END, (this._scrollView as any)._onTouchEnded, this._scrollView);
        this.node.off(Node.EventType.TOUCH_CANCEL, (this._scrollView as any)._onTouchCancelled, this._scrollView);
        this.node.off(Node.EventType.MOUSE_WHEEL, (this._scrollView as any)._onMouseWheel, this._scrollView);
    }

    protected onEnable(): void {
        this.initEvent()
    }

    protected onDisable(): void {
        this.uninitEvent()
    }

    protected onLoad(): void {
        //console.log("this.", this, ScrollViewScrollHelp.name, this.scrollViewDidScroll.name)
        this.initControl()
    }

    scrollViewDidScroll(scrollview: ScrollView, event: number) {
        console.log("scrollViewDidScroll", this.node.name, event, ScrollEventName[event], this._edageStatus)

        switch (event) {
            case ScrollEvent.scrollToLeft:
                {
                    this._edageStatus[MoveDir.LEFT] = true;
                    break;
                }
            case ScrollEvent.scrollToRight:
                {
                    this._edageStatus[MoveDir.RIGHT] = true;
                    break;
                }
            case ScrollEvent.ScrollToTop:
                {
                    this._edageStatus[MoveDir.TOP] = true;
                    break;
                }
            case ScrollEvent.scrollToBottom:
                {
                    this._edageStatus[MoveDir.BOTTOM] = true;
                    break;
                }
        }
    }
}



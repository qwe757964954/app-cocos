import { Component, _decorator } from "cc";
import { XLabel } from "./XLabel";
import { EventTouch } from "cc";
import { UITransform } from "cc";
import { input } from "cc";
import { Input } from "cc";
import { XLabelEvent } from "./XLabelEnum";
import { ByLabelImpBase } from "./imp/ByLabelImpBase";
import { Vec2 } from "cc";
import { director } from "cc";
const { ccclass, requireComponent, menu, disallowMultiple } = _decorator

const SHOW_SELECT_DT = 0.5

@ccclass("XLabelSelect")
@menu('2D/XLabelSelect')
@disallowMultiple
@requireComponent(XLabel)
export class XLabelSelect extends Component {
    private _label: XLabel = null!;

    private _uiTransform: UITransform = null!;
    private _uiBeginSelect: UITransform = null!;
    private _uiEndSelect: UITransform = null!;
    private _curSelectNode: UITransform = null!;

    private _touchBeginTime: number = 0;
    private _isShowSelect: boolean = false;
    private _isRegisterTouchEvent: boolean = false;
    private _labelImpl: ByLabelImpBase = null;

    onLoad() {
        this._label = this.getComponent(XLabel)
        this._labelImpl = this._label.getLabelImp();
        this._labelImpl.setSelectComp(this)
        this._uiTransform = this.node.getComponent(UITransform)

        this.registerTouchEvent();
    }

    handleTouchBegan(event: EventTouch) {
        this._touchBeginTime = 1;
    }

    getBeginSelect(): UITransform {
        return this._uiBeginSelect
    }
    setBeginSelect(begin: UITransform) {
        if (this._uiBeginSelect == begin) {
            return;
        }
        this._uiBeginSelect = begin;
    }

    getEndSelect(): UITransform {
        return this._uiEndSelect
    }

    setEndSelect(end: UITransform) {
        if (this._uiEndSelect == end) {
            return;
        }

        this._uiEndSelect = end;
    }

    handleGlobalTouchStart(event: EventTouch) {
        console.log("handleGlobalTouchStart")
        const pos = event.getLocation();

        if (this._uiBeginSelect && this._uiBeginSelect.hitTest(pos, event.windowId)) {
            this._curSelectNode = this._uiBeginSelect
        } else if (this._uiEndSelect && this._uiEndSelect.hitTest(pos, event.windowId)) {
            this._curSelectNode = this._uiEndSelect
        } else if (this._uiTransform.hitTest(pos, event.windowId)) {
            this._touchBeginTime = SHOW_SELECT_DT;
        } else {
            this.endSelect();
        }

    }

    handleGlobalTouchMove(event: EventTouch) {
        if (this._curSelectNode) {
            let delta = event.getUIDelta()
            let curPos = this._curSelectNode.node.getPosition()
            this._curSelectNode.node.setPosition(curPos.x + delta.x, curPos.y + delta.y)
            console.log("handleGlobalTouchMove", delta)
            this.updateSelect(this._curSelectNode === this._uiBeginSelect, delta)
        }
    }

    handleGlobalTouchEnd(event: EventTouch) {
        const pos = event.getLocation();
        if (this._curSelectNode) {
            this._curSelectNode = null;
            return;
        } else if (this._uiTransform.hitTest(pos, event.windowId)) {
            this._touchBeginTime = -1;
        } else {
            this.endSelect();
        }
    }

    handleGlobalTouchCancel(event: EventTouch) {
        this.handleGlobalTouchEnd(event)
    }

    private registerTouchEvent() {
        if (!this._isRegisterTouchEvent) {
            this._isRegisterTouchEvent = true;

            input.on(Input.EventType.TOUCH_START, this.handleGlobalTouchStart, this)
            input.on(Input.EventType.TOUCH_MOVE, this.handleGlobalTouchMove, this)
            input.on(Input.EventType.TOUCH_END, this.handleGlobalTouchEnd, this)
            input.on(Input.EventType.TOUCH_CANCEL, this.handleGlobalTouchCancel, this)
        }
    }

    private unregisterTouchEvent() {
        if (this._isRegisterTouchEvent) {
            this._isRegisterTouchEvent = false;
            input.off(Input.EventType.TOUCH_START, this.handleGlobalTouchStart, this)
            input.off(Input.EventType.TOUCH_MOVE, this.handleGlobalTouchMove, this)
            input.off(Input.EventType.TOUCH_END, this.handleGlobalTouchEnd, this)
            input.off(Input.EventType.TOUCH_CANCEL, this.handleGlobalTouchCancel, this)
        }
    }

    onEnable() {
        this.registerTouchEvent()
    }

    onDisable() {
        this.unregisterTouchEvent();
    }

    private beginSelect() {
        if (this._isShowSelect) return;
        this._isShowSelect = true;
        console.log("begin Select");
        this._labelImpl.showSelectLayer();
        this.node.emit(XLabelEvent.TOUCH_SELECT_BEGIN);
    }
    private endSelect() {
        if (!this._isShowSelect) return;
        console.log("endSelect");
        this._isShowSelect = false;
        this._labelImpl.hideSelectLayer();
        this.node.emit(XLabelEvent.TOUCH_SELECT_END);
    }

    private updateSelect(begin: boolean, offset: Readonly<Vec2>) {
        if (!this._isShowSelect) {
            return;
        }
        console.log("updateSelect", offset);
        this._labelImpl.updateSelectLayer(begin, offset)
        this.node.emit(XLabelEvent.TOUCH_SELECT_UPDATE, begin, offset);
    }

    update(dt: number) {
        if (this._touchBeginTime > 0) {
            this._touchBeginTime -= dt;
            if (this._touchBeginTime <= 0) {
                this._touchBeginTime = -1;
                this.beginSelect();
            }
        }
    }
}
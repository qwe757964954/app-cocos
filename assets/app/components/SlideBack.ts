import { _decorator, CCInteger, CCString, Component, Node, UITransform, Vec3 } from 'cc';
const { ccclass, property, requireComponent} = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Log, uiMgr } from 'bos/exports';
import { GestureRecognizer, GesRecognizerEvent, RecognizerState } from 'bos/framework/recognizer/GestureRecognizer';
import { EdgePanGestureRecognizer, GesEdgePanEvent } from 'bos/framework/recognizer/EdgePanGestureRecognizer';

@ccclass('SlideBack')
@requireComponent(EdgePanGestureRecognizer)
export class SlideBack extends XComponent {
    @property({type: CCString})
    public threshold: string = ""

    private _threshold: number

    private _preLocation: Vec3
    private _preTransform: UITransform
    private _prePage: Node

    private _topLocation: Vec3
    private _topTransform: UITransform
    private _topPage: Node

    private _sliding: boolean

    onLoad() {
        Log.d("SlideBack.onLoad")

        if (this.threshold[this.threshold.length-1] == "%") {
            let pertStr = this.threshold.substring(0, this.threshold.length-1)
            let pertVal = parseInt(pertStr, 10)
            this._threshold = this.getComponent(UITransform).contentSize.x * (pertVal/100)
        } else {
            this._threshold = parseInt(this.threshold, 10)
        }

        this.node.on(GesRecognizerEvent.EdgePanEvent, (event: GesEdgePanEvent)=>{
            // Log.d("SlideBack.onEdgePanEvent", event.state)
            if (event.state == RecognizerState.Begin) {
                this._sliding = true
                this.onSlideBegin(event)
            } else if(event.state == RecognizerState.Changed) {
                if (!this._sliding || !this._prePage) {
                    return
                }
                this.onSlideTo(event)
            } else {
                if (!this._sliding || !this._prePage) {
                    return
                }
                this._sliding = false
                this.onSlideEnd(event)
            }
        }, this)
    }

    onDestroy(): void {
        this.node.targetOff(this)
    }

    onSlideBegin(event: GesEdgePanEvent) {
        Log.d("SlideBack.onSlideBegin", uiMgr.getPageNum(), event)
        if (uiMgr.getPageNum() <= 1) {
            return
        }
        this._prePage = uiMgr.getPage(-2)
        this._prePage.active = true
        this._preTransform = this._prePage.getComponent(UITransform)
        this._preLocation = new Vec3(0, 0, 0)
        
        this._topPage = uiMgr.getPage(-1)
        this._topTransform = this._topPage.getComponent(UITransform)
        this._topLocation = new Vec3(0, 0, 0)

        this.translate(0)
    }

    private translate(offset: number) {
        this._preLocation.x = offset - this._preTransform.contentSize.x
        this._prePage.setPosition(this._preLocation)

        this._topLocation.x = offset
        this._topPage.setPosition(this._topLocation)
        // Log.d("SlideBack.translate", this._preLocation, this._topLocation)
    }

    onSlideTo(event: GesEdgePanEvent) {
        let offset =  event.getUILocation().x - event.getUIStartLocation().x
        this.translate(offset)
    }

    onSlideEnd(event: GesEdgePanEvent) {
        let offset =  event.getUILocation().x - event.getUIStartLocation().x
        Log.w("SlideBack.onSlideEnd", offset, this._threshold)
        this._preLocation.x = 0
        this._prePage.setPosition(this._preLocation)
        this._topLocation.x = 0
        this._topPage.setPosition(this._topLocation)
        if (offset >= this._threshold) {
            uiMgr.popPage()
        } else {
            this._prePage.active = false
        }
        this._prePage = null
        this._topPage = null
    }
}
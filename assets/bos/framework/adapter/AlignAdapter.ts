import { UITransform } from 'cc';
import { Widget } from 'cc';
import { _decorator, Component, Node } from 'cc';
const { ccclass, property, executeInEditMode } = _decorator;

enum Align {
    TOP = "top",
    LEFT = "left",
    RIGHT = "right",
    BOTTOM = "bottom",
}

@ccclass('AlignAdapter')
@executeInEditMode
export class AlignAdapter extends Component {
    @property(UITransform)
    private top: UITransform
    @property(UITransform)
    private left: UITransform
    @property(UITransform)
    private right: UITransform
    @property(UITransform)
    private bottom: UITransform
    
    private widget: Widget

    protected onLoad(): void {
        this.widget = this.node.getComponent(Widget)
        this.listen(Align.TOP, this.top)
        this.listen(Align.BOTTOM, this.bottom)
        this.listen(Align.LEFT, this.left)
        this.listen(Align.RIGHT, this.right)
    }

    protected onDestroy(): void {
        this.unListen(this.top)
        this.unListen(this.bottom)
        this.unListen(this.left)
        this.unListen(this.right)
    }

    listen(align: Align, transform: UITransform) {
        if (transform) {
            transform.node.on(Node.EventType.SIZE_CHANGED, ()=>{
                console.log("AlignAdapter...onSizeChanged", align, transform.node.name)
                this.refresh(align, transform)
            }, this)
            this.refresh(align, transform)
        }
    }

    unListen(transform: UITransform) {
        transform?.node?.targetOff(this)
    }

    refresh(align: Align, transform: UITransform) {
        switch (align) {
            case Align.TOP:
                this.widget.top = transform.contentSize.height
                break
            case Align.LEFT:
                this.widget.left = transform.contentSize.width
                break
            case Align.BOTTOM:
                this.widget.bottom = transform.contentSize.height
                break
            case Align.RIGHT:
                this.widget.right = transform.contentSize.width
                break
        }
        // console.log("AlignAdapter...refresh", align, transform.contentSize.height, this.widget.top)
    }
}


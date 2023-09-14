import { Widget } from 'cc';
import { UITransform } from 'cc';
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AutoSize')
export class AutoSize extends Component {

    @property(UITransform)
    private transform: UITransform

    @property(UITransform)
    private target : UITransform

    onLoad() {
        if(!this.target) {
            if (this.node.children.length == 0) {
                return
            }
            this.target = this.node.children[0].getComponent(UITransform)
        }
        this.target.node.on(Node.EventType.SIZE_CHANGED, ()=>{
            this.transform.setContentSize(this.target.contentSize)
        }, this)
    }

    protected onDestroy(): void {
        this.target.node.targetOff(this)
    }
}


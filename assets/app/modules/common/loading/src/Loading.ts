import { LoadingParams } from 'bos/framework/gui/UIMgr';
import { CCFloat, CCInteger, Color, Sprite, Tween, Vec3 } from 'cc';
import { tween } from 'cc';
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Loading')
export class Loading extends Component {
    @property(Sprite)
    loadingSp: Sprite

    @property(Sprite)
    bgMask: Sprite

    @property({type: CCFloat})
    delay: number

    private _bgColor: Color

    private _tween: Tween<Node>

    onLoad() {
        this._bgColor = this.bgMask.color
    }

    setup(params?: LoadingParams) {
        if (this.delay) {
            this.bgMask.color.set(Color.TRANSPARENT)
            this.loadingSp.node.active = false
            this.scheduleOnce(this.show, this.delay)
        } else {
            this.show()
        }
    }

    show() {
        this.bgMask.color = this._bgColor
        this.loadingSp.node.active = true
        this._tween = tween(this.loadingSp.node).by(1, { eulerAngles: new Vec3(0, 0, -360)}).repeatForever().start();
    }
}


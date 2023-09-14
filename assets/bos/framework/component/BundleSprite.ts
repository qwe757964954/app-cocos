import { _decorator, Component, Node, Sprite, SpriteFrame } from 'cc';
import { ResLoader } from '../loader/ResLoader';
import { Log } from 'bos/base/log/Log';
const { ccclass, property, requireComponent } = _decorator;

@ccclass('BundleSprite')
@requireComponent(Sprite)
export class BundleSprite extends Component {
    start() {

    }

    get spriteFrame(): SpriteFrame | null {
        let sprite = this.getComponent(Sprite);
        if (sprite) {
            return sprite.spriteFrame
        }
        return null
    }

    set spriteFrame(value: SpriteFrame | null | String) {
        if (typeof value === "string") {
            ResLoader.getInstance().loadSpriteFrame(value, (err, spriteFrame) => {
                if (this.node == null || this.node.isValid === false) {
                    return;
                }
                if (err) {
                    Log.w("load error")
                    return;
                }
                let sprite = this.getComponent(Sprite);
                if (sprite) {
                    sprite.spriteFrame = spriteFrame;
                }
            })
        } else if (value === null) {
            let sprite = this.getComponent(Sprite);
            if (sprite) {
                sprite.spriteFrame = null;
            }
        } else if (typeof value === "object" && value instanceof SpriteFrame) {
            let sprite = this.getComponent(Sprite);
            if (sprite) {
                sprite.spriteFrame = value;
            }
        }
    }

}
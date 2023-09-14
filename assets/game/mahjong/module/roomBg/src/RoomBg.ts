import { _decorator, Component, Node, Sprite, screen, Vec3, Vec2 } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';

@ccclass('RoomBg')
export class RoomBg extends XComponent {
    @property(Sprite)
    public bg: Sprite | null = null; 

    start(): void {
        let windowSize = screen.windowSize
        let scale = Math.max(Math.max(windowSize.height, windowSize.width) / 1024, Math.min(windowSize.height, windowSize.width) / 576) 
        if (scale > 1.88) {
            this.bg.node.scale = new Vec3(scale, scale)
        }
        else {
            this.bg.node.scale = new Vec3(1.88, 1.88)
        }

    }

    update(deltaTime: number) {

    }
}
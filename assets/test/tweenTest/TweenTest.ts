import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { tween } from 'cc';
import { UIOpacity } from 'cc';
import { Vec3 } from 'cc';

@ccclass('TweenTest')
export class TweenTest extends XComponent {
    @property(Node)
    testNode: Node = null;

    aaaaa: number = 0;

    start() {
        console.error('==start==')
        if (this.testNode) {
            // let scale = tween().to(1, { scale: new Vec3(3, 3, 3) })

            let aaa = tween()
                .to(2, { aaaaa: 10 }, {
                    onStart: () => {
                        console.log("onStart")
                    }, onUpdate: (target,ratio) => {
                        this.aaaaa = 10*ratio
                        console.log("onUpdate",target,ratio,this.aaaaa)
                    },
                    onComplete: () => {
                        console.log("onComplete")
                    }
                })
            tween(this.node).then(aaa).start()

            tween(this.testNode.getComponent(UIOpacity)).to(1, { opacity: 0 }).start()


            // tween(this.testNode).to(1, { scale: new Vec3(3, 3, 3) }).start()
        }
    }

    update(deltaTime: number) {

    }
}
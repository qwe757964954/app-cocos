import { _decorator, Component, Node } from 'cc';
import { NodeUtil } from 'bos/exports';
const { ccclass, property } = _decorator;

@ccclass('captureTest')
export class captureTest extends Component {
    start() {
        NodeUtil.renderToImage(this.node).then((captureFile) => {
            captureFile.saveToFile("asdasd.png")
        })
    }

    update(deltaTime: number) {
        
    }
}



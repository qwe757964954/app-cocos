import { Utils } from 'app/utils/Utils';
import { _decorator, Component, Node } from 'cc';
import { UITransform } from 'cc';
import { Vec3 } from 'cc';
import { tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TopViewOperate')
export class TopViewOperate extends Component {
    private content: Node;
    private maxHeight: number;
    private contentScale: Vec3 = new Vec3(1, 1, 1);
    private isShowing: boolean = false;
    onLoad() {
        this.content = Utils.getNodeByName(this.node, "content");
        this.maxHeight = this.node.getComponent(UITransform).height;
        let loading = Utils.getNodeByName(this.node, "loading");
        tween(loading).by(1, { eulerAngles: new Vec3(0, 0, -360) }).repeatForever().start();
    }
    /**
     * 缩放子节点
    */
    updateChildScale(value: number) {
        this.contentScale.x = value;
        this.contentScale.y = value;
        this.contentScale.z = value;
        this.content.scale = this.contentScale;
    }

    /**
     * 设置高度，并缩放子节点
    */
    setHeight(value: number) {
        if (value <= this.maxHeight) {
            this.isShowing = false;
            this.node.getComponent(UITransform).height = value;
            this.updateChildScale(value / this.maxHeight);
        } else {
            this.isShowing = true;
        }
    }

    /**
     * 检测是否可以显示
    */
    checkIsShowing() {
        return this.isShowing;
    }

    getCellHeight() {
        return this.maxHeight;
    }
}



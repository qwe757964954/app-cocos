import { Utils } from 'app/utils/Utils';
import { _decorator, Component, Node } from 'cc';
import { IAssetItem } from 'idl/tss/common/common_define';
import { GoodsCellCtr } from './GoodsCellCtr';
const { ccclass, property } = _decorator;

@ccclass('GoodsItemCtr')
export class GoodsItemCtr extends Component {
    updateView(list: IAssetItem[]) {
        let data: IAssetItem;
        let node: Node;
        for (let i = 0; i < 3; i++) {
            data = list[i];
            node = Utils.getNodeByName(this.node, "GoodsCell" + (i + 1));
            if (data) {
                node.active = true;
                this.updateSubView(data, node);
            } else {
                node.active = false;
            }
        }
    }

    /**
     * 显示节点
    */
    updateSubView(data: IAssetItem, node: Node) {
        node.getComponent(GoodsCellCtr).updateView(data);
    }
}



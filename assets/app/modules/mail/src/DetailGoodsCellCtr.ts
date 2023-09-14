import { NetImageEx } from 'app/components/NetImageEx';
import { Utils } from 'app/utils/Utils';
import { Label } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { IAssetItem } from 'idl/tss/common/common_define';
const { ccclass, property } = _decorator;

@ccclass('DetailGoodsCellCtr')
export class DetailGoodsCellCtr extends Component {
    @property({
        visible: true,
        type: Node,
    })
    private iconNode: Node = null!;

    @property({
        visible: true,
        type: Node,
    })
    private numNode: Node = null!;

    updateView(data: IAssetItem, index: number) {
        this.iconNode.getComponent(NetImageEx).setUrl(data.icon || "");
        this.numNode.getComponent(Label).string = Utils.formatNumWithX(data.amount);
    }
}



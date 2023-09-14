import { NetImageEx } from 'app/components/NetImageEx';
import { Utils } from 'app/utils/Utils';
import { Label } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { IAssetItem } from 'idl/tss/common/common_define';
const { ccclass, property } = _decorator;

@ccclass('GoodsCellCtr')
export class GoodsCellCtr extends Component {
    updateView(data: IAssetItem) {
        let icon = Utils.getNodeByName(this.node, "icon");
        let num = Utils.getNodeByName(this.node, "num");
        let title = Utils.getNodeByName(this.node, "title");
        icon.getComponent(NetImageEx).setUrl(data.img);
        num.getComponent(Label).string = data.amount + "";
        title.getComponent(Label).string = data.desc || "";
    }
}



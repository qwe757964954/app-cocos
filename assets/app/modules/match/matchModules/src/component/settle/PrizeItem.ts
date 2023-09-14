import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { SettleAsset } from 'app/domain/match/match/data/UserInfo';
import { NetImageEx } from 'app/components/NetImageEx';
import { Label } from 'cc';
import { Utils } from 'app/utils/Utils';

@ccclass('PrizeItem')
export class PrizeItem extends XComponent {
    @property(NetImageEx)
    prizeIcon : NetImageEx

    @property(Label)
    nameLabel : Label

    @property(Label)
    numLabel : Label

    updateView(prize : SettleAsset) {
        let asset = prize?.asset
        if (asset) {
            this.prizeIcon.setUrl(asset.icon)

            this.nameLabel.string = asset.name

            this.numLabel.string = Utils.formatNumWithX(asset.amount)
        }
    }
}
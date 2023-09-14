import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Label } from 'cc';
import { NetImageEx } from 'app/components/NetImageEx';
import { Utils } from 'app/utils/Utils';

@ccclass('RPrizeItem')
export class RPrizeItem extends XComponent {
    @property(Label)
    numberLabel : Label

    @property(NetImageEx)
    iconSprite : NetImageEx

    updateView(asset) {
        this.numberLabel.string = Utils.formatNumWithX(asset.amount)

        this.iconSprite.setUrl(asset.icon)
    }
}
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { AssetItem } from 'app/domain/match/config/PrizeConfig';
import { RPrizeItem } from './RPrizeItem';
import { RichText } from 'cc';

@ccclass('JackpotItem')
export class JackpotItem extends XComponent {
    @property(RPrizeItem)
    prizeItem : RPrizeItem

    @property(RichText)
    tipsLabel : RichText

    asset : AssetItem

    updateView(asset : AssetItem, base : AssetItem[]) {
        this.asset = asset

        this.prizeItem.updateView(asset)

        for (let index = 0; index < base.length; index++) {
            const element = base[index];
            if (element.id == asset.id && element.type == asset.type) {
                let add = Math.max(0, asset.amount - element.amount)
                this.tipsLabel.string = `<size=45><color=#CDB18D>${asset.name}已增加</size></color><b><size=45><color=#FFF4D4>${add}</size></color></b><size=45><color=#CDB18D>个</size></color>`
                break
            }
        }
    }
}
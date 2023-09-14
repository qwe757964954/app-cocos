import { eventSystem, uiMgr } from 'bos/exports';
import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
import { DonateItem } from './DonateItem';
const { ccclass, property } = _decorator;

enum DonateType {
    Diamond,
    Gold,
    Heart,
    Ticket,
}

@ccclass('DonateDialog')
export class DonateDialog extends Component {

    @property({ type: Prefab })
    donateItem: Prefab | null = null

    @property({ type: Node })
    donateList: Node | null = null

    start() {
        this.updateView()
    }

    //获取打赏道具类型
    getDonateType() {
        return DonateType
    }

    updateView() {
        if (!this.donateItem) return
        if (!this.donateList) return
        let donateType = this.getDonateType()
        for (let i = 0; i < Object.keys(donateType).length / 2; i++) {
            let item = instantiate(this.donateItem)
            this.donateList.addChild(item)
            item.getComponent(DonateItem).setDonateType(donateType[i])
        }
    }

    clickClose() {
        uiMgr.popPopup()
    }
}
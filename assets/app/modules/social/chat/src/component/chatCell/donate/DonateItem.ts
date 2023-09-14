import { propMgr } from 'app/domain/props/PropMgr';
import { eventSystem, uiMgr } from 'bos/exports';
import { _decorator, Component, Label, Node } from 'cc';
import { ItemType } from 'idl/tss/common/common_define';
const { ccclass, property } = _decorator;

@ccclass('DonateItem')
export class DonateItem extends Component {

    @property({ type: Node })
    item: Node | null = null

    @property({ type: Node })
    currency: Node | null = null

    @property({ type: Label })
    price: Label | null = null

    donateType: string = ""
    start() {

    }

    setDonateType(type: string) {
        this.donateType = type
        //根据type设置对应的道具
        this.updateItem()
    }

    //更新道具
    updateItem() {
        if (!this.item) return
        if (!this.currency) return
        if (!this.price) return
        //根据type设置对应的道具
        // this.item.getComponent(Sprite).spriteFrame =
        // this.currency.getComponent(Sprite).spriteFrame =
        // this.price.string =
        this.item.getChildByName("Label").getComponent(Label).string = this.donateType
    }


    //点击打赏
    clickDonate() {
        // let priceAsset   //priceAsset ，打赏道具的货币类型及价格
        // let myUserModel //getMyUserModel ，获取自己的资产--金币，钻石，奖券，积分
        // let currencyType = priceAsset.currencyType
        // let price = priceAsset.price
        // if (price > myUserModel[currencyType]) {
        // uiMgr.showToast(currencyType + "不足,打赏失败")
        // return
        // }
        // UserLargessByMall(priceAsset, 1, "打赏") //UserLargessByMall，打赏接口
        eventSystem.emit("ChatSendReward", this.donateType)
        uiMgr.popPopup()
    }

}



import { Sprite } from 'cc';
import { Label } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { BagData, BoxData } from '../config/config';
import { NetImageEx } from 'app/components/NetImageEx';
import { UIMgr } from 'bos/framework/gui/UIMgr';
const { ccclass, property } = _decorator;

@ccclass('SendGoodsCtr')
export class SendGoodsCtr extends Component {
    @property({ type: Label })
    propNum: Label | null = null;

    @property({ type: Sprite })
    propIcon: Sprite | null = null;

    maxNum: number;

    num: number = 1;

    /**
     * 点击修改回调
    */
    confirmCallBack: Function;
    product: number = 1;

    updateView(data: BagData, product: number = 1) {
        this.product = product;
        this.num = 1;
        this.maxNum = data.num;
        this.propNum.string = this.num.toString();
        if (data.itemType == "buff") {
            this.propIcon.getComponent(NetImageEx).setUrl(data.img || "");
        } else {
            this.propIcon.getComponent(NetImageEx).setUrl(data.icon || "");
        }
    }

    setPropNum(value: number) {
        this.num = value;
        this.propNum.string = this.num.toString();
    }

    /**
     * 增加
    */
    addNum() {
        let n: number = this.num + 1;
        if (n > this.maxNum) {
            n = this.maxNum;
        }
        this.setPropNum(n);
    }
    /**
     * 减少
    */
    subNum() {
        let n: number = this.num - 1;
        if (n < 1) {
            n = 1;
        }
        this.setPropNum(n);
    }
    /**
     * 确认
    */
    ok() {
        if (this.confirmCallBack) {
            this.confirmCallBack(this.num);
        }
        UIMgr.getInstance().popPopup();
    }
    /**
     * 取消
    */
    cancel() {
        UIMgr.getInstance().popPopup();
    }
}



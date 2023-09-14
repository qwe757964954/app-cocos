import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { PrizeCenterDetail } from './PrizeCenterDetail';
import { DeliveryChannelType } from 'idl/tss/hall/common/prizemall';

@ccclass('BottomOpt')
export class BottomOpt extends XComponent {
    @property(Node)
    addCart:Node = null!;

    @property(Node)
    bigBtn:Node = null!;

    init(mainUI:PrizeCenterDetail){
        let sku = mainUI.getSelectSKU();
        let {deliveryChannel} = sku;

        let isCanAddCart = false;
        if ((deliveryChannel == DeliveryChannelType.DeliveryChannelTypeOfflineExpress) || (deliveryChannel == DeliveryChannelType.DeliveryChannelTypeOfflineSelfOrExpress)){
            isCanAddCart = true;
        }
        this.addCart.active = isCanAddCart;
        this.bigBtn.active = !isCanAddCart;
    }
    

}
import { _decorator, Component, Node ,Label} from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import {IOrder,OrderState,DeliveryState} from 'idl/tss/hall/exchangeorder.v7';
import { PrizeUtil } from '../../utils/PrizeUtil';
@ccclass('PhoneNum')
export class PhoneNum extends XComponent {
    @property(Label)
    phone:Label = null!;

    @property(Label)
    status:Label = null!;

    updateView(order:IOrder){
        let receiverAddr = order.receiverAddr;
        this.phone.string = receiverAddr.contactNumber ?? '***********';

        if (order.orderState == OrderState.OrderStateSuccess){
            if (order.deliveryState == DeliveryState.DeliveryStateReceiptedSuccess){
                this.status.string = `${PrizeUtil.formatDate2(order.createAt *1000)}  已充值到该手机号`;
            }else {
                this.status.string = '充值失败(运营商维护)';
            }
        }else if ((order.orderState == OrderState.OrderStateClose)||(order.orderState == OrderState.OrderStateCancel)){
            this.status.string = '订单已关闭';
        }
    }
}
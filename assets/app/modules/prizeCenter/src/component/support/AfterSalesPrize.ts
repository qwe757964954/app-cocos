import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { IOrderItem } from 'idl/tss/hall/exchangeorder.v7';
import { Label } from 'cc';
import { OrderPrizeItem } from '../common/OrderPrizeItem';


@ccclass('AfterSalesPrize')
export class AfterSalesPrize extends XComponent {
    @property(OrderPrizeItem)
    icon:OrderPrizeItem = null!;

    @property(Label)
    prizeName:Label = null!;

    @property(Label)
    specLab:Label = null!;

    @property(Label)
    amount:Label = null!;

    updateView(orderItem:IOrderItem){
        this.icon.setUrl(orderItem.image);
        this.prizeName.string = orderItem.name;
        this.specLab.string = orderItem.spec;
        this.amount.string = 'x' + orderItem.amount.toString();
    }
}
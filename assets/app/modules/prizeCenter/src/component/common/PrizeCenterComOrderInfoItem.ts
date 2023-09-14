import { _decorator, Component, Node ,Label} from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import {PrizeCenterComOrderPrice} from './PrizeCenterComOrderPrice';
import {PaymentPrice,PreOrderItem,ComputeSinglePrice} from'../../interfaceData/define';
import { PrizeUtil } from '../../utils/PrizeUtil';
import { Log } from 'bos/exports';
import { NetImageEx } from 'app/components/NetImageEx';
import * as ExchangeOrderPKG from 'idl/tss/hall/exchangeorder.v7';
@ccclass('PrizeCenterComOrderInfoItem')
export class PrizeCenterComOrderInfoItem extends XComponent {
    @property(Label)
    nameLab:Label = null!;

    @property(Label)
    specLab:Label = null!;

    @property(Label)
    numLab:Label = null!;

    @property(Node)
    unitPrice:Node = null!;

    @property(Node)
    totalPrice:Node = null!;

    @property(Node)
    prizeIcon:Node = null!;

    start() {

    }

    //用于售后
    init( order:ExchangeOrderPKG.IOrder){
        let orderItem = order.orderItem[0];
        this.nameLab.string = orderItem.name;
        this.specLab.string = orderItem.spec ?? '';
        this.numLab.string = `x ${orderItem.amount.toString()}`;
        (this.unitPrice.getComponent('PrizeCenterComOrderPrice') as PrizeCenterComOrderPrice)!.init(orderItem?.actualUnit);

        let result = PrizeUtil.getPriceByOrder(order);
        (this.totalPrice.getComponent('PrizeCenterComOrderPrice') as PrizeCenterComOrderPrice)!.init(result);
        this.prizeIcon.getComponent(NetImageEx).setUrl(orderItem.image);
    }
    //用户售前
    initPreSale( preOrderItem:PreOrderItem){
        let sku = preOrderItem.sku
        this.nameLab.string = sku.name;
        let specStr = (()=>{
            let labText = ''
            for (const v of sku?.spec) {
                labText = labText + v.nameCN  + " " + v.valueCN  + " "
            }
            return labText;
        })();
        this.specLab.string = specStr;
        let mallOrderItem = preOrderItem.mallOrderItem;
        let actualUnitPrice = mallOrderItem.actualUnitPrice;
        this.numLab.string = `x ${mallOrderItem.amount.toString()}`;
        this.prizeIcon.getComponent(NetImageEx).setUrl(sku.showImages[0]);
        (this.unitPrice.getComponent('PrizeCenterComOrderPrice') as PrizeCenterComOrderPrice)!.init(actualUnitPrice);
        let total = PrizeUtil.getTotalBySingle(actualUnitPrice,mallOrderItem.amount);
        (this.totalPrice.getComponent('PrizeCenterComOrderPrice') as PrizeCenterComOrderPrice)!.init(total);
    }

    update(deltaTime: number) {

    }
}
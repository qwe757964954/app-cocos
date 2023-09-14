import { _decorator, Component, Node ,instantiate} from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { ScrollView } from 'cc';
import { Prefab } from 'cc';
import { Log } from 'bos/exports';
import { CreateOrderParams } from '../../interfaceData/define';
import {PrizeCenterComOrderInfoItem} from '../common/PrizeCenterComOrderInfoItem'

@ccclass('PreOrderList')
export class PreOrderList extends XComponent {
    @property(ScrollView)
    scrollView:ScrollView = null!;

    @property(Prefab)
    item:Prefab = null!;

    setup(params){
        Log.w("PreOrderList",params)
        this.updateView(params.createOrderParams);
    }

    updateView(createOrder:CreateOrderParams){
        this.scrollView.content!.removeAllChildren();
        createOrder.preOrderItem.forEach((preItem)=>{   
            let item = instantiate(this.item);
            this.scrollView.content!.addChild(item);
            (item.getComponent(PrizeCenterComOrderInfoItem) as PrizeCenterComOrderInfoItem)!.initPreSale(preItem);
        })
    }

}
import { _decorator, Component, Label, Node,ScrollView,Prefab,instantiate} from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import {CreateOrderParams,PreOrderItem,ComputeSinglePrice} from "../../interfaceData/define";
import {PrizeCenterComOrderPrice} from '../common/PrizeCenterComOrderPrice';
import {PrizeUtil} from '../../utils/PrizeUtil';
import {OrderPrizeItem} from '../common/OrderPrizeItem';
@ccclass('PrizeCenterPrizeList')
export class PrizeCenterPrizeList extends XComponent {
    @property(ScrollView)
    scrollView: ScrollView = null!;

    @property(Prefab)
    tabItem:Prefab = null!;

    @property(Label)
    numLab: Label = null!;

    @property(Node)
    totalPrice:Node = null!;

    init(createOrderParams:CreateOrderParams) {
        this.scrollView.content!.removeAllChildren();
        createOrderParams.preOrderItem.forEach(preOrderItem => {
            let item = instantiate(this.tabItem);
            this.scrollView.content!.addChild(item);
            (item.getComponent(OrderPrizeItem) as OrderPrizeItem)!.setUrl(preOrderItem.sku.showImages[0]);    
        });
        
        this.numLab.string = `共${createOrderParams.preOrderItem.length}件`;


        let computeSinglePrice:Array<ComputeSinglePrice> = [];
        for (const itemData of createOrderParams.preOrderItem) {
            let temp:ComputeSinglePrice = {
                amount:itemData.mallOrderItem.amount,
                pricePlan:PrizeUtil.getPricePlanBySKU(itemData.mallOrderItem.planType,itemData.sku),
            }
            computeSinglePrice.push(temp)
        }
        //计算总价
        let result = PrizeUtil.computePaymentPrice(computeSinglePrice);
        (this.totalPrice.getComponent('PrizeCenterComOrderPrice') as PrizeCenterComOrderPrice)!.setTotalPrize(result); 
    }

    update(deltaTime: number) {

    }
}
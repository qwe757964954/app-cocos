import { _decorator, Component, Node,Label, Sprite} from 'cc';
const { ccclass, property,menu } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { PrizeCenterDetail } from './PrizeCenterDetail';
import { Log } from 'bos/exports';
import {PrizeCenterComOrderPrice} from '../common/PrizeCenterComOrderPrice';
import {PrizeUtil} from '../../utils/PrizeUtil';
import {ComputeSinglePrice} from'../../interfaceData/define';
import {IPricePlan}  from 'idl/tss/hall/prizemall.v2';
@ccclass('PrizeCenterBuyWay')
@menu('prizeCenter/prizeDetail/PrizeCenterBuyWay')
export class PrizeCenterBuyWay extends XComponent {
    @property(Label)
    priceLab:Label = null!;

    @property(Node)
    priceItem:Label = null!;

    @property(Node)
    selectFlag:Node = null!;

    @property(Node)
    unSelectFlag:Node = null!;

    pricePlan:IPricePlan = null!;
    private mainUI:PrizeCenterDetail = null!;

    selectState = false;

    start() {

    }
    init(pricePlan:IPricePlan,mainUI:PrizeCenterDetail) {
        this.mainUI = mainUI;
        this.pricePlan = pricePlan;
        let computeSinglePrice:ComputeSinglePrice = {
            pricePlan:pricePlan,
        }
        let price = PrizeUtil.getSinglePrize(computeSinglePrice);
        (this.priceItem.getComponent(PrizeCenterComOrderPrice) as PrizeCenterComOrderPrice)!.init(price);
    }

    setSelect(planType:number) {
        let select = this.pricePlan.type == planType;
        this.selectState = select;
        this.selectFlag.active = select;
        this.unSelectFlag.active = !select;
    }

    //支付方式选择
    onClickSelect() {
        if (this.selectState){
            return;
        }
        this.mainUI.switchBuyWay(this.pricePlan.type);
    }


}
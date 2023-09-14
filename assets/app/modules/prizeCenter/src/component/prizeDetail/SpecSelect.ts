import { _decorator, Component, Node,Prefab,Sprite,Label,instantiate} from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Log } from 'bos/exports';
import { SpecItem } from './SpecItem';
import { PrizeCenterDetail } from './PrizeCenterDetail';
import { NetImageEx } from 'app/components/NetImageEx';
import {PrizeUtil} from '../../utils/PrizeUtil';
import {ComputeSinglePrice} from'../../interfaceData/define';
import {PrizeCenterComOrderPrice} from '../common/PrizeCenterComOrderPrice';
import {PrizeCenterComNumSelect} from '../common/PrizeCenterComNumSelect';
import {OrderPrizeItem} from '../common/OrderPrizeItem';
import * as PrizeMallPKG from 'idl/tss/hall/prizemall.v2';
import { DeliveryChannelType } from 'idl/tss/hall/common/prizemall';
@ccclass('SpecSelect')
export class SpecSelect extends XComponent {

    @property(Node)
    prizeIcon:Node = null!;

    @property(Node)
    unitPrice:Node = null!;

    @property(Label)
    specLab:Label = null!;

    @property(Label)
    btnLab:Label = null!;

    @property(Prefab)
    specItem:Prefab = null!;

    @property(Node)
    specPanel:Node = null!;

    @property(Node)
    confirmBtn:Node = null!;

    @property(Node)
    cartBtn:Node = null!;

    @property(Node)
    buyBtn:Node = null!;

    @property(Node)
    numSelect:Node = null!;

    @property(Node)
    btnGroup:Node = null!;

    specItems:Node[] = [];

    merchandise:PrizeMallPKG.IMerchandise = null!;
    optTag = '';

    mainUI:PrizeCenterDetail = null!;

    init(merchandise:PrizeMallPKG.IMerchandise,mainUI:PrizeCenterDetail){
        this.mainUI = mainUI;
        this.merchandise = merchandise;
        this.initSpuSpec();
    }


    start() {

    }

    update(deltaTime: number) {

    }

    show(sku:PrizeMallPKG.ISKU,planType:number,opt:string){
        Log.w('show SpecSelect',opt)
        this.optTag = opt;

        //所有操作，需要显示购物车跟购买
        if (opt === 'all') {
            let {deliveryChannel} = sku;
            let isCanAddCart = false;
            if ((deliveryChannel == DeliveryChannelType.DeliveryChannelTypeOfflineExpress) || (deliveryChannel == DeliveryChannelType.DeliveryChannelTypeOfflineSelfOrExpress)){
                isCanAddCart = true;
            }
            if (isCanAddCart){
                this.confirmBtn.active = false;
                this.cartBtn.active = true;
                this.buyBtn.active = true;
                this.btnGroup.active = true;
            }else{
                this.confirmBtn.active = true;
                this.cartBtn.active = false;
                this.buyBtn.active = false;
                this.btnLab.string = '立即购买';
                this.optTag = 'buy';
                this.btnGroup.active = false;
            }
        }else {
            this.confirmBtn.active = true;
            this.cartBtn.active = false;
            this.buyBtn.active = false;
            this.btnGroup.active = false;
        }
        this.updateSku(sku,planType);
    }

    updateSku(sku:PrizeMallPKG.ISKU,planType:number){
        //匹配默认的规格(productVariant)
        for(let i = 0; i < this.merchandise.spec.length; i ++ ){
            let productVariant = this.merchandise.spec[i];
            //规格组(SpecificValue)
            for(let j = 0; j < productVariant.values.length; j ++ ){
                let specificValue = productVariant.values[j];
                //当前商品的（SKUSpecific）
                for(let m = 0; m < sku.spec.length; m ++ ){
                    let skuSpecific =  sku.spec[m];
                    if (skuSpecific.value == specificValue.value) {
                        this.specItems[i].getComponent(SpecItem).setSelectItem(skuSpecific.value);
                    }
                }
            }
        }

        //base
        (this.prizeIcon.getComponent(OrderPrizeItem) as OrderPrizeItem)!.setUrl(sku.showImages[0]);
        let labText = '已选:  '
        for (const v of sku?.spec) {
            labText = labText + v.nameCN  + " " + v.valueCN  + " "
        }
        this.specLab.string = labText;

        //价格
        let pricePlan =  PrizeUtil.getPricePlanBySKU(planType,sku);
        let computeSinglePrice:ComputeSinglePrice = {
            pricePlan:pricePlan,
        }
        let price = PrizeUtil.getSinglePrize(computeSinglePrice);
        (this.unitPrice.getComponent(PrizeCenterComOrderPrice) as PrizeCenterComOrderPrice)!.init(price);
        this.updateNumSelect();
    }
    

    updateNumSelect(value?:number){
        let defaultNum = this.mainUI.getSelectNum();
        this.numSelect.getComponent(PrizeCenterComNumSelect).setCurValue(defaultNum);
    }

    //显示spu的规格信息
    initSpuSpec(){
        this.specPanel.removeAllChildren();
        this.specItems = [];
        for(let i = 0; i < this.merchandise.spec.length; i ++ ){
            let item = instantiate(this.specItem);
            this.specPanel.addChild(item);
            (item.getComponent(SpecItem) as SpecItem)!.init(this.merchandise.spec[i],this);
            this.specItems.push(item);
        }
    }

        //item回调
    onEventValue(value:string){
        Log.w('specificValue',value);
        //是否用新的sku
        for (const sku of this.merchandise.product) {
            for (const specified of sku.spec) {
                if (value === specified.value){
                    //回调给mainUI
                    this.mainUI.onSpecSelect(sku);
                    return
                }
            }
        }
    }

    onClickConfirm(){
        Log.w('onClickConfirm',this.optTag);
        this.mainUI.onEventOpt(this.optTag);
        this.node.active = false;
    }

    onClickOpt(event: Event, customEventData: string){
        Log.w('onClickOpt',customEventData);
        this.mainUI.onEventOpt(customEventData);
        this.node.active = false;
    }
    
    onClickChangeNum(num:number){
        this.mainUI.onEventChangeNum(num);
    }

    onClickHide(){
        this.node.active = false;
    }
}
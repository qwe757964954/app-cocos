import { _decorator, Component, Label, Node, Sprite } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { PrizeCenterShopCarList,CarItemData } from './PrizeCenterShopCarList';
import {PrizeCenterComOrderPrice} from '../common/PrizeCenterComOrderPrice';
import { Log,NodeUtil} from 'bos/exports';
import {PrizeCenterComNumSelect} from '../common/PrizeCenterComNumSelect';
import { BundleSprite } from 'bos/framework/component/BundleSprite';
import {PrizeUtil} from '../../utils/PrizeUtil';
import {ComputeSinglePrice} from'../../interfaceData/define';
import {OrderPrizeItem} from '../common/OrderPrizeItem';
import { Utils } from 'app/utils/Utils';
@ccclass('PrizeCenterCarItem')
export class PrizeCenterCarItem extends XComponent {
    @property(Label) 
    prizeName:Label = null!;

    @property(Label) 
    prizeDesc:Label = null!;

    @property(Node)
    totalUnitPrice:Node = null!;

    @property(Sprite)
    selectImg:Sprite = null!;

    @property(Node)
    numSelect:Node = null!;

    @property(Node)
    iconNode:Node = null!;


    delegateUI:PrizeCenterShopCarList = null!;
    carItemData:CarItemData = null!;

    prizeNum = 0;
    selectOn = false;

    start() {

    }

    init(carItem:CarItemData,delegate:PrizeCenterShopCarList) {
        this.delegateUI = delegate;
        this.carItemData = carItem;
        this.selectOn = carItem.isSelect;

        let sku = carItem?.userCartItem?.sku;
        this.prizeDesc.string = sku.desc;
        this.prizeName.string = sku.name;
        this.prizeNum = carItem?.userCartItem?.cartItem.amount;
        (this.iconNode.getComponent(OrderPrizeItem) as OrderPrizeItem)!.setUrl(sku.showImages[0]);
        (this.numSelect.getComponent('PrizeCenterComNumSelect') as PrizeCenterComNumSelect)!.setCurValue(this.prizeNum);

        this.setPrice();
        this.updateSelect(this.selectOn);
    }

    updateSelect(on:boolean){
        this.selectOn = on;
        let path = on ? 'common/button/Res_ResApp_Com_Btn_Checkbox_2':'common/button/Res_ResApp_Com_Btn_Checkbox_01';
        Utils.loadSpriteFromResources(this.selectImg, path);
    }

    setPrice() {
        let pricePlan = PrizeUtil.getPricePlanByCar(this.carItemData.userCartItem);
        let params:ComputeSinglePrice = {
            amount:this.prizeNum,
            pricePlan:pricePlan,
        };
        let allPrice = PrizeUtil.getSinglePrize(params);
        (this.totalUnitPrice.getComponent('PrizeCenterComOrderPrice') as PrizeCenterComOrderPrice)!.init(allPrice); 
    }

    update(deltaTime: number) {

    }

    onClickChangeNum(num:number){
        this.delegateUI.onEventChangeNum?.(this.carItemData.index,num);
    }

    onClickSelect(num:number){
        this.selectOn = !this.selectOn;
        this.updateSelect(this.selectOn);
        this.delegateUI.onEventSelect?.(this.carItemData.index,this.selectOn);
    }
}
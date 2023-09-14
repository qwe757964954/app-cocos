import { _decorator, Component, Node,Label, Prefab,instantiate, director} from 'cc';
const { ccclass, property,menu } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Log, uiMgr } from 'bos/exports';
import {PrizeCenterDetail} from "../prizeDetail/PrizeCenterDetail";
import {PrizeCenterComOrderPrice} from '../common/PrizeCenterComOrderPrice';
import {PrizeUtil} from '../../utils/PrizeUtil';
import {ComputeSinglePrice} from'../../interfaceData/define';
import {NetImageEx} from 'app/components/NetImageEx';
import { UIMgr } from 'bos/framework/gui/UIMgr';
import * as PrizeMallPKG from 'idl/tss/hall/prizemall.v2';
@ccclass('ListItem')

export class ListItem extends XComponent {
    @property(Label)
    nameLabel:Label = null!;

    @property(Node)
    priceNode:Node = null!;

    @property(Prefab)
    detailPage:Prefab = null!;

    @property(Node)
    icon:Node = null!;



    sku:PrizeMallPKG.ISKU = null!;

    start() {

    }

    init(sku:PrizeMallPKG.ISKU){
        this.sku = sku;
        this.nameLabel.string = sku?.name;
        (this.icon.getComponent(NetImageEx) as NetImageEx)!.setUrl(sku.listImage);
        this.setPrize(sku.prices);
    }

    setPrize(pricePlan:PrizeMallPKG.IPricePlan[]){
        let computeSinglePrice:ComputeSinglePrice = {
            pricePlan:pricePlan[0],
        }
        let price = PrizeUtil.getSinglePrize(computeSinglePrice);
        (this.priceNode.getComponent(PrizeCenterComOrderPrice) as PrizeCenterComOrderPrice)!.init(price);
    }

    onClickPrize(){
        if (this.sku){
            uiMgr.loadPage('prizeCenter@res/prefab/detail/PrizeCenterDetail',{params:{spuId:this.sku.SPUID,skuId:this.sku.ID}});
        }
    }

    update(deltaTime: number) {

    }
}
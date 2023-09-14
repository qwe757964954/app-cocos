import { _decorator, Component, Node,Prefab,instantiate} from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Log, uiMgr } from 'bos/exports';
import{ PaymentResult } from '../../interfaceData/define'
import { PrizeApp } from '../../../PrizeApp';
import {ListItem} from '../listPage/ListItem';
import { Label } from 'cc';
import { UIMgr } from 'bos/framework/gui/UIMgr';
import { DeliveryChannelType } from 'idl/tss/hall/common/prizemall';
import { PickAddress } from './PickAddress';
import {PickCodeInfo} from '../common/PickCodeInfo'

@ccclass('PayResult')
export class PayResult extends XComponent {
    @property(Node)
    addressNode:Node = null!;

    @property(Node)
    pickAddress:Node = null!;

    @property(Node)
    codeInfo:Node = null!;

    @property(Node)
    prizePanel:Node = null!;

    @property(Prefab)
    skuItem:Prefab = null!;

    @property(Label)
    receiverInfo:Label = null!;

    @property(Label)
    addrDesc:Label = null!;

    paymentResult:PaymentResult = null;

    setup( params){
        Log.w("PayResult",params.paymentResult);
        this.paymentResult = params.paymentResult;
        this.setAddress();
        this.setRecommend();
    }

    setAddress(){
        let {deliveryChannel,addr,supplier,token} = this.paymentResult;
        this.addressNode.active = false;
        this.pickAddress.active = false;
        this.codeInfo.active = false;
        if (deliveryChannel == DeliveryChannelType.DeliveryChannelTypeOfflineSelfPickUp){//自提
            this.pickAddress.active = true;
            this.pickAddress.getComponent(PickAddress)!.init(supplier?.addr);
            this.codeInfo.active = true;
            this.codeInfo.getComponent(PickCodeInfo)!.initQR(token);
        }else if(deliveryChannel == DeliveryChannelType.DeliveryChannelTypeOfflineExpress){
            this.addressNode.active = true;
            this.receiverInfo.string = `${addr.receiver}  ${addr.contactNumber}`;
            this.addrDesc.string = `${addr.province}${addr.city}${addr.region}${addr.addr}`;
        }
    }

    async setRecommend(){
        let tab = await PrizeApp.PrizeMgr.getListTab();
        let list = await PrizeApp.PrizeMgr.getPrizeList({page:1,pageSize:4,tabID:tab[0].ID,sort:'-common_info.priority,begin_at,_id'});
        this.prizePanel.removeAllChildren();
        for (const sku of list.sku) {
            let item = instantiate(this.skuItem);
            this.prizePanel!.addChild(item);
            (item.getComponent(ListItem) as ListItem)!.init(sku);     
        }
    }

    onClickDetail(){
        if(this.paymentResult.orderIDs.length == 1){
            (async(ID:string)=>{
                let order = await PrizeApp.PrizeMgr.getOrderByID({orderID:ID});
                uiMgr.loadPage('prizeCenter@res/prefab/order/PrizeCenterOrderDetail',{
                    params:order,
                });
            })(this.paymentResult.orderIDs[0]);
        }else{
            uiMgr.loadPage('prizeCenter@res/prefab/order/PrizeCenterOrderList');
        }
    }
    onClickGoToShop(){
        uiMgr.loadPage('prizeCenter@res/prefab/list/PrizeListMain');
    }
}
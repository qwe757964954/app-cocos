import { _decorator, Component, Node ,ScrollView} from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import {CreateOrderParams,PreOrderItem} from "../../interfaceData/define";
import { App } from "app/App";
import { PrizeApp } from '../../../PrizeApp';
import { Decorator, Log, uiMgr } from 'bos/exports';

import {PrizeCenterComOrderInfoItem } from '../common/PrizeCenterComOrderInfoItem';
import {PrizeCenterPrizeList} from './PrizeCenterPrizeList';
import { Address } from './Address';
import{ PaymentResult} from '../../interfaceData/define';
import {PickAddr} from './PickAddr';
import * as PrizeMallPKG from 'idl/tss/hall/prizemall.v2';
import {ISupplier}  from 'idl/tss/hall/prizesupplier.v1';
import {IAddress} from 'idl/tss/hall/common/prizemall';
import { DeliveryChannelType } from 'idl/tss/hall/common/prizemall';
import { IShippingAddr } from 'idl/tss/hall/userinfo.v1';
import { InputPhone } from './InputPhone';

@ccclass('PrizeCenterConfirmOrder')
export class PrizeCenterConfirmOrder extends XComponent {
    createOrderParams:CreateOrderParams = null!;

    @property(Node)
    switchTab:Node = null!;

    @property(Node)
    addressNode:Node = null!;

    @property(Node)
    pickAddrNode:Node = null!;

    @property(Node)
    orderItemNode:Node = null!;

    @property(Node)
    prizeList:Node = null!;

    @property(InputPhone)
    inputPhone:InputPhone = null!;

    deliveryChannel = DeliveryChannelType.DeliveryChannelTypeUnknown;

    private _agreeProto = true;

    setup(params){
        Log.w("PrizeCenterConfirmOrder",params)
        this.init(params.createOrderParams);
    }

    init(createOrder:CreateOrderParams) {
        this.createOrderParams = createOrder;
        let {deliveryChannel} = createOrder;
        this.deliveryChannel = deliveryChannel;
        this.resetUI();
        this.updatePrizeInfo();
        if (deliveryChannel == DeliveryChannelType.DeliveryChannelTypeOfflineExpress){//快递
            this.reqDefaultAddr();
            this.addressNode.active = true;
        }else if (deliveryChannel == DeliveryChannelType.DeliveryChannelTypeOfflineSelfPickUp){//仅有自提
            this.pickAddrNode.active = true;
            this.pickAddrNode.getComponent(PickAddr)!.init(this.createOrderParams.preOrderItem[0].sku);
        }else if (deliveryChannel == DeliveryChannelType.DeliveryChannelTypeOnlinePhone){//话费
            this.inputPhone.node.active = true;
        }
    }

    updatePrizeInfo(){
        let preOrderItem = this.createOrderParams.preOrderItem;
        if(preOrderItem.length == 1){
            let preOrderItem =  this.createOrderParams.preOrderItem[0];
            this.orderItemNode.active = true;
            (this.orderItemNode.getComponent(PrizeCenterComOrderInfoItem) as PrizeCenterComOrderInfoItem)!.initPreSale(preOrderItem);
        }else{
            this.prizeList.active = true;
            (this.prizeList.getComponent(PrizeCenterPrizeList) as PrizeCenterPrizeList)!.init(this.createOrderParams);
        }
    }

    async reqDefaultAddr(){
        let resp = await PrizeApp.PrizeMgr.getAddressByID({ID:''});
        if(resp?.info){
            this.addressNode.getComponent(Address).init(resp.info);
        }else{
            let respList = await PrizeApp.PrizeMgr.getListAddress({page:1,pageSize:1});
            if(respList?.infos[0]){
                this.addressNode.getComponent(Address).init(respList.infos[0]);
            } 
        }
    }

    updateAddress(addr:IShippingAddr){
        this.addressNode.getComponent(Address).init(addr);  
    }

    updateSupplier(supplier:ISupplier){
        this.pickAddrNode.getComponent(PickAddr)?.updateView(supplier);
    }

    resetUI(){
        this.addressNode.active = false;
        this.orderItemNode.active = false;
        this.prizeList.active = false;
        this.switchTab.active = this.createOrderParams.deliveryChannel == DeliveryChannelType.DeliveryChannelTypeOfflineSelfOrExpress;
        this.pickAddrNode.active = false;
        this.inputPhone.node.active = false;
    }

    doExchange(){
        let deliveryChannel = this.createOrderParams.deliveryChannel;
        if (deliveryChannel == DeliveryChannelType.DeliveryChannelTypeOnlinePhone){
            let phoneNum = this.inputPhone.phoneNum;
            Log.w('doExchange phoneNum',phoneNum);
            if (phoneNum.length != 11){
                uiMgr.showToast('输入的手机号不对');
                return
            }
        }
        if (!this._agreeProto){
            uiMgr.showToast('请勾选同意《奖品兑换协议》');
            return
        }
        if ((this.deliveryChannel == DeliveryChannelType.DeliveryChannelTypeOfflineSelfPickUp) && (!this.pickAddrNode.getComponent(PickAddr)?.supplier)){
            uiMgr.showToast('没有选择自提点');
            return
        }
        this.createOrder();
    }

    async createOrder(){
        let mallOrderItems:PrizeMallPKG.IOrderItem[] = [];
        let supplier:ISupplier;
        if (this.deliveryChannel == DeliveryChannelType.DeliveryChannelTypeOfflineSelfPickUp){
            supplier = this.pickAddrNode.getComponent(PickAddr)?.supplier;
        }
        for (const preOrderItem of this.createOrderParams.preOrderItem) {
            if (supplier){
                preOrderItem.mallOrderItem.supplierID = supplier?.ID; 
            }
            mallOrderItems.push(preOrderItem.mallOrderItem);
        }
        let addr:IAddress = {};
        if (this.deliveryChannel == DeliveryChannelType.DeliveryChannelTypeOfflineExpress){
            addr = this.addressNode.getComponent(Address).getAddrInfo();
        }else if (this.deliveryChannel == DeliveryChannelType.DeliveryChannelTypeOfflineSelfPickUp){
            //addr = this.pickAddrNode.getComponent(PickAddr).getAddrInfo();
        }else if(this.deliveryChannel == DeliveryChannelType.DeliveryChannelTypeOnlinePhone){
            addr.contactNumber = this.inputPhone.phoneNum;
        }
        let req:PrizeMallPKG.ICreateOrderReq = {
            uid:App.userMgr.loginUid,
            from:this.createOrderParams.from,
            items:mallOrderItems,
            addr:{
                receiver:addr?.receiver,
                contactNumber:addr?.contactNumber,
                province:addr?.province,
                city:addr?.city,
                region:addr?.region,
                addr:addr?.addr,
            },
        };
        Log.w('createOrder',req);
        let ret = await PrizeApp.PrizeMgr.createOrder(req);
        if (!ret.err){
            let resp = ret.resp;
            let result:PaymentResult = {
                batchID:resp.batchID,
                result:0,
                addr:addr,
                deliveryChannel:this.createOrderParams.deliveryChannel,
                orderIDs:resp.orderIDs,
                token:resp.orders?.[0].token,
                supplier:supplier
            };
            uiMgr.popPage();
            uiMgr.loadPage('prizeCenter@res/prefab/payResult/PayResult',{once:true,params:{paymentResult:result}});
        }else{
            Log.e('兑换失败了',ret.err)
        }
    }

    onClickSwitchDeliveryTab(event: Event, customEventData: string){
        Log.w('onClickSwitchDeliveryTab',customEventData);
    }

    onClickPrizeList(){
        uiMgr.loadPage('prizeCenter@res/prefab/confirmOrder/PreOrderList',{params:{createOrderParams:this.createOrderParams}});  
    }

    onClickChangeAddr(){
        let addr = this.addressNode.getComponent(Address).getAddrInfo();
        uiMgr.loadPage('prizeCenter@res/prefab/addressList/AddressList',{params:
            {delegateNode:this.node,
            opt:'select',
            defaultId:addr.ID,
        }});
    }

    onClickChangeSupplier(){
        let supplier = this.pickAddrNode.getComponent(PickAddr)?.supplier;
        uiMgr.loadPage('prizeCenter@res/prefab/pickUpAddressList/PickUpAddressList',{params:
            {delegate:this,
             skuId:this.createOrderParams.preOrderItem[0].sku.ID,
        }});
    }

    @Decorator.FunctionIntervalDelay(2)
    onClickCreateOrder(){
        this.doExchange();
    }

}
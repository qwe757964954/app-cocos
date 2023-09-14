import { _decorator, Component, Node,Label,instantiate} from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { PrizeCenterComOrderInfoItem } from '../common/PrizeCenterComOrderInfoItem';
import { PrizeUtil } from '../../utils/PrizeUtil';
import {PickAddress} from '../payResult/PickAddress';
import {PickCodeInfo} from '../common/PickCodeInfo';
import * as ExchangeOrderPKG from 'idl/tss/hall/exchangeorder.v7';
import { DeliveryChannelType } from 'idl/tss/hall/common/prizemall';
import { Prefab } from 'cc';
import { Log, NodeUtil, uiMgr } from 'bos/exports';
import { PhoneNum } from './PhoneNum';
import { TimeUtil } from 'bos/utils/TimeUtil';
import { IShippingAddr } from 'idl/tss/hall/userinfo.v1';
import { PrizeApp } from '../../../PrizeApp';

@ccclass('PrizeCenterOrderDetail')
export class PrizeCenterOrderDetail extends XComponent {
    @property(Label)
    recipient:Label = null!;

    @property(Label)
    address:Label = null!;

    @property(Node)
    orderItem:Node = null!;

    @property(Label)
    id:Label = null!;

    @property(Label)
    createTime:Label = null!;

    @property(Label)
    payTime:Label = null!;

    @property(Label)
    sendTime:Label = null!;

    @property(Node)
    addrNode:Node = null!;

    @property(Node)
    supplierNode:Node = null!;

    @property(Node)
    pickAddr:Node = null!;

    @property(Node)
    codeNode:Node = null!;

    @property(Node)
    cdkPanel:Node = null!;

    @property(Prefab)
    cdkItem:Prefab = null!;

    @property(Node)
    codeItem:Node = null!;

    @property(Node)
    phoneNum:Node = null!;

    @property(Node)
    modifyAddr:Node = null!;

    orderData:ExchangeOrderPKG.IOrder = null!;

    start() {

    }

    setup(params:any){
        this.resetUI();
        this.init(params);
    }

    resetUI(){
        this.addrNode.active = false;
        this.supplierNode.active = false;
        this.codeNode.active = false;
        this.cdkPanel.active = false;
        this.phoneNum.active = false;
    }

    init(order:ExchangeOrderPKG.IOrder){
        this.orderData = order;
        Log.w("order order",order);
        this.setGUI(order);
    }

    setGUI(order:ExchangeOrderPKG.IOrder){ 
        let orderItem = order?.orderItem[0];
        let {deliveryType} = orderItem;

        if (deliveryType == DeliveryChannelType.DeliveryChannelTypeOnlinePhone){//话费
            this.phoneNum.active = true;
            this.phoneNum.getComponent(PhoneNum)!.updateView(order);
        }else if (deliveryType == DeliveryChannelType.DeliveryChannelTypeOnlineCDK){//卡密
            let express = order.express?.[0];
            if (express){
                this.cdkPanel.active = true;
                let prizeName = orderItem.name
                express.CDKs.forEach((cdk)=>{
                    let item = instantiate(this.cdkItem);
                    this.cdkPanel.addChild(item);
                    NodeUtil.sendMessage(item,'updateView',cdk,prizeName);
                })
            }
        }else if (deliveryType == DeliveryChannelType.DeliveryChannelTypeOfflineExpress){//快递
            this.addrNode.active = true;
            let receiverAddr = order?.receiverAddr
            this.recipient.string = `${receiverAddr.receiver}  ${receiverAddr.contactNumber}`;
            this.address.string = `地址：${receiverAddr.province}${receiverAddr.city}${receiverAddr.region}${receiverAddr.addr}`;
            this.checkModify();
        }else if (deliveryType == DeliveryChannelType.DeliveryChannelTypeOnlineProp){//在线道具(邮件)

        }else if (deliveryType == DeliveryChannelType.DeliveryChannelTypeOfflineSelfPickUp){//自提
            this.supplierNode.active = true;
            this.pickAddr.getComponent(PickAddress)!.init(order.supplierAddr);
            this.codeNode.active = true;
            this.codeItem.getComponent(PickCodeInfo)!.initQR(order.token);
        }else if (deliveryType == DeliveryChannelType.DeliveryChannelTypeOfflineSelfOrExpress){///线下自提+快递

        }else if (deliveryType == DeliveryChannelType.DeliveryChannelTypeOnlinePropDirect){///在线道具(直接到包)

        }
        (this.orderItem.getComponent(PrizeCenterComOrderInfoItem) as PrizeCenterComOrderInfoItem)!.init(order);
        this.id.string = order.ID;
        this.createTime.string = PrizeUtil.formatDate(order.createAt*1000);
        let payState = order.payState;
        if (payState != ExchangeOrderPKG.PayState.PayStateSucceeded){
            this.payTime.string = '未支付';
            this.sendTime.string = '未发货';
            return;
        }
        let rmbPayAt = order?.RMBPayment?.payAt;
        if (rmbPayAt > 0){
            this.payTime.string = PrizeUtil.formatDate(rmbPayAt*1000);
        }else {//--再看看有没有虚拟道具的
            let payAt = order?.assetPayments?.[0].payAt;
            if (payAt){
                this.payTime.string = PrizeUtil.formatDate(payAt*1000);  
            }else {
                this.payTime.string = '未支付';
            }
        }

        let sendAt = order.express?.[0]?.createAt;
        if(sendAt > 0){
            this.sendTime.string = PrizeUtil.formatDate(sendAt*1000);  
        }else{
            this.sendTime.string = '未发货';
        }

    }

    async sendModifyAddress(address:IShippingAddr){
        let req:ExchangeOrderPKG.IModifyReceiveAddrReq = {
            orderID:this.orderData.ID,
            batchID:this.orderData.batchID,
            addr:{
                    receiver:address.receiver,
                    contactNumber:address.contactNumber,
                    province:address.province,
                    city:address.city,
                    region:address.region,
                    addr:address.addr,
                }
        }
        let ret = await this.promiseOne<any>(PrizeApp.PrizeMgr.modifyReceiveAddr(req));
        if (!ret.err){
            uiMgr.showToast('修改收货地址成功');
            this.recipient.string = `${address.receiver}  ${address.contactNumber}`;
            this.address.string = `地址：${address.province}${address.city}${address.region}${address.addr}`;
        }
    }

    updateAddress(addr:IShippingAddr){
        Log.w('updateAddress',addr); 
        this.sendModifyAddress(addr);
    }


    checkModify(){
        let {payState,deliveryState} =  this.orderData;
        this.modifyAddr.active = false;
        if ((payState == ExchangeOrderPKG.PayState.PayStatePending) ||(deliveryState == ExchangeOrderPKG.DeliveryState.DeliveryStatePending)){
            let dataTab = PrizeUtil.getTimeTab(this.orderData.createAt * 1000);
            let dateStr = `${dataTab.year}-${dataTab.month.toString().padStart(2, '0')}-${dataTab.day.toString().padStart(2, '0')}T23:59:59Z`;
            let endT = PrizeUtil.getTargetTimestamp(dateStr)
            if (TimeUtil.getTimestamp() < endT){
                this.modifyAddr.active = true;
            }
        }
    }

    onClickModifyAddr(){
        uiMgr.loadPage('prizeCenter@res/prefab/addressList/AddressList',{params:
            {delegateNode:this.node,
            opt:'select',
        }}); 
    }
}
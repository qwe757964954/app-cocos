import { _decorator, Component, Node,Label} from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';

import { Decorator, Log, NodeUtil, resLoader, uiMgr } from 'bos/exports';
import { DeliveryChannelType } from 'idl/tss/hall/common/prizemall';
import * as ExchangeOrderPKG from 'idl/tss/hall/exchangeorder.v7';
import { PrizeApp } from '../../../PrizeApp';
import { UIMgr } from 'bos/framework/gui/UIMgr';
import { director } from 'cc';
import { instantiate } from 'cc';
import { App } from 'app/App';
@ccclass('PrizeCenterComOrderOpt')
export class PrizeCenterComOrderOpt extends XComponent {
    @property(Node)
    payBtn:Node = null!;

    @property(Node)
    cancelBtn:Node = null!;

    @property(Node)
    confirmBtn:Node = null!;

    @property(Node)
    checkBtn:Node = null!;

    @property(Node)
    ruseBtn:Node = null!;

    @property(Node)
    salesBtn:Node = null!;

    @property(Node)
    processBtn:Node = null!;

    @property(Node)
    commentBtn:Node = null!;

    @property([Node])
    btnGrp: Node[] = [];

    @property(Label)
    descLab:Label = null!;

    mainUI:XComponent = null!;
    orderData:ExchangeOrderPKG.IOrder = null!;

    start() {

    }

    initUI(){
        for (const btn of this.btnGrp) {
            btn.active = false;
        }
        this.descLab.string = '';
    }

    init(order:ExchangeOrderPKG.IOrder,mainUI:XComponent){
        this.initUI();
        this.orderData = order;
        this.mainUI = mainUI;


        let OrderStateEnum = ExchangeOrderPKG.OrderState;
        let PayStateEnum = ExchangeOrderPKG.PayState;
        let DeliveryStateEnum = ExchangeOrderPKG.DeliveryState;
        let CommentStateEnum = ExchangeOrderPKG.CommentState;
        let AfterSupportStateEnum = ExchangeOrderPKG.AfterSupportState;

        let {orderState,payState,deliveryState,commentState,afterSupportState} =  order;
        let checkAfterSales = () =>{
            if ((afterSupportState == AfterSupportStateEnum.AfterSupportStateNever)||(afterSupportState == AfterSupportStateEnum.AfterSupportStateOpen)){
                this.salesBtn.active = true;
                let label = this.salesBtn.getChildByName('Label').getComponent(Label);
                label.string = afterSupportState == AfterSupportStateEnum.AfterSupportStateNever? '申请售后':'售后详情';
            }
        }

        if ((orderState == OrderStateEnum.OrderStateCancel) || (orderState == OrderStateEnum.OrderStateClose)) {//关闭订单
            let eventFlow = order?.eventFlow;
            let reason = '';
            if (eventFlow['EventTypeCustomerCancel']){
                reason = `个人取消原因:${eventFlow['EventTypeCustomerCancel']}`;
            }else if (eventFlow['EventTypeBusinessCancel']){
                reason = `商家取消原因:${eventFlow['EventTypeBusinessCancel']}`;
            }else if (eventFlow['EventTypeCustomerApplyRefund']){
                reason = `商家取消原因:${eventFlow['EventTypeCustomerApplyRefund']}`;
            }
            this.descLab.string = reason;
        }else if(payState == PayStateEnum.PayStatePending) {//待支付
            this.payBtn.active = true;
            this.cancelBtn.active = true;
        }else if ( deliveryState == DeliveryStateEnum.DeliveryStatePending){//待发货
            let orderItem = order.orderItem[0];
            if ((orderItem.deliveryType == DeliveryChannelType.DeliveryChannelTypeOfflineExpress) || (orderItem.deliveryType == DeliveryChannelType.DeliveryChannelTypeOnlineCDK)){
                this.ruseBtn.active = true     
            } 
            if (orderItem.deliveryType == DeliveryChannelType.DeliveryChannelTypeOfflineSelfPickUp){
                this.checkBtn.active = true
            }
            checkAfterSales();
        }else if ( deliveryState == DeliveryStateEnum.DeliveryStateWaitReceipt){//待收货
            this.confirmBtn.active = true
            let orderItem = order.orderItem[0];
            if (orderItem.deliveryType == DeliveryChannelType.DeliveryChannelTypeOfflineExpress){
            }
            checkAfterSales();
        }else if (orderState == OrderStateEnum.OrderStateSuccess){//待评价
            if (commentState == CommentStateEnum.CommentStatePending){
                this.commentBtn.active = true;
            }
            checkAfterSales();
        }
    }


    @Decorator.FunctionIntervalDelay(2)
    onClickOpt(event: Event, tag: string){
        Log.w('onClickOpt tag',tag);
        if (tag == 'confirm'){
            uiMgr.pushAlert({
                title : "确认收货",
                content : "确认成功收货吗？",
                ok : {
                    title : "确认",
                    callback : ()=>{
                        (async()=>{
                            let resp = await this.promiseOne<any>(PrizeApp.PrizeMgr.receiptByCustomer({orderID:this.orderData.ID}));
                            if (resp){
                                NodeUtil.sendMessageUpwards(this.node,'onUpdatePage');
                                PrizeApp.PrizeMgr.emit(PrizeApp.PrizeMgr.EventType.OrderStateChange);
                            }
                        })()
                    }
                },
                cancel : {
                    title : "取消",
                    callback : ()=>{
                    }
                }
            })
        }else if(tag == 'look'){
            uiMgr.loadPage('prizeCenter@res/prefab/order/PrizeCenterOrderDetail',{
                params:this.orderData,
            });     
        }else if(tag == 'rush'){
            uiMgr.showToast('已加急发货');
        }else if(tag == 'cancel'){
            let path = 'prizeCenter@res/prefab/order/CancelOrder' 
            resLoader.loadPrefab(path, (err, asset)=>{
                if (err) {
                    Log.e("load page err", err)
                    return
                }
                let node = instantiate(asset);
                uiMgr.pushPopup(node);
                NodeUtil.sendMessage(node,'init',this.orderData);
            })  
        }else if (tag == 'comment'){
            uiMgr.loadPage('prizeCenter@res/prefab/support/ApplyComment',{
                params:this.orderData,
            });    
        }else if (tag == 'sales'){
            let {afterSupportState} =  this.orderData;
            if (afterSupportState == ExchangeOrderPKG.AfterSupportState.AfterSupportStateNever){
                uiMgr.loadPage('prizeCenter@res/prefab/support/ApplyScales',{
                    params:this.orderData,
                });
            }else{//售后详情
                uiMgr.loadPage('prizeCenter@res/prefab/support/AfterSalesDetail',{
                    params:this.orderData,
                });
            }
   
        }
    }
}
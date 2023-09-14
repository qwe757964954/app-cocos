import { _decorator, Component, Node ,Label,director} from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { PrizeUtil } from '../../utils/PrizeUtil';
import {PrizeCenterComOrderInfoItem} from '../common/PrizeCenterComOrderInfoItem';
import {PrizeCenterComOrderPrice} from '../common/PrizeCenterComOrderPrice';
import {PrizeCenterComOrderOpt} from '../common/PrizeCenterComOrderOpt';

import { NodeUtil, resLoader, uiMgr } from 'bos/exports';
import { PrizeCenterOrderDetail } from './PrizeCenterOrderDetail';

import * as ExchangeOrderPKG from 'idl/tss/hall/exchangeorder.v7';
import { Color } from 'cc';
import { Widget } from 'cc';
import { PrizeApp } from '../../../PrizeApp';
@ccclass('PrizeCenterOrderItem')
export class PrizeCenterOrderItem extends XComponent {
    @property(Node)
    orderItem:Node = null!;

    @property(Label)
    creatAtLab:Label = null!;

    @property(Label)
    leftAtLab:Label = null!;

    @property(Label)
    payStateLab:Label = null!;

    @property(Node)
    optNode:Node = null!;

    @property(Node)
    delBtn:Node = null!;

    order:ExchangeOrderPKG.IOrder = null!;

    start() {

    }

    init(order:ExchangeOrderPKG.IOrder) {
        if(!order)return;
        this.delBtn.active = false;
        this.order = order;
        this.creatAtLab.string = PrizeUtil.formatDate2(order.createAt * 1000);

        (this.orderItem.getComponent('PrizeCenterComOrderInfoItem') as PrizeCenterComOrderInfoItem)!.init(order);
        (this.optNode.getComponent(PrizeCenterComOrderOpt) as PrizeCenterComOrderOpt)!.init(order,this);
        this.showOrderState(order);
    }

    showOrderState(order:ExchangeOrderPKG.IOrder){
        let OrderStateEnum = ExchangeOrderPKG.OrderState;
        let PayStateEnum = ExchangeOrderPKG.PayState;
        let DeliveryStateEnum = ExchangeOrderPKG.DeliveryState;
        let CommentStateEnum = ExchangeOrderPKG.CommentState;
        let AfterSupportStateEnum = ExchangeOrderPKG.AfterSupportState;

        let {orderState,payState,deliveryState,commentState,afterSupportState} =  order;
        let statusStr = '订单已失效';
        let color = new Color(128, 139, 171, 255);
        let widgetRight = 62;
        let fontSize = 42;
        if ((orderState == OrderStateEnum.OrderStateCancel) || (orderState == OrderStateEnum.OrderStateClose)) {//关闭订单
            statusStr = '订单已取消';
            color = new Color(128, 139, 171, 255);
            widgetRight = 145;
            fontSize = 36;
            this.delBtn.active = true;
        }else if(payState == PayStateEnum.PayStatePending) {//待支付
            statusStr = '待付款';
            color = new Color(252, 96, 57, 255);
        }else if ( deliveryState == DeliveryStateEnum.DeliveryStatePending){//待发货
            statusStr = '待发货';
            color = new Color(39, 214, 175, 255);
        }else if ( deliveryState == DeliveryStateEnum.DeliveryStateWaitReceipt){//待收货
            statusStr = '待收货';
            color = new Color(39, 214, 175, 255);
        }else if (orderState == OrderStateEnum.OrderStateSuccess){//待评价
            this.delBtn.active = true;
            statusStr = '订单完成';
            color = new Color(128, 139, 171, 255);
            widgetRight = 145;
            fontSize = 36;
        }else {
            statusStr = '订单已失效';
            color = new Color(128, 139, 171, 255);
            widgetRight = 145;
            fontSize = 36;
            this.delBtn.active = true;
        }
        this.payStateLab.string = statusStr;
        this.payStateLab.fontSize = fontSize;
        this.payStateLab.color = color;
        this.payStateLab.getComponent(Widget).right = widgetRight;
    }

    onClickDetail(){
        uiMgr.loadPage('prizeCenter@res/prefab/order/PrizeCenterOrderDetail',{
            params:this.order,
        });
    }
    onClickDel(){
        uiMgr.pushAlert({
            title : "删除订单",
            content : "确认要删除此订单吗？",
            ok : {
                title : "确认",
                callback : ()=>{
                    (async()=>{
                        let req:ExchangeOrderPKG.IDeleteOrderReq = {
                            orderID:this.order.ID,
                            batchID:this.order.batchID,
                        }
                        let resp = await this.promiseOne<any>(PrizeApp.PrizeMgr.deleteOrder(req));
                        if (resp){
                            NodeUtil.sendMessageUpwards(this.node,'onUpdatePage');
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
 
    }
}
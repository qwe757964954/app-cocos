import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { UIMgr } from 'bos/framework/gui/UIMgr';
import { Log, NodeUtil, uiMgr } from 'bos/exports';
import { PrizeApp } from '../../../PrizeApp';
import {IApplyCancelOrderReq, IOrder} from 'idl/tss/hall/exchangeorder.v7';


const Reason = ['不想购买了','信息填写错误需要修改（地址、联系人等）','款式/数量选择错误','对价格不满意，等下次降价再考虑']
@ccclass('CancelOrder')
export class CancelOrder extends XComponent {

    @property(Node)
    itemPanel:Node = null!;

    private _selectIndex = 0;
    private _orderData:IOrder = null!;

    onLoad(): void {
        for(let i = 0;i<4;i++){
            let item = this.itemPanel.getChildByName(`cancelReasonItem${i+1}`);
            if (item){
                NodeUtil.sendMessage(item,'updateView',i);
            }
        }
        this.updateSelect();
    }

    init(order:IOrder){ 
        this._orderData = order;
    }

    updateSelect(){
        for(let i = 0;i<4;i++){
            let item = this.itemPanel.getChildByName(`cancelReasonItem${i+1}`);
            if (item){
                NodeUtil.sendMessage(item,'updateStatus',i == this._selectIndex);
            }
        }
    }

    onEventChangeReason(index:number){
        this._selectIndex = index;
        this.updateSelect();
    }

    onClickPop(){
        uiMgr.popPopup();
    }

    onClickCancel(){
        (async()=>{
            let req:IApplyCancelOrderReq = {
                orderID:this._orderData.ID,
                batchID:this._orderData.batchID,
                reason:Reason[this._selectIndex] ?? Reason[0],
            }
            let resp = await this.promiseOne<any>(PrizeApp.PrizeMgr.applyCancelOrder(req));
            if (resp){
                uiMgr.popPopup();
                NodeUtil.sendMessageUpwards(this.node,'onUpdatePage');
            }
        })()
    }
}
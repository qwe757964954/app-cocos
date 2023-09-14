import { _decorator, Component, Node,instantiate } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import * as ExchangeOrderPKG from 'idl/tss/hall/exchangeorder.v7'
import { AfterSalesPrize } from './AfterSalesPrize';
import { uiMgr } from 'bos/exports';
import { PrizeApp } from '../../../PrizeApp';
import { Prefab } from 'cc';
import { AfterSalesItem } from './AfterSalesItem';

@ccclass('AfterSalesDetail')
export class AfterSalesDetail extends XComponent {
    @property(AfterSalesPrize)
    salesPrize:AfterSalesPrize = null!;

    @property(Node)
    recordPanel:Node = null!;

    @property(Prefab)
    recordItem:Prefab = null!;

    private _order:ExchangeOrderPKG.IOrder = null;

    setup(params:any){
        this._order = params;
        let orderItem = this._order.orderItem[0];
        this.salesPrize.updateView(orderItem);
        this.getDetail();
    }

    async getDetail(){
        //let ret  = PrizeApp.PrizeMgr
        let ret = await this.promiseOne<any>(PrizeApp.PrizeMgr.getAfterSupport({orderId:this._order.ID}));
        if (!ret.err){
            this.recordPanel.removeAllChildren();
            let afterSupport:ExchangeOrderPKG.IAfterSupportOrder = ret.resp.afterSupport.afterSupport;
            afterSupport.comment.forEach((record)=>{
                let item  = instantiate(this.recordItem);
                this.recordPanel.addChild(item);
                item.getComponent(AfterSalesItem).updateView(record);
            })
        }
    }

    onClickGoAdd(){
        uiMgr.popPage();
        uiMgr.loadPage('prizeCenter@res/prefab/support/ApplyScales',{
            params:this._order,
        });
    }

}
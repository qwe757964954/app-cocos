import { _decorator, Component, Node ,instantiate} from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Log, NodeUtil, uiMgr } from 'bos/exports';
import {PrizeCenterConfirmOrder} from '../confirmOrder/PrizeCenterConfirmOrder';
import { ISearchSupplierReq, ISearchSupplierView,ISupplier} from 'idl/tss/hall/prizesupplier.v1';
import { PrizeApp } from '../../../PrizeApp';
import { EditBox } from 'cc';
import { Prefab } from 'cc';
import {PickUpItem} from './PickUpItem';

@ccclass('PickUpAddressList')
export class PickUpAddressList extends XComponent {

    @property(EditBox)
    provinceEdit:EditBox = null!;

    @property(EditBox)
    cityEdit:EditBox = null!;

    @property(Node)
    itemPanel:Node = null!;

    @property(Prefab)
    item:Prefab = null!;

    private _delegate:PrizeCenterConfirmOrder = null!;
    private _skuId:number = 0;
    private _supplierId:string = '';

    setup(params){
        Log.w("PickUpAddressList",params)
        this._delegate = params.delegate;
        this._skuId = params.skuId;
    }


    onEventChangeSupplier(supplier:ISupplier){
        this._supplierId = supplier.ID;
        this.updateItemStatus();
        if (this._delegate){
            this._delegate.updateSupplier(supplier);
        }
    }

    async searchSupplier(){
        let province = this.provinceEdit.string;
        let city = this.cityEdit.string;
        if(province == ''){
            uiMgr.showToast('请输入省份');
            return
        }
        if(city == ''){
            uiMgr.showToast('请输入区县');
            return
        }

        let req:ISearchSupplierReq = {
            province:province,
            city:city,
            page:1,
            pageSize:30,
            SKUID:this._skuId,
            skuAmt:0,
        };
        this.promiseOne(PrizeApp.PrizeMgr.searchSupplier(req)).then((suppliers:ISearchSupplierView[]) => {
            this.itemPanel.removeAllChildren();
            suppliers.forEach((supplier)=>{
                let item = instantiate(this.item);
                this.itemPanel.addChild(item);
                let pickUpItemCmp = item.getComponent(PickUpItem);
                pickUpItemCmp.updateView(supplier,this);
                let id = supplier.supplier.ID;
                pickUpItemCmp.updateSelect(this._supplierId == id);
            })
        })
    }

    updateItemStatus(){
        this.itemPanel.children.forEach((item)=>{
            let pickUpItemCmp = item.getComponent(PickUpItem);
            pickUpItemCmp.updateSelect(this._supplierId == pickUpItemCmp.supplierID);
        })
    }

    onClickSearch(){
        this.searchSupplier();
    }
}
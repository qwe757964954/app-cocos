import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { PrizeApp } from '../../../PrizeApp';
import { PickAddress} from '../payResult/PickAddress';
import * as PrizeMallPKG from 'idl/tss/hall/prizemall.v2';
import * as PrizeSupplierPKG  from 'idl/tss/hall/prizesupplier.v1';
import {Location} from 'platform/Location'
import { resolve } from 'path';

@ccclass('PickAddr')
export class PickAddr extends XComponent {
    @property(Node)
    emptyNode:Node = null!;

    @property(Node)
    addrNode:Node = null!;

    @property(Node)
    pickAddr:Node = null!;

    private _supplier:PrizeSupplierPKG.ISupplier;

    init(sku:PrizeMallPKG.ISKU){
        this.emptyNode.active = true;
        this.addrNode.active = false;
        this.getPickUpAddr(sku);
    }

    updateView(supplier:PrizeSupplierPKG.ISupplier){
        this._supplier = supplier; 
        this.setGUI();
    }

    setGUI(){ 
        let defaultAddr = this.supplier.addr;
        this.emptyNode.active = false;
        this.addrNode.active = true;
        this.pickAddr.getComponent(PickAddress)!.init(defaultAddr);
    }

    async getPickUpAddr(sku:PrizeMallPKG.ISKU) {
        let province = '广东省';
        let city = '深圳市';
        let openGps = Location.isLocationServiceEnable();
        if (openGps){
            let result = await new Promise<any>((resolve)=>{
                Location.setLocationSingleEvent(Location.ACCURACY_KM,(result :any) => {
                    resolve(result)
                })
            })
            if (result.status === Location.STATUS_AVAILABLE_WITH_DATA) {
                province = result.province;
                city = result.city;
            }
        }
        let req:PrizeSupplierPKG.ISearchSupplierReq = {
            province:province,
            city:city,
            page:1,
            pageSize:30,
            SKUID:sku.ID,
            skuAmt:0,
        };
        let suppliers = await PrizeApp.PrizeMgr.searchSupplier(req);
        if (suppliers.length > 0){
            this._supplier = suppliers[0].supplier;
            this.setGUI();
        }
    }

    get supplier(){
        return this._supplier;
    }

}
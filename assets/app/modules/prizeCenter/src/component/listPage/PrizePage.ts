import { _decorator, Component, Node,ScrollView,instantiate} from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Log,NodeUtil} from 'bos/exports';
import { PrizeApp } from '../../../PrizeApp';
import { PrizeListMain } from './PrizeListMain';
import * as PrizeMallPKG from 'idl/tss/hall/prizemall.v2';
import { Prefab } from 'cc';

@ccclass('PrizePage')
export class PrizePage extends XComponent {
    @property(ScrollView)
    scrollView = null!;

    @property(Prefab)
    listItem = null!;

    private _tabID:string = '';
    private _delegate:PrizeListMain = null!;

    init(tabID:string,delegate:PrizeListMain){ 
        this._tabID = tabID;
        this._delegate = delegate;
    }

    updateView(){
        this.reqData();
    }

    async reqData() {
        let sortID = this._delegate.sortID;
        let req: PrizeMallPKG.IListSKUByUserReq = {
            tabID:this._tabID ,
            page:1,
            pageSize:30,
            sort:sortID,
        };
        let resp = await PrizeApp.PrizeMgr.getPrizeList(req);
        let prizes = resp?.sku
        if (prizes){
            this.scrollView.content!.removeAllChildren();
            for (let sku of prizes) {
                let item = instantiate(this.listItem);
                this.scrollView.content!.addChild(item);
                NodeUtil.sendMessage(item,'init',sku);
            }
        } 
    }
}
import { _decorator, Component, log, Node, Label,
    Size,Prefab,instantiate,ScrollView,UITransform,PageView,Sprite, Color} from 'cc';
const { ccclass, property,menu} = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { PrizeApp } from '../../../PrizeApp';
import { Log, NodeUtil, resLoader, uiMgr } from "bos/exports";
import {PrizeCenterComTab} from "../common/PrizeCenterComTab";
import { CommonTab,CommonTabItem} from '../../interfaceData/define';
import * as PrizeMallPKG from 'idl/tss/hall/prizemall.v2';
import { PrizePage } from './PrizePage';
import { App } from 'app/App';
import { Wallet } from 'app/domain/wallet/Wallet';
import { PrizeUtil } from '../../utils/PrizeUtil';
import { propMgr } from 'app/domain/props/PropMgr';
import { PropType } from 'idl/tss/common/common_define';

const SortID = ['-common_info.priority,begin_at,_id','show_price,-common_info.priority,begin_at,_id','-show_price,-common_info.priority,begin_at,_id'];

@ccclass('PrizeListMain')

export class PrizeListMain extends XComponent {
    @property(Node)
    tabPanel:Node | null = null;

    @property(Node)
    sortPanel:Node | null = null;

    @property(Label)
    shopCartNum:Label = null!;

    @property(Label)
    mungNum:Label = null!;

    @property(Label)
    tickNum:Label = null!;

    @property(Node)
    prizePanel:Node = null!;

    @property(Sprite)
    bgColor:Sprite = null!;

    @property(Prefab)
    listItem = null!;

    @property(ScrollView)
    scrollView:ScrollView = null!;

    private prizeMallTab:PrizeMallPKG.ITab[] = [];

    private _tabIndex = 0;//
    private _sortIndex = 0;

    get sortID(){
        return SortID[this._sortIndex];
    }

    onLoad() {
        this.bgColor.color = new Color(25,25,25,0);
        this.initData();
    }


    handleScroll( ) {
        let y = this.scrollView.getScrollOffset().y;
        let navH = 200;
        if (y < 0){//拉到头
            this.bgColor.color = new Color(25,25,25,0);
        }else{
            let opacity = 0;
            if (y <= 10){
                opacity = 0;
            }else if(y < navH && y > 0){
                opacity = y / navH
            }else{
                opacity = 1;
            }
            this.bgColor.color = new Color(25,25,25,opacity*255);
        }
    }

    async initData(){
        let tabs = await this.promiseOne<any>(PrizeApp.PrizeMgr.getListTab());
        if (tabs){
            this.prizeMallTab = tabs;
            this.initTab(tabs);
        }
        let num = await this.promiseOne<any>(PrizeApp.PrizeMgr.getShopCartNum());
        this.shopCartNum.string = num.toString();
        this.reqData();
        let model : Wallet = await this.promiseOne<any>(App.walletMgr.getUserWallet(App.userMgr.loginUid).finish());
        
        this.mungNum.string =  `${PrizeUtil.formatPrice(model.mung)}`;
        let tickNum = await this.promiseOne<any>(propMgr.getUserPropNumByType(PropType.PropTypeExclusiveVoucher) || 0);
        this.tickNum.string = `${PrizeUtil.formatPrice(tickNum)}`;
    }  

    async reqData() {
        let sortID = this.sortID;
        let req: PrizeMallPKG.IListSKUByUserReq = {
            tabID:this.prizeMallTab[this._tabIndex].ID ,
            page:1,
            pageSize:30,
            sort:sortID,
        };
        let resp = await PrizeApp.PrizeMgr.getPrizeList(req);
        let prizes = resp?.sku
        if (prizes){
            this.prizePanel.removeAllChildren();
            for (let sku of prizes) {
                let item = instantiate(this.listItem);
                this.prizePanel.addChild(item);
                NodeUtil.sendMessage(item,'init',sku);
            }
        } 
    }

    initTab(tabs:PrizeMallPKG.ITab[]){
        let tempTab:CommonTabItem[] = [];

        for (let tab of tabs) {
            tempTab.push({tabTitle:tab?.name})
        }
        let commonTab:CommonTab = {
            tabs:tempTab,
            defaultIndex:0,
        };

    }

    switchTab(index:number){
        if (index >= this.prizeMallTab.length){
            index = 0;
        }
        if (this._tabIndex == index) return;
        this._tabIndex = index;
        this.reqData();
    }  

    switchSortTab(index:number){
        this._sortIndex = index;
    }  

    onClickTab(event: Event, tag: string){
        this.switchTab(parseInt(tag)-1);
    }

    onScrollViewEventHandler(scrollview, eventType, customEventData){
        if (eventType == 4){
            this.handleScroll();
        }
    }

    onGoToShopCar() {
        uiMgr.loadPage('prizeCenter@res/prefab/shopCar/PrizeCenterShopCarList');
    }

    onGoToMyPage() {
        uiMgr.loadPage('prizeCenter@res/prefab/myPage/PrizeCenterMyPage');
    }

    onGoToSearch() {
        uiMgr.loadPage('prizeCenter@res/prefab/list/SearchPrize');
    }
}



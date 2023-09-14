import { _decorator, Component, Node ,ScrollView,Prefab,instantiate, Label, Pool,Sprite} from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { PrizeApp } from '../../../PrizeApp';
import { PrizeCenterCarItem } from './PrizeCenterCarItem';
import { Log, TableView, TableViewEvent,NodeUtil} from 'bos/exports';
import { BundleSprite } from 'bos/framework/component/BundleSprite';
import {ComputeSinglePrice,PreOrderItem} from   '../../interfaceData/define';
import {PrizeUtil} from '../../utils/PrizeUtil';
import {PrizeCenterComOrderPrice} from '../common/PrizeCenterComOrderPrice';
import {CreateOrderParams} from "../../interfaceData/define";
import { Utils } from 'app/utils/Utils';

import * as PrizeMallPKG from 'idl/tss/hall/prizemall.v2';
import { DeliveryChannelType } from 'idl/tss/hall/common/prizemall';


export type CarItemData  = {
    isSelect:boolean,
    index:number,
    userCartItem:PrizeMallPKG.IUserCartItem,
}

@ccclass('PrizeCenterShopCarList')
export class PrizeCenterShopCarList extends XComponent {
    @property(TableView)
    tableView: TableView;

    @property(Prefab)
    item:Prefab|null = null;

    @property(Sprite)
    allCheckBox:Sprite|null = null;

    @property(Node)
    priceNode:Node|null = null;

    @property(Label)
    btnLab:Label = null!;


    private _allSelectFlag = false;

    private _pool: Pool<Node> = null;
    private _data: CarItemData[] = [];
    private _curPage = 0;
    private _pageSize = 30;
    private _isLastPage = false;

    onLoad(): void {
        this.tableView.delegate = this;
        this.initPool();
        this.addRefreshAndPullEvent();
        this.tableView.node.on('scrolling', this.onScrollingEvent, this);
        this.reqData(1);
        this.resetAllSelectStatus();
    }

    initPool(){
        this._pool = new Pool(() => {
            return instantiate(this.item)
        }, 10, (node: Node) => {
            node.destroy();
        });
    }

    async reqData(page:number) {
        this._curPage = page;
        let req:PrizeMallPKG.IListUserShoppingCartItemReq ={
            page:this._curPage,
            pageSize:this._pageSize,
        };
        let resp = await this.promiseOne<any>(PrizeApp.PrizeMgr.getListUserShoppingCartItem(req));
        if (resp) {
            let items = resp?.items;
            for (let i = 0; i < items.length; i++) {
                let carItemData:CarItemData = {
                    isSelect:false,
                    index:i,
                    userCartItem:items[i],
                };
                this._data.push(carItemData);
            }
            this.setData(this._data, resp.total ?? 0)
        }
    }

    onScrollingEvent(){
        
    }

    addRefreshAndPullEvent() {
        this.tableView.node.on(TableViewEvent.REFRESH_DATA_TOP, this.pullDownRefresh.bind(this))
        this.tableView.node.on(TableViewEvent.REFRESH_DATA_BOTTOM, this.pullUpMore.bind(this))
    }

    //上拉加载更多
    pullUpMore() {
        if (!this._isLastPage) {
            this.reqData(this._curPage + 1);
        }
    }

    //下拉刷新
    pullDownRefresh(){
        this.refreshList();
    }

    refreshList(){
        this._curPage = 0;
        this._isLastPage = false;
        this._data = [];
        this.reqData(1);
        this.resetAllSelectStatus();
    }

    //重置全选
    resetAllSelectStatus(){
        this._allSelectFlag = false;
        (this.priceNode.getComponent('PrizeCenterComOrderPrice') as PrizeCenterComOrderPrice)!.setTotalPrize({}); 
        let sprite = this.allCheckBox.getComponent(BundleSprite);
        if (sprite) {
            sprite.spriteFrame = "prizeCenter@res/commonRes/Res_ResApp_Com_Btn_Checkbox_0";
        }
        this.btnLab.string = `结算(${0})`;
    }

    
    setData(data:Array<CarItemData>, totalSize = 0) {
        this._data = data;
        this.tableView.refresh();
        if (this._data.length >= totalSize) {
            this._isLastPage = true
        }
    }

    createCell(tableView: TableView, index: number, section: number): Node {
        let cell = this._pool.alloc();
        NodeUtil.sendMessage(cell,"init",this._data[index],this);
        return cell;
    }

    releaseCell(tableView: TableView, cell: Node) {
        cell.removeFromParent();
        this._pool.free(cell);
    }

    rowCount(tableView: TableView, section: number) {
        return this._data.length;
    }

    createSection(tableView: TableView, section: number): Node {
        return null;
    }

    releaseSection(tableView: TableView, section: Node) {
        section.removeFromParent();
        section.destroy();
    }

    checkAllSelect(){
        let allSelect = true;
        let numSelect = 0;
        let computeSinglePrice:Array<ComputeSinglePrice> = [];
        for (const itemData of this._data) {
            if (itemData.isSelect){
                numSelect = numSelect + itemData.userCartItem.cartItem.amount;
                let temp:ComputeSinglePrice = {
                    amount:itemData.userCartItem.cartItem.amount,
                    pricePlan:PrizeUtil.getPricePlanByCar(itemData.userCartItem),
                }
                computeSinglePrice.push(temp)
            }else {
                allSelect = false;
            }
        }
        if (computeSinglePrice.length == 0) allSelect = false;
        //计算总价
        let result = PrizeUtil.computePaymentPrice(computeSinglePrice);
        (this.priceNode.getComponent('PrizeCenterComOrderPrice') as PrizeCenterComOrderPrice)!.setTotalPrize(result); 
        this._allSelectFlag = allSelect;
        let path = allSelect ? 'common/button/Res_ResApp_Com_Btn_Checkbox_2':'common/button/Res_ResApp_Com_Btn_Checkbox_01';
        Utils.loadSpriteFromResources(this.allCheckBox, path);
        this.btnLab.string = `结算(${numSelect})`;
    }
    
    getSelectItem(){
        let preOrderItems:PreOrderItem[] = [];
        for (const itemData of this._data) {
            if (itemData.isSelect){
                let pricePlan = PrizeUtil.getPricePlanByCar(itemData.userCartItem);
                let singlePrice = PrizeUtil.getSinglePrize({amount:1,pricePlan});
                //Log.w('singlePrice',singlePrice);
                let orderItem:PrizeMallPKG.IOrderItem = {
                    SKUID:itemData.userCartItem.sku.ID,
                    amount:itemData.userCartItem.cartItem.amount,
                    planType:itemData.userCartItem.cartItem.pricePlanType,
                    SPUID:itemData.userCartItem.sku.SPUID,
                    actualUnitPrice:{
                        RMB:singlePrice.RMB,
                        asset:singlePrice.asset,
                    },
                }
                preOrderItems.push({sku:itemData.userCartItem.sku,mallOrderItem:orderItem});
            }
        }
        return preOrderItems;
    }

    onEventChangeNum(index:number,num:number){
        (async() => {
            let itemData = this._data[index];
            itemData.userCartItem.cartItem.amount = num;
            this.tableView.updateRow(index,0,1);
            this.checkAllSelect();

            let req:PrizeMallPKG.ISaveShoppingCartItemReq = {
                SKUID:itemData.userCartItem.sku.ID,
                amount:num,
                pricePlanType:itemData.userCartItem.cartItem.pricePlanType,
            };
            let result = await PrizeApp.PrizeMgr.saveUserShoppingCartItem(req);
        })();
    }

    onEventSelect(index:number,select:boolean){
        let itemData = this._data[index];
        itemData.isSelect = select;
        this.checkAllSelect();
    }

    onClickAllSelect(){
        this._allSelectFlag = !this._allSelectFlag;

        for(let i = 0; i < this._data.length;i++){
            this._data[i].isSelect = this._allSelectFlag;
        }
        this.checkAllSelect();
        this.tableView.refresh();
    }
    onClickToBuy(){
        let orderItems = this.getSelectItem();
        if (orderItems.length == 0 ){
            Log.w('未选中商品');
            return;
        }
        let params:CreateOrderParams = {
            from:PrizeMallPKG.OrderFromType.OrderFromTypeShoppingCart,
            deliveryChannel:DeliveryChannelType.DeliveryChannelTypeOfflineExpress,
            preOrderItem:orderItems,
        };
        PrizeApp.PrizeMgr.gotoOrderConfirm(params);
    }

    onClickBack(){
        this.node.removeFromParent();
    }
}
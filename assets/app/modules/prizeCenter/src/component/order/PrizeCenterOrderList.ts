import { _decorator, Component, Node,instantiate,Prefab,ScrollView,Pool} from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { PrizeApp } from '../../../PrizeApp';
import { OrderListTab } from "../../interfaceData/define";
import { CommonTab,CommonTabItem,OrderStatusEnum} from '../../interfaceData/define';
import {PrizeCenterComTab} from "../common/PrizeCenterComTab";
import {PrizeCenterOrderItem} from "./PrizeCenterOrderItem";

import { Log,TableView,TableViewEvent,NodeUtil} from 'bos/exports';
import {TimeUtil} from 'bos/utils/TimeUtil';
import { App} from 'app/App';
import * as ExchangeOrderPKG from 'idl/tss/hall/exchangeorder.v7';
@ccclass('PrizeCenterOrderList')
export class PrizeCenterOrderList extends XComponent {
    @property(Node)
    tabLayout:Node = null!;

    @property(Prefab)
    orderItem: Prefab = null!;

    @property(TableView)
    tableView: TableView = null!;

    selectIndex = 0;

    private _pool: Pool<Node> = null;
    private _data: ExchangeOrderPKG.IOrder[] = [];
    private _curPage = 0;
    private _pageSize = 30;
    private _isLastPage = false;

    setup(params){
        Log.w("PrizeCenterOrderList",params)
        this.selectIndex = params?.defaultIndex ?? 0;
        this.initPool();
        this.tableView.delegate = this;
        this.addRefreshAndPullEvent();
        this.tableView.node.on('scrolling', this.onScrollingEvent, this);
        this.initTab();
        PrizeApp.PrizeMgr.on(PrizeApp.PrizeMgr.EventType.OrderStateChange,this.onUpdatePage,this);
    }

    initPool(){
        this._pool = new Pool(() => {
            return instantiate(this.orderItem)
        }, 10, (node: Node) => {
            node.destroy();
        });
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

    resetData(){
        this._curPage = 0;
        this._isLastPage = false;
        this._data = [];
        this.reqData(1);
    }

    refreshList(){
        this.resetData();
    }

    setData(data:Array<ExchangeOrderPKG.IOrder>, totalSize = 0) {
        Log.e("setData setData length",data.length);
        this._data = data;
        this.tableView.refresh();
        if (this._data.length >= totalSize) {
            this._isLastPage = true
        }
    }

    createCell(tableView: TableView, index: number, section: number): Node {
        let cell = this._pool.alloc();
        NodeUtil.sendMessage(cell,"init",this._data[index]);
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


    initTab( ) {
        let tabs = OrderListTab;
        let tempTab:CommonTabItem[] = [];
        for (let tab of tabs) {
            tempTab.push({tabTitle:tab})
        }
        let commonTab:CommonTab = {
            tabs:tempTab,
            defaultIndex:this.selectIndex,
        };
        (this.tabLayout.getComponent('PrizeCenterComTab') as PrizeCenterComTab)!.initData(commonTab);
    }


    async reqData(page:number){
        this._curPage = page;
        let payState = 0;
        let orderState = 0;
        let deliveryState = 0;
        let commentState = 0;
        if (this.selectIndex == OrderStatusEnum.ToAll){
            payState = ExchangeOrderPKG.PayState.PayStateUnknown
            orderState = ExchangeOrderPKG.OrderState.OrderStateUnknown
        }else if (this.selectIndex == OrderStatusEnum.ToPay ){//--待支付
            payState = ExchangeOrderPKG.PayState.PayStatePending
            orderState = ExchangeOrderPKG.OrderState.OrderStateOpen
        }else if ((this.selectIndex == OrderStatusEnum.ToShip)){//待发货
            deliveryState = ExchangeOrderPKG.DeliveryState.DeliveryStatePending
            orderState = ExchangeOrderPKG.OrderState.OrderStateOpen
        }else if (this.selectIndex == OrderStatusEnum.ToReceive){//待收货
            deliveryState = ExchangeOrderPKG.DeliveryState.DeliveryStateWaitReceipt
            orderState = ExchangeOrderPKG.OrderState.OrderStateOpen
        }else if (this.selectIndex == OrderStatusEnum.ToRate){//待评价
            orderState = ExchangeOrderPKG.OrderState.OrderStateSuccess
            commentState = ExchangeOrderPKG.CommentState.CommentStatePending
        }
           
        // 获取当前时间戳
        const timestamp: number = TimeUtil.getTime();
        let req:ExchangeOrderPKG.IListOrderReq = {
            uid:App.userMgr.loginUid,
            page:this._curPage,
            pageSize:this._pageSize,
            beginAt:timestamp- (365 * 24 * 60 * 60),
            endAt:timestamp,
            payState:payState,
            orderState:orderState,
            deliveryState:deliveryState,
            commentState:commentState,
        };
       // Log.w("getListOrder req",req);
        let resp = await PrizeApp.PrizeMgr.getListOrder(req);
        for (const orderData of resp?.orders) {
            this._data.push(orderData);
        }
        if (resp?.orders.length === 0){
            this._data = [];
        }
        if (this._curPage > 1){
            if (this._data.length >= resp.total ?? 0) {
                this._isLastPage = true
            }
            return
        }
        this.setData(this._data, resp.total ?? 0);
    }

    //更新当前page
    onUpdatePage(){
        this.resetData();
    }

    onChangePage(index:number){
        this.selectIndex = index;
        this.resetData();
    }

    onTabClick(index:number){
        this.selectIndex = index;
        this.resetData();
    }

    onClickBack(){
        this.node.removeFromParent();
    }
}
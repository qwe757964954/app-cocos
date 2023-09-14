import { _decorator, Component, Node,Label,Prefab,instantiate,director} from 'cc';
const { ccclass, property ,menu} = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Log ,NodeUtil, uiMgr} from 'bos/exports';
import { PrizeApp } from '../../../PrizeApp';
import {PrizeCenterBuyWay} from './PrizeCenterBuyWay';
import {PrizeCenterConfirmOrder} from '../confirmOrder/PrizeCenterConfirmOrder';

import { NormalAsset } from 'bos/framework/loader/ResLoader';
import {CreateOrderParams} from "../../interfaceData/define"

import { Banner } from './Banner';
import { SpecSelect } from './SpecSelect';
import { BottomOpt } from './BottomOpt';

import PrizeMgr from '../../mgr/PrizeMgr';
import * as PrizeMallPKG from 'idl/tss/hall/prizemall.v2';
import * as PrizecommentPKG  from 'idl/tss/hall/prizecomment.v2';
import { PrizeUtil } from '../../utils/PrizeUtil';
import {CommentItem} from '../common/CommentItem'
@ccclass('PrizeCenterDetail')
@menu('prizeCenter/prizeDetail/PrizeCenterDetail')
export class PrizeCenterDetail extends XComponent {
    @property(Label)
    skuNameLab:Label = null!;//奖品名字

    @property(Label)
    salesAmountLab:Label = null!;//销量

    @property(Label)
    descLab:Label = null!;//描述

    @property(Label)
    specLab:Label = null!;//规格

    @property(Node)
    buyWayLayout:Node = null!;//兑换方式

    @property(Node)
    imgLayout:Node = null!;//详情页图片

    @property(Node)
    specLayout:Node = null!;//规格选择

    @property(Node)
    banner:Node = null!;//规格选择

    @property(Node)
    bottomOpt:Node = null!;//底部兑换

    @property(Node)
    commentLayout:Node = null!;//评论

    @property(Prefab)
    buyWayItem:Prefab|null = null;

    @property(Prefab)
    confirmOrder:Prefab = null!;



    //当前数据
    spuId:number = null!;
    skuId:number = null!;
    selectNum:number = null!;
    planType:number = null!;

    //用来保存的选择数量
    numMap = new Map();

    skuInfo:PrizeMallPKG.ISKU = null!;
    merchandise:PrizeMallPKG.IMerchandise = null!;
    specSelectCom:SpecSelect = null!

    setup(params:{spuId:number,skuId:number}){
        Log.w("PrizeCenterDetail",params)
        this.init(params.spuId,params.skuId);
    }

    init(spuId:number, skuId:number){
        Log.w('奖品详情页spuId,skuId',spuId,skuId);
        if ((!spuId) || (!skuId)) return;
        this.specSelectCom = this.specLayout.getComponent(SpecSelect);
        this.spuId = spuId;
        this.skuId = skuId;
        this.initSpu();
    } 

    async initSpu(){
        let req:PrizeMallPKG.IGetSPUByUserReq = {
            ID:this.spuId,
        };
        let merchandise = await PrizeApp.PrizeMgr.getSPUByUser(req);
        this.merchandise = merchandise;
        //选中默认的
        for (const sku of merchandise?.product) {
            if (sku.ID == this.skuId ){
                this.skuInfo = sku;
                break;
            } 
        }
        if(!this.skuInfo){
            this.skuInfo = merchandise?.product[0];
        }
        //init
        NodeUtil.sendMessage(this.imgLayout,'updateView',this.merchandise.spu.introduce);
        this.specSelectCom.init(merchandise,this);
        this.setBaseInfo();
        this.setBuyWays();
        this.setComment();
    }

    setBaseInfo(){
        this.skuNameLab.string = this.skuInfo.name;
        this.descLab.string = this.skuInfo.desc;
        this.salesAmountLab.string = `已售${this.skuInfo.salesAmount}件`;
        //设置规格
        let labText = '选择  '
        for (const v of this.skuInfo?.spec) {
            labText = labText + v.nameCN  + " " + v.valueCN  + " "
        }
        this.specLab.string = labText;

        (this.banner.getComponent(Banner) as Banner)!.init(this.skuInfo);

        this.bottomOpt.getComponent(BottomOpt).init(this);
     
        
    }

    setComment(){
        (async()=>{
            let req:PrizecommentPKG.IListCommentReq = {
                spuId:this.skuInfo.SPUID,
                page:1,
                pageSize:2,
                type:PrizecommentPKG.ListCommentType.ListCommentTypeLike
            }
            let ret  = await this.promiseOne<any>(PrizeApp.PrizeMgr.getListComment(req));
            let comment = ret.resp.comment
            if(comment.length == 0){
                this.commentLayout.active = false;
                return
            } 
            for(let i=0 ; i<2; i++){
                let item = this.commentLayout.getChildByName(`CommentItem${i}`)
                if (comment[i]){
                    item.active = true;
                    item.getComponent(CommentItem)!.updateView(comment[i]);
                }else {
                    item.active = false;
                }
            }
        })()
    }

    setBuyWays(){
        let prices = this.skuInfo.prices;
        this.buyWayLayout.removeAllChildren();

        for (let pricePlan of prices) {
            let item = instantiate(this.buyWayItem);
            this.buyWayLayout.addChild(item);
            (item.getComponent('PrizeCenterBuyWay') as PrizeCenterBuyWay)!.init(pricePlan,this);
        }
        //默认选择第一个
        this.switchBuyWay(prices?.[0].type);
    }

    //切换兑换方式
    switchBuyWay(planType:number) {
        this.planType = planType;
        for (let item of this.buyWayLayout.children) {
           (item.getComponent('PrizeCenterBuyWay') as PrizeCenterBuyWay)!.setSelect(planType);
        }  
    }

    start() {

    }

    getSelectSKU(){
        return this.skuInfo;
    }

    getSelectNum(){
        let num = this.numMap.get(this.skuInfo.ID.toString());
        return num ?? 1;
    }

    //网络操作
    sendAddCart(){
        let req:PrizeMallPKG.IAddShoppingCartItemReq = {
            SKUID:this.skuInfo.ID,
            amount:this.getSelectNum(),
            pricePlanType:this.planType,
        };
        let resp = PrizeApp.PrizeMgr.addUserShoppingCartItem(req);
        if(resp){
            uiMgr.showToast("已加入购物车");
        }
    }

    goToBuy() {
        let pricePlan = PrizeUtil.getPricePlanBySKU(this.planType,this.skuInfo) || this.skuInfo.prices?.[0];
        let singlePrice = PrizeUtil.getSinglePrize({amount:1,pricePlan});
        Log.w('prizeDetail singlePrice',singlePrice);
        let item :PrizeMallPKG.IOrderItem = {
            SKUID:this.skuInfo.ID,
            amount:this.getSelectNum(),
            planType:pricePlan?.type,
            SPUID:this.skuInfo.SPUID,
            actualUnitPrice:{
                RMB:singlePrice.RMB,
                asset:singlePrice.asset,
            },
        };
        let createOrderParams:CreateOrderParams = {
            from:PrizeMallPKG.OrderFromType.OrderFromTypeMall,
            deliveryChannel:this.skuInfo.deliveryChannel,
            preOrderItem:[{sku:this.skuInfo,mallOrderItem:item}],
        };
        PrizeApp.PrizeMgr.gotoOrderConfirm(createOrderParams);
    }

    //规格回调(已经获得了正确的sku)
    onSpecSelect(sku:PrizeMallPKG.ISKU){
        this.skuInfo = sku;
        this.planType = 0;//需要重置兑换Type
        this.setBaseInfo();
        this.setBuyWays();
        this.specSelectCom.updateSku(this.skuInfo,this.planType);
    }

    onEventChangeNum(num:number) {
        Log.w('onEventChangeNum',num);
        this.numMap.set(this.skuInfo.ID.toString(),num);
    }

    onEventOpt(tag:string) {
        Log.w('onEventOpt',tag);
        if (tag == 'buy') {
            this.goToBuy();
        }else if(tag == 'cart'){
            this.sendAddCart();
        }
    }

    // *************************** 按钮点击*******************************************
    onClickBack(){
        this.node.removeFromParent();
    }

    //加入购物车
    onClickAddCar() {
        Log.w('加入购物车');
        this.specLayout.active = true;
        this.specSelectCom.show(this.skuInfo,this.planType,'cart');
    }
    //立即购买
    onClickBuy() {
        this.specSelectCom.show(this.skuInfo,this.planType,'buy');
    }

    onClickCommentList() {
        uiMgr.loadPage('prizeCenter@res/prefab/detail/CommentList',{params:{spuId:this.spuId}});
    }

    onClickShopCart() {
        uiMgr.loadPage('prizeCenter@res/prefab/shopCar/PrizeCenterShopCarList');
    }
    //切换规格
    onClickSwitchSpec(event: Event, customEventData: string) {
        this.specLayout.active = true;
        this.specSelectCom.show(this.skuInfo,this.planType,customEventData);
    }
}
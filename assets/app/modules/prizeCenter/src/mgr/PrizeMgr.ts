import { Gateway } from "./Gateway";
import { PrizeRepo } from "./Repo";
import { Prize } from "./Prize";
import { Log, uiMgr } from "bos/exports";

import { EmptyClass, EventTargetExtends } from 'bos/utils/ClassUtils';
import { CreateOrderParams} from '../interfaceData/define';


import * as PrizeMallPKG from 'idl/tss/hall/prizemall.v2';
import * as ExchangeOrderPKG from 'idl/tss/hall/exchangeorder.v7';
import * as UserinfoPKG  from 'idl/tss/hall/userinfo.v1';
import * as PrizesupplierPKG  from 'idl/tss/hall/prizesupplier.v1';
import * as PrizecommentPKG  from 'idl/tss/hall/prizecomment.v2';
import { DeliveryChannelType } from 'idl/tss/hall/common/prizemall';

let eventIndex = 0
function getUniqueEventName(){
    eventIndex++
    return "PrizeEvent" + eventIndex.toString()
}

class PrizeMgr extends EventTargetExtends(EmptyClass) {

    //事件
    EventType = {
        OrderStateChange : getUniqueEventName(),
    }


    private loginUser:Prize;
    private prizeRepo = new PrizeRepo();
    private gateway = new Gateway();

    /****************************奖品*************************** */
    async getListTab( ) {
        let tabs = await this.gateway.getListTabByUser();
        return tabs
    }

    async getPrizeList(req:PrizeMallPKG.IListSKUByUserReq){
        let ret = await this.gateway.getListSKUByUser(req);
        return ret;
    }
    //搜索奖品
    async searchSKUByUser(req:PrizeMallPKG.ISearchSKUByUserReq){
        let ret = await this.gateway.searchSKUByUser(req);
        return ret;
    }

    //奖品详情页
    async getSPUByUser(req:PrizeMallPKG.IGetSPUByUserReq){
        let merchandise = await this.gateway.getSPUByUser(req);
        return merchandise;
    }
    //提交
    async createOrder(req:PrizeMallPKG.ICreateOrderReq){
        let ret = await this.gateway.createOrder(req);
        return ret;
    }

    //查询购物车
    async getListUserShoppingCartItem(req:PrizeMallPKG.IListUserShoppingCartItemReq){
        let resp = await this.gateway.getListUserShoppingCartItem(req);
        return resp;
    }

    async saveUserShoppingCartItem(req:PrizeMallPKG.ISaveShoppingCartItemReq){
        let ret =  await this.gateway.saveUserShoppingCartItem(req);
        return ret;
    }

    //加入购物车
    async addUserShoppingCartItem(req:PrizeMallPKG.IAddShoppingCartItemReq){
        let ret =  await this.gateway.addUserShoppingCartItem(req);
        return ret;
    }

    async getShopCartNum(){
        let num =  await this.gateway.getShopCartNum();
        return num;
    }

    /****************************订单*************************** */
    async getCountOrderNum(){
        let resp =  await this.gateway.getCountOrderNum();
        return resp;
    }

    //确认收货
    async receiptByCustomer(req:ExchangeOrderPKG.IReceiptByCustomerReq){
        let resp =  await this.gateway.receiptByCustomer(req);
        return resp;  
    }

    //取消订单
    async applyCancelOrder(req:ExchangeOrderPKG.IApplyCancelOrderReq){
        let resp =  await this.gateway.applyCancelOrder(req);
        return resp;  
    } 

    //删除订单
    async deleteOrder(req:ExchangeOrderPKG.IDeleteOrderReq){
        let resp =  await this.gateway.deleteOrder(req);
        return resp;  
    } 


    async getListOrder(req:ExchangeOrderPKG.IListOrderReq){
        let merchandise = await this.gateway.getListOrder(req);
        Log.w("order getListOrder", merchandise)
        return merchandise;  
    }

    async getOrderByID(req:ExchangeOrderPKG.IGetOrderReq){
        let ret =  await this.gateway.getOrderByID(req);
        return ret;
    }

    //获取地址列表
    async getListAddress(req:UserinfoPKG.IListShippingAddrReq){
        let ret =  await this.gateway.getListAddress(req);
        return ret;
    }

    //获取地址根据ID
    async getAddressByID(req:UserinfoPKG.IGetShippingAddrReq){
        let ret =  await this.gateway.getAddressByID(req);
        return ret;
    }

    //创建地址列表
    async createShippingAddr(req:UserinfoPKG.ICreateShippingAddrReq){
        let ret =  await this.gateway.createShippingAddr(req);
        return ret;
    }

    //更新地址列表
    async updateShippingAddr(req:UserinfoPKG.IUpdateShippingAddrReq){
        let ret =  await this.gateway.updateShippingAddr(req);
        return ret;
    }


    //删除
    async deleteShippingAddr(req:UserinfoPKG.IDeleteShippingAddrReq){
        let ret =  await this.gateway.deleteShippingAddr(req);
        return ret;
    }


    //去兑换
    async gotoOrderConfirm(params:CreateOrderParams){
        if((!params.deliveryChannel) || (!params.preOrderItem)){
            Log.e('兑换传入的参数不对');
        }
        let {deliveryChannel} = params;
        if (deliveryChannel == DeliveryChannelType.DeliveryChannelTypeOfflineExpress){
            let req = new UserinfoPKG.ListShippingAddrReq({page:1,pageSize:1});
            let resp = await this.getListAddress(req);
            if (resp.infos.length == 0){
                Log.e('没有设置默认地址');
                uiMgr.loadPage('prizeCenter@res/prefab/addressList/EditAddress');
                return;
            }
            uiMgr.loadPage('prizeCenter@res/prefab/confirmOrder/PrizeCenterConfirmOrder',{params:{createOrderParams:params}});
        }else if((deliveryChannel == DeliveryChannelType.DeliveryChannelTypeOfflineSelfPickUp)||
            (deliveryChannel == DeliveryChannelType.DeliveryChannelTypeOnlineCDK)||
            (deliveryChannel == DeliveryChannelType.DeliveryChannelTypeOnlineProp)||
            (deliveryChannel == DeliveryChannelType.DeliveryChannelTypeOnlinePhone)){
            uiMgr.loadPage('prizeCenter@res/prefab/confirmOrder/PrizeCenterConfirmOrder',{params:{createOrderParams:params}});
        }else {
           Log.e('暂时不支持该兑换方式',deliveryChannel); 
        }
    }

    //搜索自提点
    async searchSupplier(req:PrizesupplierPKG.ISearchSupplierReq){
        let ret =  await this.gateway.searchSupplier(req);
        return ret;
    }

    //修改地址
    async modifyReceiveAddr(req:ExchangeOrderPKG.IModifyReceiveAddrReq){
        let ret =  await this.gateway.modifyReceiveAddr(req);
        return ret;
    }

    //**************************************评论管理**************************************** */
    async createComment(req:PrizecommentPKG.ICreateCommentReq){
        let ret =  await this.gateway.createComment(req);
        return ret;
    }

    async getListComment(req:PrizecommentPKG.IListCommentReq){
        let ret =  await this.gateway.getListComment(req);
        return ret;
    }

    //点赞
    async likeComment(req:PrizecommentPKG.ILikeCommentReq){
        let ret =  await this.gateway.likeComment(req);
        return ret;
    }
    //举报
    async createCommentReport(req:PrizecommentPKG.ICreateCommentReportReq){
        let ret =  await this.gateway.createCommentReport(req);
        return ret;
    }
    //**************************************售后**************************************** */
    async saveAfterSupport(req:ExchangeOrderPKG.ISaveAfterSupportReq){
        let ret =  await this.gateway.saveAfterSupport(req);
        return ret;
    }

    async getAfterSupport(req:ExchangeOrderPKG.IGetAfterSupportReq){
        let ret =  await this.gateway.getAfterSupport(req);
        return ret;
    }

    //追加售后
    async createAfterSupportComment(req:ExchangeOrderPKG.ICreateAfterSupportCommentReq){
        let ret =  await this.gateway.createAfterSupportComment(req);
        return ret;
    }
}

export default PrizeMgr
import * as PrizeMallPKG from 'idl/tss/hall/prizemall.v2';
import {IAddress} from 'idl/tss/hall/common/prizemall';
import {ISupplier} from 'idl/tss/hall/prizesupplier.v1';
import { AssetType,IAssetItem} from 'idl/tss/common/common_define';
export enum OrderFromType {                   
    OrderFromTypeUnknown = 0,           
    OrderFromTypeMall = 1,    
    OrderFromTypeShoppingCart = 2,
}

//售前PreOrderItem
export type PreOrderItem = {
    sku:PrizeMallPKG.ISKU,
    mallOrderItem:PrizeMallPKG.IOrderItem;
}

//创建订单参数(确认提交页面)
export type CreateOrderParams = {
    from:number,
    deliveryChannel:number, 
    preOrderItem:PreOrderItem[],
}

export enum OrderStatusEnum{
	ToAll = 0, //--（查看全部)
	ToPay = 1, //--（待付款）
	ToShip = 2, //--(待发货)
	ToReceive = 3, //--（待收货）
	ToRate = 4, //--（待评价）
	ToFinish = 5, //--（已完成）
}

export const OrderListTab = ['全部','待付款', '待发货', '待收货', '待评价'];

//通用TabItem数据
export type CommonTabItem = {
    tabTitle:string,
    index?:number,
};

//需要传递个Tab用的
export type CommonTab = {
    tabs:CommonTabItem[],
    defaultIndex:number,
};

//数量选择
export type CommonNumSelect = {
    min:number,
    max:number,
    step?:number,
    default?:number,
};
//计算单个sku的实际价格（考虑自己打折等）
export type ComputeSinglePrice = {
    amount?:number,
    pricePlan:PrizeMallPKG.IPricePlan,
};

export type PaymentPrice = {
    mungNum?:number,
    voucher?:number,
    RMB?:number,
};

//付款结果
export type PaymentResult = {
    batchID?:string,
    result?:number,
    addr?:IAddress,
    deliveryChannel?:number,
    orderIDs?:string[],
    supplier?:ISupplier,
    token?:string,
};

export const CommentLevel = [
    '非常差',
    '差',
    '一般',
    '好',
    '非常好'
]; 


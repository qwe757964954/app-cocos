import { Log } from "bos/exports";
import { QueryQueue } from "bos/exports";
import * as PrizeMallPKG from 'idl/tss/hall/prizemall.v2';
import * as ExchangeOrderPKG from 'idl/tss/hall/exchangeorder.v7';
import * as UserinfoPKG  from 'idl/tss/hall/userinfo.v1';
import * as PrizesupplierPKG  from 'idl/tss/hall/prizesupplier.v1';
import * as PrizecommentPKG  from 'idl/tss/hall/prizecomment.v2';
import { Void } from "idl/base/base";
export class Gateway {
    private queryQueue = new QueryQueue({
        delegate: {
            batchQuery: async (keys: number[])=>{
            }
        },
        intervalMs: 100,
    })

    constructor() {
        this.queryQueue.run()
    }
    
    async getListTabByUser(){
        let ret = await PrizeMallPKG.PrizeMall.ListTabByUser(new Void({}));
        Log.w("prize getListTab...", ret)
        if (ret.err) {
            return
        }
        return ret.resp.tab;
    }


    async getListSKUByUser(req:PrizeMallPKG.IListSKUByUserReq){
        let ret = await PrizeMallPKG.PrizeMall.ListSKUByUser(req);
        Log.w("prize getListSKUByUser", ret)
        if (ret.err) {
            return
        }
        return ret.resp;
    }

    async searchSKUByUser(req:PrizeMallPKG.ISearchSKUByUserReq){
        let ret = await PrizeMallPKG.PrizeMall.SearchSKUByUser(req);
        Log.w("prize searchSKUByUser", ret)
        if (ret.err) {
            return
        }
        return ret.resp;
    }

    async getSPUByUser(req:PrizeMallPKG.IGetSPUByUserReq){
        let ret = await PrizeMallPKG.PrizeMall.GetSPUByUser(req);
        Log.w("prize GetSPUByUser", ret)
        if (ret.err){
            return
        }
        return ret.resp?.info
    }
    async createOrder(req:PrizeMallPKG.ICreateOrderReq){
        let ret = await PrizeMallPKG.PrizeMall.CreateOrder(req);
        Log.w("prize CreateOrder", ret)
        return ret
    } 

    async getCountOrderNum(){
        let ret = await ExchangeOrderPKG.ExchangeOrder.CountOrder({});
        Log.w("order CountOrder", ret)
        if (ret.err){
            return
        }
        return ret.resp
    } 

    async receiptByCustomer(req:ExchangeOrderPKG.IReceiptByCustomerReq){
        let ret = await ExchangeOrderPKG.ExchangeOrder.ReceiptByCustomer(req);
        if (ret.err){
            return
        }
        return ret.resp
    } 

    async applyCancelOrder(req:ExchangeOrderPKG.IApplyCancelOrderReq){
        let ret = await ExchangeOrderPKG.ExchangeOrder.ApplyCancelOrder(req);
        if (ret.err){
            return
        }
        return ret.resp
    } 

    async deleteOrder(req:ExchangeOrderPKG.IDeleteOrderReq){
        let ret = await ExchangeOrderPKG.ExchangeOrder.DeleteOrder(req);
        if (ret.err){
            return
        }
        return ret.resp
    } 

    async getListOrder(req:ExchangeOrderPKG.IListOrderReq){
        let ret = await ExchangeOrderPKG.ExchangeOrder.ListOrder(req);
        Log.w("order getListOrder", ret)
        if (ret.err){
            return
        }
        return ret.resp
    } 

    async getListUserShoppingCartItem(req:PrizeMallPKG.IListUserShoppingCartItemReq){
        let ret = await PrizeMallPKG.PrizeMall.ListUserShoppingCartItem(req);
        Log.w("order getListUserShoppingCartItem", ret)
        if (ret.err){
            return
        }
        return ret.resp
    } 

    async saveUserShoppingCartItem(req:PrizeMallPKG.ISaveShoppingCartItemReq){
        let ret = await PrizeMallPKG.PrizeMall.SaveUserShoppingCartItem(req);
        Log.w("order SaveUserShoppingCartItem", ret)
        return !ret.err;
    }

    //加入购物车
    async addUserShoppingCartItem(req:PrizeMallPKG.IAddShoppingCartItemReq){
        let ret = await PrizeMallPKG.PrizeMall.AddUserShoppingCartItem(req);
        Log.w("order AddShoppingCartItemReq", ret)
        return !ret.err;
    }
    
    async getShopCartNum(){
        let ret = await PrizeMallPKG.PrizeMall.ListUserShoppingCartItem({page:1,pageSize:1});
        if (ret.err) {
            return 0;
        }
        return ret.resp.total;
    }


    async getOrderByID(req:ExchangeOrderPKG.IGetOrderReq){
        let ret = await ExchangeOrderPKG.ExchangeOrder.GetOrder(req);
        if (ret.err)return;
        return ret.resp.order;  
    }

    //获取地址列表
    async getListAddress(req:UserinfoPKG.IListShippingAddrReq){
        let ret = await UserinfoPKG.Userinfo.ListShippingAddr(req);
        Log.w("address ListShippingAddr", ret)
        if (ret.err) return;
        return ret.resp;
    }

    //获取地址根据ID
    async getAddressByID(req:UserinfoPKG.IGetShippingAddrReq){
        let ret = await UserinfoPKG.Userinfo.GetShippingAddr(req);
        Log.w("address GetShippingAddr", ret)
        if (ret.err) return;
        return ret.resp;
    }

    //创建地址列表
    async createShippingAddr(req:UserinfoPKG.ICreateShippingAddrReq){
        let ret = await UserinfoPKG.Userinfo.CreateShippingAddr(req);
        Log.w("address createShippingAddr", ret)
        if (ret.err) return;
        return ret.resp;
    }

    //删除
    async deleteShippingAddr(req:UserinfoPKG.IDeleteShippingAddrReq){
        let ret = await UserinfoPKG.Userinfo.DeleteShippingAddr(req);
        Log.w("address deleteShippingAddr", ret)
        if (ret.err) return;
        return !ret.err;
    }


    async updateShippingAddr(req:UserinfoPKG.IUpdateShippingAddrReq){
        let ret = await UserinfoPKG.Userinfo.UpdateShippingAddr(req);
        Log.w("address updateShippingAddr", ret)
        if (ret.err) return;
        return ret.resp;
    }
    
 
    
    //搜索自提点
    async searchSupplier(req:PrizesupplierPKG.ISearchSupplierReq){
        let ret = await PrizesupplierPKG.PrizeSupplier.SearchSupplier(req);
        Log.w("address SearchSupplier", ret)
        if (ret.err) return;
        return ret.resp.suppliers; 
    }

    //搜索自提点
    async modifyReceiveAddr(req:ExchangeOrderPKG.IModifyReceiveAddrReq){
        let ret = await ExchangeOrderPKG.ExchangeOrder.ModifyReceiveAddr(req);
        Log.w("address modifyReceiveAddr", ret)
        return ret;
    }

    //创建评论
    async createComment(req:PrizecommentPKG.ICreateCommentReq){
        let ret = await PrizecommentPKG.Prizecomment.CreateComment(req);
        if (ret.err) return;
        return ret.resp; 
    }

    async getListComment(req:PrizecommentPKG.IListCommentReq){
        let ret = await PrizecommentPKG.Prizecomment.ListComment(req);
        return ret; 
    }

    async likeComment(req:PrizecommentPKG.ILikeCommentReq){
        let ret = await PrizecommentPKG.Prizecomment.LikeComment(req);
        return ret; 
    }

    async createCommentReport(req:PrizecommentPKG.ICreateCommentReportReq){
        let ret = await PrizecommentPKG.Prizecomment.CreateCommentReport(req);
        return ret; 
    }


    async saveAfterSupport(req:ExchangeOrderPKG.ISaveAfterSupportReq){
        let ret = await ExchangeOrderPKG.ExchangeOrder.SaveAfterSupport(req);
        return ret; 
    } 

    async getAfterSupport(req:ExchangeOrderPKG.IGetAfterSupportReq){
        let ret = await ExchangeOrderPKG.ExchangeOrder.GetAfterSupport(req);
        return ret; 
    } 

    async createAfterSupportComment(req:ExchangeOrderPKG.ICreateAfterSupportCommentReq){
        let ret = await ExchangeOrderPKG.ExchangeOrder.CreateAfterSupportComment(req);
        return ret; 
    } 
}
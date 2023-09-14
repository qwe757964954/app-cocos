import { _decorator, Component, Label, Node,instantiate} from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { UIMgr } from 'bos/framework/gui/UIMgr';
import { Log, NodeUtil, resLoader, uiMgr } from 'bos/exports';
import { App } from 'app/App';
import { PrizeApp } from '../../../PrizeApp';
import {ICountOrderResp} from 'idl/tss/hall/exchangeorder.v7';
import { Avatar } from 'app/modules/common/avatar/src/Avatar';
import {PrizeCenterUnRead} from '../common/PrizeCenterUnRead';

@ccclass('PrizeCenterMyPage')
export class PrizeCenterMyPage extends XComponent {
    @property(Label)
    userName:Label = null!;

    @property(Node)
    payNode:Node = null!;

    @property(Node)
    shipNode:Node = null!;

    @property(Node)
    commentNode:Node = null!;

    @property(Node)
    receiptNode:Node = null!;

    @property(Node)
    avatar:Node = null!;

    @property(PrizeCenterUnRead)
    shopCartNum:PrizeCenterUnRead = null!;

    onLoad(): void {
        this.userName.string = App.userMgr.loginUser.nickname;
        this.avatar.getComponent(Avatar)!.setUserID( App.userMgr.loginUid);
        (async()=>{
            let num = await this.promiseOne<any>(PrizeApp.PrizeMgr.getShopCartNum());
            this.shopCartNum.updateView(num);
            this.shopCartNum.node.active = num > 0;

            let resp = await this.promiseOne<any>(PrizeApp.PrizeMgr.getCountOrderNum());
            this.setOrderNum(resp);
        })()
    }

    setOrderNum(resp:ICountOrderResp){
        NodeUtil.sendMessage(this.payNode,'updateView',resp.PayStatePending ?? 0);
        NodeUtil.sendMessage(this.shipNode,'updateView',resp.DeliveryStatePending ?? 0);
        NodeUtil.sendMessage(this.receiptNode,'updateView',resp.DeliveryStateWaitReceipt ?? 0);
        NodeUtil.sendMessage(this.commentNode,'updateView',resp.CommentStatePending ?? 0);
    }

    onClickShopCart() {
        uiMgr.loadPage('prizeCenter@res/prefab/shopCar/PrizeCenterShopCarList');
    }

    onClickMyOrder(event: Event, tag: string) {
        Log.w('onClickMyOrder tag',tag);
        let index = Number(tag);
        uiMgr.loadPage('prizeCenter@res/prefab/order/PrizeCenterOrderList',{params:{defaultIndex:index}});
    }    

    onClickEditAddress() {
        uiMgr.loadPage('prizeCenter@res/prefab/addressList/AddressList');
    }
}
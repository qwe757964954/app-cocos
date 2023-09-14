import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import * as ExchangeOrderPKG from 'idl/tss/hall/exchangeorder.v7'
import { AfterSalesPrize } from './AfterSalesPrize';
import { Log, StringUtil, uiMgr } from 'bos/exports';
import { Label } from 'cc';
import { EditBox } from 'cc';
import { App } from 'app/App';
import { PrizeApp } from '../../../PrizeApp';
import { SelectImgLayout } from './SelectImgLayout';

const SupportStr = ['请选择','退货退款','错发漏发','商品破损'];
@ccclass('ApplyScales')
export class ApplyScales extends XComponent {
    @property(AfterSalesPrize)
    salesPrize:AfterSalesPrize = null!;

    @property(Label)
    supportLab:Label = null!;

    @property(Label)
    limitTip:Label = null!;

    @property(EditBox)
    editBox:EditBox = null!;

    @property(Node)
    supportNode:Node = null!;

    @property(SelectImgLayout)
    imgLayout:SelectImgLayout = null!;

    private _order:ExchangeOrderPKG.IOrder = null;
    private _supportType = ExchangeOrderPKG.SupportType.SupportTypeUnknown;
    private _isGetGoods = false;

    private _ossUrl:any = null!;

    setup(params:any){
        this._order = params;
        this.initGUI();
    }

    initGUI(){
        let orderItem = this._order.orderItem[0];
        this.salesPrize.updateView(orderItem);
        //是否追加内容
        this.supportNode.active = this._order.afterSupportState == ExchangeOrderPKG.AfterSupportState.AfterSupportStateNever
    }

    setSupportStr(){
        this.supportLab.string = `${SupportStr[this._supportType]} >`
    }

    changeText(num:number){
        this.limitTip.string = `${num}/200`
    }

    async saveAfterSupport(){
        let req:ExchangeOrderPKG.ISaveAfterSupportReq = {
            afterSupport:{
                orderID:this._order.ID,
                uId:App.userMgr.loginUid,
                supportType:this._supportType,
                isGetGoods:this._isGetGoods,
                comment:[{
                    from:App.userMgr.loginUid,
                    content:this.editBox.string,
                    images:this._ossUrl ?? [],
                }]
            }
        }
        let ret = await this.promiseOne<any>(PrizeApp.PrizeMgr.saveAfterSupport(req));
        if (ret.err){
            uiMgr.showToast('提交失败');
        }else{
            uiMgr.showToast("提交成功,请等候处理");
            PrizeApp.PrizeMgr.emit(PrizeApp.PrizeMgr.EventType.OrderStateChange);
            uiMgr.popPage();
        }
    }

    async createAfterSupportComment(){
        let req:ExchangeOrderPKG.ICreateAfterSupportCommentReq = {
            orderId:this._order.ID,
            afterSupportComment:{
                from:App.userMgr.loginUid,
                content:this.editBox.string,
                images:this._ossUrl ?? [],
            }
        }
        let ret = await this.promiseOne<any>(PrizeApp.PrizeMgr.createAfterSupportComment(req));
        if (ret.err){
            uiMgr.showToast('提交失败');
        }else{
            uiMgr.showToast("提交成功,请等候处理");
            PrizeApp.PrizeMgr.emit(PrizeApp.PrizeMgr.EventType.OrderStateChange);
            uiMgr.popPage();
        }
    }

    onEventSupportType(type:number){
        this._supportType = type
        this.setSupportStr();
    }

    onTextChanged(text, editbox, customEventData){
        let num = StringUtil.stringLen(text);
        this.changeText(num);
        if ((num) > 200){
            uiMgr.showToast('您的字数达到上限');
            return 
        }
    }

    onCheckEvent(event: Event, tag: string){
       this._isGetGoods = tag == 'true';
    }

    onClickSupportType(){
        uiMgr.loadPopup("prizeCenter@res/prefab/support/SupportType", {params : {delegate:this,defaultType:this._supportType}});
    }

    onCheckConfirm(event: Event, tag: string){
        (async()=>{
            uiMgr.showLoading();
            let uploadResult = await this.imgLayout.uploadImgTask();
            this._ossUrl = uploadResult;
            if (!uploadResult){
                uiMgr.showToast('图片上传失败了');
                uiMgr.hideLoading();
                return
            }
            let contentText = this.editBox.string;
            if(StringUtil.stringLen(contentText) < 1){
                uiMgr.showToast('请输入问题详情,不能低于1个字');
                uiMgr.hideLoading();
                return
            }
            if (this._order.afterSupportState == ExchangeOrderPKG.AfterSupportState.AfterSupportStateNever) {
                if (this._supportType == ExchangeOrderPKG.SupportType.SupportTypeUnknown as number){
                    uiMgr.showToast('请选择售后类型');
                    uiMgr.hideLoading();
                    return
                }
                this.saveAfterSupport();
            }else{
                this.createAfterSupportComment();
            } 
            uiMgr.hideLoading();
        })();
     }
}
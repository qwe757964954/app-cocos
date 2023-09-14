import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { IOrder } from 'idl/tss/hall/exchangeorder.v7';
import { Label } from 'cc';
import { EditBox } from 'cc';
import { CommentLevel } from '../../interfaceData/define'
import { BundleSprite } from 'bos/framework/component/BundleSprite';
import { Log, uiMgr } from 'bos/exports';
import { RichText } from 'cc';
import { StringUtil } from 'bos/utils/StringUtil';
import { OrderPrizeItem } from '../common/OrderPrizeItem';
import { PrizeApp } from '../../../PrizeApp';
import {ICreateCommentReq}  from 'idl/tss/hall/prizecomment.v2';
import { App } from 'app/App';
import { SelectImgLayout } from './SelectImgLayout';


@ccclass('ApplyComment')
export class ApplyComment extends XComponent {
    @property(Node)
    icon:Node = null!;

    @property(Label)
    levelLab:Label = null!;

    @property(Label)
    prizeName:Label = null!;

    @property(RichText)
    numLab:RichText = null!;

    @property(EditBox)
    editBox:EditBox = null!;

    @property(Node)
    starPanel:Node = null!;

    @property(SelectImgLayout)
    imgLayout:SelectImgLayout = null!;

    private _order:IOrder = null;
    private _level = 1;//默认五星好评
    private _ossUrl:any = null!;

    setup(params:any){
        this._order = params;
        this.changeStarLevel(5);
        this.changeText(0);
        let url = this._order.orderItem[0].image;
        this.prizeName.string = this._order.orderItem[0].name;
        this.icon.getComponent(OrderPrizeItem)!.setUrl(url);
    }

    changeStarLevel(index:number){
        if(index == this._level) return;
        this._level = index;
        this.levelLab.string = CommentLevel[index-1] ?? '非常好';
        for(let i = 1; i <= 5; i++){
            let star = this.starPanel.getChildByName(`star${i}`);
            if(star){
                let sprite = star.getComponent(BundleSprite);
                if (sprite) {
                    sprite.spriteFrame = i > this._level? 'prizeCenter@res/commonRes/starNomal':`prizeCenter@res/commonRes/star${i}`;
                }
            }
        }
    }

    changeText(num:number){
        this.numLab.string = `<color=#3B457F>${num}</color><color=#838CA7>/200</color>`
    }

    async sendComment(){
        uiMgr.showLoading();
        let uploadResult = await this.imgLayout.uploadImgTask();
        this._ossUrl = uploadResult;
        if (!uploadResult){
            uiMgr.showToast('图片上传失败了');
            uiMgr.hideLoading();
            return
        }
        let contentText = this.editBox.string;
        let orderItem = this._order.orderItem[0];
        let req:ICreateCommentReq = {
            comment:{
                orderId:this._order.ID,
                spuId:orderItem.SPUID,
                skuId:orderItem.SKUID,
                spec:orderItem.spec,
                uid:App.userMgr.loginUid,
                star:this._level,
                images:this._ossUrl ?? [],
                content:contentText,
                avatar:App.userMgr.loginUser.avatar,
            }
        }
        let resp = await PrizeApp.PrizeMgr.createComment(req);
        if (resp){
            PrizeApp.PrizeMgr.emit(PrizeApp.PrizeMgr.EventType.OrderStateChange);
            if ((resp.mungNum) && (resp.mungNum > 0)){
                uiMgr.showToast(`恭喜您获得${resp.mungNum}奖券，请到邮箱领取`); 
            }
            uiMgr.popPage();
        }
        uiMgr.hideLoading();
    }

    onTextChanged(text, editbox, customEventData){
        let num = StringUtil.stringLen(text);
        this.changeText(num);
        if ((num) > 200){
            uiMgr.showToast('您的评论字数达到上限');
            return 
        }
    }
    

    onClickStar(event: Event, level: string){
        this.changeStarLevel(parseInt(level));
    }

    onClickCreate(){
        let contentText = this.editBox.string;
        if(StringUtil.stringLen(contentText) < 1){
            uiMgr.showToast('请输入不少于1个字');
            return
        }
        if(StringUtil.stringLen(contentText) > 200){
            uiMgr.showToast('您的评论字数达到上限');
            return
        }
        this.sendComment();
    }
}
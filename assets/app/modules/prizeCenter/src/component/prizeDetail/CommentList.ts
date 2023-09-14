import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Log } from 'bos/exports';
import { ScrollView } from 'cc';
import * as PrizecommentPKG  from 'idl/tss/hall/prizecomment.v2';
import { PrizeApp } from '../../../PrizeApp';
import { Prefab } from 'cc';
import { instantiate } from 'cc';
import { CommentItem } from '../common/CommentItem';
@ccclass('CommentList')
export class CommentList extends XComponent {
    @property(ScrollView)
    scrollView:ScrollView = null!;

    @property(Prefab)
    item:Prefab = null!;

    private _page = 1;
    private _pageSize = 30;
    private _spuId = 0;
    private _currentType = PrizecommentPKG.ListCommentType.ListCommentTypeLike

    setup(params:{spuId:number}){
        Log.w("CommentList",params)
        this._spuId = params?.spuId;
        this.reqData();
    }

    async reqData(){
        let req:PrizecommentPKG.IListCommentReq = {
            spuId:this._spuId,
            page:this._page,
            pageSize:this._pageSize,
            type:this._currentType,
        }
        let ret  = await this.promiseOne<any>(PrizeApp.PrizeMgr.getListComment(req));
        let comment = ret.resp.comment
        comment.forEach(element => {
            let item = instantiate(this.item);
            this.scrollView.content!.addChild(item);
            item.getComponent(CommentItem)!.updateView(element);
        });
    }

}
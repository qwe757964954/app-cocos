import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import {IAfterSupportComment} from 'idl/tss/hall/exchangeorder.v7'
import { Label } from 'cc';
import { PrizeUtil } from '../../utils/PrizeUtil';
import { OssImgItem } from '../common/OssImgItem';
import { Avatar } from 'app/modules/common/avatar/src/Avatar';
import { App } from 'app/App';

@ccclass('AfterSalesItem')
export class AfterSalesItem extends XComponent {
    @property(Label)
    createBy:Label = null!;

    @property(Label)
    content:Label = null!;

    @property(Node)
    imageNode:Node = null!;

    @property(Prefab)
    imageItem:Prefab = null!;

    @property(Avatar)
    avatar:Avatar = null!;

    @property(Label)
    userName:Label = null!;

    updateView(comment:IAfterSupportComment){

        this.content.string = comment.content;
        this.createBy.string = PrizeUtil.formatDate2(comment.createAt*1000);
        if(comment.images.length == 0) {
            this.imageNode.active = false;
            return;
        }
        comment.images.forEach((img)=>{
            let item = instantiate(this.imageItem);
            this.imageNode.addChild(item);
            item.getComponent(OssImgItem)!.setUrl(img);
        })
        this.avatar.setUserID(comment.from);
        (async()=>{
            let user = await App.userMgr.getUserByID(comment.from).finish();
            this.userName.string = user.nickname;
        })()
    }
}
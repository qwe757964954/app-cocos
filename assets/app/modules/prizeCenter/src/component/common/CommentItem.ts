import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import * as PrizecommentPKG  from 'idl/tss/hall/prizecomment.v2';
import { Label } from 'cc';
import { PrizeUtil } from '../../utils/PrizeUtil';
import { BundleSprite } from 'bos/framework/component/BundleSprite';
import { OssImgItem } from './OssImgItem'
import { PrizeApp } from '../../../PrizeApp';
import { Color } from 'cc';
import { Avatar } from 'app/modules/common/avatar/src/Avatar';
import { PhotoSource } from 'app/domain/photo/PhotoSource';
import { uiMgr } from 'bos/exports';
@ccclass('CommentItem')
export class CommentItem extends XComponent {
    @property(Label)
    timeLab:Label = null!

    @property(Label)
    contentLab:Label = null!

    @property(Node)
    starLayout:Node = null!

    @property(Node)
    imgLayout:Node = null!

    @property(Node)
    likeBtn:Node = null!

    @property(Label)
    likeLab:Label = null!

    @property(Label)
    uerName:Label = null!

    @property(Label)
    specLab:Label = null!

    @property(Node)
    avatar:Node = null!

    private _comment:PrizecommentPKG.ICommentView = null;

    updateView(comment:PrizecommentPKG.ICommentView){
        this._comment = comment;
        this.timeLab.string = PrizeUtil.formatDate2(comment.createdAt*1000);
        this.contentLab.string = comment.content;
        this.avatar.getComponent(Avatar)!.setUserID(comment.uid);
        this.uerName.string = comment.nickname;
        this.specLab.string = comment.spec;
        this.setStarLevel(comment.star);
        this.setImg();
        this.setLike();
    }

    setLike(){
        this.likeLab.string = this._comment.likeNum.toString();
        let sprite = this.likeBtn.getComponent(BundleSprite);
        if (sprite ) {
            sprite.spriteFrame = this._comment.isLike?'prizeCenter@res/commonRes/ResApp_Hall_Prizes_icon_zang_s':'prizeCenter@res/commonRes/ResApp_Hall_Prizes_icon_zang_g'
        }
        this.likeLab.color = this._comment.isLike?new Color(255, 153, 83, 255):new Color(136, 136, 136, 255);
    }

    setStarLevel(level:number){
        for(let i = 1;  i< 6;i++){
            let star = this.starLayout.getChildByName(`star${i}`)
            if(i>level){
                let sprite = star.getComponent(BundleSprite);
                if (sprite) {
                    sprite.spriteFrame = 'prizeCenter@res/commonRes/starNomal'
                }
            }
        }
    }

    setImg(){
        if(this._comment.images.length == 0){
            this.imgLayout.active = false;
            return;
        }
        for(let i = 0;i<3;i++){
            let item = this.imgLayout.getChildByName(`OssImgItem${i}`)
            if (this._comment.images[i]){
                item.active = true;
                item.getComponent(OssImgItem)!.setUrl(this._comment.images[i]);
            }else{
                item.active = false;
            }
        }
    }

    onClickLike(){
        (async()=>{
            let req:PrizecommentPKG.ILikeCommentReq = {
                commentId:this._comment.id,
                like:!this._comment.isLike,
            }
            let ret = await this.promiseOne<any>(PrizeApp.PrizeMgr.likeComment(req))
            if(!ret.err){
                this._comment.isLike = !this._comment.isLike;
                this._comment.likeNum = this._comment.isLike ? this._comment.likeNum + 1 :this._comment.likeNum -1;
                this.setLike();
            }
        })()
    }

    onClickReport(){
        
    }

    onClickPicture(event: Event, tag: string){
        let list: PhotoSource[] = [];
        let defaultPageIndex = 0;
        for (let index = 0; index < this._comment.images.length; index++) {
            const element = this._comment.images[index];
            let ps = new PhotoSource();
            ps.url = element;
            list.push(ps);
            if (parseInt(tag) == index){
                defaultPageIndex = index;
            }
        }
        uiMgr.loadPage("common@photo/res/prefab/Photo",{params:{data:list,defaultPageIndex:defaultPageIndex},activePrev:true})
    }
}
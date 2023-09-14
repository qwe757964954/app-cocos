import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { IDeleteCommentReq } from 'idl/mpff/social/feed.v1';
import { FeedEntity } from 'qsdk/feed/db/Model';
import { uiMgr } from 'bos/exports';
import { Feed } from 'qsdk/feed/Feed';
import { FeedEvent } from 'qsdk/feed/define';
import { UITransform } from 'cc';

@ccclass('CommentOperationViewCtr')
export class CommentOperationViewCtr extends XComponent {

    @property(Node)
    contentView = null;

    private commentID = null
    private feedEntity: FeedEntity = null
    private touchPosition
    setup(params: any) {
        this.commentID = params.commentID
        this.feedEntity = params.feedEntity
        this.touchPosition = params.touchPosition

        if (this.touchPosition) {
            let trs = this.node.getComponent(UITransform)
            let pos = trs.convertToNodeSpaceAR(this.touchPosition);
       
            let trs2 = this.contentView.getComponent(UITransform)
            pos.x = pos.x + trs2.width / 2
            pos.y = pos.y + trs2.height / 2

            this.contentView.position = pos
        }

    }

    onClickDelete() {
        console.log("CommentOperationViewCtr:onClickDelete")
        let req: IDeleteCommentReq = {
            commentID: this.commentID
        }

        this.feedEntity.deleteComment(this.commentID)
        this.onClickClose()
    }

    onClickCopy() {
        this.onClickClose()
    }


    onClickClose() {
        this.node.removeFromParent()
    }
}
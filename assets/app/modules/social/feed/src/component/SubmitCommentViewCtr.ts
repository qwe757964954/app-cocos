import { _decorator, Component, EditBox, log, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Feed } from 'qsdk/feed/Feed';
import { FeedEntity } from 'qsdk/feed/db/Model';
import { SimpleButtonEx } from 'app/modules/social/common/src/component/SimpleButtonEx';
import { ISubmitCommentReq, SubmitCommentReq } from 'idl/mpff/social/feed.v1';
import { SocialFeedEvent } from 'app/modules/social/common/src/Define';
import { FeedEvent } from 'qsdk/feed/define';
import { uiMgr } from 'bos/exports';
import { UITransform, Vec3 } from 'cc';

@ccclass('SubmitCommentViewCtr')
export class SubmitCommentViewCtr extends XComponent {

    @property(EditBox)
    editBox: EditBox = null

    @property(SimpleButtonEx)
    submitBtn: SimpleButtonEx = null

    @property(Node)
    topNode: Node = null

    feedEntity: FeedEntity = null
    commentID: number = null
    start() {

    }

    setup(params) {
        this.feedEntity = params.feedEntity
        this.commentID = params.commentID
    }

    onClickSubmit() {
        let str = this.editBox.string
        let req: ISubmitCommentReq = {
            postID: this.feedEntity.getPostID(),
            content: str,
            toCommentID: this.commentID
        }
        log("Feed.getInstance().submitComment:req", req)
        this.feedEntity.submitComment(str).then(({ err, resp }) => {
            log(" Feed.getInstance().submitComment callback", err, resp)
            if (!err) {
                this.onClickClose()
                Feed.getInstance().emit(FeedEvent.ON_NOTIFY_UPDATE_FEED, this.feedEntity.getPostID())
            }
        })
    }


    onClickClose() {
        this.node.removeFromParent()
    }

    onTextChange() {
        let enable = this.editBox.string === "" ? false : true
        this.submitBtn.setEnabled(enable)
    }

    getSubmitPosition() {
        let trs = this.topNode.getComponent(UITransform)
        let pos = trs.convertToWorldSpaceAR(new Vec3(0, 0, 0));
        return pos
    }


}
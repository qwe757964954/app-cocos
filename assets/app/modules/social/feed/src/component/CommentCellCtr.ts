import { _decorator, Component, log, Node, RichText } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Feed } from 'qsdk/feed/Feed';
import { FeedEntity } from 'qsdk/feed/db/Model';
import { SocialFeedEvent } from '../../../common/src/Define';
import { IDeleteCommentReq } from 'idl/mpff/social/feed.v1';
import { Label } from 'cc';
import { eventSystem } from 'bos/exports';
import { UITransform } from 'cc';
import { Vec3 } from 'cc';
import { App } from 'app/App';

@ccclass('CommentCellCtr')
export class CommentCellCtr extends XComponent {
    @property(Label)
    contentLabel;

    comments;
    index;
    respUser;

    comment;
    commentID;

    postID;
    toCommentID;

    longClickTimer = 0
    longClickDuration = 0.5
    isLongPress = false

    touchPos;

    feedEntity: FeedEntity;

    start(): void {
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    }

    updateView(feedEntity: FeedEntity, index) {
        this.feedEntity = feedEntity
        this.updateText(feedEntity, index)
    }

    async updateText(feedEntity: FeedEntity, index) {
        this.comments = feedEntity.getCommentList();
        this.index = index;

        // this.commentUser = null;
        this.respUser = null;

        const comment = this.comments[this.index];
        this.comment = comment;

        this.commentID = comment.commentID;

        let commentUser = await App.userMgr.getUserByID(comment.userID).finish()
        let richText: string = ""
        const commentName = this.createRichTextSegment(commentUser.nickname);
        richText += commentName

        this.postID = comment.postID;
        this.toCommentID = comment.commentID;

        if (comment.toCommentID && comment.toCommentID !== 0) {

            const respDesc = this.createRichTextSegment("回复",);
            richText += respDesc

            let toComment = this.feedEntity.getCommentByCommentID(comment.toCommentID)
            if (toComment) {
                let toCommentUser = await App.userMgr.getUserByID(comment.toCommentID).finish()
                const respName = this.createRichTextSegment(toCommentUser.nickname);
                richText += respName
            }
        }

        const content = this.createRichTextSegment(":" + comment.content,);
        richText += content

        // console.log("commentText==", richText)
        //this.contentLabel.string = `<color=#272727>${richText}t</color>`
        this.contentLabel.string = richText

    }

    createRichTextSegment(text) {
        let richTextSegment = text
        return richTextSegment;
    }


    onTouchStart(event) {
        let trs = this.node.getComponent(UITransform)
        let pos = trs.convertToWorldSpaceAR(new Vec3(0, 0, 0));

        this.isLongPress = false

        this.touchPos = pos

        // 开始计时长按时间
        this.longClickTimer = 0;
        this.schedule(this.checkLongClick, 0.1);
    }

    onTouchEnd(touch, event) {

        // 停止计时长按时间
        this.unschedule(this.checkLongClick);
        // 如果长按时间小于阈值，则执行普通点击操作
        if (this.longClickTimer < this.longClickDuration) {
            // 执行普通点击操作

            this.onClickCell()
        }
    }

    onTouchCancel(event) {
        // 停止计时长按时间
        this.unschedule(this.checkLongClick);
    }

    checkLongClick() {
        if (this.isLongPress) {
            return
        }
        // 更新长按时间
        this.longClickTimer += 0.1;
        // 如果长按时间超过阈值，则执行长按操作
        if (this.longClickTimer >= this.longClickDuration) {
            // 执行长按操作

            // 取消按钮的普通点击效果
            this.isLongPress = true
            this.onLongPress()
        }
    }

    // 长按自己的直接删除
    onLongPress() {
        let params = {
            feedEntity: this.feedEntity,
            commentID: this.commentID,
            touchPosition: this.touchPos
        }
        eventSystem.emit(SocialFeedEvent.ON_SHOW_COMMENT_OPT_VIEW, params)

    }


    // 点击某一条可以评论
    onClickCell() {
        let params = {
            feedEntity: this.feedEntity,
            commentID: this.commentID,
            touchPosition: this.touchPos
        }
        eventSystem.emit(SocialFeedEvent.ON_SHOW_SUBMIT_COMMENT_VIEW, params)
    }



}
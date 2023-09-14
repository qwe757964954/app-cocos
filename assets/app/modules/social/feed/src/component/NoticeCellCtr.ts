import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Notice } from 'idl/mpff/social/feed.v1';
import { SocialTimeUtil } from 'app/modules/social/common/src/SocialTimeUtil';
import { Feed, NoticeAndPostComment } from 'qsdk/feed/Feed';
import { Picture } from 'qsdk/exports';
import { Label } from 'cc';
import { Avatar } from 'app/modules/common/avatar/src/Avatar';
import { App } from 'app/App';

@ccclass('NoticeCellCtr')
export class NoticeCellCtr extends XComponent {
    @property(Node)
    nameLabel = null;
    @property(Node)
    likeView = null;
    @property(Node)
    timeLabel = null;
    @property(Node)
    commentLabel = null;
    @property(Node)
    postContentLabel = null;
    @property(Node)
    postContentView = null;

    @property(Avatar)
    avatarView: Avatar = null;


    start() {

    }

    updateView(notice: NoticeAndPostComment): void {

        let fromUserID = notice.fromUserID;

        this.avatarView.setUserID(fromUserID)

        //this.avatarView.setUID(user.userID);
        App.userMgr.getUserByID(fromUserID).finish().then((user) => {
            this.nameLabel.getComponent(Label).string = user.nickname;
        })

        this.timeLabel.getComponent(Label).string = SocialTimeUtil.getFeedCreatedDesc(notice.createdAt);

        let feedEntity = Feed.getInstance().getFeedEntity(notice.postID);

        if (feedEntity) {
            let resources = feedEntity.getResources();

            if (resources && resources.length >= 1) {
                this.postContentLabel.getComponent(Label).string = "";
                this.postContentView.active = true;
                this.postContentView.getComponent(Picture).setUrl(resources[0].url);
            } else {
                this.postContentLabel.getComponent(Label).string = feedEntity.getPost().content;
                this.postContentView.active = false;
            }
        } else {
            this.postContentView.active = false;
            this.postContentLabel.getComponent(Label).string = "";
        }

        const noticeType = notice.noticeType;

        if (noticeType == 1) {
            this.commentLabel.active = true;
            this.likeView.active = false;

            let comment = feedEntity.getCommentByCommentID(notice.commentID);

            if (comment) {
                this.commentLabel.getComponent(Label).string = comment.content;
            } else {
                this.commentLabel.active = false;
            }
        } else if (noticeType == 2) {
            this.commentLabel.active = false;
            this.likeView.active = true;
        }
    }

}
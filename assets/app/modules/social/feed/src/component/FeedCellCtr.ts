import { _decorator, Node, Label, log, director, Prefab, instantiate } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';

import { Feed } from 'qsdk/feed/Feed';

import { SubmitCommentViewCtr } from './SubmitCommentViewCtr';
import { CommentViewCtr } from './CommentViewCtr';
import { FeedEntity } from 'qsdk/feed/db/Model';
import { LikeUserViewCtr } from './LikeUserViewCtr';
import { SocialFeedEvent } from '../../../common/src/Define';
import { SocialTimeUtil } from 'app/modules/social/common/src/SocialTimeUtil';
import { ResourcesViewCtr } from './ResourcesViewCtr';
import { DeletePostReq, IDeletePostReq } from 'idl/mpff/social/feed.v1';
import { eventSystem, uiMgr } from 'bos/exports';
import { Avatar } from 'app/modules/common/avatar/src/Avatar';
import { App } from 'app/App';
import { emit } from 'process';
import { UITransform } from 'cc';
import { Vec3 } from 'cc';




@ccclass('FeedCellCtr')
export class FeedCellCtr extends XComponent {

    @property(Avatar)
    avatar: Avatar = null;

    @property(Label)
    nameLabel = null;

    @property(Label)
    contentLabel = null;

    @property(Label)
    timeLabel = null;

    @property(Label)
    likeLabel = null;

    @property(Node)
    deleteBtn = null;

    @property(Node)
    likeCommentNode = null

    @property(Node)
    likeUserView = null

    @property(Node)
    commentView = null

    @property(Prefab)
    submitCommentPrefab = null

    @property(Node)
    resourcesView = null

    @property(Node)
    interactiveView: Node = null

    @property(Node)
    moreBtn: Node = null

    private isLike: boolean;
    private feedEntity: FeedEntity;
    private userID: number;
    private postID: number;

    start() {

    }

    updateView(feedEntity: FeedEntity) {
        // console.log("FeedCellUpdateView", feedEntity)
        if (!feedEntity) {
            return
        }

        this.feedEntity = feedEntity

        this.avatar.setUserID(feedEntity.getUserID())

        let post = feedEntity.getPost()
        this.postID = feedEntity.getPostID()
        // 名称
        this.userID = this.feedEntity.getUserID()

        App.userMgr.getUserByID(this.userID).finish().then((user) => {
            this.nameLabel.string = user.nickname
        })

        this.deleteBtn.active = this.feedEntity.isMyPost()
        // 内容
        let content = post.content
        this.contentLabel.string = content || ""
        this.processResources()

        // 创建时间
        let createdAt = post.createdAt
        this.timeLabel.string = SocialTimeUtil.getFeedCreatedDesc(createdAt)


        this.processInteractive()
       


    }

    processInteractive(){
        this.processLikeText();
        // 点赞 评论
        this.processComment();

        this.likeCommentNode.active = false

        if (!this.likeUserView.active && !this.commentView.active) {
            this.interactiveView.active = false
        } else {
            this.interactiveView.active = true
        }
    }


    processResources() {
        this.resourcesView.getComponent(ResourcesViewCtr).updateView(this.feedEntity)
    }


    processLikeText(): void {
        this.likeCommentNode.active = false
        if (this.feedEntity.getIsLike()) {
            this.likeLabel.string = "取消"
        } else {
            this.likeLabel.string = "点赞"
        }

        this.processLikeUser()

    }

    processLikeUser() {
        let list = this.feedEntity.getLikeUserIDList()
        this.likeUserView.active = list.length > 0
        if (list.length > 0) {
            this.likeUserView.getComponent(LikeUserViewCtr).updateView(this.feedEntity)
        }


    }

    processComment(): void {
        let commentList = this.feedEntity.getCommentList()

        this.commentView.active = commentList.length > 0 ? true : false

        this.commentView.getComponent(CommentViewCtr).updateView(this.feedEntity);

    }


    onClickMore() {
        this.likeCommentNode.active = !this.likeCommentNode.active
    }

    onClickLike() {
        if (this.feedEntity.getIsLike()) {
            this.feedEntity.cancelLikePost().then(({ err, resp }) => {
                if (!err) {
                    this.processInteractive()
                }
            })
        } else {
            this.feedEntity.likePost().then(({ err, resp }) => {
                if (!err) {
                    this.processInteractive()
                }
            })
        }
        this.likeCommentNode.active = false
    }

    onClickComment() {
        let trs = this.moreBtn.getComponent(UITransform)
        let pos = trs.convertToWorldSpaceAR(new Vec3(0, 0, 0));
        eventSystem.emit(SocialFeedEvent.ON_SHOW_SUBMIT_COMMENT_VIEW, { feedEntity: this.feedEntity, touchPosition: pos })
        this.likeCommentNode.active = false
        
    }

    onClickDeletePost() {
        let req: IDeletePostReq = {
            postID: this.postID
        }
        Feed.getInstance().deletePost(req).then(({ err, resp }) => {
            console.log("deletePost", { err, resp })
            if (!err) {
                // log("onClickDeletePost:emit", SocialFeedEvent.ON_NOTIFY_DELETE_POST)
                // this.node.emit()
            }
        })
    }

    onClickAvatar() {
        // eventSystem.emit("onClickFeedAvatar", { userID: this.userID })
        uiMgr.loadPage("social@feed/res/prefab/FeedPersonalView", { params: { userID: this.userID } })

    }


}
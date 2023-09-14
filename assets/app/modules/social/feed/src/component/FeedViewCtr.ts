import { _decorator, Component, log, Node, EventTarget, Prefab, instantiate, director, ScrollView, Vec2 } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Feed } from 'qsdk/feed/Feed';
import { Decorator, NodeUtil, TableView, eventSystem, resLoader, uiMgr } from 'bos/exports';
import { SocialFeedEvent } from '../../../common/src/Define';
import { FeedTableview } from './FeedTableview';
import { FeedEvent } from 'qsdk/feed/define';
import { CommentOperationViewCtr } from './CommentOperationViewCtr';
import { SubmitCommentViewCtr } from './SubmitCommentViewCtr';
import { PhotoSource } from 'app/domain/photo/PhotoSource';
import { off } from 'process';
import { Vec3 } from 'cc';
import { FeedEntity } from 'qsdk/feed/db/Model';
import { UITransform } from 'cc';


export enum FeedUIPage {
    SubmitPost = "social@feed/res/prefab/SubmitPostView",
    CommentOperation = "social@feed/res/prefab/CommentOperationView",
    SubmitComment = "social@feed/res/prefab/SubmitCommentView",
    NoticeView = "social@feed/res/prefab/NoticeView",
}


@ccclass('FeedViewCtr')
export class FeedViewCtr extends XComponent {

    @property(Node)
    tableviewNode;

    private tableview: FeedTableview;

    start() {
        this.addEventListener()
        this.tableview = this.tableviewNode.getComponent(FeedTableview)

        Feed.getInstance().listFollowTimeline({ count: 20 }).then(() => {
            this.tableview.loadData()
        })

    }

    addEventListener() {
        eventSystem.on(SocialFeedEvent.ON_SHOW_COMMENT_OPT_VIEW, this.onShowCommentOptView, this)
        eventSystem.on(SocialFeedEvent.ON_SHOW_SUBMIT_COMMENT_VIEW, this.onShowSubmitCommentView, this)
        eventSystem.on(SocialFeedEvent.ON_SHOW_SUBMIT_POST_VIEW, this.onShowSubmitPostView, this)
        eventSystem.on(SocialFeedEvent.ON_SHOW_NOTICE_VIEW, this.onShowNoticeView, this)

        Feed.getInstance().on(FeedEvent.ON_NOTIFY_UPDATE_FEED, this.onNotifyUpdateFeed, this)
        Feed.getInstance().on(FeedEvent.ON_NOTIFY_DELETE_COMMENT, this.onNotifyUpdateFeed, this)
        Feed.getInstance().on(FeedEvent.ON_NOTIFY_DELETE_POST, this.onNotifyDeleteFeed, this)
    }

    removeEventListener() {
        eventSystem.off(SocialFeedEvent.ON_SHOW_COMMENT_OPT_VIEW, this.onShowCommentOptView, this)
        eventSystem.off(SocialFeedEvent.ON_SHOW_SUBMIT_COMMENT_VIEW, this.onShowSubmitCommentView, this)
        eventSystem.off(SocialFeedEvent.ON_SHOW_SUBMIT_POST_VIEW, this.onShowSubmitPostView, this)
        eventSystem.off(SocialFeedEvent.ON_SHOW_NOTICE_VIEW, this.onShowNoticeView, this)
    }

    onDestroy(): void {
        this.removeEventListener()
    }

    onNotifyUpdateFeed(postID?: number) {
        //this.updateTableView()
        if (postID) {
            this.tableview.updatePost(postID)
        } else {
            this.tableview.loadData()
        }
    }

    onNotifyDeleteFeed() {
        this.tableview.loadData()
    }


    updateTableView() {
        this.tableview.loadData()
    }

    onShowSubmitPostView() {
        uiMgr.loadPage(FeedUIPage.SubmitPost)
    }

    onShowCommentOptView(args: any) {
        resLoader.loadPrefabNode(FeedUIPage.CommentOperation, (view) => {
            director.getScene().getChildByName('Canvas').addChild(view)
            view.getComponent(CommentOperationViewCtr).setup(args)
        })
    }

    onShowSubmitCommentView(args: { touchPosition: Vec3, feedEntity: FeedEntity, commentID?: number }) {
        let tableView = this.tableviewNode.getComponent(TableView)
        let offset = tableView.getContentOffset()
        console.log("TableView offset->", offset)
        console.log("touchPosition->", args.touchPosition)

        let touchPosition = args.touchPosition

        let trs = this.node.getComponent(UITransform)
        let pos1 = trs.convertToNodeSpaceAR(touchPosition);

        let scrollView: ScrollView = this.tableviewNode.getComponent(ScrollView)

        resLoader.loadPrefabNode(FeedUIPage.SubmitComment, (view) => {
            director.getScene().getChildByName('Canvas').addChild(view)

            // scrollView.scrollTo

            let ctr = view.getComponent(SubmitCommentViewCtr)
            ctr.setup(args)

            let submitPosition = ctr.getSubmitPosition()
            console.log("moveToPosition->", submitPosition)
            let pos2 = trs.convertToNodeSpaceAR(submitPosition);

            let offsetY = pos1.y - pos2.y

            console.log("pos1->", pos1)
            console.log("pos2->", pos2)

            console.log("pos1.y - pos2.y  offsetY->", offsetY)
            let newOffset = offset - offsetY + 100

            console.log("scrollToOffset newOffset->", newOffset)

            scrollView.scrollToOffset(new Vec2(0, newOffset), 1)

        })
    }

    onShowNoticeView(args: any) {
        // console.log("onShowNoticeVie", args)
        let params = {
            params: args
        }
        uiMgr.loadPage(FeedUIPage.NoticeView, params)

    }

    @Decorator.OnAppEvent("onFeedResourceClick")
    onClickMessage(data: { node: Node, resources: any[], index: number }) {
        // queryAllMessage
        console.log("onClickMessage--index-->", data.index)
        let resources = data.resources

        let list: PhotoSource[] = [];
        let defaultPageIndex = data.index;
        for (let index = 0; index < resources.length; index++) {
            const resource = resources[index];
            let ps = new PhotoSource();
            if (resource.extra?.info) {
                let info = resource.extra?.info;
                ps.info = { width: info.width, height: info.height }
            }
            ps.url = resource.url
            list.push(ps);
        }
        uiMgr.loadPage("common@photo/res/prefab/Photo", { params: { data: list, targetNode: data.node, defaultPageIndex: defaultPageIndex }, activePrev: true })
    }

}
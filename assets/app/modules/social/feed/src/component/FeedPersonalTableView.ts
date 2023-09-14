import { _decorator, Component, Node, Prefab, Pool, instantiate, log } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { TableView } from 'bos/framework/gui/tableview/TableView';
import { FeedCellCtr } from './FeedCellCtr';
import { Log, NodeUtil, eventSystem } from 'bos/exports';
import { FeedEntity } from 'qsdk/feed/db/Model';
import { Feed } from 'qsdk/feed/Feed';
import { FeedEvent } from 'qsdk/feed/define';
import { YogaFlex } from 'bos/framework/yoga/YogaFlex';
import { IListSimplePersonalTimelineReq } from 'idl/mpff/social/feed.v1';

@ccclass('FeedPersonalTableView')
export class FeedPersonalTableView extends XComponent {

    private tableView: TableView;

    @property(Prefab)
    private feedCellPrefab: Prefab = null!;

    @property(Number)
    private onceLoadNum: number = 20

    private listData: FeedEntity[] = [];

    private isDragToBottom: boolean = false;

    private _pool: Pool<Node> = null;
    private userID: number = 0

    onLoad() {

        this._pool = new Pool(() => {
            return instantiate(this.feedCellPrefab)
        }, 1, (node: Node) => {
            node.destroy();
        });


        this.tableView = this.node.getComponent(TableView)!;
        this.tableView.delegate = this;

        Feed.getInstance().on(FeedEvent.ON_NOTIFY_DELETE_POST, this.deletePost, this)

        this.tableView.node.on(TableView.EventType.REFRESH_DATA_TOP, this.handleRefreshTop, this)
        this.tableView.node.on(TableView.EventType.REFRESH_DATA_BOTTOM, this.handleRefreshBottom, this)

        super.onLoad()
    }

    createCell(tableview: TableView, index: number, section: number): Node {
        let cell = this.createFeedCell(this.listData[index]);
        return cell;
    }

    releaseCell(tableview: TableView, cell: Node, index: number, section: number) {
        let feedData: FeedEntity = this.listData[index];
        if (feedData) {
            this._pool.free(cell);
        }
        cell.removeFromParent();
    }

    rowCount(tableview: TableView, section: number) {
        // console.log("this.listData.length", this.listData.length)
        return this.listData.length;
    }

    createSection(tableview: TableView, section: number): Node {
        return null;
    }

    releaseSection(tableview: TableView, section: Node) {
        section.removeFromParent();
        section.destroy();
    }

    createFeedCell(feedData: (FeedEntity)) {

        let cell = this._pool.alloc();

        NodeUtil.sendMessage(cell, "updateView", feedData)
        cell.getComponent(YogaFlex)?.updateLayout()
        // console.timeEnd("createMessageCell")
        return cell;
    }



    getFeedData() {
        let followPostCache = Feed.getInstance().getFollowPostCache()
        return followPostCache
    }

    sectionListData = []

    async loadData(userID: number) {

        this.userID = userID
        let req: IListSimplePersonalTimelineReq = {
            userID: userID,
            count: this.onceLoadNum
        }
        this.listPersonalTimeline(req)

    }

    async listPersonalTimeline(req: IListSimplePersonalTimelineReq) {
        let feedEntityList = await Feed.getInstance().listSimplePersonalTimeline(req)
        if (feedEntityList.length > 0) {
            for (let index = 0; index < feedEntityList.length; index++) {
                const element = feedEntityList[index];
                this.listData.push(element)
            }
            // this.listData = feedEntityList
            this.tableView.refresh({ keepIndex: true })
        }
    }


    deletePost(postID: number) {
        for (let index = 0; index < this.listData.length; index++) {
            let data = this.listData[index];
            if (data instanceof FeedEntity) {
                if (data.getPostID() === postID) {
                    // console.log("FeedPersonalTableView:deletePost =", index, "postID=", postID)
                    this.listData.splice(index, 1)
                    this.tableView.removeRow(index, 0, 1)
                }
            }
        }

    }

    updatePost(postID: number) {
        let feedEntity = Feed.getInstance().getFeedEntity(postID)
        for (let index = 0; index < this.listData.length; index++) {
            let data = this.listData[index];
            if (data instanceof FeedEntity) {
                if (data.getPostID() === postID) {
                    this.listData[index] = feedEntity
                    this.tableView.updateRow(index, 0, 1)
                }
            }
        }
    }


    handleRefreshTop() {
        // console.log("handleRefreshTop")
        // this.isDragToBottom = false

        // let basePostID: number = null
        // if (this.listData.length > 0) {
        //     basePostID = this.listData[0].getPostID();
        // }

        // const req: IListSimplePersonalTimelineReq = {
        //     userID: this.userID,
        //     count: this.onceLoadNum,
        //     basePostID: basePostID
        // };

        // this.listPersonalTimeline(req)
    }

    handleRefreshBottom() {
        console.log("handleRefreshBottom")

        if (!this.isDragToBottom) {
            let basePostID: number = null
            if (this.listData.length > 0) {
                basePostID = this.listData[this.listData.length - 1].getPostID();
            }

            const req: IListSimplePersonalTimelineReq = {
                userID: this.userID,
                count: -this.onceLoadNum,
                basePostID: basePostID
            };
            this.listPersonalTimeline(req)
        } else {
            // loadFinish
        }


    }
}
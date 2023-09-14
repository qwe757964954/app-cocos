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
import { UITransform } from 'cc';

export interface TopCellData {
    uid: number
}

export enum FeeDataType {
    TopCell = 1,
    FeedCell = 2
}


@ccclass('FeedTableview')
export class FeedTableview extends XComponent {

    private tableView: TableView;

    @property(Prefab)
    private topCellPrefab: Prefab = null!;

    @property(Prefab)
    private feedCellPrefab: Prefab = null!;

    @property(Number)
    private onceLoadNum: number = 20

    private nodePool: Map<number, Pool<Node>> = new Map<number, Pool<Node>>();

    private listData: (FeedEntity | TopCellData)[] = [];

    private isDragToBottom: boolean = false;

    onLoad() {
        this.tableView = this.node.getComponent(TableView)!;
        this.tableView.delegate = this;

        Feed.getInstance().on(FeedEvent.ON_NOTIFY_DELETE_POST, this.deletePost, this)
        // Feed.getInstance().on(FeedEvent.ON_NOTIFY_DELET, this.deletePost, this)

        this.tableView.node.on(TableView.EventType.REFRESH_DATA_TOP, this.handleRefreshTop, this)
        this.tableView.node.on(TableView.EventType.REFRESH_DATA_BOTTOM, this.handleRefreshBottom, this)

        super.onLoad()
    }

    createCell(tableview: TableView, index: number, section: number): Node {
        let cell = this.createFeedCell(this.listData[index]);
        return cell;
    }

    releaseCell(tableview: TableView, cell: Node, index: number, section: number) {
        let feedData: (FeedEntity | TopCellData) = this.listData[index];
        if (feedData) {
            let pool = this.getPool(feedData)
            if (pool) {
                pool.free(cell);
            }
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

    createFeedCell(feedData: (FeedEntity | TopCellData)) {
        let pool = this.getPool(feedData)
        let cell = pool.alloc();

        NodeUtil.sendMessage(cell, "updateView", feedData)
        cell.getComponent(YogaFlex)?.updateLayout()
        // console.timeEnd("createMessageCell")
        return cell;
    }

    getPool(feedData: (FeedEntity | TopCellData)) {
        let type = FeeDataType.TopCell
        if (feedData instanceof FeedEntity) {
            type = FeeDataType.FeedCell
        }
        let pool = this.nodePool.get(type)
        if (!pool) {
            pool = new Pool<Node>(() => {
                let cell: Node = null;
                if (type === FeeDataType.TopCell) {
                    cell = instantiate(this.topCellPrefab)
                    // cell.getComponent(UITransform).priority = -1
                    // cell.setSiblingIndex(9999)
                } else {
                    cell = instantiate(this.feedCellPrefab)
                }
                return cell;
            }, 1, (node: Node) => {
                node.destroy();
            })
            this.nodePool.set(type, pool)
        }
        return pool
    }


    getFeedData() {
        let listData = []
        let followPostCache = Feed.getInstance().getFollowPostCache()
        if (followPostCache?.length > 0) {
            listData = followPostCache.slice()
        }
        let topCellData = this.getTopCellData()
        listData.unshift(topCellData)
        return listData
    }

    sectionListData = []

    loadData() {
        this.listData = this.getFeedData()
        this.tableView.refresh();
        // this.tableView.updateRow(1, 0, 5)

        /*
        let sectionCount = 2
        this.listData = [];

        for (let section = 0; section < sectionCount; section++) {
            let sectionName = section;
            let items = []
            if (section == 1) {
                let topCellData = this.getTopCellData()
                items.push({ data: topCellData, cell: this.topCellPrefab })
            } else {
                let listData = []
                let followPostCache = Feed.getInstance().getFollowPostCache()
                if (followPostCache?.length > 0) {
                    listData = followPostCache.slice()
                }

                for (let index = 0; index < listData.length; index++) {
                    let feeData = listData[index];
                    items.push({ data: feeData, cell: this.feedCellPrefab })
                }

            }
            this.sectionListData.push({ section: sectionName, item: items })
        }

        this.tableView.sectionCount = sectionCount
        this.tableView.delegate = this;
        this.tableView.refresh();
        */
    }

    getTopCellData() {
        let uid = Feed.getInstance().getUID()
        let feedData: TopCellData = {
            uid: uid
        }
        return feedData
    }


    deletePost(postID: number) {
        for (let index = 0; index < this.listData.length; index++) {
            let data = this.listData[index];
            if (data instanceof FeedEntity) {
                if (data.getPostID() === postID) {
                    // console.log("FeedTableview:deletePost =", index, "postID=", postID)
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

    listFollowTimelineCache() {

        let length1 = this.listData.length
        this.listData = this.getFeedData()
        let length2 = this.listData.length

        if (length2 > length1) {
            this.tableView.insertRow(length1, 0, length2 - length1)
        } else {
            this.tableView.refresh({ forceUpdate: true })
        }
    }

    listFollowTimeline(onceLoadNum?: number) {
        onceLoadNum = onceLoadNum || this.onceLoadNum
        let req = { count: onceLoadNum }
        console.log("listFollowTimeline:req", req)
        Feed.getInstance().listFollowTimeline(req).then((feedEntityList) => {
            if (feedEntityList?.length > 0) {
                this.listFollowTimelineCache();
            } else {
                if (onceLoadNum < 0) {
                    this.isDragToBottom = true;
                    // if (this.object.setLastPage) {
                    //     this.object.setLastPage(this.isDragToBottom);
                    // }
                } else {
                    this.listFollowTimelineCache();
                }
            }

            // eventSystem.emit(UIEvent.ON_READ_FEED, data);
        })
    }


    handleRefreshTop() {
        console.log("handleRefreshTop")
        this.isDragToBottom = false
        this.listFollowTimeline()
    }

    handleRefreshBottom() {
        console.log("handleRefreshBottom")

        if (!this.isDragToBottom) {
            this.listFollowTimeline(-this.onceLoadNum)
        } else {
            // loadFinish
        }


    }
}
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Pool } from 'cc';
import { MatchInfo } from 'app/domain/match/matchList/data/MatchInfo';
import { PBMatchList, PBRegularCommon } from 'app/domain/match/code/code';
import { Decorator, TableView, TableViewEvent, uiMgr } from 'bos/exports';
import { Prefab } from 'cc';
import { MatchApi } from 'app/domain/match/api/MatchApi';
import { instantiate } from 'cc';
import { ObserverItem } from './ObserverItem';
import { Utils } from 'app/utils/Utils';

@ccclass('ObserverDialog')
export class ObserverDialog extends XComponent {
    @property(TableView)
    tableView: TableView;

    @property(Prefab)
    itemPrefab: Prefab = null!

    @property(Node)
    emptyNode : Node

    private _pool: Pool<Node> = null;
    private _data: MatchInfo[] = [];
    private _curPage = 0
    private _pageSize = 10
    private _isLastPage = false

    @Utils.background()
    onLoad(): void {
        this.initPool()
        this.reqData(1)
        this.addRefreshAndPullEvent()
    }

    addRefreshAndPullEvent() {
        this.tableView.node.on(TableViewEvent.REFRESH_DATA_TOP, this.pullDownRefresh.bind(this))
        this.tableView.node.on(TableViewEvent.REFRESH_DATA_BOTTOM, this.pullUpMore.bind(this))
    }

    //上拉加载更多
    pullUpMore() {
        console.debug("ObserverDialog pullUpMore")
        if (!this._isLastPage) {
            this.reqData(this._curPage++)
        }
    }

    //下拉刷新
    pullDownRefresh(){
        console.debug("ObserverDialog pullDownRefresh")
        this.refreshList()
    }

    initPool(){
        this._pool = new Pool(() => {
            return instantiate(this.itemPrefab)
        }, 10, (node: Node) => {
            node.destroy();
        });
    }

    refreshList(){
        console.debug("ObserverDialog refreshList=======")

        this._curPage = 0
        this._isLastPage = false
        this._data = []
        this.reqData(1)
    }

    @Decorator.TryAsync()
    async reqData(page) {
        this._curPage = page

        let data = await this.promiseOne<any>(MatchApi.getMatchList(this._curPage, this._pageSize, PBMatchList.ListGuideTypeOnLook))
        if (data) {
            let items = data.matchItems
            if (items) {
                for (let index = 0; index < items.length; index++) {
                    const item = items[index];
                    this._data.push(item)
                }
                this.setData(this._data, data.totalSize ?? 0)
            }
        }
    }

    setData(data, totalSize = 0) {
        console.debug("ObserverDialog setData", data)
        this._data = data

        this.tableView.delegate = this
        this.tableView.refresh();

        if (this._data.length >= totalSize) {
            this._isLastPage = true
        }

        if (this._data.length <= 0) {
            this.emptyNode.active = true
        } else {
            this.emptyNode.active = false
        }
    }

    createCell(tableView: TableView, index: number, section: number): Node {
        let cell = this._pool.alloc();
        let com = cell.getComponent(ObserverItem)
        com.updateView(this._data[index])
        return cell;
    }

    releaseCell(tableView: TableView, cell: Node) {
        cell.removeFromParent();
        this._pool.free(cell)
    }

    rowCount(tableView: TableView, section: number) {
        return this._data.length;
    }

    createSection(tableView: TableView, section: number): Node {
        return null;
    }

    releaseSection(tableView: TableView, section: Node) {
        section.removeFromParent();
        section.destroy();
    }

    onClose() {
        uiMgr.removePopup(this.node)
    }

    onDestroy(): void {
        this._pool.destroy()
    }
}
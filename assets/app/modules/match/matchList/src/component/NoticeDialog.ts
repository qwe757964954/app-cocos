import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Toggle } from 'cc';
import { Decorator, TableView, TableViewEvent, uiMgr } from 'bos/exports';
import { Label } from 'cc';
import { PBMatchList, PBRegularCommon } from 'app/domain/match/code/code';
import { Color } from 'cc';
import { Prefab } from 'cc';
import { MatchInfo } from 'app/domain/match/matchList/data/MatchInfo';
import { Pool } from 'cc';
import { instantiate } from 'cc';
import { MatchApi } from 'app/domain/match/api/MatchApi';
import { NoticeItem } from './NoticeItem';
import { Utils } from 'app/utils/Utils';

@ccclass('NoticeDialog')
export class NoticeDialog extends XComponent {

    @property(TableView)
    tableView: TableView;

    @property(Prefab)
    itemPrefab: Prefab = null!
    
    @property([Label])
    labels : Label[] = []

    @property(Node)
    emptyNode : Node

    @property(Label)
    emptyLabels : Label

    private _type : number = PBMatchList.ListGuideTypePreView
    private _pool: Pool<Node> = null;
    private _data: MatchInfo[] = [];
    private _curPage = 0
    private _pageSize = 10
    private _isLastPage = false

    constructor(){
        super()

        console.warn("NoticeDialog constructor")
    }

    @Utils.background()
    onLoad(): void {
        this.initPool()
        this.reqData(1)
        this.addRefreshAndPullEvent()
        this.changeTextStyle()
    }

    addRefreshAndPullEvent() {
        this.tableView.node.on(TableViewEvent.REFRESH_DATA_TOP, this.pullDownRefresh.bind(this))
        this.tableView.node.on(TableViewEvent.REFRESH_DATA_BOTTOM, this.pullUpMore.bind(this))
    }

    //上拉加载更多
    pullUpMore() {
        console.debug("NoticeDialog pullUpMore")
        if (!this._isLastPage) {
            this.reqData(this._curPage++)
        }
    }

    //下拉刷新
    pullDownRefresh(){
        console.debug("NoticeDialog pullDownRefresh")
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
        console.debug("NoticeDialog refreshList=======")

        this._curPage = 0
        this._isLastPage = false
        this._data = []
        this.reqData(1)
    }

    @Decorator.TryAsync()
    async reqData(page) {
        this._curPage = page

        let data = await this.promiseOne<any>(MatchApi.getMatchList(this._curPage, this._pageSize, this._type))
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
        console.debug("NoticeDialog setData", data)
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
        let com = cell.getComponent(NoticeItem)
        com.updateView(this._data[index], this._type)
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

    onToggleChange(toggle : Toggle){
        console.warn("onToggleChange", toggle)

        if (toggle.node.name == "Toggle1") {
            this._type = PBMatchList.ListGuideTypePreView
        } else {
            this._type = PBMatchList.ListGuideTypeEntered
        }

        this.changeTextStyle()
        this.refreshList()
    }


    changeTextStyle() {
        if (this._type == PBMatchList.ListGuideTypePreView) {
            this.labels[0].color = new Color("#FF9953")
            this.labels[0].isBold = true
            this.labels[0].fontSize = 48

            this.labels[1].color = new Color("#888888")
            this.labels[1].isBold = false
            this.labels[1].fontSize = 45
        } else {
            this.labels[1].color = new Color("#FF9953")
            this.labels[1].isBold = true
            this.labels[1].fontSize = 48

            this.labels[0].color = new Color("#888888")
            this.labels[0].isBold = false
            this.labels[0].fontSize = 45
        }
    }

    onClose(){
        uiMgr.removePopup(this.node)
    }

    onDestroy(): void {
        this._pool.destroy()
    }
}
import { _decorator, Component, math, Node, Pool, Prefab, Size, UITransform, Widget, instantiate, ScrollView } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Decorator, Log, TableView, TableViewEvent, uiMgr } from 'bos/exports';
import { MatchItem } from './MatchItem';
import { MatchInfo } from 'app/domain/match/matchList/data/MatchInfo';
import { MatchApi } from 'app/domain/match/api/MatchApi';
import { PBMatchList, PBRegularCommon } from 'app/domain/match/code/code';
import { UIMgr } from 'bos/framework/gui/UIMgr';

@ccclass('MatchList')
export class MatchList extends XComponent {

    @property(TableView)
    tableView: TableView;

    @property(Prefab)
    itemPrefab: Prefab = null!

    @property(Node)
    headNode : Node

    @property(Node)
    listNode : Node

    private _data: MatchInfo[] = [];
    private _curPage = 0
    private _pageSize = 10
    private _listType = PBRegularCommon.MatchTagTypeDaily
    private _passTimes = 0      //累积的时间。用于列表自动刷新
    private _isLastPage = false

    _keyOfPool = new Map<string, Pool<Node>>()

    onLoad(): void {
        this.initPool()
        this.reqData(1)
        this.addRefreshAndPullEvent()

        this.tableView.node.on('scrolling', this.onScrollingEvent, this);
    }

    onScrollingEvent(){
        this._passTimes = 0
    }

    start() {
        this.tableView.delegate = this;
    }

    update(deltaTime: number) {
        this._passTimes += deltaTime
        if (this._passTimes >= 5){
            this._passTimes = 0
            this.refreshList()
        }
    }

    addRefreshAndPullEvent() {
        this.tableView.node.on(TableViewEvent.REFRESH_DATA_TOP, this.pullDownRefresh.bind(this))
        this.tableView.node.on(TableViewEvent.REFRESH_DATA_BOTTOM, this.pullUpMore.bind(this))
    }

    //上拉加载更多
    pullUpMore() {
        console.debug("MatchList pullUpMore")
        if (!this._isLastPage) {
            this.reqData(this._curPage++)
        }
    }

    //下拉刷新
    pullDownRefresh(){
        console.debug("MatchList pullDownRefresh")
        this.refreshList()
    }

    initPool(){
    }

    refreshList(){
        console.debug("MatchList refreshList=======")

        this._curPage = 0
        this._isLastPage = false
        this._data = []
        this.reqData(1)
    }

    @Decorator.TryAsync()
    async reqData(page) {
        this._curPage = page

        this._passTimes = 0
        let data = await this.promiseOne<any>(MatchApi.getMatchList(this._curPage, this._pageSize, PBMatchList.ListGuideTypeEntering))
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
        Log.d("MatchList setData", data)
        this._data = data

        this.tableView.refresh();

        if (this._data.length >= totalSize) {
            this._isLastPage = true
        }
    }

    getReleaseCell(key) {
        let pool = this._keyOfPool.get(key)
        if (!pool) {
            pool = new Pool(() => {
                return instantiate(this.itemPrefab)
            }, 10, (node: Node) => {
                node.destroy();
            });

            this._keyOfPool.set(key, pool)
        }

        return pool.alloc();
    }

    recycleCell(key, node){
        let pool = this._keyOfPool.get(key)
        if (!pool) {
            pool = new Pool(() => {
                return instantiate(this.itemPrefab)
            }, 10, (node: Node) => {
                node.destroy();
            });

            this._keyOfPool.set(key, pool)
        }

        pool.free(node)
    }

    createCell(tableView: TableView, index: number, section: number): Node {
        let data = this._data[index]
        let key = data.getPreMatchKey()
        let cell = this.getReleaseCell(key)
        let com = cell.getComponent(MatchItem) || cell.addComponent(MatchItem)
        com.updateView(data)
        return cell;
    }

    releaseCell(tableView: TableView, cell: Node) {
        cell.removeFromParent();
        let key = cell.getComponent(MatchItem).getPreMatchKey()
        this.recycleCell(key, cell)
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

    onBackTouch(){
        Log.d("MatchList onBackTouch=========")

        uiMgr.popPage()
    }

    onObserverTouch(){
        uiMgr.loadPopup("match@matchList/res/prefab/ObserverDialog")
    }

    onJoinTouch(){
        uiMgr.loadPopup("match@matchList/res/prefab/NumberBox")
    }

    onNoticeTouch(){
        uiMgr.loadPopup("match@matchList/res/prefab/NoticeDialog")
    }

    onDestroy(): void {
        this._keyOfPool.forEach((pool, key)=>{
            pool.destroy()
        })

        this._keyOfPool.clear()
    }
}
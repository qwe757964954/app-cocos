import { TableView } from 'bos/exports';
import { _decorator, Component, Node } from 'cc';
import { Prefab } from 'cc';
import { Pool } from 'cc';
import { instantiate } from 'cc';
import { ItemTest } from './ItemTest';
import { UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TestTableView')
export class TestTableView extends Component {

    @property({
        visible: true,
        type: TableView
    })
    private _tableView: TableView;

    @property({
        visible: true,
        type: Prefab
    })
    private _itemPrefab: Prefab = null!;

    private _pool: Pool<Node> = null;

    private _datas: { name: string }[] = [];


    private nodee: Node = null!;


    public getDatas() {
        return this._datas;
    }

    public getTableView() {
        return this._tableView;
    }

    createCell(tableview: TableView, index: number, section: number): Node {
        let cell = this._pool.alloc();
        let com = cell.getComponent(ItemTest) || cell.addComponent(ItemTest)
        com.name = this._datas[index].name;
        com.setTableView(this._tableView.node);
        return cell;
    }

    releaseCell(tableview: TableView, cell: Node) {
        cell.removeFromParent();
        this._pool.free(cell)
    }

    rowCount(tableview: TableView, section: number) {
        return this._datas.length;
    }

    createSection(tableview: TableView, section: number): Node {
        let section1 = instantiate(this._itemPrefab)
        this.nodee = section1;
        console.log("createSection", section1)

        return section1;
    }

    releaseSection(tableview: TableView, section: Node) {
        section.removeFromParent();
        console.log("releaseSection")
        section.destroy();
    }

    protected onLoad(): void {
        this._pool = new Pool(() => {
            return instantiate(this._itemPrefab)
        }, 10, (node: Node) => {
            node.destroy();
        });
    }

    start() {
        this._datas = [];
        for (let i = 0; i < 20; i++) {
            this._datas.push({ name: i.toString() })
        }

        this._tableView.delegate = this;
        // this._tableView.refresh(20,0,true);
        this._tableView.refresh(this._datas.length - 1,0,true);
    }

    handleScrollToTop() {
        
    }

    handleScrollToBottom() {
        console.log("handleScrollToBottom")
    }

    handleRefreshTop() {
        console.log("SCROLL_ENG_WITH_THRESHOLD")
    }

    handleRefreshBottom() {
        console.log("scroll-to-top1")
        // this.scheduleOnce(() => {
        //     for (let i = 100; i < 120; i++) {
        //         this._datas.splice(0,0,{ name: i.toString() })
        //     }
        //     // console.log("section1", section1,this._datas
        //     // )
        //     // this._tableView.insertRow(0, 0, 20);
        //     this._tableView.refresh(20, 0, true);
        //     this.nodee.active = false;
        // }, 0.5)
    }

    protected onEnable(): void {
        this._tableView.node.on(TableView.EventType.SCROLL_ENG_WITH_THRESHOLD, this.handleRefreshTop, this)
        this._tableView.node.on(TableView.EventType.REFRESH_DATA_BOTTOM, this.handleRefreshBottom, this)
        this._tableView.node.on('scroll-to-top', this.handleRefreshBottom, this);
        console.log("_tableView onEnable")
    }

    protected onDisable(): void {
        this._tableView.node.off(TableView.EventType.SCROLL_ENG_WITH_THRESHOLD, this.handleRefreshTop, this)
        this._tableView.node.off(TableView.EventType.REFRESH_DATA_BOTTOM, this.handleRefreshBottom, this)
        console.log("_tableView onDisable")
    }
    update(deltaTime: number) {

    }
}



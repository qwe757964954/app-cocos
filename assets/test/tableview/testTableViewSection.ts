import { TableView } from 'bos/exports';
import { _decorator, Component, Node } from 'cc';
import { Prefab } from 'cc';
import { Pool } from 'cc';
import { instantiate } from 'cc';
import { ItemTest } from './ItemTest';
import { sectionTest } from './sectionTest';
const { ccclass, property } = _decorator;

@ccclass('testTableViewSection')
export class testTableViewSection extends Component {

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

    @property({
        visible: true,
        type: Prefab
    })
    private _sectionPrefeb: Prefab = null!;
    private _pool: Pool<Node> = null;
    private _poolSection: Pool<Node> = null;

    private _datas: { section: string, item: { name: string }[] }[] = [];

    public getDatas() {
        return this._datas;
    }

    public getTableView() {
        return this._tableView;
    }

    createCell(tableview: TableView, index: number, section: number): Node {
        let cell = this._pool.alloc();
        let com = cell.getComponent(ItemTest) || cell.addComponent(ItemTest)
        com.name = this._datas[section].item[index].name;
        return cell;
    }

    releaseCell(tableview: TableView, cell: Node) {
        cell.removeFromParent();
        this._pool.free(cell)
    }

    rowCount(tableview: TableView, section: number) {
        return this._datas[section].item.length;
    }

    createSection(tableview: TableView, section: number): Node {
        let sectionnode = this._poolSection.alloc();
        let com = sectionnode.getComponent(sectionTest) || sectionnode.addComponent(sectionTest)
        com.name = this._datas[section].section;
        return sectionnode;
    }

    releaseSection(tableview: TableView, section: Node) {
        section.removeFromParent();
        this._poolSection.free(section)
    }

    protected onLoad(): void {
        this._pool = new Pool(() => {
            return instantiate(this._itemPrefab)
        }, 10, (node: Node) => {
            node.destroy();
        });


        this._poolSection = new Pool(() => {
            return instantiate(this._sectionPrefeb)
        }, 10, (node: Node) => {
            node.destroy()
        });
    }

    start() {
        let sectionCount = 10
        this._datas = [];

        for (let section = 0; section < sectionCount; section++) {
            let sectionname = 'a' + section;
            let items = []
            for (let i = 0; i < 10; i++) {
                let itemname = sectionname + "-" + i.toString();
                items.push({ name: itemname })
            }
            this._datas.push({ section: sectionname, item: items })
        }

        this._tableView.sectionCount = sectionCount
        this._tableView.delegate = this;
        this._tableView.refresh();
    }

    update(deltaTime: number) {

    }
}



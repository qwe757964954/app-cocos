import { _decorator, Component, Node, Prefab, Pool, instantiate, log } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { TableView } from 'bos/framework/gui/tableview/TableView';
import { NodeUtil } from 'bos/exports';

@ccclass('SimpleTableViewEx')
export class SimpleTableViewEx extends XComponent {
    @property(TableView)
    private tableView: TableView;

    @property(Prefab)
    private cellPrefab: Prefab = null!;

    private _pool: Pool<Node> = null;

    private _listData: any[] = [];

    createCell(tableview: TableView, index: number, section: number): Node {
        let cell = this._pool.alloc();
        NodeUtil.sendMessage(cell, "updateView", this._listData[index])
        return cell;
    }

    releaseCell(tableview: TableView, cell: Node) {
        log("releaseCell")
        cell.removeFromParent();
        this._pool.free(cell)
    }

    rowCount(tableview: TableView, section: number) {
        log("rowCount", this._listData.length)
        return this._listData.length;
    }

    createSection(tableview: TableView, section: number): Node {
        return null;
    }

    releaseSection(tableview: TableView, section: Node) {
        section.removeFromParent();
        section.destroy();
    }

    onLoad(): void {
        this._pool = new Pool(() => {
            return instantiate(this.cellPrefab)
        }, 1, (node: Node) => {
            node.destroy();
        });
    }   


    setData(data: any[]) {
        this.tableView.delegate = this;
        this._listData = data
        this.tableView.refresh();
    }
}
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { MatchHandler } from 'app/domain/match/match/handler/MatchHandler';
import { Log, TableView } from 'bos/exports';
import { MUser } from 'app/domain/match/match/data/UserInfo';
import { Pool } from 'cc';
import { ResultItem } from './ResultItem';
import { Prefab } from 'cc';
import { instantiate } from 'cc';

@ccclass('ResultView')
export class ResultView extends XComponent {

    @property(TableView)
    tableView: TableView;

    @property(Prefab)
    itemPrefab : Prefab

    handler : MatchHandler
    private _pool: Pool<Node> = null;
    private _data: MUser[] = [];

    onLoad(): void {
        this.initPool()
    }

    updateView(handler : MatchHandler) {
        this.handler = handler

        let users = this.handler.roomInfo.userInfo.getRankUsers()
        this.setData(users)
    }

    initPool(){
        this._pool = new Pool(() => {
            return instantiate(this.itemPrefab)
        }, 10, (node: Node) => {
            node.destroy();
        });
    }

    setData(data) {
        Log.d("ResultView setData", data)
        this._data = data

        this.tableView.delegate = this
        this.tableView.refresh();
    }

    createCell(tableView: TableView, index: number, section: number): Node {
        let cell = this._pool.alloc();
        let com = cell.getComponent(ResultItem)// || cell.addComponent(MatchItem)
        com.updateView(this.handler, this._data[index])
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

    onDestroy(): void {
        this._pool.destroy()
    }
}
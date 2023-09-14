import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { MUser } from 'app/domain/match/match/data/UserInfo';
import { Pool } from 'cc';
import { Prefab } from 'cc';
import { TableView } from 'bos/exports';
import { instantiate } from 'cc';
import { RankItem } from './RankItem';
import { MatchHandler } from 'app/domain/match/match/handler/MatchHandler';
import { Widget } from 'cc';

@ccclass('RankPage')
export class RankPage extends XComponent {
    @property(TableView)
    tableView: TableView;

    @property(Prefab)
    itemPrefab : Prefab

    @property(RankItem)
    myRank : RankItem

    @property(Node)
    myInfo : Node

    private _pool: Pool<Node> = null;
    private _data: MUser[] = [];

    onLoad(): void {
        this.initPool()
    }

    updateView(users : MUser[], user? : MUser) {
        this.setData(users)

        if (user) {
            this.myInfo.active = true
            this.myRank.updateView(user)
            this.tableView.node.getComponent(Widget).bottom = 174
        } else {
            this.myInfo.active = false
            this.tableView.node.getComponent(Widget).bottom = 0
        }
    }

    initPool(){
        this._pool = new Pool(() => {
            return instantiate(this.itemPrefab)
        }, 10, (node: Node) => {
            node.destroy();
        });
    }

    setData(data) {
        console.debug("ObserverDialog setData", data)
        this._data = data

        this.tableView.delegate = this
        this.tableView.refresh();
    }

    createCell(tableView: TableView, index: number, section: number): Node {
        let cell = this._pool.alloc();
        let com = cell.getComponent(RankItem)
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

    onDestroy(): void {
        this._pool.destroy()
    }
}
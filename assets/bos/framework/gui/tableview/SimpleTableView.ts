import { _decorator, Component, Node } from 'cc';
import { TableView } from './TableView';
import { ScrollView } from 'cc';
import { UITransform } from 'cc';
import { Prefab } from 'cc';
import { Pool } from 'cc';
import { NodeUtil } from 'bos/exports';
import { log } from 'cc';
import { instantiate } from 'cc';
import { YogaFlex } from 'bos/framework/yoga/YogaFlex';
const { ccclass, property, requireComponent, executeInEditMode } = _decorator;


@ccclass('SimpleTableView')
@requireComponent(TableView)
// @executeInEditMode
export class SimpleTableView extends Component {

    @property(Prefab)
    private cell: Prefab = null!;


    private nodePool: Pool<Node> = null;

    private listData: any[] = [];

    tableView: TableView = null!;

    @property(Number)
    private perBatch: number = 1;

    createCell(tableView: TableView, index: number, section: number): Node {
        let cell = this.nodePool.alloc();
        NodeUtil.sendMessage(cell, "updateView", this.listData[index], index, this.tableView.node)
        cell.getComponent(YogaFlex)?.updateLayout()

        return cell;
    }

    releaseCell(tableView: TableView, cell: Node) {
        cell.removeFromParent();
        this.nodePool.free(cell)
    }

    rowCount(tableView: TableView, section: number) {
        return this.listData.length;
    }

    createSection(tableView: TableView, section: number): Node {
        return null;
    }

    releaseSection(tableView: TableView, section: Node) {
        section.removeFromParent();
        section.destroy();
    }

    onLoad(): void {
        this.tableView = this.node.getComponent(TableView)!;
        this.tableView.delegate = this;
        this.nodePool = new Pool(() => {
            return instantiate(this.cell)
        }, this.perBatch, (node: Node) => {
            node.destroy();
        });
    }


    setData(data: any[]) {
        this.listData = data
        this.refresh()
    }

    refresh(index: number = 0, section: number = 0, isFromEnd: boolean = false, forceUpdate = false) {
        this.tableView.refresh({ index: index, section: section, isFromEnd: isFromEnd, forceUpdate: forceUpdate });
    }
}
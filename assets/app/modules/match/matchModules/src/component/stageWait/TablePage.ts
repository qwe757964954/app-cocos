import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { MTable } from 'app/domain/match/match/data/TableInfo';
import { MatchHandler } from 'app/domain/match/match/handler/MatchHandler';
import { TableItem } from './TableItem';
import { BaseMatchView } from 'app/domain/match/match/controller/BaseMatchView';
import { UITransform } from 'cc';

@ccclass('TablePage')
export class TablePage extends BaseMatchView {
    @property([TableItem])
    tablesNode : TableItem[] = []

    start() {

    }

    updateView(handler : MatchHandler, tables : MTable[], width? : number) {
        super.updateView(handler)

        if (width) {
            let transform = this.node.getComponent(UITransform)
            transform.width = width
        }

        for (let index = 0; index < 2; index++) {
            let tableItem = this.tablesNode[index]
            const table = tables[index];
            if (table) {
                tableItem.node.active = true
                tableItem.updateView(handler, table)
            } else {
                tableItem.node.active = false
            }
        }
    }
}
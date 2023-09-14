import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { MTable } from 'app/domain/match/match/data/TableInfo';
import { MatchHandler } from 'app/domain/match/match/handler/MatchHandler';
import { Utils } from 'app/utils/Utils';
import { BaseMatchView } from 'app/domain/match/match/controller/BaseMatchView';
import { UITransform } from 'cc';

@ccclass('CTablePage')
export class CTablePage extends XComponent {

    @property([BaseMatchView])
    tablePageItem : BaseMatchView[] =[]

    handler : MatchHandler

    updateView(handler : MatchHandler ,tables : MTable[], width? : number) {
        this.handler = handler

        if (width) {
            let transform = this.node.getComponent(UITransform)
            transform.width = width
        }

        let infos = Utils.makeCellData(tables, 2)
        for (let index = 0; index < 2; index++) {
            const info = infos[index];
            if (info) {
                this.tablePageItem[index].updateView(this.handler, info)
                this.tablePageItem[index].node.active = true
            } else {
                this.tablePageItem[index].node.active = false
            }
        }
    }

    onDestroy(): void {
        console.error("TablePage onDestroy============")
    }
}
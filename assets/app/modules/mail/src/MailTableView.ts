import { _decorator, Component, Node, ScrollView } from 'cc';
import { Prefab } from 'cc';
import { Pool } from 'cc';
import { instantiate } from 'cc';
import { TableView } from 'bos/framework/gui/tableview/TableView';
import { MailCellCtr } from './MailCellCtr';
import { IMailBriefData } from 'idl/tss/hall/mail.v2';
const { ccclass, property } = _decorator;

// cell数据类型
const CellType = {
    TOP_CELL: 0,
    MIDDLE_CELL: 1,
    BUTTON_CELL: 2
};

export interface MailCellData {
    type: number;
    data?: IMailBriefData;
}

@ccclass('MailTableView')
export class MailTableView extends Component {
    @property({
        visible: true,
        type: TableView,
    })
    private _tableView: TableView;

    @property({
        visible: true,
        type: Prefab,
    })
    private _itemPrefab: Prefab = null!;
    private _pool: Pool<Node> = null;
    private dataList: MailCellData[] = [];
    @property({
        visible: true,
        type: Prefab,
    })
    private buttonPrefab: Prefab = null!;

    @property({
        visible: true,
        type: Prefab,
    })
    private topPrefab: Prefab = null!;
    private buttonCell: Node;
    private topCell: Node;

    /**
     * tableView内显示最顶端的数据
    */
    private buttonCellData: MailCellData = {
        type: CellType.BUTTON_CELL
    };
    private topCellData: MailCellData = {
        type: CellType.TOP_CELL
    };

    // 初始刷新值
    startCellIndex: number = 0;

    loadLastPage: Function;
    refreshMail: Function;
    private tableContent: Node;
    createCell(tableView: TableView, index: number, section: number): Node {
        let data = this.dataList[index];
        let cell: Node = this.createCellEx(data);
        let com = cell.getComponent(MailCellCtr);
        if (com) {
            com.updateView(data.data, index);
            com.refreshMail = this.refreshMail;
        }
        return cell;
    }

    /**
     * 根据类型创建cell节点
    */
    createCellEx(data: MailCellData) {
        let cell: Node;
        if (data.type == CellType.TOP_CELL) {
            cell = this.topCell;
        } else if (data.type == CellType.BUTTON_CELL) {
            cell = this.buttonCell;
        } else {
            cell = this._pool.alloc();
        }
        return cell;
    }
    releaseCell(tableView: TableView, cell: Node) {
        let ctr = cell.getComponent(MailCellCtr);
        cell.removeFromParent();
        if (ctr) {
            this._pool.free(cell);
        }
    }
    rowCount(tableView: TableView, section: number) {
        return this.dataList.length;
    }

    createSection(tableView: TableView, section: number): Node {
        return null;
    }

    releaseSection(tableView: TableView, section: Node) {
        section.removeFromParent();
        section.destroy();
    }

    protected onLoad(): void {
        this._tableView.delegate = this;
        this._pool = new Pool(
            () => {
                return instantiate(this._itemPrefab);
            },
            10,
            (node: Node) => {
                node.destroy();
            }
        );
        let view = this._tableView.node.getChildByName("view");
        this.tableContent = view.getChildByName("content");
    };

    start() {
    }

    checkTopData() {
        let item = this.dataList[0];
        if (item && item.type == CellType.TOP_CELL) {
            return true;
        }
        return false;
    }
    checkButtonData() {
        let item = this.dataList[this.dataList.length - 1];
        if (item && item.type == CellType.BUTTON_CELL) {
            return true;
        }
        return false;
    }

    updateTableView(data: IMailBriefData[]) {
        this.dataList = [];
        data.forEach((item: IMailBriefData) => {
            this.dataList.push({
                type: CellType.MIDDLE_CELL,
                data: item
            });
        });
        this.refresh();
    }

    refresh() {
        let index: number = 0;
        if (this.startCellIndex > 0) {
            index = this.startCellIndex;
            this.startCellIndex = 0;
        }
        this._tableView.refresh({ forceUpdate: true, index: index });
    }

    getMinCellIndex() {
        let cells = this.getCells();
        let t: number = -1;
        cells.forEach(cell => {
            let com = cell.getComponent(MailCellCtr);
            if (com) {
                if (t == -1) {
                    t = com.rowIndex;
                }
                if (com.rowIndex < t) {
                    t = com.rowIndex;
                }
            }
        });
        return t;
    }

    initStartIndex() {
        this.startCellIndex = this.getMinCellIndex();
    }

    getCells() {
        let cells = [];
        this.tableContent.children.forEach((cell: Node) => {
            let com = cell.getComponent(MailCellCtr);
            if (com) {
                cells.push(cell);
            }
        });
        return cells;
    }
}

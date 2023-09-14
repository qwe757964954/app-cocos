import { _decorator, Component, Layout, Node, ScrollView, tween, UITransform, Vec2, Vec3 } from 'cc';
import { Prefab } from 'cc';
import { Pool } from 'cc';
import { instantiate } from 'cc';
import { TableView } from 'bos/framework/gui/tableview/TableView';
import { BoxData } from './../../config/config';
import { GoodsItemCtr } from '../GoodsItemCtr';
import { Log } from 'bos/exports';
const { ccclass, property } = _decorator;

// cell数据类型
const CellType = {
    TOP_CELL: 0,
    MIDDLE_CELL: 1,
    BUTTON_CELL: 2
};

export interface PropCellData {
    type: number;
    data?: BoxData[];
}

@ccclass('GoodTableView')
export class GoodTableView extends Component {
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
    private dataList: PropCellData[] = [];
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
    private buttonCellData: PropCellData = {
        type: CellType.BUTTON_CELL
    };
    private topCellData: PropCellData = {
        type: CellType.TOP_CELL
    };

    // 初始刷新值
    startCellIndex: number = 0;
    private tableContent: Node;
    createCell(tableView: TableView, index: number, section: number): Node {
        let data = this.dataList[index];
        if (data == undefined) {
            Log.e(index, this.dataList, "索引对应数据不存在");
            return;
        }
        let cell: Node = this.createCellEx(data);
        let com = cell.getComponent(GoodsItemCtr);
        if (com) {
            com.updateView(data.data, index);
        }
        return cell;
    }

    /**
     * 根据类型创建cell节点
    */
    createCellEx(data: PropCellData) {
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
        let ctr = cell.getComponent(GoodsItemCtr);
        if (ctr) {
            ctr.reset();
        }
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



    updateTableView(data: BoxData[][]) {
        this.dataList = [];
        data.forEach((item: BoxData[]) => {
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

    getScrollViewSize() {
        let view = this._tableView.node.getChildByName("view");
        return view.getComponent(UITransform).contentSize;
    }

    /**
     * 重新换算row索引值
    */
    resetRow(row: number, len: number) {
        let num: number = len - row;
        let size = this.getScrollViewSize();
        num = (num + 1) * 411 + 100;
        if (num > size.y) {
            return row;
        }
        num = Math.ceil(num / 411);
        row = row > num ? row - num : 0;
        return row;
    }

    // 滑动到当前节点
    resetToCell(row: number, callback: Function) {
        row = row - 1;
        let len = this.dataList.length - 1;
        row = Math.min(row, len);
        row = this.resetRow(row, len);
        this._tableView.refresh({ index: row, isFromEnd: false, forceUpdate: true });
        this.scheduleOnce(callback);
    }

    playAnim() {
        let cells = this.getCells();
        cells.forEach(cell => {
            let com = cell.getComponent(GoodsItemCtr);
            if (com) {
                com.playAnim();
            }
        });
    }

    getMinCellIndex() {
        let cells = this.getCells();
        let t: number = -1;
        cells.forEach(cell => {
            let com = cell.getComponent(GoodsItemCtr);
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
        console.log("startCellIndex:", this.startCellIndex);
    }

    getCells() {
        let cells = [];
        this.tableContent.children.forEach((cell: Node) => {
            let com = cell.getComponent(GoodsItemCtr);
            if (com) {
                cells.push(cell);
            }
        });
        return cells;
    }

    getCellIndexList() {
        let list = [];
        let cells = this.getCells();
        cells.forEach((cell: Node) => {
            let com = cell.getComponent(GoodsItemCtr);
            if (com) {
                list.push(com.rowIndex);
            }
        });
        return list;
    }
}

import { _decorator, Component, Node, Prefab, Pool, instantiate, log } from 'cc';
const { ccclass, requireComponent, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { TableView } from 'bos/framework/gui/tableview/TableView';
import { Log, NodeUtil } from 'bos/exports';
import { UITransform } from 'cc';
import { size } from 'cc';
import { CellButtons } from '../../session/src/component/CellButtons';

/*
    [
        {
            section:{prefab:prefab, data:data}
            cells:[
                CustomTableViewCellData,
                CustomTableViewCellData,
                CustomTableViewCellData,
            ]
                
        }

    ]
*/
export interface CustomTableViewCellData {
    prefab: Prefab;
    data: any;
}

export interface CustomTableViewSectionData {
    section?: CustomTableViewCellData;
    cells: CustomTableViewCellData[];
    isUserSection?: boolean;
}


@ccclass('CustomTableView')
@requireComponent(TableView)
// @executeInEditMode
export class CustomTableView extends Component {

    private poolMap: Map<string, Pool<Node>> = new Map();

    private sectionDataList: CustomTableViewSectionData[] = [];

    private tableView: TableView = null;

    createCell(tableview: TableView, index: number, section: number): Node {

        let cellData: CustomTableViewCellData = this.sectionDataList[section]?.cells[index]
        let pool = this.poolMap.get(cellData.prefab.name)

        let cell = pool.alloc();
        NodeUtil.sendMessage(cell, "updateView", cellData.data)
        let cellButtonCtr = cell.getComponent(CellButtons)
        if (cellButtonCtr) {
            cellButtonCtr.setScrollView(this.tableView.node);
        }

        return cell;
    }

    releaseCell(tableview: TableView, cell: Node, index: number, section: number) {
        //console.log(`releaseCell:index=${index},section=${section}`)

        cell.removeFromParent();
        // let cellData = this.sectionDataList[section].cells[index]
        // let pool = this.getPool(cell.name)
        let pool = this.poolMap.get(cell.name)
        pool?.free(cell)
    }

    rowCount(tableview: TableView, section: number) {
        return this.sectionDataList[section]?.cells.length ?? 0
    }

    createSection(tableview: TableView, section: number): Node {
        //console.log(`createCell:section=${section}`)

        let sectionData: CustomTableViewCellData = this.sectionDataList[section]?.section
        if (sectionData?.prefab) {
            let pool = this.poolMap.get(sectionData.prefab.name)
            let cell = pool.alloc();

            NodeUtil.sendMessage(cell, "updateView", sectionData.data)
            return cell;

        } else {
            let cell = new Node()
            let uiTrs = cell.addComponent(UITransform)
            uiTrs.setContentSize(size(0, 0))
            return cell
        }
    }

    releaseSection(tableview: TableView, section: Node, sectionIndex: number) {
        section.removeFromParent();
        //console.log(`releaseSection:section=${sectionIndex}`)

        let sectionData: CustomTableViewCellData = this.sectionDataList[sectionIndex]?.section
        if (sectionData?.prefab) {
            let pool = this.poolMap.get(sectionData.prefab.name)
            pool?.free(section)
        }

    }

    setData(sectionDataList: CustomTableViewSectionData[]) {
        this.tableView = this.node.getComponent(TableView)

        this.sectionDataList = sectionDataList
        this.initPool()
        this.tableView.sectionCount = sectionDataList.length
        this.tableView.delegate = this;

        this.tableView.refresh();
    }


    initPool() {
        for (let index = 0; index < this.sectionDataList.length; index++) {
            let sectionData = this.sectionDataList[index]
            let section = sectionData?.section
            // 初始化section pool
            if (section?.prefab) {
                let poolKey = section.prefab.name
                //console.log("poolKey=", poolKey)
                if (!this.poolMap.has(poolKey)) {
                    let poolSection = new Pool<Node>(() => {
                        let cell = instantiate(section.prefab)
                        return cell;
                    }, 1, (node: Node) => {
                        node.destroy();
                    })
                    this.poolMap.set(poolKey, poolSection)
                }
            }

            // 初始化cell pool
            let cells = sectionData.cells
            for (let index2 = 0; index2 < cells?.length; index2++) {
                let cellData = cells[index2];
                let poolKey = cellData.prefab.name
                //console.log("poolCellKey=", poolKey)
                if (!this.poolMap.has(poolKey)) {
                    let poolCell = new Pool<Node>(() => {
                        let cell: Node = instantiate(cellData.prefab)
                        return cell;
                    }, 1, (node: Node) => {
                        node.destroy();
                    })
                    this.poolMap.set(poolKey, poolCell)
                }
            }

        }

    }

}
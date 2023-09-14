import { Prefab } from 'cc';
import { instantiate } from 'cc';
import { Pool } from 'cc';
import { ScrollView } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { IAssetItem } from 'idl/tss/common/common_define';
import { DetailGoodsCellCtr } from './DetailGoodsCellCtr';
const { ccclass, property } = _decorator;

@ccclass('DetailGoods')
export class DetailGoods extends Component {
    @property({
        visible: true,
        type: ScrollView,
    })
    private _scrollView: ScrollView;

    @property({
        visible: true,
        type: Prefab,
    })
    private _itemPrefab: Prefab = null!;

    private _pool: Pool<Node> = null;

    private dataList: IAssetItem[] = [];

    createCell(index: number): Node {
        let cell: Node;
        let data = this.dataList[index];

        cell = this._pool.alloc();
        let com = cell.getComponent(DetailGoodsCellCtr);
        if (com) {
            com.updateView(data, index);
        }
        return cell;
    }

    releaseCell(cell: Node) {
        cell.removeFromParent();
        this._pool.free(cell);
    }

    rowCount(section: number) {
        return this.dataList.length;
    }

    onLoad(): void {
        if (!this._pool) {
            this.initPool();
        }
    };

    initPool() {
        this._pool = new Pool(
            () => {
                return instantiate(this._itemPrefab);
            },
            10,
            (node: Node) => {
                node.destroy();
            }
        );
    }

    start() {
    }

    removeAll() {
        let len: number = this._scrollView.content.children.length;
        let cell: Node;
        for (let i = len - 1; i >= 0; i--) {
            cell = this._scrollView.content.children[i];
            this.releaseCell(cell);
        }
    }

    updateView(data: IAssetItem[]) {
        if (!this._pool) {
            this.initPool();
        }
        this.removeAll();
        this.dataList = data;
        let len: number = this.dataList.length;
        let cell: Node;
        for (let index = 0; index < len; index++) {
            cell = this.createCell(index);
            this._scrollView.content.addChild(cell);
        }
    }

    /**
     * 测试使用
    */
    test() {
        // this.dataList = [];
        // for (let i = 0; i < 10; i++) {
        //     this.dataList.push([]);
        // }
        // this._tableView.refresh();
    }
}



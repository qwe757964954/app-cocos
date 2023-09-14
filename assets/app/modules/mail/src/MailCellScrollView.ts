import { _decorator, Component, EventTouch, Node } from 'cc';
import { Prefab } from 'cc';
import { Pool } from 'cc';
import { instantiate } from 'cc';
import { IAssetItem } from 'idl/tss/common/common_define';
import { ScrollView } from 'cc';
import { MailGoodsCellCtr } from './MailGoodsCellCtr';
import { UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MailCellScrollView')
export class MailCellScrollView extends Component {
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

    /**
     * 物品是否已领取
    */
    private isAccept: boolean = false;

    createCell(index: number): Node {
        let cell: Node;
        let data = this.dataList[index];
        cell = this._pool.alloc();
        let com = cell.getComponent(MailGoodsCellCtr);
        if (com) {
            com.updateView(data, index);
            com.updateMask(this.isAccept);
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

    updateView(data: IAssetItem[], isAccept: boolean) {
        if (!this._pool) {
            this.initPool();
        }
        this.isAccept = isAccept;
        this.removeAll();
        this.dataList = data;
        let len: number = this.dataList.length;
        let cell: Node;
        for (let index = 0; index < len; index++) {
            cell = this.createCell(index);
            this._scrollView.content.addChild(cell);
        }

        let width = this._scrollView.getComponent(UITransform).width;
        let contentWidth = this._scrollView.content.getComponent(UITransform).width;
        if (contentWidth < width) {
            this._scrollView.content.getComponent(UITransform).width = width;
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

    showBottomCell() {

    }

    onScroll() { }

}

import { Prefab } from 'cc';
import { instantiate } from 'cc';
import { Pool } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { IAssetItem } from 'idl/tss/common/common_define';
import { GoodsItemCtr } from './GoodsItemCtr';
import { ScrollView } from 'cc';
import { UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ScrollViewCtr')
export class ScrollViewCtr extends Component {
    @property({
        visible: true,
        type: Prefab,
    })
    private cellPrefab: Prefab = null!;
    private _pool: Pool<Node> = null;

    updateView(list: IAssetItem[][]) {
        if (!this._pool) {
            this.initPool();
        }
        this.removeAll();
        let content = this.node.getComponent(ScrollView).content;
        list.forEach((data: IAssetItem[]) => {
            let cell: Node = this.createCell(data);
            console.log(cell);
            content.addChild(cell);
        });
        let len = list.length;
        content.getComponent(UITransform).height = len * 380;
        console.log(content.getComponent(UITransform).contentSize, "contentSize");
    }
    initPool() {
        this._pool = new Pool(
            () => {
                return instantiate(this.cellPrefab);
            },
            10,
            (node: Node) => {
                node.destroy();
            }
        );
    }

    onLoad(): void {
        if (!this._pool) {
            this.initPool();
        }
    };

    createCell(data: IAssetItem[]) {
        let cell: Node = this._pool.alloc();
        let com = cell.getComponent(GoodsItemCtr);
        if (com) {
            com.updateView(data);
        }
        return cell;
    }
    removeAll() {
        let children = this.node.getComponent(ScrollView).content.children;
        let len = children.length;
        let node: Node;
        for (let i = len - 1; i >= 0; i--) {
            node = children[i];
            node.removeFromParent();
            this._pool.free(node);
        }
    }
}



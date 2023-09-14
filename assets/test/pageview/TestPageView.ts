import { _decorator, Component, Node, instantiate } from 'cc';
import { Pool } from 'cc';
import { TestPageItem } from "./TestPageItem"
import { Prefab } from 'cc';
import { XPageView } from 'bos/framework/gui/pageview/XPageView';
const { ccclass, property } = _decorator;

@ccclass('TestPageView')
export class TestPageView extends Component {

    @property({
        type: XPageView,
        visible: true,
    })
    private pageView: XPageView = null!;
    @property({
        type: Prefab,
        visible: true,
    })
    private _prefab: Prefab = null!;

    private _pool: Pool<Node> = null;
    private _datas: { name: string }[] = [];

    createPage(pageView: XPageView, index: number): Node {
        let cell = this._pool.alloc();
        let com = cell.getComponent(TestPageItem) || cell.addComponent(TestPageItem)
        com.name = this._datas[index].name;

        return cell
    }

    releasePage(pageView: XPageView, page: Node, index: number) {
        page.removeFromParent();
        this._pool.free(page);
    }
    pageCount(pageView: XPageView) {
        return this._datas.length;
    }

    onLoad() {
        this._pool = new Pool(() => {
            return instantiate(this._prefab)
        }, 3, (node: Node) => {
            node.destroy();
        });
    }

    protected start(): void {
        for (let i = 0; i < 5; i++) {
            this._datas.push({ name: `page:${i}` })
        }

        this.pageView.Delegate = this;
        this.pageView.gotoPage(0)
    }

    update(deltaTime: number) {

    }
}



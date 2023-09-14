import {
    _decorator,
    Component,
    Node,
    Prefab,
    PageView,
    instantiate,
    UITransform,
    Sprite,
} from 'cc';
const { ccclass, property } = _decorator;
import { PageData } from './../config/config';
import { PageCellCtr } from './PageCellCtr';

@ccclass('PageComponent')
export class PageComponent extends Component {
    @property({
        visible: true,
        type: Prefab,
    })
    private _itemPrefab: Prefab = null!;

    setData(data: PageData[]) {
        let pageView = this.node.getComponent(PageView); // 获取PageView组件
        let nodeWidth = pageView.view.width;
        let nodeHeight = pageView.view.height;
        let contentWidth = data.length * nodeWidth;
        const transform = pageView.content.getComponent(UITransform);
        transform.width = contentWidth;
        pageView.content.removeAllChildren();
        data.forEach((item: PageData) => {
            this.createPage(item, nodeWidth, nodeHeight);
        });
    }

    createPage(data: PageData, width: number, height: number) {
        let item = instantiate(this._itemPrefab);
        let pageView = this.node.getComponent(PageView);
        let node = this.createSprite(width, height);
        node.addChild(item);
        pageView.addPage(node);
        let component = item.getComponent('PageCellCtr');
        if (component) {
            (component as PageCellCtr).updateView(data);
        }
    }

    createSprite(width: number, height: number): Node {
        var spriteNode = new Node();
        spriteNode.addComponent(Sprite);
        let transform = spriteNode.getComponent(UITransform);
        transform.width = width;
        transform.height = height;
        return spriteNode;
    }
}

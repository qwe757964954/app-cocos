import { NodeUtil, XPageView } from 'bos/exports';
import { _decorator, Component, instantiate, Label, Node, Prefab } from 'cc';
import { YogaFlex } from 'bos/framework/yoga/YogaFlex';
const { ccclass, property } = _decorator;

enum ExpressionType {
    Emoji,
    GIF
}

@ccclass('FacePage')
export class FacePage extends Component {

    @property(XPageView)
    pageView: XPageView = null;

    @property(Prefab)
    public emojiCell: Prefab = null!;

    @property(Prefab)
    public GIFCell: Prefab = null!;

    @property(Node)
    targetNode: Node = null!;

    defaultPageIndex: number = 0;

    protected start(): void {
        this.targetNode = this.targetNode;
        this.defaultPageIndex = 0;
        this.pageView.Delegate = this;
        this.pageView.gotoPage(this.defaultPageIndex)
    }

    createPage(pageView: XPageView, index: number): Node {
        let cell = this.createCell(index);
        return cell
    }

    private createCell(index: number): Node {
        let cell = this.getCell(index)
        NodeUtil.broadcastMessage(cell, "updateView", this.targetNode)
        cell.getComponent(YogaFlex)?.updateLayout()
        return cell;
    }

    releasePage(pageView: XPageView, page: Node, index: number) {
        page.removeFromParent();
    }

    pageCount(pageView: XPageView) {
        return 2;
    }

    getCell(index: number): Node {
        let type = ExpressionType[index]
        let cell: Node = null;
        switch (type) {
            case "Emoji":
                cell = instantiate(this.emojiCell)
                break;
            case "GIF":
                cell = instantiate(this.GIFCell);
                break;
            default:
                break;
        }
        cell.name = type.toString()
        return cell;
    }

    protected onLoad(): void {
        this.pageView.Delegate = this;
    }

    setData() {
        this.pageView.gotoPage(this.defaultPageIndex);
    }
}

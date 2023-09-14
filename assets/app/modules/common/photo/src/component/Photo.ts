import { NodeUtil, XPageView } from 'bos/exports';
import { _decorator, Component, instantiate, Node, Pool, Prefab } from 'cc';
import { PhotoSource, PhotoType } from '../../../../../domain/photo/PhotoSource';
import { YogaFlex } from 'bos/framework/yoga/YogaFlex';
const { ccclass, property } = _decorator;

@ccclass('Photo')
export class Photo extends Component {

    @property(XPageView)
    pageView: XPageView = null;

    @property(Prefab)
    public imageCell: Prefab = null!;

    @property(Prefab)
    public videoCell: Prefab = null!;

    private nodePool: Map<number, Pool<Node>> = new Map<number, Pool<Node>>();

    private data: PhotoSource[] = [];


    defaultPageIndex:number = 0;
    targetNode: Node;

    createPage(pageView: XPageView, index: number): Node {
        let cell = this.createCell(this.data[index], index);
        return cell
    }

    setup(params: { data: PhotoSource[], targetNode: Node, defaultPageIndex: number }) {
        this.targetNode = params.targetNode;
        this.data = params.data;
        this.defaultPageIndex = params.defaultPageIndex || 0;
        this.pageView.Delegate = this;
        this.pageView.gotoPage(this.defaultPageIndex)
    }

    private createCell(ps: PhotoSource, index: number): Node {
        let pool = this.getPool(ps)
        let cell = pool.alloc();
        NodeUtil.broadcastMessage(cell, "updateView", ps, this.targetNode)
        cell.getComponent(YogaFlex)?.updateLayout()
        return cell;
    }

    releasePage(pageView: XPageView, page: Node, index: number) {
        let msgType = Number(page.name);
        let pool = this.nodePool.get(msgType)
        if (pool) {
            pool.free(page);

        }
        page.removeFromParent();
    }
    pageCount(pageView: XPageView) {
        return this.data.length;
    }

    getPool(ps: PhotoSource): Pool<Node> {
        let type = ps.type
        let pool = this.nodePool.get(type)
        if (!pool) {
            pool = new Pool<Node>(() => {
                let cell: Node = null;
                switch (type) {
                    case PhotoType.Image:
                        cell = instantiate(this.imageCell);
                        // cell.uuid
                        break;
                    case PhotoType.Video:
                        cell = instantiate(this.videoCell);
                        break;
                    default:
                        break;
                }
                cell.name = type.toString()
                return cell;
            }, 1, (node: Node) => {
                node.destroy();
            })
            // pool.
            this.nodePool.set(type, pool)
        }
        return pool
    }

    protected onLoad(): void {
        this.pageView.Delegate = this;
    }

    setData(data:PhotoSource[]) {
        this.data = data;
        this.pageView.gotoPage(this.defaultPageIndex);
    }

    protected start(): void {
        // this.test();
    }

    test() {
        let data:PhotoSource[] = [];
        for (let i = 0; i < 5; i++) {
            let ps = new PhotoSource();
            ps.url = "cos://im_a512901a76f2e59a63855746923c9280"

            data.push(ps);
        }
        this.setData(data);
    }
}
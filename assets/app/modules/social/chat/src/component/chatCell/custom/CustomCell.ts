import { _decorator, Component, instantiate, Node, Pool, Prefab } from 'cc';
import { Message } from 'qsdk/im/core/Message';
import { CustomOtherType, CustomTextType, CustomWithUserType } from './CustomConfig';
const { ccclass, property } = _decorator;

enum CustomGroupType {
    WithUser = 10000,
    Text = 20000,
    other = 30000,
}

@ccclass('CustomCell')
export class CustomCell extends Component {

    @property(Prefab)
    WithUserPrefab: Prefab = null!;

    @property(Prefab)
    TextPrefab: Prefab = null!;

    @property(Prefab)
    otherPrefab: Prefab = null!;

    curView: Node | null = null;

    private nodePool: Map<number, Pool<Node>> = new Map<number, Pool<Node>>();

    start() {

    }

    getPool(groupType: number) {
        let pool = this.nodePool.get(groupType)
        if (!pool) {
            pool = new Pool<Node>(() => {
                let cell: Node = null;
                switch (groupType) {
                    case CustomGroupType.WithUser:
                        cell = instantiate(this.WithUserPrefab);
                        break;
                    case CustomGroupType.Text:
                        cell = instantiate(this.TextPrefab);
                        break;
                    case CustomGroupType.other:
                        cell = instantiate(this.otherPrefab);
                        break;
                    default:
                        break;
                }
                cell.name = groupType.toString()
                return cell;
            }, 1, (node: Node) => {
                node.destroy();
            })
            this.nodePool.set(groupType, pool)
        }
        return pool
    }

    updateView(message: Message) {
        let groupType = this.getCustomGroupType(message)
        let pool = this.getPool(groupType)
        if (pool && this.node.isValid) {
            if (this.curView) {
                if (this.curView.name == groupType.toString()) {
                    return;
                } else {
                    pool.free(this.curView);
                    this.curView.removeFromParent();
                }
            }
            let cell = pool.alloc();
            this.node.addChild(cell);
            this.curView = cell;
        }
    }

    getCustomGroupType(message: Message) {
        let customType = message.content.customType;
        if (CustomWithUserType[customType]) {
            return CustomGroupType.WithUser
        } else if (CustomTextType[customType]) {
            return CustomGroupType.Text
        } else if (CustomOtherType[customType]) {
            return CustomGroupType.other
        } else {
            //目前暂不支持的类型，使用文本类型
            return CustomGroupType.Text
        }
    }

}
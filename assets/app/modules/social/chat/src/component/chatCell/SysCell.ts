import { _decorator, Component, Node, Pool, System } from 'cc';
import { Message } from 'qsdk/im/core/Message';
import { Label } from 'cc';
import { Log, TimeUtil } from 'bos/exports';
import { Prefab } from 'cc';
import { instantiate } from 'cc';
import { SysCMD } from 'idl/mp/common/social.im';
import { GroupChangeInfoType } from 'qsdk/im/config/define';
const { ccclass, property } = _decorator;

const SysType = {
    Text: 1,
    Hello: 2,
    Announce: 3,
}


@ccclass('SysCell')
export class SysCell extends Component {

    private contentNode: Node = null!;

    @property(Prefab)
    public textCell: Prefab = null!;


    @property(Prefab)
    public HelloCell: Prefab = null!;

    @property(Prefab)
    public AnnounceCell: Prefab = null!;

    private nodePool: Map<number, Pool<Node>> = new Map<number, Pool<Node>>();

    private lastSysType: number = -1

    updateView(message: Message) {
        let sysType = this.getSysType(message)
        if (sysType != this.lastSysType) {
            if (this.contentNode) {
                this.contentNode.removeFromParent()
                this.getPool(this.lastSysType).free(this.contentNode)
            }
            this.lastSysType = sysType
            this.contentNode = this.getPool(sysType).alloc()
            this.node.addChild(this.contentNode)
        }
    }

    getSysType(message: Message) {
        let sysType = SysType.Text
        if (message.sysCMD == SysCMD.RelateApplyAccept) {
            sysType = SysType.Hello
        } else if (message.sysCMD == SysCMD.GroupChangeInfo
            && message.sysContent?.changeType == GroupChangeInfoType.GroupChangeInfoTypeAnnouncement) {
            sysType = SysType.Announce
        }
        return sysType
    }

    getPool(msgType: number): Pool<Node> {
        let pool = this.nodePool.get(msgType)
        if (!pool) {
            pool = new Pool<Node>(() => {
                let cell: Node = null;
                switch (msgType) {
                    case SysType.Text:
                        cell = instantiate(this.textCell);
                        // cell.uuid
                        break;
                    case SysType.Hello:
                        cell = instantiate(this.HelloCell);
                        break;
                    case SysType.Announce:
                        cell = instantiate(this.AnnounceCell);
                        break;
                    default:
                        break;
                }
                return cell;
            }, 1, (node: Node) => {
                node.destroy();
            })
            // pool.
            this.nodePool.set(msgType, pool)
        }
        return pool
    }

}

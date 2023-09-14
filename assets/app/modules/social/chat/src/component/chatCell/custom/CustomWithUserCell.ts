import { NodeUtil, resLoader, uiMgr } from 'bos/exports';
import { _decorator, Component, instantiate, Node, Pool, Prefab, UITransform } from 'cc';
import { Message } from 'qsdk/im/core/Message';
import { CustomWithUserType } from './CustomConfig';
import { YogaFlex } from 'bos/framework/yoga/YogaFlex';
const { ccclass, property } = _decorator;


@ccclass('CustomWithUserCell')
export class CustomWithUserCell extends Component {

    @property(Node)
    subView: Node = null!;

    message: Message | null = null;
    private nodePool: Map<number, Pool<Node>> = new Map<number, Pool<Node>>();

    private prefabCache: Map<number, Prefab> = new Map<number, Prefab>();
    curView: Node | null = null;

    start() {

    }

    getPool(message: Message) {
        let msgType = message.content.customType;
        let pool = this.nodePool.get(msgType)
        if (!pool) {
            pool = new Pool<Node>(() => {
                let cell: Node = null;
                let prefab = this.prefabCache.get(msgType);
                if (prefab == null) {

                }
                cell = instantiate(prefab);
                cell.name = msgType.toString()
                return cell;
            }, 1, (node: Node) => {
                node.destroy();
            })
            this.nodePool.set(msgType, pool)
        }
        return pool
    }

    updateView(message: Message) {
        this.message = message;
        let subType = message.content.customType;
        if (!subType) {
            console.error('CustomCell not found customType', message);
            return;
        }

        this.loadPrefab(subType, (err, prefab) => {
            let customType = message.content.customType;
            let pool = this.getPool(message)
            if (pool && this.node.isValid) {
                if (this.curView) {
                    if (this.curView.name == customType.toString()) {
                        return;
                    } else {
                        pool.free(this.curView);
                        this.curView.removeFromParent();
                    }
                }
                let cell = pool.alloc();
                this.subView.addChild(cell);
                this.curView = cell;
                //因为是异步加载，所以要调用一下updateView
                NodeUtil.sendMessage(cell, 'updateView', message);
            }
        })
    }

    public loadPrefab(CustomType: CustomWithUserType, cb: Function) {
        let path = this.getCellPath(CustomType);
        let prefab = this.prefabCache.get(CustomType);
        if (prefab) {
            if (cb) {
                cb(null, prefab);
            }
            return;
        }
        resLoader.loadPrefab(path, (err, prefab) => {
            if (cb) {
                this.prefabCache.set(CustomType, prefab)
                cb(err, prefab);
            }
        });
    }

    public getCellPath(Type: CustomWithUserType) {
        switch (Type) {
            case CustomWithUserType.Gif:
                return 'social@chat/res/prefab/chatCell/custom/GifCell'
            case CustomWithUserType.Donate:
                return 'social@chat/res/prefab/chatCell/custom/DonateCell'
        }
    }
}
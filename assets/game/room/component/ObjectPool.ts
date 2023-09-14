import { NodeUtil, XComponent } from "bos/exports";
import { Prefab, _decorator } from "cc";
import { Node, NodePool, instantiate } from "cc";

const { ccclass, property } = _decorator;

interface NodeParam {
    name: string,
    param: any,
}

@ccclass('ObjectPool')
export class ObjectPool extends XComponent {

    @property(Prefab)
    public nodePrefab: Prefab[] = [];
    
    public freeNodes: Map<string, NodePool>;


    onLoad(): void {
        this.freeNodes = new Map();
        this.nodePrefab.forEach(v => {
            v && this.freeNodes.set(v.name, new NodePool(v.name));
        });
    }

    public get(data: NodeParam): Node {
        let node = null;
        // 通过 size 接口判断对象池中是否有空闲的对象
        let pool: NodePool = this.freeNodes.get(data.name);
        if (pool?.size() > 0) { 
            node = pool.get(data.param);
            this.freeNodes.set(data.name, pool);
        } else {
            // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 instantiate 重新创建
            let prefab = null;
            for (const v of this.nodePrefab) {
                if (v.name == data.name) {
                    prefab = v;
                    break;
                }
            }
            if (prefab) {
                node = instantiate(prefab);
                NodeUtil.sendMessage(node, 'reuse', [data.param]);
            }
        }
        return node;
    }

    public put(node: Node, name?: string) {
        if (node?.isValid) {
            let key = name || node.name;
            let pool: NodePool = this.freeNodes.get(key);
            pool.put(node);
            this.freeNodes.set(key, pool);
        }
    }

}   
import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Room } from '../Room';
import { NodeUtil } from 'bos/exports';

enum gameStatus {
    matching = 0,
    regular = 1,
    observe = 2,
}


@ccclass('GameStatus')
export class GameStatus extends XComponent {


    @property({ displayName: "isMatching" })
    public isMatching: boolean = false;
    @property({ displayName: "isRegular" })
    public isRegular: boolean = false;
    @property({ displayName: "isObserve" })
    public isObserve: boolean = false;

    @property(Prefab)
    public tempPrefab: Prefab;
    @property(Node)
    public parentNode: Node;



    start() {
        let needLoad = this.isRegular && Room.gameData.isRegular()
            || this.isObserve && Room.gameData.isObserving()
            || this.isMatching && Room.gameData.isMatching()
        if (needLoad && this.tempPrefab) {
            let node = instantiate(this.tempPrefab);
            node.parent = this.parentNode || this.node;
            NodeUtil.sendMessage(node, 'setup');
        }
    }


}
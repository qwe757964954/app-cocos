import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Room } from 'game/room/Room';
import { instantiate } from 'cc';
import { Prefab } from 'cc';

@ccclass('BottomBar')
export class BottomBar extends XComponent {

    @property(Node)
    public btnView: Node;
    @property(Prefab)
    public rankPre: Prefab;


    public rankInfo: Node;

    start() {
        this.initUI();
    }

    initUI() {
        if (Room.gameData.isRegular()) {
            if (!this.rankInfo) {
                this.rankInfo = instantiate(this.rankPre);
                this.btnView.addChild(this.rankInfo);
            }
        }
    }

    onClickChatBtn() {
    }
}
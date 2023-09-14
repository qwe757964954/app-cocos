import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { OkItem } from './OkItem';
import { Log, uiMgr } from 'bos/exports';
import { Player, PlayerState } from 'game/room/model/Player';
import { Room } from 'game/room/Room';
import { App } from 'app/App';

@ccclass('ReadyLayer')
export class ReadyLayer extends XComponent {

    @property(Node)
    public readNode: Node;

    @property(OkItem)
    public okItem1: OkItem;

    @property(OkItem)
    public okItem2: OkItem;

    @property(OkItem)
    public okItem3: OkItem;

    @property(OkItem)
    public okItem4: OkItem;

    myPlayer: Player;

    start() {
        this.okItem1.init(1);
        this.okItem2.init(2);
        this.okItem3.init(3);
        this.okItem4.init(4);
        this.myPlayer = Room.gameData.getPlayerByLocalSeat(1);
        this.readNode.active = this.myPlayer.state !== PlayerState.Playing;
        this.myPlayer.on(Player.EventType.UPDATE_USERINFO, this.onPlayerInfoChange.bind(this), this);
    }

    setup() {
        if (Room.gameData.getMaxPlayerCount() == 3) {
            let okItemPos = [new Vec3(0, -110), new Vec3(420, 325), new Vec3(-420, 325)];
            for (let i = 0; i < okItemPos.length; i++) {
                this[`okItem${i+1}`].node.setPosition(okItemPos[i]);
            }
        }
    }

    onDestroy(): void {
        this.myPlayer?.removeAll(this);
    }

    update(deltaTime: number) {
        
    }

    onPlayerInfoChange() {
        Log.d("==ReadyLayer onPlayerInfoChange==", this.myPlayer.state);
        this.readNode.active = this.myPlayer.state !== PlayerState.Playing;
    }

    //退出游戏
    onBackClick() {
        let isCanBack = false;
        for (const v of Room.gameData.getAllPlayer()) {
            Log.d("==onBackClick=v=", v.uid, v.localSeat, v.state);
            if (v.state == PlayerState.Default) {  //有一个玩家未准备，即可退出游戏
                isCanBack = true;
                break;
            }
        }

        if (isCanBack) {
            App.mateMgr.leaveDesk();
        } else {
            uiMgr.showToast("玩家已准备，不能退出！")
        }
    }
}
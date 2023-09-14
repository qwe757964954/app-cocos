import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { GamePlayer } from 'game/mahjong/model/GamePlayer';
import { Label } from 'cc';
import { MahjongRoom } from 'game/mahjong/Room';
import { Log } from 'bos/exports';
import { BankerInfo } from 'game/mahjong/model/GameData';

@ccclass('WaitTips')
export class WaitTips extends XComponent {

    @property(Label)
    public waitLabel: Label | null = null;

    mPlayer: GamePlayer;

    onLoad(): void {
        this.mPlayer = MahjongRoom.gameData.getMySelf();
        this.mPlayer.on(this.mPlayer.EventType.PLAYER_OUTCARDS, this.onHideLabel, this);
        this.mPlayer.on(this.mPlayer.EventType.PLAYER_WAIT, this.onWait, this);
        this.mPlayer.on(this.mPlayer.EventType.PLAYER_OP_RESULT, this.onHideLabel, this);
        MahjongRoom.gameData.on(MahjongRoom.gameData.EventType.BANKER_CHANGE, this.onBankerChange, this);
    }
    
    start() {
        
    }

    onDestroy(): void {
        MahjongRoom.gameData?.removeAll(this);
        this.mPlayer?.removeAll(this);
    }

    onHideLabel() {
        this.waitLabel.node.active = false;
    }

    onBankerChange(info: BankerInfo) {
        let bankerSeat = info.bankerSeat;
        if (bankerSeat == 1) {
            this.waitLabel.string = "你是庄家，请出牌...";
            this.waitLabel.node.active = true;
        }
    }

    onWait(msg: { uid?: number }) {
        Log.d("==onWait==", msg, msg.uid ? true : false)
        this.waitLabel.string = "等待其他玩家操作中..."
        this.waitLabel.node.active = msg.uid ? true : false;
    }

    update(deltaTime: number) {

    }
}
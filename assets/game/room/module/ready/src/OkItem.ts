import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Sprite } from 'cc';
import { Player, PlayerState } from 'game/room/model/Player';
import { Room } from 'game/room/Room';
import { Log } from 'bos/exports';

@ccclass('OkItem')
export class OkItem extends XComponent {

    @property(Sprite)
    public okIcon: Sprite;

    player: Player;

    start() {

    }

    update(deltaTime: number) {

    }

    init(seat: number) {
        this.player = Room.gameData.getPlayerByLocalSeat(seat);
        if (this.player) {
            this.okIcon.node.active = this.player.state == PlayerState.Ready;
            Log.d("==OkItem init==", seat, this.player.state);
            this.player.on(Player.EventType.UPDATE_USERINFO, this.onPlayerInfoChange, this);
        } else {
            this.okIcon.node.active = false;
        }
    }

    onDestroy(): void {
        this.player?.removeAll(this);
    }

    onPlayerInfoChange() {
        Log.d("==OkItem onPlayerInfoChange==", this.player.state);
        this.okIcon.node.active = this.player.state == PlayerState.Ready;
    }
}
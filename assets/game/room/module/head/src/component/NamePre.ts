import { _decorator, Label,} from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Player } from 'game/room/model/Player';
import { Room } from 'game/room/Room';

@ccclass('NamePre')
export class NamePre extends XComponent {

    @property(Label)
    public nameLab: Label;

    public playerSeat: number = 0;

    start() {

    }


    bindPlayerBySeat(seat: number) {
        this.unbindPlayer();
        this.playerSeat = seat;
        let myPlayer = Room.gameData.getPlayerByLocalSeat(seat);
        if (myPlayer) {
            console.log('==NamePre.bindPlayerBySeat==', seat);
            this.updateName(myPlayer);
            myPlayer.on(Player.EventType.UPDATE_USERINFO, this.updateName, this);
        }
    }

    unbindPlayer() {
        let myPlayer = this.playerSeat > 0 && Room.gameData.getPlayerByLocalSeat(this.playerSeat);
        myPlayer && myPlayer.removeAll(this);
    }


    updateName(user: Player) {
        console.log('==NamePre.bindPlayerBySeat==', this.playerSeat, user)
        this.nameLab.string = user && user.nickname;
    }

    update(deltaTime: number) {

    }


}
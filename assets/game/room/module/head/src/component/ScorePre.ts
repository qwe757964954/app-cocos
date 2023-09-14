import { _decorator, Label } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { BundleSprite } from 'bos/framework/component/BundleSprite';
import { Player } from 'game/room/model/Player';
import { Room } from 'game/room/Room';
import { SpriteFrame } from 'cc';
import { Sprite } from 'cc';

@ccclass('ScorePre')
export class ScorePre extends XComponent {
    
    @property(Label)
    public scoreLab: Label;
    @property(Sprite)
    public scoreIcon: Sprite;
    @property(SpriteFrame)
    public coinImg: SpriteFrame;
    @property(SpriteFrame)
    public scoreImg: SpriteFrame;

    public playerSeat: number = 0;

    

    bindPlayerBySeat(seat: number) {
        this.unbindPlayer();
        this.playerSeat = seat;
        this.updateScoreIcon();
        let myPlayer = Room.gameData.getPlayerByLocalSeat(seat);
        if (myPlayer) {
            console.log('==ScorePre.bindPlayerBySeat==', seat)
            this.updateScore(myPlayer);
            myPlayer.on(Player.EventType.UPDATE_USERINFO, this.updateScore, this);
        }
    }

    unbindPlayer() {
        let myPlayer = this.playerSeat > 0 && Room.gameData.getPlayerByLocalSeat(this.playerSeat);
        myPlayer && myPlayer.removeAll(this);
    }

    updateScore(user: Player) {
        console.log('==ScorePre.updateScore==', this.playerSeat, user);
        this.scoreLab.string = user && user.matchScore?.toString();
    }

    updateScoreIcon() {
        this.scoreIcon.spriteFrame = Room.gameData.isRegular() ? this.scoreImg : this.coinImg;
    }

    update(deltaTime: number) {

    }
}
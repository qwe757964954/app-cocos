import { _decorator, Color, Component, Node, Sprite } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Player } from 'game/room/model/Player';
import { Room } from 'game/room/Room';
import { Avatar } from 'app/modules/common/avatar/src/Avatar';
import { uiMgr } from 'bos/exports';



@ccclass('HeadPre')
export class HeadPre extends XComponent {
   
    @property(Avatar)
    public headView: Avatar;

    public playerSeat: number = 0;
    
    start() {

    }


    bindPlayerBySeat(seat: number) {
        this.unbindPlayer();
        this.playerSeat = seat;
        let myPlayer = Room.gameData.getPlayerByLocalSeat(seat);
        if (myPlayer) {
            this.updateHead(myPlayer);
            myPlayer.on(Player.EventType.UPDATE_USERINFO, this.updateHead, this);
        }
    }

    unbindPlayer() {
        let myPlayer = this.playerSeat > 0 && Room.gameData.getPlayerByLocalSeat(this.playerSeat);
        myPlayer && myPlayer.removeAll(this);
    }

    updateHead(user: Player) {
        this.headView.setUserID(user.uid);
    }

    update(deltaTime: number) {

    }

    onClickHead() {
        let myPlayer = Room.gameData.getPlayerByLocalSeat(this.playerSeat);
        uiMgr.loadPopup("room@module/playerInfo/res/prefab/PlayerInfo", {params : {uid: myPlayer?.uid}});
    }

    //hexColor：进度条颜色   secondInfo：可选，倒计时到达某一限值后，变换颜色
    setRingyColor(hexColor: string, secondInfo?: {color: string, time: number}) {
        this.headView.setRingyColor(hexColor, secondInfo);
    }

    //设置倒计时起始值
    setRingyStart(time: number) {
        this.headView.setRingyStart(time);
    }

    //结束环形进度条
    setRingyEnd(){
        this.headView.setRingyEnd();
    }
}
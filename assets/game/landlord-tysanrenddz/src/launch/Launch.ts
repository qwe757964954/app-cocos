

import { Audio, XComponent } from "bos/exports";
import { _decorator } from 'cc';
import { Room } from 'game/room/Room';
import { Room as PdkRoom } from "game/pdk/Room";
import { App } from "app/App";
import { AudioConfig, AudioUtil } from "game/pdk/res/audio/AudioConfig";




const { ccclass, property } = _decorator;
@ccclass('Launch')
export class Launch extends XComponent {

    start() {
        Room.eventSystem.on(Room.Event.EXIT_GAME, this.exitGame, this);
        Audio.BGM.pause();
        Audio.BGM.play(AudioUtil.getMusicPath(AudioConfig.music_Audio_Game_Back));
    }

    exitGame() {
        App.mateMgr.leaveDesk();
    }


    onDestroy() {
        Audio.BGM.pause();
        Room.eventSystem.removeAll(this);
        PdkRoom.gameData.release();
    }

}
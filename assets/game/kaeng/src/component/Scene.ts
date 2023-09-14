

import { Audio, XComponent } from "bos/exports";
import { _decorator } from 'cc';
import { Room } from 'game/kaeng/Room';
import { App } from "app/App";




const { ccclass, property } = _decorator;
@ccclass('KaengScene')
export class Scene extends XComponent {

    start() {
        // Audio.BGM.pause();
        // Audio.BGM.play(AudioUtil.getMusicPath(AudioConfig.music_Audio_Game_Back));
        Room.eventSystem.on(Room.Event.EXIT_GAME, this.exitGame, this);
    }

    exitGame() {
        App.mateMgr.leaveDesk();
    }



}
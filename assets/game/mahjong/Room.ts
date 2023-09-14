import { EventSystem } from 'bos/base/event/EventSystem';
import { GameData } from './model/GameData';
import { MsgHandler } from './net/MsgHandler';
import { MatchManager } from 'game/room/match/MatchManager';

class MahjongRoom {
    static gameData: GameData;
    static msgHandler: MsgHandler;
    static eventSystem: EventSystem;
    static matchMgr: MatchManager;

    static init(params: any) {
        Object.assign(MahjongRoom, params);
    }

    static exitGame() {
        this.msgHandler.release();
        this.gameData.release();
    }
}

export {MahjongRoom}
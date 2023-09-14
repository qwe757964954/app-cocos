import { EventSystem } from 'bos/base/event/EventSystem';
import { GameData } from 'game/dummy/model/GameData';
import { MsgHandler } from 'game/dummy/net/MsgHandler';
import { CardEngine } from 'game/room/framework/card/CardEngine';
import { MatchManager } from 'game/room/match/MatchManager';

class Room {
    static gameData: GameData;
    static msgHandler: MsgHandler;
    static cardEngine: CardEngine;
    static eventSystem: EventSystem;
    static matchMgr: MatchManager;

    static init(params: any) {
        Object.assign(Room, params);
    }

    static exitGame() {
        this.msgHandler.release();
        this.gameData.release();
    }
}

export {Room}
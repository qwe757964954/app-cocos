import { MatchManager } from "game/room/match/MatchManager";
import { GameData } from "./model/GameData";
import { CardEngine } from "game/room/framework/card/CardEngine";
import { EventSystem } from "bos/base/event/EventSystem";
import { MsgHandler } from "./net/MsgHandler";
import { GameRound } from "./model/GameRound";
import { GameConfig } from "./src/config/GameConfig";

class Room {
    static gameData: GameData;
    static roundInfo: GameRound;
    static matchMgr: MatchManager;
    static cardEngine: CardEngine;
    static msgHandler: MsgHandler;
    static eventSystem: EventSystem;

    static Event = {
        EXIT_GAME: 'EXIT_GAME',
    }

    constructor() {
        Room.roundInfo = new GameRound();
    }

    static init(params: any) {
        Object.assign(Room, params);
        GameConfig.init();
    }


}

export {Room}
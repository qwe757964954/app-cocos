import { CardEngine } from "game/room/framework/card/CardEngine";
import { GameData } from "game/room/model/GameData";
import { MsgHandler } from "game/room/net/MsgHandler";
import { MatchManager } from "./match/MatchManager";
import { Log, uiMgr } from "bos/exports";
import { EventSystem } from "bos/base/event/EventSystem";
import { RoomGameDelegate } from "./observe/GameDelegate";
import { App } from "app/App";
import { ObserverManager } from "./observe/ObserverManager";
import { Api } from "./api/Api";

interface RoomDelegate {
    createPlayer: Function;
}

class Room {
    static bootParams: any;
    static gameData: GameData;
    static matchMgr: MatchManager;
    static cardEngine: CardEngine;
    static delegate: RoomDelegate;
    static eventSystem: EventSystem;
    static msgHandler: MsgHandler;
    static gameDelegate: RoomGameDelegate;
    static obManager: ObserverManager;
    static api: Api;

    static Event = {
        EXIT_GAME: 'EXIT_GAME',
    }

    static init(params: any) {
        Log.d("==room init==");
        Object.assign(Room, params);

        // 设置GameMgr中 GameDelegate的代理
        this.gameDelegate = new RoomGameDelegate();
        App.gameMgr.setDelegate(this.gameDelegate);

        this.obManager = new ObserverManager();
        this.gameData.initPlayer(params.playerNum);
    }

    static initData(data: any) {
        this.gameData.initData(data);
        this.matchMgr.init();

    }
}

export {Room}
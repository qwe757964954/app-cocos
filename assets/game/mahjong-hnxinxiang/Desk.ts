import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Log } from 'bos/exports';
import { GameData } from 'game/mahjong/model/GameData';
import { EventSystem } from "bos/base/event/EventSystem";
import { MatchManager } from "game/room/match/MatchManager";
import { MsgHandler } from 'game/mahjong/net/MsgHandler';
import { Room } from 'game/room/Room';
import { MahjongRoom } from 'game/mahjong/Room';
import { GameConfig } from './config/GameConfig';
import { Api } from 'game/mahjong/api/Api';

@ccclass('Desk')
export class Desk extends XComponent {
    onLoad(): void {
        this.init()
    }

    init(){
        Log.d("=mahjong Scene=Desk=init=")
        let gameData = new GameData();
        let eventSystem: EventSystem = new EventSystem();
        let matchMgr: MatchManager = new MatchManager();
        let msgHandler: MsgHandler = MsgHandler.Instance();
        let api: Api = new Api();
        
        Room.init({
            gameData: gameData,
            matchMgr: matchMgr,
            eventSystem: eventSystem,
            msgHandler: msgHandler,
            api: api,
            playerNum: GameConfig.playerNumber
        });
        
        MahjongRoom.init({
            gameData: gameData,
            matchMgr: matchMgr,
            eventSystem: eventSystem,
            msgHandler: msgHandler,
        });
        
    }

    start() {

    }

    update(deltaTime: number) {

    }
}
import { _decorator, Component, Node, view } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Room } from 'game/room/Room';
import { Room as KaengRoom } from "game/kaeng/Room";
import { GameData } from 'game/kaeng/model/GameData';
import { EventSystem } from 'bos/base/event/EventSystem';
import { MatchManager } from 'game/room/match/MatchManager';
import { CardEngine } from 'game/room/framework/card/CardEngine';
import { MsgHandler } from 'game/kaeng/net/MsgHandler';
import { Api } from 'game/kaeng/api/Api';
import { GamePlayer } from 'game/kaeng/model/GamePlayer';
import { GameParams } from 'app/domain/game/GameMgr';
import { Audio, Log } from 'bos/exports';
import { KaengTable } from 'game/kaeng/idl/tss/thailand/kaeng';
import { App } from 'app/App';
import { GameConfig } from '../config/GameConfig';

@ccclass('KaengLaunch')
export class Launch extends XComponent {

    public api: Api = new Api();
    public gameData: GameData = new GameData();
    public cardEngine: CardEngine = new CardEngine();
    public msgHandler: MsgHandler = new MsgHandler();
    public matchMgr: MatchManager = new MatchManager();
    public eventSystem: EventSystem = new EventSystem();


    onLoad(): void {
        Room.init({
            api: this.api,
            matchMgr: this.matchMgr,
            gameData: this.gameData,
            cardEngine: this.cardEngine,
            msgHandler: this.msgHandler,
            eventSystem: this.eventSystem,
            playerNum: GameConfig.playerNum,
            delegate: {
                createPlayer: (seat: number): GamePlayer => {
                    return new GamePlayer(seat)
                }
            },
        })
        KaengRoom.init({
            matchMgr: this.matchMgr,
            gameData: this.gameData,
            cardEngine: this.cardEngine,
            msgHandler: this.msgHandler,
            eventSystem: this.eventSystem,
        })
    }

    setup(params: GameParams) {
        Log.d("==quickStart=");
        let mainUid = params.observeData?.mainUid || App.userMgr.loginUid;
        Room.initData({
            mainUid: mainUid,
            gameID: params.gameID,
            playOption: params.playWay,
            matchType: params.matchType,
        })

        this.msgHandler.init({
            mainUid: mainUid,
            gameID: params.gameID,
            extendTable: KaengTable,
            matchType: params.matchType,
        })

        // 存在围观桌子，则初始化obManager
        params.observeData && Room.obManager?.init(params.tableKey);
    }

    onDestroy() {
        Audio.BGM.pause();
        Room.eventSystem.removeAll(this);
        KaengRoom.gameData.release();
    }

}
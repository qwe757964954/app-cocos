import { _decorator } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { EventSystem } from 'bos/base/event/EventSystem';
import { Log } from 'bos/exports';
import { Room } from 'game/room/Room';
import { MatchManager } from 'game/room/match/MatchManager';
import { GameData } from 'game/pdk/model/GameData';
import { MsgHandler } from 'game/landlord-tysanrenddz/net/MsgHandler';
import { GamePlayer } from 'game/pdk/model/GamePlayer';
import { Room as PdkRoom } from "game/pdk/Room";
import { App } from 'app/App';
import { ExtendTable } from 'game/pdk/idl/tss/pdk/extendtable.v3';
import { CardEngine } from 'game/room/framework/card/CardEngine';
import { GameConfig } from '../config/GameConfig';
import { GameParams } from 'app/domain/game/GameMgr';
import { Api } from 'game/pdk/api/Api';

@ccclass('PdkScene')
export class Scene extends XComponent {

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
        PdkRoom.init({
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
            extendTable: ExtendTable,
            matchType: params.matchType,
        })

        // 存在围观桌子，则初始化obManager
        params.observeData && Room.obManager?.init(params.tableKey);
    }


    onClickExit() {
        Room.eventSystem.emit(Room.Event.EXIT_GAME);
    }
}
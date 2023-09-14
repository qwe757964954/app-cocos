import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { EventSystem } from 'bos/base/event/EventSystem';
import { Audio, Log } from 'bos/exports';
import { MatchManager } from 'game/room/match/MatchManager';
import { MsgHandler } from 'game/dummy/net/MsgHandler';
import { GameData } from 'game/dummy/model/GameData';
import { Api } from 'game/dummy/api/Api';
import { Room as DummyRoom} from './Room';
import { Room } from 'game/room/Room';
import { GameParams } from 'app/domain/game/GameMgr';
import { App } from 'app/App';
import { CardEngine } from 'game/room/framework/card/CardEngine';
import { ExtendTable } from 'game/dummy/idl/tss/thailand/dummy';

@ccclass('Dummy')
export class Dummy extends XComponent {

    onLoad() {
        this.init();
    }

    init(){
        Log.d("=dummy Scene=init=")
        let gameData = new GameData();
        let eventSystem: EventSystem = new EventSystem();
        let matchMgr: MatchManager = new MatchManager();
        let cardEngine: CardEngine = new CardEngine();
        let msgHandler: MsgHandler = MsgHandler.Instance();
        let api: Api = new Api();
        
        Room.init({
            gameData: gameData,
            matchMgr: matchMgr,
            eventSystem: eventSystem,
            msgHandler: msgHandler,
            cardEngine: cardEngine,
            api: api,
        });
        
        DummyRoom.init({
            gameData: gameData,
            matchMgr: matchMgr,
            eventSystem: eventSystem,
            msgHandler: msgHandler,
            cardEngine: cardEngine,
        });

        gameData.initPlayer(4); //最多4个人
    }

    setup(params: GameParams) {
        Log.d("=Scene=setup=", params)
        
        let mainUid = (params.observeData && params.observeData.mainUid) || App.userMgr.loginUid;

        let msgHandler = MsgHandler.Instance();
        msgHandler.init({
            mainUid: mainUid,
            matchType: params.matchType,
            extendTable: ExtendTable,
            gameID: params.gameID,
        });

        
        Room.initData({
            matchType: params.matchType,
            playOption: params.playWay,
            mainUid: mainUid,
            gameID: params.gameID,
        });
        
        DummyRoom.matchMgr.init();

        if (params.observeData) { //存在围观桌子，则初始化obManager
            Room.obManager.init(params.tableKey);
        }
    }
    
    start() {

    }

    update(deltaTime: number) {

    }

     //退出场景，在此方法内做一些释放操作
     onDestroy(): void {
        Log.d("=dummy scene=onDestroy=")
        Audio.BGM.pause();
        Audio.Effect.pause();
        DummyRoom.exitGame();
        Room.eventSystem.removeAll(this);
    }
}
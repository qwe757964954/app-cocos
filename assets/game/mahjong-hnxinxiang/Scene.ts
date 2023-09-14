import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Audio, Log, uiMgr } from 'bos/exports';
import { MahjongRoom } from "game/mahjong/Room";
import { GameData } from "game/mahjong/model/GameData";
import { Room } from "game/room/Room";

import { App } from "app/App";
import { GameConfig } from './config/GameConfig';
import { MsgHandler } from 'game/mahjong/net/MsgHandler';
import { GameParams } from 'app/domain/game/GameMgr';
import { ExtendTable } from 'game/mahjong/idl/tss/mahjong/extendtable';

@ccclass('Scene')
export class Scene extends XComponent {

    onLoad(): void {
        Log.d("=mahjong Scene=onLoad=")
    }

    start() {
        Log.d("=mahjong Scene=start=")

    }

    update(deltaTime: number) {

    }
    
    setup(params: GameParams) {
        Log.d("=Scene=setup=", params)
        
        let mainUid = (params.observeData && params.observeData.mainUid)|| App.userMgr.loginUid;

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
        
        if (params.observeData) { //存在围观桌子，则初始化obManager
            Room.obManager.init(params.tableKey);
        }
    }
   
    //退出场景，在此方法内做一些释放操作
    onDestroy(): void {
        Log.d("=mahjong scene=onDestroy=")
        Audio.BGM.pause();
        Audio.Effect.pause();
        MahjongRoom.exitGame();
        Room.eventSystem.removeAll(this);
    }
}
import { _decorator, Component, Node, Sprite } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { GamePlayer } from 'game/mahjong/model/GamePlayer';
import { MahjongRoom } from 'game/mahjong/Room';
import { Log } from 'bos/exports';
import { Event } from 'game/mahjong/config/Event';
import { GameData } from 'game/mahjong/model/GameData';
import { MsgHandler } from 'game/mahjong/net/MsgHandler';
import { Button } from 'cc';
import { BetData, ExtendTable } from 'game/mahjong/idl/tss/mahjong/extendtable';

@ccclass('Bet')
export class Bet extends XComponent {

    @property(Node)
    public info: Node | null = null;

    mPlayer: GamePlayer;
    mBetData: BetData;

    //点击下注，code：0/1/2/3/4
    betClick(event, customEventData: number) {
        //发送下注操作
        let msg = {
            type: this.mBetData.type,
            uid: this.mBetData.uid,
            opt: {
                tgUid: this.mBetData.uid,
                option: customEventData,
            },
        };
        Log.d("=betClick msg=", msg);
        MahjongRoom.msgHandler.sendTableAction(ExtendTable.Bet, msg);
        this.info.active = false;
    }

    onLoad(): void {
        MahjongRoom.eventSystem.on(Event.RESET_VIEW, this.resetView, this);
        this.mPlayer = MahjongRoom.gameData.getMySelf();
        //设置下注数据
        this.mPlayer.on(this.mPlayer.EventType.PLAYER_SET_BETDATA, this.onSetBetData, this);
    }

    start(): void {
    }

    onDestroy(): void {
        this.mPlayer?.removeAll(this);
    }

    resetView() {
        this.info.active = false;
    }

    onSetBetData(betData: BetData) {
        Log.d("==onSetBetData==", betData)
        let opt = betData.opt;
        if (opt == null || opt.options == null) {
            this.mBetData = null;
            this.info.active = false;
            return;
        }
        if (opt.option == -1 && opt.options.length > 0) {
            this.mBetData = betData;
            this.info.active = true;
        }
    }

    update(deltaTime: number) {

    }
}
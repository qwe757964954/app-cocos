

import { MsgHandler as BaseMsgHandler, MsgHandlerParams } from 'game/room/net/MsgHandler';
import { Log } from 'bos/exports';
import { PlayerState } from 'game/room/model/Player';
import { Room } from '../Room';
import { GamePlayer } from '../model/GamePlayer';
import { MsgManaged, MsgTableInfo as MsgTableInfo_v2, Table } from "idl/tss/game/table.v2"
import { GameStage } from '../model/GameData';
import { MsgDealCard, MsgGameResult, MsgTableInfo, MsgPlayCardInfo, MsgPlayResult, MsgShowCardResult, MsgScoreChange } from 'game/kaeng/idl/tss/thailand/kaeng';

export class MsgHandler extends BaseMsgHandler {

    init(data: MsgHandlerParams) {
        super.init(data);
        Log.d("MsgHandler.init", data);
    }

    onTableEvent(name: string, data: any): void {
        // 检查方法名是否存在
        let methodName = "on".concat(name)
        if (typeof this[methodName] === "function") {
            // 使用this和方法名的字符串调用方法
            this[methodName](data);
        } else {
            Log.w(methodName.concat("方法 not found...."));
        }
    }

    setTableEnd() {
        Room.roundInfo.reset();
        Room.gameData.curStage = GameStage.Default;
        Room.gameData.setTableEnd();
        Room.eventSystem.emit('RESET_VIEW');
        Room.gameData.getAllPlayer().forEach(v => {
            v.isAI = false;
            v.state = PlayerState.Default;
            v.cleanCard();
            v.refresh();
        });
    }

    // 收到自动托管消息时候
    onNotifyManaged(msg: MsgManaged) {
        let player = Room.gameData.getPlayerByID(msg.uid);
        player.isAI = player.isPlaying() && msg.isManaged;
        // player.emit(Player.EventType.UPDATE_USERINFO, player);
        super.onNotifyManaged(msg);
    }

    setTableStart(msg: MsgTableInfo_v2, isReconnect: boolean = false) {
        Room.roundInfo.reset();
        let tableData: MsgTableInfo = MsgTableInfo.decode(msg.tableInfo);
        Log.d('==setTableStart==', isReconnect, tableData);
        this.updateData(tableData, isReconnect)
        Room.gameData.getAllPlayer().forEach(v => {
            v.isAI = false;
            v.state = PlayerState.Playing;
            v.cleanCard();
            v.refresh();
        });
        isReconnect && Room.eventSystem.emit(Table.NotifyReconnect.name, tableData);
    }

    updateData(data: MsgTableInfo, isConnect: boolean = false) {
        Log.d('==updateData==', data, isConnect);
        Room.gameData.resetData();
        Room.eventSystem.emit('RESET_VIEW');
        Room.gameData.setPlayerInfo(data.users);
        Room.gameData.baseScore = data.scoreConfig?.BaseScore || 1;
        if (data.cardConfig?.types) {
            // 玩法牌型配置
            let types = [];
            data.cardConfig.types.forEach(v => types.push({ type: v.type, args: v.args }))
            Room.cardEngine.loadConfig({ types: types, compare: data.cardConfig.compare });
        }

        isConnect && this.refreshReconnectData(data);
        this.refreshMatchUser();
    }

    refreshReconnectData(data: MsgTableInfo) {
        for (const v of data.users) {
            let player: GamePlayer = Room.gameData.getPlayerByID(v.uid);
            player.state = PlayerState.Playing;
            player.isAI = player.getLocalSeat() != 1 && v.isManaged;
            player.setCards(v.handCards?.uint32s_value?.value);

            if (v.opInfo) {
                Room.roundInfo.setOptUid(v.uid);
                Room.roundInfo.setUserOpInfo(v.uid, v.opInfo.play_card_info);
            }
        }
        data.opResults?.forEach(v => Room.roundInfo.setUserOpResult(v.uid, v));
    }

    // 发牌
    onNotifyDealCard(data: MsgDealCard) {
        Log.d('==onNotifyDealCard==', data);
        Room.gameData.curStage = GameStage.DealCard;
        data?.dealCards?.forEach(v => Room.gameData.getPlayerByID(v.uid)?.setCards(v.value?.uint32s_value?.value))
    }

    // 通知特殊牌型
    onNotifySpecialCardType(data: MsgPlayCardInfo) {

    }

    // 通知玩家开始出牌
    onNotifyPlayStart(data: MsgPlayCardInfo) {
        Room.gameData.curStage = GameStage.PlayCard;
        Room.roundInfo.setOptUid(data.uid);
        Room.roundInfo.setUserOpInfo(data.uid, data.options);

    }

    // 通知玩家出牌结果
    onNotifyPlayResult(data: MsgPlayResult) {
        Log.d('==onNotifyPlayCard:==', data);
        Room.roundInfo.setUserOpResult(data.uid, data.opResult);

    }

    // 开牌结果
    onNotifyShowCard(data: MsgShowCardResult) {

    }

    // 倍数变化
    onNotifyScoreChange(data: MsgScoreChange) {

    }


    // 结算
    onNotifyGameResult(data: MsgGameResult) {
        Log.d('==onNotifyGameResult:==', data);
        Room.gameData.curStage = GameStage.Result;
        Room.gameData.getAllPlayer().forEach(v => {
            v.state = PlayerState.Result;
            v.isAI = false;
            v.refresh();
        });
    }

}
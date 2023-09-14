import { MsgHandler as BaseMsgHandler } from 'game/room/net/MsgHandler';
import { Audio, Log, resLoader } from 'bos/exports';
import { Event } from '../config/Event';
import { PlayerState } from 'game/room/model/Player';
import { Constants } from '../config/Constants';
import { OpCode } from '../config/OpCode';
import { MsgManaged, MsgTableInfo } from 'idl/tss/game/table.v2';
import { BetData, BetEnd, DealCardInfo, DiceInfo, FixBanker, GameSettle, HandCards, OperateOption, OperateResultInfo, OperateWaiting, Table, UpdateOpData } from '../idl/tss/mahjong/extendtable';
import { AudioConfig } from '../config/AudioConfig';
import { AudioUtils } from '../AudioUtils';
import { MahjongRoom } from '../Room';

export class MsgHandler extends BaseMsgHandler {
    private static instance: MsgHandler = null;
    public static Instance(): MsgHandler {
        if (this.instance == null) {
            this.instance = new MsgHandler();
        }
        return this.instance;
    }

    onTableEvent(name: string, data: any): void {
        Log.d("==onTableEvent==", name, data);
        // 检查方法名是否存在
        let methodName = "on".concat(name);
        if (typeof this[methodName] === "function") {
            // 使用this和方法名的字符串调用方法
            this[methodName](data);
        } else {
            Log.d(methodName.concat("方法 not found...."));
        }
    }

    onClearTable() {
        MahjongRoom.gameData.resetGameData(true);
        MahjongRoom.gameData.resetPlayerData(true);
        MahjongRoom.eventSystem.emit(Event.RESET_VIEW);
    }

    setTableStart(data: MsgTableInfo, isConnect: boolean = false) {
        this.onClearTable();
        Audio.Effect.playOneShot(AudioUtils.getAudioPath(AudioConfig.audio_gamestart));
        let msg: Table = Table.decode(data.tableInfo);
        Log.d("==setTableStart==", msg);
        let playerList = MahjongRoom.gameData.getAllPlayer();
        for (let player of playerList) {
            player.state = PlayerState.Playing;
            player.refresh()
        }
        MahjongRoom.gameData.setGameState(msg.state);
        MahjongRoom.gameData.setTableInfo(msg);
    }

    onStartGame(data: any) {

    }

    onDealCard(data: any) {
        Audio.Effect.playOneShot(AudioUtils.getAudioPath(AudioConfig.audio_deal_card));
        let msg = data as DealCardInfo;
        for (let info of msg.dealCards) {
            let player = MahjongRoom.gameData.getPlayerByID(info.uid);
            if (info.cards.length > 0) {
                player.setCards(info.cards);
            }
            else if (info.count > 0) {
                player.setCardCount(info.count);
            }
        }
        MahjongRoom.gameData.setRemainCount(msg.wallCnt);
    }

    onZhiTou(data: any) {
        Audio.Effect.playOneShot(AudioUtils.getAudioPath(AudioConfig.audio_sz));
        let msg = data as DiceInfo;
        MahjongRoom.gameData.setDiceInfo(msg);
    }

    onDingZhuang(data: any) {
        let msg = data as FixBanker;
        MahjongRoom.gameData.setBankerInfo(msg.bankerId);
    }

    onWaitOperation(data: any) {
        let msg = data as OperateWaiting;
        MahjongRoom.gameData.setWaitOpt(msg);
    }

    onNotifyBet(data: any) {
        let msg = data as BetData;
        if (msg.opt != null && msg.opt.option == -1) {
            MahjongRoom.gameData.setPlayerBetData([msg], Constants.XIAZHU_STATE.Start);
        }
        else {
            let player = MahjongRoom.gameData.getPlayerByID(msg.uid);
            player.setBetData(new BetData({uid: msg.uid}), Constants.XIAZHU_STATE.Result);
        }
    }

    onEndBet(data: any) {
        let msg = data as BetEnd;
        let betDatas = msg.betDatas;
        MahjongRoom.gameData.setPlayerBetData(betDatas, Constants.XIAZHU_STATE.End);
        for (let data of betDatas) {
            let player = MahjongRoom.gameData.getPlayerByID(data.uid);
            if (player.getLocalSeat() == 1) {
                MahjongRoom.gameData.setWaitOpt({});
                break;
            }
        }
    }

    onStartOperate(data: any) {
        let msg = data as OperateOption;
        MahjongRoom.gameData.setPlayerOpOption(msg);
    }

    onOperateResult(data: any) {
        let msg = data as OperateResultInfo;
        MahjongRoom.gameData.setOutCardTurn(false);
        MahjongRoom.gameData.clearPlayerOpOption();
        MahjongRoom.gameData.setPlayerOpResult(msg);

        if (msg.wallCnt) {
            MahjongRoom.gameData.setRemainCount(msg.wallCnt);
        }
    }

    onNotifyManaged(data: any) {
        let msg = data as MsgManaged;
        MahjongRoom.gameData.setPlayerAiStatus(msg);
        super.onNotifyManaged(msg);
    }

    onNotifyUpdateOpData(data: any) {
        let msg = data as UpdateOpData;
        let player = MahjongRoom.gameData.getPlayerByID(msg.uid);
        player.updateOpData(new OperateResultInfo({
            uid: msg.uid,
            opData: msg.opData,
        }));
    }

    onSettleGame(data: any) {
        let msg = data as GameSettle;
        let tableSettle = msg.tableSettle;
        let jsonStr = new TextDecoder().decode(tableSettle);
        let settleData = JSON.parse(jsonStr);
        //为了方便计算方位，把四个玩家的信息带上
        let allPlayers = MahjongRoom.gameData.getAllPlayer()
        let userInfo= new Map();
        for (let index = 0; index < allPlayers.length; index++) {
            let player = allPlayers[index];
            userInfo[player.uid.toLocaleString()] = {
                uid: player.uid, 
                name: player.nickname, 
                sex: player.gender, 
                localSeat: player.localSeat, 
                avatar: player.avatar,
                isBanker: player.uid == MahjongRoom.gameData.getBankerInfo().bankerId,
            }
        }
        settleData.userInfo = userInfo
        Log.d("==onSettleGame==", settleData);
        MahjongRoom.gameData.setOpOption(new OperateOption({}));
        MahjongRoom.gameData.setWaitOpt({});
        MahjongRoom.gameData.clearPlayerOpOption();
        MahjongRoom.gameData.setSettleData(settleData);
    }

    onShowCards(data: any) {
        let msg = data as HandCards;
        MahjongRoom.gameData.setPlayerSpreadCards(msg);
        MahjongRoom.gameData.setGameState(Constants.GAME_STATE.IsShowCards);
        // setTimeout(() => {
        //     let settleData = MahjongRoom.gameData.getSettleData()
        //     MahjongRoom.eventSystem.emit(Event.SHOE_SETTLE, settleData)
        // }, 2)
    }

    onEndGame() {
        MahjongRoom.gameData.setPlayerAiStatus(new MsgManaged({}), true);
    }

    setTableEnd(): void {
        this.onClearTable();
    }

    release(): void {
        super.release();
    }
}
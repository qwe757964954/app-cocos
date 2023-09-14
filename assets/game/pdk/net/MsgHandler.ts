

import { MsgHandler as BaseMsgHandler } from 'game/room/net/MsgHandler';
import { Log } from 'bos/exports';
import { PlayerState } from 'game/room/model/Player';
import { Room } from '../Room';
import { GameStage, Identity, ScoreType } from '../model/GameConst';
import { PdkGameConfig as GameConfig } from '../config/GameConfig';
import { GamePlayer } from '../model/GamePlayer';
import { LastCards } from '../model/DataModel';
import { CardStack } from 'game/room/framework/card/CardStack';
import { CardInfo } from 'game/room/framework/card/CardInfo';
import { MsgManaged, MsgTableInfo as MsgTableInfo_v2, Table } from "idl/tss/game/table.v2"
import { CallDealerInfo, CallDealerResult, CallScoreInfo, CallScoreResult, CardConfig_CardTypeItem, MsgDealCard, MsgGameResult, MsgScoreChange, MsgTableInfo, OpInfo, PlayCardInfo, PlayCardResult, RaiseScoreResult } from 'game/pdk/idl/tss/pdk/extendtable.v3';
import { FollowPrompter } from 'game/room/framework/card/prompt/FollowPrompter';
import { FirstPrompter } from 'game/room/framework/card/prompt/FirstPrompter';

export class MsgHandler extends BaseMsgHandler {

    onTableEvent(name: string, data: any): void {
        // 检查方法名是否存在
        let methodName = "on".concat(name)

        if (typeof this[methodName] === "function") {
            // 使用this和方法名的字符串调用方法
            this[methodName](data);
        } else {
            Log.d(methodName.concat("方法 not found...."));
        }
    }

    setTableEnd() {
        Room.gameData.curStage = GameStage.GameEnd;
        this.onClearTable();
    }

    onClearTable() {
        Room.gameData.setTableEnd();
        Room.eventSystem.emit('RESET_VIEW');
        Room.gameData.getAllPlayer().forEach(v => {
            v.state = PlayerState.Default;
            v.getLocalSeat() == 1 && v.cleanCard();
        });
    }

    // 收到自动托管消息时候
    onNotifyManaged(msg: MsgManaged) {
        if (Room.gameData.curStage != GameStage.Default) {
            let player = Room.gameData.getPlayerByID(msg.uid);
            player.isAI = msg.isManaged
        }
        super.onNotifyManaged(msg);
    }

    setTableStart(msg: MsgTableInfo_v2, isReconnect: boolean = false) {
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

        // 玩法牌型配置
        let cardCfg = data.cardConfig;
        if (cardCfg) {
            if (cardCfg.totalCards && cardCfg.totalCards.length > 0) {
                GameConfig.userCardNum = (cardCfg.totalCards.length - GameConfig.bottomCardNum) / Room.gameData.getMaxPlayerCount();
            }

            let types = [];
            for (const v of cardCfg.types) {
                let args: Array<string> = [];
                for (const n of v.args) {
                    args.push(n.toString());
                }
                types.push(new CardConfig_CardTypeItem({ type: v.type, args: args }));
            }
            Room.cardEngine.init({
                firstPrompters: [new FirstPrompter()],
                followPrompters: [new FollowPrompter()]
            });
            Room.cardEngine.loadConfig({ types: types, compare: cardCfg.compare });
        }

        if (data.tasks) {
            Room.gameData.tasks = data.tasks;
        }
        if (data.baseScore) {
            Room.gameData.baseScore = data.baseScore;
        }
        if (data.scoreInfo) {
            Room.gameData.scoreInfo = new Map();
            for (const v of data.scoreInfo) {
                Room.gameData.scoreInfo.set(v.key, v.value);
            }
        }
        if (data.users) {
            Room.gameData.setPlayerInfo(data.users);
        }

        isConnect ? this.refreshReconnectData(data) : this.refreshStartData();
        this.refreshMatchUser();
    }

    refreshReconnectData(data: MsgTableInfo) {
        Room.gameData.curStage = data.stage;

        for (const v of data.users) {
            let player: GamePlayer = Room.gameData.getPlayerByID(v.uid);
            player.identity = v.identity;
            player.originCards = v.originCards;
            player.isAI = player.getLocalSeat() != 1 && v.isManaged;
            player.setCards(v.handCards?.uint32s_value?.value);

            if (v.opInfo) {
                Room.gameData.optUid = player.uid;
            }
            for (const k of (v.scoreInfo || [])) {
                player.scoreInfo.set(k.key, k.value);
            }
        }
        Room.gameData.bottomCards = data.bottomCards;

        if (data.stage == GameStage.PlayCard) {
            let lastCards: LastCards;
            for (const v of (data.opResults || [])) {
                let playRet = v.play_card_result;
                if (Room.gameData.optUid != playRet.uid && playRet.opcode == 1) {
                    let cardStack = new CardStack({ bytes: playRet.cards });
                    let cardInfo = Room.cardEngine.checkCardInfo(cardStack);
                    lastCards = {
                        cardInfo: cardInfo,
                        cards: playRet.cards,
                        seat: Room.gameData.getLocalSeatByID(playRet.uid),
                    };
                }
            }
            Room.gameData.lastCards = lastCards;
            Room.gameData.emit('update_countCard');
            console.log('==reconnect.lastCards==', lastCards);
        }
    }

    // 更新桌子数据
    refreshStartData() {
        // Room.gameData.bottomCards = [];
    }

    // 游戏开始
    onNotifyGameStart() {
        Room.gameData.curStage = GameStage.GameStart;
    }

    // 发牌
    onNotifyDealCard(data: MsgDealCard) {
        Log.d('==onNotifyDealCard==', data);

        Room.gameData.bottomCards = data.bottomCards;
        // Room.gameData.leftBottom = data.bottomCards;
        for (const v of data.dealCards) {
            let player = Room.gameData.getPlayerByID(v.uid);
            player.setCards(v.value?.uint32s_value?.value);
        }
        Room.gameData.curStage = GameStage.DealCard;
    }

    // 通知叫分开始
    onNotifyCallScoreStart(data: CallScoreInfo) {
        Log.d("onNotifyCallScoreStart ", data);
        Room.gameData.curStage = GameStage.CallScore;
    }

    // 通知叫分结果
    onNotifyCallScoreResult(data: CallScoreResult) {
        Log.d("onNotifyCallScoreResult ", data);
        Room.gameData.scoreInfo.set(ScoreType.CallScore, data.score);
        if (data.bottomCards?.length > 0) {
            Room.gameData.scoreInfo.set(ScoreType.CallScore, data.totalMultiples);
            this.setBanker(data);
        }
    }

    // 设置地主
    setBanker(data: CallScoreResult | CallDealerResult) {
        Log.d("setBanker ", data);
        // 显示加上地主牌之后的所有手牌
        let uid = (data.caller || 0) > 0 ? data.caller : data.uid;
        let banker = Room.gameData.getPlayerByID(uid);
        banker.addCards(data.bottomCards);
        banker.originCards = [... banker.getCardValueList()];
        Room.gameData.bottomCards = [...data.bottomCards];
        Room.gameData.getAllPlayer().forEach(v => { v.identity = uid == v.uid ? Identity.Dealer : Identity.Normal; })
        Room.gameData.emit('update_countCard');
        Room.eventSystem.emit('NotifyBanker', uid);
    }

    // 抢地主开始
    onNotifyCallDealerStart(data: CallDealerInfo) {
        Log.d('==onNotifyCallDealerStart==', data);
        Room.gameData.optUid = data.uid;
        Room.gameData.curStage = GameStage.CallDealer;
        let player = Room.gameData.getPlayerByID(data.uid);
        let opInfo = {uid: data.uid, call_dealer_info: data};
        Room.gameData.roundInfo.setUserOpInfo(player, opInfo)
    }

    // 抢地主结果
    onNotifyCallDealerResult(data: CallDealerResult) {
        Log.d('==onNotifyCallDealerResult:==', data);
        let player = Room.gameData.getPlayerByID(data.uid);
        data?.caller > 0 && Room.gameData.scoreInfo.set(ScoreType.CallDealer, data.totalMultiples);
        let opResult = {uid: data.uid, call_dealer_result: data};
        Room.gameData.roundInfo.setUserOpResult(player, opResult);
        data.bottomCards?.length > 0 && this.setBanker(data);
    }

    // 加倍开始
    onNotifyRaiseScoreStart(data: OpInfo) {
        Log.d('==onNotifyRaiseScoreStart:==', data);
        Room.gameData.curStage = GameStage.Double;
        if (data.uid == Room.gameData.getMyID()) {
            Room.gameData.optUid = data.uid;
        }
        let player = Room.gameData.getPlayerByID(data.uid);
        Room.gameData.roundInfo.setUserOpInfo(player, data)
    }

    // 加倍结果
    onNotifyRaiseScoreResult(data: RaiseScoreResult) {
        Log.d('==onNotifyRaiseScoreResult:==', data);
        let player = Room.gameData.getPlayerByID(data.uid);
        player.scoreInfo.set(ScoreType.RaiseScore, data.totalScore);
        let opResult = {uid: data.uid, raise_score_result: data};
        Room.gameData.roundInfo.setUserOpResult(player, opResult);
    }

    // 通知玩家开始出牌
    onNotifyPlayStart(data: PlayCardInfo) {
        Room.gameData.optUid = data.uid;
        let player = Room.gameData.getPlayerByID(data.uid);
        let seat = player.getLocalSeat();
        if (Room.gameData.curStage != GameStage.PlayCard) {
            Room.gameData.lastCards = null;
            Room.gameData.curStage = GameStage.PlayCard;
        }
        if (Room.gameData.lastCards?.seat == seat) {
            Room.gameData.lastCards = null;
        }
        Log.d('==onNotifyPlayStart:==', Room.gameData.lastCards, seat, data);
        let opInfo = {play_card_info: data, uid: data.uid};
        Room.gameData.roundInfo.setUserOpInfo(player, opInfo);
    }

    // 通知玩家出牌结果
    onNotifyPlayCard(data: PlayCardResult) {
        Log.d('==onNotifyPlayCard:==', data);

        let cardInfo: CardInfo;
        let isSameToPrePlay = false;
        let player = Room.gameData.getPlayerByID(data.uid);
        let seat = player.getLocalSeat();
        if (seat == 1 && Room.gameData.prePlay?.cards?.length > 0) {
            isSameToPrePlay = this.checkOutCard(data);
            if (!isSameToPrePlay) {
                // 预出牌有问题
                let preCount = 0;
                Room.gameData.prePlay.cards.forEach(v => {
                    v && (preCount += 1);
                });
            }
        }
        if (data.cards?.length > 0) {
            player.removeCards(data.cards);
            let cardStack = new CardStack({ bytes: data.cards });
            cardInfo = Room.cardEngine.checkCardInfo(cardStack);
            Room.gameData.lastCards = { cardInfo: cardInfo, cards: data.cards, seat: seat };
            console.log('=onNotifyPlayCard==lastCards==', seat, data.uid, Room.gameData.lastCards);
        }
        let opResult = {uid: data.uid, play_card_result: data};
        Room.gameData.roundInfo.setUserOpResult(player, opResult);
        seat != 1 && Room.gameData.emit('update_countCard');
    }

    // 检查出牌是一致
    checkOutCard(data: PlayCardResult): boolean {
        let arr = data.cards || [];
        let prePlay = { ...Room.gameData.prePlay };
        if (!prePlay.cardInfo || arr.length != prePlay.cards.length) {
            return false;
        }
        arr.sort();
        prePlay.cards.sort();
        for (let i = 0; i < arr.length; i++) {
            if (arr[1] != prePlay.cards[i]) {
                return false;
            }
        }
        return true;
    }

    // 通知分数变化
    onNotifyScoreChange(data: MsgScoreChange) {
        Log.d('==onNotifyScoreChange:==', data);
        Room.gameData.scoreInfo?.set(data.type, data.score);
    }

    // 结算
    onNotifyGameResult(data: MsgGameResult) {
        Room.gameData.optUid = 0;
        Log.d('==onNotifyGameResult:==', data);
        Room.gameData.curStage = GameStage.Settle;
        if (data.scoreInfo?.length > 0) {
            Room.gameData.scoreInfo.clear();
            data.scoreInfo.forEach(v => Room.gameData.scoreInfo.set(v.key, v.value))
        }
        Room.gameData.getAllPlayer().forEach(v => {
            v.isAI = false;
            v.refresh();
        });
    }

    onNotifyTaskList() {

    }

}
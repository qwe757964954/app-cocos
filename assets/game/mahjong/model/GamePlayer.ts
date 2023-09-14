import { Player as BasePlayer, PlayerState } from "game/room/model/Player";
import { OpCode } from "../config/OpCode";
import { BetData, HandCard, HuInfo, OperateData, OperateOption, OperateResultInfo, TingInfo, User } from "../idl/tss/mahjong/extendtable";
import { Log } from "bos/exports";

export class GamePlayer extends BasePlayer {
    m_count: number;
    m_cards: number[];
    m_handCards: number[];
    m_outCards: number[];
    m_opOption: OperateOption;
    m_spreadCards: HandCard;
    m_fzCard: number;
    m_opDataList: OperateData[];
    m_tingInfo: TingInfo;
    m_lastCard: number;
    m_waitOpInfo: { uid?: number };
    m_betData: BetData;
    m_huInfos: HuInfo[];
    m_exposeCards: number[];
    m_grabCard: number;

    EventType = {
        PLAYER_INFO_CHANGE: "PLAYER_INFO_CHANGE",
        PLAYER_SET_CARDS: "PLAYER_SET_CARDS",
        PLAYER_SET_CARD_COUNT: "PLAYER_SET_CARD_COUNT",
        PLAYER_OP_RESULT: "PLAYER_OP_RESULT",
        PLAYER_OP_START: "PLAYER_OP_START",
        PLAYER_SPREAD_CARD: "PLAYER_SPREAD_CARD", //玩家摊牌
        PLAYER_SET_AI_STATUS: "PLAYER_SET_AI_STATUS", //玩家托管状态改变
        PLAYER_SET_TING_INFO: "PLAYER_SET_TING_INFO", //玩家听牌状态改变
        PLAYER_WAIT: "PLAYER_WAIT", // 等待玩家操作
        PLAYER_OUTCARDS: "PLAYER_OUTCARDS", // 设置玩家出牌数据
        PLAYER_SET_OPGROUPS: "PLAYER_SET_OPGROUPS", // 设置玩家操作数据列表
        PLAYER_SET_BETDATA: "PLAYER_SET_BETDATA", // 设置玩家的下注数据
        PLAYER_CHANGECARD: "PLAYER_CHANGECARD", // 设置玩家的换牌数据
        PLAYER_DINGQUE: "PLAYER_DINGQUE", // 设置玩家的定缺数据
        UPDATE_HANDCARD_SORTFUNC: "UPDATE_HANDCARD_SORTFUNC", // 更新手牌排序方法
        PLAYER_ADD_HUOPINFO: "PLAYER_ADD_HUOPINFO", // 添加玩家的胡牌操作信息
        PLAYER_EXPOSECARDS: "PLAYER_EXPOSECARDS", // 玩家从手中摆出牌
    };

    public init(): void {
        this.resetPlayerData();
    }

    public resetGameData(): void {
        this.resetPlayerData();
    }

    public resetPlayerData(isNewGame?: boolean): void {
        this.m_count = 0;
        this.m_cards = [];  //操作后手牌，与后端一致
        this.m_handCards = [];  //前端玩家手中的牌，吃碰杠等操作暂未移出手牌
        this.isAI = false;
        this.m_outCards = [];
        this.m_opOption = new OperateOption({});
        this.m_spreadCards = new HandCard({});
        this.m_fzCard = -1;
        this.m_opDataList = [];
        this.m_tingInfo = new TingInfo({});
        this.m_lastCard = 0;
        this.m_waitOpInfo = {};
        this.m_betData = new BetData({});
        this.m_huInfos = [];
        this.m_exposeCards = [];
        this.m_grabCard = 0;
        this.state = PlayerState.Default;
    }

    public getUserId(): number {
        return this.uid;
    }

    public getLocalSeat(): number {
        return this.localSeat;
    }

    public getGender(): number {
        return this.gender || 1;
    }

    public setPlayerInfo(msg: User): void {
        this.setAiStatus({ uid: msg.uid, isAI: msg.isTrust });

        // 更新出牌区数据[在GameData中调用通知更新出牌区逻辑(notifyOutCards)]
        if (msg.outCards) {
            this.m_outCards = msg.outCards;
        }

        // 更新操作区数据
        if (msg.handCard.opGroups) {
            this.setOpDataList(msg.handCard.opGroups);
        }

        // 更新听牌数据
        if (msg.tingInfo) {
            this.setTingOpInfo(msg.tingInfo);
        }

        // 更新胡牌数据
        if (msg.huInfos) {
            this.m_huInfos = []; // 清空胡牌信息
            for (const huInfo of msg.huInfos) {
                this.addHuOpInfo(huInfo, true);
            }
        }
    }

    public addHuOpInfo(huInfo: HuInfo, isReconnect: boolean): void {
        this.m_huInfos.push(huInfo);
        this.emit(this.EventType.PLAYER_ADD_HUOPINFO, { huInfo: huInfo, seat: this.getLocalSeat(), isReconnect: isReconnect });
    }

    public getHuOpInfos(): HuInfo[] {
        return this.m_huInfos;
    }

    public setOpDataList(opDataList: OperateData[]): void {
        this.m_opDataList = opDataList;
        this.emit(
            this.EventType.PLAYER_SET_OPGROUPS,
            { opDataList: this.m_opDataList, seat: this.getLocalSeat() }
        );
    }

    public getOpDataList(): OperateData[] {
        return this.m_opDataList;
    }

    public setTingOpInfoByOpResult(opResult: OperateResultInfo): void {
        // 听牌后不再重置听牌信息
        if (this.m_tingInfo.isTing) {
            return;
        }

        const isTingMap = {
            [OpCode.OPE_TING]: true,
            [OpCode.OPE_JIA_TING]: true,
            [OpCode.OPE_LANG_QI]: true,
        };

        // 更新听牌信息
        const opCode = opResult.opData.opCode;
        this.setTingOpInfo(new TingInfo({
            isTing: isTingMap[opCode] || false,
            tingCode: isTingMap[opCode] ? opCode : 0,
            tingList: opResult.tingList || [],
        }))
    }

    public setTingOpInfo(tingInfo: TingInfo): void {
        this.m_tingInfo = tingInfo;
        this.emit(this.EventType.PLAYER_SET_TING_INFO, tingInfo.tingList);
    }

    public getTingOpInfo(): TingInfo {
        return this.m_tingInfo;
    }

    public setWaitOpt(msg: { uid?: number }): void {
        this.emit(this.EventType.PLAYER_WAIT, msg);
        this.m_waitOpInfo = msg;
        if (msg && Object.keys(msg).length !== 0) {
            this.clearOpOption();
            return;
        }
    }

    public getPlayerInfo(): {} {
        const playerInfo = {
            uid: this.getUserId(),
            seat: this.getLocalSeat(),
            sex: this.getGender(),
            outCards: this.m_outCards,
            handCard: {
                opGroups: this.m_opDataList,
                handCard: this.m_cards,
                count: this.m_count,
            },
            ai: this.isAI,
            tingInfo: this.m_tingInfo,
            lastCard: this.m_lastCard,
            exposeCards: this.m_exposeCards,
        };
        return playerInfo;
    }

    public setCards(cards: number[], isReconnect?: boolean): void {
        this.m_cards = cards.sort((a, b) => a - b);
        this.m_handCards = [...this.m_cards];
        if (cards.length == 14) {
            this.setGrabCard(cards[cards.length - 1])
        }
        this.emit(this.EventType.PLAYER_SET_CARDS, {
            cards: cards,
            seat: this.getLocalSeat(),
            isReconnect: isReconnect,
        });
    }

    public getCards(): number[] {
        const t = [];

        // 其他玩家返回一个长度为 cardCount 的数组
        if (this.m_cards.length === 0 && this.m_count > 0) {
            for (let i = 0; i < this.getCardCount(); i++) {
                t.push(0);
            }
        } else {
            for (const card of this.m_cards) {
                t.push(card);
            }
            for (const card of this.getExposeCards()) {
                t.push(card);
            }
        }

        return t;
    }

    public getHandCards(): number[] {
        return this.m_handCards;
    }

    public setCardCount(count: number, isReconnect?: boolean): void {
        this.m_count = count;
        this.emit(this.EventType.PLAYER_SET_CARD_COUNT, {
            count: count,
            seat: this.getLocalSeat(),
            isReconnect: isReconnect,
        });
    }

    public addCardCount(increment?: number): void {
        if (increment != null) {
            this.m_count += increment;
        }
    }

    public getCardCount(): number {
        return this.m_count;
    }

    public setOpResult(opResult: OperateResultInfo): void {
        const funcMap = {
            [OpCode.OPE_GRAB]: this.grabCard.bind(this),
            [OpCode.OPE_OUT_CARD]: this.setOutCard.bind(this),
            [OpCode.OPE_FOLD]: this.setOutCard.bind(this),
            [OpCode.OPE_FEN_ZHANG]: this.setFenZhangCard.bind(this),
            [OpCode.OPE_CHI]: this.addOpData.bind(this),
            [OpCode.OPE_PENG]: this.addOpData.bind(this),
            [OpCode.OPE_AN_GANG]: this.addOpData.bind(this),
            [OpCode.OPE_PENG_GANG]: this.addOpData.bind(this),
            [OpCode.OPE_BU_GANG]: this.updateOpData.bind(this),
            [OpCode.OPE_TING]: this.setOutCard.bind(this),
            [OpCode.OPE_JIA_TING]: this.setOutCard.bind(this),
            [OpCode.OPE_ZI_MO]: this.removeCard.bind(this),
            [OpCode.OPE_LANG_QI_OUT_CARD]: this.setOutCard.bind(this),
        };

        const opCode = opResult.opData.opCode;
        if (funcMap[opCode]) {
            funcMap[opCode](opResult);
        }

        // 设置手牌张数
        this.m_count = opResult.handCnt - this.getExposeCards().length;
        this.emit(this.EventType.PLAYER_OP_RESULT, { opResult: opResult, seat: this.getLocalSeat() });

        // 设置听牌信息
        this.setTingOpInfoByOpResult(opResult);

        // 重置等待玩家操作
        this.setWaitOpt({});

        // 记录玩家的最后一张牌
        if (opCode === OpCode.OPE_GRAB) {
            this.setLastCard(opResult.opData.opCard);
            this.m_handCards = [...this.m_cards.slice(0, this.m_cards.length - 1)].sort((a, b) => a - b);
        } else {
            this.setLastCard(0);
            this.m_handCards = [...this.m_cards].sort((a, b) => a - b);
        }

        switch (opCode) {
            case OpCode.OPE_TING:
            case OpCode.OPE_JIA_TING:
            case OpCode.OPE_LANG_QI_OUT_CARD:
            case OpCode.OPE_OUT_CARD:
            case OpCode.OPE_FOLD: { //处理完出牌消息后，重置抓牌
                this.setGrabCard(0)
                break;
            };
            case OpCode.OPE_CHI:
            case OpCode.OPE_PENG: { //吃、碰、碰杠之后，玩家要出牌，有一张要模拟为抓的牌
                this.m_handCards = this.m_handCards.sort((a, b) => a - b);
                let grabCard = this.m_handCards[this.m_handCards.length - 1]
                this.setGrabCard(grabCard)
                break;
            };
            default:
                break;
        }
    }

    isTableInter(tb1: number[], tb2: number[]): boolean {
        for (const v1 of tb1) {
            for (const v2 of tb2) {
                if (v1 === v2) {
                    return true;
                }
            }
        }
        return false;
    }

    public setGrabCard(card: number): void {
        this.m_grabCard = card;
    }

    public getGrabCard(): number {
        return this.m_grabCard;
    }

    public updateOpData(opResult: OperateResultInfo) {
        const opData = opResult.opData;

        // 先移出手牌
        for (let index = 0; index < opData.opCards.length; index++) {
            const card = opData.opCards[index];
            for (let i = this.m_cards.length - 1; i >= 0; i--) {
                if (this.m_cards[i] === card) {
                    this.m_cards.splice(i, 1);
                    break;
                }
            }
        }

        // 更新之前的 opData
        for (let i = 0; i < this.m_opDataList.length; i++) {
            const v = this.m_opDataList[i];
            if (this.isTableInter(opData.opCards, v.opCards)) {
                this.m_opDataList[i] = opData;
                break;
            }
        }
    }

    public setOpOption(msg: OperateOption): void {
        this.m_opOption = msg;
        this.emit(this.EventType.PLAYER_OP_START, msg);
    }

    public getOpOption(): OperateOption {
        return this.m_opOption;
    }

    public clearOpOption(): void {
        this.m_opOption = new OperateOption({});
    }

    public setSpreadCards(handCard: HandCard): void {
        this.m_spreadCards = handCard;
        // 摊牌时可以记录玩家手牌
        if (handCard.lastCard !== 0) {
            for (let i = handCard.cards.length - 1; i >= 0; i--) {
                if (handCard.cards[i] === handCard.lastCard) {
                    handCard.cards.splice(i, 1);
                }
            }
            this.setLastCard(handCard.lastCard);
        }
        this.m_cards = handCard.cards;
        this.setExposeCards({ cards: this.getExposeCards() });
        this.emit(this.EventType.PLAYER_SPREAD_CARD, {
            handCard: handCard,
            seat: this.getLocalSeat(),
        });
    }

    public getSpreadCards(): HandCard {
        return this.m_spreadCards;
    }

    public setAiStatus(data: { isAI?: boolean, uid?: number }): void {
        this.isAI = data.isAI;
        this.emit(this.EventType.PLAYER_SET_AI_STATUS, this.isAI);
    }

    public getAiStatus(): boolean {
        return this.isAI;
    }

    public grabCard(opResult: OperateResultInfo): void {
        let card = opResult.opData.opCard;
        this.setGrabCard(card);
        if (this.getLocalSeat() == 1) {
            this.m_cards.push(card);
        }
    }

    public setOutCard(opResult: OperateResultInfo): void {
        let card = opResult.opData.opCard;
        this.removeCard(opResult);
        this.addOutCard(card);
    }

    public addOutCard(card: number): void {
        this.m_outCards.push(card);
    }

    public removeCard(opResult: OperateResultInfo): void {
        let card = opResult.opData.opCard;
        for (let i = this.m_cards.length - 1; i >= 0; i--) {
            if (this.m_cards[i] === card) {
                this.m_cards.splice(i, 1);
                break;
            }
        }
    }

    public notifyOutCards(outCards: number[]): void {
        // 通知出牌事件
        this.emit(this.EventType.PLAYER_OUTCARDS, { outCards: outCards, seat: this.getLocalSeat() });
    }

    public getOutCards(): number[] {
        return this.m_outCards;
    }

    public setFenZhangCard(opResult: OperateResultInfo): void {
        this.m_fzCard = opResult.opData.opCard;
        // 分张抓牌
        this.grabCard(opResult);
    }

    public getFenZhangCard(): number {
        return this.m_fzCard;
    }

    public addOpData(opResult: OperateResultInfo): void {
        let cards = opResult.opData.opCards;
        for (let index = 0; index < cards.length; index++) {
            const card = cards[index];
            for (let i = this.m_cards.length - 1; i >= 0; i--) {
                if (this.m_cards[i] === card) {
                    this.m_cards.splice(i, 1);
                    break;
                }
            }
        }
        this.m_opDataList.push(opResult);
    }

    public clearOpData(): void {
        this.m_opDataList = [];
    }

    public setLastCard(card: number): void {
        this.m_lastCard = card;
    }

    public getLastCard(): number {
        return this.m_lastCard;
    }

    public setWaitOpInfo(opInfo: { uid?: number }): void {
        this.m_waitOpInfo = opInfo;
    }

    public getWaitOpInfo(): { uid?: number } {
        return this.m_waitOpInfo;
    }

    public clearWaitOpInfo(): void {
        this.m_waitOpInfo = {};
    }

    public setBetData(betData: BetData, status?: number): void {
        this.m_betData = betData;
        this.emit(this.EventType.PLAYER_SET_BETDATA, betData);
    }

    public getBetData(): BetData {
        return this.m_betData;
    }

    public updateHandCardSortFunc(sortFunc?: Function) {
        if (sortFunc != null) {
            this.emit(this.EventType.UPDATE_HANDCARD_SORTFUNC, {
                sortFunc: sortFunc,
                seat: this.getLocalSeat(),
            });
        }
    }

    public setExposeCards(
        data: { cards: number[] },
        isReconnect?: boolean
    ): void {
        this.m_exposeCards = data.cards;
        if (this.m_exposeCards.length > 0) {
            if (this.m_cards.length > 0) {
                let exposeCardMap = {};
                for (let i = 0; i < this.m_exposeCards.length; i++) {
                    let card = this.m_exposeCards[i];
                    exposeCardMap[card] = true;
                }
                let cards = [];
                for (let i = 0; i < this.m_cards.length; i++) {
                    let card = this.m_cards[i];
                    if (!exposeCardMap[card]) {
                        cards.push(card);
                    }
                }
                this.setCards(cards, true);
            } else {
                this.setCardCount(this.m_count - this.m_exposeCards.length, true);
            }
        }
        // 通知玩家摆牌
        this.emit(this.EventType.PLAYER_EXPOSECARDS, {
            cards: data.cards,
            seat: this.getLocalSeat(),
            isReconnect: isReconnect,
        });
    }

    public getExposeCards(): number[] {
        return this.m_exposeCards;
    }

    //退出游戏时调用，清除数据
    release() {
        this.m_opOption = null;
        this.m_spreadCards = null;
        this.m_tingInfo = null;
        this.m_betData = null;
    }
}

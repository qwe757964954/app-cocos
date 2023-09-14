import { GameData as BaseGameData } from "game/room/model/GameData";
import { Constants } from "../config/Constants";
import { GamePlayer } from "./GamePlayer";
import { OpCode } from "../config/OpCode";
import { App } from "app/App";
import { BetData, DiceInfo, HandCards, OperateData, OperateOption, OperateResultInfo, Table, User } from "../idl/tss/mahjong/extendtable";
import { MsgManaged } from "idl/tss/game/table.v2";
import { Desk } from "app/domain/mate/Desk";
import { Log } from "bos/exports";
import { PlayerState } from "game/room/model/Player";

export interface BankerInfo {
    bankerId?: number,
    bankerSeat?: number,
}

export class GameData extends BaseGameData {

    public initPlayer(playerNum: number) {
        Log.d("==initPlayer==", playerNum)
        this.playerList = [];
        for (let seat = 0; seat < playerNum; seat++) {
            let player = new (GamePlayer);
            player.init();
            player.localSeat = seat + 1;
            this.playerList[seat] = player;
        };
    }

    /**
     * 获取客户端登录玩家
     */
    public getMySelf(): GamePlayer {
        return this.getPlayerByLocalSeat(1);
    }

    public getAllPlayer(): Array<GamePlayer> {
        return this.playerList as Array<GamePlayer>;
    }

    /**
     * 通过玩家UID获取玩家
     */
    public getPlayerByID(uid: number): GamePlayer | null {
        for (const v of this.playerList) {
            if (v.uid == uid) {
                return v as GamePlayer;
            }
        }
        return null;
    }

    public getLocalSeatBySerSeat(seat: number): number {
        const playerMine = this.getMySelf();
        const max = this.getMaxPlayerCount();
        let offset = seat - playerMine.serverSeat;
        if (offset < 0) {
            offset = max + offset;
        }
        Log.d("==getLocalSeatBySerSeat==", seat, offset)
        return offset + 1;
    }


    /**
     * 通过服务座位号获取玩家
     */
    public getPlayerByServerSeat(serverSeatID: number): GamePlayer | null {
        for (const v of this.playerList) {
            if (v.serverSeat == serverSeatID) {
                return v as GamePlayer;
            }
        }
        return null;
    }

    /**
     * 通过本地座位号获取玩家
     */
    public getPlayerByLocalSeat(localSeat: number): GamePlayer | null {
        return this.playerList[localSeat - 1] as GamePlayer;
    }

    EventType = {
        UPDATE_SHOWED_CARDS_COLOR: "UPDATE_SHOWED_CARDS_COLOR",
        REMAIN_CHANGE: "REMAIN_CHANGE",
        BANKER_CHANGE: "BANKER_CHANGE",
        SET_TIP_CARDS: "SET_TIP_CARDS",
        OP_START: "OP_START",
        SET_TABLE_INFO: "SET_TABLE_INFO",
        SPREAD_CARDS: "SPREAD_CARDS",
        SET_DICE_INFO: "SET_DICE_INF0",
    };

    m_bankerInfo: BankerInfo; //庄家信息
    m_remainCount: number; //剩余牌张数
    m_preOpUid: number; //上次操作玩家
    m_opOption: OperateOption; //最近操作数据
    m_outCardTurn: boolean; //是否是自己出牌的轮次
    m_tipCards: number[]; //左上角提示牌信息
    m_resultData: object;
    m_cByteColorMap: object; //牌值颜色映射表
    m_cTByteColorMap: object; //牌值颜色映射表
    m_gameState: number;
    m_totalOpTime: number;
    m_waitOpInfo: { uid?: number }; // 等待玩家操作
    m_settleData: any;

    public resetGameData(isNewGame?: boolean) {
        this.m_bankerInfo = {};
        this.m_remainCount = -1;
        this.m_preOpUid = 0;
        this.m_opOption = new OperateOption({});
        this.m_outCardTurn = false;
        this.m_tipCards = [];
        this.m_resultData = null;
        this.m_cByteColorMap = new Map();
        this.m_cTByteColorMap = new Map();
        this.m_gameState = 0;
        this.m_totalOpTime = 0;
        this.m_waitOpInfo = {};
        this.m_settleData = null;
    }

    public resetPlayerData(isNewGame?: boolean) {
        for (let player of this.getAllPlayer()) {
            player.resetPlayerData(isNewGame);
        }
    }

    public setTableInfo(msg: Table) {
        let users = msg.users;

        let loginId = this.getMyID();
        for (let i = 0; i < users.length; i++) {
            let info = users[i];
            if (info.uid == loginId) {
                let player = this.getMySelf();
                player.serverSeat = info.seat;
                player.uid = info.uid;
                player.refresh();
                break;
            }
        }

        let playerList = this.getAllPlayer();
        for (let i = 0; i < users.length; i++) {
            let info = users[i];
            if (info.uid != loginId) {
                let seat = this.getLocalSeatBySerSeat(info.seat);
                playerList[seat - 1].serverSeat = info.seat;
                playerList[seat - 1].uid = info.uid;
                playerList[seat - 1].refresh();
            }
        }
        
        for (let i = 0; i < users.length; i++) {
            let v = users[i];
            let localSeat = this.getLocalSeatBySerSeat(v.seat);
            playerList[localSeat -1].setPlayerInfo(v);
            // 设置摆出的牌
            if (
                v.exposeCards != null &&
                v.exposeCards.length > 0 &&
                this.getGameState() != Constants.GAME_STATE.IsShowCards
            ) {
                for (let card of v.exposeCards) {
                    this.setCardColor(card, "#99FFFF", true);
                }
                playerList[localSeat - 1].setExposeCards({ cards: v.exposeCards }, true);
                // 通知所有玩家更新手牌

                for (let player of playerList) {
                    this.updateHandCardSortFunc(player);
                }
            }

            //设置所吃的那张牌的颜色变化
            let opGroups = v.handCard.opGroups;
            if (opGroups.length > 0) {
                for (let opGroup of opGroups) {
                    if (opGroup.opCode == OpCode.OPE_CHI) {
                        this.setCardColor(opGroup.opCard, "#E8917D", true);
                    }
                }
            }
        }

        this.setHandCardForReconnect(msg);

        if (msg.wallCnt) {
            this.setRemainCount(msg.wallCnt);
        }
        if (msg.bankerId) {
            this.setBankerInfo(msg.bankerId);
        }

        if (msg.baoCards && msg.baoCards.length > 0) {
            this.setTipCards(msg.baoCards);
        }

        if (msg.totalOpTime) {
            this.setTotalOpTime(msg.totalOpTime);
        }

        // 通知玩家更新出牌区域
        this.notifyPlayersOutCards(users);

        // 通知最近一次操作数据
        this.setLastPlayerOpt(users);

        // 通知玩家下注数据
        if (msg.betDatas) {
            this.setPlayerBetData(msg.betDatas);
        }
    }

    public setPlayerBetData(datas: BetData[], state?: number) {
        // 判断是否有玩家还未下注
        let isNoBet = false;
        for (let data of datas) {
            if (data.opt && data.opt.option == -1) {
                isNoBet = true;
                break;
            }
        }
        // 设置玩家数据
        for (let data of datas) {
            if (data.uid) {
                let player = this.getPlayerByID(data.uid);
                if (player) {
                    // 只处理自己是否等待其他玩家操作
                    if (isNoBet) {
                        if (player.getLocalSeat() == 1) { // 只处理自己
                            if (data.opt.option != -1) {
                                this.setWaitOpt({ uid: data.uid })
                            } else {
                                // 设置玩家正在操作的数据
                                this.setOpOption(new OperateOption(data));
                                // 自己还没下注时，需设置玩家数据
                                player.setBetData(data, state);
                            }
                        }
                    } else {
                        player.setBetData(data, state); // 所有玩家都下注，才设置玩家数据
                    }
                }
            }
        }
    }

    public setPlayerOpResult(msg: OperateResultInfo): void {
        // 先只传opData
        const player = this.getPlayerByID(msg.uid);
        if (player) {
            // 设置玩家操作结果
            player.setOpResult(msg);
            // 设置摆牌数据【必须放到最后进行设置，否则可能导致所摆牌的效果被改变】
            if (msg.opData.opCode === OpCode.OPE_LANG_QI) {
                for (const card of msg.opData.opCards) {
                    this.setCardColor(card, "#99FFFF", true);
                }
                player.setExposeCards({ cards: msg.opData.opCards });
                // 通知所有玩家更新手牌
                for (const player of this.getAllPlayer()) {
                    this.updateHandCardSortFunc(player);
                }
            }
            // 设置所吃的那张牌的颜色变化
            if (msg.opData.opCode === OpCode.OPE_CHI) {
                this.setCardColor(msg.opData.opCard, "#E8917D", true);
            }
        }
        // 处理宝牌数据
        const baoConfig = {
            [OpCode.OPE_FAN_BAO]: true,
            [OpCode.OPE_HUAN_BAO]: true,
            [OpCode.OPE_KAN_BAO]: true,
        };

        if (baoConfig[msg.opData.opCode]) {
            const opCards = msg.opData.opCards;
            // 看宝时特殊处理
            if (msg.opData.opCode === OpCode.OPE_KAN_BAO) {
                if (opCards && opCards.length > 0 && opCards[0] !== 0) {
                    this.setTipCards(opCards, false);
                }
            } else {
                this.setTipCards(opCards, false);
            }
        }

        // 处理分张数据
        if (msg.opData.opCode === OpCode.OPE_FEN_ZHANG) {
            this.setPlayerFenZhang(msg);
        }

        // 清掉操作数据
        this.setOpOption(new OperateOption({}));
        // 清除等待数据
        this.setWaitOpt({});
    }

    public setPlayerFenZhang(opResult: OperateResultInfo): void {
        for (const fzInfo of opResult.fzData || []) {
            const uid: number = fzInfo.uid;
            const player = this.getPlayerByID(uid);
            if (player) {
                player.addCardCount();
            }
        }
    }

    public getHuPlayers(): GamePlayer[] {
        const players = [];
        for (const player of this.getAllPlayer()) {
            const huInfos = player.getHuOpInfos() || [];
            if (huInfos.length > 0) {
                players.push(player);
            }
        }
        return players;
    }

    public getCardColor(tByte: number): string | null {
        if (this.m_cTByteColorMap[tByte]) {
            return this.m_cTByteColorMap[tByte];
        }
        tByte = tByte >> 8;
        return this.m_cByteColorMap[tByte] || null;
    }

    public setGameState(state: number): void {
        if (state) {
            this.m_gameState = state;
        }
    }

    public resetCardColor(
        val: number,
        color?: string | undefined,
        isTByte?: boolean
    ): void {
        if (isTByte) {
            this.m_cTByteColorMap[val] = undefined;
            this.emit(this.EventType.UPDATE_SHOWED_CARDS_COLOR, {
                tByte: val,
                color: color || "#ffffff",
                isNative: true,
            });
            return;
        }
        this.m_cByteColorMap[val] = undefined;
        this.emit(this.EventType.UPDATE_SHOWED_CARDS_COLOR, {
            byte: val,
            color: color || "#ffffff",
            isNative: true,
        });
    }

    public setWaitOpt(msg: { uid?: number }): void {
        let player;
        if (msg && Object.keys(msg).length !== 0) {
            player = this.getPlayerByID(msg.uid);
            this.m_waitOpInfo = msg;
        } else {
            if (Object.keys(this.m_waitOpInfo).length != 0) {
                player = this.getPlayerByID(this.m_waitOpInfo.uid);
            }
            this.m_waitOpInfo = {};
        }
        if (player) {
            player.setWaitOpt(this.m_waitOpInfo);
        }
    }

    public setOpOption(opOption: OperateOption): void {
        this.setOutCardTurn(false);

        if (opOption && Object.keys(opOption).length > 0) {
            // 轮到我能出牌时，设置m_outCardTurn
            if (opOption.uid === this.getMyID()) {
                const opInfos = opOption.opInfos || [];
                for (let i = 0; i < opInfos.length; i++) {
                    const opInfo = opInfos[i];
                    if (opInfo.opCode === OpCode.OPE_OUT_CARD) {
                        this.setOutCardTurn(true);
                        break;
                    }
                }
            }

            // 通知消息
            this.m_opOption = opOption;
            this.emit(this.EventType.OP_START, opOption);
        } else {
            this.m_opOption = new OperateOption({});
        }
    }

    public setOutCardTurn(isMyTurn: boolean) {
        this.m_outCardTurn = isMyTurn;
    }

    public setLastPlayerOpt(users: User[]) {
        // 校验操作数据
        function checkOutOpts(opts: OperateOption): [boolean, OperateOption] {
            const retOpts = {
                uid: 0,
                cardUid: 0,
                time: opts.time,
                extTime: opts.extTime,
                // enqueueTime: opts.enqueueTime,
            };
            for (const opInfo of opts.opInfos) {
                if (opInfo.opCode === OpCode.OPE_OUT_CARD) {
                    retOpts.uid = opts.uid;
                    retOpts.cardUid = opts.cardUid;
                    return [true, new OperateOption(retOpts)];
                }
            }
            return [false, new OperateOption(retOpts)];
        }

        // 获取最后的操作数据
        let lastOpts = this.getOpOption();
        for (const userInfo of users) {
            if (userInfo.opts && userInfo.opts.opInfos) {
                // if (userInfo.enqueueTime) {
                //     userInfo.opts.enqueueTime = userInfo.enqueueTime; // 更新入队时间
                // }
                if (userInfo.opts.uid === this.getMyID()) {
                    lastOpts = userInfo.opts;
                    break;
                } else {
                    // 检测待有出牌的操作数据
                    const [ret, theOpts] = checkOutOpts(userInfo.opts);
                    if (ret) {
                        lastOpts = theOpts;
                        break;
                    }
                }
            }
        }
        if (Object.keys(lastOpts).length !== 0) {
            this.setPlayerOpOption(lastOpts);
        }
    }

    public setPlayerOpOption(msg: OperateOption) {
        // 先只传操作列表
        let player = this.getPlayerByID(msg.uid);
        if (player && msg.opInfos) {
            player.setOpOption(msg);
        }

        // 保存操作数据
        this.setOpOption(msg);
        this.setPreOpUid(msg.uid);
    }

    public setPreOpUid(preOpUid: number) {
        if (preOpUid && preOpUid > 0) {
            this.m_preOpUid = preOpUid;
        }
    }

    public getOpOption(): OperateOption {
        return this.m_opOption;
    }

    public getPreOpUid(): number {
        return this.m_preOpUid;
    }

    public getTotalOpTime(): number {
        return this.m_totalOpTime;
    }

    public notifyPlayersOutCards(users: User[]) {
        const opCardMap: { [card: number]: boolean } = {};
        const playerList = this.getAllPlayer();

        for (const userInfo of users) {
            for (const opGroup of userInfo.handCard.opGroups || []) {
                for (const card of opGroup.opCards) {
                    opCardMap[card] = true;
                }
            }
            for (const huInfo of userInfo.huInfos || []) {
                opCardMap[huInfo.opCard] = true;
            }
        }

        for (const userInfo of users) {
            const outCards: number[] = [];
            for (const card of userInfo.outCards || []) {
                if (!opCardMap[card]) {
                    outCards.push(card);
                }
            }
            playerList[this.getLocalSeatBySerSeat(userInfo.seat) - 1].notifyOutCards(outCards);
        }
    }

    public setTotalOpTime(totalOpTime: number) {
        this.m_totalOpTime = totalOpTime;
    }

    // 等待玩家操作
    public getWaitOpt(): { uid?: number } {
        return this.m_waitOpInfo;
    }

    public setTipCards(opCards: number[], isNotify?: boolean) {
        // 还原颜色
        for (let card of this.m_tipCards) {
            if (card > 0) {
                this.resetCardColor(card >>> 8);
            }
        }
        // 设置数据
        this.m_tipCards = opCards;
        // 设置颜色
        // if (this.isObserving() && !this.getOBConfig().isCardShow) {
        //     this.m_tipCards = [0];
        // }

        for (let card of this.m_tipCards) {
            if (card > 0) {
                this.setCardColor(card >>> 8, "#fff497");
            }
        }

        if (isNotify) {
            this.emit(this.EventType.SET_TIP_CARDS, this.m_tipCards);
        }
    }

    public setBankerInfo(bankerId: number) {
        this.m_bankerInfo.bankerId = bankerId;
        this.m_bankerInfo.bankerSeat = this.getLocalSeatByID(bankerId);
        this.emit(this.EventType.BANKER_CHANGE, this.m_bankerInfo);
    }

    public getBankerInfo(): BankerInfo {
        return this.m_bankerInfo;
    }

    public getRemainCount(): number {
        return this.m_remainCount;
    }

    public setRemainCount(wallCnt: number) {
        this.m_remainCount = wallCnt;
        this.emit(this.EventType.REMAIN_CHANGE, wallCnt);
    }

    public setDiceInfo(diceInfo: DiceInfo) {
        this.emit(this.EventType.SET_DICE_INFO, diceInfo);
    }

    public updateHandCardSortFunc(player: GamePlayer) {
        // 排序摆出的牌
        let exCardMap = {};
        for (let card of player.getExposeCards()) {
            exCardMap[card] = true;
        }
        // 更新手牌排序方法
        player.updateHandCardSortFunc()
    }

    public setCardColor(val: number, color: string, isTByte?: boolean) {
        if (isTByte) {
            this.m_cTByteColorMap[val] = color;
            let data = { tByte: val, color: color, isNative: true };
            this.emit(this.EventType.UPDATE_SHOWED_CARDS_COLOR, data);
            return;
        }
        this.m_cByteColorMap[val] = color;
        let data = { byte: val, color: color, isNative: true };
        this.emit(this.EventType.UPDATE_SHOWED_CARDS_COLOR, data);
    }

    public getGameState(): number {
        return this.m_gameState || 0;
    }

    public setHandCardForReconnect(msg: Table) {
        //重连将玩家手牌重置
        let isReconnect = true;
        let state = this.getGameState();
        if (msg.users && msg.users.length > 0) {
            for (var userInfo of msg.users) {
                let player = this.getPlayerByID(userInfo.uid);
                if (state == Constants.GAME_STATE.IsShowCards) {
                    // 已摊牌
                    player.setSpreadCards(userInfo.handCard);
                    // 更新手牌排序
                    this.updateHandCardSortFunc(player);
                } else {
                    if (player.getLocalSeat() == 1 && userInfo.handCard.cards != null) {
                        if (userInfo.handCard.lastCard != null && userInfo.handCard.lastCard > 0) {
                            player.setLastCard(userInfo.handCard.lastCard);
                        }
                        player.setCards(userInfo.handCard.cards, isReconnect);
                    }
                    else {
                        player.setCardCount(userInfo.handCard.cards.length > 0 ? userInfo.handCard.cards.length : 0, isReconnect);
                    }
                }
            }
        }
    }

    public setPlayerSpreadCards(msg: HandCards): void {
        // 处理宝牌数据
        if (msg.baoCards && msg.baoCards.length > 0) {
            this.setTipCards(msg.baoCards);
        }

        for (let i = 0; i < msg.handCards.length; i++) {
            const handCard = msg.handCards[i];
            const player = this.getPlayerByID(handCard.uid);
            if (player) {
                player.setSpreadCards(handCard);
            }
        }

        // 通知事件
        this.emit(this.EventType.SPREAD_CARDS, msg);
    }

    public setPlayerAiStatus(msg: MsgManaged, isReset?: boolean): void {
        if (isReset) {
            const playerList = this.getAllPlayer();
            for (let i = 0; i < playerList.length; i++) {
                const player = playerList[i];
                player.setAiStatus({ isAI: false, uid: player.uid });
            }
        } else {
            const player = this.getPlayerByID(msg.uid);
            if (player) {
                player.setAiStatus({ isAI: msg.isManaged, uid: msg.uid });
            }
        }
    }

    public clearPlayerOpOption(): void {
        const players = this.getAllPlayer();
        for (let i = 0; i < players.length; i++) {
            const player = players[i];
            player.clearOpOption();
        }
    }

    public getOutCardTurn(): boolean {
        return this.m_outCardTurn;
    }

    public setSettleData(settleData: any): void {
        this.m_settleData = settleData;
    }

    public getSettleData(): any {
        return this.m_settleData;
    }

    public setResultData(resultData: any): void {
        this.m_resultData = resultData;
    }

    public getResultData(): any {
        return this.m_resultData;
    }

    public getTipCards(): number[] {
        return this.m_tipCards;
    }

    //退出游戏时调用，清除数据
    release() {
        Log.d("=mahjong gameData=release==")
        super.release();
        this.m_opOption = null;
        this.m_cByteColorMap = null;
        this.m_cTByteColorMap = null;
        for (let player of this.getAllPlayer()) {
            player.release();
        }
    }
}

import { Player as BasePlayer, PlayerState } from "game/room/model/Player";
import { Log } from "bos/exports";
import { IBornCardInfo, IFollowCardInfo, IOptionList, IPutCardInfo, MsgUserScoreChange, OpResult } from "game/dummy/idl/tss/thailand/dummy";

export class GamePlayer extends BasePlayer {

    m_cards: number[]; //手牌
    m_count: number;
    m_outCards: number[]; //弃牌
    m_popupCards: number[]; //点起的手牌，只有“我”会赋值
    m_followInfo: IFollowCardInfo[]; //存牌
    m_bornInfo: IBornCardInfo[];  //生牌
    m_putInfo: IPutCardInfo[];  //下牌
    m_score: number; //玩家分数
    m_opCodes: number[];
    m_options: IOptionList;

    EventType = {
        PLAYER_CARDS_CHANGE: "PLAYER_CARDS_CHANGE",
    };

    public init(): void {
        this.resetPlayerData();
    }

    public resetPlayerData(isNewGame?: boolean): void {
        this.m_cards = [];
        this.m_count = 0;
        this.m_outCards = [];
        this.m_popupCards = [];
        this.m_followInfo = [];
        this.m_bornInfo = [];
        this.m_putInfo = [];
        this.m_score = 0;
        this.m_opCodes = [];
        this.m_options = {};
        this.state = PlayerState.Default;
    }

    setCards(m_cards: number[]) {
        this.m_cards = m_cards;
        this.emit(this.EventType.PLAYER_CARDS_CHANGE);
    }

    setCardCount(count: number) {
        this.m_count = count;
        this.emit(this.EventType.PLAYER_CARDS_CHANGE);
    }

    addCard(card: number) {
        this.m_cards.push(card);
        this.emit(this.EventType.PLAYER_CARDS_CHANGE);
    }

    addCardCount(increment?: number): void {
        if (increment != null) {
            this.m_count += increment;
        }
    }

    removeCards(m_cards: number[]) {
        for (let index = 0; index < m_cards.length; index++) {
            let card = m_cards[index];
            for (let i = this.m_cards.length - 1; i >= 0; i--) {
                if (this.m_cards[i] === card) {
                    this.m_cards.splice(i, 1);
                    break;
                }
            }
        }
        if (this.m_count > 0) {
            this.m_count = this.m_count - m_cards.length;
        }
        this.emit(this.EventType.PLAYER_CARDS_CHANGE);
    }

    getCards() {
        return this.m_cards;
    }

    getCardCount(): number {
        return this.m_count;
    }

    addPopupCard(card: number) {
        this.m_popupCards.push(card);
    }

    removePopupCard(card: number) {
        for (let i = this.m_popupCards.length - 1; i >= 0; i--) {
            if (this.m_popupCards[i] === card) {
                this.m_popupCards.splice(i, 1);
                break;
            }
        }
    }

    resetPopupCards() {
        this.m_popupCards = [];
    }

    getPopupCards() {
        return this.m_popupCards;
    }


    setOpResult(msg: OpResult) {
        if (msg.born_card_info) {
            this.addBorn(msg.born_card_info);
        } else if (msg.follow_card_info) {
            this.addFollow(msg.follow_card_info);
        } else if (msg.put_card_info) {
            this.addPut(msg.put_card_info);
        }
    }

    addFollow(info: IFollowCardInfo) {
        this.m_followInfo.push(info);
    }

    getFollow() {
        return this.m_followInfo;
    }

    addBorn(info: IBornCardInfo) {
        this.m_bornInfo.push(info);
    }

    getBorn() {
        return this.m_bornInfo;
    }

    addPut(info: IPutCardInfo) {
        this.m_putInfo.push(info);
    }

    getPut() {
        return this.m_putInfo;
    }

    setScoreChange(change: MsgUserScoreChange) {
        this.m_score = change.score;
    }

    setOpCodes(codes?: number[]) {
        if (codes) {
            this.m_opCodes = codes;
        } else {
            this.m_opCodes = [];
        }
    }

    setOptions(m_options?: IOptionList) {
        if (m_options) {
            this.m_options = m_options;
        } else {
            this.m_options = {};
        }
    }

}

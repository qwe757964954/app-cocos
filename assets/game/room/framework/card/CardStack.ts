import { Card } from "./Card";


export const defaultResolver = {
    getSortValue(card: Card): number {
        return card.value * 10 + card.color
    },
    getLogicValue(card: Card): number {
        return card.value;
    },
    getLogicColor(card: Card): number {
        return card.color
    },
}

interface CardResolver {
    getSortValue(card: Card): number;
    getLogicValue(card: Card): number;
    getLogicColor(card: Card): number;
}

type CardStackParams = {
    resolver?: CardResolver;
    bytes?: Array<number>;
    cards?: Array<Card>;
}

export class CardStack {
    public m_resolver = defaultResolver;
    private m_cards: Array<Card> = [];
    private m_byteCnt: Map<number, number> = new Map<number, number>();
    private m_valueNum: Map<number, number> = new Map<number, number>();
    private m_valueCards: Map<number, Array<Card>> = new Map<number, Array<Card>>();
    private m_cntValue: Map<number, Array<number>> = new Map<number, Array<number>>();
    
    constructor(params: CardStackParams = {}) {
        this.resetCache()
        if (params.resolver) {
            this.m_resolver = params.resolver;
        }
        if (params.bytes) {
            this.addBytes(params.bytes);
        } else if (params.cards) {
            this.addCards(params.cards);
        }
    }

    getValueCardsMap(cards: Array<Card>): Map<number, Array<Card>> {
        let valueCards = new Map<number, Array<Card>>();
        for(const v of cards) {
            if(valueCards.has(v.value)) {
                valueCards.get(v.value).push(v);
            } else {
                valueCards.set(v.value, new Array<Card>(v));
            }
        }
        return valueCards;
    }

    getValueNumberMap(cards: Array<Card>): Map<number, number> {
        let valueNum = new Map<number, number>();
        for(const v of cards) {
            valueNum.set(v.value, (valueNum.get(v.value) || 0) + 1)
        }
        return valueNum;
    }

    getByteCountMap(cards: Array<Card>): Map<number, number> {
        let bytes = new Map<number, number>();
        for(const v of cards) {
            bytes.set(v.byte, (bytes.get(v.byte) || 0) + 1)
        }
        return bytes;
    }

    getCountValueMap(cards: Array<Card>): Map<number, Array<number>> {
        let valCnt = this.getValueNumberMap(cards);
        let cntVal = new Map<number, Array<number>>();
        for (let i = 3; i <= 17; i++) {
            const cnt = valCnt.get(i);
            if (cnt) {
                if (cntVal.has(cnt)) {
                    cntVal.get(cnt).push(i);
                } else {
                    cntVal.set(cnt, new Array<number>(i));
                }
            }
        }
        return cntVal;
    }

    getCardList(isCopy?: boolean): Array<Card> {
        return isCopy && [...this.m_cards] || this.m_cards;
    }

    getCardBytes(): Array<number> {
        let arr = new Array<number>();
        for(const v of this.m_cards) {
            arr.push(v.byte);
        }
        return arr;
    }

    reset() {
        this.resetCache();
        this.m_cards = [];
    }

    getCardNum(): number {
        return this.m_cards.length;
    }

    get maxCard(): Card {
        return this.m_cards[this.getCardNum() - 1];
    }

    get minCard(): Card {
        return this.m_cards[0];
    }

    addBytes(bytes: Array<number>) {
        for(const v of bytes) {
            this.m_cards.push(new Card(v))
        }
        this.resetCache()
        this.sortCards()
    }

    addCards(cards: Array<Card>) {
        this.m_cards = this.m_cards.concat(cards)
        this.resetCache()
        this.sortCards()
    }

    removeCards(cards: Array<Card>) {
        let i = 0;
        let byteCnt: Map<number, number> = this.getByteCountMap(cards);
        while (i < this.m_cards.length) {
            let v = this.m_cards[i];
            let cnt = byteCnt.get(v.byte)
            if (cnt && cnt > 0) {
                byteCnt.set(v.byte, cnt - 1);
                this.m_cards.splice(i, 1)
            } else {
                i += 1;
            }
        }
        this.resetCache()
    }

    removeCard(card: Card) {
        for (let i = 0; i < this.m_cards.length; i++) {
            if (this.m_cards[i].byte == card.byte) {
                this.m_cards.splice(i, 1)
                break
            }
        }
        this.resetCache()
    }

    removeBytes(bytes: Array<number>) {
        for(const v of bytes) {
            for (let i = 0; i < this.m_cards.length; i++) {
                if (v == this.m_cards[i].byte) {
                    this.m_cards.splice(i, 1)
                    break;
                }
            }
        }
        this.resetCache()
    }

    removeByte(byte: number) {
        for (let i = 0; i < this.m_cards.length; i++) {
            if (byte == this.m_cards[i].byte) {
                this.m_cards.splice(i, 1)
                break;
            }
        }
        this.resetCache()
    }

    resetCache() {
        this.m_byteCnt = null;
        this.m_cntValue = null;
        this.m_valueNum = null;
        this.m_valueCards = null;
    }

    sortCards() {
        this.m_cards.sort((a, b):number=>{
            return this.m_resolver.getSortValue(a) - this.m_resolver.getSortValue(b)
        })
    }

    getCardNumByValue(value: number): number {
        if (!this.m_valueNum) {
            this.m_valueNum = this.getValueNumberMap(this.m_cards);
        }
        return this.m_valueNum.get(value) || 0;
    }

    getCardsByValue(value: number): Array<Card> {
        if (!this.m_valueCards) {
            this.m_valueCards = this.getValueCardsMap(this.m_cards);
        }
        return this.m_valueCards.get(value);
    }

    getValuesByCount(cnt: number) {
        if (!this.m_cntValue) {
            this.m_cntValue = this.getCountValueMap(this.m_cards);
        }
        return this.m_cntValue.get(cnt);
    }

    clone() {
        return new CardStack({
            cards: this.m_cards,
            resolver: this.m_resolver,
        });
    }

    checkBytes(bytes: Array<number>): boolean {
        if (this.getCardNum() < bytes.length) {
            return false;
        }
        if (!this.m_byteCnt) {
            this.m_byteCnt = this.getByteCountMap(this.m_cards);
        }
        let byteCnt = new Map<number, number>();
        for(const v of bytes) {
            let value = v > 0xff ? (v >> 8) : v;
            byteCnt.set(value, byteCnt.get(value || 0) + 1);
        }
        for (const [k, v] of byteCnt) {
            if (this.m_byteCnt.get(k) < v) {
                return false;
            }
        }
        return true;
    }

    getCountByByte(byte: number): number {
        if (!this.m_byteCnt) {
            this.m_byteCnt = this.getByteCountMap(this.m_cards);
        }
        return this.m_byteCnt.get(byte) || 0;
    }
    
    toString(): string {
        let t = [];
        this.m_cards.forEach(c => t.push(c.toString()));
        return t.join(",");
    }
}
import { Card, CardConst } from "../Card";
import { CardDelegate, CardHandler, HandleParams } from "../CardEngine";
import { CardInfo } from "../CardInfo";
import { CardStack } from "../CardStack";

//TODO:暂时只考虑常规牌点大小
export class Line implements CardHandler {
    private sameCnt: number;
    private lineCnt: number;
    private valSeqs: number[][];
    public id: number;

    constructor() {
        this.sameCnt = 0; //同点数张数
        this.lineCnt = 0; //最小连张数量
        this.valSeqs = []; //相邻牌点
    }

    public init(id: number, args: string[]): void {
        this.id = id
        
        let [sameCntStr, lineCntStr, valSeqStr] = args
        this.sameCnt = parseInt(sameCntStr, 10);
        this.lineCnt = parseInt(lineCntStr, 10);
        // 3-4-5-6-7-8-9-10-J-Q-K-A-2 / A-2-3-4-5-6-7-8-9-10-J-Q
        const lineArr = valSeqStr.split('/');
        this.valSeqs = new Array(lineArr.length);
        for (let i = 0; i < lineArr.length; i++) {
            const valArr = lineArr[i].split('-');
            this.valSeqs[i] = new Array(valArr.length);
            for (let j = 0; j < valArr.length; j++) {
                this.valSeqs[i][j] = CardConst.STR2VAL[valArr[j]];
            }
        }
        console.log("Line.init", this.id, this.sameCnt, this.lineCnt, this.valSeqs, args)
    }

    public check(stack: CardStack, delegate: CardDelegate, params: HandleParams): CardInfo {
        if (stack.getCardNum() < this.sameCnt * this.lineCnt) {
            return null
        }
        if (stack.getCardNum() % this.sameCnt !== 0) {
            return null
        }
        const length = stack.getCardNum() / this.sameCnt;
        for (const seq of this.valSeqs) {
            const t = this.findFromIndex(stack, seq, 0, length);
            if (t && t.cards.length === stack.getCardNum()) {
                return t
            }
        }
        return null
    }

    public compare(s1: CardInfo, s2: CardInfo, delegate: CardDelegate): number {
        if (s1.cards.length !== s2.cards.length) {
            return -1;
        }
        if (s1.value > s2.value) {
            return 1;
        } else if (s1.value === s2.value) {
            return 0;
        } else {
            return -1;
        }
    }

    public find(srcCards: CardStack, delegate: CardDelegate, params: HandleParams): CardInfo {
        if (srcCards.getCardNum() === 0) {
            return null;
        }

        if (params.target && params.target.type === this.id) {
            return this.findGreater(srcCards, params.target);
        } else {
            return this.findAny(srcCards, params.length);
        }
    }

    private findAny(srcCards: CardStack, length: number): CardInfo {
        for (const v of this.valSeqs) {
            const result = this.findFromIndex(srcCards, v, 0, length);
            if (result !== null) {
                return result;
            }
        }
        return null;
    }

    private findGreater(srcCards: CardStack, target: CardInfo): CardInfo {
        const length = target.cards.length / this.sameCnt;
        for (const valSeq of this.valSeqs) {
            let start = -1;
            for (let i = 0; i <= valSeq.length - length; i++) {
                const tail = i + length - 1;
                if (valSeq[tail] > target.value) {
                    start = i;
                    break;
                }
            }
            if (start >= 0) {
                const result = this.findFromIndex(srcCards, valSeq, start, length)
                if (result) {
                    return result
                }
            }
        }
    }

    private findFromIndex(srcCards: CardStack, valSeq: number[], start: number, length: number): CardInfo {
        let outCards = [];
        let outIndex = 0;
        let lineCnt = 0;
        let ok = false
        for (let i = start; i < valSeq.length; i++) {
            const val = valSeq[i];
            const cards = srcCards.getCardsByValue(val);
            // console.log("findFromIndex", i, val, cards, srcCards, this)
            if (!cards || cards.length < this.sameCnt) {
                ok = (length > 0 && lineCnt === length) || (length === 0 && lineCnt >= this.lineCnt)
                if (ok) {
                    break;
                }
                lineCnt = 0;
                outIndex = 0;
                outCards = []
            } else {
                lineCnt++;
                outCards.push(...cards.slice(0, this.sameCnt));
                outIndex += this.sameCnt;
                if (length > 0 && lineCnt === length) {
                    break;
                }
            }
        }
        ok = ok || (length > 0 && lineCnt === length) || (length === 0 && lineCnt >= this.lineCnt)
        if (ok) {
            return new CardInfo({
                type: this.id,
                value: outCards[outCards.length - 1].value,
                cards: outCards.slice(0, outIndex),
            });
        }
        return null;
    }
}

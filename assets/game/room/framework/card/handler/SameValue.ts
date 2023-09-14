import { Log } from "bos/exports";
import { Card } from "../Card";
import { CardDelegate, CardHandler, HandleParams } from "../CardEngine";
import { CardInfo } from "../CardInfo";
import { CardStack } from "../CardStack";

export class SameValue implements CardHandler {
    id: number;
    num: number;
    minNum: number; //最少x张癞子牌
    maxNum: number; //最多x张癞子牌

    init(id: number, args: string[]): void {
        console.log("SameValue.init", args)
        this.id = id
        this.num = parseInt(args[0], 10)
        args[1] && (this.minNum = parseInt(args[1], 10))
        args[2] && (this.maxNum = parseInt(args[2], 10))
    }

    check(srcCards: CardStack, delegate: CardDelegate, params: HandleParams): CardInfo {
        //TODO: 癞子处理
        if (this.minNum > 0) {
            return null
        }
        if (srcCards.getCardNum() != this.num) {
            return null
        }
        if (srcCards.minCard.value != srcCards.maxCard.value) {
            return null
        }
        return new CardInfo({
            type: this.id,
            value: srcCards.minCard.value,
            cards: srcCards.getCardList()
        })
    }

    find(srcCards: CardStack, delegate: CardDelegate, params: HandleParams): CardInfo {
        //TODO: 癞子处理
        if (this.minNum > 0) {
            return null
        }

        if (srcCards.getCardNum() < this.num) {
            return null;
        }
        let val: number;
        if (params.target && params.target.type === this.id) {
            val = params.target.value + 1;
        } else {
            val = delegate.getLogicValue(srcCards.minCard);
        }

        return this.findFrom(srcCards, val, delegate);
    }

    compare(m1: CardInfo, m2: CardInfo, delegate: CardDelegate): number {
        if (m1.value === m2.value) {
            return 0;
        } else if (m1.value > m2.value) {
            return 1;
        } else {
            return -1;
        }
    }

    findFrom(srcCards: CardStack, value: number, delegate: CardDelegate): CardInfo | null {
        if (value > delegate.getLogicValue(srcCards.maxCard)) {
            return null;
        }
        let list = srcCards.getCardList()
        let prevVal = 0;
        let startIdx = -1;
        let endIdx = 0;
        for (let i = 0; i < list.length; i++) {
            const card = list[i];
            const val = delegate.getLogicValue(card);
            if (val < value) {
                continue;
            }
            if (prevVal === 0 || val !== prevVal) {
                startIdx = i;
                prevVal = val;
            }
            if (i - startIdx + 1 === this.num) {
                endIdx = i;
                break;
            }
        }
        // Log.d("SameValue.findFrom...", list, startIdx, endIdx, value, this.num)
        if (startIdx >= 0 && endIdx - startIdx + 1 === this.num) {
            const result: Card[] = list.slice(startIdx, endIdx + 1);
            return new CardInfo({
                type: this.id,
                value: prevVal,
                cards: result,
            });
        }
        return null;
    }
}
import { Log } from "bos/exports";
import { Card, CardConst } from "../Card";
import { CardDelegate, CardHandler, HandleParams } from "../CardEngine";
import { CardInfo } from "../CardInfo";
import { CardStack } from "../CardStack";

export class Rocket implements CardHandler {
    id: number
    sameCnt: number;

    constructor() {
        this.sameCnt = 0;
    }

    // 参数为 1 表示王炸，2 表示双王炸
    init(id: number, args: any[]): void {
        this.id = id
        this.sameCnt = parseInt(args[0], 10);
        Log.i("Rocket.init", id, this.sameCnt, args)
    }

    check(srcCards: CardStack, delegate: CardDelegate, params: HandleParams): CardInfo|null {
        if (srcCards.getCardNum() !== this.sameCnt * 2) {
            return null
        }

        let ok = true;
        srcCards.getCardList().every((v, i)=>{
            if (i <= this.sameCnt - 1 && v.byte !== CardConst.BYTES.BJ) {
                ok = false;
                return false
            } else if (this.sameCnt <= i && i <= this.sameCnt * 2 - 1 && v.byte !== CardConst.BYTES.RJ) {
                ok = false;
                return false
            }
            return true
        })

        if (ok) {
            return new CardInfo({
                type: this.id,
                value: delegate.getLogicValue(srcCards.minCard),
                cards: srcCards.getCardList()
            })
        } else {
            return null
        }
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

    find(srcCards: CardStack, delegate: CardDelegate, params: HandleParams): CardInfo | null {
        if (params.target) {
            return null
        }

        const bjCards = srcCards.getCardsByValue(CardConst.VALUES.BJ);
        const rjCards = srcCards.getCardsByValue(CardConst.VALUES.RJ);

        if (bjCards?.length >= this.sameCnt && rjCards?.length >= this.sameCnt) {
            let cards = [];
            cards.push(...bjCards.slice(0, this.sameCnt));
            cards.push(...rjCards.slice(0, this.sameCnt));
            return new CardInfo({
                type: this.id,
                value: delegate.getLogicValue(cards[0]),
                cards: cards,
            })
        }

        return null;
    }
}

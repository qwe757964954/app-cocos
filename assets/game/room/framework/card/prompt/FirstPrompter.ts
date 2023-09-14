import { CardConst } from "../Card";
import { CardDelegate, CardPrompter, PromptDelegate, PromptParams } from "../CardEngine";
import { CardInfo } from "../CardInfo";
import { CardStack } from "../CardStack";

export class FirstPrompter implements CardPrompter {
    *getPrompts(delegate: PromptDelegate, params: PromptParams): IterableIterator<CardInfo> {
        for (let val = CardConst.VALUES.MIN; val <= CardConst.VALUES.MAX; val++) {
            let t = params.cards.getCardsByValue(val)
            if (t) {
                let tmp = new CardStack({
                    resolver: delegate,
                    cards: t,
                })
                let result = delegate.checkCardInfo(tmp)
                yield result
            }
        }
    }
}
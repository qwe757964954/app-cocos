import { Log } from "bos/exports";
import { CardDelegate, CardPrompter, PromptDelegate, PromptParams } from "../CardEngine";
import { CardInfo } from "../CardInfo";
import { CardStack } from "../CardStack";

export class FollowPrompter implements CardPrompter {
    *getPrompts(delegate: PromptDelegate, params: PromptParams): IterableIterator<CardInfo> {
        let srcCards = params.cards
        let flag = undefined
        let target = params.target
        while (true) {
            // Log.d("FollowPrompter.getPrompts", target)
            let t = delegate.findGreaterCards(srcCards, target, params)
            // Log.d("FollowPrompter.getPrompts.result", t)
            if (t) {
                flag = true
                yield t
                target = t
                // Log.d("FollowPrompter.getPrompts.yield", target)
            } else {
                break
            }
        }
        if (!flag) {
            yield null
        }
    }
}
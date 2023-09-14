import { Log } from "bos/exports";
import { Card } from "./Card";
import { CardInfo } from "./CardInfo";
import { CardStack } from "./CardStack";

export interface CardPrompter {
    getPrompts(delegate: PromptDelegate, params: PromptParams): IterableIterator<CardInfo>
}

export interface PromptDelegate extends CardDelegate {
    checkCardInfo(stack: CardStack, params?: HandleParams) : CardInfo
    getGreaterCardTypes(type: number):number[]
    getHandler(type: number):CardHandler
    findGreaterCards(src: CardStack, target: CardInfo, params?: HandleParams) : CardInfo
}

export interface CardDelegate {
    getLogicValue(card: Card): number
    getLogicColor(card: Card): number
    getSortValue(card: Card): number
}

export interface HandleParams {
    target?: CardInfo
    order?: number
    length?: number
    unitNums?: number[]
    lzCards?: Card[]
    value?: number
    excludes?: number[]
}

export interface PromptParams extends HandleParams {
    cards: CardStack
    excludes?: number[]
}

export interface CardHandler {
    init(id: number, args: any[]): void
    check(srcCards: CardStack, delegate: CardDelegate, params: HandleParams): CardInfo | null
    find(srcCards: CardStack, delegate: CardDelegate, params: HandleParams): CardInfo | null
    compare(m1: CardInfo, m2: CardInfo, delegate: CardDelegate): number
}

type CardTypeItem = {
    type?: number
    args?: any[]
}

type CardConfig = {
    types: CardTypeItem[]
    compare: string[]
}

class CardEngine implements CardDelegate {
    private firstPrompters: CardPrompter[];
    private followPrompters: CardPrompter[];
    private delegate: CardDelegate;
    private config: CardConfig;
    private handlerInfo = new Map<number, CardHandler>();
    private handlers = new Map<number, CardHandler>();
    private greaterTypes = new Map<number, number[]>();
    private cardTypes: number[];

    constructor() { }

    init(data: any) {
        this.delegate = data.delegate;
        this.firstPrompters = data.firstPrompters;
        this.followPrompters = data.followPrompters;
    }

    getLogicValue(card: Card): number {
        return card.value
    }
    
    getLogicColor(card: Card): number {
        return card.color
    }
    
    getSortValue(card: Card): number {
        return card.value * 10 + card.color
    }

    registerCardType(type:number, handler: CardHandler) {
        this.handlerInfo.set(type, handler);
    }

    loadConfig(cfg: CardConfig) {
        this.cardTypes = [];
        this.greaterTypes = new Map();
        cfg.types.forEach((e) => {
            let handler = this.handlerInfo.get(e.type);
            if (handler) {
                handler.init(e.type, e.args)
                this.greaterTypes.set(e.type, []);
                this.cardTypes.push(e.type);
            }
        });

        // 解析牌型大小关系
        // {"13>1/2/3/4/5/6/7/9/10/11/12/14/15", "16>1/2/3/4/5/6/7/9/10/11/12/14/15"}
        for (const sizeStr of cfg.compare) {
            const sizeArr = sizeStr.split(">");
            const idArr: number[][] = new Array(sizeArr.length);
            for (let i = 0; i < sizeArr.length; i++) {
                const arr = sizeArr[i].split("/");
                idArr[i] = new Array(arr.length);
                for (let j = 0; j < arr.length; j++) {
                    idArr[i][j] = parseInt(arr[j], 10);
                }
            }
            // Log.d("CardEngine.loadConfig...compare", sizeStr, idArr)
            for (let i = 1; i < idArr.length; i++) {
                for (let j = i - 1; j >= 0; j--) {
                    for (const v1 of idArr[i]) {
                        if (!this.greaterTypes.has(v1)) {
                            this.greaterTypes.set(v1, []);
                        }
                        this.greaterTypes.get(v1).push(...idArr[j]);
                    }
                }
            }
        }
        Log.i("CardEngine.loadConfig...", this.cardTypes, this.greaterTypes, cfg)
    }

    checkCardInfo(stack: CardStack, params?: HandleParams) {
        if (params && params.lzCards.length > 0) {
            for (const ct of this.cardTypes) {
                if (params.excludes.find((e) => { return e == ct })) {
                    continue;
                }
                const t = this.handlerInfo.get(ct);
                const result = t.find(stack, this, params);
                if (
                    result !== null &&
                    result.cards?.length === stack.getCardNum()
                ) {
                    return result;
                }
            }
        } else {
            for (const ct of this.cardTypes) {
                if (params && params.excludes.find((e) => { return e == ct })) {
                    continue;
                }
                const t = this.handlerInfo.get(ct);
                const result = t.check(stack, this, params);
                if (result) {
                    return result;
                }
            }
        }
        return null;
    }

    compareCardInfo(t1: CardInfo, t2: CardInfo) {
        if (t1.type === t2.type) {
            const handler = this.handlerInfo.get(t1.type);
            return handler.compare(t1, t2, this);
        }
        for (const v of this.greaterTypes.get(t1.type)) {
            if (v === t2.type) {
                return -1;
            }
        }
        for (const v of this.greaterTypes.get(t2.type)) {
            if (v === t1.type) {
                return 1;
            }
        }
        return 0;
    }

    *getPrompts(params: PromptParams) : IterableIterator<CardInfo> {
        let prompters = params.target ? this.followPrompters : this.firstPrompters
        Log.d("getPrompts...", params.target);
        for (let i = 0; i < prompters.length; i++) {
            let t = prompters[i].getPrompts(this, params);
            let result = t.next();
            while(!result.done) {
                yield result.value
                result = t.next();
            }
        }
    }

    getGreaterCardTypes(type: number) {
        return this.greaterTypes.get(type)
    }

    getHandler(type: number) {
        return this.handlerInfo.get(type)
    }

    findGreaterCards(src: CardStack, target: CardInfo, params: HandleParams) {
        let tmp = Object.assign({}, params)
        tmp.target = target
        let handler = this.getHandler(target.type)
        let t = handler?.find(src, this, tmp)
        if (t) {
            Log.d("CardEngine.findGreaterCards.same", target, t)
            return t
        }
        tmp.target = undefined
        let greaterTypes = this.getGreaterCardTypes(target.type)
        Log.d("CardEngine.findGreaterCards...", target, greaterTypes)
        for(let i = 0; i < greaterTypes.length; i++) {
            let handler = this.getHandler(greaterTypes[i])
            let t = handler?.find(src, this, tmp)
            Log.d("CardEngine.findGreaterCards.greater", target, t)
            if (t) {
                return t
            }
        }
    }
}

export { CardEngine }
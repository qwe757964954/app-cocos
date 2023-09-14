import { Card, CardConst } from "../Card";
import { CardDelegate, CardHandler, HandleParams } from "../CardEngine";
import { CardInfo } from "../CardInfo";
import { CardStack } from "../CardStack";

export class ComposeCards implements CardHandler {
    private cnt1: number;
    private cnt2: number;
    private cnt2Num: number;
    private isLine: boolean;
    private maxNum: number;
    id: number;

    public init(id: number, args: any[]): void {
        this.id = id
        
        this.cnt1 = parseInt(args[0]);
        this.cnt2 = parseInt(args[1]);
        this.cnt2Num = parseInt(args[2]);
        this.isLine = args[3] === "true";

        //todo: 先写死同点数的牌最多不超过4张
        this.maxNum = 4;
        console.log("Compose.init", this.id, this.cnt1, this.cnt2, this.cnt2Num, this.isLine, args)
    }

    public check(stack: CardStack, delegate: CardDelegate, params: HandleParams): CardInfo|null {
        const length = Math.floor(stack.getCardNum() / (this.cnt1 + this.cnt2 * this.cnt2Num));
        if ((this.isLine && length <= 1) || (!this.isLine && length > 1)) {
            return null
        }

        const t = this.findByLength(stack, stack.minCard.value, length);
        if (t && t.cards.length === stack.getCardNum()) {
            return t
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
    public find(stack: CardStack, delegate: CardDelegate, params: HandleParams): CardInfo {
        if (stack.getCardNum() === 0) {
            return null;
        }
        if (params.target === null || params.target.type !== this.id) {
            return this.findAny(stack, delegate);
        } else {
            return this.findGreater(stack, params.target, delegate);
        }
    }

    private findAny(src: CardStack, delegate: CardDelegate): CardInfo {
        let length = 1;
        if (this.isLine) {
            length = 2;
        }
        return this.findByLength(src, src.minCard.value, length);
    }

    private findGreater(src: CardStack, target: CardInfo, delegate: CardDelegate): CardInfo {
        let length = 1;
        if (this.isLine) {
            length = Math.floor(target.cards.length / (this.cnt1 + this.cnt2 * this.cnt2Num));
        }
        return this.findByLength(src, target.value + 1, length);
    }

    private findByLength(src: CardStack, start: number, lineLen: number): CardInfo {
        const valNums = [];
        const usedVals = [];
        for (let val = CardConst.VALUES.MIN; val <= CardConst.VALUES.MAX; val++) {
            valNums[val] = src.getCardNumByValue(val)
            usedVals[val] = 0
        }

        //这里为了区别最大连到A或者2
        let max: number;
        if (lineLen === 1) {
            max = CardConst.VALUES.TWO;
        } else {
            max = CardConst.VALUES.A - lineLen + 1;
        }

        for (let i = start; i <= max; i++) {
            let length = 0;
            for (let j = 0; j < lineLen; j++) {
                if (valNums[i + j] < this.cnt1) {
                    break;
                }
                usedVals[i + j] += this.cnt1;
                length++;
            }
            // console.log("ComposeCards.find", i, length, lineLen, valNums, usedVals)
            if (length === lineLen) {
                let ok = this.getOtherCards(valNums, usedVals, lineLen)
                // console.log("ComposeCards.find.getOtherCards", i, ok, usedVals)
                if (ok) {
                    return new CardInfo({
                        type: this.id,
                        value: i + lineLen - 1,
                        cards: this.composeCards(src, usedVals, i, lineLen),
                    });
                }
            }
            //组牌失败数量回滚
            usedVals.forEach((v, i)=>{
                usedVals[i] = 0
            })
        }

        return null;
    }
    
    private getOtherCards(valNums: number[], usedVals: number[], lineLen: number): boolean {
        const cnt2 = this.cnt2;
        const cnt2Num = this.cnt2Num;
        let totalNum = cnt2 * cnt2Num * lineLen;
        for (let num = cnt2; num <= this.maxNum; num++) {
            for (let val = CardConst.VALUES.MIN; val <= CardConst.VALUES.MAX; val++) {
                // 刚刚好张数
                if ((valNums[val] - usedVals[val]) !== num) {
                    continue;
                }
                // 禁止将大小王同时带出去
                if (val === CardConst.VALUES.RJ && usedVals[CardConst.VALUES.BJ] > 0) {
                    continue;
                }
                // 小于maxNum避免带了4张同样的牌
                while (totalNum > 0 && valNums[val] - usedVals[val] >= cnt2 && usedVals[val] + cnt2 < this.maxNum) {
                    usedVals[val] += cnt2;
                    totalNum -= cnt2;
                    // console.log("Compose.getOtherCards...", val, usedVals)
                }
                if (totalNum === 0) {
                    return true;
                }
            }
        }
        return totalNum == 0;
    }
    
    private composeCards(src: CardStack, usedVals: number[], start: number, lineLen: number): Card[] {
        let result = []
        for (let val = CardConst.VALUES.MIN; val <= CardConst.VALUES.MAX; val++) {
            const num = usedVals[val]
            if (num > 0) {
                const cards = src.getCardsByValue(val);
                result.push(...cards.slice(0, num));
            }
        }
        return result;
    }
}

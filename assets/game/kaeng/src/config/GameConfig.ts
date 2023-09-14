import { Room } from "game/kaeng/Room";
import { SameValue } from "game/room/framework/card/handler/SameValue";


export enum CardTypesConst {
    CT_SINGLE = 1, // 单张
    CT_PAIR = 2, // 对子
    CT_THREE = 3, // 三张
    CT_FOUR = 4, // 四张

}

export class CardTypesMap {
    // SameCards
    [CardTypesConst.CT_SINGLE] = "单张";
    [CardTypesConst.CT_PAIR] = "对子";
    [CardTypesConst.CT_THREE] = "三张";
    [CardTypesConst.CT_FOUR] = '四张';
}


class RegisterObj {
    [CardTypesConst.CT_SINGLE] = SameValue; // 单张
    [CardTypesConst.CT_PAIR] = SameValue; // 对子
    [CardTypesConst.CT_THREE] = SameValue; // 三张
    [CardTypesConst.CT_FOUR] = SameValue; // 四张
}

export class GameConfig {
    static playerNum: number = 5;

    static init() {
        let objs = new RegisterObj();
        for (const keys in objs) {
            Room.cardEngine.registerCardType(Number(keys), new objs[keys]());
        }
        console.log('==GameConfig.init==', objs);
    }

}
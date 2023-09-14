import { Line } from "game/room/framework/card/handler/Line";
import { Rocket } from "game/room/framework/card/handler/Rocket";
import { SameValue } from "game/room/framework/card/handler/SameValue";
import { ComposeCards } from "game/room/framework/card/handler/Compose";
import { Room } from "../Room";


export enum CardTypesConst {
    CT_INVALID = 0,
    // SameCards
    CT_SINGLE = 1, // 单张
    CT_PAIR = 2, // 对子
    CT_THREE = 3, // 三张
    CT_BOMB_CARD = 4, // 四炸
    CT_FIVE_BOMB_CARD = 5, // 五炸
    CT_SIX_BOMB_CARD = 6, // 六炸
    CT_SEVEN_BOMB_CARD = 7, // 七炸
    CT_EIGHT_BOMB_CARD = 8, // 八炸
    // LineCards
    CT_ONE_LINE = 9, // 顺子
    CT_DOUBLE_LINE = 10, // 连对
    CT_THREE_LINE = 11, // 飞机
    // ComposeCards
    CT_THREE_TAKE_ONE = 12, // 3带1
    CT_THREE_TAKE_TWO = 13, // 3带2
    CT_THREE_LINE_TAKE_ONE = 14, // 飞机带1: 
    CT_THREE_LINE_TAKE_DOUBLE = 15, // 飞机带2
    CT_FOUR_LINE_TAKE_ONE = 16, // 四带一
    CT_FOUR_LINE_TAKE_DOUBLE = 17, // 四带二
    // SpecialCards
    CT_MISSILE_CARD = 18, // 王炸
    CT_DOUBLE_MISSILE_CARD = 19, // 天王炸

    CT_SOFT_BOMB = 20, // 软炸
    CT_LAIZI_BOMB = 21, // 纯癞子炸
    CT_THREE_TAKE_PAIR = 22, // 三带对
    CT_THREE_LINE_TAKE_PAIR = 23, // 飞机带对
    CT_FOUR_BOMB_TAKE_PAIR = 25, //四带对
    CT_ROCKET_TWO = 31, //双王炸
    CT_ROCKET_THREE = 32, //三王炸
}

export class CardTypesMap {
    // SameCards
    [CardTypesConst.CT_SINGLE] = "单张";
    [CardTypesConst.CT_PAIR] = "对子";
    [CardTypesConst.CT_THREE] = "三张";
    [CardTypesConst.CT_BOMB_CARD] = "四炸";
    [CardTypesConst.CT_FIVE_BOMB_CARD] = "五炸";
    [CardTypesConst.CT_SIX_BOMB_CARD] = "六炸";
    [CardTypesConst.CT_SEVEN_BOMB_CARD] = "七炸";
    [CardTypesConst.CT_EIGHT_BOMB_CARD] = "八炸";
    // LineCards
    [CardTypesConst.CT_ONE_LINE] = "顺子";
    [CardTypesConst.CT_DOUBLE_LINE] = "连对";
    [CardTypesConst.CT_THREE_LINE] = "飞机";
    // ComposeCards
    [CardTypesConst.CT_THREE_TAKE_ONE] = "三带一";
    [CardTypesConst.CT_THREE_TAKE_TWO] = "三带二";
    [CardTypesConst.CT_THREE_LINE_TAKE_ONE] = "飞机";
    [CardTypesConst.CT_THREE_LINE_TAKE_DOUBLE] = "飞机";
    [CardTypesConst.CT_FOUR_LINE_TAKE_ONE] = "四带一";
    [CardTypesConst.CT_FOUR_LINE_TAKE_DOUBLE] = "四带二";
    // SpecialCards
    [CardTypesConst.CT_MISSILE_CARD] = "王炸";
    [CardTypesConst.CT_DOUBLE_MISSILE_CARD] = "天王炸";

    [CardTypesConst.CT_SOFT_BOMB] = "软炸";
    [CardTypesConst.CT_LAIZI_BOMB] = "纯癞子炸";
    [CardTypesConst.CT_THREE_TAKE_PAIR] = "三带对";
    [CardTypesConst.CT_THREE_LINE_TAKE_PAIR] = "飞机带对";
    [CardTypesConst.CT_FOUR_BOMB_TAKE_PAIR] = "四带对";
    [CardTypesConst.CT_ROCKET_TWO] = "双王炸";
    [CardTypesConst.CT_ROCKET_THREE] = "三王炸";
}


export class RegisterObj {
    [CardTypesConst.CT_SINGLE] = SameValue; // 单张
    [CardTypesConst.CT_PAIR] = SameValue; // 对子
    [CardTypesConst.CT_THREE] = SameValue; // 三张
    [CardTypesConst.CT_BOMB_CARD] = SameValue; // 四炸
    [CardTypesConst.CT_FIVE_BOMB_CARD] = SameValue; // 五炸
    [CardTypesConst.CT_SIX_BOMB_CARD] = SameValue; // 六炸
    [CardTypesConst.CT_SEVEN_BOMB_CARD] = SameValue; // 七炸
    [CardTypesConst.CT_EIGHT_BOMB_CARD] = SameValue; // 八炸

    [CardTypesConst.CT_ONE_LINE] = Line; // 顺子
    [CardTypesConst.CT_DOUBLE_LINE] = Line; // 连对
    [CardTypesConst.CT_THREE_LINE] = Line; // 飞机
    [CardTypesConst.CT_THREE_TAKE_ONE] = ComposeCards; // 三带一
    [CardTypesConst.CT_THREE_TAKE_TWO] = ComposeCards; // 三带二
    [CardTypesConst.CT_THREE_LINE_TAKE_ONE] = ComposeCards; // 飞机带单
    [CardTypesConst.CT_THREE_LINE_TAKE_DOUBLE] = ComposeCards; // 飞机带二
    [CardTypesConst.CT_FOUR_LINE_TAKE_ONE] = ComposeCards; // 四带一
    [CardTypesConst.CT_FOUR_LINE_TAKE_DOUBLE] = ComposeCards; // 四带二
    [CardTypesConst.CT_MISSILE_CARD] = Rocket; // 王炸
    [CardTypesConst.CT_DOUBLE_MISSILE_CARD] = Rocket; // 天王炸
    [CardTypesConst.CT_SOFT_BOMB] = SameValue; // 天王炸
    [CardTypesConst.CT_LAIZI_BOMB] = SameValue; // 天王炸
    // [CardTypesConst.CT_ROCKET_TWO] = Rocket2; // 双王炸
    // [CardTypesConst.CT_ROCKET_THREE] = Rocket2; // 三王炸
    [CardTypesConst.CT_THREE_TAKE_PAIR] = ComposeCards; // 三带对
    [CardTypesConst.CT_THREE_LINE_TAKE_PAIR] = ComposeCards; // 飞机带对
    [CardTypesConst.CT_FOUR_BOMB_TAKE_PAIR] = ComposeCards; // 三王炸

}

export class PdkGameConfig {

    static userCardNum: number = 17;
    static bottomCardNum: number = 3;

    static init() {
        let objs = new RegisterObj();
        for (const keys in objs) {
            Room.cardEngine.registerCardType(Number(keys), new objs[keys]());
        }
        console.log('==GameConfig.init==', objs);
    }

}
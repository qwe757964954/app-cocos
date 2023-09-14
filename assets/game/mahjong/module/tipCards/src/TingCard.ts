import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Card } from '../../card/src/Card';
import { Label } from 'cc';

export type TingCardInfo = {
    cardByte?: number,  //麻将子的byte值
    cardTByte?: number, //麻将子的tByte值
    count?: number, //麻将子剩余张数
}

@ccclass('TingCard')
export class TingCard extends XComponent {

    @property(Card)
    public tingCard: Card | null = null; 

    @property(Label)
    public numCount: Label | null = null;

    start() {

    }

    update(deltaTime: number) {

    }

    init(info: TingCardInfo) {
        if (info.cardByte) {
            this.tingCard.setCardByte(info.cardByte)
        }
        else if(info.cardTByte) {
            this.tingCard.setCardTByte(info.cardTByte)
        }

        if (info.count) {
            this.numCount.string = info.count.toLocaleString().concat("张")
        }
    }
}
import { CardStack } from "game/room/framework/card/CardStack";
import { Player } from "game/room/model/Player";
import { Card } from "game/room/framework/card/Card";


export class GamePlayer extends Player {

    public cardStack: CardStack = new CardStack();
    public scoreInfo: Map<number, number> = new Map();

    constructor(localSeat: number, uid: number = -1) {
        super();
        this.uid = uid;
        this.localSeat = localSeat;
    }

    public resetGameData(): void {
        this.initData();
    }

    public release(): void {
        this.initData();
        super.release();
    }

    initData() {
        this.scoreInfo = new Map();
        this.cardStack = new CardStack();
    }

    setCards(values: Array<number> = []) {
        this.cardStack = new CardStack();
        let cardList: Array<Card> = [];
        for (const v of values) {
            cardList.push(new Card(v));
        }
        this.cardStack.addCards(cardList);
    }

    addCards(values: Array<number>) {
        let cardList: Array<Card> = [];
        values?.forEach(v => cardList.push(new Card(v)));
        this.cardStack.addCards(cardList);
    }

    removeCards(values: Array<number>) {
        let cardList: Array<Card> = [];
        values?.forEach(v => cardList.push(new Card(v)));
        this.cardStack.removeCards(cardList);
    }

    cleanCard() {
        this.cardStack.reset();
    }

    getCardList(): Array<Card> {
        return this.cardStack.getCardList();
    }

    getHandCardNum(): number {
        return this.getCardList()?.length;
    }

    getCardValueList(): number[] {
        let values = [];
        let cardList = this.getCardList();
        cardList.forEach(v => values.push(v.byte));
        return values;
    }

}
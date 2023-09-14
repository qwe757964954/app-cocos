import { CardStack } from "game/room/framework/card/CardStack";
import { Player } from "game/room/model/Player";
import { Card } from "game/room/framework/card/Card";
import { Identity } from "./GameConst";


export class GamePlayer extends Player {

    public identity: number;
    public cardStack: CardStack = new CardStack();
    public scoreInfo: Map<number, number> = new Map();
    // 起始手牌,前端分享用
    public originCards: number[] = [];

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
        this.originCards = [];
        this.scoreInfo = new Map();
        this.cardStack = new CardStack();
        this.identity = Identity.Normal;
    }

    setCards(values: Array<number> = []) {
        this.cardStack = new CardStack();
        let cardList: Array<Card> = [];
        for(const v of values) {
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

    getHandCardNum(): number {
        return this.getCardList()?.length;
    }

    getCardList(): Array<Card> {
        return this.cardStack.getCardList();
    }

    getCardValueList(): number[] {
        let values = [];
        let cardList = this.getCardList();
        cardList.forEach(v => values.push(v.byte));
        return values;
    }

}
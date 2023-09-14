import { Card } from "./Card";


export class CardInfo {
    public ext = null;
    public type: number = -1;
    public value: number = 0;
    public color: number = 0;
    public cards: Card[] = [];


    constructor(params: any) {
        Object.assign(this, params);
    }

    toString() {
        return `{type:${this.type},color:${this.color},value:${this.value},cards:${this.cards}}`;
    }    
}

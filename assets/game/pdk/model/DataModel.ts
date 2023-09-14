import { CardInfo } from "game/room/framework/card/CardInfo";



export interface LastCards {
    seat: number;
    cards?: number[];
    cardInfo?: CardInfo;
}

export interface ClockData {
    seat: number;
    time: number;
    extraTime?: number;
}


export class PrePlayCards {
    seat: number;
    cards: number[];
    cardInfo?: CardInfo;
}






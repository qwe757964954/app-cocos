




import { GameData as BaseGameData } from 'game/room/model/GameData';
import { GamePlayer } from './GamePlayer';
import { Room } from '../Room';

export enum GameStage {
    Default = 0,
    DealCard = 1,
    PlayCard = 2,
    Result = 3,
}



class GameData extends BaseGameData {

    // 底注
    public baseScore: number = 0;
    // 本次玩牌用户uid
    public optUid: number = 0;
    // 弃牌堆数据
    public discard: number[] = [];
    // 游戏阶段
    public curStage: number = GameStage.Default;

    constructor() {
        super();
        this.resetData();
    }

    public resetData() {
        this.optUid = 0;
        this.discard = [];
        this.baseScore = 0;
        this.curStage = GameStage.Default;
    }

    public getPlayerByLocalSeat(localSeatID: number): GamePlayer {
        return this.playerList[localSeatID - 1] as GamePlayer;
    }

    public getPlayerByID(uid: number): GamePlayer {
        return super.getPlayerByID(uid) as GamePlayer;
    }

    public getMySelf(): GamePlayer {
        return this.getPlayerByLocalSeat(1);
    }

    public getAllPlayer(): GamePlayer[] {
        return super.getAllPlayer() as GamePlayer[];
    }

    public release() {
        for (const v of this.playerList) {
            v.release();
        }
        this.resetData();
        Room.msgHandler.release();
        super.release();
    }


}

export { GameData };







import { GameData as BaseGameData } from 'game/room/model/GameData';
import { GameStage } from './GameConst';
import { LastCards, PrePlayCards } from './DataModel';
import { TaskInfo } from 'game/pdk/idl/tss/pdk/extendtable.v3';
import { GamePlayer } from './GamePlayer';
import { Room } from '../Room';
import { GameRound } from './GameRound';




class GameData extends BaseGameData {
    // 当前阶段
    public curStage: string = GameStage.Default;
    // 上个出牌的玩家数据
    public lastCards: LastCards;
    // 投降玩家uid
    public surrenderUid: Array<number> = [];
    // 基础倍数
    public baseScore: number = 1;
    // 牌局任务
    public tasks: TaskInfo[] = [];
    // 倍数详情
    public scoreInfo: Map<number, number>;
    // 当前倍数
    public totalScore: number = 1;
    // 当前叫分倍数
    public curCallScore: number = 0;
    // 预出牌数据
    public prePlay: PrePlayCards;
    // 当前操作的玩家uid
    public optUid: number = -1;
    // 底牌数据
    public bottomCards: number[] = [];
    // 剩下的底牌
    public leftBottom: number[] = [];
    // 本轮信息
    public roundInfo: GameRound = new GameRound();

    constructor(){
        super();
        this.resetData(true);
    }

    public getPlayerByLocalSeat(localSeatID: number) : GamePlayer {
        return this.playerList[localSeatID - 1] as GamePlayer;
    }

    public getPlayerByID(uid: number) : GamePlayer {
        return super.getPlayerByID(uid) as GamePlayer;
    }

    public getMySelf() : GamePlayer  {
        return this.getPlayerByLocalSeat(1);
    }

    public getAllPlayer() : GamePlayer[]  {
        return super.getAllPlayer() as GamePlayer[];
    }

    public resetData(isInit: boolean = false) {
        this.curStage = GameStage.Default;
        this.scoreInfo = new Map();
        this.totalScore = 1;
        this.lastCards = null;
        this.prePlay = null;
        this.optUid = -1;
        this.bottomCards = [];
        this.leftBottom = [];
        this.baseScore = 1;
        this.tasks = [];
        this.roundInfo = new GameRound();

        if (isInit) {
            this.surrenderUid = [];
        }
    }
    
    public release() {
        for (const v of this.playerList) {
            v.release();
        }
        this.resetData(true);
        Room.msgHandler.release();
        super.release();
    }

    
}

export {GameData};


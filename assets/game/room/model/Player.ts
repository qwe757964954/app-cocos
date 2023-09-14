import { EmptyClass, EventTargetExtends } from "bos/utils/ClassUtils";
import { GameData } from "./GameData";
import { Room } from "../Room";
import { App } from "app/App";

export enum PlayerState {
    Default = 0,
    Ready = 1,
    Playing = 2,
    Result = 3,
}

interface opTimeSwitch {
    time?: number;
}

export class Player extends EventTargetExtends(EmptyClass) {

    public static EventType = {
        UPDATE_SCORE: 'UPDATE_SCORE',
        UPDATE_USERINFO: 'UPDATE_USERINFO',
    }

    public uid: number = -1;
    public gender: number = -1;
    public avatar: string = "";
    public nickname: string = "";
    public localSeat: number = -1;
    public matchScore: number = 0;
  
    public curWinStreak: number = 0;
    public topWinStreak: number = 0;
    public winRate: number = 0;
    public allCount: number = 0;
    public winCount: number = 0;
    public loseCount: number = 0;
    public drawCount: number = 0;
    public vipLvl: number = 0;
  
    public isAI: boolean = false;
    public isOnline: boolean = true;
    public serverSeat: number = -1;
  
    public state: PlayerState = PlayerState.Default;

    public opTimeSwitch: opTimeSwitch = {};
    public remainOpTime: number = 0;
    public curStreakWinCnt: number = 0;

    constructor() {
        super()
        this.localSeat = -1;
        this.resetData()
    }
    
    public release() {
        this.resetData();
    }

    public resetData() {
        //平台userinfo
        this.uid                = -1       //-玩家id
        this.gender             = -1       //-玩家性别
        this.avatar             = ""       //头像url
        this.nickname           = ""       //玩家昵称
    
        //266子游戏公共数据
        this.curWinStreak       = 0     //当前连胜
        this.topWinStreak       = 0     //最高连胜
        this.winRate            = 0     //胜率
        this.allCount           = 0     //总局数
        this.winCount           = 0     //胜局数
        this.loseCount          = 0     //败局数
        this.drawCount          = 0     //平局数
        //业务相关
        this.isAI               = false    //-玩家ai状态
        this.isOnline           = true  //是否在线
        this.serverSeat         = -1    //server座位号
        this.matchScore         = 0         // 游戏积分
    
        this.state              = PlayerState.Default//0表示没有准备，1表示准备状态，2表示在游戏中
    }

    public leave() {
        if (this.localSeat != 1) {
            this.resetData();
            this.resetGameData();
            this.emit(Player.EventType.UPDATE_USERINFO, this);
        }
    }

    //由子游戏重写，重置子游戏数据
    public resetGameData() {

    }

    public getServerSeat() {
        if (this.serverSeat == -1) {
            const firstLocalSeat = 1; // 第一个玩家本地座位号
            const firstPlayer = Room.gameData.getPlayerByLocalSeat(firstLocalSeat);
            const firstServerSeat = firstPlayer.serverSeat; // 第一个玩家服务器座位号
            if (firstServerSeat == -1) { // 第一个玩家没确定 server 座位号无法计算当前 player 的位置
              return;
            }
            const maxCount = Room.gameData.getMaxPlayerCount();
            let serverSeat = (this.localSeat - firstLocalSeat + firstServerSeat) % maxCount;
            if (serverSeat == 0) {
              serverSeat = maxCount;
            }
            return serverSeat;
        } else {
            return this.serverSeat;
        }
    }
    public setLocalSeat(seat: number) {
        this.localSeat = seat
    }
    public getLocalSeat(): number {
        return this.localSeat
    }
    public refresh() {
        if (this.uid > 0) {
            let user = App.userMgr.getUserByID(this.uid);
            if (user) {
                this.gender = user.gender;
                this.avatar = user.avatar;
                this.nickname = user.nickname || `玩家${user.uid}`;
            }
            if (Room.gameData.isMatching()) {
                let wallet = App.walletMgr.getUserWallet(this.uid);
                wallet && (this.matchScore = wallet.coin);
            }
            console.log('=Player=refresh==', this.toString());
            this.emit(Player.EventType.UPDATE_USERINFO, this);
        }
    }

    public toString() {
        return `{uid:${this.uid},matchScore:${this.matchScore},nickname:${this.nickname},seat:${this.localSeat}},gender:${this.gender}`;
    }

    public isPlaying(): boolean {
        return this.state == PlayerState.Playing;
    }
}
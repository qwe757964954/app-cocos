
import { EventTargetExtends, EmptyClass } from "bos/utils/ClassUtils";
import { Room } from "../Room";
import { Log } from "bos/exports";
import { App } from "app/App";
import { Player, PlayerState } from "./Player";
import { MatchType, PreventCheat } from "idl/tss/match_v2/common/common";
import { MsgTableInfo, TableUser } from "idl/tss/game/table.v2";
import { MateMgr } from "app/domain/mate/MateMgr";
import { Desk } from "app/domain/mate/Desk";
import { IJoinDeskMsg, ILeaveDeskMsg, IMsgMatchOver, IMsgOneGameResult, IReadyMsg } from "idl/tss/match_v2/matematch.v1";
import { IDeskUser } from "idl/tss/match_v2/common_matematch";

export enum PlayOption {
    Classic = 1,        // 经典玩法
    NoShuffle = 2,      // 不洗牌玩法
    CallGrab = 3,       // 叫抢玩法
}

export enum GameStatus {
    PLAYING = 1,
    REPLAYING = 2,
    OBSERVING = 3,
    PENDING = 4,
}
export enum RoomType {
    LiveRoomTypeUnknown = 0,
    LiveRoomTypeOfficial = 1,
    LiveRoomTypePersonal = 2,
}

export interface MatchInfo {
    matchName: string,
    baseScore: number,
    assetIcon?: string,
}

export class GameData extends EventTargetExtends(EmptyClass) {

    
    public StatusMap = {
        [1]: {
            observing: 3,
            pending: 4,
        },
        [4]: {
            playing: 1,
            replaying: 2,
            observing: 3,
            highlighting: 5,
        },
        [3]: {
            playing: 1,
            pending: 4,
        },
    }

    myID: number;
    matchType: number;
    playOption: number;             //游戏玩法
    gameID: string;
    tableKey: string;
    tableServiceID: number;
    tableService: any;
    gameStatus: number;
    obConfig: any = {};
    stageInfo: any;
    observeView: number;
    matchID: any;
    prophetCardBuff: boolean;
    recordCardBuff: boolean;
    allocOpTime: number;
    downgradeOpTime: number;
    // 防作弊配置
    preventCheat: PreventCheat;

    punishment: boolean;
    matchInfoPromise: Promise<void>;
    playerList: Array<Player> = [];

    matchInfo: MatchInfo;

    static EventType = {
        INIT_CONFIG: 'INIT_CONFIG',
        GAME_RESULT: 'GAME_RESULT',
    }

    public release() {
        Room.matchMgr.removeAll(this);
        Room.matchMgr.release();
    }

    public notifyData(key: string, data?: any) {
        this.emit(`notifyData_${key}`, data);
    }

    public initData(data: any) {
        console.log('==initData==', data);
        this.gameID = data.gameID;
        this.matchID = data.matchID;
        this.playOption = data.playWay;
        this.matchType = data.matchType;
        this.setMainUid(data.mainUid);
        if (this.isMatching()) {
            this.onEnterDesk(App.mateMgr.getDesk())
        }
        this.addListen();
    }
    
    addListen() {
        Room.matchMgr.on(MateMgr.EventType.ON_JOIN_DESK, this.onEnterDesk.bind(this));
        Room.matchMgr.on(MateMgr.EventType.ON_LEAVE_DESK, this.onLeaveDesk.bind(this));
        Room.matchMgr.on(MateMgr.EventType.ON_READY_DESK, this.onReadyDesk.bind(this));
        Room.matchMgr.on(MateMgr.EventType.ON_USER_JOIN, this.onOtherJoin.bind(this));
        Room.matchMgr.on(MateMgr.EventType.ON_USER_LEAVE, this.onOtherLeave.bind(this));
        Room.matchMgr.on(MateMgr.EventType.ON_USER_READY, this.onOtherReady.bind(this));
        Room.matchMgr.on(MateMgr.EventType.ON_MATCH_END, this.onMatchEnd.bind(this));
        Room.matchMgr.on(MateMgr.EventType.ON_GAME_RESULT, this.onGameResult.bind(this));
    }
    
    onEnterDesk(data: Desk) {
        let mine = this.getMySelf();
        Log.d("GameData:onEnterDesk====", mine, data);
        if (!data) {return};
 
        this.emit("GAME_RESET_VIEW");
        for (const v of this.playerList) {
            if (v.uid != mine.uid) {
                v.resetData();
                v.refresh();
            }
        }
        for (const v of data.users) {
            let player = this.getPlayerByID(v.uid);
            if (!player) {
                const seat = this.getLocalSeatBySId(v.seatNo);
                player = this.playerList[seat - 1];
            }
            player.uid = v.uid;
            player.serverSeat = v.seatNo;
            player.state = (v.isReady || player.localSeat == 1) ? PlayerState.Ready : PlayerState.Default;
            player.refresh();
        }
        this.refreshMatchingScore();
    }

    public setPlayerInfo(users:Array<TableUser>) {
        if (users?.length > 0) {
            let mine = this.getMySelf();
            console.log('==GameData.setPlayerInfo==', users, mine.uid);
            for (let k = 0; k < users.length; k++) {
                const user = users[k];
                if (user.uid == mine.uid) {
                    mine.uid = user.uid; 
                    mine.serverSeat = k + 1;
                    mine.resetGameData();
                    mine.refresh();
                    break;
                }
            }
            for (let k = 0; k < users.length; k++) {
                if (users[k]?.uid != mine.uid) {
                    const seat = this.getLocalSeatBySId(k + 1);
                    let player = this.getPlayerByLocalSeat(seat);
                    player.uid = users[k].uid; 
                    player.serverSeat = k + 1;
                    player.resetGameData();
                    player.refresh();
                }
            }
        }
    }
    
    onLeaveDesk(data: Desk) {
        Log.d("=desk=onLeaveDesk==", data);
        for (const v of this.playerList) {
            if (v.uid != this.myID) {
                v.resetData();
                v.refresh();
            }
        }
    }
    
    onReadyDesk(data: Desk) {
        Log.d("=desk=onReadyDesk==", data);
        for (const user of data.users) {
            this.setPlayerByMgr(user);
        }
    }

    onOtherJoin(data: IJoinDeskMsg) {
        Log.d("=desk=onOtherJoin==", data);
        let user = data.user;
        this.setPlayerByMgr(user);
    }

    onOtherLeave(data: ILeaveDeskMsg) {
        Log.d("=desk=onOtherLeave==", data);
        let user = data.user;
        let player = this.getPlayerByID(user.uid);
        player.leave();
    }

    onOtherReady(data: IReadyMsg) {
        Log.d("=desk=onOtherReady==", data);
        let user = data.user;
        this.setPlayerByMgr(user);
    }

    setPlayerByMgr(user: IDeskUser){
        let localSeat = this.getLocalSeatBySId(user.seatNo);
        let player = this.getPlayerByLocalSeat(localSeat);
        Log.d("=desk=setPlayerByMgr==", user, localSeat, player.uid, user.isReady ? PlayerState.Ready : PlayerState.Default);
        player.serverSeat = user.seatNo;
        player.uid = user.uid;
        player.state = user.isReady ? PlayerState.Ready : PlayerState.Default;
        player.refresh();
    }

    onMatchEnd(data: IMsgMatchOver) {
        Log.d("==onMatchEnd==");
        
    }

    public setTableService(tableService?: object) {
        this.tableService = tableService
    }

    public getTableService() {
        return this.tableService
    }

    public isObserving() {
        return this.gameStatus == GameStatus.OBSERVING
    }

    public isPlaying() {
        return this.gameStatus == GameStatus.PLAYING
    }

    public isReplaying() {
        return this.gameStatus == GameStatus.REPLAYING
    }

    public isMatching() {
        return this.matchType == MatchType.MatchTypeMate
    }

    public isRegular() {
        return !this.isObserving && (this.matchType == MatchType.MatchTypeSNG || this.matchType == MatchType.MatchTypeTiming);
    }
    
    public isTeam() {
        return false
    }

    public isCallGrab() {
        return this.playOption == PlayOption.CallGrab;
    }

    public setHideUserInfo(data: PreventCheat = new PreventCheat({})) {
        this.preventCheat = data
    }

    public isHideUserInfo() {
        return this.preventCheat.isOpen && this.isPlaying();
    }

    public isAllowProp() {
        return this.isHideUserInfo() && this.preventCheat.isAllowProp;
    }

    public setOBConfig(config: any) {
        this.obConfig = config;
    }

    public getOBConfig() {
        return this.obConfig;
    }

    public setMatchID(matchID) {
        this.matchID = matchID;
    }

    public getMatchID() {
        return this.matchID;
    }

    public setGameStatus(status: string) {
        const newStatus = this.StatusMap[this.gameStatus] && this.StatusMap[this.gameStatus][status] || this.gameStatus;
        Log.d("GameData:setGameStatus ", status, this.gameStatus, newStatus);
        this.gameStatus = newStatus;
        this.getMatchInfo();
    }

    /**
     * 
     * @returns 
     * 	matchInfo = {
            matchName = matchName,
            ante = ante,
            assetIcon = url
        }
     */
    public getMatchInfo() {
        if (!this.matchInfo?.matchName || !this.matchInfo?.baseScore) {
            let info = Room.matchMgr.getMatchInfo();
            this.matchInfo = {
                baseScore: info.baseScore,
                matchName: info.matchName,
            }
        }
        return this.matchInfo;
    }
    
    public setTableStart(data:MsgTableInfo, key: string = "") {
        Log.d("GameData:setTableStart", data, key);

        this.tableKey = key;
        this.allocOpTime = 0;
        this.downgradeOpTime = 0;
        key !== "" && this.setGameStatus("playing");

        // this.tableServiceID = this.tableService.getDestID(key);

        for (const v of (data.users || [])) {
            let player = this.getPlayerByID(v.uid);
            if (player) {
                player.remainOpTime = v.remainOpTime || 0;
                player.curStreakWinCnt = v.curStreakWinCnt || 0;
            }
        }

        if (!this.isObserving()) {
            if (data.playOption) {
                this.playOption = data.playOption;
            }
            if (data.allocOpTime) {
                this.allocOpTime = data.allocOpTime || 0;
            }
            if (data.downgradeOpTime) {
                this.downgradeOpTime = data.downgradeOpTime || 0;
            }
        }
    }

    public setTableEnd() {
        Log.d(" GameData:setTableEnd");
        this.tableKey = "";
        this.tableServiceID = 0;
        this.setGameStatus("pending");
    }

    public setPunishment(bool: boolean = false) {
        this.punishment = bool;
    }

    public getPunishment() {
        return this.punishment;
    }

    public reset() {
        this.tableKey = "";
        this.tableServiceID = 0;
        this.setGameStatus("pending");
    }


    public getMyState(): number {
        return this.getMySelf()?.state;
    }
    
    /**
     * 获取客户端登录玩家
     */
    public getMySelf() {
        return this.getPlayerByLocalSeat(1);
    }

    /**
     * 获取客户端登录玩家Uid
     */
    public getMyID(): number {
        return this.myID;
    }

    /**
     * 设置主视角玩家uid
     */
    public setMainUid(uid: number) {
        this.myID = uid;
        let playerMine = this.getPlayerByLocalSeat(1)
        playerMine && (playerMine.uid = uid);
        playerMine.refresh();
    }

    /**
     * 获取客户端登录玩家uid
     */
    public getPhoneUid(): number {
        return App.userMgr.loginUid;
    }
    
    public getAllPlayer(): Array<Player> {
        return this.playerList
    }

    public getMaxPlayerCount(): number {
	    return this.playerList.length
    }


    public initPlayer(playerNum: number) {
        this.playerList = [];
        for (let i = 1; i <= playerNum; i++) {
            this.playerList[i - 1] = Room.delegate.createPlayer(i);
        }
    }

    /**
     * 通过本地座位号获取玩家
     */
    public getPlayerByLocalSeat(localSeatID: number) {
        return this.playerList[localSeatID - 1];
    }

    onUserReadyChange(data) {
        if (this.isMatching() && this.getMySelf().state != PlayerState.Playing) {
            for (const v of data.users) {
                let player = this.getPlayerByID(v.uid);
                Log.d("==GameData:onUserReadyChange==", v, player?.state);
                v.isReady && player.state == PlayerState.Default && (player.state = PlayerState.Ready);
            }
        }
    }

    /**
     * 通过玩家UID获取玩家
     */
    getPlayerByID(uid: number) {
        for(const v of this.playerList) {
            if (v.uid == uid) {
                return v;
            }
        }
    }

    getLocalSeatBySId(seat: number): number {
        const playerMine = this.getMySelf();
        const max = this.getMaxPlayerCount();
        let offset = seat - playerMine.serverSeat;
        offset < 0 && (offset += max);
        Log.d("==GameData.getLocalSeatBySId==", playerMine.serverSeat, seat, offset);
        return offset + 1;
    }

    refreshMatchingScore() {
        if (this.isMatching()) {
            for (const v of App.mateMgr.getDesk().users) {
                // let player = this.getPlayerByID(v.uid);
                // player && (player.matchScore = v.score || 0);
            }
        }
    }

    onOtherEnterDesk(data) {
        Log.d("GameData:onOtherEnterDesk====", data, this.getAllPlayer(), this.getMySelf().state);
        if (this.isMatching() && this.getMySelf().state != PlayerState.Playing) {
            for (const v of data.users) {
                let player = this.getPlayerByID(v.uid);
                if (!player) {
                    const seat = this.getLocalSeatBySId(v.seatNo);
                    Log.d("GameData:onOtherEnterDesk==seat==",v.seatNo, seat);
                    player = this.playerList[seat - 1];
                }
                
                player.uid = v.uid;
                player.serverSeat = v.seatNo;
                player.state = v.isReady ? PlayerState.Ready : PlayerState.Default;	
                player.refresh();
            }
            this.refreshMatchingScore();
        }
    }

    /**
     * 所有玩家数据重置
     */
    resetAllPlayer() {
        for(const player of this.playerList) {
            player.resetData()
        }
    }

    /**
     * 通过玩家UID获取本地座位号
     */
    getLocalSeatByID(uid: number): number | null {
        for(const player of this.playerList) {
            if (player.uid == uid) {
                return player.localSeat;
            }
        }
    }

    /**
     * 通过服务端座位号获取本地座位号
     * @param serverSeatID 服务端座位号
     */
    getLocalSeatByServerSeat(serverSeatID: number): number | null {
        for(const player of this.playerList) {
            if (player.getServerSeat() == serverSeatID) {
                return player.localSeat;
            }
        }
    }
    /**
     * 通过服务座位号获取玩家
     */
    getPlayerByServerSeat(serverSeatID: number) {
        for(const v of this.playerList) {
            if (v.getServerSeat() == serverSeatID) {
                return v
            }
        }
    }

    checkAllPlayer(): boolean {
        for (const v of this.playerList) {
            if (!v.uid || v.uid <= 0 || v.state == PlayerState.Ready) {
                return false
            }
        }
        return true
    }

    onNotifyTableStart() {
        if (this.isMatching()) {
            this.refreshMatchingScore()
        }
    }

    onNotifyReconnect() {
        if (this.isMatching()) {
            this.refreshMatchingScore()
        }
    }
    
    onGameResult(data: IMsgOneGameResult) {
        if (this.isMatching()) {
            this.refreshMatchingScore()
        }
        this.emit(GameData.EventType.GAME_RESULT, data)
    }

    isCanLeave() {
        let isCanLeave = this.playerList.length == 0
        for (const v of this.playerList) {
            if (v.state == PlayerState.Default) {
                isCanLeave = true
                break
            }
        }
        return isCanLeave
    }
}


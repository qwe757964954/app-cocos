
import { App } from "app/App";
import { MatchManager } from "./MatchManager";
import { MatchHandler } from "app/domain/match/match/handler/MatchHandler";
import { Room } from "../Room";
import { MatchInfo } from "../model/GameData";
import { EmptyClass, EventTargetExtends } from "bos/exports";
import { RevivalInfo } from "idl/tss/match_v2/officematch.v1";
import { AssetItem } from "idl/tss/common/common_define";
import { MTable } from "app/domain/match/match/data/TableInfo";
import { RoomInfo, ShowStageInfo, ShowUserInfo } from "app/domain/match/match/data/RoomInfo";


export class RegularMatch extends EventTargetExtends(EmptyClass) {

    public target: MatchManager;
    public handler: MatchHandler;
    
    init(target: MatchManager) {
        this.target = target;
        this.handler = App.matchMgr.getHandlerByPreMatchKey(App.gameMgr.getRunningMatchKey());
        this.handler.on(MatchHandler.EventType.UserOut, this.onUserOut, this);
        this.handler.on(MatchHandler.EventType.UserInRevival, this.onUserInRevival, this);
        this.handler.on(MatchHandler.EventType.PoolChange, this.onPoolChange, this);
        this.handler.on(MatchHandler.EventType.MatchTableStart, this.onMatchTableStart, this);
        this.handler.on(MatchHandler.EventType.MatchTableResult, this.onMatchTableResult, this);
        this.handler.on(MatchHandler.EventType.RankChange, this.onRankChange, this);
        this.handler.on(MatchHandler.EventType.MatchStageStart, this.onMatchStageStart, this);
    }

    release() {
        this.handler.removeAll(this);
    }

    onUserOut(uid: number) {
        console.log('=RegularMatch=onUserOut==', uid);
        this.target.emit(MatchHandler.EventType.UserOut, uid);
    }

    onUserInRevival(uid : number, revival : RevivalInfo) {
        console.log('=RegularMatch=onUserInRevival==', uid, revival);
        this.target.emit(MatchHandler.EventType.UserInRevival, uid, revival);
    }

    onPoolChange(prizePool : AssetItem[]) {
        console.log('=RegularMatch=onPoolChange==', prizePool);
        this.target.emit(MatchHandler.EventType.PoolChange, prizePool);
    }

    onMatchTableStart(table : MTable, isMeIn : boolean) {
        console.log('=RegularMatch=onMatchTableStart==', isMeIn, table);
        this.target.emit(MatchHandler.EventType.MatchTableStart, table, isMeIn);
    }

    onMatchTableResult(table : MTable, isMeIn : boolean) {
        console.log('=RegularMatch=onMatchTableResult==', isMeIn, table);
        this.target.emit(MatchHandler.EventType.MatchTableResult, table, isMeIn);
    }

    onRankChange(roomInfo: RoomInfo) {
        console.log('=RegularMatch=onRankChange==', roomInfo);
        this.target.emit(MatchHandler.EventType.RankChange, roomInfo);
    }

    onMatchStageStart() {
        console.log('=RegularMatch=onMatchStageStart==');
        this.target.emit(MatchHandler.EventType.MatchStageStart);
    }

    getMatchInfo(): MatchInfo {
        let ret: MatchInfo = {matchName: '', baseScore: 0};
        let table = this.handler.roomInfo.tableInfo.findTableByUID(Room.gameData.getMyID());
        table && (ret.baseScore = table.baseScore);
        ret.matchName = this.handler.roomInfo.config.getMatchName();
        return ret;
    }

    getShowStageInfo(): ShowStageInfo {
        return this.handler.roomInfo.getShowStageInfo();
    }
    
    getShowUserInfo(): ShowUserInfo {
        return this.handler.roomInfo.getShowUserInfo();
    }
    
    getRoomInfo(): RoomInfo {
        return this.handler.roomInfo;
    }
       
    getRegularHandler(): MatchHandler {
        return this.handler;
    } 

}
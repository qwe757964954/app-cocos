import { Log } from "bos/base/log/Log";
import { PBRegularCommon } from "../../code/code";
import { MatchMgr } from "../../MatchMgr";
import { App } from "app/App";
import { MatchHandler } from "../handler/MatchHandler";
import { AssetItem } from "idl/tss/common/common_define";
import { SafeEmit } from "./RoomInfo";

export default class PreMatchInfo {

    leftDurationToStart: number;

    entryTokens: string[] = [];

    joinUserNum: number;

    enterUserNum: number;

    readyUserNum: number;

    observerUserNum: number;

    roomNo: string;

    preMatchKey: string;

    matchKey: string;

    roomId: string;

    prizePool: AssetItem[] = [];

    matchStartAt: number;

    matchReadyAt: number;

    status: number;

    handler : MatchHandler
	
    constructor(handler : MatchHandler | null){
        this.handler = handler
    }

    reset() {
        this.leftDurationToStart = 0
        this.entryTokens = [];
        this.joinUserNum = 0
        this.enterUserNum = 0
        this.readyUserNum = 0
        this.observerUserNum = 0
        this.roomNo = ""
        this.preMatchKey = ""
        this.matchKey = ""
        this.roomId = ""
        this.prizePool = []
        this.matchStartAt = 0
        this.matchReadyAt = 0
        this.status = PBRegularCommon.MatchStatusUnknown
    }

    init(data) {
        if (!data) {
            return 
        }

        this.leftDurationToStart = data.leftDurationToStart || 0
        this.entryTokens = data.entryTokens || []
        this.joinUserNum = data.joinUserNum || 0
        this.enterUserNum = data.enterUserNum || 0
        this.readyUserNum = data.readyUserNum || 0
        this.observerUserNum = data.observerUserNum || 0
        this.roomNo = data.roomNo || ""
        this.preMatchKey = data.preMatchKey || ""
        this.matchKey = data.matchKey || ""
        this.roomId = data.roomId || ""
        this.prizePool = data.prizePool || []
        this.matchStartAt = data.matchStartAt || 0
        this.matchReadyAt = data.matchReadyAt || 0
        this.status = data.status || PBRegularCommon.MatchStatusInit
    }

    initPrizePool(prizePool : AssetItem[]) {
        console.debug("PreBaseInfo:initPrizePool", this.prizePool);
        this.prizePool = prizePool
    }

    update(data) {
        if (!data) {
            return 
        }
        
        this.leftDurationToStart = data.leftDurationToStart
        this.entryTokens = data.entryTokens
        this.joinUserNum = data.joinUserNum
        this.enterUserNum = data.enterUserNum
        this.readyUserNum = data.readyUserNum
        this.observerUserNum = data.observerUserNum
        this.roomNo = data.roomNo
        this.preMatchKey = data.preMatchKey
        this.matchKey = data.matchKey
        this.roomId = data.roomId
        this.matchStartAt = data.matchStartAt
        this.matchReadyAt = data.matchReadyAt

        this.updateMatchStatus(data.status)
        this.updatePrizePool(data.prizePool)
    }

    getRoomNo(){
        return this.roomNo
    }
    
    getRoomID(){
        return this.roomId
    }

    getStatus(){
        return this.status
    }

    getPrizePool(): any {
        return this.prizePool;
    }

    getJoinUserNum(): number {
        return this.joinUserNum ?? 0;
    }

    getEntryUserNum(): number {
        return this.enterUserNum ?? 0;
    }

    getReadyUserNum(): number {
        return this.readyUserNum ?? 0;
    }

    getObserverUserNum(): number {
        return this.observerUserNum ?? 0;
    }

    getMatchStartAt(){
        return this.matchStartAt
    }

    getMatchReadyAt(){
        return this.matchReadyAt
    }

    addJoinUser(num: number): void {
        console.debug("PreBaseInfo:addJoinUser", this.joinUserNum, num);
        this.joinUserNum += num;
    }

    removeJoinUser(num: number): void {
        console.debug("PreBaseInfo:removeJoinUser", this.enterUserNum, num);
        this.joinUserNum = Math.max(0, this.joinUserNum - num);
    }

    addSignUser(num: number): void {
        console.debug("PreBaseInfo:addSignUser", this.enterUserNum, num);
        this.enterUserNum += num;

        SafeEmit(this.handler,MatchHandler.EventType.UserSignedNumChange, this.enterUserNum)
    }

    removeSignUser(num: number): void {
        console.debug("PreBaseInfo:removeSignUser", this.enterUserNum, num);
        this.enterUserNum = Math.max(0, this.enterUserNum - num);

        SafeEmit(this.handler,MatchHandler.EventType.UserSignedNumChange, this.enterUserNum)
    }

    addReadyUser(num: number): void {
        console.debug("PreBaseInfo:addReadyUser", this.readyUserNum, num);
        this.readyUserNum += num;

        SafeEmit(this.handler,MatchHandler.EventType.UserReadyNumChange, this.readyUserNum)
    }

    removeReadyUser(num: number): void {
        console.debug("PreBaseInfo:removeReadyUser", this.readyUserNum, num);
        this.readyUserNum = Math.max(0, this.readyUserNum - num);
       
        SafeEmit(this.handler,MatchHandler.EventType.UserReadyNumChange, this.readyUserNum)
    }

    updateMatchStatus(status : number){
        console.debug("PreBaseInfo:updateMatchStatus", this.status, status);
        let oldStatus = this.status
        if (this.status != status) {
            this.status = status

            SafeEmit(this.handler,MatchHandler.EventType.MatchStatusChange, this.status, oldStatus)
        }
    }

    updatePrizePool(prizePool : AssetItem[] | any) {
        console.debug("PreBaseInfo:updatePrizePool", this.prizePool);

        this.prizePool = prizePool

        SafeEmit(this.handler,MatchHandler.EventType.PoolChange, this.prizePool)
    }
}
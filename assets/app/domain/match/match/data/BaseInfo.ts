import { Log } from "bos/base/log/Log";
import { MatchMgr } from "../../MatchMgr";
import { App } from "app/App";
import { MatchHandler } from "../handler/MatchHandler";
import { AssetItem } from "idl/tss/common/common_define";
import { SafeEmit } from "./RoomInfo";
import { TimeUtil } from "bos/exports";

class StageGroupItem {

	groupID: number;

	userNum: number;

	uids: number[] = [];

	reset() {
		this.groupID = 0
		this.userNum = 0
		this.uids = [];
	}

	init(data) {
		this.update(data)
	}

	update(data) {
		this.groupID = data.groupID
		this.userNum = data.userNum
		this.uids = data.uids
	}
}

class GroupInfo {

	isOpen: boolean;

	groupNum: number;

	doneGroups:StageGroupItem[] = [];

	doingGroups:StageGroupItem[] = [];

	reset() {
		this.isOpen = false
		this.groupNum = 0
		this.doneGroups = [];
		this.doingGroups = [];
	}

	init(data) {
		if (!data) {
			return
		}
		
		this.isOpen = data.isOpen || false
		this.groupNum = data.groupNum || 0
		this.doneGroups = data.doneGroups || [];
		this.doingGroups = data.doingGroups || [];
	}

	update(data) {
		if (!data) {
			return
		}

		this.isOpen = data.isOpen
		this.groupNum = data.groupNum

		this.updateDoneGroups(data.doneGroups)
		this.updateDoingGroups(data.doingGroups)
	}

	updateDoneGroups(data: StageGroupItem[] = []): void {
		this.doneGroups = [];
		for (let i = 0; i < data.length; i++) {
			const item = new StageGroupItem();
			item.init(data[i]);
			this.doneGroups.push(item);
		}
	}

	updateDoingGroups(data: StageGroupItem[] = []): void {
		this.doingGroups = [];
		for (let i = 0; i < data.length; i++) {
			const item = new StageGroupItem();
			item.init(data[i]);
			this.doingGroups.push(item);
		}
	}

	getIsGrouping(){
		return this.isOpen
	}

	getGroupNum(){
		return this.groupNum
	}

	getDoingGroups() {
		return this.doingGroups
	}

	getDoneGroups() {
		return this.doneGroups
	}
}

class Stage {

	index: number;

	LeftDuration: number;

	isOver: boolean;

	isLastedStage: boolean;

	_overTimes : number

	reset() {
		this.index = 0
		this.LeftDuration = 0
		this.isOver = false
		this.isLastedStage = false

		this._overTimes = 0
	}

	init(data) {
		if (!data) {
			return
		}

		this.index = data.index || 0
		this.LeftDuration = data.LeftDuration || 0
		this.isOver = data.isOver || false
		this.isLastedStage = data.isLastedStage || false

		this._overTimes = TimeUtil.getTime() + this.LeftDuration
	}

	update(data) {
		if (!data) {
			return
		}

		this.index = data.index
		this.isOver = data.isOver
		this.isLastedStage = data.isLastedStage

		this.updateLeftDuration(data.LeftDuration)
	}

	getStageIndex(): number {
		return this.index || 0
	}
	
	getLeftDuration(): number {
		return this.LeftDuration || 0;
	}

	getOverTimes(): number {
		return this._overTimes || 0;
	}

	updateIndex(index :number) {
		this.index = index
	}

	updateIsOver(isOver :boolean) {
		this.isOver = isOver
	}

	updateLeftDuration(LeftDuration :number = 0){
		this.LeftDuration = LeftDuration

		this._overTimes = TimeUtil.getTime() + this.LeftDuration
	}
}

export class BaseInfo {
	stage = new Stage();

	groupInfo = new GroupInfo();

	entryUserNum: number;

	playingUserNum: number;

	waitUserNum: number;

	outUserNum: number;

	playerNum: number;

	baseScore: number;

	outScore: number;

	status: number;

	matchKey: string;

	preMatchKey: string;

	roomId: string;

	srvID: number;

	isDynamicStage: boolean;

	dynamicStageId: number;

	prizePool: AssetItem[] = [];

	revivedNum: number;

	handler : MatchHandler
	
    constructor(handler : MatchHandler | null){
        this.handler = handler
    }

	reset() {
		this.stage.reset()
		this.groupInfo.reset()

		this.entryUserNum = 0
		this.playingUserNum = 0
		this.waitUserNum = 0
		this.outUserNum = 0
		this.playerNum = 0
		this.baseScore = 0
		this.outScore = 0
		this.status = 0
		this.matchKey = ""
		this.preMatchKey = ""
		this.roomId = ""
		this.srvID = 0
		this.isDynamicStage = false
		this.dynamicStageId = 1
		this.prizePool = []
		this.revivedNum = 0
	}

	init(data) {
		if (!data) {
            return 
        }

		this.stage.init(data.stage)
		this.groupInfo.init(data.groupInfo)

		this.entryUserNum = data.entryUserNum || 0
		this.playingUserNum = data.playingUserNum || 0
		this.waitUserNum = data.waitUserNum || 0
		this.outUserNum = data.outUserNum || 0
		this.playerNum = data.playerNum || 0
		this.baseScore = data.baseScore || 0
		this.outScore = data.outScore || 0
		this.status = data.status || 0
		this.matchKey = data.matchKey || ""
		this.preMatchKey = data.preMatchKey || ""
		this.roomId = data.roomId || ""
		this.srvID = data.srvID || 0
		this.isDynamicStage = data.isDynamicStage || 0
		this.dynamicStageId = data.dynamicStageId || 1
		this.prizePool = data.prizePool || []
		this.revivedNum = data.revivedNum || 0
	}

	update(data) {
		if (!data) {
            return 
        }
		
		this.stage.update(data.stage)
		this.groupInfo.update(data.groupInfo)

		this.matchKey = data.matchKey
		this.preMatchKey = data.preMatchKey
		this.roomId = data.roomId
		this.srvID = data.srvID

		this.updateGroupInfo(data.groupInfo)
		this.updateDynamicInfo({isDynamicStage : data.isDynamicStage, dynamicStageId : data.dynamicStageId})
		this.updateEntryUserNum(data.entryUserNum)
		this.updatePlayingUserNum(data.playingUserNum)
		this.updateWaitUserNum(data.waitUserNum)
		this.updateOutUserNum(data.outUserNum)
		this.updatePlayerNum(data.playerNum)
		this.updateScore({baseScore : data.baseScore, outScore : data.outScore})
		this.updateStatus(data.status)
		this.updatePrizePool(data.prizePool)
		this.updateRevivalNum(data.revivedNum)
	}

	updateRevivalNum(revivedNum: number = 0): void {
		console.debug("BaseInfo:updateRevivalNum", revivedNum);
		this.revivedNum = revivedNum;
	}

	updateEntryUserNum(entryUserNum: number = 0): void {
		console.debug("BaseInfo:updateEntryUserNum", entryUserNum);
		this.entryUserNum = entryUserNum;
	}

	updatePlayingUserNum(playingUserNum: number = 0): void {
		console.debug("BaseInfo:updatePlayingUserNum", playingUserNum);
		this.playingUserNum = playingUserNum;
	}

	updateOutUserNum(outUserNum: number = 0): void {
		console.debug("BaseInfo:updateOutUserNum", outUserNum);
		this.outUserNum = outUserNum;
	}

	updateWaitUserNum(waitUserNum: number = 0): void {
		console.debug("BaseInfo:updateWaitUserNum", waitUserNum);
		this.waitUserNum = waitUserNum;
	}

	updatePlayerNum(playerNum: number = 0): void {
		console.debug("BaseInfo:updatePlayerNum", playerNum);
		this.playerNum = playerNum;
	}

	updatePrizePool(prizePool : AssetItem[] | any) {
		console.debug("BaseInfo:updatePrizePool", prizePool)
		this.prizePool = prizePool
	
		SafeEmit(this.handler,MatchHandler.EventType.PoolChange, this.prizePool)
    }

	updateDynamicInfo(info : {isDynamicStage : boolean, dynamicStageId : number}) {
		this.isDynamicStage = info.isDynamicStage
		this.dynamicStageId = info.dynamicStageId
	}

	updateGroupInfo(info) {
		console.debug("BaseInfo:updateGroupInfo", info);
		this.groupInfo.update(info);
	}

	updateStageGroupInfo(info : {doneGroups : StageGroupItem[], doingGroups : StageGroupItem[]}) {
		if (info) {
			if (info.doneGroups != null) {
				this.groupInfo.updateDoneGroups(info.doneGroups);
			}
			if (info.doingGroups != null) {
				this.groupInfo.updateDoingGroups(info.doingGroups);
			}
		}
	}

	updateScore(baseInfo: { baseScore: number, outScore: number }): void {
		if (this.baseScore != baseInfo.baseScore) {
			this.baseScore = baseInfo.baseScore
			SafeEmit(this.handler,MatchHandler.EventType.MatchBaseScoreChange, this.baseScore)
		}

		if (this.outScore != baseInfo.outScore) {
			this.outScore = baseInfo.outScore
			SafeEmit(this.handler,MatchHandler.EventType.MatchOutScoreChange, this.outScore)
		}
	}

	updateStatus(status:number): void {
		console.debug("BaseInfo:updateStatus", status, this.status);
		if (this.status != status) {
			this.status = status
		}
	}

	getEntryUserNum(): number {
        return this.entryUserNum || 0;
    }

    getPlayingUserNum(): number {
        return this.playingUserNum || 0;
    }

    getOutUserNum(): number {
        return this.outUserNum || 0;
    }

    getWaitUserNum(): number {
        return this.waitUserNum || 0;
    }

    getPlayerNum(): number {
        return this.playerNum || 0;
    }

    getRevivalNum(): number {
        return this.revivedNum || 0;
    }

	getOutScore(): number {
		return this.outScore;
	}

	getMatchKey(): string {
		return this.matchKey;
	}

	getStageInfo() {
		return this.stage;
	}

	getGroupInfo(){
		return this.groupInfo
	}

	getGroupUserNumByID(groupID:number){
		let doings = this.groupInfo.getDoingGroups()
		for (let index = 0; index < doings.length; index++) {
			const item = doings[index];
			if (item.groupID == groupID){
				return item.userNum
			}
		}

		let done = this.groupInfo.getDoneGroups()
		for (let index = 0; index < done.length; index++) {
			const item = done[index];
			if (item.groupID == groupID){
				return item.userNum
			}
		}
	}

	getGroupUsersByID(groupID:number){
		let doings = this.groupInfo.getDoingGroups()
		for (let index = 0; index < doings.length; index++) {
			const item = doings[index];
			if (item.groupID == groupID){
				return item.uids
			}
		}

		let done = this.groupInfo.getDoneGroups()
		for (let index = 0; index < done.length; index++) {
			const item = done[index];
			if (item.groupID == groupID){
				return item.uids
			}
		}
	}

	getPrizePool(){
		return this.prizePool
	}

	getDynamicStageId(){
		return this.dynamicStageId
	}

	setMatchKey(key : string) {
		this.matchKey = key
	}
}

import { MateMgr } from "app/domain/mate/MateMgr";
import { MatchManager } from "./MatchManager";
import { Desk } from "app/domain/mate/Desk";
import { IJoinDeskMsg, ILeaveDeskMsg, IMsgMatchOver, IMsgOneGameResult, IReadyMsg } from "idl/tss/match_v2/matematch.v1";
import { App } from "app/App";
import { MatchInfo } from "../model/GameData";
import { EmptyClass, EventTargetExtends } from "bos/exports";


export class MateMatch extends EventTargetExtends(EmptyClass) {

    public target: MatchManager;
    
    init(target: MatchManager) {
        this.target = target;
        App.mateMgr.on(MateMgr.EventType.ON_JOIN_DESK, this.onEnterDesk, this);
        App.mateMgr.on(MateMgr.EventType.ON_LEAVE_DESK, this.onLeaveDesk, this);
        App.mateMgr.on(MateMgr.EventType.ON_READY_DESK, this.onReadyDesk, this);
        App.mateMgr.on(MateMgr.EventType.ON_USER_JOIN, this.onOtherJoin, this);
        App.mateMgr.on(MateMgr.EventType.ON_USER_LEAVE, this.onOtherLeave, this);
        App.mateMgr.on(MateMgr.EventType.ON_USER_READY, this.onOtherReady, this);
        App.mateMgr.on(MateMgr.EventType.ON_MATCH_END, this.onMatchEnd, this);
        App.mateMgr.on(MateMgr.EventType.ON_GAME_RESULT, this.onGameResult, this);
    }

    release() {
        App.mateMgr.removeAll(this);
    }

    onEnterDesk(data: Desk) {
        console.log('=mateMatch=onEnterDesk==');
        this.target.emit(MateMgr.EventType.ON_JOIN_DESK, data);
    }
    onLeaveDesk(data: Desk) {
        console.log('=mateMatch=onLeaveDesk==');
        this.target.emit(MateMgr.EventType.ON_LEAVE_DESK, data);
    }
    onReadyDesk(data: Desk) {
        console.log('=mateMatch=onReadyDesk==');
        this.target.emit(MateMgr.EventType.ON_READY_DESK, data);
    }
    onOtherJoin(data: IJoinDeskMsg) {
        console.log('=mateMatch=onOtherJoin==');
        this.target.emit(MateMgr.EventType.ON_USER_JOIN, data);
    }
    onOtherLeave(data: ILeaveDeskMsg) {
        console.log('=mateMatch=onOtherLeave==');
        this.target.emit(MateMgr.EventType.ON_USER_LEAVE, data);
    }
    onOtherReady(data: IReadyMsg) {
        console.log('=mateMatch=onOtherReady==');
        this.target.emit(MateMgr.EventType.ON_USER_READY, data);
    }

    onGameResult(data: IMsgOneGameResult) {
        console.log('=mateMatch=onGameResult==', data);
        this.target.emit(MateMgr.EventType.ON_GAME_RESULT, data);
    }

    onMatchEnd(data: IMsgMatchOver) {
        console.log('=mateMatch=onMatchEnd==');
        this.target.emit(MateMgr.EventType.ON_MATCH_END, data);
    }

    getMatchInfo(): MatchInfo {
        let info = App.mateMgr.getDesk();
        if (info) {
            return {
                baseScore: info.ante,
                matchName: App.mateMgr.getMatchName(),
            }
        }
    }

}
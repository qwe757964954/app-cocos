import { _decorator, Label, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Room } from 'game/pdk/Room';
import { CallDealerInfo, CallDealerResult, CallScoreInfo, CallScoreResult, ExtendTable, MsgTableInfo, OpInfo, PlayCardInfo, PlayCardResult, RaiseScoreResult } from 'game/pdk/idl/tss/pdk/extendtable.v3';
import { Table } from 'idl/tss/game/table.v2';
interface ClockData {
    seat: number;
    time: number;
    extraTime?: number;
}

@ccclass('ClockView')
export class ClockView extends XComponent {
    @property(Node)
    public clockView: Node;
    @property(Label)
    public timeLab: Label;
    
    clockData: ClockData;
    posConfig: Array<Vec3>;
    updateTimeLab: Function;


    onLoad() {
        this.posConfig = [new Vec3(0, -66.5), new Vec3(273.5, 564.5),new Vec3(-273.5, 564.5)];
        Room.eventSystem.on(ExtendTable.NotifyCallScoreStart.name, this.onNotifyCallScoreStart, this);
        Room.eventSystem.on(ExtendTable.NotifyCallScoreResult.name, this.onNotifyCallScoreResult, this);
        Room.eventSystem.on(ExtendTable.NotifyCallDealerStart.name, this.onNotifyCallDealerStart, this);
        Room.eventSystem.on(ExtendTable.NotifyCallDealerResult.name, this.onNotifyCallDealerResult, this);
        Room.eventSystem.on(ExtendTable.NotifyRaiseScoreStart.name, this.onNotifyRaiseScoreStart, this);
        Room.eventSystem.on(ExtendTable.NotifyRaiseScoreResult.name, this.onNotifyRaiseScoreResult, this);
        Room.eventSystem.on(ExtendTable.NotifyPlayStart.name, this.onNotifyPlayStart, this);
        Room.eventSystem.on(ExtendTable.NotifyPlayCard.name, this.onNotifyPlayCard, this);
        Room.eventSystem.on(Table.NotifyReconnect.name, this.onNotifyReconnect, this);

    }
    
    onDisable() {
        Room.eventSystem.removeAll(this);
    }

    onNotifyReconnect(data: MsgTableInfo) {
        for (const v of data.users) {
            if (v.opInfo) {
                let player = Room.gameData.getPlayerByID(v.uid);
                let time = v.opInfo.play_card_info?.time || (v.opInfo.call_score_info?.time || 0);
                this.updateClockTime({seat: player.getLocalSeat(), time: time});
                return;
            }
        }
        this.clockView.active = false;
    }

    onNotifyCallScoreStart(data: CallScoreInfo) {
        if (data.minScore <= data.maxScore) {
            let player = Room.gameData.getPlayerByID(data.uid);
            this.updateClockTime({seat: player.getLocalSeat(), time: data.time});
        }
    }
    onNotifyCallScoreResult(data: CallScoreResult) {
        this.clockView.active = false;
    }
    onNotifyCallDealerStart(data: CallDealerInfo) {
        let player = Room.gameData.getPlayerByID(data.uid);
        this.updateClockTime({seat: player.getLocalSeat(), time: data.time});
    }
    onNotifyCallDealerResult(data: CallDealerResult) {
        this.clockView.active = false;
    }
    onNotifyRaiseScoreStart(data: OpInfo) {
        if(data.uid == Room.gameData.getMyID()) {
            this.updateClockTime({seat: 1, time: data.time});
        }
    }
    onNotifyRaiseScoreResult(data: RaiseScoreResult) {
        if (data.isEnd || data.uid == Room.gameData.getMyID()) {
            this.clockView.active = false;
        }
    }
    onNotifyPlayStart(data: PlayCardInfo) {
        let player = Room.gameData.getPlayerByID(data.uid);
        this.updateClockTime({seat: player.getLocalSeat(), time: data.time + (data.extraTime || 0)});
    }
    onNotifyPlayCard(data: PlayCardResult) {
        this.clockView.active = false;
    }

    updateClockTime(data: ClockData) {
        this.stopTimer();
        let player = Room.gameData.getPlayerByLocalSeat(data.seat);
        let totalTime: number = data.time + (data.extraTime || 0);
        let myLastCard = false;
        // let myLastCard = data.seat == 1 && player.cardLeftNum == 1 && Room.gameData.curStage == GameStage.PlayCard;
        player.opTimeSwitch = {time: (data.seat == 1 && !myLastCard) ? data.time : 0};
        this.clockView.active = !myLastCard && totalTime > 0;
        this.clockView.setPosition(this.posConfig[data.seat - 1]);
        console.log('ClockView==updateClockTime==', totalTime, this.clockView.active, this.posConfig[data.seat - 1]);
        if (this.clockView.active) {
            this.clockData = data;
            this.timeLab.string = totalTime.toString();
            this.updateTimeLab = () => {
                totalTime -= 1;
                if (totalTime > 0) {
                    this.timeLab.string = totalTime.toString();
                } else {
                    this.timeLab.string = '';
                    this.clockView.active = false;
                    this.stopTimer();
                }
            }
            this.schedule(this.updateTimeLab, 1, totalTime);
        }
    }

    stopTimer() {
        this.clockView.active = false;
        if (this.updateTimeLab) {
            this.unschedule(this.updateTimeLab);
            this.updateTimeLab = null
        }
    }


    resetVIew() {
        this.stopTimer();
        this.clockData = {seat: 1, time: 0};
    }

    update(deltaTime: number) {

    }
}
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Room } from 'game/room/Room';
import { PBRegularCommon } from 'app/domain/match/code/code';
import { Label } from 'cc';
import { Utils } from 'app/utils/Utils';
import { RichText } from 'cc';
import { MatchHandler } from 'app/domain/match/match/handler/MatchHandler';
import { Table } from 'idl/tss/game/table.v2';
import { MTable } from 'app/domain/match/match/data/TableInfo';
import { TimeUtil } from 'bos/exports';

@ccclass('RegularInfo')
export class RegularInfo extends XComponent {

    @property(Label)
    public timeLab: Label;

    @property(RichText)
    public roundText: RichText;

    @property(RichText)
    public outText: RichText;

    @property(Node)
    public clockNode: Node;

    @property(Node)
    public infoNode: Node;

    public timerCall: Function;

    start() {
        this.updateMatchInfo();
        Room.eventSystem.on(Table.NotifyReconnect.name, this.onNotifyReconnect, this);
        Room.matchMgr.on(MatchHandler.EventType.MatchTableStart, this.onMatchTableStart, this);
    }

    onDestroy(): void {
        if (this.timerCall) {
            this.unschedule(this.timerCall);
            this.timerCall = null;
        }
        Room.matchMgr.removeAll(this);
    }

    onNotifyReconnect() {
        this.updateMatchInfo();
    }

    onMatchTableStart(table : MTable, isMeIn : boolean) {
        isMeIn && this.updateMatchInfo();
    }

    setViewTimes(delta : number): string {
        let str: string = `00:00`;
        if (delta > 0) {
            let min = Math.floor(delta / 60)
            let sec = delta - min * 60;
            str = `${Utils.twoDigit(min)}:${Utils.twoDigit(sec)}`;
        }
        return str;
    }
    
    updateMatchInfo() {
        let roomInfo = Room.matchMgr.getRoomInfo();
        let stageInfo = Room.matchMgr.getShowStageInfo();
        if(!stageInfo || !roomInfo) {return}
        let overTimes = Math.ceil(roomInfo.baseInfo.getStageInfo().getOverTimes());
        let delta = overTimes - TimeUtil.getTime();
        let stageEndType = stageInfo?.endInfo?.stageEndType;
        let timeOver = stageEndType == PBRegularCommon.StageEndTypeByTime || stageEndType == PBRegularCommon.StageEndTypeByUserNumAndTime;
        if (timeOver && stageInfo.stageType == PBRegularCommon.StageTypeStrike && delta > 0) {
            this.timeLab.string = this.setViewTimes(delta);
            if (!this.timerCall) {
                this.timerCall = () =>{
                    delta = overTimes - TimeUtil.getTime();
                    if(delta > 0) {
                        this.timeLab.string = this.setViewTimes(delta);
                    } else {
                        this.unschedule(this.timerCall);
                        this.timerCall = null;
                    }
                }
                this.schedule(this.timerCall, 1)
            }
            this.showClockNode(true);
        } else {
            this.timeLab.string = '';
            this.showClockNode();
        }

        let outText = '';
        let roundText = '';
        if (stageInfo.stageType == PBRegularCommon.StageTypeStrike) {
            roundText = `<color=#FFFFFF>本轮</color><color=#FFE87B>${stageInfo.totalNum}</color><color=#FFFFFF>进</color><color=#FFE87B>${stageInfo.promotionNum}</color>`;
            outText = `<color=#FFFFFF>淘汰分 </color><color=#FFE87B>${stageInfo.outScore}</color>`;
        } else if (stageInfo.stageType == PBRegularCommon.StageTypeFinality) {
            if (stageInfo.isFinallyRound) {
                roundText = `<color=#FFFFFF>本轮</color><color=#FFE87B>决胜轮</color>`;
                outText = `<color=#FFFFFF>第</color><color=#FFE87B>${stageInfo.gameNo}/${stageInfo.endInfo.gameNum}</color><color=#FFFFFF>局</color>`;
            } else {
                if (stageInfo.promotionType == PBRegularCommon.PromotionTypeTableRank) {
                    roundText = `<color=#FFFFFF>本桌前</color><color=#FFE87B>${stageInfo.promotionNum}</color><color=#FFFFFF>晋级</color>`;
                } else {
                    roundText = `<color=#FFFFFF>本轮</color><color=#FFE87B>${stageInfo.totalNum}</color><color=#FFFFFF>进</color><color=#FFE87B>${stageInfo.promotionNum}</color>`;
                }
                outText = `<color=#FFFFFF>第</color><color=#FFE87B>${stageInfo.gameNo}/${stageInfo.endInfo.gameNum}</color><color=#FFFFFF>局</color>`;
            }
        }
        this.outText.string = outText;
        this.roundText.string = roundText;
    }

    showClockNode(showTime: boolean = false) {
        this.clockNode.active = showTime;
    }
}
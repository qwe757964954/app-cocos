import { _decorator, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Log } from 'bos/exports';
import { Room } from 'game/pdk/Room';
import { CallScoreInfo ,CallScoreResult, ExtendTable, MsgTableInfo} from 'game/pdk/idl/tss/pdk/extendtable.v3';
import { Button } from 'cc';
import { Sprite } from 'cc';
import { SpriteFrame } from 'cc';
import { Label } from 'cc';
import { Color } from 'cc';
import { GameStage, ScoreType } from 'game/pdk/model/GameConst';
import { MsgManaged, Table } from 'idl/tss/game/table.v2';

@ccclass('CallScore')
export class CallScore extends XComponent {

    @property(Node)
    public btnViews: Node;
    @property(SpriteFrame)
    public GraySpriteFrame: SpriteFrame;
    @property(SpriteFrame)
    public YellowSpriteFrame: SpriteFrame;
    

    onLoad() {
        Room.eventSystem.on(Table.NotifyManaged.name, this.onNotifyManaged, this);
        Room.eventSystem.on(Table.NotifyReconnect.name, this.onNotifyReconnect, this);
        Room.eventSystem.on(ExtendTable.NotifyCallScoreStart.name, this.onNotifyCallScoreStart, this);
        Room.eventSystem.on(ExtendTable.NotifyCallScoreResult.name, this.onNotifyCallScoreResult, this);
    }

    protected start(): void {
        this.btnViews.active = false;
    }

    onDisable() {
        Room.eventSystem.removeAll(this);
    }

    onNotifyManaged(msg: MsgManaged) {
        if (Room.gameData.curStage == GameStage.CallScore && msg.uid == Room.gameData.getMyID()) {
            let isShow = !msg.isManaged && Room.gameData.optUid == msg.uid;
            this.btnViews.active = isShow;
            if (isShow) {
                let score = Room.gameData.scoreInfo.get(ScoreType.CallScore) || 0;
                this.updateCallBtn(score + 1);
            }
        }
    }

    onNotifyReconnect(data: MsgTableInfo) {
        let info: CallScoreInfo;
        if (Room.gameData.curStage == GameStage.CallScore) {
            for (const v of data.users) {
                if (v.opInfo && v.uid == Room.gameData.getMyID()) {
                    info = v.opInfo.call_score_info;
                    break;
                }
            }
        }
        this.btnViews.active = !!info;
        info && this.updateCallBtn(info.minScore);
    }

    onNotifyCallScoreStart(data: CallScoreInfo) {
        let mine = Room.gameData.getMySelf();
        if (data.uid == mine.uid) {
            this.btnViews.active = !mine.isAI;
            !mine.isAI && this.updateCallBtn(data.minScore);
        }
    }

    updateCallBtn(minScore: number = 1) {
        let children = this.btnViews.children;
        if(minScore >= children.length) {
            this.btnViews.active = false;
            return;
        }
        for (let i = 1; i < this.btnViews.children.length; i++) {
            let btn = this.btnViews.children[i];
            let isEnable = i >= minScore;
            let colorStr = isEnable ? '#713C1F' : '#494949';
            btn.getComponent(Button).interactable = isEnable;
            btn.getChildByName('Label').getComponent(Label).color = new Color(colorStr);
            btn.getComponent(Sprite).spriteFrame = isEnable ? this.YellowSpriteFrame : this.GraySpriteFrame;
        }
    }

    onNotifyCallScoreResult(data: CallScoreResult) {
        if (data.uid == Room.gameData.getMyID() || data.bottomCards?.length > 0) {
            this.btnViews.active = false;
        }
    }

    onClickCallScore(event, value) {
        this.btnViews.active = false;
        Log.d('==CallScore=onClickCallScore=', value);
        Room.msgHandler.sendTableAction(ExtendTable.CallScore, {score: value});
    }
}
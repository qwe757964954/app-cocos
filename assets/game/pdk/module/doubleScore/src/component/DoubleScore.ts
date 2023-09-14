import { _decorator, Animation, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Room } from 'game/pdk/Room';
import { OpInfo, RaiseScoreResult, MsgTableInfo, ExtendTable } from 'game/pdk/idl/tss/pdk/extendtable.v3';
import { MsgManaged, Table } from 'idl/tss/game/table.v2';
import { GameStage, OPCODE, ScoreType } from 'game/pdk/model/GameConst';

@ccclass('DoubleScore')
export class DoubleScore extends XComponent {

    @property(Node)
    public btnViews: Node;
    @property(Node)
    public tipsView: Node;


    onLoad() {
        this.showTipsView();
        this.btnViews.active = false;
        Room.eventSystem.on(Table.NotifyManaged.name, this.onNotifyManaged, this);
        Room.eventSystem.on(Table.NotifyReconnect.name, this.onNotifyReconnect, this);
        Room.eventSystem.on(ExtendTable.NotifyRaiseScoreStart.name, this.onNotifyRaiseScoreStart, this);
        Room.eventSystem.on(ExtendTable.NotifyRaiseScoreResult.name, this.onNotifyRaiseScoreResult, this);
    }

    onDisable() {
        Room.eventSystem.removeAll(this);
    }

    showTipsView(bool: boolean = false) {
        this.tipsView.active = bool;
        bool && this.tipsView.getComponent(Animation).play();
    }

    onNotifyReconnect(data: MsgTableInfo) {
        console.log('==onNotifyReconnect==', data)
        this.btnViews.active = false;
        if (Room.gameData.curStage == GameStage.Double) {
            let mine = Room.gameData.getMySelf();
            let n = mine.scoreInfo.get(ScoreType.RaiseScore);
            this.btnViews.active = n == undefined;
            this.showTipsView(n != undefined);
        } else {
            this.showTipsView();
        }
    }

    // 收到自动托管消息时候
    onNotifyManaged(msg: MsgManaged) {
        if (Room.gameData.curStage == GameStage.Double && msg.uid == Room.gameData.getMyID()) {
            let mine = Room.gameData.getMySelf();
            let double = mine.scoreInfo.get(ScoreType.RaiseScore) || 0;
            this.btnViews.active = !msg.isManaged && double == 0;
            this.showTipsView(msg.isManaged && double > 0);
        }
    }

    onNotifyRaiseScoreStart(data: OpInfo) {
        let mine = Room.gameData.getMySelf();
        if (data.uid == mine.uid && !mine.isAI) {
            this.btnViews.active = true;
            this.showTipsView();
        }
    }

    onNotifyRaiseScoreResult(data: RaiseScoreResult) {
        if (data.isEnd || data.uid == Room.gameData.getMyID()) {
            this.btnViews.active = false;
            this.showTipsView(!data.isEnd);
        }
    }

    // 点击不加倍
    onClickNoDoubleBtn() {
        Room.msgHandler.sendTableAction(ExtendTable.DoOperate, { opcode: OPCODE.PASS });
        this.btnViews.active = false;
    }

    // 点击加倍
    onClickDoubleBtn() {
        Room.msgHandler.sendTableAction(ExtendTable.DoOperate, { opcode: OPCODE.RAISE_SCORE });
        this.btnViews.active = false;
    }

    // 点击超级加倍
    onClickSuperDoubleBtn() {
        Room.msgHandler.sendTableAction(ExtendTable.DoOperate, { opcode: OPCODE.SUPER_RAISE_CORE });
        this.btnViews.active = false;
    }


}
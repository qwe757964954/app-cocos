import { _decorator, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Label } from 'cc';
import { Room } from 'game/pdk/Room';
import { MsgManaged, Table } from 'idl/tss/game/table.v2';
import { CallDealerInfo, CallDealerResult, ExtendTable, MsgTableInfo } from 'game/pdk/idl/tss/pdk/extendtable.v3';
import { GameStage, OPCODE, ScoreType } from 'game/pdk/model/GameConst';

@ccclass('CallDealer')
export class CallDealer extends XComponent {

    @property(Node)
    public btnViews: Node;
    @property(Label)
    public callLab: Label;

    onLoad() {
        Room.eventSystem.on(Table.NotifyManaged.name, this.onNotifyManaged, this);
        Room.eventSystem.on(Table.NotifyReconnect.name, this.onNotifyReconnect, this);
        Room.eventSystem.on(ExtendTable.NotifyCallDealerStart.name, this.onNotifyCallDealerStart, this);
        Room.eventSystem.on(ExtendTable.NotifyCallDealerResult.name, this.onNotifyCallDealerResult, this);
    }

    protected start(): void {
        this.btnViews.active = false;
    }

    onDisable() {
        Room.eventSystem.removeAll(this);
    }

    onNotifyManaged(msg: MsgManaged) {
        this.showCallBtn(!msg.isManaged && Room.gameData.getMyID() == msg.uid);
        if (this.btnViews.active) {
            let callScore = Room.gameData.scoreInfo.get(ScoreType.CallDealer) || 0;
            this.callLab.string = callScore > 0 ? '抢地主' : '叫地主';
        }
    }

    onNotifyReconnect(data: MsgTableInfo) {
        let info: CallDealerInfo;
        if (Room.gameData.curStage == GameStage.CallDealer) {
            for (const v of data.users) {
                if (v.opInfo && v.uid == Room.gameData.getMyID()) {
                    info = v.opInfo.call_dealer_info;
                    break;
                }
            }
        }
        this.showCallBtn(!!info);
        if (this.btnViews.active) {
            this.callLab.string = info?.caller && info.caller > 0 ? '抢地主' : '叫地主';
        }
    }

    onNotifyCallDealerStart(data: CallDealerInfo) {
        let mine = Room.gameData.getMySelf();
        this.showCallBtn(data.uid == mine.uid && !mine.isAI);
        if (this.btnViews.active) {
            this.callLab.string = data.caller && data.caller > 0 ? '抢地主' : '叫地主';
        }
    }

    onNotifyCallDealerResult(data: CallDealerResult) {
        if (data.uid == Room.gameData.getMyID()) {
            this.showCallBtn();
        }
    }

    showCallBtn(isShow: boolean = false) {
        let isMe = Room.gameData.curStage == GameStage.CallDealer && Room.gameData.optUid == Room.gameData.getMyID();
        this.btnViews.active = isShow && isMe;
    }

    onClickNoCall() {
        Room.msgHandler.sendTableAction(ExtendTable.DoOperate, { opcode: OPCODE.PASS });
    }

    onClickCall() {
        let code = this.callLab.string == '叫地主' ? OPCODE.CALL_DEALER : OPCODE.CALL_DEALER_FORCE;
        console.log('==onClickCall==', code);
        Room.msgHandler.sendTableAction(ExtendTable.DoOperate, { opcode: code });
    }
}
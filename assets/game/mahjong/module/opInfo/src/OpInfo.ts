import { _decorator, Button, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { OpCode } from 'game/mahjong/config/OpCode';
import { MahjongRoom } from 'game/mahjong/Room';
import { GamePlayer } from 'game/mahjong/model/GamePlayer';
import { Audio, Log } from 'bos/exports';
import { Event } from 'game/mahjong/config/Event';
import { ExtendTable, OperateInfo, OperateOption } from 'game/mahjong/idl/tss/mahjong/extendtable';
import { AudioUtils } from 'game/mahjong/AudioUtils';
import { AudioConfig } from 'game/mahjong/config/AudioConfig';

@ccclass('OpInfo')
export class OpInfo extends XComponent {
    @property(Node)
    public opBtns: Node | null = null;

    @property(Node)
    public guoBtn: Node | null = null;

    @property(Node)
    public huBtn: Node | null = null;

    @property(Node)
    public gangBtn: Node | null = null;

    @property(Node)
    public pengBtn: Node | null = null;

    mPlayer: GamePlayer;
    mOpOptionData: OperateOption;

    //可以显示响应按钮的opCode
    btnCodeMap = new Map<number, Node>();

    onLoad(): void {
        MahjongRoom.eventSystem.on(Event.RESET_VIEW, this.resetView, this);
        this.mPlayer = MahjongRoom.gameData.getMySelf();
        this.mPlayer.on(this.mPlayer.EventType.PLAYER_OP_START, this.onOpStart, this);
        this.mPlayer.on(this.mPlayer.EventType.PLAYER_OP_RESULT, this.resetView, this);
    }

    start(): void {
        this.btnCodeMap.set(OpCode.OPE_PASS, this.guoBtn);
        this.btnCodeMap.set(OpCode.OPE_HU, this.huBtn);
        this.btnCodeMap.set(OpCode.OPE_ZI_MO, this.huBtn);
        this.btnCodeMap.set(OpCode.OPE_QIANG_HU, this.huBtn);
        this.btnCodeMap.set(OpCode.OPE_AN_GANG, this.gangBtn);
        this.btnCodeMap.set(OpCode.OPE_PENG_GANG, this.gangBtn);
        this.btnCodeMap.set(OpCode.OPE_BU_GANG, this.gangBtn);
        this.btnCodeMap.set(OpCode.OPE_PENG, this.pengBtn);
    }

    onDestroy(): void {
        this.mPlayer?.removeAll(this);
    }

    //点击操作,发送操作code  碰/杠/胡/过
    opClick(data: OperateInfo) {
        let opGroups = data.groups;
        if (opGroups.length == 1) { //每个操作只有一种选择
            let msg = {
                opCode: data.opCode,
                opCards: opGroups[0].cards,
            };
            Log.d("==opClick=msg=", msg);
            MahjongRoom.msgHandler.sendTableAction(ExtendTable.Operate, msg);
        }
        else { //每个操作有多种选择，需要显示多个牌组选项，此处暂时做选择第一个处理，后期弥补
            MahjongRoom.eventSystem.emit(Event.SHOW_OP_GROUPS, data);
        }
        Audio.Effect.playOneShot(AudioUtils.getAudioPath(AudioConfig.audio_operate));
        this.resetView();
    }

    getShowBtn = function (code: number): Node | null {
        for (let [opCode, btn] of this.btnCodeMap) {
            if (code == opCode) {
                return btn;
            }
        }
        return null;
    }

    resetView() {
        this.guoBtn.active = false;
        this.huBtn.active = false;
        this.gangBtn.active = false;
        this.pengBtn.active = false;
        this.opBtns.active = false;
    }

    update(deltaTime: number) {

    }

    onOpStart(msg: OperateOption) {
        Log.d("=OpInfo=onOpStart==", msg);
        this.mOpOptionData = msg;
        let opInfos = msg.opInfos;
        if (opInfos != null && opInfos.length > 0) {
            this.opBtns.active = true;
            for (let opInfo of opInfos) {
                let code = opInfo.opCode;
                let btn = this.getShowBtn(code);
                Log.d("==btn==", btn, opInfo)
                if (btn) {
                    btn.off(Node.EventType.TOUCH_END);
                    btn.on(Node.EventType.TOUCH_END, () => {
                        this.opClick(opInfo);
                    }, this);
                    btn.active = true;
                }
            }
        }
        else {
            this.resetView();
        }
    }
}
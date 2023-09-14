import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Label } from 'cc';
import { OpCode } from 'game/mahjong/config/OpCode';
import { Audio, Log } from 'bos/exports';
import { MahjongRoom } from 'game/mahjong/Room';
import { GamePlayer } from 'game/mahjong/model/GamePlayer';
import { PlayerOpResult } from 'game/mahjong/model/DataModel';
import { AudioUtils } from 'game/mahjong/AudioUtils';
import { AudioConfig } from 'game/mahjong/config/AudioConfig';
import { OperateData } from 'game/mahjong/idl/tss/mahjong/extendtable';

@ccclass('OpResult')
export class OpResult extends XComponent {

    @property(Label)
    public toastLabel: Label | null = null;

    player: GamePlayer;

    start() {

    }

    update(deltaTime: number) {

    }

    init(seat: number) {
        Log.d("=OpResult=init=", seat);
        this.player = MahjongRoom.gameData.getPlayerByLocalSeat(seat);
        this.player.on(this.player.EventType.PLAYER_OP_RESULT, this.onPlayerOpResult.bind(this), this);
    }

    onDestroy(): void {
        this.player?.removeAll(this);
    }

    onPlayerOpResult(data: PlayerOpResult) {
        let opResult = data.opResult;
        let opData = opResult.opData;
        this.playOpAnim(opData);
    }
    
    getAudioName(tByte: number): string {
        let typeKeyMap = ["card_wan_","card_tong_","card_tiao_","card_feng_","card_zi_"];
        let byte = tByte >> 8;
        let type = byte >> 4;
        let value = byte & 0x0f;
        let audioName = typeKeyMap[type].concat(value.toLocaleString());
        Log.d("==getAudioName==", tByte.toString(16), type, value, typeKeyMap[type], audioName);
        return audioName;
    }

    //播放操作的动画
    playOpAnim(opData: OperateData) {
        Log.d("==playOpAnim==", opData)
        let opCode = opData.opCode;
        let opCard = opData.opCard;
        switch (opCode) {
            case OpCode.OPE_GRAB: { //抓牌
                Audio.Effect.playOneShot(AudioUtils.getAudioPath(AudioConfig.audio_get_card));
                break;
            }
            case OpCode.OPE_OUT_CARD: { //出牌 （手牌区移除一张，出牌区添加一张）
                Audio.Effect.playOneShot(AudioUtils.getAudioPath(AudioConfig.audio_uc));
                let outName = this.getAudioName(opCard);
                Audio.Effect.playOneShot(AudioUtils.getAudioPath(AudioConfig[outName], this.player.gender));
                break;
            }
            case OpCode.OPE_CHI: {
                this.showLabel("吃");
                Audio.Effect.playOneShot(AudioUtils.getAudioPath(AudioConfig.chi, this.player.gender));
                break;
            }
            case OpCode.OPE_PENG: {
                this.showLabel("碰");
                Audio.Effect.playOneShot(AudioUtils.getAudioPath(AudioConfig.peng, this.player.gender));
                break;
            }
            case OpCode.OPE_PENG_GANG:
            case OpCode.OPE_AN_GANG:
            case OpCode.OPE_BU_GANG: {
                this.showLabel("杠");
                Audio.Effect.playOneShot(AudioUtils.getAudioPath(AudioConfig.gang, this.player.gender));
                break;
            }
            case OpCode.OPE_HU: {   // 点炮
                this.showLabel("胡");
                Audio.Effect.playOneShot(AudioUtils.getAudioPath(AudioConfig.hu, this.player.gender));
                break;
            }
            case OpCode.OPE_ZI_MO: {  // 自摸胡
                this.showLabel("自摸");
                Audio.Effect.playOneShot(AudioUtils.getAudioPath(AudioConfig.zimo, this.player.gender));
                break;
            }
            case OpCode.OPE_QIANG_HU: {   // 抢杠胡
                this.showLabel("抢杠胡");
                Audio.Effect.playOneShot(AudioUtils.getAudioPath(AudioConfig.hu, this.player.gender));
                break;
            }
            default: {
                break;
            }
        }
    }

    showLabel(text: string) {
        Log.d("=showLabel=text=", text);
        this.toastLabel.string = text;
        this.toastLabel.node.active = true; // 显示 Label
        this.scheduleOnce(this.hideLabel, 2); // 2秒后调用隐藏 Label 的函数
    }

    hideLabel() {
        this.toastLabel.node.active = false; // 隐藏 Label
    }
}
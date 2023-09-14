import { _decorator, Toggle } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Audio, Log, uiMgr } from 'bos/exports';

@ccclass('RoomSet')
export class Set extends XComponent {

    @property(Toggle)
    public soundToggle: Toggle | null = null;

    @property(Toggle)
    public shakeToggle: Toggle | null = null;

    @property(Toggle)
    public musicToggle: Toggle | null = null;

    @property(Toggle)
    public rewardToggle: Toggle | null = null;

    @property(Toggle)
    public adaptionToggle: Toggle | null = null;

    @property(Toggle)
    public horToggle: Toggle | null = null;

    @property(Toggle)
    public verToggle: Toggle | null = null;

    onLoad(): void {
        //TODO: 需要根据本地保存的设置，初始化Toggle的状态
        
    }

    start() {

    }

    update(deltaTime: number) {

    }

    onClose() {
        uiMgr.removePopup(this.node);
    }

    onSoundCheck() {
        Log.d("==onSoundCheck==");
        if (this.soundToggle.isChecked) {
            Audio.Effect.resume();
        } else {
            Audio.Effect.pause();
        }
    }

    onShakeCheck() {
        Log.d("==onShakeCheck==");
    }

    onMusicCheck() {
        Log.d("==onMusicCheck==");
        if (this.musicToggle.isChecked) {
            Audio.BGM.resume();
        } else {
            Audio.BGM.pause();
        }
    }

    onRewardCheck() {
        Log.d("==onRewardCheck==");
    }

    onAdaptionCheck() {
        Log.d("==onAdaptionCheck==");
    }

    onHorCheck() {
        Log.d("==onHorCheck==");
    }

    onVerCheck() {
        Log.d("==onVerCheck==");
    }
}
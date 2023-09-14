import { _decorator, AudioSource, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { AudioManager } from 'game/room/audio/AudioManager';

@ccclass('Audio')
export class Audio extends XComponent {

    @property(AudioSource)
    private mAudioSource: AudioSource = null!;

    @property(AudioSource)
    private sAudioSource: AudioSource = null!;

    protected onEnable(): void {
        //初始化audioSource
        AudioManager.instance.init(this.mAudioSource, this.sAudioSource);
        AudioManager.instance.playMusic(true);
    }
    
    start() {

    }

    update(deltaTime: number) {

    }
}
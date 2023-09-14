import { Audio } from 'bos/exports';
import { _decorator, AudioClip, Component } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioController')
export class AudioController extends Component {
    @property({
        visible: true,
        type: AudioClip,
    })
    public audioClip: AudioClip = null!;

    onLoad() {

    }

    play() {
        // 播放音效
        Audio.Effect.playOneShot(this.audioClip);
    }

    pause() {
        // 播放音效
        Audio.Effect.pause();
    }
}
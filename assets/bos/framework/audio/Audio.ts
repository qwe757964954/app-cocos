import { resLoader } from 'bos/exports';
import { _decorator, AudioClip, AudioSource } from 'cc';

class XAudioSource {
    private _source: AudioSource

    constructor(source: AudioSource) {
        this._source = source
    }

    get volume() { return this._source.volume }
    set volume(volume: number) { this._source.volume = volume }

    get active() { return this._source.node.active }
    set active(active: boolean) { this._source.node.active = active }

    play(clip: AudioClip|string) {
        if (!this.active) {
            return
        } else if (clip instanceof AudioClip) {
            this._source.clip = clip;
            this._source.play();
        } else {
            resLoader.loadAudioClip(clip, (err, clip: AudioClip) => {
                if (err) {
                    console.log(err);
                }
                else {
                    this.play(clip)     
                }
            });
        }
    }

    playOneShot(clip: AudioClip|string) {
        if (!this.active) {
            return
        } else if (clip instanceof AudioClip) {
            this._source.playOneShot(clip);
        } else {
            resLoader.loadAudioClip(clip, (err, clip: AudioClip) => {
                if (err) {
                    console.log(err);
                }
                else {
                    this.playOneShot(clip)     
                }
            });
        }
    }

    pause() {
        this._source.pause()
    }

    resume() {
        this._source.play()
    }
}

type AudioData = {
    BGM: AudioSource
    Effect: AudioSource,
}

export class Audio {

    static BGM : XAudioSource

    static Effect: XAudioSource

    static init(data: AudioData) {
        Audio.BGM = new XAudioSource(data.BGM)
        Audio.Effect = new XAudioSource(data.Effect)
    }
}


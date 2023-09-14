import { Log, resLoader } from "bos/exports";
import { AudioClip, AudioSource, assert, warn, clamp01, resources } from "cc";
export class AudioManager {
    private static _instance: AudioManager;
    private static _musicAudioSource?: AudioSource;
    private static _soundAudioSource?: AudioSource;
    static get instance () {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new AudioManager();
        return this._instance;
    }

    /**管理器初始化*/
    init (mAudioSource: AudioSource, sAudioSource: AudioSource) {
        AudioManager._musicAudioSource = mAudioSource;
        AudioManager._soundAudioSource = sAudioSource;
    }

      /**
     * 播放音乐
     * @param {Boolean} loop 是否循环播放
     */
    playMusic (loop: boolean) {
        const audioSource = AudioManager._musicAudioSource!;
        assert(audioSource, 'AudioManager not inited!');

        audioSource.loop = loop;
        if (!audioSource.playing) {
            audioSource.play();
        }
    }

     /**
     * 播放音效
     * @param {String} name 音效名称
     * @param {Number} volumeScale 播放音量倍数
     */
    playSound (path: string, volumeScale: number = 1 ) {
        const audioSource = AudioManager._soundAudioSource!;
        assert(audioSource, 'AudioManager not inited!');
        if (audioSource.enabled) {
            resLoader.loadAudioClip(path, function (err, audioClip) {
                if (!err && audioClip) {
                    // 注意：第二个参数 “volumeScale” 是指播放音量的倍数，最终播放的音量为 “audioSource.volume * volumeScale”
                    audioSource.playOneShot(audioClip, volumeScale);
                } else {
                    console.warn('==resLoader.loadAudioClip==', err)
                }
            })
        }
    }

    // 设置整体音量
    setVolume (flag: number) {
        const mAudioSource = AudioManager._musicAudioSource!;
        const sAudioSource = AudioManager._soundAudioSource!;
        assert(mAudioSource, 'AudioManager not inited!');
        flag = clamp01(flag);
        mAudioSource.volume = flag;
        sAudioSource.volume = flag;
    }

    //停止播放音乐
    stopMusic() {
        const mAudioSource = AudioManager._musicAudioSource!;
        mAudioSource.stop();
    }

    //停止播放音效
    pauseSound() {
        Log.d("==pauseSound==")
        const sAudioSource = AudioManager._soundAudioSource!;
        sAudioSource.enabled = false;
    }

    resumeSound() {
        Log.d("==resumeSound==")
        const sAudioSource = AudioManager._soundAudioSource!;
        sAudioSource.enabled = true;
    }

}
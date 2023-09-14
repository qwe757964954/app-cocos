import { App } from 'app/App';
import { Audio, storageMgr } from 'bos/exports';
import { _decorator, Component, Node, Toggle, Event } from 'cc';
const { ccclass, property, menu } = _decorator;

@ccclass('GameFunction')
@menu('setting/GameFunction')
export class GameFunction extends Component {

    @property({ type: Toggle })
    gameMusic: Toggle | null = null

    @property({ type: Toggle })
    gameSound: Toggle | null = null

    @property({ type: Toggle })
    gameVibrate: Toggle | null = null

    @property({ type: Toggle })
    autoUpdate: Toggle | null = null

    start() {
        this.init()
    }

    init() {
        this.updateButtonState()
    }

    setGameMusic(event: Event) {
        App.keys.setting
        let target = event.target as Node
        let toggle = target.getComponent(Toggle)
        storageMgr.set(App.keys.setting.GameMusic, !toggle.isChecked)
        if (!toggle.isChecked) {
            Audio.BGM.active = true
        } else {
            Audio.BGM.active = false
        }
    }

    setGameSound(event: Event) {
        let target = event.target as Node
        let toggle = target.getComponent(Toggle)
        storageMgr.set(App.keys.setting.GameSound, !toggle.isChecked)
        if (!toggle.isChecked) {
            Audio.Effect.active = true
        }
        else {
            Audio.Effect.active = false
        }
    }

    setGameVibrate(event: Event) {
        let target = event.target as Node
        let toggle = target.getComponent(Toggle)
        storageMgr.set(App.keys.setting.GameVibrate, !toggle.isChecked)
        if (!toggle.isChecked) {
            console.log("GameFunction setGameVibrate true")//开启震动
        }
        else {
            console.log("GameFunction setGameVibrate false")//关闭震动
        }
    }

    setAutoUpdate(event: Event) {
        let target = event.target as Node
        let toggle = target.getComponent(Toggle)
        storageMgr.set(App.keys.setting.AutoUpdate, !this.autoUpdate.isChecked)
        if (!toggle.isChecked) {
            console.log("GameFunction setAutoUpdate true")//开启自动更新
        }
        else {
            console.log("GameFunction setAutoUpdate false")//关闭自动更新
        }
    }

    updateButtonState() {
        this.updateGameMusicState()
        this.updateGameSoundState()
        this.updateGameVibrateState()
        this.updateAutoUpdateState()
    }

    updateGameMusicState() {
        if (!this.gameMusic) return
        let gameMusicState: boolean = true;
        let str: string | null = storageMgr.get(App.keys.setting.GameMusic);
        if (str == 'false') {
            gameMusicState = false
        } else {
            gameMusicState = true
        }
        this.gameMusic.isChecked = gameMusicState
    }

    updateGameSoundState() {
        if (!this.gameSound) return
        let gameSoundState: boolean = true;
        let str: string | null = storageMgr.get(App.keys.setting.GameSound);
        if (str == 'false') {
            gameSoundState = false
        } else {
            gameSoundState = true
        }
        this.gameSound.isChecked = gameSoundState
    }

    updateGameVibrateState() {
        if (!this.gameVibrate) return
        let gameVibrateState: boolean = true;
        let str: string | null = storageMgr.get(App.keys.setting.GameVibrate);
        if (str == 'false') {
            gameVibrateState = false
        } else {
            gameVibrateState = true
        }
        this.gameVibrate.isChecked = gameVibrateState
    }

    updateAutoUpdateState() {
        if (!this.autoUpdate) return
        let autoUpdateState: boolean = true;
        let str: string | null = storageMgr.get(App.keys.setting.AutoUpdate);
        if (str == 'false') {
            autoUpdateState = false
        } else {
            autoUpdateState = true
        }
        this.autoUpdate.isChecked = autoUpdateState
    }
}



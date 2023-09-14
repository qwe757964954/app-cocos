import { _decorator, assetManager, Component, game, JsonAsset, Label, native, ScrollView, sys } from 'cc';
import { NATIVE } from 'cc/env';
import { HotUpdate } from 'quickupdate/HotUpdate';
const { ccclass, property } = _decorator;

@ccclass('TestHotUpdate')
export class TestHotUpdate extends Component {

    @property(Label)
    private label: Label

    @property(ScrollView)
    private scroll: ScrollView


    start() {
        assetManager.resources.load<JsonAsset>("config", (e, v) => {
            this.appendLog(`current version: ${v.json.version}`)
        })
        if (!NATIVE) {
            return
        }
        let path = native.fileUtils.getWritablePath() + "/update"
        path = path.replace(/\\/g, "/").replace(/\/\//g, "/")
        HotUpdate.init({
            callback: {
                onFailed: () => {
                    this.appendLog("更新失败")
                },
                onFinish: () => {
                    this.appendLog("更新成功")
                },
                onNewVersionFound: () => {
                    this.appendLog("发现新版本，请点击开始更新")
                },
                onProgress: (percent: number) => {
                    this.appendLog(`progress: ${percent}`)
                },
            },
            serverUrl: "http://172.20.153.128:9000",
            updateRoot: path,
        })
    }

    private appendLog(log: string) {
        this.label.string = this.label.string + "\n" + log
        this.scheduleOnce(() => {
            this.scroll.scrollToBottom()
        }, 0)
    }

    onCheckUpdateClick() {
        HotUpdate.checkUpdate()
    }

    onDoUpdateClick() {
        HotUpdate.doUpdate()
    }

    onRestartClick() {
        let path = native.fileUtils.getWritablePath() + "/update"
        path = path.replace(/\\/g, "/").replace(/\/\//g, "/")
        sys.localStorage.setItem("BY_COCOS_SEARCH_PATH", path)
        game.restart()
    }
}



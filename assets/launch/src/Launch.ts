import { App } from 'app/App';
import { Log, Net } from 'bos/exports';
import { Component, _decorator, native, profiler, sys } from 'cc';
import { NATIVE } from 'cc/env';
import { AppConfig } from './AppConfig';
import { ProgressView } from './ProgressView';
import { UIDelegate } from './UIDelegate';
const { ccclass, property } = _decorator;

@ccclass('Launch')
export class Launch extends Component {
    @property(ProgressView)
    progressView: ProgressView

    @property(UIDelegate)
    persistNode: UIDelegate

    onLoad() {
        this.init();
        if (NATIVE && sys.isMobile) {
            let content = native.fileUtils.getStringFromFile("GIT_VER")
            console.warn("current git version", content)
        }
    }

    onDestroy() {
        Net.netMgr.targetOff(this)
    }

    async init() {
        Object.defineProperty(globalThis, "AppConfig", { value: AppConfig })
        console.log("init...AppConfig", AppConfig)

        this.progressView.setDesc("正在加载")
        this.progressView.setProgress(0.3)

        if (AppConfig.debug?.displayStats) {
            profiler.showStats()
        } else {
            profiler.hideStats()
        }

        Net.netMgr.on(Net.netEvent.conn_connected, () => {
            this.progressView.setProgress(0.66)
        }, this);

        Net.netMgr.on(Net.netEvent.conn_registered, async () => {
            this.progressView.setProgress(0.90)
            await this.persistNode.loadModules()
            this.progressView.setProgress(1)
            this.enterApp()
        }, this);

        App.apMgr.init({
            appid: AppConfig.appID,
            token: AppConfig.net.token,
            ap: AppConfig.net.ap,
            mustMetadata: {
                ApplicationId: AppConfig.channel,
                ApplicationVer: AppConfig.version,
            }
        })
        Net.netMgr.init({
            delegate: App.apMgr,
        });
        Net.netMgr.connect()
    }


    enterApp() {
        console.log("enterApp")
        App.init()
        App.navMgr.navTo(App.navCfg.LOGIN)
    }

    test() {
        // let req = new LoginByEmailPwdReq({
        //     email: "1980@boyaa.com",
        //     password: md5("By123456"+"*_*"),
        //     common: {
        //         channel: "androidmain"
        //     }
        // })
        // let result = await Passport.LoginByEmailPwd(req)
        // console.log("LoginByEmailPwd...", result)

        // let req2: IGetSPUByUserReq = {
        //     ID: 1621,
        // }
        // console.log("GetSPUByUser...", req2)
        // let result2 = await PrizeMall.GetSPUByUser(req2)
        // console.log("GetSPUByUser...", result2)
    }
}
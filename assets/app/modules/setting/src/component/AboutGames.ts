import { _decorator, Component, Node, Label, Prefab } from 'cc';
import { PopUp } from './PopUp';
import { Engine, uiMgr } from 'bos/exports';
const { ccclass, property, menu } = _decorator;

@ccclass('AboutGames')
@menu('setting/AboutGames')
export class AboutGames extends Component {

    @property({ type: Label })
    version: Label | null = null

    @property({ type: Label })
    engineVersion: Label | null = null

    @property({ type: Prefab })
    popup: Prefab | null = null

    @property({ type: Prefab })
    WebViewPopup: Prefab | null = null

    @property({ type: Prefab })
    cancellationPopup: Prefab | null = null

    gameEdition: string =
        `游戏名称：玩玩斗地主
批准文号：新广出审〔2016〕3397号
游戏版号：ISBN 978-7-7979-2025-4

游戏名称：推倒胡
批准文号：新广出审〔2016〕254号
游戏版号：ISBN 978-7-89988-567-3`

    start() {
        this.init()
    }

    init() {
        this.updateVersion()
        this.updateEngineVersion()
    }

    updateVersion() {
        if (this.version) {
            this.version.string = AppConfig.version //获取版本号
            this.version.node.getComponent(Label).updateRenderData(true);
        }
    }

    updateEngineVersion() {
        if (this.engineVersion) {
            this.engineVersion.string = Engine.version //获取引擎版本号
            this.engineVersion.node.getComponent(Label).updateRenderData(true);
        }
    }

    openGameVersion() {
        if (this.popup) {
            let gameVersionBox = uiMgr.pushPopup(this.popup)
            let popUP = gameVersionBox.getComponent(PopUp)
            if (popUP) {
                popUP.titleLabel.string = "游戏版号"
                popUP.contentLabel.string = this.gameEdition
                popUP.updatePopUpSize()
            }
        }
    }

    openService() {
        if (this.WebViewPopup) {
            let serviceBox = uiMgr.pushPopup(this.WebViewPopup)
            let popUP = serviceBox.getComponent(PopUp)
            if (popUP) {
                popUP.titleLabel.string = "服务条款"
                // popUP.webView.url = "https://www.baidu.com"
            }
        }
    }

    openPrivacyPolicy() {
        if (this.popup) {
            let privacyPolicyBox = uiMgr.pushPopup(this.WebViewPopup)
            let popUP = privacyPolicyBox.getComponent(PopUp)
            if (popUP) {
                popUP.titleLabel.string = "隐私政策"
                // popUP.webView.url = "https://www.baidu.com"
            }
        }
    }

    setLogoff() {
        if (this.cancellationPopup) {
            uiMgr.pushPopup(this.cancellationPopup)
        }
    }
}



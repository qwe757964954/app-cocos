import { _decorator, Component, Node, Prefab, instantiate, RichText } from 'cc';
import { uiMgr } from 'bos/exports';
import { PopUp } from './PopUp';

const { ccclass, property, menu } = _decorator;

@ccclass('RichTextCallback')
@menu('setting/RichTextCallback')
export class RichTextCallback extends Component {

    @property({ type: Prefab })
    webViewPop: Prefab | null = null

    start() {

    }

    openPrivacyPolicy() {
        if (this.webViewPop) {
        const privacyPolicyBox = uiMgr.pushPopup(this.webViewPop)
            let str = this.node.getComponent(RichText).string
            let a = str.indexOf('《')
            let b = str.indexOf('》')
            let title = str.substring(a + 1, b)
            privacyPolicyBox.getComponent(PopUp).titleLabel.string = title //截取只有一个书名号的文本
    //         // privacyPolicyBox.getComponent(PopUp).webView.url = "https://www.baidu.com"
        }
    }
}



import { uiMgr } from 'bos/exports';
import { _decorator, Component, Node, Label, UITransform, WebView, Mask } from 'cc';
const { ccclass, property, menu } = _decorator;

@ccclass('PopUp')
@menu('setting/PopUp')
export class PopUp extends Component {

    @property({ type: Mask })
    maskRound: Mask | null = null

    @property({ type: Node })
    bulletBox: Node | null = null

    @property({ type: Label })
    titleLabel: Label | null = null

    @property({ type: Node })
    body: Node | null = null

    @property({ type: Label })
    contentLabel: Label | null = null

    @property({ type: Label })
    confirmLabel: Label | null = null

    @property({ type: Label })
    cancelLabel: Label | null = null

    // @property({ type: WebView })
    // webView: WebView | null = null

    confirmCallBack: Function = null

    cancelCallBack: Function = null

    start() {

    }

    setup() {
        
    }

    updatePopUpWithButtonsSize() {
        let height: number = 0
        if (this.contentLabel) {
            this.contentLabel.node.getComponent(Label).updateRenderData(true);
            const uiTransform = this.contentLabel.getComponent(UITransform)
            height = uiTransform.height
        }
        if (this.bulletBox) {
            const uiTransform = this.bulletBox.getComponent(UITransform)
            uiTransform.height = height + 336 + 180
        }
        if (this.body) {
            const uiTransform = this.body.getComponent(UITransform)
            uiTransform.height = height + 336
        }
        if (this.maskRound) {
            const uiTransform = this.maskRound.getComponent(UITransform)
            uiTransform.height = height + 336 + 180
        }
    }


    updatePopUpSize() {
        let height: number = 0
        if (this.contentLabel) {
            this.contentLabel.node.getComponent(Label).updateRenderData(true);
            const uiTransform = this.contentLabel.getComponent(UITransform)
            height = uiTransform.height
        }
        if (this.bulletBox) {
            const uiTransform = this.bulletBox.getComponent(UITransform)
            uiTransform.height = height + 210 + 180
        }
        if (this.body) {
            const uiTransform = this.body.getComponent(UITransform)
            uiTransform.height = height + 210
        }
        if (this.maskRound) {
            const uiTransform = this.maskRound.getComponent(UITransform)
            uiTransform.height = height + 210 + 180
        }
    }

    clickCancel() {
        this.closePopUp()
        if (this.cancelCallBack) {
            this.cancelCallBack()
        }
    }

    clickConfirm() {
        this.closePopUp()
        if (this.confirmCallBack) {
            this.confirmCallBack()
        }
    }

    closePopUp() {
        uiMgr.popPopup()
    }
}



import { _decorator, Component, Node, Label, Prefab } from 'cc';
import { Log, uiMgr } from 'bos/exports';
import { PopUp } from './PopUp';
import { AccountMgr } from 'app/domain/account/AccountMgr';
import { App } from 'app/App';
const { ccclass, property, menu } = _decorator;

@ccclass('AccountAndPrivacy')
@menu('setting/AccountAndPrivacy')
export class AccountAndPrivacy extends Component {

    @property({ type: Label })
    bindPhoneLabel: Label | null = null

    @property({ type: Label })
    setPasswdLabel: Label | null = null

    @property({ type: Label })
    bindWeChatLabel: Label | null = null

    @property({ type: Label })
    realNameLabel: Label | null = null

    @property({ type: Prefab })
    privacySetting: Prefab | null = null

    @property({ type: Prefab })
    popupWithButtons: Prefab | null = null

    start() {
    }

    protected onEnable(): void {
        this.updateScene()
    }

    updateScene() {
        this.updateBindPhone()
        this.updatePasswd()
        this.updateBindWeChat()
        this.updateRealName()
    }

    bindPhoneNum() {
        if (AccountMgr.getInstance().getBindPhone().length > 0) {
            if (this.popupWithButtons) {
                let pop = uiMgr.pushPopup(this.popupWithButtons)
                let popUp = pop.getComponent(PopUp)
                popUp.titleLabel.string = "修改手机号"
                popUp.contentLabel.string = "是否修改绑定手机号"
                popUp.confirmCallBack = () => {
                    uiMgr.loadPage("login@res/prefabs/ChangeBindPhone", { params: {} });
                }
            }
        } else {
            uiMgr.loadPage("login@res/prefabs/BindPhone", { params: {} });
        }
    }

    updateBindPhone() {
        if (this.bindPhoneLabel) {
            let content = "去绑定"
            let phoneNum = AccountMgr.getInstance().getBindPhone()
            if (phoneNum) {
                let reg = /(\d{3})\d{4}(\d{4})/;
                phoneNum = phoneNum.replace(reg, '$1****$2');
                content = phoneNum
            }
            this.bindPhoneLabel.string = content
            this.bindPhoneLabel.node.getComponent(Label).updateRenderData(true);
        }
    }

    setPasswd() {
        let phoneNum = AccountMgr.getInstance().getBindPhone()
        if (!phoneNum) {
            uiMgr.showToast("请先绑定手机号后再设置登陆密码")
            return
        } else {
            uiMgr.loadPage("login@res/prefabs/ForgetPrefab", { params: {} });
        }
    }

    updatePasswd() {
        if (this.setPasswdLabel) {
            let passwdState = AccountMgr.getInstance().getBindPasswdStatus() //获取是否设置密码
            this.setPasswdLabel.string = passwdState ? "已设置" : "未设置";
        }
    }

    async bindWeChat() {
        let weChatState: boolean = AccountMgr.getInstance().getBindWechatStatus();
        this.bindWeChatLabel.string = weChatState ? "已绑定" : "未绑定";
        if (weChatState) {
            if (this.popupWithButtons) {
                let popWithButtonsBox = uiMgr.pushPopup(this.popupWithButtons)
                let popUp = popWithButtonsBox.getComponent(PopUp)
                popUp.titleLabel.string = "提示"
                popUp.contentLabel.string = "确定解绑微信吗？"
                popUp.confirmLabel.string = "确定"
                popUp.cancelLabel.string = "取消"
                popUp.confirmCallBack = async () => {
                    let { err, resp } = await AccountMgr.getInstance().unbindWechatPlatform();
                    Log.w("bindWechatPlatformSync___err________________________", err);
                    Log.w("bindWechatPlatformSync___resp________________________", resp);
                    this.updateBindWeChat();
                }
            }
            return
        } else {
            let { err, resp } = await AccountMgr.getInstance().bindWechatPlatformSync();
            Log.w("bindWechatPlatformSync___err________________________", err);
            Log.w("bindWechatPlatformSync___resp________________________", resp);
            this.updateBindWeChat();
        }
    }

    updateBindWeChat() {
        if (!this.bindWeChatLabel) return;
        let weChatState: boolean = AccountMgr.getInstance().getBindWechatStatus();
        this.bindWeChatLabel.string = weChatState ? "已绑定" : "未绑定";
    }

    setRealName() {
        let realNameState = AccountMgr.getInstance().getBindRealNameStatus() //获取是否实名认证
        if (realNameState) {
            uiMgr.showToast("您已实名认证，无需重复认证")
            return
        } else {
            let phoneNum = AccountMgr.getInstance().getBindPhone()
            if (phoneNum) {
                App.navMgr.navTo(App.navCfg.REAL_NAME)//应该是另一种样式
            } else {
                App.navMgr.navTo(App.navCfg.REAL_NAME)
            }
        }
    }

    updateRealName() {
        if (this.realNameLabel) {
            let realNameState = AccountMgr.getInstance().getBindRealNameStatus() //获取是否实名认证
            this.realNameLabel.string = realNameState ? "已认证" : "去认证";
        }
    }

    setPrivacy() {
        if (this.privacySetting) {
            uiMgr.pushPopup(this.privacySetting)
        }
    }
}



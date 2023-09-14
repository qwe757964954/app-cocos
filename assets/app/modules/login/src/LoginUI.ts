
import { LimitString } from './../../../../bos/framework/orm/db';
import { _decorator, Asset, AssetManager, Component, director, Director, Prefab, EditBox, Label, log, Node, UITransform, sys, resources, JsonAsset, Button, Toggle, tween, Tween, Vec3, instantiate, native } from 'cc';
import { Log, XComponent, StorageUtil, uiMgr, resLoader } from 'bos/exports';
import { App } from 'app/App';
import { utils } from './Utils';
import { AccountMgr } from 'app/domain/account/AccountMgr';
import { Code } from 'idl/mpff/user/passport.v1';
import { NATIVE } from 'cc/env';
import { logType } from '../../../../../extensions/xgui/@types/packages/console/@types/pritate';
const { ccclass, property } = _decorator;
const DELAY_TIME: number = 120;
// md5
export enum LoginType {
    Code = 0,
    PassWord = 1,
    Email = 2,
    Channel = 3,
}

export interface LoginButton {
    name: Button;
    visible: boolean;
}

const enumToString = (value: LoginType): string => value.toString();


@ccclass('LoginUI')
export class LoginUI extends XComponent {
    @property(EditBox)
    public accountEditor: EditBox | null = null;

    @property(EditBox)
    public passwdEditor: EditBox | null = null;

    @property(EditBox)
    public codeEditor: EditBox | null = null;

    @property(UITransform)
    public topLayout: UITransform | null = null;

    @property(UITransform)
    public bgLayout: UITransform | null = null;

    @property(Button)
    public getCodeBtn: Button | null = null;

    @property(Button)
    public loginBtn: Button | null = null;

    @property(Button)
    public appleLoginBtn: Button | null = null;

    @property(Button)
    public wechatLoginBtn: Button | null = null;

    @property(Button)
    public guestLoginBtn: Button | null = null;
    
    @property(Button)
    public mailboxBtn: Button | null = null;

    @property(Button)
    public deleteBtn: Button | null = null;

    @property(Button)
    public passwordBtn: Button | null = null;

    @property(Toggle)
    public selectFlag: Toggle | null = null;

    @property(Button)
    public returnBtn: Button | null = null;
    
    @property(Label)
    public errorLab: Label | null = null;

    @property(Label)
    public swichText: Label | null = null;

    private lastInputAccount: string = ""!;
    private smsLabel: Label = null!;
    private delayIndex: number = null;
    private handler: Function = null;
    private isHasPassword: boolean = false;
    private isWechatInstall: boolean = false;
    private isOpenEmailLogin: boolean = false;
    private loginType: LoginType = LoginType.PassWord;
    private loginButtons: LoginButton[] = null;
    tweenGreen: Tween<Readonly<Vec3>> = null!;
    tweenRed: Tween<Readonly<Vec3>> = null!;

    
    onLoad(): void {
        super.onLoad();
        this.init();
        this.loginButtons = [{name:this.wechatLoginBtn, visible: true},
            {name:this.appleLoginBtn, visible: true},
            {name:this.mailboxBtn, visible: true},
            {name:this.guestLoginBtn, visible: true}];
    }

    onDestroy(): void {
        AccountMgr.getInstance().targetOff(this)
    }

    start() {
        let isChecked:boolean = StorageUtil.get("AGREE_LOGIN");
        this.selectFlag.isChecked = Boolean(isChecked || false);
    }

    async init() {
        this.smsLabel = this.getCodeBtn.getComponent(Label);
        AccountMgr.getInstance().on(AccountMgr.EventType.LOGIN_SUCCESS, this.onLoginSuccess, this)
        this.changeViewState(this.getAccountEdit());
        await this.setOtherLogin();
        if (sys.platform == sys.Platform.ANDROID || sys.platform == sys.Platform.IOS) {
            await this.checkAccountSync();
            this.loginType = this.isHasPassword ? LoginType.PassWord : LoginType.Code;
        }else{
            if (this.isOpenEmailLogin) {
                this.loginType = LoginType.Email;
            }
        }
        if (StorageUtil.get("LOGIN_TYPE") === null) {
            this.loginType = LoginType.Email;
        }else{
            this.loginType = parseInt(StorageUtil.get("LOGIN_TYPE"));
        }
        this.updateInputView(0);
        let password = StorageUtil.get("PWD", false);
        this.passwdEditor.getComponent(EditBox).string = password || "";
    }

    async setOtherLogin(){
        this.isWechatInstall = await AccountMgr.getInstance().isWXAppInstalled();
        this.isOpenEmailLogin = AppConfig.appID === "1031" || AppConfig.appID === "1032";
        this.loginButtons.forEach((button) => {
            if (button.name === this.wechatLoginBtn) {
                button.name.node.active = this.isWechatInstall;
                button.visible = this.isWechatInstall;
            }else if(button.name === this.appleLoginBtn){
                button.visible = sys.platform == sys.Platform.IOS;
                button.name.node.active = button.visible;
            }else if(button.name === this.mailboxBtn){
                button.visible = this.isOpenEmailLogin;
                button.name.node.active = button.visible;
            }
        })
        const visibleButtons: LoginButton[]  = this.loginButtons.filter(button => button.visible);
        const trueCount = visibleButtons.length;
        let posx =  - 222 * (trueCount / 2) + 111;
        for (let index = 0; index < visibleButtons.length; index++) {
            const button = visibleButtons[index];
            tween(button.name.node).to(0, { position: new Vec3(posx + index * 222, 84) }).start()
        }
    }

    async onClickBack(){
        // this.loginByOpIdentifySync();
    }
    
    async checkAccountSync() {
        let account = this.getAccountEdit();
        if (!account || account === "") {
            return {};
        }
        const isPhone: boolean = utils.isPhoneNumber(account);
        if (!isPhone) {
            return {};
        }
        let { err, resp, isPassword, bootUid } = await AccountMgr.getInstance().checkAccountPassportSync(account);
        if (err == 0 && resp) {
            this.isHasPassword = isPassword;
        }
        return { err, resp };
    }
    async onAppleButton() {
        if (!this.checkLoginXieYi()) {
            return;
        }
        await AccountMgr.getInstance().loginByAppleSync();

    }
    async onWechatButton() {
        if (!this.checkLoginXieYi()) {
            return;
        }
        await AccountMgr.getInstance().loginByWechatSync();
    }

    async onEmailButton(){
        if (this.loginType === LoginType.Email) {
            await this.checkAccountSync();
            this.loginType = this.isHasPassword ? LoginType.PassWord : LoginType.Code;
        }else{
            this.loginType = LoginType.Email;
        }
        this.updateInputView(0)
    }

    async updateInputView(moveTime: number) {
        if (this.loginType == LoginType.Channel) {
            return;
        }
        let account_str
        if (this.loginType === LoginType.Email) {
            account_str = StorageUtil.get("EMAIL", false);
            this.passwordBtn.node.active = false;
        }else if(this.loginType === LoginType.Code || this.loginType === LoginType.PassWord){
            let lastIptEmail = StorageUtil.get("PHONE", false);
            account_str = utils.setPhoneFormat(lastIptEmail || "");
            this.passwordBtn.node.active = true;
        }
        this.accountEditor.getComponent(EditBox).string = account_str || "";
        this.accountEditor.placeholder = "请输入手机号";
        moveTime = moveTime || 0;
        let leftNode: any;
        let rightNode: any;
        console.log("updateInputView...loginType", this.loginType);
        if (this.loginType === LoginType.Code) {
            leftNode = this.passwdEditor;
            rightNode = this.codeEditor;
        } else if (this.loginType === LoginType.PassWord) {
            leftNode = this.codeEditor;
            rightNode = this.passwdEditor;
        } else if (this.loginType === LoginType.Email) {
            leftNode = this.codeEditor;
            rightNode = this.passwdEditor;
            this.accountEditor.getComponent(EditBox).string = account_str || "";
            this.accountEditor.placeholder = "请输入账号";
        }
        let leftPos = leftNode.node.getPosition();
        let rightPos = rightNode.node.getPosition();
        if (leftNode) {
            tween(leftNode.node).to(moveTime, { position: new Vec3(766.084, leftPos.y) })
                .call(() => {
                    leftNode.node.active = false;
                })
                .start()
        }
        if (rightNode) {
            tween(rightNode.node).to(moveTime, { position: new Vec3(0, rightPos.y) })
                .call(() => {
                    rightNode.node.active = true;
                    this.updateSwitchLab();
                })
                .start()
        }
        this.updateNextBtn();
    }
    checkLoginXieYi() {
        if (Boolean(StorageUtil.get("AGREE_LOGIN"))) {
            return true;
        } else {
            uiMgr.showToast("请先勾选同意《游戏服务协议》和《隐私政策》");
            return false;
        }
    }
    async onGuestLogin() {
        if (!this.checkLoginXieYi()) {
            return;
        }
        let { err, resp } = await AccountMgr.getInstance().loginByGuidSync();
        if (err) {
            uiMgr.showToast(AccountMgr.getInstance().getErrorStrByCode(err) || "");
        }
    }

    async updateSwitchLab() {
        this.swichText.string = this.loginType == LoginType.Code ? "密码登录" : "验证码登录";
    }
    async accountEditChange() {
        if (this.loginType === LoginType.Email) {
            this.lastInputAccount = this.getAccountEdit();
            this.updateNextBtn();
            return;
        }
        let phone = this.getAccountEdit();
        let account_str = utils.setPhoneFormat(phone);
        this.accountEditor.getComponent(EditBox).string = account_str;
        this.lastInputAccount = this.getAccountEdit();
        this.changeViewState(phone);
        this.updateNextBtn();
    }
    delAllVisible(visible: boolean) {
        this.deleteBtn.node.active = visible ?? false;
    }
    async onDeleteAllClick() {
        this.accountEditor.getComponent(EditBox).string = "";
        this.passwdEditor.getComponent(EditBox).string = "";
        this.codeEditor.getComponent(EditBox).string = "";
        this.updateErrorTips(false, null);
        this.delAllVisible(false);
        this.cancelSchedule();
    }
    async changeViewState(phone: string) {
        const inputNum: number = phone.length;
        // Error message
        if (inputNum !== 0 && phone[0] !== "1") {
            this.updateErrorTips(true, null);
        } else {
            this.updateErrorTips(false, null);
        }
        // Delete button
        this.delAllVisible(inputNum > 0 ? true : false);
    }
    async passwordEditChange() {
        const inputNum: number = this.passwdEditor.string.length;
        let passwordStr = this.passwdEditor.string;
        // 是否有中文
        if (utils.checkChinese(passwordStr)) {
            return true;
        }
        if (inputNum > 10) {
            this.updateErrorTips(true, "密码位数不对(8-10位)");
        } else {
            this.updateErrorTips(false, null);
        }
        this.updateNextBtn();
    }
    async passwordEditReturn() {
        return true;
    }
    
    async codeEditChange() {
        this.updateNextBtn();
    }
    
    onLoginSuccess(uid: string) {
        Log.w("onLoginSuccess________________________",uid);
        App.navMgr.navTo(App.navCfg.HOME)
    }

    onLogin(...any: any[]) {

    }

    async updateNextBtn() {
        var enabled: boolean = false;
        const code: string = this.codeEditor.string.replace(/\s+/g, "");
        const phone: string = this.getAccountEdit();
        const password: string = this.passwdEditor.string.replace(/\s+/g, "");
        if (this.loginType === LoginType.Code) {
            if (code.length === 6) {
                enabled = true;
            }
        } else {
            if (password.length >= 8 && password.length <= 10) {
                enabled = true;
            }
        }

        // if (phone.length !== 11) {
        //     enabled = false;
        // }

        if (this.loginType === LoginType.Email || this.loginType === LoginType.Channel) {
            enabled = true;
        }
        this.loginBtn.interactable = enabled;
        this.loginBtn.enabled = enabled;
    }
    async onSelectFlag() {
        let isAgreeLogin:boolean = Boolean(StorageUtil.get("AGREE_LOGIN"));
        isAgreeLogin = !isAgreeLogin;
        StorageUtil.set("AGREE_LOGIN",isAgreeLogin.toString());
    }
    async onClickAgeTips() {
        log("onClickAgeTips_____________________");
        uiMgr.loadPage("login@res/prefabs/PrivatePrefab", {params: "tss.hall.ageAppropriate"});
    }

    async onClickForget() {
        this.passwdEditor.string = "";
        uiMgr.loadPage("login@res/prefabs/ForgetPrefab", {});
        // resLoader.loadPrefab("login@res/prefabs/ForgetPrefab", (err, asset) => {
        //     uiMgr.pushPage(asset, {});
        // });
    }

    async updateErrorTips(visible: boolean, errMsg: string) {
        this.errorLab.string = errMsg ? errMsg : "请正确输入手机号码";
        this.errorLab.node.active = visible;
    }

    async switchLogin() {
        this.loginType = (this.loginType === LoginType.Code) ? LoginType.PassWord : LoginType.Code;
        this.updateErrorTips(false, null);
        this.updateInputView(0.3);
    }

    async getSmsCode() {
        var account = this.getAccountEdit();
        if (!account || account == "") {
            uiMgr.showToast("请输入手机号");
            return;
        }
        let isPhone = utils.isPhoneNumber(account);
        if (!isPhone) {
            uiMgr.showToast("手机号填写错误");
            return;
        }
        let {err,resp} = await AccountMgr.getInstance().sendLoginSmsCaptchaSync(account);

        if (err) {
            if (resp && resp.expiredAt) {
                if (resp.expiredAt) {
                    this.delayIndex = Math.round(resp.expiredAt - Date.now() / 1000 - 1);
                    let codeStr = err == Code.SmsCaptchaStatusUnExpired ? "请等待" : "";
                    this.startSchedule(codeStr);
                }
            } else {
                this.cancelSchedule()
            }
            this.updateErrorTips(true,AccountMgr.getInstance().getErrorStrByCode(err));
        } else {
            this.delayIndex = DELAY_TIME;
            if (resp.expiredAt) {
                this.delayIndex = Math.round(resp.expiredAt - Date.now() / 1000 - 1);
            }
            log(this.delayIndex);
            this.startSchedule("");
        }
    }

    cancelSchedule() {
        this.unschedule(this.handler);
        this.delayIndex = 0;
        this.getCodeBtn.enabled = true;
        this.smsLabel.string = "重新发送";
    }
    setCodeString(text?: string) {
        this.getCodeBtn.enabled = false;
        this.smsLabel.string = `${this.delayIndex}秒`;
        if (text.trim().length > 0) {
            this.smsLabel.string = text;
        }
    }
    startSchedule(text?: string) {
        this.setCodeString(text);
        if (this.handler) {
            return;
        }
        this.handler = () => {
            this.delayIndex = this.delayIndex - 1;
            if (this.delayIndex <= 0) {
                this.cancelSchedule();
            } else {
                this.setCodeString(text);
            }
        }
        this.schedule(this.handler, 1);
    }
    async tryEmailLogin() {
        let account = this.getAccountEdit();
        let password = this.passwdEditor?.textLabel?.string;
        if (!account || account.length === 0) {
            this.updateErrorTips(true, "请输入账号");
            return false;
        }
        if (!password || password.length === 0) {
            this.updateErrorTips(true, "请输入密码");
            return false;
        }
        let result
        if (utils.checkAccountIsEmail(account)) {
            result = await AccountMgr.getInstance().loginByEmailReq(account, password);
        } else {
            result = await AccountMgr.getInstance().loginByPhonePwdSync(account, password);
        }

        if (result.err !== 0 && result.err !== null) {
            this.updateErrorTips(true, AccountMgr.getInstance().getErrorStrByCode(result.err) || "")
        }

    }
    getAccountEdit(){
        return this.accountEditor.string.replace(/\s+/g, "");
    }
    async login() {
        if (!this.checkLoginXieYi()) {
            return;
        }
        // 示例用法
        const stringValue = enumToString(this.loginType);
        StorageUtil.set("LOGIN_TYPE",stringValue);
        if (this.loginType === LoginType.Email) {
            this.tryEmailLogin();
            return;
        }
        this.updateErrorTips(false, null);
        let iptText = this.getAccountEdit();
        let passwd = this.passwdEditor?.textLabel?.string;
        let smsCode = this.codeEditor?.textLabel?.string;
        const isPhone: boolean = utils.isPhoneNumber(iptText);

        if (!isPhone) {
            this.updateErrorTips(true,"手机号填写错误");
            return;
        }
        if (this.loginType === LoginType.Code && isNaN(Number(smsCode))) {
            // 验证码必须为数字
            this.updateErrorTips(true, "请输入正确验证码");
            return;
        } else if (this.loginType === LoginType.PassWord && passwd.length === 0) {
            this.updateErrorTips(true, "密码不能为空");
            return;
        }
        let result
        if (this.loginType === LoginType.Code) {
            result = await AccountMgr.getInstance().loginByPhoneSmsSync(iptText, smsCode);
        } else if (this.loginType === LoginType.PassWord) {
            result = await this.checkAccountSync();
            if (result.err !== 0 && result.err !== null) {
                this.updateErrorTips(true, AccountMgr.getInstance().getErrorStrByCode(result.err) || result.resp.errMsg);
                return;
            }
            if (this.isHasPassword) {
                result = await AccountMgr.getInstance().loginByPhonePwdSync(iptText, passwd);
            }

        }
        if (result.err !== 0 && result.err !== null) {
            this.updateErrorTips(true, AccountMgr.getInstance().getErrorStrByCode(result.err) || "");
        }
    }
}

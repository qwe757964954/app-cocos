// import { Label } from './../../../../../extensions/hotupdate/@types/editor.d';
import { _decorator,Layout,  Component,  EditBox, Label, log,  Button, Toggle } from 'cc';
const { ccclass, property } = _decorator;
import { utils } from './Utils';
import {  Log, StorageUtil, uiMgr } from 'bos/exports';
import { AccountMgr } from 'app/domain/account/AccountMgr';
import { IM } from 'qsdk/im/IM';
import { IMEvent } from 'qsdk/im/config/define';
import { Message } from 'qsdk/im/core/Message';
import { Code, ISendSmsCaptchaResp } from 'idl/mpff/user/passport.v1';
import { App } from 'app/App';
const DELAY_TIME: number = 120;
@ccclass('ForgetUI')
export class ForgetUI extends Component {
    @property(EditBox)
    public accountEditor: EditBox | null = null;

    @property(EditBox)
    public passwdEditor: EditBox | null = null;

    @property(EditBox)
    public codeEditor: EditBox | null = null;

    @property(Button)
    public loginBtn: Button | null = null;

    @property(Button)
    public deleteBtn: Button | null = null;

    @property(Label)
    public errorLab: Label | null = null;

    @property(Label)
    public bindPhone: Label | null = null;

    @property(Button)
    public unShowBtn: Button | null = null;

    @property(Button)
    public getCodeBtn: Button | null = null;

    @property(Button)
    public showBtn: Button | null = null;

    @property(Label)
    public loginLabel: Label | null = null;

    @property(Toggle)
    public selectFlag: Toggle | null = null;
    
    @property(Layout)
    public descLayout: Layout | null = null;

    private delayIndex: number = 0;

    private isHasPassword: boolean = false;
    private isShowPassword: boolean = false;
    private smsLabel: Label = null!;
    private handler: Function = null;

    onReceiveMessage(msg:Message) {
        Log.w("onReceiveMessage",msg);
    }

    onLoginSuccess(uid:string){
        IM.getInstance().on(IMEvent.ON_RECEIVE_MESSAGE, this.onReceiveMessage);
        App.navMgr.navTo(App.navCfg.HOME)
    }

    start() {
        this.selectFlag.isChecked = StorageUtil.get("AGREE_LOGIN",false);
    }
    onLoad(): void {
        this.init();
    }
    async init() {
        this.smsLabel = this.getCodeBtn.getComponent(Label);
        let lastIptEmail = StorageUtil.get("ACCOUNT", false);
        let account_str = utils.setPhoneFormat(lastIptEmail || "");
        this.accountEditor.getComponent(EditBox).string = account_str || "";
        let account = this.accountEditor.string;
        const phone = AccountMgr.getInstance().getBindPhone();
        if (phone.length > 0) {
            this.bindPhone.node.active = true;
            this.bindPhone.string = `当前绑定号码: ${phone.substring(0, 3)}****${phone.substring(7)}`;
            this.accountEditor.getComponent(EditBox).string = phone;
            this.accountEditor.node.active = false;
        }

        Log.w("绑定手机==========>",phone)
        if (AccountMgr.getInstance().getCurLoginStatus()) {
            this.descLayout.node.active = false;
            this.loginLabel.string = "确认修改";
        }else{
            this.descLayout.node.active = true;
            this.loginLabel.string = "设置并登录";
        }
        this.changeViewState(account);
        this.updateNextBtn();
    }
    showPassword(){
        this.isShowPassword = !this.isShowPassword;
        this.unShowBtn.node.active = !this.isShowPassword;
        this.showBtn.node.active = this.isShowPassword;
        if (this.isShowPassword) {
            this.passwdEditor.inputFlag = EditBox.InputFlag.DEFAULT;
        }else{
            this.passwdEditor.inputFlag = EditBox.InputFlag.PASSWORD;
        }
    }
    changeViewState(phone){
        const inputNum: number = phone.length;
        // 错误信息
        if (inputNum !== 0 && phone[0] !== "1") {
            this.updateErrorTips(true,"");
        } else {
            this.updateErrorTips(false,"");
        }
        // 删除按钮
        this.delAllVisible(inputNum > 0);
    }
    async onSelectFlag(){
        StorageUtil.set("AGREE_LOGIN",!StorageUtil.get("AGREE_LOGIN",false));
    }
    async onBackTouch(){
        uiMgr.popPage();
    }
    async onClickGetSmsCode(){
        this.sendMsgCode();
    }

    async sendMsgCode(){
        let account = this.getAccountEdit();
        const isPhone: boolean = utils.isPhoneNumber(account);
        if (!isPhone) {
            this.updateErrorTips(true,"手机号填写错误");
            return;
        }
        log(this.delayIndex);
        if (this.delayIndex != 0) {
            return;
        }
        this.updateErrorTips(false,null);
        let result = await this.checkAccountSync();
        if (result.err !== 0 && result.err !== null) {
            this.updateErrorTips(true,result.err+"");
        }
        
        if (!this.isHasPassword && !AccountMgr.getInstance().getCurLoginStatus()){
            log("登录验证码=====>");
            let {err,resp} = await AccountMgr.getInstance().sendLoginSmsCaptchaSync(account);
            this.smsCaptchaStartTimer(err,resp);
        }else{
            log("修改密码验证码=====>");
            let {err,resp} = await AccountMgr.getInstance().sendSetPasswordSmsCaptchaSync(account);
            this.smsCaptchaStartTimer(err,resp);
        }
        
    }

    smsCaptchaStartTimer(err:number,resp:ISendSmsCaptchaResp){
        log("短信验证码登录发送CODE  resp==========================",resp);
        if (err) {
            if (resp && resp.expiredAt) {
                if (resp.expiredAt) {
                    this.delayIndex = resp?.expiredAt - Math.floor(Date.now() / 1000);
                    let codeStr = err == Code.SmsCaptchaStatusUnExpired ? "请等待" :null;
                    this.startSchedule(codeStr);
                }
            } else {
                this.cancelSchedule()
            }
            this.updateErrorTips(true,AccountMgr.getInstance().getErrorStrByCode(err));
        }else{
            this.delayIndex = DELAY_TIME;
            if (resp?.expiredAt) {
                this.delayIndex = resp.expiredAt - Math.floor(Date.now() / 1000);
            }
            this.startSchedule();
        }

    }

    checkLoginXieYi(){
        if (StorageUtil.get("AGREE_LOGIN",false)) {
            return true;
        }else{
            uiMgr.showToast("请先勾选同意《游戏服务协议》和《隐私政策》");
            return false;
        }

    }
    async setPasswordBySmsSync(){
        let smsCode = this.codeEditor.string;
        let phone = this.getAccountEdit();
        let password = this.passwdEditor.string;
        log("修改密码:req========>",smsCode,phone,password);
        let phoneRet = await AccountMgr.getInstance().setPasswordBySms(phone,smsCode,password);
        log("修改密码:resp========>",phoneRet);
        if (!phoneRet?.resp) {
            uiMgr.showToast("请求超时");
            return false;
        }
        if (phoneRet.err !== 0 && phoneRet.err !== null) {
            this.updateErrorTips(true,AccountMgr.getInstance().getErrorStrByCode(phoneRet?.err));
            return false;
        }
        uiMgr.showToast("修改密码成功");
        return true;
    }
    async loginByPhonePwdSync(){
        let phone = this.getAccountEdit();
        let password = this.passwdEditor.string;

        let req = {
            phone : phone,
            password : password
        } 
        log("用户手机密码登录:req=========>");
        let {err,resp} = await AccountMgr.getInstance().loginByPhonePwdSync(phone,password);
        log("用户手机密码登录:resp=========>");
        if (err != 0) {
            this.updateErrorTips(true,null)
            return false;
        }
    }
    async loginByPhoneSmsSync(){
        let smsCode = this.codeEditor.string;
        let phone = this.getAccountEdit();
        log("新用户登录:req=========>");
        let {err,resp} = await AccountMgr.getInstance().loginByPhoneSmsSync(phone,smsCode);
        log("新用户登录:resp=========>");
        log(err)
        if (err != 0) {
            this.updateErrorTips(true,null)
            return false;
        }
        return true;
    }

    async changePasswordSync(){
        let password = this.passwdEditor.string;
        log("首次设置密码:req=========>",password);
        let passRet = await AccountMgr.getInstance().changePasswordSync(password,null);
        log("首次设置密码:resp=========>",passRet);
        if (passRet.err !== 0 && passRet.err !== null) {
            this.updateErrorTips(true, AccountMgr.getInstance().getErrorStrByCode(passRet?.err));
            return false;
        }
        uiMgr.showToast("设置密码成功");
        return true
    }

    async onFinishBtnClick(){
        if (!AccountMgr.getInstance().getCurLoginStatus() && !this.checkLoginXieYi()) {
            return;
        }
        let smsCode = this.codeEditor.string;
        if (smsCode == null) {
            this.updateErrorTips(true,"请输入正确验证码");
            return;
        }
        if (this.isHasPassword) {
            if (!AccountMgr.getInstance().getCurLoginStatus()) {
                let isOk = await this.setPasswordBySmsSync();
                if (isOk) {
                    await this.loginByPhonePwdSync();
                }
            } else {
                let isOk =  await this.setPasswordBySmsSync();
                if (isOk) {
                    uiMgr.popPage();
                }
            }
            
        }else{
            if (!AccountMgr.getInstance().getCurLoginStatus()) {
                const isOk = await this.loginByPhoneSmsSync();
                if (!isOk) {
                    return;
                }
            }
            
            const isOk = await this.changePasswordSync();
            if (isOk) {
                uiMgr.popPage();
            }
            
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
        this.smsLabel.string = this.delayIndex + "秒";
        if (text) {
            this.smsLabel.string = text;
        }
    }
    startSchedule(text?: string){
        this.setCodeString(text);
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
    async checkAccountSync() {
        let account = this.getAccountEdit();
        if (!account || account === "") {
            return{};
        }
        const isPhone: boolean = utils.isPhoneNumber(account);
        if (!isPhone) {
            return{};
        }
        let {err,resp,isPassword,bootUid} = await AccountMgr.getInstance().checkAccountPassportSync(account);
        if (err == 0 && resp) {
            this.isHasPassword = isPassword;
        }
        return {err,resp};
    }
    delAllVisible(visible){
        this.deleteBtn.node.active = visible ?? false;
    }
    async onDeleteAllClick(){
        this.accountEditor.string = "";
        this.deleteBtn.node.active = false;
    }
    async passwordEditChange() {
        let phone = this.passwdEditor?.textLabel?.string;
        const inputNum: number = phone.length;
        if (utils.checkChinese(phone)) {
            return true;
        }
        this.errorLab.node.active = false;
        this.deleteBtn.node.active = inputNum > 0;
        this.updateNextBtn();
        if (inputNum > 10) {
            this.updateErrorTips(true,"密码位数不对,请输入8-10位密码");
        }
    }
    getAccountEdit(){
        return this.accountEditor.string.replace(/\s+/g, "");
    }
    async accountEditChange() {
        let account = this.getAccountEdit();
        let account_str = utils.setPhoneFormat(account);
        this.accountEditor.getComponent(EditBox).string = account_str || "";
        this.changeViewState(account);
        this.updateNextBtn();
    }
    async codeEditChange() {
        let code = this.codeEditor.string.replace(/\s+/g, "");
        this.updateNextBtn();
    }
    updateErrorTips(visible:boolean,errorStr:string){
        this.errorLab.string = errorStr ?? "请正确输入手机号码";
        this.errorLab.enabled = visible;
    }
    updateNextBtn(){
        let enabled: boolean = false;
        let phone = this.getAccountEdit();
        let password = this.passwdEditor?.textLabel?.string;
        let smsCode = this.codeEditor?.textLabel?.string;
        if (smsCode.length === 6 && phone.length === 11 && password.length >= 8 && password.length <= 10) {
            enabled = true;
        }
        log(enabled)
        this.loginBtn.interactable = enabled;
        this.loginBtn.enabled = enabled;
    }
    update(deltaTime: number) {
        
    }
}



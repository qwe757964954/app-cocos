import { _decorator, Asset, AssetManager, Component, director, Director, EditBox, Label, log, Node, UITransform, sys, resources, JsonAsset, Button, Toggle, tween, Tween, Vec3, Layout } from 'cc';
const { ccclass, property } = _decorator;
import { ActivityType } from 'idl/tss/hall/common/activity';
import { ActivityMgr } from 'app/domain/account/ActivityMgr';
import { AccountMgr } from 'app/domain/account/AccountMgr';
import { utils } from './Utils';
import { Net, Log, Crypto, eventSystem, XComponent, TimeUtil, StorageUtil, uiMgr, resLoader } from 'bos/exports';
import { UIMgr } from 'bos/framework/gui/UIMgr';
const DELAY_TIME: number = 120;
@ccclass('AuthenticationUI')
export class AuthenticationUI extends XComponent {
    @property(EditBox)
    public accountEditor: EditBox | null = null;

    @property(EditBox)
    public codeEditor: EditBox | null = null;

    @property(EditBox)
    public nameEditor: EditBox | null = null;

    @property(EditBox)
    public idCardEditor: EditBox | null = null;

    @property(Button)
    public getCodeBtn: Button | null = null;

    @property(Button)
    public phoneDeleteBtn: Button | null = null;

    @property(Button)
    public cardDeleteBtn: Button | null = null;

    @property(Layout)
    public phoneLayout: Layout | null = null;

    @property(Layout)
    public cardLayout: Layout | null = null;

    @property(Layout)
    public bindLayout: Layout | null = null;

    @property(Label)
    public bindLabel: Label | null = null;

    private bindPhoneState: boolean = false!;
    private bindIdentifyState: boolean = false!;
    private phoneNumber: string = ""!;
    private identity: string = ""!;
    private nameStr: string = ""!;
    private verifyCode: string = ""!;
    private delayIndex: number = 0;
    private handler: Function = null;
    public constructor() { 
        super()
    }

    start() {
        
    }
    onLoad(): void {
        this.init();
        
    }
    async onCloseTouch(){
        uiMgr.popPage();
    }

    phoneChangeEdit(){
        
        this.phoneNumber = this.accountEditor.string;
        this.phoneDeleteAllVisible(this.phoneNumber.length > 0)
    }

    cardChangeEdit(){
        this.identity = this.idCardEditor.string;
        this.cardDeleteAllVisible(this.identity.length > 0)
    }

    phoneDeleteAllVisible(visible: boolean) {
        this.phoneDeleteBtn.node.active = visible ?? false;
    }

    cardDeleteAllVisible(visible: boolean) {
        this.cardDeleteBtn.node.active = visible ?? false;
    }

    async onPhoneDeleteAllClick() {
        this.accountEditor.getComponent(EditBox).string = "";
        this.phoneDeleteAllVisible(false);
        this.cancelSchedule();
    }

    async onCardDeleteAllClick() {
        this.idCardEditor.getComponent(EditBox).string = "";
        this.cardDeleteAllVisible(false);
        this.cancelSchedule();
    }

    checkCommitIsValid(){
        this.nameStr = this.nameEditor.string;
        this.identity = this.idCardEditor.string;
        this.phoneNumber = this.accountEditor.string;
        this.verifyCode = this.codeEditor.string;
        console.log(`${this.nameStr}, ${this.identity}, ------------>>>`);
        console.log(`${this.phoneNumber}, ${this.verifyCode}, ------------>>>`);
        console.log(`${this.bindPhoneState}, ------------>>>`);
        if (this.bindPhoneState) {
            if (this.nameStr.length > 0 && this.identity.length > 0) {
                return true;
            }
        } else {
            if (this.nameStr.length > 0 && this.identity.length > 0 && 
                this.phoneNumber.length > 0 && this.verifyCode.length > 0) {
                return true;
            }
        }
        return false;
    }
    checkDataIsValid(){
        let isAbort = false;
        if (!this.bindPhoneState) {
            if (!utils.isPhoneNumber(this.phoneNumber)) {
                isAbort = true;
                uiMgr.showToast("手机号有问题");
                // this.errorPhoneNumber();
            }

            // 验证验证码是不是数字
            if (this.verifyCode.length === 0) {
                isAbort = true;
                uiMgr.showToast("验证码不是数字或者为空");
                // this.errorVarifyCode();
            }
        }

        // 验证姓名（这里只做中文和长度验证)
        if (!utils.validateName(this.nameStr)) {
            isAbort = true;
            uiMgr.showToast("不是正确得名字");
            // this.errorName();
        }

        if (!utils.verifyIDCard(this.identity)) {
            isAbort = true;
            uiMgr.showToast("身份证有问题");
            // this.errorIdentify();
        }
        return isAbort;
    }

    async onClickGetSmsCode(){
        this.sendMsgCode();
    }
    setCodeString(text?: string) {
        this.getCodeBtn.enabled = false;
        this.getCodeBtn.getComponent(Label).string = `重新发送 (${this.delayIndex}s)`;
        if (text) {
            this.getCodeBtn.getComponent(Label).string = `重新发送 (${this.delayIndex}s)`;
        }
    }
    cancelSchedule() {
        this.unschedule(this.handler);
        this.delayIndex = 0;
        this.getCodeBtn.enabled = true;
        this.getCodeBtn.getComponent(Label).string = "重新发送";
    }
    startSchedule(text: string){
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

    async sendMsgCode(){
        this.phoneNumber = this.accountEditor.string;
        if (utils.isPhoneNumber(this.phoneNumber)) {
            let {err,resp} = await AccountMgr.getInstance().sendBindSmsCaptchaSync(this.phoneNumber);
            log("err,resp_____________________",err,resp);
            if (err === null || err === 0) {
                this.delayIndex = DELAY_TIME;
                if (resp?.expiredAt) {
                    this.delayIndex = resp.expiredAt - Math.floor(Date.now() / 1000);
                }
                this.startSchedule(null);
            }
        }else{
            uiMgr.showToast("请输入正确的手机号码");
        }
    }
    async onConfirm(){
        if (this.checkCommitIsValid()) {
            this.onConfirmFunc();
        }else{
            uiMgr.showToast("认证信息填写不完整");
        }
    }
    async reportData(){
        log("this.bindPhoneState_____________________",this.bindPhoneState);
        if (!this.bindPhoneState) {
            let {err,resp} = await AccountMgr.getInstance().bindPhoneSync(this.phoneNumber,this.verifyCode);
            if (err) {
                uiMgr.showToast(AccountMgr.getInstance().getErrorStrByCode(err) || "");
                return;
            }
        }
        this.toAuthentication();
    }
    async toAuthentication(){
        let {err,resp} = await AccountMgr.getInstance().verifyIDCardSync(this.nameStr,this.identity);
        if (err === null || err === 0) {
            uiMgr.showToast("实名认证成功,祝您游戏愉快！");
            if (resp.antiAddiction && resp.antiAddiction.remainPlaySec === 0) {
                log("resp.antiAddiction___resp.antiAddiction.remainPlaySec___________________",resp.antiAddiction,resp.antiAddiction.remainPlaySec);
            } else {
                
                log("resp.antiAddiction__resp.antiAddiction.remainPlaySec____________________",resp.antiAddiction,resp.antiAddiction.remainPlaySec);
            }
            uiMgr.popPage();
        }else{
            uiMgr.showToast(AccountMgr.getInstance().getErrorStrByCode(err) || "");
        }
    }
    async onConfirmFunc(){
        let isAbort = this.checkDataIsValid();
        if (!isAbort) {
           await this.reportData();
        }else{
            uiMgr.showToast("实名认证数据格式错误");
        }
    }
    async init(){
        await this.getUserActivitySync();
        this.initData();
    }

    initData(){
        this.phoneNumber = AccountMgr.getInstance().getBindPhone();
        this.bindPhoneState = AccountMgr.getInstance().getBindPhone().length > 0;
        let isLogin =  StorageUtil.get("LOGIN",false);
        let pos = this.cardLayout.node.getPosition()
        if (this.bindPhoneState && isLogin) {
            tween(this.cardLayout.node).to(0.001, {position: new Vec3(pos.x, 58)})
            .call(() => {
                this.phoneLayout.node.active = false;
                this.bindLayout.node.active = true;
                this.bindLabel.string = this.phoneNumber.substring(0, 3) + "****" + this.phoneNumber.substring(7);
            })
            .start()
        }else{
            tween(this.cardLayout.node).to(0.001, {position: new Vec3(pos.x, -215)})
            .call(() => {
                this.phoneLayout.node.active = true;
                this.bindLayout.node.active = false;
            })
            .start()
        }
        
    }

    update(deltaTime: number) {
        
    }
    async getUserActivitySync(){
        log("getUserActivitySync_________________________________",ActivityType.ActivityIdCardVerify);
        let result = await ActivityMgr.getInstance().getUserActivityByType(ActivityType.ActivityIdCardVerify);
        log("实名奖励resp===========>", result)
    }
}
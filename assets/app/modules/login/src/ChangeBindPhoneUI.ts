import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { EditBox,Label,Button } from 'cc';
import { AccountMgr } from 'app/domain/account/AccountMgr';
import { Log, uiMgr } from 'bos/exports';
import { utils } from './Utils';
import { CaptchaType, Code } from 'idl/mpff/user/passport.v1';
const DELAY_TIME: number = 120;

@ccclass('ChangeBindPhoneUI')
export class ChangeBindPhoneUI extends XComponent {

    @property(EditBox)
    public codeEditor: EditBox | null = null;

    @property(Label)
    public errorLab: Label | null = null;
    
    @property(Button)
    public getCodeBtn: Button | null = null;

    @property(Button)
    public loginBtn: Button | null = null;

    @property(Label)
    public bindPhone: Label | null = null;

    private delayIndex: number = 0;
    private handler: Function = null;

    async codeEditChange(){
        let code = this.codeEditor.string;
        this.updateNextBtn(code);
    }

    onLoad(): void {
        super.onLoad();
        const phone: string | undefined = AccountMgr.getInstance().getBindPhone();
        Log.w("绑定手机==========>", phone);
        if (phone && phone !== "") {
            this.bindPhone.string = `当前绑定号码: ${phone.substring(0, 3)}****${phone.substring(7)}`;
        }


    }

    updateNextBtn(code:string){
        let enabled = false;
        if (code.length >= 6) {
            enabled = true;
        }

        this.loginBtn.interactable = enabled;
        this.loginBtn.enabled = enabled;
    }

    updateErrorTips(visible:boolean,errMsg?:string){
        this.errorLab.node.active = visible;
        if (errMsg) {
            this.errorLab.string = errMsg;
        }
    }

    async onNextClick(){
        let code = this.codeEditor.string;
        let phone = AccountMgr.getInstance().getBindPhone();
        const extraData: {[key: string]: any} = {};
        extraData.unBindPhoneCode = code;

        if (code.length === 0) {
            this.updateErrorTips(true,"验证码不能为空");
            return
        }
        let {err,resp} = await AccountMgr.getInstance().verifySmsCaptcha(CaptchaType.CaptchaTypeChangeBind,phone,code);
        if (err) {
            this.updateErrorTips(true,AccountMgr.getInstance().getErrorStrByCode(err));
        }else{
            uiMgr.loadPage("login@res/prefabs/BindPhone", {params: extraData});
        }
    }

    async onBackTouch(){
        uiMgr.popPage();
    }

    async onClickGetSmsCode(){
        let account = AccountMgr.getInstance().getBindPhone();
        if (!account || account === "") {
            this.updateErrorTips(true," 请输入手机号");
            return;
        }
        const isPhone: boolean = utils.isPhoneNumber(account);
        if (!isPhone) {
            this.updateErrorTips(true,"手机号填写错误");
            return
        }

        if (this.delayIndex != 0) {
            return;
        }

        this.updateErrorTips(false);
        Log.d("sendMsgCode=======>",account)

        let {err,resp} = await AccountMgr.getInstance().sendChangeBindSmsCaptchaSync(account);

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
        }else{
            this.delayIndex = DELAY_TIME;
            if (resp.expiredAt) {
                this.delayIndex = Math.round(resp.expiredAt - Date.now() / 1000 - 1);
            }
            this.startSchedule();
        }
    }

    cancelSchedule() {
        this.unschedule(this.handler);
        this.delayIndex = 0;
        this.getCodeBtn.enabled = true;
        this.getCodeBtn.getComponent(Label).string = "重新发送";
    }
    setCodeString(text?: string) {
        this.getCodeBtn.enabled = false;
        this.getCodeBtn.getComponent(Label).string = `${this.delayIndex}秒`;
        if (text) {
            this.getCodeBtn.getComponent(Label).string = text;
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
    
    start() {

    }

}
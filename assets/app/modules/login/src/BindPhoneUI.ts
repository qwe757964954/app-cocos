import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { EditBox } from 'cc';
import { Label } from 'cc';
import { Button } from 'cc';
import { Log, uiMgr } from 'bos/exports';
import { AccountMgr } from 'app/domain/account/AccountMgr';
import { utils } from './Utils';
import { CaptchaType, Code, ISendSmsCaptchaResp} from 'idl/mpff/user/passport.v1';
const DELAY_TIME: number = 120;
@ccclass('BindPhoneUI')
export class BindPhoneUI extends XComponent {

    @property(EditBox)
    public accountEditor: EditBox | null = null;

    @property(EditBox)
    public codeEditor: EditBox | null = null;

    @property(Label)
    public errorLab: Label | null = null;
    
    @property(Button)
    public getCodeBtn: Button | null = null;

    @property(Button)
    public loginBtn: Button | null = null;

    @property(Button)
    public deleteBtn: Button | null = null;

    @property(Label)
    public loginLabel: Label | null = null;

    private extraData: {[key: string]: any} = null!;

    private delayIndex: number = 0;
    private handler: Function = null;

    start() {

    }

    async accountEditChange(){
        this.updateNextBtn();
        let account_str = utils.setPhoneFormat(this.accountEditor.string);
        this.accountEditor.getComponent(EditBox).string = account_str || "";
    }

    async codeEditChange(){
        this.updateNextBtn();
    }

    setup(params:any) {
        Log.w("params_______________________________",params);
        this.extraData = params;
    }
    async onNextClick(){
        if (AccountMgr.getInstance().getBindPhone().length === 0) {
            this.startVerifyCodeByBind();
        } else {
            this.startVerifyCodeByChangeBind();
        }
    }

    async startVerifyCodeByBind(){
        let phone = this.getAccountEdit();
        let code = this.codeEditor.string;

        if (phone.length === 0) {
            this.updateErrorTips(true, "手机号不能为空");
            return;
        }
            
        if (code.length === 0) {
            this.updateErrorTips(true, "验证码不能为空");
            return;
        }

        let {err,resp} = await AccountMgr.getInstance().bindPhoneSync(phone,code);
        if (err) {
            this.updateErrorTips(true,AccountMgr.getInstance().getErrorStrByCode(err));
            return;
        }
        uiMgr.showToast("绑定手机号成功");
        uiMgr.popPage();
    }

    async startVerifyCodeByChangeBind(){
        let oldPhone = AccountMgr.getInstance().getBindPhone();
        let oldCode = this.extraData.unBindPhoneCode;
        let phone = this.getAccountEdit();
        let code = this.codeEditor.string;

        if (phone.length === 0) {
            this.updateErrorTips(true, "手机号不能为空");
            return;
        }
            
        if (code.length === 0) {
            this.updateErrorTips(true, "验证码不能为空");
            return;
        }

        if (oldPhone === phone) {
            uiMgr.showToast("新手机号不能和旧手机号相同");
            return;
        }
        let {err,resp} = await AccountMgr.getInstance().changeBindPhoneSync(phone,code,oldPhone,oldCode);
        if (err) {
            this.updateErrorTips(true,AccountMgr.getInstance().getErrorStrByCode(err));
        } else {
            uiMgr.showToast("更改绑定新手机号成功");
            uiMgr.popPage();
        }
    }

    updateNextBtn(){
        const phone: string = this.getAccountEdit();
        const code: string = this.codeEditor.string;

        let enabled: boolean = false;
        if (code.length >= 6 && phone.length >= 11) {
            enabled = true;
        }

        this.loginBtn.interactable = enabled;
        this.loginBtn.enabled = enabled;
    }
    changeViewState(phone:string){
        Log.w("phone =", phone)
        const inputNum: number = phone.length;

        // 错误信息
        if (inputNum !== 0 && phone[0] !== "1") {
            this.updateErrorTips(true);
        } else {
            this.updateErrorTips(false);
        }
        this.deleteBtn.node.active = inputNum > 0
    }

    async onDelAllClick(){
        this.accountEditor.string = "";
        this.updateErrorTips(false);
        this.deleteBtn.node.active = false;
    }

    updateErrorTips(visible:boolean,errMsg?:string){
        this.errorLab.node.active = visible || false;
        if (errMsg) {
            this.errorLab.string = errMsg;
        }

    }
    async onBackTouch(){
        uiMgr.popPage();
    }
    getAccountEdit(){
        return this.accountEditor.string.replace(/\s/g, "");
    }
    async onClickGetSmsCode(){
        let account = this.getAccountEdit();
        const isPhone: boolean = utils.isPhoneNumber(account);
        if (!isPhone) {
            this.updateErrorTips(true,"手机号填写错误");
            return;
        }

        if (this.delayIndex != 0) {
            return;
        }

        this.updateErrorTips(false);

        Log.w("sendMsgCode=======>",account)

        if (AccountMgr.getInstance().getBindPhone().length === 0) {
            let {err,resp} = await AccountMgr.getInstance().sendBindSmsCaptchaSync(account);
            this.doSomething(err,resp);
        } else {
            let {err,resp} = await AccountMgr.getInstance().sendChangeBindSmsCaptchaSync(account);
            this.doSomething(err,resp);
        }
        
    }

    doSomething(err:number,resp:ISendSmsCaptchaResp){
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
}
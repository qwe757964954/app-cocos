import { EmptyClass, EventTargetExtends } from "bos/utils/ClassUtils";
import { Account, AccountDelegate, MobListener, PlatformParam } from 'qsdk/exports';
import { Net, Log, Crypto, eventSystem, XComponent, TimeUtil, StorageUtil, uiMgr,resLoader } from 'bos/exports';
import { App } from 'app/App';
import { User } from 'app/domain/user/User';
import { Relation } from 'qsdk/relation/Relation';
import { OSS } from 'qsdk/storage/OSS';
import { IM } from 'qsdk/im/IM';
import { Feed } from 'qsdk/feed/Feed';
import { StrongRelation } from 'qsdk/relation/StrongRelation';
import { log } from 'cc';
import { Message } from 'qsdk/im/core/Message';
import { ErrorStr } from './ErrorCode';
import { IMEvent } from 'qsdk/im/config/define';
import { ILoginByEmailPwdReq, ILoginByPhonePwdResp, ILoginRespCommon, ISendSmsCaptchaReq,IVerifyIDCardReq,BindPhoneReq,Code, IBindPhoneReq,CaptchaType, ILoginByPhonePwdReq, ILoginByPhoneSmsReq, ILoginByGuidReq, ILoginByPlatformReq,PlatformType, ILoginByPlatformResp,DeviceType, IBind, IChangeBindPhoneReq, IVerifySmsCaptchaReq,ILoginByOpIdentifyReq, ILoginReqCommon, IAntiAddiction, IUnbindPlatformReq } from "idl/mpff/user/passport.v1";
import { sys } from "cc";
import { AppConfKey } from "idl/tss/hall/appconf.v1";
import { IEmpty, Online } from "idl/bgo/base/online";
import { ICheckAndGetUserSessionV1Resp } from "idl/tss/match_v2/appbff.v1";
import { NetMgr } from "bos/framework/network/rpc/NetMgr";
import { NATIVE } from "cc/env";

const universalLinks = "https://apple-app-association.ifere.com/";

interface BindType {
    realName: boolean,
    remainPlaySec: string,
    phone: string,
    password: boolean,
    wechat: boolean
}

export interface MobPrivacyType {
    type?: string | null
    url?: string | null
    header?: { [key: string]: string }
    body?: { confKey: number }
}

interface AuthenticationData {
    cb?: (isAuth: boolean) => void;
    isLogin?: boolean;
}

export class AccountMgr extends EventTargetExtends(EmptyClass) {
    private loginData: any = null;
    private userInfo: any = null;
    private antiAddiction: any = null;
    private bindInfo: BindType;

    public constructor() {
        super()
        this.resetBindInfo();

        this.setAccountDelegate({
            commonProvider: () => {
                let data: ILoginReqCommon = {
                    channel: "iOSmain",
                    guid: "1234567890",
                };
                return data;
            },
            onPlayTimeFinish: function () {
                throw new Error('Function not implemented.');
            },
            onVerified: function (antiAddiction: IAntiAddiction) {
                throw new Error('Function not implemented.');
            }
        });
        Account.getInstance().setLoginListener({
            onLoginResult: (result) => {
                console.log("AccountMgr.onLoginResult", result)
                if (result.err) {
                    this.onLoginFailed(result.err);
                } else {
                    this.onLoginSuccess(result.resp, result.req);
                }
            }
        })

        Online.on(Online.NotifyKickUser.name, (data: ICheckAndGetUserSessionV1Resp) => {
            Log.w("AccountMgr.onNotifyKickUser", data)
            uiMgr.showToast("您的账号已在别处登录")
            this.logout()
        })

        Net.netMgr.on(Net.netEvent.conn_closed, ()=>{
            uiMgr.showToast("网络连接错误")
        }, this)

        Net.netMgr.on(Net.netEvent.conn_registered, ()=>{
            if (this.getCurLoginStatus()) {
                uiMgr.showToast("网络连接成功")
                this.tryReLogin(3)
            }
        }, this)
    }

    private static instance: AccountMgr | null = null;
    public static EventType = {
        PAUSE: "onPause",
        RESUME: "onResume",
        LOGOUT: "onLogout",
        LOGIN_SUCCESS: "onLoginSuccess",
    }
    public static getInstance(): AccountMgr {
        if (!AccountMgr.instance) {
            AccountMgr.instance = new AccountMgr();
        }
        return AccountMgr.instance;
    }


    public getCurLoginStatus(): boolean {
        return this.loginData !== null;
    }
    setAccountDelegate(delegate: AccountDelegate) {
        Account.getInstance().setDelegate(delegate)
    }
    async sendLoginSmsCaptchaSync(account: string) {
        return await this.sendSmsCaptchaReq(account, CaptchaType.CaptchaTypeLogin);
    }
    async sendSetPasswordSmsCaptchaSync(account: string) {
        return await this.sendSmsCaptchaReq(account, CaptchaType.CaptchaTypeSetPassword);
    }
    async sendBindSmsCaptchaSync(account: string) {
        return await this.sendSmsCaptchaReq(account, CaptchaType.CaptchaTypeBind);
    }
    async sendChangeBindSmsCaptchaSync(account: string) {
        return await this.sendSmsCaptchaReq(account, CaptchaType.CaptchaTypeChangeBind);
    }
    async sendSmsCaptchaReq(account: string, type: number) {
        let req: ISendSmsCaptchaReq = {
            phone: {
                number: account,
                zone: 86
            },
            type: type
        }
        return await Account.getInstance().sendSmsCaptcha(req);
    }
    async verifySmsCaptcha(type: CaptchaType, account: string, captcha: string) {
        let req: IVerifySmsCaptchaReq = {
            type: type,
            phone: {
                number: account,
                zone: 86
            },
            captcha: captcha
        }
        let { err, resp } = await Account.getInstance().verifySmsCaptcha(req);
        return { err, resp };
    }
    getErrorStrByCode(code: number) {
        if (code) {
            return ErrorStr[code] || "内部错误";
        } else {
            return "";
        }
    }
    onLoginFailed(code: number) {
        if (code === Code.LoginLinkReuse) {
            if (!StorageUtil.get("LOGGED", false)) {
                this.reloadApp();
            }
        } else if (code === Code.LoginResultErrTokenWrong) {
            this.reloadApp();
        } else if (code === Code.LoginResultMaintenance) {
            Log.w("系统维护中________________________");
        } else if (code === Code.LoginResultAccountBanned) {
            Log.w("封号处理________________________");
        } else {
            // const result = resp.result;
            // if (result && result.loginTag === "weixin") {
            //     if (result.status && result.status.subStatus === 10100) {
            //         Log.w("您还没有安装微信，无法使用微信登陆________________________");
            //     }else if (result.status && result.status.subStatus === -4) {
            //         Log.w("微信登陆失败________________________");
            //     }
            // }else{
            //     if (code === this.ErrorCode.RegisterLimit ||
            //         code === this.ErrorCode.AuthLimit
            //         ) {
            //             Log.w("微信登陆失败________________________",this.getErrorStrByCode(resp.code));
            //         }
            // }
        }
    }


    public showAuthentication(isLogin: boolean) {
        Log.w("showAuthentication_________________________")
        resLoader.loadPrefab("login@res/prefabs/AuthenticationPrefab", (err, asset) => {
            uiMgr.pushPage(asset, { params: [isLogin] });
        });
    }
    
    logout() {
        this.emit(AccountMgr.EventType.LOGOUT);
        StorageUtil.set("LOGGED", false);
        this.reloadApp();
    }

    resetBindInfo() {
        this.bindInfo = {
            realName: false,
            remainPlaySec: "",
            phone: "",
            password: false,
            wechat: false
        };
    }
    reloadApp() {
        this.loginData = null;
        this.userInfo = null;
        this.antiAddiction = null;
        Online.UserLogout({});
        this.resetBindInfo();
        App.reset()
        uiMgr.popToRootScene()
    }

    async changePasswordSync(newPassword: string, oldPassword: string) {
        let req = {
            newPassword: newPassword
        };
        if (oldPassword && oldPassword.length > 0) {
            oldPassword = Crypto.md5(oldPassword! + "*_*");
        }
        let passRet = await Account.getInstance().changePassword(req);
        if (passRet && passRet.err) {
            StorageUtil.set("PWD", newPassword);
        }
        return passRet;
    }

    async loginByPhonePwdSync(phone: string, password: string) {
        let req: ILoginByPhonePwdReq = {
            common: this.getLoginCommonData(),
            phone: { number: phone, zone: 86 },
            password: Crypto.md5(password! + "*_*"),
        };
        let { err, resp } = await Account.getInstance().loginByPhonePwd(req);
        if (err) {
            this.onLoginFailed(err);
        } else {
            StorageUtil.set("PWD", password);
            this.onLoginSuccess(resp, req);
        }
        return { err, resp };
    }

    async onLoginSuccess(resp: ILoginByPlatformResp, req: any) {
        if (req?.phone) {
            StorageUtil.set("PHONE", req?.phone?.number);
        }
        if (req?.email) {
            StorageUtil.set("EMAIL", req?.email);
        }
        StorageUtil.set("LOGIN", true);
        this.closeMobLogin();
        const isReconnect: boolean = this.getCurLoginStatus();
        this.loginData = resp;
        this.antiAddiction = resp?.common?.antiAddiction;
        const ret = await this.getAccountInfoSync(resp?.common);
        if (ret) {
            this.bindInfo.realName = this.antiAddiction.isRealname;
            const common = this.loginData.common;
            this.bindInfo.remainPlaySec = common?.antiAddiction?.remainPlaySec ?? -1;
            const loginUid = common.uid;
            StorageUtil.set("UID", loginUid);
            Log.setTag("uid", loginUid)
            if (isReconnect) {
                Log.w("Reconnected successfully", loginUid);
                uiMgr.showToast("重连成功")
                this.emit(AccountMgr.EventType.LOGIN_SUCCESS, loginUid, true);
                App.sessionMgr.reconnectSession()
                return;
            }
            Log.w("Login successful", loginUid);
            if (loginUid) {
                App.setUid(loginUid);
                StrongRelation.getInstance().init(loginUid);
                Feed.getInstance().init(loginUid);
                IM.getInstance().init(loginUid);
            }
            await OSS.getInstance().init();
            this.emit(AccountMgr.EventType.LOGIN_SUCCESS, loginUid);
        }
    }

    async getAccountInfoSync(respCommon: ILoginRespCommon) {
        if (Account.getInstance().isNeedToRealname(this.antiAddiction)) {
            await this.getBindDetails();
            if(NATIVE){
                this.showAuthentication(true);
            }
            // this.logout();
            return false;
        } else if (respCommon.antiAddiction &&
            respCommon.antiAddiction.remainPlaySec === 0 &&
            respCommon.antiAddiction.isOpen === true) {
            return false;
        } else {
            await this.getBindDetails();
        }
        return true;
    }
    async loginByEmailReq(iptText: string, passwd: string) {
        let req: ILoginByEmailPwdReq = {
            email: iptText,
            password: Crypto.md5(passwd! + "*_*"),
            common: this.getLoginCommonData(),
        }
        let { err, resp } = await Account.getInstance().loginByEmailPwd(req);
        if (err) {
            this.onLoginFailed(err);
        } else {
            StorageUtil.set("PWD", passwd);
            this.onLoginSuccess(resp, req)
        }
        return { err, resp }
    }

    async checkAccountPassportSync(phone: string) {
        let req = { phone: { number: phone, zone: 86 } };
        Log.i("GetPassport:checkAccountPassportSync=======>", req);
        let { err, resp } = await Account.getInstance().getPassport(req);
        Log.i("GetPassport:checkAccountPassportResp=======>", req);
        if (err == 0 && resp.mpPub) {
            this.bindInfo.password = resp?.mpPub?.pwdExists;
            let isPassword = this.bindInfo.password;
            let uid = resp.uid;
            let bootUid = !(uid > 0);
            return { err, resp, isPassword, bootUid };
        }
        return { err, resp };
    }

    getCurPlatform() {
        if (sys.platform == sys.Platform.IOS) {
            return DeviceType.DeviceTypeIOS;
        } else if (sys.platform == sys.Platform.ANDROID) {
            return DeviceType.DeviceTypeAndroid;
        } else if (sys.platform == sys.Platform.WIN32) {
            return DeviceType.DeviceTypeWin;
        } else if (sys.platform == sys.Platform.MACOS) {
            return DeviceType.DeviceTypeMac;
        }

    }

    getLoginCommonData() {
        const common = {
            deviceType: this.getCurPlatform(),
            deviceMode: "",
            // deviceMode: Deviceinfo.get_model() ?? "",
            clientTime: Date.now() / 1000,
            clientVersion: AppConfig.version,
            latitude: 0,
            longitude: 0,
            language: "zh",
            os: sys.platform == sys.Platform.IOS ? "ios" : "android",
            guid: "1",
            channel: AppConfig.channel,
            // guid: DeviceMgr.getDeviceGuid(),
        }
        return common;
    }
    async setPasswordBySms(phone: string, captcha: string, password: string) {
        let req: ILoginByPhoneSmsReq = {
            phone: { number: phone, zone: 86 },
            captcha: captcha,
        }
        let phoneRet = await Account.getInstance().setPasswordBySms(req);
        return phoneRet;
    }
    async loginByPhoneSmsSync(phone: string, captcha: string) {
        let req: ILoginByPhoneSmsReq = {
            common: this.getLoginCommonData(),
            phone: { number: phone, zone: 86 },
            captcha: captcha,
        };
        let { err, resp } = await Account.getInstance().loginByPhoneSms(req);
        if (err) {
            this.onLoginFailed(err);
        } else {
            this.onLoginSuccess(resp, req);
        }
        return { err, resp };
    }
    async loginByGuidSync() {
        let req: ILoginByGuidReq = { common: this.getLoginCommonData() };
        let { err, resp } = await Account.getInstance().loginByGuid(req);
        if (err) {
            this.onLoginFailed(err);
        } else {
            this.onLoginSuccess(resp, req);
        }
        return { err, resp };
    }
    async getBindDetails() {
        let queryRet = await Account.getInstance().queryAccountList({});
        let resp = queryRet.resp;
        if (queryRet.err === null || queryRet.err === 0) {
            const phone = resp.phone;
            this.bindInfo.phone = phone ? phone.number || "" : "";
            const mpPub = resp.mpPub || {};
            this.bindInfo.password = mpPub.pwdExists;
            const platformList = resp.platformList || [];
            this.bindInfo.wechat = false;
            for (let i = 0; i < platformList.length; i++) {
                const v = platformList[i];
                if (v.type === 1) {
                    this.bindInfo.wechat = v.id.length > 0;
                }
            }
        }
        return queryRet;
    }
    async verifyIDCardSync(idCardName?: string, idCardNo?: string) {
        let req: IVerifyIDCardReq = {
            idCardName: idCardName,
            idCardNo: idCardNo,
        }
        let { err, resp } = await Account.getInstance().verifyIDCard(req);
        if (err === 0 || err === null) {
            this.bindInfo.realName = true;
        }
        return { err, resp };
    }
    public getBindRealNameStatus() {
        return this.bindInfo.realName;
    }
    public getBindPhone() {
        return this.bindInfo.phone;
    }
    public setBindPhone(phone) {
        this.bindInfo.phone = phone || "";
    }
    public getBindPasswdStatus() {
        return this.bindInfo.password;
    }
    public getBindWechatStatus(){
        return this.bindInfo.wechat
    }

    public async bindWechatPlatformSync(){
        let req : PlatformParam = {
            universalLinks:universalLinks
        }
        let {err,resp} = await Account.getInstance().bindWechatNative(req);
        return {err,resp};
    }

    public async unbindWechatPlatform(){
        let req : IUnbindPlatformReq = {
            type : PlatformType.Weixin
        }
        let {err,resp} = await Account.getInstance().unbindPlatform(req);
        if (err === 0 || err === null) {
            this.bindInfo.wechat = false;
        }
        return{err,resp};
    }


    async bindPhoneSync(phone: string, captcha: string) {
        let req: IBindPhoneReq = {
            phone: { number: phone, zone: 86 },
            captcha: captcha,
        }
        let { err, resp } = await Account.getInstance().bindPhone(req);
        return { err, resp };
    }

    async changeBindPhoneSync(phone: string, captcha: string, oldPhone: string, oldCaptcha: string) {
        let oldReq: IBindPhoneReq = {
            phone: { number: oldPhone, zone: 86 },
            captcha: oldCaptcha,
        }
        let newReq: IBindPhoneReq = {
            phone: { number: phone, zone: 86 },
            captcha: captcha,
        }
        let req: IChangeBindPhoneReq = {
            old: oldReq,
            new: newReq
        }

        let { err, resp } = await Account.getInstance().changeBindPhone(req);
        if (err == 0 || err == null) {
            this.setBindPhone(phone);
        }
        return { err, resp };
    }


    async loginByWechatSync() {
        let common = this.getLoginCommonData();
        let req: PlatformParam = {
            common: common,
            type: PlatformType.Weixin,
            universalLinks: universalLinks,
            guid: common.guid + PlatformType.Weixin,
        }
        await Account.getInstance().loginWX(req);
    }

    async loginByAppleSync() {
        let common = this.getLoginCommonData();
        let req: PlatformParam = {
            common: common,
            type: PlatformType.Apple
        }
        await Account.getInstance().loginAppleNative(req);
    }

    setMobPrivacy() {
        const url = `${AppConfig.net.http.url}/${AppConfig.appID}/tss.hall.appconf.v1/GetAppConfByEnum`;

        const protocols: { [key: string]: number } = {
            privacy: AppConfKey.KeyPrivacyHtml,
            server: AppConfKey.KeyServerHtml,
            age: AppConfKey.KeyAgeAppropriateHtml
        };

        const header: { [key: string]: string } = {
            "DM-Application-ID": AppConfig.channel,
            "DM-Application-Ver": AppConfig.version,
            "DM-Encode-Type": "json"
        };

        const data: MobPrivacyType[] = [];
        Object.entries(protocols).forEach(([key, value]) => {
            console.log(key, value);
            data.push({
                type: key,
                url: url,
                header: header,
                body: {
                    confKey: value
                }
            });
        });
        const str = JSON.stringify(data);

        Account.getInstance().setMobPrivacy(str);
    }
    async loginByOpIdentifyAsync(listener:MobListener){
        let common = this.getLoginCommonData();
        let req : ILoginByOpIdentifyReq = {
            common : common,
        }
        this.setMobPrivacy();
        this.setMobLoginListener(listener);
        let {err,resp} = await Account.getInstance().LoginIdentify(req);
        if (err) {
            this.onLoginFailed(err);
        } else {
            this.onLoginSuccess(resp, req);
        }
        return { err, resp }; 
    }

    async setMobLoginListener(listener:MobListener){
        Account.getInstance().setMobLoginListener(listener);
    }

    async closeMobLogin(){
        Account.getInstance().closeMobLogin();
    }

    async autoLastLogin() {
        let result = await Account.getInstance().autoLastLogin()
        Log.i("AccountMgr.autoLastLogin...", result)
        if (result.err) {
            return result.err
        } else {
            this.onLoginSuccess(result.resp, {})
        }
    }

    async tryReLogin(num: number) {
        for(let i = 0; i < num; i++) {
            let err = await this.autoLastLogin()
            if (!err) {
                return
            }
        }
    }
    public async isWXAppInstalled(){
        return await Account.getInstance().isWXAppInstalled();
    }
}
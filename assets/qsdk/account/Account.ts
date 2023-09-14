import { Crypto, Log, ObjectUtil, StorageUtil, TimeUtil } from 'bos/exports';
import { native, sys } from 'cc';
import { FindPassportReq, IAntiAddiction, IBindPhoneReq, IBindPlatformReq, IBindPlatformResp, IChangeBindPhoneReq, IChangePasswordReq, IGetPassportReq, IListPassportReq, ILoginByEmailPwdReq, ILoginByGuidReq, ILoginByOpIdentifyReq, ILoginByPhonePwdReq, ILoginByPhoneSmsReq, ILoginByPlatformReq, ILoginByPlatformResp, ILoginReqCommon, ILoginRespCommon, ISendSmsCaptchaReq, ISetPasswordBySmsReq, IUnbindPlatformReq, IVerifyIDCardReq, IVerifySmsCaptchaReq, ListAuthTypeReq, ListUserByPhoneReq, LoginByTokenReq, Passport, PlatformType, UnbindPlatformReq } from 'idl/mpff/user/passport.v1';
import { AppleType, GodLoginResult, GodSdkAccount, IosWxLoginResult } from './GodSdkAccount';

interface SaveLoginReq {
    loginKey: string;
    common?: ILoginReqCommon;
}

interface SaveLoginResult {
    reqCommon: ILoginReqCommon;
    respCommon?: ILoginRespCommon;
}

export type PlatformParam = {
    common?: ILoginReqCommon
    type?: PlatformType
    universalLinks?: string
    guid?: string
}
export interface LoginListener {
    onLoginResult(result: LoginResult)
}
export interface AccountDelegate {
    commonProvider?(): ILoginReqCommon
    onPlayTimeFinish()
    onVerified(antiAddiction: IAntiAddiction)
}

export type LoginResult = {
    err: number
    req?: ILoginByPlatformReq
    resp?: ILoginByPlatformResp
}

export type MobResult = {
    LoginType?: string
    msg?: string
    agreementChecked?: boolean
    status?: boolean
    code?: number
    token?:string
    opToken?:string
    operator?:string
    preMob?: boolean
}
export type SupportCallback = (isSupport:boolean) => void;

export type MobCallback = (result: MobResult) => void;

export type BindCallback = (result:IosWxLoginResult)=> void;


export interface MobListener {
    onMobResult(result: MobResult)
}

export class Account {
    private lastLoginKey: string = "__lastLoginKey__";

    private delegate: AccountDelegate;

    private antiAddiction: IAntiAddiction = null

    private loginListener: LoginListener = null
    
    private static instance: Account = null;

    private lastLoginReq:PlatformParam

    static getInstance(): Account {
        if (this.instance == null) {
            this.instance = new Account();
        }
        return this.instance;
    }

    private constructor() {
        GodSdkAccount.setLoginListener({
            onLoginResult: this.onGodLoginResult.bind(this)
        })
        GodSdkAccount.init()
    }

    /**
     * 收到godsdk的登录结果
     * @param result 
     */
    private async onGodLoginResult(result: GodLoginResult) {
        console.log("onGodLoginResult", result)
        if (!result.success) {
            this.notifyLoginResult({
                err: -1,
                req: this.lastLoginReq,
                resp: null
            })
            return
        }
        let req: ILoginByPlatformReq = {
            common: this.lastLoginReq.common,
            type: result.platform,
            code: result.code
        }
        if (req.type == PlatformType.Apple) {
            req.token = result.extra.token
            req.code = result.extra.code
            req.param = JSON.stringify({
                user: result.extra.user,
                email: result.extra.email,
                givenName: result.extra.givenName,
                familyName: result.extra.familyName,
                realUserStatus: result.extra.realUserStatus,
            })
        }
        let err: number
        let resp: ILoginByPlatformResp
        if (req.type == PlatformType.Weixin) {
            let ret = await this.loginWechat(req)
            err = ret.err
            resp = ret.resp
        } else if (req.type == PlatformType.Apple) {
            let ret = await this.loginApple(req, result.extra.email)
            err = ret.err
            resp = ret.resp
        } else {
            let ret = await this.loginByPlatform(req)
            err = ret.err
            resp = ret.resp
        }
        this.notifyLoginResult({
            err: err,
            req: this.lastLoginReq,
            resp: resp,
        })
    }

    private notifyLoginResult(result: LoginResult) {
        if (this.loginListener) {
            this.loginListener.onLoginResult(result);
        }
    }

    setLoginListener(listener: LoginListener) {
        this.loginListener = listener
    }

    setDelegate(delegate: AccountDelegate) {
        this.delegate = delegate;
    }


    private getMD5Key(key: string): string {
        return "md5" + Crypto.md5(key);
    }

    async loginByEmailPwd(req: ILoginByEmailPwdReq) {
        this.tryMergeReqCommon(req)
        let { err, resp } = await Passport.LoginByEmailPwd(req);
        if (!err) {
            let saveReq: SaveLoginReq = {
                loginKey: req.email,
                common: req.common,
            };
            this.saveToken(saveReq, resp.common);
        }
        return { err, resp }
    }

    async loginByToken(req: LoginByTokenReq) {
        let { err, resp } = await Passport.LoginByToken(req);
        if (!err) {
            let saveReq: SaveLoginReq = {
                loginKey: "token",
                common: req.common,
            };
            this.saveToken(saveReq, resp.common);
        } else {
            this.clearToken()
        }
        return { err, resp };
    }

    async loginByGuid(req: ILoginByGuidReq) {
        this.tryMergeReqCommon(req)
        let { err, resp } = await Passport.LoginByGuid(req);
        if (!err) {
            let saveReq: SaveLoginReq = {
                loginKey: req.common.guid,
                common: req.common,
            };
            this.saveToken(saveReq, resp.common);
        } else {
            this.clearToken()
        }
        return { err, resp };
    }

    async loginByPhoneSms(req: ILoginByPhoneSmsReq) {
        this.tryMergeReqCommon(req)
        let { err, resp } = await Passport.LoginByPhoneSms(req);
        if (!err) {
            let saveReq: SaveLoginReq = {
                loginKey: req.phone.number,
                common: req.common,
            };
            this.saveToken(saveReq, resp.common);
        } else {
            this.clearToken()
        }
        return { err, resp };
    }

    async loginByPhonePwd(req: ILoginByPhonePwdReq) {
        this.tryMergeReqCommon(req)
        let { err, resp } = await Passport.LoginByPhonePwd(req);
        if (!err) {
            let saveReq: SaveLoginReq = {
                loginKey: req.phone.number,
                common: req.common,
            };
            this.saveToken(saveReq, resp.common);
        } else {
            this.clearToken()
        }
        return { err, resp };
    }

    private async loginByPlatform(req: ILoginByPlatformReq) {
        this.tryMergeReqCommon(req)
        let { err, resp } = await Passport.LoginByPlatform(req);
        return { err, resp };
    }

    async loginWX(param: PlatformParam) {
        this.lastLoginReq = param;
        GodSdkAccount.wechatLogin(param);
    }
    async loginAppleNative(param: PlatformParam) {
        this.lastLoginReq = param;
        GodSdkAccount.loginAppleNative();
    }

    async bindWechatNative(req: PlatformParam) : Promise<{err:number, resp:IBindPlatformResp}> {
        return new Promise((resolve, reject) => {
            GodSdkAccount.bindWechat(req.universalLinks,async (result:IosWxLoginResult)=>{
                let req : IBindPlatformReq = {
                    code:result.code,
                    type:PlatformType.Weixin,
                    appID:result.appID
                };
                let {err,resp} = await this.bindPlatform(req);
                resolve({err,resp});
            });
        });
        
    }

    private async loginWechat(req: ILoginByPlatformReq) {
        let { err, resp } = await this.loginByPlatform(req);
        if (!err) {
            let saveReq: SaveLoginReq = {
                loginKey: req.common.guid + PlatformType.Weixin,
                common: req.common,
            };
            this.saveToken(saveReq, resp.common);
        } else {
            this.clearToken()
        }
        return { err, resp };
    }

    private async loginByOpIdentify(req: ILoginByOpIdentifyReq) {
        this.tryMergeReqCommon(req)
        let { err, resp } = await Passport.LoginByOpIdentify(req);
        if (!err) {
            let saveReq: SaveLoginReq = {
                loginKey: req.common.guid + "mob",
                common: req.common,
            };
            this.saveToken(saveReq, resp.common);
        } else {
            this.clearToken()
        }
        return { err, resp };
    }

    private async loginApple(req: ILoginByPlatformReq, email: string) {
        let { err, resp } = await this.loginByPlatform(req);
        if (!err) {
            let saveReq: SaveLoginReq = {
                loginKey: req.common.guid + email,
                common: req.common,
            };
            this.saveToken(saveReq, resp.common);
        } else {
            this.clearToken()
        }
        return { err, resp };
    }

    async setPasswordBySms(req: ISetPasswordBySmsReq) {
        return await Passport.SetPasswordBySms(req);
    }

    async changePassword(req: IChangePasswordReq) {
        return await Passport.ChangePassword(req);
    }

    async sendSmsCaptcha(req: ISendSmsCaptchaReq) {
        return await Passport.SendSmsCaptcha(req);
    }

    async verifySmsCaptcha(req: IVerifySmsCaptchaReq) {
        return await Passport.VerifySmsCaptcha(req);
    }

    async changeBindPhone(req: IChangeBindPhoneReq) {
        return await Passport.ChangeBindPhone(req);
    }

    async getPassport(req: IGetPassportReq) {
        return await Passport.GetPassport(req);
    }

    async queryAccountList(req: IListPassportReq) {
        return await Passport.ListPassport(req);
    }

    async unbindPlatform(req: IUnbindPlatformReq) {
        return await Passport.UnbindPlatform(req);
    }

    async bindPlatform(req:IBindPlatformReq){
        return await Passport.BindPlatform(req);
    }

    async queryAccountInfo(req: FindPassportReq) {
        return await Passport.FindPassport(req);
    }

    async listUserByPhone(req: ListUserByPhoneReq) {
        return await Passport.ListUserByPhone(req);
    }

    async listAuthType(req: ListAuthTypeReq) {
        return await Passport.ListAuthType(req);
    }

    async verifyIDCard(req: IVerifyIDCardReq) {
        return await Passport.VerifyIDCard(req);
    }

    async bindPhone(req: IBindPhoneReq) {
        let { err, resp } = await Passport.BindPhone(req);
        if (!err) {
            this.clearToken()
        }
        return { err, resp };
    }

    clearLastLoginInfo() {
        StorageUtil.set(this.lastLoginKey, "")
    }


    /**
     * 获取上次登录信息
     * @returns SaveLoginResult | null
     */
    getLastLoginInfo(): SaveLoginResult | null {
        let key = StorageUtil.get(this.lastLoginKey)
        if (!key || key == "") {
            return null
        }
        let data: SaveLoginResult = StorageUtil.get(key, true)
        if (!data) {
            return null
        }
        if (!data.respCommon) {
            return null
        }
        if (data.respCommon.tokenExpiredAt < TimeUtil.getTime()) {
            return null
        }
        return data
    }
    /**
     *自动登录
     * @returns
     */
    async autoLastLogin() {
        let info = this.getLastLoginInfo()
        if (info) {
            let req = new LoginByTokenReq({
                common: info.reqCommon,
                token: info.respCommon.token,
                uid: info.respCommon.uid,
            });


            this.tryMergeReqCommon(req)
            console.log(req.common, "req.common");
            let { err, resp } = await this.loginByToken(req);
            return { err, resp };
        }
        return { err: -1, errMsg: "AutoLastLogin->本地token不存在" };
    }

    //是否需要实名认证
    isNeedToRealname(anti: any) {
        const antiAddiction = this.antiAddiction;
        // 开启防沉迷
        if (!antiAddiction.isOpen) {
            return false;
        }

        // 没有开启实名认证，弹出实名认证
        if (antiAddiction.isRealname === true) {
            return false;
        }

        return true;
    }

    private dealWithAntiAddiction(antiAddiction: IAntiAddiction) {
        this.antiAddiction = antiAddiction

        if (!antiAddiction.isOpen) {
            return
        }

        if (antiAddiction.isRealname) {
            if (this.delegate) {
                this.delegate.onVerified(antiAddiction)
            }
            return
        }

        if (antiAddiction.remainPlaySec == -1) {

        } else {
            if (antiAddiction.remainPlaySec == 0) {
                if (this.delegate) {
                    this.delegate.onPlayTimeFinish()
                }

            } else if (antiAddiction.remainPlaySec > 0) {
                setTimeout(() => {
                    if (this.delegate) {
                        this.delegate.onPlayTimeFinish()
                    }
                }, antiAddiction.remainPlaySec);
            }
        }
    }

    private saveToken(req: SaveLoginReq, respCommon: ILoginRespCommon): void {
        const key = req.loginKey;
        const md5Key = this.getMD5Key(key);
        let saveLoginResult: SaveLoginResult = {
            reqCommon: req.common,
            respCommon: respCommon
        }
        StorageUtil.set(md5Key, saveLoginResult)
        StorageUtil.set(this.lastLoginKey, md5Key)
        // 处理防沉迷
        this.dealWithAntiAddiction(respCommon.antiAddiction);
    }

    private clearToken() {
        let key = StorageUtil.get(this.lastLoginKey)
        if (!key || key == "") {
            return null
        }
        StorageUtil.remove(key)
        StorageUtil.remove(this.lastLoginKey)
    }


    private tryMergeReqCommon(req: any) {
        if (this.delegate) {
            let temp = this.delegate.commonProvider()
            req.common = ObjectUtil.merge(req.common, temp)
            req.common.clientTime = TimeUtil.getTime()
        }
    }

    public setMobPrivacy(str:string) {
        GodSdkAccount.setMobPrivacy(str)
    }
    public isSupportMobLogin() : Promise<{isSupport:Boolean}>  {
        return new Promise((resolve, reject) => {
            GodSdkAccount.isSupportMobLogin(async (isSupport:boolean)=>{
                resolve({isSupport});
            });
        });
    }
    public closeMobLogin() {
        GodSdkAccount.closeMobLogin()
    }
    public setMobLoginListener(listener:MobListener){
        GodSdkAccount.setMobLoginListener(listener);
    }
    async LoginIdentify(param : ILoginByOpIdentifyReq) : Promise<{err:number, resp:ILoginByPlatformResp}>  {
        return new Promise((resolve, reject) => {
            GodSdkAccount.mobLogin(async (result:MobResult)=>{
                let err: number
                let resp: ILoginByPlatformResp
                let req: ILoginByOpIdentifyReq = {
                    common: param.common,
                    operatorToken: result.opToken,
                    operator: result.operator,
                    serviceToken:result.token
                }
                if(result.code && result.code < 0){
                    err = -1;
                    resp = null;
                }else{
                    let ret = await this.loginByOpIdentify(req);
                    err = ret.err;
                    resp = ret.resp;
                }
                resolve({err,resp});
            });
        });
    }
    public async isWXAppInstalled(){
        return GodSdkAccount.isWXAppInstalled();
    }
}

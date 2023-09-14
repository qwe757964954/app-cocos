import { Code } from "idl/mpff/user/passport.v1";


let ErrorStr = {
    [Code.SmsCaptchaStatusPhoneInvalid]: "手机号格式不对",
    [Code.SmsCaptchaStatusCaptchaWrong]: "验证码错误",
    [Code.SmsCaptchaStatusTooFast]: "请求验证码频率太快",
    [Code.SmsCaptchaStatusExpire]: "验证码过期",
    [Code.SmsCaptchaStatusFailLimit]: "验证次数过多，请稍后再试",
    [Code.SmsCaptchaStatusUnExpired]: "验证码还没过期",
    [Code.SmsCaptchaStatusSendFail]: "短信验证码发送失败",
    [Code.LoginResultAccountBanned]: "账号被封禁",
    [Code.LoginResultAccountTypeLimit]: "当前账号限制登录",
    [Code.LoginResultMaintenance]: "系统正在维护",
    [Code.LoginResultErrPasswordWrong]: "密码错误请重新输入",
    [Code.BindPhoneResultPhoneBinded]: "该号码已被其他账号绑定",
    [Code.ChangePasswordResultPasswordExist]: "密码设置失败",
    [Code.ChangePasswordResultInvalidPasswordFormat]: "密码格式错误",
    [Code.IDCardVerifyResultFail]: "实名认证失败",
    [Code.IDCardVerifyResultNotMatch]: "身份证和姓名不匹配",
    [Code.IDCardVerifyResultInvalid]: "身份证号无效",
    [Code.IDCardVerifyResultRetryLimit]: "错误重试次数达到上限",
    [Code.IDCardVerifyResultBindAccountLimit]: "绑定账号数量达到上限",
    [Code.BindPlatformResultBinded]: "该微信号已绑定其他账号",
    [Code.UnbindNumForbidden]: "请先绑定手机号码再解绑微信",
    [Code.RegisterLimit]: "账号注册过多",
    [Code.AuthLimit]: "注册或登录异常，请更换设备后重新尝试",
    [Code.SmsCaptchaStatusTimeLimit]: "发送短信次数过多，请稍后再试",
    [-1]: "服务无响应",
    [7]: "服务无响应",
    [1]: "账号或密码错误",
    [2]: "请求验证码失败",
};

export {ErrorStr}
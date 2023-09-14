import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  BindPlatformReq as mpff_user_passport_v1_BindPlatformReq,IBindPlatformReq as mpff_user_passport_v1_IBindPlatformReq ,  BindPlatformResp as mpff_user_passport_v1_BindPlatformResp,IBindPlatformResp as mpff_user_passport_v1_IBindPlatformResp ,  UnbindPlatformReq as mpff_user_passport_v1_UnbindPlatformReq,IUnbindPlatformReq as mpff_user_passport_v1_IUnbindPlatformReq ,  UnbindPlatformResp as mpff_user_passport_v1_UnbindPlatformResp,IUnbindPlatformResp as mpff_user_passport_v1_IUnbindPlatformResp ,  Phone as mpff_user_passport_v1_Phone,IPhone as mpff_user_passport_v1_IPhone ,  MpPub as mpff_user_passport_v1_MpPub,IMpPub as mpff_user_passport_v1_IMpPub ,  Platform as mpff_user_passport_v1_Platform,IPlatform as mpff_user_passport_v1_IPlatform ,  LoginReqCommon as mpff_user_passport_v1_LoginReqCommon,ILoginReqCommon as mpff_user_passport_v1_ILoginReqCommon ,  LoginRespCommon as mpff_user_passport_v1_LoginRespCommon,ILoginRespCommon as mpff_user_passport_v1_ILoginRespCommon ,  PlatformLoginResp as mpff_user_passport_v1_PlatformLoginResp,IPlatformLoginResp as mpff_user_passport_v1_IPlatformLoginResp ,  IDCard as mpff_user_passport_v1_IDCard,IIDCard as mpff_user_passport_v1_IIDCard ,  } from "idl/mpff/user/passport.v1"
export interface ICallbackAfterBindPlatformReq {
    req?: mpff_user_passport_v1_IBindPlatformReq
    resp?: mpff_user_passport_v1_IBindPlatformResp
}
@protobuf.Type.d("mpff_user_callback_passport_v1_CallbackAfterBindPlatformReq")
export class CallbackAfterBindPlatformReq extends protobuf.Message<ICallbackAfterBindPlatformReq> {
    constructor(properties: Properties<ICallbackAfterBindPlatformReq>) {
        super(properties);
        if (properties) {
            if (properties.req) { this.req = mpff_user_passport_v1_BindPlatformReq.create(properties.req) as any }
            if (properties.resp) { this.resp = mpff_user_passport_v1_BindPlatformResp.create(properties.resp) as any }
        }
	}
    @protobuf.Field.d(1, "mpff_user_passport_v1_BindPlatformReq", "optional")
    public req?: mpff_user_passport_v1_BindPlatformReq|null
    @protobuf.Field.d(2, "mpff_user_passport_v1_BindPlatformResp", "optional")
    public resp?: mpff_user_passport_v1_BindPlatformResp|null
}
export interface ICallbackAfterBindPlatformResp {
}
@protobuf.Type.d("mpff_user_callback_passport_v1_CallbackAfterBindPlatformResp")
export class CallbackAfterBindPlatformResp extends protobuf.Message<ICallbackAfterBindPlatformResp> {
    constructor(properties: Properties<ICallbackAfterBindPlatformResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface ICallbackAfterUnbindPlatformReq {
    req?: mpff_user_passport_v1_IUnbindPlatformReq
    resp?: mpff_user_passport_v1_IUnbindPlatformResp
}
@protobuf.Type.d("mpff_user_callback_passport_v1_CallbackAfterUnbindPlatformReq")
export class CallbackAfterUnbindPlatformReq extends protobuf.Message<ICallbackAfterUnbindPlatformReq> {
    constructor(properties: Properties<ICallbackAfterUnbindPlatformReq>) {
        super(properties);
        if (properties) {
            if (properties.req) { this.req = mpff_user_passport_v1_UnbindPlatformReq.create(properties.req) as any }
            if (properties.resp) { this.resp = mpff_user_passport_v1_UnbindPlatformResp.create(properties.resp) as any }
        }
	}
    @protobuf.Field.d(1, "mpff_user_passport_v1_UnbindPlatformReq", "optional")
    public req?: mpff_user_passport_v1_UnbindPlatformReq|null
    @protobuf.Field.d(2, "mpff_user_passport_v1_UnbindPlatformResp", "optional")
    public resp?: mpff_user_passport_v1_UnbindPlatformResp|null
}
export interface ICallbackAfterUnbindPlatformResp {
}
@protobuf.Type.d("mpff_user_callback_passport_v1_CallbackAfterUnbindPlatformResp")
export class CallbackAfterUnbindPlatformResp extends protobuf.Message<ICallbackAfterUnbindPlatformResp> {
    constructor(properties: Properties<ICallbackAfterUnbindPlatformResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IOpIdentify {
    operatorToken?: string|null
    operator?: string|null
    serviceToken?: string|null
}
@protobuf.Type.d("mpff_user_callback_passport_v1_OpIdentify")
export class OpIdentify extends protobuf.Message<IOpIdentify> {
    constructor(properties: Properties<IOpIdentify>) {
        super(properties);
        if (properties) {
            if (properties.operatorToken) { this.operatorToken = properties.operatorToken }
            if (properties.operator) { this.operator = properties.operator }
            if (properties.serviceToken) { this.serviceToken = properties.serviceToken }
        }
	}
    @protobuf.Field.d(2, "string", "optional", )
    public operatorToken?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public serviceToken?: string|null = ""
}
export interface ILoginPassport {
    token?: string|null
    phone?: mpff_user_passport_v1_IPhone
    email?: string|null
    guid?: string|null
    mpPub?: mpff_user_passport_v1_IMpPub
    platform?: mpff_user_passport_v1_IPlatform
    opIdentify?: IOpIdentify
}
@protobuf.Type.d("mpff_user_callback_passport_v1_LoginPassport")
export class LoginPassport extends protobuf.Message<ILoginPassport> {
    constructor(properties: Properties<ILoginPassport>) {
        super(properties);
        if (properties) {
            if (properties.token) { this.token = properties.token }
            if (properties.phone) { this.phone = mpff_user_passport_v1_Phone.create(properties.phone) as any }
            if (properties.email) { this.email = properties.email }
            if (properties.guid) { this.guid = properties.guid }
            if (properties.mpPub) { this.mpPub = mpff_user_passport_v1_MpPub.create(properties.mpPub) as any }
            if (properties.platform) { this.platform = mpff_user_passport_v1_Platform.create(properties.platform) as any }
            if (properties.opIdentify) { this.opIdentify = OpIdentify.create(properties.opIdentify) as any }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public token?: string|null = ""
    @protobuf.Field.d(2, "mpff_user_passport_v1_Phone", "optional")
    public phone?: mpff_user_passport_v1_Phone|null
    @protobuf.Field.d(3, "string", "optional", )
    public email?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public guid?: string|null = ""
    @protobuf.Field.d(5, "mpff_user_passport_v1_MpPub", "optional")
    public mpPub?: mpff_user_passport_v1_MpPub|null
    @protobuf.Field.d(6, "mpff_user_passport_v1_Platform", "optional")
    public platform?: mpff_user_passport_v1_Platform|null
    @protobuf.Field.d(7, "mpff_user_callback_passport_v1_OpIdentify", "optional")
    public opIdentify?: OpIdentify|null
    @protobuf.OneOf.d("token","phone","email","guid","mpPub","platform","opIdentify")
    public Passport?: ("token"|"phone"|"email"|"guid"|"mpPub"|"platform"|"opIdentify")
}
export interface ICallbackAfterLoginReq {
    reqCommon?: mpff_user_passport_v1_ILoginReqCommon
    respCommon?: mpff_user_passport_v1_ILoginRespCommon
    loginPassport?: ILoginPassport
    resp?: mpff_user_passport_v1_IPlatformLoginResp
}
@protobuf.Type.d("mpff_user_callback_passport_v1_CallbackAfterLoginReq")
export class CallbackAfterLoginReq extends protobuf.Message<ICallbackAfterLoginReq> {
    constructor(properties: Properties<ICallbackAfterLoginReq>) {
        super(properties);
        if (properties) {
            if (properties.reqCommon) { this.reqCommon = mpff_user_passport_v1_LoginReqCommon.create(properties.reqCommon) as any }
            if (properties.respCommon) { this.respCommon = mpff_user_passport_v1_LoginRespCommon.create(properties.respCommon) as any }
            if (properties.loginPassport) { this.loginPassport = LoginPassport.create(properties.loginPassport) as any }
            if (properties.resp) { this.resp = mpff_user_passport_v1_PlatformLoginResp.create(properties.resp) as any }
        }
	}
    @protobuf.Field.d(2, "mpff_user_passport_v1_LoginReqCommon", "optional")
    public reqCommon?: mpff_user_passport_v1_LoginReqCommon|null
    @protobuf.Field.d(3, "mpff_user_passport_v1_LoginRespCommon", "optional")
    public respCommon?: mpff_user_passport_v1_LoginRespCommon|null
    @protobuf.Field.d(4, "mpff_user_callback_passport_v1_LoginPassport", "optional")
    public loginPassport?: LoginPassport|null
    @protobuf.Field.d(5, "mpff_user_passport_v1_PlatformLoginResp", "optional")
    public resp?: mpff_user_passport_v1_PlatformLoginResp|null
    @protobuf.OneOf.d("resp")
    public LoginResp?: ("resp")
}
export interface ICallbackAfterLoginResp {
    common?: mpff_user_passport_v1_ILoginRespCommon
    isRobot?: boolean|null
}
@protobuf.Type.d("mpff_user_callback_passport_v1_CallbackAfterLoginResp")
export class CallbackAfterLoginResp extends protobuf.Message<ICallbackAfterLoginResp> {
    constructor(properties: Properties<ICallbackAfterLoginResp>) {
        super(properties);
        if (properties) {
            if (properties.common) { this.common = mpff_user_passport_v1_LoginRespCommon.create(properties.common) as any }
            if (properties.isRobot) { this.isRobot = properties.isRobot }
        }
	}
    @protobuf.Field.d(2, "mpff_user_passport_v1_LoginRespCommon", "optional")
    public common?: mpff_user_passport_v1_LoginRespCommon|null
    @protobuf.Field.d(3, "bool", "optional", false)
    public isRobot?: boolean|null = false
}
export interface ICallbackAfterIDCardChangeReq {
    uid?: number|null
    idCard?: mpff_user_passport_v1_IIDCard
}
@protobuf.Type.d("mpff_user_callback_passport_v1_CallbackAfterIDCardChangeReq")
export class CallbackAfterIDCardChangeReq extends protobuf.Message<ICallbackAfterIDCardChangeReq> {
    constructor(properties: Properties<ICallbackAfterIDCardChangeReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.idCard) { this.idCard = mpff_user_passport_v1_IDCard.create(properties.idCard) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "mpff_user_passport_v1_IDCard", "optional")
    public idCard?: mpff_user_passport_v1_IDCard|null
}
export interface ICallbackAfterIDCardChangeResp {
}
@protobuf.Type.d("mpff_user_callback_passport_v1_CallbackAfterIDCardChangeResp")
export class CallbackAfterIDCardChangeResp extends protobuf.Message<ICallbackAfterIDCardChangeResp> {
    constructor(properties: Properties<ICallbackAfterIDCardChangeResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface ICallbackAfterBindPhoneReq {
    uid?: number|null
    phone?: mpff_user_passport_v1_IPhone
}
@protobuf.Type.d("mpff_user_callback_passport_v1_CallbackAfterBindPhoneReq")
export class CallbackAfterBindPhoneReq extends protobuf.Message<ICallbackAfterBindPhoneReq> {
    constructor(properties: Properties<ICallbackAfterBindPhoneReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.phone) { this.phone = mpff_user_passport_v1_Phone.create(properties.phone) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "mpff_user_passport_v1_Phone", "optional")
    public phone?: mpff_user_passport_v1_Phone|null
}
export interface ICallbackAfterBindPhoneResp {
}
@protobuf.Type.d("mpff_user_callback_passport_v1_CallbackAfterBindPhoneResp")
export class CallbackAfterBindPhoneResp extends protobuf.Message<ICallbackAfterBindPhoneResp> {
    constructor(properties: Properties<ICallbackAfterBindPhoneResp>) {
        super(properties);
        if (properties) {
        }
	}
}
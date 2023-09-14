import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
export enum Gender {  
    GenderUnknown = 0,  
    GenderMale = 1,  
    GenderFemale = 2,
}
export enum PermissionStatus {  
    PermissionStatusUnknown = 0,  
    PermissionStatusAllow = 1,  
    PermissionStatusDeny = 2,
}
export enum DeviceType {  
    DeviceTypeWin = 0,  
    DeviceTypeIOS = 1,  
    DeviceTypeAndroid = 2,  
    DeviceTypeWeb = 3,  
    DeviceTypeMac = 4,  
    DeviceTypeSimulator = 5,
}
export enum LoginType {  
    LoginTypeGuid = 0,  
    LoginTypeCaptcha = 1,  
    LoginTypePassword = 2,  
    LoginTypeCertificate = 3,  
    LoginTypePlatform = 4,  
    LoginTypeIdentify = 5,
}
export enum PassportType {  
    PassportTypeUnknow = 0,  
    PassportTypeGuid = 1,  
    PassportTypePhone = 2,  
    PassportTypeEmail = 3,  
    PassportTypePlatformBegin = 10000000,  
    PassportTypePlatformWechat = 10000001,  
    PassportTypePlatformApple = 10000002,  
    PassportTypePlatformOppo = 10000003,  
    PassportTypePlatformVivo = 10000004,  
    PassportTypePlatformHuawei = 10000005,  
    PassportTypePlatformXiaomi = 10000006,  
    PassportTypePlatformMeizu = 10000007,  
    PassportTypePlatformYingyongbao = 10000008,  
    PassportTypePlatformEnd = 20000000,
}
export enum IDCardStatus {  
    IDCardStatusUnVerify = 0,  
    IDCardStatusVerifying = 1,  
    IDCardStatusVerifySuccess = 2,  
    IDCardStatusVerifyFail = 3,
}
export enum CancelState {  
    CancelStateUnknown = 0,  
    CancelStateIng = 1,  
    CancelStateSuc = 2,  
    CancelStateRevoke = 3,  
    CancelStateFail = 4,
}
export enum CancelOperate {  
    CancelOperateUnknown = 0,  
    CancelOperateUserCancel = 1,  
    CancelOperateRevokeUserLogin = 2,  
    CancelOperateSucTimeUp = 3,  
    CancelOperateAdminRevoke = 4,  
    CancelOperateSucForce = 5,
}
export interface ILoginParam {
    ip?: string|null
    guid?: string|null
    deviceType?: DeviceType|null
    deviceMode?: string|null
    clientTime?: number|null
    clientVersion?: string|null
    latitude?: number|null
    longitude?: number|null
    language?: string|null
    os?: string|null
    channel?: string|null
    isSimulator?: boolean|null
}
@protobuf.Type.d("mp_common_LoginParam")
export class LoginParam extends protobuf.Message<ILoginParam> {
    constructor(properties: Properties<ILoginParam>) {
        super(properties);
        if (properties) {
            if (properties.ip) { this.ip = properties.ip }
            if (properties.guid) { this.guid = properties.guid }
            if (properties.deviceType) { this.deviceType = properties.deviceType }
            if (properties.deviceMode) { this.deviceMode = properties.deviceMode }
            if (properties.clientTime) { this.clientTime = properties.clientTime }
            if (properties.clientVersion) { this.clientVersion = properties.clientVersion }
            if (properties.latitude) { this.latitude = properties.latitude }
            if (properties.longitude) { this.longitude = properties.longitude }
            if (properties.language) { this.language = properties.language }
            if (properties.os) { this.os = properties.os }
            if (properties.channel) { this.channel = properties.channel }
            if (properties.isSimulator) { this.isSimulator = properties.isSimulator }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public ip?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public guid?: string|null = ""
    @protobuf.Field.d(6, DeviceType, "optional", DeviceType.DeviceTypeWin)
    public deviceType?: DeviceType|null = DeviceType.DeviceTypeWin
    @protobuf.Field.d(7, "string", "optional", )
    public deviceMode?: string|null = ""
    @protobuf.Field.d(8, "int64", "optional", 0)
    public clientTime?: number|null = 0
    @protobuf.Field.d(9, "string", "optional", )
    public clientVersion?: string|null = ""
    @protobuf.Field.d(10, "float", "optional", 0)
    public latitude?: number|null = 0
    @protobuf.Field.d(11, "float", "optional", 0)
    public longitude?: number|null = 0
    @protobuf.Field.d(12, "string", "optional", )
    public language?: string|null = ""
    @protobuf.Field.d(13, "string", "optional", )
    public os?: string|null = ""
    @protobuf.Field.d(14, "string", "optional", )
    public channel?: string|null = ""
    @protobuf.Field.d(15, "bool", "optional", false)
    public isSimulator?: boolean|null = false
}
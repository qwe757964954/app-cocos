import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  CancelState as mp_common_CancelState ,  CancelOperate as mp_common_CancelOperate ,  } from "idl/mp/common/user"
import {  AppUser as mp_v1_AppUser,IAppUser as mp_v1_IAppUser ,  } from "idl/mp/mp.v1"
export interface ICallbackNotifyAppUserCancelReq {
    user?: mp_v1_IAppUser
    state?: mp_common_CancelState|null
    operate?: mp_common_CancelOperate|null
    operator?: string|null
}
@protobuf.Type.d("mp_user_callback_account_v1_CallbackNotifyAppUserCancelReq")
export class CallbackNotifyAppUserCancelReq extends protobuf.Message<ICallbackNotifyAppUserCancelReq> {
    constructor(properties: Properties<ICallbackNotifyAppUserCancelReq>) {
        super(properties);
        if (properties) {
            if (properties.user) { this.user = mp_v1_AppUser.create(properties.user) as any }
            if (properties.state) { this.state = properties.state }
            if (properties.operate) { this.operate = properties.operate }
            if (properties.operator) { this.operator = properties.operator }
        }
	}
    @protobuf.Field.d(1, "mp_v1_AppUser", "optional")
    public user?: mp_v1_AppUser|null
    @protobuf.Field.d(2, mp_common_CancelState, "optional", mp_common_CancelState.CancelStateUnknown)
    public state?: mp_common_CancelState|null = mp_common_CancelState.CancelStateUnknown
    @protobuf.Field.d(3, mp_common_CancelOperate, "optional", mp_common_CancelOperate.CancelOperateUnknown)
    public operate?: mp_common_CancelOperate|null = mp_common_CancelOperate.CancelOperateUnknown
    @protobuf.Field.d(4, "string", "optional", )
    public operator?: string|null = ""
}
export interface ICallbackNotifyAppUserCancelResp {
}
@protobuf.Type.d("mp_user_callback_account_v1_CallbackNotifyAppUserCancelResp")
export class CallbackNotifyAppUserCancelResp extends protobuf.Message<ICallbackNotifyAppUserCancelResp> {
    constructor(properties: Properties<ICallbackNotifyAppUserCancelResp>) {
        super(properties);
        if (properties) {
        }
	}
}
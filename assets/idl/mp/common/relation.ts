import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
export enum MpRelateNotifyCmd {  
    MpRelateNotifyCmdUnknown = 0,  
    MpRelateNotifyCmdRelateChange = 1,  
    MpRelateNotifyCmdRelateApplyChange = 2,
}
export enum MpRelateNotifyApplyCmd {  
    MpRelateNotifyApplyCmdUnknown = 0,  
    MpRelateNotifyApplyCmdApply = 1,  
    MpRelateNotifyApplyCmdAccept = 2,  
    MpRelateNotifyApplyCmdReject = 3,  
    MpRelateNotifyApplyCmdDel = 4,
}
export interface IMpRelateNotifyCall {
    cmd?: MpRelateNotifyCmd|null
    appID?: number|null
    uidList?: number[]
    applyCmd?: MpRelateNotifyApplyCmd|null
}
@protobuf.Type.d("mp_common_MpRelateNotifyCall")
export class MpRelateNotifyCall extends protobuf.Message<IMpRelateNotifyCall> {
    constructor(properties: Properties<IMpRelateNotifyCall>) {
        super(properties);
        if (properties) {
            if (properties.cmd) { this.cmd = properties.cmd }
            if (properties.appID) { this.appID = properties.appID }
            if (properties.uidList) { this.uidList = []; properties.uidList.forEach((value, index)=>{this.uidList[index] = properties.uidList[index]})}
            if (properties.applyCmd) { this.applyCmd = properties.applyCmd }
        }
	}
    @protobuf.Field.d(1, MpRelateNotifyCmd, "optional", MpRelateNotifyCmd.MpRelateNotifyCmdUnknown)
    public cmd?: MpRelateNotifyCmd|null = MpRelateNotifyCmd.MpRelateNotifyCmdUnknown
    @protobuf.Field.d(2, "int32", "optional", 0)
    public appID?: number|null = 0
    @protobuf.Field.d(3, "int64", "repeated", [])
    public uidList?: number[] = []
    @protobuf.Field.d(4, MpRelateNotifyApplyCmd, "optional", MpRelateNotifyApplyCmd.MpRelateNotifyApplyCmdUnknown)
    public applyCmd?: MpRelateNotifyApplyCmd|null = MpRelateNotifyApplyCmd.MpRelateNotifyApplyCmdUnknown
}
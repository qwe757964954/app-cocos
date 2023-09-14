import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
export enum MpIMNotifyCmd {  
    MpIMNotifyCmdUnknow = 0,  
    MpIMNotifyCmdNewInbox = 1,  
    MpIMNotifyCmdMessage = 2,
}
export interface IMessageNotifySeq {
    bat?: number|null
    seq?: number|null
}
@protobuf.Type.d("mp_common_MessageNotifySeq")
export class MessageNotifySeq extends protobuf.Message<IMessageNotifySeq> {
    constructor(properties: Properties<IMessageNotifySeq>) {
        super(properties);
        if (properties) {
            if (properties.bat) { this.bat = properties.bat }
            if (properties.seq) { this.seq = properties.seq }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public bat?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public seq?: number|null = 0
}
export interface IMpIMNotifyCall {
    cmd?: MpIMNotifyCmd|null
    appID?: number|null
    uidList?: number[]
    content?: Uint8Array
    srvSeq?: IMessageNotifySeq
}
@protobuf.Type.d("mp_common_MpIMNotifyCall")
export class MpIMNotifyCall extends protobuf.Message<IMpIMNotifyCall> {
    constructor(properties: Properties<IMpIMNotifyCall>) {
        super(properties);
        if (properties) {
            if (properties.cmd) { this.cmd = properties.cmd }
            if (properties.appID) { this.appID = properties.appID }
            if (properties.uidList) { this.uidList = []; properties.uidList.forEach((value, index)=>{this.uidList[index] = properties.uidList[index]})}
            if (properties.content) { this.content = properties.content }
            if (properties.srvSeq) { this.srvSeq = MessageNotifySeq.create(properties.srvSeq) as any }
        }
	}
    @protobuf.Field.d(1, MpIMNotifyCmd, "optional", MpIMNotifyCmd.MpIMNotifyCmdUnknow)
    public cmd?: MpIMNotifyCmd|null = MpIMNotifyCmd.MpIMNotifyCmdUnknow
    @protobuf.Field.d(2, "uint32", "optional", 0)
    public appID?: number|null = 0
    @protobuf.Field.d(3, "int64", "repeated", [])
    public uidList?: number[] = []
    @protobuf.Field.d(4, "bytes", "optional", [])
    public content?: Uint8Array
    @protobuf.Field.d(5, "mp_common_MessageNotifySeq", "optional")
    public srvSeq?: MessageNotifySeq|null
}
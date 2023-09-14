import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  DetectionTask as mp_audit_detect_v1_DetectionTask,IDetectionTask as mp_audit_detect_v1_IDetectionTask ,  } from "idl/mp/audit/detect.v1"
export interface ICallbackNotifyRejectDetectionTaskReq {
    task?: mp_audit_detect_v1_IDetectionTask
}
@protobuf.Type.d("mp_audit_callback_detect_v1_CallbackNotifyRejectDetectionTaskReq")
export class CallbackNotifyRejectDetectionTaskReq extends protobuf.Message<ICallbackNotifyRejectDetectionTaskReq> {
    constructor(properties: Properties<ICallbackNotifyRejectDetectionTaskReq>) {
        super(properties);
        if (properties) {
            if (properties.task) { this.task = mp_audit_detect_v1_DetectionTask.create(properties.task) as any }
        }
	}
    @protobuf.Field.d(1, "mp_audit_detect_v1_DetectionTask", "optional")
    public task?: mp_audit_detect_v1_DetectionTask|null
}
export interface ICallbackNotifyRejectDetectionTaskResp {
}
@protobuf.Type.d("mp_audit_callback_detect_v1_CallbackNotifyRejectDetectionTaskResp")
export class CallbackNotifyRejectDetectionTaskResp extends protobuf.Message<ICallbackNotifyRejectDetectionTaskResp> {
    constructor(properties: Properties<ICallbackNotifyRejectDetectionTaskResp>) {
        super(properties);
        if (properties) {
        }
	}
}
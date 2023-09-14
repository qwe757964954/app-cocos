import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
export enum BuffCondition {  
    BuffConditionUnknown = 0,  
    BuffConditionMateMatch = 1,  
    BuffConditionMatch = 2,
}
export enum MarkupRateType {  
    MarkupRateUnknown = 0,  
    MarkupRateAllAsset = 1,  
    MarkupRateWalletAsset = 2,
}
export interface IBuffExtraConf {
    buffCondition?: BuffCondition[]
    markupRateType?: MarkupRateType|null
    meta?: { [k: string]: string|null }
}
@protobuf.Type.d("tss_hall_common_BuffExtraConf")
export class BuffExtraConf extends protobuf.Message<IBuffExtraConf> {
    constructor(properties: Properties<IBuffExtraConf>) {
        super(properties);
        if (properties) {
            if (properties.buffCondition) { this.buffCondition = []; properties.buffCondition.forEach((value, index)=>{this.buffCondition[index] = properties.buffCondition[index]})}
            if (properties.markupRateType) { this.markupRateType = properties.markupRateType }
            if (properties.meta) { this.meta = properties.meta }
        }
	}
    @protobuf.Field.d(1, BuffCondition, "repeated", BuffCondition.BuffConditionUnknown)
    public buffCondition?: BuffCondition[] = []
    @protobuf.Field.d(2, MarkupRateType, "optional", MarkupRateType.MarkupRateUnknown)
    public markupRateType?: MarkupRateType|null = MarkupRateType.MarkupRateUnknown
    @protobuf.MapField.d(3, "string", "string")
    public meta?: { [k: string]: string|null } = {}
}
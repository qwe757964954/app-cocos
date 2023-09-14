import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  PropItem as tss_common_PropItem,IPropItem as tss_common_IPropItem ,  } from "idl/tss/common/common_define"
export enum Source {  
    SourceUnknown = 0,  
    SourceWeeklySignIn = 1,  
    SourceDailyTask = 2,  
    SourceActivity = 3,  
    SourceMatch = 4,  
    SourceMatchRevive = 5,  
    SourceVIPLevel = 6,
}
export interface IVIPAwardAcquiredEvent {
    uid?: number|null
    props?: tss_common_IPropItem[]
    source?: Source|null
}
@protobuf.Type.d("tss_event_vip_VIPAwardAcquiredEvent")
export class VIPAwardAcquiredEvent extends protobuf.Message<IVIPAwardAcquiredEvent> {
    constructor(properties: Properties<IVIPAwardAcquiredEvent>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.props) { this.props = []; properties.props.forEach((value, index)=>{this.props[index] = tss_common_PropItem.create(properties.props[index]) as any})}
            if (properties.source) { this.source = properties.source }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "tss_common_PropItem", "repeated")
    public props?: tss_common_PropItem[] = []
    @protobuf.Field.d(3, Source, "optional", Source.SourceUnknown)
    public source?: Source|null = Source.SourceUnknown
}
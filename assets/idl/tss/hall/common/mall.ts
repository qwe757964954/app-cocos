import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
export enum ProductType {  
    ProductUnknown = 0,  
    ProductPremiumCard = 1,  
    ProductDiamond = 2,  
    ProductGift = 3,  
    ProductProp = 4,
}
export interface IDeliverProduct {
    pid?: number|null
    pType?: ProductType|null
    uid?: number|null
    amount?: number|null
    orderId?: string|null
}
@protobuf.Type.d("tss_hall_common_DeliverProduct")
export class DeliverProduct extends protobuf.Message<IDeliverProduct> {
    constructor(properties: Properties<IDeliverProduct>) {
        super(properties);
        if (properties) {
            if (properties.pid) { this.pid = properties.pid }
            if (properties.pType) { this.pType = properties.pType }
            if (properties.uid) { this.uid = properties.uid }
            if (properties.amount) { this.amount = properties.amount }
            if (properties.orderId) { this.orderId = properties.orderId }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public pid?: number|null = 0
    @protobuf.Field.d(2, ProductType, "optional", ProductType.ProductUnknown)
    public pType?: ProductType|null = ProductType.ProductUnknown
    @protobuf.Field.d(3, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public amount?: number|null = 0
    @protobuf.Field.d(5, "string", "optional", )
    public orderId?: string|null = ""
}
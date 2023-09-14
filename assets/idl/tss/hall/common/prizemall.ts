import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  AssetItem as tss_common_AssetItem,IAssetItem as tss_common_IAssetItem ,  } from "idl/tss/common/common_define"
export enum DeliveryChannelType {  
    DeliveryChannelTypeUnknown = 0,  
    DeliveryChannelTypeOnlinePhone = 1,  
    DeliveryChannelTypeOnlineCDK = 2,  
    DeliveryChannelTypeOfflineExpress = 3,  
    DeliveryChannelTypeOnlineProp = 4,  
    DeliveryChannelTypeOfflineSelfPickUp = 5,  
    DeliveryChannelTypeOfflineSelfOrExpress = 6,  
    DeliveryChannelTypeOnlinePropDirect = 7,
}
export enum DiscountReason {  
    DiscountReasonUnknown = 0,  
    DiscountReasonCouponProp = 1,  
    DiscountReasonDiscount = 2,
}
export interface IPrice {
    RMB?: number|null
    asset?: tss_common_IAssetItem
}
@protobuf.Type.d("tss_hall_common_Price")
export class Price extends protobuf.Message<IPrice> {
    constructor(properties: Properties<IPrice>) {
        super(properties);
        if (properties) {
            if (properties.RMB) { this.RMB = properties.RMB }
            if (properties.asset) { this.asset = tss_common_AssetItem.create(properties.asset) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public RMB?: number|null = 0
    @protobuf.Field.d(2, "tss_common_AssetItem", "optional")
    public asset?: tss_common_AssetItem|null
}
export interface IDiscountPrice {
    reason?: DiscountReason|null
    price?: IPrice
}
@protobuf.Type.d("tss_hall_common_DiscountPrice")
export class DiscountPrice extends protobuf.Message<IDiscountPrice> {
    constructor(properties: Properties<IDiscountPrice>) {
        super(properties);
        if (properties) {
            if (properties.reason) { this.reason = properties.reason }
            if (properties.price) { this.price = Price.create(properties.price) as any }
        }
	}
    @protobuf.Field.d(1, DiscountReason, "optional", DiscountReason.DiscountReasonUnknown)
    public reason?: DiscountReason|null = DiscountReason.DiscountReasonUnknown
    @protobuf.Field.d(2, "tss_hall_common_Price", "optional")
    public price?: Price|null
}
export interface IAddress {
    receiver?: string|null
    contactNumber?: string|null
    province?: string|null
    city?: string|null
    region?: string|null
    addr?: string|null
    coordinates?: number[]
}
@protobuf.Type.d("tss_hall_common_Address")
export class Address extends protobuf.Message<IAddress> {
    constructor(properties: Properties<IAddress>) {
        super(properties);
        if (properties) {
            if (properties.receiver) { this.receiver = properties.receiver }
            if (properties.contactNumber) { this.contactNumber = properties.contactNumber }
            if (properties.province) { this.province = properties.province }
            if (properties.city) { this.city = properties.city }
            if (properties.region) { this.region = properties.region }
            if (properties.addr) { this.addr = properties.addr }
            if (properties.coordinates) { this.coordinates = []; properties.coordinates.forEach((value, index)=>{this.coordinates[index] = properties.coordinates[index]})}
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public receiver?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public contactNumber?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public province?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public city?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public region?: string|null = ""
    @protobuf.Field.d(6, "string", "optional", )
    public addr?: string|null = ""
    @protobuf.Field.d(7, "float", "repeated", [])
    public coordinates?: number[] = []
}
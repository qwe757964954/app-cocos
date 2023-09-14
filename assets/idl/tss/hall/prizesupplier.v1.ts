import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  Void as base_Void,IVoid as base_IVoid ,  } from "idl/base/base"
import {  SwitchState as tss_common_SwitchState ,  } from "idl/tss/common/common_define"
import {  Address as tss_hall_common_Address,IAddress as tss_hall_common_IAddress ,  } from "idl/tss/hall/common/prizemall"
export interface ISupplier {
    ID?: string|null
    addr?: tss_hall_common_IAddress
    uids?: number[]
    switch?: tss_common_SwitchState|null
    createAt?: number|null
    updateAt?: number|null
    operator?: string|null
    deleteAt?: number|null
}
@protobuf.Type.d("tss_hall_prizesupplier_v1_Supplier")
export class Supplier extends protobuf.Message<ISupplier> {
    constructor(properties: Properties<ISupplier>) {
        super(properties);
        if (properties) {
            if (properties.ID) { this.ID = properties.ID }
            if (properties.addr) { this.addr = tss_hall_common_Address.create(properties.addr) as any }
            if (properties.uids) { this.uids = []; properties.uids.forEach((value, index)=>{this.uids[index] = properties.uids[index]})}
            if (properties.switch) { this.switch = properties.switch }
            if (properties.createAt) { this.createAt = properties.createAt }
            if (properties.updateAt) { this.updateAt = properties.updateAt }
            if (properties.operator) { this.operator = properties.operator }
            if (properties.deleteAt) { this.deleteAt = properties.deleteAt }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public ID?: string|null = ""
    @protobuf.Field.d(2, "tss_hall_common_Address", "optional")
    public addr?: tss_hall_common_Address|null
    @protobuf.Field.d(3, "int64", "repeated", [])
    public uids?: number[] = []
    @protobuf.Field.d(4, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public switch?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
    @protobuf.Field.d(5, "int64", "optional", 0)
    public createAt?: number|null = 0
    @protobuf.Field.d(6, "int64", "optional", 0)
    public updateAt?: number|null = 0
    @protobuf.Field.d(7, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(8, "int64", "optional", 0)
    public deleteAt?: number|null = 0
}
export interface IProduct {
    SKUID?: number|null
    supplierID?: string|null
    amt?: number|null
}
@protobuf.Type.d("tss_hall_prizesupplier_v1_Product")
export class Product extends protobuf.Message<IProduct> {
    constructor(properties: Properties<IProduct>) {
        super(properties);
        if (properties) {
            if (properties.SKUID) { this.SKUID = properties.SKUID }
            if (properties.supplierID) { this.supplierID = properties.supplierID }
            if (properties.amt) { this.amt = properties.amt }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public SKUID?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public supplierID?: string|null = ""
    @protobuf.Field.d(3, "int64", "optional", 0)
    public amt?: number|null = 0
}
export interface ISaveSupplierReq {
    supplier?: ISupplier
}
@protobuf.Type.d("tss_hall_prizesupplier_v1_SaveSupplierReq")
export class SaveSupplierReq extends protobuf.Message<ISaveSupplierReq> {
    constructor(properties: Properties<ISaveSupplierReq>) {
        super(properties);
        if (properties) {
            if (properties.supplier) { this.supplier = Supplier.create(properties.supplier) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizesupplier_v1_Supplier", "optional")
    public supplier?: Supplier|null
}
export interface ISaveSupplierResp {
    supplier?: ISupplier
}
@protobuf.Type.d("tss_hall_prizesupplier_v1_SaveSupplierResp")
export class SaveSupplierResp extends protobuf.Message<ISaveSupplierResp> {
    constructor(properties: Properties<ISaveSupplierResp>) {
        super(properties);
        if (properties) {
            if (properties.supplier) { this.supplier = Supplier.create(properties.supplier) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizesupplier_v1_Supplier", "optional")
    public supplier?: Supplier|null
}
export interface IListSupplierReq {
    page?: number|null
    pageSize?: number|null
    name?: string|null
}
@protobuf.Type.d("tss_hall_prizesupplier_v1_ListSupplierReq")
export class ListSupplierReq extends protobuf.Message<IListSupplierReq> {
    constructor(properties: Properties<IListSupplierReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.name) { this.name = properties.name }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public name?: string|null = ""
}
export interface IListSupplierResp {
    suppliers?: ISupplier[]
    total?: number|null
}
@protobuf.Type.d("tss_hall_prizesupplier_v1_ListSupplierResp")
export class ListSupplierResp extends protobuf.Message<IListSupplierResp> {
    constructor(properties: Properties<IListSupplierResp>) {
        super(properties);
        if (properties) {
            if (properties.suppliers) { this.suppliers = []; properties.suppliers.forEach((value, index)=>{this.suppliers[index] = Supplier.create(properties.suppliers[index]) as any})}
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizesupplier_v1_Supplier", "repeated")
    public suppliers?: Supplier[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public total?: number|null = 0
}
export interface IDeleteSupplierReq {
    ID?: string|null
}
@protobuf.Type.d("tss_hall_prizesupplier_v1_DeleteSupplierReq")
export class DeleteSupplierReq extends protobuf.Message<IDeleteSupplierReq> {
    constructor(properties: Properties<IDeleteSupplierReq>) {
        super(properties);
        if (properties) {
            if (properties.ID) { this.ID = properties.ID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public ID?: string|null = ""
}
export interface ISaveProductReq {
    product?: IProduct
}
@protobuf.Type.d("tss_hall_prizesupplier_v1_SaveProductReq")
export class SaveProductReq extends protobuf.Message<ISaveProductReq> {
    constructor(properties: Properties<ISaveProductReq>) {
        super(properties);
        if (properties) {
            if (properties.product) { this.product = Product.create(properties.product) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizesupplier_v1_Product", "optional")
    public product?: Product|null
}
export interface ISaveProductResp {
    product?: IProduct
}
@protobuf.Type.d("tss_hall_prizesupplier_v1_SaveProductResp")
export class SaveProductResp extends protobuf.Message<ISaveProductResp> {
    constructor(properties: Properties<ISaveProductResp>) {
        super(properties);
        if (properties) {
            if (properties.product) { this.product = Product.create(properties.product) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizesupplier_v1_Product", "optional")
    public product?: Product|null
}
export interface IListProductReq {
    supplierID?: string|null
    page?: number|null
    pageSize?: number|null
}
@protobuf.Type.d("tss_hall_prizesupplier_v1_ListProductReq")
export class ListProductReq extends protobuf.Message<IListProductReq> {
    constructor(properties: Properties<IListProductReq>) {
        super(properties);
        if (properties) {
            if (properties.supplierID) { this.supplierID = properties.supplierID }
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public supplierID?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public pageSize?: number|null = 0
}
export interface IListProductResp {
    products?: IProduct[]
    total?: number|null
}
@protobuf.Type.d("tss_hall_prizesupplier_v1_ListProductResp")
export class ListProductResp extends protobuf.Message<IListProductResp> {
    constructor(properties: Properties<IListProductResp>) {
        super(properties);
        if (properties) {
            if (properties.products) { this.products = []; properties.products.forEach((value, index)=>{this.products[index] = Product.create(properties.products[index]) as any})}
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizesupplier_v1_Product", "repeated")
    public products?: Product[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public total?: number|null = 0
}
export interface IGetSupplierReq {
    supplierID?: string|null
    name?: string|null
}
@protobuf.Type.d("tss_hall_prizesupplier_v1_GetSupplierReq")
export class GetSupplierReq extends protobuf.Message<IGetSupplierReq> {
    constructor(properties: Properties<IGetSupplierReq>) {
        super(properties);
        if (properties) {
            if (properties.supplierID) { this.supplierID = properties.supplierID }
            if (properties.name) { this.name = properties.name }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public supplierID?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public name?: string|null = ""
}
export interface IGetSupplierResp {
    supplier?: ISupplier
}
@protobuf.Type.d("tss_hall_prizesupplier_v1_GetSupplierResp")
export class GetSupplierResp extends protobuf.Message<IGetSupplierResp> {
    constructor(properties: Properties<IGetSupplierResp>) {
        super(properties);
        if (properties) {
            if (properties.supplier) { this.supplier = Supplier.create(properties.supplier) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizesupplier_v1_Supplier", "optional")
    public supplier?: Supplier|null
}
export interface IProductGroup {
    supplierID?: string|null
    SKUID?: number|null
}
@protobuf.Type.d("tss_hall_prizesupplier_v1_ProductGroup")
export class ProductGroup extends protobuf.Message<IProductGroup> {
    constructor(properties: Properties<IProductGroup>) {
        super(properties);
        if (properties) {
            if (properties.supplierID) { this.supplierID = properties.supplierID }
            if (properties.SKUID) { this.SKUID = properties.SKUID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public supplierID?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public SKUID?: number|null = 0
}
export interface IBatchGetProductReq {
    productGroups?: IProductGroup[]
}
@protobuf.Type.d("tss_hall_prizesupplier_v1_BatchGetProductReq")
export class BatchGetProductReq extends protobuf.Message<IBatchGetProductReq> {
    constructor(properties: Properties<IBatchGetProductReq>) {
        super(properties);
        if (properties) {
            if (properties.productGroups) { this.productGroups = []; properties.productGroups.forEach((value, index)=>{this.productGroups[index] = ProductGroup.create(properties.productGroups[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizesupplier_v1_ProductGroup", "repeated")
    public productGroups?: ProductGroup[] = []
}
export interface IBatchGetProductResp {
    products?: IProduct[]
}
@protobuf.Type.d("tss_hall_prizesupplier_v1_BatchGetProductResp")
export class BatchGetProductResp extends protobuf.Message<IBatchGetProductResp> {
    constructor(properties: Properties<IBatchGetProductResp>) {
        super(properties);
        if (properties) {
            if (properties.products) { this.products = []; properties.products.forEach((value, index)=>{this.products[index] = Product.create(properties.products[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizesupplier_v1_Product", "repeated")
    public products?: Product[] = []
}
export interface IBatchGetProductTotalReq {
    skuID?: number[]
}
@protobuf.Type.d("tss_hall_prizesupplier_v1_BatchGetProductTotalReq")
export class BatchGetProductTotalReq extends protobuf.Message<IBatchGetProductTotalReq> {
    constructor(properties: Properties<IBatchGetProductTotalReq>) {
        super(properties);
        if (properties) {
            if (properties.skuID) { this.skuID = []; properties.skuID.forEach((value, index)=>{this.skuID[index] = properties.skuID[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public skuID?: number[] = []
}
export interface IBatchGetProductTotalResp {
    products?: IProduct[]
}
@protobuf.Type.d("tss_hall_prizesupplier_v1_BatchGetProductTotalResp")
export class BatchGetProductTotalResp extends protobuf.Message<IBatchGetProductTotalResp> {
    constructor(properties: Properties<IBatchGetProductTotalResp>) {
        super(properties);
        if (properties) {
            if (properties.products) { this.products = []; properties.products.forEach((value, index)=>{this.products[index] = Product.create(properties.products[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizesupplier_v1_Product", "repeated")
    public products?: Product[] = []
}
export interface ISearchSupplierReq {
    province?: string|null
    city?: string|null
    coordinates?: number[]
    SKUID?: number|null
    page?: number|null
    pageSize?: number|null
    skuAmt?: number|null
}
@protobuf.Type.d("tss_hall_prizesupplier_v1_SearchSupplierReq")
export class SearchSupplierReq extends protobuf.Message<ISearchSupplierReq> {
    constructor(properties: Properties<ISearchSupplierReq>) {
        super(properties);
        if (properties) {
            if (properties.province) { this.province = properties.province }
            if (properties.city) { this.city = properties.city }
            if (properties.coordinates) { this.coordinates = []; properties.coordinates.forEach((value, index)=>{this.coordinates[index] = properties.coordinates[index]})}
            if (properties.SKUID) { this.SKUID = properties.SKUID }
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.skuAmt) { this.skuAmt = properties.skuAmt }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public province?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public city?: string|null = ""
    @protobuf.Field.d(3, "float", "repeated", [])
    public coordinates?: number[] = []
    @protobuf.Field.d(4, "int64", "optional", 0)
    public SKUID?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(6, "int64", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(7, "int64", "optional", 0)
    public skuAmt?: number|null = 0
}
export interface ISearchSupplierView {
    supplier?: ISupplier
    distence?: number|null
    product?: IProduct
}
@protobuf.Type.d("tss_hall_prizesupplier_v1_SearchSupplierView")
export class SearchSupplierView extends protobuf.Message<ISearchSupplierView> {
    constructor(properties: Properties<ISearchSupplierView>) {
        super(properties);
        if (properties) {
            if (properties.supplier) { this.supplier = Supplier.create(properties.supplier) as any }
            if (properties.distence) { this.distence = properties.distence }
            if (properties.product) { this.product = Product.create(properties.product) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizesupplier_v1_Supplier", "optional")
    public supplier?: Supplier|null
    @protobuf.Field.d(2, "int64", "optional", 0)
    public distence?: number|null = 0
    @protobuf.Field.d(3, "tss_hall_prizesupplier_v1_Product", "optional")
    public product?: Product|null
}
export interface ISearchSupplierResp {
    suppliers?: ISearchSupplierView[]
    total?: number|null
}
@protobuf.Type.d("tss_hall_prizesupplier_v1_SearchSupplierResp")
export class SearchSupplierResp extends protobuf.Message<ISearchSupplierResp> {
    constructor(properties: Properties<ISearchSupplierResp>) {
        super(properties);
        if (properties) {
            if (properties.suppliers) { this.suppliers = []; properties.suppliers.forEach((value, index)=>{this.suppliers[index] = SearchSupplierView.create(properties.suppliers[index]) as any})}
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizesupplier_v1_SearchSupplierView", "repeated")
    public suppliers?: SearchSupplierView[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public total?: number|null = 0
}
export interface IGetSupplierByUserReq {
    uid?: number|null
}
@protobuf.Type.d("tss_hall_prizesupplier_v1_GetSupplierByUserReq")
export class GetSupplierByUserReq extends protobuf.Message<IGetSupplierByUserReq> {
    constructor(properties: Properties<IGetSupplierByUserReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IGetSupplierByUserResp {
    suppliers?: ISupplier[]
}
@protobuf.Type.d("tss_hall_prizesupplier_v1_GetSupplierByUserResp")
export class GetSupplierByUserResp extends protobuf.Message<IGetSupplierByUserResp> {
    constructor(properties: Properties<IGetSupplierByUserResp>) {
        super(properties);
        if (properties) {
            if (properties.suppliers) { this.suppliers = []; properties.suppliers.forEach((value, index)=>{this.suppliers[index] = Supplier.create(properties.suppliers[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizesupplier_v1_Supplier", "repeated")
    public suppliers?: Supplier[] = []
}
export interface IDecSupplierStockReq {
    supplierID?: string|null
    amt?: number|null
    skuID?: number|null
}
@protobuf.Type.d("tss_hall_prizesupplier_v1_DecSupplierStockReq")
export class DecSupplierStockReq extends protobuf.Message<IDecSupplierStockReq> {
    constructor(properties: Properties<IDecSupplierStockReq>) {
        super(properties);
        if (properties) {
            if (properties.supplierID) { this.supplierID = properties.supplierID }
            if (properties.amt) { this.amt = properties.amt }
            if (properties.skuID) { this.skuID = properties.skuID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public supplierID?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public amt?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public skuID?: number|null = 0
}
export interface IDecSupplierStockResp {
    code?: number|null
}
@protobuf.Type.d("tss_hall_prizesupplier_v1_DecSupplierStockResp")
export class DecSupplierStockResp extends protobuf.Message<IDecSupplierStockResp> {
    constructor(properties: Properties<IDecSupplierStockResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public code?: number|null = 0
}
export interface IBatchGetSupplierReq {
    supplierIDs?: string[]
}
@protobuf.Type.d("tss_hall_prizesupplier_v1_BatchGetSupplierReq")
export class BatchGetSupplierReq extends protobuf.Message<IBatchGetSupplierReq> {
    constructor(properties: Properties<IBatchGetSupplierReq>) {
        super(properties);
        if (properties) {
            if (properties.supplierIDs) { this.supplierIDs = []; properties.supplierIDs.forEach((value, index)=>{this.supplierIDs[index] = properties.supplierIDs[index]})}
        }
	}
    @protobuf.Field.d(1, "string", "repeated", [])
    public supplierIDs?: string[] = []
}
export interface IBatchGetSupplierResp {
    suppliers?: ISupplier[]
}
@protobuf.Type.d("tss_hall_prizesupplier_v1_BatchGetSupplierResp")
export class BatchGetSupplierResp extends protobuf.Message<IBatchGetSupplierResp> {
    constructor(properties: Properties<IBatchGetSupplierResp>) {
        super(properties);
        if (properties) {
            if (properties.suppliers) { this.suppliers = []; properties.suppliers.forEach((value, index)=>{this.suppliers[index] = Supplier.create(properties.suppliers[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizesupplier_v1_Supplier", "repeated")
    public suppliers?: Supplier[] = []
}
export interface IIncSupplierStockReq {
    supplierID?: string|null
    amt?: number|null
    skuID?: number|null
}
@protobuf.Type.d("tss_hall_prizesupplier_v1_IncSupplierStockReq")
export class IncSupplierStockReq extends protobuf.Message<IIncSupplierStockReq> {
    constructor(properties: Properties<IIncSupplierStockReq>) {
        super(properties);
        if (properties) {
            if (properties.supplierID) { this.supplierID = properties.supplierID }
            if (properties.amt) { this.amt = properties.amt }
            if (properties.skuID) { this.skuID = properties.skuID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public supplierID?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public amt?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public skuID?: number|null = 0
}
export interface IIncSupplierStockResp {
}
@protobuf.Type.d("tss_hall_prizesupplier_v1_IncSupplierStockResp")
export class IncSupplierStockResp extends protobuf.Message<IIncSupplierStockResp> {
    constructor(properties: Properties<IIncSupplierStockResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface ISwitchSupplierStateReq {
    supplierID?: string|null
    switch?: tss_common_SwitchState|null
}
@protobuf.Type.d("tss_hall_prizesupplier_v1_SwitchSupplierStateReq")
export class SwitchSupplierStateReq extends protobuf.Message<ISwitchSupplierStateReq> {
    constructor(properties: Properties<ISwitchSupplierStateReq>) {
        super(properties);
        if (properties) {
            if (properties.supplierID) { this.supplierID = properties.supplierID }
            if (properties.switch) { this.switch = properties.switch }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public supplierID?: string|null = ""
    @protobuf.Field.d(2, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public switch?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
}
export interface ISwitchSupplierStateResp {
    supplier?: ISupplier
}
@protobuf.Type.d("tss_hall_prizesupplier_v1_SwitchSupplierStateResp")
export class SwitchSupplierStateResp extends protobuf.Message<ISwitchSupplierStateResp> {
    constructor(properties: Properties<ISwitchSupplierStateResp>) {
        super(properties);
        if (properties) {
            if (properties.supplier) { this.supplier = Supplier.create(properties.supplier) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizesupplier_v1_Supplier", "optional")
    public supplier?: Supplier|null
}
export interface IDeleteProductReq {
    SKUID?: number|null
    supplierID?: string|null
}
@protobuf.Type.d("tss_hall_prizesupplier_v1_DeleteProductReq")
export class DeleteProductReq extends protobuf.Message<IDeleteProductReq> {
    constructor(properties: Properties<IDeleteProductReq>) {
        super(properties);
        if (properties) {
            if (properties.SKUID) { this.SKUID = properties.SKUID }
            if (properties.supplierID) { this.supplierID = properties.supplierID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public SKUID?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public supplierID?: string|null = ""
}
class $PrizeSupplier extends RpcService {
    async SaveSupplier(req: ISaveSupplierReq, params?: RpcParams) : Promise<{err:number, resp:ISaveSupplierResp}> {
        let data = SaveSupplierReq.create(req)
        this.onBeforeReq("SaveSupplier", data, params)
        const buffer = SaveSupplierReq.encode(data).finish()
        let [err, pack] = await this.call("SaveSupplier", buffer, params)
        if (err) {
            this.onBeforeResp("SaveSupplier", err)
            return {err: err, resp: null}
        } else {
            let resp = SaveSupplierResp.decode(pack) as any
            this.onBeforeResp("SaveSupplier", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SwitchSupplierState(req: ISwitchSupplierStateReq, params?: RpcParams) : Promise<{err:number, resp:ISwitchSupplierStateResp}> {
        let data = SwitchSupplierStateReq.create(req)
        this.onBeforeReq("SwitchSupplierState", data, params)
        const buffer = SwitchSupplierStateReq.encode(data).finish()
        let [err, pack] = await this.call("SwitchSupplierState", buffer, params)
        if (err) {
            this.onBeforeResp("SwitchSupplierState", err)
            return {err: err, resp: null}
        } else {
            let resp = SwitchSupplierStateResp.decode(pack) as any
            this.onBeforeResp("SwitchSupplierState", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListSupplier(req: IListSupplierReq, params?: RpcParams) : Promise<{err:number, resp:IListSupplierResp}> {
        let data = ListSupplierReq.create(req)
        this.onBeforeReq("ListSupplier", data, params)
        const buffer = ListSupplierReq.encode(data).finish()
        let [err, pack] = await this.call("ListSupplier", buffer, params)
        if (err) {
            this.onBeforeResp("ListSupplier", err)
            return {err: err, resp: null}
        } else {
            let resp = ListSupplierResp.decode(pack) as any
            this.onBeforeResp("ListSupplier", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DeleteSupplier(req: IDeleteSupplierReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = DeleteSupplierReq.create(req)
        this.onBeforeReq("DeleteSupplier", data, params)
        const buffer = DeleteSupplierReq.encode(data).finish()
        let [err, pack] = await this.call("DeleteSupplier", buffer, params)
        if (err) {
            this.onBeforeResp("DeleteSupplier", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("DeleteSupplier", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetSupplier(req: IGetSupplierReq, params?: RpcParams) : Promise<{err:number, resp:IGetSupplierResp}> {
        let data = GetSupplierReq.create(req)
        this.onBeforeReq("GetSupplier", data, params)
        const buffer = GetSupplierReq.encode(data).finish()
        let [err, pack] = await this.call("GetSupplier", buffer, params)
        if (err) {
            this.onBeforeResp("GetSupplier", err)
            return {err: err, resp: null}
        } else {
            let resp = GetSupplierResp.decode(pack) as any
            this.onBeforeResp("GetSupplier", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetSupplier(req: IBatchGetSupplierReq, params?: RpcParams) : Promise<{err:number, resp:IBatchGetSupplierResp}> {
        let data = BatchGetSupplierReq.create(req)
        this.onBeforeReq("BatchGetSupplier", data, params)
        const buffer = BatchGetSupplierReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetSupplier", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetSupplier", err)
            return {err: err, resp: null}
        } else {
            let resp = BatchGetSupplierResp.decode(pack) as any
            this.onBeforeResp("BatchGetSupplier", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SaveProduct(req: ISaveProductReq, params?: RpcParams) : Promise<{err:number, resp:ISaveProductResp}> {
        let data = SaveProductReq.create(req)
        this.onBeforeReq("SaveProduct", data, params)
        const buffer = SaveProductReq.encode(data).finish()
        let [err, pack] = await this.call("SaveProduct", buffer, params)
        if (err) {
            this.onBeforeResp("SaveProduct", err)
            return {err: err, resp: null}
        } else {
            let resp = SaveProductResp.decode(pack) as any
            this.onBeforeResp("SaveProduct", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListProduct(req: IListProductReq, params?: RpcParams) : Promise<{err:number, resp:IListProductResp}> {
        let data = ListProductReq.create(req)
        this.onBeforeReq("ListProduct", data, params)
        const buffer = ListProductReq.encode(data).finish()
        let [err, pack] = await this.call("ListProduct", buffer, params)
        if (err) {
            this.onBeforeResp("ListProduct", err)
            return {err: err, resp: null}
        } else {
            let resp = ListProductResp.decode(pack) as any
            this.onBeforeResp("ListProduct", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetProductTotal(req: IBatchGetProductTotalReq, params?: RpcParams) : Promise<{err:number, resp:IBatchGetProductTotalResp}> {
        let data = BatchGetProductTotalReq.create(req)
        this.onBeforeReq("BatchGetProductTotal", data, params)
        const buffer = BatchGetProductTotalReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetProductTotal", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetProductTotal", err)
            return {err: err, resp: null}
        } else {
            let resp = BatchGetProductTotalResp.decode(pack) as any
            this.onBeforeResp("BatchGetProductTotal", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetProduct(req: IBatchGetProductReq, params?: RpcParams) : Promise<{err:number, resp:IBatchGetProductResp}> {
        let data = BatchGetProductReq.create(req)
        this.onBeforeReq("BatchGetProduct", data, params)
        const buffer = BatchGetProductReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetProduct", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetProduct", err)
            return {err: err, resp: null}
        } else {
            let resp = BatchGetProductResp.decode(pack) as any
            this.onBeforeResp("BatchGetProduct", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SearchSupplier(req: ISearchSupplierReq, params?: RpcParams) : Promise<{err:number, resp:ISearchSupplierResp}> {
        let data = SearchSupplierReq.create(req)
        this.onBeforeReq("SearchSupplier", data, params)
        const buffer = SearchSupplierReq.encode(data).finish()
        let [err, pack] = await this.call("SearchSupplier", buffer, params)
        if (err) {
            this.onBeforeResp("SearchSupplier", err)
            return {err: err, resp: null}
        } else {
            let resp = SearchSupplierResp.decode(pack) as any
            this.onBeforeResp("SearchSupplier", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetSupplierByUser(req: IGetSupplierByUserReq, params?: RpcParams) : Promise<{err:number, resp:IGetSupplierByUserResp}> {
        let data = GetSupplierByUserReq.create(req)
        this.onBeforeReq("GetSupplierByUser", data, params)
        const buffer = GetSupplierByUserReq.encode(data).finish()
        let [err, pack] = await this.call("GetSupplierByUser", buffer, params)
        if (err) {
            this.onBeforeResp("GetSupplierByUser", err)
            return {err: err, resp: null}
        } else {
            let resp = GetSupplierByUserResp.decode(pack) as any
            this.onBeforeResp("GetSupplierByUser", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DecSupplierStock(req: IDecSupplierStockReq, params?: RpcParams) : Promise<{err:number, resp:IDecSupplierStockResp}> {
        let data = DecSupplierStockReq.create(req)
        this.onBeforeReq("DecSupplierStock", data, params)
        const buffer = DecSupplierStockReq.encode(data).finish()
        let [err, pack] = await this.call("DecSupplierStock", buffer, params)
        if (err) {
            this.onBeforeResp("DecSupplierStock", err)
            return {err: err, resp: null}
        } else {
            let resp = DecSupplierStockResp.decode(pack) as any
            this.onBeforeResp("DecSupplierStock", err, resp)
            return {err: null, resp: resp}
        }
    }
    async IncSupplierStock(req: IIncSupplierStockReq, params?: RpcParams) : Promise<{err:number, resp:IIncSupplierStockResp}> {
        let data = IncSupplierStockReq.create(req)
        this.onBeforeReq("IncSupplierStock", data, params)
        const buffer = IncSupplierStockReq.encode(data).finish()
        let [err, pack] = await this.call("IncSupplierStock", buffer, params)
        if (err) {
            this.onBeforeResp("IncSupplierStock", err)
            return {err: err, resp: null}
        } else {
            let resp = IncSupplierStockResp.decode(pack) as any
            this.onBeforeResp("IncSupplierStock", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DeleteProduct(req: IDeleteProductReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = DeleteProductReq.create(req)
        this.onBeforeReq("DeleteProduct", data, params)
        const buffer = DeleteProductReq.encode(data).finish()
        let [err, pack] = await this.call("DeleteProduct", buffer, params)
        if (err) {
            this.onBeforeResp("DeleteProduct", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("DeleteProduct", err, resp)
            return {err: null, resp: resp}
        }
    }
}
export const PrizeSupplier = new $PrizeSupplier({
    name: "tss.hall.prizesupplier.v1",
})
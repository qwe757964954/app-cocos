import {protobuf,pbUtil} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
export type Properties<T> = { [P in keyof T]?: T[P] };
import {  Void as base_Void,IVoid as base_IVoid ,  } from "idl/base/base"
export enum ListCommentType {  
    ListCommentTypeTime = 0,  
    ListCommentTypeLike = 1,
}
export enum ListCommentReportType {  
    All = 0,  
    NotIgnored = 1,  
    Ignored = 2,
}
export interface ISpec {
    name?: string|null
    img?: string|null
}
@protobuf.Type.d("tss_hall_prizecomment_v2_Spec")
export class Spec extends protobuf.Message<ISpec> {
    constructor(properties: Properties<ISpec>) {
        super(properties);
        if (properties) {
            if (properties.name) { this.name = properties.name }
            if (properties.img) { this.img = properties.img }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public img?: string|null = ""
}
export interface ICommentView {
    id?: string|null
    orderId?: string|null
    spuId?: number|null
    skuId?: number|null
    spec?: string|null
    uid?: number|null
    nickname?: string|null
    avatar?: string|null
    star?: number|null
    content?: string|null
    images?: string[]
    createdAt?: number|null
    updatedAt?: number|null
    deletedAt?: number|null
    operator?: string|null
    likeNum?: number|null
    isLike?: boolean|null
    mungNum?: number|null
}
@protobuf.Type.d("tss_hall_prizecomment_v2_CommentView")
export class CommentView extends protobuf.Message<ICommentView> {
    constructor(properties: Properties<ICommentView>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.orderId) { this.orderId = properties.orderId }
            if (properties.spuId) { this.spuId = properties.spuId }
            if (properties.skuId) { this.skuId = properties.skuId }
            if (properties.spec) { this.spec = properties.spec }
            if (properties.uid) { this.uid = properties.uid }
            if (properties.nickname) { this.nickname = properties.nickname }
            if (properties.avatar) { this.avatar = properties.avatar }
            if (properties.star) { this.star = properties.star }
            if (properties.content) { this.content = properties.content }
            if (properties.images) { this.images = []; properties.images.forEach((value, index)=>{this.images[index] = properties.images[index]})}
            if (properties.createdAt) { this.createdAt = properties.createdAt }
            if (properties.updatedAt) { this.updatedAt = properties.updatedAt }
            if (properties.deletedAt) { this.deletedAt = properties.deletedAt }
            if (properties.operator) { this.operator = properties.operator }
            if (properties.likeNum) { this.likeNum = properties.likeNum }
            if (properties.isLike) { this.isLike = properties.isLike }
            if (properties.mungNum) { this.mungNum = properties.mungNum }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public id?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public orderId?: string|null = ""
    @protobuf.Field.d(4, "int64", "optional", 0)
    public spuId?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public skuId?: number|null = 0
    @protobuf.Field.d(6, "string", "optional", )
    public spec?: string|null = ""
    @protobuf.Field.d(7, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(8, "string", "optional", )
    public nickname?: string|null = ""
    @protobuf.Field.d(9, "string", "optional", )
    public avatar?: string|null = ""
    @protobuf.Field.d(10, "int32", "optional", 0)
    public star?: number|null = 0
    @protobuf.Field.d(11, "string", "optional", )
    public content?: string|null = ""
    @protobuf.Field.d(12, "string", "repeated", [])
    public images?: string[] = []
    @protobuf.Field.d(13, "int64", "optional", 0)
    public createdAt?: number|null = 0
    @protobuf.Field.d(14, "int64", "optional", 0)
    public updatedAt?: number|null = 0
    @protobuf.Field.d(15, "int64", "optional", 0)
    public deletedAt?: number|null = 0
    @protobuf.Field.d(16, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(17, "int64", "optional", 0)
    public likeNum?: number|null = 0
    @protobuf.Field.d(18, "bool", "optional", false)
    public isLike?: boolean|null = false
    @protobuf.Field.d(21, "int64", "optional", 0)
    public mungNum?: number|null = 0
}
export interface ICommentReport {
    id?: string|null
    commentId?: string|null
    uid?: number|null
    nickname?: string|null
    content?: string|null
    createdAt?: number|null
    updatedAt?: number|null
    deletedAt?: number|null
    isIgnored?: boolean|null
    operator?: string|null
}
@protobuf.Type.d("tss_hall_prizecomment_v2_CommentReport")
export class CommentReport extends protobuf.Message<ICommentReport> {
    constructor(properties: Properties<ICommentReport>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.commentId) { this.commentId = properties.commentId }
            if (properties.uid) { this.uid = properties.uid }
            if (properties.nickname) { this.nickname = properties.nickname }
            if (properties.content) { this.content = properties.content }
            if (properties.createdAt) { this.createdAt = properties.createdAt }
            if (properties.updatedAt) { this.updatedAt = properties.updatedAt }
            if (properties.deletedAt) { this.deletedAt = properties.deletedAt }
            if (properties.isIgnored) { this.isIgnored = properties.isIgnored }
            if (properties.operator) { this.operator = properties.operator }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public id?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public commentId?: string|null = ""
    @protobuf.Field.d(3, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(4, "string", "optional", )
    public nickname?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public content?: string|null = ""
    @protobuf.Field.d(6, "int64", "optional", 0)
    public createdAt?: number|null = 0
    @protobuf.Field.d(7, "int64", "optional", 0)
    public updatedAt?: number|null = 0
    @protobuf.Field.d(8, "int64", "optional", 0)
    public deletedAt?: number|null = 0
    @protobuf.Field.d(9, "bool", "optional", false)
    public isIgnored?: boolean|null = false
    @protobuf.Field.d(10, "string", "optional", )
    public operator?: string|null = ""
}
export interface ICommentReportDetail {
    commentReport?: ICommentReport
    comment?: ICommentView
}
@protobuf.Type.d("tss_hall_prizecomment_v2_CommentReportDetail")
export class CommentReportDetail extends protobuf.Message<ICommentReportDetail> {
    constructor(properties: Properties<ICommentReportDetail>) {
        super(properties);
        if (properties) {
            if (properties.commentReport) { this.commentReport = CommentReport.create(properties.commentReport) as any }
            if (properties.comment) { this.comment = CommentView.create(properties.comment) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizecomment_v2_CommentReport", "optional")
    public commentReport?: CommentReport|null
    @protobuf.Field.d(2, "tss_hall_prizecomment_v2_CommentView", "optional")
    public comment?: CommentView|null
}
export interface ICreateCommentReportReq {
    commentReport?: ICommentReport
}
@protobuf.Type.d("tss_hall_prizecomment_v2_CreateCommentReportReq")
export class CreateCommentReportReq extends protobuf.Message<ICreateCommentReportReq> {
    constructor(properties: Properties<ICreateCommentReportReq>) {
        super(properties);
        if (properties) {
            if (properties.commentReport) { this.commentReport = CommentReport.create(properties.commentReport) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizecomment_v2_CommentReport", "optional")
    public commentReport?: CommentReport|null
}
export interface IAdminListCommentReportReq {
    page?: number|null
    pageSize?: number|null
    ListType?: ListCommentReportType|null
}
@protobuf.Type.d("tss_hall_prizecomment_v2_AdminListCommentReportReq")
export class AdminListCommentReportReq extends protobuf.Message<IAdminListCommentReportReq> {
    constructor(properties: Properties<IAdminListCommentReportReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.ListType) { this.ListType = properties.ListType }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(3, ListCommentReportType, "optional", ListCommentReportType.All)
    public ListType?: ListCommentReportType|null = ListCommentReportType.All
}
export interface ICreateCommentReq {
    comment?: ICommentView
}
@protobuf.Type.d("tss_hall_prizecomment_v2_CreateCommentReq")
export class CreateCommentReq extends protobuf.Message<ICreateCommentReq> {
    constructor(properties: Properties<ICreateCommentReq>) {
        super(properties);
        if (properties) {
            if (properties.comment) { this.comment = CommentView.create(properties.comment) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizecomment_v2_CommentView", "optional")
    public comment?: CommentView|null
}
export interface ICreateCommentResp {
    comment?: ICommentView
    mungNum?: number|null
}
@protobuf.Type.d("tss_hall_prizecomment_v2_CreateCommentResp")
export class CreateCommentResp extends protobuf.Message<ICreateCommentResp> {
    constructor(properties: Properties<ICreateCommentResp>) {
        super(properties);
        if (properties) {
            if (properties.comment) { this.comment = CommentView.create(properties.comment) as any }
            if (properties.mungNum) { this.mungNum = properties.mungNum }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizecomment_v2_CommentView", "optional")
    public comment?: CommentView|null
    @protobuf.Field.d(2, "int64", "optional", 0)
    public mungNum?: number|null = 0
}
export interface IUpdateCommentReq {
    commentId?: string|null
    stars?: number|null
    content?: string|null
    images?: string[]
}
@protobuf.Type.d("tss_hall_prizecomment_v2_UpdateCommentReq")
export class UpdateCommentReq extends protobuf.Message<IUpdateCommentReq> {
    constructor(properties: Properties<IUpdateCommentReq>) {
        super(properties);
        if (properties) {
            if (properties.commentId) { this.commentId = properties.commentId }
            if (properties.stars) { this.stars = properties.stars }
            if (properties.content) { this.content = properties.content }
            if (properties.images) { this.images = []; properties.images.forEach((value, index)=>{this.images[index] = properties.images[index]})}
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public commentId?: string|null = ""
    @protobuf.Field.d(2, "int32", "optional", 0)
    public stars?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public content?: string|null = ""
    @protobuf.Field.d(4, "string", "repeated", [])
    public images?: string[] = []
}
export interface IUpdateCommentResp {
    comment?: ICommentView
}
@protobuf.Type.d("tss_hall_prizecomment_v2_UpdateCommentResp")
export class UpdateCommentResp extends protobuf.Message<IUpdateCommentResp> {
    constructor(properties: Properties<IUpdateCommentResp>) {
        super(properties);
        if (properties) {
            if (properties.comment) { this.comment = CommentView.create(properties.comment) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizecomment_v2_CommentView", "optional")
    public comment?: CommentView|null
}
export interface IAdminDeleteCommentReq {
    commentId?: string|null
    operator?: string|null
}
@protobuf.Type.d("tss_hall_prizecomment_v2_AdminDeleteCommentReq")
export class AdminDeleteCommentReq extends protobuf.Message<IAdminDeleteCommentReq> {
    constructor(properties: Properties<IAdminDeleteCommentReq>) {
        super(properties);
        if (properties) {
            if (properties.commentId) { this.commentId = properties.commentId }
            if (properties.operator) { this.operator = properties.operator }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public commentId?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public operator?: string|null = ""
}
export interface IAdminDeleteCommentReportReq {
    commentReportId?: string|null
    operator?: string|null
}
@protobuf.Type.d("tss_hall_prizecomment_v2_AdminDeleteCommentReportReq")
export class AdminDeleteCommentReportReq extends protobuf.Message<IAdminDeleteCommentReportReq> {
    constructor(properties: Properties<IAdminDeleteCommentReportReq>) {
        super(properties);
        if (properties) {
            if (properties.commentReportId) { this.commentReportId = properties.commentReportId }
            if (properties.operator) { this.operator = properties.operator }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public commentReportId?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public operator?: string|null = ""
}
export interface IAdminRemoveCommentReportReq {
    commentReportId?: string|null
}
@protobuf.Type.d("tss_hall_prizecomment_v2_AdminRemoveCommentReportReq")
export class AdminRemoveCommentReportReq extends protobuf.Message<IAdminRemoveCommentReportReq> {
    constructor(properties: Properties<IAdminRemoveCommentReportReq>) {
        super(properties);
        if (properties) {
            if (properties.commentReportId) { this.commentReportId = properties.commentReportId }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public commentReportId?: string|null = ""
}
export interface IAdminIgnoredCommentReportReq {
    commentReportId?: string|null
    operator?: string|null
}
@protobuf.Type.d("tss_hall_prizecomment_v2_AdminIgnoredCommentReportReq")
export class AdminIgnoredCommentReportReq extends protobuf.Message<IAdminIgnoredCommentReportReq> {
    constructor(properties: Properties<IAdminIgnoredCommentReportReq>) {
        super(properties);
        if (properties) {
            if (properties.commentReportId) { this.commentReportId = properties.commentReportId }
            if (properties.operator) { this.operator = properties.operator }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public commentReportId?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public operator?: string|null = ""
}
export interface IGetCommentReq {
    commentId?: string|null
}
@protobuf.Type.d("tss_hall_prizecomment_v2_GetCommentReq")
export class GetCommentReq extends protobuf.Message<IGetCommentReq> {
    constructor(properties: Properties<IGetCommentReq>) {
        super(properties);
        if (properties) {
            if (properties.commentId) { this.commentId = properties.commentId }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public commentId?: string|null = ""
}
export interface IGetCommentResp {
    comment?: ICommentView
}
@protobuf.Type.d("tss_hall_prizecomment_v2_GetCommentResp")
export class GetCommentResp extends protobuf.Message<IGetCommentResp> {
    constructor(properties: Properties<IGetCommentResp>) {
        super(properties);
        if (properties) {
            if (properties.comment) { this.comment = CommentView.create(properties.comment) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizecomment_v2_CommentView", "optional")
    public comment?: CommentView|null
}
export interface IListCommentReq {
    spuId?: number|null
    skuId?: number|null
    page?: number|null
    pageSize?: number|null
    keyword?: string|null
    startAt?: number|null
    endAt?: number|null
    uid?: number|null
    type?: ListCommentType|null
}
@protobuf.Type.d("tss_hall_prizecomment_v2_ListCommentReq")
export class ListCommentReq extends protobuf.Message<IListCommentReq> {
    constructor(properties: Properties<IListCommentReq>) {
        super(properties);
        if (properties) {
            if (properties.spuId) { this.spuId = properties.spuId }
            if (properties.skuId) { this.skuId = properties.skuId }
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.keyword) { this.keyword = properties.keyword }
            if (properties.startAt) { this.startAt = properties.startAt }
            if (properties.endAt) { this.endAt = properties.endAt }
            if (properties.uid) { this.uid = properties.uid }
            if (properties.type) { this.type = properties.type }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public spuId?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public skuId?: number|null = 0
    @protobuf.Field.d(3, "int32", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(4, "int32", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(5, "string", "optional", )
    public keyword?: string|null = ""
    @protobuf.Field.d(6, "int64", "optional", 0)
    public startAt?: number|null = 0
    @protobuf.Field.d(7, "int64", "optional", 0)
    public endAt?: number|null = 0
    @protobuf.Field.d(8, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(9, ListCommentType, "optional", ListCommentType.ListCommentTypeTime)
    public type?: ListCommentType|null = ListCommentType.ListCommentTypeTime
}
export interface IListCommentResp {
    comment?: ICommentView[]
    total?: number|null
}
@protobuf.Type.d("tss_hall_prizecomment_v2_ListCommentResp")
export class ListCommentResp extends protobuf.Message<IListCommentResp> {
    constructor(properties: Properties<IListCommentResp>) {
        super(properties);
        if (properties) {
            if (properties.comment) { this.comment = []; properties.comment.forEach((value, index)=>{this.comment[index] = CommentView.create(properties.comment[index]) as any})}
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizecomment_v2_CommentView", "repeated")
    public comment?: CommentView[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public total?: number|null = 0
}
export interface IAdminListCommentReportResp {
    commentReports?: ICommentReportDetail[]
    total?: number|null
}
@protobuf.Type.d("tss_hall_prizecomment_v2_AdminListCommentReportResp")
export class AdminListCommentReportResp extends protobuf.Message<IAdminListCommentReportResp> {
    constructor(properties: Properties<IAdminListCommentReportResp>) {
        super(properties);
        if (properties) {
            if (properties.commentReports) { this.commentReports = []; properties.commentReports.forEach((value, index)=>{this.commentReports[index] = CommentReportDetail.create(properties.commentReports[index]) as any})}
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizecomment_v2_CommentReportDetail", "repeated")
    public commentReports?: CommentReportDetail[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public total?: number|null = 0
}
export interface ILikeCommentReq {
    commentId?: string|null
    like?: boolean|null
}
@protobuf.Type.d("tss_hall_prizecomment_v2_LikeCommentReq")
export class LikeCommentReq extends protobuf.Message<ILikeCommentReq> {
    constructor(properties: Properties<ILikeCommentReq>) {
        super(properties);
        if (properties) {
            if (properties.commentId) { this.commentId = properties.commentId }
            if (properties.like) { this.like = properties.like }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public commentId?: string|null = ""
    @protobuf.Field.d(2, "bool", "optional", false)
    public like?: boolean|null = false
}
export interface ILikeCommentResp {
    code?: number|null
}
@protobuf.Type.d("tss_hall_prizecomment_v2_LikeCommentResp")
export class LikeCommentResp extends protobuf.Message<ILikeCommentResp> {
    constructor(properties: Properties<ILikeCommentResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
}
export interface IAdminSaveCommentReq {
    comment?: ICommentView
}
@protobuf.Type.d("tss_hall_prizecomment_v2_AdminSaveCommentReq")
export class AdminSaveCommentReq extends protobuf.Message<IAdminSaveCommentReq> {
    constructor(properties: Properties<IAdminSaveCommentReq>) {
        super(properties);
        if (properties) {
            if (properties.comment) { this.comment = CommentView.create(properties.comment) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizecomment_v2_CommentView", "optional")
    public comment?: CommentView|null
}
export interface IAdminSaveCommentResp {
    comment?: ICommentView
}
@protobuf.Type.d("tss_hall_prizecomment_v2_AdminSaveCommentResp")
export class AdminSaveCommentResp extends protobuf.Message<IAdminSaveCommentResp> {
    constructor(properties: Properties<IAdminSaveCommentResp>) {
        super(properties);
        if (properties) {
            if (properties.comment) { this.comment = CommentView.create(properties.comment) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_prizecomment_v2_CommentView", "optional")
    public comment?: CommentView|null
}
export interface IAdminRemoveCommentReq {
    id?: string|null
}
@protobuf.Type.d("tss_hall_prizecomment_v2_AdminRemoveCommentReq")
export class AdminRemoveCommentReq extends protobuf.Message<IAdminRemoveCommentReq> {
    constructor(properties: Properties<IAdminRemoveCommentReq>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public id?: string|null = ""
}
class $Prizecomment extends RpcService {
    async CreateComment(req: ICreateCommentReq, params?: RpcParams) : Promise<{err:number, resp:ICreateCommentResp}> {
        let data = CreateCommentReq.create(req)
        console.log("CreateComment...begin", data, params)
        const buffer = CreateCommentReq.encode(data).finish()
        let [err, pack] = await this.call("CreateComment", buffer, params)
        if (err) {
            console.error("CreateComment...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = CreateCommentResp.decode(pack) as any
            console.log("CreateComment...end", resp)
            return {err: null, resp: resp}
        }
    }
    async UpdateComment(req: IUpdateCommentReq, params?: RpcParams) : Promise<{err:number, resp:IUpdateCommentResp}> {
        let data = UpdateCommentReq.create(req)
        console.log("UpdateComment...begin", data, params)
        const buffer = UpdateCommentReq.encode(data).finish()
        let [err, pack] = await this.call("UpdateComment", buffer, params)
        if (err) {
            console.error("UpdateComment...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = UpdateCommentResp.decode(pack) as any
            console.log("UpdateComment...end", resp)
            return {err: null, resp: resp}
        }
    }
    async GetComment(req: IGetCommentReq, params?: RpcParams) : Promise<{err:number, resp:IGetCommentResp}> {
        let data = GetCommentReq.create(req)
        console.log("GetComment...begin", data, params)
        const buffer = GetCommentReq.encode(data).finish()
        let [err, pack] = await this.call("GetComment", buffer, params)
        if (err) {
            console.error("GetComment...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = GetCommentResp.decode(pack) as any
            console.log("GetComment...end", resp)
            return {err: null, resp: resp}
        }
    }
    async ListComment(req: IListCommentReq, params?: RpcParams) : Promise<{err:number, resp:IListCommentResp}> {
        let data = ListCommentReq.create(req)
        console.log("ListComment...begin", data, params)
        const buffer = ListCommentReq.encode(data).finish()
        let [err, pack] = await this.call("ListComment", buffer, params)
        if (err) {
            console.error("ListComment...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = ListCommentResp.decode(pack) as any
            console.log("ListComment...end", resp)
            return {err: null, resp: resp}
        }
    }
    async LikeComment(req: ILikeCommentReq, params?: RpcParams) : Promise<{err:number, resp:ILikeCommentResp}> {
        let data = LikeCommentReq.create(req)
        console.log("LikeComment...begin", data, params)
        const buffer = LikeCommentReq.encode(data).finish()
        let [err, pack] = await this.call("LikeComment", buffer, params)
        if (err) {
            console.error("LikeComment...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = LikeCommentResp.decode(pack) as any
            console.log("LikeComment...end", resp)
            return {err: null, resp: resp}
        }
    }
    async CreateCommentReport(req: ICreateCommentReportReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = CreateCommentReportReq.create(req)
        console.log("CreateCommentReport...begin", data, params)
        const buffer = CreateCommentReportReq.encode(data).finish()
        let [err, pack] = await this.call("CreateCommentReport", buffer, params)
        if (err) {
            console.error("CreateCommentReport...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            console.log("CreateCommentReport...end", resp)
            return {err: null, resp: resp}
        }
    }
    async AdminSaveComment(req: IAdminSaveCommentReq, params?: RpcParams) : Promise<{err:number, resp:IAdminSaveCommentResp}> {
        let data = AdminSaveCommentReq.create(req)
        console.log("AdminSaveComment...begin", data, params)
        const buffer = AdminSaveCommentReq.encode(data).finish()
        let [err, pack] = await this.call("AdminSaveComment", buffer, params)
        if (err) {
            console.error("AdminSaveComment...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = AdminSaveCommentResp.decode(pack) as any
            console.log("AdminSaveComment...end", resp)
            return {err: null, resp: resp}
        }
    }
    async AdminDeleteComment(req: IAdminDeleteCommentReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = AdminDeleteCommentReq.create(req)
        console.log("AdminDeleteComment...begin", data, params)
        const buffer = AdminDeleteCommentReq.encode(data).finish()
        let [err, pack] = await this.call("AdminDeleteComment", buffer, params)
        if (err) {
            console.error("AdminDeleteComment...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            console.log("AdminDeleteComment...end", resp)
            return {err: null, resp: resp}
        }
    }
    async AdminRemoveComment(req: IAdminRemoveCommentReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = AdminRemoveCommentReq.create(req)
        console.log("AdminRemoveComment...begin", data, params)
        const buffer = AdminRemoveCommentReq.encode(data).finish()
        let [err, pack] = await this.call("AdminRemoveComment", buffer, params)
        if (err) {
            console.error("AdminRemoveComment...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            console.log("AdminRemoveComment...end", resp)
            return {err: null, resp: resp}
        }
    }
    async AdminListCommentReport(req: IAdminListCommentReportReq, params?: RpcParams) : Promise<{err:number, resp:IAdminListCommentReportResp}> {
        let data = AdminListCommentReportReq.create(req)
        console.log("AdminListCommentReport...begin", data, params)
        const buffer = AdminListCommentReportReq.encode(data).finish()
        let [err, pack] = await this.call("AdminListCommentReport", buffer, params)
        if (err) {
            console.error("AdminListCommentReport...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = AdminListCommentReportResp.decode(pack) as any
            console.log("AdminListCommentReport...end", resp)
            return {err: null, resp: resp}
        }
    }
    async AdminDeleteCommentReport(req: IAdminDeleteCommentReportReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = AdminDeleteCommentReportReq.create(req)
        console.log("AdminDeleteCommentReport...begin", data, params)
        const buffer = AdminDeleteCommentReportReq.encode(data).finish()
        let [err, pack] = await this.call("AdminDeleteCommentReport", buffer, params)
        if (err) {
            console.error("AdminDeleteCommentReport...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            console.log("AdminDeleteCommentReport...end", resp)
            return {err: null, resp: resp}
        }
    }
    async AdminIgnoreCommentReport(req: IAdminIgnoredCommentReportReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = AdminIgnoredCommentReportReq.create(req)
        console.log("AdminIgnoreCommentReport...begin", data, params)
        const buffer = AdminIgnoredCommentReportReq.encode(data).finish()
        let [err, pack] = await this.call("AdminIgnoreCommentReport", buffer, params)
        if (err) {
            console.error("AdminIgnoreCommentReport...error", err, data, params)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            console.log("AdminIgnoreCommentReport...end", resp)
            return {err: null, resp: resp}
        }
    }
}
export const Prizecomment = new $Prizecomment({
    name: "tss.hall.prizecomment.v2",
})
import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  Void as base_Void,IVoid as base_IVoid ,  } from "idl/base/base"
import {  MpRelateNotifyCall as mp_common_MpRelateNotifyCall,IMpRelateNotifyCall as mp_common_IMpRelateNotifyCall ,  } from "idl/mp/common/relation"
export enum Code {  
    CodeOK = 0,  
    CodeCantOperateUrself = 1001,  
    CodeOperateCodeError = 1002,  
    CodeAlreadyBlack = 1003,  
    CodeAlreadyBeBlacked = 1004,  
    CodeAlreadyFollow = 1005,  
    CodeNotFriend = 1006,  
    CodeRelateNotExists = 1007,  
    ErrRelateBeBlack = 1008,  
    CodeInvitationTimeLimit = 2001,  
    CodeRelateNumLimit = 2002,  
    CodeOthersRelateNumLimit = 2003,  
    CodeAuditReject = 3001,
}
export enum RelateScene {  
    RelateSceneUnknown = 0,  
    RelateSceneQrCode = 1,  
    RelateSceneAdBook = 2,  
    RelateSceneGroup = 3,  
    RelateSceneGame = 4,  
    RelateSceneSearch = 5,  
    RelateSceneOther = 6,  
    RelateFace = 7,  
    RelateInvite = 8,  
    RelateRecommend = 9,
}
export enum ApplyStatus {  
    ApplyStatusUnknown = 0,  
    ApplyStatusWaiting = 1,  
    ApplyStatusAccept = 2,  
    ApplyStatusReject = 3,  
    ApplyStatusTimeOut = 4,  
    ApplyStatusDel = 5,
}
export enum RelateType {  
    UnknownType = 0,  
    Fans = 1,  
    Follow = 2,  
    Black = 3,  
    Blacked = 4,  
    Friend = 5,  
    Friended = 6,
}
export enum SyncRelate_Operate {  
    UnknownOperate = 0,  
    Add = 1,  
    Del = 2,
}
export enum SyncChangeResp_Code {  
    Unknown = 0,  
    Incr = 3001,  
    Full = 3002,
}
export interface IUserMark {
    userID?: number|null
    mark?: IMark
}
@protobuf.Type.d("mpff_social_relation_v1_UserMark")
export class UserMark extends protobuf.Message<IUserMark> {
    constructor(properties: Properties<IUserMark>) {
        super(properties);
        if (properties) {
            if (properties.userID) { this.userID = properties.userID }
            if (properties.mark) { this.mark = Mark.create(properties.mark) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public userID?: number|null = 0
    @protobuf.Field.d(2, "mpff_social_relation_v1_Mark", "optional")
    public mark?: Mark|null
}
export interface IMark {
    content?: string|null
    scene?: RelateScene|null
    alias?: string|null
    createdAt?: number|null
    updatedAt?: number|null
    phones?: string[]
    labels?: string[]
    desc?: string|null
    extra?: string|null
}
@protobuf.Type.d("mpff_social_relation_v1_Mark")
export class Mark extends protobuf.Message<IMark> {
    constructor(properties: Properties<IMark>) {
        super(properties);
        if (properties) {
            if (properties.content) { this.content = properties.content }
            if (properties.scene) { this.scene = properties.scene }
            if (properties.alias) { this.alias = properties.alias }
            if (properties.createdAt) { this.createdAt = properties.createdAt }
            if (properties.updatedAt) { this.updatedAt = properties.updatedAt }
            if (properties.phones) { this.phones = []; properties.phones.forEach((value, index)=>{this.phones[index] = properties.phones[index]})}
            if (properties.labels) { this.labels = []; properties.labels.forEach((value, index)=>{this.labels[index] = properties.labels[index]})}
            if (properties.desc) { this.desc = properties.desc }
            if (properties.extra) { this.extra = properties.extra }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public content?: string|null = ""
    @protobuf.Field.d(2, RelateScene, "optional", RelateScene.RelateSceneUnknown)
    public scene?: RelateScene|null = RelateScene.RelateSceneUnknown
    @protobuf.Field.d(3, "string", "optional", )
    public alias?: string|null = ""
    @protobuf.Field.d(4, "int64", "optional", 0)
    public createdAt?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public updatedAt?: number|null = 0
    @protobuf.Field.d(6, "string", "repeated", [])
    public phones?: string[] = []
    @protobuf.Field.d(7, "string", "repeated", [])
    public labels?: string[] = []
    @protobuf.Field.d(8, "string", "optional", )
    public desc?: string|null = ""
    @protobuf.Field.d(9, "string", "optional", )
    public extra?: string|null = ""
}
export interface ISaveMarkReq {
    userID?: number|null
    mark?: IMark
}
@protobuf.Type.d("mpff_social_relation_v1_SaveMarkReq")
export class SaveMarkReq extends protobuf.Message<ISaveMarkReq> {
    constructor(properties: Properties<ISaveMarkReq>) {
        super(properties);
        if (properties) {
            if (properties.userID) { this.userID = properties.userID }
            if (properties.mark) { this.mark = Mark.create(properties.mark) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public userID?: number|null = 0
    @protobuf.Field.d(2, "mpff_social_relation_v1_Mark", "optional")
    public mark?: Mark|null
}
export interface ISaveMarkResp {
    seq?: number|null
}
@protobuf.Type.d("mpff_social_relation_v1_SaveMarkResp")
export class SaveMarkResp extends protobuf.Message<ISaveMarkResp> {
    constructor(properties: Properties<ISaveMarkResp>) {
        super(properties);
        if (properties) {
            if (properties.seq) { this.seq = properties.seq }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public seq?: number|null = 0
}
export interface IGetMarkReq {
    userID?: number|null
}
@protobuf.Type.d("mpff_social_relation_v1_GetMarkReq")
export class GetMarkReq extends protobuf.Message<IGetMarkReq> {
    constructor(properties: Properties<IGetMarkReq>) {
        super(properties);
        if (properties) {
            if (properties.userID) { this.userID = properties.userID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public userID?: number|null = 0
}
export interface IGetMarkResp {
    mark?: IMark
}
@protobuf.Type.d("mpff_social_relation_v1_GetMarkResp")
export class GetMarkResp extends protobuf.Message<IGetMarkResp> {
    constructor(properties: Properties<IGetMarkResp>) {
        super(properties);
        if (properties) {
            if (properties.mark) { this.mark = Mark.create(properties.mark) as any }
        }
	}
    @protobuf.Field.d(1, "mpff_social_relation_v1_Mark", "optional")
    public mark?: Mark|null
}
export interface ISyncMarkReq {
    seq?: number|null
    pageSize?: number|null
}
@protobuf.Type.d("mpff_social_relation_v1_SyncMarkReq")
export class SyncMarkReq extends protobuf.Message<ISyncMarkReq> {
    constructor(properties: Properties<ISyncMarkReq>) {
        super(properties);
        if (properties) {
            if (properties.seq) { this.seq = properties.seq }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public seq?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public pageSize?: number|null = 0
}
export interface ISyncMarkResp {
    list?: IUserMark[]
    seq?: number|null
}
@protobuf.Type.d("mpff_social_relation_v1_SyncMarkResp")
export class SyncMarkResp extends protobuf.Message<ISyncMarkResp> {
    constructor(properties: Properties<ISyncMarkResp>) {
        super(properties);
        if (properties) {
            if (properties.list) { this.list = []; properties.list.forEach((value, index)=>{this.list[index] = UserMark.create(properties.list[index]) as any})}
            if (properties.seq) { this.seq = properties.seq }
        }
	}
    @protobuf.Field.d(1, "mpff_social_relation_v1_UserMark", "repeated")
    public list?: UserMark[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public seq?: number|null = 0
}
export interface IFollowReq {
    uid?: number|null
    mark?: IMark
}
@protobuf.Type.d("mpff_social_relation_v1_FollowReq")
export class FollowReq extends protobuf.Message<IFollowReq> {
    constructor(properties: Properties<IFollowReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.mark) { this.mark = Mark.create(properties.mark) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "mpff_social_relation_v1_Mark", "optional")
    public mark?: Mark|null
}
export interface IFollowResp {
    code?: Code|null
}
@protobuf.Type.d("mpff_social_relation_v1_FollowResp")
export class FollowResp extends protobuf.Message<IFollowResp> {
    constructor(properties: Properties<IFollowResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
        }
	}
    @protobuf.Field.d(1, Code, "optional", Code.CodeOK)
    public code?: Code|null = Code.CodeOK
}
export interface IUnFollowReq {
    uid?: number|null
}
@protobuf.Type.d("mpff_social_relation_v1_UnFollowReq")
export class UnFollowReq extends protobuf.Message<IUnFollowReq> {
    constructor(properties: Properties<IUnFollowReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IUnFollowResp {
    code?: Code|null
}
@protobuf.Type.d("mpff_social_relation_v1_UnFollowResp")
export class UnFollowResp extends protobuf.Message<IUnFollowResp> {
    constructor(properties: Properties<IUnFollowResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
        }
	}
    @protobuf.Field.d(1, Code, "optional", Code.CodeOK)
    public code?: Code|null = Code.CodeOK
}
export interface IBlackReq {
    uid?: number|null
}
@protobuf.Type.d("mpff_social_relation_v1_BlackReq")
export class BlackReq extends protobuf.Message<IBlackReq> {
    constructor(properties: Properties<IBlackReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IBlackResp {
    code?: Code|null
}
@protobuf.Type.d("mpff_social_relation_v1_BlackResp")
export class BlackResp extends protobuf.Message<IBlackResp> {
    constructor(properties: Properties<IBlackResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
        }
	}
    @protobuf.Field.d(1, Code, "optional", Code.CodeOK)
    public code?: Code|null = Code.CodeOK
}
export interface IUnBlackReq {
    uid?: number|null
}
@protobuf.Type.d("mpff_social_relation_v1_UnBlackReq")
export class UnBlackReq extends protobuf.Message<IUnBlackReq> {
    constructor(properties: Properties<IUnBlackReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IUnBlackResp {
    code?: Code|null
}
@protobuf.Type.d("mpff_social_relation_v1_UnBlackResp")
export class UnBlackResp extends protobuf.Message<IUnBlackResp> {
    constructor(properties: Properties<IUnBlackResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
        }
	}
    @protobuf.Field.d(1, Code, "optional", Code.CodeOK)
    public code?: Code|null = Code.CodeOK
}
export interface IApplyMutualFollowReq {
    uid?: number|null
    desc?: string|null
    mark?: IMark
    uidList?: number[]
}
@protobuf.Type.d("mpff_social_relation_v1_ApplyMutualFollowReq")
export class ApplyMutualFollowReq extends protobuf.Message<IApplyMutualFollowReq> {
    constructor(properties: Properties<IApplyMutualFollowReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.desc) { this.desc = properties.desc }
            if (properties.mark) { this.mark = Mark.create(properties.mark) as any }
            if (properties.uidList) { this.uidList = []; properties.uidList.forEach((value, index)=>{this.uidList[index] = properties.uidList[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public desc?: string|null = ""
    @protobuf.Field.d(3, "mpff_social_relation_v1_Mark", "optional")
    public mark?: Mark|null
    @protobuf.Field.d(4, "int64", "repeated", [])
    public uidList?: number[] = []
}
export interface IApplyReq {
    desc?: string|null
    mark?: IMark
    relateType?: RelateType|null
    uidList?: number[]
}
@protobuf.Type.d("mpff_social_relation_v1_ApplyReq")
export class ApplyReq extends protobuf.Message<IApplyReq> {
    constructor(properties: Properties<IApplyReq>) {
        super(properties);
        if (properties) {
            if (properties.desc) { this.desc = properties.desc }
            if (properties.mark) { this.mark = Mark.create(properties.mark) as any }
            if (properties.relateType) { this.relateType = properties.relateType }
            if (properties.uidList) { this.uidList = []; properties.uidList.forEach((value, index)=>{this.uidList[index] = properties.uidList[index]})}
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public desc?: string|null = ""
    @protobuf.Field.d(2, "mpff_social_relation_v1_Mark", "optional")
    public mark?: Mark|null
    @protobuf.Field.d(3, RelateType, "optional", RelateType.UnknownType)
    public relateType?: RelateType|null = RelateType.UnknownType
    @protobuf.Field.d(4, "int64", "repeated", [])
    public uidList?: number[] = []
}
export interface IApplyMutualFollow {
    applyID?: string|null
    fromUid?: number|null
    toUid?: number|null
    createdAt?: number|null
    desc?: string|null
    status?: ApplyStatus|null
}
@protobuf.Type.d("mpff_social_relation_v1_ApplyMutualFollow")
export class ApplyMutualFollow extends protobuf.Message<IApplyMutualFollow> {
    constructor(properties: Properties<IApplyMutualFollow>) {
        super(properties);
        if (properties) {
            if (properties.applyID) { this.applyID = properties.applyID }
            if (properties.fromUid) { this.fromUid = properties.fromUid }
            if (properties.toUid) { this.toUid = properties.toUid }
            if (properties.createdAt) { this.createdAt = properties.createdAt }
            if (properties.desc) { this.desc = properties.desc }
            if (properties.status) { this.status = properties.status }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public applyID?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public fromUid?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public toUid?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public createdAt?: number|null = 0
    @protobuf.Field.d(5, "string", "optional", )
    public desc?: string|null = ""
    @protobuf.Field.d(6, ApplyStatus, "optional", ApplyStatus.ApplyStatusUnknown)
    public status?: ApplyStatus|null = ApplyStatus.ApplyStatusUnknown
}
export interface IApplyResp {
}
@protobuf.Type.d("mpff_social_relation_v1_ApplyResp")
export class ApplyResp extends protobuf.Message<IApplyResp> {
    constructor(properties: Properties<IApplyResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IAcceptMutualFollowReq {
    applyID?: string|null
}
@protobuf.Type.d("mpff_social_relation_v1_AcceptMutualFollowReq")
export class AcceptMutualFollowReq extends protobuf.Message<IAcceptMutualFollowReq> {
    constructor(properties: Properties<IAcceptMutualFollowReq>) {
        super(properties);
        if (properties) {
            if (properties.applyID) { this.applyID = properties.applyID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public applyID?: string|null = ""
}
export interface IAcceptApplyReq {
    applyID?: string|null
}
@protobuf.Type.d("mpff_social_relation_v1_AcceptApplyReq")
export class AcceptApplyReq extends protobuf.Message<IAcceptApplyReq> {
    constructor(properties: Properties<IAcceptApplyReq>) {
        super(properties);
        if (properties) {
            if (properties.applyID) { this.applyID = properties.applyID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public applyID?: string|null = ""
}
export interface IAcceptMutualFollowResp {
    userMark?: IUserMark
}
@protobuf.Type.d("mpff_social_relation_v1_AcceptMutualFollowResp")
export class AcceptMutualFollowResp extends protobuf.Message<IAcceptMutualFollowResp> {
    constructor(properties: Properties<IAcceptMutualFollowResp>) {
        super(properties);
        if (properties) {
            if (properties.userMark) { this.userMark = UserMark.create(properties.userMark) as any }
        }
	}
    @protobuf.Field.d(1, "mpff_social_relation_v1_UserMark", "optional")
    public userMark?: UserMark|null
}
export interface IAcceptApplyResp {
    userMark?: IUserMark
}
@protobuf.Type.d("mpff_social_relation_v1_AcceptApplyResp")
export class AcceptApplyResp extends protobuf.Message<IAcceptApplyResp> {
    constructor(properties: Properties<IAcceptApplyResp>) {
        super(properties);
        if (properties) {
            if (properties.userMark) { this.userMark = UserMark.create(properties.userMark) as any }
        }
	}
    @protobuf.Field.d(1, "mpff_social_relation_v1_UserMark", "optional")
    public userMark?: UserMark|null
}
export interface IRejectMutualFollowReq {
    applyID?: string|null
}
@protobuf.Type.d("mpff_social_relation_v1_RejectMutualFollowReq")
export class RejectMutualFollowReq extends protobuf.Message<IRejectMutualFollowReq> {
    constructor(properties: Properties<IRejectMutualFollowReq>) {
        super(properties);
        if (properties) {
            if (properties.applyID) { this.applyID = properties.applyID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public applyID?: string|null = ""
}
export interface IRejectApplyReq {
    applyID?: string|null
}
@protobuf.Type.d("mpff_social_relation_v1_RejectApplyReq")
export class RejectApplyReq extends protobuf.Message<IRejectApplyReq> {
    constructor(properties: Properties<IRejectApplyReq>) {
        super(properties);
        if (properties) {
            if (properties.applyID) { this.applyID = properties.applyID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public applyID?: string|null = ""
}
export interface IRejectMutualFollowResp {
}
@protobuf.Type.d("mpff_social_relation_v1_RejectMutualFollowResp")
export class RejectMutualFollowResp extends protobuf.Message<IRejectMutualFollowResp> {
    constructor(properties: Properties<IRejectMutualFollowResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IRejectApplyResp {
}
@protobuf.Type.d("mpff_social_relation_v1_RejectApplyResp")
export class RejectApplyResp extends protobuf.Message<IRejectApplyResp> {
    constructor(properties: Properties<IRejectApplyResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IDelApplyMutualFollowReq {
    applyID?: string|null
}
@protobuf.Type.d("mpff_social_relation_v1_DelApplyMutualFollowReq")
export class DelApplyMutualFollowReq extends protobuf.Message<IDelApplyMutualFollowReq> {
    constructor(properties: Properties<IDelApplyMutualFollowReq>) {
        super(properties);
        if (properties) {
            if (properties.applyID) { this.applyID = properties.applyID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public applyID?: string|null = ""
}
export interface IDelApplyReq {
    applyID?: string|null
}
@protobuf.Type.d("mpff_social_relation_v1_DelApplyReq")
export class DelApplyReq extends protobuf.Message<IDelApplyReq> {
    constructor(properties: Properties<IDelApplyReq>) {
        super(properties);
        if (properties) {
            if (properties.applyID) { this.applyID = properties.applyID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public applyID?: string|null = ""
}
export interface IDelApplyMutualFollowResp {
}
@protobuf.Type.d("mpff_social_relation_v1_DelApplyMutualFollowResp")
export class DelApplyMutualFollowResp extends protobuf.Message<IDelApplyMutualFollowResp> {
    constructor(properties: Properties<IDelApplyMutualFollowResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IDelApplyResp {
}
@protobuf.Type.d("mpff_social_relation_v1_DelApplyResp")
export class DelApplyResp extends protobuf.Message<IDelApplyResp> {
    constructor(properties: Properties<IDelApplyResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IApplyMutualFollowResp {
    apply?: IApplyMutualFollow
}
@protobuf.Type.d("mpff_social_relation_v1_ApplyMutualFollowResp")
export class ApplyMutualFollowResp extends protobuf.Message<IApplyMutualFollowResp> {
    constructor(properties: Properties<IApplyMutualFollowResp>) {
        super(properties);
        if (properties) {
            if (properties.apply) { this.apply = ApplyMutualFollow.create(properties.apply) as any }
        }
	}
    @protobuf.Field.d(1, "mpff_social_relation_v1_ApplyMutualFollow", "optional")
    public apply?: ApplyMutualFollow|null
}
export interface IApply {
    applyID?: string|null
    fromUid?: number|null
    toUid?: number|null
    createdAt?: number|null
    desc?: string|null
    status?: ApplyStatus|null
    relateType?: RelateType|null
}
@protobuf.Type.d("mpff_social_relation_v1_Apply")
export class Apply extends protobuf.Message<IApply> {
    constructor(properties: Properties<IApply>) {
        super(properties);
        if (properties) {
            if (properties.applyID) { this.applyID = properties.applyID }
            if (properties.fromUid) { this.fromUid = properties.fromUid }
            if (properties.toUid) { this.toUid = properties.toUid }
            if (properties.createdAt) { this.createdAt = properties.createdAt }
            if (properties.desc) { this.desc = properties.desc }
            if (properties.status) { this.status = properties.status }
            if (properties.relateType) { this.relateType = properties.relateType }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public applyID?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public fromUid?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public toUid?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public createdAt?: number|null = 0
    @protobuf.Field.d(5, "string", "optional", )
    public desc?: string|null = ""
    @protobuf.Field.d(6, ApplyStatus, "optional", ApplyStatus.ApplyStatusUnknown)
    public status?: ApplyStatus|null = ApplyStatus.ApplyStatusUnknown
    @protobuf.Field.d(7, RelateType, "optional", RelateType.UnknownType)
    public relateType?: RelateType|null = RelateType.UnknownType
}
export interface ISyncApplyMutualFollowReq {
    ver?: number|null
    seq?: number|null
    pageSize?: number|null
}
@protobuf.Type.d("mpff_social_relation_v1_SyncApplyMutualFollowReq")
export class SyncApplyMutualFollowReq extends protobuf.Message<ISyncApplyMutualFollowReq> {
    constructor(properties: Properties<ISyncApplyMutualFollowReq>) {
        super(properties);
        if (properties) {
            if (properties.ver) { this.ver = properties.ver }
            if (properties.seq) { this.seq = properties.seq }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
        }
	}
    @protobuf.Field.d(3, "int32", "optional", 0)
    public ver?: number|null = 0
    @protobuf.Field.d(1, "int64", "optional", 0)
    public seq?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public pageSize?: number|null = 0
}
export interface ISyncApplyMutualFollowResp {
    list?: IApplyMutualFollow[]
    seq?: number|null
}
@protobuf.Type.d("mpff_social_relation_v1_SyncApplyMutualFollowResp")
export class SyncApplyMutualFollowResp extends protobuf.Message<ISyncApplyMutualFollowResp> {
    constructor(properties: Properties<ISyncApplyMutualFollowResp>) {
        super(properties);
        if (properties) {
            if (properties.list) { this.list = []; properties.list.forEach((value, index)=>{this.list[index] = ApplyMutualFollow.create(properties.list[index]) as any})}
            if (properties.seq) { this.seq = properties.seq }
        }
	}
    @protobuf.Field.d(1, "mpff_social_relation_v1_ApplyMutualFollow", "repeated")
    public list?: ApplyMutualFollow[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public seq?: number|null = 0
}
export interface ISyncApplyReq {
    ver?: number|null
    seq?: number|null
    pageSize?: number|null
}
@protobuf.Type.d("mpff_social_relation_v1_SyncApplyReq")
export class SyncApplyReq extends protobuf.Message<ISyncApplyReq> {
    constructor(properties: Properties<ISyncApplyReq>) {
        super(properties);
        if (properties) {
            if (properties.ver) { this.ver = properties.ver }
            if (properties.seq) { this.seq = properties.seq }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
        }
	}
    @protobuf.Field.d(3, "int32", "optional", 0)
    public ver?: number|null = 0
    @protobuf.Field.d(1, "int64", "optional", 0)
    public seq?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public pageSize?: number|null = 0
}
export interface ISyncApplyResp {
    list?: IApply[]
    seq?: number|null
}
@protobuf.Type.d("mpff_social_relation_v1_SyncApplyResp")
export class SyncApplyResp extends protobuf.Message<ISyncApplyResp> {
    constructor(properties: Properties<ISyncApplyResp>) {
        super(properties);
        if (properties) {
            if (properties.list) { this.list = []; properties.list.forEach((value, index)=>{this.list[index] = Apply.create(properties.list[index]) as any})}
            if (properties.seq) { this.seq = properties.seq }
        }
	}
    @protobuf.Field.d(1, "mpff_social_relation_v1_Apply", "repeated")
    public list?: Apply[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public seq?: number|null = 0
}
export interface IRelate {
    uid?: number|null
    relateType?: RelateType|null
    relateAt?: number|null
}
@protobuf.Type.d("mpff_social_relation_v1_Relate")
export class Relate extends protobuf.Message<IRelate> {
    constructor(properties: Properties<IRelate>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.relateType) { this.relateType = properties.relateType }
            if (properties.relateAt) { this.relateAt = properties.relateAt }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, RelateType, "optional", RelateType.UnknownType)
    public relateType?: RelateType|null = RelateType.UnknownType
    @protobuf.Field.d(3, "int64", "optional", 0)
    public relateAt?: number|null = 0
}
export interface IPageListReq {
    page?: number|null
    pageSize?: number|null
}
@protobuf.Type.d("mpff_social_relation_v1_PageListReq")
export class PageListReq extends protobuf.Message<IPageListReq> {
    constructor(properties: Properties<IPageListReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public pageSize?: number|null = 0
}
export interface IPageListResp {
    total?: number|null
    list?: IRelate[]
}
@protobuf.Type.d("mpff_social_relation_v1_PageListResp")
export class PageListResp extends protobuf.Message<IPageListResp> {
    constructor(properties: Properties<IPageListResp>) {
        super(properties);
        if (properties) {
            if (properties.total) { this.total = properties.total }
            if (properties.list) { this.list = []; properties.list.forEach((value, index)=>{this.list[index] = Relate.create(properties.list[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public total?: number|null = 0
    @protobuf.Field.d(2, "mpff_social_relation_v1_Relate", "repeated")
    public list?: Relate[] = []
}
export interface IRelateCount {
    followNum?: number|null
    fansNum?: number|null
    friendNum?: number|null
    blackNum?: number|null
}
@protobuf.Type.d("mpff_social_relation_v1_RelateCount")
export class RelateCount extends protobuf.Message<IRelateCount> {
    constructor(properties: Properties<IRelateCount>) {
        super(properties);
        if (properties) {
            if (properties.followNum) { this.followNum = properties.followNum }
            if (properties.fansNum) { this.fansNum = properties.fansNum }
            if (properties.friendNum) { this.friendNum = properties.friendNum }
            if (properties.blackNum) { this.blackNum = properties.blackNum }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public followNum?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public fansNum?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public friendNum?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public blackNum?: number|null = 0
}
export interface ISyncID {
    Date?: number|null
    Incr?: number|null
}
@protobuf.Type.d("mpff_social_relation_v1_SyncID")
export class SyncID extends protobuf.Message<ISyncID> {
    constructor(properties: Properties<ISyncID>) {
        super(properties);
        if (properties) {
            if (properties.Date) { this.Date = properties.Date }
            if (properties.Incr) { this.Incr = properties.Incr }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public Date?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public Incr?: number|null = 0
}
export interface ISyncRelate {
    syncID?: ISyncID
    uid?: number|null
    operate?: SyncRelate_Operate|null
    relateType?: RelateType|null
    operateAt?: number|null
}
@protobuf.Type.d("mpff_social_relation_v1_SyncRelate")
export class SyncRelate extends protobuf.Message<ISyncRelate> {
    constructor(properties: Properties<ISyncRelate>) {
        super(properties);
        if (properties) {
            if (properties.syncID) { this.syncID = SyncID.create(properties.syncID) as any }
            if (properties.uid) { this.uid = properties.uid }
            if (properties.operate) { this.operate = properties.operate }
            if (properties.relateType) { this.relateType = properties.relateType }
            if (properties.operateAt) { this.operateAt = properties.operateAt }
        }
	}
    @protobuf.Field.d(1, "mpff_social_relation_v1_SyncID", "optional")
    public syncID?: SyncID|null
    @protobuf.Field.d(2, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(3, SyncRelate_Operate, "optional", SyncRelate_Operate.UnknownOperate)
    public operate?: SyncRelate_Operate|null = SyncRelate_Operate.UnknownOperate
    @protobuf.Field.d(4, RelateType, "optional", RelateType.UnknownType)
    public relateType?: RelateType|null = RelateType.UnknownType
    @protobuf.Field.d(5, "int64", "optional", 0)
    public operateAt?: number|null = 0
}
export interface ISyncChangeReq {
    syncID?: ISyncID
    page?: number|null
    pageSize?: number|null
}
@protobuf.Type.d("mpff_social_relation_v1_SyncChangeReq")
export class SyncChangeReq extends protobuf.Message<ISyncChangeReq> {
    constructor(properties: Properties<ISyncChangeReq>) {
        super(properties);
        if (properties) {
            if (properties.syncID) { this.syncID = SyncID.create(properties.syncID) as any }
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
        }
	}
    @protobuf.Field.d(1, "mpff_social_relation_v1_SyncID", "optional")
    public syncID?: SyncID|null
    @protobuf.Field.d(2, "int32", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(3, "int32", "optional", 0)
    public pageSize?: number|null = 0
}
export interface ISyncChangeResp {
    code?: SyncChangeResp_Code|null
    lastSyncID?: ISyncID
    list?: ISyncRelate[]
}
@protobuf.Type.d("mpff_social_relation_v1_SyncChangeResp")
export class SyncChangeResp extends protobuf.Message<ISyncChangeResp> {
    constructor(properties: Properties<ISyncChangeResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.lastSyncID) { this.lastSyncID = SyncID.create(properties.lastSyncID) as any }
            if (properties.list) { this.list = []; properties.list.forEach((value, index)=>{this.list[index] = SyncRelate.create(properties.list[index]) as any})}
        }
	}
    @protobuf.Field.d(1, SyncChangeResp_Code, "optional", SyncChangeResp_Code.Unknown)
    public code?: SyncChangeResp_Code|null = SyncChangeResp_Code.Unknown
    @protobuf.Field.d(2, "mpff_social_relation_v1_SyncID", "optional")
    public lastSyncID?: SyncID|null
    @protobuf.Field.d(3, "mpff_social_relation_v1_SyncRelate", "repeated")
    public list?: SyncRelate[] = []
}
export interface ISyncNotify {
}
@protobuf.Type.d("mpff_social_relation_v1_SyncNotify")
export class SyncNotify extends protobuf.Message<ISyncNotify> {
    constructor(properties: Properties<ISyncNotify>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface ISyncApplyNotify {
}
@protobuf.Type.d("mpff_social_relation_v1_SyncApplyNotify")
export class SyncApplyNotify extends protobuf.Message<ISyncApplyNotify> {
    constructor(properties: Properties<ISyncApplyNotify>) {
        super(properties);
        if (properties) {
        }
	}
}
class $Relation extends RpcService {
    async Follow(req: IFollowReq, params?: RpcParams) : Promise<{err:number, resp:IFollowResp}> {
        let data = FollowReq.create(req)
        this.onBeforeReq("Follow", data, params)
        const buffer = FollowReq.encode(data).finish()
        let [err, pack] = await this.call("Follow", buffer, params)
        if (err) {
            this.onBeforeResp("Follow", err)
            return {err: err, resp: null}
        } else {
            let resp = FollowResp.decode(pack) as any
            this.onBeforeResp("Follow", err, resp)
            return {err: null, resp: resp}
        }
    }
    async UnFollow(req: IUnFollowReq, params?: RpcParams) : Promise<{err:number, resp:IUnFollowResp}> {
        let data = UnFollowReq.create(req)
        this.onBeforeReq("UnFollow", data, params)
        const buffer = UnFollowReq.encode(data).finish()
        let [err, pack] = await this.call("UnFollow", buffer, params)
        if (err) {
            this.onBeforeResp("UnFollow", err)
            return {err: err, resp: null}
        } else {
            let resp = UnFollowResp.decode(pack) as any
            this.onBeforeResp("UnFollow", err, resp)
            return {err: null, resp: resp}
        }
    }
    async Black(req: IBlackReq, params?: RpcParams) : Promise<{err:number, resp:IBlackResp}> {
        let data = BlackReq.create(req)
        this.onBeforeReq("Black", data, params)
        const buffer = BlackReq.encode(data).finish()
        let [err, pack] = await this.call("Black", buffer, params)
        if (err) {
            this.onBeforeResp("Black", err)
            return {err: err, resp: null}
        } else {
            let resp = BlackResp.decode(pack) as any
            this.onBeforeResp("Black", err, resp)
            return {err: null, resp: resp}
        }
    }
    async UnBlack(req: IUnBlackReq, params?: RpcParams) : Promise<{err:number, resp:IUnBlackResp}> {
        let data = UnBlackReq.create(req)
        this.onBeforeReq("UnBlack", data, params)
        const buffer = UnBlackReq.encode(data).finish()
        let [err, pack] = await this.call("UnBlack", buffer, params)
        if (err) {
            this.onBeforeResp("UnBlack", err)
            return {err: err, resp: null}
        } else {
            let resp = UnBlackResp.decode(pack) as any
            this.onBeforeResp("UnBlack", err, resp)
            return {err: null, resp: resp}
        }
    }
    async Apply(req: IApplyReq, params?: RpcParams) : Promise<{err:number, resp:IApplyResp}> {
        let data = ApplyReq.create(req)
        this.onBeforeReq("Apply", data, params)
        const buffer = ApplyReq.encode(data).finish()
        let [err, pack] = await this.call("Apply", buffer, params)
        if (err) {
            this.onBeforeResp("Apply", err)
            return {err: err, resp: null}
        } else {
            let resp = ApplyResp.decode(pack) as any
            this.onBeforeResp("Apply", err, resp)
            return {err: null, resp: resp}
        }
    }
    async RejectApply(req: IRejectApplyReq, params?: RpcParams) : Promise<{err:number, resp:IRejectApplyResp}> {
        let data = RejectApplyReq.create(req)
        this.onBeforeReq("RejectApply", data, params)
        const buffer = RejectApplyReq.encode(data).finish()
        let [err, pack] = await this.call("RejectApply", buffer, params)
        if (err) {
            this.onBeforeResp("RejectApply", err)
            return {err: err, resp: null}
        } else {
            let resp = RejectApplyResp.decode(pack) as any
            this.onBeforeResp("RejectApply", err, resp)
            return {err: null, resp: resp}
        }
    }
    async AcceptApply(req: IAcceptApplyReq, params?: RpcParams) : Promise<{err:number, resp:IAcceptApplyResp}> {
        let data = AcceptApplyReq.create(req)
        this.onBeforeReq("AcceptApply", data, params)
        const buffer = AcceptApplyReq.encode(data).finish()
        let [err, pack] = await this.call("AcceptApply", buffer, params)
        if (err) {
            this.onBeforeResp("AcceptApply", err)
            return {err: err, resp: null}
        } else {
            let resp = AcceptApplyResp.decode(pack) as any
            this.onBeforeResp("AcceptApply", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DelApply(req: IDelApplyReq, params?: RpcParams) : Promise<{err:number, resp:IDelApplyResp}> {
        let data = DelApplyReq.create(req)
        this.onBeforeReq("DelApply", data, params)
        const buffer = DelApplyReq.encode(data).finish()
        let [err, pack] = await this.call("DelApply", buffer, params)
        if (err) {
            this.onBeforeResp("DelApply", err)
            return {err: err, resp: null}
        } else {
            let resp = DelApplyResp.decode(pack) as any
            this.onBeforeResp("DelApply", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SyncApply(req: ISyncApplyReq, params?: RpcParams) : Promise<{err:number, resp:ISyncApplyResp}> {
        let data = SyncApplyReq.create(req)
        this.onBeforeReq("SyncApply", data, params)
        const buffer = SyncApplyReq.encode(data).finish()
        let [err, pack] = await this.call("SyncApply", buffer, params)
        if (err) {
            this.onBeforeResp("SyncApply", err)
            return {err: err, resp: null}
        } else {
            let resp = SyncApplyResp.decode(pack) as any
            this.onBeforeResp("SyncApply", err, resp)
            return {err: null, resp: resp}
        }
    }
    async PageList(req: IPageListReq, params?: RpcParams) : Promise<{err:number, resp:IPageListResp}> {
        let data = PageListReq.create(req)
        this.onBeforeReq("PageList", data, params)
        const buffer = PageListReq.encode(data).finish()
        let [err, pack] = await this.call("PageList", buffer, params)
        if (err) {
            this.onBeforeResp("PageList", err)
            return {err: err, resp: null}
        } else {
            let resp = PageListResp.decode(pack) as any
            this.onBeforeResp("PageList", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SyncChange(req: ISyncChangeReq, params?: RpcParams) : Promise<{err:number, resp:ISyncChangeResp}> {
        let data = SyncChangeReq.create(req)
        this.onBeforeReq("SyncChange", data, params)
        const buffer = SyncChangeReq.encode(data).finish()
        let [err, pack] = await this.call("SyncChange", buffer, params)
        if (err) {
            this.onBeforeResp("SyncChange", err)
            return {err: err, resp: null}
        } else {
            let resp = SyncChangeResp.decode(pack) as any
            this.onBeforeResp("SyncChange", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SaveMark(req: ISaveMarkReq, params?: RpcParams) : Promise<{err:number, resp:ISaveMarkResp}> {
        let data = SaveMarkReq.create(req)
        this.onBeforeReq("SaveMark", data, params)
        const buffer = SaveMarkReq.encode(data).finish()
        let [err, pack] = await this.call("SaveMark", buffer, params)
        if (err) {
            this.onBeforeResp("SaveMark", err)
            return {err: err, resp: null}
        } else {
            let resp = SaveMarkResp.decode(pack) as any
            this.onBeforeResp("SaveMark", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetMark(req: IGetMarkReq, params?: RpcParams) : Promise<{err:number, resp:IGetMarkResp}> {
        let data = GetMarkReq.create(req)
        this.onBeforeReq("GetMark", data, params)
        const buffer = GetMarkReq.encode(data).finish()
        let [err, pack] = await this.call("GetMark", buffer, params)
        if (err) {
            this.onBeforeResp("GetMark", err)
            return {err: err, resp: null}
        } else {
            let resp = GetMarkResp.decode(pack) as any
            this.onBeforeResp("GetMark", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SyncMark(req: ISyncMarkReq, params?: RpcParams) : Promise<{err:number, resp:ISyncMarkResp}> {
        let data = SyncMarkReq.create(req)
        this.onBeforeReq("SyncMark", data, params)
        const buffer = SyncMarkReq.encode(data).finish()
        let [err, pack] = await this.call("SyncMark", buffer, params)
        if (err) {
            this.onBeforeResp("SyncMark", err)
            return {err: err, resp: null}
        } else {
            let resp = SyncMarkResp.decode(pack) as any
            this.onBeforeResp("SyncMark", err, resp)
            return {err: null, resp: resp}
        }
    }
    async MpNotifyCall(req: mp_common_IMpRelateNotifyCall, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = mp_common_MpRelateNotifyCall.create(req)
        this.onBeforeReq("MpNotifyCall", data, params)
        const buffer = mp_common_MpRelateNotifyCall.encode(data).finish()
        let [err, pack] = await this.call("MpNotifyCall", buffer, params)
        if (err) {
            this.onBeforeResp("MpNotifyCall", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("MpNotifyCall", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ApplyMutualFollow(req: IApplyMutualFollowReq, params?: RpcParams) : Promise<{err:number, resp:IApplyMutualFollowResp}> {
        let data = ApplyMutualFollowReq.create(req)
        this.onBeforeReq("ApplyMutualFollow", data, params)
        const buffer = ApplyMutualFollowReq.encode(data).finish()
        let [err, pack] = await this.call("ApplyMutualFollow", buffer, params)
        if (err) {
            this.onBeforeResp("ApplyMutualFollow", err)
            return {err: err, resp: null}
        } else {
            let resp = ApplyMutualFollowResp.decode(pack) as any
            this.onBeforeResp("ApplyMutualFollow", err, resp)
            return {err: null, resp: resp}
        }
    }
    async RejectMutualFollow(req: IRejectMutualFollowReq, params?: RpcParams) : Promise<{err:number, resp:IRejectMutualFollowResp}> {
        let data = RejectMutualFollowReq.create(req)
        this.onBeforeReq("RejectMutualFollow", data, params)
        const buffer = RejectMutualFollowReq.encode(data).finish()
        let [err, pack] = await this.call("RejectMutualFollow", buffer, params)
        if (err) {
            this.onBeforeResp("RejectMutualFollow", err)
            return {err: err, resp: null}
        } else {
            let resp = RejectMutualFollowResp.decode(pack) as any
            this.onBeforeResp("RejectMutualFollow", err, resp)
            return {err: null, resp: resp}
        }
    }
    async AcceptMutualFollow(req: IAcceptMutualFollowReq, params?: RpcParams) : Promise<{err:number, resp:IAcceptMutualFollowResp}> {
        let data = AcceptMutualFollowReq.create(req)
        this.onBeforeReq("AcceptMutualFollow", data, params)
        const buffer = AcceptMutualFollowReq.encode(data).finish()
        let [err, pack] = await this.call("AcceptMutualFollow", buffer, params)
        if (err) {
            this.onBeforeResp("AcceptMutualFollow", err)
            return {err: err, resp: null}
        } else {
            let resp = AcceptMutualFollowResp.decode(pack) as any
            this.onBeforeResp("AcceptMutualFollow", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DelApplyMutualFollow(req: IDelApplyMutualFollowReq, params?: RpcParams) : Promise<{err:number, resp:IDelApplyMutualFollowResp}> {
        let data = DelApplyMutualFollowReq.create(req)
        this.onBeforeReq("DelApplyMutualFollow", data, params)
        const buffer = DelApplyMutualFollowReq.encode(data).finish()
        let [err, pack] = await this.call("DelApplyMutualFollow", buffer, params)
        if (err) {
            this.onBeforeResp("DelApplyMutualFollow", err)
            return {err: err, resp: null}
        } else {
            let resp = DelApplyMutualFollowResp.decode(pack) as any
            this.onBeforeResp("DelApplyMutualFollow", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SyncApplyMutualFollow(req: ISyncApplyMutualFollowReq, params?: RpcParams) : Promise<{err:number, resp:ISyncApplyMutualFollowResp}> {
        let data = SyncApplyMutualFollowReq.create(req)
        this.onBeforeReq("SyncApplyMutualFollow", data, params)
        const buffer = SyncApplyMutualFollowReq.encode(data).finish()
        let [err, pack] = await this.call("SyncApplyMutualFollow", buffer, params)
        if (err) {
            this.onBeforeResp("SyncApplyMutualFollow", err)
            return {err: err, resp: null}
        } else {
            let resp = SyncApplyMutualFollowResp.decode(pack) as any
            this.onBeforeResp("SyncApplyMutualFollow", err, resp)
            return {err: null, resp: resp}
        }
    }
    NotifySync(data: Uint8Array, params: RpcParams) : {msg: ISyncNotify, eventID?: number} {
        let msg = SyncNotify.decode(data)
        return {msg: msg}
    }
    NotifyApplySync(data: Uint8Array, params: RpcParams) : {msg: ISyncApplyNotify, eventID?: number} {
        let msg = SyncApplyNotify.decode(data)
        return {msg: msg}
    }
    NotifyApplSync(data: Uint8Array, params: RpcParams) : {msg: ISyncApplyNotify, eventID?: number} {
        let msg = SyncApplyNotify.decode(data)
        return {msg: msg}
    }
}
export const Relation = new $Relation({
    name: "mpff.social.relation.v1",
})
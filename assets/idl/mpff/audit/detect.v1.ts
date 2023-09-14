import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
export enum Code {  
    CodeOK = 0,
}
export enum SensitiveType {  
    SensitiveTypeUnknown = 0,  
    SensitiveTypeViolence = 1,  
    SensitiveTypePorn = 2,  
    SensitiveTypeLaw = 3,  
    SensitiveTypePolitics = 4,  
    SensitiveTypeCompetitor = 10,  
    SensitiveTypeProhibited = 99,
}
export enum MatchMode {  
    MatchModeUnknown = 0,  
    MatchModeNormal = 1,  
    MatchModePinyin = 2,
}
export enum SyncPackageType {  
    SyncPackageTypeUnknown = 0,  
    SyncPackageTypeAdd = 1,  
    SyncPackageTypeDelete = 2,
}
export enum SyncType {  
    SyncTypeNone = 0,  
    SyncTypeFull = 1,  
    SyncTypeIncr = 2,
}
export enum DetectResultType {  
    DetectResultTypeUnknown = 0,  
    DetectResultTypePass = 1,  
    DetectResultTypeReject = 2,  
    DetectResultTypeSuspect = 3,
}
export enum ResourceObjectType {  
    ResourceObjectTypeDefualt = 0,
}
export interface IEntry {
    entryID?: number|null
    sensitiveType?: SensitiveType|null
    matchMode?: MatchMode|null
    content?: string|null
    version?: number|null
}
@protobuf.Type.d("mpff_audit_detect_v1_Entry")
export class Entry extends protobuf.Message<IEntry> {
    constructor(properties: Properties<IEntry>) {
        super(properties);
        if (properties) {
            if (properties.entryID) { this.entryID = properties.entryID }
            if (properties.sensitiveType) { this.sensitiveType = properties.sensitiveType }
            if (properties.matchMode) { this.matchMode = properties.matchMode }
            if (properties.content) { this.content = properties.content }
            if (properties.version) { this.version = properties.version }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public entryID?: number|null = 0
    @protobuf.Field.d(2, SensitiveType, "optional", SensitiveType.SensitiveTypeUnknown)
    public sensitiveType?: SensitiveType|null = SensitiveType.SensitiveTypeUnknown
    @protobuf.Field.d(3, MatchMode, "optional", MatchMode.MatchModeUnknown)
    public matchMode?: MatchMode|null = MatchMode.MatchModeUnknown
    @protobuf.Field.d(4, "string", "optional", )
    public content?: string|null = ""
    @protobuf.Field.d(13, "int64", "optional", 0)
    public version?: number|null = 0
}
export interface ISyncPackage {
    syncPackageType?: SyncPackageType|null
    entries?: IEntry[]
    syncID?: number|null
    flag?: string|null
}
@protobuf.Type.d("mpff_audit_detect_v1_SyncPackage")
export class SyncPackage extends protobuf.Message<ISyncPackage> {
    constructor(properties: Properties<ISyncPackage>) {
        super(properties);
        if (properties) {
            if (properties.syncPackageType) { this.syncPackageType = properties.syncPackageType }
            if (properties.entries) { this.entries = []; properties.entries.forEach((value, index)=>{this.entries[index] = Entry.create(properties.entries[index]) as any})}
            if (properties.syncID) { this.syncID = properties.syncID }
            if (properties.flag) { this.flag = properties.flag }
        }
	}
    @protobuf.Field.d(1, SyncPackageType, "optional", SyncPackageType.SyncPackageTypeUnknown)
    public syncPackageType?: SyncPackageType|null = SyncPackageType.SyncPackageTypeUnknown
    @protobuf.Field.d(2, "mpff_audit_detect_v1_Entry", "repeated")
    public entries?: Entry[] = []
    @protobuf.Field.d(3, "int64", "optional", 0)
    public syncID?: number|null = 0
    @protobuf.Field.d(6, "string", "optional", )
    public flag?: string|null = ""
}
export interface ISyncEntriesReq {
    version?: number|null
    addSyncID?: number|null
    deleteSyncID?: number|null
    packageSize?: number|null
    flag?: string|null
}
@protobuf.Type.d("mpff_audit_detect_v1_SyncEntriesReq")
export class SyncEntriesReq extends protobuf.Message<ISyncEntriesReq> {
    constructor(properties: Properties<ISyncEntriesReq>) {
        super(properties);
        if (properties) {
            if (properties.version) { this.version = properties.version }
            if (properties.addSyncID) { this.addSyncID = properties.addSyncID }
            if (properties.deleteSyncID) { this.deleteSyncID = properties.deleteSyncID }
            if (properties.packageSize) { this.packageSize = properties.packageSize }
            if (properties.flag) { this.flag = properties.flag }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public version?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public addSyncID?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public deleteSyncID?: number|null = 0
    @protobuf.Field.d(4, "int32", "optional", 0)
    public packageSize?: number|null = 0
    @protobuf.Field.d(6, "string", "optional", )
    public flag?: string|null = ""
}
export interface ISyncEntriesResp {
    version?: number|null
    syncType?: SyncType|null
    syncPackages?: ISyncPackage[]
    flag?: string|null
}
@protobuf.Type.d("mpff_audit_detect_v1_SyncEntriesResp")
export class SyncEntriesResp extends protobuf.Message<ISyncEntriesResp> {
    constructor(properties: Properties<ISyncEntriesResp>) {
        super(properties);
        if (properties) {
            if (properties.version) { this.version = properties.version }
            if (properties.syncType) { this.syncType = properties.syncType }
            if (properties.syncPackages) { this.syncPackages = []; properties.syncPackages.forEach((value, index)=>{this.syncPackages[index] = SyncPackage.create(properties.syncPackages[index]) as any})}
            if (properties.flag) { this.flag = properties.flag }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public version?: number|null = 0
    @protobuf.Field.d(2, SyncType, "optional", SyncType.SyncTypeNone)
    public syncType?: SyncType|null = SyncType.SyncTypeNone
    @protobuf.Field.d(3, "mpff_audit_detect_v1_SyncPackage", "repeated")
    public syncPackages?: SyncPackage[] = []
    @protobuf.Field.d(6, "string", "optional", )
    public flag?: string|null = ""
}
export interface IDetectOSSImageResourceReq {
    objectKey?: string|null
    scene?: string|null
}
@protobuf.Type.d("mpff_audit_detect_v1_DetectOSSImageResourceReq")
export class DetectOSSImageResourceReq extends protobuf.Message<IDetectOSSImageResourceReq> {
    constructor(properties: Properties<IDetectOSSImageResourceReq>) {
        super(properties);
        if (properties) {
            if (properties.objectKey) { this.objectKey = properties.objectKey }
            if (properties.scene) { this.scene = properties.scene }
        }
	}
    @protobuf.Field.d(3, "string", "optional", )
    public objectKey?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public scene?: string|null = ""
}
export interface IDetectOSSImageResourceResp {
    result?: DetectResultType|null
}
@protobuf.Type.d("mpff_audit_detect_v1_DetectOSSImageResourceResp")
export class DetectOSSImageResourceResp extends protobuf.Message<IDetectOSSImageResourceResp> {
    constructor(properties: Properties<IDetectOSSImageResourceResp>) {
        super(properties);
        if (properties) {
            if (properties.result) { this.result = properties.result }
        }
	}
    @protobuf.Field.d(3, DetectResultType, "optional", DetectResultType.DetectResultTypeUnknown)
    public result?: DetectResultType|null = DetectResultType.DetectResultTypeUnknown
}
export interface ITextDetectResult {
    start?: number|null
    iend?: number|null
    entry?: IEntry
}
@protobuf.Type.d("mpff_audit_detect_v1_TextDetectResult")
export class TextDetectResult extends protobuf.Message<ITextDetectResult> {
    constructor(properties: Properties<ITextDetectResult>) {
        super(properties);
        if (properties) {
            if (properties.start) { this.start = properties.start }
            if (properties.iend) { this.iend = properties.iend }
            if (properties.entry) { this.entry = Entry.create(properties.entry) as any }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public start?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public iend?: number|null = 0
    @protobuf.Field.d(3, "mpff_audit_detect_v1_Entry", "optional")
    public entry?: Entry|null
}
export interface IDetectTextReq {
    content?: string|null
    scene?: string|null
    extra?: string|null
    returnReplacedText?: boolean|null
    replacement?: string|null
}
@protobuf.Type.d("mpff_audit_detect_v1_DetectTextReq")
export class DetectTextReq extends protobuf.Message<IDetectTextReq> {
    constructor(properties: Properties<IDetectTextReq>) {
        super(properties);
        if (properties) {
            if (properties.content) { this.content = properties.content }
            if (properties.scene) { this.scene = properties.scene }
            if (properties.extra) { this.extra = properties.extra }
            if (properties.returnReplacedText) { this.returnReplacedText = properties.returnReplacedText }
            if (properties.replacement) { this.replacement = properties.replacement }
        }
	}
    @protobuf.Field.d(3, "string", "optional", )
    public content?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public scene?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public extra?: string|null = ""
    @protobuf.Field.d(6, "bool", "optional", false)
    public returnReplacedText?: boolean|null = false
    @protobuf.Field.d(7, "string", "optional", )
    public replacement?: string|null = ""
}
export interface IDetectTextResp {
    results?: ITextDetectResult[]
    replacedText?: string|null
}
@protobuf.Type.d("mpff_audit_detect_v1_DetectTextResp")
export class DetectTextResp extends protobuf.Message<IDetectTextResp> {
    constructor(properties: Properties<IDetectTextResp>) {
        super(properties);
        if (properties) {
            if (properties.results) { this.results = []; properties.results.forEach((value, index)=>{this.results[index] = TextDetectResult.create(properties.results[index]) as any})}
            if (properties.replacedText) { this.replacedText = properties.replacedText }
        }
	}
    @protobuf.Field.d(1, "mpff_audit_detect_v1_TextDetectResult", "repeated")
    public results?: TextDetectResult[] = []
    @protobuf.Field.d(3, "string", "optional", )
    public replacedText?: string|null = ""
}
export interface IOSSObject {
    dataID?: string|null
    objectKey?: string|null
}
@protobuf.Type.d("mpff_audit_detect_v1_OSSObject")
export class OSSObject extends protobuf.Message<IOSSObject> {
    constructor(properties: Properties<IOSSObject>) {
        super(properties);
        if (properties) {
            if (properties.dataID) { this.dataID = properties.dataID }
            if (properties.objectKey) { this.objectKey = properties.objectKey }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public dataID?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public objectKey?: string|null = ""
}
export interface IResourceObject {
    type?: ResourceObjectType|null
    ossObject?: IOSSObject
}
@protobuf.Type.d("mpff_audit_detect_v1_ResourceObject")
export class ResourceObject extends protobuf.Message<IResourceObject> {
    constructor(properties: Properties<IResourceObject>) {
        super(properties);
        if (properties) {
            if (properties.type) { this.type = properties.type }
            if (properties.ossObject) { this.ossObject = OSSObject.create(properties.ossObject) as any }
        }
	}
    @protobuf.Field.d(1, ResourceObjectType, "optional", ResourceObjectType.ResourceObjectTypeDefualt)
    public type?: ResourceObjectType|null = ResourceObjectType.ResourceObjectTypeDefualt
    @protobuf.Field.d(2, "mpff_audit_detect_v1_OSSObject", "optional")
    public ossObject?: OSSObject|null
}
export interface IResourceBlacklistSyncPackage {
    syncPackageType?: SyncPackageType|null
    objects?: IResourceObject[]
    syncID?: number|null
}
@protobuf.Type.d("mpff_audit_detect_v1_ResourceBlacklistSyncPackage")
export class ResourceBlacklistSyncPackage extends protobuf.Message<IResourceBlacklistSyncPackage> {
    constructor(properties: Properties<IResourceBlacklistSyncPackage>) {
        super(properties);
        if (properties) {
            if (properties.syncPackageType) { this.syncPackageType = properties.syncPackageType }
            if (properties.objects) { this.objects = []; properties.objects.forEach((value, index)=>{this.objects[index] = ResourceObject.create(properties.objects[index]) as any})}
            if (properties.syncID) { this.syncID = properties.syncID }
        }
	}
    @protobuf.Field.d(1, SyncPackageType, "optional", SyncPackageType.SyncPackageTypeUnknown)
    public syncPackageType?: SyncPackageType|null = SyncPackageType.SyncPackageTypeUnknown
    @protobuf.Field.d(2, "mpff_audit_detect_v1_ResourceObject", "repeated")
    public objects?: ResourceObject[] = []
    @protobuf.Field.d(3, "int64", "optional", 0)
    public syncID?: number|null = 0
}
export interface ISyncResourceBlacklistReq {
    version?: number|null
    addSyncID?: number|null
    deleteSyncID?: number|null
    packageSize?: number|null
    flag?: string|null
}
@protobuf.Type.d("mpff_audit_detect_v1_SyncResourceBlacklistReq")
export class SyncResourceBlacklistReq extends protobuf.Message<ISyncResourceBlacklistReq> {
    constructor(properties: Properties<ISyncResourceBlacklistReq>) {
        super(properties);
        if (properties) {
            if (properties.version) { this.version = properties.version }
            if (properties.addSyncID) { this.addSyncID = properties.addSyncID }
            if (properties.deleteSyncID) { this.deleteSyncID = properties.deleteSyncID }
            if (properties.packageSize) { this.packageSize = properties.packageSize }
            if (properties.flag) { this.flag = properties.flag }
        }
	}
    @protobuf.Field.d(2, "int64", "optional", 0)
    public version?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public addSyncID?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public deleteSyncID?: number|null = 0
    @protobuf.Field.d(5, "int32", "optional", 0)
    public packageSize?: number|null = 0
    @protobuf.Field.d(6, "string", "optional", )
    public flag?: string|null = ""
}
export interface ISyncResourceBlacklistResp {
    version?: number|null
    syncType?: SyncType|null
    syncPackages?: IResourceBlacklistSyncPackage[]
    flag?: string|null
}
@protobuf.Type.d("mpff_audit_detect_v1_SyncResourceBlacklistResp")
export class SyncResourceBlacklistResp extends protobuf.Message<ISyncResourceBlacklistResp> {
    constructor(properties: Properties<ISyncResourceBlacklistResp>) {
        super(properties);
        if (properties) {
            if (properties.version) { this.version = properties.version }
            if (properties.syncType) { this.syncType = properties.syncType }
            if (properties.syncPackages) { this.syncPackages = []; properties.syncPackages.forEach((value, index)=>{this.syncPackages[index] = ResourceBlacklistSyncPackage.create(properties.syncPackages[index]) as any})}
            if (properties.flag) { this.flag = properties.flag }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public version?: number|null = 0
    @protobuf.Field.d(2, SyncType, "optional", SyncType.SyncTypeNone)
    public syncType?: SyncType|null = SyncType.SyncTypeNone
    @protobuf.Field.d(3, "mpff_audit_detect_v1_ResourceBlacklistSyncPackage", "repeated")
    public syncPackages?: ResourceBlacklistSyncPackage[] = []
    @protobuf.Field.d(6, "string", "optional", )
    public flag?: string|null = ""
}
class $Detect extends RpcService {
    async SyncEntries(req: ISyncEntriesReq, params?: RpcParams) : Promise<{err:number, resp:ISyncEntriesResp}> {
        let data = SyncEntriesReq.create(req)
        this.onBeforeReq("SyncEntries", data, params)
        const buffer = SyncEntriesReq.encode(data).finish()
        let [err, pack] = await this.call("SyncEntries", buffer, params)
        if (err) {
            this.onBeforeResp("SyncEntries", err)
            return {err: err, resp: null}
        } else {
            let resp = SyncEntriesResp.decode(pack) as any
            this.onBeforeResp("SyncEntries", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DetectOSSImageResource(req: IDetectOSSImageResourceReq, params?: RpcParams) : Promise<{err:number, resp:IDetectOSSImageResourceResp}> {
        let data = DetectOSSImageResourceReq.create(req)
        this.onBeforeReq("DetectOSSImageResource", data, params)
        const buffer = DetectOSSImageResourceReq.encode(data).finish()
        let [err, pack] = await this.call("DetectOSSImageResource", buffer, params)
        if (err) {
            this.onBeforeResp("DetectOSSImageResource", err)
            return {err: err, resp: null}
        } else {
            let resp = DetectOSSImageResourceResp.decode(pack) as any
            this.onBeforeResp("DetectOSSImageResource", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DetectText(req: IDetectTextReq, params?: RpcParams) : Promise<{err:number, resp:IDetectTextResp}> {
        let data = DetectTextReq.create(req)
        this.onBeforeReq("DetectText", data, params)
        const buffer = DetectTextReq.encode(data).finish()
        let [err, pack] = await this.call("DetectText", buffer, params)
        if (err) {
            this.onBeforeResp("DetectText", err)
            return {err: err, resp: null}
        } else {
            let resp = DetectTextResp.decode(pack) as any
            this.onBeforeResp("DetectText", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SyncResourceBlacklist(req: ISyncResourceBlacklistReq, params?: RpcParams) : Promise<{err:number, resp:ISyncResourceBlacklistResp}> {
        let data = SyncResourceBlacklistReq.create(req)
        this.onBeforeReq("SyncResourceBlacklist", data, params)
        const buffer = SyncResourceBlacklistReq.encode(data).finish()
        let [err, pack] = await this.call("SyncResourceBlacklist", buffer, params)
        if (err) {
            this.onBeforeResp("SyncResourceBlacklist", err)
            return {err: err, resp: null}
        } else {
            let resp = SyncResourceBlacklistResp.decode(pack) as any
            this.onBeforeResp("SyncResourceBlacklist", err, resp)
            return {err: null, resp: resp}
        }
    }
}
export const Detect = new $Detect({
    name: "mpff.audit.detect.v1",
})
import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
export enum Code {  
    CodeOK = 0,  
    CodeOperateTooManyEntires = 1001,  
    CodeInsertEntryDuplicate = 1002,
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
export enum EntryOperateType {  
    EntryOperateTypeInsert = 0,  
    EntryOperateTypeDelete = 1,  
    EntryOperateTypeUpdate = 2,
}
export enum DetectionTaskStatus {  
    DetectionTaskStatusUnknown = 0,  
    DetectionTaskStatusSubmitted = 1,  
    DetectionTaskStatusPass = 2,  
    DetectionTaskStatusReject = 3,  
    DetectionTaskStatusSuspect = 4,
}
export enum DetectionTaskType {  
    DetectionTaskTypeUnknown = 0,  
    DetectionTaskTypeText = 1,  
    DetectionTaskTypeOSS = 2,
}
export enum DetectResultType {  
    DetectResultTypeUnknown = 0,  
    DetectResultTypePass = 1,  
    DetectResultTypeReject = 2,  
    DetectResultTypeSuspect = 3,
}
export enum OSSObjectType {  
    OSSObjectTypeUnknown = 0,  
    OSSObjectTypeImage = 1,  
    OSSObjectTypeVideo = 2,  
    OSSObjectTypeAudio = 3,
}
export enum ResourceObjectType {  
    ResourceObjectTypeDefualt = 0,
}
export interface IEntry {
    id?: number|null
    sensitiveType?: SensitiveType|null
    matchMode?: MatchMode|null
    content?: string|null
    version?: number|null
    createdAt?: number|null
    updatedAt?: number|null
}
@protobuf.Type.d("mp_audit_detect_v1_Entry")
export class Entry extends protobuf.Message<IEntry> {
    constructor(properties: Properties<IEntry>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.sensitiveType) { this.sensitiveType = properties.sensitiveType }
            if (properties.matchMode) { this.matchMode = properties.matchMode }
            if (properties.content) { this.content = properties.content }
            if (properties.version) { this.version = properties.version }
            if (properties.createdAt) { this.createdAt = properties.createdAt }
            if (properties.updatedAt) { this.updatedAt = properties.updatedAt }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public id?: number|null = 0
    @protobuf.Field.d(2, SensitiveType, "optional", SensitiveType.SensitiveTypeUnknown)
    public sensitiveType?: SensitiveType|null = SensitiveType.SensitiveTypeUnknown
    @protobuf.Field.d(3, MatchMode, "optional", MatchMode.MatchModeUnknown)
    public matchMode?: MatchMode|null = MatchMode.MatchModeUnknown
    @protobuf.Field.d(4, "string", "optional", )
    public content?: string|null = ""
    @protobuf.Field.d(13, "int64", "optional", 0)
    public version?: number|null = 0
    @protobuf.Field.d(14, "int64", "optional", 0)
    public createdAt?: number|null = 0
    @protobuf.Field.d(15, "int64", "optional", 0)
    public updatedAt?: number|null = 0
}
export interface ISyncPackage {
    syncPackageType?: SyncPackageType|null
    entries?: IEntry[]
    syncID?: number|null
}
@protobuf.Type.d("mp_audit_detect_v1_SyncPackage")
export class SyncPackage extends protobuf.Message<ISyncPackage> {
    constructor(properties: Properties<ISyncPackage>) {
        super(properties);
        if (properties) {
            if (properties.syncPackageType) { this.syncPackageType = properties.syncPackageType }
            if (properties.entries) { this.entries = []; properties.entries.forEach((value, index)=>{this.entries[index] = Entry.create(properties.entries[index]) as any})}
            if (properties.syncID) { this.syncID = properties.syncID }
        }
	}
    @protobuf.Field.d(1, SyncPackageType, "optional", SyncPackageType.SyncPackageTypeUnknown)
    public syncPackageType?: SyncPackageType|null = SyncPackageType.SyncPackageTypeUnknown
    @protobuf.Field.d(2, "mp_audit_detect_v1_Entry", "repeated")
    public entries?: Entry[] = []
    @protobuf.Field.d(3, "int64", "optional", 0)
    public syncID?: number|null = 0
}
export interface ISyncEntriesReq {
    version?: number|null
    addSyncID?: number|null
    deleteSyncID?: number|null
    packageSize?: number|null
    sensitiveTypes?: SensitiveType[]
    flag?: string|null
}
@protobuf.Type.d("mp_audit_detect_v1_SyncEntriesReq")
export class SyncEntriesReq extends protobuf.Message<ISyncEntriesReq> {
    constructor(properties: Properties<ISyncEntriesReq>) {
        super(properties);
        if (properties) {
            if (properties.version) { this.version = properties.version }
            if (properties.addSyncID) { this.addSyncID = properties.addSyncID }
            if (properties.deleteSyncID) { this.deleteSyncID = properties.deleteSyncID }
            if (properties.packageSize) { this.packageSize = properties.packageSize }
            if (properties.sensitiveTypes) { this.sensitiveTypes = []; properties.sensitiveTypes.forEach((value, index)=>{this.sensitiveTypes[index] = properties.sensitiveTypes[index]})}
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
    @protobuf.Field.d(5, SensitiveType, "repeated", SensitiveType.SensitiveTypeUnknown)
    public sensitiveTypes?: SensitiveType[] = []
    @protobuf.Field.d(6, "string", "optional", )
    public flag?: string|null = ""
}
export interface ISyncEntriesResp {
    version?: number|null
    syncType?: SyncType|null
    syncPackages?: ISyncPackage[]
    flag?: string|null
}
@protobuf.Type.d("mp_audit_detect_v1_SyncEntriesResp")
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
    @protobuf.Field.d(3, "mp_audit_detect_v1_SyncPackage", "repeated")
    public syncPackages?: SyncPackage[] = []
    @protobuf.Field.d(6, "string", "optional", )
    public flag?: string|null = ""
}
export interface INewEntry {
    sensitiveType?: SensitiveType|null
    matchMode?: MatchMode|null
    content?: string|null
}
@protobuf.Type.d("mp_audit_detect_v1_NewEntry")
export class NewEntry extends protobuf.Message<INewEntry> {
    constructor(properties: Properties<INewEntry>) {
        super(properties);
        if (properties) {
            if (properties.sensitiveType) { this.sensitiveType = properties.sensitiveType }
            if (properties.matchMode) { this.matchMode = properties.matchMode }
            if (properties.content) { this.content = properties.content }
        }
	}
    @protobuf.Field.d(2, SensitiveType, "optional", SensitiveType.SensitiveTypeUnknown)
    public sensitiveType?: SensitiveType|null = SensitiveType.SensitiveTypeUnknown
    @protobuf.Field.d(3, MatchMode, "optional", MatchMode.MatchModeUnknown)
    public matchMode?: MatchMode|null = MatchMode.MatchModeUnknown
    @protobuf.Field.d(4, "string", "optional", )
    public content?: string|null = ""
}
export interface IBatchInsertEntriesReq {
    entries?: INewEntry[]
    operator?: string|null
}
@protobuf.Type.d("mp_audit_detect_v1_BatchInsertEntriesReq")
export class BatchInsertEntriesReq extends protobuf.Message<IBatchInsertEntriesReq> {
    constructor(properties: Properties<IBatchInsertEntriesReq>) {
        super(properties);
        if (properties) {
            if (properties.entries) { this.entries = []; properties.entries.forEach((value, index)=>{this.entries[index] = NewEntry.create(properties.entries[index]) as any})}
            if (properties.operator) { this.operator = properties.operator }
        }
	}
    @protobuf.Field.d(1, "mp_audit_detect_v1_NewEntry", "repeated")
    public entries?: NewEntry[] = []
    @protobuf.Field.d(2, "string", "optional", )
    public operator?: string|null = ""
}
export interface IBatchInsertEntriesResp {
    total?: number|null
    successCount?: number|null
}
@protobuf.Type.d("mp_audit_detect_v1_BatchInsertEntriesResp")
export class BatchInsertEntriesResp extends protobuf.Message<IBatchInsertEntriesResp> {
    constructor(properties: Properties<IBatchInsertEntriesResp>) {
        super(properties);
        if (properties) {
            if (properties.total) { this.total = properties.total }
            if (properties.successCount) { this.successCount = properties.successCount }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public total?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public successCount?: number|null = 0
}
export interface IBatchDeleteEntriesReq {
    entryIDs?: number[]
    operator?: string|null
}
@protobuf.Type.d("mp_audit_detect_v1_BatchDeleteEntriesReq")
export class BatchDeleteEntriesReq extends protobuf.Message<IBatchDeleteEntriesReq> {
    constructor(properties: Properties<IBatchDeleteEntriesReq>) {
        super(properties);
        if (properties) {
            if (properties.entryIDs) { this.entryIDs = []; properties.entryIDs.forEach((value, index)=>{this.entryIDs[index] = properties.entryIDs[index]})}
            if (properties.operator) { this.operator = properties.operator }
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public entryIDs?: number[] = []
    @protobuf.Field.d(2, "string", "optional", )
    public operator?: string|null = ""
}
export interface IBatchDeleteEntriesResp {
}
@protobuf.Type.d("mp_audit_detect_v1_BatchDeleteEntriesResp")
export class BatchDeleteEntriesResp extends protobuf.Message<IBatchDeleteEntriesResp> {
    constructor(properties: Properties<IBatchDeleteEntriesResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IUpdateEntryReq {
    entry?: IEntry
    operator?: string|null
}
@protobuf.Type.d("mp_audit_detect_v1_UpdateEntryReq")
export class UpdateEntryReq extends protobuf.Message<IUpdateEntryReq> {
    constructor(properties: Properties<IUpdateEntryReq>) {
        super(properties);
        if (properties) {
            if (properties.entry) { this.entry = Entry.create(properties.entry) as any }
            if (properties.operator) { this.operator = properties.operator }
        }
	}
    @protobuf.Field.d(1, "mp_audit_detect_v1_Entry", "optional")
    public entry?: Entry|null
    @protobuf.Field.d(2, "string", "optional", )
    public operator?: string|null = ""
}
export interface IUpdateEntryResp {
}
@protobuf.Type.d("mp_audit_detect_v1_UpdateEntryResp")
export class UpdateEntryResp extends protobuf.Message<IUpdateEntryResp> {
    constructor(properties: Properties<IUpdateEntryResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IListEntriesReq {
    page?: number|null
    pageSize?: number|null
    sensitiveType?: SensitiveType|null
    matchMode?: MatchMode|null
    content?: string|null
}
@protobuf.Type.d("mp_audit_detect_v1_ListEntriesReq")
export class ListEntriesReq extends protobuf.Message<IListEntriesReq> {
    constructor(properties: Properties<IListEntriesReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.sensitiveType) { this.sensitiveType = properties.sensitiveType }
            if (properties.matchMode) { this.matchMode = properties.matchMode }
            if (properties.content) { this.content = properties.content }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(3, SensitiveType, "optional", SensitiveType.SensitiveTypeUnknown)
    public sensitiveType?: SensitiveType|null = SensitiveType.SensitiveTypeUnknown
    @protobuf.Field.d(4, MatchMode, "optional", MatchMode.MatchModeUnknown)
    public matchMode?: MatchMode|null = MatchMode.MatchModeUnknown
    @protobuf.Field.d(5, "string", "optional", )
    public content?: string|null = ""
}
export interface IListEntriesResp {
    total?: number|null
    entries?: IEntry[]
}
@protobuf.Type.d("mp_audit_detect_v1_ListEntriesResp")
export class ListEntriesResp extends protobuf.Message<IListEntriesResp> {
    constructor(properties: Properties<IListEntriesResp>) {
        super(properties);
        if (properties) {
            if (properties.total) { this.total = properties.total }
            if (properties.entries) { this.entries = []; properties.entries.forEach((value, index)=>{this.entries[index] = Entry.create(properties.entries[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public total?: number|null = 0
    @protobuf.Field.d(2, "mp_audit_detect_v1_Entry", "repeated")
    public entries?: Entry[] = []
}
export interface IEntryUpdateLog {
    id?: string|null
    entryOperateType?: EntryOperateType|null
    effectiveEntries?: IEntry[]
    failEntries?: IEntry[]
    version?: number|null
    operator?: string|null
    createdAt?: number|null
}
@protobuf.Type.d("mp_audit_detect_v1_EntryUpdateLog")
export class EntryUpdateLog extends protobuf.Message<IEntryUpdateLog> {
    constructor(properties: Properties<IEntryUpdateLog>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.entryOperateType) { this.entryOperateType = properties.entryOperateType }
            if (properties.effectiveEntries) { this.effectiveEntries = []; properties.effectiveEntries.forEach((value, index)=>{this.effectiveEntries[index] = Entry.create(properties.effectiveEntries[index]) as any})}
            if (properties.failEntries) { this.failEntries = []; properties.failEntries.forEach((value, index)=>{this.failEntries[index] = Entry.create(properties.failEntries[index]) as any})}
            if (properties.version) { this.version = properties.version }
            if (properties.operator) { this.operator = properties.operator }
            if (properties.createdAt) { this.createdAt = properties.createdAt }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public id?: string|null = ""
    @protobuf.Field.d(2, EntryOperateType, "optional", EntryOperateType.EntryOperateTypeInsert)
    public entryOperateType?: EntryOperateType|null = EntryOperateType.EntryOperateTypeInsert
    @protobuf.Field.d(3, "mp_audit_detect_v1_Entry", "repeated")
    public effectiveEntries?: Entry[] = []
    @protobuf.Field.d(4, "mp_audit_detect_v1_Entry", "repeated")
    public failEntries?: Entry[] = []
    @protobuf.Field.d(5, "int64", "optional", 0)
    public version?: number|null = 0
    @protobuf.Field.d(6, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(15, "int64", "optional", 0)
    public createdAt?: number|null = 0
}
export interface IListEntryUpdateLogsReq {
    page?: number|null
    pageSize?: number|null
}
@protobuf.Type.d("mp_audit_detect_v1_ListEntryUpdateLogsReq")
export class ListEntryUpdateLogsReq extends protobuf.Message<IListEntryUpdateLogsReq> {
    constructor(properties: Properties<IListEntryUpdateLogsReq>) {
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
export interface IListEntryUpdateLogsResp {
    entryUpdateLogs?: IEntryUpdateLog[]
}
@protobuf.Type.d("mp_audit_detect_v1_ListEntryUpdateLogsResp")
export class ListEntryUpdateLogsResp extends protobuf.Message<IListEntryUpdateLogsResp> {
    constructor(properties: Properties<IListEntryUpdateLogsResp>) {
        super(properties);
        if (properties) {
            if (properties.entryUpdateLogs) { this.entryUpdateLogs = []; properties.entryUpdateLogs.forEach((value, index)=>{this.entryUpdateLogs[index] = EntryUpdateLog.create(properties.entryUpdateLogs[index]) as any})}
        }
	}
    @protobuf.Field.d(2, "mp_audit_detect_v1_EntryUpdateLog", "repeated")
    public entryUpdateLogs?: EntryUpdateLog[] = []
}
export interface ITextDetectResult {
    start?: number|null
    iend?: number|null
    entry?: IEntry
}
@protobuf.Type.d("mp_audit_detect_v1_TextDetectResult")
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
    @protobuf.Field.d(3, "mp_audit_detect_v1_Entry", "optional")
    public entry?: Entry|null
}
export interface ITextDetectionTask {
    content?: string|null
    results?: ITextDetectResult[]
    entryVersion?: number|null
}
@protobuf.Type.d("mp_audit_detect_v1_TextDetectionTask")
export class TextDetectionTask extends protobuf.Message<ITextDetectionTask> {
    constructor(properties: Properties<ITextDetectionTask>) {
        super(properties);
        if (properties) {
            if (properties.content) { this.content = properties.content }
            if (properties.results) { this.results = []; properties.results.forEach((value, index)=>{this.results[index] = TextDetectResult.create(properties.results[index]) as any})}
            if (properties.entryVersion) { this.entryVersion = properties.entryVersion }
        }
	}
    @protobuf.Field.d(6, "string", "optional", )
    public content?: string|null = ""
    @protobuf.Field.d(7, "mp_audit_detect_v1_TextDetectResult", "repeated")
    public results?: TextDetectResult[] = []
    @protobuf.Field.d(9, "int64", "optional", 0)
    public entryVersion?: number|null = 0
}
export interface IOSSDetectionTask {
    objectType?: OSSObjectType|null
    objects?: IOSSObject[]
    results?: IOSSDetectResult[]
}
@protobuf.Type.d("mp_audit_detect_v1_OSSDetectionTask")
export class OSSDetectionTask extends protobuf.Message<IOSSDetectionTask> {
    constructor(properties: Properties<IOSSDetectionTask>) {
        super(properties);
        if (properties) {
            if (properties.objectType) { this.objectType = properties.objectType }
            if (properties.objects) { this.objects = []; properties.objects.forEach((value, index)=>{this.objects[index] = OSSObject.create(properties.objects[index]) as any})}
            if (properties.results) { this.results = []; properties.results.forEach((value, index)=>{this.results[index] = OSSDetectResult.create(properties.results[index]) as any})}
        }
	}
    @protobuf.Field.d(1, OSSObjectType, "optional", OSSObjectType.OSSObjectTypeUnknown)
    public objectType?: OSSObjectType|null = OSSObjectType.OSSObjectTypeUnknown
    @protobuf.Field.d(2, "mp_audit_detect_v1_OSSObject", "repeated")
    public objects?: OSSObject[] = []
    @protobuf.Field.d(3, "mp_audit_detect_v1_OSSDetectResult", "repeated")
    public results?: OSSDetectResult[] = []
}
export interface IDetectionTaskDesc {
    text?: ITextDetectionTask
    oss?: IOSSDetectionTask
}
@protobuf.Type.d("mp_audit_detect_v1_DetectionTaskDesc")
export class DetectionTaskDesc extends protobuf.Message<IDetectionTaskDesc> {
    constructor(properties: Properties<IDetectionTaskDesc>) {
        super(properties);
        if (properties) {
            if (properties.text) { this.text = TextDetectionTask.create(properties.text) as any }
            if (properties.oss) { this.oss = OSSDetectionTask.create(properties.oss) as any }
        }
	}
    @protobuf.Field.d(2, "mp_audit_detect_v1_TextDetectionTask", "optional")
    public text?: TextDetectionTask|null
    @protobuf.Field.d(3, "mp_audit_detect_v1_OSSDetectionTask", "optional")
    public oss?: OSSDetectionTask|null
}
export interface IOSSObject {
    dataID?: string|null
    objectKey?: string|null
    url?: string|null
}
@protobuf.Type.d("mp_audit_detect_v1_OSSObject")
export class OSSObject extends protobuf.Message<IOSSObject> {
    constructor(properties: Properties<IOSSObject>) {
        super(properties);
        if (properties) {
            if (properties.dataID) { this.dataID = properties.dataID }
            if (properties.objectKey) { this.objectKey = properties.objectKey }
            if (properties.url) { this.url = properties.url }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public dataID?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public objectKey?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public url?: string|null = ""
}
export interface IOSSDetectResult {
    object?: IOSSObject
    result?: DetectResultType|null
    imageScore?: number|null
}
@protobuf.Type.d("mp_audit_detect_v1_OSSDetectResult")
export class OSSDetectResult extends protobuf.Message<IOSSDetectResult> {
    constructor(properties: Properties<IOSSDetectResult>) {
        super(properties);
        if (properties) {
            if (properties.object) { this.object = OSSObject.create(properties.object) as any }
            if (properties.result) { this.result = properties.result }
            if (properties.imageScore) { this.imageScore = properties.imageScore }
        }
	}
    @protobuf.Field.d(1, "mp_audit_detect_v1_OSSObject", "optional")
    public object?: OSSObject|null
    @protobuf.Field.d(2, DetectResultType, "optional", DetectResultType.DetectResultTypeUnknown)
    public result?: DetectResultType|null = DetectResultType.DetectResultTypeUnknown
    @protobuf.Field.d(3, "int32", "optional", 0)
    public imageScore?: number|null = 0
}
export interface IDetectionTask {
    taskID?: string|null
    status?: DetectionTaskStatus|null
    appID?: number|null
    userID?: number|null
    scene?: string|null
    taskType?: DetectionTaskType|null
    desc?: IDetectionTaskDesc
    sourceService?: string|null
    callbackURL?: string|null
    extra?: string|null
    createdAt?: number|null
    detectedAt?: number|null
}
@protobuf.Type.d("mp_audit_detect_v1_DetectionTask")
export class DetectionTask extends protobuf.Message<IDetectionTask> {
    constructor(properties: Properties<IDetectionTask>) {
        super(properties);
        if (properties) {
            if (properties.taskID) { this.taskID = properties.taskID }
            if (properties.status) { this.status = properties.status }
            if (properties.appID) { this.appID = properties.appID }
            if (properties.userID) { this.userID = properties.userID }
            if (properties.scene) { this.scene = properties.scene }
            if (properties.taskType) { this.taskType = properties.taskType }
            if (properties.desc) { this.desc = DetectionTaskDesc.create(properties.desc) as any }
            if (properties.sourceService) { this.sourceService = properties.sourceService }
            if (properties.callbackURL) { this.callbackURL = properties.callbackURL }
            if (properties.extra) { this.extra = properties.extra }
            if (properties.createdAt) { this.createdAt = properties.createdAt }
            if (properties.detectedAt) { this.detectedAt = properties.detectedAt }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public taskID?: string|null = ""
    @protobuf.Field.d(2, DetectionTaskStatus, "optional", DetectionTaskStatus.DetectionTaskStatusUnknown)
    public status?: DetectionTaskStatus|null = DetectionTaskStatus.DetectionTaskStatusUnknown
    @protobuf.Field.d(3, "int32", "optional", 0)
    public appID?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public userID?: number|null = 0
    @protobuf.Field.d(5, "string", "optional", )
    public scene?: string|null = ""
    @protobuf.Field.d(6, DetectionTaskType, "optional", DetectionTaskType.DetectionTaskTypeUnknown)
    public taskType?: DetectionTaskType|null = DetectionTaskType.DetectionTaskTypeUnknown
    @protobuf.Field.d(7, "mp_audit_detect_v1_DetectionTaskDesc", "optional")
    public desc?: DetectionTaskDesc|null
    @protobuf.Field.d(9, "string", "optional", )
    public sourceService?: string|null = ""
    @protobuf.Field.d(10, "string", "optional", )
    public callbackURL?: string|null = ""
    @protobuf.Field.d(11, "string", "optional", )
    public extra?: string|null = ""
    @protobuf.Field.d(13, "int64", "optional", 0)
    public createdAt?: number|null = 0
    @protobuf.Field.d(14, "int64", "optional", 0)
    public detectedAt?: number|null = 0
}
export interface ITextDetectParams {
    content?: string|null
}
@protobuf.Type.d("mp_audit_detect_v1_TextDetectParams")
export class TextDetectParams extends protobuf.Message<ITextDetectParams> {
    constructor(properties: Properties<ITextDetectParams>) {
        super(properties);
        if (properties) {
            if (properties.content) { this.content = properties.content }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public content?: string|null = ""
}
export interface IOSSDetectParams {
    objectType?: OSSObjectType|null
    objects?: IOSSObject[]
}
@protobuf.Type.d("mp_audit_detect_v1_OSSDetectParams")
export class OSSDetectParams extends protobuf.Message<IOSSDetectParams> {
    constructor(properties: Properties<IOSSDetectParams>) {
        super(properties);
        if (properties) {
            if (properties.objectType) { this.objectType = properties.objectType }
            if (properties.objects) { this.objects = []; properties.objects.forEach((value, index)=>{this.objects[index] = OSSObject.create(properties.objects[index]) as any})}
        }
	}
    @protobuf.Field.d(1, OSSObjectType, "optional", OSSObjectType.OSSObjectTypeUnknown)
    public objectType?: OSSObjectType|null = OSSObjectType.OSSObjectTypeUnknown
    @protobuf.Field.d(2, "mp_audit_detect_v1_OSSObject", "repeated")
    public objects?: OSSObject[] = []
}
export interface IDetectTaskParams {
    text?: ITextDetectParams
    oss?: IOSSDetectParams
}
@protobuf.Type.d("mp_audit_detect_v1_DetectTaskParams")
export class DetectTaskParams extends protobuf.Message<IDetectTaskParams> {
    constructor(properties: Properties<IDetectTaskParams>) {
        super(properties);
        if (properties) {
            if (properties.text) { this.text = TextDetectParams.create(properties.text) as any }
            if (properties.oss) { this.oss = OSSDetectParams.create(properties.oss) as any }
        }
	}
    @protobuf.Field.d(2, "mp_audit_detect_v1_TextDetectParams", "optional")
    public text?: TextDetectParams|null
    @protobuf.Field.d(3, "mp_audit_detect_v1_OSSDetectParams", "optional")
    public oss?: OSSDetectParams|null
}
export interface ISubmitDetectionTaskReq {
    appID?: number|null
    userID?: number|null
    scene?: string|null
    taskType?: DetectionTaskType|null
    params?: IDetectTaskParams
    callbackURL?: string|null
    extra?: string|null
}
@protobuf.Type.d("mp_audit_detect_v1_SubmitDetectionTaskReq")
export class SubmitDetectionTaskReq extends protobuf.Message<ISubmitDetectionTaskReq> {
    constructor(properties: Properties<ISubmitDetectionTaskReq>) {
        super(properties);
        if (properties) {
            if (properties.appID) { this.appID = properties.appID }
            if (properties.userID) { this.userID = properties.userID }
            if (properties.scene) { this.scene = properties.scene }
            if (properties.taskType) { this.taskType = properties.taskType }
            if (properties.params) { this.params = DetectTaskParams.create(properties.params) as any }
            if (properties.callbackURL) { this.callbackURL = properties.callbackURL }
            if (properties.extra) { this.extra = properties.extra }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public appID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public userID?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public scene?: string|null = ""
    @protobuf.Field.d(4, DetectionTaskType, "optional", DetectionTaskType.DetectionTaskTypeUnknown)
    public taskType?: DetectionTaskType|null = DetectionTaskType.DetectionTaskTypeUnknown
    @protobuf.Field.d(5, "mp_audit_detect_v1_DetectTaskParams", "optional")
    public params?: DetectTaskParams|null
    @protobuf.Field.d(14, "string", "optional", )
    public callbackURL?: string|null = ""
    @protobuf.Field.d(15, "string", "optional", )
    public extra?: string|null = ""
}
export interface ISubmitDetectionTaskResp {
    taskID?: string|null
}
@protobuf.Type.d("mp_audit_detect_v1_SubmitDetectionTaskResp")
export class SubmitDetectionTaskResp extends protobuf.Message<ISubmitDetectionTaskResp> {
    constructor(properties: Properties<ISubmitDetectionTaskResp>) {
        super(properties);
        if (properties) {
            if (properties.taskID) { this.taskID = properties.taskID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public taskID?: string|null = ""
}
export interface IListDetectionTaskReq {
    page?: number|null
    pageSize?: number|null
    taskStatus?: DetectionTaskStatus|null
    taskType?: DetectionTaskType|null
    scene?: string|null
    appID?: number|null
    userID?: number|null
}
@protobuf.Type.d("mp_audit_detect_v1_ListDetectionTaskReq")
export class ListDetectionTaskReq extends protobuf.Message<IListDetectionTaskReq> {
    constructor(properties: Properties<IListDetectionTaskReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.taskStatus) { this.taskStatus = properties.taskStatus }
            if (properties.taskType) { this.taskType = properties.taskType }
            if (properties.scene) { this.scene = properties.scene }
            if (properties.appID) { this.appID = properties.appID }
            if (properties.userID) { this.userID = properties.userID }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(3, DetectionTaskStatus, "optional", DetectionTaskStatus.DetectionTaskStatusUnknown)
    public taskStatus?: DetectionTaskStatus|null = DetectionTaskStatus.DetectionTaskStatusUnknown
    @protobuf.Field.d(4, DetectionTaskType, "optional", DetectionTaskType.DetectionTaskTypeUnknown)
    public taskType?: DetectionTaskType|null = DetectionTaskType.DetectionTaskTypeUnknown
    @protobuf.Field.d(5, "string", "optional", )
    public scene?: string|null = ""
    @protobuf.Field.d(6, "int32", "optional", 0)
    public appID?: number|null = 0
    @protobuf.Field.d(7, "int64", "optional", 0)
    public userID?: number|null = 0
}
export interface IListDetectionTaskResp {
    total?: number|null
    tasks?: IDetectionTask[]
}
@protobuf.Type.d("mp_audit_detect_v1_ListDetectionTaskResp")
export class ListDetectionTaskResp extends protobuf.Message<IListDetectionTaskResp> {
    constructor(properties: Properties<IListDetectionTaskResp>) {
        super(properties);
        if (properties) {
            if (properties.total) { this.total = properties.total }
            if (properties.tasks) { this.tasks = []; properties.tasks.forEach((value, index)=>{this.tasks[index] = DetectionTask.create(properties.tasks[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public total?: number|null = 0
    @protobuf.Field.d(2, "mp_audit_detect_v1_DetectionTask", "repeated")
    public tasks?: DetectionTask[] = []
}
export interface IDetectContainsSensitiveReq {
    appID?: number|null
    userID?: number|null
    content?: string|null
    scene?: string|null
    extra?: string|null
}
@protobuf.Type.d("mp_audit_detect_v1_DetectContainsSensitiveReq")
export class DetectContainsSensitiveReq extends protobuf.Message<IDetectContainsSensitiveReq> {
    constructor(properties: Properties<IDetectContainsSensitiveReq>) {
        super(properties);
        if (properties) {
            if (properties.appID) { this.appID = properties.appID }
            if (properties.userID) { this.userID = properties.userID }
            if (properties.content) { this.content = properties.content }
            if (properties.scene) { this.scene = properties.scene }
            if (properties.extra) { this.extra = properties.extra }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public appID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public userID?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public content?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public scene?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public extra?: string|null = ""
}
export interface IDetectContainsSensitiveResp {
    containsSensitive?: boolean|null
}
@protobuf.Type.d("mp_audit_detect_v1_DetectContainsSensitiveResp")
export class DetectContainsSensitiveResp extends protobuf.Message<IDetectContainsSensitiveResp> {
    constructor(properties: Properties<IDetectContainsSensitiveResp>) {
        super(properties);
        if (properties) {
            if (properties.containsSensitive) { this.containsSensitive = properties.containsSensitive }
        }
	}
    @protobuf.Field.d(1, "bool", "optional", false)
    public containsSensitive?: boolean|null = false
}
export interface IDetectAndFindSensitiveEntriesReq {
    appID?: number|null
    userID?: number|null
    content?: string|null
    scene?: string|null
    extra?: string|null
    returnReplacedText?: boolean|null
    replacement?: string|null
}
@protobuf.Type.d("mp_audit_detect_v1_DetectAndFindSensitiveEntriesReq")
export class DetectAndFindSensitiveEntriesReq extends protobuf.Message<IDetectAndFindSensitiveEntriesReq> {
    constructor(properties: Properties<IDetectAndFindSensitiveEntriesReq>) {
        super(properties);
        if (properties) {
            if (properties.appID) { this.appID = properties.appID }
            if (properties.userID) { this.userID = properties.userID }
            if (properties.content) { this.content = properties.content }
            if (properties.scene) { this.scene = properties.scene }
            if (properties.extra) { this.extra = properties.extra }
            if (properties.returnReplacedText) { this.returnReplacedText = properties.returnReplacedText }
            if (properties.replacement) { this.replacement = properties.replacement }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public appID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public userID?: number|null = 0
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
export interface IDetectAndFindSensitiveEntriesResp {
    results?: ITextDetectResult[]
    replacedText?: string|null
}
@protobuf.Type.d("mp_audit_detect_v1_DetectAndFindSensitiveEntriesResp")
export class DetectAndFindSensitiveEntriesResp extends protobuf.Message<IDetectAndFindSensitiveEntriesResp> {
    constructor(properties: Properties<IDetectAndFindSensitiveEntriesResp>) {
        super(properties);
        if (properties) {
            if (properties.results) { this.results = []; properties.results.forEach((value, index)=>{this.results[index] = TextDetectResult.create(properties.results[index]) as any})}
            if (properties.replacedText) { this.replacedText = properties.replacedText }
        }
	}
    @protobuf.Field.d(2, "mp_audit_detect_v1_TextDetectResult", "repeated")
    public results?: TextDetectResult[] = []
    @protobuf.Field.d(3, "string", "optional", )
    public replacedText?: string|null = ""
}
export interface ITestDetectContainsSensitiveReq {
    content?: string|null
}
@protobuf.Type.d("mp_audit_detect_v1_TestDetectContainsSensitiveReq")
export class TestDetectContainsSensitiveReq extends protobuf.Message<ITestDetectContainsSensitiveReq> {
    constructor(properties: Properties<ITestDetectContainsSensitiveReq>) {
        super(properties);
        if (properties) {
            if (properties.content) { this.content = properties.content }
        }
	}
    @protobuf.Field.d(3, "string", "optional", )
    public content?: string|null = ""
}
export interface ITestDetectContainsSensitiveResp {
    results?: ITextDetectResult[]
}
@protobuf.Type.d("mp_audit_detect_v1_TestDetectContainsSensitiveResp")
export class TestDetectContainsSensitiveResp extends protobuf.Message<ITestDetectContainsSensitiveResp> {
    constructor(properties: Properties<ITestDetectContainsSensitiveResp>) {
        super(properties);
        if (properties) {
            if (properties.results) { this.results = []; properties.results.forEach((value, index)=>{this.results[index] = TextDetectResult.create(properties.results[index]) as any})}
        }
	}
    @protobuf.Field.d(2, "mp_audit_detect_v1_TextDetectResult", "repeated")
    public results?: TextDetectResult[] = []
}
export interface IDetectOSSImageResourceReq {
    appID?: number|null
    userID?: number|null
    objects?: IOSSObject[]
    scene?: string|null
    extra?: string|null
}
@protobuf.Type.d("mp_audit_detect_v1_DetectOSSImageResourceReq")
export class DetectOSSImageResourceReq extends protobuf.Message<IDetectOSSImageResourceReq> {
    constructor(properties: Properties<IDetectOSSImageResourceReq>) {
        super(properties);
        if (properties) {
            if (properties.appID) { this.appID = properties.appID }
            if (properties.userID) { this.userID = properties.userID }
            if (properties.objects) { this.objects = []; properties.objects.forEach((value, index)=>{this.objects[index] = OSSObject.create(properties.objects[index]) as any})}
            if (properties.scene) { this.scene = properties.scene }
            if (properties.extra) { this.extra = properties.extra }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public appID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public userID?: number|null = 0
    @protobuf.Field.d(3, "mp_audit_detect_v1_OSSObject", "repeated")
    public objects?: OSSObject[] = []
    @protobuf.Field.d(4, "string", "optional", )
    public scene?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public extra?: string|null = ""
}
export interface IDetectOSSImageResourceResp {
    results?: IOSSDetectResult[]
}
@protobuf.Type.d("mp_audit_detect_v1_DetectOSSImageResourceResp")
export class DetectOSSImageResourceResp extends protobuf.Message<IDetectOSSImageResourceResp> {
    constructor(properties: Properties<IDetectOSSImageResourceResp>) {
        super(properties);
        if (properties) {
            if (properties.results) { this.results = []; properties.results.forEach((value, index)=>{this.results[index] = OSSDetectResult.create(properties.results[index]) as any})}
        }
	}
    @protobuf.Field.d(3, "mp_audit_detect_v1_OSSDetectResult", "repeated")
    public results?: OSSDetectResult[] = []
}
export interface IResourceObject {
    type?: ResourceObjectType|null
    ossObject?: IOSSObject
}
@protobuf.Type.d("mp_audit_detect_v1_ResourceObject")
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
    @protobuf.Field.d(2, "mp_audit_detect_v1_OSSObject", "optional")
    public ossObject?: OSSObject|null
}
export interface IResourceBlacklistSyncPackage {
    syncPackageType?: SyncPackageType|null
    objects?: IResourceObject[]
    syncID?: number|null
}
@protobuf.Type.d("mp_audit_detect_v1_ResourceBlacklistSyncPackage")
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
    @protobuf.Field.d(2, "mp_audit_detect_v1_ResourceObject", "repeated")
    public objects?: ResourceObject[] = []
    @protobuf.Field.d(3, "int64", "optional", 0)
    public syncID?: number|null = 0
}
export interface ISyncResourceBlacklistReq {
    appID?: number|null
    version?: number|null
    addSyncID?: number|null
    packageSize?: number|null
}
@protobuf.Type.d("mp_audit_detect_v1_SyncResourceBlacklistReq")
export class SyncResourceBlacklistReq extends protobuf.Message<ISyncResourceBlacklistReq> {
    constructor(properties: Properties<ISyncResourceBlacklistReq>) {
        super(properties);
        if (properties) {
            if (properties.appID) { this.appID = properties.appID }
            if (properties.version) { this.version = properties.version }
            if (properties.addSyncID) { this.addSyncID = properties.addSyncID }
            if (properties.packageSize) { this.packageSize = properties.packageSize }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public appID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public version?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public addSyncID?: number|null = 0
    @protobuf.Field.d(5, "int32", "optional", 0)
    public packageSize?: number|null = 0
}
export interface ISyncResourceBlacklistResp {
    version?: number|null
    syncType?: SyncType|null
    syncPackages?: IResourceBlacklistSyncPackage[]
}
@protobuf.Type.d("mp_audit_detect_v1_SyncResourceBlacklistResp")
export class SyncResourceBlacklistResp extends protobuf.Message<ISyncResourceBlacklistResp> {
    constructor(properties: Properties<ISyncResourceBlacklistResp>) {
        super(properties);
        if (properties) {
            if (properties.version) { this.version = properties.version }
            if (properties.syncType) { this.syncType = properties.syncType }
            if (properties.syncPackages) { this.syncPackages = []; properties.syncPackages.forEach((value, index)=>{this.syncPackages[index] = ResourceBlacklistSyncPackage.create(properties.syncPackages[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public version?: number|null = 0
    @protobuf.Field.d(2, SyncType, "optional", SyncType.SyncTypeNone)
    public syncType?: SyncType|null = SyncType.SyncTypeNone
    @protobuf.Field.d(3, "mp_audit_detect_v1_ResourceBlacklistSyncPackage", "repeated")
    public syncPackages?: ResourceBlacklistSyncPackage[] = []
}
export interface IBatchInsertResourceBlacklistReq {
    appID?: number|null
    operator?: string|null
    objects?: IResourceObject[]
}
@protobuf.Type.d("mp_audit_detect_v1_BatchInsertResourceBlacklistReq")
export class BatchInsertResourceBlacklistReq extends protobuf.Message<IBatchInsertResourceBlacklistReq> {
    constructor(properties: Properties<IBatchInsertResourceBlacklistReq>) {
        super(properties);
        if (properties) {
            if (properties.appID) { this.appID = properties.appID }
            if (properties.operator) { this.operator = properties.operator }
            if (properties.objects) { this.objects = []; properties.objects.forEach((value, index)=>{this.objects[index] = ResourceObject.create(properties.objects[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public appID?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(3, "mp_audit_detect_v1_ResourceObject", "repeated")
    public objects?: ResourceObject[] = []
}
export interface IBatchInsertResourceBlacklistResp {
}
@protobuf.Type.d("mp_audit_detect_v1_BatchInsertResourceBlacklistResp")
export class BatchInsertResourceBlacklistResp extends protobuf.Message<IBatchInsertResourceBlacklistResp> {
    constructor(properties: Properties<IBatchInsertResourceBlacklistResp>) {
        super(properties);
        if (properties) {
        }
	}
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
    async BatchInsertEntries(req: IBatchInsertEntriesReq, params?: RpcParams) : Promise<{err:number, resp:IBatchInsertEntriesResp}> {
        let data = BatchInsertEntriesReq.create(req)
        this.onBeforeReq("BatchInsertEntries", data, params)
        const buffer = BatchInsertEntriesReq.encode(data).finish()
        let [err, pack] = await this.call("BatchInsertEntries", buffer, params)
        if (err) {
            this.onBeforeResp("BatchInsertEntries", err)
            return {err: err, resp: null}
        } else {
            let resp = BatchInsertEntriesResp.decode(pack) as any
            this.onBeforeResp("BatchInsertEntries", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchDeleteEntries(req: IBatchDeleteEntriesReq, params?: RpcParams) : Promise<{err:number, resp:IBatchDeleteEntriesResp}> {
        let data = BatchDeleteEntriesReq.create(req)
        this.onBeforeReq("BatchDeleteEntries", data, params)
        const buffer = BatchDeleteEntriesReq.encode(data).finish()
        let [err, pack] = await this.call("BatchDeleteEntries", buffer, params)
        if (err) {
            this.onBeforeResp("BatchDeleteEntries", err)
            return {err: err, resp: null}
        } else {
            let resp = BatchDeleteEntriesResp.decode(pack) as any
            this.onBeforeResp("BatchDeleteEntries", err, resp)
            return {err: null, resp: resp}
        }
    }
    async UpdateEntry(req: IUpdateEntryReq, params?: RpcParams) : Promise<{err:number, resp:IUpdateEntryResp}> {
        let data = UpdateEntryReq.create(req)
        this.onBeforeReq("UpdateEntry", data, params)
        const buffer = UpdateEntryReq.encode(data).finish()
        let [err, pack] = await this.call("UpdateEntry", buffer, params)
        if (err) {
            this.onBeforeResp("UpdateEntry", err)
            return {err: err, resp: null}
        } else {
            let resp = UpdateEntryResp.decode(pack) as any
            this.onBeforeResp("UpdateEntry", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListEntries(req: IListEntriesReq, params?: RpcParams) : Promise<{err:number, resp:IListEntriesResp}> {
        let data = ListEntriesReq.create(req)
        this.onBeforeReq("ListEntries", data, params)
        const buffer = ListEntriesReq.encode(data).finish()
        let [err, pack] = await this.call("ListEntries", buffer, params)
        if (err) {
            this.onBeforeResp("ListEntries", err)
            return {err: err, resp: null}
        } else {
            let resp = ListEntriesResp.decode(pack) as any
            this.onBeforeResp("ListEntries", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListEntryUpdateLogs(req: IListEntryUpdateLogsReq, params?: RpcParams) : Promise<{err:number, resp:IListEntryUpdateLogsResp}> {
        let data = ListEntryUpdateLogsReq.create(req)
        this.onBeforeReq("ListEntryUpdateLogs", data, params)
        const buffer = ListEntryUpdateLogsReq.encode(data).finish()
        let [err, pack] = await this.call("ListEntryUpdateLogs", buffer, params)
        if (err) {
            this.onBeforeResp("ListEntryUpdateLogs", err)
            return {err: err, resp: null}
        } else {
            let resp = ListEntryUpdateLogsResp.decode(pack) as any
            this.onBeforeResp("ListEntryUpdateLogs", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SubmitDetectionTask(req: ISubmitDetectionTaskReq, params?: RpcParams) : Promise<{err:number, resp:ISubmitDetectionTaskResp}> {
        let data = SubmitDetectionTaskReq.create(req)
        this.onBeforeReq("SubmitDetectionTask", data, params)
        const buffer = SubmitDetectionTaskReq.encode(data).finish()
        let [err, pack] = await this.call("SubmitDetectionTask", buffer, params)
        if (err) {
            this.onBeforeResp("SubmitDetectionTask", err)
            return {err: err, resp: null}
        } else {
            let resp = SubmitDetectionTaskResp.decode(pack) as any
            this.onBeforeResp("SubmitDetectionTask", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListDetectionTask(req: IListDetectionTaskReq, params?: RpcParams) : Promise<{err:number, resp:IListDetectionTaskResp}> {
        let data = ListDetectionTaskReq.create(req)
        this.onBeforeReq("ListDetectionTask", data, params)
        const buffer = ListDetectionTaskReq.encode(data).finish()
        let [err, pack] = await this.call("ListDetectionTask", buffer, params)
        if (err) {
            this.onBeforeResp("ListDetectionTask", err)
            return {err: err, resp: null}
        } else {
            let resp = ListDetectionTaskResp.decode(pack) as any
            this.onBeforeResp("ListDetectionTask", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DetectContainsSensitive(req: IDetectContainsSensitiveReq, params?: RpcParams) : Promise<{err:number, resp:IDetectContainsSensitiveResp}> {
        let data = DetectContainsSensitiveReq.create(req)
        this.onBeforeReq("DetectContainsSensitive", data, params)
        const buffer = DetectContainsSensitiveReq.encode(data).finish()
        let [err, pack] = await this.call("DetectContainsSensitive", buffer, params)
        if (err) {
            this.onBeforeResp("DetectContainsSensitive", err)
            return {err: err, resp: null}
        } else {
            let resp = DetectContainsSensitiveResp.decode(pack) as any
            this.onBeforeResp("DetectContainsSensitive", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DetectAndFindSensitiveEntries(req: IDetectAndFindSensitiveEntriesReq, params?: RpcParams) : Promise<{err:number, resp:IDetectAndFindSensitiveEntriesResp}> {
        let data = DetectAndFindSensitiveEntriesReq.create(req)
        this.onBeforeReq("DetectAndFindSensitiveEntries", data, params)
        const buffer = DetectAndFindSensitiveEntriesReq.encode(data).finish()
        let [err, pack] = await this.call("DetectAndFindSensitiveEntries", buffer, params)
        if (err) {
            this.onBeforeResp("DetectAndFindSensitiveEntries", err)
            return {err: err, resp: null}
        } else {
            let resp = DetectAndFindSensitiveEntriesResp.decode(pack) as any
            this.onBeforeResp("DetectAndFindSensitiveEntries", err, resp)
            return {err: null, resp: resp}
        }
    }
    async TestDetectContainsSensitive(req: ITestDetectContainsSensitiveReq, params?: RpcParams) : Promise<{err:number, resp:ITestDetectContainsSensitiveResp}> {
        let data = TestDetectContainsSensitiveReq.create(req)
        this.onBeforeReq("TestDetectContainsSensitive", data, params)
        const buffer = TestDetectContainsSensitiveReq.encode(data).finish()
        let [err, pack] = await this.call("TestDetectContainsSensitive", buffer, params)
        if (err) {
            this.onBeforeResp("TestDetectContainsSensitive", err)
            return {err: err, resp: null}
        } else {
            let resp = TestDetectContainsSensitiveResp.decode(pack) as any
            this.onBeforeResp("TestDetectContainsSensitive", err, resp)
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
    async BatchInsertResourceBlacklist(req: IBatchInsertResourceBlacklistReq, params?: RpcParams) : Promise<{err:number, resp:IBatchInsertResourceBlacklistResp}> {
        let data = BatchInsertResourceBlacklistReq.create(req)
        this.onBeforeReq("BatchInsertResourceBlacklist", data, params)
        const buffer = BatchInsertResourceBlacklistReq.encode(data).finish()
        let [err, pack] = await this.call("BatchInsertResourceBlacklist", buffer, params)
        if (err) {
            this.onBeforeResp("BatchInsertResourceBlacklist", err)
            return {err: err, resp: null}
        } else {
            let resp = BatchInsertResourceBlacklistResp.decode(pack) as any
            this.onBeforeResp("BatchInsertResourceBlacklist", err, resp)
            return {err: null, resp: resp}
        }
    }
}
export const Detect = new $Detect({
    name: "mp.audit.detect.v1",
})
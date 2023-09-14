import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  Void as base_Void,IVoid as base_IVoid ,  } from "idl/base/base"
import {  Asset as tss_common_Asset,IAsset as tss_common_IAsset ,  AssetItem as tss_common_AssetItem,IAssetItem as tss_common_IAssetItem ,  } from "idl/tss/common/common_define"
import {  PreMatchConfig as tss_match_v2_common_PreMatchConfig,IPreMatchConfig as tss_match_v2_common_IPreMatchConfig ,  MatchStatus as tss_match_v2_common_MatchStatus ,  LiveRoomType as tss_match_v2_common_LiveRoomType ,  RefactorVer as tss_match_v2_common_RefactorVer ,  MatchTagType as tss_match_v2_common_MatchTagType ,  } from "idl/tss/match_v2/common/common"
export enum ListGuideType {  
    ListGuideTypeUnknown = 0,  
    ListGuideTypeEntering = 1,  
    ListGuideTypePreView = 2,  
    ListGuideTypeEntered = 3,  
    ListGuideTypeOnLook = 4,
}
export enum EntryFeeFilterType {  
    EntryFeeFilterTypeUnknown = 0,  
    EntryFeeFilterTypeAll = 1,  
    EntryFeeFilterTypeFree = 2,  
    EntryFeeFilterTypeCoin = 3,  
    EntryFeeFilterTypeProp = 4,
}
export interface ICreateMatchReq {
    config?: tss_match_v2_common_IPreMatchConfig
    roomNo?: string|null
    preMatchKey?: string|null
    roomID?: string|null
}
@protobuf.Type.d("tss_match_v2_list_v1_CreateMatchReq")
export class CreateMatchReq extends protobuf.Message<ICreateMatchReq> {
    constructor(properties: Properties<ICreateMatchReq>) {
        super(properties);
        if (properties) {
            if (properties.config) { this.config = tss_match_v2_common_PreMatchConfig.create(properties.config) as any }
            if (properties.roomNo) { this.roomNo = properties.roomNo }
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
            if (properties.roomID) { this.roomID = properties.roomID }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_common_PreMatchConfig", "optional")
    public config?: tss_match_v2_common_PreMatchConfig|null
    @protobuf.Field.d(2, "string", "optional", )
    public roomNo?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public preMatchKey?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public roomID?: string|null = ""
}
export interface IPauseUpdateMatchReq {
    config?: tss_match_v2_common_IPreMatchConfig
    preMatchKey?: string|null
}
@protobuf.Type.d("tss_match_v2_list_v1_PauseUpdateMatchReq")
export class PauseUpdateMatchReq extends protobuf.Message<IPauseUpdateMatchReq> {
    constructor(properties: Properties<IPauseUpdateMatchReq>) {
        super(properties);
        if (properties) {
            if (properties.config) { this.config = tss_match_v2_common_PreMatchConfig.create(properties.config) as any }
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_common_PreMatchConfig", "optional")
    public config?: tss_match_v2_common_PreMatchConfig|null
    @protobuf.Field.d(2, "string", "optional", )
    public preMatchKey?: string|null = ""
}
export interface IRemoveMatchReq {
    preMatchKey?: string|null
}
@protobuf.Type.d("tss_match_v2_list_v1_RemoveMatchReq")
export class RemoveMatchReq extends protobuf.Message<IRemoveMatchReq> {
    constructor(properties: Properties<IRemoveMatchReq>) {
        super(properties);
        if (properties) {
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public preMatchKey?: string|null = ""
}
export interface IListMatchReq {
    bMyFollower?: boolean|null
    bMyFriend?: boolean|null
    uid?: number|null
    page?: number|null
    pageSize?: number|null
}
@protobuf.Type.d("tss_match_v2_list_v1_ListMatchReq")
export class ListMatchReq extends protobuf.Message<IListMatchReq> {
    constructor(properties: Properties<IListMatchReq>) {
        super(properties);
        if (properties) {
            if (properties.bMyFollower) { this.bMyFollower = properties.bMyFollower }
            if (properties.bMyFriend) { this.bMyFriend = properties.bMyFriend }
            if (properties.uid) { this.uid = properties.uid }
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
        }
	}
    @protobuf.Field.d(1, "bool", "optional", false)
    public bMyFollower?: boolean|null = false
    @protobuf.Field.d(2, "bool", "optional", false)
    public bMyFriend?: boolean|null = false
    @protobuf.Field.d(3, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public pageSize?: number|null = 0
}
export interface IMatchItem {
    config?: tss_match_v2_common_IPreMatchConfig
    srvID?: number|null
    roomNo?: string|null
    preMatchKey?: string|null
    roomID?: string|null
    users?: number[]
    popularValue?: number|null
    roomUserNum?: number|null
    onlineAt?: number|null
    status?: tss_match_v2_common_MatchStatus|null
    LuckyBagTag?: boolean|null
    isHostAwards?: boolean|null
    isEntry?: boolean|null
    matchEntryNum?: number|null
    entryUsers?: number[]
    dynamicPool?: tss_common_IAsset
    isDelayEnter?: boolean|null
    lookerNum?: number|null
    isUserRole?: boolean|null
    matchKey?: string|null
    lookerUsers?: number[]
}
@protobuf.Type.d("tss_match_v2_list_v1_MatchItem")
export class MatchItem extends protobuf.Message<IMatchItem> {
    constructor(properties: Properties<IMatchItem>) {
        super(properties);
        if (properties) {
            if (properties.config) { this.config = tss_match_v2_common_PreMatchConfig.create(properties.config) as any }
            if (properties.srvID) { this.srvID = properties.srvID }
            if (properties.roomNo) { this.roomNo = properties.roomNo }
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
            if (properties.roomID) { this.roomID = properties.roomID }
            if (properties.users) { this.users = []; properties.users.forEach((value, index)=>{this.users[index] = properties.users[index]})}
            if (properties.popularValue) { this.popularValue = properties.popularValue }
            if (properties.roomUserNum) { this.roomUserNum = properties.roomUserNum }
            if (properties.onlineAt) { this.onlineAt = properties.onlineAt }
            if (properties.status) { this.status = properties.status }
            if (properties.LuckyBagTag) { this.LuckyBagTag = properties.LuckyBagTag }
            if (properties.isHostAwards) { this.isHostAwards = properties.isHostAwards }
            if (properties.isEntry) { this.isEntry = properties.isEntry }
            if (properties.matchEntryNum) { this.matchEntryNum = properties.matchEntryNum }
            if (properties.entryUsers) { this.entryUsers = []; properties.entryUsers.forEach((value, index)=>{this.entryUsers[index] = properties.entryUsers[index]})}
            if (properties.dynamicPool) { this.dynamicPool = tss_common_Asset.create(properties.dynamicPool) as any }
            if (properties.isDelayEnter) { this.isDelayEnter = properties.isDelayEnter }
            if (properties.lookerNum) { this.lookerNum = properties.lookerNum }
            if (properties.isUserRole) { this.isUserRole = properties.isUserRole }
            if (properties.matchKey) { this.matchKey = properties.matchKey }
            if (properties.lookerUsers) { this.lookerUsers = []; properties.lookerUsers.forEach((value, index)=>{this.lookerUsers[index] = properties.lookerUsers[index]})}
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_common_PreMatchConfig", "optional")
    public config?: tss_match_v2_common_PreMatchConfig|null
    @protobuf.Field.d(2, "int64", "optional", 0)
    public srvID?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public roomNo?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public preMatchKey?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public roomID?: string|null = ""
    @protobuf.Field.d(6, "int64", "repeated", [])
    public users?: number[] = []
    @protobuf.Field.d(7, "int32", "optional", 0)
    public popularValue?: number|null = 0
    @protobuf.Field.d(8, "int32", "optional", 0)
    public roomUserNum?: number|null = 0
    @protobuf.Field.d(9, "int64", "optional", 0)
    public onlineAt?: number|null = 0
    @protobuf.Field.d(10, tss_match_v2_common_MatchStatus, "optional", tss_match_v2_common_MatchStatus.MatchStatusUnknown)
    public status?: tss_match_v2_common_MatchStatus|null = tss_match_v2_common_MatchStatus.MatchStatusUnknown
    @protobuf.Field.d(11, "bool", "optional", false)
    public LuckyBagTag?: boolean|null = false
    @protobuf.Field.d(12, "bool", "optional", false)
    public isHostAwards?: boolean|null = false
    @protobuf.Field.d(13, "bool", "optional", false)
    public isEntry?: boolean|null = false
    @protobuf.Field.d(14, "int32", "optional", 0)
    public matchEntryNum?: number|null = 0
    @protobuf.Field.d(15, "int64", "repeated", [])
    public entryUsers?: number[] = []
    @protobuf.Field.d(16, "tss_common_Asset", "optional")
    public dynamicPool?: tss_common_Asset|null
    @protobuf.Field.d(17, "bool", "optional", false)
    public isDelayEnter?: boolean|null = false
    @protobuf.Field.d(18, "int32", "optional", 0)
    public lookerNum?: number|null = 0
    @protobuf.Field.d(19, "bool", "optional", false)
    public isUserRole?: boolean|null = false
    @protobuf.Field.d(20, "string", "optional", )
    public matchKey?: string|null = ""
    @protobuf.Field.d(21, "int64", "repeated", [])
    public lookerUsers?: number[] = []
}
export interface IListMatchByTabReq {
    bMyFollower?: boolean|null
    bMyFriend?: boolean|null
    uid?: number|null
    page?: number|null
    pageSize?: number|null
    roomType?: tss_match_v2_common_LiveRoomType|null
}
@protobuf.Type.d("tss_match_v2_list_v1_ListMatchByTabReq")
export class ListMatchByTabReq extends protobuf.Message<IListMatchByTabReq> {
    constructor(properties: Properties<IListMatchByTabReq>) {
        super(properties);
        if (properties) {
            if (properties.bMyFollower) { this.bMyFollower = properties.bMyFollower }
            if (properties.bMyFriend) { this.bMyFriend = properties.bMyFriend }
            if (properties.uid) { this.uid = properties.uid }
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.roomType) { this.roomType = properties.roomType }
        }
	}
    @protobuf.Field.d(1, "bool", "optional", false)
    public bMyFollower?: boolean|null = false
    @protobuf.Field.d(2, "bool", "optional", false)
    public bMyFriend?: boolean|null = false
    @protobuf.Field.d(3, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(6, tss_match_v2_common_LiveRoomType, "optional", tss_match_v2_common_LiveRoomType.LiveRoomTypeUnknown)
    public roomType?: tss_match_v2_common_LiveRoomType|null = tss_match_v2_common_LiveRoomType.LiveRoomTypeUnknown
}
export interface IListMatchByTabResp {
    items?: IMatchItem[]
    totalSize?: number|null
}
@protobuf.Type.d("tss_match_v2_list_v1_ListMatchByTabResp")
export class ListMatchByTabResp extends protobuf.Message<IListMatchByTabResp> {
    constructor(properties: Properties<IListMatchByTabResp>) {
        super(properties);
        if (properties) {
            if (properties.items) { this.items = []; properties.items.forEach((value, index)=>{this.items[index] = MatchItem.create(properties.items[index]) as any})}
            if (properties.totalSize) { this.totalSize = properties.totalSize }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_list_v1_MatchItem", "repeated")
    public items?: MatchItem[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public totalSize?: number|null = 0
}
export interface IListStartingMatchReq {
    uid?: number|null
}
@protobuf.Type.d("tss_match_v2_list_v1_ListStartingMatchReq")
export class ListStartingMatchReq extends protobuf.Message<IListStartingMatchReq> {
    constructor(properties: Properties<IListStartingMatchReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IListStartingMatchResp {
    items?: IMatchItem[]
    totalSize?: number|null
}
@protobuf.Type.d("tss_match_v2_list_v1_ListStartingMatchResp")
export class ListStartingMatchResp extends protobuf.Message<IListStartingMatchResp> {
    constructor(properties: Properties<IListStartingMatchResp>) {
        super(properties);
        if (properties) {
            if (properties.items) { this.items = []; properties.items.forEach((value, index)=>{this.items[index] = MatchItem.create(properties.items[index]) as any})}
            if (properties.totalSize) { this.totalSize = properties.totalSize }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_list_v1_MatchItem", "repeated")
    public items?: MatchItem[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public totalSize?: number|null = 0
}
export interface IMatchBrief {
    schedulerID?: number|null
    srvID?: number|null
    roomNo?: string|null
    preMatchKey?: string|null
    roomID?: string|null
    startAt?: number|null
    readyAt?: number|null
    status?: tss_match_v2_common_MatchStatus|null
    isEntry?: boolean|null
    matchEntryNum?: number|null
    dynamicPool?: tss_common_IAssetItem[]
    isDelayEnter?: boolean|null
    lookerNum?: number|null
    cfgUpdateAt?: number|null
    matchKey?: string|null
    refactorVer?: tss_match_v2_common_RefactorVer|null
    lookerUsers?: number[]
}
@protobuf.Type.d("tss_match_v2_list_v1_MatchBrief")
export class MatchBrief extends protobuf.Message<IMatchBrief> {
    constructor(properties: Properties<IMatchBrief>) {
        super(properties);
        if (properties) {
            if (properties.schedulerID) { this.schedulerID = properties.schedulerID }
            if (properties.srvID) { this.srvID = properties.srvID }
            if (properties.roomNo) { this.roomNo = properties.roomNo }
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
            if (properties.roomID) { this.roomID = properties.roomID }
            if (properties.startAt) { this.startAt = properties.startAt }
            if (properties.readyAt) { this.readyAt = properties.readyAt }
            if (properties.status) { this.status = properties.status }
            if (properties.isEntry) { this.isEntry = properties.isEntry }
            if (properties.matchEntryNum) { this.matchEntryNum = properties.matchEntryNum }
            if (properties.dynamicPool) { this.dynamicPool = []; properties.dynamicPool.forEach((value, index)=>{this.dynamicPool[index] = tss_common_AssetItem.create(properties.dynamicPool[index]) as any})}
            if (properties.isDelayEnter) { this.isDelayEnter = properties.isDelayEnter }
            if (properties.lookerNum) { this.lookerNum = properties.lookerNum }
            if (properties.cfgUpdateAt) { this.cfgUpdateAt = properties.cfgUpdateAt }
            if (properties.matchKey) { this.matchKey = properties.matchKey }
            if (properties.refactorVer) { this.refactorVer = properties.refactorVer }
            if (properties.lookerUsers) { this.lookerUsers = []; properties.lookerUsers.forEach((value, index)=>{this.lookerUsers[index] = properties.lookerUsers[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public schedulerID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public srvID?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public roomNo?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public preMatchKey?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public roomID?: string|null = ""
    @protobuf.Field.d(9, "int64", "optional", 0)
    public startAt?: number|null = 0
    @protobuf.Field.d(20, "int64", "optional", 0)
    public readyAt?: number|null = 0
    @protobuf.Field.d(10, tss_match_v2_common_MatchStatus, "optional", tss_match_v2_common_MatchStatus.MatchStatusUnknown)
    public status?: tss_match_v2_common_MatchStatus|null = tss_match_v2_common_MatchStatus.MatchStatusUnknown
    @protobuf.Field.d(11, "bool", "optional", false)
    public isEntry?: boolean|null = false
    @protobuf.Field.d(12, "int32", "optional", 0)
    public matchEntryNum?: number|null = 0
    @protobuf.Field.d(13, "tss_common_AssetItem", "repeated")
    public dynamicPool?: tss_common_AssetItem[] = []
    @protobuf.Field.d(14, "bool", "optional", false)
    public isDelayEnter?: boolean|null = false
    @protobuf.Field.d(15, "int32", "optional", 0)
    public lookerNum?: number|null = 0
    @protobuf.Field.d(16, "int64", "optional", 0)
    public cfgUpdateAt?: number|null = 0
    @protobuf.Field.d(17, "string", "optional", )
    public matchKey?: string|null = ""
    @protobuf.Field.d(18, tss_match_v2_common_RefactorVer, "optional", tss_match_v2_common_RefactorVer.RefactorVerV1)
    public refactorVer?: tss_match_v2_common_RefactorVer|null = tss_match_v2_common_RefactorVer.RefactorVerV1
    @protobuf.Field.d(21, "int64", "repeated", [])
    public lookerUsers?: number[] = []
}
export interface IGameFilter {
    gameId?: string|null
    playOpt?: number|null
    playOptName?: string|null
    entryFeeFilter?: EntryFeeFilterType[]
}
@protobuf.Type.d("tss_match_v2_list_v1_GameFilter")
export class GameFilter extends protobuf.Message<IGameFilter> {
    constructor(properties: Properties<IGameFilter>) {
        super(properties);
        if (properties) {
            if (properties.gameId) { this.gameId = properties.gameId }
            if (properties.playOpt) { this.playOpt = properties.playOpt }
            if (properties.playOptName) { this.playOptName = properties.playOptName }
            if (properties.entryFeeFilter) { this.entryFeeFilter = []; properties.entryFeeFilter.forEach((value, index)=>{this.entryFeeFilter[index] = properties.entryFeeFilter[index]})}
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public gameId?: string|null = ""
    @protobuf.Field.d(2, "int32", "optional", 0)
    public playOpt?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public playOptName?: string|null = ""
    @protobuf.Field.d(4, EntryFeeFilterType, "repeated", EntryFeeFilterType.EntryFeeFilterTypeUnknown)
    public entryFeeFilter?: EntryFeeFilterType[] = []
}
export interface IListMatchByGuideResp {
    items?: IMatchItem[]
    totalSize?: number|null
    gameFilter?: IGameFilter[]
}
@protobuf.Type.d("tss_match_v2_list_v1_ListMatchByGuideResp")
export class ListMatchByGuideResp extends protobuf.Message<IListMatchByGuideResp> {
    constructor(properties: Properties<IListMatchByGuideResp>) {
        super(properties);
        if (properties) {
            if (properties.items) { this.items = []; properties.items.forEach((value, index)=>{this.items[index] = MatchItem.create(properties.items[index]) as any})}
            if (properties.totalSize) { this.totalSize = properties.totalSize }
            if (properties.gameFilter) { this.gameFilter = []; properties.gameFilter.forEach((value, index)=>{this.gameFilter[index] = GameFilter.create(properties.gameFilter[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_list_v1_MatchItem", "repeated")
    public items?: MatchItem[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public totalSize?: number|null = 0
    @protobuf.Field.d(3, "tss_match_v2_list_v1_GameFilter", "repeated")
    public gameFilter?: GameFilter[] = []
}
export interface ITidyListMatchByGuideResp {
    items?: IMatchBrief[]
    totalSize?: number|null
    gameFilter?: IGameFilter[]
}
@protobuf.Type.d("tss_match_v2_list_v1_TidyListMatchByGuideResp")
export class TidyListMatchByGuideResp extends protobuf.Message<ITidyListMatchByGuideResp> {
    constructor(properties: Properties<ITidyListMatchByGuideResp>) {
        super(properties);
        if (properties) {
            if (properties.items) { this.items = []; properties.items.forEach((value, index)=>{this.items[index] = MatchBrief.create(properties.items[index]) as any})}
            if (properties.totalSize) { this.totalSize = properties.totalSize }
            if (properties.gameFilter) { this.gameFilter = []; properties.gameFilter.forEach((value, index)=>{this.gameFilter[index] = GameFilter.create(properties.gameFilter[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_list_v1_MatchBrief", "repeated")
    public items?: MatchBrief[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public totalSize?: number|null = 0
    @protobuf.Field.d(3, "tss_match_v2_list_v1_GameFilter", "repeated")
    public gameFilter?: GameFilter[] = []
}
export interface IListMatchByTagReq {
    page?: number|null
    pageSize?: number|null
    gameFilter?: IGameFilter
    matchTagType?: tss_match_v2_common_MatchTagType|null
}
@protobuf.Type.d("tss_match_v2_list_v1_ListMatchByTagReq")
export class ListMatchByTagReq extends protobuf.Message<IListMatchByTagReq> {
    constructor(properties: Properties<IListMatchByTagReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.gameFilter) { this.gameFilter = GameFilter.create(properties.gameFilter) as any }
            if (properties.matchTagType) { this.matchTagType = properties.matchTagType }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(3, "tss_match_v2_list_v1_GameFilter", "optional")
    public gameFilter?: GameFilter|null
    @protobuf.Field.d(4, tss_match_v2_common_MatchTagType, "optional", tss_match_v2_common_MatchTagType.MatchTagTypeUnknown)
    public matchTagType?: tss_match_v2_common_MatchTagType|null = tss_match_v2_common_MatchTagType.MatchTagTypeUnknown
}
export interface IMatchStartAt {
    preMatchKey?: string|null
    startAt?: number|null
}
@protobuf.Type.d("tss_match_v2_list_v1_MatchStartAt")
export class MatchStartAt extends protobuf.Message<IMatchStartAt> {
    constructor(properties: Properties<IMatchStartAt>) {
        super(properties);
        if (properties) {
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
            if (properties.startAt) { this.startAt = properties.startAt }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public preMatchKey?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public startAt?: number|null = 0
}
export interface IListMatchByGuideReq {
    page?: number|null
    pageSize?: number|null
    guideType?: ListGuideType|null
    gameFilter?: IGameFilter
    matchTagType?: tss_match_v2_common_MatchTagType|null
}
@protobuf.Type.d("tss_match_v2_list_v1_ListMatchByGuideReq")
export class ListMatchByGuideReq extends protobuf.Message<IListMatchByGuideReq> {
    constructor(properties: Properties<IListMatchByGuideReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.guideType) { this.guideType = properties.guideType }
            if (properties.gameFilter) { this.gameFilter = GameFilter.create(properties.gameFilter) as any }
            if (properties.matchTagType) { this.matchTagType = properties.matchTagType }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(3, ListGuideType, "optional", ListGuideType.ListGuideTypeUnknown)
    public guideType?: ListGuideType|null = ListGuideType.ListGuideTypeUnknown
    @protobuf.Field.d(4, "tss_match_v2_list_v1_GameFilter", "optional")
    public gameFilter?: GameFilter|null
    @protobuf.Field.d(5, tss_match_v2_common_MatchTagType, "optional", tss_match_v2_common_MatchTagType.MatchTagTypeUnknown)
    public matchTagType?: tss_match_v2_common_MatchTagType|null = tss_match_v2_common_MatchTagType.MatchTagTypeUnknown
}
export interface IListWeeklyMatchReq {
    matchIDs?: number[]
}
@protobuf.Type.d("tss_match_v2_list_v1_ListWeeklyMatchReq")
export class ListWeeklyMatchReq extends protobuf.Message<IListWeeklyMatchReq> {
    constructor(properties: Properties<IListWeeklyMatchReq>) {
        super(properties);
        if (properties) {
            if (properties.matchIDs) { this.matchIDs = []; properties.matchIDs.forEach((value, index)=>{this.matchIDs[index] = properties.matchIDs[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public matchIDs?: number[] = []
}
export interface IListWeeklyMatchResp {
    items?: IMatchItem[]
}
@protobuf.Type.d("tss_match_v2_list_v1_ListWeeklyMatchResp")
export class ListWeeklyMatchResp extends protobuf.Message<IListWeeklyMatchResp> {
    constructor(properties: Properties<IListWeeklyMatchResp>) {
        super(properties);
        if (properties) {
            if (properties.items) { this.items = []; properties.items.forEach((value, index)=>{this.items[index] = MatchItem.create(properties.items[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_list_v1_MatchItem", "repeated")
    public items?: MatchItem[] = []
}
export interface IGetMatchStartTimeReq {
    matchID?: number|null
}
@protobuf.Type.d("tss_match_v2_list_v1_GetMatchStartTimeReq")
export class GetMatchStartTimeReq extends protobuf.Message<IGetMatchStartTimeReq> {
    constructor(properties: Properties<IGetMatchStartTimeReq>) {
        super(properties);
        if (properties) {
            if (properties.matchID) { this.matchID = properties.matchID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public matchID?: number|null = 0
}
export interface IGetMatchStartTimeResp {
    startTime?: number|null
}
@protobuf.Type.d("tss_match_v2_list_v1_GetMatchStartTimeResp")
export class GetMatchStartTimeResp extends protobuf.Message<IGetMatchStartTimeResp> {
    constructor(properties: Properties<IGetMatchStartTimeResp>) {
        super(properties);
        if (properties) {
            if (properties.startTime) { this.startTime = properties.startTime }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public startTime?: number|null = 0
}
export interface IGetMatchReq {
    roomNo?: string|null
}
@protobuf.Type.d("tss_match_v2_list_v1_GetMatchReq")
export class GetMatchReq extends protobuf.Message<IGetMatchReq> {
    constructor(properties: Properties<IGetMatchReq>) {
        super(properties);
        if (properties) {
            if (properties.roomNo) { this.roomNo = properties.roomNo }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public roomNo?: string|null = ""
}
export interface IGetMatchResp {
    item?: IMatchItem
}
@protobuf.Type.d("tss_match_v2_list_v1_GetMatchResp")
export class GetMatchResp extends protobuf.Message<IGetMatchResp> {
    constructor(properties: Properties<IGetMatchResp>) {
        super(properties);
        if (properties) {
            if (properties.item) { this.item = MatchItem.create(properties.item) as any }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_list_v1_MatchItem", "optional")
    public item?: MatchItem|null
}
export interface ITidyGetMatchResp {
    item?: IMatchBrief
}
@protobuf.Type.d("tss_match_v2_list_v1_TidyGetMatchResp")
export class TidyGetMatchResp extends protobuf.Message<ITidyGetMatchResp> {
    constructor(properties: Properties<ITidyGetMatchResp>) {
        super(properties);
        if (properties) {
            if (properties.item) { this.item = MatchBrief.create(properties.item) as any }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_list_v1_MatchBrief", "optional")
    public item?: MatchBrief|null
}
export interface IGetMatchByKeyReq {
    preMatchKey?: string|null
}
@protobuf.Type.d("tss_match_v2_list_v1_GetMatchByKeyReq")
export class GetMatchByKeyReq extends protobuf.Message<IGetMatchByKeyReq> {
    constructor(properties: Properties<IGetMatchByKeyReq>) {
        super(properties);
        if (properties) {
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public preMatchKey?: string|null = ""
}
export interface IGetMatchByKeyResp {
    item?: IMatchItem
}
@protobuf.Type.d("tss_match_v2_list_v1_GetMatchByKeyResp")
export class GetMatchByKeyResp extends protobuf.Message<IGetMatchByKeyResp> {
    constructor(properties: Properties<IGetMatchByKeyResp>) {
        super(properties);
        if (properties) {
            if (properties.item) { this.item = MatchItem.create(properties.item) as any }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_list_v1_MatchItem", "optional")
    public item?: MatchItem|null
}
export interface ITidyGetMatchByKeyResp {
    item?: IMatchBrief
}
@protobuf.Type.d("tss_match_v2_list_v1_TidyGetMatchByKeyResp")
export class TidyGetMatchByKeyResp extends protobuf.Message<ITidyGetMatchByKeyResp> {
    constructor(properties: Properties<ITidyGetMatchByKeyResp>) {
        super(properties);
        if (properties) {
            if (properties.item) { this.item = MatchBrief.create(properties.item) as any }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_list_v1_MatchBrief", "optional")
    public item?: MatchBrief|null
}
export interface IGetNextMayEnterMatchReq {
    schedulerID?: number|null
    matchTagType?: tss_match_v2_common_MatchTagType|null
}
@protobuf.Type.d("tss_match_v2_list_v1_GetNextMayEnterMatchReq")
export class GetNextMayEnterMatchReq extends protobuf.Message<IGetNextMayEnterMatchReq> {
    constructor(properties: Properties<IGetNextMayEnterMatchReq>) {
        super(properties);
        if (properties) {
            if (properties.schedulerID) { this.schedulerID = properties.schedulerID }
            if (properties.matchTagType) { this.matchTagType = properties.matchTagType }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public schedulerID?: number|null = 0
    @protobuf.Field.d(2, tss_match_v2_common_MatchTagType, "optional", tss_match_v2_common_MatchTagType.MatchTagTypeUnknown)
    public matchTagType?: tss_match_v2_common_MatchTagType|null = tss_match_v2_common_MatchTagType.MatchTagTypeUnknown
}
export interface IGetNextMayEnterMatchResp {
    preMatchKey?: string|null
    refactorVer?: tss_match_v2_common_RefactorVer|null
    srvID?: number|null
}
@protobuf.Type.d("tss_match_v2_list_v1_GetNextMayEnterMatchResp")
export class GetNextMayEnterMatchResp extends protobuf.Message<IGetNextMayEnterMatchResp> {
    constructor(properties: Properties<IGetNextMayEnterMatchResp>) {
        super(properties);
        if (properties) {
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
            if (properties.refactorVer) { this.refactorVer = properties.refactorVer }
            if (properties.srvID) { this.srvID = properties.srvID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public preMatchKey?: string|null = ""
    @protobuf.Field.d(2, tss_match_v2_common_RefactorVer, "optional", tss_match_v2_common_RefactorVer.RefactorVerV1)
    public refactorVer?: tss_match_v2_common_RefactorVer|null = tss_match_v2_common_RefactorVer.RefactorVerV1
    @protobuf.Field.d(3, "int64", "optional", 0)
    public srvID?: number|null = 0
}
export interface IGetOnePreViewResp {
    item?: IMatchItem
}
@protobuf.Type.d("tss_match_v2_list_v1_GetOnePreViewResp")
export class GetOnePreViewResp extends protobuf.Message<IGetOnePreViewResp> {
    constructor(properties: Properties<IGetOnePreViewResp>) {
        super(properties);
        if (properties) {
            if (properties.item) { this.item = MatchItem.create(properties.item) as any }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_list_v1_MatchItem", "optional")
    public item?: MatchItem|null
}
export interface ITidyGetOnePreViewResp {
    item?: IMatchBrief
}
@protobuf.Type.d("tss_match_v2_list_v1_TidyGetOnePreViewResp")
export class TidyGetOnePreViewResp extends protobuf.Message<ITidyGetOnePreViewResp> {
    constructor(properties: Properties<ITidyGetOnePreViewResp>) {
        super(properties);
        if (properties) {
            if (properties.item) { this.item = MatchBrief.create(properties.item) as any }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_list_v1_MatchBrief", "optional")
    public item?: MatchBrief|null
}
export interface IAddPopularityByChatReq {
    preMatchKey?: string|null
    uid?: number|null
}
@protobuf.Type.d("tss_match_v2_list_v1_AddPopularityByChatReq")
export class AddPopularityByChatReq extends protobuf.Message<IAddPopularityByChatReq> {
    constructor(properties: Properties<IAddPopularityByChatReq>) {
        super(properties);
        if (properties) {
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public preMatchKey?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IRemoveEnterUserReq {
    preMatchKey?: string|null
    uid?: number|null
}
@protobuf.Type.d("tss_match_v2_list_v1_RemoveEnterUserReq")
export class RemoveEnterUserReq extends protobuf.Message<IRemoveEnterUserReq> {
    constructor(properties: Properties<IRemoveEnterUserReq>) {
        super(properties);
        if (properties) {
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public preMatchKey?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface ISyncMatchSrvIDReq {
    preMatchKey?: string|null
    newSrvID?: number|null
}
@protobuf.Type.d("tss_match_v2_list_v1_SyncMatchSrvIDReq")
export class SyncMatchSrvIDReq extends protobuf.Message<ISyncMatchSrvIDReq> {
    constructor(properties: Properties<ISyncMatchSrvIDReq>) {
        super(properties);
        if (properties) {
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
            if (properties.newSrvID) { this.newSrvID = properties.newSrvID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public preMatchKey?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public newSrvID?: number|null = 0
}
export interface IListMatchResp {
    items?: IMatchItem[]
    totalSize?: number|null
}
@protobuf.Type.d("tss_match_v2_list_v1_ListMatchResp")
export class ListMatchResp extends protobuf.Message<IListMatchResp> {
    constructor(properties: Properties<IListMatchResp>) {
        super(properties);
        if (properties) {
            if (properties.items) { this.items = []; properties.items.forEach((value, index)=>{this.items[index] = MatchItem.create(properties.items[index]) as any})}
            if (properties.totalSize) { this.totalSize = properties.totalSize }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_list_v1_MatchItem", "repeated")
    public items?: MatchItem[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public totalSize?: number|null = 0
}
export interface ITidyListStartingMatchResp {
    items?: IMatchBrief[]
    totalSize?: number|null
}
@protobuf.Type.d("tss_match_v2_list_v1_TidyListStartingMatchResp")
export class TidyListStartingMatchResp extends protobuf.Message<ITidyListStartingMatchResp> {
    constructor(properties: Properties<ITidyListStartingMatchResp>) {
        super(properties);
        if (properties) {
            if (properties.items) { this.items = []; properties.items.forEach((value, index)=>{this.items[index] = MatchBrief.create(properties.items[index]) as any})}
            if (properties.totalSize) { this.totalSize = properties.totalSize }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_list_v1_MatchBrief", "repeated")
    public items?: MatchBrief[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public totalSize?: number|null = 0
}
export interface IListMatchByTagResp {
    items?: IMatchStartAt[]
    totalSize?: number|null
    gameFilter?: IGameFilter[]
}
@protobuf.Type.d("tss_match_v2_list_v1_ListMatchByTagResp")
export class ListMatchByTagResp extends protobuf.Message<IListMatchByTagResp> {
    constructor(properties: Properties<IListMatchByTagResp>) {
        super(properties);
        if (properties) {
            if (properties.items) { this.items = []; properties.items.forEach((value, index)=>{this.items[index] = MatchStartAt.create(properties.items[index]) as any})}
            if (properties.totalSize) { this.totalSize = properties.totalSize }
            if (properties.gameFilter) { this.gameFilter = []; properties.gameFilter.forEach((value, index)=>{this.gameFilter[index] = GameFilter.create(properties.gameFilter[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_list_v1_MatchStartAt", "repeated")
    public items?: MatchStartAt[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public totalSize?: number|null = 0
    @protobuf.Field.d(3, "tss_match_v2_list_v1_GameFilter", "repeated")
    public gameFilter?: GameFilter[] = []
}
export interface IMsgAddPopularity {
    preMatchKey?: string|null
    roomID?: string|null
    popularValue?: number|null
    roomUserNum?: number|null
}
@protobuf.Type.d("tss_match_v2_list_v1_MsgAddPopularity")
export class MsgAddPopularity extends protobuf.Message<IMsgAddPopularity> {
    constructor(properties: Properties<IMsgAddPopularity>) {
        super(properties);
        if (properties) {
            if (properties.preMatchKey) { this.preMatchKey = properties.preMatchKey }
            if (properties.roomID) { this.roomID = properties.roomID }
            if (properties.popularValue) { this.popularValue = properties.popularValue }
            if (properties.roomUserNum) { this.roomUserNum = properties.roomUserNum }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public preMatchKey?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public roomID?: string|null = ""
    @protobuf.Field.d(3, "int32", "optional", 0)
    public popularValue?: number|null = 0
    @protobuf.Field.d(4, "int32", "optional", 0)
    public roomUserNum?: number|null = 0
}
export interface ISetLuckyBagTagReq {
    roomID?: string|null
    LuckyBagTag?: boolean|null
}
@protobuf.Type.d("tss_match_v2_list_v1_SetLuckyBagTagReq")
export class SetLuckyBagTagReq extends protobuf.Message<ISetLuckyBagTagReq> {
    constructor(properties: Properties<ISetLuckyBagTagReq>) {
        super(properties);
        if (properties) {
            if (properties.roomID) { this.roomID = properties.roomID }
            if (properties.LuckyBagTag) { this.LuckyBagTag = properties.LuckyBagTag }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public roomID?: string|null = ""
    @protobuf.Field.d(2, "bool", "optional", false)
    public LuckyBagTag?: boolean|null = false
}
export interface ICMSListMatchReq {
    ApplicationId?: string|null
    personalCreateMatch?: boolean|null
    page?: number|null
    pageSize?: number|null
    scheduleID?: number|null
}
@protobuf.Type.d("tss_match_v2_list_v1_CMSListMatchReq")
export class CMSListMatchReq extends protobuf.Message<ICMSListMatchReq> {
    constructor(properties: Properties<ICMSListMatchReq>) {
        super(properties);
        if (properties) {
            if (properties.ApplicationId) { this.ApplicationId = properties.ApplicationId }
            if (properties.personalCreateMatch) { this.personalCreateMatch = properties.personalCreateMatch }
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.scheduleID) { this.scheduleID = properties.scheduleID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public ApplicationId?: string|null = ""
    @protobuf.Field.d(2, "bool", "optional", false)
    public personalCreateMatch?: boolean|null = false
    @protobuf.Field.d(3, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public scheduleID?: number|null = 0
}
export interface ICMSListMatchResp {
    items?: IMatchItem[]
    totalSize?: number|null
}
@protobuf.Type.d("tss_match_v2_list_v1_CMSListMatchResp")
export class CMSListMatchResp extends protobuf.Message<ICMSListMatchResp> {
    constructor(properties: Properties<ICMSListMatchResp>) {
        super(properties);
        if (properties) {
            if (properties.items) { this.items = []; properties.items.forEach((value, index)=>{this.items[index] = MatchItem.create(properties.items[index]) as any})}
            if (properties.totalSize) { this.totalSize = properties.totalSize }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_list_v1_MatchItem", "repeated")
    public items?: MatchItem[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public totalSize?: number|null = 0
}
export interface IGetMatchByScheduleIDReq {
    scheduleID?: number|null
}
@protobuf.Type.d("tss_match_v2_list_v1_GetMatchByScheduleIDReq")
export class GetMatchByScheduleIDReq extends protobuf.Message<IGetMatchByScheduleIDReq> {
    constructor(properties: Properties<IGetMatchByScheduleIDReq>) {
        super(properties);
        if (properties) {
            if (properties.scheduleID) { this.scheduleID = properties.scheduleID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public scheduleID?: number|null = 0
}
export interface IGetMatchByScheduleIDResp {
    item?: IMatchItem
}
@protobuf.Type.d("tss_match_v2_list_v1_GetMatchByScheduleIDResp")
export class GetMatchByScheduleIDResp extends protobuf.Message<IGetMatchByScheduleIDResp> {
    constructor(properties: Properties<IGetMatchByScheduleIDResp>) {
        super(properties);
        if (properties) {
            if (properties.item) { this.item = MatchItem.create(properties.item) as any }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_list_v1_MatchItem", "optional")
    public item?: MatchItem|null
}
export interface ITidyGetMatchByScheduleIDResp {
    item?: IMatchBrief
}
@protobuf.Type.d("tss_match_v2_list_v1_TidyGetMatchByScheduleIDResp")
export class TidyGetMatchByScheduleIDResp extends protobuf.Message<ITidyGetMatchByScheduleIDResp> {
    constructor(properties: Properties<ITidyGetMatchByScheduleIDResp>) {
        super(properties);
        if (properties) {
            if (properties.item) { this.item = MatchBrief.create(properties.item) as any }
        }
	}
    @protobuf.Field.d(1, "tss_match_v2_list_v1_MatchBrief", "optional")
    public item?: MatchBrief|null
}
class $ListService extends RpcService {
    async CreateMatch(req: ICreateMatchReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = CreateMatchReq.create(req)
        this.onBeforeReq("CreateMatch", data, params)
        const buffer = CreateMatchReq.encode(data).finish()
        let [err, pack] = await this.call("CreateMatch", buffer, params)
        if (err) {
            this.onBeforeResp("CreateMatch", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("CreateMatch", err, resp)
            return {err: null, resp: resp}
        }
    }
    async RemoveMatch(req: IRemoveMatchReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = RemoveMatchReq.create(req)
        this.onBeforeReq("RemoveMatch", data, params)
        const buffer = RemoveMatchReq.encode(data).finish()
        let [err, pack] = await this.call("RemoveMatch", buffer, params)
        if (err) {
            this.onBeforeResp("RemoveMatch", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("RemoveMatch", err, resp)
            return {err: null, resp: resp}
        }
    }
    async PauseUpdateMatch(req: IPauseUpdateMatchReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = PauseUpdateMatchReq.create(req)
        this.onBeforeReq("PauseUpdateMatch", data, params)
        const buffer = PauseUpdateMatchReq.encode(data).finish()
        let [err, pack] = await this.call("PauseUpdateMatch", buffer, params)
        if (err) {
            this.onBeforeResp("PauseUpdateMatch", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("PauseUpdateMatch", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListMatch(req: IListMatchReq, params?: RpcParams) : Promise<{err:number, resp:IListMatchResp}> {
        let data = ListMatchReq.create(req)
        this.onBeforeReq("ListMatch", data, params)
        const buffer = ListMatchReq.encode(data).finish()
        let [err, pack] = await this.call("ListMatch", buffer, params)
        if (err) {
            this.onBeforeResp("ListMatch", err)
            return {err: err, resp: null}
        } else {
            let resp = ListMatchResp.decode(pack) as any
            this.onBeforeResp("ListMatch", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListMatchByTab(req: IListMatchByTabReq, params?: RpcParams) : Promise<{err:number, resp:IListMatchByTabResp}> {
        let data = ListMatchByTabReq.create(req)
        this.onBeforeReq("ListMatchByTab", data, params)
        const buffer = ListMatchByTabReq.encode(data).finish()
        let [err, pack] = await this.call("ListMatchByTab", buffer, params)
        if (err) {
            this.onBeforeResp("ListMatchByTab", err)
            return {err: err, resp: null}
        } else {
            let resp = ListMatchByTabResp.decode(pack) as any
            this.onBeforeResp("ListMatchByTab", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListWeeklyMatch(req: IListWeeklyMatchReq, params?: RpcParams) : Promise<{err:number, resp:IListWeeklyMatchResp}> {
        let data = ListWeeklyMatchReq.create(req)
        this.onBeforeReq("ListWeeklyMatch", data, params)
        const buffer = ListWeeklyMatchReq.encode(data).finish()
        let [err, pack] = await this.call("ListWeeklyMatch", buffer, params)
        if (err) {
            this.onBeforeResp("ListWeeklyMatch", err)
            return {err: err, resp: null}
        } else {
            let resp = ListWeeklyMatchResp.decode(pack) as any
            this.onBeforeResp("ListWeeklyMatch", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetMatchStartTime(req: IGetMatchStartTimeReq, params?: RpcParams) : Promise<{err:number, resp:IGetMatchStartTimeResp}> {
        let data = GetMatchStartTimeReq.create(req)
        this.onBeforeReq("GetMatchStartTime", data, params)
        const buffer = GetMatchStartTimeReq.encode(data).finish()
        let [err, pack] = await this.call("GetMatchStartTime", buffer, params)
        if (err) {
            this.onBeforeResp("GetMatchStartTime", err)
            return {err: err, resp: null}
        } else {
            let resp = GetMatchStartTimeResp.decode(pack) as any
            this.onBeforeResp("GetMatchStartTime", err, resp)
            return {err: null, resp: resp}
        }
    }
    async CMSListMatch(req: ICMSListMatchReq, params?: RpcParams) : Promise<{err:number, resp:ICMSListMatchResp}> {
        let data = CMSListMatchReq.create(req)
        this.onBeforeReq("CMSListMatch", data, params)
        const buffer = CMSListMatchReq.encode(data).finish()
        let [err, pack] = await this.call("CMSListMatch", buffer, params)
        if (err) {
            this.onBeforeResp("CMSListMatch", err)
            return {err: err, resp: null}
        } else {
            let resp = CMSListMatchResp.decode(pack) as any
            this.onBeforeResp("CMSListMatch", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetMatch(req: IGetMatchReq, params?: RpcParams) : Promise<{err:number, resp:IGetMatchResp}> {
        let data = GetMatchReq.create(req)
        this.onBeforeReq("GetMatch", data, params)
        const buffer = GetMatchReq.encode(data).finish()
        let [err, pack] = await this.call("GetMatch", buffer, params)
        if (err) {
            this.onBeforeResp("GetMatch", err)
            return {err: err, resp: null}
        } else {
            let resp = GetMatchResp.decode(pack) as any
            this.onBeforeResp("GetMatch", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetMatchByKey(req: IGetMatchByKeyReq, params?: RpcParams) : Promise<{err:number, resp:IGetMatchByKeyResp}> {
        let data = GetMatchByKeyReq.create(req)
        this.onBeforeReq("GetMatchByKey", data, params)
        const buffer = GetMatchByKeyReq.encode(data).finish()
        let [err, pack] = await this.call("GetMatchByKey", buffer, params)
        if (err) {
            this.onBeforeResp("GetMatchByKey", err)
            return {err: err, resp: null}
        } else {
            let resp = GetMatchByKeyResp.decode(pack) as any
            this.onBeforeResp("GetMatchByKey", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetNextMayEnterMatch(req: IGetNextMayEnterMatchReq, params?: RpcParams) : Promise<{err:number, resp:IGetNextMayEnterMatchResp}> {
        let data = GetNextMayEnterMatchReq.create(req)
        this.onBeforeReq("GetNextMayEnterMatch", data, params)
        const buffer = GetNextMayEnterMatchReq.encode(data).finish()
        let [err, pack] = await this.call("GetNextMayEnterMatch", buffer, params)
        if (err) {
            this.onBeforeResp("GetNextMayEnterMatch", err)
            return {err: err, resp: null}
        } else {
            let resp = GetNextMayEnterMatchResp.decode(pack) as any
            this.onBeforeResp("GetNextMayEnterMatch", err, resp)
            return {err: null, resp: resp}
        }
    }
    async AddPopularityByChat(req: IAddPopularityByChatReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = AddPopularityByChatReq.create(req)
        this.onBeforeReq("AddPopularityByChat", data, params)
        const buffer = AddPopularityByChatReq.encode(data).finish()
        let [err, pack] = await this.call("AddPopularityByChat", buffer, params)
        if (err) {
            this.onBeforeResp("AddPopularityByChat", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("AddPopularityByChat", err, resp)
            return {err: null, resp: resp}
        }
    }
    async RemoveEnterUser(req: IRemoveEnterUserReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = RemoveEnterUserReq.create(req)
        this.onBeforeReq("RemoveEnterUser", data, params)
        const buffer = RemoveEnterUserReq.encode(data).finish()
        let [err, pack] = await this.call("RemoveEnterUser", buffer, params)
        if (err) {
            this.onBeforeResp("RemoveEnterUser", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("RemoveEnterUser", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListMatchByGuide(req: IListMatchByGuideReq, params?: RpcParams) : Promise<{err:number, resp:IListMatchByGuideResp}> {
        let data = ListMatchByGuideReq.create(req)
        this.onBeforeReq("ListMatchByGuide", data, params)
        const buffer = ListMatchByGuideReq.encode(data).finish()
        let [err, pack] = await this.call("ListMatchByGuide", buffer, params)
        if (err) {
            this.onBeforeResp("ListMatchByGuide", err)
            return {err: err, resp: null}
        } else {
            let resp = ListMatchByGuideResp.decode(pack) as any
            this.onBeforeResp("ListMatchByGuide", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListStartingMatch(req: IListStartingMatchReq, params?: RpcParams) : Promise<{err:number, resp:IListStartingMatchResp}> {
        let data = ListStartingMatchReq.create(req)
        this.onBeforeReq("ListStartingMatch", data, params)
        const buffer = ListStartingMatchReq.encode(data).finish()
        let [err, pack] = await this.call("ListStartingMatch", buffer, params)
        if (err) {
            this.onBeforeResp("ListStartingMatch", err)
            return {err: err, resp: null}
        } else {
            let resp = ListStartingMatchResp.decode(pack) as any
            this.onBeforeResp("ListStartingMatch", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListMatchByTag(req: IListMatchByTagReq, params?: RpcParams) : Promise<{err:number, resp:IListMatchByTagResp}> {
        let data = ListMatchByTagReq.create(req)
        this.onBeforeReq("ListMatchByTag", data, params)
        const buffer = ListMatchByTagReq.encode(data).finish()
        let [err, pack] = await this.call("ListMatchByTag", buffer, params)
        if (err) {
            this.onBeforeResp("ListMatchByTag", err)
            return {err: err, resp: null}
        } else {
            let resp = ListMatchByTagResp.decode(pack) as any
            this.onBeforeResp("ListMatchByTag", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetOnePreView(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:IGetOnePreViewResp}> {
        let data = base_Void.create(req)
        this.onBeforeReq("GetOnePreView", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("GetOnePreView", buffer, params)
        if (err) {
            this.onBeforeResp("GetOnePreView", err)
            return {err: err, resp: null}
        } else {
            let resp = GetOnePreViewResp.decode(pack) as any
            this.onBeforeResp("GetOnePreView", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SyncMatchSrvID(req: ISyncMatchSrvIDReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = SyncMatchSrvIDReq.create(req)
        this.onBeforeReq("SyncMatchSrvID", data, params)
        const buffer = SyncMatchSrvIDReq.encode(data).finish()
        let [err, pack] = await this.call("SyncMatchSrvID", buffer, params)
        if (err) {
            this.onBeforeResp("SyncMatchSrvID", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("SyncMatchSrvID", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ClearAllMatch(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = base_Void.create(req)
        this.onBeforeReq("ClearAllMatch", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("ClearAllMatch", buffer, params)
        if (err) {
            this.onBeforeResp("ClearAllMatch", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("ClearAllMatch", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SetLuckyBagTag(req: ISetLuckyBagTagReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = SetLuckyBagTagReq.create(req)
        this.onBeforeReq("SetLuckyBagTag", data, params)
        const buffer = SetLuckyBagTagReq.encode(data).finish()
        let [err, pack] = await this.call("SetLuckyBagTag", buffer, params)
        if (err) {
            this.onBeforeResp("SetLuckyBagTag", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("SetLuckyBagTag", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetMatchByScheduleID(req: IGetMatchByScheduleIDReq, params?: RpcParams) : Promise<{err:number, resp:IGetMatchByScheduleIDResp}> {
        let data = GetMatchByScheduleIDReq.create(req)
        this.onBeforeReq("GetMatchByScheduleID", data, params)
        const buffer = GetMatchByScheduleIDReq.encode(data).finish()
        let [err, pack] = await this.call("GetMatchByScheduleID", buffer, params)
        if (err) {
            this.onBeforeResp("GetMatchByScheduleID", err)
            return {err: err, resp: null}
        } else {
            let resp = GetMatchByScheduleIDResp.decode(pack) as any
            this.onBeforeResp("GetMatchByScheduleID", err, resp)
            return {err: null, resp: resp}
        }
    }
    async TidyListMatchByGuide(req: IListMatchByGuideReq, params?: RpcParams) : Promise<{err:number, resp:ITidyListMatchByGuideResp}> {
        let data = ListMatchByGuideReq.create(req)
        this.onBeforeReq("TidyListMatchByGuide", data, params)
        const buffer = ListMatchByGuideReq.encode(data).finish()
        let [err, pack] = await this.call("TidyListMatchByGuide", buffer, params)
        if (err) {
            this.onBeforeResp("TidyListMatchByGuide", err)
            return {err: err, resp: null}
        } else {
            let resp = TidyListMatchByGuideResp.decode(pack) as any
            this.onBeforeResp("TidyListMatchByGuide", err, resp)
            return {err: null, resp: resp}
        }
    }
    async TidyGetMatchByKey(req: IGetMatchByKeyReq, params?: RpcParams) : Promise<{err:number, resp:ITidyGetMatchByKeyResp}> {
        let data = GetMatchByKeyReq.create(req)
        this.onBeforeReq("TidyGetMatchByKey", data, params)
        const buffer = GetMatchByKeyReq.encode(data).finish()
        let [err, pack] = await this.call("TidyGetMatchByKey", buffer, params)
        if (err) {
            this.onBeforeResp("TidyGetMatchByKey", err)
            return {err: err, resp: null}
        } else {
            let resp = TidyGetMatchByKeyResp.decode(pack) as any
            this.onBeforeResp("TidyGetMatchByKey", err, resp)
            return {err: null, resp: resp}
        }
    }
    async TidyGetOnePreView(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:ITidyGetOnePreViewResp}> {
        let data = base_Void.create(req)
        this.onBeforeReq("TidyGetOnePreView", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("TidyGetOnePreView", buffer, params)
        if (err) {
            this.onBeforeResp("TidyGetOnePreView", err)
            return {err: err, resp: null}
        } else {
            let resp = TidyGetOnePreViewResp.decode(pack) as any
            this.onBeforeResp("TidyGetOnePreView", err, resp)
            return {err: null, resp: resp}
        }
    }
    async TidyListStartingMatch(req: IListStartingMatchReq, params?: RpcParams) : Promise<{err:number, resp:ITidyListStartingMatchResp}> {
        let data = ListStartingMatchReq.create(req)
        this.onBeforeReq("TidyListStartingMatch", data, params)
        const buffer = ListStartingMatchReq.encode(data).finish()
        let [err, pack] = await this.call("TidyListStartingMatch", buffer, params)
        if (err) {
            this.onBeforeResp("TidyListStartingMatch", err)
            return {err: err, resp: null}
        } else {
            let resp = TidyListStartingMatchResp.decode(pack) as any
            this.onBeforeResp("TidyListStartingMatch", err, resp)
            return {err: null, resp: resp}
        }
    }
    async TidyGetMatchByScheduleID(req: IGetMatchByScheduleIDReq, params?: RpcParams) : Promise<{err:number, resp:ITidyGetMatchByScheduleIDResp}> {
        let data = GetMatchByScheduleIDReq.create(req)
        this.onBeforeReq("TidyGetMatchByScheduleID", data, params)
        const buffer = GetMatchByScheduleIDReq.encode(data).finish()
        let [err, pack] = await this.call("TidyGetMatchByScheduleID", buffer, params)
        if (err) {
            this.onBeforeResp("TidyGetMatchByScheduleID", err)
            return {err: err, resp: null}
        } else {
            let resp = TidyGetMatchByScheduleIDResp.decode(pack) as any
            this.onBeforeResp("TidyGetMatchByScheduleID", err, resp)
            return {err: null, resp: resp}
        }
    }
    async TidyGetMatch(req: IGetMatchReq, params?: RpcParams) : Promise<{err:number, resp:ITidyGetMatchResp}> {
        let data = GetMatchReq.create(req)
        this.onBeforeReq("TidyGetMatch", data, params)
        const buffer = GetMatchReq.encode(data).finish()
        let [err, pack] = await this.call("TidyGetMatch", buffer, params)
        if (err) {
            this.onBeforeResp("TidyGetMatch", err)
            return {err: err, resp: null}
        } else {
            let resp = TidyGetMatchResp.decode(pack) as any
            this.onBeforeResp("TidyGetMatch", err, resp)
            return {err: null, resp: resp}
        }
    }
    NotifyAddPopularity(data: Uint8Array, params: RpcParams) : {msg: IMsgAddPopularity, eventID?: number} {
        let msg = MsgAddPopularity.decode(data)
        return {msg: msg}
    }
}
export const ListService = new $ListService({
    name: "tss.match.v2.list.v1",
})
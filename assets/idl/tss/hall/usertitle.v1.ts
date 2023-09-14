import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  Void as base_Void,IVoid as base_IVoid ,  } from "idl/base/base"
import {  Way as tss_common_Way ,  AssetItem as tss_common_AssetItem,IAssetItem as tss_common_IAssetItem ,  UserRobotFlag as tss_common_UserRobotFlag ,  SwitchState as tss_common_SwitchState ,  Sign as tss_common_Sign ,  } from "idl/tss/common/common_define"
import {  SubMatchType as tss_match_v2_mate_SubMatchType ,  } from "idl/tss/match_v2/common_matematch"
export interface IGetUserStreakWinningProtectChanceReq {
    uid?: number|null
    gameId?: string|null
}
@protobuf.Type.d("tss_hall_usertitle_v1_GetUserStreakWinningProtectChanceReq")
export class GetUserStreakWinningProtectChanceReq extends protobuf.Message<IGetUserStreakWinningProtectChanceReq> {
    constructor(properties: Properties<IGetUserStreakWinningProtectChanceReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.gameId) { this.gameId = properties.gameId }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public gameId?: string|null = ""
}
export interface IRecoverUserStreakWinningCountReq {
    uid?: number|null
    gameId?: string|null
}
@protobuf.Type.d("tss_hall_usertitle_v1_RecoverUserStreakWinningCountReq")
export class RecoverUserStreakWinningCountReq extends protobuf.Message<IRecoverUserStreakWinningCountReq> {
    constructor(properties: Properties<IRecoverUserStreakWinningCountReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.gameId) { this.gameId = properties.gameId }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public gameId?: string|null = ""
}
export interface IBatchFreezeUserTitleReq {
    uids?: number[]
    isFreeze?: boolean|null
}
@protobuf.Type.d("tss_hall_usertitle_v1_BatchFreezeUserTitleReq")
export class BatchFreezeUserTitleReq extends protobuf.Message<IBatchFreezeUserTitleReq> {
    constructor(properties: Properties<IBatchFreezeUserTitleReq>) {
        super(properties);
        if (properties) {
            if (properties.uids) { this.uids = []; properties.uids.forEach((value, index)=>{this.uids[index] = properties.uids[index]})}
            if (properties.isFreeze) { this.isFreeze = properties.isFreeze }
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public uids?: number[] = []
    @protobuf.Field.d(2, "bool", "optional", false)
    public isFreeze?: boolean|null = false
}
export interface IBatchChangeUserHonourPointReq {
    uids?: number[]
    gameId?: string|null
    honourPoint?: number|null
    operator?: string|null
    way?: tss_common_Way|null
}
@protobuf.Type.d("tss_hall_usertitle_v1_BatchChangeUserHonourPointReq")
export class BatchChangeUserHonourPointReq extends protobuf.Message<IBatchChangeUserHonourPointReq> {
    constructor(properties: Properties<IBatchChangeUserHonourPointReq>) {
        super(properties);
        if (properties) {
            if (properties.uids) { this.uids = []; properties.uids.forEach((value, index)=>{this.uids[index] = properties.uids[index]})}
            if (properties.gameId) { this.gameId = properties.gameId }
            if (properties.honourPoint) { this.honourPoint = properties.honourPoint }
            if (properties.operator) { this.operator = properties.operator }
            if (properties.way) { this.way = properties.way }
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public uids?: number[] = []
    @protobuf.Field.d(2, "string", "optional", )
    public gameId?: string|null = ""
    @protobuf.Field.d(3, "int64", "optional", 0)
    public honourPoint?: number|null = 0
    @protobuf.Field.d(4, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(5, tss_common_Way, "optional", tss_common_Way.WayNone)
    public way?: tss_common_Way|null = tss_common_Way.WayNone
}
export interface IBatchReportUserTitleReq {
    uids?: number[]
    appID?: string|null
}
@protobuf.Type.d("tss_hall_usertitle_v1_BatchReportUserTitleReq")
export class BatchReportUserTitleReq extends protobuf.Message<IBatchReportUserTitleReq> {
    constructor(properties: Properties<IBatchReportUserTitleReq>) {
        super(properties);
        if (properties) {
            if (properties.uids) { this.uids = []; properties.uids.forEach((value, index)=>{this.uids[index] = properties.uids[index]})}
            if (properties.appID) { this.appID = properties.appID }
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public uids?: number[] = []
    @protobuf.Field.d(2, "string", "optional", )
    public appID?: string|null = ""
}
export interface IGetTitleConfigReq {
    gameId?: string|null
}
@protobuf.Type.d("tss_hall_usertitle_v1_GetTitleConfigReq")
export class GetTitleConfigReq extends protobuf.Message<IGetTitleConfigReq> {
    constructor(properties: Properties<IGetTitleConfigReq>) {
        super(properties);
        if (properties) {
            if (properties.gameId) { this.gameId = properties.gameId }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public gameId?: string|null = ""
}
export interface IListTitleConfigReq {
    page?: number|null
    pageSize?: number|null
}
@protobuf.Type.d("tss_hall_usertitle_v1_ListTitleConfigReq")
export class ListTitleConfigReq extends protobuf.Message<IListTitleConfigReq> {
    constructor(properties: Properties<IListTitleConfigReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public pageSize?: number|null = 0
}
export interface ISubTitleConfig {
    level?: number|null
    requireHonourPoint?: number|null
    name?: string|null
    img?: string|null
    explainText?: string|null
    levelAwards?: tss_common_IAssetItem[]
    tag?: string|null
    imgHD?: string|null
}
@protobuf.Type.d("tss_hall_usertitle_v1_SubTitleConfig")
export class SubTitleConfig extends protobuf.Message<ISubTitleConfig> {
    constructor(properties: Properties<ISubTitleConfig>) {
        super(properties);
        if (properties) {
            if (properties.level) { this.level = properties.level }
            if (properties.requireHonourPoint) { this.requireHonourPoint = properties.requireHonourPoint }
            if (properties.name) { this.name = properties.name }
            if (properties.img) { this.img = properties.img }
            if (properties.explainText) { this.explainText = properties.explainText }
            if (properties.levelAwards) { this.levelAwards = []; properties.levelAwards.forEach((value, index)=>{this.levelAwards[index] = tss_common_AssetItem.create(properties.levelAwards[index]) as any})}
            if (properties.tag) { this.tag = properties.tag }
            if (properties.imgHD) { this.imgHD = properties.imgHD }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public level?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public requireHonourPoint?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public img?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public explainText?: string|null = ""
    @protobuf.Field.d(6, "tss_common_AssetItem", "repeated")
    public levelAwards?: tss_common_AssetItem[] = []
    @protobuf.Field.d(7, "string", "optional", )
    public tag?: string|null = ""
    @protobuf.Field.d(8, "string", "optional", )
    public imgHD?: string|null = ""
}
export interface IDeleteTitleConfigReq {
    gameId?: string|null
}
@protobuf.Type.d("tss_hall_usertitle_v1_DeleteTitleConfigReq")
export class DeleteTitleConfigReq extends protobuf.Message<IDeleteTitleConfigReq> {
    constructor(properties: Properties<IDeleteTitleConfigReq>) {
        super(properties);
        if (properties) {
            if (properties.gameId) { this.gameId = properties.gameId }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public gameId?: string|null = ""
}
export interface IGetUserTitleReq {
    uid?: number|null
    gameId?: string|null
}
@protobuf.Type.d("tss_hall_usertitle_v1_GetUserTitleReq")
export class GetUserTitleReq extends protobuf.Message<IGetUserTitleReq> {
    constructor(properties: Properties<IGetUserTitleReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.gameId) { this.gameId = properties.gameId }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public gameId?: string|null = ""
}
export interface IBatchGetUserTitleReq {
    uids?: number[]
    gameId?: string|null
}
@protobuf.Type.d("tss_hall_usertitle_v1_BatchGetUserTitleReq")
export class BatchGetUserTitleReq extends protobuf.Message<IBatchGetUserTitleReq> {
    constructor(properties: Properties<IBatchGetUserTitleReq>) {
        super(properties);
        if (properties) {
            if (properties.uids) { this.uids = []; properties.uids.forEach((value, index)=>{this.uids[index] = properties.uids[index]})}
            if (properties.gameId) { this.gameId = properties.gameId }
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public uids?: number[] = []
    @protobuf.Field.d(2, "string", "optional", )
    public gameId?: string|null = ""
}
export interface IChangeUserHonourPointReq {
    uid?: number|null
    gameId?: string|null
    honourPoint?: number|null
    operator?: string|null
    way?: tss_common_Way|null
}
@protobuf.Type.d("tss_hall_usertitle_v1_ChangeUserHonourPointReq")
export class ChangeUserHonourPointReq extends protobuf.Message<IChangeUserHonourPointReq> {
    constructor(properties: Properties<IChangeUserHonourPointReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.gameId) { this.gameId = properties.gameId }
            if (properties.honourPoint) { this.honourPoint = properties.honourPoint }
            if (properties.operator) { this.operator = properties.operator }
            if (properties.way) { this.way = properties.way }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public gameId?: string|null = ""
    @protobuf.Field.d(3, "int64", "optional", 0)
    public honourPoint?: number|null = 0
    @protobuf.Field.d(4, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(5, tss_common_Way, "optional", tss_common_Way.WayNone)
    public way?: tss_common_Way|null = tss_common_Way.WayNone
}
export interface IListUserHonourPointRecordReq {
    uid?: number|null
    startAt?: number|null
    endAt?: number|null
    page?: number|null
    pageSize?: number|null
    way?: tss_common_Way|null
    urf?: tss_common_UserRobotFlag|null
}
@protobuf.Type.d("tss_hall_usertitle_v1_ListUserHonourPointRecordReq")
export class ListUserHonourPointRecordReq extends protobuf.Message<IListUserHonourPointRecordReq> {
    constructor(properties: Properties<IListUserHonourPointRecordReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.startAt) { this.startAt = properties.startAt }
            if (properties.endAt) { this.endAt = properties.endAt }
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.way) { this.way = properties.way }
            if (properties.urf) { this.urf = properties.urf }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public startAt?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public endAt?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(6, tss_common_Way, "optional", tss_common_Way.WayNone)
    public way?: tss_common_Way|null = tss_common_Way.WayNone
    @protobuf.Field.d(7, tss_common_UserRobotFlag, "optional", tss_common_UserRobotFlag.UserRobotFlagUnknown)
    public urf?: tss_common_UserRobotFlag|null = tss_common_UserRobotFlag.UserRobotFlagUnknown
}
export interface IGetHonourPointConfigReq {
    gameId?: string|null
    subMatchType?: tss_match_v2_mate_SubMatchType|null
    playWay?: number|null
}
@protobuf.Type.d("tss_hall_usertitle_v1_GetHonourPointConfigReq")
export class GetHonourPointConfigReq extends protobuf.Message<IGetHonourPointConfigReq> {
    constructor(properties: Properties<IGetHonourPointConfigReq>) {
        super(properties);
        if (properties) {
            if (properties.gameId) { this.gameId = properties.gameId }
            if (properties.subMatchType) { this.subMatchType = properties.subMatchType }
            if (properties.playWay) { this.playWay = properties.playWay }
        }
	}
    @protobuf.Field.d(2, "string", "optional", )
    public gameId?: string|null = ""
    @protobuf.Field.d(3, tss_match_v2_mate_SubMatchType, "optional", tss_match_v2_mate_SubMatchType.SubMatchTypeUnknown)
    public subMatchType?: tss_match_v2_mate_SubMatchType|null = tss_match_v2_mate_SubMatchType.SubMatchTypeUnknown
    @protobuf.Field.d(4, "int32", "optional", 0)
    public playWay?: number|null = 0
}
export interface IHonourPointStage {
    taskCARequired?: number|null
    assets?: tss_common_IAssetItem[]
    honourPoint?: number|null
    experience?: number|null
}
@protobuf.Type.d("tss_hall_usertitle_v1_HonourPointStage")
export class HonourPointStage extends protobuf.Message<IHonourPointStage> {
    constructor(properties: Properties<IHonourPointStage>) {
        super(properties);
        if (properties) {
            if (properties.taskCARequired) { this.taskCARequired = properties.taskCARequired }
            if (properties.assets) { this.assets = []; properties.assets.forEach((value, index)=>{this.assets[index] = tss_common_AssetItem.create(properties.assets[index]) as any})}
            if (properties.honourPoint) { this.honourPoint = properties.honourPoint }
            if (properties.experience) { this.experience = properties.experience }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public taskCARequired?: number|null = 0
    @protobuf.Field.d(4, "tss_common_AssetItem", "repeated")
    public assets?: tss_common_AssetItem[] = []
    @protobuf.Field.d(5, "int64", "optional", 0)
    public honourPoint?: number|null = 0
    @protobuf.Field.d(6, "int64", "optional", 0)
    public experience?: number|null = 0
}
export interface IListUserAllTitleReq {
    uid?: number|null
    page?: number|null
    pageSize?: number|null
}
@protobuf.Type.d("tss_hall_usertitle_v1_ListUserAllTitleReq")
export class ListUserAllTitleReq extends protobuf.Message<IListUserAllTitleReq> {
    constructor(properties: Properties<IListUserAllTitleReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public pageSize?: number|null = 0
}
export interface IHonourPointAssetConfig {
    name?: string|null
    img?: string|null
    icon?: string|null
    desc?: string|null
    updateAt?: number|null
    operator?: string|null
}
@protobuf.Type.d("tss_hall_usertitle_v1_HonourPointAssetConfig")
export class HonourPointAssetConfig extends protobuf.Message<IHonourPointAssetConfig> {
    constructor(properties: Properties<IHonourPointAssetConfig>) {
        super(properties);
        if (properties) {
            if (properties.name) { this.name = properties.name }
            if (properties.img) { this.img = properties.img }
            if (properties.icon) { this.icon = properties.icon }
            if (properties.desc) { this.desc = properties.desc }
            if (properties.updateAt) { this.updateAt = properties.updateAt }
            if (properties.operator) { this.operator = properties.operator }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public img?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public icon?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public desc?: string|null = ""
    @protobuf.Field.d(5, "int64", "optional", 0)
    public updateAt?: number|null = 0
    @protobuf.Field.d(6, "string", "optional", )
    public operator?: string|null = ""
}
export interface IGetUserHonourPointChangeViewReq {
    gameID?: string|null
}
@protobuf.Type.d("tss_hall_usertitle_v1_GetUserHonourPointChangeViewReq")
export class GetUserHonourPointChangeViewReq extends protobuf.Message<IGetUserHonourPointChangeViewReq> {
    constructor(properties: Properties<IGetUserHonourPointChangeViewReq>) {
        super(properties);
        if (properties) {
            if (properties.gameID) { this.gameID = properties.gameID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public gameID?: string|null = ""
}
export interface IGetUserStreakWinningProtectChanceResp {
    chance?: number|null
}
@protobuf.Type.d("tss_hall_usertitle_v1_GetUserStreakWinningProtectChanceResp")
export class GetUserStreakWinningProtectChanceResp extends protobuf.Message<IGetUserStreakWinningProtectChanceResp> {
    constructor(properties: Properties<IGetUserStreakWinningProtectChanceResp>) {
        super(properties);
        if (properties) {
            if (properties.chance) { this.chance = properties.chance }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public chance?: number|null = 0
}
export interface IGetHonourPointAssetConfigResp {
    config?: IHonourPointAssetConfig
}
@protobuf.Type.d("tss_hall_usertitle_v1_GetHonourPointAssetConfigResp")
export class GetHonourPointAssetConfigResp extends protobuf.Message<IGetHonourPointAssetConfigResp> {
    constructor(properties: Properties<IGetHonourPointAssetConfigResp>) {
        super(properties);
        if (properties) {
            if (properties.config) { this.config = HonourPointAssetConfig.create(properties.config) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_usertitle_v1_HonourPointAssetConfig", "optional")
    public config?: HonourPointAssetConfig|null
}
export interface ITitleConfig {
    gameId?: string|null
    subTitleConfigs?: ISubTitleConfig[]
    updateAt?: number|null
    operator?: string|null
    sort?: number|null
    introduceImgs?: string[]
    minAwardVersion?: number|null
    maxAwardVersion?: number|null
}
@protobuf.Type.d("tss_hall_usertitle_v1_TitleConfig")
export class TitleConfig extends protobuf.Message<ITitleConfig> {
    constructor(properties: Properties<ITitleConfig>) {
        super(properties);
        if (properties) {
            if (properties.gameId) { this.gameId = properties.gameId }
            if (properties.subTitleConfigs) { this.subTitleConfigs = []; properties.subTitleConfigs.forEach((value, index)=>{this.subTitleConfigs[index] = SubTitleConfig.create(properties.subTitleConfigs[index]) as any})}
            if (properties.updateAt) { this.updateAt = properties.updateAt }
            if (properties.operator) { this.operator = properties.operator }
            if (properties.sort) { this.sort = properties.sort }
            if (properties.introduceImgs) { this.introduceImgs = []; properties.introduceImgs.forEach((value, index)=>{this.introduceImgs[index] = properties.introduceImgs[index]})}
            if (properties.minAwardVersion) { this.minAwardVersion = properties.minAwardVersion }
            if (properties.maxAwardVersion) { this.maxAwardVersion = properties.maxAwardVersion }
        }
	}
    @protobuf.Field.d(3, "string", "optional", )
    public gameId?: string|null = ""
    @protobuf.Field.d(4, "tss_hall_usertitle_v1_SubTitleConfig", "repeated")
    public subTitleConfigs?: SubTitleConfig[] = []
    @protobuf.Field.d(6, "int64", "optional", 0)
    public updateAt?: number|null = 0
    @protobuf.Field.d(7, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(8, "int64", "optional", 0)
    public sort?: number|null = 0
    @protobuf.Field.d(9, "string", "repeated", [])
    public introduceImgs?: string[] = []
    @protobuf.Field.d(10, "int64", "optional", 0)
    public minAwardVersion?: number|null = 0
    @protobuf.Field.d(11, "int64", "optional", 0)
    public maxAwardVersion?: number|null = 0
}
export interface IListTitleConfigResp {
    configs?: ITitleConfig[]
    total?: number|null
}
@protobuf.Type.d("tss_hall_usertitle_v1_ListTitleConfigResp")
export class ListTitleConfigResp extends protobuf.Message<IListTitleConfigResp> {
    constructor(properties: Properties<IListTitleConfigResp>) {
        super(properties);
        if (properties) {
            if (properties.configs) { this.configs = []; properties.configs.forEach((value, index)=>{this.configs[index] = TitleConfig.create(properties.configs[index]) as any})}
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "tss_hall_usertitle_v1_TitleConfig", "repeated")
    public configs?: TitleConfig[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public total?: number|null = 0
}
export interface IUserTitle {
    uid?: number|null
    gameId?: string|null
    level?: number|null
    userHonourPoint?: number|null
    name?: string|null
    img?: string|null
    nextLevelConfig?: ISubTitleConfig
}
@protobuf.Type.d("tss_hall_usertitle_v1_UserTitle")
export class UserTitle extends protobuf.Message<IUserTitle> {
    constructor(properties: Properties<IUserTitle>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.gameId) { this.gameId = properties.gameId }
            if (properties.level) { this.level = properties.level }
            if (properties.userHonourPoint) { this.userHonourPoint = properties.userHonourPoint }
            if (properties.name) { this.name = properties.name }
            if (properties.img) { this.img = properties.img }
            if (properties.nextLevelConfig) { this.nextLevelConfig = SubTitleConfig.create(properties.nextLevelConfig) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public gameId?: string|null = ""
    @protobuf.Field.d(3, "int64", "optional", 0)
    public level?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public userHonourPoint?: number|null = 0
    @protobuf.Field.d(5, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(6, "string", "optional", )
    public img?: string|null = ""
    @protobuf.Field.d(7, "tss_hall_usertitle_v1_SubTitleConfig", "optional")
    public nextLevelConfig?: SubTitleConfig|null
}
export interface IBatchGetUserTitleResp {
    userTitles?: IUserTitle[]
}
@protobuf.Type.d("tss_hall_usertitle_v1_BatchGetUserTitleResp")
export class BatchGetUserTitleResp extends protobuf.Message<IBatchGetUserTitleResp> {
    constructor(properties: Properties<IBatchGetUserTitleResp>) {
        super(properties);
        if (properties) {
            if (properties.userTitles) { this.userTitles = []; properties.userTitles.forEach((value, index)=>{this.userTitles[index] = UserTitle.create(properties.userTitles[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_usertitle_v1_UserTitle", "repeated")
    public userTitles?: UserTitle[] = []
}
export interface IHonourPointConfig {
    id?: number|null
    gameId?: string|null
    subMatchType?: tss_match_v2_mate_SubMatchType|null
    playWay?: number|null
    state?: tss_common_SwitchState|null
    stages?: IHonourPointStage[]
    updateAt?: number|null
    operator?: string|null
    introduceImg?: string|null
}
@protobuf.Type.d("tss_hall_usertitle_v1_HonourPointConfig")
export class HonourPointConfig extends protobuf.Message<IHonourPointConfig> {
    constructor(properties: Properties<IHonourPointConfig>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.gameId) { this.gameId = properties.gameId }
            if (properties.subMatchType) { this.subMatchType = properties.subMatchType }
            if (properties.playWay) { this.playWay = properties.playWay }
            if (properties.state) { this.state = properties.state }
            if (properties.stages) { this.stages = []; properties.stages.forEach((value, index)=>{this.stages[index] = HonourPointStage.create(properties.stages[index]) as any})}
            if (properties.updateAt) { this.updateAt = properties.updateAt }
            if (properties.operator) { this.operator = properties.operator }
            if (properties.introduceImg) { this.introduceImg = properties.introduceImg }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public id?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public gameId?: string|null = ""
    @protobuf.Field.d(3, tss_match_v2_mate_SubMatchType, "optional", tss_match_v2_mate_SubMatchType.SubMatchTypeUnknown)
    public subMatchType?: tss_match_v2_mate_SubMatchType|null = tss_match_v2_mate_SubMatchType.SubMatchTypeUnknown
    @protobuf.Field.d(4, "int32", "optional", 0)
    public playWay?: number|null = 0
    @protobuf.Field.d(5, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public state?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
    @protobuf.Field.d(6, "tss_hall_usertitle_v1_HonourPointStage", "repeated")
    public stages?: HonourPointStage[] = []
    @protobuf.Field.d(7, "int64", "optional", 0)
    public updateAt?: number|null = 0
    @protobuf.Field.d(8, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(9, "string", "optional", )
    public introduceImg?: string|null = ""
}
export interface IUserHonourPointRecord {
    uid?: number|null
    changeAt?: number|null
    changeNum?: number|null
    changeWay?: tss_common_Way|null
    sign?: tss_common_Sign|null
    balanceAmount?: number|null
    operator?: string|null
    urf?: tss_common_UserRobotFlag|null
}
@protobuf.Type.d("tss_hall_usertitle_v1_UserHonourPointRecord")
export class UserHonourPointRecord extends protobuf.Message<IUserHonourPointRecord> {
    constructor(properties: Properties<IUserHonourPointRecord>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.changeAt) { this.changeAt = properties.changeAt }
            if (properties.changeNum) { this.changeNum = properties.changeNum }
            if (properties.changeWay) { this.changeWay = properties.changeWay }
            if (properties.sign) { this.sign = properties.sign }
            if (properties.balanceAmount) { this.balanceAmount = properties.balanceAmount }
            if (properties.operator) { this.operator = properties.operator }
            if (properties.urf) { this.urf = properties.urf }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public changeAt?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public changeNum?: number|null = 0
    @protobuf.Field.d(4, tss_common_Way, "optional", tss_common_Way.WayNone)
    public changeWay?: tss_common_Way|null = tss_common_Way.WayNone
    @protobuf.Field.d(5, tss_common_Sign, "optional", tss_common_Sign.SignUnknown)
    public sign?: tss_common_Sign|null = tss_common_Sign.SignUnknown
    @protobuf.Field.d(6, "int64", "optional", 0)
    public balanceAmount?: number|null = 0
    @protobuf.Field.d(7, "string", "optional", )
    public operator?: string|null = ""
    @protobuf.Field.d(8, tss_common_UserRobotFlag, "optional", tss_common_UserRobotFlag.UserRobotFlagUnknown)
    public urf?: tss_common_UserRobotFlag|null = tss_common_UserRobotFlag.UserRobotFlagUnknown
}
export interface IListUserAllTitleResp {
    userTitles?: IUserTitle[]
}
@protobuf.Type.d("tss_hall_usertitle_v1_ListUserAllTitleResp")
export class ListUserAllTitleResp extends protobuf.Message<IListUserAllTitleResp> {
    constructor(properties: Properties<IListUserAllTitleResp>) {
        super(properties);
        if (properties) {
            if (properties.userTitles) { this.userTitles = []; properties.userTitles.forEach((value, index)=>{this.userTitles[index] = UserTitle.create(properties.userTitles[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_usertitle_v1_UserTitle", "repeated")
    public userTitles?: UserTitle[] = []
}
export interface IUserHonourPointChangeView {
    isLevelUp?: boolean|null
    uid?: number|null
    titleBefore?: ISubTitleConfig
    processBefore?: number|null
    processAfter?: number|null
    titleAfter?: ISubTitleConfig[]
    levelAwards?: tss_common_IAssetItem[]
    point?: number|null
}
@protobuf.Type.d("tss_hall_usertitle_v1_UserHonourPointChangeView")
export class UserHonourPointChangeView extends protobuf.Message<IUserHonourPointChangeView> {
    constructor(properties: Properties<IUserHonourPointChangeView>) {
        super(properties);
        if (properties) {
            if (properties.isLevelUp) { this.isLevelUp = properties.isLevelUp }
            if (properties.uid) { this.uid = properties.uid }
            if (properties.titleBefore) { this.titleBefore = SubTitleConfig.create(properties.titleBefore) as any }
            if (properties.processBefore) { this.processBefore = properties.processBefore }
            if (properties.processAfter) { this.processAfter = properties.processAfter }
            if (properties.titleAfter) { this.titleAfter = []; properties.titleAfter.forEach((value, index)=>{this.titleAfter[index] = SubTitleConfig.create(properties.titleAfter[index]) as any})}
            if (properties.levelAwards) { this.levelAwards = []; properties.levelAwards.forEach((value, index)=>{this.levelAwards[index] = tss_common_AssetItem.create(properties.levelAwards[index]) as any})}
            if (properties.point) { this.point = properties.point }
        }
	}
    @protobuf.Field.d(1, "bool", "optional", false)
    public isLevelUp?: boolean|null = false
    @protobuf.Field.d(2, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(3, "tss_hall_usertitle_v1_SubTitleConfig", "optional")
    public titleBefore?: SubTitleConfig|null
    @protobuf.Field.d(4, "int64", "optional", 0)
    public processBefore?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public processAfter?: number|null = 0
    @protobuf.Field.d(6, "tss_hall_usertitle_v1_SubTitleConfig", "repeated")
    public titleAfter?: SubTitleConfig[] = []
    @protobuf.Field.d(7, "tss_common_AssetItem", "repeated")
    public levelAwards?: tss_common_AssetItem[] = []
    @protobuf.Field.d(8, "int64", "optional", 0)
    public point?: number|null = 0
}
export interface IMsgStreakWinningReward {
    rewards?: tss_common_IAssetItem[]
}
@protobuf.Type.d("tss_hall_usertitle_v1_MsgStreakWinningReward")
export class MsgStreakWinningReward extends protobuf.Message<IMsgStreakWinningReward> {
    constructor(properties: Properties<IMsgStreakWinningReward>) {
        super(properties);
        if (properties) {
            if (properties.rewards) { this.rewards = []; properties.rewards.forEach((value, index)=>{this.rewards[index] = tss_common_AssetItem.create(properties.rewards[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_common_AssetItem", "repeated")
    public rewards?: tss_common_AssetItem[] = []
}
export interface IGetUserHonourPointChangeViewResp {
    view?: IUserHonourPointChangeView
}
@protobuf.Type.d("tss_hall_usertitle_v1_GetUserHonourPointChangeViewResp")
export class GetUserHonourPointChangeViewResp extends protobuf.Message<IGetUserHonourPointChangeViewResp> {
    constructor(properties: Properties<IGetUserHonourPointChangeViewResp>) {
        super(properties);
        if (properties) {
            if (properties.view) { this.view = UserHonourPointChangeView.create(properties.view) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_usertitle_v1_UserHonourPointChangeView", "optional")
    public view?: UserHonourPointChangeView|null
}
export interface ISaveHonourPointAssetConfigReq {
    config?: IHonourPointAssetConfig
}
@protobuf.Type.d("tss_hall_usertitle_v1_SaveHonourPointAssetConfigReq")
export class SaveHonourPointAssetConfigReq extends protobuf.Message<ISaveHonourPointAssetConfigReq> {
    constructor(properties: Properties<ISaveHonourPointAssetConfigReq>) {
        super(properties);
        if (properties) {
            if (properties.config) { this.config = HonourPointAssetConfig.create(properties.config) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_usertitle_v1_HonourPointAssetConfig", "optional")
    public config?: HonourPointAssetConfig|null
}
export interface ISaveHonourPointConfigReq {
    config?: IHonourPointConfig
}
@protobuf.Type.d("tss_hall_usertitle_v1_SaveHonourPointConfigReq")
export class SaveHonourPointConfigReq extends protobuf.Message<ISaveHonourPointConfigReq> {
    constructor(properties: Properties<ISaveHonourPointConfigReq>) {
        super(properties);
        if (properties) {
            if (properties.config) { this.config = HonourPointConfig.create(properties.config) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_usertitle_v1_HonourPointConfig", "optional")
    public config?: HonourPointConfig|null
}
export interface IGetHonourPointConfigResp {
    config?: IHonourPointConfig
}
@protobuf.Type.d("tss_hall_usertitle_v1_GetHonourPointConfigResp")
export class GetHonourPointConfigResp extends protobuf.Message<IGetHonourPointConfigResp> {
    constructor(properties: Properties<IGetHonourPointConfigResp>) {
        super(properties);
        if (properties) {
            if (properties.config) { this.config = HonourPointConfig.create(properties.config) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_usertitle_v1_HonourPointConfig", "optional")
    public config?: HonourPointConfig|null
}
export interface ISaveTitleConfigReq {
    config?: ITitleConfig
}
@protobuf.Type.d("tss_hall_usertitle_v1_SaveTitleConfigReq")
export class SaveTitleConfigReq extends protobuf.Message<ISaveTitleConfigReq> {
    constructor(properties: Properties<ISaveTitleConfigReq>) {
        super(properties);
        if (properties) {
            if (properties.config) { this.config = TitleConfig.create(properties.config) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_usertitle_v1_TitleConfig", "optional")
    public config?: TitleConfig|null
}
export interface IGetTitleConfigResp {
    config?: ITitleConfig
}
@protobuf.Type.d("tss_hall_usertitle_v1_GetTitleConfigResp")
export class GetTitleConfigResp extends protobuf.Message<IGetTitleConfigResp> {
    constructor(properties: Properties<IGetTitleConfigResp>) {
        super(properties);
        if (properties) {
            if (properties.config) { this.config = TitleConfig.create(properties.config) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_usertitle_v1_TitleConfig", "optional")
    public config?: TitleConfig|null
}
export interface IGetUserTitleResp {
    userTitle?: IUserTitle
}
@protobuf.Type.d("tss_hall_usertitle_v1_GetUserTitleResp")
export class GetUserTitleResp extends protobuf.Message<IGetUserTitleResp> {
    constructor(properties: Properties<IGetUserTitleResp>) {
        super(properties);
        if (properties) {
            if (properties.userTitle) { this.userTitle = UserTitle.create(properties.userTitle) as any }
        }
	}
    @protobuf.Field.d(1, "tss_hall_usertitle_v1_UserTitle", "optional")
    public userTitle?: UserTitle|null
}
export interface IListUserHonourPointRecordResp {
    records?: IUserHonourPointRecord[]
    total?: number|null
}
@protobuf.Type.d("tss_hall_usertitle_v1_ListUserHonourPointRecordResp")
export class ListUserHonourPointRecordResp extends protobuf.Message<IListUserHonourPointRecordResp> {
    constructor(properties: Properties<IListUserHonourPointRecordResp>) {
        super(properties);
        if (properties) {
            if (properties.records) { this.records = []; properties.records.forEach((value, index)=>{this.records[index] = UserHonourPointRecord.create(properties.records[index]) as any})}
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "tss_hall_usertitle_v1_UserHonourPointRecord", "repeated")
    public records?: UserHonourPointRecord[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public total?: number|null = 0
}
class $TitleService extends RpcService {
    async GetHonourPointAssetConfig(req: base_IVoid, params?: RpcParams) : Promise<{err:number, resp:IGetHonourPointAssetConfigResp}> {
        let data = base_Void.create(req)
        this.onBeforeReq("GetHonourPointAssetConfig", data, params)
        const buffer = base_Void.encode(data).finish()
        let [err, pack] = await this.call("GetHonourPointAssetConfig", buffer, params)
        if (err) {
            this.onBeforeResp("GetHonourPointAssetConfig", err)
            return {err: err, resp: null}
        } else {
            let resp = GetHonourPointAssetConfigResp.decode(pack) as any
            this.onBeforeResp("GetHonourPointAssetConfig", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SaveHonourPointAssetConfig(req: ISaveHonourPointAssetConfigReq, params?: RpcParams) : Promise<{err:number, resp:IGetTitleConfigResp}> {
        let data = SaveHonourPointAssetConfigReq.create(req)
        this.onBeforeReq("SaveHonourPointAssetConfig", data, params)
        const buffer = SaveHonourPointAssetConfigReq.encode(data).finish()
        let [err, pack] = await this.call("SaveHonourPointAssetConfig", buffer, params)
        if (err) {
            this.onBeforeResp("SaveHonourPointAssetConfig", err)
            return {err: err, resp: null}
        } else {
            let resp = GetTitleConfigResp.decode(pack) as any
            this.onBeforeResp("SaveHonourPointAssetConfig", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetTitleConfig(req: IGetTitleConfigReq, params?: RpcParams) : Promise<{err:number, resp:IGetTitleConfigResp}> {
        let data = GetTitleConfigReq.create(req)
        this.onBeforeReq("GetTitleConfig", data, params)
        const buffer = GetTitleConfigReq.encode(data).finish()
        let [err, pack] = await this.call("GetTitleConfig", buffer, params)
        if (err) {
            this.onBeforeResp("GetTitleConfig", err)
            return {err: err, resp: null}
        } else {
            let resp = GetTitleConfigResp.decode(pack) as any
            this.onBeforeResp("GetTitleConfig", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListTitleConfig(req: IListTitleConfigReq, params?: RpcParams) : Promise<{err:number, resp:IListTitleConfigResp}> {
        let data = ListTitleConfigReq.create(req)
        this.onBeforeReq("ListTitleConfig", data, params)
        const buffer = ListTitleConfigReq.encode(data).finish()
        let [err, pack] = await this.call("ListTitleConfig", buffer, params)
        if (err) {
            this.onBeforeResp("ListTitleConfig", err)
            return {err: err, resp: null}
        } else {
            let resp = ListTitleConfigResp.decode(pack) as any
            this.onBeforeResp("ListTitleConfig", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SaveTitleConfig(req: ISaveTitleConfigReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = SaveTitleConfigReq.create(req)
        this.onBeforeReq("SaveTitleConfig", data, params)
        const buffer = SaveTitleConfigReq.encode(data).finish()
        let [err, pack] = await this.call("SaveTitleConfig", buffer, params)
        if (err) {
            this.onBeforeResp("SaveTitleConfig", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("SaveTitleConfig", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DeleteTitleConfig(req: IDeleteTitleConfigReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = DeleteTitleConfigReq.create(req)
        this.onBeforeReq("DeleteTitleConfig", data, params)
        const buffer = DeleteTitleConfigReq.encode(data).finish()
        let [err, pack] = await this.call("DeleteTitleConfig", buffer, params)
        if (err) {
            this.onBeforeResp("DeleteTitleConfig", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("DeleteTitleConfig", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetHonourPointConfig(req: IGetHonourPointConfigReq, params?: RpcParams) : Promise<{err:number, resp:IGetHonourPointConfigResp}> {
        let data = GetHonourPointConfigReq.create(req)
        this.onBeforeReq("GetHonourPointConfig", data, params)
        const buffer = GetHonourPointConfigReq.encode(data).finish()
        let [err, pack] = await this.call("GetHonourPointConfig", buffer, params)
        if (err) {
            this.onBeforeResp("GetHonourPointConfig", err)
            return {err: err, resp: null}
        } else {
            let resp = GetHonourPointConfigResp.decode(pack) as any
            this.onBeforeResp("GetHonourPointConfig", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SaveHonourPointConfig(req: ISaveHonourPointConfigReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = SaveHonourPointConfigReq.create(req)
        this.onBeforeReq("SaveHonourPointConfig", data, params)
        const buffer = SaveHonourPointConfigReq.encode(data).finish()
        let [err, pack] = await this.call("SaveHonourPointConfig", buffer, params)
        if (err) {
            this.onBeforeResp("SaveHonourPointConfig", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("SaveHonourPointConfig", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ChangeUserHonourPoint(req: IChangeUserHonourPointReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = ChangeUserHonourPointReq.create(req)
        this.onBeforeReq("ChangeUserHonourPoint", data, params)
        const buffer = ChangeUserHonourPointReq.encode(data).finish()
        let [err, pack] = await this.call("ChangeUserHonourPoint", buffer, params)
        if (err) {
            this.onBeforeResp("ChangeUserHonourPoint", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("ChangeUserHonourPoint", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchChangeUserHonourPoint(req: IBatchChangeUserHonourPointReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = BatchChangeUserHonourPointReq.create(req)
        this.onBeforeReq("BatchChangeUserHonourPoint", data, params)
        const buffer = BatchChangeUserHonourPointReq.encode(data).finish()
        let [err, pack] = await this.call("BatchChangeUserHonourPoint", buffer, params)
        if (err) {
            this.onBeforeResp("BatchChangeUserHonourPoint", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("BatchChangeUserHonourPoint", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListUserHonourPointRecord(req: IListUserHonourPointRecordReq, params?: RpcParams) : Promise<{err:number, resp:IListUserHonourPointRecordResp}> {
        let data = ListUserHonourPointRecordReq.create(req)
        this.onBeforeReq("ListUserHonourPointRecord", data, params)
        const buffer = ListUserHonourPointRecordReq.encode(data).finish()
        let [err, pack] = await this.call("ListUserHonourPointRecord", buffer, params)
        if (err) {
            this.onBeforeResp("ListUserHonourPointRecord", err)
            return {err: err, resp: null}
        } else {
            let resp = ListUserHonourPointRecordResp.decode(pack) as any
            this.onBeforeResp("ListUserHonourPointRecord", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchReportUserTitle(req: IBatchReportUserTitleReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = BatchReportUserTitleReq.create(req)
        this.onBeforeReq("BatchReportUserTitle", data, params)
        const buffer = BatchReportUserTitleReq.encode(data).finish()
        let [err, pack] = await this.call("BatchReportUserTitle", buffer, params)
        if (err) {
            this.onBeforeResp("BatchReportUserTitle", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("BatchReportUserTitle", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchFreezeUserTitle(req: IBatchFreezeUserTitleReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = BatchFreezeUserTitleReq.create(req)
        this.onBeforeReq("BatchFreezeUserTitle", data, params)
        const buffer = BatchFreezeUserTitleReq.encode(data).finish()
        let [err, pack] = await this.call("BatchFreezeUserTitle", buffer, params)
        if (err) {
            this.onBeforeResp("BatchFreezeUserTitle", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("BatchFreezeUserTitle", err, resp)
            return {err: null, resp: resp}
        }
    }
    async RecoverUserStreakWinningCount(req: IRecoverUserStreakWinningCountReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = RecoverUserStreakWinningCountReq.create(req)
        this.onBeforeReq("RecoverUserStreakWinningCount", data, params)
        const buffer = RecoverUserStreakWinningCountReq.encode(data).finish()
        let [err, pack] = await this.call("RecoverUserStreakWinningCount", buffer, params)
        if (err) {
            this.onBeforeResp("RecoverUserStreakWinningCount", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("RecoverUserStreakWinningCount", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetUserTitle(req: IGetUserTitleReq, params?: RpcParams) : Promise<{err:number, resp:IGetUserTitleResp}> {
        let data = GetUserTitleReq.create(req)
        this.onBeforeReq("GetUserTitle", data, params)
        const buffer = GetUserTitleReq.encode(data).finish()
        let [err, pack] = await this.call("GetUserTitle", buffer, params)
        if (err) {
            this.onBeforeResp("GetUserTitle", err)
            return {err: err, resp: null}
        } else {
            let resp = GetUserTitleResp.decode(pack) as any
            this.onBeforeResp("GetUserTitle", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetUserTitle(req: IBatchGetUserTitleReq, params?: RpcParams) : Promise<{err:number, resp:IBatchGetUserTitleResp}> {
        let data = BatchGetUserTitleReq.create(req)
        this.onBeforeReq("BatchGetUserTitle", data, params)
        const buffer = BatchGetUserTitleReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetUserTitle", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetUserTitle", err)
            return {err: err, resp: null}
        } else {
            let resp = BatchGetUserTitleResp.decode(pack) as any
            this.onBeforeResp("BatchGetUserTitle", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListUserAllTitle(req: IListUserAllTitleReq, params?: RpcParams) : Promise<{err:number, resp:IListUserAllTitleResp}> {
        let data = ListUserAllTitleReq.create(req)
        this.onBeforeReq("ListUserAllTitle", data, params)
        const buffer = ListUserAllTitleReq.encode(data).finish()
        let [err, pack] = await this.call("ListUserAllTitle", buffer, params)
        if (err) {
            this.onBeforeResp("ListUserAllTitle", err)
            return {err: err, resp: null}
        } else {
            let resp = ListUserAllTitleResp.decode(pack) as any
            this.onBeforeResp("ListUserAllTitle", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetUserHonourPointChangeView(req: IGetUserHonourPointChangeViewReq, params?: RpcParams) : Promise<{err:number, resp:IGetUserHonourPointChangeViewResp}> {
        let data = GetUserHonourPointChangeViewReq.create(req)
        this.onBeforeReq("GetUserHonourPointChangeView", data, params)
        const buffer = GetUserHonourPointChangeViewReq.encode(data).finish()
        let [err, pack] = await this.call("GetUserHonourPointChangeView", buffer, params)
        if (err) {
            this.onBeforeResp("GetUserHonourPointChangeView", err)
            return {err: err, resp: null}
        } else {
            let resp = GetUserHonourPointChangeViewResp.decode(pack) as any
            this.onBeforeResp("GetUserHonourPointChangeView", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetUserStreakWinningProtectChance(req: IGetUserStreakWinningProtectChanceReq, params?: RpcParams) : Promise<{err:number, resp:IGetUserStreakWinningProtectChanceResp}> {
        let data = GetUserStreakWinningProtectChanceReq.create(req)
        this.onBeforeReq("GetUserStreakWinningProtectChance", data, params)
        const buffer = GetUserStreakWinningProtectChanceReq.encode(data).finish()
        let [err, pack] = await this.call("GetUserStreakWinningProtectChance", buffer, params)
        if (err) {
            this.onBeforeResp("GetUserStreakWinningProtectChance", err)
            return {err: err, resp: null}
        } else {
            let resp = GetUserStreakWinningProtectChanceResp.decode(pack) as any
            this.onBeforeResp("GetUserStreakWinningProtectChance", err, resp)
            return {err: null, resp: resp}
        }
    }
    NotifyStreakWinningReward(data: Uint8Array, params: RpcParams) : {msg: IMsgStreakWinningReward, eventID?: number} {
        let msg = MsgStreakWinningReward.decode(data)
        return {msg: msg}
    }
}
export const TitleService = new $TitleService({
    name: "tss.hall.usertitle.v1",
})
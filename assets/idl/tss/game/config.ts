import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  ExceptionResp as base_ExceptionResp,IExceptionResp as base_IExceptionResp ,  BatchGetResourceReq as base_BatchGetResourceReq,IBatchGetResourceReq as base_IBatchGetResourceReq ,  BatchGetResourceResp as base_BatchGetResourceResp,IBatchGetResourceResp as base_IBatchGetResourceResp ,  } from "idl/base/base"
import {  GamePlayOption as tss_game_GamePlayOption,IGamePlayOption as tss_game_IGamePlayOption ,  GameBriefInfo as tss_game_GameBriefInfo,IGameBriefInfo as tss_game_IGameBriefInfo ,  } from "idl/tss/game/common"
export enum MatchType {  
    MatchTypeMatching = 0,  
    MatchTypeRegular = 1,
}
export enum CustomCfgType {  
    CustomCfgTypeNumber = 0,  
    CustomCfgTypeString = 1,  
    CustomCfgTypeBoolean = 2,
}
export interface IMatchingMatchConfig {
    ComboNum?: number|null
    RobotMaxNumPerTable?: number|null
    MinAccessRobotSec?: number|null
    MaxAccessRobotSec?: number|null
    IsAccessRobot?: boolean|null
    IsSwapSeat?: boolean|null
    IsOpenMatching?: boolean|null
    DetailURL?: string|null
    MatchKitVer?: string|null
    MatchName?: string|null
    MatchImg?: string|null
    GangUpImg?: string|null
}
@protobuf.Type.d("tss_game_config_MatchingMatchConfig")
export class MatchingMatchConfig extends protobuf.Message<IMatchingMatchConfig> {
    constructor(properties: Properties<IMatchingMatchConfig>) {
        super(properties);
        if (properties) {
            if (properties.ComboNum) { this.ComboNum = properties.ComboNum }
            if (properties.RobotMaxNumPerTable) { this.RobotMaxNumPerTable = properties.RobotMaxNumPerTable }
            if (properties.MinAccessRobotSec) { this.MinAccessRobotSec = properties.MinAccessRobotSec }
            if (properties.MaxAccessRobotSec) { this.MaxAccessRobotSec = properties.MaxAccessRobotSec }
            if (properties.IsAccessRobot) { this.IsAccessRobot = properties.IsAccessRobot }
            if (properties.IsSwapSeat) { this.IsSwapSeat = properties.IsSwapSeat }
            if (properties.IsOpenMatching) { this.IsOpenMatching = properties.IsOpenMatching }
            if (properties.DetailURL) { this.DetailURL = properties.DetailURL }
            if (properties.MatchKitVer) { this.MatchKitVer = properties.MatchKitVer }
            if (properties.MatchName) { this.MatchName = properties.MatchName }
            if (properties.MatchImg) { this.MatchImg = properties.MatchImg }
            if (properties.GangUpImg) { this.GangUpImg = properties.GangUpImg }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public ComboNum?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public RobotMaxNumPerTable?: number|null = 0
    @protobuf.Field.d(3, "int32", "optional", 0)
    public MinAccessRobotSec?: number|null = 0
    @protobuf.Field.d(4, "int32", "optional", 0)
    public MaxAccessRobotSec?: number|null = 0
    @protobuf.Field.d(5, "bool", "optional", false)
    public IsAccessRobot?: boolean|null = false
    @protobuf.Field.d(6, "bool", "optional", false)
    public IsSwapSeat?: boolean|null = false
    @protobuf.Field.d(7, "bool", "optional", false)
    public IsOpenMatching?: boolean|null = false
    @protobuf.Field.d(8, "string", "optional", )
    public DetailURL?: string|null = ""
    @protobuf.Field.d(9, "string", "optional", )
    public MatchKitVer?: string|null = ""
    @protobuf.Field.d(10, "string", "optional", )
    public MatchName?: string|null = ""
    @protobuf.Field.d(11, "string", "optional", )
    public MatchImg?: string|null = ""
    @protobuf.Field.d(12, "string", "optional", )
    public GangUpImg?: string|null = ""
}
export interface IMatchConfig {
    GameDeadline?: number|null
    IsOpenPunish?: boolean|null
    PunishNorm?: number|null
    GameTips?: string[]
}
@protobuf.Type.d("tss_game_config_MatchConfig")
export class MatchConfig extends protobuf.Message<IMatchConfig> {
    constructor(properties: Properties<IMatchConfig>) {
        super(properties);
        if (properties) {
            if (properties.GameDeadline) { this.GameDeadline = properties.GameDeadline }
            if (properties.IsOpenPunish) { this.IsOpenPunish = properties.IsOpenPunish }
            if (properties.PunishNorm) { this.PunishNorm = properties.PunishNorm }
            if (properties.GameTips) { this.GameTips = []; properties.GameTips.forEach((value, index)=>{this.GameTips[index] = properties.GameTips[index]})}
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public GameDeadline?: number|null = 0
    @protobuf.Field.d(2, "bool", "optional", false)
    public IsOpenPunish?: boolean|null = false
    @protobuf.Field.d(3, "int32", "optional", 0)
    public PunishNorm?: number|null = 0
    @protobuf.Field.d(4, "string", "repeated", [])
    public GameTips?: string[] = []
}
export interface ICustomCfgItem {
    name?: string|null
    key?: string|null
    value?: string|null
    type?: CustomCfgType|null
    isClient?: boolean|null
    isOpen?: boolean|null
}
@protobuf.Type.d("tss_game_config_CustomCfgItem")
export class CustomCfgItem extends protobuf.Message<ICustomCfgItem> {
    constructor(properties: Properties<ICustomCfgItem>) {
        super(properties);
        if (properties) {
            if (properties.name) { this.name = properties.name }
            if (properties.key) { this.key = properties.key }
            if (properties.value) { this.value = properties.value }
            if (properties.type) { this.type = properties.type }
            if (properties.isClient) { this.isClient = properties.isClient }
            if (properties.isOpen) { this.isOpen = properties.isOpen }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public key?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public value?: string|null = ""
    @protobuf.Field.d(4, CustomCfgType, "optional", CustomCfgType.CustomCfgTypeNumber)
    public type?: CustomCfgType|null = CustomCfgType.CustomCfgTypeNumber
    @protobuf.Field.d(5, "bool", "optional", false)
    public isClient?: boolean|null = false
    @protobuf.Field.d(6, "bool", "optional", false)
    public isOpen?: boolean|null = false
}
export interface IGameConfig {
    matchType?: number|null
    customCfg?: Uint8Array
    matchCfg?: IMatchConfig
    matchingMatchCfg?: IMatchingMatchConfig
    customItems?: ICustomCfgItem[]
    playOption?: number|null
}
@protobuf.Type.d("tss_game_config_GameConfig")
export class GameConfig extends protobuf.Message<IGameConfig> {
    constructor(properties: Properties<IGameConfig>) {
        super(properties);
        if (properties) {
            if (properties.matchType) { this.matchType = properties.matchType }
            if (properties.customCfg) { this.customCfg = properties.customCfg }
            if (properties.matchCfg) { this.matchCfg = MatchConfig.create(properties.matchCfg) as any }
            if (properties.matchingMatchCfg) { this.matchingMatchCfg = MatchingMatchConfig.create(properties.matchingMatchCfg) as any }
            if (properties.customItems) { this.customItems = []; properties.customItems.forEach((value, index)=>{this.customItems[index] = CustomCfgItem.create(properties.customItems[index]) as any})}
            if (properties.playOption) { this.playOption = properties.playOption }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public matchType?: number|null = 0
    @protobuf.Field.d(2, "bytes", "optional", [])
    public customCfg?: Uint8Array
    @protobuf.Field.d(3, "tss_game_config_MatchConfig", "optional")
    public matchCfg?: MatchConfig|null
    @protobuf.Field.d(4, "tss_game_config_MatchingMatchConfig", "optional")
    public matchingMatchCfg?: MatchingMatchConfig|null
    @protobuf.Field.d(5, "tss_game_config_CustomCfgItem", "repeated")
    public customItems?: CustomCfgItem[] = []
    @protobuf.Field.d(6, "int32", "optional", 0)
    public playOption?: number|null = 0
}
export interface ISetGameCfgResp {
    code?: number|null
}
@protobuf.Type.d("tss_game_config_SetGameCfgResp")
export class SetGameCfgResp extends protobuf.Message<ISetGameCfgResp> {
    constructor(properties: Properties<ISetGameCfgResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
}
export interface IGetGameCfgReq {
    gameID?: string|null
    matchType?: number|null
}
@protobuf.Type.d("tss_game_config_GetGameCfgReq")
export class GetGameCfgReq extends protobuf.Message<IGetGameCfgReq> {
    constructor(properties: Properties<IGetGameCfgReq>) {
        super(properties);
        if (properties) {
            if (properties.gameID) { this.gameID = properties.gameID }
            if (properties.matchType) { this.matchType = properties.matchType }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public gameID?: string|null = ""
    @protobuf.Field.d(2, "int32", "optional", 0)
    public matchType?: number|null = 0
}
export interface IGetGameCfgResp {
    code?: number|null
    gameConfig?: IGameConfig
}
@protobuf.Type.d("tss_game_config_GetGameCfgResp")
export class GetGameCfgResp extends protobuf.Message<IGetGameCfgResp> {
    constructor(properties: Properties<IGetGameCfgResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.gameConfig) { this.gameConfig = GameConfig.create(properties.gameConfig) as any }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
    @protobuf.Field.d(2, "tss_game_config_GameConfig", "optional")
    public gameConfig?: GameConfig|null
}
export interface IGetMatchCfgResp {
    code?: number|null
    matchCfg?: IMatchConfig
    matchingMatchCfg?: IMatchingMatchConfig
}
@protobuf.Type.d("tss_game_config_GetMatchCfgResp")
export class GetMatchCfgResp extends protobuf.Message<IGetMatchCfgResp> {
    constructor(properties: Properties<IGetMatchCfgResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.matchCfg) { this.matchCfg = MatchConfig.create(properties.matchCfg) as any }
            if (properties.matchingMatchCfg) { this.matchingMatchCfg = MatchingMatchConfig.create(properties.matchingMatchCfg) as any }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
    @protobuf.Field.d(2, "tss_game_config_MatchConfig", "optional")
    public matchCfg?: MatchConfig|null
    @protobuf.Field.d(3, "tss_game_config_MatchingMatchConfig", "optional")
    public matchingMatchCfg?: MatchingMatchConfig|null
}
export interface IGetCustomCfgResp {
    code?: number|null
    customCfg?: Uint8Array
    customItems?: ICustomCfgItem[]
}
@protobuf.Type.d("tss_game_config_GetCustomCfgResp")
export class GetCustomCfgResp extends protobuf.Message<IGetCustomCfgResp> {
    constructor(properties: Properties<IGetCustomCfgResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.customCfg) { this.customCfg = properties.customCfg }
            if (properties.customItems) { this.customItems = []; properties.customItems.forEach((value, index)=>{this.customItems[index] = CustomCfgItem.create(properties.customItems[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
    @protobuf.Field.d(2, "bytes", "optional", [])
    public customCfg?: Uint8Array
    @protobuf.Field.d(3, "tss_game_config_CustomCfgItem", "repeated")
    public customItems?: CustomCfgItem[] = []
}
export interface IGetGameDataReq {
    gameID?: string|null
}
@protobuf.Type.d("tss_game_config_GetGameDataReq")
export class GetGameDataReq extends protobuf.Message<IGetGameDataReq> {
    constructor(properties: Properties<IGetGameDataReq>) {
        super(properties);
        if (properties) {
            if (properties.gameID) { this.gameID = properties.gameID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public gameID?: string|null = ""
}
export interface IGameInfo {
    name?: string|null
    gameId?: string|null
    icon?: string|null
    desc?: string|null
    descImgs?: string[]
    ruleDesc?: string|null
    ruleURLs?: string[]
    sort?: number|null
    status?: number|null
    slogan?: string|null
    backImg?: string|null
    levelConf?: string|null
    resourceImgs?: string[]
    type?: number|null
    tags?: string[]
    regionID?: number|null
    myGameIcon?: string|null
    playerNum?: number|null
    isOpen?: boolean|null
    subType?: number|null
    tips?: string[]
    playOptions?: tss_game_IGamePlayOption[]
    counterID?: number|null
    channelCfg?: IChannelInfo[]
}
@protobuf.Type.d("tss_game_config_GameInfo")
export class GameInfo extends protobuf.Message<IGameInfo> {
    constructor(properties: Properties<IGameInfo>) {
        super(properties);
        if (properties) {
            if (properties.name) { this.name = properties.name }
            if (properties.gameId) { this.gameId = properties.gameId }
            if (properties.icon) { this.icon = properties.icon }
            if (properties.desc) { this.desc = properties.desc }
            if (properties.descImgs) { this.descImgs = []; properties.descImgs.forEach((value, index)=>{this.descImgs[index] = properties.descImgs[index]})}
            if (properties.ruleDesc) { this.ruleDesc = properties.ruleDesc }
            if (properties.ruleURLs) { this.ruleURLs = []; properties.ruleURLs.forEach((value, index)=>{this.ruleURLs[index] = properties.ruleURLs[index]})}
            if (properties.sort) { this.sort = properties.sort }
            if (properties.status) { this.status = properties.status }
            if (properties.slogan) { this.slogan = properties.slogan }
            if (properties.backImg) { this.backImg = properties.backImg }
            if (properties.levelConf) { this.levelConf = properties.levelConf }
            if (properties.resourceImgs) { this.resourceImgs = []; properties.resourceImgs.forEach((value, index)=>{this.resourceImgs[index] = properties.resourceImgs[index]})}
            if (properties.type) { this.type = properties.type }
            if (properties.tags) { this.tags = []; properties.tags.forEach((value, index)=>{this.tags[index] = properties.tags[index]})}
            if (properties.regionID) { this.regionID = properties.regionID }
            if (properties.myGameIcon) { this.myGameIcon = properties.myGameIcon }
            if (properties.playerNum) { this.playerNum = properties.playerNum }
            if (properties.isOpen) { this.isOpen = properties.isOpen }
            if (properties.subType) { this.subType = properties.subType }
            if (properties.tips) { this.tips = []; properties.tips.forEach((value, index)=>{this.tips[index] = properties.tips[index]})}
            if (properties.playOptions) { this.playOptions = []; properties.playOptions.forEach((value, index)=>{this.playOptions[index] = tss_game_GamePlayOption.create(properties.playOptions[index]) as any})}
            if (properties.counterID) { this.counterID = properties.counterID }
            if (properties.channelCfg) { this.channelCfg = []; properties.channelCfg.forEach((value, index)=>{this.channelCfg[index] = ChannelInfo.create(properties.channelCfg[index]) as any})}
        }
	}
    @protobuf.Field.d(2, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public gameId?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public icon?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public desc?: string|null = ""
    @protobuf.Field.d(6, "string", "repeated", [])
    public descImgs?: string[] = []
    @protobuf.Field.d(7, "string", "optional", )
    public ruleDesc?: string|null = ""
    @protobuf.Field.d(8, "string", "repeated", [])
    public ruleURLs?: string[] = []
    @protobuf.Field.d(9, "uint32", "optional", 0)
    public sort?: number|null = 0
    @protobuf.Field.d(10, "uint32", "optional", 0)
    public status?: number|null = 0
    @protobuf.Field.d(11, "string", "optional", )
    public slogan?: string|null = ""
    @protobuf.Field.d(12, "string", "optional", )
    public backImg?: string|null = ""
    @protobuf.Field.d(13, "string", "optional", )
    public levelConf?: string|null = ""
    @protobuf.Field.d(14, "string", "repeated", [])
    public resourceImgs?: string[] = []
    @protobuf.Field.d(15, "int32", "optional", 0)
    public type?: number|null = 0
    @protobuf.Field.d(16, "string", "repeated", [])
    public tags?: string[] = []
    @protobuf.Field.d(17, "int32", "optional", 0)
    public regionID?: number|null = 0
    @protobuf.Field.d(18, "string", "optional", )
    public myGameIcon?: string|null = ""
    @protobuf.Field.d(19, "int32", "optional", 0)
    public playerNum?: number|null = 0
    @protobuf.Field.d(20, "bool", "optional", false)
    public isOpen?: boolean|null = false
    @protobuf.Field.d(21, "int32", "optional", 0)
    public subType?: number|null = 0
    @protobuf.Field.d(22, "string", "repeated", [])
    public tips?: string[] = []
    @protobuf.Field.d(23, "tss_game_GamePlayOption", "repeated")
    public playOptions?: tss_game_GamePlayOption[] = []
    @protobuf.Field.d(24, "int64", "optional", 0)
    public counterID?: number|null = 0
    @protobuf.Field.d(25, "tss_game_config_ChannelInfo", "repeated")
    public channelCfg?: ChannelInfo[] = []
}
export interface IGetGameInfoListResp {
    code?: number|null
    games?: IGameInfo[]
}
@protobuf.Type.d("tss_game_config_GetGameInfoListResp")
export class GetGameInfoListResp extends protobuf.Message<IGetGameInfoListResp> {
    constructor(properties: Properties<IGetGameInfoListResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.games) { this.games = []; properties.games.forEach((value, index)=>{this.games[index] = GameInfo.create(properties.games[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
    @protobuf.Field.d(2, "tss_game_config_GameInfo", "repeated")
    public games?: GameInfo[] = []
}
export interface IChannelInfo {
    id?: string|null
    minAppVersion?: number|null
    maxAppVersion?: number|null
    updateAt?: number|null
    updateUser?: string|null
    mateMatchIcon?: string|null
    mateMatchCard?: string|null
    createAt?: number|null
    uuid?: string|null
}
@protobuf.Type.d("tss_game_config_ChannelInfo")
export class ChannelInfo extends protobuf.Message<IChannelInfo> {
    constructor(properties: Properties<IChannelInfo>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.minAppVersion) { this.minAppVersion = properties.minAppVersion }
            if (properties.maxAppVersion) { this.maxAppVersion = properties.maxAppVersion }
            if (properties.updateAt) { this.updateAt = properties.updateAt }
            if (properties.updateUser) { this.updateUser = properties.updateUser }
            if (properties.mateMatchIcon) { this.mateMatchIcon = properties.mateMatchIcon }
            if (properties.mateMatchCard) { this.mateMatchCard = properties.mateMatchCard }
            if (properties.createAt) { this.createAt = properties.createAt }
            if (properties.uuid) { this.uuid = properties.uuid }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public id?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public minAppVersion?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public maxAppVersion?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public updateAt?: number|null = 0
    @protobuf.Field.d(5, "string", "optional", )
    public updateUser?: string|null = ""
    @protobuf.Field.d(6, "string", "optional", )
    public mateMatchIcon?: string|null = ""
    @protobuf.Field.d(7, "string", "optional", )
    public mateMatchCard?: string|null = ""
    @protobuf.Field.d(8, "int64", "optional", 0)
    public createAt?: number|null = 0
    @protobuf.Field.d(9, "string", "optional", )
    public uuid?: string|null = ""
}
export interface IGetGameDataResp {
    code?: number|null
    gameInfo?: IGameInfo
    gameCfgs?: IGameConfig[]
}
@protobuf.Type.d("tss_game_config_GetGameDataResp")
export class GetGameDataResp extends protobuf.Message<IGetGameDataResp> {
    constructor(properties: Properties<IGetGameDataResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.gameInfo) { this.gameInfo = GameInfo.create(properties.gameInfo) as any }
            if (properties.gameCfgs) { this.gameCfgs = []; properties.gameCfgs.forEach((value, index)=>{this.gameCfgs[index] = GameConfig.create(properties.gameCfgs[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
    @protobuf.Field.d(2, "tss_game_config_GameInfo", "optional")
    public gameInfo?: GameInfo|null
    @protobuf.Field.d(3, "tss_game_config_GameConfig", "repeated")
    public gameCfgs?: GameConfig[] = []
}
export interface IGetGameBriefInfoListReq {
    ids?: string[]
    uid?: number|null
}
@protobuf.Type.d("tss_game_config_GetGameBriefInfoListReq")
export class GetGameBriefInfoListReq extends protobuf.Message<IGetGameBriefInfoListReq> {
    constructor(properties: Properties<IGetGameBriefInfoListReq>) {
        super(properties);
        if (properties) {
            if (properties.ids) { this.ids = []; properties.ids.forEach((value, index)=>{this.ids[index] = properties.ids[index]})}
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "string", "repeated", [])
    public ids?: string[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IGetGameBriefInfoListResp {
    code?: number|null
    games?: tss_game_IGameBriefInfo[]
}
@protobuf.Type.d("tss_game_config_GetGameBriefInfoListResp")
export class GetGameBriefInfoListResp extends protobuf.Message<IGetGameBriefInfoListResp> {
    constructor(properties: Properties<IGetGameBriefInfoListResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.games) { this.games = []; properties.games.forEach((value, index)=>{this.games[index] = tss_game_GameBriefInfo.create(properties.games[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
    @protobuf.Field.d(2, "tss_game_GameBriefInfo", "repeated")
    public games?: tss_game_GameBriefInfo[] = []
}
export interface IGetGameInfoReq {
    gameId?: string|null
}
@protobuf.Type.d("tss_game_config_GetGameInfoReq")
export class GetGameInfoReq extends protobuf.Message<IGetGameInfoReq> {
    constructor(properties: Properties<IGetGameInfoReq>) {
        super(properties);
        if (properties) {
            if (properties.gameId) { this.gameId = properties.gameId }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public gameId?: string|null = ""
}
export interface IGetGameInfoResp {
    code?: number|null
    info?: IGameInfo
}
@protobuf.Type.d("tss_game_config_GetGameInfoResp")
export class GetGameInfoResp extends protobuf.Message<IGetGameInfoResp> {
    constructor(properties: Properties<IGetGameInfoResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.info) { this.info = GameInfo.create(properties.info) as any }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
    @protobuf.Field.d(2, "tss_game_config_GameInfo", "optional")
    public info?: GameInfo|null
}
export interface IAddGameReq {
    info?: IGameInfo
}
@protobuf.Type.d("tss_game_config_AddGameReq")
export class AddGameReq extends protobuf.Message<IAddGameReq> {
    constructor(properties: Properties<IAddGameReq>) {
        super(properties);
        if (properties) {
            if (properties.info) { this.info = GameInfo.create(properties.info) as any }
        }
	}
    @protobuf.Field.d(1, "tss_game_config_GameInfo", "optional")
    public info?: GameInfo|null
}
export interface IAddGameResp {
    code?: number|null
}
@protobuf.Type.d("tss_game_config_AddGameResp")
export class AddGameResp extends protobuf.Message<IAddGameResp> {
    constructor(properties: Properties<IAddGameResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
}
export interface IDelGameReq {
    gameId?: string|null
}
@protobuf.Type.d("tss_game_config_DelGameReq")
export class DelGameReq extends protobuf.Message<IDelGameReq> {
    constructor(properties: Properties<IDelGameReq>) {
        super(properties);
        if (properties) {
            if (properties.gameId) { this.gameId = properties.gameId }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public gameId?: string|null = ""
}
export interface IDelGameResp {
    code?: number|null
}
@protobuf.Type.d("tss_game_config_DelGameResp")
export class DelGameResp extends protobuf.Message<IDelGameResp> {
    constructor(properties: Properties<IDelGameResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
}
export interface IListGameBriefInfoReq {
    type?: number[]
    page?: number|null
    pageSize?: number|null
    uid?: number|null
}
@protobuf.Type.d("tss_game_config_ListGameBriefInfoReq")
export class ListGameBriefInfoReq extends protobuf.Message<IListGameBriefInfoReq> {
    constructor(properties: Properties<IListGameBriefInfoReq>) {
        super(properties);
        if (properties) {
            if (properties.type) { this.type = []; properties.type.forEach((value, index)=>{this.type[index] = properties.type[index]})}
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int32", "repeated", [])
    public type?: number[] = []
    @protobuf.Field.d(2, "int32", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(3, "int32", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IListGameBriefInfoResp {
    code?: number|null
    infos?: tss_game_IGameBriefInfo[]
    total?: number|null
}
@protobuf.Type.d("tss_game_config_ListGameBriefInfoResp")
export class ListGameBriefInfoResp extends protobuf.Message<IListGameBriefInfoResp> {
    constructor(properties: Properties<IListGameBriefInfoResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.infos) { this.infos = []; properties.infos.forEach((value, index)=>{this.infos[index] = tss_game_GameBriefInfo.create(properties.infos[index]) as any})}
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
    @protobuf.Field.d(2, "tss_game_GameBriefInfo", "repeated")
    public infos?: tss_game_GameBriefInfo[] = []
    @protobuf.Field.d(3, "int32", "optional", 0)
    public total?: number|null = 0
}
export interface IWhitelistConfig {
    isOpen?: boolean|null
    uidList?: number[]
}
@protobuf.Type.d("tss_game_config_WhitelistConfig")
export class WhitelistConfig extends protobuf.Message<IWhitelistConfig> {
    constructor(properties: Properties<IWhitelistConfig>) {
        super(properties);
        if (properties) {
            if (properties.isOpen) { this.isOpen = properties.isOpen }
            if (properties.uidList) { this.uidList = []; properties.uidList.forEach((value, index)=>{this.uidList[index] = properties.uidList[index]})}
        }
	}
    @protobuf.Field.d(1, "bool", "optional", false)
    public isOpen?: boolean|null = false
    @protobuf.Field.d(2, "int64", "repeated", [])
    public uidList?: number[] = []
}
export interface IWhitelistCfgReq {
    gameId?: string|null
    cfg?: IWhitelistConfig
}
@protobuf.Type.d("tss_game_config_WhitelistCfgReq")
export class WhitelistCfgReq extends protobuf.Message<IWhitelistCfgReq> {
    constructor(properties: Properties<IWhitelistCfgReq>) {
        super(properties);
        if (properties) {
            if (properties.gameId) { this.gameId = properties.gameId }
            if (properties.cfg) { this.cfg = WhitelistConfig.create(properties.cfg) as any }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public gameId?: string|null = ""
    @protobuf.Field.d(2, "tss_game_config_WhitelistConfig", "optional")
    public cfg?: WhitelistConfig|null
}
export interface IWhitelistCfgResp {
    code?: number|null
    cfg?: IWhitelistConfig
}
@protobuf.Type.d("tss_game_config_WhitelistCfgResp")
export class WhitelistCfgResp extends protobuf.Message<IWhitelistCfgResp> {
    constructor(properties: Properties<IWhitelistCfgResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.cfg) { this.cfg = WhitelistConfig.create(properties.cfg) as any }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
    @protobuf.Field.d(2, "tss_game_config_WhitelistConfig", "optional")
    public cfg?: WhitelistConfig|null
}
export interface IGetGameInfoListReq {
    appChannel?: string|null
    appVersion?: number|null
    gameIDs?: string[]
    isOpen?: boolean|null
}
@protobuf.Type.d("tss_game_config_GetGameInfoListReq")
export class GetGameInfoListReq extends protobuf.Message<IGetGameInfoListReq> {
    constructor(properties: Properties<IGetGameInfoListReq>) {
        super(properties);
        if (properties) {
            if (properties.appChannel) { this.appChannel = properties.appChannel }
            if (properties.appVersion) { this.appVersion = properties.appVersion }
            if (properties.gameIDs) { this.gameIDs = []; properties.gameIDs.forEach((value, index)=>{this.gameIDs[index] = properties.gameIDs[index]})}
            if (properties.isOpen) { this.isOpen = properties.isOpen }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public appChannel?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public appVersion?: number|null = 0
    @protobuf.Field.d(3, "string", "repeated", [])
    public gameIDs?: string[] = []
    @protobuf.Field.d(4, "bool", "optional", false)
    public isOpen?: boolean|null = false
}
export interface IGetGameInfoListByPageReq {
    page?: number|null
    pageSize?: number|null
    isPrimary?: boolean|null
}
@protobuf.Type.d("tss_game_config_GetGameInfoListByPageReq")
export class GetGameInfoListByPageReq extends protobuf.Message<IGetGameInfoListByPageReq> {
    constructor(properties: Properties<IGetGameInfoListByPageReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.isPrimary) { this.isPrimary = properties.isPrimary }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(3, "bool", "optional", false)
    public isPrimary?: boolean|null = false
}
export interface ISetGameCfgReq {
    gameID?: string|null
    gameConfig?: IGameConfig
}
@protobuf.Type.d("tss_game_config_SetGameCfgReq")
export class SetGameCfgReq extends protobuf.Message<ISetGameCfgReq> {
    constructor(properties: Properties<ISetGameCfgReq>) {
        super(properties);
        if (properties) {
            if (properties.gameID) { this.gameID = properties.gameID }
            if (properties.gameConfig) { this.gameConfig = GameConfig.create(properties.gameConfig) as any }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public gameID?: string|null = ""
    @protobuf.Field.d(2, "tss_game_config_GameConfig", "optional")
    public gameConfig?: GameConfig|null
}
export interface ICustomCfgList {
    data?: ICustomCfgItem[]
}
@protobuf.Type.d("tss_game_config_CustomCfgList")
export class CustomCfgList extends protobuf.Message<ICustomCfgList> {
    constructor(properties: Properties<ICustomCfgList>) {
        super(properties);
        if (properties) {
            if (properties.data) { this.data = []; properties.data.forEach((value, index)=>{this.data[index] = CustomCfgItem.create(properties.data[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_game_config_CustomCfgItem", "repeated")
    public data?: CustomCfgItem[] = []
}
export interface ISetGamePlayOptionReq {
    gameID?: string|null
    option?: tss_game_IGamePlayOption
}
@protobuf.Type.d("tss_game_config_SetGamePlayOptionReq")
export class SetGamePlayOptionReq extends protobuf.Message<ISetGamePlayOptionReq> {
    constructor(properties: Properties<ISetGamePlayOptionReq>) {
        super(properties);
        if (properties) {
            if (properties.gameID) { this.gameID = properties.gameID }
            if (properties.option) { this.option = tss_game_GamePlayOption.create(properties.option) as any }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public gameID?: string|null = ""
    @protobuf.Field.d(2, "tss_game_GamePlayOption", "optional")
    public option?: tss_game_GamePlayOption|null
}
export interface IGamePlayOption {
    id?: number|null
    name?: string|null
    seq?: number|null
}
@protobuf.Type.d("tss_game_config_GamePlayOption")
export class GamePlayOption extends protobuf.Message<IGamePlayOption> {
    constructor(properties: Properties<IGamePlayOption>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.name) { this.name = properties.name }
            if (properties.seq) { this.seq = properties.seq }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public id?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(3, "int32", "optional", 0)
    public seq?: number|null = 0
}
export interface IBatchSetGamePlayOptionReq {
    gameID?: string|null
    options?: tss_game_IGamePlayOption[]
}
@protobuf.Type.d("tss_game_config_BatchSetGamePlayOptionReq")
export class BatchSetGamePlayOptionReq extends protobuf.Message<IBatchSetGamePlayOptionReq> {
    constructor(properties: Properties<IBatchSetGamePlayOptionReq>) {
        super(properties);
        if (properties) {
            if (properties.gameID) { this.gameID = properties.gameID }
            if (properties.options) { this.options = []; properties.options.forEach((value, index)=>{this.options[index] = tss_game_GamePlayOption.create(properties.options[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public gameID?: string|null = ""
    @protobuf.Field.d(2, "tss_game_GamePlayOption", "repeated")
    public options?: tss_game_GamePlayOption[] = []
}
export interface IDelGamePlayOptionReq {
    gameID?: string|null
    id?: number|null
}
@protobuf.Type.d("tss_game_config_DelGamePlayOptionReq")
export class DelGamePlayOptionReq extends protobuf.Message<IDelGamePlayOptionReq> {
    constructor(properties: Properties<IDelGamePlayOptionReq>) {
        super(properties);
        if (properties) {
            if (properties.gameID) { this.gameID = properties.gameID }
            if (properties.id) { this.id = properties.id }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public gameID?: string|null = ""
    @protobuf.Field.d(2, "int32", "optional", 0)
    public id?: number|null = 0
}
export interface ISetGamePlayOptionResp {
    code?: number|null
    options?: tss_game_IGamePlayOption[]
}
@protobuf.Type.d("tss_game_config_SetGamePlayOptionResp")
export class SetGamePlayOptionResp extends protobuf.Message<ISetGamePlayOptionResp> {
    constructor(properties: Properties<ISetGamePlayOptionResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.options) { this.options = []; properties.options.forEach((value, index)=>{this.options[index] = tss_game_GamePlayOption.create(properties.options[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
    @protobuf.Field.d(2, "tss_game_GamePlayOption", "repeated")
    public options?: tss_game_GamePlayOption[] = []
}
export interface IBatchSetGamePlayOptionResp {
    code?: number|null
    options?: tss_game_IGamePlayOption[]
}
@protobuf.Type.d("tss_game_config_BatchSetGamePlayOptionResp")
export class BatchSetGamePlayOptionResp extends protobuf.Message<IBatchSetGamePlayOptionResp> {
    constructor(properties: Properties<IBatchSetGamePlayOptionResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.options) { this.options = []; properties.options.forEach((value, index)=>{this.options[index] = tss_game_GamePlayOption.create(properties.options[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
    @protobuf.Field.d(2, "tss_game_GamePlayOption", "repeated")
    public options?: tss_game_GamePlayOption[] = []
}
export interface IDelGamePlayOptionResp {
    code?: number|null
}
@protobuf.Type.d("tss_game_config_DelGamePlayOptionResp")
export class DelGamePlayOptionResp extends protobuf.Message<IDelGamePlayOptionResp> {
    constructor(properties: Properties<IDelGamePlayOptionResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
}
export interface IGetGamePlayOptionReq {
    gameID?: string|null
}
@protobuf.Type.d("tss_game_config_GetGamePlayOptionReq")
export class GetGamePlayOptionReq extends protobuf.Message<IGetGamePlayOptionReq> {
    constructor(properties: Properties<IGetGamePlayOptionReq>) {
        super(properties);
        if (properties) {
            if (properties.gameID) { this.gameID = properties.gameID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public gameID?: string|null = ""
}
export interface IGetGamePlayOptionResp {
    code?: number|null
    options?: IGamePlayOption[]
}
@protobuf.Type.d("tss_game_config_GetGamePlayOptionResp")
export class GetGamePlayOptionResp extends protobuf.Message<IGetGamePlayOptionResp> {
    constructor(properties: Properties<IGetGamePlayOptionResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.options) { this.options = []; properties.options.forEach((value, index)=>{this.options[index] = GamePlayOption.create(properties.options[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
    @protobuf.Field.d(2, "tss_game_config_GamePlayOption", "repeated")
    public options?: GamePlayOption[] = []
}
export interface ISetPlayOptionCfgReq {
    gameID?: string|null
    gameConfig?: IGameConfig
}
@protobuf.Type.d("tss_game_config_SetPlayOptionCfgReq")
export class SetPlayOptionCfgReq extends protobuf.Message<ISetPlayOptionCfgReq> {
    constructor(properties: Properties<ISetPlayOptionCfgReq>) {
        super(properties);
        if (properties) {
            if (properties.gameID) { this.gameID = properties.gameID }
            if (properties.gameConfig) { this.gameConfig = GameConfig.create(properties.gameConfig) as any }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public gameID?: string|null = ""
    @protobuf.Field.d(2, "tss_game_config_GameConfig", "optional")
    public gameConfig?: GameConfig|null
}
export interface ISetPlayOptionCfgResp {
    code?: number|null
}
@protobuf.Type.d("tss_game_config_SetPlayOptionCfgResp")
export class SetPlayOptionCfgResp extends protobuf.Message<ISetPlayOptionCfgResp> {
    constructor(properties: Properties<ISetPlayOptionCfgResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
}
export interface IGetPlayOptionCfgReq {
    gameID?: string|null
    playOption?: number|null
}
@protobuf.Type.d("tss_game_config_GetPlayOptionCfgReq")
export class GetPlayOptionCfgReq extends protobuf.Message<IGetPlayOptionCfgReq> {
    constructor(properties: Properties<IGetPlayOptionCfgReq>) {
        super(properties);
        if (properties) {
            if (properties.gameID) { this.gameID = properties.gameID }
            if (properties.playOption) { this.playOption = properties.playOption }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public gameID?: string|null = ""
    @protobuf.Field.d(2, "int32", "optional", 0)
    public playOption?: number|null = 0
}
export interface IGetPlayOptionCfgResp {
    code?: number|null
    gameConfig?: IGameConfig
}
@protobuf.Type.d("tss_game_config_GetPlayOptionCfgResp")
export class GetPlayOptionCfgResp extends protobuf.Message<IGetPlayOptionCfgResp> {
    constructor(properties: Properties<IGetPlayOptionCfgResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.gameConfig) { this.gameConfig = GameConfig.create(properties.gameConfig) as any }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
    @protobuf.Field.d(2, "tss_game_config_GameConfig", "optional")
    public gameConfig?: GameConfig|null
}
export interface ISetAppChannelCfgReq {
    gameID?: string|null
    data?: IChannelInfo
}
@protobuf.Type.d("tss_game_config_SetAppChannelCfgReq")
export class SetAppChannelCfgReq extends protobuf.Message<ISetAppChannelCfgReq> {
    constructor(properties: Properties<ISetAppChannelCfgReq>) {
        super(properties);
        if (properties) {
            if (properties.gameID) { this.gameID = properties.gameID }
            if (properties.data) { this.data = ChannelInfo.create(properties.data) as any }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public gameID?: string|null = ""
    @protobuf.Field.d(2, "tss_game_config_ChannelInfo", "optional")
    public data?: ChannelInfo|null
}
export interface ISetAppChannelCfgsReq {
    gameID?: string|null
    data?: IChannelInfo[]
}
@protobuf.Type.d("tss_game_config_SetAppChannelCfgsReq")
export class SetAppChannelCfgsReq extends protobuf.Message<ISetAppChannelCfgsReq> {
    constructor(properties: Properties<ISetAppChannelCfgsReq>) {
        super(properties);
        if (properties) {
            if (properties.gameID) { this.gameID = properties.gameID }
            if (properties.data) { this.data = []; properties.data.forEach((value, index)=>{this.data[index] = ChannelInfo.create(properties.data[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public gameID?: string|null = ""
    @protobuf.Field.d(2, "tss_game_config_ChannelInfo", "repeated")
    public data?: ChannelInfo[] = []
}
export interface IGetAppChannelCfgReq {
    gameID?: string|null
}
@protobuf.Type.d("tss_game_config_GetAppChannelCfgReq")
export class GetAppChannelCfgReq extends protobuf.Message<IGetAppChannelCfgReq> {
    constructor(properties: Properties<IGetAppChannelCfgReq>) {
        super(properties);
        if (properties) {
            if (properties.gameID) { this.gameID = properties.gameID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public gameID?: string|null = ""
}
export interface IGetAppChannelCfgResp {
    code?: number|null
    data?: IChannelInfo[]
}
@protobuf.Type.d("tss_game_config_GetAppChannelCfgResp")
export class GetAppChannelCfgResp extends protobuf.Message<IGetAppChannelCfgResp> {
    constructor(properties: Properties<IGetAppChannelCfgResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.data) { this.data = []; properties.data.forEach((value, index)=>{this.data[index] = ChannelInfo.create(properties.data[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
    @protobuf.Field.d(2, "tss_game_config_ChannelInfo", "repeated")
    public data?: ChannelInfo[] = []
}
export interface IListOpenGamesReq {
    page?: number|null
    pageSize?: number|null
    appChannel?: string|null
    appVersion?: string|null
    gameIDs?: string[]
    isBrief?: boolean|null
}
@protobuf.Type.d("tss_game_config_ListOpenGamesReq")
export class ListOpenGamesReq extends protobuf.Message<IListOpenGamesReq> {
    constructor(properties: Properties<IListOpenGamesReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.appChannel) { this.appChannel = properties.appChannel }
            if (properties.appVersion) { this.appVersion = properties.appVersion }
            if (properties.gameIDs) { this.gameIDs = []; properties.gameIDs.forEach((value, index)=>{this.gameIDs[index] = properties.gameIDs[index]})}
            if (properties.isBrief) { this.isBrief = properties.isBrief }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public appChannel?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public appVersion?: string|null = ""
    @protobuf.Field.d(5, "string", "repeated", [])
    public gameIDs?: string[] = []
    @protobuf.Field.d(6, "bool", "optional", false)
    public isBrief?: boolean|null = false
}
export interface IListOpenGamesResp {
    code?: number|null
    games?: IGameInfo[]
    briefInfos?: tss_game_IGameBriefInfo[]
}
@protobuf.Type.d("tss_game_config_ListOpenGamesResp")
export class ListOpenGamesResp extends protobuf.Message<IListOpenGamesResp> {
    constructor(properties: Properties<IListOpenGamesResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.games) { this.games = []; properties.games.forEach((value, index)=>{this.games[index] = GameInfo.create(properties.games[index]) as any})}
            if (properties.briefInfos) { this.briefInfos = []; properties.briefInfos.forEach((value, index)=>{this.briefInfos[index] = tss_game_GameBriefInfo.create(properties.briefInfos[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
    @protobuf.Field.d(2, "tss_game_config_GameInfo", "repeated")
    public games?: GameInfo[] = []
    @protobuf.Field.d(3, "tss_game_GameBriefInfo", "repeated")
    public briefInfos?: tss_game_GameBriefInfo[] = []
}
export interface IDelAppChannelCfgReq {
    gameID?: string|null
    channelID?: string|null
    uuid?: string|null
}
@protobuf.Type.d("tss_game_config_DelAppChannelCfgReq")
export class DelAppChannelCfgReq extends protobuf.Message<IDelAppChannelCfgReq> {
    constructor(properties: Properties<IDelAppChannelCfgReq>) {
        super(properties);
        if (properties) {
            if (properties.gameID) { this.gameID = properties.gameID }
            if (properties.channelID) { this.channelID = properties.channelID }
            if (properties.uuid) { this.uuid = properties.uuid }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public gameID?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public channelID?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public uuid?: string|null = ""
}
class $Config extends RpcService {
    async GetMatchConfig(req: IGetGameCfgReq, params?: RpcParams) : Promise<{err:number, resp:IGetMatchCfgResp}> {
        let data = GetGameCfgReq.create(req)
        this.onBeforeReq("GetMatchConfig", data, params)
        const buffer = GetGameCfgReq.encode(data).finish()
        let [err, pack] = await this.call("GetMatchConfig", buffer, params)
        if (err) {
            this.onBeforeResp("GetMatchConfig", err)
            return {err: err, resp: null}
        } else {
            let resp = GetMatchCfgResp.decode(pack) as any
            this.onBeforeResp("GetMatchConfig", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetGameInfoList(req: IGetGameInfoListReq, params?: RpcParams) : Promise<{err:number, resp:IGetGameInfoListResp}> {
        let data = GetGameInfoListReq.create(req)
        this.onBeforeReq("GetGameInfoList", data, params)
        const buffer = GetGameInfoListReq.encode(data).finish()
        let [err, pack] = await this.call("GetGameInfoList", buffer, params)
        if (err) {
            this.onBeforeResp("GetGameInfoList", err)
            return {err: err, resp: null}
        } else {
            let resp = GetGameInfoListResp.decode(pack) as any
            this.onBeforeResp("GetGameInfoList", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetGameBriefInfoList(req: IGetGameBriefInfoListReq, params?: RpcParams) : Promise<{err:number, resp:IGetGameBriefInfoListResp}> {
        let data = GetGameBriefInfoListReq.create(req)
        this.onBeforeReq("GetGameBriefInfoList", data, params)
        const buffer = GetGameBriefInfoListReq.encode(data).finish()
        let [err, pack] = await this.call("GetGameBriefInfoList", buffer, params)
        if (err) {
            this.onBeforeResp("GetGameBriefInfoList", err)
            return {err: err, resp: null}
        } else {
            let resp = GetGameBriefInfoListResp.decode(pack) as any
            this.onBeforeResp("GetGameBriefInfoList", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetGameInfo(req: IGetGameInfoReq, params?: RpcParams) : Promise<{err:number, resp:IGetGameInfoResp}> {
        let data = GetGameInfoReq.create(req)
        this.onBeforeReq("GetGameInfo", data, params)
        const buffer = GetGameInfoReq.encode(data).finish()
        let [err, pack] = await this.call("GetGameInfo", buffer, params)
        if (err) {
            this.onBeforeResp("GetGameInfo", err)
            return {err: err, resp: null}
        } else {
            let resp = GetGameInfoResp.decode(pack) as any
            this.onBeforeResp("GetGameInfo", err, resp)
            return {err: null, resp: resp}
        }
    }
    async AddGame(req: IAddGameReq, params?: RpcParams) : Promise<{err:number, resp:IAddGameResp}> {
        let data = AddGameReq.create(req)
        this.onBeforeReq("AddGame", data, params)
        const buffer = AddGameReq.encode(data).finish()
        let [err, pack] = await this.call("AddGame", buffer, params)
        if (err) {
            this.onBeforeResp("AddGame", err)
            return {err: err, resp: null}
        } else {
            let resp = AddGameResp.decode(pack) as any
            this.onBeforeResp("AddGame", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DelGame(req: IDelGameReq, params?: RpcParams) : Promise<{err:number, resp:IDelGameResp}> {
        let data = DelGameReq.create(req)
        this.onBeforeReq("DelGame", data, params)
        const buffer = DelGameReq.encode(data).finish()
        let [err, pack] = await this.call("DelGame", buffer, params)
        if (err) {
            this.onBeforeResp("DelGame", err)
            return {err: err, resp: null}
        } else {
            let resp = DelGameResp.decode(pack) as any
            this.onBeforeResp("DelGame", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListGameBriefInfo(req: IListGameBriefInfoReq, params?: RpcParams) : Promise<{err:number, resp:IListGameBriefInfoResp}> {
        let data = ListGameBriefInfoReq.create(req)
        this.onBeforeReq("ListGameBriefInfo", data, params)
        const buffer = ListGameBriefInfoReq.encode(data).finish()
        let [err, pack] = await this.call("ListGameBriefInfo", buffer, params)
        if (err) {
            this.onBeforeResp("ListGameBriefInfo", err)
            return {err: err, resp: null}
        } else {
            let resp = ListGameBriefInfoResp.decode(pack) as any
            this.onBeforeResp("ListGameBriefInfo", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SetGameConfig(req: ISetGameCfgReq, params?: RpcParams) : Promise<{err:number, resp:ISetGameCfgResp}> {
        let data = SetGameCfgReq.create(req)
        this.onBeforeReq("SetGameConfig", data, params)
        const buffer = SetGameCfgReq.encode(data).finish()
        let [err, pack] = await this.call("SetGameConfig", buffer, params)
        if (err) {
            this.onBeforeResp("SetGameConfig", err)
            return {err: err, resp: null}
        } else {
            let resp = SetGameCfgResp.decode(pack) as any
            this.onBeforeResp("SetGameConfig", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetGameConfig(req: IGetGameCfgReq, params?: RpcParams) : Promise<{err:number, resp:IGetGameCfgResp}> {
        let data = GetGameCfgReq.create(req)
        this.onBeforeReq("GetGameConfig", data, params)
        const buffer = GetGameCfgReq.encode(data).finish()
        let [err, pack] = await this.call("GetGameConfig", buffer, params)
        if (err) {
            this.onBeforeResp("GetGameConfig", err)
            return {err: err, resp: null}
        } else {
            let resp = GetGameCfgResp.decode(pack) as any
            this.onBeforeResp("GetGameConfig", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SetPlayOptionConfig(req: ISetPlayOptionCfgReq, params?: RpcParams) : Promise<{err:number, resp:ISetPlayOptionCfgResp}> {
        let data = SetPlayOptionCfgReq.create(req)
        this.onBeforeReq("SetPlayOptionConfig", data, params)
        const buffer = SetPlayOptionCfgReq.encode(data).finish()
        let [err, pack] = await this.call("SetPlayOptionConfig", buffer, params)
        if (err) {
            this.onBeforeResp("SetPlayOptionConfig", err)
            return {err: err, resp: null}
        } else {
            let resp = SetPlayOptionCfgResp.decode(pack) as any
            this.onBeforeResp("SetPlayOptionConfig", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetPlayOptionConfig(req: IGetPlayOptionCfgReq, params?: RpcParams) : Promise<{err:number, resp:IGetPlayOptionCfgResp}> {
        let data = GetPlayOptionCfgReq.create(req)
        this.onBeforeReq("GetPlayOptionConfig", data, params)
        const buffer = GetPlayOptionCfgReq.encode(data).finish()
        let [err, pack] = await this.call("GetPlayOptionConfig", buffer, params)
        if (err) {
            this.onBeforeResp("GetPlayOptionConfig", err)
            return {err: err, resp: null}
        } else {
            let resp = GetPlayOptionCfgResp.decode(pack) as any
            this.onBeforeResp("GetPlayOptionConfig", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetGameData(req: IGetGameDataReq, params?: RpcParams) : Promise<{err:number, resp:IGetGameDataResp}> {
        let data = GetGameDataReq.create(req)
        this.onBeforeReq("GetGameData", data, params)
        const buffer = GetGameDataReq.encode(data).finish()
        let [err, pack] = await this.call("GetGameData", buffer, params)
        if (err) {
            this.onBeforeResp("GetGameData", err)
            return {err: err, resp: null}
        } else {
            let resp = GetGameDataResp.decode(pack) as any
            this.onBeforeResp("GetGameData", err, resp)
            return {err: null, resp: resp}
        }
    }
    async UpdateGame(req: IAddGameReq, params?: RpcParams) : Promise<{err:number, resp:IAddGameResp}> {
        let data = AddGameReq.create(req)
        this.onBeforeReq("UpdateGame", data, params)
        const buffer = AddGameReq.encode(data).finish()
        let [err, pack] = await this.call("UpdateGame", buffer, params)
        if (err) {
            this.onBeforeResp("UpdateGame", err)
            return {err: err, resp: null}
        } else {
            let resp = AddGameResp.decode(pack) as any
            this.onBeforeResp("UpdateGame", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SetWhitelistConfig(req: IWhitelistCfgReq, params?: RpcParams) : Promise<{err:number, resp:IWhitelistCfgResp}> {
        let data = WhitelistCfgReq.create(req)
        this.onBeforeReq("SetWhitelistConfig", data, params)
        const buffer = WhitelistCfgReq.encode(data).finish()
        let [err, pack] = await this.call("SetWhitelistConfig", buffer, params)
        if (err) {
            this.onBeforeResp("SetWhitelistConfig", err)
            return {err: err, resp: null}
        } else {
            let resp = WhitelistCfgResp.decode(pack) as any
            this.onBeforeResp("SetWhitelistConfig", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetWhitelistConfig(req: IWhitelistCfgReq, params?: RpcParams) : Promise<{err:number, resp:IWhitelistCfgResp}> {
        let data = WhitelistCfgReq.create(req)
        this.onBeforeReq("GetWhitelistConfig", data, params)
        const buffer = WhitelistCfgReq.encode(data).finish()
        let [err, pack] = await this.call("GetWhitelistConfig", buffer, params)
        if (err) {
            this.onBeforeResp("GetWhitelistConfig", err)
            return {err: err, resp: null}
        } else {
            let resp = WhitelistCfgResp.decode(pack) as any
            this.onBeforeResp("GetWhitelistConfig", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetGameInfoListByPage(req: IGetGameInfoListByPageReq, params?: RpcParams) : Promise<{err:number, resp:IGetGameInfoListResp}> {
        let data = GetGameInfoListByPageReq.create(req)
        this.onBeforeReq("GetGameInfoListByPage", data, params)
        const buffer = GetGameInfoListByPageReq.encode(data).finish()
        let [err, pack] = await this.call("GetGameInfoListByPage", buffer, params)
        if (err) {
            this.onBeforeResp("GetGameInfoListByPage", err)
            return {err: err, resp: null}
        } else {
            let resp = GetGameInfoListResp.decode(pack) as any
            this.onBeforeResp("GetGameInfoListByPage", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SetGamePlayOption(req: ISetGamePlayOptionReq, params?: RpcParams) : Promise<{err:number, resp:ISetGamePlayOptionResp}> {
        let data = SetGamePlayOptionReq.create(req)
        this.onBeforeReq("SetGamePlayOption", data, params)
        const buffer = SetGamePlayOptionReq.encode(data).finish()
        let [err, pack] = await this.call("SetGamePlayOption", buffer, params)
        if (err) {
            this.onBeforeResp("SetGamePlayOption", err)
            return {err: err, resp: null}
        } else {
            let resp = SetGamePlayOptionResp.decode(pack) as any
            this.onBeforeResp("SetGamePlayOption", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchSetGamePlayOption(req: IBatchSetGamePlayOptionReq, params?: RpcParams) : Promise<{err:number, resp:IBatchSetGamePlayOptionResp}> {
        let data = BatchSetGamePlayOptionReq.create(req)
        this.onBeforeReq("BatchSetGamePlayOption", data, params)
        const buffer = BatchSetGamePlayOptionReq.encode(data).finish()
        let [err, pack] = await this.call("BatchSetGamePlayOption", buffer, params)
        if (err) {
            this.onBeforeResp("BatchSetGamePlayOption", err)
            return {err: err, resp: null}
        } else {
            let resp = BatchSetGamePlayOptionResp.decode(pack) as any
            this.onBeforeResp("BatchSetGamePlayOption", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DelGamePlayOption(req: IDelGamePlayOptionReq, params?: RpcParams) : Promise<{err:number, resp:IDelGamePlayOptionResp}> {
        let data = DelGamePlayOptionReq.create(req)
        this.onBeforeReq("DelGamePlayOption", data, params)
        const buffer = DelGamePlayOptionReq.encode(data).finish()
        let [err, pack] = await this.call("DelGamePlayOption", buffer, params)
        if (err) {
            this.onBeforeResp("DelGamePlayOption", err)
            return {err: err, resp: null}
        } else {
            let resp = DelGamePlayOptionResp.decode(pack) as any
            this.onBeforeResp("DelGamePlayOption", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetGamePlayOption(req: IGetGamePlayOptionReq, params?: RpcParams) : Promise<{err:number, resp:IGetGamePlayOptionResp}> {
        let data = GetGamePlayOptionReq.create(req)
        this.onBeforeReq("GetGamePlayOption", data, params)
        const buffer = GetGamePlayOptionReq.encode(data).finish()
        let [err, pack] = await this.call("GetGamePlayOption", buffer, params)
        if (err) {
            this.onBeforeResp("GetGamePlayOption", err)
            return {err: err, resp: null}
        } else {
            let resp = GetGamePlayOptionResp.decode(pack) as any
            this.onBeforeResp("GetGamePlayOption", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SetAppChannelCfg(req: ISetAppChannelCfgReq, params?: RpcParams) : Promise<{err:number, resp:base_IExceptionResp}> {
        let data = SetAppChannelCfgReq.create(req)
        this.onBeforeReq("SetAppChannelCfg", data, params)
        const buffer = SetAppChannelCfgReq.encode(data).finish()
        let [err, pack] = await this.call("SetAppChannelCfg", buffer, params)
        if (err) {
            this.onBeforeResp("SetAppChannelCfg", err)
            return {err: err, resp: null}
        } else {
            let resp = base_ExceptionResp.decode(pack) as any
            this.onBeforeResp("SetAppChannelCfg", err, resp)
            return {err: null, resp: resp}
        }
    }
    async SetAppChannelCfgs(req: ISetAppChannelCfgsReq, params?: RpcParams) : Promise<{err:number, resp:base_IExceptionResp}> {
        let data = SetAppChannelCfgsReq.create(req)
        this.onBeforeReq("SetAppChannelCfgs", data, params)
        const buffer = SetAppChannelCfgsReq.encode(data).finish()
        let [err, pack] = await this.call("SetAppChannelCfgs", buffer, params)
        if (err) {
            this.onBeforeResp("SetAppChannelCfgs", err)
            return {err: err, resp: null}
        } else {
            let resp = base_ExceptionResp.decode(pack) as any
            this.onBeforeResp("SetAppChannelCfgs", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetAppChannelCfg(req: IGetAppChannelCfgReq, params?: RpcParams) : Promise<{err:number, resp:IGetAppChannelCfgResp}> {
        let data = GetAppChannelCfgReq.create(req)
        this.onBeforeReq("GetAppChannelCfg", data, params)
        const buffer = GetAppChannelCfgReq.encode(data).finish()
        let [err, pack] = await this.call("GetAppChannelCfg", buffer, params)
        if (err) {
            this.onBeforeResp("GetAppChannelCfg", err)
            return {err: err, resp: null}
        } else {
            let resp = GetAppChannelCfgResp.decode(pack) as any
            this.onBeforeResp("GetAppChannelCfg", err, resp)
            return {err: null, resp: resp}
        }
    }
    async DelAppChannelCfg(req: IDelAppChannelCfgReq, params?: RpcParams) : Promise<{err:number, resp:base_IExceptionResp}> {
        let data = DelAppChannelCfgReq.create(req)
        this.onBeforeReq("DelAppChannelCfg", data, params)
        const buffer = DelAppChannelCfgReq.encode(data).finish()
        let [err, pack] = await this.call("DelAppChannelCfg", buffer, params)
        if (err) {
            this.onBeforeResp("DelAppChannelCfg", err)
            return {err: err, resp: null}
        } else {
            let resp = base_ExceptionResp.decode(pack) as any
            this.onBeforeResp("DelAppChannelCfg", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListOpenGames(req: IListOpenGamesReq, params?: RpcParams) : Promise<{err:number, resp:IListOpenGamesResp}> {
        let data = ListOpenGamesReq.create(req)
        this.onBeforeReq("ListOpenGames", data, params)
        const buffer = ListOpenGamesReq.encode(data).finish()
        let [err, pack] = await this.call("ListOpenGames", buffer, params)
        if (err) {
            this.onBeforeResp("ListOpenGames", err)
            return {err: err, resp: null}
        } else {
            let resp = ListOpenGamesResp.decode(pack) as any
            this.onBeforeResp("ListOpenGames", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetChannelsForSync(req: base_IBatchGetResourceReq, params?: RpcParams) : Promise<{err:number, resp:base_IBatchGetResourceResp}> {
        let data = base_BatchGetResourceReq.create(req)
        this.onBeforeReq("BatchGetChannelsForSync", data, params)
        const buffer = base_BatchGetResourceReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetChannelsForSync", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetChannelsForSync", err)
            return {err: err, resp: null}
        } else {
            let resp = base_BatchGetResourceResp.decode(pack) as any
            this.onBeforeResp("BatchGetChannelsForSync", err, resp)
            return {err: null, resp: resp}
        }
    }
}
export const Config = new $Config({
    name: "tss.game.config",
})
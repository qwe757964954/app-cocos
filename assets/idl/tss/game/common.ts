import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
export enum RankTimeType {  
    RankTimeType_None = 0,  
    RankTimeType_Day = 1,  
    RankTimeType_Week = 2,  
    RankTimeType_Month = 3,  
    RankTimeType_All = 4,
}
export enum RankHonorType {  
    RankHonorType_None = 0,  
    RankHonorType_Cup = 1,  
    RankHonorType_Win = 2,
}
export enum BannerLinkType {  
    BannerLinkType_None = 0,  
    BannerLinkType_Match = 1,
}
export enum BannerTimeType {  
    BannerTimeType_None = 0,  
    BannerTimeType_AssignStartEnd = 1,  
    BannerTimeType_AssignEnd = 2,  
    BannerTimeType_Permanent = 3,
}
export enum GameType {  
    Type_Unknown = 0,  
    Type_Chess = 1,  
    Type_Poker = 2,  
    Type_Mahjong = 3,  
    Type_Other = 4,  
    Type_All = 65535,
}
export enum ChessType {  
    ChessTypeUnknown = 0,  
    ChessType_Chinese = 1,  
    ChessType_Go = 2,  
    ChessType_Gomoku = 3,  
    ChessType_Military = 4,
}
export enum PokerType {  
    PokerTypeUnknown = 0,  
    PokerType_PDK = 1,  
    PokerType_Tractor = 2,  
    PokerType_WordCard = 3,  
    PokerType_GoldFlow = 4,  
    PokerType_Other = 5,
}
export enum MahjongType {  
    MahjongTypeUnknown = 0,  
    MahjongType_XL = 1,  
    MahjongType_XZ = 2,  
    MahjongType_TDH = 3,
}
export enum GameCounterID {  
    unknown = 0,  
    landlord_tysanrenddz = 17,  
    landlord_hnxinxiang = 18,  
    mahjong_hnxinxiang = 19,
}
export enum GameRole {  
    UNKNOWN = 0,  
    FARMER = 1,  
    LANDLORD = 2,  
    PLAYER = 3,  
    BANKER = 4,
}
export interface IGameBriefInfo {
    gameId?: string|null
    name?: string|null
    icon?: string|null
    type?: number|null
    regionID?: number|null
    tags?: string[]
    slogan?: string|null
    myGameIcon?: string|null
    subType?: number|null
    ruleURLs?: string[]
    strProps?: { [k: string]: string|null }
    playOptions?: IGamePlayOption[]
}
@protobuf.Type.d("tss_game_GameBriefInfo")
export class GameBriefInfo extends protobuf.Message<IGameBriefInfo> {
    constructor(properties: Properties<IGameBriefInfo>) {
        super(properties);
        if (properties) {
            if (properties.gameId) { this.gameId = properties.gameId }
            if (properties.name) { this.name = properties.name }
            if (properties.icon) { this.icon = properties.icon }
            if (properties.type) { this.type = properties.type }
            if (properties.regionID) { this.regionID = properties.regionID }
            if (properties.tags) { this.tags = []; properties.tags.forEach((value, index)=>{this.tags[index] = properties.tags[index]})}
            if (properties.slogan) { this.slogan = properties.slogan }
            if (properties.myGameIcon) { this.myGameIcon = properties.myGameIcon }
            if (properties.subType) { this.subType = properties.subType }
            if (properties.ruleURLs) { this.ruleURLs = []; properties.ruleURLs.forEach((value, index)=>{this.ruleURLs[index] = properties.ruleURLs[index]})}
            if (properties.strProps) { this.strProps = properties.strProps }
            if (properties.playOptions) { this.playOptions = []; properties.playOptions.forEach((value, index)=>{this.playOptions[index] = GamePlayOption.create(properties.playOptions[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public gameId?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(3, "string", "optional", )
    public icon?: string|null = ""
    @protobuf.Field.d(4, "int32", "optional", 0)
    public type?: number|null = 0
    @protobuf.Field.d(5, "int32", "optional", 0)
    public regionID?: number|null = 0
    @protobuf.Field.d(6, "string", "repeated", [])
    public tags?: string[] = []
    @protobuf.Field.d(7, "string", "optional", )
    public slogan?: string|null = ""
    @protobuf.Field.d(8, "string", "optional", )
    public myGameIcon?: string|null = ""
    @protobuf.Field.d(9, "int32", "optional", 0)
    public subType?: number|null = 0
    @protobuf.Field.d(10, "string", "repeated", [])
    public ruleURLs?: string[] = []
    @protobuf.MapField.d(11, "string", "string")
    public strProps?: { [k: string]: string|null } = {}
    @protobuf.Field.d(12, "tss_game_GamePlayOption", "repeated")
    public playOptions?: GamePlayOption[] = []
}
export interface IBannerConfig {
    linkType?: BannerLinkType|null
    linkData?: Uint8Array
    path?: string|null
    confName?: string|null
    title?: string|null
    subtitle?: string|null
    timeType?: BannerTimeType|null
    startTime?: number|null
    endTime?: number|null
}
@protobuf.Type.d("tss_game_BannerConfig")
export class BannerConfig extends protobuf.Message<IBannerConfig> {
    constructor(properties: Properties<IBannerConfig>) {
        super(properties);
        if (properties) {
            if (properties.linkType) { this.linkType = properties.linkType }
            if (properties.linkData) { this.linkData = properties.linkData }
            if (properties.path) { this.path = properties.path }
            if (properties.confName) { this.confName = properties.confName }
            if (properties.title) { this.title = properties.title }
            if (properties.subtitle) { this.subtitle = properties.subtitle }
            if (properties.timeType) { this.timeType = properties.timeType }
            if (properties.startTime) { this.startTime = properties.startTime }
            if (properties.endTime) { this.endTime = properties.endTime }
        }
	}
    @protobuf.Field.d(1, BannerLinkType, "optional", BannerLinkType.BannerLinkType_None)
    public linkType?: BannerLinkType|null = BannerLinkType.BannerLinkType_None
    @protobuf.Field.d(2, "bytes", "optional", [])
    public linkData?: Uint8Array
    @protobuf.Field.d(3, "string", "optional", )
    public path?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public confName?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public title?: string|null = ""
    @protobuf.Field.d(6, "string", "optional", )
    public subtitle?: string|null = ""
    @protobuf.Field.d(7, BannerTimeType, "optional", BannerTimeType.BannerTimeType_None)
    public timeType?: BannerTimeType|null = BannerTimeType.BannerTimeType_None
    @protobuf.Field.d(8, "int64", "optional", 0)
    public startTime?: number|null = 0
    @protobuf.Field.d(9, "int64", "optional", 0)
    public endTime?: number|null = 0
}
export interface IBannerItem {
    configs?: IBannerConfig[]
}
@protobuf.Type.d("tss_game_BannerItem")
export class BannerItem extends protobuf.Message<IBannerItem> {
    constructor(properties: Properties<IBannerItem>) {
        super(properties);
        if (properties) {
            if (properties.configs) { this.configs = []; properties.configs.forEach((value, index)=>{this.configs[index] = BannerConfig.create(properties.configs[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_game_BannerConfig", "repeated")
    public configs?: BannerConfig[] = []
}
export interface ILinkMatchData {
    matchID?: string|null
}
@protobuf.Type.d("tss_game_LinkMatchData")
export class LinkMatchData extends protobuf.Message<ILinkMatchData> {
    constructor(properties: Properties<ILinkMatchData>) {
        super(properties);
        if (properties) {
            if (properties.matchID) { this.matchID = properties.matchID }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public matchID?: string|null = ""
}
export interface IGamePlayOption {
    id?: number|null
    name?: string|null
    seq?: number|null
}
@protobuf.Type.d("tss_game_GamePlayOption")
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
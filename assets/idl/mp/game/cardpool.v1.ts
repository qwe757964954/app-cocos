import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
export enum GameID {  
    UNKNOWN = 0,  
    LANDLORD = 1,
}
export enum ScoreType {  
    Unknown = 0,  
    MinScore = 1,  
    MaxScore = 2,
}
export interface IGetRandomEntryReq {
    minScore?: number|null
    maxScore?: number|null
    gameID?: string|null
    scoreType?: ScoreType|null
}
@protobuf.Type.d("mp_game_cardpool_v1_GetRandomEntryReq")
export class GetRandomEntryReq extends protobuf.Message<IGetRandomEntryReq> {
    constructor(properties: Properties<IGetRandomEntryReq>) {
        super(properties);
        if (properties) {
            if (properties.minScore) { this.minScore = properties.minScore }
            if (properties.maxScore) { this.maxScore = properties.maxScore }
            if (properties.gameID) { this.gameID = properties.gameID }
            if (properties.scoreType) { this.scoreType = properties.scoreType }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public minScore?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public maxScore?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public gameID?: string|null = ""
    @protobuf.Field.d(4, ScoreType, "optional", ScoreType.Unknown)
    public scoreType?: ScoreType|null = ScoreType.Unknown
}
export interface IListCardEntryReq {
    startScore?: number|null
    endScore?: number|null
    page?: number|null
    pageSize?: number|null
    scoreType?: ScoreType|null
}
@protobuf.Type.d("mp_game_cardpool_v1_ListCardEntryReq")
export class ListCardEntryReq extends protobuf.Message<IListCardEntryReq> {
    constructor(properties: Properties<IListCardEntryReq>) {
        super(properties);
        if (properties) {
            if (properties.startScore) { this.startScore = properties.startScore }
            if (properties.endScore) { this.endScore = properties.endScore }
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.scoreType) { this.scoreType = properties.scoreType }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public startScore?: number|null = 0
    @protobuf.Field.d(2, "int32", "optional", 0)
    public endScore?: number|null = 0
    @protobuf.Field.d(3, "int32", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(4, "int32", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(5, ScoreType, "optional", ScoreType.Unknown)
    public scoreType?: ScoreType|null = ScoreType.Unknown
}
export interface ICardEntry_Item {
    cards?: number[]
    score?: number|null
}
@protobuf.Type.d("mp_game_cardpool_v1_CardEntry_Item")
export class CardEntry_Item extends protobuf.Message<ICardEntry_Item> {
    constructor(properties: Properties<ICardEntry_Item>) {
        super(properties);
        if (properties) {
            if (properties.cards) { this.cards = []; properties.cards.forEach((value, index)=>{this.cards[index] = properties.cards[index]})}
            if (properties.score) { this.score = properties.score }
        }
	}
    @protobuf.Field.d(1, "uint32", "repeated", [])
    public cards?: number[] = []
    @protobuf.Field.d(2, "uint32", "optional", 0)
    public score?: number|null = 0
}
export interface ICardEntry {
    items?: ICardEntry_Item[]
}
@protobuf.Type.d("mp_game_cardpool_v1_CardEntry")
export class CardEntry extends protobuf.Message<ICardEntry> {
    constructor(properties: Properties<ICardEntry>) {
        super(properties);
        if (properties) {
            if (properties.items) { this.items = []; properties.items.forEach((value, index)=>{this.items[index] = CardEntry_Item.create(properties.items[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "mp_game_cardpool_v1_CardEntry_Item", "repeated")
    public items?: CardEntry_Item[] = []
}
export interface IGetRandomEntryResp {
    cardEntry?: ICardEntry
}
@protobuf.Type.d("mp_game_cardpool_v1_GetRandomEntryResp")
export class GetRandomEntryResp extends protobuf.Message<IGetRandomEntryResp> {
    constructor(properties: Properties<IGetRandomEntryResp>) {
        super(properties);
        if (properties) {
            if (properties.cardEntry) { this.cardEntry = CardEntry.create(properties.cardEntry) as any }
        }
	}
    @protobuf.Field.d(1, "mp_game_cardpool_v1_CardEntry", "optional")
    public cardEntry?: CardEntry|null
}
export interface IListCardEntryResp {
    cardEntry?: ICardEntry[]
    total?: number|null
}
@protobuf.Type.d("mp_game_cardpool_v1_ListCardEntryResp")
export class ListCardEntryResp extends protobuf.Message<IListCardEntryResp> {
    constructor(properties: Properties<IListCardEntryResp>) {
        super(properties);
        if (properties) {
            if (properties.cardEntry) { this.cardEntry = []; properties.cardEntry.forEach((value, index)=>{this.cardEntry[index] = CardEntry.create(properties.cardEntry[index]) as any})}
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "mp_game_cardpool_v1_CardEntry", "repeated")
    public cardEntry?: CardEntry[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public total?: number|null = 0
}
class $GameCardPool extends RpcService {
    async GetRandomEntry(req: IGetRandomEntryReq, params?: RpcParams) : Promise<{err:number, resp:IGetRandomEntryResp}> {
        let data = GetRandomEntryReq.create(req)
        this.onBeforeReq("GetRandomEntry", data, params)
        const buffer = GetRandomEntryReq.encode(data).finish()
        let [err, pack] = await this.call("GetRandomEntry", buffer, params)
        if (err) {
            this.onBeforeResp("GetRandomEntry", err)
            return {err: err, resp: null}
        } else {
            let resp = GetRandomEntryResp.decode(pack) as any
            this.onBeforeResp("GetRandomEntry", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListCardEntry(req: IListCardEntryReq, params?: RpcParams) : Promise<{err:number, resp:IListCardEntryResp}> {
        let data = ListCardEntryReq.create(req)
        this.onBeforeReq("ListCardEntry", data, params)
        const buffer = ListCardEntryReq.encode(data).finish()
        let [err, pack] = await this.call("ListCardEntry", buffer, params)
        if (err) {
            this.onBeforeResp("ListCardEntry", err)
            return {err: err, resp: null}
        } else {
            let resp = ListCardEntryResp.decode(pack) as any
            this.onBeforeResp("ListCardEntry", err, resp)
            return {err: null, resp: resp}
        }
    }
}
export const GameCardPool = new $GameCardPool({
    name: "mp.game.cardpool.v1",
})
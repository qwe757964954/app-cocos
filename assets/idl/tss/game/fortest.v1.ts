import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  Void as base_Void,IVoid as base_IVoid ,  } from "idl/base/base"
import {  HandleGameResultReq as tss_match_v2_common_HandleGameResultReq,IHandleGameResultReq as tss_match_v2_common_IHandleGameResultReq ,  HandleGameEndReq as tss_match_v2_common_HandleGameEndReq,IHandleGameEndReq as tss_match_v2_common_IHandleGameEndReq ,  } from "idl/tss/match_v2/common/common"
export enum StartTableFlag {  
    StartTableFlag_WaitOthers = 0,  
    StartTableFlag_AddRobot = 1,  
    StartTableFlag_AddOthers = 2,
}
export interface IStartTableReq {
    gameID?: string|null
    flag?: number|null
    playOption?: number|null
    spacename?: string|null
    matchType?: string|null
    playerNum?: number|null
}
@protobuf.Type.d("tss_game_fortest_v1_StartTableReq")
export class StartTableReq extends protobuf.Message<IStartTableReq> {
    constructor(properties: Properties<IStartTableReq>) {
        super(properties);
        if (properties) {
            if (properties.gameID) { this.gameID = properties.gameID }
            if (properties.flag) { this.flag = properties.flag }
            if (properties.playOption) { this.playOption = properties.playOption }
            if (properties.spacename) { this.spacename = properties.spacename }
            if (properties.matchType) { this.matchType = properties.matchType }
            if (properties.playerNum) { this.playerNum = properties.playerNum }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public gameID?: string|null = ""
    @protobuf.Field.d(2, "int32", "optional", 0)
    public flag?: number|null = 0
    @protobuf.Field.d(3, "int32", "optional", 0)
    public playOption?: number|null = 0
    @protobuf.Field.d(4, "string", "optional", )
    public spacename?: string|null = ""
    @protobuf.Field.d(6, "string", "optional", )
    public matchType?: string|null = ""
    @protobuf.Field.d(5, "int32", "optional", 0)
    public playerNum?: number|null = 0
}
export interface IStartTableResp {
    code?: number|null
    tKey?: string|null
}
@protobuf.Type.d("tss_game_fortest_v1_StartTableResp")
export class StartTableResp extends protobuf.Message<IStartTableResp> {
    constructor(properties: Properties<IStartTableResp>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.tKey) { this.tKey = properties.tKey }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public code?: number|null = 0
    @protobuf.Field.d(2, "string", "optional", )
    public tKey?: string|null = ""
}
class $Fortest extends RpcService {
    async StartTable(req: IStartTableReq, params?: RpcParams) : Promise<{err:number, resp:IStartTableResp}> {
        let data = StartTableReq.create(req)
        this.onBeforeReq("StartTable", data, params)
        const buffer = StartTableReq.encode(data).finish()
        let [err, pack] = await this.call("StartTable", buffer, params)
        if (err) {
            this.onBeforeResp("StartTable", err)
            return {err: err, resp: null}
        } else {
            let resp = StartTableResp.decode(pack) as any
            this.onBeforeResp("StartTable", err, resp)
            return {err: null, resp: resp}
        }
    }
    async HandleGameResult(req: tss_match_v2_common_IHandleGameResultReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = tss_match_v2_common_HandleGameResultReq.create(req)
        this.onBeforeReq("HandleGameResult", data, params)
        const buffer = tss_match_v2_common_HandleGameResultReq.encode(data).finish()
        let [err, pack] = await this.call("HandleGameResult", buffer, params)
        if (err) {
            this.onBeforeResp("HandleGameResult", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("HandleGameResult", err, resp)
            return {err: null, resp: resp}
        }
    }
    async HandleGameEnd(req: tss_match_v2_common_IHandleGameEndReq, params?: RpcParams) : Promise<{err:number, resp:base_IVoid}> {
        let data = tss_match_v2_common_HandleGameEndReq.create(req)
        this.onBeforeReq("HandleGameEnd", data, params)
        const buffer = tss_match_v2_common_HandleGameEndReq.encode(data).finish()
        let [err, pack] = await this.call("HandleGameEnd", buffer, params)
        if (err) {
            this.onBeforeResp("HandleGameEnd", err)
            return {err: err, resp: null}
        } else {
            let resp = base_Void.decode(pack) as any
            this.onBeforeResp("HandleGameEnd", err, resp)
            return {err: null, resp: resp}
        }
    }
}
export const Fortest = new $Fortest({
    name: "tss.game.fortest.v1",
})
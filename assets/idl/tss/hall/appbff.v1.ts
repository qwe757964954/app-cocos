import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  SwitchState as tss_common_SwitchState ,  } from "idl/tss/common/common_define"
import {  UserAttr as tss_game_api_v1_UserAttr,IUserAttr as tss_game_api_v1_IUserAttr ,  } from "idl/tss/game/api"
import {  ActivityBase as tss_hall_common_ActivityBase,IActivityBase as tss_hall_common_IActivityBase ,  ActivityTab as tss_hall_common_ActivityTab ,  } from "idl/tss/hall/common/activity"
import {  UserActivityRecord as tss_hall_common_UserActivityRecord,IUserActivityRecord as tss_hall_common_IUserActivityRecord ,  } from "idl/tss/hall/common/activity_msg"
import {  BatchGetBadgeReq as tss_hall_common_BatchGetBadgeReq,IBatchGetBadgeReq as tss_hall_common_IBatchGetBadgeReq ,  BatchGetBadgeResp as tss_hall_common_BatchGetBadgeResp,IBatchGetBadgeResp as tss_hall_common_IBatchGetBadgeResp ,  ListUserActivityBadgeReq as tss_hall_common_ListUserActivityBadgeReq,IListUserActivityBadgeReq as tss_hall_common_IListUserActivityBadgeReq ,  ListUserActivityBadgeResp as tss_hall_common_ListUserActivityBadgeResp,IListUserActivityBadgeResp as tss_hall_common_IListUserActivityBadgeResp ,  Badge as tss_hall_common_Badge,IBadge as tss_hall_common_IBadge ,  } from "idl/tss/hall/common/badge"
import {  UserTitle as tss_hall_usertitle_v1_UserTitle,IUserTitle as tss_hall_usertitle_v1_IUserTitle ,  } from "idl/tss/hall/usertitle.v1"
export interface IUserBriefActivity {
    id?: number|null
    base?: tss_hall_common_IActivityBase
    badge?: tss_hall_common_IBadge
    userActivityRecord?: tss_hall_common_IUserActivityRecord
}
@protobuf.Type.d("tss_hall_appbff_v1_UserBriefActivity")
export class UserBriefActivity extends protobuf.Message<IUserBriefActivity> {
    constructor(properties: Properties<IUserBriefActivity>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.base) { this.base = tss_hall_common_ActivityBase.create(properties.base) as any }
            if (properties.badge) { this.badge = tss_hall_common_Badge.create(properties.badge) as any }
            if (properties.userActivityRecord) { this.userActivityRecord = tss_hall_common_UserActivityRecord.create(properties.userActivityRecord) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public id?: number|null = 0
    @protobuf.Field.d(2, "tss_hall_common_ActivityBase", "optional")
    public base?: tss_hall_common_ActivityBase|null
    @protobuf.Field.d(3, "tss_hall_common_Badge", "optional")
    public badge?: tss_hall_common_Badge|null
    @protobuf.Field.d(4, "tss_hall_common_UserActivityRecord", "optional")
    public userActivityRecord?: tss_hall_common_UserActivityRecord|null
}
export interface IListUserActivityReq {
    page?: number|null
    pageSize?: number|null
    isPopup?: tss_common_SwitchState|null
    isList?: tss_common_SwitchState|null
    isShortCut?: tss_common_SwitchState|null
    activityTab?: tss_hall_common_ActivityTab|null
}
@protobuf.Type.d("tss_hall_appbff_v1_ListUserActivityReq")
export class ListUserActivityReq extends protobuf.Message<IListUserActivityReq> {
    constructor(properties: Properties<IListUserActivityReq>) {
        super(properties);
        if (properties) {
            if (properties.page) { this.page = properties.page }
            if (properties.pageSize) { this.pageSize = properties.pageSize }
            if (properties.isPopup) { this.isPopup = properties.isPopup }
            if (properties.isList) { this.isList = properties.isList }
            if (properties.isShortCut) { this.isShortCut = properties.isShortCut }
            if (properties.activityTab) { this.activityTab = properties.activityTab }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public page?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public pageSize?: number|null = 0
    @protobuf.Field.d(3, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public isPopup?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
    @protobuf.Field.d(4, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public isList?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
    @protobuf.Field.d(5, tss_common_SwitchState, "optional", tss_common_SwitchState.SwitchStateUnknown)
    public isShortCut?: tss_common_SwitchState|null = tss_common_SwitchState.SwitchStateUnknown
    @protobuf.Field.d(6, tss_hall_common_ActivityTab, "optional", tss_hall_common_ActivityTab.ActivityTabUnknown)
    public activityTab?: tss_hall_common_ActivityTab|null = tss_hall_common_ActivityTab.ActivityTabUnknown
}
export interface IListUserActivityResp {
    activities?: IUserBriefActivity[]
    total?: number|null
}
@protobuf.Type.d("tss_hall_appbff_v1_ListUserActivityResp")
export class ListUserActivityResp extends protobuf.Message<IListUserActivityResp> {
    constructor(properties: Properties<IListUserActivityResp>) {
        super(properties);
        if (properties) {
            if (properties.activities) { this.activities = []; properties.activities.forEach((value, index)=>{this.activities[index] = UserBriefActivity.create(properties.activities[index]) as any})}
            if (properties.total) { this.total = properties.total }
        }
	}
    @protobuf.Field.d(1, "tss_hall_appbff_v1_UserBriefActivity", "repeated")
    public activities?: UserBriefActivity[] = []
    @protobuf.Field.d(2, "int64", "optional", 0)
    public total?: number|null = 0
}
export interface IGetCurrentTimeReq {
    localTime?: number|null
}
@protobuf.Type.d("tss_hall_appbff_v1_GetCurrentTimeReq")
export class GetCurrentTimeReq extends protobuf.Message<IGetCurrentTimeReq> {
    constructor(properties: Properties<IGetCurrentTimeReq>) {
        super(properties);
        if (properties) {
            if (properties.localTime) { this.localTime = properties.localTime }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public localTime?: number|null = 0
}
export interface IGetCurrentTimeResp {
    localTime?: number|null
    remoteTime?: number|null
}
@protobuf.Type.d("tss_hall_appbff_v1_GetCurrentTimeResp")
export class GetCurrentTimeResp extends protobuf.Message<IGetCurrentTimeResp> {
    constructor(properties: Properties<IGetCurrentTimeResp>) {
        super(properties);
        if (properties) {
            if (properties.localTime) { this.localTime = properties.localTime }
            if (properties.remoteTime) { this.remoteTime = properties.remoteTime }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public localTime?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public remoteTime?: number|null = 0
}
export interface IGetProfileGameReq {
    uid?: number|null
}
@protobuf.Type.d("tss_hall_appbff_v1_GetProfileGameReq")
export class GetProfileGameReq extends protobuf.Message<IGetProfileGameReq> {
    constructor(properties: Properties<IGetProfileGameReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
}
export interface IGetSpecMatchCountReq {
    uid?: number|null
    scheduleID?: number|null
    onShowRankNum?: number|null
}
@protobuf.Type.d("tss_hall_appbff_v1_GetSpecMatchCountReq")
export class GetSpecMatchCountReq extends protobuf.Message<IGetSpecMatchCountReq> {
    constructor(properties: Properties<IGetSpecMatchCountReq>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.scheduleID) { this.scheduleID = properties.scheduleID }
            if (properties.onShowRankNum) { this.onShowRankNum = properties.onShowRankNum }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public scheduleID?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public onShowRankNum?: number|null = 0
}
export interface IMatchRank {
    time?: number|null
    rank?: number|null
}
@protobuf.Type.d("tss_hall_appbff_v1_MatchRank")
export class MatchRank extends protobuf.Message<IMatchRank> {
    constructor(properties: Properties<IMatchRank>) {
        super(properties);
        if (properties) {
            if (properties.time) { this.time = properties.time }
            if (properties.rank) { this.rank = properties.rank }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public time?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public rank?: number|null = 0
}
export interface IGetSpecMatchCountResp {
    scheduleID?: number|null
    matchRank?: IMatchRank[]
    championCount?: number|null
    championCountRank?: number|null
    bestMatchRank?: number|null
    isNewHighMark?: boolean|null
}
@protobuf.Type.d("tss_hall_appbff_v1_GetSpecMatchCountResp")
export class GetSpecMatchCountResp extends protobuf.Message<IGetSpecMatchCountResp> {
    constructor(properties: Properties<IGetSpecMatchCountResp>) {
        super(properties);
        if (properties) {
            if (properties.scheduleID) { this.scheduleID = properties.scheduleID }
            if (properties.matchRank) { this.matchRank = []; properties.matchRank.forEach((value, index)=>{this.matchRank[index] = MatchRank.create(properties.matchRank[index]) as any})}
            if (properties.championCount) { this.championCount = properties.championCount }
            if (properties.championCountRank) { this.championCountRank = properties.championCountRank }
            if (properties.bestMatchRank) { this.bestMatchRank = properties.bestMatchRank }
            if (properties.isNewHighMark) { this.isNewHighMark = properties.isNewHighMark }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public scheduleID?: number|null = 0
    @protobuf.Field.d(2, "tss_hall_appbff_v1_MatchRank", "repeated")
    public matchRank?: MatchRank[] = []
    @protobuf.Field.d(3, "int64", "optional", 0)
    public championCount?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public championCountRank?: number|null = 0
    @protobuf.Field.d(5, "int64", "optional", 0)
    public bestMatchRank?: number|null = 0
    @protobuf.Field.d(6, "bool", "optional", false)
    public isNewHighMark?: boolean|null = false
}
export interface IProfileGameItem {
    gameID?: string|null
    gameName?: string|null
    userTitle?: tss_hall_usertitle_v1_IUserTitle
    attrs?: tss_game_api_v1_IUserAttr[]
    championCount?: number|null
    officialMatchCount?: number|null
    officialMatchPrizedPercent?: number|null
}
@protobuf.Type.d("tss_hall_appbff_v1_ProfileGameItem")
export class ProfileGameItem extends protobuf.Message<IProfileGameItem> {
    constructor(properties: Properties<IProfileGameItem>) {
        super(properties);
        if (properties) {
            if (properties.gameID) { this.gameID = properties.gameID }
            if (properties.gameName) { this.gameName = properties.gameName }
            if (properties.userTitle) { this.userTitle = tss_hall_usertitle_v1_UserTitle.create(properties.userTitle) as any }
            if (properties.attrs) { this.attrs = []; properties.attrs.forEach((value, index)=>{this.attrs[index] = tss_game_api_v1_UserAttr.create(properties.attrs[index]) as any})}
            if (properties.championCount) { this.championCount = properties.championCount }
            if (properties.officialMatchCount) { this.officialMatchCount = properties.officialMatchCount }
            if (properties.officialMatchPrizedPercent) { this.officialMatchPrizedPercent = properties.officialMatchPrizedPercent }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public gameID?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public gameName?: string|null = ""
    @protobuf.Field.d(3, "tss_hall_usertitle_v1_UserTitle", "optional")
    public userTitle?: tss_hall_usertitle_v1_UserTitle|null
    @protobuf.Field.d(4, "tss_game_api_v1_UserAttr", "repeated")
    public attrs?: tss_game_api_v1_UserAttr[] = []
    @protobuf.Field.d(5, "int64", "optional", 0)
    public championCount?: number|null = 0
    @protobuf.Field.d(6, "int64", "optional", 0)
    public officialMatchCount?: number|null = 0
    @protobuf.Field.d(7, "int64", "optional", 0)
    public officialMatchPrizedPercent?: number|null = 0
}
export interface IGetProfileGameResp {
    items?: IProfileGameItem[]
}
@protobuf.Type.d("tss_hall_appbff_v1_GetProfileGameResp")
export class GetProfileGameResp extends protobuf.Message<IGetProfileGameResp> {
    constructor(properties: Properties<IGetProfileGameResp>) {
        super(properties);
        if (properties) {
            if (properties.items) { this.items = []; properties.items.forEach((value, index)=>{this.items[index] = ProfileGameItem.create(properties.items[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_appbff_v1_ProfileGameItem", "repeated")
    public items?: ProfileGameItem[] = []
}
export interface IBatchGetProfileGameReq {
    uids?: number[]
    gameIds?: string[]
}
@protobuf.Type.d("tss_hall_appbff_v1_BatchGetProfileGameReq")
export class BatchGetProfileGameReq extends protobuf.Message<IBatchGetProfileGameReq> {
    constructor(properties: Properties<IBatchGetProfileGameReq>) {
        super(properties);
        if (properties) {
            if (properties.uids) { this.uids = []; properties.uids.forEach((value, index)=>{this.uids[index] = properties.uids[index]})}
            if (properties.gameIds) { this.gameIds = []; properties.gameIds.forEach((value, index)=>{this.gameIds[index] = properties.gameIds[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public uids?: number[] = []
    @protobuf.Field.d(2, "string", "repeated", [])
    public gameIds?: string[] = []
}
export interface IProfileGameItemWitUid {
    uid?: number|null
    items?: IProfileGameItem[]
}
@protobuf.Type.d("tss_hall_appbff_v1_ProfileGameItemWitUid")
export class ProfileGameItemWitUid extends protobuf.Message<IProfileGameItemWitUid> {
    constructor(properties: Properties<IProfileGameItemWitUid>) {
        super(properties);
        if (properties) {
            if (properties.uid) { this.uid = properties.uid }
            if (properties.items) { this.items = []; properties.items.forEach((value, index)=>{this.items[index] = ProfileGameItem.create(properties.items[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public uid?: number|null = 0
    @protobuf.Field.d(2, "tss_hall_appbff_v1_ProfileGameItem", "repeated")
    public items?: ProfileGameItem[] = []
}
export interface IBatchGetProfileGameResp {
    items?: IProfileGameItemWitUid[]
}
@protobuf.Type.d("tss_hall_appbff_v1_BatchGetProfileGameResp")
export class BatchGetProfileGameResp extends protobuf.Message<IBatchGetProfileGameResp> {
    constructor(properties: Properties<IBatchGetProfileGameResp>) {
        super(properties);
        if (properties) {
            if (properties.items) { this.items = []; properties.items.forEach((value, index)=>{this.items[index] = ProfileGameItemWitUid.create(properties.items[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_appbff_v1_ProfileGameItemWitUid", "repeated")
    public items?: ProfileGameItemWitUid[] = []
}
class $Appbff extends RpcService {
    async ListUserActivity(req: IListUserActivityReq, params?: RpcParams) : Promise<{err:number, resp:IListUserActivityResp}> {
        let data = ListUserActivityReq.create(req)
        this.onBeforeReq("ListUserActivity", data, params)
        const buffer = ListUserActivityReq.encode(data).finish()
        let [err, pack] = await this.call("ListUserActivity", buffer, params)
        if (err) {
            this.onBeforeResp("ListUserActivity", err)
            return {err: err, resp: null}
        } else {
            let resp = ListUserActivityResp.decode(pack) as any
            this.onBeforeResp("ListUserActivity", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetBadge(req: tss_hall_common_IBatchGetBadgeReq, params?: RpcParams) : Promise<{err:number, resp:tss_hall_common_IBatchGetBadgeResp}> {
        let data = tss_hall_common_BatchGetBadgeReq.create(req)
        this.onBeforeReq("BatchGetBadge", data, params)
        const buffer = tss_hall_common_BatchGetBadgeReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetBadge", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetBadge", err)
            return {err: err, resp: null}
        } else {
            let resp = tss_hall_common_BatchGetBadgeResp.decode(pack) as any
            this.onBeforeResp("BatchGetBadge", err, resp)
            return {err: null, resp: resp}
        }
    }
    async ListUserActivityBadge(req: tss_hall_common_IListUserActivityBadgeReq, params?: RpcParams) : Promise<{err:number, resp:tss_hall_common_IListUserActivityBadgeResp}> {
        let data = tss_hall_common_ListUserActivityBadgeReq.create(req)
        this.onBeforeReq("ListUserActivityBadge", data, params)
        const buffer = tss_hall_common_ListUserActivityBadgeReq.encode(data).finish()
        let [err, pack] = await this.call("ListUserActivityBadge", buffer, params)
        if (err) {
            this.onBeforeResp("ListUserActivityBadge", err)
            return {err: err, resp: null}
        } else {
            let resp = tss_hall_common_ListUserActivityBadgeResp.decode(pack) as any
            this.onBeforeResp("ListUserActivityBadge", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetCurrentTime(req: IGetCurrentTimeReq, params?: RpcParams) : Promise<{err:number, resp:IGetCurrentTimeResp}> {
        let data = GetCurrentTimeReq.create(req)
        this.onBeforeReq("GetCurrentTime", data, params)
        const buffer = GetCurrentTimeReq.encode(data).finish()
        let [err, pack] = await this.call("GetCurrentTime", buffer, params)
        if (err) {
            this.onBeforeResp("GetCurrentTime", err)
            return {err: err, resp: null}
        } else {
            let resp = GetCurrentTimeResp.decode(pack) as any
            this.onBeforeResp("GetCurrentTime", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetProfileGame(req: IGetProfileGameReq, params?: RpcParams) : Promise<{err:number, resp:IGetProfileGameResp}> {
        let data = GetProfileGameReq.create(req)
        this.onBeforeReq("GetProfileGame", data, params)
        const buffer = GetProfileGameReq.encode(data).finish()
        let [err, pack] = await this.call("GetProfileGame", buffer, params)
        if (err) {
            this.onBeforeResp("GetProfileGame", err)
            return {err: err, resp: null}
        } else {
            let resp = GetProfileGameResp.decode(pack) as any
            this.onBeforeResp("GetProfileGame", err, resp)
            return {err: null, resp: resp}
        }
    }
    async BatchGetProfileGame(req: IBatchGetProfileGameReq, params?: RpcParams) : Promise<{err:number, resp:IBatchGetProfileGameResp}> {
        let data = BatchGetProfileGameReq.create(req)
        this.onBeforeReq("BatchGetProfileGame", data, params)
        const buffer = BatchGetProfileGameReq.encode(data).finish()
        let [err, pack] = await this.call("BatchGetProfileGame", buffer, params)
        if (err) {
            this.onBeforeResp("BatchGetProfileGame", err)
            return {err: err, resp: null}
        } else {
            let resp = BatchGetProfileGameResp.decode(pack) as any
            this.onBeforeResp("BatchGetProfileGame", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetSpecMatchCount(req: IGetSpecMatchCountReq, params?: RpcParams) : Promise<{err:number, resp:IGetSpecMatchCountResp}> {
        let data = GetSpecMatchCountReq.create(req)
        this.onBeforeReq("GetSpecMatchCount", data, params)
        const buffer = GetSpecMatchCountReq.encode(data).finish()
        let [err, pack] = await this.call("GetSpecMatchCount", buffer, params)
        if (err) {
            this.onBeforeResp("GetSpecMatchCount", err)
            return {err: err, resp: null}
        } else {
            let resp = GetSpecMatchCountResp.decode(pack) as any
            this.onBeforeResp("GetSpecMatchCount", err, resp)
            return {err: null, resp: resp}
        }
    }
}
export const Appbff = new $Appbff({
    name: "tss.hall.appbff.v1",
})
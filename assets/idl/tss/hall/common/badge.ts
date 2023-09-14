import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  ActivityType as tss_hall_common_ActivityType ,  } from "idl/tss/hall/common/activity"
export enum BadgeResType {  
    BadgeResTypeUnknown = 0,  
    BadgeResTypeActivityCollection = 1,  
    BadgeResTypeHonour = 2,  
    BadgeResTypeDailyTask = 3,  
    BadgeResTypeActivitySeason = 5,  
    BadgeResTypeActivityNovice = 6,  
    BadgeResTypeActivityNoviceTask = 7,  
    BadgeResTypeActivityNoviceLoginGift = 8,  
    BadgeResTypeActivityNoviceExclusive = 9,  
    BadgeResTypeActivityRank = 10,  
    BadgeResTypeDressClothing = 11,  
    BadgeResTypeDressBackground = 12,  
    BadgeResTypeDressMedal = 13,  
    BadgeResTypeDressAvatarFrame = 14,  
    BadgeResTypePoliteInvitation = 15,  
    BadgeResTypeActivitySignleTask = 16,  
    BadgeResTypeActivityJigsaw = 17,  
    BadgeResTypeDressLocalTTS = 18,  
    BadgeResTypeWeeklyTask = 19,  
    BadgeResTypeBubble = 21,  
    BadgeResTypeScene = 22,  
    BadgeResTypeDesktopPoke = 23,  
    BadgeResTypeDesktopMahjong = 24,  
    BadgeResTypeClock = 25,  
    BadgeResTypeHandPoke = 26,  
    BadgeResTypeHandMahjong = 27,  
    BadgeResTypeActivityWeeklyMatch = 28,  
    BadgeResTypePremiumcardDailyBenefit = 29,  
    BadgeResTypeActivityNoviceBenefit = 30,  
    BadgeResTypeActivityAutumnLeague = 31,  
    BadgeResTypeActivitySchedule = 32,  
    BadgeResTypeActivityReturn = 33,  
    BadgeResTypeActivityServiceActive = 34,  
    BadgeResTypeActivityPrizeDraw = 35,  
    BadgeResTypeActivityInviteReward = 36,  
    BadgeResTypeActivityRedBagRain = 37,  
    BadgeResTypeActivityGeneral = 38,
}
export interface IBadge {
    resType?: BadgeResType|null
    amount?: number|null
}
@protobuf.Type.d("tss_hall_common_Badge")
export class Badge extends protobuf.Message<IBadge> {
    constructor(properties: Properties<IBadge>) {
        super(properties);
        if (properties) {
            if (properties.resType) { this.resType = properties.resType }
            if (properties.amount) { this.amount = properties.amount }
        }
	}
    @protobuf.Field.d(1, BadgeResType, "optional", BadgeResType.BadgeResTypeUnknown)
    public resType?: BadgeResType|null = BadgeResType.BadgeResTypeUnknown
    @protobuf.Field.d(2, "int64", "optional", 0)
    public amount?: number|null = 0
}
export interface INewActivityBadge {
    type?: tss_hall_common_ActivityType|null
    id?: number|null
    updateAt?: number|null
}
@protobuf.Type.d("tss_hall_common_NewActivityBadge")
export class NewActivityBadge extends protobuf.Message<INewActivityBadge> {
    constructor(properties: Properties<INewActivityBadge>) {
        super(properties);
        if (properties) {
            if (properties.type) { this.type = properties.type }
            if (properties.id) { this.id = properties.id }
            if (properties.updateAt) { this.updateAt = properties.updateAt }
        }
	}
    @protobuf.Field.d(1, tss_hall_common_ActivityType, "optional", tss_hall_common_ActivityType.ActivityTypeUnknown)
    public type?: tss_hall_common_ActivityType|null = tss_hall_common_ActivityType.ActivityTypeUnknown
    @protobuf.Field.d(2, "int64", "optional", 0)
    public id?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public updateAt?: number|null = 0
}
export interface IBatchGetBadgeReq {
    types?: BadgeResType[]
}
@protobuf.Type.d("tss_hall_common_BatchGetBadgeReq")
export class BatchGetBadgeReq extends protobuf.Message<IBatchGetBadgeReq> {
    constructor(properties: Properties<IBatchGetBadgeReq>) {
        super(properties);
        if (properties) {
            if (properties.types) { this.types = []; properties.types.forEach((value, index)=>{this.types[index] = properties.types[index]})}
        }
	}
    @protobuf.Field.d(1, BadgeResType, "repeated", BadgeResType.BadgeResTypeUnknown)
    public types?: BadgeResType[] = []
}
export interface IBatchGetBadgeResp {
    badge?: IBadge[]
    newActivityBadge?: INewActivityBadge[]
}
@protobuf.Type.d("tss_hall_common_BatchGetBadgeResp")
export class BatchGetBadgeResp extends protobuf.Message<IBatchGetBadgeResp> {
    constructor(properties: Properties<IBatchGetBadgeResp>) {
        super(properties);
        if (properties) {
            if (properties.badge) { this.badge = []; properties.badge.forEach((value, index)=>{this.badge[index] = Badge.create(properties.badge[index]) as any})}
            if (properties.newActivityBadge) { this.newActivityBadge = []; properties.newActivityBadge.forEach((value, index)=>{this.newActivityBadge[index] = NewActivityBadge.create(properties.newActivityBadge[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_common_Badge", "repeated")
    public badge?: Badge[] = []
    @protobuf.Field.d(2, "tss_hall_common_NewActivityBadge", "repeated")
    public newActivityBadge?: NewActivityBadge[] = []
}
export interface IUserActivityBadgeQuery {
    id?: number|null
    type?: BadgeResType|null
}
@protobuf.Type.d("tss_hall_common_UserActivityBadgeQuery")
export class UserActivityBadgeQuery extends protobuf.Message<IUserActivityBadgeQuery> {
    constructor(properties: Properties<IUserActivityBadgeQuery>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.type) { this.type = properties.type }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public id?: number|null = 0
    @protobuf.Field.d(2, BadgeResType, "optional", BadgeResType.BadgeResTypeUnknown)
    public type?: BadgeResType|null = BadgeResType.BadgeResTypeUnknown
}
export interface IUserActivityBadge {
    id?: number|null
    type?: tss_hall_common_ActivityType|null
    badge?: IBadge
}
@protobuf.Type.d("tss_hall_common_UserActivityBadge")
export class UserActivityBadge extends protobuf.Message<IUserActivityBadge> {
    constructor(properties: Properties<IUserActivityBadge>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.type) { this.type = properties.type }
            if (properties.badge) { this.badge = Badge.create(properties.badge) as any }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public id?: number|null = 0
    @protobuf.Field.d(2, tss_hall_common_ActivityType, "optional", tss_hall_common_ActivityType.ActivityTypeUnknown)
    public type?: tss_hall_common_ActivityType|null = tss_hall_common_ActivityType.ActivityTypeUnknown
    @protobuf.Field.d(3, "tss_hall_common_Badge", "optional")
    public badge?: Badge|null
}
export interface IListUserActivityBadgeReq {
    queries?: IUserActivityBadgeQuery[]
}
@protobuf.Type.d("tss_hall_common_ListUserActivityBadgeReq")
export class ListUserActivityBadgeReq extends protobuf.Message<IListUserActivityBadgeReq> {
    constructor(properties: Properties<IListUserActivityBadgeReq>) {
        super(properties);
        if (properties) {
            if (properties.queries) { this.queries = []; properties.queries.forEach((value, index)=>{this.queries[index] = UserActivityBadgeQuery.create(properties.queries[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_common_UserActivityBadgeQuery", "repeated")
    public queries?: UserActivityBadgeQuery[] = []
}
export interface IListUserActivityBadgeResp {
    userActivityBadges?: IUserActivityBadge[]
}
@protobuf.Type.d("tss_hall_common_ListUserActivityBadgeResp")
export class ListUserActivityBadgeResp extends protobuf.Message<IListUserActivityBadgeResp> {
    constructor(properties: Properties<IListUserActivityBadgeResp>) {
        super(properties);
        if (properties) {
            if (properties.userActivityBadges) { this.userActivityBadges = []; properties.userActivityBadges.forEach((value, index)=>{this.userActivityBadges[index] = UserActivityBadge.create(properties.userActivityBadges[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "tss_hall_common_UserActivityBadge", "repeated")
    public userActivityBadges?: UserActivityBadge[] = []
}
export interface IBatchGetResourceBadgeReq {
    id?: number[]
}
@protobuf.Type.d("tss_hall_common_BatchGetResourceBadgeReq")
export class BatchGetResourceBadgeReq extends protobuf.Message<IBatchGetResourceBadgeReq> {
    constructor(properties: Properties<IBatchGetResourceBadgeReq>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = []; properties.id.forEach((value, index)=>{this.id[index] = properties.id[index]})}
        }
	}
    @protobuf.Field.d(1, "int64", "repeated", [])
    public id?: number[] = []
}
export interface IResourceBadge {
    id?: number|null
    amount?: number|null
}
@protobuf.Type.d("tss_hall_common_ResourceBadge")
export class ResourceBadge extends protobuf.Message<IResourceBadge> {
    constructor(properties: Properties<IResourceBadge>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.amount) { this.amount = properties.amount }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public id?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public amount?: number|null = 0
}
export interface IBatchGetResourceBadgeResp {
    badges?: IResourceBadge[]
}
@protobuf.Type.d("tss_hall_common_BatchGetResourceBadgeResp")
export class BatchGetResourceBadgeResp extends protobuf.Message<IBatchGetResourceBadgeResp> {
    constructor(properties: Properties<IBatchGetResourceBadgeResp>) {
        super(properties);
        if (properties) {
            if (properties.badges) { this.badges = []; properties.badges.forEach((value, index)=>{this.badges[index] = ResourceBadge.create(properties.badges[index]) as any})}
        }
	}
    @protobuf.Field.d(2, "tss_hall_common_ResourceBadge", "repeated")
    public badges?: ResourceBadge[] = []
}
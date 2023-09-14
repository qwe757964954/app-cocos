import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
export enum GroupType {  
    GroupTypeUnknown = 0,  
    NewUserGroup = 1,  
    VIPUserGroup = 2,  
    ActiveUserGroup = 3,  
    CardActiveUserGroup = 4,  
    CustomizeGroup = 5,  
    AllUserGroup = 6,  
    SevenDayActiveUserGroup = 7,  
    SevenDayLossUserGroup = 8,  
    ThirtyDayActiveUserGroup = 9,  
    ThirtyDayLossUserGroup = 10,  
    SevenDayPlayHighActiveUserGroup = 11,  
    SevenDayPlayLowActiveUserGroup = 12,  
    ThirtyDayPlayHighActiveUserGroup = 13,  
    ThirtyDayPlayLowActiveUserGroup = 14,  
    YesterdayAppStoreNewUserGroup = 15,  
    SQLTemplateGroup = 16,  
    ThirtyDayAppStorePlayFastMatch = 17,  
    NinetyDayAppStoreActiveUp25Minutes = 18,  
    NinetyDayAppStoreActiveUp100Minutes = 19,  
    NewRegisterUserGroup = 20,  
    UserBackGroup = 21,  
    UserContinuityFailedGroup = 22,  
    UserNewAndWonMatchPrizeGroup = 23,  
    RobotUserGroup = 24,  
    BankruptProtectGroup = 25,  
    NoviceUserGroup = 26,  
    UserBackV2Group = 27,
}
export interface IGroupParams {
    groupType?: GroupType|null
    countCap?: number|null
    countFloor?: number|null
}
@protobuf.Type.d("tss_common_GroupParams")
export class GroupParams extends protobuf.Message<IGroupParams> {
    constructor(properties: Properties<IGroupParams>) {
        super(properties);
        if (properties) {
            if (properties.groupType) { this.groupType = properties.groupType }
            if (properties.countCap) { this.countCap = properties.countCap }
            if (properties.countFloor) { this.countFloor = properties.countFloor }
        }
	}
    @protobuf.Field.d(1, GroupType, "optional", GroupType.GroupTypeUnknown)
    public groupType?: GroupType|null = GroupType.GroupTypeUnknown
    @protobuf.Field.d(2, "int64", "optional", 0)
    public countCap?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public countFloor?: number|null = 0
}
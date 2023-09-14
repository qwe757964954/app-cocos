import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  AssetItem as tss_common_AssetItem,IAssetItem as tss_common_IAssetItem ,  } from "idl/tss/common/common_define"
export enum PremiumCardType {  
    PremiumCardTypeUnknown = 0,  
    PremiumCardTypeTry = 1,  
    PremiumCardTypeGold = 2,  
    PremiumCardTypeWeek = 3,  
    PremiumCardTypeMonth = 4,  
    PremiumCardTypeQuarter = 5,  
    PremiumCardTypeVIP = 6,
}
export enum PrivilegeType {  
    PrivilegeTypeUnknown = 0,  
    PrivilegeTypeSeasonActivityNormalAward = 1,  
    PrivilegeTypeSeasonActivityAdvancedAward = 2,  
    PrivilegeTypeFreeSignUpRegularMatch = 3,  
    PrivilegeTypeFrontPageFreeTreasureChest = 4,  
    PrivilegeTypeSignInAwardDouble = 5,  
    PrivilegeTypeBankruptcySubsidy = 6,  
    PrivilegeTypeAdvertiseAwardDouble = 7,  
    PrivilegeTypeGlodenNickname = 8,  
    PrivilegeTypePermanentTitle = 9,  
    PrivilegeTypeVipRevive = 10,  
    PrivilegeTypeExclusivePriceExchange = 11,  
    PrivilegeTypeFirstTimePurchaseFreeDress = 12,  
    PrivilegeTypePrizeDrawMutipleChoice = 13,  
    PrivilegeTypeRechargeReward = 14,  
    PrivilegeTypeWeeklyAward = 15,  
    PrivilegeTypeUpgradeAward = 16,  
    PrivilegeTypeExclusiveCSV = 17,  
    PrivilegeTypeCoinExtraBargain = 18,  
    PrivilegeTypeSignInExtraAward = 19,  
    PrivilegeTypeMatchCoinExtraGain = 20,  
    PrivilegeTypeVipPrizeDraw = 21,  
    PrivilegeTypeVipInteractItem = 23,  
    PrivilegeTypeVipDress = 24,  
    PrivilegeTypeMatchDelayPlayGame = 25,  
    PrivilegeTypeVipSubsidyChance = 26,
}
export enum ParamType {  
    ParamTypeUnknown = 0,  
    ParamTypePercent = 1,  
    ParamTypeMultiple = 2,  
    ParamTypeFixedValue = 3,  
    ParamTypeAsset = 4,  
    ParamTypeAdjust = 5,
}
export interface IExtraParamConfig {
    pType?: ParamType|null
    Percent?: number|null
    multiple?: number|null
    fixedValue?: number|null
    assetItems?: tss_common_IAssetItem[]
    adjustValue?: number|null
}
@protobuf.Type.d("tss_hall_common_ExtraParamConfig")
export class ExtraParamConfig extends protobuf.Message<IExtraParamConfig> {
    constructor(properties: Properties<IExtraParamConfig>) {
        super(properties);
        if (properties) {
            if (properties.pType) { this.pType = properties.pType }
            if (properties.Percent) { this.Percent = properties.Percent }
            if (properties.multiple) { this.multiple = properties.multiple }
            if (properties.fixedValue) { this.fixedValue = properties.fixedValue }
            if (properties.assetItems) { this.assetItems = []; properties.assetItems.forEach((value, index)=>{this.assetItems[index] = tss_common_AssetItem.create(properties.assetItems[index]) as any})}
            if (properties.adjustValue) { this.adjustValue = properties.adjustValue }
        }
	}
    @protobuf.Field.d(1, ParamType, "optional", ParamType.ParamTypeUnknown)
    public pType?: ParamType|null = ParamType.ParamTypeUnknown
    @protobuf.Field.d(2, "int64", "optional", 0)
    public Percent?: number|null = 0
    @protobuf.Field.d(3, "int64", "optional", 0)
    public multiple?: number|null = 0
    @protobuf.Field.d(4, "int64", "optional", 0)
    public fixedValue?: number|null = 0
    @protobuf.Field.d(5, "tss_common_AssetItem", "repeated")
    public assetItems?: tss_common_AssetItem[] = []
    @protobuf.Field.d(6, "int64", "optional", 0)
    public adjustValue?: number|null = 0
}
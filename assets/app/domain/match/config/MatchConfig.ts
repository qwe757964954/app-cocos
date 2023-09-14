import SpecConfig from "./SpecConfig"
import LiveRoomConfig from "./LiveRoomConfig";
import { PBCommon, PBRegularCommon } from "../code/code";
import { Log } from "bos/base/log/Log";
import { App } from "app/App"
import { PBPremiumCardPrivilege } from "app/domain/privilege/code/code";
import { AssetItem,Asset, DynamicPoolInc } from "./PrizeConfig";
import { Wallet } from "app/domain/wallet/Wallet";
import { PropService } from "idl/tss/hall/prop.v4";
import StageConfig from "./StageConfig";
import { EntryNodeConfig } from "./EntryConfig";
import { PBPremiumCard } from "app/domain/premium/code/code";


export type SignCondition = {
    isFree ?: boolean,                  //是否免费
    asset ?: any,                       //展示的报名资产
    amount ?: number,                   //当前拥有的资产
    canSign ?: boolean,                 //是否可报名
    token ?: string,                    //报名需要用到的token
    isVip ?: boolean,                   //是否vip报名
    isVipCard ?: boolean                //当报名方式为EntryNodeTypeSelect，select条件是否尊享卡(vip)
    cardTips ?: {                       //当报名方式为EntryNodeTypeSelect，并且尊享卡作为条件，需要给到用户的提示
        isPass ?: boolean                   //是否满足尊享卡条件
        showAsset ?: any                    //展示的消耗
                                            //满足尊享卡条件报名展示普通报名的消耗（例：本次报名帮您节省xxx金币）
                                            //不满足尊享卡条件展示尊享卡报名的消耗（例：报名成功,成为尊享卡用户报名免费"）
    }
}

    /*[[
        @merge 前三是否合并展示
        返回一个可展示的排名奖励,前三名分开处理，之后的名次，奖励相同则合并
        result = {
            type = 1            --奖池类型
            ranks = {           --排名奖励
                {
                    startNum = 1,       --起始名次
                    endNum = 1,         --结束名次
                    fixedAssets = {      --固定奖励内容(AssetItem数组)
                    },
                    dynamicAssets = {    --动态奖励内容
                    },
                    rangeAwardImage = "",
                    rangeAwardName = "",
                    rate = 20,
                },
                {
                    startNum = 2,       --起始名次
                    endNum = 2,         --结束名次
                    ...
                },
            },
            totalPool = {},     --动态总奖池
            basePool = {},      --基础奖池
            mixPrize = false,   --是否多中奖励类型（动态 + 固定）
            enterIncPoolSwitch
            enterIncPool
            revivalIncPoolSwitch
            revivalIncPool
        }
    ]]*/

export type ShowRank = {
    startNum? : number,
    endNum? : number,
    fixedAssets? : AssetItem[],
    dynamicAssets? : AssetItem[],
    rangeAwardImage? : string,
    rangeAwardName? : string
    rate? : number,
}

export type PrizePoolInfo = {
    type? : number,
    ranks? : ShowRank[],
    totalPool? :AssetItem[],
    basePool? : AssetItem[],
    mixPrize? : boolean,
    enterIncPoolSwitch? : number,
    enterIncPool? : DynamicPoolInc,
    revivalIncPoolSwitch? : number,
    revivalIncPool? : DynamicPoolInc,
}

export class MatchConfig {

    liveRoom = new LiveRoomConfig();

    spec = new SpecConfig();

    creator: number;

    operator: string;

    updateAt: number;

    schedulerID: number;

    keepDuration: number;

    showSeq: number;

    _isInit = false

    reset() {
        this.liveRoom.reset()
        this.spec.reset()

        this.creator = 0
        this.operator = ""
        this.updateAt = 0
        this.schedulerID = 0
        this.keepDuration = 0
        this.showSeq = 0

        this._isInit = false
    }

    init(data) {
        this.liveRoom.init(data.liveRoom)
        this.spec.init(data.spec)

        this.creator = data.creator
        this.operator = data.operator
        this.updateAt = data.updateAt
        this.schedulerID = data.schedulerID
        this.keepDuration = data.keepDuration
        this.showSeq = data.showSeq

        this._isInit = true
    }

    getUpdateAt(){
        return this.updateAt
    }

    get isInit(){
        return this._isInit
    }

    getRoomName() {
        return this.liveRoom.title || ""
    }

    getRoomType() {
        return this.liveRoom.type || PBRegularCommon.LiveRoomTypeUnknown
    }

    getMatchName() {
        if (this.spec.viewInfo) {
            return this.spec.viewInfo.matchName || ""
        }
    }

    getMatchGuideForNovice() {
        if (this.spec.viewInfo) {
            return this.spec.viewInfo.guideForNovice || 2
        }
    }

    getMatchTagType() {
        if (this.spec.viewInfo) {
            return this.spec.viewInfo.matchTagType;
        }

        return PBRegularCommon.MatchTagTypeUnknown;
    }

    getMatchSpecialType() {
        if (this.spec.viewInfo) {
            return this.spec.viewInfo.matchSpecialType;
        }

        return PBRegularCommon.MatchSpecialUnknown;
    }

    getRoomCreator() {
        return this.creator
    }
    //************************************************************* */
    getCMSMatchDesc(): string {
        if (this.spec && this.spec.viewInfo) {
            return this.spec.viewInfo.CMSMatchDesc;
        }
        return "";
    }

    getPlayOptName(): string {
        if (this.spec && this.spec.game) {
            return this.spec.game.playOptName || "经典玩法";
        }
        return "经典玩法";
    }

    getPlayOpt(): number {
        if (this.spec && this.spec.game) {
            return this.spec.game.playOpt;
        }
        return 0;
    }

    getListDisplayStyle(): number {
        if (this.spec && this.spec.viewInfo) {
            return this.spec.viewInfo.listDisplayStyle;
        }

        return PBRegularCommon.MatchListDisplayStyleUnknown;
    }

    //获取报名身份限制信息
    getEntryIdentifyLimit() {
        return this.spec?.entry?.userRole
    }

    getViewImgURL(): string {
        if (this.spec && this.spec.viewInfo) {
            return this.spec.viewInfo.imgURL || "";
        }
        return "";
    }

    getNewViewImgURL(): string {
        if (this.spec && this.spec.viewInfo) {
            return this.spec.viewInfo.verImgURL || "";
        }
        return "";
    }

    getHasMatch(): boolean {
        if (this.spec) {
            if (this.spec.type == PBRegularCommon.MatchTypeTiming
                || this.spec.type == PBRegularCommon.MatchTypeSNG) {
                return true;
            }
        }
        return false;
    }

    getMatchStartAt(): number {
        if (this.spec && this.spec.time) {
            return this.spec.time.startAt || 0;
        }
        return 0;
    }

    getMatchReadyRelDuration(): number {
        if (this.spec && this.spec.time) {
            return this.spec.time.readyRelDuration ?? 0;
        }
        return 0;
    }

    getMatchCycleStartAt(): number {
        if (this.spec && this.spec.time) {
            return this.spec.time.cycleStartAt ?? 0;
        }
        return 0;
    }

    getMatchCycleEndAt(): number {
        if (this.spec && this.spec.time) {
            return this.spec.time.cycleEndAt ?? 0;
        }
        return 0;
    }

    getMatchSignTime(): number {
        if (this.spec && this.spec.time) {
            return this.spec.time.earliestEnterTime ?? 0;
        }
        return 0;
    }

    getMatchReadyAt(): number {
        if (this.spec && this.spec.time) {
            return this.spec.time.readyAt || 0;
        }
        return 0;
    }

    getMatchSignConfig(): any {
        if (this.spec) {
            return this.spec.entry || {};
        }
        return {};
    }

    getMatchMinUserNum(): number {
        if (this.spec && this.spec.match) {
            return this.spec.match.minUserNum || 0;
        }
        return 0;
    }

    getOpenDynamicStage(): boolean {
        if (this.spec && this.spec.match) {
            return this.spec.match.isOpenDynamicStage;
        }
        return false;
    }

    getMatchMaxUserWithDynamic(): number {
        if (this.spec && this.spec.match) {
            const dynamicSpecConfigs = this.spec.match.dynamicSpecConfigs || [];
            if (dynamicSpecConfigs.length > 0) {
                const dynamicSpecConfig = dynamicSpecConfigs[dynamicSpecConfigs.length - 1];
                return dynamicSpecConfig.maxNum || 0;
            }
        }
        return 0;
    }

    getHasGroupConfig(dynamicID: number): boolean {
        const stages = this.getMatchStages(dynamicID);
        if (stages) {
            for (const i in stages) {
                const v = stages[i];
                if (v.groupConfig && v.groupConfig.isEnabled) {
                    return true;
                }
            }
        }
        return false;
    }

    getConfigGroupUserNum(dynamicID: number): number {
        const stages = this.getMatchStages(dynamicID);
        if (stages) {
            for (const i in stages) {
                const v = stages[i];
                if (v && v.groupConfig && v.groupConfig.isEnabled) {
                    return v.groupConfig.userNum;
                }
            }
        }
        return 0;
    }

    getDynamicStage(dynamicID: number): StageConfig[] {
        if (dynamicID && this.spec && this.spec.match) {
            const dynamicSpecConfigs = this.spec.match.dynamicSpecConfigs || [];
            for (const i in dynamicSpecConfigs) {
                const v = dynamicSpecConfigs[i];
                if (v.id === dynamicID) {
                    return v.stages || null;
                }
            }
        }
        return null
    }

    getMatchStages(dynamicID?: number): StageConfig[] {
        if (this.spec && this.spec.match) {
            if (this.spec.match.isOpenDynamicStage) {
                return this.getDynamicStage(dynamicID ?? 1);
            } else {
                return this.spec.match.stages;
            }
        }
        return null;
    }

    getGameID(): string | undefined {
        return this.spec?.game?.gameId;
    }

    getPromotionType(index: number, dynamicID: number): number {
        const stages = this.getMatchStages(dynamicID);
        if (stages && stages[index]) {
            const promotion = stages[index].promotion;
            return promotion.promotionType || 0;
        }
        return 0;
    }

    getUserNum(index: number, dynamicID: number): number {
        const stages = this.getMatchStages(dynamicID);
        if (stages && stages[index]) {
            const endConfig = stages[index].end;
            return endConfig.userNum || 0;
        }
        return 0;
    }

    getStageDuration(index: number, dynamicID: number): number {
        const stages = this.getMatchStages(dynamicID);
        if (stages && stages[index]) {
            const endConfig = stages[index].end;
            return endConfig.duration ?? 0;
        }

        return 0;
    }

    getTotalGameNum(index: number, dynamicID: number): number {
        const stages = this.getMatchStages(dynamicID);
        if (stages && stages[index]) {
            const endConfig = stages[index].end;
            return endConfig.gameNum ?? 0;
        }

        return 0;
    }

    getRoundSeq(index: number, dynamicID: number): number {
        const stages = this.getMatchStages(dynamicID);
        if (stages && stages[index]) {
            return stages[index].roundSeq ?? 1;
        }

        return 1;
    }

    getMatchType(): number {
        if (this.spec) {
            return this.spec.type;
        }

        return PBRegularCommon.MatchTypeUnknown;
    }

    getObConfig(): any {
        return this.spec?.observe;
    }

    getOutScoreConfig(index: number, dynamicID: number): any | undefined {
        const stages = this.getMatchStages(dynamicID);
        if (stages && stages[index]) {
            return stages[index].outScore;
        }
    }

    getBaseScore(index: number, dynamicID: number): number {
        const stages = this.getMatchStages(dynamicID);
        if (stages && stages[index]) {
            const settlement = stages[index].settlement;
            const baseScore = settlement.baseScore;
            return baseScore.initValue || 0;
        }
        return 0;
    }

    getSubGameTag(): string {
        if (this.spec) {
            const subMatchType = this.spec.subMatchType;
            if (subMatchType === PBRegularCommon.SubMatchTypeTeam) {
                return "team";
            }
        }
        return "regular";
    }

    getCycleMode(): number {
        if (this.spec) {
            return this.spec.cycleMode;
        }
        return PBRegularCommon.CycleModeUnknown;
    }

    getCycleDelay(): number {
        if (this.spec && this.spec.time) {
            return this.spec.time.roomCycleDelay || 0;
        }
        return 0;
    }

    getTimeSpans(): any[] {
        if (this.spec && this.spec.time) {
            return this.spec.time.timeSpans || [];
        }
        return [];
    }

    getPunishmentCount(): number {
        if (this.spec?.match?.punishment) {
            return this.spec.match.punishment.count ?? 5;
        }
        return 0;
    }

    getPunishmentSwitch(): boolean {
        if (this.spec?.match?.punishment) {
            return this.spec.match.punishment.isEnabled;
        }
        return false;
    }

    getStageType(index: number, dynamicID: number): number {
        const stages = this.getMatchStages(dynamicID);
        if (stages && stages[index]) {
            return stages[index].stageType ?? PBRegularCommon.StageTypeUnkown;
        }
        return PBRegularCommon.StageTypeUnkown;
    }

    getStageEndType(index: number, dynamicID: number): number {
        const stages = this.getMatchStages(dynamicID);
        if (stages && stages[index]) {
            const endConfig = stages[index].end;
            return endConfig.type ?? PBRegularCommon.StageEndTypeUnknown;
        }

        return PBRegularCommon.StageEndTypeUnknown;
    }

    // 获取晋级配置
    getPromotionConfig(index: number, dynamicID: number): any {
        const stages = this.getMatchStages(dynamicID);
        if (stages && stages[index]) {
            return stages[index].promotion;
        }
    }

    getUserInitScore(): number {
        if (this.spec && this.spec.match) {
            return this.spec.match.userInitScore || 0;
        }
        return 0;
    }

    // 获取预计比赛时间
    getExpectedDuration(): number {
        if (this.spec && this.spec.viewInfo) {
            return this.spec.viewInfo.expectedDuration;
        }
        return 0;
    }

    // 获取奖励类型
    getPrizeType() {
        if (this.spec?.match?.prize) {
            return this.spec.match.prize.type;
        }
        return PBRegularCommon.PrizeTypeUnknown;
    }

    // 获取奖励配置
    getPrizeConfig() {
        if (this.spec && this.spec.match) {
            return this.spec.match.prize;
        }
    }

    // 获取打立出局总轮数
    getCountStrike(dynamicID: number): number {
        if (this.spec && this.spec.match) {
            return this.spec.match.getCountStrike(dynamicID);
        }
        return 1;
    }

    // 获取定局积分总轮数
    getCountFinality(dynamicID: number): number {
        if (this.spec && this.spec.match) {
            return this.spec.match.getCountFinality(dynamicID);
        }
        return 1;
    }

    // 获取是否需要颁奖
    getNeedAward(): boolean {
        if (this.spec && this.spec.match && this.spec.match.prize) {
            return this.spec.match.prize.isEmceeAward || false;
        }
        return false;
    }

    getObserverView(): number {
        if (this.spec?.observe) {
            return this.spec.observe.view;
        }
        return PBRegularCommon.ObserveViewUnknown;
    }

    getIsCanUseWealFreeCount(): boolean {
        if (this.spec?.entry) {
            return this.spec.entry.isCanUseWealFreeCount;
        }
        return false;
    }

    getRevivalConfig(index: number, dynamicID: number) {
        const stages = this.getMatchStages(dynamicID);
        if (stages && stages[index]) {
            return stages[index].revival;
        }
    }

    getSchedulerID(): number {
        return this.spec?.schedulerID ?? 0;
    }

    getSeatNum(): number {
        if (this.spec && this.spec.game) {
            return this.spec.game.seatCnt || 3;
        }
        return 3;
    }

    getPromptJump(): any {
        if (this.spec) {
            return this.spec.promptJump;
        }
    }

    getPreventCheat(): any[] {
        if (this.spec) {
            return this.spec.preventCheat;
        }
    }

    // 获取比赛延时入场配置信息
    getDelayMatchCfg(): any {
        if (this.spec) {
            return this.spec.delayPlay || { isEnabled: false, delayDuration: 0, isFirstStageEffect: true };
        }
    }

    // 获取比赛调度类型
    getSchedulerType(): number {
        if (this.spec) {
            return this.spec.schedulerType || PBRegularCommon.SchedulerTypeUnknown;
        }
    }

    //获取比赛奖励人数
    getTotalPrizeNum(dynamicID: number): number {
        const prizeType = this.getPrizeType()
        const prizePoolConfig = this.getPrizeConfig()
    
        if (prizeType === PBRegularCommon.PrizeTypeFixed) { // 静态奖励
            const ranks = prizePoolConfig.fixedPool?.ranks
            if (ranks && ranks.length > 0) {
                const rank = ranks[ranks.length - 1]
                return rank.endRank
            }
        } else if (prizeType === PBRegularCommon.PrizeTypeDynamic) {
            const ranks = prizePoolConfig.dynamicPool?.ranks
            if (ranks && ranks.length > 0) {
                const rank = ranks[ranks.length - 1]
                return rank.endRank
            }
        } else if (prizePoolConfig.type === PBRegularCommon.PrizeTypeFixedTeam) {
            return 1
        } else if (prizePoolConfig.type === PBRegularCommon.PrizeTypeFixedAndDynamic) {
            const fixAndDynamicPool = prizePoolConfig.fixAndDynamicPool
            const isDynamicStage = fixAndDynamicPool.isDynamicStage
            let ranks = fixAndDynamicPool.ranks
    
            if (isDynamicStage) {
                const dynamicRankPrizeRateAndFix = fixAndDynamicPool.dynamicRankPrizeRateAndFix || []
                for (const v of dynamicRankPrizeRateAndFix) {
                    if (v.dynamicId === dynamicID) {
                        ranks = v.rankPrizeRateAndFix
                        break
                    }
                }
            }
    
            if (ranks && ranks.length > 0) {
                const rank = ranks[ranks.length - 1]
                return rank.endRank
            }
        }
        return 0
    }

    getBasePool() {
        const prizePoolConfig = this.getPrizeConfig();
        if (prizePoolConfig.type === PBRegularCommon.PrizeTypeDynamic) {
            const dynamicPool = prizePoolConfig.dynamicPool;
            let aBasePool = dynamicPool.basePool;
            let basePool = MatchConfig.getAssetItems(aBasePool);
            return basePool;
        } else if (prizePoolConfig.type === PBRegularCommon.PrizeTypeFixedAndDynamic) {
            const fixAndDynamicPool = prizePoolConfig.fixAndDynamicPool;
            const basePool = fixAndDynamicPool.basePool;
            return basePool;
        }
    }

    getRevivalConsumes(dynamicID : number){
        const consumes = [];
        const stages = this.getMatchStages(dynamicID);
        for (const stage of stages) {
            const revival = stage.revival;
            if (revival && revival.isEnabled) {
                const consume = revival.consume;
                for (const c of consume) {
                    consumes.push(c);
                }
            }
        }
        return consumes;
    }

    getRefactorVer(this: MatchConfig): number {
        if (this.spec) {
            return this.spec.refactorVer || PBRegularCommon.RefactorVerV1;
        }
        return PBRegularCommon.RefactorVerV1;
    }

    static getAssetItems(asset: Asset): AssetItem[] {
        const assetItems: AssetItem[] = [];
      
        if (asset.coin && asset.coin.amount && asset.coin.amount > 0) { //金币
          assetItems.push(asset.coin);
        }
      
        if (asset.props && asset.props.length > 0) {  //道具
          for (const prop of asset.props) {
            if (prop.amount > 0) {
              assetItems.push(prop);
            }
          }
        }
      
        if (asset.diamond && asset.diamond.amount && asset.diamond.amount > 0) { //钻石
          assetItems.push(asset.diamond);
        }
      
        if (asset.mung && asset.mung.amount && asset.mung.amount > 0) { //奖券
          assetItems.push(asset.mung);
        }
      
        if (asset.gift && asset.gift.length > 0) {  //礼盒
          for (const gift of asset.gift) {
            if (gift.amount > 0) {
              assetItems.push(gift);
            }
          }
        }
      
        if (asset.honourPoint && asset.honourPoint.amount && asset.honourPoint.amount > 0) { //荣誉点
          assetItems.push(asset.honourPoint);
        }
      
        return assetItems;
    }

    static updateResult(rank: any, fixedAssets: any, dynamicAssets: any, rangeAwardImage: string, rangeAwardName: string, rate: number, merge : boolean) {
        let result : {
            startNum : number,
            endNum : number,
            fixedAssets : AssetItem[],
            dynamicAssets : AssetItem[],
            rangeAwardImage : string,
            rangeAwardName : string
            rate : number,
        }[] = [];
        let num = rank.endRank - rank.startRank + 1;
        const preRate = Math.floor(rate / num);

        if (rank.startRank >= 1 && rank.startRank <= 3 && rank.endRank >= rank.startRank && !merge) {
            let num = rank.endRank > 3 ? 3 : rank.endRank;

            for (let i = rank.startRank; i <= num; i++) {
                let data = {
                    startNum: i,
                    endNum: i,
                    fixedAssets: fixedAssets,
                    dynamicAssets: dynamicAssets,
                    rangeAwardImage: rangeAwardImage,
                    rangeAwardName: rangeAwardName,
                    rate: preRate,
                };
                result.push(data);
            }

            if (rank.endRank > 3) {
                const data = {
                    startNum: 4,
                    endNum: rank.endRank,
                    fixedAssets: fixedAssets,
                    dynamicAssets: dynamicAssets,
                    rangeAwardImage: rangeAwardImage,
                    rangeAwardName: rangeAwardName,
                    rate: preRate * (rank.endRank - 4 + 1),
                };
                result.push(data);
            }
        } else {
            const data = {
                startNum: rank.startRank,
                endNum: rank.endRank,
                fixedAssets: fixedAssets,
                dynamicAssets: dynamicAssets,
                rangeAwardImage: rangeAwardImage,
                rangeAwardName: rangeAwardName,
                rate: rate,
            };
            result.push(data);
        }

        return result;
    }

    static getRateAssetItems(baseItems: AssetItem[], rate: number, num?: number): any[] {
        num = num || 1;
        let items : AssetItem[] = []
        for (let i = 0; i < baseItems.length; i++) {
            const item = new AssetItem()
            item.update(baseItems[i])
            const preRate = rate / num;
            item.amount = Math.floor(preRate / 100 * Math.floor(item.amount));
            items.push(item)
        }
        return items;
    }

    /*[[
        @merge 前三是否合并展示
        返回一个可展示的排名奖励,前三名分开处理，之后的名次，奖励相同则合并
        result = {
            type = 1            --奖池类型
            ranks = {           --排名奖励
                {
                    startNum = 1,       --起始名次
                    endNum = 1,         --结束名次
                    fixedAssets = {      --固定奖励内容(AssetItem数组)
                    },
                    dynamicAssets = {    --动态奖励内容
                    },
                    rangeAwardImage = "",
                    rangeAwardName = "",
                    rate = 20,
                },
                {
                    startNum = 2,       --起始名次
                    endNum = 2,         --结束名次
                    ...
                },
            },
            totalPool = {},     --动态总奖池
            basePool = {},      --基础奖池
            mixPrize = false,   --是否多中奖励类型（动态 + 固定）
            enterIncPoolSwitch
            enterIncPool
            revivalIncPoolSwitch
            revivalIncPool
        }
    ]]*/
    getRankPrize(dynamicTotalPool: AssetItem[], dynamicID: number, merge?: boolean) {
        const prizePoolConfig = this.getPrizeConfig();
        console.debug("MatchConfig:getRankPrize", prizePoolConfig);
        let result: PrizePoolInfo = {}
        result.type = prizePoolConfig.type;
        let tRanks : {
            startNum : number,
            endNum : number,
            fixedAssets : AssetItem[],
            dynamicAssets : AssetItem[],
            rangeAwardImage : string,
            rangeAwardName : string
            rate : number,
        }[] = []
        if (prizePoolConfig.type === PBRegularCommon.PrizeTypeFixed) {
            const ranks = prizePoolConfig.fixedPool && prizePoolConfig.fixedPool.ranks;
            for (let i = 0; i < (ranks || []).length; i++) {
                const rank = ranks[i];
                const assetItems = MatchConfig.getAssetItems(rank.asset);
                const items = MatchConfig.updateResult(rank, assetItems, null, rank.rangeAwardImage, rank.rangeAwardName, null, merge);
                tRanks = [...tRanks, ...items]
            }
            result.ranks = tRanks;
        } else if (prizePoolConfig.type === PBRegularCommon.PrizeTypeDynamic) {
            const totalPool = dynamicTotalPool; //总奖池
            result.totalPool = totalPool;
            const dynamicPool = prizePoolConfig.dynamicPool
            let aBasePool = dynamicPool.basePool;
            let basePool = MatchConfig.getAssetItems(aBasePool); //转换AssetItem数组                       
            result.basePool = basePool;
            if (totalPool) {
                const ranks = dynamicPool.ranks;
                if (ranks && ranks.length > 0) {
                    for (let i = 0; i < (ranks || []).length; i++) {
                        const rank = ranks[i];
                        const dynamicItems = MatchConfig.getRateAssetItems(totalPool, rank.rate, rank.endRank - rank.startRank + 1);
                        const items = MatchConfig.updateResult(rank, null, dynamicItems, null, null, rank.rate, merge);
                        tRanks =  [...tRanks, ...items]
                    }
                }
                result.ranks = tRanks;
            }
        } else if (prizePoolConfig.type === PBRegularCommon.PrizeTypeFixedTeam) {
            console.error("MatchConfig getRankPrize not sport this pool type of", PBRegularCommon.PrizeTypeFixedTeam)
            return null
        } else if (prizePoolConfig.type === PBRegularCommon.PrizeTypeFixedAndDynamic) {
            const totalPool = dynamicTotalPool;
            result.totalPool = totalPool;
            const fixAndDynamicPool = prizePoolConfig.fixAndDynamicPool;
            result.enterIncPoolSwitch = fixAndDynamicPool.enterIncPoolSwitch;
            result.enterIncPool = fixAndDynamicPool.enterIncPool;
            result.revivalIncPoolSwitch = fixAndDynamicPool.revivalIncPoolSwitch;
            result.revivalIncPool = fixAndDynamicPool.revivalIncPool;
            result.basePool = fixAndDynamicPool.basePool;
    
            const isDynamicStage = fixAndDynamicPool.isDynamicStage;
            const fixPrizeSwitch = fixAndDynamicPool.fixPrizeSwitch;
            let ranks = fixAndDynamicPool.ranks;
            if (isDynamicStage) {
                const dynamicRankPrizeRateAndFix = fixAndDynamicPool.dynamicRankPrizeRateAndFix || [];
                for (let i = 0; i < (dynamicRankPrizeRateAndFix || []).length; i++) {
                    const v = dynamicRankPrizeRateAndFix[i];
                    if (v.dynamicId === dynamicID) {
                        ranks = v.rankPrizeRateAndFix;
                        break;
                    }
                }
            }
            // console.debug("getRankPrize totalPool", totalPool)
            if (ranks && ranks.length > 0) {
                for (let i = 0; i < (ranks || []).length; i++) {
                    const rank = ranks[i];
                    const dynamicItems = MatchConfig.getRateAssetItems(totalPool, rank.rate / 10, rank.endRank - rank.startRank + 1);
                    // console.debug("getRankPrize dynamicItems", dynamicItems)
                    let fixPrize = null;
                    if (fixPrizeSwitch === PBCommon.SwitchStateOn) {
                        fixPrize = rank.fixPrize;
                        result.mixPrize = true;
                    }
                    const items = MatchConfig.updateResult(rank, fixPrize, dynamicItems, rank.rangeAwardImage, rank.rangeAwardName, rank.rate, merge)
                    tRanks =  [...tRanks, ...items]
                }
                result.ranks = tRanks;
            }
        }
        return result
    }

   /**------------------报名条件相关----------------------*/


    async compareNodeTypeVip() {
        let hasCard =  await App.premiumMgr.getCardOverLevel(0)
        let result : {ok : boolean, result : SignCondition} = {ok : hasCard, result : {isVip : hasCard}}
        return result
    }

    async compareNodeTypeAsset(sign: string, node: EntryNodeConfig){
        let model : Wallet = await App.walletMgr.getUserWallet(App.userMgr.loginUid).finish()

        let result: {ok : boolean, result : SignCondition} = {ok : false, result : {}}
        if (sign === ">=") {
            const asset = node.asset;
            if (asset.diamond && asset.diamond.amount > 0) {
                result.ok = model.diamond >= asset.diamond.amount;
                result.result = {asset: asset.diamond, amount: model.diamond, isFree: false, canSign: result.ok, token: node.id.toString()};
            } else if (asset.coin && asset.coin.amount > 0) {
                result.ok = model.coin >= asset.coin.amount;
                result.result = {asset: asset.coin, amount: model.coin, isFree: false, canSign: result.ok, token: node.id.toString()};
            } else if (asset.mung && asset.mung.amount > 0) {
                result.ok = model.mung >= asset.mung.amount;
                result.result = { asset: asset.mung, amount: model.mung, isFree: false, canSign: result.ok, token: node.id.toString()};
            } else if (asset.props && asset.props[1] && asset.props[1].amount > 0) {
                const req = {
                    uid : App.userMgr.loginUser.uid,
                    propID : asset.props[1].id,
                };
                const propAsset = asset.props[1];
                let data = await PropService.CountUserProp(req)
                if (data.err == null && data.resp?.totalSize && data.resp.totalSize >= asset.props[1].amount) {
                    result.ok = true
                    result.result = {asset: propAsset, amount: data.resp.totalSize, isFree: false, canSign: true, token: node.id.toString()};
                } else {
                    result.ok = false
                    result.result = {asset: propAsset, amount: data.resp?.totalSize ?? 0, isFree: false, canSign: false, token: node.id.toString()};
                }
            } else {
                result.ok = true;
                result.result = {isFree: true, canSign: true, token: node.id.toString()};
            }
        } else {
            const asset = node.asset;
            if (asset.diamond && asset.diamond.amount > 0) {
                result.ok = model.diamond < asset.diamond.amount;
                result.result = {asset: asset.diamond, amount: model.diamond, isFree: false, canSign: result.ok, token: node.id.toString()};
            } else if (asset.coin && asset.coin.amount > 0) {
                result.ok = model.coin < asset.coin.amount;
                result.result = {asset: asset.coin, amount: model.coin, isFree: false, canSign: result.ok, token: node.id.toString()};
            } else if (asset.mung && asset.mung.amount > 0) {
                result.ok = model.mung < asset.mung.amount;
                result.result = {asset: asset.mung, amount: model.mung, isFree: false, canSign: result.ok, token: node.id.toString()};
            } else if (asset.props && asset.props[1].amount > 0) {
                const req= {
                    uid : App.userMgr.loginUser.uid,
                    propID : asset.props[1].id,
                };
                const propAsset = asset.props[1];
                let data = await PropService.CountUserProp(req)
                if (data.err == null && data.resp?.totalSize && data.resp.totalSize < asset.props[1].amount) {
                    result.ok = true
                    result.result = {asset: propAsset, amount: data.resp.totalSize, isFree: false, canSign: true, token: node.id.toString()};
                } else {
                    result.ok = false
                    result.result = {asset: propAsset, amount: data.resp?.totalSize ?? 0, isFree: false, canSign: false, token: node.id.toString()};
                }
            } else {
                result.ok = true;
                result.result = {isFree: true, canSign: true, token: node.id.toString()};
            }
        }
        return result
    }

    async compareUserAndEntryNode(sign: string, node: EntryNodeConfig) {
        if (node.type === PBRegularCommon.EntryNodeTypeVip) {
            return await this.compareNodeTypeVip();
        } else if (node.type === PBRegularCommon.EntryNodeTypeAsset) {
            return await this.compareNodeTypeAsset(sign, node);
        } else if (node.type === PBRegularCommon.EntryNodeTypeFree) {
            let condition : SignCondition = {isFree : true, canSign : true, token : node.id.toString()}
            return {ok : true, result: condition }
        } else if (node.type === PBRegularCommon.EntryNodeTypeExp) {
            let condition : SignCondition = {}
            return {ok : false, result :condition}
        } else if (node.type === PBRegularCommon.EntryNodeTypeUnknown) {
            let condition : SignCondition = {}
            return {ok : false, result :condition}
        }
        let condition : SignCondition = {}
        return {ok : false, result :condition}
    }

    isSameConsume(result1?: any, result2?: any): boolean {
        if (!result1 || !result2) {
            return false
        }

        if (result1.isFree && result2.isFree) {
            return true;
        }

        const asset1 = result1.asset || {};
        const asset2 = result2.asset || {};

        if (asset1.type === asset2.type && asset1.id === asset2.id && asset1.amount === asset2.amount ) {
            return true;
        }

        return false;
    }

    /**
    获取一个可展示的资产报名方式
    @return SignCondition
    */
    async getNormalSignInfo(): Promise<SignCondition> {
        if (this.spec && this.spec.entry && this.spec.entry.isEnabled) {
            const entryNodeConfig = this.spec.entry.node;
            if (entryNodeConfig.type === PBRegularCommon.EntryNodeTypeSelect) {
                /**条件报名方式,nodes[1]条件满足->使用nodes[2]作为报名条件,否则nodes[2]作为报名条件*/
                const nodes = entryNodeConfig.nodes;
                const compareResult = await this.compareUserAndEntryNode(entryNodeConfig.sign, nodes[1]);
                if (compareResult.ok) {
                    let result2 = await this.compareUserAndEntryNode(">=", nodes[2]);
                    let result = result2.result
                    if (nodes[1].type === PBRegularCommon.EntryNodeTypeVip) {
                        let result3 = await this.compareUserAndEntryNode(">=", nodes[3]);
                        if (!this.isSameConsume(result2, result3)) {
                            result.cardTips = {
                                isPass: true,
                                showAsset: result3.result.asset
                            };
                        }
                    }
                    result.isVipCard = nodes[1].type === PBRegularCommon.EntryNodeTypeVip;
                    return result;
                } else {
                    let result3 = await this.compareUserAndEntryNode(">=", nodes[3]);
                    let result = result3.result
                    if (nodes[1].type === PBRegularCommon.EntryNodeTypeVip) {
                        let result2 = await this.compareUserAndEntryNode(">=", nodes[2]);
                        if (!this.isSameConsume(result2, result3)) {
                            result.cardTips = {
                                isPass: false,
                                showAsset: result2.result.asset
                            };
                        }
                    }
                    return result;
                }
            } else if (entryNodeConfig.type === PBRegularCommon.EntryNodeTypeOr) {
                const nodes = entryNodeConfig.nodes;
                const validResult : SignCondition[] = [];
                for (const v of nodes) {
                    let result = await this.compareUserAndEntryNode(">=", v);
                    validResult.push(result.result);
                    if (result.ok) {
                        //找到一个可报名的方式，接直接返回(如果有多个是否需要考虑优先展示的问题？)
                        return result.result;
                    }
                }
                //否则返回第一个不满足的
                return validResult[0];
            } else if (entryNodeConfig.type === PBRegularCommon.EntryNodeTypeAsset) {
                const result = await this.compareUserAndEntryNode(">=", entryNodeConfig);
                return result.result;
            } else if (entryNodeConfig.type === PBRegularCommon.EntryNodeTypeAnd) {
                //暂时没有这种报名方式
                return 
            }
        }
    }

    async getCardSignInfo() {
        if (this.getIsCanUseWealFreeCount()) {
            let data = await Promise.all([
                App.privilegeMgr.getHasPrivilege(PBPremiumCardPrivilege.PrivilegeTypeFreeSignUpRegularMatch),
                App.premiumMgr.getCardOverLevel(PBPremiumCard.PremiumCardTypeTry)
            ]) 
            return { remainderTimes: data[0] || 0, isVip : data[1]};
        }
    }
      
    async getAdSignInfo() {
        if (this.getIsCanUseWealFreeCount()) {
        //     const AdApi = require("app.srvApi.ad");
        //     const AdvertisementService = require("app.idl.tss.hall.advertisement_v1").AdvertisementService;

        //     const AdvertisementPB = require("app.idl.tss.hall.advertisement_v1").PB["tss.hall.advertisement.v1"];

        //     const adeffect = AdApi.adEffectContent(this.getRoomType(), this.getSchedulerID(), this.getGameID(), null, null);
        //     const params = {
        //         uid: App.userMgr.loginUser.uid,
        //         scene: AdvertisementPB.AdSceneMatchSignUp,
        //         contentMap: adeffect, // 广告生效内容， 目前是子游戏使用
        //     };
        //     const [, resp] = AdvertisementService.GetUserAdConfig_sync(params, this);
        //     Log.i("AdvertisementService:GetUserAdConfig_sync", resp, params);
        //     if (resp.code == 0) {
        //         const advConfig = resp.config || {};
        //         if (advConfig.visible) {
        //             return { activeChanceLeft: advConfig.activeChanceLeft || 0, totalActiveChance: advConfig.totalActiveChance || 0 };
        //         }
        //     } else {
        //         if (resp.code == AdvertisementPB.CodeAdConfigNotFound) {

        //         } else {
        //             // Toast:show("获取广告配置出错 code= "..resp.code)
        //             console.error("AdvertisementService:GetUserAdConfig 出错");
        //         }
        //     }
        }
    }
    
}
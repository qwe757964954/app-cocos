import { PBCommon, PBRegularCommon } from "../code/code";

class ExpireData {
    type: number;
    value: number;

    reset(): void {
        this.type  = 0
        this.value  = 0
    }

    update(data: any): void {
        if (!data) {
            return;
        }

        this.type  = data.type
        this.value  = data.value
    }
}

export class AssetItem {
    id: number = 0;
    amount: number = 0;
    img: string = "";
    icon: string = "";
    desc: string = "";
    expire = new ExpireData();
    name: string = "";
    type: number = 0;
    meta:any = null

    reset(): void {

        this.id          = 0;
        this.amount      = 0;
        this.img         = "";
        this.icon        = "";
        this.desc        = "";
        this.name        = "";
        this.type        = 0;
        this.meta        = null

        this.expire.reset()
    }

    update(data: any): void {
        if (!data) {
            return;
        }

        this.id          = data.id     
        this.amount      = data.amount 
        this.img         = data.img    
        this.icon        = data.icon   
        this.desc        = data.desc   
        this.name        = data.name   
        this.type        = data.type   
        this.meta        = data.meta   

        this.expire.reset()
    }
}

export class Asset {
    props: AssetItem[];
    diamond: AssetItem = new AssetItem();
    coin: AssetItem = new AssetItem();
    mung:AssetItem = new AssetItem();
    gift: AssetItem[];
    dress: AssetItem[];
    honourPoint: AssetItem = new AssetItem();

    reset(): void {
        this.props = [];
        this.diamond.reset();
        this.coin.reset();
        this.mung.reset();
        this.gift = [];
        this.dress = [];
        this.honourPoint.reset();
    }

    update(data: any): void {
        if (!data) {
            return;
        }

        this.props = []
        for (let i = 0; i < data.props.length; i++) {
            const item = new AssetItem();
            item.update(data.props[i]);
            this.props.push(item);
        }

        this.gift = []
        for (let i = 0; i < data.gift.length; i++) {
            const item = new AssetItem();
            item.update(data.gift[i]);
            this.gift.push(item);
        }

        this.dress = []
        for (let i = 0; i < data.dress.length; i++) {
            const item = new AssetItem();
            item.update(data.dress[i]);
            this.dress.push(item);
        }
        
        this.diamond.update(data.diamond)
        this.coin.update(data.coin)     
        this.mung.update(data.mung)
        this.honourPoint.update(data.honourPoint)
    }
}

export class DynamicPoolInc {
    mode = PBRegularCommon.DynamicPoolIncModeUnknow;
    incValue: number = 0;
    trigThr: number = 0;

    reset(): void {
        this.mode = PBRegularCommon.DynamicPoolIncModeUnknow;
        this.incValue = 0;
        this.trigThr = 0;
    }

    update(data: any): void {
        if (!data) {
            return;
        }
        this.mode = data.mode;
        this.incValue = data.incValue;
        this.trigThr = data.trigThr;
    }
}

class RankPrizeRateAndFix {
    startRank: number = 1;
    endRank: number = 1;
    rate: number = 0;
    fixPrize: AssetItem[] = []
    rangeAwardImage: string = "";
    rangeAwardName: string = "";

    reset(): void {
        this.startRank = 1;
        this.endRank = 1;
        this.rate = 0;
        this.fixPrize = [];
        this.rangeAwardImage = "";
        this.rangeAwardName = "";
    }

    update(data: any): void {
        if (!data) {
            return;
        }
        this.startRank = data.startRank;
        this.endRank = data.endRank;
        this.rate = data.rate;
        this.rangeAwardImage = data.rangeAwardImage;
        this.rangeAwardName = data.rangeAwardName;

        this.fixPrize = [];
        for (let i = 0; i < data.fixPrize.length; i++) {
            const item = new AssetItem();
            item.update(data.fixPrize[i]);
            this.fixPrize.push(item);
        }
    }
}

class DynamicRankPrizeRateAndFix {
    dynamicId: number = 0;
    rankPrizeRateAndFix: RankPrizeRateAndFix[] = [];

    reset(): void {
        this.dynamicId = 0;
        this.rankPrizeRateAndFix = [];
    }

    update(data: any): void {
        if (!data) {
            return;
        }

        this.dynamicId = data.dynamicId;
        this.rankPrizeRateAndFix = [];
        for (let i = 0; i < data.rankPrizeRateAndFix.length; i++) {
            const item = new RankPrizeRateAndFix();
            item.update(data.rankPrizeRateAndFix[i]);
            this.rankPrizeRateAndFix.push(item);
        }
    }
}

class FixPrizeAndDynamicPoolConfig {
    isDynamicStage: boolean = false;
    revivalIncPoolSwitch: number = PBCommon.SwitchStateUnknown;
    enterIncPoolSwitch: number = PBCommon.SwitchStateUnknown;
    fixPrizeSwitch: number = PBCommon.SwitchStateUnknown;
    basePool: AssetItem[] = [];
    ranks: RankPrizeRateAndFix[] = [];
    dynamicRankPrizeRateAndFix: DynamicRankPrizeRateAndFix[] = [];
    enterIncPool: DynamicPoolInc = new DynamicPoolInc();
    revivalIncPool: DynamicPoolInc = new DynamicPoolInc();

    reset(): void {
        this.isDynamicStage = false;
        this.revivalIncPoolSwitch = PBCommon.SwitchStateUnknown;
        this.enterIncPoolSwitch = PBCommon.SwitchStateUnknown;
        this.fixPrizeSwitch = PBCommon.SwitchStateUnknown;
        this.basePool = [];

        this.ranks = [];
        this.dynamicRankPrizeRateAndFix  = []

        this.enterIncPool.reset();
        this.revivalIncPool.reset();
    }

    update(data: any): void {
        if (!data) {
            return;
        }

        this.isDynamicStage = data.isDynamicStage;
        this.revivalIncPoolSwitch = data.revivalIncPoolSwitch;
        this.enterIncPoolSwitch = data.enterIncPoolSwitch;
        this.fixPrizeSwitch = data.fixPrizeSwitch;

        this.basePool = [];
        for (let i = 0; i < data.basePool.length; i++) {
            const v = data.basePool[i];
            let item = new AssetItem();
            item.update(v);
            this.basePool.push(item);
        }

        this.ranks = [];
        for (let i = 0; i < data.ranks.length; i++) {
            const v = data.ranks[i];
            let item = new RankPrizeRateAndFix();
            item.update(v);
            this.ranks.push(item);
        }

        this.dynamicRankPrizeRateAndFix = [];
        for (let i = 0; i < data.dynamicRankPrizeRateAndFix.length; i++) {
            const v = data.dynamicRankPrizeRateAndFix[i];
            let item = new DynamicRankPrizeRateAndFix();
            item.update(v);
            this.dynamicRankPrizeRateAndFix.push(item);
        }

        this.enterIncPool.update(data.enterIncPool);
        this.revivalIncPool.update(data.revivalIncPool);
    }
}

class FixedTeamPrizePoolConfig {
    asset = new Asset()
    reset() {
        this.asset.reset()
    }

    update(data) {
        if (!data) return;

        this.asset.update(data.asset)
    }
}

class RankPrizeRate {
    startRank = 1;
    endRank = 1;
    rate = 0;

    reset() {
        this.startRank = 1;
        this.endRank = 1;
        this.rate = 0;
    }

    update(data) {
        if (!data) return;

        this.startRank = data.startRank;
        this.endRank = data.endRank;
        this.rate = data.rate;
    }
}

class DynamicPrizePoolConfig {
    isInc = false;
    mode = PBRegularCommon.DynamicPoolIncModeUnknow;
    incValue = 0;
    basePool = new Asset();
    ranks : RankPrizeRate[] = []
    basePoolItems : AssetItem[] = []

    reset() {
        this.isInc = false;
        this.mode = PBRegularCommon.DynamicPoolIncModeUnknow;
        this.incValue = 0;
        this.ranks = []
        this.basePoolItems = []

        this.basePool.reset();
    }

    update(data) {
        if (!data) return;

        this.isInc = data.isInc;
        this.mode = data.mode;
        this.incValue = data.incValue;

        this.basePool.update(data.basePool)

        this.ranks = [];
        for (let i in data.ranks || []) {
            let item = new RankPrizeRate();
            item.update(data.ranks[i]);
            this.ranks.push(item);
        }

        this.basePoolItems = [];
        for (let i in data.basePoolItems || []) {
            let item = new AssetItem();
            item.update(data.basePoolItems[i]);
            this.basePoolItems.push(item);
        }
    }
}

class VIPLevelPrize {
    asset = new Asset();
    rate: number = 0;
    startLevel: number = 1;
    endLevel: number = 1;

    reset(): void {
        this.asset.reset();
        this.rate = 0;
        this.startLevel = 1;
        this.endLevel = 1;
    }

    update(data: any): void {
        if (!data) {
            return;
        }
        this.asset.update(data.asset)
        this.rate = data.rate;
        this.startLevel = data.startLevel;
        this.endLevel = data.endLevel;
    }
}

class VIPPrize {
    vipLevelPrize: Array<VIPLevelPrize> = [];

    reset(): void {
        this.vipLevelPrize = [];
    }

    update(data: any): void {
        if (!data) {
            return;
        }
        this.vipLevelPrize = [];
        for (let i = 0; i < (data.vipLevelPrize || []).length; i++) {
            const v = data.vipLevelPrize[i];
            const item = new VIPLevelPrize();
            item.update(v);
            this.vipLevelPrize.push(item);
        }
    }
}

class RankPrize {
    startRank: number = 0;
    endRank: number = 0;
    asset: Asset = new Asset();
    rangeAwardImage: string = "";
    rangeAwardName: string = "";
    vip: VIPPrize = new VIPPrize();

    reset(): void {
        this.startRank = 0;
        this.endRank = 0;
        this.asset.reset();
        this.rangeAwardImage = "";
        this.rangeAwardName = "";
        this.vip.reset();
    }

    update(data: any): void {
        if (!data) {
            return;
        }
        this.startRank = data.startRank;
        this.endRank = data.endRank;
        this.rangeAwardImage = data.rangeAwardImage;
        this.rangeAwardName = data.rangeAwardName;

        this.asset.update(data.asset);
        this.vip.update(data.vip);
    }
}

class FixedPrizePoolConfig {
    type: number = PBRegularCommon.PrizeTypeUnknown;
    isEmceeAward: boolean = false;
    ranks: RankPrize[] = [];

    reset(): void {
        this.type = PBRegularCommon.PrizeTypeUnknown;
        this.isEmceeAward = false;
        this.ranks = []
    }

    update(data: any): void {
        if (!data) {
            return;
        }

        this.type = data.type;
        this.isEmceeAward = data.isEmceeAward;

        this.ranks = [];
        for (let i = 0; i < (data.ranks?.length ?? 0); i++) {
            const item = new RankPrize();
            item.update(data.ranks[i]);
            this.ranks.push(item);
        }
    }
}

export class PrizePoolConfig {
    type: number = PBRegularCommon.PrizeTypeUnknown;
    isEmceeAward: boolean = false;
    fixedPool = new FixedPrizePoolConfig();
    dynamicPool = new DynamicPrizePoolConfig();
    fixedTeamPool = new FixedTeamPrizePoolConfig();
    fixAndDynamicPool = new FixPrizeAndDynamicPoolConfig();

    reset(): void {
        this.type = PBRegularCommon.PrizeTypeUnknown;
        this.isEmceeAward = false;

        this.fixedPool.reset();
        this.dynamicPool.reset();
        this.fixedTeamPool.reset();
        this.fixAndDynamicPool.reset();
    }

    update(data: any): void {
        if (!data) {
            return;
        }

        this.type = data.type;
        this.isEmceeAward = data.isEmceeAward;

        this.fixedPool.update(data.fixedPool);
        this.dynamicPool.update(data.dynamicPool);
        this.fixedTeamPool.update(data.fixedTeamPool);
        this.fixAndDynamicPool.update(data.fixAndDynamicPool);
    }
}
  

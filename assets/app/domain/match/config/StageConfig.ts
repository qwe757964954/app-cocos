import { PBRegularCommon } from "../code/code";

//-----------------------GroupConfig----------------------
class GroupConfig {
    isEnabled: boolean = false;
    userNum: number = 0;

    reset(): void {
        this.isEnabled = false;
        this.userNum = 0;
    }

    update(data: any): void {
        if (!data) {
            return;
        }
        this.isEnabled = data.isEnabled;
        this.userNum = data.userNum;
    }
}

//-----------------------TableConfig----------------------
class TableConfig {
    coordinateMode = PBRegularCommon.CoordinateModeUnknown;
    declarerMode = PBRegularCommon.DeclarerModeUnknown;
    swapSeat: boolean = false;

    reset(): void {
        this.coordinateMode = PBRegularCommon.CoordinateModeUnknown;
        this.declarerMode = PBRegularCommon.DeclarerModeUnknown;
        this.swapSeat = false;
    }

    update(data: any): void {
        if (!data) {
            return;
        }
        this.coordinateMode = data.coordinateMode;
        this.declarerMode = data.declarerMode;
        this.swapSeat = data.swapSeat;
    }
}

//-----------------------StageEndConfig----------------------
class StageEndConfig {
    type: number = PBRegularCommon.StageEndTypeUnknown;
    userNum: number = 0;
    duration: number = 0;
    gameNum: number = 0;

    reset(): void {
        this.type = PBRegularCommon.StageEndTypeUnknown;
        this.userNum = 0;
        this.duration = 0;
        this.gameNum = 0;
    }

    update(data: any): void {
        if (!data) {
            return;
        }
        this.type = data.type;
        this.userNum = data.userNum;
        this.duration = data.duration;
        this.gameNum = data.gameNum;
    }
}

//-----------------------FixedSettlementConfig----------------------
class FixedSettlementConfig {
    winScore: number = 0;
    drawScore: number = 0;
    lossScore: number = 0;

    reset(): void {
        this.winScore = 0;
        this.drawScore = 0;
        this.lossScore = 0;
    }

    update(data: any): void {
        if (!data) {
            return;
        }
        this.winScore = data.winScore;
        this.drawScore = data.drawScore;
        this.drawScore = data.drawScore; // typo?
    }
}

//-----------------------BaseScoreConfig----------------------
class BaseScoreConfig {
    incType: number = PBRegularCommon.BaseScoreIncTypeUnknown;
    initValue: number = 0;
    incValue: number = 0;
    duration: number = 0;
    addValue: number = 0;

    reset(): void {
        this.incType = PBRegularCommon.BaseScoreIncTypeUnknown;
        this.initValue = 0;
        this.incValue = 0;
        this.duration = 0;
        this.addValue = 0;
    }

    update(data: any): void {
        if (!data) {
            return;
        }
        this.incType = data.incType;
        this.initValue = data.initValue;
        this.incValue = data.incValue;
        this.duration = data.duration;
        this.addValue = data.addValue;
    }
}

//-----------------------SettlementConfig----------------------
class SettlementConfig {
    type: number = PBRegularCommon.SettlementTypeUnknown;
    baseScore: BaseScoreConfig = new BaseScoreConfig();
    fixed: FixedSettlementConfig = new FixedSettlementConfig();

    reset(): void {
        this.type = PBRegularCommon.SettlementTypeUnknown;
        this.baseScore.reset();
        this.fixed.reset();
    }

    update(data: any): void {
        if (!data) {
            return;
        }
        this.type = data.type;
        this.baseScore.update(data.baseScore);
        this.fixed.update(data.fixed);
    }
}

class RevivalConsume {
    type = PBRegularCommon.RevivalTypeUnknown
    costAsset = null
    revivalNum = 0
    costAssetV2 = {}

    reset() {
        this.type = PBRegularCommon.RevivalTypeUnknown
        this.costAsset = null
        this.revivalNum = 0
        this.costAssetV2 = {}
    }

    update(data) {
        if (!data) {
            return
        }
        this.type = data.type
        this.costAsset = data.costAsset
        this.revivalNum = data.revivalNum
        this.costAssetV2 = data.costAssetV2
    }
}

class RevivalConfig {
    isEnabled = false
    endUserNum = 0
    cntPerUser = 0
    baseScoreFactor = 0
    thinkDuration = 30
    consume : RevivalConsume[] = []

    reset() {
        this.isEnabled = false
        this.endUserNum = 0
        this.cntPerUser = 0
        this.baseScoreFactor = 0
        this.thinkDuration = 30
        this.consume = []
    }

    update(data) {
        if (!data) {
            return
        }

        this.isEnabled = data.isEnabled
        this.endUserNum = data.endUserNum
        this.cntPerUser = data.cntPerUser
        this.baseScoreFactor = data.baseScoreFactor
        this.thinkDuration = data.thinkDuration

        this.consume = []
        for (const v of data.consume || []) {
            const item = new RevivalConsume()
            item.update(v)
            this.consume.push(item)
        }
    }
}


class PromotionConfig {
    mode = PBRegularCommon.UserScoreModeUnknown
    value = 0
    maxHoldScore = 0
    promotionNum = 0
    promotionType = PBRegularCommon.PromotionTypeUnknown

    reset() {
        this.mode = PBRegularCommon.UserScoreModeUnknown
        this.value = 0
        this.maxHoldScore = 0
        this.promotionNum = 0
        this.promotionType = PBRegularCommon.PromotionTypeUnknown
    }

    update(data) {
        if (!data) {
            return
        }

        this.mode = data.mode
        this.value = data.value
        this.maxHoldScore = data.maxHoldScore
        this.promotionNum = data.promotionNum
        this.promotionType = data.promotionType
    }
}

class ScoreTimeRangeItem {
    public begin: number = 0;
    public end: number = 0;
    public score: number = 0;

    public reset(): void {
        this.begin = 0;
        this.end = 0;
        this.score = 0;
    }

    public update(data: any): void {
        if (!data) return;

        this.begin = data.begin;
        this.end = data.end;
        this.score = data.score;
    }
}

class OutScoreConfig {
    public incType: number = PBRegularCommon.OutScoreIncTypeUnknown;
    public initValue: number = 0;
    public incValue: number = 0;
    public duration: number = 0;
    public multiple: number = 0;
    public items: ScoreTimeRangeItem[] = [];

    public reset(): void {
        this.incType = PBRegularCommon.OutScoreIncTypeUnknown;
        this.initValue = 0;
        this.incValue = 0;
        this.duration = 0;
        this.multiple = 0;
        this.items = [];
    }

    public update(data: any): void {
        if (!data) return;

        this.incType = data.incType;
        this.initValue = data.initValue;
        this.incValue = data.incValue;
        this.duration = data.duration;
        this.multiple = data.multiple;

        this.items = [];
        if (data.items) {
            for (let i = 0; i < data.items.length; i++) {
                const item = new ScoreTimeRangeItem();
                item.update(data.items[i]);
                this.items.push(item);
            }
        }
    }
}

class StageConfig {
    public stageType: number = PBRegularCommon.StageTypeUnkown;
    public roundSeq: number = 1;
    public outScore: OutScoreConfig = new OutScoreConfig();
    public promotion: PromotionConfig = new PromotionConfig();
    public revival: RevivalConfig = new RevivalConfig();
    public settlement: SettlementConfig = new SettlementConfig();
    public end: StageEndConfig = new StageEndConfig();
    public table: TableConfig = new TableConfig();
    public groupConfig: GroupConfig = new GroupConfig();

    public prize: any = null

    public reset(): void {
        this.stageType = PBRegularCommon.StageTypeUnkown;
        this.roundSeq = 1;

        this.outScore.reset();
        this.promotion.reset();
        this.revival.reset();
        this.settlement.reset();
        this.end.reset();
        this.table.reset();
        this.groupConfig.reset();
        this.prize = null
    }

    public update(data: any): void {
        if (!data) return;

        this.stageType = data.stageType;
        this.prize = this.prize

        this.outScore.update(data.outScore);
        this.promotion.update(data.promotion);
        this.revival.update(data.revival);
        this.settlement.update(data.settlement);
        this.end.update(data.end);
        this.table.update(data.table);
        this.groupConfig.update(data.groupConfig);
    }
}

export default StageConfig;

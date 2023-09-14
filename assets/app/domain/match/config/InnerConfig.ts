import { PBRegularCommon } from "../code/code";
import StageConfig from "./StageConfig";
import { PrizePoolConfig } from "./PrizeConfig";

// DynamicSpecConfig
class DynamicSpecConfig {
    id: number | null = null;
    minNum: number = 0;
    maxNum: number = 0;
    stages: StageConfig[] = [];
    _countStrike: number = 1;
    _countFinality: number = 1;

    reset(): void {
        this.id = null;
        this.minNum = 0;
        this.maxNum = 0;
        this.stages = []
        this.countStrike = 1;
        this.countFinality = 1;
    }

    update(data: any): void {
        if (!data) {
            return;
        }

        this.id = data.id;
        this.minNum = data.minNum;
        this.maxNum = data.maxNum;

        this.stages = [];
        for (let stageData of data.stages || []) {
            let item = new StageConfig();
            item.update(stageData);
            this.stages.push(item);
        }
    }

    set countStrike(num : number) {
        this._countStrike = num
    }

    set countFinality(num : number) {
        this._countFinality = num
    }

    get countStrike() : number {
        return this._countStrike
    }

    get countFinality() : number  {
        return this._countFinality
    }
}

class PunishmentConfig {
    isEnabled: boolean = false;
    type: number = PBRegularCommon.PunishmentTypeUnknown;
    count: number = 0;

    constructor() {
        this.reset();
    }

    reset(): void {
        this.isEnabled = false;
        this.type = PBRegularCommon.PunishmentTypeUnknown;
        this.count = 0;
    }

    update(data: any): void {
        if (!data) {
            return;
        }

        this.isEnabled = data.isEnabled;
        this.type = data.type;
        this.count = data.count;
    }
}

export class InnerConfig {
    public userInitScore: number = 0;
    public minUserNum: number = 0;
    public modifyVersion: number = 0;
    public isWeekLyFlag: boolean = false;
    public isOpenDynamicStage: boolean = false;
    public maxUserNum: number = 0;

    public stages :StageConfig[] = []
    public dynamicSpecConfigs : DynamicSpecConfig[] = []

    public punishment = new PunishmentConfig()
    public prize = new PrizePoolConfig()

    public countStrike: number = 1;
    public countFinality: number = 1;

    reset() {
        this.userInitScore = 0;
        this.minUserNum = undefined;
        this.modifyVersion = undefined;
        this.isWeekLyFlag = false;
        this.isOpenDynamicStage = false;
        this.maxUserNum = undefined;
        this.stages = []
        this.dynamicSpecConfigs = [];

        this.prize.reset()
        this.punishment.reset()

        this.countStrike = 1;
        this.countFinality = 1;
    }

    private convertStageData(stages?: StageConfig[]): [number, number] {
        let countStrike = 0;
        let countFinality = 0;
        for (let i = 0; i < (stages?.length ?? 0); i++) {
            const stage = stages![i];
            if (stage.stageType === PBRegularCommon.StageTypeFinality) {
                countFinality++;
                stage.roundSeq = countFinality;
            } else {
                countStrike++;
                stage.roundSeq = countStrike;
            }
        }
        return [countStrike, countFinality];
    }

    update(data: any): void {
        if (!data) {
            return;
        }

        this.userInitScore = data.userInitScore;
        this.minUserNum = data.minUserNum;
        this.modifyVersion = data.modifyVersion;
        this.isWeekLyFlag = data.isWeekLyFlag;
        this.isOpenDynamicStage = data.isOpenDynamicStage;
        this.maxUserNum = data.maxUserNum;

        this.prize.update(data.prize)
        this.punishment.update(data.punishment)

        this.stages = [];
        for (const v of data.stages ?? []) {
            const item = new StageConfig();
            item.update(v);
            this.stages.push(item);
        }

        this.dynamicSpecConfigs = [];
        for (const v of data.dynamicSpecConfigs ?? []) {
            const item = new DynamicSpecConfig();
            item.update(v);
            this.dynamicSpecConfigs.push(item);
        }

        const [countStrike, countFinality] = this.convertStageData(this.stages);
        this.countStrike = countStrike;
        this.countFinality = countFinality;

        if (this.isOpenDynamicStage) {
            for (const v of this.dynamicSpecConfigs) {
                const stages = v.stages ?? [];
                const [countStrike, countFinality] = this.convertStageData(stages);
                v.countStrike = countStrike;
                v.countFinality = countFinality;
            }
        }
    }

    getCountStrike(dynamicID?: number): number {
        if (this.isOpenDynamicStage) {
            dynamicID = dynamicID ?? 1;
            const dynamicSpecConfig = this.dynamicSpecConfigs[dynamicID - 1];
            return dynamicSpecConfig.countStrike ?? 1
        } else {
            return this.countStrike ?? 1;
        }
    }

    getCountFinality(dynamicID?: number): number {
        if (this.isOpenDynamicStage) {
            dynamicID = dynamicID ?? 1;
            const dynamicSpecConfig = this.dynamicSpecConfigs[dynamicID - 1];
            return dynamicSpecConfig.countFinality ?? 1
        } else {
            return this.countFinality ?? 1;
        }
    }
}

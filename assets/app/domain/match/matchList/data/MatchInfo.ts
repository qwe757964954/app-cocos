import { App } from 'app/App';
import {MatchConfig} from '../../config/MatchConfig';
import { PBRegularCommon } from '../../code/code';

export class MatchInfo {
    private _schedulerID: number = 0;
    private _refactorVer: number = 0;
    private _srvID: number = 0;
    private _roomNo: number = 0;
    private _preMatchKey: string = '';
    private _matchKey: string = '';
    private _roomID: number = 0;
    private _startAt: number = 0;
    private _readyAt: number = 0;
    private _status: number = 0;
    private _matchEntryNum: number = 0;
    private _dynamicPool: any[] = [];
    private _lookerNum: number = 0;
    private _cfgUpdateAt: number = 0;

    update(data: any = {}): void {
        this._schedulerID = data.schedulerID;
        this._refactorVer = data.refactorVer;
        this._srvID = data.srvID;
        this._roomNo = data.roomNo;
        this._preMatchKey = data.preMatchKey;
        this._matchKey = data.matchKey;
        this._roomID = data.roomID;
        this._startAt = data.startAt;
        this._readyAt = data.readyAt;
        this._status = data.status;
        this._matchEntryNum = data.matchEntryNum;
        this._dynamicPool = data.dynamicPool;
        this._lookerNum = data.lookerNum;
        this._cfgUpdateAt = data.cfgUpdateAt;
    }

    getCfgUpdateAt(): number {
        return this._cfgUpdateAt;
    }

    getDynamicPool(): any[] {
        return this._dynamicPool || [];
    }

    getSrvID(): number {
        return this._srvID;
    }

    getPreMatchKey(): string {
        return this._preMatchKey;
    }

    getMatchKey(): string {
        return this._matchKey;
    }

    getSchedulerID(): number {
        return this._schedulerID;
    }

    getRefactorVer(): number {
        return this._refactorVer;
    }

    getRoomNo(): number {
        return this._roomNo;
    }

    getRoomID(): number {
        return this._roomID;
    }

    getStatus(): number {
        return this._status;
    }

    getSignNum(): number {
        return this._matchEntryNum || 0;
    }

    // 是否报名
    async getSigned(): Promise<boolean> {
        return await App.matchMgr.getIsSign(this._preMatchKey)
    }

    getLookerNum(): number {
        return this._lookerNum || 0;
    }

    getMatchStartAt(): number {
        return this._startAt || 0;
    }

    getMatchReadyAt(): number {
        return this._readyAt || 0;
    }

    getChampionReward(config: MatchConfig): { icon: string, amount: number, name: string } {
        const result = {
            icon: "",
            amount: 0,
            name: "",
        };
        if (config) {
            const totalPool = this._dynamicPool || [];
            const rankPrize = config.getRankPrize(totalPool, 1, true);
            const ranks = rankPrize.ranks || [];
            const rankInfo = ranks[0];
            if (rankInfo) {
                const fixedAssets = rankInfo.fixedAssets || [];
                const dynamicAssets = rankInfo.dynamicAssets || [];
                const assets = [...fixedAssets, ...dynamicAssets];
                const rangeAwardImage = rankInfo.rangeAwardImage;
                const rangeAwardName = rankInfo.rangeAwardName;
                if (rangeAwardImage && rangeAwardImage !== "" && rangeAwardName && rangeAwardName !== "") {
                    result.icon = rangeAwardImage;
                    result.amount = 1;
                    result.name = rangeAwardName;
                } else {
                    const asset = assets[0];
                    if (asset) {
                        result.icon = asset.icon;
                        result.amount = asset.amount;
                        result.name = asset.name;
                    }
                }
            }
        }
        return result;
    }

    async getMatchConfig() {
        const srvID = this.getSrvID()
        const schedulerID = this.getSchedulerID();
        const status = this.getStatus();
        if (status === PBRegularCommon.MatchStatusRunning || status === PBRegularCommon.MatchStatusOver) {
            const matchKey = this.getMatchKey();
            return await App.matchMgr.getConfig(matchKey, true, srvID);
        } else {
            let cfgUpdateAt = this.getCfgUpdateAt()
            return await App.matchMgr.getConfig(schedulerID, false, null, cfgUpdateAt);
        }
    }
}

import { IOpInfo, IOpResult, OpInfo } from "idl/tss/pdk/extendtable.v3"
import { GamePlayer } from "./GamePlayer"

export class GameRound {
    // 新的一轮
    private newRound: boolean;
    // 操作信息
    private opInfos: IOpInfo[] = [];
    // 操作结果
    private opResults: IOpResult[] = [];
    // 操作记录
    private preOpResults: IOpResult[] = [];

    setUserOpInfo(player: GamePlayer, opInfo: IOpInfo) {
        this.opInfos[player.localSeat] = { ...opInfo };
        this.opResults[player.localSeat] = undefined;
        this.checkNewRound(opInfo);
    }

    setUserPreOpResult(opResult: IOpResult) {
        this.preOpResults.push(opResult);
    }

    checkUserPreOpResult(player: GamePlayer, opResult: IOpResult) {

    }

    setUserOpResult(player: GamePlayer, opResult: IOpResult) {
        this.opInfos[player.localSeat] = undefined;
        this.opResults[player.localSeat] = { ...opResult };
        this.setUserPreOpResult(opResult);
    }

    checkUserOpResult(player: GamePlayer, opResult: IOpResult) {

    }

    getUserOpInfo(player: GamePlayer): IOpInfo {
        return this.opInfos[player.localSeat]
    }

    getUserOpResult(player: GamePlayer): IOpResult {
        return this.opResults[player.localSeat]
    }

    getLastPreOpResult(): IOpResult {
        for (let i = this.preOpResults.length - 1; i >= 0; i--) {
            const info = this.preOpResults[i];
            if (info?.call_score_result?.callScore > 0 || info?.call_dealer_result?.opcode > 0 || info?.play_card_result?.cards?.length > 0) {
                return info;
            }
        }
        return null;
    }

    checkNewRound(opInfo: IOpInfo) {
        let info = this.getLastPreOpResult();
        this.newRound = !info || info.uid == opInfo.uid;
        this.newRound && (this.preOpResults = []);
    }

    isNewRound(): boolean {
        return this.newRound;
    }
}
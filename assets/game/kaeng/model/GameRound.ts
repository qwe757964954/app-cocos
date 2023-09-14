import { IOpResult, IOptionList } from "../idl/tss/thailand/kaeng";

export class GameRound {

    // 本回合操作者uid
    private optUid: number = 0;
    // 操作信息
    private opInfos: Map<number, IOptionList> = new Map();
    // 操作结果
    private opResults: Map<number, IOpResult> = new Map();
    // 操作记录
    private opResultList: IOpResult[] = [];

    setUserOpInfo(uid: number, opInfo: IOptionList) {
        this.opResults.delete(uid);
        this.opInfos.set(uid, { ...opInfo });
    }

    getUserOpInfo(uid: number): IOptionList {
        return this.opInfos.get(uid);
    }

    setUserOpResult(uid: number, opResult: IOpResult) {
        this.opInfos.delete(uid);
        this.opResults.set(uid, { ...opResult });
        this.opResultList.push(opResult);
    }

    getUserOpResult(uid: number): IOpResult {
        return this.opResults.get(uid);
    }

    getOpResultList(): IOpResult[] {
        return this.opResultList
    }

    getLastOpResult(): IOpResult {
        return this.opResultList[this.opResultList?.length - 1];
    }

    setOptUid(uid: number) {
        this.optUid = uid;
    }

    getOptUid(): number {
        return this.optUid;
    }

    reset() {
        this.opResultList = [];
        this.optUid = 0;
        this.opInfos.clear();
        this.opResults.clear();
    }

}
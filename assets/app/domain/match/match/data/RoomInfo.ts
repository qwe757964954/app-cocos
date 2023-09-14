import { BaseInfo } from "./BaseInfo";
import PreMatchInfo from "./PreBaseInfo";
import {MatchConfig} from "../../config/MatchConfig";
import { TableInfo } from "./TableInfo";
import { UserInfo } from "./UserInfo";
import { PBCommon, PBRegularCommon } from "../../code/code";
import { App } from "app/App"
import { MatchHandler } from "../handler/MatchHandler";
import { AssetItem } from "../../config/PrizeConfig";

export function SafeEmit(handler : MatchHandler, type, param1?, param2?, param3?, param4?, param5?){
    if (handler) {
        handler.emit(type, param1, param2, param3, param4, param5)
    }
}


export type ShowEndInfo = {
    stageEndType : number,  //类型
    userNum : number,       //淘汰截止人数
    duration : number,      //淘汰剩余时间
    gameNum : number,       //淘汰局数
}

export type ShowStageInfo = {
    stageType : number,                     //阶段类型（打立、定局）
    promotionType : number,                 //阶段类型（总排名、桌排名）
    endInfo : ShowEndInfo,
    roundSeq : number,
    gameNo : number,
    outScore : number,
    totalNum : number,
    promotionNum : number,
    countStrike : number,
    countFinality : number,
    isFinallyRound : boolean,
}

export type ShowUserInfo = {
    uid : number,
    score : number,
    rank : number,
    totalNum : number,
    isOut : boolean,
    rankTable : number,
    gameID : string,
    isQuit : boolean,
}

export class RoomInfo {
    private _config : MatchConfig
    private _preBaseInfo : PreMatchInfo
    private _baseInfo : BaseInfo
    private _userInfo : UserInfo
    private _tableInfo : TableInfo
    private _isAddPreMatchPool = false
    private _isInit = false

    handler : MatchHandler

    constructor(handler : MatchHandler | null){
        this.handler = handler
        this._preBaseInfo = new PreMatchInfo(handler)
        this._baseInfo = new BaseInfo(handler)
        this._userInfo = new UserInfo(handler)
        this._tableInfo = new TableInfo(handler)
    }

    reset() {
        this._preBaseInfo.reset()
        this._baseInfo.reset()
        this._tableInfo.reset()
        this._userInfo.reset()
        
        this._config = null
        this._isInit = false
        this._isAddPreMatchPool = false
    }

    static getAsset(list: AssetItem[], id: number, type: number) {
        for (const v of list) {
            if (v.id === id && v.type === type) {
                return v;
            }
        }
    }

    init(config: MatchConfig, preBaseInfo:  any, preUserInfo: any[], baseInfo?: any, tableInfo?: any[], matchUserInfo?: any[]) {
        this.initConfig(config)
        this.initPreBaseInfo(preBaseInfo)
        this.initUserInfo(preUserInfo)
        this.initBaseInfo(baseInfo)
        this.initTableInfo(tableInfo)
        this.updateMatchUserInfo(matchUserInfo)

        this._isInit = true
    }

    initWithPreMathInfo(preBaseInfo, preUserInfo : any[] = []) {

        console.debug("initWithPreMathInfo", preBaseInfo, preUserInfo)

        this._preBaseInfo.init(preBaseInfo)
        this._userInfo.init(preUserInfo)

        this._isInit = true
    }

    initUserInfo(preUserInfo: any[]){
        if (preUserInfo) {
            this._userInfo.init(preUserInfo)
        }
    }

    calculatePreMatchPool(preBaseInfo: PreMatchInfo) {
        if (!this._isAddPreMatchPool) {
            if (this.config && this.config.isInit) {
                this._isAddPreMatchPool = true
                const prizePoolConfig = this._config.getPrizeConfig()
                if (prizePoolConfig.type === PBRegularCommon.PrizeTypeFixedAndDynamic) {
                    let prizePool = this._config.getBasePool()
                    let clonePool = []
                    for (let index = 0; index < prizePool.length; index++) {
                        const item = prizePool[index];
                        let newItem = new AssetItem()
                        newItem.update(item)
                        clonePool.push(newItem)
                    }
                    const entryNum = preBaseInfo.enterUserNum || 0;
                    const fixAndDynamicPool = prizePoolConfig.fixAndDynamicPool;
                    if (fixAndDynamicPool) {
                        if (fixAndDynamicPool.enterIncPoolSwitch === PBCommon.SwitchStateOn && fixAndDynamicPool.enterIncPool && fixAndDynamicPool.basePool) {
                            const trigThr = fixAndDynamicPool.enterIncPool.trigThr || 1;
                            console.debug("RoomInfo:init 计算奖池", entryNum, trigThr);
                            if (entryNum > trigThr) {
                                const needAddNum = entryNum - trigThr;
                                console.debug("RoomInfo:init 计算奖池", needAddNum);
                                if (needAddNum > 0) {
                                    clonePool = this.addPool(fixAndDynamicPool.enterIncPool, clonePool, fixAndDynamicPool.basePool, needAddNum);
                                }
                            }
                        } else {
                            console.error("RoomInfo:init 奖池配置fixAndDynamicPool参数异常", fixAndDynamicPool);
                        }
                    } else {
                        console.error("RoomInfo:init 奖池配置fixAndDynamicPool值为nil", prizePoolConfig);
                    }
                    return clonePool
                }
            }
        }
    }

    initPreBaseInfo(preBaseInfo: PreMatchInfo | any) {
        if (preBaseInfo) {
            this._preBaseInfo.init(preBaseInfo)
            //计算奖池
            let prizePool = this.calculatePreMatchPool(this._preBaseInfo)
            if(prizePool) {
                this._preBaseInfo.initPrizePool(prizePool)
            }
        }
    }

    initBaseInfo(baseInfo) {
        if (baseInfo) {
            //计算奖池
            if (this._config && this._config.isInit) {
                const prizePoolConfig = this._config.getPrizeConfig()
                if (prizePoolConfig.type === PBRegularCommon.PrizeTypeFixedAndDynamic) {
                    let revivedNum = baseInfo.revivedNum ?? 0
                    let prizePool = this._preBaseInfo.getPrizePool()
                    const fixAndDynamicPool = prizePoolConfig.fixAndDynamicPool;
                    if (fixAndDynamicPool) {
                        if (fixAndDynamicPool.enterIncPoolSwitch === PBCommon.SwitchStateOn && fixAndDynamicPool.revivalIncPool && fixAndDynamicPool.basePool) {
                            const trigThr = fixAndDynamicPool.enterIncPool.trigThr || 1;
                            console.debug("RoomInfo:initBaseInfo 计算赛中奖池", revivedNum, trigThr);
                            if (revivedNum > trigThr) {
                                const needAddNum = revivedNum - trigThr;
                                console.debug("RoomInfo:initBaseInfo 计算赛中奖池", needAddNum);
                                if (needAddNum > 0) {
                                    prizePool = this.addPool(fixAndDynamicPool.enterIncPool, prizePool, fixAndDynamicPool.basePool, needAddNum);
                                }
                            }
                        } else {
                            console.error("RoomInfo:initBaseInfo 奖池配置fixAndDynamicPool参数异常", fixAndDynamicPool);
                        }
                    } else {
                        console.error("RoomInfo:initBaseInfo 奖池配置fixAndDynamicPool值为nil", prizePoolConfig);
                    }
    
                    baseInfo.prizePool = prizePool
                }
            }

            this._baseInfo.init(baseInfo)
        }
    }

    initTableInfo(tableInfo) {
        if (tableInfo) {
            this._tableInfo.init(tableInfo)
        }
    }

    initConfig(config: MatchConfig) {
        if (config) {
            this._config = config
            //计算奖池
            let prizePool = this.calculatePreMatchPool(this._preBaseInfo)
            if(prizePool) {
                this._preBaseInfo.initPrizePool(prizePool)
            }
        }
    }

    updateMatchUserInfo(matchUserInfo) {
        if (matchUserInfo) {
            this._userInfo.updateWithNoEvent(matchUserInfo)
        }
    }

    updateConfig(config: MatchConfig) {
        if (config) {
            this._config = config
            SafeEmit(this.handler,MatchHandler.EventType.MatchConfigUpdate)
        }
    }

    get isInit() {
        return this._isInit
    }

    get config() {
        return this._config
    }

    get baseInfo() {
        return this._baseInfo
    }

    get preBaseInfo() {
        return this._preBaseInfo
    }

    get tableInfo() {
        return this._tableInfo
    }

    get userInfo() {
        return this._userInfo
    }

    getPrizePool() {
        let status = this.preBaseInfo.getStatus()
        if (status == PBRegularCommon.MatchStatusOver || status == PBRegularCommon.MatchStatusRunning) {
            return this.baseInfo.getPrizePool()
        } else {
            return this.preBaseInfo.getPrizePool()
        }
    }

    userJoin(uid: number | number[]): void {
        if (Array.isArray(uid)) {
            const total = uid.length;
            this._preBaseInfo.addJoinUser(total);
            SafeEmit(this.handler,MatchHandler.EventType.UsersJoin, uid)
        } else {
            this._preBaseInfo.addJoinUser(1);
            SafeEmit(this.handler,MatchHandler.EventType.UsersJoin, [uid])
        }
    }

    userLeave(uid: number | number[]): void {
        if (Array.isArray(uid)) {
            const total = uid.length;
            this._preBaseInfo.removeJoinUser(total);
            SafeEmit(this.handler,MatchHandler.EventType.UsersLeave, uid)
        } else {
            this._preBaseInfo.removeJoinUser(1);
            SafeEmit(this.handler,MatchHandler.EventType.UsersJoin, [uid])
        }
    }

    addPool(config: any, curPool: AssetItem[], basePool: AssetItem[], num: number): AssetItem[] {
        let pool = curPool;
        let needAddNum = num;
        console.debug("RoomInfo:addPool Updated pool before", pool);
        const incValue = config.incValue || 0;

        if (config.mode === PBRegularCommon.DynamicPoolIncModeFix) {
            for (let i = 0; i < pool.length; i++) {
                const v = pool[i];
                v.amount += incValue * needAddNum;
            }
            console.debug("RoomInfo:addPool Latest pool with DynamicPoolIncModeFix", pool);
        } else if (config.mode === PBRegularCommon.DynamicPoolIncModeByPercentage) {
            for (let i = 0; i < pool.length; i++) {
                const v = pool[i];
                const asset = RoomInfo.getAsset(basePool, v.id, v.type);
                if (asset) {
                    v.amount += ((incValue / 100) * asset.amount) * needAddNum;
                }
            }
            console.debug("RoomInfo:addPool Latest pool with DynamicPoolIncModeByPercentage", pool);
        } else if (config.mode === PBRegularCommon.DynamicPoolIncModeByPermil) {
            for (let i = 0; i < pool.length; i++) {
                const v = pool[i];
                const asset = RoomInfo.getAsset(basePool, v.id, v.type);
                if (asset) {
                    v.amount += ((incValue / 1000) * asset.amount) * needAddNum;
                }
            }
            console.debug("RoomInfo:addPool Latest pool with DynamicPoolIncModeByPermil", pool);
        } else {
            console.error("RoomInfo:addPool Invalid config.mode value", config);
        }

        return pool;
    }

    reducePool(config: any, curPool: AssetItem[], basePool: AssetItem[], num: number): AssetItem[] {
        const pool = curPool;
        let needReduceNum = num;
        console.debug("RoomInfo:reducePool 更新之前的奖池", pool);
        const incValue = config.incValue || 0;
        if (config.mode === PBRegularCommon.DynamicPoolIncModeFix) {
            for (let i = 0; i < pool.length; i++) {
                pool[i].amount = pool[i].amount - (incValue * needReduceNum);
            }
            console.debug("RoomInfo:reducePool DynamicPoolIncModeFix最新奖池", pool);
        } else if (config.mode === PBRegularCommon.DynamicPoolIncModeByPercentage) {
            for (let i = 0; i < pool.length; i++) {
                const asset = RoomInfo.getAsset(basePool, pool[i].id, pool[i].type);
                if (asset) {
                    pool[i].amount = pool[i].amount - ((incValue / 100 * asset.amount) * needReduceNum);
                }
            }
            console.debug("RoomInfo:reducePool DynamicPoolIncModeByPercentage最新奖池", pool);
        } else if (config.mode === PBRegularCommon.DynamicPoolIncModeByPermil) {
            for (let i = 0; i < pool.length; i++) {
                const asset = RoomInfo.getAsset(basePool, pool[i].id, pool[i].type);
                if (asset) {
                    pool[i].amount = pool[i].amount - ((incValue / 1000 * asset.amount) * needReduceNum);
                }
            }
            console.debug("RoomInfo:reducePool DynamicPoolIncModeByPermil最新奖池", pool);
        } else {
            console.error("RoomInfo:reducePool config.mode 值异常", config);
        }
        return pool;
    }

    signAddPool(num: number): void {
        if (this._config && this._config.isInit) {
            const prizePoolConfig = this._config.getPrizeConfig();
            if (prizePoolConfig.type === PBRegularCommon.PrizeTypeFixedAndDynamic) {
                const fixAndDynamicPool = prizePoolConfig.fixAndDynamicPool;
                if (fixAndDynamicPool) {
                    if (
                        fixAndDynamicPool.enterIncPoolSwitch === PBCommon.SwitchStateOn &&
                        fixAndDynamicPool.enterIncPool &&
                        fixAndDynamicPool.basePool
                    ) {
                        const trigThr = fixAndDynamicPool.enterIncPool.trigThr || 1;
                        const entryNum = this._preBaseInfo.getEntryUserNum();
                        console.debug("RoomInfo:signAddPool 计算奖池 entryNum num trigThr", entryNum, num, trigThr);
                        if (entryNum + num > trigThr) {
                            let needAddNum = num;
                            if (entryNum < trigThr) {
                                needAddNum = num - (trigThr - entryNum);
                            }
                            console.debug("RoomInfo:signAddPool 计算奖池 needAddNum", needAddNum);
                            if (needAddNum > 0) {
                                const pool = this.addPool(fixAndDynamicPool.enterIncPool, this.getPrizePool(), fixAndDynamicPool.basePool, needAddNum);
                                if (pool) {
                                    this._preBaseInfo.updatePrizePool(pool);
                                } else {
                                    console.error("RoomInfo:signAddPool pool is nil", fixAndDynamicPool);
                                }
                            }
                        }
                    } else {
                        console.error("RoomInfo:signAddPool 奖池配置fixAndDynamicPool参数异常", fixAndDynamicPool);
                    }
                } else {
                    console.error("RoomInfo:signAddPool 奖池配置fixAndDynamicPool值为nil", prizePoolConfig);
                }
            }
        }
    }

    unSignReducePool(num: number): void {
        // 计算奖池
        if (this._config && this._config.isInit) {
            const prizePoolConfig = this._config.getPrizeConfig();
            if (prizePoolConfig.type === PBRegularCommon.PrizeTypeFixedAndDynamic) {
                const fixAndDynamicPool = prizePoolConfig.fixAndDynamicPool;
                if (fixAndDynamicPool) {
                    if (fixAndDynamicPool.enterIncPoolSwitch === PBCommon.SwitchStateOn && fixAndDynamicPool.enterIncPool && fixAndDynamicPool.basePool) {
                        const trigThr = fixAndDynamicPool.enterIncPool.trigThr ?? 1;
                        const entryNum = this._preBaseInfo.getEntryUserNum();
                        console.debug("RoomInfo:unSignReducePool 计算奖池", entryNum, num, trigThr);
                        if (entryNum > trigThr) {
                            const needReduceNum = Math.min(num, entryNum - trigThr);
                            console.debug("RoomInfo:unSignReducePool 计算奖池", needReduceNum);
                            const pool = this.reducePool(fixAndDynamicPool.enterIncPool, this.getPrizePool(), fixAndDynamicPool.basePool, needReduceNum);
                            if (pool !== null) {
                                this._preBaseInfo.updatePrizePool(pool);
                            } else {
                                console.error("RoomInfo:unSignReducePool pool is nil", fixAndDynamicPool);
                            }
                        }
                    } else {
                        console.error("RoomInfo:unSignReducePool 奖池配置fixAndDynamicPool参数异常", fixAndDynamicPool);
                    }
                } else {
                    console.error("RoomInfo:unSignReducePool 奖池配置fixAndDynamicPool值为nil", prizePoolConfig);
                }
            }
        }
    }

    userSign(sUser: any): void {
        // 计算奖池
        this.signAddPool(1);

        // 更新用户状态
        const uid = sUser.uid;
        let user = this._userInfo.findUser(uid);
        if (user) {
            if (uid !== App.userMgr.loginUser.uid) {
                console.error("RoomInfo:userSign user已经再报名列表里面了", sUser);
            } else {
                console.error("自己报名了");
            }
            this._userInfo.removeUser(uid);
        }
        user = this._userInfo.addUser(sUser);
        user.updateStatus(PBRegularCommon.UserStatusEntry);
        user.updateEnterAt(sUser.EnterAt);
        user.updateIsRobot(sUser.isRobot);

        this._preBaseInfo.addSignUser(1);

        SafeEmit(this.handler,MatchHandler.EventType.UsersSigned, [uid])
    }

    usersSign(sUser: any[]): void {
        // 计算奖池
        this.signAddPool(sUser.length);

        const uids: number[] = [];
        for (const v of sUser) {
            const uid = v.uid;
            let user = this._userInfo.findUser(uid);
            if (user) {
                if (uid !== App.userMgr.loginUser.uid) {
                    console.error("RoomInfo:usersSign user已经再报名列表里面了", v);
                } else {
                    console.error("自己报名了");
                }
                this._userInfo.removeUser(uid);
            }
            user = this._userInfo.addUser(v);
            user.updateStatus(PBRegularCommon.UserStatusEntry);
            user.updateEnterAt(v.EnterAt);
            user.updateIsRobot(v.isRobot);

            uids.push(uid);
        }

        this._preBaseInfo.addSignUser(sUser.length);
        SafeEmit(this.handler,MatchHandler.EventType.UsersSigned, uids)
    }

    userUnSign(uid: number | number[]): void {
        if (Array.isArray(uid)) {
            // 计算奖池
            this.unSignReducePool(uid.length);

            for (const v of uid) {
                this._userInfo.removeUser(v);
            }

            this._preBaseInfo.removeSignUser(uid.length);
            SafeEmit(this.handler,MatchHandler.EventType.UsersCancelSigned, uid)
        } else {
            // 计算奖池
            this.unSignReducePool(1);

            this._userInfo.removeUser(uid);

            this._preBaseInfo.removeSignUser(1);
            SafeEmit(this.handler,MatchHandler.EventType.UsersCancelSigned, [uid])
        }
    }

    userReady(uid: number | number[]): void {
        if (Array.isArray(uid)) {
            this._userInfo.updateUserStatus(uid, PBRegularCommon.UserStatusReady);

            this._preBaseInfo.addReadyUser(uid.length);
            SafeEmit(this.handler,MatchHandler.EventType.UsersReady, uid)
        } else {
            this._userInfo.updateUserStatus([uid], PBRegularCommon.UserStatusReady);

            this._preBaseInfo.addReadyUser(1);
            SafeEmit(this.handler,MatchHandler.EventType.UsersReady, [uid])
        }
    }

    userUnReady(uid: number | number[]): void {
        if (Array.isArray(uid)) {
            this._userInfo.updateUserStatus(uid, PBRegularCommon.UserStatusEntry);

            this._preBaseInfo.removeReadyUser(uid.length);
            SafeEmit(this.handler,MatchHandler.EventType.UsersCancelReady, uid)
        } else {
            this._userInfo.updateUserStatus([uid], PBRegularCommon.UserStatusEntry);

            this._preBaseInfo.removeReadyUser(1);
            SafeEmit(this.handler,MatchHandler.EventType.UsersCancelReady, [uid])
        }
    }

    revivedAddPool(num: number): void {
        if (this._config && this._config.isInit) {
            const prizePoolConfig = this._config.getPrizeConfig();
            if (prizePoolConfig.type === PBRegularCommon.PrizeTypeFixedAndDynamic) {
                const fixAndDynamicPool = prizePoolConfig.fixAndDynamicPool;
                if (fixAndDynamicPool) {
                    if (fixAndDynamicPool.revivalIncPoolSwitch === PBCommon.SwitchStateOn && fixAndDynamicPool.revivalIncPool && fixAndDynamicPool.basePool) {
                        const trigThr = fixAndDynamicPool.revivalIncPool.trigThr || 1;
                        const revivalNum = this._baseInfo.getRevivalNum();
                        console.debug("RoomInfo:revivedAddPool 计算奖池", revivalNum, num, trigThr);
                        if (revivalNum + num > trigThr) {
                            let needAddNum = num;
                            if (revivalNum < trigThr) {
                                needAddNum = num - (trigThr - revivalNum);
                            }
                            console.debug("RoomInfo:revivedAddPool 计算奖池", needAddNum);
                            if (needAddNum > 0) {
                                const pool = this.addPool(fixAndDynamicPool.revivalIncPool, this.getPrizePool(), fixAndDynamicPool.basePool, needAddNum);
                                if (pool) {
                                    this._baseInfo.updatePrizePool(pool);
                                } else {
                                    console.error("RoomInfo:revivedAddPool pool is nil", fixAndDynamicPool);
                                }
                            }
                        }
                    } else {
                        console.error("RoomInfo:revivedAddPool 奖池配置fixAndDynamicPool参数异常", fixAndDynamicPool);
                    }
                } else {
                    console.error("RoomInfo:revivedAddPool 奖池配置fixAndDynamicPool值为nil", prizePoolConfig);
                }
            }
        }
    }

    userRevived(uid: number, score?: number): void {
        //计算奖池
        this.revivedAddPool(1);

        //更新复活人数
        const num = this._baseInfo.getRevivalNum();
        this._baseInfo.updateRevivalNum(num + 1);

        //更新复活玩家分数
        const user = this._userInfo.findUser(uid);
        if (user) {
            user.updateScore(score || 0);
            user.updateRevivedCnt(user.getRevivedCnt() + 1);
            user.updateStatus(PBRegularCommon.UserStatusBye);

            //标记一下排序过期了(分数变更了)
            this._userInfo.setDirty();

            SafeEmit(this.handler,MatchHandler.EventType.UserRevived, uid)
        } else {
            console.error("RoomInfo:userRevived 没有找到玩家", uid, this);
        }
    }

    userQuit(uid: number): void {
        this._userInfo.userQuit(uid);

        SafeEmit(this.handler,MatchHandler.EventType.UserQuit, uid)
    }

    getIsFinallyRound(stageIndex?: number) {
        if (!stageIndex) {
            stageIndex = this.baseInfo.getStageInfo().getStageIndex()
        }
        let stageConfigs = this.config.getMatchStages(this.baseInfo.getDynamicStageId())
        return (stageConfigs.length - 1) === stageIndex
    }

    //获取当前剩余人数
    getRemainingNum(){
        return this.baseInfo.getPlayerNum()
    }

    /** 
    --@stageIndex 阶段
    --@singlePromo 是否返回单组晋级人数 如果是分桌晋级，返回的是单桌晋级人数
    */
    getPromotionNum(stageIndex?: number, singlePromo?: boolean): number {
        if (this._config && this._config.isInit) {
            const stages = this._config.getMatchStages(this.baseInfo.getDynamicStageId());
            if (!stageIndex) {
                stageIndex = this.baseInfo.getStageInfo().getStageIndex();
            }
            if (stages && stages[stageIndex]) {
                if (this.getHasGroup(stageIndex)) {
                    const promotion = stages[stageIndex].promotion;
                    if (singlePromo) {
                        return promotion.promotionNum || 0;
                    } else {
                        return (promotion.promotionNum || 0) * this._baseInfo.getGroupInfo().getGroupNum();
                    }
                } else {
                    const promotion = stages[stageIndex].promotion;
                    return promotion.promotionNum || 0;
                }
            }
        }
        return 0;
    }

    //-获取阶段是否分组了
    getHasGroup(stageIndex?: number): boolean {
        if (!stageIndex) {
            stageIndex = this.baseInfo.getStageInfo().getStageIndex();
        }

        let openGroup: boolean = false;
        if (this._baseInfo.getGroupInfo().getIsGrouping() && stageIndex === 1) {
            openGroup = true;
        }
        console.debug("openGroup=================", openGroup);
        return openGroup;
    }

    getDoingGroupNum(): number {
        return this.baseInfo.getGroupInfo().getDoingGroups().length;
    }

    getGroupUserNumByID(groupID: number): number {
        return this.baseInfo.getGroupUserNumByID(groupID);
    }

    getStageEnterNum(stageIndex?: number): number {
        if (!stageIndex) {
            stageIndex = this.baseInfo.getStageInfo().getStageIndex();
        }

        if (stageIndex && stageIndex > 1) {
            return this.getPromotionNum(stageIndex - 1);
        }
        console.debug("RoomInfo:getStageEnterNum", this._baseInfo);
        return this.baseInfo.getEntryUserNum();
    }

    getPlayingNum(): number {
        const player = this._userInfo.getPromoUsers() ?? [];
        return player.length;
    }

    getPlayingNumByGroupID(groupID: number): number {
        const player = this._userInfo.getPromoUsers() ?? [];
        let num = 0;
        for (const v of player) {
            if (v.groupID === groupID) {
                num++;
            }
        }
        return num;
    }

    getConfirmPromo(uid?: number): boolean {
        uid = uid || App.userMgr.loginUser.uid;

        const promoNum = this.getPromotionNum(null, true);
        const stageIndex = this.baseInfo.getStageInfo().getStageIndex();
        const promotionType = this.config.getPromotionType(stageIndex, this.baseInfo.getDynamicStageId());
        const user = this.userInfo.findUser(uid);

        if (promotionType === PBRegularCommon.PromotionTypeTableRank) {
            const rankTable = user.rankTable || 1;
            if (rankTable <= promoNum) {
                return true;
            } else {
                return false;
            }
        } else {
            const rank = user.rank;
            const users = this.userInfo.getRankUsers(false)
            let playing = 0; // 在玩的
            let front = 0; // 在玩并且排名比我高的

            for (let i in users) {
                const v = users[i];
                if (v.status === PBRegularCommon.UserStatusPlaying && ((this.getHasGroup() && user.groupID === v.groupID) || !this.getHasGroup())) {
                    playing++;

                    if (v.rank < rank) {
                        front++;
                    }
                }
            }

            console.warn("RoomInfo:getConfirmPromotion", rank, playing, front, promoNum);

            if (rank + (playing - front) <= promoNum) {
                return true;
            } else {
                return false;
            }
        }
    }

    getConfirmOut(uid?: number): boolean {
        uid = uid || App.userMgr.loginUser.uid;

        const stageIndex = this.baseInfo.getStageInfo().getStageIndex();
        const promotionType = this.config.getPromotionType(stageIndex, this.baseInfo.getDynamicStageId());
        const promoNum = this.getPromotionNum(null, true);
        const user = this.userInfo.findUser(uid);

        if (promotionType === PBRegularCommon.PromotionTypeTableRank) {
            const rankTable = user.rankTable || 1;
            if (rankTable > promoNum) {
                return true;
            } else {
                return false;
            }
        } else {
            const tables = this.tableInfo.getTables() || [];
            const seatNum = this.config.getSeatNum();
            let cnt = 0;
            let leftTableNum = 0;

            for (let i in tables) {
                const v = tables[i];
                if (v.status === PBRegularCommon.TableStatusPlaying && ((this.getHasGroup() && user.groupID === v.groupID) || !this.getHasGroup())) {
                    leftTableNum++;
                    const uids = v.uids || [];
                    let score = 0;
                    for (let i1 in uids) {
                        const v1 = uids[i1];
                        const tUser = this.userInfo.findUser(v1);

                        if (tUser) {
                            score += tUser.score;
                        } else {
                            console.error("RoomInfo:getConfirmOut 没有找到玩家", v, v1, this);
                        }
                    }
                    const avgScore = score / seatNum;
                    if (avgScore >= user.score) {
                        cnt++;
                    }
                }
            }

            // M-a*N +n ＞K
            const bestRank = user.rank - seatNum * leftTableNum;
            console.warn("RoomInfo:getConfirmOut", user.rank, bestRank, leftTableNum, seatNum, cnt, promoNum);

            return bestRank + cnt > promoNum;
        }
    }

    checkUserIsCanRevival(uid?: number): boolean {
        const stageIndex = this.baseInfo.getStageInfo().getStageIndex();
        const revivalCfg = this.config.getRevivalConfig(stageIndex, this.baseInfo.getDynamicStageId());
        const user = this.userInfo.findUser(uid ?? App.userMgr.loginUser.uid);
        return revivalCfg.isEnabled && (revivalCfg.endUserNum < this.getRemainingNum()) && (revivalCfg.cntPerUser > user.getRevivedCnt());
    }


    /**
     * 子游戏界面显示用
     */
    getShowStageInfo() : ShowStageInfo {
        let index = this.baseInfo.getStageInfo().getStageIndex()
        let dynamicID = this.baseInfo.getDynamicStageId()

        let uid = App.userMgr.loginUid
        if (this.handler.tableObHandler && this.handler.tableObHandler._observerUID) {
            uid = this.handler.tableObHandler._observerUID
        }
        
        let table = this.tableInfo.findTableByUID(uid)
        let outScore = 0
        if (!table) {
            console.error("RoomInfo getStageInfo not find table")
        } else {
            outScore = table.outScore
        }

        let result : ShowStageInfo = {
            stageType : this.config.getStageType(index, dynamicID),
            promotionType : this.config.getPromotionType(index, dynamicID),
            endInfo : {
                stageEndType : this.config.getStageEndType(index, dynamicID),
                userNum : this.config.getUserNum(index, dynamicID),
                duration : this.config.getStageDuration(index, dynamicID),
                gameNum : this.config.getTotalGameNum(index, dynamicID),
            },
            roundSeq : this.config.getRoundSeq(index, dynamicID),
            gameNo : this.config.getTotalGameNum(index, dynamicID),
            outScore : outScore,
            totalNum : this.getStageEnterNum(),
            promotionNum : this.getPromotionNum(),
            countStrike : this.config.getCountStrike(dynamicID),
            countFinality : this.config.getCountFinality(dynamicID),
            isFinallyRound : this.getIsFinallyRound(),
        }

        return result
    }

    /**
     * 子游戏界面显示用
     */
    getShowUserInfo() : ShowUserInfo {
        let userRanks = this.userInfo.getRankUsers()
        let uid = App.userMgr.loginUid
        if (this.handler.tableObHandler && this.handler.tableObHandler._observerUID) {
            uid = this.handler.tableObHandler._observerUID
        }
        let user = this.userInfo.findUser(uid)
        if (!user) {
            console.error("RoomInfo getShowUserInfo not find user")
            return
        }

        let totalNum = this.getPlayingNum()
        let rank = user.rank
        if (this.getHasGroup()){
            totalNum = this.getPlayingNumByGroupID(user.groupID)
            rank = 0

            for (let index = 0; index < userRanks.length; index++) {
                const element = userRanks[index];
                if (element.groupID == user.groupID) {
                    rank++
                }

                if (element.uid == user.uid){
                    break
                }
            }
        }

        let result : ShowUserInfo = {
            uid : user.uid,
            score : user.score,
            rank : rank,
            totalNum : totalNum,
            isOut : user.isOut(),
            rankTable : user.rankTable,
            gameID : this.config.getGameID(),
            isQuit : user.isStageQuitFlag,
        }

        return result
    }
}
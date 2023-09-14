import { Log } from "bos/exports";
import { PBCommonAsset, PBRegularCommon } from "../../code/code";
import {App} from "app/App"
import { MatchHandler } from "../handler/MatchHandler";
import { AssetItem } from "../../config/PrizeConfig";
import { SafeEmit } from "./RoomInfo";

// --[[
//     Params:
//     recordPrevStRank 是否写入上阶段排名
//     获取排行数组
//     tips:
//         比赛最终结束：前端不在对排名进行排序，直接使用后端的排序数据
//         比赛结束前：
//                 未淘汰：分数 -> 阶段完成时间 -> 之前排名(prevStRank) -> 报名时间 -> uid排序
//                 淘汰：淘汰时间->分数 -> 阶段完成时间 -> 之前排名(prevStRank) -> 报名时间->uid排序
// ]]  
export function SortRank(users: MUser[]) {
    if (users) {
        users.sort(function(a, b) {
            if (!a.isOut() && !b.isOut()) {
                const aScore = a.score || 0;
                const bScore = b.score || 0;
                if (aScore == bScore) {
                    const aCurStFinishAt = a.curStFinishAt || 0;
                    const bCurStFinishAt = b.curStFinishAt || 0;
                    if (aCurStFinishAt == bCurStFinishAt) {
                        const aPreRank = a.prevStRank || 0;
                        const bPreRank = b.prevStRank || 0;
                        if (aPreRank == bPreRank) {
                            const aEnterAt = a.EnterAt || 0;
                            const bEnterAt = b.EnterAt || 0;
                            if (aEnterAt == bEnterAt) {
                                return a.uid - b.uid        //uid小的排前面
                            } else {
                                return a.EnterAt - b.EnterAt   //报名时间早的排前面
                            }
                        } else {
                            return aPreRank - bPreRank;     //上阶段排名靠前的排前面
                        }
                    } else {
                        if (aCurStFinishAt < bCurStFinishAt) {  //完成时间早的排前面
                            if (aCurStFinishAt == 0) {
                                return 1;
                            } else {
                                return -1;
                            }
                        } else {
                            if (bCurStFinishAt == 0) {
                                return -1;
                            } else {
                                return 1;
                            }
                        }
                    }
                } else {
                    return bScore - aScore;
                }
            } else if (a.isOut() && b.isOut()) {
                const aOutAt = a.OutAt || Date.now();
                const bOutAt = b.OutAt || Date.now();
                if (aOutAt == bOutAt) {
                    const aScore = a.score || 0;
                    const bScore = b.score || 0;
                    if (aScore == bScore) {
                        const aCurStFinishAt = a.curStFinishAt || 0;
                        const bCurStFinishAt = b.curStFinishAt || 0;
                        if (aCurStFinishAt == bCurStFinishAt) {
                            const aPreRank = a.prevStRank || 0;
                            const bPreRank = b.prevStRank || 0;
                            if (aPreRank == bPreRank) {
                                const aEnterAt = a.EnterAt || 0;
                                const bEnterAt = b.EnterAt || 0;
                                if (aEnterAt == bEnterAt) {
                                    return a.uid - b.uid        //uid小的排前面
                                } else {
                                    return a.EnterAt - b.EnterAt   //报名时间早的排前面
                                }
                            } else {
                                return aPreRank - bPreRank;     //上阶段排名靠前的排前面
                            }
                        } else {
                            if (aCurStFinishAt < bCurStFinishAt) {  //完成时间早的排前面
                                if (aCurStFinishAt == 0) {
                                    return 1;
                                } else {
                                    return -1;
                                }
                            } else {
                                if (bCurStFinishAt == 0) {
                                    return -1;
                                } else {
                                    return 1;
                                }
                            }
                        }
                    } else {
                        return bScore - aScore;
                    }
                } else {
                    return bOutAt - aOutAt;     //后面淘汰的排前面
                }
            } else {
                if (a.isOut()) {
                    return 1
                } else {
                    return -1
                }
            }
        });
    }
}  

export type SettleAsset = {asset? : AssetItem, dtype?,markupRate?,prop_id?,vip_level?,markupRateType? : number}

class DynamicAssetItems {
    dtype = 0
    asset : AssetItem[] = [];
    markupRate = 0
    markupRateType = 0
    way = 0
    meta: any = null
    scene: any = null
    grantType = 0

    reset(){
        this.dtype = 0
        this.asset = []
        this.markupRate = 0
        this.markupRateType = 0
        this.way = 0
        this.meta = null
        this.scene = null
        this.grantType = 0
    }

    init(data){
        if(data) {
            this.dtype = data.dtype ?? 0
            this.markupRate = data.markupRate ?? 0
            this.markupRateType = data.markupRateType ?? 0
            this.way = data.way ?? 0
            this.meta = data.meta  ?? null
            this.scene = data.scene ?? null
            this.grantType = data.grantType ?? 0

            if (data.asset) {
                this.asset = []
                for (let index = 0; index < data.asset.length; index++) {
                    const element = data.asset[index];
                    let item = new AssetItem()
                    item.update(element)
                    this.asset.push(item)
                }
            }
        }
    }
}

export class MUser {
    uid:number;
    score:number;
    rank:number;
    changeScore:number;
    status = PBRegularCommon.UserStatusUnknown;
    TableRole:number;
    gameResult = PBRegularCommon.GameResultTypeUnknown;
    sid:number;
    EnterAt:number;
    RoundCnt:number;
    isRobot:boolean;
    isDelayEnter:boolean;
    isFastOut:boolean;
    groupID:number;
    OutAt:number;
    punishMarks:number;
    punishCnt:number;
    prizeViewAssets : DynamicAssetItems[] = []
    curStFinishAt:number;
    prevStRank:number;
    isStageQuitFlag:boolean
    rankTable = 0
    revivedCnt = 0

    handler : MatchHandler
	
    constructor(handler : MatchHandler | null){
        this.handler = handler
    }

    reset(){
        this.uid                                    = 0
        this.score                                  = 0
        this.rank                                   = 0
        this.changeScore                            = 0
        this.status                                 = PBRegularCommon.UserStatusUnknown
        this.TableRole                              = 0
        this.gameResult                             = 0
        this.sid                                    = 0
        this.EnterAt                                = 0
        this.RoundCnt                               = 0
        this.isRobot                                = false
        this.isDelayEnter                           = false
        this.isFastOut                              = false
        this.groupID                                = 0
        this.OutAt                                  = 0
        this.punishMarks                            = 0
        this.punishCnt                              = 0
        this.prizeViewAssets                        = [];
        this.curStFinishAt                          = 0
        this.prevStRank                             = 0
        this.isStageQuitFlag                        = false
        this.rankTable                              = 0
    }

    init(data){
        this.uid                                    =  data.uid             || 0
        this.score                                  =  data.score           || 0
        this.rank                                   =  data.rank            || 0
        this.changeScore                            =  data.changeScore     || 0
        this.status                                 =  data.status          || PBRegularCommon.UserStatusUnknown
        this.TableRole                              =  data.TableRole       || 0
        this.gameResult                             =  data.gameResult      || 0
        this.sid                                    =  data.sid             || 0
        this.EnterAt                                =  data.EnterAt         || 0
        this.RoundCnt                               =  data.RoundCnt        || 0
        this.isRobot                                =  data.isRobot         || false
        this.isDelayEnter                           =  data.isDelayEnter    || false
        this.isFastOut                              =  data.isFastOut       || false
        this.groupID                                =  data.groupID         || 0
        this.OutAt                                  =  data.OutAt           || 0
        this.punishMarks                            =  data.punishMarks     || 0
        this.punishCnt                              =  data.punishCnt       || 0
        this.curStFinishAt                          =  data.curStFinishAt   || 0
        this.prevStRank                             =  data.prevStRank      || 0
        this.isStageQuitFlag                        =  data.isStageQuitFlag || 0
        this.rankTable                              =  data.rankTable       || 1

        this.prizeViewAssets = []
        if (data.prizeViewAssets) {
            for (let index = 0; index < data.prizeViewAssets.length; index++) {
                const element = data.prizeViewAssets[index];
                let item = new DynamicAssetItems()
                item.init(element)
                this.prizeViewAssets.push(item)
            }
        }
    }

    update(data) {
        this.uid                    = data.uid
        this.isRobot                = data.isRobot || false
        this.isDelayEnter           = data.isDelayEnter || 0
        this.punishMarks            = data.punishMarks || 0
        this.punishCnt              = data.punishCnt || 0
        this.prevStRank             = data.prevStRank || 0
        this.isStageQuitFlag        = data.isStageQuitFlag || 0

        this.updateEnterAt(data.EnterAt)
        this.updateRank(data.rank)
        this.updateGroupID(data.groupID)
        this.updateTableRank(data.rankTable)
        this.updateStatus(data.status)
        this.updateRoundCnt(data.RoundCnt)
        this.updateChangeScore(data.changeScore)
        this.updateScore(data.score)
        this.updateSid(data.sid)
        this.updateSettle(data.prizeViewAssets)
        this.updateOutAt(data.OutAt)
        this.updateCurStFinishAt(data.curStFinishAt)
        this.updateTableRole(data.TableRole)
        this.updateGameResult(data.gameResult)
        this.updateRevivedCnt(data.revivedCnt)
    }

    updateRevivedCnt(revivedCnt : number = 0){
        console.debug("User:updateRevivedCnt", this.uid, revivedCnt)

        this.revivedCnt = revivedCnt
    }

    updateGameResult(gameResult : number = 0){
        console.debug("User:updateGameResult", this.uid, gameResult)

        this.gameResult = gameResult
    }

    updateTableRole(TableRole : number = 0){
        console.debug("User:updateTableRole", this.uid, TableRole)

        this.TableRole = TableRole
    }

    updateCurStFinishAt(curStFinishAt : number = 0){
        console.debug("User:updateCurStFinishAt", this.uid, curStFinishAt)

        this.curStFinishAt = curStFinishAt
    }

    updateOutAt(OutAt : number = 0){
        console.debug("User:updateOutAt", this.uid, OutAt)

        this.OutAt = OutAt
    }

    updateSettle(prizeViewAssets : any){
        console.debug("User:updateSettle", this.uid, prizeViewAssets)

        this.prizeViewAssets = []
        if (prizeViewAssets) {
            for (let index = 0; index < prizeViewAssets.length; index++) {
                const element = prizeViewAssets[index];
                let item = new DynamicAssetItems()
                item.init(element)
                this.prizeViewAssets.push(item)
            }
        }
    }

    updateSid(sid: number = 0){
        console.debug("User:updateSid", this.uid, sid)

        this.sid = sid
    }

    updateScore(score: number = 0){
        console.debug("User:updateScore", this.uid, score)

        this.score = score
    }

    updateChangeScore(changeScore: number = 0){
        console.debug("User:updateChangeScore", this.uid, changeScore)

        this.changeScore = changeScore
    }

    updateRoundCnt(RoundCnt: number = 0){
        console.debug("User:updateRoundCnt", this.uid, RoundCnt)

        this.RoundCnt = RoundCnt
    }

    updateRank(rank: number = 0){
        console.debug("User:updateRank", this.uid, rank)

        this.rank = rank
    }

    updateTableRank(rankTable:number = 0){
        console.debug("User:updateTableRank", this.uid, rankTable)

        this.rankTable = rankTable
    }

    updateGroupID(groupID: number = 0){
        console.debug("User:updateGroupID", this.uid, groupID)
        
        this.groupID = groupID
    }

    updateEnterAt(enterAt: number = 0){
        console.debug("User:updateEnterAt", this.uid, enterAt)
        
        this.EnterAt = enterAt
    }

    updateIsRobot(isRobot: boolean = false){
        console.debug("User:updateIsRobot", this.uid, isRobot)
        
        this.isRobot = isRobot
    }

    updateStatus(status : number) {
        console.debug("User:updateStatus", this.uid, this.status, status)
        if (this.status !== status){
            this.status = status
            if (this.status == PBRegularCommon.UserStatusOut) {
                SafeEmit(this.handler,MatchHandler.EventType.UserOut, this.uid)
            }else if (this.status == PBRegularCommon.UserStatusBye) {
                SafeEmit(this.handler,MatchHandler.EventType.UserBye, this.uid)
            }else if (this.status == PBRegularCommon.UserStatusWait) {
                SafeEmit(this.handler,MatchHandler.EventType.UserWait, this.uid)
            }else if (this.status == PBRegularCommon.UserStatusWaitOver) {
                SafeEmit(this.handler,MatchHandler.EventType.UserWaitOver, this.uid)
            }
            SafeEmit(this.handler,MatchHandler.EventType.UserStatusChange, this.uid, this.status)
        }
    }

    updateStageQuitFlag(value : boolean){
        this.isStageQuitFlag = value
    }

    updatePunishMarks(punishMarks){
        console.debug("User:updatePunishMarks", this.uid, punishMarks)

        this.punishMarks = punishMarks
        if (this.punishMarks){
            this.punishCnt++
        }
    }

    userQuit(){
        this.isStageQuitFlag = true
    }

    getUID() {
        return this.uid
    }

    getRevivedCnt(){
        return this.revivedCnt
    }

    isSigned(){
        return this.status == PBRegularCommon.UserStatusEntry
    }

    isReady() {
        return this.status == PBRegularCommon.UserStatusReady
    }

    isOut(){
        return this.status == PBRegularCommon.UserStatusOut
    }

    isTakePartInMatch(){
        return this.status >= PBRegularCommon.UserStatusReady
    }

    isWait(){
        return this.status == PBRegularCommon.UserStatusWait
    }
    
    isWaitOver(){
        return this.status == PBRegularCommon.UserStatusWaitOver
    }
    
    isPlaying() {
        return this.status == PBRegularCommon.UserStatusPlaying
    }

    isInRevival() {
        return this.status == PBRegularCommon.UserStatusWaitRevival
    }

    getRoundCnt() {
        return this.RoundCnt
    }

    getStatus() {
        return this.status
    }

    getPrizes() {
        return this.prizeViewAssets
    }

    getSplitPrizes() {
        const prizeViewAssets = this.prizeViewAssets || [];
        let assetItems : SettleAsset[] = []
        for (let i = 0; i < prizeViewAssets.length; i++) {
            const v = prizeViewAssets[i];
            const assets = v.asset || [];
            const dtype = v.dtype;
            const meta = v.meta;
            for (const i1 in assets) {
                const v1 = assets[i1];
                let assetItem : SettleAsset = {}
                let asset = new AssetItem()
                asset.update(v1)
                assetItem.asset = asset
                if (dtype === PBCommonAsset.DynamicAssetTypeMarkup) {
                    assetItem.dtype = v.dtype;
                    assetItem.markupRate = v.markupRate;
                    assetItem.prop_id = parseInt(meta?.prop_id || "1");
                    assetItem.vip_level = parseInt(meta?.vip_level || "1");
                    assetItem.markupRateType = v.markupRateType;
                }
                assetItems.push(assetItem);
            }
        }
        return assetItems;
    }

    contain(list: SettleAsset[], id, type: number) : SettleAsset {
        for (const v of list || []) {
            if (v.asset.id === id && v.asset.type === type) {
                return v;
            }
        }
    }

    getMergePrizes(this: MUser) {
        const splitItems = this.getSplitPrizes()
        const mergeItems: SettleAsset[] = []
        for (const v of splitItems) {
            const settleAsset = this.contain(mergeItems, v.asset.id, v.asset.type)
            if (settleAsset) {
                settleAsset.asset.amount += v.asset.amount
                if (v.dtype == PBCommonAsset.DynamicAssetTypeMarkup) {
                    settleAsset.dtype = v.dtype
                    settleAsset.markupRate = v.markupRate
                    settleAsset.prop_id = v.prop_id
                    settleAsset.markupRateType = v.markupRateType
                }
            } else {
                mergeItems.push(v)
            }
        }
        return mergeItems
    }

    contain1(list: SettleAsset[][], id, type: number): SettleAsset[] {
        for (let index = 0; index < list.length; index++) {
            const list1 = list[index];
            for (let index = 0; index < list1.length; index++) {
                const element = list1[index];
                if (element.asset.id === id && element.asset.type === type) {
                    return list1;
                }
            }
        }
    }

    getPrizesWithSameType() {
        const prizeViewAssets = this.prizeViewAssets;
        let resetList:SettleAsset[][]
        for (const v of prizeViewAssets) {
            const assets = v.asset || [];
            const dtype = v.dtype;
            const meta = v.meta;

            for (const v1 of assets) {
                let assetItem : SettleAsset
                let asset = new AssetItem()
                asset.update(v1)
                assetItem.asset = asset

                assetItem.dtype = dtype;
                assetItem.markupRate = v.markupRate;
                assetItem.prop_id = parseInt(meta?.prop_id || "1");
                assetItem.vip_level = parseInt(meta?.vip_level || "1");
                assetItem.markupRateType = v.markupRateType;

                let temp = this.contain1(resetList, asset.id, asset.type)
                if (temp) {
                    temp.push(assetItem)
                } else {
                    let assetItems : SettleAsset[]= []
                    assetItems.push(assetItem)
                    resetList.push(assetItems)
                }
            }
        }

        return resetList;
    }

    clone(){
        let user = new MUser(null)
        user.init(this)
        return user
    }
}

export class UserInfo {
    users : MUser[] = []
    usersByUID = new Map<number, MUser>()
    sortUsers : MUser[] = []
    dirtyMark = false
    isFinally = false

    handler : MatchHandler
	
    constructor(handler : MatchHandler | null){
        this.handler = handler
    }

    reset(){
        this.users = []
        this.sortUsers = []
        this.usersByUID.clear()
        this.dirtyMark = false
        this.isFinally = false
    }

    init(users){
        this.reset()

        for (let index = 0; index < users.length; index++) {
            const info = users[index];
            this.addUser(info)
        }
    }

    updateWithNoEvent(users) {
        for (let index = 0; index < users.length; index++) {
            const info = users[index];
            let user = this.findUser(info.uid)
            if (user) {
                user.init(info)
            } else {
                console.error("updateWithNoEvent user is not find", info)
            }
        }
    }

    setIsFinally(){
        this.isFinally = true
    }

    setDirty() {
        this.dirtyMark = true
    }

    createUser(){
        return new MUser(this.handler)
    }

    addUser(sUser){
        console.debug("addUser", sUser)

        let user = this.findUser(sUser.uid)
        if (user == null) {
            user = this.createUser()
            user.init(sUser)
            this.users.push(user)
            this.usersByUID.set(sUser.uid, user)
        } else {
            user.update(sUser)
            console.warn("addUser already has user", sUser)
        }

        this.dirtyMark = true

        return user
    }

    findUser(uid : number): MUser {
        if (uid == null) {
            console.error("findUser uid is invalid", uid)
            return
        }

        return this.usersByUID.get(uid)
    }

    updateUsers (sUsers) {
        for (let index = 0; index < sUsers.length; index++) {
            const user = sUsers[index];
            this.updateUser(user)
        }
    }

    updateUser(sUser): MUser {
        let user = this.findUser(sUser.uid)
        if (user) {
            user.update(sUser)
        }
        this.dirtyMark = true

        return user
    }

    removeUser(uid : number) {
        let user = this.findUser(uid)
        if (user) {
            let index = this.users.indexOf(user)
            this.users.splice(index, 1)
            this.usersByUID.delete(uid)
            this.dirtyMark = true
        } else {
            console.error("removeUser not find user", user)
        }
    }

    getSignUsers(){
        let users : MUser[] = []
        for (let index = 0; index < this.users.length; index++) {
            const user = this.users[index];
            if (user.status >= PBRegularCommon.UserStatusEntry) {
                users.push(user)
            }
        }
        return users
    }

    getReadyUsers(){
        let users : MUser[] = []
        for (let index = 0; index < this.users.length; index++) {
            const user = this.users[index];
            if (user.status >= PBRegularCommon.UserStatusReady) {
                users.push(user)
            }
        }
        return users
    }

    getPromoUsers() {
        let tempUsers = this.getRankUsers(false)
        let users : MUser[] = []
        for (let index = 0; index < tempUsers.length; index++) {
            const user = tempUsers[index];
            if (user.isTakePartInMatch() && !user.isOut()) {
                users.push(user)
            }
        }
        return users
    } 

    sort(recordPrevStRank ?: boolean){
        recordPrevStRank = recordPrevStRank || false

        if (this.dirtyMark) {
            this.dirtyMark = false
            var tempUsers : MUser[] = this.getReadyUsers()
            if (this.isFinally) {
                tempUsers.sort((a, b)=>{
                    return (a.rank - b.rank)
                })
            } else {
                SortRank(tempUsers)
                for (let index = 0; index < tempUsers.length; index++) {
                    const user = tempUsers[index];
                    user.rank = index + 1
                    if (recordPrevStRank){
                        user.prevStRank = user.rank
                    }
                }
                this.sortUsers = tempUsers
            }
        } else {
            if (recordPrevStRank) {
                for (let index = 0; index < this.sortUsers.length; index++) {
                    const user = this.sortUsers[index];
                    user.prevStRank = user.rank
                }
            }
        }
    }

    getRankUsers(recordPrevStRank ?: boolean) {
        this.sort(recordPrevStRank)
        return this.sortUsers
    } 
    
    getMySelf() {
        let uid = App.userMgr.loginUser.uid
        let user = this.findUser(uid)
        if (!user) {
            user = this.addUser({
                uid         : uid,
            })
            Log.i("自己加入了 UID = ", uid)
        }
        return user
    }

    updateUserStatus(uids : number[], status : number){
        for (let index = 0; index < uids.length; index++) {
            const uid = uids[index];
            let user = this.findUser(uid)
            if (user) {
                user.updateStatus(status)
            } else {
                console.error("UserInfo:updateUserStatus时找不到用户：", uid)
            }
        }
    }

    userQuit(uid) {
        let user = this.findUser(uid)
        if (user) {
            user.updateStageQuitFlag(true)
        } else {
            console.error("UserInfo:userQuit时找不到用户", uid)
        }
    }

    getUsers() {
        return this.users
    }
}
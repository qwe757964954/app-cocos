import { App } from "app/App"
import { MatchInfo } from "../matchList/data/MatchInfo";
import { MatchMgr } from "../MatchMgr";
import { PreMatchService } from "idl/tss/match_v2/prematch.v1";
import { OfficeMatchService } from "idl/tss/match_v2/officematch.v1";
import { ObserverService } from "idl/tss/match_v2/observer.v1";
import { Observer as GameObserver} from "idl/tss/game/observer.v5"
import { Scheduler } from "idl/tss/match_v2/scheduler.v2";
import { ListService } from "idl/tss/match_v2/list.v1";
import { PBRegularCommon } from "../code/code";
import { UIMgr } from "bos/framework/gui/UIMgr";
import { Code as PBHallCode } from "idl/tss/hall/code";
import { uiMgr } from "bos/exports";

export class MatchApi {
    /*赛前Api*/

    /**进入比赛 */
    static async joinPreMatch(preMatchKey : string){
        let req = {
            preMatchKey : preMatchKey,
        }
        let rep = await PreMatchService.JoinPreMatch(req)
        if (rep.err == PBRegularCommon.CodeNoSuchMatch) {
            uiMgr.showToast("比赛房间已解散")
        } else if (rep.err == PBRegularCommon.CodeUserIsKicked) {
            uiMgr.showToast("你无法再加入该房间")
        } else if (rep.err == PBRegularCommon.CodeEnterUserRepetitiveEntry) {
            uiMgr.showToast("重复进入")
        } else if (rep.err && rep.err != -1) {
            uiMgr.showToast("赛事不存在，无法进入")
        }
        return rep
    }

    /**退出比赛 */
    static async leavePreMatch(preMatchKey : string){
        let req = {
            preMatchKey : preMatchKey,
        }
        let rep = await PreMatchService.LeavePreMatch(req)
        return rep
    }

    /**报名比赛 */
    static async signMatch(preMatchKey : string, entryToken : string, promptJump?, userRole?, cardTips?, prop?){
        console.debug("MatchApi signMatch", preMatchKey, entryToken, promptJump, userRole, cardTips, prop)
        let req = {
            entryToken : entryToken,
            preMatchKey : preMatchKey,
        }
        let rep = await PreMatchService.EnterPreMatch(req)
        console.debug("PreMatchService EnterPreMatch", req, rep)
        if (!rep.err) {
            uiMgr.showToast("报名成功")

            App.matchMgr.emit(MatchMgr.EventType.MatchSignEvent, {isSigned : true, preMatchKey : preMatchKey})
        } else {
            if (rep.err === PBRegularCommon.CodeEnterUserIsFull) {
                uiMgr.showToast("报名人数已满~");
              } else if (rep.err === PBRegularCommon.CodeEnterMatchExceedMaxNum) {
                uiMgr.showToast("已达最大参赛人数，请选择同时段的其他比赛参加吧~");
              } else if (rep.err === PBRegularCommon.CodeNoSuchMatch) {
                uiMgr.showToast("已过报名时间");
              } else if (rep.err === PBRegularCommon.CodeEnterInsufficientAsset) {
                // do something
                uiMgr.showToast("资产不足");
              } else if (rep.err === PBRegularCommon.CodeMatchStartFail) {
                uiMgr.showToast("开赛失败了");
              } else if (rep.err === PBHallCode.CODE_HAVE_NOT_ENOUGH_AMOUNT) {
                uiMgr.showToast("资产不足");
              } else if (rep.err === PBRegularCommon.CodeEnterInsufficientVipLevel) {
                uiMgr.showToast("vip等级不够");
              } else if (rep.err === PBRegularCommon.CodeMatchIsPlaying) {
                uiMgr.showToast("已经开赛了");
              } else if (rep.err === PBRegularCommon.CodeEnterUserRepetitiveEntry) {
                console.error("重复进入");
              } else if (rep.err === PBRegularCommon.CodeUserRuleInconsistent) {
                // do something
                uiMgr.showToast("不满足报名条件");
              } else if (rep.err === PBRegularCommon.CodeUserHadReadyOtherMatch) {
                uiMgr.showToast("请先将当前比赛退赛后再报名该比赛~");
              } else if (rep.err === PBHallCode.CodePrivilegeTimesNotEnough) {
                uiMgr.showToast("免费报名特权次数不足");
              } else {
                console.debug("EnterPreMatch失败：", rep.err);
              }
        }
        return rep
    }

    /**取消报名 */
    static async cancelSign(preMatchKey : string){
        let req = {
            preMatchKey : preMatchKey,
        }
        let rep = await PreMatchService.CancelEnterPreMatch(req)
        if (!rep.err) {
            App.matchMgr.emit(MatchMgr.EventType.MatchSignEvent, {isSigned : false, preMatchKeykey : preMatchKey})
        } else {
            
        }
        return rep
    }

    /**准备 */
    static async readyPreMatch(preMatchKey : string){
        let req = {
            preMatchKey : preMatchKey,
        }
        let rep = await PreMatchService.Ready(req)
        return rep
    }

    /**取消准备 */
    static async unReadyPreMatch(preMatchKey : string){
        let req = {
            preMatchKey : preMatchKey,
        }
        let rep = await PreMatchService.CancelReady(req)
        return rep
    }

    /**重连 */
    static async reconnectPreMatch(preMatchKey : string){
        let req = {
            preMatchKey : preMatchKey,
        }
        let rep = await PreMatchService.ReconnectPreMatch(req)
        return rep
    }

    /**获取已经报名的比赛 */
    static async getUserSignInfo(uid ?: number) {
        let req = {
            uid : uid ?? App.userMgr.loginUser.uid,
        }

        return await PreMatchService.ListUserEnteredMatches(req)
    }

    /**添加机器人 */
    static async applyRobot(preMatchKey : string, num : number) {
        let req = {
            applyNum : num,
            preMatchKey : preMatchKey,
        }

        return await PreMatchService.ApplyRobot(req)
    }

    /**赛中Api */
    static async getIGInfo(matchKey : string, srvID : number) {
        let req = {
            matchKey : matchKey,
        }
        return await OfficeMatchService.GetIGInfo(req, {destID : srvID, ext : matchKey})
    }

    static async getMsgUserRevival(matchKey : string, srvID : number) {
        return await OfficeMatchService.GetMsgUserRevival(null, {destID : srvID, ext : matchKey})
    }

    static async delayJoinMatch(matchKey : string, srvID : number){
        let req = {
            matchKey : matchKey,
            uid : App.userMgr.loginUser.uid
        }
        let rep = await OfficeMatchService.DelayJoinMatch(req, {destID : srvID, ext : matchKey})
        if(!rep.err) {
            uiMgr.showToast("您的会员延时入场特权已生效正在进入比赛...")
        } else {
            if (rep.err === PBRegularCommon.CodeDelayEnterNoPermission) {
                uiMgr.showToast("您当前的会员等级无法享受此特权");
              } else if (rep.err === PBRegularCommon.CodeDelayEnterNoSupport) {
                uiMgr.showToast("当前赛事阶段不支持延时入场");
              } else if (rep.err === PBRegularCommon.CodeDelayEnterMatchIsOver) {
                uiMgr.showToast("当前赛事已结束");
              } else if (rep.err === PBRegularCommon.CodeDelayEnterMatchDisable) {
                uiMgr.showToast("当前赛事未开启延迟入场");
              } else if (rep.err === PBRegularCommon.CodeDelayEnterMatchNotEntry) {
                uiMgr.showToast("你未报名本场比赛");
              } else if (rep.err === PBRegularCommon.CodeDelayEnterMatchTimeOut) {
                uiMgr.showToast("延迟入场时间超出");
              } else if (rep.err === PBRegularCommon.CodeUserHadReadyOtherMatch) {
                uiMgr.showToast("请先将当前比赛退赛后再进行延迟入场");
              } else {
                uiMgr.showToast("延迟入场失败");
              }
        }
        return rep
    }

    static async cancelRevival(matchKey : string, srvID : number){
        let rep = await OfficeMatchService.CancelRevival(null, {destID : srvID, ext : matchKey})
        return rep
    }

    static async revival(matchKey : string, srvID : number){
        let rep = await OfficeMatchService.Revival(null, {destID : srvID, ext : matchKey})
        if (!rep.err) {
            uiMgr.showToast("复活失败")
            console.error("OfficeMatchService.Revival 失败", rep)
        }
        return rep
    }
    
    static  async getMatchConfigByMatchKey(matchKey : string, srvID : number) {
        let req = {
            matchKey : matchKey,
        }
        return  await OfficeMatchService.GetMatchConfig(req, {destID : srvID, ext : matchKey})
    }

    /**围观Api */
    static async joinObserver(matchKey : string) {
        let req = {
            resourceID : matchKey,
        }
        return await ObserverService.Subscribe(req)
    }

    static async leaveObserver(matchKey : string) {
        let req = {
            resourceID : matchKey,
        }
        return await ObserverService.Unsubscribe(req)
    }

    /**调度服务Api */
    static async getMatchConfigBySchedulerID(schedulerID : number) {
        let req = {
            id : schedulerID
        }
        return await Scheduler.GetScheduler(req)
    }

    static async getRuleDesc(schedulerID : number){
        let req = {
            id : schedulerID
        }
        return await Scheduler.GetOfficeRuleDesc(req)
    }

    /**赛事列表相关Api */
    static async getMatchList(page, pageSize, guideType?, matchTagType? : number, gameFilter? : any){
        let req = {
            page : page,
            pageSize : pageSize,
            guideType : guideType,
            matchTagType : matchTagType,
            gameFilter : gameFilter,
        }

        let result = await ListService.TidyListMatchByGuide(req)
        if (!result.err) {
            let items = result.resp?.items ?? []
            let total = result.resp?.totalSize
            let matchItems: MatchInfo[] = []
            for (let index = 0; index < items.length; index++) {
                const info = items[index];
                let matchInfo = new MatchInfo()
                matchInfo.update(info)
                matchItems.push(matchInfo)
            }
            return {matchItems, total}
        } else {
            console.error("ListService.ListMatchByGuide err", result)
        }
    }

    static async getMatchByRoomNo(roomNo : string) {
        let req = {
            roomNo : roomNo
        }
        let result = await ListService.TidyGetMatch(req)
        if (!result.err) {
            let item = result.resp?.item
            if (item) {
                let matchInfo = new MatchInfo()
                matchInfo.update(item)
                return matchInfo
            } else {
                console.warn("ListService.TidyGetMatch not item", result)
            }
        } else {
            console.warn("ListService.TidyGetMatch is error", result)
        }
    }

    //桌子围观
    static async JoinTableObserver(realKey : string, isRealtime : boolean = false){
        let req = {
            isRealtime : isRealtime
        }

        let result = await GameObserver.Join(req, {ext : realKey})
        return result
    }

    static async LeaveTableObserver(realKey : string){
        let result = await GameObserver.Leave(null, {ext : realKey})
        return result
    }
}
import { EmptyClass, EventTargetExtends } from "bos/utils/ClassUtils";
import { MatchHandler, ReconnectResult } from "./match/handler/MatchHandler";
import { MatchApi } from "./api/MatchApi";
import { ConfigRepo } from "./cache/ConfigRepo";
import {MatchConfig} from "./config/MatchConfig";
import { SignStatusRepo } from "./cache/SignStatusRepo";
import { PBRegularCommon } from "./code/code";
import { MatchController } from "./match/controller/MatchController";
import { App } from "app/App";
import { SessionInfo, SessionType } from "../session/SessionMgr";
import { OfficialController } from "./match/controller/OfficialController";
import { MemCache, uiMgr } from "bos/exports";
import { AccountMgr } from "../account/AccountMgr";
import { IMsgUserMatchPrepare, PreMatchService } from "idl/tss/match_v2/prematch.v1";

export type JoinParams = {
    preMatchKey: string, 
    schedulerID : number,
    delayEnter ?: boolean,
}

let eventIndex = 0
function getUniqueEventName(){
    eventIndex++
    return "MatchEvent" + eventIndex.toString()
}

export class MatchMgr extends EventTargetExtends(EmptyClass) {
    
    static EventType = {
        JoinPreMatchSuccess : getUniqueEventName(),
        JoinPreMatchFail : getUniqueEventName(),
        DelayJoinSuccess : getUniqueEventName(),
        DelayJoinFail : getUniqueEventName(),
    
        /*比赛报名/取消报名事件*/
        MatchSignEvent : getUniqueEventName()

    }

    matchHandlers = new Map<string,MatchHandler>()
    configRepo = new ConfigRepo()
    signStatusRepo = new SignStatusRepo()
    matchRuleCache = new MemCache<number, string>();
    
    init(){
        this.signStatusRepo.init()
        App.sessionMgr.registerHandler(SessionType.Match, this)
        PreMatchService.on("NotifyUserMatchPrepare", this.onNotifyUserMatchPrepare, this)
    }

    reset(){
        this.matchHandlers.forEach((handler, key) => {
            handler.reset()
        });
        this.matchHandlers.clear()
    }

    onNotifyUserMatchPrepare(resp : IMsgUserMatchPrepare, params){
        console.debug("MatchMgr onNotifyUserMatchPrepare", resp, params)
        if (AccountMgr.getInstance().getCurLoginStatus()) {
            if(!App.gameMgr.getRunningMatchKey() || App.gameMgr.getRunningMatchKey() == "") {
                if (uiMgr.topPage().name != "ChatRoom"){
                    uiMgr.loadPopup("match@matchModules/prefab/MatchReadyDialog", {params : resp})
                }
            }
        }
    }

    checkHandlerValid(key :string){
        return this.matchHandlers.get(key) != null
    }

    async join(params : JoinParams, controller? :MatchController) {
        console.warn("MatchMgr join", params)
        
        let preMatchKey = params.preMatchKey
        let schedulerID = params.schedulerID

        if (!preMatchKey || !schedulerID) {
            console.error("MatchMgr join error with wrong params", params)
            return
        }

        let matchHandler = this.matchHandlers.get(preMatchKey)
        if (!matchHandler) {
            matchHandler = new MatchHandler(preMatchKey, 0, schedulerID)
            this.matchHandlers.set(preMatchKey, matchHandler)

            let isOk = await matchHandler.join(params.delayEnter, controller)
            if (!this.checkHandlerValid(preMatchKey)){
                console.error("MatchMgr joinPreMatch checkHandlerValid is invalid")
                isOk = false
            }
    
            if (!isOk) {
                this.emit(MatchMgr.EventType.JoinPreMatchFail, preMatchKey)
                if (matchHandler) {
                    matchHandler.reset()
                }
                this.matchHandlers.delete(preMatchKey)
            } else {
                this.emit(MatchMgr.EventType.JoinPreMatchSuccess, this.matchHandlers.get(preMatchKey))
            }
        }

        return matchHandler
    }

    async reJoin(preMatchKey: string) {
        let matchHandler = this.matchHandlers.get(preMatchKey)
        if (matchHandler) {
            let isOk = await matchHandler.reJoin()
            if (isOk) {
                this.emit(MatchMgr.EventType.JoinPreMatchSuccess, this.matchHandlers.get(preMatchKey))
            } else {
                this.emit(MatchMgr.EventType.JoinPreMatchFail, preMatchKey)

                matchHandler.reset()
                this.matchHandlers.delete(preMatchKey)
            }
        } else {
            console.warn("MatchMgr reJoin bot find handler", preMatchKey)
        }
    }

    async leave(preMatchKey: string) {
        console.warn("MatchMgr leave", preMatchKey)

        //重置
        let matchHandler = this.matchHandlers.get(preMatchKey)
        if (matchHandler){
            //退出围观
            if (!matchHandler.isRealTime && matchHandler.matchKey) {
                MatchApi.leaveObserver(matchHandler.matchKey)
            }

            //移除
            matchHandler.reset()
            this.matchHandlers.delete(preMatchKey)
        }

        //调用后端接口
        MatchApi.leavePreMatch(preMatchKey)
    }

    async delayJoin(preMatchKey : string, controller? :MatchController) {
        console.warn("MatchMgr delayJoin", preMatchKey)
        let handler = this.matchHandlers.get(preMatchKey)
        if (handler) {
            let result = await handler.delayJoin(controller)
            if (result == 0) {
                this.emit(MatchMgr.EventType.DelayJoinSuccess, preMatchKey)
            } else {
                this.emit(MatchMgr.EventType.DelayJoinFail, preMatchKey)
            }
        } else {
            console.error("需要先Join成功,才能调用delayJoin", preMatchKey)
        }
    }

    getHandlerByPreMatchKey(preMatchKey : string) {
        console.warn("MatchMgr getHandlerByPreMatchKey", preMatchKey, this.matchHandlers.get(preMatchKey))
        return this.matchHandlers.get(preMatchKey)
    }

    getReadyMatch() : string{
        this.matchHandlers.forEach((handler, key) => {
            let mySelf = handler.roomInfo.userInfo.getMySelf()
            if (mySelf.isTakePartInMatch() && !mySelf.isOut()) {
                return key
            }
        });
        return ""
    }

    async reconnect(preMatchKey : string, times? : number) {
        let matchHandler = this.matchHandlers.get(preMatchKey)
        uiMgr.showLoading()
        let result = await matchHandler.reconnect(new OfficialController(matchHandler))
        uiMgr.hideLoading()
        if (result == ReconnectResult.Error) {
            matchHandler.reset()
            this.matchHandlers.delete(preMatchKey)
        } else {
            if (result == ReconnectResult.Playing) {
                return 0
            } else {
                return -1
            }
        }
    }

    /* 重连处理 */
    async reconnectSession(msg: SessionInfo):Promise<number>{
        console.warn("MatchMgr reconnectSession")
        if (msg.isMatchSession && msg.matchSession) {
            //有会话，在比赛中或者准备状态
            let preMatchKey = msg.matchSession.preMatchKey
            let srvID = msg.matchSession.srvID
            let schedulerID = msg.matchSession.matchId
            let matchHandler = this.matchHandlers.get(preMatchKey)
            if (!matchHandler) {
                matchHandler = new MatchHandler(preMatchKey, srvID, schedulerID)
                this.matchHandlers.set(preMatchKey, matchHandler)
            }
            return this.reconnect(preMatchKey, 3)
        } else {
            //没有会话的情况，在赛前
            //TODO(比赛跳转功能的重连)
            this.matchHandlers.forEach((handler, key)=>{
                this.reconnect(key)
            })
        }

        return -1
    }

    /*
    **key : matchKey or schedulerID
    **fromMatch : 是否从赛中拿配置
    **updateAt : 配置更新时间,用于校验配置是否有效
    */
    async getConfig(key : string | number, fromMatch : boolean, srvID? : number, updateAt ?: number) {
        let config = this.configRepo.getConfig(key.toString(), updateAt)
        if (config) {
            return config
        } else {
            if (fromMatch) {
                let result = await MatchApi.getMatchConfigByMatchKey(key as string, srvID)
                if(result.err == null){
                    config = new MatchConfig()
                    config.init(result.resp.cfg)
                    this.configRepo.setConfig(key.toString(), config)
                    return config
                } else {
                    console.error("MatchMgr getMatchConfigByMatchKey err", result)
                }
            } else {
                let result = await MatchApi.getMatchConfigBySchedulerID(key as number)
                if(result.err == null){
                    let cfg = result.resp?.scheduler?.config?.preMatch
                    if (cfg) {
                        config = new MatchConfig()
                        config.init(cfg)
                        this.configRepo.setConfig(key.toString(), config)
                        return config
                    } else {
                        console.error("MatchMgr getMatchConfigBySchedulerID err", result)
                    }
                }
            }
        }
        return null
    }

    async getIsSign(key : string) {
        let status = await this.signStatusRepo.getSignStatus(key)
        return status && status >= PBRegularCommon.UserStatusEntry
    }

    async getMatchRule(id : number) {
        let rule = this.matchRuleCache.get(id)
        if (!rule) {
            let result = await MatchApi.getRuleDesc(id)
            if (!result.err) {
                rule =  result.resp?.desc
                if (rule) {
                    this.matchRuleCache.set(id, rule)
                }
            } else {
                console.error("MatchMgr getMatchRule err", result)
            }
        }
        return rule ?? ""
    }
}
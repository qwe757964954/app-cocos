import { Log } from "bos/base/log/Log";
import { BaseListener } from "./BaseListener";
import {App} from "app/App"
import { PBRegularCommon } from "../../code/code";
import { MatchApi } from "../../api/MatchApi";
import { RoomInfo, SafeEmit } from "../data/RoomInfo";
import { MatchHandler } from "../handler/MatchHandler";
import { PreMatchService } from "idl/tss/match_v2/prematch.v1";
import { RpcService } from "bos/framework/network/rpc/RpcService";
import { IGInfo } from "idl/tss/match_v2/officematch.v1";

export class PreMatchListener extends BaseListener{

    startListener(){
        console.warn("PreMatchListener startListener")
        PreMatchService.on(RpcService.EventType.NOTIFICATION,this.onResponse, this)
    }

    stopListener(){
        console.warn("PreMatchListener stopListener")
        PreMatchService.off(RpcService.EventType.NOTIFICATION,this.onResponse, this)
    }

    filterMsg(key : string): boolean {
        if (key == this.key) {
            return true
        }
        console.warn("PreMatchListener filterMsg key is invalid", key, this.key)
        return false
    }

    onNotifyRoomInfo(resp, params) {
        console.debug("onNotifyRoomInfo", resp, params)

        let schedulerID = this.roomInfo.config.getSchedulerID()
        let roomInfo = resp.roomInfo
        let srvID = resp.srvID
        if (roomInfo && srvID) {
            this.handler.srvID = srvID
            this.handler.isRealTime = true
            this.roomInfo.init(this.roomInfo.config, roomInfo.preMatchInfo, roomInfo.userInfoV2.users)
        }else{
            console.error("onNotifyRoomInfo 没有房间信息")
        }
    }

    onNotifyUserJoin(resp, params) {
        console.debug("onNotifyUserJoin", resp, params)
        
        if (resp.uid === App.userMgr.loginUser.uid){
            this.roomInfo.userJoin(resp.uid)
        }
    }

    onNotifyUserLeave(resp, params) {
        console.debug("onNotifyUserLeave", resp, params)

        if (resp.uid === App.userMgr.loginUser.uid){
            this.roomInfo.userLeave(resp.uid)
        }
    }

    onNotifyUserEnterV2(resp, params) {
        console.debug("onNotifyUserEnterV2", resp, params)

        this.roomInfo.userSign(resp)
    }
    onNotifyUserCancelEnter(resp, params) {
        console.debug("onNotifyUserCancelEnter", resp, params)

        if (resp.uid === App.userMgr.loginUser.uid){
            this.roomInfo.userUnSign(resp.uid)
        }
    }

    onNotifyUserReady(resp, params) {
        console.debug("onNotifyUserReady", resp, params)

        if (resp.uid === App.userMgr.loginUser.uid){
            this.roomInfo.userReady(resp.uid)
        }
    }
    onNotifyUserCancelReady(resp, params) {
        console.debug("onNotifyUserCancelReady", resp, params)
        if (resp.uid === App.userMgr.loginUser.uid){
            this.roomInfo.userUnReady(resp.uid)
        }
    }

    /*
    --[[
        批量玩家信息变更
    ]]
    */
    onNotifyUserChange(resp, params) {
        console.debug("onNotifyUserChange", resp, params)

        const joinUsers = resp.joinUsers || [];
        if (joinUsers.length > 0) {
            this.roomInfo.userJoin(joinUsers);
        }
    
        const enterUsers = resp.enterUsers || [];
        if (enterUsers.length > 0) {
            this.roomInfo.usersSign(enterUsers);
        }
    
        const readyUsers = resp.readyUsers || [];
        if (readyUsers.length > 0) {
            this.roomInfo.userReady(readyUsers);
        }
    
        const cancelReadyUsers = resp.cancelReadyUsers || [];
        if (cancelReadyUsers.length > 0) {
            this.roomInfo.userUnReady(cancelReadyUsers);
        }
    
        const cancelEnterUsers = resp.cancelEnterUsers || [];
        if (cancelEnterUsers.length > 0) {
            this.roomInfo.userUnSign(cancelEnterUsers);
        }
    
        const leaveUsers = resp.leaveUsers || [];
        if (leaveUsers.length > 0) {
            this.roomInfo.userLeave(leaveUsers);
        }
    }

    onNotifyUserMatchPrepare(resp, params) {
        console.debug("onNotifyUserMatchPrepare", resp, params)

        SafeEmit(this.handler, MatchHandler.EventType.MatchCanReady)
    }

    onNotifyMatchAboutToStart(resp, params) {
        console.debug("onNotifyMatchAboutToStart", resp, params)

        SafeEmit(this.handler, MatchHandler.EventType.MatchAboutToStart, resp.leftDuration)
    }

    onNotifyStartMatchLock(resp, params) {
        console.debug("onNotifyStartMatchLock", resp, params)
    }

    onNotifyMatchStartResult(resp, params) {
        console.debug("onNotifyMatchStartResult", resp, params)

        let matchKey = resp.matchKey
        if (resp.isSuccess){
            this.handler.srvID = resp.srvID
            this.handler.matchKey = matchKey
            this.roomInfo.baseInfo.setMatchKey(matchKey)
            this.roomInfo.preBaseInfo.updateMatchStatus(PBRegularCommon.MatchStatusRunning)

            this.handler.matchListener.setKey(matchKey)

            let user = this.roomInfo.userInfo.getMySelf()
            if (!user.isTakePartInMatch()) {
                MatchApi.joinObserver(matchKey).then((result)=>{
                    if (!result.err){
                        this.handler.handleObserverSnapshot(result.resp, matchKey, this.roomInfo.config, this.roomInfo.preBaseInfo, this.roomInfo.userInfo.getUsers())
                        SafeEmit(this.handler, MatchHandler.EventType.ChangeObserverView)
                    }else{
                        console.error("加入围观视角失败")
                    }
                })
            }
        } else {
            this.roomInfo.preBaseInfo.updateMatchStatus(PBRegularCommon.MatchStatusAbort)
            SafeEmit(this.handler, MatchHandler.EventType.MatchStartFailed)
        }
    }

    onNotifyPreMatchDisband(resp, params) {
        console.debug("onNotifyPreMatchDisband", resp, params)

        SafeEmit(this.handler, MatchHandler.EventType.PreMatchDisband)
    }

    onNotifyConfigUpdate(resp, params) {
        console.debug("onNotifyConfigUpdate", resp, params)
        
        let id = this.roomInfo.config.getSchedulerID()
        //清除缓存
        App.matchMgr.configRepo.setConfig(id.toString(), null)
        //重新拉取
        App.matchMgr.getConfig(id, false).then((config)=> {
            if (config) {
                this.roomInfo.updateConfig(config)
            } else {
                console.error("onNotifyConfigUpdate getConfig err", resp)
            }
        })
        
    }
}
import { Log } from "bos/base/log/Log";
import { MatchListener } from "./MatchListener";
import { IBehaviorFrame, ObserverService } from "idl/tss/match_v2/observer.v1";
import { RpcService } from "bos/framework/network/rpc/RpcService";
import {
    IGInfo,
    MsgMatchStart, MsgMatchStartFailed, MsgScoreChange, MsgStageEnd, MsgStageGroupEnd, MsgStageQuit,
    MsgStageStartV2, MsgTableGameStart, MsgTableResultV2, MsgTableStartV2, MsgUserDelayJoin, MsgUserRevivalV2, MsgUserRevived,
    MsgUserSettlementV2, MsgUserStageEnd, MsgUserStatusBye, MsgUserStatusWaitOver
} from "idl/tss/match_v2/officematch.v1";
import { RoomInfo } from "../data/RoomInfo";

const MsgDecode = {
    "NotifyMatchStart": MsgMatchStart,
    "NotifyStageStartV2": MsgStageStartV2,
    "NotifyTableStartV2": MsgTableStartV2,
    "NotifyTableGameStart": MsgTableGameStart,
    "NotifyScoreChange": MsgScoreChange,
    "NotifyTableResultV2": MsgTableResultV2,
    "NotifyUserSettlementV2": MsgUserSettlementV2,
    "NotifyUserRevivalV2": MsgUserRevivalV2,
    "NotifyUserRevived": MsgUserRevived,
    "NotifyUserStatusBye": MsgUserStatusBye,
    "NotifyUserStageEnd": MsgUserStageEnd,
    "NotifyUserStatusWaitOver": MsgUserStatusWaitOver,
    "NotifyUserDelayJoin": MsgUserDelayJoin,
    "NotifyUserPromotion": null,
    "NotifyMsgStageQuit": MsgStageQuit,
    "NotifyStageGroupEnd": MsgStageGroupEnd,
    "NotifyStageEnd": MsgStageEnd,
    "NotifyMatchStartFailed": MsgMatchStartFailed,
    "NotifyMatchOverV2": null,
    "NotifyGoToHomePage": null,
}

export class ObserverListener extends MatchListener {

    startListener() {
        console.warn("ObserverListener startListener")
        ObserverService.on(RpcService.EventType.NOTIFICATION, this.onResponse, this)
    }

    stopListener() {
        console.warn("ObserverListener stopListener")
        ObserverService.off(RpcService.EventType.NOTIFICATION, this.onResponse, this)
    }

    filterMsg(key: string): boolean {
        if (this.handler.isRealTime) {
            console.error("ObserverListener filterMsg is realTime", this.handler.isRealTime)
            return false
        }
        if (!key || key == "") {
            console.error("ObserverListener filterMsg key is invalid", key, this.key)
            return false
        }

        if (key == this.key) {
            return true
        }

        console.error("ObserverListener filterMsg key is invalid", key, this.key)
        return false
    }

    /**处理快照+Behaviors */
    handleSnapshot(data, matchKey, config, preMatchInfo, users){
        let matchHandler = this.handler

        let snapshot = data.snapshot
        let snapshotData = snapshot.data
        //解出全量数据
        let decodeData = IGInfo.decode(snapshotData)
        console.debug("ObserverListener handleSnapshot decodeData", decodeData)
        //创建一个临时roomInfo
        let roomInfo = new RoomInfo(null)
        roomInfo.init(config, preMatchInfo, users, decodeData.matchInfo, decodeData.tableInfoV2.tables, decodeData.userInfoV2.users)
        
        //handler设置为空，禁止触发事件
        matchHandler.observerListener.handler = null        
        //合并behaviors
        let behaviors = data.behaviors || []
        for (let index = 0; index < behaviors.length; index++) {
            const behavior = behaviors[index];
            matchHandler.observerListener.handleBehaviorData(behavior, null, roomInfo)
        }
        //重置handler
        matchHandler.observerListener.handler = matchHandler    

        //使用临时roomInfo重新初始化roomInfo
        matchHandler.roomInfo.init(roomInfo.config, roomInfo.preBaseInfo, roomInfo.userInfo.getUsers(), roomInfo.baseInfo, roomInfo.tableInfo.getTables())
        matchHandler.isRealTime = false

        matchHandler.matchKey = matchKey
        matchHandler.observerListener.setKey(matchKey)
    }

    onNotifyBehaviorFrame(resp, params, roomInfo) {
        console.debug("onNotifyBehaviorFrame", resp, params, roomInfo)

        let behavior = resp.behavior
        this.handleBehaviorData(behavior, params, roomInfo)
    }

    handleBehaviorData(behavior: IBehaviorFrame, params, roomInfo?) {
        let methodID = behavior.methodName || ""

        let func = this["on" + methodID]
        if (func) {
            let byteData = behavior.data
            let decodeData
            let decode = MsgDecode[methodID]
            if (decode) {
                if (!decodeData) {
                    decodeData = new Uint8Array()
                }
                decodeData = decode.decode(byteData ?? new Uint8Array())
            } else {

            }

            console.warn("ObserverListener handleBehaviorData", methodID, decodeData)

            func.call(this, decodeData, params, roomInfo)
        } else {
            console.error("没有对应的函数实现，funcName = ：", methodID)
        }
    }

    onNotifyMatchStart(resp, params, roomInfo?) {
        console.debug("ObserverListener onNotifyMatchStart", resp, params, roomInfo)
        super.onNotifyMatchStart(resp, params, roomInfo)
    }

    onNotifyStageStartV2(resp, params, roomInfo?) {
        console.debug("ObserverListener onNotifyStageStartV2", resp, params, roomInfo)
        super.onNotifyStageStartV2(resp, params, roomInfo)
    }

    onNotifyTableStartV2(resp, params, roomInfo?) {
        console.debug("ObserverListener onNotifyTableStartV2", resp, params, roomInfo)
        super.onNotifyTableStartV2(resp, params, roomInfo)
    }

    onNotifyTableGameStart(resp, params, roomInfo){
        console.debug("ObserverListener onNotifyTableGameStart", resp, params, roomInfo)
        super.onNotifyTableGameStart(resp, params, roomInfo)
    }

    onNotifyScoreChange(resp, params, roomInfo?) {
        console.debug("ObserverListener onNotifyScoreChange", resp, params, roomInfo)

        super.onNotifyScoreChange(resp, params, roomInfo)
    }

    onNotifyTableResultV2(resp, params, roomInfo?) {
        console.debug("ObserverListener onNotifyTableResultV2", resp, params, roomInfo)

        super.onNotifyTableResultV2(resp, params, roomInfo)
    }

    onNotifyUserSettlementV2(resp, params, roomInfo?) {
        console.debug("ObserverListener onNotifyUserSettlementV2", resp, params, roomInfo)

        super.onNotifyUserSettlementV2(resp, params, roomInfo)
    }

    onNotifyUserRevivalV2(resp, params, roomInfo?) {
        console.debug("ObserverListener onNotifyUserRevivalV2", resp, params, roomInfo)

        super.onNotifyUserRevivalV2(resp, params, roomInfo)
    }

    onNotifyUserRevived(resp, params, roomInfo?) {
        console.debug("ObserverListener onNotifyUserRevived", resp, params, roomInfo)

        super.onNotifyUserRevived(resp, params, roomInfo)
    }

    onNotifyUserStatusBye(resp, params, roomInfo?) {
        console.debug("ObserverListener onNotifyUserStatusBye", resp, params, roomInfo)

        super.onNotifyUserStatusBye(resp, params, roomInfo)
    }

    onNotifyUserStageEnd(resp, params, roomInfo?) {
        console.debug("ObserverListener onNotifyUserStageEnd", resp, params, roomInfo)

        super.onNotifyUserStageEnd(resp, params, roomInfo)
    }

    onNotifyUserStatusWaitOver(resp, params, roomInfo?) {
        console.debug("ObserverListener onNotifyUserStatusWaitOver", resp, params, roomInfo)

        super.onNotifyUserStatusWaitOver(resp, params, roomInfo)
    }

    onNotifyUserDelayJoin(resp, params, roomInfo?) {
        console.debug("ObserverListener onNotifyUserDelayJoin", resp, params, roomInfo)

        super.onNotifyUserDelayJoin(resp, params, roomInfo)
    }

    onNotifyUserPromotion(resp, params, roomInfo?) {
        console.debug("ObserverListener onNotifyUserPromotion", resp, params, roomInfo)

        super.onNotifyUserPromotion(resp, params, roomInfo)
    }

    onNotifyMsgStageQuit(resp, params, roomInfo?) {
        console.debug("ObserverListener onNotifyMsgStageQuit", resp, params, roomInfo)

        super.onNotifyMsgStageQuit(resp, params, roomInfo)
    }

    onNotifyStageGroupEnd(resp, params, roomInfo?) {
        console.debug("ObserverListener onNotifyStageGroupEnd", resp, params, roomInfo)

        super.onNotifyStageGroupEnd(resp, params, roomInfo)
    }

    onNotifyStageEnd(resp, params, roomInfo?) {
        console.debug("ObserverListener onNotifyStageEnd", resp, params, roomInfo)

        super.onNotifyStageEnd(resp, params, roomInfo)
    }

    onNotifyMatchStartFailed(resp, params, roomInfo?) {
        console.debug("onNotifyMatchStartFailed", resp, params, roomInfo)

        super.onNotifyMatchStartFailed(resp, params, roomInfo)
    }

    onNotifyMatchOverV2(resp, params, roomInfo?) {
        console.debug("ObserverListener onNotifyMatchOverV2", resp, params, roomInfo)

        super.onNotifyMatchOverV2(resp, params, roomInfo)
    }

    onNotifyGoToHomePage(resp, params, roomInfo?) {
        console.debug("ObserverListener onNotifyGoToHomePage", resp, params, roomInfo)

        super.onNotifyGoToHomePage(resp, params, roomInfo)
    }
}
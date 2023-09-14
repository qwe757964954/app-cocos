import { TaskQueue } from "bos/base/taskqueue/TaskQueue"
import { Log } from "bos/exports"
import { RpcParams, RpcService } from "bos/framework/network/rpc/RpcService"
import BufferUtil from "bos/utils/BufferUtil"
import { Room } from "game/room/Room"
import { ActionReq, MsgManaged, MsgNotify, MsgTableEnd, MsgTableInfo, Table as TableService } from "idl/tss/game/table.v2"
import { Player } from "../model/Player"
import { MatchHandler } from "app/domain/match/match/handler/MatchHandler"

export type MsgHandlerParams = {
    gameID: string,
    extendTable: RpcService,
    matchType: number,
    mainUid: number,
    tableKey?: string,
}

class MsgHandler {
    public tableKey: string
    private matchType: number
    public extendTable: RpcService
    private msgQueue = new TaskQueue()

    constructor() {

    }

    init(data: MsgHandlerParams) {
        Log.d("MsgHandler.init", data);
        TableService.setSen(data.gameID);
        this.matchType = data.matchType;
        this.extendTable = data.extendTable;
        TableService.on(RpcService.EventType.NOTIFICATION, (method, msg, params) => {
            this.switchMethod([method, msg, params]);
        }, this);
        Room.matchMgr.on(MatchHandler.EventType.MatchTableStart, this.onMatchTableStart, this);
    }

    switchMethod(args :any[]){
        let [method, msg, params] = args;
        Log.d("==switchMethod==", method, msg, params)
        switch (method) {
            case "NotifyTableStart":
                this.resetMsgQueue(true)
                this.onNotifyTableStart(msg as MsgTableInfo, params);
                this.startMsgQueue();
                break;
            case "NotifyReconnect":
                this.resetMsgQueue(true)
                this.onNotifyReconnect(msg as MsgTableInfo, params);
                this.startMsgQueue();
                break;
            case "NotifyTableEnd":
                this.msgQueue.push({
                    target: this,
                    executor: this.onNotifyTableEnd,
                    args: [msg, params],
                });
                break;
            case "NotifyManaged":
                this.onNotifyManaged(msg as MsgManaged, params);
                break;
            default:
                this.pushMsgQueue(args)
                break;
        }
    }

    release() {
        Log.d("=Room=MsgHandler=release=")
        Room.matchMgr.removeAll(this);
        TableService.targetOff(this);
        TableService.setSen();
        this.msgQueue.reset();
        this.msgQueue.stop()
    }

    onNotifyManaged(msg: MsgManaged, params?: any) {
        Log.d("onNotifyManaged");
        Room.eventSystem.emit(TableService.NotifyManaged.name, msg);
    }

    checkTableMsg(method, msg: MsgNotify, params: RpcParams) : boolean {
        return this.tableKey == params.ext
    }

    onTableMsg(data) {
        let [method, msg, params] = data
        if (!this.checkTableMsg(method, msg, params)) {
            Log.e("checkTableMsg...error", method, this.tableKey, params.ext)
            return
        }
        let eventOpts = this.extendTable.getEventOptions(msg.eventID)
        if (eventOpts) {
            let buffer = BufferUtil.sliceBuffer(msg.msg ?? new Uint8Array())
            let data = this.extendTable[eventOpts.func]?.call(this.extendTable, buffer)
            Log.d("onTableMsg...", eventOpts.func, data.msg)
            this.onTableEvent(eventOpts.func, data.msg)
            Room.eventSystem.emit(eventOpts.func, data.msg)
        }
    }

    onTableEvent(name, data) {
        console.log("onTableEvent", name, data)
    }

    onNotifyTableEnd(msg: MsgTableEnd, params: RpcParams) {
        this.tableKey = "";
        this.setTableEnd();
        Room.eventSystem.emit(TableService.NotifyTableEnd.name, msg);
    }

    setTableEnd() {

    }

    onNotifySnapshot(msg: MsgTableInfo, tableKey: string) {
        Log.w("onNotifySnapshotTable", msg, tableKey, this.tableKey)
        this.tableKey = tableKey;
        this.setTableStart(msg, true);
        Room.gameData?.setTableStart?.(msg, this.tableKey);
        this.refreshMatchUser();
    }

    onNotifyReconnect(msg: MsgTableInfo, params: RpcParams) {
        Log.w("onNotifyReconnectTable", msg, params, this.tableKey)
        if (Number(msg.matchType) != this.matchType) {
            Log.e("match type not match", msg)
            return
        }
        this.tableKey = params.ext;
        this.setTableStart(msg, true);
        Room.gameData?.setTableStart?.(msg, this.tableKey);
        this.refreshMatchUser();
    }

    onNotifyTableStart(msg: MsgTableInfo, params: RpcParams) {
        Log.w("onNotifyTableStart", msg, params, this.tableKey, this.extendTable)
        if (Number(msg.matchType) != this.matchType) {
            Log.e("match type not match", msg)
            return
        }
        // TableService.setRouteKey(params.ext)
        this.tableKey = params.ext;
        this.setTableStart(msg);
        Room.gameData?.setTableStart?.(msg, this.tableKey);
        this.refreshMatchUser();
    }

    onMatchTableStart() {
        this.refreshMatchUser();
    }

    setTableStart(msg: MsgTableInfo, isConnect: boolean = false) {

    }

    // 只有比赛场有
    refreshMatchUser() {
        let roomInfo = Room.matchMgr.getRoomInfo();
        if (roomInfo) {
            for (const v of Room.gameData.getAllPlayer()) {
                let user = roomInfo.userInfo.findUser(v.uid);
                if (user) {
                    v.matchScore = user.score;
                    v.emit(Player.EventType.UPDATE_USERINFO, v);
                }
            }
        }
    }

    pushMsgQueue(args: any[]) {
        this.msgQueue.push({
            target: this,
            executor: this.onTableMsg,
            args: args,
        });
    }

    stopMsgQueue() {
        Log.d("==stopMsgQueue==");
        this.msgQueue.stop();
    }

    startMsgQueue() {
        Log.d("==startMsgQueue==");
        this.msgQueue.start();
    }

    resetMsgQueue(stop?: boolean) {
        Log.d("==resetMsgQueue==", stop);
        this.msgQueue.reset();
        stop && this.msgQueue.stop();
    }

    sendTableAction(f: any, action: any) {
        let data = f.call(this.extendTable, action)
        let req = new ActionReq({
            eventID: data.eventID,
            msg: data.bytes,
        })
        TableService.Action(req, {
            ext: this.tableKey,
        })
    }
}

export { MsgHandler }
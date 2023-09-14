import { MsgManaged, MsgTableInfo as TableInfo } from "idl/tss/game/table.v2";
import { Log } from "bos/exports";
import { RpcService } from "bos/framework/network/rpc/RpcService";
import BufferUtil from "bos/utils/BufferUtil";
import { ExtendTable, IMsgTableInfo, MsgTableInfo } from "../idl/tss/thailand/dummy";

//根据消息包，组装桌子消息
export class Handler {

    mainUid: number;
    replayTableInfo: IMsgTableInfo;
    extendTable: RpcService = ExtendTable;

    //初始化桌子数据（跟后端游戏桌子协议一致）
    init(uid: number) {
        this.mainUid = uid;
        this.replayTableInfo = {};
    }

    getReplayTableInfo() {
        Log.d("=handler=getReplayTableInfo=", this.replayTableInfo);
        return this.replayTableInfo;
    }

    switchMethod(args :any[]){
        let [method, msg, params] = args;
        Log.d("==switchMethod==", method, msg, params)
        switch (method) {
            case "NotifyTableStart":
                this.onNotifyTableStart(msg as MsgTableInfo);
                break;
            case "NotifyManaged":
                this.onNotifyManaged(msg as MsgManaged);
                break;
            default:
                this.onTableMsg(msg)
                break;
        }
    }

    onTableMsg(msg) {
        let eventOpts = this.extendTable.getEventOptions(msg.eventID)
        if (eventOpts) {
            let buffer = BufferUtil.sliceBuffer(msg.msg ?? new Uint8Array())
            let data = this.extendTable[eventOpts.func]?.call(this.extendTable, buffer)
            Log.d("onTableMsg...", eventOpts.func, data.msg)
            // 检查方法名是否存在
            let methodName = "on".concat(eventOpts.func);
            if (typeof this[methodName] === "function") {
                // 使用this和方法名的字符串调用方法
                this[methodName](data.msg);
            } else {
                Log.d(methodName.concat("方法 not found...."));
            }
        }
    }

    getUserByID(uid: number) {
        let users = this.replayTableInfo.users;
        for (let user of users) {
            if (user.uid == uid) {
                return user;
            }
        }
    }

    isContains(cards: number[], card: number): boolean {
        for (let v of cards) {
            if (v == card) {
                return true
            }
        }
        return false;
    }

    isArrayMixed(cards1: number[], cards2: number[]): boolean {
        for (let v1 of cards1) {
            for (let v2 of cards2) {
                if (v1 === v2) {
                    return true;
                }
            }
        }
        return false;
    }

    onNotifyTableStart(msg: TableInfo) {
        let data: MsgTableInfo = MsgTableInfo.decode(msg.tableInfo);
        this.replayTableInfo.users = data.users
    }

    onNotifyManaged(msg: MsgManaged) {
        let user = this.getUserByID(msg.uid);
        user.isManaged = msg.isManaged;
    }

} 
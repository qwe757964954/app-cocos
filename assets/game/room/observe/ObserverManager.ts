import { Log } from "bos/exports";
import { RpcParams, RpcService } from "bos/framework/network/rpc/RpcService";
import { IJoinResp, IMsgBehavior, ISnapshot, MsgBehavior, Observer as ObserverService } from "idl/tss/game/observer.v5"
// import { GameMessage, MsgTableInfo } from "idl/tss/game/table.v2";
import * as TablePKG from 'idl/tss/game/table.v2';
import { Room } from "../Room";
import { App } from "app/App";

export class ObserverManager {
    private tableKey: string = "";
    private behaviorsCache: Map<number, IMsgBehavior[]>;
    private snapshotCache: ISnapshot;
    private isObserve = false;

    getTableKey() {
        return this.tableKey;
    }

    init(tableKey: string) {
        Log.d("==ObserverManager init==", tableKey);
        this.tableKey = tableKey;
        this.behaviorsCache = new Map();
        ObserverService.on(RpcService.EventType.NOTIFICATION, (method, msg, params) => {
            switch (method) {
                case "NotifyBehavior":
                    this.onNotifyBehavior(msg as MsgBehavior, params);
                default:
                    break;
            }
        }, this);
    }

    onNotifyBehavior(msg: MsgBehavior, params: RpcParams) {
        if (!this.isObserve) {
            return;
        }
        if (this.tableKey == params.ext) {
            this.onReceiveBehavior(msg, params);
        }
        else {
            Log.d("==tableKey不一致==", this.tableKey, params)
        }
    }

    onReceiveSnapshot(snapshot: ISnapshot) {
        Log.d("=ObserverManager=onReceiveSnapshot=", snapshot);
        this.snapshotCache = snapshot;
        if (snapshot.data) {
            let msgTableInfo = new TablePKG.MsgTableInfo({});
            msgTableInfo.tableInfo = snapshot.data;
            Room.msgHandler.onNotifySnapshot(msgTableInfo, this.tableKey);
            Room.msgHandler.startMsgQueue();
        }
    }

    checkIsContainUid(uids: number[], checkUid: number): boolean {
        for (let uid of uids) {
            if (uid == checkUid) {
                return true
            }
        }
        return false;
    }

    onReceiveBehavior(msg: IMsgBehavior, params?: RpcParams) {
        let data = TablePKG.GameMessage.decode(msg.data);
        let players = Room.gameData.getAllPlayer();
        for (let player of players) {
            if (this.checkIsContainUid(data.uids, player.uid)) {  //设置协议缓存
                let cache = this.behaviorsCache.get(player.uid);
                if (cache) {
                    cache.push(msg);
                } else {
                    this.behaviorsCache.set(player.uid, []);
                }
            }
        }
        //如果协议中包含mainUID，则执行此协议
        if (this.checkIsContainUid(data.uids, Room.gameData.getMyID())) {
            let rParams: RpcParams;
            if (params) {
                rParams = params;
            } else {
                rParams = new RpcParams();
                rParams.ext = this.tableKey;
            }

            let info;
            switch (data.desc) {
                case "NotifyTableStart":
                    info = TablePKG.MsgTableInfo.decode(data.msg);
                    break;
                case "NotifyReconnect":
                    info = TablePKG.MsgTableInfo.decode(data.msg);
                    break;
                case "NotifyTableEnd":
                    break;
                case "NotifyManaged":
                    info = TablePKG.MsgManaged.decode(data.msg);
                    break;
                case "NotifyPlayer":
                    info = TablePKG.MsgNotify.decode(data.msg);
                    break;
                default:
                    info = data.msg;
                    break;
            }

            Log.d("=ObserverManager=onReceiveBehavior==", data, info);
            let args: any[] = [data.desc, info, rParams];
            Room.msgHandler.switchMethod(args);
        }
    }

    joinObserve(msg: IJoinResp, tableKey: string, mainUid: number) {
        if (this.tableKey == "") {
            this.init(tableKey);
        }
        this.isObserve = true;
        Room.gameData.resetAllPlayer();
        Room.gameData.setMainUid(mainUid);
        Room.msgHandler.resetMsgQueue(true);
        msg.snapshot && this.onReceiveSnapshot(msg.snapshot);
        let behaviors = msg.behaviors;
        if (behaviors && behaviors.length > 0) {
            for (let v of behaviors) {
                let behavior = {
                    ID: v.ID,
                    data: v.data,
                    timestamp: v.timestamp,
                };
                this.onReceiveBehavior(behavior);
            }
        }
    }

    switchUser(uid: number) {
        let snapshot = this.snapshotCache;
        let behaviors = this.behaviorsCache.get(uid);
        Log.d("=obManager=switchUser==", uid, snapshot, behaviors)
        if (snapshot || behaviors) {
            Room.gameData.resetAllPlayer();
            Room.gameData.setMainUid(uid);
            //根据snapshot和behaviors，组装桌子数据，应由子游戏实现，得到桌子消息后可以走重连
            // let tableInfo = Room.api.getObTableInfo({snapshot: snapshot, behaviors: behaviors});
            return;
        } else {
            return -1;
        }
    }

    release() {
        this.isObserve = false;
        this.tableKey = "";
        this.snapshotCache = null;
        this.behaviorsCache = null;
        ObserverService.removeAll(this);
        Room.msgHandler.resetMsgQueue(true);
        Room.gameData.resetAllPlayer();
        Room.gameData.setMainUid(App.userMgr.loginUid);
    }

}
import { IGetGameReplayReq, IReplayMsg, Observer } from "idl/tss/game/observer.v5";
import { Log, uiMgr } from "bos/exports";
import * as TablePKG from 'idl/tss/game/table.v2';
import { Room } from "../Room";

export class ReplayManager {
    private tableKey: string = "";
    private recordList: IReplayMsg[] = [];
    private msgMap: Map<number, TablePKG.IGameMessage[]> = new Map();
    private curIndex = 0;

    init(tableKey: string) {
        this.tableKey = tableKey;
    }
    
    startReplay() {
        this.requestReplayInfo();
    }

    async requestReplayInfo() {   
        let req: IGetGameReplayReq = {
            tableKey: this.tableKey,
        };

        let result = await Observer.GetGameReplay2(req);
        Log.d("=requestReplayInfo=result=", req, result)
        if (result.resp && result.resp.code == 0) {
            for (let index = 0; index < result.resp.data.length; index++) {
                let replayMsg = result.resp.data[index];
                this.recordList.push(replayMsg);
            }
            this.recordList.sort((a, b) => a.id - b.id);
            this.parseRecord();
            this.replayFrom(1);
        } else {
            uiMgr.showToast("牌局回放加载错误！");
        }
    }

    parseRecord() {
        for (let index = 0; index < this.recordList.length; index++) {
            let record = this.recordList[index];
            let data = TablePKG.GameMessage.decode(record.msg);
            let uids = data.uids;
            for (let uid of uids) {
                let cacheList = this.msgMap.get(uid);
                if (cacheList) {
                    cacheList.push(data);
                } else {
                    this.msgMap.set(uid, []);
                }
            }
        }
    }

    replayFrom(index: number) {
        let uid = Room.gameData.getMyID();
        let msgList = this.msgMap.get(uid);
        let totalNum = msgList.length;
        for (let index = 0; index < totalNum; index++) {
            //TODO：每走一次，进度+1
            
            this.doReplayPkg(uid, index)
        }
    }

    doReplayPkg(uid: number, index: number) {
        
    }
}
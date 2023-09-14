import { GameDelegate } from "app/domain/game/GameMgr"
import { Observer as GameObserver, IJoinResp, ISnapshot } from "idl/tss/game/observer.v5"
import { Room } from "../Room";
import { Log, uiMgr } from "bos/exports";

export class RoomGameDelegate implements GameDelegate {

    joinObserve(msg: IJoinResp, tableKey: string, mainUid: number) {
        Log.d("==joinObserve==", msg);
        Room.gameData.setGameStatus("observing");
        Room.obManager.joinObserve(msg, tableKey, mainUid);
    }

    //离开围观，做一些清理的操作
    leaveObserve() {
        Log.d("==leaveObserve==")
        Room.obManager.release();
    }

    //切换围观视角
    async switchObserve(uid: number) {
        // return Room.obManager.switchUser(uid);
        let tableKey = Room.obManager.getTableKey();
        let leaveResult = await GameObserver.Leave({}, {
            ext: tableKey
        });
        if (leaveResult.err) {
            Log.d("=switchObserve=leaveResult=err=", leaveResult, uid);
            return leaveResult.err;
        } else {
            Room.msgHandler.resetMsgQueue(true);
            let joinResult = await GameObserver.Join({}, {
                ext: tableKey
            })
            Log.d("=switchObserve=joinResult==", joinResult, uid);
            if (joinResult.err) {
                Room.obManager.release();
                return joinResult.err;
            }
            Room.gameData.resetAllPlayer();
            Room.gameData.setMainUid(uid);
            this.joinObserve({
                snapshot: joinResult.resp.snapshot,
                behaviors: joinResult.resp.behaviors,
            }, tableKey, uid);
            return;
        }
    }
}
